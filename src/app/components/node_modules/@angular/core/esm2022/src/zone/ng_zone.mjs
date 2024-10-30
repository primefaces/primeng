/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { RuntimeError } from '../errors';
import { EventEmitter } from '../event_emitter';
import { global } from '../util/global';
import { noop } from '../util/noop';
import { getNativeRequestAnimationFrame } from '../util/raf';
import { AsyncStackTaggingZoneSpec } from './async-stack-tagging';
/**
 * An injectable service for executing work inside or outside of the Angular zone.
 *
 * The most common use of this service is to optimize performance when starting a work consisting of
 * one or more asynchronous tasks that don't require UI updates or error handling to be handled by
 * Angular. Such tasks can be kicked off via {@link #runOutsideAngular} and if needed, these tasks
 * can reenter the Angular zone via {@link #run}.
 *
 * <!-- TODO: add/fix links to:
 *   - docs explaining zones and the use of zones in Angular and change-detection
 *   - link to runOutsideAngular/run (throughout this file!)
 *   -->
 *
 * @usageNotes
 * ### Example
 *
 * ```
 * import {Component, NgZone} from '@angular/core';
 * import {NgIf} from '@angular/common';
 *
 * @Component({
 *   selector: 'ng-zone-demo',
 *   template: `
 *     <h2>Demo: NgZone</h2>
 *
 *     <p>Progress: {{progress}}%</p>
 *     <p *ngIf="progress >= 100">Done processing {{label}} of Angular zone!</p>
 *
 *     <button (click)="processWithinAngularZone()">Process within Angular zone</button>
 *     <button (click)="processOutsideOfAngularZone()">Process outside of Angular zone</button>
 *   `,
 * })
 * export class NgZoneDemo {
 *   progress: number = 0;
 *   label: string;
 *
 *   constructor(private _ngZone: NgZone) {}
 *
 *   // Loop inside the Angular zone
 *   // so the UI DOES refresh after each setTimeout cycle
 *   processWithinAngularZone() {
 *     this.label = 'inside';
 *     this.progress = 0;
 *     this._increaseProgress(() => console.log('Inside Done!'));
 *   }
 *
 *   // Loop outside of the Angular zone
 *   // so the UI DOES NOT refresh after each setTimeout cycle
 *   processOutsideOfAngularZone() {
 *     this.label = 'outside';
 *     this.progress = 0;
 *     this._ngZone.runOutsideAngular(() => {
 *       this._increaseProgress(() => {
 *         // reenter the Angular zone and display done
 *         this._ngZone.run(() => { console.log('Outside Done!'); });
 *       });
 *     });
 *   }
 *
 *   _increaseProgress(doneCallback: () => void) {
 *     this.progress += 1;
 *     console.log(`Current progress: ${this.progress}%`);
 *
 *     if (this.progress < 100) {
 *       window.setTimeout(() => this._increaseProgress(doneCallback), 10);
 *     } else {
 *       doneCallback();
 *     }
 *   }
 * }
 * ```
 *
 * @publicApi
 */
export class NgZone {
    constructor({ enableLongStackTrace = false, shouldCoalesceEventChangeDetection = false, shouldCoalesceRunChangeDetection = false }) {
        this.hasPendingMacrotasks = false;
        this.hasPendingMicrotasks = false;
        /**
         * Whether there are no outstanding microtasks or macrotasks.
         */
        this.isStable = true;
        /**
         * Notifies when code enters Angular Zone. This gets fired first on VM Turn.
         */
        this.onUnstable = new EventEmitter(false);
        /**
         * Notifies when there is no more microtasks enqueued in the current VM Turn.
         * This is a hint for Angular to do change detection, which may enqueue more microtasks.
         * For this reason this event can fire multiple times per VM Turn.
         */
        this.onMicrotaskEmpty = new EventEmitter(false);
        /**
         * Notifies when the last `onMicrotaskEmpty` has run and there are no more microtasks, which
         * implies we are about to relinquish VM turn.
         * This event gets called just once.
         */
        this.onStable = new EventEmitter(false);
        /**
         * Notifies that an error has been delivered.
         */
        this.onError = new EventEmitter(false);
        if (typeof Zone == 'undefined') {
            throw new RuntimeError(908 /* RuntimeErrorCode.MISSING_ZONEJS */, ngDevMode && `In this configuration Angular requires Zone.js`);
        }
        Zone.assertZonePatched();
        const self = this;
        self._nesting = 0;
        self._outer = self._inner = Zone.current;
        // AsyncStackTaggingZoneSpec provides `linked stack traces` to show
        // where the async operation is scheduled. For more details, refer
        // to this article, https://developer.chrome.com/blog/devtools-better-angular-debugging/
        // And we only import this AsyncStackTaggingZoneSpec in development mode,
        // in the production mode, the AsyncStackTaggingZoneSpec will be tree shaken away.
        if (ngDevMode) {
            self._inner = self._inner.fork(new AsyncStackTaggingZoneSpec('Angular'));
        }
        if (Zone['TaskTrackingZoneSpec']) {
            self._inner = self._inner.fork(new Zone['TaskTrackingZoneSpec']);
        }
        if (enableLongStackTrace && Zone['longStackTraceZoneSpec']) {
            self._inner = self._inner.fork(Zone['longStackTraceZoneSpec']);
        }
        // if shouldCoalesceRunChangeDetection is true, all tasks including event tasks will be
        // coalesced, so shouldCoalesceEventChangeDetection option is not necessary and can be skipped.
        self.shouldCoalesceEventChangeDetection =
            !shouldCoalesceRunChangeDetection && shouldCoalesceEventChangeDetection;
        self.shouldCoalesceRunChangeDetection = shouldCoalesceRunChangeDetection;
        self.lastRequestAnimationFrameId = -1;
        self.nativeRequestAnimationFrame = getNativeRequestAnimationFrame().nativeRequestAnimationFrame;
        forkInnerZoneWithAngularBehavior(self);
    }
    /**
      This method checks whether the method call happens within an Angular Zone instance.
    */
    static isInAngularZone() {
        // Zone needs to be checked, because this method might be called even when NoopNgZone is used.
        return typeof Zone !== 'undefined' && Zone.current.get('isAngularZone') === true;
    }
    /**
      Assures that the method is called within the Angular Zone, otherwise throws an error.
    */
    static assertInAngularZone() {
        if (!NgZone.isInAngularZone()) {
            throw new RuntimeError(909 /* RuntimeErrorCode.UNEXPECTED_ZONE_STATE */, ngDevMode && 'Expected to be in Angular Zone, but it is not!');
        }
    }
    /**
      Assures that the method is called outside of the Angular Zone, otherwise throws an error.
    */
    static assertNotInAngularZone() {
        if (NgZone.isInAngularZone()) {
            throw new RuntimeError(909 /* RuntimeErrorCode.UNEXPECTED_ZONE_STATE */, ngDevMode && 'Expected to not be in Angular Zone, but it is!');
        }
    }
    /**
     * Executes the `fn` function synchronously within the Angular zone and returns value returned by
     * the function.
     *
     * Running functions via `run` allows you to reenter Angular zone from a task that was executed
     * outside of the Angular zone (typically started via {@link #runOutsideAngular}).
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * within the Angular zone.
     *
     * If a synchronous error happens it will be rethrown and not reported via `onError`.
     */
    run(fn, applyThis, applyArgs) {
        return this._inner.run(fn, applyThis, applyArgs);
    }
    /**
     * Executes the `fn` function synchronously within the Angular zone as a task and returns value
     * returned by the function.
     *
     * Running functions via `run` allows you to reenter Angular zone from a task that was executed
     * outside of the Angular zone (typically started via {@link #runOutsideAngular}).
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * within the Angular zone.
     *
     * If a synchronous error happens it will be rethrown and not reported via `onError`.
     */
    runTask(fn, applyThis, applyArgs, name) {
        const zone = this._inner;
        const task = zone.scheduleEventTask('NgZoneEvent: ' + name, fn, EMPTY_PAYLOAD, noop, noop);
        try {
            return zone.runTask(task, applyThis, applyArgs);
        }
        finally {
            zone.cancelTask(task);
        }
    }
    /**
     * Same as `run`, except that synchronous errors are caught and forwarded via `onError` and not
     * rethrown.
     */
    runGuarded(fn, applyThis, applyArgs) {
        return this._inner.runGuarded(fn, applyThis, applyArgs);
    }
    /**
     * Executes the `fn` function synchronously in Angular's parent zone and returns value returned by
     * the function.
     *
     * Running functions via {@link #runOutsideAngular} allows you to escape Angular's zone and do
     * work that
     * doesn't trigger Angular change-detection or is subject to Angular's error handling.
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * outside of the Angular zone.
     *
     * Use {@link #run} to reenter the Angular zone and do work that updates the application model.
     */
    runOutsideAngular(fn) {
        return this._outer.run(fn);
    }
}
const EMPTY_PAYLOAD = {};
function checkStable(zone) {
    // TODO: @JiaLiPassion, should check zone.isCheckStableRunning to prevent
    // re-entry. The case is:
    //
    // @Component({...})
    // export class AppComponent {
    // constructor(private ngZone: NgZone) {
    //   this.ngZone.onStable.subscribe(() => {
    //     this.ngZone.run(() => console.log('stable'););
    //   });
    // }
    //
    // The onStable subscriber run another function inside ngZone
    // which causes `checkStable()` re-entry.
    // But this fix causes some issues in g3, so this fix will be
    // launched in another PR.
    if (zone._nesting == 0 && !zone.hasPendingMicrotasks && !zone.isStable) {
        try {
            zone._nesting++;
            zone.onMicrotaskEmpty.emit(null);
        }
        finally {
            zone._nesting--;
            if (!zone.hasPendingMicrotasks) {
                try {
                    zone.runOutsideAngular(() => zone.onStable.emit(null));
                }
                finally {
                    zone.isStable = true;
                }
            }
        }
    }
}
function delayChangeDetectionForEvents(zone) {
    /**
     * We also need to check _nesting here
     * Consider the following case with shouldCoalesceRunChangeDetection = true
     *
     * ngZone.run(() => {});
     * ngZone.run(() => {});
     *
     * We want the two `ngZone.run()` only trigger one change detection
     * when shouldCoalesceRunChangeDetection is true.
     * And because in this case, change detection run in async way(requestAnimationFrame),
     * so we also need to check the _nesting here to prevent multiple
     * change detections.
     */
    if (zone.isCheckStableRunning || zone.lastRequestAnimationFrameId !== -1) {
        return;
    }
    zone.lastRequestAnimationFrameId = zone.nativeRequestAnimationFrame.call(global, () => {
        // This is a work around for https://github.com/angular/angular/issues/36839.
        // The core issue is that when event coalescing is enabled it is possible for microtasks
        // to get flushed too early (As is the case with `Promise.then`) between the
        // coalescing eventTasks.
        //
        // To workaround this we schedule a "fake" eventTask before we process the
        // coalescing eventTasks. The benefit of this is that the "fake" container eventTask
        //  will prevent the microtasks queue from getting drained in between the coalescing
        // eventTask execution.
        if (!zone.fakeTopEventTask) {
            zone.fakeTopEventTask = Zone.root.scheduleEventTask('fakeTopEventTask', () => {
                zone.lastRequestAnimationFrameId = -1;
                updateMicroTaskStatus(zone);
                zone.isCheckStableRunning = true;
                checkStable(zone);
                zone.isCheckStableRunning = false;
            }, undefined, () => { }, () => { });
        }
        zone.fakeTopEventTask.invoke();
    });
    updateMicroTaskStatus(zone);
}
function forkInnerZoneWithAngularBehavior(zone) {
    const delayChangeDetectionForEventsDelegate = () => {
        delayChangeDetectionForEvents(zone);
    };
    zone._inner = zone._inner.fork({
        name: 'angular',
        properties: { 'isAngularZone': true },
        onInvokeTask: (delegate, current, target, task, applyThis, applyArgs) => {
            if (shouldBeIgnoredByZone(applyArgs)) {
                return delegate.invokeTask(target, task, applyThis, applyArgs);
            }
            try {
                onEnter(zone);
                return delegate.invokeTask(target, task, applyThis, applyArgs);
            }
            finally {
                if ((zone.shouldCoalesceEventChangeDetection && task.type === 'eventTask') ||
                    zone.shouldCoalesceRunChangeDetection) {
                    delayChangeDetectionForEventsDelegate();
                }
                onLeave(zone);
            }
        },
        onInvoke: (delegate, current, target, callback, applyThis, applyArgs, source) => {
            try {
                onEnter(zone);
                return delegate.invoke(target, callback, applyThis, applyArgs, source);
            }
            finally {
                if (zone.shouldCoalesceRunChangeDetection) {
                    delayChangeDetectionForEventsDelegate();
                }
                onLeave(zone);
            }
        },
        onHasTask: (delegate, current, target, hasTaskState) => {
            delegate.hasTask(target, hasTaskState);
            if (current === target) {
                // We are only interested in hasTask events which originate from our zone
                // (A child hasTask event is not interesting to us)
                if (hasTaskState.change == 'microTask') {
                    zone._hasPendingMicrotasks = hasTaskState.microTask;
                    updateMicroTaskStatus(zone);
                    checkStable(zone);
                }
                else if (hasTaskState.change == 'macroTask') {
                    zone.hasPendingMacrotasks = hasTaskState.macroTask;
                }
            }
        },
        onHandleError: (delegate, current, target, error) => {
            delegate.handleError(target, error);
            zone.runOutsideAngular(() => zone.onError.emit(error));
            return false;
        }
    });
}
function updateMicroTaskStatus(zone) {
    if (zone._hasPendingMicrotasks ||
        ((zone.shouldCoalesceEventChangeDetection || zone.shouldCoalesceRunChangeDetection) &&
            zone.lastRequestAnimationFrameId !== -1)) {
        zone.hasPendingMicrotasks = true;
    }
    else {
        zone.hasPendingMicrotasks = false;
    }
}
function onEnter(zone) {
    zone._nesting++;
    if (zone.isStable) {
        zone.isStable = false;
        zone.onUnstable.emit(null);
    }
}
function onLeave(zone) {
    zone._nesting--;
    checkStable(zone);
}
/**
 * Provides a noop implementation of `NgZone` which does nothing. This zone requires explicit calls
 * to framework to perform rendering.
 */
export class NoopNgZone {
    constructor() {
        this.hasPendingMicrotasks = false;
        this.hasPendingMacrotasks = false;
        this.isStable = true;
        this.onUnstable = new EventEmitter();
        this.onMicrotaskEmpty = new EventEmitter();
        this.onStable = new EventEmitter();
        this.onError = new EventEmitter();
    }
    run(fn, applyThis, applyArgs) {
        return fn.apply(applyThis, applyArgs);
    }
    runGuarded(fn, applyThis, applyArgs) {
        return fn.apply(applyThis, applyArgs);
    }
    runOutsideAngular(fn) {
        return fn();
    }
    runTask(fn, applyThis, applyArgs, name) {
        return fn.apply(applyThis, applyArgs);
    }
}
function shouldBeIgnoredByZone(applyArgs) {
    if (!Array.isArray(applyArgs)) {
        return false;
    }
    // We should only ever get 1 arg passed through to invokeTask.
    // Short circuit here incase that behavior changes.
    if (applyArgs.length !== 1) {
        return false;
    }
    // Prevent triggering change detection when the __ignore_ng_zone__ flag is detected.
    return applyArgs[0].data?.['__ignore_ng_zone__'] === true;
}
export function getNgZone(ngZoneToUse = 'zone.js', options) {
    if (ngZoneToUse === 'noop') {
        return new NoopNgZone();
    }
    if (ngZoneToUse === 'zone.js') {
        return new NgZone(options);
    }
    return ngZoneToUse;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfem9uZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3pvbmUvbmdfem9uZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFHSCxPQUFPLEVBQUMsWUFBWSxFQUFtQixNQUFNLFdBQVcsQ0FBQztBQUN6RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDOUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDbEMsT0FBTyxFQUFDLDhCQUE4QixFQUFDLE1BQU0sYUFBYSxDQUFDO0FBRTNELE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBTWhFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUVHO0FBQ0gsTUFBTSxPQUFPLE1BQU07SUFpQ2pCLFlBQVksRUFDVixvQkFBb0IsR0FBRyxLQUFLLEVBQzVCLGtDQUFrQyxHQUFHLEtBQUssRUFDMUMsZ0NBQWdDLEdBQUcsS0FBSyxFQUN6QztRQXBDUSx5QkFBb0IsR0FBWSxLQUFLLENBQUM7UUFDdEMseUJBQW9CLEdBQVksS0FBSyxDQUFDO1FBRS9DOztXQUVHO1FBQ00sYUFBUSxHQUFZLElBQUksQ0FBQztRQUVsQzs7V0FFRztRQUNNLGVBQVUsR0FBc0IsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFakU7Ozs7V0FJRztRQUNNLHFCQUFnQixHQUFzQixJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV2RTs7OztXQUlHO1FBQ00sYUFBUSxHQUFzQixJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUvRDs7V0FFRztRQUNNLFlBQU8sR0FB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QUVELDhEQUE4RDtJQUM5RCxtREFBbUQ7SUFDbkQsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQzNCLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELG9GQUFvRjtJQUNwRixPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLElBQUksQ0FBQztBQUM1RCxDQUFDO0FBV0QsTUFBTSxVQUFVLFNBQVMsQ0FDckIsY0FBdUMsU0FBUyxFQUFFLE9BQThCO0lBQ2xGLElBQUksV0FBVyxLQUFLLE1BQU0sRUFBRSxDQUFDO1FBQzNCLE9BQU8sSUFBSSxVQUFVLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBQ0QsSUFBSSxXQUFXLEtBQUssU0FBUyxFQUFFLENBQUM7UUFDOUIsT0FBTyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5cbmltcG9ydCB7UnVudGltZUVycm9yLCBSdW50aW1lRXJyb3JDb2RlfSBmcm9tICcuLi9lcnJvcnMnO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJy4uL2V2ZW50X2VtaXR0ZXInO1xuaW1wb3J0IHtnbG9iYWx9IGZyb20gJy4uL3V0aWwvZ2xvYmFsJztcbmltcG9ydCB7bm9vcH0gZnJvbSAnLi4vdXRpbC9ub29wJztcbmltcG9ydCB7Z2V0TmF0aXZlUmVxdWVzdEFuaW1hdGlvbkZyYW1lfSBmcm9tICcuLi91dGlsL3JhZic7XG5cbmltcG9ydCB7QXN5bmNTdGFja1RhZ2dpbmdab25lU3BlY30gZnJvbSAnLi9hc3luYy1zdGFjay10YWdnaW5nJztcblxuLy8gVGhlIGJlbG93IGlzIG5lZWRlZCBhcyBvdGhlcndpc2UgYSBudW1iZXIgb2YgdGFyZ2V0cyBmYWlsIGluIEczIGR1ZSB0bzpcbi8vIEVSUk9SIC0gW0pTQ19VTkRFRklORURfVkFSSUFCTEVdIHZhcmlhYmxlIFpvbmUgaXMgdW5kZWNsYXJlZFxuZGVjbGFyZSBjb25zdCBab25lOiBhbnk7XG5cbi8qKlxuICogQW4gaW5qZWN0YWJsZSBzZXJ2aWNlIGZvciBleGVjdXRpbmcgd29yayBpbnNpZGUgb3Igb3V0c2lkZSBvZiB0aGUgQW5ndWxhciB6b25lLlxuICpcbiAqIFRoZSBtb3N0IGNvbW1vbiB1c2Ugb2YgdGhpcyBzZXJ2aWNlIGlzIHRvIG9wdGltaXplIHBlcmZvcm1hbmNlIHdoZW4gc3RhcnRpbmcgYSB3b3JrIGNvbnNpc3Rpbmcgb2ZcbiAqIG9uZSBvciBtb3JlIGFzeW5jaHJvbm91cyB0YXNrcyB0aGF0IGRvbid0IHJlcXVpcmUgVUkgdXBkYXRlcyBvciBlcnJvciBoYW5kbGluZyB0byBiZSBoYW5kbGVkIGJ5XG4gKiBBbmd1bGFyLiBTdWNoIHRhc2tzIGNhbiBiZSBraWNrZWQgb2ZmIHZpYSB7QGxpbmsgI3J1bk91dHNpZGVBbmd1bGFyfSBhbmQgaWYgbmVlZGVkLCB0aGVzZSB0YXNrc1xuICogY2FuIHJlZW50ZXIgdGhlIEFuZ3VsYXIgem9uZSB2aWEge0BsaW5rICNydW59LlxuICpcbiAqIDwhLS0gVE9ETzogYWRkL2ZpeCBsaW5rcyB0bzpcbiAqICAgLSBkb2NzIGV4cGxhaW5pbmcgem9uZXMgYW5kIHRoZSB1c2Ugb2Ygem9uZXMgaW4gQW5ndWxhciBhbmQgY2hhbmdlLWRldGVjdGlvblxuICogICAtIGxpbmsgdG8gcnVuT3V0c2lkZUFuZ3VsYXIvcnVuICh0aHJvdWdob3V0IHRoaXMgZmlsZSEpXG4gKiAgIC0tPlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYFxuICogaW1wb3J0IHtDb21wb25lbnQsIE5nWm9uZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4gKiBpbXBvcnQge05nSWZ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG4gKlxuICogQENvbXBvbmVudCh7XG4gKiAgIHNlbGVjdG9yOiAnbmctem9uZS1kZW1vJyxcbiAqICAgdGVtcGxhdGU6IGBcbiAqICAgICA8aDI+RGVtbzogTmdab25lPC9oMj5cbiAqXG4gKiAgICAgPHA+UHJvZ3Jlc3M6IHt7cHJvZ3Jlc3N9fSU8L3A+XG4gKiAgICAgPHAgKm5nSWY9XCJwcm9ncmVzcyA+PSAxMDBcIj5Eb25lIHByb2Nlc3Npbmcge3tsYWJlbH19IG9mIEFuZ3VsYXIgem9uZSE8L3A+XG4gKlxuICogICAgIDxidXR0b24gKGNsaWNrKT1cInByb2Nlc3NXaXRoaW5Bbmd1bGFyWm9uZSgpXCI+UHJvY2VzcyB3aXRoaW4gQW5ndWxhciB6b25lPC9idXR0b24+XG4gKiAgICAgPGJ1dHRvbiAoY2xpY2spPVwicHJvY2Vzc091dHNpZGVPZkFuZ3VsYXJab25lKClcIj5Qcm9jZXNzIG91dHNpZGUgb2YgQW5ndWxhciB6b25lPC9idXR0b24+XG4gKiAgIGAsXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIE5nWm9uZURlbW8ge1xuICogICBwcm9ncmVzczogbnVtYmVyID0gMDtcbiAqICAgbGFiZWw6IHN0cmluZztcbiAqXG4gKiAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX25nWm9uZTogTmdab25lKSB7fVxuICpcbiAqICAgLy8gTG9vcCBpbnNpZGUgdGhlIEFuZ3VsYXIgem9uZVxuICogICAvLyBzbyB0aGUgVUkgRE9FUyByZWZyZXNoIGFmdGVyIGVhY2ggc2V0VGltZW91dCBjeWNsZVxuICogICBwcm9jZXNzV2l0aGluQW5ndWxhclpvbmUoKSB7XG4gKiAgICAgdGhpcy5sYWJlbCA9ICdpbnNpZGUnO1xuICogICAgIHRoaXMucHJvZ3Jlc3MgPSAwO1xuICogICAgIHRoaXMuX2luY3JlYXNlUHJvZ3Jlc3MoKCkgPT4gY29uc29sZS5sb2coJ0luc2lkZSBEb25lIScpKTtcbiAqICAgfVxuICpcbiAqICAgLy8gTG9vcCBvdXRzaWRlIG9mIHRoZSBBbmd1bGFyIHpvbmVcbiAqICAgLy8gc28gdGhlIFVJIERPRVMgTk9UIHJlZnJlc2ggYWZ0ZXIgZWFjaCBzZXRUaW1lb3V0IGN5Y2xlXG4gKiAgIHByb2Nlc3NPdXRzaWRlT2ZBbmd1bGFyWm9uZSgpIHtcbiAqICAgICB0aGlzLmxhYmVsID0gJ291dHNpZGUnO1xuICogICAgIHRoaXMucHJvZ3Jlc3MgPSAwO1xuICogICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gKiAgICAgICB0aGlzLl9pbmNyZWFzZVByb2dyZXNzKCgpID0+IHtcbiAqICAgICAgICAgLy8gcmVlbnRlciB0aGUgQW5ndWxhciB6b25lIGFuZCBkaXNwbGF5IGRvbmVcbiAqICAgICAgICAgdGhpcy5fbmdab25lLnJ1bigoKSA9PiB7IGNvbnNvbGUubG9nKCdPdXRzaWRlIERvbmUhJyk7IH0pO1xuICogICAgICAgfSk7XG4gKiAgICAgfSk7XG4gKiAgIH1cbiAqXG4gKiAgIF9pbmNyZWFzZVByb2dyZXNzKGRvbmVDYWxsYmFjazogKCkgPT4gdm9pZCkge1xuICogICAgIHRoaXMucHJvZ3Jlc3MgKz0gMTtcbiAqICAgICBjb25zb2xlLmxvZyhgQ3VycmVudCBwcm9ncmVzczogJHt0aGlzLnByb2dyZXNzfSVgKTtcbiAqXG4gKiAgICAgaWYgKHRoaXMucHJvZ3Jlc3MgPCAxMDApIHtcbiAqICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHRoaXMuX2luY3JlYXNlUHJvZ3Jlc3MoZG9uZUNhbGxiYWNrKSwgMTApO1xuICogICAgIH0gZWxzZSB7XG4gKiAgICAgICBkb25lQ2FsbGJhY2soKTtcbiAqICAgICB9XG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNsYXNzIE5nWm9uZSB7XG4gIHJlYWRvbmx5IGhhc1BlbmRpbmdNYWNyb3Rhc2tzOiBib29sZWFuID0gZmFsc2U7XG4gIHJlYWRvbmx5IGhhc1BlbmRpbmdNaWNyb3Rhc2tzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlcmUgYXJlIG5vIG91dHN0YW5kaW5nIG1pY3JvdGFza3Mgb3IgbWFjcm90YXNrcy5cbiAgICovXG4gIHJlYWRvbmx5IGlzU3RhYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAvKipcbiAgICogTm90aWZpZXMgd2hlbiBjb2RlIGVudGVycyBBbmd1bGFyIFpvbmUuIFRoaXMgZ2V0cyBmaXJlZCBmaXJzdCBvbiBWTSBUdXJuLlxuICAgKi9cbiAgcmVhZG9ubHkgb25VbnN0YWJsZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcblxuICAvKipcbiAgICogTm90aWZpZXMgd2hlbiB0aGVyZSBpcyBubyBtb3JlIG1pY3JvdGFza3MgZW5xdWV1ZWQgaW4gdGhlIGN1cnJlbnQgVk0gVHVybi5cbiAgICogVGhpcyBpcyBhIGhpbnQgZm9yIEFuZ3VsYXIgdG8gZG8gY2hhbmdlIGRldGVjdGlvbiwgd2hpY2ggbWF5IGVucXVldWUgbW9yZSBtaWNyb3Rhc2tzLlxuICAgKiBGb3IgdGhpcyByZWFzb24gdGhpcyBldmVudCBjYW4gZmlyZSBtdWx0aXBsZSB0aW1lcyBwZXIgVk0gVHVybi5cbiAgICovXG4gIHJlYWRvbmx5IG9uTWljcm90YXNrRW1wdHk6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcihmYWxzZSk7XG5cbiAgLyoqXG4gICAqIE5vdGlmaWVzIHdoZW4gdGhlIGxhc3QgYG9uTWljcm90YXNrRW1wdHlgIGhhcyBydW4gYW5kIHRoZXJlIGFyZSBubyBtb3JlIG1pY3JvdGFza3MsIHdoaWNoXG4gICAqIGltcGxpZXMgd2UgYXJlIGFib3V0IHRvIHJlbGlucXVpc2ggVk0gdHVybi5cbiAgICogVGhpcyBldmVudCBnZXRzIGNhbGxlZCBqdXN0IG9uY2UuXG4gICAqL1xuICByZWFkb25seSBvblN0YWJsZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcblxuICAvKipcbiAgICogTm90aWZpZXMgdGhhdCBhbiBlcnJvciBoYXMgYmVlbiBkZWxpdmVyZWQuXG4gICAqL1xuICByZWFkb25seSBvbkVycm9yOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoZmFsc2UpO1xuXG4gIGNvbnN0cnVjdG9yKHtcbiAgICBlbmFibGVMb25nU3RhY2tUcmFjZSA9IGZhbHNlLFxuICAgIHNob3VsZENvYWxlc2NlRXZlbnRDaGFuZ2VEZXRlY3Rpb24gPSBmYWxzZSxcbiAgICBzaG91bGRDb2FsZXNjZVJ1bkNoYW5nZURldGVjdGlvbiA9IGZhbHNlXG4gIH0pIHtcbiAgICBpZiAodHlwZW9mIFpvbmUgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBSdW50aW1lRXJyb3IoXG4gICAgICAgICAgUnVudGltZUVycm9yQ29kZS5NSVNTSU5HX1pPTkVKUyxcbiAgICAgICAgICBuZ0Rldk1vZGUgJiYgYEluIHRoaXMgY29uZmlndXJhdGlvbiBBbmd1bGFyIHJlcXVpcmVzIFpvbmUuanNgKTtcbiAgICB9XG5cbiAgICBab25lLmFzc2VydFpvbmVQYXRjaGVkKCk7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXMgYXMgYW55IGFzIE5nWm9uZVByaXZhdGU7XG4gICAgc2VsZi5fbmVzdGluZyA9IDA7XG5cbiAgICBzZWxmLl9vdXRlciA9IHNlbGYuX2lubmVyID0gWm9uZS5jdXJyZW50O1xuXG4gICAgLy8gQXN5bmNTdGFja1RhZ2dpbmdab25lU3BlYyBwcm92aWRlcyBgbGlua2VkIHN0YWNrIHRyYWNlc2AgdG8gc2hvd1xuICAgIC8vIHdoZXJlIHRoZSBhc3luYyBvcGVyYXRpb24gaXMgc2NoZWR1bGVkLiBGb3IgbW9yZSBkZXRhaWxzLCByZWZlclxuICAgIC8vIHRvIHRoaXMgYXJ0aWNsZSwgaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9ibG9nL2RldnRvb2xzLWJldHRlci1hbmd1bGFyLWRlYnVnZ2luZy9cbiAgICAvLyBBbmQgd2Ugb25seSBpbXBvcnQgdGhpcyBBc3luY1N0YWNrVGFnZ2luZ1pvbmVTcGVjIGluIGRldmVsb3BtZW50IG1vZGUsXG4gICAgLy8gaW4gdGhlIHByb2R1Y3Rpb24gbW9kZSwgdGhlIEFzeW5jU3RhY2tUYWdnaW5nWm9uZVNwZWMgd2lsbCBiZSB0cmVlIHNoYWtlbiBhd2F5LlxuICAgIGlmIChuZ0Rldk1vZGUpIHtcbiAgICAgIHNlbGYuX2lubmVyID0gc2VsZi5faW5uZXIuZm9yayhuZXcgQXN5bmNTdGFja1RhZ2dpbmdab25lU3BlYygnQW5ndWxhcicpKTtcbiAgICB9XG5cbiAgICBpZiAoKFpvbmUgYXMgYW55KVsnVGFza1RyYWNraW5nWm9uZVNwZWMnXSkge1xuICAgICAgc2VsZi5faW5uZXIgPSBzZWxmLl9pbm5lci5mb3JrKG5ldyAoKFpvbmUgYXMgYW55KVsnVGFza1RyYWNraW5nWm9uZVNwZWMnXSBhcyBhbnkpKTtcbiAgICB9XG5cbiAgICBpZiAoZW5hYmxlTG9uZ1N0YWNrVHJhY2UgJiYgKFpvbmUgYXMgYW55KVsnbG9uZ1N0YWNrVHJhY2Vab25lU3BlYyddKSB7XG4gICAgICBzZWxmLl9pbm5lciA9IHNlbGYuX2lubmVyLmZvcmsoKFpvbmUgYXMgYW55KVsnbG9uZ1N0YWNrVHJhY2Vab25lU3BlYyddKTtcbiAgICB9XG4gICAgLy8gaWYgc2hvdWxkQ29hbGVzY2VSdW5DaGFuZ2VEZXRlY3Rpb24gaXMgdHJ1ZSwgYWxsIHRhc2tzIGluY2x1ZGluZyBldmVudCB0YXNrcyB3aWxsIGJlXG4gICAgLy8gY29hbGVzY2VkLCBzbyBzaG91bGRDb2FsZXNjZUV2ZW50Q2hhbmdlRGV0ZWN0aW9uIG9wdGlvbiBpcyBub3QgbmVjZXNzYXJ5IGFuZCBjYW4gYmUgc2tpcHBlZC5cbiAgICBzZWxmLnNob3VsZENvYWxlc2NlRXZlbnRDaGFuZ2VEZXRlY3Rpb24gPVxuICAgICAgICAhc2hvdWxkQ29hbGVzY2VSdW5DaGFuZ2VEZXRlY3Rpb24gJiYgc2hvdWxkQ29hbGVzY2VFdmVudENoYW5nZURldGVjdGlvbjtcbiAgICBzZWxmLnNob3VsZENvYWxlc2NlUnVuQ2hhbmdlRGV0ZWN0aW9uID0gc2hvdWxkQ29hbGVzY2VSdW5DaGFuZ2VEZXRlY3Rpb247XG4gICAgc2VsZi5sYXN0UmVxdWVzdEFuaW1hdGlvbkZyYW1lSWQgPSAtMTtcbiAgICBzZWxmLm5hdGl2ZVJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGdldE5hdGl2ZVJlcXVlc3RBbmltYXRpb25GcmFtZSgpLm5hdGl2ZVJlcXVlc3RBbmltYXRpb25GcmFtZTtcbiAgICBmb3JrSW5uZXJab25lV2l0aEFuZ3VsYXJCZWhhdmlvcihzZWxmKTtcbiAgfVxuXG4gIC8qKlxuICAgIFRoaXMgbWV0aG9kIGNoZWNrcyB3aGV0aGVyIHRoZSBtZXRob2QgY2FsbCBoYXBwZW5zIHdpdGhpbiBhbiBBbmd1bGFyIFpvbmUgaW5zdGFuY2UuXG4gICovXG4gIHN0YXRpYyBpc0luQW5ndWxhclpvbmUoKTogYm9vbGVhbiB7XG4gICAgLy8gWm9uZSBuZWVkcyB0byBiZSBjaGVja2VkLCBiZWNhdXNlIHRoaXMgbWV0aG9kIG1pZ2h0IGJlIGNhbGxlZCBldmVuIHdoZW4gTm9vcE5nWm9uZSBpcyB1c2VkLlxuICAgIHJldHVybiB0eXBlb2YgWm9uZSAhPT0gJ3VuZGVmaW5lZCcgJiYgWm9uZS5jdXJyZW50LmdldCgnaXNBbmd1bGFyWm9uZScpID09PSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAgQXNzdXJlcyB0aGF0IHRoZSBtZXRob2QgaXMgY2FsbGVkIHdpdGhpbiB0aGUgQW5ndWxhciBab25lLCBvdGhlcndpc2UgdGhyb3dzIGFuIGVycm9yLlxuICAqL1xuICBzdGF0aWMgYXNzZXJ0SW5Bbmd1bGFyWm9uZSgpOiB2b2lkIHtcbiAgICBpZiAoIU5nWm9uZS5pc0luQW5ndWxhclpvbmUoKSkge1xuICAgICAgdGhyb3cgbmV3IFJ1bnRpbWVFcnJvcihcbiAgICAgICAgICBSdW50aW1lRXJyb3JDb2RlLlVORVhQRUNURURfWk9ORV9TVEFURSxcbiAgICAgICAgICBuZ0Rldk1vZGUgJiYgJ0V4cGVjdGVkIHRvIGJlIGluIEFuZ3VsYXIgWm9uZSwgYnV0IGl0IGlzIG5vdCEnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICBBc3N1cmVzIHRoYXQgdGhlIG1ldGhvZCBpcyBjYWxsZWQgb3V0c2lkZSBvZiB0aGUgQW5ndWxhciBab25lLCBvdGhlcndpc2UgdGhyb3dzIGFuIGVycm9yLlxuICAqL1xuICBzdGF0aWMgYXNzZXJ0Tm90SW5Bbmd1bGFyWm9uZSgpOiB2b2lkIHtcbiAgICBpZiAoTmdab25lLmlzSW5Bbmd1bGFyWm9uZSgpKSB7XG4gICAgICB0aHJvdyBuZXcgUnVudGltZUVycm9yKFxuICAgICAgICAgIFJ1bnRpbWVFcnJvckNvZGUuVU5FWFBFQ1RFRF9aT05FX1NUQVRFLFxuICAgICAgICAgIG5nRGV2TW9kZSAmJiAnRXhwZWN0ZWQgdG8gbm90IGJlIGluIEFuZ3VsYXIgWm9uZSwgYnV0IGl0IGlzIScpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlcyB0aGUgYGZuYCBmdW5jdGlvbiBzeW5jaHJvbm91c2x5IHdpdGhpbiB0aGUgQW5ndWxhciB6b25lIGFuZCByZXR1cm5zIHZhbHVlIHJldHVybmVkIGJ5XG4gICAqIHRoZSBmdW5jdGlvbi5cbiAgICpcbiAgICogUnVubmluZyBmdW5jdGlvbnMgdmlhIGBydW5gIGFsbG93cyB5b3UgdG8gcmVlbnRlciBBbmd1bGFyIHpvbmUgZnJvbSBhIHRhc2sgdGhhdCB3YXMgZXhlY3V0ZWRcbiAgICogb3V0c2lkZSBvZiB0aGUgQW5ndWxhciB6b25lICh0eXBpY2FsbHkgc3RhcnRlZCB2aWEge0BsaW5rICNydW5PdXRzaWRlQW5ndWxhcn0pLlxuICAgKlxuICAgKiBBbnkgZnV0dXJlIHRhc2tzIG9yIG1pY3JvdGFza3Mgc2NoZWR1bGVkIGZyb20gd2l0aGluIHRoaXMgZnVuY3Rpb24gd2lsbCBjb250aW51ZSBleGVjdXRpbmcgZnJvbVxuICAgKiB3aXRoaW4gdGhlIEFuZ3VsYXIgem9uZS5cbiAgICpcbiAgICogSWYgYSBzeW5jaHJvbm91cyBlcnJvciBoYXBwZW5zIGl0IHdpbGwgYmUgcmV0aHJvd24gYW5kIG5vdCByZXBvcnRlZCB2aWEgYG9uRXJyb3JgLlxuICAgKi9cbiAgcnVuPFQ+KGZuOiAoLi4uYXJnczogYW55W10pID0+IFQsIGFwcGx5VGhpcz86IGFueSwgYXBwbHlBcmdzPzogYW55W10pOiBUIHtcbiAgICByZXR1cm4gKHRoaXMgYXMgYW55IGFzIE5nWm9uZVByaXZhdGUpLl9pbm5lci5ydW4oZm4sIGFwcGx5VGhpcywgYXBwbHlBcmdzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlcyB0aGUgYGZuYCBmdW5jdGlvbiBzeW5jaHJvbm91c2x5IHdpdGhpbiB0aGUgQW5ndWxhciB6b25lIGFzIGEgdGFzayBhbmQgcmV0dXJucyB2YWx1ZVxuICAgKiByZXR1cm5lZCBieSB0aGUgZnVuY3Rpb24uXG4gICAqXG4gICAqIFJ1bm5pbmcgZnVuY3Rpb25zIHZpYSBgcnVuYCBhbGxvd3MgeW91IHRvIHJlZW50ZXIgQW5ndWxhciB6b25lIGZyb20gYSB0YXNrIHRoYXQgd2FzIGV4ZWN1dGVkXG4gICAqIG91dHNpZGUgb2YgdGhlIEFuZ3VsYXIgem9uZSAodHlwaWNhbGx5IHN0YXJ0ZWQgdmlhIHtAbGluayAjcnVuT3V0c2lkZUFuZ3VsYXJ9KS5cbiAgICpcbiAgICogQW55IGZ1dHVyZSB0YXNrcyBvciBtaWNyb3Rhc2tzIHNjaGVkdWxlZCBmcm9tIHdpdGhpbiB0aGlzIGZ1bmN0aW9uIHdpbGwgY29udGludWUgZXhlY3V0aW5nIGZyb21cbiAgICogd2l0aGluIHRoZSBBbmd1bGFyIHpvbmUuXG4gICAqXG4gICAqIElmIGEgc3luY2hyb25vdXMgZXJyb3IgaGFwcGVucyBpdCB3aWxsIGJlIHJldGhyb3duIGFuZCBub3QgcmVwb3J0ZWQgdmlhIGBvbkVycm9yYC5cbiAgICovXG4gIHJ1blRhc2s8VD4oZm46ICguLi5hcmdzOiBhbnlbXSkgPT4gVCwgYXBwbHlUaGlzPzogYW55LCBhcHBseUFyZ3M/OiBhbnlbXSwgbmFtZT86IHN0cmluZyk6IFQge1xuICAgIGNvbnN0IHpvbmUgPSAodGhpcyBhcyBhbnkgYXMgTmdab25lUHJpdmF0ZSkuX2lubmVyO1xuICAgIGNvbnN0IHRhc2sgPSB6b25lLnNjaGVkdWxlRXZlbnRUYXNrKCdOZ1pvbmVFdmVudDogJyArIG5hbWUsIGZuLCBFTVBUWV9QQVlMT0FELCBub29wLCBub29wKTtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHpvbmUucnVuVGFzayh0YXNrLCBhcHBseVRoaXMsIGFwcGx5QXJncyk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHpvbmUuY2FuY2VsVGFzayh0YXNrKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2FtZSBhcyBgcnVuYCwgZXhjZXB0IHRoYXQgc3luY2hyb25vdXMgZXJyb3JzIGFyZSBjYXVnaHQgYW5kIGZvcndhcmRlZCB2aWEgYG9uRXJyb3JgIGFuZCBub3RcbiAgICogcmV0aHJvd24uXG4gICAqL1xuICBydW5HdWFyZGVkPFQ+KGZuOiAoLi4uYXJnczogYW55W10pID0+IFQsIGFwcGx5VGhpcz86IGFueSwgYXBwbHlBcmdzPzogYW55W10pOiBUIHtcbiAgICByZXR1cm4gKHRoaXMgYXMgYW55IGFzIE5nWm9uZVByaXZhdGUpLl9pbm5lci5ydW5HdWFyZGVkKGZuLCBhcHBseVRoaXMsIGFwcGx5QXJncyk7XG4gIH1cblxuICAvKipcbiAgICogRXhlY3V0ZXMgdGhlIGBmbmAgZnVuY3Rpb24gc3luY2hyb25vdXNseSBpbiBBbmd1bGFyJ3MgcGFyZW50IHpvbmUgYW5kIHJldHVybnMgdmFsdWUgcmV0dXJuZWQgYnlcbiAgICogdGhlIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBSdW5uaW5nIGZ1bmN0aW9ucyB2aWEge0BsaW5rICNydW5PdXRzaWRlQW5ndWxhcn0gYWxsb3dzIHlvdSB0byBlc2NhcGUgQW5ndWxhcidzIHpvbmUgYW5kIGRvXG4gICAqIHdvcmsgdGhhdFxuICAgKiBkb2Vzbid0IHRyaWdnZXIgQW5ndWxhciBjaGFuZ2UtZGV0ZWN0aW9uIG9yIGlzIHN1YmplY3QgdG8gQW5ndWxhcidzIGVycm9yIGhhbmRsaW5nLlxuICAgKlxuICAgKiBBbnkgZnV0dXJlIHRhc2tzIG9yIG1pY3JvdGFza3Mgc2NoZWR1bGVkIGZyb20gd2l0aGluIHRoaXMgZnVuY3Rpb24gd2lsbCBjb250aW51ZSBleGVjdXRpbmcgZnJvbVxuICAgKiBvdXRzaWRlIG9mIHRoZSBBbmd1bGFyIHpvbmUuXG4gICAqXG4gICAqIFVzZSB7QGxpbmsgI3J1bn0gdG8gcmVlbnRlciB0aGUgQW5ndWxhciB6b25lIGFuZCBkbyB3b3JrIHRoYXQgdXBkYXRlcyB0aGUgYXBwbGljYXRpb24gbW9kZWwuXG4gICAqL1xuICBydW5PdXRzaWRlQW5ndWxhcjxUPihmbjogKC4uLmFyZ3M6IGFueVtdKSA9PiBUKTogVCB7XG4gICAgcmV0dXJuICh0aGlzIGFzIGFueSBhcyBOZ1pvbmVQcml2YXRlKS5fb3V0ZXIucnVuKGZuKTtcbiAgfVxufVxuXG5jb25zdCBFTVBUWV9QQVlMT0FEID0ge307XG5cbmludGVyZmFjZSBOZ1pvbmVQcml2YXRlIGV4dGVuZHMgTmdab25lIHtcbiAgX291dGVyOiBab25lO1xuICBfaW5uZXI6IFpvbmU7XG4gIF9uZXN0aW5nOiBudW1iZXI7XG4gIF9oYXNQZW5kaW5nTWljcm90YXNrczogYm9vbGVhbjtcblxuICBoYXNQZW5kaW5nTWFjcm90YXNrczogYm9vbGVhbjtcbiAgaGFzUGVuZGluZ01pY3JvdGFza3M6IGJvb2xlYW47XG4gIGxhc3RSZXF1ZXN0QW5pbWF0aW9uRnJhbWVJZDogbnVtYmVyO1xuICAvKipcbiAgICogQSBmbGFnIHRvIGluZGljYXRlIGlmIE5nWm9uZSBpcyBjdXJyZW50bHkgaW5zaWRlXG4gICAqIGNoZWNrU3RhYmxlIGFuZCB0byBwcmV2ZW50IHJlLWVudHJ5LiBUaGUgZmxhZyBpc1xuICAgKiBuZWVkZWQgYmVjYXVzZSBpdCBpcyBwb3NzaWJsZSB0byBpbnZva2UgdGhlIGNoYW5nZVxuICAgKiBkZXRlY3Rpb24gZnJvbSB3aXRoaW4gY2hhbmdlIGRldGVjdGlvbiBsZWFkaW5nIHRvXG4gICAqIGluY29ycmVjdCBiZWhhdmlvci5cbiAgICpcbiAgICogRm9yIGRldGFpbCwgcGxlYXNlIHJlZmVyIGhlcmUsXG4gICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvcHVsbC80MDU0MFxuICAgKi9cbiAgaXNDaGVja1N0YWJsZVJ1bm5pbmc6IGJvb2xlYW47XG4gIGlzU3RhYmxlOiBib29sZWFuO1xuICAvKipcbiAgICogT3B0aW9uYWxseSBzcGVjaWZ5IGNvYWxlc2NpbmcgZXZlbnQgY2hhbmdlIGRldGVjdGlvbnMgb3Igbm90LlxuICAgKiBDb25zaWRlciB0aGUgZm9sbG93aW5nIGNhc2UuXG4gICAqXG4gICAqIDxkaXYgKGNsaWNrKT1cImRvU29tZXRoaW5nKClcIj5cbiAgICogICA8YnV0dG9uIChjbGljayk9XCJkb1NvbWV0aGluZ0Vsc2UoKVwiPjwvYnV0dG9uPlxuICAgKiA8L2Rpdj5cbiAgICpcbiAgICogV2hlbiBidXR0b24gaXMgY2xpY2tlZCwgYmVjYXVzZSBvZiB0aGUgZXZlbnQgYnViYmxpbmcsIGJvdGhcbiAgICogZXZlbnQgaGFuZGxlcnMgd2lsbCBiZSBjYWxsZWQgYW5kIDIgY2hhbmdlIGRldGVjdGlvbnMgd2lsbCBiZVxuICAgKiB0cmlnZ2VyZWQuIFdlIGNhbiBjb2FsZXNjZSBzdWNoIGtpbmQgb2YgZXZlbnRzIHRvIHRyaWdnZXJcbiAgICogY2hhbmdlIGRldGVjdGlvbiBvbmx5IG9uY2UuXG4gICAqXG4gICAqIEJ5IGRlZmF1bHQsIHRoaXMgb3B0aW9uIHdpbGwgYmUgZmFsc2UuIFNvIHRoZSBldmVudHMgd2lsbCBub3QgYmVcbiAgICogY29hbGVzY2VkIGFuZCB0aGUgY2hhbmdlIGRldGVjdGlvbiB3aWxsIGJlIHRyaWdnZXJlZCBtdWx0aXBsZSB0aW1lcy5cbiAgICogQW5kIGlmIHRoaXMgb3B0aW9uIGJlIHNldCB0byB0cnVlLCB0aGUgY2hhbmdlIGRldGVjdGlvbiB3aWxsIGJlXG4gICAqIHRyaWdnZXJlZCBhc3luYyBieSBzY2hlZHVsaW5nIGl0IGluIGFuIGFuaW1hdGlvbiBmcmFtZS4gU28gaW4gdGhlIGNhc2UgYWJvdmUsXG4gICAqIHRoZSBjaGFuZ2UgZGV0ZWN0aW9uIHdpbGwgb25seSBiZSB0cmlnZ2VkIG9uY2UuXG4gICAqL1xuICBzaG91bGRDb2FsZXNjZUV2ZW50Q2hhbmdlRGV0ZWN0aW9uOiBib29sZWFuO1xuICAvKipcbiAgICogT3B0aW9uYWxseSBzcGVjaWZ5IGlmIGBOZ1pvbmUjcnVuKClgIG1ldGhvZCBpbnZvY2F0aW9ucyBzaG91bGQgYmUgY29hbGVzY2VkXG4gICAqIGludG8gYSBzaW5nbGUgY2hhbmdlIGRldGVjdGlvbi5cbiAgICpcbiAgICogQ29uc2lkZXIgdGhlIGZvbGxvd2luZyBjYXNlLlxuICAgKlxuICAgKiBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICsrKSB7XG4gICAqICAgbmdab25lLnJ1bigoKSA9PiB7XG4gICAqICAgICAvLyBkbyBzb21ldGhpbmdcbiAgICogICB9KTtcbiAgICogfVxuICAgKlxuICAgKiBUaGlzIGNhc2UgdHJpZ2dlcnMgdGhlIGNoYW5nZSBkZXRlY3Rpb24gbXVsdGlwbGUgdGltZXMuXG4gICAqIFdpdGggbmdab25lUnVuQ29hbGVzY2luZyBvcHRpb25zLCBhbGwgY2hhbmdlIGRldGVjdGlvbnMgaW4gYW4gZXZlbnQgbG9vcHMgdHJpZ2dlciBvbmx5IG9uY2UuXG4gICAqIEluIGFkZGl0aW9uLCB0aGUgY2hhbmdlIGRldGVjdGlvbiBleGVjdXRlcyBpbiByZXF1ZXN0QW5pbWF0aW9uLlxuICAgKlxuICAgKi9cbiAgc2hvdWxkQ29hbGVzY2VSdW5DaGFuZ2VEZXRlY3Rpb246IGJvb2xlYW47XG5cbiAgbmF0aXZlUmVxdWVzdEFuaW1hdGlvbkZyYW1lOiAoY2FsbGJhY2s6IEZyYW1lUmVxdWVzdENhbGxiYWNrKSA9PiBudW1iZXI7XG5cbiAgLy8gQ2FjaGUgYSAgXCJmYWtlXCIgdG9wIGV2ZW50VGFzayBzbyB5b3UgZG9uJ3QgbmVlZCB0byBzY2hlZHVsZSBhIG5ldyB0YXNrIGV2ZXJ5XG4gIC8vIHRpbWUgeW91IHJ1biBhIGBjaGVja1N0YWJsZWAuXG4gIGZha2VUb3BFdmVudFRhc2s6IFRhc2s7XG59XG5cbmZ1bmN0aW9uIGNoZWNrU3RhYmxlKHpvbmU6IE5nWm9uZVByaXZhdGUpIHtcbiAgLy8gVE9ETzogQEppYUxpUGFzc2lvbiwgc2hvdWxkIGNoZWNrIHpvbmUuaXNDaGVja1N0YWJsZVJ1bm5pbmcgdG8gcHJldmVudFxuICAvLyByZS1lbnRyeS4gVGhlIGNhc2UgaXM6XG4gIC8vXG4gIC8vIEBDb21wb25lbnQoey4uLn0pXG4gIC8vIGV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xuICAvLyBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nWm9uZTogTmdab25lKSB7XG4gIC8vICAgdGhpcy5uZ1pvbmUub25TdGFibGUuc3Vic2NyaWJlKCgpID0+IHtcbiAgLy8gICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiBjb25zb2xlLmxvZygnc3RhYmxlJyk7KTtcbiAgLy8gICB9KTtcbiAgLy8gfVxuICAvL1xuICAvLyBUaGUgb25TdGFibGUgc3Vic2NyaWJlciBydW4gYW5vdGhlciBmdW5jdGlvbiBpbnNpZGUgbmdab25lXG4gIC8vIHdoaWNoIGNhdXNlcyBgY2hlY2tTdGFibGUoKWAgcmUtZW50cnkuXG4gIC8vIEJ1dCB0aGlzIGZpeCBjYXVzZXMgc29tZSBpc3N1ZXMgaW4gZzMsIHNvIHRoaXMgZml4IHdpbGwgYmVcbiAgLy8gbGF1bmNoZWQgaW4gYW5vdGhlciBQUi5cbiAgaWYgKHpvbmUuX25lc3RpbmcgPT0gMCAmJiAhem9uZS5oYXNQZW5kaW5nTWljcm90YXNrcyAmJiAhem9uZS5pc1N0YWJsZSkge1xuICAgIHRyeSB7XG4gICAgICB6b25lLl9uZXN0aW5nKys7XG4gICAgICB6b25lLm9uTWljcm90YXNrRW1wdHkuZW1pdChudWxsKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgem9uZS5fbmVzdGluZy0tO1xuICAgICAgaWYgKCF6b25lLmhhc1BlbmRpbmdNaWNyb3Rhc2tzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB6b25lLm9uU3RhYmxlLmVtaXQobnVsbCkpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIHpvbmUuaXNTdGFibGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGRlbGF5Q2hhbmdlRGV0ZWN0aW9uRm9yRXZlbnRzKHpvbmU6IE5nWm9uZVByaXZhdGUpIHtcbiAgLyoqXG4gICAqIFdlIGFsc28gbmVlZCB0byBjaGVjayBfbmVzdGluZyBoZXJlXG4gICAqIENvbnNpZGVyIHRoZSBmb2xsb3dpbmcgY2FzZSB3aXRoIHNob3VsZENvYWxlc2NlUnVuQ2hhbmdlRGV0ZWN0aW9uID0gdHJ1ZVxuICAgKlxuICAgKiBuZ1pvbmUucnVuKCgpID0+IHt9KTtcbiAgICogbmdab25lLnJ1bigoKSA9PiB7fSk7XG4gICAqXG4gICAqIFdlIHdhbnQgdGhlIHR3byBgbmdab25lLnJ1bigpYCBvbmx5IHRyaWdnZXIgb25lIGNoYW5nZSBkZXRlY3Rpb25cbiAgICogd2hlbiBzaG91bGRDb2FsZXNjZVJ1bkNoYW5nZURldGVjdGlvbiBpcyB0cnVlLlxuICAgKiBBbmQgYmVjYXVzZSBpbiB0aGlzIGNhc2UsIGNoYW5nZSBkZXRlY3Rpb24gcnVuIGluIGFzeW5jIHdheShyZXF1ZXN0QW5pbWF0aW9uRnJhbWUpLFxuICAgKiBzbyB3ZSBhbHNvIG5lZWQgdG8gY2hlY2sgdGhlIF9uZXN0aW5nIGhlcmUgdG8gcHJldmVudCBtdWx0aXBsZVxuICAgKiBjaGFuZ2UgZGV0ZWN0aW9ucy5cbiAgICovXG4gIGlmICh6b25lLmlzQ2hlY2tTdGFibGVSdW5uaW5nIHx8IHpvbmUubGFzdFJlcXVlc3RBbmltYXRpb25GcmFtZUlkICE9PSAtMSkge1xuICAgIHJldHVybjtcbiAgfVxuICB6b25lLmxhc3RSZXF1ZXN0QW5pbWF0aW9uRnJhbWVJZCA9IHpvbmUubmF0aXZlUmVxdWVzdEFuaW1hdGlvbkZyYW1lLmNhbGwoZ2xvYmFsLCAoKSA9PiB7XG4gICAgLy8gVGhpcyBpcyBhIHdvcmsgYXJvdW5kIGZvciBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8zNjgzOS5cbiAgICAvLyBUaGUgY29yZSBpc3N1ZSBpcyB0aGF0IHdoZW4gZXZlbnQgY29hbGVzY2luZyBpcyBlbmFibGVkIGl0IGlzIHBvc3NpYmxlIGZvciBtaWNyb3Rhc2tzXG4gICAgLy8gdG8gZ2V0IGZsdXNoZWQgdG9vIGVhcmx5IChBcyBpcyB0aGUgY2FzZSB3aXRoIGBQcm9taXNlLnRoZW5gKSBiZXR3ZWVuIHRoZVxuICAgIC8vIGNvYWxlc2NpbmcgZXZlbnRUYXNrcy5cbiAgICAvL1xuICAgIC8vIFRvIHdvcmthcm91bmQgdGhpcyB3ZSBzY2hlZHVsZSBhIFwiZmFrZVwiIGV2ZW50VGFzayBiZWZvcmUgd2UgcHJvY2VzcyB0aGVcbiAgICAvLyBjb2FsZXNjaW5nIGV2ZW50VGFza3MuIFRoZSBiZW5lZml0IG9mIHRoaXMgaXMgdGhhdCB0aGUgXCJmYWtlXCIgY29udGFpbmVyIGV2ZW50VGFza1xuICAgIC8vICB3aWxsIHByZXZlbnQgdGhlIG1pY3JvdGFza3MgcXVldWUgZnJvbSBnZXR0aW5nIGRyYWluZWQgaW4gYmV0d2VlbiB0aGUgY29hbGVzY2luZ1xuICAgIC8vIGV2ZW50VGFzayBleGVjdXRpb24uXG4gICAgaWYgKCF6b25lLmZha2VUb3BFdmVudFRhc2spIHtcbiAgICAgIHpvbmUuZmFrZVRvcEV2ZW50VGFzayA9IFpvbmUucm9vdC5zY2hlZHVsZUV2ZW50VGFzaygnZmFrZVRvcEV2ZW50VGFzaycsICgpID0+IHtcbiAgICAgICAgem9uZS5sYXN0UmVxdWVzdEFuaW1hdGlvbkZyYW1lSWQgPSAtMTtcbiAgICAgICAgdXBkYXRlTWljcm9UYXNrU3RhdHVzKHpvbmUpO1xuICAgICAgICB6b25lLmlzQ2hlY2tTdGFibGVSdW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgY2hlY2tTdGFibGUoem9uZSk7XG4gICAgICAgIHpvbmUuaXNDaGVja1N0YWJsZVJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgIH0sIHVuZGVmaW5lZCwgKCkgPT4ge30sICgpID0+IHt9KTtcbiAgICB9XG4gICAgem9uZS5mYWtlVG9wRXZlbnRUYXNrLmludm9rZSgpO1xuICB9KTtcbiAgdXBkYXRlTWljcm9UYXNrU3RhdHVzKHpvbmUpO1xufVxuXG5mdW5jdGlvbiBmb3JrSW5uZXJab25lV2l0aEFuZ3VsYXJCZWhhdmlvcih6b25lOiBOZ1pvbmVQcml2YXRlKSB7XG4gIGNvbnN0IGRlbGF5Q2hhbmdlRGV0ZWN0aW9uRm9yRXZlbnRzRGVsZWdhdGUgPSAoKSA9PiB7XG4gICAgZGVsYXlDaGFuZ2VEZXRlY3Rpb25Gb3JFdmVudHMoem9uZSk7XG4gIH07XG4gIHpvbmUuX2lubmVyID0gem9uZS5faW5uZXIuZm9yayh7XG4gICAgbmFtZTogJ2FuZ3VsYXInLFxuICAgIHByb3BlcnRpZXM6IDxhbnk+eydpc0FuZ3VsYXJab25lJzogdHJ1ZX0sXG4gICAgb25JbnZva2VUYXNrOlxuICAgICAgICAoZGVsZWdhdGU6IFpvbmVEZWxlZ2F0ZSwgY3VycmVudDogWm9uZSwgdGFyZ2V0OiBab25lLCB0YXNrOiBUYXNrLCBhcHBseVRoaXM6IGFueSxcbiAgICAgICAgIGFwcGx5QXJnczogYW55KTogYW55ID0+IHtcbiAgICAgICAgICBpZiAoc2hvdWxkQmVJZ25vcmVkQnlab25lKGFwcGx5QXJncykpIHtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZS5pbnZva2VUYXNrKHRhcmdldCwgdGFzaywgYXBwbHlUaGlzLCBhcHBseUFyZ3MpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBvbkVudGVyKHpvbmUpO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlLmludm9rZVRhc2sodGFyZ2V0LCB0YXNrLCBhcHBseVRoaXMsIGFwcGx5QXJncyk7XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIGlmICgoem9uZS5zaG91bGRDb2FsZXNjZUV2ZW50Q2hhbmdlRGV0ZWN0aW9uICYmIHRhc2sudHlwZSA9PT0gJ2V2ZW50VGFzaycpIHx8XG4gICAgICAgICAgICAgICAgem9uZS5zaG91bGRDb2FsZXNjZVJ1bkNoYW5nZURldGVjdGlvbikge1xuICAgICAgICAgICAgICBkZWxheUNoYW5nZURldGVjdGlvbkZvckV2ZW50c0RlbGVnYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvbkxlYXZlKHpvbmUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgIG9uSW52b2tlOlxuICAgICAgICAoZGVsZWdhdGU6IFpvbmVEZWxlZ2F0ZSwgY3VycmVudDogWm9uZSwgdGFyZ2V0OiBab25lLCBjYWxsYmFjazogRnVuY3Rpb24sIGFwcGx5VGhpczogYW55LFxuICAgICAgICAgYXBwbHlBcmdzPzogYW55W10sIHNvdXJjZT86IHN0cmluZyk6IGFueSA9PiB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG9uRW50ZXIoem9uZSk7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGUuaW52b2tlKHRhcmdldCwgY2FsbGJhY2ssIGFwcGx5VGhpcywgYXBwbHlBcmdzLCBzb3VyY2UpO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBpZiAoem9uZS5zaG91bGRDb2FsZXNjZVJ1bkNoYW5nZURldGVjdGlvbikge1xuICAgICAgICAgICAgICBkZWxheUNoYW5nZURldGVjdGlvbkZvckV2ZW50c0RlbGVnYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvbkxlYXZlKHpvbmUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgIG9uSGFzVGFzazpcbiAgICAgICAgKGRlbGVnYXRlOiBab25lRGVsZWdhdGUsIGN1cnJlbnQ6IFpvbmUsIHRhcmdldDogWm9uZSwgaGFzVGFza1N0YXRlOiBIYXNUYXNrU3RhdGUpID0+IHtcbiAgICAgICAgICBkZWxlZ2F0ZS5oYXNUYXNrKHRhcmdldCwgaGFzVGFza1N0YXRlKTtcbiAgICAgICAgICBpZiAoY3VycmVudCA9PT0gdGFyZ2V0KSB7XG4gICAgICAgICAgICAvLyBXZSBhcmUgb25seSBpbnRlcmVzdGVkIGluIGhhc1Rhc2sgZXZlbnRzIHdoaWNoIG9yaWdpbmF0ZSBmcm9tIG91ciB6b25lXG4gICAgICAgICAgICAvLyAoQSBjaGlsZCBoYXNUYXNrIGV2ZW50IGlzIG5vdCBpbnRlcmVzdGluZyB0byB1cylcbiAgICAgICAgICAgIGlmIChoYXNUYXNrU3RhdGUuY2hhbmdlID09ICdtaWNyb1Rhc2snKSB7XG4gICAgICAgICAgICAgIHpvbmUuX2hhc1BlbmRpbmdNaWNyb3Rhc2tzID0gaGFzVGFza1N0YXRlLm1pY3JvVGFzaztcbiAgICAgICAgICAgICAgdXBkYXRlTWljcm9UYXNrU3RhdHVzKHpvbmUpO1xuICAgICAgICAgICAgICBjaGVja1N0YWJsZSh6b25lKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaGFzVGFza1N0YXRlLmNoYW5nZSA9PSAnbWFjcm9UYXNrJykge1xuICAgICAgICAgICAgICB6b25lLmhhc1BlbmRpbmdNYWNyb3Rhc2tzID0gaGFzVGFza1N0YXRlLm1hY3JvVGFzaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICBvbkhhbmRsZUVycm9yOiAoZGVsZWdhdGU6IFpvbmVEZWxlZ2F0ZSwgY3VycmVudDogWm9uZSwgdGFyZ2V0OiBab25lLCBlcnJvcjogYW55KTogYm9vbGVhbiA9PiB7XG4gICAgICBkZWxlZ2F0ZS5oYW5kbGVFcnJvcih0YXJnZXQsIGVycm9yKTtcbiAgICAgIHpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gem9uZS5vbkVycm9yLmVtaXQoZXJyb3IpKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVNaWNyb1Rhc2tTdGF0dXMoem9uZTogTmdab25lUHJpdmF0ZSkge1xuICBpZiAoem9uZS5faGFzUGVuZGluZ01pY3JvdGFza3MgfHxcbiAgICAgICgoem9uZS5zaG91bGRDb2FsZXNjZUV2ZW50Q2hhbmdlRGV0ZWN0aW9uIHx8IHpvbmUuc2hvdWxkQ29hbGVzY2VSdW5DaGFuZ2VEZXRlY3Rpb24pICYmXG4gICAgICAgem9uZS5sYXN0UmVxdWVzdEFuaW1hdGlvbkZyYW1lSWQgIT09IC0xKSkge1xuICAgIHpvbmUuaGFzUGVuZGluZ01pY3JvdGFza3MgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHpvbmUuaGFzUGVuZGluZ01pY3JvdGFza3MgPSBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBvbkVudGVyKHpvbmU6IE5nWm9uZVByaXZhdGUpIHtcbiAgem9uZS5fbmVzdGluZysrO1xuICBpZiAoem9uZS5pc1N0YWJsZSkge1xuICAgIHpvbmUuaXNTdGFibGUgPSBmYWxzZTtcbiAgICB6b25lLm9uVW5zdGFibGUuZW1pdChudWxsKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBvbkxlYXZlKHpvbmU6IE5nWm9uZVByaXZhdGUpIHtcbiAgem9uZS5fbmVzdGluZy0tO1xuICBjaGVja1N0YWJsZSh6b25lKTtcbn1cblxuLyoqXG4gKiBQcm92aWRlcyBhIG5vb3AgaW1wbGVtZW50YXRpb24gb2YgYE5nWm9uZWAgd2hpY2ggZG9lcyBub3RoaW5nLiBUaGlzIHpvbmUgcmVxdWlyZXMgZXhwbGljaXQgY2FsbHNcbiAqIHRvIGZyYW1ld29yayB0byBwZXJmb3JtIHJlbmRlcmluZy5cbiAqL1xuZXhwb3J0IGNsYXNzIE5vb3BOZ1pvbmUgaW1wbGVtZW50cyBOZ1pvbmUge1xuICByZWFkb25seSBoYXNQZW5kaW5nTWljcm90YXNrcyA9IGZhbHNlO1xuICByZWFkb25seSBoYXNQZW5kaW5nTWFjcm90YXNrcyA9IGZhbHNlO1xuICByZWFkb25seSBpc1N0YWJsZSA9IHRydWU7XG4gIHJlYWRvbmx5IG9uVW5zdGFibGUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgcmVhZG9ubHkgb25NaWNyb3Rhc2tFbXB0eSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICByZWFkb25seSBvblN0YWJsZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICByZWFkb25seSBvbkVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcnVuPFQ+KGZuOiAoLi4uYXJnczogYW55W10pID0+IFQsIGFwcGx5VGhpcz86IGFueSwgYXBwbHlBcmdzPzogYW55KTogVCB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KGFwcGx5VGhpcywgYXBwbHlBcmdzKTtcbiAgfVxuXG4gIHJ1bkd1YXJkZWQ8VD4oZm46ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55LCBhcHBseVRoaXM/OiBhbnksIGFwcGx5QXJncz86IGFueSk6IFQge1xuICAgIHJldHVybiBmbi5hcHBseShhcHBseVRoaXMsIGFwcGx5QXJncyk7XG4gIH1cblxuICBydW5PdXRzaWRlQW5ndWxhcjxUPihmbjogKC4uLmFyZ3M6IGFueVtdKSA9PiBUKTogVCB7XG4gICAgcmV0dXJuIGZuKCk7XG4gIH1cblxuICBydW5UYXNrPFQ+KGZuOiAoLi4uYXJnczogYW55W10pID0+IFQsIGFwcGx5VGhpcz86IGFueSwgYXBwbHlBcmdzPzogYW55LCBuYW1lPzogc3RyaW5nKTogVCB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KGFwcGx5VGhpcywgYXBwbHlBcmdzKTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIHNob3VsZEJlSWdub3JlZEJ5Wm9uZShhcHBseUFyZ3M6IHVua25vd24pOiBib29sZWFuIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGFwcGx5QXJncykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBXZSBzaG91bGQgb25seSBldmVyIGdldCAxIGFyZyBwYXNzZWQgdGhyb3VnaCB0byBpbnZva2VUYXNrLlxuICAvLyBTaG9ydCBjaXJjdWl0IGhlcmUgaW5jYXNlIHRoYXQgYmVoYXZpb3IgY2hhbmdlcy5cbiAgaWYgKGFwcGx5QXJncy5sZW5ndGggIT09IDEpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBQcmV2ZW50IHRyaWdnZXJpbmcgY2hhbmdlIGRldGVjdGlvbiB3aGVuIHRoZSBfX2lnbm9yZV9uZ196b25lX18gZmxhZyBpcyBkZXRlY3RlZC5cbiAgcmV0dXJuIGFwcGx5QXJnc1swXS5kYXRhPy5bJ19faWdub3JlX25nX3pvbmVfXyddID09PSB0cnVlO1xufVxuXG5cbi8vIFNldCBvZiBvcHRpb25zIHJlY29nbml6ZWQgYnkgdGhlIE5nWm9uZS5cbmV4cG9ydCBpbnRlcmZhY2UgSW50ZXJuYWxOZ1pvbmVPcHRpb25zIHtcbiAgZW5hYmxlTG9uZ1N0YWNrVHJhY2U6IGJvb2xlYW47XG4gIHNob3VsZENvYWxlc2NlRXZlbnRDaGFuZ2VEZXRlY3Rpb246IGJvb2xlYW47XG4gIHNob3VsZENvYWxlc2NlUnVuQ2hhbmdlRGV0ZWN0aW9uOiBib29sZWFuO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXROZ1pvbmUoXG4gICAgbmdab25lVG9Vc2U6IE5nWm9uZXwnem9uZS5qcyd8J25vb3AnID0gJ3pvbmUuanMnLCBvcHRpb25zOiBJbnRlcm5hbE5nWm9uZU9wdGlvbnMpOiBOZ1pvbmUge1xuICBpZiAobmdab25lVG9Vc2UgPT09ICdub29wJykge1xuICAgIHJldHVybiBuZXcgTm9vcE5nWm9uZSgpO1xuICB9XG4gIGlmIChuZ1pvbmVUb1VzZSA9PT0gJ3pvbmUuanMnKSB7XG4gICAgcmV0dXJuIG5ldyBOZ1pvbmUob3B0aW9ucyk7XG4gIH1cbiAgcmV0dXJuIG5nWm9uZVRvVXNlO1xufVxuIl19