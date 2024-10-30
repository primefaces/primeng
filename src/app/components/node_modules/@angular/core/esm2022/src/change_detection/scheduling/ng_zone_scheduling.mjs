/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Subscription } from 'rxjs';
import { ApplicationRef } from '../../application/application_ref';
import { ENVIRONMENT_INITIALIZER, inject, Injectable, InjectionToken, makeEnvironmentProviders } from '../../di';
import { ErrorHandler, INTERNAL_APPLICATION_ERROR_HANDLER } from '../../error_handler';
import { RuntimeError } from '../../errors';
import { PendingTasks } from '../../pending_tasks';
import { NgZone } from '../../zone';
import * as i0 from "../../r3_symbols";
export class NgZoneChangeDetectionScheduler {
    constructor() {
        this.zone = inject(NgZone);
        this.applicationRef = inject(ApplicationRef);
    }
    initialize() {
        if (this._onMicrotaskEmptySubscription) {
            return;
        }
        this._onMicrotaskEmptySubscription = this.zone.onMicrotaskEmpty.subscribe({
            next: () => {
                this.zone.run(() => {
                    this.applicationRef.tick();
                });
            }
        });
    }
    ngOnDestroy() {
        this._onMicrotaskEmptySubscription?.unsubscribe();
    }
    static { this.ɵfac = function NgZoneChangeDetectionScheduler_Factory(t) { return new (t || NgZoneChangeDetectionScheduler)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: NgZoneChangeDetectionScheduler, factory: NgZoneChangeDetectionScheduler.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.setClassMetadata(NgZoneChangeDetectionScheduler, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
/**
 * Internal token used to verify that `provideZoneChangeDetection` is not used
 * with the bootstrapModule API.
 */
export const PROVIDED_NG_ZONE = new InjectionToken((typeof ngDevMode === 'undefined' || ngDevMode) ? 'provideZoneChangeDetection token' : '');
export function internalProvideZoneChangeDetection(ngZoneFactory) {
    return [
        { provide: NgZone, useFactory: ngZoneFactory },
        {
            provide: ENVIRONMENT_INITIALIZER,
            multi: true,
            useFactory: () => {
                const ngZoneChangeDetectionScheduler = inject(NgZoneChangeDetectionScheduler, { optional: true });
                if ((typeof ngDevMode === 'undefined' || ngDevMode) &&
                    ngZoneChangeDetectionScheduler === null) {
                    throw new RuntimeError(402 /* RuntimeErrorCode.MISSING_REQUIRED_INJECTABLE_IN_BOOTSTRAP */, `A required Injectable was not found in the dependency injection tree. ` +
                        'If you are bootstrapping an NgModule, make sure that the `BrowserModule` is imported.');
                }
                return () => ngZoneChangeDetectionScheduler.initialize();
            },
        },
        {
            provide: ENVIRONMENT_INITIALIZER,
            multi: true,
            useFactory: () => {
                const service = inject(ZoneStablePendingTask);
                return () => {
                    service.initialize();
                };
            }
        },
        { provide: INTERNAL_APPLICATION_ERROR_HANDLER, useFactory: ngZoneApplicationErrorHandlerFactory },
    ];
}
export function ngZoneApplicationErrorHandlerFactory() {
    const zone = inject(NgZone);
    const userErrorHandler = inject(ErrorHandler);
    return (e) => zone.runOutsideAngular(() => userErrorHandler.handleError(e));
}
/**
 * Provides `NgZone`-based change detection for the application bootstrapped using
 * `bootstrapApplication`.
 *
 * `NgZone` is already provided in applications by default. This provider allows you to configure
 * options like `eventCoalescing` in the `NgZone`.
 * This provider is not available for `platformBrowser().bootstrapModule`, which uses
 * `BootstrapOptions` instead.
 *
 * @usageNotes
 * ```typescript
 * bootstrapApplication(MyApp, {providers: [
 *   provideZoneChangeDetection({eventCoalescing: true}),
 * ]});
 * ```
 *
 * @publicApi
 * @see {@link bootstrapApplication}
 * @see {@link NgZoneOptions}
 */
export function provideZoneChangeDetection(options) {
    const zoneProviders = internalProvideZoneChangeDetection(() => new NgZone(getNgZoneOptions(options)));
    return makeEnvironmentProviders([
        (typeof ngDevMode === 'undefined' || ngDevMode) ? { provide: PROVIDED_NG_ZONE, useValue: true } :
            [],
        zoneProviders,
    ]);
}
// Transforms a set of `BootstrapOptions` (supported by the NgModule-based bootstrap APIs) ->
// `NgZoneOptions` that are recognized by the NgZone constructor. Passing no options will result in
// a set of default options returned.
export function getNgZoneOptions(options) {
    return {
        enableLongStackTrace: typeof ngDevMode === 'undefined' ? false : !!ngDevMode,
        shouldCoalesceEventChangeDetection: options?.eventCoalescing ?? false,
        shouldCoalesceRunChangeDetection: options?.runCoalescing ?? false,
    };
}
export class ZoneStablePendingTask {
    constructor() {
        this.subscription = new Subscription();
        this.initialized = false;
        this.zone = inject(NgZone);
        this.pendingTasks = inject(PendingTasks);
    }
    initialize() {
        if (this.initialized) {
            return;
        }
        this.initialized = true;
        let task = null;
        if (!this.zone.isStable && !this.zone.hasPendingMacrotasks && !this.zone.hasPendingMicrotasks) {
            task = this.pendingTasks.add();
        }
        this.zone.runOutsideAngular(() => {
            this.subscription.add(this.zone.onStable.subscribe(() => {
                NgZone.assertNotInAngularZone();
                // Check whether there are no pending macro/micro tasks in the next tick
                // to allow for NgZone to update the state.
                queueMicrotask(() => {
                    if (task !== null && !this.zone.hasPendingMacrotasks && !this.zone.hasPendingMicrotasks) {
                        this.pendingTasks.remove(task);
                        task = null;
                    }
                });
            }));
        });
        this.subscription.add(this.zone.onUnstable.subscribe(() => {
            NgZone.assertInAngularZone();
            task ??= this.pendingTasks.add();
        }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    static { this.ɵfac = function ZoneStablePendingTask_Factory(t) { return new (t || ZoneStablePendingTask)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ZoneStablePendingTask, factory: ZoneStablePendingTask.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.setClassMetadata(ZoneStablePendingTask, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfem9uZV9zY2hlZHVsaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvY2hhbmdlX2RldGVjdGlvbi9zY2hlZHVsaW5nL25nX3pvbmVfc2NoZWR1bGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRWxDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUNqRSxPQUFPLEVBQUMsdUJBQXVCLEVBQXdCLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLHdCQUF3QixFQUFpQixNQUFNLFVBQVUsQ0FBQztBQUNySixPQUFPLEVBQUMsWUFBWSxFQUFFLGtDQUFrQyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDckYsT0FBTyxFQUFDLFlBQVksRUFBbUIsTUFBTSxjQUFjLENBQUM7QUFDNUQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxZQUFZLENBQUM7O0FBSWxDLE1BQU0sT0FBTyw4QkFBOEI7SUFEM0M7UUFFbUIsU0FBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QixtQkFBYyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztLQXFCMUQ7SUFqQkMsVUFBVTtRQUNSLElBQUksSUFBSSxDQUFDLDZCQUE2QixFQUFFLENBQUM7WUFDdkMsT0FBTztRQUNULENBQUM7UUFFRCxJQUFJLENBQUMsNkJBQTZCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7WUFDeEUsSUFBSSxFQUFFLEdBQUcsRUFBRTtnQkFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7b0JBQ2pCLElBQUksQ0FB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QUUsQ0FBQztnQkFFaEMsd0VBQXdFO2dCQUN4RSwyQ0FBMkM7Z0JBQzNDLGNBQWMsQ0FBQyxHQUFHLEVBQUU7b0JBQ2xCLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7d0JBQ3hGLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUMvQixJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNkLENBQUM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ3hELE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQzdCLElBQUksS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDO0lBR0QsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQztzRkF6Q1UscUJBQXFCO3VFQUFyQixxQkFBcUIsV0FBckIscUJBQXFCLG1CQURULE1BQU07O2dGQUNsQixxQkFBcUI7Y0FEakMsVUFBVTtlQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QXBwbGljYXRpb25SZWZ9IGZyb20gJy4uLy4uL2FwcGxpY2F0aW9uL2FwcGxpY2F0aW9uX3JlZic7XG5pbXBvcnQge0VOVklST05NRU5UX0lOSVRJQUxJWkVSLCBFbnZpcm9ubWVudFByb3ZpZGVycywgaW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgbWFrZUVudmlyb25tZW50UHJvdmlkZXJzLCBTdGF0aWNQcm92aWRlcn0gZnJvbSAnLi4vLi4vZGknO1xuaW1wb3J0IHtFcnJvckhhbmRsZXIsIElOVEVSTkFMX0FQUExJQ0FUSU9OX0VSUk9SX0hBTkRMRVJ9IGZyb20gJy4uLy4uL2Vycm9yX2hhbmRsZXInO1xuaW1wb3J0IHtSdW50aW1lRXJyb3IsIFJ1bnRpbWVFcnJvckNvZGV9IGZyb20gJy4uLy4uL2Vycm9ycyc7XG5pbXBvcnQge1BlbmRpbmdUYXNrc30gZnJvbSAnLi4vLi4vcGVuZGluZ190YXNrcyc7XG5pbXBvcnQge05nWm9uZX0gZnJvbSAnLi4vLi4vem9uZSc7XG5pbXBvcnQge0ludGVybmFsTmdab25lT3B0aW9uc30gZnJvbSAnLi4vLi4vem9uZS9uZ196b25lJztcblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgTmdab25lQ2hhbmdlRGV0ZWN0aW9uU2NoZWR1bGVyIHtcbiAgcHJpdmF0ZSByZWFkb25seSB6b25lID0gaW5qZWN0KE5nWm9uZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgYXBwbGljYXRpb25SZWYgPSBpbmplY3QoQXBwbGljYXRpb25SZWYpO1xuXG4gIHByaXZhdGUgX29uTWljcm90YXNrRW1wdHlTdWJzY3JpcHRpb24/OiBTdWJzY3JpcHRpb247XG5cbiAgaW5pdGlhbGl6ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fb25NaWNyb3Rhc2tFbXB0eVN1YnNjcmlwdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX29uTWljcm90YXNrRW1wdHlTdWJzY3JpcHRpb24gPSB0aGlzLnpvbmUub25NaWNyb3Rhc2tFbXB0eS5zdWJzY3JpYmUoe1xuICAgICAgbmV4dDogKCkgPT4ge1xuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9uUmVmLnRpY2soKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9vbk1pY3JvdGFza0VtcHR5U3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuICB9XG59XG5cblxuLyoqXG4gKiBJbnRlcm5hbCB0b2tlbiB1c2VkIHRvIHZlcmlmeSB0aGF0IGBwcm92aWRlWm9uZUNoYW5nZURldGVjdGlvbmAgaXMgbm90IHVzZWRcbiAqIHdpdGggdGhlIGJvb3RzdHJhcE1vZHVsZSBBUEkuXG4gKi9cbmV4cG9ydCBjb25zdCBQUk9WSURFRF9OR19aT05FID0gbmV3IEluamVjdGlvblRva2VuPGJvb2xlYW4+KFxuICAgICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpID8gJ3Byb3ZpZGVab25lQ2hhbmdlRGV0ZWN0aW9uIHRva2VuJyA6ICcnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGludGVybmFsUHJvdmlkZVpvbmVDaGFuZ2VEZXRlY3Rpb24obmdab25lRmFjdG9yeTogKCkgPT4gTmdab25lKTogU3RhdGljUHJvdmlkZXJbXSB7XG4gIHJldHVybiBbXG4gICAge3Byb3ZpZGU6IE5nWm9uZSwgdXNlRmFjdG9yeTogbmdab25lRmFjdG9yeX0sXG4gICAge1xuICAgICAgcHJvdmlkZTogRU5WSVJPTk1FTlRfSU5JVElBTElaRVIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgIHVzZUZhY3Rvcnk6ICgpID0+IHtcbiAgICAgICAgY29uc3Qgbmdab25lQ2hhbmdlRGV0ZWN0aW9uU2NoZWR1bGVyID1cbiAgICAgICAgICAgIGluamVjdChOZ1pvbmVDaGFuZ2VEZXRlY3Rpb25TY2hlZHVsZXIsIHtvcHRpb25hbDogdHJ1ZX0pO1xuICAgICAgICBpZiAoKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkgJiZcbiAgICAgICAgICAgIG5nWm9uZUNoYW5nZURldGVjdGlvblNjaGVkdWxlciA9PT0gbnVsbCkge1xuICAgICAgICAgIHRocm93IG5ldyBSdW50aW1lRXJyb3IoXG4gICAgICAgICAgICAgIFJ1bnRpbWVFcnJvckNvZGUuTUlTU0lOR19SRVFVSVJFRF9JTkpFQ1RBQkxFX0lOX0JPT1RTVFJBUCxcbiAgICAgICAgICAgICAgYEEgcmVxdWlyZWQgSW5qZWN0YWJsZSB3YXMgbm90IGZvdW5kIGluIHRoZSBkZXBlbmRlbmN5IGluamVjdGlvbiB0cmVlLiBgICtcbiAgICAgICAgICAgICAgICAgICdJZiB5b3UgYXJlIGJvb3RzdHJhcHBpbmcgYW4gTmdNb2R1bGUsIG1ha2Ugc3VyZSB0aGF0IHRoZSBgQnJvd3Nlck1vZHVsZWAgaXMgaW1wb3J0ZWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICgpID0+IG5nWm9uZUNoYW5nZURldGVjdGlvblNjaGVkdWxlciEuaW5pdGlhbGl6ZSgpO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IEVOVklST05NRU5UX0lOSVRJQUxJWkVSLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgICB1c2VGYWN0b3J5OiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNlcnZpY2UgPSBpbmplY3QoWm9uZVN0YWJsZVBlbmRpbmdUYXNrKTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICBzZXJ2aWNlLmluaXRpYWxpemUoKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHtwcm92aWRlOiBJTlRFUk5BTF9BUFBMSUNBVElPTl9FUlJPUl9IQU5ETEVSLCB1c2VGYWN0b3J5OiBuZ1pvbmVBcHBsaWNhdGlvbkVycm9ySGFuZGxlckZhY3Rvcnl9LFxuICBdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmdab25lQXBwbGljYXRpb25FcnJvckhhbmRsZXJGYWN0b3J5KCkge1xuICBjb25zdCB6b25lID0gaW5qZWN0KE5nWm9uZSk7XG4gIGNvbnN0IHVzZXJFcnJvckhhbmRsZXIgPSBpbmplY3QoRXJyb3JIYW5kbGVyKTtcbiAgcmV0dXJuIChlOiB1bmtub3duKSA9PiB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHVzZXJFcnJvckhhbmRsZXIuaGFuZGxlRXJyb3IoZSkpO1xufVxuXG4vKipcbiAqIFByb3ZpZGVzIGBOZ1pvbmVgLWJhc2VkIGNoYW5nZSBkZXRlY3Rpb24gZm9yIHRoZSBhcHBsaWNhdGlvbiBib290c3RyYXBwZWQgdXNpbmdcbiAqIGBib290c3RyYXBBcHBsaWNhdGlvbmAuXG4gKlxuICogYE5nWm9uZWAgaXMgYWxyZWFkeSBwcm92aWRlZCBpbiBhcHBsaWNhdGlvbnMgYnkgZGVmYXVsdC4gVGhpcyBwcm92aWRlciBhbGxvd3MgeW91IHRvIGNvbmZpZ3VyZVxuICogb3B0aW9ucyBsaWtlIGBldmVudENvYWxlc2NpbmdgIGluIHRoZSBgTmdab25lYC5cbiAqIFRoaXMgcHJvdmlkZXIgaXMgbm90IGF2YWlsYWJsZSBmb3IgYHBsYXRmb3JtQnJvd3NlcigpLmJvb3RzdHJhcE1vZHVsZWAsIHdoaWNoIHVzZXNcbiAqIGBCb290c3RyYXBPcHRpb25zYCBpbnN0ZWFkLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBib290c3RyYXBBcHBsaWNhdGlvbihNeUFwcCwge3Byb3ZpZGVyczogW1xuICogICBwcm92aWRlWm9uZUNoYW5nZURldGVjdGlvbih7ZXZlbnRDb2FsZXNjaW5nOiB0cnVlfSksXG4gKiBdfSk7XG4gKiBgYGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKiBAc2VlIHtAbGluayBib290c3RyYXBBcHBsaWNhdGlvbn1cbiAqIEBzZWUge0BsaW5rIE5nWm9uZU9wdGlvbnN9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlWm9uZUNoYW5nZURldGVjdGlvbihvcHRpb25zPzogTmdab25lT3B0aW9ucyk6IEVudmlyb25tZW50UHJvdmlkZXJzIHtcbiAgY29uc3Qgem9uZVByb3ZpZGVycyA9XG4gICAgICBpbnRlcm5hbFByb3ZpZGVab25lQ2hhbmdlRGV0ZWN0aW9uKCgpID0+IG5ldyBOZ1pvbmUoZ2V0Tmdab25lT3B0aW9ucyhvcHRpb25zKSkpO1xuICByZXR1cm4gbWFrZUVudmlyb25tZW50UHJvdmlkZXJzKFtcbiAgICAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSA/IHtwcm92aWRlOiBQUk9WSURFRF9OR19aT05FLCB1c2VWYWx1ZTogdHJ1ZX0gOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW10sXG4gICAgem9uZVByb3ZpZGVycyxcbiAgXSk7XG59XG5cbi8qKlxuICogVXNlZCB0byBjb25maWd1cmUgZXZlbnQgYW5kIHJ1biBjb2FsZXNjaW5nIHdpdGggYHByb3ZpZGVab25lQ2hhbmdlRGV0ZWN0aW9uYC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKlxuICogQHNlZSB7QGxpbmsgcHJvdmlkZVpvbmVDaGFuZ2VEZXRlY3Rpb259XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdab25lT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBPcHRpb25hbGx5IHNwZWNpZnkgY29hbGVzY2luZyBldmVudCBjaGFuZ2UgZGV0ZWN0aW9ucyBvciBub3QuXG4gICAqIENvbnNpZGVyIHRoZSBmb2xsb3dpbmcgY2FzZS5cbiAgICpcbiAgICogYGBgXG4gICAqIDxkaXYgKGNsaWNrKT1cImRvU29tZXRoaW5nKClcIj5cbiAgICogICA8YnV0dG9uIChjbGljayk9XCJkb1NvbWV0aGluZ0Vsc2UoKVwiPjwvYnV0dG9uPlxuICAgKiA8L2Rpdj5cbiAgICogYGBgXG4gICAqXG4gICAqIFdoZW4gYnV0dG9uIGlzIGNsaWNrZWQsIGJlY2F1c2Ugb2YgdGhlIGV2ZW50IGJ1YmJsaW5nLCBib3RoXG4gICAqIGV2ZW50IGhhbmRsZXJzIHdpbGwgYmUgY2FsbGVkIGFuZCAyIGNoYW5nZSBkZXRlY3Rpb25zIHdpbGwgYmVcbiAgICogdHJpZ2dlcmVkLiBXZSBjYW4gY29hbGVzY2Ugc3VjaCBraW5kIG9mIGV2ZW50cyB0byBvbmx5IHRyaWdnZXJcbiAgICogY2hhbmdlIGRldGVjdGlvbiBvbmx5IG9uY2UuXG4gICAqXG4gICAqIEJ5IGRlZmF1bHQsIHRoaXMgb3B0aW9uIHdpbGwgYmUgZmFsc2UuIFNvIHRoZSBldmVudHMgd2lsbCBub3QgYmVcbiAgICogY29hbGVzY2VkIGFuZCB0aGUgY2hhbmdlIGRldGVjdGlvbiB3aWxsIGJlIHRyaWdnZXJlZCBtdWx0aXBsZSB0aW1lcy5cbiAgICogQW5kIGlmIHRoaXMgb3B0aW9uIGJlIHNldCB0byB0cnVlLCB0aGUgY2hhbmdlIGRldGVjdGlvbiB3aWxsIGJlXG4gICAqIHRyaWdnZXJlZCBhc3luYyBieSBzY2hlZHVsaW5nIGEgYW5pbWF0aW9uIGZyYW1lLiBTbyBpbiB0aGUgY2FzZSBhYm92ZSxcbiAgICogdGhlIGNoYW5nZSBkZXRlY3Rpb24gd2lsbCBvbmx5IGJlIHRyaWdnZXJlZCBvbmNlLlxuICAgKi9cbiAgZXZlbnRDb2FsZXNjaW5nPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogT3B0aW9uYWxseSBzcGVjaWZ5IGlmIGBOZ1pvbmUjcnVuKClgIG1ldGhvZCBpbnZvY2F0aW9ucyBzaG91bGQgYmUgY29hbGVzY2VkXG4gICAqIGludG8gYSBzaW5nbGUgY2hhbmdlIGRldGVjdGlvbi5cbiAgICpcbiAgICogQ29uc2lkZXIgdGhlIGZvbGxvd2luZyBjYXNlLlxuICAgKiBgYGBcbiAgICogZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArKykge1xuICAgKiAgIG5nWm9uZS5ydW4oKCkgPT4ge1xuICAgKiAgICAgLy8gZG8gc29tZXRoaW5nXG4gICAqICAgfSk7XG4gICAqIH1cbiAgICogYGBgXG4gICAqXG4gICAqIFRoaXMgY2FzZSB0cmlnZ2VycyB0aGUgY2hhbmdlIGRldGVjdGlvbiBtdWx0aXBsZSB0aW1lcy5cbiAgICogV2l0aCBuZ1pvbmVSdW5Db2FsZXNjaW5nIG9wdGlvbnMsIGFsbCBjaGFuZ2UgZGV0ZWN0aW9ucyBpbiBhbiBldmVudCBsb29wIHRyaWdnZXIgb25seSBvbmNlLlxuICAgKiBJbiBhZGRpdGlvbiwgdGhlIGNoYW5nZSBkZXRlY3Rpb24gZXhlY3V0ZXMgaW4gcmVxdWVzdEFuaW1hdGlvbi5cbiAgICpcbiAgICovXG4gIHJ1bkNvYWxlc2Npbmc/OiBib29sZWFuO1xufVxuXG4vLyBUcmFuc2Zvcm1zIGEgc2V0IG9mIGBCb290c3RyYXBPcHRpb25zYCAoc3VwcG9ydGVkIGJ5IHRoZSBOZ01vZHVsZS1iYXNlZCBib290c3RyYXAgQVBJcykgLT5cbi8vIGBOZ1pvbmVPcHRpb25zYCB0aGF0IGFyZSByZWNvZ25pemVkIGJ5IHRoZSBOZ1pvbmUgY29uc3RydWN0b3IuIFBhc3Npbmcgbm8gb3B0aW9ucyB3aWxsIHJlc3VsdCBpblxuLy8gYSBzZXQgb2YgZGVmYXVsdCBvcHRpb25zIHJldHVybmVkLlxuZXhwb3J0IGZ1bmN0aW9uIGdldE5nWm9uZU9wdGlvbnMob3B0aW9ucz86IE5nWm9uZU9wdGlvbnMpOiBJbnRlcm5hbE5nWm9uZU9wdGlvbnMge1xuICByZXR1cm4ge1xuICAgIGVuYWJsZUxvbmdTdGFja1RyYWNlOiB0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyA/IGZhbHNlIDogISFuZ0Rldk1vZGUsXG4gICAgc2hvdWxkQ29hbGVzY2VFdmVudENoYW5nZURldGVjdGlvbjogb3B0aW9ucz8uZXZlbnRDb2FsZXNjaW5nID8/IGZhbHNlLFxuICAgIHNob3VsZENvYWxlc2NlUnVuQ2hhbmdlRGV0ZWN0aW9uOiBvcHRpb25zPy5ydW5Db2FsZXNjaW5nID8/IGZhbHNlLFxuICB9O1xufVxuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBab25lU3RhYmxlUGVuZGluZ1Rhc2sge1xuICBwcml2YXRlIHJlYWRvbmx5IHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgcHJpdmF0ZSBpbml0aWFsaXplZCA9IGZhbHNlO1xuICBwcml2YXRlIHJlYWRvbmx5IHpvbmUgPSBpbmplY3QoTmdab25lKTtcbiAgcHJpdmF0ZSByZWFkb25seSBwZW5kaW5nVGFza3MgPSBpbmplY3QoUGVuZGluZ1Rhc2tzKTtcblxuICBpbml0aWFsaXplKCkge1xuICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuXG4gICAgbGV0IHRhc2s6IG51bWJlcnxudWxsID0gbnVsbDtcbiAgICBpZiAoIXRoaXMuem9uZS5pc1N0YWJsZSAmJiAhdGhpcy56b25lLmhhc1BlbmRpbmdNYWNyb3Rhc2tzICYmICF0aGlzLnpvbmUuaGFzUGVuZGluZ01pY3JvdGFza3MpIHtcbiAgICAgIHRhc2sgPSB0aGlzLnBlbmRpbmdUYXNrcy5hZGQoKTtcbiAgICB9XG5cbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKHRoaXMuem9uZS5vblN0YWJsZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBOZ1pvbmUuYXNzZXJ0Tm90SW5Bbmd1bGFyWm9uZSgpO1xuXG4gICAgICAgIC8vIENoZWNrIHdoZXRoZXIgdGhlcmUgYXJlIG5vIHBlbmRpbmcgbWFjcm8vbWljcm8gdGFza3MgaW4gdGhlIG5leHQgdGlja1xuICAgICAgICAvLyB0byBhbGxvdyBmb3IgTmdab25lIHRvIHVwZGF0ZSB0aGUgc3RhdGUuXG4gICAgICAgIHF1ZXVlTWljcm90YXNrKCgpID0+IHtcbiAgICAgICAgICBpZiAodGFzayAhPT0gbnVsbCAmJiAhdGhpcy56b25lLmhhc1BlbmRpbmdNYWNyb3Rhc2tzICYmICF0aGlzLnpvbmUuaGFzUGVuZGluZ01pY3JvdGFza3MpIHtcbiAgICAgICAgICAgIHRoaXMucGVuZGluZ1Rhc2tzLnJlbW92ZSh0YXNrKTtcbiAgICAgICAgICAgIHRhc2sgPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQodGhpcy56b25lLm9uVW5zdGFibGUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIE5nWm9uZS5hc3NlcnRJbkFuZ3VsYXJab25lKCk7XG4gICAgICB0YXNrID8/PSB0aGlzLnBlbmRpbmdUYXNrcy5hZGQoKTtcbiAgICB9KSk7XG4gIH1cblxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==