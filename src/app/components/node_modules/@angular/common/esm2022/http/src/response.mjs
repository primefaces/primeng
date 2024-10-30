/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HttpHeaders } from './headers';
/**
 * Type enumeration for the different kinds of `HttpEvent`.
 *
 * @publicApi
 */
export var HttpEventType;
(function (HttpEventType) {
    /**
     * The request was sent out over the wire.
     */
    HttpEventType[HttpEventType["Sent"] = 0] = "Sent";
    /**
     * An upload progress event was received.
     *
     * Note: The `FetchBackend` doesn't support progress report on uploads.
     */
    HttpEventType[HttpEventType["UploadProgress"] = 1] = "UploadProgress";
    /**
     * The response status code and headers were received.
     */
    HttpEventType[HttpEventType["ResponseHeader"] = 2] = "ResponseHeader";
    /**
     * A download progress event was received.
     */
    HttpEventType[HttpEventType["DownloadProgress"] = 3] = "DownloadProgress";
    /**
     * The full response including the body was received.
     */
    HttpEventType[HttpEventType["Response"] = 4] = "Response";
    /**
     * A custom event from an interceptor or a backend.
     */
    HttpEventType[HttpEventType["User"] = 5] = "User";
})(HttpEventType || (HttpEventType = {}));
/**
 * Base class for both `HttpResponse` and `HttpHeaderResponse`.
 *
 * @publicApi
 */
export class HttpResponseBase {
    /**
     * Super-constructor for all responses.
     *
     * The single parameter accepted is an initialization hash. Any properties
     * of the response passed there will override the default values.
     */
    constructor(init, defaultStatus = HttpStatusCode.Ok, defaultStatusText = 'OK') {
        // If the hash has values passed, use them to initialize the response.
        // Otherwise use the default values.
        this.headers = init.headers || new HttpHeaders();
        this.status = init.status !== undefined ? init.status : defaultStatus;
        this.statusText = init.statusText || defaultStatusText;
        this.url = init.url || null;
        // Cache the ok value to avoid defining a getter.
        this.ok = this.status >= 200 && this.status < 300;
    }
}
/**
 * A partial HTTP response which only includes the status and header data,
 * but no response body.
 *
 * `HttpHeaderResponse` is a `HttpEvent` available on the response
 * event stream, only when progress events are requested.
 *
 * @publicApi
 */
export class HttpHeaderResponse extends HttpResponseBase {
    /**
     * Create a new `HttpHeaderResponse` with the given parameters.
     */
    constructor(init = {}) {
        super(init);
        this.type = HttpEventType.ResponseHeader;
    }
    /**
     * Copy this `HttpHeaderResponse`, overriding its contents with the
     * given parameter hash.
     */
    clone(update = {}) {
        // Perform a straightforward initialization of the new HttpHeaderResponse,
        // overriding the current parameters with new ones if given.
        return new HttpHeaderResponse({
            headers: update.headers || this.headers,
            status: update.status !== undefined ? update.status : this.status,
            statusText: update.statusText || this.statusText,
            url: update.url || this.url || undefined,
        });
    }
}
/**
 * A full HTTP response, including a typed response body (which may be `null`
 * if one was not returned).
 *
 * `HttpResponse` is a `HttpEvent` available on the response event
 * stream.
 *
 * @publicApi
 */
export class HttpResponse extends HttpResponseBase {
    /**
     * Construct a new `HttpResponse`.
     */
    constructor(init = {}) {
        super(init);
        this.type = HttpEventType.Response;
        this.body = init.body !== undefined ? init.body : null;
    }
    clone(update = {}) {
        return new HttpResponse({
            body: update.body !== undefined ? update.body : this.body,
            headers: update.headers || this.headers,
            status: update.status !== undefined ? update.status : this.status,
            statusText: update.statusText || this.statusText,
            url: update.url || this.url || undefined,
        });
    }
}
/**
 * A response that represents an error or failure, either from a
 * non-successful HTTP status, an error while executing the request,
 * or some other failure which occurred during the parsing of the response.
 *
 * Any error returned on the `Observable` response stream will be
 * wrapped in an `HttpErrorResponse` to provide additional context about
 * the state of the HTTP layer when the error occurred. The error property
 * will contain either a wrapped Error object or the error response returned
 * from the server.
 *
 * @publicApi
 */
export class HttpErrorResponse extends HttpResponseBase {
    constructor(init) {
        // Initialize with a default status of 0 / Unknown Error.
        super(init, 0, 'Unknown Error');
        this.name = 'HttpErrorResponse';
        /**
         * Errors are never okay, even when the status code is in the 2xx success range.
         */
        this.ok = false;
        // If the response was successful, then this was a parse error. Otherwise, it was
        // a protocol-level failure of some sort. Either the request failed in transit
        // or the server returned an unsuccessful status code.
        if (this.status >= 200 && this.status < 300) {
            this.message = `Http failure during parsing for ${init.url || '(unknown url)'}`;
        }
        else {
            this.message = `Http failure response for ${init.url || '(unknown url)'}: ${init.status} ${init.statusText}`;
        }
        this.error = init.error || null;
    }
}
/**
 * Http status codes.
 * As per https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
 * @publicApi
 */
export var HttpStatusCode;
(function (HttpStatusCode) {
    HttpStatusCode[HttpStatusCode["Continue"] = 100] = "Continue";
    HttpStatusCode[HttpStatusCode["SwitchingProtocols"] = 101] = "SwitchingProtocols";
    HttpStatusCode[HttpStatusCode["Processing"] = 102] = "Processing";
    HttpStatusCode[HttpStatusCode["EarlyHints"] = 103] = "EarlyHints";
    HttpStatusCode[HttpStatusCode["Ok"] = 200] = "Ok";
    HttpStatusCode[HttpStatusCode["Created"] = 201] = "Created";
    HttpStatusCode[HttpStatusCode["Accepted"] = 202] = "Accepted";
    HttpStatusCode[HttpStatusCode["NonAuthoritativeInformation"] = 203] = "NonAuthoritativeInformation";
    HttpStatusCode[HttpStatusCode["NoContent"] = 204] = "NoContent";
    HttpStatusCode[HttpStatusCode["ResetContent"] = 205] = "ResetContent";
    HttpStatusCode[HttpStatusCode["PartialContent"] = 206] = "PartialContent";
    HttpStatusCode[HttpStatusCode["MultiStatus"] = 207] = "MultiStatus";
    HttpStatusCode[HttpStatusCode["AlreadyReported"] = 208] = "AlreadyReported";
    HttpStatusCode[HttpStatusCode["ImUsed"] = 226] = "ImUsed";
    HttpStatusCode[HttpStatusCode["MultipleChoices"] = 300] = "MultipleChoices";
    HttpStatusCode[HttpStatusCode["MovedPermanently"] = 301] = "MovedPermanently";
    HttpStatusCode[HttpStatusCode["Found"] = 302] = "Found";
    HttpStatusCode[HttpStatusCode["SeeOther"] = 303] = "SeeOther";
    HttpStatusCode[HttpStatusCode["NotModified"] = 304] = "NotModified";
    HttpStatusCode[HttpStatusCode["UseProxy"] = 305] = "UseProxy";
    HttpStatusCode[HttpStatusCode["Unused"] = 306] = "Unused";
    HttpStatusCode[HttpStatusCode["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpStatusCode[HttpStatusCode["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpStatusCode[HttpStatusCode["BadRequest"] = 400] = "BadRequest";
    HttpStatusCode[HttpStatusCode["Unauthorized"] = 401] = "Unauthorized";
    HttpStatusCode[HttpStatusCode["PaymentRequired"] = 402] = "PaymentRequired";
    HttpStatusCode[HttpStatusCode["Forbidden"] = 403] = "Forbidden";
    HttpStatusCode[HttpStatusCode["NotFound"] = 404] = "NotFound";
    HttpStatusCode[HttpStatusCode["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpStatusCode[HttpStatusCode["NotAcceptable"] = 406] = "NotAcceptable";
    HttpStatusCode[HttpStatusCode["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpStatusCode[HttpStatusCode["RequestTimeout"] = 408] = "RequestTimeout";
    HttpStatusCode[HttpStatusCode["Conflict"] = 409] = "Conflict";
    HttpStatusCode[HttpStatusCode["Gone"] = 410] = "Gone";
    HttpStatusCode[HttpStatusCode["LengthRequired"] = 411] = "LengthRequired";
    HttpStatusCode[HttpStatusCode["PreconditionFailed"] = 412] = "PreconditionFailed";
    HttpStatusCode[HttpStatusCode["PayloadTooLarge"] = 413] = "PayloadTooLarge";
    HttpStatusCode[HttpStatusCode["UriTooLong"] = 414] = "UriTooLong";
    HttpStatusCode[HttpStatusCode["UnsupportedMediaType"] = 415] = "UnsupportedMediaType";
    HttpStatusCode[HttpStatusCode["RangeNotSatisfiable"] = 416] = "RangeNotSatisfiable";
    HttpStatusCode[HttpStatusCode["ExpectationFailed"] = 417] = "ExpectationFailed";
    HttpStatusCode[HttpStatusCode["ImATeapot"] = 418] = "ImATeapot";
    HttpStatusCode[HttpStatusCode["MisdirectedRequest"] = 421] = "MisdirectedRequest";
    HttpStatusCode[HttpStatusCode["UnprocessableEntity"] = 422] = "UnprocessableEntity";
    HttpStatusCode[HttpStatusCode["Locked"] = 423] = "Locked";
    HttpStatusCode[HttpStatusCode["FailedDependency"] = 424] = "FailedDependency";
    HttpStatusCode[HttpStatusCode["TooEarly"] = 425] = "TooEarly";
    HttpStatusCode[HttpStatusCode["UpgradeRequired"] = 426] = "UpgradeRequired";
    HttpStatusCode[HttpStatusCode["PreconditionRequired"] = 428] = "PreconditionRequired";
    HttpStatusCode[HttpStatusCode["TooManyRequests"] = 429] = "TooManyRequests";
    HttpStatusCode[HttpStatusCode["RequestHeaderFieldsTooLarge"] = 431] = "RequestHeaderFieldsTooLarge";
    HttpStatusCode[HttpStatusCode["UnavailableForLegalReasons"] = 451] = "UnavailableForLegalReasons";
    HttpStatusCode[HttpStatusCode["InternalServerError"] = 500] = "InternalServerError";
    HttpStatusCode[HttpStatusCode["NotImplemented"] = 501] = "NotImplemented";
    HttpStatusCode[HttpStatusCode["BadGateway"] = 502] = "BadGateway";
    HttpStatusCode[HttpStatusCode["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpStatusCode[HttpStatusCode["GatewayTimeout"] = 504] = "GatewayTimeout";
    HttpStatusCode[HttpStatusCode["HttpVersionNotSupported"] = 505] = "HttpVersionNotSupported";
    HttpStatusCode[HttpStatusCode["VariantAlsoNegotiates"] = 506] = "VariantAlsoNegotiates";
    HttpStatusCode[HttpStatusCode["InsufficientStorage"] = 507] = "InsufficientStorage";
    HttpStatusCode[HttpStatusCode["LoopDetected"] = 508] = "LoopDetected";
    HttpStatusCode[HttpStatusCode["NotExtended"] = 510] = "NotExtended";
    HttpStatusCode[HttpStatusCode["NetworkAuthenticationRequired"] = 511] = "NetworkAuthenticationRequired";
})(HttpStatusCode || (HttpStatusCode = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vaHR0cC9zcmMvcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUV0Qzs7OztHQUlHO0FBQ0gsTUFBTSxDQUFOLElBQVksYUFnQ1g7QUFoQ0QsV0FBWSxhQUFhO0lBQ3ZCOztPQUVHO0lBQ0gsaURBQUksQ0FBQTtJQUVKOzs7O09BSUc7SUFDSCxxRUFBYyxDQUFBO0lBRWQ7O09BRUc7SUFDSCxxRUFBYyxDQUFBO0lBRWQ7O09BRUc7SUFDSCx5RUFBZ0IsQ0FBQTtJQUVoQjs7T0FFRztJQUNILHlEQUFRLENBQUE7SUFFUjs7T0FFRztJQUNILGlEQUFJLENBQUE7QUFDTixDQUFDLEVBaENXLGFBQWEsS0FBYixhQUFhLFFBZ0N4QjtBQXNHRDs7OztHQUlHO0FBQ0gsTUFBTSxPQUFnQixnQkFBZ0I7SUFrQ3BDOzs7OztPQUtHO0lBQ0gsWUFDRSxJQUtDLEVBQ0QsZ0JBQXdCLGNBQWMsQ0FBQyxFQUFFLEVBQ3pDLG9CQUE0QixJQUFJO1FBRWhDLHNFQUFzRTtRQUN0RSxvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7UUFDakQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO1FBQ3RFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxpQkFBaUIsQ0FBQztRQUN2RCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDO1FBRTVCLGlEQUFpRDtR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SUFDekIsK0VBQXVCLENBQUE7SUFDdkIsK0RBQWUsQ0FBQTtJQUNmLGlGQUF3QixDQUFBO0lBQ3hCLG1GQUF5QixDQUFBO0lBQ3pCLHlEQUFZLENBQUE7SUFDWiw2RUFBc0IsQ0FBQTtJQUN0Qiw2REFBYyxDQUFBO0lBQ2QsMkVBQXFCLENBQUE7SUFDckIscUZBQTBCLENBQUE7SUFDMUIsMkVBQXFCLENBQUE7SUFDckIsbUdBQWlDLENBQUE7SUFDakMsaUdBQWdDLENBQUE7SUFFaEMsbUZBQXlCLENBQUE7SUFDekIseUVBQW9CLENBQUE7SUFDcEIsaUVBQWdCLENBQUE7SUFDaEIsaUZBQXdCLENBQUE7SUFDeEIseUVBQW9CLENBQUE7SUFDcEIsMkZBQTZCLENBQUE7SUFDN0IsdUZBQTJCLENBQUE7SUFDM0IsbUZBQXlCLENBQUE7SUFDekIscUVBQWtCLENBQUE7SUFDbEIsbUVBQWlCLENBQUE7SUFDakIsdUdBQW1DLENBQUE7QUFDckMsQ0FBQyxFQXBFVyxjQUFjLEtBQWQsY0FBYyxRQW9FekIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtIdHRwSGVhZGVyc30gZnJvbSAnLi9oZWFkZXJzJztcblxuLyoqXG4gKiBUeXBlIGVudW1lcmF0aW9uIGZvciB0aGUgZGlmZmVyZW50IGtpbmRzIG9mIGBIdHRwRXZlbnRgLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGVudW0gSHR0cEV2ZW50VHlwZSB7XG4gIC8qKlxuICAgKiBUaGUgcmVxdWVzdCB3YXMgc2VudCBvdXQgb3ZlciB0aGUgd2lyZS5cbiAgICovXG4gIFNlbnQsXG5cbiAgLyoqXG4gICAqIEFuIHVwbG9hZCBwcm9ncmVzcyBldmVudCB3YXMgcmVjZWl2ZWQuXG4gICAqXG4gICAqIE5vdGU6IFRoZSBgRmV0Y2hCYWNrZW5kYCBkb2Vzbid0IHN1cHBvcnQgcHJvZ3Jlc3MgcmVwb3J0IG9uIHVwbG9hZHMuXG4gICAqL1xuICBVcGxvYWRQcm9ncmVzcyxcblxuICAvKipcbiAgICogVGhlIHJlc3BvbnNlIHN0YXR1cyBjb2RlIGFuZCBoZWFkZXJzIHdlcmUgcmVjZWl2ZWQuXG4gICAqL1xuICBSZXNwb25zZUhlYWRlcixcblxuICAvKipcbiAgICogQSBkb3dubG9hZCBwcm9ncmVzcyBldmVudCB3YXMgcmVjZWl2ZWQuXG4gICAqL1xuICBEb3dubG9hZFByb2dyZXNzLFxuXG4gIC8qKlxuICAgKiBUaGUgZnVsbCByZXNwb25zZSBpbmNsdWRpbmcgdGhlIGJvZHkgd2FzIHJlY2VpdmVkLlxuICAgKi9cbiAgUmVzcG9uc2UsXG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIGV2ZW50IGZyb20gYW4gaW50ZXJjZXB0b3Igb3IgYSBiYWNrZW5kLlxuICAgKi9cbiAgVXNlcixcbn1cblxuLyoqXG4gKiBCYXNlIGludGVyZmFjZSBmb3IgcHJvZ3Jlc3MgZXZlbnRzLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBIdHRwUHJvZ3Jlc3NFdmVudCB7XG4gIC8qKlxuICAgKiBQcm9ncmVzcyBldmVudCB0eXBlIGlzIGVpdGhlciB1cGxvYWQgb3IgZG93bmxvYWQuXG4gICAqL1xuICB0eXBlOiBIdHRwRXZlbnRUeXBlLkRvd25sb2FkUHJvZ3Jlc3MgfCBIdHRwRXZlbnRUeXBlLlVwbG9hZFByb2dyZXNzO1xuXG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgYnl0ZXMgdXBsb2FkZWQgb3IgZG93bmxvYWRlZC5cbiAgICovXG4gIGxvYWRlZDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUb3RhbCBudW1iZXIgb2YgYnl0ZXMgdG8gdXBsb2FkIG9yIGRvd25sb2FkLiBEZXBlbmRpbmcgb24gdGhlIHJlcXVlc3Qgb3JcbiAgICogcmVzcG9uc2UsIHRoaXMgbWF5IG5vdCBiZSBjb21wdXRhYmxlIGFuZCB0aHVzIG1heSBub3QgYmUgcHJlc2VudC5cbiAgICovXG4gIHRvdGFsPzogbnVtYmVyO1xufVxuXG4vKipcbiAqIEEgZG93bmxvYWQgcHJvZ3Jlc3MgZXZlbnQuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEh0dHBEb3dubG9hZFByb2dyZXNzRXZlbnQgZXh0ZW5kcyBIdHRwUHJvZ3Jlc3NFdmVudCB7XG4gIHR5cGU6IEh0dHBFdmVudFR5cGUuRG93bmxvYWRQcm9ncmVzcztcblxuICAvKipcbiAgICogVGhlIHBhcnRpYWwgcmVzcG9uc2UgYm9keSBhcyBkb3dubG9hZGVkIHNvIGZhci5cbiAgICpcbiAgICogT25seSBwcmVzZW50IGlmIHRoZSByZXNwb25zZVR5cGUgd2FzIGB0ZXh0YC5cbiAgICovXG4gIHBhcnRpYWxUZXh0Pzogc3RyaW5nO1xufVxuXG4vKipcbiAqIEFuIHVwbG9hZCBwcm9ncmVzcyBldmVudC5cbiAqXG4gKiBOb3RlOiBUaGUgYEZldGNoQmFja2VuZGAgZG9lc24ndCBzdXBwb3J0IHByb2dyZXNzIHJlcG9ydCBvbiB1cGxvYWRzLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBIdHRwVXBsb2FkUHJvZ3Jlc3NFdmVudCBleHRlbmRzIEh0dHBQcm9ncmVzc0V2ZW50IHtcbiAgdHlwZTogSHR0cEV2ZW50VHlwZS5VcGxvYWRQcm9ncmVzcztcbn1cblxuLyoqXG4gKiBBbiBldmVudCBpbmRpY2F0aW5nIHRoYXQgdGhlIHJlcXVlc3Qgd2FzIHNlbnQgdG8gdGhlIHNlcnZlci4gVXNlZnVsXG4gKiB3aGVuIGEgcmVxdWVzdCBtYXkgYmUgcmV0cmllZCBtdWx0aXBsZSB0aW1lcywgdG8gZGlzdGluZ3Vpc2ggYmV0d2VlblxuICogcmV0cmllcyBvbiB0aGUgZmluYWwgZXZlbnQgc3RyZWFtLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBIdHRwU2VudEV2ZW50IHtcbiAgdHlwZTogSHR0cEV2ZW50VHlwZS5TZW50O1xufVxuXG4vKipcbiAqIEEgdXNlci1kZWZpbmVkIGV2ZW50LlxuICpcbiAqIEdyb3VwaW5nIGFsbCBjdXN0b20gZXZlbnRzIHVuZGVyIHRoaXMgdHlwZSBlbnN1cmVzIHRoZXkgd2lsbCBiZSBoYW5kbGVkXG4gKiBhbmQgZm9yd2FyZGVkIGJ5IGFsbCBpbXBsZW1lbnRhdGlvbnMgb2YgaW50ZXJjZXB0b3JzLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBIdHRwVXNlckV2ZW50PFQ+IHtcbiAgdHlwZTogSHR0cEV2ZW50VHlwZS5Vc2VyO1xufVxuXG4vKipcbiAqIEFuIGVycm9yIHRoYXQgcmVwcmVzZW50cyBhIGZhaWxlZCBhdHRlbXB0IHRvIEpTT04ucGFyc2UgdGV4dCBjb21pbmcgYmFja1xuICogZnJvbSB0aGUgc2VydmVyLlxuICpcbiAqIEl0IGJ1bmRsZXMgdGhlIEVycm9yIG9iamVjdCB3aXRoIHRoZSBhY3R1YWwgcmVzcG9uc2UgYm9keSB0aGF0IGZhaWxlZCB0byBwYXJzZS5cbiAqXG4gKlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEh0dHBKc29uUGFyc2VFcnJvciB7XG4gIGVycm9yOiBFcnJvcjtcbiAgdGV4dDogc3RyaW5nO1xufVxuXG4vKipcbiAqIFVuaW9uIHR5cGUgZm9yIGFsbCBwb3NzaWJsZSBldmVudHMgb24gdGhlIHJlc3BvbnNlIHN0cmVhbS5cbiAqXG4gKiBUeXBlZCBhY2NvcmRpbmcgdG8gdGhlIGV4cGVjdGVkIHR5cGUgb2YgdGhlIHJlc3BvbnNlLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IHR5cGUgSHR0cEV2ZW50PFQ+ID1cbiAgfCBIdHRwU2VudEV2ZW50XG4gIHwgSHR0cEhlYWRlclJlc3BvbnNlXG4gIHwgSHR0cFJlc3BvbnNlPFQ+XG4gIHwgSHR0cFByb2dyZXNzRXZlbnRcbiAgfCBIdHRwVXNlckV2ZW50PFQ+O1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIGJvdGggYEh0dHBSZXNwb25zZWAgYW5kIGBIdHRwSGVhZGVyUmVzcG9uc2VgLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEh0dHBSZXNwb25zZUJhc2Uge1xuICAvKipcbiAgICogQWxsIHJlc3BvbnNlIGhlYWRlcnMuXG4gICAqL1xuICByZWFkb25seSBoZWFkZXJzOiBIdHRwSGVhZGVycztcblxuICAvKipcbiAgICogUmVzcG9uc2Ugc3RhdHVzIGNvZGUuXG4gICAqL1xuICByZWFkb25seSBzdGF0dXM6IG51bWJlcjtcblxuICAvKipcbiAgICogVGV4dHVhbCBkZXNjcmlwdGlvbiBvZiByZXNwb25zZSBzdGF0dXMgY29kZSwgZGVmYXVsdHMgdG8gT0suXG4gICAqXG4gICAqIERvIG5vdCBkZXBlbmQgb24gdGhpcy5cbiAgICovXG4gIHJlYWRvbmx5IHN0YXR1c1RleHQ6IHN0cmluZztcblxuICAvKipcbiAgICogVVJMIG9mIHRoZSByZXNvdXJjZSByZXRyaWV2ZWQsIG9yIG51bGwgaWYgbm90IGF2YWlsYWJsZS5cbiAgICovXG4gIHJlYWRvbmx5IHVybDogc3RyaW5nIHwgbnVsbDtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgc3RhdHVzIGNvZGUgZmFsbHMgaW4gdGhlIDJ4eCByYW5nZS5cbiAgICovXG4gIHJlYWRvbmx5IG9rOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUeXBlIG9mIHRoZSByZXNwb25zZSwgbmFycm93ZWQgdG8gZWl0aGVyIHRoZSBmdWxsIHJlc3BvbnNlIG9yIHRoZSBoZWFkZXIuXG4gICAqL1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcmVhZG9ubHkgdHlwZSE6IEh0dHBFdmVudFR5cGUuUmVzcG9uc2UgfCBIdHRwRXZlbnRUeXBlLlJlc3BvbnNlSGVhZGVyO1xuXG4gIC8qKlxuICAgKiBTdXBlci1jb25zdHJ1Y3RvciBmb3IgYWxsIHJlc3BvbnNlcy5cbiAgICpcbiAgICogVGhlIHNpbmdsZSBwYXJhbWV0ZXIgYWNjZXB0ZWQgaXMgYW4gaW5pdGlhbGl6YXRpb24gaGFzaC4gQW55IHByb3BlcnRpZXNcbiAgICogb2YgdGhlIHJlc3BvbnNlIHBhc3NlZCB0aGVyZSB3aWxsIG92ZXJyaWRlIHRoZSBkZWZhdWx0IHZhbHVlcy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIGluaXQ6IHtcbiAgICAgIGhlYWRlcnM/OiBIdHRwSGVhZGVycztcbiAgICAgIHN0YXR1cz86IG51bWJlcjtcbiAgICAgIHN0YXR1c1RleHQ/OiBzdHJpbmc7XG4gICAgICB1cmw/OiBzdHJpbmc7XG4gICAgfSxcbiAgICBkZWZhdWx0U3RhdHVzOiBudW1iZXIgPSBIdHRwU3RhdHVzQ29kZS5PayxcbiAgICBkZWZhdWx0U3RhdHVzVGV4dDogc3RyaW5nID0gJ09LJyxcbiAgKSB7XG4gICAgLy8gSWYgdGhlIGhhc2ggaGFzIHZhbHVlcyBwYXNzZWQsIHVzZSB0aGVtIHRvIGluaXRpYWxpemUgdGhlIHJlc3BvbnNlLlxuICAgIC8vIE90aGVyd2lzZSB1c2UgdGhlIGRlZmF1bHQgdmFsdWVzLlxuICAgIHRoaXMuaGVhZGVycyA9IGluaXQuaGVhZGVycyB8fCBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICB0aGlzLnN0YXR1cyA9IGluaXQuc3RhdHVzICE9PSB1bmRlZmluZWQgPyBpbml0LnN0YXR1cyA6IGRlZmF1bHRTdGF0dXM7XG4gICAgdGhpcy5zdGF0dXNUZXh0ID0gaW5pdC5zdGF0dXNUZXh0IHx8IGRlZmF1bHRTdGF0dXNUZXh0O1xuICAgIHRoaXMudXJsID0gaW5pdC51cmwgfHwgbnVsbDtcblxuICAgIC8vIENhY2hlIHRoZSBvayB2YWx1ZSB0byBhdm9pZCBkZWZpbmluZyBhIGdldHRlci5cbiAgICB0aGlzLm9rID0gdGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwO1xuICB9XG59XG5cbi8qKlxuICogQSBwYXJ0aWFsIEhUVFAgcmVzcG9uc2Ugd2hpY2ggb25seSBpbmNsdWRlcyB0aGUgc3RhdHVzIGFuZCBoZWFkZXIgZGF0YSxcbiAqIGJ1dCBubyByZXNwb25zZSBib2R5LlxuICpcbiAqIGBIdHRwSGVhZGVyUmVzcG9uc2VgIGlzIGEgYEh0dHBFdmVudGAgYXZhaWxhYmxlIG9uIHRoZSByZXNwb25zZVxuICogZXZlbnQgc3RyZWFtLCBvbmx5IHdoZW4gcHJvZ3Jlc3MgZXZlbnRzIGFyZSByZXF1ZXN0ZWQuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY2xhc3MgSHR0cEhlYWRlclJlc3BvbnNlIGV4dGVuZHMgSHR0cFJlc3BvbnNlQmFzZSB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgYEh0dHBIZWFkZXJSZXNwb25zZWAgd2l0aCB0aGUgZ2l2ZW4gcGFyYW1ldGVycy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIGluaXQ6IHtcbiAgICAgIGhlYWRlcnM/OiBIdHRwSGVhZGVycztcbiAgICAgIHN0YXR1cz86IG51bWJlcjtcbiAgICAgIHN0YXR1c1RleHQ/OiBzdHJpbmc7XG4gICAgICB1cmw/OiBzdHJpbmc7XG4gICAgfSA9IHt9LFxuICApIHtcbiAgICBzdXBlcihpbml0KTtcbiAgfVxuXG4gIG92ZXJyaWRlIHJlYWRvbmx5IHR5cGU6IEh0dHBFdmVudFR5cGUuUmVzcG9uc2VIZWFkZXIgPSBIdHRwRXZlbnRUeXBlLlJlc3BvbnNlSGVhZGVyO1xuXG4gIC8qKlxuICAgKiBDb3B5IHRoaXMgYEh0dHBIZWFkZXJSZXNwb25zZWAsIG92ZXJyaWRpbmcgaXRzIGNvbnRlbnRzIHdpdGggdGhlXG4gICAqIGdpdmVuIHBhcmFtZXRlciBoYXNoLlxuICAgKi9cbiAgY2xvbmUoXG4gICAgdXBkYXRlOiB7aGVhZGVycz86IEh0dHBIZWFkZXJzOyBzdGF0dXM/OiBudW1iZXI7IHN0YXR1c1RleHQ/OiBzdHJpbmc7IHVybD86IHN0cmluZ30gPSB7fSxcbiAgKTogSHR0cEhlYWRlclJlc3BvbnNlIHtcbiAgICAvLyBQZXJmb3JtIGEgc3RyYWlnaHRmb3J3YXJkIGluaXRpYWxpemF0aW9uIG9mIHRoZSBuZXcgSHR0cEhlYWRlclJlc3BvbnNlLFxuICAgIC8vIG92ZXJyaWRpbmcgdGhlIGN1cnJlbnQgcGFyYW1ldGVycyB3aXRoIG5ldyBvbmVzIGlmIGdpdmVuLlxuICAgIHJldHVybiBuZXcgSHR0cEhlYWRlclJlc3BvbnNlKHtcbiAgICAgIGhlYWRlcnM6IHVwZGF0ZS5oZWFkZXJzIHx8IHRoaXMuaGVhZGVycyxcbiAgICAgIHN0YXR1czogdXBkYXRlLnN0YXR1cyAhPT0gdW5kZWZpbmVkID8gdXBkYXRlLnN0YXR1cyA6IHRoaXMuc3RhdHVzLFxuICAgICAgc3RhdHVzVGV4dDogdXBkYXRlLnN0YXR1c1RleHQgfHwgdGhpcy5zdGF0dXNUZXh0LFxuICAgICAgdXJsOiB1cGRhdGUudXJsIHx8IHRoaXMudXJsIHx8IHVuZGVmaW5lZCxcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIEEgZnVsbCBIVFRQIHJlc3BvbnNlLCBpbmNsdWRpbmcgYSB0eXBlZCByZXNwb25zZSBib2R5ICh3aGljaCBtYXkgYmUgYG51bGxgXG4gKiBpZiBvbmUgd2FzIG5vdCByZXR1cm5lZCkuXG4gKlxuICogYEh0dHBSZXNwb25zZWAgaXMgYSBgSHR0cEV2ZW50YCBhdmFpbGFibGUgb24gdGhlIHJlc3BvbnNlIGV2ZW50XG4gKiBzdHJlYW0uXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY2xhc3MgSHR0cFJlc3BvbnNlPFQ+IGV4dGVuZHMgSHR0cFJlc3BvbnNlQmFzZSB7XG4gIC8qKlxuICAgKiBUaGUgcmVzcG9uc2UgYm9keSwgb3IgYG51bGxgIGlmIG9uZSB3YXMgbm90IHJldHVybmVkLlxuICAgKi9cbiAgcmVhZG9ubHkgYm9keTogVCB8IG51bGw7XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBgSHR0cFJlc3BvbnNlYC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIGluaXQ6IHtcbiAgICAgIGJvZHk/OiBUIHwgbnVsbDtcbiAgICAgIGhlYWRlcnM/OiBIdHRwSGVhZGVycztcbiAgICAgIHN0YXR1cz86IG51bWJlcjtcbiAgICAgIHN0YXR1c1RleHQ/OiBzdHJpbmc7XG4gICAgICB1cmw/OiBzdHJpbmc7XG4gICAgfSA9IHt9LFxuICApIHtcbiAgICBzdXBlcihpbml0KTtcbiAgICB0aGlzLmJvZHkgPSBpbml0LmJvZHkgIT09IHVuZGVmaW5lZCA/IGluaXQuYm9keSA6IG51bGw7XG4gIH1cblxuICBvdmVycmlkZSByZWFkb25seSB0eXBlOiBIdHRwRXZlbnRUeXBlLlJlc3BvbnNlID0gSHR0cEV2ZW50VHlwZS5SZXNwb25zZTtcblxuICBjbG9uZSgpOiBIdHRwUmVzcG9uc2U8VD47XG4gIGNsb25lKHVwZGF0ZToge1xuICAgIGhlYWRlcnM/OiBIdHRwSGVhZGVycztcbiAgICBzdGF0dXM/OiBudW1iZXI7XG4gICAgc3RhdHVzVGV4dD86IHN0cmluZztcbiAgICB1cmw/OiBzdHJpbmc7XG4gIH0pOiBIdHRwUmVzcG9uc2U8VD47XG4gIGNsb25lPFY+KHVwZGF0ZToge1xuICAgIGJvZHk/OiBWIHwgbnVsbDtcbiAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnM7XG4gICAgc3RhdHVzPzogbnVtYmVyO1xuICAgIHN0YXR1c1RleHQ/OiBzdHJpbmc7XG4gICAgdXJsPzogc3RyaW5nO1xuICB9KTogSHR0cFJlc3BvbnNlPFY+O1xuICBjbG9uZShcbiAgICB1cGRhdGU6IHtcbiAgICAgIGJvZHk/OiBhbnkgfCBudWxsO1xuICAgICAgaGVhZGVycz86IEh0dHBIZWFkZXJzO1xuICAgICAgc3RhdHVzPzogbnVtYmVyO1xuICAgICAgc3RhdHVzVGV4dD86IHN0cmluZztcbiAgICAgIHVybD86IHN0cmluZztcbiAgICB9ID0ge30sXG4gICk6IEh0dHBSZXNwb25zZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IEh0dHBSZXNwb25zZTxhbnk+KHtcbiAgICAgIGJvZHk6IHVwZGF0ZS5ib2R5ICE9PSB1bmRlZmluZWQgPyB1cGRhdGUuYm9keSA6IHRoaXMuYm9keSxcbiAgICAgIGhlYWRlcnM6IHVwZGF0ZS5oZWFkZXJzIHx8IHRoaXMuaGVhZGVycyxcbiAgICAgIHN0YXR1czogdXBkYXRlLnN0YXR1cyAhPT0gdW5kZWZpbmVkID8gdXBkYXRlLnN0YXR1cyA6IHRoaXMuc3RhdHVzLFxuICAgICAgc3RhdHVzVGV4dDogdXBkYXRlLnN0YXR1c1RleHQgfHwgdGhpcy5zdGF0dXNUZXh0LFxuICAgICAgdXJsOiB1cGRhdGUudXJsIHx8IHRoaXMudXJsIHx8IHVuZGVmaW5lZCxcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIEEgcmVzcG9uc2UgdGhhdCByZXByZXNlbnRzIGFuIGVycm9yIG9yIGZhaWx1cmUsIGVpdGhlciBmcm9tIGFcbiAqIG5vbi1zdWNjZXNzZnVsIEhUVFAgc3RhdHVzLCBhbiBlcnJvciB3aGlsZSBleGVjdXRpbmcgdGhlIHJlcXVlc3QsXG4gKiBvciBzb21lIG90aGVyIGZhaWx1cmUgd2hpY2ggb2NjdXJyZWQgZHVyaW5nIHRoZSBwYXJzaW5nIG9mIHRoZSByZXNwb25zZS5cbiAqXG4gKiBBbnkgZXJyb3IgcmV0dXJuZWQgb24gdGhlIGBPYnNlcnZhYmxlYCByZXNwb25zZSBzdHJlYW0gd2lsbCBiZVxuICogd3JhcHBlZCBpbiBhbiBgSHR0cEVycm9yUmVzcG9uc2VgIHRvIHByb3ZpZGUgYWRkaXRpb25hbCBjb250ZXh0IGFib3V0XG4gKiB0aGUgc3RhdGUgb2YgdGhlIEhUVFAgbGF5ZXIgd2hlbiB0aGUgZXJyb3Igb2NjdXJyZWQuIFRoZSBlcnJvciBwcm9wZXJ0eVxuICogd2lsbCBjb250YWluIGVpdGhlciBhIHdyYXBwZWQgRXJyb3Igb2JqZWN0IG9yIHRoZSBlcnJvciByZXNwb25zZSByZXR1cm5lZFxuICogZnJvbSB0aGUgc2VydmVyLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNsYXNzIEh0dHBFcnJvclJlc3BvbnNlIGV4dGVuZHMgSHR0cFJlc3BvbnNlQmFzZSBpbXBsZW1lbnRzIEVycm9yIHtcbiAgcmVhZG9ubHkgbmFtZSA9ICdIdHRwRXJyb3JSZXNwb25zZSc7XG4gIHJlYWRvbmx5IG1lc3NhZ2U6IHN0cmluZztcbiAgcmVhZG9ubHkgZXJyb3I6IGFueSB8IG51bGw7XG5cbiAgLyoqXG4gICAqIEVycm9ycyBhcmUgbmV2ZXIgb2theSwgZXZlbiB3aGVuIHRoZSBzdGF0dXMgY29kZSBpcyBpbiB0aGUgMnh4IHN1Y2Nlc3MgcmFuZ2UuXG4gICAqL1xuICBvdmVycmlkZSByZWFkb25seSBvayA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKGluaXQ6IHtcbiAgICBlcnJvcj86IGFueTtcbiAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnM7XG4gICAgc3RhdHVzPzogbnVtYmVyO1xuICAgIHN0YXR1c1RleHQ/OiBzdHJpbmc7XG4gICAgdXJsPzogc3RyaW5nO1xuICB9KSB7XG4gICAgLy8gSW5pdGlhbGl6ZSB3aXRoIGEgZGVmYXVsdCBzdGF0dXMgb2YgMCAvIFVua25vd24gRXJyb3IuXG4gICAgc3VwZXIoaW5pdCwgMCwgJ1Vua25vd24gRXJyb3InKTtcblxuICAgIC8vIElmIHRoZSByZXNwb25zZSB3YXMgc3VjY2Vzc2Z1bCwgdGhlbiB0aGlzIHdhcyBhIHBhcnNlIGVycm9yLiBPdGhlcndpc2UsIGl0IHdhc1xuICAgIC8vIGEgcHJvdG9jb2wtbGV2ZWwgZmFpbHVyZSBvZiBzb21lIHNvcnQuIEVpdGhlciB0aGUgcmVxdWVzdCBmYWlsZWQgaW4gdHJhbnNpdFxuICAgIC8vIG9yIHRoZSBzZXJ2ZXIgcmV0dXJuZWQgYW4gdW5zdWNjZXNzZnVsIHN0YXR1cyBjb2RlLlxuICAgIGlmICh0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDApIHtcbiAgICAgIHRoaXMubWVzc2FnZSA9IGBIdHRwIGZhaWx1cmUgZHVyaW5nIHBhcnNpbmcgZm9yICR7aW5pdC51cmwgfHwgJyh1bmtub3duIHVybCknfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWVzc2FnZSA9IGBIdHRwIGZhaWx1cmUgcmVzcG9uc2UgZm9yICR7aW5pdC51cmwgfHwgJyh1bmtub3duIHVybCknfTogJHtpbml0LnN0YXR1c30gJHtcbiAgICAgICAgaW5pdC5zdGF0dXNUZXh0XG4gICAgICB9YDtcbiAgICB9XG4gICAgdGhpcy5lcnJvciA9IGluaXQuZXJyb3IgfHwgbnVsbDtcbiAgfVxufVxuXG4vKipcbiAqIEh0dHAgc3RhdHVzIGNvZGVzLlxuICogQXMgcGVyIGh0dHBzOi8vd3d3LmlhbmEub3JnL2Fzc2lnbm1lbnRzL2h0dHAtc3RhdHVzLWNvZGVzL2h0dHAtc3RhdHVzLWNvZGVzLnhodG1sXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBlbnVtIEh0dHBTdGF0dXNDb2RlIHtcbiAgQ29udGludWUgPSAxMDAsXG4gIFN3aXRjaGluZ1Byb3RvY29scyA9IDEwMSxcbiAgUHJvY2Vzc2luZyA9IDEwMixcbiAgRWFybHlIaW50cyA9IDEwMyxcblxuICBPayA9IDIwMCxcbiAgQ3JlYXRlZCA9IDIwMSxcbiAgQWNjZXB0ZWQgPSAyMDIsXG4gIE5vbkF1dGhvcml0YXRpdmVJbmZvcm1hdGlvbiA9IDIwMyxcbiAgTm9Db250ZW50ID0gMjA0LFxuICBSZXNldENvbnRlbnQgPSAyMDUsXG4gIFBhcnRpYWxDb250ZW50ID0gMjA2LFxuICBNdWx0aVN0YXR1cyA9IDIwNyxcbiAgQWxyZWFkeVJlcG9ydGVkID0gMjA4LFxuICBJbVVzZWQgPSAyMjYsXG5cbiAgTXVsdGlwbGVDaG9pY2VzID0gMzAwLFxuICBNb3ZlZFBlcm1hbmVudGx5ID0gMzAxLFxuICBGb3VuZCA9IDMwMixcbiAgU2VlT3RoZXIgPSAzMDMsXG4gIE5vdE1vZGlmaWVkID0gMzA0LFxuICBVc2VQcm94eSA9IDMwNSxcbiAgVW51c2VkID0gMzA2LFxuICBUZW1wb3JhcnlSZWRpcmVjdCA9IDMwNyxcbiAgUGVybWFuZW50UmVkaXJlY3QgPSAzMDgsXG5cbiAgQmFkUmVxdWVzdCA9IDQwMCxcbiAgVW5hdXRob3JpemVkID0gNDAxLFxuICBQYXltZW50UmVxdWlyZWQgPSA0MDIsXG4gIEZvcmJpZGRlbiA9IDQwMyxcbiAgTm90Rm91bmQgPSA0MDQsXG4gIE1ldGhvZE5vdEFsbG93ZWQgPSA0MDUsXG4gIE5vdEFjY2VwdGFibGUgPSA0MDYsXG4gIFByb3h5QXV0aGVudGljYXRpb25SZXF1aXJlZCA9IDQwNyxcbiAgUmVxdWVzdFRpbWVvdXQgPSA0MDgsXG4gIENvbmZsaWN0ID0gNDA5LFxuICBHb25lID0gNDEwLFxuICBMZW5ndGhSZXF1aXJlZCA9IDQxMSxcbiAgUHJlY29uZGl0aW9uRmFpbGVkID0gNDEyLFxuICBQYXlsb2FkVG9vTGFyZ2UgPSA0MTMsXG4gIFVyaVRvb0xvbmcgPSA0MTQsXG4gIFVuc3VwcG9ydGVkTWVkaWFUeXBlID0gNDE1LFxuICBSYW5nZU5vdFNhdGlzZmlhYmxlID0gNDE2LFxuICBFeHBlY3RhdGlvbkZhaWxlZCA9IDQxNyxcbiAgSW1BVGVhcG90ID0gNDE4LFxuICBNaXNkaXJlY3RlZFJlcXVlc3QgPSA0MjEsXG4gIFVucHJvY2Vzc2FibGVFbnRpdHkgPSA0MjIsXG4gIExvY2tlZCA9IDQyMyxcbiAgRmFpbGVkRGVwZW5kZW5jeSA9IDQyNCxcbiAgVG9vRWFybHkgPSA0MjUsXG4gIFVwZ3JhZGVSZXF1aXJlZCA9IDQyNixcbiAgUHJlY29uZGl0aW9uUmVxdWlyZWQgPSA0MjgsXG4gIFRvb01hbnlSZXF1ZXN0cyA9IDQyOSxcbiAgUmVxdWVzdEhlYWRlckZpZWxkc1Rvb0xhcmdlID0gNDMxLFxuICBVbmF2YWlsYWJsZUZvckxlZ2FsUmVhc29ucyA9IDQ1MSxcblxuICBJbnRlcm5hbFNlcnZlckVycm9yID0gNTAwLFxuICBOb3RJbXBsZW1lbnRlZCA9IDUwMSxcbiAgQmFkR2F0ZXdheSA9IDUwMixcbiAgU2VydmljZVVuYXZhaWxhYmxlID0gNTAzLFxuICBHYXRld2F5VGltZW91dCA9IDUwNCxcbiAgSHR0cFZlcnNpb25Ob3RTdXBwb3J0ZWQgPSA1MDUsXG4gIFZhcmlhbnRBbHNvTmVnb3RpYXRlcyA9IDUwNixcbiAgSW5zdWZmaWNpZW50U3RvcmFnZSA9IDUwNyxcbiAgTG9vcERldGVjdGVkID0gNTA4LFxuICBOb3RFeHRlbmRlZCA9IDUxMCxcbiAgTmV0d29ya0F1dGhlbnRpY2F0aW9uUmVxdWlyZWQgPSA1MTEsXG59XG4iXX0=