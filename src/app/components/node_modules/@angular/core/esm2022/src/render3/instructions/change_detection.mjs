/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { consumerAfterComputation, consumerBeforeComputation, consumerPollProducersForChange } from '@angular/core/primitives/signals';
import { RuntimeError } from '../../errors';
import { assertDefined, assertEqual } from '../../util/assert';
import { assertLContainer } from '../assert';
import { executeCheckHooks, executeInitAndCheckHooks, incrementInitPhaseFlags } from '../hooks';
import { CONTAINER_HEADER_OFFSET, LContainerFlags, MOVED_VIEWS } from '../interfaces/container';
import { CONTEXT, EFFECTS_TO_SCHEDULE, ENVIRONMENT, FLAGS, PARENT, REACTIVE_TEMPLATE_CONSUMER, TVIEW } from '../interfaces/view';
import { getOrBorrowReactiveLViewConsumer, maybeReturnReactiveLViewConsumer } from '../reactive_lview_consumer';
import { enterView, isInCheckNoChangesMode, leaveView, setBindingIndex, setIsInCheckNoChangesMode } from '../state';
import { getFirstLContainer, getNextLContainer } from '../util/view_traversal_utils';
import { getComponentLViewByIndex, isCreationMode, markAncestorsForTraversal, markViewForRefresh, requiresRefreshOrTraversal, resetPreOrderHookFlags, viewAttachedToChangeDetector } from '../util/view_utils';
import { executeTemplate, executeViewQueryFn, handleError, processHostBindingOpCodes, refreshContentQueries } from './shared';
/**
 * The maximum number of times the change detection traversal will rerun before throwing an error.
 */
export const MAXIMUM_REFRESH_RERUNS = 100;
export function detectChangesInternal(lView, notifyErrorHandler = true, mode = 0 /* ChangeDetectionMode.Global */) {
    const environment = lView[ENVIRONMENT];
    const rendererFactory = environment.rendererFactory;
    // Check no changes mode is a dev only mode used to verify that bindings have not changed
    // since they were assigned. We do not want to invoke renderer factory functions in that mode
    // to avoid any possible side-effects.
    const checkNoChangesMode = !!ngDevMode && isInCheckNoChangesMode();
    if (!checkNoChangesMode) {
        rendererFactory.begin?.();
    }
    try {
        detectChangesInViewWhileDirty(lView, mode);
    }
    catch (error) {
        if (notifyErrorHandler) {
            handleError(lView, error);
        }
        throw error;
    }
    finally {
        if (!checkNoChangesMode) {
            rendererFactory.end?.();
            // One final flush of the effects queue to catch any effects created in `ngAfterViewInit` or
            // other post-order hooks.
            environment.inlineEffectRunner?.flush();
        }
    }
}
function detectChangesInViewWhileDirty(lView, mode) {
    detectChangesInView(lView, mode);
    let retries = 0;
    // If after running change detection, this view still needs to be refreshed or there are
    // descendants views that need to be refreshed due to re-dirtying during the change detection
    // run, detect changes on the view again. We run change detection in `Targeted` mode to only
    // refresh views with the `RefreshView` flag.
    while (requiresRefreshOrTraversal(lView)) {
        if (retries === MAXIMUM_REFRESH_RERUNS) {
            throw new RuntimeError(103 /* RuntimeErrorCode.INFINITE_CHANGE_DETECTION */, ngDevMode &&
                'Infinite change detection while trying to refresh views. ' +
                    'There may be components which each cause the other to require a refresh, ' +
                    'causing an infinite loop.');
        }
        retries++;
        // Even if this view is detached, we still detect changes in targeted mode because this was
        // the root of the change detection run.
        detectChangesInView(lView, 1 /* ChangeDetectionMode.Targeted */);
    }
}
export function checkNoChangesInternal(lView, notifyErrorHandler = true) {
    setIsInCheckNoChangesMode(true);
    try {
        detectChangesInternal(lView, notifyErrorHandler);
    }
    finally {
        setIsInCheckNoChangesMode(false);
    }
}
/**
 * Processes a view in update mode. This includes a number of steps in a specific order:
 * - executing a template function in update mode;
 * - executing hooks;
 * - refreshing queries;
 * - setting host bindings;
 * - refreshing child (embedded and component) views.
 */
export function refreshView(tView, lView, templateFn, context) {
    ngDevMode && assertEqual(isCreationMode(lView), false, 'Should be run in update mode');
    const flags = lView[FLAGS];
    if ((flags & 256 /* LViewFlags.Destroyed */) === 256 /* LViewFlags.Destroyed */)
        return;
    // Check no changes mode is a dev only mode used to verify that bindings have not changed
    // since they were assigned. We do not want to execute lifecycle hooks in that mode.
    const isInCheckNoChangesPass = ngDevMode && isInCheckNoChangesMode();
    !isInCheckNoChangesPass && lView[ENVIRONMENT].inlineEffectRunner?.flush();
    // Start component reactive context
    // - We might already be in a reactive context if this is an embedded view of the host.
    // - We might be descending into a view that needs a consumer.
    enterView(lView);
    let prevConsumer = null;
    let currentConsumer = null;
    if (!isInCheckNoChangesPass && viewShouldHaveReactiveConsumer(tView)) {
        currentConsumer = getOrBorrowReactiveLViewConsumer(lView);
        prevConsumer = consumerBeforeComputation(currentConsumer);
    }
    try {
        resetPreOrderHookFlags(lView);
        setBindingIndex(tView.bindingStartIndex);
        if (templateFn !== null) {
            executeTemplate(tView, lView, templateFn, 2 /* RenderFlags.Update */, context);
        }
        const hooksInitPhaseCompleted = (flags & 3 /* LViewFlags.InitPhaseStateMask */) === 3 /* InitPhaseState.InitPhaseCompleted */;
        // execute pre-order hooks (OnInit, OnChanges, DoCheck)
        // PERF WARNING: do NOT extract this to a separate function without running benchmarks
        if (!isInCheckNoChangesPass) {
            if (hooksInitPhaseCompleted) {
                const preOrderCheckHooks = tView.preOrderCheckHooks;
                if (preOrderCheckHooks !== null) {
                    executeCheckHooks(lView, preOrderCheckHooks, null);
                }
            }
            else {
                const preOrderHooks = tView.preOrderHooks;
                if (preOrderHooks !== null) {
                    executeInitAndCheckHooks(lView, preOrderHooks, 0 /* InitPhaseState.OnInitHooksToBeRun */, null);
                }
                incrementInitPhaseFlags(lView, 0 /* InitPhaseState.OnInitHooksToBeRun */);
            }
        }
        // First mark transplanted views that are declared in this lView as needing a refresh at their
        // insertion points. This is needed to avoid the situation where the template is defined in this
        // `LView` but its declaration appears after the insertion component.
        markTransplantedViewsForRefresh(lView);
        detectChangesInEmbeddedViews(lView, 0 /* ChangeDetectionMode.Global */);
        // Content query results must be refreshed before content hooks are called.
        if (tView.contentQueries !== null) {
            refreshContentQueries(tView, lView);
        }
        // execute content hooks (AfterContentInit, AfterContentChecked)
        // PERF WARNING: do NOT extract this to a separate function without running benchmarks
        if (!isInCheckNoChangesPass) {
            if (hooksInitPhaseCompleted) {
                const contentCheckHooks = tView.contentCheckHooks;
                if (contentCheckHooks !== null) {
                    executeCheckHooks(lView, contentCheckHooks);
                }
            }
            else {
                const contentHooks = tView.contentHooks;
                if (contentHooks !== null) {
                    executeInitAndCheckHooks(lView, contentHooks, 1 /* InitPhaseState.AfterContentInitHooksToBeRun */);
                }
                incrementInitPhaseFlags(lView, 1 /* InitPhaseState.AfterContentInitHooksToBeRun */);
            }
        }
        processHostBindingOpCodes(tView, lView);
        // Refresh child component views.
        const components = tView.components;
        if (components !== null) {
            detectChangesInChildComponents(lView, components, 0 /* ChangeDetectionMode.Global */);
        }
        // View queries must execute after refreshing child components because a template in this view
        // could be inserted in a child component. If the view query executes before child component
        // refresh, the template might not yet be inserted.
        const viewQuery = tView.viewQuery;
        if (viewQuery !== null) {
            executeViewQueryFn(2 /* RenderFlags.Update */, viewQuery, context);
        }
        // execute view hooks (AfterViewInit, AfterViewChecked)
        // PERF WARNING: do NOT extract this to a separate function without running benchmarks
        if (!isInCheckNoChangesPass) {
            if (hooksInitPhaseCompleted) {
                const viewCheckHooks = tView.viewCheckHooks;
                if (viewCheckHooks !== null) {
                    executeCheckHooks(lView, viewCheckHooks);
                }
            }
            else {
                const viewHooks = tView.viewHooks;
                if (viewHooks !== null) {
                    executeInitAndCheckHooks(lView, viewHooks, 2 /* InitPhaseState.AfterViewInitHooksToBeRun */);
                }
                incrementInitPhaseFlags(lView, 2 /* InitPhaseState.AfterViewInitHooksToBeRun */);
            }
        }
        if (tView.firstUpdatePass === true) {
            // We need to make sure that we only flip the flag on successful `refreshView` only
            // Don't do this in `finally` block.
            // If we did this in `finally` block then an exception could block the execution of styling
            // instructions which in turn would be unable to insert themselves into the styling linked
            // list. The result of this would be that if the exception would not be throw on subsequent CD
            // the styling would be unable to process it data and reflect to the DOM.
            tView.firstUpdatePass = false;
        }
        // Schedule any effects that are waiting on the update pass of this view.
        if (lView[EFFECTS_TO_SCHEDULE]) {
            for (const notifyEffect of lView[EFFECTS_TO_SCHEDULE]) {
                notifyEffect();
            }
            // Once they've been run, we can drop the array.
            lView[EFFECTS_TO_SCHEDULE] = null;
        }
        // Do not reset the dirty state when running in check no changes mode. We don't want components
        // to behave differently depending on whether check no changes is enabled or not. For example:
        // Marking an OnPush component as dirty from within the `ngAfterViewInit` hook in order to
        // refresh a `NgClass` binding should work. If we would reset the dirty state in the check
        // no changes cycle, the component would be not be dirty for the next update pass. This would
        // be different in production mode where the component dirty state is not reset.
        if (!isInCheckNoChangesPass) {
            lView[FLAGS] &= ~(64 /* LViewFlags.Dirty */ | 8 /* LViewFlags.FirstLViewPass */);
        }
    }
    catch (e) {
        // If refreshing a view causes an error, we need to remark the ancestors as needing traversal
        // because the error might have caused a situation where views below the current location are
        // dirty but will be unreachable because the "has dirty children" flag in the ancestors has been
        // cleared during change detection and we failed to run to completion.
        markAncestorsForTraversal(lView);
        throw e;
    }
    finally {
        if (currentConsumer !== null) {
            consumerAfterComputation(currentConsumer, prevConsumer);
            maybeReturnReactiveLViewConsumer(currentConsumer);
        }
        leaveView();
    }
}
/**
 * Indicates if the view should get its own reactive consumer node.
 *
 * In the current design, all embedded views share a consumer with the component view. This allows
 * us to refresh at the component level rather than at a per-view level. In addition, root views get
 * their own reactive node because root component will have a host view that executes the
 * component's host bindings. This needs to be tracked in a consumer as well.
 *
 * To get a more granular change detection than per-component, all we would just need to update the
 * condition here so that a given view gets a reactive consumer which can become dirty independently
 * from its parent component. For example embedded views for signal components could be created with
 * a new type "SignalEmbeddedView" and the condition here wouldn't even need updating in order to
 * get granular per-view change detection for signal components.
 */
function viewShouldHaveReactiveConsumer(tView) {
    return tView.type !== 2 /* TViewType.Embedded */;
}
/**
 * Goes over embedded views (ones created through ViewContainerRef APIs) and refreshes
 * them by executing an associated template function.
 */
function detectChangesInEmbeddedViews(lView, mode) {
    for (let lContainer = getFirstLContainer(lView); lContainer !== null; lContainer = getNextLContainer(lContainer)) {
        for (let i = CONTAINER_HEADER_OFFSET; i < lContainer.length; i++) {
            const embeddedLView = lContainer[i];
            detectChangesInViewIfAttached(embeddedLView, mode);
        }
    }
}
/**
 * Mark transplanted views as needing to be refreshed at their insertion points.
 *
 * @param lView The `LView` that may have transplanted views.
 */
function markTransplantedViewsForRefresh(lView) {
    for (let lContainer = getFirstLContainer(lView); lContainer !== null; lContainer = getNextLContainer(lContainer)) {
        if (!(lContainer[FLAGS] & LContainerFlags.HasTransplantedViews))
            continue;
        const movedViews = lContainer[MOVED_VIEWS];
        ngDevMode && assertDefined(movedViews, 'Transplanted View flags set but missing MOVED_VIEWS');
        for (let i = 0; i < movedViews.length; i++) {
            const movedLView = movedViews[i];
            const insertionLContainer = movedLView[PARENT];
            ngDevMode && assertLContainer(insertionLContainer);
            markViewForRefresh(movedLView);
        }
    }
}
/**
 * Detects changes in a component by entering the component view and processing its bindings,
 * queries, etc. if it is CheckAlways, OnPush and Dirty, etc.
 *
 * @param componentHostIdx  Element index in LView[] (adjusted for HEADER_OFFSET)
 */
function detectChangesInComponent(hostLView, componentHostIdx, mode) {
    ngDevMode && assertEqual(isCreationMode(hostLView), false, 'Should be run in update mode');
    const componentView = getComponentLViewByIndex(componentHostIdx, hostLView);
    detectChangesInViewIfAttached(componentView, mode);
}
/**
 * Visits a view as part of change detection traversal.
 *
 * If the view is detached, no additional traversal happens.
 */
function detectChangesInViewIfAttached(lView, mode) {
    if (!viewAttachedToChangeDetector(lView)) {
        return;
    }
    detectChangesInView(lView, mode);
}
/**
 * Visits a view as part of change detection traversal.
 *
 * The view is refreshed if:
 * - If the view is CheckAlways or Dirty and ChangeDetectionMode is `Global`
 * - If the view has the `RefreshView` flag
 *
 * The view is not refreshed, but descendants are traversed in `ChangeDetectionMode.Targeted` if the
 * view HasChildViewsToRefresh flag is set.
 */
function detectChangesInView(lView, mode) {
    const isInCheckNoChangesPass = ngDevMode && isInCheckNoChangesMode();
    const tView = lView[TVIEW];
    const flags = lView[FLAGS];
    const consumer = lView[REACTIVE_TEMPLATE_CONSUMER];
    // Refresh CheckAlways views in Global mode.
    let shouldRefreshView = !!(mode === 0 /* ChangeDetectionMode.Global */ && flags & 16 /* LViewFlags.CheckAlways */);
    // Refresh Dirty views in Global mode, as long as we're not in checkNoChanges.
    // CheckNoChanges never worked with `OnPush` components because the `Dirty` flag was
    // cleared before checkNoChanges ran. Because there is now a loop for to check for
    // backwards views, it gives an opportunity for `OnPush` components to be marked `Dirty`
    // before the CheckNoChanges pass. We don't want existing errors that are hidden by the
    // current CheckNoChanges bug to surface when making unrelated changes.
    shouldRefreshView ||= !!(flags & 64 /* LViewFlags.Dirty */ && mode === 0 /* ChangeDetectionMode.Global */ && !isInCheckNoChangesPass);
    // Always refresh views marked for refresh, regardless of mode.
    shouldRefreshView ||= !!(flags & 1024 /* LViewFlags.RefreshView */);
    // Refresh views when they have a dirty reactive consumer, regardless of mode.
    shouldRefreshView ||= !!(consumer?.dirty && consumerPollProducersForChange(consumer));
    // Mark the Flags and `ReactiveNode` as not dirty before refreshing the component, so that they
    // can be re-dirtied during the refresh process.
    if (consumer) {
        consumer.dirty = false;
    }
    lView[FLAGS] &= ~(8192 /* LViewFlags.HasChildViewsToRefresh */ | 1024 /* LViewFlags.RefreshView */);
    if (shouldRefreshView) {
        refreshView(tView, lView, tView.template, lView[CONTEXT]);
    }
    else if (flags & 8192 /* LViewFlags.HasChildViewsToRefresh */) {
        detectChangesInEmbeddedViews(lView, 1 /* ChangeDetectionMode.Targeted */);
        const components = tView.components;
        if (components !== null) {
            detectChangesInChildComponents(lView, components, 1 /* ChangeDetectionMode.Targeted */);
        }
    }
}
/** Refreshes child components in the current view (update mode). */
function detectChangesInChildComponents(hostLView, components, mode) {
    for (let i = 0; i < components.length; i++) {
        detectChangesInComponent(hostLView, components[i], mode);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlX2RldGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaW5zdHJ1Y3Rpb25zL2NoYW5nZV9kZXRlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLHdCQUF3QixFQUFFLHlCQUF5QixFQUFFLDhCQUE4QixFQUFlLE1BQU0sa0NBQWtDLENBQUM7QUFFbkosT0FBTyxFQUFDLFlBQVksRUFBbUIsTUFBTSxjQUFjLENBQUM7QUFDNUQsT0FBTyxFQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUM3RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDM0MsT0FBTyxFQUFDLGlCQUFpQixFQUFFLHdCQUF3QixFQUFFLHVCQUF1QixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQzlGLE9BQU8sRUFBQyx1QkFBdUIsRUFBYyxlQUFlLEVBQUUsV0FBVyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFFMUcsT0FBTyxFQUFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFxQyxNQUFNLEVBQUUsMEJBQTBCLEVBQUUsS0FBSyxFQUFtQixNQUFNLG9CQUFvQixDQUFDO0FBQ3BMLE9BQU8sRUFBQyxnQ0FBZ0MsRUFBRSxnQ0FBZ0MsRUFBd0IsTUFBTSw0QkFBNEIsQ0FBQztBQUNySSxPQUFPLEVBQUMsU0FBUyxFQUFFLHNCQUFzQixFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUseUJBQXlCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDbEgsT0FBTyxFQUFDLGtCQUFrQixFQUFFLGlCQUFpQixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDbkYsT0FBTyxFQUFDLHdCQUF3QixFQUFFLGNBQWMsRUFBRSx5QkFBeUIsRUFBRSxrQkFBa0IsRUFB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LElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQzNDLHdCQUF3QixDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtjb25zdW1lckFmdGVyQ29tcHV0YXRpb24sIGNvbnN1bWVyQmVmb3JlQ29tcHV0YXRpb24sIGNvbnN1bWVyUG9sbFByb2R1Y2Vyc0ZvckNoYW5nZSwgUmVhY3RpdmVOb2RlfSBmcm9tICdAYW5ndWxhci9jb3JlL3ByaW1pdGl2ZXMvc2lnbmFscyc7XG5cbmltcG9ydCB7UnVudGltZUVycm9yLCBSdW50aW1lRXJyb3JDb2RlfSBmcm9tICcuLi8uLi9lcnJvcnMnO1xuaW1wb3J0IHthc3NlcnREZWZpbmVkLCBhc3NlcnRFcXVhbH0gZnJvbSAnLi4vLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHthc3NlcnRMQ29udGFpbmVyfSBmcm9tICcuLi9hc3NlcnQnO1xuaW1wb3J0IHtleGVjdXRlQ2hlY2tIb29rcywgZXhlY3V0ZUluaXRBbmRDaGVja0hvb2tzLCBpbmNyZW1lbnRJbml0UGhhc2VGbGFnc30gZnJvbSAnLi4vaG9va3MnO1xuaW1wb3J0IHtDT05UQUlORVJfSEVBREVSX09GRlNFVCwgTENvbnRhaW5lciwgTENvbnRhaW5lckZsYWdzLCBNT1ZFRF9WSUVXU30gZnJvbSAnLi4vaW50ZXJmYWNlcy9jb250YWluZXInO1xuaW1wb3J0IHtDb21wb25lbnRUZW1wbGF0ZSwgUmVuZGVyRmxhZ3N9IGZyb20gJy4uL2ludGVyZmFjZXMvZGVmaW5pdGlvbic7XG5pbXBvcnQge0NPTlRFWFQsIEVGRkVDVFNfVE9fU0NIRURVTEUsIEVOVklST05NRU5ULCBGTEFHUywgSW5pdFBoYXNlU3RhdGUsIExWaWV3LCBMVmlld0ZsYWdzLCBQQVJFTlQsIFJFQUNUSVZFX1RFTVBMQVRFX0NPTlNVTUVSLCBUVklFVywgVFZpZXcsIFRWaWV3VHlwZX0gZnJvbSAnLi4vaW50ZXJmYWNlcy92aWV3JztcbmltcG9ydCB7Z2V0T3JCb3Jyb3dSZWFjdGl2ZUxWaWV3Q29uc3VtZXIsIG1heWJlUmV0dXJuUmVhY3RpdmVMVmlld0NvbnN1bWVyLCBSZWFjdGl2ZUxWaWV3Q29uc3VtZXJ9IGZyb20gJy4uL3JlYWN0aXZlX2x2aWV3X2NvbnN1bWVyJztcbmltcG9ydCB7ZW50ZXJWaWV3LCBpc0luQ2hlY2tOb0NoYW5nZXNNb2RlLCBsZWF2ZVZpZXcsIHNldEJpbmRpbmdJbmRleCwgc2V0SXNJbkNoZWNrTm9DaGFuZ2VzTW9kZX0gZnJvbSAnLi4vc3RhdGUnO1xuaW1wb3J0IHtnZXRGaXJzdExDb250YWluZXIsIGdldE5leHRMQ29udGFpbmVyfSBmcm9tICcuLi91dGlsL3ZpZXdfdHJhdmVyc2FsX3V0aWxzJztcbmltcG9ydCB7Z2V0Q29tcG9uZW50TFZpZXdCeUluZGV4LCBpc0NyZWF0aW9uTW9kZSwgbWFya0FuY2VzdG9yc0ZvclRyYXZlcnNhbCwgbWFya1ZpZXdGb3JSZWZyZXNoLCByZXF1aXJlc1JlZnJlc2hPclRyYXZlcnNhbCwgcmVzZXRQcmVPcmRlckhvb2tGbGFncywgdmlld0F0dGFjaGVkVG9DaGFuZ2VEZXRlY3Rvcn0gZnJvbSAnLi4vdXRpbC92aWV3X3V0aWxzJztcblxuaW1wb3J0IHtleGVjdXRlVGVtcGxhdGUsIGV4ZWN1dGVWaWV3UXVlcnlGbiwgaGFuZGxlRXJyb3IsIHByb2Nlc3NIb3N0QmluZGluZ09wQ29kZXMsIHJlZnJlc2hDb250ZW50UXVlcmllc30gZnJvbSAnLi9zaGFyZWQnO1xuXG4vKipcbiAqIFRoZSBtYXhpbXVtIG51bWJlciBvZiB0aW1lcyB0aGUgY2hhbmdlIGRldGVjdGlvbiB0cmF2ZXJzYWwgd2lsbCByZXJ1biBiZWZvcmUgdGhyb3dpbmcgYW4gZXJyb3IuXG4gKi9cbmV4cG9ydCBjb25zdCBNQVhJTVVNX1JFRlJFU0hfUkVSVU5TID0gMTAwO1xuXG5leHBvcnQgZnVuY3Rpb24gZGV0ZWN0Q2hhbmdlc0ludGVybmFsKFxuICAgIGxWaWV3OiBMVmlldywgbm90aWZ5RXJyb3JIYW5kbGVyID0gdHJ1ZSwgbW9kZSA9IENoYW5nZURldGVjdGlvbk1vZGUuR2xvYmFsKSB7XG4gIGNvbnN0IGVudmlyb25tZW50ID0gbFZpZXdbRU5WSVJPTk1FTlRdO1xuICBjb25zdCByZW5kZXJlckZhY3RvcnkgPSBlbnZpcm9ubWVudC5yZW5kZXJlckZhY3Rvcnk7XG5cbiAgLy8gQ2hlY2sgbm8gY2hhbmdlcyBtb2RlIGlzIGEgZGV2IG9ubHkgbW9kZSB1c2VkIHRvIHZlcmlmeSB0aGF0IGJpbmRpbmdzIGhhdmUgbm90IGNoYW5nZWRcbiAgLy8gc2luY2UgdGhleSB3ZXJlIGFzc2lnbmVkLiBXZSBkbyBub3Qgd2FudCB0byBpbnZva2UgcmVuZGVyZXIgZmFjdG9yeSBmdW5jdGlvbnMgaW4gdGhhdCBtb2RlXG4gIC8vIHRvIGF2b2lkIGFueSBwb3NzaWJsZSBzaWRlLWVmZmVjdHMuXG4gIGNvbnN0IGNoZWNrTm9DaGFuZ2VzTW9kZSA9ICEhbmdEZXZNb2RlICYmIGlzSW5DaGVja05vQ2hhbmdlc01vZGUoKTtcblxuICBpZiAoIWNoZWNrTm9DaGFuZ2VzTW9kZSkge1xuICAgIHJlbmRlcmVyRmFjdG9yeS5iZWdpbj8uKCk7XG4gIH1cblxuICB0cnkge1xuICAgIGRldGVjdENoYW5nZXNJblZpZXdXaGlsZURpcnR5KGxWaWV3LCBtb2RlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAobm90aWZ5RXJyb3JIYW5kbGVyKSB7XG4gICAgICBoYW5kbGVFcnJvcihsVmlldywgZXJyb3IpO1xuICAgIH1cbiAgICB0aHJvdyBlcnJvcjtcbiAgfSBmaW5hbGx5IHtcbiAgICBpZiAoIWNoZWNrTm9DaGFuZ2VzTW9kZSkge1xuICAgICAgcmVuZGVyZXJGYWN0b3J5LmVuZD8uKCk7XG5cbiAgICAgIC8vIE9uZSBmaW5hbCBmbHVzaCBvZiB0aGUgZWZmZWN0cyBxdWV1ZSB0byBjYXRjaCBhbnkgZWZmZWN0cyBjcmVhdGVkIGluIGBuZ0FmdGVyVmlld0luaXRgIG9yXG4gICAgICAvLyBvdGhlciBwb3N0LW9yZGVyIGhvb2tzLlxuICAgICAgZW52aXJvbm1lbnQuaW5saW5lRWZmZWN0UnVubmVyPy5mbHVzaCgpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBkZXRlY3RDaGFuZ2VzSW5WaWV3V2hpbGVEaXJ0eShsVmlldzogTFZpZXcsIG1vZGU6IENoYW5nZURldGVjdGlvbk1vZGUpIHtcbiAgZGV0ZWN0Q2hhbmdlc0luVmlldyhsVmlldywgbW9kZSk7XG5cbiAgbGV0IHJldHJpZXMgPSAwO1xuICAvLyBJZiBhZnRlciBydW5uaW5nIGNoYW5nZSBkZXRlY3Rpb24sIHRoaXMgdmlldyBzdGlsbCBuZWVkcyB0byBiZSByZWZyZXNoZWQgb3IgdGhlcmUgYXJlXG4gIC8vIGRlc2NlbmRhbnRzIHZpZXdzIHRoYXQgbmVlZCB0byBiZSByZWZyZXNoZWQgZHVlIHRvIHJlLWRpcnR5aW5nIGR1cmluZyB0aGUgY2hhbmdlIGRldGVjdGlvblxuICAvLyBydW4sIGRldGVjdCBjaGFuZ2VzIG9uIHRoZSB2aWV3IGFnYWluLiBXZSBydW4gY2hhbmdlIGRldGVjdGlvbiBpbiBgVGFyZ2V0ZWRgIG1vZGUgdG8gb25seVxuICAvLyByZWZyZXNoIHZpZXdzIHdpdGggdGhlIGBSZWZyZXNoVmlld2AgZmxhZy5cbiAgd2hpbGUgKHJlcXVpcmVzUmVmcmVzaE9yVHJhdmVyc2FsKGxWaWV3KSkge1xuICAgIGlmIChyZXRyaWVzID09PSBNQVhJTVVNX1JFRlJFU0hfUkVSVU5TKSB7XG4gICAgICB0aHJvdyBuZXcgUnVudGltZUVycm9yKFxuICAgICAgICAgIFJ1bnRpbWVFcnJvckNvZGUuSU5GSU5JVEVfQ0hBTkdFX0RFVEVDVElPTixcbiAgICAgICAgICBuZ0Rldk1vZGUgJiZcbiAgICAgICAgICAgICAgJ0luZmluaXRlIGNoYW5nZSBkZXRlY3Rpb24gd2hpbGUgdHJ5aW5nIHRvIHJlZnJlc2ggdmlld3MuICcgK1xuICAgICAgICAgICAgICAgICAgJ1RoZXJlIG1heSBiZSBjb21wb25lbnRzIHdoaWNoIGVhY2ggY2F1c2UgdGhlIG90aGVyIHRvIHJlcXVpcmUgYSByZWZyZXNoLCAnICtcbiAgICAgICAgICAgICAgICAgICdjYXVzaW5nIGFuIGluZmluaXRlIGxvb3AuJyk7XG4gICAgfVxuICAgIHJldHJpZXMrKztcbiAgICAvLyBFdmVuIGlmIHRoaXMgdmlldyBpcyBkZXRhY2hlZCwgd2Ugc3RpbGwgZGV0ZWN0IGNoYW5nZXMgaW4gdGFyZ2V0ZWQgbW9kZSBiZWNhdXNlIHRoaXMgd2FzXG4gICAgLy8gdGhlIHJvb3Qgb2YgdGhlIGNoYW5nZSBkZXRlY3Rpb24gcnVuLlxuICAgIGRldGVjdENoYW5nZXNJblZpZXcobFZpZXcsIENoYW5nZURldGVjdGlvbk1vZGUuVGFyZ2V0ZWQpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja05vQ2hhbmdlc0ludGVybmFsKGxWaWV3OiBMVmlldywgbm90aWZ5RXJyb3JIYW5kbGVyID0gdHJ1ZSkge1xuICBzZXRJc0luQ2hlY2tOb0NoYW5nZXNNb2RlKHRydWUpO1xuICB0cnkge1xuICAgIGRldGVjdENoYW5nZXNJbnRlcm5hbChsVmlldywgbm90aWZ5RXJyb3JIYW5kbGVyKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBzZXRJc0luQ2hlY2tOb0NoYW5nZXNNb2RlKGZhbHNlKTtcbiAgfVxufVxuXG5cbi8qKlxuICogRGlmZmVyZW50IG1vZGVzIG9mIHRyYXZlcnNpbmcgdGhlIGxvZ2ljYWwgdmlldyB0cmVlIGR1cmluZyBjaGFuZ2UgZGV0ZWN0aW9uLlxuICpcbiAqXG4gKiBUaGUgY2hhbmdlIGRldGVjdGlvbiB0cmF2ZXJzYWwgYWxnb3JpdGhtIHN3aXRjaGVzIGJldHdlZW4gdGhlc2UgbW9kZXMgYmFzZWQgb24gdmFyaW91c1xuICogY29uZGl0aW9ucy5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gQ2hhbmdlRGV0ZWN0aW9uTW9kZSB7XG4gIC8qKlxuICAgKiBJbiBgR2xvYmFsYCBtb2RlLCBgRGlydHlgIGFuZCBgQ2hlY2tBbHdheXNgIHZpZXdzIGFyZSByZWZyZXNoZWQgYXMgd2VsbCBhcyB2aWV3cyB3aXRoIHRoZVxuICAgKiBgUmVmcmVzaFZpZXdgIGZsYWcuXG4gICAqL1xuICBHbG9iYWwsXG4gIC8qKlxuICAgKiBJbiBgVGFyZ2V0ZWRgIG1vZGUsIG9ubHkgdmlld3Mgd2l0aCB0aGUgYFJlZnJlc2hWaWV3YCBmbGFnIGFyZSByZWZyZXNoZWQuXG4gICAqL1xuICBUYXJnZXRlZCxcbn1cblxuLyoqXG4gKiBQcm9jZXNzZXMgYSB2aWV3IGluIHVwZGF0ZSBtb2RlLiBUaGlzIGluY2x1ZGVzIGEgbnVtYmVyIG9mIHN0ZXBzIGluIGEgc3BlY2lmaWMgb3JkZXI6XG4gKiAtIGV4ZWN1dGluZyBhIHRlbXBsYXRlIGZ1bmN0aW9uIGluIHVwZGF0ZSBtb2RlO1xuICogLSBleGVjdXRpbmcgaG9va3M7XG4gKiAtIHJlZnJlc2hpbmcgcXVlcmllcztcbiAqIC0gc2V0dGluZyBob3N0IGJpbmRpbmdzO1xuICogLSByZWZyZXNoaW5nIGNoaWxkIChlbWJlZGRlZCBhbmQgY29tcG9uZW50KSB2aWV3cy5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcmVmcmVzaFZpZXc8VD4oXG4gICAgdFZpZXc6IFRWaWV3LCBsVmlldzogTFZpZXcsIHRlbXBsYXRlRm46IENvbXBvbmVudFRlbXBsYXRlPHt9PnxudWxsLCBjb250ZXh0OiBUKSB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnRFcXVhbChpc0NyZWF0aW9uTW9kZShsVmlldyksIGZhbHNlLCAnU2hvdWxkIGJlIHJ1biBpbiB1cGRhdGUgbW9kZScpO1xuICBjb25zdCBmbGFncyA9IGxWaWV3W0ZMQUdTXTtcbiAgaWYgKChmbGFncyAmIExWaWV3RmxhZ3MuRGVzdHJveWVkKSA9PT0gTFZpZXdGbGFncy5EZXN0cm95ZWQpIHJldHVybjtcblxuICAvLyBDaGVjayBubyBjaGFuZ2VzIG1vZGUgaXMgYSBkZXYgb25seSBtb2RlIHVzZWQgdG8gdmVyaWZ5IHRoYXQgYmluZGluZ3MgaGF2ZSBub3QgY2hhbmdlZFxuICAvLyBzaW5jZSB0aGV5IHdlcmUgYXNzaWduZWQuIFdlIGRvIG5vdCB3YW50IHRvIGV4ZWN1dGUgbGlmZWN5Y2xlIGhvb2tzIGluIHRoYXQgbW9kZS5cbiAgY29uc3QgaXNJbkNoZWNrTm9DaGFuZ2VzUGFzcyA9IG5nRGV2TW9kZSAmJiBpc0luQ2hlY2tOb0NoYW5nZXNNb2RlKCk7XG5cbiAgIWlzSW5DaGVja05vQ2hhbmdlc1Bhc3MgJiYgbFZpZXdbRU5WSVJPTk1FTlRdLmlubGluZUVmZmVjdFJ1bm5lcj8uZmx1c2goKTtcblxuXG4gIC8vIFN0YXJ0IGNvbXBvbmVudCByZWFjdGl2ZSBjb250ZXh0XG4gIC8vIC0gV2UgbWlnaHQgYWxyZWFkeSBiZSBpbiBhIHJlYWN0aXZlIGNvbnRleHQgaWYgdGhpcyBpcyBhbiBlbWJlZGRlZCB2aWV3IG9mIHRoZSBob3N0LlxuICAvLyAtIFdlIG1pZ2h0IGJlIGRlc2NlbmRpbmcgaW50byBhIHZpZXcgdGhhdCBuZWVkcyBhIGNvbnN1bWVyLlxuICBlbnRlclZpZXcobFZpZXcpO1xuICBsZXQgcHJldkNvbnN1bWVyOiBSZWFjdGl2ZU5vZGV8bnVsbCA9IG51bGw7XG4gIGxldCBjdXJyZW50Q29uc3VtZXI6IFJlYWN0aXZlTFZpZXdDb25zdW1lcnxudWxsID0gbnVsbDtcbiAgaWYgKCFpc0luQ2hlY2tOb0NoYW5nZXNQYXNzICYmIHZpZXdTaG91bGRIYXZlUmVhY3RpdmVDb25zdW1lcih0VmlldykpIHtcbiAgICBjdXJyZW50Q29uc3VtZXIgPSBnZXRPckJvcnJvd1JlYWN0aXZlTFZpZXdDb25zdW1lcihsVmlldyk7XG4gICAgcHJldkNvbnN1bWVyID0gY29uc3VtZXJCZWZvcmVDb21wdXRhdGlvbihjdXJyZW50Q29uc3VtZXIpO1xuICB9XG5cbiAgdHJ5IHtcbiAgICByZXNldFByZU9yZGVySG9va0ZsYWdzKGxWaWV3KTtcblxuICAgIHNldEJpbmRpbmdJbmRleCh0Vmlldy5iaW5kaW5nU3RhcnRJbmRleCk7XG4gICAgaWYgKHRlbXBsYXRlRm4gIT09IG51bGwpIHtcbiAgICAgIGV4ZWN1dGVUZW1wbGF0ZSh0VmlldywgbFZpZXcsIHRlbXBsYXRlRm4sIFJlbmRlckZsYWdzLlVwZGF0ZSwgY29udGV4dCk7XG4gICAgfVxuXG4gICAgY29uc3QgaG9va3NJbml0UGhhc2VDb21wbGV0ZWQgPVxuICAgICAgICAoZmxhZ3MgJiBMVmlld0ZsYWdzLkluaXRQaGFzZVN0YXRlTWFzaykgPT09IEluaXRQaGFzZVN0YXRlLkluaXRQaGFzZUNvbXBsZXRlZDtcblxuICAgIC8vIGV4ZWN1dGUgcHJlLW9yZGVyIGhvb2tzIChPbkluaXQsIE9uQ2hhbmdlcywgRG9DaGVjaylcbiAgICAvLyBQRVJGIFdBUk5JTkc6IGRvIE5PVCBleHRyYWN0IHRoaXMgdG8gYSBzZXBhcmF0ZSBmdW5jdGlvbiB3aXRob3V0IHJ1bm5pbmcgYmVuY2htYXJrc1xuICAgIGlmICghaXNJbkNoZWNrTm9DaGFuZ2VzUGFzcykge1xuICAgICAgaWYgKGhvb2tzSW5pdFBoYXNlQ29tcGxldGVkKSB7XG4gICAgICAgIGNvbnN0IHByZU9yZGVyQ2hlY2tIb29rcyA9IHRWaWV3LnByZU9yZGVyQ2hlY2tIb29rcztcbiAgICAgICAgaWYgKHByZU9yZGVyQ2hlY2tIb29rcyAhPT0gbnVsbCkge1xuICAgICAgICAgIGV4ZWN1dGVDaGVja0hvb2tzKGxWaWV3LCBwcmVPcmRlckNoZWNrSG9va3MsIG51bGwpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwcmVPcmRlckhvb2tzID0gdFZpZXcucHJlT3JkZXJIb29rcztcbiAgICAgICAgaWYgKHByZU9yZGVySG9va3MgIT09IG51bGwpIHtcbiAgICAgICAgICBleGVjdXRlSW5pdEFuZENoZWNrSG9va3MobFZpZXcsIHByZU9yZGVySG9va3MsIEluaXRQaGFzZVN0YXRlLk9uSW5pdEhvb2tzVG9CZVJ1biwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgaW5jcmVtZW50SW5pdFBoYXNlRmxhZ3MobFZpZXcsIEluaXRQaGFzZVN0YXRlLk9uSW5pdEhvb2tzVG9CZVJ1bik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRmlyc3QgbWFyayB0cmFuc3BsYW50ZWQgdmlld3MgdGhhdCBhcmUgZGVjbGFyZWQgaW4gdGhpcyBsVmlldyBhcyBuZWVkaW5nIGEgcmVmcmVzaCBhdCB0aGVpclxuICAgIC8vIGluc2VydGlvbiBwb2ludHMuIFRoaXMgaXMgbmVlZGVkIHRvIGF2b2lkIHRoZSBzaXR1YXRpb24gd2hlcmUgdGhlIHRlbXBsYXRlIGlzIGRlZmluZWQgaW4gdGhpc1xuICAgIC8vIGBMVmlld2AgYnV0IGl0cyBkZWNsYXJhdGlvbiBhcHBlYXJzIGFmdGVyIHRoZSBpbnNlcnRpb24gY29tcG9uZW50LlxuICAgIG1hcmtUcmFuc3BsYW50ZWRWaWV3c0ZvclJlZnJlc2gobFZpZXcpO1xuICAgIGRldGVjdENoYW5nZXNJbkVtYmVkZGVkVmlld3MobFZpZXcsIENoYW5nZURldGVjdGlvbk1vZGUuR2xvYmFsKTtcblxuICAgIC8vIENvbnRlbnQgcXVlcnkgcmVzdWx0cyBtdXN0IGJlIHJlZnJlc2hlZCBiZWZvcmUgY29udGVudCBob29rcyBhcmUgY2FsbGVkLlxuICAgIGlmICh0Vmlldy5jb250ZW50UXVlcmllcyAhPT0gbnVsbCkge1xuICAgICAgcmVmcmVzaENvbnRlbnRRdWVyaWVzKHRWaWV3LCBsVmlldyk7XG4gICAgfVxuXG4gICAgLy8gZXhlY3V0ZSBjb250ZW50IGhvb2tzIChBZnRlckNvbnRlbnRJbml0LCBBZnRlckNvbnRlbnRDaGVja2VkKVxuICAgIC8vIFBFUkYgV0FSTklORzogZG8gTk9UIGV4dHJhY3QgdGhpcyB0byBhIHNlcGFyYXRlIGZ1bmN0aW9uIHdpdGhvdXQgcnVubmluZyBiZW5jaG1hcmtzXG4gICAgaWYgKCFpc0luQ2hlY2tOb0NoYW5nZXNQYXNzKSB7XG4gICAgICBpZiAoaG9va3NJbml0UGhhc2VDb21wbGV0ZWQpIHtcbiAgICAgICAgY29uc3QgY29udGVudENoZWNrSG9va3MgPSB0Vmlldy5jb250ZW50Q2hlY2tIb29rcztcbiAgICAgICAgaWYgKGNvbnRlbnRDaGVja0hvb2tzICE9PSBudWxsKSB7XG4gICAgICAgICAgZXhlY3V0ZUNoZWNrSG9va3MobFZpZXcsIGNvbnRlbnRDaGVja0hvb2tzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY29udGVudEhvb2tzID0gdFZpZXcuY29udGVudEhvb2tzO1xuICAgICAgICBpZiAoY29udGVudEhvb2tzICE9PSBudWxsKSB7XG4gICAgICAgICAgZXhlY3V0ZUluaXRBbmRDaGVja0hvb2tzKFxuICAgICAgICAgICAgICBsVmlldywgY29udGVudEhvb2tzLCBJbml0UGhhc2VTdGF0ZS5BZnRlckNvbnRlbnRJbml0SG9va3NUb0JlUnVuKTtcbiAgICAgICAgfVxuICAgICAgICBpbmNyZW1lbnRJbml0UGhhc2VGbGFncyhsVmlldywgSW5pdFBoYXNlU3RhdGUuQWZ0ZXJDb250ZW50SW5pdEhvb2tzVG9CZVJ1bik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2Vzc0hvc3RCaW5kaW5nT3BDb2Rlcyh0VmlldywgbFZpZXcpO1xuXG4gICAgLy8gUmVmcmVzaCBjaGlsZCBjb21wb25lbnQgdmlld3MuXG4gICAgY29uc3QgY29tcG9uZW50cyA9IHRWaWV3LmNvbXBvbmVudHM7XG4gICAgaWYgKGNvbXBvbmVudHMgIT09IG51bGwpIHtcbiAgICAgIGRldGVjdENoYW5nZXNJbkNoaWxkQ29tcG9uZW50cyhsVmlldywgY29tcG9uZW50cywgQ2hhbmdlRGV0ZWN0aW9uTW9kZS5HbG9iYWwpO1xuICAgIH1cblxuICAgIC8vIFZpZXcgcXVlcmllcyBtdXN0IGV4ZWN1dGUgYWZ0ZXIgcmVmcmVzaGluZyBjaGlsZCBjb21wb25lbnRzIGJlY2F1c2UgYSB0ZW1wbGF0ZSBpbiB0aGlzIHZpZXdcbiAgICAvLyBjb3VsZCBiZSBpbnNlcnRlZCBpbiBhIGNoaWxkIGNvbXBvbmVudC4gSWYgdGhlIHZpZXcgcXVlcnkgZXhlY3V0ZXMgYmVmb3JlIGNoaWxkIGNvbXBvbmVudFxuICAgIC8vIHJlZnJlc2gsIHRoZSB0ZW1wbGF0ZSBtaWdodCBub3QgeWV0IGJlIGluc2VydGVkLlxuICAgIGNvbnN0IHZpZXdRdWVyeSA9IHRWaWV3LnZpZXdRdWVyeTtcbiAgICBpZiAodmlld1F1ZXJ5ICE9PSBudWxsKSB7XG4gICAgICBleGVjdXRlVmlld1F1ZXJ5Rm48VD4oUmVuZGVyRmxhZ3MuVXBkYXRlLCB2aWV3UXVlcnksIGNvbnRleHQpO1xuICAgIH1cblxuICAgIC8vIGV4ZWN1dGUgdmlldyBob29rcyAoQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZClcbiAgICAvLyBQRVJGIFdBUk5JTkc6IGRvIE5PVCBleHRyYWN0IHRoaXMgdG8gYSBzZXBhcmF0ZSBmdW5jdGlvbiB3aXRob3V0IHJ1bm5pbmcgYmVuY2htYXJrc1xuICAgIGlmICghaXNJbkNoZWNrTm9DaGFuZ2VzUGFzcykge1xuICAgICAgaWYgKGhvb2tzSW5pdFBoYXNlQ29tcGxldGVkKSB7XG4gICAgICAgIGNvbnN0IHZpZXdDaGVja0hvb2tzID0gdFZpZXcudmlld0NoZWNrSG9va3M7XG4gICAgICAgIGlmICh2aWV3Q2hlY2tIb29rcyAhPT0gbnVsbCkge1xuICAgICAgICAgIGV4ZWN1dGVDaGVja0hvb2tzKGxWaWV3LCB2aWV3Q2hlY2tIb29rcyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHZpZXdIb29rcyA9IHRWaWV3LnZpZXdIb29rcztcbiAgICAgICAgaWYgKHZpZXdIb29rcyAhPT0gbnVsbCkge1xuICAgICAgICAgIGV4ZWN1dGVJbml0QW5kQ2hlY2tIb29rcyhsVmlldywgdmlld0hvb2tzLCBJbml0UGhhc2VTdGF0ZS5BZnRlclZpZXdJbml0SG9va3NUb0JlUnVuKTtcbiAgICAgICAgfVxuICAgICAgICBpbmNyZW1lbnRJbml0UGhhc2VGbGFncyhsVmlldywgSW5pdFBoYXNlU3RhdGUuQWZ0ZXJWaWV3SW5pdEhvb2tzVG9CZVJ1bik7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0Vmlldy5maXJzdFVwZGF0ZVBhc3MgPT09IHRydWUpIHtcbiAgICAgIC8vIFdlIG5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgd2Ugb25seSBmbGlwIHRoZSBmbGFnIG9uIHN1Y2Nlc3NmdWwgYHJlZnJlc2hWaWV3YCBvbmx5XG4gICAgICAvLyBEb24ndCBkbyB0aGlzIGluIGBmaW5hbGx5YCBibG9jay5cbiAgICAgIC8vIElmIHdlIGRpZCB0aGlzIGluIGBmaW5hbGx5YCBibG9jayB0aGVuIGFuIGV4Y2VwdGlvbiBjb3VsZCBibG9jayB0aGUgZXhlY3V0aW9uIG9mIHN0eWxpbmdcbiAgICAgIC8vIGluc3RydWN0aW9ucyB3aGljaCBpbiB0dXJuIHdvdWxkIGJlIHVuYWJsZSB0byBpbnNlcnQgdGhlbXNlbHZlcyBpbnRvIHRoZSBzdHlsaW5nIGxpbmtlZFxuICAgICAgLy8gbGlzdC4gVGhlIHJlc3VsdCBvZiB0aGlzIHdvdWxkIGJlIHRoYXQgaWYgdGhlIGV4Y2VwdGlvbiB3b3VsZCBub3QgYmUgdGhyb3cgb24gc3Vic2VxdWVudCBDRFxuICAgICAgLy8gdGhlIHN0eWxpbmcgd291bGQgYmUgdW5hYmxlIHRvIHByb2Nlc3MgaXQgZGF0YSBhbmQgcmVmbGVjdCB0byB0aGUgRE9NLlxuICAgICAgdFZpZXcuZmlyc3RVcGRhdGVQYXNzID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gU2NoZWR1bGUgYW55IGVmZmVjdHMgdGhhdCBhcmUgd2FpdGluZyBvbiB0aGUgdXBkYXRlIHBhc3Mgb2YgdGhpcyB2aWV3LlxuICAgIGlmIChsVmlld1tFRkZFQ1RTX1RPX1NDSEVEVUxFXSkge1xuICAgICAgZm9yIChjb25zdCBub3RpZnlFZmZlY3Qgb2YgbFZpZXdbRUZGRUNUU19UT19TQ0hFRFVMRV0pIHtcbiAgICAgICAgbm90aWZ5RWZmZWN0KCk7XG4gICAgICB9XG5cbiAgICAgIC8vIE9uY2UgdGhleSd2ZSBiZWVuIHJ1biwgd2UgY2FuIGRyb3AgdGhlIGFycmF5LlxuICAgICAgbFZpZXdbRUZGRUNUU19UT19TQ0hFRFVMRV0gPSBudWxsO1xuICAgIH1cblxuICAgIC8vIERvIG5vdCByZXNldCB0aGUgZGlydHkgc3RhdGUgd2hlbiBydW5uaW5nIGluIGNoZWNrIG5vIGNoYW5nZXMgbW9kZS4gV2UgZG9uJ3Qgd2FudCBjb21wb25lbnRzXG4gICAgLy8gdG8gYmVoYXZlIGRpZmZlcmVudGx5IGRlcGVuZGluZyBvbiB3aGV0aGVyIGNoZWNrIG5vIGNoYW5nZXMgaXMgZW5hYmxlZCBvciBub3QuIEZvciBleGFtcGxlOlxuICAgIC8vIE1hcmtpbmcgYW4gT25QdXNoIGNvbXBvbmVudCBhcyBkaXJ0eSBmcm9tIHdpdGhpbiB0aGUgYG5nQWZ0ZXJWaWV3SW5pdGAgaG9vayBpbiBvcmRlciB0b1xuICAgIC8vIHJlZnJlc2ggYSBgTmdDbGFzc2AgYmluZGluZyBzaG91bGQgd29yay4gSWYgd2Ugd291bGQgcmVzZXQgdGhlIGRpcnR5IHN0YXRlIGluIHRoZSBjaGVja1xuICAgIC8vIG5vIGNoYW5nZXMgY3ljbGUsIHRoZSBjb21wb25lbnQgd291bGQgYmUgbm90IGJlIGRpcnR5IGZvciB0aGUgbmV4dCB1cGRhdGUgcGFzcy4gVGhpcyB3b3VsZFxuICAgIC8vIGJlIGRpZmZlcmVudCBpbiBwcm9kdWN0aW9uIG1vZGUgd2hlcmUgdGhlIGNvbXBvbmVudCBkaXJ0eSBzdGF0ZSBpcyBub3QgcmVzZXQuXG4gICAgaWYgKCFpc0luQ2hlY2tOb0NoYW5nZXNQYXNzKSB7XG4gICAgICBsVmlld1tGTEFHU10gJj0gfihMVmlld0ZsYWdzLkRpcnR5IHwgTFZpZXdGbGFncy5GaXJzdExWaWV3UGFzcyk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gSWYgcmVmcmVzaGluZyBhIHZpZXcgY2F1c2VzIGFuIGVycm9yLCB3ZSBuZWVkIHRvIHJlbWFyayB0aGUgYW5jZXN0b3JzIGFzIG5lZWRpbmcgdHJhdmVyc2FsXG4gICAgLy8gYmVjYXVzZSB0aGUgZXJyb3IgbWlnaHQgaGF2ZSBjYXVzZWQgYSBzaXR1YXRpb24gd2hlcmUgdmlld3MgYmVsb3cgdGhlIGN1cnJlbnQgbG9jYXRpb24gYXJlXG4gICAgLy8gZGlydHkgYnV0IHdpbGwgYmUgdW5yZWFjaGFibGUgYmVjYXVzZSB0aGUgXCJoYXMgZGlydHkgY2hpbGRyZW5cIiBmbGFnIGluIHRoZSBhbmNlc3RvcnMgaGFzIGJlZW5cbiAgICAvLyBjbGVhcmVkIGR1cmluZyBjaGFuZ2UgZGV0ZWN0aW9uIGFuZCB3ZSBmYWlsZWQgdG8gcnVuIHRvIGNvbXBsZXRpb24uXG5cbiAgICBtYXJrQW5jZXN0b3JzRm9yVHJhdmVyc2FsKGxWaWV3KTtcbiAgICB0aHJvdyBlO1xuICB9IGZpbmFsbHkge1xuICAgIGlmIChjdXJyZW50Q29uc3VtZXIgIT09IG51bGwpIHtcbiAgICAgIGNvbnN1bWVyQWZ0ZXJDb21wdXRhdGlvbihjdXJyZW50Q29uc3VtZXIsIHByZXZDb25zdW1lcik7XG4gICAgICBtYXliZVJldHVyblJlYWN0aXZlTFZpZXdDb25zdW1lcihjdXJyZW50Q29uc3VtZXIpO1xuICAgIH1cbiAgICBsZWF2ZVZpZXcoKTtcbiAgfVxufVxuXG4vKipcbiAqIEluZGljYXRlcyBpZiB0aGUgdmlldyBzaG91bGQgZ2V0IGl0cyBvd24gcmVhY3RpdmUgY29uc3VtZXIgbm9kZS5cbiAqXG4gKiBJbiB0aGUgY3VycmVudCBkZXNpZ24sIGFsbCBlbWJlZGRlZCB2aWV3cyBzaGFyZSBhIGNvbnN1bWVyIHdpdGggdGhlIGNvbXBvbmVudCB2aWV3LiBUaGlzIGFsbG93c1xuICogdXMgdG8gcmVmcmVzaCBhdCB0aGUgY29tcG9uZW50IGxldmVsIHJhdGhlciB0aGFuIGF0IGEgcGVyLXZpZXcgbGV2ZWwuIEluIGFkZGl0aW9uLCByb290IHZpZXdzIGdldFxuICogdGhlaXIgb3duIHJlYWN0aXZlIG5vZGUgYmVjYXVzZSByb290IGNvbXBvbmVudCB3aWxsIGhhdmUgYSBob3N0IHZpZXcgdGhhdCBleGVjdXRlcyB0aGVcbiAqIGNvbXBvbmVudCdzIGhvc3QgYmluZGluZ3MuIFRoaXMgbmVlZHMgdG8gYmUgdHJhY2tlZCBpbiBhIGNvbnN1bWVyIGFzIHdlbGwuXG4gKlxuICogVG8gZ2V0IGEgbW9yZSBncmFudWxhciBjaGFuZ2UgZGV0ZWN0aW9uIHRoYW4gcGVyLWNvbXBvbmVudCwgYWxsIHdlIHdvdWxkIGp1c3QgbmVlZCB0byB1cGRhdGUgdGhlXG4gKiBjb25kaXRpb24gaGVyZSBzbyB0aGF0IGEgZ2l2ZW4gdmlldyBnZXRzIGEgcmVhY3RpdmUgY29uc3VtZXIgd2hpY2ggY2FuIGJlY29tZSBkaXJ0eSBpbmRlcGVuZGVudGx5XG4gKiBmcm9tIGl0cyBwYXJlbnQgY29tcG9uZW50LiBGb3IgZXhhbXBsZSBlbWJlZGRlZCB2aWV3cyBmb3Igc2lnbmFsIGNvbXBvbmVudHMgY291bGQgYmUgY3JlYXRlZCB3aXRoXG4gKiBhIG5ldyB0eXBlIFwiU2lnbmFsRW1iZWRkZWRWaWV3XCIgYW5kIHRoZSBjb25kaXRpb24gaGVyZSB3b3VsZG4ndCBldmVuIG5lZWQgdXBkYXRpbmcgaW4gb3JkZXIgdG9cbiAqIGdldCBncmFudWxhciBwZXItdmlldyBjaGFuZ2UgZGV0ZWN0aW9uIGZvciBzaWduYWwgY29tcG9uZW50cy5cbiAqL1xuZnVuY3Rpb24gdmlld1Nob3VsZEhhdmVSZWFjdGl2ZUNvbnN1bWVyKHRWaWV3OiBUVmlldykge1xuICByZXR1cm4gdFZpZXcudHlwZSAhPT0gVFZpZXdUeXBlLkVtYmVkZGVkO1xufVxuXG4vKipcbiAqIEdvZXMgb3ZlciBlbWJlZGRlZCB2aWV3cyAob25lcyBjcmVhdGVkIHRocm91Z2ggVmlld0NvbnRhaW5lclJlZiBBUElzKSBhbmQgcmVmcmVzaGVzXG4gKiB0aGVtIGJ5IGV4ZWN1dGluZyBhbiBhc3NvY2lhdGVkIHRlbXBsYXRlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBkZXRlY3RDaGFuZ2VzSW5FbWJlZGRlZFZpZXdzKGxWaWV3OiBMVmlldywgbW9kZTogQ2hhbmdlRGV0ZWN0aW9uTW9kZSkge1xuICBmb3IgKGxldCBsQ29udGFpbmVyID0gZ2V0Rmlyc3RMQ29udGFpbmVyKGxWaWV3KTsgbENvbnRhaW5lciAhPT0gbnVsbDtcbiAgICAgICBsQ29udGFpbmVyID0gZ2V0TmV4dExDb250YWluZXIobENvbnRhaW5lcikpIHtcbiAgICBmb3IgKGxldCBpID0gQ09OVEFJTkVSX0hFQURFUl9PRkZTRVQ7IGkgPCBsQ29udGFpbmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBlbWJlZGRlZExWaWV3ID0gbENvbnRhaW5lcltpXTtcbiAgICAgIGRldGVjdENoYW5nZXNJblZpZXdJZkF0dGFjaGVkKGVtYmVkZGVkTFZpZXcsIG1vZGUpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIE1hcmsgdHJhbnNwbGFudGVkIHZpZXdzIGFzIG5lZWRpbmcgdG8gYmUgcmVmcmVzaGVkIGF0IHRoZWlyIGluc2VydGlvbiBwb2ludHMuXG4gKlxuICogQHBhcmFtIGxWaWV3IFRoZSBgTFZpZXdgIHRoYXQgbWF5IGhhdmUgdHJhbnNwbGFudGVkIHZpZXdzLlxuICovXG5mdW5jdGlvbiBtYXJrVHJhbnNwbGFudGVkVmlld3NGb3JSZWZyZXNoKGxWaWV3OiBMVmlldykge1xuICBmb3IgKGxldCBsQ29udGFpbmVyID0gZ2V0Rmlyc3RMQ29udGFpbmVyKGxWaWV3KTsgbENvbnRhaW5lciAhPT0gbnVsbDtcbiAgICAgICBsQ29udGFpbmVyID0gZ2V0TmV4dExDb250YWluZXIobENvbnRhaW5lcikpIHtcbiAgICBpZiAoIShsQ29udGFpbmVyW0ZMQUdTXSAmIExDb250YWluZXJGbGFncy5IYXNUcmFuc3BsYW50ZWRWaWV3cykpIGNvbnRpbnVlO1xuXG4gICAgY29uc3QgbW92ZWRWaWV3cyA9IGxDb250YWluZXJbTU9WRURfVklFV1NdITtcbiAgICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RGVmaW5lZChtb3ZlZFZpZXdzLCAnVHJhbnNwbGFudGVkIFZpZXcgZmxhZ3Mgc2V0IGJ1dCBtaXNzaW5nIE1PVkVEX1ZJRVdTJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb3ZlZFZpZXdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBtb3ZlZExWaWV3ID0gbW92ZWRWaWV3c1tpXSE7XG4gICAgICBjb25zdCBpbnNlcnRpb25MQ29udGFpbmVyID0gbW92ZWRMVmlld1tQQVJFTlRdIGFzIExDb250YWluZXI7XG4gICAgICBuZ0Rldk1vZGUgJiYgYXNzZXJ0TENvbnRhaW5lcihpbnNlcnRpb25MQ29udGFpbmVyKTtcbiAgICAgIG1hcmtWaWV3Rm9yUmVmcmVzaChtb3ZlZExWaWV3KTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBEZXRlY3RzIGNoYW5nZXMgaW4gYSBjb21wb25lbnQgYnkgZW50ZXJpbmcgdGhlIGNvbXBvbmVudCB2aWV3IGFuZCBwcm9jZXNzaW5nIGl0cyBiaW5kaW5ncyxcbiAqIHF1ZXJpZXMsIGV0Yy4gaWYgaXQgaXMgQ2hlY2tBbHdheXMsIE9uUHVzaCBhbmQgRGlydHksIGV0Yy5cbiAqXG4gKiBAcGFyYW0gY29tcG9uZW50SG9zdElkeCAgRWxlbWVudCBpbmRleCBpbiBMVmlld1tdIChhZGp1c3RlZCBmb3IgSEVBREVSX09GRlNFVClcbiAqL1xuZnVuY3Rpb24gZGV0ZWN0Q2hhbmdlc0luQ29tcG9uZW50KFxuICAgIGhvc3RMVmlldzogTFZpZXcsIGNvbXBvbmVudEhvc3RJZHg6IG51bWJlciwgbW9kZTogQ2hhbmdlRGV0ZWN0aW9uTW9kZSk6IHZvaWQge1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RXF1YWwoaXNDcmVhdGlvbk1vZGUoaG9zdExWaWV3KSwgZmFsc2UsICdTaG91bGQgYmUgcnVuIGluIHVwZGF0ZSBtb2RlJyk7XG4gIGNvbnN0IGNvbXBvbmVudFZpZXcgPSBnZXRDb21wb25lbnRMVmlld0J5SW5kZXgoY29tcG9uZW50SG9zdElkeCwgaG9zdExWaWV3KTtcbiAgZGV0ZWN0Q2hhbmdlc0luVmlld0lmQXR0YWNoZWQoY29tcG9uZW50VmlldywgbW9kZSk7XG59XG5cbi8qKlxuICogVmlzaXRzIGEgdmlldyBhcyBwYXJ0IG9mIGNoYW5nZSBkZXRlY3Rpb24gdHJhdmVyc2FsLlxuICpcbiAqIElmIHRoZSB2aWV3IGlzIGRldGFjaGVkLCBubyBhZGRpdGlvbmFsIHRyYXZlcnNhbCBoYXBwZW5zLlxuICovXG5mdW5jdGlvbiBkZXRlY3RDaGFuZ2VzSW5WaWV3SWZBdHRhY2hlZChsVmlldzogTFZpZXcsIG1vZGU6IENoYW5nZURldGVjdGlvbk1vZGUpIHtcbiAgaWYgKCF2aWV3QXR0YWNoZWRUb0NoYW5nZURldGVjdG9yKGxWaWV3KSkge1xuICAgIHJldHVybjtcbiAgfVxuICBkZXRlY3RDaGFuZ2VzSW5WaWV3KGxWaWV3LCBtb2RlKTtcbn1cblxuLyoqXG4gKiBWaXNpdHMgYSB2aWV3IGFzIHBhcnQgb2YgY2hhbmdlIGRldGVjdGlvbiB0cmF2ZXJzYWwuXG4gKlxuICogVGhlIHZpZXcgaXMgcmVmcmVzaGVkIGlmOlxuICogLSBJZiB0aGUgdmlldyBpcyBDaGVja0Fsd2F5cyBvciBEaXJ0eSBhbmQgQ2hhbmdlRGV0ZWN0aW9uTW9kZSBpcyBgR2xvYmFsYFxuICogLSBJZiB0aGUgdmlldyBoYXMgdGhlIGBSZWZyZXNoVmlld2AgZmxhZ1xuICpcbiAqIFRoZSB2aWV3IGlzIG5vdCByZWZyZXNoZWQsIGJ1dCBkZXNjZW5kYW50cyBhcmUgdHJhdmVyc2VkIGluIGBDaGFuZ2VEZXRlY3Rpb25Nb2RlLlRhcmdldGVkYCBpZiB0aGVcbiAqIHZpZXcgSGFzQ2hpbGRWaWV3c1RvUmVmcmVzaCBmbGFnIGlzIHNldC5cbiAqL1xuZnVuY3Rpb24gZGV0ZWN0Q2hhbmdlc0luVmlldyhsVmlldzogTFZpZXcsIG1vZGU6IENoYW5nZURldGVjdGlvbk1vZGUpIHtcbiAgY29uc3QgaXNJbkNoZWNrTm9DaGFuZ2VzUGFzcyA9IG5nRGV2TW9kZSAmJiBpc0luQ2hlY2tOb0NoYW5nZXNNb2RlKCk7XG4gIGNvbnN0IHRWaWV3ID0gbFZpZXdbVFZJRVddO1xuICBjb25zdCBmbGFncyA9IGxWaWV3W0ZMQUdTXTtcbiAgY29uc3QgY29uc3VtZXIgPSBsVmlld1tSRUFDVElWRV9URU1QTEFURV9DT05TVU1FUl07XG5cbiAgLy8gUmVmcmVzaCBDaGVja0Fsd2F5cyB2aWV3cyBpbiBHbG9iYWwgbW9kZS5cbiAgbGV0IHNob3VsZFJlZnJlc2hWaWV3OiBib29sZWFuID1cbiAgICAgICEhKG1vZGUgPT09IENoYW5nZURldGVjdGlvbk1vZGUuR2xvYmFsICYmIGZsYWdzICYgTFZpZXdGbGFncy5DaGVja0Fsd2F5cyk7XG5cbiAgLy8gUmVmcmVzaCBEaXJ0eSB2aWV3cyBpbiBHbG9iYWwgbW9kZSwgYXMgbG9uZyBhcyB3ZSdyZSBub3QgaW4gY2hlY2tOb0NoYW5nZXMuXG4gIC8vIENoZWNrTm9DaGFuZ2VzIG5ldmVyIHdvcmtlZCB3aXRoIGBPblB1c2hgIGNvbXBvbmVudHMgYmVjYXVzZSB0aGUgYERpcnR5YCBmbGFnIHdhc1xuICAvLyBjbGVhcmVkIGJlZm9yZSBjaGVja05vQ2hhbmdlcyByYW4uIEJlY2F1c2UgdGhlcmUgaXMgbm93IGEgbG9vcCBmb3IgdG8gY2hlY2sgZm9yXG4gIC8vIGJhY2t3YXJkcyB2aWV3cywgaXQgZ2l2ZXMgYW4gb3Bwb3J0dW5pdHkgZm9yIGBPblB1c2hgIGNvbXBvbmVudHMgdG8gYmUgbWFya2VkIGBEaXJ0eWBcbiAgLy8gYmVmb3JlIHRoZSBDaGVja05vQ2hhbmdlcyBwYXNzLiBXZSBkb24ndCB3YW50IGV4aXN0aW5nIGVycm9ycyB0aGF0IGFyZSBoaWRkZW4gYnkgdGhlXG4gIC8vIGN1cnJlbnQgQ2hlY2tOb0NoYW5nZXMgYnVnIHRvIHN1cmZhY2Ugd2hlbiBtYWtpbmcgdW5yZWxhdGVkIGNoYW5nZXMuXG4gIHNob3VsZFJlZnJlc2hWaWV3IHx8PSAhIShcbiAgICAgIGZsYWdzICYgTFZpZXdGbGFncy5EaXJ0eSAmJiBtb2RlID09PSBDaGFuZ2VEZXRlY3Rpb25Nb2RlLkdsb2JhbCAmJiAhaXNJbkNoZWNrTm9DaGFuZ2VzUGFzcyk7XG5cbiAgLy8gQWx3YXlzIHJlZnJlc2ggdmlld3MgbWFya2VkIGZvciByZWZyZXNoLCByZWdhcmRsZXNzIG9mIG1vZGUuXG4gIHNob3VsZFJlZnJlc2hWaWV3IHx8PSAhIShmbGFncyAmIExWaWV3RmxhZ3MuUmVmcmVzaFZpZXcpO1xuXG4gIC8vIFJlZnJlc2ggdmlld3Mgd2hlbiB0aGV5IGhhdmUgYSBkaXJ0eSByZWFjdGl2ZSBjb25zdW1lciwgcmVnYXJkbGVzcyBvZiBtb2RlLlxuICBzaG91bGRSZWZyZXNoVmlldyB8fD0gISEoY29uc3VtZXI/LmRpcnR5ICYmIGNvbnN1bWVyUG9sbFByb2R1Y2Vyc0ZvckNoYW5nZShjb25zdW1lcikpO1xuXG4gIC8vIE1hcmsgdGhlIEZsYWdzIGFuZCBgUmVhY3RpdmVOb2RlYCBhcyBub3QgZGlydHkgYmVmb3JlIHJlZnJlc2hpbmcgdGhlIGNvbXBvbmVudCwgc28gdGhhdCB0aGV5XG4gIC8vIGNhbiBiZSByZS1kaXJ0aWVkIGR1cmluZyB0aGUgcmVmcmVzaCBwcm9jZXNzLlxuICBpZiAoY29uc3VtZXIpIHtcbiAgICBjb25zdW1lci5kaXJ0eSA9IGZhbHNlO1xuICB9XG4gIGxWaWV3W0ZMQUdTXSAmPSB+KExWaWV3RmxhZ3MuSGFzQ2hpbGRWaWV3c1RvUmVmcmVzaCB8IExWaWV3RmxhZ3MuUmVmcmVzaFZpZXcpO1xuXG4gIGlmIChzaG91bGRSZWZyZXNoVmlldykge1xuICAgIHJlZnJlc2hWaWV3KHRWaWV3LCBsVmlldywgdFZpZXcudGVtcGxhdGUsIGxWaWV3W0NPTlRFWFRdKTtcbiAgfSBlbHNlIGlmIChmbGFncyAmIExWaWV3RmxhZ3MuSGFzQ2hpbGRWaWV3c1RvUmVmcmVzaCkge1xuICAgIGRldGVjdENoYW5nZXNJbkVtYmVkZGVkVmlld3MobFZpZXcsIENoYW5nZURldGVjdGlvbk1vZGUuVGFyZ2V0ZWQpO1xuICAgIGNvbnN0IGNvbXBvbmVudHMgPSB0Vmlldy5jb21wb25lbnRzO1xuICAgIGlmIChjb21wb25lbnRzICE9PSBudWxsKSB7XG4gICAgICBkZXRlY3RDaGFuZ2VzSW5DaGlsZENvbXBvbmVudHMobFZpZXcsIGNvbXBvbmVudHMsIENoYW5nZURldGVjdGlvbk1vZGUuVGFyZ2V0ZWQpO1xuICAgIH1cbiAgfVxufVxuXG4vKiogUmVmcmVzaGVzIGNoaWxkIGNvbXBvbmVudHMgaW4gdGhlIGN1cnJlbnQgdmlldyAodXBkYXRlIG1vZGUpLiAqL1xuZnVuY3Rpb24gZGV0ZWN0Q2hhbmdlc0luQ2hpbGRDb21wb25lbnRzKFxuICAgIGhvc3RMVmlldzogTFZpZXcsIGNvbXBvbmVudHM6IG51bWJlcltdLCBtb2RlOiBDaGFuZ2VEZXRlY3Rpb25Nb2RlKTogdm9pZCB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29tcG9uZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGRldGVjdENoYW5nZXNJbkNvbXBvbmVudChob3N0TFZpZXcsIGNvbXBvbmVudHNbaV0sIG1vZGUpO1xuICB9XG59XG4iXX0=