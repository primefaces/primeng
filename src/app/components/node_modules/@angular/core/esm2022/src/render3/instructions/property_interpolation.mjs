import { RENDERER } from '../interfaces/view';
import { getBindingIndex, getLView, getSelectedTNode, getTView } from '../state';
import { NO_CHANGE } from '../tokens';
import { interpolation1, interpolation2, interpolation3, interpolation4, interpolation5, interpolation6, interpolation7, interpolation8, interpolationV } from './interpolation';
import { elementPropertyInternal, storePropertyBindingMetadata } from './shared';
/**
 *
 * Update an interpolated property on an element with a lone bound value
 *
 * Used when the value passed to a property has 1 interpolated value in it, an no additional text
 * surrounds that interpolated value:
 *
 * ```html
 * <div title="{{v0}}"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵpropertyInterpolate('title', v0);
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export function ɵɵpropertyInterpolate(propName, v0, sanitizer) {
    ɵɵpropertyInterpolate1(propName, '', v0, '', sanitizer);
    return ɵɵpropertyInterpolate;
}
/**
 *
 * Update an interpolated property on an element with single bound value surrounded by text.
 *
 * Used when the value passed to a property has 1 interpolated value in it:
 *
 * ```html
 * <div title="prefix{{v0}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵpropertyInterpolate1('title', 'prefix', v0, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export function ɵɵpropertyInterpolate1(propName, prefix, v0, suffix, sanitizer) {
    const lView = getLView();
    const interpolatedValue = interpolation1(lView, prefix, v0, suffix);
    if (interpolatedValue !== NO_CHANGE) {
        const tView = getTView();
        const tNode = getSelectedTNode();
        elementPropertyInternal(tView, tNode, lView, propName, interpolatedValue, lView[RENDERER], sanitizer, false);
        ngDevMode &&
            storePropertyBindingMetadata(tView.data, tNode, propName, getBindingIndex() - 1, prefix, suffix);
    }
    return ɵɵpropertyInterpolate1;
}
/**
 *
 * Update an interpolated property on an element with 2 bound values surrounded by text.
 *
 * Used when the value passed to a property has 2 interpolated values in it:
 *
 * ```html
 * <div title="prefix{{v0}}-{{v1}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵpropertyInterpolate2('title', 'prefix', v0, '-', v1, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export function ɵɵpropertyInterpolate2(propName, prefix, v0, i0, v1, suffix, sanitizer) {
    const lView = getLView();
    const interpolatedValue = interpolation2(lView, prefix, v0, i0, v1, suffix);
    if (interpolatedValue !== NO_CHANGE) {
        const tView = getTView();
        const tNode = getSelectedTNode();
        elementPropertyInternal(tView, tNode, lView, propName, interpolatedValue, lView[RENDERER], sanitizer, false);
        ngDevMode &&
            storePropertyBindingMetadata(tView.data, tNode, propName, getBindingIndex() - 2, prefix, i0, suffix);
    }
    return ɵɵpropertyInterpolate2;
}
/**
 *
 * Update an interpolated property on an element with 3 bound values surrounded by text.
 *
 * Used when the value passed to a property has 3 interpolated values in it:
 *
 * ```html
 * <div title="prefix{{v0}}-{{v1}}-{{v2}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵpropertyInterpolate3(
 * 'title', 'prefix', v0, '-', v1, '-', v2, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export function ɵɵpropertyInterpolate3(propName, prefix, v0, i0, v1, i1, v2, suffix, sanitizer) {
    const lView = getLView();
    const interpolatedValue = interpolation3(lView, prefix, v0, i0, v1, i1, v2, suffix);
    if (interpolatedValue !== NO_CHANGE) {
        const tView = getTView();
        const tNode = getSelectedTNode();
        elementPropertyInternal(tView, tNode, lView, propName, interpolatedValue, lView[RENDERER], sanitizer, false);
        ngDevMode &&
            storePropertyBindingMetadata(tView.data, tNode, propName, getBindingIndex() - 3, prefix, i0, i1, suffix);
    }
    return ɵɵpropertyInterpolate3;
}
/**
 *
 * Update an interpolated property on an element with 4 bound values surrounded by text.
 *
 * Used when the value passed to a property has 4 interpolated values in it:
 *
 * ```html
 * <div title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵpropertyInterpolate4(
 * 'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export function ɵɵpropertyInterpolate4(propName, prefix, v0, i0, v1, i1, v2, i2, v3, suffix, sanitizer) {
    const lView = getLView();
    const interpolatedValue = interpolation4(lView, prefix, v0, i0, v1, i1, v2, i2, v3, suffix);
    if (interpolatedValue !== NO_CHANGE) {
        const tView = getTView();
        const tNode = getSelectedTNode();
        elementPropertyInternal(tView, tNode, lView, propName, interpolatedValue, lView[RENDERER], sanitizer, false);
        ngDevMode &&
            storePropertyBindingMetadata(tView.data, tNode, propName, getBindingIndex() - 4, prefix, i0, i1, i2, suffix);
    }
    return ɵɵpropertyInterpolate4;
}
/**
 *
 * Update an interpolated property on an element with 5 bound values surrounded by text.
 *
 * Used when the value passed to a property has 5 interpolated values in it:
 *
 * ```html
 * <div title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵpropertyInterpolate5(
 * 'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export function ɵɵpropertyInterpolate5(propName, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, suffix, sanitizer) {
    const lView = getLView();
    const interpolatedValue = interpolation5(lView, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, suffix);
    if (interpolatedValue !== NO_CHANGE) {
        const tView = getTView();
        const tNode = getSelectedTNode();
        elementPropertyInternal(tView, tNode, lView, propName, interpolatedValue, lView[RENDERER], sanitizer, false);
        ngDevMode &&
            storePropertyBindingMetadata(tView.data, tNode, propName, getBindingIndex() - 5, prefix, i0, i1, i2, i3, suffix);
    }
    return ɵɵpropertyInterpolate5;
}
/**
 *
 * Update an interpolated property on an element with 6 bound values surrounded by text.
 *
 * Used when the value passed to a property has 6 interpolated values in it:
 *
 * ```html
 * <div title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵpropertyInterpolate6(
 *    'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param i4 Static value used for concatenation only.
 * @param v5 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export function ɵɵpropertyInterpolate6(propName, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, suffix, sanitizer) {
    const lView = getLView();
    const interpolatedValue = interpolation6(lView, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, suffix);
    if (interpolatedValue !== NO_CHANGE) {
        const tView = getTView();
        const tNode = getSelectedTNode();
        elementPropertyInternal(tView, tNode, lView, propName, interpolatedValue, lView[RENDERER], sanitizer, false);
        ngDevMode &&
            storePropertyBindingMetadata(tView.data, tNode, propName, getBindingIndex() - 6, prefix, i0, i1, i2, i3, i4, suffix);
    }
    return ɵɵpropertyInterpolate6;
}
/**
 *
 * Update an interpolated property on an element with 7 bound values surrounded by text.
 *
 * Used when the value passed to a property has 7 interpolated values in it:
 *
 * ```html
 * <div title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}-{{v6}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵpropertyInterpolate7(
 *    'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param i4 Static value used for concatenation only.
 * @param v5 Value checked for change.
 * @param i5 Static value used for concatenation only.
 * @param v6 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export function ɵɵpropertyInterpolate7(propName, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, suffix, sanitizer) {
    const lView = getLView();
    const interpolatedValue = interpolation7(lView, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, suffix);
    if (interpolatedValue !== NO_CHANGE) {
        const tView = getTView();
        const tNode = getSelectedTNode();
        elementPropertyInternal(tView, tNode, lView, propName, interpolatedValue, lView[RENDERER], sanitizer, false);
        ngDevMode &&
            storePropertyBindingMetadata(tView.data, tNode, propName, getBindingIndex() - 7, prefix, i0, i1, i2, i3, i4, i5, suffix);
    }
    return ɵɵpropertyInterpolate7;
}
/**
 *
 * Update an interpolated property on an element with 8 bound values surrounded by text.
 *
 * Used when the value passed to a property has 8 interpolated values in it:
 *
 * ```html
 * <div title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}-{{v6}}-{{v7}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵpropertyInterpolate8(
 *  'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, '-', v7, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param i4 Static value used for concatenation only.
 * @param v5 Value checked for change.
 * @param i5 Static value used for concatenation only.
 * @param v6 Value checked for change.
 * @param i6 Static value used for concatenation only.
 * @param v7 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export function ɵɵpropertyInterpolate8(propName, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, i6, v7, suffix, sanitizer) {
    const lView = getLView();
    const interpolatedValue = interpolation8(lView, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, i6, v7, suffix);
    if (interpolatedValue !== NO_CHANGE) {
        const tView = getTView();
        const tNode = getSelectedTNode();
        elementPropertyInternal(tView, tNode, lView, propName, interpolatedValue, lView[RENDERER], sanitizer, false);
        ngDevMode &&
            storePropertyBindingMetadata(tView.data, tNode, propName, getBindingIndex() - 8, prefix, i0, i1, i2, i3, i4, i5, i6, suffix);
    }
    return ɵɵpropertyInterpolate8;
}
/**
 * Update an interpolated property on an element with 9 or more bound values surrounded by text.
 *
 * Used when the number of interpolated values exceeds 8.
 *
 * ```html
 * <div
 *  title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}-{{v6}}-{{v7}}-{{v8}}-{{v9}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵpropertyInterpolateV(
 *  'title', ['prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, '-', v7, '-', v9,
 *  'suffix']);
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update.
 * @param values The collection of values and the strings in between those values, beginning with a
 * string prefix and ending with a string suffix.
 * (e.g. `['prefix', value0, '-', value1, '-', value2, ..., value99, 'suffix']`)
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export function ɵɵpropertyInterpolateV(propName, values, sanitizer) {
    const lView = getLView();
    const interpolatedValue = interpolationV(lView, values);
    if (interpolatedValue !== NO_CHANGE) {
        const tView = getTView();
        const tNode = getSelectedTNode();
        elementPropertyInternal(tView, tNode, lView, propName, interpolatedValue, lView[RENDERER], sanitizer, false);
        if (ngDevMode) {
            const interpolationInBetween = [values[0]]; // prefix
            for (let i = 2; i < values.length; i += 2) {
                interpolationInBetween.push(values[i]);
            }
            storePropertyBindingMetadata(tView.data, tNode, propName, getBindingIndex() - interpolationInBetween.length + 1, ...interpolationInBetween);
        }
    }
    return ɵɵpropertyInterpolateV;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHlfaW50ZXJwb2xhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaW5zdHJ1Y3Rpb25zL3Byb3BlcnR5X2ludGVycG9sYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxlQUFlLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUMvRSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBRXBDLE9BQU8sRUFBQyxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQy9LLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSw0QkFBNEIsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUcvRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILE1BQU0sVUFBVSxxQkFBcUIsQ0FDakMsUUFBZ0IsRUFBRSxFQUFPLEVBQUUsU0FBdUI7SUFDcEQsc0JBQXNCLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3hELE9BQU8scUJBQXFCLENBQUM7QUFDL0IsQ0FBQztBQUdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxNQUFNLFVBQVUsc0JBQXNCLENBQ2xDLFFBQWdCLEVBQUUsTUFBYyxFQUFFLEVBQU8sRUFBRSxNQUFjLEVBQ3pELFNBQXVCO0lBQ3pCLE1BQU0sS0FBSyxHQUFHLFFBQVEsRUFBRSxDQUFDO0lBQ3pCLE1BQU0saUJBQWlCLEdBQUcsY0FB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QWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge1Nhbml0aXplckZufSBmcm9tICcuLi9pbnRlcmZhY2VzL3Nhbml0aXphdGlvbic7XG5pbXBvcnQge1JFTkRFUkVSfSBmcm9tICcuLi9pbnRlcmZhY2VzL3ZpZXcnO1xuaW1wb3J0IHtnZXRCaW5kaW5nSW5kZXgsIGdldExWaWV3LCBnZXRTZWxlY3RlZFROb2RlLCBnZXRUVmlld30gZnJvbSAnLi4vc3RhdGUnO1xuaW1wb3J0IHtOT19DSEFOR0V9IGZyb20gJy4uL3Rva2Vucyc7XG5cbmltcG9ydCB7aW50ZXJwb2xhdGlvbjEsIGludGVycG9sYXRpb24yLCBpbnRlcnBvbGF0aW9uMywgaW50ZXJwb2xhdGlvbjQsIGludGVycG9sYXRpb241LCBpbnRlcnBvbGF0aW9uNiwgaW50ZXJwb2xhdGlvbjcsIGludGVycG9sYXRpb244LCBpbnRlcnBvbGF0aW9uVn0gZnJvbSAnLi9pbnRlcnBvbGF0aW9uJztcbmltcG9ydCB7ZWxlbWVudFByb3BlcnR5SW50ZXJuYWwsIHN0b3JlUHJvcGVydHlCaW5kaW5nTWV0YWRhdGF9IGZyb20gJy4vc2hhcmVkJztcblxuXG4vKipcbiAqXG4gKiBVcGRhdGUgYW4gaW50ZXJwb2xhdGVkIHByb3BlcnR5IG9uIGFuIGVsZW1lbnQgd2l0aCBhIGxvbmUgYm91bmQgdmFsdWVcbiAqXG4gKiBVc2VkIHdoZW4gdGhlIHZhbHVlIHBhc3NlZCB0byBhIHByb3BlcnR5IGhhcyAxIGludGVycG9sYXRlZCB2YWx1ZSBpbiBpdCwgYW4gbm8gYWRkaXRpb25hbCB0ZXh0XG4gKiBzdXJyb3VuZHMgdGhhdCBpbnRlcnBvbGF0ZWQgdmFsdWU6XG4gKlxuICogYGBgaHRtbFxuICogPGRpdiB0aXRsZT1cInt7djB9fVwiPjwvZGl2PlxuICogYGBgXG4gKlxuICogSXRzIGNvbXBpbGVkIHJlcHJlc2VudGF0aW9uIGlzOjpcbiAqXG4gKiBgYGB0c1xuICogybXJtXByb3BlcnR5SW50ZXJwb2xhdGUoJ3RpdGxlJywgdjApO1xuICogYGBgXG4gKlxuICogSWYgdGhlIHByb3BlcnR5IG5hbWUgYWxzbyBleGlzdHMgYXMgYW4gaW5wdXQgcHJvcGVydHkgb24gb25lIG9mIHRoZSBlbGVtZW50J3MgZGlyZWN0aXZlcyxcbiAqIHRoZSBjb21wb25lbnQgcHJvcGVydHkgd2lsbCBiZSBzZXQgaW5zdGVhZCBvZiB0aGUgZWxlbWVudCBwcm9wZXJ0eS4gVGhpcyBjaGVjayBtdXN0XG4gKiBiZSBjb25kdWN0ZWQgYXQgcnVudGltZSBzbyBjaGlsZCBjb21wb25lbnRzIHRoYXQgYWRkIG5ldyBgQElucHV0c2AgZG9uJ3QgaGF2ZSB0byBiZSByZS1jb21waWxlZC5cbiAqXG4gKiBAcGFyYW0gcHJvcE5hbWUgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIHVwZGF0ZVxuICogQHBhcmFtIHByZWZpeCBTdGF0aWMgdmFsdWUgdXNlZCBmb3IgY29uY2F0ZW5hdGlvbiBvbmx5LlxuICogQHBhcmFtIHYwIFZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSBzdWZmaXggU3RhdGljIHZhbHVlIHVzZWQgZm9yIGNvbmNhdGVuYXRpb24gb25seS5cbiAqIEBwYXJhbSBzYW5pdGl6ZXIgQW4gb3B0aW9uYWwgc2FuaXRpemVyIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyBpdHNlbGYsIHNvIHRoYXQgaXQgbWF5IGJlIGNoYWluZWQuXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtXByb3BlcnR5SW50ZXJwb2xhdGUoXG4gICAgcHJvcE5hbWU6IHN0cmluZywgdjA6IGFueSwgc2FuaXRpemVyPzogU2FuaXRpemVyRm4pOiB0eXBlb2YgybXJtXByb3BlcnR5SW50ZXJwb2xhdGUge1xuICDJtcm1cHJvcGVydHlJbnRlcnBvbGF0ZTEocHJvcE5hbWUsICcnLCB2MCwgJycsIHNhbml0aXplcik7XG4gIHJldHVybiDJtcm1cHJvcGVydHlJbnRlcnBvbGF0ZTtcbn1cblxuXG4vKipcbiAqXG4gKiBVcGRhdGUgYW4gaW50ZXJwb2xhdGVkIHByb3BlcnR5IG9uIGFuIGVsZW1lbnQgd2l0aCBzaW5nbGUgYm91bmQgdmFsdWUgc3Vycm91bmRlZCBieSB0ZXh0LlxuICpcbiAqIFVzZWQgd2hlbiB0aGUgdmFsdWUgcGFzc2VkIHRvIGEgcHJvcGVydHkgaGFzIDEgaW50ZXJwb2xhdGVkIHZhbHVlIGluIGl0OlxuICpcbiAqIGBgYGh0bWxcbiAqIDxkaXYgdGl0bGU9XCJwcmVmaXh7e3YwfX1zdWZmaXhcIj48L2Rpdj5cbiAqIGBgYFxuICpcbiAqIEl0cyBjb21waWxlZCByZXByZXNlbnRhdGlvbiBpczo6XG4gKlxuICogYGBgdHNcbiAqIMm1ybVwcm9wZXJ0eUludGVycG9sYXRlMSgndGl0bGUnLCAncHJlZml4JywgdjAsICdzdWZmaXgnKTtcbiAqIGBgYFxuICpcbiAqIElmIHRoZSBwcm9wZXJ0eSBuYW1lIGFsc28gZXhpc3RzIGFzIGFuIGlucHV0IHByb3BlcnR5IG9uIG9uZSBvZiB0aGUgZWxlbWVudCdzIGRpcmVjdGl2ZXMsXG4gKiB0aGUgY29tcG9uZW50IHByb3BlcnR5IHdpbGwgYmUgc2V0IGluc3RlYWQgb2YgdGhlIGVsZW1lbnQgcHJvcGVydHkuIFRoaXMgY2hlY2sgbXVzdFxuICogYmUgY29uZHVjdGVkIGF0IHJ1bnRpbWUgc28gY2hpbGQgY29tcG9uZW50cyB0aGF0IGFkZCBuZXcgYEBJbnB1dHNgIGRvbid0IGhhdmUgdG8gYmUgcmUtY29tcGlsZWQuXG4gKlxuICogQHBhcmFtIHByb3BOYW1lIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byB1cGRhdGVcbiAqIEBwYXJhbSBwcmVmaXggU3RhdGljIHZhbHVlIHVzZWQgZm9yIGNvbmNhdGVuYXRpb24gb25seS5cbiAqIEBwYXJhbSB2MCBWYWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gc3VmZml4IFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gc2FuaXRpemVyIEFuIG9wdGlvbmFsIHNhbml0aXplciBmdW5jdGlvblxuICogQHJldHVybnMgaXRzZWxmLCBzbyB0aGF0IGl0IG1heSBiZSBjaGFpbmVkLlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVwcm9wZXJ0eUludGVycG9sYXRlMShcbiAgICBwcm9wTmFtZTogc3RyaW5nLCBwcmVmaXg6IHN0cmluZywgdjA6IGFueSwgc3VmZml4OiBzdHJpbmcsXG4gICAgc2FuaXRpemVyPzogU2FuaXRpemVyRm4pOiB0eXBlb2YgybXJtXByb3BlcnR5SW50ZXJwb2xhdGUxIHtcbiAgY29uc3QgbFZpZXcgPSBnZXRMVmlldygpO1xuICBjb25zdCBpbnRlcnBvbGF0ZWRWYWx1ZSA9IGludGVycG9sYXRpb24xKGxWaWV3LCBwcmVmaXgsIHYwLCBzdWZmaXgpO1xuICBpZiAoaW50ZXJwb2xhdGVkVmFsdWUgIT09IE5PX0NIQU5HRSkge1xuICAgIGNvbnN0IHRWaWV3ID0gZ2V0VFZpZXcoKTtcbiAgICBjb25zdCB0Tm9kZSA9IGdldFNlbGVjdGVkVE5vZGUoKTtcbiAgICBlbGVtZW50UHJvcGVydHlJbnRlcm5hbChcbiAgICAgICAgdFZpZXcsIHROb2RlLCBsVmlldywgcHJvcE5hbWUsIGludGVycG9sYXRlZFZhbHVlLCBsVmlld1tSRU5ERVJFUl0sIHNhbml0aXplciwgZmFsc2UpO1xuICAgIG5nRGV2TW9kZSAmJlxuICAgICAgICBzdG9yZVByb3BlcnR5QmluZGluZ01ldGFkYXRhKFxuICAgICAgICAgICAgdFZpZXcuZGF0YSwgdE5vZGUsIHByb3BOYW1lLCBnZXRCaW5kaW5nSW5kZXgoKSAtIDEsIHByZWZpeCwgc3VmZml4KTtcbiAgfVxuICByZXR1cm4gybXJtXByb3BlcnR5SW50ZXJwb2xhdGUxO1xufVxuXG4vKipcbiAqXG4gKiBVcGRhdGUgYW4gaW50ZXJwb2xhdGVkIHByb3BlcnR5IG9uIGFuIGVsZW1lbnQgd2l0aCAyIGJvdW5kIHZhbHVlcyBzdXJyb3VuZGVkIGJ5IHRleHQuXG4gKlxuICogVXNlZCB3aGVuIHRoZSB2YWx1ZSBwYXNzZWQgdG8gYSBwcm9wZXJ0eSBoYXMgMiBpbnRlcnBvbGF0ZWQgdmFsdWVzIGluIGl0OlxuICpcbiAqIGBgYGh0bWxcbiAqIDxkaXYgdGl0bGU9XCJwcmVmaXh7e3YwfX0te3t2MX19c3VmZml4XCI+PC9kaXY+XG4gKiBgYGBcbiAqXG4gKiBJdHMgY29tcGlsZWQgcmVwcmVzZW50YXRpb24gaXM6OlxuICpcbiAqIGBgYHRzXG4gKiDJtcm1cHJvcGVydHlJbnRlcnBvbGF0ZTIoJ3RpdGxlJywgJ3ByZWZpeCcsIHYwLCAnLScsIHYxLCAnc3VmZml4Jyk7XG4gKiBgYGBcbiAqXG4gKiBJZiB0aGUgcHJvcGVydHkgbmFtZSBhbHNvIGV4aXN0cyBhcyBhbiBpbnB1dCBwcm9wZXJ0eSBvbiBvbmUgb2YgdGhlIGVsZW1lbnQncyBkaXJlY3RpdmVzLFxuICogdGhlIGNvbXBvbmVudCBwcm9wZXJ0eSB3aWxsIGJlIHNldCBpbnN0ZWFkIG9mIHRoZSBlbGVtZW50IHByb3BlcnR5LiBUaGlzIGNoZWNrIG11c3RcbiAqIGJlIGNvbmR1Y3RlZCBhdCBydW50aW1lIHNvIGNoaWxkIGNvbXBvbmVudHMgdGhhdCBhZGQgbmV3IGBASW5wdXRzYCBkb24ndCBoYXZlIHRvIGJlIHJlLWNvbXBpbGVkLlxuICpcbiAqIEBwYXJhbSBwcm9wTmFtZSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gdXBkYXRlXG4gKiBAcGFyYW0gcHJlZml4IFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjAgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIGkwIFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjEgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIHN1ZmZpeCBTdGF0aWMgdmFsdWUgdXNlZCBmb3IgY29uY2F0ZW5hdGlvbiBvbmx5LlxuICogQHBhcmFtIHNhbml0aXplciBBbiBvcHRpb25hbCBzYW5pdGl6ZXIgZnVuY3Rpb25cbiAqIEByZXR1cm5zIGl0c2VsZiwgc28gdGhhdCBpdCBtYXkgYmUgY2hhaW5lZC5cbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1cHJvcGVydHlJbnRlcnBvbGF0ZTIoXG4gICAgcHJvcE5hbWU6IHN0cmluZywgcHJlZml4OiBzdHJpbmcsIHYwOiBhbnksIGkwOiBzdHJpbmcsIHYxOiBhbnksIHN1ZmZpeDogc3RyaW5nLFxuICAgIHNhbml0aXplcj86IFNhbml0aXplckZuKTogdHlwZW9mIMm1ybVwcm9wZXJ0eUludGVycG9sYXRlMiB7XG4gIGNvbnN0IGxWaWV3ID0gZ2V0TFZpZXcoKTtcbiAgY29uc3QgaW50ZXJwb2xhdGVkVmFsdWUgPSBpbnRlcnBvbGF0aW9uMihsVmlldywgcHJlZml4LCB2MCwgaTAsIHYxLCBzdWZmaXgpO1xuICBpZiAoaW50ZXJwb2xhdGVkVmFsdWUgIT09IE5PX0NIQU5HRSkge1xuICAgIGNvbnN0IHRWaWV3ID0gZ2V0VFZpZXcoKTtcbiAgICBjb25zdCB0Tm9kZSA9IGdldFNlbGVjdGVkVE5vZGUoKTtcbiAgICBlbGVtZW50UHJvcGVydHlJbnRlcm5hbChcbiAgICAgICAgdFZpZXcsIHROb2RlLCBsVmlldywgcHJvcE5hbWUsIGludGVycG9sYXRlZFZhbHVlLCBsVmlld1tSRU5ERVJFUl0sIHNhbml0aXplciwgZmFsc2UpO1xuICAgIG5nRGV2TW9kZSAmJlxuICAgICAgICBzdG9yZVByb3BlcnR5QmluZGluZ01ldGFkYXRhKFxuICAgICAgICAgICAgdFZpZXcuZGF0YSwgdE5vZGUsIHByb3BOYW1lLCBnZXRCaW5kaW5nSW5kZXgoKSAtIDIsIHByZWZpeCwgaTAsIHN1ZmZpeCk7XG4gIH1cbiAgcmV0dXJuIMm1ybVwcm9wZXJ0eUludGVycG9sYXRlMjtcbn1cblxuLyoqXG4gKlxuICogVXBkYXRlIGFuIGludGVycG9sYXRlZCBwcm9wZXJ0eSBvbiBhbiBlbGVtZW50IHdpdGggMyBib3VuZCB2YWx1ZXMgc3Vycm91bmRlZCBieSB0ZXh0LlxuICpcbiAqIFVzZWQgd2hlbiB0aGUgdmFsdWUgcGFzc2VkIHRvIGEgcHJvcGVydHkgaGFzIDMgaW50ZXJwb2xhdGVkIHZhbHVlcyBpbiBpdDpcbiAqXG4gKiBgYGBodG1sXG4gKiA8ZGl2IHRpdGxlPVwicHJlZml4e3t2MH19LXt7djF9fS17e3YyfX1zdWZmaXhcIj48L2Rpdj5cbiAqIGBgYFxuICpcbiAqIEl0cyBjb21waWxlZCByZXByZXNlbnRhdGlvbiBpczo6XG4gKlxuICogYGBgdHNcbiAqIMm1ybVwcm9wZXJ0eUludGVycG9sYXRlMyhcbiAqICd0aXRsZScsICdwcmVmaXgnLCB2MCwgJy0nLCB2MSwgJy0nLCB2MiwgJ3N1ZmZpeCcpO1xuICogYGBgXG4gKlxuICogSWYgdGhlIHByb3BlcnR5IG5hbWUgYWxzbyBleGlzdHMgYXMgYW4gaW5wdXQgcHJvcGVydHkgb24gb25lIG9mIHRoZSBlbGVtZW50J3MgZGlyZWN0aXZlcyxcbiAqIHRoZSBjb21wb25lbnQgcHJvcGVydHkgd2lsbCBiZSBzZXQgaW5zdGVhZCBvZiB0aGUgZWxlbWVudCBwcm9wZXJ0eS4gVGhpcyBjaGVjayBtdXN0XG4gKiBiZSBjb25kdWN0ZWQgYXQgcnVudGltZSBzbyBjaGlsZCBjb21wb25lbnRzIHRoYXQgYWRkIG5ldyBgQElucHV0c2AgZG9uJ3QgaGF2ZSB0byBiZSByZS1jb21waWxlZC5cbiAqXG4gKiBAcGFyYW0gcHJvcE5hbWUgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIHVwZGF0ZVxuICogQHBhcmFtIHByZWZpeCBTdGF0aWMgdmFsdWUgdXNlZCBmb3IgY29uY2F0ZW5hdGlvbiBvbmx5LlxuICogQHBhcmFtIHYwIFZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSBpMCBTdGF0aWMgdmFsdWUgdXNlZCBmb3IgY29uY2F0ZW5hdGlvbiBvbmx5LlxuICogQHBhcmFtIHYxIFZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSBpMSBTdGF0aWMgdmFsdWUgdXNlZCBmb3IgY29uY2F0ZW5hdGlvbiBvbmx5LlxuICogQHBhcmFtIHYyIFZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSBzdWZmaXggU3RhdGljIHZhbHVlIHVzZWQgZm9yIGNvbmNhdGVuYXRpb24gb25seS5cbiAqIEBwYXJhbSBzYW5pdGl6ZXIgQW4gb3B0aW9uYWwgc2FuaXRpemVyIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyBpdHNlbGYsIHNvIHRoYXQgaXQgbWF5IGJlIGNoYWluZWQuXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtXByb3BlcnR5SW50ZXJwb2xhdGUzKFxuICAgIHByb3BOYW1lOiBzdHJpbmcsIHByZWZpeDogc3RyaW5nLCB2MDogYW55LCBpMDogc3RyaW5nLCB2MTogYW55LCBpMTogc3RyaW5nLCB2MjogYW55LFxuICAgIHN1ZmZpeDogc3RyaW5nLCBzYW5pdGl6ZXI/OiBTYW5pdGl6ZXJGbik6IHR5cGVvZiDJtcm1cHJvcGVydHlJbnRlcnBvbGF0ZTMge1xuICBjb25zdCBsVmlldyA9IGdldExWaWV3KCk7XG4gIGNvbnN0IGludGVycG9sYXRlZFZhbHVlID0gaW50ZXJwb2xhdGlvbjMobFZpZXcsIHByZWZpeCwgdjAsIGkwLCB2MSwgaTEsIHYyLCBzdWZmaXgpO1xuICBpZiAoaW50ZXJwb2xhdGVkVmFsdWUgIT09IE5PX0NIQU5HRSkge1xuICAgIGNvbnN0IHRWaWV3ID0gZ2V0VFZpZXcoKTtcbiAgICBjb25zdCB0Tm9kZSA9IGdldFNlbGVjdGVkVE5vZGUoKTtcbiAgICBlbGVtZW50UHJvcGVydHlJbnRlcm5hbChcbiAgICAgICAgdFZpZXcsIHROb2RlLCBsVmlldywgcHJvcE5hbWUsIGludGVycG9sYXRlZFZhbHVlLCBsVmlld1tSRU5ERVJFUl0sIHNhbml0aXplciwgZmFsc2UpO1xuICAgIG5nRGV2TW9kZSAmJlxuICAgICAgICBzdG9yZVByb3BlcnR5QmluZGluZ01ldGFkYXRhKFxuICAgICAgICAgICAgdFZpZXcuZGF0YSwgdE5vZGUsIHByb3BOYW1lLCBnZXRCaW5kaW5nSW5kZXgoKSAtIDMsIHByZWZpeCwgaTAsIGkxLCBzdWZmaXgpO1xuICB9XG4gIHJldHVybiDJtcm1cHJvcGVydHlJbnRlcnBvbGF0ZTM7XG59XG5cbi8qKlxuICpcbiAqIFVwZGF0ZSBhbiBpbnRlcnBvbGF0ZWQgcHJvcGVydHkgb24gYW4gZWxlbWVudCB3aXRoIDQgYm91bmQgdmFsdWVzIHN1cnJvdW5kZWQgYnkgdGV4dC5cbiAqXG4gKiBVc2VkIHdoZW4gdGhlIHZhbHVlIHBhc3NlZCB0byBhIHByb3BlcnR5IGhhcyA0IGludGVycG9sYXRlZCB2YWx1ZXMgaW4gaXQ6XG4gKlxuICogYGBgaHRtbFxuICogPGRpdiB0aXRsZT1cInByZWZpeHt7djB9fS17e3YxfX0te3t2Mn19LXt7djN9fXN1ZmZpeFwiPjwvZGl2PlxuICogYGBgXG4gKlxuICogSXRzIGNvbXBpbGVkIHJlcHJlc2VudGF0aW9uIGlzOjpcbiAqXG4gKiBgYGB0c1xuICogybXJtXByb3BlcnR5SW50ZXJwb2xhdGU0KFxuICogJ3RpdGxlJywgJ3ByZWZpeCcsIHYwLCAnLScsIHYxLCAnLScsIHYyLCAnLScsIHYzLCAnc3VmZml4Jyk7XG4gKiBgYGBcbiAqXG4gKiBJZiB0aGUgcHJvcGVydHkgbmFtZSBhbHNvIGV4aXN0cyBhcyBhbiBpbnB1dCBwcm9wZXJ0eSBvbiBvbmUgb2YgdGhlIGVsZW1lbnQncyBkaXJlY3RpdmVzLFxuICogdGhlIGNvbXBvbmVudCBwcm9wZXJ0eSB3aWxsIGJlIHNldCBpbnN0ZWFkIG9mIHRoZSBlbGVtZW50IHByb3BlcnR5LiBUaGlzIGNoZWNrIG11c3RcbiAqIGJlIGNvbmR1Y3RlZCBhdCBydW50aW1lIHNvIGNoaWxkIGNvbXBvbmVudHMgdGhhdCBhZGQgbmV3IGBASW5wdXRzYCBkb24ndCBoYXZlIHRvIGJlIHJlLWNvbXBpbGVkLlxuICpcbiAqIEBwYXJhbSBwcm9wTmFtZSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gdXBkYXRlXG4gKiBAcGFyYW0gcHJlZml4IFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjAgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIGkwIFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjEgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIGkxIFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjIgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIGkyIFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjMgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIHN1ZmZpeCBTdGF0aWMgdmFsdWUgdXNlZCBmb3IgY29uY2F0ZW5hdGlvbiBvbmx5LlxuICogQHBhcmFtIHNhbml0aXplciBBbiBvcHRpb25hbCBzYW5pdGl6ZXIgZnVuY3Rpb25cbiAqIEByZXR1cm5zIGl0c2VsZiwgc28gdGhhdCBpdCBtYXkgYmUgY2hhaW5lZC5cbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1cHJvcGVydHlJbnRlcnBvbGF0ZTQoXG4gICAgcHJvcE5hbWU6IHN0cmluZywgcHJlZml4OiBzdHJpbmcsIHYwOiBhbnksIGkwOiBzdHJpbmcsIHYxOiBhbnksIGkxOiBzdHJpbmcsIHYyOiBhbnksIGkyOiBzdHJpbmcsXG4gICAgdjM6IGFueSwgc3VmZml4OiBzdHJpbmcsIHNhbml0aXplcj86IFNhbml0aXplckZuKTogdHlwZW9mIMm1ybVwcm9wZXJ0eUludGVycG9sYXRlNCB7XG4gIGNvbnN0IGxWaWV3ID0gZ2V0TFZpZXcoKTtcbiAgY29uc3QgaW50ZXJwb2xhdGVkVmFsdWUgPSBpbnRlcnBvbGF0aW9uNChsVmlldywgcHJlZml4LCB2MCwgaTAsIHYxLCBpMSwgdjIsIGkyLCB2Mywgc3VmZml4KTtcbiAgaWYgKGludGVycG9sYXRlZFZhbHVlICE9PSBOT19DSEFOR0UpIHtcbiAgICBjb25zdCB0VmlldyA9IGdldFRWaWV3KCk7XG4gICAgY29uc3QgdE5vZGUgPSBnZXRTZWxlY3RlZFROb2RlKCk7XG4gICAgZWxlbWVudFByb3BlcnR5SW50ZXJuYWwoXG4gICAgICAgIHRWaWV3LCB0Tm9kZSwgbFZpZXcsIHByb3BOYW1lLCBpbnRlcnBvbGF0ZWRWYWx1ZSwgbFZpZXdbUkVOREVSRVJdLCBzYW5pdGl6ZXIsIGZhbHNlKTtcbiAgICBuZ0Rldk1vZGUgJiZcbiAgICAgICAgc3RvcmVQcm9wZXJ0eUJpbmRpbmdNZXRhZGF0YShcbiAgICAgICAgICAgIHRWaWV3LmRhdGEsIHROb2RlLCBwcm9wTmFtZSwgZ2V0QmluZGluZ0luZGV4KCkgLSA0LCBwcmVmaXgsIGkwLCBpMSwgaTIsIHN1ZmZpeCk7XG4gIH1cbiAgcmV0dXJuIMm1ybVwcm9wZXJ0eUludGVycG9sYXRlNDtcbn1cblxuLyoqXG4gKlxuICogVXBkYXRlIGFuIGludGVycG9sYXRlZCBwcm9wZXJ0eSBvbiBhbiBlbGVtZW50IHdpdGggNSBib3VuZCB2YWx1ZXMgc3Vycm91bmRlZCBieSB0ZXh0LlxuICpcbiAqIFVzZWQgd2hlbiB0aGUgdmFsdWUgcGFzc2VkIHRvIGEgcHJvcGVydHkgaGFzIDUgaW50ZXJwb2xhdGVkIHZhbHVlcyBpbiBpdDpcbiAqXG4gKiBgYGBodG1sXG4gKiA8ZGl2IHRpdGxlPVwicHJlZml4e3t2MH19LXt7djF9fS17e3YyfX0te3t2M319LXt7djR9fXN1ZmZpeFwiPjwvZGl2PlxuICogYGBgXG4gKlxuICogSXRzIGNvbXBpbGVkIHJlcHJlc2VudGF0aW9uIGlzOjpcbiAqXG4gKiBgYGB0c1xuICogybXJtXByb3BlcnR5SW50ZXJwb2xhdGU1KFxuICogJ3RpdGxlJywgJ3ByZWZpeCcsIHYwLCAnLScsIHYxLCAnLScsIHYyLCAnLScsIHYzLCAnLScsIHY0LCAnc3VmZml4Jyk7XG4gKiBgYGBcbiAqXG4gKiBJZiB0aGUgcHJvcGVydHkgbmFtZSBhbHNvIGV4aXN0cyBhcyBhbiBpbnB1dCBwcm9wZXJ0eSBvbiBvbmUgb2YgdGhlIGVsZW1lbnQncyBkaXJlY3RpdmVzLFxuICogdGhlIGNvbXBvbmVudCBwcm9wZXJ0eSB3aWxsIGJlIHNldCBpbnN0ZWFkIG9mIHRoZSBlbGVtZW50IHByb3BlcnR5LiBUaGlzIGNoZWNrIG11c3RcbiAqIGJlIGNvbmR1Y3RlZCBhdCBydW50aW1lIHNvIGNoaWxkIGNvbXBvbmVudHMgdGhhdCBhZGQgbmV3IGBASW5wdXRzYCBkb24ndCBoYXZlIHRvIGJlIHJlLWNvbXBpbGVkLlxuICpcbiAqIEBwYXJhbSBwcm9wTmFtZSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gdXBkYXRlXG4gKiBAcGFyYW0gcHJlZml4IFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjAgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIGkwIFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjEgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIGkxIFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjIgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIGkyIFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjMgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIGkzIFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjQgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIHN1ZmZpeCBTdGF0aWMgdmFsdWUgdXNlZCBmb3IgY29uY2F0ZW5hdGlvbiBvbmx5LlxuICogQHBhcmFtIHNhbml0aXplciBBbiBvcHRpb25hbCBzYW5pdGl6ZXIgZnVuY3Rpb25cbiAqIEByZXR1cm5zIGl0c2VsZiwgc28gdGhhdCBpdCBtYXkgYmUgY2hhaW5lZC5cbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1cHJvcGVydHlJbnRlcnBvbGF0ZTUoXG4gICAgcHJvcE5hbWU6IHN0cmluZywgcHJlZml4OiBzdHJpbmcsIHYwOiBhbnksIGkwOiBzdHJpbmcsIHYxOiBhbnksIGkxOiBzdHJpbmcsIHYyOiBhbnksIGkyOiBzdHJpbmcsXG4gICAgdjM6IGFueSwgaTM6IHN0cmluZywgdjQ6IGFueSwgc3VmZml4OiBzdHJpbmcsXG4gICAgc2FuaXRpemVyPzogU2FuaXRpemVyRm4pOiB0eXBlb2YgybXJtXByb3BlcnR5SW50ZXJwb2xhdGU1IHtcbiAgY29uc3QgbFZpZXcgPSBnZXRMVmlldygpO1xuICBjb25zdCBpbnRlcnBvbGF0ZWRWYWx1ZSA9XG4gICAgICBpbnRlcnBvbGF0aW9uNShsVmlldywgcHJlZml4LCB2MCwgaTAsIHYxLCBpMSwgdjIsIGkyLCB2MywgaTMsIHY0LCBzdWZmaXgpO1xuICBpZiAoaW50ZXJwb2xhdGVkVmFsdWUgIT09IE5PX0NIQU5HRSkge1xuICAgIGNvbnN0IHRWaWV3ID0gZ2V0VFZpZXcoKTtcbiAgICBjb25zdCB0Tm9kZSA9IGdldFNlbGVjdGVkVE5vZGUoKTtcbiAgICBlbGVtZW50UHJvcGVydHlJbnRlcm5hbChcbiAgICAgICAgdFZpZXcsIHROb2RlLCBsVmlldywgcHJvcE5hbWUsIGludGVycG9sYXRlZFZhbHVlLCBsVmlld1tSRU5ERVJFUl0sIHNhbml0aXplciwgZmFsc2UpO1xuICAgIG5nRGV2TW9kZSAmJlxuICAgICAgICBzdG9yZVByb3BlcnR5QmluZGluZ01ldGFkYXRhKFxuICAgICAgICAgICAgdFZpZXcuZGF0YSwgdE5vZGUsIHByb3BOYW1lLCBnZXRCaW5kaW5nSW5kZXgoKSAtIDUsIHByZWZpeCwgaTAsIGkxLCBpMiwgaTMsIHN1ZmZpeCk7XG4gIH1cbiAgcmV0dXJuIMm1ybVwcm9wZXJ0eUludGVycG9sYXRlNTtcbn1cblxuLyoqXG4gKlxuICogVXBkYXRlIGFuIGludGVycG9sYXRlZCBwcm9wZXJ0eSBvbiBhbiBlbGVtZW50IHdpdGggNiBib3VuZCB2YWx1ZXMgc3Vycm91bmRlZCBieSB0ZXh0LlxuICpcbiAqIFVzZWQgd2hlbiB0aGUgdmFsdWUgcGFzc2VkIHRvIGEgcHJvcGVydHkgaGFzIDYgaW50ZXJwb2xhdGVkIHZhbHVlcyBpbiBpdDpcbiAqXG4gKiBgYGBodG1sXG4gKiA8ZGl2IHRpdGxlPVwicHJlZml4e3t2MH19LXt7djF9fS17e3YyfX0te3t2M319LXt7djR9fS17e3Y1fX1zdWZmaXhcIj48L2Rpdj5cbiAqIGBgYFxuICpcbiAqIEl0cyBjb21waWxlZCByZXByZXNlbnRhdGlvbiBpczo6XG4gKlxuICogYGBgdHNcbiAqIMm1ybVwcm9wZXJ0eUludGVycG9sYXRlNihcbiAqICAgICd0aXRsZScsICdwcmVmaXgnLCB2MCwgJy0nLCB2MSwgJy0nLCB2MiwgJy0nLCB2MywgJy0nLCB2NCwgJy0nLCB2NSwgJ3N1ZmZpeCcpO1xuICogYGBgXG4gKlxuICogSWYgdGhlIHByb3BlcnR5IG5hbWUgYWxzbyBleGlzdHMgYXMgYW4gaW5wdXQgcHJvcGVydHkgb24gb25lIG9mIHRoZSBlbGVtZW50J3MgZGlyZWN0aXZlcyxcbiAqIHRoZSBjb21wb25lbnQgcHJvcGVydHkgd2lsbCBiZSBzZXQgaW5zdGVhZCBvZiB0aGUgZWxlbWVudCBwcm9wZXJ0eS4gVGhpcyBjaGVjayBtdXN0XG4gKiBiZSBjb25kdWN0ZWQgYXQgcnVudGltZSBzbyBjaGlsZCBjb21wb25lbnRzIHRoYXQgYWRkIG5ldyBgQElucHV0c2AgZG9uJ3QgaGF2ZSB0byBiZSByZS1jb21waWxlZC5cbiAqXG4gKiBAcGFyYW0gcHJvcE5hbWUgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIHVwZGF0ZVxuICogQHBhcmFtIHByZWZpeCBTdGF0aWMgdmFsdWUgdXNlZCBmb3IgY29uY2F0ZW5hdGlvbiBvbmx5LlxuICogQHBhcmFtIHYwIFZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSBpMCBTdGF0aWMgdmFsdWUgdXNlZCBmb3IgY29uY2F0ZW5hdGlvbiBvbmx5LlxuICogQHBhcmFtIHYxIFZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSBpMSBTdGF0aWMgdmFsdWUgdXNlZCBmb3IgY29uY2F0ZW5hdGlvbiBvbmx5LlxuICogQHBhcmFtIHYyIFZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSBpMiBTdGF0aWMgdmFsdWUgdXNlZCBmb3IgY29uY2F0ZW5hdGlvbiBvbmx5LlxuICogQHBhcmFtIHYzIFZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSBpMyBTdGF0aWMgdmFsdWUgdXNlZCBmb3IgY29uY2F0ZW5hdGlvbiBvbmx5LlxuICogQHBhcmFtIHY0IFZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSBpNCBTdGF0aWMgdmFsdWUgdXNlZCBmb3IgY29uY2F0ZW5hdGlvbiBvbmx5LlxuICogQHBhcmFtIHY1IFZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSBzdWZmaXggU3RhdGljIHZhbHVlIHVzZWQgZm9yIGNvbmNhdGVuYXRpb24gb25seS5cbiAqIEBwYXJhbSBzYW5pdGl6ZXIgQW4gb3B0aW9uYWwgc2FuaXRpemVyIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyBpdHNlbGYsIHNvIHRoYXQgaXQgbWF5IGJlIGNoYWluZWQuXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtXByb3BlcnR5SW50ZXJwb2xhdGU2KFxuICAgIHByb3BOYW1lOiBzdHJpbmcsIHByZWZpeDogc3RyaW5nLCB2MDogYW55LCBpMDogc3RyaW5nLCB2MTogYW55LCBpMTogc3RyaW5nLCB2MjogYW55LCBpMjogc3RyaW5nLFxuICAgIHYzOiBhbnksIGkzOiBzdHJpbmcsIHY0OiBhbnksIGk0OiBzdHJpbmcsIHY1OiBhbnksIHN1ZmZpeDogc3RyaW5nLFxuICAgIHNhbml0aXplcj86IFNhbml0aXplckZuKTogdHlwZW9mIMm1ybVwcm9wZXJ0eUludGVycG9sYXRlNiB7XG4gIGNvbnN0IGxWaWV3ID0gZ2V0TFZpZXcoKTtcbiAgY29uc3QgaW50ZXJwb2xhdGVkVmFsdWUgPVxuICAgICAgaW50ZXJwb2xhdGlvbjYobFZpZXcsIHByZWZpeCwgdjAsIGkwLCB2MSwgaTEsIHYyLCBpMiwgdjMsIGkzLCB2NCwgaTQsIHY1LCBzdWZmaXgpO1xuICBpZiAoaW50ZXJwb2xhdGVkVmFsdWUgIT09IE5PX0NIQU5HRSkge1xuICAgIGNvbnN0IHRWaWV3ID0gZ2V0VFZpZXcoKTtcbiAgICBjb25zdCB0Tm9kZSA9IGdldFNlbGVjdGVkVE5vZGUoKTtcbiAgICBlbGVtZW50UHJvcGVydHlJbnRlcm5hbChcbiAgICAgICAgdFZpZXcsIHROb2RlLCBsVmlldywgcHJvcE5hbWUsIGludGVycG9sYXRlZFZhbHVlLCBsVmlld1tSRU5ERVJFUl0sIHNhbml0aXplciwgZmFsc2UpO1xuICAgIG5nRGV2TW9kZSAmJlxuICAgICAgICBzdG9yZVByb3BlcnR5QmluZGluZ01ldGFkYXRhKFxuICAgICAgICAgICAgdFZpZXcuZGF0YSwgdE5vZGUsIHByb3BOYW1lLCBnZXRCaW5kaW5nSW5kZXgoKSAtIDYsIHByZWZpeCwgaTAsIGkxLCBpMiwgaTMsIGk0LCBzdWZmaXgpO1xuICB9XG4gIHJldHVybiDJtcm1cHJvcGVydHlJbnRlcnBvbGF0ZTY7XG59XG5cbi8qKlxuICpcbiAqIFVwZGF0ZSBhbiBpbnRlcnBvbGF0ZWQgcHJvcGVydHkgb24gYW4gZWxlbWVudCB3aXRoIDcgYm91bmQgdmFsdWVzIHN1cnJvdW5kZWQgYnkgdGV4dC5cbiAqXG4gKiBVc2VkIHdoZW4gdGhlIHZhbHVlIHBhc3NlZCB0byBhIHByb3BlcnR5IGhhcyA3IGludGVycG9sYXRlZCB2YWx1ZXMgaW4gaXQ6XG4gKlxuICogYGBgaHRtbFxuICogPGRpdiB0aXRsZT1cInByZWZpeHt7djB9fS17e3YxfX0te3t2Mn19LXt7djN9fS17e3Y0fX0te3t2NX19LXt7djZ9fXN1ZmZpeFwiPjwvZGl2PlxuICogYGBgXG4gKlxuICogSXRzIGNvbXBpbGVkIHJlcHJlc2VudGF0aW9uIGlzOjpcbiAqXG4gKiBgYGB0c1xuICogybXJtXByb3BlcnR5SW50ZXJwb2xhdGU3KFxuICogICAgJ3RpdGxlJywgJ3ByZWZpeCcsIHYwLCAnLScsIHYxLCAnLScsIHYyLCAnLScsIHYzLCAnLScsIHY0LCAnLScsIHY1LCAnLScsIHY2LCAnc3VmZml4Jyk7XG4gKiBgYGBcbiAqXG4gKiBJZiB0aGUgcHJvcGVydHkgbmFtZSBhbHNvIGV4aXN0cyBhcyBhbiBpbnB1dCBwcm9wZXJ0eSBvbiBvbmUgb2YgdGhlIGVsZW1lbnQncyBkaXJlY3RpdmVzLFxuICogdGhlIGNvbXBvbmVudCBwcm9wZXJ0eSB3aWxsIGJlIHNldCBpbnN0ZWFkIG9mIHRoZSBlbGVtZW50IHByb3BlcnR5LiBUaGlzIGNoZWNrIG11c3RcbiAqIGJlIGNvbmR1Y3RlZCBhdCBydW50aW1lIHNvIGNoaWxkIGNvbXBvbmVudHMgdGhhdCBhZGQgbmV3IGBASW5wdXRzYCBkb24ndCBoYXZlIHRvIGJlIHJlLWNvbXBpbGVkLlxuICpcbiAqIEBwYXJhbSBwcm9wTmFtZSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gdXBkYXRlXG4gKiBAcGFyYW0gcHJlZml4IFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjAgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIGkwIFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjEgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIGkxIFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjIgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIGkyIFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjMgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIGkzIFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjQgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIGk0IFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjUgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIGk1IFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjYgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIHN1ZmZpeCBTdGF0aWMgdmFsdWUgdXNlZCBmb3IgY29uY2F0ZW5hdGlvbiBvbmx5LlxuICogQHBhcmFtIHNhbml0aXplciBBbiBvcHRpb25hbCBzYW5pdGl6ZXIgZnVuY3Rpb25cbiAqIEByZXR1cm5zIGl0c2VsZiwgc28gdGhhdCBpdCBtYXkgYmUgY2hhaW5lZC5cbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1cHJvcGVydHlJbnRlcnBvbGF0ZTcoXG4gICAgcHJvcE5hbWU6IHN0cmluZywgcHJlZml4OiBzdHJpbmcsIHYwOiBhbnksIGkwOiBzdHJpbmcsIHYxOiBhbnksIGkxOiBzdHJpbmcsIHYyOiBhbnksIGkyOiBzdHJpbmcsXG4gICAgdjM6IGFueSwgaTM6IHN0cmluZywgdjQ6IGFueSwgaTQ6IHN0cmluZywgdjU6IGFueSwgaTU6IHN0cmluZywgdjY6IGFueSwgc3VmZml4OiBzdHJpbmcsXG4gICAgc2FuaXRpemVyPzogU2FuaXRpemVyRm4pOiB0eXBlb2YgybXJtXByb3BlcnR5SW50ZXJwb2xhdGU3IHtcbiAgY29uc3QgbFZpZXcgPSBnZXRMVmlldygpO1xuICBjb25zdCBpbnRlcnBvbGF0ZWRWYWx1ZSA9XG4gICAgICBpbnRlcnBvbGF0aW9uNyhsVmlldywgcHJlZml4LCB2MCwgaTAsIHYxLCBpMSwgdjIsIGkyLCB2MywgaTMsIHY0LCBpNCwgdjUsIGk1LCB2Niwgc3VmZml4KTtcbiAgaWYgKGludGVycG9sYXRlZFZhbHVlICE9PSBOT19DSEFOR0UpIHtcbiAgICBjb25zdCB0VmlldyA9IGdldFRWaWV3KCk7XG4gICAgY29uc3QgdE5vZGUgPSBnZXRTZWxlY3RlZFROb2RlKCk7XG4gICAgZWxlbWVudFByb3BlcnR5SW50ZXJuYWwoXG4gICAgICAgIHRWaWV3LCB0Tm9kZSwgbFZpZXcsIHByb3BOYW1lLCBpbnRlcnBvbGF0ZWRWYWx1ZSwgbFZpZXdbUkVOREVSRVJdLCBzYW5pdGl6ZXIsIGZhbHNlKTtcbiAgICBuZ0Rldk1vZGUgJiZcbiAgICAgICAgc3RvcmVQcm9wZXJ0eUJpbmRpbmdNZXRhZGF0YShcbiAgICAgICAgICAgIHRWaWV3LmRhdGEsIHROb2RlLCBwcm9wTmFtZSwgZ2V0QmluZGluZ0luZGV4KCkgLSA3LCBwcmVmaXgsIGkwLCBpMSwgaTIsIGkzLCBpNCwgaTUsXG4gICAgICAgICAgICBzdWZmaXgpO1xuICB9XG4gIHJldHVybiDJtcm1cHJvcGVydHlJbnRlcnBvbGF0ZTc7XG59XG5cbi8qKlxuICpcbiAqIFVwZGF0ZSBhbiBpbnRlcnBvbGF0ZWQgcHJvcGVydHkgb24gYW4gZWxlbWVudCB3aXRoIDggYm91bmQgdmFsdWVzIHN1cnJvdW5kZWQgYnkgdGV4dC5cbiAqXG4gKiBVc2VkIHdoZW4gdGhlIHZhbHVlIHBhc3NlZCB0byBhIHByb3BlcnR5IGhhcyA4IGludGVycG9sYXRlZCB2YWx1ZXMgaW4gaXQ6XG4gKlxuICogYGBgaHRtbFxuICogPGRpdiB0aXRsZT1cInByZWZpeHt7djB9fS17e3YxfX0te3t2Mn19LXt7djN9fS17e3Y0fX0te3t2NX19LXt7djZ9fS17e3Y3fX1zdWZmaXhcIj48L2Rpdj5cbiAqIGBgYFxuICpcbiAqIEl0cyBjb21waWxlZCByZXByZXNlbnRhdGlvbiBpczo6XG4gKlxuICogYGBgdHNcbiAqIMm1ybVwcm9wZXJ0eUludGVycG9sYXRlOChcbiAqICAndGl0bGUnLCAncHJlZml4JywgdjAsICctJywgdjEsICctJywgdjIsICctJywgdjMsICctJywgdjQsICctJywgdjUsICctJywgdjYsICctJywgdjcsICdzdWZmaXgnKTtcbiAqIGBgYFxuICpcbiAqIElmIHRoZSBwcm9wZXJ0eSBuYW1lIGFsc28gZXhpc3RzIGFzIGFuIGlucHV0IHByb3BlcnR5IG9uIG9uZSBvZiB0aGUgZWxlbWVudCdzIGRpcmVjdGl2ZXMsXG4gKiB0aGUgY29tcG9uZW50IHByb3BlcnR5IHdpbGwgYmUgc2V0IGluc3RlYWQgb2YgdGhlIGVsZW1lbnQgcHJvcGVydHkuIFRoaXMgY2hlY2sgbXVzdFxuICogYmUgY29uZHVjdGVkIGF0IHJ1bnRpbWUgc28gY2hpbGQgY29tcG9uZW50cyB0aGF0IGFkZCBuZXcgYEBJbnB1dHNgIGRvbid0IGhhdmUgdG8gYmUgcmUtY29tcGlsZWQuXG4gKlxuICogQHBhcmFtIHByb3BOYW1lIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byB1cGRhdGVcbiAqIEBwYXJhbSBwcmVmaXggU3RhdGljIHZhbHVlIHVzZWQgZm9yIGNvbmNhdGVuYXRpb24gb25seS5cbiAqIEBwYXJhbSB2MCBWYWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gaTAgU3RhdGljIHZhbHVlIHVzZWQgZm9yIGNvbmNhdGVuYXRpb24gb25seS5cbiAqIEBwYXJhbSB2MSBWYWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gaTEgU3RhdGljIHZhbHVlIHVzZWQgZm9yIGNvbmNhdGVuYXRpb24gb25seS5cbiAqIEBwYXJhbSB2MiBWYWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gaTIgU3RhdGljIHZhbHVlIHVzZWQgZm9yIGNvbmNhdGVuYXRpb24gb25seS5cbiAqIEBwYXJhbSB2MyBWYWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gaTMgU3RhdGljIHZhbHVlIHVzZWQgZm9yIGNvbmNhdGVuYXRpb24gb25seS5cbiAqIEBwYXJhbSB2NCBWYWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gaTQgU3RhdGljIHZhbHVlIHVzZWQgZm9yIGNvbmNhdGVuYXRpb24gb25seS5cbiAqIEBwYXJhbSB2NSBWYWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gaTUgU3RhdGljIHZhbHVlIHVzZWQgZm9yIGNvbmNhdGVuYXRpb24gb25seS5cbiAqIEBwYXJhbSB2NiBWYWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gaTYgU3RhdGljIHZhbHVlIHVzZWQgZm9yIGNvbmNhdGVuYXRpb24gb25seS5cbiAqIEBwYXJhbSB2NyBWYWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gc3VmZml4IFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gc2FuaXRpemVyIEFuIG9wdGlvbmFsIHNhbml0aXplciBmdW5jdGlvblxuICogQHJldHVybnMgaXRzZWxmLCBzbyB0aGF0IGl0IG1heSBiZSBjaGFpbmVkLlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVwcm9wZXJ0eUludGVycG9sYXRlOChcbiAgICBwcm9wTmFtZTogc3RyaW5nLCBwcmVmaXg6IHN0cmluZywgdjA6IGFueSwgaTA6IHN0cmluZywgdjE6IGFueSwgaTE6IHN0cmluZywgdjI6IGFueSwgaTI6IHN0cmluZyxcbiAgICB2MzogYW55LCBpMzogc3RyaW5nLCB2NDogYW55LCBpNDogc3RyaW5nLCB2NTogYW55LCBpNTogc3RyaW5nLCB2NjogYW55LCBpNjogc3RyaW5nLCB2NzogYW55LFxuICAgIHN1ZmZpeDogc3RyaW5nLCBzYW5pdGl6ZXI/OiBTYW5pdGl6ZXJGbik6IHR5cGVvZiDJtcm1cHJvcGVydHlJbnRlcnBvbGF0ZTgge1xuICBjb25zdCBsVmlldyA9IGdldExWaWV3KCk7XG4gIGNvbnN0IGludGVycG9sYXRlZFZhbHVlID0gaW50ZXJwb2xhdGlvbjgoXG4gICAgICBsVmlldywgcHJlZml4LCB2MCwgaTAsIHYxLCBpMSwgdjIsIGkyLCB2MywgaTMsIHY0LCBpNCwgdjUsIGk1LCB2NiwgaTYsIHY3LCBzdWZmaXgpO1xuICBpZiAoaW50ZXJwb2xhdGVkVmFsdWUgIT09IE5PX0NIQU5HRSkge1xuICAgIGNvbnN0IHRWaWV3ID0gZ2V0VFZpZXcoKTtcbiAgICBjb25zdCB0Tm9kZSA9IGdldFNlbGVjdGVkVE5vZGUoKTtcbiAgICBlbGVtZW50UHJvcGVydHlJbnRlcm5hbChcbiAgICAgICAgdFZpZXcsIHROb2RlLCBsVmlldywgcHJvcE5hbWUsIGludGVycG9sYXRlZFZhbHVlLCBsVmlld1tSRU5ERVJFUl0sIHNhbml0aXplciwgZmFsc2UpO1xuICAgIG5nRGV2TW9kZSAmJlxuICAgICAgICBzdG9yZVByb3BlcnR5QmluZGluZ01ldGFkYXRhKFxuICAgICAgICAgICAgdFZpZXcuZGF0YSwgdE5vZGUsIHByb3BOYW1lLCBnZXRCaW5kaW5nSW5kZXgoKSAtIDgsIHByZWZpeCwgaTAsIGkxLCBpMiwgaTMsIGk0LCBpNSwgaTYsXG4gICAgICAgICAgICBzdWZmaXgpO1xuICB9XG4gIHJldHVybiDJtcm1cHJvcGVydHlJbnRlcnBvbGF0ZTg7XG59XG5cbi8qKlxuICogVXBkYXRlIGFuIGludGVycG9sYXRlZCBwcm9wZXJ0eSBvbiBhbiBlbGVtZW50IHdpdGggOSBvciBtb3JlIGJvdW5kIHZhbHVlcyBzdXJyb3VuZGVkIGJ5IHRleHQuXG4gKlxuICogVXNlZCB3aGVuIHRoZSBudW1iZXIgb2YgaW50ZXJwb2xhdGVkIHZhbHVlcyBleGNlZWRzIDguXG4gKlxuICogYGBgaHRtbFxuICogPGRpdlxuICogIHRpdGxlPVwicHJlZml4e3t2MH19LXt7djF9fS17e3YyfX0te3t2M319LXt7djR9fS17e3Y1fX0te3t2Nn19LXt7djd9fS17e3Y4fX0te3t2OX19c3VmZml4XCI+PC9kaXY+XG4gKiBgYGBcbiAqXG4gKiBJdHMgY29tcGlsZWQgcmVwcmVzZW50YXRpb24gaXM6OlxuICpcbiAqIGBgYHRzXG4gKiDJtcm1cHJvcGVydHlJbnRlcnBvbGF0ZVYoXG4gKiAgJ3RpdGxlJywgWydwcmVmaXgnLCB2MCwgJy0nLCB2MSwgJy0nLCB2MiwgJy0nLCB2MywgJy0nLCB2NCwgJy0nLCB2NSwgJy0nLCB2NiwgJy0nLCB2NywgJy0nLCB2OSxcbiAqICAnc3VmZml4J10pO1xuICogYGBgXG4gKlxuICogSWYgdGhlIHByb3BlcnR5IG5hbWUgYWxzbyBleGlzdHMgYXMgYW4gaW5wdXQgcHJvcGVydHkgb24gb25lIG9mIHRoZSBlbGVtZW50J3MgZGlyZWN0aXZlcyxcbiAqIHRoZSBjb21wb25lbnQgcHJvcGVydHkgd2lsbCBiZSBzZXQgaW5zdGVhZCBvZiB0aGUgZWxlbWVudCBwcm9wZXJ0eS4gVGhpcyBjaGVjayBtdXN0XG4gKiBiZSBjb25kdWN0ZWQgYXQgcnVudGltZSBzbyBjaGlsZCBjb21wb25lbnRzIHRoYXQgYWRkIG5ldyBgQElucHV0c2AgZG9uJ3QgaGF2ZSB0byBiZSByZS1jb21waWxlZC5cbiAqXG4gKiBAcGFyYW0gcHJvcE5hbWUgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSB2YWx1ZXMgVGhlIGNvbGxlY3Rpb24gb2YgdmFsdWVzIGFuZCB0aGUgc3RyaW5ncyBpbiBiZXR3ZWVuIHRob3NlIHZhbHVlcywgYmVnaW5uaW5nIHdpdGggYVxuICogc3RyaW5nIHByZWZpeCBhbmQgZW5kaW5nIHdpdGggYSBzdHJpbmcgc3VmZml4LlxuICogKGUuZy4gYFsncHJlZml4JywgdmFsdWUwLCAnLScsIHZhbHVlMSwgJy0nLCB2YWx1ZTIsIC4uLiwgdmFsdWU5OSwgJ3N1ZmZpeCddYClcbiAqIEBwYXJhbSBzYW5pdGl6ZXIgQW4gb3B0aW9uYWwgc2FuaXRpemVyIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyBpdHNlbGYsIHNvIHRoYXQgaXQgbWF5IGJlIGNoYWluZWQuXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtXByb3BlcnR5SW50ZXJwb2xhdGVWKFxuICAgIHByb3BOYW1lOiBzdHJpbmcsIHZhbHVlczogYW55W10sIHNhbml0aXplcj86IFNhbml0aXplckZuKTogdHlwZW9mIMm1ybVwcm9wZXJ0eUludGVycG9sYXRlViB7XG4gIGNvbnN0IGxWaWV3ID0gZ2V0TFZpZXcoKTtcbiAgY29uc3QgaW50ZXJwb2xhdGVkVmFsdWUgPSBpbnRlcnBvbGF0aW9uVihsVmlldywgdmFsdWVzKTtcbiAgaWYgKGludGVycG9sYXRlZFZhbHVlICE9PSBOT19DSEFOR0UpIHtcbiAgICBjb25zdCB0VmlldyA9IGdldFRWaWV3KCk7XG4gICAgY29uc3QgdE5vZGUgPSBnZXRTZWxlY3RlZFROb2RlKCk7XG4gICAgZWxlbWVudFByb3BlcnR5SW50ZXJuYWwoXG4gICAgICAgIHRWaWV3LCB0Tm9kZSwgbFZpZXcsIHByb3BOYW1lLCBpbnRlcnBvbGF0ZWRWYWx1ZSwgbFZpZXdbUkVOREVSRVJdLCBzYW5pdGl6ZXIsIGZhbHNlKTtcbiAgICBpZiAobmdEZXZNb2RlKSB7XG4gICAgICBjb25zdCBpbnRlcnBvbGF0aW9uSW5CZXR3ZWVuID0gW3ZhbHVlc1swXV07ICAvLyBwcmVmaXhcbiAgICAgIGZvciAobGV0IGkgPSAyOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgIGludGVycG9sYXRpb25JbkJldHdlZW4ucHVzaCh2YWx1ZXNbaV0pO1xuICAgICAgfVxuICAgICAgc3RvcmVQcm9wZXJ0eUJpbmRpbmdNZXRhZGF0YShcbiAgICAgICAgICB0Vmlldy5kYXRhLCB0Tm9kZSwgcHJvcE5hbWUsIGdldEJpbmRpbmdJbmRleCgpIC0gaW50ZXJwb2xhdGlvbkluQmV0d2Vlbi5sZW5ndGggKyAxLFxuICAgICAgICAgIC4uLmludGVycG9sYXRpb25JbkJldHdlZW4pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gybXJtXByb3BlcnR5SW50ZXJwb2xhdGVWO1xufVxuIl19