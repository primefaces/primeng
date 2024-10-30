/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { unwrapSafeValue } from '../../sanitization/bypass';
import { keyValueArrayGet, keyValueArraySet } from '../../util/array_utils';
import { assertDefined, assertEqual, assertLessThan, assertNotEqual, throwError } from '../../util/assert';
import { EMPTY_ARRAY } from '../../util/empty';
import { concatStringsWithSpace, stringify } from '../../util/stringify';
import { assertFirstUpdatePass } from '../assert';
import { bindingUpdated } from '../bindings';
import { getTStylingRangeNext, getTStylingRangeNextDuplicate, getTStylingRangePrev, getTStylingRangePrevDuplicate } from '../interfaces/styling';
import { RENDERER } from '../interfaces/view';
import { applyStyling } from '../node_manipulation';
import { getCurrentDirectiveDef, getLView, getSelectedIndex, getTView, incrementBindingIndex } from '../state';
import { insertTStylingBinding } from '../styling/style_binding_list';
import { getLastParsedKey, getLastParsedValue, parseClassName, parseClassNameNext, parseStyle, parseStyleNext } from '../styling/styling_parser';
import { NO_CHANGE } from '../tokens';
import { getNativeByIndex } from '../util/view_utils';
import { setDirectiveInputsWhichShadowsStyling } from './property';
/**
 * Update a style binding on an element with the provided value.
 *
 * If the style value is falsy then it will be removed from the element
 * (or assigned a different value depending if there are any styles placed
 * on the element with `styleMap` or any static styles that are
 * present from when the element was created with `styling`).
 *
 * Note that the styling element is updated as part of `stylingApply`.
 *
 * @param prop A valid CSS property.
 * @param value New value to write (`null` or an empty string to remove).
 * @param suffix Optional suffix. Used with scalar values to add unit such as `px`.
 *
 * Note that this will apply the provided style value to the host element if this function is called
 * within a host binding function.
 *
 * @codeGenApi
 */
export function ɵɵstyleProp(prop, value, suffix) {
    checkStylingProperty(prop, value, suffix, false);
    return ɵɵstyleProp;
}
/**
 * Update a class binding on an element with the provided value.
 *
 * This instruction is meant to handle the `[class.foo]="exp"` case and,
 * therefore, the class binding itself must already be allocated using
 * `styling` within the creation block.
 *
 * @param prop A valid CSS class (only one).
 * @param value A true/false value which will turn the class on or off.
 *
 * Note that this will apply the provided class value to the host element if this function
 * is called within a host binding function.
 *
 * @codeGenApi
 */
export function ɵɵclassProp(className, value) {
    checkStylingProperty(className, value, null, true);
    return ɵɵclassProp;
}
/**
 * Update style bindings using an object literal on an element.
 *
 * This instruction is meant to apply styling via the `[style]="exp"` template bindings.
 * When styles are applied to the element they will then be updated with respect to
 * any styles/classes set via `styleProp`. If any styles are set to falsy
 * then they will be removed from the element.
 *
 * Note that the styling instruction will not be applied until `stylingApply` is called.
 *
 * @param styles A key/value style map of the styles that will be applied to the given element.
 *        Any missing styles (that have already been applied to the element beforehand) will be
 *        removed (unset) from the element's styling.
 *
 * Note that this will apply the provided styleMap value to the host element if this function
 * is called within a host binding.
 *
 * @codeGenApi
 */
export function ɵɵstyleMap(styles) {
    checkStylingMap(styleKeyValueArraySet, styleStringParser, styles, false);
}
/**
 * Parse text as style and add values to KeyValueArray.
 *
 * This code is pulled out to a separate function so that it can be tree shaken away if it is not
 * needed. It is only referenced from `ɵɵstyleMap`.
 *
 * @param keyValueArray KeyValueArray to add parsed values to.
 * @param text text to parse.
 */
export function styleStringParser(keyValueArray, text) {
    for (let i = parseStyle(text); i >= 0; i = parseStyleNext(text, i)) {
        styleKeyValueArraySet(keyValueArray, getLastParsedKey(text), getLastParsedValue(text));
    }
}
/**
 * Update class bindings using an object literal or class-string on an element.
 *
 * This instruction is meant to apply styling via the `[class]="exp"` template bindings.
 * When classes are applied to the element they will then be updated with
 * respect to any styles/classes set via `classProp`. If any
 * classes are set to falsy then they will be removed from the element.
 *
 * Note that the styling instruction will not be applied until `stylingApply` is called.
 * Note that this will the provided classMap value to the host element if this function is called
 * within a host binding.
 *
 * @param classes A key/value map or string of CSS classes that will be added to the
 *        given element. Any missing classes (that have already been applied to the element
 *        beforehand) will be removed (unset) from the element's list of CSS classes.
 *
 * @codeGenApi
 */
export function ɵɵclassMap(classes) {
    checkStylingMap(classKeyValueArraySet, classStringParser, classes, true);
}
/**
 * Parse text as class and add values to KeyValueArray.
 *
 * This code is pulled out to a separate function so that it can be tree shaken away if it is not
 * needed. It is only referenced from `ɵɵclassMap`.
 *
 * @param keyValueArray KeyValueArray to add parsed values to.
 * @param text text to parse.
 */
export function classStringParser(keyValueArray, text) {
    for (let i = parseClassName(text); i >= 0; i = parseClassNameNext(text, i)) {
        keyValueArraySet(keyValueArray, getLastParsedKey(text), true);
    }
}
/**
 * Common code between `ɵɵclassProp` and `ɵɵstyleProp`.
 *
 * @param prop property name.
 * @param value binding value.
 * @param suffix suffix for the property (e.g. `em` or `px`)
 * @param isClassBased `true` if `class` change (`false` if `style`)
 */
export function checkStylingProperty(prop, value, suffix, isClassBased) {
    const lView = getLView();
    const tView = getTView();
    // Styling instructions use 2 slots per binding.
    // 1. one for the value / TStylingKey
    // 2. one for the intermittent-value / TStylingRange
    const bindingIndex = incrementBindingIndex(2);
    if (tView.firstUpdatePass) {
        stylingFirstUpdatePass(tView, prop, bindingIndex, isClassBased);
    }
    if (value !== NO_CHANGE && bindingUpdated(lView, bindingIndex, value)) {
        const tNode = tView.data[getSelectedIndex()];
        updateStyling(tView, tNode, lView, lView[RENDERER], prop, lView[bindingIndex + 1] = normalizeSuffix(value, suffix), isClassBased, bindingIndex);
    }
}
/**
 * Common code between `ɵɵclassMap` and `ɵɵstyleMap`.
 *
 * @param keyValueArraySet (See `keyValueArraySet` in "util/array_utils") Gets passed in as a
 *        function so that `style` can be processed. This is done for tree shaking purposes.
 * @param stringParser Parser used to parse `value` if `string`. (Passed in as `style` and `class`
 *        have different parsers.)
 * @param value bound value from application
 * @param isClassBased `true` if `class` change (`false` if `style`)
 */
export function checkStylingMap(keyValueArraySet, stringParser, value, isClassBased) {
    const tView = getTView();
    const bindingIndex = incrementBindingIndex(2);
    if (tView.firstUpdatePass) {
        stylingFirstUpdatePass(tView, null, bindingIndex, isClassBased);
    }
    const lView = getLView();
    if (value !== NO_CHANGE && bindingUpdated(lView, bindingIndex, value)) {
        // `getSelectedIndex()` should be here (rather than in instruction) so that it is guarded by the
        // if so as not to read unnecessarily.
        const tNode = tView.data[getSelectedIndex()];
        if (hasStylingInputShadow(tNode, isClassBased) && !isInHostBindings(tView, bindingIndex)) {
            if (ngDevMode) {
                // verify that if we are shadowing then `TData` is appropriately marked so that we skip
                // processing this binding in styling resolution.
                const tStylingKey = tView.data[bindingIndex];
                assertEqual(Array.isArray(tStylingKey) ? tStylingKey[1] : tStylingKey, false, 'Styling linked list shadow input should be marked as \'false\'');
            }
            // VE does not concatenate the static portion like we are doing here.
            // Instead VE just ignores the static completely if dynamic binding is present.
            // Because of locality we have already set the static portion because we don't know if there
            // is a dynamic portion until later. If we would ignore the static portion it would look like
            // the binding has removed it. This would confuse `[ngStyle]`/`[ngClass]` to do the wrong
            // thing as it would think that the static portion was removed. For this reason we
            // concatenate it so that `[ngStyle]`/`[ngClass]`  can continue to work on changed.
            let staticPrefix = isClassBased ? tNode.classesWithoutHost : tNode.stylesWithoutHost;
            ngDevMode && isClassBased === false && staticPrefix !== null &&
                assertEqual(staticPrefix.endsWith(';'), true, 'Expecting static portion to end with \';\'');
            if (staticPrefix !== null) {
                // We want to make sure that falsy values of `value` become empty strings.
                value = concatStringsWithSpace(staticPrefix, value ? value : '');
            }
            // Given `<div [style] my-dir>` such that `my-dir` has `@Input('style')`.
            // This takes over the `[style]` binding. (Same for `[class]`)
            setDirectiveInputsWhichShadowsStyling(tView, tNode, lView, value, isClassBased);
        }
        else {
            updateStylingMap(tView, tNode, lView, lView[RENDERER], lView[bindingIndex + 1], lView[bindingIndex + 1] = toStylingKeyValueArray(keyValueArraySet, stringParser, value), isClassBased, bindingIndex);
        }
    }
}
/**
 * Determines when the binding is in `hostBindings` section
 *
 * @param tView Current `TView`
 * @param bindingIndex index of binding which we would like if it is in `hostBindings`
 */
function isInHostBindings(tView, bindingIndex) {
    // All host bindings are placed after the expando section.
    return bindingIndex >= tView.expandoStartIndex;
}
/**
 * Collects the necessary information to insert the binding into a linked list of style bindings
 * using `insertTStylingBinding`.
 *
 * @param tView `TView` where the binding linked list will be stored.
 * @param tStylingKey Property/key of the binding.
 * @param bindingIndex Index of binding associated with the `prop`
 * @param isClassBased `true` if `class` change (`false` if `style`)
 */
function stylingFirstUpdatePass(tView, tStylingKey, bindingIndex, isClassBased) {
    ngDevMode && assertFirstUpdatePass(tView);
    const tData = tView.data;
    if (tData[bindingIndex + 1] === null) {
        // The above check is necessary because we don't clear first update pass until first successful
        // (no exception) template execution. This prevents the styling instruction from double adding
        // itself to the list.
        // `getSelectedIndex()` should be here (rather than in instruction) so that it is guarded by the
        // if so as not to read unnecessarily.
        const tNode = tData[getSelectedIndex()];
        ngDevMode && assertDefined(tNode, 'TNode expected');
        const isHostBindings = isInHostBindings(tView, bindingIndex);
        if (hasStylingInputShadow(tNode, isClassBased) && tStylingKey === null && !isHostBindings) {
            // `tStylingKey === null` implies that we are either `[style]` or `[class]` binding.
            // If there is a directive which uses `@Input('style')` or `@Input('class')` than
            // we need to neutralize this binding since that directive is shadowing it.
            // We turn this into a noop by setting the key to `false`
            tStylingKey = false;
        }
        tStylingKey = wrapInStaticStylingKey(tData, tNode, tStylingKey, isClassBased);
        insertTStylingBinding(tData, tNode, tStylingKey, bindingIndex, isHostBindings, isClassBased);
    }
}
/**
 * Adds static styling information to the binding if applicable.
 *
 * The linked list of styles not only stores the list and keys, but also stores static styling
 * information on some of the keys. This function determines if the key should contain the styling
 * information and computes it.
 *
 * See `TStylingStatic` for more details.
 *
 * @param tData `TData` where the linked list is stored.
 * @param tNode `TNode` for which the styling is being computed.
 * @param stylingKey `TStylingKeyPrimitive` which may need to be wrapped into `TStylingKey`
 * @param isClassBased `true` if `class` (`false` if `style`)
 */
export function wrapInStaticStylingKey(tData, tNode, stylingKey, isClassBased) {
    const hostDirectiveDef = getCurrentDirectiveDef(tData);
    let residual = isClassBased ? tNode.residualClasses : tNode.residualStyles;
    if (hostDirectiveDef === null) {
        // We are in template node.
        // If template node already had styling instruction then it has already collected the static
        // styling and there is no need to collect them again. We know that we are the first styling
        // instruction because the `TNode.*Bindings` points to 0 (nothing has been inserted yet).
        const isFirstStylingInstructionInTemplate = (isClassBased ? tNode.classBindings : tNode.styleBindings) === 0;
        if (isFirstStylingInstructionInTemplate) {
            // It would be nice to be able to get the statics from `mergeAttrs`, however, at this point
            // they are already merged and it would not be possible to figure which property belongs where
            // in the priority.
            stylingKey = collectStylingFromDirectives(null, tData, tNode, stylingKey, isClassBased);
            stylingKey = collectStylingFromTAttrs(stylingKey, tNode.attrs, isClassBased);
            // We know that if we have styling binding in template we can't have residual.
            residual = null;
        }
    }
    else {
        // We are in host binding node and there was no binding instruction in template node.
        // This means that we need to compute the residual.
        const directiveStylingLast = tNode.directiveStylingLast;
        const isFirstStylingInstructionInHostBinding = directiveStylingLast === -1 || tData[directiveStylingLast] !== hostDirectiveDef;
        if (isFirstStylingInstructionInHostBinding) {
            stylingKey =
                collectStylingFromDirectives(hostDirectiveDef, tData, tNode, stylingKey, isClassBased);
            if (residual === null) {
                // - If `null` than either:
                //    - Template styling instruction already ran and it has consumed the static
                //      styling into its `TStylingKey` and so there is no need to update residual. Instead
                //      we need to update the `TStylingKey` associated with the first template node
                //      instruction. OR
                //    - Some other styling instruction ran and determined that there are no residuals
                let templateStylingKey = getTemplateHeadTStylingKey(tData, tNode, isClassBased);
                if (templateStylingKey !== undefined && Array.isArray(templateStylingKey)) {
                    // Only recompute if `templateStylingKey` had static values. (If no static value found
                    // then there is nothing to do since this operation can only produce less static keys, not
                    // more.)
                    templateStylingKey = collectStylingFromDirectives(null, tData, tNode, templateStylingKey[1] /* unwrap previous statics */, isClassBased);
                    templateStylingKey =
                        collectStylingFromTAttrs(templateStylingKey, tNode.attrs, isClassBased);
                    setTemplateHeadTStylingKey(tData, tNode, isClassBased, templateStylingKey);
                }
            }
            else {
                // We only need to recompute residual if it is not `null`.
                // - If existing residual (implies there was no template styling). This means that some of
                //   the statics may have moved from the residual to the `stylingKey` and so we have to
                //   recompute.
                // - If `undefined` this is the first time we are running.
                residual = collectResidual(tData, tNode, isClassBased);
            }
        }
    }
    if (residual !== undefined) {
        isClassBased ? (tNode.residualClasses = residual) : (tNode.residualStyles = residual);
    }
    return stylingKey;
}
/**
 * Retrieve the `TStylingKey` for the template styling instruction.
 *
 * This is needed since `hostBinding` styling instructions are inserted after the template
 * instruction. While the template instruction needs to update the residual in `TNode` the
 * `hostBinding` instructions need to update the `TStylingKey` of the template instruction because
 * the template instruction is downstream from the `hostBindings` instructions.
 *
 * @param tData `TData` where the linked list is stored.
 * @param tNode `TNode` for which the styling is being computed.
 * @param isClassBased `true` if `class` (`false` if `style`)
 * @return `TStylingKey` if found or `undefined` if not found.
 */
function getTemplateHeadTStylingKey(tData, tNode, isClassBased) {
    const bindings = isClassBased ? tNode.classBindings : tNode.styleBindings;
    if (getTStylingRangeNext(bindings) === 0) {
        // There does not seem to be a styling instruction in the `template`.
        return undefined;
    }
    return tData[getTStylingRangePrev(bindings)];
}
/**
 * Update the `TStylingKey` of the first template instruction in `TNode`.
 *
 * Logically `hostBindings` styling instructions are of lower priority than that of the template.
 * However, they execute after the template styling instructions. This means that they get inserted
 * in front of the template styling instructions.
 *
 * If we have a template styling instruction and a new `hostBindings` styling instruction is
 * executed it means that it may need to steal static fields from the template instruction. This
 * method allows us to update the first template instruction `TStylingKey` with a new value.
 *
 * Assume:
 * ```
 * <div my-dir style="color: red" [style.color]="tmplExp"></div>
 *
 * @Directive({
 *   host: {
 *     'style': 'width: 100px',
 *     '[style.color]': 'dirExp',
 *   }
 * })
 * class MyDir {}
 * ```
 *
 * when `[style.color]="tmplExp"` executes it creates this data structure.
 * ```
 *  ['', 'color', 'color', 'red', 'width', '100px'],
 * ```
 *
 * The reason for this is that the template instruction does not know if there are styling
 * instructions and must assume that there are none and must collect all of the static styling.
 * (both
 * `color' and 'width`)
 *
 * When `'[style.color]': 'dirExp',` executes we need to insert a new data into the linked list.
 * ```
 *  ['', 'color', 'width', '100px'],  // newly inserted
 *  ['', 'color', 'color', 'red', 'width', '100px'], // this is wrong
 * ```
 *
 * Notice that the template statics is now wrong as it incorrectly contains `width` so we need to
 * update it like so:
 * ```
 *  ['', 'color', 'width', '100px'],
 *  ['', 'color', 'color', 'red'],    // UPDATE
 * ```
 *
 * @param tData `TData` where the linked list is stored.
 * @param tNode `TNode` for which the styling is being computed.
 * @param isClassBased `true` if `class` (`false` if `style`)
 * @param tStylingKey New `TStylingKey` which is replacing the old one.
 */
function setTemplateHeadTStylingKey(tData, tNode, isClassBased, tStylingKey) {
    const bindings = isClassBased ? tNode.classBindings : tNode.styleBindings;
    ngDevMode &&
        assertNotEqual(getTStylingRangeNext(bindings), 0, 'Expecting to have at least one template styling binding.');
    tData[getTStylingRangePrev(bindings)] = tStylingKey;
}
/**
 * Collect all static values after the current `TNode.directiveStylingLast` index.
 *
 * Collect the remaining styling information which has not yet been collected by an existing
 * styling instruction.
 *
 * @param tData `TData` where the `DirectiveDefs` are stored.
 * @param tNode `TNode` which contains the directive range.
 * @param isClassBased `true` if `class` (`false` if `style`)
 */
function collectResidual(tData, tNode, isClassBased) {
    let residual = undefined;
    const directiveEnd = tNode.directiveEnd;
    ngDevMode &&
        assertNotEqual(tNode.directiveStylingLast, -1, 'By the time this function gets called at least one hostBindings-node styling instruction must have executed.');
    // We add `1 + tNode.directiveStart` because we need to skip the current directive (as we are
    // collecting things after the last `hostBindings` directive which had a styling instruction.)
    for (let i = 1 + tNode.directiveStylingLast; i < directiveEnd; i++) {
        const attrs = tData[i].hostAttrs;
        residual = collectStylingFromTAttrs(residual, attrs, isClassBased);
    }
    return collectStylingFromTAttrs(residual, tNode.attrs, isClassBased);
}
/**
 * Collect the static styling information with lower priority than `hostDirectiveDef`.
 *
 * (This is opposite of residual styling.)
 *
 * @param hostDirectiveDef `DirectiveDef` for which we want to collect lower priority static
 *        styling. (Or `null` if template styling)
 * @param tData `TData` where the linked list is stored.
 * @param tNode `TNode` for which the styling is being computed.
 * @param stylingKey Existing `TStylingKey` to update or wrap.
 * @param isClassBased `true` if `class` (`false` if `style`)
 */
function collectStylingFromDirectives(hostDirectiveDef, tData, tNode, stylingKey, isClassBased) {
    // We need to loop because there can be directives which have `hostAttrs` but don't have
    // `hostBindings` so this loop catches up to the current directive..
    let currentDirective = null;
    const directiveEnd = tNode.directiveEnd;
    let directiveStylingLast = tNode.directiveStylingLast;
    if (directiveStylingLast === -1) {
        directiveStylingLast = tNode.directiveStart;
    }
    else {
        directiveStylingLast++;
    }
    while (directiveStylingLast < directiveEnd) {
        currentDirective = tData[directiveStylingLast];
        ngDevMode && assertDefined(currentDirective, 'expected to be defined');
        stylingKey = collectStylingFromTAttrs(stylingKey, currentDirective.hostAttrs, isClassBased);
        if (currentDirective === hostDirectiveDef)
            break;
        directiveStylingLast++;
    }
    if (hostDirectiveDef !== null) {
        // we only advance the styling cursor if we are collecting data from host bindings.
        // Template executes before host bindings and so if we would update the index,
        // host bindings would not get their statics.
        tNode.directiveStylingLast = directiveStylingLast;
    }
    return stylingKey;
}
/**
 * Convert `TAttrs` into `TStylingStatic`.
 *
 * @param stylingKey existing `TStylingKey` to update or wrap.
 * @param attrs `TAttributes` to process.
 * @param isClassBased `true` if `class` (`false` if `style`)
 */
function collectStylingFromTAttrs(stylingKey, attrs, isClassBased) {
    const desiredMarker = isClassBased ? 1 /* AttributeMarker.Classes */ : 2 /* AttributeMarker.Styles */;
    let currentMarker = -1 /* AttributeMarker.ImplicitAttributes */;
    if (attrs !== null) {
        for (let i = 0; i < attrs.length; i++) {
            const item = attrs[i];
            if (typeof item === 'number') {
                currentMarker = item;
            }
            else {
                if (currentMarker === desiredMarker) {
                    if (!Array.isArray(stylingKey)) {
                        stylingKey = stylingKey === undefined ? [] : ['', stylingKey];
                    }
                    keyValueArraySet(stylingKey, item, isClassBased ? true : attrs[++i]);
                }
            }
        }
    }
    return stylingKey === undefined ? null : stylingKey;
}
/**
 * Convert user input to `KeyValueArray`.
 *
 * This function takes user input which could be `string`, Object literal, or iterable and converts
 * it into a consistent representation. The output of this is `KeyValueArray` (which is an array
 * where
 * even indexes contain keys and odd indexes contain values for those keys).
 *
 * The advantage of converting to `KeyValueArray` is that we can perform diff in an input
 * independent
 * way.
 * (ie we can compare `foo bar` to `['bar', 'baz'] and determine a set of changes which need to be
 * applied)
 *
 * The fact that `KeyValueArray` is sorted is very important because it allows us to compute the
 * difference in linear fashion without the need to allocate any additional data.
 *
 * For example if we kept this as a `Map` we would have to iterate over previous `Map` to determine
 * which values need to be deleted, over the new `Map` to determine additions, and we would have to
 * keep additional `Map` to keep track of duplicates or items which have not yet been visited.
 *
 * @param keyValueArraySet (See `keyValueArraySet` in "util/array_utils") Gets passed in as a
 *        function so that `style` can be processed. This is done
 *        for tree shaking purposes.
 * @param stringParser The parser is passed in so that it will be tree shakable. See
 *        `styleStringParser` and `classStringParser`
 * @param value The value to parse/convert to `KeyValueArray`
 */
export function toStylingKeyValueArray(keyValueArraySet, stringParser, value) {
    if (value == null /*|| value === undefined */ || value === '')
        return EMPTY_ARRAY;
    const styleKeyValueArray = [];
    const unwrappedValue = unwrapSafeValue(value);
    if (Array.isArray(unwrappedValue)) {
        for (let i = 0; i < unwrappedValue.length; i++) {
            keyValueArraySet(styleKeyValueArray, unwrappedValue[i], true);
        }
    }
    else if (typeof unwrappedValue === 'object') {
        for (const key in unwrappedValue) {
            if (unwrappedValue.hasOwnProperty(key)) {
                keyValueArraySet(styleKeyValueArray, key, unwrappedValue[key]);
            }
        }
    }
    else if (typeof unwrappedValue === 'string') {
        stringParser(styleKeyValueArray, unwrappedValue);
    }
    else {
        ngDevMode &&
            throwError('Unsupported styling type ' + typeof unwrappedValue + ': ' + unwrappedValue);
    }
    return styleKeyValueArray;
}
/**
 * Set a `value` for a `key`.
 *
 * See: `keyValueArraySet` for details
 *
 * @param keyValueArray KeyValueArray to add to.
 * @param key Style key to add.
 * @param value The value to set.
 */
export function styleKeyValueArraySet(keyValueArray, key, value) {
    keyValueArraySet(keyValueArray, key, unwrapSafeValue(value));
}
/**
 * Class-binding-specific function for setting the `value` for a `key`.
 *
 * See: `keyValueArraySet` for details
 *
 * @param keyValueArray KeyValueArray to add to.
 * @param key Style key to add.
 * @param value The value to set.
 */
export function classKeyValueArraySet(keyValueArray, key, value) {
    // We use `classList.add` to eventually add the CSS classes to the DOM node. Any value passed into
    // `add` is stringified and added to the `class` attribute, e.g. even null, undefined or numbers
    // will be added. Stringify the key here so that our internal data structure matches the value in
    // the DOM. The only exceptions are empty strings and strings that contain spaces for which
    // the browser throws an error. We ignore such values, because the error is somewhat cryptic.
    const stringKey = String(key);
    if (stringKey !== '' && !stringKey.includes(' ')) {
        keyValueArraySet(keyValueArray, stringKey, value);
    }
}
/**
 * Update map based styling.
 *
 * Map based styling could be anything which contains more than one binding. For example `string`,
 * or object literal. Dealing with all of these types would complicate the logic so
 * instead this function expects that the complex input is first converted into normalized
 * `KeyValueArray`. The advantage of normalization is that we get the values sorted, which makes it
 * very cheap to compute deltas between the previous and current value.
 *
 * @param tView Associated `TView.data` contains the linked list of binding priorities.
 * @param tNode `TNode` where the binding is located.
 * @param lView `LView` contains the values associated with other styling binding at this `TNode`.
 * @param renderer Renderer to use if any updates.
 * @param oldKeyValueArray Previous value represented as `KeyValueArray`
 * @param newKeyValueArray Current value represented as `KeyValueArray`
 * @param isClassBased `true` if `class` (`false` if `style`)
 * @param bindingIndex Binding index of the binding.
 */
function updateStylingMap(tView, tNode, lView, renderer, oldKeyValueArray, newKeyValueArray, isClassBased, bindingIndex) {
    if (oldKeyValueArray === NO_CHANGE) {
        // On first execution the oldKeyValueArray is NO_CHANGE => treat it as empty KeyValueArray.
        oldKeyValueArray = EMPTY_ARRAY;
    }
    let oldIndex = 0;
    let newIndex = 0;
    let oldKey = 0 < oldKeyValueArray.length ? oldKeyValueArray[0] : null;
    let newKey = 0 < newKeyValueArray.length ? newKeyValueArray[0] : null;
    while (oldKey !== null || newKey !== null) {
        ngDevMode && assertLessThan(oldIndex, 999, 'Are we stuck in infinite loop?');
        ngDevMode && assertLessThan(newIndex, 999, 'Are we stuck in infinite loop?');
        const oldValue = oldIndex < oldKeyValueArray.length ? oldKeyValueArray[oldIndex + 1] : undefined;
        const newValue = newIndex < newKeyValueArray.length ? newKeyValueArray[newIndex + 1] : undefined;
        let setKey = null;
        let setValue = undefined;
        if (oldKey === newKey) {
            // UPDATE: Keys are equal => new value is overwriting old value.
            oldIndex += 2;
            newIndex += 2;
            if (oldValue !== newValue) {
                setKey = newKey;
                setValue = newValue;
            }
        }
        else if (newKey === null || oldKey !== null && oldKey < newKey) {
            // DELETE: oldKey key is missing or we did not find the oldKey in the newValue
            // (because the keyValueArray is sorted and `newKey` is found later alphabetically).
            // `"background" < "color"` so we need to delete `"background"` because it is not found in the
            // new array.
            oldIndex += 2;
            setKey = oldKey;
        }
        else {
            // CREATE: newKey's is earlier alphabetically than oldKey's (or no oldKey) => we have new key.
            // `"color" > "background"` so we need to add `color` because it is in new array but not in
            // old array.
            ngDevMode && assertDefined(newKey, 'Expecting to have a valid key');
            newIndex += 2;
            setKey = newKey;
            setValue = newValue;
        }
        if (setKey !== null) {
            updateStyling(tView, tNode, lView, renderer, setKey, setValue, isClassBased, bindingIndex);
        }
        oldKey = oldIndex < oldKeyValueArray.length ? oldKeyValueArray[oldIndex] : null;
        newKey = newIndex < newKeyValueArray.length ? newKeyValueArray[newIndex] : null;
    }
}
/**
 * Update a simple (property name) styling.
 *
 * This function takes `prop` and updates the DOM to that value. The function takes the binding
 * value as well as binding priority into consideration to determine which value should be written
 * to DOM. (For example it may be determined that there is a higher priority overwrite which blocks
 * the DOM write, or if the value goes to `undefined` a lower priority overwrite may be consulted.)
 *
 * @param tView Associated `TView.data` contains the linked list of binding priorities.
 * @param tNode `TNode` where the binding is located.
 * @param lView `LView` contains the values associated with other styling binding at this `TNode`.
 * @param renderer Renderer to use if any updates.
 * @param prop Either style property name or a class name.
 * @param value Either style value for `prop` or `true`/`false` if `prop` is class.
 * @param isClassBased `true` if `class` (`false` if `style`)
 * @param bindingIndex Binding index of the binding.
 */
function updateStyling(tView, tNode, lView, renderer, prop, value, isClassBased, bindingIndex) {
    if (!(tNode.type & 3 /* TNodeType.AnyRNode */)) {
        // It is possible to have styling on non-elements (such as ng-container).
        // This is rare, but it does happen. In such a case, just ignore the binding.
        return;
    }
    const tData = tView.data;
    const tRange = tData[bindingIndex + 1];
    const higherPriorityValue = getTStylingRangeNextDuplicate(tRange) ?
        findStylingValue(tData, tNode, lView, prop, getTStylingRangeNext(tRange), isClassBased) :
        undefined;
    if (!isStylingValuePresent(higherPriorityValue)) {
        // We don't have a next duplicate, or we did not find a duplicate value.
        if (!isStylingValuePresent(value)) {
            // We should delete current value or restore to lower priority value.
            if (getTStylingRangePrevDuplicate(tRange)) {
                // We have a possible prev duplicate, let's retrieve it.
                value = findStylingValue(tData, null, lView, prop, bindingIndex, isClassBased);
            }
        }
        const rNode = getNativeByIndex(getSelectedIndex(), lView);
        applyStyling(renderer, isClassBased, rNode, prop, value);
    }
}
/**
 * Search for styling value with higher priority which is overwriting current value, or a
 * value of lower priority to which we should fall back if the value is `undefined`.
 *
 * When value is being applied at a location, related values need to be consulted.
 * - If there is a higher priority binding, we should be using that one instead.
 *   For example `<div  [style]="{color:exp1}" [style.color]="exp2">` change to `exp1`
 *   requires that we check `exp2` to see if it is set to value other than `undefined`.
 * - If there is a lower priority binding and we are changing to `undefined`
 *   For example `<div  [style]="{color:exp1}" [style.color]="exp2">` change to `exp2` to
 *   `undefined` requires that we check `exp1` (and static values) and use that as new value.
 *
 * NOTE: The styling stores two values.
 * 1. The raw value which came from the application is stored at `index + 0` location. (This value
 *    is used for dirty checking).
 * 2. The normalized value is stored at `index + 1`.
 *
 * @param tData `TData` used for traversing the priority.
 * @param tNode `TNode` to use for resolving static styling. Also controls search direction.
 *   - `TNode` search next and quit as soon as `isStylingValuePresent(value)` is true.
 *      If no value found consult `tNode.residualStyle`/`tNode.residualClass` for default value.
 *   - `null` search prev and go all the way to end. Return last value where
 *     `isStylingValuePresent(value)` is true.
 * @param lView `LView` used for retrieving the actual values.
 * @param prop Property which we are interested in.
 * @param index Starting index in the linked list of styling bindings where the search should start.
 * @param isClassBased `true` if `class` (`false` if `style`)
 */
function findStylingValue(tData, tNode, lView, prop, index, isClassBased) {
    // `TNode` to use for resolving static styling. Also controls search direction.
    //   - `TNode` search next and quit as soon as `isStylingValuePresent(value)` is true.
    //      If no value found consult `tNode.residualStyle`/`tNode.residualClass` for default value.
    //   - `null` search prev and go all the way to end. Return last value where
    //     `isStylingValuePresent(value)` is true.
    const isPrevDirection = tNode === null;
    let value = undefined;
    while (index > 0) {
        const rawKey = tData[index];
        const containsStatics = Array.isArray(rawKey);
        // Unwrap the key if we contain static values.
        const key = containsStatics ? rawKey[1] : rawKey;
        const isStylingMap = key === null;
        let valueAtLViewIndex = lView[index + 1];
        if (valueAtLViewIndex === NO_CHANGE) {
            // In firstUpdatePass the styling instructions create a linked list of styling.
            // On subsequent passes it is possible for a styling instruction to try to read a binding
            // which
            // has not yet executed. In that case we will find `NO_CHANGE` and we should assume that
            // we have `undefined` (or empty array in case of styling-map instruction) instead. This
            // allows the resolution to apply the value (which may later be overwritten when the
            // binding actually executes.)
            valueAtLViewIndex = isStylingMap ? EMPTY_ARRAY : undefined;
        }
        let currentValue = isStylingMap ? keyValueArrayGet(valueAtLViewIndex, prop) :
            (key === prop ? valueAtLViewIndex : undefined);
        if (containsStatics && !isStylingValuePresent(currentValue)) {
            currentValue = keyValueArrayGet(rawKey, prop);
        }
        if (isStylingValuePresent(currentValue)) {
            value = currentValue;
            if (isPrevDirection) {
                return value;
            }
        }
        const tRange = tData[index + 1];
        index = isPrevDirection ? getTStylingRangePrev(tRange) : getTStylingRangeNext(tRange);
    }
    if (tNode !== null) {
        // in case where we are going in next direction AND we did not find anything, we need to
        // consult residual styling
        let residual = isClassBased ? tNode.residualClasses : tNode.residualStyles;
        if (residual != null /** OR residual !=== undefined */) {
            value = keyValueArrayGet(residual, prop);
        }
    }
    return value;
}
/**
 * Determines if the binding value should be used (or if the value is 'undefined' and hence priority
 * resolution should be used.)
 *
 * @param value Binding style value.
 */
function isStylingValuePresent(value) {
    // Currently only `undefined` value is considered non-binding. That is `undefined` says I don't
    // have an opinion as to what this binding should be and you should consult other bindings by
    // priority to determine the valid value.
    // This is extracted into a single function so that we have a single place to control this.
    return value !== undefined;
}
/**
 * Normalizes and/or adds a suffix to the value.
 *
 * If value is `null`/`undefined` no suffix is added
 * @param value
 * @param suffix
 */
function normalizeSuffix(value, suffix) {
    if (value == null || value === '') {
        // do nothing
        // Do not add the suffix if the value is going to be empty.
        // As it produce invalid CSS, which the browsers will automatically omit but Domino will not.
        // Example: `"left": "px;"` instead of `"left": ""`.
    }
    else if (typeof suffix === 'string') {
        value = value + suffix;
    }
    else if (typeof value === 'object') {
        value = stringify(unwrapSafeValue(value));
    }
    return value;
}
/**
 * Tests if the `TNode` has input shadow.
 *
 * An input shadow is when a directive steals (shadows) the input by using `@Input('style')` or
 * `@Input('class')` as input.
 *
 * @param tNode `TNode` which we would like to see if it has shadow.
 * @param isClassBased `true` if `class` (`false` if `style`)
 */
export function hasStylingInputShadow(tNode, isClassBased) {
    return (tNode.flags & (isClassBased ? 8 /* TNodeFlags.hasClassInput */ : 16 /* TNodeFlags.hasStyleInput */)) !== 0;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaW5zdHJ1Y3Rpb25zL3N0eWxpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFZLGVBQWUsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3JFLE9BQU8sRUFBZ0IsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RixPQUFPLEVBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ3pHLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUM3QyxPQUFPLEVBQUMsc0JBQXNCLEVBQUUsU0FBUyxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdkUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQ2hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFNM0MsT0FBTyxFQUFDLG9CQUFvQixFQUFFLDZCQUE2QixFQUFFLG9CQUFvQixFQUFFLDZCQUE2QixFQUE2QixNQUFNLHVCQUF1QixDQUFDO0FBQzNLLE9BQU8sRUFBUSxRQUFRLEVBQWUsTUFBTSxvQkFBb0IsQ0FBQztBQUNqRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFDLHNCQUFzQixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUscUJBQXFCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDN0csT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDcEUsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGtCQUFrQixFQUFFLGNBQWMsRUFBRSxrQkFBa0IsRUFB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cEcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1NhZmVWYWx1ZSwgdW53cmFwU2FmZVZhbHVlfSBmcm9tICcuLi8uLi9zYW5pdGl6YXRpb24vYnlwYXNzJztcbmltcG9ydCB7S2V5VmFsdWVBcnJheSwga2V5VmFsdWVBcnJheUdldCwga2V5VmFsdWVBcnJheVNldH0gZnJvbSAnLi4vLi4vdXRpbC9hcnJheV91dGlscyc7XG5pbXBvcnQge2Fzc2VydERlZmluZWQsIGFzc2VydEVxdWFsLCBhc3NlcnRMZXNzVGhhbiwgYXNzZXJ0Tm90RXF1YWwsIHRocm93RXJyb3J9IGZyb20gJy4uLy4uL3V0aWwvYXNzZXJ0JztcbmltcG9ydCB7RU1QVFlfQVJSQVl9IGZyb20gJy4uLy4uL3V0aWwvZW1wdHknO1xuaW1wb3J0IHtjb25jYXRTdHJpbmdzV2l0aFNwYWNlLCBzdHJpbmdpZnl9IGZyb20gJy4uLy4uL3V0aWwvc3RyaW5naWZ5JztcbmltcG9ydCB7YXNzZXJ0Rmlyc3RVcGRhdGVQYXNzfSBmcm9tICcuLi9hc3NlcnQnO1xuaW1wb3J0IHtiaW5kaW5nVXBkYXRlZH0gZnJvbSAnLi4vYmluZGluZ3MnO1xuaW1wb3J0IHsgQXR0cmlidXRlTWFya2VyIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9hdHRyaWJ1dGVfbWFya2VyJztcbmltcG9ydCB7RGlyZWN0aXZlRGVmfSBmcm9tICcuLi9pbnRlcmZhY2VzL2RlZmluaXRpb24nO1xuaW1wb3J0IHtUQXR0cmlidXRlcywgVE5vZGUsIFROb2RlRmxhZ3MsIFROb2RlVHlwZX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9ub2RlJztcbmltcG9ydCB7UmVuZGVyZXJ9IGZyb20gJy4uL2ludGVyZmFjZXMvcmVuZGVyZXInO1xuaW1wb3J0IHtSRWxlbWVudH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZW5kZXJlcl9kb20nO1xuaW1wb3J0IHtnZXRUU3R5bGluZ1JhbmdlTmV4dCwgZ2V0VFN0eWxpbmdSYW5nZU5leHREdXBsaWNhdGUsIGdldFRTdHlsaW5nUmFuZ2VQcmV2LCBnZXRUU3R5bGluZ1JhbmdlUHJldkR1cGxpY2F0ZSwgVFN0eWxpbmdLZXksIFRTdHlsaW5nUmFuZ2V9IGZyb20gJy4uL2ludGVyZmFjZXMvc3R5bGluZyc7XG5pbXBvcnQge0xWaWV3LCBSRU5ERVJFUiwgVERhdGEsIFRWaWV3fSBmcm9tICcuLi9pbnRlcmZhY2VzL3ZpZXcnO1xuaW1wb3J0IHthcHBseVN0eWxpbmd9IGZyb20gJy4uL25vZGVfbWFuaXB1bGF0aW9uJztcbmltcG9ydCB7Z2V0Q3VycmVudERpcmVjdGl2ZURlZiwgZ2V0TFZpZXcsIGdldFNlbGVjdGVkSW5kZXgsIGdldFRWaWV3LCBpbmNyZW1lbnRCaW5kaW5nSW5kZXh9IGZyb20gJy4uL3N0YXRlJztcbmltcG9ydCB7aW5zZXJ0VFN0eWxpbmdCaW5kaW5nfSBmcm9tICcuLi9zdHlsaW5nL3N0eWxlX2JpbmRpbmdfbGlzdCc7XG5pbXBvcnQge2dldExhc3RQYXJzZWRLZXksIGdldExhc3RQYXJzZWRWYWx1ZSwgcGFyc2VDbGFzc05hbWUsIHBhcnNlQ2xhc3NOYW1lTmV4dCwgcGFyc2VTdHlsZSwgcGFyc2VTdHlsZU5leHR9IGZyb20gJy4uL3N0eWxpbmcvc3R5bGluZ19wYXJzZXInO1xuaW1wb3J0IHtOT19DSEFOR0V9IGZyb20gJy4uL3Rva2Vucyc7XG5pbXBvcnQge2dldE5hdGl2ZUJ5SW5kZXh9IGZyb20gJy4uL3V0aWwvdmlld191dGlscyc7XG5cbmltcG9ydCB7c2V0RGlyZWN0aXZlSW5wdXRzV2hpY2hTaGFkb3dzU3R5bGluZ30gZnJvbSAnLi9wcm9wZXJ0eSc7XG5cblxuLyoqXG4gKiBVcGRhdGUgYSBzdHlsZSBiaW5kaW5nIG9uIGFuIGVsZW1lbnQgd2l0aCB0aGUgcHJvdmlkZWQgdmFsdWUuXG4gKlxuICogSWYgdGhlIHN0eWxlIHZhbHVlIGlzIGZhbHN5IHRoZW4gaXQgd2lsbCBiZSByZW1vdmVkIGZyb20gdGhlIGVsZW1lbnRcbiAqIChvciBhc3NpZ25lZCBhIGRpZmZlcmVudCB2YWx1ZSBkZXBlbmRpbmcgaWYgdGhlcmUgYXJlIGFueSBzdHlsZXMgcGxhY2VkXG4gKiBvbiB0aGUgZWxlbWVudCB3aXRoIGBzdHlsZU1hcGAgb3IgYW55IHN0YXRpYyBzdHlsZXMgdGhhdCBhcmVcbiAqIHByZXNlbnQgZnJvbSB3aGVuIHRoZSBlbGVtZW50IHdhcyBjcmVhdGVkIHdpdGggYHN0eWxpbmdgKS5cbiAqXG4gKiBOb3RlIHRoYXQgdGhlIHN0eWxpbmcgZWxlbWVudCBpcyB1cGRhdGVkIGFzIHBhcnQgb2YgYHN0eWxpbmdBcHBseWAuXG4gKlxuICogQHBhcmFtIHByb3AgQSB2YWxpZCBDU1MgcHJvcGVydHkuXG4gKiBAcGFyYW0gdmFsdWUgTmV3IHZhbHVlIHRvIHdyaXRlIChgbnVsbGAgb3IgYW4gZW1wdHkgc3RyaW5nIHRvIHJlbW92ZSkuXG4gKiBAcGFyYW0gc3VmZml4IE9wdGlvbmFsIHN1ZmZpeC4gVXNlZCB3aXRoIHNjYWxhciB2YWx1ZXMgdG8gYWRkIHVuaXQgc3VjaCBhcyBgcHhgLlxuICpcbiAqIE5vdGUgdGhhdCB0aGlzIHdpbGwgYXBwbHkgdGhlIHByb3ZpZGVkIHN0eWxlIHZhbHVlIHRvIHRoZSBob3N0IGVsZW1lbnQgaWYgdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWRcbiAqIHdpdGhpbiBhIGhvc3QgYmluZGluZyBmdW5jdGlvbi5cbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtXN0eWxlUHJvcChcbiAgICBwcm9wOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmd8bnVtYmVyfFNhZmVWYWx1ZXx1bmRlZmluZWR8bnVsbCxcbiAgICBzdWZmaXg/OiBzdHJpbmd8bnVsbCk6IHR5cGVvZiDJtcm1c3R5bGVQcm9wIHtcbiAgY2hlY2tTdHlsaW5nUHJvcGVydHkocHJvcCwgdmFsdWUsIHN1ZmZpeCwgZmFsc2UpO1xuICByZXR1cm4gybXJtXN0eWxlUHJvcDtcbn1cblxuLyoqXG4gKiBVcGRhdGUgYSBjbGFzcyBiaW5kaW5nIG9uIGFuIGVsZW1lbnQgd2l0aCB0aGUgcHJvdmlkZWQgdmFsdWUuXG4gKlxuICogVGhpcyBpbnN0cnVjdGlvbiBpcyBtZWFudCB0byBoYW5kbGUgdGhlIGBbY2xhc3MuZm9vXT1cImV4cFwiYCBjYXNlIGFuZCxcbiAqIHRoZXJlZm9yZSwgdGhlIGNsYXNzIGJpbmRpbmcgaXRzZWxmIG11c3QgYWxyZWFkeSBiZSBhbGxvY2F0ZWQgdXNpbmdcbiAqIGBzdHlsaW5nYCB3aXRoaW4gdGhlIGNyZWF0aW9uIGJsb2NrLlxuICpcbiAqIEBwYXJhbSBwcm9wIEEgdmFsaWQgQ1NTIGNsYXNzIChvbmx5IG9uZSkuXG4gKiBAcGFyYW0gdmFsdWUgQSB0cnVlL2ZhbHNlIHZhbHVlIHdoaWNoIHdpbGwgdHVybiB0aGUgY2xhc3Mgb24gb3Igb2ZmLlxuICpcbiAqIE5vdGUgdGhhdCB0aGlzIHdpbGwgYXBwbHkgdGhlIHByb3ZpZGVkIGNsYXNzIHZhbHVlIHRvIHRoZSBob3N0IGVsZW1lbnQgaWYgdGhpcyBmdW5jdGlvblxuICogaXMgY2FsbGVkIHdpdGhpbiBhIGhvc3QgYmluZGluZyBmdW5jdGlvbi5cbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtWNsYXNzUHJvcChjbGFzc05hbWU6IHN0cmluZywgdmFsdWU6IGJvb2xlYW58dW5kZWZpbmVkfG51bGwpOiB0eXBlb2YgybXJtWNsYXNzUHJvcCB7XG4gIGNoZWNrU3R5bGluZ1Byb3BlcnR5KGNsYXNzTmFtZSwgdmFsdWUsIG51bGwsIHRydWUpO1xuICByZXR1cm4gybXJtWNsYXNzUHJvcDtcbn1cblxuXG4vKipcbiAqIFVwZGF0ZSBzdHlsZSBiaW5kaW5ncyB1c2luZyBhbiBvYmplY3QgbGl0ZXJhbCBvbiBhbiBlbGVtZW50LlxuICpcbiAqIFRoaXMgaW5zdHJ1Y3Rpb24gaXMgbWVhbnQgdG8gYXBwbHkgc3R5bGluZyB2aWEgdGhlIGBbc3R5bGVdPVwiZXhwXCJgIHRlbXBsYXRlIGJpbmRpbmdzLlxuICogV2hlbiBzdHlsZXMgYXJlIGFwcGxpZWQgdG8gdGhlIGVsZW1lbnQgdGhleSB3aWxsIHRoZW4gYmUgdXBkYXRlZCB3aXRoIHJlc3BlY3QgdG9cbiAqIGFueSBzdHlsZXMvY2xhc3NlcyBzZXQgdmlhIGBzdHlsZVByb3BgLiBJZiBhbnkgc3R5bGVzIGFyZSBzZXQgdG8gZmFsc3lcbiAqIHRoZW4gdGhleSB3aWxsIGJlIHJlbW92ZWQgZnJvbSB0aGUgZWxlbWVudC5cbiAqXG4gKiBOb3RlIHRoYXQgdGhlIHN0eWxpbmcgaW5zdHJ1Y3Rpb24gd2lsbCBub3QgYmUgYXBwbGllZCB1bnRpbCBgc3R5bGluZ0FwcGx5YCBpcyBjYWxsZWQuXG4gKlxuICogQHBhcmFtIHN0eWxlcyBBIGtleS92YWx1ZSBzdHlsZSBtYXAgb2YgdGhlIHN0eWxlcyB0aGF0IHdpbGwgYmUgYXBwbGllZCB0byB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAqICAgICAgICBBbnkgbWlzc2luZyBzdHlsZXMgKHRoYXQgaGF2ZSBhbHJlYWR5IGJlZW4gYXBwbGllZCB0byB0aGUgZWxlbWVudCBiZWZvcmVoYW5kKSB3aWxsIGJlXG4gKiAgICAgICAgcmVtb3ZlZCAodW5zZXQpIGZyb20gdGhlIGVsZW1lbnQncyBzdHlsaW5nLlxuICpcbiAqIE5vdGUgdGhhdCB0aGlzIHdpbGwgYXBwbHkgdGhlIHByb3ZpZGVkIHN0eWxlTWFwIHZhbHVlIHRvIHRoZSBob3N0IGVsZW1lbnQgaWYgdGhpcyBmdW5jdGlvblxuICogaXMgY2FsbGVkIHdpdGhpbiBhIGhvc3QgYmluZGluZy5cbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtXN0eWxlTWFwKHN0eWxlczoge1tzdHlsZU5hbWU6IHN0cmluZ106IGFueX18c3RyaW5nfHVuZGVmaW5lZHxudWxsKTogdm9pZCB7XG4gIGNoZWNrU3R5bGluZ01hcChzdHlsZUtleVZhbHVlQXJyYXlTZXQsIHN0eWxlU3RyaW5nUGFyc2VyLCBzdHlsZXMsIGZhbHNlKTtcbn1cblxuXG4vKipcbiAqIFBhcnNlIHRleHQgYXMgc3R5bGUgYW5kIGFkZCB2YWx1ZXMgdG8gS2V5VmFsdWVBcnJheS5cbiAqXG4gKiBUaGlzIGNvZGUgaXMgcHVsbGVkIG91dCB0byBhIHNlcGFyYXRlIGZ1bmN0aW9uIHNvIHRoYXQgaXQgY2FuIGJlIHRyZWUgc2hha2VuIGF3YXkgaWYgaXQgaXMgbm90XG4gKiBuZWVkZWQuIEl0IGlzIG9ubHkgcmVmZXJlbmNlZCBmcm9tIGDJtcm1c3R5bGVNYXBgLlxuICpcbiAqIEBwYXJhbSBrZXlWYWx1ZUFycmF5IEtleVZhbHVlQXJyYXkgdG8gYWRkIHBhcnNlZCB2YWx1ZXMgdG8uXG4gKiBAcGFyYW0gdGV4dCB0ZXh0IHRvIHBhcnNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3R5bGVTdHJpbmdQYXJzZXIoa2V5VmFsdWVBcnJheTogS2V5VmFsdWVBcnJheTxhbnk+LCB0ZXh0OiBzdHJpbmcpOiB2b2lkIHtcbiAgZm9yIChsZXQgaSA9IHBhcnNlU3R5bGUodGV4dCk7IGkgPj0gMDsgaSA9IHBhcnNlU3R5bGVOZXh0KHRleHQsIGkpKSB7XG4gICAgc3R5bGVLZXlWYWx1ZUFycmF5U2V0KGtleVZhbHVlQXJyYXksIGdldExhc3RQYXJzZWRLZXkodGV4dCksIGdldExhc3RQYXJzZWRWYWx1ZSh0ZXh0KSk7XG4gIH1cbn1cblxuXG4vKipcbiAqIFVwZGF0ZSBjbGFzcyBiaW5kaW5ncyB1c2luZyBhbiBvYmplY3QgbGl0ZXJhbCBvciBjbGFzcy1zdHJpbmcgb24gYW4gZWxlbWVudC5cbiAqXG4gKiBUaGlzIGluc3RydWN0aW9uIGlzIG1lYW50IHRvIGFwcGx5IHN0eWxpbmcgdmlhIHRoZSBgW2NsYXNzXT1cImV4cFwiYCB0ZW1wbGF0ZSBiaW5kaW5ncy5cbiAqIFdoZW4gY2xhc3NlcyBhcmUgYXBwbGllZCB0byB0aGUgZWxlbWVudCB0aGV5IHdpbGwgdGhlbiBiZSB1cGRhdGVkIHdpdGhcbiAqIHJlc3BlY3QgdG8gYW55IHN0eWxlcy9jbGFzc2VzIHNldCB2aWEgYGNsYXNzUHJvcGAuIElmIGFueVxuICogY2xhc3NlcyBhcmUgc2V0IHRvIGZhbHN5IHRoZW4gdGhleSB3aWxsIGJlIHJlbW92ZWQgZnJvbSB0aGUgZWxlbWVudC5cbiAqXG4gKiBOb3RlIHRoYXQgdGhlIHN0eWxpbmcgaW5zdHJ1Y3Rpb24gd2lsbCBub3QgYmUgYXBwbGllZCB1bnRpbCBgc3R5bGluZ0FwcGx5YCBpcyBjYWxsZWQuXG4gKiBOb3RlIHRoYXQgdGhpcyB3aWxsIHRoZSBwcm92aWRlZCBjbGFzc01hcCB2YWx1ZSB0byB0aGUgaG9zdCBlbGVtZW50IGlmIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkXG4gKiB3aXRoaW4gYSBob3N0IGJpbmRpbmcuXG4gKlxuICogQHBhcmFtIGNsYXNzZXMgQSBrZXkvdmFsdWUgbWFwIG9yIHN0cmluZyBvZiBDU1MgY2xhc3NlcyB0aGF0IHdpbGwgYmUgYWRkZWQgdG8gdGhlXG4gKiAgICAgICAgZ2l2ZW4gZWxlbWVudC4gQW55IG1pc3NpbmcgY2xhc3NlcyAodGhhdCBoYXZlIGFscmVhZHkgYmVlbiBhcHBsaWVkIHRvIHRoZSBlbGVtZW50XG4gKiAgICAgICAgYmVmb3JlaGFuZCkgd2lsbCBiZSByZW1vdmVkICh1bnNldCkgZnJvbSB0aGUgZWxlbWVudCdzIGxpc3Qgb2YgQ1NTIGNsYXNzZXMuXG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVjbGFzc01hcChjbGFzc2VzOiB7W2NsYXNzTmFtZTogc3RyaW5nXTogYm9vbGVhbnx1bmRlZmluZWR8bnVsbH18c3RyaW5nfHVuZGVmaW5lZHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwpOiB2b2lkIHtcbiAgY2hlY2tTdHlsaW5nTWFwKGNsYXNzS2V5VmFsdWVBcnJheVNldCwgY2xhc3NTdHJpbmdQYXJzZXIsIGNsYXNzZXMsIHRydWUpO1xufVxuXG4vKipcbiAqIFBhcnNlIHRleHQgYXMgY2xhc3MgYW5kIGFkZCB2YWx1ZXMgdG8gS2V5VmFsdWVBcnJheS5cbiAqXG4gKiBUaGlzIGNvZGUgaXMgcHVsbGVkIG91dCB0byBhIHNlcGFyYXRlIGZ1bmN0aW9uIHNvIHRoYXQgaXQgY2FuIGJlIHRyZWUgc2hha2VuIGF3YXkgaWYgaXQgaXMgbm90XG4gKiBuZWVkZWQuIEl0IGlzIG9ubHkgcmVmZXJlbmNlZCBmcm9tIGDJtcm1Y2xhc3NNYXBgLlxuICpcbiAqIEBwYXJhbSBrZXlWYWx1ZUFycmF5IEtleVZhbHVlQXJyYXkgdG8gYWRkIHBhcnNlZCB2YWx1ZXMgdG8uXG4gKiBAcGFyYW0gdGV4dCB0ZXh0IHRvIHBhcnNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2xhc3NTdHJpbmdQYXJzZXIoa2V5VmFsdWVBcnJheTogS2V5VmFsdWVBcnJheTxhbnk+LCB0ZXh0OiBzdHJpbmcpOiB2b2lkIHtcbiAgZm9yIChsZXQgaSA9IHBhcnNlQ2xhc3NOYW1lKHRleHQpOyBpID49IDA7IGkgPSBwYXJzZUNsYXNzTmFtZU5leHQodGV4dCwgaSkpIHtcbiAgICBrZXlWYWx1ZUFycmF5U2V0KGtleVZhbHVlQXJyYXksIGdldExhc3RQYXJzZWRLZXkodGV4dCksIHRydWUpO1xuICB9XG59XG5cbi8qKlxuICogQ29tbW9uIGNvZGUgYmV0d2VlbiBgybXJtWNsYXNzUHJvcGAgYW5kIGDJtcm1c3R5bGVQcm9wYC5cbiAqXG4gKiBAcGFyYW0gcHJvcCBwcm9wZXJ0eSBuYW1lLlxuICogQHBhcmFtIHZhbHVlIGJpbmRpbmcgdmFsdWUuXG4gKiBAcGFyYW0gc3VmZml4IHN1ZmZpeCBmb3IgdGhlIHByb3BlcnR5IChlLmcuIGBlbWAgb3IgYHB4YClcbiAqIEBwYXJhbSBpc0NsYXNzQmFzZWQgYHRydWVgIGlmIGBjbGFzc2AgY2hhbmdlIChgZmFsc2VgIGlmIGBzdHlsZWApXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjaGVja1N0eWxpbmdQcm9wZXJ0eShcbiAgICBwcm9wOiBzdHJpbmcsIHZhbHVlOiBhbnl8Tk9fQ0hBTkdFLCBzdWZmaXg6IHN0cmluZ3x1bmRlZmluZWR8bnVsbCxcbiAgICBpc0NsYXNzQmFzZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgY29uc3QgbFZpZXcgPSBnZXRMVmlldygpO1xuICBjb25zdCB0VmlldyA9IGdldFRWaWV3KCk7XG4gIC8vIFN0eWxpbmcgaW5zdHJ1Y3Rpb25zIHVzZSAyIHNsb3RzIHBlciBiaW5kaW5nLlxuICAvLyAxLiBvbmUgZm9yIHRoZSB2YWx1ZSAvIFRTdHlsaW5nS2V5XG4gIC8vIDIuIG9uZSBmb3IgdGhlIGludGVybWl0dGVudC12YWx1ZSAvIFRTdHlsaW5nUmFuZ2VcbiAgY29uc3QgYmluZGluZ0luZGV4ID0gaW5jcmVtZW50QmluZGluZ0luZGV4KDIpO1xuICBpZiAodFZpZXcuZmlyc3RVcGRhdGVQYXNzKSB7XG4gICAgc3R5bGluZ0ZpcnN0VXBkYXRlUGFzcyh0VmlldywgcHJvcCwgYmluZGluZ0luZGV4LCBpc0NsYXNzQmFzZWQpO1xuICB9XG4gIGlmICh2YWx1ZSAhPT0gTk9fQ0hBTkdFICYmIGJpbmRpbmdVcGRhdGVkKGxWaWV3LCBiaW5kaW5nSW5kZXgsIHZhbHVlKSkge1xuICAgIGNvbnN0IHROb2RlID0gdFZpZXcuZGF0YVtnZXRTZWxlY3RlZEluZGV4KCldIGFzIFROb2RlO1xuICAgIHVwZGF0ZVN0eWxpbmcoXG4gICAgICAgIHRWaWV3LCB0Tm9kZSwgbFZpZXcsIGxWaWV3W1JFTkRFUkVSXSwgcHJvcCxcbiAgICAgICAgbFZpZXdbYmluZGluZ0luZGV4ICsgMV0gPSBub3JtYWxpemVTdWZmaXgodmFsdWUsIHN1ZmZpeCksIGlzQ2xhc3NCYXNlZCwgYmluZGluZ0luZGV4KTtcbiAgfVxufVxuXG4vKipcbiAqIENvbW1vbiBjb2RlIGJldHdlZW4gYMm1ybVjbGFzc01hcGAgYW5kIGDJtcm1c3R5bGVNYXBgLlxuICpcbiAqIEBwYXJhbSBrZXlWYWx1ZUFycmF5U2V0IChTZWUgYGtleVZhbHVlQXJyYXlTZXRgIGluIFwidXRpbC9hcnJheV91dGlsc1wiKSBHZXRzIHBhc3NlZCBpbiBhcyBhXG4gKiAgICAgICAgZnVuY3Rpb24gc28gdGhhdCBgc3R5bGVgIGNhbiBiZSBwcm9jZXNzZWQuIFRoaXMgaXMgZG9uZSBmb3IgdHJlZSBzaGFraW5nIHB1cnBvc2VzLlxuICogQHBhcmFtIHN0cmluZ1BhcnNlciBQYXJzZXIgdXNlZCB0byBwYXJzZSBgdmFsdWVgIGlmIGBzdHJpbmdgLiAoUGFzc2VkIGluIGFzIGBzdHlsZWAgYW5kIGBjbGFzc2BcbiAqICAgICAgICBoYXZlIGRpZmZlcmVudCBwYXJzZXJzLilcbiAqIEBwYXJhbSB2YWx1ZSBib3VuZCB2YWx1ZSBmcm9tIGFwcGxpY2F0aW9uXG4gKiBAcGFyYW0gaXNDbGFzc0Jhc2VkIGB0cnVlYCBpZiBgY2xhc3NgIGNoYW5nZSAoYGZhbHNlYCBpZiBgc3R5bGVgKVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tTdHlsaW5nTWFwKFxuICAgIGtleVZhbHVlQXJyYXlTZXQ6IChrZXlWYWx1ZUFycmF5OiBLZXlWYWx1ZUFycmF5PGFueT4sIGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSA9PiB2b2lkLFxuICAgIHN0cmluZ1BhcnNlcjogKHN0eWxlS2V5VmFsdWVBcnJheTogS2V5VmFsdWVBcnJheTxhbnk+LCB0ZXh0OiBzdHJpbmcpID0+IHZvaWQsXG4gICAgdmFsdWU6IGFueXxOT19DSEFOR0UsIGlzQ2xhc3NCYXNlZDogYm9vbGVhbik6IHZvaWQge1xuICBjb25zdCB0VmlldyA9IGdldFRWaWV3KCk7XG4gIGNvbnN0IGJpbmRpbmdJbmRleCA9IGluY3JlbWVudEJpbmRpbmdJbmRleCgyKTtcbiAgaWYgKHRWaWV3LmZpcnN0VXBkYXRlUGFzcykge1xuICAgIHN0eWxpbmdGaXJzdFVwZGF0ZVBhc3ModFZpZXcsIG51bGwsIGJpbmRpbmdJbmRleCwgaXNDbGFzc0Jhc2VkKTtcbiAgfVxuICBjb25zdCBsVmlldyA9IGdldExWaWV3KCk7XG4gIGlmICh2YWx1ZSAhPT0gTk9fQ0hBTkdFICYmIGJpbmRpbmdVcGRhdGVkKGxWaWV3LCBiaW5kaW5nSW5kZXgsIHZhbHVlKSkge1xuICAgIC8vIGBnZXRTZWxlY3RlZEluZGV4KClgIHNob3VsZCBiZSBoZXJlIChyYXRoZXIgdGhhbiBpbiBpbnN0cnVjdGlvbikgc28gdGhhdCBpdCBpcyBndWFyZGVkIGJ5IHRoZVxuICAgIC8vIGlmIHNvIGFzIG5vdCB0byByZWFkIHVubmVjZXNzYXJpbHkuXG4gICAgY29uc3QgdE5vZGUgPSB0Vmlldy5kYXRhW2dldFNlbGVjdGVkSW5kZXgoKV0gYXMgVE5vZGU7XG4gICAgaWYgKGhhc1N0eWxpbmdJbnB1dFNoYWRvdyh0Tm9kZSwgaXNDbGFzc0Jhc2VkKSAmJiAhaXNJbkhvc3RCaW5kaW5ncyh0VmlldywgYmluZGluZ0luZGV4KSkge1xuICAgICAgaWYgKG5nRGV2TW9kZSkge1xuICAgICAgICAvLyB2ZXJpZnkgdGhhdCBpZiB3ZSBhcmUgc2hhZG93aW5nIHRoZW4gYFREYXRhYCBpcyBhcHByb3ByaWF0ZWx5IG1hcmtlZCBzbyB0aGF0IHdlIHNraXBcbiAgICAgICAgLy8gcHJvY2Vzc2luZyB0aGlzIGJpbmRpbmcgaW4gc3R5bGluZyByZXNvbHV0aW9uLlxuICAgICAgICBjb25zdCB0U3R5bGluZ0tleSA9IHRWaWV3LmRhdGFbYmluZGluZ0luZGV4XTtcbiAgICAgICAgYXNzZXJ0RXF1YWwoXG4gICAgICAgICAgICBBcnJheS5pc0FycmF5KHRTdHlsaW5nS2V5KSA/IHRTdHlsaW5nS2V5WzFdIDogdFN0eWxpbmdLZXksIGZhbHNlLFxuICAgICAgICAgICAgJ1N0eWxpbmcgbGlua2VkIGxpc3Qgc2hhZG93IGlucHV0IHNob3VsZCBiZSBtYXJrZWQgYXMgXFwnZmFsc2VcXCcnKTtcbiAgICAgIH1cbiAgICAgIC8vIFZFIGRvZXMgbm90IGNvbmNhdGVuYXRlIHRoZSBzdGF0aWMgcG9ydGlvbiBsaWtlIHdlIGFyZSBkb2luZyBoZXJlLlxuICAgICAgLy8gSW5zdGVhZCBWRSBqdXN0IGlnbm9yZXMgdGhlIHN0YXRpYyBjb21wbGV0ZWx5IGlmIGR5bmFtaWMgYmluZGluZyBpcyBwcmVzZW50LlxuICAgICAgLy8gQmVjYXVzZSBvZiBsb2NhbGl0eSB3ZSBoYXZlIGFscmVhZHkgc2V0IHRoZSBzdGF0aWMgcG9ydGlvbiBiZWNhdXNlIHdlIGRvbid0IGtub3cgaWYgdGhlcmVcbiAgICAgIC8vIGlzIGEgZHluYW1pYyBwb3J0aW9uIHVudGlsIGxhdGVyLiBJZiB3ZSB3b3VsZCBpZ25vcmUgdGhlIHN0YXRpYyBwb3J0aW9uIGl0IHdvdWxkIGxvb2sgbGlrZVxuICAgICAgLy8gdGhlIGJpbmRpbmcgaGFzIHJlbW92ZWQgaXQuIFRoaXMgd291bGQgY29uZnVzZSBgW25nU3R5bGVdYC9gW25nQ2xhc3NdYCB0byBkbyB0aGUgd3JvbmdcbiAgICAgIC8vIHRoaW5nIGFzIGl0IHdvdWxkIHRoaW5rIHRoYXQgdGhlIHN0YXRpYyBwb3J0aW9uIHdhcyByZW1vdmVkLiBGb3IgdGhpcyByZWFzb24gd2VcbiAgICAgIC8vIGNvbmNhdGVuYXRlIGl0IHNvIHRoYXQgYFtuZ1N0eWxlXWAvYFtuZ0NsYXNzXWAgIGNhbiBjb250aW51ZSB0byB3b3JrIG9uIGNoYW5nZWQuXG4gICAgICBsZXQgc3RhdGljUHJlZml4ID0gaXNDbGFzc0Jhc2VkID8gdE5vZGUuY2xhc3Nlc1dpdGhvdXRIb3N0IDogdE5vZGUuc3R5bGVzV2l0aG91dEhvc3Q7XG4gICAgICBuZ0Rldk1vZGUgJiYgaXNDbGFzc0Jhc2VkID09PSBmYWxzZSAmJiBzdGF0aWNQcmVmaXggIT09IG51bGwgJiZcbiAgICAgICAgICBhc3NlcnRFcXVhbChcbiAgICAgICAgICAgICAgc3RhdGljUHJlZml4LmVuZHNXaXRoKCc7JyksIHRydWUsICdFeHBlY3Rpbmcgc3RhdGljIHBvcnRpb24gdG8gZW5kIHdpdGggXFwnO1xcJycpO1xuICAgICAgaWYgKHN0YXRpY1ByZWZpeCAhPT0gbnVsbCkge1xuICAgICAgICAvLyBXZSB3YW50IHRvIG1ha2Ugc3VyZSB0aGF0IGZhbHN5IHZhbHVlcyBvZiBgdmFsdWVgIGJlY29tZSBlbXB0eSBzdHJpbmdzLlxuICAgICAgICB2YWx1ZSA9IGNvbmNhdFN0cmluZ3NXaXRoU3BhY2Uoc3RhdGljUHJlZml4LCB2YWx1ZSA/IHZhbHVlIDogJycpO1xuICAgICAgfVxuICAgICAgLy8gR2l2ZW4gYDxkaXYgW3N0eWxlXSBteS1kaXI+YCBzdWNoIHRoYXQgYG15LWRpcmAgaGFzIGBASW5wdXQoJ3N0eWxlJylgLlxuICAgICAgLy8gVGhpcyB0YWtlcyBvdmVyIHRoZSBgW3N0eWxlXWAgYmluZGluZy4gKFNhbWUgZm9yIGBbY2xhc3NdYClcbiAgICAgIHNldERpcmVjdGl2ZUlucHV0c1doaWNoU2hhZG93c1N0eWxpbmcodFZpZXcsIHROb2RlLCBsVmlldywgdmFsdWUsIGlzQ2xhc3NCYXNlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVwZGF0ZVN0eWxpbmdNYXAoXG4gICAgICAgICAgdFZpZXcsIHROb2RlLCBsVmlldywgbFZpZXdbUkVOREVSRVJdLCBsVmlld1tiaW5kaW5nSW5kZXggKyAxXSxcbiAgICAgICAgICBsVmlld1tiaW5kaW5nSW5kZXggKyAxXSA9IHRvU3R5bGluZ0tleVZhbHVlQXJyYXkoa2V5VmFsdWVBcnJheVNldCwgc3RyaW5nUGFyc2VyLCB2YWx1ZSksXG4gICAgICAgICAgaXNDbGFzc0Jhc2VkLCBiaW5kaW5nSW5kZXgpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIERldGVybWluZXMgd2hlbiB0aGUgYmluZGluZyBpcyBpbiBgaG9zdEJpbmRpbmdzYCBzZWN0aW9uXG4gKlxuICogQHBhcmFtIHRWaWV3IEN1cnJlbnQgYFRWaWV3YFxuICogQHBhcmFtIGJpbmRpbmdJbmRleCBpbmRleCBvZiBiaW5kaW5nIHdoaWNoIHdlIHdvdWxkIGxpa2UgaWYgaXQgaXMgaW4gYGhvc3RCaW5kaW5nc2BcbiAqL1xuZnVuY3Rpb24gaXNJbkhvc3RCaW5kaW5ncyh0VmlldzogVFZpZXcsIGJpbmRpbmdJbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gIC8vIEFsbCBob3N0IGJpbmRpbmdzIGFyZSBwbGFjZWQgYWZ0ZXIgdGhlIGV4cGFuZG8gc2VjdGlvbi5cbiAgcmV0dXJuIGJpbmRpbmdJbmRleCA+PSB0Vmlldy5leHBhbmRvU3RhcnRJbmRleDtcbn1cblxuLyoqXG4gKiBDb2xsZWN0cyB0aGUgbmVjZXNzYXJ5IGluZm9ybWF0aW9uIHRvIGluc2VydCB0aGUgYmluZGluZyBpbnRvIGEgbGlua2VkIGxpc3Qgb2Ygc3R5bGUgYmluZGluZ3NcbiAqIHVzaW5nIGBpbnNlcnRUU3R5bGluZ0JpbmRpbmdgLlxuICpcbiAqIEBwYXJhbSB0VmlldyBgVFZpZXdgIHdoZXJlIHRoZSBiaW5kaW5nIGxpbmtlZCBsaXN0IHdpbGwgYmUgc3RvcmVkLlxuICogQHBhcmFtIHRTdHlsaW5nS2V5IFByb3BlcnR5L2tleSBvZiB0aGUgYmluZGluZy5cbiAqIEBwYXJhbSBiaW5kaW5nSW5kZXggSW5kZXggb2YgYmluZGluZyBhc3NvY2lhdGVkIHdpdGggdGhlIGBwcm9wYFxuICogQHBhcmFtIGlzQ2xhc3NCYXNlZCBgdHJ1ZWAgaWYgYGNsYXNzYCBjaGFuZ2UgKGBmYWxzZWAgaWYgYHN0eWxlYClcbiAqL1xuZnVuY3Rpb24gc3R5bGluZ0ZpcnN0VXBkYXRlUGFzcyhcbiAgICB0VmlldzogVFZpZXcsIHRTdHlsaW5nS2V5OiBUU3R5bGluZ0tleSwgYmluZGluZ0luZGV4OiBudW1iZXIsIGlzQ2xhc3NCYXNlZDogYm9vbGVhbik6IHZvaWQge1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0Rmlyc3RVcGRhdGVQYXNzKHRWaWV3KTtcbiAgY29uc3QgdERhdGEgPSB0Vmlldy5kYXRhO1xuICBpZiAodERhdGFbYmluZGluZ0luZGV4ICsgMV0gPT09IG51bGwpIHtcbiAgICAvLyBUaGUgYWJvdmUgY2hlY2sgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugd2UgZG9uJ3QgY2xlYXIgZmlyc3QgdXBkYXRlIHBhc3MgdW50aWwgZmlyc3Qgc3VjY2Vzc2Z1bFxuICAgIC8vIChubyBleGNlcHRpb24pIHRlbXBsYXRlIGV4ZWN1dGlvbi4gVGhpcyBwcmV2ZW50cyB0aGUgc3R5bGluZyBpbnN0cnVjdGlvbiBmcm9tIGRvdWJsZSBhZGRpbmdcbiAgICAvLyBpdHNlbGYgdG8gdGhlIGxpc3QuXG4gICAgLy8gYGdldFNlbGVjdGVkSW5kZXgoKWAgc2hvdWxkIGJlIGhlcmUgKHJhdGhlciB0aGFuIGluIGluc3RydWN0aW9uKSBzbyB0aGF0IGl0IGlzIGd1YXJkZWQgYnkgdGhlXG4gICAgLy8gaWYgc28gYXMgbm90IHRvIHJlYWQgdW5uZWNlc3NhcmlseS5cbiAgICBjb25zdCB0Tm9kZSA9IHREYXRhW2dldFNlbGVjdGVkSW5kZXgoKV0gYXMgVE5vZGU7XG4gICAgbmdEZXZNb2RlICYmIGFzc2VydERlZmluZWQodE5vZGUsICdUTm9kZSBleHBlY3RlZCcpO1xuICAgIGNvbnN0IGlzSG9zdEJpbmRpbmdzID0gaXNJbkhvc3RCaW5kaW5ncyh0VmlldywgYmluZGluZ0luZGV4KTtcbiAgICBpZiAoaGFzU3R5bGluZ0lucHV0U2hhZG93KHROb2RlLCBpc0NsYXNzQmFzZWQpICYmIHRTdHlsaW5nS2V5ID09PSBudWxsICYmICFpc0hvc3RCaW5kaW5ncykge1xuICAgICAgLy8gYHRTdHlsaW5nS2V5ID09PSBudWxsYCBpbXBsaWVzIHRoYXQgd2UgYXJlIGVpdGhlciBgW3N0eWxlXWAgb3IgYFtjbGFzc11gIGJpbmRpbmcuXG4gICAgICAvLyBJZiB0aGVyZSBpcyBhIGRpcmVjdGl2ZSB3aGljaCB1c2VzIGBASW5wdXQoJ3N0eWxlJylgIG9yIGBASW5wdXQoJ2NsYXNzJylgIHRoYW5cbiAgICAgIC8vIHdlIG5lZWQgdG8gbmV1dHJhbGl6ZSB0aGlzIGJpbmRpbmcgc2luY2UgdGhhdCBkaXJlY3RpdmUgaXMgc2hhZG93aW5nIGl0LlxuICAgICAgLy8gV2UgdHVybiB0aGlzIGludG8gYSBub29wIGJ5IHNldHRpbmcgdGhlIGtleSB0byBgZmFsc2VgXG4gICAgICB0U3R5bGluZ0tleSA9IGZhbHNlO1xuICAgIH1cbiAgICB0U3R5bGluZ0tleSA9IHdyYXBJblN0YXRpY1N0eWxpbmdLZXkodERhdGEsIHROb2RlLCB0U3R5bGluZ0tleSwgaXNDbGFzc0Jhc2VkKTtcbiAgICBpbnNlcnRUU3R5bGluZ0JpbmRpbmcodERhdGEsIHROb2RlLCB0U3R5bGluZ0tleSwgYmluZGluZ0luZGV4LCBpc0hvc3RCaW5kaW5ncywgaXNDbGFzc0Jhc2VkKTtcbiAgfVxufVxuXG4vKipcbiAqIEFkZHMgc3RhdGljIHN0eWxpbmcgaW5mb3JtYXRpb24gdG8gdGhlIGJpbmRpbmcgaWYgYXBwbGljYWJsZS5cbiAqXG4gKiBUaGUgbGlua2VkIGxpc3Qgb2Ygc3R5bGVzIG5vdCBvbmx5IHN0b3JlcyB0aGUgbGlzdCBhbmQga2V5cywgYnV0IGFsc28gc3RvcmVzIHN0YXRpYyBzdHlsaW5nXG4gKiBpbmZvcm1hdGlvbiBvbiBzb21lIG9mIHRoZSBrZXlzLiBUaGlzIGZ1bmN0aW9uIGRldGVybWluZXMgaWYgdGhlIGtleSBzaG91bGQgY29udGFpbiB0aGUgc3R5bGluZ1xuICogaW5mb3JtYXRpb24gYW5kIGNvbXB1dGVzIGl0LlxuICpcbiAqIFNlZSBgVFN0eWxpbmdTdGF0aWNgIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHBhcmFtIHREYXRhIGBURGF0YWAgd2hlcmUgdGhlIGxpbmtlZCBsaXN0IGlzIHN0b3JlZC5cbiAqIEBwYXJhbSB0Tm9kZSBgVE5vZGVgIGZvciB3aGljaCB0aGUgc3R5bGluZyBpcyBiZWluZyBjb21wdXRlZC5cbiAqIEBwYXJhbSBzdHlsaW5nS2V5IGBUU3R5bGluZ0tleVByaW1pdGl2ZWAgd2hpY2ggbWF5IG5lZWQgdG8gYmUgd3JhcHBlZCBpbnRvIGBUU3R5bGluZ0tleWBcbiAqIEBwYXJhbSBpc0NsYXNzQmFzZWQgYHRydWVgIGlmIGBjbGFzc2AgKGBmYWxzZWAgaWYgYHN0eWxlYClcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdyYXBJblN0YXRpY1N0eWxpbmdLZXkoXG4gICAgdERhdGE6IFREYXRhLCB0Tm9kZTogVE5vZGUsIHN0eWxpbmdLZXk6IFRTdHlsaW5nS2V5LCBpc0NsYXNzQmFzZWQ6IGJvb2xlYW4pOiBUU3R5bGluZ0tleSB7XG4gIGNvbnN0IGhvc3REaXJlY3RpdmVEZWYgPSBnZXRDdXJyZW50RGlyZWN0aXZlRGVmKHREYXRhKTtcbiAgbGV0IHJlc2lkdWFsID0gaXNDbGFzc0Jhc2VkID8gdE5vZGUucmVzaWR1YWxDbGFzc2VzIDogdE5vZGUucmVzaWR1YWxTdHlsZXM7XG4gIGlmIChob3N0RGlyZWN0aXZlRGVmID09PSBudWxsKSB7XG4gICAgLy8gV2UgYXJlIGluIHRlbXBsYXRlIG5vZGUuXG4gICAgLy8gSWYgdGVtcGxhdGUgbm9kZSBhbHJlYWR5IGhhZCBzdHlsaW5nIGluc3RydWN0aW9uIHRoZW4gaXQgaGFzIGFscmVhZHkgY29sbGVjdGVkIHRoZSBzdGF0aWNcbiAgICAvLyBzdHlsaW5nIGFuZCB0aGVyZSBpcyBubyBuZWVkIHRvIGNvbGxlY3QgdGhlbSBhZ2Fpbi4gV2Uga25vdyB0aGF0IHdlIGFyZSB0aGUgZmlyc3Qgc3R5bGluZ1xuICAgIC8vIGluc3RydWN0aW9uIGJlY2F1c2UgdGhlIGBUTm9kZS4qQmluZGluZ3NgIHBvaW50cyB0byAwIChub3RoaW5nIGhhcyBiZWVuIGluc2VydGVkIHlldCkuXG4gICAgY29uc3QgaXNGaXJzdFN0eWxpbmdJbnN0cnVjdGlvbkluVGVtcGxhdGUgPVxuICAgICAgICAoaXNDbGFzc0Jhc2VkID8gdE5vZGUuY2xhc3NCaW5kaW5ncyA6IHROb2RlLnN0eWxlQmluZGluZ3MpIGFzIGFueSBhcyBudW1iZXIgPT09IDA7XG4gICAgaWYgKGlzRmlyc3RTdHlsaW5nSW5zdHJ1Y3Rpb25JblRlbXBsYXRlKSB7XG4gICAgICAvLyBJdCB3b3VsZCBiZSBuaWNlIHRvIGJlIGFibGUgdG8gZ2V0IHRoZSBzdGF0aWNzIGZyb20gYG1lcmdlQXR0cnNgLCBob3dldmVyLCBhdCB0aGlzIHBvaW50XG4gICAgICAvLyB0aGV5IGFyZSBhbHJlYWR5IG1lcmdlZCBhbmQgaXQgd291bGQgbm90IGJlIHBvc3NpYmxlIHRvIGZpZ3VyZSB3aGljaCBwcm9wZXJ0eSBiZWxvbmdzIHdoZXJlXG4gICAgICAvLyBpbiB0aGUgcHJpb3JpdHkuXG4gICAgICBzdHlsaW5nS2V5ID0gY29sbGVjdFN0eWxpbmdGcm9tRGlyZWN0aXZlcyhudWxsLCB0RGF0YSwgdE5vZGUsIHN0eWxpbmdLZXksIGlzQ2xhc3NCYXNlZCk7XG4gICAgICBzdHlsaW5nS2V5ID0gY29sbGVjdFN0eWxpbmdGcm9tVEF0dHJzKHN0eWxpbmdLZXksIHROb2RlLmF0dHJzLCBpc0NsYXNzQmFzZWQpO1xuICAgICAgLy8gV2Uga25vdyB0aGF0IGlmIHdlIGhhdmUgc3R5bGluZyBiaW5kaW5nIGluIHRlbXBsYXRlIHdlIGNhbid0IGhhdmUgcmVzaWR1YWwuXG4gICAgICByZXNpZHVhbCA9IG51bGw7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIFdlIGFyZSBpbiBob3N0IGJpbmRpbmcgbm9kZSBhbmQgdGhlcmUgd2FzIG5vIGJpbmRpbmcgaW5zdHJ1Y3Rpb24gaW4gdGVtcGxhdGUgbm9kZS5cbiAgICAvLyBUaGlzIG1lYW5zIHRoYXQgd2UgbmVlZCB0byBjb21wdXRlIHRoZSByZXNpZHVhbC5cbiAgICBjb25zdCBkaXJlY3RpdmVTdHlsaW5nTGFzdCA9IHROb2RlLmRpcmVjdGl2ZVN0eWxpbmdMYXN0O1xuICAgIGNvbnN0IGlzRmlyc3RTdHlsaW5nSW5zdHJ1Y3Rpb25Jbkhvc3RCaW5kaW5nID1cbiAgICAgICAgZGlyZWN0aXZlU3R5bGluZ0xhc3QgPT09IC0xIHx8IHREYXRhW2RpcmVjdGl2ZVN0eWxpbmdMYXN0XSAhPT0gaG9zdERpcmVjdGl2ZURlZjtcbiAgICBpZiAoaXNGaXJzdFN0eWxpbmdJbnN0cnVjdGlvbkluSG9zdEJpbmRpbmcpIHtcbiAgICAgIHN0eWxpbmdLZXkgPVxuICAgICAgICAgIGNvbGxlY3RTdHlsaW5nRnJvbURpcmVjdGl2ZXMoaG9zdERpcmVjdGl2ZURlZiwgdERhdGEsIHROb2RlLCBzdHlsaW5nS2V5LCBpc0NsYXNzQmFzZWQpO1xuICAgICAgaWYgKHJlc2lkdWFsID09PSBudWxsKSB7XG4gICAgICAgIC8vIC0gSWYgYG51bGxgIHRoYW4gZWl0aGVyOlxuICAgICAgICAvLyAgICAtIFRlbXBsYXRlIHN0eWxpbmcgaW5zdHJ1Y3Rpb24gYWxyZWFkeSByYW4gYW5kIGl0IGhhcyBjb25zdW1lZCB0aGUgc3RhdGljXG4gICAgICAgIC8vICAgICAgc3R5bGluZyBpbnRvIGl0cyBgVFN0eWxpbmdLZXlgIGFuZCBzbyB0aGVyZSBpcyBubyBuZWVkIHRvIHVwZGF0ZSByZXNpZHVhbC4gSW5zdGVhZFxuICAgICAgICAvLyAgICAgIHdlIG5lZWQgdG8gdXBkYXRlIHRoZSBgVFN0eWxpbmdLZXlgIGFzc29jaWF0ZWQgd2l0aCB0aGUgZmlyc3QgdGVtcGxhdGUgbm9kZVxuICAgICAgICAvLyAgICAgIGluc3RydWN0aW9uLiBPUlxuICAgICAgICAvLyAgICAtIFNvbWUgb3RoZXIgc3R5bGluZyBpbnN0cnVjdGlvbiByYW4gYW5kIGRldGVybWluZWQgdGhhdCB0aGVyZSBhcmUgbm8gcmVzaWR1YWxzXG4gICAgICAgIGxldCB0ZW1wbGF0ZVN0eWxpbmdLZXkgPSBnZXRUZW1wbGF0ZUhlYWRUU3R5bGluZ0tleSh0RGF0YSwgdE5vZGUsIGlzQ2xhc3NCYXNlZCk7XG4gICAgICAgIGlmICh0ZW1wbGF0ZVN0eWxpbmdLZXkgIT09IHVuZGVmaW5lZCAmJiBBcnJheS5pc0FycmF5KHRlbXBsYXRlU3R5bGluZ0tleSkpIHtcbiAgICAgICAgICAvLyBPbmx5IHJlY29tcHV0ZSBpZiBgdGVtcGxhdGVTdHlsaW5nS2V5YCBoYWQgc3RhdGljIHZhbHVlcy4gKElmIG5vIHN0YXRpYyB2YWx1ZSBmb3VuZFxuICAgICAgICAgIC8vIHRoZW4gdGhlcmUgaXMgbm90aGluZyB0byBkbyBzaW5jZSB0aGlzIG9wZXJhdGlvbiBjYW4gb25seSBwcm9kdWNlIGxlc3Mgc3RhdGljIGtleXMsIG5vdFxuICAgICAgICAgIC8vIG1vcmUuKVxuICAgICAgICAgIHRlbXBsYXRlU3R5bGluZ0tleSA9IGNvbGxlY3RTdHlsaW5nRnJvbURpcmVjdGl2ZXMoXG4gICAgICAgICAgICAgIG51bGwsIHREYXRhLCB0Tm9kZSwgdGVtcGxhdGVTdHlsaW5nS2V5WzFdIC8qIHVud3JhcCBwcmV2aW91cyBzdGF0aWNzICovLFxuICAgICAgICAgICAgICBpc0NsYXNzQmFzZWQpO1xuICAgICAgICAgIHRlbXBsYXRlU3R5bGluZ0tleSA9XG4gICAgICAgICAgICAgIGNvbGxlY3RTdHlsaW5nRnJvbVRBdHRycyh0ZW1wbGF0ZVN0eWxpbmdLZXksIHROb2RlLmF0dHJzLCBpc0NsYXNzQmFzZWQpO1xuICAgICAgICAgIHNldFRlbXBsYXRlSGVhZFRTdHlsaW5nS2V5KHREYXRhLCB0Tm9kZSwgaXNDbGFzc0Jhc2VkLCB0ZW1wbGF0ZVN0eWxpbmdLZXkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBXZSBvbmx5IG5lZWQgdG8gcmVjb21wdXRlIHJlc2lkdWFsIGlmIGl0IGlzIG5vdCBgbnVsbGAuXG4gICAgICAgIC8vIC0gSWYgZXhpc3RpbmcgcmVzaWR1YWwgKGltcGxpZXMgdGhlcmUgd2FzIG5vIHRlbXBsYXRlIHN0eWxpbmcpLiBUaGlzIG1lYW5zIHRoYXQgc29tZSBvZlxuICAgICAgICAvLyAgIHRoZSBzdGF0aWNzIG1heSBoYXZlIG1vdmVkIGZyb20gdGhlIHJlc2lkdWFsIHRvIHRoZSBgc3R5bGluZ0tleWAgYW5kIHNvIHdlIGhhdmUgdG9cbiAgICAgICAgLy8gICByZWNvbXB1dGUuXG4gICAgICAgIC8vIC0gSWYgYHVuZGVmaW5lZGAgdGhpcyBpcyB0aGUgZmlyc3QgdGltZSB3ZSBhcmUgcnVubmluZy5cbiAgICAgICAgcmVzaWR1YWwgPSBjb2xsZWN0UmVzaWR1YWwodERhdGEsIHROb2RlLCBpc0NsYXNzQmFzZWQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAocmVzaWR1YWwgIT09IHVuZGVmaW5lZCkge1xuICAgIGlzQ2xhc3NCYXNlZCA/ICh0Tm9kZS5yZXNpZHVhbENsYXNzZXMgPSByZXNpZHVhbCkgOiAodE5vZGUucmVzaWR1YWxTdHlsZXMgPSByZXNpZHVhbCk7XG4gIH1cbiAgcmV0dXJuIHN0eWxpbmdLZXk7XG59XG5cbi8qKlxuICogUmV0cmlldmUgdGhlIGBUU3R5bGluZ0tleWAgZm9yIHRoZSB0ZW1wbGF0ZSBzdHlsaW5nIGluc3RydWN0aW9uLlxuICpcbiAqIFRoaXMgaXMgbmVlZGVkIHNpbmNlIGBob3N0QmluZGluZ2Agc3R5bGluZyBpbnN0cnVjdGlvbnMgYXJlIGluc2VydGVkIGFmdGVyIHRoZSB0ZW1wbGF0ZVxuICogaW5zdHJ1Y3Rpb24uIFdoaWxlIHRoZSB0ZW1wbGF0ZSBpbnN0cnVjdGlvbiBuZWVkcyB0byB1cGRhdGUgdGhlIHJlc2lkdWFsIGluIGBUTm9kZWAgdGhlXG4gKiBgaG9zdEJpbmRpbmdgIGluc3RydWN0aW9ucyBuZWVkIHRvIHVwZGF0ZSB0aGUgYFRTdHlsaW5nS2V5YCBvZiB0aGUgdGVtcGxhdGUgaW5zdHJ1Y3Rpb24gYmVjYXVzZVxuICogdGhlIHRlbXBsYXRlIGluc3RydWN0aW9uIGlzIGRvd25zdHJlYW0gZnJvbSB0aGUgYGhvc3RCaW5kaW5nc2AgaW5zdHJ1Y3Rpb25zLlxuICpcbiAqIEBwYXJhbSB0RGF0YSBgVERhdGFgIHdoZXJlIHRoZSBsaW5rZWQgbGlzdCBpcyBzdG9yZWQuXG4gKiBAcGFyYW0gdE5vZGUgYFROb2RlYCBmb3Igd2hpY2ggdGhlIHN0eWxpbmcgaXMgYmVpbmcgY29tcHV0ZWQuXG4gKiBAcGFyYW0gaXNDbGFzc0Jhc2VkIGB0cnVlYCBpZiBgY2xhc3NgIChgZmFsc2VgIGlmIGBzdHlsZWApXG4gKiBAcmV0dXJuIGBUU3R5bGluZ0tleWAgaWYgZm91bmQgb3IgYHVuZGVmaW5lZGAgaWYgbm90IGZvdW5kLlxuICovXG5mdW5jdGlvbiBnZXRUZW1wbGF0ZUhlYWRUU3R5bGluZ0tleSh0RGF0YTogVERhdGEsIHROb2RlOiBUTm9kZSwgaXNDbGFzc0Jhc2VkOiBib29sZWFuKTogVFN0eWxpbmdLZXl8XG4gICAgdW5kZWZpbmVkIHtcbiAgY29uc3QgYmluZGluZ3MgPSBpc0NsYXNzQmFzZWQgPyB0Tm9kZS5jbGFzc0JpbmRpbmdzIDogdE5vZGUuc3R5bGVCaW5kaW5ncztcbiAgaWYgKGdldFRTdHlsaW5nUmFuZ2VOZXh0KGJpbmRpbmdzKSA9PT0gMCkge1xuICAgIC8vIFRoZXJlIGRvZXMgbm90IHNlZW0gdG8gYmUgYSBzdHlsaW5nIGluc3RydWN0aW9uIGluIHRoZSBgdGVtcGxhdGVgLlxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgcmV0dXJuIHREYXRhW2dldFRTdHlsaW5nUmFuZ2VQcmV2KGJpbmRpbmdzKV0gYXMgVFN0eWxpbmdLZXk7XG59XG5cbi8qKlxuICogVXBkYXRlIHRoZSBgVFN0eWxpbmdLZXlgIG9mIHRoZSBmaXJzdCB0ZW1wbGF0ZSBpbnN0cnVjdGlvbiBpbiBgVE5vZGVgLlxuICpcbiAqIExvZ2ljYWxseSBgaG9zdEJpbmRpbmdzYCBzdHlsaW5nIGluc3RydWN0aW9ucyBhcmUgb2YgbG93ZXIgcHJpb3JpdHkgdGhhbiB0aGF0IG9mIHRoZSB0ZW1wbGF0ZS5cbiAqIEhvd2V2ZXIsIHRoZXkgZXhlY3V0ZSBhZnRlciB0aGUgdGVtcGxhdGUgc3R5bGluZyBpbnN0cnVjdGlvbnMuIFRoaXMgbWVhbnMgdGhhdCB0aGV5IGdldCBpbnNlcnRlZFxuICogaW4gZnJvbnQgb2YgdGhlIHRlbXBsYXRlIHN0eWxpbmcgaW5zdHJ1Y3Rpb25zLlxuICpcbiAqIElmIHdlIGhhdmUgYSB0ZW1wbGF0ZSBzdHlsaW5nIGluc3RydWN0aW9uIGFuZCBhIG5ldyBgaG9zdEJpbmRpbmdzYCBzdHlsaW5nIGluc3RydWN0aW9uIGlzXG4gKiBleGVjdXRlZCBpdCBtZWFucyB0aGF0IGl0IG1heSBuZWVkIHRvIHN0ZWFsIHN0YXRpYyBmaWVsZHMgZnJvbSB0aGUgdGVtcGxhdGUgaW5zdHJ1Y3Rpb24uIFRoaXNcbiAqIG1ldGhvZCBhbGxvd3MgdXMgdG8gdXBkYXRlIHRoZSBmaXJzdCB0ZW1wbGF0ZSBpbnN0cnVjdGlvbiBgVFN0eWxpbmdLZXlgIHdpdGggYSBuZXcgdmFsdWUuXG4gKlxuICogQXNzdW1lOlxuICogYGBgXG4gKiA8ZGl2IG15LWRpciBzdHlsZT1cImNvbG9yOiByZWRcIiBbc3R5bGUuY29sb3JdPVwidG1wbEV4cFwiPjwvZGl2PlxuICpcbiAqIEBEaXJlY3RpdmUoe1xuICogICBob3N0OiB7XG4gKiAgICAgJ3N0eWxlJzogJ3dpZHRoOiAxMDBweCcsXG4gKiAgICAgJ1tzdHlsZS5jb2xvcl0nOiAnZGlyRXhwJyxcbiAqICAgfVxuICogfSlcbiAqIGNsYXNzIE15RGlyIHt9XG4gKiBgYGBcbiAqXG4gKiB3aGVuIGBbc3R5bGUuY29sb3JdPVwidG1wbEV4cFwiYCBleGVjdXRlcyBpdCBjcmVhdGVzIHRoaXMgZGF0YSBzdHJ1Y3R1cmUuXG4gKiBgYGBcbiAqICBbJycsICdjb2xvcicsICdjb2xvcicsICdyZWQnLCAnd2lkdGgnLCAnMTAwcHgnXSxcbiAqIGBgYFxuICpcbiAqIFRoZSByZWFzb24gZm9yIHRoaXMgaXMgdGhhdCB0aGUgdGVtcGxhdGUgaW5zdHJ1Y3Rpb24gZG9lcyBub3Qga25vdyBpZiB0aGVyZSBhcmUgc3R5bGluZ1xuICogaW5zdHJ1Y3Rpb25zIGFuZCBtdXN0IGFzc3VtZSB0aGF0IHRoZXJlIGFyZSBub25lIGFuZCBtdXN0IGNvbGxlY3QgYWxsIG9mIHRoZSBzdGF0aWMgc3R5bGluZy5cbiAqIChib3RoXG4gKiBgY29sb3InIGFuZCAnd2lkdGhgKVxuICpcbiAqIFdoZW4gYCdbc3R5bGUuY29sb3JdJzogJ2RpckV4cCcsYCBleGVjdXRlcyB3ZSBuZWVkIHRvIGluc2VydCBhIG5ldyBkYXRhIGludG8gdGhlIGxpbmtlZCBsaXN0LlxuICogYGBgXG4gKiAgWycnLCAnY29sb3InLCAnd2lkdGgnLCAnMTAwcHgnXSwgIC8vIG5ld2x5IGluc2VydGVkXG4gKiAgWycnLCAnY29sb3InLCAnY29sb3InLCAncmVkJywgJ3dpZHRoJywgJzEwMHB4J10sIC8vIHRoaXMgaXMgd3JvbmdcbiAqIGBgYFxuICpcbiAqIE5vdGljZSB0aGF0IHRoZSB0ZW1wbGF0ZSBzdGF0aWNzIGlzIG5vdyB3cm9uZyBhcyBpdCBpbmNvcnJlY3RseSBjb250YWlucyBgd2lkdGhgIHNvIHdlIG5lZWQgdG9cbiAqIHVwZGF0ZSBpdCBsaWtlIHNvOlxuICogYGBgXG4gKiAgWycnLCAnY29sb3InLCAnd2lkdGgnLCAnMTAwcHgnXSxcbiAqICBbJycsICdjb2xvcicsICdjb2xvcicsICdyZWQnXSwgICAgLy8gVVBEQVRFXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gdERhdGEgYFREYXRhYCB3aGVyZSB0aGUgbGlua2VkIGxpc3QgaXMgc3RvcmVkLlxuICogQHBhcmFtIHROb2RlIGBUTm9kZWAgZm9yIHdoaWNoIHRoZSBzdHlsaW5nIGlzIGJlaW5nIGNvbXB1dGVkLlxuICogQHBhcmFtIGlzQ2xhc3NCYXNlZCBgdHJ1ZWAgaWYgYGNsYXNzYCAoYGZhbHNlYCBpZiBgc3R5bGVgKVxuICogQHBhcmFtIHRTdHlsaW5nS2V5IE5ldyBgVFN0eWxpbmdLZXlgIHdoaWNoIGlzIHJlcGxhY2luZyB0aGUgb2xkIG9uZS5cbiAqL1xuZnVuY3Rpb24gc2V0VGVtcGxhdGVIZWFkVFN0eWxpbmdLZXkoXG4gICAgdERhdGE6IFREYXRhLCB0Tm9kZTogVE5vZGUsIGlzQ2xhc3NCYXNlZDogYm9vbGVhbiwgdFN0eWxpbmdLZXk6IFRTdHlsaW5nS2V5KTogdm9pZCB7XG4gIGNvbnN0IGJpbmRpbmdzID0gaXNDbGFzc0Jhc2VkID8gdE5vZGUuY2xhc3NCaW5kaW5ncyA6IHROb2RlLnN0eWxlQmluZGluZ3M7XG4gIG5nRGV2TW9kZSAmJlxuICAgICAgYXNzZXJ0Tm90RXF1YWwoXG4gICAgICAgICAgZ2V0VFN0eWxpbmdSYW5nZU5leHQoYmluZGluZ3MpLCAwLFxuICAgICAgICAgICdFeHBlY3RpbmcgdG8gaGF2ZSBhdCBsZWFzdCBvbmUgdGVtcGxhdGUgc3R5bGluZyBiaW5kaW5nLicpO1xuICB0RGF0YVtnZXRUU3R5bGluZ1JhbmdlUHJldihiaW5kaW5ncyldID0gdFN0eWxpbmdLZXk7XG59XG5cbi8qKlxuICogQ29sbGVjdCBhbGwgc3RhdGljIHZhbHVlcyBhZnRlciB0aGUgY3VycmVudCBgVE5vZGUuZGlyZWN0aXZlU3R5bGluZ0xhc3RgIGluZGV4LlxuICpcbiAqIENvbGxlY3QgdGhlIHJlbWFpbmluZyBzdHlsaW5nIGluZm9ybWF0aW9uIHdoaWNoIGhhcyBub3QgeWV0IGJlZW4gY29sbGVjdGVkIGJ5IGFuIGV4aXN0aW5nXG4gKiBzdHlsaW5nIGluc3RydWN0aW9uLlxuICpcbiAqIEBwYXJhbSB0RGF0YSBgVERhdGFgIHdoZXJlIHRoZSBgRGlyZWN0aXZlRGVmc2AgYXJlIHN0b3JlZC5cbiAqIEBwYXJhbSB0Tm9kZSBgVE5vZGVgIHdoaWNoIGNvbnRhaW5zIHRoZSBkaXJlY3RpdmUgcmFuZ2UuXG4gKiBAcGFyYW0gaXNDbGFzc0Jhc2VkIGB0cnVlYCBpZiBgY2xhc3NgIChgZmFsc2VgIGlmIGBzdHlsZWApXG4gKi9cbmZ1bmN0aW9uIGNvbGxlY3RSZXNpZHVhbCh0RGF0YTogVERhdGEsIHROb2RlOiBUTm9kZSwgaXNDbGFzc0Jhc2VkOiBib29sZWFuKTogS2V5VmFsdWVBcnJheTxhbnk+fFxuICAgIG51bGwge1xuICBsZXQgcmVzaWR1YWw6IEtleVZhbHVlQXJyYXk8YW55PnxudWxsfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgY29uc3QgZGlyZWN0aXZlRW5kID0gdE5vZGUuZGlyZWN0aXZlRW5kO1xuICBuZ0Rldk1vZGUgJiZcbiAgICAgIGFzc2VydE5vdEVxdWFsKFxuICAgICAgICAgIHROb2RlLmRpcmVjdGl2ZVN0eWxpbmdMYXN0LCAtMSxcbiAgICAgICAgICAnQnkgdGhlIHRpbWUgdGhpcyBmdW5jdGlvbiBnZXRzIGNhbGxlZCBhdCBsZWFzdCBvbmUgaG9zdEJpbmRpbmdzLW5vZGUgc3R5bGluZyBpbnN0cnVjdGlvbiBtdXN0IGhhdmUgZXhlY3V0ZWQuJyk7XG4gIC8vIFdlIGFkZCBgMSArIHROb2RlLmRpcmVjdGl2ZVN0YXJ0YCBiZWNhdXNlIHdlIG5lZWQgdG8gc2tpcCB0aGUgY3VycmVudCBkaXJlY3RpdmUgKGFzIHdlIGFyZVxuICAvLyBjb2xsZWN0aW5nIHRoaW5ncyBhZnRlciB0aGUgbGFzdCBgaG9zdEJpbmRpbmdzYCBkaXJlY3RpdmUgd2hpY2ggaGFkIGEgc3R5bGluZyBpbnN0cnVjdGlvbi4pXG4gIGZvciAobGV0IGkgPSAxICsgdE5vZGUuZGlyZWN0aXZlU3R5bGluZ0xhc3Q7IGkgPCBkaXJlY3RpdmVFbmQ7IGkrKykge1xuICAgIGNvbnN0IGF0dHJzID0gKHREYXRhW2ldIGFzIERpcmVjdGl2ZURlZjxhbnk+KS5ob3N0QXR0cnM7XG4gICAgcmVzaWR1YWwgPSBjb2xsZWN0U3R5bGluZ0Zyb21UQXR0cnMocmVzaWR1YWwsIGF0dHJzLCBpc0NsYXNzQmFzZWQpIGFzIEtleVZhbHVlQXJyYXk8YW55PnwgbnVsbDtcbiAgfVxuICByZXR1cm4gY29sbGVjdFN0eWxpbmdGcm9tVEF0dHJzKHJlc2lkdWFsLCB0Tm9kZS5hdHRycywgaXNDbGFzc0Jhc2VkKSBhcyBLZXlWYWx1ZUFycmF5PGFueT58IG51bGw7XG59XG5cbi8qKlxuICogQ29sbGVjdCB0aGUgc3RhdGljIHN0eWxpbmcgaW5mb3JtYXRpb24gd2l0aCBsb3dlciBwcmlvcml0eSB0aGFuIGBob3N0RGlyZWN0aXZlRGVmYC5cbiAqXG4gKiAoVGhpcyBpcyBvcHBvc2l0ZSBvZiByZXNpZHVhbCBzdHlsaW5nLilcbiAqXG4gKiBAcGFyYW0gaG9zdERpcmVjdGl2ZURlZiBgRGlyZWN0aXZlRGVmYCBmb3Igd2hpY2ggd2Ugd2FudCB0byBjb2xsZWN0IGxvd2VyIHByaW9yaXR5IHN0YXRpY1xuICogICAgICAgIHN0eWxpbmcuIChPciBgbnVsbGAgaWYgdGVtcGxhdGUgc3R5bGluZylcbiAqIEBwYXJhbSB0RGF0YSBgVERhdGFgIHdoZXJlIHRoZSBsaW5rZWQgbGlzdCBpcyBzdG9yZWQuXG4gKiBAcGFyYW0gdE5vZGUgYFROb2RlYCBmb3Igd2hpY2ggdGhlIHN0eWxpbmcgaXMgYmVpbmcgY29tcHV0ZWQuXG4gKiBAcGFyYW0gc3R5bGluZ0tleSBFeGlzdGluZyBgVFN0eWxpbmdLZXlgIHRvIHVwZGF0ZSBvciB3cmFwLlxuICogQHBhcmFtIGlzQ2xhc3NCYXNlZCBgdHJ1ZWAgaWYgYGNsYXNzYCAoYGZhbHNlYCBpZiBgc3R5bGVgKVxuICovXG5mdW5jdGlvbiBjb2xsZWN0U3R5bGluZ0Zyb21EaXJlY3RpdmVzKFxuICAgIGhvc3REaXJlY3RpdmVEZWY6IERpcmVjdGl2ZURlZjxhbnk+fG51bGwsIHREYXRhOiBURGF0YSwgdE5vZGU6IFROb2RlLCBzdHlsaW5nS2V5OiBUU3R5bGluZ0tleSxcbiAgICBpc0NsYXNzQmFzZWQ6IGJvb2xlYW4pOiBUU3R5bGluZ0tleSB7XG4gIC8vIFdlIG5lZWQgdG8gbG9vcCBiZWNhdXNlIHRoZXJlIGNhbiBiZSBkaXJlY3RpdmVzIHdoaWNoIGhhdmUgYGhvc3RBdHRyc2AgYnV0IGRvbid0IGhhdmVcbiAgLy8gYGhvc3RCaW5kaW5nc2Agc28gdGhpcyBsb29wIGNhdGNoZXMgdXAgdG8gdGhlIGN1cnJlbnQgZGlyZWN0aXZlLi5cbiAgbGV0IGN1cnJlbnREaXJlY3RpdmU6IERpcmVjdGl2ZURlZjxhbnk+fG51bGwgPSBudWxsO1xuICBjb25zdCBkaXJlY3RpdmVFbmQgPSB0Tm9kZS5kaXJlY3RpdmVFbmQ7XG4gIGxldCBkaXJlY3RpdmVTdHlsaW5nTGFzdCA9IHROb2RlLmRpcmVjdGl2ZVN0eWxpbmdMYXN0O1xuICBpZiAoZGlyZWN0aXZlU3R5bGluZ0xhc3QgPT09IC0xKSB7XG4gICAgZGlyZWN0aXZlU3R5bGluZ0xhc3QgPSB0Tm9kZS5kaXJlY3RpdmVTdGFydDtcbiAgfSBlbHNlIHtcbiAgICBkaXJlY3RpdmVTdHlsaW5nTGFzdCsrO1xuICB9XG4gIHdoaWxlIChkaXJlY3RpdmVTdHlsaW5nTGFzdCA8IGRpcmVjdGl2ZUVuZCkge1xuICAgIGN1cnJlbnREaXJlY3RpdmUgPSB0RGF0YVtkaXJlY3RpdmVTdHlsaW5nTGFzdF0gYXMgRGlyZWN0aXZlRGVmPGFueT47XG4gICAgbmdEZXZNb2RlICYmIGFzc2VydERlZmluZWQoY3VycmVudERpcmVjdGl2ZSwgJ2V4cGVjdGVkIHRvIGJlIGRlZmluZWQnKTtcbiAgICBzdHlsaW5nS2V5ID0gY29sbGVjdFN0eWxpbmdGcm9tVEF0dHJzKHN0eWxpbmdLZXksIGN1cnJlbnREaXJlY3RpdmUuaG9zdEF0dHJzLCBpc0NsYXNzQmFzZWQpO1xuICAgIGlmIChjdXJyZW50RGlyZWN0aXZlID09PSBob3N0RGlyZWN0aXZlRGVmKSBicmVhaztcbiAgICBkaXJlY3RpdmVTdHlsaW5nTGFzdCsrO1xuICB9XG4gIGlmIChob3N0RGlyZWN0aXZlRGVmICE9PSBudWxsKSB7XG4gICAgLy8gd2Ugb25seSBhZHZhbmNlIHRoZSBzdHlsaW5nIGN1cnNvciBpZiB3ZSBhcmUgY29sbGVjdGluZyBkYXRhIGZyb20gaG9zdCBiaW5kaW5ncy5cbiAgICAvLyBUZW1wbGF0ZSBleGVjdXRlcyBiZWZvcmUgaG9zdCBiaW5kaW5ncyBhbmQgc28gaWYgd2Ugd291bGQgdXBkYXRlIHRoZSBpbmRleCxcbiAgICAvLyBob3N0IGJpbmRpbmdzIHdvdWxkIG5vdCBnZXQgdGhlaXIgc3RhdGljcy5cbiAgICB0Tm9kZS5kaXJlY3RpdmVTdHlsaW5nTGFzdCA9IGRpcmVjdGl2ZVN0eWxpbmdMYXN0O1xuICB9XG4gIHJldHVybiBzdHlsaW5nS2V5O1xufVxuXG4vKipcbiAqIENvbnZlcnQgYFRBdHRyc2AgaW50byBgVFN0eWxpbmdTdGF0aWNgLlxuICpcbiAqIEBwYXJhbSBzdHlsaW5nS2V5IGV4aXN0aW5nIGBUU3R5bGluZ0tleWAgdG8gdXBkYXRlIG9yIHdyYXAuXG4gKiBAcGFyYW0gYXR0cnMgYFRBdHRyaWJ1dGVzYCB0byBwcm9jZXNzLlxuICogQHBhcmFtIGlzQ2xhc3NCYXNlZCBgdHJ1ZWAgaWYgYGNsYXNzYCAoYGZhbHNlYCBpZiBgc3R5bGVgKVxuICovXG5mdW5jdGlvbiBjb2xsZWN0U3R5bGluZ0Zyb21UQXR0cnMoXG4gICAgc3R5bGluZ0tleTogVFN0eWxpbmdLZXl8dW5kZWZpbmVkLCBhdHRyczogVEF0dHJpYnV0ZXN8bnVsbCxcbiAgICBpc0NsYXNzQmFzZWQ6IGJvb2xlYW4pOiBUU3R5bGluZ0tleSB7XG4gIGNvbnN0IGRlc2lyZWRNYXJrZXIgPSBpc0NsYXNzQmFzZWQgPyBBdHRyaWJ1dGVNYXJrZXIuQ2xhc3NlcyA6IEF0dHJpYnV0ZU1hcmtlci5TdHlsZXM7XG4gIGxldCBjdXJyZW50TWFya2VyID0gQXR0cmlidXRlTWFya2VyLkltcGxpY2l0QXR0cmlidXRlcztcbiAgaWYgKGF0dHJzICE9PSBudWxsKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdHRycy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgaXRlbSA9IGF0dHJzW2ldIGFzIG51bWJlciB8IHN0cmluZztcbiAgICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgY3VycmVudE1hcmtlciA9IGl0ZW07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoY3VycmVudE1hcmtlciA9PT0gZGVzaXJlZE1hcmtlcikge1xuICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShzdHlsaW5nS2V5KSkge1xuICAgICAgICAgICAgc3R5bGluZ0tleSA9IHN0eWxpbmdLZXkgPT09IHVuZGVmaW5lZCA/IFtdIDogWycnLCBzdHlsaW5nS2V5XSBhcyBhbnk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGtleVZhbHVlQXJyYXlTZXQoXG4gICAgICAgICAgICAgIHN0eWxpbmdLZXkgYXMgS2V5VmFsdWVBcnJheTxhbnk+LCBpdGVtLCBpc0NsYXNzQmFzZWQgPyB0cnVlIDogYXR0cnNbKytpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0eWxpbmdLZXkgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBzdHlsaW5nS2V5O1xufVxuXG4vKipcbiAqIENvbnZlcnQgdXNlciBpbnB1dCB0byBgS2V5VmFsdWVBcnJheWAuXG4gKlxuICogVGhpcyBmdW5jdGlvbiB0YWtlcyB1c2VyIGlucHV0IHdoaWNoIGNvdWxkIGJlIGBzdHJpbmdgLCBPYmplY3QgbGl0ZXJhbCwgb3IgaXRlcmFibGUgYW5kIGNvbnZlcnRzXG4gKiBpdCBpbnRvIGEgY29uc2lzdGVudCByZXByZXNlbnRhdGlvbi4gVGhlIG91dHB1dCBvZiB0aGlzIGlzIGBLZXlWYWx1ZUFycmF5YCAod2hpY2ggaXMgYW4gYXJyYXlcbiAqIHdoZXJlXG4gKiBldmVuIGluZGV4ZXMgY29udGFpbiBrZXlzIGFuZCBvZGQgaW5kZXhlcyBjb250YWluIHZhbHVlcyBmb3IgdGhvc2Uga2V5cykuXG4gKlxuICogVGhlIGFkdmFudGFnZSBvZiBjb252ZXJ0aW5nIHRvIGBLZXlWYWx1ZUFycmF5YCBpcyB0aGF0IHdlIGNhbiBwZXJmb3JtIGRpZmYgaW4gYW4gaW5wdXRcbiAqIGluZGVwZW5kZW50XG4gKiB3YXkuXG4gKiAoaWUgd2UgY2FuIGNvbXBhcmUgYGZvbyBiYXJgIHRvIGBbJ2JhcicsICdiYXonXSBhbmQgZGV0ZXJtaW5lIGEgc2V0IG9mIGNoYW5nZXMgd2hpY2ggbmVlZCB0byBiZVxuICogYXBwbGllZClcbiAqXG4gKiBUaGUgZmFjdCB0aGF0IGBLZXlWYWx1ZUFycmF5YCBpcyBzb3J0ZWQgaXMgdmVyeSBpbXBvcnRhbnQgYmVjYXVzZSBpdCBhbGxvd3MgdXMgdG8gY29tcHV0ZSB0aGVcbiAqIGRpZmZlcmVuY2UgaW4gbGluZWFyIGZhc2hpb24gd2l0aG91dCB0aGUgbmVlZCB0byBhbGxvY2F0ZSBhbnkgYWRkaXRpb25hbCBkYXRhLlxuICpcbiAqIEZvciBleGFtcGxlIGlmIHdlIGtlcHQgdGhpcyBhcyBhIGBNYXBgIHdlIHdvdWxkIGhhdmUgdG8gaXRlcmF0ZSBvdmVyIHByZXZpb3VzIGBNYXBgIHRvIGRldGVybWluZVxuICogd2hpY2ggdmFsdWVzIG5lZWQgdG8gYmUgZGVsZXRlZCwgb3ZlciB0aGUgbmV3IGBNYXBgIHRvIGRldGVybWluZSBhZGRpdGlvbnMsIGFuZCB3ZSB3b3VsZCBoYXZlIHRvXG4gKiBrZWVwIGFkZGl0aW9uYWwgYE1hcGAgdG8ga2VlcCB0cmFjayBvZiBkdXBsaWNhdGVzIG9yIGl0ZW1zIHdoaWNoIGhhdmUgbm90IHlldCBiZWVuIHZpc2l0ZWQuXG4gKlxuICogQHBhcmFtIGtleVZhbHVlQXJyYXlTZXQgKFNlZSBga2V5VmFsdWVBcnJheVNldGAgaW4gXCJ1dGlsL2FycmF5X3V0aWxzXCIpIEdldHMgcGFzc2VkIGluIGFzIGFcbiAqICAgICAgICBmdW5jdGlvbiBzbyB0aGF0IGBzdHlsZWAgY2FuIGJlIHByb2Nlc3NlZC4gVGhpcyBpcyBkb25lXG4gKiAgICAgICAgZm9yIHRyZWUgc2hha2luZyBwdXJwb3Nlcy5cbiAqIEBwYXJhbSBzdHJpbmdQYXJzZXIgVGhlIHBhcnNlciBpcyBwYXNzZWQgaW4gc28gdGhhdCBpdCB3aWxsIGJlIHRyZWUgc2hha2FibGUuIFNlZVxuICogICAgICAgIGBzdHlsZVN0cmluZ1BhcnNlcmAgYW5kIGBjbGFzc1N0cmluZ1BhcnNlcmBcbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gcGFyc2UvY29udmVydCB0byBgS2V5VmFsdWVBcnJheWBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvU3R5bGluZ0tleVZhbHVlQXJyYXkoXG4gICAga2V5VmFsdWVBcnJheVNldDogKGtleVZhbHVlQXJyYXk6IEtleVZhbHVlQXJyYXk8YW55Piwga2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpID0+IHZvaWQsXG4gICAgc3RyaW5nUGFyc2VyOiAoc3R5bGVLZXlWYWx1ZUFycmF5OiBLZXlWYWx1ZUFycmF5PGFueT4sIHRleHQ6IHN0cmluZykgPT4gdm9pZCxcbiAgICB2YWx1ZTogc3RyaW5nfHN0cmluZ1tdfHtba2V5OiBzdHJpbmddOiBhbnl9fFNhZmVWYWx1ZXxudWxsfHVuZGVmaW5lZCk6IEtleVZhbHVlQXJyYXk8YW55PiB7XG4gIGlmICh2YWx1ZSA9PSBudWxsIC8qfHwgdmFsdWUgPT09IHVuZGVmaW5lZCAqLyB8fCB2YWx1ZSA9PT0gJycpIHJldHVybiBFTVBUWV9BUlJBWSBhcyBhbnk7XG4gIGNvbnN0IHN0eWxlS2V5VmFsdWVBcnJheTogS2V5VmFsdWVBcnJheTxhbnk+ID0gW10gYXMgYW55O1xuICBjb25zdCB1bndyYXBwZWRWYWx1ZSA9IHVud3JhcFNhZmVWYWx1ZSh2YWx1ZSkgYXMgc3RyaW5nIHwgc3RyaW5nW10gfCB7W2tleTogc3RyaW5nXTogYW55fTtcbiAgaWYgKEFycmF5LmlzQXJyYXkodW53cmFwcGVkVmFsdWUpKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB1bndyYXBwZWRWYWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAga2V5VmFsdWVBcnJheVNldChzdHlsZUtleVZhbHVlQXJyYXksIHVud3JhcHBlZFZhbHVlW2ldLCB0cnVlKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIHVud3JhcHBlZFZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgIGZvciAoY29uc3Qga2V5IGluIHVud3JhcHBlZFZhbHVlKSB7XG4gICAgICBpZiAodW53cmFwcGVkVmFsdWUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBrZXlWYWx1ZUFycmF5U2V0KHN0eWxlS2V5VmFsdWVBcnJheSwga2V5LCB1bndyYXBwZWRWYWx1ZVtrZXldKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIHVud3JhcHBlZFZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHN0cmluZ1BhcnNlcihzdHlsZUtleVZhbHVlQXJyYXksIHVud3JhcHBlZFZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBuZ0Rldk1vZGUgJiZcbiAgICAgICAgdGhyb3dFcnJvcignVW5zdXBwb3J0ZWQgc3R5bGluZyB0eXBlICcgKyB0eXBlb2YgdW53cmFwcGVkVmFsdWUgKyAnOiAnICsgdW53cmFwcGVkVmFsdWUpO1xuICB9XG4gIHJldHVybiBzdHlsZUtleVZhbHVlQXJyYXk7XG59XG5cbi8qKlxuICogU2V0IGEgYHZhbHVlYCBmb3IgYSBga2V5YC5cbiAqXG4gKiBTZWU6IGBrZXlWYWx1ZUFycmF5U2V0YCBmb3IgZGV0YWlsc1xuICpcbiAqIEBwYXJhbSBrZXlWYWx1ZUFycmF5IEtleVZhbHVlQXJyYXkgdG8gYWRkIHRvLlxuICogQHBhcmFtIGtleSBTdHlsZSBrZXkgdG8gYWRkLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHlsZUtleVZhbHVlQXJyYXlTZXQoa2V5VmFsdWVBcnJheTogS2V5VmFsdWVBcnJheTxhbnk+LCBrZXk6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICBrZXlWYWx1ZUFycmF5U2V0KGtleVZhbHVlQXJyYXksIGtleSwgdW53cmFwU2FmZVZhbHVlKHZhbHVlKSk7XG59XG5cbi8qKlxuICogQ2xhc3MtYmluZGluZy1zcGVjaWZpYyBmdW5jdGlvbiBmb3Igc2V0dGluZyB0aGUgYHZhbHVlYCBmb3IgYSBga2V5YC5cbiAqXG4gKiBTZWU6IGBrZXlWYWx1ZUFycmF5U2V0YCBmb3IgZGV0YWlsc1xuICpcbiAqIEBwYXJhbSBrZXlWYWx1ZUFycmF5IEtleVZhbHVlQXJyYXkgdG8gYWRkIHRvLlxuICogQHBhcmFtIGtleSBTdHlsZSBrZXkgdG8gYWRkLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGFzc0tleVZhbHVlQXJyYXlTZXQoa2V5VmFsdWVBcnJheTogS2V5VmFsdWVBcnJheTxhbnk+LCBrZXk6IHVua25vd24sIHZhbHVlOiBhbnkpIHtcbiAgLy8gV2UgdXNlIGBjbGFzc0xpc3QuYWRkYCB0byBldmVudHVhbGx5IGFkZCB0aGUgQ1NTIGNsYXNzZXMgdG8gdGhlIERPTSBub2RlLiBBbnkgdmFsdWUgcGFzc2VkIGludG9cbiAgLy8gYGFkZGAgaXMgc3RyaW5naWZpZWQgYW5kIGFkZGVkIHRvIHRoZSBgY2xhc3NgIGF0dHJpYnV0ZSwgZS5nLiBldmVuIG51bGwsIHVuZGVmaW5lZCBvciBudW1iZXJzXG4gIC8vIHdpbGwgYmUgYWRkZWQuIFN0cmluZ2lmeSB0aGUga2V5IGhlcmUgc28gdGhhdCBvdXIgaW50ZXJuYWwgZGF0YSBzdHJ1Y3R1cmUgbWF0Y2hlcyB0aGUgdmFsdWUgaW5cbiAgLy8gdGhlIERPTS4gVGhlIG9ubHkgZXhjZXB0aW9ucyBhcmUgZW1wdHkgc3RyaW5ncyBhbmQgc3RyaW5ncyB0aGF0IGNvbnRhaW4gc3BhY2VzIGZvciB3aGljaFxuICAvLyB0aGUgYnJvd3NlciB0aHJvd3MgYW4gZXJyb3IuIFdlIGlnbm9yZSBzdWNoIHZhbHVlcywgYmVjYXVzZSB0aGUgZXJyb3IgaXMgc29tZXdoYXQgY3J5cHRpYy5cbiAgY29uc3Qgc3RyaW5nS2V5ID0gU3RyaW5nKGtleSk7XG4gIGlmIChzdHJpbmdLZXkgIT09ICcnICYmICFzdHJpbmdLZXkuaW5jbHVkZXMoJyAnKSkge1xuICAgIGtleVZhbHVlQXJyYXlTZXQoa2V5VmFsdWVBcnJheSwgc3RyaW5nS2V5LCB2YWx1ZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBVcGRhdGUgbWFwIGJhc2VkIHN0eWxpbmcuXG4gKlxuICogTWFwIGJhc2VkIHN0eWxpbmcgY291bGQgYmUgYW55dGhpbmcgd2hpY2ggY29udGFpbnMgbW9yZSB0aGFuIG9uZSBiaW5kaW5nLiBGb3IgZXhhbXBsZSBgc3RyaW5nYCxcbiAqIG9yIG9iamVjdCBsaXRlcmFsLiBEZWFsaW5nIHdpdGggYWxsIG9mIHRoZXNlIHR5cGVzIHdvdWxkIGNvbXBsaWNhdGUgdGhlIGxvZ2ljIHNvXG4gKiBpbnN0ZWFkIHRoaXMgZnVuY3Rpb24gZXhwZWN0cyB0aGF0IHRoZSBjb21wbGV4IGlucHV0IGlzIGZpcnN0IGNvbnZlcnRlZCBpbnRvIG5vcm1hbGl6ZWRcbiAqIGBLZXlWYWx1ZUFycmF5YC4gVGhlIGFkdmFudGFnZSBvZiBub3JtYWxpemF0aW9uIGlzIHRoYXQgd2UgZ2V0IHRoZSB2YWx1ZXMgc29ydGVkLCB3aGljaCBtYWtlcyBpdFxuICogdmVyeSBjaGVhcCB0byBjb21wdXRlIGRlbHRhcyBiZXR3ZWVuIHRoZSBwcmV2aW91cyBhbmQgY3VycmVudCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0gdFZpZXcgQXNzb2NpYXRlZCBgVFZpZXcuZGF0YWAgY29udGFpbnMgdGhlIGxpbmtlZCBsaXN0IG9mIGJpbmRpbmcgcHJpb3JpdGllcy5cbiAqIEBwYXJhbSB0Tm9kZSBgVE5vZGVgIHdoZXJlIHRoZSBiaW5kaW5nIGlzIGxvY2F0ZWQuXG4gKiBAcGFyYW0gbFZpZXcgYExWaWV3YCBjb250YWlucyB0aGUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBvdGhlciBzdHlsaW5nIGJpbmRpbmcgYXQgdGhpcyBgVE5vZGVgLlxuICogQHBhcmFtIHJlbmRlcmVyIFJlbmRlcmVyIHRvIHVzZSBpZiBhbnkgdXBkYXRlcy5cbiAqIEBwYXJhbSBvbGRLZXlWYWx1ZUFycmF5IFByZXZpb3VzIHZhbHVlIHJlcHJlc2VudGVkIGFzIGBLZXlWYWx1ZUFycmF5YFxuICogQHBhcmFtIG5ld0tleVZhbHVlQXJyYXkgQ3VycmVudCB2YWx1ZSByZXByZXNlbnRlZCBhcyBgS2V5VmFsdWVBcnJheWBcbiAqIEBwYXJhbSBpc0NsYXNzQmFzZWQgYHRydWVgIGlmIGBjbGFzc2AgKGBmYWxzZWAgaWYgYHN0eWxlYClcbiAqIEBwYXJhbSBiaW5kaW5nSW5kZXggQmluZGluZyBpbmRleCBvZiB0aGUgYmluZGluZy5cbiAqL1xuZnVuY3Rpb24gdXBkYXRlU3R5bGluZ01hcChcbiAgICB0VmlldzogVFZpZXcsIHROb2RlOiBUTm9kZSwgbFZpZXc6IExWaWV3LCByZW5kZXJlcjogUmVuZGVyZXIsXG4gICAgb2xkS2V5VmFsdWVBcnJheTogS2V5VmFsdWVBcnJheTxhbnk+LCBuZXdLZXlWYWx1ZUFycmF5OiBLZXlWYWx1ZUFycmF5PGFueT4sXG4gICAgaXNDbGFzc0Jhc2VkOiBib29sZWFuLCBiaW5kaW5nSW5kZXg6IG51bWJlcikge1xuICBpZiAob2xkS2V5VmFsdWVBcnJheSBhcyBLZXlWYWx1ZUFycmF5PGFueT58IE5PX0NIQU5HRSA9PT0gTk9fQ0hBTkdFKSB7XG4gICAgLy8gT24gZmlyc3QgZXhlY3V0aW9uIHRoZSBvbGRLZXlWYWx1ZUFycmF5IGlzIE5PX0NIQU5HRSA9PiB0cmVhdCBpdCBhcyBlbXB0eSBLZXlWYWx1ZUFycmF5LlxuICAgIG9sZEtleVZhbHVlQXJyYXkgPSBFTVBUWV9BUlJBWSBhcyBhbnk7XG4gIH1cbiAgbGV0IG9sZEluZGV4ID0gMDtcbiAgbGV0IG5ld0luZGV4ID0gMDtcbiAgbGV0IG9sZEtleTogc3RyaW5nfG51bGwgPSAwIDwgb2xkS2V5VmFsdWVBcnJheS5sZW5ndGggPyBvbGRLZXlWYWx1ZUFycmF5WzBdIDogbnVsbDtcbiAgbGV0IG5ld0tleTogc3RyaW5nfG51bGwgPSAwIDwgbmV3S2V5VmFsdWVBcnJheS5sZW5ndGggPyBuZXdLZXlWYWx1ZUFycmF5WzBdIDogbnVsbDtcbiAgd2hpbGUgKG9sZEtleSAhPT0gbnVsbCB8fCBuZXdLZXkgIT09IG51bGwpIHtcbiAgICBuZ0Rldk1vZGUgJiYgYXNzZXJ0TGVzc1RoYW4ob2xkSW5kZXgsIDk5OSwgJ0FyZSB3ZSBzdHVjayBpbiBpbmZpbml0ZSBsb29wPycpO1xuICAgIG5nRGV2TW9kZSAmJiBhc3NlcnRMZXNzVGhhbihuZXdJbmRleCwgOTk5LCAnQXJlIHdlIHN0dWNrIGluIGluZmluaXRlIGxvb3A/Jyk7XG4gICAgY29uc3Qgb2xkVmFsdWUgPVxuICAgICAgICBvbGRJbmRleCA8IG9sZEtleVZhbHVlQXJyYXkubGVuZ3RoID8gb2xkS2V5VmFsdWVBcnJheVtvbGRJbmRleCArIDFdIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IG5ld1ZhbHVlID1cbiAgICAgICAgbmV3SW5kZXggPCBuZXdLZXlWYWx1ZUFycmF5Lmxlbmd0aCA/IG5ld0tleVZhbHVlQXJyYXlbbmV3SW5kZXggKyAxXSA6IHVuZGVmaW5lZDtcbiAgICBsZXQgc2V0S2V5OiBzdHJpbmd8bnVsbCA9IG51bGw7XG4gICAgbGV0IHNldFZhbHVlOiBhbnkgPSB1bmRlZmluZWQ7XG4gICAgaWYgKG9sZEtleSA9PT0gbmV3S2V5KSB7XG4gICAgICAvLyBVUERBVEU6IEtleXMgYXJlIGVxdWFsID0+IG5ldyB2YWx1ZSBpcyBvdmVyd3JpdGluZyBvbGQgdmFsdWUuXG4gICAgICBvbGRJbmRleCArPSAyO1xuICAgICAgbmV3SW5kZXggKz0gMjtcbiAgICAgIGlmIChvbGRWYWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgICAgc2V0S2V5ID0gbmV3S2V5O1xuICAgICAgICBzZXRWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobmV3S2V5ID09PSBudWxsIHx8IG9sZEtleSAhPT0gbnVsbCAmJiBvbGRLZXkgPCBuZXdLZXkhKSB7XG4gICAgICAvLyBERUxFVEU6IG9sZEtleSBrZXkgaXMgbWlzc2luZyBvciB3ZSBkaWQgbm90IGZpbmQgdGhlIG9sZEtleSBpbiB0aGUgbmV3VmFsdWVcbiAgICAgIC8vIChiZWNhdXNlIHRoZSBrZXlWYWx1ZUFycmF5IGlzIHNvcnRlZCBhbmQgYG5ld0tleWAgaXMgZm91bmQgbGF0ZXIgYWxwaGFiZXRpY2FsbHkpLlxuICAgICAgLy8gYFwiYmFja2dyb3VuZFwiIDwgXCJjb2xvclwiYCBzbyB3ZSBuZWVkIHRvIGRlbGV0ZSBgXCJiYWNrZ3JvdW5kXCJgIGJlY2F1c2UgaXQgaXMgbm90IGZvdW5kIGluIHRoZVxuICAgICAgLy8gbmV3IGFycmF5LlxuICAgICAgb2xkSW5kZXggKz0gMjtcbiAgICAgIHNldEtleSA9IG9sZEtleTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ1JFQVRFOiBuZXdLZXkncyBpcyBlYXJsaWVyIGFscGhhYmV0aWNhbGx5IHRoYW4gb2xkS2V5J3MgKG9yIG5vIG9sZEtleSkgPT4gd2UgaGF2ZSBuZXcga2V5LlxuICAgICAgLy8gYFwiY29sb3JcIiA+IFwiYmFja2dyb3VuZFwiYCBzbyB3ZSBuZWVkIHRvIGFkZCBgY29sb3JgIGJlY2F1c2UgaXQgaXMgaW4gbmV3IGFycmF5IGJ1dCBub3QgaW5cbiAgICAgIC8vIG9sZCBhcnJheS5cbiAgICAgIG5nRGV2TW9kZSAmJiBhc3NlcnREZWZpbmVkKG5ld0tleSwgJ0V4cGVjdGluZyB0byBoYXZlIGEgdmFsaWQga2V5Jyk7XG4gICAgICBuZXdJbmRleCArPSAyO1xuICAgICAgc2V0S2V5ID0gbmV3S2V5O1xuICAgICAgc2V0VmFsdWUgPSBuZXdWYWx1ZTtcbiAgICB9XG4gICAgaWYgKHNldEtleSAhPT0gbnVsbCkge1xuICAgICAgdXBkYXRlU3R5bGluZyh0VmlldywgdE5vZGUsIGxWaWV3LCByZW5kZXJlciwgc2V0S2V5LCBzZXRWYWx1ZSwgaXNDbGFzc0Jhc2VkLCBiaW5kaW5nSW5kZXgpO1xuICAgIH1cbiAgICBvbGRLZXkgPSBvbGRJbmRleCA8IG9sZEtleVZhbHVlQXJyYXkubGVuZ3RoID8gb2xkS2V5VmFsdWVBcnJheVtvbGRJbmRleF0gOiBudWxsO1xuICAgIG5ld0tleSA9IG5ld0luZGV4IDwgbmV3S2V5VmFsdWVBcnJheS5sZW5ndGggPyBuZXdLZXlWYWx1ZUFycmF5W25ld0luZGV4XSA6IG51bGw7XG4gIH1cbn1cblxuLyoqXG4gKiBVcGRhdGUgYSBzaW1wbGUgKHByb3BlcnR5IG5hbWUpIHN0eWxpbmcuXG4gKlxuICogVGhpcyBmdW5jdGlvbiB0YWtlcyBgcHJvcGAgYW5kIHVwZGF0ZXMgdGhlIERPTSB0byB0aGF0IHZhbHVlLiBUaGUgZnVuY3Rpb24gdGFrZXMgdGhlIGJpbmRpbmdcbiAqIHZhbHVlIGFzIHdlbGwgYXMgYmluZGluZyBwcmlvcml0eSBpbnRvIGNvbnNpZGVyYXRpb24gdG8gZGV0ZXJtaW5lIHdoaWNoIHZhbHVlIHNob3VsZCBiZSB3cml0dGVuXG4gKiB0byBET00uIChGb3IgZXhhbXBsZSBpdCBtYXkgYmUgZGV0ZXJtaW5lZCB0aGF0IHRoZXJlIGlzIGEgaGlnaGVyIHByaW9yaXR5IG92ZXJ3cml0ZSB3aGljaCBibG9ja3NcbiAqIHRoZSBET00gd3JpdGUsIG9yIGlmIHRoZSB2YWx1ZSBnb2VzIHRvIGB1bmRlZmluZWRgIGEgbG93ZXIgcHJpb3JpdHkgb3ZlcndyaXRlIG1heSBiZSBjb25zdWx0ZWQuKVxuICpcbiAqIEBwYXJhbSB0VmlldyBBc3NvY2lhdGVkIGBUVmlldy5kYXRhYCBjb250YWlucyB0aGUgbGlua2VkIGxpc3Qgb2YgYmluZGluZyBwcmlvcml0aWVzLlxuICogQHBhcmFtIHROb2RlIGBUTm9kZWAgd2hlcmUgdGhlIGJpbmRpbmcgaXMgbG9jYXRlZC5cbiAqIEBwYXJhbSBsVmlldyBgTFZpZXdgIGNvbnRhaW5zIHRoZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIG90aGVyIHN0eWxpbmcgYmluZGluZyBhdCB0aGlzIGBUTm9kZWAuXG4gKiBAcGFyYW0gcmVuZGVyZXIgUmVuZGVyZXIgdG8gdXNlIGlmIGFueSB1cGRhdGVzLlxuICogQHBhcmFtIHByb3AgRWl0aGVyIHN0eWxlIHByb3BlcnR5IG5hbWUgb3IgYSBjbGFzcyBuYW1lLlxuICogQHBhcmFtIHZhbHVlIEVpdGhlciBzdHlsZSB2YWx1ZSBmb3IgYHByb3BgIG9yIGB0cnVlYC9gZmFsc2VgIGlmIGBwcm9wYCBpcyBjbGFzcy5cbiAqIEBwYXJhbSBpc0NsYXNzQmFzZWQgYHRydWVgIGlmIGBjbGFzc2AgKGBmYWxzZWAgaWYgYHN0eWxlYClcbiAqIEBwYXJhbSBiaW5kaW5nSW5kZXggQmluZGluZyBpbmRleCBvZiB0aGUgYmluZGluZy5cbiAqL1xuZnVuY3Rpb24gdXBkYXRlU3R5bGluZyhcbiAgICB0VmlldzogVFZpZXcsIHROb2RlOiBUTm9kZSwgbFZpZXc6IExWaWV3LCByZW5kZXJlcjogUmVuZGVyZXIsIHByb3A6IHN0cmluZyxcbiAgICB2YWx1ZTogc3RyaW5nfHVuZGVmaW5lZHxudWxsfGJvb2xlYW4sIGlzQ2xhc3NCYXNlZDogYm9vbGVhbiwgYmluZGluZ0luZGV4OiBudW1iZXIpIHtcbiAgaWYgKCEodE5vZGUudHlwZSAmIFROb2RlVHlwZS5BbnlSTm9kZSkpIHtcbiAgICAvLyBJdCBpcyBwb3NzaWJsZSB0byBoYXZlIHN0eWxpbmcgb24gbm9uLWVsZW1lbnRzIChzdWNoIGFzIG5nLWNvbnRhaW5lcikuXG4gICAgLy8gVGhpcyBpcyByYXJlLCBidXQgaXQgZG9lcyBoYXBwZW4uIEluIHN1Y2ggYSBjYXNlLCBqdXN0IGlnbm9yZSB0aGUgYmluZGluZy5cbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgdERhdGEgPSB0Vmlldy5kYXRhO1xuICBjb25zdCB0UmFuZ2UgPSB0RGF0YVtiaW5kaW5nSW5kZXggKyAxXSBhcyBUU3R5bGluZ1JhbmdlO1xuICBjb25zdCBoaWdoZXJQcmlvcml0eVZhbHVlID0gZ2V0VFN0eWxpbmdSYW5nZU5leHREdXBsaWNhdGUodFJhbmdlKSA/XG4gICAgICBmaW5kU3R5bGluZ1ZhbHVlKHREYXRhLCB0Tm9kZSwgbFZpZXcsIHByb3AsIGdldFRTdHlsaW5nUmFuZ2VOZXh0KHRSYW5nZSksIGlzQ2xhc3NCYXNlZCkgOlxuICAgICAgdW5kZWZpbmVkO1xuICBpZiAoIWlzU3R5bGluZ1ZhbHVlUHJlc2VudChoaWdoZXJQcmlvcml0eVZhbHVlKSkge1xuICAgIC8vIFdlIGRvbid0IGhhdmUgYSBuZXh0IGR1cGxpY2F0ZSwgb3Igd2UgZGlkIG5vdCBmaW5kIGEgZHVwbGljYXRlIHZhbHVlLlxuICAgIGlmICghaXNTdHlsaW5nVmFsdWVQcmVzZW50KHZhbHVlKSkge1xuICAgICAgLy8gV2Ugc2hvdWxkIGRlbGV0ZSBjdXJyZW50IHZhbHVlIG9yIHJlc3RvcmUgdG8gbG93ZXIgcHJpb3JpdHkgdmFsdWUuXG4gICAgICBpZiAoZ2V0VFN0eWxpbmdSYW5nZVByZXZEdXBsaWNhdGUodFJhbmdlKSkge1xuICAgICAgICAvLyBXZSBoYXZlIGEgcG9zc2libGUgcHJldiBkdXBsaWNhdGUsIGxldCdzIHJldHJpZXZlIGl0LlxuICAgICAgICB2YWx1ZSA9IGZpbmRTdHlsaW5nVmFsdWUodERhdGEsIG51bGwsIGxWaWV3LCBwcm9wLCBiaW5kaW5nSW5kZXgsIGlzQ2xhc3NCYXNlZCk7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHJOb2RlID0gZ2V0TmF0aXZlQnlJbmRleChnZXRTZWxlY3RlZEluZGV4KCksIGxWaWV3KSBhcyBSRWxlbWVudDtcbiAgICBhcHBseVN0eWxpbmcocmVuZGVyZXIsIGlzQ2xhc3NCYXNlZCwgck5vZGUsIHByb3AsIHZhbHVlKTtcbiAgfVxufVxuXG4vKipcbiAqIFNlYXJjaCBmb3Igc3R5bGluZyB2YWx1ZSB3aXRoIGhpZ2hlciBwcmlvcml0eSB3aGljaCBpcyBvdmVyd3JpdGluZyBjdXJyZW50IHZhbHVlLCBvciBhXG4gKiB2YWx1ZSBvZiBsb3dlciBwcmlvcml0eSB0byB3aGljaCB3ZSBzaG91bGQgZmFsbCBiYWNrIGlmIHRoZSB2YWx1ZSBpcyBgdW5kZWZpbmVkYC5cbiAqXG4gKiBXaGVuIHZhbHVlIGlzIGJlaW5nIGFwcGxpZWQgYXQgYSBsb2NhdGlvbiwgcmVsYXRlZCB2YWx1ZXMgbmVlZCB0byBiZSBjb25zdWx0ZWQuXG4gKiAtIElmIHRoZXJlIGlzIGEgaGlnaGVyIHByaW9yaXR5IGJpbmRpbmcsIHdlIHNob3VsZCBiZSB1c2luZyB0aGF0IG9uZSBpbnN0ZWFkLlxuICogICBGb3IgZXhhbXBsZSBgPGRpdiAgW3N0eWxlXT1cIntjb2xvcjpleHAxfVwiIFtzdHlsZS5jb2xvcl09XCJleHAyXCI+YCBjaGFuZ2UgdG8gYGV4cDFgXG4gKiAgIHJlcXVpcmVzIHRoYXQgd2UgY2hlY2sgYGV4cDJgIHRvIHNlZSBpZiBpdCBpcyBzZXQgdG8gdmFsdWUgb3RoZXIgdGhhbiBgdW5kZWZpbmVkYC5cbiAqIC0gSWYgdGhlcmUgaXMgYSBsb3dlciBwcmlvcml0eSBiaW5kaW5nIGFuZCB3ZSBhcmUgY2hhbmdpbmcgdG8gYHVuZGVmaW5lZGBcbiAqICAgRm9yIGV4YW1wbGUgYDxkaXYgIFtzdHlsZV09XCJ7Y29sb3I6ZXhwMX1cIiBbc3R5bGUuY29sb3JdPVwiZXhwMlwiPmAgY2hhbmdlIHRvIGBleHAyYCB0b1xuICogICBgdW5kZWZpbmVkYCByZXF1aXJlcyB0aGF0IHdlIGNoZWNrIGBleHAxYCAoYW5kIHN0YXRpYyB2YWx1ZXMpIGFuZCB1c2UgdGhhdCBhcyBuZXcgdmFsdWUuXG4gKlxuICogTk9URTogVGhlIHN0eWxpbmcgc3RvcmVzIHR3byB2YWx1ZXMuXG4gKiAxLiBUaGUgcmF3IHZhbHVlIHdoaWNoIGNhbWUgZnJvbSB0aGUgYXBwbGljYXRpb24gaXMgc3RvcmVkIGF0IGBpbmRleCArIDBgIGxvY2F0aW9uLiAoVGhpcyB2YWx1ZVxuICogICAgaXMgdXNlZCBmb3IgZGlydHkgY2hlY2tpbmcpLlxuICogMi4gVGhlIG5vcm1hbGl6ZWQgdmFsdWUgaXMgc3RvcmVkIGF0IGBpbmRleCArIDFgLlxuICpcbiAqIEBwYXJhbSB0RGF0YSBgVERhdGFgIHVzZWQgZm9yIHRyYXZlcnNpbmcgdGhlIHByaW9yaXR5LlxuICogQHBhcmFtIHROb2RlIGBUTm9kZWAgdG8gdXNlIGZvciByZXNvbHZpbmcgc3RhdGljIHN0eWxpbmcuIEFsc28gY29udHJvbHMgc2VhcmNoIGRpcmVjdGlvbi5cbiAqICAgLSBgVE5vZGVgIHNlYXJjaCBuZXh0IGFuZCBxdWl0IGFzIHNvb24gYXMgYGlzU3R5bGluZ1ZhbHVlUHJlc2VudCh2YWx1ZSlgIGlzIHRydWUuXG4gKiAgICAgIElmIG5vIHZhbHVlIGZvdW5kIGNvbnN1bHQgYHROb2RlLnJlc2lkdWFsU3R5bGVgL2B0Tm9kZS5yZXNpZHVhbENsYXNzYCBmb3IgZGVmYXVsdCB2YWx1ZS5cbiAqICAgLSBgbnVsbGAgc2VhcmNoIHByZXYgYW5kIGdvIGFsbCB0aGUgd2F5IHRvIGVuZC4gUmV0dXJuIGxhc3QgdmFsdWUgd2hlcmVcbiAqICAgICBgaXNTdHlsaW5nVmFsdWVQcmVzZW50KHZhbHVlKWAgaXMgdHJ1ZS5cbiAqIEBwYXJhbSBsVmlldyBgTFZpZXdgIHVzZWQgZm9yIHJldHJpZXZpbmcgdGhlIGFjdHVhbCB2YWx1ZXMuXG4gKiBAcGFyYW0gcHJvcCBQcm9wZXJ0eSB3aGljaCB3ZSBhcmUgaW50ZXJlc3RlZCBpbi5cbiAqIEBwYXJhbSBpbmRleCBTdGFydGluZyBpbmRleCBpbiB0aGUgbGlua2VkIGxpc3Qgb2Ygc3R5bGluZyBiaW5kaW5ncyB3aGVyZSB0aGUgc2VhcmNoIHNob3VsZCBzdGFydC5cbiAqIEBwYXJhbSBpc0NsYXNzQmFzZWQgYHRydWVgIGlmIGBjbGFzc2AgKGBmYWxzZWAgaWYgYHN0eWxlYClcbiAqL1xuZnVuY3Rpb24gZmluZFN0eWxpbmdWYWx1ZShcbiAgICB0RGF0YTogVERhdGEsIHROb2RlOiBUTm9kZXxudWxsLCBsVmlldzogTFZpZXcsIHByb3A6IHN0cmluZywgaW5kZXg6IG51bWJlcixcbiAgICBpc0NsYXNzQmFzZWQ6IGJvb2xlYW4pOiBhbnkge1xuICAvLyBgVE5vZGVgIHRvIHVzZSBmb3IgcmVzb2x2aW5nIHN0YXRpYyBzdHlsaW5nLiBBbHNvIGNvbnRyb2xzIHNlYXJjaCBkaXJlY3Rpb24uXG4gIC8vICAgLSBgVE5vZGVgIHNlYXJjaCBuZXh0IGFuZCBxdWl0IGFzIHNvb24gYXMgYGlzU3R5bGluZ1ZhbHVlUHJlc2VudCh2YWx1ZSlgIGlzIHRydWUuXG4gIC8vICAgICAgSWYgbm8gdmFsdWUgZm91bmQgY29uc3VsdCBgdE5vZGUucmVzaWR1YWxTdHlsZWAvYHROb2RlLnJlc2lkdWFsQ2xhc3NgIGZvciBkZWZhdWx0IHZhbHVlLlxuICAvLyAgIC0gYG51bGxgIHNlYXJjaCBwcmV2IGFuZCBnbyBhbGwgdGhlIHdheSB0byBlbmQuIFJldHVybiBsYXN0IHZhbHVlIHdoZXJlXG4gIC8vICAgICBgaXNTdHlsaW5nVmFsdWVQcmVzZW50KHZhbHVlKWAgaXMgdHJ1ZS5cbiAgY29uc3QgaXNQcmV2RGlyZWN0aW9uID0gdE5vZGUgPT09IG51bGw7XG4gIGxldCB2YWx1ZTogYW55ID0gdW5kZWZpbmVkO1xuICB3aGlsZSAoaW5kZXggPiAwKSB7XG4gICAgY29uc3QgcmF3S2V5ID0gdERhdGFbaW5kZXhdIGFzIFRTdHlsaW5nS2V5O1xuICAgIGNvbnN0IGNvbnRhaW5zU3RhdGljcyA9IEFycmF5LmlzQXJyYXkocmF3S2V5KTtcbiAgICAvLyBVbndyYXAgdGhlIGtleSBpZiB3ZSBjb250YWluIHN0YXRpYyB2YWx1ZXMuXG4gICAgY29uc3Qga2V5ID0gY29udGFpbnNTdGF0aWNzID8gKHJhd0tleSBhcyBzdHJpbmdbXSlbMV0gOiByYXdLZXk7XG4gICAgY29uc3QgaXNTdHlsaW5nTWFwID0ga2V5ID09PSBudWxsO1xuICAgIGxldCB2YWx1ZUF0TFZpZXdJbmRleCA9IGxWaWV3W2luZGV4ICsgMV07XG4gICAgaWYgKHZhbHVlQXRMVmlld0luZGV4ID09PSBOT19DSEFOR0UpIHtcbiAgICAgIC8vIEluIGZpcnN0VXBkYXRlUGFzcyB0aGUgc3R5bGluZyBpbnN0cnVjdGlvbnMgY3JlYXRlIGEgbGlua2VkIGxpc3Qgb2Ygc3R5bGluZy5cbiAgICAgIC8vIE9uIHN1YnNlcXVlbnQgcGFzc2VzIGl0IGlzIHBvc3NpYmxlIGZvciBhIHN0eWxpbmcgaW5zdHJ1Y3Rpb24gdG8gdHJ5IHRvIHJlYWQgYSBiaW5kaW5nXG4gICAgICAvLyB3aGljaFxuICAgICAgLy8gaGFzIG5vdCB5ZXQgZXhlY3V0ZWQuIEluIHRoYXQgY2FzZSB3ZSB3aWxsIGZpbmQgYE5PX0NIQU5HRWAgYW5kIHdlIHNob3VsZCBhc3N1bWUgdGhhdFxuICAgICAgLy8gd2UgaGF2ZSBgdW5kZWZpbmVkYCAob3IgZW1wdHkgYXJyYXkgaW4gY2FzZSBvZiBzdHlsaW5nLW1hcCBpbnN0cnVjdGlvbikgaW5zdGVhZC4gVGhpc1xuICAgICAgLy8gYWxsb3dzIHRoZSByZXNvbHV0aW9uIHRvIGFwcGx5IHRoZSB2YWx1ZSAod2hpY2ggbWF5IGxhdGVyIGJlIG92ZXJ3cml0dGVuIHdoZW4gdGhlXG4gICAgICAvLyBiaW5kaW5nIGFjdHVhbGx5IGV4ZWN1dGVzLilcbiAgICAgIHZhbHVlQXRMVmlld0luZGV4ID0gaXNTdHlsaW5nTWFwID8gRU1QVFlfQVJSQVkgOiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGxldCBjdXJyZW50VmFsdWUgPSBpc1N0eWxpbmdNYXAgPyBrZXlWYWx1ZUFycmF5R2V0KHZhbHVlQXRMVmlld0luZGV4LCBwcm9wKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXkgPT09IHByb3AgPyB2YWx1ZUF0TFZpZXdJbmRleCA6IHVuZGVmaW5lZCk7XG4gICAgaWYgKGNvbnRhaW5zU3RhdGljcyAmJiAhaXNTdHlsaW5nVmFsdWVQcmVzZW50KGN1cnJlbnRWYWx1ZSkpIHtcbiAgICAgIGN1cnJlbnRWYWx1ZSA9IGtleVZhbHVlQXJyYXlHZXQocmF3S2V5IGFzIEtleVZhbHVlQXJyYXk8YW55PiwgcHJvcCk7XG4gICAgfVxuICAgIGlmIChpc1N0eWxpbmdWYWx1ZVByZXNlbnQoY3VycmVudFZhbHVlKSkge1xuICAgICAgdmFsdWUgPSBjdXJyZW50VmFsdWU7XG4gICAgICBpZiAoaXNQcmV2RGlyZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdFJhbmdlID0gdERhdGFbaW5kZXggKyAxXSBhcyBUU3R5bGluZ1JhbmdlO1xuICAgIGluZGV4ID0gaXNQcmV2RGlyZWN0aW9uID8gZ2V0VFN0eWxpbmdSYW5nZVByZXYodFJhbmdlKSA6IGdldFRTdHlsaW5nUmFuZ2VOZXh0KHRSYW5nZSk7XG4gIH1cbiAgaWYgKHROb2RlICE9PSBudWxsKSB7XG4gICAgLy8gaW4gY2FzZSB3aGVyZSB3ZSBhcmUgZ29pbmcgaW4gbmV4dCBkaXJlY3Rpb24gQU5EIHdlIGRpZCBub3QgZmluZCBhbnl0aGluZywgd2UgbmVlZCB0b1xuICAgIC8vIGNvbnN1bHQgcmVzaWR1YWwgc3R5bGluZ1xuICAgIGxldCByZXNpZHVhbCA9IGlzQ2xhc3NCYXNlZCA/IHROb2RlLnJlc2lkdWFsQ2xhc3NlcyA6IHROb2RlLnJlc2lkdWFsU3R5bGVzO1xuICAgIGlmIChyZXNpZHVhbCAhPSBudWxsIC8qKiBPUiByZXNpZHVhbCAhPT09IHVuZGVmaW5lZCAqLykge1xuICAgICAgdmFsdWUgPSBrZXlWYWx1ZUFycmF5R2V0KHJlc2lkdWFsISwgcHJvcCk7XG4gICAgfVxuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHRoZSBiaW5kaW5nIHZhbHVlIHNob3VsZCBiZSB1c2VkIChvciBpZiB0aGUgdmFsdWUgaXMgJ3VuZGVmaW5lZCcgYW5kIGhlbmNlIHByaW9yaXR5XG4gKiByZXNvbHV0aW9uIHNob3VsZCBiZSB1c2VkLilcbiAqXG4gKiBAcGFyYW0gdmFsdWUgQmluZGluZyBzdHlsZSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gaXNTdHlsaW5nVmFsdWVQcmVzZW50KHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgLy8gQ3VycmVudGx5IG9ubHkgYHVuZGVmaW5lZGAgdmFsdWUgaXMgY29uc2lkZXJlZCBub24tYmluZGluZy4gVGhhdCBpcyBgdW5kZWZpbmVkYCBzYXlzIEkgZG9uJ3RcbiAgLy8gaGF2ZSBhbiBvcGluaW9uIGFzIHRvIHdoYXQgdGhpcyBiaW5kaW5nIHNob3VsZCBiZSBhbmQgeW91IHNob3VsZCBjb25zdWx0IG90aGVyIGJpbmRpbmdzIGJ5XG4gIC8vIHByaW9yaXR5IHRvIGRldGVybWluZSB0aGUgdmFsaWQgdmFsdWUuXG4gIC8vIFRoaXMgaXMgZXh0cmFjdGVkIGludG8gYSBzaW5nbGUgZnVuY3Rpb24gc28gdGhhdCB3ZSBoYXZlIGEgc2luZ2xlIHBsYWNlIHRvIGNvbnRyb2wgdGhpcy5cbiAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogTm9ybWFsaXplcyBhbmQvb3IgYWRkcyBhIHN1ZmZpeCB0byB0aGUgdmFsdWUuXG4gKlxuICogSWYgdmFsdWUgaXMgYG51bGxgL2B1bmRlZmluZWRgIG5vIHN1ZmZpeCBpcyBhZGRlZFxuICogQHBhcmFtIHZhbHVlXG4gKiBAcGFyYW0gc3VmZml4XG4gKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZVN1ZmZpeCh2YWx1ZTogYW55LCBzdWZmaXg6IHN0cmluZ3x1bmRlZmluZWR8bnVsbCk6IHN0cmluZ3xudWxsfHVuZGVmaW5lZHxib29sZWFuIHtcbiAgaWYgKHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT09ICcnKSB7XG4gICAgLy8gZG8gbm90aGluZ1xuICAgIC8vIERvIG5vdCBhZGQgdGhlIHN1ZmZpeCBpZiB0aGUgdmFsdWUgaXMgZ29pbmcgdG8gYmUgZW1wdHkuXG4gICAgLy8gQXMgaXQgcHJvZHVjZSBpbnZhbGlkIENTUywgd2hpY2ggdGhlIGJyb3dzZXJzIHdpbGwgYXV0b21hdGljYWxseSBvbWl0IGJ1dCBEb21pbm8gd2lsbCBub3QuXG4gICAgLy8gRXhhbXBsZTogYFwibGVmdFwiOiBcInB4O1wiYCBpbnN0ZWFkIG9mIGBcImxlZnRcIjogXCJcImAuXG4gIH0gZWxzZSBpZiAodHlwZW9mIHN1ZmZpeCA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWx1ZSA9IHZhbHVlICsgc3VmZml4O1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICB2YWx1ZSA9IHN0cmluZ2lmeSh1bndyYXBTYWZlVmFsdWUodmFsdWUpKTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cblxuLyoqXG4gKiBUZXN0cyBpZiB0aGUgYFROb2RlYCBoYXMgaW5wdXQgc2hhZG93LlxuICpcbiAqIEFuIGlucHV0IHNoYWRvdyBpcyB3aGVuIGEgZGlyZWN0aXZlIHN0ZWFscyAoc2hhZG93cykgdGhlIGlucHV0IGJ5IHVzaW5nIGBASW5wdXQoJ3N0eWxlJylgIG9yXG4gKiBgQElucHV0KCdjbGFzcycpYCBhcyBpbnB1dC5cbiAqXG4gKiBAcGFyYW0gdE5vZGUgYFROb2RlYCB3aGljaCB3ZSB3b3VsZCBsaWtlIHRvIHNlZSBpZiBpdCBoYXMgc2hhZG93LlxuICogQHBhcmFtIGlzQ2xhc3NCYXNlZCBgdHJ1ZWAgaWYgYGNsYXNzYCAoYGZhbHNlYCBpZiBgc3R5bGVgKVxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFzU3R5bGluZ0lucHV0U2hhZG93KHROb2RlOiBUTm9kZSwgaXNDbGFzc0Jhc2VkOiBib29sZWFuKSB7XG4gIHJldHVybiAodE5vZGUuZmxhZ3MgJiAoaXNDbGFzc0Jhc2VkID8gVE5vZGVGbGFncy5oYXNDbGFzc0lucHV0IDogVE5vZGVGbGFncy5oYXNTdHlsZUlucHV0KSkgIT09IDA7XG59XG4iXX0=