/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { inject, ɵɵdefineInjectable } from '../di';
import { INJECTOR } from '../render3/interfaces/view';
import { NgZone } from '../zone';
/**
 * Helper function to schedule a callback to be invoked when a browser becomes idle.
 *
 * @param callback A function to be invoked when a browser becomes idle.
 * @param lView LView that hosts an instance of a defer block.
 */
export function onIdle(callback, lView) {
    const injector = lView[INJECTOR];
    const scheduler = injector.get(IdleScheduler);
    const cleanupFn = () => scheduler.remove(callback);
    scheduler.add(callback);
    return cleanupFn;
}
/**
 * Use shims for the `requestIdleCallback` and `cancelIdleCallback` functions for
 * environments where those functions are not available (e.g. Node.js and Safari).
 *
 * Note: we wrap the `requestIdleCallback` call into a function, so that it can be
 * overridden/mocked in test environment and picked up by the runtime code.
 */
const _requestIdleCallback = () => typeof requestIdleCallback !== 'undefined' ? requestIdleCallback : setTimeout;
const _cancelIdleCallback = () => typeof requestIdleCallback !== 'undefined' ? cancelIdleCallback : clearTimeout;
/**
 * Helper service to schedule `requestIdleCallback`s for batches of defer blocks,
 * to avoid calling `requestIdleCallback` for each defer block (e.g. if
 * defer blocks are defined inside a for loop).
 */
export class IdleScheduler {
    constructor() {
        // Indicates whether current callbacks are being invoked.
        this.executingCallbacks = false;
        // Currently scheduled idle callback id.
        this.idleId = null;
        // Set of callbacks to be invoked next.
        this.current = new Set();
        // Set of callbacks collected while invoking current set of callbacks.
        // Those callbacks are scheduled for the next idle period.
        this.deferred = new Set();
        this.ngZone = inject(NgZone);
        this.requestIdleCallbackFn = _requestIdleCallback().bind(globalThis);
        this.cancelIdleCallbackFn = _cancelIdleCallback().bind(globalThis);
    }
    add(callback) {
        const target = this.executingCallbacks ? this.deferred : this.current;
        target.add(callback);
        if (this.idleId === null) {
            this.scheduleIdleCallback();
        }
    }
    remove(callback) {
        const { current, deferred } = this;
        current.delete(callback);
        deferred.delete(callback);
        // If the last callback was removed and there is a pending
        // idle callback - cancel it.
        if (current.size === 0 && deferred.size === 0) {
            this.cancelIdleCallback();
        }
    }
    scheduleIdleCallback() {
        const callback = () => {
            this.cancelIdleCallback();
            this.executingCallbacks = true;
            for (const callback of this.current) {
                callback();
            }
            this.current.clear();
            this.executingCallbacks = false;
            // If there are any callbacks added during an invocation
            // of the current ones - make them "current" and schedule
            // a new idle callback.
            if (this.deferred.size > 0) {
                for (const callback of this.deferred) {
                    this.current.add(callback);
                }
                this.deferred.clear();
                this.scheduleIdleCallback();
            }
        };
        // Ensure that the callback runs in the NgZone since
        // the `requestIdleCallback` is not currently patched by Zone.js.
        this.idleId = this.requestIdleCallbackFn(() => this.ngZone.run(callback));
    }
    cancelIdleCallback() {
        if (this.idleId !== null) {
            this.cancelIdleCallbackFn(this.idleId);
            this.idleId = null;
        }
    }
    ngOnDestroy() {
        this.cancelIdleCallback();
        this.current.clear();
        this.deferred.clear();
    }
    /** @nocollapse */
    static { this.ɵprov = ɵɵdefineInjectable({
        token: IdleScheduler,
        providedIn: 'root',
        factory: () => new IdleScheduler(),
    }); }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRsZV9zY2hlZHVsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9kZWZlci9pZGxlX3NjaGVkdWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsTUFBTSxFQUFFLGtCQUFrQixFQUFDLE1BQU0sT0FBTyxDQUFDO0FBQ2pELE9BQU8sRUFBQyxRQUFRLEVBQVEsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBRS9COzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLE1BQU0sQ0FBQyxRQUFzQixFQUFFLEtBQVk7SUFDekQsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDO0lBQ2xDLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDOUMsTUFBTSxTQUFTLEdBQUcsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuRCxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hCLE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLG9CQUFvQixHQUFHLEdBQUcsRUFBRSxDQUM5QixPQUFPLG1CQUFtQixLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztBQUNsRixNQUFNLG1CQUFtQixHQUFHLEdBQUcsRUFBRSxDQUM3QixPQUFPLG1CQUFtQixLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztBQUVuRjs7OztHQUlHO0FBQ0gsTUFBTSxPQUFPLGFBQWE7SUFBMUI7UUFDRSx5REFBeUQ7UUFDekQsdUJB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QUFDO1FBQ3JCLENBQUM7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsa0JBQWtCO2FBQ1gsVUFBSyxHQUE2QixrQkFBa0IsQ0FBQztRQUMxRCxLQUFLLEVBQUUsYUFBYTtRQUNwQixVQUFVLEVBQUUsTUFBTTtRQUNsQixPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxhQUFhLEVBQUU7S0FDbkMsQ0FBQyxBQUpVLENBSVQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtpbmplY3QsIMm1ybVkZWZpbmVJbmplY3RhYmxlfSBmcm9tICcuLi9kaSc7XG5pbXBvcnQge0lOSkVDVE9SLCBMVmlld30gZnJvbSAnLi4vcmVuZGVyMy9pbnRlcmZhY2VzL3ZpZXcnO1xuaW1wb3J0IHtOZ1pvbmV9IGZyb20gJy4uL3pvbmUnO1xuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBzY2hlZHVsZSBhIGNhbGxiYWNrIHRvIGJlIGludm9rZWQgd2hlbiBhIGJyb3dzZXIgYmVjb21lcyBpZGxlLlxuICpcbiAqIEBwYXJhbSBjYWxsYmFjayBBIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgd2hlbiBhIGJyb3dzZXIgYmVjb21lcyBpZGxlLlxuICogQHBhcmFtIGxWaWV3IExWaWV3IHRoYXQgaG9zdHMgYW4gaW5zdGFuY2Ugb2YgYSBkZWZlciBibG9jay5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uSWRsZShjYWxsYmFjazogVm9pZEZ1bmN0aW9uLCBsVmlldzogTFZpZXcpIHtcbiAgY29uc3QgaW5qZWN0b3IgPSBsVmlld1tJTkpFQ1RPUl0hO1xuICBjb25zdCBzY2hlZHVsZXIgPSBpbmplY3Rvci5nZXQoSWRsZVNjaGVkdWxlcik7XG4gIGNvbnN0IGNsZWFudXBGbiA9ICgpID0+IHNjaGVkdWxlci5yZW1vdmUoY2FsbGJhY2spO1xuICBzY2hlZHVsZXIuYWRkKGNhbGxiYWNrKTtcbiAgcmV0dXJuIGNsZWFudXBGbjtcbn1cblxuLyoqXG4gKiBVc2Ugc2hpbXMgZm9yIHRoZSBgcmVxdWVzdElkbGVDYWxsYmFja2AgYW5kIGBjYW5jZWxJZGxlQ2FsbGJhY2tgIGZ1bmN0aW9ucyBmb3JcbiAqIGVudmlyb25tZW50cyB3aGVyZSB0aG9zZSBmdW5jdGlvbnMgYXJlIG5vdCBhdmFpbGFibGUgKGUuZy4gTm9kZS5qcyBhbmQgU2FmYXJpKS5cbiAqXG4gKiBOb3RlOiB3ZSB3cmFwIHRoZSBgcmVxdWVzdElkbGVDYWxsYmFja2AgY2FsbCBpbnRvIGEgZnVuY3Rpb24sIHNvIHRoYXQgaXQgY2FuIGJlXG4gKiBvdmVycmlkZGVuL21vY2tlZCBpbiB0ZXN0IGVudmlyb25tZW50IGFuZCBwaWNrZWQgdXAgYnkgdGhlIHJ1bnRpbWUgY29kZS5cbiAqL1xuY29uc3QgX3JlcXVlc3RJZGxlQ2FsbGJhY2sgPSAoKSA9PlxuICAgIHR5cGVvZiByZXF1ZXN0SWRsZUNhbGxiYWNrICE9PSAndW5kZWZpbmVkJyA/IHJlcXVlc3RJZGxlQ2FsbGJhY2sgOiBzZXRUaW1lb3V0O1xuY29uc3QgX2NhbmNlbElkbGVDYWxsYmFjayA9ICgpID0+XG4gICAgdHlwZW9mIHJlcXVlc3RJZGxlQ2FsbGJhY2sgIT09ICd1bmRlZmluZWQnID8gY2FuY2VsSWRsZUNhbGxiYWNrIDogY2xlYXJUaW1lb3V0O1xuXG4vKipcbiAqIEhlbHBlciBzZXJ2aWNlIHRvIHNjaGVkdWxlIGByZXF1ZXN0SWRsZUNhbGxiYWNrYHMgZm9yIGJhdGNoZXMgb2YgZGVmZXIgYmxvY2tzLFxuICogdG8gYXZvaWQgY2FsbGluZyBgcmVxdWVzdElkbGVDYWxsYmFja2AgZm9yIGVhY2ggZGVmZXIgYmxvY2sgKGUuZy4gaWZcbiAqIGRlZmVyIGJsb2NrcyBhcmUgZGVmaW5lZCBpbnNpZGUgYSBmb3IgbG9vcCkuXG4gKi9cbmV4cG9ydCBjbGFzcyBJZGxlU2NoZWR1bGVyIHtcbiAgLy8gSW5kaWNhdGVzIHdoZXRoZXIgY3VycmVudCBjYWxsYmFja3MgYXJlIGJlaW5nIGludm9rZWQuXG4gIGV4ZWN1dGluZ0NhbGxiYWNrcyA9IGZhbHNlO1xuXG4gIC8vIEN1cnJlbnRseSBzY2hlZHVsZWQgaWRsZSBjYWxsYmFjayBpZC5cbiAgaWRsZUlkOiBudW1iZXJ8bnVsbCA9IG51bGw7XG5cbiAgLy8gU2V0IG9mIGNhbGxiYWNrcyB0byBiZSBpbnZva2VkIG5leHQuXG4gIGN1cnJlbnQgPSBuZXcgU2V0PFZvaWRGdW5jdGlvbj4oKTtcblxuICAvLyBTZXQgb2YgY2FsbGJhY2tzIGNvbGxlY3RlZCB3aGlsZSBpbnZva2luZyBjdXJyZW50IHNldCBvZiBjYWxsYmFja3MuXG4gIC8vIFRob3NlIGNhbGxiYWNrcyBhcmUgc2NoZWR1bGVkIGZvciB0aGUgbmV4dCBpZGxlIHBlcmlvZC5cbiAgZGVmZXJyZWQgPSBuZXcgU2V0PFZvaWRGdW5jdGlvbj4oKTtcblxuICBuZ1pvbmUgPSBpbmplY3QoTmdab25lKTtcblxuICByZXF1ZXN0SWRsZUNhbGxiYWNrRm4gPSBfcmVxdWVzdElkbGVDYWxsYmFjaygpLmJpbmQoZ2xvYmFsVGhpcyk7XG4gIGNhbmNlbElkbGVDYWxsYmFja0ZuID0gX2NhbmNlbElkbGVDYWxsYmFjaygpLmJpbmQoZ2xvYmFsVGhpcyk7XG5cbiAgYWRkKGNhbGxiYWNrOiBWb2lkRnVuY3Rpb24pIHtcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmV4ZWN1dGluZ0NhbGxiYWNrcyA/IHRoaXMuZGVmZXJyZWQgOiB0aGlzLmN1cnJlbnQ7XG4gICAgdGFyZ2V0LmFkZChjYWxsYmFjayk7XG4gICAgaWYgKHRoaXMuaWRsZUlkID09PSBudWxsKSB7XG4gICAgICB0aGlzLnNjaGVkdWxlSWRsZUNhbGxiYWNrKCk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlKGNhbGxiYWNrOiBWb2lkRnVuY3Rpb24pIHtcbiAgICBjb25zdCB7Y3VycmVudCwgZGVmZXJyZWR9ID0gdGhpcztcblxuICAgIGN1cnJlbnQuZGVsZXRlKGNhbGxiYWNrKTtcbiAgICBkZWZlcnJlZC5kZWxldGUoY2FsbGJhY2spO1xuXG4gICAgLy8gSWYgdGhlIGxhc3QgY2FsbGJhY2sgd2FzIHJlbW92ZWQgYW5kIHRoZXJlIGlzIGEgcGVuZGluZ1xuICAgIC8vIGlkbGUgY2FsbGJhY2sgLSBjYW5jZWwgaXQuXG4gICAgaWYgKGN1cnJlbnQuc2l6ZSA9PT0gMCAmJiBkZWZlcnJlZC5zaXplID09PSAwKSB7XG4gICAgICB0aGlzLmNhbmNlbElkbGVDYWxsYmFjaygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2NoZWR1bGVJZGxlQ2FsbGJhY2soKSB7XG4gICAgY29uc3QgY2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICB0aGlzLmNhbmNlbElkbGVDYWxsYmFjaygpO1xuXG4gICAgICB0aGlzLmV4ZWN1dGluZ0NhbGxiYWNrcyA9IHRydWU7XG5cbiAgICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgdGhpcy5jdXJyZW50KSB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgICB0aGlzLmN1cnJlbnQuY2xlYXIoKTtcblxuICAgICAgdGhpcy5leGVjdXRpbmdDYWxsYmFja3MgPSBmYWxzZTtcblxuICAgICAgLy8gSWYgdGhlcmUgYXJlIGFueSBjYWxsYmFja3MgYWRkZWQgZHVyaW5nIGFuIGludm9jYXRpb25cbiAgICAgIC8vIG9mIHRoZSBjdXJyZW50IG9uZXMgLSBtYWtlIHRoZW0gXCJjdXJyZW50XCIgYW5kIHNjaGVkdWxlXG4gICAgICAvLyBhIG5ldyBpZGxlIGNhbGxiYWNrLlxuICAgICAgaWYgKHRoaXMuZGVmZXJyZWQuc2l6ZSA+IDApIHtcbiAgICAgICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiB0aGlzLmRlZmVycmVkKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50LmFkZChjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZWZlcnJlZC5jbGVhcigpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlSWRsZUNhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICAvLyBFbnN1cmUgdGhhdCB0aGUgY2FsbGJhY2sgcnVucyBpbiB0aGUgTmdab25lIHNpbmNlXG4gICAgLy8gdGhlIGByZXF1ZXN0SWRsZUNhbGxiYWNrYCBpcyBub3QgY3VycmVudGx5IHBhdGNoZWQgYnkgWm9uZS5qcy5cbiAgICB0aGlzLmlkbGVJZCA9IHRoaXMucmVxdWVzdElkbGVDYWxsYmFja0ZuKCgpID0+IHRoaXMubmdab25lLnJ1bihjYWxsYmFjaykpIGFzIG51bWJlcjtcbiAgfVxuXG4gIHByaXZhdGUgY2FuY2VsSWRsZUNhbGxiYWNrKCkge1xuICAgIGlmICh0aGlzLmlkbGVJZCAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5jYW5jZWxJZGxlQ2FsbGJhY2tGbih0aGlzLmlkbGVJZCk7XG4gICAgICB0aGlzLmlkbGVJZCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5jYW5jZWxJZGxlQ2FsbGJhY2soKTtcbiAgICB0aGlzLmN1cnJlbnQuY2xlYXIoKTtcbiAgICB0aGlzLmRlZmVycmVkLmNsZWFyKCk7XG4gIH1cblxuICAvKiogQG5vY29sbGFwc2UgKi9cbiAgc3RhdGljIMm1cHJvdiA9IC8qKiBAcHVyZU9yQnJlYWtNeUNvZGUgKi8gybXJtWRlZmluZUluamVjdGFibGUoe1xuICAgIHRva2VuOiBJZGxlU2NoZWR1bGVyLFxuICAgIHByb3ZpZGVkSW46ICdyb290JyxcbiAgICBmYWN0b3J5OiAoKSA9PiBuZXcgSWRsZVNjaGVkdWxlcigpLFxuICB9KTtcbn1cbiJdfQ==