/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HttpErrorResponse, HttpHeaders, HttpResponse, HttpStatusCode, } from '@angular/common/http';
/**
 * A mock requests that was received and is ready to be answered.
 *
 * This interface allows access to the underlying `HttpRequest`, and allows
 * responding with `HttpEvent`s or `HttpErrorResponse`s.
 *
 * @publicApi
 */
export class TestRequest {
    /**
     * Whether the request was cancelled after it was sent.
     */
    get cancelled() {
        return this._cancelled;
    }
    constructor(request, observer) {
        this.request = request;
        this.observer = observer;
        /**
         * @internal set by `HttpClientTestingBackend`
         */
        this._cancelled = false;
    }
    /**
     * Resolve the request by returning a body plus additional HTTP information (such as response
     * headers) if provided.
     * If the request specifies an expected body type, the body is converted into the requested type.
     * Otherwise, the body is converted to `JSON` by default.
     *
     * Both successful and unsuccessful responses can be delivered via `flush()`.
     */
    flush(body, opts = {}) {
        if (this.cancelled) {
            throw new Error(`Cannot flush a cancelled request.`);
        }
        const url = this.request.urlWithParams;
        const headers = opts.headers instanceof HttpHeaders ? opts.headers : new HttpHeaders(opts.headers);
        body = _maybeConvertBody(this.request.responseType, body);
        let statusText = opts.statusText;
        let status = opts.status !== undefined ? opts.status : HttpStatusCode.Ok;
        if (opts.status === undefined) {
            if (body === null) {
                status = HttpStatusCode.NoContent;
                statusText ||= 'No Content';
            }
            else {
                statusText ||= 'OK';
            }
        }
        if (statusText === undefined) {
            throw new Error('statusText is required when setting a custom status.');
        }
        if (status >= 200 && status < 300) {
            this.observer.next(new HttpResponse({ body, headers, status, statusText, url }));
            this.observer.complete();
        }
        else {
            this.observer.error(new HttpErrorResponse({ error: body, headers, status, statusText, url }));
        }
    }
    error(error, opts = {}) {
        if (this.cancelled) {
            throw new Error(`Cannot return an error for a cancelled request.`);
        }
        if (opts.status && opts.status >= 200 && opts.status < 300) {
            throw new Error(`error() called with a successful status.`);
        }
        const headers = opts.headers instanceof HttpHeaders ? opts.headers : new HttpHeaders(opts.headers);
        this.observer.error(new HttpErrorResponse({
            error,
            headers,
            status: opts.status || 0,
            statusText: opts.statusText || '',
            url: this.request.urlWithParams,
        }));
    }
    /**
     * Deliver an arbitrary `HttpEvent` (such as a progress event) on the response stream for this
     * request.
     */
    event(event) {
        if (this.cancelled) {
            throw new Error(`Cannot send events to a cancelled request.`);
        }
        this.observer.next(event);
    }
}
/**
 * Helper function to convert a response body to an ArrayBuffer.
 */
function _toArrayBufferBody(body) {
    if (typeof ArrayBuffer === 'undefined') {
        throw new Error('ArrayBuffer responses are not supported on this platform.');
    }
    if (body instanceof ArrayBuffer) {
        return body;
    }
    throw new Error('Automatic conversion to ArrayBuffer is not supported for response type.');
}
/**
 * Helper function to convert a response body to a Blob.
 */
function _toBlob(body) {
    if (typeof Blob === 'undefined') {
        throw new Error('Blob responses are not supported on this platform.');
    }
    if (body instanceof Blob) {
        return body;
    }
    if (ArrayBuffer && body instanceof ArrayBuffer) {
        return new Blob([body]);
    }
    throw new Error('Automatic conversion to Blob is not supported for response type.');
}
/**
 * Helper function to convert a response body to JSON data.
 */
function _toJsonBody(body, format = 'JSON') {
    if (typeof ArrayBuffer !== 'undefined' && body instanceof ArrayBuffer) {
        throw new Error(`Automatic conversion to ${format} is not supported for ArrayBuffers.`);
    }
    if (typeof Blob !== 'undefined' && body instanceof Blob) {
        throw new Error(`Automatic conversion to ${format} is not supported for Blobs.`);
    }
    if (typeof body === 'string' ||
        typeof body === 'number' ||
        typeof body === 'object' ||
        typeof body === 'boolean' ||
        Array.isArray(body)) {
        return body;
    }
    throw new Error(`Automatic conversion to ${format} is not supported for response type.`);
}
/**
 * Helper function to convert a response body to a string.
 */
function _toTextBody(body) {
    if (typeof body === 'string') {
        return body;
    }
    if (typeof ArrayBuffer !== 'undefined' && body instanceof ArrayBuffer) {
        throw new Error('Automatic conversion to text is not supported for ArrayBuffers.');
    }
    if (typeof Blob !== 'undefined' && body instanceof Blob) {
        throw new Error('Automatic conversion to text is not supported for Blobs.');
    }
    return JSON.stringify(_toJsonBody(body, 'text'));
}
/**
 * Convert a response body to the requested type.
 */
function _maybeConvertBody(responseType, body) {
    if (body === null) {
        return null;
    }
    switch (responseType) {
        case 'arraybuffer':
            return _toArrayBufferBody(body);
        case 'blob':
            return _toBlob(body);
        case 'json':
            return _toJsonBody(body);
        case 'text':
            return _toTextBody(body);
        default:
            throw new Error(`Unsupported responseType: ${responseType}`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbW1vbi9odHRwL3Rlc3Rpbmcvc3JjL3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLGlCQUFpQixFQUVqQixXQUFXLEVBRVgsWUFBWSxFQUNaLGNBQWMsR0FDZixNQUFNLHNCQUFzQixDQUFDO0FBYTlCOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLE9BQU8sV0FBVztJQUN0Qjs7T0FFRztJQUNILElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBT0QsWUFDUyxPQUF5QixFQUN4QixRQUFrQztRQURuQyxZQUFPLEdBQVAsT0FBTyxDQUFrQjtRQUN4QixhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQVA1Qzs7V0FFRztRQUNILGVBQVUsR0FBRyxLQUFLLENBQUM7SUFLaEIsQ0FBQztJQUVKOzs7Ozs7O09BT0c7SUFDSCxLQUFLLENBQ0gsSUFRUSxFQUNSLE9BSUksRUFBRTtRQUVOLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ25CLE1BQU0sSUFBSSxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztRQUN2RCxDQUFDO1FBQ0QsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFDdkMsTUFBTSxPQUFPLEdBQ1gsSUFBSSxDQUFDLE9BQU8sWUFBWSxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRixJQUFJLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUQsSUFBSSxVQUFVLEdBQXVCLElBQUks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SUFBSSxLQUFLLENBQUMsNkJBQTZCLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDakUsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgSHR0cEVycm9yUmVzcG9uc2UsXG4gIEh0dHBFdmVudCxcbiAgSHR0cEhlYWRlcnMsXG4gIEh0dHBSZXF1ZXN0LFxuICBIdHRwUmVzcG9uc2UsXG4gIEh0dHBTdGF0dXNDb2RlLFxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge09ic2VydmVyfSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBUeXBlIHRoYXQgZGVzY3JpYmVzIG9wdGlvbnMgdGhhdCBjYW4gYmUgdXNlZCB0byBjcmVhdGUgYW4gZXJyb3JcbiAqIGluIGBUZXN0UmVxdWVzdGAuXG4gKi9cbnR5cGUgVGVzdFJlcXVlc3RFcnJvck9wdGlvbnMgPSB7XG4gIGhlYWRlcnM/OiBIdHRwSGVhZGVycyB8IHtbbmFtZTogc3RyaW5nXTogc3RyaW5nIHwgc3RyaW5nW119O1xuICBzdGF0dXM/OiBudW1iZXI7XG4gIHN0YXR1c1RleHQ/OiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIEEgbW9jayByZXF1ZXN0cyB0aGF0IHdhcyByZWNlaXZlZCBhbmQgaXMgcmVhZHkgdG8gYmUgYW5zd2VyZWQuXG4gKlxuICogVGhpcyBpbnRlcmZhY2UgYWxsb3dzIGFjY2VzcyB0byB0aGUgdW5kZXJseWluZyBgSHR0cFJlcXVlc3RgLCBhbmQgYWxsb3dzXG4gKiByZXNwb25kaW5nIHdpdGggYEh0dHBFdmVudGBzIG9yIGBIdHRwRXJyb3JSZXNwb25zZWBzLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNsYXNzIFRlc3RSZXF1ZXN0IHtcbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIHJlcXVlc3Qgd2FzIGNhbmNlbGxlZCBhZnRlciBpdCB3YXMgc2VudC5cbiAgICovXG4gIGdldCBjYW5jZWxsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NhbmNlbGxlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWwgc2V0IGJ5IGBIdHRwQ2xpZW50VGVzdGluZ0JhY2tlbmRgXG4gICAqL1xuICBfY2FuY2VsbGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sXG4gICAgcHJpdmF0ZSBvYnNlcnZlcjogT2JzZXJ2ZXI8SHR0cEV2ZW50PGFueT4+LFxuICApIHt9XG5cbiAgLyoqXG4gICAqIFJlc29sdmUgdGhlIHJlcXVlc3QgYnkgcmV0dXJuaW5nIGEgYm9keSBwbHVzIGFkZGl0aW9uYWwgSFRUUCBpbmZvcm1hdGlvbiAoc3VjaCBhcyByZXNwb25zZVxuICAgKiBoZWFkZXJzKSBpZiBwcm92aWRlZC5cbiAgICogSWYgdGhlIHJlcXVlc3Qgc3BlY2lmaWVzIGFuIGV4cGVjdGVkIGJvZHkgdHlwZSwgdGhlIGJvZHkgaXMgY29udmVydGVkIGludG8gdGhlIHJlcXVlc3RlZCB0eXBlLlxuICAgKiBPdGhlcndpc2UsIHRoZSBib2R5IGlzIGNvbnZlcnRlZCB0byBgSlNPTmAgYnkgZGVmYXVsdC5cbiAgICpcbiAgICogQm90aCBzdWNjZXNzZnVsIGFuZCB1bnN1Y2Nlc3NmdWwgcmVzcG9uc2VzIGNhbiBiZSBkZWxpdmVyZWQgdmlhIGBmbHVzaCgpYC5cbiAgICovXG4gIGZsdXNoKFxuICAgIGJvZHk6XG4gICAgICB8IEFycmF5QnVmZmVyXG4gICAgICB8IEJsb2JcbiAgICAgIHwgYm9vbGVhblxuICAgICAgfCBzdHJpbmdcbiAgICAgIHwgbnVtYmVyXG4gICAgICB8IE9iamVjdFxuICAgICAgfCAoYm9vbGVhbiB8IHN0cmluZyB8IG51bWJlciB8IE9iamVjdCB8IG51bGwpW11cbiAgICAgIHwgbnVsbCxcbiAgICBvcHRzOiB7XG4gICAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnMgfCB7W25hbWU6IHN0cmluZ106IHN0cmluZyB8IHN0cmluZ1tdfTtcbiAgICAgIHN0YXR1cz86IG51bWJlcjtcbiAgICAgIHN0YXR1c1RleHQ/OiBzdHJpbmc7XG4gICAgfSA9IHt9LFxuICApOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jYW5jZWxsZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGZsdXNoIGEgY2FuY2VsbGVkIHJlcXVlc3QuYCk7XG4gICAgfVxuICAgIGNvbnN0IHVybCA9IHRoaXMucmVxdWVzdC51cmxXaXRoUGFyYW1zO1xuICAgIGNvbnN0IGhlYWRlcnMgPVxuICAgICAgb3B0cy5oZWFkZXJzIGluc3RhbmNlb2YgSHR0cEhlYWRlcnMgPyBvcHRzLmhlYWRlcnMgOiBuZXcgSHR0cEhlYWRlcnMob3B0cy5oZWFkZXJzKTtcbiAgICBib2R5ID0gX21heWJlQ29udmVydEJvZHkodGhpcy5yZXF1ZXN0LnJlc3BvbnNlVHlwZSwgYm9keSk7XG4gICAgbGV0IHN0YXR1c1RleHQ6IHN0cmluZyB8IHVuZGVmaW5lZCA9IG9wdHMuc3RhdHVzVGV4dDtcbiAgICBsZXQgc3RhdHVzOiBudW1iZXIgPSBvcHRzLnN0YXR1cyAhPT0gdW5kZWZpbmVkID8gb3B0cy5zdGF0dXMgOiBIdHRwU3RhdHVzQ29kZS5PaztcbiAgICBpZiAob3B0cy5zdGF0dXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGJvZHkgPT09IG51bGwpIHtcbiAgICAgICAgc3RhdHVzID0gSHR0cFN0YXR1c0NvZGUuTm9Db250ZW50O1xuICAgICAgICBzdGF0dXNUZXh0IHx8PSAnTm8gQ29udGVudCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0dXNUZXh0IHx8PSAnT0snO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc3RhdHVzVGV4dCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3N0YXR1c1RleHQgaXMgcmVxdWlyZWQgd2hlbiBzZXR0aW5nIGEgY3VzdG9tIHN0YXR1cy4nKTtcbiAgICB9XG4gICAgaWYgKHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwKSB7XG4gICAgICB0aGlzLm9ic2VydmVyLm5leHQobmV3IEh0dHBSZXNwb25zZTxhbnk+KHtib2R5LCBoZWFkZXJzLCBzdGF0dXMsIHN0YXR1c1RleHQsIHVybH0pKTtcbiAgICAgIHRoaXMub2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vYnNlcnZlci5lcnJvcihuZXcgSHR0cEVycm9yUmVzcG9uc2Uoe2Vycm9yOiBib2R5LCBoZWFkZXJzLCBzdGF0dXMsIHN0YXR1c1RleHQsIHVybH0pKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVzb2x2ZSB0aGUgcmVxdWVzdCBieSByZXR1cm5pbmcgYW4gYEVycm9yRXZlbnRgIChlLmcuIHNpbXVsYXRpbmcgYSBuZXR3b3JrIGZhaWx1cmUpLlxuICAgKiBAZGVwcmVjYXRlZCBIdHRwIHJlcXVlc3RzIG5ldmVyIGVtaXQgYW4gYEVycm9yRXZlbnRgLiBQbGVhc2Ugc3BlY2lmeSBhIGBQcm9ncmVzc0V2ZW50YC5cbiAgICovXG4gIGVycm9yKGVycm9yOiBFcnJvckV2ZW50LCBvcHRzPzogVGVzdFJlcXVlc3RFcnJvck9wdGlvbnMpOiB2b2lkO1xuICAvKipcbiAgICogUmVzb2x2ZSB0aGUgcmVxdWVzdCBieSByZXR1cm5pbmcgYW4gYFByb2dyZXNzRXZlbnRgIChlLmcuIHNpbXVsYXRpbmcgYSBuZXR3b3JrIGZhaWx1cmUpLlxuICAgKi9cbiAgZXJyb3IoZXJyb3I6IFByb2dyZXNzRXZlbnQsIG9wdHM/OiBUZXN0UmVxdWVzdEVycm9yT3B0aW9ucyk6IHZvaWQ7XG4gIGVycm9yKGVycm9yOiBQcm9ncmVzc0V2ZW50IHwgRXJyb3JFdmVudCwgb3B0czogVGVzdFJlcXVlc3RFcnJvck9wdGlvbnMgPSB7fSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNhbmNlbGxlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgcmV0dXJuIGFuIGVycm9yIGZvciBhIGNhbmNlbGxlZCByZXF1ZXN0LmApO1xuICAgIH1cbiAgICBpZiAob3B0cy5zdGF0dXMgJiYgb3B0cy5zdGF0dXMgPj0gMjAwICYmIG9wdHMuc3RhdHVzIDwgMzAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGVycm9yKCkgY2FsbGVkIHdpdGggYSBzdWNjZXNzZnVsIHN0YXR1cy5gKTtcbiAgICB9XG4gICAgY29uc3QgaGVhZGVycyA9XG4gICAgICBvcHRzLmhlYWRlcnMgaW5zdGFuY2VvZiBIdHRwSGVhZGVycyA/IG9wdHMuaGVhZGVycyA6IG5ldyBIdHRwSGVhZGVycyhvcHRzLmhlYWRlcnMpO1xuICAgIHRoaXMub2JzZXJ2ZXIuZXJyb3IoXG4gICAgICBuZXcgSHR0cEVycm9yUmVzcG9uc2Uoe1xuICAgICAgICBlcnJvcixcbiAgICAgICAgaGVhZGVycyxcbiAgICAgICAgc3RhdHVzOiBvcHRzLnN0YXR1cyB8fCAwLFxuICAgICAgICBzdGF0dXNUZXh0OiBvcHRzLnN0YXR1c1RleHQgfHwgJycsXG4gICAgICAgIHVybDogdGhpcy5yZXF1ZXN0LnVybFdpdGhQYXJhbXMsXG4gICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGl2ZXIgYW4gYXJiaXRyYXJ5IGBIdHRwRXZlbnRgIChzdWNoIGFzIGEgcHJvZ3Jlc3MgZXZlbnQpIG9uIHRoZSByZXNwb25zZSBzdHJlYW0gZm9yIHRoaXNcbiAgICogcmVxdWVzdC5cbiAgICovXG4gIGV2ZW50KGV2ZW50OiBIdHRwRXZlbnQ8YW55Pik6IHZvaWQge1xuICAgIGlmICh0aGlzLmNhbmNlbGxlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3Qgc2VuZCBldmVudHMgdG8gYSBjYW5jZWxsZWQgcmVxdWVzdC5gKTtcbiAgICB9XG4gICAgdGhpcy5vYnNlcnZlci5uZXh0KGV2ZW50KTtcbiAgfVxufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBjb252ZXJ0IGEgcmVzcG9uc2UgYm9keSB0byBhbiBBcnJheUJ1ZmZlci5cbiAqL1xuZnVuY3Rpb24gX3RvQXJyYXlCdWZmZXJCb2R5KFxuICBib2R5OiBBcnJheUJ1ZmZlciB8IEJsb2IgfCBzdHJpbmcgfCBudW1iZXIgfCBPYmplY3QgfCAoc3RyaW5nIHwgbnVtYmVyIHwgT2JqZWN0IHwgbnVsbClbXSxcbik6IEFycmF5QnVmZmVyIHtcbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0FycmF5QnVmZmVyIHJlc3BvbnNlcyBhcmUgbm90IHN1cHBvcnRlZCBvbiB0aGlzIHBsYXRmb3JtLicpO1xuICB9XG4gIGlmIChib2R5IGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICByZXR1cm4gYm9keTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoJ0F1dG9tYXRpYyBjb252ZXJzaW9uIHRvIEFycmF5QnVmZmVyIGlzIG5vdCBzdXBwb3J0ZWQgZm9yIHJlc3BvbnNlIHR5cGUuJyk7XG59XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGNvbnZlcnQgYSByZXNwb25zZSBib2R5IHRvIGEgQmxvYi5cbiAqL1xuZnVuY3Rpb24gX3RvQmxvYihcbiAgYm9keTogQXJyYXlCdWZmZXIgfCBCbG9iIHwgc3RyaW5nIHwgbnVtYmVyIHwgT2JqZWN0IHwgKHN0cmluZyB8IG51bWJlciB8IE9iamVjdCB8IG51bGwpW10sXG4pOiBCbG9iIHtcbiAgaWYgKHR5cGVvZiBCbG9iID09PSAndW5kZWZpbmVkJykge1xuICAgIHRocm93IG5ldyBFcnJvcignQmxvYiByZXNwb25zZXMgYXJlIG5vdCBzdXBwb3J0ZWQgb24gdGhpcyBwbGF0Zm9ybS4nKTtcbiAgfVxuICBpZiAoYm9keSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICByZXR1cm4gYm9keTtcbiAgfVxuICBpZiAoQXJyYXlCdWZmZXIgJiYgYm9keSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgcmV0dXJuIG5ldyBCbG9iKFtib2R5XSk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCdBdXRvbWF0aWMgY29udmVyc2lvbiB0byBCbG9iIGlzIG5vdCBzdXBwb3J0ZWQgZm9yIHJlc3BvbnNlIHR5cGUuJyk7XG59XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGNvbnZlcnQgYSByZXNwb25zZSBib2R5IHRvIEpTT04gZGF0YS5cbiAqL1xuZnVuY3Rpb24gX3RvSnNvbkJvZHkoXG4gIGJvZHk6XG4gICAgfCBBcnJheUJ1ZmZlclxuICAgIHwgQmxvYlxuICAgIHwgYm9vbGVhblxuICAgIHwgc3RyaW5nXG4gICAgfCBudW1iZXJcbiAgICB8IE9iamVjdFxuICAgIHwgKGJvb2xlYW4gfCBzdHJpbmcgfCBudW1iZXIgfCBPYmplY3QgfCBudWxsKVtdLFxuICBmb3JtYXQ6IHN0cmluZyA9ICdKU09OJyxcbik6IE9iamVjdCB8IHN0cmluZyB8IG51bWJlciB8IChPYmplY3QgfCBzdHJpbmcgfCBudW1iZXIpW10ge1xuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiBib2R5IGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEF1dG9tYXRpYyBjb252ZXJzaW9uIHRvICR7Zm9ybWF0fSBpcyBub3Qgc3VwcG9ydGVkIGZvciBBcnJheUJ1ZmZlcnMuYCk7XG4gIH1cbiAgaWYgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiBib2R5IGluc3RhbmNlb2YgQmxvYikge1xuICAgIHRocm93IG5ldyBFcnJvcihgQXV0b21hdGljIGNvbnZlcnNpb24gdG8gJHtmb3JtYXR9IGlzIG5vdCBzdXBwb3J0ZWQgZm9yIEJsb2JzLmApO1xuICB9XG4gIGlmIChcbiAgICB0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycgfHxcbiAgICB0eXBlb2YgYm9keSA9PT0gJ251bWJlcicgfHxcbiAgICB0eXBlb2YgYm9keSA9PT0gJ29iamVjdCcgfHxcbiAgICB0eXBlb2YgYm9keSA9PT0gJ2Jvb2xlYW4nIHx8XG4gICAgQXJyYXkuaXNBcnJheShib2R5KVxuICApIHtcbiAgICByZXR1cm4gYm9keTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoYEF1dG9tYXRpYyBjb252ZXJzaW9uIHRvICR7Zm9ybWF0fSBpcyBub3Qgc3VwcG9ydGVkIGZvciByZXNwb25zZSB0eXBlLmApO1xufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBjb252ZXJ0IGEgcmVzcG9uc2UgYm9keSB0byBhIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gX3RvVGV4dEJvZHkoXG4gIGJvZHk6IEFycmF5QnVmZmVyIHwgQmxvYiB8IHN0cmluZyB8IG51bWJlciB8IE9iamVjdCB8IChzdHJpbmcgfCBudW1iZXIgfCBPYmplY3QgfCBudWxsKVtdLFxuKTogc3RyaW5nIHtcbiAgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBib2R5O1xuICB9XG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIGJvZHkgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgIHRocm93IG5ldyBFcnJvcignQXV0b21hdGljIGNvbnZlcnNpb24gdG8gdGV4dCBpcyBub3Qgc3VwcG9ydGVkIGZvciBBcnJheUJ1ZmZlcnMuJyk7XG4gIH1cbiAgaWYgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiBib2R5IGluc3RhbmNlb2YgQmxvYikge1xuICAgIHRocm93IG5ldyBFcnJvcignQXV0b21hdGljIGNvbnZlcnNpb24gdG8gdGV4dCBpcyBub3Qgc3VwcG9ydGVkIGZvciBCbG9icy4nKTtcbiAgfVxuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoX3RvSnNvbkJvZHkoYm9keSwgJ3RleHQnKSk7XG59XG5cbi8qKlxuICogQ29udmVydCBhIHJlc3BvbnNlIGJvZHkgdG8gdGhlIHJlcXVlc3RlZCB0eXBlLlxuICovXG5mdW5jdGlvbiBfbWF5YmVDb252ZXJ0Qm9keShcbiAgcmVzcG9uc2VUeXBlOiBzdHJpbmcsXG4gIGJvZHk6IEFycmF5QnVmZmVyIHwgQmxvYiB8IHN0cmluZyB8IG51bWJlciB8IE9iamVjdCB8IChzdHJpbmcgfCBudW1iZXIgfCBPYmplY3QgfCBudWxsKVtdIHwgbnVsbCxcbik6IEFycmF5QnVmZmVyIHwgQmxvYiB8IHN0cmluZyB8IG51bWJlciB8IE9iamVjdCB8IChzdHJpbmcgfCBudW1iZXIgfCBPYmplY3QgfCBudWxsKVtdIHwgbnVsbCB7XG4gIGlmIChib2R5ID09PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgc3dpdGNoIChyZXNwb25zZVR5cGUpIHtcbiAgICBjYXNlICdhcnJheWJ1ZmZlcic6XG4gICAgICByZXR1cm4gX3RvQXJyYXlCdWZmZXJCb2R5KGJvZHkpO1xuICAgIGNhc2UgJ2Jsb2InOlxuICAgICAgcmV0dXJuIF90b0Jsb2IoYm9keSk7XG4gICAgY2FzZSAnanNvbic6XG4gICAgICByZXR1cm4gX3RvSnNvbkJvZHkoYm9keSk7XG4gICAgY2FzZSAndGV4dCc6XG4gICAgICByZXR1cm4gX3RvVGV4dEJvZHkoYm9keSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgcmVzcG9uc2VUeXBlOiAke3Jlc3BvbnNlVHlwZX1gKTtcbiAgfVxufVxuIl19