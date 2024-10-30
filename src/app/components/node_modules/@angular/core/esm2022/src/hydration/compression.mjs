/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { REFERENCE_NODE_BODY, REFERENCE_NODE_HOST } from './interfaces';
/**
 * Regexp that extracts a reference node information from the compressed node location.
 * The reference node is represented as either:
 *  - a number which points to an LView slot
 *  - the `b` char which indicates that the lookup should start from the `document.body`
 *  - the `h` char to start lookup from the component host node (`lView[HOST]`)
 */
const REF_EXTRACTOR_REGEXP = new RegExp(`^(\\d+)*(${REFERENCE_NODE_BODY}|${REFERENCE_NODE_HOST})*(.*)`);
/**
 * Helper function that takes a reference node location and a set of navigation steps
 * (from the reference node) to a target node and outputs a string that represents
 * a location.
 *
 * For example, given: referenceNode = 'b' (body) and path = ['firstChild', 'firstChild',
 * 'nextSibling'], the function returns: `bf2n`.
 */
export function compressNodeLocation(referenceNode, path) {
    const result = [referenceNode];
    for (const segment of path) {
        const lastIdx = result.length - 1;
        if (lastIdx > 0 && result[lastIdx - 1] === segment) {
            // An empty string in a count slot represents 1 occurrence of an instruction.
            const value = (result[lastIdx] || 1);
            result[lastIdx] = value + 1;
        }
        else {
            // Adding a new segment to the path.
            // Using an empty string in a counter field to avoid encoding `1`s
            // into the path, since they are implicit (e.g. `f1n1` vs `fn`), so
            // it's enough to have a single char in this case.
            result.push(segment, '');
        }
    }
    return result.join('');
}
/**
 * Helper function that reverts the `compressNodeLocation` and transforms a given
 * string into an array where at 0th position there is a reference node info and
 * after that it contains information (in pairs) about a navigation step and the
 * number of repetitions.
 *
 * For example, the path like 'bf2n' will be transformed to:
 * ['b', 'firstChild', 2, 'nextSibling', 1].
 *
 * This information is later consumed by the code that navigates the DOM to find
 * a given node by its location.
 */
export function decompressNodeLocation(path) {
    const matches = path.match(REF_EXTRACTOR_REGEXP);
    const [_, refNodeId, refNodeName, rest] = matches;
    // If a reference node is represented by an index, transform it to a number.
    const ref = refNodeId ? parseInt(refNodeId, 10) : refNodeName;
    const steps = [];
    // Match all segments in a path.
    for (const [_, step, count] of rest.matchAll(/(f|n)(\d*)/g)) {
        const repeat = parseInt(count, 10) || 1;
        steps.push(step, repeat);
    }
    return [ref, ...steps];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcHJlc3Npb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9oeWRyYXRpb24vY29tcHJlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFxQixtQkFBbUIsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUUxRjs7Ozs7O0dBTUc7QUFDSCxNQUFNLG9CQUFvQixHQUN0QixJQUFJLE1BQU0sQ0FBQyxZQUFZLG1CQUFtQixJQUFJLG1CQUFtQixRQUFRLENBQUMsQ0FBQztBQUUvRTs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxVQUFVLG9CQUFvQixDQUFDLGFBQXFCLEVBQUUsSUFBMEI7SUFDcEYsTUFBTSxNQUFNLEdBQXlCLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDckQsS0FBSyxNQUFNLE9BQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUMzQixNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNsQyxJQUFJLE9BQU8sR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsS0FBSyxPQUFPLEVBQUUsQ0FBQztZQUNuRCw2RUFBNkU7WUFDN0UsTUFBTSxLQUFLLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFXLENBQUM7WUFDL0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDOUIsQ0FBQzthQUFNLENBQUM7WUFDTixvQ0FBb0M7WUFDcEMsa0VBQWtFO1lBQ2xFLG1FQUFtRTtZQUNuRSxrREFBa0Q7WUFDbEQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDM0IsQ0FBQztJQUNILENBQUM7SUFDRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDekIsQ0FBQztBQUVEOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSxVQUFVLHNCQUFzQixDQUFDLElBQVk7SUFFakQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBRSxDQUFDO0lBQ2xELE1BQU0sQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUM7SUFDbEQsNEVBQTRFO0lBQzVFLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO0lBQzlELE1BQU0sS0FBSyxHQUFrQyxFQUFFLENBQUM7SUFDaEQsZ0NBQWdDO0lBQ2hDLEtBQUssTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDO1FBQzVELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBMEIsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBQ0QsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDO0FBQ3pCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOb2RlTmF2aWdhdGlvblN0ZXAsIFJFRkVSRU5DRV9OT0RFX0JPRFksIFJFRkVSRU5DRV9OT0RFX0hPU1R9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbi8qKlxuICogUmVnZXhwIHRoYXQgZXh0cmFjdHMgYSByZWZlcmVuY2Ugbm9kZSBpbmZvcm1hdGlvbiBmcm9tIHRoZSBjb21wcmVzc2VkIG5vZGUgbG9jYXRpb24uXG4gKiBUaGUgcmVmZXJlbmNlIG5vZGUgaXMgcmVwcmVzZW50ZWQgYXMgZWl0aGVyOlxuICogIC0gYSBudW1iZXIgd2hpY2ggcG9pbnRzIHRvIGFuIExWaWV3IHNsb3RcbiAqICAtIHRoZSBgYmAgY2hhciB3aGljaCBpbmRpY2F0ZXMgdGhhdCB0aGUgbG9va3VwIHNob3VsZCBzdGFydCBmcm9tIHRoZSBgZG9jdW1lbnQuYm9keWBcbiAqICAtIHRoZSBgaGAgY2hhciB0byBzdGFydCBsb29rdXAgZnJvbSB0aGUgY29tcG9uZW50IGhvc3Qgbm9kZSAoYGxWaWV3W0hPU1RdYClcbiAqL1xuY29uc3QgUkVGX0VYVFJBQ1RPUl9SRUdFWFAgPVxuICAgIG5ldyBSZWdFeHAoYF4oXFxcXGQrKSooJHtSRUZFUkVOQ0VfTk9ERV9CT0RZfXwke1JFRkVSRU5DRV9OT0RFX0hPU1R9KSooLiopYCk7XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYSByZWZlcmVuY2Ugbm9kZSBsb2NhdGlvbiBhbmQgYSBzZXQgb2YgbmF2aWdhdGlvbiBzdGVwc1xuICogKGZyb20gdGhlIHJlZmVyZW5jZSBub2RlKSB0byBhIHRhcmdldCBub2RlIGFuZCBvdXRwdXRzIGEgc3RyaW5nIHRoYXQgcmVwcmVzZW50c1xuICogYSBsb2NhdGlvbi5cbiAqXG4gKiBGb3IgZXhhbXBsZSwgZ2l2ZW46IHJlZmVyZW5jZU5vZGUgPSAnYicgKGJvZHkpIGFuZCBwYXRoID0gWydmaXJzdENoaWxkJywgJ2ZpcnN0Q2hpbGQnLFxuICogJ25leHRTaWJsaW5nJ10sIHRoZSBmdW5jdGlvbiByZXR1cm5zOiBgYmYybmAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21wcmVzc05vZGVMb2NhdGlvbihyZWZlcmVuY2VOb2RlOiBzdHJpbmcsIHBhdGg6IE5vZGVOYXZpZ2F0aW9uU3RlcFtdKTogc3RyaW5nIHtcbiAgY29uc3QgcmVzdWx0OiBBcnJheTxzdHJpbmd8bnVtYmVyPiA9IFtyZWZlcmVuY2VOb2RlXTtcbiAgZm9yIChjb25zdCBzZWdtZW50IG9mIHBhdGgpIHtcbiAgICBjb25zdCBsYXN0SWR4ID0gcmVzdWx0Lmxlbmd0aCAtIDE7XG4gICAgaWYgKGxhc3RJZHggPiAwICYmIHJlc3VsdFtsYXN0SWR4IC0gMV0gPT09IHNlZ21lbnQpIHtcbiAgICAgIC8vIEFuIGVtcHR5IHN0cmluZyBpbiBhIGNvdW50IHNsb3QgcmVwcmVzZW50cyAxIG9jY3VycmVuY2Ugb2YgYW4gaW5zdHJ1Y3Rpb24uXG4gICAgICBjb25zdCB2YWx1ZSA9IChyZXN1bHRbbGFzdElkeF0gfHwgMSkgYXMgbnVtYmVyO1xuICAgICAgcmVzdWx0W2xhc3RJZHhdID0gdmFsdWUgKyAxO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBBZGRpbmcgYSBuZXcgc2VnbWVudCB0byB0aGUgcGF0aC5cbiAgICAgIC8vIFVzaW5nIGFuIGVtcHR5IHN0cmluZyBpbiBhIGNvdW50ZXIgZmllbGQgdG8gYXZvaWQgZW5jb2RpbmcgYDFgc1xuICAgICAgLy8gaW50byB0aGUgcGF0aCwgc2luY2UgdGhleSBhcmUgaW1wbGljaXQgKGUuZy4gYGYxbjFgIHZzIGBmbmApLCBzb1xuICAgICAgLy8gaXQncyBlbm91Z2ggdG8gaGF2ZSBhIHNpbmdsZSBjaGFyIGluIHRoaXMgY2FzZS5cbiAgICAgIHJlc3VsdC5wdXNoKHNlZ21lbnQsICcnKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdC5qb2luKCcnKTtcbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdGhhdCByZXZlcnRzIHRoZSBgY29tcHJlc3NOb2RlTG9jYXRpb25gIGFuZCB0cmFuc2Zvcm1zIGEgZ2l2ZW5cbiAqIHN0cmluZyBpbnRvIGFuIGFycmF5IHdoZXJlIGF0IDB0aCBwb3NpdGlvbiB0aGVyZSBpcyBhIHJlZmVyZW5jZSBub2RlIGluZm8gYW5kXG4gKiBhZnRlciB0aGF0IGl0IGNvbnRhaW5zIGluZm9ybWF0aW9uIChpbiBwYWlycykgYWJvdXQgYSBuYXZpZ2F0aW9uIHN0ZXAgYW5kIHRoZVxuICogbnVtYmVyIG9mIHJlcGV0aXRpb25zLlxuICpcbiAqIEZvciBleGFtcGxlLCB0aGUgcGF0aCBsaWtlICdiZjJuJyB3aWxsIGJlIHRyYW5zZm9ybWVkIHRvOlxuICogWydiJywgJ2ZpcnN0Q2hpbGQnLCAyLCAnbmV4dFNpYmxpbmcnLCAxXS5cbiAqXG4gKiBUaGlzIGluZm9ybWF0aW9uIGlzIGxhdGVyIGNvbnN1bWVkIGJ5IHRoZSBjb2RlIHRoYXQgbmF2aWdhdGVzIHRoZSBET00gdG8gZmluZFxuICogYSBnaXZlbiBub2RlIGJ5IGl0cyBsb2NhdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlY29tcHJlc3NOb2RlTG9jYXRpb24ocGF0aDogc3RyaW5nKTpcbiAgICBbc3RyaW5nfG51bWJlciwgLi4uKG51bWJlciB8IE5vZGVOYXZpZ2F0aW9uU3RlcClbXV0ge1xuICBjb25zdCBtYXRjaGVzID0gcGF0aC5tYXRjaChSRUZfRVhUUkFDVE9SX1JFR0VYUCkhO1xuICBjb25zdCBbXywgcmVmTm9kZUlkLCByZWZOb2RlTmFtZSwgcmVzdF0gPSBtYXRjaGVzO1xuICAvLyBJZiBhIHJlZmVyZW5jZSBub2RlIGlzIHJlcHJlc2VudGVkIGJ5IGFuIGluZGV4LCB0cmFuc2Zvcm0gaXQgdG8gYSBudW1iZXIuXG4gIGNvbnN0IHJlZiA9IHJlZk5vZGVJZCA/IHBhcnNlSW50KHJlZk5vZGVJZCwgMTApIDogcmVmTm9kZU5hbWU7XG4gIGNvbnN0IHN0ZXBzOiAobnVtYmVyfE5vZGVOYXZpZ2F0aW9uU3RlcClbXSA9IFtdO1xuICAvLyBNYXRjaCBhbGwgc2VnbWVudHMgaW4gYSBwYXRoLlxuICBmb3IgKGNvbnN0IFtfLCBzdGVwLCBjb3VudF0gb2YgcmVzdC5tYXRjaEFsbCgvKGZ8bikoXFxkKikvZykpIHtcbiAgICBjb25zdCByZXBlYXQgPSBwYXJzZUludChjb3VudCwgMTApIHx8IDE7XG4gICAgc3RlcHMucHVzaChzdGVwIGFzIE5vZGVOYXZpZ2F0aW9uU3RlcCwgcmVwZWF0KTtcbiAgfVxuICByZXR1cm4gW3JlZiwgLi4uc3RlcHNdO1xufVxuIl19