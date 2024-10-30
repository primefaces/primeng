/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const _Zone = typeof Zone !== 'undefined' ? Zone : null;
const fakeAsyncTestModule = _Zone && _Zone[_Zone.__symbol__('fakeAsyncTest')];
const fakeAsyncTestModuleNotLoadedErrorMessage = `zone-testing.js is needed for the fakeAsync() test helper but could not be found.
        Please make sure that your environment includes zone.js/testing`;
/**
 * Clears out the shared fake async zone for a test.
 * To be called in a global `beforeEach`.
 *
 * @publicApi
 */
export function resetFakeAsyncZone() {
    if (fakeAsyncTestModule) {
        return fakeAsyncTestModule.resetFakeAsyncZone();
    }
    throw new Error(fakeAsyncTestModuleNotLoadedErrorMessage);
}
export function resetFakeAsyncZoneIfExists() {
    if (fakeAsyncTestModule) {
        fakeAsyncTestModule.resetFakeAsyncZone();
    }
}
/**
 * Wraps a function to be executed in the `fakeAsync` zone:
 * - Microtasks are manually executed by calling `flushMicrotasks()`.
 * - Timers are synchronous; `tick()` simulates the asynchronous passage of time.
 *
 * If there are any pending timers at the end of the function, an exception is thrown.
 *
 * Can be used to wrap `inject()` calls.
 *
 * @param fn The function that you want to wrap in the `fakeAsync` zone.
 *
 * @usageNotes
 * ### Example
 *
 * {@example core/testing/ts/fake_async.ts region='basic'}
 *
 *
 * @returns The function wrapped to be executed in the `fakeAsync` zone.
 * Any arguments passed when calling this returned function will be passed through to the `fn`
 * function in the parameters when it is called.
 *
 * @publicApi
 */
export function fakeAsync(fn) {
    if (fakeAsyncTestModule) {
        return fakeAsyncTestModule.fakeAsync(fn);
    }
    throw new Error(fakeAsyncTestModuleNotLoadedErrorMessage);
}
/**
 * Simulates the asynchronous passage of time for the timers in the `fakeAsync` zone.
 *
 * The microtasks queue is drained at the very start of this function and after any timer callback
 * has been executed.
 *
 * @param millis The number of milliseconds to advance the virtual timer.
 * @param tickOptions The options to pass to the `tick()` function.
 *
 * @usageNotes
 *
 * The `tick()` option is a flag called `processNewMacroTasksSynchronously`,
 * which determines whether or not to invoke new macroTasks.
 *
 * If you provide a `tickOptions` object, but do not specify a
 * `processNewMacroTasksSynchronously` property (`tick(100, {})`),
 * then `processNewMacroTasksSynchronously` defaults to true.
 *
 * If you omit the `tickOptions` parameter (`tick(100))`), then
 * `tickOptions` defaults to `{processNewMacroTasksSynchronously: true}`.
 *
 * ### Example
 *
 * {@example core/testing/ts/fake_async.ts region='basic'}
 *
 * The following example includes a nested timeout (new macroTask), and
 * the `tickOptions` parameter is allowed to default. In this case,
 * `processNewMacroTasksSynchronously` defaults to true, and the nested
 * function is executed on each tick.
 *
 * ```
 * it ('test with nested setTimeout', fakeAsync(() => {
 *   let nestedTimeoutInvoked = false;
 *   function funcWithNestedTimeout() {
 *     setTimeout(() => {
 *       nestedTimeoutInvoked = true;
 *     });
 *   };
 *   setTimeout(funcWithNestedTimeout);
 *   tick();
 *   expect(nestedTimeoutInvoked).toBe(true);
 * }));
 * ```
 *
 * In the following case, `processNewMacroTasksSynchronously` is explicitly
 * set to false, so the nested timeout function is not invoked.
 *
 * ```
 * it ('test with nested setTimeout', fakeAsync(() => {
 *   let nestedTimeoutInvoked = false;
 *   function funcWithNestedTimeout() {
 *     setTimeout(() => {
 *       nestedTimeoutInvoked = true;
 *     });
 *   };
 *   setTimeout(funcWithNestedTimeout);
 *   tick(0, {processNewMacroTasksSynchronously: false});
 *   expect(nestedTimeoutInvoked).toBe(false);
 * }));
 * ```
 *
 *
 * @publicApi
 */
export function tick(millis = 0, tickOptions = {
    processNewMacroTasksSynchronously: true
}) {
    if (fakeAsyncTestModule) {
        return fakeAsyncTestModule.tick(millis, tickOptions);
    }
    throw new Error(fakeAsyncTestModuleNotLoadedErrorMessage);
}
/**
 * Flushes any pending microtasks and simulates the asynchronous passage of time for the timers in
 * the `fakeAsync` zone by
 * draining the macrotask queue until it is empty.
 *
 * @param maxTurns The maximum number of times the scheduler attempts to clear its queue before
 *     throwing an error.
 * @returns The simulated time elapsed, in milliseconds.
 *
 * @publicApi
 */
export function flush(maxTurns) {
    if (fakeAsyncTestModule) {
        return fakeAsyncTestModule.flush(maxTurns);
    }
    throw new Error(fakeAsyncTestModuleNotLoadedErrorMessage);
}
/**
 * Discard all remaining periodic tasks.
 *
 * @publicApi
 */
export function discardPeriodicTasks() {
    if (fakeAsyncTestModule) {
        return fakeAsyncTestModule.discardPeriodicTasks();
    }
    throw new Error(fakeAsyncTestModuleNotLoadedErrorMessage);
}
/**
 * Flush any pending microtasks.
 *
 * @publicApi
 */
export function flushMicrotasks() {
    if (fakeAsyncTestModule) {
        return fakeAsyncTestModule.flushMicrotasks();
    }
    throw new Error(fakeAsyncTestModuleNotLoadedErrorMessage);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFrZV9hc3luYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvdGVzdGluZy9zcmMvZmFrZV9hc3luYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxNQUFNLEtBQUssR0FBUSxPQUFPLElBQUksS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQzdELE1BQU0sbUJBQW1CLEdBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7QUFFOUUsTUFBTSx3Q0FBd0MsR0FDMUM7d0VBQ29FLENBQUM7QUFFekU7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsa0JBQWtCO0lBQ2hDLElBQUksbUJBQW1CLEVBQUUsQ0FBQztRQUN4QixPQUFPLG1CQUFtQixDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDbEQsQ0FBQztJQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQztBQUM1RCxDQUFDO0FBRUQsTUFBTSxVQUFVLDBCQUEwQjtJQUN4QyxJQUFJLG1CQUFtQixFQUFFLENBQUM7UUFDeEIsbUJBQW1CLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0FBQ0gsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsTUFBTSxVQUFVLFNBQVMsQ0FBQyxFQUFZO0lBQ3BDLElBQUksbUJBQW1CLEVBQUUsQ0FBQztRQUN4QixPQUFPLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO0FBQzVELENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0RHO0FBQ0gsTUFBTSxVQUFVLElBQUksQ0FDaEIsU0FBaUIsQ0FBQyxFQUFFLGNBQTREO0lBQzlFLGlDQUFpQyxFQUFFLElBQUk7Q0FDeEM7SUFDSCxJQUFJLG1CQUFtQixFQUFFLENBQUM7UUFDeEIsT0FBTyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7QUFDNUQsQ0FBQztBQUVEOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLFVBQVUsS0FBSyxDQUFDLFFBQWlCO0lBQ3JDLElBQUksbUJBQW1CLEVBQUUsQ0FBQztRQUN4QixPQUFPLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO0FBQzVELENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLG9CQUFvQjtJQUNsQyxJQUFJLG1CQUFtQixFQUFFLENBQUM7UUFDeEIsT0FBTyxtQkFBbUIsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQ3BELENBQUM7SUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7QUFDNUQsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsZUFBZTtJQUM3QixJQUFJLG1CQUFtQixFQUFFLENBQUM7UUFDeEIsT0FBTyxtQkFBbUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO0FBQzVELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmNvbnN0IF9ab25lOiBhbnkgPSB0eXBlb2YgWm9uZSAhPT0gJ3VuZGVmaW5lZCcgPyBab25lIDogbnVsbDtcbmNvbnN0IGZha2VBc3luY1Rlc3RNb2R1bGUgPSBfWm9uZSAmJiBfWm9uZVtfWm9uZS5fX3N5bWJvbF9fKCdmYWtlQXN5bmNUZXN0JyldO1xuXG5jb25zdCBmYWtlQXN5bmNUZXN0TW9kdWxlTm90TG9hZGVkRXJyb3JNZXNzYWdlID1cbiAgICBgem9uZS10ZXN0aW5nLmpzIGlzIG5lZWRlZCBmb3IgdGhlIGZha2VBc3luYygpIHRlc3QgaGVscGVyIGJ1dCBjb3VsZCBub3QgYmUgZm91bmQuXG4gICAgICAgIFBsZWFzZSBtYWtlIHN1cmUgdGhhdCB5b3VyIGVudmlyb25tZW50IGluY2x1ZGVzIHpvbmUuanMvdGVzdGluZ2A7XG5cbi8qKlxuICogQ2xlYXJzIG91dCB0aGUgc2hhcmVkIGZha2UgYXN5bmMgem9uZSBmb3IgYSB0ZXN0LlxuICogVG8gYmUgY2FsbGVkIGluIGEgZ2xvYmFsIGBiZWZvcmVFYWNoYC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNldEZha2VBc3luY1pvbmUoKTogdm9pZCB7XG4gIGlmIChmYWtlQXN5bmNUZXN0TW9kdWxlKSB7XG4gICAgcmV0dXJuIGZha2VBc3luY1Rlc3RNb2R1bGUucmVzZXRGYWtlQXN5bmNab25lKCk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKGZha2VBc3luY1Rlc3RNb2R1bGVOb3RMb2FkZWRFcnJvck1lc3NhZ2UpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRGYWtlQXN5bmNab25lSWZFeGlzdHMoKTogdm9pZCB7XG4gIGlmIChmYWtlQXN5bmNUZXN0TW9kdWxlKSB7XG4gICAgZmFrZUFzeW5jVGVzdE1vZHVsZS5yZXNldEZha2VBc3luY1pvbmUoKTtcbiAgfVxufVxuXG4vKipcbiAqIFdyYXBzIGEgZnVuY3Rpb24gdG8gYmUgZXhlY3V0ZWQgaW4gdGhlIGBmYWtlQXN5bmNgIHpvbmU6XG4gKiAtIE1pY3JvdGFza3MgYXJlIG1hbnVhbGx5IGV4ZWN1dGVkIGJ5IGNhbGxpbmcgYGZsdXNoTWljcm90YXNrcygpYC5cbiAqIC0gVGltZXJzIGFyZSBzeW5jaHJvbm91czsgYHRpY2soKWAgc2ltdWxhdGVzIHRoZSBhc3luY2hyb25vdXMgcGFzc2FnZSBvZiB0aW1lLlxuICpcbiAqIElmIHRoZXJlIGFyZSBhbnkgcGVuZGluZyB0aW1lcnMgYXQgdGhlIGVuZCBvZiB0aGUgZnVuY3Rpb24sIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24uXG4gKlxuICogQ2FuIGJlIHVzZWQgdG8gd3JhcCBgaW5qZWN0KClgIGNhbGxzLlxuICpcbiAqIEBwYXJhbSBmbiBUaGUgZnVuY3Rpb24gdGhhdCB5b3Ugd2FudCB0byB3cmFwIGluIHRoZSBgZmFrZUFzeW5jYCB6b25lLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIHtAZXhhbXBsZSBjb3JlL3Rlc3RpbmcvdHMvZmFrZV9hc3luYy50cyByZWdpb249J2Jhc2ljJ31cbiAqXG4gKlxuICogQHJldHVybnMgVGhlIGZ1bmN0aW9uIHdyYXBwZWQgdG8gYmUgZXhlY3V0ZWQgaW4gdGhlIGBmYWtlQXN5bmNgIHpvbmUuXG4gKiBBbnkgYXJndW1lbnRzIHBhc3NlZCB3aGVuIGNhbGxpbmcgdGhpcyByZXR1cm5lZCBmdW5jdGlvbiB3aWxsIGJlIHBhc3NlZCB0aHJvdWdoIHRvIHRoZSBgZm5gXG4gKiBmdW5jdGlvbiBpbiB0aGUgcGFyYW1ldGVycyB3aGVuIGl0IGlzIGNhbGxlZC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmYWtlQXN5bmMoZm46IEZ1bmN0aW9uKTogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnkge1xuICBpZiAoZmFrZUFzeW5jVGVzdE1vZHVsZSkge1xuICAgIHJldHVybiBmYWtlQXN5bmNUZXN0TW9kdWxlLmZha2VBc3luYyhmbik7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKGZha2VBc3luY1Rlc3RNb2R1bGVOb3RMb2FkZWRFcnJvck1lc3NhZ2UpO1xufVxuXG4vKipcbiAqIFNpbXVsYXRlcyB0aGUgYXN5bmNocm9ub3VzIHBhc3NhZ2Ugb2YgdGltZSBmb3IgdGhlIHRpbWVycyBpbiB0aGUgYGZha2VBc3luY2Agem9uZS5cbiAqXG4gKiBUaGUgbWljcm90YXNrcyBxdWV1ZSBpcyBkcmFpbmVkIGF0IHRoZSB2ZXJ5IHN0YXJ0IG9mIHRoaXMgZnVuY3Rpb24gYW5kIGFmdGVyIGFueSB0aW1lciBjYWxsYmFja1xuICogaGFzIGJlZW4gZXhlY3V0ZWQuXG4gKlxuICogQHBhcmFtIG1pbGxpcyBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBhZHZhbmNlIHRoZSB2aXJ0dWFsIHRpbWVyLlxuICogQHBhcmFtIHRpY2tPcHRpb25zIFRoZSBvcHRpb25zIHRvIHBhc3MgdG8gdGhlIGB0aWNrKClgIGZ1bmN0aW9uLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogVGhlIGB0aWNrKClgIG9wdGlvbiBpcyBhIGZsYWcgY2FsbGVkIGBwcm9jZXNzTmV3TWFjcm9UYXNrc1N5bmNocm9ub3VzbHlgLFxuICogd2hpY2ggZGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCB0byBpbnZva2UgbmV3IG1hY3JvVGFza3MuXG4gKlxuICogSWYgeW91IHByb3ZpZGUgYSBgdGlja09wdGlvbnNgIG9iamVjdCwgYnV0IGRvIG5vdCBzcGVjaWZ5IGFcbiAqIGBwcm9jZXNzTmV3TWFjcm9UYXNrc1N5bmNocm9ub3VzbHlgIHByb3BlcnR5IChgdGljaygxMDAsIHt9KWApLFxuICogdGhlbiBgcHJvY2Vzc05ld01hY3JvVGFza3NTeW5jaHJvbm91c2x5YCBkZWZhdWx0cyB0byB0cnVlLlxuICpcbiAqIElmIHlvdSBvbWl0IHRoZSBgdGlja09wdGlvbnNgIHBhcmFtZXRlciAoYHRpY2soMTAwKSlgKSwgdGhlblxuICogYHRpY2tPcHRpb25zYCBkZWZhdWx0cyB0byBge3Byb2Nlc3NOZXdNYWNyb1Rhc2tzU3luY2hyb25vdXNseTogdHJ1ZX1gLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIGNvcmUvdGVzdGluZy90cy9mYWtlX2FzeW5jLnRzIHJlZ2lvbj0nYmFzaWMnfVxuICpcbiAqIFRoZSBmb2xsb3dpbmcgZXhhbXBsZSBpbmNsdWRlcyBhIG5lc3RlZCB0aW1lb3V0IChuZXcgbWFjcm9UYXNrKSwgYW5kXG4gKiB0aGUgYHRpY2tPcHRpb25zYCBwYXJhbWV0ZXIgaXMgYWxsb3dlZCB0byBkZWZhdWx0LiBJbiB0aGlzIGNhc2UsXG4gKiBgcHJvY2Vzc05ld01hY3JvVGFza3NTeW5jaHJvbm91c2x5YCBkZWZhdWx0cyB0byB0cnVlLCBhbmQgdGhlIG5lc3RlZFxuICogZnVuY3Rpb24gaXMgZXhlY3V0ZWQgb24gZWFjaCB0aWNrLlxuICpcbiAqIGBgYFxuICogaXQgKCd0ZXN0IHdpdGggbmVzdGVkIHNldFRpbWVvdXQnLCBmYWtlQXN5bmMoKCkgPT4ge1xuICogICBsZXQgbmVzdGVkVGltZW91dEludm9rZWQgPSBmYWxzZTtcbiAqICAgZnVuY3Rpb24gZnVuY1dpdGhOZXN0ZWRUaW1lb3V0KCkge1xuICogICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICogICAgICAgbmVzdGVkVGltZW91dEludm9rZWQgPSB0cnVlO1xuICogICAgIH0pO1xuICogICB9O1xuICogICBzZXRUaW1lb3V0KGZ1bmNXaXRoTmVzdGVkVGltZW91dCk7XG4gKiAgIHRpY2soKTtcbiAqICAgZXhwZWN0KG5lc3RlZFRpbWVvdXRJbnZva2VkKS50b0JlKHRydWUpO1xuICogfSkpO1xuICogYGBgXG4gKlxuICogSW4gdGhlIGZvbGxvd2luZyBjYXNlLCBgcHJvY2Vzc05ld01hY3JvVGFza3NTeW5jaHJvbm91c2x5YCBpcyBleHBsaWNpdGx5XG4gKiBzZXQgdG8gZmFsc2UsIHNvIHRoZSBuZXN0ZWQgdGltZW91dCBmdW5jdGlvbiBpcyBub3QgaW52b2tlZC5cbiAqXG4gKiBgYGBcbiAqIGl0ICgndGVzdCB3aXRoIG5lc3RlZCBzZXRUaW1lb3V0JywgZmFrZUFzeW5jKCgpID0+IHtcbiAqICAgbGV0IG5lc3RlZFRpbWVvdXRJbnZva2VkID0gZmFsc2U7XG4gKiAgIGZ1bmN0aW9uIGZ1bmNXaXRoTmVzdGVkVGltZW91dCgpIHtcbiAqICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAqICAgICAgIG5lc3RlZFRpbWVvdXRJbnZva2VkID0gdHJ1ZTtcbiAqICAgICB9KTtcbiAqICAgfTtcbiAqICAgc2V0VGltZW91dChmdW5jV2l0aE5lc3RlZFRpbWVvdXQpO1xuICogICB0aWNrKDAsIHtwcm9jZXNzTmV3TWFjcm9UYXNrc1N5bmNocm9ub3VzbHk6IGZhbHNlfSk7XG4gKiAgIGV4cGVjdChuZXN0ZWRUaW1lb3V0SW52b2tlZCkudG9CZShmYWxzZSk7XG4gKiB9KSk7XG4gKiBgYGBcbiAqXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gdGljayhcbiAgICBtaWxsaXM6IG51bWJlciA9IDAsIHRpY2tPcHRpb25zOiB7cHJvY2Vzc05ld01hY3JvVGFza3NTeW5jaHJvbm91c2x5OiBib29sZWFufSA9IHtcbiAgICAgIHByb2Nlc3NOZXdNYWNyb1Rhc2tzU3luY2hyb25vdXNseTogdHJ1ZVxuICAgIH0pOiB2b2lkIHtcbiAgaWYgKGZha2VBc3luY1Rlc3RNb2R1bGUpIHtcbiAgICByZXR1cm4gZmFrZUFzeW5jVGVzdE1vZHVsZS50aWNrKG1pbGxpcywgdGlja09wdGlvbnMpO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihmYWtlQXN5bmNUZXN0TW9kdWxlTm90TG9hZGVkRXJyb3JNZXNzYWdlKTtcbn1cblxuLyoqXG4gKiBGbHVzaGVzIGFueSBwZW5kaW5nIG1pY3JvdGFza3MgYW5kIHNpbXVsYXRlcyB0aGUgYXN5bmNocm9ub3VzIHBhc3NhZ2Ugb2YgdGltZSBmb3IgdGhlIHRpbWVycyBpblxuICogdGhlIGBmYWtlQXN5bmNgIHpvbmUgYnlcbiAqIGRyYWluaW5nIHRoZSBtYWNyb3Rhc2sgcXVldWUgdW50aWwgaXQgaXMgZW1wdHkuXG4gKlxuICogQHBhcmFtIG1heFR1cm5zIFRoZSBtYXhpbXVtIG51bWJlciBvZiB0aW1lcyB0aGUgc2NoZWR1bGVyIGF0dGVtcHRzIHRvIGNsZWFyIGl0cyBxdWV1ZSBiZWZvcmVcbiAqICAgICB0aHJvd2luZyBhbiBlcnJvci5cbiAqIEByZXR1cm5zIFRoZSBzaW11bGF0ZWQgdGltZSBlbGFwc2VkLCBpbiBtaWxsaXNlY29uZHMuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmx1c2gobWF4VHVybnM/OiBudW1iZXIpOiBudW1iZXIge1xuICBpZiAoZmFrZUFzeW5jVGVzdE1vZHVsZSkge1xuICAgIHJldHVybiBmYWtlQXN5bmNUZXN0TW9kdWxlLmZsdXNoKG1heFR1cm5zKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoZmFrZUFzeW5jVGVzdE1vZHVsZU5vdExvYWRlZEVycm9yTWVzc2FnZSk7XG59XG5cbi8qKlxuICogRGlzY2FyZCBhbGwgcmVtYWluaW5nIHBlcmlvZGljIHRhc2tzLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc2NhcmRQZXJpb2RpY1Rhc2tzKCk6IHZvaWQge1xuICBpZiAoZmFrZUFzeW5jVGVzdE1vZHVsZSkge1xuICAgIHJldHVybiBmYWtlQXN5bmNUZXN0TW9kdWxlLmRpc2NhcmRQZXJpb2RpY1Rhc2tzKCk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKGZha2VBc3luY1Rlc3RNb2R1bGVOb3RMb2FkZWRFcnJvck1lc3NhZ2UpO1xufVxuXG4vKipcbiAqIEZsdXNoIGFueSBwZW5kaW5nIG1pY3JvdGFza3MuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmx1c2hNaWNyb3Rhc2tzKCk6IHZvaWQge1xuICBpZiAoZmFrZUFzeW5jVGVzdE1vZHVsZSkge1xuICAgIHJldHVybiBmYWtlQXN5bmNUZXN0TW9kdWxlLmZsdXNoTWljcm90YXNrcygpO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihmYWtlQXN5bmNUZXN0TW9kdWxlTm90TG9hZGVkRXJyb3JNZXNzYWdlKTtcbn1cbiJdfQ==