/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export function stringify(token) {
    if (typeof token === 'string') {
        return token;
    }
    if (Array.isArray(token)) {
        return '[' + token.map(stringify).join(', ') + ']';
    }
    if (token == null) {
        return '' + token;
    }
    if (token.overriddenName) {
        return `${token.overriddenName}`;
    }
    if (token.name) {
        return `${token.name}`;
    }
    const res = token.toString();
    if (res == null) {
        return '' + res;
    }
    const newLineIndex = res.indexOf('\n');
    return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
}
/**
 * Concatenates two strings with separator, allocating new strings only when necessary.
 *
 * @param before before string.
 * @param separator separator string.
 * @param after after string.
 * @returns concatenated string.
 */
export function concatStringsWithSpace(before, after) {
    return (before == null || before === '') ?
        (after === null ? '' : after) :
        ((after == null || after === '') ? before : before + ' ' + after);
}
/**
 * Ellipses the string in the middle when longer than the max length
 *
 * @param string
 * @param maxLength of the output string
 * @returns ellipsed string with ... in the middle
 */
export function truncateMiddle(str, maxLength = 100) {
    if (!str || maxLength < 1 || str.length <= maxLength)
        return str;
    if (maxLength == 1)
        return str.substring(0, 1) + '...';
    const halfLimit = Math.round(maxLength / 2);
    return str.substring(0, halfLimit) + '...' + str.substring(str.length - halfLimit);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5naWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvdXRpbC9zdHJpbmdpZnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsTUFBTSxVQUFVLFNBQVMsQ0FBQyxLQUFVO0lBQ2xDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFLENBQUM7UUFDOUIsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDekIsT0FBTyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ3JELENBQUM7SUFFRCxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNsQixPQUFPLEVBQUUsR0FBRyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVELElBQUksS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3pCLE9BQU8sR0FBRyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2YsT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBRTdCLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ2hCLE9BQU8sRUFBRSxHQUFHLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBRUQsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxPQUFPLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUNwRSxDQUFDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxNQUFtQixFQUFFLEtBQWtCO0lBQzVFLE9BQU8sQ0FBQyxNQUFNLElBQUksSUFBSSxJQUFJLE1BQU0sS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDO0FBQ3hFLENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsY0FBYyxDQUFDLEdBQVcsRUFBRSxTQUFTLEdBQUcsR0FBRztJQUN6RCxJQUFJLENBQUMsR0FBRyxJQUFJLFNBQVMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxTQUFTO1FBQUUsT0FBTyxHQUFHLENBQUM7SUFDakUsSUFBSSxTQUFTLElBQUksQ0FBQztRQUFFLE9BQU8sR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBRXZELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzVDLE9BQU8sR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsQ0FBQztBQUNyRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnkodG9rZW46IGFueSk6IHN0cmluZyB7XG4gIGlmICh0eXBlb2YgdG9rZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHRva2VuO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkodG9rZW4pKSB7XG4gICAgcmV0dXJuICdbJyArIHRva2VuLm1hcChzdHJpbmdpZnkpLmpvaW4oJywgJykgKyAnXSc7XG4gIH1cblxuICBpZiAodG9rZW4gPT0gbnVsbCkge1xuICAgIHJldHVybiAnJyArIHRva2VuO1xuICB9XG5cbiAgaWYgKHRva2VuLm92ZXJyaWRkZW5OYW1lKSB7XG4gICAgcmV0dXJuIGAke3Rva2VuLm92ZXJyaWRkZW5OYW1lfWA7XG4gIH1cblxuICBpZiAodG9rZW4ubmFtZSkge1xuICAgIHJldHVybiBgJHt0b2tlbi5uYW1lfWA7XG4gIH1cblxuICBjb25zdCByZXMgPSB0b2tlbi50b1N0cmluZygpO1xuXG4gIGlmIChyZXMgPT0gbnVsbCkge1xuICAgIHJldHVybiAnJyArIHJlcztcbiAgfVxuXG4gIGNvbnN0IG5ld0xpbmVJbmRleCA9IHJlcy5pbmRleE9mKCdcXG4nKTtcbiAgcmV0dXJuIG5ld0xpbmVJbmRleCA9PT0gLTEgPyByZXMgOiByZXMuc3Vic3RyaW5nKDAsIG5ld0xpbmVJbmRleCk7XG59XG5cbi8qKlxuICogQ29uY2F0ZW5hdGVzIHR3byBzdHJpbmdzIHdpdGggc2VwYXJhdG9yLCBhbGxvY2F0aW5nIG5ldyBzdHJpbmdzIG9ubHkgd2hlbiBuZWNlc3NhcnkuXG4gKlxuICogQHBhcmFtIGJlZm9yZSBiZWZvcmUgc3RyaW5nLlxuICogQHBhcmFtIHNlcGFyYXRvciBzZXBhcmF0b3Igc3RyaW5nLlxuICogQHBhcmFtIGFmdGVyIGFmdGVyIHN0cmluZy5cbiAqIEByZXR1cm5zIGNvbmNhdGVuYXRlZCBzdHJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb25jYXRTdHJpbmdzV2l0aFNwYWNlKGJlZm9yZTogc3RyaW5nfG51bGwsIGFmdGVyOiBzdHJpbmd8bnVsbCk6IHN0cmluZyB7XG4gIHJldHVybiAoYmVmb3JlID09IG51bGwgfHwgYmVmb3JlID09PSAnJykgP1xuICAgICAgKGFmdGVyID09PSBudWxsID8gJycgOiBhZnRlcikgOlxuICAgICAgKChhZnRlciA9PSBudWxsIHx8IGFmdGVyID09PSAnJykgPyBiZWZvcmUgOiBiZWZvcmUgKyAnICcgKyBhZnRlcik7XG59XG5cbi8qKlxuICogRWxsaXBzZXMgdGhlIHN0cmluZyBpbiB0aGUgbWlkZGxlIHdoZW4gbG9uZ2VyIHRoYW4gdGhlIG1heCBsZW5ndGhcbiAqXG4gKiBAcGFyYW0gc3RyaW5nXG4gKiBAcGFyYW0gbWF4TGVuZ3RoIG9mIHRoZSBvdXRwdXQgc3RyaW5nXG4gKiBAcmV0dXJucyBlbGxpcHNlZCBzdHJpbmcgd2l0aCAuLi4gaW4gdGhlIG1pZGRsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJ1bmNhdGVNaWRkbGUoc3RyOiBzdHJpbmcsIG1heExlbmd0aCA9IDEwMCk6IHN0cmluZyB7XG4gIGlmICghc3RyIHx8IG1heExlbmd0aCA8IDEgfHwgc3RyLmxlbmd0aCA8PSBtYXhMZW5ndGgpIHJldHVybiBzdHI7XG4gIGlmIChtYXhMZW5ndGggPT0gMSkgcmV0dXJuIHN0ci5zdWJzdHJpbmcoMCwgMSkgKyAnLi4uJztcblxuICBjb25zdCBoYWxmTGltaXQgPSBNYXRoLnJvdW5kKG1heExlbmd0aCAvIDIpO1xuICByZXR1cm4gc3RyLnN1YnN0cmluZygwLCBoYWxmTGltaXQpICsgJy4uLicgKyBzdHIuc3Vic3RyaW5nKHN0ci5sZW5ndGggLSBoYWxmTGltaXQpO1xufVxuIl19