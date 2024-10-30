/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Disallowed strings in the comment.
 *
 * see: https://html.spec.whatwg.org/multipage/syntax.html#comments
 */
const COMMENT_DISALLOWED = /^>|^->|<!--|-->|--!>|<!-$/g;
/**
 * Delimiter in the disallowed strings which needs to be wrapped with zero with character.
 */
const COMMENT_DELIMITER = /(<|>)/g;
const COMMENT_DELIMITER_ESCAPED = '\u200B$1\u200B';
/**
 * Escape the content of comment strings so that it can be safely inserted into a comment node.
 *
 * The issue is that HTML does not specify any way to escape comment end text inside the comment.
 * Consider: `<!-- The way you close a comment is with ">", and "->" at the beginning or by "-->" or
 * "--!>" at the end. -->`. Above the `"-->"` is meant to be text not an end to the comment. This
 * can be created programmatically through DOM APIs. (`<!--` are also disallowed.)
 *
 * see: https://html.spec.whatwg.org/multipage/syntax.html#comments
 *
 * ```
 * div.innerHTML = div.innerHTML
 * ```
 *
 * One would expect that the above code would be safe to do, but it turns out that because comment
 * text is not escaped, the comment may contain text which will prematurely close the comment
 * opening up the application for XSS attack. (In SSR we programmatically create comment nodes which
 * may contain such text and expect them to be safe.)
 *
 * This function escapes the comment text by looking for comment delimiters (`<` and `>`) and
 * surrounding them with `_>_` where the `_` is a zero width space `\u200B`. The result is that if a
 * comment contains any of the comment start/end delimiters (such as `<!--`, `-->` or `--!>`) the
 * text it will render normally but it will not cause the HTML parser to close/open the comment.
 *
 * @param value text to make safe for comment node by escaping the comment open/close character
 *     sequence.
 */
export function escapeCommentText(value) {
    return value.replace(COMMENT_DISALLOWED, (text) => text.replace(COMMENT_DELIMITER, COMMENT_DELIMITER_ESCAPED));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvdXRpbC9kb20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUg7Ozs7R0FJRztBQUNILE1BQU0sa0JBQWtCLEdBQUcsNEJBQTRCLENBQUM7QUFDeEQ7O0dBRUc7QUFDSCxNQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztBQUNuQyxNQUFNLHlCQUF5QixHQUFHLGdCQUFnQixDQUFDO0FBRW5EOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxLQUFhO0lBQzdDLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FDaEIsa0JBQWtCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUseUJBQXlCLENBQUMsQ0FBQyxDQUFDO0FBQ2hHLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLyoqXG4gKiBEaXNhbGxvd2VkIHN0cmluZ3MgaW4gdGhlIGNvbW1lbnQuXG4gKlxuICogc2VlOiBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9zeW50YXguaHRtbCNjb21tZW50c1xuICovXG5jb25zdCBDT01NRU5UX0RJU0FMTE9XRUQgPSAvXj58Xi0+fDwhLS18LS0+fC0tIT58PCEtJC9nO1xuLyoqXG4gKiBEZWxpbWl0ZXIgaW4gdGhlIGRpc2FsbG93ZWQgc3RyaW5ncyB3aGljaCBuZWVkcyB0byBiZSB3cmFwcGVkIHdpdGggemVybyB3aXRoIGNoYXJhY3Rlci5cbiAqL1xuY29uc3QgQ09NTUVOVF9ERUxJTUlURVIgPSAvKDx8PikvZztcbmNvbnN0IENPTU1FTlRfREVMSU1JVEVSX0VTQ0FQRUQgPSAnXFx1MjAwQiQxXFx1MjAwQic7XG5cbi8qKlxuICogRXNjYXBlIHRoZSBjb250ZW50IG9mIGNvbW1lbnQgc3RyaW5ncyBzbyB0aGF0IGl0IGNhbiBiZSBzYWZlbHkgaW5zZXJ0ZWQgaW50byBhIGNvbW1lbnQgbm9kZS5cbiAqXG4gKiBUaGUgaXNzdWUgaXMgdGhhdCBIVE1MIGRvZXMgbm90IHNwZWNpZnkgYW55IHdheSB0byBlc2NhcGUgY29tbWVudCBlbmQgdGV4dCBpbnNpZGUgdGhlIGNvbW1lbnQuXG4gKiBDb25zaWRlcjogYDwhLS0gVGhlIHdheSB5b3UgY2xvc2UgYSBjb21tZW50IGlzIHdpdGggXCI+XCIsIGFuZCBcIi0+XCIgYXQgdGhlIGJlZ2lubmluZyBvciBieSBcIi0tPlwiIG9yXG4gKiBcIi0tIT5cIiBhdCB0aGUgZW5kLiAtLT5gLiBBYm92ZSB0aGUgYFwiLS0+XCJgIGlzIG1lYW50IHRvIGJlIHRleHQgbm90IGFuIGVuZCB0byB0aGUgY29tbWVudC4gVGhpc1xuICogY2FuIGJlIGNyZWF0ZWQgcHJvZ3JhbW1hdGljYWxseSB0aHJvdWdoIERPTSBBUElzLiAoYDwhLS1gIGFyZSBhbHNvIGRpc2FsbG93ZWQuKVxuICpcbiAqIHNlZTogaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc3ludGF4Lmh0bWwjY29tbWVudHNcbiAqXG4gKiBgYGBcbiAqIGRpdi5pbm5lckhUTUwgPSBkaXYuaW5uZXJIVE1MXG4gKiBgYGBcbiAqXG4gKiBPbmUgd291bGQgZXhwZWN0IHRoYXQgdGhlIGFib3ZlIGNvZGUgd291bGQgYmUgc2FmZSB0byBkbywgYnV0IGl0IHR1cm5zIG91dCB0aGF0IGJlY2F1c2UgY29tbWVudFxuICogdGV4dCBpcyBub3QgZXNjYXBlZCwgdGhlIGNvbW1lbnQgbWF5IGNvbnRhaW4gdGV4dCB3aGljaCB3aWxsIHByZW1hdHVyZWx5IGNsb3NlIHRoZSBjb21tZW50XG4gKiBvcGVuaW5nIHVwIHRoZSBhcHBsaWNhdGlvbiBmb3IgWFNTIGF0dGFjay4gKEluIFNTUiB3ZSBwcm9ncmFtbWF0aWNhbGx5IGNyZWF0ZSBjb21tZW50IG5vZGVzIHdoaWNoXG4gKiBtYXkgY29udGFpbiBzdWNoIHRleHQgYW5kIGV4cGVjdCB0aGVtIHRvIGJlIHNhZmUuKVxuICpcbiAqIFRoaXMgZnVuY3Rpb24gZXNjYXBlcyB0aGUgY29tbWVudCB0ZXh0IGJ5IGxvb2tpbmcgZm9yIGNvbW1lbnQgZGVsaW1pdGVycyAoYDxgIGFuZCBgPmApIGFuZFxuICogc3Vycm91bmRpbmcgdGhlbSB3aXRoIGBfPl9gIHdoZXJlIHRoZSBgX2AgaXMgYSB6ZXJvIHdpZHRoIHNwYWNlIGBcXHUyMDBCYC4gVGhlIHJlc3VsdCBpcyB0aGF0IGlmIGFcbiAqIGNvbW1lbnQgY29udGFpbnMgYW55IG9mIHRoZSBjb21tZW50IHN0YXJ0L2VuZCBkZWxpbWl0ZXJzIChzdWNoIGFzIGA8IS0tYCwgYC0tPmAgb3IgYC0tIT5gKSB0aGVcbiAqIHRleHQgaXQgd2lsbCByZW5kZXIgbm9ybWFsbHkgYnV0IGl0IHdpbGwgbm90IGNhdXNlIHRoZSBIVE1MIHBhcnNlciB0byBjbG9zZS9vcGVuIHRoZSBjb21tZW50LlxuICpcbiAqIEBwYXJhbSB2YWx1ZSB0ZXh0IHRvIG1ha2Ugc2FmZSBmb3IgY29tbWVudCBub2RlIGJ5IGVzY2FwaW5nIHRoZSBjb21tZW50IG9wZW4vY2xvc2UgY2hhcmFjdGVyXG4gKiAgICAgc2VxdWVuY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGVDb21tZW50VGV4dCh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoXG4gICAgICBDT01NRU5UX0RJU0FMTE9XRUQsICh0ZXh0KSA9PiB0ZXh0LnJlcGxhY2UoQ09NTUVOVF9ERUxJTUlURVIsIENPTU1FTlRfREVMSU1JVEVSX0VTQ0FQRUQpKTtcbn1cbiJdfQ==