/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import '../util/ng_dev_mode';
import { assertDefined, assertEqual, assertNotEqual } from '../util/assert';
import { classIndexOf } from './styling/class_differ';
import { isNameOnlyAttributeMarker } from './util/attrs_utils';
const NG_TEMPLATE_SELECTOR = 'ng-template';
/**
 * Search the `TAttributes` to see if it contains `cssClassToMatch` (case insensitive)
 *
 * @param tNode static data of the node to match
 * @param attrs `TAttributes` to search through.
 * @param cssClassToMatch class to match (lowercase)
 * @param isProjectionMode Whether or not class matching should look into the attribute `class` in
 *    addition to the `AttributeMarker.Classes`.
 */
function isCssClassMatching(tNode, attrs, cssClassToMatch, isProjectionMode) {
    ngDevMode &&
        assertEqual(cssClassToMatch, cssClassToMatch.toLowerCase(), 'Class name expected to be lowercase.');
    let i = 0;
    if (isProjectionMode) {
        for (; i < attrs.length && typeof attrs[i] === 'string'; i += 2) {
            // Search for an implicit `class` attribute and check if its value matches `cssClassToMatch`.
            if (attrs[i] === 'class' &&
                classIndexOf(attrs[i + 1].toLowerCase(), cssClassToMatch, 0) !== -1) {
                return true;
            }
        }
    }
    else if (isInlineTemplate(tNode)) {
        // Matching directives (i.e. when not matching for projection mode) should not consider the
        // class bindings that are present on inline templates, as those class bindings only target
        // the root node of the template, not the template itself.
        return false;
    }
    // Resume the search for classes after the `Classes` marker.
    i = attrs.indexOf(1 /* AttributeMarker.Classes */, i);
    if (i > -1) {
        // We found the classes section. Start searching for the class.
        let item;
        while (++i < attrs.length && typeof (item = attrs[i]) === 'string') {
            if (item.toLowerCase() === cssClassToMatch) {
                return true;
            }
        }
    }
    return false;
}
/**
 * Checks whether the `tNode` represents an inline template (e.g. `*ngFor`).
 *
 * @param tNode current TNode
 */
export function isInlineTemplate(tNode) {
    return tNode.type === 4 /* TNodeType.Container */ && tNode.value !== NG_TEMPLATE_SELECTOR;
}
/**
 * Function that checks whether a given tNode matches tag-based selector and has a valid type.
 *
 * Matching can be performed in 2 modes: projection mode (when we project nodes) and regular
 * directive matching mode:
 * - in the "directive matching" mode we do _not_ take TContainer's tagName into account if it is
 * different from NG_TEMPLATE_SELECTOR (value different from NG_TEMPLATE_SELECTOR indicates that a
 * tag name was extracted from * syntax so we would match the same directive twice);
 * - in the "projection" mode, we use a tag name potentially extracted from the * syntax processing
 * (applicable to TNodeType.Container only).
 */
function hasTagAndTypeMatch(tNode, currentSelector, isProjectionMode) {
    const tagNameToCompare = tNode.type === 4 /* TNodeType.Container */ && !isProjectionMode ? NG_TEMPLATE_SELECTOR : tNode.value;
    return currentSelector === tagNameToCompare;
}
/**
 * A utility function to match an Ivy node static data against a simple CSS selector
 *
 * @param tNode static data of the node to match
 * @param selector The selector to try matching against the node.
 * @param isProjectionMode if `true` we are matching for content projection, otherwise we are doing
 * directive matching.
 * @returns true if node matches the selector.
 */
export function isNodeMatchingSelector(tNode, selector, isProjectionMode) {
    ngDevMode && assertDefined(selector[0], 'Selector should have a tag name');
    let mode = 4 /* SelectorFlags.ELEMENT */;
    const nodeAttrs = tNode.attrs;
    // Find the index of first attribute that has no value, only a name.
    const nameOnlyMarkerIdx = nodeAttrs !== null ? getNameOnlyMarkerIndex(nodeAttrs) : 0;
    // When processing ":not" selectors, we skip to the next ":not" if the
    // current one doesn't match
    let skipToNextSelector = false;
    for (let i = 0; i < selector.length; i++) {
        const current = selector[i];
        if (typeof current === 'number') {
            // If we finish processing a :not selector and it hasn't failed, return false
            if (!skipToNextSelector && !isPositive(mode) && !isPositive(current)) {
                return false;
            }
            // If we are skipping to the next :not() and this mode flag is positive,
            // it's a part of the current :not() selector, and we should keep skipping
            if (skipToNextSelector && isPositive(current))
                continue;
            skipToNextSelector = false;
            mode = current | (mode & 1 /* SelectorFlags.NOT */);
            continue;
        }
        if (skipToNextSelector)
            continue;
        if (mode & 4 /* SelectorFlags.ELEMENT */) {
            mode = 2 /* SelectorFlags.ATTRIBUTE */ | mode & 1 /* SelectorFlags.NOT */;
            if (current !== '' && !hasTagAndTypeMatch(tNode, current, isProjectionMode) ||
                current === '' && selector.length === 1) {
                if (isPositive(mode))
                    return false;
                skipToNextSelector = true;
            }
        }
        else if (mode & 8 /* SelectorFlags.CLASS */) {
            if (nodeAttrs === null || !isCssClassMatching(tNode, nodeAttrs, current, isProjectionMode)) {
                if (isPositive(mode))
                    return false;
                skipToNextSelector = true;
            }
        }
        else {
            const selectorAttrValue = selector[++i];
            const attrIndexInNode = findAttrIndexInNode(current, nodeAttrs, isInlineTemplate(tNode), isProjectionMode);
            if (attrIndexInNode === -1) {
                if (isPositive(mode))
                    return false;
                skipToNextSelector = true;
                continue;
            }
            if (selectorAttrValue !== '') {
                let nodeAttrValue;
                if (attrIndexInNode > nameOnlyMarkerIdx) {
                    nodeAttrValue = '';
                }
                else {
                    ngDevMode &&
                        assertNotEqual(nodeAttrs[attrIndexInNode], 0 /* AttributeMarker.NamespaceURI */, 'We do not match directives on namespaced attributes');
                    // we lowercase the attribute value to be able to match
                    // selectors without case-sensitivity
                    // (selectors are already in lowercase when generated)
                    nodeAttrValue = nodeAttrs[attrIndexInNode + 1].toLowerCase();
                }
                if (mode & 2 /* SelectorFlags.ATTRIBUTE */ && selectorAttrValue !== nodeAttrValue) {
                    if (isPositive(mode))
                        return false;
                    skipToNextSelector = true;
                }
            }
        }
    }
    return isPositive(mode) || skipToNextSelector;
}
function isPositive(mode) {
    return (mode & 1 /* SelectorFlags.NOT */) === 0;
}
/**
 * Examines the attribute's definition array for a node to find the index of the
 * attribute that matches the given `name`.
 *
 * NOTE: This will not match namespaced attributes.
 *
 * Attribute matching depends upon `isInlineTemplate` and `isProjectionMode`.
 * The following table summarizes which types of attributes we attempt to match:
 *
 * ===========================================================================================================
 * Modes                   | Normal Attributes | Bindings Attributes | Template Attributes | I18n
 * Attributes
 * ===========================================================================================================
 * Inline + Projection     | YES               | YES                 | NO                  | YES
 * -----------------------------------------------------------------------------------------------------------
 * Inline + Directive      | NO                | NO                  | YES                 | NO
 * -----------------------------------------------------------------------------------------------------------
 * Non-inline + Projection | YES               | YES                 | NO                  | YES
 * -----------------------------------------------------------------------------------------------------------
 * Non-inline + Directive  | YES               | YES                 | NO                  | YES
 * ===========================================================================================================
 *
 * @param name the name of the attribute to find
 * @param attrs the attribute array to examine
 * @param isInlineTemplate true if the node being matched is an inline template (e.g. `*ngFor`)
 * rather than a manually expanded template node (e.g `<ng-template>`).
 * @param isProjectionMode true if we are matching against content projection otherwise we are
 * matching against directives.
 */
function findAttrIndexInNode(name, attrs, isInlineTemplate, isProjectionMode) {
    if (attrs === null)
        return -1;
    let i = 0;
    if (isProjectionMode || !isInlineTemplate) {
        let bindingsMode = false;
        while (i < attrs.length) {
            const maybeAttrName = attrs[i];
            if (maybeAttrName === name) {
                return i;
            }
            else if (maybeAttrName === 3 /* AttributeMarker.Bindings */ || maybeAttrName === 6 /* AttributeMarker.I18n */) {
                bindingsMode = true;
            }
            else if (maybeAttrName === 1 /* AttributeMarker.Classes */ || maybeAttrName === 2 /* AttributeMarker.Styles */) {
                let value = attrs[++i];
                // We should skip classes here because we have a separate mechanism for
                // matching classes in projection mode.
                while (typeof value === 'string') {
                    value = attrs[++i];
                }
                continue;
            }
            else if (maybeAttrName === 4 /* AttributeMarker.Template */) {
                // We do not care about Template attributes in this scenario.
                break;
            }
            else if (maybeAttrName === 0 /* AttributeMarker.NamespaceURI */) {
                // Skip the whole namespaced attribute and value. This is by design.
                i += 4;
                continue;
            }
            // In binding mode there are only names, rather than name-value pairs.
            i += bindingsMode ? 1 : 2;
        }
        // We did not match the attribute
        return -1;
    }
    else {
        return matchTemplateAttribute(attrs, name);
    }
}
export function isNodeMatchingSelectorList(tNode, selector, isProjectionMode = false) {
    for (let i = 0; i < selector.length; i++) {
        if (isNodeMatchingSelector(tNode, selector[i], isProjectionMode)) {
            return true;
        }
    }
    return false;
}
export function getProjectAsAttrValue(tNode) {
    const nodeAttrs = tNode.attrs;
    if (nodeAttrs != null) {
        const ngProjectAsAttrIdx = nodeAttrs.indexOf(5 /* AttributeMarker.ProjectAs */);
        // only check for ngProjectAs in attribute names, don't accidentally match attribute's value
        // (attribute names are stored at even indexes)
        if ((ngProjectAsAttrIdx & 1) === 0) {
            return nodeAttrs[ngProjectAsAttrIdx + 1];
        }
    }
    return null;
}
function getNameOnlyMarkerIndex(nodeAttrs) {
    for (let i = 0; i < nodeAttrs.length; i++) {
        const nodeAttr = nodeAttrs[i];
        if (isNameOnlyAttributeMarker(nodeAttr)) {
            return i;
        }
    }
    return nodeAttrs.length;
}
function matchTemplateAttribute(attrs, name) {
    let i = attrs.indexOf(4 /* AttributeMarker.Template */);
    if (i > -1) {
        i++;
        while (i < attrs.length) {
            const attr = attrs[i];
            // Return in case we checked all template attrs and are switching to the next section in the
            // attrs array (that starts with a number that represents an attribute marker).
            if (typeof attr === 'number')
                return -1;
            if (attr === name)
                return i;
            i++;
        }
    }
    return -1;
}
/**
 * Checks whether a selector is inside a CssSelectorList
 * @param selector Selector to be checked.
 * @param list List in which to look for the selector.
 */
export function isSelectorInSelectorList(selector, list) {
    selectorListLoop: for (let i = 0; i < list.length; i++) {
        const currentSelectorInList = list[i];
        if (selector.length !== currentSelectorInList.length) {
            continue;
        }
        for (let j = 0; j < selector.length; j++) {
            if (selector[j] !== currentSelectorInList[j]) {
                continue selectorListLoop;
            }
        }
        return true;
    }
    return false;
}
function maybeWrapInNotSelector(isNegativeMode, chunk) {
    return isNegativeMode ? ':not(' + chunk.trim() + ')' : chunk;
}
function stringifyCSSSelector(selector) {
    let result = selector[0];
    let i = 1;
    let mode = 2 /* SelectorFlags.ATTRIBUTE */;
    let currentChunk = '';
    let isNegativeMode = false;
    while (i < selector.length) {
        let valueOrMarker = selector[i];
        if (typeof valueOrMarker === 'string') {
            if (mode & 2 /* SelectorFlags.ATTRIBUTE */) {
                const attrValue = selector[++i];
                currentChunk +=
                    '[' + valueOrMarker + (attrValue.length > 0 ? '="' + attrValue + '"' : '') + ']';
            }
            else if (mode & 8 /* SelectorFlags.CLASS */) {
                currentChunk += '.' + valueOrMarker;
            }
            else if (mode & 4 /* SelectorFlags.ELEMENT */) {
                currentChunk += ' ' + valueOrMarker;
            }
        }
        else {
            //
            // Append current chunk to the final result in case we come across SelectorFlag, which
            // indicates that the previous section of a selector is over. We need to accumulate content
            // between flags to make sure we wrap the chunk later in :not() selector if needed, e.g.
            // ```
            //  ['', Flags.CLASS, '.classA', Flags.CLASS | Flags.NOT, '.classB', '.classC']
            // ```
            // should be transformed to `.classA :not(.classB .classC)`.
            //
            // Note: for negative selector part, we accumulate content between flags until we find the
            // next negative flag. This is needed to support a case where `:not()` rule contains more than
            // one chunk, e.g. the following selector:
            // ```
            //  ['', Flags.ELEMENT | Flags.NOT, 'p', Flags.CLASS, 'foo', Flags.CLASS | Flags.NOT, 'bar']
            // ```
            // should be stringified to `:not(p.foo) :not(.bar)`
            //
            if (currentChunk !== '' && !isPositive(valueOrMarker)) {
                result += maybeWrapInNotSelector(isNegativeMode, currentChunk);
                currentChunk = '';
            }
            mode = valueOrMarker;
            // According to CssSelector spec, once we come across `SelectorFlags.NOT` flag, the negative
            // mode is maintained for remaining chunks of a selector.
            isNegativeMode = isNegativeMode || !isPositive(mode);
        }
        i++;
    }
    if (currentChunk !== '') {
        result += maybeWrapInNotSelector(isNegativeMode, currentChunk);
    }
    return result;
}
/**
 * Generates string representation of CSS selector in parsed form.
 *
 * ComponentDef and DirectiveDef are generated with the selector in parsed form to avoid doing
 * additional parsing at runtime (for example, for directive matching). However in some cases (for
 * example, while bootstrapping a component), a string version of the selector is required to query
 * for the host element on the page. This function takes the parsed form of a selector and returns
 * its string representation.
 *
 * @param selectorList selector in parsed form
 * @returns string representation of a given selector
 */
export function stringifyCSSSelectorList(selectorList) {
    return selectorList.map(stringifyCSSSelector).join(',');
}
/**
 * Extracts attributes and classes information from a given CSS selector.
 *
 * This function is used while creating a component dynamically. In this case, the host element
 * (that is created dynamically) should contain attributes and classes specified in component's CSS
 * selector.
 *
 * @param selector CSS selector in parsed form (in a form of array)
 * @returns object with `attrs` and `classes` fields that contain extracted information
 */
export function extractAttrsAndClassesFromSelector(selector) {
    const attrs = [];
    const classes = [];
    let i = 1;
    let mode = 2 /* SelectorFlags.ATTRIBUTE */;
    while (i < selector.length) {
        let valueOrMarker = selector[i];
        if (typeof valueOrMarker === 'string') {
            if (mode === 2 /* SelectorFlags.ATTRIBUTE */) {
                if (valueOrMarker !== '') {
                    attrs.push(valueOrMarker, selector[++i]);
                }
            }
            else if (mode === 8 /* SelectorFlags.CLASS */) {
                classes.push(valueOrMarker);
            }
        }
        else {
            // According to CssSelector spec, once we come across `SelectorFlags.NOT` flag, the negative
            // mode is maintained for remaining chunks of a selector. Since attributes and classes are
            // extracted only for "positive" part of the selector, we can stop here.
            if (!isPositive(mode))
                break;
            mode = valueOrMarker;
        }
        i++;
    }
    return { attrs, classes };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9zZWxlY3Rvcl9tYXRjaGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9ub2RlX3NlbGVjdG9yX21hdGNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxxQkFBcUIsQ0FBQztBQUU3QixPQUFPLEVBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUsxRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFN0QsTUFBTSxvQkFBb0IsR0FBRyxhQUFhLENBQUM7QUFFM0M7Ozs7Ozs7O0dBUUc7QUFDSCxTQUFTLGtCQUFrQixDQUN2QixLQUFZLEVBQUUsS0FBa0IsRUFBRSxlQUF1QixFQUFFLGdCQUF5QjtJQUN0RixTQUFTO1FBQ0wsV0FBVyxDQUNQLGVBQWUsRUFBRSxlQUFlLENBQUMsV0FBVyxFQUFFLEVBQUUsc0NBQXNDLENBQUMsQ0FBQztJQUNoRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDVixJQUFJLGdCQUFnQixFQUFFLENBQUM7UUFDckIsT0FBTyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sSUFBSSxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2hFLDZGQUE2RjtZQUM3RixJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxPQUFPO2dCQUNwQixZQUFZLENBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQVksQ0FBQyxXQUFXLEVBQUUsRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDcEYsT0FBTyxJQUFJLENB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YSxFQUFFLENBQUM7SUFDM0IsTUFBTSxPQUFPLEdBQWEsRUFBRSxDQUFDO0lBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNWLElBQUksSUFBSSxrQ0FBMEIsQ0FBQztJQUNuQyxPQUFPLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDM0IsSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLElBQUksT0FBTyxhQUFhLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDdEMsSUFBSSxJQUFJLG9DQUE0QixFQUFFLENBQUM7Z0JBQ3JDLElBQUksYUFBYSxLQUFLLEVBQUUsRUFBRSxDQUFDO29CQUN6QixLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQVcsQ0FBQyxDQUFDO2dCQUNyRCxDQUFDO1lBQ0gsQ0FBQztpQkFBTSxJQUFJLElBQUksZ0NBQXdCLEVBQUUsQ0FBQztnQkFDeEMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUM5QixDQUFDO1FBQ0gsQ0FBQzthQUFNLENBQUM7WUFDTiw0RkFBNEY7WUFDNUYsMEZBQTBGO1lBQzFGLHdFQUF3RTtZQUN4RSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztnQkFBRSxNQUFNO1lBQzdCLElBQUksR0FBRyxhQUFhLENBQUM7UUFDdkIsQ0FBQztRQUNELENBQUMsRUFBRSxDQUFDO0lBQ04sQ0FBQztJQUNELE9BQU8sRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFDLENBQUM7QUFDMUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgJy4uL3V0aWwvbmdfZGV2X21vZGUnO1xuXG5pbXBvcnQge2Fzc2VydERlZmluZWQsIGFzc2VydEVxdWFsLCBhc3NlcnROb3RFcXVhbH0gZnJvbSAnLi4vdXRpbC9hc3NlcnQnO1xuXG5pbXBvcnQge0F0dHJpYnV0ZU1hcmtlcn0gZnJvbSAnLi9pbnRlcmZhY2VzL2F0dHJpYnV0ZV9tYXJrZXInO1xuaW1wb3J0IHtUQXR0cmlidXRlcywgVE5vZGUsIFROb2RlVHlwZX0gZnJvbSAnLi9pbnRlcmZhY2VzL25vZGUnO1xuaW1wb3J0IHtDc3NTZWxlY3RvciwgQ3NzU2VsZWN0b3JMaXN0LCBTZWxlY3RvckZsYWdzfSBmcm9tICcuL2ludGVyZmFjZXMvcHJvamVjdGlvbic7XG5pbXBvcnQge2NsYXNzSW5kZXhPZn0gZnJvbSAnLi9zdHlsaW5nL2NsYXNzX2RpZmZlcic7XG5pbXBvcnQge2lzTmFtZU9ubHlBdHRyaWJ1dGVNYXJrZXJ9IGZyb20gJy4vdXRpbC9hdHRyc191dGlscyc7XG5cbmNvbnN0IE5HX1RFTVBMQVRFX1NFTEVDVE9SID0gJ25nLXRlbXBsYXRlJztcblxuLyoqXG4gKiBTZWFyY2ggdGhlIGBUQXR0cmlidXRlc2AgdG8gc2VlIGlmIGl0IGNvbnRhaW5zIGBjc3NDbGFzc1RvTWF0Y2hgIChjYXNlIGluc2Vuc2l0aXZlKVxuICpcbiAqIEBwYXJhbSB0Tm9kZSBzdGF0aWMgZGF0YSBvZiB0aGUgbm9kZSB0byBtYXRjaFxuICogQHBhcmFtIGF0dHJzIGBUQXR0cmlidXRlc2AgdG8gc2VhcmNoIHRocm91Z2guXG4gKiBAcGFyYW0gY3NzQ2xhc3NUb01hdGNoIGNsYXNzIHRvIG1hdGNoIChsb3dlcmNhc2UpXG4gKiBAcGFyYW0gaXNQcm9qZWN0aW9uTW9kZSBXaGV0aGVyIG9yIG5vdCBjbGFzcyBtYXRjaGluZyBzaG91bGQgbG9vayBpbnRvIHRoZSBhdHRyaWJ1dGUgYGNsYXNzYCBpblxuICogICAgYWRkaXRpb24gdG8gdGhlIGBBdHRyaWJ1dGVNYXJrZXIuQ2xhc3Nlc2AuXG4gKi9cbmZ1bmN0aW9uIGlzQ3NzQ2xhc3NNYXRjaGluZyhcbiAgICB0Tm9kZTogVE5vZGUsIGF0dHJzOiBUQXR0cmlidXRlcywgY3NzQ2xhc3NUb01hdGNoOiBzdHJpbmcsIGlzUHJvamVjdGlvbk1vZGU6IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgbmdEZXZNb2RlICYmXG4gICAgICBhc3NlcnRFcXVhbChcbiAgICAgICAgICBjc3NDbGFzc1RvTWF0Y2gsIGNzc0NsYXNzVG9NYXRjaC50b0xvd2VyQ2FzZSgpLCAnQ2xhc3MgbmFtZSBleHBlY3RlZCB0byBiZSBsb3dlcmNhc2UuJyk7XG4gIGxldCBpID0gMDtcbiAgaWYgKGlzUHJvamVjdGlvbk1vZGUpIHtcbiAgICBmb3IgKDsgaSA8IGF0dHJzLmxlbmd0aCAmJiB0eXBlb2YgYXR0cnNbaV0gPT09ICdzdHJpbmcnOyBpICs9IDIpIHtcbiAgICAgIC8vIFNlYXJjaCBmb3IgYW4gaW1wbGljaXQgYGNsYXNzYCBhdHRyaWJ1dGUgYW5kIGNoZWNrIGlmIGl0cyB2YWx1ZSBtYXRjaGVzIGBjc3NDbGFzc1RvTWF0Y2hgLlxuICAgICAgaWYgKGF0dHJzW2ldID09PSAnY2xhc3MnICYmXG4gICAgICAgICAgY2xhc3NJbmRleE9mKChhdHRyc1tpICsgMV0gYXMgc3RyaW5nKS50b0xvd2VyQ2FzZSgpLCBjc3NDbGFzc1RvTWF0Y2gsIDApICE9PSAtMSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNJbmxpbmVUZW1wbGF0ZSh0Tm9kZSkpIHtcbiAgICAvLyBNYXRjaGluZyBkaXJlY3RpdmVzIChpLmUuIHdoZW4gbm90IG1hdGNoaW5nIGZvciBwcm9qZWN0aW9uIG1vZGUpIHNob3VsZCBub3QgY29uc2lkZXIgdGhlXG4gICAgLy8gY2xhc3MgYmluZGluZ3MgdGhhdCBhcmUgcHJlc2VudCBvbiBpbmxpbmUgdGVtcGxhdGVzLCBhcyB0aG9zZSBjbGFzcyBiaW5kaW5ncyBvbmx5IHRhcmdldFxuICAgIC8vIHRoZSByb290IG5vZGUgb2YgdGhlIHRlbXBsYXRlLCBub3QgdGhlIHRlbXBsYXRlIGl0c2VsZi5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBSZXN1bWUgdGhlIHNlYXJjaCBmb3IgY2xhc3NlcyBhZnRlciB0aGUgYENsYXNzZXNgIG1hcmtlci5cbiAgaSA9IGF0dHJzLmluZGV4T2YoQXR0cmlidXRlTWFya2VyLkNsYXNzZXMsIGkpO1xuICBpZiAoaSA+IC0xKSB7XG4gICAgLy8gV2UgZm91bmQgdGhlIGNsYXNzZXMgc2VjdGlvbi4gU3RhcnQgc2VhcmNoaW5nIGZvciB0aGUgY2xhc3MuXG4gICAgbGV0IGl0ZW06IFRBdHRyaWJ1dGVzW251bWJlcl07XG4gICAgd2hpbGUgKCsraSA8IGF0dHJzLmxlbmd0aCAmJiB0eXBlb2YgKGl0ZW0gPSBhdHRyc1tpXSkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAoaXRlbS50b0xvd2VyQ2FzZSgpID09PSBjc3NDbGFzc1RvTWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDaGVja3Mgd2hldGhlciB0aGUgYHROb2RlYCByZXByZXNlbnRzIGFuIGlubGluZSB0ZW1wbGF0ZSAoZS5nLiBgKm5nRm9yYCkuXG4gKlxuICogQHBhcmFtIHROb2RlIGN1cnJlbnQgVE5vZGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW5saW5lVGVtcGxhdGUodE5vZGU6IFROb2RlKTogYm9vbGVhbiB7XG4gIHJldHVybiB0Tm9kZS50eXBlID09PSBUTm9kZVR5cGUuQ29udGFpbmVyICYmIHROb2RlLnZhbHVlICE9PSBOR19URU1QTEFURV9TRUxFQ1RPUjtcbn1cblxuLyoqXG4gKiBGdW5jdGlvbiB0aGF0IGNoZWNrcyB3aGV0aGVyIGEgZ2l2ZW4gdE5vZGUgbWF0Y2hlcyB0YWctYmFzZWQgc2VsZWN0b3IgYW5kIGhhcyBhIHZhbGlkIHR5cGUuXG4gKlxuICogTWF0Y2hpbmcgY2FuIGJlIHBlcmZvcm1lZCBpbiAyIG1vZGVzOiBwcm9qZWN0aW9uIG1vZGUgKHdoZW4gd2UgcHJvamVjdCBub2RlcykgYW5kIHJlZ3VsYXJcbiAqIGRpcmVjdGl2ZSBtYXRjaGluZyBtb2RlOlxuICogLSBpbiB0aGUgXCJkaXJlY3RpdmUgbWF0Y2hpbmdcIiBtb2RlIHdlIGRvIF9ub3RfIHRha2UgVENvbnRhaW5lcidzIHRhZ05hbWUgaW50byBhY2NvdW50IGlmIGl0IGlzXG4gKiBkaWZmZXJlbnQgZnJvbSBOR19URU1QTEFURV9TRUxFQ1RPUiAodmFsdWUgZGlmZmVyZW50IGZyb20gTkdfVEVNUExBVEVfU0VMRUNUT1IgaW5kaWNhdGVzIHRoYXQgYVxuICogdGFnIG5hbWUgd2FzIGV4dHJhY3RlZCBmcm9tICogc3ludGF4IHNvIHdlIHdvdWxkIG1hdGNoIHRoZSBzYW1lIGRpcmVjdGl2ZSB0d2ljZSk7XG4gKiAtIGluIHRoZSBcInByb2plY3Rpb25cIiBtb2RlLCB3ZSB1c2UgYSB0YWcgbmFtZSBwb3RlbnRpYWxseSBleHRyYWN0ZWQgZnJvbSB0aGUgKiBzeW50YXggcHJvY2Vzc2luZ1xuICogKGFwcGxpY2FibGUgdG8gVE5vZGVUeXBlLkNvbnRhaW5lciBvbmx5KS5cbiAqL1xuZnVuY3Rpb24gaGFzVGFnQW5kVHlwZU1hdGNoKFxuICAgIHROb2RlOiBUTm9kZSwgY3VycmVudFNlbGVjdG9yOiBzdHJpbmcsIGlzUHJvamVjdGlvbk1vZGU6IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgY29uc3QgdGFnTmFtZVRvQ29tcGFyZSA9XG4gICAgICB0Tm9kZS50eXBlID09PSBUTm9kZVR5cGUuQ29udGFpbmVyICYmICFpc1Byb2plY3Rpb25Nb2RlID8gTkdfVEVNUExBVEVfU0VMRUNUT1IgOiB0Tm9kZS52YWx1ZTtcbiAgcmV0dXJuIGN1cnJlbnRTZWxlY3RvciA9PT0gdGFnTmFtZVRvQ29tcGFyZTtcbn1cblxuLyoqXG4gKiBBIHV0aWxpdHkgZnVuY3Rpb24gdG8gbWF0Y2ggYW4gSXZ5IG5vZGUgc3RhdGljIGRhdGEgYWdhaW5zdCBhIHNpbXBsZSBDU1Mgc2VsZWN0b3JcbiAqXG4gKiBAcGFyYW0gdE5vZGUgc3RhdGljIGRhdGEgb2YgdGhlIG5vZGUgdG8gbWF0Y2hcbiAqIEBwYXJhbSBzZWxlY3RvciBUaGUgc2VsZWN0b3IgdG8gdHJ5IG1hdGNoaW5nIGFnYWluc3QgdGhlIG5vZGUuXG4gKiBAcGFyYW0gaXNQcm9qZWN0aW9uTW9kZSBpZiBgdHJ1ZWAgd2UgYXJlIG1hdGNoaW5nIGZvciBjb250ZW50IHByb2plY3Rpb24sIG90aGVyd2lzZSB3ZSBhcmUgZG9pbmdcbiAqIGRpcmVjdGl2ZSBtYXRjaGluZy5cbiAqIEByZXR1cm5zIHRydWUgaWYgbm9kZSBtYXRjaGVzIHRoZSBzZWxlY3Rvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTm9kZU1hdGNoaW5nU2VsZWN0b3IoXG4gICAgdE5vZGU6IFROb2RlLCBzZWxlY3RvcjogQ3NzU2VsZWN0b3IsIGlzUHJvamVjdGlvbk1vZGU6IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgbmdEZXZNb2RlICYmIGFzc2VydERlZmluZWQoc2VsZWN0b3JbMF0sICdTZWxlY3RvciBzaG91bGQgaGF2ZSBhIHRhZyBuYW1lJyk7XG4gIGxldCBtb2RlOiBTZWxlY3RvckZsYWdzID0gU2VsZWN0b3JGbGFncy5FTEVNRU5UO1xuICBjb25zdCBub2RlQXR0cnMgPSB0Tm9kZS5hdHRycztcblxuICAvLyBGaW5kIHRoZSBpbmRleCBvZiBmaXJzdCBhdHRyaWJ1dGUgdGhhdCBoYXMgbm8gdmFsdWUsIG9ubHkgYSBuYW1lLlxuICBjb25zdCBuYW1lT25seU1hcmtlcklkeCA9IG5vZGVBdHRycyAhPT0gbnVsbCA/IGdldE5hbWVPbmx5TWFya2VySW5kZXgobm9kZUF0dHJzKSA6IDA7XG5cbiAgLy8gV2hlbiBwcm9jZXNzaW5nIFwiOm5vdFwiIHNlbGVjdG9ycywgd2Ugc2tpcCB0byB0aGUgbmV4dCBcIjpub3RcIiBpZiB0aGVcbiAgLy8gY3VycmVudCBvbmUgZG9lc24ndCBtYXRjaFxuICBsZXQgc2tpcFRvTmV4dFNlbGVjdG9yID0gZmFsc2U7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3Rvci5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGN1cnJlbnQgPSBzZWxlY3RvcltpXTtcbiAgICBpZiAodHlwZW9mIGN1cnJlbnQgPT09ICdudW1iZXInKSB7XG4gICAgICAvLyBJZiB3ZSBmaW5pc2ggcHJvY2Vzc2luZyBhIDpub3Qgc2VsZWN0b3IgYW5kIGl0IGhhc24ndCBmYWlsZWQsIHJldHVybiBmYWxzZVxuICAgICAgaWYgKCFza2lwVG9OZXh0U2VsZWN0b3IgJiYgIWlzUG9zaXRpdmUobW9kZSkgJiYgIWlzUG9zaXRpdmUoY3VycmVudCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gSWYgd2UgYXJlIHNraXBwaW5nIHRvIHRoZSBuZXh0IDpub3QoKSBhbmQgdGhpcyBtb2RlIGZsYWcgaXMgcG9zaXRpdmUsXG4gICAgICAvLyBpdCdzIGEgcGFydCBvZiB0aGUgY3VycmVudCA6bm90KCkgc2VsZWN0b3IsIGFuZCB3ZSBzaG91bGQga2VlcCBza2lwcGluZ1xuICAgICAgaWYgKHNraXBUb05leHRTZWxlY3RvciAmJiBpc1Bvc2l0aXZlKGN1cnJlbnQpKSBjb250aW51ZTtcbiAgICAgIHNraXBUb05leHRTZWxlY3RvciA9IGZhbHNlO1xuICAgICAgbW9kZSA9IChjdXJyZW50IGFzIG51bWJlcikgfCAobW9kZSAmIFNlbGVjdG9yRmxhZ3MuTk9UKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChza2lwVG9OZXh0U2VsZWN0b3IpIGNvbnRpbnVlO1xuXG4gICAgaWYgKG1vZGUgJiBTZWxlY3RvckZsYWdzLkVMRU1FTlQpIHtcbiAgICAgIG1vZGUgPSBTZWxlY3RvckZsYWdzLkFUVFJJQlVURSB8IG1vZGUgJiBTZWxlY3RvckZsYWdzLk5PVDtcbiAgICAgIGlmIChjdXJyZW50ICE9PSAnJyAmJiAhaGFzVGFnQW5kVHlwZU1hdGNoKHROb2RlLCBjdXJyZW50LCBpc1Byb2plY3Rpb25Nb2RlKSB8fFxuICAgICAgICAgIGN1cnJlbnQgPT09ICcnICYmIHNlbGVjdG9yLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBpZiAoaXNQb3NpdGl2ZShtb2RlKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBza2lwVG9OZXh0U2VsZWN0b3IgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobW9kZSAmIFNlbGVjdG9yRmxhZ3MuQ0xBU1MpIHtcbiAgICAgIGlmIChub2RlQXR0cnMgPT09IG51bGwgfHwgIWlzQ3NzQ2xhc3NNYXRjaGluZyh0Tm9kZSwgbm9kZUF0dHJzLCBjdXJyZW50LCBpc1Byb2plY3Rpb25Nb2RlKSkge1xuICAgICAgICBpZiAoaXNQb3NpdGl2ZShtb2RlKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBza2lwVG9OZXh0U2VsZWN0b3IgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzZWxlY3RvckF0dHJWYWx1ZSA9IHNlbGVjdG9yWysraV07XG4gICAgICBjb25zdCBhdHRySW5kZXhJbk5vZGUgPVxuICAgICAgICAgIGZpbmRBdHRySW5kZXhJbk5vZGUoY3VycmVudCwgbm9kZUF0dHJzLCBpc0lubGluZVRlbXBsYXRlKHROb2RlKSwgaXNQcm9qZWN0aW9uTW9kZSk7XG5cbiAgICAgIGlmIChhdHRySW5kZXhJbk5vZGUgPT09IC0xKSB7XG4gICAgICAgIGlmIChpc1Bvc2l0aXZlKG1vZGUpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHNraXBUb05leHRTZWxlY3RvciA9IHRydWU7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2VsZWN0b3JBdHRyVmFsdWUgIT09ICcnKSB7XG4gICAgICAgIGxldCBub2RlQXR0clZhbHVlOiBzdHJpbmc7XG4gICAgICAgIGlmIChhdHRySW5kZXhJbk5vZGUgPiBuYW1lT25seU1hcmtlcklkeCkge1xuICAgICAgICAgIG5vZGVBdHRyVmFsdWUgPSAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZ0Rldk1vZGUgJiZcbiAgICAgICAgICAgICAgYXNzZXJ0Tm90RXF1YWwoXG4gICAgICAgICAgICAgICAgICBub2RlQXR0cnMhW2F0dHJJbmRleEluTm9kZV0sIEF0dHJpYnV0ZU1hcmtlci5OYW1lc3BhY2VVUkksXG4gICAgICAgICAgICAgICAgICAnV2UgZG8gbm90IG1hdGNoIGRpcmVjdGl2ZXMgb24gbmFtZXNwYWNlZCBhdHRyaWJ1dGVzJyk7XG4gICAgICAgICAgLy8gd2UgbG93ZXJjYXNlIHRoZSBhdHRyaWJ1dGUgdmFsdWUgdG8gYmUgYWJsZSB0byBtYXRjaFxuICAgICAgICAgIC8vIHNlbGVjdG9ycyB3aXRob3V0IGNhc2Utc2Vuc2l0aXZpdHlcbiAgICAgICAgICAvLyAoc2VsZWN0b3JzIGFyZSBhbHJlYWR5IGluIGxvd2VyY2FzZSB3aGVuIGdlbmVyYXRlZClcbiAgICAgICAgICBub2RlQXR0clZhbHVlID0gKG5vZGVBdHRycyFbYXR0ckluZGV4SW5Ob2RlICsgMV0gYXMgc3RyaW5nKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1vZGUgJiBTZWxlY3RvckZsYWdzLkFUVFJJQlVURSAmJiBzZWxlY3RvckF0dHJWYWx1ZSAhPT0gbm9kZUF0dHJWYWx1ZSkge1xuICAgICAgICAgIGlmIChpc1Bvc2l0aXZlKG1vZGUpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgc2tpcFRvTmV4dFNlbGVjdG9yID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpc1Bvc2l0aXZlKG1vZGUpIHx8IHNraXBUb05leHRTZWxlY3Rvcjtcbn1cblxuZnVuY3Rpb24gaXNQb3NpdGl2ZShtb2RlOiBTZWxlY3RvckZsYWdzKTogYm9vbGVhbiB7XG4gIHJldHVybiAobW9kZSAmIFNlbGVjdG9yRmxhZ3MuTk9UKSA9PT0gMDtcbn1cblxuLyoqXG4gKiBFeGFtaW5lcyB0aGUgYXR0cmlidXRlJ3MgZGVmaW5pdGlvbiBhcnJheSBmb3IgYSBub2RlIHRvIGZpbmQgdGhlIGluZGV4IG9mIHRoZVxuICogYXR0cmlidXRlIHRoYXQgbWF0Y2hlcyB0aGUgZ2l2ZW4gYG5hbWVgLlxuICpcbiAqIE5PVEU6IFRoaXMgd2lsbCBub3QgbWF0Y2ggbmFtZXNwYWNlZCBhdHRyaWJ1dGVzLlxuICpcbiAqIEF0dHJpYnV0ZSBtYXRjaGluZyBkZXBlbmRzIHVwb24gYGlzSW5saW5lVGVtcGxhdGVgIGFuZCBgaXNQcm9qZWN0aW9uTW9kZWAuXG4gKiBUaGUgZm9sbG93aW5nIHRhYmxlIHN1bW1hcml6ZXMgd2hpY2ggdHlwZXMgb2YgYXR0cmlidXRlcyB3ZSBhdHRlbXB0IHRvIG1hdGNoOlxuICpcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBNb2RlcyAgICAgICAgICAgICAgICAgICB8IE5vcm1hbCBBdHRyaWJ1dGVzIHwgQmluZGluZ3MgQXR0cmlidXRlcyB8IFRlbXBsYXRlIEF0dHJpYnV0ZXMgfCBJMThuXG4gKiBBdHRyaWJ1dGVzXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogSW5saW5lICsgUHJvamVjdGlvbiAgICAgfCBZRVMgICAgICAgICAgICAgICB8IFlFUyAgICAgICAgICAgICAgICAgfCBOTyAgICAgICAgICAgICAgICAgIHwgWUVTXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogSW5saW5lICsgRGlyZWN0aXZlICAgICAgfCBOTyAgICAgICAgICAgICAgICB8IE5PICAgICAgICAgICAgICAgICAgfCBZRVMgICAgICAgICAgICAgICAgIHwgTk9cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBOb24taW5saW5lICsgUHJvamVjdGlvbiB8IFlFUyAgICAgICAgICAgICAgIHwgWUVTICAgICAgICAgICAgICAgICB8IE5PICAgICAgICAgICAgICAgICAgfCBZRVNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBOb24taW5saW5lICsgRGlyZWN0aXZlICB8IFlFUyAgICAgICAgICAgICAgIHwgWUVTICAgICAgICAgICAgICAgICB8IE5PICAgICAgICAgICAgICAgICAgfCBZRVNcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKlxuICogQHBhcmFtIG5hbWUgdGhlIG5hbWUgb2YgdGhlIGF0dHJpYnV0ZSB0byBmaW5kXG4gKiBAcGFyYW0gYXR0cnMgdGhlIGF0dHJpYnV0ZSBhcnJheSB0byBleGFtaW5lXG4gKiBAcGFyYW0gaXNJbmxpbmVUZW1wbGF0ZSB0cnVlIGlmIHRoZSBub2RlIGJlaW5nIG1hdGNoZWQgaXMgYW4gaW5saW5lIHRlbXBsYXRlIChlLmcuIGAqbmdGb3JgKVxuICogcmF0aGVyIHRoYW4gYSBtYW51YWxseSBleHBhbmRlZCB0ZW1wbGF0ZSBub2RlIChlLmcgYDxuZy10ZW1wbGF0ZT5gKS5cbiAqIEBwYXJhbSBpc1Byb2plY3Rpb25Nb2RlIHRydWUgaWYgd2UgYXJlIG1hdGNoaW5nIGFnYWluc3QgY29udGVudCBwcm9qZWN0aW9uIG90aGVyd2lzZSB3ZSBhcmVcbiAqIG1hdGNoaW5nIGFnYWluc3QgZGlyZWN0aXZlcy5cbiAqL1xuZnVuY3Rpb24gZmluZEF0dHJJbmRleEluTm9kZShcbiAgICBuYW1lOiBzdHJpbmcsIGF0dHJzOiBUQXR0cmlidXRlc3xudWxsLCBpc0lubGluZVRlbXBsYXRlOiBib29sZWFuLFxuICAgIGlzUHJvamVjdGlvbk1vZGU6IGJvb2xlYW4pOiBudW1iZXIge1xuICBpZiAoYXR0cnMgPT09IG51bGwpIHJldHVybiAtMTtcblxuICBsZXQgaSA9IDA7XG5cbiAgaWYgKGlzUHJvamVjdGlvbk1vZGUgfHwgIWlzSW5saW5lVGVtcGxhdGUpIHtcbiAgICBsZXQgYmluZGluZ3NNb2RlID0gZmFsc2U7XG4gICAgd2hpbGUgKGkgPCBhdHRycy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IG1heWJlQXR0ck5hbWUgPSBhdHRyc1tpXTtcbiAgICAgIGlmIChtYXliZUF0dHJOYW1lID09PSBuYW1lKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICBtYXliZUF0dHJOYW1lID09PSBBdHRyaWJ1dGVNYXJrZXIuQmluZGluZ3MgfHwgbWF5YmVBdHRyTmFtZSA9PT0gQXR0cmlidXRlTWFya2VyLkkxOG4pIHtcbiAgICAgICAgYmluZGluZ3NNb2RlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgbWF5YmVBdHRyTmFtZSA9PT0gQXR0cmlidXRlTWFya2VyLkNsYXNzZXMgfHwgbWF5YmVBdHRyTmFtZSA9PT0gQXR0cmlidXRlTWFya2VyLlN0eWxlcykge1xuICAgICAgICBsZXQgdmFsdWUgPSBhdHRyc1srK2ldO1xuICAgICAgICAvLyBXZSBzaG91bGQgc2tpcCBjbGFzc2VzIGhlcmUgYmVjYXVzZSB3ZSBoYXZlIGEgc2VwYXJhdGUgbWVjaGFuaXNtIGZvclxuICAgICAgICAvLyBtYXRjaGluZyBjbGFzc2VzIGluIHByb2plY3Rpb24gbW9kZS5cbiAgICAgICAgd2hpbGUgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB2YWx1ZSA9IGF0dHJzWysraV07XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9IGVsc2UgaWYgKG1heWJlQXR0ck5hbWUgPT09IEF0dHJpYnV0ZU1hcmtlci5UZW1wbGF0ZSkge1xuICAgICAgICAvLyBXZSBkbyBub3QgY2FyZSBhYm91dCBUZW1wbGF0ZSBhdHRyaWJ1dGVzIGluIHRoaXMgc2NlbmFyaW8uXG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIGlmIChtYXliZUF0dHJOYW1lID09PSBBdHRyaWJ1dGVNYXJrZXIuTmFtZXNwYWNlVVJJKSB7XG4gICAgICAgIC8vIFNraXAgdGhlIHdob2xlIG5hbWVzcGFjZWQgYXR0cmlidXRlIGFuZCB2YWx1ZS4gVGhpcyBpcyBieSBkZXNpZ24uXG4gICAgICAgIGkgKz0gNDtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICAvLyBJbiBiaW5kaW5nIG1vZGUgdGhlcmUgYXJlIG9ubHkgbmFtZXMsIHJhdGhlciB0aGFuIG5hbWUtdmFsdWUgcGFpcnMuXG4gICAgICBpICs9IGJpbmRpbmdzTW9kZSA/IDEgOiAyO1xuICAgIH1cbiAgICAvLyBXZSBkaWQgbm90IG1hdGNoIHRoZSBhdHRyaWJ1dGVcbiAgICByZXR1cm4gLTE7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG1hdGNoVGVtcGxhdGVBdHRyaWJ1dGUoYXR0cnMsIG5hbWUpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc05vZGVNYXRjaGluZ1NlbGVjdG9yTGlzdChcbiAgICB0Tm9kZTogVE5vZGUsIHNlbGVjdG9yOiBDc3NTZWxlY3Rvckxpc3QsIGlzUHJvamVjdGlvbk1vZGU6IGJvb2xlYW4gPSBmYWxzZSk6IGJvb2xlYW4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdG9yLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGlzTm9kZU1hdGNoaW5nU2VsZWN0b3IodE5vZGUsIHNlbGVjdG9yW2ldLCBpc1Byb2plY3Rpb25Nb2RlKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvamVjdEFzQXR0clZhbHVlKHROb2RlOiBUTm9kZSk6IENzc1NlbGVjdG9yfG51bGwge1xuICBjb25zdCBub2RlQXR0cnMgPSB0Tm9kZS5hdHRycztcbiAgaWYgKG5vZGVBdHRycyAhPSBudWxsKSB7XG4gICAgY29uc3QgbmdQcm9qZWN0QXNBdHRySWR4ID0gbm9kZUF0dHJzLmluZGV4T2YoQXR0cmlidXRlTWFya2VyLlByb2plY3RBcyk7XG4gICAgLy8gb25seSBjaGVjayBmb3IgbmdQcm9qZWN0QXMgaW4gYXR0cmlidXRlIG5hbWVzLCBkb24ndCBhY2NpZGVudGFsbHkgbWF0Y2ggYXR0cmlidXRlJ3MgdmFsdWVcbiAgICAvLyAoYXR0cmlidXRlIG5hbWVzIGFyZSBzdG9yZWQgYXQgZXZlbiBpbmRleGVzKVxuICAgIGlmICgobmdQcm9qZWN0QXNBdHRySWR4ICYgMSkgPT09IDApIHtcbiAgICAgIHJldHVybiBub2RlQXR0cnNbbmdQcm9qZWN0QXNBdHRySWR4ICsgMV0gYXMgQ3NzU2VsZWN0b3I7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBnZXROYW1lT25seU1hcmtlckluZGV4KG5vZGVBdHRyczogVEF0dHJpYnV0ZXMpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlQXR0cnMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBub2RlQXR0ciA9IG5vZGVBdHRyc1tpXTtcbiAgICBpZiAoaXNOYW1lT25seUF0dHJpYnV0ZU1hcmtlcihub2RlQXR0cikpIHtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbm9kZUF0dHJzLmxlbmd0aDtcbn1cblxuZnVuY3Rpb24gbWF0Y2hUZW1wbGF0ZUF0dHJpYnV0ZShhdHRyczogVEF0dHJpYnV0ZXMsIG5hbWU6IHN0cmluZyk6IG51bWJlciB7XG4gIGxldCBpID0gYXR0cnMuaW5kZXhPZihBdHRyaWJ1dGVNYXJrZXIuVGVtcGxhdGUpO1xuICBpZiAoaSA+IC0xKSB7XG4gICAgaSsrO1xuICAgIHdoaWxlIChpIDwgYXR0cnMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBhdHRyID0gYXR0cnNbaV07XG4gICAgICAvLyBSZXR1cm4gaW4gY2FzZSB3ZSBjaGVja2VkIGFsbCB0ZW1wbGF0ZSBhdHRycyBhbmQgYXJlIHN3aXRjaGluZyB0byB0aGUgbmV4dCBzZWN0aW9uIGluIHRoZVxuICAgICAgLy8gYXR0cnMgYXJyYXkgKHRoYXQgc3RhcnRzIHdpdGggYSBudW1iZXIgdGhhdCByZXByZXNlbnRzIGFuIGF0dHJpYnV0ZSBtYXJrZXIpLlxuICAgICAgaWYgKHR5cGVvZiBhdHRyID09PSAnbnVtYmVyJykgcmV0dXJuIC0xO1xuICAgICAgaWYgKGF0dHIgPT09IG5hbWUpIHJldHVybiBpO1xuICAgICAgaSsrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgYSBzZWxlY3RvciBpcyBpbnNpZGUgYSBDc3NTZWxlY3Rvckxpc3RcbiAqIEBwYXJhbSBzZWxlY3RvciBTZWxlY3RvciB0byBiZSBjaGVja2VkLlxuICogQHBhcmFtIGxpc3QgTGlzdCBpbiB3aGljaCB0byBsb29rIGZvciB0aGUgc2VsZWN0b3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1NlbGVjdG9ySW5TZWxlY3Rvckxpc3Qoc2VsZWN0b3I6IENzc1NlbGVjdG9yLCBsaXN0OiBDc3NTZWxlY3Rvckxpc3QpOiBib29sZWFuIHtcbiAgc2VsZWN0b3JMaXN0TG9vcDogZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY3VycmVudFNlbGVjdG9ySW5MaXN0ID0gbGlzdFtpXTtcbiAgICBpZiAoc2VsZWN0b3IubGVuZ3RoICE9PSBjdXJyZW50U2VsZWN0b3JJbkxpc3QubGVuZ3RoKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBzZWxlY3Rvci5sZW5ndGg7IGorKykge1xuICAgICAgaWYgKHNlbGVjdG9yW2pdICE9PSBjdXJyZW50U2VsZWN0b3JJbkxpc3Rbal0pIHtcbiAgICAgICAgY29udGludWUgc2VsZWN0b3JMaXN0TG9vcDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBtYXliZVdyYXBJbk5vdFNlbGVjdG9yKGlzTmVnYXRpdmVNb2RlOiBib29sZWFuLCBjaHVuazogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGlzTmVnYXRpdmVNb2RlID8gJzpub3QoJyArIGNodW5rLnRyaW0oKSArICcpJyA6IGNodW5rO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnlDU1NTZWxlY3RvcihzZWxlY3RvcjogQ3NzU2VsZWN0b3IpOiBzdHJpbmcge1xuICBsZXQgcmVzdWx0ID0gc2VsZWN0b3JbMF0gYXMgc3RyaW5nO1xuICBsZXQgaSA9IDE7XG4gIGxldCBtb2RlID0gU2VsZWN0b3JGbGFncy5BVFRSSUJVVEU7XG4gIGxldCBjdXJyZW50Q2h1bmsgPSAnJztcbiAgbGV0IGlzTmVnYXRpdmVNb2RlID0gZmFsc2U7XG4gIHdoaWxlIChpIDwgc2VsZWN0b3IubGVuZ3RoKSB7XG4gICAgbGV0IHZhbHVlT3JNYXJrZXIgPSBzZWxlY3RvcltpXTtcbiAgICBpZiAodHlwZW9mIHZhbHVlT3JNYXJrZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAobW9kZSAmIFNlbGVjdG9yRmxhZ3MuQVRUUklCVVRFKSB7XG4gICAgICAgIGNvbnN0IGF0dHJWYWx1ZSA9IHNlbGVjdG9yWysraV0gYXMgc3RyaW5nO1xuICAgICAgICBjdXJyZW50Q2h1bmsgKz1cbiAgICAgICAgICAgICdbJyArIHZhbHVlT3JNYXJrZXIgKyAoYXR0clZhbHVlLmxlbmd0aCA+IDAgPyAnPVwiJyArIGF0dHJWYWx1ZSArICdcIicgOiAnJykgKyAnXSc7XG4gICAgICB9IGVsc2UgaWYgKG1vZGUgJiBTZWxlY3RvckZsYWdzLkNMQVNTKSB7XG4gICAgICAgIGN1cnJlbnRDaHVuayArPSAnLicgKyB2YWx1ZU9yTWFya2VyO1xuICAgICAgfSBlbHNlIGlmIChtb2RlICYgU2VsZWN0b3JGbGFncy5FTEVNRU5UKSB7XG4gICAgICAgIGN1cnJlbnRDaHVuayArPSAnICcgKyB2YWx1ZU9yTWFya2VyO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvL1xuICAgICAgLy8gQXBwZW5kIGN1cnJlbnQgY2h1bmsgdG8gdGhlIGZpbmFsIHJlc3VsdCBpbiBjYXNlIHdlIGNvbWUgYWNyb3NzIFNlbGVjdG9yRmxhZywgd2hpY2hcbiAgICAgIC8vIGluZGljYXRlcyB0aGF0IHRoZSBwcmV2aW91cyBzZWN0aW9uIG9mIGEgc2VsZWN0b3IgaXMgb3Zlci4gV2UgbmVlZCB0byBhY2N1bXVsYXRlIGNvbnRlbnRcbiAgICAgIC8vIGJldHdlZW4gZmxhZ3MgdG8gbWFrZSBzdXJlIHdlIHdyYXAgdGhlIGNodW5rIGxhdGVyIGluIDpub3QoKSBzZWxlY3RvciBpZiBuZWVkZWQsIGUuZy5cbiAgICAgIC8vIGBgYFxuICAgICAgLy8gIFsnJywgRmxhZ3MuQ0xBU1MsICcuY2xhc3NBJywgRmxhZ3MuQ0xBU1MgfCBGbGFncy5OT1QsICcuY2xhc3NCJywgJy5jbGFzc0MnXVxuICAgICAgLy8gYGBgXG4gICAgICAvLyBzaG91bGQgYmUgdHJhbnNmb3JtZWQgdG8gYC5jbGFzc0EgOm5vdCguY2xhc3NCIC5jbGFzc0MpYC5cbiAgICAgIC8vXG4gICAgICAvLyBOb3RlOiBmb3IgbmVnYXRpdmUgc2VsZWN0b3IgcGFydCwgd2UgYWNjdW11bGF0ZSBjb250ZW50IGJldHdlZW4gZmxhZ3MgdW50aWwgd2UgZmluZCB0aGVcbiAgICAgIC8vIG5leHQgbmVnYXRpdmUgZmxhZy4gVGhpcyBpcyBuZWVkZWQgdG8gc3VwcG9ydCBhIGNhc2Ugd2hlcmUgYDpub3QoKWAgcnVsZSBjb250YWlucyBtb3JlIHRoYW5cbiAgICAgIC8vIG9uZSBjaHVuaywgZS5nLiB0aGUgZm9sbG93aW5nIHNlbGVjdG9yOlxuICAgICAgLy8gYGBgXG4gICAgICAvLyAgWycnLCBGbGFncy5FTEVNRU5UIHwgRmxhZ3MuTk9ULCAncCcsIEZsYWdzLkNMQVNTLCAnZm9vJywgRmxhZ3MuQ0xBU1MgfCBGbGFncy5OT1QsICdiYXInXVxuICAgICAgLy8gYGBgXG4gICAgICAvLyBzaG91bGQgYmUgc3RyaW5naWZpZWQgdG8gYDpub3QocC5mb28pIDpub3QoLmJhcilgXG4gICAgICAvL1xuICAgICAgaWYgKGN1cnJlbnRDaHVuayAhPT0gJycgJiYgIWlzUG9zaXRpdmUodmFsdWVPck1hcmtlcikpIHtcbiAgICAgICAgcmVzdWx0ICs9IG1heWJlV3JhcEluTm90U2VsZWN0b3IoaXNOZWdhdGl2ZU1vZGUsIGN1cnJlbnRDaHVuayk7XG4gICAgICAgIGN1cnJlbnRDaHVuayA9ICcnO1xuICAgICAgfVxuICAgICAgbW9kZSA9IHZhbHVlT3JNYXJrZXI7XG4gICAgICAvLyBBY2NvcmRpbmcgdG8gQ3NzU2VsZWN0b3Igc3BlYywgb25jZSB3ZSBjb21lIGFjcm9zcyBgU2VsZWN0b3JGbGFncy5OT1RgIGZsYWcsIHRoZSBuZWdhdGl2ZVxuICAgICAgLy8gbW9kZSBpcyBtYWludGFpbmVkIGZvciByZW1haW5pbmcgY2h1bmtzIG9mIGEgc2VsZWN0b3IuXG4gICAgICBpc05lZ2F0aXZlTW9kZSA9IGlzTmVnYXRpdmVNb2RlIHx8ICFpc1Bvc2l0aXZlKG1vZGUpO1xuICAgIH1cbiAgICBpKys7XG4gIH1cbiAgaWYgKGN1cnJlbnRDaHVuayAhPT0gJycpIHtcbiAgICByZXN1bHQgKz0gbWF5YmVXcmFwSW5Ob3RTZWxlY3Rvcihpc05lZ2F0aXZlTW9kZSwgY3VycmVudENodW5rKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEdlbmVyYXRlcyBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgQ1NTIHNlbGVjdG9yIGluIHBhcnNlZCBmb3JtLlxuICpcbiAqIENvbXBvbmVudERlZiBhbmQgRGlyZWN0aXZlRGVmIGFyZSBnZW5lcmF0ZWQgd2l0aCB0aGUgc2VsZWN0b3IgaW4gcGFyc2VkIGZvcm0gdG8gYXZvaWQgZG9pbmdcbiAqIGFkZGl0aW9uYWwgcGFyc2luZyBhdCBydW50aW1lIChmb3IgZXhhbXBsZSwgZm9yIGRpcmVjdGl2ZSBtYXRjaGluZykuIEhvd2V2ZXIgaW4gc29tZSBjYXNlcyAoZm9yXG4gKiBleGFtcGxlLCB3aGlsZSBib290c3RyYXBwaW5nIGEgY29tcG9uZW50KSwgYSBzdHJpbmcgdmVyc2lvbiBvZiB0aGUgc2VsZWN0b3IgaXMgcmVxdWlyZWQgdG8gcXVlcnlcbiAqIGZvciB0aGUgaG9zdCBlbGVtZW50IG9uIHRoZSBwYWdlLiBUaGlzIGZ1bmN0aW9uIHRha2VzIHRoZSBwYXJzZWQgZm9ybSBvZiBhIHNlbGVjdG9yIGFuZCByZXR1cm5zXG4gKiBpdHMgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICpcbiAqIEBwYXJhbSBzZWxlY3Rvckxpc3Qgc2VsZWN0b3IgaW4gcGFyc2VkIGZvcm1cbiAqIEByZXR1cm5zIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIGdpdmVuIHNlbGVjdG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlDU1NTZWxlY3Rvckxpc3Qoc2VsZWN0b3JMaXN0OiBDc3NTZWxlY3Rvckxpc3QpOiBzdHJpbmcge1xuICByZXR1cm4gc2VsZWN0b3JMaXN0Lm1hcChzdHJpbmdpZnlDU1NTZWxlY3Rvcikuam9pbignLCcpO1xufVxuXG4vKipcbiAqIEV4dHJhY3RzIGF0dHJpYnV0ZXMgYW5kIGNsYXNzZXMgaW5mb3JtYXRpb24gZnJvbSBhIGdpdmVuIENTUyBzZWxlY3Rvci5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgd2hpbGUgY3JlYXRpbmcgYSBjb21wb25lbnQgZHluYW1pY2FsbHkuIEluIHRoaXMgY2FzZSwgdGhlIGhvc3QgZWxlbWVudFxuICogKHRoYXQgaXMgY3JlYXRlZCBkeW5hbWljYWxseSkgc2hvdWxkIGNvbnRhaW4gYXR0cmlidXRlcyBhbmQgY2xhc3NlcyBzcGVjaWZpZWQgaW4gY29tcG9uZW50J3MgQ1NTXG4gKiBzZWxlY3Rvci5cbiAqXG4gKiBAcGFyYW0gc2VsZWN0b3IgQ1NTIHNlbGVjdG9yIGluIHBhcnNlZCBmb3JtIChpbiBhIGZvcm0gb2YgYXJyYXkpXG4gKiBAcmV0dXJucyBvYmplY3Qgd2l0aCBgYXR0cnNgIGFuZCBgY2xhc3Nlc2AgZmllbGRzIHRoYXQgY29udGFpbiBleHRyYWN0ZWQgaW5mb3JtYXRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RBdHRyc0FuZENsYXNzZXNGcm9tU2VsZWN0b3Ioc2VsZWN0b3I6IENzc1NlbGVjdG9yKTpcbiAgICB7YXR0cnM6IHN0cmluZ1tdLCBjbGFzc2VzOiBzdHJpbmdbXX0ge1xuICBjb25zdCBhdHRyczogc3RyaW5nW10gPSBbXTtcbiAgY29uc3QgY2xhc3Nlczogc3RyaW5nW10gPSBbXTtcbiAgbGV0IGkgPSAxO1xuICBsZXQgbW9kZSA9IFNlbGVjdG9yRmxhZ3MuQVRUUklCVVRFO1xuICB3aGlsZSAoaSA8IHNlbGVjdG9yLmxlbmd0aCkge1xuICAgIGxldCB2YWx1ZU9yTWFya2VyID0gc2VsZWN0b3JbaV07XG4gICAgaWYgKHR5cGVvZiB2YWx1ZU9yTWFya2VyID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKG1vZGUgPT09IFNlbGVjdG9yRmxhZ3MuQVRUUklCVVRFKSB7XG4gICAgICAgIGlmICh2YWx1ZU9yTWFya2VyICE9PSAnJykge1xuICAgICAgICAgIGF0dHJzLnB1c2godmFsdWVPck1hcmtlciwgc2VsZWN0b3JbKytpXSBhcyBzdHJpbmcpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG1vZGUgPT09IFNlbGVjdG9yRmxhZ3MuQ0xBU1MpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKHZhbHVlT3JNYXJrZXIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBBY2NvcmRpbmcgdG8gQ3NzU2VsZWN0b3Igc3BlYywgb25jZSB3ZSBjb21lIGFjcm9zcyBgU2VsZWN0b3JGbGFncy5OT1RgIGZsYWcsIHRoZSBuZWdhdGl2ZVxuICAgICAgLy8gbW9kZSBpcyBtYWludGFpbmVkIGZvciByZW1haW5pbmcgY2h1bmtzIG9mIGEgc2VsZWN0b3IuIFNpbmNlIGF0dHJpYnV0ZXMgYW5kIGNsYXNzZXMgYXJlXG4gICAgICAvLyBleHRyYWN0ZWQgb25seSBmb3IgXCJwb3NpdGl2ZVwiIHBhcnQgb2YgdGhlIHNlbGVjdG9yLCB3ZSBjYW4gc3RvcCBoZXJlLlxuICAgICAgaWYgKCFpc1Bvc2l0aXZlKG1vZGUpKSBicmVhaztcbiAgICAgIG1vZGUgPSB2YWx1ZU9yTWFya2VyO1xuICAgIH1cbiAgICBpKys7XG4gIH1cbiAgcmV0dXJuIHthdHRycywgY2xhc3Nlc307XG59XG4iXX0=