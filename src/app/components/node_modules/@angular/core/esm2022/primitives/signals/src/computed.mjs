/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { defaultEquals } from './equality';
import { consumerAfterComputation, consumerBeforeComputation, producerAccessed, producerUpdateValueVersion, REACTIVE_NODE, SIGNAL } from './graph';
/**
 * Create a computed signal which derives a reactive value from an expression.
 */
export function createComputed(computation) {
    const node = Object.create(COMPUTED_NODE);
    node.computation = computation;
    const computed = () => {
        // Check if the value needs updating before returning it.
        producerUpdateValueVersion(node);
        // Record that someone looked at this signal.
        producerAccessed(node);
        if (node.value === ERRORED) {
            throw node.error;
        }
        return node.value;
    };
    computed[SIGNAL] = node;
    return computed;
}
/**
 * A dedicated symbol used before a computed value has been calculated for the first time.
 * Explicitly typed as `any` so we can use it as signal's value.
 */
const UNSET = /* @__PURE__ */ Symbol('UNSET');
/**
 * A dedicated symbol used in place of a computed signal value to indicate that a given computation
 * is in progress. Used to detect cycles in computation chains.
 * Explicitly typed as `any` so we can use it as signal's value.
 */
const COMPUTING = /* @__PURE__ */ Symbol('COMPUTING');
/**
 * A dedicated symbol used in place of a computed signal value to indicate that a given computation
 * failed. The thrown error is cached until the computation gets dirty again.
 * Explicitly typed as `any` so we can use it as signal's value.
 */
const ERRORED = /* @__PURE__ */ Symbol('ERRORED');
// Note: Using an IIFE here to ensure that the spread assignment is not considered
// a side-effect, ending up preserving `COMPUTED_NODE` and `REACTIVE_NODE`.
// TODO: remove when https://github.com/evanw/esbuild/issues/3392 is resolved.
const COMPUTED_NODE = /* @__PURE__ */ (() => {
    return {
        ...REACTIVE_NODE,
        value: UNSET,
        dirty: true,
        error: null,
        equal: defaultEquals,
        producerMustRecompute(node) {
            // Force a recomputation if there's no current value, or if the current value is in the
            // process of being calculated (which should throw an error).
            return node.value === UNSET || node.value === COMPUTING;
        },
        producerRecomputeValue(node) {
            if (node.value === COMPUTING) {
                // Our computation somehow led to a cyclic read of itself.
                throw new Error('Detected cycle in computations.');
            }
            const oldValue = node.value;
            node.value = COMPUTING;
            const prevConsumer = consumerBeforeComputation(node);
            let newValue;
            try {
                newValue = node.computation();
            }
            catch (err) {
                newValue = ERRORED;
                node.error = err;
            }
            finally {
                consumerAfterComputation(node, prevConsumer);
            }
            if (oldValue !== UNSET && oldValue !== ERRORED && newValue !== ERRORED &&
                node.equal(oldValue, newValue)) {
                // No change to `valueVersion` - old and new values are
                // semantically equivalent.
                node.value = oldValue;
                return;
            }
            node.value = newValue;
            node.version++;
        },
    };
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcHV0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3ByaW1pdGl2ZXMvc2lnbmFscy9zcmMvY29tcHV0ZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGFBQWEsRUFBa0IsTUFBTSxZQUFZLENBQUM7QUFDMUQsT0FBTyxFQUFDLHdCQUF3QixFQUFFLHlCQUF5QixFQUFFLGdCQUFnQixFQUFFLDBCQUEwQixFQUFFLGFBQWEsRUFBZ0IsTUFBTSxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBaUMvSjs7R0FFRztBQUNILE1BQU0sVUFBVSxjQUFjLENBQUksV0FBb0I7SUFDcEQsTUFBTSxJQUFJLEdBQW9CLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDM0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFFL0IsTUFBTSxRQUFRLEdBQUcsR0FBRyxFQUFFO1FBQ3BCLHlEQUF5RDtRQUN6RCwwQkFBMEIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVqQyw2Q0FBNkM7UUFDN0MsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkIsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLE9BQU8sRUFBRSxDQUFDO1lBQzNCLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNuQixDQUFDO1FBRUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUMsQ0FBQztJQUNELFFBQThCLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQy9DLE9BQU8sUUFBd0MsQ0FBQztBQUNsRCxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxLQUFLLEdBQVEsZUFBZSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUVuRDs7OztHQUlHO0FBQ0gsTUFBTSxTQUFTLEdBQVEsZUFBZSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUUzRDs7OztHQUlHO0FBQ0gsTUFBTSxPQUFPLEdBQVEsZUFBZSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUV2RCxrRkFBa0Y7QUFDbEYsMkVBQTJFO0FBQzNFLDhFQUE4RTtBQUM5RSxNQUFNLGFBQWEsR0FBRyxlQUFlLENBQUMsQ0FBQyxHQUFHLEVBQUU7SUFDMUMsT0FBTztRQUNMLEdBQUcsYUFBYTtRQUNoQixLQUFLLEVBQUUsS0FBSztRQUNaLEtBQUssRUFBRSxJQUFJO1FBQ1gsS0FBSyxFQUFFLElBQUk7UUFDWCxLQUFLLEVBQUUsYUFBYTtRQUVwQixxQkFBcUIsQ0FBQyxJQUEyQjtZQUMvQyx1RkFBdUY7WUFDdkYsNkRBQTZEO1lBQzdELE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUM7UUFDMUQsQ0FBQztRQUVELHNCQUFzQixDQUFDLElBQTJCO1lBQ2hELElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUUsQ0FBQztnQkFDN0IsMERBQTBEO2dCQUMxRCxNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7WUFDckQsQ0FBQztZQUVELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7WUFFdkIsTUFBTSxZQUFZLEdBQUcseUJBQXlCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckQsSUFBSSxRQUFpQixDQUFDO1lBQ3RCLElBQUksQ0FBQztnQkFDSCxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2hDLENBQUM7WUFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO2dCQUNiLFFBQVEsR0FBRyxPQUFPLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1lBQ25CLENBQUM7b0JBQVMsQ0FBQztnQkFDVCx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDL0MsQ0FBQztZQUVELElBQUksUUFBUSxLQUFLLEtBQUssSUFBSSxRQUFRLEtBQUssT0FBTyxJQUFJLFFBQVEsS0FBSyxPQUFPO2dCQUNsRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDO2dCQUNuQyx1REFBdUQ7Z0JBQ3ZELDJCQUEyQjtnQkFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7Z0JBQ3RCLE9BQU87WUFDVCxDQUFDO1lBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7WUFDdEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2pCLENBQUM7S0FDRixDQUFDO0FBQ0osQ0FBQyxDQUFDLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2RlZmF1bHRFcXVhbHMsIFZhbHVlRXF1YWxpdHlGbn0gZnJvbSAnLi9lcXVhbGl0eSc7XG5pbXBvcnQge2NvbnN1bWVyQWZ0ZXJDb21wdXRhdGlvbiwgY29uc3VtZXJCZWZvcmVDb21wdXRhdGlvbiwgcHJvZHVjZXJBY2Nlc3NlZCwgcHJvZHVjZXJVcGRhdGVWYWx1ZVZlcnNpb24sIFJFQUNUSVZFX05PREUsIFJlYWN0aXZlTm9kZSwgU0lHTkFMfSBmcm9tICcuL2dyYXBoJztcblxuXG4vKipcbiAqIEEgY29tcHV0YXRpb24sIHdoaWNoIGRlcml2ZXMgYSB2YWx1ZSBmcm9tIGEgZGVjbGFyYXRpdmUgcmVhY3RpdmUgZXhwcmVzc2lvbi5cbiAqXG4gKiBgQ29tcHV0ZWRgcyBhcmUgYm90aCBwcm9kdWNlcnMgYW5kIGNvbnN1bWVycyBvZiByZWFjdGl2aXR5LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbXB1dGVkTm9kZTxUPiBleHRlbmRzIFJlYWN0aXZlTm9kZSB7XG4gIC8qKlxuICAgKiBDdXJyZW50IHZhbHVlIG9mIHRoZSBjb21wdXRhdGlvbiwgb3Igb25lIG9mIHRoZSBzZW50aW5lbCB2YWx1ZXMgYWJvdmUgKGBVTlNFVGAsIGBDT01QVVRJTkdgLFxuICAgKiBgRVJST1JgKS5cbiAgICovXG4gIHZhbHVlOiBUO1xuXG4gIC8qKlxuICAgKiBJZiBgdmFsdWVgIGlzIGBFUlJPUkVEYCwgdGhlIGVycm9yIGNhdWdodCBmcm9tIHRoZSBsYXN0IGNvbXB1dGF0aW9uIGF0dGVtcHQgd2hpY2ggd2lsbFxuICAgKiBiZSByZS10aHJvd24uXG4gICAqL1xuICBlcnJvcjogdW5rbm93bjtcblxuICAvKipcbiAgICogVGhlIGNvbXB1dGF0aW9uIGZ1bmN0aW9uIHdoaWNoIHdpbGwgcHJvZHVjZSBhIG5ldyB2YWx1ZS5cbiAgICovXG4gIGNvbXB1dGF0aW9uOiAoKSA9PiBUO1xuXG4gIGVxdWFsOiBWYWx1ZUVxdWFsaXR5Rm48VD47XG59XG5cbmV4cG9ydCB0eXBlIENvbXB1dGVkR2V0dGVyPFQ+ID0gKCgpID0+IFQpJntcbiAgW1NJR05BTF06IENvbXB1dGVkTm9kZTxUPjtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgY29tcHV0ZWQgc2lnbmFsIHdoaWNoIGRlcml2ZXMgYSByZWFjdGl2ZSB2YWx1ZSBmcm9tIGFuIGV4cHJlc3Npb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb21wdXRlZDxUPihjb21wdXRhdGlvbjogKCkgPT4gVCk6IENvbXB1dGVkR2V0dGVyPFQ+IHtcbiAgY29uc3Qgbm9kZTogQ29tcHV0ZWROb2RlPFQ+ID0gT2JqZWN0LmNyZWF0ZShDT01QVVRFRF9OT0RFKTtcbiAgbm9kZS5jb21wdXRhdGlvbiA9IGNvbXB1dGF0aW9uO1xuXG4gIGNvbnN0IGNvbXB1dGVkID0gKCkgPT4ge1xuICAgIC8vIENoZWNrIGlmIHRoZSB2YWx1ZSBuZWVkcyB1cGRhdGluZyBiZWZvcmUgcmV0dXJuaW5nIGl0LlxuICAgIHByb2R1Y2VyVXBkYXRlVmFsdWVWZXJzaW9uKG5vZGUpO1xuXG4gICAgLy8gUmVjb3JkIHRoYXQgc29tZW9uZSBsb29rZWQgYXQgdGhpcyBzaWduYWwuXG4gICAgcHJvZHVjZXJBY2Nlc3NlZChub2RlKTtcblxuICAgIGlmIChub2RlLnZhbHVlID09PSBFUlJPUkVEKSB7XG4gICAgICB0aHJvdyBub2RlLmVycm9yO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlLnZhbHVlO1xuICB9O1xuICAoY29tcHV0ZWQgYXMgQ29tcHV0ZWRHZXR0ZXI8VD4pW1NJR05BTF0gPSBub2RlO1xuICByZXR1cm4gY29tcHV0ZWQgYXMgdW5rbm93biBhcyBDb21wdXRlZEdldHRlcjxUPjtcbn1cblxuLyoqXG4gKiBBIGRlZGljYXRlZCBzeW1ib2wgdXNlZCBiZWZvcmUgYSBjb21wdXRlZCB2YWx1ZSBoYXMgYmVlbiBjYWxjdWxhdGVkIGZvciB0aGUgZmlyc3QgdGltZS5cbiAqIEV4cGxpY2l0bHkgdHlwZWQgYXMgYGFueWAgc28gd2UgY2FuIHVzZSBpdCBhcyBzaWduYWwncyB2YWx1ZS5cbiAqL1xuY29uc3QgVU5TRVQ6IGFueSA9IC8qIEBfX1BVUkVfXyAqLyBTeW1ib2woJ1VOU0VUJyk7XG5cbi8qKlxuICogQSBkZWRpY2F0ZWQgc3ltYm9sIHVzZWQgaW4gcGxhY2Ugb2YgYSBjb21wdXRlZCBzaWduYWwgdmFsdWUgdG8gaW5kaWNhdGUgdGhhdCBhIGdpdmVuIGNvbXB1dGF0aW9uXG4gKiBpcyBpbiBwcm9ncmVzcy4gVXNlZCB0byBkZXRlY3QgY3ljbGVzIGluIGNvbXB1dGF0aW9uIGNoYWlucy5cbiAqIEV4cGxpY2l0bHkgdHlwZWQgYXMgYGFueWAgc28gd2UgY2FuIHVzZSBpdCBhcyBzaWduYWwncyB2YWx1ZS5cbiAqL1xuY29uc3QgQ09NUFVUSU5HOiBhbnkgPSAvKiBAX19QVVJFX18gKi8gU3ltYm9sKCdDT01QVVRJTkcnKTtcblxuLyoqXG4gKiBBIGRlZGljYXRlZCBzeW1ib2wgdXNlZCBpbiBwbGFjZSBvZiBhIGNvbXB1dGVkIHNpZ25hbCB2YWx1ZSB0byBpbmRpY2F0ZSB0aGF0IGEgZ2l2ZW4gY29tcHV0YXRpb25cbiAqIGZhaWxlZC4gVGhlIHRocm93biBlcnJvciBpcyBjYWNoZWQgdW50aWwgdGhlIGNvbXB1dGF0aW9uIGdldHMgZGlydHkgYWdhaW4uXG4gKiBFeHBsaWNpdGx5IHR5cGVkIGFzIGBhbnlgIHNvIHdlIGNhbiB1c2UgaXQgYXMgc2lnbmFsJ3MgdmFsdWUuXG4gKi9cbmNvbnN0IEVSUk9SRUQ6IGFueSA9IC8qIEBfX1BVUkVfXyAqLyBTeW1ib2woJ0VSUk9SRUQnKTtcblxuLy8gTm90ZTogVXNpbmcgYW4gSUlGRSBoZXJlIHRvIGVuc3VyZSB0aGF0IHRoZSBzcHJlYWQgYXNzaWdubWVudCBpcyBub3QgY29uc2lkZXJlZFxuLy8gYSBzaWRlLWVmZmVjdCwgZW5kaW5nIHVwIHByZXNlcnZpbmcgYENPTVBVVEVEX05PREVgIGFuZCBgUkVBQ1RJVkVfTk9ERWAuXG4vLyBUT0RPOiByZW1vdmUgd2hlbiBodHRwczovL2dpdGh1Yi5jb20vZXZhbncvZXNidWlsZC9pc3N1ZXMvMzM5MiBpcyByZXNvbHZlZC5cbmNvbnN0IENPTVBVVEVEX05PREUgPSAvKiBAX19QVVJFX18gKi8gKCgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5SRUFDVElWRV9OT0RFLFxuICAgIHZhbHVlOiBVTlNFVCxcbiAgICBkaXJ0eTogdHJ1ZSxcbiAgICBlcnJvcjogbnVsbCxcbiAgICBlcXVhbDogZGVmYXVsdEVxdWFscyxcblxuICAgIHByb2R1Y2VyTXVzdFJlY29tcHV0ZShub2RlOiBDb21wdXRlZE5vZGU8dW5rbm93bj4pOiBib29sZWFuIHtcbiAgICAgIC8vIEZvcmNlIGEgcmVjb21wdXRhdGlvbiBpZiB0aGVyZSdzIG5vIGN1cnJlbnQgdmFsdWUsIG9yIGlmIHRoZSBjdXJyZW50IHZhbHVlIGlzIGluIHRoZVxuICAgICAgLy8gcHJvY2VzcyBvZiBiZWluZyBjYWxjdWxhdGVkICh3aGljaCBzaG91bGQgdGhyb3cgYW4gZXJyb3IpLlxuICAgICAgcmV0dXJuIG5vZGUudmFsdWUgPT09IFVOU0VUIHx8IG5vZGUudmFsdWUgPT09IENPTVBVVElORztcbiAgICB9LFxuXG4gICAgcHJvZHVjZXJSZWNvbXB1dGVWYWx1ZShub2RlOiBDb21wdXRlZE5vZGU8dW5rbm93bj4pOiB2b2lkIHtcbiAgICAgIGlmIChub2RlLnZhbHVlID09PSBDT01QVVRJTkcpIHtcbiAgICAgICAgLy8gT3VyIGNvbXB1dGF0aW9uIHNvbWVob3cgbGVkIHRvIGEgY3ljbGljIHJlYWQgb2YgaXRzZWxmLlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RldGVjdGVkIGN5Y2xlIGluIGNvbXB1dGF0aW9ucy4nKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgb2xkVmFsdWUgPSBub2RlLnZhbHVlO1xuICAgICAgbm9kZS52YWx1ZSA9IENPTVBVVElORztcblxuICAgICAgY29uc3QgcHJldkNvbnN1bWVyID0gY29uc3VtZXJCZWZvcmVDb21wdXRhdGlvbihub2RlKTtcbiAgICAgIGxldCBuZXdWYWx1ZTogdW5rbm93bjtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ld1ZhbHVlID0gbm9kZS5jb21wdXRhdGlvbigpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gRVJST1JFRDtcbiAgICAgICAgbm9kZS5lcnJvciA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGNvbnN1bWVyQWZ0ZXJDb21wdXRhdGlvbihub2RlLCBwcmV2Q29uc3VtZXIpO1xuICAgICAgfVxuXG4gICAgICBpZiAob2xkVmFsdWUgIT09IFVOU0VUICYmIG9sZFZhbHVlICE9PSBFUlJPUkVEICYmIG5ld1ZhbHVlICE9PSBFUlJPUkVEICYmXG4gICAgICAgICAgbm9kZS5lcXVhbChvbGRWYWx1ZSwgbmV3VmFsdWUpKSB7XG4gICAgICAgIC8vIE5vIGNoYW5nZSB0byBgdmFsdWVWZXJzaW9uYCAtIG9sZCBhbmQgbmV3IHZhbHVlcyBhcmVcbiAgICAgICAgLy8gc2VtYW50aWNhbGx5IGVxdWl2YWxlbnQuXG4gICAgICAgIG5vZGUudmFsdWUgPSBvbGRWYWx1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBub2RlLnZhbHVlID0gbmV3VmFsdWU7XG4gICAgICBub2RlLnZlcnNpb24rKztcbiAgICB9LFxuICB9O1xufSkoKTtcbiJdfQ==