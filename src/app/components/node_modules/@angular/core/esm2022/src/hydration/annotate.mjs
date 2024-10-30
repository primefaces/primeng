/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ViewEncapsulation } from '../metadata';
import { collectNativeNodes, collectNativeNodesInLContainer } from '../render3/collect_native_nodes';
import { getComponentDef } from '../render3/definition';
import { CONTAINER_HEADER_OFFSET } from '../render3/interfaces/container';
import { isTNodeShape } from '../render3/interfaces/node';
import { hasI18n, isComponentHost, isLContainer, isProjectionTNode, isRootView } from '../render3/interfaces/type_checks';
import { CONTEXT, HEADER_OFFSET, HOST, PARENT, RENDERER, TVIEW } from '../render3/interfaces/view';
import { unwrapLView, unwrapRNode } from '../render3/util/view_utils';
import { TransferState } from '../transfer_state';
import { isI18nHydrationSupportEnabled } from './api';
import { unsupportedProjectionOfDomNodes } from './error_handling';
import { CONTAINERS, DISCONNECTED_NODES, ELEMENT_CONTAINERS, MULTIPLIER, NODES, NUM_ROOT_NODES, TEMPLATE_ID, TEMPLATES } from './interfaces';
import { calcPathForNode, isDisconnectedNode } from './node_lookup_utils';
import { isInSkipHydrationBlock, SKIP_HYDRATION_ATTR_NAME } from './skip_hydration';
import { getLNodeForHydration, NGH_ATTR_NAME, NGH_DATA_KEY } from './utils';
/**
 * A collection that tracks all serialized views (`ngh` DOM annotations)
 * to avoid duplication. An attempt to add a duplicate view results in the
 * collection returning the index of the previously collected serialized view.
 * This reduces the number of annotations needed for a given page.
 */
class SerializedViewCollection {
    constructor() {
        this.views = [];
        this.indexByContent = new Map();
    }
    add(serializedView) {
        const viewAsString = JSON.stringify(serializedView);
        if (!this.indexByContent.has(viewAsString)) {
            const index = this.views.length;
            this.views.push(serializedView);
            this.indexByContent.set(viewAsString, index);
            return index;
        }
        return this.indexByContent.get(viewAsString);
    }
    getAll() {
        return this.views;
    }
}
/**
 * Global counter that is used to generate a unique id for TViews
 * during the serialization process.
 */
let tViewSsrId = 0;
/**
 * Generates a unique id for a given TView and returns this id.
 * The id is also stored on this instance of a TView and reused in
 * subsequent calls.
 *
 * This id is needed to uniquely identify and pick up dehydrated views
 * at runtime.
 */
function getSsrId(tView) {
    if (!tView.ssrId) {
        tView.ssrId = `t${tViewSsrId++}`;
    }
    return tView.ssrId;
}
/**
 * Computes the number of root nodes in a given view
 * (or child nodes in a given container if a tNode is provided).
 */
function calcNumRootNodes(tView, lView, tNode) {
    const rootNodes = [];
    collectNativeNodes(tView, lView, tNode, rootNodes);
    return rootNodes.length;
}
/**
 * Computes the number of root nodes in all views in a given LContainer.
 */
function calcNumRootNodesInLContainer(lContainer) {
    const rootNodes = [];
    collectNativeNodesInLContainer(lContainer, rootNodes);
    return rootNodes.length;
}
/**
 * Annotates root level component's LView for hydration,
 * see `annotateHostElementForHydration` for additional information.
 */
function annotateComponentLViewForHydration(lView, context) {
    const hostElement = lView[HOST];
    // Root elements might also be annotated with the `ngSkipHydration` attribute,
    // check if it's present before starting the serialization process.
    if (hostElement && !hostElement.hasAttribute(SKIP_HYDRATION_ATTR_NAME)) {
        return annotateHostElementForHydration(hostElement, lView, context);
    }
    return null;
}
/**
 * Annotates root level LContainer for hydration. This happens when a root component
 * injects ViewContainerRef, thus making the component an anchor for a view container.
 * This function serializes the component itself as well as all views from the view
 * container.
 */
function annotateLContainerForHydration(lContainer, context) {
    const componentLView = unwrapLView(lContainer[HOST]);
    // Serialize the root component itself.
    const componentLViewNghIndex = annotateComponentLViewForHydration(componentLView, context);
    const hostElement = unwrapRNode(componentLView[HOST]);
    // Serialize all views within this view container.
    const rootLView = lContainer[PARENT];
    const rootLViewNghIndex = annotateHostElementForHydration(hostElement, rootLView, context);
    const renderer = componentLView[RENDERER];
    // For cases when a root component also acts as an anchor node for a ViewContainerRef
    // (for example, when ViewContainerRef is injected in a root component), there is a need
    // to serialize information about the component itself, as well as an LContainer that
    // represents this ViewContainerRef. Effectively, we need to serialize 2 pieces of info:
    // (1) hydration info for the root component itself and (2) hydration info for the
    // ViewContainerRef instance (an LContainer). Each piece of information is included into
    // the hydration data (in the TransferState object) separately, thus we end up with 2 ids.
    // Since we only have 1 root element, we encode both bits of info into a single string:
    // ids are separated by the `|` char (e.g. `10|25`, where `10` is the ngh for a component view
    // and 25 is the `ngh` for a root view which holds LContainer).
    const finalIndex = `${componentLViewNghIndex}|${rootLViewNghIndex}`;
    renderer.setAttribute(hostElement, NGH_ATTR_NAME, finalIndex);
}
/**
 * Annotates all components bootstrapped in a given ApplicationRef
 * with info needed for hydration.
 *
 * @param appRef An instance of an ApplicationRef.
 * @param doc A reference to the current Document instance.
 */
export function annotateForHydration(appRef, doc) {
    const serializedViewCollection = new SerializedViewCollection();
    const corruptedTextNodes = new Map();
    const viewRefs = appRef._views;
    for (const viewRef of viewRefs) {
        const lNode = getLNodeForHydration(viewRef);
        // An `lView` might be `null` if a `ViewRef` represents
        // an embedded view (not a component view).
        if (lNode !== null) {
            const context = {
                serializedViewCollection,
                corruptedTextNodes,
            };
            if (isLContainer(lNode)) {
                annotateLContainerForHydration(lNode, context);
            }
            else {
                annotateComponentLViewForHydration(lNode, context);
            }
            insertCorruptedTextNodeMarkers(corruptedTextNodes, doc);
        }
    }
    // Note: we *always* include hydration info key and a corresponding value
    // into the TransferState, even if the list of serialized views is empty.
    // This is needed as a signal to the client that the server part of the
    // hydration logic was setup and enabled correctly. Otherwise, if a client
    // hydration doesn't find a key in the transfer state - an error is produced.
    const serializedViews = serializedViewCollection.getAll();
    const transferState = appRef.injector.get(TransferState);
    transferState.set(NGH_DATA_KEY, serializedViews);
}
/**
 * Serializes the lContainer data into a list of SerializedView objects,
 * that represent views within this lContainer.
 *
 * @param lContainer the lContainer we are serializing
 * @param context the hydration context
 * @returns an array of the `SerializedView` objects
 */
function serializeLContainer(lContainer, context) {
    const views = [];
    let lastViewAsString = '';
    for (let i = CONTAINER_HEADER_OFFSET; i < lContainer.length; i++) {
        let childLView = lContainer[i];
        let template;
        let numRootNodes;
        let serializedView;
        if (isRootView(childLView)) {
            // If this is a root view, get an LView for the underlying component,
            // because it contains information about the view to serialize.
            childLView = childLView[HEADER_OFFSET];
            // If we have an LContainer at this position, this indicates that the
            // host element was used as a ViewContainerRef anchor (e.g. a `ViewContainerRef`
            // was injected within the component class). This case requires special handling.
            if (isLContainer(childLView)) {
                // Calculate the number of root nodes in all views in a given container
                // and increment by one to account for an anchor node itself, i.e. in this
                // scenario we'll have a layout that would look like this:
                // `<app-root /><#VIEW1><#VIEW2>...<!--container-->`
                // The `+1` is to capture the `<app-root />` element.
                numRootNodes = calcNumRootNodesInLContainer(childLView) + 1;
                annotateLContainerForHydration(childLView, context);
                const componentLView = unwrapLView(childLView[HOST]);
                serializedView = {
                    [TEMPLATE_ID]: componentLView[TVIEW].ssrId,
                    [NUM_ROOT_NODES]: numRootNodes,
                };
            }
        }
        if (!serializedView) {
            const childTView = childLView[TVIEW];
            if (childTView.type === 1 /* TViewType.Component */) {
                template = childTView.ssrId;
                // This is a component view, thus it has only 1 root node: the component
                // host node itself (other nodes would be inside that host node).
                numRootNodes = 1;
            }
            else {
                template = getSsrId(childTView);
                numRootNodes = calcNumRootNodes(childTView, childLView, childTView.firstChild);
            }
            serializedView = {
                [TEMPLATE_ID]: template,
                [NUM_ROOT_NODES]: numRootNodes,
                ...serializeLView(lContainer[i], context),
            };
        }
        // Check if the previous view has the same shape (for example, it was
        // produced by the *ngFor), in which case bump the counter on the previous
        // view instead of including the same information again.
        const currentViewAsString = JSON.stringify(serializedView);
        if (views.length > 0 && currentViewAsString === lastViewAsString) {
            const previousView = views[views.length - 1];
            previousView[MULTIPLIER] ??= 1;
            previousView[MULTIPLIER]++;
        }
        else {
            // Record this view as most recently added.
            lastViewAsString = currentViewAsString;
            views.push(serializedView);
        }
    }
    return views;
}
/**
 * Helper function to produce a node path (which navigation steps runtime logic
 * needs to take to locate a node) and stores it in the `NODES` section of the
 * current serialized view.
 */
function appendSerializedNodePath(ngh, tNode, lView) {
    const noOffsetIndex = tNode.index - HEADER_OFFSET;
    ngh[NODES] ??= {};
    ngh[NODES][noOffsetIndex] = calcPathForNode(tNode, lView);
}
/**
 * Helper function to append information about a disconnected node.
 * This info is needed at runtime to avoid DOM lookups for this element
 * and instead, the element would be created from scratch.
 */
function appendDisconnectedNodeIndex(ngh, tNode) {
    const noOffsetIndex = tNode.index - HEADER_OFFSET;
    ngh[DISCONNECTED_NODES] ??= [];
    if (!ngh[DISCONNECTED_NODES].includes(noOffsetIndex)) {
        ngh[DISCONNECTED_NODES].push(noOffsetIndex);
    }
}
/**
 * Serializes the lView data into a SerializedView object that will later be added
 * to the TransferState storage and referenced using the `ngh` attribute on a host
 * element.
 *
 * @param lView the lView we are serializing
 * @param context the hydration context
 * @returns the `SerializedView` object containing the data to be added to the host node
 */
function serializeLView(lView, context) {
    const ngh = {};
    const tView = lView[TVIEW];
    // Iterate over DOM element references in an LView.
    for (let i = HEADER_OFFSET; i < tView.bindingStartIndex; i++) {
        const tNode = tView.data[i];
        const noOffsetIndex = i - HEADER_OFFSET;
        // Skip processing of a given slot in the following cases:
        // - Local refs (e.g. <div #localRef>) take up an extra slot in LViews
        //   to store the same element. In this case, there is no information in
        //   a corresponding slot in TNode data structure.
        // - When a slot contains something other than a TNode. For example, there
        //   might be some metadata information about a defer block or a control flow block.
        if (!isTNodeShape(tNode)) {
            continue;
        }
        // Check if a native node that represents a given TNode is disconnected from the DOM tree.
        // Such nodes must be excluded from the hydration (since the hydration won't be able to
        // find them), so the TNode ids are collected and used at runtime to skip the hydration.
        //
        // This situation may happen during the content projection, when some nodes don't make it
        // into one of the content projection slots (for example, when there is no default
        // <ng-content /> slot in projector component's template).
        if (isDisconnectedNode(tNode, lView) && isContentProjectedNode(tNode)) {
            appendDisconnectedNodeIndex(ngh, tNode);
            continue;
        }
        if (Array.isArray(tNode.projection)) {
            for (const projectionHeadTNode of tNode.projection) {
                // We may have `null`s in slots with no projected content.
                if (!projectionHeadTNode)
                    continue;
                if (!Array.isArray(projectionHeadTNode)) {
                    // If we process re-projected content (i.e. `<ng-content>`
                    // appears at projection location), skip annotations for this content
                    // since all DOM nodes in this projection were handled while processing
                    // a parent lView, which contains those nodes.
                    if (!isProjectionTNode(projectionHeadTNode) &&
                        !isInSkipHydrationBlock(projectionHeadTNode)) {
                        if (isDisconnectedNode(projectionHeadTNode, lView)) {
                            // Check whether this node is connected, since we may have a TNode
                            // in the data structure as a projection segment head, but the
                            // content projection slot might be disabled (e.g.
                            // <ng-content *ngIf="false" />).
                            appendDisconnectedNodeIndex(ngh, projectionHeadTNode);
                        }
                        else {
                            appendSerializedNodePath(ngh, projectionHeadTNode, lView);
                        }
                    }
                }
                else {
                    // If a value is an array, it means that we are processing a projection
                    // where projectable nodes were passed in as DOM nodes (for example, when
                    // calling `ViewContainerRef.createComponent(CmpA, {projectableNodes: [...]})`).
                    //
                    // In this scenario, nodes can come from anywhere (either created manually,
                    // accessed via `document.querySelector`, etc) and may be in any state
                    // (attached or detached from the DOM tree). As a result, we can not reliably
                    // restore the state for such cases during hydration.
                    throw unsupportedProjectionOfDomNodes(unwrapRNode(lView[i]));
                }
            }
        }
        conditionallyAnnotateNodePath(ngh, tNode, lView);
        if (isLContainer(lView[i])) {
            // Serialize information about a template.
            const embeddedTView = tNode.tView;
            if (embeddedTView !== null) {
                ngh[TEMPLATES] ??= {};
                ngh[TEMPLATES][noOffsetIndex] = getSsrId(embeddedTView);
            }
            // Serialize views within this LContainer.
            const hostNode = lView[i][HOST]; // host node of this container
            // LView[i][HOST] can be of 2 different types:
            // - either a DOM node
            // - or an array that represents an LView of a component
            if (Array.isArray(hostNode)) {
                // This is a component, serialize info about it.
                const targetNode = unwrapRNode(hostNode);
                if (!targetNode.hasAttribute(SKIP_HYDRATION_ATTR_NAME)) {
                    annotateHostElementForHydration(targetNode, hostNode, context);
                }
            }
            ngh[CONTAINERS] ??= {};
            ngh[CONTAINERS][noOffsetIndex] = serializeLContainer(lView[i], context);
        }
        else if (Array.isArray(lView[i])) {
            // This is a component, annotate the host node with an `ngh` attribute.
            const targetNode = unwrapRNode(lView[i][HOST]);
            if (!targetNode.hasAttribute(SKIP_HYDRATION_ATTR_NAME)) {
                annotateHostElementForHydration(targetNode, lView[i], context);
            }
        }
        else {
            // <ng-container> case
            if (tNode.type & 8 /* TNodeType.ElementContainer */) {
                // An <ng-container> is represented by the number of
                // top-level nodes. This information is needed to skip over
                // those nodes to reach a corresponding anchor node (comment node).
                ngh[ELEMENT_CONTAINERS] ??= {};
                ngh[ELEMENT_CONTAINERS][noOffsetIndex] = calcNumRootNodes(tView, lView, tNode.child);
            }
            else if (tNode.type & 16 /* TNodeType.Projection */) {
                // Current TNode represents an `<ng-content>` slot, thus it has no
                // DOM elements associated with it, so the **next sibling** node would
                // not be able to find an anchor. In this case, use full path instead.
                let nextTNode = tNode.next;
                // Skip over all `<ng-content>` slots in a row.
                while (nextTNode !== null && (nextTNode.type & 16 /* TNodeType.Projection */)) {
                    nextTNode = nextTNode.next;
                }
                if (nextTNode && !isInSkipHydrationBlock(nextTNode)) {
                    // Handle a tNode after the `<ng-content>` slot.
                    appendSerializedNodePath(ngh, nextTNode, lView);
                }
            }
            else {
                // Handle cases where text nodes can be lost after DOM serialization:
                //  1. When there is an *empty text node* in DOM: in this case, this
                //     node would not make it into the serialized string and as a result,
                //     this node wouldn't be created in a browser. This would result in
                //     a mismatch during the hydration, where the runtime logic would expect
                //     a text node to be present in live DOM, but no text node would exist.
                //     Example: `<span>{{ name }}</span>` when the `name` is an empty string.
                //     This would result in `<span></span>` string after serialization and
                //     in a browser only the `span` element would be created. To resolve that,
                //     an extra comment node is appended in place of an empty text node and
                //     that special comment node is replaced with an empty text node *before*
                //     hydration.
                //  2. When there are 2 consecutive text nodes present in the DOM.
                //     Example: `<div>Hello <ng-container *ngIf="true">world</ng-container></div>`.
                //     In this scenario, the live DOM would look like this:
                //       <div>#text('Hello ') #text('world') #comment('container')</div>
                //     Serialized string would look like this: `<div>Hello world<!--container--></div>`.
                //     The live DOM in a browser after that would be:
                //       <div>#text('Hello world') #comment('container')</div>
                //     Notice how 2 text nodes are now "merged" into one. This would cause hydration
                //     logic to fail, since it'd expect 2 text nodes being present, not one.
                //     To fix this, we insert a special comment node in between those text nodes, so
                //     serialized representation is: `<div>Hello <!--ngtns-->world<!--container--></div>`.
                //     This forces browser to create 2 text nodes separated by a comment node.
                //     Before running a hydration process, this special comment node is removed, so the
                //     live DOM has exactly the same state as it was before serialization.
                if (tNode.type & 1 /* TNodeType.Text */) {
                    const rNode = unwrapRNode(lView[i]);
                    // Collect this node as required special annotation only when its
                    // contents is empty. Otherwise, such text node would be present on
                    // the client after server-side rendering and no special handling needed.
                    if (rNode.textContent === '') {
                        context.corruptedTextNodes.set(rNode, "ngetn" /* TextNodeMarker.EmptyNode */);
                    }
                    else if (rNode.nextSibling?.nodeType === Node.TEXT_NODE) {
                        context.corruptedTextNodes.set(rNode, "ngtns" /* TextNodeMarker.Separator */);
                    }
                }
            }
        }
    }
    return ngh;
}
/**
 * Serializes node location in cases when it's needed, specifically:
 *
 *  1. If `tNode.projectionNext` is different from `tNode.next` - it means that
 *     the next `tNode` after projection is different from the one in the original
 *     template. Since hydration relies on `tNode.next`, this serialized info
 *     if required to help runtime code find the node at the correct location.
 *  2. In certain content projection-based use-cases, it's possible that only
 *     a content of a projected element is rendered. In this case, content nodes
 *     require an extra annotation, since runtime logic can't rely on parent-child
 *     connection to identify the location of a node.
 */
function conditionallyAnnotateNodePath(ngh, tNode, lView) {
    // Handle case #1 described above.
    if (tNode.projectionNext && tNode.projectionNext !== tNode.next &&
        !isInSkipHydrationBlock(tNode.projectionNext)) {
        appendSerializedNodePath(ngh, tNode.projectionNext, lView);
    }
    // Handle case #2 described above.
    // Note: we only do that for the first node (i.e. when `tNode.prev === null`),
    // the rest of the nodes would rely on the current node location, so no extra
    // annotation is needed.
    if (tNode.prev === null && tNode.parent !== null && isDisconnectedNode(tNode.parent, lView) &&
        !isDisconnectedNode(tNode, lView)) {
        appendSerializedNodePath(ngh, tNode, lView);
    }
}
/**
 * Determines whether a component instance that is represented
 * by a given LView uses `ViewEncapsulation.ShadowDom`.
 */
function componentUsesShadowDomEncapsulation(lView) {
    const instance = lView[CONTEXT];
    return instance?.constructor ?
        getComponentDef(instance.constructor)?.encapsulation === ViewEncapsulation.ShadowDom :
        false;
}
/**
 * Annotates component host element for hydration:
 * - by either adding the `ngh` attribute and collecting hydration-related info
 *   for the serialization and transferring to the client
 * - or by adding the `ngSkipHydration` attribute in case Angular detects that
 *   component contents is not compatible with hydration.
 *
 * @param element The Host element to be annotated
 * @param lView The associated LView
 * @param context The hydration context
 * @returns An index of serialized view from the transfer state object
 *          or `null` when a given component can not be serialized.
 */
function annotateHostElementForHydration(element, lView, context) {
    const renderer = lView[RENDERER];
    if ((hasI18n(lView) && !isI18nHydrationSupportEnabled()) ||
        componentUsesShadowDomEncapsulation(lView)) {
        // Attach the skip hydration attribute if this component:
        // - either has i18n blocks, since hydrating such blocks is not yet supported
        // - or uses ShadowDom view encapsulation, since Domino doesn't support
        //   shadow DOM, so we can not guarantee that client and server representations
        //   would exactly match
        renderer.setAttribute(element, SKIP_HYDRATION_ATTR_NAME, '');
        return null;
    }
    else {
        const ngh = serializeLView(lView, context);
        const index = context.serializedViewCollection.add(ngh);
        renderer.setAttribute(element, NGH_ATTR_NAME, index.toString());
        return index;
    }
}
/**
 * Physically inserts the comment nodes to ensure empty text nodes and adjacent
 * text node separators are preserved after server serialization of the DOM.
 * These get swapped back for empty text nodes or separators once hydration happens
 * on the client.
 *
 * @param corruptedTextNodes The Map of text nodes to be replaced with comments
 * @param doc The document
 */
function insertCorruptedTextNodeMarkers(corruptedTextNodes, doc) {
    for (const [textNode, marker] of corruptedTextNodes) {
        textNode.after(doc.createComment(marker));
    }
}
/**
 * Detects whether a given TNode represents a node that
 * is being content projected.
 */
function isContentProjectedNode(tNode) {
    let currentTNode = tNode;
    while (currentTNode != null) {
        // If we come across a component host node in parent nodes -
        // this TNode is in the content projection section.
        if (isComponentHost(currentTNode)) {
            return true;
        }
        currentTNode = currentTNode.parent;
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ub3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9oeWRyYXRpb24vYW5ub3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBR0gsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sYUFBYSxDQUFDO0FBRTlDLE9BQU8sRUFBQyxrQkFBa0IsRUFBRSw4QkFBOEIsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ25HLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsdUJBQXVCLEVBQWEsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRixPQUFPLEVBQUMsWUFBWSxFQUFtQixNQUFNLDRCQUE0QixDQUFDO0FBRTFFLE9BQU8sRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4SCxPQUFPLEVBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQVMsTUFBTSxFQUFFLFFBQVEsRUFBUyxLQUFLLEVBQVksTUFBTSw0QkFBNEIsQ0FBQztBQUMxSCxPQUFPLEVBQUMsV0FBVyxFQUFFLFdBQVcsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUVoRCxPQUFPLEVBQUMsNkJBQTZCLEVBQUMsTUFBTSxPQUFPLENBQUM7QUFDcEQsT0FBTyxFQUFDLCtCQUErQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDakUsT0FBTyxFQUFDLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBMkMsV0FBVyxFQUFFLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUNwTCxPQUFPLEVBQUMsZUFBZSxFQUFFLGtC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IEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBcHBsaWNhdGlvblJlZn0gZnJvbSAnLi4vYXBwbGljYXRpb24vYXBwbGljYXRpb25fcmVmJztcbmltcG9ydCB7Vmlld0VuY2Fwc3VsYXRpb259IGZyb20gJy4uL21ldGFkYXRhJztcbmltcG9ydCB7UmVuZGVyZXIyfSBmcm9tICcuLi9yZW5kZXInO1xuaW1wb3J0IHtjb2xsZWN0TmF0aXZlTm9kZXMsIGNvbGxlY3ROYXRpdmVOb2Rlc0luTENvbnRhaW5lcn0gZnJvbSAnLi4vcmVuZGVyMy9jb2xsZWN0X25hdGl2ZV9ub2Rlcyc7XG5pbXBvcnQge2dldENvbXBvbmVudERlZn0gZnJvbSAnLi4vcmVuZGVyMy9kZWZpbml0aW9uJztcbmltcG9ydCB7Q09OVEFJTkVSX0hFQURFUl9PRkZTRVQsIExDb250YWluZXJ9IGZyb20gJy4uL3JlbmRlcjMvaW50ZXJmYWNlcy9jb250YWluZXInO1xuaW1wb3J0IHtpc1ROb2RlU2hhcGUsIFROb2RlLCBUTm9kZVR5cGV9IGZyb20gJy4uL3JlbmRlcjMvaW50ZXJmYWNlcy9ub2RlJztcbmltcG9ydCB7UkVsZW1lbnR9IGZyb20gJy4uL3JlbmRlcjMvaW50ZXJmYWNlcy9yZW5kZXJlcl9kb20nO1xuaW1wb3J0IHtoYXNJMThuLCBpc0NvbXBvbmVudEhvc3QsIGlzTENvbnRhaW5lciwgaXNQcm9qZWN0aW9uVE5vZGUsIGlzUm9vdFZpZXd9IGZyb20gJy4uL3JlbmRlcjMvaW50ZXJmYWNlcy90eXBlX2NoZWNrcyc7XG5pbXBvcnQge0NPTlRFWFQsIEhFQURFUl9PRkZTRVQsIEhPU1QsIExWaWV3LCBQQVJFTlQsIFJFTkRFUkVSLCBUVmlldywgVFZJRVcsIFRWaWV3VHlwZX0gZnJvbSAnLi4vcmVuZGVyMy9pbnRlcmZhY2VzL3ZpZXcnO1xuaW1wb3J0IHt1bndyYXBMVmlldywgdW53cmFwUk5vZGV9IGZyb20gJy4uL3JlbmRlcjMvdXRpbC92aWV3X3V0aWxzJztcbmltcG9ydCB7VHJhbnNmZXJTdGF0ZX0gZnJvbSAnLi4vdHJhbnNmZXJfc3RhdGUnO1xuXG5pbXBvcnQge2lzSTE4bkh5ZHJhdGlvblN1cHBvcnRFbmFibGVkfSBmcm9tICcuL2FwaSc7XG5pbXBvcnQge3Vuc3VwcG9ydGVkUHJvamVjdGlvbk9mRG9tTm9kZXN9IGZyb20gJy4vZXJyb3JfaGFuZGxpbmcnO1xuaW1wb3J0IHtDT05UQUlORVJTLCBESVNDT05ORUNURURfTk9ERVMsIEVMRU1FTlRfQ09OVEFJTkVSUywgTVVMVElQTElFUiwgTk9ERVMsIE5VTV9ST09UX05PREVTLCBTZXJpYWxpemVkQ29udGFpbmVyVmlldywgU2VyaWFsaXplZFZpZXcsIFRFTVBMQVRFX0lELCBURU1QTEFURVN9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQge2NhbGNQYXRoRm9yTm9kZSwgaXNEaXNjb25uZWN0ZWROb2RlfSBmcm9tICcuL25vZGVfbG9va3VwX3V0aWxzJztcbmltcG9ydCB7aXNJblNraXBIeWRyYXRpb25CbG9jaywgU0tJUF9IWURSQVRJT05fQVRUUl9OQU1FfSBmcm9tICcuL3NraXBfaHlkcmF0aW9uJztcbmltcG9ydCB7Z2V0TE5vZGVGb3JIeWRyYXRpb24sIE5HSF9BVFRSX05BTUUsIE5HSF9EQVRBX0tFWSwgVGV4dE5vZGVNYXJrZXJ9IGZyb20gJy4vdXRpbHMnO1xuXG4vKipcbiAqIEEgY29sbGVjdGlvbiB0aGF0IHRyYWNrcyBhbGwgc2VyaWFsaXplZCB2aWV3cyAoYG5naGAgRE9NIGFubm90YXRpb25zKVxuICogdG8gYXZvaWQgZHVwbGljYXRpb24uIEFuIGF0dGVtcHQgdG8gYWRkIGEgZHVwbGljYXRlIHZpZXcgcmVzdWx0cyBpbiB0aGVcbiAqIGNvbGxlY3Rpb24gcmV0dXJuaW5nIHRoZSBpbmRleCBvZiB0aGUgcHJldmlvdXNseSBjb2xsZWN0ZWQgc2VyaWFsaXplZCB2aWV3LlxuICogVGhpcyByZWR1Y2VzIHRoZSBudW1iZXIgb2YgYW5ub3RhdGlvbnMgbmVlZGVkIGZvciBhIGdpdmVuIHBhZ2UuXG4gKi9cbmNsYXNzIFNlcmlhbGl6ZWRWaWV3Q29sbGVjdGlvbiB7XG4gIHByaXZhdGUgdmlld3M6IFNlcmlhbGl6ZWRWaWV3W10gPSBbXTtcbiAgcHJpdmF0ZSBpbmRleEJ5Q29udGVudCA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KCk7XG5cbiAgYWRkKHNlcmlhbGl6ZWRWaWV3OiBTZXJpYWxpemVkVmlldyk6IG51bWJlciB7XG4gICAgY29uc3Qgdmlld0FzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoc2VyaWFsaXplZFZpZXcpO1xuICAgIGlmICghdGhpcy5pbmRleEJ5Q29udGVudC5oYXModmlld0FzU3RyaW5nKSkge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnZpZXdzLmxlbmd0aDtcbiAgICAgIHRoaXMudmlld3MucHVzaChzZXJpYWxpemVkVmlldyk7XG4gICAgICB0aGlzLmluZGV4QnlDb250ZW50LnNldCh2aWV3QXNTdHJpbmcsIGluZGV4KTtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaW5kZXhCeUNvbnRlbnQuZ2V0KHZpZXdBc1N0cmluZykhO1xuICB9XG5cbiAgZ2V0QWxsKCk6IFNlcmlhbGl6ZWRWaWV3W10ge1xuICAgIHJldHVybiB0aGlzLnZpZXdzO1xuICB9XG59XG5cbi8qKlxuICogR2xvYmFsIGNvdW50ZXIgdGhhdCBpcyB1c2VkIHRvIGdlbmVyYXRlIGEgdW5pcXVlIGlkIGZvciBUVmlld3NcbiAqIGR1cmluZyB0aGUgc2VyaWFsaXphdGlvbiBwcm9jZXNzLlxuICovXG5sZXQgdFZpZXdTc3JJZCA9IDA7XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgdW5pcXVlIGlkIGZvciBhIGdpdmVuIFRWaWV3IGFuZCByZXR1cm5zIHRoaXMgaWQuXG4gKiBUaGUgaWQgaXMgYWxzbyBzdG9yZWQgb24gdGhpcyBpbnN0YW5jZSBvZiBhIFRWaWV3IGFuZCByZXVzZWQgaW5cbiAqIHN1YnNlcXVlbnQgY2FsbHMuXG4gKlxuICogVGhpcyBpZCBpcyBuZWVkZWQgdG8gdW5pcXVlbHkgaWRlbnRpZnkgYW5kIHBpY2sgdXAgZGVoeWRyYXRlZCB2aWV3c1xuICogYXQgcnVudGltZS5cbiAqL1xuZnVuY3Rpb24gZ2V0U3NySWQodFZpZXc6IFRWaWV3KTogc3RyaW5nIHtcbiAgaWYgKCF0Vmlldy5zc3JJZCkge1xuICAgIHRWaWV3LnNzcklkID0gYHQke3RWaWV3U3NySWQrK31gO1xuICB9XG4gIHJldHVybiB0Vmlldy5zc3JJZDtcbn1cblxuLyoqXG4gKiBEZXNjcmliZXMgYSBjb250ZXh0IGF2YWlsYWJsZSBkdXJpbmcgdGhlIHNlcmlhbGl6YXRpb25cbiAqIHByb2Nlc3MuIFRoZSBjb250ZXh0IGlzIHVzZWQgdG8gc2hhcmUgYW5kIGNvbGxlY3QgaW5mb3JtYXRpb25cbiAqIGR1cmluZyB0aGUgc2VyaWFsaXphdGlvbi5cbiAqL1xuaW50ZXJmYWNlIEh5ZHJhdGlvbkNvbnRleHQge1xuICBzZXJpYWxpemVkVmlld0NvbGxlY3Rpb246IFNlcmlhbGl6ZWRWaWV3Q29sbGVjdGlvbjtcbiAgY29ycnVwdGVkVGV4dE5vZGVzOiBNYXA8SFRNTEVsZW1lbnQsIFRleHROb2RlTWFya2VyPjtcbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgbnVtYmVyIG9mIHJvb3Qgbm9kZXMgaW4gYSBnaXZlbiB2aWV3XG4gKiAob3IgY2hpbGQgbm9kZXMgaW4gYSBnaXZlbiBjb250YWluZXIgaWYgYSB0Tm9kZSBpcyBwcm92aWRlZCkuXG4gKi9cbmZ1bmN0aW9uIGNhbGNOdW1Sb290Tm9kZXModFZpZXc6IFRWaWV3LCBsVmlldzogTFZpZXcsIHROb2RlOiBUTm9kZXxudWxsKTogbnVtYmVyIHtcbiAgY29uc3Qgcm9vdE5vZGVzOiB1bmtub3duW10gPSBbXTtcbiAgY29sbGVjdE5hdGl2ZU5vZGVzKHRWaWV3LCBsVmlldywgdE5vZGUsIHJvb3ROb2Rlcyk7XG4gIHJldHVybiByb290Tm9kZXMubGVuZ3RoO1xufVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBudW1iZXIgb2Ygcm9vdCBub2RlcyBpbiBhbGwgdmlld3MgaW4gYSBnaXZlbiBMQ29udGFpbmVyLlxuICovXG5mdW5jdGlvbiBjYWxjTnVtUm9vdE5vZGVzSW5MQ29udGFpbmVyKGxDb250YWluZXI6IExDb250YWluZXIpOiBudW1iZXIge1xuICBjb25zdCByb290Tm9kZXM6IHVua25vd25bXSA9IFtdO1xuICBjb2xsZWN0TmF0aXZlTm9kZXNJbkxDb250YWluZXIobENvbnRhaW5lciwgcm9vdE5vZGVzKTtcbiAgcmV0dXJuIHJvb3ROb2Rlcy5sZW5ndGg7XG59XG5cblxuLyoqXG4gKiBBbm5vdGF0ZXMgcm9vdCBsZXZlbCBjb21wb25lbnQncyBMVmlldyBmb3IgaHlkcmF0aW9uLFxuICogc2VlIGBhbm5vdGF0ZUhvc3RFbGVtZW50Rm9ySHlkcmF0aW9uYCBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbi5cbiAqL1xuZnVuY3Rpb24gYW5ub3RhdGVDb21wb25lbnRMVmlld0Zvckh5ZHJhdGlvbihsVmlldzogTFZpZXcsIGNvbnRleHQ6IEh5ZHJhdGlvbkNvbnRleHQpOiBudW1iZXJ8bnVsbCB7XG4gIGNvbnN0IGhvc3RFbGVtZW50ID0gbFZpZXdbSE9TVF07XG4gIC8vIFJvb3QgZWxlbWVudHMgbWlnaHQgYWxzbyBiZSBhbm5vdGF0ZWQgd2l0aCB0aGUgYG5nU2tpcEh5ZHJhdGlvbmAgYXR0cmlidXRlLFxuICAvLyBjaGVjayBpZiBpdCdzIHByZXNlbnQgYmVmb3JlIHN0YXJ0aW5nIHRoZSBzZXJpYWxpemF0aW9uIHByb2Nlc3MuXG4gIGlmIChob3N0RWxlbWVudCAmJiAhKGhvc3RFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5oYXNBdHRyaWJ1dGUoU0tJUF9IWURSQVRJT05fQVRUUl9OQU1FKSkge1xuICAgIHJldHVybiBhbm5vdGF0ZUhvc3RFbGVtZW50Rm9ySHlkcmF0aW9uKGhvc3RFbGVtZW50IGFzIEhUTUxFbGVtZW50LCBsVmlldywgY29udGV4dCk7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogQW5ub3RhdGVzIHJvb3QgbGV2ZWwgTENvbnRhaW5lciBmb3IgaHlkcmF0aW9uLiBUaGlzIGhhcHBlbnMgd2hlbiBhIHJvb3QgY29tcG9uZW50XG4gKiBpbmplY3RzIFZpZXdDb250YWluZXJSZWYsIHRodXMgbWFraW5nIHRoZSBjb21wb25lbnQgYW4gYW5jaG9yIGZvciBhIHZpZXcgY29udGFpbmVyLlxuICogVGhpcyBmdW5jdGlvbiBzZXJpYWxpemVzIHRoZSBjb21wb25lbnQgaXRzZWxmIGFzIHdlbGwgYXMgYWxsIHZpZXdzIGZyb20gdGhlIHZpZXdcbiAqIGNvbnRhaW5lci5cbiAqL1xuZnVuY3Rpb24gYW5ub3RhdGVMQ29udGFpbmVyRm9ySHlkcmF0aW9uKGxDb250YWluZXI6IExDb250YWluZXIsIGNvbnRleHQ6IEh5ZHJhdGlvbkNvbnRleHQpIHtcbiAgY29uc3QgY29tcG9uZW50TFZpZXcgPSB1bndyYXBMVmlldyhsQ29udGFpbmVyW0hPU1RdKSBhcyBMVmlldzx1bmtub3duPjtcblxuICAvLyBTZXJpYWxpemUgdGhlIHJvb3QgY29tcG9uZW50IGl0c2VsZi5cbiAgY29uc3QgY29tcG9uZW50TFZpZXdOZ2hJbmRleCA9IGFubm90YXRlQ29tcG9uZW50TFZpZXdGb3JIeWRyYXRpb24oY29tcG9uZW50TFZpZXcsIGNvbnRleHQpO1xuXG4gIGNvbnN0IGhvc3RFbGVtZW50ID0gdW53cmFwUk5vZGUoY29tcG9uZW50TFZpZXdbSE9TVF0hKSBhcyBIVE1MRWxlbWVudDtcblxuICAvLyBTZXJpYWxpemUgYWxsIHZpZXdzIHdpdGhpbiB0aGlzIHZpZXcgY29udGFpbmVyLlxuICBjb25zdCByb290TFZpZXcgPSBsQ29udGFpbmVyW1BBUkVOVF07XG4gIGNvbnN0IHJvb3RMVmlld05naEluZGV4ID0gYW5ub3RhdGVIb3N0RWxlbWVudEZvckh5ZHJhdGlvbihob3N0RWxlbWVudCwgcm9vdExWaWV3LCBjb250ZXh0KTtcblxuICBjb25zdCByZW5kZXJlciA9IGNvbXBvbmVudExWaWV3W1JFTkRFUkVSXSBhcyBSZW5kZXJlcjI7XG5cbiAgLy8gRm9yIGNhc2VzIHdoZW4gYSByb290IGNvbXBvbmVudCBhbHNvIGFjdHMgYXMgYW4gYW5jaG9yIG5vZGUgZm9yIGEgVmlld0NvbnRhaW5lclJlZlxuICAvLyAoZm9yIGV4YW1wbGUsIHdoZW4gVmlld0NvbnRhaW5lclJlZiBpcyBpbmplY3RlZCBpbiBhIHJvb3QgY29tcG9uZW50KSwgdGhlcmUgaXMgYSBuZWVkXG4gIC8vIHRvIHNlcmlhbGl6ZSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY29tcG9uZW50IGl0c2VsZiwgYXMgd2VsbCBhcyBhbiBMQ29udGFpbmVyIHRoYXRcbiAgLy8gcmVwcmVzZW50cyB0aGlzIFZpZXdDb250YWluZXJSZWYuIEVmZmVjdGl2ZWx5LCB3ZSBuZWVkIHRvIHNlcmlhbGl6ZSAyIHBpZWNlcyBvZiBpbmZvOlxuICAvLyAoMSkgaHlkcmF0aW9uIGluZm8gZm9yIHRoZSByb290IGNvbXBvbmVudCBpdHNlbGYgYW5kICgyKSBoeWRyYXRpb24gaW5mbyBmb3IgdGhlXG4gIC8vIFZpZXdDb250YWluZXJSZWYgaW5zdGFuY2UgKGFuIExDb250YWluZXIpLiBFYWNoIHBpZWNlIG9mIGluZm9ybWF0aW9uIGlzIGluY2x1ZGVkIGludG9cbiAgLy8gdGhlIGh5ZHJhdGlvbiBkYXRhIChpbiB0aGUgVHJhbnNmZXJTdGF0ZSBvYmplY3QpIHNlcGFyYXRlbHksIHRodXMgd2UgZW5kIHVwIHdpdGggMiBpZHMuXG4gIC8vIFNpbmNlIHdlIG9ubHkgaGF2ZSAxIHJvb3QgZWxlbWVudCwgd2UgZW5jb2RlIGJvdGggYml0cyBvZiBpbmZvIGludG8gYSBzaW5nbGUgc3RyaW5nOlxuICAvLyBpZHMgYXJlIHNlcGFyYXRlZCBieSB0aGUgYHxgIGNoYXIgKGUuZy4gYDEwfDI1YCwgd2hlcmUgYDEwYCBpcyB0aGUgbmdoIGZvciBhIGNvbXBvbmVudCB2aWV3XG4gIC8vIGFuZCAyNSBpcyB0aGUgYG5naGAgZm9yIGEgcm9vdCB2aWV3IHdoaWNoIGhvbGRzIExDb250YWluZXIpLlxuICBjb25zdCBmaW5hbEluZGV4ID0gYCR7Y29tcG9uZW50TFZpZXdOZ2hJbmRleH18JHtyb290TFZpZXdOZ2hJbmRleH1gO1xuICByZW5kZXJlci5zZXRBdHRyaWJ1dGUoaG9zdEVsZW1lbnQsIE5HSF9BVFRSX05BTUUsIGZpbmFsSW5kZXgpO1xufVxuXG4vKipcbiAqIEFubm90YXRlcyBhbGwgY29tcG9uZW50cyBib290c3RyYXBwZWQgaW4gYSBnaXZlbiBBcHBsaWNhdGlvblJlZlxuICogd2l0aCBpbmZvIG5lZWRlZCBmb3IgaHlkcmF0aW9uLlxuICpcbiAqIEBwYXJhbSBhcHBSZWYgQW4gaW5zdGFuY2Ugb2YgYW4gQXBwbGljYXRpb25SZWYuXG4gKiBAcGFyYW0gZG9jIEEgcmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IERvY3VtZW50IGluc3RhbmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYW5ub3RhdGVGb3JIeWRyYXRpb24oYXBwUmVmOiBBcHBsaWNhdGlvblJlZiwgZG9jOiBEb2N1bWVudCkge1xuICBjb25zdCBzZXJpYWxpemVkVmlld0NvbGxlY3Rpb24gPSBuZXcgU2VyaWFsaXplZFZpZXdDb2xsZWN0aW9uKCk7XG4gIGNvbnN0IGNvcnJ1cHRlZFRleHROb2RlcyA9IG5ldyBNYXA8SFRNTEVsZW1lbnQsIFRleHROb2RlTWFya2VyPigpO1xuICBjb25zdCB2aWV3UmVmcyA9IGFwcFJlZi5fdmlld3M7XG4gIGZvciAoY29uc3Qgdmlld1JlZiBvZiB2aWV3UmVmcykge1xuICAgIGNvbnN0IGxOb2RlID0gZ2V0TE5vZGVGb3JIeWRyYXRpb24odmlld1JlZik7XG5cbiAgICAvLyBBbiBgbFZpZXdgIG1pZ2h0IGJlIGBudWxsYCBpZiBhIGBWaWV3UmVmYCByZXByZXNlbnRzXG4gICAgLy8gYW4gZW1iZWRkZWQgdmlldyAobm90IGEgY29tcG9uZW50IHZpZXcpLlxuICAgIGlmIChsTm9kZSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgY29udGV4dDogSHlkcmF0aW9uQ29udGV4dCA9IHtcbiAgICAgICAgc2VyaWFsaXplZFZpZXdDb2xsZWN0aW9uLFxuICAgICAgICBjb3JydXB0ZWRUZXh0Tm9kZXMsXG4gICAgICB9O1xuICAgICAgaWYgKGlzTENvbnRhaW5lcihsTm9kZSkpIHtcbiAgICAgICAgYW5ub3RhdGVMQ29udGFpbmVyRm9ySHlkcmF0aW9uKGxOb2RlLCBjb250ZXh0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFubm90YXRlQ29tcG9uZW50TFZpZXdGb3JIeWRyYXRpb24obE5vZGUsIGNvbnRleHQpO1xuICAgICAgfVxuICAgICAgaW5zZXJ0Q29ycnVwdGVkVGV4dE5vZGVNYXJrZXJzKGNvcnJ1cHRlZFRleHROb2RlcywgZG9jKTtcbiAgICB9XG4gIH1cblxuICAvLyBOb3RlOiB3ZSAqYWx3YXlzKiBpbmNsdWRlIGh5ZHJhdGlvbiBpbmZvIGtleSBhbmQgYSBjb3JyZXNwb25kaW5nIHZhbHVlXG4gIC8vIGludG8gdGhlIFRyYW5zZmVyU3RhdGUsIGV2ZW4gaWYgdGhlIGxpc3Qgb2Ygc2VyaWFsaXplZCB2aWV3cyBpcyBlbXB0eS5cbiAgLy8gVGhpcyBpcyBuZWVkZWQgYXMgYSBzaWduYWwgdG8gdGhlIGNsaWVudCB0aGF0IHRoZSBzZXJ2ZXIgcGFydCBvZiB0aGVcbiAgLy8gaHlkcmF0aW9uIGxvZ2ljIHdhcyBzZXR1cCBhbmQgZW5hYmxlZCBjb3JyZWN0bHkuIE90aGVyd2lzZSwgaWYgYSBjbGllbnRcbiAgLy8gaHlkcmF0aW9uIGRvZXNuJ3QgZmluZCBhIGtleSBpbiB0aGUgdHJhbnNmZXIgc3RhdGUgLSBhbiBlcnJvciBpcyBwcm9kdWNlZC5cbiAgY29uc3Qgc2VyaWFsaXplZFZpZXdzID0gc2VyaWFsaXplZFZpZXdDb2xsZWN0aW9uLmdldEFsbCgpO1xuICBjb25zdCB0cmFuc2ZlclN0YXRlID0gYXBwUmVmLmluamVjdG9yLmdldChUcmFuc2ZlclN0YXRlKTtcbiAgdHJhbnNmZXJTdGF0ZS5zZXQoTkdIX0RBVEFfS0VZLCBzZXJpYWxpemVkVmlld3MpO1xufVxuXG4vKipcbiAqIFNlcmlhbGl6ZXMgdGhlIGxDb250YWluZXIgZGF0YSBpbnRvIGEgbGlzdCBvZiBTZXJpYWxpemVkVmlldyBvYmplY3RzLFxuICogdGhhdCByZXByZXNlbnQgdmlld3Mgd2l0aGluIHRoaXMgbENvbnRhaW5lci5cbiAqXG4gKiBAcGFyYW0gbENvbnRhaW5lciB0aGUgbENvbnRhaW5lciB3ZSBhcmUgc2VyaWFsaXppbmdcbiAqIEBwYXJhbSBjb250ZXh0IHRoZSBoeWRyYXRpb24gY29udGV4dFxuICogQHJldHVybnMgYW4gYXJyYXkgb2YgdGhlIGBTZXJpYWxpemVkVmlld2Agb2JqZWN0c1xuICovXG5mdW5jdGlvbiBzZXJpYWxpemVMQ29udGFpbmVyKFxuICAgIGxDb250YWluZXI6IExDb250YWluZXIsIGNvbnRleHQ6IEh5ZHJhdGlvbkNvbnRleHQpOiBTZXJpYWxpemVkQ29udGFpbmVyVmlld1tdIHtcbiAgY29uc3Qgdmlld3M6IFNlcmlhbGl6ZWRDb250YWluZXJWaWV3W10gPSBbXTtcbiAgbGV0IGxhc3RWaWV3QXNTdHJpbmcgPSAnJztcblxuICBmb3IgKGxldCBpID0gQ09OVEFJTkVSX0hFQURFUl9PRkZTRVQ7IGkgPCBsQ29udGFpbmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGNoaWxkTFZpZXcgPSBsQ29udGFpbmVyW2ldIGFzIExWaWV3O1xuXG4gICAgbGV0IHRlbXBsYXRlOiBzdHJpbmc7XG4gICAgbGV0IG51bVJvb3ROb2RlczogbnVtYmVyO1xuICAgIGxldCBzZXJpYWxpemVkVmlldzogU2VyaWFsaXplZENvbnRhaW5lclZpZXd8dW5kZWZpbmVkO1xuXG4gICAgaWYgKGlzUm9vdFZpZXcoY2hpbGRMVmlldykpIHtcbiAgICAgIC8vIElmIHRoaXMgaXMgYSByb290IHZpZXcsIGdldCBhbiBMVmlldyBmb3IgdGhlIHVuZGVybHlpbmcgY29tcG9uZW50LFxuICAgICAgLy8gYmVjYXVzZSBpdCBjb250YWlucyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgdmlldyB0byBzZXJpYWxpemUuXG4gICAgICBjaGlsZExWaWV3ID0gY2hpbGRMVmlld1tIRUFERVJfT0ZGU0VUXTtcblxuICAgICAgLy8gSWYgd2UgaGF2ZSBhbiBMQ29udGFpbmVyIGF0IHRoaXMgcG9zaXRpb24sIHRoaXMgaW5kaWNhdGVzIHRoYXQgdGhlXG4gICAgICAvLyBob3N0IGVsZW1lbnQgd2FzIHVzZWQgYXMgYSBWaWV3Q29udGFpbmVyUmVmIGFuY2hvciAoZS5nLiBhIGBWaWV3Q29udGFpbmVyUmVmYFxuICAgICAgLy8gd2FzIGluamVjdGVkIHdpdGhpbiB0aGUgY29tcG9uZW50IGNsYXNzKS4gVGhpcyBjYXNlIHJlcXVpcmVzIHNwZWNpYWwgaGFuZGxpbmcuXG4gICAgICBpZiAoaXNMQ29udGFpbmVyKGNoaWxkTFZpZXcpKSB7XG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgbnVtYmVyIG9mIHJvb3Qgbm9kZXMgaW4gYWxsIHZpZXdzIGluIGEgZ2l2ZW4gY29udGFpbmVyXG4gICAgICAgIC8vIGFuZCBpbmNyZW1lbnQgYnkgb25lIHRvIGFjY291bnQgZm9yIGFuIGFuY2hvciBub2RlIGl0c2VsZiwgaS5lLiBpbiB0aGlzXG4gICAgICAgIC8vIHNjZW5hcmlvIHdlJ2xsIGhhdmUgYSBsYXlvdXQgdGhhdCB3b3VsZCBsb29rIGxpa2UgdGhpczpcbiAgICAgICAgLy8gYDxhcHAtcm9vdCAvPjwjVklFVzE+PCNWSUVXMj4uLi48IS0tY29udGFpbmVyLS0+YFxuICAgICAgICAvLyBUaGUgYCsxYCBpcyB0byBjYXB0dXJlIHRoZSBgPGFwcC1yb290IC8+YCBlbGVtZW50LlxuICAgICAgICBudW1Sb290Tm9kZXMgPSBjYWxjTnVtUm9vdE5vZGVzSW5MQ29udGFpbmVyKGNoaWxkTFZpZXcpICsgMTtcblxuICAgICAgICBhbm5vdGF0ZUxDb250YWluZXJGb3JIeWRyYXRpb24oY2hpbGRMVmlldywgY29udGV4dCk7XG5cbiAgICAgICAgY29uc3QgY29tcG9uZW50TFZpZXcgPSB1bndyYXBMVmlldyhjaGlsZExWaWV3W0hPU1RdKSBhcyBMVmlldzx1bmtub3duPjtcblxuICAgICAgICBzZXJpYWxpemVkVmlldyA9IHtcbiAgICAgICAgICBbVEVNUExBVEVfSURdOiBjb21wb25lbnRMVmlld1tUVklFV10uc3NySWQhLFxuICAgICAgICAgIFtOVU1fUk9PVF9OT0RFU106IG51bVJvb3ROb2RlcyxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXNlcmlhbGl6ZWRWaWV3KSB7XG4gICAgICBjb25zdCBjaGlsZFRWaWV3ID0gY2hpbGRMVmlld1tUVklFV107XG5cbiAgICAgIGlmIChjaGlsZFRWaWV3LnR5cGUgPT09IFRWaWV3VHlwZS5Db21wb25lbnQpIHtcbiAgICAgICAgdGVtcGxhdGUgPSBjaGlsZFRWaWV3LnNzcklkITtcblxuICAgICAgICAvLyBUaGlzIGlzIGEgY29tcG9uZW50IHZpZXcsIHRodXMgaXQgaGFzIG9ubHkgMSByb290IG5vZGU6IHRoZSBjb21wb25lbnRcbiAgICAgICAgLy8gaG9zdCBub2RlIGl0c2VsZiAob3RoZXIgbm9kZXMgd291bGQgYmUgaW5zaWRlIHRoYXQgaG9zdCBub2RlKS5cbiAgICAgICAgbnVtUm9vdE5vZGVzID0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRlbXBsYXRlID0gZ2V0U3NySWQoY2hpbGRUVmlldyk7XG4gICAgICAgIG51bVJvb3ROb2RlcyA9IGNhbGNOdW1Sb290Tm9kZXMoY2hpbGRUVmlldywgY2hpbGRMVmlldywgY2hpbGRUVmlldy5maXJzdENoaWxkKTtcbiAgICAgIH1cblxuICAgICAgc2VyaWFsaXplZFZpZXcgPSB7XG4gICAgICAgIFtURU1QTEFURV9JRF06IHRlbXBsYXRlLFxuICAgICAgICBbTlVNX1JPT1RfTk9ERVNdOiBudW1Sb290Tm9kZXMsXG4gICAgICAgIC4uLnNlcmlhbGl6ZUxWaWV3KGxDb250YWluZXJbaV0gYXMgTFZpZXcsIGNvbnRleHQpLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBpZiB0aGUgcHJldmlvdXMgdmlldyBoYXMgdGhlIHNhbWUgc2hhcGUgKGZvciBleGFtcGxlLCBpdCB3YXNcbiAgICAvLyBwcm9kdWNlZCBieSB0aGUgKm5nRm9yKSwgaW4gd2hpY2ggY2FzZSBidW1wIHRoZSBjb3VudGVyIG9uIHRoZSBwcmV2aW91c1xuICAgIC8vIHZpZXcgaW5zdGVhZCBvZiBpbmNsdWRpbmcgdGhlIHNhbWUgaW5mb3JtYXRpb24gYWdhaW4uXG4gICAgY29uc3QgY3VycmVudFZpZXdBc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KHNlcmlhbGl6ZWRWaWV3KTtcbiAgICBpZiAodmlld3MubGVuZ3RoID4gMCAmJiBjdXJyZW50Vmlld0FzU3RyaW5nID09PSBsYXN0Vmlld0FzU3RyaW5nKSB7XG4gICAgICBjb25zdCBwcmV2aW91c1ZpZXcgPSB2aWV3c1t2aWV3cy5sZW5ndGggLSAxXTtcbiAgICAgIHByZXZpb3VzVmlld1tNVUxUSVBMSUVSXSA/Pz0gMTtcbiAgICAgIHByZXZpb3VzVmlld1tNVUxUSVBMSUVSXSsrO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZWNvcmQgdGhpcyB2aWV3IGFzIG1vc3QgcmVjZW50bHkgYWRkZWQuXG4gICAgICBsYXN0Vmlld0FzU3RyaW5nID0gY3VycmVudFZpZXdBc1N0cmluZztcbiAgICAgIHZpZXdzLnB1c2goc2VyaWFsaXplZFZpZXcpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdmlld3M7XG59XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIHByb2R1Y2UgYSBub2RlIHBhdGggKHdoaWNoIG5hdmlnYXRpb24gc3RlcHMgcnVudGltZSBsb2dpY1xuICogbmVlZHMgdG8gdGFrZSB0byBsb2NhdGUgYSBub2RlKSBhbmQgc3RvcmVzIGl0IGluIHRoZSBgTk9ERVNgIHNlY3Rpb24gb2YgdGhlXG4gKiBjdXJyZW50IHNlcmlhbGl6ZWQgdmlldy5cbiAqL1xuZnVuY3Rpb24gYXBwZW5kU2VyaWFsaXplZE5vZGVQYXRoKG5naDogU2VyaWFsaXplZFZpZXcsIHROb2RlOiBUTm9kZSwgbFZpZXc6IExWaWV3KSB7XG4gIGNvbnN0IG5vT2Zmc2V0SW5kZXggPSB0Tm9kZS5pbmRleCAtIEhFQURFUl9PRkZTRVQ7XG4gIG5naFtOT0RFU10gPz89IHt9O1xuICBuZ2hbTk9ERVNdW25vT2Zmc2V0SW5kZXhdID0gY2FsY1BhdGhGb3JOb2RlKHROb2RlLCBsVmlldyk7XG59XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGFwcGVuZCBpbmZvcm1hdGlvbiBhYm91dCBhIGRpc2Nvbm5lY3RlZCBub2RlLlxuICogVGhpcyBpbmZvIGlzIG5lZWRlZCBhdCBydW50aW1lIHRvIGF2b2lkIERPTSBsb29rdXBzIGZvciB0aGlzIGVsZW1lbnRcbiAqIGFuZCBpbnN0ZWFkLCB0aGUgZWxlbWVudCB3b3VsZCBiZSBjcmVhdGVkIGZyb20gc2NyYXRjaC5cbiAqL1xuZnVuY3Rpb24gYXBwZW5kRGlzY29ubmVjdGVkTm9kZUluZGV4KG5naDogU2VyaWFsaXplZFZpZXcsIHROb2RlOiBUTm9kZSkge1xuICBjb25zdCBub09mZnNldEluZGV4ID0gdE5vZGUuaW5kZXggLSBIRUFERVJfT0ZGU0VUO1xuICBuZ2hbRElTQ09OTkVDVEVEX05PREVTXSA/Pz0gW107XG4gIGlmICghbmdoW0RJU0NPTk5FQ1RFRF9OT0RFU10uaW5jbHVkZXMobm9PZmZzZXRJbmRleCkpIHtcbiAgICBuZ2hbRElTQ09OTkVDVEVEX05PREVTXS5wdXNoKG5vT2Zmc2V0SW5kZXgpO1xuICB9XG59XG5cbi8qKlxuICogU2VyaWFsaXplcyB0aGUgbFZpZXcgZGF0YSBpbnRvIGEgU2VyaWFsaXplZFZpZXcgb2JqZWN0IHRoYXQgd2lsbCBsYXRlciBiZSBhZGRlZFxuICogdG8gdGhlIFRyYW5zZmVyU3RhdGUgc3RvcmFnZSBhbmQgcmVmZXJlbmNlZCB1c2luZyB0aGUgYG5naGAgYXR0cmlidXRlIG9uIGEgaG9zdFxuICogZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0gbFZpZXcgdGhlIGxWaWV3IHdlIGFyZSBzZXJpYWxpemluZ1xuICogQHBhcmFtIGNvbnRleHQgdGhlIGh5ZHJhdGlvbiBjb250ZXh0XG4gKiBAcmV0dXJucyB0aGUgYFNlcmlhbGl6ZWRWaWV3YCBvYmplY3QgY29udGFpbmluZyB0aGUgZGF0YSB0byBiZSBhZGRlZCB0byB0aGUgaG9zdCBub2RlXG4gKi9cbmZ1bmN0aW9uIHNlcmlhbGl6ZUxWaWV3KGxWaWV3OiBMVmlldywgY29udGV4dDogSHlkcmF0aW9uQ29udGV4dCk6IFNlcmlhbGl6ZWRWaWV3IHtcbiAgY29uc3QgbmdoOiBTZXJpYWxpemVkVmlldyA9IHt9O1xuICBjb25zdCB0VmlldyA9IGxWaWV3W1RWSUVXXTtcbiAgLy8gSXRlcmF0ZSBvdmVyIERPTSBlbGVtZW50IHJlZmVyZW5jZXMgaW4gYW4gTFZpZXcuXG4gIGZvciAobGV0IGkgPSBIRUFERVJfT0ZGU0VUOyBpIDwgdFZpZXcuYmluZGluZ1N0YXJ0SW5kZXg7IGkrKykge1xuICAgIGNvbnN0IHROb2RlID0gdFZpZXcuZGF0YVtpXSBhcyBUTm9kZTtcbiAgICBjb25zdCBub09mZnNldEluZGV4ID0gaSAtIEhFQURFUl9PRkZTRVQ7XG4gICAgLy8gU2tpcCBwcm9jZXNzaW5nIG9mIGEgZ2l2ZW4gc2xvdCBpbiB0aGUgZm9sbG93aW5nIGNhc2VzOlxuICAgIC8vIC0gTG9jYWwgcmVmcyAoZS5nLiA8ZGl2ICNsb2NhbFJlZj4pIHRha2UgdXAgYW4gZXh0cmEgc2xvdCBpbiBMVmlld3NcbiAgICAvLyAgIHRvIHN0b3JlIHRoZSBzYW1lIGVsZW1lbnQuIEluIHRoaXMgY2FzZSwgdGhlcmUgaXMgbm8gaW5mb3JtYXRpb24gaW5cbiAgICAvLyAgIGEgY29ycmVzcG9uZGluZyBzbG90IGluIFROb2RlIGRhdGEgc3RydWN0dXJlLlxuICAgIC8vIC0gV2hlbiBhIHNsb3QgY29udGFpbnMgc29tZXRoaW5nIG90aGVyIHRoYW4gYSBUTm9kZS4gRm9yIGV4YW1wbGUsIHRoZXJlXG4gICAgLy8gICBtaWdodCBiZSBzb21lIG1ldGFkYXRhIGluZm9ybWF0aW9uIGFib3V0IGEgZGVmZXIgYmxvY2sgb3IgYSBjb250cm9sIGZsb3cgYmxvY2suXG4gICAgaWYgKCFpc1ROb2RlU2hhcGUodE5vZGUpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBpZiBhIG5hdGl2ZSBub2RlIHRoYXQgcmVwcmVzZW50cyBhIGdpdmVuIFROb2RlIGlzIGRpc2Nvbm5lY3RlZCBmcm9tIHRoZSBET00gdHJlZS5cbiAgICAvLyBTdWNoIG5vZGVzIG11c3QgYmUgZXhjbHVkZWQgZnJvbSB0aGUgaHlkcmF0aW9uIChzaW5jZSB0aGUgaHlkcmF0aW9uIHdvbid0IGJlIGFibGUgdG9cbiAgICAvLyBmaW5kIHRoZW0pLCBzbyB0aGUgVE5vZGUgaWRzIGFyZSBjb2xsZWN0ZWQgYW5kIHVzZWQgYXQgcnVudGltZSB0byBza2lwIHRoZSBoeWRyYXRpb24uXG4gICAgLy9cbiAgICAvLyBUaGlzIHNpdHVhdGlvbiBtYXkgaGFwcGVuIGR1cmluZyB0aGUgY29udGVudCBwcm9qZWN0aW9uLCB3aGVuIHNvbWUgbm9kZXMgZG9uJ3QgbWFrZSBpdFxuICAgIC8vIGludG8gb25lIG9mIHRoZSBjb250ZW50IHByb2plY3Rpb24gc2xvdHMgKGZvciBleGFtcGxlLCB3aGVuIHRoZXJlIGlzIG5vIGRlZmF1bHRcbiAgICAvLyA8bmctY29udGVudCAvPiBzbG90IGluIHByb2plY3RvciBjb21wb25lbnQncyB0ZW1wbGF0ZSkuXG4gICAgaWYgKGlzRGlzY29ubmVjdGVkTm9kZSh0Tm9kZSwgbFZpZXcpICYmIGlzQ29udGVudFByb2plY3RlZE5vZGUodE5vZGUpKSB7XG4gICAgICBhcHBlbmREaXNjb25uZWN0ZWROb2RlSW5kZXgobmdoLCB0Tm9kZSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodE5vZGUucHJvamVjdGlvbikpIHtcbiAgICAgIGZvciAoY29uc3QgcHJvamVjdGlvbkhlYWRUTm9kZSBvZiB0Tm9kZS5wcm9qZWN0aW9uKSB7XG4gICAgICAgIC8vIFdlIG1heSBoYXZlIGBudWxsYHMgaW4gc2xvdHMgd2l0aCBubyBwcm9qZWN0ZWQgY29udGVudC5cbiAgICAgICAgaWYgKCFwcm9qZWN0aW9uSGVhZFROb2RlKSBjb250aW51ZTtcblxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJvamVjdGlvbkhlYWRUTm9kZSkpIHtcbiAgICAgICAgICAvLyBJZiB3ZSBwcm9jZXNzIHJlLXByb2plY3RlZCBjb250ZW50IChpLmUuIGA8bmctY29udGVudD5gXG4gICAgICAgICAgLy8gYXBwZWFycyBhdCBwcm9qZWN0aW9uIGxvY2F0aW9uKSwgc2tpcCBhbm5vdGF0aW9ucyBmb3IgdGhpcyBjb250ZW50XG4gICAgICAgICAgLy8gc2luY2UgYWxsIERPTSBub2RlcyBpbiB0aGlzIHByb2plY3Rpb24gd2VyZSBoYW5kbGVkIHdoaWxlIHByb2Nlc3NpbmdcbiAgICAgICAgICAvLyBhIHBhcmVudCBsVmlldywgd2hpY2ggY29udGFpbnMgdGhvc2Ugbm9kZXMuXG4gICAgICAgICAgaWYgKCFpc1Byb2plY3Rpb25UTm9kZShwcm9qZWN0aW9uSGVhZFROb2RlKSAmJlxuICAgICAgICAgICAgICAhaXNJblNraXBIeWRyYXRpb25CbG9jayhwcm9qZWN0aW9uSGVhZFROb2RlKSkge1xuICAgICAgICAgICAgaWYgKGlzRGlzY29ubmVjdGVkTm9kZShwcm9qZWN0aW9uSGVhZFROb2RlLCBsVmlldykpIHtcbiAgICAgICAgICAgICAgLy8gQ2hlY2sgd2hldGhlciB0aGlzIG5vZGUgaXMgY29ubmVjdGVkLCBzaW5jZSB3ZSBtYXkgaGF2ZSBhIFROb2RlXG4gICAgICAgICAgICAgIC8vIGluIHRoZSBkYXRhIHN0cnVjdHVyZSBhcyBhIHByb2plY3Rpb24gc2VnbWVudCBoZWFkLCBidXQgdGhlXG4gICAgICAgICAgICAgIC8vIGNvbnRlbnQgcHJvamVjdGlvbiBzbG90IG1pZ2h0IGJlIGRpc2FibGVkIChlLmcuXG4gICAgICAgICAgICAgIC8vIDxuZy1jb250ZW50ICpuZ0lmPVwiZmFsc2VcIiAvPikuXG4gICAgICAgICAgICAgIGFwcGVuZERpc2Nvbm5lY3RlZE5vZGVJbmRleChuZ2gsIHByb2plY3Rpb25IZWFkVE5vZGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYXBwZW5kU2VyaWFsaXplZE5vZGVQYXRoKG5naCwgcHJvamVjdGlvbkhlYWRUTm9kZSwgbFZpZXcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBJZiBhIHZhbHVlIGlzIGFuIGFycmF5LCBpdCBtZWFucyB0aGF0IHdlIGFyZSBwcm9jZXNzaW5nIGEgcHJvamVjdGlvblxuICAgICAgICAgIC8vIHdoZXJlIHByb2plY3RhYmxlIG5vZGVzIHdlcmUgcGFzc2VkIGluIGFzIERPTSBub2RlcyAoZm9yIGV4YW1wbGUsIHdoZW5cbiAgICAgICAgICAvLyBjYWxsaW5nIGBWaWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChDbXBBLCB7cHJvamVjdGFibGVOb2RlczogWy4uLl19KWApLlxuICAgICAgICAgIC8vXG4gICAgICAgICAgLy8gSW4gdGhpcyBzY2VuYXJpbywgbm9kZXMgY2FuIGNvbWUgZnJvbSBhbnl3aGVyZSAoZWl0aGVyIGNyZWF0ZWQgbWFudWFsbHksXG4gICAgICAgICAgLy8gYWNjZXNzZWQgdmlhIGBkb2N1bWVudC5xdWVyeVNlbGVjdG9yYCwgZXRjKSBhbmQgbWF5IGJlIGluIGFueSBzdGF0ZVxuICAgICAgICAgIC8vIChhdHRhY2hlZCBvciBkZXRhY2hlZCBmcm9tIHRoZSBET00gdHJlZSkuIEFzIGEgcmVzdWx0LCB3ZSBjYW4gbm90IHJlbGlhYmx5XG4gICAgICAgICAgLy8gcmVzdG9yZSB0aGUgc3RhdGUgZm9yIHN1Y2ggY2FzZXMgZHVyaW5nIGh5ZHJhdGlvbi5cblxuICAgICAgICAgIHRocm93IHVuc3VwcG9ydGVkUHJvamVjdGlvbk9mRG9tTm9kZXModW53cmFwUk5vZGUobFZpZXdbaV0pKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbmRpdGlvbmFsbHlBbm5vdGF0ZU5vZGVQYXRoKG5naCwgdE5vZGUsIGxWaWV3KTtcblxuICAgIGlmIChpc0xDb250YWluZXIobFZpZXdbaV0pKSB7XG4gICAgICAvLyBTZXJpYWxpemUgaW5mb3JtYXRpb24gYWJvdXQgYSB0ZW1wbGF0ZS5cbiAgICAgIGNvbnN0IGVtYmVkZGVkVFZpZXcgPSB0Tm9kZS50VmlldztcbiAgICAgIGlmIChlbWJlZGRlZFRWaWV3ICE9PSBudWxsKSB7XG4gICAgICAgIG5naFtURU1QTEFURVNdID8/PSB7fTtcbiAgICAgICAgbmdoW1RFTVBMQVRFU11bbm9PZmZzZXRJbmRleF0gPSBnZXRTc3JJZChlbWJlZGRlZFRWaWV3KTtcbiAgICAgIH1cblxuICAgICAgLy8gU2VyaWFsaXplIHZpZXdzIHdpdGhpbiB0aGlzIExDb250YWluZXIuXG4gICAgICBjb25zdCBob3N0Tm9kZSA9IGxWaWV3W2ldW0hPU1RdITsgIC8vIGhvc3Qgbm9kZSBvZiB0aGlzIGNvbnRhaW5lclxuXG4gICAgICAvLyBMVmlld1tpXVtIT1NUXSBjYW4gYmUgb2YgMiBkaWZmZXJlbnQgdHlwZXM6XG4gICAgICAvLyAtIGVpdGhlciBhIERPTSBub2RlXG4gICAgICAvLyAtIG9yIGFuIGFycmF5IHRoYXQgcmVwcmVzZW50cyBhbiBMVmlldyBvZiBhIGNvbXBvbmVudFxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaG9zdE5vZGUpKSB7XG4gICAgICAgIC8vIFRoaXMgaXMgYSBjb21wb25lbnQsIHNlcmlhbGl6ZSBpbmZvIGFib3V0IGl0LlxuICAgICAgICBjb25zdCB0YXJnZXROb2RlID0gdW53cmFwUk5vZGUoaG9zdE5vZGUgYXMgTFZpZXcpIGFzIFJFbGVtZW50O1xuICAgICAgICBpZiAoISh0YXJnZXROb2RlIGFzIEhUTUxFbGVtZW50KS5oYXNBdHRyaWJ1dGUoU0tJUF9IWURSQVRJT05fQVRUUl9OQU1FKSkge1xuICAgICAgICAgIGFubm90YXRlSG9zdEVsZW1lbnRGb3JIeWRyYXRpb24odGFyZ2V0Tm9kZSwgaG9zdE5vZGUgYXMgTFZpZXcsIGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG5naFtDT05UQUlORVJTXSA/Pz0ge307XG4gICAgICBuZ2hbQ09OVEFJTkVSU11bbm9PZmZzZXRJbmRleF0gPSBzZXJpYWxpemVMQ29udGFpbmVyKGxWaWV3W2ldLCBjb250ZXh0KTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkobFZpZXdbaV0pKSB7XG4gICAgICAvLyBUaGlzIGlzIGEgY29tcG9uZW50LCBhbm5vdGF0ZSB0aGUgaG9zdCBub2RlIHdpdGggYW4gYG5naGAgYXR0cmlidXRlLlxuICAgICAgY29uc3QgdGFyZ2V0Tm9kZSA9IHVud3JhcFJOb2RlKGxWaWV3W2ldW0hPU1RdISk7XG4gICAgICBpZiAoISh0YXJnZXROb2RlIGFzIEhUTUxFbGVtZW50KS5oYXNBdHRyaWJ1dGUoU0tJUF9IWURSQVRJT05fQVRUUl9OQU1FKSkge1xuICAgICAgICBhbm5vdGF0ZUhvc3RFbGVtZW50Rm9ySHlkcmF0aW9uKHRhcmdldE5vZGUgYXMgUkVsZW1lbnQsIGxWaWV3W2ldLCBjb250ZXh0KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gPG5nLWNvbnRhaW5lcj4gY2FzZVxuICAgICAgaWYgKHROb2RlLnR5cGUgJiBUTm9kZVR5cGUuRWxlbWVudENvbnRhaW5lcikge1xuICAgICAgICAvLyBBbiA8bmctY29udGFpbmVyPiBpcyByZXByZXNlbnRlZCBieSB0aGUgbnVtYmVyIG9mXG4gICAgICAgIC8vIHRvcC1sZXZlbCBub2Rlcy4gVGhpcyBpbmZvcm1hdGlvbiBpcyBuZWVkZWQgdG8gc2tpcCBvdmVyXG4gICAgICAgIC8vIHRob3NlIG5vZGVzIHRvIHJlYWNoIGEgY29ycmVzcG9uZGluZyBhbmNob3Igbm9kZSAoY29tbWVudCBub2RlKS5cbiAgICAgICAgbmdoW0VMRU1FTlRfQ09OVEFJTkVSU10gPz89IHt9O1xuICAgICAgICBuZ2hbRUxFTUVOVF9DT05UQUlORVJTXVtub09mZnNldEluZGV4XSA9IGNhbGNOdW1Sb290Tm9kZXModFZpZXcsIGxWaWV3LCB0Tm9kZS5jaGlsZCk7XG4gICAgICB9IGVsc2UgaWYgKHROb2RlLnR5cGUgJiBUTm9kZVR5cGUuUHJvamVjdGlvbikge1xuICAgICAgICAvLyBDdXJyZW50IFROb2RlIHJlcHJlc2VudHMgYW4gYDxuZy1jb250ZW50PmAgc2xvdCwgdGh1cyBpdCBoYXMgbm9cbiAgICAgICAgLy8gRE9NIGVsZW1lbnRzIGFzc29jaWF0ZWQgd2l0aCBpdCwgc28gdGhlICoqbmV4dCBzaWJsaW5nKiogbm9kZSB3b3VsZFxuICAgICAgICAvLyBub3QgYmUgYWJsZSB0byBmaW5kIGFuIGFuY2hvci4gSW4gdGhpcyBjYXNlLCB1c2UgZnVsbCBwYXRoIGluc3RlYWQuXG4gICAgICAgIGxldCBuZXh0VE5vZGUgPSB0Tm9kZS5uZXh0O1xuICAgICAgICAvLyBTa2lwIG92ZXIgYWxsIGA8bmctY29udGVudD5gIHNsb3RzIGluIGEgcm93LlxuICAgICAgICB3aGlsZSAobmV4dFROb2RlICE9PSBudWxsICYmIChuZXh0VE5vZGUudHlwZSAmIFROb2RlVHlwZS5Qcm9qZWN0aW9uKSkge1xuICAgICAgICAgIG5leHRUTm9kZSA9IG5leHRUTm9kZS5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXh0VE5vZGUgJiYgIWlzSW5Ta2lwSHlkcmF0aW9uQmxvY2sobmV4dFROb2RlKSkge1xuICAgICAgICAgIC8vIEhhbmRsZSBhIHROb2RlIGFmdGVyIHRoZSBgPG5nLWNvbnRlbnQ+YCBzbG90LlxuICAgICAgICAgIGFwcGVuZFNlcmlhbGl6ZWROb2RlUGF0aChuZ2gsIG5leHRUTm9kZSwgbFZpZXcpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBIYW5kbGUgY2FzZXMgd2hlcmUgdGV4dCBub2RlcyBjYW4gYmUgbG9zdCBhZnRlciBET00gc2VyaWFsaXphdGlvbjpcbiAgICAgICAgLy8gIDEuIFdoZW4gdGhlcmUgaXMgYW4gKmVtcHR5IHRleHQgbm9kZSogaW4gRE9NOiBpbiB0aGlzIGNhc2UsIHRoaXNcbiAgICAgICAgLy8gICAgIG5vZGUgd291bGQgbm90IG1ha2UgaXQgaW50byB0aGUgc2VyaWFsaXplZCBzdHJpbmcgYW5kIGFzIGEgcmVzdWx0LFxuICAgICAgICAvLyAgICAgdGhpcyBub2RlIHdvdWxkbid0IGJlIGNyZWF0ZWQgaW4gYSBicm93c2VyLiBUaGlzIHdvdWxkIHJlc3VsdCBpblxuICAgICAgICAvLyAgICAgYSBtaXNtYXRjaCBkdXJpbmcgdGhlIGh5ZHJhdGlvbiwgd2hlcmUgdGhlIHJ1bnRpbWUgbG9naWMgd291bGQgZXhwZWN0XG4gICAgICAgIC8vICAgICBhIHRleHQgbm9kZSB0byBiZSBwcmVzZW50IGluIGxpdmUgRE9NLCBidXQgbm8gdGV4dCBub2RlIHdvdWxkIGV4aXN0LlxuICAgICAgICAvLyAgICAgRXhhbXBsZTogYDxzcGFuPnt7IG5hbWUgfX08L3NwYW4+YCB3aGVuIHRoZSBgbmFtZWAgaXMgYW4gZW1wdHkgc3RyaW5nLlxuICAgICAgICAvLyAgICAgVGhpcyB3b3VsZCByZXN1bHQgaW4gYDxzcGFuPjwvc3Bhbj5gIHN0cmluZyBhZnRlciBzZXJpYWxpemF0aW9uIGFuZFxuICAgICAgICAvLyAgICAgaW4gYSBicm93c2VyIG9ubHkgdGhlIGBzcGFuYCBlbGVtZW50IHdvdWxkIGJlIGNyZWF0ZWQuIFRvIHJlc29sdmUgdGhhdCxcbiAgICAgICAgLy8gICAgIGFuIGV4dHJhIGNvbW1lbnQgbm9kZSBpcyBhcHBlbmRlZCBpbiBwbGFjZSBvZiBhbiBlbXB0eSB0ZXh0IG5vZGUgYW5kXG4gICAgICAgIC8vICAgICB0aGF0IHNwZWNpYWwgY29tbWVudCBub2RlIGlzIHJlcGxhY2VkIHdpdGggYW4gZW1wdHkgdGV4dCBub2RlICpiZWZvcmUqXG4gICAgICAgIC8vICAgICBoeWRyYXRpb24uXG4gICAgICAgIC8vICAyLiBXaGVuIHRoZXJlIGFyZSAyIGNvbnNlY3V0aXZlIHRleHQgbm9kZXMgcHJlc2VudCBpbiB0aGUgRE9NLlxuICAgICAgICAvLyAgICAgRXhhbXBsZTogYDxkaXY+SGVsbG8gPG5nLWNvbnRhaW5lciAqbmdJZj1cInRydWVcIj53b3JsZDwvbmctY29udGFpbmVyPjwvZGl2PmAuXG4gICAgICAgIC8vICAgICBJbiB0aGlzIHNjZW5hcmlvLCB0aGUgbGl2ZSBET00gd291bGQgbG9vayBsaWtlIHRoaXM6XG4gICAgICAgIC8vICAgICAgIDxkaXY+I3RleHQoJ0hlbGxvICcpICN0ZXh0KCd3b3JsZCcpICNjb21tZW50KCdjb250YWluZXInKTwvZGl2PlxuICAgICAgICAvLyAgICAgU2VyaWFsaXplZCBzdHJpbmcgd291bGQgbG9vayBsaWtlIHRoaXM6IGA8ZGl2PkhlbGxvIHdvcmxkPCEtLWNvbnRhaW5lci0tPjwvZGl2PmAuXG4gICAgICAgIC8vICAgICBUaGUgbGl2ZSBET00gaW4gYSBicm93c2VyIGFmdGVyIHRoYXQgd291bGQgYmU6XG4gICAgICAgIC8vICAgICAgIDxkaXY+I3RleHQoJ0hlbGxvIHdvcmxkJykgI2NvbW1lbnQoJ2NvbnRhaW5lcicpPC9kaXY+XG4gICAgICAgIC8vICAgICBOb3RpY2UgaG93IDIgdGV4dCBub2RlcyBhcmUgbm93IFwibWVyZ2VkXCIgaW50byBvbmUuIFRoaXMgd291bGQgY2F1c2UgaHlkcmF0aW9uXG4gICAgICAgIC8vICAgICBsb2dpYyB0byBmYWlsLCBzaW5jZSBpdCdkIGV4cGVjdCAyIHRleHQgbm9kZXMgYmVpbmcgcHJlc2VudCwgbm90IG9uZS5cbiAgICAgICAgLy8gICAgIFRvIGZpeCB0aGlzLCB3ZSBpbnNlcnQgYSBzcGVjaWFsIGNvbW1lbnQgbm9kZSBpbiBiZXR3ZWVuIHRob3NlIHRleHQgbm9kZXMsIHNvXG4gICAgICAgIC8vICAgICBzZXJpYWxpemVkIHJlcHJlc2VudGF0aW9uIGlzOiBgPGRpdj5IZWxsbyA8IS0tbmd0bnMtLT53b3JsZDwhLS1jb250YWluZXItLT48L2Rpdj5gLlxuICAgICAgICAvLyAgICAgVGhpcyBmb3JjZXMgYnJvd3NlciB0byBjcmVhdGUgMiB0ZXh0IG5vZGVzIHNlcGFyYXRlZCBieSBhIGNvbW1lbnQgbm9kZS5cbiAgICAgICAgLy8gICAgIEJlZm9yZSBydW5uaW5nIGEgaHlkcmF0aW9uIHByb2Nlc3MsIHRoaXMgc3BlY2lhbCBjb21tZW50IG5vZGUgaXMgcmVtb3ZlZCwgc28gdGhlXG4gICAgICAgIC8vICAgICBsaXZlIERPTSBoYXMgZXhhY3RseSB0aGUgc2FtZSBzdGF0ZSBhcyBpdCB3YXMgYmVmb3JlIHNlcmlhbGl6YXRpb24uXG4gICAgICAgIGlmICh0Tm9kZS50eXBlICYgVE5vZGVUeXBlLlRleHQpIHtcbiAgICAgICAgICBjb25zdCByTm9kZSA9IHVud3JhcFJOb2RlKGxWaWV3W2ldKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAvLyBDb2xsZWN0IHRoaXMgbm9kZSBhcyByZXF1aXJlZCBzcGVjaWFsIGFubm90YXRpb24gb25seSB3aGVuIGl0c1xuICAgICAgICAgIC8vIGNvbnRlbnRzIGlzIGVtcHR5LiBPdGhlcndpc2UsIHN1Y2ggdGV4dCBub2RlIHdvdWxkIGJlIHByZXNlbnQgb25cbiAgICAgICAgICAvLyB0aGUgY2xpZW50IGFmdGVyIHNlcnZlci1zaWRlIHJlbmRlcmluZyBhbmQgbm8gc3BlY2lhbCBoYW5kbGluZyBuZWVkZWQuXG4gICAgICAgICAgaWYgKHJOb2RlLnRleHRDb250ZW50ID09PSAnJykge1xuICAgICAgICAgICAgY29udGV4dC5jb3JydXB0ZWRUZXh0Tm9kZXMuc2V0KHJOb2RlLCBUZXh0Tm9kZU1hcmtlci5FbXB0eU5vZGUpO1xuICAgICAgICAgIH0gZWxzZSBpZiAock5vZGUubmV4dFNpYmxpbmc/Lm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xuICAgICAgICAgICAgY29udGV4dC5jb3JydXB0ZWRUZXh0Tm9kZXMuc2V0KHJOb2RlLCBUZXh0Tm9kZU1hcmtlci5TZXBhcmF0b3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gbmdoO1xufVxuXG4vKipcbiAqIFNlcmlhbGl6ZXMgbm9kZSBsb2NhdGlvbiBpbiBjYXNlcyB3aGVuIGl0J3MgbmVlZGVkLCBzcGVjaWZpY2FsbHk6XG4gKlxuICogIDEuIElmIGB0Tm9kZS5wcm9qZWN0aW9uTmV4dGAgaXMgZGlmZmVyZW50IGZyb20gYHROb2RlLm5leHRgIC0gaXQgbWVhbnMgdGhhdFxuICogICAgIHRoZSBuZXh0IGB0Tm9kZWAgYWZ0ZXIgcHJvamVjdGlvbiBpcyBkaWZmZXJlbnQgZnJvbSB0aGUgb25lIGluIHRoZSBvcmlnaW5hbFxuICogICAgIHRlbXBsYXRlLiBTaW5jZSBoeWRyYXRpb24gcmVsaWVzIG9uIGB0Tm9kZS5uZXh0YCwgdGhpcyBzZXJpYWxpemVkIGluZm9cbiAqICAgICBpZiByZXF1aXJlZCB0byBoZWxwIHJ1bnRpbWUgY29kZSBmaW5kIHRoZSBub2RlIGF0IHRoZSBjb3JyZWN0IGxvY2F0aW9uLlxuICogIDIuIEluIGNlcnRhaW4gY29udGVudCBwcm9qZWN0aW9uLWJhc2VkIHVzZS1jYXNlcywgaXQncyBwb3NzaWJsZSB0aGF0IG9ubHlcbiAqICAgICBhIGNvbnRlbnQgb2YgYSBwcm9qZWN0ZWQgZWxlbWVudCBpcyByZW5kZXJlZC4gSW4gdGhpcyBjYXNlLCBjb250ZW50IG5vZGVzXG4gKiAgICAgcmVxdWlyZSBhbiBleHRyYSBhbm5vdGF0aW9uLCBzaW5jZSBydW50aW1lIGxvZ2ljIGNhbid0IHJlbHkgb24gcGFyZW50LWNoaWxkXG4gKiAgICAgY29ubmVjdGlvbiB0byBpZGVudGlmeSB0aGUgbG9jYXRpb24gb2YgYSBub2RlLlxuICovXG5mdW5jdGlvbiBjb25kaXRpb25hbGx5QW5ub3RhdGVOb2RlUGF0aChuZ2g6IFNlcmlhbGl6ZWRWaWV3LCB0Tm9kZTogVE5vZGUsIGxWaWV3OiBMVmlldzx1bmtub3duPikge1xuICAvLyBIYW5kbGUgY2FzZSAjMSBkZXNjcmliZWQgYWJvdmUuXG4gIGlmICh0Tm9kZS5wcm9qZWN0aW9uTmV4dCAmJiB0Tm9kZS5wcm9qZWN0aW9uTmV4dCAhPT0gdE5vZGUubmV4dCAmJlxuICAgICAgIWlzSW5Ta2lwSHlkcmF0aW9uQmxvY2sodE5vZGUucHJvamVjdGlvbk5leHQpKSB7XG4gICAgYXBwZW5kU2VyaWFsaXplZE5vZGVQYXRoKG5naCwgdE5vZGUucHJvamVjdGlvbk5leHQsIGxWaWV3KTtcbiAgfVxuXG4gIC8vIEhhbmRsZSBjYXNlICMyIGRlc2NyaWJlZCBhYm92ZS5cbiAgLy8gTm90ZTogd2Ugb25seSBkbyB0aGF0IGZvciB0aGUgZmlyc3Qgbm9kZSAoaS5lLiB3aGVuIGB0Tm9kZS5wcmV2ID09PSBudWxsYCksXG4gIC8vIHRoZSByZXN0IG9mIHRoZSBub2RlcyB3b3VsZCByZWx5IG9uIHRoZSBjdXJyZW50IG5vZGUgbG9jYXRpb24sIHNvIG5vIGV4dHJhXG4gIC8vIGFubm90YXRpb24gaXMgbmVlZGVkLlxuICBpZiAodE5vZGUucHJldiA9PT0gbnVsbCAmJiB0Tm9kZS5wYXJlbnQgIT09IG51bGwgJiYgaXNEaXNjb25uZWN0ZWROb2RlKHROb2RlLnBhcmVudCwgbFZpZXcpICYmXG4gICAgICAhaXNEaXNjb25uZWN0ZWROb2RlKHROb2RlLCBsVmlldykpIHtcbiAgICBhcHBlbmRTZXJpYWxpemVkTm9kZVBhdGgobmdoLCB0Tm9kZSwgbFZpZXcpO1xuICB9XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgY29tcG9uZW50IGluc3RhbmNlIHRoYXQgaXMgcmVwcmVzZW50ZWRcbiAqIGJ5IGEgZ2l2ZW4gTFZpZXcgdXNlcyBgVmlld0VuY2Fwc3VsYXRpb24uU2hhZG93RG9tYC5cbiAqL1xuZnVuY3Rpb24gY29tcG9uZW50VXNlc1NoYWRvd0RvbUVuY2Fwc3VsYXRpb24obFZpZXc6IExWaWV3KTogYm9vbGVhbiB7XG4gIGNvbnN0IGluc3RhbmNlID0gbFZpZXdbQ09OVEVYVF07XG4gIHJldHVybiBpbnN0YW5jZT8uY29uc3RydWN0b3IgP1xuICAgICAgZ2V0Q29tcG9uZW50RGVmKGluc3RhbmNlLmNvbnN0cnVjdG9yKT8uZW5jYXBzdWxhdGlvbiA9PT0gVmlld0VuY2Fwc3VsYXRpb24uU2hhZG93RG9tIDpcbiAgICAgIGZhbHNlO1xufVxuXG4vKipcbiAqIEFubm90YXRlcyBjb21wb25lbnQgaG9zdCBlbGVtZW50IGZvciBoeWRyYXRpb246XG4gKiAtIGJ5IGVpdGhlciBhZGRpbmcgdGhlIGBuZ2hgIGF0dHJpYnV0ZSBhbmQgY29sbGVjdGluZyBoeWRyYXRpb24tcmVsYXRlZCBpbmZvXG4gKiAgIGZvciB0aGUgc2VyaWFsaXphdGlvbiBhbmQgdHJhbnNmZXJyaW5nIHRvIHRoZSBjbGllbnRcbiAqIC0gb3IgYnkgYWRkaW5nIHRoZSBgbmdTa2lwSHlkcmF0aW9uYCBhdHRyaWJ1dGUgaW4gY2FzZSBBbmd1bGFyIGRldGVjdHMgdGhhdFxuICogICBjb21wb25lbnQgY29udGVudHMgaXMgbm90IGNvbXBhdGlibGUgd2l0aCBoeWRyYXRpb24uXG4gKlxuICogQHBhcmFtIGVsZW1lbnQgVGhlIEhvc3QgZWxlbWVudCB0byBiZSBhbm5vdGF0ZWRcbiAqIEBwYXJhbSBsVmlldyBUaGUgYXNzb2NpYXRlZCBMVmlld1xuICogQHBhcmFtIGNvbnRleHQgVGhlIGh5ZHJhdGlvbiBjb250ZXh0XG4gKiBAcmV0dXJucyBBbiBpbmRleCBvZiBzZXJpYWxpemVkIHZpZXcgZnJvbSB0aGUgdHJhbnNmZXIgc3RhdGUgb2JqZWN0XG4gKiAgICAgICAgICBvciBgbnVsbGAgd2hlbiBhIGdpdmVuIGNvbXBvbmVudCBjYW4gbm90IGJlIHNlcmlhbGl6ZWQuXG4gKi9cbmZ1bmN0aW9uIGFubm90YXRlSG9zdEVsZW1lbnRGb3JIeWRyYXRpb24oXG4gICAgZWxlbWVudDogUkVsZW1lbnQsIGxWaWV3OiBMVmlldywgY29udGV4dDogSHlkcmF0aW9uQ29udGV4dCk6IG51bWJlcnxudWxsIHtcbiAgY29uc3QgcmVuZGVyZXIgPSBsVmlld1tSRU5ERVJFUl07XG4gIGlmICgoaGFzSTE4bihsVmlldykgJiYgIWlzSTE4bkh5ZHJhdGlvblN1cHBvcnRFbmFibGVkKCkpIHx8XG4gICAgICBjb21wb25lbnRVc2VzU2hhZG93RG9tRW5jYXBzdWxhdGlvbihsVmlldykpIHtcbiAgICAvLyBBdHRhY2ggdGhlIHNraXAgaHlkcmF0aW9uIGF0dHJpYnV0ZSBpZiB0aGlzIGNvbXBvbmVudDpcbiAgICAvLyAtIGVpdGhlciBoYXMgaTE4biBibG9ja3MsIHNpbmNlIGh5ZHJhdGluZyBzdWNoIGJsb2NrcyBpcyBub3QgeWV0IHN1cHBvcnRlZFxuICAgIC8vIC0gb3IgdXNlcyBTaGFkb3dEb20gdmlldyBlbmNhcHN1bGF0aW9uLCBzaW5jZSBEb21pbm8gZG9lc24ndCBzdXBwb3J0XG4gICAgLy8gICBzaGFkb3cgRE9NLCBzbyB3ZSBjYW4gbm90IGd1YXJhbnRlZSB0aGF0IGNsaWVudCBhbmQgc2VydmVyIHJlcHJlc2VudGF0aW9uc1xuICAgIC8vICAgd291bGQgZXhhY3RseSBtYXRjaFxuICAgIHJlbmRlcmVyLnNldEF0dHJpYnV0ZShlbGVtZW50LCBTS0lQX0hZRFJBVElPTl9BVFRSX05BTUUsICcnKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBuZ2ggPSBzZXJpYWxpemVMVmlldyhsVmlldywgY29udGV4dCk7XG4gICAgY29uc3QgaW5kZXggPSBjb250ZXh0LnNlcmlhbGl6ZWRWaWV3Q29sbGVjdGlvbi5hZGQobmdoKTtcbiAgICByZW5kZXJlci5zZXRBdHRyaWJ1dGUoZWxlbWVudCwgTkdIX0FUVFJfTkFNRSwgaW5kZXgudG9TdHJpbmcoKSk7XG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG59XG5cbi8qKlxuICogUGh5c2ljYWxseSBpbnNlcnRzIHRoZSBjb21tZW50IG5vZGVzIHRvIGVuc3VyZSBlbXB0eSB0ZXh0IG5vZGVzIGFuZCBhZGphY2VudFxuICogdGV4dCBub2RlIHNlcGFyYXRvcnMgYXJlIHByZXNlcnZlZCBhZnRlciBzZXJ2ZXIgc2VyaWFsaXphdGlvbiBvZiB0aGUgRE9NLlxuICogVGhlc2UgZ2V0IHN3YXBwZWQgYmFjayBmb3IgZW1wdHkgdGV4dCBub2RlcyBvciBzZXBhcmF0b3JzIG9uY2UgaHlkcmF0aW9uIGhhcHBlbnNcbiAqIG9uIHRoZSBjbGllbnQuXG4gKlxuICogQHBhcmFtIGNvcnJ1cHRlZFRleHROb2RlcyBUaGUgTWFwIG9mIHRleHQgbm9kZXMgdG8gYmUgcmVwbGFjZWQgd2l0aCBjb21tZW50c1xuICogQHBhcmFtIGRvYyBUaGUgZG9jdW1lbnRcbiAqL1xuZnVuY3Rpb24gaW5zZXJ0Q29ycnVwdGVkVGV4dE5vZGVNYXJrZXJzKFxuICAgIGNvcnJ1cHRlZFRleHROb2RlczogTWFwPEhUTUxFbGVtZW50LCBzdHJpbmc+LCBkb2M6IERvY3VtZW50KSB7XG4gIGZvciAoY29uc3QgW3RleHROb2RlLCBtYXJrZXJdIG9mIGNvcnJ1cHRlZFRleHROb2Rlcykge1xuICAgIHRleHROb2RlLmFmdGVyKGRvYy5jcmVhdGVDb21tZW50KG1hcmtlcikpO1xuICB9XG59XG5cbi8qKlxuICogRGV0ZWN0cyB3aGV0aGVyIGEgZ2l2ZW4gVE5vZGUgcmVwcmVzZW50cyBhIG5vZGUgdGhhdFxuICogaXMgYmVpbmcgY29udGVudCBwcm9qZWN0ZWQuXG4gKi9cbmZ1bmN0aW9uIGlzQ29udGVudFByb2plY3RlZE5vZGUodE5vZGU6IFROb2RlKTogYm9vbGVhbiB7XG4gIGxldCBjdXJyZW50VE5vZGUgPSB0Tm9kZTtcbiAgd2hpbGUgKGN1cnJlbnRUTm9kZSAhPSBudWxsKSB7XG4gICAgLy8gSWYgd2UgY29tZSBhY3Jvc3MgYSBjb21wb25lbnQgaG9zdCBub2RlIGluIHBhcmVudCBub2RlcyAtXG4gICAgLy8gdGhpcyBUTm9kZSBpcyBpbiB0aGUgY29udGVudCBwcm9qZWN0aW9uIHNlY3Rpb24uXG4gICAgaWYgKGlzQ29tcG9uZW50SG9zdChjdXJyZW50VE5vZGUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY3VycmVudFROb2RlID0gY3VycmVudFROb2RlLnBhcmVudCBhcyBUTm9kZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG4iXX0=