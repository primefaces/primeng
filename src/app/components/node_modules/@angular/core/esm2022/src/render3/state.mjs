/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectFlags } from '../di/interface/injector';
import { assertDefined, assertEqual, assertGreaterThanOrEqual, assertLessThan, assertNotEqual, throwError } from '../util/assert';
import { assertLViewOrUndefined, assertTNodeForLView, assertTNodeForTView } from './assert';
import { CONTEXT, DECLARATION_VIEW, HEADER_OFFSET, T_HOST, TVIEW } from './interfaces/view';
import { MATH_ML_NAMESPACE, SVG_NAMESPACE } from './namespaces';
import { getTNode, walkUpViews } from './util/view_utils';
const instructionState = {
    lFrame: createLFrame(null),
    bindingsEnabled: true,
    skipHydrationRootTNode: null,
};
/**
 * In this mode, any changes in bindings will throw an ExpressionChangedAfterChecked error.
 *
 * Necessary to support ChangeDetectorRef.checkNoChanges().
 *
 * The `checkNoChanges` function is invoked only in ngDevMode=true and verifies that no unintended
 * changes exist in the change detector or its children.
 */
let _isInCheckNoChangesMode = false;
/**
 * Returns true if the instruction state stack is empty.
 *
 * Intended to be called from tests only (tree shaken otherwise).
 */
export function specOnlyIsInstructionStateEmpty() {
    return instructionState.lFrame.parent === null;
}
export function getElementDepthCount() {
    return instructionState.lFrame.elementDepthCount;
}
export function increaseElementDepthCount() {
    instructionState.lFrame.elementDepthCount++;
}
export function decreaseElementDepthCount() {
    instructionState.lFrame.elementDepthCount--;
}
export function getBindingsEnabled() {
    return instructionState.bindingsEnabled;
}
/**
 * Returns true if currently inside a skip hydration block.
 * @returns boolean
 */
export function isInSkipHydrationBlock() {
    return instructionState.skipHydrationRootTNode !== null;
}
/**
 * Returns true if this is the root TNode of the skip hydration block.
 * @param tNode the current TNode
 * @returns boolean
 */
export function isSkipHydrationRootTNode(tNode) {
    return instructionState.skipHydrationRootTNode === tNode;
}
/**
 * Enables directive matching on elements.
 *
 *  * Example:
 * ```
 * <my-comp my-directive>
 *   Should match component / directive.
 * </my-comp>
 * <div ngNonBindable>
 *   <!-- ɵɵdisableBindings() -->
 *   <my-comp my-directive>
 *     Should not match component / directive because we are in ngNonBindable.
 *   </my-comp>
 *   <!-- ɵɵenableBindings() -->
 * </div>
 * ```
 *
 * @codeGenApi
 */
export function ɵɵenableBindings() {
    instructionState.bindingsEnabled = true;
}
/**
 * Sets a flag to specify that the TNode is in a skip hydration block.
 * @param tNode the current TNode
 */
export function enterSkipHydrationBlock(tNode) {
    instructionState.skipHydrationRootTNode = tNode;
}
/**
 * Disables directive matching on element.
 *
 *  * Example:
 * ```
 * <my-comp my-directive>
 *   Should match component / directive.
 * </my-comp>
 * <div ngNonBindable>
 *   <!-- ɵɵdisableBindings() -->
 *   <my-comp my-directive>
 *     Should not match component / directive because we are in ngNonBindable.
 *   </my-comp>
 *   <!-- ɵɵenableBindings() -->
 * </div>
 * ```
 *
 * @codeGenApi
 */
export function ɵɵdisableBindings() {
    instructionState.bindingsEnabled = false;
}
/**
 * Clears the root skip hydration node when leaving a skip hydration block.
 */
export function leaveSkipHydrationBlock() {
    instructionState.skipHydrationRootTNode = null;
}
/**
 * Return the current `LView`.
 */
export function getLView() {
    return instructionState.lFrame.lView;
}
/**
 * Return the current `TView`.
 */
export function getTView() {
    return instructionState.lFrame.tView;
}
/**
 * Restores `contextViewData` to the given OpaqueViewState instance.
 *
 * Used in conjunction with the getCurrentView() instruction to save a snapshot
 * of the current view and restore it when listeners are invoked. This allows
 * walking the declaration view tree in listeners to get vars from parent views.
 *
 * @param viewToRestore The OpaqueViewState instance to restore.
 * @returns Context of the restored OpaqueViewState instance.
 *
 * @codeGenApi
 */
export function ɵɵrestoreView(viewToRestore) {
    instructionState.lFrame.contextLView = viewToRestore;
    return viewToRestore[CONTEXT];
}
/**
 * Clears the view set in `ɵɵrestoreView` from memory. Returns the passed in
 * value so that it can be used as a return value of an instruction.
 *
 * @codeGenApi
 */
export function ɵɵresetView(value) {
    instructionState.lFrame.contextLView = null;
    return value;
}
export function getCurrentTNode() {
    let currentTNode = getCurrentTNodePlaceholderOk();
    while (currentTNode !== null && currentTNode.type === 64 /* TNodeType.Placeholder */) {
        currentTNode = currentTNode.parent;
    }
    return currentTNode;
}
export function getCurrentTNodePlaceholderOk() {
    return instructionState.lFrame.currentTNode;
}
export function getCurrentParentTNode() {
    const lFrame = instructionState.lFrame;
    const currentTNode = lFrame.currentTNode;
    return lFrame.isParent ? currentTNode : currentTNode.parent;
}
export function setCurrentTNode(tNode, isParent) {
    ngDevMode && tNode && assertTNodeForTView(tNode, instructionState.lFrame.tView);
    const lFrame = instructionState.lFrame;
    lFrame.currentTNode = tNode;
    lFrame.isParent = isParent;
}
export function isCurrentTNodeParent() {
    return instructionState.lFrame.isParent;
}
export function setCurrentTNodeAsNotParent() {
    instructionState.lFrame.isParent = false;
}
export function getContextLView() {
    const contextLView = instructionState.lFrame.contextLView;
    ngDevMode && assertDefined(contextLView, 'contextLView must be defined.');
    return contextLView;
}
export function isInCheckNoChangesMode() {
    !ngDevMode && throwError('Must never be called in production mode');
    return _isInCheckNoChangesMode;
}
export function setIsInCheckNoChangesMode(mode) {
    !ngDevMode && throwError('Must never be called in production mode');
    _isInCheckNoChangesMode = mode;
}
// top level variables should not be exported for performance reasons (PERF_NOTES.md)
export function getBindingRoot() {
    const lFrame = instructionState.lFrame;
    let index = lFrame.bindingRootIndex;
    if (index === -1) {
        index = lFrame.bindingRootIndex = lFrame.tView.bindingStartIndex;
    }
    return index;
}
export function getBindingIndex() {
    return instructionState.lFrame.bindingIndex;
}
export function setBindingIndex(value) {
    return instructionState.lFrame.bindingIndex = value;
}
export function nextBindingIndex() {
    return instructionState.lFrame.bindingIndex++;
}
export function incrementBindingIndex(count) {
    const lFrame = instructionState.lFrame;
    const index = lFrame.bindingIndex;
    lFrame.bindingIndex = lFrame.bindingIndex + count;
    return index;
}
export function isInI18nBlock() {
    return instructionState.lFrame.inI18n;
}
export function setInI18nBlock(isInI18nBlock) {
    instructionState.lFrame.inI18n = isInI18nBlock;
}
/**
 * Set a new binding root index so that host template functions can execute.
 *
 * Bindings inside the host template are 0 index. But because we don't know ahead of time
 * how many host bindings we have we can't pre-compute them. For this reason they are all
 * 0 index and we just shift the root so that they match next available location in the LView.
 *
 * @param bindingRootIndex Root index for `hostBindings`
 * @param currentDirectiveIndex `TData[currentDirectiveIndex]` will point to the current directive
 *        whose `hostBindings` are being processed.
 */
export function setBindingRootForHostBindings(bindingRootIndex, currentDirectiveIndex) {
    const lFrame = instructionState.lFrame;
    lFrame.bindingIndex = lFrame.bindingRootIndex = bindingRootIndex;
    setCurrentDirectiveIndex(currentDirectiveIndex);
}
/**
 * When host binding is executing this points to the directive index.
 * `TView.data[getCurrentDirectiveIndex()]` is `DirectiveDef`
 * `LView[getCurrentDirectiveIndex()]` is directive instance.
 */
export function getCurrentDirectiveIndex() {
    return instructionState.lFrame.currentDirectiveIndex;
}
/**
 * Sets an index of a directive whose `hostBindings` are being processed.
 *
 * @param currentDirectiveIndex `TData` index where current directive instance can be found.
 */
export function setCurrentDirectiveIndex(currentDirectiveIndex) {
    instructionState.lFrame.currentDirectiveIndex = currentDirectiveIndex;
}
/**
 * Retrieve the current `DirectiveDef` which is active when `hostBindings` instruction is being
 * executed.
 *
 * @param tData Current `TData` where the `DirectiveDef` will be looked up at.
 */
export function getCurrentDirectiveDef(tData) {
    const currentDirectiveIndex = instructionState.lFrame.currentDirectiveIndex;
    return currentDirectiveIndex === -1 ? null : tData[currentDirectiveIndex];
}
export function getCurrentQueryIndex() {
    return instructionState.lFrame.currentQueryIndex;
}
export function setCurrentQueryIndex(value) {
    instructionState.lFrame.currentQueryIndex = value;
}
/**
 * Returns a `TNode` of the location where the current `LView` is declared at.
 *
 * @param lView an `LView` that we want to find parent `TNode` for.
 */
function getDeclarationTNode(lView) {
    const tView = lView[TVIEW];
    // Return the declaration parent for embedded views
    if (tView.type === 2 /* TViewType.Embedded */) {
        ngDevMode && assertDefined(tView.declTNode, 'Embedded TNodes should have declaration parents.');
        return tView.declTNode;
    }
    // Components don't have `TView.declTNode` because each instance of component could be
    // inserted in different location, hence `TView.declTNode` is meaningless.
    // Falling back to `T_HOST` in case we cross component boundary.
    if (tView.type === 1 /* TViewType.Component */) {
        return lView[T_HOST];
    }
    // Remaining TNode type is `TViewType.Root` which doesn't have a parent TNode.
    return null;
}
/**
 * This is a light weight version of the `enterView` which is needed by the DI system.
 *
 * @param lView `LView` location of the DI context.
 * @param tNode `TNode` for DI context
 * @param flags DI context flags. if `SkipSelf` flag is set than we walk up the declaration
 *     tree from `tNode`  until we find parent declared `TElementNode`.
 * @returns `true` if we have successfully entered DI associated with `tNode` (or with declared
 *     `TNode` if `flags` has  `SkipSelf`). Failing to enter DI implies that no associated
 *     `NodeInjector` can be found and we should instead use `ModuleInjector`.
 *     - If `true` than this call must be fallowed by `leaveDI`
 *     - If `false` than this call failed and we should NOT call `leaveDI`
 */
export function enterDI(lView, tNode, flags) {
    ngDevMode && assertLViewOrUndefined(lView);
    if (flags & InjectFlags.SkipSelf) {
        ngDevMode && assertTNodeForTView(tNode, lView[TVIEW]);
        let parentTNode = tNode;
        let parentLView = lView;
        while (true) {
            ngDevMode && assertDefined(parentTNode, 'Parent TNode should be defined');
            parentTNode = parentTNode.parent;
            if (parentTNode === null && !(flags & InjectFlags.Host)) {
                parentTNode = getDeclarationTNode(parentLView);
                if (parentTNode === null)
                    break;
                // In this case, a parent exists and is definitely an element. So it will definitely
                // have an existing lView as the declaration view, which is why we can assume it's defined.
                ngDevMode && assertDefined(parentLView, 'Parent LView should be defined');
                parentLView = parentLView[DECLARATION_VIEW];
                // In Ivy there are Comment nodes that correspond to ngIf and NgFor embedded directives
                // We want to skip those and look only at Elements and ElementContainers to ensure
                // we're looking at true parent nodes, and not content or other types.
                if (parentTNode.type & (2 /* TNodeType.Element */ | 8 /* TNodeType.ElementContainer */)) {
                    break;
                }
            }
            else {
                break;
            }
        }
        if (parentTNode === null) {
            // If we failed to find a parent TNode this means that we should use module injector.
            return false;
        }
        else {
            tNode = parentTNode;
            lView = parentLView;
        }
    }
    ngDevMode && assertTNodeForLView(tNode, lView);
    const lFrame = instructionState.lFrame = allocLFrame();
    lFrame.currentTNode = tNode;
    lFrame.lView = lView;
    return true;
}
/**
 * Swap the current lView with a new lView.
 *
 * For performance reasons we store the lView in the top level of the module.
 * This way we minimize the number of properties to read. Whenever a new view
 * is entered we have to store the lView for later, and when the view is
 * exited the state has to be restored
 *
 * @param newView New lView to become active
 * @returns the previously active lView;
 */
export function enterView(newView) {
    ngDevMode && assertNotEqual(newView[0], newView[1], '????');
    ngDevMode && assertLViewOrUndefined(newView);
    const newLFrame = allocLFrame();
    if (ngDevMode) {
        assertEqual(newLFrame.isParent, true, 'Expected clean LFrame');
        assertEqual(newLFrame.lView, null, 'Expected clean LFrame');
        assertEqual(newLFrame.tView, null, 'Expected clean LFrame');
        assertEqual(newLFrame.selectedIndex, -1, 'Expected clean LFrame');
        assertEqual(newLFrame.elementDepthCount, 0, 'Expected clean LFrame');
        assertEqual(newLFrame.currentDirectiveIndex, -1, 'Expected clean LFrame');
        assertEqual(newLFrame.currentNamespace, null, 'Expected clean LFrame');
        assertEqual(newLFrame.bindingRootIndex, -1, 'Expected clean LFrame');
        assertEqual(newLFrame.currentQueryIndex, 0, 'Expected clean LFrame');
    }
    const tView = newView[TVIEW];
    instructionState.lFrame = newLFrame;
    ngDevMode && tView.firstChild && assertTNodeForTView(tView.firstChild, tView);
    newLFrame.currentTNode = tView.firstChild;
    newLFrame.lView = newView;
    newLFrame.tView = tView;
    newLFrame.contextLView = newView;
    newLFrame.bindingIndex = tView.bindingStartIndex;
    newLFrame.inI18n = false;
}
/**
 * Allocates next free LFrame. This function tries to reuse the `LFrame`s to lower memory pressure.
 */
function allocLFrame() {
    const currentLFrame = instructionState.lFrame;
    const childLFrame = currentLFrame === null ? null : currentLFrame.child;
    const newLFrame = childLFrame === null ? createLFrame(currentLFrame) : childLFrame;
    return newLFrame;
}
function createLFrame(parent) {
    const lFrame = {
        currentTNode: null,
        isParent: true,
        lView: null,
        tView: null,
        selectedIndex: -1,
        contextLView: null,
        elementDepthCount: 0,
        currentNamespace: null,
        currentDirectiveIndex: -1,
        bindingRootIndex: -1,
        bindingIndex: -1,
        currentQueryIndex: 0,
        parent: parent,
        child: null,
        inI18n: false,
    };
    parent !== null && (parent.child = lFrame); // link the new LFrame for reuse.
    return lFrame;
}
/**
 * A lightweight version of leave which is used with DI.
 *
 * This function only resets `currentTNode` and `LView` as those are the only properties
 * used with DI (`enterDI()`).
 *
 * NOTE: This function is reexported as `leaveDI`. However `leaveDI` has return type of `void` where
 * as `leaveViewLight` has `LFrame`. This is so that `leaveViewLight` can be used in `leaveView`.
 */
function leaveViewLight() {
    const oldLFrame = instructionState.lFrame;
    instructionState.lFrame = oldLFrame.parent;
    oldLFrame.currentTNode = null;
    oldLFrame.lView = null;
    return oldLFrame;
}
/**
 * This is a lightweight version of the `leaveView` which is needed by the DI system.
 *
 * NOTE: this function is an alias so that we can change the type of the function to have `void`
 * return type.
 */
export const leaveDI = leaveViewLight;
/**
 * Leave the current `LView`
 *
 * This pops the `LFrame` with the associated `LView` from the stack.
 *
 * IMPORTANT: We must zero out the `LFrame` values here otherwise they will be retained. This is
 * because for performance reasons we don't release `LFrame` but rather keep it for next use.
 */
export function leaveView() {
    const oldLFrame = leaveViewLight();
    oldLFrame.isParent = true;
    oldLFrame.tView = null;
    oldLFrame.selectedIndex = -1;
    oldLFrame.contextLView = null;
    oldLFrame.elementDepthCount = 0;
    oldLFrame.currentDirectiveIndex = -1;
    oldLFrame.currentNamespace = null;
    oldLFrame.bindingRootIndex = -1;
    oldLFrame.bindingIndex = -1;
    oldLFrame.currentQueryIndex = 0;
}
export function nextContextImpl(level) {
    const contextLView = instructionState.lFrame.contextLView =
        walkUpViews(level, instructionState.lFrame.contextLView);
    return contextLView[CONTEXT];
}
/**
 * Gets the currently selected element index.
 *
 * Used with {@link property} instruction (and more in the future) to identify the index in the
 * current `LView` to act on.
 */
export function getSelectedIndex() {
    return instructionState.lFrame.selectedIndex;
}
/**
 * Sets the most recent index passed to {@link select}
 *
 * Used with {@link property} instruction (and more in the future) to identify the index in the
 * current `LView` to act on.
 *
 * (Note that if an "exit function" was set earlier (via `setElementExitFn()`) then that will be
 * run if and when the provided `index` value is different from the current selected index value.)
 */
export function setSelectedIndex(index) {
    ngDevMode && index !== -1 &&
        assertGreaterThanOrEqual(index, HEADER_OFFSET, 'Index must be past HEADER_OFFSET (or -1).');
    ngDevMode &&
        assertLessThan(index, instructionState.lFrame.lView.length, 'Can\'t set index passed end of LView');
    instructionState.lFrame.selectedIndex = index;
}
/**
 * Gets the `tNode` that represents currently selected element.
 */
export function getSelectedTNode() {
    const lFrame = instructionState.lFrame;
    return getTNode(lFrame.tView, lFrame.selectedIndex);
}
/**
 * Sets the namespace used to create elements to `'http://www.w3.org/2000/svg'` in global state.
 *
 * @codeGenApi
 */
export function ɵɵnamespaceSVG() {
    instructionState.lFrame.currentNamespace = SVG_NAMESPACE;
}
/**
 * Sets the namespace used to create elements to `'http://www.w3.org/1998/MathML/'` in global state.
 *
 * @codeGenApi
 */
export function ɵɵnamespaceMathML() {
    instructionState.lFrame.currentNamespace = MATH_ML_NAMESPACE;
}
/**
 * Sets the namespace used to create elements to `null`, which forces element creation to use
 * `createElement` rather than `createElementNS`.
 *
 * @codeGenApi
 */
export function ɵɵnamespaceHTML() {
    namespaceHTMLInternal();
}
/**
 * Sets the namespace used to create elements to `null`, which forces element creation to use
 * `createElement` rather than `createElementNS`.
 */
export function namespaceHTMLInternal() {
    instructionState.lFrame.currentNamespace = null;
}
export function getNamespace() {
    return instructionState.lFrame.currentNamespace;
}
let _wasLastNodeCreated = true;
/**
 * Retrieves a global flag that indicates whether the most recent DOM node
 * was created or hydrated.
 */
export function wasLastNodeCreated() {
    return _wasLastNodeCreated;
}
/**
 * Sets a global flag to indicate whether the most recent DOM node
 * was created or hydrated.
 */
export function lastNodeWasCreated(flag) {
    _wasLastNodeCreated = flag;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSx3QkFBd0IsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRWhJLE9BQU8sRUFBQyxzQkFBc0IsRUFBRSxtQkFBbUIsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUcxRixPQUFPLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBMEIsTUFBTSxFQUFTLEtBQUssRUFBbUIsTUFBTSxtQkFBbUIsQ0FBQztBQUMzSSxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsYUFBYSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzlELE9BQU8sRUFBQyxRQUFRLEVBQUUsV0FBVyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUE0S3hELE1BQU0sZ0JBQWdCLEdBQXFCO0lBQ3pDLE1BQU0sRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDO0lBQzFCLGVBQWUsRUFBRSxJQUFJO0lBQ3JCLHNCQUFzQixFQUFFLElBQUk7Q0FDN0IsQ0FBQztBQUVGOzs7Ozs7O0dBT0c7QUFDSCxJQUFJLHVCQUF1QixHQUFHLEtBQUssQ0FBQztBQUVwQzs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLCtCQUErQjtJQUM3QyxPQUFPLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDO0FBQ2pELENBQUM7QUFHRCxNQUFNLFVBQVUsb0JBQW9CO0lBQ2xDLE9BQU8sZ0JBQWdCLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDO0FBQ25ELENBQUM7QUFFRCxN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N0IsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxJQUFhO0lBQzlDLG1CQUFtQixHQUFHLElBQUksQ0FBQztBQUM3QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0RmxhZ3N9IGZyb20gJy4uL2RpL2ludGVyZmFjZS9pbmplY3Rvcic7XG5pbXBvcnQge2Fzc2VydERlZmluZWQsIGFzc2VydEVxdWFsLCBhc3NlcnRHcmVhdGVyVGhhbk9yRXF1YWwsIGFzc2VydExlc3NUaGFuLCBhc3NlcnROb3RFcXVhbCwgdGhyb3dFcnJvcn0gZnJvbSAnLi4vdXRpbC9hc3NlcnQnO1xuXG5pbXBvcnQge2Fzc2VydExWaWV3T3JVbmRlZmluZWQsIGFzc2VydFROb2RlRm9yTFZpZXcsIGFzc2VydFROb2RlRm9yVFZpZXd9IGZyb20gJy4vYXNzZXJ0JztcbmltcG9ydCB7RGlyZWN0aXZlRGVmfSBmcm9tICcuL2ludGVyZmFjZXMvZGVmaW5pdGlvbic7XG5pbXBvcnQge1ROb2RlLCBUTm9kZVR5cGV9IGZyb20gJy4vaW50ZXJmYWNlcy9ub2RlJztcbmltcG9ydCB7Q09OVEVYVCwgREVDTEFSQVRJT05fVklFVywgSEVBREVSX09GRlNFVCwgTFZpZXcsIE9wYXF1ZVZpZXdTdGF0ZSwgVF9IT1NULCBURGF0YSwgVFZJRVcsIFRWaWV3LCBUVmlld1R5cGV9IGZyb20gJy4vaW50ZXJmYWNlcy92aWV3JztcbmltcG9ydCB7TUFUSF9NTF9OQU1FU1BBQ0UsIFNWR19OQU1FU1BBQ0V9IGZyb20gJy4vbmFtZXNwYWNlcyc7XG5pbXBvcnQge2dldFROb2RlLCB3YWxrVXBWaWV3c30gZnJvbSAnLi91dGlsL3ZpZXdfdXRpbHMnO1xuXG5cbi8qKlxuICpcbiAqL1xuaW50ZXJmYWNlIExGcmFtZSB7XG4gIC8qKlxuICAgKiBQYXJlbnQgTEZyYW1lLlxuICAgKlxuICAgKiBUaGlzIGlzIG5lZWRlZCB3aGVuIGBsZWF2ZVZpZXdgIGlzIGNhbGxlZCB0byByZXN0b3JlIHRoZSBwcmV2aW91cyBzdGF0ZS5cbiAgICovXG4gIHBhcmVudDogTEZyYW1lO1xuXG4gIC8qKlxuICAgKiBDaGlsZCBMRnJhbWUuXG4gICAqXG4gICAqIFRoaXMgaXMgdXNlZCB0byBjYWNoZSBleGlzdGluZyBMRnJhbWVzIHRvIHJlbGlldmUgdGhlIG1lbW9yeSBwcmVzc3VyZS5cbiAgICovXG4gIGNoaWxkOiBMRnJhbWV8bnVsbDtcblxuICAvKipcbiAgICogU3RhdGUgb2YgdGhlIGN1cnJlbnQgdmlldyBiZWluZyBwcm9jZXNzZWQuXG4gICAqXG4gICAqIEFuIGFycmF5IG9mIG5vZGVzICh0ZXh0LCBlbGVtZW50LCBjb250YWluZXIsIGV0YyksIHBpcGVzLCB0aGVpciBiaW5kaW5ncywgYW5kXG4gICAqIGFueSBsb2NhbCB2YXJpYWJsZXMgdGhhdCBuZWVkIHRvIGJlIHN0b3JlZCBiZXR3ZWVuIGludm9jYXRpb25zLlxuICAgKi9cbiAgbFZpZXc6IExWaWV3O1xuXG4gIC8qKlxuICAgKiBDdXJyZW50IGBUVmlld2AgYXNzb2NpYXRlZCB3aXRoIHRoZSBgTEZyYW1lLmxWaWV3YC5cbiAgICpcbiAgICogT25lIGNhbiBnZXQgYFRWaWV3YCBmcm9tIGBsRnJhbWVbVFZJRVddYCBob3dldmVyIGJlY2F1c2UgaXQgaXMgc28gY29tbW9uIGl0IG1ha2VzIHNlbnNlIHRvXG4gICAqIHN0b3JlIGl0IGluIGBMRnJhbWVgIGZvciBwZXJmIHJlYXNvbnMuXG4gICAqL1xuICB0VmlldzogVFZpZXc7XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gc2V0IHRoZSBwYXJlbnQgcHJvcGVydHkgd2hlbiBub2RlcyBhcmUgY3JlYXRlZCBhbmQgdHJhY2sgcXVlcnkgcmVzdWx0cy5cbiAgICpcbiAgICogVGhpcyBpcyB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggYGlzUGFyZW50YC5cbiAgICovXG4gIGN1cnJlbnRUTm9kZTogVE5vZGV8bnVsbDtcblxuICAvKipcbiAgICogSWYgYGlzUGFyZW50YCBpczpcbiAgICogIC0gYHRydWVgOiB0aGVuIGBjdXJyZW50VE5vZGVgIHBvaW50cyB0byBhIHBhcmVudCBub2RlLlxuICAgKiAgLSBgZmFsc2VgOiB0aGVuIGBjdXJyZW50VE5vZGVgIHBvaW50cyB0byBwcmV2aW91cyBub2RlIChzaWJsaW5nKS5cbiAgICovXG4gIGlzUGFyZW50OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJbmRleCBvZiBjdXJyZW50bHkgc2VsZWN0ZWQgZWxlbWVudCBpbiBMVmlldy5cbiAgICpcbiAgICogVXNlZCBieSBiaW5kaW5nIGluc3RydWN0aW9ucy4gVXBkYXRlZCBhcyBwYXJ0IG9mIGFkdmFuY2UgaW5zdHJ1Y3Rpb24uXG4gICAqL1xuICBzZWxlY3RlZEluZGV4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgcG9pbnRlciB0byB0aGUgYmluZGluZyBpbmRleC5cbiAgICovXG4gIGJpbmRpbmdJbmRleDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgbGFzdCB2aWV3RGF0YSByZXRyaWV2ZWQgYnkgbmV4dENvbnRleHQoKS5cbiAgICogQWxsb3dzIGJ1aWxkaW5nIG5leHRDb250ZXh0KCkgYW5kIHJlZmVyZW5jZSgpIGNhbGxzLlxuICAgKlxuICAgKiBlLmcuIGNvbnN0IGlubmVyID0geCgpLiRpbXBsaWNpdDsgY29uc3Qgb3V0ZXIgPSB4KCkuJGltcGxpY2l0O1xuICAgKi9cbiAgY29udGV4dExWaWV3OiBMVmlld3xudWxsO1xuXG4gIC8qKlxuICAgKiBTdG9yZSB0aGUgZWxlbWVudCBkZXB0aCBjb3VudC4gVGhpcyBpcyB1c2VkIHRvIGlkZW50aWZ5IHRoZSByb290IGVsZW1lbnRzIG9mIHRoZSB0ZW1wbGF0ZVxuICAgKiBzbyB0aGF0IHdlIGNhbiB0aGVuIGF0dGFjaCBwYXRjaCBkYXRhIGBMVmlld2AgdG8gb25seSB0aG9zZSBlbGVtZW50cy4gV2Uga25vdyB0aGF0IHRob3NlXG4gICAqIGFyZSB0aGUgb25seSBwbGFjZXMgd2hlcmUgdGhlIHBhdGNoIGRhdGEgY291bGQgY2hhbmdlLCB0aGlzIHdheSB3ZSB3aWxsIHNhdmUgb24gbnVtYmVyXG4gICAqIG9mIHBsYWNlcyB3aGVyZSB0aGEgcGF0Y2hpbmcgb2NjdXJzLlxuICAgKi9cbiAgZWxlbWVudERlcHRoQ291bnQ6IG51bWJlcjtcblxuICAvKipcbiAgICogQ3VycmVudCBuYW1lc3BhY2UgdG8gYmUgdXNlZCB3aGVuIGNyZWF0aW5nIGVsZW1lbnRzXG4gICAqL1xuICBjdXJyZW50TmFtZXNwYWNlOiBzdHJpbmd8bnVsbDtcblxuXG4gIC8qKlxuICAgKiBUaGUgcm9vdCBpbmRleCBmcm9tIHdoaWNoIHB1cmUgZnVuY3Rpb24gaW5zdHJ1Y3Rpb25zIHNob3VsZCBjYWxjdWxhdGUgdGhlaXIgYmluZGluZ1xuICAgKiBpbmRpY2VzLiBJbiBjb21wb25lbnQgdmlld3MsIHRoaXMgaXMgVFZpZXcuYmluZGluZ1N0YXJ0SW5kZXguIEluIGEgaG9zdCBiaW5kaW5nXG4gICAqIGNvbnRleHQsIHRoaXMgaXMgdGhlIFRWaWV3LmV4cGFuZG9TdGFydEluZGV4ICsgYW55IGRpcnMvaG9zdFZhcnMgYmVmb3JlIHRoZSBnaXZlbiBkaXIuXG4gICAqL1xuICBiaW5kaW5nUm9vdEluZGV4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgaW5kZXggb2YgYSBWaWV3IG9yIENvbnRlbnQgUXVlcnkgd2hpY2ggbmVlZHMgdG8gYmUgcHJvY2Vzc2VkIG5leHQuXG4gICAqIFdlIGl0ZXJhdGUgb3ZlciB0aGUgbGlzdCBvZiBRdWVyaWVzIGFuZCBpbmNyZW1lbnQgY3VycmVudCBxdWVyeSBpbmRleCBhdCBldmVyeSBzdGVwLlxuICAgKi9cbiAgY3VycmVudFF1ZXJ5SW5kZXg6IG51bWJlcjtcblxuICAvKipcbiAgICogV2hlbiBob3N0IGJpbmRpbmcgaXMgZXhlY3V0aW5nIHRoaXMgcG9pbnRzIHRvIHRoZSBkaXJlY3RpdmUgaW5kZXguXG4gICAqIGBUVmlldy5kYXRhW2N1cnJlbnREaXJlY3RpdmVJbmRleF1gIGlzIGBEaXJlY3RpdmVEZWZgXG4gICAqIGBMVmlld1tjdXJyZW50RGlyZWN0aXZlSW5kZXhdYCBpcyBkaXJlY3RpdmUgaW5zdGFuY2UuXG4gICAqL1xuICBjdXJyZW50RGlyZWN0aXZlSW5kZXg6IG51bWJlcjtcblxuICAvKipcbiAgICogQXJlIHdlIGN1cnJlbnRseSBpbiBpMThuIGJsb2NrIGFzIGRlbm90ZWQgYnkgYMm1ybVlbGVtZW50U3RhcnRgIGFuZCBgybXJtWVsZW1lbnRFbmRgLlxuICAgKlxuICAgKiBUaGlzIGluZm9ybWF0aW9uIGlzIG5lZWRlZCBiZWNhdXNlIHdoaWxlIHdlIGFyZSBpbiBpMThuIGJsb2NrIGFsbCBlbGVtZW50cyBtdXN0IGJlIHByZS1kZWNsYXJlZFxuICAgKiBpbiB0aGUgdHJhbnNsYXRpb24uIChpLmUuIGBIZWxsbyDvv70jMu+/vVdvcmxk77+9LyMy77+9IWAgcHJlLWRlY2xhcmVzIGVsZW1lbnQgYXQgYO+/vSMy77+9YCBsb2NhdGlvbi4pXG4gICAqIFRoaXMgYWxsb2NhdGVzIGBUTm9kZVR5cGUuUGxhY2Vob2xkZXJgIGVsZW1lbnQgYXQgbG9jYXRpb24gYDJgLiBJZiB0cmFuc2xhdG9yIHJlbW92ZXMgYO+/vSMy77+9YFxuICAgKiBmcm9tIHRyYW5zbGF0aW9uIHRoYW4gdGhlIHJ1bnRpbWUgbXVzdCBhbHNvIGVuc3VyZSB0aGEgZWxlbWVudCBhdCBgMmAgZG9lcyBub3QgZ2V0IGluc2VydGVkXG4gICAqIGludG8gdGhlIERPTS4gVGhlIHRyYW5zbGF0aW9uIGRvZXMgbm90IGNhcnJ5IGluZm9ybWF0aW9uIGFib3V0IGRlbGV0ZWQgZWxlbWVudHMuIFRoZXJlZm9yIHRoZVxuICAgKiBvbmx5IHdheSB0byBrbm93IHRoYXQgYW4gZWxlbWVudCBpcyBkZWxldGVkIGlzIHRoYXQgaXQgd2FzIG5vdCBwcmUtZGVjbGFyZWQgaW4gdGhlIHRyYW5zbGF0aW9uLlxuICAgKlxuICAgKiBUaGlzIGZsYWcgd29ya3MgYnkgZW5zdXJpbmcgdGhhdCBlbGVtZW50cyB3aGljaCBhcmUgY3JlYXRlZCB3aXRob3V0IHByZS1kZWNsYXJhdGlvblxuICAgKiAoYFROb2RlVHlwZS5QbGFjZWhvbGRlcmApIGFyZSBub3QgaW5zZXJ0ZWQgaW50byB0aGUgRE9NIHJlbmRlciB0cmVlLiAoSXQgZG9lcyBtZWFuIHRoYXQgdGhlXG4gICAqIGVsZW1lbnQgc3RpbGwgZ2V0cyBpbnN0YW50aWF0ZWQgYWxvbmcgd2l0aCBhbGwgb2YgaXRzIGJlaGF2aW9yIFtkaXJlY3RpdmVzXSlcbiAgICovXG4gIGluSTE4bjogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBBbGwgaW1wbGljaXQgaW5zdHJ1Y3Rpb24gc3RhdGUgaXMgc3RvcmVkIGhlcmUuXG4gKlxuICogSXQgaXMgdXNlZnVsIHRvIGhhdmUgYSBzaW5nbGUgb2JqZWN0IHdoZXJlIGFsbCBvZiB0aGUgc3RhdGUgaXMgc3RvcmVkIGFzIGEgbWVudGFsIG1vZGVsXG4gKiAocmF0aGVyIGl0IGJlaW5nIHNwcmVhZCBhY3Jvc3MgbWFueSBkaWZmZXJlbnQgdmFyaWFibGVzLilcbiAqXG4gKiBQRVJGIE5PVEU6IFR1cm5zIG91dCB0aGF0IHdyaXRpbmcgdG8gYSB0cnVlIGdsb2JhbCB2YXJpYWJsZSBpcyBzbG93ZXIgdGhhblxuICogaGF2aW5nIGFuIGludGVybWVkaWF0ZSBvYmplY3Qgd2l0aCBwcm9wZXJ0aWVzLlxuICovXG5pbnRlcmZhY2UgSW5zdHJ1Y3Rpb25TdGF0ZSB7XG4gIC8qKlxuICAgKiBDdXJyZW50IGBMRnJhbWVgXG4gICAqXG4gICAqIGBudWxsYCBpZiB3ZSBoYXZlIG5vdCBjYWxsZWQgYGVudGVyVmlld2BcbiAgICovXG4gIGxGcmFtZTogTEZyYW1lO1xuXG4gIC8qKlxuICAgKiBTdG9yZXMgd2hldGhlciBkaXJlY3RpdmVzIHNob3VsZCBiZSBtYXRjaGVkIHRvIGVsZW1lbnRzLlxuICAgKlxuICAgKiBXaGVuIHRlbXBsYXRlIGNvbnRhaW5zIGBuZ05vbkJpbmRhYmxlYCB0aGVuIHdlIG5lZWQgdG8gcHJldmVudCB0aGUgcnVudGltZSBmcm9tIG1hdGNoaW5nXG4gICAqIGRpcmVjdGl2ZXMgb24gY2hpbGRyZW4gb2YgdGhhdCBlbGVtZW50LlxuICAgKlxuICAgKiBFeGFtcGxlOlxuICAgKiBgYGBcbiAgICogPG15LWNvbXAgbXktZGlyZWN0aXZlPlxuICAgKiAgIFNob3VsZCBtYXRjaCBjb21wb25lbnQgLyBkaXJlY3RpdmUuXG4gICAqIDwvbXktY29tcD5cbiAgICogPGRpdiBuZ05vbkJpbmRhYmxlPlxuICAgKiAgIDxteS1jb21wIG15LWRpcmVjdGl2ZT5cbiAgICogICAgIFNob3VsZCBub3QgbWF0Y2ggY29tcG9uZW50IC8gZGlyZWN0aXZlIGJlY2F1c2Ugd2UgYXJlIGluIG5nTm9uQmluZGFibGUuXG4gICAqICAgPC9teS1jb21wPlxuICAgKiA8L2Rpdj5cbiAgICogYGBgXG4gICAqL1xuICBiaW5kaW5nc0VuYWJsZWQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFN0b3JlcyB0aGUgcm9vdCBUTm9kZSB0aGF0IGhhcyB0aGUgJ25nU2tpcEh5ZHJhdGlvbicgYXR0cmlidXRlIG9uIGl0IGZvciBsYXRlciByZWZlcmVuY2UuXG4gICAqXG4gICAqIEV4YW1wbGU6XG4gICAqIGBgYFxuICAgKiA8bXktY29tcCBuZ1NraXBIeWRyYXRpb24+XG4gICAqICAgU2hvdWxkIHJlZmVyZW5jZSB0aGlzIHJvb3Qgbm9kZVxuICAgKiA8L215LWNvbXA+XG4gICAqIGBgYFxuICAgKi9cbiAgc2tpcEh5ZHJhdGlvblJvb3RUTm9kZTogVE5vZGV8bnVsbDtcbn1cblxuY29uc3QgaW5zdHJ1Y3Rpb25TdGF0ZTogSW5zdHJ1Y3Rpb25TdGF0ZSA9IHtcbiAgbEZyYW1lOiBjcmVhdGVMRnJhbWUobnVsbCksXG4gIGJpbmRpbmdzRW5hYmxlZDogdHJ1ZSxcbiAgc2tpcEh5ZHJhdGlvblJvb3RUTm9kZTogbnVsbCxcbn07XG5cbi8qKlxuICogSW4gdGhpcyBtb2RlLCBhbnkgY2hhbmdlcyBpbiBiaW5kaW5ncyB3aWxsIHRocm93IGFuIEV4cHJlc3Npb25DaGFuZ2VkQWZ0ZXJDaGVja2VkIGVycm9yLlxuICpcbiAqIE5lY2Vzc2FyeSB0byBzdXBwb3J0IENoYW5nZURldGVjdG9yUmVmLmNoZWNrTm9DaGFuZ2VzKCkuXG4gKlxuICogVGhlIGBjaGVja05vQ2hhbmdlc2AgZnVuY3Rpb24gaXMgaW52b2tlZCBvbmx5IGluIG5nRGV2TW9kZT10cnVlIGFuZCB2ZXJpZmllcyB0aGF0IG5vIHVuaW50ZW5kZWRcbiAqIGNoYW5nZXMgZXhpc3QgaW4gdGhlIGNoYW5nZSBkZXRlY3RvciBvciBpdHMgY2hpbGRyZW4uXG4gKi9cbmxldCBfaXNJbkNoZWNrTm9DaGFuZ2VzTW9kZSA9IGZhbHNlO1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgaW5zdHJ1Y3Rpb24gc3RhdGUgc3RhY2sgaXMgZW1wdHkuXG4gKlxuICogSW50ZW5kZWQgdG8gYmUgY2FsbGVkIGZyb20gdGVzdHMgb25seSAodHJlZSBzaGFrZW4gb3RoZXJ3aXNlKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNwZWNPbmx5SXNJbnN0cnVjdGlvblN0YXRlRW1wdHkoKTogYm9vbGVhbiB7XG4gIHJldHVybiBpbnN0cnVjdGlvblN0YXRlLmxGcmFtZS5wYXJlbnQgPT09IG51bGw7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVsZW1lbnREZXB0aENvdW50KCkge1xuICByZXR1cm4gaW5zdHJ1Y3Rpb25TdGF0ZS5sRnJhbWUuZWxlbWVudERlcHRoQ291bnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbmNyZWFzZUVsZW1lbnREZXB0aENvdW50KCkge1xuICBpbnN0cnVjdGlvblN0YXRlLmxGcmFtZS5lbGVtZW50RGVwdGhDb3VudCsrO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVjcmVhc2VFbGVtZW50RGVwdGhDb3VudCgpIHtcbiAgaW5zdHJ1Y3Rpb25TdGF0ZS5sRnJhbWUuZWxlbWVudERlcHRoQ291bnQtLTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEJpbmRpbmdzRW5hYmxlZCgpOiBib29sZWFuIHtcbiAgcmV0dXJuIGluc3RydWN0aW9uU3RhdGUuYmluZGluZ3NFbmFibGVkO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBjdXJyZW50bHkgaW5zaWRlIGEgc2tpcCBoeWRyYXRpb24gYmxvY2suXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0luU2tpcEh5ZHJhdGlvbkJsb2NrKCk6IGJvb2xlYW4ge1xuICByZXR1cm4gaW5zdHJ1Y3Rpb25TdGF0ZS5za2lwSHlkcmF0aW9uUm9vdFROb2RlICE9PSBudWxsO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIGlzIHRoZSByb290IFROb2RlIG9mIHRoZSBza2lwIGh5ZHJhdGlvbiBibG9jay5cbiAqIEBwYXJhbSB0Tm9kZSB0aGUgY3VycmVudCBUTm9kZVxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTa2lwSHlkcmF0aW9uUm9vdFROb2RlKHROb2RlOiBUTm9kZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gaW5zdHJ1Y3Rpb25TdGF0ZS5za2lwSHlkcmF0aW9uUm9vdFROb2RlID09PSB0Tm9kZTtcbn1cblxuLyoqXG4gKiBFbmFibGVzIGRpcmVjdGl2ZSBtYXRjaGluZyBvbiBlbGVtZW50cy5cbiAqXG4gKiAgKiBFeGFtcGxlOlxuICogYGBgXG4gKiA8bXktY29tcCBteS1kaXJlY3RpdmU+XG4gKiAgIFNob3VsZCBtYXRjaCBjb21wb25lbnQgLyBkaXJlY3RpdmUuXG4gKiA8L215LWNvbXA+XG4gKiA8ZGl2IG5nTm9uQmluZGFibGU+XG4gKiAgIDwhLS0gybXJtWRpc2FibGVCaW5kaW5ncygpIC0tPlxuICogICA8bXktY29tcCBteS1kaXJlY3RpdmU+XG4gKiAgICAgU2hvdWxkIG5vdCBtYXRjaCBjb21wb25lbnQgLyBkaXJlY3RpdmUgYmVjYXVzZSB3ZSBhcmUgaW4gbmdOb25CaW5kYWJsZS5cbiAqICAgPC9teS1jb21wPlxuICogICA8IS0tIMm1ybVlbmFibGVCaW5kaW5ncygpIC0tPlxuICogPC9kaXY+XG4gKiBgYGBcbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtWVuYWJsZUJpbmRpbmdzKCk6IHZvaWQge1xuICBpbnN0cnVjdGlvblN0YXRlLmJpbmRpbmdzRW5hYmxlZCA9IHRydWU7XG59XG5cbi8qKlxuICogU2V0cyBhIGZsYWcgdG8gc3BlY2lmeSB0aGF0IHRoZSBUTm9kZSBpcyBpbiBhIHNraXAgaHlkcmF0aW9uIGJsb2NrLlxuICogQHBhcmFtIHROb2RlIHRoZSBjdXJyZW50IFROb2RlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbnRlclNraXBIeWRyYXRpb25CbG9jayh0Tm9kZTogVE5vZGUpOiB2b2lkIHtcbiAgaW5zdHJ1Y3Rpb25TdGF0ZS5za2lwSHlkcmF0aW9uUm9vdFROb2RlID0gdE5vZGU7XG59XG5cbi8qKlxuICogRGlzYWJsZXMgZGlyZWN0aXZlIG1hdGNoaW5nIG9uIGVsZW1lbnQuXG4gKlxuICogICogRXhhbXBsZTpcbiAqIGBgYFxuICogPG15LWNvbXAgbXktZGlyZWN0aXZlPlxuICogICBTaG91bGQgbWF0Y2ggY29tcG9uZW50IC8gZGlyZWN0aXZlLlxuICogPC9teS1jb21wPlxuICogPGRpdiBuZ05vbkJpbmRhYmxlPlxuICogICA8IS0tIMm1ybVkaXNhYmxlQmluZGluZ3MoKSAtLT5cbiAqICAgPG15LWNvbXAgbXktZGlyZWN0aXZlPlxuICogICAgIFNob3VsZCBub3QgbWF0Y2ggY29tcG9uZW50IC8gZGlyZWN0aXZlIGJlY2F1c2Ugd2UgYXJlIGluIG5nTm9uQmluZGFibGUuXG4gKiAgIDwvbXktY29tcD5cbiAqICAgPCEtLSDJtcm1ZW5hYmxlQmluZGluZ3MoKSAtLT5cbiAqIDwvZGl2PlxuICogYGBgXG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVkaXNhYmxlQmluZGluZ3MoKTogdm9pZCB7XG4gIGluc3RydWN0aW9uU3RhdGUuYmluZGluZ3NFbmFibGVkID0gZmFsc2U7XG59XG5cbi8qKlxuICogQ2xlYXJzIHRoZSByb290IHNraXAgaHlkcmF0aW9uIG5vZGUgd2hlbiBsZWF2aW5nIGEgc2tpcCBoeWRyYXRpb24gYmxvY2suXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsZWF2ZVNraXBIeWRyYXRpb25CbG9jaygpOiB2b2lkIHtcbiAgaW5zdHJ1Y3Rpb25TdGF0ZS5za2lwSHlkcmF0aW9uUm9vdFROb2RlID0gbnVsbDtcbn1cblxuLyoqXG4gKiBSZXR1cm4gdGhlIGN1cnJlbnQgYExWaWV3YC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldExWaWV3PFQ+KCk6IExWaWV3PFQ+IHtcbiAgcmV0dXJuIGluc3RydWN0aW9uU3RhdGUubEZyYW1lLmxWaWV3IGFzIExWaWV3PFQ+O1xufVxuXG4vKipcbiAqIFJldHVybiB0aGUgY3VycmVudCBgVFZpZXdgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VFZpZXcoKTogVFZpZXcge1xuICByZXR1cm4gaW5zdHJ1Y3Rpb25TdGF0ZS5sRnJhbWUudFZpZXc7XG59XG5cbi8qKlxuICogUmVzdG9yZXMgYGNvbnRleHRWaWV3RGF0YWAgdG8gdGhlIGdpdmVuIE9wYXF1ZVZpZXdTdGF0ZSBpbnN0YW5jZS5cbiAqXG4gKiBVc2VkIGluIGNvbmp1bmN0aW9uIHdpdGggdGhlIGdldEN1cnJlbnRWaWV3KCkgaW5zdHJ1Y3Rpb24gdG8gc2F2ZSBhIHNuYXBzaG90XG4gKiBvZiB0aGUgY3VycmVudCB2aWV3IGFuZCByZXN0b3JlIGl0IHdoZW4gbGlzdGVuZXJzIGFyZSBpbnZva2VkLiBUaGlzIGFsbG93c1xuICogd2Fsa2luZyB0aGUgZGVjbGFyYXRpb24gdmlldyB0cmVlIGluIGxpc3RlbmVycyB0byBnZXQgdmFycyBmcm9tIHBhcmVudCB2aWV3cy5cbiAqXG4gKiBAcGFyYW0gdmlld1RvUmVzdG9yZSBUaGUgT3BhcXVlVmlld1N0YXRlIGluc3RhbmNlIHRvIHJlc3RvcmUuXG4gKiBAcmV0dXJucyBDb250ZXh0IG9mIHRoZSByZXN0b3JlZCBPcGFxdWVWaWV3U3RhdGUgaW5zdGFuY2UuXG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVyZXN0b3JlVmlldzxUID0gYW55Pih2aWV3VG9SZXN0b3JlOiBPcGFxdWVWaWV3U3RhdGUpOiBUIHtcbiAgaW5zdHJ1Y3Rpb25TdGF0ZS5sRnJhbWUuY29udGV4dExWaWV3ID0gdmlld1RvUmVzdG9yZSBhcyBhbnkgYXMgTFZpZXc7XG4gIHJldHVybiAodmlld1RvUmVzdG9yZSBhcyBhbnkgYXMgTFZpZXcpW0NPTlRFWFRdIGFzIHVua25vd24gYXMgVDtcbn1cblxuXG4vKipcbiAqIENsZWFycyB0aGUgdmlldyBzZXQgaW4gYMm1ybVyZXN0b3JlVmlld2AgZnJvbSBtZW1vcnkuIFJldHVybnMgdGhlIHBhc3NlZCBpblxuICogdmFsdWUgc28gdGhhdCBpdCBjYW4gYmUgdXNlZCBhcyBhIHJldHVybiB2YWx1ZSBvZiBhbiBpbnN0cnVjdGlvbi5cbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtXJlc2V0VmlldzxUPih2YWx1ZT86IFQpOiBUfHVuZGVmaW5lZCB7XG4gIGluc3RydWN0aW9uU3RhdGUubEZyYW1lLmNvbnRleHRMVmlldyA9IG51bGw7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFROb2RlKCk6IFROb2RlfG51bGwge1xuICBsZXQgY3VycmVudFROb2RlID0gZ2V0Q3VycmVudFROb2RlUGxhY2Vob2xkZXJPaygpO1xuICB3aGlsZSAoY3VycmVudFROb2RlICE9PSBudWxsICYmIGN1cnJlbnRUTm9kZS50eXBlID09PSBUTm9kZVR5cGUuUGxhY2Vob2xkZXIpIHtcbiAgICBjdXJyZW50VE5vZGUgPSBjdXJyZW50VE5vZGUucGFyZW50O1xuICB9XG4gIHJldHVybiBjdXJyZW50VE5vZGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDdXJyZW50VE5vZGVQbGFjZWhvbGRlck9rKCk6IFROb2RlfG51bGwge1xuICByZXR1cm4gaW5zdHJ1Y3Rpb25TdGF0ZS5sRnJhbWUuY3VycmVudFROb2RlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFBhcmVudFROb2RlKCk6IFROb2RlfG51bGwge1xuICBjb25zdCBsRnJhbWUgPSBpbnN0cnVjdGlvblN0YXRlLmxGcmFtZTtcbiAgY29uc3QgY3VycmVudFROb2RlID0gbEZyYW1lLmN1cnJlbnRUTm9kZTtcbiAgcmV0dXJuIGxGcmFtZS5pc1BhcmVudCA/IGN1cnJlbnRUTm9kZSA6IGN1cnJlbnRUTm9kZSEucGFyZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0Q3VycmVudFROb2RlKHROb2RlOiBUTm9kZXxudWxsLCBpc1BhcmVudDogYm9vbGVhbikge1xuICBuZ0Rldk1vZGUgJiYgdE5vZGUgJiYgYXNzZXJ0VE5vZGVGb3JUVmlldyh0Tm9kZSwgaW5zdHJ1Y3Rpb25TdGF0ZS5sRnJhbWUudFZpZXcpO1xuICBjb25zdCBsRnJhbWUgPSBpbnN0cnVjdGlvblN0YXRlLmxGcmFtZTtcbiAgbEZyYW1lLmN1cnJlbnRUTm9kZSA9IHROb2RlO1xuICBsRnJhbWUuaXNQYXJlbnQgPSBpc1BhcmVudDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ3VycmVudFROb2RlUGFyZW50KCk6IGJvb2xlYW4ge1xuICByZXR1cm4gaW5zdHJ1Y3Rpb25TdGF0ZS5sRnJhbWUuaXNQYXJlbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRDdXJyZW50VE5vZGVBc05vdFBhcmVudCgpOiB2b2lkIHtcbiAgaW5zdHJ1Y3Rpb25TdGF0ZS5sRnJhbWUuaXNQYXJlbnQgPSBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbnRleHRMVmlldygpOiBMVmlldyB7XG4gIGNvbnN0IGNvbnRleHRMVmlldyA9IGluc3RydWN0aW9uU3RhdGUubEZyYW1lLmNvbnRleHRMVmlldztcbiAgbmdEZXZNb2RlICYmIGFzc2VydERlZmluZWQoY29udGV4dExWaWV3LCAnY29udGV4dExWaWV3IG11c3QgYmUgZGVmaW5lZC4nKTtcbiAgcmV0dXJuIGNvbnRleHRMVmlldyE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0luQ2hlY2tOb0NoYW5nZXNNb2RlKCk6IGJvb2xlYW4ge1xuICAhbmdEZXZNb2RlICYmIHRocm93RXJyb3IoJ011c3QgbmV2ZXIgYmUgY2FsbGVkIGluIHByb2R1Y3Rpb24gbW9kZScpO1xuICByZXR1cm4gX2lzSW5DaGVja05vQ2hhbmdlc01vZGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRJc0luQ2hlY2tOb0NoYW5nZXNNb2RlKG1vZGU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgIW5nRGV2TW9kZSAmJiB0aHJvd0Vycm9yKCdNdXN0IG5ldmVyIGJlIGNhbGxlZCBpbiBwcm9kdWN0aW9uIG1vZGUnKTtcbiAgX2lzSW5DaGVja05vQ2hhbmdlc01vZGUgPSBtb2RlO1xufVxuXG4vLyB0b3AgbGV2ZWwgdmFyaWFibGVzIHNob3VsZCBub3QgYmUgZXhwb3J0ZWQgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMgKFBFUkZfTk9URVMubWQpXG5leHBvcnQgZnVuY3Rpb24gZ2V0QmluZGluZ1Jvb3QoKSB7XG4gIGNvbnN0IGxGcmFtZSA9IGluc3RydWN0aW9uU3RhdGUubEZyYW1lO1xuICBsZXQgaW5kZXggPSBsRnJhbWUuYmluZGluZ1Jvb3RJbmRleDtcbiAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgIGluZGV4ID0gbEZyYW1lLmJpbmRpbmdSb290SW5kZXggPSBsRnJhbWUudFZpZXcuYmluZGluZ1N0YXJ0SW5kZXg7XG4gIH1cbiAgcmV0dXJuIGluZGV4O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QmluZGluZ0luZGV4KCk6IG51bWJlciB7XG4gIHJldHVybiBpbnN0cnVjdGlvblN0YXRlLmxGcmFtZS5iaW5kaW5nSW5kZXg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRCaW5kaW5nSW5kZXgodmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBpbnN0cnVjdGlvblN0YXRlLmxGcmFtZS5iaW5kaW5nSW5kZXggPSB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5leHRCaW5kaW5nSW5kZXgoKTogbnVtYmVyIHtcbiAgcmV0dXJuIGluc3RydWN0aW9uU3RhdGUubEZyYW1lLmJpbmRpbmdJbmRleCsrO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5jcmVtZW50QmluZGluZ0luZGV4KGNvdW50OiBudW1iZXIpOiBudW1iZXIge1xuICBjb25zdCBsRnJhbWUgPSBpbnN0cnVjdGlvblN0YXRlLmxGcmFtZTtcbiAgY29uc3QgaW5kZXggPSBsRnJhbWUuYmluZGluZ0luZGV4O1xuICBsRnJhbWUuYmluZGluZ0luZGV4ID0gbEZyYW1lLmJpbmRpbmdJbmRleCArIGNvdW50O1xuICByZXR1cm4gaW5kZXg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0luSTE4bkJsb2NrKCkge1xuICByZXR1cm4gaW5zdHJ1Y3Rpb25TdGF0ZS5sRnJhbWUuaW5JMThuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0SW5JMThuQmxvY2soaXNJbkkxOG5CbG9jazogYm9vbGVhbik6IHZvaWQge1xuICBpbnN0cnVjdGlvblN0YXRlLmxGcmFtZS5pbkkxOG4gPSBpc0luSTE4bkJsb2NrO1xufVxuXG4vKipcbiAqIFNldCBhIG5ldyBiaW5kaW5nIHJvb3QgaW5kZXggc28gdGhhdCBob3N0IHRlbXBsYXRlIGZ1bmN0aW9ucyBjYW4gZXhlY3V0ZS5cbiAqXG4gKiBCaW5kaW5ncyBpbnNpZGUgdGhlIGhvc3QgdGVtcGxhdGUgYXJlIDAgaW5kZXguIEJ1dCBiZWNhdXNlIHdlIGRvbid0IGtub3cgYWhlYWQgb2YgdGltZVxuICogaG93IG1hbnkgaG9zdCBiaW5kaW5ncyB3ZSBoYXZlIHdlIGNhbid0IHByZS1jb21wdXRlIHRoZW0uIEZvciB0aGlzIHJlYXNvbiB0aGV5IGFyZSBhbGxcbiAqIDAgaW5kZXggYW5kIHdlIGp1c3Qgc2hpZnQgdGhlIHJvb3Qgc28gdGhhdCB0aGV5IG1hdGNoIG5leHQgYXZhaWxhYmxlIGxvY2F0aW9uIGluIHRoZSBMVmlldy5cbiAqXG4gKiBAcGFyYW0gYmluZGluZ1Jvb3RJbmRleCBSb290IGluZGV4IGZvciBgaG9zdEJpbmRpbmdzYFxuICogQHBhcmFtIGN1cnJlbnREaXJlY3RpdmVJbmRleCBgVERhdGFbY3VycmVudERpcmVjdGl2ZUluZGV4XWAgd2lsbCBwb2ludCB0byB0aGUgY3VycmVudCBkaXJlY3RpdmVcbiAqICAgICAgICB3aG9zZSBgaG9zdEJpbmRpbmdzYCBhcmUgYmVpbmcgcHJvY2Vzc2VkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0QmluZGluZ1Jvb3RGb3JIb3N0QmluZGluZ3MoXG4gICAgYmluZGluZ1Jvb3RJbmRleDogbnVtYmVyLCBjdXJyZW50RGlyZWN0aXZlSW5kZXg6IG51bWJlcikge1xuICBjb25zdCBsRnJhbWUgPSBpbnN0cnVjdGlvblN0YXRlLmxGcmFtZTtcbiAgbEZyYW1lLmJpbmRpbmdJbmRleCA9IGxGcmFtZS5iaW5kaW5nUm9vdEluZGV4ID0gYmluZGluZ1Jvb3RJbmRleDtcbiAgc2V0Q3VycmVudERpcmVjdGl2ZUluZGV4KGN1cnJlbnREaXJlY3RpdmVJbmRleCk7XG59XG5cbi8qKlxuICogV2hlbiBob3N0IGJpbmRpbmcgaXMgZXhlY3V0aW5nIHRoaXMgcG9pbnRzIHRvIHRoZSBkaXJlY3RpdmUgaW5kZXguXG4gKiBgVFZpZXcuZGF0YVtnZXRDdXJyZW50RGlyZWN0aXZlSW5kZXgoKV1gIGlzIGBEaXJlY3RpdmVEZWZgXG4gKiBgTFZpZXdbZ2V0Q3VycmVudERpcmVjdGl2ZUluZGV4KCldYCBpcyBkaXJlY3RpdmUgaW5zdGFuY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDdXJyZW50RGlyZWN0aXZlSW5kZXgoKTogbnVtYmVyIHtcbiAgcmV0dXJuIGluc3RydWN0aW9uU3RhdGUubEZyYW1lLmN1cnJlbnREaXJlY3RpdmVJbmRleDtcbn1cblxuLyoqXG4gKiBTZXRzIGFuIGluZGV4IG9mIGEgZGlyZWN0aXZlIHdob3NlIGBob3N0QmluZGluZ3NgIGFyZSBiZWluZyBwcm9jZXNzZWQuXG4gKlxuICogQHBhcmFtIGN1cnJlbnREaXJlY3RpdmVJbmRleCBgVERhdGFgIGluZGV4IHdoZXJlIGN1cnJlbnQgZGlyZWN0aXZlIGluc3RhbmNlIGNhbiBiZSBmb3VuZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEN1cnJlbnREaXJlY3RpdmVJbmRleChjdXJyZW50RGlyZWN0aXZlSW5kZXg6IG51bWJlcik6IHZvaWQge1xuICBpbnN0cnVjdGlvblN0YXRlLmxGcmFtZS5jdXJyZW50RGlyZWN0aXZlSW5kZXggPSBjdXJyZW50RGlyZWN0aXZlSW5kZXg7XG59XG5cbi8qKlxuICogUmV0cmlldmUgdGhlIGN1cnJlbnQgYERpcmVjdGl2ZURlZmAgd2hpY2ggaXMgYWN0aXZlIHdoZW4gYGhvc3RCaW5kaW5nc2AgaW5zdHJ1Y3Rpb24gaXMgYmVpbmdcbiAqIGV4ZWN1dGVkLlxuICpcbiAqIEBwYXJhbSB0RGF0YSBDdXJyZW50IGBURGF0YWAgd2hlcmUgdGhlIGBEaXJlY3RpdmVEZWZgIHdpbGwgYmUgbG9va2VkIHVwIGF0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudERpcmVjdGl2ZURlZih0RGF0YTogVERhdGEpOiBEaXJlY3RpdmVEZWY8YW55PnxudWxsIHtcbiAgY29uc3QgY3VycmVudERpcmVjdGl2ZUluZGV4ID0gaW5zdHJ1Y3Rpb25TdGF0ZS5sRnJhbWUuY3VycmVudERpcmVjdGl2ZUluZGV4O1xuICByZXR1cm4gY3VycmVudERpcmVjdGl2ZUluZGV4ID09PSAtMSA/IG51bGwgOiB0RGF0YVtjdXJyZW50RGlyZWN0aXZlSW5kZXhdIGFzIERpcmVjdGl2ZURlZjxhbnk+O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFF1ZXJ5SW5kZXgoKTogbnVtYmVyIHtcbiAgcmV0dXJuIGluc3RydWN0aW9uU3RhdGUubEZyYW1lLmN1cnJlbnRRdWVyeUluZGV4O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0Q3VycmVudFF1ZXJ5SW5kZXgodmFsdWU6IG51bWJlcik6IHZvaWQge1xuICBpbnN0cnVjdGlvblN0YXRlLmxGcmFtZS5jdXJyZW50UXVlcnlJbmRleCA9IHZhbHVlO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBgVE5vZGVgIG9mIHRoZSBsb2NhdGlvbiB3aGVyZSB0aGUgY3VycmVudCBgTFZpZXdgIGlzIGRlY2xhcmVkIGF0LlxuICpcbiAqIEBwYXJhbSBsVmlldyBhbiBgTFZpZXdgIHRoYXQgd2Ugd2FudCB0byBmaW5kIHBhcmVudCBgVE5vZGVgIGZvci5cbiAqL1xuZnVuY3Rpb24gZ2V0RGVjbGFyYXRpb25UTm9kZShsVmlldzogTFZpZXcpOiBUTm9kZXxudWxsIHtcbiAgY29uc3QgdFZpZXcgPSBsVmlld1tUVklFV107XG5cbiAgLy8gUmV0dXJuIHRoZSBkZWNsYXJhdGlvbiBwYXJlbnQgZm9yIGVtYmVkZGVkIHZpZXdzXG4gIGlmICh0Vmlldy50eXBlID09PSBUVmlld1R5cGUuRW1iZWRkZWQpIHtcbiAgICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RGVmaW5lZCh0Vmlldy5kZWNsVE5vZGUsICdFbWJlZGRlZCBUTm9kZXMgc2hvdWxkIGhhdmUgZGVjbGFyYXRpb24gcGFyZW50cy4nKTtcbiAgICByZXR1cm4gdFZpZXcuZGVjbFROb2RlO1xuICB9XG5cbiAgLy8gQ29tcG9uZW50cyBkb24ndCBoYXZlIGBUVmlldy5kZWNsVE5vZGVgIGJlY2F1c2UgZWFjaCBpbnN0YW5jZSBvZiBjb21wb25lbnQgY291bGQgYmVcbiAgLy8gaW5zZXJ0ZWQgaW4gZGlmZmVyZW50IGxvY2F0aW9uLCBoZW5jZSBgVFZpZXcuZGVjbFROb2RlYCBpcyBtZWFuaW5nbGVzcy5cbiAgLy8gRmFsbGluZyBiYWNrIHRvIGBUX0hPU1RgIGluIGNhc2Ugd2UgY3Jvc3MgY29tcG9uZW50IGJvdW5kYXJ5LlxuICBpZiAodFZpZXcudHlwZSA9PT0gVFZpZXdUeXBlLkNvbXBvbmVudCkge1xuICAgIHJldHVybiBsVmlld1tUX0hPU1RdO1xuICB9XG5cbiAgLy8gUmVtYWluaW5nIFROb2RlIHR5cGUgaXMgYFRWaWV3VHlwZS5Sb290YCB3aGljaCBkb2Vzbid0IGhhdmUgYSBwYXJlbnQgVE5vZGUuXG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIFRoaXMgaXMgYSBsaWdodCB3ZWlnaHQgdmVyc2lvbiBvZiB0aGUgYGVudGVyVmlld2Agd2hpY2ggaXMgbmVlZGVkIGJ5IHRoZSBESSBzeXN0ZW0uXG4gKlxuICogQHBhcmFtIGxWaWV3IGBMVmlld2AgbG9jYXRpb24gb2YgdGhlIERJIGNvbnRleHQuXG4gKiBAcGFyYW0gdE5vZGUgYFROb2RlYCBmb3IgREkgY29udGV4dFxuICogQHBhcmFtIGZsYWdzIERJIGNvbnRleHQgZmxhZ3MuIGlmIGBTa2lwU2VsZmAgZmxhZyBpcyBzZXQgdGhhbiB3ZSB3YWxrIHVwIHRoZSBkZWNsYXJhdGlvblxuICogICAgIHRyZWUgZnJvbSBgdE5vZGVgICB1bnRpbCB3ZSBmaW5kIHBhcmVudCBkZWNsYXJlZCBgVEVsZW1lbnROb2RlYC5cbiAqIEByZXR1cm5zIGB0cnVlYCBpZiB3ZSBoYXZlIHN1Y2Nlc3NmdWxseSBlbnRlcmVkIERJIGFzc29jaWF0ZWQgd2l0aCBgdE5vZGVgIChvciB3aXRoIGRlY2xhcmVkXG4gKiAgICAgYFROb2RlYCBpZiBgZmxhZ3NgIGhhcyAgYFNraXBTZWxmYCkuIEZhaWxpbmcgdG8gZW50ZXIgREkgaW1wbGllcyB0aGF0IG5vIGFzc29jaWF0ZWRcbiAqICAgICBgTm9kZUluamVjdG9yYCBjYW4gYmUgZm91bmQgYW5kIHdlIHNob3VsZCBpbnN0ZWFkIHVzZSBgTW9kdWxlSW5qZWN0b3JgLlxuICogICAgIC0gSWYgYHRydWVgIHRoYW4gdGhpcyBjYWxsIG11c3QgYmUgZmFsbG93ZWQgYnkgYGxlYXZlRElgXG4gKiAgICAgLSBJZiBgZmFsc2VgIHRoYW4gdGhpcyBjYWxsIGZhaWxlZCBhbmQgd2Ugc2hvdWxkIE5PVCBjYWxsIGBsZWF2ZURJYFxuICovXG5leHBvcnQgZnVuY3Rpb24gZW50ZXJESShsVmlldzogTFZpZXcsIHROb2RlOiBUTm9kZSwgZmxhZ3M6IEluamVjdEZsYWdzKSB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnRMVmlld09yVW5kZWZpbmVkKGxWaWV3KTtcblxuICBpZiAoZmxhZ3MgJiBJbmplY3RGbGFncy5Ta2lwU2VsZikge1xuICAgIG5nRGV2TW9kZSAmJiBhc3NlcnRUTm9kZUZvclRWaWV3KHROb2RlLCBsVmlld1tUVklFV10pO1xuXG4gICAgbGV0IHBhcmVudFROb2RlID0gdE5vZGUgYXMgVE5vZGUgfCBudWxsO1xuICAgIGxldCBwYXJlbnRMVmlldyA9IGxWaWV3O1xuXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIG5nRGV2TW9kZSAmJiBhc3NlcnREZWZpbmVkKHBhcmVudFROb2RlLCAnUGFyZW50IFROb2RlIHNob3VsZCBiZSBkZWZpbmVkJyk7XG4gICAgICBwYXJlbnRUTm9kZSA9IHBhcmVudFROb2RlIS5wYXJlbnQgYXMgVE5vZGUgfCBudWxsO1xuICAgICAgaWYgKHBhcmVudFROb2RlID09PSBudWxsICYmICEoZmxhZ3MgJiBJbmplY3RGbGFncy5Ib3N0KSkge1xuICAgICAgICBwYXJlbnRUTm9kZSA9IGdldERlY2xhcmF0aW9uVE5vZGUocGFyZW50TFZpZXcpO1xuICAgICAgICBpZiAocGFyZW50VE5vZGUgPT09IG51bGwpIGJyZWFrO1xuXG4gICAgICAgIC8vIEluIHRoaXMgY2FzZSwgYSBwYXJlbnQgZXhpc3RzIGFuZCBpcyBkZWZpbml0ZWx5IGFuIGVsZW1lbnQuIFNvIGl0IHdpbGwgZGVmaW5pdGVseVxuICAgICAgICAvLyBoYXZlIGFuIGV4aXN0aW5nIGxWaWV3IGFzIHRoZSBkZWNsYXJhdGlvbiB2aWV3LCB3aGljaCBpcyB3aHkgd2UgY2FuIGFzc3VtZSBpdCdzIGRlZmluZWQuXG4gICAgICAgIG5nRGV2TW9kZSAmJiBhc3NlcnREZWZpbmVkKHBhcmVudExWaWV3LCAnUGFyZW50IExWaWV3IHNob3VsZCBiZSBkZWZpbmVkJyk7XG4gICAgICAgIHBhcmVudExWaWV3ID0gcGFyZW50TFZpZXdbREVDTEFSQVRJT05fVklFV10hO1xuXG4gICAgICAgIC8vIEluIEl2eSB0aGVyZSBhcmUgQ29tbWVudCBub2RlcyB0aGF0IGNvcnJlc3BvbmQgdG8gbmdJZiBhbmQgTmdGb3IgZW1iZWRkZWQgZGlyZWN0aXZlc1xuICAgICAgICAvLyBXZSB3YW50IHRvIHNraXAgdGhvc2UgYW5kIGxvb2sgb25seSBhdCBFbGVtZW50cyBhbmQgRWxlbWVudENvbnRhaW5lcnMgdG8gZW5zdXJlXG4gICAgICAgIC8vIHdlJ3JlIGxvb2tpbmcgYXQgdHJ1ZSBwYXJlbnQgbm9kZXMsIGFuZCBub3QgY29udGVudCBvciBvdGhlciB0eXBlcy5cbiAgICAgICAgaWYgKHBhcmVudFROb2RlLnR5cGUgJiAoVE5vZGVUeXBlLkVsZW1lbnQgfCBUTm9kZVR5cGUuRWxlbWVudENvbnRhaW5lcikpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwYXJlbnRUTm9kZSA9PT0gbnVsbCkge1xuICAgICAgLy8gSWYgd2UgZmFpbGVkIHRvIGZpbmQgYSBwYXJlbnQgVE5vZGUgdGhpcyBtZWFucyB0aGF0IHdlIHNob3VsZCB1c2UgbW9kdWxlIGluamVjdG9yLlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0Tm9kZSA9IHBhcmVudFROb2RlO1xuICAgICAgbFZpZXcgPSBwYXJlbnRMVmlldztcbiAgICB9XG4gIH1cblxuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0VE5vZGVGb3JMVmlldyh0Tm9kZSwgbFZpZXcpO1xuICBjb25zdCBsRnJhbWUgPSBpbnN0cnVjdGlvblN0YXRlLmxGcmFtZSA9IGFsbG9jTEZyYW1lKCk7XG4gIGxGcmFtZS5jdXJyZW50VE5vZGUgPSB0Tm9kZTtcbiAgbEZyYW1lLmxWaWV3ID0gbFZpZXc7XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogU3dhcCB0aGUgY3VycmVudCBsVmlldyB3aXRoIGEgbmV3IGxWaWV3LlxuICpcbiAqIEZvciBwZXJmb3JtYW5jZSByZWFzb25zIHdlIHN0b3JlIHRoZSBsVmlldyBpbiB0aGUgdG9wIGxldmVsIG9mIHRoZSBtb2R1bGUuXG4gKiBUaGlzIHdheSB3ZSBtaW5pbWl6ZSB0aGUgbnVtYmVyIG9mIHByb3BlcnRpZXMgdG8gcmVhZC4gV2hlbmV2ZXIgYSBuZXcgdmlld1xuICogaXMgZW50ZXJlZCB3ZSBoYXZlIHRvIHN0b3JlIHRoZSBsVmlldyBmb3IgbGF0ZXIsIGFuZCB3aGVuIHRoZSB2aWV3IGlzXG4gKiBleGl0ZWQgdGhlIHN0YXRlIGhhcyB0byBiZSByZXN0b3JlZFxuICpcbiAqIEBwYXJhbSBuZXdWaWV3IE5ldyBsVmlldyB0byBiZWNvbWUgYWN0aXZlXG4gKiBAcmV0dXJucyB0aGUgcHJldmlvdXNseSBhY3RpdmUgbFZpZXc7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbnRlclZpZXcobmV3VmlldzogTFZpZXcpOiB2b2lkIHtcbiAgbmdEZXZNb2RlICYmIGFzc2VydE5vdEVxdWFsKG5ld1ZpZXdbMF0sIG5ld1ZpZXdbMV0gYXMgYW55LCAnPz8/PycpO1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0TFZpZXdPclVuZGVmaW5lZChuZXdWaWV3KTtcbiAgY29uc3QgbmV3TEZyYW1lID0gYWxsb2NMRnJhbWUoKTtcbiAgaWYgKG5nRGV2TW9kZSkge1xuICAgIGFzc2VydEVxdWFsKG5ld0xGcmFtZS5pc1BhcmVudCwgdHJ1ZSwgJ0V4cGVjdGVkIGNsZWFuIExGcmFtZScpO1xuICAgIGFzc2VydEVxdWFsKG5ld0xGcmFtZS5sVmlldywgbnVsbCwgJ0V4cGVjdGVkIGNsZWFuIExGcmFtZScpO1xuICAgIGFzc2VydEVxdWFsKG5ld0xGcmFtZS50VmlldywgbnVsbCwgJ0V4cGVjdGVkIGNsZWFuIExGcmFtZScpO1xuICAgIGFzc2VydEVxdWFsKG5ld0xGcmFtZS5zZWxlY3RlZEluZGV4LCAtMSwgJ0V4cGVjdGVkIGNsZWFuIExGcmFtZScpO1xuICAgIGFzc2VydEVxdWFsKG5ld0xGcmFtZS5lbGVtZW50RGVwdGhDb3VudCwgMCwgJ0V4cGVjdGVkIGNsZWFuIExGcmFtZScpO1xuICAgIGFzc2VydEVxdWFsKG5ld0xGcmFtZS5jdXJyZW50RGlyZWN0aXZlSW5kZXgsIC0xLCAnRXhwZWN0ZWQgY2xlYW4gTEZyYW1lJyk7XG4gICAgYXNzZXJ0RXF1YWwobmV3TEZyYW1lLmN1cnJlbnROYW1lc3BhY2UsIG51bGwsICdFeHBlY3RlZCBjbGVhbiBMRnJhbWUnKTtcbiAgICBhc3NlcnRFcXVhbChuZXdMRnJhbWUuYmluZGluZ1Jvb3RJbmRleCwgLTEsICdFeHBlY3RlZCBjbGVhbiBMRnJhbWUnKTtcbiAgICBhc3NlcnRFcXVhbChuZXdMRnJhbWUuY3VycmVudFF1ZXJ5SW5kZXgsIDAsICdFeHBlY3RlZCBjbGVhbiBMRnJhbWUnKTtcbiAgfVxuICBjb25zdCB0VmlldyA9IG5ld1ZpZXdbVFZJRVddO1xuICBpbnN0cnVjdGlvblN0YXRlLmxGcmFtZSA9IG5ld0xGcmFtZTtcbiAgbmdEZXZNb2RlICYmIHRWaWV3LmZpcnN0Q2hpbGQgJiYgYXNzZXJ0VE5vZGVGb3JUVmlldyh0Vmlldy5maXJzdENoaWxkLCB0Vmlldyk7XG4gIG5ld0xGcmFtZS5jdXJyZW50VE5vZGUgPSB0Vmlldy5maXJzdENoaWxkITtcbiAgbmV3TEZyYW1lLmxWaWV3ID0gbmV3VmlldztcbiAgbmV3TEZyYW1lLnRWaWV3ID0gdFZpZXc7XG4gIG5ld0xGcmFtZS5jb250ZXh0TFZpZXcgPSBuZXdWaWV3O1xuICBuZXdMRnJhbWUuYmluZGluZ0luZGV4ID0gdFZpZXcuYmluZGluZ1N0YXJ0SW5kZXg7XG4gIG5ld0xGcmFtZS5pbkkxOG4gPSBmYWxzZTtcbn1cblxuLyoqXG4gKiBBbGxvY2F0ZXMgbmV4dCBmcmVlIExGcmFtZS4gVGhpcyBmdW5jdGlvbiB0cmllcyB0byByZXVzZSB0aGUgYExGcmFtZWBzIHRvIGxvd2VyIG1lbW9yeSBwcmVzc3VyZS5cbiAqL1xuZnVuY3Rpb24gYWxsb2NMRnJhbWUoKSB7XG4gIGNvbnN0IGN1cnJlbnRMRnJhbWUgPSBpbnN0cnVjdGlvblN0YXRlLmxGcmFtZTtcbiAgY29uc3QgY2hpbGRMRnJhbWUgPSBjdXJyZW50TEZyYW1lID09PSBudWxsID8gbnVsbCA6IGN1cnJlbnRMRnJhbWUuY2hpbGQ7XG4gIGNvbnN0IG5ld0xGcmFtZSA9IGNoaWxkTEZyYW1lID09PSBudWxsID8gY3JlYXRlTEZyYW1lKGN1cnJlbnRMRnJhbWUpIDogY2hpbGRMRnJhbWU7XG4gIHJldHVybiBuZXdMRnJhbWU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxGcmFtZShwYXJlbnQ6IExGcmFtZXxudWxsKTogTEZyYW1lIHtcbiAgY29uc3QgbEZyYW1lOiBMRnJhbWUgPSB7XG4gICAgY3VycmVudFROb2RlOiBudWxsLFxuICAgIGlzUGFyZW50OiB0cnVlLFxuICAgIGxWaWV3OiBudWxsISxcbiAgICB0VmlldzogbnVsbCEsXG4gICAgc2VsZWN0ZWRJbmRleDogLTEsXG4gICAgY29udGV4dExWaWV3OiBudWxsLFxuICAgIGVsZW1lbnREZXB0aENvdW50OiAwLFxuICAgIGN1cnJlbnROYW1lc3BhY2U6IG51bGwsXG4gICAgY3VycmVudERpcmVjdGl2ZUluZGV4OiAtMSxcbiAgICBiaW5kaW5nUm9vdEluZGV4OiAtMSxcbiAgICBiaW5kaW5nSW5kZXg6IC0xLFxuICAgIGN1cnJlbnRRdWVyeUluZGV4OiAwLFxuICAgIHBhcmVudDogcGFyZW50ISxcbiAgICBjaGlsZDogbnVsbCxcbiAgICBpbkkxOG46IGZhbHNlLFxuICB9O1xuICBwYXJlbnQgIT09IG51bGwgJiYgKHBhcmVudC5jaGlsZCA9IGxGcmFtZSk7ICAvLyBsaW5rIHRoZSBuZXcgTEZyYW1lIGZvciByZXVzZS5cbiAgcmV0dXJuIGxGcmFtZTtcbn1cblxuLyoqXG4gKiBBIGxpZ2h0d2VpZ2h0IHZlcnNpb24gb2YgbGVhdmUgd2hpY2ggaXMgdXNlZCB3aXRoIERJLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gb25seSByZXNldHMgYGN1cnJlbnRUTm9kZWAgYW5kIGBMVmlld2AgYXMgdGhvc2UgYXJlIHRoZSBvbmx5IHByb3BlcnRpZXNcbiAqIHVzZWQgd2l0aCBESSAoYGVudGVyREkoKWApLlxuICpcbiAqIE5PVEU6IFRoaXMgZnVuY3Rpb24gaXMgcmVleHBvcnRlZCBhcyBgbGVhdmVESWAuIEhvd2V2ZXIgYGxlYXZlRElgIGhhcyByZXR1cm4gdHlwZSBvZiBgdm9pZGAgd2hlcmVcbiAqIGFzIGBsZWF2ZVZpZXdMaWdodGAgaGFzIGBMRnJhbWVgLiBUaGlzIGlzIHNvIHRoYXQgYGxlYXZlVmlld0xpZ2h0YCBjYW4gYmUgdXNlZCBpbiBgbGVhdmVWaWV3YC5cbiAqL1xuZnVuY3Rpb24gbGVhdmVWaWV3TGlnaHQoKTogTEZyYW1lIHtcbiAgY29uc3Qgb2xkTEZyYW1lID0gaW5zdHJ1Y3Rpb25TdGF0ZS5sRnJhbWU7XG4gIGluc3RydWN0aW9uU3RhdGUubEZyYW1lID0gb2xkTEZyYW1lLnBhcmVudDtcbiAgb2xkTEZyYW1lLmN1cnJlbnRUTm9kZSA9IG51bGwhO1xuICBvbGRMRnJhbWUubFZpZXcgPSBudWxsITtcbiAgcmV0dXJuIG9sZExGcmFtZTtcbn1cblxuLyoqXG4gKiBUaGlzIGlzIGEgbGlnaHR3ZWlnaHQgdmVyc2lvbiBvZiB0aGUgYGxlYXZlVmlld2Agd2hpY2ggaXMgbmVlZGVkIGJ5IHRoZSBESSBzeXN0ZW0uXG4gKlxuICogTk9URTogdGhpcyBmdW5jdGlvbiBpcyBhbiBhbGlhcyBzbyB0aGF0IHdlIGNhbiBjaGFuZ2UgdGhlIHR5cGUgb2YgdGhlIGZ1bmN0aW9uIHRvIGhhdmUgYHZvaWRgXG4gKiByZXR1cm4gdHlwZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGxlYXZlREk6ICgpID0+IHZvaWQgPSBsZWF2ZVZpZXdMaWdodDtcblxuLyoqXG4gKiBMZWF2ZSB0aGUgY3VycmVudCBgTFZpZXdgXG4gKlxuICogVGhpcyBwb3BzIHRoZSBgTEZyYW1lYCB3aXRoIHRoZSBhc3NvY2lhdGVkIGBMVmlld2AgZnJvbSB0aGUgc3RhY2suXG4gKlxuICogSU1QT1JUQU5UOiBXZSBtdXN0IHplcm8gb3V0IHRoZSBgTEZyYW1lYCB2YWx1ZXMgaGVyZSBvdGhlcndpc2UgdGhleSB3aWxsIGJlIHJldGFpbmVkLiBUaGlzIGlzXG4gKiBiZWNhdXNlIGZvciBwZXJmb3JtYW5jZSByZWFzb25zIHdlIGRvbid0IHJlbGVhc2UgYExGcmFtZWAgYnV0IHJhdGhlciBrZWVwIGl0IGZvciBuZXh0IHVzZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxlYXZlVmlldygpIHtcbiAgY29uc3Qgb2xkTEZyYW1lID0gbGVhdmVWaWV3TGlnaHQoKTtcbiAgb2xkTEZyYW1lLmlzUGFyZW50ID0gdHJ1ZTtcbiAgb2xkTEZyYW1lLnRWaWV3ID0gbnVsbCE7XG4gIG9sZExGcmFtZS5zZWxlY3RlZEluZGV4ID0gLTE7XG4gIG9sZExGcmFtZS5jb250ZXh0TFZpZXcgPSBudWxsO1xuICBvbGRMRnJhbWUuZWxlbWVudERlcHRoQ291bnQgPSAwO1xuICBvbGRMRnJhbWUuY3VycmVudERpcmVjdGl2ZUluZGV4ID0gLTE7XG4gIG9sZExGcmFtZS5jdXJyZW50TmFtZXNwYWNlID0gbnVsbDtcbiAgb2xkTEZyYW1lLmJpbmRpbmdSb290SW5kZXggPSAtMTtcbiAgb2xkTEZyYW1lLmJpbmRpbmdJbmRleCA9IC0xO1xuICBvbGRMRnJhbWUuY3VycmVudFF1ZXJ5SW5kZXggPSAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmV4dENvbnRleHRJbXBsPFQgPSBhbnk+KGxldmVsOiBudW1iZXIpOiBUIHtcbiAgY29uc3QgY29udGV4dExWaWV3ID0gaW5zdHJ1Y3Rpb25TdGF0ZS5sRnJhbWUuY29udGV4dExWaWV3ID1cbiAgICAgIHdhbGtVcFZpZXdzKGxldmVsLCBpbnN0cnVjdGlvblN0YXRlLmxGcmFtZS5jb250ZXh0TFZpZXchKTtcbiAgcmV0dXJuIGNvbnRleHRMVmlld1tDT05URVhUXSBhcyB1bmtub3duIGFzIFQ7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGVsZW1lbnQgaW5kZXguXG4gKlxuICogVXNlZCB3aXRoIHtAbGluayBwcm9wZXJ0eX0gaW5zdHJ1Y3Rpb24gKGFuZCBtb3JlIGluIHRoZSBmdXR1cmUpIHRvIGlkZW50aWZ5IHRoZSBpbmRleCBpbiB0aGVcbiAqIGN1cnJlbnQgYExWaWV3YCB0byBhY3Qgb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTZWxlY3RlZEluZGV4KCkge1xuICByZXR1cm4gaW5zdHJ1Y3Rpb25TdGF0ZS5sRnJhbWUuc2VsZWN0ZWRJbmRleDtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBtb3N0IHJlY2VudCBpbmRleCBwYXNzZWQgdG8ge0BsaW5rIHNlbGVjdH1cbiAqXG4gKiBVc2VkIHdpdGgge0BsaW5rIHByb3BlcnR5fSBpbnN0cnVjdGlvbiAoYW5kIG1vcmUgaW4gdGhlIGZ1dHVyZSkgdG8gaWRlbnRpZnkgdGhlIGluZGV4IGluIHRoZVxuICogY3VycmVudCBgTFZpZXdgIHRvIGFjdCBvbi5cbiAqXG4gKiAoTm90ZSB0aGF0IGlmIGFuIFwiZXhpdCBmdW5jdGlvblwiIHdhcyBzZXQgZWFybGllciAodmlhIGBzZXRFbGVtZW50RXhpdEZuKClgKSB0aGVuIHRoYXQgd2lsbCBiZVxuICogcnVuIGlmIGFuZCB3aGVuIHRoZSBwcm92aWRlZCBgaW5kZXhgIHZhbHVlIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBjdXJyZW50IHNlbGVjdGVkIGluZGV4IHZhbHVlLilcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldFNlbGVjdGVkSW5kZXgoaW5kZXg6IG51bWJlcikge1xuICBuZ0Rldk1vZGUgJiYgaW5kZXggIT09IC0xICYmXG4gICAgICBhc3NlcnRHcmVhdGVyVGhhbk9yRXF1YWwoaW5kZXgsIEhFQURFUl9PRkZTRVQsICdJbmRleCBtdXN0IGJlIHBhc3QgSEVBREVSX09GRlNFVCAob3IgLTEpLicpO1xuICBuZ0Rldk1vZGUgJiZcbiAgICAgIGFzc2VydExlc3NUaGFuKFxuICAgICAgICAgIGluZGV4LCBpbnN0cnVjdGlvblN0YXRlLmxGcmFtZS5sVmlldy5sZW5ndGgsICdDYW5cXCd0IHNldCBpbmRleCBwYXNzZWQgZW5kIG9mIExWaWV3Jyk7XG4gIGluc3RydWN0aW9uU3RhdGUubEZyYW1lLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBgdE5vZGVgIHRoYXQgcmVwcmVzZW50cyBjdXJyZW50bHkgc2VsZWN0ZWQgZWxlbWVudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNlbGVjdGVkVE5vZGUoKSB7XG4gIGNvbnN0IGxGcmFtZSA9IGluc3RydWN0aW9uU3RhdGUubEZyYW1lO1xuICByZXR1cm4gZ2V0VE5vZGUobEZyYW1lLnRWaWV3LCBsRnJhbWUuc2VsZWN0ZWRJbmRleCk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgbmFtZXNwYWNlIHVzZWQgdG8gY3JlYXRlIGVsZW1lbnRzIHRvIGAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnYCBpbiBnbG9iYWwgc3RhdGUuXG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVuYW1lc3BhY2VTVkcoKSB7XG4gIGluc3RydWN0aW9uU3RhdGUubEZyYW1lLmN1cnJlbnROYW1lc3BhY2UgPSBTVkdfTkFNRVNQQUNFO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIG5hbWVzcGFjZSB1c2VkIHRvIGNyZWF0ZSBlbGVtZW50cyB0byBgJ2h0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aE1MLydgIGluIGdsb2JhbCBzdGF0ZS5cbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtW5hbWVzcGFjZU1hdGhNTCgpIHtcbiAgaW5zdHJ1Y3Rpb25TdGF0ZS5sRnJhbWUuY3VycmVudE5hbWVzcGFjZSA9IE1BVEhfTUxfTkFNRVNQQUNFO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIG5hbWVzcGFjZSB1c2VkIHRvIGNyZWF0ZSBlbGVtZW50cyB0byBgbnVsbGAsIHdoaWNoIGZvcmNlcyBlbGVtZW50IGNyZWF0aW9uIHRvIHVzZVxuICogYGNyZWF0ZUVsZW1lbnRgIHJhdGhlciB0aGFuIGBjcmVhdGVFbGVtZW50TlNgLlxuICpcbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1bmFtZXNwYWNlSFRNTCgpIHtcbiAgbmFtZXNwYWNlSFRNTEludGVybmFsKCk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgbmFtZXNwYWNlIHVzZWQgdG8gY3JlYXRlIGVsZW1lbnRzIHRvIGBudWxsYCwgd2hpY2ggZm9yY2VzIGVsZW1lbnQgY3JlYXRpb24gdG8gdXNlXG4gKiBgY3JlYXRlRWxlbWVudGAgcmF0aGVyIHRoYW4gYGNyZWF0ZUVsZW1lbnROU2AuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBuYW1lc3BhY2VIVE1MSW50ZXJuYWwoKSB7XG4gIGluc3RydWN0aW9uU3RhdGUubEZyYW1lLmN1cnJlbnROYW1lc3BhY2UgPSBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmFtZXNwYWNlKCk6IHN0cmluZ3xudWxsIHtcbiAgcmV0dXJuIGluc3RydWN0aW9uU3RhdGUubEZyYW1lLmN1cnJlbnROYW1lc3BhY2U7XG59XG5cbmxldCBfd2FzTGFzdE5vZGVDcmVhdGVkID0gdHJ1ZTtcblxuLyoqXG4gKiBSZXRyaWV2ZXMgYSBnbG9iYWwgZmxhZyB0aGF0IGluZGljYXRlcyB3aGV0aGVyIHRoZSBtb3N0IHJlY2VudCBET00gbm9kZVxuICogd2FzIGNyZWF0ZWQgb3IgaHlkcmF0ZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3YXNMYXN0Tm9kZUNyZWF0ZWQoKTogYm9vbGVhbiB7XG4gIHJldHVybiBfd2FzTGFzdE5vZGVDcmVhdGVkO1xufVxuXG4vKipcbiAqIFNldHMgYSBnbG9iYWwgZmxhZyB0byBpbmRpY2F0ZSB3aGV0aGVyIHRoZSBtb3N0IHJlY2VudCBET00gbm9kZVxuICogd2FzIGNyZWF0ZWQgb3IgaHlkcmF0ZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsYXN0Tm9kZVdhc0NyZWF0ZWQoZmxhZzogYm9vbGVhbik6IHZvaWQge1xuICBfd2FzTGFzdE5vZGVDcmVhdGVkID0gZmxhZztcbn1cbiJdfQ==