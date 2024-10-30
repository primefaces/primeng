/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵɵdefineInjectable } from '../di';
import { INJECTOR } from '../render3/interfaces/view';
import { arrayInsert2, arraySplice } from '../util/array_utils';
/**
 * Returns a function that captures a provided delay.
 * Invoking the returned function schedules a trigger.
 */
export function onTimer(delay) {
    return (callback, lView) => scheduleTimerTrigger(delay, callback, lView);
}
/**
 * Schedules a callback to be invoked after a given timeout.
 *
 * @param delay A number of ms to wait until firing a callback.
 * @param callback A function to be invoked after a timeout.
 * @param lView LView that hosts an instance of a defer block.
 */
export function scheduleTimerTrigger(delay, callback, lView) {
    const injector = lView[INJECTOR];
    const scheduler = injector.get(TimerScheduler);
    const cleanupFn = () => scheduler.remove(callback);
    scheduler.add(delay, callback);
    return cleanupFn;
}
/**
 * Helper service to schedule `setTimeout`s for batches of defer blocks,
 * to avoid calling `setTimeout` for each defer block (e.g. if defer blocks
 * are created inside a for loop).
 */
export class TimerScheduler {
    constructor() {
        // Indicates whether current callbacks are being invoked.
        this.executingCallbacks = false;
        // Currently scheduled `setTimeout` id.
        this.timeoutId = null;
        // When currently scheduled timer would fire.
        this.invokeTimerAt = null;
        // List of callbacks to be invoked.
        // For each callback we also store a timestamp on when the callback
        // should be invoked. We store timestamps and callback functions
        // in a flat array to avoid creating new objects for each entry.
        // [timestamp1, callback1, timestamp2, callback2, ...]
        this.current = [];
        // List of callbacks collected while invoking current set of callbacks.
        // Those callbacks are added to the "current" queue at the end of
        // the current callback invocation. The shape of this list is the same
        // as the shape of the `current` list.
        this.deferred = [];
    }
    add(delay, callback) {
        const target = this.executingCallbacks ? this.deferred : this.current;
        this.addToQueue(target, Date.now() + delay, callback);
        this.scheduleTimer();
    }
    remove(callback) {
        const { current, deferred } = this;
        const callbackIndex = this.removeFromQueue(current, callback);
        if (callbackIndex === -1) {
            // Try cleaning up deferred queue only in case
            // we didn't find a callback in the "current" queue.
            this.removeFromQueue(deferred, callback);
        }
        // If the last callback was removed and there is a pending timeout - cancel it.
        if (current.length === 0 && deferred.length === 0) {
            this.clearTimeout();
        }
    }
    addToQueue(target, invokeAt, callback) {
        let insertAtIndex = target.length;
        for (let i = 0; i < target.length; i += 2) {
            const invokeQueuedCallbackAt = target[i];
            if (invokeQueuedCallbackAt > invokeAt) {
                // We've reached a first timer that is scheduled
                // for a later time than what we are trying to insert.
                // This is the location at which we need to insert,
                // no need to iterate further.
                insertAtIndex = i;
                break;
            }
        }
        arrayInsert2(target, insertAtIndex, invokeAt, callback);
    }
    removeFromQueue(target, callback) {
        let index = -1;
        for (let i = 0; i < target.length; i += 2) {
            const queuedCallback = target[i + 1];
            if (queuedCallback === callback) {
                index = i;
                break;
            }
        }
        if (index > -1) {
            // Remove 2 elements: a timestamp slot and
            // the following slot with a callback function.
            arraySplice(target, index, 2);
        }
        return index;
    }
    scheduleTimer() {
        const callback = () => {
            this.clearTimeout();
            this.executingCallbacks = true;
            // Clone the current state of the queue, since it might be altered
            // as we invoke callbacks.
            const current = [...this.current];
            // Invoke callbacks that were scheduled to run before the current time.
            const now = Date.now();
            for (let i = 0; i < current.length; i += 2) {
                const invokeAt = current[i];
                const callback = current[i + 1];
                if (invokeAt <= now) {
                    callback();
                }
                else {
                    // We've reached a timer that should not be invoked yet.
                    break;
                }
            }
            // The state of the queue might've changed after callbacks invocation,
            // run the cleanup logic based on the *current* state of the queue.
            let lastCallbackIndex = -1;
            for (let i = 0; i < this.current.length; i += 2) {
                const invokeAt = this.current[i];
                if (invokeAt <= now) {
                    // Add +1 to account for a callback function that
                    // goes after the timestamp in events array.
                    lastCallbackIndex = i + 1;
                }
                else {
                    // We've reached a timer that should not be invoked yet.
                    break;
                }
            }
            if (lastCallbackIndex >= 0) {
                arraySplice(this.current, 0, lastCallbackIndex + 1);
            }
            this.executingCallbacks = false;
            // If there are any callbacks added during an invocation
            // of the current ones - move them over to the "current"
            // queue.
            if (this.deferred.length > 0) {
                for (let i = 0; i < this.deferred.length; i += 2) {
                    const invokeAt = this.deferred[i];
                    const callback = this.deferred[i + 1];
                    this.addToQueue(this.current, invokeAt, callback);
                }
                this.deferred.length = 0;
            }
            this.scheduleTimer();
        };
        // Avoid running timer callbacks more than once per
        // average frame duration. This is needed for better
        // batching and to avoid kicking off excessive change
        // detection cycles.
        const FRAME_DURATION_MS = 16; // 1000ms / 60fps
        if (this.current.length > 0) {
            const now = Date.now();
            // First element in the queue points at the timestamp
            // of the first (earliest) event.
            const invokeAt = this.current[0];
            if (this.timeoutId === null ||
                // Reschedule a timer in case a queue contains an item with
                // an earlier timestamp and the delta is more than an average
                // frame duration.
                (this.invokeTimerAt && (this.invokeTimerAt - invokeAt > FRAME_DURATION_MS))) {
                // There was a timeout already, but an earlier event was added
                // into the queue. In this case we drop an old timer and setup
                // a new one with an updated (smaller) timeout.
                this.clearTimeout();
                const timeout = Math.max(invokeAt - now, FRAME_DURATION_MS);
                this.invokeTimerAt = invokeAt;
                this.timeoutId = setTimeout(callback, timeout);
            }
        }
    }
    clearTimeout() {
        if (this.timeoutId !== null) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }
    ngOnDestroy() {
        this.clearTimeout();
        this.current.length = 0;
        this.deferred.length = 0;
    }
    /** @nocollapse */
    static { this.ɵprov = ɵɵdefineInjectable({
        token: TimerScheduler,
        providedIn: 'root',
        factory: () => new TimerScheduler(),
    }); }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXJfc2NoZWR1bGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvZGVmZXIvdGltZXJfc2NoZWR1bGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLE9BQU8sQ0FBQztBQUN6QyxPQUFPLEVBQUMsUUFBUSxFQUFRLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFDLFlBQVksRUFBRSxXQUFXLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUU5RDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsT0FBTyxDQUFDLEtBQWE7SUFDbkMsT0FBTyxDQUFDLFFBQXNCLEVBQUUsS0FBWSxFQUFFLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ2hHLENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsS0FBYSxFQUFFLFFBQXNCLEVBQUUsS0FBWTtJQUN0RixNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFFLENBQUM7SUFDbEMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUMvQyxNQUFNLFNBQVMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25ELFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxPQUFPLGNBQWM7SUFBM0I7UUFDRSx5REFBeUQ7UUFDekQsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBRTNCLHVDQUF1QztRQUN2QyxjQUFTLEdBQWdCLElBQUksQ0FB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QixrQkFBa0IsQ0FBQztRQUMxRCxLQUFLLEVBQUUsY0FBYztRQUNyQixVQUFVLEVBQUUsTUFBTTtRQUNsQixPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxjQUFjLEVBQUU7S0FDcEMsQ0FBQyxBQUpVLENBSVQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHvJtcm1ZGVmaW5lSW5qZWN0YWJsZX0gZnJvbSAnLi4vZGknO1xuaW1wb3J0IHtJTkpFQ1RPUiwgTFZpZXd9IGZyb20gJy4uL3JlbmRlcjMvaW50ZXJmYWNlcy92aWV3JztcbmltcG9ydCB7YXJyYXlJbnNlcnQyLCBhcnJheVNwbGljZX0gZnJvbSAnLi4vdXRpbC9hcnJheV91dGlscyc7XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgY2FwdHVyZXMgYSBwcm92aWRlZCBkZWxheS5cbiAqIEludm9raW5nIHRoZSByZXR1cm5lZCBmdW5jdGlvbiBzY2hlZHVsZXMgYSB0cmlnZ2VyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gb25UaW1lcihkZWxheTogbnVtYmVyKSB7XG4gIHJldHVybiAoY2FsbGJhY2s6IFZvaWRGdW5jdGlvbiwgbFZpZXc6IExWaWV3KSA9PiBzY2hlZHVsZVRpbWVyVHJpZ2dlcihkZWxheSwgY2FsbGJhY2ssIGxWaWV3KTtcbn1cblxuLyoqXG4gKiBTY2hlZHVsZXMgYSBjYWxsYmFjayB0byBiZSBpbnZva2VkIGFmdGVyIGEgZ2l2ZW4gdGltZW91dC5cbiAqXG4gKiBAcGFyYW0gZGVsYXkgQSBudW1iZXIgb2YgbXMgdG8gd2FpdCB1bnRpbCBmaXJpbmcgYSBjYWxsYmFjay5cbiAqIEBwYXJhbSBjYWxsYmFjayBBIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgYWZ0ZXIgYSB0aW1lb3V0LlxuICogQHBhcmFtIGxWaWV3IExWaWV3IHRoYXQgaG9zdHMgYW4gaW5zdGFuY2Ugb2YgYSBkZWZlciBibG9jay5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNjaGVkdWxlVGltZXJUcmlnZ2VyKGRlbGF5OiBudW1iZXIsIGNhbGxiYWNrOiBWb2lkRnVuY3Rpb24sIGxWaWV3OiBMVmlldykge1xuICBjb25zdCBpbmplY3RvciA9IGxWaWV3W0lOSkVDVE9SXSE7XG4gIGNvbnN0IHNjaGVkdWxlciA9IGluamVjdG9yLmdldChUaW1lclNjaGVkdWxlcik7XG4gIGNvbnN0IGNsZWFudXBGbiA9ICgpID0+IHNjaGVkdWxlci5yZW1vdmUoY2FsbGJhY2spO1xuICBzY2hlZHVsZXIuYWRkKGRlbGF5LCBjYWxsYmFjayk7XG4gIHJldHVybiBjbGVhbnVwRm47XG59XG5cbi8qKlxuICogSGVscGVyIHNlcnZpY2UgdG8gc2NoZWR1bGUgYHNldFRpbWVvdXRgcyBmb3IgYmF0Y2hlcyBvZiBkZWZlciBibG9ja3MsXG4gKiB0byBhdm9pZCBjYWxsaW5nIGBzZXRUaW1lb3V0YCBmb3IgZWFjaCBkZWZlciBibG9jayAoZS5nLiBpZiBkZWZlciBibG9ja3NcbiAqIGFyZSBjcmVhdGVkIGluc2lkZSBhIGZvciBsb29wKS5cbiAqL1xuZXhwb3J0IGNsYXNzIFRpbWVyU2NoZWR1bGVyIHtcbiAgLy8gSW5kaWNhdGVzIHdoZXRoZXIgY3VycmVudCBjYWxsYmFja3MgYXJlIGJlaW5nIGludm9rZWQuXG4gIGV4ZWN1dGluZ0NhbGxiYWNrcyA9IGZhbHNlO1xuXG4gIC8vIEN1cnJlbnRseSBzY2hlZHVsZWQgYHNldFRpbWVvdXRgIGlkLlxuICB0aW1lb3V0SWQ6IG51bWJlcnxudWxsID0gbnVsbDtcblxuICAvLyBXaGVuIGN1cnJlbnRseSBzY2hlZHVsZWQgdGltZXIgd291bGQgZmlyZS5cbiAgaW52b2tlVGltZXJBdDogbnVtYmVyfG51bGwgPSBudWxsO1xuXG4gIC8vIExpc3Qgb2YgY2FsbGJhY2tzIHRvIGJlIGludm9rZWQuXG4gIC8vIEZvciBlYWNoIGNhbGxiYWNrIHdlIGFsc28gc3RvcmUgYSB0aW1lc3RhbXAgb24gd2hlbiB0aGUgY2FsbGJhY2tcbiAgLy8gc2hvdWxkIGJlIGludm9rZWQuIFdlIHN0b3JlIHRpbWVzdGFtcHMgYW5kIGNhbGxiYWNrIGZ1bmN0aW9uc1xuICAvLyBpbiBhIGZsYXQgYXJyYXkgdG8gYXZvaWQgY3JlYXRpbmcgbmV3IG9iamVjdHMgZm9yIGVhY2ggZW50cnkuXG4gIC8vIFt0aW1lc3RhbXAxLCBjYWxsYmFjazEsIHRpbWVzdGFtcDIsIGNhbGxiYWNrMiwgLi4uXVxuICBjdXJyZW50OiBBcnJheTxudW1iZXJ8Vm9pZEZ1bmN0aW9uPiA9IFtdO1xuXG4gIC8vIExpc3Qgb2YgY2FsbGJhY2tzIGNvbGxlY3RlZCB3aGlsZSBpbnZva2luZyBjdXJyZW50IHNldCBvZiBjYWxsYmFja3MuXG4gIC8vIFRob3NlIGNhbGxiYWNrcyBhcmUgYWRkZWQgdG8gdGhlIFwiY3VycmVudFwiIHF1ZXVlIGF0IHRoZSBlbmQgb2ZcbiAgLy8gdGhlIGN1cnJlbnQgY2FsbGJhY2sgaW52b2NhdGlvbi4gVGhlIHNoYXBlIG9mIHRoaXMgbGlzdCBpcyB0aGUgc2FtZVxuICAvLyBhcyB0aGUgc2hhcGUgb2YgdGhlIGBjdXJyZW50YCBsaXN0LlxuICBkZWZlcnJlZDogQXJyYXk8bnVtYmVyfFZvaWRGdW5jdGlvbj4gPSBbXTtcblxuICBhZGQoZGVsYXk6IG51bWJlciwgY2FsbGJhY2s6IFZvaWRGdW5jdGlvbikge1xuICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZXhlY3V0aW5nQ2FsbGJhY2tzID8gdGhpcy5kZWZlcnJlZCA6IHRoaXMuY3VycmVudDtcbiAgICB0aGlzLmFkZFRvUXVldWUodGFyZ2V0LCBEYXRlLm5vdygpICsgZGVsYXksIGNhbGxiYWNrKTtcbiAgICB0aGlzLnNjaGVkdWxlVGltZXIoKTtcbiAgfVxuXG4gIHJlbW92ZShjYWxsYmFjazogVm9pZEZ1bmN0aW9uKSB7XG4gICAgY29uc3Qge2N1cnJlbnQsIGRlZmVycmVkfSA9IHRoaXM7XG4gICAgY29uc3QgY2FsbGJhY2tJbmRleCA9IHRoaXMucmVtb3ZlRnJvbVF1ZXVlKGN1cnJlbnQsIGNhbGxiYWNrKTtcbiAgICBpZiAoY2FsbGJhY2tJbmRleCA9PT0gLTEpIHtcbiAgICAgIC8vIFRyeSBjbGVhbmluZyB1cCBkZWZlcnJlZCBxdWV1ZSBvbmx5IGluIGNhc2VcbiAgICAgIC8vIHdlIGRpZG4ndCBmaW5kIGEgY2FsbGJhY2sgaW4gdGhlIFwiY3VycmVudFwiIHF1ZXVlLlxuICAgICAgdGhpcy5yZW1vdmVGcm9tUXVldWUoZGVmZXJyZWQsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgLy8gSWYgdGhlIGxhc3QgY2FsbGJhY2sgd2FzIHJlbW92ZWQgYW5kIHRoZXJlIGlzIGEgcGVuZGluZyB0aW1lb3V0IC0gY2FuY2VsIGl0LlxuICAgIGlmIChjdXJyZW50Lmxlbmd0aCA9PT0gMCAmJiBkZWZlcnJlZC5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuY2xlYXJUaW1lb3V0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhZGRUb1F1ZXVlKHRhcmdldDogQXJyYXk8bnVtYmVyfFZvaWRGdW5jdGlvbj4sIGludm9rZUF0OiBudW1iZXIsIGNhbGxiYWNrOiBWb2lkRnVuY3Rpb24pIHtcbiAgICBsZXQgaW5zZXJ0QXRJbmRleCA9IHRhcmdldC5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YXJnZXQubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgIGNvbnN0IGludm9rZVF1ZXVlZENhbGxiYWNrQXQgPSB0YXJnZXRbaV0gYXMgbnVtYmVyO1xuICAgICAgaWYgKGludm9rZVF1ZXVlZENhbGxiYWNrQXQgPiBpbnZva2VBdCkge1xuICAgICAgICAvLyBXZSd2ZSByZWFjaGVkIGEgZmlyc3QgdGltZXIgdGhhdCBpcyBzY2hlZHVsZWRcbiAgICAgICAgLy8gZm9yIGEgbGF0ZXIgdGltZSB0aGFuIHdoYXQgd2UgYXJlIHRyeWluZyB0byBpbnNlcnQuXG4gICAgICAgIC8vIFRoaXMgaXMgdGhlIGxvY2F0aW9uIGF0IHdoaWNoIHdlIG5lZWQgdG8gaW5zZXJ0LFxuICAgICAgICAvLyBubyBuZWVkIHRvIGl0ZXJhdGUgZnVydGhlci5cbiAgICAgICAgaW5zZXJ0QXRJbmRleCA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBhcnJheUluc2VydDIodGFyZ2V0LCBpbnNlcnRBdEluZGV4LCBpbnZva2VBdCwgY2FsbGJhY2spO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVGcm9tUXVldWUodGFyZ2V0OiBBcnJheTxudW1iZXJ8Vm9pZEZ1bmN0aW9uPiwgY2FsbGJhY2s6IFZvaWRGdW5jdGlvbikge1xuICAgIGxldCBpbmRleCA9IC0xO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFyZ2V0Lmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICBjb25zdCBxdWV1ZWRDYWxsYmFjayA9IHRhcmdldFtpICsgMV07XG4gICAgICBpZiAocXVldWVkQ2FsbGJhY2sgPT09IGNhbGxiYWNrKSB7XG4gICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAvLyBSZW1vdmUgMiBlbGVtZW50czogYSB0aW1lc3RhbXAgc2xvdCBhbmRcbiAgICAgIC8vIHRoZSBmb2xsb3dpbmcgc2xvdCB3aXRoIGEgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICBhcnJheVNwbGljZSh0YXJnZXQsIGluZGV4LCAyKTtcbiAgICB9XG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG5cbiAgcHJpdmF0ZSBzY2hlZHVsZVRpbWVyKCkge1xuICAgIGNvbnN0IGNhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgdGhpcy5jbGVhclRpbWVvdXQoKTtcblxuICAgICAgdGhpcy5leGVjdXRpbmdDYWxsYmFja3MgPSB0cnVlO1xuXG4gICAgICAvLyBDbG9uZSB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgcXVldWUsIHNpbmNlIGl0IG1pZ2h0IGJlIGFsdGVyZWRcbiAgICAgIC8vIGFzIHdlIGludm9rZSBjYWxsYmFja3MuXG4gICAgICBjb25zdCBjdXJyZW50ID0gWy4uLnRoaXMuY3VycmVudF07XG5cbiAgICAgIC8vIEludm9rZSBjYWxsYmFja3MgdGhhdCB3ZXJlIHNjaGVkdWxlZCB0byBydW4gYmVmb3JlIHRoZSBjdXJyZW50IHRpbWUuXG4gICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50Lmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgIGNvbnN0IGludm9rZUF0ID0gY3VycmVudFtpXSBhcyBudW1iZXI7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrID0gY3VycmVudFtpICsgMV0gYXMgVm9pZEZ1bmN0aW9uO1xuICAgICAgICBpZiAoaW52b2tlQXQgPD0gbm93KSB7XG4gICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBXZSd2ZSByZWFjaGVkIGEgdGltZXIgdGhhdCBzaG91bGQgbm90IGJlIGludm9rZWQgeWV0LlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBUaGUgc3RhdGUgb2YgdGhlIHF1ZXVlIG1pZ2h0J3ZlIGNoYW5nZWQgYWZ0ZXIgY2FsbGJhY2tzIGludm9jYXRpb24sXG4gICAgICAvLyBydW4gdGhlIGNsZWFudXAgbG9naWMgYmFzZWQgb24gdGhlICpjdXJyZW50KiBzdGF0ZSBvZiB0aGUgcXVldWUuXG4gICAgICBsZXQgbGFzdENhbGxiYWNrSW5kZXggPSAtMTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jdXJyZW50Lmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgIGNvbnN0IGludm9rZUF0ID0gdGhpcy5jdXJyZW50W2ldIGFzIG51bWJlcjtcbiAgICAgICAgaWYgKGludm9rZUF0IDw9IG5vdykge1xuICAgICAgICAgIC8vIEFkZCArMSB0byBhY2NvdW50IGZvciBhIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXRcbiAgICAgICAgICAvLyBnb2VzIGFmdGVyIHRoZSB0aW1lc3RhbXAgaW4gZXZlbnRzIGFycmF5LlxuICAgICAgICAgIGxhc3RDYWxsYmFja0luZGV4ID0gaSArIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gV2UndmUgcmVhY2hlZCBhIHRpbWVyIHRoYXQgc2hvdWxkIG5vdCBiZSBpbnZva2VkIHlldC5cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGxhc3RDYWxsYmFja0luZGV4ID49IDApIHtcbiAgICAgICAgYXJyYXlTcGxpY2UodGhpcy5jdXJyZW50LCAwLCBsYXN0Q2FsbGJhY2tJbmRleCArIDEpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmV4ZWN1dGluZ0NhbGxiYWNrcyA9IGZhbHNlO1xuXG4gICAgICAvLyBJZiB0aGVyZSBhcmUgYW55IGNhbGxiYWNrcyBhZGRlZCBkdXJpbmcgYW4gaW52b2NhdGlvblxuICAgICAgLy8gb2YgdGhlIGN1cnJlbnQgb25lcyAtIG1vdmUgdGhlbSBvdmVyIHRvIHRoZSBcImN1cnJlbnRcIlxuICAgICAgLy8gcXVldWUuXG4gICAgICBpZiAodGhpcy5kZWZlcnJlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kZWZlcnJlZC5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICAgIGNvbnN0IGludm9rZUF0ID0gdGhpcy5kZWZlcnJlZFtpXSBhcyBudW1iZXI7XG4gICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSB0aGlzLmRlZmVycmVkW2kgKyAxXSBhcyBWb2lkRnVuY3Rpb247XG4gICAgICAgICAgdGhpcy5hZGRUb1F1ZXVlKHRoaXMuY3VycmVudCwgaW52b2tlQXQsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRlZmVycmVkLmxlbmd0aCA9IDA7XG4gICAgICB9XG4gICAgICB0aGlzLnNjaGVkdWxlVGltZXIoKTtcbiAgICB9O1xuXG4gICAgLy8gQXZvaWQgcnVubmluZyB0aW1lciBjYWxsYmFja3MgbW9yZSB0aGFuIG9uY2UgcGVyXG4gICAgLy8gYXZlcmFnZSBmcmFtZSBkdXJhdGlvbi4gVGhpcyBpcyBuZWVkZWQgZm9yIGJldHRlclxuICAgIC8vIGJhdGNoaW5nIGFuZCB0byBhdm9pZCBraWNraW5nIG9mZiBleGNlc3NpdmUgY2hhbmdlXG4gICAgLy8gZGV0ZWN0aW9uIGN5Y2xlcy5cbiAgICBjb25zdCBGUkFNRV9EVVJBVElPTl9NUyA9IDE2OyAgLy8gMTAwMG1zIC8gNjBmcHNcblxuICAgIGlmICh0aGlzLmN1cnJlbnQubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgIC8vIEZpcnN0IGVsZW1lbnQgaW4gdGhlIHF1ZXVlIHBvaW50cyBhdCB0aGUgdGltZXN0YW1wXG4gICAgICAvLyBvZiB0aGUgZmlyc3QgKGVhcmxpZXN0KSBldmVudC5cbiAgICAgIGNvbnN0IGludm9rZUF0ID0gdGhpcy5jdXJyZW50WzBdIGFzIG51bWJlcjtcbiAgICAgIGlmICh0aGlzLnRpbWVvdXRJZCA9PT0gbnVsbCB8fFxuICAgICAgICAgIC8vIFJlc2NoZWR1bGUgYSB0aW1lciBpbiBjYXNlIGEgcXVldWUgY29udGFpbnMgYW4gaXRlbSB3aXRoXG4gICAgICAgICAgLy8gYW4gZWFybGllciB0aW1lc3RhbXAgYW5kIHRoZSBkZWx0YSBpcyBtb3JlIHRoYW4gYW4gYXZlcmFnZVxuICAgICAgICAgIC8vIGZyYW1lIGR1cmF0aW9uLlxuICAgICAgICAgICh0aGlzLmludm9rZVRpbWVyQXQgJiYgKHRoaXMuaW52b2tlVGltZXJBdCAtIGludm9rZUF0ID4gRlJBTUVfRFVSQVRJT05fTVMpKSkge1xuICAgICAgICAvLyBUaGVyZSB3YXMgYSB0aW1lb3V0IGFscmVhZHksIGJ1dCBhbiBlYXJsaWVyIGV2ZW50IHdhcyBhZGRlZFxuICAgICAgICAvLyBpbnRvIHRoZSBxdWV1ZS4gSW4gdGhpcyBjYXNlIHdlIGRyb3AgYW4gb2xkIHRpbWVyIGFuZCBzZXR1cFxuICAgICAgICAvLyBhIG5ldyBvbmUgd2l0aCBhbiB1cGRhdGVkIChzbWFsbGVyKSB0aW1lb3V0LlxuICAgICAgICB0aGlzLmNsZWFyVGltZW91dCgpO1xuXG4gICAgICAgIGNvbnN0IHRpbWVvdXQgPSBNYXRoLm1heChpbnZva2VBdCAtIG5vdywgRlJBTUVfRFVSQVRJT05fTVMpO1xuICAgICAgICB0aGlzLmludm9rZVRpbWVyQXQgPSBpbnZva2VBdDtcbiAgICAgICAgdGhpcy50aW1lb3V0SWQgPSBzZXRUaW1lb3V0KGNhbGxiYWNrLCB0aW1lb3V0KSBhcyB1bmtub3duIGFzIG51bWJlcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsZWFyVGltZW91dCgpIHtcbiAgICBpZiAodGhpcy50aW1lb3V0SWQgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRJZCk7XG4gICAgICB0aGlzLnRpbWVvdXRJZCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5jbGVhclRpbWVvdXQoKTtcbiAgICB0aGlzLmN1cnJlbnQubGVuZ3RoID0gMDtcbiAgICB0aGlzLmRlZmVycmVkLmxlbmd0aCA9IDA7XG4gIH1cblxuICAvKiogQG5vY29sbGFwc2UgKi9cbiAgc3RhdGljIMm1cHJvdiA9IC8qKiBAcHVyZU9yQnJlYWtNeUNvZGUgKi8gybXJtWRlZmluZUluamVjdGFibGUoe1xuICAgIHRva2VuOiBUaW1lclNjaGVkdWxlcixcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG4gICAgZmFjdG9yeTogKCkgPT4gbmV3IFRpbWVyU2NoZWR1bGVyKCksXG4gIH0pO1xufVxuIl19