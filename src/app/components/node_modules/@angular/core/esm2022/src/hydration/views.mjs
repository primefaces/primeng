/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DEHYDRATED_VIEWS } from '../render3/interfaces/container';
import { removeDehydratedViews } from './cleanup';
import { MULTIPLIER, NUM_ROOT_NODES, TEMPLATE_ID } from './interfaces';
import { siblingAfter } from './node_lookup_utils';
/**
 * Given a current DOM node and a serialized information about the views
 * in a container, walks over the DOM structure, collecting the list of
 * dehydrated views.
 */
export function locateDehydratedViewsInContainer(currentRNode, serializedViews) {
    const dehydratedViews = [];
    for (const serializedView of serializedViews) {
        // Repeats a view multiple times as needed, based on the serialized information
        // (for example, for *ngFor-produced views).
        for (let i = 0; i < (serializedView[MULTIPLIER] ?? 1); i++) {
            const view = {
                data: serializedView,
                firstChild: null,
            };
            if (serializedView[NUM_ROOT_NODES] > 0) {
                // Keep reference to the first node in this view,
                // so it can be accessed while invoking template instructions.
                view.firstChild = currentRNode;
                // Move over to the next node after this view, which can
                // either be a first node of the next view or an anchor comment
                // node after the last view in a container.
                currentRNode = siblingAfter(serializedView[NUM_ROOT_NODES], currentRNode);
            }
            dehydratedViews.push(view);
        }
    }
    return [currentRNode, dehydratedViews];
}
/**
 * Reference to a function that searches for a matching dehydrated views
 * stored on a given lContainer.
 * Returns `null` by default, when hydration is not enabled.
 */
let _findMatchingDehydratedViewImpl = () => null;
/**
 * Retrieves the next dehydrated view from the LContainer and verifies that
 * it matches a given template id (from the TView that was used to create this
 * instance of a view). If the id doesn't match, that means that we are in an
 * unexpected state and can not complete the reconciliation process. Thus,
 * all dehydrated views from this LContainer are removed (including corresponding
 * DOM nodes) and the rendering is performed as if there were no dehydrated views
 * in this container.
 */
function findMatchingDehydratedViewImpl(lContainer, template) {
    const views = lContainer[DEHYDRATED_VIEWS];
    if (!template || views === null || views.length === 0) {
        return null;
    }
    const view = views[0];
    // Verify whether the first dehydrated view in the container matches
    // the template id passed to this function (that originated from a TView
    // that was used to create an instance of an embedded or component views.
    if (view.data[TEMPLATE_ID] === template) {
        // If the template id matches - extract the first view and return it.
        return views.shift();
    }
    else {
        // Otherwise, we are at the state when reconciliation can not be completed,
        // thus we remove all dehydrated views within this container (remove them
        // from internal data structures as well as delete associated elements from
        // the DOM tree).
        removeDehydratedViews(lContainer);
        return null;
    }
}
export function enableFindMatchingDehydratedViewImpl() {
    _findMatchingDehydratedViewImpl = findMatchingDehydratedViewImpl;
}
export function findMatchingDehydratedView(lContainer, template) {
    return _findMatchingDehydratedViewImpl(lContainer, template);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9oeWRyYXRpb24vdmlld3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFhLE1BQU0saUNBQWlDLENBQUM7QUFHN0UsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQ2hELE9BQU8sRUFBMEIsVUFBVSxFQUFFLGNBQWMsRUFBMkIsV0FBVyxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ3ZILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUdqRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGdDQUFnQyxDQUM1QyxZQUFtQixFQUNuQixlQUEwQztJQUM1QyxNQUFNLGVBQWUsR0FBOEIsRUFBRSxDQUFDO0lBQ3RELEtBQUssTUFBTSxjQUFjLElBQUksZUFBZSxFQUFFLENBQUM7UUFDN0MsK0VBQStFO1FBQy9FLDRDQUE0QztRQUM1QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUMzRCxNQUFNLElBQUksR0FBNEI7Z0JBQ3BDLElBQUksRUFBRSxjQUFjO2dCQUNwQixVQUFVLEVBQUUsSUFBSTthQUNqQixDQUFDO1lBQ0YsSUFBSSxjQUFjLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZDLGlEQUFpRDtnQkFDakQsOERBQThEO2dCQUM5RCxJQUFJLENBQUMsVUFBVSxHQUFHLFlBQTJCLENBQUM7Z0JBRTlDLHdEQUF3RDtnQkFDeEQsK0RBQStEO2dCQUMvRCwyQ0FBMkM7Z0JBQzNDLFlBQVksR0FBRyxZQUFZLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxFQUFFLFlBQVksQ0FBRSxDQUFDO1lBQzdFLENBQUM7WUFDRCxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLENBQUM7SUFDSCxDQUFDO0lBRUQsT0FBTyxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUMsQ0FBQztBQUN6QyxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILElBQUksK0JBQStCLEdBQTBDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztBQUV4Rjs7Ozs7Ozs7R0FRRztBQUNILFNBQVMsOEJBQThCLENBQ25DLFVBQXNCLEVBQUUsUUFBcUI7SUFDL0MsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDM0MsSUFBSSxDQUFDLFFBQVEsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDdEQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0QsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RCLG9FQUFvRTtJQUNwRSx3RUFBd0U7SUFDeEUseUVBQXlFO0lBQ3pFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxRQUFRLEVBQUUsQ0FBQztRQUN4QyxxRUFBcUU7UUFDckUsT0FBTyxLQUFLLENBQUMsS0FBSyxFQUFHLENBQUM7SUFDeEIsQ0FBQztTQUFNLENBQUM7UUFDTiwyRUFBMkU7UUFDM0UseUVBQXlFO1FBQ3pFLDJFQUEyRTtRQUMzRSxpQkFBaUI7UUFDakIscUJBQXFCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSxvQ0FBb0M7SUFDbEQsK0JBQStCLEdBQUcsOEJBQThCLENBQUM7QUFDbkUsQ0FBQztBQUVELE1BQU0sVUFBVSwwQkFBMEIsQ0FDdEMsVUFBc0IsRUFBRSxRQUFxQjtJQUMvQyxPQUFPLCtCQUErQixDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUMvRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7REVIWURSQVRFRF9WSUVXUywgTENvbnRhaW5lcn0gZnJvbSAnLi4vcmVuZGVyMy9pbnRlcmZhY2VzL2NvbnRhaW5lcic7XG5pbXBvcnQge1JOb2RlfSBmcm9tICcuLi9yZW5kZXIzL2ludGVyZmFjZXMvcmVuZGVyZXJfZG9tJztcblxuaW1wb3J0IHtyZW1vdmVEZWh5ZHJhdGVkVmlld3N9IGZyb20gJy4vY2xlYW51cCc7XG5pbXBvcnQge0RlaHlkcmF0ZWRDb250YWluZXJWaWV3LCBNVUxUSVBMSUVSLCBOVU1fUk9PVF9OT0RFUywgU2VyaWFsaXplZENvbnRhaW5lclZpZXcsIFRFTVBMQVRFX0lEfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHtzaWJsaW5nQWZ0ZXJ9IGZyb20gJy4vbm9kZV9sb29rdXBfdXRpbHMnO1xuXG5cbi8qKlxuICogR2l2ZW4gYSBjdXJyZW50IERPTSBub2RlIGFuZCBhIHNlcmlhbGl6ZWQgaW5mb3JtYXRpb24gYWJvdXQgdGhlIHZpZXdzXG4gKiBpbiBhIGNvbnRhaW5lciwgd2Fsa3Mgb3ZlciB0aGUgRE9NIHN0cnVjdHVyZSwgY29sbGVjdGluZyB0aGUgbGlzdCBvZlxuICogZGVoeWRyYXRlZCB2aWV3cy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvY2F0ZURlaHlkcmF0ZWRWaWV3c0luQ29udGFpbmVyKFxuICAgIGN1cnJlbnRSTm9kZTogUk5vZGUsXG4gICAgc2VyaWFsaXplZFZpZXdzOiBTZXJpYWxpemVkQ29udGFpbmVyVmlld1tdKTogW1JOb2RlLCBEZWh5ZHJhdGVkQ29udGFpbmVyVmlld1tdXSB7XG4gIGNvbnN0IGRlaHlkcmF0ZWRWaWV3czogRGVoeWRyYXRlZENvbnRhaW5lclZpZXdbXSA9IFtdO1xuICBmb3IgKGNvbnN0IHNlcmlhbGl6ZWRWaWV3IG9mIHNlcmlhbGl6ZWRWaWV3cykge1xuICAgIC8vIFJlcGVhdHMgYSB2aWV3IG11bHRpcGxlIHRpbWVzIGFzIG5lZWRlZCwgYmFzZWQgb24gdGhlIHNlcmlhbGl6ZWQgaW5mb3JtYXRpb25cbiAgICAvLyAoZm9yIGV4YW1wbGUsIGZvciAqbmdGb3ItcHJvZHVjZWQgdmlld3MpLlxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgKHNlcmlhbGl6ZWRWaWV3W01VTFRJUExJRVJdID8/IDEpOyBpKyspIHtcbiAgICAgIGNvbnN0IHZpZXc6IERlaHlkcmF0ZWRDb250YWluZXJWaWV3ID0ge1xuICAgICAgICBkYXRhOiBzZXJpYWxpemVkVmlldyxcbiAgICAgICAgZmlyc3RDaGlsZDogbnVsbCxcbiAgICAgIH07XG4gICAgICBpZiAoc2VyaWFsaXplZFZpZXdbTlVNX1JPT1RfTk9ERVNdID4gMCkge1xuICAgICAgICAvLyBLZWVwIHJlZmVyZW5jZSB0byB0aGUgZmlyc3Qgbm9kZSBpbiB0aGlzIHZpZXcsXG4gICAgICAgIC8vIHNvIGl0IGNhbiBiZSBhY2Nlc3NlZCB3aGlsZSBpbnZva2luZyB0ZW1wbGF0ZSBpbnN0cnVjdGlvbnMuXG4gICAgICAgIHZpZXcuZmlyc3RDaGlsZCA9IGN1cnJlbnRSTm9kZSBhcyBIVE1MRWxlbWVudDtcblxuICAgICAgICAvLyBNb3ZlIG92ZXIgdG8gdGhlIG5leHQgbm9kZSBhZnRlciB0aGlzIHZpZXcsIHdoaWNoIGNhblxuICAgICAgICAvLyBlaXRoZXIgYmUgYSBmaXJzdCBub2RlIG9mIHRoZSBuZXh0IHZpZXcgb3IgYW4gYW5jaG9yIGNvbW1lbnRcbiAgICAgICAgLy8gbm9kZSBhZnRlciB0aGUgbGFzdCB2aWV3IGluIGEgY29udGFpbmVyLlxuICAgICAgICBjdXJyZW50Uk5vZGUgPSBzaWJsaW5nQWZ0ZXIoc2VyaWFsaXplZFZpZXdbTlVNX1JPT1RfTk9ERVNdLCBjdXJyZW50Uk5vZGUpITtcbiAgICAgIH1cbiAgICAgIGRlaHlkcmF0ZWRWaWV3cy5wdXNoKHZpZXcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBbY3VycmVudFJOb2RlLCBkZWh5ZHJhdGVkVmlld3NdO1xufVxuXG4vKipcbiAqIFJlZmVyZW5jZSB0byBhIGZ1bmN0aW9uIHRoYXQgc2VhcmNoZXMgZm9yIGEgbWF0Y2hpbmcgZGVoeWRyYXRlZCB2aWV3c1xuICogc3RvcmVkIG9uIGEgZ2l2ZW4gbENvbnRhaW5lci5cbiAqIFJldHVybnMgYG51bGxgIGJ5IGRlZmF1bHQsIHdoZW4gaHlkcmF0aW9uIGlzIG5vdCBlbmFibGVkLlxuICovXG5sZXQgX2ZpbmRNYXRjaGluZ0RlaHlkcmF0ZWRWaWV3SW1wbDogdHlwZW9mIGZpbmRNYXRjaGluZ0RlaHlkcmF0ZWRWaWV3SW1wbCA9ICgpID0+IG51bGw7XG5cbi8qKlxuICogUmV0cmlldmVzIHRoZSBuZXh0IGRlaHlkcmF0ZWQgdmlldyBmcm9tIHRoZSBMQ29udGFpbmVyIGFuZCB2ZXJpZmllcyB0aGF0XG4gKiBpdCBtYXRjaGVzIGEgZ2l2ZW4gdGVtcGxhdGUgaWQgKGZyb20gdGhlIFRWaWV3IHRoYXQgd2FzIHVzZWQgdG8gY3JlYXRlIHRoaXNcbiAqIGluc3RhbmNlIG9mIGEgdmlldykuIElmIHRoZSBpZCBkb2Vzbid0IG1hdGNoLCB0aGF0IG1lYW5zIHRoYXQgd2UgYXJlIGluIGFuXG4gKiB1bmV4cGVjdGVkIHN0YXRlIGFuZCBjYW4gbm90IGNvbXBsZXRlIHRoZSByZWNvbmNpbGlhdGlvbiBwcm9jZXNzLiBUaHVzLFxuICogYWxsIGRlaHlkcmF0ZWQgdmlld3MgZnJvbSB0aGlzIExDb250YWluZXIgYXJlIHJlbW92ZWQgKGluY2x1ZGluZyBjb3JyZXNwb25kaW5nXG4gKiBET00gbm9kZXMpIGFuZCB0aGUgcmVuZGVyaW5nIGlzIHBlcmZvcm1lZCBhcyBpZiB0aGVyZSB3ZXJlIG5vIGRlaHlkcmF0ZWQgdmlld3NcbiAqIGluIHRoaXMgY29udGFpbmVyLlxuICovXG5mdW5jdGlvbiBmaW5kTWF0Y2hpbmdEZWh5ZHJhdGVkVmlld0ltcGwoXG4gICAgbENvbnRhaW5lcjogTENvbnRhaW5lciwgdGVtcGxhdGU6IHN0cmluZ3xudWxsKTogRGVoeWRyYXRlZENvbnRhaW5lclZpZXd8bnVsbCB7XG4gIGNvbnN0IHZpZXdzID0gbENvbnRhaW5lcltERUhZRFJBVEVEX1ZJRVdTXTtcbiAgaWYgKCF0ZW1wbGF0ZSB8fCB2aWV3cyA9PT0gbnVsbCB8fCB2aWV3cy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBjb25zdCB2aWV3ID0gdmlld3NbMF07XG4gIC8vIFZlcmlmeSB3aGV0aGVyIHRoZSBmaXJzdCBkZWh5ZHJhdGVkIHZpZXcgaW4gdGhlIGNvbnRhaW5lciBtYXRjaGVzXG4gIC8vIHRoZSB0ZW1wbGF0ZSBpZCBwYXNzZWQgdG8gdGhpcyBmdW5jdGlvbiAodGhhdCBvcmlnaW5hdGVkIGZyb20gYSBUVmlld1xuICAvLyB0aGF0IHdhcyB1c2VkIHRvIGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiBhbiBlbWJlZGRlZCBvciBjb21wb25lbnQgdmlld3MuXG4gIGlmICh2aWV3LmRhdGFbVEVNUExBVEVfSURdID09PSB0ZW1wbGF0ZSkge1xuICAgIC8vIElmIHRoZSB0ZW1wbGF0ZSBpZCBtYXRjaGVzIC0gZXh0cmFjdCB0aGUgZmlyc3QgdmlldyBhbmQgcmV0dXJuIGl0LlxuICAgIHJldHVybiB2aWV3cy5zaGlmdCgpITtcbiAgfSBlbHNlIHtcbiAgICAvLyBPdGhlcndpc2UsIHdlIGFyZSBhdCB0aGUgc3RhdGUgd2hlbiByZWNvbmNpbGlhdGlvbiBjYW4gbm90IGJlIGNvbXBsZXRlZCxcbiAgICAvLyB0aHVzIHdlIHJlbW92ZSBhbGwgZGVoeWRyYXRlZCB2aWV3cyB3aXRoaW4gdGhpcyBjb250YWluZXIgKHJlbW92ZSB0aGVtXG4gICAgLy8gZnJvbSBpbnRlcm5hbCBkYXRhIHN0cnVjdHVyZXMgYXMgd2VsbCBhcyBkZWxldGUgYXNzb2NpYXRlZCBlbGVtZW50cyBmcm9tXG4gICAgLy8gdGhlIERPTSB0cmVlKS5cbiAgICByZW1vdmVEZWh5ZHJhdGVkVmlld3MobENvbnRhaW5lcik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZUZpbmRNYXRjaGluZ0RlaHlkcmF0ZWRWaWV3SW1wbCgpIHtcbiAgX2ZpbmRNYXRjaGluZ0RlaHlkcmF0ZWRWaWV3SW1wbCA9IGZpbmRNYXRjaGluZ0RlaHlkcmF0ZWRWaWV3SW1wbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRNYXRjaGluZ0RlaHlkcmF0ZWRWaWV3KFxuICAgIGxDb250YWluZXI6IExDb250YWluZXIsIHRlbXBsYXRlOiBzdHJpbmd8bnVsbCk6IERlaHlkcmF0ZWRDb250YWluZXJWaWV3fG51bGwge1xuICByZXR1cm4gX2ZpbmRNYXRjaGluZ0RlaHlkcmF0ZWRWaWV3SW1wbChsQ29udGFpbmVyLCB0ZW1wbGF0ZSk7XG59XG4iXX0=