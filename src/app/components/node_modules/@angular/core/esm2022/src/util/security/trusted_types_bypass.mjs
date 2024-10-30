/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * A module to facilitate use of a Trusted Types policy internally within
 * Angular specifically for bypassSecurityTrust* and custom sanitizers. It
 * lazily constructs the Trusted Types policy, providing helper utilities for
 * promoting strings to Trusted Types. When Trusted Types are not available,
 * strings are used as a fallback.
 * @security All use of this module is security-sensitive and should go through
 * security review.
 */
import { global } from '../global';
/**
 * The Trusted Types policy, or null if Trusted Types are not
 * enabled/supported, or undefined if the policy has not been created yet.
 */
let policy;
/**
 * Returns the Trusted Types policy, or null if Trusted Types are not
 * enabled/supported. The first call to this function will create the policy.
 */
function getPolicy() {
    if (policy === undefined) {
        policy = null;
        if (global.trustedTypes) {
            try {
                policy = global.trustedTypes
                    .createPolicy('angular#unsafe-bypass', {
                    createHTML: (s) => s,
                    createScript: (s) => s,
                    createScriptURL: (s) => s,
                });
            }
            catch {
                // trustedTypes.createPolicy throws if called with a name that is
                // already registered, even in report-only mode. Until the API changes,
                // catch the error not to break the applications functionally. In such
                // cases, the code will fall back to using strings.
            }
        }
    }
    return policy;
}
/**
 * Unsafely promote a string to a TrustedHTML, falling back to strings when
 * Trusted Types are not available.
 * @security This is a security-sensitive function; any use of this function
 * must go through security review. In particular, it must be assured that it
 * is only passed strings that come directly from custom sanitizers or the
 * bypassSecurityTrust* functions.
 */
export function trustedHTMLFromStringBypass(html) {
    return getPolicy()?.createHTML(html) || html;
}
/**
 * Unsafely promote a string to a TrustedScript, falling back to strings when
 * Trusted Types are not available.
 * @security This is a security-sensitive function; any use of this function
 * must go through security review. In particular, it must be assured that it
 * is only passed strings that come directly from custom sanitizers or the
 * bypassSecurityTrust* functions.
 */
export function trustedScriptFromStringBypass(script) {
    return getPolicy()?.createScript(script) || script;
}
/**
 * Unsafely promote a string to a TrustedScriptURL, falling back to strings
 * when Trusted Types are not available.
 * @security This is a security-sensitive function; any use of this function
 * must go through security review. In particular, it must be assured that it
 * is only passed strings that come directly from custom sanitizers or the
 * bypassSecurityTrust* functions.
 */
export function trustedScriptURLFromStringBypass(url) {
    return getPolicy()?.createScriptURL(url) || url;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ1c3RlZF90eXBlc19ieXBhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy91dGlsL3NlY3VyaXR5L3RydXN0ZWRfdHlwZXNfYnlwYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVIOzs7Ozs7Ozs7R0FTRztBQUVILE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFHakM7OztHQUdHO0FBQ0gsSUFBSSxNQUF3QyxDQUFDO0FBRTdDOzs7R0FHRztBQUNILFNBQVMsU0FBUztJQUNoQixJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUUsQ0FBQztRQUN6QixNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2QsSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDO2dCQUNILE1BQU0sR0FBSSxNQUFNLENBQUMsWUFBeUM7cUJBQzVDLFlBQVksQ0FBQyx1QkFBdUIsRUFBRTtvQkFDckMsVUFBVSxFQUFFLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUM1QixZQUFZLEVBQUUsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQzlCLGVBQWUsRUFBRSxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztpQkFDbEMsQ0FBQyxDQUFDO1lBQ2xCLENBQUM7WUFBQyxNQUFNLENBQUM7Z0JBQ1AsaUVBQWlFO2dCQUNqRSx1RUFBdUU7Z0JBQ3ZFLHNFQUFzRTtnQkFDdEUsbURBQW1EO1lBQ3JELENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxVQUFVLDJCQUEyQixDQUFDLElBQVk7SUFDdEQsT0FBTyxTQUFTLEVBQUUsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDO0FBQy9DLENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxVQUFVLDZCQUE2QixDQUFDLE1BQWM7SUFDMUQsT0FBTyxTQUFTLEVBQUUsRUFBRSxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDO0FBQ3JELENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxVQUFVLGdDQUFnQyxDQUFDLEdBQVc7SUFDMUQsT0FBTyxTQUFTLEVBQUUsRUFBRSxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDO0FBQ2xELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLyoqXG4gKiBAZmlsZW92ZXJ2aWV3XG4gKiBBIG1vZHVsZSB0byBmYWNpbGl0YXRlIHVzZSBvZiBhIFRydXN0ZWQgVHlwZXMgcG9saWN5IGludGVybmFsbHkgd2l0aGluXG4gKiBBbmd1bGFyIHNwZWNpZmljYWxseSBmb3IgYnlwYXNzU2VjdXJpdHlUcnVzdCogYW5kIGN1c3RvbSBzYW5pdGl6ZXJzLiBJdFxuICogbGF6aWx5IGNvbnN0cnVjdHMgdGhlIFRydXN0ZWQgVHlwZXMgcG9saWN5LCBwcm92aWRpbmcgaGVscGVyIHV0aWxpdGllcyBmb3JcbiAqIHByb21vdGluZyBzdHJpbmdzIHRvIFRydXN0ZWQgVHlwZXMuIFdoZW4gVHJ1c3RlZCBUeXBlcyBhcmUgbm90IGF2YWlsYWJsZSxcbiAqIHN0cmluZ3MgYXJlIHVzZWQgYXMgYSBmYWxsYmFjay5cbiAqIEBzZWN1cml0eSBBbGwgdXNlIG9mIHRoaXMgbW9kdWxlIGlzIHNlY3VyaXR5LXNlbnNpdGl2ZSBhbmQgc2hvdWxkIGdvIHRocm91Z2hcbiAqIHNlY3VyaXR5IHJldmlldy5cbiAqL1xuXG5pbXBvcnQge2dsb2JhbH0gZnJvbSAnLi4vZ2xvYmFsJztcbmltcG9ydCB7VHJ1c3RlZEhUTUwsIFRydXN0ZWRTY3JpcHQsIFRydXN0ZWRTY3JpcHRVUkwsIFRydXN0ZWRUeXBlUG9saWN5LCBUcnVzdGVkVHlwZVBvbGljeUZhY3Rvcnl9IGZyb20gJy4vdHJ1c3RlZF90eXBlX2RlZnMnO1xuXG4vKipcbiAqIFRoZSBUcnVzdGVkIFR5cGVzIHBvbGljeSwgb3IgbnVsbCBpZiBUcnVzdGVkIFR5cGVzIGFyZSBub3RcbiAqIGVuYWJsZWQvc3VwcG9ydGVkLCBvciB1bmRlZmluZWQgaWYgdGhlIHBvbGljeSBoYXMgbm90IGJlZW4gY3JlYXRlZCB5ZXQuXG4gKi9cbmxldCBwb2xpY3k6IFRydXN0ZWRUeXBlUG9saWN5fG51bGx8dW5kZWZpbmVkO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIFRydXN0ZWQgVHlwZXMgcG9saWN5LCBvciBudWxsIGlmIFRydXN0ZWQgVHlwZXMgYXJlIG5vdFxuICogZW5hYmxlZC9zdXBwb3J0ZWQuIFRoZSBmaXJzdCBjYWxsIHRvIHRoaXMgZnVuY3Rpb24gd2lsbCBjcmVhdGUgdGhlIHBvbGljeS5cbiAqL1xuZnVuY3Rpb24gZ2V0UG9saWN5KCk6IFRydXN0ZWRUeXBlUG9saWN5fG51bGwge1xuICBpZiAocG9saWN5ID09PSB1bmRlZmluZWQpIHtcbiAgICBwb2xpY3kgPSBudWxsO1xuICAgIGlmIChnbG9iYWwudHJ1c3RlZFR5cGVzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBwb2xpY3kgPSAoZ2xvYmFsLnRydXN0ZWRUeXBlcyBhcyBUcnVzdGVkVHlwZVBvbGljeUZhY3RvcnkpXG4gICAgICAgICAgICAgICAgICAgICAuY3JlYXRlUG9saWN5KCdhbmd1bGFyI3Vuc2FmZS1ieXBhc3MnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUhUTUw6IChzOiBzdHJpbmcpID0+IHMsXG4gICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZVNjcmlwdDogKHM6IHN0cmluZykgPT4gcyxcbiAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlU2NyaXB0VVJMOiAoczogc3RyaW5nKSA9PiBzLFxuICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgLy8gdHJ1c3RlZFR5cGVzLmNyZWF0ZVBvbGljeSB0aHJvd3MgaWYgY2FsbGVkIHdpdGggYSBuYW1lIHRoYXQgaXNcbiAgICAgICAgLy8gYWxyZWFkeSByZWdpc3RlcmVkLCBldmVuIGluIHJlcG9ydC1vbmx5IG1vZGUuIFVudGlsIHRoZSBBUEkgY2hhbmdlcyxcbiAgICAgICAgLy8gY2F0Y2ggdGhlIGVycm9yIG5vdCB0byBicmVhayB0aGUgYXBwbGljYXRpb25zIGZ1bmN0aW9uYWxseS4gSW4gc3VjaFxuICAgICAgICAvLyBjYXNlcywgdGhlIGNvZGUgd2lsbCBmYWxsIGJhY2sgdG8gdXNpbmcgc3RyaW5ncy5cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHBvbGljeTtcbn1cblxuLyoqXG4gKiBVbnNhZmVseSBwcm9tb3RlIGEgc3RyaW5nIHRvIGEgVHJ1c3RlZEhUTUwsIGZhbGxpbmcgYmFjayB0byBzdHJpbmdzIHdoZW5cbiAqIFRydXN0ZWQgVHlwZXMgYXJlIG5vdCBhdmFpbGFibGUuXG4gKiBAc2VjdXJpdHkgVGhpcyBpcyBhIHNlY3VyaXR5LXNlbnNpdGl2ZSBmdW5jdGlvbjsgYW55IHVzZSBvZiB0aGlzIGZ1bmN0aW9uXG4gKiBtdXN0IGdvIHRocm91Z2ggc2VjdXJpdHkgcmV2aWV3LiBJbiBwYXJ0aWN1bGFyLCBpdCBtdXN0IGJlIGFzc3VyZWQgdGhhdCBpdFxuICogaXMgb25seSBwYXNzZWQgc3RyaW5ncyB0aGF0IGNvbWUgZGlyZWN0bHkgZnJvbSBjdXN0b20gc2FuaXRpemVycyBvciB0aGVcbiAqIGJ5cGFzc1NlY3VyaXR5VHJ1c3QqIGZ1bmN0aW9ucy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRydXN0ZWRIVE1MRnJvbVN0cmluZ0J5cGFzcyhodG1sOiBzdHJpbmcpOiBUcnVzdGVkSFRNTHxzdHJpbmcge1xuICByZXR1cm4gZ2V0UG9saWN5KCk/LmNyZWF0ZUhUTUwoaHRtbCkgfHwgaHRtbDtcbn1cblxuLyoqXG4gKiBVbnNhZmVseSBwcm9tb3RlIGEgc3RyaW5nIHRvIGEgVHJ1c3RlZFNjcmlwdCwgZmFsbGluZyBiYWNrIHRvIHN0cmluZ3Mgd2hlblxuICogVHJ1c3RlZCBUeXBlcyBhcmUgbm90IGF2YWlsYWJsZS5cbiAqIEBzZWN1cml0eSBUaGlzIGlzIGEgc2VjdXJpdHktc2Vuc2l0aXZlIGZ1bmN0aW9uOyBhbnkgdXNlIG9mIHRoaXMgZnVuY3Rpb25cbiAqIG11c3QgZ28gdGhyb3VnaCBzZWN1cml0eSByZXZpZXcuIEluIHBhcnRpY3VsYXIsIGl0IG11c3QgYmUgYXNzdXJlZCB0aGF0IGl0XG4gKiBpcyBvbmx5IHBhc3NlZCBzdHJpbmdzIHRoYXQgY29tZSBkaXJlY3RseSBmcm9tIGN1c3RvbSBzYW5pdGl6ZXJzIG9yIHRoZVxuICogYnlwYXNzU2VjdXJpdHlUcnVzdCogZnVuY3Rpb25zLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJ1c3RlZFNjcmlwdEZyb21TdHJpbmdCeXBhc3Moc2NyaXB0OiBzdHJpbmcpOiBUcnVzdGVkU2NyaXB0fHN0cmluZyB7XG4gIHJldHVybiBnZXRQb2xpY3koKT8uY3JlYXRlU2NyaXB0KHNjcmlwdCkgfHwgc2NyaXB0O1xufVxuXG4vKipcbiAqIFVuc2FmZWx5IHByb21vdGUgYSBzdHJpbmcgdG8gYSBUcnVzdGVkU2NyaXB0VVJMLCBmYWxsaW5nIGJhY2sgdG8gc3RyaW5nc1xuICogd2hlbiBUcnVzdGVkIFR5cGVzIGFyZSBub3QgYXZhaWxhYmxlLlxuICogQHNlY3VyaXR5IFRoaXMgaXMgYSBzZWN1cml0eS1zZW5zaXRpdmUgZnVuY3Rpb247IGFueSB1c2Ugb2YgdGhpcyBmdW5jdGlvblxuICogbXVzdCBnbyB0aHJvdWdoIHNlY3VyaXR5IHJldmlldy4gSW4gcGFydGljdWxhciwgaXQgbXVzdCBiZSBhc3N1cmVkIHRoYXQgaXRcbiAqIGlzIG9ubHkgcGFzc2VkIHN0cmluZ3MgdGhhdCBjb21lIGRpcmVjdGx5IGZyb20gY3VzdG9tIHNhbml0aXplcnMgb3IgdGhlXG4gKiBieXBhc3NTZWN1cml0eVRydXN0KiBmdW5jdGlvbnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cnVzdGVkU2NyaXB0VVJMRnJvbVN0cmluZ0J5cGFzcyh1cmw6IHN0cmluZyk6IFRydXN0ZWRTY3JpcHRVUkx8c3RyaW5nIHtcbiAgcmV0dXJuIGdldFBvbGljeSgpPy5jcmVhdGVTY3JpcHRVUkwodXJsKSB8fCB1cmw7XG59XG4iXX0=