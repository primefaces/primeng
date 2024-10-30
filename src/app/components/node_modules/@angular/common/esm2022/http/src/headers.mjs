/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Represents the header configuration options for an HTTP request.
 * Instances are immutable. Modifying methods return a cloned
 * instance with the change. The original object is never changed.
 *
 * @publicApi
 */
export class HttpHeaders {
    /**  Constructs a new HTTP header object with the given values.*/
    constructor(headers) {
        /**
         * Internal map of lowercased header names to the normalized
         * form of the name (the form seen first).
         */
        this.normalizedNames = new Map();
        /**
         * Queued updates to be materialized the next initialization.
         */
        this.lazyUpdate = null;
        if (!headers) {
            this.headers = new Map();
        }
        else if (typeof headers === 'string') {
            this.lazyInit = () => {
                this.headers = new Map();
                headers.split('\n').forEach((line) => {
                    const index = line.indexOf(':');
                    if (index > 0) {
                        const name = line.slice(0, index);
                        const key = name.toLowerCase();
                        const value = line.slice(index + 1).trim();
                        this.maybeSetNormalizedName(name, key);
                        if (this.headers.has(key)) {
                            this.headers.get(key).push(value);
                        }
                        else {
                            this.headers.set(key, [value]);
                        }
                    }
                });
            };
        }
        else if (typeof Headers !== 'undefined' && headers instanceof Headers) {
            this.headers = new Map();
            headers.forEach((values, name) => {
                this.setHeaderEntries(name, values);
            });
        }
        else {
            this.lazyInit = () => {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    assertValidHeaders(headers);
                }
                this.headers = new Map();
                Object.entries(headers).forEach(([name, values]) => {
                    this.setHeaderEntries(name, values);
                });
            };
        }
    }
    /**
     * Checks for existence of a given header.
     *
     * @param name The header name to check for existence.
     *
     * @returns True if the header exists, false otherwise.
     */
    has(name) {
        this.init();
        return this.headers.has(name.toLowerCase());
    }
    /**
     * Retrieves the first value of a given header.
     *
     * @param name The header name.
     *
     * @returns The value string if the header exists, null otherwise
     */
    get(name) {
        this.init();
        const values = this.headers.get(name.toLowerCase());
        return values && values.length > 0 ? values[0] : null;
    }
    /**
     * Retrieves the names of the headers.
     *
     * @returns A list of header names.
     */
    keys() {
        this.init();
        return Array.from(this.normalizedNames.values());
    }
    /**
     * Retrieves a list of values for a given header.
     *
     * @param name The header name from which to retrieve values.
     *
     * @returns A string of values if the header exists, null otherwise.
     */
    getAll(name) {
        this.init();
        return this.headers.get(name.toLowerCase()) || null;
    }
    /**
     * Appends a new value to the existing set of values for a header
     * and returns them in a clone of the original instance.
     *
     * @param name The header name for which to append the values.
     * @param value The value to append.
     *
     * @returns A clone of the HTTP headers object with the value appended to the given header.
     */
    append(name, value) {
        return this.clone({ name, value, op: 'a' });
    }
    /**
     * Sets or modifies a value for a given header in a clone of the original instance.
     * If the header already exists, its value is replaced with the given value
     * in the returned object.
     *
     * @param name The header name.
     * @param value The value or values to set or override for the given header.
     *
     * @returns A clone of the HTTP headers object with the newly set header value.
     */
    set(name, value) {
        return this.clone({ name, value, op: 's' });
    }
    /**
     * Deletes values for a given header in a clone of the original instance.
     *
     * @param name The header name.
     * @param value The value or values to delete for the given header.
     *
     * @returns A clone of the HTTP headers object with the given value deleted.
     */
    delete(name, value) {
        return this.clone({ name, value, op: 'd' });
    }
    maybeSetNormalizedName(name, lcName) {
        if (!this.normalizedNames.has(lcName)) {
            this.normalizedNames.set(lcName, name);
        }
    }
    init() {
        if (!!this.lazyInit) {
            if (this.lazyInit instanceof HttpHeaders) {
                this.copyFrom(this.lazyInit);
            }
            else {
                this.lazyInit();
            }
            this.lazyInit = null;
            if (!!this.lazyUpdate) {
                this.lazyUpdate.forEach((update) => this.applyUpdate(update));
                this.lazyUpdate = null;
            }
        }
    }
    copyFrom(other) {
        other.init();
        Array.from(other.headers.keys()).forEach((key) => {
            this.headers.set(key, other.headers.get(key));
            this.normalizedNames.set(key, other.normalizedNames.get(key));
        });
    }
    clone(update) {
        const clone = new HttpHeaders();
        clone.lazyInit = !!this.lazyInit && this.lazyInit instanceof HttpHeaders ? this.lazyInit : this;
        clone.lazyUpdate = (this.lazyUpdate || []).concat([update]);
        return clone;
    }
    applyUpdate(update) {
        const key = update.name.toLowerCase();
        switch (update.op) {
            case 'a':
            case 's':
                let value = update.value;
                if (typeof value === 'string') {
                    value = [value];
                }
                if (value.length === 0) {
                    return;
                }
                this.maybeSetNormalizedName(update.name, key);
                const base = (update.op === 'a' ? this.headers.get(key) : undefined) || [];
                base.push(...value);
                this.headers.set(key, base);
                break;
            case 'd':
                const toDelete = update.value;
                if (!toDelete) {
                    this.headers.delete(key);
                    this.normalizedNames.delete(key);
                }
                else {
                    let existing = this.headers.get(key);
                    if (!existing) {
                        return;
                    }
                    existing = existing.filter((value) => toDelete.indexOf(value) === -1);
                    if (existing.length === 0) {
                        this.headers.delete(key);
                        this.normalizedNames.delete(key);
                    }
                    else {
                        this.headers.set(key, existing);
                    }
                }
                break;
        }
    }
    setHeaderEntries(name, values) {
        const headerValues = (Array.isArray(values) ? values : [values]).map((value) => value.toString());
        const key = name.toLowerCase();
        this.headers.set(key, headerValues);
        this.maybeSetNormalizedName(name, key);
    }
    /**
     * @internal
     */
    forEach(fn) {
        this.init();
        Array.from(this.normalizedNames.keys()).forEach((key) => fn(this.normalizedNames.get(key), this.headers.get(key)));
    }
}
/**
 * Verifies that the headers object has the right shape: the values
 * must be either strings, numbers or arrays. Throws an error if an invalid
 * header value is present.
 */
function assertValidHeaders(headers) {
    for (const [key, value] of Object.entries(headers)) {
        if (!(typeof value === 'string' || typeof value === 'number') && !Array.isArray(value)) {
            throw new Error(`Unexpected value of the \`${key}\` header provided. ` +
                `Expecting either a string, a number or an array, but got: \`${value}\`.`);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbW1vbi9odHRwL3NyYy9oZWFkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQVFIOzs7Ozs7R0FNRztBQUNILE1BQU0sT0FBTyxXQUFXO0lBdUJ0QixpRUFBaUU7SUFFakUsWUFDRSxPQUFvRjtRQW5CdEY7OztXQUdHO1FBQ0ssb0JBQWUsR0FBd0IsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQU96RDs7V0FFRztRQUNLLGVBQVUsR0FBb0IsSUFBSSxDQUFDO1FBT3pDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNiLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQW9CLENBQUM7UUFDN0MsQ0FBQzthQUFNLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQW9CLENBQUM7Z0JBQzNDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7b0JBQ25DLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hDLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDO3dCQUNkLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO3dCQUNsQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7d0JBQy9CLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO3dCQUMzQyxJQUFJLENB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TyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FDdEQsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBRSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBRSxDQUFDLENBQzNELENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFFRDs7OztHQUlHO0FBQ0gsU0FBUyxrQkFBa0IsQ0FDekIsT0FBMEM7SUFFMUMsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUNuRCxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDdkYsTUFBTSxJQUFJLEtBQUssQ0FDYiw2QkFBNkIsR0FBRyxzQkFBc0I7Z0JBQ3BELCtEQUErRCxLQUFLLEtBQUssQ0FDNUUsQ0FBQztRQUNKLENBQUM7SUFDSCxDQUFDO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbnRlcmZhY2UgVXBkYXRlIHtcbiAgbmFtZTogc3RyaW5nO1xuICB2YWx1ZT86IHN0cmluZyB8IHN0cmluZ1tdO1xuICBvcDogJ2EnIHwgJ3MnIHwgJ2QnO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIGhlYWRlciBjb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIGFuIEhUVFAgcmVxdWVzdC5cbiAqIEluc3RhbmNlcyBhcmUgaW1tdXRhYmxlLiBNb2RpZnlpbmcgbWV0aG9kcyByZXR1cm4gYSBjbG9uZWRcbiAqIGluc3RhbmNlIHdpdGggdGhlIGNoYW5nZS4gVGhlIG9yaWdpbmFsIG9iamVjdCBpcyBuZXZlciBjaGFuZ2VkLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNsYXNzIEh0dHBIZWFkZXJzIHtcbiAgLyoqXG4gICAqIEludGVybmFsIG1hcCBvZiBsb3dlcmNhc2UgaGVhZGVyIG5hbWVzIHRvIHZhbHVlcy5cbiAgICovXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIGhlYWRlcnMhOiBNYXA8c3RyaW5nLCBzdHJpbmdbXT47XG5cbiAgLyoqXG4gICAqIEludGVybmFsIG1hcCBvZiBsb3dlcmNhc2VkIGhlYWRlciBuYW1lcyB0byB0aGUgbm9ybWFsaXplZFxuICAgKiBmb3JtIG9mIHRoZSBuYW1lICh0aGUgZm9ybSBzZWVuIGZpcnN0KS5cbiAgICovXG4gIHByaXZhdGUgbm9ybWFsaXplZE5hbWVzOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xuXG4gIC8qKlxuICAgKiBDb21wbGV0ZSB0aGUgbGF6eSBpbml0aWFsaXphdGlvbiBvZiB0aGlzIG9iamVjdCAobmVlZGVkIGJlZm9yZSByZWFkaW5nKS5cbiAgICovXG4gIHByaXZhdGUgbGF6eUluaXQhOiBIdHRwSGVhZGVycyB8IEZ1bmN0aW9uIHwgbnVsbDtcblxuICAvKipcbiAgICogUXVldWVkIHVwZGF0ZXMgdG8gYmUgbWF0ZXJpYWxpemVkIHRoZSBuZXh0IGluaXRpYWxpemF0aW9uLlxuICAgKi9cbiAgcHJpdmF0ZSBsYXp5VXBkYXRlOiBVcGRhdGVbXSB8IG51bGwgPSBudWxsO1xuXG4gIC8qKiAgQ29uc3RydWN0cyBhIG5ldyBIVFRQIGhlYWRlciBvYmplY3Qgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzLiovXG5cbiAgY29uc3RydWN0b3IoXG4gICAgaGVhZGVycz86IHN0cmluZyB8IHtbbmFtZTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIHwgKHN0cmluZyB8IG51bWJlcilbXX0gfCBIZWFkZXJzLFxuICApIHtcbiAgICBpZiAoIWhlYWRlcnMpIHtcbiAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmdbXT4oKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBoZWFkZXJzID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5sYXp5SW5pdCA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZ1tdPigpO1xuICAgICAgICBoZWFkZXJzLnNwbGl0KCdcXG4nKS5mb3JFYWNoKChsaW5lKSA9PiB7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICAgICAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBuYW1lID0gbGluZS5zbGljZSgwLCBpbmRleCk7XG4gICAgICAgICAgICBjb25zdCBrZXkgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGxpbmUuc2xpY2UoaW5kZXggKyAxKS50cmltKCk7XG4gICAgICAgICAgICB0aGlzLm1heWJlU2V0Tm9ybWFsaXplZE5hbWUobmFtZSwga2V5KTtcbiAgICAgICAgICAgIGlmICh0aGlzLmhlYWRlcnMuaGFzKGtleSkpIHtcbiAgICAgICAgICAgICAgdGhpcy5oZWFkZXJzLmdldChrZXkpIS5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoa2V5LCBbdmFsdWVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBIZWFkZXJzICE9PSAndW5kZWZpbmVkJyAmJiBoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykge1xuICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZ1tdPigpO1xuICAgICAgaGVhZGVycy5mb3JFYWNoKCh2YWx1ZXM6IHN0cmluZywgbmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0SGVhZGVyRW50cmllcyhuYW1lLCB2YWx1ZXMpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGF6eUluaXQgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpIHtcbiAgICAgICAgICBhc3NlcnRWYWxpZEhlYWRlcnMoaGVhZGVycyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZ1tdPigpO1xuICAgICAgICBPYmplY3QuZW50cmllcyhoZWFkZXJzKS5mb3JFYWNoKChbbmFtZSwgdmFsdWVzXSkgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0SGVhZGVyRW50cmllcyhuYW1lLCB2YWx1ZXMpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBmb3IgZXhpc3RlbmNlIG9mIGEgZ2l2ZW4gaGVhZGVyLlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBUaGUgaGVhZGVyIG5hbWUgdG8gY2hlY2sgZm9yIGV4aXN0ZW5jZS5cbiAgICpcbiAgICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgaGVhZGVyIGV4aXN0cywgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cbiAgaGFzKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgcmV0dXJuIHRoaXMuaGVhZGVycy5oYXMobmFtZS50b0xvd2VyQ2FzZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIGZpcnN0IHZhbHVlIG9mIGEgZ2l2ZW4gaGVhZGVyLlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBUaGUgaGVhZGVyIG5hbWUuXG4gICAqXG4gICAqIEByZXR1cm5zIFRoZSB2YWx1ZSBzdHJpbmcgaWYgdGhlIGhlYWRlciBleGlzdHMsIG51bGwgb3RoZXJ3aXNlXG4gICAqL1xuICBnZXQobmFtZTogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgdGhpcy5pbml0KCk7XG5cbiAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLmhlYWRlcnMuZ2V0KG5hbWUudG9Mb3dlckNhc2UoKSk7XG4gICAgcmV0dXJuIHZhbHVlcyAmJiB2YWx1ZXMubGVuZ3RoID4gMCA/IHZhbHVlc1swXSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBuYW1lcyBvZiB0aGUgaGVhZGVycy5cbiAgICpcbiAgICogQHJldHVybnMgQSBsaXN0IG9mIGhlYWRlciBuYW1lcy5cbiAgICovXG4gIGtleXMoKTogc3RyaW5nW10ge1xuICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5ub3JtYWxpemVkTmFtZXMudmFsdWVzKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyBhIGxpc3Qgb2YgdmFsdWVzIGZvciBhIGdpdmVuIGhlYWRlci5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgVGhlIGhlYWRlciBuYW1lIGZyb20gd2hpY2ggdG8gcmV0cmlldmUgdmFsdWVzLlxuICAgKlxuICAgKiBAcmV0dXJucyBBIHN0cmluZyBvZiB2YWx1ZXMgaWYgdGhlIGhlYWRlciBleGlzdHMsIG51bGwgb3RoZXJ3aXNlLlxuICAgKi9cbiAgZ2V0QWxsKG5hbWU6IHN0cmluZyk6IHN0cmluZ1tdIHwgbnVsbCB7XG4gICAgdGhpcy5pbml0KCk7XG5cbiAgICByZXR1cm4gdGhpcy5oZWFkZXJzLmdldChuYW1lLnRvTG93ZXJDYXNlKCkpIHx8IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQXBwZW5kcyBhIG5ldyB2YWx1ZSB0byB0aGUgZXhpc3Rpbmcgc2V0IG9mIHZhbHVlcyBmb3IgYSBoZWFkZXJcbiAgICogYW5kIHJldHVybnMgdGhlbSBpbiBhIGNsb25lIG9mIHRoZSBvcmlnaW5hbCBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgVGhlIGhlYWRlciBuYW1lIGZvciB3aGljaCB0byBhcHBlbmQgdGhlIHZhbHVlcy5cbiAgICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byBhcHBlbmQuXG4gICAqXG4gICAqIEByZXR1cm5zIEEgY2xvbmUgb2YgdGhlIEhUVFAgaGVhZGVycyBvYmplY3Qgd2l0aCB0aGUgdmFsdWUgYXBwZW5kZWQgdG8gdGhlIGdpdmVuIGhlYWRlci5cbiAgICovXG5cbiAgYXBwZW5kKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdKTogSHR0cEhlYWRlcnMge1xuICAgIHJldHVybiB0aGlzLmNsb25lKHtuYW1lLCB2YWx1ZSwgb3A6ICdhJ30pO1xuICB9XG4gIC8qKlxuICAgKiBTZXRzIG9yIG1vZGlmaWVzIGEgdmFsdWUgZm9yIGEgZ2l2ZW4gaGVhZGVyIGluIGEgY2xvbmUgb2YgdGhlIG9yaWdpbmFsIGluc3RhbmNlLlxuICAgKiBJZiB0aGUgaGVhZGVyIGFscmVhZHkgZXhpc3RzLCBpdHMgdmFsdWUgaXMgcmVwbGFjZWQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVcbiAgICogaW4gdGhlIHJldHVybmVkIG9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgVGhlIGhlYWRlciBuYW1lLlxuICAgKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIG9yIHZhbHVlcyB0byBzZXQgb3Igb3ZlcnJpZGUgZm9yIHRoZSBnaXZlbiBoZWFkZXIuXG4gICAqXG4gICAqIEByZXR1cm5zIEEgY2xvbmUgb2YgdGhlIEhUVFAgaGVhZGVycyBvYmplY3Qgd2l0aCB0aGUgbmV3bHkgc2V0IGhlYWRlciB2YWx1ZS5cbiAgICovXG4gIHNldChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSk6IEh0dHBIZWFkZXJzIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSh7bmFtZSwgdmFsdWUsIG9wOiAncyd9KTtcbiAgfVxuICAvKipcbiAgICogRGVsZXRlcyB2YWx1ZXMgZm9yIGEgZ2l2ZW4gaGVhZGVyIGluIGEgY2xvbmUgb2YgdGhlIG9yaWdpbmFsIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBUaGUgaGVhZGVyIG5hbWUuXG4gICAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgb3IgdmFsdWVzIHRvIGRlbGV0ZSBmb3IgdGhlIGdpdmVuIGhlYWRlci5cbiAgICpcbiAgICogQHJldHVybnMgQSBjbG9uZSBvZiB0aGUgSFRUUCBoZWFkZXJzIG9iamVjdCB3aXRoIHRoZSBnaXZlbiB2YWx1ZSBkZWxldGVkLlxuICAgKi9cbiAgZGVsZXRlKG5hbWU6IHN0cmluZywgdmFsdWU/OiBzdHJpbmcgfCBzdHJpbmdbXSk6IEh0dHBIZWFkZXJzIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSh7bmFtZSwgdmFsdWUsIG9wOiAnZCd9KTtcbiAgfVxuXG4gIHByaXZhdGUgbWF5YmVTZXROb3JtYWxpemVkTmFtZShuYW1lOiBzdHJpbmcsIGxjTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm5vcm1hbGl6ZWROYW1lcy5oYXMobGNOYW1lKSkge1xuICAgICAgdGhpcy5ub3JtYWxpemVkTmFtZXMuc2V0KGxjTmFtZSwgbmFtZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCk6IHZvaWQge1xuICAgIGlmICghIXRoaXMubGF6eUluaXQpIHtcbiAgICAgIGlmICh0aGlzLmxhenlJbml0IGluc3RhbmNlb2YgSHR0cEhlYWRlcnMpIHtcbiAgICAgICAgdGhpcy5jb3B5RnJvbSh0aGlzLmxhenlJbml0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubGF6eUluaXQoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubGF6eUluaXQgPSBudWxsO1xuICAgICAgaWYgKCEhdGhpcy5sYXp5VXBkYXRlKSB7XG4gICAgICAgIHRoaXMubGF6eVVwZGF0ZS5mb3JFYWNoKCh1cGRhdGUpID0+IHRoaXMuYXBwbHlVcGRhdGUodXBkYXRlKSk7XG4gICAgICAgIHRoaXMubGF6eVVwZGF0ZSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjb3B5RnJvbShvdGhlcjogSHR0cEhlYWRlcnMpIHtcbiAgICBvdGhlci5pbml0KCk7XG4gICAgQXJyYXkuZnJvbShvdGhlci5oZWFkZXJzLmtleXMoKSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICB0aGlzLmhlYWRlcnMuc2V0KGtleSwgb3RoZXIuaGVhZGVycy5nZXQoa2V5KSEpO1xuICAgICAgdGhpcy5ub3JtYWxpemVkTmFtZXMuc2V0KGtleSwgb3RoZXIubm9ybWFsaXplZE5hbWVzLmdldChrZXkpISk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNsb25lKHVwZGF0ZTogVXBkYXRlKTogSHR0cEhlYWRlcnMge1xuICAgIGNvbnN0IGNsb25lID0gbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgY2xvbmUubGF6eUluaXQgPSAhIXRoaXMubGF6eUluaXQgJiYgdGhpcy5sYXp5SW5pdCBpbnN0YW5jZW9mIEh0dHBIZWFkZXJzID8gdGhpcy5sYXp5SW5pdCA6IHRoaXM7XG4gICAgY2xvbmUubGF6eVVwZGF0ZSA9ICh0aGlzLmxhenlVcGRhdGUgfHwgW10pLmNvbmNhdChbdXBkYXRlXSk7XG4gICAgcmV0dXJuIGNsb25lO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVVwZGF0ZSh1cGRhdGU6IFVwZGF0ZSk6IHZvaWQge1xuICAgIGNvbnN0IGtleSA9IHVwZGF0ZS5uYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgc3dpdGNoICh1cGRhdGUub3ApIHtcbiAgICAgIGNhc2UgJ2EnOlxuICAgICAgY2FzZSAncyc6XG4gICAgICAgIGxldCB2YWx1ZSA9IHVwZGF0ZS52YWx1ZSE7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdmFsdWUgPSBbdmFsdWVdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXliZVNldE5vcm1hbGl6ZWROYW1lKHVwZGF0ZS5uYW1lLCBrZXkpO1xuICAgICAgICBjb25zdCBiYXNlID0gKHVwZGF0ZS5vcCA9PT0gJ2EnID8gdGhpcy5oZWFkZXJzLmdldChrZXkpIDogdW5kZWZpbmVkKSB8fCBbXTtcbiAgICAgICAgYmFzZS5wdXNoKC4uLnZhbHVlKTtcbiAgICAgICAgdGhpcy5oZWFkZXJzLnNldChrZXksIGJhc2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2QnOlxuICAgICAgICBjb25zdCB0b0RlbGV0ZSA9IHVwZGF0ZS52YWx1ZSBhcyBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgIGlmICghdG9EZWxldGUpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuZGVsZXRlKGtleSk7XG4gICAgICAgICAgdGhpcy5ub3JtYWxpemVkTmFtZXMuZGVsZXRlKGtleSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IGV4aXN0aW5nID0gdGhpcy5oZWFkZXJzLmdldChrZXkpO1xuICAgICAgICAgIGlmICghZXhpc3RpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZXhpc3RpbmcgPSBleGlzdGluZy5maWx0ZXIoKHZhbHVlKSA9PiB0b0RlbGV0ZS5pbmRleE9mKHZhbHVlKSA9PT0gLTEpO1xuICAgICAgICAgIGlmIChleGlzdGluZy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVycy5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgIHRoaXMubm9ybWFsaXplZE5hbWVzLmRlbGV0ZShrZXkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KGtleSwgZXhpc3RpbmcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldEhlYWRlckVudHJpZXMobmFtZTogc3RyaW5nLCB2YWx1ZXM6IGFueSkge1xuICAgIGNvbnN0IGhlYWRlclZhbHVlcyA9IChBcnJheS5pc0FycmF5KHZhbHVlcykgPyB2YWx1ZXMgOiBbdmFsdWVzXSkubWFwKCh2YWx1ZSkgPT5cbiAgICAgIHZhbHVlLnRvU3RyaW5nKCksXG4gICAgKTtcbiAgICBjb25zdCBrZXkgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgdGhpcy5oZWFkZXJzLnNldChrZXksIGhlYWRlclZhbHVlcyk7XG4gICAgdGhpcy5tYXliZVNldE5vcm1hbGl6ZWROYW1lKG5hbWUsIGtleSk7XG4gIH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBmb3JFYWNoKGZuOiAobmFtZTogc3RyaW5nLCB2YWx1ZXM6IHN0cmluZ1tdKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgQXJyYXkuZnJvbSh0aGlzLm5vcm1hbGl6ZWROYW1lcy5rZXlzKCkpLmZvckVhY2goKGtleSkgPT5cbiAgICAgIGZuKHRoaXMubm9ybWFsaXplZE5hbWVzLmdldChrZXkpISwgdGhpcy5oZWFkZXJzLmdldChrZXkpISksXG4gICAgKTtcbiAgfVxufVxuXG4vKipcbiAqIFZlcmlmaWVzIHRoYXQgdGhlIGhlYWRlcnMgb2JqZWN0IGhhcyB0aGUgcmlnaHQgc2hhcGU6IHRoZSB2YWx1ZXNcbiAqIG11c3QgYmUgZWl0aGVyIHN0cmluZ3MsIG51bWJlcnMgb3IgYXJyYXlzLiBUaHJvd3MgYW4gZXJyb3IgaWYgYW4gaW52YWxpZFxuICogaGVhZGVyIHZhbHVlIGlzIHByZXNlbnQuXG4gKi9cbmZ1bmN0aW9uIGFzc2VydFZhbGlkSGVhZGVycyhcbiAgaGVhZGVyczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCBIZWFkZXJzLFxuKTogYXNzZXJ0cyBoZWFkZXJzIGlzIFJlY29yZDxzdHJpbmcsIHN0cmluZyB8IHN0cmluZ1tdIHwgbnVtYmVyIHwgbnVtYmVyW10+IHtcbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoaGVhZGVycykpIHtcbiAgICBpZiAoISh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpICYmICFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgVW5leHBlY3RlZCB2YWx1ZSBvZiB0aGUgXFxgJHtrZXl9XFxgIGhlYWRlciBwcm92aWRlZC4gYCArXG4gICAgICAgICAgYEV4cGVjdGluZyBlaXRoZXIgYSBzdHJpbmcsIGEgbnVtYmVyIG9yIGFuIGFycmF5LCBidXQgZ290OiBcXGAke3ZhbHVlfVxcYC5gLFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==