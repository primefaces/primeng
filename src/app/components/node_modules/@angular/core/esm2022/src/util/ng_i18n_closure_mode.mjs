/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { global } from './global';
/**
 * NOTE: changes to the `ngI18nClosureMode` name must be synced with `compiler-cli/src/tooling.ts`.
 */
if (typeof ngI18nClosureMode === 'undefined') {
    // These property accesses can be ignored because ngI18nClosureMode will be set to false
    // when optimizing code and the whole if statement will be dropped.
    // Make sure to refer to ngI18nClosureMode as ['ngI18nClosureMode'] for closure.
    // NOTE: we need to have it in IIFE so that the tree-shaker is happy.
    (function () {
        // tslint:disable-next-line:no-toplevel-property-access
        global['ngI18nClosureMode'] =
            // TODO(FW-1250): validate that this actually, you know, works.
            // tslint:disable-next-line:no-toplevel-property-access
            typeof goog !== 'undefined' && typeof goog.getMsg === 'function';
    })();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfaTE4bl9jbG9zdXJlX21vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy91dGlsL25nX2kxOG5fY2xvc3VyZV9tb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFNaEM7O0dBRUc7QUFDSCxJQUFJLE9BQU8saUJBQWlCLEtBQUssV0FBVyxFQUFFLENBQUM7SUFDN0Msd0ZBQXdGO0lBQ3hGLG1FQUFtRTtJQUNuRSxnRkFBZ0Y7SUFDaEYscUVBQXFFO0lBQ3JFLENBQUM7UUFDQyx1REFBdUQ7UUFDdkQsTUFBTSxDQUFDLG1CQUFtQixDQUFDO1lBQ3ZCLCtEQUErRDtZQUMvRCx1REFBdUQ7WUFDdkQsT0FBTyxJQUFJLEtBQUssV0FBVyxJQUFJLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUM7SUFDdkUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNQLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtnbG9iYWx9IGZyb20gJy4vZ2xvYmFsJztcblxuZGVjbGFyZSBnbG9iYWwge1xuICBjb25zdCBuZ0kxOG5DbG9zdXJlTW9kZTogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBOT1RFOiBjaGFuZ2VzIHRvIHRoZSBgbmdJMThuQ2xvc3VyZU1vZGVgIG5hbWUgbXVzdCBiZSBzeW5jZWQgd2l0aCBgY29tcGlsZXItY2xpL3NyYy90b29saW5nLnRzYC5cbiAqL1xuaWYgKHR5cGVvZiBuZ0kxOG5DbG9zdXJlTW9kZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgLy8gVGhlc2UgcHJvcGVydHkgYWNjZXNzZXMgY2FuIGJlIGlnbm9yZWQgYmVjYXVzZSBuZ0kxOG5DbG9zdXJlTW9kZSB3aWxsIGJlIHNldCB0byBmYWxzZVxuICAvLyB3aGVuIG9wdGltaXppbmcgY29kZSBhbmQgdGhlIHdob2xlIGlmIHN0YXRlbWVudCB3aWxsIGJlIGRyb3BwZWQuXG4gIC8vIE1ha2Ugc3VyZSB0byByZWZlciB0byBuZ0kxOG5DbG9zdXJlTW9kZSBhcyBbJ25nSTE4bkNsb3N1cmVNb2RlJ10gZm9yIGNsb3N1cmUuXG4gIC8vIE5PVEU6IHdlIG5lZWQgdG8gaGF2ZSBpdCBpbiBJSUZFIHNvIHRoYXQgdGhlIHRyZWUtc2hha2VyIGlzIGhhcHB5LlxuICAoZnVuY3Rpb24oKSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXRvcGxldmVsLXByb3BlcnR5LWFjY2Vzc1xuICAgIGdsb2JhbFsnbmdJMThuQ2xvc3VyZU1vZGUnXSA9XG4gICAgICAgIC8vIFRPRE8oRlctMTI1MCk6IHZhbGlkYXRlIHRoYXQgdGhpcyBhY3R1YWxseSwgeW91IGtub3csIHdvcmtzLlxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdG9wbGV2ZWwtcHJvcGVydHktYWNjZXNzXG4gICAgICAgIHR5cGVvZiBnb29nICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZ29vZy5nZXRNc2cgPT09ICdmdW5jdGlvbic7XG4gIH0pKCk7XG59XG4iXX0=