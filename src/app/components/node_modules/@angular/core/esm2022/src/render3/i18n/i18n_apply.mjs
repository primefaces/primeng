/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { RuntimeError } from '../../errors';
import { getPluralCase } from '../../i18n/localization';
import { assertDefined, assertDomNode, assertEqual, assertGreaterThan, assertIndexInRange, throwError } from '../../util/assert';
import { assertIndexInExpandoRange, assertTIcu } from '../assert';
import { attachPatchData } from '../context_discovery';
import { elementPropertyInternal, setElementAttribute } from '../instructions/shared';
import { ELEMENT_MARKER, I18nCreateOpCode, ICU_MARKER } from '../interfaces/i18n';
import { HEADER_OFFSET, RENDERER } from '../interfaces/view';
import { createCommentNode, createElementNode, createTextNode, nativeInsertBefore, nativeParentNode, nativeRemoveNode, updateTextNode } from '../node_manipulation';
import { getBindingIndex, lastNodeWasCreated, wasLastNodeCreated } from '../state';
import { renderStringify } from '../util/stringify_utils';
import { getNativeByIndex, unwrapRNode } from '../util/view_utils';
import { getLocaleId } from './i18n_locale_id';
import { getCurrentICUCaseIndex, getParentFromIcuCreateOpCode, getRefFromIcuCreateOpCode, getTIcu } from './i18n_util';
/**
 * Keep track of which input bindings in `ɵɵi18nExp` have changed.
 *
 * This is used to efficiently update expressions in i18n only when the corresponding input has
 * changed.
 *
 * 1) Each bit represents which of the `ɵɵi18nExp` has changed.
 * 2) There are 32 bits allowed in JS.
 * 3) Bit 32 is special as it is shared for all changes past 32. (In other words if you have more
 * than 32 `ɵɵi18nExp` then all changes past 32nd `ɵɵi18nExp` will be mapped to same bit. This means
 * that we may end up changing more than we need to. But i18n expressions with 32 bindings is rare
 * so in practice it should not be an issue.)
 */
let changeMask = 0b0;
/**
 * Keeps track of which bit needs to be updated in `changeMask`
 *
 * This value gets incremented on every call to `ɵɵi18nExp`
 */
let changeMaskCounter = 0;
/**
 * Keep track of which input bindings in `ɵɵi18nExp` have changed.
 *
 * `setMaskBit` gets invoked by each call to `ɵɵi18nExp`.
 *
 * @param hasChange did `ɵɵi18nExp` detect a change.
 */
export function setMaskBit(hasChange) {
    if (hasChange) {
        changeMask = changeMask | (1 << Math.min(changeMaskCounter, 31));
    }
    changeMaskCounter++;
}
export function applyI18n(tView, lView, index) {
    if (changeMaskCounter > 0) {
        ngDevMode && assertDefined(tView, `tView should be defined`);
        const tI18n = tView.data[index];
        // When `index` points to an `ɵɵi18nAttributes` then we have an array otherwise `TI18n`
        const updateOpCodes = Array.isArray(tI18n) ? tI18n : tI18n.update;
        const bindingsStartIndex = getBindingIndex() - changeMaskCounter - 1;
        applyUpdateOpCodes(tView, lView, updateOpCodes, bindingsStartIndex, changeMask);
    }
    // Reset changeMask & maskBit to default for the next update cycle
    changeMask = 0b0;
    changeMaskCounter = 0;
}
function createNodeWithoutHydration(lView, textOrName, nodeType) {
    const renderer = lView[RENDERER];
    switch (nodeType) {
        case Node.COMMENT_NODE:
            return createCommentNode(renderer, textOrName);
        case Node.TEXT_NODE:
            return createTextNode(renderer, textOrName);
        case Node.ELEMENT_NODE:
            return createElementNode(renderer, textOrName, null);
    }
}
let _locateOrCreateNode = (lView, index, textOrName, nodeType) => {
    lastNodeWasCreated(true);
    return createNodeWithoutHydration(lView, textOrName, nodeType);
};
function locateOrCreateNodeImpl(lView, index, textOrName, nodeType) {
    // TODO: Add support for hydration
    lastNodeWasCreated(true);
    return createNodeWithoutHydration(lView, textOrName, nodeType);
}
export function enableLocateOrCreateI18nNodeImpl() {
    _locateOrCreateNode = locateOrCreateNodeImpl;
}
/**
 * Apply `I18nCreateOpCodes` op-codes as stored in `TI18n.create`.
 *
 * Creates text (and comment) nodes which are internationalized.
 *
 * @param lView Current lView
 * @param createOpCodes Set of op-codes to apply
 * @param parentRNode Parent node (so that direct children can be added eagerly) or `null` if it is
 *     a root node.
 * @param insertInFrontOf DOM node that should be used as an anchor.
 */
export function applyCreateOpCodes(lView, createOpCodes, parentRNode, insertInFrontOf) {
    const renderer = lView[RENDERER];
    for (let i = 0; i < createOpCodes.length; i++) {
        const opCode = createOpCodes[i++];
        const text = createOpCodes[i];
        const isComment = (opCode & I18nCreateOpCode.COMMENT) === I18nCreateOpCode.COMMENT;
        const appendNow = (opCode & I18nCreateOpCode.APPEND_EAGERLY) === I18nCreateOpCode.APPEND_EAGERLY;
        const index = opCode >>> I18nCreateOpCode.SHIFT;
        let rNode = lView[index];
        let lastNodeWasCreated = false;
        if (rNode === null) {
            // We only create new DOM nodes if they don't already exist: If ICU switches case back to a
            // case which was already instantiated, no need to create new DOM nodes.
            rNode = lView[index] =
                _locateOrCreateNode(lView, index, text, isComment ? Node.COMMENT_NODE : Node.TEXT_NODE);
            lastNodeWasCreated = wasLastNodeCreated();
        }
        if (appendNow && parentRNode !== null && lastNodeWasCreated) {
            nativeInsertBefore(renderer, parentRNode, rNode, insertInFrontOf, false);
        }
    }
}
/**
 * Apply `I18nMutateOpCodes` OpCodes.
 *
 * @param tView Current `TView`
 * @param mutableOpCodes Mutable OpCodes to process
 * @param lView Current `LView`
 * @param anchorRNode place where the i18n node should be inserted.
 */
export function applyMutableOpCodes(tView, mutableOpCodes, lView, anchorRNode) {
    ngDevMode && assertDomNode(anchorRNode);
    const renderer = lView[RENDERER];
    // `rootIdx` represents the node into which all inserts happen.
    let rootIdx = null;
    // `rootRNode` represents the real node into which we insert. This can be different from
    // `lView[rootIdx]` if we have projection.
    //  - null we don't have a parent (as can be the case in when we are inserting into a root of
    //    LView which has no parent.)
    //  - `RElement` The element representing the root after taking projection into account.
    let rootRNode;
    for (let i = 0; i < mutableOpCodes.length; i++) {
        const opCode = mutableOpCodes[i];
        if (typeof opCode == 'string') {
            const textNodeIndex = mutableOpCodes[++i];
            if (lView[textNodeIndex] === null) {
                ngDevMode && ngDevMode.rendererCreateTextNode++;
                ngDevMode && assertIndexInRange(lView, textNodeIndex);
                lView[textNodeIndex] = _locateOrCreateNode(lView, textNodeIndex, opCode, Node.TEXT_NODE);
            }
        }
        else if (typeof opCode == 'number') {
            switch (opCode & 1 /* IcuCreateOpCode.MASK_INSTRUCTION */) {
                case 0 /* IcuCreateOpCode.AppendChild */:
                    const parentIdx = getParentFromIcuCreateOpCode(opCode);
                    if (rootIdx === null) {
                        // The first operation should save the `rootIdx` because the first operation
                        // must insert into the root. (Only subsequent operations can insert into a dynamic
                        // parent)
                        rootIdx = parentIdx;
                        rootRNode = nativeParentNode(renderer, anchorRNode);
                    }
                    let insertInFrontOf;
                    let parentRNode;
                    if (parentIdx === rootIdx) {
                        insertInFrontOf = anchorRNode;
                        parentRNode = rootRNode;
                    }
                    else {
                        insertInFrontOf = null;
                        parentRNode = unwrapRNode(lView[parentIdx]);
                    }
                    // FIXME(misko): Refactor with `processI18nText`
                    if (parentRNode !== null) {
                        // This can happen if the `LView` we are adding to is not attached to a parent `LView`.
                        // In such a case there is no "root" we can attach to. This is fine, as we still need to
                        // create the elements. When the `LView` gets later added to a parent these "root" nodes
                        // get picked up and added.
                        ngDevMode && assertDomNode(parentRNode);
                        const refIdx = getRefFromIcuCreateOpCode(opCode);
                        ngDevMode && assertGreaterThan(refIdx, HEADER_OFFSET, 'Missing ref');
                        // `unwrapRNode` is not needed here as all of these point to RNodes as part of the i18n
                        // which can't have components.
                        const child = lView[refIdx];
                        ngDevMode && assertDomNode(child);
                        nativeInsertBefore(renderer, parentRNode, child, insertInFrontOf, false);
                        const tIcu = getTIcu(tView, refIdx);
                        if (tIcu !== null && typeof tIcu === 'object') {
                            // If we just added a comment node which has ICU then that ICU may have already been
                            // rendered and therefore we need to re-add it here.
                            ngDevMode && assertTIcu(tIcu);
                            const caseIndex = getCurrentICUCaseIndex(tIcu, lView);
                            if (caseIndex !== null) {
                                applyMutableOpCodes(tView, tIcu.create[caseIndex], lView, lView[tIcu.anchorIdx]);
                            }
                        }
                    }
                    break;
                case 1 /* IcuCreateOpCode.Attr */:
                    const elementNodeIndex = opCode >>> 1 /* IcuCreateOpCode.SHIFT_REF */;
                    const attrName = mutableOpCodes[++i];
                    const attrValue = mutableOpCodes[++i];
                    // This code is used for ICU expressions only, since we don't support
                    // directives/components in ICUs, we don't need to worry about inputs here
                    setElementAttribute(renderer, getNativeByIndex(elementNodeIndex, lView), null, null, attrName, attrValue, null);
                    break;
                default:
                    if (ngDevMode) {
                        throw new RuntimeError(700 /* RuntimeErrorCode.INVALID_I18N_STRUCTURE */, `Unable to determine the type of mutate operation for "${opCode}"`);
                    }
            }
        }
        else {
            switch (opCode) {
                case ICU_MARKER:
                    const commentValue = mutableOpCodes[++i];
                    const commentNodeIndex = mutableOpCodes[++i];
                    if (lView[commentNodeIndex] === null) {
                        ngDevMode &&
                            assertEqual(typeof commentValue, 'string', `Expected "${commentValue}" to be a comment node value`);
                        ngDevMode && ngDevMode.rendererCreateComment++;
                        ngDevMode && assertIndexInExpandoRange(lView, commentNodeIndex);
                        const commentRNode = lView[commentNodeIndex] =
                            _locateOrCreateNode(lView, commentNodeIndex, commentValue, Node.COMMENT_NODE);
                        // FIXME(misko): Attaching patch data is only needed for the root (Also add tests)
                        attachPatchData(commentRNode, lView);
                    }
                    break;
                case ELEMENT_MARKER:
                    const tagName = mutableOpCodes[++i];
                    const elementNodeIndex = mutableOpCodes[++i];
                    if (lView[elementNodeIndex] === null) {
                        ngDevMode &&
                            assertEqual(typeof tagName, 'string', `Expected "${tagName}" to be an element node tag name`);
                        ngDevMode && ngDevMode.rendererCreateElement++;
                        ngDevMode && assertIndexInExpandoRange(lView, elementNodeIndex);
                        const elementRNode = lView[elementNodeIndex] =
                            _locateOrCreateNode(lView, elementNodeIndex, tagName, Node.ELEMENT_NODE);
                        // FIXME(misko): Attaching patch data is only needed for the root (Also add tests)
                        attachPatchData(elementRNode, lView);
                    }
                    break;
                default:
                    ngDevMode &&
                        throwError(`Unable to determine the type of mutate operation for "${opCode}"`);
            }
        }
    }
}
/**
 * Apply `I18nUpdateOpCodes` OpCodes
 *
 * @param tView Current `TView`
 * @param lView Current `LView`
 * @param updateOpCodes OpCodes to process
 * @param bindingsStartIndex Location of the first `ɵɵi18nApply`
 * @param changeMask Each bit corresponds to a `ɵɵi18nExp` (Counting backwards from
 *     `bindingsStartIndex`)
 */
export function applyUpdateOpCodes(tView, lView, updateOpCodes, bindingsStartIndex, changeMask) {
    for (let i = 0; i < updateOpCodes.length; i++) {
        // bit code to check if we should apply the next update
        const checkBit = updateOpCodes[i];
        // Number of opCodes to skip until next set of update codes
        const skipCodes = updateOpCodes[++i];
        if (checkBit & changeMask) {
            // The value has been updated since last checked
            let value = '';
            for (let j = i + 1; j <= (i + skipCodes); j++) {
                const opCode = updateOpCodes[j];
                if (typeof opCode == 'string') {
                    value += opCode;
                }
                else if (typeof opCode == 'number') {
                    if (opCode < 0) {
                        // Negative opCode represent `i18nExp` values offset.
                        value += renderStringify(lView[bindingsStartIndex - opCode]);
                    }
                    else {
                        const nodeIndex = (opCode >>> 2 /* I18nUpdateOpCode.SHIFT_REF */);
                        switch (opCode & 3 /* I18nUpdateOpCode.MASK_OPCODE */) {
                            case 1 /* I18nUpdateOpCode.Attr */:
                                const propName = updateOpCodes[++j];
                                const sanitizeFn = updateOpCodes[++j];
                                const tNodeOrTagName = tView.data[nodeIndex];
                                ngDevMode && assertDefined(tNodeOrTagName, 'Experting TNode or string');
                                if (typeof tNodeOrTagName === 'string') {
                                    // IF we don't have a `TNode`, then we are an element in ICU (as ICU content does
                                    // not have TNode), in which case we know that there are no directives, and hence
                                    // we use attribute setting.
                                    setElementAttribute(lView[RENDERER], lView[nodeIndex], null, tNodeOrTagName, propName, value, sanitizeFn);
                                }
                                else {
                                    elementPropertyInternal(tView, tNodeOrTagName, lView, propName, value, lView[RENDERER], sanitizeFn, false);
                                }
                                break;
                            case 0 /* I18nUpdateOpCode.Text */:
                                const rText = lView[nodeIndex];
                                rText !== null && updateTextNode(lView[RENDERER], rText, value);
                                break;
                            case 2 /* I18nUpdateOpCode.IcuSwitch */:
                                applyIcuSwitchCase(tView, getTIcu(tView, nodeIndex), lView, value);
                                break;
                            case 3 /* I18nUpdateOpCode.IcuUpdate */:
                                applyIcuUpdateCase(tView, getTIcu(tView, nodeIndex), bindingsStartIndex, lView);
                                break;
                        }
                    }
                }
            }
        }
        else {
            const opCode = updateOpCodes[i + 1];
            if (opCode > 0 && (opCode & 3 /* I18nUpdateOpCode.MASK_OPCODE */) === 3 /* I18nUpdateOpCode.IcuUpdate */) {
                // Special case for the `icuUpdateCase`. It could be that the mask did not match, but
                // we still need to execute `icuUpdateCase` because the case has changed recently due to
                // previous `icuSwitchCase` instruction. (`icuSwitchCase` and `icuUpdateCase` always come in
                // pairs.)
                const nodeIndex = (opCode >>> 2 /* I18nUpdateOpCode.SHIFT_REF */);
                const tIcu = getTIcu(tView, nodeIndex);
                const currentIndex = lView[tIcu.currentCaseLViewIndex];
                if (currentIndex < 0) {
                    applyIcuUpdateCase(tView, tIcu, bindingsStartIndex, lView);
                }
            }
        }
        i += skipCodes;
    }
}
/**
 * Apply OpCodes associated with updating an existing ICU.
 *
 * @param tView Current `TView`
 * @param tIcu Current `TIcu`
 * @param bindingsStartIndex Location of the first `ɵɵi18nApply`
 * @param lView Current `LView`
 */
function applyIcuUpdateCase(tView, tIcu, bindingsStartIndex, lView) {
    ngDevMode && assertIndexInRange(lView, tIcu.currentCaseLViewIndex);
    let activeCaseIndex = lView[tIcu.currentCaseLViewIndex];
    if (activeCaseIndex !== null) {
        let mask = changeMask;
        if (activeCaseIndex < 0) {
            // Clear the flag.
            // Negative number means that the ICU was freshly created and we need to force the update.
            activeCaseIndex = lView[tIcu.currentCaseLViewIndex] = ~activeCaseIndex;
            // -1 is same as all bits on, which simulates creation since it marks all bits dirty
            mask = -1;
        }
        applyUpdateOpCodes(tView, lView, tIcu.update[activeCaseIndex], bindingsStartIndex, mask);
    }
}
/**
 * Apply OpCodes associated with switching a case on ICU.
 *
 * This involves tearing down existing case and than building up a new case.
 *
 * @param tView Current `TView`
 * @param tIcu Current `TIcu`
 * @param lView Current `LView`
 * @param value Value of the case to update to.
 */
function applyIcuSwitchCase(tView, tIcu, lView, value) {
    // Rebuild a new case for this ICU
    const caseIndex = getCaseIndex(tIcu, value);
    let activeCaseIndex = getCurrentICUCaseIndex(tIcu, lView);
    if (activeCaseIndex !== caseIndex) {
        applyIcuSwitchCaseRemove(tView, tIcu, lView);
        lView[tIcu.currentCaseLViewIndex] = caseIndex === null ? null : ~caseIndex;
        if (caseIndex !== null) {
            // Add the nodes for the new case
            const anchorRNode = lView[tIcu.anchorIdx];
            if (anchorRNode) {
                ngDevMode && assertDomNode(anchorRNode);
                applyMutableOpCodes(tView, tIcu.create[caseIndex], lView, anchorRNode);
            }
        }
    }
}
/**
 * Apply OpCodes associated with tearing ICU case.
 *
 * This involves tearing down existing case and than building up a new case.
 *
 * @param tView Current `TView`
 * @param tIcu Current `TIcu`
 * @param lView Current `LView`
 */
function applyIcuSwitchCaseRemove(tView, tIcu, lView) {
    let activeCaseIndex = getCurrentICUCaseIndex(tIcu, lView);
    if (activeCaseIndex !== null) {
        const removeCodes = tIcu.remove[activeCaseIndex];
        for (let i = 0; i < removeCodes.length; i++) {
            const nodeOrIcuIndex = removeCodes[i];
            if (nodeOrIcuIndex > 0) {
                // Positive numbers are `RNode`s.
                const rNode = getNativeByIndex(nodeOrIcuIndex, lView);
                rNode !== null && nativeRemoveNode(lView[RENDERER], rNode);
            }
            else {
                // Negative numbers are ICUs
                applyIcuSwitchCaseRemove(tView, getTIcu(tView, ~nodeOrIcuIndex), lView);
            }
        }
    }
}
/**
 * Returns the index of the current case of an ICU expression depending on the main binding value
 *
 * @param icuExpression
 * @param bindingValue The value of the main binding used by this ICU expression
 */
function getCaseIndex(icuExpression, bindingValue) {
    let index = icuExpression.cases.indexOf(bindingValue);
    if (index === -1) {
        switch (icuExpression.type) {
            case 1 /* IcuType.plural */: {
                const resolvedCase = getPluralCase(bindingValue, getLocaleId());
                index = icuExpression.cases.indexOf(resolvedCase);
                if (index === -1 && resolvedCase !== 'other') {
                    index = icuExpression.cases.indexOf('other');
                }
                break;
            }
            case 0 /* IcuType.select */: {
                index = icuExpression.cases.indexOf('other');
                break;
            }
        }
    }
    return index === -1 ? null : index;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bl9hcHBseS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaTE4bi9pMThuX2FwcGx5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQW1CLE1BQU0sY0FBYyxDQUFDO0FBQzVELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsYUFBYSxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsa0JBQWtCLEVBQUUsVUFBVSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDL0gsT0FBTyxFQUFDLHlCQUF5QixFQUFFLFVBQVUsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUNoRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFDLHVCQUF1QixFQUFFLG1CQUFtQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDcEYsT0FBTyxFQUFDLGNBQWMsRUFBRSxnQkFBZ0IsRUFBMEQsVUFBVSxFQUEwRCxNQUFNLG9CQUFvQixDQUFDO0FBSWpNLE9BQU8sRUFBQyxhQUFhLEVBQVMsUUFBUSxFQUFRLE1BQU0sb0JBQW9CLENBQUM7QUFDekUsT0FBTyxFQUFDLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNsSyxPQUFPLEVBQUMsZUFBZSxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsV0FBVyxFQUFDLE1BQU0sb0JBQW9CLENB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Q0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDN0MsTUFBTTtZQUNSLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUNELE9BQU8sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUNyQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7UnVudGltZUVycm9yLCBSdW50aW1lRXJyb3JDb2RlfSBmcm9tICcuLi8uLi9lcnJvcnMnO1xuaW1wb3J0IHtnZXRQbHVyYWxDYXNlfSBmcm9tICcuLi8uLi9pMThuL2xvY2FsaXphdGlvbic7XG5pbXBvcnQge2Fzc2VydERlZmluZWQsIGFzc2VydERvbU5vZGUsIGFzc2VydEVxdWFsLCBhc3NlcnRHcmVhdGVyVGhhbiwgYXNzZXJ0SW5kZXhJblJhbmdlLCB0aHJvd0Vycm9yfSBmcm9tICcuLi8uLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQge2Fzc2VydEluZGV4SW5FeHBhbmRvUmFuZ2UsIGFzc2VydFRJY3V9IGZyb20gJy4uL2Fzc2VydCc7XG5pbXBvcnQge2F0dGFjaFBhdGNoRGF0YX0gZnJvbSAnLi4vY29udGV4dF9kaXNjb3ZlcnknO1xuaW1wb3J0IHtlbGVtZW50UHJvcGVydHlJbnRlcm5hbCwgc2V0RWxlbWVudEF0dHJpYnV0ZX0gZnJvbSAnLi4vaW5zdHJ1Y3Rpb25zL3NoYXJlZCc7XG5pbXBvcnQge0VMRU1FTlRfTUFSS0VSLCBJMThuQ3JlYXRlT3BDb2RlLCBJMThuQ3JlYXRlT3BDb2RlcywgSTE4blVwZGF0ZU9wQ29kZSwgSTE4blVwZGF0ZU9wQ29kZXMsIElDVV9NQVJLRVIsIEljdUNyZWF0ZU9wQ29kZSwgSWN1Q3JlYXRlT3BDb2RlcywgSWN1VHlwZSwgVEkxOG4sIFRJY3V9IGZyb20gJy4uL2ludGVyZmFjZXMvaTE4bic7XG5pbXBvcnQge1ROb2RlfSBmcm9tICcuLi9pbnRlcmZhY2VzL25vZGUnO1xuaW1wb3J0IHtSRWxlbWVudCwgUk5vZGUsIFJUZXh0fSBmcm9tICcuLi9pbnRlcmZhY2VzL3JlbmRlcmVyX2RvbSc7XG5pbXBvcnQge1Nhbml0aXplckZufSBmcm9tICcuLi9pbnRlcmZhY2VzL3Nhbml0aXphdGlvbic7XG5pbXBvcnQge0hFQURFUl9PRkZTRVQsIExWaWV3LCBSRU5ERVJFUiwgVFZpZXd9IGZyb20gJy4uL2ludGVyZmFjZXMvdmlldyc7XG5pbXBvcnQge2NyZWF0ZUNvbW1lbnROb2RlLCBjcmVhdGVFbGVtZW50Tm9kZSwgY3JlYXRlVGV4dE5vZGUsIG5hdGl2ZUluc2VydEJlZm9yZSwgbmF0aXZlUGFyZW50Tm9kZSwgbmF0aXZlUmVtb3ZlTm9kZSwgdXBkYXRlVGV4dE5vZGV9IGZyb20gJy4uL25vZGVfbWFuaXB1bGF0aW9uJztcbmltcG9ydCB7Z2V0QmluZGluZ0luZGV4LCBsYXN0Tm9kZVdhc0NyZWF0ZWQsIHdhc0xhc3ROb2RlQ3JlYXRlZH0gZnJvbSAnLi4vc3RhdGUnO1xuaW1wb3J0IHtyZW5kZXJTdHJpbmdpZnl9IGZyb20gJy4uL3V0aWwvc3RyaW5naWZ5X3V0aWxzJztcbmltcG9ydCB7Z2V0TmF0aXZlQnlJbmRleCwgdW53cmFwUk5vZGV9IGZyb20gJy4uL3V0aWwvdmlld191dGlscyc7XG5cbmltcG9ydCB7Z2V0TG9jYWxlSWR9IGZyb20gJy4vaTE4bl9sb2NhbGVfaWQnO1xuaW1wb3J0IHtnZXRDdXJyZW50SUNVQ2FzZUluZGV4LCBnZXRQYXJlbnRGcm9tSWN1Q3JlYXRlT3BDb2RlLCBnZXRSZWZGcm9tSWN1Q3JlYXRlT3BDb2RlLCBnZXRUSWN1fSBmcm9tICcuL2kxOG5fdXRpbCc7XG5cblxuXG4vKipcbiAqIEtlZXAgdHJhY2sgb2Ygd2hpY2ggaW5wdXQgYmluZGluZ3MgaW4gYMm1ybVpMThuRXhwYCBoYXZlIGNoYW5nZWQuXG4gKlxuICogVGhpcyBpcyB1c2VkIHRvIGVmZmljaWVudGx5IHVwZGF0ZSBleHByZXNzaW9ucyBpbiBpMThuIG9ubHkgd2hlbiB0aGUgY29ycmVzcG9uZGluZyBpbnB1dCBoYXNcbiAqIGNoYW5nZWQuXG4gKlxuICogMSkgRWFjaCBiaXQgcmVwcmVzZW50cyB3aGljaCBvZiB0aGUgYMm1ybVpMThuRXhwYCBoYXMgY2hhbmdlZC5cbiAqIDIpIFRoZXJlIGFyZSAzMiBiaXRzIGFsbG93ZWQgaW4gSlMuXG4gKiAzKSBCaXQgMzIgaXMgc3BlY2lhbCBhcyBpdCBpcyBzaGFyZWQgZm9yIGFsbCBjaGFuZ2VzIHBhc3QgMzIuIChJbiBvdGhlciB3b3JkcyBpZiB5b3UgaGF2ZSBtb3JlXG4gKiB0aGFuIDMyIGDJtcm1aTE4bkV4cGAgdGhlbiBhbGwgY2hhbmdlcyBwYXN0IDMybmQgYMm1ybVpMThuRXhwYCB3aWxsIGJlIG1hcHBlZCB0byBzYW1lIGJpdC4gVGhpcyBtZWFuc1xuICogdGhhdCB3ZSBtYXkgZW5kIHVwIGNoYW5naW5nIG1vcmUgdGhhbiB3ZSBuZWVkIHRvLiBCdXQgaTE4biBleHByZXNzaW9ucyB3aXRoIDMyIGJpbmRpbmdzIGlzIHJhcmVcbiAqIHNvIGluIHByYWN0aWNlIGl0IHNob3VsZCBub3QgYmUgYW4gaXNzdWUuKVxuICovXG5sZXQgY2hhbmdlTWFzayA9IDBiMDtcblxuLyoqXG4gKiBLZWVwcyB0cmFjayBvZiB3aGljaCBiaXQgbmVlZHMgdG8gYmUgdXBkYXRlZCBpbiBgY2hhbmdlTWFza2BcbiAqXG4gKiBUaGlzIHZhbHVlIGdldHMgaW5jcmVtZW50ZWQgb24gZXZlcnkgY2FsbCB0byBgybXJtWkxOG5FeHBgXG4gKi9cbmxldCBjaGFuZ2VNYXNrQ291bnRlciA9IDA7XG5cbi8qKlxuICogS2VlcCB0cmFjayBvZiB3aGljaCBpbnB1dCBiaW5kaW5ncyBpbiBgybXJtWkxOG5FeHBgIGhhdmUgY2hhbmdlZC5cbiAqXG4gKiBgc2V0TWFza0JpdGAgZ2V0cyBpbnZva2VkIGJ5IGVhY2ggY2FsbCB0byBgybXJtWkxOG5FeHBgLlxuICpcbiAqIEBwYXJhbSBoYXNDaGFuZ2UgZGlkIGDJtcm1aTE4bkV4cGAgZGV0ZWN0IGEgY2hhbmdlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0TWFza0JpdChoYXNDaGFuZ2U6IGJvb2xlYW4pIHtcbiAgaWYgKGhhc0NoYW5nZSkge1xuICAgIGNoYW5nZU1hc2sgPSBjaGFuZ2VNYXNrIHwgKDEgPDwgTWF0aC5taW4oY2hhbmdlTWFza0NvdW50ZXIsIDMxKSk7XG4gIH1cbiAgY2hhbmdlTWFza0NvdW50ZXIrKztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5STE4bih0VmlldzogVFZpZXcsIGxWaWV3OiBMVmlldywgaW5kZXg6IG51bWJlcikge1xuICBpZiAoY2hhbmdlTWFza0NvdW50ZXIgPiAwKSB7XG4gICAgbmdEZXZNb2RlICYmIGFzc2VydERlZmluZWQodFZpZXcsIGB0VmlldyBzaG91bGQgYmUgZGVmaW5lZGApO1xuICAgIGNvbnN0IHRJMThuID0gdFZpZXcuZGF0YVtpbmRleF0gYXMgVEkxOG4gfCBJMThuVXBkYXRlT3BDb2RlcztcbiAgICAvLyBXaGVuIGBpbmRleGAgcG9pbnRzIHRvIGFuIGDJtcm1aTE4bkF0dHJpYnV0ZXNgIHRoZW4gd2UgaGF2ZSBhbiBhcnJheSBvdGhlcndpc2UgYFRJMThuYFxuICAgIGNvbnN0IHVwZGF0ZU9wQ29kZXM6IEkxOG5VcGRhdGVPcENvZGVzID1cbiAgICAgICAgQXJyYXkuaXNBcnJheSh0STE4bikgPyB0STE4biBhcyBJMThuVXBkYXRlT3BDb2RlcyA6ICh0STE4biBhcyBUSTE4bikudXBkYXRlO1xuICAgIGNvbnN0IGJpbmRpbmdzU3RhcnRJbmRleCA9IGdldEJpbmRpbmdJbmRleCgpIC0gY2hhbmdlTWFza0NvdW50ZXIgLSAxO1xuICAgIGFwcGx5VXBkYXRlT3BDb2Rlcyh0VmlldywgbFZpZXcsIHVwZGF0ZU9wQ29kZXMsIGJpbmRpbmdzU3RhcnRJbmRleCwgY2hhbmdlTWFzayk7XG4gIH1cbiAgLy8gUmVzZXQgY2hhbmdlTWFzayAmIG1hc2tCaXQgdG8gZGVmYXVsdCBmb3IgdGhlIG5leHQgdXBkYXRlIGN5Y2xlXG4gIGNoYW5nZU1hc2sgPSAwYjA7XG4gIGNoYW5nZU1hc2tDb3VudGVyID0gMDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTm9kZVdpdGhvdXRIeWRyYXRpb24oXG4gICAgbFZpZXc6IExWaWV3LCB0ZXh0T3JOYW1lOiBzdHJpbmcsXG4gICAgbm9kZVR5cGU6IHR5cGVvZiBOb2RlLkNPTU1FTlRfTk9ERXx0eXBlb2YgTm9kZS5URVhUX05PREV8dHlwZW9mIE5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gIGNvbnN0IHJlbmRlcmVyID0gbFZpZXdbUkVOREVSRVJdO1xuXG4gIHN3aXRjaCAobm9kZVR5cGUpIHtcbiAgICBjYXNlIE5vZGUuQ09NTUVOVF9OT0RFOlxuICAgICAgcmV0dXJuIGNyZWF0ZUNvbW1lbnROb2RlKHJlbmRlcmVyLCB0ZXh0T3JOYW1lKTtcblxuICAgIGNhc2UgTm9kZS5URVhUX05PREU6XG4gICAgICByZXR1cm4gY3JlYXRlVGV4dE5vZGUocmVuZGVyZXIsIHRleHRPck5hbWUpO1xuXG4gICAgY2FzZSBOb2RlLkVMRU1FTlRfTk9ERTpcbiAgICAgIHJldHVybiBjcmVhdGVFbGVtZW50Tm9kZShyZW5kZXJlciwgdGV4dE9yTmFtZSwgbnVsbCk7XG4gIH1cbn1cblxubGV0IF9sb2NhdGVPckNyZWF0ZU5vZGU6IHR5cGVvZiBsb2NhdGVPckNyZWF0ZU5vZGVJbXBsID0gKGxWaWV3LCBpbmRleCwgdGV4dE9yTmFtZSwgbm9kZVR5cGUpID0+IHtcbiAgbGFzdE5vZGVXYXNDcmVhdGVkKHRydWUpO1xuICByZXR1cm4gY3JlYXRlTm9kZVdpdGhvdXRIeWRyYXRpb24obFZpZXcsIHRleHRPck5hbWUsIG5vZGVUeXBlKTtcbn07XG5cbmZ1bmN0aW9uIGxvY2F0ZU9yQ3JlYXRlTm9kZUltcGwoXG4gICAgbFZpZXc6IExWaWV3LCBpbmRleDogbnVtYmVyLCB0ZXh0T3JOYW1lOiBzdHJpbmcsXG4gICAgbm9kZVR5cGU6IHR5cGVvZiBOb2RlLkNPTU1FTlRfTk9ERXx0eXBlb2YgTm9kZS5URVhUX05PREV8dHlwZW9mIE5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gIC8vIFRPRE86IEFkZCBzdXBwb3J0IGZvciBoeWRyYXRpb25cbiAgbGFzdE5vZGVXYXNDcmVhdGVkKHRydWUpO1xuICByZXR1cm4gY3JlYXRlTm9kZVdpdGhvdXRIeWRyYXRpb24obFZpZXcsIHRleHRPck5hbWUsIG5vZGVUeXBlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZUxvY2F0ZU9yQ3JlYXRlSTE4bk5vZGVJbXBsKCkge1xuICBfbG9jYXRlT3JDcmVhdGVOb2RlID0gbG9jYXRlT3JDcmVhdGVOb2RlSW1wbDtcbn1cblxuLyoqXG4gKiBBcHBseSBgSTE4bkNyZWF0ZU9wQ29kZXNgIG9wLWNvZGVzIGFzIHN0b3JlZCBpbiBgVEkxOG4uY3JlYXRlYC5cbiAqXG4gKiBDcmVhdGVzIHRleHQgKGFuZCBjb21tZW50KSBub2RlcyB3aGljaCBhcmUgaW50ZXJuYXRpb25hbGl6ZWQuXG4gKlxuICogQHBhcmFtIGxWaWV3IEN1cnJlbnQgbFZpZXdcbiAqIEBwYXJhbSBjcmVhdGVPcENvZGVzIFNldCBvZiBvcC1jb2RlcyB0byBhcHBseVxuICogQHBhcmFtIHBhcmVudFJOb2RlIFBhcmVudCBub2RlIChzbyB0aGF0IGRpcmVjdCBjaGlsZHJlbiBjYW4gYmUgYWRkZWQgZWFnZXJseSkgb3IgYG51bGxgIGlmIGl0IGlzXG4gKiAgICAgYSByb290IG5vZGUuXG4gKiBAcGFyYW0gaW5zZXJ0SW5Gcm9udE9mIERPTSBub2RlIHRoYXQgc2hvdWxkIGJlIHVzZWQgYXMgYW4gYW5jaG9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlDcmVhdGVPcENvZGVzKFxuICAgIGxWaWV3OiBMVmlldywgY3JlYXRlT3BDb2RlczogSTE4bkNyZWF0ZU9wQ29kZXMsIHBhcmVudFJOb2RlOiBSRWxlbWVudHxudWxsLFxuICAgIGluc2VydEluRnJvbnRPZjogUkVsZW1lbnR8bnVsbCk6IHZvaWQge1xuICBjb25zdCByZW5kZXJlciA9IGxWaWV3W1JFTkRFUkVSXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjcmVhdGVPcENvZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgb3BDb2RlID0gY3JlYXRlT3BDb2Rlc1tpKytdIGFzIGFueTtcbiAgICBjb25zdCB0ZXh0ID0gY3JlYXRlT3BDb2Rlc1tpXSBhcyBzdHJpbmc7XG4gICAgY29uc3QgaXNDb21tZW50ID0gKG9wQ29kZSAmIEkxOG5DcmVhdGVPcENvZGUuQ09NTUVOVCkgPT09IEkxOG5DcmVhdGVPcENvZGUuQ09NTUVOVDtcbiAgICBjb25zdCBhcHBlbmROb3cgPVxuICAgICAgICAob3BDb2RlICYgSTE4bkNyZWF0ZU9wQ29kZS5BUFBFTkRfRUFHRVJMWSkgPT09IEkxOG5DcmVhdGVPcENvZGUuQVBQRU5EX0VBR0VSTFk7XG4gICAgY29uc3QgaW5kZXggPSBvcENvZGUgPj4+IEkxOG5DcmVhdGVPcENvZGUuU0hJRlQ7XG4gICAgbGV0IHJOb2RlID0gbFZpZXdbaW5kZXhdO1xuICAgIGxldCBsYXN0Tm9kZVdhc0NyZWF0ZWQgPSBmYWxzZTtcbiAgICBpZiAock5vZGUgPT09IG51bGwpIHtcbiAgICAgIC8vIFdlIG9ubHkgY3JlYXRlIG5ldyBET00gbm9kZXMgaWYgdGhleSBkb24ndCBhbHJlYWR5IGV4aXN0OiBJZiBJQ1Ugc3dpdGNoZXMgY2FzZSBiYWNrIHRvIGFcbiAgICAgIC8vIGNhc2Ugd2hpY2ggd2FzIGFscmVhZHkgaW5zdGFudGlhdGVkLCBubyBuZWVkIHRvIGNyZWF0ZSBuZXcgRE9NIG5vZGVzLlxuICAgICAgck5vZGUgPSBsVmlld1tpbmRleF0gPVxuICAgICAgICAgIF9sb2NhdGVPckNyZWF0ZU5vZGUobFZpZXcsIGluZGV4LCB0ZXh0LCBpc0NvbW1lbnQgPyBOb2RlLkNPTU1FTlRfTk9ERSA6IE5vZGUuVEVYVF9OT0RFKTtcbiAgICAgIGxhc3ROb2RlV2FzQ3JlYXRlZCA9IHdhc0xhc3ROb2RlQ3JlYXRlZCgpO1xuICAgIH1cbiAgICBpZiAoYXBwZW5kTm93ICYmIHBhcmVudFJOb2RlICE9PSBudWxsICYmIGxhc3ROb2RlV2FzQ3JlYXRlZCkge1xuICAgICAgbmF0aXZlSW5zZXJ0QmVmb3JlKHJlbmRlcmVyLCBwYXJlbnRSTm9kZSwgck5vZGUsIGluc2VydEluRnJvbnRPZiwgZmFsc2UpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFwcGx5IGBJMThuTXV0YXRlT3BDb2Rlc2AgT3BDb2Rlcy5cbiAqXG4gKiBAcGFyYW0gdFZpZXcgQ3VycmVudCBgVFZpZXdgXG4gKiBAcGFyYW0gbXV0YWJsZU9wQ29kZXMgTXV0YWJsZSBPcENvZGVzIHRvIHByb2Nlc3NcbiAqIEBwYXJhbSBsVmlldyBDdXJyZW50IGBMVmlld2BcbiAqIEBwYXJhbSBhbmNob3JSTm9kZSBwbGFjZSB3aGVyZSB0aGUgaTE4biBub2RlIHNob3VsZCBiZSBpbnNlcnRlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5TXV0YWJsZU9wQ29kZXMoXG4gICAgdFZpZXc6IFRWaWV3LCBtdXRhYmxlT3BDb2RlczogSWN1Q3JlYXRlT3BDb2RlcywgbFZpZXc6IExWaWV3LCBhbmNob3JSTm9kZTogUk5vZGUpOiB2b2lkIHtcbiAgbmdEZXZNb2RlICYmIGFzc2VydERvbU5vZGUoYW5jaG9yUk5vZGUpO1xuICBjb25zdCByZW5kZXJlciA9IGxWaWV3W1JFTkRFUkVSXTtcbiAgLy8gYHJvb3RJZHhgIHJlcHJlc2VudHMgdGhlIG5vZGUgaW50byB3aGljaCBhbGwgaW5zZXJ0cyBoYXBwZW4uXG4gIGxldCByb290SWR4OiBudW1iZXJ8bnVsbCA9IG51bGw7XG4gIC8vIGByb290Uk5vZGVgIHJlcHJlc2VudHMgdGhlIHJlYWwgbm9kZSBpbnRvIHdoaWNoIHdlIGluc2VydC4gVGhpcyBjYW4gYmUgZGlmZmVyZW50IGZyb21cbiAgLy8gYGxWaWV3W3Jvb3RJZHhdYCBpZiB3ZSBoYXZlIHByb2plY3Rpb24uXG4gIC8vICAtIG51bGwgd2UgZG9uJ3QgaGF2ZSBhIHBhcmVudCAoYXMgY2FuIGJlIHRoZSBjYXNlIGluIHdoZW4gd2UgYXJlIGluc2VydGluZyBpbnRvIGEgcm9vdCBvZlxuICAvLyAgICBMVmlldyB3aGljaCBoYXMgbm8gcGFyZW50LilcbiAgLy8gIC0gYFJFbGVtZW50YCBUaGUgZWxlbWVudCByZXByZXNlbnRpbmcgdGhlIHJvb3QgYWZ0ZXIgdGFraW5nIHByb2plY3Rpb24gaW50byBhY2NvdW50LlxuICBsZXQgcm9vdFJOb2RlITogUkVsZW1lbnR8bnVsbDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtdXRhYmxlT3BDb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IG9wQ29kZSA9IG11dGFibGVPcENvZGVzW2ldO1xuICAgIGlmICh0eXBlb2Ygb3BDb2RlID09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCB0ZXh0Tm9kZUluZGV4ID0gbXV0YWJsZU9wQ29kZXNbKytpXSBhcyBudW1iZXI7XG4gICAgICBpZiAobFZpZXdbdGV4dE5vZGVJbmRleF0gPT09IG51bGwpIHtcbiAgICAgICAgbmdEZXZNb2RlICYmIG5nRGV2TW9kZS5yZW5kZXJlckNyZWF0ZVRleHROb2RlKys7XG4gICAgICAgIG5nRGV2TW9kZSAmJiBhc3NlcnRJbmRleEluUmFuZ2UobFZpZXcsIHRleHROb2RlSW5kZXgpO1xuICAgICAgICBsVmlld1t0ZXh0Tm9kZUluZGV4XSA9IF9sb2NhdGVPckNyZWF0ZU5vZGUobFZpZXcsIHRleHROb2RlSW5kZXgsIG9wQ29kZSwgTm9kZS5URVhUX05PREUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wQ29kZSA9PSAnbnVtYmVyJykge1xuICAgICAgc3dpdGNoIChvcENvZGUgJiBJY3VDcmVhdGVPcENvZGUuTUFTS19JTlNUUlVDVElPTikge1xuICAgICAgICBjYXNlIEljdUNyZWF0ZU9wQ29kZS5BcHBlbmRDaGlsZDpcbiAgICAgICAgICBjb25zdCBwYXJlbnRJZHggPSBnZXRQYXJlbnRGcm9tSWN1Q3JlYXRlT3BDb2RlKG9wQ29kZSk7XG4gICAgICAgICAgaWYgKHJvb3RJZHggPT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIFRoZSBmaXJzdCBvcGVyYXRpb24gc2hvdWxkIHNhdmUgdGhlIGByb290SWR4YCBiZWNhdXNlIHRoZSBmaXJzdCBvcGVyYXRpb25cbiAgICAgICAgICAgIC8vIG11c3QgaW5zZXJ0IGludG8gdGhlIHJvb3QuIChPbmx5IHN1YnNlcXVlbnQgb3BlcmF0aW9ucyBjYW4gaW5zZXJ0IGludG8gYSBkeW5hbWljXG4gICAgICAgICAgICAvLyBwYXJlbnQpXG4gICAgICAgICAgICByb290SWR4ID0gcGFyZW50SWR4O1xuICAgICAgICAgICAgcm9vdFJOb2RlID0gbmF0aXZlUGFyZW50Tm9kZShyZW5kZXJlciwgYW5jaG9yUk5vZGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQgaW5zZXJ0SW5Gcm9udE9mOiBSTm9kZXxudWxsO1xuICAgICAgICAgIGxldCBwYXJlbnRSTm9kZTogUkVsZW1lbnR8bnVsbDtcbiAgICAgICAgICBpZiAocGFyZW50SWR4ID09PSByb290SWR4KSB7XG4gICAgICAgICAgICBpbnNlcnRJbkZyb250T2YgPSBhbmNob3JSTm9kZTtcbiAgICAgICAgICAgIHBhcmVudFJOb2RlID0gcm9vdFJOb2RlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbnNlcnRJbkZyb250T2YgPSBudWxsO1xuICAgICAgICAgICAgcGFyZW50Uk5vZGUgPSB1bndyYXBSTm9kZShsVmlld1twYXJlbnRJZHhdKSBhcyBSRWxlbWVudDtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gRklYTUUobWlza28pOiBSZWZhY3RvciB3aXRoIGBwcm9jZXNzSTE4blRleHRgXG4gICAgICAgICAgaWYgKHBhcmVudFJOb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBUaGlzIGNhbiBoYXBwZW4gaWYgdGhlIGBMVmlld2Agd2UgYXJlIGFkZGluZyB0byBpcyBub3QgYXR0YWNoZWQgdG8gYSBwYXJlbnQgYExWaWV3YC5cbiAgICAgICAgICAgIC8vIEluIHN1Y2ggYSBjYXNlIHRoZXJlIGlzIG5vIFwicm9vdFwiIHdlIGNhbiBhdHRhY2ggdG8uIFRoaXMgaXMgZmluZSwgYXMgd2Ugc3RpbGwgbmVlZCB0b1xuICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBlbGVtZW50cy4gV2hlbiB0aGUgYExWaWV3YCBnZXRzIGxhdGVyIGFkZGVkIHRvIGEgcGFyZW50IHRoZXNlIFwicm9vdFwiIG5vZGVzXG4gICAgICAgICAgICAvLyBnZXQgcGlja2VkIHVwIGFuZCBhZGRlZC5cbiAgICAgICAgICAgIG5nRGV2TW9kZSAmJiBhc3NlcnREb21Ob2RlKHBhcmVudFJOb2RlKTtcbiAgICAgICAgICAgIGNvbnN0IHJlZklkeCA9IGdldFJlZkZyb21JY3VDcmVhdGVPcENvZGUob3BDb2RlKTtcbiAgICAgICAgICAgIG5nRGV2TW9kZSAmJiBhc3NlcnRHcmVhdGVyVGhhbihyZWZJZHgsIEhFQURFUl9PRkZTRVQsICdNaXNzaW5nIHJlZicpO1xuICAgICAgICAgICAgLy8gYHVud3JhcFJOb2RlYCBpcyBub3QgbmVlZGVkIGhlcmUgYXMgYWxsIG9mIHRoZXNlIHBvaW50IHRvIFJOb2RlcyBhcyBwYXJ0IG9mIHRoZSBpMThuXG4gICAgICAgICAgICAvLyB3aGljaCBjYW4ndCBoYXZlIGNvbXBvbmVudHMuXG4gICAgICAgICAgICBjb25zdCBjaGlsZCA9IGxWaWV3W3JlZklkeF0gYXMgUkVsZW1lbnQ7XG4gICAgICAgICAgICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RG9tTm9kZShjaGlsZCk7XG4gICAgICAgICAgICBuYXRpdmVJbnNlcnRCZWZvcmUocmVuZGVyZXIsIHBhcmVudFJOb2RlLCBjaGlsZCwgaW5zZXJ0SW5Gcm9udE9mLCBmYWxzZSk7XG4gICAgICAgICAgICBjb25zdCB0SWN1ID0gZ2V0VEljdSh0VmlldywgcmVmSWR4KTtcbiAgICAgICAgICAgIGlmICh0SWN1ICE9PSBudWxsICYmIHR5cGVvZiB0SWN1ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAvLyBJZiB3ZSBqdXN0IGFkZGVkIGEgY29tbWVudCBub2RlIHdoaWNoIGhhcyBJQ1UgdGhlbiB0aGF0IElDVSBtYXkgaGF2ZSBhbHJlYWR5IGJlZW5cbiAgICAgICAgICAgICAgLy8gcmVuZGVyZWQgYW5kIHRoZXJlZm9yZSB3ZSBuZWVkIHRvIHJlLWFkZCBpdCBoZXJlLlxuICAgICAgICAgICAgICBuZ0Rldk1vZGUgJiYgYXNzZXJ0VEljdSh0SWN1KTtcbiAgICAgICAgICAgICAgY29uc3QgY2FzZUluZGV4ID0gZ2V0Q3VycmVudElDVUNhc2VJbmRleCh0SWN1LCBsVmlldyk7XG4gICAgICAgICAgICAgIGlmIChjYXNlSW5kZXggIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBhcHBseU11dGFibGVPcENvZGVzKHRWaWV3LCB0SWN1LmNyZWF0ZVtjYXNlSW5kZXhdLCBsVmlldywgbFZpZXdbdEljdS5hbmNob3JJZHhdKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBJY3VDcmVhdGVPcENvZGUuQXR0cjpcbiAgICAgICAgICBjb25zdCBlbGVtZW50Tm9kZUluZGV4ID0gb3BDb2RlID4+PiBJY3VDcmVhdGVPcENvZGUuU0hJRlRfUkVGO1xuICAgICAgICAgIGNvbnN0IGF0dHJOYW1lID0gbXV0YWJsZU9wQ29kZXNbKytpXSBhcyBzdHJpbmc7XG4gICAgICAgICAgY29uc3QgYXR0clZhbHVlID0gbXV0YWJsZU9wQ29kZXNbKytpXSBhcyBzdHJpbmc7XG4gICAgICAgICAgLy8gVGhpcyBjb2RlIGlzIHVzZWQgZm9yIElDVSBleHByZXNzaW9ucyBvbmx5LCBzaW5jZSB3ZSBkb24ndCBzdXBwb3J0XG4gICAgICAgICAgLy8gZGlyZWN0aXZlcy9jb21wb25lbnRzIGluIElDVXMsIHdlIGRvbid0IG5lZWQgdG8gd29ycnkgYWJvdXQgaW5wdXRzIGhlcmVcbiAgICAgICAgICBzZXRFbGVtZW50QXR0cmlidXRlKFxuICAgICAgICAgICAgICByZW5kZXJlciwgZ2V0TmF0aXZlQnlJbmRleChlbGVtZW50Tm9kZUluZGV4LCBsVmlldykgYXMgUkVsZW1lbnQsIG51bGwsIG51bGwsIGF0dHJOYW1lLFxuICAgICAgICAgICAgICBhdHRyVmFsdWUsIG51bGwpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGlmIChuZ0Rldk1vZGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSdW50aW1lRXJyb3IoXG4gICAgICAgICAgICAgICAgUnVudGltZUVycm9yQ29kZS5JTlZBTElEX0kxOE5fU1RSVUNUVVJFLFxuICAgICAgICAgICAgICAgIGBVbmFibGUgdG8gZGV0ZXJtaW5lIHRoZSB0eXBlIG9mIG11dGF0ZSBvcGVyYXRpb24gZm9yIFwiJHtvcENvZGV9XCJgKTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaCAob3BDb2RlKSB7XG4gICAgICAgIGNhc2UgSUNVX01BUktFUjpcbiAgICAgICAgICBjb25zdCBjb21tZW50VmFsdWUgPSBtdXRhYmxlT3BDb2Rlc1srK2ldIGFzIHN0cmluZztcbiAgICAgICAgICBjb25zdCBjb21tZW50Tm9kZUluZGV4ID0gbXV0YWJsZU9wQ29kZXNbKytpXSBhcyBudW1iZXI7XG4gICAgICAgICAgaWYgKGxWaWV3W2NvbW1lbnROb2RlSW5kZXhdID09PSBudWxsKSB7XG4gICAgICAgICAgICBuZ0Rldk1vZGUgJiZcbiAgICAgICAgICAgICAgICBhc3NlcnRFcXVhbChcbiAgICAgICAgICAgICAgICAgICAgdHlwZW9mIGNvbW1lbnRWYWx1ZSwgJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgIGBFeHBlY3RlZCBcIiR7Y29tbWVudFZhbHVlfVwiIHRvIGJlIGEgY29tbWVudCBub2RlIHZhbHVlYCk7XG4gICAgICAgICAgICBuZ0Rldk1vZGUgJiYgbmdEZXZNb2RlLnJlbmRlcmVyQ3JlYXRlQ29tbWVudCsrO1xuICAgICAgICAgICAgbmdEZXZNb2RlICYmIGFzc2VydEluZGV4SW5FeHBhbmRvUmFuZ2UobFZpZXcsIGNvbW1lbnROb2RlSW5kZXgpO1xuICAgICAgICAgICAgY29uc3QgY29tbWVudFJOb2RlID0gbFZpZXdbY29tbWVudE5vZGVJbmRleF0gPVxuICAgICAgICAgICAgICAgIF9sb2NhdGVPckNyZWF0ZU5vZGUobFZpZXcsIGNvbW1lbnROb2RlSW5kZXgsIGNvbW1lbnRWYWx1ZSwgTm9kZS5DT01NRU5UX05PREUpO1xuICAgICAgICAgICAgLy8gRklYTUUobWlza28pOiBBdHRhY2hpbmcgcGF0Y2ggZGF0YSBpcyBvbmx5IG5lZWRlZCBmb3IgdGhlIHJvb3QgKEFsc28gYWRkIHRlc3RzKVxuICAgICAgICAgICAgYXR0YWNoUGF0Y2hEYXRhKGNvbW1lbnRSTm9kZSwgbFZpZXcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBFTEVNRU5UX01BUktFUjpcbiAgICAgICAgICBjb25zdCB0YWdOYW1lID0gbXV0YWJsZU9wQ29kZXNbKytpXSBhcyBzdHJpbmc7XG4gICAgICAgICAgY29uc3QgZWxlbWVudE5vZGVJbmRleCA9IG11dGFibGVPcENvZGVzWysraV0gYXMgbnVtYmVyO1xuICAgICAgICAgIGlmIChsVmlld1tlbGVtZW50Tm9kZUluZGV4XSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgbmdEZXZNb2RlICYmXG4gICAgICAgICAgICAgICAgYXNzZXJ0RXF1YWwoXG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiB0YWdOYW1lLCAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgYEV4cGVjdGVkIFwiJHt0YWdOYW1lfVwiIHRvIGJlIGFuIGVsZW1lbnQgbm9kZSB0YWcgbmFtZWApO1xuXG4gICAgICAgICAgICBuZ0Rldk1vZGUgJiYgbmdEZXZNb2RlLnJlbmRlcmVyQ3JlYXRlRWxlbWVudCsrO1xuICAgICAgICAgICAgbmdEZXZNb2RlICYmIGFzc2VydEluZGV4SW5FeHBhbmRvUmFuZ2UobFZpZXcsIGVsZW1lbnROb2RlSW5kZXgpO1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudFJOb2RlID0gbFZpZXdbZWxlbWVudE5vZGVJbmRleF0gPVxuICAgICAgICAgICAgICAgIF9sb2NhdGVPckNyZWF0ZU5vZGUobFZpZXcsIGVsZW1lbnROb2RlSW5kZXgsIHRhZ05hbWUsIE5vZGUuRUxFTUVOVF9OT0RFKTtcbiAgICAgICAgICAgIC8vIEZJWE1FKG1pc2tvKTogQXR0YWNoaW5nIHBhdGNoIGRhdGEgaXMgb25seSBuZWVkZWQgZm9yIHRoZSByb290IChBbHNvIGFkZCB0ZXN0cylcbiAgICAgICAgICAgIGF0dGFjaFBhdGNoRGF0YShlbGVtZW50Uk5vZGUsIGxWaWV3KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbmdEZXZNb2RlICYmXG4gICAgICAgICAgICAgIHRocm93RXJyb3IoYFVuYWJsZSB0byBkZXRlcm1pbmUgdGhlIHR5cGUgb2YgbXV0YXRlIG9wZXJhdGlvbiBmb3IgXCIke29wQ29kZX1cImApO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5cbi8qKlxuICogQXBwbHkgYEkxOG5VcGRhdGVPcENvZGVzYCBPcENvZGVzXG4gKlxuICogQHBhcmFtIHRWaWV3IEN1cnJlbnQgYFRWaWV3YFxuICogQHBhcmFtIGxWaWV3IEN1cnJlbnQgYExWaWV3YFxuICogQHBhcmFtIHVwZGF0ZU9wQ29kZXMgT3BDb2RlcyB0byBwcm9jZXNzXG4gKiBAcGFyYW0gYmluZGluZ3NTdGFydEluZGV4IExvY2F0aW9uIG9mIHRoZSBmaXJzdCBgybXJtWkxOG5BcHBseWBcbiAqIEBwYXJhbSBjaGFuZ2VNYXNrIEVhY2ggYml0IGNvcnJlc3BvbmRzIHRvIGEgYMm1ybVpMThuRXhwYCAoQ291bnRpbmcgYmFja3dhcmRzIGZyb21cbiAqICAgICBgYmluZGluZ3NTdGFydEluZGV4YClcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5VXBkYXRlT3BDb2RlcyhcbiAgICB0VmlldzogVFZpZXcsIGxWaWV3OiBMVmlldywgdXBkYXRlT3BDb2RlczogSTE4blVwZGF0ZU9wQ29kZXMsIGJpbmRpbmdzU3RhcnRJbmRleDogbnVtYmVyLFxuICAgIGNoYW5nZU1hc2s6IG51bWJlcikge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHVwZGF0ZU9wQ29kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBiaXQgY29kZSB0byBjaGVjayBpZiB3ZSBzaG91bGQgYXBwbHkgdGhlIG5leHQgdXBkYXRlXG4gICAgY29uc3QgY2hlY2tCaXQgPSB1cGRhdGVPcENvZGVzW2ldIGFzIG51bWJlcjtcbiAgICAvLyBOdW1iZXIgb2Ygb3BDb2RlcyB0byBza2lwIHVudGlsIG5leHQgc2V0IG9mIHVwZGF0ZSBjb2Rlc1xuICAgIGNvbnN0IHNraXBDb2RlcyA9IHVwZGF0ZU9wQ29kZXNbKytpXSBhcyBudW1iZXI7XG4gICAgaWYgKGNoZWNrQml0ICYgY2hhbmdlTWFzaykge1xuICAgICAgLy8gVGhlIHZhbHVlIGhhcyBiZWVuIHVwZGF0ZWQgc2luY2UgbGFzdCBjaGVja2VkXG4gICAgICBsZXQgdmFsdWUgPSAnJztcbiAgICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8PSAoaSArIHNraXBDb2Rlcyk7IGorKykge1xuICAgICAgICBjb25zdCBvcENvZGUgPSB1cGRhdGVPcENvZGVzW2pdO1xuICAgICAgICBpZiAodHlwZW9mIG9wQ29kZSA9PSAnc3RyaW5nJykge1xuICAgICAgICAgIHZhbHVlICs9IG9wQ29kZTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb3BDb2RlID09ICdudW1iZXInKSB7XG4gICAgICAgICAgaWYgKG9wQ29kZSA8IDApIHtcbiAgICAgICAgICAgIC8vIE5lZ2F0aXZlIG9wQ29kZSByZXByZXNlbnQgYGkxOG5FeHBgIHZhbHVlcyBvZmZzZXQuXG4gICAgICAgICAgICB2YWx1ZSArPSByZW5kZXJTdHJpbmdpZnkobFZpZXdbYmluZGluZ3NTdGFydEluZGV4IC0gb3BDb2RlXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVJbmRleCA9IChvcENvZGUgPj4+IEkxOG5VcGRhdGVPcENvZGUuU0hJRlRfUkVGKTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BDb2RlICYgSTE4blVwZGF0ZU9wQ29kZS5NQVNLX09QQ09ERSkge1xuICAgICAgICAgICAgICBjYXNlIEkxOG5VcGRhdGVPcENvZGUuQXR0cjpcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wTmFtZSA9IHVwZGF0ZU9wQ29kZXNbKytqXSBhcyBzdHJpbmc7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2FuaXRpemVGbiA9IHVwZGF0ZU9wQ29kZXNbKytqXSBhcyBTYW5pdGl6ZXJGbiB8IG51bGw7XG4gICAgICAgICAgICAgICAgY29uc3QgdE5vZGVPclRhZ05hbWUgPSB0Vmlldy5kYXRhW25vZGVJbmRleF0gYXMgVE5vZGUgfCBzdHJpbmc7XG4gICAgICAgICAgICAgICAgbmdEZXZNb2RlICYmIGFzc2VydERlZmluZWQodE5vZGVPclRhZ05hbWUsICdFeHBlcnRpbmcgVE5vZGUgb3Igc3RyaW5nJyk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0Tm9kZU9yVGFnTmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgIC8vIElGIHdlIGRvbid0IGhhdmUgYSBgVE5vZGVgLCB0aGVuIHdlIGFyZSBhbiBlbGVtZW50IGluIElDVSAoYXMgSUNVIGNvbnRlbnQgZG9lc1xuICAgICAgICAgICAgICAgICAgLy8gbm90IGhhdmUgVE5vZGUpLCBpbiB3aGljaCBjYXNlIHdlIGtub3cgdGhhdCB0aGVyZSBhcmUgbm8gZGlyZWN0aXZlcywgYW5kIGhlbmNlXG4gICAgICAgICAgICAgICAgICAvLyB3ZSB1c2UgYXR0cmlidXRlIHNldHRpbmcuXG4gICAgICAgICAgICAgICAgICBzZXRFbGVtZW50QXR0cmlidXRlKFxuICAgICAgICAgICAgICAgICAgICAgIGxWaWV3W1JFTkRFUkVSXSwgbFZpZXdbbm9kZUluZGV4XSwgbnVsbCwgdE5vZGVPclRhZ05hbWUsIHByb3BOYW1lLCB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBzYW5pdGl6ZUZuKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZWxlbWVudFByb3BlcnR5SW50ZXJuYWwoXG4gICAgICAgICAgICAgICAgICAgICAgdFZpZXcsIHROb2RlT3JUYWdOYW1lLCBsVmlldywgcHJvcE5hbWUsIHZhbHVlLCBsVmlld1tSRU5ERVJFUl0sIHNhbml0aXplRm4sXG4gICAgICAgICAgICAgICAgICAgICAgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSBJMThuVXBkYXRlT3BDb2RlLlRleHQ6XG4gICAgICAgICAgICAgICAgY29uc3QgclRleHQgPSBsVmlld1tub2RlSW5kZXhdIGFzIFJUZXh0IHwgbnVsbDtcbiAgICAgICAgICAgICAgICByVGV4dCAhPT0gbnVsbCAmJiB1cGRhdGVUZXh0Tm9kZShsVmlld1tSRU5ERVJFUl0sIHJUZXh0LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgSTE4blVwZGF0ZU9wQ29kZS5JY3VTd2l0Y2g6XG4gICAgICAgICAgICAgICAgYXBwbHlJY3VTd2l0Y2hDYXNlKHRWaWV3LCBnZXRUSWN1KHRWaWV3LCBub2RlSW5kZXgpISwgbFZpZXcsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSBJMThuVXBkYXRlT3BDb2RlLkljdVVwZGF0ZTpcbiAgICAgICAgICAgICAgICBhcHBseUljdVVwZGF0ZUNhc2UodFZpZXcsIGdldFRJY3UodFZpZXcsIG5vZGVJbmRleCkhLCBiaW5kaW5nc1N0YXJ0SW5kZXgsIGxWaWV3KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgb3BDb2RlID0gdXBkYXRlT3BDb2Rlc1tpICsgMV0gYXMgbnVtYmVyO1xuICAgICAgaWYgKG9wQ29kZSA+IDAgJiYgKG9wQ29kZSAmIEkxOG5VcGRhdGVPcENvZGUuTUFTS19PUENPREUpID09PSBJMThuVXBkYXRlT3BDb2RlLkljdVVwZGF0ZSkge1xuICAgICAgICAvLyBTcGVjaWFsIGNhc2UgZm9yIHRoZSBgaWN1VXBkYXRlQ2FzZWAuIEl0IGNvdWxkIGJlIHRoYXQgdGhlIG1hc2sgZGlkIG5vdCBtYXRjaCwgYnV0XG4gICAgICAgIC8vIHdlIHN0aWxsIG5lZWQgdG8gZXhlY3V0ZSBgaWN1VXBkYXRlQ2FzZWAgYmVjYXVzZSB0aGUgY2FzZSBoYXMgY2hhbmdlZCByZWNlbnRseSBkdWUgdG9cbiAgICAgICAgLy8gcHJldmlvdXMgYGljdVN3aXRjaENhc2VgIGluc3RydWN0aW9uLiAoYGljdVN3aXRjaENhc2VgIGFuZCBgaWN1VXBkYXRlQ2FzZWAgYWx3YXlzIGNvbWUgaW5cbiAgICAgICAgLy8gcGFpcnMuKVxuICAgICAgICBjb25zdCBub2RlSW5kZXggPSAob3BDb2RlID4+PiBJMThuVXBkYXRlT3BDb2RlLlNISUZUX1JFRik7XG4gICAgICAgIGNvbnN0IHRJY3UgPSBnZXRUSWN1KHRWaWV3LCBub2RlSW5kZXgpITtcbiAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gbFZpZXdbdEljdS5jdXJyZW50Q2FzZUxWaWV3SW5kZXhdO1xuICAgICAgICBpZiAoY3VycmVudEluZGV4IDwgMCkge1xuICAgICAgICAgIGFwcGx5SWN1VXBkYXRlQ2FzZSh0VmlldywgdEljdSwgYmluZGluZ3NTdGFydEluZGV4LCBsVmlldyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaSArPSBza2lwQ29kZXM7XG4gIH1cbn1cblxuLyoqXG4gKiBBcHBseSBPcENvZGVzIGFzc29jaWF0ZWQgd2l0aCB1cGRhdGluZyBhbiBleGlzdGluZyBJQ1UuXG4gKlxuICogQHBhcmFtIHRWaWV3IEN1cnJlbnQgYFRWaWV3YFxuICogQHBhcmFtIHRJY3UgQ3VycmVudCBgVEljdWBcbiAqIEBwYXJhbSBiaW5kaW5nc1N0YXJ0SW5kZXggTG9jYXRpb24gb2YgdGhlIGZpcnN0IGDJtcm1aTE4bkFwcGx5YFxuICogQHBhcmFtIGxWaWV3IEN1cnJlbnQgYExWaWV3YFxuICovXG5mdW5jdGlvbiBhcHBseUljdVVwZGF0ZUNhc2UodFZpZXc6IFRWaWV3LCB0SWN1OiBUSWN1LCBiaW5kaW5nc1N0YXJ0SW5kZXg6IG51bWJlciwgbFZpZXc6IExWaWV3KSB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnRJbmRleEluUmFuZ2UobFZpZXcsIHRJY3UuY3VycmVudENhc2VMVmlld0luZGV4KTtcbiAgbGV0IGFjdGl2ZUNhc2VJbmRleCA9IGxWaWV3W3RJY3UuY3VycmVudENhc2VMVmlld0luZGV4XTtcbiAgaWYgKGFjdGl2ZUNhc2VJbmRleCAhPT0gbnVsbCkge1xuICAgIGxldCBtYXNrID0gY2hhbmdlTWFzaztcbiAgICBpZiAoYWN0aXZlQ2FzZUluZGV4IDwgMCkge1xuICAgICAgLy8gQ2xlYXIgdGhlIGZsYWcuXG4gICAgICAvLyBOZWdhdGl2ZSBudW1iZXIgbWVhbnMgdGhhdCB0aGUgSUNVIHdhcyBmcmVzaGx5IGNyZWF0ZWQgYW5kIHdlIG5lZWQgdG8gZm9yY2UgdGhlIHVwZGF0ZS5cbiAgICAgIGFjdGl2ZUNhc2VJbmRleCA9IGxWaWV3W3RJY3UuY3VycmVudENhc2VMVmlld0luZGV4XSA9IH5hY3RpdmVDYXNlSW5kZXg7XG4gICAgICAvLyAtMSBpcyBzYW1lIGFzIGFsbCBiaXRzIG9uLCB3aGljaCBzaW11bGF0ZXMgY3JlYXRpb24gc2luY2UgaXQgbWFya3MgYWxsIGJpdHMgZGlydHlcbiAgICAgIG1hc2sgPSAtMTtcbiAgICB9XG4gICAgYXBwbHlVcGRhdGVPcENvZGVzKHRWaWV3LCBsVmlldywgdEljdS51cGRhdGVbYWN0aXZlQ2FzZUluZGV4XSwgYmluZGluZ3NTdGFydEluZGV4LCBtYXNrKTtcbiAgfVxufVxuXG4vKipcbiAqIEFwcGx5IE9wQ29kZXMgYXNzb2NpYXRlZCB3aXRoIHN3aXRjaGluZyBhIGNhc2Ugb24gSUNVLlxuICpcbiAqIFRoaXMgaW52b2x2ZXMgdGVhcmluZyBkb3duIGV4aXN0aW5nIGNhc2UgYW5kIHRoYW4gYnVpbGRpbmcgdXAgYSBuZXcgY2FzZS5cbiAqXG4gKiBAcGFyYW0gdFZpZXcgQ3VycmVudCBgVFZpZXdgXG4gKiBAcGFyYW0gdEljdSBDdXJyZW50IGBUSWN1YFxuICogQHBhcmFtIGxWaWV3IEN1cnJlbnQgYExWaWV3YFxuICogQHBhcmFtIHZhbHVlIFZhbHVlIG9mIHRoZSBjYXNlIHRvIHVwZGF0ZSB0by5cbiAqL1xuZnVuY3Rpb24gYXBwbHlJY3VTd2l0Y2hDYXNlKHRWaWV3OiBUVmlldywgdEljdTogVEljdSwgbFZpZXc6IExWaWV3LCB2YWx1ZTogc3RyaW5nKSB7XG4gIC8vIFJlYnVpbGQgYSBuZXcgY2FzZSBmb3IgdGhpcyBJQ1VcbiAgY29uc3QgY2FzZUluZGV4ID0gZ2V0Q2FzZUluZGV4KHRJY3UsIHZhbHVlKTtcbiAgbGV0IGFjdGl2ZUNhc2VJbmRleCA9IGdldEN1cnJlbnRJQ1VDYXNlSW5kZXgodEljdSwgbFZpZXcpO1xuICBpZiAoYWN0aXZlQ2FzZUluZGV4ICE9PSBjYXNlSW5kZXgpIHtcbiAgICBhcHBseUljdVN3aXRjaENhc2VSZW1vdmUodFZpZXcsIHRJY3UsIGxWaWV3KTtcbiAgICBsVmlld1t0SWN1LmN1cnJlbnRDYXNlTFZpZXdJbmRleF0gPSBjYXNlSW5kZXggPT09IG51bGwgPyBudWxsIDogfmNhc2VJbmRleDtcbiAgICBpZiAoY2FzZUluZGV4ICE9PSBudWxsKSB7XG4gICAgICAvLyBBZGQgdGhlIG5vZGVzIGZvciB0aGUgbmV3IGNhc2VcbiAgICAgIGNvbnN0IGFuY2hvclJOb2RlID0gbFZpZXdbdEljdS5hbmNob3JJZHhdO1xuICAgICAgaWYgKGFuY2hvclJOb2RlKSB7XG4gICAgICAgIG5nRGV2TW9kZSAmJiBhc3NlcnREb21Ob2RlKGFuY2hvclJOb2RlKTtcbiAgICAgICAgYXBwbHlNdXRhYmxlT3BDb2Rlcyh0VmlldywgdEljdS5jcmVhdGVbY2FzZUluZGV4XSwgbFZpZXcsIGFuY2hvclJOb2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBcHBseSBPcENvZGVzIGFzc29jaWF0ZWQgd2l0aCB0ZWFyaW5nIElDVSBjYXNlLlxuICpcbiAqIFRoaXMgaW52b2x2ZXMgdGVhcmluZyBkb3duIGV4aXN0aW5nIGNhc2UgYW5kIHRoYW4gYnVpbGRpbmcgdXAgYSBuZXcgY2FzZS5cbiAqXG4gKiBAcGFyYW0gdFZpZXcgQ3VycmVudCBgVFZpZXdgXG4gKiBAcGFyYW0gdEljdSBDdXJyZW50IGBUSWN1YFxuICogQHBhcmFtIGxWaWV3IEN1cnJlbnQgYExWaWV3YFxuICovXG5mdW5jdGlvbiBhcHBseUljdVN3aXRjaENhc2VSZW1vdmUodFZpZXc6IFRWaWV3LCB0SWN1OiBUSWN1LCBsVmlldzogTFZpZXcpIHtcbiAgbGV0IGFjdGl2ZUNhc2VJbmRleCA9IGdldEN1cnJlbnRJQ1VDYXNlSW5kZXgodEljdSwgbFZpZXcpO1xuICBpZiAoYWN0aXZlQ2FzZUluZGV4ICE9PSBudWxsKSB7XG4gICAgY29uc3QgcmVtb3ZlQ29kZXMgPSB0SWN1LnJlbW92ZVthY3RpdmVDYXNlSW5kZXhdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVtb3ZlQ29kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IG5vZGVPckljdUluZGV4ID0gcmVtb3ZlQ29kZXNbaV0gYXMgbnVtYmVyO1xuICAgICAgaWYgKG5vZGVPckljdUluZGV4ID4gMCkge1xuICAgICAgICAvLyBQb3NpdGl2ZSBudW1iZXJzIGFyZSBgUk5vZGVgcy5cbiAgICAgICAgY29uc3Qgck5vZGUgPSBnZXROYXRpdmVCeUluZGV4KG5vZGVPckljdUluZGV4LCBsVmlldyk7XG4gICAgICAgIHJOb2RlICE9PSBudWxsICYmIG5hdGl2ZVJlbW92ZU5vZGUobFZpZXdbUkVOREVSRVJdLCByTm9kZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBOZWdhdGl2ZSBudW1iZXJzIGFyZSBJQ1VzXG4gICAgICAgIGFwcGx5SWN1U3dpdGNoQ2FzZVJlbW92ZSh0VmlldywgZ2V0VEljdSh0Vmlldywgfm5vZGVPckljdUluZGV4KSEsIGxWaWV3KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBjdXJyZW50IGNhc2Ugb2YgYW4gSUNVIGV4cHJlc3Npb24gZGVwZW5kaW5nIG9uIHRoZSBtYWluIGJpbmRpbmcgdmFsdWVcbiAqXG4gKiBAcGFyYW0gaWN1RXhwcmVzc2lvblxuICogQHBhcmFtIGJpbmRpbmdWYWx1ZSBUaGUgdmFsdWUgb2YgdGhlIG1haW4gYmluZGluZyB1c2VkIGJ5IHRoaXMgSUNVIGV4cHJlc3Npb25cbiAqL1xuZnVuY3Rpb24gZ2V0Q2FzZUluZGV4KGljdUV4cHJlc3Npb246IFRJY3UsIGJpbmRpbmdWYWx1ZTogc3RyaW5nKTogbnVtYmVyfG51bGwge1xuICBsZXQgaW5kZXggPSBpY3VFeHByZXNzaW9uLmNhc2VzLmluZGV4T2YoYmluZGluZ1ZhbHVlKTtcbiAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgIHN3aXRjaCAoaWN1RXhwcmVzc2lvbi50eXBlKSB7XG4gICAgICBjYXNlIEljdVR5cGUucGx1cmFsOiB7XG4gICAgICAgIGNvbnN0IHJlc29sdmVkQ2FzZSA9IGdldFBsdXJhbENhc2UoYmluZGluZ1ZhbHVlLCBnZXRMb2NhbGVJZCgpKTtcbiAgICAgICAgaW5kZXggPSBpY3VFeHByZXNzaW9uLmNhc2VzLmluZGV4T2YocmVzb2x2ZWRDYXNlKTtcbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSAmJiByZXNvbHZlZENhc2UgIT09ICdvdGhlcicpIHtcbiAgICAgICAgICBpbmRleCA9IGljdUV4cHJlc3Npb24uY2FzZXMuaW5kZXhPZignb3RoZXInKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgSWN1VHlwZS5zZWxlY3Q6IHtcbiAgICAgICAgaW5kZXggPSBpY3VFeHByZXNzaW9uLmNhc2VzLmluZGV4T2YoJ290aGVyJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gaW5kZXggPT09IC0xID8gbnVsbCA6IGluZGV4O1xufVxuIl19