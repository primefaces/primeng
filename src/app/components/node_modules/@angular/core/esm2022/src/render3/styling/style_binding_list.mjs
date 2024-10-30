/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { keyValueArrayIndexOf } from '../../util/array_utils';
import { assertEqual, assertIndexInRange, assertNotEqual } from '../../util/assert';
import { assertFirstUpdatePass } from '../assert';
import { getTStylingRangeNext, getTStylingRangePrev, setTStylingRangeNext, setTStylingRangeNextDuplicate, setTStylingRangePrev, setTStylingRangePrevDuplicate, toTStylingRange } from '../interfaces/styling';
import { getTView } from '../state';
/**
 * NOTE: The word `styling` is used interchangeably as style or class styling.
 *
 * This file contains code to link styling instructions together so that they can be replayed in
 * priority order. The file exists because Ivy styling instruction execution order does not match
 * that of the priority order. The purpose of this code is to create a linked list so that the
 * instructions can be traversed in priority order when computing the styles.
 *
 * Assume we are dealing with the following code:
 * ```
 * @Component({
 *   template: `
 *     <my-cmp [style]=" {color: '#001'} "
 *             [style.color]=" #002 "
 *             dir-style-color-1
 *             dir-style-color-2> `
 * })
 * class ExampleComponent {
 *   static ngComp = ... {
 *     ...
 *     // Compiler ensures that `ɵɵstyleProp` is after `ɵɵstyleMap`
 *     ɵɵstyleMap({color: '#001'});
 *     ɵɵstyleProp('color', '#002');
 *     ...
 *   }
 * }
 *
 * @Directive({
 *   selector: `[dir-style-color-1]',
 * })
 * class Style1Directive {
 *   @HostBinding('style') style = {color: '#005'};
 *   @HostBinding('style.color') color = '#006';
 *
 *   static ngDir = ... {
 *     ...
 *     // Compiler ensures that `ɵɵstyleProp` is after `ɵɵstyleMap`
 *     ɵɵstyleMap({color: '#005'});
 *     ɵɵstyleProp('color', '#006');
 *     ...
 *   }
 * }
 *
 * @Directive({
 *   selector: `[dir-style-color-2]',
 * })
 * class Style2Directive {
 *   @HostBinding('style') style = {color: '#007'};
 *   @HostBinding('style.color') color = '#008';
 *
 *   static ngDir = ... {
 *     ...
 *     // Compiler ensures that `ɵɵstyleProp` is after `ɵɵstyleMap`
 *     ɵɵstyleMap({color: '#007'});
 *     ɵɵstyleProp('color', '#008');
 *     ...
 *   }
 * }
 *
 * @Directive({
 *   selector: `my-cmp',
 * })
 * class MyComponent {
 *   @HostBinding('style') style = {color: '#003'};
 *   @HostBinding('style.color') color = '#004';
 *
 *   static ngComp = ... {
 *     ...
 *     // Compiler ensures that `ɵɵstyleProp` is after `ɵɵstyleMap`
 *     ɵɵstyleMap({color: '#003'});
 *     ɵɵstyleProp('color', '#004');
 *     ...
 *   }
 * }
 * ```
 *
 * The Order of instruction execution is:
 *
 * NOTE: the comment binding location is for illustrative purposes only.
 *
 * ```
 * // Template: (ExampleComponent)
 *     ɵɵstyleMap({color: '#001'});   // Binding index: 10
 *     ɵɵstyleProp('color', '#002');  // Binding index: 12
 * // MyComponent
 *     ɵɵstyleMap({color: '#003'});   // Binding index: 20
 *     ɵɵstyleProp('color', '#004');  // Binding index: 22
 * // Style1Directive
 *     ɵɵstyleMap({color: '#005'});   // Binding index: 24
 *     ɵɵstyleProp('color', '#006');  // Binding index: 26
 * // Style2Directive
 *     ɵɵstyleMap({color: '#007'});   // Binding index: 28
 *     ɵɵstyleProp('color', '#008');  // Binding index: 30
 * ```
 *
 * The correct priority order of concatenation is:
 *
 * ```
 * // MyComponent
 *     ɵɵstyleMap({color: '#003'});   // Binding index: 20
 *     ɵɵstyleProp('color', '#004');  // Binding index: 22
 * // Style1Directive
 *     ɵɵstyleMap({color: '#005'});   // Binding index: 24
 *     ɵɵstyleProp('color', '#006');  // Binding index: 26
 * // Style2Directive
 *     ɵɵstyleMap({color: '#007'});   // Binding index: 28
 *     ɵɵstyleProp('color', '#008');  // Binding index: 30
 * // Template: (ExampleComponent)
 *     ɵɵstyleMap({color: '#001'});   // Binding index: 10
 *     ɵɵstyleProp('color', '#002');  // Binding index: 12
 * ```
 *
 * What color should be rendered?
 *
 * Once the items are correctly sorted in the list, the answer is simply the last item in the
 * concatenation list which is `#002`.
 *
 * To do so we keep a linked list of all of the bindings which pertain to this element.
 * Notice that the bindings are inserted in the order of execution, but the `TView.data` allows
 * us to traverse them in the order of priority.
 *
 * |Idx|`TView.data`|`LView`          | Notes
 * |---|------------|-----------------|--------------
 * |...|            |                 |
 * |10 |`null`      |`{color: '#001'}`| `ɵɵstyleMap('color', {color: '#001'})`
 * |11 |`30 | 12`   | ...             |
 * |12 |`color`     |`'#002'`         | `ɵɵstyleProp('color', '#002')`
 * |13 |`10 | 0`    | ...             |
 * |...|            |                 |
 * |20 |`null`      |`{color: '#003'}`| `ɵɵstyleMap('color', {color: '#003'})`
 * |21 |`0 | 22`    | ...             |
 * |22 |`color`     |`'#004'`         | `ɵɵstyleProp('color', '#004')`
 * |23 |`20 | 24`   | ...             |
 * |24 |`null`      |`{color: '#005'}`| `ɵɵstyleMap('color', {color: '#005'})`
 * |25 |`22 | 26`   | ...             |
 * |26 |`color`     |`'#006'`         | `ɵɵstyleProp('color', '#006')`
 * |27 |`24 | 28`   | ...             |
 * |28 |`null`      |`{color: '#007'}`| `ɵɵstyleMap('color', {color: '#007'})`
 * |29 |`26 | 30`   | ...             |
 * |30 |`color`     |`'#008'`         | `ɵɵstyleProp('color', '#008')`
 * |31 |`28 | 10`   | ...             |
 *
 * The above data structure allows us to re-concatenate the styling no matter which data binding
 * changes.
 *
 * NOTE: in addition to keeping track of next/previous index the `TView.data` also stores prev/next
 * duplicate bit. The duplicate bit if true says there either is a binding with the same name or
 * there is a map (which may contain the name). This information is useful in knowing if other
 * styles with higher priority need to be searched for overwrites.
 *
 * NOTE: See `should support example in 'tnode_linked_list.ts' documentation` in
 * `tnode_linked_list_spec.ts` for working example.
 */
let __unused_const_as_closure_does_not_like_standalone_comment_blocks__;
/**
 * Insert new `tStyleValue` at `TData` and link existing style bindings such that we maintain linked
 * list of styles and compute the duplicate flag.
 *
 * Note: this function is executed during `firstUpdatePass` only to populate the `TView.data`.
 *
 * The function works by keeping track of `tStylingRange` which contains two pointers pointing to
 * the head/tail of the template portion of the styles.
 *  - if `isHost === false` (we are template) then insertion is at tail of `TStylingRange`
 *  - if `isHost === true` (we are host binding) then insertion is at head of `TStylingRange`
 *
 * @param tData The `TData` to insert into.
 * @param tNode `TNode` associated with the styling element.
 * @param tStylingKey See `TStylingKey`.
 * @param index location of where `tStyleValue` should be stored (and linked into list.)
 * @param isHostBinding `true` if the insertion is for a `hostBinding`. (insertion is in front of
 *               template.)
 * @param isClassBinding True if the associated `tStylingKey` as a `class` styling.
 *                       `tNode.classBindings` should be used (or `tNode.styleBindings` otherwise.)
 */
export function insertTStylingBinding(tData, tNode, tStylingKeyWithStatic, index, isHostBinding, isClassBinding) {
    ngDevMode && assertFirstUpdatePass(getTView());
    let tBindings = isClassBinding ? tNode.classBindings : tNode.styleBindings;
    let tmplHead = getTStylingRangePrev(tBindings);
    let tmplTail = getTStylingRangeNext(tBindings);
    tData[index] = tStylingKeyWithStatic;
    let isKeyDuplicateOfStatic = false;
    let tStylingKey;
    if (Array.isArray(tStylingKeyWithStatic)) {
        // We are case when the `TStylingKey` contains static fields as well.
        const staticKeyValueArray = tStylingKeyWithStatic;
        tStylingKey = staticKeyValueArray[1]; // unwrap.
        // We need to check if our key is present in the static so that we can mark it as duplicate.
        if (tStylingKey === null ||
            keyValueArrayIndexOf(staticKeyValueArray, tStylingKey) > 0) {
            // tStylingKey is present in the statics, need to mark it as duplicate.
            isKeyDuplicateOfStatic = true;
        }
    }
    else {
        tStylingKey = tStylingKeyWithStatic;
    }
    if (isHostBinding) {
        // We are inserting host bindings
        // If we don't have template bindings then `tail` is 0.
        const hasTemplateBindings = tmplTail !== 0;
        // This is important to know because that means that the `head` can't point to the first
        // template bindings (there are none.) Instead the head points to the tail of the template.
        if (hasTemplateBindings) {
            // template head's "prev" will point to last host binding or to 0 if no host bindings yet
            const previousNode = getTStylingRangePrev(tData[tmplHead + 1]);
            tData[index + 1] = toTStylingRange(previousNode, tmplHead);
            // if a host binding has already been registered, we need to update the next of that host
            // binding to point to this one
            if (previousNode !== 0) {
                // We need to update the template-tail value to point to us.
                tData[previousNode + 1] =
                    setTStylingRangeNext(tData[previousNode + 1], index);
            }
            // The "previous" of the template binding head should point to this host binding
            tData[tmplHead + 1] = setTStylingRangePrev(tData[tmplHead + 1], index);
        }
        else {
            tData[index + 1] = toTStylingRange(tmplHead, 0);
            // if a host binding has already been registered, we need to update the next of that host
            // binding to point to this one
            if (tmplHead !== 0) {
                // We need to update the template-tail value to point to us.
                tData[tmplHead + 1] = setTStylingRangeNext(tData[tmplHead + 1], index);
            }
            // if we don't have template, the head points to template-tail, and needs to be advanced.
            tmplHead = index;
        }
    }
    else {
        // We are inserting in template section.
        // We need to set this binding's "previous" to the current template tail
        tData[index + 1] = toTStylingRange(tmplTail, 0);
        ngDevMode &&
            assertEqual(tmplHead !== 0 && tmplTail === 0, false, 'Adding template bindings after hostBindings is not allowed.');
        if (tmplHead === 0) {
            tmplHead = index;
        }
        else {
            // We need to update the previous value "next" to point to this binding
            tData[tmplTail + 1] = setTStylingRangeNext(tData[tmplTail + 1], index);
        }
        tmplTail = index;
    }
    // Now we need to update / compute the duplicates.
    // Starting with our location search towards head (least priority)
    if (isKeyDuplicateOfStatic) {
        tData[index + 1] = setTStylingRangePrevDuplicate(tData[index + 1]);
    }
    markDuplicates(tData, tStylingKey, index, true);
    markDuplicates(tData, tStylingKey, index, false);
    markDuplicateOfResidualStyling(tNode, tStylingKey, tData, index, isClassBinding);
    tBindings = toTStylingRange(tmplHead, tmplTail);
    if (isClassBinding) {
        tNode.classBindings = tBindings;
    }
    else {
        tNode.styleBindings = tBindings;
    }
}
/**
 * Look into the residual styling to see if the current `tStylingKey` is duplicate of residual.
 *
 * @param tNode `TNode` where the residual is stored.
 * @param tStylingKey `TStylingKey` to store.
 * @param tData `TData` associated with the current `LView`.
 * @param index location of where `tStyleValue` should be stored (and linked into list.)
 * @param isClassBinding True if the associated `tStylingKey` as a `class` styling.
 *                       `tNode.classBindings` should be used (or `tNode.styleBindings` otherwise.)
 */
function markDuplicateOfResidualStyling(tNode, tStylingKey, tData, index, isClassBinding) {
    const residual = isClassBinding ? tNode.residualClasses : tNode.residualStyles;
    if (residual != null /* or undefined */ && typeof tStylingKey == 'string' &&
        keyValueArrayIndexOf(residual, tStylingKey) >= 0) {
        // We have duplicate in the residual so mark ourselves as duplicate.
        tData[index + 1] = setTStylingRangeNextDuplicate(tData[index + 1]);
    }
}
/**
 * Marks `TStyleValue`s as duplicates if another style binding in the list has the same
 * `TStyleValue`.
 *
 * NOTE: this function is intended to be called twice once with `isPrevDir` set to `true` and once
 * with it set to `false` to search both the previous as well as next items in the list.
 *
 * No duplicate case
 * ```
 *   [style.color]
 *   [style.width.px] <<- index
 *   [style.height.px]
 * ```
 *
 * In the above case adding `[style.width.px]` to the existing `[style.color]` produces no
 * duplicates because `width` is not found in any other part of the linked list.
 *
 * Duplicate case
 * ```
 *   [style.color]
 *   [style.width.em]
 *   [style.width.px] <<- index
 * ```
 * In the above case adding `[style.width.px]` will produce a duplicate with `[style.width.em]`
 * because `width` is found in the chain.
 *
 * Map case 1
 * ```
 *   [style.width.px]
 *   [style.color]
 *   [style]  <<- index
 * ```
 * In the above case adding `[style]` will produce a duplicate with any other bindings because
 * `[style]` is a Map and as such is fully dynamic and could produce `color` or `width`.
 *
 * Map case 2
 * ```
 *   [style]
 *   [style.width.px]
 *   [style.color]  <<- index
 * ```
 * In the above case adding `[style.color]` will produce a duplicate because there is already a
 * `[style]` binding which is a Map and as such is fully dynamic and could produce `color` or
 * `width`.
 *
 * NOTE: Once `[style]` (Map) is added into the system all things are mapped as duplicates.
 * NOTE: We use `style` as example, but same logic is applied to `class`es as well.
 *
 * @param tData `TData` where the linked list is stored.
 * @param tStylingKey `TStylingKeyPrimitive` which contains the value to compare to other keys in
 *        the linked list.
 * @param index Starting location in the linked list to search from
 * @param isPrevDir Direction.
 *        - `true` for previous (lower priority);
 *        - `false` for next (higher priority).
 */
function markDuplicates(tData, tStylingKey, index, isPrevDir) {
    const tStylingAtIndex = tData[index + 1];
    const isMap = tStylingKey === null;
    let cursor = isPrevDir ? getTStylingRangePrev(tStylingAtIndex) : getTStylingRangeNext(tStylingAtIndex);
    let foundDuplicate = false;
    // We keep iterating as long as we have a cursor
    // AND either:
    // - we found what we are looking for, OR
    // - we are a map in which case we have to continue searching even after we find what we were
    //   looking for since we are a wild card and everything needs to be flipped to duplicate.
    while (cursor !== 0 && (foundDuplicate === false || isMap)) {
        ngDevMode && assertIndexInRange(tData, cursor);
        const tStylingValueAtCursor = tData[cursor];
        const tStyleRangeAtCursor = tData[cursor + 1];
        if (isStylingMatch(tStylingValueAtCursor, tStylingKey)) {
            foundDuplicate = true;
            tData[cursor + 1] = isPrevDir ? setTStylingRangeNextDuplicate(tStyleRangeAtCursor) :
                setTStylingRangePrevDuplicate(tStyleRangeAtCursor);
        }
        cursor = isPrevDir ? getTStylingRangePrev(tStyleRangeAtCursor) :
            getTStylingRangeNext(tStyleRangeAtCursor);
    }
    if (foundDuplicate) {
        // if we found a duplicate, than mark ourselves.
        tData[index + 1] = isPrevDir ? setTStylingRangePrevDuplicate(tStylingAtIndex) :
            setTStylingRangeNextDuplicate(tStylingAtIndex);
    }
}
/**
 * Determines if two `TStylingKey`s are a match.
 *
 * When computing whether a binding contains a duplicate, we need to compare if the instruction
 * `TStylingKey` has a match.
 *
 * Here are examples of `TStylingKey`s which match given `tStylingKeyCursor` is:
 * - `color`
 *    - `color`    // Match another color
 *    - `null`     // That means that `tStylingKey` is a `classMap`/`styleMap` instruction
 *    - `['', 'color', 'other', true]` // wrapped `color` so match
 *    - `['', null, 'other', true]`       // wrapped `null` so match
 *    - `['', 'width', 'color', 'value']` // wrapped static value contains a match on `'color'`
 * - `null`       // `tStylingKeyCursor` always match as it is `classMap`/`styleMap` instruction
 *
 * @param tStylingKeyCursor
 * @param tStylingKey
 */
function isStylingMatch(tStylingKeyCursor, tStylingKey) {
    ngDevMode &&
        assertNotEqual(Array.isArray(tStylingKey), true, 'Expected that \'tStylingKey\' has been unwrapped');
    if (tStylingKeyCursor === null || // If the cursor is `null` it means that we have map at that
        // location so we must assume that we have a match.
        tStylingKey == null || // If `tStylingKey` is `null` then it is a map therefor assume that it
        // contains a match.
        (Array.isArray(tStylingKeyCursor) ? tStylingKeyCursor[1] : tStylingKeyCursor) ===
            tStylingKey // If the keys match explicitly than we are a match.
    ) {
        return true;
    }
    else if (Array.isArray(tStylingKeyCursor) && typeof tStylingKey === 'string') {
        // if we did not find a match, but `tStylingKeyCursor` is `KeyValueArray` that means cursor has
        // statics and we need to check those as well.
        return keyValueArrayIndexOf(tStylingKeyCursor, tStylingKey) >=
            0; // see if we are matching the key
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVfYmluZGluZ19saXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9zdHlsaW5nL3N0eWxlX2JpbmRpbmdfbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQWdCLG9CQUFvQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDM0UsT0FBTyxFQUFDLFdBQVcsRUFBRSxrQkFBa0IsRUFBRSxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRixPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFFaEQsT0FBTyxFQUFDLG9CQUFvQixFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixFQUFFLDZCQUE2QixFQUFFLG9CQUFvQixFQUFFLDZCQUE2QixFQUFFLGVBQWUsRUFBbUQsTUFBTSx1QkFBdUIsQ0FBQztBQUU5UCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBR2xDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdKRztBQUNILElBQUksbUVBQThFLENBQUM7QUFFbkY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxNQUFNLFVBQVUscUJBQXFCLENBQ2pDLEtBQVksRUFBRSxLQUFZLEVBQUUscUJBQWtDLEVBQUUsS0FBYSxFQUM3RSxhQUFzQixFQUFFLGNBQXVCO0lBQ2pELFNBQVMsSUFBSSxxQkFBcUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQy9DLElBQUksU0FBUyxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsS0FBSyxD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LENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1lBQ3pFLFdBQVcsQ0FBRSxvREFBb0Q7TUFDdkUsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztTQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLE9BQU8sV0FBVyxLQUFLLFFBQVEsRUFBRSxDQUFDO1FBQy9FLCtGQUErRjtRQUMvRiw4Q0FBOEM7UUFDOUMsT0FBTyxvQkFBb0IsQ0FBQyxpQkFBaUIsRUFBRSxXQUFXLENBQUM7WUFDdkQsQ0FBQyxDQUFDLENBQUUsaUNBQWlDO0lBQzNDLENBQUM7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtLZXlWYWx1ZUFycmF5LCBrZXlWYWx1ZUFycmF5SW5kZXhPZn0gZnJvbSAnLi4vLi4vdXRpbC9hcnJheV91dGlscyc7XG5pbXBvcnQge2Fzc2VydEVxdWFsLCBhc3NlcnRJbmRleEluUmFuZ2UsIGFzc2VydE5vdEVxdWFsfSBmcm9tICcuLi8uLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQge2Fzc2VydEZpcnN0VXBkYXRlUGFzc30gZnJvbSAnLi4vYXNzZXJ0JztcbmltcG9ydCB7VE5vZGV9IGZyb20gJy4uL2ludGVyZmFjZXMvbm9kZSc7XG5pbXBvcnQge2dldFRTdHlsaW5nUmFuZ2VOZXh0LCBnZXRUU3R5bGluZ1JhbmdlUHJldiwgc2V0VFN0eWxpbmdSYW5nZU5leHQsIHNldFRTdHlsaW5nUmFuZ2VOZXh0RHVwbGljYXRlLCBzZXRUU3R5bGluZ1JhbmdlUHJldiwgc2V0VFN0eWxpbmdSYW5nZVByZXZEdXBsaWNhdGUsIHRvVFN0eWxpbmdSYW5nZSwgVFN0eWxpbmdLZXksIFRTdHlsaW5nS2V5UHJpbWl0aXZlLCBUU3R5bGluZ1JhbmdlfSBmcm9tICcuLi9pbnRlcmZhY2VzL3N0eWxpbmcnO1xuaW1wb3J0IHtURGF0YX0gZnJvbSAnLi4vaW50ZXJmYWNlcy92aWV3JztcbmltcG9ydCB7Z2V0VFZpZXd9IGZyb20gJy4uL3N0YXRlJztcblxuXG4vKipcbiAqIE5PVEU6IFRoZSB3b3JkIGBzdHlsaW5nYCBpcyB1c2VkIGludGVyY2hhbmdlYWJseSBhcyBzdHlsZSBvciBjbGFzcyBzdHlsaW5nLlxuICpcbiAqIFRoaXMgZmlsZSBjb250YWlucyBjb2RlIHRvIGxpbmsgc3R5bGluZyBpbnN0cnVjdGlvbnMgdG9nZXRoZXIgc28gdGhhdCB0aGV5IGNhbiBiZSByZXBsYXllZCBpblxuICogcHJpb3JpdHkgb3JkZXIuIFRoZSBmaWxlIGV4aXN0cyBiZWNhdXNlIEl2eSBzdHlsaW5nIGluc3RydWN0aW9uIGV4ZWN1dGlvbiBvcmRlciBkb2VzIG5vdCBtYXRjaFxuICogdGhhdCBvZiB0aGUgcHJpb3JpdHkgb3JkZXIuIFRoZSBwdXJwb3NlIG9mIHRoaXMgY29kZSBpcyB0byBjcmVhdGUgYSBsaW5rZWQgbGlzdCBzbyB0aGF0IHRoZVxuICogaW5zdHJ1Y3Rpb25zIGNhbiBiZSB0cmF2ZXJzZWQgaW4gcHJpb3JpdHkgb3JkZXIgd2hlbiBjb21wdXRpbmcgdGhlIHN0eWxlcy5cbiAqXG4gKiBBc3N1bWUgd2UgYXJlIGRlYWxpbmcgd2l0aCB0aGUgZm9sbG93aW5nIGNvZGU6XG4gKiBgYGBcbiAqIEBDb21wb25lbnQoe1xuICogICB0ZW1wbGF0ZTogYFxuICogICAgIDxteS1jbXAgW3N0eWxlXT1cIiB7Y29sb3I6ICcjMDAxJ30gXCJcbiAqICAgICAgICAgICAgIFtzdHlsZS5jb2xvcl09XCIgIzAwMiBcIlxuICogICAgICAgICAgICAgZGlyLXN0eWxlLWNvbG9yLTFcbiAqICAgICAgICAgICAgIGRpci1zdHlsZS1jb2xvci0yPiBgXG4gKiB9KVxuICogY2xhc3MgRXhhbXBsZUNvbXBvbmVudCB7XG4gKiAgIHN0YXRpYyBuZ0NvbXAgPSAuLi4ge1xuICogICAgIC4uLlxuICogICAgIC8vIENvbXBpbGVyIGVuc3VyZXMgdGhhdCBgybXJtXN0eWxlUHJvcGAgaXMgYWZ0ZXIgYMm1ybVzdHlsZU1hcGBcbiAqICAgICDJtcm1c3R5bGVNYXAoe2NvbG9yOiAnIzAwMSd9KTtcbiAqICAgICDJtcm1c3R5bGVQcm9wKCdjb2xvcicsICcjMDAyJyk7XG4gKiAgICAgLi4uXG4gKiAgIH1cbiAqIH1cbiAqXG4gKiBARGlyZWN0aXZlKHtcbiAqICAgc2VsZWN0b3I6IGBbZGlyLXN0eWxlLWNvbG9yLTFdJyxcbiAqIH0pXG4gKiBjbGFzcyBTdHlsZTFEaXJlY3RpdmUge1xuICogICBASG9zdEJpbmRpbmcoJ3N0eWxlJykgc3R5bGUgPSB7Y29sb3I6ICcjMDA1J307XG4gKiAgIEBIb3N0QmluZGluZygnc3R5bGUuY29sb3InKSBjb2xvciA9ICcjMDA2JztcbiAqXG4gKiAgIHN0YXRpYyBuZ0RpciA9IC4uLiB7XG4gKiAgICAgLi4uXG4gKiAgICAgLy8gQ29tcGlsZXIgZW5zdXJlcyB0aGF0IGDJtcm1c3R5bGVQcm9wYCBpcyBhZnRlciBgybXJtXN0eWxlTWFwYFxuICogICAgIMm1ybVzdHlsZU1hcCh7Y29sb3I6ICcjMDA1J30pO1xuICogICAgIMm1ybVzdHlsZVByb3AoJ2NvbG9yJywgJyMwMDYnKTtcbiAqICAgICAuLi5cbiAqICAgfVxuICogfVxuICpcbiAqIEBEaXJlY3RpdmUoe1xuICogICBzZWxlY3RvcjogYFtkaXItc3R5bGUtY29sb3ItMl0nLFxuICogfSlcbiAqIGNsYXNzIFN0eWxlMkRpcmVjdGl2ZSB7XG4gKiAgIEBIb3N0QmluZGluZygnc3R5bGUnKSBzdHlsZSA9IHtjb2xvcjogJyMwMDcnfTtcbiAqICAgQEhvc3RCaW5kaW5nKCdzdHlsZS5jb2xvcicpIGNvbG9yID0gJyMwMDgnO1xuICpcbiAqICAgc3RhdGljIG5nRGlyID0gLi4uIHtcbiAqICAgICAuLi5cbiAqICAgICAvLyBDb21waWxlciBlbnN1cmVzIHRoYXQgYMm1ybVzdHlsZVByb3BgIGlzIGFmdGVyIGDJtcm1c3R5bGVNYXBgXG4gKiAgICAgybXJtXN0eWxlTWFwKHtjb2xvcjogJyMwMDcnfSk7XG4gKiAgICAgybXJtXN0eWxlUHJvcCgnY29sb3InLCAnIzAwOCcpO1xuICogICAgIC4uLlxuICogICB9XG4gKiB9XG4gKlxuICogQERpcmVjdGl2ZSh7XG4gKiAgIHNlbGVjdG9yOiBgbXktY21wJyxcbiAqIH0pXG4gKiBjbGFzcyBNeUNvbXBvbmVudCB7XG4gKiAgIEBIb3N0QmluZGluZygnc3R5bGUnKSBzdHlsZSA9IHtjb2xvcjogJyMwMDMnfTtcbiAqICAgQEhvc3RCaW5kaW5nKCdzdHlsZS5jb2xvcicpIGNvbG9yID0gJyMwMDQnO1xuICpcbiAqICAgc3RhdGljIG5nQ29tcCA9IC4uLiB7XG4gKiAgICAgLi4uXG4gKiAgICAgLy8gQ29tcGlsZXIgZW5zdXJlcyB0aGF0IGDJtcm1c3R5bGVQcm9wYCBpcyBhZnRlciBgybXJtXN0eWxlTWFwYFxuICogICAgIMm1ybVzdHlsZU1hcCh7Y29sb3I6ICcjMDAzJ30pO1xuICogICAgIMm1ybVzdHlsZVByb3AoJ2NvbG9yJywgJyMwMDQnKTtcbiAqICAgICAuLi5cbiAqICAgfVxuICogfVxuICogYGBgXG4gKlxuICogVGhlIE9yZGVyIG9mIGluc3RydWN0aW9uIGV4ZWN1dGlvbiBpczpcbiAqXG4gKiBOT1RFOiB0aGUgY29tbWVudCBiaW5kaW5nIGxvY2F0aW9uIGlzIGZvciBpbGx1c3RyYXRpdmUgcHVycG9zZXMgb25seS5cbiAqXG4gKiBgYGBcbiAqIC8vIFRlbXBsYXRlOiAoRXhhbXBsZUNvbXBvbmVudClcbiAqICAgICDJtcm1c3R5bGVNYXAoe2NvbG9yOiAnIzAwMSd9KTsgICAvLyBCaW5kaW5nIGluZGV4OiAxMFxuICogICAgIMm1ybVzdHlsZVByb3AoJ2NvbG9yJywgJyMwMDInKTsgIC8vIEJpbmRpbmcgaW5kZXg6IDEyXG4gKiAvLyBNeUNvbXBvbmVudFxuICogICAgIMm1ybVzdHlsZU1hcCh7Y29sb3I6ICcjMDAzJ30pOyAgIC8vIEJpbmRpbmcgaW5kZXg6IDIwXG4gKiAgICAgybXJtXN0eWxlUHJvcCgnY29sb3InLCAnIzAwNCcpOyAgLy8gQmluZGluZyBpbmRleDogMjJcbiAqIC8vIFN0eWxlMURpcmVjdGl2ZVxuICogICAgIMm1ybVzdHlsZU1hcCh7Y29sb3I6ICcjMDA1J30pOyAgIC8vIEJpbmRpbmcgaW5kZXg6IDI0XG4gKiAgICAgybXJtXN0eWxlUHJvcCgnY29sb3InLCAnIzAwNicpOyAgLy8gQmluZGluZyBpbmRleDogMjZcbiAqIC8vIFN0eWxlMkRpcmVjdGl2ZVxuICogICAgIMm1ybVzdHlsZU1hcCh7Y29sb3I6ICcjMDA3J30pOyAgIC8vIEJpbmRpbmcgaW5kZXg6IDI4XG4gKiAgICAgybXJtXN0eWxlUHJvcCgnY29sb3InLCAnIzAwOCcpOyAgLy8gQmluZGluZyBpbmRleDogMzBcbiAqIGBgYFxuICpcbiAqIFRoZSBjb3JyZWN0IHByaW9yaXR5IG9yZGVyIG9mIGNvbmNhdGVuYXRpb24gaXM6XG4gKlxuICogYGBgXG4gKiAvLyBNeUNvbXBvbmVudFxuICogICAgIMm1ybVzdHlsZU1hcCh7Y29sb3I6ICcjMDAzJ30pOyAgIC8vIEJpbmRpbmcgaW5kZXg6IDIwXG4gKiAgICAgybXJtXN0eWxlUHJvcCgnY29sb3InLCAnIzAwNCcpOyAgLy8gQmluZGluZyBpbmRleDogMjJcbiAqIC8vIFN0eWxlMURpcmVjdGl2ZVxuICogICAgIMm1ybVzdHlsZU1hcCh7Y29sb3I6ICcjMDA1J30pOyAgIC8vIEJpbmRpbmcgaW5kZXg6IDI0XG4gKiAgICAgybXJtXN0eWxlUHJvcCgnY29sb3InLCAnIzAwNicpOyAgLy8gQmluZGluZyBpbmRleDogMjZcbiAqIC8vIFN0eWxlMkRpcmVjdGl2ZVxuICogICAgIMm1ybVzdHlsZU1hcCh7Y29sb3I6ICcjMDA3J30pOyAgIC8vIEJpbmRpbmcgaW5kZXg6IDI4XG4gKiAgICAgybXJtXN0eWxlUHJvcCgnY29sb3InLCAnIzAwOCcpOyAgLy8gQmluZGluZyBpbmRleDogMzBcbiAqIC8vIFRlbXBsYXRlOiAoRXhhbXBsZUNvbXBvbmVudClcbiAqICAgICDJtcm1c3R5bGVNYXAoe2NvbG9yOiAnIzAwMSd9KTsgICAvLyBCaW5kaW5nIGluZGV4OiAxMFxuICogICAgIMm1ybVzdHlsZVByb3AoJ2NvbG9yJywgJyMwMDInKTsgIC8vIEJpbmRpbmcgaW5kZXg6IDEyXG4gKiBgYGBcbiAqXG4gKiBXaGF0IGNvbG9yIHNob3VsZCBiZSByZW5kZXJlZD9cbiAqXG4gKiBPbmNlIHRoZSBpdGVtcyBhcmUgY29ycmVjdGx5IHNvcnRlZCBpbiB0aGUgbGlzdCwgdGhlIGFuc3dlciBpcyBzaW1wbHkgdGhlIGxhc3QgaXRlbSBpbiB0aGVcbiAqIGNvbmNhdGVuYXRpb24gbGlzdCB3aGljaCBpcyBgIzAwMmAuXG4gKlxuICogVG8gZG8gc28gd2Uga2VlcCBhIGxpbmtlZCBsaXN0IG9mIGFsbCBvZiB0aGUgYmluZGluZ3Mgd2hpY2ggcGVydGFpbiB0byB0aGlzIGVsZW1lbnQuXG4gKiBOb3RpY2UgdGhhdCB0aGUgYmluZGluZ3MgYXJlIGluc2VydGVkIGluIHRoZSBvcmRlciBvZiBleGVjdXRpb24sIGJ1dCB0aGUgYFRWaWV3LmRhdGFgIGFsbG93c1xuICogdXMgdG8gdHJhdmVyc2UgdGhlbSBpbiB0aGUgb3JkZXIgb2YgcHJpb3JpdHkuXG4gKlxuICogfElkeHxgVFZpZXcuZGF0YWB8YExWaWV3YCAgICAgICAgICB8IE5vdGVzXG4gKiB8LS0tfC0tLS0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLVxuICogfC4uLnwgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICB8XG4gKiB8MTAgfGBudWxsYCAgICAgIHxge2NvbG9yOiAnIzAwMSd9YHwgYMm1ybVzdHlsZU1hcCgnY29sb3InLCB7Y29sb3I6ICcjMDAxJ30pYFxuICogfDExIHxgMzAgfCAxMmAgICB8IC4uLiAgICAgICAgICAgICB8XG4gKiB8MTIgfGBjb2xvcmAgICAgIHxgJyMwMDInYCAgICAgICAgIHwgYMm1ybVzdHlsZVByb3AoJ2NvbG9yJywgJyMwMDInKWBcbiAqIHwxMyB8YDEwIHwgMGAgICAgfCAuLi4gICAgICAgICAgICAgfFxuICogfC4uLnwgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICB8XG4gKiB8MjAgfGBudWxsYCAgICAgIHxge2NvbG9yOiAnIzAwMyd9YHwgYMm1ybVzdHlsZU1hcCgnY29sb3InLCB7Y29sb3I6ICcjMDAzJ30pYFxuICogfDIxIHxgMCB8IDIyYCAgICB8IC4uLiAgICAgICAgICAgICB8XG4gKiB8MjIgfGBjb2xvcmAgICAgIHxgJyMwMDQnYCAgICAgICAgIHwgYMm1ybVzdHlsZVByb3AoJ2NvbG9yJywgJyMwMDQnKWBcbiAqIHwyMyB8YDIwIHwgMjRgICAgfCAuLi4gICAgICAgICAgICAgfFxuICogfDI0IHxgbnVsbGAgICAgICB8YHtjb2xvcjogJyMwMDUnfWB8IGDJtcm1c3R5bGVNYXAoJ2NvbG9yJywge2NvbG9yOiAnIzAwNSd9KWBcbiAqIHwyNSB8YDIyIHwgMjZgICAgfCAuLi4gICAgICAgICAgICAgfFxuICogfDI2IHxgY29sb3JgICAgICB8YCcjMDA2J2AgICAgICAgICB8IGDJtcm1c3R5bGVQcm9wKCdjb2xvcicsICcjMDA2JylgXG4gKiB8MjcgfGAyNCB8IDI4YCAgIHwgLi4uICAgICAgICAgICAgIHxcbiAqIHwyOCB8YG51bGxgICAgICAgfGB7Y29sb3I6ICcjMDA3J31gfCBgybXJtXN0eWxlTWFwKCdjb2xvcicsIHtjb2xvcjogJyMwMDcnfSlgXG4gKiB8MjkgfGAyNiB8IDMwYCAgIHwgLi4uICAgICAgICAgICAgIHxcbiAqIHwzMCB8YGNvbG9yYCAgICAgfGAnIzAwOCdgICAgICAgICAgfCBgybXJtXN0eWxlUHJvcCgnY29sb3InLCAnIzAwOCcpYFxuICogfDMxIHxgMjggfCAxMGAgICB8IC4uLiAgICAgICAgICAgICB8XG4gKlxuICogVGhlIGFib3ZlIGRhdGEgc3RydWN0dXJlIGFsbG93cyB1cyB0byByZS1jb25jYXRlbmF0ZSB0aGUgc3R5bGluZyBubyBtYXR0ZXIgd2hpY2ggZGF0YSBiaW5kaW5nXG4gKiBjaGFuZ2VzLlxuICpcbiAqIE5PVEU6IGluIGFkZGl0aW9uIHRvIGtlZXBpbmcgdHJhY2sgb2YgbmV4dC9wcmV2aW91cyBpbmRleCB0aGUgYFRWaWV3LmRhdGFgIGFsc28gc3RvcmVzIHByZXYvbmV4dFxuICogZHVwbGljYXRlIGJpdC4gVGhlIGR1cGxpY2F0ZSBiaXQgaWYgdHJ1ZSBzYXlzIHRoZXJlIGVpdGhlciBpcyBhIGJpbmRpbmcgd2l0aCB0aGUgc2FtZSBuYW1lIG9yXG4gKiB0aGVyZSBpcyBhIG1hcCAod2hpY2ggbWF5IGNvbnRhaW4gdGhlIG5hbWUpLiBUaGlzIGluZm9ybWF0aW9uIGlzIHVzZWZ1bCBpbiBrbm93aW5nIGlmIG90aGVyXG4gKiBzdHlsZXMgd2l0aCBoaWdoZXIgcHJpb3JpdHkgbmVlZCB0byBiZSBzZWFyY2hlZCBmb3Igb3ZlcndyaXRlcy5cbiAqXG4gKiBOT1RFOiBTZWUgYHNob3VsZCBzdXBwb3J0IGV4YW1wbGUgaW4gJ3Rub2RlX2xpbmtlZF9saXN0LnRzJyBkb2N1bWVudGF0aW9uYCBpblxuICogYHRub2RlX2xpbmtlZF9saXN0X3NwZWMudHNgIGZvciB3b3JraW5nIGV4YW1wbGUuXG4gKi9cbmxldCBfX3VudXNlZF9jb25zdF9hc19jbG9zdXJlX2RvZXNfbm90X2xpa2Vfc3RhbmRhbG9uZV9jb21tZW50X2Jsb2Nrc19fOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogSW5zZXJ0IG5ldyBgdFN0eWxlVmFsdWVgIGF0IGBURGF0YWAgYW5kIGxpbmsgZXhpc3Rpbmcgc3R5bGUgYmluZGluZ3Mgc3VjaCB0aGF0IHdlIG1haW50YWluIGxpbmtlZFxuICogbGlzdCBvZiBzdHlsZXMgYW5kIGNvbXB1dGUgdGhlIGR1cGxpY2F0ZSBmbGFnLlxuICpcbiAqIE5vdGU6IHRoaXMgZnVuY3Rpb24gaXMgZXhlY3V0ZWQgZHVyaW5nIGBmaXJzdFVwZGF0ZVBhc3NgIG9ubHkgdG8gcG9wdWxhdGUgdGhlIGBUVmlldy5kYXRhYC5cbiAqXG4gKiBUaGUgZnVuY3Rpb24gd29ya3MgYnkga2VlcGluZyB0cmFjayBvZiBgdFN0eWxpbmdSYW5nZWAgd2hpY2ggY29udGFpbnMgdHdvIHBvaW50ZXJzIHBvaW50aW5nIHRvXG4gKiB0aGUgaGVhZC90YWlsIG9mIHRoZSB0ZW1wbGF0ZSBwb3J0aW9uIG9mIHRoZSBzdHlsZXMuXG4gKiAgLSBpZiBgaXNIb3N0ID09PSBmYWxzZWAgKHdlIGFyZSB0ZW1wbGF0ZSkgdGhlbiBpbnNlcnRpb24gaXMgYXQgdGFpbCBvZiBgVFN0eWxpbmdSYW5nZWBcbiAqICAtIGlmIGBpc0hvc3QgPT09IHRydWVgICh3ZSBhcmUgaG9zdCBiaW5kaW5nKSB0aGVuIGluc2VydGlvbiBpcyBhdCBoZWFkIG9mIGBUU3R5bGluZ1JhbmdlYFxuICpcbiAqIEBwYXJhbSB0RGF0YSBUaGUgYFREYXRhYCB0byBpbnNlcnQgaW50by5cbiAqIEBwYXJhbSB0Tm9kZSBgVE5vZGVgIGFzc29jaWF0ZWQgd2l0aCB0aGUgc3R5bGluZyBlbGVtZW50LlxuICogQHBhcmFtIHRTdHlsaW5nS2V5IFNlZSBgVFN0eWxpbmdLZXlgLlxuICogQHBhcmFtIGluZGV4IGxvY2F0aW9uIG9mIHdoZXJlIGB0U3R5bGVWYWx1ZWAgc2hvdWxkIGJlIHN0b3JlZCAoYW5kIGxpbmtlZCBpbnRvIGxpc3QuKVxuICogQHBhcmFtIGlzSG9zdEJpbmRpbmcgYHRydWVgIGlmIHRoZSBpbnNlcnRpb24gaXMgZm9yIGEgYGhvc3RCaW5kaW5nYC4gKGluc2VydGlvbiBpcyBpbiBmcm9udCBvZlxuICogICAgICAgICAgICAgICB0ZW1wbGF0ZS4pXG4gKiBAcGFyYW0gaXNDbGFzc0JpbmRpbmcgVHJ1ZSBpZiB0aGUgYXNzb2NpYXRlZCBgdFN0eWxpbmdLZXlgIGFzIGEgYGNsYXNzYCBzdHlsaW5nLlxuICogICAgICAgICAgICAgICAgICAgICAgIGB0Tm9kZS5jbGFzc0JpbmRpbmdzYCBzaG91bGQgYmUgdXNlZCAob3IgYHROb2RlLnN0eWxlQmluZGluZ3NgIG90aGVyd2lzZS4pXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRUU3R5bGluZ0JpbmRpbmcoXG4gICAgdERhdGE6IFREYXRhLCB0Tm9kZTogVE5vZGUsIHRTdHlsaW5nS2V5V2l0aFN0YXRpYzogVFN0eWxpbmdLZXksIGluZGV4OiBudW1iZXIsXG4gICAgaXNIb3N0QmluZGluZzogYm9vbGVhbiwgaXNDbGFzc0JpbmRpbmc6IGJvb2xlYW4pOiB2b2lkIHtcbiAgbmdEZXZNb2RlICYmIGFzc2VydEZpcnN0VXBkYXRlUGFzcyhnZXRUVmlldygpKTtcbiAgbGV0IHRCaW5kaW5ncyA9IGlzQ2xhc3NCaW5kaW5nID8gdE5vZGUuY2xhc3NCaW5kaW5ncyA6IHROb2RlLnN0eWxlQmluZGluZ3M7XG4gIGxldCB0bXBsSGVhZCA9IGdldFRTdHlsaW5nUmFuZ2VQcmV2KHRCaW5kaW5ncyk7XG4gIGxldCB0bXBsVGFpbCA9IGdldFRTdHlsaW5nUmFuZ2VOZXh0KHRCaW5kaW5ncyk7XG5cbiAgdERhdGFbaW5kZXhdID0gdFN0eWxpbmdLZXlXaXRoU3RhdGljO1xuICBsZXQgaXNLZXlEdXBsaWNhdGVPZlN0YXRpYyA9IGZhbHNlO1xuICBsZXQgdFN0eWxpbmdLZXk6IFRTdHlsaW5nS2V5UHJpbWl0aXZlO1xuICBpZiAoQXJyYXkuaXNBcnJheSh0U3R5bGluZ0tleVdpdGhTdGF0aWMpKSB7XG4gICAgLy8gV2UgYXJlIGNhc2Ugd2hlbiB0aGUgYFRTdHlsaW5nS2V5YCBjb250YWlucyBzdGF0aWMgZmllbGRzIGFzIHdlbGwuXG4gICAgY29uc3Qgc3RhdGljS2V5VmFsdWVBcnJheSA9IHRTdHlsaW5nS2V5V2l0aFN0YXRpYyBhcyBLZXlWYWx1ZUFycmF5PGFueT47XG4gICAgdFN0eWxpbmdLZXkgPSBzdGF0aWNLZXlWYWx1ZUFycmF5WzFdOyAgLy8gdW53cmFwLlxuICAgIC8vIFdlIG5lZWQgdG8gY2hlY2sgaWYgb3VyIGtleSBpcyBwcmVzZW50IGluIHRoZSBzdGF0aWMgc28gdGhhdCB3ZSBjYW4gbWFyayBpdCBhcyBkdXBsaWNhdGUuXG4gICAgaWYgKHRTdHlsaW5nS2V5ID09PSBudWxsIHx8XG4gICAgICAgIGtleVZhbHVlQXJyYXlJbmRleE9mKHN0YXRpY0tleVZhbHVlQXJyYXksIHRTdHlsaW5nS2V5IGFzIHN0cmluZykgPiAwKSB7XG4gICAgICAvLyB0U3R5bGluZ0tleSBpcyBwcmVzZW50IGluIHRoZSBzdGF0aWNzLCBuZWVkIHRvIG1hcmsgaXQgYXMgZHVwbGljYXRlLlxuICAgICAgaXNLZXlEdXBsaWNhdGVPZlN0YXRpYyA9IHRydWU7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRTdHlsaW5nS2V5ID0gdFN0eWxpbmdLZXlXaXRoU3RhdGljO1xuICB9XG4gIGlmIChpc0hvc3RCaW5kaW5nKSB7XG4gICAgLy8gV2UgYXJlIGluc2VydGluZyBob3N0IGJpbmRpbmdzXG5cbiAgICAvLyBJZiB3ZSBkb24ndCBoYXZlIHRlbXBsYXRlIGJpbmRpbmdzIHRoZW4gYHRhaWxgIGlzIDAuXG4gICAgY29uc3QgaGFzVGVtcGxhdGVCaW5kaW5ncyA9IHRtcGxUYWlsICE9PSAwO1xuICAgIC8vIFRoaXMgaXMgaW1wb3J0YW50IHRvIGtub3cgYmVjYXVzZSB0aGF0IG1lYW5zIHRoYXQgdGhlIGBoZWFkYCBjYW4ndCBwb2ludCB0byB0aGUgZmlyc3RcbiAgICAvLyB0ZW1wbGF0ZSBiaW5kaW5ncyAodGhlcmUgYXJlIG5vbmUuKSBJbnN0ZWFkIHRoZSBoZWFkIHBvaW50cyB0byB0aGUgdGFpbCBvZiB0aGUgdGVtcGxhdGUuXG4gICAgaWYgKGhhc1RlbXBsYXRlQmluZGluZ3MpIHtcbiAgICAgIC8vIHRlbXBsYXRlIGhlYWQncyBcInByZXZcIiB3aWxsIHBvaW50IHRvIGxhc3QgaG9zdCBiaW5kaW5nIG9yIHRvIDAgaWYgbm8gaG9zdCBiaW5kaW5ncyB5ZXRcbiAgICAgIGNvbnN0IHByZXZpb3VzTm9kZSA9IGdldFRTdHlsaW5nUmFuZ2VQcmV2KHREYXRhW3RtcGxIZWFkICsgMV0gYXMgVFN0eWxpbmdSYW5nZSk7XG4gICAgICB0RGF0YVtpbmRleCArIDFdID0gdG9UU3R5bGluZ1JhbmdlKHByZXZpb3VzTm9kZSwgdG1wbEhlYWQpO1xuICAgICAgLy8gaWYgYSBob3N0IGJpbmRpbmcgaGFzIGFscmVhZHkgYmVlbiByZWdpc3RlcmVkLCB3ZSBuZWVkIHRvIHVwZGF0ZSB0aGUgbmV4dCBvZiB0aGF0IGhvc3RcbiAgICAgIC8vIGJpbmRpbmcgdG8gcG9pbnQgdG8gdGhpcyBvbmVcbiAgICAgIGlmIChwcmV2aW91c05vZGUgIT09IDApIHtcbiAgICAgICAgLy8gV2UgbmVlZCB0byB1cGRhdGUgdGhlIHRlbXBsYXRlLXRhaWwgdmFsdWUgdG8gcG9pbnQgdG8gdXMuXG4gICAgICAgIHREYXRhW3ByZXZpb3VzTm9kZSArIDFdID1cbiAgICAgICAgICAgIHNldFRTdHlsaW5nUmFuZ2VOZXh0KHREYXRhW3ByZXZpb3VzTm9kZSArIDFdIGFzIFRTdHlsaW5nUmFuZ2UsIGluZGV4KTtcbiAgICAgIH1cbiAgICAgIC8vIFRoZSBcInByZXZpb3VzXCIgb2YgdGhlIHRlbXBsYXRlIGJpbmRpbmcgaGVhZCBzaG91bGQgcG9pbnQgdG8gdGhpcyBob3N0IGJpbmRpbmdcbiAgICAgIHREYXRhW3RtcGxIZWFkICsgMV0gPSBzZXRUU3R5bGluZ1JhbmdlUHJldih0RGF0YVt0bXBsSGVhZCArIDFdIGFzIFRTdHlsaW5nUmFuZ2UsIGluZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdERhdGFbaW5kZXggKyAxXSA9IHRvVFN0eWxpbmdSYW5nZSh0bXBsSGVhZCwgMCk7XG4gICAgICAvLyBpZiBhIGhvc3QgYmluZGluZyBoYXMgYWxyZWFkeSBiZWVuIHJlZ2lzdGVyZWQsIHdlIG5lZWQgdG8gdXBkYXRlIHRoZSBuZXh0IG9mIHRoYXQgaG9zdFxuICAgICAgLy8gYmluZGluZyB0byBwb2ludCB0byB0aGlzIG9uZVxuICAgICAgaWYgKHRtcGxIZWFkICE9PSAwKSB7XG4gICAgICAgIC8vIFdlIG5lZWQgdG8gdXBkYXRlIHRoZSB0ZW1wbGF0ZS10YWlsIHZhbHVlIHRvIHBvaW50IHRvIHVzLlxuICAgICAgICB0RGF0YVt0bXBsSGVhZCArIDFdID0gc2V0VFN0eWxpbmdSYW5nZU5leHQodERhdGFbdG1wbEhlYWQgKyAxXSBhcyBUU3R5bGluZ1JhbmdlLCBpbmRleCk7XG4gICAgICB9XG4gICAgICAvLyBpZiB3ZSBkb24ndCBoYXZlIHRlbXBsYXRlLCB0aGUgaGVhZCBwb2ludHMgdG8gdGVtcGxhdGUtdGFpbCwgYW5kIG5lZWRzIHRvIGJlIGFkdmFuY2VkLlxuICAgICAgdG1wbEhlYWQgPSBpbmRleDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gV2UgYXJlIGluc2VydGluZyBpbiB0ZW1wbGF0ZSBzZWN0aW9uLlxuICAgIC8vIFdlIG5lZWQgdG8gc2V0IHRoaXMgYmluZGluZydzIFwicHJldmlvdXNcIiB0byB0aGUgY3VycmVudCB0ZW1wbGF0ZSB0YWlsXG4gICAgdERhdGFbaW5kZXggKyAxXSA9IHRvVFN0eWxpbmdSYW5nZSh0bXBsVGFpbCwgMCk7XG4gICAgbmdEZXZNb2RlICYmXG4gICAgICAgIGFzc2VydEVxdWFsKFxuICAgICAgICAgICAgdG1wbEhlYWQgIT09IDAgJiYgdG1wbFRhaWwgPT09IDAsIGZhbHNlLFxuICAgICAgICAgICAgJ0FkZGluZyB0ZW1wbGF0ZSBiaW5kaW5ncyBhZnRlciBob3N0QmluZGluZ3MgaXMgbm90IGFsbG93ZWQuJyk7XG4gICAgaWYgKHRtcGxIZWFkID09PSAwKSB7XG4gICAgICB0bXBsSGVhZCA9IGluZGV4O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBXZSBuZWVkIHRvIHVwZGF0ZSB0aGUgcHJldmlvdXMgdmFsdWUgXCJuZXh0XCIgdG8gcG9pbnQgdG8gdGhpcyBiaW5kaW5nXG4gICAgICB0RGF0YVt0bXBsVGFpbCArIDFdID0gc2V0VFN0eWxpbmdSYW5nZU5leHQodERhdGFbdG1wbFRhaWwgKyAxXSBhcyBUU3R5bGluZ1JhbmdlLCBpbmRleCk7XG4gICAgfVxuICAgIHRtcGxUYWlsID0gaW5kZXg7XG4gIH1cblxuICAvLyBOb3cgd2UgbmVlZCB0byB1cGRhdGUgLyBjb21wdXRlIHRoZSBkdXBsaWNhdGVzLlxuICAvLyBTdGFydGluZyB3aXRoIG91ciBsb2NhdGlvbiBzZWFyY2ggdG93YXJkcyBoZWFkIChsZWFzdCBwcmlvcml0eSlcbiAgaWYgKGlzS2V5RHVwbGljYXRlT2ZTdGF0aWMpIHtcbiAgICB0RGF0YVtpbmRleCArIDFdID0gc2V0VFN0eWxpbmdSYW5nZVByZXZEdXBsaWNhdGUodERhdGFbaW5kZXggKyAxXSBhcyBUU3R5bGluZ1JhbmdlKTtcbiAgfVxuICBtYXJrRHVwbGljYXRlcyh0RGF0YSwgdFN0eWxpbmdLZXksIGluZGV4LCB0cnVlKTtcbiAgbWFya0R1cGxpY2F0ZXModERhdGEsIHRTdHlsaW5nS2V5LCBpbmRleCwgZmFsc2UpO1xuICBtYXJrRHVwbGljYXRlT2ZSZXNpZHVhbFN0eWxpbmcodE5vZGUsIHRTdHlsaW5nS2V5LCB0RGF0YSwgaW5kZXgsIGlzQ2xhc3NCaW5kaW5nKTtcblxuICB0QmluZGluZ3MgPSB0b1RTdHlsaW5nUmFuZ2UodG1wbEhlYWQsIHRtcGxUYWlsKTtcbiAgaWYgKGlzQ2xhc3NCaW5kaW5nKSB7XG4gICAgdE5vZGUuY2xhc3NCaW5kaW5ncyA9IHRCaW5kaW5ncztcbiAgfSBlbHNlIHtcbiAgICB0Tm9kZS5zdHlsZUJpbmRpbmdzID0gdEJpbmRpbmdzO1xuICB9XG59XG5cbi8qKlxuICogTG9vayBpbnRvIHRoZSByZXNpZHVhbCBzdHlsaW5nIHRvIHNlZSBpZiB0aGUgY3VycmVudCBgdFN0eWxpbmdLZXlgIGlzIGR1cGxpY2F0ZSBvZiByZXNpZHVhbC5cbiAqXG4gKiBAcGFyYW0gdE5vZGUgYFROb2RlYCB3aGVyZSB0aGUgcmVzaWR1YWwgaXMgc3RvcmVkLlxuICogQHBhcmFtIHRTdHlsaW5nS2V5IGBUU3R5bGluZ0tleWAgdG8gc3RvcmUuXG4gKiBAcGFyYW0gdERhdGEgYFREYXRhYCBhc3NvY2lhdGVkIHdpdGggdGhlIGN1cnJlbnQgYExWaWV3YC5cbiAqIEBwYXJhbSBpbmRleCBsb2NhdGlvbiBvZiB3aGVyZSBgdFN0eWxlVmFsdWVgIHNob3VsZCBiZSBzdG9yZWQgKGFuZCBsaW5rZWQgaW50byBsaXN0LilcbiAqIEBwYXJhbSBpc0NsYXNzQmluZGluZyBUcnVlIGlmIHRoZSBhc3NvY2lhdGVkIGB0U3R5bGluZ0tleWAgYXMgYSBgY2xhc3NgIHN0eWxpbmcuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgYHROb2RlLmNsYXNzQmluZGluZ3NgIHNob3VsZCBiZSB1c2VkIChvciBgdE5vZGUuc3R5bGVCaW5kaW5nc2Agb3RoZXJ3aXNlLilcbiAqL1xuZnVuY3Rpb24gbWFya0R1cGxpY2F0ZU9mUmVzaWR1YWxTdHlsaW5nKFxuICAgIHROb2RlOiBUTm9kZSwgdFN0eWxpbmdLZXk6IFRTdHlsaW5nS2V5LCB0RGF0YTogVERhdGEsIGluZGV4OiBudW1iZXIsIGlzQ2xhc3NCaW5kaW5nOiBib29sZWFuKSB7XG4gIGNvbnN0IHJlc2lkdWFsID0gaXNDbGFzc0JpbmRpbmcgPyB0Tm9kZS5yZXNpZHVhbENsYXNzZXMgOiB0Tm9kZS5yZXNpZHVhbFN0eWxlcztcbiAgaWYgKHJlc2lkdWFsICE9IG51bGwgLyogb3IgdW5kZWZpbmVkICovICYmIHR5cGVvZiB0U3R5bGluZ0tleSA9PSAnc3RyaW5nJyAmJlxuICAgICAga2V5VmFsdWVBcnJheUluZGV4T2YocmVzaWR1YWwsIHRTdHlsaW5nS2V5KSA+PSAwKSB7XG4gICAgLy8gV2UgaGF2ZSBkdXBsaWNhdGUgaW4gdGhlIHJlc2lkdWFsIHNvIG1hcmsgb3Vyc2VsdmVzIGFzIGR1cGxpY2F0ZS5cbiAgICB0RGF0YVtpbmRleCArIDFdID0gc2V0VFN0eWxpbmdSYW5nZU5leHREdXBsaWNhdGUodERhdGFbaW5kZXggKyAxXSBhcyBUU3R5bGluZ1JhbmdlKTtcbiAgfVxufVxuXG5cbi8qKlxuICogTWFya3MgYFRTdHlsZVZhbHVlYHMgYXMgZHVwbGljYXRlcyBpZiBhbm90aGVyIHN0eWxlIGJpbmRpbmcgaW4gdGhlIGxpc3QgaGFzIHRoZSBzYW1lXG4gKiBgVFN0eWxlVmFsdWVgLlxuICpcbiAqIE5PVEU6IHRoaXMgZnVuY3Rpb24gaXMgaW50ZW5kZWQgdG8gYmUgY2FsbGVkIHR3aWNlIG9uY2Ugd2l0aCBgaXNQcmV2RGlyYCBzZXQgdG8gYHRydWVgIGFuZCBvbmNlXG4gKiB3aXRoIGl0IHNldCB0byBgZmFsc2VgIHRvIHNlYXJjaCBib3RoIHRoZSBwcmV2aW91cyBhcyB3ZWxsIGFzIG5leHQgaXRlbXMgaW4gdGhlIGxpc3QuXG4gKlxuICogTm8gZHVwbGljYXRlIGNhc2VcbiAqIGBgYFxuICogICBbc3R5bGUuY29sb3JdXG4gKiAgIFtzdHlsZS53aWR0aC5weF0gPDwtIGluZGV4XG4gKiAgIFtzdHlsZS5oZWlnaHQucHhdXG4gKiBgYGBcbiAqXG4gKiBJbiB0aGUgYWJvdmUgY2FzZSBhZGRpbmcgYFtzdHlsZS53aWR0aC5weF1gIHRvIHRoZSBleGlzdGluZyBgW3N0eWxlLmNvbG9yXWAgcHJvZHVjZXMgbm9cbiAqIGR1cGxpY2F0ZXMgYmVjYXVzZSBgd2lkdGhgIGlzIG5vdCBmb3VuZCBpbiBhbnkgb3RoZXIgcGFydCBvZiB0aGUgbGlua2VkIGxpc3QuXG4gKlxuICogRHVwbGljYXRlIGNhc2VcbiAqIGBgYFxuICogICBbc3R5bGUuY29sb3JdXG4gKiAgIFtzdHlsZS53aWR0aC5lbV1cbiAqICAgW3N0eWxlLndpZHRoLnB4XSA8PC0gaW5kZXhcbiAqIGBgYFxuICogSW4gdGhlIGFib3ZlIGNhc2UgYWRkaW5nIGBbc3R5bGUud2lkdGgucHhdYCB3aWxsIHByb2R1Y2UgYSBkdXBsaWNhdGUgd2l0aCBgW3N0eWxlLndpZHRoLmVtXWBcbiAqIGJlY2F1c2UgYHdpZHRoYCBpcyBmb3VuZCBpbiB0aGUgY2hhaW4uXG4gKlxuICogTWFwIGNhc2UgMVxuICogYGBgXG4gKiAgIFtzdHlsZS53aWR0aC5weF1cbiAqICAgW3N0eWxlLmNvbG9yXVxuICogICBbc3R5bGVdICA8PC0gaW5kZXhcbiAqIGBgYFxuICogSW4gdGhlIGFib3ZlIGNhc2UgYWRkaW5nIGBbc3R5bGVdYCB3aWxsIHByb2R1Y2UgYSBkdXBsaWNhdGUgd2l0aCBhbnkgb3RoZXIgYmluZGluZ3MgYmVjYXVzZVxuICogYFtzdHlsZV1gIGlzIGEgTWFwIGFuZCBhcyBzdWNoIGlzIGZ1bGx5IGR5bmFtaWMgYW5kIGNvdWxkIHByb2R1Y2UgYGNvbG9yYCBvciBgd2lkdGhgLlxuICpcbiAqIE1hcCBjYXNlIDJcbiAqIGBgYFxuICogICBbc3R5bGVdXG4gKiAgIFtzdHlsZS53aWR0aC5weF1cbiAqICAgW3N0eWxlLmNvbG9yXSAgPDwtIGluZGV4XG4gKiBgYGBcbiAqIEluIHRoZSBhYm92ZSBjYXNlIGFkZGluZyBgW3N0eWxlLmNvbG9yXWAgd2lsbCBwcm9kdWNlIGEgZHVwbGljYXRlIGJlY2F1c2UgdGhlcmUgaXMgYWxyZWFkeSBhXG4gKiBgW3N0eWxlXWAgYmluZGluZyB3aGljaCBpcyBhIE1hcCBhbmQgYXMgc3VjaCBpcyBmdWxseSBkeW5hbWljIGFuZCBjb3VsZCBwcm9kdWNlIGBjb2xvcmAgb3JcbiAqIGB3aWR0aGAuXG4gKlxuICogTk9URTogT25jZSBgW3N0eWxlXWAgKE1hcCkgaXMgYWRkZWQgaW50byB0aGUgc3lzdGVtIGFsbCB0aGluZ3MgYXJlIG1hcHBlZCBhcyBkdXBsaWNhdGVzLlxuICogTk9URTogV2UgdXNlIGBzdHlsZWAgYXMgZXhhbXBsZSwgYnV0IHNhbWUgbG9naWMgaXMgYXBwbGllZCB0byBgY2xhc3NgZXMgYXMgd2VsbC5cbiAqXG4gKiBAcGFyYW0gdERhdGEgYFREYXRhYCB3aGVyZSB0aGUgbGlua2VkIGxpc3QgaXMgc3RvcmVkLlxuICogQHBhcmFtIHRTdHlsaW5nS2V5IGBUU3R5bGluZ0tleVByaW1pdGl2ZWAgd2hpY2ggY29udGFpbnMgdGhlIHZhbHVlIHRvIGNvbXBhcmUgdG8gb3RoZXIga2V5cyBpblxuICogICAgICAgIHRoZSBsaW5rZWQgbGlzdC5cbiAqIEBwYXJhbSBpbmRleCBTdGFydGluZyBsb2NhdGlvbiBpbiB0aGUgbGlua2VkIGxpc3QgdG8gc2VhcmNoIGZyb21cbiAqIEBwYXJhbSBpc1ByZXZEaXIgRGlyZWN0aW9uLlxuICogICAgICAgIC0gYHRydWVgIGZvciBwcmV2aW91cyAobG93ZXIgcHJpb3JpdHkpO1xuICogICAgICAgIC0gYGZhbHNlYCBmb3IgbmV4dCAoaGlnaGVyIHByaW9yaXR5KS5cbiAqL1xuZnVuY3Rpb24gbWFya0R1cGxpY2F0ZXMoXG4gICAgdERhdGE6IFREYXRhLFxuICAgIHRTdHlsaW5nS2V5OiBUU3R5bGluZ0tleVByaW1pdGl2ZSxcbiAgICBpbmRleDogbnVtYmVyLFxuICAgIGlzUHJldkRpcjogYm9vbGVhbixcbikge1xuICBjb25zdCB0U3R5bGluZ0F0SW5kZXggPSB0RGF0YVtpbmRleCArIDFdIGFzIFRTdHlsaW5nUmFuZ2U7XG4gIGNvbnN0IGlzTWFwID0gdFN0eWxpbmdLZXkgPT09IG51bGw7XG4gIGxldCBjdXJzb3IgPVxuICAgICAgaXNQcmV2RGlyID8gZ2V0VFN0eWxpbmdSYW5nZVByZXYodFN0eWxpbmdBdEluZGV4KSA6IGdldFRTdHlsaW5nUmFuZ2VOZXh0KHRTdHlsaW5nQXRJbmRleCk7XG4gIGxldCBmb3VuZER1cGxpY2F0ZSA9IGZhbHNlO1xuICAvLyBXZSBrZWVwIGl0ZXJhdGluZyBhcyBsb25nIGFzIHdlIGhhdmUgYSBjdXJzb3JcbiAgLy8gQU5EIGVpdGhlcjpcbiAgLy8gLSB3ZSBmb3VuZCB3aGF0IHdlIGFyZSBsb29raW5nIGZvciwgT1JcbiAgLy8gLSB3ZSBhcmUgYSBtYXAgaW4gd2hpY2ggY2FzZSB3ZSBoYXZlIHRvIGNvbnRpbnVlIHNlYXJjaGluZyBldmVuIGFmdGVyIHdlIGZpbmQgd2hhdCB3ZSB3ZXJlXG4gIC8vICAgbG9va2luZyBmb3Igc2luY2Ugd2UgYXJlIGEgd2lsZCBjYXJkIGFuZCBldmVyeXRoaW5nIG5lZWRzIHRvIGJlIGZsaXBwZWQgdG8gZHVwbGljYXRlLlxuICB3aGlsZSAoY3Vyc29yICE9PSAwICYmIChmb3VuZER1cGxpY2F0ZSA9PT0gZmFsc2UgfHwgaXNNYXApKSB7XG4gICAgbmdEZXZNb2RlICYmIGFzc2VydEluZGV4SW5SYW5nZSh0RGF0YSwgY3Vyc29yKTtcbiAgICBjb25zdCB0U3R5bGluZ1ZhbHVlQXRDdXJzb3IgPSB0RGF0YVtjdXJzb3JdIGFzIFRTdHlsaW5nS2V5O1xuICAgIGNvbnN0IHRTdHlsZVJhbmdlQXRDdXJzb3IgPSB0RGF0YVtjdXJzb3IgKyAxXSBhcyBUU3R5bGluZ1JhbmdlO1xuICAgIGlmIChpc1N0eWxpbmdNYXRjaCh0U3R5bGluZ1ZhbHVlQXRDdXJzb3IsIHRTdHlsaW5nS2V5KSkge1xuICAgICAgZm91bmREdXBsaWNhdGUgPSB0cnVlO1xuICAgICAgdERhdGFbY3Vyc29yICsgMV0gPSBpc1ByZXZEaXIgPyBzZXRUU3R5bGluZ1JhbmdlTmV4dER1cGxpY2F0ZSh0U3R5bGVSYW5nZUF0Q3Vyc29yKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRTdHlsaW5nUmFuZ2VQcmV2RHVwbGljYXRlKHRTdHlsZVJhbmdlQXRDdXJzb3IpO1xuICAgIH1cbiAgICBjdXJzb3IgPSBpc1ByZXZEaXIgPyBnZXRUU3R5bGluZ1JhbmdlUHJldih0U3R5bGVSYW5nZUF0Q3Vyc29yKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgZ2V0VFN0eWxpbmdSYW5nZU5leHQodFN0eWxlUmFuZ2VBdEN1cnNvcik7XG4gIH1cbiAgaWYgKGZvdW5kRHVwbGljYXRlKSB7XG4gICAgLy8gaWYgd2UgZm91bmQgYSBkdXBsaWNhdGUsIHRoYW4gbWFyayBvdXJzZWx2ZXMuXG4gICAgdERhdGFbaW5kZXggKyAxXSA9IGlzUHJldkRpciA/IHNldFRTdHlsaW5nUmFuZ2VQcmV2RHVwbGljYXRlKHRTdHlsaW5nQXRJbmRleCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUU3R5bGluZ1JhbmdlTmV4dER1cGxpY2F0ZSh0U3R5bGluZ0F0SW5kZXgpO1xuICB9XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiB0d28gYFRTdHlsaW5nS2V5YHMgYXJlIGEgbWF0Y2guXG4gKlxuICogV2hlbiBjb21wdXRpbmcgd2hldGhlciBhIGJpbmRpbmcgY29udGFpbnMgYSBkdXBsaWNhdGUsIHdlIG5lZWQgdG8gY29tcGFyZSBpZiB0aGUgaW5zdHJ1Y3Rpb25cbiAqIGBUU3R5bGluZ0tleWAgaGFzIGEgbWF0Y2guXG4gKlxuICogSGVyZSBhcmUgZXhhbXBsZXMgb2YgYFRTdHlsaW5nS2V5YHMgd2hpY2ggbWF0Y2ggZ2l2ZW4gYHRTdHlsaW5nS2V5Q3Vyc29yYCBpczpcbiAqIC0gYGNvbG9yYFxuICogICAgLSBgY29sb3JgICAgIC8vIE1hdGNoIGFub3RoZXIgY29sb3JcbiAqICAgIC0gYG51bGxgICAgICAvLyBUaGF0IG1lYW5zIHRoYXQgYHRTdHlsaW5nS2V5YCBpcyBhIGBjbGFzc01hcGAvYHN0eWxlTWFwYCBpbnN0cnVjdGlvblxuICogICAgLSBgWycnLCAnY29sb3InLCAnb3RoZXInLCB0cnVlXWAgLy8gd3JhcHBlZCBgY29sb3JgIHNvIG1hdGNoXG4gKiAgICAtIGBbJycsIG51bGwsICdvdGhlcicsIHRydWVdYCAgICAgICAvLyB3cmFwcGVkIGBudWxsYCBzbyBtYXRjaFxuICogICAgLSBgWycnLCAnd2lkdGgnLCAnY29sb3InLCAndmFsdWUnXWAgLy8gd3JhcHBlZCBzdGF0aWMgdmFsdWUgY29udGFpbnMgYSBtYXRjaCBvbiBgJ2NvbG9yJ2BcbiAqIC0gYG51bGxgICAgICAgIC8vIGB0U3R5bGluZ0tleUN1cnNvcmAgYWx3YXlzIG1hdGNoIGFzIGl0IGlzIGBjbGFzc01hcGAvYHN0eWxlTWFwYCBpbnN0cnVjdGlvblxuICpcbiAqIEBwYXJhbSB0U3R5bGluZ0tleUN1cnNvclxuICogQHBhcmFtIHRTdHlsaW5nS2V5XG4gKi9cbmZ1bmN0aW9uIGlzU3R5bGluZ01hdGNoKHRTdHlsaW5nS2V5Q3Vyc29yOiBUU3R5bGluZ0tleSwgdFN0eWxpbmdLZXk6IFRTdHlsaW5nS2V5UHJpbWl0aXZlKSB7XG4gIG5nRGV2TW9kZSAmJlxuICAgICAgYXNzZXJ0Tm90RXF1YWwoXG4gICAgICAgICAgQXJyYXkuaXNBcnJheSh0U3R5bGluZ0tleSksIHRydWUsICdFeHBlY3RlZCB0aGF0IFxcJ3RTdHlsaW5nS2V5XFwnIGhhcyBiZWVuIHVud3JhcHBlZCcpO1xuICBpZiAoXG4gICAgICB0U3R5bGluZ0tleUN1cnNvciA9PT0gbnVsbCB8fCAgLy8gSWYgdGhlIGN1cnNvciBpcyBgbnVsbGAgaXQgbWVhbnMgdGhhdCB3ZSBoYXZlIG1hcCBhdCB0aGF0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbG9jYXRpb24gc28gd2UgbXVzdCBhc3N1bWUgdGhhdCB3ZSBoYXZlIGEgbWF0Y2guXG4gICAgICB0U3R5bGluZ0tleSA9PSBudWxsIHx8ICAvLyBJZiBgdFN0eWxpbmdLZXlgIGlzIGBudWxsYCB0aGVuIGl0IGlzIGEgbWFwIHRoZXJlZm9yIGFzc3VtZSB0aGF0IGl0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb250YWlucyBhIG1hdGNoLlxuICAgICAgKEFycmF5LmlzQXJyYXkodFN0eWxpbmdLZXlDdXJzb3IpID8gdFN0eWxpbmdLZXlDdXJzb3JbMV0gOiB0U3R5bGluZ0tleUN1cnNvcikgPT09XG4gICAgICAgICAgdFN0eWxpbmdLZXkgIC8vIElmIHRoZSBrZXlzIG1hdGNoIGV4cGxpY2l0bHkgdGhhbiB3ZSBhcmUgYSBtYXRjaC5cbiAgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0U3R5bGluZ0tleUN1cnNvcikgJiYgdHlwZW9mIHRTdHlsaW5nS2V5ID09PSAnc3RyaW5nJykge1xuICAgIC8vIGlmIHdlIGRpZCBub3QgZmluZCBhIG1hdGNoLCBidXQgYHRTdHlsaW5nS2V5Q3Vyc29yYCBpcyBgS2V5VmFsdWVBcnJheWAgdGhhdCBtZWFucyBjdXJzb3IgaGFzXG4gICAgLy8gc3RhdGljcyBhbmQgd2UgbmVlZCB0byBjaGVjayB0aG9zZSBhcyB3ZWxsLlxuICAgIHJldHVybiBrZXlWYWx1ZUFycmF5SW5kZXhPZih0U3R5bGluZ0tleUN1cnNvciwgdFN0eWxpbmdLZXkpID49XG4gICAgICAgIDA7ICAvLyBzZWUgaWYgd2UgYXJlIG1hdGNoaW5nIHRoZSBrZXlcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG4iXX0=