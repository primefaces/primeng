/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import '../util/ng_dev_mode';
import { assertDefined, assertDomNode } from '../util/assert';
import { EMPTY_ARRAY } from '../util/empty';
import { assertLView } from './assert';
import { LContext } from './interfaces/context';
import { getLViewById, registerLView } from './interfaces/lview_tracking';
import { isLView } from './interfaces/type_checks';
import { CONTEXT, HEADER_OFFSET, HOST, ID, TVIEW } from './interfaces/view';
import { getComponentLViewByIndex, unwrapRNode } from './util/view_utils';
/**
 * Returns the matching `LContext` data for a given DOM node, directive or component instance.
 *
 * This function will examine the provided DOM element, component, or directive instance\'s
 * monkey-patched property to derive the `LContext` data. Once called then the monkey-patched
 * value will be that of the newly created `LContext`.
 *
 * If the monkey-patched value is the `LView` instance then the context value for that
 * target will be created and the monkey-patch reference will be updated. Therefore when this
 * function is called it may mutate the provided element\'s, component\'s or any of the associated
 * directive\'s monkey-patch values.
 *
 * If the monkey-patch value is not detected then the code will walk up the DOM until an element
 * is found which contains a monkey-patch reference. When that occurs then the provided element
 * will be updated with a new context (which is then returned). If the monkey-patch value is not
 * detected for a component/directive instance then it will throw an error (all components and
 * directives should be automatically monkey-patched by ivy).
 *
 * @param target Component, Directive or DOM Node.
 */
export function getLContext(target) {
    let mpValue = readPatchedData(target);
    if (mpValue) {
        // only when it's an array is it considered an LView instance
        // ... otherwise it's an already constructed LContext instance
        if (isLView(mpValue)) {
            const lView = mpValue;
            let nodeIndex;
            let component = undefined;
            let directives = undefined;
            if (isComponentInstance(target)) {
                nodeIndex = findViaComponent(lView, target);
                if (nodeIndex == -1) {
                    throw new Error('The provided component was not found in the application');
                }
                component = target;
            }
            else if (isDirectiveInstance(target)) {
                nodeIndex = findViaDirective(lView, target);
                if (nodeIndex == -1) {
                    throw new Error('The provided directive was not found in the application');
                }
                directives = getDirectivesAtNodeIndex(nodeIndex, lView);
            }
            else {
                nodeIndex = findViaNativeElement(lView, target);
                if (nodeIndex == -1) {
                    return null;
                }
            }
            // the goal is not to fill the entire context full of data because the lookups
            // are expensive. Instead, only the target data (the element, component, container, ICU
            // expression or directive details) are filled into the context. If called multiple times
            // with different target values then the missing target data will be filled in.
            const native = unwrapRNode(lView[nodeIndex]);
            const existingCtx = readPatchedData(native);
            const context = (existingCtx && !Array.isArray(existingCtx)) ?
                existingCtx :
                createLContext(lView, nodeIndex, native);
            // only when the component has been discovered then update the monkey-patch
            if (component && context.component === undefined) {
                context.component = component;
                attachPatchData(context.component, context);
            }
            // only when the directives have been discovered then update the monkey-patch
            if (directives && context.directives === undefined) {
                context.directives = directives;
                for (let i = 0; i < directives.length; i++) {
                    attachPatchData(directives[i], context);
                }
            }
            attachPatchData(context.native, context);
            mpValue = context;
        }
    }
    else {
        const rElement = target;
        ngDevMode && assertDomNode(rElement);
        // if the context is not found then we need to traverse upwards up the DOM
        // to find the nearest element that has already been monkey patched with data
        let parent = rElement;
        while (parent = parent.parentNode) {
            const parentContext = readPatchedData(parent);
            if (parentContext) {
                const lView = Array.isArray(parentContext) ? parentContext : parentContext.lView;
                // the edge of the app was also reached here through another means
                // (maybe because the DOM was changed manually).
                if (!lView) {
                    return null;
                }
                const index = findViaNativeElement(lView, rElement);
                if (index >= 0) {
                    const native = unwrapRNode(lView[index]);
                    const context = createLContext(lView, index, native);
                    attachPatchData(native, context);
                    mpValue = context;
                    break;
                }
            }
        }
    }
    return mpValue || null;
}
/**
 * Creates an empty instance of a `LContext` context
 */
function createLContext(lView, nodeIndex, native) {
    return new LContext(lView[ID], nodeIndex, native);
}
/**
 * Takes a component instance and returns the view for that component.
 *
 * @param componentInstance
 * @returns The component's view
 */
export function getComponentViewByInstance(componentInstance) {
    let patchedData = readPatchedData(componentInstance);
    let lView;
    if (isLView(patchedData)) {
        const contextLView = patchedData;
        const nodeIndex = findViaComponent(contextLView, componentInstance);
        lView = getComponentLViewByIndex(nodeIndex, contextLView);
        const context = createLContext(contextLView, nodeIndex, lView[HOST]);
        context.component = componentInstance;
        attachPatchData(componentInstance, context);
        attachPatchData(context.native, context);
    }
    else {
        const context = patchedData;
        const contextLView = context.lView;
        ngDevMode && assertLView(contextLView);
        lView = getComponentLViewByIndex(context.nodeIndex, contextLView);
    }
    return lView;
}
/**
 * This property will be monkey-patched on elements, components and directives.
 */
const MONKEY_PATCH_KEY_NAME = '__ngContext__';
/**
 * Assigns the given data to the given target (which could be a component,
 * directive or DOM node instance) using monkey-patching.
 */
export function attachPatchData(target, data) {
    ngDevMode && assertDefined(target, 'Target expected');
    // Only attach the ID of the view in order to avoid memory leaks (see #41047). We only do this
    // for `LView`, because we have control over when an `LView` is created and destroyed, whereas
    // we can't know when to remove an `LContext`.
    if (isLView(data)) {
        target[MONKEY_PATCH_KEY_NAME] = data[ID];
        registerLView(data);
    }
    else {
        target[MONKEY_PATCH_KEY_NAME] = data;
    }
}
/**
 * Returns the monkey-patch value data present on the target (which could be
 * a component, directive or a DOM node).
 */
export function readPatchedData(target) {
    ngDevMode && assertDefined(target, 'Target expected');
    const data = target[MONKEY_PATCH_KEY_NAME];
    return (typeof data === 'number') ? getLViewById(data) : data || null;
}
export function readPatchedLView(target) {
    const value = readPatchedData(target);
    if (value) {
        return (isLView(value) ? value : value.lView);
    }
    return null;
}
export function isComponentInstance(instance) {
    return instance && instance.constructor && instance.constructor.ɵcmp;
}
export function isDirectiveInstance(instance) {
    return instance && instance.constructor && instance.constructor.ɵdir;
}
/**
 * Locates the element within the given LView and returns the matching index
 */
function findViaNativeElement(lView, target) {
    const tView = lView[TVIEW];
    for (let i = HEADER_OFFSET; i < tView.bindingStartIndex; i++) {
        if (unwrapRNode(lView[i]) === target) {
            return i;
        }
    }
    return -1;
}
/**
 * Locates the next tNode (child, sibling or parent).
 */
function traverseNextElement(tNode) {
    if (tNode.child) {
        return tNode.child;
    }
    else if (tNode.next) {
        return tNode.next;
    }
    else {
        // Let's take the following template: <div><span>text</span></div><component/>
        // After checking the text node, we need to find the next parent that has a "next" TNode,
        // in this case the parent `div`, so that we can find the component.
        while (tNode.parent && !tNode.parent.next) {
            tNode = tNode.parent;
        }
        return tNode.parent && tNode.parent.next;
    }
}
/**
 * Locates the component within the given LView and returns the matching index
 */
function findViaComponent(lView, componentInstance) {
    const componentIndices = lView[TVIEW].components;
    if (componentIndices) {
        for (let i = 0; i < componentIndices.length; i++) {
            const elementComponentIndex = componentIndices[i];
            const componentView = getComponentLViewByIndex(elementComponentIndex, lView);
            if (componentView[CONTEXT] === componentInstance) {
                return elementComponentIndex;
            }
        }
    }
    else {
        const rootComponentView = getComponentLViewByIndex(HEADER_OFFSET, lView);
        const rootComponent = rootComponentView[CONTEXT];
        if (rootComponent === componentInstance) {
            // we are dealing with the root element here therefore we know that the
            // element is the very first element after the HEADER data in the lView
            return HEADER_OFFSET;
        }
    }
    return -1;
}
/**
 * Locates the directive within the given LView and returns the matching index
 */
function findViaDirective(lView, directiveInstance) {
    // if a directive is monkey patched then it will (by default)
    // have a reference to the LView of the current view. The
    // element bound to the directive being search lives somewhere
    // in the view data. We loop through the nodes and check their
    // list of directives for the instance.
    let tNode = lView[TVIEW].firstChild;
    while (tNode) {
        const directiveIndexStart = tNode.directiveStart;
        const directiveIndexEnd = tNode.directiveEnd;
        for (let i = directiveIndexStart; i < directiveIndexEnd; i++) {
            if (lView[i] === directiveInstance) {
                return tNode.index;
            }
        }
        tNode = traverseNextElement(tNode);
    }
    return -1;
}
/**
 * Returns a list of directives applied to a node at a specific index. The list includes
 * directives matched by selector and any host directives, but it excludes components.
 * Use `getComponentAtNodeIndex` to find the component applied to a node.
 *
 * @param nodeIndex The node index
 * @param lView The target view data
 */
export function getDirectivesAtNodeIndex(nodeIndex, lView) {
    const tNode = lView[TVIEW].data[nodeIndex];
    if (tNode.directiveStart === 0)
        return EMPTY_ARRAY;
    const results = [];
    for (let i = tNode.directiveStart; i < tNode.directiveEnd; i++) {
        const directiveInstance = lView[i];
        if (!isComponentInstance(directiveInstance)) {
            results.push(directiveInstance);
        }
    }
    return results;
}
export function getComponentAtNodeIndex(nodeIndex, lView) {
    const tNode = lView[TVIEW].data[nodeIndex];
    const { directiveStart, componentOffset } = tNode;
    return componentOffset > -1 ? lView[directiveStart + componentOffset] : null;
}
/**
 * Returns a map of local references (local reference name => element or directive instance) that
 * exist on a given element.
 */
export function discoverLocalRefs(lView, nodeIndex) {
    const tNode = lView[TVIEW].data[nodeIndex];
    if (tNode && tNode.localNames) {
        const result = {};
        let localIndex = tNode.index + 1;
        for (let i = 0; i < tNode.localNames.length; i += 2) {
            result[tNode.localNames[i]] = lView[localIndex];
            localIndex++;
        }
        return result;
    }
    return null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dF9kaXNjb3ZlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2NvbnRleHRfZGlzY292ZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTFDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDckMsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxZQUFZLEVBQUUsYUFBYSxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFHeEUsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQVMsS0FBSyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakYsT0FBTyxFQUFDLHdCQUF3QixFQUFFLFdBQVcsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBSXhFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsTUFBTSxVQUFVLFdBQVcsQ0FBQyxNQUFXO0lBQ3JDLElBQUksT0FBTyxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ1osNkRBQTZEO1FBQzdELDhEQUE4RDtRQUM5RCxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ3JCLE1BQU0sS0FBSyxHQUFVLE9BQVEsQ0FBQztZQUM5QixJQUFJLFNBQWlCLENBQUM7WUFDdEIsSUFBSSxTQUFTLEdBQVEsU0FBUyxDQUFDO1lBQy9C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QUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsS0FBWSxFQUFFLFNBQWlCO0lBQy9ELE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFVLENBQUM7SUFDcEQsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzlCLE1BQU0sTUFBTSxHQUF5QixFQUFFLENBQUM7UUFDeEMsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNwRCxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNoRCxVQUFVLEVBQUUsQ0FBQztRQUNmLENBQUM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgJy4uL3V0aWwvbmdfZGV2X21vZGUnO1xuXG5pbXBvcnQge2Fzc2VydERlZmluZWQsIGFzc2VydERvbU5vZGV9IGZyb20gJy4uL3V0aWwvYXNzZXJ0JztcbmltcG9ydCB7RU1QVFlfQVJSQVl9IGZyb20gJy4uL3V0aWwvZW1wdHknO1xuXG5pbXBvcnQge2Fzc2VydExWaWV3fSBmcm9tICcuL2Fzc2VydCc7XG5pbXBvcnQge0xDb250ZXh0fSBmcm9tICcuL2ludGVyZmFjZXMvY29udGV4dCc7XG5pbXBvcnQge2dldExWaWV3QnlJZCwgcmVnaXN0ZXJMVmlld30gZnJvbSAnLi9pbnRlcmZhY2VzL2x2aWV3X3RyYWNraW5nJztcbmltcG9ydCB7VE5vZGV9IGZyb20gJy4vaW50ZXJmYWNlcy9ub2RlJztcbmltcG9ydCB7UkVsZW1lbnQsIFJOb2RlfSBmcm9tICcuL2ludGVyZmFjZXMvcmVuZGVyZXJfZG9tJztcbmltcG9ydCB7aXNMVmlld30gZnJvbSAnLi9pbnRlcmZhY2VzL3R5cGVfY2hlY2tzJztcbmltcG9ydCB7Q09OVEVYVCwgSEVBREVSX09GRlNFVCwgSE9TVCwgSUQsIExWaWV3LCBUVklFV30gZnJvbSAnLi9pbnRlcmZhY2VzL3ZpZXcnO1xuaW1wb3J0IHtnZXRDb21wb25lbnRMVmlld0J5SW5kZXgsIHVud3JhcFJOb2RlfSBmcm9tICcuL3V0aWwvdmlld191dGlscyc7XG5cblxuXG4vKipcbiAqIFJldHVybnMgdGhlIG1hdGNoaW5nIGBMQ29udGV4dGAgZGF0YSBmb3IgYSBnaXZlbiBET00gbm9kZSwgZGlyZWN0aXZlIG9yIGNvbXBvbmVudCBpbnN0YW5jZS5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHdpbGwgZXhhbWluZSB0aGUgcHJvdmlkZWQgRE9NIGVsZW1lbnQsIGNvbXBvbmVudCwgb3IgZGlyZWN0aXZlIGluc3RhbmNlXFwnc1xuICogbW9ua2V5LXBhdGNoZWQgcHJvcGVydHkgdG8gZGVyaXZlIHRoZSBgTENvbnRleHRgIGRhdGEuIE9uY2UgY2FsbGVkIHRoZW4gdGhlIG1vbmtleS1wYXRjaGVkXG4gKiB2YWx1ZSB3aWxsIGJlIHRoYXQgb2YgdGhlIG5ld2x5IGNyZWF0ZWQgYExDb250ZXh0YC5cbiAqXG4gKiBJZiB0aGUgbW9ua2V5LXBhdGNoZWQgdmFsdWUgaXMgdGhlIGBMVmlld2AgaW5zdGFuY2UgdGhlbiB0aGUgY29udGV4dCB2YWx1ZSBmb3IgdGhhdFxuICogdGFyZ2V0IHdpbGwgYmUgY3JlYXRlZCBhbmQgdGhlIG1vbmtleS1wYXRjaCByZWZlcmVuY2Ugd2lsbCBiZSB1cGRhdGVkLiBUaGVyZWZvcmUgd2hlbiB0aGlzXG4gKiBmdW5jdGlvbiBpcyBjYWxsZWQgaXQgbWF5IG11dGF0ZSB0aGUgcHJvdmlkZWQgZWxlbWVudFxcJ3MsIGNvbXBvbmVudFxcJ3Mgb3IgYW55IG9mIHRoZSBhc3NvY2lhdGVkXG4gKiBkaXJlY3RpdmVcXCdzIG1vbmtleS1wYXRjaCB2YWx1ZXMuXG4gKlxuICogSWYgdGhlIG1vbmtleS1wYXRjaCB2YWx1ZSBpcyBub3QgZGV0ZWN0ZWQgdGhlbiB0aGUgY29kZSB3aWxsIHdhbGsgdXAgdGhlIERPTSB1bnRpbCBhbiBlbGVtZW50XG4gKiBpcyBmb3VuZCB3aGljaCBjb250YWlucyBhIG1vbmtleS1wYXRjaCByZWZlcmVuY2UuIFdoZW4gdGhhdCBvY2N1cnMgdGhlbiB0aGUgcHJvdmlkZWQgZWxlbWVudFxuICogd2lsbCBiZSB1cGRhdGVkIHdpdGggYSBuZXcgY29udGV4dCAod2hpY2ggaXMgdGhlbiByZXR1cm5lZCkuIElmIHRoZSBtb25rZXktcGF0Y2ggdmFsdWUgaXMgbm90XG4gKiBkZXRlY3RlZCBmb3IgYSBjb21wb25lbnQvZGlyZWN0aXZlIGluc3RhbmNlIHRoZW4gaXQgd2lsbCB0aHJvdyBhbiBlcnJvciAoYWxsIGNvbXBvbmVudHMgYW5kXG4gKiBkaXJlY3RpdmVzIHNob3VsZCBiZSBhdXRvbWF0aWNhbGx5IG1vbmtleS1wYXRjaGVkIGJ5IGl2eSkuXG4gKlxuICogQHBhcmFtIHRhcmdldCBDb21wb25lbnQsIERpcmVjdGl2ZSBvciBET00gTm9kZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldExDb250ZXh0KHRhcmdldDogYW55KTogTENvbnRleHR8bnVsbCB7XG4gIGxldCBtcFZhbHVlID0gcmVhZFBhdGNoZWREYXRhKHRhcmdldCk7XG4gIGlmIChtcFZhbHVlKSB7XG4gICAgLy8gb25seSB3aGVuIGl0J3MgYW4gYXJyYXkgaXMgaXQgY29uc2lkZXJlZCBhbiBMVmlldyBpbnN0YW5jZVxuICAgIC8vIC4uLiBvdGhlcndpc2UgaXQncyBhbiBhbHJlYWR5IGNvbnN0cnVjdGVkIExDb250ZXh0IGluc3RhbmNlXG4gICAgaWYgKGlzTFZpZXcobXBWYWx1ZSkpIHtcbiAgICAgIGNvbnN0IGxWaWV3OiBMVmlldyA9IG1wVmFsdWUhO1xuICAgICAgbGV0IG5vZGVJbmRleDogbnVtYmVyO1xuICAgICAgbGV0IGNvbXBvbmVudDogYW55ID0gdW5kZWZpbmVkO1xuICAgICAgbGV0IGRpcmVjdGl2ZXM6IGFueVtdfG51bGx8dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoaXNDb21wb25lbnRJbnN0YW5jZSh0YXJnZXQpKSB7XG4gICAgICAgIG5vZGVJbmRleCA9IGZpbmRWaWFDb21wb25lbnQobFZpZXcsIHRhcmdldCk7XG4gICAgICAgIGlmIChub2RlSW5kZXggPT0gLTEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBwcm92aWRlZCBjb21wb25lbnQgd2FzIG5vdCBmb3VuZCBpbiB0aGUgYXBwbGljYXRpb24nKTtcbiAgICAgICAgfVxuICAgICAgICBjb21wb25lbnQgPSB0YXJnZXQ7XG4gICAgICB9IGVsc2UgaWYgKGlzRGlyZWN0aXZlSW5zdGFuY2UodGFyZ2V0KSkge1xuICAgICAgICBub2RlSW5kZXggPSBmaW5kVmlhRGlyZWN0aXZlKGxWaWV3LCB0YXJnZXQpO1xuICAgICAgICBpZiAobm9kZUluZGV4ID09IC0xKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgcHJvdmlkZWQgZGlyZWN0aXZlIHdhcyBub3QgZm91bmQgaW4gdGhlIGFwcGxpY2F0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgZGlyZWN0aXZlcyA9IGdldERpcmVjdGl2ZXNBdE5vZGVJbmRleChub2RlSW5kZXgsIGxWaWV3KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGVJbmRleCA9IGZpbmRWaWFOYXRpdmVFbGVtZW50KGxWaWV3LCB0YXJnZXQgYXMgUkVsZW1lbnQpO1xuICAgICAgICBpZiAobm9kZUluZGV4ID09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gdGhlIGdvYWwgaXMgbm90IHRvIGZpbGwgdGhlIGVudGlyZSBjb250ZXh0IGZ1bGwgb2YgZGF0YSBiZWNhdXNlIHRoZSBsb29rdXBzXG4gICAgICAvLyBhcmUgZXhwZW5zaXZlLiBJbnN0ZWFkLCBvbmx5IHRoZSB0YXJnZXQgZGF0YSAodGhlIGVsZW1lbnQsIGNvbXBvbmVudCwgY29udGFpbmVyLCBJQ1VcbiAgICAgIC8vIGV4cHJlc3Npb24gb3IgZGlyZWN0aXZlIGRldGFpbHMpIGFyZSBmaWxsZWQgaW50byB0aGUgY29udGV4dC4gSWYgY2FsbGVkIG11bHRpcGxlIHRpbWVzXG4gICAgICAvLyB3aXRoIGRpZmZlcmVudCB0YXJnZXQgdmFsdWVzIHRoZW4gdGhlIG1pc3NpbmcgdGFyZ2V0IGRhdGEgd2lsbCBiZSBmaWxsZWQgaW4uXG4gICAgICBjb25zdCBuYXRpdmUgPSB1bndyYXBSTm9kZShsVmlld1tub2RlSW5kZXhdKTtcbiAgICAgIGNvbnN0IGV4aXN0aW5nQ3R4ID0gcmVhZFBhdGNoZWREYXRhKG5hdGl2ZSk7XG4gICAgICBjb25zdCBjb250ZXh0OiBMQ29udGV4dCA9IChleGlzdGluZ0N0eCAmJiAhQXJyYXkuaXNBcnJheShleGlzdGluZ0N0eCkpID9cbiAgICAgICAgICBleGlzdGluZ0N0eCA6XG4gICAgICAgICAgY3JlYXRlTENvbnRleHQobFZpZXcsIG5vZGVJbmRleCwgbmF0aXZlKTtcblxuICAgICAgLy8gb25seSB3aGVuIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gZGlzY292ZXJlZCB0aGVuIHVwZGF0ZSB0aGUgbW9ua2V5LXBhdGNoXG4gICAgICBpZiAoY29tcG9uZW50ICYmIGNvbnRleHQuY29tcG9uZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29udGV4dC5jb21wb25lbnQgPSBjb21wb25lbnQ7XG4gICAgICAgIGF0dGFjaFBhdGNoRGF0YShjb250ZXh0LmNvbXBvbmVudCwgY29udGV4dCk7XG4gICAgICB9XG5cbiAgICAgIC8vIG9ubHkgd2hlbiB0aGUgZGlyZWN0aXZlcyBoYXZlIGJlZW4gZGlzY292ZXJlZCB0aGVuIHVwZGF0ZSB0aGUgbW9ua2V5LXBhdGNoXG4gICAgICBpZiAoZGlyZWN0aXZlcyAmJiBjb250ZXh0LmRpcmVjdGl2ZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb250ZXh0LmRpcmVjdGl2ZXMgPSBkaXJlY3RpdmVzO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpcmVjdGl2ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBhdHRhY2hQYXRjaERhdGEoZGlyZWN0aXZlc1tpXSwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYXR0YWNoUGF0Y2hEYXRhKGNvbnRleHQubmF0aXZlLCBjb250ZXh0KTtcbiAgICAgIG1wVmFsdWUgPSBjb250ZXh0O1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zdCByRWxlbWVudCA9IHRhcmdldCBhcyBSRWxlbWVudDtcbiAgICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RG9tTm9kZShyRWxlbWVudCk7XG5cbiAgICAvLyBpZiB0aGUgY29udGV4dCBpcyBub3QgZm91bmQgdGhlbiB3ZSBuZWVkIHRvIHRyYXZlcnNlIHVwd2FyZHMgdXAgdGhlIERPTVxuICAgIC8vIHRvIGZpbmQgdGhlIG5lYXJlc3QgZWxlbWVudCB0aGF0IGhhcyBhbHJlYWR5IGJlZW4gbW9ua2V5IHBhdGNoZWQgd2l0aCBkYXRhXG4gICAgbGV0IHBhcmVudCA9IHJFbGVtZW50IGFzIGFueTtcbiAgICB3aGlsZSAocGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGUpIHtcbiAgICAgIGNvbnN0IHBhcmVudENvbnRleHQgPSByZWFkUGF0Y2hlZERhdGEocGFyZW50KTtcbiAgICAgIGlmIChwYXJlbnRDb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IGxWaWV3ID0gQXJyYXkuaXNBcnJheShwYXJlbnRDb250ZXh0KSA/IHBhcmVudENvbnRleHQgYXMgTFZpZXcgOiBwYXJlbnRDb250ZXh0LmxWaWV3O1xuXG4gICAgICAgIC8vIHRoZSBlZGdlIG9mIHRoZSBhcHAgd2FzIGFsc28gcmVhY2hlZCBoZXJlIHRocm91Z2ggYW5vdGhlciBtZWFuc1xuICAgICAgICAvLyAobWF5YmUgYmVjYXVzZSB0aGUgRE9NIHdhcyBjaGFuZ2VkIG1hbnVhbGx5KS5cbiAgICAgICAgaWYgKCFsVmlldykge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaW5kZXggPSBmaW5kVmlhTmF0aXZlRWxlbWVudChsVmlldywgckVsZW1lbnQpO1xuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgIGNvbnN0IG5hdGl2ZSA9IHVud3JhcFJOb2RlKGxWaWV3W2luZGV4XSk7XG4gICAgICAgICAgY29uc3QgY29udGV4dCA9IGNyZWF0ZUxDb250ZXh0KGxWaWV3LCBpbmRleCwgbmF0aXZlKTtcbiAgICAgICAgICBhdHRhY2hQYXRjaERhdGEobmF0aXZlLCBjb250ZXh0KTtcbiAgICAgICAgICBtcFZhbHVlID0gY29udGV4dDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gKG1wVmFsdWUgYXMgTENvbnRleHQpIHx8IG51bGw7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBlbXB0eSBpbnN0YW5jZSBvZiBhIGBMQ29udGV4dGAgY29udGV4dFxuICovXG5mdW5jdGlvbiBjcmVhdGVMQ29udGV4dChsVmlldzogTFZpZXcsIG5vZGVJbmRleDogbnVtYmVyLCBuYXRpdmU6IFJOb2RlKTogTENvbnRleHQge1xuICByZXR1cm4gbmV3IExDb250ZXh0KGxWaWV3W0lEXSwgbm9kZUluZGV4LCBuYXRpdmUpO1xufVxuXG4vKipcbiAqIFRha2VzIGEgY29tcG9uZW50IGluc3RhbmNlIGFuZCByZXR1cm5zIHRoZSB2aWV3IGZvciB0aGF0IGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0gY29tcG9uZW50SW5zdGFuY2VcbiAqIEByZXR1cm5zIFRoZSBjb21wb25lbnQncyB2aWV3XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb21wb25lbnRWaWV3QnlJbnN0YW5jZShjb21wb25lbnRJbnN0YW5jZToge30pOiBMVmlldyB7XG4gIGxldCBwYXRjaGVkRGF0YSA9IHJlYWRQYXRjaGVkRGF0YShjb21wb25lbnRJbnN0YW5jZSk7XG4gIGxldCBsVmlldzogTFZpZXc7XG5cbiAgaWYgKGlzTFZpZXcocGF0Y2hlZERhdGEpKSB7XG4gICAgY29uc3QgY29udGV4dExWaWV3OiBMVmlldyA9IHBhdGNoZWREYXRhO1xuICAgIGNvbnN0IG5vZGVJbmRleCA9IGZpbmRWaWFDb21wb25lbnQoY29udGV4dExWaWV3LCBjb21wb25lbnRJbnN0YW5jZSk7XG4gICAgbFZpZXcgPSBnZXRDb21wb25lbnRMVmlld0J5SW5kZXgobm9kZUluZGV4LCBjb250ZXh0TFZpZXcpO1xuICAgIGNvbnN0IGNvbnRleHQgPSBjcmVhdGVMQ29udGV4dChjb250ZXh0TFZpZXcsIG5vZGVJbmRleCwgbFZpZXdbSE9TVF0gYXMgUkVsZW1lbnQpO1xuICAgIGNvbnRleHQuY29tcG9uZW50ID0gY29tcG9uZW50SW5zdGFuY2U7XG4gICAgYXR0YWNoUGF0Y2hEYXRhKGNvbXBvbmVudEluc3RhbmNlLCBjb250ZXh0KTtcbiAgICBhdHRhY2hQYXRjaERhdGEoY29udGV4dC5uYXRpdmUsIGNvbnRleHQpO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGNvbnRleHQgPSBwYXRjaGVkRGF0YSBhcyB1bmtub3duIGFzIExDb250ZXh0O1xuICAgIGNvbnN0IGNvbnRleHRMVmlldyA9IGNvbnRleHQubFZpZXchO1xuICAgIG5nRGV2TW9kZSAmJiBhc3NlcnRMVmlldyhjb250ZXh0TFZpZXcpO1xuICAgIGxWaWV3ID0gZ2V0Q29tcG9uZW50TFZpZXdCeUluZGV4KGNvbnRleHQubm9kZUluZGV4LCBjb250ZXh0TFZpZXcpO1xuICB9XG4gIHJldHVybiBsVmlldztcbn1cblxuLyoqXG4gKiBUaGlzIHByb3BlcnR5IHdpbGwgYmUgbW9ua2V5LXBhdGNoZWQgb24gZWxlbWVudHMsIGNvbXBvbmVudHMgYW5kIGRpcmVjdGl2ZXMuXG4gKi9cbmNvbnN0IE1PTktFWV9QQVRDSF9LRVlfTkFNRSA9ICdfX25nQ29udGV4dF9fJztcblxuLyoqXG4gKiBBc3NpZ25zIHRoZSBnaXZlbiBkYXRhIHRvIHRoZSBnaXZlbiB0YXJnZXQgKHdoaWNoIGNvdWxkIGJlIGEgY29tcG9uZW50LFxuICogZGlyZWN0aXZlIG9yIERPTSBub2RlIGluc3RhbmNlKSB1c2luZyBtb25rZXktcGF0Y2hpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhdHRhY2hQYXRjaERhdGEodGFyZ2V0OiBhbnksIGRhdGE6IExWaWV3fExDb250ZXh0KSB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnREZWZpbmVkKHRhcmdldCwgJ1RhcmdldCBleHBlY3RlZCcpO1xuICAvLyBPbmx5IGF0dGFjaCB0aGUgSUQgb2YgdGhlIHZpZXcgaW4gb3JkZXIgdG8gYXZvaWQgbWVtb3J5IGxlYWtzIChzZWUgIzQxMDQ3KS4gV2Ugb25seSBkbyB0aGlzXG4gIC8vIGZvciBgTFZpZXdgLCBiZWNhdXNlIHdlIGhhdmUgY29udHJvbCBvdmVyIHdoZW4gYW4gYExWaWV3YCBpcyBjcmVhdGVkIGFuZCBkZXN0cm95ZWQsIHdoZXJlYXNcbiAgLy8gd2UgY2FuJ3Qga25vdyB3aGVuIHRvIHJlbW92ZSBhbiBgTENvbnRleHRgLlxuICBpZiAoaXNMVmlldyhkYXRhKSkge1xuICAgIHRhcmdldFtNT05LRVlfUEFUQ0hfS0VZX05BTUVdID0gZGF0YVtJRF07XG4gICAgcmVnaXN0ZXJMVmlldyhkYXRhKTtcbiAgfSBlbHNlIHtcbiAgICB0YXJnZXRbTU9OS0VZX1BBVENIX0tFWV9OQU1FXSA9IGRhdGE7XG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtb25rZXktcGF0Y2ggdmFsdWUgZGF0YSBwcmVzZW50IG9uIHRoZSB0YXJnZXQgKHdoaWNoIGNvdWxkIGJlXG4gKiBhIGNvbXBvbmVudCwgZGlyZWN0aXZlIG9yIGEgRE9NIG5vZGUpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVhZFBhdGNoZWREYXRhKHRhcmdldDogYW55KTogTFZpZXd8TENvbnRleHR8bnVsbCB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnREZWZpbmVkKHRhcmdldCwgJ1RhcmdldCBleHBlY3RlZCcpO1xuICBjb25zdCBkYXRhID0gdGFyZ2V0W01PTktFWV9QQVRDSF9LRVlfTkFNRV07XG4gIHJldHVybiAodHlwZW9mIGRhdGEgPT09ICdudW1iZXInKSA/IGdldExWaWV3QnlJZChkYXRhKSA6IGRhdGEgfHwgbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlYWRQYXRjaGVkTFZpZXc8VD4odGFyZ2V0OiBhbnkpOiBMVmlldzxUPnxudWxsIHtcbiAgY29uc3QgdmFsdWUgPSByZWFkUGF0Y2hlZERhdGEodGFyZ2V0KTtcbiAgaWYgKHZhbHVlKSB7XG4gICAgcmV0dXJuIChpc0xWaWV3KHZhbHVlKSA/IHZhbHVlIDogdmFsdWUubFZpZXcpIGFzIExWaWV3PFQ+O1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDb21wb25lbnRJbnN0YW5jZShpbnN0YW5jZTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBpbnN0YW5jZSAmJiBpbnN0YW5jZS5jb25zdHJ1Y3RvciAmJiBpbnN0YW5jZS5jb25zdHJ1Y3Rvci7JtWNtcDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGlyZWN0aXZlSW5zdGFuY2UoaW5zdGFuY2U6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gaW5zdGFuY2UgJiYgaW5zdGFuY2UuY29uc3RydWN0b3IgJiYgaW5zdGFuY2UuY29uc3RydWN0b3IuybVkaXI7XG59XG5cbi8qKlxuICogTG9jYXRlcyB0aGUgZWxlbWVudCB3aXRoaW4gdGhlIGdpdmVuIExWaWV3IGFuZCByZXR1cm5zIHRoZSBtYXRjaGluZyBpbmRleFxuICovXG5mdW5jdGlvbiBmaW5kVmlhTmF0aXZlRWxlbWVudChsVmlldzogTFZpZXcsIHRhcmdldDogUkVsZW1lbnQpOiBudW1iZXIge1xuICBjb25zdCB0VmlldyA9IGxWaWV3W1RWSUVXXTtcbiAgZm9yIChsZXQgaSA9IEhFQURFUl9PRkZTRVQ7IGkgPCB0Vmlldy5iaW5kaW5nU3RhcnRJbmRleDsgaSsrKSB7XG4gICAgaWYgKHVud3JhcFJOb2RlKGxWaWV3W2ldKSA9PT0gdGFyZ2V0KSB7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gLTE7XG59XG5cbi8qKlxuICogTG9jYXRlcyB0aGUgbmV4dCB0Tm9kZSAoY2hpbGQsIHNpYmxpbmcgb3IgcGFyZW50KS5cbiAqL1xuZnVuY3Rpb24gdHJhdmVyc2VOZXh0RWxlbWVudCh0Tm9kZTogVE5vZGUpOiBUTm9kZXxudWxsIHtcbiAgaWYgKHROb2RlLmNoaWxkKSB7XG4gICAgcmV0dXJuIHROb2RlLmNoaWxkO1xuICB9IGVsc2UgaWYgKHROb2RlLm5leHQpIHtcbiAgICByZXR1cm4gdE5vZGUubmV4dDtcbiAgfSBlbHNlIHtcbiAgICAvLyBMZXQncyB0YWtlIHRoZSBmb2xsb3dpbmcgdGVtcGxhdGU6IDxkaXY+PHNwYW4+dGV4dDwvc3Bhbj48L2Rpdj48Y29tcG9uZW50Lz5cbiAgICAvLyBBZnRlciBjaGVja2luZyB0aGUgdGV4dCBub2RlLCB3ZSBuZWVkIHRvIGZpbmQgdGhlIG5leHQgcGFyZW50IHRoYXQgaGFzIGEgXCJuZXh0XCIgVE5vZGUsXG4gICAgLy8gaW4gdGhpcyBjYXNlIHRoZSBwYXJlbnQgYGRpdmAsIHNvIHRoYXQgd2UgY2FuIGZpbmQgdGhlIGNvbXBvbmVudC5cbiAgICB3aGlsZSAodE5vZGUucGFyZW50ICYmICF0Tm9kZS5wYXJlbnQubmV4dCkge1xuICAgICAgdE5vZGUgPSB0Tm9kZS5wYXJlbnQ7XG4gICAgfVxuICAgIHJldHVybiB0Tm9kZS5wYXJlbnQgJiYgdE5vZGUucGFyZW50Lm5leHQ7XG4gIH1cbn1cblxuLyoqXG4gKiBMb2NhdGVzIHRoZSBjb21wb25lbnQgd2l0aGluIHRoZSBnaXZlbiBMVmlldyBhbmQgcmV0dXJucyB0aGUgbWF0Y2hpbmcgaW5kZXhcbiAqL1xuZnVuY3Rpb24gZmluZFZpYUNvbXBvbmVudChsVmlldzogTFZpZXcsIGNvbXBvbmVudEluc3RhbmNlOiB7fSk6IG51bWJlciB7XG4gIGNvbnN0IGNvbXBvbmVudEluZGljZXMgPSBsVmlld1tUVklFV10uY29tcG9uZW50cztcbiAgaWYgKGNvbXBvbmVudEluZGljZXMpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbXBvbmVudEluZGljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGVsZW1lbnRDb21wb25lbnRJbmRleCA9IGNvbXBvbmVudEluZGljZXNbaV07XG4gICAgICBjb25zdCBjb21wb25lbnRWaWV3ID0gZ2V0Q29tcG9uZW50TFZpZXdCeUluZGV4KGVsZW1lbnRDb21wb25lbnRJbmRleCwgbFZpZXcpO1xuICAgICAgaWYgKGNvbXBvbmVudFZpZXdbQ09OVEVYVF0gPT09IGNvbXBvbmVudEluc3RhbmNlKSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50Q29tcG9uZW50SW5kZXg7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IHJvb3RDb21wb25lbnRWaWV3ID0gZ2V0Q29tcG9uZW50TFZpZXdCeUluZGV4KEhFQURFUl9PRkZTRVQsIGxWaWV3KTtcbiAgICBjb25zdCByb290Q29tcG9uZW50ID0gcm9vdENvbXBvbmVudFZpZXdbQ09OVEVYVF07XG4gICAgaWYgKHJvb3RDb21wb25lbnQgPT09IGNvbXBvbmVudEluc3RhbmNlKSB7XG4gICAgICAvLyB3ZSBhcmUgZGVhbGluZyB3aXRoIHRoZSByb290IGVsZW1lbnQgaGVyZSB0aGVyZWZvcmUgd2Uga25vdyB0aGF0IHRoZVxuICAgICAgLy8gZWxlbWVudCBpcyB0aGUgdmVyeSBmaXJzdCBlbGVtZW50IGFmdGVyIHRoZSBIRUFERVIgZGF0YSBpbiB0aGUgbFZpZXdcbiAgICAgIHJldHVybiBIRUFERVJfT0ZGU0VUO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbi8qKlxuICogTG9jYXRlcyB0aGUgZGlyZWN0aXZlIHdpdGhpbiB0aGUgZ2l2ZW4gTFZpZXcgYW5kIHJldHVybnMgdGhlIG1hdGNoaW5nIGluZGV4XG4gKi9cbmZ1bmN0aW9uIGZpbmRWaWFEaXJlY3RpdmUobFZpZXc6IExWaWV3LCBkaXJlY3RpdmVJbnN0YW5jZToge30pOiBudW1iZXIge1xuICAvLyBpZiBhIGRpcmVjdGl2ZSBpcyBtb25rZXkgcGF0Y2hlZCB0aGVuIGl0IHdpbGwgKGJ5IGRlZmF1bHQpXG4gIC8vIGhhdmUgYSByZWZlcmVuY2UgdG8gdGhlIExWaWV3IG9mIHRoZSBjdXJyZW50IHZpZXcuIFRoZVxuICAvLyBlbGVtZW50IGJvdW5kIHRvIHRoZSBkaXJlY3RpdmUgYmVpbmcgc2VhcmNoIGxpdmVzIHNvbWV3aGVyZVxuICAvLyBpbiB0aGUgdmlldyBkYXRhLiBXZSBsb29wIHRocm91Z2ggdGhlIG5vZGVzIGFuZCBjaGVjayB0aGVpclxuICAvLyBsaXN0IG9mIGRpcmVjdGl2ZXMgZm9yIHRoZSBpbnN0YW5jZS5cbiAgbGV0IHROb2RlID0gbFZpZXdbVFZJRVddLmZpcnN0Q2hpbGQ7XG4gIHdoaWxlICh0Tm9kZSkge1xuICAgIGNvbnN0IGRpcmVjdGl2ZUluZGV4U3RhcnQgPSB0Tm9kZS5kaXJlY3RpdmVTdGFydDtcbiAgICBjb25zdCBkaXJlY3RpdmVJbmRleEVuZCA9IHROb2RlLmRpcmVjdGl2ZUVuZDtcbiAgICBmb3IgKGxldCBpID0gZGlyZWN0aXZlSW5kZXhTdGFydDsgaSA8IGRpcmVjdGl2ZUluZGV4RW5kOyBpKyspIHtcbiAgICAgIGlmIChsVmlld1tpXSA9PT0gZGlyZWN0aXZlSW5zdGFuY2UpIHtcbiAgICAgICAgcmV0dXJuIHROb2RlLmluZGV4O1xuICAgICAgfVxuICAgIH1cbiAgICB0Tm9kZSA9IHRyYXZlcnNlTmV4dEVsZW1lbnQodE5vZGUpO1xuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgbGlzdCBvZiBkaXJlY3RpdmVzIGFwcGxpZWQgdG8gYSBub2RlIGF0IGEgc3BlY2lmaWMgaW5kZXguIFRoZSBsaXN0IGluY2x1ZGVzXG4gKiBkaXJlY3RpdmVzIG1hdGNoZWQgYnkgc2VsZWN0b3IgYW5kIGFueSBob3N0IGRpcmVjdGl2ZXMsIGJ1dCBpdCBleGNsdWRlcyBjb21wb25lbnRzLlxuICogVXNlIGBnZXRDb21wb25lbnRBdE5vZGVJbmRleGAgdG8gZmluZCB0aGUgY29tcG9uZW50IGFwcGxpZWQgdG8gYSBub2RlLlxuICpcbiAqIEBwYXJhbSBub2RlSW5kZXggVGhlIG5vZGUgaW5kZXhcbiAqIEBwYXJhbSBsVmlldyBUaGUgdGFyZ2V0IHZpZXcgZGF0YVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGlyZWN0aXZlc0F0Tm9kZUluZGV4KG5vZGVJbmRleDogbnVtYmVyLCBsVmlldzogTFZpZXcpOiBhbnlbXXxudWxsIHtcbiAgY29uc3QgdE5vZGUgPSBsVmlld1tUVklFV10uZGF0YVtub2RlSW5kZXhdIGFzIFROb2RlO1xuICBpZiAodE5vZGUuZGlyZWN0aXZlU3RhcnQgPT09IDApIHJldHVybiBFTVBUWV9BUlJBWTtcbiAgY29uc3QgcmVzdWx0czogYW55W10gPSBbXTtcbiAgZm9yIChsZXQgaSA9IHROb2RlLmRpcmVjdGl2ZVN0YXJ0OyBpIDwgdE5vZGUuZGlyZWN0aXZlRW5kOyBpKyspIHtcbiAgICBjb25zdCBkaXJlY3RpdmVJbnN0YW5jZSA9IGxWaWV3W2ldO1xuICAgIGlmICghaXNDb21wb25lbnRJbnN0YW5jZShkaXJlY3RpdmVJbnN0YW5jZSkpIHtcbiAgICAgIHJlc3VsdHMucHVzaChkaXJlY3RpdmVJbnN0YW5jZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHRzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tcG9uZW50QXROb2RlSW5kZXgobm9kZUluZGV4OiBudW1iZXIsIGxWaWV3OiBMVmlldyk6IHt9fG51bGwge1xuICBjb25zdCB0Tm9kZSA9IGxWaWV3W1RWSUVXXS5kYXRhW25vZGVJbmRleF0gYXMgVE5vZGU7XG4gIGNvbnN0IHtkaXJlY3RpdmVTdGFydCwgY29tcG9uZW50T2Zmc2V0fSA9IHROb2RlO1xuICByZXR1cm4gY29tcG9uZW50T2Zmc2V0ID4gLTEgPyBsVmlld1tkaXJlY3RpdmVTdGFydCArIGNvbXBvbmVudE9mZnNldF0gOiBudWxsO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBtYXAgb2YgbG9jYWwgcmVmZXJlbmNlcyAobG9jYWwgcmVmZXJlbmNlIG5hbWUgPT4gZWxlbWVudCBvciBkaXJlY3RpdmUgaW5zdGFuY2UpIHRoYXRcbiAqIGV4aXN0IG9uIGEgZ2l2ZW4gZWxlbWVudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc2NvdmVyTG9jYWxSZWZzKGxWaWV3OiBMVmlldywgbm9kZUluZGV4OiBudW1iZXIpOiB7W2tleTogc3RyaW5nXTogYW55fXxudWxsIHtcbiAgY29uc3QgdE5vZGUgPSBsVmlld1tUVklFV10uZGF0YVtub2RlSW5kZXhdIGFzIFROb2RlO1xuICBpZiAodE5vZGUgJiYgdE5vZGUubG9jYWxOYW1lcykge1xuICAgIGNvbnN0IHJlc3VsdDoge1trZXk6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICBsZXQgbG9jYWxJbmRleCA9IHROb2RlLmluZGV4ICsgMTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHROb2RlLmxvY2FsTmFtZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgIHJlc3VsdFt0Tm9kZS5sb2NhbE5hbWVzW2ldXSA9IGxWaWV3W2xvY2FsSW5kZXhdO1xuICAgICAgbG9jYWxJbmRleCsrO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG4iXX0=