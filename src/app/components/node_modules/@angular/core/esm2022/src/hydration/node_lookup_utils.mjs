/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DECLARATION_COMPONENT_VIEW, HEADER_OFFSET, HOST } from '../render3/interfaces/view';
import { getFirstNativeNode } from '../render3/node_manipulation';
import { ɵɵresolveBody } from '../render3/util/misc_utils';
import { renderStringify } from '../render3/util/stringify_utils';
import { getNativeByTNode, unwrapRNode } from '../render3/util/view_utils';
import { assertDefined } from '../util/assert';
import { compressNodeLocation, decompressNodeLocation } from './compression';
import { nodeNotFoundAtPathError, nodeNotFoundError, validateSiblingNodeExists } from './error_handling';
import { NodeNavigationStep, NODES, REFERENCE_NODE_BODY, REFERENCE_NODE_HOST } from './interfaces';
import { calcSerializedContainerSize, getSegmentHead } from './utils';
/** Whether current TNode is a first node in an <ng-container>. */
function isFirstElementInNgContainer(tNode) {
    return !tNode.prev && tNode.parent?.type === 8 /* TNodeType.ElementContainer */;
}
/** Returns an instruction index (subtracting HEADER_OFFSET). */
function getNoOffsetIndex(tNode) {
    return tNode.index - HEADER_OFFSET;
}
/**
 * Check whether a given node exists, but is disconnected from the DOM.
 *
 * Note: we leverage the fact that we have this information available in the DOM emulation
 * layer (in Domino) for now. Longer-term solution should not rely on the DOM emulation and
 * only use internal data structures and state to compute this information.
 */
export function isDisconnectedNode(tNode, lView) {
    return !(tNode.type & 16 /* TNodeType.Projection */) && !!lView[tNode.index] &&
        !unwrapRNode(lView[tNode.index])?.isConnected;
}
/**
 * Locate a node in an i18n tree that corresponds to a given instruction index.
 *
 * @param hydrationInfo The hydration annotation data
 * @param noOffsetIndex the instruction index
 * @returns an RNode that corresponds to the instruction index
 */
export function locateI18nRNodeByIndex(hydrationInfo, noOffsetIndex) {
    const i18nNodes = hydrationInfo.i18nNodes;
    if (i18nNodes) {
        const native = i18nNodes.get(noOffsetIndex);
        if (native) {
            i18nNodes.delete(noOffsetIndex);
        }
        return native;
    }
    return null;
}
/**
 * Locate a node in DOM tree that corresponds to a given TNode.
 *
 * @param hydrationInfo The hydration annotation data
 * @param tView the current tView
 * @param lView the current lView
 * @param tNode the current tNode
 * @returns an RNode that represents a given tNode
 */
export function locateNextRNode(hydrationInfo, tView, lView, tNode) {
    const noOffsetIndex = getNoOffsetIndex(tNode);
    let native = locateI18nRNodeByIndex(hydrationInfo, noOffsetIndex);
    if (!native) {
        const nodes = hydrationInfo.data[NODES];
        if (nodes?.[noOffsetIndex]) {
            // We know the exact location of the node.
            native = locateRNodeByPath(nodes[noOffsetIndex], lView);
        }
        else if (tView.firstChild === tNode) {
            // We create a first node in this view, so we use a reference
            // to the first child in this DOM segment.
            native = hydrationInfo.firstChild;
        }
        else {
            // Locate a node based on a previous sibling or a parent node.
            const previousTNodeParent = tNode.prev === null;
            const previousTNode = (tNode.prev ?? tNode.parent);
            ngDevMode &&
                assertDefined(previousTNode, 'Unexpected state: current TNode does not have a connection ' +
                    'to the previous node or a parent node.');
            if (isFirstElementInNgContainer(tNode)) {
                const noOffsetParentIndex = getNoOffsetIndex(tNode.parent);
                native = getSegmentHead(hydrationInfo, noOffsetParentIndex);
            }
            else {
                let previousRElement = getNativeByTNode(previousTNode, lView);
                if (previousTNodeParent) {
                    native = previousRElement.firstChild;
                }
                else {
                    // If the previous node is an element, but it also has container info,
                    // this means that we are processing a node like `<div #vcrTarget>`, which is
                    // represented in the DOM as `<div></div>...<!--container-->`.
                    // In this case, there are nodes *after* this element and we need to skip
                    // all of them to reach an element that we are looking for.
                    const noOffsetPrevSiblingIndex = getNoOffsetIndex(previousTNode);
                    const segmentHead = getSegmentHead(hydrationInfo, noOffsetPrevSiblingIndex);
                    if (previousTNode.type === 2 /* TNodeType.Element */ && segmentHead) {
                        const numRootNodesToSkip = calcSerializedContainerSize(hydrationInfo, noOffsetPrevSiblingIndex);
                        // `+1` stands for an anchor comment node after all the views in this container.
                        const nodesToSkip = numRootNodesToSkip + 1;
                        // First node after this segment.
                        native = siblingAfter(nodesToSkip, segmentHead);
                    }
                    else {
                        native = previousRElement.nextSibling;
                    }
                }
            }
        }
    }
    return native;
}
/**
 * Skips over a specified number of nodes and returns the next sibling node after that.
 */
export function siblingAfter(skip, from) {
    let currentNode = from;
    for (let i = 0; i < skip; i++) {
        ngDevMode && validateSiblingNodeExists(currentNode);
        currentNode = currentNode.nextSibling;
    }
    return currentNode;
}
/**
 * Helper function to produce a string representation of the navigation steps
 * (in terms of `nextSibling` and `firstChild` navigations). Used in error
 * messages in dev mode.
 */
function stringifyNavigationInstructions(instructions) {
    const container = [];
    for (let i = 0; i < instructions.length; i += 2) {
        const step = instructions[i];
        const repeat = instructions[i + 1];
        for (let r = 0; r < repeat; r++) {
            container.push(step === NodeNavigationStep.FirstChild ? 'firstChild' : 'nextSibling');
        }
    }
    return container.join('.');
}
/**
 * Helper function that navigates from a starting point node (the `from` node)
 * using provided set of navigation instructions (within `path` argument).
 */
function navigateToNode(from, instructions) {
    let node = from;
    for (let i = 0; i < instructions.length; i += 2) {
        const step = instructions[i];
        const repeat = instructions[i + 1];
        for (let r = 0; r < repeat; r++) {
            if (ngDevMode && !node) {
                throw nodeNotFoundAtPathError(from, stringifyNavigationInstructions(instructions));
            }
            switch (step) {
                case NodeNavigationStep.FirstChild:
                    node = node.firstChild;
                    break;
                case NodeNavigationStep.NextSibling:
                    node = node.nextSibling;
                    break;
            }
        }
    }
    if (ngDevMode && !node) {
        throw nodeNotFoundAtPathError(from, stringifyNavigationInstructions(instructions));
    }
    return node;
}
/**
 * Locates an RNode given a set of navigation instructions (which also contains
 * a starting point node info).
 */
function locateRNodeByPath(path, lView) {
    const [referenceNode, ...navigationInstructions] = decompressNodeLocation(path);
    let ref;
    if (referenceNode === REFERENCE_NODE_HOST) {
        ref = lView[DECLARATION_COMPONENT_VIEW][HOST];
    }
    else if (referenceNode === REFERENCE_NODE_BODY) {
        ref = ɵɵresolveBody(lView[DECLARATION_COMPONENT_VIEW][HOST]);
    }
    else {
        const parentElementId = Number(referenceNode);
        ref = unwrapRNode(lView[parentElementId + HEADER_OFFSET]);
    }
    return navigateToNode(ref, navigationInstructions);
}
/**
 * Generate a list of DOM navigation operations to get from node `start` to node `finish`.
 *
 * Note: assumes that node `start` occurs before node `finish` in an in-order traversal of the DOM
 * tree. That is, we should be able to get from `start` to `finish` purely by using `.firstChild`
 * and `.nextSibling` operations.
 */
export function navigateBetween(start, finish) {
    if (start === finish) {
        return [];
    }
    else if (start.parentElement == null || finish.parentElement == null) {
        return null;
    }
    else if (start.parentElement === finish.parentElement) {
        return navigateBetweenSiblings(start, finish);
    }
    else {
        // `finish` is a child of its parent, so the parent will always have a child.
        const parent = finish.parentElement;
        const parentPath = navigateBetween(start, parent);
        const childPath = navigateBetween(parent.firstChild, finish);
        if (!parentPath || !childPath)
            return null;
        return [
            // First navigate to `finish`'s parent
            ...parentPath,
            // Then to its first child.
            NodeNavigationStep.FirstChild,
            // And finally from that node to `finish` (maybe a no-op if we're already there).
            ...childPath,
        ];
    }
}
/**
 * Calculates a path between 2 sibling nodes (generates a number of `NextSibling` navigations).
 * Returns `null` if no such path exists between the given nodes.
 */
function navigateBetweenSiblings(start, finish) {
    const nav = [];
    let node = null;
    for (node = start; node != null && node !== finish; node = node.nextSibling) {
        nav.push(NodeNavigationStep.NextSibling);
    }
    // If the `node` becomes `null` or `undefined` at the end, that means that we
    // didn't find the `end` node, thus return `null` (which would trigger serialization
    // error to be produced).
    return node == null ? null : nav;
}
/**
 * Calculates a path between 2 nodes in terms of `nextSibling` and `firstChild`
 * navigations:
 * - the `from` node is a known node, used as an starting point for the lookup
 *   (the `fromNodeName` argument is a string representation of the node).
 * - the `to` node is a node that the runtime logic would be looking up,
 *   using the path generated by this function.
 */
export function calcPathBetween(from, to, fromNodeName) {
    const path = navigateBetween(from, to);
    return path === null ? null : compressNodeLocation(fromNodeName, path);
}
/**
 * Invoked at serialization time (on the server) when a set of navigation
 * instructions needs to be generated for a TNode.
 */
export function calcPathForNode(tNode, lView) {
    let parentTNode = tNode.parent;
    let parentIndex;
    let parentRNode;
    let referenceNodeName;
    // Skip over all parent nodes that are disconnected from the DOM, such nodes
    // can not be used as anchors.
    //
    // This might happen in certain content projection-based use-cases, where
    // a content of an element is projected and used, when a parent element
    // itself remains detached from DOM. In this scenario we try to find a parent
    // element that is attached to DOM and can act as an anchor instead.
    while (parentTNode !== null && isDisconnectedNode(parentTNode, lView)) {
        parentTNode = parentTNode.parent;
    }
    if (parentTNode === null || !(parentTNode.type & 3 /* TNodeType.AnyRNode */)) {
        // If there is no parent TNode or a parent TNode does not represent an RNode
        // (i.e. not a DOM node), use component host element as a reference node.
        parentIndex = referenceNodeName = REFERENCE_NODE_HOST;
        parentRNode = lView[DECLARATION_COMPONENT_VIEW][HOST];
    }
    else {
        // Use parent TNode as a reference node.
        parentIndex = parentTNode.index;
        parentRNode = unwrapRNode(lView[parentIndex]);
        referenceNodeName = renderStringify(parentIndex - HEADER_OFFSET);
    }
    let rNode = unwrapRNode(lView[tNode.index]);
    if (tNode.type & 12 /* TNodeType.AnyContainer */) {
        // For <ng-container> nodes, instead of serializing a reference
        // to the anchor comment node, serialize a location of the first
        // DOM element. Paired with the container size (serialized as a part
        // of `ngh.containers`), it should give enough information for runtime
        // to hydrate nodes in this container.
        const firstRNode = getFirstNativeNode(lView, tNode);
        // If container is not empty, use a reference to the first element,
        // otherwise, rNode would point to an anchor comment node.
        if (firstRNode) {
            rNode = firstRNode;
        }
    }
    let path = calcPathBetween(parentRNode, rNode, referenceNodeName);
    if (path === null && parentRNode !== rNode) {
        // Searching for a path between elements within a host node failed.
        // Trying to find a path to an element starting from the `document.body` instead.
        //
        // Important note: this type of reference is relatively unstable, since Angular
        // may not be able to control parts of the page that the runtime logic navigates
        // through. This is mostly needed to cover "portals" use-case (like menus, dialog boxes,
        // etc), where nodes are content-projected (including direct DOM manipulations) outside
        // of the host node. The better solution is to provide APIs to work with "portals",
        // at which point this code path would not be needed.
        const body = parentRNode.ownerDocument.body;
        path = calcPathBetween(body, rNode, REFERENCE_NODE_BODY);
        if (path === null) {
            // If the path is still empty, it's likely that this node is detached and
            // won't be found during hydration.
            throw nodeNotFoundError(lView, tNode);
        }
    }
    return path;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9sb29rdXBfdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9oeWRyYXRpb24vbm9kZV9sb29rdXBfdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBSUgsT0FBTyxFQUFDLDBCQUEwQixFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQWUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxXQUFXLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUFDLG9CQUFvQixFQUFFLHNCQUFzQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzNFLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSx5QkFBeUIsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ3ZHLE9BQU8sRUFBaUIsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLG1CQUFtQixFQUFFLG1CQUFtQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ2pILE9BQU8sRUFBQywyQkFBMkIsRUFBRSxjQUFjLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFHcEUsa0VBQWtFO0FBQ2xFLFNBQVMsMkJBQTJCLENBQUMsS0FBWTtJQUMvQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksdUNBQStCLENBQUM7QUFDMUUsQ0FBQztBQUVELGdFQUFnRTtBQUNoRSxTQUFTLGdCQUFnQixDQUFDLEtBQVk7SUFDcEMs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RUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBRWpFLElBQUksSUFBSSxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ2xCLHlFQUF5RTtZQUN6RSxtQ0FBbUM7WUFDbkMsTUFBTSxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDeEMsQ0FBQztJQUNILENBQUM7SUFDRCxPQUFPLElBQUssQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtUTm9kZSwgVE5vZGVUeXBlfSBmcm9tICcuLi9yZW5kZXIzL2ludGVyZmFjZXMvbm9kZSc7XG5pbXBvcnQge1JFbGVtZW50LCBSTm9kZX0gZnJvbSAnLi4vcmVuZGVyMy9pbnRlcmZhY2VzL3JlbmRlcmVyX2RvbSc7XG5pbXBvcnQge0RFQ0xBUkFUSU9OX0NPTVBPTkVOVF9WSUVXLCBIRUFERVJfT0ZGU0VULCBIT1NULCBMVmlldywgVFZpZXd9IGZyb20gJy4uL3JlbmRlcjMvaW50ZXJmYWNlcy92aWV3JztcbmltcG9ydCB7Z2V0Rmlyc3ROYXRpdmVOb2RlfSBmcm9tICcuLi9yZW5kZXIzL25vZGVfbWFuaXB1bGF0aW9uJztcbmltcG9ydCB7ybXJtXJlc29sdmVCb2R5fSBmcm9tICcuLi9yZW5kZXIzL3V0aWwvbWlzY191dGlscyc7XG5pbXBvcnQge3JlbmRlclN0cmluZ2lmeX0gZnJvbSAnLi4vcmVuZGVyMy91dGlsL3N0cmluZ2lmeV91dGlscyc7XG5pbXBvcnQge2dldE5hdGl2ZUJ5VE5vZGUsIHVud3JhcFJOb2RlfSBmcm9tICcuLi9yZW5kZXIzL3V0aWwvdmlld191dGlscyc7XG5pbXBvcnQge2Fzc2VydERlZmluZWR9IGZyb20gJy4uL3V0aWwvYXNzZXJ0JztcblxuaW1wb3J0IHtjb21wcmVzc05vZGVMb2NhdGlvbiwgZGVjb21wcmVzc05vZGVMb2NhdGlvbn0gZnJvbSAnLi9jb21wcmVzc2lvbic7XG5pbXBvcnQge25vZGVOb3RGb3VuZEF0UGF0aEVycm9yLCBub2RlTm90Rm91bmRFcnJvciwgdmFsaWRhdGVTaWJsaW5nTm9kZUV4aXN0c30gZnJvbSAnLi9lcnJvcl9oYW5kbGluZyc7XG5pbXBvcnQge0RlaHlkcmF0ZWRWaWV3LCBOb2RlTmF2aWdhdGlvblN0ZXAsIE5PREVTLCBSRUZFUkVOQ0VfTk9ERV9CT0RZLCBSRUZFUkVOQ0VfTk9ERV9IT1NUfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHtjYWxjU2VyaWFsaXplZENvbnRhaW5lclNpemUsIGdldFNlZ21lbnRIZWFkfSBmcm9tICcuL3V0aWxzJztcblxuXG4vKiogV2hldGhlciBjdXJyZW50IFROb2RlIGlzIGEgZmlyc3Qgbm9kZSBpbiBhbiA8bmctY29udGFpbmVyPi4gKi9cbmZ1bmN0aW9uIGlzRmlyc3RFbGVtZW50SW5OZ0NvbnRhaW5lcih0Tm9kZTogVE5vZGUpOiBib29sZWFuIHtcbiAgcmV0dXJuICF0Tm9kZS5wcmV2ICYmIHROb2RlLnBhcmVudD8udHlwZSA9PT0gVE5vZGVUeXBlLkVsZW1lbnRDb250YWluZXI7XG59XG5cbi8qKiBSZXR1cm5zIGFuIGluc3RydWN0aW9uIGluZGV4IChzdWJ0cmFjdGluZyBIRUFERVJfT0ZGU0VUKS4gKi9cbmZ1bmN0aW9uIGdldE5vT2Zmc2V0SW5kZXgodE5vZGU6IFROb2RlKTogbnVtYmVyIHtcbiAgcmV0dXJuIHROb2RlLmluZGV4IC0gSEVBREVSX09GRlNFVDtcbn1cblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIGEgZ2l2ZW4gbm9kZSBleGlzdHMsIGJ1dCBpcyBkaXNjb25uZWN0ZWQgZnJvbSB0aGUgRE9NLlxuICpcbiAqIE5vdGU6IHdlIGxldmVyYWdlIHRoZSBmYWN0IHRoYXQgd2UgaGF2ZSB0aGlzIGluZm9ybWF0aW9uIGF2YWlsYWJsZSBpbiB0aGUgRE9NIGVtdWxhdGlvblxuICogbGF5ZXIgKGluIERvbWlubykgZm9yIG5vdy4gTG9uZ2VyLXRlcm0gc29sdXRpb24gc2hvdWxkIG5vdCByZWx5IG9uIHRoZSBET00gZW11bGF0aW9uIGFuZFxuICogb25seSB1c2UgaW50ZXJuYWwgZGF0YSBzdHJ1Y3R1cmVzIGFuZCBzdGF0ZSB0byBjb21wdXRlIHRoaXMgaW5mb3JtYXRpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Rpc2Nvbm5lY3RlZE5vZGUodE5vZGU6IFROb2RlLCBsVmlldzogTFZpZXcpIHtcbiAgcmV0dXJuICEodE5vZGUudHlwZSAmIFROb2RlVHlwZS5Qcm9qZWN0aW9uKSAmJiAhIWxWaWV3W3ROb2RlLmluZGV4XSAmJlxuICAgICAgISh1bndyYXBSTm9kZShsVmlld1t0Tm9kZS5pbmRleF0pIGFzIE5vZGUpPy5pc0Nvbm5lY3RlZDtcbn1cblxuLyoqXG4gKiBMb2NhdGUgYSBub2RlIGluIGFuIGkxOG4gdHJlZSB0aGF0IGNvcnJlc3BvbmRzIHRvIGEgZ2l2ZW4gaW5zdHJ1Y3Rpb24gaW5kZXguXG4gKlxuICogQHBhcmFtIGh5ZHJhdGlvbkluZm8gVGhlIGh5ZHJhdGlvbiBhbm5vdGF0aW9uIGRhdGFcbiAqIEBwYXJhbSBub09mZnNldEluZGV4IHRoZSBpbnN0cnVjdGlvbiBpbmRleFxuICogQHJldHVybnMgYW4gUk5vZGUgdGhhdCBjb3JyZXNwb25kcyB0byB0aGUgaW5zdHJ1Y3Rpb24gaW5kZXhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvY2F0ZUkxOG5STm9kZUJ5SW5kZXg8VCBleHRlbmRzIFJOb2RlPihcbiAgICBoeWRyYXRpb25JbmZvOiBEZWh5ZHJhdGVkVmlldywgbm9PZmZzZXRJbmRleDogbnVtYmVyKTogVHxudWxsIHtcbiAgY29uc3QgaTE4bk5vZGVzID0gaHlkcmF0aW9uSW5mby5pMThuTm9kZXM7XG4gIGlmIChpMThuTm9kZXMpIHtcbiAgICBjb25zdCBuYXRpdmUgPSBpMThuTm9kZXMuZ2V0KG5vT2Zmc2V0SW5kZXgpO1xuICAgIGlmIChuYXRpdmUpIHtcbiAgICAgIGkxOG5Ob2Rlcy5kZWxldGUobm9PZmZzZXRJbmRleCk7XG4gICAgfVxuICAgIHJldHVybiBuYXRpdmUgYXMgVDtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBMb2NhdGUgYSBub2RlIGluIERPTSB0cmVlIHRoYXQgY29ycmVzcG9uZHMgdG8gYSBnaXZlbiBUTm9kZS5cbiAqXG4gKiBAcGFyYW0gaHlkcmF0aW9uSW5mbyBUaGUgaHlkcmF0aW9uIGFubm90YXRpb24gZGF0YVxuICogQHBhcmFtIHRWaWV3IHRoZSBjdXJyZW50IHRWaWV3XG4gKiBAcGFyYW0gbFZpZXcgdGhlIGN1cnJlbnQgbFZpZXdcbiAqIEBwYXJhbSB0Tm9kZSB0aGUgY3VycmVudCB0Tm9kZVxuICogQHJldHVybnMgYW4gUk5vZGUgdGhhdCByZXByZXNlbnRzIGEgZ2l2ZW4gdE5vZGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvY2F0ZU5leHRSTm9kZTxUIGV4dGVuZHMgUk5vZGU+KFxuICAgIGh5ZHJhdGlvbkluZm86IERlaHlkcmF0ZWRWaWV3LCB0VmlldzogVFZpZXcsIGxWaWV3OiBMVmlldzx1bmtub3duPiwgdE5vZGU6IFROb2RlKTogVHxudWxsIHtcbiAgY29uc3Qgbm9PZmZzZXRJbmRleCA9IGdldE5vT2Zmc2V0SW5kZXgodE5vZGUpO1xuICBsZXQgbmF0aXZlOiBSTm9kZXxudWxsID0gbG9jYXRlSTE4blJOb2RlQnlJbmRleChoeWRyYXRpb25JbmZvLCBub09mZnNldEluZGV4KTtcblxuICBpZiAoIW5hdGl2ZSkge1xuICAgIGNvbnN0IG5vZGVzID0gaHlkcmF0aW9uSW5mby5kYXRhW05PREVTXTtcbiAgICBpZiAobm9kZXM/Lltub09mZnNldEluZGV4XSkge1xuICAgICAgLy8gV2Uga25vdyB0aGUgZXhhY3QgbG9jYXRpb24gb2YgdGhlIG5vZGUuXG4gICAgICBuYXRpdmUgPSBsb2NhdGVSTm9kZUJ5UGF0aChub2Rlc1tub09mZnNldEluZGV4XSwgbFZpZXcpO1xuICAgIH0gZWxzZSBpZiAodFZpZXcuZmlyc3RDaGlsZCA9PT0gdE5vZGUpIHtcbiAgICAgIC8vIFdlIGNyZWF0ZSBhIGZpcnN0IG5vZGUgaW4gdGhpcyB2aWV3LCBzbyB3ZSB1c2UgYSByZWZlcmVuY2VcbiAgICAgIC8vIHRvIHRoZSBmaXJzdCBjaGlsZCBpbiB0aGlzIERPTSBzZWdtZW50LlxuICAgICAgbmF0aXZlID0gaHlkcmF0aW9uSW5mby5maXJzdENoaWxkO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBMb2NhdGUgYSBub2RlIGJhc2VkIG9uIGEgcHJldmlvdXMgc2libGluZyBvciBhIHBhcmVudCBub2RlLlxuICAgICAgY29uc3QgcHJldmlvdXNUTm9kZVBhcmVudCA9IHROb2RlLnByZXYgPT09IG51bGw7XG4gICAgICBjb25zdCBwcmV2aW91c1ROb2RlID0gKHROb2RlLnByZXYgPz8gdE5vZGUucGFyZW50KSE7XG4gICAgICBuZ0Rldk1vZGUgJiZcbiAgICAgICAgICBhc3NlcnREZWZpbmVkKFxuICAgICAgICAgICAgICBwcmV2aW91c1ROb2RlLFxuICAgICAgICAgICAgICAnVW5leHBlY3RlZCBzdGF0ZTogY3VycmVudCBUTm9kZSBkb2VzIG5vdCBoYXZlIGEgY29ubmVjdGlvbiAnICtcbiAgICAgICAgICAgICAgICAgICd0byB0aGUgcHJldmlvdXMgbm9kZSBvciBhIHBhcmVudCBub2RlLicpO1xuICAgICAgaWYgKGlzRmlyc3RFbGVtZW50SW5OZ0NvbnRhaW5lcih0Tm9kZSkpIHtcbiAgICAgICAgY29uc3Qgbm9PZmZzZXRQYXJlbnRJbmRleCA9IGdldE5vT2Zmc2V0SW5kZXgodE5vZGUucGFyZW50ISk7XG4gICAgICAgIG5hdGl2ZSA9IGdldFNlZ21lbnRIZWFkKGh5ZHJhdGlvbkluZm8sIG5vT2Zmc2V0UGFyZW50SW5kZXgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHByZXZpb3VzUkVsZW1lbnQgPSBnZXROYXRpdmVCeVROb2RlKHByZXZpb3VzVE5vZGUsIGxWaWV3KTtcbiAgICAgICAgaWYgKHByZXZpb3VzVE5vZGVQYXJlbnQpIHtcbiAgICAgICAgICBuYXRpdmUgPSAocHJldmlvdXNSRWxlbWVudCBhcyBSRWxlbWVudCkuZmlyc3RDaGlsZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBJZiB0aGUgcHJldmlvdXMgbm9kZSBpcyBhbiBlbGVtZW50LCBidXQgaXQgYWxzbyBoYXMgY29udGFpbmVyIGluZm8sXG4gICAgICAgICAgLy8gdGhpcyBtZWFucyB0aGF0IHdlIGFyZSBwcm9jZXNzaW5nIGEgbm9kZSBsaWtlIGA8ZGl2ICN2Y3JUYXJnZXQ+YCwgd2hpY2ggaXNcbiAgICAgICAgICAvLyByZXByZXNlbnRlZCBpbiB0aGUgRE9NIGFzIGA8ZGl2PjwvZGl2Pi4uLjwhLS1jb250YWluZXItLT5gLlxuICAgICAgICAgIC8vIEluIHRoaXMgY2FzZSwgdGhlcmUgYXJlIG5vZGVzICphZnRlciogdGhpcyBlbGVtZW50IGFuZCB3ZSBuZWVkIHRvIHNraXBcbiAgICAgICAgICAvLyBhbGwgb2YgdGhlbSB0byByZWFjaCBhbiBlbGVtZW50IHRoYXQgd2UgYXJlIGxvb2tpbmcgZm9yLlxuICAgICAgICAgIGNvbnN0IG5vT2Zmc2V0UHJldlNpYmxpbmdJbmRleCA9IGdldE5vT2Zmc2V0SW5kZXgocHJldmlvdXNUTm9kZSk7XG4gICAgICAgICAgY29uc3Qgc2VnbWVudEhlYWQgPSBnZXRTZWdtZW50SGVhZChoeWRyYXRpb25JbmZvLCBub09mZnNldFByZXZTaWJsaW5nSW5kZXgpO1xuICAgICAgICAgIGlmIChwcmV2aW91c1ROb2RlLnR5cGUgPT09IFROb2RlVHlwZS5FbGVtZW50ICYmIHNlZ21lbnRIZWFkKSB7XG4gICAgICAgICAgICBjb25zdCBudW1Sb290Tm9kZXNUb1NraXAgPVxuICAgICAgICAgICAgICAgIGNhbGNTZXJpYWxpemVkQ29udGFpbmVyU2l6ZShoeWRyYXRpb25JbmZvLCBub09mZnNldFByZXZTaWJsaW5nSW5kZXgpO1xuICAgICAgICAgICAgLy8gYCsxYCBzdGFuZHMgZm9yIGFuIGFuY2hvciBjb21tZW50IG5vZGUgYWZ0ZXIgYWxsIHRoZSB2aWV3cyBpbiB0aGlzIGNvbnRhaW5lci5cbiAgICAgICAgICAgIGNvbnN0IG5vZGVzVG9Ta2lwID0gbnVtUm9vdE5vZGVzVG9Ta2lwICsgMTtcbiAgICAgICAgICAgIC8vIEZpcnN0IG5vZGUgYWZ0ZXIgdGhpcyBzZWdtZW50LlxuICAgICAgICAgICAgbmF0aXZlID0gc2libGluZ0FmdGVyKG5vZGVzVG9Ta2lwLCBzZWdtZW50SGVhZCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5hdGl2ZSA9IHByZXZpb3VzUkVsZW1lbnQubmV4dFNpYmxpbmc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBuYXRpdmUgYXMgVDtcbn1cblxuLyoqXG4gKiBTa2lwcyBvdmVyIGEgc3BlY2lmaWVkIG51bWJlciBvZiBub2RlcyBhbmQgcmV0dXJucyB0aGUgbmV4dCBzaWJsaW5nIG5vZGUgYWZ0ZXIgdGhhdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNpYmxpbmdBZnRlcjxUIGV4dGVuZHMgUk5vZGU+KHNraXA6IG51bWJlciwgZnJvbTogUk5vZGUpOiBUfG51bGwge1xuICBsZXQgY3VycmVudE5vZGUgPSBmcm9tO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNraXA7IGkrKykge1xuICAgIG5nRGV2TW9kZSAmJiB2YWxpZGF0ZVNpYmxpbmdOb2RlRXhpc3RzKGN1cnJlbnROb2RlKTtcbiAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHRTaWJsaW5nITtcbiAgfVxuICByZXR1cm4gY3VycmVudE5vZGUgYXMgVDtcbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gcHJvZHVjZSBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgbmF2aWdhdGlvbiBzdGVwc1xuICogKGluIHRlcm1zIG9mIGBuZXh0U2libGluZ2AgYW5kIGBmaXJzdENoaWxkYCBuYXZpZ2F0aW9ucykuIFVzZWQgaW4gZXJyb3JcbiAqIG1lc3NhZ2VzIGluIGRldiBtb2RlLlxuICovXG5mdW5jdGlvbiBzdHJpbmdpZnlOYXZpZ2F0aW9uSW5zdHJ1Y3Rpb25zKGluc3RydWN0aW9uczogKG51bWJlcnxOb2RlTmF2aWdhdGlvblN0ZXApW10pOiBzdHJpbmcge1xuICBjb25zdCBjb250YWluZXIgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnN0cnVjdGlvbnMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICBjb25zdCBzdGVwID0gaW5zdHJ1Y3Rpb25zW2ldO1xuICAgIGNvbnN0IHJlcGVhdCA9IGluc3RydWN0aW9uc1tpICsgMV0gYXMgbnVtYmVyO1xuICAgIGZvciAobGV0IHIgPSAwOyByIDwgcmVwZWF0OyByKyspIHtcbiAgICAgIGNvbnRhaW5lci5wdXNoKHN0ZXAgPT09IE5vZGVOYXZpZ2F0aW9uU3RlcC5GaXJzdENoaWxkID8gJ2ZpcnN0Q2hpbGQnIDogJ25leHRTaWJsaW5nJyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBjb250YWluZXIuam9pbignLicpO1xufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0aGF0IG5hdmlnYXRlcyBmcm9tIGEgc3RhcnRpbmcgcG9pbnQgbm9kZSAodGhlIGBmcm9tYCBub2RlKVxuICogdXNpbmcgcHJvdmlkZWQgc2V0IG9mIG5hdmlnYXRpb24gaW5zdHJ1Y3Rpb25zICh3aXRoaW4gYHBhdGhgIGFyZ3VtZW50KS5cbiAqL1xuZnVuY3Rpb24gbmF2aWdhdGVUb05vZGUoZnJvbTogTm9kZSwgaW5zdHJ1Y3Rpb25zOiAobnVtYmVyfE5vZGVOYXZpZ2F0aW9uU3RlcClbXSk6IFJOb2RlIHtcbiAgbGV0IG5vZGUgPSBmcm9tO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGluc3RydWN0aW9ucy5sZW5ndGg7IGkgKz0gMikge1xuICAgIGNvbnN0IHN0ZXAgPSBpbnN0cnVjdGlvbnNbaV07XG4gICAgY29uc3QgcmVwZWF0ID0gaW5zdHJ1Y3Rpb25zW2kgKyAxXSBhcyBudW1iZXI7XG4gICAgZm9yIChsZXQgciA9IDA7IHIgPCByZXBlYXQ7IHIrKykge1xuICAgICAgaWYgKG5nRGV2TW9kZSAmJiAhbm9kZSkge1xuICAgICAgICB0aHJvdyBub2RlTm90Rm91bmRBdFBhdGhFcnJvcihmcm9tLCBzdHJpbmdpZnlOYXZpZ2F0aW9uSW5zdHJ1Y3Rpb25zKGluc3RydWN0aW9ucykpO1xuICAgICAgfVxuICAgICAgc3dpdGNoIChzdGVwKSB7XG4gICAgICAgIGNhc2UgTm9kZU5hdmlnYXRpb25TdGVwLkZpcnN0Q2hpbGQ6XG4gICAgICAgICAgbm9kZSA9IG5vZGUuZmlyc3RDaGlsZCE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgTm9kZU5hdmlnYXRpb25TdGVwLk5leHRTaWJsaW5nOlxuICAgICAgICAgIG5vZGUgPSBub2RlLm5leHRTaWJsaW5nITtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKG5nRGV2TW9kZSAmJiAhbm9kZSkge1xuICAgIHRocm93IG5vZGVOb3RGb3VuZEF0UGF0aEVycm9yKGZyb20sIHN0cmluZ2lmeU5hdmlnYXRpb25JbnN0cnVjdGlvbnMoaW5zdHJ1Y3Rpb25zKSk7XG4gIH1cbiAgcmV0dXJuIG5vZGUgYXMgUk5vZGU7XG59XG5cbi8qKlxuICogTG9jYXRlcyBhbiBSTm9kZSBnaXZlbiBhIHNldCBvZiBuYXZpZ2F0aW9uIGluc3RydWN0aW9ucyAod2hpY2ggYWxzbyBjb250YWluc1xuICogYSBzdGFydGluZyBwb2ludCBub2RlIGluZm8pLlxuICovXG5mdW5jdGlvbiBsb2NhdGVSTm9kZUJ5UGF0aChwYXRoOiBzdHJpbmcsIGxWaWV3OiBMVmlldyk6IFJOb2RlIHtcbiAgY29uc3QgW3JlZmVyZW5jZU5vZGUsIC4uLm5hdmlnYXRpb25JbnN0cnVjdGlvbnNdID0gZGVjb21wcmVzc05vZGVMb2NhdGlvbihwYXRoKTtcbiAgbGV0IHJlZjogRWxlbWVudDtcbiAgaWYgKHJlZmVyZW5jZU5vZGUgPT09IFJFRkVSRU5DRV9OT0RFX0hPU1QpIHtcbiAgICByZWYgPSBsVmlld1tERUNMQVJBVElPTl9DT01QT05FTlRfVklFV11bSE9TVF0gYXMgdW5rbm93biBhcyBFbGVtZW50O1xuICB9IGVsc2UgaWYgKHJlZmVyZW5jZU5vZGUgPT09IFJFRkVSRU5DRV9OT0RFX0JPRFkpIHtcbiAgICByZWYgPSDJtcm1cmVzb2x2ZUJvZHkoXG4gICAgICAgIGxWaWV3W0RFQ0xBUkFUSU9OX0NPTVBPTkVOVF9WSUVXXVtIT1NUXSBhcyBSRWxlbWVudCAmIHtvd25lckRvY3VtZW50OiBEb2N1bWVudH0pO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IHBhcmVudEVsZW1lbnRJZCA9IE51bWJlcihyZWZlcmVuY2VOb2RlKTtcbiAgICByZWYgPSB1bndyYXBSTm9kZSgobFZpZXcgYXMgYW55KVtwYXJlbnRFbGVtZW50SWQgKyBIRUFERVJfT0ZGU0VUXSkgYXMgRWxlbWVudDtcbiAgfVxuICByZXR1cm4gbmF2aWdhdGVUb05vZGUocmVmLCBuYXZpZ2F0aW9uSW5zdHJ1Y3Rpb25zKTtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZSBhIGxpc3Qgb2YgRE9NIG5hdmlnYXRpb24gb3BlcmF0aW9ucyB0byBnZXQgZnJvbSBub2RlIGBzdGFydGAgdG8gbm9kZSBgZmluaXNoYC5cbiAqXG4gKiBOb3RlOiBhc3N1bWVzIHRoYXQgbm9kZSBgc3RhcnRgIG9jY3VycyBiZWZvcmUgbm9kZSBgZmluaXNoYCBpbiBhbiBpbi1vcmRlciB0cmF2ZXJzYWwgb2YgdGhlIERPTVxuICogdHJlZS4gVGhhdCBpcywgd2Ugc2hvdWxkIGJlIGFibGUgdG8gZ2V0IGZyb20gYHN0YXJ0YCB0byBgZmluaXNoYCBwdXJlbHkgYnkgdXNpbmcgYC5maXJzdENoaWxkYFxuICogYW5kIGAubmV4dFNpYmxpbmdgIG9wZXJhdGlvbnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBuYXZpZ2F0ZUJldHdlZW4oc3RhcnQ6IE5vZGUsIGZpbmlzaDogTm9kZSk6IE5vZGVOYXZpZ2F0aW9uU3RlcFtdfG51bGwge1xuICBpZiAoc3RhcnQgPT09IGZpbmlzaCkge1xuICAgIHJldHVybiBbXTtcbiAgfSBlbHNlIGlmIChzdGFydC5wYXJlbnRFbGVtZW50ID09IG51bGwgfHwgZmluaXNoLnBhcmVudEVsZW1lbnQgPT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9IGVsc2UgaWYgKHN0YXJ0LnBhcmVudEVsZW1lbnQgPT09IGZpbmlzaC5wYXJlbnRFbGVtZW50KSB7XG4gICAgcmV0dXJuIG5hdmlnYXRlQmV0d2VlblNpYmxpbmdzKHN0YXJ0LCBmaW5pc2gpO1xuICB9IGVsc2Uge1xuICAgIC8vIGBmaW5pc2hgIGlzIGEgY2hpbGQgb2YgaXRzIHBhcmVudCwgc28gdGhlIHBhcmVudCB3aWxsIGFsd2F5cyBoYXZlIGEgY2hpbGQuXG4gICAgY29uc3QgcGFyZW50ID0gZmluaXNoLnBhcmVudEVsZW1lbnQhO1xuXG4gICAgY29uc3QgcGFyZW50UGF0aCA9IG5hdmlnYXRlQmV0d2VlbihzdGFydCwgcGFyZW50KTtcbiAgICBjb25zdCBjaGlsZFBhdGggPSBuYXZpZ2F0ZUJldHdlZW4ocGFyZW50LmZpcnN0Q2hpbGQhLCBmaW5pc2gpO1xuICAgIGlmICghcGFyZW50UGF0aCB8fCAhY2hpbGRQYXRoKSByZXR1cm4gbnVsbDtcblxuICAgIHJldHVybiBbXG4gICAgICAvLyBGaXJzdCBuYXZpZ2F0ZSB0byBgZmluaXNoYCdzIHBhcmVudFxuICAgICAgLi4ucGFyZW50UGF0aCxcbiAgICAgIC8vIFRoZW4gdG8gaXRzIGZpcnN0IGNoaWxkLlxuICAgICAgTm9kZU5hdmlnYXRpb25TdGVwLkZpcnN0Q2hpbGQsXG4gICAgICAvLyBBbmQgZmluYWxseSBmcm9tIHRoYXQgbm9kZSB0byBgZmluaXNoYCAobWF5YmUgYSBuby1vcCBpZiB3ZSdyZSBhbHJlYWR5IHRoZXJlKS5cbiAgICAgIC4uLmNoaWxkUGF0aCxcbiAgICBdO1xuICB9XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyBhIHBhdGggYmV0d2VlbiAyIHNpYmxpbmcgbm9kZXMgKGdlbmVyYXRlcyBhIG51bWJlciBvZiBgTmV4dFNpYmxpbmdgIG5hdmlnYXRpb25zKS5cbiAqIFJldHVybnMgYG51bGxgIGlmIG5vIHN1Y2ggcGF0aCBleGlzdHMgYmV0d2VlbiB0aGUgZ2l2ZW4gbm9kZXMuXG4gKi9cbmZ1bmN0aW9uIG5hdmlnYXRlQmV0d2VlblNpYmxpbmdzKHN0YXJ0OiBOb2RlLCBmaW5pc2g6IE5vZGUpOiBOb2RlTmF2aWdhdGlvblN0ZXBbXXxudWxsIHtcbiAgY29uc3QgbmF2OiBOb2RlTmF2aWdhdGlvblN0ZXBbXSA9IFtdO1xuICBsZXQgbm9kZTogTm9kZXxudWxsID0gbnVsbDtcbiAgZm9yIChub2RlID0gc3RhcnQ7IG5vZGUgIT0gbnVsbCAmJiBub2RlICE9PSBmaW5pc2g7IG5vZGUgPSBub2RlLm5leHRTaWJsaW5nKSB7XG4gICAgbmF2LnB1c2goTm9kZU5hdmlnYXRpb25TdGVwLk5leHRTaWJsaW5nKTtcbiAgfVxuICAvLyBJZiB0aGUgYG5vZGVgIGJlY29tZXMgYG51bGxgIG9yIGB1bmRlZmluZWRgIGF0IHRoZSBlbmQsIHRoYXQgbWVhbnMgdGhhdCB3ZVxuICAvLyBkaWRuJ3QgZmluZCB0aGUgYGVuZGAgbm9kZSwgdGh1cyByZXR1cm4gYG51bGxgICh3aGljaCB3b3VsZCB0cmlnZ2VyIHNlcmlhbGl6YXRpb25cbiAgLy8gZXJyb3IgdG8gYmUgcHJvZHVjZWQpLlxuICByZXR1cm4gbm9kZSA9PSBudWxsID8gbnVsbCA6IG5hdjtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIGEgcGF0aCBiZXR3ZWVuIDIgbm9kZXMgaW4gdGVybXMgb2YgYG5leHRTaWJsaW5nYCBhbmQgYGZpcnN0Q2hpbGRgXG4gKiBuYXZpZ2F0aW9uczpcbiAqIC0gdGhlIGBmcm9tYCBub2RlIGlzIGEga25vd24gbm9kZSwgdXNlZCBhcyBhbiBzdGFydGluZyBwb2ludCBmb3IgdGhlIGxvb2t1cFxuICogICAodGhlIGBmcm9tTm9kZU5hbWVgIGFyZ3VtZW50IGlzIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBub2RlKS5cbiAqIC0gdGhlIGB0b2Agbm9kZSBpcyBhIG5vZGUgdGhhdCB0aGUgcnVudGltZSBsb2dpYyB3b3VsZCBiZSBsb29raW5nIHVwLFxuICogICB1c2luZyB0aGUgcGF0aCBnZW5lcmF0ZWQgYnkgdGhpcyBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbGNQYXRoQmV0d2Vlbihmcm9tOiBOb2RlLCB0bzogTm9kZSwgZnJvbU5vZGVOYW1lOiBzdHJpbmcpOiBzdHJpbmd8bnVsbCB7XG4gIGNvbnN0IHBhdGggPSBuYXZpZ2F0ZUJldHdlZW4oZnJvbSwgdG8pO1xuICByZXR1cm4gcGF0aCA9PT0gbnVsbCA/IG51bGwgOiBjb21wcmVzc05vZGVMb2NhdGlvbihmcm9tTm9kZU5hbWUsIHBhdGgpO1xufVxuXG4vKipcbiAqIEludm9rZWQgYXQgc2VyaWFsaXphdGlvbiB0aW1lIChvbiB0aGUgc2VydmVyKSB3aGVuIGEgc2V0IG9mIG5hdmlnYXRpb25cbiAqIGluc3RydWN0aW9ucyBuZWVkcyB0byBiZSBnZW5lcmF0ZWQgZm9yIGEgVE5vZGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWxjUGF0aEZvck5vZGUodE5vZGU6IFROb2RlLCBsVmlldzogTFZpZXcpOiBzdHJpbmcge1xuICBsZXQgcGFyZW50VE5vZGUgPSB0Tm9kZS5wYXJlbnQ7XG4gIGxldCBwYXJlbnRJbmRleDogbnVtYmVyfHN0cmluZztcbiAgbGV0IHBhcmVudFJOb2RlOiBSTm9kZTtcbiAgbGV0IHJlZmVyZW5jZU5vZGVOYW1lOiBzdHJpbmc7XG5cbiAgLy8gU2tpcCBvdmVyIGFsbCBwYXJlbnQgbm9kZXMgdGhhdCBhcmUgZGlzY29ubmVjdGVkIGZyb20gdGhlIERPTSwgc3VjaCBub2Rlc1xuICAvLyBjYW4gbm90IGJlIHVzZWQgYXMgYW5jaG9ycy5cbiAgLy9cbiAgLy8gVGhpcyBtaWdodCBoYXBwZW4gaW4gY2VydGFpbiBjb250ZW50IHByb2plY3Rpb24tYmFzZWQgdXNlLWNhc2VzLCB3aGVyZVxuICAvLyBhIGNvbnRlbnQgb2YgYW4gZWxlbWVudCBpcyBwcm9qZWN0ZWQgYW5kIHVzZWQsIHdoZW4gYSBwYXJlbnQgZWxlbWVudFxuICAvLyBpdHNlbGYgcmVtYWlucyBkZXRhY2hlZCBmcm9tIERPTS4gSW4gdGhpcyBzY2VuYXJpbyB3ZSB0cnkgdG8gZmluZCBhIHBhcmVudFxuICAvLyBlbGVtZW50IHRoYXQgaXMgYXR0YWNoZWQgdG8gRE9NIGFuZCBjYW4gYWN0IGFzIGFuIGFuY2hvciBpbnN0ZWFkLlxuICB3aGlsZSAocGFyZW50VE5vZGUgIT09IG51bGwgJiYgaXNEaXNjb25uZWN0ZWROb2RlKHBhcmVudFROb2RlLCBsVmlldykpIHtcbiAgICBwYXJlbnRUTm9kZSA9IHBhcmVudFROb2RlLnBhcmVudDtcbiAgfVxuXG4gIGlmIChwYXJlbnRUTm9kZSA9PT0gbnVsbCB8fCAhKHBhcmVudFROb2RlLnR5cGUgJiBUTm9kZVR5cGUuQW55Uk5vZGUpKSB7XG4gICAgLy8gSWYgdGhlcmUgaXMgbm8gcGFyZW50IFROb2RlIG9yIGEgcGFyZW50IFROb2RlIGRvZXMgbm90IHJlcHJlc2VudCBhbiBSTm9kZVxuICAgIC8vIChpLmUuIG5vdCBhIERPTSBub2RlKSwgdXNlIGNvbXBvbmVudCBob3N0IGVsZW1lbnQgYXMgYSByZWZlcmVuY2Ugbm9kZS5cbiAgICBwYXJlbnRJbmRleCA9IHJlZmVyZW5jZU5vZGVOYW1lID0gUkVGRVJFTkNFX05PREVfSE9TVDtcbiAgICBwYXJlbnRSTm9kZSA9IGxWaWV3W0RFQ0xBUkFUSU9OX0NPTVBPTkVOVF9WSUVXXVtIT1NUXSE7XG4gIH0gZWxzZSB7XG4gICAgLy8gVXNlIHBhcmVudCBUTm9kZSBhcyBhIHJlZmVyZW5jZSBub2RlLlxuICAgIHBhcmVudEluZGV4ID0gcGFyZW50VE5vZGUuaW5kZXg7XG4gICAgcGFyZW50Uk5vZGUgPSB1bndyYXBSTm9kZShsVmlld1twYXJlbnRJbmRleF0pO1xuICAgIHJlZmVyZW5jZU5vZGVOYW1lID0gcmVuZGVyU3RyaW5naWZ5KHBhcmVudEluZGV4IC0gSEVBREVSX09GRlNFVCk7XG4gIH1cbiAgbGV0IHJOb2RlID0gdW53cmFwUk5vZGUobFZpZXdbdE5vZGUuaW5kZXhdKTtcbiAgaWYgKHROb2RlLnR5cGUgJiBUTm9kZVR5cGUuQW55Q29udGFpbmVyKSB7XG4gICAgLy8gRm9yIDxuZy1jb250YWluZXI+IG5vZGVzLCBpbnN0ZWFkIG9mIHNlcmlhbGl6aW5nIGEgcmVmZXJlbmNlXG4gICAgLy8gdG8gdGhlIGFuY2hvciBjb21tZW50IG5vZGUsIHNlcmlhbGl6ZSBhIGxvY2F0aW9uIG9mIHRoZSBmaXJzdFxuICAgIC8vIERPTSBlbGVtZW50LiBQYWlyZWQgd2l0aCB0aGUgY29udGFpbmVyIHNpemUgKHNlcmlhbGl6ZWQgYXMgYSBwYXJ0XG4gICAgLy8gb2YgYG5naC5jb250YWluZXJzYCksIGl0IHNob3VsZCBnaXZlIGVub3VnaCBpbmZvcm1hdGlvbiBmb3IgcnVudGltZVxuICAgIC8vIHRvIGh5ZHJhdGUgbm9kZXMgaW4gdGhpcyBjb250YWluZXIuXG4gICAgY29uc3QgZmlyc3RSTm9kZSA9IGdldEZpcnN0TmF0aXZlTm9kZShsVmlldywgdE5vZGUpO1xuXG4gICAgLy8gSWYgY29udGFpbmVyIGlzIG5vdCBlbXB0eSwgdXNlIGEgcmVmZXJlbmNlIHRvIHRoZSBmaXJzdCBlbGVtZW50LFxuICAgIC8vIG90aGVyd2lzZSwgck5vZGUgd291bGQgcG9pbnQgdG8gYW4gYW5jaG9yIGNvbW1lbnQgbm9kZS5cbiAgICBpZiAoZmlyc3RSTm9kZSkge1xuICAgICAgck5vZGUgPSBmaXJzdFJOb2RlO1xuICAgIH1cbiAgfVxuICBsZXQgcGF0aDogc3RyaW5nfG51bGwgPSBjYWxjUGF0aEJldHdlZW4ocGFyZW50Uk5vZGUgYXMgTm9kZSwgck5vZGUgYXMgTm9kZSwgcmVmZXJlbmNlTm9kZU5hbWUpO1xuICBpZiAocGF0aCA9PT0gbnVsbCAmJiBwYXJlbnRSTm9kZSAhPT0gck5vZGUpIHtcbiAgICAvLyBTZWFyY2hpbmcgZm9yIGEgcGF0aCBiZXR3ZWVuIGVsZW1lbnRzIHdpdGhpbiBhIGhvc3Qgbm9kZSBmYWlsZWQuXG4gICAgLy8gVHJ5aW5nIHRvIGZpbmQgYSBwYXRoIHRvIGFuIGVsZW1lbnQgc3RhcnRpbmcgZnJvbSB0aGUgYGRvY3VtZW50LmJvZHlgIGluc3RlYWQuXG4gICAgLy9cbiAgICAvLyBJbXBvcnRhbnQgbm90ZTogdGhpcyB0eXBlIG9mIHJlZmVyZW5jZSBpcyByZWxhdGl2ZWx5IHVuc3RhYmxlLCBzaW5jZSBBbmd1bGFyXG4gICAgLy8gbWF5IG5vdCBiZSBhYmxlIHRvIGNvbnRyb2wgcGFydHMgb2YgdGhlIHBhZ2UgdGhhdCB0aGUgcnVudGltZSBsb2dpYyBuYXZpZ2F0ZXNcbiAgICAvLyB0aHJvdWdoLiBUaGlzIGlzIG1vc3RseSBuZWVkZWQgdG8gY292ZXIgXCJwb3J0YWxzXCIgdXNlLWNhc2UgKGxpa2UgbWVudXMsIGRpYWxvZyBib3hlcyxcbiAgICAvLyBldGMpLCB3aGVyZSBub2RlcyBhcmUgY29udGVudC1wcm9qZWN0ZWQgKGluY2x1ZGluZyBkaXJlY3QgRE9NIG1hbmlwdWxhdGlvbnMpIG91dHNpZGVcbiAgICAvLyBvZiB0aGUgaG9zdCBub2RlLiBUaGUgYmV0dGVyIHNvbHV0aW9uIGlzIHRvIHByb3ZpZGUgQVBJcyB0byB3b3JrIHdpdGggXCJwb3J0YWxzXCIsXG4gICAgLy8gYXQgd2hpY2ggcG9pbnQgdGhpcyBjb2RlIHBhdGggd291bGQgbm90IGJlIG5lZWRlZC5cbiAgICBjb25zdCBib2R5ID0gKHBhcmVudFJOb2RlIGFzIE5vZGUpLm93bmVyRG9jdW1lbnQhLmJvZHkgYXMgTm9kZTtcbiAgICBwYXRoID0gY2FsY1BhdGhCZXR3ZWVuKGJvZHksIHJOb2RlIGFzIE5vZGUsIFJFRkVSRU5DRV9OT0RFX0JPRFkpO1xuXG4gICAgaWYgKHBhdGggPT09IG51bGwpIHtcbiAgICAgIC8vIElmIHRoZSBwYXRoIGlzIHN0aWxsIGVtcHR5LCBpdCdzIGxpa2VseSB0aGF0IHRoaXMgbm9kZSBpcyBkZXRhY2hlZCBhbmRcbiAgICAgIC8vIHdvbid0IGJlIGZvdW5kIGR1cmluZyBoeWRyYXRpb24uXG4gICAgICB0aHJvdyBub2RlTm90Rm91bmRFcnJvcihsVmlldywgdE5vZGUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcGF0aCE7XG59XG4iXX0=