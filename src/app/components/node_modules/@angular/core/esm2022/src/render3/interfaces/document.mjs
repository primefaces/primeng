/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { RuntimeError } from '../../errors';
/**
 * Most of the use of `document` in Angular is from within the DI system so it is possible to simply
 * inject the `DOCUMENT` token and are done.
 *
 * Ivy is special because it does not rely upon the DI and must get hold of the document some other
 * way.
 *
 * The solution is to define `getDocument()` and `setDocument()` top-level functions for ivy.
 * Wherever ivy needs the global document, it calls `getDocument()` instead.
 *
 * When running ivy outside of a browser environment, it is necessary to call `setDocument()` to
 * tell ivy what the global `document` is.
 *
 * Angular does this for us in each of the standard platforms (`Browser` and `Server`)
 * by calling `setDocument()` when providing the `DOCUMENT` token.
 */
let DOCUMENT = undefined;
/**
 * Tell ivy what the `document` is for this platform.
 *
 * It is only necessary to call this if the current platform is not a browser.
 *
 * @param document The object representing the global `document` in this environment.
 */
export function setDocument(document) {
    DOCUMENT = document;
}
/**
 * Access the object that represents the `document` for this platform.
 *
 * Ivy calls this whenever it needs to access the `document` object.
 * For example to create the renderer or to do sanitization.
 */
export function getDocument() {
    if (DOCUMENT !== undefined) {
        return DOCUMENT;
    }
    else if (typeof document !== 'undefined') {
        return document;
    }
    throw new RuntimeError(210 /* RuntimeErrorCode.MISSING_DOCUMENT */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
        `The document object is not available in this context. Make sure the DOCUMENT injection token is provided.`);
    // No "document" can be found. This should only happen if we are running ivy outside Angular and
    // the current platform is not a browser. Since this is not a supported scenario at the moment
    // this should not happen in Angular apps.
    // Once we support running ivy outside of Angular we will need to publish `setDocument()` as a
    // public API.
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2ludGVyZmFjZXMvZG9jdW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBbUIsTUFBTSxjQUFjLENBQUM7QUFFNUQ7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsSUFBSSxRQUFRLEdBQXVCLFNBQVMsQ0FBQztBQUU3Qzs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsV0FBVyxDQUFDLFFBQTRCO0lBQ3RELFFBQVEsR0FBRyxRQUFRLENBQUM7QUFDdEIsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLFdBQVc7SUFDekIsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFLENBQUM7UUFDM0IsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztTQUFNLElBQUksT0FBTyxRQUFRLEtBQUssV0FBVyxFQUFFLENBQUM7UUFDM0MsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUVELE1BQU0sSUFBSSxZQUFZLDhDQUVsQixDQUFDLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLENBQUM7UUFDM0MsMkdBQTJHLENBQUMsQ0FBQztJQUVySCxnR0FBZ0c7SUFDaEcsOEZBQThGO0lBQzlGLDBDQUEwQztJQUMxQyw4RkFBOEY7SUFDOUYsY0FBYztBQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7UnVudGltZUVycm9yLCBSdW50aW1lRXJyb3JDb2RlfSBmcm9tICcuLi8uLi9lcnJvcnMnO1xuXG4vKipcbiAqIE1vc3Qgb2YgdGhlIHVzZSBvZiBgZG9jdW1lbnRgIGluIEFuZ3VsYXIgaXMgZnJvbSB3aXRoaW4gdGhlIERJIHN5c3RlbSBzbyBpdCBpcyBwb3NzaWJsZSB0byBzaW1wbHlcbiAqIGluamVjdCB0aGUgYERPQ1VNRU5UYCB0b2tlbiBhbmQgYXJlIGRvbmUuXG4gKlxuICogSXZ5IGlzIHNwZWNpYWwgYmVjYXVzZSBpdCBkb2VzIG5vdCByZWx5IHVwb24gdGhlIERJIGFuZCBtdXN0IGdldCBob2xkIG9mIHRoZSBkb2N1bWVudCBzb21lIG90aGVyXG4gKiB3YXkuXG4gKlxuICogVGhlIHNvbHV0aW9uIGlzIHRvIGRlZmluZSBgZ2V0RG9jdW1lbnQoKWAgYW5kIGBzZXREb2N1bWVudCgpYCB0b3AtbGV2ZWwgZnVuY3Rpb25zIGZvciBpdnkuXG4gKiBXaGVyZXZlciBpdnkgbmVlZHMgdGhlIGdsb2JhbCBkb2N1bWVudCwgaXQgY2FsbHMgYGdldERvY3VtZW50KClgIGluc3RlYWQuXG4gKlxuICogV2hlbiBydW5uaW5nIGl2eSBvdXRzaWRlIG9mIGEgYnJvd3NlciBlbnZpcm9ubWVudCwgaXQgaXMgbmVjZXNzYXJ5IHRvIGNhbGwgYHNldERvY3VtZW50KClgIHRvXG4gKiB0ZWxsIGl2eSB3aGF0IHRoZSBnbG9iYWwgYGRvY3VtZW50YCBpcy5cbiAqXG4gKiBBbmd1bGFyIGRvZXMgdGhpcyBmb3IgdXMgaW4gZWFjaCBvZiB0aGUgc3RhbmRhcmQgcGxhdGZvcm1zIChgQnJvd3NlcmAgYW5kIGBTZXJ2ZXJgKVxuICogYnkgY2FsbGluZyBgc2V0RG9jdW1lbnQoKWAgd2hlbiBwcm92aWRpbmcgdGhlIGBET0NVTUVOVGAgdG9rZW4uXG4gKi9cbmxldCBET0NVTUVOVDogRG9jdW1lbnR8dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRlbGwgaXZ5IHdoYXQgdGhlIGBkb2N1bWVudGAgaXMgZm9yIHRoaXMgcGxhdGZvcm0uXG4gKlxuICogSXQgaXMgb25seSBuZWNlc3NhcnkgdG8gY2FsbCB0aGlzIGlmIHRoZSBjdXJyZW50IHBsYXRmb3JtIGlzIG5vdCBhIGJyb3dzZXIuXG4gKlxuICogQHBhcmFtIGRvY3VtZW50IFRoZSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBnbG9iYWwgYGRvY3VtZW50YCBpbiB0aGlzIGVudmlyb25tZW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0RG9jdW1lbnQoZG9jdW1lbnQ6IERvY3VtZW50fHVuZGVmaW5lZCk6IHZvaWQge1xuICBET0NVTUVOVCA9IGRvY3VtZW50O1xufVxuXG4vKipcbiAqIEFjY2VzcyB0aGUgb2JqZWN0IHRoYXQgcmVwcmVzZW50cyB0aGUgYGRvY3VtZW50YCBmb3IgdGhpcyBwbGF0Zm9ybS5cbiAqXG4gKiBJdnkgY2FsbHMgdGhpcyB3aGVuZXZlciBpdCBuZWVkcyB0byBhY2Nlc3MgdGhlIGBkb2N1bWVudGAgb2JqZWN0LlxuICogRm9yIGV4YW1wbGUgdG8gY3JlYXRlIHRoZSByZW5kZXJlciBvciB0byBkbyBzYW5pdGl6YXRpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREb2N1bWVudCgpOiBEb2N1bWVudCB7XG4gIGlmIChET0NVTUVOVCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIERPQ1VNRU5UO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQ7XG4gIH1cblxuICB0aHJvdyBuZXcgUnVudGltZUVycm9yKFxuICAgICAgUnVudGltZUVycm9yQ29kZS5NSVNTSU5HX0RPQ1VNRU5ULFxuICAgICAgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkgJiZcbiAgICAgICAgICBgVGhlIGRvY3VtZW50IG9iamVjdCBpcyBub3QgYXZhaWxhYmxlIGluIHRoaXMgY29udGV4dC4gTWFrZSBzdXJlIHRoZSBET0NVTUVOVCBpbmplY3Rpb24gdG9rZW4gaXMgcHJvdmlkZWQuYCk7XG5cbiAgLy8gTm8gXCJkb2N1bWVudFwiIGNhbiBiZSBmb3VuZC4gVGhpcyBzaG91bGQgb25seSBoYXBwZW4gaWYgd2UgYXJlIHJ1bm5pbmcgaXZ5IG91dHNpZGUgQW5ndWxhciBhbmRcbiAgLy8gdGhlIGN1cnJlbnQgcGxhdGZvcm0gaXMgbm90IGEgYnJvd3Nlci4gU2luY2UgdGhpcyBpcyBub3QgYSBzdXBwb3J0ZWQgc2NlbmFyaW8gYXQgdGhlIG1vbWVudFxuICAvLyB0aGlzIHNob3VsZCBub3QgaGFwcGVuIGluIEFuZ3VsYXIgYXBwcy5cbiAgLy8gT25jZSB3ZSBzdXBwb3J0IHJ1bm5pbmcgaXZ5IG91dHNpZGUgb2YgQW5ndWxhciB3ZSB3aWxsIG5lZWQgdG8gcHVibGlzaCBgc2V0RG9jdW1lbnQoKWAgYXMgYVxuICAvLyBwdWJsaWMgQVBJLlxufVxuIl19