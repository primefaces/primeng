/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ApplicationRef, getDebugNode, inject, NgZone, RendererFactory2, ɵEffectScheduler as EffectScheduler, ɵgetDeferBlocks as getDeferBlocks, ɵNoopNgZone as NoopNgZone, ɵPendingTasks as PendingTasks, } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { DeferBlockFixture } from './defer';
import { AllowDetectChangesAndAcknowledgeItCanHideApplicationBugs, ComponentFixtureAutoDetect, ComponentFixtureNoNgZone, } from './test_bed_common';
/**
 * Fixture for debugging and testing a component.
 *
 * @publicApi
 */
export class ComponentFixture {
    /** @nodoc */
    constructor(componentRef) {
        this.componentRef = componentRef;
        this._isDestroyed = false;
        /** @internal */
        this._noZoneOptionIsSet = inject(ComponentFixtureNoNgZone, { optional: true });
        /** @internal */
        this._ngZone = this._noZoneOptionIsSet ? new NoopNgZone() : inject(NgZone);
        /** @internal */
        this._effectRunner = inject(EffectScheduler);
        // Inject ApplicationRef to ensure NgZone stableness causes after render hooks to run
        // This will likely happen as a result of fixture.detectChanges because it calls ngZone.run
        // This is a crazy way of doing things but hey, it's the world we live in.
        // The zoneless scheduler should instead do this more imperatively by attaching
        // the `ComponentRef` to `ApplicationRef` and calling `appRef.tick` as the `detectChanges`
        // behavior.
        /** @internal */
        this._appRef = inject(ApplicationRef);
        /** @internal */
        this._testAppRef = this._appRef;
        // TODO(atscott): Remove this from public API
        this.ngZone = this._noZoneOptionIsSet ? null : this._ngZone;
        this.changeDetectorRef = componentRef.changeDetectorRef;
        this.elementRef = componentRef.location;
        this.debugElement = getDebugNode(this.elementRef.nativeElement);
        this.componentInstance = componentRef.instance;
        this.nativeElement = this.elementRef.nativeElement;
        this.componentRef = componentRef;
    }
    /**
     * Do a change detection run to make sure there were no changes.
     */
    checkNoChanges() {
        this.changeDetectorRef.checkNoChanges();
    }
    /**
     * Retrieves all defer block fixtures in the component fixture.
     *
     * @developerPreview
     */
    getDeferBlocks() {
        const deferBlocks = [];
        const lView = this.componentRef.hostView['_lView'];
        getDeferBlocks(lView, deferBlocks);
        const deferBlockFixtures = [];
        for (const block of deferBlocks) {
            deferBlockFixtures.push(new DeferBlockFixture(block, this));
        }
        return Promise.resolve(deferBlockFixtures);
    }
    _getRenderer() {
        if (this._renderer === undefined) {
            this._renderer = this.componentRef.injector.get(RendererFactory2, null);
        }
        return this._renderer;
    }
    /**
     * Get a promise that resolves when the ui state is stable following animations.
     */
    whenRenderingDone() {
        const renderer = this._getRenderer();
        if (renderer && renderer.whenRenderingDone) {
            return renderer.whenRenderingDone();
        }
        return this.whenStable();
    }
    /**
     * Trigger component destruction.
     */
    destroy() {
        if (!this._isDestroyed) {
            this.componentRef.destroy();
            this._isDestroyed = true;
        }
    }
}
/**
 * ComponentFixture behavior that actually attaches the component to the application to ensure
 * behaviors between fixture and application do not diverge. `detectChanges` is disabled by default
 * (instead, tests should wait for the scheduler to detect changes), `whenStable` is directly the
 * `ApplicationRef.isStable`, and `autoDetectChanges` cannot be disabled.
 */
export class ScheduledComponentFixture extends ComponentFixture {
    constructor() {
        super(...arguments);
        this.disableDetectChangesError = inject(AllowDetectChangesAndAcknowledgeItCanHideApplicationBugs, { optional: true }) ?? false;
        this.pendingTasks = inject(PendingTasks);
    }
    initialize() {
        this._appRef.attachView(this.componentRef.hostView);
    }
    detectChanges(checkNoChanges = true) {
        if (!this.disableDetectChangesError) {
            throw new Error('Do not use `detectChanges` directly when using zoneless change detection.' +
                ' Instead, wait for the next render or `fixture.whenStable`.');
        }
        else if (!checkNoChanges) {
            throw new Error('Cannot disable `checkNoChanges` in this configuration. ' +
                'Use `fixture.componentRef.hostView.changeDetectorRef.detectChanges()` instead.');
        }
        this._effectRunner.flush();
        this._appRef.tick();
        this._effectRunner.flush();
    }
    isStable() {
        return !this.pendingTasks.hasPendingTasks.value;
    }
    whenStable() {
        if (this.isStable()) {
            return Promise.resolve(false);
        }
        return this._appRef.isStable.pipe(first((stable) => stable)).toPromise().then(() => true);
    }
    autoDetectChanges(autoDetect) {
        throw new Error('Cannot call autoDetectChanges when using change detection scheduling.');
    }
}
/**
 * ComponentFixture behavior that attempts to act as a "mini application".
 */
export class PseudoApplicationComponentFixture extends ComponentFixture {
    constructor() {
        super(...arguments);
        this._subscriptions = new Subscription();
        this._autoDetect = inject(ComponentFixtureAutoDetect, { optional: true }) ?? false;
        this._isStable = true;
        this._promise = null;
        this._resolve = null;
        this.afterTickSubscription = undefined;
        this.beforeRenderSubscription = undefined;
    }
    initialize() {
        // Create subscriptions outside the NgZone so that the callbacks run outside
        // of NgZone.
        this._ngZone.runOutsideAngular(() => {
            this._subscriptions.add(this._ngZone.onUnstable.subscribe({
                next: () => {
                    this._isStable = false;
                },
            }));
            this._subscriptions.add(this._ngZone.onMicrotaskEmpty.subscribe({
                next: () => {
                    if (this._autoDetect) {
                        // Do a change detection run with checkNoChanges set to true to check
                        // there are no changes on the second run.
                        this.detectChanges(true);
                    }
                },
            }));
            this._subscriptions.add(this._ngZone.onStable.subscribe({
                next: () => {
                    this._isStable = true;
                    // Check whether there is a pending whenStable() completer to resolve.
                    if (this._promise !== null) {
                        // If so check whether there are no pending macrotasks before resolving.
                        // Do this check in the next tick so that ngZone gets a chance to update the state
                        // of pending macrotasks.
                        queueMicrotask(() => {
                            if (!this._ngZone.hasPendingMacrotasks) {
                                if (this._promise !== null) {
                                    this._resolve(true);
                                    this._resolve = null;
                                    this._promise = null;
                                }
                            }
                        });
                    }
                },
            }));
            this._subscriptions.add(this._ngZone.onError.subscribe({
                next: (error) => {
                    throw error;
                },
            }));
        });
    }
    detectChanges(checkNoChanges = true) {
        this._effectRunner.flush();
        // Run the change detection inside the NgZone so that any async tasks as part of the change
        // detection are captured by the zone and can be waited for in isStable.
        this._ngZone.run(() => {
            this.changeDetectorRef.detectChanges();
            if (checkNoChanges) {
                this.checkNoChanges();
            }
        });
        // Run any effects that were created/dirtied during change detection. Such effects might become
        // dirty in response to input signals changing.
        this._effectRunner.flush();
    }
    isStable() {
        return this._isStable && !this._ngZone.hasPendingMacrotasks;
    }
    whenStable() {
        if (this.isStable()) {
            return Promise.resolve(false);
        }
        else if (this._promise !== null) {
            return this._promise;
        }
        else {
            this._promise = new Promise((res) => {
                this._resolve = res;
            });
            return this._promise;
        }
    }
    autoDetectChanges(autoDetect = true) {
        if (this._noZoneOptionIsSet) {
            throw new Error('Cannot call autoDetectChanges when ComponentFixtureNoNgZone is set.');
        }
        this._autoDetect = autoDetect;
        this.detectChanges();
    }
    destroy() {
        this._subscriptions.unsubscribe();
        super.destroy();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50X2ZpeHR1cmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3Rlc3Rpbmcvc3JjL2NvbXBvbmVudF9maXh0dXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxjQUFjLEVBQTZELFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFvRixnQkFBZ0IsSUFBSSxlQUFlLEVBQUUsZUFBZSxJQUFJLGNBQWMsRUFBRSxXQUFXLElBQUksVUFBVSxFQUFFLGFBQWEsSUFBSSxZQUFZLEdBQUUsTUFBTSxlQUFlLENBQUM7QUFDN1csT0FBTyxFQUFVLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQzFDLE9BQU8sRUFBQyx3REFBd0QsRUFBRSwwQkFBMEIsRUFBRSx3QkFBd0IsR0FBRSxNQUFNLG1CQUFtQixDQUFDO0FBRWxKOzs7O0dBSUc7QUFDSCxNQUFNLE9BQWdCLGdCQUFnQjtJQWdEcEMsYUFBYTtJQUNiLFlBQW1CLFlBQTZCO1FBQTdCLGlCQUFZLEdBQVosWUFBWSxDQUFpQjtRQXRCeEMsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFDdEMsZ0JBQWdCO1FBQ0csdUJBQWtCLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixFQUFFLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDM0YsZ0JBQWdCO1FBQ04sWUFBTyxHQUFXLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hGLGdCQUFnQjtRQUNOLGtCQUFhLEdBQUcsTUFBTSxD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QUFDO1FBQ2xDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNsQixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBcHBsaWNhdGlvblJlZiwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudFJlZiwgRGVidWdFbGVtZW50LCBFbGVtZW50UmVmLCBnZXREZWJ1Z05vZGUsIGluamVjdCwgTmdab25lLCBSZW5kZXJlckZhY3RvcnkyLCBWaWV3UmVmLCDJtURlZmVyQmxvY2tEZXRhaWxzIGFzIERlZmVyQmxvY2tEZXRhaWxzLCDJtWRldGVjdENoYW5nZXNJblZpZXdJZlJlcXVpcmVkLCDJtUVmZmVjdFNjaGVkdWxlciBhcyBFZmZlY3RTY2hlZHVsZXIsIMm1Z2V0RGVmZXJCbG9ja3MgYXMgZ2V0RGVmZXJCbG9ja3MsIMm1Tm9vcE5nWm9uZSBhcyBOb29wTmdab25lLCDJtVBlbmRpbmdUYXNrcyBhcyBQZW5kaW5nVGFza3MsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7Zmlyc3R9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtEZWZlckJsb2NrRml4dHVyZX0gZnJvbSAnLi9kZWZlcic7XG5pbXBvcnQge0FsbG93RGV0ZWN0Q2hhbmdlc0FuZEFja25vd2xlZGdlSXRDYW5IaWRlQXBwbGljYXRpb25CdWdzLCBDb21wb25lbnRGaXh0dXJlQXV0b0RldGVjdCwgQ29tcG9uZW50Rml4dHVyZU5vTmdab25lLH0gZnJvbSAnLi90ZXN0X2JlZF9jb21tb24nO1xuXG4vKipcbiAqIEZpeHR1cmUgZm9yIGRlYnVnZ2luZyBhbmQgdGVzdGluZyBhIGNvbXBvbmVudC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb21wb25lbnRGaXh0dXJlPFQ+IHtcbiAgLyoqXG4gICAqIFRoZSBEZWJ1Z0VsZW1lbnQgYXNzb2NpYXRlZCB3aXRoIHRoZSByb290IGVsZW1lbnQgb2YgdGhpcyBjb21wb25lbnQuXG4gICAqL1xuICBkZWJ1Z0VsZW1lbnQ6IERlYnVnRWxlbWVudDtcblxuICAvKipcbiAgICogVGhlIGluc3RhbmNlIG9mIHRoZSByb290IGNvbXBvbmVudCBjbGFzcy5cbiAgICovXG4gIGNvbXBvbmVudEluc3RhbmNlOiBUO1xuXG4gIC8qKlxuICAgKiBUaGUgbmF0aXZlIGVsZW1lbnQgYXQgdGhlIHJvb3Qgb2YgdGhlIGNvbXBvbmVudC5cbiAgICovXG4gIG5hdGl2ZUVsZW1lbnQ6IGFueTtcblxuICAvKipcbiAgICogVGhlIEVsZW1lbnRSZWYgZm9yIHRoZSBlbGVtZW50IGF0IHRoZSByb290IG9mIHRoZSBjb21wb25lbnQuXG4gICAqL1xuICBlbGVtZW50UmVmOiBFbGVtZW50UmVmO1xuXG4gIC8qKlxuICAgKiBUaGUgQ2hhbmdlRGV0ZWN0b3JSZWYgZm9yIHRoZSBjb21wb25lbnRcbiAgICovXG4gIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZjtcblxuICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXJGYWN0b3J5MnxudWxsfHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBfaXNEZXN0cm95ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX25vWm9uZU9wdGlvbklzU2V0ID0gaW5qZWN0KENvbXBvbmVudEZpeHR1cmVOb05nWm9uZSwge29wdGlvbmFsOiB0cnVlfSk7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJvdGVjdGVkIF9uZ1pvbmU6IE5nWm9uZSA9IHRoaXMuX25vWm9uZU9wdGlvbklzU2V0ID8gbmV3IE5vb3BOZ1pvbmUoKSA6IGluamVjdChOZ1pvbmUpO1xuICAvKiogQGludGVybmFsICovXG4gIHByb3RlY3RlZCBfZWZmZWN0UnVubmVyID0gaW5qZWN0KEVmZmVjdFNjaGVkdWxlcik7XG4gIC8vIEluamVjdCBBcHBsaWNhdGlvblJlZiB0byBlbnN1cmUgTmdab25lIHN0YWJsZW5lc3MgY2F1c2VzIGFmdGVyIHJlbmRlciBob29rcyB0byBydW5cbiAgLy8gVGhpcyB3aWxsIGxpa2VseSBoYXBwZW4gYXMgYSByZXN1bHQgb2YgZml4dHVyZS5kZXRlY3RDaGFuZ2VzIGJlY2F1c2UgaXQgY2FsbHMgbmdab25lLnJ1blxuICAvLyBUaGlzIGlzIGEgY3Jhenkgd2F5IG9mIGRvaW5nIHRoaW5ncyBidXQgaGV5LCBpdCdzIHRoZSB3b3JsZCB3ZSBsaXZlIGluLlxuICAvLyBUaGUgem9uZWxlc3Mgc2NoZWR1bGVyIHNob3VsZCBpbnN0ZWFkIGRvIHRoaXMgbW9yZSBpbXBlcmF0aXZlbHkgYnkgYXR0YWNoaW5nXG4gIC8vIHRoZSBgQ29tcG9uZW50UmVmYCB0byBgQXBwbGljYXRpb25SZWZgIGFuZCBjYWxsaW5nIGBhcHBSZWYudGlja2AgYXMgdGhlIGBkZXRlY3RDaGFuZ2VzYFxuICAvLyBiZWhhdmlvci5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2FwcFJlZiA9IGluamVjdChBcHBsaWNhdGlvblJlZik7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF90ZXN0QXBwUmVmID0gdGhpcy5fYXBwUmVmIGFzIHVua25vd24gYXMgVGVzdEFwcFJlZjtcblxuICAvLyBUT0RPKGF0c2NvdHQpOiBSZW1vdmUgdGhpcyBmcm9tIHB1YmxpYyBBUElcbiAgbmdab25lID0gdGhpcy5fbm9ab25lT3B0aW9uSXNTZXQgPyBudWxsIDogdGhpcy5fbmdab25lO1xuXG4gIC8qKiBAbm9kb2MgKi9cbiAgY29uc3RydWN0b3IocHVibGljIGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPFQ+KSB7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZiA9IGNvbXBvbmVudFJlZi5jaGFuZ2VEZXRlY3RvclJlZjtcbiAgICB0aGlzLmVsZW1lbnRSZWYgPSBjb21wb25lbnRSZWYubG9jYXRpb247XG4gICAgdGhpcy5kZWJ1Z0VsZW1lbnQgPSA8RGVidWdFbGVtZW50PmdldERlYnVnTm9kZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgdGhpcy5jb21wb25lbnRJbnN0YW5jZSA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZTtcbiAgICB0aGlzLm5hdGl2ZUVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmNvbXBvbmVudFJlZiA9IGNvbXBvbmVudFJlZjtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIGEgY2hhbmdlIGRldGVjdGlvbiBjeWNsZSBmb3IgdGhlIGNvbXBvbmVudC5cbiAgICovXG4gIGFic3RyYWN0IGRldGVjdENoYW5nZXMoY2hlY2tOb0NoYW5nZXM/OiBib29sZWFuKTogdm9pZDtcblxuICAvKipcbiAgICogRG8gYSBjaGFuZ2UgZGV0ZWN0aW9uIHJ1biB0byBtYWtlIHN1cmUgdGhlcmUgd2VyZSBubyBjaGFuZ2VzLlxuICAgKi9cbiAgY2hlY2tOb0NoYW5nZXMoKTogdm9pZCB7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5jaGVja05vQ2hhbmdlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB3aGV0aGVyIHRoZSBmaXh0dXJlIHNob3VsZCBhdXRvZGV0ZWN0IGNoYW5nZXMuXG4gICAqXG4gICAqIEFsc28gcnVucyBkZXRlY3RDaGFuZ2VzIG9uY2Ugc28gdGhhdCBhbnkgZXhpc3RpbmcgY2hhbmdlIGlzIGRldGVjdGVkLlxuICAgKi9cbiAgYWJzdHJhY3QgYXV0b0RldGVjdENoYW5nZXMoYXV0b0RldGVjdD86IGJvb2xlYW4pOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBSZXR1cm4gd2hldGhlciB0aGUgZml4dHVyZSBpcyBjdXJyZW50bHkgc3RhYmxlIG9yIGhhcyBhc3luYyB0YXNrcyB0aGF0IGhhdmUgbm90IGJlZW4gY29tcGxldGVkXG4gICAqIHlldC5cbiAgICovXG4gIGFic3RyYWN0IGlzU3RhYmxlKCk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEdldCBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBmaXh0dXJlIGlzIHN0YWJsZS5cbiAgICpcbiAgICogVGhpcyBjYW4gYmUgdXNlZCB0byByZXN1bWUgdGVzdGluZyBhZnRlciBldmVudHMgaGF2ZSB0cmlnZ2VyZWQgYXN5bmNocm9ub3VzIGFjdGl2aXR5IG9yXG4gICAqIGFzeW5jaHJvbm91cyBjaGFuZ2UgZGV0ZWN0aW9uLlxuICAgKi9cbiAgYWJzdHJhY3Qgd2hlblN0YWJsZSgpOiBQcm9taXNlPGFueT47XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyBhbGwgZGVmZXIgYmxvY2sgZml4dHVyZXMgaW4gdGhlIGNvbXBvbmVudCBmaXh0dXJlLlxuICAgKlxuICAgKiBAZGV2ZWxvcGVyUHJldmlld1xuICAgKi9cbiAgZ2V0RGVmZXJCbG9ja3MoKTogUHJvbWlzZTxEZWZlckJsb2NrRml4dHVyZVtdPiB7XG4gICAgY29uc3QgZGVmZXJCbG9ja3M6IERlZmVyQmxvY2tEZXRhaWxzW10gPSBbXTtcbiAgICBjb25zdCBsVmlldyA9ICh0aGlzLmNvbXBvbmVudFJlZi5ob3N0VmlldyBhcyBhbnkpWydfbFZpZXcnXTtcbiAgICBnZXREZWZlckJsb2NrcyhsVmlldywgZGVmZXJCbG9ja3MpO1xuXG4gICAgY29uc3QgZGVmZXJCbG9ja0ZpeHR1cmVzID0gW107XG4gICAgZm9yIChjb25zdCBibG9jayBvZiBkZWZlckJsb2Nrcykge1xuICAgICAgZGVmZXJCbG9ja0ZpeHR1cmVzLnB1c2gobmV3IERlZmVyQmxvY2tGaXh0dXJlKGJsb2NrLCB0aGlzKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkZWZlckJsb2NrRml4dHVyZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0UmVuZGVyZXIoKSB7XG4gICAgaWYgKHRoaXMuX3JlbmRlcmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyID0gdGhpcy5jb21wb25lbnRSZWYuaW5qZWN0b3IuZ2V0KFJlbmRlcmVyRmFjdG9yeTIsIG51bGwpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fcmVuZGVyZXIgYXMgUmVuZGVyZXJGYWN0b3J5MiB8IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHVpIHN0YXRlIGlzIHN0YWJsZSBmb2xsb3dpbmcgYW5pbWF0aW9ucy5cbiAgICovXG4gIHdoZW5SZW5kZXJpbmdEb25lKCk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLl9nZXRSZW5kZXJlcigpO1xuICAgIGlmIChyZW5kZXJlciAmJiByZW5kZXJlci53aGVuUmVuZGVyaW5nRG9uZSkge1xuICAgICAgcmV0dXJuIHJlbmRlcmVyLndoZW5SZW5kZXJpbmdEb25lKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLndoZW5TdGFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIGNvbXBvbmVudCBkZXN0cnVjdGlvbi5cbiAgICovXG4gIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9pc0Rlc3Ryb3llZCkge1xuICAgICAgdGhpcy5jb21wb25lbnRSZWYuZGVzdHJveSgpO1xuICAgICAgdGhpcy5faXNEZXN0cm95ZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIENvbXBvbmVudEZpeHR1cmUgYmVoYXZpb3IgdGhhdCBhY3R1YWxseSBhdHRhY2hlcyB0aGUgY29tcG9uZW50IHRvIHRoZSBhcHBsaWNhdGlvbiB0byBlbnN1cmVcbiAqIGJlaGF2aW9ycyBiZXR3ZWVuIGZpeHR1cmUgYW5kIGFwcGxpY2F0aW9uIGRvIG5vdCBkaXZlcmdlLiBgZGV0ZWN0Q2hhbmdlc2AgaXMgZGlzYWJsZWQgYnkgZGVmYXVsdFxuICogKGluc3RlYWQsIHRlc3RzIHNob3VsZCB3YWl0IGZvciB0aGUgc2NoZWR1bGVyIHRvIGRldGVjdCBjaGFuZ2VzKSwgYHdoZW5TdGFibGVgIGlzIGRpcmVjdGx5IHRoZVxuICogYEFwcGxpY2F0aW9uUmVmLmlzU3RhYmxlYCwgYW5kIGBhdXRvRGV0ZWN0Q2hhbmdlc2AgY2Fubm90IGJlIGRpc2FibGVkLlxuICovXG5leHBvcnQgY2xhc3MgU2NoZWR1bGVkQ29tcG9uZW50Rml4dHVyZTxUPiBleHRlbmRzIENvbXBvbmVudEZpeHR1cmU8VD4ge1xuICBwcml2YXRlIHJlYWRvbmx5IGRpc2FibGVEZXRlY3RDaGFuZ2VzRXJyb3IgPVxuICAgICAgaW5qZWN0KEFsbG93RGV0ZWN0Q2hhbmdlc0FuZEFja25vd2xlZGdlSXRDYW5IaWRlQXBwbGljYXRpb25CdWdzLCB7b3B0aW9uYWw6IHRydWV9KSA/PyBmYWxzZTtcbiAgcHJpdmF0ZSByZWFkb25seSBwZW5kaW5nVGFza3MgPSBpbmplY3QoUGVuZGluZ1Rhc2tzKTtcblxuICBpbml0aWFsaXplKCk6IHZvaWQge1xuICAgIHRoaXMuX2FwcFJlZi5hdHRhY2hWaWV3KHRoaXMuY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcbiAgfVxuXG4gIG92ZXJyaWRlIGRldGVjdENoYW5nZXMoY2hlY2tOb0NoYW5nZXM6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVEZXRlY3RDaGFuZ2VzRXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnRG8gbm90IHVzZSBgZGV0ZWN0Q2hhbmdlc2AgZGlyZWN0bHkgd2hlbiB1c2luZyB6b25lbGVzcyBjaGFuZ2UgZGV0ZWN0aW9uLicgK1xuICAgICAgICAgICAgICAnIEluc3RlYWQsIHdhaXQgZm9yIHRoZSBuZXh0IHJlbmRlciBvciBgZml4dHVyZS53aGVuU3RhYmxlYC4nLFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKCFjaGVja05vQ2hhbmdlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdDYW5ub3QgZGlzYWJsZSBgY2hlY2tOb0NoYW5nZXNgIGluIHRoaXMgY29uZmlndXJhdGlvbi4gJyArXG4gICAgICAgICAgICAgICdVc2UgYGZpeHR1cmUuY29tcG9uZW50UmVmLmhvc3RWaWV3LmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKWAgaW5zdGVhZC4nLFxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5fZWZmZWN0UnVubmVyLmZsdXNoKCk7XG4gICAgdGhpcy5fYXBwUmVmLnRpY2soKTtcbiAgICB0aGlzLl9lZmZlY3RSdW5uZXIuZmx1c2goKTtcbiAgfVxuXG4gIG92ZXJyaWRlIGlzU3RhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5wZW5kaW5nVGFza3MuaGFzUGVuZGluZ1Rhc2tzLnZhbHVlO1xuICB9XG5cbiAgb3ZlcnJpZGUgd2hlblN0YWJsZSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAodGhpcy5pc1N0YWJsZSgpKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2FwcFJlZi5pc1N0YWJsZS5waXBlKGZpcnN0KChzdGFibGUpID0+IHN0YWJsZSkpLnRvUHJvbWlzZSgpLnRoZW4oKCkgPT4gdHJ1ZSk7XG4gIH1cblxuICBvdmVycmlkZSBhdXRvRGV0ZWN0Q2hhbmdlcyhhdXRvRGV0ZWN0PzogYm9vbGVhbnx1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBjYWxsIGF1dG9EZXRlY3RDaGFuZ2VzIHdoZW4gdXNpbmcgY2hhbmdlIGRldGVjdGlvbiBzY2hlZHVsaW5nLicpO1xuICB9XG59XG5cbmludGVyZmFjZSBUZXN0QXBwUmVmIHtcbiAgZXh0ZXJuYWxUZXN0Vmlld3M6IFNldDxWaWV3UmVmPjtcbiAgYmVmb3JlUmVuZGVyOiBTdWJqZWN0PGJvb2xlYW4+O1xuICBhZnRlclRpY2s6IFN1YmplY3Q8dm9pZD47XG59XG5cbi8qKlxuICogQ29tcG9uZW50Rml4dHVyZSBiZWhhdmlvciB0aGF0IGF0dGVtcHRzIHRvIGFjdCBhcyBhIFwibWluaSBhcHBsaWNhdGlvblwiLlxuICovXG5leHBvcnQgY2xhc3MgUHNldWRvQXBwbGljYXRpb25Db21wb25lbnRGaXh0dXJlPFQ+IGV4dGVuZHMgQ29tcG9uZW50Rml4dHVyZTxUPiB7XG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIHByaXZhdGUgX2F1dG9EZXRlY3QgPSBpbmplY3QoQ29tcG9uZW50Rml4dHVyZUF1dG9EZXRlY3QsIHtvcHRpb25hbDogdHJ1ZX0pID8/IGZhbHNlO1xuICBwcml2YXRlIF9pc1N0YWJsZTogYm9vbGVhbiA9IHRydWU7XG4gIHByaXZhdGUgX3Byb21pc2U6IFByb21pc2U8Ym9vbGVhbj58bnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX3Jlc29sdmU6ICgocmVzdWx0OiBib29sZWFuKSA9PiB2b2lkKXxudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBhZnRlclRpY2tTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbnx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIHByaXZhdGUgYmVmb3JlUmVuZGVyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb258dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXG4gIGluaXRpYWxpemUoKTogdm9pZCB7XG4gICAgLy8gQ3JlYXRlIHN1YnNjcmlwdGlvbnMgb3V0c2lkZSB0aGUgTmdab25lIHNvIHRoYXQgdGhlIGNhbGxiYWNrcyBydW4gb3V0c2lkZVxuICAgIC8vIG9mIE5nWm9uZS5cbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICAgICAgdGhpcy5fbmdab25lLm9uVW5zdGFibGUuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgIG5leHQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5faXNTdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSksXG4gICAgICApO1xuICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICAgICAgdGhpcy5fbmdab25lLm9uTWljcm90YXNrRW1wdHkuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgIG5leHQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuX2F1dG9EZXRlY3QpIHtcbiAgICAgICAgICAgICAgICAvLyBEbyBhIGNoYW5nZSBkZXRlY3Rpb24gcnVuIHdpdGggY2hlY2tOb0NoYW5nZXMgc2V0IHRvIHRydWUgdG8gY2hlY2tcbiAgICAgICAgICAgICAgICAvLyB0aGVyZSBhcmUgbm8gY2hhbmdlcyBvbiB0aGUgc2Vjb25kIHJ1bi5cbiAgICAgICAgICAgICAgICB0aGlzLmRldGVjdENoYW5nZXModHJ1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSksXG4gICAgICApO1xuICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICAgICAgdGhpcy5fbmdab25lLm9uU3RhYmxlLnN1YnNjcmliZSh7XG4gICAgICAgICAgICBuZXh0OiAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2lzU3RhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgLy8gQ2hlY2sgd2hldGhlciB0aGVyZSBpcyBhIHBlbmRpbmcgd2hlblN0YWJsZSgpIGNvbXBsZXRlciB0byByZXNvbHZlLlxuICAgICAgICAgICAgICBpZiAodGhpcy5fcHJvbWlzZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHNvIGNoZWNrIHdoZXRoZXIgdGhlcmUgYXJlIG5vIHBlbmRpbmcgbWFjcm90YXNrcyBiZWZvcmUgcmVzb2x2aW5nLlxuICAgICAgICAgICAgICAgIC8vIERvIHRoaXMgY2hlY2sgaW4gdGhlIG5leHQgdGljayBzbyB0aGF0IG5nWm9uZSBnZXRzIGEgY2hhbmNlIHRvIHVwZGF0ZSB0aGUgc3RhdGVcbiAgICAgICAgICAgICAgICAvLyBvZiBwZW5kaW5nIG1hY3JvdGFza3MuXG4gICAgICAgICAgICAgICAgcXVldWVNaWNyb3Rhc2soKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9uZ1pvbmUuaGFzUGVuZGluZ01hY3JvdGFza3MpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Byb21pc2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXNvbHZlISh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXNvbHZlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcm9taXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pLFxuICAgICAgKTtcblxuICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICAgICAgdGhpcy5fbmdab25lLm9uRXJyb3Iuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgIG5leHQ6IChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBvdmVycmlkZSBkZXRlY3RDaGFuZ2VzKGNoZWNrTm9DaGFuZ2VzID0gdHJ1ZSk6IHZvaWQge1xuICAgIHRoaXMuX2VmZmVjdFJ1bm5lci5mbHVzaCgpO1xuICAgIC8vIFJ1biB0aGUgY2hhbmdlIGRldGVjdGlvbiBpbnNpZGUgdGhlIE5nWm9uZSBzbyB0aGF0IGFueSBhc3luYyB0YXNrcyBhcyBwYXJ0IG9mIHRoZSBjaGFuZ2VcbiAgICAvLyBkZXRlY3Rpb24gYXJlIGNhcHR1cmVkIGJ5IHRoZSB6b25lIGFuZCBjYW4gYmUgd2FpdGVkIGZvciBpbiBpc1N0YWJsZS5cbiAgICB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgaWYgKGNoZWNrTm9DaGFuZ2VzKSB7XG4gICAgICAgIHRoaXMuY2hlY2tOb0NoYW5nZXMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBSdW4gYW55IGVmZmVjdHMgdGhhdCB3ZXJlIGNyZWF0ZWQvZGlydGllZCBkdXJpbmcgY2hhbmdlIGRldGVjdGlvbi4gU3VjaCBlZmZlY3RzIG1pZ2h0IGJlY29tZVxuICAgIC8vIGRpcnR5IGluIHJlc3BvbnNlIHRvIGlucHV0IHNpZ25hbHMgY2hhbmdpbmcuXG4gICAgdGhpcy5fZWZmZWN0UnVubmVyLmZsdXNoKCk7XG4gIH1cblxuICBvdmVycmlkZSBpc1N0YWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNTdGFibGUgJiYgIXRoaXMuX25nWm9uZS5oYXNQZW5kaW5nTWFjcm90YXNrcztcbiAgfVxuXG4gIG92ZXJyaWRlIHdoZW5TdGFibGUoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKHRoaXMuaXNTdGFibGUoKSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9wcm9taXNlICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcHJvbWlzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXMpID0+IHtcbiAgICAgICAgdGhpcy5fcmVzb2x2ZSA9IHJlcztcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2U7XG4gICAgfVxuICB9XG5cbiAgb3ZlcnJpZGUgYXV0b0RldGVjdENoYW5nZXMoYXV0b0RldGVjdCA9IHRydWUpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fbm9ab25lT3B0aW9uSXNTZXQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNhbGwgYXV0b0RldGVjdENoYW5nZXMgd2hlbiBDb21wb25lbnRGaXh0dXJlTm9OZ1pvbmUgaXMgc2V0LicpO1xuICAgIH1cblxuICAgIHRoaXMuX2F1dG9EZXRlY3QgPSBhdXRvRGV0ZWN0O1xuICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgb3ZlcnJpZGUgZGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICB9XG59XG4iXX0=