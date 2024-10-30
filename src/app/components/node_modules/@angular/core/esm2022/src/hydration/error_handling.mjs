/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { RuntimeError } from '../errors';
import { getDeclarationComponentDef } from '../render3/instructions/element_validation';
import { HOST, TVIEW } from '../render3/interfaces/view';
import { getParentRElement } from '../render3/node_manipulation';
import { unwrapRNode } from '../render3/util/view_utils';
import { markRNodeAsHavingHydrationMismatch } from './utils';
const AT_THIS_LOCATION = '<-- AT THIS LOCATION';
/**
 * Retrieves a user friendly string for a given TNodeType for use in
 * friendly error messages
 *
 * @param tNodeType
 * @returns
 */
function getFriendlyStringFromTNodeType(tNodeType) {
    switch (tNodeType) {
        case 4 /* TNodeType.Container */:
            return 'view container';
        case 2 /* TNodeType.Element */:
            return 'element';
        case 8 /* TNodeType.ElementContainer */:
            return 'ng-container';
        case 32 /* TNodeType.Icu */:
            return 'icu';
        case 64 /* TNodeType.Placeholder */:
            return 'i18n';
        case 16 /* TNodeType.Projection */:
            return 'projection';
        case 1 /* TNodeType.Text */:
            return 'text';
        default:
            // This should not happen as we cover all possible TNode types above.
            return '<unknown>';
    }
}
/**
 * Validates that provided nodes match during the hydration process.
 */
export function validateMatchingNode(node, nodeType, tagName, lView, tNode, isViewContainerAnchor = false) {
    if (!node ||
        (node.nodeType !== nodeType ||
            (node.nodeType === Node.ELEMENT_NODE &&
                node.tagName.toLowerCase() !== tagName?.toLowerCase()))) {
        const expectedNode = shortRNodeDescription(nodeType, tagName, null);
        let header = `During hydration Angular expected ${expectedNode} but `;
        const hostComponentDef = getDeclarationComponentDef(lView);
        const componentClassName = hostComponentDef?.type?.name;
        const expectedDom = describeExpectedDom(lView, tNode, isViewContainerAnchor);
        const expected = `Angular expected this DOM:\n\n${expectedDom}\n\n`;
        let actual = '';
        const componentHostElement = unwrapRNode(lView[HOST]);
        if (!node) {
            // No node found during hydration.
            header += `the node was not found.\n\n`;
            // Since the node is missing, we use the closest node to attach the error to
            markRNodeAsHavingHydrationMismatch(componentHostElement, expectedDom);
        }
        else {
            const actualNode = shortRNodeDescription(node.nodeType, node.tagName ?? null, node.textContent ?? null);
            header += `found ${actualNode}.\n\n`;
            const actualDom = describeDomFromNode(node);
            actual = `Actual DOM is:\n\n${actualDom}\n\n`;
            // DevTools only report hydration issues on the component level, so we attach extra debug
            // info to a component host element to make it available to DevTools.
            markRNodeAsHavingHydrationMismatch(componentHostElement, expectedDom, actualDom);
        }
        const footer = getHydrationErrorFooter(componentClassName);
        const message = header + expected + actual + getHydrationAttributeNote() + footer;
        throw new RuntimeError(-500 /* RuntimeErrorCode.HYDRATION_NODE_MISMATCH */, message);
    }
}
/**
 * Validates that a given node has sibling nodes
 */
export function validateSiblingNodeExists(node) {
    validateNodeExists(node);
    if (!node.nextSibling) {
        const header = 'During hydration Angular expected more sibling nodes to be present.\n\n';
        const actual = `Actual DOM is:\n\n${describeDomFromNode(node)}\n\n`;
        const footer = getHydrationErrorFooter();
        const message = header + actual + footer;
        markRNodeAsHavingHydrationMismatch(node, '', actual);
        throw new RuntimeError(-501 /* RuntimeErrorCode.HYDRATION_MISSING_SIBLINGS */, message);
    }
}
/**
 * Validates that a node exists or throws
 */
export function validateNodeExists(node, lView = null, tNode = null) {
    if (!node) {
        const header = 'During hydration, Angular expected an element to be present at this location.\n\n';
        let expected = '';
        let footer = '';
        if (lView !== null && tNode !== null) {
            expected = describeExpectedDom(lView, tNode, false);
            footer = getHydrationErrorFooter();
            // Since the node is missing, we use the closest node to attach the error to
            markRNodeAsHavingHydrationMismatch(unwrapRNode(lView[HOST]), expected, '');
        }
        throw new RuntimeError(-502 /* RuntimeErrorCode.HYDRATION_MISSING_NODE */, `${header}${expected}\n\n${footer}`);
    }
}
/**
 * Builds the hydration error message when a node is not found
 *
 * @param lView the LView where the node exists
 * @param tNode the TNode
 */
export function nodeNotFoundError(lView, tNode) {
    const header = 'During serialization, Angular was unable to find an element in the DOM:\n\n';
    const expected = `${describeExpectedDom(lView, tNode, false)}\n\n`;
    const footer = getHydrationErrorFooter();
    throw new RuntimeError(-502 /* RuntimeErrorCode.HYDRATION_MISSING_NODE */, header + expected + footer);
}
/**
 * Builds a hydration error message when a node is not found at a path location
 *
 * @param host the Host Node
 * @param path the path to the node
 */
export function nodeNotFoundAtPathError(host, path) {
    const header = `During hydration Angular was unable to locate a node ` +
        `using the "${path}" path, starting from the ${describeRNode(host)} node.\n\n`;
    const footer = getHydrationErrorFooter();
    markRNodeAsHavingHydrationMismatch(host);
    throw new RuntimeError(-502 /* RuntimeErrorCode.HYDRATION_MISSING_NODE */, header + footer);
}
/**
 * Builds the hydration error message in the case that dom nodes are created outside of
 * the Angular context and are being used as projected nodes
 *
 * @param lView the LView
 * @param tNode the TNode
 * @returns an error
 */
export function unsupportedProjectionOfDomNodes(rNode) {
    const header = 'During serialization, Angular detected DOM nodes ' +
        'that were created outside of Angular context and provided as projectable nodes ' +
        '(likely via `ViewContainerRef.createComponent` or `createComponent` APIs). ' +
        'Hydration is not supported for such cases, consider refactoring the code to avoid ' +
        'this pattern or using `ngSkipHydration` on the host element of the component.\n\n';
    const actual = `${describeDomFromNode(rNode)}\n\n`;
    const message = header + actual + getHydrationAttributeNote();
    return new RuntimeError(-503 /* RuntimeErrorCode.UNSUPPORTED_PROJECTION_DOM_NODES */, message);
}
/**
 * Builds the hydration error message in the case that ngSkipHydration was used on a
 * node that is not a component host element or host binding
 *
 * @param rNode the HTML Element
 * @returns an error
 */
export function invalidSkipHydrationHost(rNode) {
    const header = 'The `ngSkipHydration` flag is applied on a node ' +
        'that doesn\'t act as a component host. Hydration can be ' +
        'skipped only on per-component basis.\n\n';
    const actual = `${describeDomFromNode(rNode)}\n\n`;
    const footer = 'Please move the `ngSkipHydration` attribute to the component host element.\n\n';
    const message = header + actual + footer;
    return new RuntimeError(-504 /* RuntimeErrorCode.INVALID_SKIP_HYDRATION_HOST */, message);
}
// Stringification methods
/**
 * Stringifies a given TNode's attributes
 *
 * @param tNode a provided TNode
 * @returns string
 */
function stringifyTNodeAttrs(tNode) {
    const results = [];
    if (tNode.attrs) {
        for (let i = 0; i < tNode.attrs.length;) {
            const attrName = tNode.attrs[i++];
            // Once we reach the first flag, we know that the list of
            // attributes is over.
            if (typeof attrName == 'number') {
                break;
            }
            const attrValue = tNode.attrs[i++];
            results.push(`${attrName}="${shorten(attrValue)}"`);
        }
    }
    return results.join(' ');
}
/**
 * The list of internal attributes that should be filtered out while
 * producing an error message.
 */
const internalAttrs = new Set(['ngh', 'ng-version', 'ng-server-context']);
/**
 * Stringifies an HTML Element's attributes
 *
 * @param rNode an HTML Element
 * @returns string
 */
function stringifyRNodeAttrs(rNode) {
    const results = [];
    for (let i = 0; i < rNode.attributes.length; i++) {
        const attr = rNode.attributes[i];
        if (internalAttrs.has(attr.name))
            continue;
        results.push(`${attr.name}="${shorten(attr.value)}"`);
    }
    return results.join(' ');
}
// Methods for Describing the DOM
/**
 * Converts a tNode to a helpful readable string value for use in error messages
 *
 * @param tNode a given TNode
 * @param innerContent the content of the node
 * @returns string
 */
function describeTNode(tNode, innerContent = '…') {
    switch (tNode.type) {
        case 1 /* TNodeType.Text */:
            const content = tNode.value ? `(${tNode.value})` : '';
            return `#text${content}`;
        case 2 /* TNodeType.Element */:
            const attrs = stringifyTNodeAttrs(tNode);
            const tag = tNode.value.toLowerCase();
            return `<${tag}${attrs ? ' ' + attrs : ''}>${innerContent}</${tag}>`;
        case 8 /* TNodeType.ElementContainer */:
            return '<!-- ng-container -->';
        case 4 /* TNodeType.Container */:
            return '<!-- container -->';
        default:
            const typeAsString = getFriendlyStringFromTNodeType(tNode.type);
            return `#node(${typeAsString})`;
    }
}
/**
 * Converts an RNode to a helpful readable string value for use in error messages
 *
 * @param rNode a given RNode
 * @param innerContent the content of the node
 * @returns string
 */
function describeRNode(rNode, innerContent = '…') {
    const node = rNode;
    switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            const tag = node.tagName.toLowerCase();
            const attrs = stringifyRNodeAttrs(node);
            return `<${tag}${attrs ? ' ' + attrs : ''}>${innerContent}</${tag}>`;
        case Node.TEXT_NODE:
            const content = node.textContent ? shorten(node.textContent) : '';
            return `#text${content ? `(${content})` : ''}`;
        case Node.COMMENT_NODE:
            return `<!-- ${shorten(node.textContent ?? '')} -->`;
        default:
            return `#node(${node.nodeType})`;
    }
}
/**
 * Builds the string containing the expected DOM present given the LView and TNode
 * values for a readable error message
 *
 * @param lView the lView containing the DOM
 * @param tNode the tNode
 * @param isViewContainerAnchor boolean
 * @returns string
 */
function describeExpectedDom(lView, tNode, isViewContainerAnchor) {
    const spacer = '  ';
    let content = '';
    if (tNode.prev) {
        content += spacer + '…\n';
        content += spacer + describeTNode(tNode.prev) + '\n';
    }
    else if (tNode.type && tNode.type & 12 /* TNodeType.AnyContainer */) {
        content += spacer + '…\n';
    }
    if (isViewContainerAnchor) {
        content += spacer + describeTNode(tNode) + '\n';
        content += spacer + `<!-- container -->  ${AT_THIS_LOCATION}\n`;
    }
    else {
        content += spacer + describeTNode(tNode) + `  ${AT_THIS_LOCATION}\n`;
    }
    content += spacer + '…\n';
    const parentRNode = tNode.type ? getParentRElement(lView[TVIEW], tNode, lView) : null;
    if (parentRNode) {
        content = describeRNode(parentRNode, '\n' + content);
    }
    return content;
}
/**
 * Builds the string containing the DOM present around a given RNode for a
 * readable error message
 *
 * @param node the RNode
 * @returns string
 */
function describeDomFromNode(node) {
    const spacer = '  ';
    let content = '';
    const currentNode = node;
    if (currentNode.previousSibling) {
        content += spacer + '…\n';
        content += spacer + describeRNode(currentNode.previousSibling) + '\n';
    }
    content += spacer + describeRNode(currentNode) + `  ${AT_THIS_LOCATION}\n`;
    if (node.nextSibling) {
        content += spacer + '…\n';
    }
    if (node.parentNode) {
        content = describeRNode(currentNode.parentNode, '\n' + content);
    }
    return content;
}
/**
 * Shortens the description of a given RNode by its type for readability
 *
 * @param nodeType the type of node
 * @param tagName the node tag name
 * @param textContent the text content in the node
 * @returns string
 */
function shortRNodeDescription(nodeType, tagName, textContent) {
    switch (nodeType) {
        case Node.ELEMENT_NODE:
            return `<${tagName.toLowerCase()}>`;
        case Node.TEXT_NODE:
            const content = textContent ? ` (with the "${shorten(textContent)}" content)` : '';
            return `a text node${content}`;
        case Node.COMMENT_NODE:
            return 'a comment node';
        default:
            return `#node(nodeType=${nodeType})`;
    }
}
/**
 * Builds the footer hydration error message
 *
 * @param componentClassName the name of the component class
 * @returns string
 */
function getHydrationErrorFooter(componentClassName) {
    const componentInfo = componentClassName ? `the "${componentClassName}"` : 'corresponding';
    return `To fix this problem:\n` +
        `  * check ${componentInfo} component for hydration-related issues\n` +
        `  * check to see if your template has valid HTML structure\n` +
        `  * or skip hydration by adding the \`ngSkipHydration\` attribute ` +
        `to its host node in a template\n\n`;
}
/**
 * An attribute related note for hydration errors
 */
function getHydrationAttributeNote() {
    return 'Note: attributes are only displayed to better represent the DOM' +
        ' but have no effect on hydration mismatches.\n\n';
}
// Node string utility functions
/**
 * Strips all newlines out of a given string
 *
 * @param input a string to be cleared of new line characters
 * @returns
 */
function stripNewlines(input) {
    return input.replace(/\s+/gm, '');
}
/**
 * Reduces a string down to a maximum length of characters with ellipsis for readability
 *
 * @param input a string input
 * @param maxLength a maximum length in characters
 * @returns string
 */
function shorten(input, maxLength = 50) {
    if (!input) {
        return '';
    }
    input = stripNewlines(input);
    return input.length > maxLength ? `${input.substring(0, maxLength - 1)}…` : input;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JfaGFuZGxpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9oeWRyYXRpb24vZXJyb3JfaGFuZGxpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBbUIsTUFBTSxXQUFXLENBQUM7QUFDekQsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFHdEYsT0FBTyxFQUFDLElBQUksRUFBUyxLQUFLLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFFdkQsT0FBTyxFQUFDLGtDQUFrQyxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBRTNELE1BQU0sZ0JBQWdCLEdBQUcsc0JBQXNCLENBQUM7QUFFaEQ7Ozs7OztHQU1HO0FBQ0gsU0FBUyw4QkFBOEIsQ0FBQyxTQUFvQjtJQUMxRCxRQUFRLFNBQVMsRUFBRSxDQUFDO1FBQ2xCO1lBQ0UsT0FBTyxnQkFBZ0IsQ0FBQztRQUMxQjtZQUNFLE9BQU8sU0FBUyxDQUFDO1FBQ25CO1lBQ0UsT0FBTyxjQUFjLENBQUM7UUFDeEI7WUFDRSxPQUFPLEtBQUssQ0FBQztRQUNmO1lBQ0UsT0FBTyxNQUFNLENBQUM7UUFDaEI7WUFDRSxPQUFPLFlBQVksQ0FBQztRQUN0QjtZQUNFLE9BQU8sTUFBTSxDQUFDO1FBQ2hCO1lBQ0UscUVBQXFFO1lBQ3JFLE9BQU8sV0FBVyxDQUFDO0lBQ3ZCLENBQUM7QUFDSCxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLFVBQVUsb0JBQW9CLENBQ2hDLElBQWdCLEVBQUUsUUFBZ0IsRUFBRSxPQUFvQixFQUFFLEtBQVksRUFBRSxLQUFZLEVBQ3BGLHFCQUFxQixHQUFHLEtB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QyxPQUFPLGlFQUFpRTtRQUNwRSxrREFBa0QsQ0FBQztBQUN6RCxDQUFDO0FBRUQsZ0NBQWdDO0FBRWhDOzs7OztHQUtHO0FBQ0gsU0FBUyxhQUFhLENBQUMsS0FBYTtJQUNsQyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxTQUFTLE9BQU8sQ0FBQyxLQUFrQixFQUFFLFNBQVMsR0FBRyxFQUFFO0lBQ2pELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNYLE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUNELEtBQUssR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsT0FBTyxLQUFLLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxTQUFTLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ3BGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtSdW50aW1lRXJyb3IsIFJ1bnRpbWVFcnJvckNvZGV9IGZyb20gJy4uL2Vycm9ycyc7XG5pbXBvcnQge2dldERlY2xhcmF0aW9uQ29tcG9uZW50RGVmfSBmcm9tICcuLi9yZW5kZXIzL2luc3RydWN0aW9ucy9lbGVtZW50X3ZhbGlkYXRpb24nO1xuaW1wb3J0IHtUTm9kZSwgVE5vZGVUeXBlfSBmcm9tICcuLi9yZW5kZXIzL2ludGVyZmFjZXMvbm9kZSc7XG5pbXBvcnQge1JOb2RlfSBmcm9tICcuLi9yZW5kZXIzL2ludGVyZmFjZXMvcmVuZGVyZXJfZG9tJztcbmltcG9ydCB7SE9TVCwgTFZpZXcsIFRWSUVXfSBmcm9tICcuLi9yZW5kZXIzL2ludGVyZmFjZXMvdmlldyc7XG5pbXBvcnQge2dldFBhcmVudFJFbGVtZW50fSBmcm9tICcuLi9yZW5kZXIzL25vZGVfbWFuaXB1bGF0aW9uJztcbmltcG9ydCB7dW53cmFwUk5vZGV9IGZyb20gJy4uL3JlbmRlcjMvdXRpbC92aWV3X3V0aWxzJztcblxuaW1wb3J0IHttYXJrUk5vZGVBc0hhdmluZ0h5ZHJhdGlvbk1pc21hdGNofSBmcm9tICcuL3V0aWxzJztcblxuY29uc3QgQVRfVEhJU19MT0NBVElPTiA9ICc8LS0gQVQgVEhJUyBMT0NBVElPTic7XG5cbi8qKlxuICogUmV0cmlldmVzIGEgdXNlciBmcmllbmRseSBzdHJpbmcgZm9yIGEgZ2l2ZW4gVE5vZGVUeXBlIGZvciB1c2UgaW5cbiAqIGZyaWVuZGx5IGVycm9yIG1lc3NhZ2VzXG4gKlxuICogQHBhcmFtIHROb2RlVHlwZVxuICogQHJldHVybnNcbiAqL1xuZnVuY3Rpb24gZ2V0RnJpZW5kbHlTdHJpbmdGcm9tVE5vZGVUeXBlKHROb2RlVHlwZTogVE5vZGVUeXBlKTogc3RyaW5nIHtcbiAgc3dpdGNoICh0Tm9kZVR5cGUpIHtcbiAgICBjYXNlIFROb2RlVHlwZS5Db250YWluZXI6XG4gICAgICByZXR1cm4gJ3ZpZXcgY29udGFpbmVyJztcbiAgICBjYXNlIFROb2RlVHlwZS5FbGVtZW50OlxuICAgICAgcmV0dXJuICdlbGVtZW50JztcbiAgICBjYXNlIFROb2RlVHlwZS5FbGVtZW50Q29udGFpbmVyOlxuICAgICAgcmV0dXJuICduZy1jb250YWluZXInO1xuICAgIGNhc2UgVE5vZGVUeXBlLkljdTpcbiAgICAgIHJldHVybiAnaWN1JztcbiAgICBjYXNlIFROb2RlVHlwZS5QbGFjZWhvbGRlcjpcbiAgICAgIHJldHVybiAnaTE4bic7XG4gICAgY2FzZSBUTm9kZVR5cGUuUHJvamVjdGlvbjpcbiAgICAgIHJldHVybiAncHJvamVjdGlvbic7XG4gICAgY2FzZSBUTm9kZVR5cGUuVGV4dDpcbiAgICAgIHJldHVybiAndGV4dCc7XG4gICAgZGVmYXVsdDpcbiAgICAgIC8vIFRoaXMgc2hvdWxkIG5vdCBoYXBwZW4gYXMgd2UgY292ZXIgYWxsIHBvc3NpYmxlIFROb2RlIHR5cGVzIGFib3ZlLlxuICAgICAgcmV0dXJuICc8dW5rbm93bj4nO1xuICB9XG59XG5cbi8qKlxuICogVmFsaWRhdGVzIHRoYXQgcHJvdmlkZWQgbm9kZXMgbWF0Y2ggZHVyaW5nIHRoZSBoeWRyYXRpb24gcHJvY2Vzcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlTWF0Y2hpbmdOb2RlKFxuICAgIG5vZGU6IFJOb2RlfG51bGwsIG5vZGVUeXBlOiBudW1iZXIsIHRhZ05hbWU6IHN0cmluZ3xudWxsLCBsVmlldzogTFZpZXcsIHROb2RlOiBUTm9kZSxcbiAgICBpc1ZpZXdDb250YWluZXJBbmNob3IgPSBmYWxzZSk6IHZvaWQge1xuICBpZiAoIW5vZGUgfHxcbiAgICAgICgobm9kZSBhcyBOb2RlKS5ub2RlVHlwZSAhPT0gbm9kZVR5cGUgfHxcbiAgICAgICAoKG5vZGUgYXMgTm9kZSkubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFICYmXG4gICAgICAgIChub2RlIGFzIEhUTUxFbGVtZW50KS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09IHRhZ05hbWU/LnRvTG93ZXJDYXNlKCkpKSkge1xuICAgIGNvbnN0IGV4cGVjdGVkTm9kZSA9IHNob3J0Uk5vZGVEZXNjcmlwdGlvbihub2RlVHlwZSwgdGFnTmFtZSwgbnVsbCk7XG4gICAgbGV0IGhlYWRlciA9IGBEdXJpbmcgaHlkcmF0aW9uIEFuZ3VsYXIgZXhwZWN0ZWQgJHtleHBlY3RlZE5vZGV9IGJ1dCBgO1xuXG4gICAgY29uc3QgaG9zdENvbXBvbmVudERlZiA9IGdldERlY2xhcmF0aW9uQ29tcG9uZW50RGVmKGxWaWV3KTtcbiAgICBjb25zdCBjb21wb25lbnRDbGFzc05hbWUgPSBob3N0Q29tcG9uZW50RGVmPy50eXBlPy5uYW1lO1xuXG4gICAgY29uc3QgZXhwZWN0ZWREb20gPSBkZXNjcmliZUV4cGVjdGVkRG9tKGxWaWV3LCB0Tm9kZSwgaXNWaWV3Q29udGFpbmVyQW5jaG9yKTtcbiAgICBjb25zdCBleHBlY3RlZCA9IGBBbmd1bGFyIGV4cGVjdGVkIHRoaXMgRE9NOlxcblxcbiR7ZXhwZWN0ZWREb219XFxuXFxuYDtcblxuICAgIGxldCBhY3R1YWwgPSAnJztcbiAgICBjb25zdCBjb21wb25lbnRIb3N0RWxlbWVudCA9IHVud3JhcFJOb2RlKGxWaWV3W0hPU1RdISk7XG4gICAgaWYgKCFub2RlKSB7XG4gICAgICAvLyBObyBub2RlIGZvdW5kIGR1cmluZyBoeWRyYXRpb24uXG4gICAgICBoZWFkZXIgKz0gYHRoZSBub2RlIHdhcyBub3QgZm91bmQuXFxuXFxuYDtcblxuICAgICAgLy8gU2luY2UgdGhlIG5vZGUgaXMgbWlzc2luZywgd2UgdXNlIHRoZSBjbG9zZXN0IG5vZGUgdG8gYXR0YWNoIHRoZSBlcnJvciB0b1xuICAgICAgbWFya1JOb2RlQXNIYXZpbmdIeWRyYXRpb25NaXNtYXRjaChjb21wb25lbnRIb3N0RWxlbWVudCwgZXhwZWN0ZWREb20pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBhY3R1YWxOb2RlID0gc2hvcnRSTm9kZURlc2NyaXB0aW9uKFxuICAgICAgICAgIChub2RlIGFzIE5vZGUpLm5vZGVUeXBlLCAobm9kZSBhcyBIVE1MRWxlbWVudCkudGFnTmFtZSA/PyBudWxsLFxuICAgICAgICAgIChub2RlIGFzIEhUTUxFbGVtZW50KS50ZXh0Q29udGVudCA/PyBudWxsKTtcblxuICAgICAgaGVhZGVyICs9IGBmb3VuZCAke2FjdHVhbE5vZGV9LlxcblxcbmA7XG4gICAgICBjb25zdCBhY3R1YWxEb20gPSBkZXNjcmliZURvbUZyb21Ob2RlKG5vZGUpO1xuICAgICAgYWN0dWFsID0gYEFjdHVhbCBET00gaXM6XFxuXFxuJHthY3R1YWxEb219XFxuXFxuYDtcblxuICAgICAgLy8gRGV2VG9vbHMgb25seSByZXBvcnQgaHlkcmF0aW9uIGlzc3VlcyBvbiB0aGUgY29tcG9uZW50IGxldmVsLCBzbyB3ZSBhdHRhY2ggZXh0cmEgZGVidWdcbiAgICAgIC8vIGluZm8gdG8gYSBjb21wb25lbnQgaG9zdCBlbGVtZW50IHRvIG1ha2UgaXQgYXZhaWxhYmxlIHRvIERldlRvb2xzLlxuICAgICAgbWFya1JOb2RlQXNIYXZpbmdIeWRyYXRpb25NaXNtYXRjaChjb21wb25lbnRIb3N0RWxlbWVudCwgZXhwZWN0ZWREb20sIGFjdHVhbERvbSk7XG4gICAgfVxuXG4gICAgY29uc3QgZm9vdGVyID0gZ2V0SHlkcmF0aW9uRXJyb3JGb290ZXIoY29tcG9uZW50Q2xhc3NOYW1lKTtcbiAgICBjb25zdCBtZXNzYWdlID0gaGVhZGVyICsgZXhwZWN0ZWQgKyBhY3R1YWwgKyBnZXRIeWRyYXRpb25BdHRyaWJ1dGVOb3RlKCkgKyBmb290ZXI7XG4gICAgdGhyb3cgbmV3IFJ1bnRpbWVFcnJvcihSdW50aW1lRXJyb3JDb2RlLkhZRFJBVElPTl9OT0RFX01JU01BVENILCBtZXNzYWdlKTtcbiAgfVxufVxuXG4vKipcbiAqIFZhbGlkYXRlcyB0aGF0IGEgZ2l2ZW4gbm9kZSBoYXMgc2libGluZyBub2Rlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVTaWJsaW5nTm9kZUV4aXN0cyhub2RlOiBSTm9kZXxudWxsKTogdm9pZCB7XG4gIHZhbGlkYXRlTm9kZUV4aXN0cyhub2RlKTtcbiAgaWYgKCFub2RlIS5uZXh0U2libGluZykge1xuICAgIGNvbnN0IGhlYWRlciA9ICdEdXJpbmcgaHlkcmF0aW9uIEFuZ3VsYXIgZXhwZWN0ZWQgbW9yZSBzaWJsaW5nIG5vZGVzIHRvIGJlIHByZXNlbnQuXFxuXFxuJztcbiAgICBjb25zdCBhY3R1YWwgPSBgQWN0dWFsIERPTSBpczpcXG5cXG4ke2Rlc2NyaWJlRG9tRnJvbU5vZGUobm9kZSEpfVxcblxcbmA7XG4gICAgY29uc3QgZm9vdGVyID0gZ2V0SHlkcmF0aW9uRXJyb3JGb290ZXIoKTtcblxuICAgIGNvbnN0IG1lc3NhZ2UgPSBoZWFkZXIgKyBhY3R1YWwgKyBmb290ZXI7XG5cbiAgICBtYXJrUk5vZGVBc0hhdmluZ0h5ZHJhdGlvbk1pc21hdGNoKG5vZGUhLCAnJywgYWN0dWFsKTtcbiAgICB0aHJvdyBuZXcgUnVudGltZUVycm9yKFJ1bnRpbWVFcnJvckNvZGUuSFlEUkFUSU9OX01JU1NJTkdfU0lCTElOR1MsIG1lc3NhZ2UpO1xuICB9XG59XG5cbi8qKlxuICogVmFsaWRhdGVzIHRoYXQgYSBub2RlIGV4aXN0cyBvciB0aHJvd3NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlTm9kZUV4aXN0cyhcbiAgICBub2RlOiBSTm9kZXxudWxsLCBsVmlldzogTFZpZXd8bnVsbCA9IG51bGwsIHROb2RlOiBUTm9kZXxudWxsID0gbnVsbCk6IHZvaWQge1xuICBpZiAoIW5vZGUpIHtcbiAgICBjb25zdCBoZWFkZXIgPVxuICAgICAgICAnRHVyaW5nIGh5ZHJhdGlvbiwgQW5ndWxhciBleHBlY3RlZCBhbiBlbGVtZW50IHRvIGJlIHByZXNlbnQgYXQgdGhpcyBsb2NhdGlvbi5cXG5cXG4nO1xuICAgIGxldCBleHBlY3RlZCA9ICcnO1xuICAgIGxldCBmb290ZXIgPSAnJztcbiAgICBpZiAobFZpZXcgIT09IG51bGwgJiYgdE5vZGUgIT09IG51bGwpIHtcbiAgICAgIGV4cGVjdGVkID0gZGVzY3JpYmVFeHBlY3RlZERvbShsVmlldywgdE5vZGUsIGZhbHNlKTtcbiAgICAgIGZvb3RlciA9IGdldEh5ZHJhdGlvbkVycm9yRm9vdGVyKCk7XG5cbiAgICAgIC8vIFNpbmNlIHRoZSBub2RlIGlzIG1pc3NpbmcsIHdlIHVzZSB0aGUgY2xvc2VzdCBub2RlIHRvIGF0dGFjaCB0aGUgZXJyb3IgdG9cbiAgICAgIG1hcmtSTm9kZUFzSGF2aW5nSHlkcmF0aW9uTWlzbWF0Y2godW53cmFwUk5vZGUobFZpZXdbSE9TVF0hKSwgZXhwZWN0ZWQsICcnKTtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgUnVudGltZUVycm9yKFxuICAgICAgICBSdW50aW1lRXJyb3JDb2RlLkhZRFJBVElPTl9NSVNTSU5HX05PREUsIGAke2hlYWRlcn0ke2V4cGVjdGVkfVxcblxcbiR7Zm9vdGVyfWApO1xuICB9XG59XG5cbi8qKlxuICogQnVpbGRzIHRoZSBoeWRyYXRpb24gZXJyb3IgbWVzc2FnZSB3aGVuIGEgbm9kZSBpcyBub3QgZm91bmRcbiAqXG4gKiBAcGFyYW0gbFZpZXcgdGhlIExWaWV3IHdoZXJlIHRoZSBub2RlIGV4aXN0c1xuICogQHBhcmFtIHROb2RlIHRoZSBUTm9kZVxuICovXG5leHBvcnQgZnVuY3Rpb24gbm9kZU5vdEZvdW5kRXJyb3IobFZpZXc6IExWaWV3LCB0Tm9kZTogVE5vZGUpOiBFcnJvciB7XG4gIGNvbnN0IGhlYWRlciA9ICdEdXJpbmcgc2VyaWFsaXphdGlvbiwgQW5ndWxhciB3YXMgdW5hYmxlIHRvIGZpbmQgYW4gZWxlbWVudCBpbiB0aGUgRE9NOlxcblxcbic7XG4gIGNvbnN0IGV4cGVjdGVkID0gYCR7ZGVzY3JpYmVFeHBlY3RlZERvbShsVmlldywgdE5vZGUsIGZhbHNlKX1cXG5cXG5gO1xuICBjb25zdCBmb290ZXIgPSBnZXRIeWRyYXRpb25FcnJvckZvb3RlcigpO1xuXG4gIHRocm93IG5ldyBSdW50aW1lRXJyb3IoUnVudGltZUVycm9yQ29kZS5IWURSQVRJT05fTUlTU0lOR19OT0RFLCBoZWFkZXIgKyBleHBlY3RlZCArIGZvb3Rlcik7XG59XG5cbi8qKlxuICogQnVpbGRzIGEgaHlkcmF0aW9uIGVycm9yIG1lc3NhZ2Ugd2hlbiBhIG5vZGUgaXMgbm90IGZvdW5kIGF0IGEgcGF0aCBsb2NhdGlvblxuICpcbiAqIEBwYXJhbSBob3N0IHRoZSBIb3N0IE5vZGVcbiAqIEBwYXJhbSBwYXRoIHRoZSBwYXRoIHRvIHRoZSBub2RlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub2RlTm90Rm91bmRBdFBhdGhFcnJvcihob3N0OiBOb2RlLCBwYXRoOiBzdHJpbmcpOiBFcnJvciB7XG4gIGNvbnN0IGhlYWRlciA9IGBEdXJpbmcgaHlkcmF0aW9uIEFuZ3VsYXIgd2FzIHVuYWJsZSB0byBsb2NhdGUgYSBub2RlIGAgK1xuICAgICAgYHVzaW5nIHRoZSBcIiR7cGF0aH1cIiBwYXRoLCBzdGFydGluZyBmcm9tIHRoZSAke2Rlc2NyaWJlUk5vZGUoaG9zdCl9IG5vZGUuXFxuXFxuYDtcbiAgY29uc3QgZm9vdGVyID0gZ2V0SHlkcmF0aW9uRXJyb3JGb290ZXIoKTtcblxuICBtYXJrUk5vZGVBc0hhdmluZ0h5ZHJhdGlvbk1pc21hdGNoKGhvc3QpO1xuICB0aHJvdyBuZXcgUnVudGltZUVycm9yKFJ1bnRpbWVFcnJvckNvZGUuSFlEUkFUSU9OX01JU1NJTkdfTk9ERSwgaGVhZGVyICsgZm9vdGVyKTtcbn1cblxuXG4vKipcbiAqIEJ1aWxkcyB0aGUgaHlkcmF0aW9uIGVycm9yIG1lc3NhZ2UgaW4gdGhlIGNhc2UgdGhhdCBkb20gbm9kZXMgYXJlIGNyZWF0ZWQgb3V0c2lkZSBvZlxuICogdGhlIEFuZ3VsYXIgY29udGV4dCBhbmQgYXJlIGJlaW5nIHVzZWQgYXMgcHJvamVjdGVkIG5vZGVzXG4gKlxuICogQHBhcmFtIGxWaWV3IHRoZSBMVmlld1xuICogQHBhcmFtIHROb2RlIHRoZSBUTm9kZVxuICogQHJldHVybnMgYW4gZXJyb3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVuc3VwcG9ydGVkUHJvamVjdGlvbk9mRG9tTm9kZXMock5vZGU6IFJOb2RlKTogRXJyb3Ige1xuICBjb25zdCBoZWFkZXIgPSAnRHVyaW5nIHNlcmlhbGl6YXRpb24sIEFuZ3VsYXIgZGV0ZWN0ZWQgRE9NIG5vZGVzICcgK1xuICAgICAgJ3RoYXQgd2VyZSBjcmVhdGVkIG91dHNpZGUgb2YgQW5ndWxhciBjb250ZXh0IGFuZCBwcm92aWRlZCBhcyBwcm9qZWN0YWJsZSBub2RlcyAnICtcbiAgICAgICcobGlrZWx5IHZpYSBgVmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnRgIG9yIGBjcmVhdGVDb21wb25lbnRgIEFQSXMpLiAnICtcbiAgICAgICdIeWRyYXRpb24gaXMgbm90IHN1cHBvcnRlZCBmb3Igc3VjaCBjYXNlcywgY29uc2lkZXIgcmVmYWN0b3JpbmcgdGhlIGNvZGUgdG8gYXZvaWQgJyArXG4gICAgICAndGhpcyBwYXR0ZXJuIG9yIHVzaW5nIGBuZ1NraXBIeWRyYXRpb25gIG9uIHRoZSBob3N0IGVsZW1lbnQgb2YgdGhlIGNvbXBvbmVudC5cXG5cXG4nO1xuICBjb25zdCBhY3R1YWwgPSBgJHtkZXNjcmliZURvbUZyb21Ob2RlKHJOb2RlKX1cXG5cXG5gO1xuICBjb25zdCBtZXNzYWdlID0gaGVhZGVyICsgYWN0dWFsICsgZ2V0SHlkcmF0aW9uQXR0cmlidXRlTm90ZSgpO1xuICByZXR1cm4gbmV3IFJ1bnRpbWVFcnJvcihSdW50aW1lRXJyb3JDb2RlLlVOU1VQUE9SVEVEX1BST0pFQ1RJT05fRE9NX05PREVTLCBtZXNzYWdlKTtcbn1cblxuLyoqXG4gKiBCdWlsZHMgdGhlIGh5ZHJhdGlvbiBlcnJvciBtZXNzYWdlIGluIHRoZSBjYXNlIHRoYXQgbmdTa2lwSHlkcmF0aW9uIHdhcyB1c2VkIG9uIGFcbiAqIG5vZGUgdGhhdCBpcyBub3QgYSBjb21wb25lbnQgaG9zdCBlbGVtZW50IG9yIGhvc3QgYmluZGluZ1xuICpcbiAqIEBwYXJhbSByTm9kZSB0aGUgSFRNTCBFbGVtZW50XG4gKiBAcmV0dXJucyBhbiBlcnJvclxuICovXG5leHBvcnQgZnVuY3Rpb24gaW52YWxpZFNraXBIeWRyYXRpb25Ib3N0KHJOb2RlOiBSTm9kZSk6IEVycm9yIHtcbiAgY29uc3QgaGVhZGVyID0gJ1RoZSBgbmdTa2lwSHlkcmF0aW9uYCBmbGFnIGlzIGFwcGxpZWQgb24gYSBub2RlICcgK1xuICAgICAgJ3RoYXQgZG9lc25cXCd0IGFjdCBhcyBhIGNvbXBvbmVudCBob3N0LiBIeWRyYXRpb24gY2FuIGJlICcgK1xuICAgICAgJ3NraXBwZWQgb25seSBvbiBwZXItY29tcG9uZW50IGJhc2lzLlxcblxcbic7XG4gIGNvbnN0IGFjdHVhbCA9IGAke2Rlc2NyaWJlRG9tRnJvbU5vZGUock5vZGUpfVxcblxcbmA7XG4gIGNvbnN0IGZvb3RlciA9ICdQbGVhc2UgbW92ZSB0aGUgYG5nU2tpcEh5ZHJhdGlvbmAgYXR0cmlidXRlIHRvIHRoZSBjb21wb25lbnQgaG9zdCBlbGVtZW50Llxcblxcbic7XG4gIGNvbnN0IG1lc3NhZ2UgPSBoZWFkZXIgKyBhY3R1YWwgKyBmb290ZXI7XG4gIHJldHVybiBuZXcgUnVudGltZUVycm9yKFJ1bnRpbWVFcnJvckNvZGUuSU5WQUxJRF9TS0lQX0hZRFJBVElPTl9IT1NULCBtZXNzYWdlKTtcbn1cblxuLy8gU3RyaW5naWZpY2F0aW9uIG1ldGhvZHNcblxuLyoqXG4gKiBTdHJpbmdpZmllcyBhIGdpdmVuIFROb2RlJ3MgYXR0cmlidXRlc1xuICpcbiAqIEBwYXJhbSB0Tm9kZSBhIHByb3ZpZGVkIFROb2RlXG4gKiBAcmV0dXJucyBzdHJpbmdcbiAqL1xuZnVuY3Rpb24gc3RyaW5naWZ5VE5vZGVBdHRycyh0Tm9kZTogVE5vZGUpOiBzdHJpbmcge1xuICBjb25zdCByZXN1bHRzID0gW107XG4gIGlmICh0Tm9kZS5hdHRycykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdE5vZGUuYXR0cnMubGVuZ3RoOykge1xuICAgICAgY29uc3QgYXR0ck5hbWUgPSB0Tm9kZS5hdHRyc1tpKytdO1xuICAgICAgLy8gT25jZSB3ZSByZWFjaCB0aGUgZmlyc3QgZmxhZywgd2Uga25vdyB0aGF0IHRoZSBsaXN0IG9mXG4gICAgICAvLyBhdHRyaWJ1dGVzIGlzIG92ZXIuXG4gICAgICBpZiAodHlwZW9mIGF0dHJOYW1lID09ICdudW1iZXInKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY29uc3QgYXR0clZhbHVlID0gdE5vZGUuYXR0cnNbaSsrXTtcbiAgICAgIHJlc3VsdHMucHVzaChgJHthdHRyTmFtZX09XCIke3Nob3J0ZW4oYXR0clZhbHVlIGFzIHN0cmluZyl9XCJgKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdHMuam9pbignICcpO1xufVxuXG4vKipcbiAqIFRoZSBsaXN0IG9mIGludGVybmFsIGF0dHJpYnV0ZXMgdGhhdCBzaG91bGQgYmUgZmlsdGVyZWQgb3V0IHdoaWxlXG4gKiBwcm9kdWNpbmcgYW4gZXJyb3IgbWVzc2FnZS5cbiAqL1xuY29uc3QgaW50ZXJuYWxBdHRycyA9IG5ldyBTZXQoWyduZ2gnLCAnbmctdmVyc2lvbicsICduZy1zZXJ2ZXItY29udGV4dCddKTtcblxuLyoqXG4gKiBTdHJpbmdpZmllcyBhbiBIVE1MIEVsZW1lbnQncyBhdHRyaWJ1dGVzXG4gKlxuICogQHBhcmFtIHJOb2RlIGFuIEhUTUwgRWxlbWVudFxuICogQHJldHVybnMgc3RyaW5nXG4gKi9cbmZ1bmN0aW9uIHN0cmluZ2lmeVJOb2RlQXR0cnMock5vZGU6IEhUTUxFbGVtZW50KTogc3RyaW5nIHtcbiAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHJOb2RlLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBhdHRyID0gck5vZGUuYXR0cmlidXRlc1tpXTtcbiAgICBpZiAoaW50ZXJuYWxBdHRycy5oYXMoYXR0ci5uYW1lKSkgY29udGludWU7XG4gICAgcmVzdWx0cy5wdXNoKGAke2F0dHIubmFtZX09XCIke3Nob3J0ZW4oYXR0ci52YWx1ZSl9XCJgKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0cy5qb2luKCcgJyk7XG59XG5cbi8vIE1ldGhvZHMgZm9yIERlc2NyaWJpbmcgdGhlIERPTVxuXG4vKipcbiAqIENvbnZlcnRzIGEgdE5vZGUgdG8gYSBoZWxwZnVsIHJlYWRhYmxlIHN0cmluZyB2YWx1ZSBmb3IgdXNlIGluIGVycm9yIG1lc3NhZ2VzXG4gKlxuICogQHBhcmFtIHROb2RlIGEgZ2l2ZW4gVE5vZGVcbiAqIEBwYXJhbSBpbm5lckNvbnRlbnQgdGhlIGNvbnRlbnQgb2YgdGhlIG5vZGVcbiAqIEByZXR1cm5zIHN0cmluZ1xuICovXG5mdW5jdGlvbiBkZXNjcmliZVROb2RlKHROb2RlOiBUTm9kZSwgaW5uZXJDb250ZW50OiBzdHJpbmcgPSAn4oCmJyk6IHN0cmluZyB7XG4gIHN3aXRjaCAodE5vZGUudHlwZSkge1xuICAgIGNhc2UgVE5vZGVUeXBlLlRleHQ6XG4gICAgICBjb25zdCBjb250ZW50ID0gdE5vZGUudmFsdWUgPyBgKCR7dE5vZGUudmFsdWV9KWAgOiAnJztcbiAgICAgIHJldHVybiBgI3RleHQke2NvbnRlbnR9YDtcbiAgICBjYXNlIFROb2RlVHlwZS5FbGVtZW50OlxuICAgICAgY29uc3QgYXR0cnMgPSBzdHJpbmdpZnlUTm9kZUF0dHJzKHROb2RlKTtcbiAgICAgIGNvbnN0IHRhZyA9IHROb2RlLnZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICByZXR1cm4gYDwke3RhZ30ke2F0dHJzID8gJyAnICsgYXR0cnMgOiAnJ30+JHtpbm5lckNvbnRlbnR9PC8ke3RhZ30+YDtcbiAgICBjYXNlIFROb2RlVHlwZS5FbGVtZW50Q29udGFpbmVyOlxuICAgICAgcmV0dXJuICc8IS0tIG5nLWNvbnRhaW5lciAtLT4nO1xuICAgIGNhc2UgVE5vZGVUeXBlLkNvbnRhaW5lcjpcbiAgICAgIHJldHVybiAnPCEtLSBjb250YWluZXIgLS0+JztcbiAgICBkZWZhdWx0OlxuICAgICAgY29uc3QgdHlwZUFzU3RyaW5nID0gZ2V0RnJpZW5kbHlTdHJpbmdGcm9tVE5vZGVUeXBlKHROb2RlLnR5cGUpO1xuICAgICAgcmV0dXJuIGAjbm9kZSgke3R5cGVBc1N0cmluZ30pYDtcbiAgfVxufVxuXG4vKipcbiAqIENvbnZlcnRzIGFuIFJOb2RlIHRvIGEgaGVscGZ1bCByZWFkYWJsZSBzdHJpbmcgdmFsdWUgZm9yIHVzZSBpbiBlcnJvciBtZXNzYWdlc1xuICpcbiAqIEBwYXJhbSByTm9kZSBhIGdpdmVuIFJOb2RlXG4gKiBAcGFyYW0gaW5uZXJDb250ZW50IHRoZSBjb250ZW50IG9mIHRoZSBub2RlXG4gKiBAcmV0dXJucyBzdHJpbmdcbiAqL1xuZnVuY3Rpb24gZGVzY3JpYmVSTm9kZShyTm9kZTogUk5vZGUsIGlubmVyQ29udGVudDogc3RyaW5nID0gJ+KApicpOiBzdHJpbmcge1xuICBjb25zdCBub2RlID0gck5vZGUgYXMgSFRNTEVsZW1lbnQ7XG4gIHN3aXRjaCAobm9kZS5ub2RlVHlwZSkge1xuICAgIGNhc2UgTm9kZS5FTEVNRU5UX05PREU6XG4gICAgICBjb25zdCB0YWcgPSBub2RlLnRhZ05hbWUhLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjb25zdCBhdHRycyA9IHN0cmluZ2lmeVJOb2RlQXR0cnMobm9kZSk7XG4gICAgICByZXR1cm4gYDwke3RhZ30ke2F0dHJzID8gJyAnICsgYXR0cnMgOiAnJ30+JHtpbm5lckNvbnRlbnR9PC8ke3RhZ30+YDtcbiAgICBjYXNlIE5vZGUuVEVYVF9OT0RFOlxuICAgICAgY29uc3QgY29udGVudCA9IG5vZGUudGV4dENvbnRlbnQgPyBzaG9ydGVuKG5vZGUudGV4dENvbnRlbnQpIDogJyc7XG4gICAgICByZXR1cm4gYCN0ZXh0JHtjb250ZW50ID8gYCgke2NvbnRlbnR9KWAgOiAnJ31gO1xuICAgIGNhc2UgTm9kZS5DT01NRU5UX05PREU6XG4gICAgICByZXR1cm4gYDwhLS0gJHtzaG9ydGVuKG5vZGUudGV4dENvbnRlbnQgPz8gJycpfSAtLT5gO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gYCNub2RlKCR7bm9kZS5ub2RlVHlwZX0pYDtcbiAgfVxufVxuXG4vKipcbiAqIEJ1aWxkcyB0aGUgc3RyaW5nIGNvbnRhaW5pbmcgdGhlIGV4cGVjdGVkIERPTSBwcmVzZW50IGdpdmVuIHRoZSBMVmlldyBhbmQgVE5vZGVcbiAqIHZhbHVlcyBmb3IgYSByZWFkYWJsZSBlcnJvciBtZXNzYWdlXG4gKlxuICogQHBhcmFtIGxWaWV3IHRoZSBsVmlldyBjb250YWluaW5nIHRoZSBET01cbiAqIEBwYXJhbSB0Tm9kZSB0aGUgdE5vZGVcbiAqIEBwYXJhbSBpc1ZpZXdDb250YWluZXJBbmNob3IgYm9vbGVhblxuICogQHJldHVybnMgc3RyaW5nXG4gKi9cbmZ1bmN0aW9uIGRlc2NyaWJlRXhwZWN0ZWREb20obFZpZXc6IExWaWV3LCB0Tm9kZTogVE5vZGUsIGlzVmlld0NvbnRhaW5lckFuY2hvcjogYm9vbGVhbik6IHN0cmluZyB7XG4gIGNvbnN0IHNwYWNlciA9ICcgICc7XG4gIGxldCBjb250ZW50ID0gJyc7XG4gIGlmICh0Tm9kZS5wcmV2KSB7XG4gICAgY29udGVudCArPSBzcGFjZXIgKyAn4oCmXFxuJztcbiAgICBjb250ZW50ICs9IHNwYWNlciArIGRlc2NyaWJlVE5vZGUodE5vZGUucHJldikgKyAnXFxuJztcbiAgfSBlbHNlIGlmICh0Tm9kZS50eXBlICYmIHROb2RlLnR5cGUgJiBUTm9kZVR5cGUuQW55Q29udGFpbmVyKSB7XG4gICAgY29udGVudCArPSBzcGFjZXIgKyAn4oCmXFxuJztcbiAgfVxuICBpZiAoaXNWaWV3Q29udGFpbmVyQW5jaG9yKSB7XG4gICAgY29udGVudCArPSBzcGFjZXIgKyBkZXNjcmliZVROb2RlKHROb2RlKSArICdcXG4nO1xuICAgIGNvbnRlbnQgKz0gc3BhY2VyICsgYDwhLS0gY29udGFpbmVyIC0tPiAgJHtBVF9USElTX0xPQ0FUSU9OfVxcbmA7XG4gIH0gZWxzZSB7XG4gICAgY29udGVudCArPSBzcGFjZXIgKyBkZXNjcmliZVROb2RlKHROb2RlKSArIGAgICR7QVRfVEhJU19MT0NBVElPTn1cXG5gO1xuICB9XG4gIGNvbnRlbnQgKz0gc3BhY2VyICsgJ+KAplxcbic7XG5cbiAgY29uc3QgcGFyZW50Uk5vZGUgPSB0Tm9kZS50eXBlID8gZ2V0UGFyZW50UkVsZW1lbnQobFZpZXdbVFZJRVddLCB0Tm9kZSwgbFZpZXcpIDogbnVsbDtcbiAgaWYgKHBhcmVudFJOb2RlKSB7XG4gICAgY29udGVudCA9IGRlc2NyaWJlUk5vZGUocGFyZW50Uk5vZGUgYXMgdW5rbm93biBhcyBOb2RlLCAnXFxuJyArIGNvbnRlbnQpO1xuICB9XG4gIHJldHVybiBjb250ZW50O1xufVxuXG4vKipcbiAqIEJ1aWxkcyB0aGUgc3RyaW5nIGNvbnRhaW5pbmcgdGhlIERPTSBwcmVzZW50IGFyb3VuZCBhIGdpdmVuIFJOb2RlIGZvciBhXG4gKiByZWFkYWJsZSBlcnJvciBtZXNzYWdlXG4gKlxuICogQHBhcmFtIG5vZGUgdGhlIFJOb2RlXG4gKiBAcmV0dXJucyBzdHJpbmdcbiAqL1xuZnVuY3Rpb24gZGVzY3JpYmVEb21Gcm9tTm9kZShub2RlOiBSTm9kZSk6IHN0cmluZyB7XG4gIGNvbnN0IHNwYWNlciA9ICcgICc7XG4gIGxldCBjb250ZW50ID0gJyc7XG4gIGNvbnN0IGN1cnJlbnROb2RlID0gbm9kZSBhcyBIVE1MRWxlbWVudDtcbiAgaWYgKGN1cnJlbnROb2RlLnByZXZpb3VzU2libGluZykge1xuICAgIGNvbnRlbnQgKz0gc3BhY2VyICsgJ+KAplxcbic7XG4gICAgY29udGVudCArPSBzcGFjZXIgKyBkZXNjcmliZVJOb2RlKGN1cnJlbnROb2RlLnByZXZpb3VzU2libGluZykgKyAnXFxuJztcbiAgfVxuICBjb250ZW50ICs9IHNwYWNlciArIGRlc2NyaWJlUk5vZGUoY3VycmVudE5vZGUpICsgYCAgJHtBVF9USElTX0xPQ0FUSU9OfVxcbmA7XG4gIGlmIChub2RlLm5leHRTaWJsaW5nKSB7XG4gICAgY29udGVudCArPSBzcGFjZXIgKyAn4oCmXFxuJztcbiAgfVxuICBpZiAobm9kZS5wYXJlbnROb2RlKSB7XG4gICAgY29udGVudCA9IGRlc2NyaWJlUk5vZGUoY3VycmVudE5vZGUucGFyZW50Tm9kZSBhcyBOb2RlLCAnXFxuJyArIGNvbnRlbnQpO1xuICB9XG4gIHJldHVybiBjb250ZW50O1xufVxuXG4vKipcbiAqIFNob3J0ZW5zIHRoZSBkZXNjcmlwdGlvbiBvZiBhIGdpdmVuIFJOb2RlIGJ5IGl0cyB0eXBlIGZvciByZWFkYWJpbGl0eVxuICpcbiAqIEBwYXJhbSBub2RlVHlwZSB0aGUgdHlwZSBvZiBub2RlXG4gKiBAcGFyYW0gdGFnTmFtZSB0aGUgbm9kZSB0YWcgbmFtZVxuICogQHBhcmFtIHRleHRDb250ZW50IHRoZSB0ZXh0IGNvbnRlbnQgaW4gdGhlIG5vZGVcbiAqIEByZXR1cm5zIHN0cmluZ1xuICovXG5mdW5jdGlvbiBzaG9ydFJOb2RlRGVzY3JpcHRpb24oXG4gICAgbm9kZVR5cGU6IG51bWJlciwgdGFnTmFtZTogc3RyaW5nfG51bGwsIHRleHRDb250ZW50OiBzdHJpbmd8bnVsbCk6IHN0cmluZyB7XG4gIHN3aXRjaCAobm9kZVR5cGUpIHtcbiAgICBjYXNlIE5vZGUuRUxFTUVOVF9OT0RFOlxuICAgICAgcmV0dXJuIGA8JHt0YWdOYW1lIS50b0xvd2VyQ2FzZSgpfT5gO1xuICAgIGNhc2UgTm9kZS5URVhUX05PREU6XG4gICAgICBjb25zdCBjb250ZW50ID0gdGV4dENvbnRlbnQgPyBgICh3aXRoIHRoZSBcIiR7c2hvcnRlbih0ZXh0Q29udGVudCl9XCIgY29udGVudClgIDogJyc7XG4gICAgICByZXR1cm4gYGEgdGV4dCBub2RlJHtjb250ZW50fWA7XG4gICAgY2FzZSBOb2RlLkNPTU1FTlRfTk9ERTpcbiAgICAgIHJldHVybiAnYSBjb21tZW50IG5vZGUnO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gYCNub2RlKG5vZGVUeXBlPSR7bm9kZVR5cGV9KWA7XG4gIH1cbn1cblxuXG4vKipcbiAqIEJ1aWxkcyB0aGUgZm9vdGVyIGh5ZHJhdGlvbiBlcnJvciBtZXNzYWdlXG4gKlxuICogQHBhcmFtIGNvbXBvbmVudENsYXNzTmFtZSB0aGUgbmFtZSBvZiB0aGUgY29tcG9uZW50IGNsYXNzXG4gKiBAcmV0dXJucyBzdHJpbmdcbiAqL1xuZnVuY3Rpb24gZ2V0SHlkcmF0aW9uRXJyb3JGb290ZXIoY29tcG9uZW50Q2xhc3NOYW1lPzogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgY29tcG9uZW50SW5mbyA9IGNvbXBvbmVudENsYXNzTmFtZSA/IGB0aGUgXCIke2NvbXBvbmVudENsYXNzTmFtZX1cImAgOiAnY29ycmVzcG9uZGluZyc7XG4gIHJldHVybiBgVG8gZml4IHRoaXMgcHJvYmxlbTpcXG5gICtcbiAgICAgIGAgICogY2hlY2sgJHtjb21wb25lbnRJbmZvfSBjb21wb25lbnQgZm9yIGh5ZHJhdGlvbi1yZWxhdGVkIGlzc3Vlc1xcbmAgK1xuICAgICAgYCAgKiBjaGVjayB0byBzZWUgaWYgeW91ciB0ZW1wbGF0ZSBoYXMgdmFsaWQgSFRNTCBzdHJ1Y3R1cmVcXG5gICtcbiAgICAgIGAgICogb3Igc2tpcCBoeWRyYXRpb24gYnkgYWRkaW5nIHRoZSBcXGBuZ1NraXBIeWRyYXRpb25cXGAgYXR0cmlidXRlIGAgK1xuICAgICAgYHRvIGl0cyBob3N0IG5vZGUgaW4gYSB0ZW1wbGF0ZVxcblxcbmA7XG59XG5cbi8qKlxuICogQW4gYXR0cmlidXRlIHJlbGF0ZWQgbm90ZSBmb3IgaHlkcmF0aW9uIGVycm9yc1xuICovXG5mdW5jdGlvbiBnZXRIeWRyYXRpb25BdHRyaWJ1dGVOb3RlKCk6IHN0cmluZyB7XG4gIHJldHVybiAnTm90ZTogYXR0cmlidXRlcyBhcmUgb25seSBkaXNwbGF5ZWQgdG8gYmV0dGVyIHJlcHJlc2VudCB0aGUgRE9NJyArXG4gICAgICAnIGJ1dCBoYXZlIG5vIGVmZmVjdCBvbiBoeWRyYXRpb24gbWlzbWF0Y2hlcy5cXG5cXG4nO1xufVxuXG4vLyBOb2RlIHN0cmluZyB1dGlsaXR5IGZ1bmN0aW9uc1xuXG4vKipcbiAqIFN0cmlwcyBhbGwgbmV3bGluZXMgb3V0IG9mIGEgZ2l2ZW4gc3RyaW5nXG4gKlxuICogQHBhcmFtIGlucHV0IGEgc3RyaW5nIHRvIGJlIGNsZWFyZWQgb2YgbmV3IGxpbmUgY2hhcmFjdGVyc1xuICogQHJldHVybnNcbiAqL1xuZnVuY3Rpb24gc3RyaXBOZXdsaW5lcyhpbnB1dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGlucHV0LnJlcGxhY2UoL1xccysvZ20sICcnKTtcbn1cblxuLyoqXG4gKiBSZWR1Y2VzIGEgc3RyaW5nIGRvd24gdG8gYSBtYXhpbXVtIGxlbmd0aCBvZiBjaGFyYWN0ZXJzIHdpdGggZWxsaXBzaXMgZm9yIHJlYWRhYmlsaXR5XG4gKlxuICogQHBhcmFtIGlucHV0IGEgc3RyaW5nIGlucHV0XG4gKiBAcGFyYW0gbWF4TGVuZ3RoIGEgbWF4aW11bSBsZW5ndGggaW4gY2hhcmFjdGVyc1xuICogQHJldHVybnMgc3RyaW5nXG4gKi9cbmZ1bmN0aW9uIHNob3J0ZW4oaW5wdXQ6IHN0cmluZ3xudWxsLCBtYXhMZW5ndGggPSA1MCk6IHN0cmluZyB7XG4gIGlmICghaW5wdXQpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgaW5wdXQgPSBzdHJpcE5ld2xpbmVzKGlucHV0KTtcbiAgcmV0dXJuIGlucHV0Lmxlbmd0aCA+IG1heExlbmd0aCA/IGAke2lucHV0LnN1YnN0cmluZygwLCBtYXhMZW5ndGggLSAxKX3igKZgIDogaW5wdXQ7XG59XG4iXX0=