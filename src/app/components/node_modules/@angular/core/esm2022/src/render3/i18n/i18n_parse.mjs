/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import '../../util/ng_dev_mode';
import '../../util/ng_i18n_closure_mode';
import { XSS_SECURITY_URL } from '../../error_details_base_url';
import { getTemplateContent, URI_ATTRS, VALID_ATTRS, VALID_ELEMENTS } from '../../sanitization/html_sanitizer';
import { getInertBodyHelper } from '../../sanitization/inert_body';
import { _sanitizeUrl } from '../../sanitization/url_sanitizer';
import { assertDefined, assertEqual, assertGreaterThanOrEqual, assertOneOf, assertString } from '../../util/assert';
import { loadIcuContainerVisitor } from '../instructions/i18n_icu_container_visitor';
import { allocExpando, createTNodeAtIndex } from '../instructions/shared';
import { getDocument } from '../interfaces/document';
import { ELEMENT_MARKER, I18nCreateOpCode, ICU_MARKER } from '../interfaces/i18n';
import { HEADER_OFFSET } from '../interfaces/view';
import { getCurrentParentTNode, getCurrentTNode, setCurrentTNode } from '../state';
import { i18nCreateOpCodesToString, i18nRemoveOpCodesToString, i18nUpdateOpCodesToString, icuCreateOpCodesToString } from './i18n_debug';
import { addTNodeAndUpdateInsertBeforeIndex } from './i18n_insert_before_index';
import { ensureIcuContainerVisitorLoaded } from './i18n_tree_shaking';
import { createTNodePlaceholder, icuCreateOpCode, setTIcu, setTNodeInsertBeforeIndex } from './i18n_util';
const BINDING_REGEXP = /�(\d+):?\d*�/gi;
const ICU_REGEXP = /({\s*�\d+:?\d*�\s*,\s*\S{6}\s*,[\s\S]*})/gi;
const NESTED_ICU = /�(\d+)�/;
const ICU_BLOCK_REGEXP = /^\s*(�\d+:?\d*�)\s*,\s*(select|plural)\s*,/;
const MARKER = `�`;
const SUBTEMPLATE_REGEXP = /�\/?\*(\d+:\d+)�/gi;
const PH_REGEXP = /�(\/?[#*]\d+):?\d*�/gi;
/**
 * Angular uses the special entity &ngsp; as a placeholder for non-removable space.
 * It's replaced by the 0xE500 PUA (Private Use Areas) unicode character and later on replaced by a
 * space.
 * We are re-implementing the same idea since translations might contain this special character.
 */
const NGSP_UNICODE_REGEXP = /\uE500/g;
function replaceNgsp(value) {
    return value.replace(NGSP_UNICODE_REGEXP, ' ');
}
/**
 * Patch a `debug` property getter on top of the existing object.
 *
 * NOTE: always call this method with `ngDevMode && attachDebugObject(...)`
 *
 * @param obj Object to patch
 * @param debugGetter Getter returning a value to patch
 */
function attachDebugGetter(obj, debugGetter) {
    if (ngDevMode) {
        Object.defineProperty(obj, 'debug', { get: debugGetter, enumerable: false });
    }
    else {
        throw new Error('This method should be guarded with `ngDevMode` so that it can be tree shaken in production!');
    }
}
/**
 * Create dynamic nodes from i18n translation block.
 *
 * - Text nodes are created synchronously
 * - TNodes are linked into tree lazily
 *
 * @param tView Current `TView`
 * @parentTNodeIndex index to the parent TNode of this i18n block
 * @param lView Current `LView`
 * @param index Index of `ɵɵi18nStart` instruction.
 * @param message Message to translate.
 * @param subTemplateIndex Index into the sub template of message translation. (ie in case of
 *     `ngIf`) (-1 otherwise)
 */
export function i18nStartFirstCreatePass(tView, parentTNodeIndex, lView, index, message, subTemplateIndex) {
    const rootTNode = getCurrentParentTNode();
    const createOpCodes = [];
    const updateOpCodes = [];
    const existingTNodeStack = [[]];
    const astStack = [[]];
    if (ngDevMode) {
        attachDebugGetter(createOpCodes, i18nCreateOpCodesToString);
        attachDebugGetter(updateOpCodes, i18nUpdateOpCodesToString);
    }
    message = getTranslationForTemplate(message, subTemplateIndex);
    const msgParts = replaceNgsp(message).split(PH_REGEXP);
    for (let i = 0; i < msgParts.length; i++) {
        let value = msgParts[i];
        if ((i & 1) === 0) {
            // Even indexes are text (including bindings & ICU expressions)
            const parts = i18nParseTextIntoPartsAndICU(value);
            for (let j = 0; j < parts.length; j++) {
                let part = parts[j];
                if ((j & 1) === 0) {
                    // `j` is odd therefore `part` is string
                    const text = part;
                    ngDevMode && assertString(text, 'Parsed ICU part should be string');
                    if (text !== '') {
                        i18nStartFirstCreatePassProcessTextNode(astStack[0], tView, rootTNode, existingTNodeStack[0], createOpCodes, updateOpCodes, lView, text);
                    }
                }
                else {
                    // `j` is Even therefor `part` is an `ICUExpression`
                    const icuExpression = part;
                    // Verify that ICU expression has the right shape. Translations might contain invalid
                    // constructions (while original messages were correct), so ICU parsing at runtime may
                    // not succeed (thus `icuExpression` remains a string).
                    // Note: we intentionally retain the error here by not using `ngDevMode`, because
                    // the value can change based on the locale and users aren't guaranteed to hit
                    // an invalid string while they're developing.
                    if (typeof icuExpression !== 'object') {
                        throw new Error(`Unable to parse ICU expression in "${message}" message.`);
                    }
                    const icuContainerTNode = createTNodeAndAddOpCode(tView, rootTNode, existingTNodeStack[0], lView, createOpCodes, ngDevMode ? `ICU ${index}:${icuExpression.mainBinding}` : '', true);
                    const icuNodeIndex = icuContainerTNode.index;
                    ngDevMode &&
                        assertGreaterThanOrEqual(icuNodeIndex, HEADER_OFFSET, 'Index must be in absolute LView offset');
                    icuStart(astStack[0], tView, lView, updateOpCodes, parentTNodeIndex, icuExpression, icuNodeIndex);
                }
            }
        }
        else {
            // Odd indexes are placeholders (elements and sub-templates)
            // At this point value is something like: '/#1:2' (originally coming from '�/#1:2�')
            const isClosing = value.charCodeAt(0) === 47 /* CharCode.SLASH */;
            const type = value.charCodeAt(isClosing ? 1 : 0);
            ngDevMode && assertOneOf(type, 42 /* CharCode.STAR */, 35 /* CharCode.HASH */);
            const index = HEADER_OFFSET + Number.parseInt(value.substring((isClosing ? 2 : 1)));
            if (isClosing) {
                existingTNodeStack.shift();
                astStack.shift();
                setCurrentTNode(getCurrentParentTNode(), false);
            }
            else {
                const tNode = createTNodePlaceholder(tView, existingTNodeStack[0], index);
                existingTNodeStack.unshift([]);
                setCurrentTNode(tNode, true);
                const placeholderNode = {
                    kind: 2 /* I18nNodeKind.PLACEHOLDER */,
                    index,
                    children: [],
                    type: type === 35 /* CharCode.HASH */ ? 0 /* I18nPlaceholderType.ELEMENT */ :
                        1 /* I18nPlaceholderType.SUBTEMPLATE */,
                };
                astStack[0].push(placeholderNode);
                astStack.unshift(placeholderNode.children);
            }
        }
    }
    tView.data[index] = {
        create: createOpCodes,
        update: updateOpCodes,
        ast: astStack[0],
    };
}
/**
 * Allocate space in i18n Range add create OpCode instruction to create a text or comment node.
 *
 * @param tView Current `TView` needed to allocate space in i18n range.
 * @param rootTNode Root `TNode` of the i18n block. This node determines if the new TNode will be
 *     added as part of the `i18nStart` instruction or as part of the `TNode.insertBeforeIndex`.
 * @param existingTNodes internal state for `addTNodeAndUpdateInsertBeforeIndex`.
 * @param lView Current `LView` needed to allocate space in i18n range.
 * @param createOpCodes Array storing `I18nCreateOpCodes` where new opCodes will be added.
 * @param text Text to be added when the `Text` or `Comment` node will be created.
 * @param isICU true if a `Comment` node for ICU (instead of `Text`) node should be created.
 */
function createTNodeAndAddOpCode(tView, rootTNode, existingTNodes, lView, createOpCodes, text, isICU) {
    const i18nNodeIdx = allocExpando(tView, lView, 1, null);
    let opCode = i18nNodeIdx << I18nCreateOpCode.SHIFT;
    let parentTNode = getCurrentParentTNode();
    if (rootTNode === parentTNode) {
        // FIXME(misko): A null `parentTNode` should represent when we fall of the `LView` boundary.
        // (there is no parent), but in some circumstances (because we are inconsistent about how we set
        // `previousOrParentTNode`) it could point to `rootTNode` So this is a work around.
        parentTNode = null;
    }
    if (parentTNode === null) {
        // If we don't have a parent that means that we can eagerly add nodes.
        // If we have a parent than these nodes can't be added now (as the parent has not been created
        // yet) and instead the `parentTNode` is responsible for adding it. See
        // `TNode.insertBeforeIndex`
        opCode |= I18nCreateOpCode.APPEND_EAGERLY;
    }
    if (isICU) {
        opCode |= I18nCreateOpCode.COMMENT;
        ensureIcuContainerVisitorLoaded(loadIcuContainerVisitor);
    }
    createOpCodes.push(opCode, text === null ? '' : text);
    // We store `{{?}}` so that when looking at debug `TNodeType.template` we can see where the
    // bindings are.
    const tNode = createTNodeAtIndex(tView, i18nNodeIdx, isICU ? 32 /* TNodeType.Icu */ : 1 /* TNodeType.Text */, text === null ? (ngDevMode ? '{{?}}' : '') : text, null);
    addTNodeAndUpdateInsertBeforeIndex(existingTNodes, tNode);
    const tNodeIdx = tNode.index;
    setCurrentTNode(tNode, false /* Text nodes are self closing */);
    if (parentTNode !== null && rootTNode !== parentTNode) {
        // We are a child of deeper node (rather than a direct child of `i18nStart` instruction.)
        // We have to make sure to add ourselves to the parent.
        setTNodeInsertBeforeIndex(parentTNode, tNodeIdx);
    }
    return tNode;
}
/**
 * Processes text node in i18n block.
 *
 * Text nodes can have:
 * - Create instruction in `createOpCodes` for creating the text node.
 * - Allocate spec for text node in i18n range of `LView`
 * - If contains binding:
 *    - bindings => allocate space in i18n range of `LView` to store the binding value.
 *    - populate `updateOpCodes` with update instructions.
 *
 * @param tView Current `TView`
 * @param rootTNode Root `TNode` of the i18n block. This node determines if the new TNode will
 *     be added as part of the `i18nStart` instruction or as part of the
 *     `TNode.insertBeforeIndex`.
 * @param existingTNodes internal state for `addTNodeAndUpdateInsertBeforeIndex`.
 * @param createOpCodes Location where the creation OpCodes will be stored.
 * @param lView Current `LView`
 * @param text The translated text (which may contain binding)
 */
function i18nStartFirstCreatePassProcessTextNode(ast, tView, rootTNode, existingTNodes, createOpCodes, updateOpCodes, lView, text) {
    const hasBinding = text.match(BINDING_REGEXP);
    const tNode = createTNodeAndAddOpCode(tView, rootTNode, existingTNodes, lView, createOpCodes, hasBinding ? null : text, false);
    const index = tNode.index;
    if (hasBinding) {
        generateBindingUpdateOpCodes(updateOpCodes, text, index, null, 0, null);
    }
    ast.push({ kind: 0 /* I18nNodeKind.TEXT */, index });
}
/**
 * See `i18nAttributes` above.
 */
export function i18nAttributesFirstPass(tView, index, values) {
    const previousElement = getCurrentTNode();
    const previousElementIndex = previousElement.index;
    const updateOpCodes = [];
    if (ngDevMode) {
        attachDebugGetter(updateOpCodes, i18nUpdateOpCodesToString);
    }
    if (tView.firstCreatePass && tView.data[index] === null) {
        for (let i = 0; i < values.length; i += 2) {
            const attrName = values[i];
            const message = values[i + 1];
            if (message !== '') {
                // Check if attribute value contains an ICU and throw an error if that's the case.
                // ICUs in element attributes are not supported.
                // Note: we intentionally retain the error here by not using `ngDevMode`, because
                // the `value` can change based on the locale and users aren't guaranteed to hit
                // an invalid string while they're developing.
                if (ICU_REGEXP.test(message)) {
                    throw new Error(`ICU expressions are not supported in attributes. Message: "${message}".`);
                }
                // i18n attributes that hit this code path are guaranteed to have bindings, because
                // the compiler treats static i18n attributes as regular attribute bindings.
                // Since this may not be the first i18n attribute on this element we need to pass in how
                // many previous bindings there have already been.
                generateBindingUpdateOpCodes(updateOpCodes, message, previousElementIndex, attrName, countBindings(updateOpCodes), null);
            }
        }
        tView.data[index] = updateOpCodes;
    }
}
/**
 * Generate the OpCodes to update the bindings of a string.
 *
 * @param updateOpCodes Place where the update opcodes will be stored.
 * @param str The string containing the bindings.
 * @param destinationNode Index of the destination node which will receive the binding.
 * @param attrName Name of the attribute, if the string belongs to an attribute.
 * @param sanitizeFn Sanitization function used to sanitize the string after update, if necessary.
 * @param bindingStart The lView index of the next expression that can be bound via an opCode.
 * @returns The mask value for these bindings
 */
function generateBindingUpdateOpCodes(updateOpCodes, str, destinationNode, attrName, bindingStart, sanitizeFn) {
    ngDevMode &&
        assertGreaterThanOrEqual(destinationNode, HEADER_OFFSET, 'Index must be in absolute LView offset');
    const maskIndex = updateOpCodes.length; // Location of mask
    const sizeIndex = maskIndex + 1; // location of size for skipping
    updateOpCodes.push(null, null); // Alloc space for mask and size
    const startIndex = maskIndex + 2; // location of first allocation.
    if (ngDevMode) {
        attachDebugGetter(updateOpCodes, i18nUpdateOpCodesToString);
    }
    const textParts = str.split(BINDING_REGEXP);
    let mask = 0;
    for (let j = 0; j < textParts.length; j++) {
        const textValue = textParts[j];
        if (j & 1) {
            // Odd indexes are bindings
            const bindingIndex = bindingStart + parseInt(textValue, 10);
            updateOpCodes.push(-1 - bindingIndex);
            mask = mask | toMaskBit(bindingIndex);
        }
        else if (textValue !== '') {
            // Even indexes are text
            updateOpCodes.push(textValue);
        }
    }
    updateOpCodes.push(destinationNode << 2 /* I18nUpdateOpCode.SHIFT_REF */ |
        (attrName ? 1 /* I18nUpdateOpCode.Attr */ : 0 /* I18nUpdateOpCode.Text */));
    if (attrName) {
        updateOpCodes.push(attrName, sanitizeFn);
    }
    updateOpCodes[maskIndex] = mask;
    updateOpCodes[sizeIndex] = updateOpCodes.length - startIndex;
    return mask;
}
/**
 * Count the number of bindings in the given `opCodes`.
 *
 * It could be possible to speed this up, by passing the number of bindings found back from
 * `generateBindingUpdateOpCodes()` to `i18nAttributesFirstPass()` but this would then require more
 * complexity in the code and/or transient objects to be created.
 *
 * Since this function is only called once when the template is instantiated, is trivial in the
 * first instance (since `opCodes` will be an empty array), and it is not common for elements to
 * contain multiple i18n bound attributes, it seems like this is a reasonable compromise.
 */
function countBindings(opCodes) {
    let count = 0;
    for (let i = 0; i < opCodes.length; i++) {
        const opCode = opCodes[i];
        // Bindings are negative numbers.
        if (typeof opCode === 'number' && opCode < 0) {
            count++;
        }
    }
    return count;
}
/**
 * Convert binding index to mask bit.
 *
 * Each index represents a single bit on the bit-mask. Because bit-mask only has 32 bits, we make
 * the 32nd bit share all masks for all bindings higher than 32. Since it is extremely rare to
 * have more than 32 bindings this will be hit very rarely. The downside of hitting this corner
 * case is that we will execute binding code more often than necessary. (penalty of performance)
 */
function toMaskBit(bindingIndex) {
    return 1 << Math.min(bindingIndex, 31);
}
function isRootTemplateMessage(subTemplateIndex) {
    return subTemplateIndex === -1;
}
/**
 * Removes everything inside the sub-templates of a message.
 */
function removeInnerTemplateTranslation(message) {
    let match;
    let res = '';
    let index = 0;
    let inTemplate = false;
    let tagMatched;
    while ((match = SUBTEMPLATE_REGEXP.exec(message)) !== null) {
        if (!inTemplate) {
            res += message.substring(index, match.index + match[0].length);
            tagMatched = match[1];
            inTemplate = true;
        }
        else {
            if (match[0] === `${MARKER}/*${tagMatched}${MARKER}`) {
                index = match.index;
                inTemplate = false;
            }
        }
    }
    ngDevMode &&
        assertEqual(inTemplate, false, `Tag mismatch: unable to find the end of the sub-template in the translation "${message}"`);
    res += message.slice(index);
    return res;
}
/**
 * Extracts a part of a message and removes the rest.
 *
 * This method is used for extracting a part of the message associated with a template. A
 * translated message can span multiple templates.
 *
 * Example:
 * ```
 * <div i18n>Translate <span *ngIf>me</span>!</div>
 * ```
 *
 * @param message The message to crop
 * @param subTemplateIndex Index of the sub-template to extract. If undefined it returns the
 * external template and removes all sub-templates.
 */
export function getTranslationForTemplate(message, subTemplateIndex) {
    if (isRootTemplateMessage(subTemplateIndex)) {
        // We want the root template message, ignore all sub-templates
        return removeInnerTemplateTranslation(message);
    }
    else {
        // We want a specific sub-template
        const start = message.indexOf(`:${subTemplateIndex}${MARKER}`) + 2 + subTemplateIndex.toString().length;
        const end = message.search(new RegExp(`${MARKER}\\/\\*\\d+:${subTemplateIndex}${MARKER}`));
        return removeInnerTemplateTranslation(message.substring(start, end));
    }
}
/**
 * Generate the OpCodes for ICU expressions.
 *
 * @param icuExpression
 * @param index Index where the anchor is stored and an optional `TIcuContainerNode`
 *   - `lView[anchorIdx]` points to a `Comment` node representing the anchor for the ICU.
 *   - `tView.data[anchorIdx]` points to the `TIcuContainerNode` if ICU is root (`null` otherwise)
 */
function icuStart(ast, tView, lView, updateOpCodes, parentIdx, icuExpression, anchorIdx) {
    ngDevMode && assertDefined(icuExpression, 'ICU expression must be defined');
    let bindingMask = 0;
    const tIcu = {
        type: icuExpression.type,
        currentCaseLViewIndex: allocExpando(tView, lView, 1, null),
        anchorIdx,
        cases: [],
        create: [],
        remove: [],
        update: []
    };
    addUpdateIcuSwitch(updateOpCodes, icuExpression, anchorIdx);
    setTIcu(tView, anchorIdx, tIcu);
    const values = icuExpression.values;
    const cases = [];
    for (let i = 0; i < values.length; i++) {
        // Each value is an array of strings & other ICU expressions
        const valueArr = values[i];
        const nestedIcus = [];
        for (let j = 0; j < valueArr.length; j++) {
            const value = valueArr[j];
            if (typeof value !== 'string') {
                // It is an nested ICU expression
                const icuIndex = nestedIcus.push(value) - 1;
                // Replace nested ICU expression by a comment node
                valueArr[j] = `<!--�${icuIndex}�-->`;
            }
        }
        const caseAst = [];
        cases.push(caseAst);
        bindingMask = parseIcuCase(caseAst, tView, tIcu, lView, updateOpCodes, parentIdx, icuExpression.cases[i], valueArr.join(''), nestedIcus) |
            bindingMask;
    }
    if (bindingMask) {
        addUpdateIcuUpdate(updateOpCodes, bindingMask, anchorIdx);
    }
    ast.push({
        kind: 3 /* I18nNodeKind.ICU */,
        index: anchorIdx,
        cases,
        currentCaseLViewIndex: tIcu.currentCaseLViewIndex
    });
}
/**
 * Parses text containing an ICU expression and produces a JSON object for it.
 * Original code from closure library, modified for Angular.
 *
 * @param pattern Text containing an ICU expression that needs to be parsed.
 *
 */
function parseICUBlock(pattern) {
    const cases = [];
    const values = [];
    let icuType = 1 /* IcuType.plural */;
    let mainBinding = 0;
    pattern = pattern.replace(ICU_BLOCK_REGEXP, function (str, binding, type) {
        if (type === 'select') {
            icuType = 0 /* IcuType.select */;
        }
        else {
            icuType = 1 /* IcuType.plural */;
        }
        mainBinding = parseInt(binding.slice(1), 10);
        return '';
    });
    const parts = i18nParseTextIntoPartsAndICU(pattern);
    // Looking for (key block)+ sequence. One of the keys has to be "other".
    for (let pos = 0; pos < parts.length;) {
        let key = parts[pos++].trim();
        if (icuType === 1 /* IcuType.plural */) {
            // Key can be "=x", we just want "x"
            key = key.replace(/\s*(?:=)?(\w+)\s*/, '$1');
        }
        if (key.length) {
            cases.push(key);
        }
        const blocks = i18nParseTextIntoPartsAndICU(parts[pos++]);
        if (cases.length > values.length) {
            values.push(blocks);
        }
    }
    // TODO(ocombe): support ICU expressions in attributes, see #21615
    return { type: icuType, mainBinding: mainBinding, cases, values };
}
/**
 * Breaks pattern into strings and top level {...} blocks.
 * Can be used to break a message into text and ICU expressions, or to break an ICU expression
 * into keys and cases. Original code from closure library, modified for Angular.
 *
 * @param pattern (sub)Pattern to be broken.
 * @returns An `Array<string|IcuExpression>` where:
 *   - odd positions: `string` => text between ICU expressions
 *   - even positions: `ICUExpression` => ICU expression parsed into `ICUExpression` record.
 */
function i18nParseTextIntoPartsAndICU(pattern) {
    if (!pattern) {
        return [];
    }
    let prevPos = 0;
    const braceStack = [];
    const results = [];
    const braces = /[{}]/g;
    // lastIndex doesn't get set to 0 so we have to.
    braces.lastIndex = 0;
    let match;
    while (match = braces.exec(pattern)) {
        const pos = match.index;
        if (match[0] == '}') {
            braceStack.pop();
            if (braceStack.length == 0) {
                // End of the block.
                const block = pattern.substring(prevPos, pos);
                if (ICU_BLOCK_REGEXP.test(block)) {
                    results.push(parseICUBlock(block));
                }
                else {
                    results.push(block);
                }
                prevPos = pos + 1;
            }
        }
        else {
            if (braceStack.length == 0) {
                const substring = pattern.substring(prevPos, pos);
                results.push(substring);
                prevPos = pos + 1;
            }
            braceStack.push('{');
        }
    }
    const substring = pattern.substring(prevPos);
    results.push(substring);
    return results;
}
/**
 * Parses a node, its children and its siblings, and generates the mutate & update OpCodes.
 *
 */
function parseIcuCase(ast, tView, tIcu, lView, updateOpCodes, parentIdx, caseName, unsafeCaseHtml, nestedIcus) {
    const create = [];
    const remove = [];
    const update = [];
    if (ngDevMode) {
        attachDebugGetter(create, icuCreateOpCodesToString);
        attachDebugGetter(remove, i18nRemoveOpCodesToString);
        attachDebugGetter(update, i18nUpdateOpCodesToString);
    }
    tIcu.cases.push(caseName);
    tIcu.create.push(create);
    tIcu.remove.push(remove);
    tIcu.update.push(update);
    const inertBodyHelper = getInertBodyHelper(getDocument());
    const inertBodyElement = inertBodyHelper.getInertBodyElement(unsafeCaseHtml);
    ngDevMode && assertDefined(inertBodyElement, 'Unable to generate inert body element');
    const inertRootNode = getTemplateContent(inertBodyElement) || inertBodyElement;
    if (inertRootNode) {
        return walkIcuTree(ast, tView, tIcu, lView, updateOpCodes, create, remove, update, inertRootNode, parentIdx, nestedIcus, 0);
    }
    else {
        return 0;
    }
}
function walkIcuTree(ast, tView, tIcu, lView, sharedUpdateOpCodes, create, remove, update, parentNode, parentIdx, nestedIcus, depth) {
    let bindingMask = 0;
    let currentNode = parentNode.firstChild;
    while (currentNode) {
        const newIndex = allocExpando(tView, lView, 1, null);
        switch (currentNode.nodeType) {
            case Node.ELEMENT_NODE:
                const element = currentNode;
                const tagName = element.tagName.toLowerCase();
                if (VALID_ELEMENTS.hasOwnProperty(tagName)) {
                    addCreateNodeAndAppend(create, ELEMENT_MARKER, tagName, parentIdx, newIndex);
                    tView.data[newIndex] = tagName;
                    const elAttrs = element.attributes;
                    for (let i = 0; i < elAttrs.length; i++) {
                        const attr = elAttrs.item(i);
                        const lowerAttrName = attr.name.toLowerCase();
                        const hasBinding = !!attr.value.match(BINDING_REGEXP);
                        // we assume the input string is safe, unless it's using a binding
                        if (hasBinding) {
                            if (VALID_ATTRS.hasOwnProperty(lowerAttrName)) {
                                if (URI_ATTRS[lowerAttrName]) {
                                    generateBindingUpdateOpCodes(update, attr.value, newIndex, attr.name, 0, _sanitizeUrl);
                                }
                                else {
                                    generateBindingUpdateOpCodes(update, attr.value, newIndex, attr.name, 0, null);
                                }
                            }
                            else {
                                ngDevMode &&
                                    console.warn(`WARNING: ignoring unsafe attribute value ` +
                                        `${lowerAttrName} on element ${tagName} ` +
                                        `(see ${XSS_SECURITY_URL})`);
                            }
                        }
                        else {
                            addCreateAttribute(create, newIndex, attr);
                        }
                    }
                    const elementNode = {
                        kind: 1 /* I18nNodeKind.ELEMENT */,
                        index: newIndex,
                        children: [],
                    };
                    ast.push(elementNode);
                    // Parse the children of this node (if any)
                    bindingMask =
                        walkIcuTree(elementNode.children, tView, tIcu, lView, sharedUpdateOpCodes, create, remove, update, currentNode, newIndex, nestedIcus, depth + 1) |
                            bindingMask;
                    addRemoveNode(remove, newIndex, depth);
                }
                break;
            case Node.TEXT_NODE:
                const value = currentNode.textContent || '';
                const hasBinding = value.match(BINDING_REGEXP);
                addCreateNodeAndAppend(create, null, hasBinding ? '' : value, parentIdx, newIndex);
                addRemoveNode(remove, newIndex, depth);
                if (hasBinding) {
                    bindingMask =
                        generateBindingUpdateOpCodes(update, value, newIndex, null, 0, null) | bindingMask;
                }
                ast.push({
                    kind: 0 /* I18nNodeKind.TEXT */,
                    index: newIndex,
                });
                break;
            case Node.COMMENT_NODE:
                // Check if the comment node is a placeholder for a nested ICU
                const isNestedIcu = NESTED_ICU.exec(currentNode.textContent || '');
                if (isNestedIcu) {
                    const nestedIcuIndex = parseInt(isNestedIcu[1], 10);
                    const icuExpression = nestedIcus[nestedIcuIndex];
                    // Create the comment node that will anchor the ICU expression
                    addCreateNodeAndAppend(create, ICU_MARKER, ngDevMode ? `nested ICU ${nestedIcuIndex}` : '', parentIdx, newIndex);
                    icuStart(ast, tView, lView, sharedUpdateOpCodes, parentIdx, icuExpression, newIndex);
                    addRemoveNestedIcu(remove, newIndex, depth);
                }
                break;
        }
        currentNode = currentNode.nextSibling;
    }
    return bindingMask;
}
function addRemoveNode(remove, index, depth) {
    if (depth === 0) {
        remove.push(index);
    }
}
function addRemoveNestedIcu(remove, index, depth) {
    if (depth === 0) {
        remove.push(~index); // remove ICU at `index`
        remove.push(index); // remove ICU comment at `index`
    }
}
function addUpdateIcuSwitch(update, icuExpression, index) {
    update.push(toMaskBit(icuExpression.mainBinding), 2, -1 - icuExpression.mainBinding, index << 2 /* I18nUpdateOpCode.SHIFT_REF */ | 2 /* I18nUpdateOpCode.IcuSwitch */);
}
function addUpdateIcuUpdate(update, bindingMask, index) {
    update.push(bindingMask, 1, index << 2 /* I18nUpdateOpCode.SHIFT_REF */ | 3 /* I18nUpdateOpCode.IcuUpdate */);
}
function addCreateNodeAndAppend(create, marker, text, appendToParentIdx, createAtIdx) {
    if (marker !== null) {
        create.push(marker);
    }
    create.push(text, createAtIdx, icuCreateOpCode(0 /* IcuCreateOpCode.AppendChild */, appendToParentIdx, createAtIdx));
}
function addCreateAttribute(create, newIndex, attr) {
    create.push(newIndex << 1 /* IcuCreateOpCode.SHIFT_REF */ | 1 /* IcuCreateOpCode.Attr */, attr.name, attr.value);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bl9wYXJzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaTE4bi9pMThuX3BhcnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxpQ0FBaUMsQ0FBQztBQUV6QyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCxPQUFPLEVBQUMsa0JBQWtCLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUM3RyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDOUQsT0FBTyxFQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsd0JBQXdCLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRWxILE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDRDQUE0QyxDQUFDO0FBQ25GLE9BQU8sRUFBQyxZQUFZLEVBQUUsa0JBQWtCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDbkQsT0FBTyxFQUFDLGNBQWMsRUFBRSxnQkFBZ0IsRUFBZ0ssVUFBVSxFQUF5RSxNQUFNLG9CQUFvQixDQUFDO0FBR3RULE9BQU8sRUFBQyxhQUFhLEVBQWUsTUFBTSxvQkFBb0IsQ0FBQztBQUMvRCxPQUFPLEVBQUMscUJBQXFCLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUVqRixPQUFPLEVBQUMseUJBQXlCLEVBQUUseUJBQXlCLEVBQUUseUJBQXlCLEVBQUUsd0JBQXdCLEVBQUMsTUFBTSxjQUFj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QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxLQUFLLHNDQUE4QixxQ0FBNkIsQ0FBQyxDQUFDO0FBQ2hHLENBQUM7QUFFRCxTQUFTLHNCQUFzQixDQUMzQixNQUF3QixFQUFFLE1BQXNDLEVBQUUsSUFBWSxFQUM5RSxpQkFBeUIsRUFBRSxXQUFtQjtJQUNoRCxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFDRCxNQUFNLENBQUMsSUFBSSxDQUNQLElBQUksRUFBRSxXQUFXLEVBQ2pCLGVBQWUsc0NBQThCLGlCQUFpQixFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7QUFDcEYsQ0FBQztBQUVELFNBQVMsa0JBQWtCLENBQUMsTUFBd0IsRUFBRSxRQUFnQixFQUFFLElBQVU7SUFDaEYsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLHFDQUE2QiwrQkFBdUIsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNuRyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgJy4uLy4uL3V0aWwvbmdfZGV2X21vZGUnO1xuaW1wb3J0ICcuLi8uLi91dGlsL25nX2kxOG5fY2xvc3VyZV9tb2RlJztcblxuaW1wb3J0IHtYU1NfU0VDVVJJVFlfVVJMfSBmcm9tICcuLi8uLi9lcnJvcl9kZXRhaWxzX2Jhc2VfdXJsJztcbmltcG9ydCB7Z2V0VGVtcGxhdGVDb250ZW50LCBVUklfQVRUUlMsIFZBTElEX0FUVFJTLCBWQUxJRF9FTEVNRU5UU30gZnJvbSAnLi4vLi4vc2FuaXRpemF0aW9uL2h0bWxfc2FuaXRpemVyJztcbmltcG9ydCB7Z2V0SW5lcnRCb2R5SGVscGVyfSBmcm9tICcuLi8uLi9zYW5pdGl6YXRpb24vaW5lcnRfYm9keSc7XG5pbXBvcnQge19zYW5pdGl6ZVVybH0gZnJvbSAnLi4vLi4vc2FuaXRpemF0aW9uL3VybF9zYW5pdGl6ZXInO1xuaW1wb3J0IHthc3NlcnREZWZpbmVkLCBhc3NlcnRFcXVhbCwgYXNzZXJ0R3JlYXRlclRoYW5PckVxdWFsLCBhc3NlcnRPbmVPZiwgYXNzZXJ0U3RyaW5nfSBmcm9tICcuLi8uLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQge0NoYXJDb2RlfSBmcm9tICcuLi8uLi91dGlsL2NoYXJfY29kZSc7XG5pbXBvcnQge2xvYWRJY3VDb250YWluZXJWaXNpdG9yfSBmcm9tICcuLi9pbnN0cnVjdGlvbnMvaTE4bl9pY3VfY29udGFpbmVyX3Zpc2l0b3InO1xuaW1wb3J0IHthbGxvY0V4cGFuZG8sIGNyZWF0ZVROb2RlQXRJbmRleH0gZnJvbSAnLi4vaW5zdHJ1Y3Rpb25zL3NoYXJlZCc7XG5pbXBvcnQge2dldERvY3VtZW50fSBmcm9tICcuLi9pbnRlcmZhY2VzL2RvY3VtZW50JztcbmltcG9ydCB7RUxFTUVOVF9NQVJLRVIsIEkxOG5DcmVhdGVPcENvZGUsIEkxOG5DcmVhdGVPcENvZGVzLCBJMThuRWxlbWVudE5vZGUsIEkxOG5Ob2RlLCBJMThuTm9kZUtpbmQsIEkxOG5QbGFjZWhvbGRlck5vZGUsIEkxOG5QbGFjZWhvbGRlclR5cGUsIEkxOG5SZW1vdmVPcENvZGVzLCBJMThuVXBkYXRlT3BDb2RlLCBJMThuVXBkYXRlT3BDb2RlcywgSUNVX01BUktFUiwgSWN1Q3JlYXRlT3BDb2RlLCBJY3VDcmVhdGVPcENvZGVzLCBJY3VFeHByZXNzaW9uLCBJY3VUeXBlLCBUSTE4biwgVEljdX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pMThuJztcbmltcG9ydCB7VE5vZGUsIFROb2RlVHlwZX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9ub2RlJztcbmltcG9ydCB7U2FuaXRpemVyRm59IGZyb20gJy4uL2ludGVyZmFjZXMvc2FuaXRpemF0aW9uJztcbmltcG9ydCB7SEVBREVSX09GRlNFVCwgTFZpZXcsIFRWaWV3fSBmcm9tICcuLi9pbnRlcmZhY2VzL3ZpZXcnO1xuaW1wb3J0IHtnZXRDdXJyZW50UGFyZW50VE5vZGUsIGdldEN1cnJlbnRUTm9kZSwgc2V0Q3VycmVudFROb2RlfSBmcm9tICcuLi9zdGF0ZSc7XG5cbmltcG9ydCB7aTE4bkNyZWF0ZU9wQ29kZXNUb1N0cmluZywgaTE4blJlbW92ZU9wQ29kZXNUb1N0cmluZywgaTE4blVwZGF0ZU9wQ29kZXNUb1N0cmluZywgaWN1Q3JlYXRlT3BDb2Rlc1RvU3RyaW5nfSBmcm9tICcuL2kxOG5fZGVidWcnO1xuaW1wb3J0IHthZGRUTm9kZUFuZFVwZGF0ZUluc2VydEJlZm9yZUluZGV4fSBmcm9tICcuL2kxOG5faW5zZXJ0X2JlZm9yZV9pbmRleCc7XG5pbXBvcnQge2Vuc3VyZUljdUNvbnRhaW5lclZpc2l0b3JMb2FkZWR9IGZyb20gJy4vaTE4bl90cmVlX3NoYWtpbmcnO1xuaW1wb3J0IHtjcmVhdGVUTm9kZVBsYWNlaG9sZGVyLCBpY3VDcmVhdGVPcENvZGUsIHNldFRJY3UsIHNldFROb2RlSW5zZXJ0QmVmb3JlSW5kZXh9IGZyb20gJy4vaTE4bl91dGlsJztcblxuXG5cbmNvbnN0IEJJTkRJTkdfUkVHRVhQID0gL++/vShcXGQrKTo/XFxkKu+/vS9naTtcbmNvbnN0IElDVV9SRUdFWFAgPSAvKHtcXHMq77+9XFxkKzo/XFxkKu+/vVxccyosXFxzKlxcU3s2fVxccyosW1xcc1xcU10qfSkvZ2k7XG5jb25zdCBORVNURURfSUNVID0gL++/vShcXGQrKe+/vS87XG5jb25zdCBJQ1VfQkxPQ0tfUkVHRVhQID0gL15cXHMqKO+/vVxcZCs6P1xcZCrvv70pXFxzKixcXHMqKHNlbGVjdHxwbHVyYWwpXFxzKiwvO1xuXG5jb25zdCBNQVJLRVIgPSBg77+9YDtcbmNvbnN0IFNVQlRFTVBMQVRFX1JFR0VYUCA9IC/vv71cXC8/XFwqKFxcZCs6XFxkKynvv70vZ2k7XG5jb25zdCBQSF9SRUdFWFAgPSAv77+9KFxcLz9bIypdXFxkKyk6P1xcZCrvv70vZ2k7XG5cbi8qKlxuICogQW5ndWxhciB1c2VzIHRoZSBzcGVjaWFsIGVudGl0eSAmbmdzcDsgYXMgYSBwbGFjZWhvbGRlciBmb3Igbm9uLXJlbW92YWJsZSBzcGFjZS5cbiAqIEl0J3MgcmVwbGFjZWQgYnkgdGhlIDB4RTUwMCBQVUEgKFByaXZhdGUgVXNlIEFyZWFzKSB1bmljb2RlIGNoYXJhY3RlciBhbmQgbGF0ZXIgb24gcmVwbGFjZWQgYnkgYVxuICogc3BhY2UuXG4gKiBXZSBhcmUgcmUtaW1wbGVtZW50aW5nIHRoZSBzYW1lIGlkZWEgc2luY2UgdHJhbnNsYXRpb25zIG1pZ2h0IGNvbnRhaW4gdGhpcyBzcGVjaWFsIGNoYXJhY3Rlci5cbiAqL1xuY29uc3QgTkdTUF9VTklDT0RFX1JFR0VYUCA9IC9cXHVFNTAwL2c7XG5mdW5jdGlvbiByZXBsYWNlTmdzcCh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoTkdTUF9VTklDT0RFX1JFR0VYUCwgJyAnKTtcbn1cblxuLyoqXG4gKiBQYXRjaCBhIGBkZWJ1Z2AgcHJvcGVydHkgZ2V0dGVyIG9uIHRvcCBvZiB0aGUgZXhpc3Rpbmcgb2JqZWN0LlxuICpcbiAqIE5PVEU6IGFsd2F5cyBjYWxsIHRoaXMgbWV0aG9kIHdpdGggYG5nRGV2TW9kZSAmJiBhdHRhY2hEZWJ1Z09iamVjdCguLi4pYFxuICpcbiAqIEBwYXJhbSBvYmogT2JqZWN0IHRvIHBhdGNoXG4gKiBAcGFyYW0gZGVidWdHZXR0ZXIgR2V0dGVyIHJldHVybmluZyBhIHZhbHVlIHRvIHBhdGNoXG4gKi9cbmZ1bmN0aW9uIGF0dGFjaERlYnVnR2V0dGVyPFQ+KG9iajogVCwgZGVidWdHZXR0ZXI6ICh0aGlzOiBUKSA9PiBhbnkpOiB2b2lkIHtcbiAgaWYgKG5nRGV2TW9kZSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICdkZWJ1ZycsIHtnZXQ6IGRlYnVnR2V0dGVyLCBlbnVtZXJhYmxlOiBmYWxzZX0pO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1RoaXMgbWV0aG9kIHNob3VsZCBiZSBndWFyZGVkIHdpdGggYG5nRGV2TW9kZWAgc28gdGhhdCBpdCBjYW4gYmUgdHJlZSBzaGFrZW4gaW4gcHJvZHVjdGlvbiEnKTtcbiAgfVxufVxuXG4vKipcbiAqIENyZWF0ZSBkeW5hbWljIG5vZGVzIGZyb20gaTE4biB0cmFuc2xhdGlvbiBibG9jay5cbiAqXG4gKiAtIFRleHQgbm9kZXMgYXJlIGNyZWF0ZWQgc3luY2hyb25vdXNseVxuICogLSBUTm9kZXMgYXJlIGxpbmtlZCBpbnRvIHRyZWUgbGF6aWx5XG4gKlxuICogQHBhcmFtIHRWaWV3IEN1cnJlbnQgYFRWaWV3YFxuICogQHBhcmVudFROb2RlSW5kZXggaW5kZXggdG8gdGhlIHBhcmVudCBUTm9kZSBvZiB0aGlzIGkxOG4gYmxvY2tcbiAqIEBwYXJhbSBsVmlldyBDdXJyZW50IGBMVmlld2BcbiAqIEBwYXJhbSBpbmRleCBJbmRleCBvZiBgybXJtWkxOG5TdGFydGAgaW5zdHJ1Y3Rpb24uXG4gKiBAcGFyYW0gbWVzc2FnZSBNZXNzYWdlIHRvIHRyYW5zbGF0ZS5cbiAqIEBwYXJhbSBzdWJUZW1wbGF0ZUluZGV4IEluZGV4IGludG8gdGhlIHN1YiB0ZW1wbGF0ZSBvZiBtZXNzYWdlIHRyYW5zbGF0aW9uLiAoaWUgaW4gY2FzZSBvZlxuICogICAgIGBuZ0lmYCkgKC0xIG90aGVyd2lzZSlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGkxOG5TdGFydEZpcnN0Q3JlYXRlUGFzcyhcbiAgICB0VmlldzogVFZpZXcsIHBhcmVudFROb2RlSW5kZXg6IG51bWJlciwgbFZpZXc6IExWaWV3LCBpbmRleDogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcsXG4gICAgc3ViVGVtcGxhdGVJbmRleDogbnVtYmVyKSB7XG4gIGNvbnN0IHJvb3RUTm9kZSA9IGdldEN1cnJlbnRQYXJlbnRUTm9kZSgpO1xuICBjb25zdCBjcmVhdGVPcENvZGVzOiBJMThuQ3JlYXRlT3BDb2RlcyA9IFtdIGFzIGFueTtcbiAgY29uc3QgdXBkYXRlT3BDb2RlczogSTE4blVwZGF0ZU9wQ29kZXMgPSBbXSBhcyBhbnk7XG4gIGNvbnN0IGV4aXN0aW5nVE5vZGVTdGFjazogVE5vZGVbXVtdID0gW1tdXTtcbiAgY29uc3QgYXN0U3RhY2s6IEFycmF5PEFycmF5PEkxOG5Ob2RlPj4gPSBbW11dO1xuICBpZiAobmdEZXZNb2RlKSB7XG4gICAgYXR0YWNoRGVidWdHZXR0ZXIoY3JlYXRlT3BDb2RlcywgaTE4bkNyZWF0ZU9wQ29kZXNUb1N0cmluZyk7XG4gICAgYXR0YWNoRGVidWdHZXR0ZXIodXBkYXRlT3BDb2RlcywgaTE4blVwZGF0ZU9wQ29kZXNUb1N0cmluZyk7XG4gIH1cblxuICBtZXNzYWdlID0gZ2V0VHJhbnNsYXRpb25Gb3JUZW1wbGF0ZShtZXNzYWdlLCBzdWJUZW1wbGF0ZUluZGV4KTtcbiAgY29uc3QgbXNnUGFydHMgPSByZXBsYWNlTmdzcChtZXNzYWdlKS5zcGxpdChQSF9SRUdFWFApO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG1zZ1BhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IHZhbHVlID0gbXNnUGFydHNbaV07XG4gICAgaWYgKChpICYgMSkgPT09IDApIHtcbiAgICAgIC8vIEV2ZW4gaW5kZXhlcyBhcmUgdGV4dCAoaW5jbHVkaW5nIGJpbmRpbmdzICYgSUNVIGV4cHJlc3Npb25zKVxuICAgICAgY29uc3QgcGFydHMgPSBpMThuUGFyc2VUZXh0SW50b1BhcnRzQW5kSUNVKHZhbHVlKTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgbGV0IHBhcnQgPSBwYXJ0c1tqXTtcbiAgICAgICAgaWYgKChqICYgMSkgPT09IDApIHtcbiAgICAgICAgICAvLyBgamAgaXMgb2RkIHRoZXJlZm9yZSBgcGFydGAgaXMgc3RyaW5nXG4gICAgICAgICAgY29uc3QgdGV4dCA9IHBhcnQgYXMgc3RyaW5nO1xuICAgICAgICAgIG5nRGV2TW9kZSAmJiBhc3NlcnRTdHJpbmcodGV4dCwgJ1BhcnNlZCBJQ1UgcGFydCBzaG91bGQgYmUgc3RyaW5nJyk7XG4gICAgICAgICAgaWYgKHRleHQgIT09ICcnKSB7XG4gICAgICAgICAgICBpMThuU3RhcnRGaXJzdENyZWF0ZVBhc3NQcm9jZXNzVGV4dE5vZGUoXG4gICAgICAgICAgICAgICAgYXN0U3RhY2tbMF0sIHRWaWV3LCByb290VE5vZGUsIGV4aXN0aW5nVE5vZGVTdGFja1swXSwgY3JlYXRlT3BDb2RlcywgdXBkYXRlT3BDb2RlcyxcbiAgICAgICAgICAgICAgICBsVmlldywgdGV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGBqYCBpcyBFdmVuIHRoZXJlZm9yIGBwYXJ0YCBpcyBhbiBgSUNVRXhwcmVzc2lvbmBcbiAgICAgICAgICBjb25zdCBpY3VFeHByZXNzaW9uOiBJY3VFeHByZXNzaW9uID0gcGFydCBhcyBJY3VFeHByZXNzaW9uO1xuICAgICAgICAgIC8vIFZlcmlmeSB0aGF0IElDVSBleHByZXNzaW9uIGhhcyB0aGUgcmlnaHQgc2hhcGUuIFRyYW5zbGF0aW9ucyBtaWdodCBjb250YWluIGludmFsaWRcbiAgICAgICAgICAvLyBjb25zdHJ1Y3Rpb25zICh3aGlsZSBvcmlnaW5hbCBtZXNzYWdlcyB3ZXJlIGNvcnJlY3QpLCBzbyBJQ1UgcGFyc2luZyBhdCBydW50aW1lIG1heVxuICAgICAgICAgIC8vIG5vdCBzdWNjZWVkICh0aHVzIGBpY3VFeHByZXNzaW9uYCByZW1haW5zIGEgc3RyaW5nKS5cbiAgICAgICAgICAvLyBOb3RlOiB3ZSBpbnRlbnRpb25hbGx5IHJldGFpbiB0aGUgZXJyb3IgaGVyZSBieSBub3QgdXNpbmcgYG5nRGV2TW9kZWAsIGJlY2F1c2VcbiAgICAgICAgICAvLyB0aGUgdmFsdWUgY2FuIGNoYW5nZSBiYXNlZCBvbiB0aGUgbG9jYWxlIGFuZCB1c2VycyBhcmVuJ3QgZ3VhcmFudGVlZCB0byBoaXRcbiAgICAgICAgICAvLyBhbiBpbnZhbGlkIHN0cmluZyB3aGlsZSB0aGV5J3JlIGRldmVsb3BpbmcuXG4gICAgICAgICAgaWYgKHR5cGVvZiBpY3VFeHByZXNzaW9uICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmFibGUgdG8gcGFyc2UgSUNVIGV4cHJlc3Npb24gaW4gXCIke21lc3NhZ2V9XCIgbWVzc2FnZS5gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgaWN1Q29udGFpbmVyVE5vZGUgPSBjcmVhdGVUTm9kZUFuZEFkZE9wQ29kZShcbiAgICAgICAgICAgICAgdFZpZXcsIHJvb3RUTm9kZSwgZXhpc3RpbmdUTm9kZVN0YWNrWzBdLCBsVmlldywgY3JlYXRlT3BDb2RlcyxcbiAgICAgICAgICAgICAgbmdEZXZNb2RlID8gYElDVSAke2luZGV4fToke2ljdUV4cHJlc3Npb24ubWFpbkJpbmRpbmd9YCA6ICcnLCB0cnVlKTtcbiAgICAgICAgICBjb25zdCBpY3VOb2RlSW5kZXggPSBpY3VDb250YWluZXJUTm9kZS5pbmRleDtcbiAgICAgICAgICBuZ0Rldk1vZGUgJiZcbiAgICAgICAgICAgICAgYXNzZXJ0R3JlYXRlclRoYW5PckVxdWFsKFxuICAgICAgICAgICAgICAgICAgaWN1Tm9kZUluZGV4LCBIRUFERVJfT0ZGU0VULCAnSW5kZXggbXVzdCBiZSBpbiBhYnNvbHV0ZSBMVmlldyBvZmZzZXQnKTtcbiAgICAgICAgICBpY3VTdGFydChcbiAgICAgICAgICAgICAgYXN0U3RhY2tbMF0sIHRWaWV3LCBsVmlldywgdXBkYXRlT3BDb2RlcywgcGFyZW50VE5vZGVJbmRleCwgaWN1RXhwcmVzc2lvbixcbiAgICAgICAgICAgICAgaWN1Tm9kZUluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBPZGQgaW5kZXhlcyBhcmUgcGxhY2Vob2xkZXJzIChlbGVtZW50cyBhbmQgc3ViLXRlbXBsYXRlcylcbiAgICAgIC8vIEF0IHRoaXMgcG9pbnQgdmFsdWUgaXMgc29tZXRoaW5nIGxpa2U6ICcvIzE6MicgKG9yaWdpbmFsbHkgY29taW5nIGZyb20gJ++/vS8jMToy77+9JylcbiAgICAgIGNvbnN0IGlzQ2xvc2luZyA9IHZhbHVlLmNoYXJDb2RlQXQoMCkgPT09IENoYXJDb2RlLlNMQVNIO1xuICAgICAgY29uc3QgdHlwZSA9IHZhbHVlLmNoYXJDb2RlQXQoaXNDbG9zaW5nID8gMSA6IDApO1xuICAgICAgbmdEZXZNb2RlICYmIGFzc2VydE9uZU9mKHR5cGUsIENoYXJDb2RlLlNUQVIsIENoYXJDb2RlLkhBU0gpO1xuICAgICAgY29uc3QgaW5kZXggPSBIRUFERVJfT0ZGU0VUICsgTnVtYmVyLnBhcnNlSW50KHZhbHVlLnN1YnN0cmluZygoaXNDbG9zaW5nID8gMiA6IDEpKSk7XG4gICAgICBpZiAoaXNDbG9zaW5nKSB7XG4gICAgICAgIGV4aXN0aW5nVE5vZGVTdGFjay5zaGlmdCgpO1xuICAgICAgICBhc3RTdGFjay5zaGlmdCgpO1xuICAgICAgICBzZXRDdXJyZW50VE5vZGUoZ2V0Q3VycmVudFBhcmVudFROb2RlKCkhLCBmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB0Tm9kZSA9IGNyZWF0ZVROb2RlUGxhY2Vob2xkZXIodFZpZXcsIGV4aXN0aW5nVE5vZGVTdGFja1swXSwgaW5kZXgpO1xuICAgICAgICBleGlzdGluZ1ROb2RlU3RhY2sudW5zaGlmdChbXSk7XG4gICAgICAgIHNldEN1cnJlbnRUTm9kZSh0Tm9kZSwgdHJ1ZSk7XG5cbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXJOb2RlOiBJMThuUGxhY2Vob2xkZXJOb2RlID0ge1xuICAgICAgICAgIGtpbmQ6IEkxOG5Ob2RlS2luZC5QTEFDRUhPTERFUixcbiAgICAgICAgICBpbmRleCxcbiAgICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgICAgdHlwZTogdHlwZSA9PT0gQ2hhckNvZGUuSEFTSCA/IEkxOG5QbGFjZWhvbGRlclR5cGUuRUxFTUVOVCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEkxOG5QbGFjZWhvbGRlclR5cGUuU1VCVEVNUExBVEUsXG4gICAgICAgIH07XG4gICAgICAgIGFzdFN0YWNrWzBdLnB1c2gocGxhY2Vob2xkZXJOb2RlKTtcbiAgICAgICAgYXN0U3RhY2sudW5zaGlmdChwbGFjZWhvbGRlck5vZGUuY2hpbGRyZW4pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRWaWV3LmRhdGFbaW5kZXhdID0gPFRJMThuPntcbiAgICBjcmVhdGU6IGNyZWF0ZU9wQ29kZXMsXG4gICAgdXBkYXRlOiB1cGRhdGVPcENvZGVzLFxuICAgIGFzdDogYXN0U3RhY2tbMF0sXG4gIH07XG59XG5cbi8qKlxuICogQWxsb2NhdGUgc3BhY2UgaW4gaTE4biBSYW5nZSBhZGQgY3JlYXRlIE9wQ29kZSBpbnN0cnVjdGlvbiB0byBjcmVhdGUgYSB0ZXh0IG9yIGNvbW1lbnQgbm9kZS5cbiAqXG4gKiBAcGFyYW0gdFZpZXcgQ3VycmVudCBgVFZpZXdgIG5lZWRlZCB0byBhbGxvY2F0ZSBzcGFjZSBpbiBpMThuIHJhbmdlLlxuICogQHBhcmFtIHJvb3RUTm9kZSBSb290IGBUTm9kZWAgb2YgdGhlIGkxOG4gYmxvY2suIFRoaXMgbm9kZSBkZXRlcm1pbmVzIGlmIHRoZSBuZXcgVE5vZGUgd2lsbCBiZVxuICogICAgIGFkZGVkIGFzIHBhcnQgb2YgdGhlIGBpMThuU3RhcnRgIGluc3RydWN0aW9uIG9yIGFzIHBhcnQgb2YgdGhlIGBUTm9kZS5pbnNlcnRCZWZvcmVJbmRleGAuXG4gKiBAcGFyYW0gZXhpc3RpbmdUTm9kZXMgaW50ZXJuYWwgc3RhdGUgZm9yIGBhZGRUTm9kZUFuZFVwZGF0ZUluc2VydEJlZm9yZUluZGV4YC5cbiAqIEBwYXJhbSBsVmlldyBDdXJyZW50IGBMVmlld2AgbmVlZGVkIHRvIGFsbG9jYXRlIHNwYWNlIGluIGkxOG4gcmFuZ2UuXG4gKiBAcGFyYW0gY3JlYXRlT3BDb2RlcyBBcnJheSBzdG9yaW5nIGBJMThuQ3JlYXRlT3BDb2Rlc2Agd2hlcmUgbmV3IG9wQ29kZXMgd2lsbCBiZSBhZGRlZC5cbiAqIEBwYXJhbSB0ZXh0IFRleHQgdG8gYmUgYWRkZWQgd2hlbiB0aGUgYFRleHRgIG9yIGBDb21tZW50YCBub2RlIHdpbGwgYmUgY3JlYXRlZC5cbiAqIEBwYXJhbSBpc0lDVSB0cnVlIGlmIGEgYENvbW1lbnRgIG5vZGUgZm9yIElDVSAoaW5zdGVhZCBvZiBgVGV4dGApIG5vZGUgc2hvdWxkIGJlIGNyZWF0ZWQuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVROb2RlQW5kQWRkT3BDb2RlKFxuICAgIHRWaWV3OiBUVmlldywgcm9vdFROb2RlOiBUTm9kZXxudWxsLCBleGlzdGluZ1ROb2RlczogVE5vZGVbXSwgbFZpZXc6IExWaWV3LFxuICAgIGNyZWF0ZU9wQ29kZXM6IEkxOG5DcmVhdGVPcENvZGVzLCB0ZXh0OiBzdHJpbmd8bnVsbCwgaXNJQ1U6IGJvb2xlYW4pOiBUTm9kZSB7XG4gIGNvbnN0IGkxOG5Ob2RlSWR4ID0gYWxsb2NFeHBhbmRvKHRWaWV3LCBsVmlldywgMSwgbnVsbCk7XG4gIGxldCBvcENvZGUgPSBpMThuTm9kZUlkeCA8PCBJMThuQ3JlYXRlT3BDb2RlLlNISUZUO1xuICBsZXQgcGFyZW50VE5vZGUgPSBnZXRDdXJyZW50UGFyZW50VE5vZGUoKTtcblxuICBpZiAocm9vdFROb2RlID09PSBwYXJlbnRUTm9kZSkge1xuICAgIC8vIEZJWE1FKG1pc2tvKTogQSBudWxsIGBwYXJlbnRUTm9kZWAgc2hvdWxkIHJlcHJlc2VudCB3aGVuIHdlIGZhbGwgb2YgdGhlIGBMVmlld2AgYm91bmRhcnkuXG4gICAgLy8gKHRoZXJlIGlzIG5vIHBhcmVudCksIGJ1dCBpbiBzb21lIGNpcmN1bXN0YW5jZXMgKGJlY2F1c2Ugd2UgYXJlIGluY29uc2lzdGVudCBhYm91dCBob3cgd2Ugc2V0XG4gICAgLy8gYHByZXZpb3VzT3JQYXJlbnRUTm9kZWApIGl0IGNvdWxkIHBvaW50IHRvIGByb290VE5vZGVgIFNvIHRoaXMgaXMgYSB3b3JrIGFyb3VuZC5cbiAgICBwYXJlbnRUTm9kZSA9IG51bGw7XG4gIH1cbiAgaWYgKHBhcmVudFROb2RlID09PSBudWxsKSB7XG4gICAgLy8gSWYgd2UgZG9uJ3QgaGF2ZSBhIHBhcmVudCB0aGF0IG1lYW5zIHRoYXQgd2UgY2FuIGVhZ2VybHkgYWRkIG5vZGVzLlxuICAgIC8vIElmIHdlIGhhdmUgYSBwYXJlbnQgdGhhbiB0aGVzZSBub2RlcyBjYW4ndCBiZSBhZGRlZCBub3cgKGFzIHRoZSBwYXJlbnQgaGFzIG5vdCBiZWVuIGNyZWF0ZWRcbiAgICAvLyB5ZXQpIGFuZCBpbnN0ZWFkIHRoZSBgcGFyZW50VE5vZGVgIGlzIHJlc3BvbnNpYmxlIGZvciBhZGRpbmcgaXQuIFNlZVxuICAgIC8vIGBUTm9kZS5pbnNlcnRCZWZvcmVJbmRleGBcbiAgICBvcENvZGUgfD0gSTE4bkNyZWF0ZU9wQ29kZS5BUFBFTkRfRUFHRVJMWTtcbiAgfVxuICBpZiAoaXNJQ1UpIHtcbiAgICBvcENvZGUgfD0gSTE4bkNyZWF0ZU9wQ29kZS5DT01NRU5UO1xuICAgIGVuc3VyZUljdUNvbnRhaW5lclZpc2l0b3JMb2FkZWQobG9hZEljdUNvbnRhaW5lclZpc2l0b3IpO1xuICB9XG4gIGNyZWF0ZU9wQ29kZXMucHVzaChvcENvZGUsIHRleHQgPT09IG51bGwgPyAnJyA6IHRleHQpO1xuICAvLyBXZSBzdG9yZSBge3s/fX1gIHNvIHRoYXQgd2hlbiBsb29raW5nIGF0IGRlYnVnIGBUTm9kZVR5cGUudGVtcGxhdGVgIHdlIGNhbiBzZWUgd2hlcmUgdGhlXG4gIC8vIGJpbmRpbmdzIGFyZS5cbiAgY29uc3QgdE5vZGUgPSBjcmVhdGVUTm9kZUF0SW5kZXgoXG4gICAgICB0VmlldywgaTE4bk5vZGVJZHgsIGlzSUNVID8gVE5vZGVUeXBlLkljdSA6IFROb2RlVHlwZS5UZXh0LFxuICAgICAgdGV4dCA9PT0gbnVsbCA/IChuZ0Rldk1vZGUgPyAne3s/fX0nIDogJycpIDogdGV4dCwgbnVsbCk7XG4gIGFkZFROb2RlQW5kVXBkYXRlSW5zZXJ0QmVmb3JlSW5kZXgoZXhpc3RpbmdUTm9kZXMsIHROb2RlKTtcbiAgY29uc3QgdE5vZGVJZHggPSB0Tm9kZS5pbmRleDtcbiAgc2V0Q3VycmVudFROb2RlKHROb2RlLCBmYWxzZSAvKiBUZXh0IG5vZGVzIGFyZSBzZWxmIGNsb3NpbmcgKi8pO1xuICBpZiAocGFyZW50VE5vZGUgIT09IG51bGwgJiYgcm9vdFROb2RlICE9PSBwYXJlbnRUTm9kZSkge1xuICAgIC8vIFdlIGFyZSBhIGNoaWxkIG9mIGRlZXBlciBub2RlIChyYXRoZXIgdGhhbiBhIGRpcmVjdCBjaGlsZCBvZiBgaTE4blN0YXJ0YCBpbnN0cnVjdGlvbi4pXG4gICAgLy8gV2UgaGF2ZSB0byBtYWtlIHN1cmUgdG8gYWRkIG91cnNlbHZlcyB0byB0aGUgcGFyZW50LlxuICAgIHNldFROb2RlSW5zZXJ0QmVmb3JlSW5kZXgocGFyZW50VE5vZGUsIHROb2RlSWR4KTtcbiAgfVxuICByZXR1cm4gdE5vZGU7XG59XG5cbi8qKlxuICogUHJvY2Vzc2VzIHRleHQgbm9kZSBpbiBpMThuIGJsb2NrLlxuICpcbiAqIFRleHQgbm9kZXMgY2FuIGhhdmU6XG4gKiAtIENyZWF0ZSBpbnN0cnVjdGlvbiBpbiBgY3JlYXRlT3BDb2Rlc2AgZm9yIGNyZWF0aW5nIHRoZSB0ZXh0IG5vZGUuXG4gKiAtIEFsbG9jYXRlIHNwZWMgZm9yIHRleHQgbm9kZSBpbiBpMThuIHJhbmdlIG9mIGBMVmlld2BcbiAqIC0gSWYgY29udGFpbnMgYmluZGluZzpcbiAqICAgIC0gYmluZGluZ3MgPT4gYWxsb2NhdGUgc3BhY2UgaW4gaTE4biByYW5nZSBvZiBgTFZpZXdgIHRvIHN0b3JlIHRoZSBiaW5kaW5nIHZhbHVlLlxuICogICAgLSBwb3B1bGF0ZSBgdXBkYXRlT3BDb2Rlc2Agd2l0aCB1cGRhdGUgaW5zdHJ1Y3Rpb25zLlxuICpcbiAqIEBwYXJhbSB0VmlldyBDdXJyZW50IGBUVmlld2BcbiAqIEBwYXJhbSByb290VE5vZGUgUm9vdCBgVE5vZGVgIG9mIHRoZSBpMThuIGJsb2NrLiBUaGlzIG5vZGUgZGV0ZXJtaW5lcyBpZiB0aGUgbmV3IFROb2RlIHdpbGxcbiAqICAgICBiZSBhZGRlZCBhcyBwYXJ0IG9mIHRoZSBgaTE4blN0YXJ0YCBpbnN0cnVjdGlvbiBvciBhcyBwYXJ0IG9mIHRoZVxuICogICAgIGBUTm9kZS5pbnNlcnRCZWZvcmVJbmRleGAuXG4gKiBAcGFyYW0gZXhpc3RpbmdUTm9kZXMgaW50ZXJuYWwgc3RhdGUgZm9yIGBhZGRUTm9kZUFuZFVwZGF0ZUluc2VydEJlZm9yZUluZGV4YC5cbiAqIEBwYXJhbSBjcmVhdGVPcENvZGVzIExvY2F0aW9uIHdoZXJlIHRoZSBjcmVhdGlvbiBPcENvZGVzIHdpbGwgYmUgc3RvcmVkLlxuICogQHBhcmFtIGxWaWV3IEN1cnJlbnQgYExWaWV3YFxuICogQHBhcmFtIHRleHQgVGhlIHRyYW5zbGF0ZWQgdGV4dCAod2hpY2ggbWF5IGNvbnRhaW4gYmluZGluZylcbiAqL1xuZnVuY3Rpb24gaTE4blN0YXJ0Rmlyc3RDcmVhdGVQYXNzUHJvY2Vzc1RleHROb2RlKFxuICAgIGFzdDogSTE4bk5vZGVbXSwgdFZpZXc6IFRWaWV3LCByb290VE5vZGU6IFROb2RlfG51bGwsIGV4aXN0aW5nVE5vZGVzOiBUTm9kZVtdLFxuICAgIGNyZWF0ZU9wQ29kZXM6IEkxOG5DcmVhdGVPcENvZGVzLCB1cGRhdGVPcENvZGVzOiBJMThuVXBkYXRlT3BDb2RlcywgbFZpZXc6IExWaWV3LFxuICAgIHRleHQ6IHN0cmluZyk6IHZvaWQge1xuICBjb25zdCBoYXNCaW5kaW5nID0gdGV4dC5tYXRjaChCSU5ESU5HX1JFR0VYUCk7XG4gIGNvbnN0IHROb2RlID0gY3JlYXRlVE5vZGVBbmRBZGRPcENvZGUoXG4gICAgICB0Vmlldywgcm9vdFROb2RlLCBleGlzdGluZ1ROb2RlcywgbFZpZXcsIGNyZWF0ZU9wQ29kZXMsIGhhc0JpbmRpbmcgPyBudWxsIDogdGV4dCwgZmFsc2UpO1xuICBjb25zdCBpbmRleCA9IHROb2RlLmluZGV4O1xuICBpZiAoaGFzQmluZGluZykge1xuICAgIGdlbmVyYXRlQmluZGluZ1VwZGF0ZU9wQ29kZXModXBkYXRlT3BDb2RlcywgdGV4dCwgaW5kZXgsIG51bGwsIDAsIG51bGwpO1xuICB9XG4gIGFzdC5wdXNoKHtraW5kOiBJMThuTm9kZUtpbmQuVEVYVCwgaW5kZXh9KTtcbn1cblxuLyoqXG4gKiBTZWUgYGkxOG5BdHRyaWJ1dGVzYCBhYm92ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGkxOG5BdHRyaWJ1dGVzRmlyc3RQYXNzKHRWaWV3OiBUVmlldywgaW5kZXg6IG51bWJlciwgdmFsdWVzOiBzdHJpbmdbXSkge1xuICBjb25zdCBwcmV2aW91c0VsZW1lbnQgPSBnZXRDdXJyZW50VE5vZGUoKSE7XG4gIGNvbnN0IHByZXZpb3VzRWxlbWVudEluZGV4ID0gcHJldmlvdXNFbGVtZW50LmluZGV4O1xuICBjb25zdCB1cGRhdGVPcENvZGVzOiBJMThuVXBkYXRlT3BDb2RlcyA9IFtdIGFzIGFueTtcbiAgaWYgKG5nRGV2TW9kZSkge1xuICAgIGF0dGFjaERlYnVnR2V0dGVyKHVwZGF0ZU9wQ29kZXMsIGkxOG5VcGRhdGVPcENvZGVzVG9TdHJpbmcpO1xuICB9XG4gIGlmICh0Vmlldy5maXJzdENyZWF0ZVBhc3MgJiYgdFZpZXcuZGF0YVtpbmRleF0gPT09IG51bGwpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgY29uc3QgYXR0ck5hbWUgPSB2YWx1ZXNbaV07XG4gICAgICBjb25zdCBtZXNzYWdlID0gdmFsdWVzW2kgKyAxXTtcblxuICAgICAgaWYgKG1lc3NhZ2UgIT09ICcnKSB7XG4gICAgICAgIC8vIENoZWNrIGlmIGF0dHJpYnV0ZSB2YWx1ZSBjb250YWlucyBhbiBJQ1UgYW5kIHRocm93IGFuIGVycm9yIGlmIHRoYXQncyB0aGUgY2FzZS5cbiAgICAgICAgLy8gSUNVcyBpbiBlbGVtZW50IGF0dHJpYnV0ZXMgYXJlIG5vdCBzdXBwb3J0ZWQuXG4gICAgICAgIC8vIE5vdGU6IHdlIGludGVudGlvbmFsbHkgcmV0YWluIHRoZSBlcnJvciBoZXJlIGJ5IG5vdCB1c2luZyBgbmdEZXZNb2RlYCwgYmVjYXVzZVxuICAgICAgICAvLyB0aGUgYHZhbHVlYCBjYW4gY2hhbmdlIGJhc2VkIG9uIHRoZSBsb2NhbGUgYW5kIHVzZXJzIGFyZW4ndCBndWFyYW50ZWVkIHRvIGhpdFxuICAgICAgICAvLyBhbiBpbnZhbGlkIHN0cmluZyB3aGlsZSB0aGV5J3JlIGRldmVsb3BpbmcuXG4gICAgICAgIGlmIChJQ1VfUkVHRVhQLnRlc3QobWVzc2FnZSkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgIGBJQ1UgZXhwcmVzc2lvbnMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gYXR0cmlidXRlcy4gTWVzc2FnZTogXCIke21lc3NhZ2V9XCIuYCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpMThuIGF0dHJpYnV0ZXMgdGhhdCBoaXQgdGhpcyBjb2RlIHBhdGggYXJlIGd1YXJhbnRlZWQgdG8gaGF2ZSBiaW5kaW5ncywgYmVjYXVzZVxuICAgICAgICAvLyB0aGUgY29tcGlsZXIgdHJlYXRzIHN0YXRpYyBpMThuIGF0dHJpYnV0ZXMgYXMgcmVndWxhciBhdHRyaWJ1dGUgYmluZGluZ3MuXG4gICAgICAgIC8vIFNpbmNlIHRoaXMgbWF5IG5vdCBiZSB0aGUgZmlyc3QgaTE4biBhdHRyaWJ1dGUgb24gdGhpcyBlbGVtZW50IHdlIG5lZWQgdG8gcGFzcyBpbiBob3dcbiAgICAgICAgLy8gbWFueSBwcmV2aW91cyBiaW5kaW5ncyB0aGVyZSBoYXZlIGFscmVhZHkgYmVlbi5cbiAgICAgICAgZ2VuZXJhdGVCaW5kaW5nVXBkYXRlT3BDb2RlcyhcbiAgICAgICAgICAgIHVwZGF0ZU9wQ29kZXMsIG1lc3NhZ2UsIHByZXZpb3VzRWxlbWVudEluZGV4LCBhdHRyTmFtZSwgY291bnRCaW5kaW5ncyh1cGRhdGVPcENvZGVzKSxcbiAgICAgICAgICAgIG51bGwpO1xuICAgICAgfVxuICAgIH1cbiAgICB0Vmlldy5kYXRhW2luZGV4XSA9IHVwZGF0ZU9wQ29kZXM7XG4gIH1cbn1cblxuXG4vKipcbiAqIEdlbmVyYXRlIHRoZSBPcENvZGVzIHRvIHVwZGF0ZSB0aGUgYmluZGluZ3Mgb2YgYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHVwZGF0ZU9wQ29kZXMgUGxhY2Ugd2hlcmUgdGhlIHVwZGF0ZSBvcGNvZGVzIHdpbGwgYmUgc3RvcmVkLlxuICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIGNvbnRhaW5pbmcgdGhlIGJpbmRpbmdzLlxuICogQHBhcmFtIGRlc3RpbmF0aW9uTm9kZSBJbmRleCBvZiB0aGUgZGVzdGluYXRpb24gbm9kZSB3aGljaCB3aWxsIHJlY2VpdmUgdGhlIGJpbmRpbmcuXG4gKiBAcGFyYW0gYXR0ck5hbWUgTmFtZSBvZiB0aGUgYXR0cmlidXRlLCBpZiB0aGUgc3RyaW5nIGJlbG9uZ3MgdG8gYW4gYXR0cmlidXRlLlxuICogQHBhcmFtIHNhbml0aXplRm4gU2FuaXRpemF0aW9uIGZ1bmN0aW9uIHVzZWQgdG8gc2FuaXRpemUgdGhlIHN0cmluZyBhZnRlciB1cGRhdGUsIGlmIG5lY2Vzc2FyeS5cbiAqIEBwYXJhbSBiaW5kaW5nU3RhcnQgVGhlIGxWaWV3IGluZGV4IG9mIHRoZSBuZXh0IGV4cHJlc3Npb24gdGhhdCBjYW4gYmUgYm91bmQgdmlhIGFuIG9wQ29kZS5cbiAqIEByZXR1cm5zIFRoZSBtYXNrIHZhbHVlIGZvciB0aGVzZSBiaW5kaW5nc1xuICovXG5mdW5jdGlvbiBnZW5lcmF0ZUJpbmRpbmdVcGRhdGVPcENvZGVzKFxuICAgIHVwZGF0ZU9wQ29kZXM6IEkxOG5VcGRhdGVPcENvZGVzLCBzdHI6IHN0cmluZywgZGVzdGluYXRpb25Ob2RlOiBudW1iZXIsIGF0dHJOYW1lOiBzdHJpbmd8bnVsbCxcbiAgICBiaW5kaW5nU3RhcnQ6IG51bWJlciwgc2FuaXRpemVGbjogU2FuaXRpemVyRm58bnVsbCk6IG51bWJlciB7XG4gIG5nRGV2TW9kZSAmJlxuICAgICAgYXNzZXJ0R3JlYXRlclRoYW5PckVxdWFsKFxuICAgICAgICAgIGRlc3RpbmF0aW9uTm9kZSwgSEVBREVSX09GRlNFVCwgJ0luZGV4IG11c3QgYmUgaW4gYWJzb2x1dGUgTFZpZXcgb2Zmc2V0Jyk7XG4gIGNvbnN0IG1hc2tJbmRleCA9IHVwZGF0ZU9wQ29kZXMubGVuZ3RoOyAgLy8gTG9jYXRpb24gb2YgbWFza1xuICBjb25zdCBzaXplSW5kZXggPSBtYXNrSW5kZXggKyAxOyAgICAgICAgIC8vIGxvY2F0aW9uIG9mIHNpemUgZm9yIHNraXBwaW5nXG4gIHVwZGF0ZU9wQ29kZXMucHVzaChudWxsLCBudWxsKTsgICAgICAgICAgLy8gQWxsb2Mgc3BhY2UgZm9yIG1hc2sgYW5kIHNpemVcbiAgY29uc3Qgc3RhcnRJbmRleCA9IG1hc2tJbmRleCArIDI7ICAgICAgICAvLyBsb2NhdGlvbiBvZiBmaXJzdCBhbGxvY2F0aW9uLlxuICBpZiAobmdEZXZNb2RlKSB7XG4gICAgYXR0YWNoRGVidWdHZXR0ZXIodXBkYXRlT3BDb2RlcywgaTE4blVwZGF0ZU9wQ29kZXNUb1N0cmluZyk7XG4gIH1cbiAgY29uc3QgdGV4dFBhcnRzID0gc3RyLnNwbGl0KEJJTkRJTkdfUkVHRVhQKTtcbiAgbGV0IG1hc2sgPSAwO1xuXG4gIGZvciAobGV0IGogPSAwOyBqIDwgdGV4dFBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgY29uc3QgdGV4dFZhbHVlID0gdGV4dFBhcnRzW2pdO1xuXG4gICAgaWYgKGogJiAxKSB7XG4gICAgICAvLyBPZGQgaW5kZXhlcyBhcmUgYmluZGluZ3NcbiAgICAgIGNvbnN0IGJpbmRpbmdJbmRleCA9IGJpbmRpbmdTdGFydCArIHBhcnNlSW50KHRleHRWYWx1ZSwgMTApO1xuICAgICAgdXBkYXRlT3BDb2Rlcy5wdXNoKC0xIC0gYmluZGluZ0luZGV4KTtcbiAgICAgIG1hc2sgPSBtYXNrIHwgdG9NYXNrQml0KGJpbmRpbmdJbmRleCk7XG4gICAgfSBlbHNlIGlmICh0ZXh0VmFsdWUgIT09ICcnKSB7XG4gICAgICAvLyBFdmVuIGluZGV4ZXMgYXJlIHRleHRcbiAgICAgIHVwZGF0ZU9wQ29kZXMucHVzaCh0ZXh0VmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZU9wQ29kZXMucHVzaChcbiAgICAgIGRlc3RpbmF0aW9uTm9kZSA8PCBJMThuVXBkYXRlT3BDb2RlLlNISUZUX1JFRiB8XG4gICAgICAoYXR0ck5hbWUgPyBJMThuVXBkYXRlT3BDb2RlLkF0dHIgOiBJMThuVXBkYXRlT3BDb2RlLlRleHQpKTtcbiAgaWYgKGF0dHJOYW1lKSB7XG4gICAgdXBkYXRlT3BDb2Rlcy5wdXNoKGF0dHJOYW1lLCBzYW5pdGl6ZUZuKTtcbiAgfVxuICB1cGRhdGVPcENvZGVzW21hc2tJbmRleF0gPSBtYXNrO1xuICB1cGRhdGVPcENvZGVzW3NpemVJbmRleF0gPSB1cGRhdGVPcENvZGVzLmxlbmd0aCAtIHN0YXJ0SW5kZXg7XG4gIHJldHVybiBtYXNrO1xufVxuXG4vKipcbiAqIENvdW50IHRoZSBudW1iZXIgb2YgYmluZGluZ3MgaW4gdGhlIGdpdmVuIGBvcENvZGVzYC5cbiAqXG4gKiBJdCBjb3VsZCBiZSBwb3NzaWJsZSB0byBzcGVlZCB0aGlzIHVwLCBieSBwYXNzaW5nIHRoZSBudW1iZXIgb2YgYmluZGluZ3MgZm91bmQgYmFjayBmcm9tXG4gKiBgZ2VuZXJhdGVCaW5kaW5nVXBkYXRlT3BDb2RlcygpYCB0byBgaTE4bkF0dHJpYnV0ZXNGaXJzdFBhc3MoKWAgYnV0IHRoaXMgd291bGQgdGhlbiByZXF1aXJlIG1vcmVcbiAqIGNvbXBsZXhpdHkgaW4gdGhlIGNvZGUgYW5kL29yIHRyYW5zaWVudCBvYmplY3RzIHRvIGJlIGNyZWF0ZWQuXG4gKlxuICogU2luY2UgdGhpcyBmdW5jdGlvbiBpcyBvbmx5IGNhbGxlZCBvbmNlIHdoZW4gdGhlIHRlbXBsYXRlIGlzIGluc3RhbnRpYXRlZCwgaXMgdHJpdmlhbCBpbiB0aGVcbiAqIGZpcnN0IGluc3RhbmNlIChzaW5jZSBgb3BDb2Rlc2Agd2lsbCBiZSBhbiBlbXB0eSBhcnJheSksIGFuZCBpdCBpcyBub3QgY29tbW9uIGZvciBlbGVtZW50cyB0b1xuICogY29udGFpbiBtdWx0aXBsZSBpMThuIGJvdW5kIGF0dHJpYnV0ZXMsIGl0IHNlZW1zIGxpa2UgdGhpcyBpcyBhIHJlYXNvbmFibGUgY29tcHJvbWlzZS5cbiAqL1xuZnVuY3Rpb24gY291bnRCaW5kaW5ncyhvcENvZGVzOiBJMThuVXBkYXRlT3BDb2Rlcyk6IG51bWJlciB7XG4gIGxldCBjb3VudCA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgb3BDb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IG9wQ29kZSA9IG9wQ29kZXNbaV07XG4gICAgLy8gQmluZGluZ3MgYXJlIG5lZ2F0aXZlIG51bWJlcnMuXG4gICAgaWYgKHR5cGVvZiBvcENvZGUgPT09ICdudW1iZXInICYmIG9wQ29kZSA8IDApIHtcbiAgICAgIGNvdW50Kys7XG4gICAgfVxuICB9XG4gIHJldHVybiBjb3VudDtcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGJpbmRpbmcgaW5kZXggdG8gbWFzayBiaXQuXG4gKlxuICogRWFjaCBpbmRleCByZXByZXNlbnRzIGEgc2luZ2xlIGJpdCBvbiB0aGUgYml0LW1hc2suIEJlY2F1c2UgYml0LW1hc2sgb25seSBoYXMgMzIgYml0cywgd2UgbWFrZVxuICogdGhlIDMybmQgYml0IHNoYXJlIGFsbCBtYXNrcyBmb3IgYWxsIGJpbmRpbmdzIGhpZ2hlciB0aGFuIDMyLiBTaW5jZSBpdCBpcyBleHRyZW1lbHkgcmFyZSB0b1xuICogaGF2ZSBtb3JlIHRoYW4gMzIgYmluZGluZ3MgdGhpcyB3aWxsIGJlIGhpdCB2ZXJ5IHJhcmVseS4gVGhlIGRvd25zaWRlIG9mIGhpdHRpbmcgdGhpcyBjb3JuZXJcbiAqIGNhc2UgaXMgdGhhdCB3ZSB3aWxsIGV4ZWN1dGUgYmluZGluZyBjb2RlIG1vcmUgb2Z0ZW4gdGhhbiBuZWNlc3NhcnkuIChwZW5hbHR5IG9mIHBlcmZvcm1hbmNlKVxuICovXG5mdW5jdGlvbiB0b01hc2tCaXQoYmluZGluZ0luZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gMSA8PCBNYXRoLm1pbihiaW5kaW5nSW5kZXgsIDMxKTtcbn1cblxuZnVuY3Rpb24gaXNSb290VGVtcGxhdGVNZXNzYWdlKHN1YlRlbXBsYXRlSW5kZXg6IG51bWJlcik6IHN1YlRlbXBsYXRlSW5kZXggaXMgLSAxIHtcbiAgcmV0dXJuIHN1YlRlbXBsYXRlSW5kZXggPT09IC0xO1xufVxuXG5cbi8qKlxuICogUmVtb3ZlcyBldmVyeXRoaW5nIGluc2lkZSB0aGUgc3ViLXRlbXBsYXRlcyBvZiBhIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUlubmVyVGVtcGxhdGVUcmFuc2xhdGlvbihtZXNzYWdlOiBzdHJpbmcpOiBzdHJpbmcge1xuICBsZXQgbWF0Y2g7XG4gIGxldCByZXMgPSAnJztcbiAgbGV0IGluZGV4ID0gMDtcbiAgbGV0IGluVGVtcGxhdGUgPSBmYWxzZTtcbiAgbGV0IHRhZ01hdGNoZWQ7XG5cbiAgd2hpbGUgKChtYXRjaCA9IFNVQlRFTVBMQVRFX1JFR0VYUC5leGVjKG1lc3NhZ2UpKSAhPT0gbnVsbCkge1xuICAgIGlmICghaW5UZW1wbGF0ZSkge1xuICAgICAgcmVzICs9IG1lc3NhZ2Uuc3Vic3RyaW5nKGluZGV4LCBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aCk7XG4gICAgICB0YWdNYXRjaGVkID0gbWF0Y2hbMV07XG4gICAgICBpblRlbXBsYXRlID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG1hdGNoWzBdID09PSBgJHtNQVJLRVJ9Lyoke3RhZ01hdGNoZWR9JHtNQVJLRVJ9YCkge1xuICAgICAgICBpbmRleCA9IG1hdGNoLmluZGV4O1xuICAgICAgICBpblRlbXBsYXRlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdEZXZNb2RlICYmXG4gICAgICBhc3NlcnRFcXVhbChcbiAgICAgICAgICBpblRlbXBsYXRlLCBmYWxzZSxcbiAgICAgICAgICBgVGFnIG1pc21hdGNoOiB1bmFibGUgdG8gZmluZCB0aGUgZW5kIG9mIHRoZSBzdWItdGVtcGxhdGUgaW4gdGhlIHRyYW5zbGF0aW9uIFwiJHtcbiAgICAgICAgICAgICAgbWVzc2FnZX1cImApO1xuXG4gIHJlcyArPSBtZXNzYWdlLnNsaWNlKGluZGV4KTtcbiAgcmV0dXJuIHJlcztcbn1cblxuXG4vKipcbiAqIEV4dHJhY3RzIGEgcGFydCBvZiBhIG1lc3NhZ2UgYW5kIHJlbW92ZXMgdGhlIHJlc3QuXG4gKlxuICogVGhpcyBtZXRob2QgaXMgdXNlZCBmb3IgZXh0cmFjdGluZyBhIHBhcnQgb2YgdGhlIG1lc3NhZ2UgYXNzb2NpYXRlZCB3aXRoIGEgdGVtcGxhdGUuIEFcbiAqIHRyYW5zbGF0ZWQgbWVzc2FnZSBjYW4gc3BhbiBtdWx0aXBsZSB0ZW1wbGF0ZXMuXG4gKlxuICogRXhhbXBsZTpcbiAqIGBgYFxuICogPGRpdiBpMThuPlRyYW5zbGF0ZSA8c3BhbiAqbmdJZj5tZTwvc3Bhbj4hPC9kaXY+XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBjcm9wXG4gKiBAcGFyYW0gc3ViVGVtcGxhdGVJbmRleCBJbmRleCBvZiB0aGUgc3ViLXRlbXBsYXRlIHRvIGV4dHJhY3QuIElmIHVuZGVmaW5lZCBpdCByZXR1cm5zIHRoZVxuICogZXh0ZXJuYWwgdGVtcGxhdGUgYW5kIHJlbW92ZXMgYWxsIHN1Yi10ZW1wbGF0ZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2xhdGlvbkZvclRlbXBsYXRlKG1lc3NhZ2U6IHN0cmluZywgc3ViVGVtcGxhdGVJbmRleDogbnVtYmVyKSB7XG4gIGlmIChpc1Jvb3RUZW1wbGF0ZU1lc3NhZ2Uoc3ViVGVtcGxhdGVJbmRleCkpIHtcbiAgICAvLyBXZSB3YW50IHRoZSByb290IHRlbXBsYXRlIG1lc3NhZ2UsIGlnbm9yZSBhbGwgc3ViLXRlbXBsYXRlc1xuICAgIHJldHVybiByZW1vdmVJbm5lclRlbXBsYXRlVHJhbnNsYXRpb24obWVzc2FnZSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gV2Ugd2FudCBhIHNwZWNpZmljIHN1Yi10ZW1wbGF0ZVxuICAgIGNvbnN0IHN0YXJ0ID1cbiAgICAgICAgbWVzc2FnZS5pbmRleE9mKGA6JHtzdWJUZW1wbGF0ZUluZGV4fSR7TUFSS0VSfWApICsgMiArIHN1YlRlbXBsYXRlSW5kZXgudG9TdHJpbmcoKS5sZW5ndGg7XG4gICAgY29uc3QgZW5kID0gbWVzc2FnZS5zZWFyY2gobmV3IFJlZ0V4cChgJHtNQVJLRVJ9XFxcXC9cXFxcKlxcXFxkKzoke3N1YlRlbXBsYXRlSW5kZXh9JHtNQVJLRVJ9YCkpO1xuICAgIHJldHVybiByZW1vdmVJbm5lclRlbXBsYXRlVHJhbnNsYXRpb24obWVzc2FnZS5zdWJzdHJpbmcoc3RhcnQsIGVuZCkpO1xuICB9XG59XG5cbi8qKlxuICogR2VuZXJhdGUgdGhlIE9wQ29kZXMgZm9yIElDVSBleHByZXNzaW9ucy5cbiAqXG4gKiBAcGFyYW0gaWN1RXhwcmVzc2lvblxuICogQHBhcmFtIGluZGV4IEluZGV4IHdoZXJlIHRoZSBhbmNob3IgaXMgc3RvcmVkIGFuZCBhbiBvcHRpb25hbCBgVEljdUNvbnRhaW5lck5vZGVgXG4gKiAgIC0gYGxWaWV3W2FuY2hvcklkeF1gIHBvaW50cyB0byBhIGBDb21tZW50YCBub2RlIHJlcHJlc2VudGluZyB0aGUgYW5jaG9yIGZvciB0aGUgSUNVLlxuICogICAtIGB0Vmlldy5kYXRhW2FuY2hvcklkeF1gIHBvaW50cyB0byB0aGUgYFRJY3VDb250YWluZXJOb2RlYCBpZiBJQ1UgaXMgcm9vdCAoYG51bGxgIG90aGVyd2lzZSlcbiAqL1xuZnVuY3Rpb24gaWN1U3RhcnQoXG4gICAgYXN0OiBJMThuTm9kZVtdLCB0VmlldzogVFZpZXcsIGxWaWV3OiBMVmlldywgdXBkYXRlT3BDb2RlczogSTE4blVwZGF0ZU9wQ29kZXMsXG4gICAgcGFyZW50SWR4OiBudW1iZXIsIGljdUV4cHJlc3Npb246IEljdUV4cHJlc3Npb24sIGFuY2hvcklkeDogbnVtYmVyKSB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnREZWZpbmVkKGljdUV4cHJlc3Npb24sICdJQ1UgZXhwcmVzc2lvbiBtdXN0IGJlIGRlZmluZWQnKTtcbiAgbGV0IGJpbmRpbmdNYXNrID0gMDtcbiAgY29uc3QgdEljdTogVEljdSA9IHtcbiAgICB0eXBlOiBpY3VFeHByZXNzaW9uLnR5cGUsXG4gICAgY3VycmVudENhc2VMVmlld0luZGV4OiBhbGxvY0V4cGFuZG8odFZpZXcsIGxWaWV3LCAxLCBudWxsKSxcbiAgICBhbmNob3JJZHgsXG4gICAgY2FzZXM6IFtdLFxuICAgIGNyZWF0ZTogW10sXG4gICAgcmVtb3ZlOiBbXSxcbiAgICB1cGRhdGU6IFtdXG4gIH07XG4gIGFkZFVwZGF0ZUljdVN3aXRjaCh1cGRhdGVPcENvZGVzLCBpY3VFeHByZXNzaW9uLCBhbmNob3JJZHgpO1xuICBzZXRUSWN1KHRWaWV3LCBhbmNob3JJZHgsIHRJY3UpO1xuICBjb25zdCB2YWx1ZXMgPSBpY3VFeHByZXNzaW9uLnZhbHVlcztcbiAgY29uc3QgY2FzZXM6IEkxOG5Ob2RlW11bXSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgIC8vIEVhY2ggdmFsdWUgaXMgYW4gYXJyYXkgb2Ygc3RyaW5ncyAmIG90aGVyIElDVSBleHByZXNzaW9uc1xuICAgIGNvbnN0IHZhbHVlQXJyID0gdmFsdWVzW2ldO1xuICAgIGNvbnN0IG5lc3RlZEljdXM6IEljdUV4cHJlc3Npb25bXSA9IFtdO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgdmFsdWVBcnIubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdmFsdWVBcnJbal07XG4gICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgICAvLyBJdCBpcyBhbiBuZXN0ZWQgSUNVIGV4cHJlc3Npb25cbiAgICAgICAgY29uc3QgaWN1SW5kZXggPSBuZXN0ZWRJY3VzLnB1c2godmFsdWUgYXMgSWN1RXhwcmVzc2lvbikgLSAxO1xuICAgICAgICAvLyBSZXBsYWNlIG5lc3RlZCBJQ1UgZXhwcmVzc2lvbiBieSBhIGNvbW1lbnQgbm9kZVxuICAgICAgICB2YWx1ZUFycltqXSA9IGA8IS0t77+9JHtpY3VJbmRleH3vv70tLT5gO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBjYXNlQXN0OiBJMThuTm9kZVtdID0gW107XG4gICAgY2FzZXMucHVzaChjYXNlQXN0KTtcbiAgICBiaW5kaW5nTWFzayA9IHBhcnNlSWN1Q2FzZShcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlQXN0LCB0VmlldywgdEljdSwgbFZpZXcsIHVwZGF0ZU9wQ29kZXMsIHBhcmVudElkeCwgaWN1RXhwcmVzc2lvbi5jYXNlc1tpXSxcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZUFyci5qb2luKCcnKSwgbmVzdGVkSWN1cykgfFxuICAgICAgICBiaW5kaW5nTWFzaztcbiAgfVxuICBpZiAoYmluZGluZ01hc2spIHtcbiAgICBhZGRVcGRhdGVJY3VVcGRhdGUodXBkYXRlT3BDb2RlcywgYmluZGluZ01hc2ssIGFuY2hvcklkeCk7XG4gIH1cbiAgYXN0LnB1c2goe1xuICAgIGtpbmQ6IEkxOG5Ob2RlS2luZC5JQ1UsXG4gICAgaW5kZXg6IGFuY2hvcklkeCxcbiAgICBjYXNlcyxcbiAgICBjdXJyZW50Q2FzZUxWaWV3SW5kZXg6IHRJY3UuY3VycmVudENhc2VMVmlld0luZGV4XG4gIH0pO1xufVxuXG4vKipcbiAqIFBhcnNlcyB0ZXh0IGNvbnRhaW5pbmcgYW4gSUNVIGV4cHJlc3Npb24gYW5kIHByb2R1Y2VzIGEgSlNPTiBvYmplY3QgZm9yIGl0LlxuICogT3JpZ2luYWwgY29kZSBmcm9tIGNsb3N1cmUgbGlicmFyeSwgbW9kaWZpZWQgZm9yIEFuZ3VsYXIuXG4gKlxuICogQHBhcmFtIHBhdHRlcm4gVGV4dCBjb250YWluaW5nIGFuIElDVSBleHByZXNzaW9uIHRoYXQgbmVlZHMgdG8gYmUgcGFyc2VkLlxuICpcbiAqL1xuZnVuY3Rpb24gcGFyc2VJQ1VCbG9jayhwYXR0ZXJuOiBzdHJpbmcpOiBJY3VFeHByZXNzaW9uIHtcbiAgY29uc3QgY2FzZXMgPSBbXTtcbiAgY29uc3QgdmFsdWVzOiAoc3RyaW5nfEljdUV4cHJlc3Npb24pW11bXSA9IFtdO1xuICBsZXQgaWN1VHlwZSA9IEljdVR5cGUucGx1cmFsO1xuICBsZXQgbWFpbkJpbmRpbmcgPSAwO1xuICBwYXR0ZXJuID0gcGF0dGVybi5yZXBsYWNlKElDVV9CTE9DS19SRUdFWFAsIGZ1bmN0aW9uKHN0cjogc3RyaW5nLCBiaW5kaW5nOiBzdHJpbmcsIHR5cGU6IHN0cmluZykge1xuICAgIGlmICh0eXBlID09PSAnc2VsZWN0Jykge1xuICAgICAgaWN1VHlwZSA9IEljdVR5cGUuc2VsZWN0O1xuICAgIH0gZWxzZSB7XG4gICAgICBpY3VUeXBlID0gSWN1VHlwZS5wbHVyYWw7XG4gICAgfVxuICAgIG1haW5CaW5kaW5nID0gcGFyc2VJbnQoYmluZGluZy5zbGljZSgxKSwgMTApO1xuICAgIHJldHVybiAnJztcbiAgfSk7XG5cbiAgY29uc3QgcGFydHMgPSBpMThuUGFyc2VUZXh0SW50b1BhcnRzQW5kSUNVKHBhdHRlcm4pIGFzIHN0cmluZ1tdO1xuICAvLyBMb29raW5nIGZvciAoa2V5IGJsb2NrKSsgc2VxdWVuY2UuIE9uZSBvZiB0aGUga2V5cyBoYXMgdG8gYmUgXCJvdGhlclwiLlxuICBmb3IgKGxldCBwb3MgPSAwOyBwb3MgPCBwYXJ0cy5sZW5ndGg7KSB7XG4gICAgbGV0IGtleSA9IHBhcnRzW3BvcysrXS50cmltKCk7XG4gICAgaWYgKGljdVR5cGUgPT09IEljdVR5cGUucGx1cmFsKSB7XG4gICAgICAvLyBLZXkgY2FuIGJlIFwiPXhcIiwgd2UganVzdCB3YW50IFwieFwiXG4gICAgICBrZXkgPSBrZXkucmVwbGFjZSgvXFxzKig/Oj0pPyhcXHcrKVxccyovLCAnJDEnKTtcbiAgICB9XG4gICAgaWYgKGtleS5sZW5ndGgpIHtcbiAgICAgIGNhc2VzLnB1c2goa2V5KTtcbiAgICB9XG5cbiAgICBjb25zdCBibG9ja3MgPSBpMThuUGFyc2VUZXh0SW50b1BhcnRzQW5kSUNVKHBhcnRzW3BvcysrXSkgYXMgc3RyaW5nW107XG4gICAgaWYgKGNhc2VzLmxlbmd0aCA+IHZhbHVlcy5sZW5ndGgpIHtcbiAgICAgIHZhbHVlcy5wdXNoKGJsb2Nrcyk7XG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETyhvY29tYmUpOiBzdXBwb3J0IElDVSBleHByZXNzaW9ucyBpbiBhdHRyaWJ1dGVzLCBzZWUgIzIxNjE1XG4gIHJldHVybiB7dHlwZTogaWN1VHlwZSwgbWFpbkJpbmRpbmc6IG1haW5CaW5kaW5nLCBjYXNlcywgdmFsdWVzfTtcbn1cblxuXG4vKipcbiAqIEJyZWFrcyBwYXR0ZXJuIGludG8gc3RyaW5ncyBhbmQgdG9wIGxldmVsIHsuLi59IGJsb2Nrcy5cbiAqIENhbiBiZSB1c2VkIHRvIGJyZWFrIGEgbWVzc2FnZSBpbnRvIHRleHQgYW5kIElDVSBleHByZXNzaW9ucywgb3IgdG8gYnJlYWsgYW4gSUNVIGV4cHJlc3Npb25cbiAqIGludG8ga2V5cyBhbmQgY2FzZXMuIE9yaWdpbmFsIGNvZGUgZnJvbSBjbG9zdXJlIGxpYnJhcnksIG1vZGlmaWVkIGZvciBBbmd1bGFyLlxuICpcbiAqIEBwYXJhbSBwYXR0ZXJuIChzdWIpUGF0dGVybiB0byBiZSBicm9rZW4uXG4gKiBAcmV0dXJucyBBbiBgQXJyYXk8c3RyaW5nfEljdUV4cHJlc3Npb24+YCB3aGVyZTpcbiAqICAgLSBvZGQgcG9zaXRpb25zOiBgc3RyaW5nYCA9PiB0ZXh0IGJldHdlZW4gSUNVIGV4cHJlc3Npb25zXG4gKiAgIC0gZXZlbiBwb3NpdGlvbnM6IGBJQ1VFeHByZXNzaW9uYCA9PiBJQ1UgZXhwcmVzc2lvbiBwYXJzZWQgaW50byBgSUNVRXhwcmVzc2lvbmAgcmVjb3JkLlxuICovXG5mdW5jdGlvbiBpMThuUGFyc2VUZXh0SW50b1BhcnRzQW5kSUNVKHBhdHRlcm46IHN0cmluZyk6IChzdHJpbmd8SWN1RXhwcmVzc2lvbilbXSB7XG4gIGlmICghcGF0dGVybikge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGxldCBwcmV2UG9zID0gMDtcbiAgY29uc3QgYnJhY2VTdGFjayA9IFtdO1xuICBjb25zdCByZXN1bHRzOiAoc3RyaW5nfEljdUV4cHJlc3Npb24pW10gPSBbXTtcbiAgY29uc3QgYnJhY2VzID0gL1t7fV0vZztcbiAgLy8gbGFzdEluZGV4IGRvZXNuJ3QgZ2V0IHNldCB0byAwIHNvIHdlIGhhdmUgdG8uXG4gIGJyYWNlcy5sYXN0SW5kZXggPSAwO1xuXG4gIGxldCBtYXRjaDtcbiAgd2hpbGUgKG1hdGNoID0gYnJhY2VzLmV4ZWMocGF0dGVybikpIHtcbiAgICBjb25zdCBwb3MgPSBtYXRjaC5pbmRleDtcbiAgICBpZiAobWF0Y2hbMF0gPT0gJ30nKSB7XG4gICAgICBicmFjZVN0YWNrLnBvcCgpO1xuXG4gICAgICBpZiAoYnJhY2VTdGFjay5sZW5ndGggPT0gMCkge1xuICAgICAgICAvLyBFbmQgb2YgdGhlIGJsb2NrLlxuICAgICAgICBjb25zdCBibG9jayA9IHBhdHRlcm4uc3Vic3RyaW5nKHByZXZQb3MsIHBvcyk7XG4gICAgICAgIGlmIChJQ1VfQkxPQ0tfUkVHRVhQLnRlc3QoYmxvY2spKSB7XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKHBhcnNlSUNVQmxvY2soYmxvY2spKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2goYmxvY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJldlBvcyA9IHBvcyArIDE7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChicmFjZVN0YWNrLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgIGNvbnN0IHN1YnN0cmluZyA9IHBhdHRlcm4uc3Vic3RyaW5nKHByZXZQb3MsIHBvcyk7XG4gICAgICAgIHJlc3VsdHMucHVzaChzdWJzdHJpbmcpO1xuICAgICAgICBwcmV2UG9zID0gcG9zICsgMTtcbiAgICAgIH1cbiAgICAgIGJyYWNlU3RhY2sucHVzaCgneycpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHN1YnN0cmluZyA9IHBhdHRlcm4uc3Vic3RyaW5nKHByZXZQb3MpO1xuICByZXN1bHRzLnB1c2goc3Vic3RyaW5nKTtcbiAgcmV0dXJuIHJlc3VsdHM7XG59XG5cblxuLyoqXG4gKiBQYXJzZXMgYSBub2RlLCBpdHMgY2hpbGRyZW4gYW5kIGl0cyBzaWJsaW5ncywgYW5kIGdlbmVyYXRlcyB0aGUgbXV0YXRlICYgdXBkYXRlIE9wQ29kZXMuXG4gKlxuICovXG5mdW5jdGlvbiBwYXJzZUljdUNhc2UoXG4gICAgYXN0OiBJMThuTm9kZVtdLCB0VmlldzogVFZpZXcsIHRJY3U6IFRJY3UsIGxWaWV3OiBMVmlldywgdXBkYXRlT3BDb2RlczogSTE4blVwZGF0ZU9wQ29kZXMsXG4gICAgcGFyZW50SWR4OiBudW1iZXIsIGNhc2VOYW1lOiBzdHJpbmcsIHVuc2FmZUNhc2VIdG1sOiBzdHJpbmcsXG4gICAgbmVzdGVkSWN1czogSWN1RXhwcmVzc2lvbltdKTogbnVtYmVyIHtcbiAgY29uc3QgY3JlYXRlOiBJY3VDcmVhdGVPcENvZGVzID0gW10gYXMgYW55O1xuICBjb25zdCByZW1vdmU6IEkxOG5SZW1vdmVPcENvZGVzID0gW10gYXMgYW55O1xuICBjb25zdCB1cGRhdGU6IEkxOG5VcGRhdGVPcENvZGVzID0gW10gYXMgYW55O1xuICBpZiAobmdEZXZNb2RlKSB7XG4gICAgYXR0YWNoRGVidWdHZXR0ZXIoY3JlYXRlLCBpY3VDcmVhdGVPcENvZGVzVG9TdHJpbmcpO1xuICAgIGF0dGFjaERlYnVnR2V0dGVyKHJlbW92ZSwgaTE4blJlbW92ZU9wQ29kZXNUb1N0cmluZyk7XG4gICAgYXR0YWNoRGVidWdHZXR0ZXIodXBkYXRlLCBpMThuVXBkYXRlT3BDb2Rlc1RvU3RyaW5nKTtcbiAgfVxuICB0SWN1LmNhc2VzLnB1c2goY2FzZU5hbWUpO1xuICB0SWN1LmNyZWF0ZS5wdXNoKGNyZWF0ZSk7XG4gIHRJY3UucmVtb3ZlLnB1c2gocmVtb3ZlKTtcbiAgdEljdS51cGRhdGUucHVzaCh1cGRhdGUpO1xuXG4gIGNvbnN0IGluZXJ0Qm9keUhlbHBlciA9IGdldEluZXJ0Qm9keUhlbHBlcihnZXREb2N1bWVudCgpKTtcbiAgY29uc3QgaW5lcnRCb2R5RWxlbWVudCA9IGluZXJ0Qm9keUhlbHBlci5nZXRJbmVydEJvZHlFbGVtZW50KHVuc2FmZUNhc2VIdG1sKTtcbiAgbmdEZXZNb2RlICYmIGFzc2VydERlZmluZWQoaW5lcnRCb2R5RWxlbWVudCwgJ1VuYWJsZSB0byBnZW5lcmF0ZSBpbmVydCBib2R5IGVsZW1lbnQnKTtcbiAgY29uc3QgaW5lcnRSb290Tm9kZSA9IGdldFRlbXBsYXRlQ29udGVudChpbmVydEJvZHlFbGVtZW50ISkgYXMgRWxlbWVudCB8fCBpbmVydEJvZHlFbGVtZW50O1xuICBpZiAoaW5lcnRSb290Tm9kZSkge1xuICAgIHJldHVybiB3YWxrSWN1VHJlZShcbiAgICAgICAgYXN0LCB0VmlldywgdEljdSwgbFZpZXcsIHVwZGF0ZU9wQ29kZXMsIGNyZWF0ZSwgcmVtb3ZlLCB1cGRhdGUsIGluZXJ0Um9vdE5vZGUsIHBhcmVudElkeCxcbiAgICAgICAgbmVzdGVkSWN1cywgMCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbn1cblxuZnVuY3Rpb24gd2Fsa0ljdVRyZWUoXG4gICAgYXN0OiBJMThuTm9kZVtdLCB0VmlldzogVFZpZXcsIHRJY3U6IFRJY3UsIGxWaWV3OiBMVmlldywgc2hhcmVkVXBkYXRlT3BDb2RlczogSTE4blVwZGF0ZU9wQ29kZXMsXG4gICAgY3JlYXRlOiBJY3VDcmVhdGVPcENvZGVzLCByZW1vdmU6IEkxOG5SZW1vdmVPcENvZGVzLCB1cGRhdGU6IEkxOG5VcGRhdGVPcENvZGVzLFxuICAgIHBhcmVudE5vZGU6IEVsZW1lbnQsIHBhcmVudElkeDogbnVtYmVyLCBuZXN0ZWRJY3VzOiBJY3VFeHByZXNzaW9uW10sIGRlcHRoOiBudW1iZXIpOiBudW1iZXIge1xuICBsZXQgYmluZGluZ01hc2sgPSAwO1xuICBsZXQgY3VycmVudE5vZGUgPSBwYXJlbnROb2RlLmZpcnN0Q2hpbGQ7XG4gIHdoaWxlIChjdXJyZW50Tm9kZSkge1xuICAgIGNvbnN0IG5ld0luZGV4ID0gYWxsb2NFeHBhbmRvKHRWaWV3LCBsVmlldywgMSwgbnVsbCk7XG4gICAgc3dpdGNoIChjdXJyZW50Tm9kZS5ub2RlVHlwZSkge1xuICAgICAgY2FzZSBOb2RlLkVMRU1FTlRfTk9ERTpcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGN1cnJlbnROb2RlIGFzIEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHRhZ05hbWUgPSBlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKFZBTElEX0VMRU1FTlRTLmhhc093blByb3BlcnR5KHRhZ05hbWUpKSB7XG4gICAgICAgICAgYWRkQ3JlYXRlTm9kZUFuZEFwcGVuZChjcmVhdGUsIEVMRU1FTlRfTUFSS0VSLCB0YWdOYW1lLCBwYXJlbnRJZHgsIG5ld0luZGV4KTtcbiAgICAgICAgICB0Vmlldy5kYXRhW25ld0luZGV4XSA9IHRhZ05hbWU7XG4gICAgICAgICAgY29uc3QgZWxBdHRycyA9IGVsZW1lbnQuYXR0cmlidXRlcztcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsQXR0cnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGF0dHIgPSBlbEF0dHJzLml0ZW0oaSkhO1xuICAgICAgICAgICAgY29uc3QgbG93ZXJBdHRyTmFtZSA9IGF0dHIubmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgY29uc3QgaGFzQmluZGluZyA9ICEhYXR0ci52YWx1ZS5tYXRjaChCSU5ESU5HX1JFR0VYUCk7XG4gICAgICAgICAgICAvLyB3ZSBhc3N1bWUgdGhlIGlucHV0IHN0cmluZyBpcyBzYWZlLCB1bmxlc3MgaXQncyB1c2luZyBhIGJpbmRpbmdcbiAgICAgICAgICAgIGlmIChoYXNCaW5kaW5nKSB7XG4gICAgICAgICAgICAgIGlmIChWQUxJRF9BVFRSUy5oYXNPd25Qcm9wZXJ0eShsb3dlckF0dHJOYW1lKSkge1xuICAgICAgICAgICAgICAgIGlmIChVUklfQVRUUlNbbG93ZXJBdHRyTmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgIGdlbmVyYXRlQmluZGluZ1VwZGF0ZU9wQ29kZXMoXG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlLCBhdHRyLnZhbHVlLCBuZXdJbmRleCwgYXR0ci5uYW1lLCAwLCBfc2FuaXRpemVVcmwpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBnZW5lcmF0ZUJpbmRpbmdVcGRhdGVPcENvZGVzKHVwZGF0ZSwgYXR0ci52YWx1ZSwgbmV3SW5kZXgsIGF0dHIubmFtZSwgMCwgbnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5nRGV2TW9kZSAmJlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgICAgICAgICAgICBgV0FSTklORzogaWdub3JpbmcgdW5zYWZlIGF0dHJpYnV0ZSB2YWx1ZSBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGAke2xvd2VyQXR0ck5hbWV9IG9uIGVsZW1lbnQgJHt0YWdOYW1lfSBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGAoc2VlICR7WFNTX1NFQ1VSSVRZX1VSTH0pYCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGFkZENyZWF0ZUF0dHJpYnV0ZShjcmVhdGUsIG5ld0luZGV4LCBhdHRyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgZWxlbWVudE5vZGU6IEkxOG5FbGVtZW50Tm9kZSA9IHtcbiAgICAgICAgICAgIGtpbmQ6IEkxOG5Ob2RlS2luZC5FTEVNRU5ULFxuICAgICAgICAgICAgaW5kZXg6IG5ld0luZGV4LFxuICAgICAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICAgIH07XG4gICAgICAgICAgYXN0LnB1c2goZWxlbWVudE5vZGUpO1xuICAgICAgICAgIC8vIFBhcnNlIHRoZSBjaGlsZHJlbiBvZiB0aGlzIG5vZGUgKGlmIGFueSlcbiAgICAgICAgICBiaW5kaW5nTWFzayA9XG4gICAgICAgICAgICAgIHdhbGtJY3VUcmVlKFxuICAgICAgICAgICAgICAgICAgZWxlbWVudE5vZGUuY2hpbGRyZW4sIHRWaWV3LCB0SWN1LCBsVmlldywgc2hhcmVkVXBkYXRlT3BDb2RlcywgY3JlYXRlLCByZW1vdmUsXG4gICAgICAgICAgICAgICAgICB1cGRhdGUsIGN1cnJlbnROb2RlIGFzIEVsZW1lbnQsIG5ld0luZGV4LCBuZXN0ZWRJY3VzLCBkZXB0aCArIDEpIHxcbiAgICAgICAgICAgICAgYmluZGluZ01hc2s7XG4gICAgICAgICAgYWRkUmVtb3ZlTm9kZShyZW1vdmUsIG5ld0luZGV4LCBkZXB0aCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIE5vZGUuVEVYVF9OT0RFOlxuICAgICAgICBjb25zdCB2YWx1ZSA9IGN1cnJlbnROb2RlLnRleHRDb250ZW50IHx8ICcnO1xuICAgICAgICBjb25zdCBoYXNCaW5kaW5nID0gdmFsdWUubWF0Y2goQklORElOR19SRUdFWFApO1xuICAgICAgICBhZGRDcmVhdGVOb2RlQW5kQXBwZW5kKGNyZWF0ZSwgbnVsbCwgaGFzQmluZGluZyA/ICcnIDogdmFsdWUsIHBhcmVudElkeCwgbmV3SW5kZXgpO1xuICAgICAgICBhZGRSZW1vdmVOb2RlKHJlbW92ZSwgbmV3SW5kZXgsIGRlcHRoKTtcbiAgICAgICAgaWYgKGhhc0JpbmRpbmcpIHtcbiAgICAgICAgICBiaW5kaW5nTWFzayA9XG4gICAgICAgICAgICAgIGdlbmVyYXRlQmluZGluZ1VwZGF0ZU9wQ29kZXModXBkYXRlLCB2YWx1ZSwgbmV3SW5kZXgsIG51bGwsIDAsIG51bGwpIHwgYmluZGluZ01hc2s7XG4gICAgICAgIH1cbiAgICAgICAgYXN0LnB1c2goe1xuICAgICAgICAgIGtpbmQ6IEkxOG5Ob2RlS2luZC5URVhULFxuICAgICAgICAgIGluZGV4OiBuZXdJbmRleCxcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBOb2RlLkNPTU1FTlRfTk9ERTpcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGNvbW1lbnQgbm9kZSBpcyBhIHBsYWNlaG9sZGVyIGZvciBhIG5lc3RlZCBJQ1VcbiAgICAgICAgY29uc3QgaXNOZXN0ZWRJY3UgPSBORVNURURfSUNVLmV4ZWMoY3VycmVudE5vZGUudGV4dENvbnRlbnQgfHwgJycpO1xuICAgICAgICBpZiAoaXNOZXN0ZWRJY3UpIHtcbiAgICAgICAgICBjb25zdCBuZXN0ZWRJY3VJbmRleCA9IHBhcnNlSW50KGlzTmVzdGVkSWN1WzFdLCAxMCk7XG4gICAgICAgICAgY29uc3QgaWN1RXhwcmVzc2lvbjogSWN1RXhwcmVzc2lvbiA9IG5lc3RlZEljdXNbbmVzdGVkSWN1SW5kZXhdO1xuICAgICAgICAgIC8vIENyZWF0ZSB0aGUgY29tbWVudCBub2RlIHRoYXQgd2lsbCBhbmNob3IgdGhlIElDVSBleHByZXNzaW9uXG4gICAgICAgICAgYWRkQ3JlYXRlTm9kZUFuZEFwcGVuZChcbiAgICAgICAgICAgICAgY3JlYXRlLCBJQ1VfTUFSS0VSLCBuZ0Rldk1vZGUgPyBgbmVzdGVkIElDVSAke25lc3RlZEljdUluZGV4fWAgOiAnJywgcGFyZW50SWR4LFxuICAgICAgICAgICAgICBuZXdJbmRleCk7XG4gICAgICAgICAgaWN1U3RhcnQoYXN0LCB0VmlldywgbFZpZXcsIHNoYXJlZFVwZGF0ZU9wQ29kZXMsIHBhcmVudElkeCwgaWN1RXhwcmVzc2lvbiwgbmV3SW5kZXgpO1xuICAgICAgICAgIGFkZFJlbW92ZU5lc3RlZEljdShyZW1vdmUsIG5ld0luZGV4LCBkZXB0aCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dFNpYmxpbmc7XG4gIH1cbiAgcmV0dXJuIGJpbmRpbmdNYXNrO1xufVxuXG5mdW5jdGlvbiBhZGRSZW1vdmVOb2RlKHJlbW92ZTogSTE4blJlbW92ZU9wQ29kZXMsIGluZGV4OiBudW1iZXIsIGRlcHRoOiBudW1iZXIpIHtcbiAgaWYgKGRlcHRoID09PSAwKSB7XG4gICAgcmVtb3ZlLnB1c2goaW5kZXgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFkZFJlbW92ZU5lc3RlZEljdShyZW1vdmU6IEkxOG5SZW1vdmVPcENvZGVzLCBpbmRleDogbnVtYmVyLCBkZXB0aDogbnVtYmVyKSB7XG4gIGlmIChkZXB0aCA9PT0gMCkge1xuICAgIHJlbW92ZS5wdXNoKH5pbmRleCk7ICAvLyByZW1vdmUgSUNVIGF0IGBpbmRleGBcbiAgICByZW1vdmUucHVzaChpbmRleCk7ICAgLy8gcmVtb3ZlIElDVSBjb21tZW50IGF0IGBpbmRleGBcbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRVcGRhdGVJY3VTd2l0Y2goXG4gICAgdXBkYXRlOiBJMThuVXBkYXRlT3BDb2RlcywgaWN1RXhwcmVzc2lvbjogSWN1RXhwcmVzc2lvbiwgaW5kZXg6IG51bWJlcikge1xuICB1cGRhdGUucHVzaChcbiAgICAgIHRvTWFza0JpdChpY3VFeHByZXNzaW9uLm1haW5CaW5kaW5nKSwgMiwgLTEgLSBpY3VFeHByZXNzaW9uLm1haW5CaW5kaW5nLFxuICAgICAgaW5kZXggPDwgSTE4blVwZGF0ZU9wQ29kZS5TSElGVF9SRUYgfCBJMThuVXBkYXRlT3BDb2RlLkljdVN3aXRjaCk7XG59XG5cbmZ1bmN0aW9uIGFkZFVwZGF0ZUljdVVwZGF0ZSh1cGRhdGU6IEkxOG5VcGRhdGVPcENvZGVzLCBiaW5kaW5nTWFzazogbnVtYmVyLCBpbmRleDogbnVtYmVyKSB7XG4gIHVwZGF0ZS5wdXNoKGJpbmRpbmdNYXNrLCAxLCBpbmRleCA8PCBJMThuVXBkYXRlT3BDb2RlLlNISUZUX1JFRiB8IEkxOG5VcGRhdGVPcENvZGUuSWN1VXBkYXRlKTtcbn1cblxuZnVuY3Rpb24gYWRkQ3JlYXRlTm9kZUFuZEFwcGVuZChcbiAgICBjcmVhdGU6IEljdUNyZWF0ZU9wQ29kZXMsIG1hcmtlcjogbnVsbHxJQ1VfTUFSS0VSfEVMRU1FTlRfTUFSS0VSLCB0ZXh0OiBzdHJpbmcsXG4gICAgYXBwZW5kVG9QYXJlbnRJZHg6IG51bWJlciwgY3JlYXRlQXRJZHg6IG51bWJlcikge1xuICBpZiAobWFya2VyICE9PSBudWxsKSB7XG4gICAgY3JlYXRlLnB1c2gobWFya2VyKTtcbiAgfVxuICBjcmVhdGUucHVzaChcbiAgICAgIHRleHQsIGNyZWF0ZUF0SWR4LFxuICAgICAgaWN1Q3JlYXRlT3BDb2RlKEljdUNyZWF0ZU9wQ29kZS5BcHBlbmRDaGlsZCwgYXBwZW5kVG9QYXJlbnRJZHgsIGNyZWF0ZUF0SWR4KSk7XG59XG5cbmZ1bmN0aW9uIGFkZENyZWF0ZUF0dHJpYnV0ZShjcmVhdGU6IEljdUNyZWF0ZU9wQ29kZXMsIG5ld0luZGV4OiBudW1iZXIsIGF0dHI6IEF0dHIpIHtcbiAgY3JlYXRlLnB1c2gobmV3SW5kZXggPDwgSWN1Q3JlYXRlT3BDb2RlLlNISUZUX1JFRiB8IEljdUNyZWF0ZU9wQ29kZS5BdHRyLCBhdHRyLm5hbWUsIGF0dHIudmFsdWUpO1xufVxuIl19