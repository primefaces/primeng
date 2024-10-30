/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertIndexInRange } from '../util/assert';
import { bindingUpdated, bindingUpdated2, bindingUpdated3, bindingUpdated4, getBinding, updateBinding } from './bindings';
import { getBindingRoot, getLView } from './state';
import { NO_CHANGE } from './tokens';
/**
 * Bindings for pure functions are stored after regular bindings.
 *
 * |-------decls------|---------vars---------|                 |----- hostVars (dir1) ------|
 * ------------------------------------------------------------------------------------------
 * | nodes/refs/pipes | bindings | fn slots  | injector | dir1 | host bindings | host slots |
 * ------------------------------------------------------------------------------------------
 *                    ^                      ^
 *      TView.bindingStartIndex      TView.expandoStartIndex
 *
 * Pure function instructions are given an offset from the binding root. Adding the offset to the
 * binding root gives the first index where the bindings are stored. In component views, the binding
 * root is the bindingStartIndex. In host bindings, the binding root is the expandoStartIndex +
 * any directive instances + any hostVars in directives evaluated before it.
 *
 * See VIEW_DATA.md for more information about host binding resolution.
 */
/**
 * If the value hasn't been saved, calls the pure function to store and return the
 * value. If it has been saved, returns the saved value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn Function that returns a value
 * @param thisArg Optional calling context of pureFn
 * @returns value
 *
 * @codeGenApi
 */
export function ɵɵpureFunction0(slotOffset, pureFn, thisArg) {
    const bindingIndex = getBindingRoot() + slotOffset;
    const lView = getLView();
    return lView[bindingIndex] === NO_CHANGE ?
        updateBinding(lView, bindingIndex, thisArg ? pureFn.call(thisArg) : pureFn()) :
        getBinding(lView, bindingIndex);
}
/**
 * If the value of the provided exp has changed, calls the pure function to return
 * an updated value. Or if the value has not changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn Function that returns an updated value
 * @param exp Updated expression value
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
export function ɵɵpureFunction1(slotOffset, pureFn, exp, thisArg) {
    return pureFunction1Internal(getLView(), getBindingRoot(), slotOffset, pureFn, exp, thisArg);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
export function ɵɵpureFunction2(slotOffset, pureFn, exp1, exp2, thisArg) {
    return pureFunction2Internal(getLView(), getBindingRoot(), slotOffset, pureFn, exp1, exp2, thisArg);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param exp3
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
export function ɵɵpureFunction3(slotOffset, pureFn, exp1, exp2, exp3, thisArg) {
    return pureFunction3Internal(getLView(), getBindingRoot(), slotOffset, pureFn, exp1, exp2, exp3, thisArg);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param exp3
 * @param exp4
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
export function ɵɵpureFunction4(slotOffset, pureFn, exp1, exp2, exp3, exp4, thisArg) {
    return pureFunction4Internal(getLView(), getBindingRoot(), slotOffset, pureFn, exp1, exp2, exp3, exp4, thisArg);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param exp3
 * @param exp4
 * @param exp5
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
export function ɵɵpureFunction5(slotOffset, pureFn, exp1, exp2, exp3, exp4, exp5, thisArg) {
    const bindingIndex = getBindingRoot() + slotOffset;
    const lView = getLView();
    const different = bindingUpdated4(lView, bindingIndex, exp1, exp2, exp3, exp4);
    return bindingUpdated(lView, bindingIndex + 4, exp5) || different ?
        updateBinding(lView, bindingIndex + 5, thisArg ? pureFn.call(thisArg, exp1, exp2, exp3, exp4, exp5) :
            pureFn(exp1, exp2, exp3, exp4, exp5)) :
        getBinding(lView, bindingIndex + 5);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param exp3
 * @param exp4
 * @param exp5
 * @param exp6
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
export function ɵɵpureFunction6(slotOffset, pureFn, exp1, exp2, exp3, exp4, exp5, exp6, thisArg) {
    const bindingIndex = getBindingRoot() + slotOffset;
    const lView = getLView();
    const different = bindingUpdated4(lView, bindingIndex, exp1, exp2, exp3, exp4);
    return bindingUpdated2(lView, bindingIndex + 4, exp5, exp6) || different ?
        updateBinding(lView, bindingIndex + 6, thisArg ? pureFn.call(thisArg, exp1, exp2, exp3, exp4, exp5, exp6) :
            pureFn(exp1, exp2, exp3, exp4, exp5, exp6)) :
        getBinding(lView, bindingIndex + 6);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param exp3
 * @param exp4
 * @param exp5
 * @param exp6
 * @param exp7
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
export function ɵɵpureFunction7(slotOffset, pureFn, exp1, exp2, exp3, exp4, exp5, exp6, exp7, thisArg) {
    const bindingIndex = getBindingRoot() + slotOffset;
    const lView = getLView();
    let different = bindingUpdated4(lView, bindingIndex, exp1, exp2, exp3, exp4);
    return bindingUpdated3(lView, bindingIndex + 4, exp5, exp6, exp7) || different ?
        updateBinding(lView, bindingIndex + 7, thisArg ? pureFn.call(thisArg, exp1, exp2, exp3, exp4, exp5, exp6, exp7) :
            pureFn(exp1, exp2, exp3, exp4, exp5, exp6, exp7)) :
        getBinding(lView, bindingIndex + 7);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param exp3
 * @param exp4
 * @param exp5
 * @param exp6
 * @param exp7
 * @param exp8
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
export function ɵɵpureFunction8(slotOffset, pureFn, exp1, exp2, exp3, exp4, exp5, exp6, exp7, exp8, thisArg) {
    const bindingIndex = getBindingRoot() + slotOffset;
    const lView = getLView();
    const different = bindingUpdated4(lView, bindingIndex, exp1, exp2, exp3, exp4);
    return bindingUpdated4(lView, bindingIndex + 4, exp5, exp6, exp7, exp8) || different ?
        updateBinding(lView, bindingIndex + 8, thisArg ? pureFn.call(thisArg, exp1, exp2, exp3, exp4, exp5, exp6, exp7, exp8) :
            pureFn(exp1, exp2, exp3, exp4, exp5, exp6, exp7, exp8)) :
        getBinding(lView, bindingIndex + 8);
}
/**
 * pureFunction instruction that can support any number of bindings.
 *
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn A pure function that takes binding values and builds an object or array
 * containing those values.
 * @param exps An array of binding values
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
export function ɵɵpureFunctionV(slotOffset, pureFn, exps, thisArg) {
    return pureFunctionVInternal(getLView(), getBindingRoot(), slotOffset, pureFn, exps, thisArg);
}
/**
 * Results of a pure function invocation are stored in LView in a dedicated slot that is initialized
 * to NO_CHANGE. In rare situations a pure pipe might throw an exception on the very first
 * invocation and not produce any valid results. In this case LView would keep holding the NO_CHANGE
 * value. The NO_CHANGE is not something that we can use in expressions / bindings thus we convert
 * it to `undefined`.
 */
function getPureFunctionReturnValue(lView, returnValueIndex) {
    ngDevMode && assertIndexInRange(lView, returnValueIndex);
    const lastReturnValue = lView[returnValueIndex];
    return lastReturnValue === NO_CHANGE ? undefined : lastReturnValue;
}
/**
 * If the value of the provided exp has changed, calls the pure function to return
 * an updated value. Or if the value has not changed, returns cached value.
 *
 * @param lView LView in which the function is being executed.
 * @param bindingRoot Binding root index.
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn Function that returns an updated value
 * @param exp Updated expression value
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 */
export function pureFunction1Internal(lView, bindingRoot, slotOffset, pureFn, exp, thisArg) {
    const bindingIndex = bindingRoot + slotOffset;
    return bindingUpdated(lView, bindingIndex, exp) ?
        updateBinding(lView, bindingIndex + 1, thisArg ? pureFn.call(thisArg, exp) : pureFn(exp)) :
        getPureFunctionReturnValue(lView, bindingIndex + 1);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param lView LView in which the function is being executed.
 * @param bindingRoot Binding root index.
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 */
export function pureFunction2Internal(lView, bindingRoot, slotOffset, pureFn, exp1, exp2, thisArg) {
    const bindingIndex = bindingRoot + slotOffset;
    return bindingUpdated2(lView, bindingIndex, exp1, exp2) ?
        updateBinding(lView, bindingIndex + 2, thisArg ? pureFn.call(thisArg, exp1, exp2) : pureFn(exp1, exp2)) :
        getPureFunctionReturnValue(lView, bindingIndex + 2);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param lView LView in which the function is being executed.
 * @param bindingRoot Binding root index.
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param exp3
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 */
export function pureFunction3Internal(lView, bindingRoot, slotOffset, pureFn, exp1, exp2, exp3, thisArg) {
    const bindingIndex = bindingRoot + slotOffset;
    return bindingUpdated3(lView, bindingIndex, exp1, exp2, exp3) ?
        updateBinding(lView, bindingIndex + 3, thisArg ? pureFn.call(thisArg, exp1, exp2, exp3) : pureFn(exp1, exp2, exp3)) :
        getPureFunctionReturnValue(lView, bindingIndex + 3);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param lView LView in which the function is being executed.
 * @param bindingRoot Binding root index.
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param exp3
 * @param exp4
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 */
export function pureFunction4Internal(lView, bindingRoot, slotOffset, pureFn, exp1, exp2, exp3, exp4, thisArg) {
    const bindingIndex = bindingRoot + slotOffset;
    return bindingUpdated4(lView, bindingIndex, exp1, exp2, exp3, exp4) ?
        updateBinding(lView, bindingIndex + 4, thisArg ? pureFn.call(thisArg, exp1, exp2, exp3, exp4) : pureFn(exp1, exp2, exp3, exp4)) :
        getPureFunctionReturnValue(lView, bindingIndex + 4);
}
/**
 * pureFunction instruction that can support any number of bindings.
 *
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param lView LView in which the function is being executed.
 * @param bindingRoot Binding root index.
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn A pure function that takes binding values and builds an object or array
 * containing those values.
 * @param exps An array of binding values
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 */
export function pureFunctionVInternal(lView, bindingRoot, slotOffset, pureFn, exps, thisArg) {
    let bindingIndex = bindingRoot + slotOffset;
    let different = false;
    for (let i = 0; i < exps.length; i++) {
        bindingUpdated(lView, bindingIndex++, exps[i]) && (different = true);
    }
    return different ? updateBinding(lView, bindingIndex, pureFn.apply(thisArg, exps)) :
        getPureFunctionReturnValue(lView, bindingIndex);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVyZV9mdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvcHVyZV9mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRCxPQUFPLEVBQUMsY0FBYyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFFeEgsT0FBTyxFQUFDLGNBQWMsRUFBRSxRQUFRLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDakQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUduQzs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUVIOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLFVBQVUsZUFBZSxDQUFJLFVBQWtCLEVBQUUsTUFBZSxFQUFFLE9BQWE7SUFDbkYsTUFBTSxZQUFZLEdBQUcsY0FBYyxFQUFFLEdBQUcsVUFBVSxDQUFDO0lBQ25ELE1BQU0sS0FBSyxHQUFHLFFBQVEsRUFBRSxDQUFDO0lBQ3pCLE9BQU8sS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9FLFVBQVUsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDdEMsQ0FBQztBQUVEOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSxVQUFVLGVBQWUsQ0FDM0IsVUFBa0IsRUFBRSxNQUF1QixFQUFFLEdBQVEsRUFBRSxPQUFhO0lBQ3RFLE9BQU8s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VyxFQUFFLE9BQWE7SUFDNUIsSUFBSSxZQUFZLEdBQUcsV0FBVyxHQUFHLFVBQVUsQ0FBQztJQUM1QyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDdEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNyQyxjQUFjLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFDRCxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLDBCQUEwQixDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztBQUNyRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7YXNzZXJ0SW5kZXhJblJhbmdlfSBmcm9tICcuLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQge2JpbmRpbmdVcGRhdGVkLCBiaW5kaW5nVXBkYXRlZDIsIGJpbmRpbmdVcGRhdGVkMywgYmluZGluZ1VwZGF0ZWQ0LCBnZXRCaW5kaW5nLCB1cGRhdGVCaW5kaW5nfSBmcm9tICcuL2JpbmRpbmdzJztcbmltcG9ydCB7TFZpZXd9IGZyb20gJy4vaW50ZXJmYWNlcy92aWV3JztcbmltcG9ydCB7Z2V0QmluZGluZ1Jvb3QsIGdldExWaWV3fSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7Tk9fQ0hBTkdFfSBmcm9tICcuL3Rva2Vucyc7XG5cblxuLyoqXG4gKiBCaW5kaW5ncyBmb3IgcHVyZSBmdW5jdGlvbnMgYXJlIHN0b3JlZCBhZnRlciByZWd1bGFyIGJpbmRpbmdzLlxuICpcbiAqIHwtLS0tLS0tZGVjbHMtLS0tLS18LS0tLS0tLS0tdmFycy0tLS0tLS0tLXwgICAgICAgICAgICAgICAgIHwtLS0tLSBob3N0VmFycyAoZGlyMSkgLS0tLS0tfFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiB8IG5vZGVzL3JlZnMvcGlwZXMgfCBiaW5kaW5ncyB8IGZuIHNsb3RzICB8IGluamVjdG9yIHwgZGlyMSB8IGhvc3QgYmluZGluZ3MgfCBob3N0IHNsb3RzIHxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogICAgICAgICAgICAgICAgICAgIF4gICAgICAgICAgICAgICAgICAgICAgXlxuICogICAgICBUVmlldy5iaW5kaW5nU3RhcnRJbmRleCAgICAgIFRWaWV3LmV4cGFuZG9TdGFydEluZGV4XG4gKlxuICogUHVyZSBmdW5jdGlvbiBpbnN0cnVjdGlvbnMgYXJlIGdpdmVuIGFuIG9mZnNldCBmcm9tIHRoZSBiaW5kaW5nIHJvb3QuIEFkZGluZyB0aGUgb2Zmc2V0IHRvIHRoZVxuICogYmluZGluZyByb290IGdpdmVzIHRoZSBmaXJzdCBpbmRleCB3aGVyZSB0aGUgYmluZGluZ3MgYXJlIHN0b3JlZC4gSW4gY29tcG9uZW50IHZpZXdzLCB0aGUgYmluZGluZ1xuICogcm9vdCBpcyB0aGUgYmluZGluZ1N0YXJ0SW5kZXguIEluIGhvc3QgYmluZGluZ3MsIHRoZSBiaW5kaW5nIHJvb3QgaXMgdGhlIGV4cGFuZG9TdGFydEluZGV4ICtcbiAqIGFueSBkaXJlY3RpdmUgaW5zdGFuY2VzICsgYW55IGhvc3RWYXJzIGluIGRpcmVjdGl2ZXMgZXZhbHVhdGVkIGJlZm9yZSBpdC5cbiAqXG4gKiBTZWUgVklFV19EQVRBLm1kIGZvciBtb3JlIGluZm9ybWF0aW9uIGFib3V0IGhvc3QgYmluZGluZyByZXNvbHV0aW9uLlxuICovXG5cbi8qKlxuICogSWYgdGhlIHZhbHVlIGhhc24ndCBiZWVuIHNhdmVkLCBjYWxscyB0aGUgcHVyZSBmdW5jdGlvbiB0byBzdG9yZSBhbmQgcmV0dXJuIHRoZVxuICogdmFsdWUuIElmIGl0IGhhcyBiZWVuIHNhdmVkLCByZXR1cm5zIHRoZSBzYXZlZCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0gc2xvdE9mZnNldCB0aGUgb2Zmc2V0IGZyb20gYmluZGluZyByb290IHRvIHRoZSByZXNlcnZlZCBzbG90XG4gKiBAcGFyYW0gcHVyZUZuIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHZhbHVlXG4gKiBAcGFyYW0gdGhpc0FyZyBPcHRpb25hbCBjYWxsaW5nIGNvbnRleHQgb2YgcHVyZUZuXG4gKiBAcmV0dXJucyB2YWx1ZVxuICpcbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1cHVyZUZ1bmN0aW9uMDxUPihzbG90T2Zmc2V0OiBudW1iZXIsIHB1cmVGbjogKCkgPT4gVCwgdGhpc0FyZz86IGFueSk6IFQge1xuICBjb25zdCBiaW5kaW5nSW5kZXggPSBnZXRCaW5kaW5nUm9vdCgpICsgc2xvdE9mZnNldDtcbiAgY29uc3QgbFZpZXcgPSBnZXRMVmlldygpO1xuICByZXR1cm4gbFZpZXdbYmluZGluZ0luZGV4XSA9PT0gTk9fQ0hBTkdFID9cbiAgICAgIHVwZGF0ZUJpbmRpbmcobFZpZXcsIGJpbmRpbmdJbmRleCwgdGhpc0FyZyA/IHB1cmVGbi5jYWxsKHRoaXNBcmcpIDogcHVyZUZuKCkpIDpcbiAgICAgIGdldEJpbmRpbmcobFZpZXcsIGJpbmRpbmdJbmRleCk7XG59XG5cbi8qKlxuICogSWYgdGhlIHZhbHVlIG9mIHRoZSBwcm92aWRlZCBleHAgaGFzIGNoYW5nZWQsIGNhbGxzIHRoZSBwdXJlIGZ1bmN0aW9uIHRvIHJldHVyblxuICogYW4gdXBkYXRlZCB2YWx1ZS4gT3IgaWYgdGhlIHZhbHVlIGhhcyBub3QgY2hhbmdlZCwgcmV0dXJucyBjYWNoZWQgdmFsdWUuXG4gKlxuICogQHBhcmFtIHNsb3RPZmZzZXQgdGhlIG9mZnNldCBmcm9tIGJpbmRpbmcgcm9vdCB0byB0aGUgcmVzZXJ2ZWQgc2xvdFxuICogQHBhcmFtIHB1cmVGbiBGdW5jdGlvbiB0aGF0IHJldHVybnMgYW4gdXBkYXRlZCB2YWx1ZVxuICogQHBhcmFtIGV4cCBVcGRhdGVkIGV4cHJlc3Npb24gdmFsdWVcbiAqIEBwYXJhbSB0aGlzQXJnIE9wdGlvbmFsIGNhbGxpbmcgY29udGV4dCBvZiBwdXJlRm5cbiAqIEByZXR1cm5zIFVwZGF0ZWQgb3IgY2FjaGVkIHZhbHVlXG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVwdXJlRnVuY3Rpb24xKFxuICAgIHNsb3RPZmZzZXQ6IG51bWJlciwgcHVyZUZuOiAodjogYW55KSA9PiBhbnksIGV4cDogYW55LCB0aGlzQXJnPzogYW55KTogYW55IHtcbiAgcmV0dXJuIHB1cmVGdW5jdGlvbjFJbnRlcm5hbChnZXRMVmlldygpLCBnZXRCaW5kaW5nUm9vdCgpLCBzbG90T2Zmc2V0LCBwdXJlRm4sIGV4cCwgdGhpc0FyZyk7XG59XG5cbi8qKlxuICogSWYgdGhlIHZhbHVlIG9mIGFueSBwcm92aWRlZCBleHAgaGFzIGNoYW5nZWQsIGNhbGxzIHRoZSBwdXJlIGZ1bmN0aW9uIHRvIHJldHVyblxuICogYW4gdXBkYXRlZCB2YWx1ZS4gT3IgaWYgbm8gdmFsdWVzIGhhdmUgY2hhbmdlZCwgcmV0dXJucyBjYWNoZWQgdmFsdWUuXG4gKlxuICogQHBhcmFtIHNsb3RPZmZzZXQgdGhlIG9mZnNldCBmcm9tIGJpbmRpbmcgcm9vdCB0byB0aGUgcmVzZXJ2ZWQgc2xvdFxuICogQHBhcmFtIHB1cmVGblxuICogQHBhcmFtIGV4cDFcbiAqIEBwYXJhbSBleHAyXG4gKiBAcGFyYW0gdGhpc0FyZyBPcHRpb25hbCBjYWxsaW5nIGNvbnRleHQgb2YgcHVyZUZuXG4gKiBAcmV0dXJucyBVcGRhdGVkIG9yIGNhY2hlZCB2YWx1ZVxuICpcbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1cHVyZUZ1bmN0aW9uMihcbiAgICBzbG90T2Zmc2V0OiBudW1iZXIsIHB1cmVGbjogKHYxOiBhbnksIHYyOiBhbnkpID0+IGFueSwgZXhwMTogYW55LCBleHAyOiBhbnksXG4gICAgdGhpc0FyZz86IGFueSk6IGFueSB7XG4gIHJldHVybiBwdXJlRnVuY3Rpb24ySW50ZXJuYWwoXG4gICAgICBnZXRMVmlldygpLCBnZXRCaW5kaW5nUm9vdCgpLCBzbG90T2Zmc2V0LCBwdXJlRm4sIGV4cDEsIGV4cDIsIHRoaXNBcmcpO1xufVxuXG4vKipcbiAqIElmIHRoZSB2YWx1ZSBvZiBhbnkgcHJvdmlkZWQgZXhwIGhhcyBjaGFuZ2VkLCBjYWxscyB0aGUgcHVyZSBmdW5jdGlvbiB0byByZXR1cm5cbiAqIGFuIHVwZGF0ZWQgdmFsdWUuIE9yIGlmIG5vIHZhbHVlcyBoYXZlIGNoYW5nZWQsIHJldHVybnMgY2FjaGVkIHZhbHVlLlxuICpcbiAqIEBwYXJhbSBzbG90T2Zmc2V0IHRoZSBvZmZzZXQgZnJvbSBiaW5kaW5nIHJvb3QgdG8gdGhlIHJlc2VydmVkIHNsb3RcbiAqIEBwYXJhbSBwdXJlRm5cbiAqIEBwYXJhbSBleHAxXG4gKiBAcGFyYW0gZXhwMlxuICogQHBhcmFtIGV4cDNcbiAqIEBwYXJhbSB0aGlzQXJnIE9wdGlvbmFsIGNhbGxpbmcgY29udGV4dCBvZiBwdXJlRm5cbiAqIEByZXR1cm5zIFVwZGF0ZWQgb3IgY2FjaGVkIHZhbHVlXG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVwdXJlRnVuY3Rpb24zKFxuICAgIHNsb3RPZmZzZXQ6IG51bWJlciwgcHVyZUZuOiAodjE6IGFueSwgdjI6IGFueSwgdjM6IGFueSkgPT4gYW55LCBleHAxOiBhbnksIGV4cDI6IGFueSwgZXhwMzogYW55LFxuICAgIHRoaXNBcmc/OiBhbnkpOiBhbnkge1xuICByZXR1cm4gcHVyZUZ1bmN0aW9uM0ludGVybmFsKFxuICAgICAgZ2V0TFZpZXcoKSwgZ2V0QmluZGluZ1Jvb3QoKSwgc2xvdE9mZnNldCwgcHVyZUZuLCBleHAxLCBleHAyLCBleHAzLCB0aGlzQXJnKTtcbn1cblxuLyoqXG4gKiBJZiB0aGUgdmFsdWUgb2YgYW55IHByb3ZpZGVkIGV4cCBoYXMgY2hhbmdlZCwgY2FsbHMgdGhlIHB1cmUgZnVuY3Rpb24gdG8gcmV0dXJuXG4gKiBhbiB1cGRhdGVkIHZhbHVlLiBPciBpZiBubyB2YWx1ZXMgaGF2ZSBjaGFuZ2VkLCByZXR1cm5zIGNhY2hlZCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0gc2xvdE9mZnNldCB0aGUgb2Zmc2V0IGZyb20gYmluZGluZyByb290IHRvIHRoZSByZXNlcnZlZCBzbG90XG4gKiBAcGFyYW0gcHVyZUZuXG4gKiBAcGFyYW0gZXhwMVxuICogQHBhcmFtIGV4cDJcbiAqIEBwYXJhbSBleHAzXG4gKiBAcGFyYW0gZXhwNFxuICogQHBhcmFtIHRoaXNBcmcgT3B0aW9uYWwgY2FsbGluZyBjb250ZXh0IG9mIHB1cmVGblxuICogQHJldHVybnMgVXBkYXRlZCBvciBjYWNoZWQgdmFsdWVcbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtXB1cmVGdW5jdGlvbjQoXG4gICAgc2xvdE9mZnNldDogbnVtYmVyLCBwdXJlRm46ICh2MTogYW55LCB2MjogYW55LCB2MzogYW55LCB2NDogYW55KSA9PiBhbnksIGV4cDE6IGFueSwgZXhwMjogYW55LFxuICAgIGV4cDM6IGFueSwgZXhwNDogYW55LCB0aGlzQXJnPzogYW55KTogYW55IHtcbiAgcmV0dXJuIHB1cmVGdW5jdGlvbjRJbnRlcm5hbChcbiAgICAgIGdldExWaWV3KCksIGdldEJpbmRpbmdSb290KCksIHNsb3RPZmZzZXQsIHB1cmVGbiwgZXhwMSwgZXhwMiwgZXhwMywgZXhwNCwgdGhpc0FyZyk7XG59XG5cbi8qKlxuICogSWYgdGhlIHZhbHVlIG9mIGFueSBwcm92aWRlZCBleHAgaGFzIGNoYW5nZWQsIGNhbGxzIHRoZSBwdXJlIGZ1bmN0aW9uIHRvIHJldHVyblxuICogYW4gdXBkYXRlZCB2YWx1ZS4gT3IgaWYgbm8gdmFsdWVzIGhhdmUgY2hhbmdlZCwgcmV0dXJucyBjYWNoZWQgdmFsdWUuXG4gKlxuICogQHBhcmFtIHNsb3RPZmZzZXQgdGhlIG9mZnNldCBmcm9tIGJpbmRpbmcgcm9vdCB0byB0aGUgcmVzZXJ2ZWQgc2xvdFxuICogQHBhcmFtIHB1cmVGblxuICogQHBhcmFtIGV4cDFcbiAqIEBwYXJhbSBleHAyXG4gKiBAcGFyYW0gZXhwM1xuICogQHBhcmFtIGV4cDRcbiAqIEBwYXJhbSBleHA1XG4gKiBAcGFyYW0gdGhpc0FyZyBPcHRpb25hbCBjYWxsaW5nIGNvbnRleHQgb2YgcHVyZUZuXG4gKiBAcmV0dXJucyBVcGRhdGVkIG9yIGNhY2hlZCB2YWx1ZVxuICpcbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1cHVyZUZ1bmN0aW9uNShcbiAgICBzbG90T2Zmc2V0OiBudW1iZXIsIHB1cmVGbjogKHYxOiBhbnksIHYyOiBhbnksIHYzOiBhbnksIHY0OiBhbnksIHY1OiBhbnkpID0+IGFueSwgZXhwMTogYW55LFxuICAgIGV4cDI6IGFueSwgZXhwMzogYW55LCBleHA0OiBhbnksIGV4cDU6IGFueSwgdGhpc0FyZz86IGFueSk6IGFueSB7XG4gIGNvbnN0IGJpbmRpbmdJbmRleCA9IGdldEJpbmRpbmdSb290KCkgKyBzbG90T2Zmc2V0O1xuICBjb25zdCBsVmlldyA9IGdldExWaWV3KCk7XG4gIGNvbnN0IGRpZmZlcmVudCA9IGJpbmRpbmdVcGRhdGVkNChsVmlldywgYmluZGluZ0luZGV4LCBleHAxLCBleHAyLCBleHAzLCBleHA0KTtcbiAgcmV0dXJuIGJpbmRpbmdVcGRhdGVkKGxWaWV3LCBiaW5kaW5nSW5kZXggKyA0LCBleHA1KSB8fCBkaWZmZXJlbnQgP1xuICAgICAgdXBkYXRlQmluZGluZyhcbiAgICAgICAgICBsVmlldywgYmluZGluZ0luZGV4ICsgNSxcbiAgICAgICAgICB0aGlzQXJnID8gcHVyZUZuLmNhbGwodGhpc0FyZywgZXhwMSwgZXhwMiwgZXhwMywgZXhwNCwgZXhwNSkgOlxuICAgICAgICAgICAgICAgICAgICBwdXJlRm4oZXhwMSwgZXhwMiwgZXhwMywgZXhwNCwgZXhwNSkpIDpcbiAgICAgIGdldEJpbmRpbmcobFZpZXcsIGJpbmRpbmdJbmRleCArIDUpO1xufVxuXG4vKipcbiAqIElmIHRoZSB2YWx1ZSBvZiBhbnkgcHJvdmlkZWQgZXhwIGhhcyBjaGFuZ2VkLCBjYWxscyB0aGUgcHVyZSBmdW5jdGlvbiB0byByZXR1cm5cbiAqIGFuIHVwZGF0ZWQgdmFsdWUuIE9yIGlmIG5vIHZhbHVlcyBoYXZlIGNoYW5nZWQsIHJldHVybnMgY2FjaGVkIHZhbHVlLlxuICpcbiAqIEBwYXJhbSBzbG90T2Zmc2V0IHRoZSBvZmZzZXQgZnJvbSBiaW5kaW5nIHJvb3QgdG8gdGhlIHJlc2VydmVkIHNsb3RcbiAqIEBwYXJhbSBwdXJlRm5cbiAqIEBwYXJhbSBleHAxXG4gKiBAcGFyYW0gZXhwMlxuICogQHBhcmFtIGV4cDNcbiAqIEBwYXJhbSBleHA0XG4gKiBAcGFyYW0gZXhwNVxuICogQHBhcmFtIGV4cDZcbiAqIEBwYXJhbSB0aGlzQXJnIE9wdGlvbmFsIGNhbGxpbmcgY29udGV4dCBvZiBwdXJlRm5cbiAqIEByZXR1cm5zIFVwZGF0ZWQgb3IgY2FjaGVkIHZhbHVlXG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVwdXJlRnVuY3Rpb242KFxuICAgIHNsb3RPZmZzZXQ6IG51bWJlciwgcHVyZUZuOiAodjE6IGFueSwgdjI6IGFueSwgdjM6IGFueSwgdjQ6IGFueSwgdjU6IGFueSwgdjY6IGFueSkgPT4gYW55LFxuICAgIGV4cDE6IGFueSwgZXhwMjogYW55LCBleHAzOiBhbnksIGV4cDQ6IGFueSwgZXhwNTogYW55LCBleHA2OiBhbnksIHRoaXNBcmc/OiBhbnkpOiBhbnkge1xuICBjb25zdCBiaW5kaW5nSW5kZXggPSBnZXRCaW5kaW5nUm9vdCgpICsgc2xvdE9mZnNldDtcbiAgY29uc3QgbFZpZXcgPSBnZXRMVmlldygpO1xuICBjb25zdCBkaWZmZXJlbnQgPSBiaW5kaW5nVXBkYXRlZDQobFZpZXcsIGJpbmRpbmdJbmRleCwgZXhwMSwgZXhwMiwgZXhwMywgZXhwNCk7XG4gIHJldHVybiBiaW5kaW5nVXBkYXRlZDIobFZpZXcsIGJpbmRpbmdJbmRleCArIDQsIGV4cDUsIGV4cDYpIHx8IGRpZmZlcmVudCA/XG4gICAgICB1cGRhdGVCaW5kaW5nKFxuICAgICAgICAgIGxWaWV3LCBiaW5kaW5nSW5kZXggKyA2LFxuICAgICAgICAgIHRoaXNBcmcgPyBwdXJlRm4uY2FsbCh0aGlzQXJnLCBleHAxLCBleHAyLCBleHAzLCBleHA0LCBleHA1LCBleHA2KSA6XG4gICAgICAgICAgICAgICAgICAgIHB1cmVGbihleHAxLCBleHAyLCBleHAzLCBleHA0LCBleHA1LCBleHA2KSkgOlxuICAgICAgZ2V0QmluZGluZyhsVmlldywgYmluZGluZ0luZGV4ICsgNik7XG59XG5cbi8qKlxuICogSWYgdGhlIHZhbHVlIG9mIGFueSBwcm92aWRlZCBleHAgaGFzIGNoYW5nZWQsIGNhbGxzIHRoZSBwdXJlIGZ1bmN0aW9uIHRvIHJldHVyblxuICogYW4gdXBkYXRlZCB2YWx1ZS4gT3IgaWYgbm8gdmFsdWVzIGhhdmUgY2hhbmdlZCwgcmV0dXJucyBjYWNoZWQgdmFsdWUuXG4gKlxuICogQHBhcmFtIHNsb3RPZmZzZXQgdGhlIG9mZnNldCBmcm9tIGJpbmRpbmcgcm9vdCB0byB0aGUgcmVzZXJ2ZWQgc2xvdFxuICogQHBhcmFtIHB1cmVGblxuICogQHBhcmFtIGV4cDFcbiAqIEBwYXJhbSBleHAyXG4gKiBAcGFyYW0gZXhwM1xuICogQHBhcmFtIGV4cDRcbiAqIEBwYXJhbSBleHA1XG4gKiBAcGFyYW0gZXhwNlxuICogQHBhcmFtIGV4cDdcbiAqIEBwYXJhbSB0aGlzQXJnIE9wdGlvbmFsIGNhbGxpbmcgY29udGV4dCBvZiBwdXJlRm5cbiAqIEByZXR1cm5zIFVwZGF0ZWQgb3IgY2FjaGVkIHZhbHVlXG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVwdXJlRnVuY3Rpb243KFxuICAgIHNsb3RPZmZzZXQ6IG51bWJlcixcbiAgICBwdXJlRm46ICh2MTogYW55LCB2MjogYW55LCB2MzogYW55LCB2NDogYW55LCB2NTogYW55LCB2NjogYW55LCB2NzogYW55KSA9PiBhbnksIGV4cDE6IGFueSxcbiAgICBleHAyOiBhbnksIGV4cDM6IGFueSwgZXhwNDogYW55LCBleHA1OiBhbnksIGV4cDY6IGFueSwgZXhwNzogYW55LCB0aGlzQXJnPzogYW55KTogYW55IHtcbiAgY29uc3QgYmluZGluZ0luZGV4ID0gZ2V0QmluZGluZ1Jvb3QoKSArIHNsb3RPZmZzZXQ7XG4gIGNvbnN0IGxWaWV3ID0gZ2V0TFZpZXcoKTtcbiAgbGV0IGRpZmZlcmVudCA9IGJpbmRpbmdVcGRhdGVkNChsVmlldywgYmluZGluZ0luZGV4LCBleHAxLCBleHAyLCBleHAzLCBleHA0KTtcbiAgcmV0dXJuIGJpbmRpbmdVcGRhdGVkMyhsVmlldywgYmluZGluZ0luZGV4ICsgNCwgZXhwNSwgZXhwNiwgZXhwNykgfHwgZGlmZmVyZW50ID9cbiAgICAgIHVwZGF0ZUJpbmRpbmcoXG4gICAgICAgICAgbFZpZXcsIGJpbmRpbmdJbmRleCArIDcsXG4gICAgICAgICAgdGhpc0FyZyA/IHB1cmVGbi5jYWxsKHRoaXNBcmcsIGV4cDEsIGV4cDIsIGV4cDMsIGV4cDQsIGV4cDUsIGV4cDYsIGV4cDcpIDpcbiAgICAgICAgICAgICAgICAgICAgcHVyZUZuKGV4cDEsIGV4cDIsIGV4cDMsIGV4cDQsIGV4cDUsIGV4cDYsIGV4cDcpKSA6XG4gICAgICBnZXRCaW5kaW5nKGxWaWV3LCBiaW5kaW5nSW5kZXggKyA3KTtcbn1cblxuLyoqXG4gKiBJZiB0aGUgdmFsdWUgb2YgYW55IHByb3ZpZGVkIGV4cCBoYXMgY2hhbmdlZCwgY2FsbHMgdGhlIHB1cmUgZnVuY3Rpb24gdG8gcmV0dXJuXG4gKiBhbiB1cGRhdGVkIHZhbHVlLiBPciBpZiBubyB2YWx1ZXMgaGF2ZSBjaGFuZ2VkLCByZXR1cm5zIGNhY2hlZCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0gc2xvdE9mZnNldCB0aGUgb2Zmc2V0IGZyb20gYmluZGluZyByb290IHRvIHRoZSByZXNlcnZlZCBzbG90XG4gKiBAcGFyYW0gcHVyZUZuXG4gKiBAcGFyYW0gZXhwMVxuICogQHBhcmFtIGV4cDJcbiAqIEBwYXJhbSBleHAzXG4gKiBAcGFyYW0gZXhwNFxuICogQHBhcmFtIGV4cDVcbiAqIEBwYXJhbSBleHA2XG4gKiBAcGFyYW0gZXhwN1xuICogQHBhcmFtIGV4cDhcbiAqIEBwYXJhbSB0aGlzQXJnIE9wdGlvbmFsIGNhbGxpbmcgY29udGV4dCBvZiBwdXJlRm5cbiAqIEByZXR1cm5zIFVwZGF0ZWQgb3IgY2FjaGVkIHZhbHVlXG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVwdXJlRnVuY3Rpb244KFxuICAgIHNsb3RPZmZzZXQ6IG51bWJlcixcbiAgICBwdXJlRm46ICh2MTogYW55LCB2MjogYW55LCB2MzogYW55LCB2NDogYW55LCB2NTogYW55LCB2NjogYW55LCB2NzogYW55LCB2ODogYW55KSA9PiBhbnksXG4gICAgZXhwMTogYW55LCBleHAyOiBhbnksIGV4cDM6IGFueSwgZXhwNDogYW55LCBleHA1OiBhbnksIGV4cDY6IGFueSwgZXhwNzogYW55LCBleHA4OiBhbnksXG4gICAgdGhpc0FyZz86IGFueSk6IGFueSB7XG4gIGNvbnN0IGJpbmRpbmdJbmRleCA9IGdldEJpbmRpbmdSb290KCkgKyBzbG90T2Zmc2V0O1xuICBjb25zdCBsVmlldyA9IGdldExWaWV3KCk7XG4gIGNvbnN0IGRpZmZlcmVudCA9IGJpbmRpbmdVcGRhdGVkNChsVmlldywgYmluZGluZ0luZGV4LCBleHAxLCBleHAyLCBleHAzLCBleHA0KTtcbiAgcmV0dXJuIGJpbmRpbmdVcGRhdGVkNChsVmlldywgYmluZGluZ0luZGV4ICsgNCwgZXhwNSwgZXhwNiwgZXhwNywgZXhwOCkgfHwgZGlmZmVyZW50ID9cbiAgICAgIHVwZGF0ZUJpbmRpbmcoXG4gICAgICAgICAgbFZpZXcsIGJpbmRpbmdJbmRleCArIDgsXG4gICAgICAgICAgdGhpc0FyZyA/IHB1cmVGbi5jYWxsKHRoaXNBcmcsIGV4cDEsIGV4cDIsIGV4cDMsIGV4cDQsIGV4cDUsIGV4cDYsIGV4cDcsIGV4cDgpIDpcbiAgICAgICAgICAgICAgICAgICAgcHVyZUZuKGV4cDEsIGV4cDIsIGV4cDMsIGV4cDQsIGV4cDUsIGV4cDYsIGV4cDcsIGV4cDgpKSA6XG4gICAgICBnZXRCaW5kaW5nKGxWaWV3LCBiaW5kaW5nSW5kZXggKyA4KTtcbn1cblxuLyoqXG4gKiBwdXJlRnVuY3Rpb24gaW5zdHJ1Y3Rpb24gdGhhdCBjYW4gc3VwcG9ydCBhbnkgbnVtYmVyIG9mIGJpbmRpbmdzLlxuICpcbiAqIElmIHRoZSB2YWx1ZSBvZiBhbnkgcHJvdmlkZWQgZXhwIGhhcyBjaGFuZ2VkLCBjYWxscyB0aGUgcHVyZSBmdW5jdGlvbiB0byByZXR1cm5cbiAqIGFuIHVwZGF0ZWQgdmFsdWUuIE9yIGlmIG5vIHZhbHVlcyBoYXZlIGNoYW5nZWQsIHJldHVybnMgY2FjaGVkIHZhbHVlLlxuICpcbiAqIEBwYXJhbSBzbG90T2Zmc2V0IHRoZSBvZmZzZXQgZnJvbSBiaW5kaW5nIHJvb3QgdG8gdGhlIHJlc2VydmVkIHNsb3RcbiAqIEBwYXJhbSBwdXJlRm4gQSBwdXJlIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYmluZGluZyB2YWx1ZXMgYW5kIGJ1aWxkcyBhbiBvYmplY3Qgb3IgYXJyYXlcbiAqIGNvbnRhaW5pbmcgdGhvc2UgdmFsdWVzLlxuICogQHBhcmFtIGV4cHMgQW4gYXJyYXkgb2YgYmluZGluZyB2YWx1ZXNcbiAqIEBwYXJhbSB0aGlzQXJnIE9wdGlvbmFsIGNhbGxpbmcgY29udGV4dCBvZiBwdXJlRm5cbiAqIEByZXR1cm5zIFVwZGF0ZWQgb3IgY2FjaGVkIHZhbHVlXG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVwdXJlRnVuY3Rpb25WKFxuICAgIHNsb3RPZmZzZXQ6IG51bWJlciwgcHVyZUZuOiAoLi4udjogYW55W10pID0+IGFueSwgZXhwczogYW55W10sIHRoaXNBcmc/OiBhbnkpOiBhbnkge1xuICByZXR1cm4gcHVyZUZ1bmN0aW9uVkludGVybmFsKGdldExWaWV3KCksIGdldEJpbmRpbmdSb290KCksIHNsb3RPZmZzZXQsIHB1cmVGbiwgZXhwcywgdGhpc0FyZyk7XG59XG5cbi8qKlxuICogUmVzdWx0cyBvZiBhIHB1cmUgZnVuY3Rpb24gaW52b2NhdGlvbiBhcmUgc3RvcmVkIGluIExWaWV3IGluIGEgZGVkaWNhdGVkIHNsb3QgdGhhdCBpcyBpbml0aWFsaXplZFxuICogdG8gTk9fQ0hBTkdFLiBJbiByYXJlIHNpdHVhdGlvbnMgYSBwdXJlIHBpcGUgbWlnaHQgdGhyb3cgYW4gZXhjZXB0aW9uIG9uIHRoZSB2ZXJ5IGZpcnN0XG4gKiBpbnZvY2F0aW9uIGFuZCBub3QgcHJvZHVjZSBhbnkgdmFsaWQgcmVzdWx0cy4gSW4gdGhpcyBjYXNlIExWaWV3IHdvdWxkIGtlZXAgaG9sZGluZyB0aGUgTk9fQ0hBTkdFXG4gKiB2YWx1ZS4gVGhlIE5PX0NIQU5HRSBpcyBub3Qgc29tZXRoaW5nIHRoYXQgd2UgY2FuIHVzZSBpbiBleHByZXNzaW9ucyAvIGJpbmRpbmdzIHRodXMgd2UgY29udmVydFxuICogaXQgdG8gYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGdldFB1cmVGdW5jdGlvblJldHVyblZhbHVlKGxWaWV3OiBMVmlldywgcmV0dXJuVmFsdWVJbmRleDogbnVtYmVyKSB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnRJbmRleEluUmFuZ2UobFZpZXcsIHJldHVyblZhbHVlSW5kZXgpO1xuICBjb25zdCBsYXN0UmV0dXJuVmFsdWUgPSBsVmlld1tyZXR1cm5WYWx1ZUluZGV4XTtcbiAgcmV0dXJuIGxhc3RSZXR1cm5WYWx1ZSA9PT0gTk9fQ0hBTkdFID8gdW5kZWZpbmVkIDogbGFzdFJldHVyblZhbHVlO1xufVxuXG4vKipcbiAqIElmIHRoZSB2YWx1ZSBvZiB0aGUgcHJvdmlkZWQgZXhwIGhhcyBjaGFuZ2VkLCBjYWxscyB0aGUgcHVyZSBmdW5jdGlvbiB0byByZXR1cm5cbiAqIGFuIHVwZGF0ZWQgdmFsdWUuIE9yIGlmIHRoZSB2YWx1ZSBoYXMgbm90IGNoYW5nZWQsIHJldHVybnMgY2FjaGVkIHZhbHVlLlxuICpcbiAqIEBwYXJhbSBsVmlldyBMVmlldyBpbiB3aGljaCB0aGUgZnVuY3Rpb24gaXMgYmVpbmcgZXhlY3V0ZWQuXG4gKiBAcGFyYW0gYmluZGluZ1Jvb3QgQmluZGluZyByb290IGluZGV4LlxuICogQHBhcmFtIHNsb3RPZmZzZXQgdGhlIG9mZnNldCBmcm9tIGJpbmRpbmcgcm9vdCB0byB0aGUgcmVzZXJ2ZWQgc2xvdFxuICogQHBhcmFtIHB1cmVGbiBGdW5jdGlvbiB0aGF0IHJldHVybnMgYW4gdXBkYXRlZCB2YWx1ZVxuICogQHBhcmFtIGV4cCBVcGRhdGVkIGV4cHJlc3Npb24gdmFsdWVcbiAqIEBwYXJhbSB0aGlzQXJnIE9wdGlvbmFsIGNhbGxpbmcgY29udGV4dCBvZiBwdXJlRm5cbiAqIEByZXR1cm5zIFVwZGF0ZWQgb3IgY2FjaGVkIHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwdXJlRnVuY3Rpb24xSW50ZXJuYWwoXG4gICAgbFZpZXc6IExWaWV3LCBiaW5kaW5nUm9vdDogbnVtYmVyLCBzbG90T2Zmc2V0OiBudW1iZXIsIHB1cmVGbjogKHY6IGFueSkgPT4gYW55LCBleHA6IGFueSxcbiAgICB0aGlzQXJnPzogYW55KTogYW55IHtcbiAgY29uc3QgYmluZGluZ0luZGV4ID0gYmluZGluZ1Jvb3QgKyBzbG90T2Zmc2V0O1xuICByZXR1cm4gYmluZGluZ1VwZGF0ZWQobFZpZXcsIGJpbmRpbmdJbmRleCwgZXhwKSA/XG4gICAgICB1cGRhdGVCaW5kaW5nKGxWaWV3LCBiaW5kaW5nSW5kZXggKyAxLCB0aGlzQXJnID8gcHVyZUZuLmNhbGwodGhpc0FyZywgZXhwKSA6IHB1cmVGbihleHApKSA6XG4gICAgICBnZXRQdXJlRnVuY3Rpb25SZXR1cm5WYWx1ZShsVmlldywgYmluZGluZ0luZGV4ICsgMSk7XG59XG5cblxuLyoqXG4gKiBJZiB0aGUgdmFsdWUgb2YgYW55IHByb3ZpZGVkIGV4cCBoYXMgY2hhbmdlZCwgY2FsbHMgdGhlIHB1cmUgZnVuY3Rpb24gdG8gcmV0dXJuXG4gKiBhbiB1cGRhdGVkIHZhbHVlLiBPciBpZiBubyB2YWx1ZXMgaGF2ZSBjaGFuZ2VkLCByZXR1cm5zIGNhY2hlZCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0gbFZpZXcgTFZpZXcgaW4gd2hpY2ggdGhlIGZ1bmN0aW9uIGlzIGJlaW5nIGV4ZWN1dGVkLlxuICogQHBhcmFtIGJpbmRpbmdSb290IEJpbmRpbmcgcm9vdCBpbmRleC5cbiAqIEBwYXJhbSBzbG90T2Zmc2V0IHRoZSBvZmZzZXQgZnJvbSBiaW5kaW5nIHJvb3QgdG8gdGhlIHJlc2VydmVkIHNsb3RcbiAqIEBwYXJhbSBwdXJlRm5cbiAqIEBwYXJhbSBleHAxXG4gKiBAcGFyYW0gZXhwMlxuICogQHBhcmFtIHRoaXNBcmcgT3B0aW9uYWwgY2FsbGluZyBjb250ZXh0IG9mIHB1cmVGblxuICogQHJldHVybnMgVXBkYXRlZCBvciBjYWNoZWQgdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHB1cmVGdW5jdGlvbjJJbnRlcm5hbChcbiAgICBsVmlldzogTFZpZXcsIGJpbmRpbmdSb290OiBudW1iZXIsIHNsb3RPZmZzZXQ6IG51bWJlciwgcHVyZUZuOiAodjE6IGFueSwgdjI6IGFueSkgPT4gYW55LFxuICAgIGV4cDE6IGFueSwgZXhwMjogYW55LCB0aGlzQXJnPzogYW55KTogYW55IHtcbiAgY29uc3QgYmluZGluZ0luZGV4ID0gYmluZGluZ1Jvb3QgKyBzbG90T2Zmc2V0O1xuICByZXR1cm4gYmluZGluZ1VwZGF0ZWQyKGxWaWV3LCBiaW5kaW5nSW5kZXgsIGV4cDEsIGV4cDIpID9cbiAgICAgIHVwZGF0ZUJpbmRpbmcoXG4gICAgICAgICAgbFZpZXcsIGJpbmRpbmdJbmRleCArIDIsXG4gICAgICAgICAgdGhpc0FyZyA/IHB1cmVGbi5jYWxsKHRoaXNBcmcsIGV4cDEsIGV4cDIpIDogcHVyZUZuKGV4cDEsIGV4cDIpKSA6XG4gICAgICBnZXRQdXJlRnVuY3Rpb25SZXR1cm5WYWx1ZShsVmlldywgYmluZGluZ0luZGV4ICsgMik7XG59XG5cbi8qKlxuICogSWYgdGhlIHZhbHVlIG9mIGFueSBwcm92aWRlZCBleHAgaGFzIGNoYW5nZWQsIGNhbGxzIHRoZSBwdXJlIGZ1bmN0aW9uIHRvIHJldHVyblxuICogYW4gdXBkYXRlZCB2YWx1ZS4gT3IgaWYgbm8gdmFsdWVzIGhhdmUgY2hhbmdlZCwgcmV0dXJucyBjYWNoZWQgdmFsdWUuXG4gKlxuICogQHBhcmFtIGxWaWV3IExWaWV3IGluIHdoaWNoIHRoZSBmdW5jdGlvbiBpcyBiZWluZyBleGVjdXRlZC5cbiAqIEBwYXJhbSBiaW5kaW5nUm9vdCBCaW5kaW5nIHJvb3QgaW5kZXguXG4gKiBAcGFyYW0gc2xvdE9mZnNldCB0aGUgb2Zmc2V0IGZyb20gYmluZGluZyByb290IHRvIHRoZSByZXNlcnZlZCBzbG90XG4gKiBAcGFyYW0gcHVyZUZuXG4gKiBAcGFyYW0gZXhwMVxuICogQHBhcmFtIGV4cDJcbiAqIEBwYXJhbSBleHAzXG4gKiBAcGFyYW0gdGhpc0FyZyBPcHRpb25hbCBjYWxsaW5nIGNvbnRleHQgb2YgcHVyZUZuXG4gKiBAcmV0dXJucyBVcGRhdGVkIG9yIGNhY2hlZCB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcHVyZUZ1bmN0aW9uM0ludGVybmFsKFxuICAgIGxWaWV3OiBMVmlldywgYmluZGluZ1Jvb3Q6IG51bWJlciwgc2xvdE9mZnNldDogbnVtYmVyLFxuICAgIHB1cmVGbjogKHYxOiBhbnksIHYyOiBhbnksIHYzOiBhbnkpID0+IGFueSwgZXhwMTogYW55LCBleHAyOiBhbnksIGV4cDM6IGFueSxcbiAgICB0aGlzQXJnPzogYW55KTogYW55IHtcbiAgY29uc3QgYmluZGluZ0luZGV4ID0gYmluZGluZ1Jvb3QgKyBzbG90T2Zmc2V0O1xuICByZXR1cm4gYmluZGluZ1VwZGF0ZWQzKGxWaWV3LCBiaW5kaW5nSW5kZXgsIGV4cDEsIGV4cDIsIGV4cDMpID9cbiAgICAgIHVwZGF0ZUJpbmRpbmcoXG4gICAgICAgICAgbFZpZXcsIGJpbmRpbmdJbmRleCArIDMsXG4gICAgICAgICAgdGhpc0FyZyA/IHB1cmVGbi5jYWxsKHRoaXNBcmcsIGV4cDEsIGV4cDIsIGV4cDMpIDogcHVyZUZuKGV4cDEsIGV4cDIsIGV4cDMpKSA6XG4gICAgICBnZXRQdXJlRnVuY3Rpb25SZXR1cm5WYWx1ZShsVmlldywgYmluZGluZ0luZGV4ICsgMyk7XG59XG5cblxuLyoqXG4gKiBJZiB0aGUgdmFsdWUgb2YgYW55IHByb3ZpZGVkIGV4cCBoYXMgY2hhbmdlZCwgY2FsbHMgdGhlIHB1cmUgZnVuY3Rpb24gdG8gcmV0dXJuXG4gKiBhbiB1cGRhdGVkIHZhbHVlLiBPciBpZiBubyB2YWx1ZXMgaGF2ZSBjaGFuZ2VkLCByZXR1cm5zIGNhY2hlZCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0gbFZpZXcgTFZpZXcgaW4gd2hpY2ggdGhlIGZ1bmN0aW9uIGlzIGJlaW5nIGV4ZWN1dGVkLlxuICogQHBhcmFtIGJpbmRpbmdSb290IEJpbmRpbmcgcm9vdCBpbmRleC5cbiAqIEBwYXJhbSBzbG90T2Zmc2V0IHRoZSBvZmZzZXQgZnJvbSBiaW5kaW5nIHJvb3QgdG8gdGhlIHJlc2VydmVkIHNsb3RcbiAqIEBwYXJhbSBwdXJlRm5cbiAqIEBwYXJhbSBleHAxXG4gKiBAcGFyYW0gZXhwMlxuICogQHBhcmFtIGV4cDNcbiAqIEBwYXJhbSBleHA0XG4gKiBAcGFyYW0gdGhpc0FyZyBPcHRpb25hbCBjYWxsaW5nIGNvbnRleHQgb2YgcHVyZUZuXG4gKiBAcmV0dXJucyBVcGRhdGVkIG9yIGNhY2hlZCB2YWx1ZVxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHB1cmVGdW5jdGlvbjRJbnRlcm5hbChcbiAgICBsVmlldzogTFZpZXcsIGJpbmRpbmdSb290OiBudW1iZXIsIHNsb3RPZmZzZXQ6IG51bWJlcixcbiAgICBwdXJlRm46ICh2MTogYW55LCB2MjogYW55LCB2MzogYW55LCB2NDogYW55KSA9PiBhbnksIGV4cDE6IGFueSwgZXhwMjogYW55LCBleHAzOiBhbnksIGV4cDQ6IGFueSxcbiAgICB0aGlzQXJnPzogYW55KTogYW55IHtcbiAgY29uc3QgYmluZGluZ0luZGV4ID0gYmluZGluZ1Jvb3QgKyBzbG90T2Zmc2V0O1xuICByZXR1cm4gYmluZGluZ1VwZGF0ZWQ0KGxWaWV3LCBiaW5kaW5nSW5kZXgsIGV4cDEsIGV4cDIsIGV4cDMsIGV4cDQpID9cbiAgICAgIHVwZGF0ZUJpbmRpbmcoXG4gICAgICAgICAgbFZpZXcsIGJpbmRpbmdJbmRleCArIDQsXG4gICAgICAgICAgdGhpc0FyZyA/IHB1cmVGbi5jYWxsKHRoaXNBcmcsIGV4cDEsIGV4cDIsIGV4cDMsIGV4cDQpIDogcHVyZUZuKGV4cDEsIGV4cDIsIGV4cDMsIGV4cDQpKSA6XG4gICAgICBnZXRQdXJlRnVuY3Rpb25SZXR1cm5WYWx1ZShsVmlldywgYmluZGluZ0luZGV4ICsgNCk7XG59XG5cbi8qKlxuICogcHVyZUZ1bmN0aW9uIGluc3RydWN0aW9uIHRoYXQgY2FuIHN1cHBvcnQgYW55IG51bWJlciBvZiBiaW5kaW5ncy5cbiAqXG4gKiBJZiB0aGUgdmFsdWUgb2YgYW55IHByb3ZpZGVkIGV4cCBoYXMgY2hhbmdlZCwgY2FsbHMgdGhlIHB1cmUgZnVuY3Rpb24gdG8gcmV0dXJuXG4gKiBhbiB1cGRhdGVkIHZhbHVlLiBPciBpZiBubyB2YWx1ZXMgaGF2ZSBjaGFuZ2VkLCByZXR1cm5zIGNhY2hlZCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0gbFZpZXcgTFZpZXcgaW4gd2hpY2ggdGhlIGZ1bmN0aW9uIGlzIGJlaW5nIGV4ZWN1dGVkLlxuICogQHBhcmFtIGJpbmRpbmdSb290IEJpbmRpbmcgcm9vdCBpbmRleC5cbiAqIEBwYXJhbSBzbG90T2Zmc2V0IHRoZSBvZmZzZXQgZnJvbSBiaW5kaW5nIHJvb3QgdG8gdGhlIHJlc2VydmVkIHNsb3RcbiAqIEBwYXJhbSBwdXJlRm4gQSBwdXJlIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYmluZGluZyB2YWx1ZXMgYW5kIGJ1aWxkcyBhbiBvYmplY3Qgb3IgYXJyYXlcbiAqIGNvbnRhaW5pbmcgdGhvc2UgdmFsdWVzLlxuICogQHBhcmFtIGV4cHMgQW4gYXJyYXkgb2YgYmluZGluZyB2YWx1ZXNcbiAqIEBwYXJhbSB0aGlzQXJnIE9wdGlvbmFsIGNhbGxpbmcgY29udGV4dCBvZiBwdXJlRm5cbiAqIEByZXR1cm5zIFVwZGF0ZWQgb3IgY2FjaGVkIHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwdXJlRnVuY3Rpb25WSW50ZXJuYWwoXG4gICAgbFZpZXc6IExWaWV3LCBiaW5kaW5nUm9vdDogbnVtYmVyLCBzbG90T2Zmc2V0OiBudW1iZXIsIHB1cmVGbjogKC4uLnY6IGFueVtdKSA9PiBhbnksXG4gICAgZXhwczogYW55W10sIHRoaXNBcmc/OiBhbnkpOiBhbnkge1xuICBsZXQgYmluZGluZ0luZGV4ID0gYmluZGluZ1Jvb3QgKyBzbG90T2Zmc2V0O1xuICBsZXQgZGlmZmVyZW50ID0gZmFsc2U7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZXhwcy5sZW5ndGg7IGkrKykge1xuICAgIGJpbmRpbmdVcGRhdGVkKGxWaWV3LCBiaW5kaW5nSW5kZXgrKywgZXhwc1tpXSkgJiYgKGRpZmZlcmVudCA9IHRydWUpO1xuICB9XG4gIHJldHVybiBkaWZmZXJlbnQgPyB1cGRhdGVCaW5kaW5nKGxWaWV3LCBiaW5kaW5nSW5kZXgsIHB1cmVGbi5hcHBseSh0aGlzQXJnLCBleHBzKSkgOlxuICAgICAgICAgICAgICAgICAgICAgZ2V0UHVyZUZ1bmN0aW9uUmV0dXJuVmFsdWUobFZpZXcsIGJpbmRpbmdJbmRleCk7XG59XG4iXX0=