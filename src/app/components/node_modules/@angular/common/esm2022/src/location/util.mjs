/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Joins two parts of a URL with a slash if needed.
 *
 * @param start  URL string
 * @param end    URL string
 *
 *
 * @returns The joined URL string.
 */
export function joinWithSlash(start, end) {
    if (start.length == 0) {
        return end;
    }
    if (end.length == 0) {
        return start;
    }
    let slashes = 0;
    if (start.endsWith('/')) {
        slashes++;
    }
    if (end.startsWith('/')) {
        slashes++;
    }
    if (slashes == 2) {
        return start + end.substring(1);
    }
    if (slashes == 1) {
        return start + end;
    }
    return start + '/' + end;
}
/**
 * Removes a trailing slash from a URL string if needed.
 * Looks for the first occurrence of either `#`, `?`, or the end of the
 * line as `/` characters and removes the trailing slash if one exists.
 *
 * @param url URL string.
 *
 * @returns The URL string, modified if needed.
 */
export function stripTrailingSlash(url) {
    const match = url.match(/#|\?|$/);
    const pathEndIdx = (match && match.index) || url.length;
    const droppedSlashIdx = pathEndIdx - (url[pathEndIdx - 1] === '/' ? 1 : 0);
    return url.slice(0, droppedSlashIdx) + url.slice(pathEndIdx);
}
/**
 * Normalizes URL parameters by prepending with `?` if needed.
 *
 * @param  params String of URL parameters.
 *
 * @returns The normalized URL parameters string.
 */
export function normalizeQueryParams(params) {
    return params && params[0] !== '?' ? '?' + params : params;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbW1vbi9zcmMvbG9jYXRpb24vdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSDs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sVUFBVSxhQUFhLENBQUMsS0FBYSxFQUFFLEdBQVc7SUFDdEQsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ3RCLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUNELElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNwQixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFDRCxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDaEIsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDeEIsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBQ0QsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDeEIsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBQ0QsSUFBSSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDakIsT0FBTyxLQUFLLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBQ0QsSUFBSSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDakIsT0FBTyxLQUFLLEdBQUcsR0FBRyxDQUFDO0lBQ3JCLENBQUM7SUFDRCxPQUFPLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQzNCLENBQUM7QUFFRDs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxHQUFXO0lBQzVDLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDeEQsTUFBTSxlQUFlLEdBQUcsVUFBVSxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0UsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxlQUFlLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQy9ELENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsTUFBYztJQUNqRCxPQUFPLE1BQU0sSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDN0QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vKipcbiAqIEpvaW5zIHR3byBwYXJ0cyBvZiBhIFVSTCB3aXRoIGEgc2xhc2ggaWYgbmVlZGVkLlxuICpcbiAqIEBwYXJhbSBzdGFydCAgVVJMIHN0cmluZ1xuICogQHBhcmFtIGVuZCAgICBVUkwgc3RyaW5nXG4gKlxuICpcbiAqIEByZXR1cm5zIFRoZSBqb2luZWQgVVJMIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGpvaW5XaXRoU2xhc2goc3RhcnQ6IHN0cmluZywgZW5kOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAoc3RhcnQubGVuZ3RoID09IDApIHtcbiAgICByZXR1cm4gZW5kO1xuICB9XG4gIGlmIChlbmQubGVuZ3RoID09IDApIHtcbiAgICByZXR1cm4gc3RhcnQ7XG4gIH1cbiAgbGV0IHNsYXNoZXMgPSAwO1xuICBpZiAoc3RhcnQuZW5kc1dpdGgoJy8nKSkge1xuICAgIHNsYXNoZXMrKztcbiAgfVxuICBpZiAoZW5kLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgIHNsYXNoZXMrKztcbiAgfVxuICBpZiAoc2xhc2hlcyA9PSAyKSB7XG4gICAgcmV0dXJuIHN0YXJ0ICsgZW5kLnN1YnN0cmluZygxKTtcbiAgfVxuICBpZiAoc2xhc2hlcyA9PSAxKSB7XG4gICAgcmV0dXJuIHN0YXJ0ICsgZW5kO1xuICB9XG4gIHJldHVybiBzdGFydCArICcvJyArIGVuZDtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGEgdHJhaWxpbmcgc2xhc2ggZnJvbSBhIFVSTCBzdHJpbmcgaWYgbmVlZGVkLlxuICogTG9va3MgZm9yIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGVpdGhlciBgI2AsIGA/YCwgb3IgdGhlIGVuZCBvZiB0aGVcbiAqIGxpbmUgYXMgYC9gIGNoYXJhY3RlcnMgYW5kIHJlbW92ZXMgdGhlIHRyYWlsaW5nIHNsYXNoIGlmIG9uZSBleGlzdHMuXG4gKlxuICogQHBhcmFtIHVybCBVUkwgc3RyaW5nLlxuICpcbiAqIEByZXR1cm5zIFRoZSBVUkwgc3RyaW5nLCBtb2RpZmllZCBpZiBuZWVkZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHJpcFRyYWlsaW5nU2xhc2godXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBtYXRjaCA9IHVybC5tYXRjaCgvI3xcXD98JC8pO1xuICBjb25zdCBwYXRoRW5kSWR4ID0gKG1hdGNoICYmIG1hdGNoLmluZGV4KSB8fCB1cmwubGVuZ3RoO1xuICBjb25zdCBkcm9wcGVkU2xhc2hJZHggPSBwYXRoRW5kSWR4IC0gKHVybFtwYXRoRW5kSWR4IC0gMV0gPT09ICcvJyA/IDEgOiAwKTtcbiAgcmV0dXJuIHVybC5zbGljZSgwLCBkcm9wcGVkU2xhc2hJZHgpICsgdXJsLnNsaWNlKHBhdGhFbmRJZHgpO1xufVxuXG4vKipcbiAqIE5vcm1hbGl6ZXMgVVJMIHBhcmFtZXRlcnMgYnkgcHJlcGVuZGluZyB3aXRoIGA/YCBpZiBuZWVkZWQuXG4gKlxuICogQHBhcmFtICBwYXJhbXMgU3RyaW5nIG9mIFVSTCBwYXJhbWV0ZXJzLlxuICpcbiAqIEByZXR1cm5zIFRoZSBub3JtYWxpemVkIFVSTCBwYXJhbWV0ZXJzIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZVF1ZXJ5UGFyYW1zKHBhcmFtczogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHBhcmFtcyAmJiBwYXJhbXNbMF0gIT09ICc/JyA/ICc/JyArIHBhcmFtcyA6IHBhcmFtcztcbn1cbiJdfQ==