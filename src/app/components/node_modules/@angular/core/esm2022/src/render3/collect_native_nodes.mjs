/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertParentView } from './assert';
import { icuContainerIterate } from './i18n/i18n_tree_shaking';
import { CONTAINER_HEADER_OFFSET, NATIVE } from './interfaces/container';
import { isLContainer } from './interfaces/type_checks';
import { DECLARATION_COMPONENT_VIEW, HOST, TVIEW } from './interfaces/view';
import { assertTNodeType } from './node_assert';
import { getProjectionNodes } from './node_manipulation';
import { getLViewParent, unwrapRNode } from './util/view_utils';
export function collectNativeNodes(tView, lView, tNode, result, isProjection = false) {
    while (tNode !== null) {
        ngDevMode &&
            assertTNodeType(tNode, 3 /* TNodeType.AnyRNode */ | 12 /* TNodeType.AnyContainer */ | 16 /* TNodeType.Projection */ | 32 /* TNodeType.Icu */);
        const lNode = lView[tNode.index];
        if (lNode !== null) {
            result.push(unwrapRNode(lNode));
        }
        // A given lNode can represent either a native node or a LContainer (when it is a host of a
        // ViewContainerRef). When we find a LContainer we need to descend into it to collect root nodes
        // from the views in this container.
        if (isLContainer(lNode)) {
            collectNativeNodesInLContainer(lNode, result);
        }
        const tNodeType = tNode.type;
        if (tNodeType & 8 /* TNodeType.ElementContainer */) {
            collectNativeNodes(tView, lView, tNode.child, result);
        }
        else if (tNodeType & 32 /* TNodeType.Icu */) {
            const nextRNode = icuContainerIterate(tNode, lView);
            let rNode;
            while (rNode = nextRNode()) {
                result.push(rNode);
            }
        }
        else if (tNodeType & 16 /* TNodeType.Projection */) {
            const nodesInSlot = getProjectionNodes(lView, tNode);
            if (Array.isArray(nodesInSlot)) {
                result.push(...nodesInSlot);
            }
            else {
                const parentView = getLViewParent(lView[DECLARATION_COMPONENT_VIEW]);
                ngDevMode && assertParentView(parentView);
                collectNativeNodes(parentView[TVIEW], parentView, nodesInSlot, result, true);
            }
        }
        tNode = isProjection ? tNode.projectionNext : tNode.next;
    }
    return result;
}
/**
 * Collects all root nodes in all views in a given LContainer.
 */
export function collectNativeNodesInLContainer(lContainer, result) {
    for (let i = CONTAINER_HEADER_OFFSET; i < lContainer.length; i++) {
        const lViewInAContainer = lContainer[i];
        const lViewFirstChildTNode = lViewInAContainer[TVIEW].firstChild;
        if (lViewFirstChildTNode !== null) {
            collectNativeNodes(lViewInAContainer[TVIEW], lViewInAContainer, lViewFirstChildTNode, result);
        }
    }
    // When an LContainer is created, the anchor (comment) node is:
    // - (1) either reused in case of an ElementContainer (<ng-container>)
    // - (2) or a new comment node is created
    // In the first case, the anchor comment node would be added to the final
    // list by the code in the `collectNativeNodes` function
    // (see the `result.push(unwrapRNode(lNode))` line), but the second
    // case requires extra handling: the anchor node needs to be added to the
    // final list manually. See additional information in the `createAnchorNode`
    // function in the `view_container_ref.ts`.
    //
    // In the first case, the same reference would be stored in the `NATIVE`
    // and `HOST` slots in an LContainer. Otherwise, this is the second case and
    // we should add an element to the final list.
    if (lContainer[NATIVE] !== lContainer[HOST]) {
        result.push(lContainer[NATIVE]);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdF9uYXRpdmVfbm9kZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2NvbGxlY3RfbmF0aXZlX25vZGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUMxQyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUM3RCxPQUFPLEVBQUMsdUJBQXVCLEVBQWMsTUFBTSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFHbkYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3RELE9BQU8sRUFBQywwQkFBMEIsRUFBRSxJQUFJLEVBQVMsS0FBSyxFQUFRLE1BQU0sbUJBQW1CLENBQUM7QUFDeEYsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsY0FBYyxFQUFFLFdBQVcsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRzlELE1BQU0sVUFBVSxrQkFBa0IsQ0FDOUIsS0FBWSxFQUFFLEtBQVksRUFBRSxLQUFpQixFQUFFLE1BQWEsRUFDNUQsZUFBd0IsS0FBSztJQUMvQixPQUFPLEtBQUssS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUN0QixTQUFTO1lBQ0wsZUFBZSxDQUNYLEtBQUssRUFDTCw0REFBMkMsZ0NBQXVCLHlCQUFnQixDQUFDLENBQUM7UUFFNUYsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FB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LyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7YXNzZXJ0UGFyZW50Vmlld30gZnJvbSAnLi9hc3NlcnQnO1xuaW1wb3J0IHtpY3VDb250YWluZXJJdGVyYXRlfSBmcm9tICcuL2kxOG4vaTE4bl90cmVlX3NoYWtpbmcnO1xuaW1wb3J0IHtDT05UQUlORVJfSEVBREVSX09GRlNFVCwgTENvbnRhaW5lciwgTkFUSVZFfSBmcm9tICcuL2ludGVyZmFjZXMvY29udGFpbmVyJztcbmltcG9ydCB7VEljdUNvbnRhaW5lck5vZGUsIFROb2RlLCBUTm9kZVR5cGV9IGZyb20gJy4vaW50ZXJmYWNlcy9ub2RlJztcbmltcG9ydCB7Uk5vZGV9IGZyb20gJy4vaW50ZXJmYWNlcy9yZW5kZXJlcl9kb20nO1xuaW1wb3J0IHtpc0xDb250YWluZXJ9IGZyb20gJy4vaW50ZXJmYWNlcy90eXBlX2NoZWNrcyc7XG5pbXBvcnQge0RFQ0xBUkFUSU9OX0NPTVBPTkVOVF9WSUVXLCBIT1NULCBMVmlldywgVFZJRVcsIFRWaWV3fSBmcm9tICcuL2ludGVyZmFjZXMvdmlldyc7XG5pbXBvcnQge2Fzc2VydFROb2RlVHlwZX0gZnJvbSAnLi9ub2RlX2Fzc2VydCc7XG5pbXBvcnQge2dldFByb2plY3Rpb25Ob2Rlc30gZnJvbSAnLi9ub2RlX21hbmlwdWxhdGlvbic7XG5pbXBvcnQge2dldExWaWV3UGFyZW50LCB1bndyYXBSTm9kZX0gZnJvbSAnLi91dGlsL3ZpZXdfdXRpbHMnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xsZWN0TmF0aXZlTm9kZXMoXG4gICAgdFZpZXc6IFRWaWV3LCBsVmlldzogTFZpZXcsIHROb2RlOiBUTm9kZXxudWxsLCByZXN1bHQ6IGFueVtdLFxuICAgIGlzUHJvamVjdGlvbjogYm9vbGVhbiA9IGZhbHNlKTogYW55W10ge1xuICB3aGlsZSAodE5vZGUgIT09IG51bGwpIHtcbiAgICBuZ0Rldk1vZGUgJiZcbiAgICAgICAgYXNzZXJ0VE5vZGVUeXBlKFxuICAgICAgICAgICAgdE5vZGUsXG4gICAgICAgICAgICBUTm9kZVR5cGUuQW55Uk5vZGUgfCBUTm9kZVR5cGUuQW55Q29udGFpbmVyIHwgVE5vZGVUeXBlLlByb2plY3Rpb24gfCBUTm9kZVR5cGUuSWN1KTtcblxuICAgIGNvbnN0IGxOb2RlID0gbFZpZXdbdE5vZGUuaW5kZXhdO1xuICAgIGlmIChsTm9kZSAhPT0gbnVsbCkge1xuICAgICAgcmVzdWx0LnB1c2godW53cmFwUk5vZGUobE5vZGUpKTtcbiAgICB9XG5cbiAgICAvLyBBIGdpdmVuIGxOb2RlIGNhbiByZXByZXNlbnQgZWl0aGVyIGEgbmF0aXZlIG5vZGUgb3IgYSBMQ29udGFpbmVyICh3aGVuIGl0IGlzIGEgaG9zdCBvZiBhXG4gICAgLy8gVmlld0NvbnRhaW5lclJlZikuIFdoZW4gd2UgZmluZCBhIExDb250YWluZXIgd2UgbmVlZCB0byBkZXNjZW5kIGludG8gaXQgdG8gY29sbGVjdCByb290IG5vZGVzXG4gICAgLy8gZnJvbSB0aGUgdmlld3MgaW4gdGhpcyBjb250YWluZXIuXG4gICAgaWYgKGlzTENvbnRhaW5lcihsTm9kZSkpIHtcbiAgICAgIGNvbGxlY3ROYXRpdmVOb2Rlc0luTENvbnRhaW5lcihsTm9kZSwgcmVzdWx0KTtcbiAgICB9XG5cbiAgICBjb25zdCB0Tm9kZVR5cGUgPSB0Tm9kZS50eXBlO1xuICAgIGlmICh0Tm9kZVR5cGUgJiBUTm9kZVR5cGUuRWxlbWVudENvbnRhaW5lcikge1xuICAgICAgY29sbGVjdE5hdGl2ZU5vZGVzKHRWaWV3LCBsVmlldywgdE5vZGUuY2hpbGQsIHJlc3VsdCk7XG4gICAgfSBlbHNlIGlmICh0Tm9kZVR5cGUgJiBUTm9kZVR5cGUuSWN1KSB7XG4gICAgICBjb25zdCBuZXh0Uk5vZGUgPSBpY3VDb250YWluZXJJdGVyYXRlKHROb2RlIGFzIFRJY3VDb250YWluZXJOb2RlLCBsVmlldyk7XG4gICAgICBsZXQgck5vZGU6IFJOb2RlfG51bGw7XG4gICAgICB3aGlsZSAock5vZGUgPSBuZXh0Uk5vZGUoKSkge1xuICAgICAgICByZXN1bHQucHVzaChyTm9kZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0Tm9kZVR5cGUgJiBUTm9kZVR5cGUuUHJvamVjdGlvbikge1xuICAgICAgY29uc3Qgbm9kZXNJblNsb3QgPSBnZXRQcm9qZWN0aW9uTm9kZXMobFZpZXcsIHROb2RlKTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG5vZGVzSW5TbG90KSkge1xuICAgICAgICByZXN1bHQucHVzaCguLi5ub2Rlc0luU2xvdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwYXJlbnRWaWV3ID0gZ2V0TFZpZXdQYXJlbnQobFZpZXdbREVDTEFSQVRJT05fQ09NUE9ORU5UX1ZJRVddKSE7XG4gICAgICAgIG5nRGV2TW9kZSAmJiBhc3NlcnRQYXJlbnRWaWV3KHBhcmVudFZpZXcpO1xuICAgICAgICBjb2xsZWN0TmF0aXZlTm9kZXMocGFyZW50Vmlld1tUVklFV10sIHBhcmVudFZpZXcsIG5vZGVzSW5TbG90LCByZXN1bHQsIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICB0Tm9kZSA9IGlzUHJvamVjdGlvbiA/IHROb2RlLnByb2plY3Rpb25OZXh0IDogdE5vZGUubmV4dDtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ29sbGVjdHMgYWxsIHJvb3Qgbm9kZXMgaW4gYWxsIHZpZXdzIGluIGEgZ2l2ZW4gTENvbnRhaW5lci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbGxlY3ROYXRpdmVOb2Rlc0luTENvbnRhaW5lcihsQ29udGFpbmVyOiBMQ29udGFpbmVyLCByZXN1bHQ6IGFueVtdKSB7XG4gIGZvciAobGV0IGkgPSBDT05UQUlORVJfSEVBREVSX09GRlNFVDsgaSA8IGxDb250YWluZXIubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBsVmlld0luQUNvbnRhaW5lciA9IGxDb250YWluZXJbaV07XG4gICAgY29uc3QgbFZpZXdGaXJzdENoaWxkVE5vZGUgPSBsVmlld0luQUNvbnRhaW5lcltUVklFV10uZmlyc3RDaGlsZDtcbiAgICBpZiAobFZpZXdGaXJzdENoaWxkVE5vZGUgIT09IG51bGwpIHtcbiAgICAgIGNvbGxlY3ROYXRpdmVOb2RlcyhsVmlld0luQUNvbnRhaW5lcltUVklFV10sIGxWaWV3SW5BQ29udGFpbmVyLCBsVmlld0ZpcnN0Q2hpbGRUTm9kZSwgcmVzdWx0KTtcbiAgICB9XG4gIH1cblxuICAvLyBXaGVuIGFuIExDb250YWluZXIgaXMgY3JlYXRlZCwgdGhlIGFuY2hvciAoY29tbWVudCkgbm9kZSBpczpcbiAgLy8gLSAoMSkgZWl0aGVyIHJldXNlZCBpbiBjYXNlIG9mIGFuIEVsZW1lbnRDb250YWluZXIgKDxuZy1jb250YWluZXI+KVxuICAvLyAtICgyKSBvciBhIG5ldyBjb21tZW50IG5vZGUgaXMgY3JlYXRlZFxuICAvLyBJbiB0aGUgZmlyc3QgY2FzZSwgdGhlIGFuY2hvciBjb21tZW50IG5vZGUgd291bGQgYmUgYWRkZWQgdG8gdGhlIGZpbmFsXG4gIC8vIGxpc3QgYnkgdGhlIGNvZGUgaW4gdGhlIGBjb2xsZWN0TmF0aXZlTm9kZXNgIGZ1bmN0aW9uXG4gIC8vIChzZWUgdGhlIGByZXN1bHQucHVzaCh1bndyYXBSTm9kZShsTm9kZSkpYCBsaW5lKSwgYnV0IHRoZSBzZWNvbmRcbiAgLy8gY2FzZSByZXF1aXJlcyBleHRyYSBoYW5kbGluZzogdGhlIGFuY2hvciBub2RlIG5lZWRzIHRvIGJlIGFkZGVkIHRvIHRoZVxuICAvLyBmaW5hbCBsaXN0IG1hbnVhbGx5LiBTZWUgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiBpbiB0aGUgYGNyZWF0ZUFuY2hvck5vZGVgXG4gIC8vIGZ1bmN0aW9uIGluIHRoZSBgdmlld19jb250YWluZXJfcmVmLnRzYC5cbiAgLy9cbiAgLy8gSW4gdGhlIGZpcnN0IGNhc2UsIHRoZSBzYW1lIHJlZmVyZW5jZSB3b3VsZCBiZSBzdG9yZWQgaW4gdGhlIGBOQVRJVkVgXG4gIC8vIGFuZCBgSE9TVGAgc2xvdHMgaW4gYW4gTENvbnRhaW5lci4gT3RoZXJ3aXNlLCB0aGlzIGlzIHRoZSBzZWNvbmQgY2FzZSBhbmRcbiAgLy8gd2Ugc2hvdWxkIGFkZCBhbiBlbGVtZW50IHRvIHRoZSBmaW5hbCBsaXN0LlxuICBpZiAobENvbnRhaW5lcltOQVRJVkVdICE9PSBsQ29udGFpbmVyW0hPU1RdKSB7XG4gICAgcmVzdWx0LnB1c2gobENvbnRhaW5lcltOQVRJVkVdKTtcbiAgfVxufVxuIl19