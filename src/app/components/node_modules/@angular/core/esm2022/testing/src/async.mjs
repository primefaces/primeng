/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Wraps a test function in an asynchronous test zone. The test will automatically
 * complete when all asynchronous calls within this zone are done. Can be used
 * to wrap an {@link inject} call.
 *
 * Example:
 *
 * ```
 * it('...', waitForAsync(inject([AClass], (object) => {
 *   object.doSomething.then(() => {
 *     expect(...);
 *   })
 * })));
 * ```
 *
 * @publicApi
 */
export function waitForAsync(fn) {
    const _Zone = typeof Zone !== 'undefined' ? Zone : null;
    if (!_Zone) {
        return function () {
            return Promise.reject('Zone is needed for the waitForAsync() test helper but could not be found. ' +
                'Please make sure that your environment includes zone.js');
        };
    }
    const asyncTest = _Zone && _Zone[_Zone.__symbol__('asyncTest')];
    if (typeof asyncTest === 'function') {
        return asyncTest(fn);
    }
    return function () {
        return Promise.reject('zone-testing.js is needed for the async() test helper but could not be found. ' +
            'Please make sure that your environment includes zone.js/testing');
    };
}
/**
 * @deprecated use `waitForAsync()`, (expected removal in v12)
 * @see {@link waitForAsync}
 * @publicApi
 * */
export function async(fn) {
    return waitForAsync(fn);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3Rlc3Rpbmcvc3JjL2FzeW5jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNIOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsTUFBTSxVQUFVLFlBQVksQ0FBQyxFQUFZO0lBQ3ZDLE1BQU0sS0FBSyxHQUFRLE9BQU8sSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDN0QsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ1gsT0FBTztZQUNMLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FDakIsNEVBQTRFO2dCQUM1RSx5REFBeUQsQ0FBQyxDQUFDO1FBQ2pFLENBQUMsQ0FBQztJQUNKLENBQUM7SUFDRCxNQUFNLFNBQVMsR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNoRSxJQUFJLE9BQU8sU0FBUyxLQUFLLFVBQVUsRUFBRSxDQUFDO1FBQ3BDLE9BQU8sU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxPQUFPO1FBQ0wsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUNqQixnRkFBZ0Y7WUFDaEYsaUVBQWlFLENBQUMsQ0FBQztJQUN6RSxDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQ7Ozs7S0FJSztBQUNMLE1BQU0sVUFBVSxLQUFLLENBQUMsRUFBWTtJQUNoQyxPQUFPLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUMxQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vKipcbiAqIFdyYXBzIGEgdGVzdCBmdW5jdGlvbiBpbiBhbiBhc3luY2hyb25vdXMgdGVzdCB6b25lLiBUaGUgdGVzdCB3aWxsIGF1dG9tYXRpY2FsbHlcbiAqIGNvbXBsZXRlIHdoZW4gYWxsIGFzeW5jaHJvbm91cyBjYWxscyB3aXRoaW4gdGhpcyB6b25lIGFyZSBkb25lLiBDYW4gYmUgdXNlZFxuICogdG8gd3JhcCBhbiB7QGxpbmsgaW5qZWN0fSBjYWxsLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiBpdCgnLi4uJywgd2FpdEZvckFzeW5jKGluamVjdChbQUNsYXNzXSwgKG9iamVjdCkgPT4ge1xuICogICBvYmplY3QuZG9Tb21ldGhpbmcudGhlbigoKSA9PiB7XG4gKiAgICAgZXhwZWN0KC4uLik7XG4gKiAgIH0pXG4gKiB9KSkpO1xuICogYGBgXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gd2FpdEZvckFzeW5jKGZuOiBGdW5jdGlvbik6IChkb25lOiBhbnkpID0+IGFueSB7XG4gIGNvbnN0IF9ab25lOiBhbnkgPSB0eXBlb2YgWm9uZSAhPT0gJ3VuZGVmaW5lZCcgPyBab25lIDogbnVsbDtcbiAgaWYgKCFfWm9uZSkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcbiAgICAgICAgICAnWm9uZSBpcyBuZWVkZWQgZm9yIHRoZSB3YWl0Rm9yQXN5bmMoKSB0ZXN0IGhlbHBlciBidXQgY291bGQgbm90IGJlIGZvdW5kLiAnICtcbiAgICAgICAgICAnUGxlYXNlIG1ha2Ugc3VyZSB0aGF0IHlvdXIgZW52aXJvbm1lbnQgaW5jbHVkZXMgem9uZS5qcycpO1xuICAgIH07XG4gIH1cbiAgY29uc3QgYXN5bmNUZXN0ID0gX1pvbmUgJiYgX1pvbmVbX1pvbmUuX19zeW1ib2xfXygnYXN5bmNUZXN0JyldO1xuICBpZiAodHlwZW9mIGFzeW5jVGVzdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBhc3luY1Rlc3QoZm4pO1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXG4gICAgICAgICd6b25lLXRlc3RpbmcuanMgaXMgbmVlZGVkIGZvciB0aGUgYXN5bmMoKSB0ZXN0IGhlbHBlciBidXQgY291bGQgbm90IGJlIGZvdW5kLiAnICtcbiAgICAgICAgJ1BsZWFzZSBtYWtlIHN1cmUgdGhhdCB5b3VyIGVudmlyb25tZW50IGluY2x1ZGVzIHpvbmUuanMvdGVzdGluZycpO1xuICB9O1xufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkIHVzZSBgd2FpdEZvckFzeW5jKClgLCAoZXhwZWN0ZWQgcmVtb3ZhbCBpbiB2MTIpXG4gKiBAc2VlIHtAbGluayB3YWl0Rm9yQXN5bmN9XG4gKiBAcHVibGljQXBpXG4gKiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzeW5jKGZuOiBGdW5jdGlvbik6IChkb25lOiBhbnkpID0+IGFueSB7XG4gIHJldHVybiB3YWl0Rm9yQXN5bmMoZm4pO1xufVxuIl19