/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { global } from './global';
/**
 * Returns whether Angular is in development mode.
 *
 * By default, this is true, unless `enableProdMode` is invoked prior to calling this method or the
 * application is built using the Angular CLI with the `optimization` option.
 * @see {@link cli/build ng build}
 *
 * @publicApi
 */
export function isDevMode() {
    return typeof ngDevMode === 'undefined' || !!ngDevMode;
}
/**
 * Disable Angular's development mode, which turns off assertions and other
 * checks within the framework.
 *
 * One important assertion this disables verifies that a change detection pass
 * does not result in additional changes to any bindings (also known as
 * unidirectional data flow).
 *
 * Using this method is discouraged as the Angular CLI will set production mode when using the
 * `optimization` option.
 * @see {@link cli/build ng build}
 *
 * @publicApi
 */
export function enableProdMode() {
    // The below check is there so when ngDevMode is set via terser
    // `global['ngDevMode'] = false;` is also dropped.
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
        global['ngDevMode'] = false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNfZGV2X21vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy91dGlsL2lzX2Rldl9tb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFFaEM7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLFVBQVUsU0FBUztJQUN2QixPQUFPLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDO0FBQ3pELENBQUM7QUFFRDs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSxVQUFVLGNBQWM7SUFDNUIsK0RBQStEO0lBQy9ELGtEQUFrRDtJQUNsRCxJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUNsRCxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBQzlCLENBQUM7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Z2xvYmFsfSBmcm9tICcuL2dsb2JhbCc7XG5cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIEFuZ3VsYXIgaXMgaW4gZGV2ZWxvcG1lbnQgbW9kZS5cbiAqXG4gKiBCeSBkZWZhdWx0LCB0aGlzIGlzIHRydWUsIHVubGVzcyBgZW5hYmxlUHJvZE1vZGVgIGlzIGludm9rZWQgcHJpb3IgdG8gY2FsbGluZyB0aGlzIG1ldGhvZCBvciB0aGVcbiAqIGFwcGxpY2F0aW9uIGlzIGJ1aWx0IHVzaW5nIHRoZSBBbmd1bGFyIENMSSB3aXRoIHRoZSBgb3B0aW1pemF0aW9uYCBvcHRpb24uXG4gKiBAc2VlIHtAbGluayBjbGkvYnVpbGQgbmcgYnVpbGR9XG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNEZXZNb2RlKCk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgISFuZ0Rldk1vZGU7XG59XG5cbi8qKlxuICogRGlzYWJsZSBBbmd1bGFyJ3MgZGV2ZWxvcG1lbnQgbW9kZSwgd2hpY2ggdHVybnMgb2ZmIGFzc2VydGlvbnMgYW5kIG90aGVyXG4gKiBjaGVja3Mgd2l0aGluIHRoZSBmcmFtZXdvcmsuXG4gKlxuICogT25lIGltcG9ydGFudCBhc3NlcnRpb24gdGhpcyBkaXNhYmxlcyB2ZXJpZmllcyB0aGF0IGEgY2hhbmdlIGRldGVjdGlvbiBwYXNzXG4gKiBkb2VzIG5vdCByZXN1bHQgaW4gYWRkaXRpb25hbCBjaGFuZ2VzIHRvIGFueSBiaW5kaW5ncyAoYWxzbyBrbm93biBhc1xuICogdW5pZGlyZWN0aW9uYWwgZGF0YSBmbG93KS5cbiAqXG4gKiBVc2luZyB0aGlzIG1ldGhvZCBpcyBkaXNjb3VyYWdlZCBhcyB0aGUgQW5ndWxhciBDTEkgd2lsbCBzZXQgcHJvZHVjdGlvbiBtb2RlIHdoZW4gdXNpbmcgdGhlXG4gKiBgb3B0aW1pemF0aW9uYCBvcHRpb24uXG4gKiBAc2VlIHtAbGluayBjbGkvYnVpbGQgbmcgYnVpbGR9XG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlUHJvZE1vZGUoKTogdm9pZCB7XG4gIC8vIFRoZSBiZWxvdyBjaGVjayBpcyB0aGVyZSBzbyB3aGVuIG5nRGV2TW9kZSBpcyBzZXQgdmlhIHRlcnNlclxuICAvLyBgZ2xvYmFsWyduZ0Rldk1vZGUnXSA9IGZhbHNlO2AgaXMgYWxzbyBkcm9wcGVkLlxuICBpZiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSB7XG4gICAgZ2xvYmFsWyduZ0Rldk1vZGUnXSA9IGZhbHNlO1xuICB9XG59XG4iXX0=