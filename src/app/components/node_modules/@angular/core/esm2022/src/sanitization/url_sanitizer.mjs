/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { XSS_SECURITY_URL } from '../error_details_base_url';
/**
 * A pattern that recognizes URLs that are safe wrt. XSS in URL navigation
 * contexts.
 *
 * This regular expression matches a subset of URLs that will not cause script
 * execution if used in URL context within a HTML document. Specifically, this
 * regular expression matches if:
 * (1) Either a protocol that is not javascript:, and that has valid characters
 *     (alphanumeric or [+-.]).
 * (2) or no protocol.  A protocol must be followed by a colon. The below
 *     allows that by allowing colons only after one of the characters [/?#].
 *     A colon after a hash (#) must be in the fragment.
 *     Otherwise, a colon after a (?) must be in a query.
 *     Otherwise, a colon after a single solidus (/) must be in a path.
 *     Otherwise, a colon after a double solidus (//) must be in the authority
 *     (before port).
 *
 * The pattern disallows &, used in HTML entity declarations before
 * one of the characters in [/?#]. This disallows HTML entities used in the
 * protocol name, which should never happen, e.g. "h&#116;tp" for "http".
 * It also disallows HTML entities in the first path part of a relative path,
 * e.g. "foo&lt;bar/baz".  Our existing escaping functions should not produce
 * that. More importantly, it disallows masking of a colon,
 * e.g. "javascript&#58;...".
 *
 * This regular expression was taken from the Closure sanitization library.
 */
const SAFE_URL_PATTERN = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
export function _sanitizeUrl(url) {
    url = String(url);
    if (url.match(SAFE_URL_PATTERN))
        return url;
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
        console.warn(`WARNING: sanitizing unsafe URL value ${url} (see ${XSS_SECURITY_URL})`);
    }
    return 'unsafe:' + url;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsX3Nhbml0aXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3Nhbml0aXphdGlvbi91cmxfc2FuaXRpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRTNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILE1BQU0sZ0JBQWdCLEdBQUcsMkRBQTJELENBQUM7QUFDckYsTUFBTSxVQUFVLFlBQVksQ0FBQyxHQUFXO0lBQ3RDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEIsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDO1FBQUUsT0FBTyxHQUFHLENBQUM7SUFFNUMsSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxFQUFFLENBQUM7UUFDbEQsT0FBTyxDQUFDLElBQUksQ0FBQyx3Q0FBd0MsR0FBRyxTQUFTLGdCQUFnQixHQUFHLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBRUQsT0FBTyxTQUFTLEdBQUcsR0FBRyxDQUFDO0FBQ3pCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtYU1NfU0VDVVJJVFlfVVJMfSBmcm9tICcuLi9lcnJvcl9kZXRhaWxzX2Jhc2VfdXJsJztcblxuLyoqXG4gKiBBIHBhdHRlcm4gdGhhdCByZWNvZ25pemVzIFVSTHMgdGhhdCBhcmUgc2FmZSB3cnQuIFhTUyBpbiBVUkwgbmF2aWdhdGlvblxuICogY29udGV4dHMuXG4gKlxuICogVGhpcyByZWd1bGFyIGV4cHJlc3Npb24gbWF0Y2hlcyBhIHN1YnNldCBvZiBVUkxzIHRoYXQgd2lsbCBub3QgY2F1c2Ugc2NyaXB0XG4gKiBleGVjdXRpb24gaWYgdXNlZCBpbiBVUkwgY29udGV4dCB3aXRoaW4gYSBIVE1MIGRvY3VtZW50LiBTcGVjaWZpY2FsbHksIHRoaXNcbiAqIHJlZ3VsYXIgZXhwcmVzc2lvbiBtYXRjaGVzIGlmOlxuICogKDEpIEVpdGhlciBhIHByb3RvY29sIHRoYXQgaXMgbm90IGphdmFzY3JpcHQ6LCBhbmQgdGhhdCBoYXMgdmFsaWQgY2hhcmFjdGVyc1xuICogICAgIChhbHBoYW51bWVyaWMgb3IgWystLl0pLlxuICogKDIpIG9yIG5vIHByb3RvY29sLiAgQSBwcm90b2NvbCBtdXN0IGJlIGZvbGxvd2VkIGJ5IGEgY29sb24uIFRoZSBiZWxvd1xuICogICAgIGFsbG93cyB0aGF0IGJ5IGFsbG93aW5nIGNvbG9ucyBvbmx5IGFmdGVyIG9uZSBvZiB0aGUgY2hhcmFjdGVycyBbLz8jXS5cbiAqICAgICBBIGNvbG9uIGFmdGVyIGEgaGFzaCAoIykgbXVzdCBiZSBpbiB0aGUgZnJhZ21lbnQuXG4gKiAgICAgT3RoZXJ3aXNlLCBhIGNvbG9uIGFmdGVyIGEgKD8pIG11c3QgYmUgaW4gYSBxdWVyeS5cbiAqICAgICBPdGhlcndpc2UsIGEgY29sb24gYWZ0ZXIgYSBzaW5nbGUgc29saWR1cyAoLykgbXVzdCBiZSBpbiBhIHBhdGguXG4gKiAgICAgT3RoZXJ3aXNlLCBhIGNvbG9uIGFmdGVyIGEgZG91YmxlIHNvbGlkdXMgKC8vKSBtdXN0IGJlIGluIHRoZSBhdXRob3JpdHlcbiAqICAgICAoYmVmb3JlIHBvcnQpLlxuICpcbiAqIFRoZSBwYXR0ZXJuIGRpc2FsbG93cyAmLCB1c2VkIGluIEhUTUwgZW50aXR5IGRlY2xhcmF0aW9ucyBiZWZvcmVcbiAqIG9uZSBvZiB0aGUgY2hhcmFjdGVycyBpbiBbLz8jXS4gVGhpcyBkaXNhbGxvd3MgSFRNTCBlbnRpdGllcyB1c2VkIGluIHRoZVxuICogcHJvdG9jb2wgbmFtZSwgd2hpY2ggc2hvdWxkIG5ldmVyIGhhcHBlbiwgZS5nLiBcImgmIzExNjt0cFwiIGZvciBcImh0dHBcIi5cbiAqIEl0IGFsc28gZGlzYWxsb3dzIEhUTUwgZW50aXRpZXMgaW4gdGhlIGZpcnN0IHBhdGggcGFydCBvZiBhIHJlbGF0aXZlIHBhdGgsXG4gKiBlLmcuIFwiZm9vJmx0O2Jhci9iYXpcIi4gIE91ciBleGlzdGluZyBlc2NhcGluZyBmdW5jdGlvbnMgc2hvdWxkIG5vdCBwcm9kdWNlXG4gKiB0aGF0LiBNb3JlIGltcG9ydGFudGx5LCBpdCBkaXNhbGxvd3MgbWFza2luZyBvZiBhIGNvbG9uLFxuICogZS5nLiBcImphdmFzY3JpcHQmIzU4Oy4uLlwiLlxuICpcbiAqIFRoaXMgcmVndWxhciBleHByZXNzaW9uIHdhcyB0YWtlbiBmcm9tIHRoZSBDbG9zdXJlIHNhbml0aXphdGlvbiBsaWJyYXJ5LlxuICovXG5jb25zdCBTQUZFX1VSTF9QQVRURVJOID0gL14oPyFqYXZhc2NyaXB0OikoPzpbYS16MC05Ky4tXSs6fFteJjpcXC8/I10qKD86W1xcLz8jXXwkKSkvaTtcbmV4cG9ydCBmdW5jdGlvbiBfc2FuaXRpemVVcmwodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICB1cmwgPSBTdHJpbmcodXJsKTtcbiAgaWYgKHVybC5tYXRjaChTQUZFX1VSTF9QQVRURVJOKSkgcmV0dXJuIHVybDtcblxuICBpZiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSB7XG4gICAgY29uc29sZS53YXJuKGBXQVJOSU5HOiBzYW5pdGl6aW5nIHVuc2FmZSBVUkwgdmFsdWUgJHt1cmx9IChzZWUgJHtYU1NfU0VDVVJJVFlfVVJMfSlgKTtcbiAgfVxuXG4gIHJldHVybiAndW5zYWZlOicgKyB1cmw7XG59XG4iXX0=