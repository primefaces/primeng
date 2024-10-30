/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Transforms a value (typically a string) to a boolean.
 * Intended to be used as a transform function of an input.
 *
 *  @usageNotes
 *  ```typescript
 *  @Input({ transform: booleanAttribute }) status!: boolean;
 *  ```
 * @param value Value to be transformed.
 *
 * @publicApi
 */
export function booleanAttribute(value) {
    return typeof value === 'boolean' ? value : (value != null && value !== 'false');
}
/**
 * Transforms a value (typically a string) to a number.
 * Intended to be used as a transform function of an input.
 * @param value Value to be transformed.
 * @param fallbackValue Value to use if the provided value can't be parsed as a number.
 *
 *  @usageNotes
 *  ```typescript
 *  @Input({ transform: numberAttribute }) id!: number;
 *  ```
 *
 * @publicApi
 */
export function numberAttribute(value, fallbackValue = NaN) {
    // parseFloat(value) handles most of the cases we're interested in (it treats null, empty string,
    // and other non-number values as NaN, where Number just uses 0) but it considers the string
    // '123hello' to be a valid number. Therefore we also check if Number(value) is NaN.
    const isNumberValue = !isNaN(parseFloat(value)) && !isNaN(Number(value));
    return isNumberValue ? Number(value) : fallbackValue;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29lcmNpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy91dGlsL2NvZXJjaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVIOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSxVQUFVLGdCQUFnQixDQUFDLEtBQWM7SUFDN0MsT0FBTyxPQUFPLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssS0FBSyxPQUFPLENBQUMsQ0FBQztBQUNuRixDQUFDO0FBRUQ7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0gsTUFBTSxVQUFVLGVBQWUsQ0FBQyxLQUFjLEVBQUUsYUFBYSxHQUFHLEdBQUc7SUFDakUsaUdBQWlHO0lBQ2pHLDRGQUE0RjtJQUM1RixvRkFBb0Y7SUFDcEYsTUFBTSxhQUFhLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDaEYsT0FBTyxhQUFhLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO0FBQ3ZELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLyoqXG4gKiBUcmFuc2Zvcm1zIGEgdmFsdWUgKHR5cGljYWxseSBhIHN0cmluZykgdG8gYSBib29sZWFuLlxuICogSW50ZW5kZWQgdG8gYmUgdXNlZCBhcyBhIHRyYW5zZm9ybSBmdW5jdGlvbiBvZiBhbiBpbnB1dC5cbiAqXG4gKiAgQHVzYWdlTm90ZXNcbiAqICBgYGB0eXBlc2NyaXB0XG4gKiAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHN0YXR1cyE6IGJvb2xlYW47XG4gKiAgYGBgXG4gKiBAcGFyYW0gdmFsdWUgVmFsdWUgdG8gYmUgdHJhbnNmb3JtZWQuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gYm9vbGVhbkF0dHJpYnV0ZSh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicgPyB2YWx1ZSA6ICh2YWx1ZSAhPSBudWxsICYmIHZhbHVlICE9PSAnZmFsc2UnKTtcbn1cblxuLyoqXG4gKiBUcmFuc2Zvcm1zIGEgdmFsdWUgKHR5cGljYWxseSBhIHN0cmluZykgdG8gYSBudW1iZXIuXG4gKiBJbnRlbmRlZCB0byBiZSB1c2VkIGFzIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIG9mIGFuIGlucHV0LlxuICogQHBhcmFtIHZhbHVlIFZhbHVlIHRvIGJlIHRyYW5zZm9ybWVkLlxuICogQHBhcmFtIGZhbGxiYWNrVmFsdWUgVmFsdWUgdG8gdXNlIGlmIHRoZSBwcm92aWRlZCB2YWx1ZSBjYW4ndCBiZSBwYXJzZWQgYXMgYSBudW1iZXIuXG4gKlxuICogIEB1c2FnZU5vdGVzXG4gKiAgYGBgdHlwZXNjcmlwdFxuICogIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIGlkITogbnVtYmVyO1xuICogIGBgYFxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG51bWJlckF0dHJpYnV0ZSh2YWx1ZTogdW5rbm93biwgZmFsbGJhY2tWYWx1ZSA9IE5hTik6IG51bWJlciB7XG4gIC8vIHBhcnNlRmxvYXQodmFsdWUpIGhhbmRsZXMgbW9zdCBvZiB0aGUgY2FzZXMgd2UncmUgaW50ZXJlc3RlZCBpbiAoaXQgdHJlYXRzIG51bGwsIGVtcHR5IHN0cmluZyxcbiAgLy8gYW5kIG90aGVyIG5vbi1udW1iZXIgdmFsdWVzIGFzIE5hTiwgd2hlcmUgTnVtYmVyIGp1c3QgdXNlcyAwKSBidXQgaXQgY29uc2lkZXJzIHRoZSBzdHJpbmdcbiAgLy8gJzEyM2hlbGxvJyB0byBiZSBhIHZhbGlkIG51bWJlci4gVGhlcmVmb3JlIHdlIGFsc28gY2hlY2sgaWYgTnVtYmVyKHZhbHVlKSBpcyBOYU4uXG4gIGNvbnN0IGlzTnVtYmVyVmFsdWUgPSAhaXNOYU4ocGFyc2VGbG9hdCh2YWx1ZSBhcyBhbnkpKSAmJiAhaXNOYU4oTnVtYmVyKHZhbHVlKSk7XG4gIHJldHVybiBpc051bWJlclZhbHVlID8gTnVtYmVyKHZhbHVlKSA6IGZhbGxiYWNrVmFsdWU7XG59XG4iXX0=