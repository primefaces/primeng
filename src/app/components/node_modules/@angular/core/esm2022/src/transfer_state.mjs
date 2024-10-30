/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { APP_ID, PLATFORM_ID } from './application/application_tokens';
import { inject } from './di/injector_compatibility';
import { ɵɵdefineInjectable } from './di/interface/defs';
import { getDocument } from './render3/interfaces/document';
/**
 * Create a `StateKey<T>` that can be used to store value of type T with `TransferState`.
 *
 * Example:
 *
 * ```
 * const COUNTER_KEY = makeStateKey<number>('counter');
 * let value = 10;
 *
 * transferState.set(COUNTER_KEY, value);
 * ```
 *
 * @publicApi
 */
export function makeStateKey(key) {
    return key;
}
function initTransferState() {
    const transferState = new TransferState();
    if (inject(PLATFORM_ID) === 'browser') {
        transferState.store = retrieveTransferredState(getDocument(), inject(APP_ID));
    }
    return transferState;
}
/**
 * A key value store that is transferred from the application on the server side to the application
 * on the client side.
 *
 * The `TransferState` is available as an injectable token.
 * On the client, just inject this token using DI and use it, it will be lazily initialized.
 * On the server it's already included if `renderApplication` function is used. Otherwise, import
 * the `ServerTransferStateModule` module to make the `TransferState` available.
 *
 * The values in the store are serialized/deserialized using JSON.stringify/JSON.parse. So only
 * boolean, number, string, null and non-class objects will be serialized and deserialized in a
 * non-lossy manner.
 *
 * @publicApi
 */
export class TransferState {
    constructor() {
        /** @internal */
        this.store = {};
        this.onSerializeCallbacks = {};
    }
    /** @nocollapse */
    static { this.ɵprov = 
    /** @pureOrBreakMyCode */ ɵɵdefineInjectable({
        token: TransferState,
        providedIn: 'root',
        factory: initTransferState,
    }); }
    /**
     * Get the value corresponding to a key. Return `defaultValue` if key is not found.
     */
    get(key, defaultValue) {
        return this.store[key] !== undefined ? this.store[key] : defaultValue;
    }
    /**
     * Set the value corresponding to a key.
     */
    set(key, value) {
        this.store[key] = value;
    }
    /**
     * Remove a key from the store.
     */
    remove(key) {
        delete this.store[key];
    }
    /**
     * Test whether a key exists in the store.
     */
    hasKey(key) {
        return this.store.hasOwnProperty(key);
    }
    /**
     * Indicates whether the state is empty.
     */
    get isEmpty() {
        return Object.keys(this.store).length === 0;
    }
    /**
     * Register a callback to provide the value for a key when `toJson` is called.
     */
    onSerialize(key, callback) {
        this.onSerializeCallbacks[key] = callback;
    }
    /**
     * Serialize the current state of the store to JSON.
     */
    toJson() {
        // Call the onSerialize callbacks and put those values into the store.
        for (const key in this.onSerializeCallbacks) {
            if (this.onSerializeCallbacks.hasOwnProperty(key)) {
                try {
                    this.store[key] = this.onSerializeCallbacks[key]();
                }
                catch (e) {
                    console.warn('Exception in onSerialize callback: ', e);
                }
            }
        }
        // Escape script tag to avoid break out of <script> tag in serialized output.
        // Encoding of `<` is the same behaviour as G3 script_builders.
        return JSON.stringify(this.store).replace(/</g, '\\u003C');
    }
}
function retrieveTransferredState(doc, appId) {
    // Locate the script tag with the JSON data transferred from the server.
    // The id of the script tag is set to the Angular appId + 'state'.
    const script = doc.getElementById(appId + '-state');
    if (script?.textContent) {
        try {
            // Avoid using any here as it triggers lint errors in google3 (any is not allowed).
            // Decoding of `<` is done of the box by browsers and node.js, same behaviour as G3
            // script_builders.
            return JSON.parse(script.textContent);
        }
        catch (e) {
            console.warn('Exception while restoring TransferState for app ' + appId, e);
        }
    }
    return {};
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXJfc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy90cmFuc2Zlcl9zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsTUFBTSxFQUFFLFdBQVcsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUNuRCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFxQjFEOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDSCxNQUFNLFVBQVUsWUFBWSxDQUFXLEdBQVc7SUFDaEQsT0FBTyxHQUFrQixDQUFDO0FBQzVCLENBQUM7QUFFRCxTQUFTLGlCQUFpQjtJQUN4QixNQUFNLGFBQWEsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO0lBQzFDLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLFNBQVMsRUFBRSxDQUFDO1FBQ3RDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsd0JBQXdCLENBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVELE9BQU8sYUFBYSxDQUFDO0FBQ3ZCLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILE1BQU0sT0FBTyxhQUFhO0lBQTFCO1FBU0UsZ0JBQWdCO1FBQ2hCLFVBQUssR0FBc0MsRUFBRSxDQUFDO1FBRXRDLHlCQUFvQixHQUE2QyxFQUFFLENBQUM7SUErRDlFLENBQUM7SUExRUMsa0JBQWtCO2FBQ1gsVUFBSztJQUNSLHlCQUF5QixDQUFDLGtCQUFrQixDQUFDO1FBQzNDLEtBQUssRUFBRSxhQUFhO1FBQ3BCLFVBQVUsRUFBRSxNQUFNO1FBQ2xCLE9BQU8sRUFBRSxpQkFBaUI7S0FDM0IsQ0FBQyxBQUxNLENBS0w7SUFPUDs7T0FFRztJQUNILEdBQUcsQ0FBSSxHQUFnQixFQUFFLFlBQWU7UUFDdEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQU0sQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO0lBQzdFLENBQUM7SUFFRDs7T0FFRztJQUNILEdBQUcsQ0FBSSxHQUFnQixFQUFFLEtBQVE7UUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTSxDQUFJLEdBQWdCO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNLENBQUksR0FBZ0I7UUFDeEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLE9BQU87UUFDVCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVyxDQUFJLEdBQWdCLEVBQUUsUUFBaUI7UUFDaEQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNO1FBQ0osc0VBQXNFO1FBQ3RFLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDNUMsSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ2xELElBQUksQ0FBQztvQkFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUNyRCxDQUFDO2dCQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7b0JBQ1gsT0FBTyxDQUFDLElBQUksQ0FBQyxxQ0FBcUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDekQsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBRUQsNkVBQTZFO1FBQzdFLCtEQUErRDtRQUMvRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDN0QsQ0FBQzs7QUFHSCxTQUFTLHdCQUF3QixDQUFDLEdBQWEsRUFBRSxLQUFhO0lBQzVELHdFQUF3RTtJQUN4RSxrRUFBa0U7SUFDbEUsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUM7SUFDcEQsSUFBSSxNQUFNLEVBQUUsV0FBVyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDO1lBQ0gsbUZBQW1GO1lBQ25GLG1GQUFtRjtZQUNuRixtQkFBbUI7WUFDbkIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQU8sQ0FBQztRQUM5QyxDQUFDO1FBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNYLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0RBQWtELEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlFLENBQUM7SUFDSCxDQUFDO0lBRUQsT0FBTyxFQUFFLENBQUM7QUFDWixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7QVBQX0lELCBQTEFURk9STV9JRH0gZnJvbSAnLi9hcHBsaWNhdGlvbi9hcHBsaWNhdGlvbl90b2tlbnMnO1xuaW1wb3J0IHtpbmplY3R9IGZyb20gJy4vZGkvaW5qZWN0b3JfY29tcGF0aWJpbGl0eSc7XG5pbXBvcnQge8m1ybVkZWZpbmVJbmplY3RhYmxlfSBmcm9tICcuL2RpL2ludGVyZmFjZS9kZWZzJztcbmltcG9ydCB7Z2V0RG9jdW1lbnR9IGZyb20gJy4vcmVuZGVyMy9pbnRlcmZhY2VzL2RvY3VtZW50JztcblxuLyoqXG4gKiBBIHR5cGUtc2FmZSBrZXkgdG8gdXNlIHdpdGggYFRyYW5zZmVyU3RhdGVgLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiBjb25zdCBDT1VOVEVSX0tFWSA9IG1ha2VTdGF0ZUtleTxudW1iZXI+KCdjb3VudGVyJyk7XG4gKiBsZXQgdmFsdWUgPSAxMDtcbiAqXG4gKiB0cmFuc2ZlclN0YXRlLnNldChDT1VOVEVSX0tFWSwgdmFsdWUpO1xuICogYGBgXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgdHlwZSBTdGF0ZUtleTxUPiA9IHN0cmluZyZ7XG4gIF9fbm90X2Ffc3RyaW5nOiBuZXZlcixcbiAgX192YWx1ZV90eXBlPzogVCxcbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgYFN0YXRlS2V5PFQ+YCB0aGF0IGNhbiBiZSB1c2VkIHRvIHN0b3JlIHZhbHVlIG9mIHR5cGUgVCB3aXRoIGBUcmFuc2ZlclN0YXRlYC5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYFxuICogY29uc3QgQ09VTlRFUl9LRVkgPSBtYWtlU3RhdGVLZXk8bnVtYmVyPignY291bnRlcicpO1xuICogbGV0IHZhbHVlID0gMTA7XG4gKlxuICogdHJhbnNmZXJTdGF0ZS5zZXQoQ09VTlRFUl9LRVksIHZhbHVlKTtcbiAqIGBgYFxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1ha2VTdGF0ZUtleTxUID0gdm9pZD4oa2V5OiBzdHJpbmcpOiBTdGF0ZUtleTxUPiB7XG4gIHJldHVybiBrZXkgYXMgU3RhdGVLZXk8VD47XG59XG5cbmZ1bmN0aW9uIGluaXRUcmFuc2ZlclN0YXRlKCk6IFRyYW5zZmVyU3RhdGUge1xuICBjb25zdCB0cmFuc2ZlclN0YXRlID0gbmV3IFRyYW5zZmVyU3RhdGUoKTtcbiAgaWYgKGluamVjdChQTEFURk9STV9JRCkgPT09ICdicm93c2VyJykge1xuICAgIHRyYW5zZmVyU3RhdGUuc3RvcmUgPSByZXRyaWV2ZVRyYW5zZmVycmVkU3RhdGUoZ2V0RG9jdW1lbnQoKSwgaW5qZWN0KEFQUF9JRCkpO1xuICB9XG5cbiAgcmV0dXJuIHRyYW5zZmVyU3RhdGU7XG59XG5cbi8qKlxuICogQSBrZXkgdmFsdWUgc3RvcmUgdGhhdCBpcyB0cmFuc2ZlcnJlZCBmcm9tIHRoZSBhcHBsaWNhdGlvbiBvbiB0aGUgc2VydmVyIHNpZGUgdG8gdGhlIGFwcGxpY2F0aW9uXG4gKiBvbiB0aGUgY2xpZW50IHNpZGUuXG4gKlxuICogVGhlIGBUcmFuc2ZlclN0YXRlYCBpcyBhdmFpbGFibGUgYXMgYW4gaW5qZWN0YWJsZSB0b2tlbi5cbiAqIE9uIHRoZSBjbGllbnQsIGp1c3QgaW5qZWN0IHRoaXMgdG9rZW4gdXNpbmcgREkgYW5kIHVzZSBpdCwgaXQgd2lsbCBiZSBsYXppbHkgaW5pdGlhbGl6ZWQuXG4gKiBPbiB0aGUgc2VydmVyIGl0J3MgYWxyZWFkeSBpbmNsdWRlZCBpZiBgcmVuZGVyQXBwbGljYXRpb25gIGZ1bmN0aW9uIGlzIHVzZWQuIE90aGVyd2lzZSwgaW1wb3J0XG4gKiB0aGUgYFNlcnZlclRyYW5zZmVyU3RhdGVNb2R1bGVgIG1vZHVsZSB0byBtYWtlIHRoZSBgVHJhbnNmZXJTdGF0ZWAgYXZhaWxhYmxlLlxuICpcbiAqIFRoZSB2YWx1ZXMgaW4gdGhlIHN0b3JlIGFyZSBzZXJpYWxpemVkL2Rlc2VyaWFsaXplZCB1c2luZyBKU09OLnN0cmluZ2lmeS9KU09OLnBhcnNlLiBTbyBvbmx5XG4gKiBib29sZWFuLCBudW1iZXIsIHN0cmluZywgbnVsbCBhbmQgbm9uLWNsYXNzIG9iamVjdHMgd2lsbCBiZSBzZXJpYWxpemVkIGFuZCBkZXNlcmlhbGl6ZWQgaW4gYVxuICogbm9uLWxvc3N5IG1hbm5lci5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjbGFzcyBUcmFuc2ZlclN0YXRlIHtcbiAgLyoqIEBub2NvbGxhcHNlICovXG4gIHN0YXRpYyDJtXByb3YgPVxuICAgICAgLyoqIEBwdXJlT3JCcmVha015Q29kZSAqLyDJtcm1ZGVmaW5lSW5qZWN0YWJsZSh7XG4gICAgICAgIHRva2VuOiBUcmFuc2ZlclN0YXRlLFxuICAgICAgICBwcm92aWRlZEluOiAncm9vdCcsXG4gICAgICAgIGZhY3Rvcnk6IGluaXRUcmFuc2ZlclN0YXRlLFxuICAgICAgfSk7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBzdG9yZTogUmVjb3JkPHN0cmluZywgdW5rbm93bnx1bmRlZmluZWQ+ID0ge307XG5cbiAgcHJpdmF0ZSBvblNlcmlhbGl6ZUNhbGxiYWNrczoge1trOiBzdHJpbmddOiAoKSA9PiB1bmtub3duIHwgdW5kZWZpbmVkfSA9IHt9O1xuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHZhbHVlIGNvcnJlc3BvbmRpbmcgdG8gYSBrZXkuIFJldHVybiBgZGVmYXVsdFZhbHVlYCBpZiBrZXkgaXMgbm90IGZvdW5kLlxuICAgKi9cbiAgZ2V0PFQ+KGtleTogU3RhdGVLZXk8VD4sIGRlZmF1bHRWYWx1ZTogVCk6IFQge1xuICAgIHJldHVybiB0aGlzLnN0b3JlW2tleV0gIT09IHVuZGVmaW5lZCA/IHRoaXMuc3RvcmVba2V5XSBhcyBUIDogZGVmYXVsdFZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgdmFsdWUgY29ycmVzcG9uZGluZyB0byBhIGtleS5cbiAgICovXG4gIHNldDxUPihrZXk6IFN0YXRlS2V5PFQ+LCB2YWx1ZTogVCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmVba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIGtleSBmcm9tIHRoZSBzdG9yZS5cbiAgICovXG4gIHJlbW92ZTxUPihrZXk6IFN0YXRlS2V5PFQ+KTogdm9pZCB7XG4gICAgZGVsZXRlIHRoaXMuc3RvcmVba2V5XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUZXN0IHdoZXRoZXIgYSBrZXkgZXhpc3RzIGluIHRoZSBzdG9yZS5cbiAgICovXG4gIGhhc0tleTxUPihrZXk6IFN0YXRlS2V5PFQ+KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuaGFzT3duUHJvcGVydHkoa2V5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgc3RhdGUgaXMgZW1wdHkuXG4gICAqL1xuICBnZXQgaXNFbXB0eSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5zdG9yZSkubGVuZ3RoID09PSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGEgY2FsbGJhY2sgdG8gcHJvdmlkZSB0aGUgdmFsdWUgZm9yIGEga2V5IHdoZW4gYHRvSnNvbmAgaXMgY2FsbGVkLlxuICAgKi9cbiAgb25TZXJpYWxpemU8VD4oa2V5OiBTdGF0ZUtleTxUPiwgY2FsbGJhY2s6ICgpID0+IFQpOiB2b2lkIHtcbiAgICB0aGlzLm9uU2VyaWFsaXplQ2FsbGJhY2tzW2tleV0gPSBjYWxsYmFjaztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXJpYWxpemUgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIHN0b3JlIHRvIEpTT04uXG4gICAqL1xuICB0b0pzb24oKTogc3RyaW5nIHtcbiAgICAvLyBDYWxsIHRoZSBvblNlcmlhbGl6ZSBjYWxsYmFja3MgYW5kIHB1dCB0aG9zZSB2YWx1ZXMgaW50byB0aGUgc3RvcmUuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5vblNlcmlhbGl6ZUNhbGxiYWNrcykge1xuICAgICAgaWYgKHRoaXMub25TZXJpYWxpemVDYWxsYmFja3MuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoaXMuc3RvcmVba2V5XSA9IHRoaXMub25TZXJpYWxpemVDYWxsYmFja3Nba2V5XSgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdFeGNlcHRpb24gaW4gb25TZXJpYWxpemUgY2FsbGJhY2s6ICcsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRXNjYXBlIHNjcmlwdCB0YWcgdG8gYXZvaWQgYnJlYWsgb3V0IG9mIDxzY3JpcHQ+IHRhZyBpbiBzZXJpYWxpemVkIG91dHB1dC5cbiAgICAvLyBFbmNvZGluZyBvZiBgPGAgaXMgdGhlIHNhbWUgYmVoYXZpb3VyIGFzIEczIHNjcmlwdF9idWlsZGVycy5cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5zdG9yZSkucmVwbGFjZSgvPC9nLCAnXFxcXHUwMDNDJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmV0cmlldmVUcmFuc2ZlcnJlZFN0YXRlKGRvYzogRG9jdW1lbnQsIGFwcElkOiBzdHJpbmcpOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3dufHVuZGVmaW5lZD4ge1xuICAvLyBMb2NhdGUgdGhlIHNjcmlwdCB0YWcgd2l0aCB0aGUgSlNPTiBkYXRhIHRyYW5zZmVycmVkIGZyb20gdGhlIHNlcnZlci5cbiAgLy8gVGhlIGlkIG9mIHRoZSBzY3JpcHQgdGFnIGlzIHNldCB0byB0aGUgQW5ndWxhciBhcHBJZCArICdzdGF0ZScuXG4gIGNvbnN0IHNjcmlwdCA9IGRvYy5nZXRFbGVtZW50QnlJZChhcHBJZCArICctc3RhdGUnKTtcbiAgaWYgKHNjcmlwdD8udGV4dENvbnRlbnQpIHtcbiAgICB0cnkge1xuICAgICAgLy8gQXZvaWQgdXNpbmcgYW55IGhlcmUgYXMgaXQgdHJpZ2dlcnMgbGludCBlcnJvcnMgaW4gZ29vZ2xlMyAoYW55IGlzIG5vdCBhbGxvd2VkKS5cbiAgICAgIC8vIERlY29kaW5nIG9mIGA8YCBpcyBkb25lIG9mIHRoZSBib3ggYnkgYnJvd3NlcnMgYW5kIG5vZGUuanMsIHNhbWUgYmVoYXZpb3VyIGFzIEczXG4gICAgICAvLyBzY3JpcHRfYnVpbGRlcnMuXG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShzY3JpcHQudGV4dENvbnRlbnQpIGFzIHt9O1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUud2FybignRXhjZXB0aW9uIHdoaWxlIHJlc3RvcmluZyBUcmFuc2ZlclN0YXRlIGZvciBhcHAgJyArIGFwcElkLCBlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge307XG59XG4iXX0=