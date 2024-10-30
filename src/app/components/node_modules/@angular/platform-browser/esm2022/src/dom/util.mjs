/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵglobal as global } from '@angular/core';
/**
 * Exports the value under a given `name` in the global property `ng`. For example `ng.probe` if
 * `name` is `'probe'`.
 * @param name Name under which it will be exported. Keep in mind this will be a property of the
 * global `ng` object.
 * @param value The value to export.
 */
export function exportNgVar(name, value) {
    if (typeof COMPILED === 'undefined' || !COMPILED) {
        // Note: we can't export `ng` when using closure enhanced optimization as:
        // - closure declares globals itself for minified names, which sometimes clobber our `ng` global
        // - we can't declare a closure extern as the namespace `ng` is already used within Google
        //   for typings for angularJS (via `goog.provide('ng....')`).
        const ng = global['ng'] = global['ng'] || {};
        ng[name] = value;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2RvbS91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWhEOzs7Ozs7R0FNRztBQUNILE1BQU0sVUFBVSxXQUFXLENBQUMsSUFBWSxFQUFFLEtBQVU7SUFDbEQsSUFBSSxPQUFPLFFBQVEsS0FBSyxXQUFXLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNqRCwwRUFBMEU7UUFDMUUsZ0dBQWdHO1FBQ2hHLDBGQUEwRjtRQUMxRiw4REFBOEQ7UUFDOUQsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFJLE1BQU0sQ0FBQyxJQUFJLENBQXNDLElBQUksRUFBRSxDQUFDO1FBQ25GLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDbkIsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHvJtWdsb2JhbCBhcyBnbG9iYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIEV4cG9ydHMgdGhlIHZhbHVlIHVuZGVyIGEgZ2l2ZW4gYG5hbWVgIGluIHRoZSBnbG9iYWwgcHJvcGVydHkgYG5nYC4gRm9yIGV4YW1wbGUgYG5nLnByb2JlYCBpZlxuICogYG5hbWVgIGlzIGAncHJvYmUnYC5cbiAqIEBwYXJhbSBuYW1lIE5hbWUgdW5kZXIgd2hpY2ggaXQgd2lsbCBiZSBleHBvcnRlZC4gS2VlcCBpbiBtaW5kIHRoaXMgd2lsbCBiZSBhIHByb3BlcnR5IG9mIHRoZVxuICogZ2xvYmFsIGBuZ2Agb2JqZWN0LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byBleHBvcnQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHBvcnROZ1ZhcihuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgaWYgKHR5cGVvZiBDT01QSUxFRCA9PT0gJ3VuZGVmaW5lZCcgfHwgIUNPTVBJTEVEKSB7XG4gICAgLy8gTm90ZTogd2UgY2FuJ3QgZXhwb3J0IGBuZ2Agd2hlbiB1c2luZyBjbG9zdXJlIGVuaGFuY2VkIG9wdGltaXphdGlvbiBhczpcbiAgICAvLyAtIGNsb3N1cmUgZGVjbGFyZXMgZ2xvYmFscyBpdHNlbGYgZm9yIG1pbmlmaWVkIG5hbWVzLCB3aGljaCBzb21ldGltZXMgY2xvYmJlciBvdXIgYG5nYCBnbG9iYWxcbiAgICAvLyAtIHdlIGNhbid0IGRlY2xhcmUgYSBjbG9zdXJlIGV4dGVybiBhcyB0aGUgbmFtZXNwYWNlIGBuZ2AgaXMgYWxyZWFkeSB1c2VkIHdpdGhpbiBHb29nbGVcbiAgICAvLyAgIGZvciB0eXBpbmdzIGZvciBhbmd1bGFySlMgKHZpYSBgZ29vZy5wcm92aWRlKCduZy4uLi4nKWApLlxuICAgIGNvbnN0IG5nID0gZ2xvYmFsWyduZyddID0gKGdsb2JhbFsnbmcnXSBhcyB7W2tleTogc3RyaW5nXTogYW55fSB8IHVuZGVmaW5lZCkgfHwge307XG4gICAgbmdbbmFtZV0gPSB2YWx1ZTtcbiAgfVxufVxuIl19