/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Returns element classes in form of a stable (sorted) string.
 *
 * @param element HTML Element.
 * @returns Returns element classes in form of a stable (sorted) string.
 */
export function getSortedClassName(element) {
    const names = Object.keys(getElementClasses(element));
    names.sort();
    return names.join(' ');
}
/**
 * Returns element classes in form of a map.
 *
 * @param element HTML Element.
 * @returns Map of class values.
 */
export function getElementClasses(element) {
    const classes = {};
    if (element.nodeType === Node.ELEMENT_NODE) {
        const classList = element.classList;
        for (let i = 0; i < classList.length; i++) {
            const key = classList[i];
            classes[key] = true;
        }
    }
    return classes;
}
/**
 * Returns element styles in form of a stable (sorted) string.
 *
 * @param element HTML Element.
 * @returns Returns element styles in form of a stable (sorted) string.
 */
export function getSortedStyle(element) {
    const styles = getElementStyles(element);
    const names = Object.keys(styles);
    names.sort();
    let sorted = '';
    names.forEach(key => {
        const value = styles[key];
        if (value != null && value !== '') {
            if (sorted !== '')
                sorted += ' ';
            sorted += key + ': ' + value + ';';
        }
    });
    return sorted;
}
/**
 * Returns element styles in form of a map.
 *
 * @param element HTML Element.
 * @returns Map of style values.
 */
export function getElementStyles(element) {
    const styles = {};
    if (element.nodeType === Node.ELEMENT_NODE) {
        const style = element.style;
        // reading `style.color` is a work around for a bug in Domino. The issue is that Domino has
        // stale value for `style.length`. It seems that reading a property from the element causes the
        // stale value to be updated. (As of Domino v 2.1.3)
        style.color;
        for (let i = 0; i < style.length; i++) {
            const key = style.item(i);
            const value = style.getPropertyValue(key);
            if (value !== '') {
                styles[key] = value;
            }
        }
    }
    return styles;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvdGVzdGluZy9zcmMvc3R5bGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSDs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxPQUFnQjtJQUNqRCxNQUFNLEtBQUssR0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDaEUsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2IsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3pCLENBQUM7QUFFRDs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxPQUFnQjtJQUNoRCxNQUFNLE9BQU8sR0FBMEIsRUFBRSxDQUFDO0lBQzFDLElBQUksT0FBTyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDM0MsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztRQUNwQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzFDLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLENBQUM7SUFDSCxDQUFDO0lBQ0QsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLGNBQWMsQ0FBQyxPQUFnQjtJQUM3QyxNQUFNLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6QyxNQUFNLEtBQUssR0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNiLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNoQixLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ2xCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQixJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRSxDQUFDO1lBQ2xDLElBQUksTUFBTSxLQUFLLEVBQUU7Z0JBQUUsTUFBTSxJQUFJLEdBQUcsQ0FBQztZQUNqQyxNQUFNLElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ3JDLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFFRDs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxPQUFnQjtJQUMvQyxNQUFNLE1BQU0sR0FBNEIsRUFBRSxDQUFDO0lBQzNDLElBQUksT0FBTyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDM0MsTUFBTSxLQUFLLEdBQUksT0FBdUIsQ0FBQyxLQUFLLENBQUM7UUFDN0MsMkZBQTJGO1FBQzNGLCtGQUErRjtRQUMvRixvREFBb0Q7UUFDcEQsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNaLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDdEMsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUMsSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFLENBQUM7Z0JBQ2pCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDdEIsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vKipcbiAqIFJldHVybnMgZWxlbWVudCBjbGFzc2VzIGluIGZvcm0gb2YgYSBzdGFibGUgKHNvcnRlZCkgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSBlbGVtZW50IEhUTUwgRWxlbWVudC5cbiAqIEByZXR1cm5zIFJldHVybnMgZWxlbWVudCBjbGFzc2VzIGluIGZvcm0gb2YgYSBzdGFibGUgKHNvcnRlZCkgc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U29ydGVkQ2xhc3NOYW1lKGVsZW1lbnQ6IEVsZW1lbnQpOiBzdHJpbmcge1xuICBjb25zdCBuYW1lczogc3RyaW5nW10gPSBPYmplY3Qua2V5cyhnZXRFbGVtZW50Q2xhc3NlcyhlbGVtZW50KSk7XG4gIG5hbWVzLnNvcnQoKTtcbiAgcmV0dXJuIG5hbWVzLmpvaW4oJyAnKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGVsZW1lbnQgY2xhc3NlcyBpbiBmb3JtIG9mIGEgbWFwLlxuICpcbiAqIEBwYXJhbSBlbGVtZW50IEhUTUwgRWxlbWVudC5cbiAqIEByZXR1cm5zIE1hcCBvZiBjbGFzcyB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbGVtZW50Q2xhc3NlcyhlbGVtZW50OiBFbGVtZW50KToge1trZXk6IHN0cmluZ106IHRydWV9IHtcbiAgY29uc3QgY2xhc3Nlczoge1trZXk6IHN0cmluZ106IHRydWV9ID0ge307XG4gIGlmIChlbGVtZW50Lm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgIGNvbnN0IGNsYXNzTGlzdCA9IGVsZW1lbnQuY2xhc3NMaXN0O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2xhc3NMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBrZXkgPSBjbGFzc0xpc3RbaV07XG4gICAgICBjbGFzc2VzW2tleV0gPSB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY2xhc3Nlcztcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGVsZW1lbnQgc3R5bGVzIGluIGZvcm0gb2YgYSBzdGFibGUgKHNvcnRlZCkgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSBlbGVtZW50IEhUTUwgRWxlbWVudC5cbiAqIEByZXR1cm5zIFJldHVybnMgZWxlbWVudCBzdHlsZXMgaW4gZm9ybSBvZiBhIHN0YWJsZSAoc29ydGVkKSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTb3J0ZWRTdHlsZShlbGVtZW50OiBFbGVtZW50KTogc3RyaW5nIHtcbiAgY29uc3Qgc3R5bGVzID0gZ2V0RWxlbWVudFN0eWxlcyhlbGVtZW50KTtcbiAgY29uc3QgbmFtZXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMoc3R5bGVzKTtcbiAgbmFtZXMuc29ydCgpO1xuICBsZXQgc29ydGVkID0gJyc7XG4gIG5hbWVzLmZvckVhY2goa2V5ID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IHN0eWxlc1trZXldO1xuICAgIGlmICh2YWx1ZSAhPSBudWxsICYmIHZhbHVlICE9PSAnJykge1xuICAgICAgaWYgKHNvcnRlZCAhPT0gJycpIHNvcnRlZCArPSAnICc7XG4gICAgICBzb3J0ZWQgKz0ga2V5ICsgJzogJyArIHZhbHVlICsgJzsnO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBzb3J0ZWQ7XG59XG5cbi8qKlxuICogUmV0dXJucyBlbGVtZW50IHN0eWxlcyBpbiBmb3JtIG9mIGEgbWFwLlxuICpcbiAqIEBwYXJhbSBlbGVtZW50IEhUTUwgRWxlbWVudC5cbiAqIEByZXR1cm5zIE1hcCBvZiBzdHlsZSB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbGVtZW50U3R5bGVzKGVsZW1lbnQ6IEVsZW1lbnQpOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSB7XG4gIGNvbnN0IHN0eWxlczoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgaWYgKGVsZW1lbnQubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgY29uc3Qgc3R5bGUgPSAoZWxlbWVudCBhcyBIVE1MRWxlbWVudCkuc3R5bGU7XG4gICAgLy8gcmVhZGluZyBgc3R5bGUuY29sb3JgIGlzIGEgd29yayBhcm91bmQgZm9yIGEgYnVnIGluIERvbWluby4gVGhlIGlzc3VlIGlzIHRoYXQgRG9taW5vIGhhc1xuICAgIC8vIHN0YWxlIHZhbHVlIGZvciBgc3R5bGUubGVuZ3RoYC4gSXQgc2VlbXMgdGhhdCByZWFkaW5nIGEgcHJvcGVydHkgZnJvbSB0aGUgZWxlbWVudCBjYXVzZXMgdGhlXG4gICAgLy8gc3RhbGUgdmFsdWUgdG8gYmUgdXBkYXRlZC4gKEFzIG9mIERvbWlubyB2IDIuMS4zKVxuICAgIHN0eWxlLmNvbG9yO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3R5bGUubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGtleSA9IHN0eWxlLml0ZW0oaSk7XG4gICAgICBjb25zdCB2YWx1ZSA9IHN0eWxlLmdldFByb3BlcnR5VmFsdWUoa2V5KTtcbiAgICAgIGlmICh2YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgc3R5bGVzW2tleV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0eWxlcztcbn1cbiJdfQ==