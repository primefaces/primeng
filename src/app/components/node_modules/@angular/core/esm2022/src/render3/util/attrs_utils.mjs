/**
 * Assigns all attribute values to the provided element via the inferred renderer.
 *
 * This function accepts two forms of attribute entries:
 *
 * default: (key, value):
 *  attrs = [key1, value1, key2, value2]
 *
 * namespaced: (NAMESPACE_MARKER, uri, name, value)
 *  attrs = [NAMESPACE_MARKER, uri, name, value, NAMESPACE_MARKER, uri, name, value]
 *
 * The `attrs` array can contain a mix of both the default and namespaced entries.
 * The "default" values are set without a marker, but if the function comes across
 * a marker value then it will attempt to set a namespaced value. If the marker is
 * not of a namespaced value then the function will quit and return the index value
 * where it stopped during the iteration of the attrs array.
 *
 * See [AttributeMarker] to understand what the namespace marker value is.
 *
 * Note that this instruction does not support assigning style and class values to
 * an element. See `elementStart` and `elementHostAttrs` to learn how styling values
 * are applied to an element.
 * @param renderer The renderer to be used
 * @param native The element that the attributes will be assigned to
 * @param attrs The attribute array of values that will be assigned to the element
 * @returns the index value that was last accessed in the attributes array
 */
export function setUpAttributes(renderer, native, attrs) {
    let i = 0;
    while (i < attrs.length) {
        const value = attrs[i];
        if (typeof value === 'number') {
            // only namespaces are supported. Other value types (such as style/class
            // entries) are not supported in this function.
            if (value !== 0 /* AttributeMarker.NamespaceURI */) {
                break;
            }
            // we just landed on the marker value ... therefore
            // we should skip to the next entry
            i++;
            const namespaceURI = attrs[i++];
            const attrName = attrs[i++];
            const attrVal = attrs[i++];
            ngDevMode && ngDevMode.rendererSetAttribute++;
            renderer.setAttribute(native, attrName, attrVal, namespaceURI);
        }
        else {
            // attrName is string;
            const attrName = value;
            const attrVal = attrs[++i];
            // Standard attributes
            ngDevMode && ngDevMode.rendererSetAttribute++;
            if (isAnimationProp(attrName)) {
                renderer.setProperty(native, attrName, attrVal);
            }
            else {
                renderer.setAttribute(native, attrName, attrVal);
            }
            i++;
        }
    }
    // another piece of code may iterate over the same attributes array. Therefore
    // it may be helpful to return the exact spot where the attributes array exited
    // whether by running into an unsupported marker or if all the static values were
    // iterated over.
    return i;
}
/**
 * Test whether the given value is a marker that indicates that the following
 * attribute values in a `TAttributes` array are only the names of attributes,
 * and not name-value pairs.
 * @param marker The attribute marker to test.
 * @returns true if the marker is a "name-only" marker (e.g. `Bindings`, `Template` or `I18n`).
 */
export function isNameOnlyAttributeMarker(marker) {
    return marker === 3 /* AttributeMarker.Bindings */ || marker === 4 /* AttributeMarker.Template */ ||
        marker === 6 /* AttributeMarker.I18n */;
}
export function isAnimationProp(name) {
    // Perf note: accessing charCodeAt to check for the first character of a string is faster as
    // compared to accessing a character at index 0 (ex. name[0]). The main reason for this is that
    // charCodeAt doesn't allocate memory to return a substring.
    return name.charCodeAt(0) === 64 /* CharCode.AT_SIGN */;
}
/**
 * Merges `src` `TAttributes` into `dst` `TAttributes` removing any duplicates in the process.
 *
 * This merge function keeps the order of attrs same.
 *
 * @param dst Location of where the merged `TAttributes` should end up.
 * @param src `TAttributes` which should be appended to `dst`
 */
export function mergeHostAttrs(dst, src) {
    if (src === null || src.length === 0) {
        // do nothing
    }
    else if (dst === null || dst.length === 0) {
        // We have source, but dst is empty, just make a copy.
        dst = src.slice();
    }
    else {
        let srcMarker = -1 /* AttributeMarker.ImplicitAttributes */;
        for (let i = 0; i < src.length; i++) {
            const item = src[i];
            if (typeof item === 'number') {
                srcMarker = item;
            }
            else {
                if (srcMarker === 0 /* AttributeMarker.NamespaceURI */) {
                    // Case where we need to consume `key1`, `key2`, `value` items.
                }
                else if (srcMarker === -1 /* AttributeMarker.ImplicitAttributes */ ||
                    srcMarker === 2 /* AttributeMarker.Styles */) {
                    // Case where we have to consume `key1` and `value` only.
                    mergeHostAttribute(dst, srcMarker, item, null, src[++i]);
                }
                else {
                    // Case where we have to consume `key1` only.
                    mergeHostAttribute(dst, srcMarker, item, null, null);
                }
            }
        }
    }
    return dst;
}
/**
 * Append `key`/`value` to existing `TAttributes` taking region marker and duplicates into account.
 *
 * @param dst `TAttributes` to append to.
 * @param marker Region where the `key`/`value` should be added.
 * @param key1 Key to add to `TAttributes`
 * @param key2 Key to add to `TAttributes` (in case of `AttributeMarker.NamespaceURI`)
 * @param value Value to add or to overwrite to `TAttributes` Only used if `marker` is not Class.
 */
export function mergeHostAttribute(dst, marker, key1, key2, value) {
    let i = 0;
    // Assume that new markers will be inserted at the end.
    let markerInsertPosition = dst.length;
    // scan until correct type.
    if (marker === -1 /* AttributeMarker.ImplicitAttributes */) {
        markerInsertPosition = -1;
    }
    else {
        while (i < dst.length) {
            const dstValue = dst[i++];
            if (typeof dstValue === 'number') {
                if (dstValue === marker) {
                    markerInsertPosition = -1;
                    break;
                }
                else if (dstValue > marker) {
                    // We need to save this as we want the markers to be inserted in specific order.
                    markerInsertPosition = i - 1;
                    break;
                }
            }
        }
    }
    // search until you find place of insertion
    while (i < dst.length) {
        const item = dst[i];
        if (typeof item === 'number') {
            // since `i` started as the index after the marker, we did not find it if we are at the next
            // marker
            break;
        }
        else if (item === key1) {
            // We already have same token
            if (key2 === null) {
                if (value !== null) {
                    dst[i + 1] = value;
                }
                return;
            }
            else if (key2 === dst[i + 1]) {
                dst[i + 2] = value;
                return;
            }
        }
        // Increment counter.
        i++;
        if (key2 !== null)
            i++;
        if (value !== null)
            i++;
    }
    // insert at location.
    if (markerInsertPosition !== -1) {
        dst.splice(markerInsertPosition, 0, marker);
        i = markerInsertPosition + 1;
    }
    dst.splice(i++, 0, key1);
    if (key2 !== null) {
        dst.splice(i++, 0, key2);
    }
    if (value !== null) {
        dst.splice(i++, 0, value);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cnNfdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL3V0aWwvYXR0cnNfdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0JBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILE1BQU0sVUFBVSxlQUFlLENBQUMsUUFBa0IsRUFBRSxNQUFnQixFQUFFLEtBQWtCO0lBQ3RGLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNWLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN4QixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUM5Qix3RUFBd0U7WUFDeEUsK0NBQStDO1lBQy9DLElBQUksS0FBSyx5Q0FBaUMsRUFBRSxDQUFDO2dCQUMzQyxNQUFNO1lBQ1IsQ0FBQztZQUVELG1EQUFtRDtZQUNuRCxtQ0FBbUM7WUFDbkMsQ0FBQyxFQUFFLENBQUM7WUFFSixNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQVcsQ0FBQztZQUMxQyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQVcsQ0FBQztZQUN0QyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQVcsQ0FBQztZQUNyQyxTQUFTLElBQUksU0FBUyxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDOUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNqRSxDQUFDO2FBQU0sQ0FBQztZQUNOLHNCQUFzQjtZQUN0QixNQUFNLFFBQVEsR0FBRyxLQUFlLENBQUM7WUFDakMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFD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Qy9CLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBTSxDQUFDO2dCQUNwQixPQUFPO1lBQ1QsQ0FBQztRQUNILENBQUM7UUFDRCxxQkFBcUI7UUFDckIsQ0FBQyxFQUFFLENBQUM7UUFDSixJQUFJLElBQUksS0FBSyxJQUFJO1lBQUUsQ0FBQyxFQUFFLENBQUM7UUFDdkIsSUFBSSxLQUFLLEtBQUssSUFBSTtZQUFFLENBQUMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxzQkFBc0I7SUFDdEIsSUFBSSxvQkFBb0IsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2hDLEdBQUcsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLENBQUMsR0FBRyxvQkFBb0IsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUNELEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pCLElBQUksSUFBSSxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFDRCxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUNuQixHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtDaGFyQ29kZX0gZnJvbSAnLi4vLi4vdXRpbC9jaGFyX2NvZGUnO1xuaW1wb3J0IHsgQXR0cmlidXRlTWFya2VyIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9hdHRyaWJ1dGVfbWFya2VyJztcbmltcG9ydCB7VEF0dHJpYnV0ZXN9IGZyb20gJy4uL2ludGVyZmFjZXMvbm9kZSc7XG5pbXBvcnQge0Nzc1NlbGVjdG9yfSBmcm9tICcuLi9pbnRlcmZhY2VzL3Byb2plY3Rpb24nO1xuaW1wb3J0IHtSZW5kZXJlcn0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZW5kZXJlcic7XG5pbXBvcnQge1JFbGVtZW50fSBmcm9tICcuLi9pbnRlcmZhY2VzL3JlbmRlcmVyX2RvbSc7XG5cblxuXG4vKipcbiAqIEFzc2lnbnMgYWxsIGF0dHJpYnV0ZSB2YWx1ZXMgdG8gdGhlIHByb3ZpZGVkIGVsZW1lbnQgdmlhIHRoZSBpbmZlcnJlZCByZW5kZXJlci5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIGFjY2VwdHMgdHdvIGZvcm1zIG9mIGF0dHJpYnV0ZSBlbnRyaWVzOlxuICpcbiAqIGRlZmF1bHQ6IChrZXksIHZhbHVlKTpcbiAqICBhdHRycyA9IFtrZXkxLCB2YWx1ZTEsIGtleTIsIHZhbHVlMl1cbiAqXG4gKiBuYW1lc3BhY2VkOiAoTkFNRVNQQUNFX01BUktFUiwgdXJpLCBuYW1lLCB2YWx1ZSlcbiAqICBhdHRycyA9IFtOQU1FU1BBQ0VfTUFSS0VSLCB1cmksIG5hbWUsIHZhbHVlLCBOQU1FU1BBQ0VfTUFSS0VSLCB1cmksIG5hbWUsIHZhbHVlXVxuICpcbiAqIFRoZSBgYXR0cnNgIGFycmF5IGNhbiBjb250YWluIGEgbWl4IG9mIGJvdGggdGhlIGRlZmF1bHQgYW5kIG5hbWVzcGFjZWQgZW50cmllcy5cbiAqIFRoZSBcImRlZmF1bHRcIiB2YWx1ZXMgYXJlIHNldCB3aXRob3V0IGEgbWFya2VyLCBidXQgaWYgdGhlIGZ1bmN0aW9uIGNvbWVzIGFjcm9zc1xuICogYSBtYXJrZXIgdmFsdWUgdGhlbiBpdCB3aWxsIGF0dGVtcHQgdG8gc2V0IGEgbmFtZXNwYWNlZCB2YWx1ZS4gSWYgdGhlIG1hcmtlciBpc1xuICogbm90IG9mIGEgbmFtZXNwYWNlZCB2YWx1ZSB0aGVuIHRoZSBmdW5jdGlvbiB3aWxsIHF1aXQgYW5kIHJldHVybiB0aGUgaW5kZXggdmFsdWVcbiAqIHdoZXJlIGl0IHN0b3BwZWQgZHVyaW5nIHRoZSBpdGVyYXRpb24gb2YgdGhlIGF0dHJzIGFycmF5LlxuICpcbiAqIFNlZSBbQXR0cmlidXRlTWFya2VyXSB0byB1bmRlcnN0YW5kIHdoYXQgdGhlIG5hbWVzcGFjZSBtYXJrZXIgdmFsdWUgaXMuXG4gKlxuICogTm90ZSB0aGF0IHRoaXMgaW5zdHJ1Y3Rpb24gZG9lcyBub3Qgc3VwcG9ydCBhc3NpZ25pbmcgc3R5bGUgYW5kIGNsYXNzIHZhbHVlcyB0b1xuICogYW4gZWxlbWVudC4gU2VlIGBlbGVtZW50U3RhcnRgIGFuZCBgZWxlbWVudEhvc3RBdHRyc2AgdG8gbGVhcm4gaG93IHN0eWxpbmcgdmFsdWVzXG4gKiBhcmUgYXBwbGllZCB0byBhbiBlbGVtZW50LlxuICogQHBhcmFtIHJlbmRlcmVyIFRoZSByZW5kZXJlciB0byBiZSB1c2VkXG4gKiBAcGFyYW0gbmF0aXZlIFRoZSBlbGVtZW50IHRoYXQgdGhlIGF0dHJpYnV0ZXMgd2lsbCBiZSBhc3NpZ25lZCB0b1xuICogQHBhcmFtIGF0dHJzIFRoZSBhdHRyaWJ1dGUgYXJyYXkgb2YgdmFsdWVzIHRoYXQgd2lsbCBiZSBhc3NpZ25lZCB0byB0aGUgZWxlbWVudFxuICogQHJldHVybnMgdGhlIGluZGV4IHZhbHVlIHRoYXQgd2FzIGxhc3QgYWNjZXNzZWQgaW4gdGhlIGF0dHJpYnV0ZXMgYXJyYXlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldFVwQXR0cmlidXRlcyhyZW5kZXJlcjogUmVuZGVyZXIsIG5hdGl2ZTogUkVsZW1lbnQsIGF0dHJzOiBUQXR0cmlidXRlcyk6IG51bWJlciB7XG4gIGxldCBpID0gMDtcbiAgd2hpbGUgKGkgPCBhdHRycy5sZW5ndGgpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGF0dHJzW2ldO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAvLyBvbmx5IG5hbWVzcGFjZXMgYXJlIHN1cHBvcnRlZC4gT3RoZXIgdmFsdWUgdHlwZXMgKHN1Y2ggYXMgc3R5bGUvY2xhc3NcbiAgICAgIC8vIGVudHJpZXMpIGFyZSBub3Qgc3VwcG9ydGVkIGluIHRoaXMgZnVuY3Rpb24uXG4gICAgICBpZiAodmFsdWUgIT09IEF0dHJpYnV0ZU1hcmtlci5OYW1lc3BhY2VVUkkpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIC8vIHdlIGp1c3QgbGFuZGVkIG9uIHRoZSBtYXJrZXIgdmFsdWUgLi4uIHRoZXJlZm9yZVxuICAgICAgLy8gd2Ugc2hvdWxkIHNraXAgdG8gdGhlIG5leHQgZW50cnlcbiAgICAgIGkrKztcblxuICAgICAgY29uc3QgbmFtZXNwYWNlVVJJID0gYXR0cnNbaSsrXSBhcyBzdHJpbmc7XG4gICAgICBjb25zdCBhdHRyTmFtZSA9IGF0dHJzW2krK10gYXMgc3RyaW5nO1xuICAgICAgY29uc3QgYXR0clZhbCA9IGF0dHJzW2krK10gYXMgc3RyaW5nO1xuICAgICAgbmdEZXZNb2RlICYmIG5nRGV2TW9kZS5yZW5kZXJlclNldEF0dHJpYnV0ZSsrO1xuICAgICAgcmVuZGVyZXIuc2V0QXR0cmlidXRlKG5hdGl2ZSwgYXR0ck5hbWUsIGF0dHJWYWwsIG5hbWVzcGFjZVVSSSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGF0dHJOYW1lIGlzIHN0cmluZztcbiAgICAgIGNvbnN0IGF0dHJOYW1lID0gdmFsdWUgYXMgc3RyaW5nO1xuICAgICAgY29uc3QgYXR0clZhbCA9IGF0dHJzWysraV07XG4gICAgICAvLyBTdGFuZGFyZCBhdHRyaWJ1dGVzXG4gICAgICBuZ0Rldk1vZGUgJiYgbmdEZXZNb2RlLnJlbmRlcmVyU2V0QXR0cmlidXRlKys7XG4gICAgICBpZiAoaXNBbmltYXRpb25Qcm9wKGF0dHJOYW1lKSkge1xuICAgICAgICByZW5kZXJlci5zZXRQcm9wZXJ0eShuYXRpdmUsIGF0dHJOYW1lLCBhdHRyVmFsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlbmRlcmVyLnNldEF0dHJpYnV0ZShuYXRpdmUsIGF0dHJOYW1lLCBhdHRyVmFsIGFzIHN0cmluZyk7XG4gICAgICB9XG4gICAgICBpKys7XG4gICAgfVxuICB9XG5cbiAgLy8gYW5vdGhlciBwaWVjZSBvZiBjb2RlIG1heSBpdGVyYXRlIG92ZXIgdGhlIHNhbWUgYXR0cmlidXRlcyBhcnJheS4gVGhlcmVmb3JlXG4gIC8vIGl0IG1heSBiZSBoZWxwZnVsIHRvIHJldHVybiB0aGUgZXhhY3Qgc3BvdCB3aGVyZSB0aGUgYXR0cmlidXRlcyBhcnJheSBleGl0ZWRcbiAgLy8gd2hldGhlciBieSBydW5uaW5nIGludG8gYW4gdW5zdXBwb3J0ZWQgbWFya2VyIG9yIGlmIGFsbCB0aGUgc3RhdGljIHZhbHVlcyB3ZXJlXG4gIC8vIGl0ZXJhdGVkIG92ZXIuXG4gIHJldHVybiBpO1xufVxuXG4vKipcbiAqIFRlc3Qgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBtYXJrZXIgdGhhdCBpbmRpY2F0ZXMgdGhhdCB0aGUgZm9sbG93aW5nXG4gKiBhdHRyaWJ1dGUgdmFsdWVzIGluIGEgYFRBdHRyaWJ1dGVzYCBhcnJheSBhcmUgb25seSB0aGUgbmFtZXMgb2YgYXR0cmlidXRlcyxcbiAqIGFuZCBub3QgbmFtZS12YWx1ZSBwYWlycy5cbiAqIEBwYXJhbSBtYXJrZXIgVGhlIGF0dHJpYnV0ZSBtYXJrZXIgdG8gdGVzdC5cbiAqIEByZXR1cm5zIHRydWUgaWYgdGhlIG1hcmtlciBpcyBhIFwibmFtZS1vbmx5XCIgbWFya2VyIChlLmcuIGBCaW5kaW5nc2AsIGBUZW1wbGF0ZWAgb3IgYEkxOG5gKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTmFtZU9ubHlBdHRyaWJ1dGVNYXJrZXIobWFya2VyOiBzdHJpbmd8QXR0cmlidXRlTWFya2VyfENzc1NlbGVjdG9yKSB7XG4gIHJldHVybiBtYXJrZXIgPT09IEF0dHJpYnV0ZU1hcmtlci5CaW5kaW5ncyB8fCBtYXJrZXIgPT09IEF0dHJpYnV0ZU1hcmtlci5UZW1wbGF0ZSB8fFxuICAgICAgbWFya2VyID09PSBBdHRyaWJ1dGVNYXJrZXIuSTE4bjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQW5pbWF0aW9uUHJvcChuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgLy8gUGVyZiBub3RlOiBhY2Nlc3NpbmcgY2hhckNvZGVBdCB0byBjaGVjayBmb3IgdGhlIGZpcnN0IGNoYXJhY3RlciBvZiBhIHN0cmluZyBpcyBmYXN0ZXIgYXNcbiAgLy8gY29tcGFyZWQgdG8gYWNjZXNzaW5nIGEgY2hhcmFjdGVyIGF0IGluZGV4IDAgKGV4LiBuYW1lWzBdKS4gVGhlIG1haW4gcmVhc29uIGZvciB0aGlzIGlzIHRoYXRcbiAgLy8gY2hhckNvZGVBdCBkb2Vzbid0IGFsbG9jYXRlIG1lbW9yeSB0byByZXR1cm4gYSBzdWJzdHJpbmcuXG4gIHJldHVybiBuYW1lLmNoYXJDb2RlQXQoMCkgPT09IENoYXJDb2RlLkFUX1NJR047XG59XG5cbi8qKlxuICogTWVyZ2VzIGBzcmNgIGBUQXR0cmlidXRlc2AgaW50byBgZHN0YCBgVEF0dHJpYnV0ZXNgIHJlbW92aW5nIGFueSBkdXBsaWNhdGVzIGluIHRoZSBwcm9jZXNzLlxuICpcbiAqIFRoaXMgbWVyZ2UgZnVuY3Rpb24ga2VlcHMgdGhlIG9yZGVyIG9mIGF0dHJzIHNhbWUuXG4gKlxuICogQHBhcmFtIGRzdCBMb2NhdGlvbiBvZiB3aGVyZSB0aGUgbWVyZ2VkIGBUQXR0cmlidXRlc2Agc2hvdWxkIGVuZCB1cC5cbiAqIEBwYXJhbSBzcmMgYFRBdHRyaWJ1dGVzYCB3aGljaCBzaG91bGQgYmUgYXBwZW5kZWQgdG8gYGRzdGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlSG9zdEF0dHJzKGRzdDogVEF0dHJpYnV0ZXN8bnVsbCwgc3JjOiBUQXR0cmlidXRlc3xudWxsKTogVEF0dHJpYnV0ZXN8bnVsbCB7XG4gIGlmIChzcmMgPT09IG51bGwgfHwgc3JjLmxlbmd0aCA9PT0gMCkge1xuICAgIC8vIGRvIG5vdGhpbmdcbiAgfSBlbHNlIGlmIChkc3QgPT09IG51bGwgfHwgZHN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIC8vIFdlIGhhdmUgc291cmNlLCBidXQgZHN0IGlzIGVtcHR5LCBqdXN0IG1ha2UgYSBjb3B5LlxuICAgIGRzdCA9IHNyYy5zbGljZSgpO1xuICB9IGVsc2Uge1xuICAgIGxldCBzcmNNYXJrZXI6IEF0dHJpYnV0ZU1hcmtlciA9IEF0dHJpYnV0ZU1hcmtlci5JbXBsaWNpdEF0dHJpYnV0ZXM7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcmMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBzcmNbaV07XG4gICAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICdudW1iZXInKSB7XG4gICAgICAgIHNyY01hcmtlciA9IGl0ZW07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc3JjTWFya2VyID09PSBBdHRyaWJ1dGVNYXJrZXIuTmFtZXNwYWNlVVJJKSB7XG4gICAgICAgICAgLy8gQ2FzZSB3aGVyZSB3ZSBuZWVkIHRvIGNvbnN1bWUgYGtleTFgLCBga2V5MmAsIGB2YWx1ZWAgaXRlbXMuXG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICBzcmNNYXJrZXIgPT09IEF0dHJpYnV0ZU1hcmtlci5JbXBsaWNpdEF0dHJpYnV0ZXMgfHxcbiAgICAgICAgICAgIHNyY01hcmtlciA9PT0gQXR0cmlidXRlTWFya2VyLlN0eWxlcykge1xuICAgICAgICAgIC8vIENhc2Ugd2hlcmUgd2UgaGF2ZSB0byBjb25zdW1lIGBrZXkxYCBhbmQgYHZhbHVlYCBvbmx5LlxuICAgICAgICAgIG1lcmdlSG9zdEF0dHJpYnV0ZShkc3QsIHNyY01hcmtlciwgaXRlbSBhcyBzdHJpbmcsIG51bGwsIHNyY1srK2ldIGFzIHN0cmluZyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gQ2FzZSB3aGVyZSB3ZSBoYXZlIHRvIGNvbnN1bWUgYGtleTFgIG9ubHkuXG4gICAgICAgICAgbWVyZ2VIb3N0QXR0cmlidXRlKGRzdCwgc3JjTWFya2VyLCBpdGVtIGFzIHN0cmluZywgbnVsbCwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRzdDtcbn1cblxuLyoqXG4gKiBBcHBlbmQgYGtleWAvYHZhbHVlYCB0byBleGlzdGluZyBgVEF0dHJpYnV0ZXNgIHRha2luZyByZWdpb24gbWFya2VyIGFuZCBkdXBsaWNhdGVzIGludG8gYWNjb3VudC5cbiAqXG4gKiBAcGFyYW0gZHN0IGBUQXR0cmlidXRlc2AgdG8gYXBwZW5kIHRvLlxuICogQHBhcmFtIG1hcmtlciBSZWdpb24gd2hlcmUgdGhlIGBrZXlgL2B2YWx1ZWAgc2hvdWxkIGJlIGFkZGVkLlxuICogQHBhcmFtIGtleTEgS2V5IHRvIGFkZCB0byBgVEF0dHJpYnV0ZXNgXG4gKiBAcGFyYW0ga2V5MiBLZXkgdG8gYWRkIHRvIGBUQXR0cmlidXRlc2AgKGluIGNhc2Ugb2YgYEF0dHJpYnV0ZU1hcmtlci5OYW1lc3BhY2VVUklgKVxuICogQHBhcmFtIHZhbHVlIFZhbHVlIHRvIGFkZCBvciB0byBvdmVyd3JpdGUgdG8gYFRBdHRyaWJ1dGVzYCBPbmx5IHVzZWQgaWYgYG1hcmtlcmAgaXMgbm90IENsYXNzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VIb3N0QXR0cmlidXRlKFxuICAgIGRzdDogVEF0dHJpYnV0ZXMsIG1hcmtlcjogQXR0cmlidXRlTWFya2VyLCBrZXkxOiBzdHJpbmcsIGtleTI6IHN0cmluZ3xudWxsLFxuICAgIHZhbHVlOiBzdHJpbmd8bnVsbCk6IHZvaWQge1xuICBsZXQgaSA9IDA7XG4gIC8vIEFzc3VtZSB0aGF0IG5ldyBtYXJrZXJzIHdpbGwgYmUgaW5zZXJ0ZWQgYXQgdGhlIGVuZC5cbiAgbGV0IG1hcmtlckluc2VydFBvc2l0aW9uID0gZHN0Lmxlbmd0aDtcbiAgLy8gc2NhbiB1bnRpbCBjb3JyZWN0IHR5cGUuXG4gIGlmIChtYXJrZXIgPT09IEF0dHJpYnV0ZU1hcmtlci5JbXBsaWNpdEF0dHJpYnV0ZXMpIHtcbiAgICBtYXJrZXJJbnNlcnRQb3NpdGlvbiA9IC0xO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChpIDwgZHN0Lmxlbmd0aCkge1xuICAgICAgY29uc3QgZHN0VmFsdWUgPSBkc3RbaSsrXTtcbiAgICAgIGlmICh0eXBlb2YgZHN0VmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGlmIChkc3RWYWx1ZSA9PT0gbWFya2VyKSB7XG4gICAgICAgICAgbWFya2VySW5zZXJ0UG9zaXRpb24gPSAtMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfSBlbHNlIGlmIChkc3RWYWx1ZSA+IG1hcmtlcikge1xuICAgICAgICAgIC8vIFdlIG5lZWQgdG8gc2F2ZSB0aGlzIGFzIHdlIHdhbnQgdGhlIG1hcmtlcnMgdG8gYmUgaW5zZXJ0ZWQgaW4gc3BlY2lmaWMgb3JkZXIuXG4gICAgICAgICAgbWFya2VySW5zZXJ0UG9zaXRpb24gPSBpIC0gMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIHNlYXJjaCB1bnRpbCB5b3UgZmluZCBwbGFjZSBvZiBpbnNlcnRpb25cbiAgd2hpbGUgKGkgPCBkc3QubGVuZ3RoKSB7XG4gICAgY29uc3QgaXRlbSA9IGRzdFtpXTtcbiAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICdudW1iZXInKSB7XG4gICAgICAvLyBzaW5jZSBgaWAgc3RhcnRlZCBhcyB0aGUgaW5kZXggYWZ0ZXIgdGhlIG1hcmtlciwgd2UgZGlkIG5vdCBmaW5kIGl0IGlmIHdlIGFyZSBhdCB0aGUgbmV4dFxuICAgICAgLy8gbWFya2VyXG4gICAgICBicmVhaztcbiAgICB9IGVsc2UgaWYgKGl0ZW0gPT09IGtleTEpIHtcbiAgICAgIC8vIFdlIGFscmVhZHkgaGF2ZSBzYW1lIHRva2VuXG4gICAgICBpZiAoa2V5MiA9PT0gbnVsbCkge1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICBkc3RbaSArIDFdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIGlmIChrZXkyID09PSBkc3RbaSArIDFdKSB7XG4gICAgICAgIGRzdFtpICsgMl0gPSB2YWx1ZSE7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gSW5jcmVtZW50IGNvdW50ZXIuXG4gICAgaSsrO1xuICAgIGlmIChrZXkyICE9PSBudWxsKSBpKys7XG4gICAgaWYgKHZhbHVlICE9PSBudWxsKSBpKys7XG4gIH1cblxuICAvLyBpbnNlcnQgYXQgbG9jYXRpb24uXG4gIGlmIChtYXJrZXJJbnNlcnRQb3NpdGlvbiAhPT0gLTEpIHtcbiAgICBkc3Quc3BsaWNlKG1hcmtlckluc2VydFBvc2l0aW9uLCAwLCBtYXJrZXIpO1xuICAgIGkgPSBtYXJrZXJJbnNlcnRQb3NpdGlvbiArIDE7XG4gIH1cbiAgZHN0LnNwbGljZShpKyssIDAsIGtleTEpO1xuICBpZiAoa2V5MiAhPT0gbnVsbCkge1xuICAgIGRzdC5zcGxpY2UoaSsrLCAwLCBrZXkyKTtcbiAgfVxuICBpZiAodmFsdWUgIT09IG51bGwpIHtcbiAgICBkc3Quc3BsaWNlKGkrKywgMCwgdmFsdWUpO1xuICB9XG59XG4iXX0=