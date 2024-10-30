/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HttpContext } from './context';
import { HttpHeaders } from './headers';
import { HttpParams } from './params';
/**
 * Determine whether the given HTTP method may include a body.
 */
function mightHaveBody(method) {
    switch (method) {
        case 'DELETE':
        case 'GET':
        case 'HEAD':
        case 'OPTIONS':
        case 'JSONP':
            return false;
        default:
            return true;
    }
}
/**
 * Safely assert whether the given value is an ArrayBuffer.
 *
 * In some execution environments ArrayBuffer is not defined.
 */
function isArrayBuffer(value) {
    return typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer;
}
/**
 * Safely assert whether the given value is a Blob.
 *
 * In some execution environments Blob is not defined.
 */
function isBlob(value) {
    return typeof Blob !== 'undefined' && value instanceof Blob;
}
/**
 * Safely assert whether the given value is a FormData instance.
 *
 * In some execution environments FormData is not defined.
 */
function isFormData(value) {
    return typeof FormData !== 'undefined' && value instanceof FormData;
}
/**
 * Safely assert whether the given value is a URLSearchParams instance.
 *
 * In some execution environments URLSearchParams is not defined.
 */
function isUrlSearchParams(value) {
    return typeof URLSearchParams !== 'undefined' && value instanceof URLSearchParams;
}
/**
 * An outgoing HTTP request with an optional typed body.
 *
 * `HttpRequest` represents an outgoing request, including URL, method,
 * headers, body, and other request configuration options. Instances should be
 * assumed to be immutable. To modify a `HttpRequest`, the `clone`
 * method should be used.
 *
 * @publicApi
 */
export class HttpRequest {
    constructor(method, url, third, fourth) {
        this.url = url;
        /**
         * The request body, or `null` if one isn't set.
         *
         * Bodies are not enforced to be immutable, as they can include a reference to any
         * user-defined data type. However, interceptors should take care to preserve
         * idempotence by treating them as such.
         */
        this.body = null;
        /**
         * Whether this request should be made in a way that exposes progress events.
         *
         * Progress events are expensive (change detection runs on each event) and so
         * they should only be requested if the consumer intends to monitor them.
         *
         * Note: The `FetchBackend` doesn't support progress report on uploads.
         */
        this.reportProgress = false;
        /**
         * Whether this request should be sent with outgoing credentials (cookies).
         */
        this.withCredentials = false;
        /**
         * The expected response type of the server.
         *
         * This is used to parse the response appropriately before returning it to
         * the requestee.
         */
        this.responseType = 'json';
        this.method = method.toUpperCase();
        // Next, need to figure out which argument holds the HttpRequestInit
        // options, if any.
        let options;
        // Check whether a body argument is expected. The only valid way to omit
        // the body argument is to use a known no-body method like GET.
        if (mightHaveBody(this.method) || !!fourth) {
            // Body is the third argument, options are the fourth.
            this.body = third !== undefined ? third : null;
            options = fourth;
        }
        else {
            // No body required, options are the third argument. The body stays null.
            options = third;
        }
        // If options have been passed, interpret them.
        if (options) {
            // Normalize reportProgress and withCredentials.
            this.reportProgress = !!options.reportProgress;
            this.withCredentials = !!options.withCredentials;
            // Override default response type of 'json' if one is provided.
            if (!!options.responseType) {
                this.responseType = options.responseType;
            }
            // Override headers if they're provided.
            if (!!options.headers) {
                this.headers = options.headers;
            }
            if (!!options.context) {
                this.context = options.context;
            }
            if (!!options.params) {
                this.params = options.params;
            }
            // We do want to assign transferCache even if it's falsy (false is valid value)
            this.transferCache = options.transferCache;
        }
        // If no headers have been passed in, construct a new HttpHeaders instance.
        this.headers ??= new HttpHeaders();
        // If no context have been passed in, construct a new HttpContext instance.
        this.context ??= new HttpContext();
        // If no parameters have been passed in, construct a new HttpUrlEncodedParams instance.
        if (!this.params) {
            this.params = new HttpParams();
            this.urlWithParams = url;
        }
        else {
            // Encode the parameters to a string in preparation for inclusion in the URL.
            const params = this.params.toString();
            if (params.length === 0) {
                // No parameters, the visible URL is just the URL given at creation time.
                this.urlWithParams = url;
            }
            else {
                // Does the URL already have query parameters? Look for '?'.
                const qIdx = url.indexOf('?');
                // There are 3 cases to handle:
                // 1) No existing parameters -> append '?' followed by params.
                // 2) '?' exists and is followed by existing query string ->
                //    append '&' followed by params.
                // 3) '?' exists at the end of the url -> append params directly.
                // This basically amounts to determining the character, if any, with
                // which to join the URL and parameters.
                const sep = qIdx === -1 ? '?' : qIdx < url.length - 1 ? '&' : '';
                this.urlWithParams = url + sep + params;
            }
        }
    }
    /**
     * Transform the free-form body into a serialized format suitable for
     * transmission to the server.
     */
    serializeBody() {
        // If no body is present, no need to serialize it.
        if (this.body === null) {
            return null;
        }
        // Check whether the body is already in a serialized form. If so,
        // it can just be returned directly.
        if (typeof this.body === 'string' ||
            isArrayBuffer(this.body) ||
            isBlob(this.body) ||
            isFormData(this.body) ||
            isUrlSearchParams(this.body)) {
            return this.body;
        }
        // Check whether the body is an instance of HttpUrlEncodedParams.
        if (this.body instanceof HttpParams) {
            return this.body.toString();
        }
        // Check whether the body is an object or array, and serialize with JSON if so.
        if (typeof this.body === 'object' ||
            typeof this.body === 'boolean' ||
            Array.isArray(this.body)) {
            return JSON.stringify(this.body);
        }
        // Fall back on toString() for everything else.
        return this.body.toString();
    }
    /**
     * Examine the body and attempt to infer an appropriate MIME type
     * for it.
     *
     * If no such type can be inferred, this method will return `null`.
     */
    detectContentTypeHeader() {
        // An empty body has no content type.
        if (this.body === null) {
            return null;
        }
        // FormData bodies rely on the browser's content type assignment.
        if (isFormData(this.body)) {
            return null;
        }
        // Blobs usually have their own content type. If it doesn't, then
        // no type can be inferred.
        if (isBlob(this.body)) {
            return this.body.type || null;
        }
        // Array buffers have unknown contents and thus no type can be inferred.
        if (isArrayBuffer(this.body)) {
            return null;
        }
        // Technically, strings could be a form of JSON data, but it's safe enough
        // to assume they're plain strings.
        if (typeof this.body === 'string') {
            return 'text/plain';
        }
        // `HttpUrlEncodedParams` has its own content-type.
        if (this.body instanceof HttpParams) {
            return 'application/x-www-form-urlencoded;charset=UTF-8';
        }
        // Arrays, objects, boolean and numbers will be encoded as JSON.
        if (typeof this.body === 'object' ||
            typeof this.body === 'number' ||
            typeof this.body === 'boolean') {
            return 'application/json';
        }
        // No type could be inferred.
        return null;
    }
    clone(update = {}) {
        // For method, url, and responseType, take the current value unless
        // it is overridden in the update hash.
        const method = update.method || this.method;
        const url = update.url || this.url;
        const responseType = update.responseType || this.responseType;
        // Carefully handle the transferCache to differentiate between
        // `false` and `undefined` in the update args.
        const transferCache = update.transferCache ?? this.transferCache;
        // The body is somewhat special - a `null` value in update.body means
        // whatever current body is present is being overridden with an empty
        // body, whereas an `undefined` value in update.body implies no
        // override.
        const body = update.body !== undefined ? update.body : this.body;
        // Carefully handle the boolean options to differentiate between
        // `false` and `undefined` in the update args.
        const withCredentials = update.withCredentials ?? this.withCredentials;
        const reportProgress = update.reportProgress ?? this.reportProgress;
        // Headers and params may be appended to if `setHeaders` or
        // `setParams` are used.
        let headers = update.headers || this.headers;
        let params = update.params || this.params;
        // Pass on context if needed
        const context = update.context ?? this.context;
        // Check whether the caller has asked to add headers.
        if (update.setHeaders !== undefined) {
            // Set every requested header.
            headers = Object.keys(update.setHeaders).reduce((headers, name) => headers.set(name, update.setHeaders[name]), headers);
        }
        // Check whether the caller has asked to set params.
        if (update.setParams) {
            // Set every requested param.
            params = Object.keys(update.setParams).reduce((params, param) => params.set(param, update.setParams[param]), params);
        }
        // Finally, construct the new HttpRequest using the pieces from above.
        return new HttpRequest(method, url, body, {
            params,
            headers,
            context,
            reportProgress,
            responseType,
            withCredentials,
            transferCache,
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbW1vbi9odHRwL3NyYy9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBaUJwQzs7R0FFRztBQUNILFNBQVMsYUFBYSxDQUFDLE1BQWM7SUFDbkMsUUFBUSxNQUFNLEVBQUUsQ0FBQztRQUNmLEtBQUssUUFBUSxDQUFDO1FBQ2QsS0FBSyxLQUFLLENBQUM7UUFDWCxLQUFLLE1BQU0sQ0FBQztRQUNaLEtBQUssU0FBUyxDQUFDO1FBQ2YsS0FBSyxPQUFPO1lBQ1YsT0FBTyxLQUFLLENBQUM7UUFDZjtZQUNFLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7QUFDSCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQVMsYUFBYSxDQUFDLEtBQVU7SUFDL0IsT0FBTyxPQUFPLFdBQVcsS0FBSyxXQUFXLElBQUksS0FBSyxZQUFZLFdBQVcsQ0FBQztBQUM1RSxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQVMsTUFBTSxDQUFDLEtBQVU7SUFDeEIsT0FBTyxPQUFPLElBQUksS0FBSyxXQUFXLElBQUksS0FBSyxZQUFZLElBQUksQ0FBQztBQUM5RCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQVMsVUFBVSxDQUFDLEtBQVU7SUFDNUIsT0FBTyxPQUFPLFFBQVEsS0FBSyxXQUFXLElBQUksS0FBSyxZQUFZLFFBQVEsQ0FBQztBQUN0RSxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQVMsaUJBQWlCLENBQUMsS0FBVTtJQUNuQyxPQUFPLE9BQU8sZUFBZSxLQUFLLFdBQVcsSUFBSSxLQUFL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Q0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SHR0cENvbnRleHR9IGZyb20gJy4vY29udGV4dCc7XG5pbXBvcnQge0h0dHBIZWFkZXJzfSBmcm9tICcuL2hlYWRlcnMnO1xuaW1wb3J0IHtIdHRwUGFyYW1zfSBmcm9tICcuL3BhcmFtcyc7XG5cbi8qKlxuICogQ29uc3RydWN0aW9uIGludGVyZmFjZSBmb3IgYEh0dHBSZXF1ZXN0YHMuXG4gKlxuICogQWxsIHZhbHVlcyBhcmUgb3B0aW9uYWwgYW5kIHdpbGwgb3ZlcnJpZGUgZGVmYXVsdCB2YWx1ZXMgaWYgcHJvdmlkZWQuXG4gKi9cbmludGVyZmFjZSBIdHRwUmVxdWVzdEluaXQge1xuICBoZWFkZXJzPzogSHR0cEhlYWRlcnM7XG4gIGNvbnRleHQ/OiBIdHRwQ29udGV4dDtcbiAgcmVwb3J0UHJvZ3Jlc3M/OiBib29sZWFuO1xuICBwYXJhbXM/OiBIdHRwUGFyYW1zO1xuICByZXNwb25zZVR5cGU/OiAnYXJyYXlidWZmZXInIHwgJ2Jsb2InIHwgJ2pzb24nIHwgJ3RleHQnO1xuICB3aXRoQ3JlZGVudGlhbHM/OiBib29sZWFuO1xuICB0cmFuc2ZlckNhY2hlPzoge2luY2x1ZGVIZWFkZXJzPzogc3RyaW5nW119IHwgYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgZ2l2ZW4gSFRUUCBtZXRob2QgbWF5IGluY2x1ZGUgYSBib2R5LlxuICovXG5mdW5jdGlvbiBtaWdodEhhdmVCb2R5KG1ldGhvZDogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHN3aXRjaCAobWV0aG9kKSB7XG4gICAgY2FzZSAnREVMRVRFJzpcbiAgICBjYXNlICdHRVQnOlxuICAgIGNhc2UgJ0hFQUQnOlxuICAgIGNhc2UgJ09QVElPTlMnOlxuICAgIGNhc2UgJ0pTT05QJzpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuLyoqXG4gKiBTYWZlbHkgYXNzZXJ0IHdoZXRoZXIgdGhlIGdpdmVuIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLlxuICpcbiAqIEluIHNvbWUgZXhlY3V0aW9uIGVudmlyb25tZW50cyBBcnJheUJ1ZmZlciBpcyBub3QgZGVmaW5lZC5cbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlcih2YWx1ZTogYW55KTogdmFsdWUgaXMgQXJyYXlCdWZmZXIge1xuICByZXR1cm4gdHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyO1xufVxuXG4vKipcbiAqIFNhZmVseSBhc3NlcnQgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBCbG9iLlxuICpcbiAqIEluIHNvbWUgZXhlY3V0aW9uIGVudmlyb25tZW50cyBCbG9iIGlzIG5vdCBkZWZpbmVkLlxuICovXG5mdW5jdGlvbiBpc0Jsb2IodmFsdWU6IGFueSk6IHZhbHVlIGlzIEJsb2Ige1xuICByZXR1cm4gdHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlIGluc3RhbmNlb2YgQmxvYjtcbn1cblxuLyoqXG4gKiBTYWZlbHkgYXNzZXJ0IHdoZXRoZXIgdGhlIGdpdmVuIHZhbHVlIGlzIGEgRm9ybURhdGEgaW5zdGFuY2UuXG4gKlxuICogSW4gc29tZSBleGVjdXRpb24gZW52aXJvbm1lbnRzIEZvcm1EYXRhIGlzIG5vdCBkZWZpbmVkLlxuICovXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBGb3JtRGF0YSB7XG4gIHJldHVybiB0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlIGluc3RhbmNlb2YgRm9ybURhdGE7XG59XG5cbi8qKlxuICogU2FmZWx5IGFzc2VydCB3aGV0aGVyIHRoZSBnaXZlbiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBpbnN0YW5jZS5cbiAqXG4gKiBJbiBzb21lIGV4ZWN1dGlvbiBlbnZpcm9ubWVudHMgVVJMU2VhcmNoUGFyYW1zIGlzIG5vdCBkZWZpbmVkLlxuICovXG5mdW5jdGlvbiBpc1VybFNlYXJjaFBhcmFtcyh2YWx1ZTogYW55KTogdmFsdWUgaXMgVVJMU2VhcmNoUGFyYW1zIHtcbiAgcmV0dXJuIHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zO1xufVxuXG4vKipcbiAqIEFuIG91dGdvaW5nIEhUVFAgcmVxdWVzdCB3aXRoIGFuIG9wdGlvbmFsIHR5cGVkIGJvZHkuXG4gKlxuICogYEh0dHBSZXF1ZXN0YCByZXByZXNlbnRzIGFuIG91dGdvaW5nIHJlcXVlc3QsIGluY2x1ZGluZyBVUkwsIG1ldGhvZCxcbiAqIGhlYWRlcnMsIGJvZHksIGFuZCBvdGhlciByZXF1ZXN0IGNvbmZpZ3VyYXRpb24gb3B0aW9ucy4gSW5zdGFuY2VzIHNob3VsZCBiZVxuICogYXNzdW1lZCB0byBiZSBpbW11dGFibGUuIFRvIG1vZGlmeSBhIGBIdHRwUmVxdWVzdGAsIHRoZSBgY2xvbmVgXG4gKiBtZXRob2Qgc2hvdWxkIGJlIHVzZWQuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY2xhc3MgSHR0cFJlcXVlc3Q8VD4ge1xuICAvKipcbiAgICogVGhlIHJlcXVlc3QgYm9keSwgb3IgYG51bGxgIGlmIG9uZSBpc24ndCBzZXQuXG4gICAqXG4gICAqIEJvZGllcyBhcmUgbm90IGVuZm9yY2VkIHRvIGJlIGltbXV0YWJsZSwgYXMgdGhleSBjYW4gaW5jbHVkZSBhIHJlZmVyZW5jZSB0byBhbnlcbiAgICogdXNlci1kZWZpbmVkIGRhdGEgdHlwZS4gSG93ZXZlciwgaW50ZXJjZXB0b3JzIHNob3VsZCB0YWtlIGNhcmUgdG8gcHJlc2VydmVcbiAgICogaWRlbXBvdGVuY2UgYnkgdHJlYXRpbmcgdGhlbSBhcyBzdWNoLlxuICAgKi9cbiAgcmVhZG9ubHkgYm9keTogVCB8IG51bGwgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBPdXRnb2luZyBoZWFkZXJzIGZvciB0aGlzIHJlcXVlc3QuXG4gICAqL1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcmVhZG9ubHkgaGVhZGVycyE6IEh0dHBIZWFkZXJzO1xuXG4gIC8qKlxuICAgKiBTaGFyZWQgYW5kIG11dGFibGUgY29udGV4dCB0aGF0IGNhbiBiZSB1c2VkIGJ5IGludGVyY2VwdG9yc1xuICAgKi9cbiAgcmVhZG9ubHkgY29udGV4dCE6IEh0dHBDb250ZXh0O1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoaXMgcmVxdWVzdCBzaG91bGQgYmUgbWFkZSBpbiBhIHdheSB0aGF0IGV4cG9zZXMgcHJvZ3Jlc3MgZXZlbnRzLlxuICAgKlxuICAgKiBQcm9ncmVzcyBldmVudHMgYXJlIGV4cGVuc2l2ZSAoY2hhbmdlIGRldGVjdGlvbiBydW5zIG9uIGVhY2ggZXZlbnQpIGFuZCBzb1xuICAgKiB0aGV5IHNob3VsZCBvbmx5IGJlIHJlcXVlc3RlZCBpZiB0aGUgY29uc3VtZXIgaW50ZW5kcyB0byBtb25pdG9yIHRoZW0uXG4gICAqXG4gICAqIE5vdGU6IFRoZSBgRmV0Y2hCYWNrZW5kYCBkb2Vzbid0IHN1cHBvcnQgcHJvZ3Jlc3MgcmVwb3J0IG9uIHVwbG9hZHMuXG4gICAqL1xuICByZWFkb25seSByZXBvcnRQcm9ncmVzczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoaXMgcmVxdWVzdCBzaG91bGQgYmUgc2VudCB3aXRoIG91dGdvaW5nIGNyZWRlbnRpYWxzIChjb29raWVzKS5cbiAgICovXG4gIHJlYWRvbmx5IHdpdGhDcmVkZW50aWFsczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBUaGUgZXhwZWN0ZWQgcmVzcG9uc2UgdHlwZSBvZiB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBUaGlzIGlzIHVzZWQgdG8gcGFyc2UgdGhlIHJlc3BvbnNlIGFwcHJvcHJpYXRlbHkgYmVmb3JlIHJldHVybmluZyBpdCB0b1xuICAgKiB0aGUgcmVxdWVzdGVlLlxuICAgKi9cbiAgcmVhZG9ubHkgcmVzcG9uc2VUeXBlOiAnYXJyYXlidWZmZXInIHwgJ2Jsb2InIHwgJ2pzb24nIHwgJ3RleHQnID0gJ2pzb24nO1xuXG4gIC8qKlxuICAgKiBUaGUgb3V0Z29pbmcgSFRUUCByZXF1ZXN0IG1ldGhvZC5cbiAgICovXG4gIHJlYWRvbmx5IG1ldGhvZDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBPdXRnb2luZyBVUkwgcGFyYW1ldGVycy5cbiAgICpcbiAgICogVG8gcGFzcyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBIVFRQIHBhcmFtZXRlcnMgaW4gdGhlIFVSTC1xdWVyeS1zdHJpbmcgZm9ybWF0LFxuICAgKiB0aGUgYEh0dHBQYXJhbXNPcHRpb25zYCcgYGZyb21TdHJpbmdgIG1heSBiZSB1c2VkLiBGb3IgZXhhbXBsZTpcbiAgICpcbiAgICogYGBgXG4gICAqIG5ldyBIdHRwUGFyYW1zKHtmcm9tU3RyaW5nOiAnYW5ndWxhcj1hd2Vzb21lJ30pXG4gICAqIGBgYFxuICAgKi9cbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHJlYWRvbmx5IHBhcmFtcyE6IEh0dHBQYXJhbXM7XG5cbiAgLyoqXG4gICAqIFRoZSBvdXRnb2luZyBVUkwgd2l0aCBhbGwgVVJMIHBhcmFtZXRlcnMgc2V0LlxuICAgKi9cbiAgcmVhZG9ubHkgdXJsV2l0aFBhcmFtczogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgSHR0cFRyYW5zZmVyQ2FjaGUgb3B0aW9uIGZvciB0aGUgcmVxdWVzdFxuICAgKi9cbiAgcmVhZG9ubHkgdHJhbnNmZXJDYWNoZT86IHtpbmNsdWRlSGVhZGVycz86IHN0cmluZ1tdfSB8IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgbWV0aG9kOiAnR0VUJyB8ICdIRUFEJyxcbiAgICB1cmw6IHN0cmluZyxcbiAgICBpbml0Pzoge1xuICAgICAgaGVhZGVycz86IEh0dHBIZWFkZXJzO1xuICAgICAgY29udGV4dD86IEh0dHBDb250ZXh0O1xuICAgICAgcmVwb3J0UHJvZ3Jlc3M/OiBib29sZWFuO1xuICAgICAgcGFyYW1zPzogSHR0cFBhcmFtcztcbiAgICAgIHJlc3BvbnNlVHlwZT86ICdhcnJheWJ1ZmZlcicgfCAnYmxvYicgfCAnanNvbicgfCAndGV4dCc7XG4gICAgICB3aXRoQ3JlZGVudGlhbHM/OiBib29sZWFuO1xuICAgICAgLyoqXG4gICAgICAgKiBUaGlzIHByb3BlcnR5IGFjY2VwdHMgZWl0aGVyIGEgYm9vbGVhbiB0byBlbmFibGUvZGlzYWJsZSB0cmFuc2ZlcnJpbmcgY2FjaGUgZm9yIGVsaWdpYmxlXG4gICAgICAgKiByZXF1ZXN0cyBwZXJmb3JtZWQgdXNpbmcgYEh0dHBDbGllbnRgLCBvciBhbiBvYmplY3QsIHdoaWNoIGFsbG93cyB0byBjb25maWd1cmUgY2FjaGVcbiAgICAgICAqIHBhcmFtZXRlcnMsIHN1Y2ggYXMgd2hpY2ggaGVhZGVycyBzaG91bGQgYmUgaW5jbHVkZWQgKG5vIGhlYWRlcnMgYXJlIGluY2x1ZGVkIGJ5IGRlZmF1bHQpLlxuICAgICAgICpcbiAgICAgICAqIFNldHRpbmcgdGhpcyBwcm9wZXJ0eSB3aWxsIG92ZXJyaWRlIHRoZSBvcHRpb25zIHBhc3NlZCB0byBgcHJvdmlkZUNsaWVudEh5ZHJhdGlvbigpYCBmb3IgdGhpc1xuICAgICAgICogcGFydGljdWxhciByZXF1ZXN0XG4gICAgICAgKi9cbiAgICAgIHRyYW5zZmVyQ2FjaGU/OiB7aW5jbHVkZUhlYWRlcnM/OiBzdHJpbmdbXX0gfCBib29sZWFuO1xuICAgIH0sXG4gICk7XG4gIGNvbnN0cnVjdG9yKFxuICAgIG1ldGhvZDogJ0RFTEVURScgfCAnSlNPTlAnIHwgJ09QVElPTlMnLFxuICAgIHVybDogc3RyaW5nLFxuICAgIGluaXQ/OiB7XG4gICAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnM7XG4gICAgICBjb250ZXh0PzogSHR0cENvbnRleHQ7XG4gICAgICByZXBvcnRQcm9ncmVzcz86IGJvb2xlYW47XG4gICAgICBwYXJhbXM/OiBIdHRwUGFyYW1zO1xuICAgICAgcmVzcG9uc2VUeXBlPzogJ2FycmF5YnVmZmVyJyB8ICdibG9iJyB8ICdqc29uJyB8ICd0ZXh0JztcbiAgICAgIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW47XG4gICAgfSxcbiAgKTtcbiAgY29uc3RydWN0b3IoXG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgYm9keTogVCB8IG51bGwsXG4gICAgaW5pdD86IHtcbiAgICAgIGhlYWRlcnM/OiBIdHRwSGVhZGVycztcbiAgICAgIGNvbnRleHQ/OiBIdHRwQ29udGV4dDtcbiAgICAgIHJlcG9ydFByb2dyZXNzPzogYm9vbGVhbjtcbiAgICAgIHBhcmFtcz86IEh0dHBQYXJhbXM7XG4gICAgICByZXNwb25zZVR5cGU/OiAnYXJyYXlidWZmZXInIHwgJ2Jsb2InIHwgJ2pzb24nIHwgJ3RleHQnO1xuICAgICAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcbiAgICAgIC8qKlxuICAgICAgICogVGhpcyBwcm9wZXJ0eSBhY2NlcHRzIGVpdGhlciBhIGJvb2xlYW4gdG8gZW5hYmxlL2Rpc2FibGUgdHJhbnNmZXJyaW5nIGNhY2hlIGZvciBlbGlnaWJsZVxuICAgICAgICogcmVxdWVzdHMgcGVyZm9ybWVkIHVzaW5nIGBIdHRwQ2xpZW50YCwgb3IgYW4gb2JqZWN0LCB3aGljaCBhbGxvd3MgdG8gY29uZmlndXJlIGNhY2hlXG4gICAgICAgKiBwYXJhbWV0ZXJzLCBzdWNoIGFzIHdoaWNoIGhlYWRlcnMgc2hvdWxkIGJlIGluY2x1ZGVkIChubyBoZWFkZXJzIGFyZSBpbmNsdWRlZCBieSBkZWZhdWx0KS5cbiAgICAgICAqXG4gICAgICAgKiBTZXR0aW5nIHRoaXMgcHJvcGVydHkgd2lsbCBvdmVycmlkZSB0aGUgb3B0aW9ucyBwYXNzZWQgdG8gYHByb3ZpZGVDbGllbnRIeWRyYXRpb24oKWAgZm9yIHRoaXNcbiAgICAgICAqIHBhcnRpY3VsYXIgcmVxdWVzdFxuICAgICAgICovXG4gICAgICB0cmFuc2ZlckNhY2hlPzoge2luY2x1ZGVIZWFkZXJzPzogc3RyaW5nW119IHwgYm9vbGVhbjtcbiAgICB9LFxuICApO1xuICBjb25zdHJ1Y3RvcihcbiAgICBtZXRob2Q6ICdQVVQnIHwgJ1BBVENIJyxcbiAgICB1cmw6IHN0cmluZyxcbiAgICBib2R5OiBUIHwgbnVsbCxcbiAgICBpbml0Pzoge1xuICAgICAgaGVhZGVycz86IEh0dHBIZWFkZXJzO1xuICAgICAgY29udGV4dD86IEh0dHBDb250ZXh0O1xuICAgICAgcmVwb3J0UHJvZ3Jlc3M/OiBib29sZWFuO1xuICAgICAgcGFyYW1zPzogSHR0cFBhcmFtcztcbiAgICAgIHJlc3BvbnNlVHlwZT86ICdhcnJheWJ1ZmZlcicgfCAnYmxvYicgfCAnanNvbicgfCAndGV4dCc7XG4gICAgICB3aXRoQ3JlZGVudGlhbHM/OiBib29sZWFuO1xuICAgIH0sXG4gICk7XG4gIGNvbnN0cnVjdG9yKFxuICAgIG1ldGhvZDogc3RyaW5nLFxuICAgIHVybDogc3RyaW5nLFxuICAgIGJvZHk6IFQgfCBudWxsLFxuICAgIGluaXQ/OiB7XG4gICAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnM7XG4gICAgICBjb250ZXh0PzogSHR0cENvbnRleHQ7XG4gICAgICByZXBvcnRQcm9ncmVzcz86IGJvb2xlYW47XG4gICAgICBwYXJhbXM/OiBIdHRwUGFyYW1zO1xuICAgICAgcmVzcG9uc2VUeXBlPzogJ2FycmF5YnVmZmVyJyB8ICdibG9iJyB8ICdqc29uJyB8ICd0ZXh0JztcbiAgICAgIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW47XG4gICAgICAvKipcbiAgICAgICAqIFRoaXMgcHJvcGVydHkgYWNjZXB0cyBlaXRoZXIgYSBib29sZWFuIHRvIGVuYWJsZS9kaXNhYmxlIHRyYW5zZmVycmluZyBjYWNoZSBmb3IgZWxpZ2libGVcbiAgICAgICAqIHJlcXVlc3RzIHBlcmZvcm1lZCB1c2luZyBgSHR0cENsaWVudGAsIG9yIGFuIG9iamVjdCwgd2hpY2ggYWxsb3dzIHRvIGNvbmZpZ3VyZSBjYWNoZVxuICAgICAgICogcGFyYW1ldGVycywgc3VjaCBhcyB3aGljaCBoZWFkZXJzIHNob3VsZCBiZSBpbmNsdWRlZCAobm8gaGVhZGVycyBhcmUgaW5jbHVkZWQgYnkgZGVmYXVsdCkuXG4gICAgICAgKlxuICAgICAgICogU2V0dGluZyB0aGlzIHByb3BlcnR5IHdpbGwgb3ZlcnJpZGUgdGhlIG9wdGlvbnMgcGFzc2VkIHRvIGBwcm92aWRlQ2xpZW50SHlkcmF0aW9uKClgIGZvciB0aGlzXG4gICAgICAgKiBwYXJ0aWN1bGFyIHJlcXVlc3RcbiAgICAgICAqL1xuICAgICAgdHJhbnNmZXJDYWNoZT86IHtpbmNsdWRlSGVhZGVycz86IHN0cmluZ1tdfSB8IGJvb2xlYW47XG4gICAgfSxcbiAgKTtcbiAgY29uc3RydWN0b3IoXG4gICAgbWV0aG9kOiBzdHJpbmcsXG4gICAgcmVhZG9ubHkgdXJsOiBzdHJpbmcsXG4gICAgdGhpcmQ/OlxuICAgICAgfCBUXG4gICAgICB8IHtcbiAgICAgICAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnM7XG4gICAgICAgICAgY29udGV4dD86IEh0dHBDb250ZXh0O1xuICAgICAgICAgIHJlcG9ydFByb2dyZXNzPzogYm9vbGVhbjtcbiAgICAgICAgICBwYXJhbXM/OiBIdHRwUGFyYW1zO1xuICAgICAgICAgIHJlc3BvbnNlVHlwZT86ICdhcnJheWJ1ZmZlcicgfCAnYmxvYicgfCAnanNvbicgfCAndGV4dCc7XG4gICAgICAgICAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcbiAgICAgICAgICB0cmFuc2ZlckNhY2hlPzoge2luY2x1ZGVIZWFkZXJzPzogc3RyaW5nW119IHwgYm9vbGVhbjtcbiAgICAgICAgfVxuICAgICAgfCBudWxsLFxuICAgIGZvdXJ0aD86IHtcbiAgICAgIGhlYWRlcnM/OiBIdHRwSGVhZGVycztcbiAgICAgIGNvbnRleHQ/OiBIdHRwQ29udGV4dDtcbiAgICAgIHJlcG9ydFByb2dyZXNzPzogYm9vbGVhbjtcbiAgICAgIHBhcmFtcz86IEh0dHBQYXJhbXM7XG4gICAgICByZXNwb25zZVR5cGU/OiAnYXJyYXlidWZmZXInIHwgJ2Jsb2InIHwgJ2pzb24nIHwgJ3RleHQnO1xuICAgICAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcbiAgICAgIHRyYW5zZmVyQ2FjaGU/OiB7aW5jbHVkZUhlYWRlcnM/OiBzdHJpbmdbXX0gfCBib29sZWFuO1xuICAgIH0sXG4gICkge1xuICAgIHRoaXMubWV0aG9kID0gbWV0aG9kLnRvVXBwZXJDYXNlKCk7XG4gICAgLy8gTmV4dCwgbmVlZCB0byBmaWd1cmUgb3V0IHdoaWNoIGFyZ3VtZW50IGhvbGRzIHRoZSBIdHRwUmVxdWVzdEluaXRcbiAgICAvLyBvcHRpb25zLCBpZiBhbnkuXG4gICAgbGV0IG9wdGlvbnM6IEh0dHBSZXF1ZXN0SW5pdCB8IHVuZGVmaW5lZDtcblxuICAgIC8vIENoZWNrIHdoZXRoZXIgYSBib2R5IGFyZ3VtZW50IGlzIGV4cGVjdGVkLiBUaGUgb25seSB2YWxpZCB3YXkgdG8gb21pdFxuICAgIC8vIHRoZSBib2R5IGFyZ3VtZW50IGlzIHRvIHVzZSBhIGtub3duIG5vLWJvZHkgbWV0aG9kIGxpa2UgR0VULlxuICAgIGlmIChtaWdodEhhdmVCb2R5KHRoaXMubWV0aG9kKSB8fCAhIWZvdXJ0aCkge1xuICAgICAgLy8gQm9keSBpcyB0aGUgdGhpcmQgYXJndW1lbnQsIG9wdGlvbnMgYXJlIHRoZSBmb3VydGguXG4gICAgICB0aGlzLmJvZHkgPSB0aGlyZCAhPT0gdW5kZWZpbmVkID8gKHRoaXJkIGFzIFQpIDogbnVsbDtcbiAgICAgIG9wdGlvbnMgPSBmb3VydGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE5vIGJvZHkgcmVxdWlyZWQsIG9wdGlvbnMgYXJlIHRoZSB0aGlyZCBhcmd1bWVudC4gVGhlIGJvZHkgc3RheXMgbnVsbC5cbiAgICAgIG9wdGlvbnMgPSB0aGlyZCBhcyBIdHRwUmVxdWVzdEluaXQ7XG4gICAgfVxuXG4gICAgLy8gSWYgb3B0aW9ucyBoYXZlIGJlZW4gcGFzc2VkLCBpbnRlcnByZXQgdGhlbS5cbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgLy8gTm9ybWFsaXplIHJlcG9ydFByb2dyZXNzIGFuZCB3aXRoQ3JlZGVudGlhbHMuXG4gICAgICB0aGlzLnJlcG9ydFByb2dyZXNzID0gISFvcHRpb25zLnJlcG9ydFByb2dyZXNzO1xuICAgICAgdGhpcy53aXRoQ3JlZGVudGlhbHMgPSAhIW9wdGlvbnMud2l0aENyZWRlbnRpYWxzO1xuXG4gICAgICAvLyBPdmVycmlkZSBkZWZhdWx0IHJlc3BvbnNlIHR5cGUgb2YgJ2pzb24nIGlmIG9uZSBpcyBwcm92aWRlZC5cbiAgICAgIGlmICghIW9wdGlvbnMucmVzcG9uc2VUeXBlKSB7XG4gICAgICAgIHRoaXMucmVzcG9uc2VUeXBlID0gb3B0aW9ucy5yZXNwb25zZVR5cGU7XG4gICAgICB9XG5cbiAgICAgIC8vIE92ZXJyaWRlIGhlYWRlcnMgaWYgdGhleSdyZSBwcm92aWRlZC5cbiAgICAgIGlmICghIW9wdGlvbnMuaGVhZGVycykge1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnM7XG4gICAgICB9XG5cbiAgICAgIGlmICghIW9wdGlvbnMuY29udGV4dCkge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBvcHRpb25zLmNvbnRleHQ7XG4gICAgICB9XG5cbiAgICAgIGlmICghIW9wdGlvbnMucGFyYW1zKSB7XG4gICAgICAgIHRoaXMucGFyYW1zID0gb3B0aW9ucy5wYXJhbXM7XG4gICAgICB9XG5cbiAgICAgIC8vIFdlIGRvIHdhbnQgdG8gYXNzaWduIHRyYW5zZmVyQ2FjaGUgZXZlbiBpZiBpdCdzIGZhbHN5IChmYWxzZSBpcyB2YWxpZCB2YWx1ZSlcbiAgICAgIHRoaXMudHJhbnNmZXJDYWNoZSA9IG9wdGlvbnMudHJhbnNmZXJDYWNoZTtcbiAgICB9XG5cbiAgICAvLyBJZiBubyBoZWFkZXJzIGhhdmUgYmVlbiBwYXNzZWQgaW4sIGNvbnN0cnVjdCBhIG5ldyBIdHRwSGVhZGVycyBpbnN0YW5jZS5cbiAgICB0aGlzLmhlYWRlcnMgPz89IG5ldyBIdHRwSGVhZGVycygpO1xuXG4gICAgLy8gSWYgbm8gY29udGV4dCBoYXZlIGJlZW4gcGFzc2VkIGluLCBjb25zdHJ1Y3QgYSBuZXcgSHR0cENvbnRleHQgaW5zdGFuY2UuXG4gICAgdGhpcy5jb250ZXh0ID8/PSBuZXcgSHR0cENvbnRleHQoKTtcblxuICAgIC8vIElmIG5vIHBhcmFtZXRlcnMgaGF2ZSBiZWVuIHBhc3NlZCBpbiwgY29uc3RydWN0IGEgbmV3IEh0dHBVcmxFbmNvZGVkUGFyYW1zIGluc3RhbmNlLlxuICAgIGlmICghdGhpcy5wYXJhbXMpIHtcbiAgICAgIHRoaXMucGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcbiAgICAgIHRoaXMudXJsV2l0aFBhcmFtcyA9IHVybDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRW5jb2RlIHRoZSBwYXJhbWV0ZXJzIHRvIGEgc3RyaW5nIGluIHByZXBhcmF0aW9uIGZvciBpbmNsdXNpb24gaW4gdGhlIFVSTC5cbiAgICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMucGFyYW1zLnRvU3RyaW5nKCk7XG4gICAgICBpZiAocGFyYW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAvLyBObyBwYXJhbWV0ZXJzLCB0aGUgdmlzaWJsZSBVUkwgaXMganVzdCB0aGUgVVJMIGdpdmVuIGF0IGNyZWF0aW9uIHRpbWUuXG4gICAgICAgIHRoaXMudXJsV2l0aFBhcmFtcyA9IHVybDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIERvZXMgdGhlIFVSTCBhbHJlYWR5IGhhdmUgcXVlcnkgcGFyYW1ldGVycz8gTG9vayBmb3IgJz8nLlxuICAgICAgICBjb25zdCBxSWR4ID0gdXJsLmluZGV4T2YoJz8nKTtcbiAgICAgICAgLy8gVGhlcmUgYXJlIDMgY2FzZXMgdG8gaGFuZGxlOlxuICAgICAgICAvLyAxKSBObyBleGlzdGluZyBwYXJhbWV0ZXJzIC0+IGFwcGVuZCAnPycgZm9sbG93ZWQgYnkgcGFyYW1zLlxuICAgICAgICAvLyAyKSAnPycgZXhpc3RzIGFuZCBpcyBmb2xsb3dlZCBieSBleGlzdGluZyBxdWVyeSBzdHJpbmcgLT5cbiAgICAgICAgLy8gICAgYXBwZW5kICcmJyBmb2xsb3dlZCBieSBwYXJhbXMuXG4gICAgICAgIC8vIDMpICc/JyBleGlzdHMgYXQgdGhlIGVuZCBvZiB0aGUgdXJsIC0+IGFwcGVuZCBwYXJhbXMgZGlyZWN0bHkuXG4gICAgICAgIC8vIFRoaXMgYmFzaWNhbGx5IGFtb3VudHMgdG8gZGV0ZXJtaW5pbmcgdGhlIGNoYXJhY3RlciwgaWYgYW55LCB3aXRoXG4gICAgICAgIC8vIHdoaWNoIHRvIGpvaW4gdGhlIFVSTCBhbmQgcGFyYW1ldGVycy5cbiAgICAgICAgY29uc3Qgc2VwOiBzdHJpbmcgPSBxSWR4ID09PSAtMSA/ICc/JyA6IHFJZHggPCB1cmwubGVuZ3RoIC0gMSA/ICcmJyA6ICcnO1xuICAgICAgICB0aGlzLnVybFdpdGhQYXJhbXMgPSB1cmwgKyBzZXAgKyBwYXJhbXM7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRyYW5zZm9ybSB0aGUgZnJlZS1mb3JtIGJvZHkgaW50byBhIHNlcmlhbGl6ZWQgZm9ybWF0IHN1aXRhYmxlIGZvclxuICAgKiB0cmFuc21pc3Npb24gdG8gdGhlIHNlcnZlci5cbiAgICovXG4gIHNlcmlhbGl6ZUJvZHkoKTogQXJyYXlCdWZmZXIgfCBCbG9iIHwgRm9ybURhdGEgfCBVUkxTZWFyY2hQYXJhbXMgfCBzdHJpbmcgfCBudWxsIHtcbiAgICAvLyBJZiBubyBib2R5IGlzIHByZXNlbnQsIG5vIG5lZWQgdG8gc2VyaWFsaXplIGl0LlxuICAgIGlmICh0aGlzLmJvZHkgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvLyBDaGVjayB3aGV0aGVyIHRoZSBib2R5IGlzIGFscmVhZHkgaW4gYSBzZXJpYWxpemVkIGZvcm0uIElmIHNvLFxuICAgIC8vIGl0IGNhbiBqdXN0IGJlIHJldHVybmVkIGRpcmVjdGx5LlxuICAgIGlmIChcbiAgICAgIHR5cGVvZiB0aGlzLmJvZHkgPT09ICdzdHJpbmcnIHx8XG4gICAgICBpc0FycmF5QnVmZmVyKHRoaXMuYm9keSkgfHxcbiAgICAgIGlzQmxvYih0aGlzLmJvZHkpIHx8XG4gICAgICBpc0Zvcm1EYXRhKHRoaXMuYm9keSkgfHxcbiAgICAgIGlzVXJsU2VhcmNoUGFyYW1zKHRoaXMuYm9keSlcbiAgICApIHtcbiAgICAgIHJldHVybiB0aGlzLmJvZHk7XG4gICAgfVxuICAgIC8vIENoZWNrIHdoZXRoZXIgdGhlIGJvZHkgaXMgYW4gaW5zdGFuY2Ugb2YgSHR0cFVybEVuY29kZWRQYXJhbXMuXG4gICAgaWYgKHRoaXMuYm9keSBpbnN0YW5jZW9mIEh0dHBQYXJhbXMpIHtcbiAgICAgIHJldHVybiB0aGlzLmJvZHkudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgLy8gQ2hlY2sgd2hldGhlciB0aGUgYm9keSBpcyBhbiBvYmplY3Qgb3IgYXJyYXksIGFuZCBzZXJpYWxpemUgd2l0aCBKU09OIGlmIHNvLlxuICAgIGlmIChcbiAgICAgIHR5cGVvZiB0aGlzLmJvZHkgPT09ICdvYmplY3QnIHx8XG4gICAgICB0eXBlb2YgdGhpcy5ib2R5ID09PSAnYm9vbGVhbicgfHxcbiAgICAgIEFycmF5LmlzQXJyYXkodGhpcy5ib2R5KVxuICAgICkge1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuYm9keSk7XG4gICAgfVxuICAgIC8vIEZhbGwgYmFjayBvbiB0b1N0cmluZygpIGZvciBldmVyeXRoaW5nIGVsc2UuXG4gICAgcmV0dXJuICh0aGlzLmJvZHkgYXMgYW55KS50b1N0cmluZygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4YW1pbmUgdGhlIGJvZHkgYW5kIGF0dGVtcHQgdG8gaW5mZXIgYW4gYXBwcm9wcmlhdGUgTUlNRSB0eXBlXG4gICAqIGZvciBpdC5cbiAgICpcbiAgICogSWYgbm8gc3VjaCB0eXBlIGNhbiBiZSBpbmZlcnJlZCwgdGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gYG51bGxgLlxuICAgKi9cbiAgZGV0ZWN0Q29udGVudFR5cGVIZWFkZXIoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgLy8gQW4gZW1wdHkgYm9keSBoYXMgbm8gY29udGVudCB0eXBlLlxuICAgIGlmICh0aGlzLmJvZHkgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvLyBGb3JtRGF0YSBib2RpZXMgcmVseSBvbiB0aGUgYnJvd3NlcidzIGNvbnRlbnQgdHlwZSBhc3NpZ25tZW50LlxuICAgIGlmIChpc0Zvcm1EYXRhKHRoaXMuYm9keSkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvLyBCbG9icyB1c3VhbGx5IGhhdmUgdGhlaXIgb3duIGNvbnRlbnQgdHlwZS4gSWYgaXQgZG9lc24ndCwgdGhlblxuICAgIC8vIG5vIHR5cGUgY2FuIGJlIGluZmVycmVkLlxuICAgIGlmIChpc0Jsb2IodGhpcy5ib2R5KSkge1xuICAgICAgcmV0dXJuIHRoaXMuYm9keS50eXBlIHx8IG51bGw7XG4gICAgfVxuICAgIC8vIEFycmF5IGJ1ZmZlcnMgaGF2ZSB1bmtub3duIGNvbnRlbnRzIGFuZCB0aHVzIG5vIHR5cGUgY2FuIGJlIGluZmVycmVkLlxuICAgIGlmIChpc0FycmF5QnVmZmVyKHRoaXMuYm9keSkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvLyBUZWNobmljYWxseSwgc3RyaW5ncyBjb3VsZCBiZSBhIGZvcm0gb2YgSlNPTiBkYXRhLCBidXQgaXQncyBzYWZlIGVub3VnaFxuICAgIC8vIHRvIGFzc3VtZSB0aGV5J3JlIHBsYWluIHN0cmluZ3MuXG4gICAgaWYgKHR5cGVvZiB0aGlzLmJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gJ3RleHQvcGxhaW4nO1xuICAgIH1cbiAgICAvLyBgSHR0cFVybEVuY29kZWRQYXJhbXNgIGhhcyBpdHMgb3duIGNvbnRlbnQtdHlwZS5cbiAgICBpZiAodGhpcy5ib2R5IGluc3RhbmNlb2YgSHR0cFBhcmFtcykge1xuICAgICAgcmV0dXJuICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD1VVEYtOCc7XG4gICAgfVxuICAgIC8vIEFycmF5cywgb2JqZWN0cywgYm9vbGVhbiBhbmQgbnVtYmVycyB3aWxsIGJlIGVuY29kZWQgYXMgSlNPTi5cbiAgICBpZiAoXG4gICAgICB0eXBlb2YgdGhpcy5ib2R5ID09PSAnb2JqZWN0JyB8fFxuICAgICAgdHlwZW9mIHRoaXMuYm9keSA9PT0gJ251bWJlcicgfHxcbiAgICAgIHR5cGVvZiB0aGlzLmJvZHkgPT09ICdib29sZWFuJ1xuICAgICkge1xuICAgICAgcmV0dXJuICdhcHBsaWNhdGlvbi9qc29uJztcbiAgICB9XG4gICAgLy8gTm8gdHlwZSBjb3VsZCBiZSBpbmZlcnJlZC5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNsb25lKCk6IEh0dHBSZXF1ZXN0PFQ+O1xuICBjbG9uZSh1cGRhdGU6IHtcbiAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnM7XG4gICAgY29udGV4dD86IEh0dHBDb250ZXh0O1xuICAgIHJlcG9ydFByb2dyZXNzPzogYm9vbGVhbjtcbiAgICBwYXJhbXM/OiBIdHRwUGFyYW1zO1xuICAgIHJlc3BvbnNlVHlwZT86ICdhcnJheWJ1ZmZlcicgfCAnYmxvYicgfCAnanNvbicgfCAndGV4dCc7XG4gICAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcbiAgICB0cmFuc2ZlckNhY2hlPzoge2luY2x1ZGVIZWFkZXJzPzogc3RyaW5nW119IHwgYm9vbGVhbjtcbiAgICBib2R5PzogVCB8IG51bGw7XG4gICAgbWV0aG9kPzogc3RyaW5nO1xuICAgIHVybD86IHN0cmluZztcbiAgICBzZXRIZWFkZXJzPzoge1tuYW1lOiBzdHJpbmddOiBzdHJpbmcgfCBzdHJpbmdbXX07XG4gICAgc2V0UGFyYW1zPzoge1twYXJhbTogc3RyaW5nXTogc3RyaW5nfTtcbiAgfSk6IEh0dHBSZXF1ZXN0PFQ+O1xuICBjbG9uZTxWPih1cGRhdGU6IHtcbiAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnM7XG4gICAgY29udGV4dD86IEh0dHBDb250ZXh0O1xuICAgIHJlcG9ydFByb2dyZXNzPzogYm9vbGVhbjtcbiAgICBwYXJhbXM/OiBIdHRwUGFyYW1zO1xuICAgIHJlc3BvbnNlVHlwZT86ICdhcnJheWJ1ZmZlcicgfCAnYmxvYicgfCAnanNvbicgfCAndGV4dCc7XG4gICAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcbiAgICB0cmFuc2ZlckNhY2hlPzoge2luY2x1ZGVIZWFkZXJzPzogc3RyaW5nW119IHwgYm9vbGVhbjtcbiAgICBib2R5PzogViB8IG51bGw7XG4gICAgbWV0aG9kPzogc3RyaW5nO1xuICAgIHVybD86IHN0cmluZztcbiAgICBzZXRIZWFkZXJzPzoge1tuYW1lOiBzdHJpbmddOiBzdHJpbmcgfCBzdHJpbmdbXX07XG4gICAgc2V0UGFyYW1zPzoge1twYXJhbTogc3RyaW5nXTogc3RyaW5nfTtcbiAgfSk6IEh0dHBSZXF1ZXN0PFY+O1xuICBjbG9uZShcbiAgICB1cGRhdGU6IHtcbiAgICAgIGhlYWRlcnM/OiBIdHRwSGVhZGVycztcbiAgICAgIGNvbnRleHQ/OiBIdHRwQ29udGV4dDtcbiAgICAgIHJlcG9ydFByb2dyZXNzPzogYm9vbGVhbjtcbiAgICAgIHBhcmFtcz86IEh0dHBQYXJhbXM7XG4gICAgICByZXNwb25zZVR5cGU/OiAnYXJyYXlidWZmZXInIHwgJ2Jsb2InIHwgJ2pzb24nIHwgJ3RleHQnO1xuICAgICAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcbiAgICAgIHRyYW5zZmVyQ2FjaGU/OiB7aW5jbHVkZUhlYWRlcnM/OiBzdHJpbmdbXX0gfCBib29sZWFuO1xuICAgICAgYm9keT86IGFueSB8IG51bGw7XG4gICAgICBtZXRob2Q/OiBzdHJpbmc7XG4gICAgICB1cmw/OiBzdHJpbmc7XG4gICAgICBzZXRIZWFkZXJzPzoge1tuYW1lOiBzdHJpbmddOiBzdHJpbmcgfCBzdHJpbmdbXX07XG4gICAgICBzZXRQYXJhbXM/OiB7W3BhcmFtOiBzdHJpbmddOiBzdHJpbmd9O1xuICAgIH0gPSB7fSxcbiAgKTogSHR0cFJlcXVlc3Q8YW55PiB7XG4gICAgLy8gRm9yIG1ldGhvZCwgdXJsLCBhbmQgcmVzcG9uc2VUeXBlLCB0YWtlIHRoZSBjdXJyZW50IHZhbHVlIHVubGVzc1xuICAgIC8vIGl0IGlzIG92ZXJyaWRkZW4gaW4gdGhlIHVwZGF0ZSBoYXNoLlxuICAgIGNvbnN0IG1ldGhvZCA9IHVwZGF0ZS5tZXRob2QgfHwgdGhpcy5tZXRob2Q7XG4gICAgY29uc3QgdXJsID0gdXBkYXRlLnVybCB8fCB0aGlzLnVybDtcbiAgICBjb25zdCByZXNwb25zZVR5cGUgPSB1cGRhdGUucmVzcG9uc2VUeXBlIHx8IHRoaXMucmVzcG9uc2VUeXBlO1xuXG4gICAgLy8gQ2FyZWZ1bGx5IGhhbmRsZSB0aGUgdHJhbnNmZXJDYWNoZSB0byBkaWZmZXJlbnRpYXRlIGJldHdlZW5cbiAgICAvLyBgZmFsc2VgIGFuZCBgdW5kZWZpbmVkYCBpbiB0aGUgdXBkYXRlIGFyZ3MuXG4gICAgY29uc3QgdHJhbnNmZXJDYWNoZSA9IHVwZGF0ZS50cmFuc2ZlckNhY2hlID8/IHRoaXMudHJhbnNmZXJDYWNoZTtcblxuICAgIC8vIFRoZSBib2R5IGlzIHNvbWV3aGF0IHNwZWNpYWwgLSBhIGBudWxsYCB2YWx1ZSBpbiB1cGRhdGUuYm9keSBtZWFuc1xuICAgIC8vIHdoYXRldmVyIGN1cnJlbnQgYm9keSBpcyBwcmVzZW50IGlzIGJlaW5nIG92ZXJyaWRkZW4gd2l0aCBhbiBlbXB0eVxuICAgIC8vIGJvZHksIHdoZXJlYXMgYW4gYHVuZGVmaW5lZGAgdmFsdWUgaW4gdXBkYXRlLmJvZHkgaW1wbGllcyBub1xuICAgIC8vIG92ZXJyaWRlLlxuICAgIGNvbnN0IGJvZHkgPSB1cGRhdGUuYm9keSAhPT0gdW5kZWZpbmVkID8gdXBkYXRlLmJvZHkgOiB0aGlzLmJvZHk7XG5cbiAgICAvLyBDYXJlZnVsbHkgaGFuZGxlIHRoZSBib29sZWFuIG9wdGlvbnMgdG8gZGlmZmVyZW50aWF0ZSBiZXR3ZWVuXG4gICAgLy8gYGZhbHNlYCBhbmQgYHVuZGVmaW5lZGAgaW4gdGhlIHVwZGF0ZSBhcmdzLlxuICAgIGNvbnN0IHdpdGhDcmVkZW50aWFscyA9IHVwZGF0ZS53aXRoQ3JlZGVudGlhbHMgPz8gdGhpcy53aXRoQ3JlZGVudGlhbHM7XG4gICAgY29uc3QgcmVwb3J0UHJvZ3Jlc3MgPSB1cGRhdGUucmVwb3J0UHJvZ3Jlc3MgPz8gdGhpcy5yZXBvcnRQcm9ncmVzcztcblxuICAgIC8vIEhlYWRlcnMgYW5kIHBhcmFtcyBtYXkgYmUgYXBwZW5kZWQgdG8gaWYgYHNldEhlYWRlcnNgIG9yXG4gICAgLy8gYHNldFBhcmFtc2AgYXJlIHVzZWQuXG4gICAgbGV0IGhlYWRlcnMgPSB1cGRhdGUuaGVhZGVycyB8fCB0aGlzLmhlYWRlcnM7XG4gICAgbGV0IHBhcmFtcyA9IHVwZGF0ZS5wYXJhbXMgfHwgdGhpcy5wYXJhbXM7XG5cbiAgICAvLyBQYXNzIG9uIGNvbnRleHQgaWYgbmVlZGVkXG4gICAgY29uc3QgY29udGV4dCA9IHVwZGF0ZS5jb250ZXh0ID8/IHRoaXMuY29udGV4dDtcblxuICAgIC8vIENoZWNrIHdoZXRoZXIgdGhlIGNhbGxlciBoYXMgYXNrZWQgdG8gYWRkIGhlYWRlcnMuXG4gICAgaWYgKHVwZGF0ZS5zZXRIZWFkZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIFNldCBldmVyeSByZXF1ZXN0ZWQgaGVhZGVyLlxuICAgICAgaGVhZGVycyA9IE9iamVjdC5rZXlzKHVwZGF0ZS5zZXRIZWFkZXJzKS5yZWR1Y2UoXG4gICAgICAgIChoZWFkZXJzLCBuYW1lKSA9PiBoZWFkZXJzLnNldChuYW1lLCB1cGRhdGUuc2V0SGVhZGVycyFbbmFtZV0pLFxuICAgICAgICBoZWFkZXJzLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayB3aGV0aGVyIHRoZSBjYWxsZXIgaGFzIGFza2VkIHRvIHNldCBwYXJhbXMuXG4gICAgaWYgKHVwZGF0ZS5zZXRQYXJhbXMpIHtcbiAgICAgIC8vIFNldCBldmVyeSByZXF1ZXN0ZWQgcGFyYW0uXG4gICAgICBwYXJhbXMgPSBPYmplY3Qua2V5cyh1cGRhdGUuc2V0UGFyYW1zKS5yZWR1Y2UoXG4gICAgICAgIChwYXJhbXMsIHBhcmFtKSA9PiBwYXJhbXMuc2V0KHBhcmFtLCB1cGRhdGUuc2V0UGFyYW1zIVtwYXJhbV0pLFxuICAgICAgICBwYXJhbXMsXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIEZpbmFsbHksIGNvbnN0cnVjdCB0aGUgbmV3IEh0dHBSZXF1ZXN0IHVzaW5nIHRoZSBwaWVjZXMgZnJvbSBhYm92ZS5cbiAgICByZXR1cm4gbmV3IEh0dHBSZXF1ZXN0KG1ldGhvZCwgdXJsLCBib2R5LCB7XG4gICAgICBwYXJhbXMsXG4gICAgICBoZWFkZXJzLFxuICAgICAgY29udGV4dCxcbiAgICAgIHJlcG9ydFByb2dyZXNzLFxuICAgICAgcmVzcG9uc2VUeXBlLFxuICAgICAgd2l0aENyZWRlbnRpYWxzLFxuICAgICAgdHJhbnNmZXJDYWNoZSxcbiAgICB9KTtcbiAgfVxufVxuIl19