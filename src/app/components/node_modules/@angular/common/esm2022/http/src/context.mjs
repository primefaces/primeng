/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A token used to manipulate and access values stored in `HttpContext`.
 *
 * @publicApi
 */
export class HttpContextToken {
    constructor(defaultValue) {
        this.defaultValue = defaultValue;
    }
}
/**
 * Http context stores arbitrary user defined values and ensures type safety without
 * actually knowing the types. It is backed by a `Map` and guarantees that keys do not clash.
 *
 * This context is mutable and is shared between cloned requests unless explicitly specified.
 *
 * @usageNotes
 *
 * ### Usage Example
 *
 * ```typescript
 * // inside cache.interceptors.ts
 * export const IS_CACHE_ENABLED = new HttpContextToken<boolean>(() => false);
 *
 * export class CacheInterceptor implements HttpInterceptor {
 *
 *   intercept(req: HttpRequest<any>, delegate: HttpHandler): Observable<HttpEvent<any>> {
 *     if (req.context.get(IS_CACHE_ENABLED) === true) {
 *       return ...;
 *     }
 *     return delegate.handle(req);
 *   }
 * }
 *
 * // inside a service
 *
 * this.httpClient.get('/api/weather', {
 *   context: new HttpContext().set(IS_CACHE_ENABLED, true)
 * }).subscribe(...);
 * ```
 *
 * @publicApi
 */
export class HttpContext {
    constructor() {
        this.map = new Map();
    }
    /**
     * Store a value in the context. If a value is already present it will be overwritten.
     *
     * @param token The reference to an instance of `HttpContextToken`.
     * @param value The value to store.
     *
     * @returns A reference to itself for easy chaining.
     */
    set(token, value) {
        this.map.set(token, value);
        return this;
    }
    /**
     * Retrieve the value associated with the given token.
     *
     * @param token The reference to an instance of `HttpContextToken`.
     *
     * @returns The stored value or default if one is defined.
     */
    get(token) {
        if (!this.map.has(token)) {
            this.map.set(token, token.defaultValue());
        }
        return this.map.get(token);
    }
    /**
     * Delete the value associated with the given token.
     *
     * @param token The reference to an instance of `HttpContextToken`.
     *
     * @returns A reference to itself for easy chaining.
     */
    delete(token) {
        this.map.delete(token);
        return this;
    }
    /**
     * Checks for existence of a given token.
     *
     * @param token The reference to an instance of `HttpContextToken`.
     *
     * @returns True if the token exists, false otherwise.
     */
    has(token) {
        return this.map.has(token);
    }
    /**
     * @returns a list of tokens currently stored in the context.
     */
    keys() {
        return this.map.keys();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbW1vbi9odHRwL3NyYy9jb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVIOzs7O0dBSUc7QUFDSCxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCLFlBQTRCLFlBQXFCO1FBQXJCLGlCQUFZLEdBQVosWUFBWSxDQUFTO0lBQUcsQ0FBQztDQUN0RDtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdDRztBQUNILE1BQU0sT0FBTyxXQUFXO0lBQXhCO1FBQ21CLFFBQUcsR0FBRyxJQUFJLEdBQUcsRUFBc0MsQ0FBQztJQTBEdkUsQ0FBQztJQXhEQzs7Ozs7OztPQU9HO0lBQ0gsR0FBRyxDQUFJLEtBQTBCLEVBQUUsS0FBUTtRQUN6QyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0IsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsR0FBRyxDQUFJLEtBQTBCO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQU0sQ0FBQztJQUNsQyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsTUFBTSxDQUFDLEtBQWdDO1FBQ3JDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILEdBQUcsQ0FBQyxLQUFnQztRQUNsQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUk7UUFDRixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8qKlxuICogQSB0b2tlbiB1c2VkIHRvIG1hbmlwdWxhdGUgYW5kIGFjY2VzcyB2YWx1ZXMgc3RvcmVkIGluIGBIdHRwQ29udGV4dGAuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY2xhc3MgSHR0cENvbnRleHRUb2tlbjxUPiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBkZWZhdWx0VmFsdWU6ICgpID0+IFQpIHt9XG59XG5cbi8qKlxuICogSHR0cCBjb250ZXh0IHN0b3JlcyBhcmJpdHJhcnkgdXNlciBkZWZpbmVkIHZhbHVlcyBhbmQgZW5zdXJlcyB0eXBlIHNhZmV0eSB3aXRob3V0XG4gKiBhY3R1YWxseSBrbm93aW5nIHRoZSB0eXBlcy4gSXQgaXMgYmFja2VkIGJ5IGEgYE1hcGAgYW5kIGd1YXJhbnRlZXMgdGhhdCBrZXlzIGRvIG5vdCBjbGFzaC5cbiAqXG4gKiBUaGlzIGNvbnRleHQgaXMgbXV0YWJsZSBhbmQgaXMgc2hhcmVkIGJldHdlZW4gY2xvbmVkIHJlcXVlc3RzIHVubGVzcyBleHBsaWNpdGx5IHNwZWNpZmllZC5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqICMjIyBVc2FnZSBFeGFtcGxlXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogLy8gaW5zaWRlIGNhY2hlLmludGVyY2VwdG9ycy50c1xuICogZXhwb3J0IGNvbnN0IElTX0NBQ0hFX0VOQUJMRUQgPSBuZXcgSHR0cENvbnRleHRUb2tlbjxib29sZWFuPigoKSA9PiBmYWxzZSk7XG4gKlxuICogZXhwb3J0IGNsYXNzIENhY2hlSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICpcbiAqICAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgZGVsZWdhdGU6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICogICAgIGlmIChyZXEuY29udGV4dC5nZXQoSVNfQ0FDSEVfRU5BQkxFRCkgPT09IHRydWUpIHtcbiAqICAgICAgIHJldHVybiAuLi47XG4gKiAgICAgfVxuICogICAgIHJldHVybiBkZWxlZ2F0ZS5oYW5kbGUocmVxKTtcbiAqICAgfVxuICogfVxuICpcbiAqIC8vIGluc2lkZSBhIHNlcnZpY2VcbiAqXG4gKiB0aGlzLmh0dHBDbGllbnQuZ2V0KCcvYXBpL3dlYXRoZXInLCB7XG4gKiAgIGNvbnRleHQ6IG5ldyBIdHRwQ29udGV4dCgpLnNldChJU19DQUNIRV9FTkFCTEVELCB0cnVlKVxuICogfSkuc3Vic2NyaWJlKC4uLik7XG4gKiBgYGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjbGFzcyBIdHRwQ29udGV4dCB7XG4gIHByaXZhdGUgcmVhZG9ubHkgbWFwID0gbmV3IE1hcDxIdHRwQ29udGV4dFRva2VuPHVua25vd24+LCB1bmtub3duPigpO1xuXG4gIC8qKlxuICAgKiBTdG9yZSBhIHZhbHVlIGluIHRoZSBjb250ZXh0LiBJZiBhIHZhbHVlIGlzIGFscmVhZHkgcHJlc2VudCBpdCB3aWxsIGJlIG92ZXJ3cml0dGVuLlxuICAgKlxuICAgKiBAcGFyYW0gdG9rZW4gVGhlIHJlZmVyZW5jZSB0byBhbiBpbnN0YW5jZSBvZiBgSHR0cENvbnRleHRUb2tlbmAuXG4gICAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gc3RvcmUuXG4gICAqXG4gICAqIEByZXR1cm5zIEEgcmVmZXJlbmNlIHRvIGl0c2VsZiBmb3IgZWFzeSBjaGFpbmluZy5cbiAgICovXG4gIHNldDxUPih0b2tlbjogSHR0cENvbnRleHRUb2tlbjxUPiwgdmFsdWU6IFQpOiBIdHRwQ29udGV4dCB7XG4gICAgdGhpcy5tYXAuc2V0KHRva2VuLCB2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgdGhlIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCB0aGUgZ2l2ZW4gdG9rZW4uXG4gICAqXG4gICAqIEBwYXJhbSB0b2tlbiBUaGUgcmVmZXJlbmNlIHRvIGFuIGluc3RhbmNlIG9mIGBIdHRwQ29udGV4dFRva2VuYC5cbiAgICpcbiAgICogQHJldHVybnMgVGhlIHN0b3JlZCB2YWx1ZSBvciBkZWZhdWx0IGlmIG9uZSBpcyBkZWZpbmVkLlxuICAgKi9cbiAgZ2V0PFQ+KHRva2VuOiBIdHRwQ29udGV4dFRva2VuPFQ+KTogVCB7XG4gICAgaWYgKCF0aGlzLm1hcC5oYXModG9rZW4pKSB7XG4gICAgICB0aGlzLm1hcC5zZXQodG9rZW4sIHRva2VuLmRlZmF1bHRWYWx1ZSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubWFwLmdldCh0b2tlbikgYXMgVDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgdGhlIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCB0aGUgZ2l2ZW4gdG9rZW4uXG4gICAqXG4gICAqIEBwYXJhbSB0b2tlbiBUaGUgcmVmZXJlbmNlIHRvIGFuIGluc3RhbmNlIG9mIGBIdHRwQ29udGV4dFRva2VuYC5cbiAgICpcbiAgICogQHJldHVybnMgQSByZWZlcmVuY2UgdG8gaXRzZWxmIGZvciBlYXN5IGNoYWluaW5nLlxuICAgKi9cbiAgZGVsZXRlKHRva2VuOiBIdHRwQ29udGV4dFRva2VuPHVua25vd24+KTogSHR0cENvbnRleHQge1xuICAgIHRoaXMubWFwLmRlbGV0ZSh0b2tlbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGZvciBleGlzdGVuY2Ugb2YgYSBnaXZlbiB0b2tlbi5cbiAgICpcbiAgICogQHBhcmFtIHRva2VuIFRoZSByZWZlcmVuY2UgdG8gYW4gaW5zdGFuY2Ugb2YgYEh0dHBDb250ZXh0VG9rZW5gLlxuICAgKlxuICAgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB0b2tlbiBleGlzdHMsIGZhbHNlIG90aGVyd2lzZS5cbiAgICovXG4gIGhhcyh0b2tlbjogSHR0cENvbnRleHRUb2tlbjx1bmtub3duPik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm1hcC5oYXModG9rZW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIGEgbGlzdCBvZiB0b2tlbnMgY3VycmVudGx5IHN0b3JlZCBpbiB0aGUgY29udGV4dC5cbiAgICovXG4gIGtleXMoKTogSXRlcmFibGVJdGVyYXRvcjxIdHRwQ29udGV4dFRva2VuPHVua25vd24+PiB7XG4gICAgcmV0dXJuIHRoaXMubWFwLmtleXMoKTtcbiAgfVxufVxuIl19