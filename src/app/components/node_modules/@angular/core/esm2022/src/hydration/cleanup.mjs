/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CONTAINER_HEADER_OFFSET, DEHYDRATED_VIEWS } from '../render3/interfaces/container';
import { isLContainer, isLView } from '../render3/interfaces/type_checks';
import { HEADER_OFFSET, HOST, HYDRATION, PARENT, RENDERER, TVIEW } from '../render3/interfaces/view';
import { nativeRemoveNode } from '../render3/node_manipulation';
import { EMPTY_ARRAY } from '../util/empty';
import { validateSiblingNodeExists } from './error_handling';
import { NUM_ROOT_NODES } from './interfaces';
import { getLNodeForHydration } from './utils';
/**
 * Removes all dehydrated views from a given LContainer:
 * both in internal data structure, as well as removing
 * corresponding DOM nodes that belong to that dehydrated view.
 */
export function removeDehydratedViews(lContainer) {
    const views = lContainer[DEHYDRATED_VIEWS] ?? [];
    const parentLView = lContainer[PARENT];
    const renderer = parentLView[RENDERER];
    for (const view of views) {
        removeDehydratedView(view, renderer);
        ngDevMode && ngDevMode.dehydratedViewsRemoved++;
    }
    // Reset the value to an empty array to indicate that no
    // further processing of dehydrated views is needed for
    // this view container (i.e. do not trigger the lookup process
    // once again in case a `ViewContainerRef` is created later).
    lContainer[DEHYDRATED_VIEWS] = EMPTY_ARRAY;
}
/**
 * Helper function to remove all nodes from a dehydrated view.
 */
function removeDehydratedView(dehydratedView, renderer) {
    let nodesRemoved = 0;
    let currentRNode = dehydratedView.firstChild;
    if (currentRNode) {
        const numNodes = dehydratedView.data[NUM_ROOT_NODES];
        while (nodesRemoved < numNodes) {
            ngDevMode && validateSiblingNodeExists(currentRNode);
            const nextSibling = currentRNode.nextSibling;
            nativeRemoveNode(renderer, currentRNode, false);
            currentRNode = nextSibling;
            nodesRemoved++;
        }
    }
}
/**
 * Walks over all views within this LContainer invokes dehydrated views
 * cleanup function for each one.
 */
function cleanupLContainer(lContainer) {
    removeDehydratedViews(lContainer);
    for (let i = CONTAINER_HEADER_OFFSET; i < lContainer.length; i++) {
        cleanupLView(lContainer[i]);
    }
}
/**
 * Removes any remaining dehydrated i18n nodes from a given LView,
 * both in internal data structure, as well as removing the
 * corresponding DOM nodes.
 */
function cleanupDehydratedI18nNodes(lView) {
    const i18nNodes = lView[HYDRATION]?.i18nNodes;
    if (i18nNodes) {
        const renderer = lView[RENDERER];
        for (const node of i18nNodes.values()) {
            nativeRemoveNode(renderer, node, false);
        }
        lView[HYDRATION].i18nNodes = undefined;
    }
}
/**
 * Walks over `LContainer`s and components registered within
 * this LView and invokes dehydrated views cleanup function for each one.
 */
function cleanupLView(lView) {
    cleanupDehydratedI18nNodes(lView);
    const tView = lView[TVIEW];
    for (let i = HEADER_OFFSET; i < tView.bindingStartIndex; i++) {
        if (isLContainer(lView[i])) {
            const lContainer = lView[i];
            cleanupLContainer(lContainer);
        }
        else if (isLView(lView[i])) {
            // This is a component, enter the `cleanupLView` recursively.
            cleanupLView(lView[i]);
        }
    }
}
/**
 * Walks over all views registered within the ApplicationRef and removes
 * all dehydrated views from all `LContainer`s along the way.
 */
export function cleanupDehydratedViews(appRef) {
    const viewRefs = appRef._views;
    for (const viewRef of viewRefs) {
        const lNode = getLNodeForHydration(viewRef);
        // An `lView` might be `null` if a `ViewRef` represents
        // an embedded view (not a component view).
        if (lNode !== null && lNode[HOST] !== null) {
            if (isLView(lNode)) {
                cleanupLView(lNode);
            }
            else {
                // Cleanup in the root component view
                const componentLView = lNode[HOST];
                cleanupLView(componentLView);
                // Cleanup in all views within this view container
                cleanupLContainer(lNode);
            }
            ngDevMode && ngDevMode.dehydratedViewsCleanupRuns++;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYW51cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2h5ZHJhdGlvbi9jbGVhbnVwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUdILE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxnQkFBZ0IsRUFBYSxNQUFNLGlDQUFpQyxDQUFDO0FBR3RHLE9BQU8sRUFBQyxZQUFZLEVBQUUsT0FBTyxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDeEUsT0FBTyxFQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFTLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDMUcsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDOUQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUxQyxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMzRCxPQUFPLEVBQTBCLGNBQWMsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUNyRSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFFN0M7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxVQUFzQjtJQUMxRCxNQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDakQsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2QyxLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ3pCLG9CQUFvQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNyQyxTQUFTLElBQUksU0FBUyxDQUFDLHNCQUFzQixFQUFFLENB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QUcsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUMsdURBQXVEO1FBQ3ZELDJDQUEyQztRQUMzQyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQzNDLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7Z0JBQ25CLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QixDQUFDO2lCQUFNLENBQUM7Z0JBQ04scUNBQXFDO2dCQUNyQyxNQUFNLGNBQWMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFtQixDQUFDO2dCQUNyRCxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBRTdCLGtEQUFrRDtnQkFDbEQsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0IsQ0FBQztZQUNELFNBQVMsSUFBSSxTQUFTLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztRQUN0RCxDQUFDO0lBQ0gsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBcHBsaWNhdGlvblJlZn0gZnJvbSAnLi4vYXBwbGljYXRpb24vYXBwbGljYXRpb25fcmVmJztcbmltcG9ydCB7Q09OVEFJTkVSX0hFQURFUl9PRkZTRVQsIERFSFlEUkFURURfVklFV1MsIExDb250YWluZXJ9IGZyb20gJy4uL3JlbmRlcjMvaW50ZXJmYWNlcy9jb250YWluZXInO1xuaW1wb3J0IHtSZW5kZXJlcn0gZnJvbSAnLi4vcmVuZGVyMy9pbnRlcmZhY2VzL3JlbmRlcmVyJztcbmltcG9ydCB7Uk5vZGV9IGZyb20gJy4uL3JlbmRlcjMvaW50ZXJmYWNlcy9yZW5kZXJlcl9kb20nO1xuaW1wb3J0IHtpc0xDb250YWluZXIsIGlzTFZpZXd9IGZyb20gJy4uL3JlbmRlcjMvaW50ZXJmYWNlcy90eXBlX2NoZWNrcyc7XG5pbXBvcnQge0hFQURFUl9PRkZTRVQsIEhPU1QsIEhZRFJBVElPTiwgTFZpZXcsIFBBUkVOVCwgUkVOREVSRVIsIFRWSUVXfSBmcm9tICcuLi9yZW5kZXIzL2ludGVyZmFjZXMvdmlldyc7XG5pbXBvcnQge25hdGl2ZVJlbW92ZU5vZGV9IGZyb20gJy4uL3JlbmRlcjMvbm9kZV9tYW5pcHVsYXRpb24nO1xuaW1wb3J0IHtFTVBUWV9BUlJBWX0gZnJvbSAnLi4vdXRpbC9lbXB0eSc7XG5cbmltcG9ydCB7dmFsaWRhdGVTaWJsaW5nTm9kZUV4aXN0c30gZnJvbSAnLi9lcnJvcl9oYW5kbGluZyc7XG5pbXBvcnQge0RlaHlkcmF0ZWRDb250YWluZXJWaWV3LCBOVU1fUk9PVF9OT0RFU30gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7Z2V0TE5vZGVGb3JIeWRyYXRpb259IGZyb20gJy4vdXRpbHMnO1xuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGRlaHlkcmF0ZWQgdmlld3MgZnJvbSBhIGdpdmVuIExDb250YWluZXI6XG4gKiBib3RoIGluIGludGVybmFsIGRhdGEgc3RydWN0dXJlLCBhcyB3ZWxsIGFzIHJlbW92aW5nXG4gKiBjb3JyZXNwb25kaW5nIERPTSBub2RlcyB0aGF0IGJlbG9uZyB0byB0aGF0IGRlaHlkcmF0ZWQgdmlldy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZURlaHlkcmF0ZWRWaWV3cyhsQ29udGFpbmVyOiBMQ29udGFpbmVyKSB7XG4gIGNvbnN0IHZpZXdzID0gbENvbnRhaW5lcltERUhZRFJBVEVEX1ZJRVdTXSA/PyBbXTtcbiAgY29uc3QgcGFyZW50TFZpZXcgPSBsQ29udGFpbmVyW1BBUkVOVF07XG4gIGNvbnN0IHJlbmRlcmVyID0gcGFyZW50TFZpZXdbUkVOREVSRVJdO1xuICBmb3IgKGNvbnN0IHZpZXcgb2Ygdmlld3MpIHtcbiAgICByZW1vdmVEZWh5ZHJhdGVkVmlldyh2aWV3LCByZW5kZXJlcik7XG4gICAgbmdEZXZNb2RlICYmIG5nRGV2TW9kZS5kZWh5ZHJhdGVkVmlld3NSZW1vdmVkKys7XG4gIH1cbiAgLy8gUmVzZXQgdGhlIHZhbHVlIHRvIGFuIGVtcHR5IGFycmF5IHRvIGluZGljYXRlIHRoYXQgbm9cbiAgLy8gZnVydGhlciBwcm9jZXNzaW5nIG9mIGRlaHlkcmF0ZWQgdmlld3MgaXMgbmVlZGVkIGZvclxuICAvLyB0aGlzIHZpZXcgY29udGFpbmVyIChpLmUuIGRvIG5vdCB0cmlnZ2VyIHRoZSBsb29rdXAgcHJvY2Vzc1xuICAvLyBvbmNlIGFnYWluIGluIGNhc2UgYSBgVmlld0NvbnRhaW5lclJlZmAgaXMgY3JlYXRlZCBsYXRlcikuXG4gIGxDb250YWluZXJbREVIWURSQVRFRF9WSUVXU10gPSBFTVBUWV9BUlJBWTtcbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gcmVtb3ZlIGFsbCBub2RlcyBmcm9tIGEgZGVoeWRyYXRlZCB2aWV3LlxuICovXG5mdW5jdGlvbiByZW1vdmVEZWh5ZHJhdGVkVmlldyhkZWh5ZHJhdGVkVmlldzogRGVoeWRyYXRlZENvbnRhaW5lclZpZXcsIHJlbmRlcmVyOiBSZW5kZXJlcikge1xuICBsZXQgbm9kZXNSZW1vdmVkID0gMDtcbiAgbGV0IGN1cnJlbnRSTm9kZSA9IGRlaHlkcmF0ZWRWaWV3LmZpcnN0Q2hpbGQ7XG4gIGlmIChjdXJyZW50Uk5vZGUpIHtcbiAgICBjb25zdCBudW1Ob2RlcyA9IGRlaHlkcmF0ZWRWaWV3LmRhdGFbTlVNX1JPT1RfTk9ERVNdO1xuICAgIHdoaWxlIChub2Rlc1JlbW92ZWQgPCBudW1Ob2Rlcykge1xuICAgICAgbmdEZXZNb2RlICYmIHZhbGlkYXRlU2libGluZ05vZGVFeGlzdHMoY3VycmVudFJOb2RlKTtcbiAgICAgIGNvbnN0IG5leHRTaWJsaW5nOiBSTm9kZSA9IGN1cnJlbnRSTm9kZS5uZXh0U2libGluZyE7XG4gICAgICBuYXRpdmVSZW1vdmVOb2RlKHJlbmRlcmVyLCBjdXJyZW50Uk5vZGUsIGZhbHNlKTtcbiAgICAgIGN1cnJlbnRSTm9kZSA9IG5leHRTaWJsaW5nO1xuICAgICAgbm9kZXNSZW1vdmVkKys7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogV2Fsa3Mgb3ZlciBhbGwgdmlld3Mgd2l0aGluIHRoaXMgTENvbnRhaW5lciBpbnZva2VzIGRlaHlkcmF0ZWQgdmlld3NcbiAqIGNsZWFudXAgZnVuY3Rpb24gZm9yIGVhY2ggb25lLlxuICovXG5mdW5jdGlvbiBjbGVhbnVwTENvbnRhaW5lcihsQ29udGFpbmVyOiBMQ29udGFpbmVyKSB7XG4gIHJlbW92ZURlaHlkcmF0ZWRWaWV3cyhsQ29udGFpbmVyKTtcbiAgZm9yIChsZXQgaSA9IENPTlRBSU5FUl9IRUFERVJfT0ZGU0VUOyBpIDwgbENvbnRhaW5lci5sZW5ndGg7IGkrKykge1xuICAgIGNsZWFudXBMVmlldyhsQ29udGFpbmVyW2ldIGFzIExWaWV3KTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYW55IHJlbWFpbmluZyBkZWh5ZHJhdGVkIGkxOG4gbm9kZXMgZnJvbSBhIGdpdmVuIExWaWV3LFxuICogYm90aCBpbiBpbnRlcm5hbCBkYXRhIHN0cnVjdHVyZSwgYXMgd2VsbCBhcyByZW1vdmluZyB0aGVcbiAqIGNvcnJlc3BvbmRpbmcgRE9NIG5vZGVzLlxuICovXG5mdW5jdGlvbiBjbGVhbnVwRGVoeWRyYXRlZEkxOG5Ob2RlcyhsVmlldzogTFZpZXcpIHtcbiAgY29uc3QgaTE4bk5vZGVzID0gbFZpZXdbSFlEUkFUSU9OXT8uaTE4bk5vZGVzO1xuICBpZiAoaTE4bk5vZGVzKSB7XG4gICAgY29uc3QgcmVuZGVyZXIgPSBsVmlld1tSRU5ERVJFUl07XG4gICAgZm9yIChjb25zdCBub2RlIG9mIGkxOG5Ob2Rlcy52YWx1ZXMoKSkge1xuICAgICAgbmF0aXZlUmVtb3ZlTm9kZShyZW5kZXJlciwgbm9kZSwgZmFsc2UpO1xuICAgIH1cbiAgICBsVmlld1tIWURSQVRJT05dIS5pMThuTm9kZXMgPSB1bmRlZmluZWQ7XG4gIH1cbn1cblxuLyoqXG4gKiBXYWxrcyBvdmVyIGBMQ29udGFpbmVyYHMgYW5kIGNvbXBvbmVudHMgcmVnaXN0ZXJlZCB3aXRoaW5cbiAqIHRoaXMgTFZpZXcgYW5kIGludm9rZXMgZGVoeWRyYXRlZCB2aWV3cyBjbGVhbnVwIGZ1bmN0aW9uIGZvciBlYWNoIG9uZS5cbiAqL1xuZnVuY3Rpb24gY2xlYW51cExWaWV3KGxWaWV3OiBMVmlldykge1xuICBjbGVhbnVwRGVoeWRyYXRlZEkxOG5Ob2RlcyhsVmlldyk7XG5cbiAgY29uc3QgdFZpZXcgPSBsVmlld1tUVklFV107XG4gIGZvciAobGV0IGkgPSBIRUFERVJfT0ZGU0VUOyBpIDwgdFZpZXcuYmluZGluZ1N0YXJ0SW5kZXg7IGkrKykge1xuICAgIGlmIChpc0xDb250YWluZXIobFZpZXdbaV0pKSB7XG4gICAgICBjb25zdCBsQ29udGFpbmVyID0gbFZpZXdbaV07XG4gICAgICBjbGVhbnVwTENvbnRhaW5lcihsQ29udGFpbmVyKTtcbiAgICB9IGVsc2UgaWYgKGlzTFZpZXcobFZpZXdbaV0pKSB7XG4gICAgICAvLyBUaGlzIGlzIGEgY29tcG9uZW50LCBlbnRlciB0aGUgYGNsZWFudXBMVmlld2AgcmVjdXJzaXZlbHkuXG4gICAgICBjbGVhbnVwTFZpZXcobFZpZXdbaV0pO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFdhbGtzIG92ZXIgYWxsIHZpZXdzIHJlZ2lzdGVyZWQgd2l0aGluIHRoZSBBcHBsaWNhdGlvblJlZiBhbmQgcmVtb3Zlc1xuICogYWxsIGRlaHlkcmF0ZWQgdmlld3MgZnJvbSBhbGwgYExDb250YWluZXJgcyBhbG9uZyB0aGUgd2F5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2xlYW51cERlaHlkcmF0ZWRWaWV3cyhhcHBSZWY6IEFwcGxpY2F0aW9uUmVmKSB7XG4gIGNvbnN0IHZpZXdSZWZzID0gYXBwUmVmLl92aWV3cztcbiAgZm9yIChjb25zdCB2aWV3UmVmIG9mIHZpZXdSZWZzKSB7XG4gICAgY29uc3QgbE5vZGUgPSBnZXRMTm9kZUZvckh5ZHJhdGlvbih2aWV3UmVmKTtcbiAgICAvLyBBbiBgbFZpZXdgIG1pZ2h0IGJlIGBudWxsYCBpZiBhIGBWaWV3UmVmYCByZXByZXNlbnRzXG4gICAgLy8gYW4gZW1iZWRkZWQgdmlldyAobm90IGEgY29tcG9uZW50IHZpZXcpLlxuICAgIGlmIChsTm9kZSAhPT0gbnVsbCAmJiBsTm9kZVtIT1NUXSAhPT0gbnVsbCkge1xuICAgICAgaWYgKGlzTFZpZXcobE5vZGUpKSB7XG4gICAgICAgIGNsZWFudXBMVmlldyhsTm9kZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBDbGVhbnVwIGluIHRoZSByb290IGNvbXBvbmVudCB2aWV3XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudExWaWV3ID0gbE5vZGVbSE9TVF0gYXMgTFZpZXc8dW5rbm93bj47XG4gICAgICAgIGNsZWFudXBMVmlldyhjb21wb25lbnRMVmlldyk7XG5cbiAgICAgICAgLy8gQ2xlYW51cCBpbiBhbGwgdmlld3Mgd2l0aGluIHRoaXMgdmlldyBjb250YWluZXJcbiAgICAgICAgY2xlYW51cExDb250YWluZXIobE5vZGUpO1xuICAgICAgfVxuICAgICAgbmdEZXZNb2RlICYmIG5nRGV2TW9kZS5kZWh5ZHJhdGVkVmlld3NDbGVhbnVwUnVucysrO1xuICAgIH1cbiAgfVxufVxuIl19