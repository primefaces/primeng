import { getBindingIndex, getLView, getSelectedTNode, getTView } from '../state';
import { NO_CHANGE } from '../tokens';
import { interpolation1, interpolation2, interpolation3, interpolation4, interpolation5, interpolation6, interpolation7, interpolation8, interpolationV } from './interpolation';
import { elementAttributeInternal, storePropertyBindingMetadata } from './shared';
/**
 *
 * Update an interpolated attribute on an element with single bound value surrounded by text.
 *
 * Used when the value passed to a property has 1 interpolated value in it:
 *
 * ```html
 * <div attr.title="prefix{{v0}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵattributeInterpolate1('title', 'prefix', v0, 'suffix');
 * ```
 *
 * @param attrName The name of the attribute to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export function ɵɵattributeInterpolate1(attrName, prefix, v0, suffix, sanitizer, namespace) {
    const lView = getLView();
    const interpolatedValue = interpolation1(lView, prefix, v0, suffix);
    if (interpolatedValue !== NO_CHANGE) {
        const tNode = getSelectedTNode();
        elementAttributeInternal(tNode, lView, attrName, interpolatedValue, sanitizer, namespace);
        ngDevMode &&
            storePropertyBindingMetadata(getTView().data, tNode, 'attr.' + attrName, getBindingIndex() - 1, prefix, suffix);
    }
    return ɵɵattributeInterpolate1;
}
/**
 *
 * Update an interpolated attribute on an element with 2 bound values surrounded by text.
 *
 * Used when the value passed to a property has 2 interpolated values in it:
 *
 * ```html
 * <div attr.title="prefix{{v0}}-{{v1}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵattributeInterpolate2('title', 'prefix', v0, '-', v1, 'suffix');
 * ```
 *
 * @param attrName The name of the attribute to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export function ɵɵattributeInterpolate2(attrName, prefix, v0, i0, v1, suffix, sanitizer, namespace) {
    const lView = getLView();
    const interpolatedValue = interpolation2(lView, prefix, v0, i0, v1, suffix);
    if (interpolatedValue !== NO_CHANGE) {
        const tNode = getSelectedTNode();
        elementAttributeInternal(tNode, lView, attrName, interpolatedValue, sanitizer, namespace);
        ngDevMode &&
            storePropertyBindingMetadata(getTView().data, tNode, 'attr.' + attrName, getBindingIndex() - 2, prefix, i0, suffix);
    }
    return ɵɵattributeInterpolate2;
}
/**
 *
 * Update an interpolated attribute on an element with 3 bound values surrounded by text.
 *
 * Used when the value passed to a property has 3 interpolated values in it:
 *
 * ```html
 * <div attr.title="prefix{{v0}}-{{v1}}-{{v2}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵattributeInterpolate3(
 * 'title', 'prefix', v0, '-', v1, '-', v2, 'suffix');
 * ```
 *
 * @param attrName The name of the attribute to update
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
export function ɵɵattributeInterpolate3(attrName, prefix, v0, i0, v1, i1, v2, suffix, sanitizer, namespace) {
    const lView = getLView();
    const interpolatedValue = interpolation3(lView, prefix, v0, i0, v1, i1, v2, suffix);
    if (interpolatedValue !== NO_CHANGE) {
        const tNode = getSelectedTNode();
        elementAttributeInternal(tNode, lView, attrName, interpolatedValue, sanitizer, namespace);
        ngDevMode &&
            storePropertyBindingMetadata(getTView().data, tNode, 'attr.' + attrName, getBindingIndex() - 3, prefix, i0, i1, suffix);
    }
    return ɵɵattributeInterpolate3;
}
/**
 *
 * Update an interpolated attribute on an element with 4 bound values surrounded by text.
 *
 * Used when the value passed to a property has 4 interpolated values in it:
 *
 * ```html
 * <div attr.title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵattributeInterpolate4(
 * 'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, 'suffix');
 * ```
 *
 * @param attrName The name of the attribute to update
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
export function ɵɵattributeInterpolate4(attrName, prefix, v0, i0, v1, i1, v2, i2, v3, suffix, sanitizer, namespace) {
    const lView = getLView();
    const interpolatedValue = interpolation4(lView, prefix, v0, i0, v1, i1, v2, i2, v3, suffix);
    if (interpolatedValue !== NO_CHANGE) {
        const tNode = getSelectedTNode();
        elementAttributeInternal(tNode, lView, attrName, interpolatedValue, sanitizer, namespace);
        ngDevMode &&
            storePropertyBindingMetadata(getTView().data, tNode, 'attr.' + attrName, getBindingIndex() - 4, prefix, i0, i1, i2, suffix);
    }
    return ɵɵattributeInterpolate4;
}
/**
 *
 * Update an interpolated attribute on an element with 5 bound values surrounded by text.
 *
 * Used when the value passed to a property has 5 interpolated values in it:
 *
 * ```html
 * <div attr.title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵattributeInterpolate5(
 * 'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, 'suffix');
 * ```
 *
 * @param attrName The name of the attribute to update
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
export function ɵɵattributeInterpolate5(attrName, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, suffix, sanitizer, namespace) {
    const lView = getLView();
    const interpolatedValue = interpolation5(lView, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, suffix);
    if (interpolatedValue !== NO_CHANGE) {
        const tNode = getSelectedTNode();
        elementAttributeInternal(tNode, lView, attrName, interpolatedValue, sanitizer, namespace);
        ngDevMode &&
            storePropertyBindingMetadata(getTView().data, tNode, 'attr.' + attrName, getBindingIndex() - 5, prefix, i0, i1, i2, i3, suffix);
    }
    return ɵɵattributeInterpolate5;
}
/**
 *
 * Update an interpolated attribute on an element with 6 bound values surrounded by text.
 *
 * Used when the value passed to a property has 6 interpolated values in it:
 *
 * ```html
 * <div attr.title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵattributeInterpolate6(
 *    'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, 'suffix');
 * ```
 *
 * @param attrName The name of the attribute to update
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
export function ɵɵattributeInterpolate6(attrName, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, suffix, sanitizer, namespace) {
    const lView = getLView();
    const interpolatedValue = interpolation6(lView, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, suffix);
    if (interpolatedValue !== NO_CHANGE) {
        const tNode = getSelectedTNode();
        elementAttributeInternal(tNode, lView, attrName, interpolatedValue, sanitizer, namespace);
        ngDevMode &&
            storePropertyBindingMetadata(getTView().data, tNode, 'attr.' + attrName, getBindingIndex() - 6, prefix, i0, i1, i2, i3, i4, suffix);
    }
    return ɵɵattributeInterpolate6;
}
/**
 *
 * Update an interpolated attribute on an element with 7 bound values surrounded by text.
 *
 * Used when the value passed to a property has 7 interpolated values in it:
 *
 * ```html
 * <div attr.title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}-{{v6}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵattributeInterpolate7(
 *    'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, 'suffix');
 * ```
 *
 * @param attrName The name of the attribute to update
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
export function ɵɵattributeInterpolate7(attrName, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, suffix, sanitizer, namespace) {
    const lView = getLView();
    const interpolatedValue = interpolation7(lView, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, suffix);
    if (interpolatedValue !== NO_CHANGE) {
        const tNode = getSelectedTNode();
        elementAttributeInternal(tNode, lView, attrName, interpolatedValue, sanitizer, namespace);
        ngDevMode &&
            storePropertyBindingMetadata(getTView().data, tNode, 'attr.' + attrName, getBindingIndex() - 7, prefix, i0, i1, i2, i3, i4, i5, suffix);
    }
    return ɵɵattributeInterpolate7;
}
/**
 *
 * Update an interpolated attribute on an element with 8 bound values surrounded by text.
 *
 * Used when the value passed to a property has 8 interpolated values in it:
 *
 * ```html
 * <div attr.title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}-{{v6}}-{{v7}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵattributeInterpolate8(
 *  'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, '-', v7, 'suffix');
 * ```
 *
 * @param attrName The name of the attribute to update
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
export function ɵɵattributeInterpolate8(attrName, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, i6, v7, suffix, sanitizer, namespace) {
    const lView = getLView();
    const interpolatedValue = interpolation8(lView, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, i6, v7, suffix);
    if (interpolatedValue !== NO_CHANGE) {
        const tNode = getSelectedTNode();
        elementAttributeInternal(tNode, lView, attrName, interpolatedValue, sanitizer, namespace);
        ngDevMode &&
            storePropertyBindingMetadata(getTView().data, tNode, 'attr.' + attrName, getBindingIndex() - 8, prefix, i0, i1, i2, i3, i4, i5, i6, suffix);
    }
    return ɵɵattributeInterpolate8;
}
/**
 * Update an interpolated attribute on an element with 9 or more bound values surrounded by text.
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
 * ɵɵattributeInterpolateV(
 *  'title', ['prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, '-', v7, '-', v9,
 *  'suffix']);
 * ```
 *
 * @param attrName The name of the attribute to update.
 * @param values The collection of values and the strings in-between those values, beginning with
 * a string prefix and ending with a string suffix.
 * (e.g. `['prefix', value0, '-', value1, '-', value2, ..., value99, 'suffix']`)
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export function ɵɵattributeInterpolateV(attrName, values, sanitizer, namespace) {
    const lView = getLView();
    const interpolated = interpolationV(lView, values);
    if (interpolated !== NO_CHANGE) {
        const tNode = getSelectedTNode();
        elementAttributeInternal(tNode, lView, attrName, interpolated, sanitizer, namespace);
        if (ngDevMode) {
            const interpolationInBetween = [values[0]]; // prefix
            for (let i = 2; i < values.length; i += 2) {
                interpolationInBetween.push(values[i]);
            }
            storePropertyBindingMetadata(getTView().data, tNode, 'attr.' + attrName, getBindingIndex() - interpolationInBetween.length + 1, ...interpolationInBetween);
        }
    }
    return ɵɵattributeInterpolateV;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRlX2ludGVycG9sYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2luc3RydWN0aW9ucy9hdHRyaWJ1dGVfaW50ZXJwb2xhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRQSxPQUFPLEVBQUMsZUFBZSxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDL0UsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUNwQyxPQUFPLEVBQUMsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMvSyxPQUFPLEVBQUMsd0JBQXdCLEVBQUUsNEJBQTRCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFJaEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsTUFBTSxVQUFVLHVCQUF1QixDQUNuQyxRQUFnQixFQUFFLE1BQWMsRUFBRSxFQUFPLEVBQUUsTUFBYyxFQUFFLFNBQXVCLEVBQ2xGLFNBQWtCO0lBQ3BCLE1BQU0sS0FBSyxHQUFHLFFBQVEsRUFBRSxDQUFDO0lBQ3pCLE1BQU0saUJBQWlCLEdBQUcsY0FBYyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3BFLElBQUksaUJBQWlCLEtBQUssU0FBUyxFQUFFLENBQUM7UUFDcEMsTUFBTSxLQUFLLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQztRQUNqQyx3QkFBd0IsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDMUYsU0FBUztZQUNMLDRCQUE0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QUUsT0FBTyxHQUFHLFFBQVEsRUFDMUMsZUFBZSxFQUFFLEdBQUcsc0JBQXNCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxHQUFHLHNCQUFzQixDQUFDLENBQUM7UUFDeEYsQ0FBQztJQUNILENBQUM7SUFDRCxPQUFPLHVCQUF1QixDQUFDO0FBQ2pDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7U2FuaXRpemVyRm59IGZyb20gJy4uL2ludGVyZmFjZXMvc2FuaXRpemF0aW9uJztcbmltcG9ydCB7Z2V0QmluZGluZ0luZGV4LCBnZXRMVmlldywgZ2V0U2VsZWN0ZWRUTm9kZSwgZ2V0VFZpZXd9IGZyb20gJy4uL3N0YXRlJztcbmltcG9ydCB7Tk9fQ0hBTkdFfSBmcm9tICcuLi90b2tlbnMnO1xuaW1wb3J0IHtpbnRlcnBvbGF0aW9uMSwgaW50ZXJwb2xhdGlvbjIsIGludGVycG9sYXRpb24zLCBpbnRlcnBvbGF0aW9uNCwgaW50ZXJwb2xhdGlvbjUsIGludGVycG9sYXRpb242LCBpbnRlcnBvbGF0aW9uNywgaW50ZXJwb2xhdGlvbjgsIGludGVycG9sYXRpb25WfSBmcm9tICcuL2ludGVycG9sYXRpb24nO1xuaW1wb3J0IHtlbGVtZW50QXR0cmlidXRlSW50ZXJuYWwsIHN0b3JlUHJvcGVydHlCaW5kaW5nTWV0YWRhdGF9IGZyb20gJy4vc2hhcmVkJztcblxuXG5cbi8qKlxuICpcbiAqIFVwZGF0ZSBhbiBpbnRlcnBvbGF0ZWQgYXR0cmlidXRlIG9uIGFuIGVsZW1lbnQgd2l0aCBzaW5nbGUgYm91bmQgdmFsdWUgc3Vycm91bmRlZCBieSB0ZXh0LlxuICpcbiAqIFVzZWQgd2hlbiB0aGUgdmFsdWUgcGFzc2VkIHRvIGEgcHJvcGVydHkgaGFzIDEgaW50ZXJwb2xhdGVkIHZhbHVlIGluIGl0OlxuICpcbiAqIGBgYGh0bWxcbiAqIDxkaXYgYXR0ci50aXRsZT1cInByZWZpeHt7djB9fXN1ZmZpeFwiPjwvZGl2PlxuICogYGBgXG4gKlxuICogSXRzIGNvbXBpbGVkIHJlcHJlc2VudGF0aW9uIGlzOjpcbiAqXG4gKiBgYGB0c1xuICogybXJtWF0dHJpYnV0ZUludGVycG9sYXRlMSgndGl0bGUnLCAncHJlZml4JywgdjAsICdzdWZmaXgnKTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSBhdHRyTmFtZSBUaGUgbmFtZSBvZiB0aGUgYXR0cmlidXRlIHRvIHVwZGF0ZVxuICogQHBhcmFtIHByZWZpeCBTdGF0aWMgdmFsdWUgdXNlZCBmb3IgY29uY2F0ZW5hdGlvbiBvbmx5LlxuICogQHBhcmFtIHYwIFZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSBzdWZmaXggU3RhdGljIHZhbHVlIHVzZWQgZm9yIGNvbmNhdGVuYXRpb24gb25seS5cbiAqIEBwYXJhbSBzYW5pdGl6ZXIgQW4gb3B0aW9uYWwgc2FuaXRpemVyIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyBpdHNlbGYsIHNvIHRoYXQgaXQgbWF5IGJlIGNoYWluZWQuXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtWF0dHJpYnV0ZUludGVycG9sYXRlMShcbiAgICBhdHRyTmFtZTogc3RyaW5nLCBwcmVmaXg6IHN0cmluZywgdjA6IGFueSwgc3VmZml4OiBzdHJpbmcsIHNhbml0aXplcj86IFNhbml0aXplckZuLFxuICAgIG5hbWVzcGFjZT86IHN0cmluZyk6IHR5cGVvZiDJtcm1YXR0cmlidXRlSW50ZXJwb2xhdGUxIHtcbiAgY29uc3QgbFZpZXcgPSBnZXRMVmlldygpO1xuICBjb25zdCBpbnRlcnBvbGF0ZWRWYWx1ZSA9IGludGVycG9sYXRpb24xKGxWaWV3LCBwcmVmaXgsIHYwLCBzdWZmaXgpO1xuICBpZiAoaW50ZXJwb2xhdGVkVmFsdWUgIT09IE5PX0NIQU5HRSkge1xuICAgIGNvbnN0IHROb2RlID0gZ2V0U2VsZWN0ZWRUTm9kZSgpO1xuICAgIGVsZW1lbnRBdHRyaWJ1dGVJbnRlcm5hbCh0Tm9kZSwgbFZpZXcsIGF0dHJOYW1lLCBpbnRlcnBvbGF0ZWRWYWx1ZSwgc2FuaXRpemVyLCBuYW1lc3BhY2UpO1xuICAgIG5nRGV2TW9kZSAmJlxuICAgICAgICBzdG9yZVByb3BlcnR5QmluZGluZ01ldGFkYXRhKFxuICAgICAgICAgICAgZ2V0VFZpZXcoKS5kYXRhLCB0Tm9kZSwgJ2F0dHIuJyArIGF0dHJOYW1lLCBnZXRCaW5kaW5nSW5kZXgoKSAtIDEsIHByZWZpeCwgc3VmZml4KTtcbiAgfVxuICByZXR1cm4gybXJtWF0dHJpYnV0ZUludGVycG9sYXRlMTtcbn1cblxuLyoqXG4gKlxuICogVXBkYXRlIGFuIGludGVycG9sYXRlZCBhdHRyaWJ1dGUgb24gYW4gZWxlbWVudCB3aXRoIDIgYm91bmQgdmFsdWVzIHN1cnJvdW5kZWQgYnkgdGV4dC5cbiAqXG4gKiBVc2VkIHdoZW4gdGhlIHZhbHVlIHBhc3NlZCB0byBhIHByb3BlcnR5IGhhcyAyIGludGVycG9sYXRlZCB2YWx1ZXMgaW4gaXQ6XG4gKlxuICogYGBgaHRtbFxuICogPGRpdiBhdHRyLnRpdGxlPVwicHJlZml4e3t2MH19LXt7djF9fXN1ZmZpeFwiPjwvZGl2PlxuICogYGBgXG4gKlxuICogSXRzIGNvbXBpbGVkIHJlcHJlc2VudGF0aW9uIGlzOjpcbiAqXG4gKiBgYGB0c1xuICogybXJtWF0dHJpYnV0ZUludGVycG9sYXRlMigndGl0bGUnLCAncHJlZml4JywgdjAsICctJywgdjEsICdzdWZmaXgnKTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSBhdHRyTmFtZSBUaGUgbmFtZSBvZiB0aGUgYXR0cmlidXRlIHRvIHVwZGF0ZVxuICogQHBhcmFtIHByZWZpeCBTdGF0aWMgdmFsdWUgdXNlZCBmb3IgY29uY2F0ZW5hdGlvbiBvbmx5LlxuICogQHBhcmFtIHYwIFZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSBpMCBTdGF0aWMgdmFsdWUgdXNlZCBmb3IgY29uY2F0ZW5hdGlvbiBvbmx5LlxuICogQHBhcmFtIHYxIFZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSBzdWZmaXggU3RhdGljIHZhbHVlIHVzZWQgZm9yIGNvbmNhdGVuYXRpb24gb25seS5cbiAqIEBwYXJhbSBzYW5pdGl6ZXIgQW4gb3B0aW9uYWwgc2FuaXRpemVyIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyBpdHNlbGYsIHNvIHRoYXQgaXQgbWF5IGJlIGNoYWluZWQuXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtWF0dHJpYnV0ZUludGVycG9sYXRlMihcbiAgICBhdHRyTmFtZTogc3RyaW5nLCBwcmVmaXg6IHN0cmluZywgdjA6IGFueSwgaTA6IHN0cmluZywgdjE6IGFueSwgc3VmZml4OiBzdHJpbmcsXG4gICAgc2FuaXRpemVyPzogU2FuaXRpemVyRm4sIG5hbWVzcGFjZT86IHN0cmluZyk6IHR5cGVvZiDJtcm1YXR0cmlidXRlSW50ZXJwb2xhdGUyIHtcbiAgY29uc3QgbFZpZXcgPSBnZXRMVmlldygpO1xuICBjb25zdCBpbnRlcnBvbGF0ZWRWYWx1ZSA9IGludGVycG9sYXRpb24yKGxWaWV3LCBwcmVmaXgsIHYwLCBpMCwgdjEsIHN1ZmZpeCk7XG4gIGlmIChpbnRlcnBvbGF0ZWRWYWx1ZSAhPT0gTk9fQ0hBTkdFKSB7XG4gICAgY29uc3QgdE5vZGUgPSBnZXRTZWxlY3RlZFROb2RlKCk7XG4gICAgZWxlbWVudEF0dHJpYnV0ZUludGVybmFsKHROb2RlLCBsVmlldywgYXR0ck5hbWUsIGludGVycG9sYXRlZFZhbHVlLCBzYW5pdGl6ZXIsIG5hbWVzcGFjZSk7XG4gICAgbmdEZXZNb2RlICYmXG4gICAgICAgIHN0b3JlUHJvcGVydHlCaW5kaW5nTWV0YWRhdGEoXG4gICAgICAgICAgICBnZXRUVmlldygpLmRhdGEsIHROb2RlLCAnYXR0ci4nICsgYXR0ck5hbWUsIGdldEJpbmRpbmdJbmRleCgpIC0gMiwgcHJlZml4LCBpMCwgc3VmZml4KTtcbiAgfVxuICByZXR1cm4gybXJtWF0dHJpYnV0ZUludGVycG9sYXRlMjtcbn1cblxuLyoqXG4gKlxuICogVXBkYXRlIGFuIGludGVycG9sYXRlZCBhdHRyaWJ1dGUgb24gYW4gZWxlbWVudCB3aXRoIDMgYm91bmQgdmFsdWVzIHN1cnJvdW5kZWQgYnkgdGV4dC5cbiAqXG4gKiBVc2VkIHdoZW4gdGhlIHZhbHVlIHBhc3NlZCB0byBhIHByb3BlcnR5IGhhcyAzIGludGVycG9sYXRlZCB2YWx1ZXMgaW4gaXQ6XG4gKlxuICogYGBgaHRtbFxuICogPGRpdiBhdHRyLnRpdGxlPVwicHJlZml4e3t2MH19LXt7djF9fS17e3YyfX1zdWZmaXhcIj48L2Rpdj5cbiAqIGBgYFxuICpcbiAqIEl0cyBjb21waWxlZCByZXByZXNlbnRhdGlvbiBpczo6XG4gKlxuICogYGBgdHNcbiAqIMm1ybVhdHRyaWJ1dGVJbnRlcnBvbGF0ZTMoXG4gKiAndGl0bGUnLCAncHJlZml4JywgdjAsICctJywgdjEsICctJywgdjIsICdzdWZmaXgnKTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSBhdHRyTmFtZSBUaGUgbmFtZSBvZiB0aGUgYXR0cmlidXRlIHRvIHVwZGF0ZVxuICogQHBhcmFtIHByZWZpeCBTdGF0aWMgdmFsdWUgdXNlZCBmb3IgY29uY2F0ZW5hdGlvbiBvbmx5LlxuICogQHBhcmFtIHYwIFZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSBpMCBTdGF0aWMgdmFsdWUgdXNlZCBmb3IgY29uY2F0ZW5hdGlvbiBvbmx5LlxuICogQHBhcmFtIHYxIFZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSBpMSBTdGF0aWMgdmFsdWUgdXNlZCBmb3IgY29uY2F0ZW5hdGlvbiBvbmx5LlxuICogQHBhcmFtIHYyIFZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSBzdWZmaXggU3RhdGljIHZhbHVlIHVzZWQgZm9yIGNvbmNhdGVuYXRpb24gb25seS5cbiAqIEBwYXJhbSBzYW5pdGl6ZXIgQW4gb3B0aW9uYWwgc2FuaXRpemVyIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyBpdHNlbGYsIHNvIHRoYXQgaXQgbWF5IGJlIGNoYWluZWQuXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtWF0dHJpYnV0ZUludGVycG9sYXRlMyhcbiAgICBhdHRyTmFtZTogc3RyaW5nLCBwcmVmaXg6IHN0cmluZywgdjA6IGFueSwgaTA6IHN0cmluZywgdjE6IGFueSwgaTE6IHN0cmluZywgdjI6IGFueSxcbiAgICBzdWZmaXg6IHN0cmluZywgc2FuaXRpemVyPzogU2FuaXRpemVyRm4sIG5hbWVzcGFjZT86IHN0cmluZyk6IHR5cGVvZiDJtcm1YXR0cmlidXRlSW50ZXJwb2xhdGUzIHtcbiAgY29uc3QgbFZpZXcgPSBnZXRMVmlldygpO1xuICBjb25zdCBpbnRlcnBvbGF0ZWRWYWx1ZSA9IGludGVycG9sYXRpb24zKGxWaWV3LCBwcmVmaXgsIHYwLCBpMCwgdjEsIGkxLCB2Miwgc3VmZml4KTtcbiAgaWYgKGludGVycG9sYXRlZFZhbHVlICE9PSBOT19DSEFOR0UpIHtcbiAgICBjb25zdCB0Tm9kZSA9IGdldFNlbGVjdGVkVE5vZGUoKTtcbiAgICBlbGVtZW50QXR0cmlidXRlSW50ZXJuYWwodE5vZGUsIGxWaWV3LCBhdHRyTmFtZSwgaW50ZXJwb2xhdGVkVmFsdWUsIHNhbml0aXplciwgbmFtZXNwYWNlKTtcbiAgICBuZ0Rldk1vZGUgJiZcbiAgICAgICAgc3RvcmVQcm9wZXJ0eUJpbmRpbmdNZXRhZGF0YShcbiAgICAgICAgICAgIGdldFRWaWV3KCkuZGF0YSwgdE5vZGUsICdhdHRyLicgKyBhdHRyTmFtZSwgZ2V0QmluZGluZ0luZGV4KCkgLSAzLCBwcmVmaXgsIGkwLCBpMSxcbiAgICAgICAgICAgIHN1ZmZpeCk7XG4gIH1cbiAgcmV0dXJuIMm1ybVhdHRyaWJ1dGVJbnRlcnBvbGF0ZTM7XG59XG5cbi8qKlxuICpcbiAqIFVwZGF0ZSBhbiBpbnRlcnBvbGF0ZWQgYXR0cmlidXRlIG9uIGFuIGVsZW1lbnQgd2l0aCA0IGJvdW5kIHZhbHVlcyBzdXJyb3VuZGVkIGJ5IHRleHQuXG4gKlxuICogVXNlZCB3aGVuIHRoZSB2YWx1ZSBwYXNzZWQgdG8gYSBwcm9wZXJ0eSBoYXMgNCBpbnRlcnBvbGF0ZWQgdmFsdWVzIGluIGl0OlxuICpcbiAqIGBgYGh0bWxcbiAqIDxkaXYgYXR0ci50aXRsZT1cInByZWZpeHt7djB9fS17e3YxfX0te3t2Mn19LXt7djN9fXN1ZmZpeFwiPjwvZGl2PlxuICogYGBgXG4gKlxuICogSXRzIGNvbXBpbGVkIHJlcHJlc2VudGF0aW9uIGlzOjpcbiAqXG4gKiBgYGB0c1xuICogybXJtWF0dHJpYnV0ZUludGVycG9sYXRlNChcbiAqICd0aXRsZScsICdwcmVmaXgnLCB2MCwgJy0nLCB2MSwgJy0nLCB2MiwgJy0nLCB2MywgJ3N1ZmZpeCcpO1xuICogYGBgXG4gKlxuICogQHBhcmFtIGF0dHJOYW1lIFRoZSBuYW1lIG9mIHRoZSBhdHRyaWJ1dGUgdG8gdXBkYXRlXG4gKiBAcGFyYW0gcHJlZml4IFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjAgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIGkwIFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjEgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIGkxIFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjIgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIGkyIFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjMgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIHN1ZmZpeCBTdGF0aWMgdmFsdWUgdXNlZCBmb3IgY29uY2F0ZW5hdGlvbiBvbmx5LlxuICogQHBhcmFtIHNhbml0aXplciBBbiBvcHRpb25hbCBzYW5pdGl6ZXIgZnVuY3Rpb25cbiAqIEByZXR1cm5zIGl0c2VsZiwgc28gdGhhdCBpdCBtYXkgYmUgY2hhaW5lZC5cbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1YXR0cmlidXRlSW50ZXJwb2xhdGU0KFxuICAgIGF0dHJOYW1lOiBzdHJpbmcsIHByZWZpeDogc3RyaW5nLCB2MDogYW55LCBpMDogc3RyaW5nLCB2MTogYW55LCBpMTogc3RyaW5nLCB2MjogYW55LCBpMjogc3RyaW5nLFxuICAgIHYzOiBhbnksIHN1ZmZpeDogc3RyaW5nLCBzYW5pdGl6ZXI/OiBTYW5pdGl6ZXJGbixcbiAgICBuYW1lc3BhY2U/OiBzdHJpbmcpOiB0eXBlb2YgybXJtWF0dHJpYnV0ZUludGVycG9sYXRlNCB7XG4gIGNvbnN0IGxWaWV3ID0gZ2V0TFZpZXcoKTtcbiAgY29uc3QgaW50ZXJwb2xhdGVkVmFsdWUgPSBpbnRlcnBvbGF0aW9uNChsVmlldywgcHJlZml4LCB2MCwgaTAsIHYxLCBpMSwgdjIsIGkyLCB2Mywgc3VmZml4KTtcbiAgaWYgKGludGVycG9sYXRlZFZhbHVlICE9PSBOT19DSEFOR0UpIHtcbiAgICBjb25zdCB0Tm9kZSA9IGdldFNlbGVjdGVkVE5vZGUoKTtcbiAgICBlbGVtZW50QXR0cmlidXRlSW50ZXJuYWwodE5vZGUsIGxWaWV3LCBhdHRyTmFtZSwgaW50ZXJwb2xhdGVkVmFsdWUsIHNhbml0aXplciwgbmFtZXNwYWNlKTtcbiAgICBuZ0Rldk1vZGUgJiZcbiAgICAgICAgc3RvcmVQcm9wZXJ0eUJpbmRpbmdNZXRhZGF0YShcbiAgICAgICAgICAgIGdldFRWaWV3KCkuZGF0YSwgdE5vZGUsICdhdHRyLicgKyBhdHRyTmFtZSwgZ2V0QmluZGluZ0luZGV4KCkgLSA0LCBwcmVmaXgsIGkwLCBpMSwgaTIsXG4gICAgICAgICAgICBzdWZmaXgpO1xuICB9XG4gIHJldHVybiDJtcm1YXR0cmlidXRlSW50ZXJwb2xhdGU0O1xufVxuXG4vKipcbiAqXG4gKiBVcGRhdGUgYW4gaW50ZXJwb2xhdGVkIGF0dHJpYnV0ZSBvbiBhbiBlbGVtZW50IHdpdGggNSBib3VuZCB2YWx1ZXMgc3Vycm91bmRlZCBieSB0ZXh0LlxuICpcbiAqIFVzZWQgd2hlbiB0aGUgdmFsdWUgcGFzc2VkIHRvIGEgcHJvcGVydHkgaGFzIDUgaW50ZXJwb2xhdGVkIHZhbHVlcyBpbiBpdDpcbiAqXG4gKiBgYGBodG1sXG4gKiA8ZGl2IGF0dHIudGl0bGU9XCJwcmVmaXh7e3YwfX0te3t2MX19LXt7djJ9fS17e3YzfX0te3t2NH19c3VmZml4XCI+PC9kaXY+XG4gKiBgYGBcbiAqXG4gKiBJdHMgY29tcGlsZWQgcmVwcmVzZW50YXRpb24gaXM6OlxuICpcbiAqIGBgYHRzXG4gKiDJtcm1YXR0cmlidXRlSW50ZXJwb2xhdGU1KFxuICogJ3RpdGxlJywgJ3ByZWZpeCcsIHYwLCAnLScsIHYxLCAnLScsIHYyLCAnLScsIHYzLCAnLScsIHY0LCAnc3VmZml4Jyk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gYXR0ck5hbWUgVGhlIG5hbWUgb2YgdGhlIGF0dHJpYnV0ZSB0byB1cGRhdGVcbiAqIEBwYXJhbSBwcmVmaXggU3RhdGljIHZhbHVlIHVzZWQgZm9yIGNvbmNhdGVuYXRpb24gb25seS5cbiAqIEBwYXJhbSB2MCBWYWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gaTAgU3RhdGljIHZhbHVlIHVzZWQgZm9yIGNvbmNhdGVuYXRpb24gb25seS5cbiAqIEBwYXJhbSB2MSBWYWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gaTEgU3RhdGljIHZhbHVlIHVzZWQgZm9yIGNvbmNhdGVuYXRpb24gb25seS5cbiAqIEBwYXJhbSB2MiBWYWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gaTIgU3RhdGljIHZhbHVlIHVzZWQgZm9yIGNvbmNhdGVuYXRpb24gb25seS5cbiAqIEBwYXJhbSB2MyBWYWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gaTMgU3RhdGljIHZhbHVlIHVzZWQgZm9yIGNvbmNhdGVuYXRpb24gb25seS5cbiAqIEBwYXJhbSB2NCBWYWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gc3VmZml4IFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gc2FuaXRpemVyIEFuIG9wdGlvbmFsIHNhbml0aXplciBmdW5jdGlvblxuICogQHJldHVybnMgaXRzZWxmLCBzbyB0aGF0IGl0IG1heSBiZSBjaGFpbmVkLlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVhdHRyaWJ1dGVJbnRlcnBvbGF0ZTUoXG4gICAgYXR0ck5hbWU6IHN0cmluZywgcHJlZml4OiBzdHJpbmcsIHYwOiBhbnksIGkwOiBzdHJpbmcsIHYxOiBhbnksIGkxOiBzdHJpbmcsIHYyOiBhbnksIGkyOiBzdHJpbmcsXG4gICAgdjM6IGFueSwgaTM6IHN0cmluZywgdjQ6IGFueSwgc3VmZml4OiBzdHJpbmcsIHNhbml0aXplcj86IFNhbml0aXplckZuLFxuICAgIG5hbWVzcGFjZT86IHN0cmluZyk6IHR5cGVvZiDJtcm1YXR0cmlidXRlSW50ZXJwb2xhdGU1IHtcbiAgY29uc3QgbFZpZXcgPSBnZXRMVmlldygpO1xuICBjb25zdCBpbnRlcnBvbGF0ZWRWYWx1ZSA9XG4gICAgICBpbnRlcnBvbGF0aW9uNShsVmlldywgcHJlZml4LCB2MCwgaTAsIHYxLCBpMSwgdjIsIGkyLCB2MywgaTMsIHY0LCBzdWZmaXgpO1xuICBpZiAoaW50ZXJwb2xhdGVkVmFsdWUgIT09IE5PX0NIQU5HRSkge1xuICAgIGNvbnN0IHROb2RlID0gZ2V0U2VsZWN0ZWRUTm9kZSgpO1xuICAgIGVsZW1lbnRBdHRyaWJ1dGVJbnRlcm5hbCh0Tm9kZSwgbFZpZXcsIGF0dHJOYW1lLCBpbnRlcnBvbGF0ZWRWYWx1ZSwgc2FuaXRpemVyLCBuYW1lc3BhY2UpO1xuICAgIG5nRGV2TW9kZSAmJlxuICAgICAgICBzdG9yZVByb3BlcnR5QmluZGluZ01ldGFkYXRhKFxuICAgICAgICAgICAgZ2V0VFZpZXcoKS5kYXRhLCB0Tm9kZSwgJ2F0dHIuJyArIGF0dHJOYW1lLCBnZXRCaW5kaW5nSW5kZXgoKSAtIDUsIHByZWZpeCwgaTAsIGkxLCBpMixcbiAgICAgICAgICAgIGkzLCBzdWZmaXgpO1xuICB9XG4gIHJldHVybiDJtcm1YXR0cmlidXRlSW50ZXJwb2xhdGU1O1xufVxuXG4vKipcbiAqXG4gKiBVcGRhdGUgYW4gaW50ZXJwb2xhdGVkIGF0dHJpYnV0ZSBvbiBhbiBlbGVtZW50IHdpdGggNiBib3VuZCB2YWx1ZXMgc3Vycm91bmRlZCBieSB0ZXh0LlxuICpcbiAqIFVzZWQgd2hlbiB0aGUgdmFsdWUgcGFzc2VkIHRvIGEgcHJvcGVydHkgaGFzIDYgaW50ZXJwb2xhdGVkIHZhbHVlcyBpbiBpdDpcbiAqXG4gKiBgYGBodG1sXG4gKiA8ZGl2IGF0dHIudGl0bGU9XCJwcmVmaXh7e3YwfX0te3t2MX19LXt7djJ9fS17e3YzfX0te3t2NH19LXt7djV9fXN1ZmZpeFwiPjwvZGl2PlxuICogYGBgXG4gKlxuICogSXRzIGNvbXBpbGVkIHJlcHJlc2VudGF0aW9uIGlzOjpcbiAqXG4gKiBgYGB0c1xuICogybXJtWF0dHJpYnV0ZUludGVycG9sYXRlNihcbiAqICAgICd0aXRsZScsICdwcmVmaXgnLCB2MCwgJy0nLCB2MSwgJy0nLCB2MiwgJy0nLCB2MywgJy0nLCB2NCwgJy0nLCB2NSwgJ3N1ZmZpeCcpO1xuICogYGBgXG4gKlxuICogQHBhcmFtIGF0dHJOYW1lIFRoZSBuYW1lIG9mIHRoZSBhdHRyaWJ1dGUgdG8gdXBkYXRlXG4gKiBAcGFyYW0gcHJlZml4IFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjAgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIGkwIFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjEgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIGkxIFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjIgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIGkyIFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjMgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIGkzIFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjQgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIGk0IFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjUgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIHN1ZmZpeCBTdGF0aWMgdmFsdWUgdXNlZCBmb3IgY29uY2F0ZW5hdGlvbiBvbmx5LlxuICogQHBhcmFtIHNhbml0aXplciBBbiBvcHRpb25hbCBzYW5pdGl6ZXIgZnVuY3Rpb25cbiAqIEByZXR1cm5zIGl0c2VsZiwgc28gdGhhdCBpdCBtYXkgYmUgY2hhaW5lZC5cbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1YXR0cmlidXRlSW50ZXJwb2xhdGU2KFxuICAgIGF0dHJOYW1lOiBzdHJpbmcsIHByZWZpeDogc3RyaW5nLCB2MDogYW55LCBpMDogc3RyaW5nLCB2MTogYW55LCBpMTogc3RyaW5nLCB2MjogYW55LCBpMjogc3RyaW5nLFxuICAgIHYzOiBhbnksIGkzOiBzdHJpbmcsIHY0OiBhbnksIGk0OiBzdHJpbmcsIHY1OiBhbnksIHN1ZmZpeDogc3RyaW5nLCBzYW5pdGl6ZXI/OiBTYW5pdGl6ZXJGbixcbiAgICBuYW1lc3BhY2U/OiBzdHJpbmcpOiB0eXBlb2YgybXJtWF0dHJpYnV0ZUludGVycG9sYXRlNiB7XG4gIGNvbnN0IGxWaWV3ID0gZ2V0TFZpZXcoKTtcbiAgY29uc3QgaW50ZXJwb2xhdGVkVmFsdWUgPVxuICAgICAgaW50ZXJwb2xhdGlvbjYobFZpZXcsIHByZWZpeCwgdjAsIGkwLCB2MSwgaTEsIHYyLCBpMiwgdjMsIGkzLCB2NCwgaTQsIHY1LCBzdWZmaXgpO1xuICBpZiAoaW50ZXJwb2xhdGVkVmFsdWUgIT09IE5PX0NIQU5HRSkge1xuICAgIGNvbnN0IHROb2RlID0gZ2V0U2VsZWN0ZWRUTm9kZSgpO1xuICAgIGVsZW1lbnRBdHRyaWJ1dGVJbnRlcm5hbCh0Tm9kZSwgbFZpZXcsIGF0dHJOYW1lLCBpbnRlcnBvbGF0ZWRWYWx1ZSwgc2FuaXRpemVyLCBuYW1lc3BhY2UpO1xuICAgIG5nRGV2TW9kZSAmJlxuICAgICAgICBzdG9yZVByb3BlcnR5QmluZGluZ01ldGFkYXRhKFxuICAgICAgICAgICAgZ2V0VFZpZXcoKS5kYXRhLCB0Tm9kZSwgJ2F0dHIuJyArIGF0dHJOYW1lLCBnZXRCaW5kaW5nSW5kZXgoKSAtIDYsIHByZWZpeCwgaTAsIGkxLCBpMixcbiAgICAgICAgICAgIGkzLCBpNCwgc3VmZml4KTtcbiAgfVxuICByZXR1cm4gybXJtWF0dHJpYnV0ZUludGVycG9sYXRlNjtcbn1cblxuLyoqXG4gKlxuICogVXBkYXRlIGFuIGludGVycG9sYXRlZCBhdHRyaWJ1dGUgb24gYW4gZWxlbWVudCB3aXRoIDcgYm91bmQgdmFsdWVzIHN1cnJvdW5kZWQgYnkgdGV4dC5cbiAqXG4gKiBVc2VkIHdoZW4gdGhlIHZhbHVlIHBhc3NlZCB0byBhIHByb3BlcnR5IGhhcyA3IGludGVycG9sYXRlZCB2YWx1ZXMgaW4gaXQ6XG4gKlxuICogYGBgaHRtbFxuICogPGRpdiBhdHRyLnRpdGxlPVwicHJlZml4e3t2MH19LXt7djF9fS17e3YyfX0te3t2M319LXt7djR9fS17e3Y1fX0te3t2Nn19c3VmZml4XCI+PC9kaXY+XG4gKiBgYGBcbiAqXG4gKiBJdHMgY29tcGlsZWQgcmVwcmVzZW50YXRpb24gaXM6OlxuICpcbiAqIGBgYHRzXG4gKiDJtcm1YXR0cmlidXRlSW50ZXJwb2xhdGU3KFxuICogICAgJ3RpdGxlJywgJ3ByZWZpeCcsIHYwLCAnLScsIHYxLCAnLScsIHYyLCAnLScsIHYzLCAnLScsIHY0LCAnLScsIHY1LCAnLScsIHY2LCAnc3VmZml4Jyk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gYXR0ck5hbWUgVGhlIG5hbWUgb2YgdGhlIGF0dHJpYnV0ZSB0byB1cGRhdGVcbiAqIEBwYXJhbSBwcmVmaXggU3RhdGljIHZhbHVlIHVzZWQgZm9yIGNvbmNhdGVuYXRpb24gb25seS5cbiAqIEBwYXJhbSB2MCBWYWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gaTAgU3RhdGljIHZhbHVlIHVzZWQgZm9yIGNvbmNhdGVuYXRpb24gb25seS5cbiAqIEBwYXJhbSB2MSBWYWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gaTEgU3RhdGljIHZhbHVlIHVzZWQgZm9yIGNvbmNhdGVuYXRpb24gb25seS5cbiAqIEBwYXJhbSB2MiBWYWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gaTIgU3RhdGljIHZhbHVlIHVzZWQgZm9yIGNvbmNhdGVuYXRpb24gb25seS5cbiAqIEBwYXJhbSB2MyBWYWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gaTMgU3RhdGljIHZhbHVlIHVzZWQgZm9yIGNvbmNhdGVuYXRpb24gb25seS5cbiAqIEBwYXJhbSB2NCBWYWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gaTQgU3RhdGljIHZhbHVlIHVzZWQgZm9yIGNvbmNhdGVuYXRpb24gb25seS5cbiAqIEBwYXJhbSB2NSBWYWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gaTUgU3RhdGljIHZhbHVlIHVzZWQgZm9yIGNvbmNhdGVuYXRpb24gb25seS5cbiAqIEBwYXJhbSB2NiBWYWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gc3VmZml4IFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gc2FuaXRpemVyIEFuIG9wdGlvbmFsIHNhbml0aXplciBmdW5jdGlvblxuICogQHJldHVybnMgaXRzZWxmLCBzbyB0aGF0IGl0IG1heSBiZSBjaGFpbmVkLlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVhdHRyaWJ1dGVJbnRlcnBvbGF0ZTcoXG4gICAgYXR0ck5hbWU6IHN0cmluZywgcHJlZml4OiBzdHJpbmcsIHYwOiBhbnksIGkwOiBzdHJpbmcsIHYxOiBhbnksIGkxOiBzdHJpbmcsIHYyOiBhbnksIGkyOiBzdHJpbmcsXG4gICAgdjM6IGFueSwgaTM6IHN0cmluZywgdjQ6IGFueSwgaTQ6IHN0cmluZywgdjU6IGFueSwgaTU6IHN0cmluZywgdjY6IGFueSwgc3VmZml4OiBzdHJpbmcsXG4gICAgc2FuaXRpemVyPzogU2FuaXRpemVyRm4sIG5hbWVzcGFjZT86IHN0cmluZyk6IHR5cGVvZiDJtcm1YXR0cmlidXRlSW50ZXJwb2xhdGU3IHtcbiAgY29uc3QgbFZpZXcgPSBnZXRMVmlldygpO1xuICBjb25zdCBpbnRlcnBvbGF0ZWRWYWx1ZSA9XG4gICAgICBpbnRlcnBvbGF0aW9uNyhsVmlldywgcHJlZml4LCB2MCwgaTAsIHYxLCBpMSwgdjIsIGkyLCB2MywgaTMsIHY0LCBpNCwgdjUsIGk1LCB2Niwgc3VmZml4KTtcbiAgaWYgKGludGVycG9sYXRlZFZhbHVlICE9PSBOT19DSEFOR0UpIHtcbiAgICBjb25zdCB0Tm9kZSA9IGdldFNlbGVjdGVkVE5vZGUoKTtcbiAgICBlbGVtZW50QXR0cmlidXRlSW50ZXJuYWwodE5vZGUsIGxWaWV3LCBhdHRyTmFtZSwgaW50ZXJwb2xhdGVkVmFsdWUsIHNhbml0aXplciwgbmFtZXNwYWNlKTtcbiAgICBuZ0Rldk1vZGUgJiZcbiAgICAgICAgc3RvcmVQcm9wZXJ0eUJpbmRpbmdNZXRhZGF0YShcbiAgICAgICAgICAgIGdldFRWaWV3KCkuZGF0YSwgdE5vZGUsICdhdHRyLicgKyBhdHRyTmFtZSwgZ2V0QmluZGluZ0luZGV4KCkgLSA3LCBwcmVmaXgsIGkwLCBpMSwgaTIsXG4gICAgICAgICAgICBpMywgaTQsIGk1LCBzdWZmaXgpO1xuICB9XG4gIHJldHVybiDJtcm1YXR0cmlidXRlSW50ZXJwb2xhdGU3O1xufVxuXG4vKipcbiAqXG4gKiBVcGRhdGUgYW4gaW50ZXJwb2xhdGVkIGF0dHJpYnV0ZSBvbiBhbiBlbGVtZW50IHdpdGggOCBib3VuZCB2YWx1ZXMgc3Vycm91bmRlZCBieSB0ZXh0LlxuICpcbiAqIFVzZWQgd2hlbiB0aGUgdmFsdWUgcGFzc2VkIHRvIGEgcHJvcGVydHkgaGFzIDggaW50ZXJwb2xhdGVkIHZhbHVlcyBpbiBpdDpcbiAqXG4gKiBgYGBodG1sXG4gKiA8ZGl2IGF0dHIudGl0bGU9XCJwcmVmaXh7e3YwfX0te3t2MX19LXt7djJ9fS17e3YzfX0te3t2NH19LXt7djV9fS17e3Y2fX0te3t2N319c3VmZml4XCI+PC9kaXY+XG4gKiBgYGBcbiAqXG4gKiBJdHMgY29tcGlsZWQgcmVwcmVzZW50YXRpb24gaXM6OlxuICpcbiAqIGBgYHRzXG4gKiDJtcm1YXR0cmlidXRlSW50ZXJwb2xhdGU4KFxuICogICd0aXRsZScsICdwcmVmaXgnLCB2MCwgJy0nLCB2MSwgJy0nLCB2MiwgJy0nLCB2MywgJy0nLCB2NCwgJy0nLCB2NSwgJy0nLCB2NiwgJy0nLCB2NywgJ3N1ZmZpeCcpO1xuICogYGBgXG4gKlxuICogQHBhcmFtIGF0dHJOYW1lIFRoZSBuYW1lIG9mIHRoZSBhdHRyaWJ1dGUgdG8gdXBkYXRlXG4gKiBAcGFyYW0gcHJlZml4IFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjAgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIGkwIFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjEgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIGkxIFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjIgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIGkyIFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjMgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIGkzIFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjQgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIGk0IFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjUgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIGk1IFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjYgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIGk2IFN0YXRpYyB2YWx1ZSB1c2VkIGZvciBjb25jYXRlbmF0aW9uIG9ubHkuXG4gKiBAcGFyYW0gdjcgVmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIHN1ZmZpeCBTdGF0aWMgdmFsdWUgdXNlZCBmb3IgY29uY2F0ZW5hdGlvbiBvbmx5LlxuICogQHBhcmFtIHNhbml0aXplciBBbiBvcHRpb25hbCBzYW5pdGl6ZXIgZnVuY3Rpb25cbiAqIEByZXR1cm5zIGl0c2VsZiwgc28gdGhhdCBpdCBtYXkgYmUgY2hhaW5lZC5cbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1YXR0cmlidXRlSW50ZXJwb2xhdGU4KFxuICAgIGF0dHJOYW1lOiBzdHJpbmcsIHByZWZpeDogc3RyaW5nLCB2MDogYW55LCBpMDogc3RyaW5nLCB2MTogYW55LCBpMTogc3RyaW5nLCB2MjogYW55LCBpMjogc3RyaW5nLFxuICAgIHYzOiBhbnksIGkzOiBzdHJpbmcsIHY0OiBhbnksIGk0OiBzdHJpbmcsIHY1OiBhbnksIGk1OiBzdHJpbmcsIHY2OiBhbnksIGk2OiBzdHJpbmcsIHY3OiBhbnksXG4gICAgc3VmZml4OiBzdHJpbmcsIHNhbml0aXplcj86IFNhbml0aXplckZuLCBuYW1lc3BhY2U/OiBzdHJpbmcpOiB0eXBlb2YgybXJtWF0dHJpYnV0ZUludGVycG9sYXRlOCB7XG4gIGNvbnN0IGxWaWV3ID0gZ2V0TFZpZXcoKTtcbiAgY29uc3QgaW50ZXJwb2xhdGVkVmFsdWUgPSBpbnRlcnBvbGF0aW9uOChcbiAgICAgIGxWaWV3LCBwcmVmaXgsIHYwLCBpMCwgdjEsIGkxLCB2MiwgaTIsIHYzLCBpMywgdjQsIGk0LCB2NSwgaTUsIHY2LCBpNiwgdjcsIHN1ZmZpeCk7XG4gIGlmIChpbnRlcnBvbGF0ZWRWYWx1ZSAhPT0gTk9fQ0hBTkdFKSB7XG4gICAgY29uc3QgdE5vZGUgPSBnZXRTZWxlY3RlZFROb2RlKCk7XG4gICAgZWxlbWVudEF0dHJpYnV0ZUludGVybmFsKHROb2RlLCBsVmlldywgYXR0ck5hbWUsIGludGVycG9sYXRlZFZhbHVlLCBzYW5pdGl6ZXIsIG5hbWVzcGFjZSk7XG4gICAgbmdEZXZNb2RlICYmXG4gICAgICAgIHN0b3JlUHJvcGVydHlCaW5kaW5nTWV0YWRhdGEoXG4gICAgICAgICAgICBnZXRUVmlldygpLmRhdGEsIHROb2RlLCAnYXR0ci4nICsgYXR0ck5hbWUsIGdldEJpbmRpbmdJbmRleCgpIC0gOCwgcHJlZml4LCBpMCwgaTEsIGkyLFxuICAgICAgICAgICAgaTMsIGk0LCBpNSwgaTYsIHN1ZmZpeCk7XG4gIH1cbiAgcmV0dXJuIMm1ybVhdHRyaWJ1dGVJbnRlcnBvbGF0ZTg7XG59XG5cbi8qKlxuICogVXBkYXRlIGFuIGludGVycG9sYXRlZCBhdHRyaWJ1dGUgb24gYW4gZWxlbWVudCB3aXRoIDkgb3IgbW9yZSBib3VuZCB2YWx1ZXMgc3Vycm91bmRlZCBieSB0ZXh0LlxuICpcbiAqIFVzZWQgd2hlbiB0aGUgbnVtYmVyIG9mIGludGVycG9sYXRlZCB2YWx1ZXMgZXhjZWVkcyA4LlxuICpcbiAqIGBgYGh0bWxcbiAqIDxkaXZcbiAqICB0aXRsZT1cInByZWZpeHt7djB9fS17e3YxfX0te3t2Mn19LXt7djN9fS17e3Y0fX0te3t2NX19LXt7djZ9fS17e3Y3fX0te3t2OH19LXt7djl9fXN1ZmZpeFwiPjwvZGl2PlxuICogYGBgXG4gKlxuICogSXRzIGNvbXBpbGVkIHJlcHJlc2VudGF0aW9uIGlzOjpcbiAqXG4gKiBgYGB0c1xuICogybXJtWF0dHJpYnV0ZUludGVycG9sYXRlVihcbiAqICAndGl0bGUnLCBbJ3ByZWZpeCcsIHYwLCAnLScsIHYxLCAnLScsIHYyLCAnLScsIHYzLCAnLScsIHY0LCAnLScsIHY1LCAnLScsIHY2LCAnLScsIHY3LCAnLScsIHY5LFxuICogICdzdWZmaXgnXSk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gYXR0ck5hbWUgVGhlIG5hbWUgb2YgdGhlIGF0dHJpYnV0ZSB0byB1cGRhdGUuXG4gKiBAcGFyYW0gdmFsdWVzIFRoZSBjb2xsZWN0aW9uIG9mIHZhbHVlcyBhbmQgdGhlIHN0cmluZ3MgaW4tYmV0d2VlbiB0aG9zZSB2YWx1ZXMsIGJlZ2lubmluZyB3aXRoXG4gKiBhIHN0cmluZyBwcmVmaXggYW5kIGVuZGluZyB3aXRoIGEgc3RyaW5nIHN1ZmZpeC5cbiAqIChlLmcuIGBbJ3ByZWZpeCcsIHZhbHVlMCwgJy0nLCB2YWx1ZTEsICctJywgdmFsdWUyLCAuLi4sIHZhbHVlOTksICdzdWZmaXgnXWApXG4gKiBAcGFyYW0gc2FuaXRpemVyIEFuIG9wdGlvbmFsIHNhbml0aXplciBmdW5jdGlvblxuICogQHJldHVybnMgaXRzZWxmLCBzbyB0aGF0IGl0IG1heSBiZSBjaGFpbmVkLlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVhdHRyaWJ1dGVJbnRlcnBvbGF0ZVYoXG4gICAgYXR0ck5hbWU6IHN0cmluZywgdmFsdWVzOiBhbnlbXSwgc2FuaXRpemVyPzogU2FuaXRpemVyRm4sXG4gICAgbmFtZXNwYWNlPzogc3RyaW5nKTogdHlwZW9mIMm1ybVhdHRyaWJ1dGVJbnRlcnBvbGF0ZVYge1xuICBjb25zdCBsVmlldyA9IGdldExWaWV3KCk7XG4gIGNvbnN0IGludGVycG9sYXRlZCA9IGludGVycG9sYXRpb25WKGxWaWV3LCB2YWx1ZXMpO1xuICBpZiAoaW50ZXJwb2xhdGVkICE9PSBOT19DSEFOR0UpIHtcbiAgICBjb25zdCB0Tm9kZSA9IGdldFNlbGVjdGVkVE5vZGUoKTtcbiAgICBlbGVtZW50QXR0cmlidXRlSW50ZXJuYWwodE5vZGUsIGxWaWV3LCBhdHRyTmFtZSwgaW50ZXJwb2xhdGVkLCBzYW5pdGl6ZXIsIG5hbWVzcGFjZSk7XG4gICAgaWYgKG5nRGV2TW9kZSkge1xuICAgICAgY29uc3QgaW50ZXJwb2xhdGlvbkluQmV0d2VlbiA9IFt2YWx1ZXNbMF1dOyAgLy8gcHJlZml4XG4gICAgICBmb3IgKGxldCBpID0gMjsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICBpbnRlcnBvbGF0aW9uSW5CZXR3ZWVuLnB1c2godmFsdWVzW2ldKTtcbiAgICAgIH1cbiAgICAgIHN0b3JlUHJvcGVydHlCaW5kaW5nTWV0YWRhdGEoXG4gICAgICAgICAgZ2V0VFZpZXcoKS5kYXRhLCB0Tm9kZSwgJ2F0dHIuJyArIGF0dHJOYW1lLFxuICAgICAgICAgIGdldEJpbmRpbmdJbmRleCgpIC0gaW50ZXJwb2xhdGlvbkluQmV0d2Vlbi5sZW5ndGggKyAxLCAuLi5pbnRlcnBvbGF0aW9uSW5CZXR3ZWVuKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIMm1ybVhdHRyaWJ1dGVJbnRlcnBvbGF0ZVY7XG59XG4iXX0=