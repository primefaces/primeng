/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertEqual, assertLessThanOrEqual } from './assert';
/**
 * Determines if the contents of two arrays is identical
 *
 * @param a first array
 * @param b second array
 * @param identityAccessor Optional function for extracting stable object identity from a value in
 *     the array.
 */
export function arrayEquals(a, b, identityAccessor) {
    if (a.length !== b.length)
        return false;
    for (let i = 0; i < a.length; i++) {
        let valueA = a[i];
        let valueB = b[i];
        if (identityAccessor) {
            valueA = identityAccessor(valueA);
            valueB = identityAccessor(valueB);
        }
        if (valueB !== valueA) {
            return false;
        }
    }
    return true;
}
/**
 * Flattens an array.
 */
export function flatten(list) {
    return list.flat(Number.POSITIVE_INFINITY);
}
export function deepForEach(input, fn) {
    input.forEach(value => Array.isArray(value) ? deepForEach(value, fn) : fn(value));
}
export function addToArray(arr, index, value) {
    // perf: array.push is faster than array.splice!
    if (index >= arr.length) {
        arr.push(value);
    }
    else {
        arr.splice(index, 0, value);
    }
}
export function removeFromArray(arr, index) {
    // perf: array.pop is faster than array.splice!
    if (index >= arr.length - 1) {
        return arr.pop();
    }
    else {
        return arr.splice(index, 1)[0];
    }
}
export function newArray(size, value) {
    const list = [];
    for (let i = 0; i < size; i++) {
        list.push(value);
    }
    return list;
}
/**
 * Remove item from array (Same as `Array.splice()` but faster.)
 *
 * `Array.splice()` is not as fast because it has to allocate an array for the elements which were
 * removed. This causes memory pressure and slows down code when most of the time we don't
 * care about the deleted items array.
 *
 * https://jsperf.com/fast-array-splice (About 20x faster)
 *
 * @param array Array to splice
 * @param index Index of element in array to remove.
 * @param count Number of items to remove.
 */
export function arraySplice(array, index, count) {
    const length = array.length - count;
    while (index < length) {
        array[index] = array[index + count];
        index++;
    }
    while (count--) {
        array.pop(); // shrink the array
    }
}
/**
 * Same as `Array.splice(index, 0, value)` but faster.
 *
 * `Array.splice()` is not fast because it has to allocate an array for the elements which were
 * removed. This causes memory pressure and slows down code when most of the time we don't
 * care about the deleted items array.
 *
 * @param array Array to splice.
 * @param index Index in array where the `value` should be added.
 * @param value Value to add to array.
 */
export function arrayInsert(array, index, value) {
    ngDevMode && assertLessThanOrEqual(index, array.length, 'Can\'t insert past array end.');
    let end = array.length;
    while (end > index) {
        const previousEnd = end - 1;
        array[end] = array[previousEnd];
        end = previousEnd;
    }
    array[index] = value;
}
/**
 * Same as `Array.splice2(index, 0, value1, value2)` but faster.
 *
 * `Array.splice()` is not fast because it has to allocate an array for the elements which were
 * removed. This causes memory pressure and slows down code when most of the time we don't
 * care about the deleted items array.
 *
 * @param array Array to splice.
 * @param index Index in array where the `value` should be added.
 * @param value1 Value to add to array.
 * @param value2 Value to add to array.
 */
export function arrayInsert2(array, index, value1, value2) {
    ngDevMode && assertLessThanOrEqual(index, array.length, 'Can\'t insert past array end.');
    let end = array.length;
    if (end == index) {
        // inserting at the end.
        array.push(value1, value2);
    }
    else if (end === 1) {
        // corner case when we have less items in array than we have items to insert.
        array.push(value2, array[0]);
        array[0] = value1;
    }
    else {
        end--;
        array.push(array[end - 1], array[end]);
        while (end > index) {
            const previousEnd = end - 2;
            array[end] = array[previousEnd];
            end--;
        }
        array[index] = value1;
        array[index + 1] = value2;
    }
}
/**
 * Get an index of an `value` in a sorted `array`.
 *
 * NOTE:
 * - This uses binary search algorithm for fast removals.
 *
 * @param array A sorted array to binary search.
 * @param value The value to look for.
 * @returns index of the value.
 *   - positive index if value found.
 *   - negative index if value not found. (`~index` to get the value where it should have been
 *     located)
 */
export function arrayIndexOfSorted(array, value) {
    return _arrayIndexOfSorted(array, value, 0);
}
/**
 * Set a `value` for a `key`.
 *
 * @param keyValueArray to modify.
 * @param key The key to locate or create.
 * @param value The value to set for a `key`.
 * @returns index (always even) of where the value vas set.
 */
export function keyValueArraySet(keyValueArray, key, value) {
    let index = keyValueArrayIndexOf(keyValueArray, key);
    if (index >= 0) {
        // if we found it set it.
        keyValueArray[index | 1] = value;
    }
    else {
        index = ~index;
        arrayInsert2(keyValueArray, index, key, value);
    }
    return index;
}
/**
 * Retrieve a `value` for a `key` (on `undefined` if not found.)
 *
 * @param keyValueArray to search.
 * @param key The key to locate.
 * @return The `value` stored at the `key` location or `undefined if not found.
 */
export function keyValueArrayGet(keyValueArray, key) {
    const index = keyValueArrayIndexOf(keyValueArray, key);
    if (index >= 0) {
        // if we found it retrieve it.
        return keyValueArray[index | 1];
    }
    return undefined;
}
/**
 * Retrieve a `key` index value in the array or `-1` if not found.
 *
 * @param keyValueArray to search.
 * @param key The key to locate.
 * @returns index of where the key is (or should have been.)
 *   - positive (even) index if key found.
 *   - negative index if key not found. (`~index` (even) to get the index where it should have
 *     been inserted.)
 */
export function keyValueArrayIndexOf(keyValueArray, key) {
    return _arrayIndexOfSorted(keyValueArray, key, 1);
}
/**
 * Delete a `key` (and `value`) from the `KeyValueArray`.
 *
 * @param keyValueArray to modify.
 * @param key The key to locate or delete (if exist).
 * @returns index of where the key was (or should have been.)
 *   - positive (even) index if key found and deleted.
 *   - negative index if key not found. (`~index` (even) to get the index where it should have
 *     been.)
 */
export function keyValueArrayDelete(keyValueArray, key) {
    const index = keyValueArrayIndexOf(keyValueArray, key);
    if (index >= 0) {
        // if we found it remove it.
        arraySplice(keyValueArray, index, 2);
    }
    return index;
}
/**
 * INTERNAL: Get an index of an `value` in a sorted `array` by grouping search by `shift`.
 *
 * NOTE:
 * - This uses binary search algorithm for fast removals.
 *
 * @param array A sorted array to binary search.
 * @param value The value to look for.
 * @param shift grouping shift.
 *   - `0` means look at every location
 *   - `1` means only look at every other (even) location (the odd locations are to be ignored as
 *         they are values.)
 * @returns index of the value.
 *   - positive index if value found.
 *   - negative index if value not found. (`~index` to get the value where it should have been
 * inserted)
 */
function _arrayIndexOfSorted(array, value, shift) {
    ngDevMode && assertEqual(Array.isArray(array), true, 'Expecting an array');
    let start = 0;
    let end = array.length >> shift;
    while (end !== start) {
        const middle = start + ((end - start) >> 1); // find the middle.
        const current = array[middle << shift];
        if (value === current) {
            return (middle << shift);
        }
        else if (current > value) {
            end = middle;
        }
        else {
            start = middle + 1; // We already searched middle so make it non-inclusive by adding 1
        }
    }
    return ~(end << shift);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy91dGlsL2FycmF5X3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxXQUFXLEVBQUUscUJBQXFCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFFNUQ7Ozs7Ozs7R0FPRztBQUNILE1BQU0sVUFBVSxXQUFXLENBQUksQ0FBTSxFQUFFLENBQU0sRUFBRSxnQkFBd0M7SUFDckYsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxNQUFNO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDeEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNsQyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztZQUNyQixNQUFNLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxDQUFRLENBQUM7WUFDekMsTUFBTSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBUSxDQUFDO1FBQzNDLENBQUM7UUFDRCxJQUFJLE1BQU0sS0FBSyxNQUFNLEVBQUUsQ0FBQztZQUN0QixPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7SUFDSCxDQUFDO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLFVBQVUsT0FBTyxDQUFDLElBQVc7SUFDakMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQzdDLENBQUM7QUFFRCxNQUFNLFVBQVUsV0FBVyxDQUFJLEtBQWtC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UUFDZiw0QkFBNEI7UUFDNUIsV0FBVyxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUdEOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsU0FBUyxtQkFBbUIsQ0FBQyxLQUFlLEVBQUUsS0FBYSxFQUFFLEtBQWE7SUFDeEUsU0FBUyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0lBQzNFLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNkLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDO0lBQ2hDLE9BQU8sR0FBRyxLQUFLLEtBQUssRUFBRSxDQUFDO1FBQ3JCLE1BQU0sTUFBTSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUUsbUJBQW1CO1FBQ2pFLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLENBQUM7UUFDdkMsSUFBSSxLQUFLLEtBQUssT0FBTyxFQUFFLENBQUM7WUFDdEIsT0FBTyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBQztRQUMzQixDQUFDO2FBQU0sSUFBSSxPQUFPLEdBQUcsS0FBSyxFQUFFLENBQUM7WUFDM0IsR0FBRyxHQUFHLE1BQU0sQ0FBQztRQUNmLENBQUM7YUFBTSxDQUFDO1lBQ04sS0FBSyxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBRSxrRUFBa0U7UUFDekYsQ0FBQztJQUNILENBQUM7SUFDRCxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLENBQUM7QUFDekIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2Fzc2VydEVxdWFsLCBhc3NlcnRMZXNzVGhhbk9yRXF1YWx9IGZyb20gJy4vYXNzZXJ0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHRoZSBjb250ZW50cyBvZiB0d28gYXJyYXlzIGlzIGlkZW50aWNhbFxuICpcbiAqIEBwYXJhbSBhIGZpcnN0IGFycmF5XG4gKiBAcGFyYW0gYiBzZWNvbmQgYXJyYXlcbiAqIEBwYXJhbSBpZGVudGl0eUFjY2Vzc29yIE9wdGlvbmFsIGZ1bmN0aW9uIGZvciBleHRyYWN0aW5nIHN0YWJsZSBvYmplY3QgaWRlbnRpdHkgZnJvbSBhIHZhbHVlIGluXG4gKiAgICAgdGhlIGFycmF5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlFcXVhbHM8VD4oYTogVFtdLCBiOiBUW10sIGlkZW50aXR5QWNjZXNzb3I/OiAodmFsdWU6IFQpID0+IHVua25vd24pOiBib29sZWFuIHtcbiAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgdmFsdWVBID0gYVtpXTtcbiAgICBsZXQgdmFsdWVCID0gYltpXTtcbiAgICBpZiAoaWRlbnRpdHlBY2Nlc3Nvcikge1xuICAgICAgdmFsdWVBID0gaWRlbnRpdHlBY2Nlc3Nvcih2YWx1ZUEpIGFzIGFueTtcbiAgICAgIHZhbHVlQiA9IGlkZW50aXR5QWNjZXNzb3IodmFsdWVCKSBhcyBhbnk7XG4gICAgfVxuICAgIGlmICh2YWx1ZUIgIT09IHZhbHVlQSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBGbGF0dGVucyBhbiBhcnJheS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW4obGlzdDogYW55W10pOiBhbnlbXSB7XG4gIHJldHVybiBsaXN0LmZsYXQoTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZXBGb3JFYWNoPFQ+KGlucHV0OiAoVHxhbnlbXSlbXSwgZm46ICh2YWx1ZTogVCkgPT4gdm9pZCk6IHZvaWQge1xuICBpbnB1dC5mb3JFYWNoKHZhbHVlID0+IEFycmF5LmlzQXJyYXkodmFsdWUpID8gZGVlcEZvckVhY2godmFsdWUsIGZuKSA6IGZuKHZhbHVlKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRUb0FycmF5KGFycjogYW55W10sIGluZGV4OiBudW1iZXIsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgLy8gcGVyZjogYXJyYXkucHVzaCBpcyBmYXN0ZXIgdGhhbiBhcnJheS5zcGxpY2UhXG4gIGlmIChpbmRleCA+PSBhcnIubGVuZ3RoKSB7XG4gICAgYXJyLnB1c2godmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIGFyci5zcGxpY2UoaW5kZXgsIDAsIHZhbHVlKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRnJvbUFycmF5KGFycjogYW55W10sIGluZGV4OiBudW1iZXIpOiBhbnkge1xuICAvLyBwZXJmOiBhcnJheS5wb3AgaXMgZmFzdGVyIHRoYW4gYXJyYXkuc3BsaWNlIVxuICBpZiAoaW5kZXggPj0gYXJyLmxlbmd0aCAtIDEpIHtcbiAgICByZXR1cm4gYXJyLnBvcCgpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBhcnIuc3BsaWNlKGluZGV4LCAxKVswXTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbmV3QXJyYXk8VCA9IGFueT4oc2l6ZTogbnVtYmVyKTogVFtdO1xuZXhwb3J0IGZ1bmN0aW9uIG5ld0FycmF5PFQ+KHNpemU6IG51bWJlciwgdmFsdWU6IFQpOiBUW107XG5leHBvcnQgZnVuY3Rpb24gbmV3QXJyYXk8VD4oc2l6ZTogbnVtYmVyLCB2YWx1ZT86IFQpOiBUW10ge1xuICBjb25zdCBsaXN0OiBUW10gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICBsaXN0LnB1c2godmFsdWUhKTtcbiAgfVxuICByZXR1cm4gbGlzdDtcbn1cblxuLyoqXG4gKiBSZW1vdmUgaXRlbSBmcm9tIGFycmF5IChTYW1lIGFzIGBBcnJheS5zcGxpY2UoKWAgYnV0IGZhc3Rlci4pXG4gKlxuICogYEFycmF5LnNwbGljZSgpYCBpcyBub3QgYXMgZmFzdCBiZWNhdXNlIGl0IGhhcyB0byBhbGxvY2F0ZSBhbiBhcnJheSBmb3IgdGhlIGVsZW1lbnRzIHdoaWNoIHdlcmVcbiAqIHJlbW92ZWQuIFRoaXMgY2F1c2VzIG1lbW9yeSBwcmVzc3VyZSBhbmQgc2xvd3MgZG93biBjb2RlIHdoZW4gbW9zdCBvZiB0aGUgdGltZSB3ZSBkb24ndFxuICogY2FyZSBhYm91dCB0aGUgZGVsZXRlZCBpdGVtcyBhcnJheS5cbiAqXG4gKiBodHRwczovL2pzcGVyZi5jb20vZmFzdC1hcnJheS1zcGxpY2UgKEFib3V0IDIweCBmYXN0ZXIpXG4gKlxuICogQHBhcmFtIGFycmF5IEFycmF5IHRvIHNwbGljZVxuICogQHBhcmFtIGluZGV4IEluZGV4IG9mIGVsZW1lbnQgaW4gYXJyYXkgdG8gcmVtb3ZlLlxuICogQHBhcmFtIGNvdW50IE51bWJlciBvZiBpdGVtcyB0byByZW1vdmUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcnJheVNwbGljZShhcnJheTogYW55W10sIGluZGV4OiBudW1iZXIsIGNvdW50OiBudW1iZXIpOiB2b2lkIHtcbiAgY29uc3QgbGVuZ3RoID0gYXJyYXkubGVuZ3RoIC0gY291bnQ7XG4gIHdoaWxlIChpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W2luZGV4XSA9IGFycmF5W2luZGV4ICsgY291bnRdO1xuICAgIGluZGV4Kys7XG4gIH1cbiAgd2hpbGUgKGNvdW50LS0pIHtcbiAgICBhcnJheS5wb3AoKTsgIC8vIHNocmluayB0aGUgYXJyYXlcbiAgfVxufVxuXG4vKipcbiAqIFNhbWUgYXMgYEFycmF5LnNwbGljZShpbmRleCwgMCwgdmFsdWUpYCBidXQgZmFzdGVyLlxuICpcbiAqIGBBcnJheS5zcGxpY2UoKWAgaXMgbm90IGZhc3QgYmVjYXVzZSBpdCBoYXMgdG8gYWxsb2NhdGUgYW4gYXJyYXkgZm9yIHRoZSBlbGVtZW50cyB3aGljaCB3ZXJlXG4gKiByZW1vdmVkLiBUaGlzIGNhdXNlcyBtZW1vcnkgcHJlc3N1cmUgYW5kIHNsb3dzIGRvd24gY29kZSB3aGVuIG1vc3Qgb2YgdGhlIHRpbWUgd2UgZG9uJ3RcbiAqIGNhcmUgYWJvdXQgdGhlIGRlbGV0ZWQgaXRlbXMgYXJyYXkuXG4gKlxuICogQHBhcmFtIGFycmF5IEFycmF5IHRvIHNwbGljZS5cbiAqIEBwYXJhbSBpbmRleCBJbmRleCBpbiBhcnJheSB3aGVyZSB0aGUgYHZhbHVlYCBzaG91bGQgYmUgYWRkZWQuXG4gKiBAcGFyYW0gdmFsdWUgVmFsdWUgdG8gYWRkIHRvIGFycmF5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlJbnNlcnQoYXJyYXk6IGFueVtdLCBpbmRleDogbnVtYmVyLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnRMZXNzVGhhbk9yRXF1YWwoaW5kZXgsIGFycmF5Lmxlbmd0aCwgJ0NhblxcJ3QgaW5zZXJ0IHBhc3QgYXJyYXkgZW5kLicpO1xuICBsZXQgZW5kID0gYXJyYXkubGVuZ3RoO1xuICB3aGlsZSAoZW5kID4gaW5kZXgpIHtcbiAgICBjb25zdCBwcmV2aW91c0VuZCA9IGVuZCAtIDE7XG4gICAgYXJyYXlbZW5kXSA9IGFycmF5W3ByZXZpb3VzRW5kXTtcbiAgICBlbmQgPSBwcmV2aW91c0VuZDtcbiAgfVxuICBhcnJheVtpbmRleF0gPSB2YWx1ZTtcbn1cblxuLyoqXG4gKiBTYW1lIGFzIGBBcnJheS5zcGxpY2UyKGluZGV4LCAwLCB2YWx1ZTEsIHZhbHVlMilgIGJ1dCBmYXN0ZXIuXG4gKlxuICogYEFycmF5LnNwbGljZSgpYCBpcyBub3QgZmFzdCBiZWNhdXNlIGl0IGhhcyB0byBhbGxvY2F0ZSBhbiBhcnJheSBmb3IgdGhlIGVsZW1lbnRzIHdoaWNoIHdlcmVcbiAqIHJlbW92ZWQuIFRoaXMgY2F1c2VzIG1lbW9yeSBwcmVzc3VyZSBhbmQgc2xvd3MgZG93biBjb2RlIHdoZW4gbW9zdCBvZiB0aGUgdGltZSB3ZSBkb24ndFxuICogY2FyZSBhYm91dCB0aGUgZGVsZXRlZCBpdGVtcyBhcnJheS5cbiAqXG4gKiBAcGFyYW0gYXJyYXkgQXJyYXkgdG8gc3BsaWNlLlxuICogQHBhcmFtIGluZGV4IEluZGV4IGluIGFycmF5IHdoZXJlIHRoZSBgdmFsdWVgIHNob3VsZCBiZSBhZGRlZC5cbiAqIEBwYXJhbSB2YWx1ZTEgVmFsdWUgdG8gYWRkIHRvIGFycmF5LlxuICogQHBhcmFtIHZhbHVlMiBWYWx1ZSB0byBhZGQgdG8gYXJyYXkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcnJheUluc2VydDIoYXJyYXk6IGFueVtdLCBpbmRleDogbnVtYmVyLCB2YWx1ZTE6IGFueSwgdmFsdWUyOiBhbnkpOiB2b2lkIHtcbiAgbmdEZXZNb2RlICYmIGFzc2VydExlc3NUaGFuT3JFcXVhbChpbmRleCwgYXJyYXkubGVuZ3RoLCAnQ2FuXFwndCBpbnNlcnQgcGFzdCBhcnJheSBlbmQuJyk7XG4gIGxldCBlbmQgPSBhcnJheS5sZW5ndGg7XG4gIGlmIChlbmQgPT0gaW5kZXgpIHtcbiAgICAvLyBpbnNlcnRpbmcgYXQgdGhlIGVuZC5cbiAgICBhcnJheS5wdXNoKHZhbHVlMSwgdmFsdWUyKTtcbiAgfSBlbHNlIGlmIChlbmQgPT09IDEpIHtcbiAgICAvLyBjb3JuZXIgY2FzZSB3aGVuIHdlIGhhdmUgbGVzcyBpdGVtcyBpbiBhcnJheSB0aGFuIHdlIGhhdmUgaXRlbXMgdG8gaW5zZXJ0LlxuICAgIGFycmF5LnB1c2godmFsdWUyLCBhcnJheVswXSk7XG4gICAgYXJyYXlbMF0gPSB2YWx1ZTE7XG4gIH0gZWxzZSB7XG4gICAgZW5kLS07XG4gICAgYXJyYXkucHVzaChhcnJheVtlbmQgLSAxXSwgYXJyYXlbZW5kXSk7XG4gICAgd2hpbGUgKGVuZCA+IGluZGV4KSB7XG4gICAgICBjb25zdCBwcmV2aW91c0VuZCA9IGVuZCAtIDI7XG4gICAgICBhcnJheVtlbmRdID0gYXJyYXlbcHJldmlvdXNFbmRdO1xuICAgICAgZW5kLS07XG4gICAgfVxuICAgIGFycmF5W2luZGV4XSA9IHZhbHVlMTtcbiAgICBhcnJheVtpbmRleCArIDFdID0gdmFsdWUyO1xuICB9XG59XG5cblxuLyoqXG4gKiBHZXQgYW4gaW5kZXggb2YgYW4gYHZhbHVlYCBpbiBhIHNvcnRlZCBgYXJyYXlgLlxuICpcbiAqIE5PVEU6XG4gKiAtIFRoaXMgdXNlcyBiaW5hcnkgc2VhcmNoIGFsZ29yaXRobSBmb3IgZmFzdCByZW1vdmFscy5cbiAqXG4gKiBAcGFyYW0gYXJyYXkgQSBzb3J0ZWQgYXJyYXkgdG8gYmluYXJ5IHNlYXJjaC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gbG9vayBmb3IuXG4gKiBAcmV0dXJucyBpbmRleCBvZiB0aGUgdmFsdWUuXG4gKiAgIC0gcG9zaXRpdmUgaW5kZXggaWYgdmFsdWUgZm91bmQuXG4gKiAgIC0gbmVnYXRpdmUgaW5kZXggaWYgdmFsdWUgbm90IGZvdW5kLiAoYH5pbmRleGAgdG8gZ2V0IHRoZSB2YWx1ZSB3aGVyZSBpdCBzaG91bGQgaGF2ZSBiZWVuXG4gKiAgICAgbG9jYXRlZClcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFycmF5SW5kZXhPZlNvcnRlZChhcnJheTogc3RyaW5nW10sIHZhbHVlOiBzdHJpbmcpOiBudW1iZXIge1xuICByZXR1cm4gX2FycmF5SW5kZXhPZlNvcnRlZChhcnJheSwgdmFsdWUsIDApO1xufVxuXG5cbi8qKlxuICogYEtleVZhbHVlQXJyYXlgIGlzIGFuIGFycmF5IHdoZXJlIGV2ZW4gcG9zaXRpb25zIGNvbnRhaW4ga2V5cyBhbmQgb2RkIHBvc2l0aW9ucyBjb250YWluIHZhbHVlcy5cbiAqXG4gKiBgS2V5VmFsdWVBcnJheWAgcHJvdmlkZXMgYSB2ZXJ5IGVmZmljaWVudCB3YXkgb2YgaXRlcmF0aW5nIG92ZXIgaXRzIGNvbnRlbnRzLiBGb3Igc21hbGxcbiAqIHNldHMgKH4xMCkgdGhlIGNvc3Qgb2YgYmluYXJ5IHNlYXJjaGluZyBhbiBgS2V5VmFsdWVBcnJheWAgaGFzIGFib3V0IHRoZSBzYW1lIHBlcmZvcm1hbmNlXG4gKiBjaGFyYWN0ZXJpc3RpY3MgdGhhdCBvZiBhIGBNYXBgIHdpdGggc2lnbmlmaWNhbnRseSBiZXR0ZXIgbWVtb3J5IGZvb3RwcmludC5cbiAqXG4gKiBJZiB1c2VkIGFzIGEgYE1hcGAgdGhlIGtleXMgYXJlIHN0b3JlZCBpbiBhbHBoYWJldGljYWwgb3JkZXIgc28gdGhhdCB0aGV5IGNhbiBiZSBiaW5hcnkgc2VhcmNoZWRcbiAqIGZvciByZXRyaWV2YWwuXG4gKlxuICogU2VlOiBga2V5VmFsdWVBcnJheVNldGAsIGBrZXlWYWx1ZUFycmF5R2V0YCwgYGtleVZhbHVlQXJyYXlJbmRleE9mYCwgYGtleVZhbHVlQXJyYXlEZWxldGVgLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEtleVZhbHVlQXJyYXk8VkFMVUU+IGV4dGVuZHMgQXJyYXk8VkFMVUV8c3RyaW5nPiB7XG4gIF9fYnJhbmRfXzogJ2FycmF5LW1hcCc7XG59XG5cbi8qKlxuICogU2V0IGEgYHZhbHVlYCBmb3IgYSBga2V5YC5cbiAqXG4gKiBAcGFyYW0ga2V5VmFsdWVBcnJheSB0byBtb2RpZnkuXG4gKiBAcGFyYW0ga2V5IFRoZSBrZXkgdG8gbG9jYXRlIG9yIGNyZWF0ZS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0IGZvciBhIGBrZXlgLlxuICogQHJldHVybnMgaW5kZXggKGFsd2F5cyBldmVuKSBvZiB3aGVyZSB0aGUgdmFsdWUgdmFzIHNldC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGtleVZhbHVlQXJyYXlTZXQ8Vj4oXG4gICAga2V5VmFsdWVBcnJheTogS2V5VmFsdWVBcnJheTxWPiwga2V5OiBzdHJpbmcsIHZhbHVlOiBWKTogbnVtYmVyIHtcbiAgbGV0IGluZGV4ID0ga2V5VmFsdWVBcnJheUluZGV4T2Yoa2V5VmFsdWVBcnJheSwga2V5KTtcbiAgaWYgKGluZGV4ID49IDApIHtcbiAgICAvLyBpZiB3ZSBmb3VuZCBpdCBzZXQgaXQuXG4gICAga2V5VmFsdWVBcnJheVtpbmRleCB8IDFdID0gdmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgaW5kZXggPSB+aW5kZXg7XG4gICAgYXJyYXlJbnNlcnQyKGtleVZhbHVlQXJyYXksIGluZGV4LCBrZXksIHZhbHVlKTtcbiAgfVxuICByZXR1cm4gaW5kZXg7XG59XG5cbi8qKlxuICogUmV0cmlldmUgYSBgdmFsdWVgIGZvciBhIGBrZXlgIChvbiBgdW5kZWZpbmVkYCBpZiBub3QgZm91bmQuKVxuICpcbiAqIEBwYXJhbSBrZXlWYWx1ZUFycmF5IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSBrZXkgVGhlIGtleSB0byBsb2NhdGUuXG4gKiBAcmV0dXJuIFRoZSBgdmFsdWVgIHN0b3JlZCBhdCB0aGUgYGtleWAgbG9jYXRpb24gb3IgYHVuZGVmaW5lZCBpZiBub3QgZm91bmQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBrZXlWYWx1ZUFycmF5R2V0PFY+KGtleVZhbHVlQXJyYXk6IEtleVZhbHVlQXJyYXk8Vj4sIGtleTogc3RyaW5nKTogVnx1bmRlZmluZWQge1xuICBjb25zdCBpbmRleCA9IGtleVZhbHVlQXJyYXlJbmRleE9mKGtleVZhbHVlQXJyYXksIGtleSk7XG4gIGlmIChpbmRleCA+PSAwKSB7XG4gICAgLy8gaWYgd2UgZm91bmQgaXQgcmV0cmlldmUgaXQuXG4gICAgcmV0dXJuIGtleVZhbHVlQXJyYXlbaW5kZXggfCAxXSBhcyBWO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogUmV0cmlldmUgYSBga2V5YCBpbmRleCB2YWx1ZSBpbiB0aGUgYXJyYXkgb3IgYC0xYCBpZiBub3QgZm91bmQuXG4gKlxuICogQHBhcmFtIGtleVZhbHVlQXJyYXkgdG8gc2VhcmNoLlxuICogQHBhcmFtIGtleSBUaGUga2V5IHRvIGxvY2F0ZS5cbiAqIEByZXR1cm5zIGluZGV4IG9mIHdoZXJlIHRoZSBrZXkgaXMgKG9yIHNob3VsZCBoYXZlIGJlZW4uKVxuICogICAtIHBvc2l0aXZlIChldmVuKSBpbmRleCBpZiBrZXkgZm91bmQuXG4gKiAgIC0gbmVnYXRpdmUgaW5kZXggaWYga2V5IG5vdCBmb3VuZC4gKGB+aW5kZXhgIChldmVuKSB0byBnZXQgdGhlIGluZGV4IHdoZXJlIGl0IHNob3VsZCBoYXZlXG4gKiAgICAgYmVlbiBpbnNlcnRlZC4pXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBrZXlWYWx1ZUFycmF5SW5kZXhPZjxWPihrZXlWYWx1ZUFycmF5OiBLZXlWYWx1ZUFycmF5PFY+LCBrZXk6IHN0cmluZyk6IG51bWJlciB7XG4gIHJldHVybiBfYXJyYXlJbmRleE9mU29ydGVkKGtleVZhbHVlQXJyYXkgYXMgc3RyaW5nW10sIGtleSwgMSk7XG59XG5cbi8qKlxuICogRGVsZXRlIGEgYGtleWAgKGFuZCBgdmFsdWVgKSBmcm9tIHRoZSBgS2V5VmFsdWVBcnJheWAuXG4gKlxuICogQHBhcmFtIGtleVZhbHVlQXJyYXkgdG8gbW9kaWZ5LlxuICogQHBhcmFtIGtleSBUaGUga2V5IHRvIGxvY2F0ZSBvciBkZWxldGUgKGlmIGV4aXN0KS5cbiAqIEByZXR1cm5zIGluZGV4IG9mIHdoZXJlIHRoZSBrZXkgd2FzIChvciBzaG91bGQgaGF2ZSBiZWVuLilcbiAqICAgLSBwb3NpdGl2ZSAoZXZlbikgaW5kZXggaWYga2V5IGZvdW5kIGFuZCBkZWxldGVkLlxuICogICAtIG5lZ2F0aXZlIGluZGV4IGlmIGtleSBub3QgZm91bmQuIChgfmluZGV4YCAoZXZlbikgdG8gZ2V0IHRoZSBpbmRleCB3aGVyZSBpdCBzaG91bGQgaGF2ZVxuICogICAgIGJlZW4uKVxuICovXG5leHBvcnQgZnVuY3Rpb24ga2V5VmFsdWVBcnJheURlbGV0ZTxWPihrZXlWYWx1ZUFycmF5OiBLZXlWYWx1ZUFycmF5PFY+LCBrZXk6IHN0cmluZyk6IG51bWJlciB7XG4gIGNvbnN0IGluZGV4ID0ga2V5VmFsdWVBcnJheUluZGV4T2Yoa2V5VmFsdWVBcnJheSwga2V5KTtcbiAgaWYgKGluZGV4ID49IDApIHtcbiAgICAvLyBpZiB3ZSBmb3VuZCBpdCByZW1vdmUgaXQuXG4gICAgYXJyYXlTcGxpY2Uoa2V5VmFsdWVBcnJheSwgaW5kZXgsIDIpO1xuICB9XG4gIHJldHVybiBpbmRleDtcbn1cblxuXG4vKipcbiAqIElOVEVSTkFMOiBHZXQgYW4gaW5kZXggb2YgYW4gYHZhbHVlYCBpbiBhIHNvcnRlZCBgYXJyYXlgIGJ5IGdyb3VwaW5nIHNlYXJjaCBieSBgc2hpZnRgLlxuICpcbiAqIE5PVEU6XG4gKiAtIFRoaXMgdXNlcyBiaW5hcnkgc2VhcmNoIGFsZ29yaXRobSBmb3IgZmFzdCByZW1vdmFscy5cbiAqXG4gKiBAcGFyYW0gYXJyYXkgQSBzb3J0ZWQgYXJyYXkgdG8gYmluYXJ5IHNlYXJjaC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gbG9vayBmb3IuXG4gKiBAcGFyYW0gc2hpZnQgZ3JvdXBpbmcgc2hpZnQuXG4gKiAgIC0gYDBgIG1lYW5zIGxvb2sgYXQgZXZlcnkgbG9jYXRpb25cbiAqICAgLSBgMWAgbWVhbnMgb25seSBsb29rIGF0IGV2ZXJ5IG90aGVyIChldmVuKSBsb2NhdGlvbiAodGhlIG9kZCBsb2NhdGlvbnMgYXJlIHRvIGJlIGlnbm9yZWQgYXNcbiAqICAgICAgICAgdGhleSBhcmUgdmFsdWVzLilcbiAqIEByZXR1cm5zIGluZGV4IG9mIHRoZSB2YWx1ZS5cbiAqICAgLSBwb3NpdGl2ZSBpbmRleCBpZiB2YWx1ZSBmb3VuZC5cbiAqICAgLSBuZWdhdGl2ZSBpbmRleCBpZiB2YWx1ZSBub3QgZm91bmQuIChgfmluZGV4YCB0byBnZXQgdGhlIHZhbHVlIHdoZXJlIGl0IHNob3VsZCBoYXZlIGJlZW5cbiAqIGluc2VydGVkKVxuICovXG5mdW5jdGlvbiBfYXJyYXlJbmRleE9mU29ydGVkKGFycmF5OiBzdHJpbmdbXSwgdmFsdWU6IHN0cmluZywgc2hpZnQ6IG51bWJlcik6IG51bWJlciB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnRFcXVhbChBcnJheS5pc0FycmF5KGFycmF5KSwgdHJ1ZSwgJ0V4cGVjdGluZyBhbiBhcnJheScpO1xuICBsZXQgc3RhcnQgPSAwO1xuICBsZXQgZW5kID0gYXJyYXkubGVuZ3RoID4+IHNoaWZ0O1xuICB3aGlsZSAoZW5kICE9PSBzdGFydCkge1xuICAgIGNvbnN0IG1pZGRsZSA9IHN0YXJ0ICsgKChlbmQgLSBzdGFydCkgPj4gMSk7ICAvLyBmaW5kIHRoZSBtaWRkbGUuXG4gICAgY29uc3QgY3VycmVudCA9IGFycmF5W21pZGRsZSA8PCBzaGlmdF07XG4gICAgaWYgKHZhbHVlID09PSBjdXJyZW50KSB7XG4gICAgICByZXR1cm4gKG1pZGRsZSA8PCBzaGlmdCk7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50ID4gdmFsdWUpIHtcbiAgICAgIGVuZCA9IG1pZGRsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhcnQgPSBtaWRkbGUgKyAxOyAgLy8gV2UgYWxyZWFkeSBzZWFyY2hlZCBtaWRkbGUgc28gbWFrZSBpdCBub24taW5jbHVzaXZlIGJ5IGFkZGluZyAxXG4gICAgfVxuICB9XG4gIHJldHVybiB+KGVuZCA8PCBzaGlmdCk7XG59XG4iXX0=