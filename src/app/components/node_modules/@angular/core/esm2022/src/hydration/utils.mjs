/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { getComponent } from '../render3/util/discovery_utils';
import { getDocument } from '../render3/interfaces/document';
import { isRootView } from '../render3/interfaces/type_checks';
import { HEADER_OFFSET, TVIEW } from '../render3/interfaces/view';
import { makeStateKey, TransferState } from '../transfer_state';
import { assertDefined } from '../util/assert';
import { CONTAINERS, DISCONNECTED_NODES, ELEMENT_CONTAINERS, MULTIPLIER, NUM_ROOT_NODES, } from './interfaces';
/**
 * The name of the key used in the TransferState collection,
 * where hydration information is located.
 */
const TRANSFER_STATE_TOKEN_ID = '__nghData__';
/**
 * Lookup key used to reference DOM hydration data (ngh) in `TransferState`.
 */
export const NGH_DATA_KEY = makeStateKey(TRANSFER_STATE_TOKEN_ID);
/**
 * The name of the attribute that would be added to host component
 * nodes and contain a reference to a particular slot in transferred
 * state that contains the necessary hydration info for this component.
 */
export const NGH_ATTR_NAME = 'ngh';
/**
 * Marker used in a comment node to ensure hydration content integrity
 */
export const SSR_CONTENT_INTEGRITY_MARKER = 'nghm';
/**
 * Reference to a function that reads `ngh` attribute value from a given RNode
 * and retrieves hydration information from the TransferState using that value
 * as an index. Returns `null` by default, when hydration is not enabled.
 *
 * @param rNode Component's host element.
 * @param injector Injector that this component has access to.
 * @param isRootView Specifies whether we trying to read hydration info for the root view.
 */
let _retrieveHydrationInfoImpl = () => null;
export function retrieveHydrationInfoImpl(rNode, injector, isRootView = false) {
    let nghAttrValue = rNode.getAttribute(NGH_ATTR_NAME);
    if (nghAttrValue == null)
        return null;
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
    const [componentViewNgh, rootViewNgh] = nghAttrValue.split('|');
    nghAttrValue = isRootView ? rootViewNgh : componentViewNgh;
    if (!nghAttrValue)
        return null;
    // We've read one of the ngh ids, keep the remaining one, so that
    // we can set it back on the DOM element.
    const rootNgh = rootViewNgh ? `|${rootViewNgh}` : '';
    const remainingNgh = isRootView ? componentViewNgh : rootNgh;
    let data = {};
    // An element might have an empty `ngh` attribute value (e.g. `<comp ngh="" />`),
    // which means that no special annotations are required. Do not attempt to read
    // from the TransferState in this case.
    if (nghAttrValue !== '') {
        const transferState = injector.get(TransferState, null, { optional: true });
        if (transferState !== null) {
            const nghData = transferState.get(NGH_DATA_KEY, []);
            // The nghAttrValue is always a number referencing an index
            // in the hydration TransferState data.
            data = nghData[Number(nghAttrValue)];
            // If the `ngh` attribute exists and has a non-empty value,
            // the hydration info *must* be present in the TransferState.
            // If there is no data for some reasons, this is an error.
            ngDevMode && assertDefined(data, 'Unable to retrieve hydration info from the TransferState.');
        }
    }
    const dehydratedView = {
        data,
        firstChild: rNode.firstChild ?? null,
    };
    if (isRootView) {
        // If there is hydration info present for the root view, it means that there was
        // a ViewContainerRef injected in the root component. The root component host element
        // acted as an anchor node in this scenario. As a result, the DOM nodes that represent
        // embedded views in this ViewContainerRef are located as siblings to the host node,
        // i.e. `<app-root /><#VIEW1><#VIEW2>...<!--container-->`. In this case, the current
        // node becomes the first child of this root view and the next sibling is the first
        // element in the DOM segment.
        dehydratedView.firstChild = rNode;
        // We use `0` here, since this is the slot (right after the HEADER_OFFSET)
        // where a component LView or an LContainer is located in a root LView.
        setSegmentHead(dehydratedView, 0, rNode.nextSibling);
    }
    if (remainingNgh) {
        // If we have only used one of the ngh ids, store the remaining one
        // back on this RNode.
        rNode.setAttribute(NGH_ATTR_NAME, remainingNgh);
    }
    else {
        // The `ngh` attribute is cleared from the DOM node now
        // that the data has been retrieved for all indices.
        rNode.removeAttribute(NGH_ATTR_NAME);
    }
    // Note: don't check whether this node was claimed for hydration,
    // because this node might've been previously claimed while processing
    // template instructions.
    ngDevMode && markRNodeAsClaimedByHydration(rNode, /* checkIfAlreadyClaimed */ false);
    ngDevMode && ngDevMode.hydratedComponents++;
    return dehydratedView;
}
/**
 * Sets the implementation for the `retrieveHydrationInfo` function.
 */
export function enableRetrieveHydrationInfoImpl() {
    _retrieveHydrationInfoImpl = retrieveHydrationInfoImpl;
}
/**
 * Retrieves hydration info by reading the value from the `ngh` attribute
 * and accessing a corresponding slot in TransferState storage.
 */
export function retrieveHydrationInfo(rNode, injector, isRootView = false) {
    return _retrieveHydrationInfoImpl(rNode, injector, isRootView);
}
/**
 * Retrieves the necessary object from a given ViewRef to serialize:
 *  - an LView for component views
 *  - an LContainer for cases when component acts as a ViewContainerRef anchor
 *  - `null` in case of an embedded view
 */
export function getLNodeForHydration(viewRef) {
    // Reading an internal field from `ViewRef` instance.
    let lView = viewRef._lView;
    const tView = lView[TVIEW];
    // A registered ViewRef might represent an instance of an
    // embedded view, in which case we do not need to annotate it.
    if (tView.type === 2 /* TViewType.Embedded */) {
        return null;
    }
    // Check if it's a root view and if so, retrieve component's
    // LView from the first slot after the header.
    if (isRootView(lView)) {
        lView = lView[HEADER_OFFSET];
    }
    return lView;
}
function getTextNodeContent(node) {
    return node.textContent?.replace(/\s/gm, '');
}
/**
 * Restores text nodes and separators into the DOM that were lost during SSR
 * serialization. The hydration process replaces empty text nodes and text
 * nodes that are immediately adjacent to other text nodes with comment nodes
 * that this method filters on to restore those missing nodes that the
 * hydration process is expecting to be present.
 *
 * @param node The app's root HTML Element
 */
export function processTextNodeMarkersBeforeHydration(node) {
    const doc = getDocument();
    const commentNodesIterator = doc.createNodeIterator(node, NodeFilter.SHOW_COMMENT, {
        acceptNode(node) {
            const content = getTextNodeContent(node);
            const isTextNodeMarker = content === "ngetn" /* TextNodeMarker.EmptyNode */ || content === "ngtns" /* TextNodeMarker.Separator */;
            return isTextNodeMarker ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        },
    });
    let currentNode;
    // We cannot modify the DOM while using the commentIterator,
    // because it throws off the iterator state.
    // So we collect all marker nodes first and then follow up with
    // applying the changes to the DOM: either inserting an empty node
    // or just removing the marker if it was used as a separator.
    const nodes = [];
    while ((currentNode = commentNodesIterator.nextNode())) {
        nodes.push(currentNode);
    }
    for (const node of nodes) {
        if (node.textContent === "ngetn" /* TextNodeMarker.EmptyNode */) {
            node.replaceWith(doc.createTextNode(''));
        }
        else {
            node.remove();
        }
    }
}
/**
 * Internal type that represents a claimed node.
 * Only used in dev mode.
 */
export var HydrationStatus;
(function (HydrationStatus) {
    HydrationStatus["Hydrated"] = "hydrated";
    HydrationStatus["Skipped"] = "skipped";
    HydrationStatus["Mismatched"] = "mismatched";
})(HydrationStatus || (HydrationStatus = {}));
// clang-format on
const HYDRATION_INFO_KEY = '__ngDebugHydrationInfo__';
function patchHydrationInfo(node, info) {
    node[HYDRATION_INFO_KEY] = info;
}
export function readHydrationInfo(node) {
    return node[HYDRATION_INFO_KEY] ?? null;
}
/**
 * Marks a node as "claimed" by hydration process.
 * This is needed to make assessments in tests whether
 * the hydration process handled all nodes.
 */
export function markRNodeAsClaimedByHydration(node, checkIfAlreadyClaimed = true) {
    if (!ngDevMode) {
        throw new Error('Calling `markRNodeAsClaimedByHydration` in prod mode ' +
            'is not supported and likely a mistake.');
    }
    if (checkIfAlreadyClaimed && isRNodeClaimedForHydration(node)) {
        throw new Error('Trying to claim a node, which was claimed already.');
    }
    patchHydrationInfo(node, { status: HydrationStatus.Hydrated });
    ngDevMode.hydratedNodes++;
}
export function markRNodeAsSkippedByHydration(node) {
    if (!ngDevMode) {
        throw new Error('Calling `markRNodeAsSkippedByHydration` in prod mode ' +
            'is not supported and likely a mistake.');
    }
    patchHydrationInfo(node, { status: HydrationStatus.Skipped });
    ngDevMode.componentsSkippedHydration++;
}
export function markRNodeAsHavingHydrationMismatch(node, expectedNodeDetails = null, actualNodeDetails = null) {
    if (!ngDevMode) {
        throw new Error('Calling `markRNodeAsMismatchedByHydration` in prod mode ' +
            'is not supported and likely a mistake.');
    }
    // The RNode can be a standard HTMLElement (not an Angular component or directive)
    // The devtools component tree only displays Angular components & directives
    // Therefore we attach the debug info to the closest component/directive
    while (node && !getComponent(node)) {
        node = node?.parentNode;
    }
    if (node) {
        patchHydrationInfo(node, {
            status: HydrationStatus.Mismatched,
            expectedNodeDetails,
            actualNodeDetails,
        });
    }
}
export function isRNodeClaimedForHydration(node) {
    return readHydrationInfo(node)?.status === HydrationStatus.Hydrated;
}
export function setSegmentHead(hydrationInfo, index, node) {
    hydrationInfo.segmentHeads ??= {};
    hydrationInfo.segmentHeads[index] = node;
}
export function getSegmentHead(hydrationInfo, index) {
    return hydrationInfo.segmentHeads?.[index] ?? null;
}
/**
 * Returns the size of an <ng-container>, using either the information
 * serialized in `ELEMENT_CONTAINERS` (element container size) or by
 * computing the sum of root nodes in all dehydrated views in a given
 * container (in case this `<ng-container>` was also used as a view
 * container host node, e.g. <ng-container *ngIf>).
 */
export function getNgContainerSize(hydrationInfo, index) {
    const data = hydrationInfo.data;
    let size = data[ELEMENT_CONTAINERS]?.[index] ?? null;
    // If there is no serialized information available in the `ELEMENT_CONTAINERS` slot,
    // check if we have info about view containers at this location (e.g.
    // `<ng-container *ngIf>`) and use container size as a number of root nodes in this
    // element container.
    if (size === null && data[CONTAINERS]?.[index]) {
        size = calcSerializedContainerSize(hydrationInfo, index);
    }
    return size;
}
export function getSerializedContainerViews(hydrationInfo, index) {
    return hydrationInfo.data[CONTAINERS]?.[index] ?? null;
}
/**
 * Computes the size of a serialized container (the number of root nodes)
 * by calculating the sum of root nodes in all dehydrated views in this container.
 */
export function calcSerializedContainerSize(hydrationInfo, index) {
    const views = getSerializedContainerViews(hydrationInfo, index) ?? [];
    let numNodes = 0;
    for (let view of views) {
        numNodes += view[NUM_ROOT_NODES] * (view[MULTIPLIER] ?? 1);
    }
    return numNodes;
}
/**
 * Checks whether a node is annotated as "disconnected", i.e. not present
 * in the DOM at serialization time. We should not attempt hydration for
 * such nodes and instead, use a regular "creation mode".
 */
export function isDisconnectedNode(hydrationInfo, index) {
    // Check if we are processing disconnected info for the first time.
    if (typeof hydrationInfo.disconnectedNodes === 'undefined') {
        const nodeIds = hydrationInfo.data[DISCONNECTED_NODES];
        hydrationInfo.disconnectedNodes = nodeIds ? new Set(nodeIds) : null;
    }
    return !!hydrationInfo.disconnectedNodes?.has(index);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9oeWRyYXRpb24vdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBSUgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBRTdELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUUzRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDN0QsT0FBTyxFQUFDLGFBQWEsRUFBUyxLQUFLLEVBQVksTUFBTSw0QkFBNEIsQ0FBQztBQUNsRixPQUFPLEVBQUMsWUFBWSxFQUFFLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzlELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQUMsVUFBVSxFQUFrQixrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxVQUFVLEVBQUUsY0FBYyxHQUEyQyxNQUFNLGNBQWMsQ0FBQztBQUV0Szs7O0dBR0c7QUFDSCxNQUFNLHVCQUF1QixHQUFHLGFBQWEsQ0FBQztBQUU5Qzs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxZQUFZLENBQXdCLHVCQUF1QixDQUFDLENBQUM7QUFFekY7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUM7QUFFbkM7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSw0QkFBNEIsR0FBRyxNQUFNLENBQUM7QUFzQm5EOzs7Ozs7OztHQVFHO0FBQ0gsSUFBSSwwQkFBMEIsR0FBcUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO0FBRTlFLE1BQU0sVUFBVSx5QkFBeUIsQ0FDckMsS0FBZSxFQUNmLFFBQWtCLEVBQ2xCLFVBQVUsR0FBRyxLQUFLO0lBRXBCLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDckQsSUFBSSxZQUFZLElBQUksSUFBSTtRQUFFLE9BQU8sSUFBSSxDQUFDO0lBRXRDLHFGQUFxRjtJQUNyRix3RkFBd0Y7SUFDeEYscUZBQXFGO0lBQ3JGLHdGQUF3RjtJQUN4RixrRkFBa0Y7SUFDbEYsd0ZBQXdGO0lBQ3hGLDBGQUEwRjtJQUMxRix1RkFBdUY7SUFDdkYsOEZBQThGO0lBQzlGLCtEQUErRDtJQUMvRCxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoRSxZQUFZLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDO0lBQzNELElBQUksQ0FBQyxZQUFZO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFFL0IsaUVBQWlFO0lBQ2pFLHlDQUF5QztJQUN6QyxNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNyRCxNQUFNLFlBQVksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFFN0QsSUFBSSxJQUFJLEdBQW1CLEVBQUUsQ0FBQztJQUM5QixpRkFBaUY7SUFDakYsK0VBQStFO0lBQy9FLHVDQUF1QztJQUN2QyxJQUFJLFlBQVksS0FBSyxFQUFFLEVBQUUsQ0FBQztRQUN4QixNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUMxRSxJQUFJLGFBQWEsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUMzQixNQUFNLE9BQU8sR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztZQUVwRCwyREFBMkQ7WUFDM0QsdUNBQXVDO1lBQ3ZDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFFckMsMkRBQTJEO1lBQzNELDZEQUE2RDtZQUM3RCwwREFBMEQ7WUFDMUQsU0FBUyxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUUsMkRBQTJELENBQUMsQ0FBQztRQUNoRyxDQUFDO0lBQ0gsQ0FBQztJQUNELE1BQU0sY0FBYyxHQUFtQjtRQUNyQyxJQUFJO1FBQ0osVUFBVSxFQUFFLEtBQUssQ0FBQyxVQUFVLElBQUksSUFBSTtLQUNyQyxDQUFDO0lBRUYsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUNmLGdGQUFnRjtRQUNoRixxRkFBcUY7UUFDckYsc0ZBQXNGO1FBQ3RGLG9GQUFvRjtRQUNwRixvRkFBb0Y7UUFDcEYsbUZBQW1GO1FBQ25GLDhCQUE4QjtRQUM5QixjQUFjLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUVsQywwRUFBMEU7UUFDMUUsdUVBQXVFO1FBQ3ZFLGNBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqQixtRUFBbUU7UUFDbkUsc0JBQXNCO1FBQ3RCLEtBQUssQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ2xELENBQUM7U0FBTSxDQUFDO1FBQ04sdURBQXVEO1FBQ3ZELG9EQUFvRDtRQUNwRCxLQUFLLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxpRUFBaUU7SUFDakUsc0VBQXNFO0lBQ3RFLHlCQUF5QjtJQUN6QixTQUFTLElBQUksNkJBQTZCLENBQUMsS0FBSyxFQUFFLDJCQUEyQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JGLFNBQVMsSUFBSSxTQUFTLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUU1QyxPQUFPLGNBQWMsQ0FBQztBQUN4QixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLFVBQVUsK0JBQStCO0lBQzdDLDBCQUEwQixHQUFHLHlCQUF5QixDQUFDO0FBQ3pELENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUscUJBQXFCLENBQ2pDLEtBQWUsRUFDZixRQUFrQixFQUNsQixVQUFVLEdBQUcsS0FBSztJQUVwQixPQUFPLDBCQUEwQixDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDakUsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLG9CQUFvQixDQUFDLE9BQWdCO0lBQ25ELHFEQUFxRDtJQUNyRCxJQUFJLEtBQUssR0FBSSxPQUFlLENBQUMsTUFBZSxDQUFDO0lBQzdDLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQix5REFBeUQ7SUFDekQsOERBQThEO0lBQzlELElBQUksS0FBSyxDQUFDLElBQUksK0JBQXVCLEVBQUUsQ0FBQztRQUN0QyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCw0REFBNEQ7SUFDNUQsOENBQThDO0lBQzlDLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDdEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBRUQsU0FBUyxrQkFBa0IsQ0FBQyxJQUFVO0lBQ3BDLE9BQU8sSUFBSSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQy9DLENBQUM7QUFFRDs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sVUFBVSxxQ0FBcUMsQ0FBQyxJQUFpQjtJQUNyRSxNQUFNLEdBQUcsR0FBRyxXQUFXLEVBQUUsQ0FBQztJQUMxQixNQUFNLG9CQUFvQixHQUFHLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLFlBQVksRUFBRTtRQUNqRixVQUFVLENBQUMsSUFBSTtZQUNiLE1BQU0sT0FBTyxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pDLE1BQU0sZ0JBQWdCLEdBQ2xCLE9BQU8sMkNBQTZCLElBQUksT0FBTywyQ0FBNkIsQ0FBQztZQUNqRixPQUFPLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQ2hGLENBQUM7S0FDRixDQUFDLENBQUM7SUFDSCxJQUFJLFdBQW9CLENBQUM7SUFDekIsNERBQTREO0lBQzVELDRDQUE0QztJQUM1QywrREFBK0Q7SUFDL0Qsa0VBQWtFO0lBQ2xFLDZEQUE2RDtJQUM3RCxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDakIsT0FBTyxDQUFDLFdBQVcsR0FBRyxvQkFBb0IsQ0FBQyxRQUFRLEVBQWEsQ0FBQyxFQUFFLENBQUM7UUFDbEUsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUN6QixJQUFJLElBQUksQ0FBQyxXQUFXLDJDQUE2QixFQUFFLENBQUM7WUFDbEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0MsQ0FBQzthQUFNLENBQUM7WUFDTixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDaEIsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxDQUFOLElBQVksZUFJWDtBQUpELFdBQVksZUFBZTtJQUN6Qix3Q0FBcUIsQ0FBQTtJQUNyQixzQ0FBbUIsQ0FBQTtJQUNuQiw0Q0FBeUIsQ0FBQTtBQUMzQixDQUFDLEVBSlcsZUFBZSxLQUFmLGVBQWUsUUFJMUI7QUFVRCxrQkFBa0I7QUFFbEIsTUFBTSxrQkFBa0IsR0FBRywwQkFBMEIsQ0FBQztBQU10RCxTQUFTLGtCQUFrQixDQUFDLElBQVcsRUFBRSxJQUFtQjtJQUN6RCxJQUFxQixDQUFDLGtCQUFrQixDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ3BELENBQUM7QUFFRCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsSUFBVztJQUMzQyxPQUFRLElBQXFCLENBQUMsa0JBQWtCLENBQUMsSUFBSSxJQUFJLENBQUM7QUFDNUQsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsNkJBQTZCLENBQUMsSUFBVyxFQUFFLHFCQUFxQixHQUFHLElBQUk7SUFDckYsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2YsTUFBTSxJQUFJLEtBQUssQ0FDWCx1REFBdUQ7WUFDbkQsd0NBQXdDLENBQy9DLENBQUM7SUFDSixDQUFDO0lBQ0QsSUFBSSxxQkFBcUIsSUFBSSwwQkFBMEIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQzlELE1BQU0sSUFBSSxLQUFLLENBQUMsb0RBQW9ELENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBQ0Qsa0JBQWtCLENBQUMsSUFBSSxFQUFFLEVBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDO0lBQzdELFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztBQUM1QixDQUFDO0FBRUQsTUFBTSxVQUFVLDZCQUE2QixDQUFDLElBQVc7SUFDdkQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2YsTUFBTSxJQUFJLEtBQUssQ0FDWCx1REFBdUQ7WUFDbkQsd0NBQXdDLENBQy9DLENBQUM7SUFDSixDQUFDO0lBQ0Qsa0JBQWtCLENBQUMsSUFBSSxFQUFFLEVBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDO0lBQzVELFNBQVMsQ0FBQywwQkFBMEIsRUFBRSxDQUFDO0FBQ3pDLENBQUM7QUFFRCxNQUFNLFVBQVUsa0NBQWtDLENBQzlDLElBQVcsRUFDWCxzQkFBbUMsSUFBSSxFQUN2QyxvQkFBaUMsSUFBSTtJQUV2QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDZixNQUFNLElBQUksS0FBSyxDQUNYLDBEQUEwRDtZQUN0RCx3Q0FBd0MsQ0FDL0MsQ0FBQztJQUNKLENBQUM7SUFFRCxrRkFBa0Y7SUFDbEYsNEVBQTRFO0lBQzVFLHdFQUF3RTtJQUN4RSxPQUFPLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFlLENBQUMsRUFBRSxDQUFDO1FBQzlDLElBQUksR0FBRyxJQUFJLEVBQUUsVUFBbUIsQ0FBQztJQUNuQyxDQUFDO0lBRUQsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNULGtCQUFrQixDQUFDLElBQUksRUFBRTtZQUN2QixNQUFNLEVBQUUsZUFBZSxDQUFDLFVBQVU7WUFDbEMsbUJBQW1CO1lBQ25CLGlCQUFpQjtTQUNsQixDQUFDLENBQUM7SUFDTCxDQUFDO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSwwQkFBMEIsQ0FBQyxJQUFXO0lBQ3BELE9BQU8saUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxLQUFLLGVBQWUsQ0FBQyxRQUFRLENBQUM7QUFDdEUsQ0FBQztBQUVELE1BQU0sVUFBVSxjQUFjLENBQzFCLGFBQTZCLEVBQzdCLEtBQWEsRUFDYixJQUFnQjtJQUVsQixhQUFhLENBQUMsWUFBWSxLQUFLLEVBQUUsQ0FBQztJQUNsQyxhQUFhLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztBQUMzQyxDQUFDO0FBRUQsTUFBTSxVQUFVLGNBQWMsQ0FBQyxhQUE2QixFQUFFLEtBQWE7SUFDekUsT0FBTyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDO0FBQ3JELENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsYUFBNkIsRUFBRSxLQUFhO0lBQzdFLE1BQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUM7SUFDaEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUM7SUFDckQsb0ZBQW9GO0lBQ3BGLHFFQUFxRTtJQUNyRSxtRkFBbUY7SUFDbkYscUJBQXFCO0lBQ3JCLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQy9DLElBQUksR0FBRywyQkFBMkIsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVELE1BQU0sVUFBVSwyQkFBMkIsQ0FDdkMsYUFBNkIsRUFDN0IsS0FBYTtJQUVmLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQztBQUN6RCxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLDJCQUEyQixDQUFDLGFBQTZCLEVBQUUsS0FBYTtJQUN0RixNQUFNLEtBQUssR0FBRywyQkFBMkIsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3RFLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztJQUNqQixLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ3ZCLFFBQVEsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUNELE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGtCQUFrQixDQUFDLGFBQTZCLEVBQUUsS0FBYTtJQUM3RSxtRUFBbUU7SUFDbkUsSUFBSSxPQUFPLGFBQWEsQ0FBQyxpQkFBaUIsS0FBSyxXQUFXLEVBQUUsQ0FBQztRQUMzRCxNQUFNLE9BQU8sR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDdkQsYUFBYSxDQUFDLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUN0RSxDQUFDO0lBQ0QsT0FBTyxDQUFDLENBQUMsYUFBYSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN2RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0b3J9IGZyb20gJy4uL2RpL2luamVjdG9yJztcbmltcG9ydCB0eXBlIHtWaWV3UmVmfSBmcm9tICcuLi9saW5rZXIvdmlld19yZWYnO1xuaW1wb3J0IHtnZXRDb21wb25lbnR9IGZyb20gJy4uL3JlbmRlcjMvdXRpbC9kaXNjb3ZlcnlfdXRpbHMnO1xuaW1wb3J0IHtMQ29udGFpbmVyfSBmcm9tICcuLi9yZW5kZXIzL2ludGVyZmFjZXMvY29udGFpbmVyJztcbmltcG9ydCB7Z2V0RG9jdW1lbnR9IGZyb20gJy4uL3JlbmRlcjMvaW50ZXJmYWNlcy9kb2N1bWVudCc7XG5pbXBvcnQge1JFbGVtZW50LCBSTm9kZX0gZnJvbSAnLi4vcmVuZGVyMy9pbnRlcmZhY2VzL3JlbmRlcmVyX2RvbSc7XG5pbXBvcnQge2lzUm9vdFZpZXd9IGZyb20gJy4uL3JlbmRlcjMvaW50ZXJmYWNlcy90eXBlX2NoZWNrcyc7XG5pbXBvcnQge0hFQURFUl9PRkZTRVQsIExWaWV3LCBUVklFVywgVFZpZXdUeXBlfSBmcm9tICcuLi9yZW5kZXIzL2ludGVyZmFjZXMvdmlldyc7XG5pbXBvcnQge21ha2VTdGF0ZUtleSwgVHJhbnNmZXJTdGF0ZX0gZnJvbSAnLi4vdHJhbnNmZXJfc3RhdGUnO1xuaW1wb3J0IHthc3NlcnREZWZpbmVkfSBmcm9tICcuLi91dGlsL2Fzc2VydCc7XG5cbmltcG9ydCB7Q09OVEFJTkVSUywgRGVoeWRyYXRlZFZpZXcsIERJU0NPTk5FQ1RFRF9OT0RFUywgRUxFTUVOVF9DT05UQUlORVJTLCBNVUxUSVBMSUVSLCBOVU1fUk9PVF9OT0RFUywgU2VyaWFsaXplZENvbnRhaW5lclZpZXcsIFNlcmlhbGl6ZWRWaWV3LH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcblxuLyoqXG4gKiBUaGUgbmFtZSBvZiB0aGUga2V5IHVzZWQgaW4gdGhlIFRyYW5zZmVyU3RhdGUgY29sbGVjdGlvbixcbiAqIHdoZXJlIGh5ZHJhdGlvbiBpbmZvcm1hdGlvbiBpcyBsb2NhdGVkLlxuICovXG5jb25zdCBUUkFOU0ZFUl9TVEFURV9UT0tFTl9JRCA9ICdfX25naERhdGFfXyc7XG5cbi8qKlxuICogTG9va3VwIGtleSB1c2VkIHRvIHJlZmVyZW5jZSBET00gaHlkcmF0aW9uIGRhdGEgKG5naCkgaW4gYFRyYW5zZmVyU3RhdGVgLlxuICovXG5leHBvcnQgY29uc3QgTkdIX0RBVEFfS0VZID0gbWFrZVN0YXRlS2V5PEFycmF5PFNlcmlhbGl6ZWRWaWV3Pj4oVFJBTlNGRVJfU1RBVEVfVE9LRU5fSUQpO1xuXG4vKipcbiAqIFRoZSBuYW1lIG9mIHRoZSBhdHRyaWJ1dGUgdGhhdCB3b3VsZCBiZSBhZGRlZCB0byBob3N0IGNvbXBvbmVudFxuICogbm9kZXMgYW5kIGNvbnRhaW4gYSByZWZlcmVuY2UgdG8gYSBwYXJ0aWN1bGFyIHNsb3QgaW4gdHJhbnNmZXJyZWRcbiAqIHN0YXRlIHRoYXQgY29udGFpbnMgdGhlIG5lY2Vzc2FyeSBoeWRyYXRpb24gaW5mbyBmb3IgdGhpcyBjb21wb25lbnQuXG4gKi9cbmV4cG9ydCBjb25zdCBOR0hfQVRUUl9OQU1FID0gJ25naCc7XG5cbi8qKlxuICogTWFya2VyIHVzZWQgaW4gYSBjb21tZW50IG5vZGUgdG8gZW5zdXJlIGh5ZHJhdGlvbiBjb250ZW50IGludGVncml0eVxuICovXG5leHBvcnQgY29uc3QgU1NSX0NPTlRFTlRfSU5URUdSSVRZX01BUktFUiA9ICduZ2htJztcblxuZXhwb3J0IGNvbnN0IGVudW0gVGV4dE5vZGVNYXJrZXIge1xuICAvKipcbiAgICogVGhlIGNvbnRlbnRzIG9mIHRoZSB0ZXh0IGNvbW1lbnQgYWRkZWQgdG8gbm9kZXMgdGhhdCB3b3VsZCBvdGhlcndpc2UgYmVcbiAgICogZW1wdHkgd2hlbiBzZXJpYWxpemVkIGJ5IHRoZSBzZXJ2ZXIgYW5kIHBhc3NlZCB0byB0aGUgY2xpZW50LiBUaGUgZW1wdHlcbiAgICogbm9kZSBpcyBsb3N0IHdoZW4gdGhlIGJyb3dzZXIgcGFyc2VzIGl0IG90aGVyd2lzZS4gVGhpcyBjb21tZW50IG5vZGUgd2lsbFxuICAgKiBiZSByZXBsYWNlZCBkdXJpbmcgaHlkcmF0aW9uIGluIHRoZSBjbGllbnQgdG8gcmVzdG9yZSB0aGUgbG9zdCBlbXB0eSB0ZXh0XG4gICAqIG5vZGUuXG4gICAqL1xuICBFbXB0eU5vZGUgPSAnbmdldG4nLFxuXG4gIC8qKlxuICAgKiBUaGUgY29udGVudHMgb2YgdGhlIHRleHQgY29tbWVudCBhZGRlZCBpbiB0aGUgY2FzZSBvZiBhZGphY2VudCB0ZXh0IG5vZGVzLlxuICAgKiBXaGVuIGFkamFjZW50IHRleHQgbm9kZXMgYXJlIHNlcmlhbGl6ZWQgYnkgdGhlIHNlcnZlciBhbmQgc2VudCB0byB0aGVcbiAgICogY2xpZW50LCB0aGUgYnJvd3NlciBsb3NlcyByZWZlcmVuY2UgdG8gdGhlIGFtb3VudCBvZiBub2RlcyBhbmQgYXNzdW1lc1xuICAgKiBqdXN0IG9uZSB0ZXh0IG5vZGUuIFRoaXMgc2VwYXJhdG9yIGlzIHJlcGxhY2VkIGR1cmluZyBoeWRyYXRpb24gdG8gcmVzdG9yZVxuICAgKiB0aGUgcHJvcGVyIHNlcGFyYXRpb24gYW5kIGFtb3VudCBvZiB0ZXh0IG5vZGVzIHRoYXQgc2hvdWxkIGJlIHByZXNlbnQuXG4gICAqL1xuICBTZXBhcmF0b3IgPSAnbmd0bnMnLFxufVxuXG4vKipcbiAqIFJlZmVyZW5jZSB0byBhIGZ1bmN0aW9uIHRoYXQgcmVhZHMgYG5naGAgYXR0cmlidXRlIHZhbHVlIGZyb20gYSBnaXZlbiBSTm9kZVxuICogYW5kIHJldHJpZXZlcyBoeWRyYXRpb24gaW5mb3JtYXRpb24gZnJvbSB0aGUgVHJhbnNmZXJTdGF0ZSB1c2luZyB0aGF0IHZhbHVlXG4gKiBhcyBhbiBpbmRleC4gUmV0dXJucyBgbnVsbGAgYnkgZGVmYXVsdCwgd2hlbiBoeWRyYXRpb24gaXMgbm90IGVuYWJsZWQuXG4gKlxuICogQHBhcmFtIHJOb2RlIENvbXBvbmVudCdzIGhvc3QgZWxlbWVudC5cbiAqIEBwYXJhbSBpbmplY3RvciBJbmplY3RvciB0aGF0IHRoaXMgY29tcG9uZW50IGhhcyBhY2Nlc3MgdG8uXG4gKiBAcGFyYW0gaXNSb290VmlldyBTcGVjaWZpZXMgd2hldGhlciB3ZSB0cnlpbmcgdG8gcmVhZCBoeWRyYXRpb24gaW5mbyBmb3IgdGhlIHJvb3Qgdmlldy5cbiAqL1xubGV0IF9yZXRyaWV2ZUh5ZHJhdGlvbkluZm9JbXBsOiB0eXBlb2YgcmV0cmlldmVIeWRyYXRpb25JbmZvSW1wbCA9ICgpID0+IG51bGw7XG5cbmV4cG9ydCBmdW5jdGlvbiByZXRyaWV2ZUh5ZHJhdGlvbkluZm9JbXBsKFxuICAgIHJOb2RlOiBSRWxlbWVudCxcbiAgICBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgaXNSb290VmlldyA9IGZhbHNlLFxuICAgICk6IERlaHlkcmF0ZWRWaWV3fG51bGwge1xuICBsZXQgbmdoQXR0clZhbHVlID0gck5vZGUuZ2V0QXR0cmlidXRlKE5HSF9BVFRSX05BTUUpO1xuICBpZiAobmdoQXR0clZhbHVlID09IG51bGwpIHJldHVybiBudWxsO1xuXG4gIC8vIEZvciBjYXNlcyB3aGVuIGEgcm9vdCBjb21wb25lbnQgYWxzbyBhY3RzIGFzIGFuIGFuY2hvciBub2RlIGZvciBhIFZpZXdDb250YWluZXJSZWZcbiAgLy8gKGZvciBleGFtcGxlLCB3aGVuIFZpZXdDb250YWluZXJSZWYgaXMgaW5qZWN0ZWQgaW4gYSByb290IGNvbXBvbmVudCksIHRoZXJlIGlzIGEgbmVlZFxuICAvLyB0byBzZXJpYWxpemUgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGNvbXBvbmVudCBpdHNlbGYsIGFzIHdlbGwgYXMgYW4gTENvbnRhaW5lciB0aGF0XG4gIC8vIHJlcHJlc2VudHMgdGhpcyBWaWV3Q29udGFpbmVyUmVmLiBFZmZlY3RpdmVseSwgd2UgbmVlZCB0byBzZXJpYWxpemUgMiBwaWVjZXMgb2YgaW5mbzpcbiAgLy8gKDEpIGh5ZHJhdGlvbiBpbmZvIGZvciB0aGUgcm9vdCBjb21wb25lbnQgaXRzZWxmIGFuZCAoMikgaHlkcmF0aW9uIGluZm8gZm9yIHRoZVxuICAvLyBWaWV3Q29udGFpbmVyUmVmIGluc3RhbmNlIChhbiBMQ29udGFpbmVyKS4gRWFjaCBwaWVjZSBvZiBpbmZvcm1hdGlvbiBpcyBpbmNsdWRlZCBpbnRvXG4gIC8vIHRoZSBoeWRyYXRpb24gZGF0YSAoaW4gdGhlIFRyYW5zZmVyU3RhdGUgb2JqZWN0KSBzZXBhcmF0ZWx5LCB0aHVzIHdlIGVuZCB1cCB3aXRoIDIgaWRzLlxuICAvLyBTaW5jZSB3ZSBvbmx5IGhhdmUgMSByb290IGVsZW1lbnQsIHdlIGVuY29kZSBib3RoIGJpdHMgb2YgaW5mbyBpbnRvIGEgc2luZ2xlIHN0cmluZzpcbiAgLy8gaWRzIGFyZSBzZXBhcmF0ZWQgYnkgdGhlIGB8YCBjaGFyIChlLmcuIGAxMHwyNWAsIHdoZXJlIGAxMGAgaXMgdGhlIG5naCBmb3IgYSBjb21wb25lbnQgdmlld1xuICAvLyBhbmQgMjUgaXMgdGhlIGBuZ2hgIGZvciBhIHJvb3QgdmlldyB3aGljaCBob2xkcyBMQ29udGFpbmVyKS5cbiAgY29uc3QgW2NvbXBvbmVudFZpZXdOZ2gsIHJvb3RWaWV3TmdoXSA9IG5naEF0dHJWYWx1ZS5zcGxpdCgnfCcpO1xuICBuZ2hBdHRyVmFsdWUgPSBpc1Jvb3RWaWV3ID8gcm9vdFZpZXdOZ2ggOiBjb21wb25lbnRWaWV3TmdoO1xuICBpZiAoIW5naEF0dHJWYWx1ZSkgcmV0dXJuIG51bGw7XG5cbiAgLy8gV2UndmUgcmVhZCBvbmUgb2YgdGhlIG5naCBpZHMsIGtlZXAgdGhlIHJlbWFpbmluZyBvbmUsIHNvIHRoYXRcbiAgLy8gd2UgY2FuIHNldCBpdCBiYWNrIG9uIHRoZSBET00gZWxlbWVudC5cbiAgY29uc3Qgcm9vdE5naCA9IHJvb3RWaWV3TmdoID8gYHwke3Jvb3RWaWV3TmdofWAgOiAnJztcbiAgY29uc3QgcmVtYWluaW5nTmdoID0gaXNSb290VmlldyA/IGNvbXBvbmVudFZpZXdOZ2ggOiByb290TmdoO1xuXG4gIGxldCBkYXRhOiBTZXJpYWxpemVkVmlldyA9IHt9O1xuICAvLyBBbiBlbGVtZW50IG1pZ2h0IGhhdmUgYW4gZW1wdHkgYG5naGAgYXR0cmlidXRlIHZhbHVlIChlLmcuIGA8Y29tcCBuZ2g9XCJcIiAvPmApLFxuICAvLyB3aGljaCBtZWFucyB0aGF0IG5vIHNwZWNpYWwgYW5ub3RhdGlvbnMgYXJlIHJlcXVpcmVkLiBEbyBub3QgYXR0ZW1wdCB0byByZWFkXG4gIC8vIGZyb20gdGhlIFRyYW5zZmVyU3RhdGUgaW4gdGhpcyBjYXNlLlxuICBpZiAobmdoQXR0clZhbHVlICE9PSAnJykge1xuICAgIGNvbnN0IHRyYW5zZmVyU3RhdGUgPSBpbmplY3Rvci5nZXQoVHJhbnNmZXJTdGF0ZSwgbnVsbCwge29wdGlvbmFsOiB0cnVlfSk7XG4gICAgaWYgKHRyYW5zZmVyU3RhdGUgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IG5naERhdGEgPSB0cmFuc2ZlclN0YXRlLmdldChOR0hfREFUQV9LRVksIFtdKTtcblxuICAgICAgLy8gVGhlIG5naEF0dHJWYWx1ZSBpcyBhbHdheXMgYSBudW1iZXIgcmVmZXJlbmNpbmcgYW4gaW5kZXhcbiAgICAgIC8vIGluIHRoZSBoeWRyYXRpb24gVHJhbnNmZXJTdGF0ZSBkYXRhLlxuICAgICAgZGF0YSA9IG5naERhdGFbTnVtYmVyKG5naEF0dHJWYWx1ZSldO1xuXG4gICAgICAvLyBJZiB0aGUgYG5naGAgYXR0cmlidXRlIGV4aXN0cyBhbmQgaGFzIGEgbm9uLWVtcHR5IHZhbHVlLFxuICAgICAgLy8gdGhlIGh5ZHJhdGlvbiBpbmZvICptdXN0KiBiZSBwcmVzZW50IGluIHRoZSBUcmFuc2ZlclN0YXRlLlxuICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gZGF0YSBmb3Igc29tZSByZWFzb25zLCB0aGlzIGlzIGFuIGVycm9yLlxuICAgICAgbmdEZXZNb2RlICYmIGFzc2VydERlZmluZWQoZGF0YSwgJ1VuYWJsZSB0byByZXRyaWV2ZSBoeWRyYXRpb24gaW5mbyBmcm9tIHRoZSBUcmFuc2ZlclN0YXRlLicpO1xuICAgIH1cbiAgfVxuICBjb25zdCBkZWh5ZHJhdGVkVmlldzogRGVoeWRyYXRlZFZpZXcgPSB7XG4gICAgZGF0YSxcbiAgICBmaXJzdENoaWxkOiByTm9kZS5maXJzdENoaWxkID8/IG51bGwsXG4gIH07XG5cbiAgaWYgKGlzUm9vdFZpZXcpIHtcbiAgICAvLyBJZiB0aGVyZSBpcyBoeWRyYXRpb24gaW5mbyBwcmVzZW50IGZvciB0aGUgcm9vdCB2aWV3LCBpdCBtZWFucyB0aGF0IHRoZXJlIHdhc1xuICAgIC8vIGEgVmlld0NvbnRhaW5lclJlZiBpbmplY3RlZCBpbiB0aGUgcm9vdCBjb21wb25lbnQuIFRoZSByb290IGNvbXBvbmVudCBob3N0IGVsZW1lbnRcbiAgICAvLyBhY3RlZCBhcyBhbiBhbmNob3Igbm9kZSBpbiB0aGlzIHNjZW5hcmlvLiBBcyBhIHJlc3VsdCwgdGhlIERPTSBub2RlcyB0aGF0IHJlcHJlc2VudFxuICAgIC8vIGVtYmVkZGVkIHZpZXdzIGluIHRoaXMgVmlld0NvbnRhaW5lclJlZiBhcmUgbG9jYXRlZCBhcyBzaWJsaW5ncyB0byB0aGUgaG9zdCBub2RlLFxuICAgIC8vIGkuZS4gYDxhcHAtcm9vdCAvPjwjVklFVzE+PCNWSUVXMj4uLi48IS0tY29udGFpbmVyLS0+YC4gSW4gdGhpcyBjYXNlLCB0aGUgY3VycmVudFxuICAgIC8vIG5vZGUgYmVjb21lcyB0aGUgZmlyc3QgY2hpbGQgb2YgdGhpcyByb290IHZpZXcgYW5kIHRoZSBuZXh0IHNpYmxpbmcgaXMgdGhlIGZpcnN0XG4gICAgLy8gZWxlbWVudCBpbiB0aGUgRE9NIHNlZ21lbnQuXG4gICAgZGVoeWRyYXRlZFZpZXcuZmlyc3RDaGlsZCA9IHJOb2RlO1xuXG4gICAgLy8gV2UgdXNlIGAwYCBoZXJlLCBzaW5jZSB0aGlzIGlzIHRoZSBzbG90IChyaWdodCBhZnRlciB0aGUgSEVBREVSX09GRlNFVClcbiAgICAvLyB3aGVyZSBhIGNvbXBvbmVudCBMVmlldyBvciBhbiBMQ29udGFpbmVyIGlzIGxvY2F0ZWQgaW4gYSByb290IExWaWV3LlxuICAgIHNldFNlZ21lbnRIZWFkKGRlaHlkcmF0ZWRWaWV3LCAwLCByTm9kZS5uZXh0U2libGluZyk7XG4gIH1cblxuICBpZiAocmVtYWluaW5nTmdoKSB7XG4gICAgLy8gSWYgd2UgaGF2ZSBvbmx5IHVzZWQgb25lIG9mIHRoZSBuZ2ggaWRzLCBzdG9yZSB0aGUgcmVtYWluaW5nIG9uZVxuICAgIC8vIGJhY2sgb24gdGhpcyBSTm9kZS5cbiAgICByTm9kZS5zZXRBdHRyaWJ1dGUoTkdIX0FUVFJfTkFNRSwgcmVtYWluaW5nTmdoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBUaGUgYG5naGAgYXR0cmlidXRlIGlzIGNsZWFyZWQgZnJvbSB0aGUgRE9NIG5vZGUgbm93XG4gICAgLy8gdGhhdCB0aGUgZGF0YSBoYXMgYmVlbiByZXRyaWV2ZWQgZm9yIGFsbCBpbmRpY2VzLlxuICAgIHJOb2RlLnJlbW92ZUF0dHJpYnV0ZShOR0hfQVRUUl9OQU1FKTtcbiAgfVxuXG4gIC8vIE5vdGU6IGRvbid0IGNoZWNrIHdoZXRoZXIgdGhpcyBub2RlIHdhcyBjbGFpbWVkIGZvciBoeWRyYXRpb24sXG4gIC8vIGJlY2F1c2UgdGhpcyBub2RlIG1pZ2h0J3ZlIGJlZW4gcHJldmlvdXNseSBjbGFpbWVkIHdoaWxlIHByb2Nlc3NpbmdcbiAgLy8gdGVtcGxhdGUgaW5zdHJ1Y3Rpb25zLlxuICBuZ0Rldk1vZGUgJiYgbWFya1JOb2RlQXNDbGFpbWVkQnlIeWRyYXRpb24ock5vZGUsIC8qIGNoZWNrSWZBbHJlYWR5Q2xhaW1lZCAqLyBmYWxzZSk7XG4gIG5nRGV2TW9kZSAmJiBuZ0Rldk1vZGUuaHlkcmF0ZWRDb21wb25lbnRzKys7XG5cbiAgcmV0dXJuIGRlaHlkcmF0ZWRWaWV3O1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGltcGxlbWVudGF0aW9uIGZvciB0aGUgYHJldHJpZXZlSHlkcmF0aW9uSW5mb2AgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbmFibGVSZXRyaWV2ZUh5ZHJhdGlvbkluZm9JbXBsKCkge1xuICBfcmV0cmlldmVIeWRyYXRpb25JbmZvSW1wbCA9IHJldHJpZXZlSHlkcmF0aW9uSW5mb0ltcGw7XG59XG5cbi8qKlxuICogUmV0cmlldmVzIGh5ZHJhdGlvbiBpbmZvIGJ5IHJlYWRpbmcgdGhlIHZhbHVlIGZyb20gdGhlIGBuZ2hgIGF0dHJpYnV0ZVxuICogYW5kIGFjY2Vzc2luZyBhIGNvcnJlc3BvbmRpbmcgc2xvdCBpbiBUcmFuc2ZlclN0YXRlIHN0b3JhZ2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXRyaWV2ZUh5ZHJhdGlvbkluZm8oXG4gICAgck5vZGU6IFJFbGVtZW50LFxuICAgIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBpc1Jvb3RWaWV3ID0gZmFsc2UsXG4gICAgKTogRGVoeWRyYXRlZFZpZXd8bnVsbCB7XG4gIHJldHVybiBfcmV0cmlldmVIeWRyYXRpb25JbmZvSW1wbChyTm9kZSwgaW5qZWN0b3IsIGlzUm9vdFZpZXcpO1xufVxuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgbmVjZXNzYXJ5IG9iamVjdCBmcm9tIGEgZ2l2ZW4gVmlld1JlZiB0byBzZXJpYWxpemU6XG4gKiAgLSBhbiBMVmlldyBmb3IgY29tcG9uZW50IHZpZXdzXG4gKiAgLSBhbiBMQ29udGFpbmVyIGZvciBjYXNlcyB3aGVuIGNvbXBvbmVudCBhY3RzIGFzIGEgVmlld0NvbnRhaW5lclJlZiBhbmNob3JcbiAqICAtIGBudWxsYCBpbiBjYXNlIG9mIGFuIGVtYmVkZGVkIHZpZXdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldExOb2RlRm9ySHlkcmF0aW9uKHZpZXdSZWY6IFZpZXdSZWYpOiBMVmlld3xMQ29udGFpbmVyfG51bGwge1xuICAvLyBSZWFkaW5nIGFuIGludGVybmFsIGZpZWxkIGZyb20gYFZpZXdSZWZgIGluc3RhbmNlLlxuICBsZXQgbFZpZXcgPSAodmlld1JlZiBhcyBhbnkpLl9sVmlldyBhcyBMVmlldztcbiAgY29uc3QgdFZpZXcgPSBsVmlld1tUVklFV107XG4gIC8vIEEgcmVnaXN0ZXJlZCBWaWV3UmVmIG1pZ2h0IHJlcHJlc2VudCBhbiBpbnN0YW5jZSBvZiBhblxuICAvLyBlbWJlZGRlZCB2aWV3LCBpbiB3aGljaCBjYXNlIHdlIGRvIG5vdCBuZWVkIHRvIGFubm90YXRlIGl0LlxuICBpZiAodFZpZXcudHlwZSA9PT0gVFZpZXdUeXBlLkVtYmVkZGVkKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgLy8gQ2hlY2sgaWYgaXQncyBhIHJvb3QgdmlldyBhbmQgaWYgc28sIHJldHJpZXZlIGNvbXBvbmVudCdzXG4gIC8vIExWaWV3IGZyb20gdGhlIGZpcnN0IHNsb3QgYWZ0ZXIgdGhlIGhlYWRlci5cbiAgaWYgKGlzUm9vdFZpZXcobFZpZXcpKSB7XG4gICAgbFZpZXcgPSBsVmlld1tIRUFERVJfT0ZGU0VUXTtcbiAgfVxuXG4gIHJldHVybiBsVmlldztcbn1cblxuZnVuY3Rpb24gZ2V0VGV4dE5vZGVDb250ZW50KG5vZGU6IE5vZGUpOiBzdHJpbmd8dW5kZWZpbmVkIHtcbiAgcmV0dXJuIG5vZGUudGV4dENvbnRlbnQ/LnJlcGxhY2UoL1xccy9nbSwgJycpO1xufVxuXG4vKipcbiAqIFJlc3RvcmVzIHRleHQgbm9kZXMgYW5kIHNlcGFyYXRvcnMgaW50byB0aGUgRE9NIHRoYXQgd2VyZSBsb3N0IGR1cmluZyBTU1JcbiAqIHNlcmlhbGl6YXRpb24uIFRoZSBoeWRyYXRpb24gcHJvY2VzcyByZXBsYWNlcyBlbXB0eSB0ZXh0IG5vZGVzIGFuZCB0ZXh0XG4gKiBub2RlcyB0aGF0IGFyZSBpbW1lZGlhdGVseSBhZGphY2VudCB0byBvdGhlciB0ZXh0IG5vZGVzIHdpdGggY29tbWVudCBub2Rlc1xuICogdGhhdCB0aGlzIG1ldGhvZCBmaWx0ZXJzIG9uIHRvIHJlc3RvcmUgdGhvc2UgbWlzc2luZyBub2RlcyB0aGF0IHRoZVxuICogaHlkcmF0aW9uIHByb2Nlc3MgaXMgZXhwZWN0aW5nIHRvIGJlIHByZXNlbnQuXG4gKlxuICogQHBhcmFtIG5vZGUgVGhlIGFwcCdzIHJvb3QgSFRNTCBFbGVtZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzVGV4dE5vZGVNYXJrZXJzQmVmb3JlSHlkcmF0aW9uKG5vZGU6IEhUTUxFbGVtZW50KSB7XG4gIGNvbnN0IGRvYyA9IGdldERvY3VtZW50KCk7XG4gIGNvbnN0IGNvbW1lbnROb2Rlc0l0ZXJhdG9yID0gZG9jLmNyZWF0ZU5vZGVJdGVyYXRvcihub2RlLCBOb2RlRmlsdGVyLlNIT1dfQ09NTUVOVCwge1xuICAgIGFjY2VwdE5vZGUobm9kZSkge1xuICAgICAgY29uc3QgY29udGVudCA9IGdldFRleHROb2RlQ29udGVudChub2RlKTtcbiAgICAgIGNvbnN0IGlzVGV4dE5vZGVNYXJrZXIgPVxuICAgICAgICAgIGNvbnRlbnQgPT09IFRleHROb2RlTWFya2VyLkVtcHR5Tm9kZSB8fCBjb250ZW50ID09PSBUZXh0Tm9kZU1hcmtlci5TZXBhcmF0b3I7XG4gICAgICByZXR1cm4gaXNUZXh0Tm9kZU1hcmtlciA/IE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVCA6IE5vZGVGaWx0ZXIuRklMVEVSX1JFSkVDVDtcbiAgICB9LFxuICB9KTtcbiAgbGV0IGN1cnJlbnROb2RlOiBDb21tZW50O1xuICAvLyBXZSBjYW5ub3QgbW9kaWZ5IHRoZSBET00gd2hpbGUgdXNpbmcgdGhlIGNvbW1lbnRJdGVyYXRvcixcbiAgLy8gYmVjYXVzZSBpdCB0aHJvd3Mgb2ZmIHRoZSBpdGVyYXRvciBzdGF0ZS5cbiAgLy8gU28gd2UgY29sbGVjdCBhbGwgbWFya2VyIG5vZGVzIGZpcnN0IGFuZCB0aGVuIGZvbGxvdyB1cCB3aXRoXG4gIC8vIGFwcGx5aW5nIHRoZSBjaGFuZ2VzIHRvIHRoZSBET006IGVpdGhlciBpbnNlcnRpbmcgYW4gZW1wdHkgbm9kZVxuICAvLyBvciBqdXN0IHJlbW92aW5nIHRoZSBtYXJrZXIgaWYgaXQgd2FzIHVzZWQgYXMgYSBzZXBhcmF0b3IuXG4gIGNvbnN0IG5vZGVzID0gW107XG4gIHdoaWxlICgoY3VycmVudE5vZGUgPSBjb21tZW50Tm9kZXNJdGVyYXRvci5uZXh0Tm9kZSgpIGFzIENvbW1lbnQpKSB7XG4gICAgbm9kZXMucHVzaChjdXJyZW50Tm9kZSk7XG4gIH1cbiAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVzKSB7XG4gICAgaWYgKG5vZGUudGV4dENvbnRlbnQgPT09IFRleHROb2RlTWFya2VyLkVtcHR5Tm9kZSkge1xuICAgICAgbm9kZS5yZXBsYWNlV2l0aChkb2MuY3JlYXRlVGV4dE5vZGUoJycpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZS5yZW1vdmUoKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBJbnRlcm5hbCB0eXBlIHRoYXQgcmVwcmVzZW50cyBhIGNsYWltZWQgbm9kZS5cbiAqIE9ubHkgdXNlZCBpbiBkZXYgbW9kZS5cbiAqL1xuZXhwb3J0IGVudW0gSHlkcmF0aW9uU3RhdHVzIHtcbiAgSHlkcmF0ZWQgPSAnaHlkcmF0ZWQnLFxuICBTa2lwcGVkID0gJ3NraXBwZWQnLFxuICBNaXNtYXRjaGVkID0gJ21pc21hdGNoZWQnLFxufVxuXG4vLyBjbGFuZy1mb3JtYXQgb2ZmXG5leHBvcnQgdHlwZSBIeWRyYXRpb25JbmZvID0ge1xuICBzdGF0dXM6IEh5ZHJhdGlvblN0YXR1cy5IeWRyYXRlZHxIeWRyYXRpb25TdGF0dXMuU2tpcHBlZDtcbn18e1xuICBzdGF0dXM6IEh5ZHJhdGlvblN0YXR1cy5NaXNtYXRjaGVkO1xuICBhY3R1YWxOb2RlRGV0YWlsczogc3RyaW5nfG51bGw7XG4gIGV4cGVjdGVkTm9kZURldGFpbHM6IHN0cmluZ3xudWxsXG59O1xuLy8gY2xhbmctZm9ybWF0IG9uXG5cbmNvbnN0IEhZRFJBVElPTl9JTkZPX0tFWSA9ICdfX25nRGVidWdIeWRyYXRpb25JbmZvX18nO1xuXG5leHBvcnQgdHlwZSBIeWRyYXRlZE5vZGUgPSB7XG4gIFtIWURSQVRJT05fSU5GT19LRVldPzogSHlkcmF0aW9uSW5mbztcbn07XG5cbmZ1bmN0aW9uIHBhdGNoSHlkcmF0aW9uSW5mbyhub2RlOiBSTm9kZSwgaW5mbzogSHlkcmF0aW9uSW5mbykge1xuICAobm9kZSBhcyBIeWRyYXRlZE5vZGUpW0hZRFJBVElPTl9JTkZPX0tFWV0gPSBpbmZvO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVhZEh5ZHJhdGlvbkluZm8obm9kZTogUk5vZGUpOiBIeWRyYXRpb25JbmZvfG51bGwge1xuICByZXR1cm4gKG5vZGUgYXMgSHlkcmF0ZWROb2RlKVtIWURSQVRJT05fSU5GT19LRVldID8/IG51bGw7XG59XG5cbi8qKlxuICogTWFya3MgYSBub2RlIGFzIFwiY2xhaW1lZFwiIGJ5IGh5ZHJhdGlvbiBwcm9jZXNzLlxuICogVGhpcyBpcyBuZWVkZWQgdG8gbWFrZSBhc3Nlc3NtZW50cyBpbiB0ZXN0cyB3aGV0aGVyXG4gKiB0aGUgaHlkcmF0aW9uIHByb2Nlc3MgaGFuZGxlZCBhbGwgbm9kZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXJrUk5vZGVBc0NsYWltZWRCeUh5ZHJhdGlvbihub2RlOiBSTm9kZSwgY2hlY2tJZkFscmVhZHlDbGFpbWVkID0gdHJ1ZSkge1xuICBpZiAoIW5nRGV2TW9kZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0NhbGxpbmcgYG1hcmtSTm9kZUFzQ2xhaW1lZEJ5SHlkcmF0aW9uYCBpbiBwcm9kIG1vZGUgJyArXG4gICAgICAgICAgICAnaXMgbm90IHN1cHBvcnRlZCBhbmQgbGlrZWx5IGEgbWlzdGFrZS4nLFxuICAgICk7XG4gIH1cbiAgaWYgKGNoZWNrSWZBbHJlYWR5Q2xhaW1lZCAmJiBpc1JOb2RlQ2xhaW1lZEZvckh5ZHJhdGlvbihub2RlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignVHJ5aW5nIHRvIGNsYWltIGEgbm9kZSwgd2hpY2ggd2FzIGNsYWltZWQgYWxyZWFkeS4nKTtcbiAgfVxuICBwYXRjaEh5ZHJhdGlvbkluZm8obm9kZSwge3N0YXR1czogSHlkcmF0aW9uU3RhdHVzLkh5ZHJhdGVkfSk7XG4gIG5nRGV2TW9kZS5oeWRyYXRlZE5vZGVzKys7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXJrUk5vZGVBc1NraXBwZWRCeUh5ZHJhdGlvbihub2RlOiBSTm9kZSkge1xuICBpZiAoIW5nRGV2TW9kZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0NhbGxpbmcgYG1hcmtSTm9kZUFzU2tpcHBlZEJ5SHlkcmF0aW9uYCBpbiBwcm9kIG1vZGUgJyArXG4gICAgICAgICAgICAnaXMgbm90IHN1cHBvcnRlZCBhbmQgbGlrZWx5IGEgbWlzdGFrZS4nLFxuICAgICk7XG4gIH1cbiAgcGF0Y2hIeWRyYXRpb25JbmZvKG5vZGUsIHtzdGF0dXM6IEh5ZHJhdGlvblN0YXR1cy5Ta2lwcGVkfSk7XG4gIG5nRGV2TW9kZS5jb21wb25lbnRzU2tpcHBlZEh5ZHJhdGlvbisrO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFya1JOb2RlQXNIYXZpbmdIeWRyYXRpb25NaXNtYXRjaChcbiAgICBub2RlOiBSTm9kZSxcbiAgICBleHBlY3RlZE5vZGVEZXRhaWxzOiBzdHJpbmd8bnVsbCA9IG51bGwsXG4gICAgYWN0dWFsTm9kZURldGFpbHM6IHN0cmluZ3xudWxsID0gbnVsbCxcbikge1xuICBpZiAoIW5nRGV2TW9kZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0NhbGxpbmcgYG1hcmtSTm9kZUFzTWlzbWF0Y2hlZEJ5SHlkcmF0aW9uYCBpbiBwcm9kIG1vZGUgJyArXG4gICAgICAgICAgICAnaXMgbm90IHN1cHBvcnRlZCBhbmQgbGlrZWx5IGEgbWlzdGFrZS4nLFxuICAgICk7XG4gIH1cblxuICAvLyBUaGUgUk5vZGUgY2FuIGJlIGEgc3RhbmRhcmQgSFRNTEVsZW1lbnQgKG5vdCBhbiBBbmd1bGFyIGNvbXBvbmVudCBvciBkaXJlY3RpdmUpXG4gIC8vIFRoZSBkZXZ0b29scyBjb21wb25lbnQgdHJlZSBvbmx5IGRpc3BsYXlzIEFuZ3VsYXIgY29tcG9uZW50cyAmIGRpcmVjdGl2ZXNcbiAgLy8gVGhlcmVmb3JlIHdlIGF0dGFjaCB0aGUgZGVidWcgaW5mbyB0byB0aGUgY2xvc2VzdCBjb21wb25lbnQvZGlyZWN0aXZlXG4gIHdoaWxlIChub2RlICYmICFnZXRDb21wb25lbnQobm9kZSBhcyBFbGVtZW50KSkge1xuICAgIG5vZGUgPSBub2RlPy5wYXJlbnROb2RlIGFzIFJOb2RlO1xuICB9XG5cbiAgaWYgKG5vZGUpIHtcbiAgICBwYXRjaEh5ZHJhdGlvbkluZm8obm9kZSwge1xuICAgICAgc3RhdHVzOiBIeWRyYXRpb25TdGF0dXMuTWlzbWF0Y2hlZCxcbiAgICAgIGV4cGVjdGVkTm9kZURldGFpbHMsXG4gICAgICBhY3R1YWxOb2RlRGV0YWlscyxcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNSTm9kZUNsYWltZWRGb3JIeWRyYXRpb24obm9kZTogUk5vZGUpOiBib29sZWFuIHtcbiAgcmV0dXJuIHJlYWRIeWRyYXRpb25JbmZvKG5vZGUpPy5zdGF0dXMgPT09IEh5ZHJhdGlvblN0YXR1cy5IeWRyYXRlZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFNlZ21lbnRIZWFkKFxuICAgIGh5ZHJhdGlvbkluZm86IERlaHlkcmF0ZWRWaWV3LFxuICAgIGluZGV4OiBudW1iZXIsXG4gICAgbm9kZTogUk5vZGV8bnVsbCxcbiAgICApOiB2b2lkIHtcbiAgaHlkcmF0aW9uSW5mby5zZWdtZW50SGVhZHMgPz89IHt9O1xuICBoeWRyYXRpb25JbmZvLnNlZ21lbnRIZWFkc1tpbmRleF0gPSBub2RlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2VnbWVudEhlYWQoaHlkcmF0aW9uSW5mbzogRGVoeWRyYXRlZFZpZXcsIGluZGV4OiBudW1iZXIpOiBSTm9kZXxudWxsIHtcbiAgcmV0dXJuIGh5ZHJhdGlvbkluZm8uc2VnbWVudEhlYWRzPy5baW5kZXhdID8/IG51bGw7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgc2l6ZSBvZiBhbiA8bmctY29udGFpbmVyPiwgdXNpbmcgZWl0aGVyIHRoZSBpbmZvcm1hdGlvblxuICogc2VyaWFsaXplZCBpbiBgRUxFTUVOVF9DT05UQUlORVJTYCAoZWxlbWVudCBjb250YWluZXIgc2l6ZSkgb3IgYnlcbiAqIGNvbXB1dGluZyB0aGUgc3VtIG9mIHJvb3Qgbm9kZXMgaW4gYWxsIGRlaHlkcmF0ZWQgdmlld3MgaW4gYSBnaXZlblxuICogY29udGFpbmVyIChpbiBjYXNlIHRoaXMgYDxuZy1jb250YWluZXI+YCB3YXMgYWxzbyB1c2VkIGFzIGEgdmlld1xuICogY29udGFpbmVyIGhvc3Qgbm9kZSwgZS5nLiA8bmctY29udGFpbmVyICpuZ0lmPikuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXROZ0NvbnRhaW5lclNpemUoaHlkcmF0aW9uSW5mbzogRGVoeWRyYXRlZFZpZXcsIGluZGV4OiBudW1iZXIpOiBudW1iZXJ8bnVsbCB7XG4gIGNvbnN0IGRhdGEgPSBoeWRyYXRpb25JbmZvLmRhdGE7XG4gIGxldCBzaXplID0gZGF0YVtFTEVNRU5UX0NPTlRBSU5FUlNdPy5baW5kZXhdID8/IG51bGw7XG4gIC8vIElmIHRoZXJlIGlzIG5vIHNlcmlhbGl6ZWQgaW5mb3JtYXRpb24gYXZhaWxhYmxlIGluIHRoZSBgRUxFTUVOVF9DT05UQUlORVJTYCBzbG90LFxuICAvLyBjaGVjayBpZiB3ZSBoYXZlIGluZm8gYWJvdXQgdmlldyBjb250YWluZXJzIGF0IHRoaXMgbG9jYXRpb24gKGUuZy5cbiAgLy8gYDxuZy1jb250YWluZXIgKm5nSWY+YCkgYW5kIHVzZSBjb250YWluZXIgc2l6ZSBhcyBhIG51bWJlciBvZiByb290IG5vZGVzIGluIHRoaXNcbiAgLy8gZWxlbWVudCBjb250YWluZXIuXG4gIGlmIChzaXplID09PSBudWxsICYmIGRhdGFbQ09OVEFJTkVSU10/LltpbmRleF0pIHtcbiAgICBzaXplID0gY2FsY1NlcmlhbGl6ZWRDb250YWluZXJTaXplKGh5ZHJhdGlvbkluZm8sIGluZGV4KTtcbiAgfVxuICByZXR1cm4gc2l6ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNlcmlhbGl6ZWRDb250YWluZXJWaWV3cyhcbiAgICBoeWRyYXRpb25JbmZvOiBEZWh5ZHJhdGVkVmlldyxcbiAgICBpbmRleDogbnVtYmVyLFxuICAgICk6IFNlcmlhbGl6ZWRDb250YWluZXJWaWV3W118bnVsbCB7XG4gIHJldHVybiBoeWRyYXRpb25JbmZvLmRhdGFbQ09OVEFJTkVSU10/LltpbmRleF0gPz8gbnVsbDtcbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgc2l6ZSBvZiBhIHNlcmlhbGl6ZWQgY29udGFpbmVyICh0aGUgbnVtYmVyIG9mIHJvb3Qgbm9kZXMpXG4gKiBieSBjYWxjdWxhdGluZyB0aGUgc3VtIG9mIHJvb3Qgbm9kZXMgaW4gYWxsIGRlaHlkcmF0ZWQgdmlld3MgaW4gdGhpcyBjb250YWluZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWxjU2VyaWFsaXplZENvbnRhaW5lclNpemUoaHlkcmF0aW9uSW5mbzogRGVoeWRyYXRlZFZpZXcsIGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICBjb25zdCB2aWV3cyA9IGdldFNlcmlhbGl6ZWRDb250YWluZXJWaWV3cyhoeWRyYXRpb25JbmZvLCBpbmRleCkgPz8gW107XG4gIGxldCBudW1Ob2RlcyA9IDA7XG4gIGZvciAobGV0IHZpZXcgb2Ygdmlld3MpIHtcbiAgICBudW1Ob2RlcyArPSB2aWV3W05VTV9ST09UX05PREVTXSAqICh2aWV3W01VTFRJUExJRVJdID8/IDEpO1xuICB9XG4gIHJldHVybiBudW1Ob2Rlcztcbn1cblxuLyoqXG4gKiBDaGVja3Mgd2hldGhlciBhIG5vZGUgaXMgYW5ub3RhdGVkIGFzIFwiZGlzY29ubmVjdGVkXCIsIGkuZS4gbm90IHByZXNlbnRcbiAqIGluIHRoZSBET00gYXQgc2VyaWFsaXphdGlvbiB0aW1lLiBXZSBzaG91bGQgbm90IGF0dGVtcHQgaHlkcmF0aW9uIGZvclxuICogc3VjaCBub2RlcyBhbmQgaW5zdGVhZCwgdXNlIGEgcmVndWxhciBcImNyZWF0aW9uIG1vZGVcIi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRGlzY29ubmVjdGVkTm9kZShoeWRyYXRpb25JbmZvOiBEZWh5ZHJhdGVkVmlldywgaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAvLyBDaGVjayBpZiB3ZSBhcmUgcHJvY2Vzc2luZyBkaXNjb25uZWN0ZWQgaW5mbyBmb3IgdGhlIGZpcnN0IHRpbWUuXG4gIGlmICh0eXBlb2YgaHlkcmF0aW9uSW5mby5kaXNjb25uZWN0ZWROb2RlcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjb25zdCBub2RlSWRzID0gaHlkcmF0aW9uSW5mby5kYXRhW0RJU0NPTk5FQ1RFRF9OT0RFU107XG4gICAgaHlkcmF0aW9uSW5mby5kaXNjb25uZWN0ZWROb2RlcyA9IG5vZGVJZHMgPyBuZXcgU2V0KG5vZGVJZHMpIDogbnVsbDtcbiAgfVxuICByZXR1cm4gISFoeWRyYXRpb25JbmZvLmRpc2Nvbm5lY3RlZE5vZGVzPy5oYXMoaW5kZXgpO1xufVxuIl19