/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { newArray } from '../../util/array_utils';
import { DECLARATION_COMPONENT_VIEW, HEADER_OFFSET, HYDRATION, T_HOST } from '../interfaces/view';
import { applyProjection } from '../node_manipulation';
import { getProjectAsAttrValue, isNodeMatchingSelectorList, isSelectorInSelectorList } from '../node_selector_matcher';
import { getLView, getTView, isInSkipHydrationBlock, setCurrentTNodeAsNotParent } from '../state';
import { getOrCreateTNode } from './shared';
/**
 * Checks a given node against matching projection slots and returns the
 * determined slot index. Returns "null" if no slot matched the given node.
 *
 * This function takes into account the parsed ngProjectAs selector from the
 * node's attributes. If present, it will check whether the ngProjectAs selector
 * matches any of the projection slot selectors.
 */
export function matchingProjectionSlotIndex(tNode, projectionSlots) {
    let wildcardNgContentIndex = null;
    const ngProjectAsAttrVal = getProjectAsAttrValue(tNode);
    for (let i = 0; i < projectionSlots.length; i++) {
        const slotValue = projectionSlots[i];
        // The last wildcard projection slot should match all nodes which aren't matching
        // any selector. This is necessary to be backwards compatible with view engine.
        if (slotValue === '*') {
            wildcardNgContentIndex = i;
            continue;
        }
        // If we ran into an `ngProjectAs` attribute, we should match its parsed selector
        // to the list of selectors, otherwise we fall back to matching against the node.
        if (ngProjectAsAttrVal === null ?
            isNodeMatchingSelectorList(tNode, slotValue, /* isProjectionMode */ true) :
            isSelectorInSelectorList(ngProjectAsAttrVal, slotValue)) {
            return i; // first matching selector "captures" a given node
        }
    }
    return wildcardNgContentIndex;
}
/**
 * Instruction to distribute projectable nodes among <ng-content> occurrences in a given template.
 * It takes all the selectors from the entire component's template and decides where
 * each projected node belongs (it re-distributes nodes among "buckets" where each "bucket" is
 * backed by a selector).
 *
 * This function requires CSS selectors to be provided in 2 forms: parsed (by a compiler) and text,
 * un-parsed form.
 *
 * The parsed form is needed for efficient matching of a node against a given CSS selector.
 * The un-parsed, textual form is needed for support of the ngProjectAs attribute.
 *
 * Having a CSS selector in 2 different formats is not ideal, but alternatives have even more
 * drawbacks:
 * - having only a textual form would require runtime parsing of CSS selectors;
 * - we can't have only a parsed as we can't re-construct textual form from it (as entered by a
 * template author).
 *
 * @param projectionSlots? A collection of projection slots. A projection slot can be based
 *        on a parsed CSS selectors or set to the wildcard selector ("*") in order to match
 *        all nodes which do not match any selector. If not specified, a single wildcard
 *        selector projection slot will be defined.
 *
 * @codeGenApi
 */
export function ɵɵprojectionDef(projectionSlots) {
    const componentNode = getLView()[DECLARATION_COMPONENT_VIEW][T_HOST];
    if (!componentNode.projection) {
        // If no explicit projection slots are defined, fall back to a single
        // projection slot with the wildcard selector.
        const numProjectionSlots = projectionSlots ? projectionSlots.length : 1;
        const projectionHeads = componentNode.projection =
            newArray(numProjectionSlots, null);
        const tails = projectionHeads.slice();
        let componentChild = componentNode.child;
        while (componentChild !== null) {
            const slotIndex = projectionSlots ? matchingProjectionSlotIndex(componentChild, projectionSlots) : 0;
            if (slotIndex !== null) {
                if (tails[slotIndex]) {
                    tails[slotIndex].projectionNext = componentChild;
                }
                else {
                    projectionHeads[slotIndex] = componentChild;
                }
                tails[slotIndex] = componentChild;
            }
            componentChild = componentChild.next;
        }
    }
}
/**
 * Inserts previously re-distributed projected nodes. This instruction must be preceded by a call
 * to the projectionDef instruction.
 *
 * @param nodeIndex
 * @param selectorIndex:
 *        - 0 when the selector is `*` (or unspecified as this is the default value),
 *        - 1 based index of the selector from the {@link projectionDef}
 *
 * @codeGenApi
 */
export function ɵɵprojection(nodeIndex, selectorIndex = 0, attrs) {
    const lView = getLView();
    const tView = getTView();
    const tProjectionNode = getOrCreateTNode(tView, HEADER_OFFSET + nodeIndex, 16 /* TNodeType.Projection */, null, attrs || null);
    // We can't use viewData[HOST_NODE] because projection nodes can be nested in embedded views.
    if (tProjectionNode.projection === null)
        tProjectionNode.projection = selectorIndex;
    // `<ng-content>` has no content
    setCurrentTNodeAsNotParent();
    const hydrationInfo = lView[HYDRATION];
    const isNodeCreationMode = !hydrationInfo || isInSkipHydrationBlock();
    if (isNodeCreationMode &&
        (tProjectionNode.flags & 32 /* TNodeFlags.isDetached */) !== 32 /* TNodeFlags.isDetached */) {
        // re-distribution of projectable nodes is stored on a component's view level
        applyProjection(tView, lView, tProjectionNode);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaW5zdHJ1Y3Rpb25zL3Byb2plY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBR2hELE9BQU8sRUFBQywwQkFBMEIsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ2hHLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUMscUJBQXFCLEVBQUUsMEJBQTBCLEVBQUUsd0JBQXdCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNySCxPQUFPLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRSwwQkFBMEIsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUVoRyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFJMUM7Ozs7Ozs7R0FPRztBQUNILE1BQU0sVUFBVSwyQkFBMkIsQ0FBQyxLQUFZLEVBQUUsZUFBZ0M7SUFFeEYsSUFBSSxzQkFBc0IsR0FBRyxJQUFJLENBQUM7SUFDbEMsTUFBTSxrQkFBa0IsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ2hELE1BQU0sU0FBUyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxpRkFBaUY7UUFDakYsK0VBQStFO1FBQy9FLElBQUksU0FBUyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLHNCQUFzQixHQUFHLENBQUMsQ0FBQztZQUMzQixTQUFTO1FBQ1gsQ0FBQztRQUNELGlGQUFpRjtRQUNqRixpRkFBaUY7UUFDakYsSUFBSSxrQkFBa0IsS0FBSyxJQUFJLENBQUMsQ0FBQztZQUN6QiwwQkFBMEIsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDM0Usd0JBQXdCLENBQUMsa0JBQWtCLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQztZQUNoRSxPQUFPLENBQUMsQ0FBQyxDQUFFLGtEQUFrRDtRQUMvRCxDQUFDO0lBQ0gsQ0FBQztJQUNELE9BQU8sc0JBQXNCLENBQUM7QUFDaEMsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxNQUFNLFVBQVUsZUFBZSxDQUFDLGVBQWlDO0lBQy9ELE1BQU0sYUFBYSxHQUFHLFFBQVEsRUFBRSxDQUFDLDBCQUEwQixDQUFDLENBQUMsTUFBTSxDQUFpQixDQUFDO0lBRXJGLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDOUIscUVBQXFFO1FBQ3JFLDhDQUE4QztRQUM5QyxNQUFNLGtCQUFrQixHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sZUFBZSxHQUFtQixhQUFhLENBQUMsVUFBVTtZQUM1RCxRQUFRLENBQUMsa0JBQWtCLEVBQUUsSUFBYyxDQUFDLENBQUM7UUFDakQsTUFBTSxLQUFLLEdBQW1CLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUV0RCxJQUFJLGNBQWMsR0FBZSxhQUFhLENBQUMsS0FBSyxDQUFDO1FBRXJELE9BQU8sY0FBYyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQy9CLE1BQU0sU0FBUyxHQUNYLGVBQWUsQ0FBQyxDQUFDLENBQUMsMkJBQTJCLENBQUMsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFdkYsSUFBSSxTQUFTLEtBQUssSUFBSSxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7b0JBQ3JCLEtBQUssQ0FBQyxTQUFTLENBQUUsQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO2dCQUNwRCxDQUFDO3FCQUFNLENBQUM7b0JBQ04sZUFBZSxDQUFDLFNBQVMsQ0FBQyxHQUFHLGNBQWMsQ0FBQztnQkFDOUMsQ0FBQztnQkFDRCxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsY0FBYyxDQUFDO1lBQ3BDLENBQUM7WUFFRCxjQUFjLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQztRQUN2QyxDQUFDO0lBQ0gsQ0FBQztBQUNILENBQUM7QUFHRDs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxVQUFVLFlBQVksQ0FDeEIsU0FBaUIsRUFBRSxnQkFBd0IsQ0FBQyxFQUFFLEtBQW1CO0lBQ25FLE1BQU0sS0FBSyxHQUFHLFFBQVEsRUFBRSxDQUFDO0lBQ3pCLE1BQU0sS0FBSyxHQUFHLFFBQVEsRUFBRSxDQUFDO0lBQ3pCLE1BQU0sZUFBZSxHQUNqQixnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsYUFBYSxHQUFHLFNBQVMsaUNBQXdCLElBQUksRUFBRSxLQUFLLElBQUksSUFBSSxDQUFDLENBQUM7SUFFbEcsNkZBQTZGO0lBQzdGLElBQUksZUFBZSxDQUFDLFVBQVUsS0FBSyxJQUFJO1FBQUUsZUFBZSxDQUFDLFVBQVUsR0FBRyxhQUFhLENBQUM7SUFFcEYsZ0NBQWdDO0lBQ2hDLDBCQUEwQixFQUFFLENBQUM7SUFFN0IsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZDLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxhQUFhLElBQUksc0JBQXNCLEVBQUUsQ0FBQztJQUN0RSxJQUFJLGtCQUFrQjtRQUNsQixDQUFDLGVBQWUsQ0FBQyxLQUFLLGlDQUF3QixDQUFDLG1DQUEwQixFQUFFLENBQUM7UUFDOUUsNkVBQTZFO1FBQzdFLGVBQWUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge25ld0FycmF5fSBmcm9tICcuLi8uLi91dGlsL2FycmF5X3V0aWxzJztcbmltcG9ydCB7VEF0dHJpYnV0ZXMsIFRFbGVtZW50Tm9kZSwgVE5vZGUsIFROb2RlRmxhZ3MsIFROb2RlVHlwZX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9ub2RlJztcbmltcG9ydCB7UHJvamVjdGlvblNsb3RzfSBmcm9tICcuLi9pbnRlcmZhY2VzL3Byb2plY3Rpb24nO1xuaW1wb3J0IHtERUNMQVJBVElPTl9DT01QT05FTlRfVklFVywgSEVBREVSX09GRlNFVCwgSFlEUkFUSU9OLCBUX0hPU1R9IGZyb20gJy4uL2ludGVyZmFjZXMvdmlldyc7XG5pbXBvcnQge2FwcGx5UHJvamVjdGlvbn0gZnJvbSAnLi4vbm9kZV9tYW5pcHVsYXRpb24nO1xuaW1wb3J0IHtnZXRQcm9qZWN0QXNBdHRyVmFsdWUsIGlzTm9kZU1hdGNoaW5nU2VsZWN0b3JMaXN0LCBpc1NlbGVjdG9ySW5TZWxlY3Rvckxpc3R9IGZyb20gJy4uL25vZGVfc2VsZWN0b3JfbWF0Y2hlcic7XG5pbXBvcnQge2dldExWaWV3LCBnZXRUVmlldywgaXNJblNraXBIeWRyYXRpb25CbG9jaywgc2V0Q3VycmVudFROb2RlQXNOb3RQYXJlbnR9IGZyb20gJy4uL3N0YXRlJztcblxuaW1wb3J0IHtnZXRPckNyZWF0ZVROb2RlfSBmcm9tICcuL3NoYXJlZCc7XG5cblxuXG4vKipcbiAqIENoZWNrcyBhIGdpdmVuIG5vZGUgYWdhaW5zdCBtYXRjaGluZyBwcm9qZWN0aW9uIHNsb3RzIGFuZCByZXR1cm5zIHRoZVxuICogZGV0ZXJtaW5lZCBzbG90IGluZGV4LiBSZXR1cm5zIFwibnVsbFwiIGlmIG5vIHNsb3QgbWF0Y2hlZCB0aGUgZ2l2ZW4gbm9kZS5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHRha2VzIGludG8gYWNjb3VudCB0aGUgcGFyc2VkIG5nUHJvamVjdEFzIHNlbGVjdG9yIGZyb20gdGhlXG4gKiBub2RlJ3MgYXR0cmlidXRlcy4gSWYgcHJlc2VudCwgaXQgd2lsbCBjaGVjayB3aGV0aGVyIHRoZSBuZ1Byb2plY3RBcyBzZWxlY3RvclxuICogbWF0Y2hlcyBhbnkgb2YgdGhlIHByb2plY3Rpb24gc2xvdCBzZWxlY3RvcnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXRjaGluZ1Byb2plY3Rpb25TbG90SW5kZXgodE5vZGU6IFROb2RlLCBwcm9qZWN0aW9uU2xvdHM6IFByb2plY3Rpb25TbG90cyk6IG51bWJlcnxcbiAgICBudWxsIHtcbiAgbGV0IHdpbGRjYXJkTmdDb250ZW50SW5kZXggPSBudWxsO1xuICBjb25zdCBuZ1Byb2plY3RBc0F0dHJWYWwgPSBnZXRQcm9qZWN0QXNBdHRyVmFsdWUodE5vZGUpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3Rpb25TbG90cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHNsb3RWYWx1ZSA9IHByb2plY3Rpb25TbG90c1tpXTtcbiAgICAvLyBUaGUgbGFzdCB3aWxkY2FyZCBwcm9qZWN0aW9uIHNsb3Qgc2hvdWxkIG1hdGNoIGFsbCBub2RlcyB3aGljaCBhcmVuJ3QgbWF0Y2hpbmdcbiAgICAvLyBhbnkgc2VsZWN0b3IuIFRoaXMgaXMgbmVjZXNzYXJ5IHRvIGJlIGJhY2t3YXJkcyBjb21wYXRpYmxlIHdpdGggdmlldyBlbmdpbmUuXG4gICAgaWYgKHNsb3RWYWx1ZSA9PT0gJyonKSB7XG4gICAgICB3aWxkY2FyZE5nQ29udGVudEluZGV4ID0gaTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICAvLyBJZiB3ZSByYW4gaW50byBhbiBgbmdQcm9qZWN0QXNgIGF0dHJpYnV0ZSwgd2Ugc2hvdWxkIG1hdGNoIGl0cyBwYXJzZWQgc2VsZWN0b3JcbiAgICAvLyB0byB0aGUgbGlzdCBvZiBzZWxlY3RvcnMsIG90aGVyd2lzZSB3ZSBmYWxsIGJhY2sgdG8gbWF0Y2hpbmcgYWdhaW5zdCB0aGUgbm9kZS5cbiAgICBpZiAobmdQcm9qZWN0QXNBdHRyVmFsID09PSBudWxsID9cbiAgICAgICAgICAgIGlzTm9kZU1hdGNoaW5nU2VsZWN0b3JMaXN0KHROb2RlLCBzbG90VmFsdWUsIC8qIGlzUHJvamVjdGlvbk1vZGUgKi8gdHJ1ZSkgOlxuICAgICAgICAgICAgaXNTZWxlY3RvckluU2VsZWN0b3JMaXN0KG5nUHJvamVjdEFzQXR0clZhbCwgc2xvdFZhbHVlKSkge1xuICAgICAgcmV0dXJuIGk7ICAvLyBmaXJzdCBtYXRjaGluZyBzZWxlY3RvciBcImNhcHR1cmVzXCIgYSBnaXZlbiBub2RlXG4gICAgfVxuICB9XG4gIHJldHVybiB3aWxkY2FyZE5nQ29udGVudEluZGV4O1xufVxuXG4vKipcbiAqIEluc3RydWN0aW9uIHRvIGRpc3RyaWJ1dGUgcHJvamVjdGFibGUgbm9kZXMgYW1vbmcgPG5nLWNvbnRlbnQ+IG9jY3VycmVuY2VzIGluIGEgZ2l2ZW4gdGVtcGxhdGUuXG4gKiBJdCB0YWtlcyBhbGwgdGhlIHNlbGVjdG9ycyBmcm9tIHRoZSBlbnRpcmUgY29tcG9uZW50J3MgdGVtcGxhdGUgYW5kIGRlY2lkZXMgd2hlcmVcbiAqIGVhY2ggcHJvamVjdGVkIG5vZGUgYmVsb25ncyAoaXQgcmUtZGlzdHJpYnV0ZXMgbm9kZXMgYW1vbmcgXCJidWNrZXRzXCIgd2hlcmUgZWFjaCBcImJ1Y2tldFwiIGlzXG4gKiBiYWNrZWQgYnkgYSBzZWxlY3RvcikuXG4gKlxuICogVGhpcyBmdW5jdGlvbiByZXF1aXJlcyBDU1Mgc2VsZWN0b3JzIHRvIGJlIHByb3ZpZGVkIGluIDIgZm9ybXM6IHBhcnNlZCAoYnkgYSBjb21waWxlcikgYW5kIHRleHQsXG4gKiB1bi1wYXJzZWQgZm9ybS5cbiAqXG4gKiBUaGUgcGFyc2VkIGZvcm0gaXMgbmVlZGVkIGZvciBlZmZpY2llbnQgbWF0Y2hpbmcgb2YgYSBub2RlIGFnYWluc3QgYSBnaXZlbiBDU1Mgc2VsZWN0b3IuXG4gKiBUaGUgdW4tcGFyc2VkLCB0ZXh0dWFsIGZvcm0gaXMgbmVlZGVkIGZvciBzdXBwb3J0IG9mIHRoZSBuZ1Byb2plY3RBcyBhdHRyaWJ1dGUuXG4gKlxuICogSGF2aW5nIGEgQ1NTIHNlbGVjdG9yIGluIDIgZGlmZmVyZW50IGZvcm1hdHMgaXMgbm90IGlkZWFsLCBidXQgYWx0ZXJuYXRpdmVzIGhhdmUgZXZlbiBtb3JlXG4gKiBkcmF3YmFja3M6XG4gKiAtIGhhdmluZyBvbmx5IGEgdGV4dHVhbCBmb3JtIHdvdWxkIHJlcXVpcmUgcnVudGltZSBwYXJzaW5nIG9mIENTUyBzZWxlY3RvcnM7XG4gKiAtIHdlIGNhbid0IGhhdmUgb25seSBhIHBhcnNlZCBhcyB3ZSBjYW4ndCByZS1jb25zdHJ1Y3QgdGV4dHVhbCBmb3JtIGZyb20gaXQgKGFzIGVudGVyZWQgYnkgYVxuICogdGVtcGxhdGUgYXV0aG9yKS5cbiAqXG4gKiBAcGFyYW0gcHJvamVjdGlvblNsb3RzPyBBIGNvbGxlY3Rpb24gb2YgcHJvamVjdGlvbiBzbG90cy4gQSBwcm9qZWN0aW9uIHNsb3QgY2FuIGJlIGJhc2VkXG4gKiAgICAgICAgb24gYSBwYXJzZWQgQ1NTIHNlbGVjdG9ycyBvciBzZXQgdG8gdGhlIHdpbGRjYXJkIHNlbGVjdG9yIChcIipcIikgaW4gb3JkZXIgdG8gbWF0Y2hcbiAqICAgICAgICBhbGwgbm9kZXMgd2hpY2ggZG8gbm90IG1hdGNoIGFueSBzZWxlY3Rvci4gSWYgbm90IHNwZWNpZmllZCwgYSBzaW5nbGUgd2lsZGNhcmRcbiAqICAgICAgICBzZWxlY3RvciBwcm9qZWN0aW9uIHNsb3Qgd2lsbCBiZSBkZWZpbmVkLlxuICpcbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1cHJvamVjdGlvbkRlZihwcm9qZWN0aW9uU2xvdHM/OiBQcm9qZWN0aW9uU2xvdHMpOiB2b2lkIHtcbiAgY29uc3QgY29tcG9uZW50Tm9kZSA9IGdldExWaWV3KClbREVDTEFSQVRJT05fQ09NUE9ORU5UX1ZJRVddW1RfSE9TVF0gYXMgVEVsZW1lbnROb2RlO1xuXG4gIGlmICghY29tcG9uZW50Tm9kZS5wcm9qZWN0aW9uKSB7XG4gICAgLy8gSWYgbm8gZXhwbGljaXQgcHJvamVjdGlvbiBzbG90cyBhcmUgZGVmaW5lZCwgZmFsbCBiYWNrIHRvIGEgc2luZ2xlXG4gICAgLy8gcHJvamVjdGlvbiBzbG90IHdpdGggdGhlIHdpbGRjYXJkIHNlbGVjdG9yLlxuICAgIGNvbnN0IG51bVByb2plY3Rpb25TbG90cyA9IHByb2plY3Rpb25TbG90cyA/IHByb2plY3Rpb25TbG90cy5sZW5ndGggOiAxO1xuICAgIGNvbnN0IHByb2plY3Rpb25IZWFkczogKFROb2RlfG51bGwpW10gPSBjb21wb25lbnROb2RlLnByb2plY3Rpb24gPVxuICAgICAgICBuZXdBcnJheShudW1Qcm9qZWN0aW9uU2xvdHMsIG51bGwhIGFzIFROb2RlKTtcbiAgICBjb25zdCB0YWlsczogKFROb2RlfG51bGwpW10gPSBwcm9qZWN0aW9uSGVhZHMuc2xpY2UoKTtcblxuICAgIGxldCBjb21wb25lbnRDaGlsZDogVE5vZGV8bnVsbCA9IGNvbXBvbmVudE5vZGUuY2hpbGQ7XG5cbiAgICB3aGlsZSAoY29tcG9uZW50Q2hpbGQgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHNsb3RJbmRleCA9XG4gICAgICAgICAgcHJvamVjdGlvblNsb3RzID8gbWF0Y2hpbmdQcm9qZWN0aW9uU2xvdEluZGV4KGNvbXBvbmVudENoaWxkLCBwcm9qZWN0aW9uU2xvdHMpIDogMDtcblxuICAgICAgaWYgKHNsb3RJbmRleCAhPT0gbnVsbCkge1xuICAgICAgICBpZiAodGFpbHNbc2xvdEluZGV4XSkge1xuICAgICAgICAgIHRhaWxzW3Nsb3RJbmRleF0hLnByb2plY3Rpb25OZXh0ID0gY29tcG9uZW50Q2hpbGQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvamVjdGlvbkhlYWRzW3Nsb3RJbmRleF0gPSBjb21wb25lbnRDaGlsZDtcbiAgICAgICAgfVxuICAgICAgICB0YWlsc1tzbG90SW5kZXhdID0gY29tcG9uZW50Q2hpbGQ7XG4gICAgICB9XG5cbiAgICAgIGNvbXBvbmVudENoaWxkID0gY29tcG9uZW50Q2hpbGQubmV4dDtcbiAgICB9XG4gIH1cbn1cblxuXG4vKipcbiAqIEluc2VydHMgcHJldmlvdXNseSByZS1kaXN0cmlidXRlZCBwcm9qZWN0ZWQgbm9kZXMuIFRoaXMgaW5zdHJ1Y3Rpb24gbXVzdCBiZSBwcmVjZWRlZCBieSBhIGNhbGxcbiAqIHRvIHRoZSBwcm9qZWN0aW9uRGVmIGluc3RydWN0aW9uLlxuICpcbiAqIEBwYXJhbSBub2RlSW5kZXhcbiAqIEBwYXJhbSBzZWxlY3RvckluZGV4OlxuICogICAgICAgIC0gMCB3aGVuIHRoZSBzZWxlY3RvciBpcyBgKmAgKG9yIHVuc3BlY2lmaWVkIGFzIHRoaXMgaXMgdGhlIGRlZmF1bHQgdmFsdWUpLFxuICogICAgICAgIC0gMSBiYXNlZCBpbmRleCBvZiB0aGUgc2VsZWN0b3IgZnJvbSB0aGUge0BsaW5rIHByb2plY3Rpb25EZWZ9XG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVwcm9qZWN0aW9uKFxuICAgIG5vZGVJbmRleDogbnVtYmVyLCBzZWxlY3RvckluZGV4OiBudW1iZXIgPSAwLCBhdHRycz86IFRBdHRyaWJ1dGVzKTogdm9pZCB7XG4gIGNvbnN0IGxWaWV3ID0gZ2V0TFZpZXcoKTtcbiAgY29uc3QgdFZpZXcgPSBnZXRUVmlldygpO1xuICBjb25zdCB0UHJvamVjdGlvbk5vZGUgPVxuICAgICAgZ2V0T3JDcmVhdGVUTm9kZSh0VmlldywgSEVBREVSX09GRlNFVCArIG5vZGVJbmRleCwgVE5vZGVUeXBlLlByb2plY3Rpb24sIG51bGwsIGF0dHJzIHx8IG51bGwpO1xuXG4gIC8vIFdlIGNhbid0IHVzZSB2aWV3RGF0YVtIT1NUX05PREVdIGJlY2F1c2UgcHJvamVjdGlvbiBub2RlcyBjYW4gYmUgbmVzdGVkIGluIGVtYmVkZGVkIHZpZXdzLlxuICBpZiAodFByb2plY3Rpb25Ob2RlLnByb2plY3Rpb24gPT09IG51bGwpIHRQcm9qZWN0aW9uTm9kZS5wcm9qZWN0aW9uID0gc2VsZWN0b3JJbmRleDtcblxuICAvLyBgPG5nLWNvbnRlbnQ+YCBoYXMgbm8gY29udGVudFxuICBzZXRDdXJyZW50VE5vZGVBc05vdFBhcmVudCgpO1xuXG4gIGNvbnN0IGh5ZHJhdGlvbkluZm8gPSBsVmlld1tIWURSQVRJT05dO1xuICBjb25zdCBpc05vZGVDcmVhdGlvbk1vZGUgPSAhaHlkcmF0aW9uSW5mbyB8fCBpc0luU2tpcEh5ZHJhdGlvbkJsb2NrKCk7XG4gIGlmIChpc05vZGVDcmVhdGlvbk1vZGUgJiZcbiAgICAgICh0UHJvamVjdGlvbk5vZGUuZmxhZ3MgJiBUTm9kZUZsYWdzLmlzRGV0YWNoZWQpICE9PSBUTm9kZUZsYWdzLmlzRGV0YWNoZWQpIHtcbiAgICAvLyByZS1kaXN0cmlidXRpb24gb2YgcHJvamVjdGFibGUgbm9kZXMgaXMgc3RvcmVkIG9uIGEgY29tcG9uZW50J3MgdmlldyBsZXZlbFxuICAgIGFwcGx5UHJvamVjdGlvbih0VmlldywgbFZpZXcsIHRQcm9qZWN0aW9uTm9kZSk7XG4gIH1cbn1cbiJdfQ==