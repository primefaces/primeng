/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy } from '../../change_detection/constants';
import { Injector } from '../../di/injector';
import { assertLView } from '../assert';
import { discoverLocalRefs, getComponentAtNodeIndex, getDirectivesAtNodeIndex, getLContext, readPatchedLView } from '../context_discovery';
import { getComponentDef, getDirectiveDef } from '../definition';
import { NodeInjector } from '../di';
import { CLEANUP, CONTEXT, FLAGS, TVIEW } from '../interfaces/view';
import { getRootContext } from './view_traversal_utils';
import { getLViewParent, unwrapRNode } from './view_utils';
/**
 * Retrieves the component instance associated with a given DOM element.
 *
 * @usageNotes
 * Given the following DOM structure:
 *
 * ```html
 * <app-root>
 *   <div>
 *     <child-comp></child-comp>
 *   </div>
 * </app-root>
 * ```
 *
 * Calling `getComponent` on `<child-comp>` will return the instance of `ChildComponent`
 * associated with this DOM element.
 *
 * Calling the function on `<app-root>` will return the `MyApp` instance.
 *
 *
 * @param element DOM element from which the component should be retrieved.
 * @returns Component instance associated with the element or `null` if there
 *    is no component associated with it.
 *
 * @publicApi
 * @globalApi ng
 */
export function getComponent(element) {
    ngDevMode && assertDomElement(element);
    const context = getLContext(element);
    if (context === null)
        return null;
    if (context.component === undefined) {
        const lView = context.lView;
        if (lView === null) {
            return null;
        }
        context.component = getComponentAtNodeIndex(context.nodeIndex, lView);
    }
    return context.component;
}
/**
 * If inside an embedded view (e.g. `*ngIf` or `*ngFor`), retrieves the context of the embedded
 * view that the element is part of. Otherwise retrieves the instance of the component whose view
 * owns the element (in this case, the result is the same as calling `getOwningComponent`).
 *
 * @param element Element for which to get the surrounding component instance.
 * @returns Instance of the component that is around the element or null if the element isn't
 *    inside any component.
 *
 * @publicApi
 * @globalApi ng
 */
export function getContext(element) {
    assertDomElement(element);
    const context = getLContext(element);
    const lView = context ? context.lView : null;
    return lView === null ? null : lView[CONTEXT];
}
/**
 * Retrieves the component instance whose view contains the DOM element.
 *
 * For example, if `<child-comp>` is used in the template of `<app-comp>`
 * (i.e. a `ViewChild` of `<app-comp>`), calling `getOwningComponent` on `<child-comp>`
 * would return `<app-comp>`.
 *
 * @param elementOrDir DOM element, component or directive instance
 *    for which to retrieve the root components.
 * @returns Component instance whose view owns the DOM element or null if the element is not
 *    part of a component view.
 *
 * @publicApi
 * @globalApi ng
 */
export function getOwningComponent(elementOrDir) {
    const context = getLContext(elementOrDir);
    let lView = context ? context.lView : null;
    if (lView === null)
        return null;
    let parent;
    while (lView[TVIEW].type === 2 /* TViewType.Embedded */ && (parent = getLViewParent(lView))) {
        lView = parent;
    }
    return lView[FLAGS] & 512 /* LViewFlags.IsRoot */ ? null : lView[CONTEXT];
}
/**
 * Retrieves all root components associated with a DOM element, directive or component instance.
 * Root components are those which have been bootstrapped by Angular.
 *
 * @param elementOrDir DOM element, component or directive instance
 *    for which to retrieve the root components.
 * @returns Root components associated with the target object.
 *
 * @publicApi
 * @globalApi ng
 */
export function getRootComponents(elementOrDir) {
    const lView = readPatchedLView(elementOrDir);
    return lView !== null ? [getRootContext(lView)] : [];
}
/**
 * Retrieves an `Injector` associated with an element, component or directive instance.
 *
 * @param elementOrDir DOM element, component or directive instance for which to
 *    retrieve the injector.
 * @returns Injector associated with the element, component or directive instance.
 *
 * @publicApi
 * @globalApi ng
 */
export function getInjector(elementOrDir) {
    const context = getLContext(elementOrDir);
    const lView = context ? context.lView : null;
    if (lView === null)
        return Injector.NULL;
    const tNode = lView[TVIEW].data[context.nodeIndex];
    return new NodeInjector(tNode, lView);
}
/**
 * Retrieve a set of injection tokens at a given DOM node.
 *
 * @param element Element for which the injection tokens should be retrieved.
 */
export function getInjectionTokens(element) {
    const context = getLContext(element);
    const lView = context ? context.lView : null;
    if (lView === null)
        return [];
    const tView = lView[TVIEW];
    const tNode = tView.data[context.nodeIndex];
    const providerTokens = [];
    const startIndex = tNode.providerIndexes & 1048575 /* TNodeProviderIndexes.ProvidersStartIndexMask */;
    const endIndex = tNode.directiveEnd;
    for (let i = startIndex; i < endIndex; i++) {
        let value = tView.data[i];
        if (isDirectiveDefHack(value)) {
            // The fact that we sometimes store Type and sometimes DirectiveDef in this location is a
            // design flaw.  We should always store same type so that we can be monomorphic. The issue
            // is that for Components/Directives we store the def instead the type. The correct behavior
            // is that we should always be storing injectable type in this location.
            value = value.type;
        }
        providerTokens.push(value);
    }
    return providerTokens;
}
/**
 * Retrieves directive instances associated with a given DOM node. Does not include
 * component instances.
 *
 * @usageNotes
 * Given the following DOM structure:
 *
 * ```html
 * <app-root>
 *   <button my-button></button>
 *   <my-comp></my-comp>
 * </app-root>
 * ```
 *
 * Calling `getDirectives` on `<button>` will return an array with an instance of the `MyButton`
 * directive that is associated with the DOM node.
 *
 * Calling `getDirectives` on `<my-comp>` will return an empty array.
 *
 * @param node DOM node for which to get the directives.
 * @returns Array of directives associated with the node.
 *
 * @publicApi
 * @globalApi ng
 */
export function getDirectives(node) {
    // Skip text nodes because we can't have directives associated with them.
    if (node instanceof Text) {
        return [];
    }
    const context = getLContext(node);
    const lView = context ? context.lView : null;
    if (lView === null) {
        return [];
    }
    const tView = lView[TVIEW];
    const nodeIndex = context.nodeIndex;
    if (!tView?.data[nodeIndex]) {
        return [];
    }
    if (context.directives === undefined) {
        context.directives = getDirectivesAtNodeIndex(nodeIndex, lView);
    }
    // The `directives` in this case are a named array called `LComponentView`. Clone the
    // result so we don't expose an internal data structure in the user's console.
    return context.directives === null ? [] : [...context.directives];
}
/**
 * Returns the debug (partial) metadata for a particular directive or component instance.
 * The function accepts an instance of a directive or component and returns the corresponding
 * metadata.
 *
 * @param directiveOrComponentInstance Instance of a directive or component
 * @returns metadata of the passed directive or component
 *
 * @publicApi
 * @globalApi ng
 */
export function getDirectiveMetadata(directiveOrComponentInstance) {
    const { constructor } = directiveOrComponentInstance;
    if (!constructor) {
        throw new Error('Unable to find the instance constructor');
    }
    // In case a component inherits from a directive, we may have component and directive metadata
    // To ensure we don't get the metadata of the directive, we want to call `getComponentDef` first.
    const componentDef = getComponentDef(constructor);
    if (componentDef) {
        const inputs = extractInputDebugMetadata(componentDef.inputs);
        return {
            inputs,
            outputs: componentDef.outputs,
            encapsulation: componentDef.encapsulation,
            changeDetection: componentDef.onPush ? ChangeDetectionStrategy.OnPush :
                ChangeDetectionStrategy.Default
        };
    }
    const directiveDef = getDirectiveDef(constructor);
    if (directiveDef) {
        const inputs = extractInputDebugMetadata(directiveDef.inputs);
        return { inputs, outputs: directiveDef.outputs };
    }
    return null;
}
/**
 * Retrieve map of local references.
 *
 * The references are retrieved as a map of local reference name to element or directive instance.
 *
 * @param target DOM element, component or directive instance for which to retrieve
 *    the local references.
 */
export function getLocalRefs(target) {
    const context = getLContext(target);
    if (context === null)
        return {};
    if (context.localRefs === undefined) {
        const lView = context.lView;
        if (lView === null) {
            return {};
        }
        context.localRefs = discoverLocalRefs(lView, context.nodeIndex);
    }
    return context.localRefs || {};
}
/**
 * Retrieves the host element of a component or directive instance.
 * The host element is the DOM element that matched the selector of the directive.
 *
 * @param componentOrDirective Component or directive instance for which the host
 *     element should be retrieved.
 * @returns Host element of the target.
 *
 * @publicApi
 * @globalApi ng
 */
export function getHostElement(componentOrDirective) {
    return getLContext(componentOrDirective).native;
}
/**
 * Retrieves the rendered text for a given component.
 *
 * This function retrieves the host element of a component and
 * and then returns the `textContent` for that element. This implies
 * that the text returned will include re-projected content of
 * the component as well.
 *
 * @param component The component to return the content text for.
 */
export function getRenderedText(component) {
    const hostElement = getHostElement(component);
    return hostElement.textContent || '';
}
/**
 * Retrieves a list of event listeners associated with a DOM element. The list does include host
 * listeners, but it does not include event listeners defined outside of the Angular context
 * (e.g. through `addEventListener`).
 *
 * @usageNotes
 * Given the following DOM structure:
 *
 * ```html
 * <app-root>
 *   <div (click)="doSomething()"></div>
 * </app-root>
 * ```
 *
 * Calling `getListeners` on `<div>` will return an object that looks as follows:
 *
 * ```ts
 * {
 *   name: 'click',
 *   element: <div>,
 *   callback: () => doSomething(),
 *   useCapture: false
 * }
 * ```
 *
 * @param element Element for which the DOM listeners should be retrieved.
 * @returns Array of event listeners on the DOM element.
 *
 * @publicApi
 * @globalApi ng
 */
export function getListeners(element) {
    ngDevMode && assertDomElement(element);
    const lContext = getLContext(element);
    const lView = lContext === null ? null : lContext.lView;
    if (lView === null)
        return [];
    const tView = lView[TVIEW];
    const lCleanup = lView[CLEANUP];
    const tCleanup = tView.cleanup;
    const listeners = [];
    if (tCleanup && lCleanup) {
        for (let i = 0; i < tCleanup.length;) {
            const firstParam = tCleanup[i++];
            const secondParam = tCleanup[i++];
            if (typeof firstParam === 'string') {
                const name = firstParam;
                const listenerElement = unwrapRNode(lView[secondParam]);
                const callback = lCleanup[tCleanup[i++]];
                const useCaptureOrIndx = tCleanup[i++];
                // if useCaptureOrIndx is boolean then report it as is.
                // if useCaptureOrIndx is positive number then it in unsubscribe method
                // if useCaptureOrIndx is negative number then it is a Subscription
                const type = (typeof useCaptureOrIndx === 'boolean' || useCaptureOrIndx >= 0) ? 'dom' : 'output';
                const useCapture = typeof useCaptureOrIndx === 'boolean' ? useCaptureOrIndx : false;
                if (element == listenerElement) {
                    listeners.push({ element, name, callback, useCapture, type });
                }
            }
        }
    }
    listeners.sort(sortListeners);
    return listeners;
}
function sortListeners(a, b) {
    if (a.name == b.name)
        return 0;
    return a.name < b.name ? -1 : 1;
}
/**
 * This function should not exist because it is megamorphic and only mostly correct.
 *
 * See call site for more info.
 */
function isDirectiveDefHack(obj) {
    return obj.type !== undefined && obj.declaredInputs !== undefined &&
        obj.findHostDirectiveDefs !== undefined;
}
/**
 * Retrieve the component `LView` from component/element.
 *
 * NOTE: `LView` is a private and should not be leaked outside.
 *       Don't export this method to `ng.*` on window.
 *
 * @param target DOM element or component instance for which to retrieve the LView.
 */
export function getComponentLView(target) {
    const lContext = getLContext(target);
    const nodeIndx = lContext.nodeIndex;
    const lView = lContext.lView;
    ngDevMode && assertLView(lView);
    const componentLView = lView[nodeIndx];
    ngDevMode && assertLView(componentLView);
    return componentLView;
}
/** Asserts that a value is a DOM Element. */
function assertDomElement(value) {
    if (typeof Element !== 'undefined' && !(value instanceof Element)) {
        throw new Error('Expecting instance of DOM Element');
    }
}
/**
 * A directive definition holds additional metadata using bitwise flags to indicate
 * for example whether it is signal based.
 *
 * This information needs to be separate from the `publicName -> minifiedName`
 * mappings for backwards compatibility.
 */
function extractInputDebugMetadata(inputs) {
    const res = {};
    for (const key in inputs) {
        if (!inputs.hasOwnProperty(key)) {
            continue;
        }
        const value = inputs[key];
        if (value === undefined) {
            continue;
        }
        let minifiedName;
        if (Array.isArray(value)) {
            minifiedName = value[0];
            // flags are not used for now.
            // TODO: Consider exposing flag information in discovery.
        }
        else {
            minifiedName = value;
        }
        res[key] = minifiedName;
    }
    return res;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY292ZXJ5X3V0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy91dGlsL2Rpc2NvdmVyeV91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUN6RSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFM0MsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQUUsd0JBQXdCLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDekksT0FBTyxFQUFDLGVBQWUsRUFBRSxlQUFlLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE9BQU8sQ0FBQztBQUduQyxPQUFPLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQXFCLEtBQUssRUFBWSxNQUFNLG9CQUFvQixDQUFDO0FBRWhHLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUMsY0FBYyxFQUFFLFdBQVcsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUl6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLFVBQVUsWUFBWSxDQUFJLE9BQWdCO0lBQzlDLFNBQVMsSUFBSSxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QyxNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckMsSUFBSSxPQUFPLEtBQUssSUFBSTtRQUFFLE9BQU8sSUFBSSxDQUFDO0lBRWxDLElBQUksT0FBTyxDQUFDLFNBQVMsS0FBSyxTQUFT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QyxDQUFDO1FBQzFCLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ3hCLFNBQVM7UUFDWCxDQUFDO1FBRUQsSUFBSSxZQUFvQixDQUFDO1FBRXpCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3pCLFlBQVksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsOEJBQThCO1lBQzlCLHlEQUF5RDtRQUMzRCxDQUFDO2FBQU0sQ0FBQztZQUNOLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDdkIsQ0FBQztRQUVELEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUM7SUFDMUIsQ0FBQztJQUVELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICcuLi8uLi9jaGFuZ2VfZGV0ZWN0aW9uL2NvbnN0YW50cyc7XG5pbXBvcnQge0luamVjdG9yfSBmcm9tICcuLi8uLi9kaS9pbmplY3Rvcic7XG5pbXBvcnQge1ZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICcuLi8uLi9tZXRhZGF0YS92aWV3JztcbmltcG9ydCB7YXNzZXJ0TFZpZXd9IGZyb20gJy4uL2Fzc2VydCc7XG5pbXBvcnQge2Rpc2NvdmVyTG9jYWxSZWZzLCBnZXRDb21wb25lbnRBdE5vZGVJbmRleCwgZ2V0RGlyZWN0aXZlc0F0Tm9kZUluZGV4LCBnZXRMQ29udGV4dCwgcmVhZFBhdGNoZWRMVmlld30gZnJvbSAnLi4vY29udGV4dF9kaXNjb3ZlcnknO1xuaW1wb3J0IHtnZXRDb21wb25lbnREZWYsIGdldERpcmVjdGl2ZURlZn0gZnJvbSAnLi4vZGVmaW5pdGlvbic7XG5pbXBvcnQge05vZGVJbmplY3Rvcn0gZnJvbSAnLi4vZGknO1xuaW1wb3J0IHtEaXJlY3RpdmVEZWZ9IGZyb20gJy4uL2ludGVyZmFjZXMvZGVmaW5pdGlvbic7XG5pbXBvcnQge1RFbGVtZW50Tm9kZSwgVE5vZGUsIFROb2RlUHJvdmlkZXJJbmRleGVzfSBmcm9tICcuLi9pbnRlcmZhY2VzL25vZGUnO1xuaW1wb3J0IHtDTEVBTlVQLCBDT05URVhULCBGTEFHUywgTFZpZXcsIExWaWV3RmxhZ3MsIFRWSUVXLCBUVmlld1R5cGV9IGZyb20gJy4uL2ludGVyZmFjZXMvdmlldyc7XG5cbmltcG9ydCB7Z2V0Um9vdENvbnRleHR9IGZyb20gJy4vdmlld190cmF2ZXJzYWxfdXRpbHMnO1xuaW1wb3J0IHtnZXRMVmlld1BhcmVudCwgdW53cmFwUk5vZGV9IGZyb20gJy4vdmlld191dGlscyc7XG5cblxuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgY29tcG9uZW50IGluc3RhbmNlIGFzc29jaWF0ZWQgd2l0aCBhIGdpdmVuIERPTSBlbGVtZW50LlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKiBHaXZlbiB0aGUgZm9sbG93aW5nIERPTSBzdHJ1Y3R1cmU6XG4gKlxuICogYGBgaHRtbFxuICogPGFwcC1yb290PlxuICogICA8ZGl2PlxuICogICAgIDxjaGlsZC1jb21wPjwvY2hpbGQtY29tcD5cbiAqICAgPC9kaXY+XG4gKiA8L2FwcC1yb290PlxuICogYGBgXG4gKlxuICogQ2FsbGluZyBgZ2V0Q29tcG9uZW50YCBvbiBgPGNoaWxkLWNvbXA+YCB3aWxsIHJldHVybiB0aGUgaW5zdGFuY2Ugb2YgYENoaWxkQ29tcG9uZW50YFxuICogYXNzb2NpYXRlZCB3aXRoIHRoaXMgRE9NIGVsZW1lbnQuXG4gKlxuICogQ2FsbGluZyB0aGUgZnVuY3Rpb24gb24gYDxhcHAtcm9vdD5gIHdpbGwgcmV0dXJuIHRoZSBgTXlBcHBgIGluc3RhbmNlLlxuICpcbiAqXG4gKiBAcGFyYW0gZWxlbWVudCBET00gZWxlbWVudCBmcm9tIHdoaWNoIHRoZSBjb21wb25lbnQgc2hvdWxkIGJlIHJldHJpZXZlZC5cbiAqIEByZXR1cm5zIENvbXBvbmVudCBpbnN0YW5jZSBhc3NvY2lhdGVkIHdpdGggdGhlIGVsZW1lbnQgb3IgYG51bGxgIGlmIHRoZXJlXG4gKiAgICBpcyBubyBjb21wb25lbnQgYXNzb2NpYXRlZCB3aXRoIGl0LlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqIEBnbG9iYWxBcGkgbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENvbXBvbmVudDxUPihlbGVtZW50OiBFbGVtZW50KTogVHxudWxsIHtcbiAgbmdEZXZNb2RlICYmIGFzc2VydERvbUVsZW1lbnQoZWxlbWVudCk7XG4gIGNvbnN0IGNvbnRleHQgPSBnZXRMQ29udGV4dChlbGVtZW50KTtcbiAgaWYgKGNvbnRleHQgPT09IG51bGwpIHJldHVybiBudWxsO1xuXG4gIGlmIChjb250ZXh0LmNvbXBvbmVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgbFZpZXcgPSBjb250ZXh0LmxWaWV3O1xuICAgIGlmIChsVmlldyA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnRleHQuY29tcG9uZW50ID0gZ2V0Q29tcG9uZW50QXROb2RlSW5kZXgoY29udGV4dC5ub2RlSW5kZXgsIGxWaWV3KTtcbiAgfVxuXG4gIHJldHVybiBjb250ZXh0LmNvbXBvbmVudCBhcyB1bmtub3duIGFzIFQ7XG59XG5cblxuLyoqXG4gKiBJZiBpbnNpZGUgYW4gZW1iZWRkZWQgdmlldyAoZS5nLiBgKm5nSWZgIG9yIGAqbmdGb3JgKSwgcmV0cmlldmVzIHRoZSBjb250ZXh0IG9mIHRoZSBlbWJlZGRlZFxuICogdmlldyB0aGF0IHRoZSBlbGVtZW50IGlzIHBhcnQgb2YuIE90aGVyd2lzZSByZXRyaWV2ZXMgdGhlIGluc3RhbmNlIG9mIHRoZSBjb21wb25lbnQgd2hvc2Ugdmlld1xuICogb3ducyB0aGUgZWxlbWVudCAoaW4gdGhpcyBjYXNlLCB0aGUgcmVzdWx0IGlzIHRoZSBzYW1lIGFzIGNhbGxpbmcgYGdldE93bmluZ0NvbXBvbmVudGApLlxuICpcbiAqIEBwYXJhbSBlbGVtZW50IEVsZW1lbnQgZm9yIHdoaWNoIHRvIGdldCB0aGUgc3Vycm91bmRpbmcgY29tcG9uZW50IGluc3RhbmNlLlxuICogQHJldHVybnMgSW5zdGFuY2Ugb2YgdGhlIGNvbXBvbmVudCB0aGF0IGlzIGFyb3VuZCB0aGUgZWxlbWVudCBvciBudWxsIGlmIHRoZSBlbGVtZW50IGlzbid0XG4gKiAgICBpbnNpZGUgYW55IGNvbXBvbmVudC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKiBAZ2xvYmFsQXBpIG5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb250ZXh0PFQgZXh0ZW5kcyB7fT4oZWxlbWVudDogRWxlbWVudCk6IFR8bnVsbCB7XG4gIGFzc2VydERvbUVsZW1lbnQoZWxlbWVudCk7XG4gIGNvbnN0IGNvbnRleHQgPSBnZXRMQ29udGV4dChlbGVtZW50KSE7XG4gIGNvbnN0IGxWaWV3ID0gY29udGV4dCA/IGNvbnRleHQubFZpZXcgOiBudWxsO1xuICByZXR1cm4gbFZpZXcgPT09IG51bGwgPyBudWxsIDogbFZpZXdbQ09OVEVYVF0gYXMgVDtcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZXMgdGhlIGNvbXBvbmVudCBpbnN0YW5jZSB3aG9zZSB2aWV3IGNvbnRhaW5zIHRoZSBET00gZWxlbWVudC5cbiAqXG4gKiBGb3IgZXhhbXBsZSwgaWYgYDxjaGlsZC1jb21wPmAgaXMgdXNlZCBpbiB0aGUgdGVtcGxhdGUgb2YgYDxhcHAtY29tcD5gXG4gKiAoaS5lLiBhIGBWaWV3Q2hpbGRgIG9mIGA8YXBwLWNvbXA+YCksIGNhbGxpbmcgYGdldE93bmluZ0NvbXBvbmVudGAgb24gYDxjaGlsZC1jb21wPmBcbiAqIHdvdWxkIHJldHVybiBgPGFwcC1jb21wPmAuXG4gKlxuICogQHBhcmFtIGVsZW1lbnRPckRpciBET00gZWxlbWVudCwgY29tcG9uZW50IG9yIGRpcmVjdGl2ZSBpbnN0YW5jZVxuICogICAgZm9yIHdoaWNoIHRvIHJldHJpZXZlIHRoZSByb290IGNvbXBvbmVudHMuXG4gKiBAcmV0dXJucyBDb21wb25lbnQgaW5zdGFuY2Ugd2hvc2UgdmlldyBvd25zIHRoZSBET00gZWxlbWVudCBvciBudWxsIGlmIHRoZSBlbGVtZW50IGlzIG5vdFxuICogICAgcGFydCBvZiBhIGNvbXBvbmVudCB2aWV3LlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqIEBnbG9iYWxBcGkgbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE93bmluZ0NvbXBvbmVudDxUPihlbGVtZW50T3JEaXI6IEVsZW1lbnR8e30pOiBUfG51bGwge1xuICBjb25zdCBjb250ZXh0ID0gZ2V0TENvbnRleHQoZWxlbWVudE9yRGlyKSE7XG4gIGxldCBsVmlldyA9IGNvbnRleHQgPyBjb250ZXh0LmxWaWV3IDogbnVsbDtcbiAgaWYgKGxWaWV3ID09PSBudWxsKSByZXR1cm4gbnVsbDtcblxuICBsZXQgcGFyZW50OiBMVmlld3xudWxsO1xuICB3aGlsZSAobFZpZXdbVFZJRVddLnR5cGUgPT09IFRWaWV3VHlwZS5FbWJlZGRlZCAmJiAocGFyZW50ID0gZ2V0TFZpZXdQYXJlbnQobFZpZXcpISkpIHtcbiAgICBsVmlldyA9IHBhcmVudDtcbiAgfVxuICByZXR1cm4gbFZpZXdbRkxBR1NdICYgTFZpZXdGbGFncy5Jc1Jvb3QgPyBudWxsIDogbFZpZXdbQ09OVEVYVF0gYXMgdW5rbm93biBhcyBUO1xufVxuXG4vKipcbiAqIFJldHJpZXZlcyBhbGwgcm9vdCBjb21wb25lbnRzIGFzc29jaWF0ZWQgd2l0aCBhIERPTSBlbGVtZW50LCBkaXJlY3RpdmUgb3IgY29tcG9uZW50IGluc3RhbmNlLlxuICogUm9vdCBjb21wb25lbnRzIGFyZSB0aG9zZSB3aGljaCBoYXZlIGJlZW4gYm9vdHN0cmFwcGVkIGJ5IEFuZ3VsYXIuXG4gKlxuICogQHBhcmFtIGVsZW1lbnRPckRpciBET00gZWxlbWVudCwgY29tcG9uZW50IG9yIGRpcmVjdGl2ZSBpbnN0YW5jZVxuICogICAgZm9yIHdoaWNoIHRvIHJldHJpZXZlIHRoZSByb290IGNvbXBvbmVudHMuXG4gKiBAcmV0dXJucyBSb290IGNvbXBvbmVudHMgYXNzb2NpYXRlZCB3aXRoIHRoZSB0YXJnZXQgb2JqZWN0LlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqIEBnbG9iYWxBcGkgbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFJvb3RDb21wb25lbnRzKGVsZW1lbnRPckRpcjogRWxlbWVudHx7fSk6IHt9W10ge1xuICBjb25zdCBsVmlldyA9IHJlYWRQYXRjaGVkTFZpZXc8e30+KGVsZW1lbnRPckRpcik7XG4gIHJldHVybiBsVmlldyAhPT0gbnVsbCA/IFtnZXRSb290Q29udGV4dChsVmlldyldIDogW107XG59XG5cbi8qKlxuICogUmV0cmlldmVzIGFuIGBJbmplY3RvcmAgYXNzb2NpYXRlZCB3aXRoIGFuIGVsZW1lbnQsIGNvbXBvbmVudCBvciBkaXJlY3RpdmUgaW5zdGFuY2UuXG4gKlxuICogQHBhcmFtIGVsZW1lbnRPckRpciBET00gZWxlbWVudCwgY29tcG9uZW50IG9yIGRpcmVjdGl2ZSBpbnN0YW5jZSBmb3Igd2hpY2ggdG9cbiAqICAgIHJldHJpZXZlIHRoZSBpbmplY3Rvci5cbiAqIEByZXR1cm5zIEluamVjdG9yIGFzc29jaWF0ZWQgd2l0aCB0aGUgZWxlbWVudCwgY29tcG9uZW50IG9yIGRpcmVjdGl2ZSBpbnN0YW5jZS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKiBAZ2xvYmFsQXBpIG5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbmplY3RvcihlbGVtZW50T3JEaXI6IEVsZW1lbnR8e30pOiBJbmplY3RvciB7XG4gIGNvbnN0IGNvbnRleHQgPSBnZXRMQ29udGV4dChlbGVtZW50T3JEaXIpITtcbiAgY29uc3QgbFZpZXcgPSBjb250ZXh0ID8gY29udGV4dC5sVmlldyA6IG51bGw7XG4gIGlmIChsVmlldyA9PT0gbnVsbCkgcmV0dXJuIEluamVjdG9yLk5VTEw7XG5cbiAgY29uc3QgdE5vZGUgPSBsVmlld1tUVklFV10uZGF0YVtjb250ZXh0Lm5vZGVJbmRleF0gYXMgVEVsZW1lbnROb2RlO1xuICByZXR1cm4gbmV3IE5vZGVJbmplY3Rvcih0Tm9kZSwgbFZpZXcpO1xufVxuXG4vKipcbiAqIFJldHJpZXZlIGEgc2V0IG9mIGluamVjdGlvbiB0b2tlbnMgYXQgYSBnaXZlbiBET00gbm9kZS5cbiAqXG4gKiBAcGFyYW0gZWxlbWVudCBFbGVtZW50IGZvciB3aGljaCB0aGUgaW5qZWN0aW9uIHRva2VucyBzaG91bGQgYmUgcmV0cmlldmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW5qZWN0aW9uVG9rZW5zKGVsZW1lbnQ6IEVsZW1lbnQpOiBhbnlbXSB7XG4gIGNvbnN0IGNvbnRleHQgPSBnZXRMQ29udGV4dChlbGVtZW50KSE7XG4gIGNvbnN0IGxWaWV3ID0gY29udGV4dCA/IGNvbnRleHQubFZpZXcgOiBudWxsO1xuICBpZiAobFZpZXcgPT09IG51bGwpIHJldHVybiBbXTtcbiAgY29uc3QgdFZpZXcgPSBsVmlld1tUVklFV107XG4gIGNvbnN0IHROb2RlID0gdFZpZXcuZGF0YVtjb250ZXh0Lm5vZGVJbmRleF0gYXMgVE5vZGU7XG4gIGNvbnN0IHByb3ZpZGVyVG9rZW5zOiBhbnlbXSA9IFtdO1xuICBjb25zdCBzdGFydEluZGV4ID0gdE5vZGUucHJvdmlkZXJJbmRleGVzICYgVE5vZGVQcm92aWRlckluZGV4ZXMuUHJvdmlkZXJzU3RhcnRJbmRleE1hc2s7XG4gIGNvbnN0IGVuZEluZGV4ID0gdE5vZGUuZGlyZWN0aXZlRW5kO1xuICBmb3IgKGxldCBpID0gc3RhcnRJbmRleDsgaSA8IGVuZEluZGV4OyBpKyspIHtcbiAgICBsZXQgdmFsdWUgPSB0Vmlldy5kYXRhW2ldO1xuICAgIGlmIChpc0RpcmVjdGl2ZURlZkhhY2sodmFsdWUpKSB7XG4gICAgICAvLyBUaGUgZmFjdCB0aGF0IHdlIHNvbWV0aW1lcyBzdG9yZSBUeXBlIGFuZCBzb21ldGltZXMgRGlyZWN0aXZlRGVmIGluIHRoaXMgbG9jYXRpb24gaXMgYVxuICAgICAgLy8gZGVzaWduIGZsYXcuICBXZSBzaG91bGQgYWx3YXlzIHN0b3JlIHNhbWUgdHlwZSBzbyB0aGF0IHdlIGNhbiBiZSBtb25vbW9ycGhpYy4gVGhlIGlzc3VlXG4gICAgICAvLyBpcyB0aGF0IGZvciBDb21wb25lbnRzL0RpcmVjdGl2ZXMgd2Ugc3RvcmUgdGhlIGRlZiBpbnN0ZWFkIHRoZSB0eXBlLiBUaGUgY29ycmVjdCBiZWhhdmlvclxuICAgICAgLy8gaXMgdGhhdCB3ZSBzaG91bGQgYWx3YXlzIGJlIHN0b3JpbmcgaW5qZWN0YWJsZSB0eXBlIGluIHRoaXMgbG9jYXRpb24uXG4gICAgICB2YWx1ZSA9IHZhbHVlLnR5cGU7XG4gICAgfVxuICAgIHByb3ZpZGVyVG9rZW5zLnB1c2godmFsdWUpO1xuICB9XG4gIHJldHVybiBwcm92aWRlclRva2Vucztcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZXMgZGlyZWN0aXZlIGluc3RhbmNlcyBhc3NvY2lhdGVkIHdpdGggYSBnaXZlbiBET00gbm9kZS4gRG9lcyBub3QgaW5jbHVkZVxuICogY29tcG9uZW50IGluc3RhbmNlcy5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogR2l2ZW4gdGhlIGZvbGxvd2luZyBET00gc3RydWN0dXJlOlxuICpcbiAqIGBgYGh0bWxcbiAqIDxhcHAtcm9vdD5cbiAqICAgPGJ1dHRvbiBteS1idXR0b24+PC9idXR0b24+XG4gKiAgIDxteS1jb21wPjwvbXktY29tcD5cbiAqIDwvYXBwLXJvb3Q+XG4gKiBgYGBcbiAqXG4gKiBDYWxsaW5nIGBnZXREaXJlY3RpdmVzYCBvbiBgPGJ1dHRvbj5gIHdpbGwgcmV0dXJuIGFuIGFycmF5IHdpdGggYW4gaW5zdGFuY2Ugb2YgdGhlIGBNeUJ1dHRvbmBcbiAqIGRpcmVjdGl2ZSB0aGF0IGlzIGFzc29jaWF0ZWQgd2l0aCB0aGUgRE9NIG5vZGUuXG4gKlxuICogQ2FsbGluZyBgZ2V0RGlyZWN0aXZlc2Agb24gYDxteS1jb21wPmAgd2lsbCByZXR1cm4gYW4gZW1wdHkgYXJyYXkuXG4gKlxuICogQHBhcmFtIG5vZGUgRE9NIG5vZGUgZm9yIHdoaWNoIHRvIGdldCB0aGUgZGlyZWN0aXZlcy5cbiAqIEByZXR1cm5zIEFycmF5IG9mIGRpcmVjdGl2ZXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBub2RlLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqIEBnbG9iYWxBcGkgbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERpcmVjdGl2ZXMobm9kZTogTm9kZSk6IHt9W10ge1xuICAvLyBTa2lwIHRleHQgbm9kZXMgYmVjYXVzZSB3ZSBjYW4ndCBoYXZlIGRpcmVjdGl2ZXMgYXNzb2NpYXRlZCB3aXRoIHRoZW0uXG4gIGlmIChub2RlIGluc3RhbmNlb2YgVGV4dCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGNvbnN0IGNvbnRleHQgPSBnZXRMQ29udGV4dChub2RlKSE7XG4gIGNvbnN0IGxWaWV3ID0gY29udGV4dCA/IGNvbnRleHQubFZpZXcgOiBudWxsO1xuICBpZiAobFZpZXcgPT09IG51bGwpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBjb25zdCB0VmlldyA9IGxWaWV3W1RWSUVXXTtcbiAgY29uc3Qgbm9kZUluZGV4ID0gY29udGV4dC5ub2RlSW5kZXg7XG4gIGlmICghdFZpZXc/LmRhdGFbbm9kZUluZGV4XSkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBpZiAoY29udGV4dC5kaXJlY3RpdmVzID09PSB1bmRlZmluZWQpIHtcbiAgICBjb250ZXh0LmRpcmVjdGl2ZXMgPSBnZXREaXJlY3RpdmVzQXROb2RlSW5kZXgobm9kZUluZGV4LCBsVmlldyk7XG4gIH1cblxuICAvLyBUaGUgYGRpcmVjdGl2ZXNgIGluIHRoaXMgY2FzZSBhcmUgYSBuYW1lZCBhcnJheSBjYWxsZWQgYExDb21wb25lbnRWaWV3YC4gQ2xvbmUgdGhlXG4gIC8vIHJlc3VsdCBzbyB3ZSBkb24ndCBleHBvc2UgYW4gaW50ZXJuYWwgZGF0YSBzdHJ1Y3R1cmUgaW4gdGhlIHVzZXIncyBjb25zb2xlLlxuICByZXR1cm4gY29udGV4dC5kaXJlY3RpdmVzID09PSBudWxsID8gW10gOiBbLi4uY29udGV4dC5kaXJlY3RpdmVzXTtcbn1cblxuLyoqXG4gKiBQYXJ0aWFsIG1ldGFkYXRhIGZvciBhIGdpdmVuIGRpcmVjdGl2ZSBpbnN0YW5jZS5cbiAqIFRoaXMgaW5mb3JtYXRpb24gbWlnaHQgYmUgdXNlZnVsIGZvciBkZWJ1Z2dpbmcgcHVycG9zZXMgb3IgdG9vbGluZy5cbiAqIEN1cnJlbnRseSBvbmx5IGBpbnB1dHNgIGFuZCBgb3V0cHV0c2AgbWV0YWRhdGEgaXMgYXZhaWxhYmxlLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEaXJlY3RpdmVEZWJ1Z01ldGFkYXRhIHtcbiAgaW5wdXRzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xuICBvdXRwdXRzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xufVxuXG4vKipcbiAqIFBhcnRpYWwgbWV0YWRhdGEgZm9yIGEgZ2l2ZW4gY29tcG9uZW50IGluc3RhbmNlLlxuICogVGhpcyBpbmZvcm1hdGlvbiBtaWdodCBiZSB1c2VmdWwgZm9yIGRlYnVnZ2luZyBwdXJwb3NlcyBvciB0b29saW5nLlxuICogQ3VycmVudGx5IHRoZSBmb2xsb3dpbmcgZmllbGRzIGFyZSBhdmFpbGFibGU6XG4gKiAgLSBpbnB1dHNcbiAqICAtIG91dHB1dHNcbiAqICAtIGVuY2Fwc3VsYXRpb25cbiAqICAtIGNoYW5nZURldGVjdGlvblxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb21wb25lbnREZWJ1Z01ldGFkYXRhIGV4dGVuZHMgRGlyZWN0aXZlRGVidWdNZXRhZGF0YSB7XG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uO1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5O1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGRlYnVnIChwYXJ0aWFsKSBtZXRhZGF0YSBmb3IgYSBwYXJ0aWN1bGFyIGRpcmVjdGl2ZSBvciBjb21wb25lbnQgaW5zdGFuY2UuXG4gKiBUaGUgZnVuY3Rpb24gYWNjZXB0cyBhbiBpbnN0YW5jZSBvZiBhIGRpcmVjdGl2ZSBvciBjb21wb25lbnQgYW5kIHJldHVybnMgdGhlIGNvcnJlc3BvbmRpbmdcbiAqIG1ldGFkYXRhLlxuICpcbiAqIEBwYXJhbSBkaXJlY3RpdmVPckNvbXBvbmVudEluc3RhbmNlIEluc3RhbmNlIG9mIGEgZGlyZWN0aXZlIG9yIGNvbXBvbmVudFxuICogQHJldHVybnMgbWV0YWRhdGEgb2YgdGhlIHBhc3NlZCBkaXJlY3RpdmUgb3IgY29tcG9uZW50XG4gKlxuICogQHB1YmxpY0FwaVxuICogQGdsb2JhbEFwaSBuZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGlyZWN0aXZlTWV0YWRhdGEoZGlyZWN0aXZlT3JDb21wb25lbnRJbnN0YW5jZTogYW55KTogQ29tcG9uZW50RGVidWdNZXRhZGF0YXxcbiAgICBEaXJlY3RpdmVEZWJ1Z01ldGFkYXRhfG51bGwge1xuICBjb25zdCB7Y29uc3RydWN0b3J9ID0gZGlyZWN0aXZlT3JDb21wb25lbnRJbnN0YW5jZTtcbiAgaWYgKCFjb25zdHJ1Y3Rvcikge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGZpbmQgdGhlIGluc3RhbmNlIGNvbnN0cnVjdG9yJyk7XG4gIH1cbiAgLy8gSW4gY2FzZSBhIGNvbXBvbmVudCBpbmhlcml0cyBmcm9tIGEgZGlyZWN0aXZlLCB3ZSBtYXkgaGF2ZSBjb21wb25lbnQgYW5kIGRpcmVjdGl2ZSBtZXRhZGF0YVxuICAvLyBUbyBlbnN1cmUgd2UgZG9uJ3QgZ2V0IHRoZSBtZXRhZGF0YSBvZiB0aGUgZGlyZWN0aXZlLCB3ZSB3YW50IHRvIGNhbGwgYGdldENvbXBvbmVudERlZmAgZmlyc3QuXG4gIGNvbnN0IGNvbXBvbmVudERlZiA9IGdldENvbXBvbmVudERlZihjb25zdHJ1Y3Rvcik7XG4gIGlmIChjb21wb25lbnREZWYpIHtcbiAgICBjb25zdCBpbnB1dHMgPSBleHRyYWN0SW5wdXREZWJ1Z01ldGFkYXRhKGNvbXBvbmVudERlZi5pbnB1dHMpO1xuICAgIHJldHVybiB7XG4gICAgICBpbnB1dHMsXG4gICAgICBvdXRwdXRzOiBjb21wb25lbnREZWYub3V0cHV0cyxcbiAgICAgIGVuY2Fwc3VsYXRpb246IGNvbXBvbmVudERlZi5lbmNhcHN1bGF0aW9uLFxuICAgICAgY2hhbmdlRGV0ZWN0aW9uOiBjb21wb25lbnREZWYub25QdXNoID8gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcbiAgICB9O1xuICB9XG4gIGNvbnN0IGRpcmVjdGl2ZURlZiA9IGdldERpcmVjdGl2ZURlZihjb25zdHJ1Y3Rvcik7XG4gIGlmIChkaXJlY3RpdmVEZWYpIHtcbiAgICBjb25zdCBpbnB1dHMgPSBleHRyYWN0SW5wdXREZWJ1Z01ldGFkYXRhKGRpcmVjdGl2ZURlZi5pbnB1dHMpO1xuICAgIHJldHVybiB7aW5wdXRzLCBvdXRwdXRzOiBkaXJlY3RpdmVEZWYub3V0cHV0c307XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogUmV0cmlldmUgbWFwIG9mIGxvY2FsIHJlZmVyZW5jZXMuXG4gKlxuICogVGhlIHJlZmVyZW5jZXMgYXJlIHJldHJpZXZlZCBhcyBhIG1hcCBvZiBsb2NhbCByZWZlcmVuY2UgbmFtZSB0byBlbGVtZW50IG9yIGRpcmVjdGl2ZSBpbnN0YW5jZS5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IERPTSBlbGVtZW50LCBjb21wb25lbnQgb3IgZGlyZWN0aXZlIGluc3RhbmNlIGZvciB3aGljaCB0byByZXRyaWV2ZVxuICogICAgdGhlIGxvY2FsIHJlZmVyZW5jZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2NhbFJlZnModGFyZ2V0OiB7fSk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgY29uc3QgY29udGV4dCA9IGdldExDb250ZXh0KHRhcmdldCk7XG4gIGlmIChjb250ZXh0ID09PSBudWxsKSByZXR1cm4ge307XG5cbiAgaWYgKGNvbnRleHQubG9jYWxSZWZzID09PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBsVmlldyA9IGNvbnRleHQubFZpZXc7XG4gICAgaWYgKGxWaWV3ID09PSBudWxsKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICAgIGNvbnRleHQubG9jYWxSZWZzID0gZGlzY292ZXJMb2NhbFJlZnMobFZpZXcsIGNvbnRleHQubm9kZUluZGV4KTtcbiAgfVxuXG4gIHJldHVybiBjb250ZXh0LmxvY2FsUmVmcyB8fCB7fTtcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZXMgdGhlIGhvc3QgZWxlbWVudCBvZiBhIGNvbXBvbmVudCBvciBkaXJlY3RpdmUgaW5zdGFuY2UuXG4gKiBUaGUgaG9zdCBlbGVtZW50IGlzIHRoZSBET00gZWxlbWVudCB0aGF0IG1hdGNoZWQgdGhlIHNlbGVjdG9yIG9mIHRoZSBkaXJlY3RpdmUuXG4gKlxuICogQHBhcmFtIGNvbXBvbmVudE9yRGlyZWN0aXZlIENvbXBvbmVudCBvciBkaXJlY3RpdmUgaW5zdGFuY2UgZm9yIHdoaWNoIHRoZSBob3N0XG4gKiAgICAgZWxlbWVudCBzaG91bGQgYmUgcmV0cmlldmVkLlxuICogQHJldHVybnMgSG9zdCBlbGVtZW50IG9mIHRoZSB0YXJnZXQuXG4gKlxuICogQHB1YmxpY0FwaVxuICogQGdsb2JhbEFwaSBuZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SG9zdEVsZW1lbnQoY29tcG9uZW50T3JEaXJlY3RpdmU6IHt9KTogRWxlbWVudCB7XG4gIHJldHVybiBnZXRMQ29udGV4dChjb21wb25lbnRPckRpcmVjdGl2ZSkhLm5hdGl2ZSBhcyB1bmtub3duIGFzIEVsZW1lbnQ7XG59XG5cbi8qKlxuICogUmV0cmlldmVzIHRoZSByZW5kZXJlZCB0ZXh0IGZvciBhIGdpdmVuIGNvbXBvbmVudC5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHJldHJpZXZlcyB0aGUgaG9zdCBlbGVtZW50IG9mIGEgY29tcG9uZW50IGFuZFxuICogYW5kIHRoZW4gcmV0dXJucyB0aGUgYHRleHRDb250ZW50YCBmb3IgdGhhdCBlbGVtZW50LiBUaGlzIGltcGxpZXNcbiAqIHRoYXQgdGhlIHRleHQgcmV0dXJuZWQgd2lsbCBpbmNsdWRlIHJlLXByb2plY3RlZCBjb250ZW50IG9mXG4gKiB0aGUgY29tcG9uZW50IGFzIHdlbGwuXG4gKlxuICogQHBhcmFtIGNvbXBvbmVudCBUaGUgY29tcG9uZW50IHRvIHJldHVybiB0aGUgY29udGVudCB0ZXh0IGZvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFJlbmRlcmVkVGV4dChjb21wb25lbnQ6IGFueSk6IHN0cmluZyB7XG4gIGNvbnN0IGhvc3RFbGVtZW50ID0gZ2V0SG9zdEVsZW1lbnQoY29tcG9uZW50KTtcbiAgcmV0dXJuIGhvc3RFbGVtZW50LnRleHRDb250ZW50IHx8ICcnO1xufVxuXG4vKipcbiAqIEV2ZW50IGxpc3RlbmVyIGNvbmZpZ3VyYXRpb24gcmV0dXJuZWQgZnJvbSBgZ2V0TGlzdGVuZXJzYC5cbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBMaXN0ZW5lciB7XG4gIC8qKiBOYW1lIG9mIHRoZSBldmVudCBsaXN0ZW5lci4gKi9cbiAgbmFtZTogc3RyaW5nO1xuICAvKiogRWxlbWVudCB0aGF0IHRoZSBsaXN0ZW5lciBpcyBib3VuZCB0by4gKi9cbiAgZWxlbWVudDogRWxlbWVudDtcbiAgLyoqIENhbGxiYWNrIHRoYXQgaXMgaW52b2tlZCB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuICovXG4gIGNhbGxiYWNrOiAodmFsdWU6IGFueSkgPT4gYW55O1xuICAvKiogV2hldGhlciB0aGUgbGlzdGVuZXIgaXMgdXNpbmcgZXZlbnQgY2FwdHVyaW5nLiAqL1xuICB1c2VDYXB0dXJlOiBib29sZWFuO1xuICAvKipcbiAgICogVHlwZSBvZiB0aGUgbGlzdGVuZXIgKGUuZy4gYSBuYXRpdmUgRE9NIGV2ZW50IG9yIGEgY3VzdG9tIEBPdXRwdXQpLlxuICAgKi9cbiAgdHlwZTogJ2RvbSd8J291dHB1dCc7XG59XG5cblxuLyoqXG4gKiBSZXRyaWV2ZXMgYSBsaXN0IG9mIGV2ZW50IGxpc3RlbmVycyBhc3NvY2lhdGVkIHdpdGggYSBET00gZWxlbWVudC4gVGhlIGxpc3QgZG9lcyBpbmNsdWRlIGhvc3RcbiAqIGxpc3RlbmVycywgYnV0IGl0IGRvZXMgbm90IGluY2x1ZGUgZXZlbnQgbGlzdGVuZXJzIGRlZmluZWQgb3V0c2lkZSBvZiB0aGUgQW5ndWxhciBjb250ZXh0XG4gKiAoZS5nLiB0aHJvdWdoIGBhZGRFdmVudExpc3RlbmVyYCkuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqIEdpdmVuIHRoZSBmb2xsb3dpbmcgRE9NIHN0cnVjdHVyZTpcbiAqXG4gKiBgYGBodG1sXG4gKiA8YXBwLXJvb3Q+XG4gKiAgIDxkaXYgKGNsaWNrKT1cImRvU29tZXRoaW5nKClcIj48L2Rpdj5cbiAqIDwvYXBwLXJvb3Q+XG4gKiBgYGBcbiAqXG4gKiBDYWxsaW5nIGBnZXRMaXN0ZW5lcnNgIG9uIGA8ZGl2PmAgd2lsbCByZXR1cm4gYW4gb2JqZWN0IHRoYXQgbG9va3MgYXMgZm9sbG93czpcbiAqXG4gKiBgYGB0c1xuICoge1xuICogICBuYW1lOiAnY2xpY2snLFxuICogICBlbGVtZW50OiA8ZGl2PixcbiAqICAgY2FsbGJhY2s6ICgpID0+IGRvU29tZXRoaW5nKCksXG4gKiAgIHVzZUNhcHR1cmU6IGZhbHNlXG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gZWxlbWVudCBFbGVtZW50IGZvciB3aGljaCB0aGUgRE9NIGxpc3RlbmVycyBzaG91bGQgYmUgcmV0cmlldmVkLlxuICogQHJldHVybnMgQXJyYXkgb2YgZXZlbnQgbGlzdGVuZXJzIG9uIHRoZSBET00gZWxlbWVudC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKiBAZ2xvYmFsQXBpIG5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRMaXN0ZW5lcnMoZWxlbWVudDogRWxlbWVudCk6IExpc3RlbmVyW10ge1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RG9tRWxlbWVudChlbGVtZW50KTtcbiAgY29uc3QgbENvbnRleHQgPSBnZXRMQ29udGV4dChlbGVtZW50KTtcbiAgY29uc3QgbFZpZXcgPSBsQ29udGV4dCA9PT0gbnVsbCA/IG51bGwgOiBsQ29udGV4dC5sVmlldztcbiAgaWYgKGxWaWV3ID09PSBudWxsKSByZXR1cm4gW107XG5cbiAgY29uc3QgdFZpZXcgPSBsVmlld1tUVklFV107XG4gIGNvbnN0IGxDbGVhbnVwID0gbFZpZXdbQ0xFQU5VUF07XG4gIGNvbnN0IHRDbGVhbnVwID0gdFZpZXcuY2xlYW51cDtcbiAgY29uc3QgbGlzdGVuZXJzOiBMaXN0ZW5lcltdID0gW107XG4gIGlmICh0Q2xlYW51cCAmJiBsQ2xlYW51cCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdENsZWFudXAubGVuZ3RoOykge1xuICAgICAgY29uc3QgZmlyc3RQYXJhbSA9IHRDbGVhbnVwW2krK107XG4gICAgICBjb25zdCBzZWNvbmRQYXJhbSA9IHRDbGVhbnVwW2krK107XG4gICAgICBpZiAodHlwZW9mIGZpcnN0UGFyYW0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnN0IG5hbWU6IHN0cmluZyA9IGZpcnN0UGFyYW07XG4gICAgICAgIGNvbnN0IGxpc3RlbmVyRWxlbWVudCA9IHVud3JhcFJOb2RlKGxWaWV3W3NlY29uZFBhcmFtXSkgYXMgYW55IGFzIEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrOiAodmFsdWU6IGFueSkgPT4gYW55ID0gbENsZWFudXBbdENsZWFudXBbaSsrXV07XG4gICAgICAgIGNvbnN0IHVzZUNhcHR1cmVPckluZHggPSB0Q2xlYW51cFtpKytdO1xuICAgICAgICAvLyBpZiB1c2VDYXB0dXJlT3JJbmR4IGlzIGJvb2xlYW4gdGhlbiByZXBvcnQgaXQgYXMgaXMuXG4gICAgICAgIC8vIGlmIHVzZUNhcHR1cmVPckluZHggaXMgcG9zaXRpdmUgbnVtYmVyIHRoZW4gaXQgaW4gdW5zdWJzY3JpYmUgbWV0aG9kXG4gICAgICAgIC8vIGlmIHVzZUNhcHR1cmVPckluZHggaXMgbmVnYXRpdmUgbnVtYmVyIHRoZW4gaXQgaXMgYSBTdWJzY3JpcHRpb25cbiAgICAgICAgY29uc3QgdHlwZSA9XG4gICAgICAgICAgICAodHlwZW9mIHVzZUNhcHR1cmVPckluZHggPT09ICdib29sZWFuJyB8fCB1c2VDYXB0dXJlT3JJbmR4ID49IDApID8gJ2RvbScgOiAnb3V0cHV0JztcbiAgICAgICAgY29uc3QgdXNlQ2FwdHVyZSA9IHR5cGVvZiB1c2VDYXB0dXJlT3JJbmR4ID09PSAnYm9vbGVhbicgPyB1c2VDYXB0dXJlT3JJbmR4IDogZmFsc2U7XG4gICAgICAgIGlmIChlbGVtZW50ID09IGxpc3RlbmVyRWxlbWVudCkge1xuICAgICAgICAgIGxpc3RlbmVycy5wdXNoKHtlbGVtZW50LCBuYW1lLCBjYWxsYmFjaywgdXNlQ2FwdHVyZSwgdHlwZX0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGxpc3RlbmVycy5zb3J0KHNvcnRMaXN0ZW5lcnMpO1xuICByZXR1cm4gbGlzdGVuZXJzO1xufVxuXG5mdW5jdGlvbiBzb3J0TGlzdGVuZXJzKGE6IExpc3RlbmVyLCBiOiBMaXN0ZW5lcikge1xuICBpZiAoYS5uYW1lID09IGIubmFtZSkgcmV0dXJuIDA7XG4gIHJldHVybiBhLm5hbWUgPCBiLm5hbWUgPyAtMSA6IDE7XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBzaG91bGQgbm90IGV4aXN0IGJlY2F1c2UgaXQgaXMgbWVnYW1vcnBoaWMgYW5kIG9ubHkgbW9zdGx5IGNvcnJlY3QuXG4gKlxuICogU2VlIGNhbGwgc2l0ZSBmb3IgbW9yZSBpbmZvLlxuICovXG5mdW5jdGlvbiBpc0RpcmVjdGl2ZURlZkhhY2sob2JqOiBhbnkpOiBvYmogaXMgRGlyZWN0aXZlRGVmPGFueT4ge1xuICByZXR1cm4gb2JqLnR5cGUgIT09IHVuZGVmaW5lZCAmJiBvYmouZGVjbGFyZWRJbnB1dHMgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgb2JqLmZpbmRIb3N0RGlyZWN0aXZlRGVmcyAhPT0gdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIFJldHJpZXZlIHRoZSBjb21wb25lbnQgYExWaWV3YCBmcm9tIGNvbXBvbmVudC9lbGVtZW50LlxuICpcbiAqIE5PVEU6IGBMVmlld2AgaXMgYSBwcml2YXRlIGFuZCBzaG91bGQgbm90IGJlIGxlYWtlZCBvdXRzaWRlLlxuICogICAgICAgRG9uJ3QgZXhwb3J0IHRoaXMgbWV0aG9kIHRvIGBuZy4qYCBvbiB3aW5kb3cuXG4gKlxuICogQHBhcmFtIHRhcmdldCBET00gZWxlbWVudCBvciBjb21wb25lbnQgaW5zdGFuY2UgZm9yIHdoaWNoIHRvIHJldHJpZXZlIHRoZSBMVmlldy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENvbXBvbmVudExWaWV3KHRhcmdldDogYW55KTogTFZpZXcge1xuICBjb25zdCBsQ29udGV4dCA9IGdldExDb250ZXh0KHRhcmdldCkhO1xuICBjb25zdCBub2RlSW5keCA9IGxDb250ZXh0Lm5vZGVJbmRleDtcbiAgY29uc3QgbFZpZXcgPSBsQ29udGV4dC5sVmlldyE7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnRMVmlldyhsVmlldyk7XG4gIGNvbnN0IGNvbXBvbmVudExWaWV3ID0gbFZpZXdbbm9kZUluZHhdO1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0TFZpZXcoY29tcG9uZW50TFZpZXcpO1xuICByZXR1cm4gY29tcG9uZW50TFZpZXc7XG59XG5cbi8qKiBBc3NlcnRzIHRoYXQgYSB2YWx1ZSBpcyBhIERPTSBFbGVtZW50LiAqL1xuZnVuY3Rpb24gYXNzZXJ0RG9tRWxlbWVudCh2YWx1ZTogYW55KSB7XG4gIGlmICh0eXBlb2YgRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgISh2YWx1ZSBpbnN0YW5jZW9mIEVsZW1lbnQpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RpbmcgaW5zdGFuY2Ugb2YgRE9NIEVsZW1lbnQnKTtcbiAgfVxufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIGRlZmluaXRpb24gaG9sZHMgYWRkaXRpb25hbCBtZXRhZGF0YSB1c2luZyBiaXR3aXNlIGZsYWdzIHRvIGluZGljYXRlXG4gKiBmb3IgZXhhbXBsZSB3aGV0aGVyIGl0IGlzIHNpZ25hbCBiYXNlZC5cbiAqXG4gKiBUaGlzIGluZm9ybWF0aW9uIG5lZWRzIHRvIGJlIHNlcGFyYXRlIGZyb20gdGhlIGBwdWJsaWNOYW1lIC0+IG1pbmlmaWVkTmFtZWBcbiAqIG1hcHBpbmdzIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cbiAqL1xuZnVuY3Rpb24gZXh0cmFjdElucHV0RGVidWdNZXRhZGF0YTxUPihpbnB1dHM6IERpcmVjdGl2ZURlZjxUPlsnaW5wdXRzJ10pIHtcbiAgY29uc3QgcmVzOiBEaXJlY3RpdmVEZWJ1Z01ldGFkYXRhWydpbnB1dHMnXSA9IHt9O1xuXG4gIGZvciAoY29uc3Qga2V5IGluIGlucHV0cykge1xuICAgIGlmICghaW5wdXRzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGNvbnN0IHZhbHVlID0gaW5wdXRzW2tleV07XG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGxldCBtaW5pZmllZE5hbWU6IHN0cmluZztcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgbWluaWZpZWROYW1lID0gdmFsdWVbMF07XG4gICAgICAvLyBmbGFncyBhcmUgbm90IHVzZWQgZm9yIG5vdy5cbiAgICAgIC8vIFRPRE86IENvbnNpZGVyIGV4cG9zaW5nIGZsYWcgaW5mb3JtYXRpb24gaW4gZGlzY292ZXJ5LlxuICAgIH0gZWxzZSB7XG4gICAgICBtaW5pZmllZE5hbWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXNba2V5XSA9IG1pbmlmaWVkTmFtZTtcbiAgfVxuXG4gIHJldHVybiByZXM7XG59XG4iXX0=