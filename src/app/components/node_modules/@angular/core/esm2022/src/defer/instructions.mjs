/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { setActiveConsumer } from '@angular/core/primitives/signals';
import { CachedInjectorService } from '../cached_injector_service';
import { EnvironmentInjector, InjectionToken } from '../di';
import { internalImportProvidersFrom } from '../di/provider_collection';
import { RuntimeError } from '../errors';
import { findMatchingDehydratedView } from '../hydration/views';
import { populateDehydratedViewsInLContainer } from '../linker/view_container_ref';
import { PendingTasks } from '../pending_tasks';
import { assertLContainer, assertTNodeForLView } from '../render3/assert';
import { bindingUpdated } from '../render3/bindings';
import { ChainedInjector } from '../render3/component_ref';
import { getComponentDef, getDirectiveDef, getPipeDef } from '../render3/definition';
import { getTemplateLocationDetails } from '../render3/instructions/element_validation';
import { markViewDirty } from '../render3/instructions/mark_view_dirty';
import { handleError } from '../render3/instructions/shared';
import { ɵɵtemplate } from '../render3/instructions/template';
import { isDestroyed } from '../render3/interfaces/type_checks';
import { HEADER_OFFSET, INJECTOR, PARENT, TVIEW } from '../render3/interfaces/view';
import { getCurrentTNode, getLView, getSelectedTNode, getTView, nextBindingIndex } from '../render3/state';
import { isPlatformBrowser } from '../render3/util/misc_utils';
import { getConstant, getTNode, removeLViewOnDestroy, storeLViewOnDestroy } from '../render3/util/view_utils';
import { addLViewToLContainer, createAndRenderEmbeddedLView, removeLViewFromLContainer, shouldAddViewToDom } from '../render3/view_manipulation';
import { assertDefined, throwError } from '../util/assert';
import { performanceMarkFeature } from '../util/performance';
import { invokeAllTriggerCleanupFns, invokeTriggerCleanupFns, storeTriggerCleanupFn } from './cleanup';
import { onHover, onInteraction, onViewport, registerDomTrigger } from './dom_triggers';
import { onIdle } from './idle_scheduler';
import { DEFER_BLOCK_STATE, DeferBlockBehavior, DeferBlockInternalState, DeferBlockState, DeferDependenciesLoadingState, LOADING_AFTER_CLEANUP_FN, NEXT_DEFER_BLOCK_STATE, STATE_IS_FROZEN_UNTIL } from './interfaces';
import { onTimer, scheduleTimerTrigger } from './timer_scheduler';
import { addDepsToRegistry, assertDeferredDependenciesLoaded, getLDeferBlockDetails, getLoadingBlockAfter, getMinimumDurationForState, getPrimaryBlockTNode, getTDeferBlockDetails, getTemplateIndexForState, setLDeferBlockDetails, setTDeferBlockDetails } from './utils';
/**
 * **INTERNAL**, avoid referencing it in application code.
 * *
 * Injector token that allows to provide `DeferBlockDependencyInterceptor` class
 * implementation.
 *
 * This token is only injected in devMode
 */
export const DEFER_BLOCK_DEPENDENCY_INTERCEPTOR = new InjectionToken('DEFER_BLOCK_DEPENDENCY_INTERCEPTOR');
/**
 * **INTERNAL**, token used for configuring defer block behavior.
 */
export const DEFER_BLOCK_CONFIG = new InjectionToken(ngDevMode ? 'DEFER_BLOCK_CONFIG' : '');
/**
 * Returns whether defer blocks should be triggered.
 *
 * Currently, defer blocks are not triggered on the server,
 * only placeholder content is rendered (if provided).
 */
function shouldTriggerDeferBlock(injector) {
    const config = injector.get(DEFER_BLOCK_CONFIG, null, { optional: true });
    if (config?.behavior === DeferBlockBehavior.Manual) {
        return false;
    }
    return isPlatformBrowser(injector);
}
/**
 * Reference to the timer-based scheduler implementation of defer block state
 * rendering method. It's used to make timer-based scheduling tree-shakable.
 * If `minimum` or `after` parameters are used, compiler generates an extra
 * argument for the `ɵɵdefer` instruction, which references a timer-based
 * implementation.
 */
let applyDeferBlockStateWithSchedulingImpl = null;
/**
 * Enables timer-related scheduling if `after` or `minimum` parameters are setup
 * on the `@loading` or `@placeholder` blocks.
 */
export function ɵɵdeferEnableTimerScheduling(tView, tDetails, placeholderConfigIndex, loadingConfigIndex) {
    const tViewConsts = tView.consts;
    if (placeholderConfigIndex != null) {
        tDetails.placeholderBlockConfig =
            getConstant(tViewConsts, placeholderConfigIndex);
    }
    if (loadingConfigIndex != null) {
        tDetails.loadingBlockConfig =
            getConstant(tViewConsts, loadingConfigIndex);
    }
    // Enable implementation that supports timer-based scheduling.
    if (applyDeferBlockStateWithSchedulingImpl === null) {
        applyDeferBlockStateWithSchedulingImpl = applyDeferBlockStateWithScheduling;
    }
}
/**
 * Creates runtime data structures for defer blocks.
 *
 * @param index Index of the `defer` instruction.
 * @param primaryTmplIndex Index of the template with the primary block content.
 * @param dependencyResolverFn Function that contains dependencies for this defer block.
 * @param loadingTmplIndex Index of the template with the loading block content.
 * @param placeholderTmplIndex Index of the template with the placeholder block content.
 * @param errorTmplIndex Index of the template with the error block content.
 * @param loadingConfigIndex Index in the constants array of the configuration of the loading.
 *     block.
 * @param placeholderConfigIndex Index in the constants array of the configuration of the
 *     placeholder block.
 * @param enableTimerScheduling Function that enables timer-related scheduling if `after`
 *     or `minimum` parameters are setup on the `@loading` or `@placeholder` blocks.
 *
 * @codeGenApi
 */
export function ɵɵdefer(index, primaryTmplIndex, dependencyResolverFn, loadingTmplIndex, placeholderTmplIndex, errorTmplIndex, loadingConfigIndex, placeholderConfigIndex, enableTimerScheduling) {
    const lView = getLView();
    const tView = getTView();
    const adjustedIndex = index + HEADER_OFFSET;
    ɵɵtemplate(index, null, 0, 0);
    if (tView.firstCreatePass) {
        performanceMarkFeature('NgDefer');
        const tDetails = {
            primaryTmplIndex,
            loadingTmplIndex: loadingTmplIndex ?? null,
            placeholderTmplIndex: placeholderTmplIndex ?? null,
            errorTmplIndex: errorTmplIndex ?? null,
            placeholderBlockConfig: null,
            loadingBlockConfig: null,
            dependencyResolverFn: dependencyResolverFn ?? null,
            loadingState: DeferDependenciesLoadingState.NOT_STARTED,
            loadingPromise: null,
            providers: null,
        };
        enableTimerScheduling?.(tView, tDetails, placeholderConfigIndex, loadingConfigIndex);
        setTDeferBlockDetails(tView, adjustedIndex, tDetails);
    }
    const tNode = getCurrentTNode();
    const lContainer = lView[adjustedIndex];
    // If hydration is enabled, looks up dehydrated views in the DOM
    // using hydration annotation info and stores those views on LContainer.
    // In client-only mode, this function is a noop.
    populateDehydratedViewsInLContainer(lContainer, tNode, lView);
    // Init instance-specific defer details and store it.
    const lDetails = [
        null, // NEXT_DEFER_BLOCK_STATE
        DeferBlockInternalState.Initial, // DEFER_BLOCK_STATE
        null, // STATE_IS_FROZEN_UNTIL
        null, // LOADING_AFTER_CLEANUP_FN
        null, // TRIGGER_CLEANUP_FNS
        null // PREFETCH_TRIGGER_CLEANUP_FNS
    ];
    setLDeferBlockDetails(lView, adjustedIndex, lDetails);
    const cleanupTriggersFn = () => invokeAllTriggerCleanupFns(lDetails);
    // When defer block is triggered - unsubscribe from LView destroy cleanup.
    storeTriggerCleanupFn(0 /* TriggerType.Regular */, lDetails, () => removeLViewOnDestroy(lView, cleanupTriggersFn));
    storeLViewOnDestroy(lView, cleanupTriggersFn);
}
/**
 * Loads defer block dependencies when a trigger value becomes truthy.
 * @codeGenApi
 */
export function ɵɵdeferWhen(rawValue) {
    const lView = getLView();
    const bindingIndex = nextBindingIndex();
    if (bindingUpdated(lView, bindingIndex, rawValue)) {
        const prevConsumer = setActiveConsumer(null);
        try {
            const value = Boolean(rawValue); // handle truthy or falsy values
            const tNode = getSelectedTNode();
            const lDetails = getLDeferBlockDetails(lView, tNode);
            const renderedState = lDetails[DEFER_BLOCK_STATE];
            if (value === false && renderedState === DeferBlockInternalState.Initial) {
                // If nothing is rendered yet, render a placeholder (if defined).
                renderPlaceholder(lView, tNode);
            }
            else if (value === true &&
                (renderedState === DeferBlockInternalState.Initial ||
                    renderedState === DeferBlockState.Placeholder)) {
                // The `when` condition has changed to `true`, trigger defer block loading
                // if the block is either in initial (nothing is rendered) or a placeholder
                // state.
                triggerDeferBlock(lView, tNode);
            }
        }
        finally {
            setActiveConsumer(prevConsumer);
        }
    }
}
/**
 * Prefetches the deferred content when a value becomes truthy.
 * @codeGenApi
 */
export function ɵɵdeferPrefetchWhen(rawValue) {
    const lView = getLView();
    const bindingIndex = nextBindingIndex();
    if (bindingUpdated(lView, bindingIndex, rawValue)) {
        const prevConsumer = setActiveConsumer(null);
        try {
            const value = Boolean(rawValue); // handle truthy or falsy values
            const tView = lView[TVIEW];
            const tNode = getSelectedTNode();
            const tDetails = getTDeferBlockDetails(tView, tNode);
            if (value === true && tDetails.loadingState === DeferDependenciesLoadingState.NOT_STARTED) {
                // If loading has not been started yet, trigger it now.
                triggerPrefetching(tDetails, lView, tNode);
            }
        }
        finally {
            setActiveConsumer(prevConsumer);
        }
    }
}
/**
 * Sets up logic to handle the `on idle` deferred trigger.
 * @codeGenApi
 */
export function ɵɵdeferOnIdle() {
    scheduleDelayedTrigger(onIdle);
}
/**
 * Sets up logic to handle the `prefetch on idle` deferred trigger.
 * @codeGenApi
 */
export function ɵɵdeferPrefetchOnIdle() {
    scheduleDelayedPrefetching(onIdle);
}
/**
 * Sets up logic to handle the `on immediate` deferred trigger.
 * @codeGenApi
 */
export function ɵɵdeferOnImmediate() {
    const lView = getLView();
    const tNode = getCurrentTNode();
    const tView = lView[TVIEW];
    const injector = lView[INJECTOR];
    const tDetails = getTDeferBlockDetails(tView, tNode);
    // Render placeholder block only if loading template is not present and we're on
    // the client to avoid content flickering, since it would be immediately replaced
    // by the loading block.
    if (!shouldTriggerDeferBlock(injector) || tDetails.loadingTmplIndex === null) {
        renderPlaceholder(lView, tNode);
    }
    triggerDeferBlock(lView, tNode);
}
/**
 * Sets up logic to handle the `prefetch on immediate` deferred trigger.
 * @codeGenApi
 */
export function ɵɵdeferPrefetchOnImmediate() {
    const lView = getLView();
    const tNode = getCurrentTNode();
    const tView = lView[TVIEW];
    const tDetails = getTDeferBlockDetails(tView, tNode);
    if (tDetails.loadingState === DeferDependenciesLoadingState.NOT_STARTED) {
        triggerResourceLoading(tDetails, lView, tNode);
    }
}
/**
 * Creates runtime data structures for the `on timer` deferred trigger.
 * @param delay Amount of time to wait before loading the content.
 * @codeGenApi
 */
export function ɵɵdeferOnTimer(delay) {
    scheduleDelayedTrigger(onTimer(delay));
}
/**
 * Creates runtime data structures for the `prefetch on timer` deferred trigger.
 * @param delay Amount of time to wait before prefetching the content.
 * @codeGenApi
 */
export function ɵɵdeferPrefetchOnTimer(delay) {
    scheduleDelayedPrefetching(onTimer(delay));
}
/**
 * Creates runtime data structures for the `on hover` deferred trigger.
 * @param triggerIndex Index at which to find the trigger element.
 * @param walkUpTimes Number of times to walk up/down the tree hierarchy to find the trigger.
 * @codeGenApi
 */
export function ɵɵdeferOnHover(triggerIndex, walkUpTimes) {
    const lView = getLView();
    const tNode = getCurrentTNode();
    renderPlaceholder(lView, tNode);
    registerDomTrigger(lView, tNode, triggerIndex, walkUpTimes, onHover, () => triggerDeferBlock(lView, tNode), 0 /* TriggerType.Regular */);
}
/**
 * Creates runtime data structures for the `prefetch on hover` deferred trigger.
 * @param triggerIndex Index at which to find the trigger element.
 * @param walkUpTimes Number of times to walk up/down the tree hierarchy to find the trigger.
 * @codeGenApi
 */
export function ɵɵdeferPrefetchOnHover(triggerIndex, walkUpTimes) {
    const lView = getLView();
    const tNode = getCurrentTNode();
    const tView = lView[TVIEW];
    const tDetails = getTDeferBlockDetails(tView, tNode);
    if (tDetails.loadingState === DeferDependenciesLoadingState.NOT_STARTED) {
        registerDomTrigger(lView, tNode, triggerIndex, walkUpTimes, onHover, () => triggerPrefetching(tDetails, lView, tNode), 1 /* TriggerType.Prefetch */);
    }
}
/**
 * Creates runtime data structures for the `on interaction` deferred trigger.
 * @param triggerIndex Index at which to find the trigger element.
 * @param walkUpTimes Number of times to walk up/down the tree hierarchy to find the trigger.
 * @codeGenApi
 */
export function ɵɵdeferOnInteraction(triggerIndex, walkUpTimes) {
    const lView = getLView();
    const tNode = getCurrentTNode();
    renderPlaceholder(lView, tNode);
    registerDomTrigger(lView, tNode, triggerIndex, walkUpTimes, onInteraction, () => triggerDeferBlock(lView, tNode), 0 /* TriggerType.Regular */);
}
/**
 * Creates runtime data structures for the `prefetch on interaction` deferred trigger.
 * @param triggerIndex Index at which to find the trigger element.
 * @param walkUpTimes Number of times to walk up/down the tree hierarchy to find the trigger.
 * @codeGenApi
 */
export function ɵɵdeferPrefetchOnInteraction(triggerIndex, walkUpTimes) {
    const lView = getLView();
    const tNode = getCurrentTNode();
    const tView = lView[TVIEW];
    const tDetails = getTDeferBlockDetails(tView, tNode);
    if (tDetails.loadingState === DeferDependenciesLoadingState.NOT_STARTED) {
        registerDomTrigger(lView, tNode, triggerIndex, walkUpTimes, onInteraction, () => triggerPrefetching(tDetails, lView, tNode), 1 /* TriggerType.Prefetch */);
    }
}
/**
 * Creates runtime data structures for the `on viewport` deferred trigger.
 * @param triggerIndex Index at which to find the trigger element.
 * @param walkUpTimes Number of times to walk up/down the tree hierarchy to find the trigger.
 * @codeGenApi
 */
export function ɵɵdeferOnViewport(triggerIndex, walkUpTimes) {
    const lView = getLView();
    const tNode = getCurrentTNode();
    renderPlaceholder(lView, tNode);
    registerDomTrigger(lView, tNode, triggerIndex, walkUpTimes, onViewport, () => triggerDeferBlock(lView, tNode), 0 /* TriggerType.Regular */);
}
/**
 * Creates runtime data structures for the `prefetch on viewport` deferred trigger.
 * @param triggerIndex Index at which to find the trigger element.
 * @param walkUpTimes Number of times to walk up/down the tree hierarchy to find the trigger.
 * @codeGenApi
 */
export function ɵɵdeferPrefetchOnViewport(triggerIndex, walkUpTimes) {
    const lView = getLView();
    const tNode = getCurrentTNode();
    const tView = lView[TVIEW];
    const tDetails = getTDeferBlockDetails(tView, tNode);
    if (tDetails.loadingState === DeferDependenciesLoadingState.NOT_STARTED) {
        registerDomTrigger(lView, tNode, triggerIndex, walkUpTimes, onViewport, () => triggerPrefetching(tDetails, lView, tNode), 1 /* TriggerType.Prefetch */);
    }
}
/********** Helper functions **********/
/**
 * Schedules triggering of a defer block for `on idle` and `on timer` conditions.
 */
function scheduleDelayedTrigger(scheduleFn) {
    const lView = getLView();
    const tNode = getCurrentTNode();
    renderPlaceholder(lView, tNode);
    // Only trigger the scheduled trigger on the browser
    // since we don't want to delay the server response.
    if (isPlatformBrowser(lView[INJECTOR])) {
        const cleanupFn = scheduleFn(() => triggerDeferBlock(lView, tNode), lView);
        const lDetails = getLDeferBlockDetails(lView, tNode);
        storeTriggerCleanupFn(0 /* TriggerType.Regular */, lDetails, cleanupFn);
    }
}
/**
 * Schedules prefetching for `on idle` and `on timer` triggers.
 *
 * @param scheduleFn A function that does the scheduling.
 */
function scheduleDelayedPrefetching(scheduleFn) {
    const lView = getLView();
    // Only trigger the scheduled trigger on the browser
    // since we don't want to delay the server response.
    if (isPlatformBrowser(lView[INJECTOR])) {
        const tNode = getCurrentTNode();
        const tView = lView[TVIEW];
        const tDetails = getTDeferBlockDetails(tView, tNode);
        if (tDetails.loadingState === DeferDependenciesLoadingState.NOT_STARTED) {
            const lDetails = getLDeferBlockDetails(lView, tNode);
            const prefetch = () => triggerPrefetching(tDetails, lView, tNode);
            const cleanupFn = scheduleFn(prefetch, lView);
            storeTriggerCleanupFn(1 /* TriggerType.Prefetch */, lDetails, cleanupFn);
        }
    }
}
/**
 * Transitions a defer block to the new state. Updates the  necessary
 * data structures and renders corresponding block.
 *
 * @param newState New state that should be applied to the defer block.
 * @param tNode TNode that represents a defer block.
 * @param lContainer Represents an instance of a defer block.
 * @param skipTimerScheduling Indicates that `@loading` and `@placeholder` block
 *   should be rendered immediately, even if they have `after` or `minimum` config
 *   options setup. This flag to needed for testing APIs to transition defer block
 *   between states via `DeferFixture.render` method.
 */
export function renderDeferBlockState(newState, tNode, lContainer, skipTimerScheduling = false) {
    const hostLView = lContainer[PARENT];
    const hostTView = hostLView[TVIEW];
    // Check if this view is not destroyed. Since the loading process was async,
    // the view might end up being destroyed by the time rendering happens.
    if (isDestroyed(hostLView))
        return;
    // Make sure this TNode belongs to TView that represents host LView.
    ngDevMode && assertTNodeForLView(tNode, hostLView);
    const lDetails = getLDeferBlockDetails(hostLView, tNode);
    ngDevMode && assertDefined(lDetails, 'Expected a defer block state defined');
    const currentState = lDetails[DEFER_BLOCK_STATE];
    if (isValidStateChange(currentState, newState) &&
        isValidStateChange(lDetails[NEXT_DEFER_BLOCK_STATE] ?? -1, newState)) {
        const injector = hostLView[INJECTOR];
        const tDetails = getTDeferBlockDetails(hostTView, tNode);
        // Skips scheduling on the server since it can delay the server response.
        const needsScheduling = !skipTimerScheduling && isPlatformBrowser(injector) &&
            (getLoadingBlockAfter(tDetails) !== null ||
                getMinimumDurationForState(tDetails, DeferBlockState.Loading) !== null ||
                getMinimumDurationForState(tDetails, DeferBlockState.Placeholder));
        if (ngDevMode && needsScheduling) {
            assertDefined(applyDeferBlockStateWithSchedulingImpl, 'Expected scheduling function to be defined');
        }
        const applyStateFn = needsScheduling ? applyDeferBlockStateWithSchedulingImpl : applyDeferBlockState;
        try {
            applyStateFn(newState, lDetails, lContainer, tNode, hostLView);
        }
        catch (error) {
            handleError(hostLView, error);
        }
    }
}
/**
 * Detects whether an injector is an instance of a `ChainedInjector`,
 * created based on the `OutletInjector`.
 */
export function isRouterOutletInjector(currentInjector) {
    return (currentInjector instanceof ChainedInjector) &&
        (typeof currentInjector.injector.__ngOutletInjector === 'function');
}
/**
 * Creates an instance of the `OutletInjector` using a private factory
 * function available on the `OutletInjector` class.
 *
 * @param parentOutletInjector Parent OutletInjector, which should be used
 *                             to produce a new instance.
 * @param parentInjector An Injector, which should be used as a parent one
 *                       for a newly created `OutletInjector` instance.
 */
function createRouterOutletInjector(parentOutletInjector, parentInjector) {
    const outletInjector = parentOutletInjector.injector;
    return outletInjector.__ngOutletInjector(parentInjector);
}
/**
 * Applies changes to the DOM to reflect a given state.
 */
function applyDeferBlockState(newState, lDetails, lContainer, tNode, hostLView) {
    const stateTmplIndex = getTemplateIndexForState(newState, hostLView, tNode);
    if (stateTmplIndex !== null) {
        lDetails[DEFER_BLOCK_STATE] = newState;
        const hostTView = hostLView[TVIEW];
        const adjustedIndex = stateTmplIndex + HEADER_OFFSET;
        const activeBlockTNode = getTNode(hostTView, adjustedIndex);
        // There is only 1 view that can be present in an LContainer that
        // represents a defer block, so always refer to the first one.
        const viewIndex = 0;
        removeLViewFromLContainer(lContainer, viewIndex);
        let injector;
        if (newState === DeferBlockState.Complete) {
            // When we render a defer block in completed state, there might be
            // newly loaded standalone components used within the block, which may
            // import NgModules with providers. In order to make those providers
            // available for components declared in that NgModule, we create an instance
            // of environment injector to host those providers and pass this injector
            // to the logic that creates a view.
            const tDetails = getTDeferBlockDetails(hostTView, tNode);
            const providers = tDetails.providers;
            if (providers && providers.length > 0) {
                const parentInjector = hostLView[INJECTOR];
                // Note: we have a special case for Router's `OutletInjector`,
                // since it's not an instance of the `EnvironmentInjector`, so
                // we can't inject it. Once the `OutletInjector` is replaced
                // with the `EnvironmentInjector` in Router's code, this special
                // handling can be removed.
                const isParentOutletInjector = isRouterOutletInjector(parentInjector);
                const parentEnvInjector = isParentOutletInjector ? parentInjector : parentInjector.get(EnvironmentInjector);
                injector = parentEnvInjector.get(CachedInjectorService)
                    .getOrCreateInjector(tDetails, parentEnvInjector, providers, ngDevMode ? 'DeferBlock Injector' : '');
                // Note: this is a continuation of the special case for Router's `OutletInjector`.
                // Since the `OutletInjector` handles `ActivatedRoute` and `ChildrenOutletContexts`
                // dynamically (i.e. their values are not really stored statically in an injector),
                // we need to "wrap" a defer injector into another `OutletInjector`, so we retain
                // the dynamic resolution of the mentioned tokens.
                if (isParentOutletInjector) {
                    injector = createRouterOutletInjector(parentInjector, injector);
                }
            }
        }
        const dehydratedView = findMatchingDehydratedView(lContainer, activeBlockTNode.tView.ssrId);
        const embeddedLView = createAndRenderEmbeddedLView(hostLView, activeBlockTNode, null, { dehydratedView, injector });
        addLViewToLContainer(lContainer, embeddedLView, viewIndex, shouldAddViewToDom(activeBlockTNode, dehydratedView));
        markViewDirty(embeddedLView);
    }
}
/**
 * Extends the `applyDeferBlockState` with timer-based scheduling.
 * This function becomes available on a page if there are defer blocks
 * that use `after` or `minimum` parameters in the `@loading` or
 * `@placeholder` blocks.
 */
function applyDeferBlockStateWithScheduling(newState, lDetails, lContainer, tNode, hostLView) {
    const now = Date.now();
    const hostTView = hostLView[TVIEW];
    const tDetails = getTDeferBlockDetails(hostTView, tNode);
    if (lDetails[STATE_IS_FROZEN_UNTIL] === null || lDetails[STATE_IS_FROZEN_UNTIL] <= now) {
        lDetails[STATE_IS_FROZEN_UNTIL] = null;
        const loadingAfter = getLoadingBlockAfter(tDetails);
        const inLoadingAfterPhase = lDetails[LOADING_AFTER_CLEANUP_FN] !== null;
        if (newState === DeferBlockState.Loading && loadingAfter !== null && !inLoadingAfterPhase) {
            // Trying to render loading, but it has an `after` config,
            // so schedule an update action after a timeout.
            lDetails[NEXT_DEFER_BLOCK_STATE] = newState;
            const cleanupFn = scheduleDeferBlockUpdate(loadingAfter, lDetails, tNode, lContainer, hostLView);
            lDetails[LOADING_AFTER_CLEANUP_FN] = cleanupFn;
        }
        else {
            // If we transition to a complete or an error state and there is a pending
            // operation to render loading after a timeout - invoke a cleanup operation,
            // which stops the timer.
            if (newState > DeferBlockState.Loading && inLoadingAfterPhase) {
                lDetails[LOADING_AFTER_CLEANUP_FN]();
                lDetails[LOADING_AFTER_CLEANUP_FN] = null;
                lDetails[NEXT_DEFER_BLOCK_STATE] = null;
            }
            applyDeferBlockState(newState, lDetails, lContainer, tNode, hostLView);
            const duration = getMinimumDurationForState(tDetails, newState);
            if (duration !== null) {
                lDetails[STATE_IS_FROZEN_UNTIL] = now + duration;
                scheduleDeferBlockUpdate(duration, lDetails, tNode, lContainer, hostLView);
            }
        }
    }
    else {
        // We are still rendering the previous state.
        // Update the `NEXT_DEFER_BLOCK_STATE`, which would be
        // picked up once it's time to transition to the next state.
        lDetails[NEXT_DEFER_BLOCK_STATE] = newState;
    }
}
/**
 * Schedules an update operation after a specified timeout.
 */
function scheduleDeferBlockUpdate(timeout, lDetails, tNode, lContainer, hostLView) {
    const callback = () => {
        const nextState = lDetails[NEXT_DEFER_BLOCK_STATE];
        lDetails[STATE_IS_FROZEN_UNTIL] = null;
        lDetails[NEXT_DEFER_BLOCK_STATE] = null;
        if (nextState !== null) {
            renderDeferBlockState(nextState, tNode, lContainer);
        }
    };
    return scheduleTimerTrigger(timeout, callback, hostLView);
}
/**
 * Checks whether we can transition to the next state.
 *
 * We transition to the next state if the previous state was represented
 * with a number that is less than the next state. For example, if the current
 * state is "loading" (represented as `1`), we should not show a placeholder
 * (represented as `0`), but we can show a completed state (represented as `2`)
 * or an error state (represented as `3`).
 */
function isValidStateChange(currentState, newState) {
    return currentState < newState;
}
/**
 * Trigger prefetching of dependencies for a defer block.
 *
 * @param tDetails Static information about this defer block.
 * @param lView LView of a host view.
 */
export function triggerPrefetching(tDetails, lView, tNode) {
    if (lView[INJECTOR] && shouldTriggerDeferBlock(lView[INJECTOR])) {
        triggerResourceLoading(tDetails, lView, tNode);
    }
}
/**
 * Trigger loading of defer block dependencies if the process hasn't started yet.
 *
 * @param tDetails Static information about this defer block.
 * @param lView LView of a host view.
 */
export function triggerResourceLoading(tDetails, lView, tNode) {
    const injector = lView[INJECTOR];
    const tView = lView[TVIEW];
    if (tDetails.loadingState !== DeferDependenciesLoadingState.NOT_STARTED) {
        // If the loading status is different from initial one, it means that
        // the loading of dependencies is in progress and there is nothing to do
        // in this function. All details can be obtained from the `tDetails` object.
        return tDetails.loadingPromise ?? Promise.resolve();
    }
    const lDetails = getLDeferBlockDetails(lView, tNode);
    const primaryBlockTNode = getPrimaryBlockTNode(tView, tDetails);
    // Switch from NOT_STARTED -> IN_PROGRESS state.
    tDetails.loadingState = DeferDependenciesLoadingState.IN_PROGRESS;
    // Prefetching is triggered, cleanup all registered prefetch triggers.
    invokeTriggerCleanupFns(1 /* TriggerType.Prefetch */, lDetails);
    let dependenciesFn = tDetails.dependencyResolverFn;
    if (ngDevMode) {
        // Check if dependency function interceptor is configured.
        const deferDependencyInterceptor = injector.get(DEFER_BLOCK_DEPENDENCY_INTERCEPTOR, null, { optional: true });
        if (deferDependencyInterceptor) {
            dependenciesFn = deferDependencyInterceptor.intercept(dependenciesFn);
        }
    }
    // Indicate that an application is not stable and has a pending task.
    const pendingTasks = injector.get(PendingTasks);
    const taskId = pendingTasks.add();
    // The `dependenciesFn` might be `null` when all dependencies within
    // a given defer block were eagerly referenced elsewhere in a file,
    // thus no dynamic `import()`s were produced.
    if (!dependenciesFn) {
        tDetails.loadingPromise = Promise.resolve().then(() => {
            tDetails.loadingPromise = null;
            tDetails.loadingState = DeferDependenciesLoadingState.COMPLETE;
            pendingTasks.remove(taskId);
        });
        return tDetails.loadingPromise;
    }
    // Start downloading of defer block dependencies.
    tDetails.loadingPromise = Promise.allSettled(dependenciesFn()).then(results => {
        let failed = false;
        const directiveDefs = [];
        const pipeDefs = [];
        for (const result of results) {
            if (result.status === 'fulfilled') {
                const dependency = result.value;
                const directiveDef = getComponentDef(dependency) || getDirectiveDef(dependency);
                if (directiveDef) {
                    directiveDefs.push(directiveDef);
                }
                else {
                    const pipeDef = getPipeDef(dependency);
                    if (pipeDef) {
                        pipeDefs.push(pipeDef);
                    }
                }
            }
            else {
                failed = true;
                break;
            }
        }
        // Loading is completed, we no longer need the loading Promise
        // and a pending task should also be removed.
        tDetails.loadingPromise = null;
        pendingTasks.remove(taskId);
        if (failed) {
            tDetails.loadingState = DeferDependenciesLoadingState.FAILED;
            if (tDetails.errorTmplIndex === null) {
                const templateLocation = getTemplateLocationDetails(lView);
                const error = new RuntimeError(750 /* RuntimeErrorCode.DEFER_LOADING_FAILED */, ngDevMode &&
                    'Loading dependencies for `@defer` block failed, ' +
                        `but no \`@error\` block was configured${templateLocation}. ` +
                        'Consider using the `@error` block to render an error state.');
                handleError(lView, error);
            }
        }
        else {
            tDetails.loadingState = DeferDependenciesLoadingState.COMPLETE;
            // Update directive and pipe registries to add newly downloaded dependencies.
            const primaryBlockTView = primaryBlockTNode.tView;
            if (directiveDefs.length > 0) {
                primaryBlockTView.directiveRegistry =
                    addDepsToRegistry(primaryBlockTView.directiveRegistry, directiveDefs);
                // Extract providers from all NgModules imported by standalone components
                // used within this defer block.
                const directiveTypes = directiveDefs.map(def => def.type);
                const providers = internalImportProvidersFrom(false, ...directiveTypes);
                tDetails.providers = providers;
            }
            if (pipeDefs.length > 0) {
                primaryBlockTView.pipeRegistry =
                    addDepsToRegistry(primaryBlockTView.pipeRegistry, pipeDefs);
            }
        }
    });
    return tDetails.loadingPromise;
}
/** Utility function to render placeholder content (if present) */
function renderPlaceholder(lView, tNode) {
    const lContainer = lView[tNode.index];
    ngDevMode && assertLContainer(lContainer);
    renderDeferBlockState(DeferBlockState.Placeholder, tNode, lContainer);
}
/**
 * Subscribes to the "loading" Promise and renders corresponding defer sub-block,
 * based on the loading results.
 *
 * @param lContainer Represents an instance of a defer block.
 * @param tNode Represents defer block info shared across all instances.
 */
function renderDeferStateAfterResourceLoading(tDetails, tNode, lContainer) {
    ngDevMode &&
        assertDefined(tDetails.loadingPromise, 'Expected loading Promise to exist on this defer block');
    tDetails.loadingPromise.then(() => {
        if (tDetails.loadingState === DeferDependenciesLoadingState.COMPLETE) {
            ngDevMode && assertDeferredDependenciesLoaded(tDetails);
            // Everything is loaded, show the primary block content
            renderDeferBlockState(DeferBlockState.Complete, tNode, lContainer);
        }
        else if (tDetails.loadingState === DeferDependenciesLoadingState.FAILED) {
            renderDeferBlockState(DeferBlockState.Error, tNode, lContainer);
        }
    });
}
/**
 * Attempts to trigger loading of defer block dependencies.
 * If the block is already in a loading, completed or an error state -
 * no additional actions are taken.
 */
function triggerDeferBlock(lView, tNode) {
    const tView = lView[TVIEW];
    const lContainer = lView[tNode.index];
    const injector = lView[INJECTOR];
    ngDevMode && assertLContainer(lContainer);
    if (!shouldTriggerDeferBlock(injector))
        return;
    const lDetails = getLDeferBlockDetails(lView, tNode);
    const tDetails = getTDeferBlockDetails(tView, tNode);
    // Defer block is triggered, cleanup all registered trigger functions.
    invokeAllTriggerCleanupFns(lDetails);
    switch (tDetails.loadingState) {
        case DeferDependenciesLoadingState.NOT_STARTED:
            renderDeferBlockState(DeferBlockState.Loading, tNode, lContainer);
            triggerResourceLoading(tDetails, lView, tNode);
            // The `loadingState` might have changed to "loading".
            if (tDetails.loadingState ===
                DeferDependenciesLoadingState.IN_PROGRESS) {
                renderDeferStateAfterResourceLoading(tDetails, tNode, lContainer);
            }
            break;
        case DeferDependenciesLoadingState.IN_PROGRESS:
            renderDeferBlockState(DeferBlockState.Loading, tNode, lContainer);
            renderDeferStateAfterResourceLoading(tDetails, tNode, lContainer);
            break;
        case DeferDependenciesLoadingState.COMPLETE:
            ngDevMode && assertDeferredDependenciesLoaded(tDetails);
            renderDeferBlockState(DeferBlockState.Complete, tNode, lContainer);
            break;
        case DeferDependenciesLoadingState.FAILED:
            renderDeferBlockState(DeferBlockState.Error, tNode, lContainer);
            break;
        default:
            if (ngDevMode) {
                throwError('Unknown defer block state');
            }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdHJ1Y3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvZGVmZXIvaW5zdHJ1Y3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBRW5FLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxtQkFBbUIsRUFBRSxjQUFjLEVBQVcsTUFBTSxPQUFPLENBQUM7QUFDcEUsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDdEUsT0FBTyxFQUFDLFlBQVksRUFBbUIsTUFBTSxXQUFXLENBQUM7QUFDekQsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDOUQsT0FBTyxFQUFDLG1DQUFtQyxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDakYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFDLGVBQWUsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDbkYsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFDdEYsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sa0NB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TUFBTTtRQUNSLEtBQUssNkJBQTZCLENBQUMsV0FBVztZQUM1QyxxQkFBcUIsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztZQUNsRSxvQ0FBb0MsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ2xFLE1BQU07UUFDUixLQUFLLDZCQUE2QixDQUFDLFFBQVE7WUFDekMsU0FBUyxJQUFJLGdDQUFnQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hELHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ25FLE1BQU07UUFDUixLQUFLLDZCQUE2QixDQUFDLE1BQU07WUFDdkMscUJBQXFCLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDaEUsTUFBTTtRQUNSO1lBQ0UsSUFBSSxTQUFTLEVBQUUsQ0FBQztnQkFDZCxVQUFVLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUMxQyxDQUFDO0lBQ0wsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtzZXRBY3RpdmVDb25zdW1lcn0gZnJvbSAnQGFuZ3VsYXIvY29yZS9wcmltaXRpdmVzL3NpZ25hbHMnO1xuXG5pbXBvcnQge0NhY2hlZEluamVjdG9yU2VydmljZX0gZnJvbSAnLi4vY2FjaGVkX2luamVjdG9yX3NlcnZpY2UnO1xuaW1wb3J0IHtFbnZpcm9ubWVudEluamVjdG9yLCBJbmplY3Rpb25Ub2tlbiwgSW5qZWN0b3J9IGZyb20gJy4uL2RpJztcbmltcG9ydCB7aW50ZXJuYWxJbXBvcnRQcm92aWRlcnNGcm9tfSBmcm9tICcuLi9kaS9wcm92aWRlcl9jb2xsZWN0aW9uJztcbmltcG9ydCB7UnVudGltZUVycm9yLCBSdW50aW1lRXJyb3JDb2RlfSBmcm9tICcuLi9lcnJvcnMnO1xuaW1wb3J0IHtmaW5kTWF0Y2hpbmdEZWh5ZHJhdGVkVmlld30gZnJvbSAnLi4vaHlkcmF0aW9uL3ZpZXdzJztcbmltcG9ydCB7cG9wdWxhdGVEZWh5ZHJhdGVkVmlld3NJbkxDb250YWluZXJ9IGZyb20gJy4uL2xpbmtlci92aWV3X2NvbnRhaW5lcl9yZWYnO1xuaW1wb3J0IHtQZW5kaW5nVGFza3N9IGZyb20gJy4uL3BlbmRpbmdfdGFza3MnO1xuaW1wb3J0IHthc3NlcnRMQ29udGFpbmVyLCBhc3NlcnRUTm9kZUZvckxWaWV3fSBmcm9tICcuLi9yZW5kZXIzL2Fzc2VydCc7XG5pbXBvcnQge2JpbmRpbmdVcGRhdGVkfSBmcm9tICcuLi9yZW5kZXIzL2JpbmRpbmdzJztcbmltcG9ydCB7Q2hhaW5lZEluamVjdG9yfSBmcm9tICcuLi9yZW5kZXIzL2NvbXBvbmVudF9yZWYnO1xuaW1wb3J0IHtnZXRDb21wb25lbnREZWYsIGdldERpcmVjdGl2ZURlZiwgZ2V0UGlwZURlZn0gZnJvbSAnLi4vcmVuZGVyMy9kZWZpbml0aW9uJztcbmltcG9ydCB7Z2V0VGVtcGxhdGVMb2NhdGlvbkRldGFpbHN9IGZyb20gJy4uL3JlbmRlcjMvaW5zdHJ1Y3Rpb25zL2VsZW1lbnRfdmFsaWRhdGlvbic7XG5pbXBvcnQge21hcmtWaWV3RGlydHl9IGZyb20gJy4uL3JlbmRlcjMvaW5zdHJ1Y3Rpb25zL21hcmtfdmlld19kaXJ0eSc7XG5pbXBvcnQge2hhbmRsZUVycm9yfSBmcm9tICcuLi9yZW5kZXIzL2luc3RydWN0aW9ucy9zaGFyZWQnO1xuaW1wb3J0IHvJtcm1dGVtcGxhdGV9IGZyb20gJy4uL3JlbmRlcjMvaW5zdHJ1Y3Rpb25zL3RlbXBsYXRlJztcbmltcG9ydCB7TENvbnRhaW5lcn0gZnJvbSAnLi4vcmVuZGVyMy9pbnRlcmZhY2VzL2NvbnRhaW5lcic7XG5pbXBvcnQge0RpcmVjdGl2ZURlZkxpc3QsIFBpcGVEZWZMaXN0fSBmcm9tICcuLi9yZW5kZXIzL2ludGVyZmFjZXMvZGVmaW5pdGlvbic7XG5pbXBvcnQge1RDb250YWluZXJOb2RlLCBUTm9kZX0gZnJvbSAnLi4vcmVuZGVyMy9pbnRlcmZhY2VzL25vZGUnO1xuaW1wb3J0IHtpc0Rlc3Ryb3llZH0gZnJvbSAnLi4vcmVuZGVyMy9pbnRlcmZhY2VzL3R5cGVfY2hlY2tzJztcbmltcG9ydCB7SEVBREVSX09GRlNFVCwgSU5KRUNUT1IsIExWaWV3LCBQQVJFTlQsIFRWSUVXLCBUVmlld30gZnJvbSAnLi4vcmVuZGVyMy9pbnRlcmZhY2VzL3ZpZXcnO1xuaW1wb3J0IHtnZXRDdXJyZW50VE5vZGUsIGdldExWaWV3LCBnZXRTZWxlY3RlZFROb2RlLCBnZXRUVmlldywgbmV4dEJpbmRpbmdJbmRleH0gZnJvbSAnLi4vcmVuZGVyMy9zdGF0ZSc7XG5pbXBvcnQge2lzUGxhdGZvcm1Ccm93c2VyfSBmcm9tICcuLi9yZW5kZXIzL3V0aWwvbWlzY191dGlscyc7XG5pbXBvcnQge2dldENvbnN0YW50LCBnZXRUTm9kZSwgcmVtb3ZlTFZpZXdPbkRlc3Ryb3ksIHN0b3JlTFZpZXdPbkRlc3Ryb3l9IGZyb20gJy4uL3JlbmRlcjMvdXRpbC92aWV3X3V0aWxzJztcbmltcG9ydCB7YWRkTFZpZXdUb0xDb250YWluZXIsIGNyZWF0ZUFuZFJlbmRlckVtYmVkZGVkTFZpZXcsIHJlbW92ZUxWaWV3RnJvbUxDb250YWluZXIsIHNob3VsZEFkZFZpZXdUb0RvbX0gZnJvbSAnLi4vcmVuZGVyMy92aWV3X21hbmlwdWxhdGlvbic7XG5pbXBvcnQge2Fzc2VydERlZmluZWQsIHRocm93RXJyb3J9IGZyb20gJy4uL3V0aWwvYXNzZXJ0JztcbmltcG9ydCB7cGVyZm9ybWFuY2VNYXJrRmVhdHVyZX0gZnJvbSAnLi4vdXRpbC9wZXJmb3JtYW5jZSc7XG5cbmltcG9ydCB7aW52b2tlQWxsVHJpZ2dlckNsZWFudXBGbnMsIGludm9rZVRyaWdnZXJDbGVhbnVwRm5zLCBzdG9yZVRyaWdnZXJDbGVhbnVwRm59IGZyb20gJy4vY2xlYW51cCc7XG5pbXBvcnQge29uSG92ZXIsIG9uSW50ZXJhY3Rpb24sIG9uVmlld3BvcnQsIHJlZ2lzdGVyRG9tVHJpZ2dlcn0gZnJvbSAnLi9kb21fdHJpZ2dlcnMnO1xuaW1wb3J0IHtvbklkbGV9IGZyb20gJy4vaWRsZV9zY2hlZHVsZXInO1xuaW1wb3J0IHtERUZFUl9CTE9DS19TVEFURSwgRGVmZXJCbG9ja0JlaGF2aW9yLCBEZWZlckJsb2NrQ29uZmlnLCBEZWZlckJsb2NrRGVwZW5kZW5jeUludGVyY2VwdG9yLCBEZWZlckJsb2NrSW50ZXJuYWxTdGF0ZSwgRGVmZXJCbG9ja1N0YXRlLCBEZWZlckRlcGVuZGVuY2llc0xvYWRpbmdTdGF0ZSwgRGVmZXJyZWRMb2FkaW5nQmxvY2tDb25maWcsIERlZmVycmVkUGxhY2Vob2xkZXJCbG9ja0NvbmZpZywgRGVwZW5kZW5jeVJlc29sdmVyRm4sIExEZWZlckJsb2NrRGV0YWlscywgTE9BRElOR19BRlRFUl9DTEVBTlVQX0ZOLCBORVhUX0RFRkVSX0JMT0NLX1NUQVRFLCBTVEFURV9JU19GUk9aRU5fVU5USUwsIFREZWZlckJsb2NrRGV0YWlscywgVHJpZ2dlclR5cGV9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQge29uVGltZXIsIHNjaGVkdWxlVGltZXJUcmlnZ2VyfSBmcm9tICcuL3RpbWVyX3NjaGVkdWxlcic7XG5pbXBvcnQge2FkZERlcHNUb1JlZ2lzdHJ5LCBhc3NlcnREZWZlcnJlZERlcGVuZGVuY2llc0xvYWRlZCwgZ2V0TERlZmVyQmxvY2tEZXRhaWxzLCBnZXRMb2FkaW5nQmxvY2tBZnRlciwgZ2V0TWluaW11bUR1cmF0aW9uRm9yU3RhdGUsIGdldFByaW1hcnlCbG9ja1ROb2RlLCBnZXRURGVmZXJCbG9ja0RldGFpbHMsIGdldFRlbXBsYXRlSW5kZXhGb3JTdGF0ZSwgc2V0TERlZmVyQmxvY2tEZXRhaWxzLCBzZXRURGVmZXJCbG9ja0RldGFpbHN9IGZyb20gJy4vdXRpbHMnO1xuXG4vKipcbiAqICoqSU5URVJOQUwqKiwgYXZvaWQgcmVmZXJlbmNpbmcgaXQgaW4gYXBwbGljYXRpb24gY29kZS5cbiAqICpcbiAqIEluamVjdG9yIHRva2VuIHRoYXQgYWxsb3dzIHRvIHByb3ZpZGUgYERlZmVyQmxvY2tEZXBlbmRlbmN5SW50ZXJjZXB0b3JgIGNsYXNzXG4gKiBpbXBsZW1lbnRhdGlvbi5cbiAqXG4gKiBUaGlzIHRva2VuIGlzIG9ubHkgaW5qZWN0ZWQgaW4gZGV2TW9kZVxuICovXG5leHBvcnQgY29uc3QgREVGRVJfQkxPQ0tfREVQRU5ERU5DWV9JTlRFUkNFUFRPUiA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPERlZmVyQmxvY2tEZXBlbmRlbmN5SW50ZXJjZXB0b3I+KCdERUZFUl9CTE9DS19ERVBFTkRFTkNZX0lOVEVSQ0VQVE9SJyk7XG5cbi8qKlxuICogKipJTlRFUk5BTCoqLCB0b2tlbiB1c2VkIGZvciBjb25maWd1cmluZyBkZWZlciBibG9jayBiZWhhdmlvci5cbiAqL1xuZXhwb3J0IGNvbnN0IERFRkVSX0JMT0NLX0NPTkZJRyA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPERlZmVyQmxvY2tDb25maWc+KG5nRGV2TW9kZSA/ICdERUZFUl9CTE9DS19DT05GSUcnIDogJycpO1xuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciBkZWZlciBibG9ja3Mgc2hvdWxkIGJlIHRyaWdnZXJlZC5cbiAqXG4gKiBDdXJyZW50bHksIGRlZmVyIGJsb2NrcyBhcmUgbm90IHRyaWdnZXJlZCBvbiB0aGUgc2VydmVyLFxuICogb25seSBwbGFjZWhvbGRlciBjb250ZW50IGlzIHJlbmRlcmVkIChpZiBwcm92aWRlZCkuXG4gKi9cbmZ1bmN0aW9uIHNob3VsZFRyaWdnZXJEZWZlckJsb2NrKGluamVjdG9yOiBJbmplY3Rvcik6IGJvb2xlYW4ge1xuICBjb25zdCBjb25maWcgPSBpbmplY3Rvci5nZXQoREVGRVJfQkxPQ0tfQ09ORklHLCBudWxsLCB7b3B0aW9uYWw6IHRydWV9KTtcbiAgaWYgKGNvbmZpZz8uYmVoYXZpb3IgPT09IERlZmVyQmxvY2tCZWhhdmlvci5NYW51YWwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGlzUGxhdGZvcm1Ccm93c2VyKGluamVjdG9yKTtcbn1cblxuLyoqXG4gKiBSZWZlcmVuY2UgdG8gdGhlIHRpbWVyLWJhc2VkIHNjaGVkdWxlciBpbXBsZW1lbnRhdGlvbiBvZiBkZWZlciBibG9jayBzdGF0ZVxuICogcmVuZGVyaW5nIG1ldGhvZC4gSXQncyB1c2VkIHRvIG1ha2UgdGltZXItYmFzZWQgc2NoZWR1bGluZyB0cmVlLXNoYWthYmxlLlxuICogSWYgYG1pbmltdW1gIG9yIGBhZnRlcmAgcGFyYW1ldGVycyBhcmUgdXNlZCwgY29tcGlsZXIgZ2VuZXJhdGVzIGFuIGV4dHJhXG4gKiBhcmd1bWVudCBmb3IgdGhlIGDJtcm1ZGVmZXJgIGluc3RydWN0aW9uLCB3aGljaCByZWZlcmVuY2VzIGEgdGltZXItYmFzZWRcbiAqIGltcGxlbWVudGF0aW9uLlxuICovXG5sZXQgYXBwbHlEZWZlckJsb2NrU3RhdGVXaXRoU2NoZWR1bGluZ0ltcGw6ICh0eXBlb2YgYXBwbHlEZWZlckJsb2NrU3RhdGUpfG51bGwgPSBudWxsO1xuXG4vKipcbiAqIEVuYWJsZXMgdGltZXItcmVsYXRlZCBzY2hlZHVsaW5nIGlmIGBhZnRlcmAgb3IgYG1pbmltdW1gIHBhcmFtZXRlcnMgYXJlIHNldHVwXG4gKiBvbiB0aGUgYEBsb2FkaW5nYCBvciBgQHBsYWNlaG9sZGVyYCBibG9ja3MuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1ZGVmZXJFbmFibGVUaW1lclNjaGVkdWxpbmcoXG4gICAgdFZpZXc6IFRWaWV3LCB0RGV0YWlsczogVERlZmVyQmxvY2tEZXRhaWxzLCBwbGFjZWhvbGRlckNvbmZpZ0luZGV4PzogbnVtYmVyfG51bGwsXG4gICAgbG9hZGluZ0NvbmZpZ0luZGV4PzogbnVtYmVyfG51bGwpIHtcbiAgY29uc3QgdFZpZXdDb25zdHMgPSB0Vmlldy5jb25zdHM7XG4gIGlmIChwbGFjZWhvbGRlckNvbmZpZ0luZGV4ICE9IG51bGwpIHtcbiAgICB0RGV0YWlscy5wbGFjZWhvbGRlckJsb2NrQ29uZmlnID1cbiAgICAgICAgZ2V0Q29uc3RhbnQ8RGVmZXJyZWRQbGFjZWhvbGRlckJsb2NrQ29uZmlnPih0Vmlld0NvbnN0cywgcGxhY2Vob2xkZXJDb25maWdJbmRleCk7XG4gIH1cbiAgaWYgKGxvYWRpbmdDb25maWdJbmRleCAhPSBudWxsKSB7XG4gICAgdERldGFpbHMubG9hZGluZ0Jsb2NrQ29uZmlnID1cbiAgICAgICAgZ2V0Q29uc3RhbnQ8RGVmZXJyZWRMb2FkaW5nQmxvY2tDb25maWc+KHRWaWV3Q29uc3RzLCBsb2FkaW5nQ29uZmlnSW5kZXgpO1xuICB9XG5cbiAgLy8gRW5hYmxlIGltcGxlbWVudGF0aW9uIHRoYXQgc3VwcG9ydHMgdGltZXItYmFzZWQgc2NoZWR1bGluZy5cbiAgaWYgKGFwcGx5RGVmZXJCbG9ja1N0YXRlV2l0aFNjaGVkdWxpbmdJbXBsID09PSBudWxsKSB7XG4gICAgYXBwbHlEZWZlckJsb2NrU3RhdGVXaXRoU2NoZWR1bGluZ0ltcGwgPSBhcHBseURlZmVyQmxvY2tTdGF0ZVdpdGhTY2hlZHVsaW5nO1xuICB9XG59XG5cbi8qKlxuICogQ3JlYXRlcyBydW50aW1lIGRhdGEgc3RydWN0dXJlcyBmb3IgZGVmZXIgYmxvY2tzLlxuICpcbiAqIEBwYXJhbSBpbmRleCBJbmRleCBvZiB0aGUgYGRlZmVyYCBpbnN0cnVjdGlvbi5cbiAqIEBwYXJhbSBwcmltYXJ5VG1wbEluZGV4IEluZGV4IG9mIHRoZSB0ZW1wbGF0ZSB3aXRoIHRoZSBwcmltYXJ5IGJsb2NrIGNvbnRlbnQuXG4gKiBAcGFyYW0gZGVwZW5kZW5jeVJlc29sdmVyRm4gRnVuY3Rpb24gdGhhdCBjb250YWlucyBkZXBlbmRlbmNpZXMgZm9yIHRoaXMgZGVmZXIgYmxvY2suXG4gKiBAcGFyYW0gbG9hZGluZ1RtcGxJbmRleCBJbmRleCBvZiB0aGUgdGVtcGxhdGUgd2l0aCB0aGUgbG9hZGluZyBibG9jayBjb250ZW50LlxuICogQHBhcmFtIHBsYWNlaG9sZGVyVG1wbEluZGV4IEluZGV4IG9mIHRoZSB0ZW1wbGF0ZSB3aXRoIHRoZSBwbGFjZWhvbGRlciBibG9jayBjb250ZW50LlxuICogQHBhcmFtIGVycm9yVG1wbEluZGV4IEluZGV4IG9mIHRoZSB0ZW1wbGF0ZSB3aXRoIHRoZSBlcnJvciBibG9jayBjb250ZW50LlxuICogQHBhcmFtIGxvYWRpbmdDb25maWdJbmRleCBJbmRleCBpbiB0aGUgY29uc3RhbnRzIGFycmF5IG9mIHRoZSBjb25maWd1cmF0aW9uIG9mIHRoZSBsb2FkaW5nLlxuICogICAgIGJsb2NrLlxuICogQHBhcmFtIHBsYWNlaG9sZGVyQ29uZmlnSW5kZXggSW5kZXggaW4gdGhlIGNvbnN0YW50cyBhcnJheSBvZiB0aGUgY29uZmlndXJhdGlvbiBvZiB0aGVcbiAqICAgICBwbGFjZWhvbGRlciBibG9jay5cbiAqIEBwYXJhbSBlbmFibGVUaW1lclNjaGVkdWxpbmcgRnVuY3Rpb24gdGhhdCBlbmFibGVzIHRpbWVyLXJlbGF0ZWQgc2NoZWR1bGluZyBpZiBgYWZ0ZXJgXG4gKiAgICAgb3IgYG1pbmltdW1gIHBhcmFtZXRlcnMgYXJlIHNldHVwIG9uIHRoZSBgQGxvYWRpbmdgIG9yIGBAcGxhY2Vob2xkZXJgIGJsb2Nrcy5cbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtWRlZmVyKFxuICAgIGluZGV4OiBudW1iZXIsIHByaW1hcnlUbXBsSW5kZXg6IG51bWJlciwgZGVwZW5kZW5jeVJlc29sdmVyRm4/OiBEZXBlbmRlbmN5UmVzb2x2ZXJGbnxudWxsLFxuICAgIGxvYWRpbmdUbXBsSW5kZXg/OiBudW1iZXJ8bnVsbCwgcGxhY2Vob2xkZXJUbXBsSW5kZXg/OiBudW1iZXJ8bnVsbCxcbiAgICBlcnJvclRtcGxJbmRleD86IG51bWJlcnxudWxsLCBsb2FkaW5nQ29uZmlnSW5kZXg/OiBudW1iZXJ8bnVsbCxcbiAgICBwbGFjZWhvbGRlckNvbmZpZ0luZGV4PzogbnVtYmVyfG51bGwsXG4gICAgZW5hYmxlVGltZXJTY2hlZHVsaW5nPzogdHlwZW9mIMm1ybVkZWZlckVuYWJsZVRpbWVyU2NoZWR1bGluZykge1xuICBjb25zdCBsVmlldyA9IGdldExWaWV3KCk7XG4gIGNvbnN0IHRWaWV3ID0gZ2V0VFZpZXcoKTtcbiAgY29uc3QgYWRqdXN0ZWRJbmRleCA9IGluZGV4ICsgSEVBREVSX09GRlNFVDtcblxuICDJtcm1dGVtcGxhdGUoaW5kZXgsIG51bGwsIDAsIDApO1xuXG4gIGlmICh0Vmlldy5maXJzdENyZWF0ZVBhc3MpIHtcbiAgICBwZXJmb3JtYW5jZU1hcmtGZWF0dXJlKCdOZ0RlZmVyJyk7XG5cbiAgICBjb25zdCB0RGV0YWlsczogVERlZmVyQmxvY2tEZXRhaWxzID0ge1xuICAgICAgcHJpbWFyeVRtcGxJbmRleCxcbiAgICAgIGxvYWRpbmdUbXBsSW5kZXg6IGxvYWRpbmdUbXBsSW5kZXggPz8gbnVsbCxcbiAgICAgIHBsYWNlaG9sZGVyVG1wbEluZGV4OiBwbGFjZWhvbGRlclRtcGxJbmRleCA/PyBudWxsLFxuICAgICAgZXJyb3JUbXBsSW5kZXg6IGVycm9yVG1wbEluZGV4ID8/IG51bGwsXG4gICAgICBwbGFjZWhvbGRlckJsb2NrQ29uZmlnOiBudWxsLFxuICAgICAgbG9hZGluZ0Jsb2NrQ29uZmlnOiBudWxsLFxuICAgICAgZGVwZW5kZW5jeVJlc29sdmVyRm46IGRlcGVuZGVuY3lSZXNvbHZlckZuID8/IG51bGwsXG4gICAgICBsb2FkaW5nU3RhdGU6IERlZmVyRGVwZW5kZW5jaWVzTG9hZGluZ1N0YXRlLk5PVF9TVEFSVEVELFxuICAgICAgbG9hZGluZ1Byb21pc2U6IG51bGwsXG4gICAgICBwcm92aWRlcnM6IG51bGwsXG4gICAgfTtcbiAgICBlbmFibGVUaW1lclNjaGVkdWxpbmc/Lih0VmlldywgdERldGFpbHMsIHBsYWNlaG9sZGVyQ29uZmlnSW5kZXgsIGxvYWRpbmdDb25maWdJbmRleCk7XG4gICAgc2V0VERlZmVyQmxvY2tEZXRhaWxzKHRWaWV3LCBhZGp1c3RlZEluZGV4LCB0RGV0YWlscyk7XG4gIH1cblxuICBjb25zdCB0Tm9kZSA9IGdldEN1cnJlbnRUTm9kZSgpITtcbiAgY29uc3QgbENvbnRhaW5lciA9IGxWaWV3W2FkanVzdGVkSW5kZXhdO1xuXG4gIC8vIElmIGh5ZHJhdGlvbiBpcyBlbmFibGVkLCBsb29rcyB1cCBkZWh5ZHJhdGVkIHZpZXdzIGluIHRoZSBET01cbiAgLy8gdXNpbmcgaHlkcmF0aW9uIGFubm90YXRpb24gaW5mbyBhbmQgc3RvcmVzIHRob3NlIHZpZXdzIG9uIExDb250YWluZXIuXG4gIC8vIEluIGNsaWVudC1vbmx5IG1vZGUsIHRoaXMgZnVuY3Rpb24gaXMgYSBub29wLlxuICBwb3B1bGF0ZURlaHlkcmF0ZWRWaWV3c0luTENvbnRhaW5lcihsQ29udGFpbmVyLCB0Tm9kZSwgbFZpZXcpO1xuXG4gIC8vIEluaXQgaW5zdGFuY2Utc3BlY2lmaWMgZGVmZXIgZGV0YWlscyBhbmQgc3RvcmUgaXQuXG4gIGNvbnN0IGxEZXRhaWxzOiBMRGVmZXJCbG9ja0RldGFpbHMgPSBbXG4gICAgbnVsbCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5FWFRfREVGRVJfQkxPQ0tfU1RBVEVcbiAgICBEZWZlckJsb2NrSW50ZXJuYWxTdGF0ZS5Jbml0aWFsLCAgLy8gREVGRVJfQkxPQ0tfU1RBVEVcbiAgICBudWxsLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU1RBVEVfSVNfRlJPWkVOX1VOVElMXG4gICAgbnVsbCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIExPQURJTkdfQUZURVJfQ0xFQU5VUF9GTlxuICAgIG51bGwsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUUklHR0VSX0NMRUFOVVBfRk5TXG4gICAgbnVsbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBSRUZFVENIX1RSSUdHRVJfQ0xFQU5VUF9GTlNcbiAgXTtcbiAgc2V0TERlZmVyQmxvY2tEZXRhaWxzKGxWaWV3LCBhZGp1c3RlZEluZGV4LCBsRGV0YWlscyk7XG5cbiAgY29uc3QgY2xlYW51cFRyaWdnZXJzRm4gPSAoKSA9PiBpbnZva2VBbGxUcmlnZ2VyQ2xlYW51cEZucyhsRGV0YWlscyk7XG5cbiAgLy8gV2hlbiBkZWZlciBibG9jayBpcyB0cmlnZ2VyZWQgLSB1bnN1YnNjcmliZSBmcm9tIExWaWV3IGRlc3Ryb3kgY2xlYW51cC5cbiAgc3RvcmVUcmlnZ2VyQ2xlYW51cEZuKFxuICAgICAgVHJpZ2dlclR5cGUuUmVndWxhciwgbERldGFpbHMsICgpID0+IHJlbW92ZUxWaWV3T25EZXN0cm95KGxWaWV3LCBjbGVhbnVwVHJpZ2dlcnNGbikpO1xuICBzdG9yZUxWaWV3T25EZXN0cm95KGxWaWV3LCBjbGVhbnVwVHJpZ2dlcnNGbik7XG59XG5cbi8qKlxuICogTG9hZHMgZGVmZXIgYmxvY2sgZGVwZW5kZW5jaWVzIHdoZW4gYSB0cmlnZ2VyIHZhbHVlIGJlY29tZXMgdHJ1dGh5LlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVkZWZlcldoZW4ocmF3VmFsdWU6IHVua25vd24pIHtcbiAgY29uc3QgbFZpZXcgPSBnZXRMVmlldygpO1xuICBjb25zdCBiaW5kaW5nSW5kZXggPSBuZXh0QmluZGluZ0luZGV4KCk7XG4gIGlmIChiaW5kaW5nVXBkYXRlZChsVmlldywgYmluZGluZ0luZGV4LCByYXdWYWx1ZSkpIHtcbiAgICBjb25zdCBwcmV2Q29uc3VtZXIgPSBzZXRBY3RpdmVDb25zdW1lcihudWxsKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdmFsdWUgPSBCb29sZWFuKHJhd1ZhbHVlKTsgIC8vIGhhbmRsZSB0cnV0aHkgb3IgZmFsc3kgdmFsdWVzXG4gICAgICBjb25zdCB0Tm9kZSA9IGdldFNlbGVjdGVkVE5vZGUoKTtcbiAgICAgIGNvbnN0IGxEZXRhaWxzID0gZ2V0TERlZmVyQmxvY2tEZXRhaWxzKGxWaWV3LCB0Tm9kZSk7XG4gICAgICBjb25zdCByZW5kZXJlZFN0YXRlID0gbERldGFpbHNbREVGRVJfQkxPQ0tfU1RBVEVdO1xuICAgICAgaWYgKHZhbHVlID09PSBmYWxzZSAmJiByZW5kZXJlZFN0YXRlID09PSBEZWZlckJsb2NrSW50ZXJuYWxTdGF0ZS5Jbml0aWFsKSB7XG4gICAgICAgIC8vIElmIG5vdGhpbmcgaXMgcmVuZGVyZWQgeWV0LCByZW5kZXIgYSBwbGFjZWhvbGRlciAoaWYgZGVmaW5lZCkuXG4gICAgICAgIHJlbmRlclBsYWNlaG9sZGVyKGxWaWV3LCB0Tm9kZSk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIHZhbHVlID09PSB0cnVlICYmXG4gICAgICAgICAgKHJlbmRlcmVkU3RhdGUgPT09IERlZmVyQmxvY2tJbnRlcm5hbFN0YXRlLkluaXRpYWwgfHxcbiAgICAgICAgICAgcmVuZGVyZWRTdGF0ZSA9PT0gRGVmZXJCbG9ja1N0YXRlLlBsYWNlaG9sZGVyKSkge1xuICAgICAgICAvLyBUaGUgYHdoZW5gIGNvbmRpdGlvbiBoYXMgY2hhbmdlZCB0byBgdHJ1ZWAsIHRyaWdnZXIgZGVmZXIgYmxvY2sgbG9hZGluZ1xuICAgICAgICAvLyBpZiB0aGUgYmxvY2sgaXMgZWl0aGVyIGluIGluaXRpYWwgKG5vdGhpbmcgaXMgcmVuZGVyZWQpIG9yIGEgcGxhY2Vob2xkZXJcbiAgICAgICAgLy8gc3RhdGUuXG4gICAgICAgIHRyaWdnZXJEZWZlckJsb2NrKGxWaWV3LCB0Tm9kZSk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldEFjdGl2ZUNvbnN1bWVyKHByZXZDb25zdW1lcik7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogUHJlZmV0Y2hlcyB0aGUgZGVmZXJyZWQgY29udGVudCB3aGVuIGEgdmFsdWUgYmVjb21lcyB0cnV0aHkuXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtWRlZmVyUHJlZmV0Y2hXaGVuKHJhd1ZhbHVlOiB1bmtub3duKSB7XG4gIGNvbnN0IGxWaWV3ID0gZ2V0TFZpZXcoKTtcbiAgY29uc3QgYmluZGluZ0luZGV4ID0gbmV4dEJpbmRpbmdJbmRleCgpO1xuXG4gIGlmIChiaW5kaW5nVXBkYXRlZChsVmlldywgYmluZGluZ0luZGV4LCByYXdWYWx1ZSkpIHtcbiAgICBjb25zdCBwcmV2Q29uc3VtZXIgPSBzZXRBY3RpdmVDb25zdW1lcihudWxsKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdmFsdWUgPSBCb29sZWFuKHJhd1ZhbHVlKTsgIC8vIGhhbmRsZSB0cnV0aHkgb3IgZmFsc3kgdmFsdWVzXG4gICAgICBjb25zdCB0VmlldyA9IGxWaWV3W1RWSUVXXTtcbiAgICAgIGNvbnN0IHROb2RlID0gZ2V0U2VsZWN0ZWRUTm9kZSgpO1xuICAgICAgY29uc3QgdERldGFpbHMgPSBnZXRURGVmZXJCbG9ja0RldGFpbHModFZpZXcsIHROb2RlKTtcbiAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSAmJiB0RGV0YWlscy5sb2FkaW5nU3RhdGUgPT09IERlZmVyRGVwZW5kZW5jaWVzTG9hZGluZ1N0YXRlLk5PVF9TVEFSVEVEKSB7XG4gICAgICAgIC8vIElmIGxvYWRpbmcgaGFzIG5vdCBiZWVuIHN0YXJ0ZWQgeWV0LCB0cmlnZ2VyIGl0IG5vdy5cbiAgICAgICAgdHJpZ2dlclByZWZldGNoaW5nKHREZXRhaWxzLCBsVmlldywgdE5vZGUpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRBY3RpdmVDb25zdW1lcihwcmV2Q29uc3VtZXIpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFNldHMgdXAgbG9naWMgdG8gaGFuZGxlIHRoZSBgb24gaWRsZWAgZGVmZXJyZWQgdHJpZ2dlci5cbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1ZGVmZXJPbklkbGUoKSB7XG4gIHNjaGVkdWxlRGVsYXllZFRyaWdnZXIob25JZGxlKTtcbn1cblxuLyoqXG4gKiBTZXRzIHVwIGxvZ2ljIHRvIGhhbmRsZSB0aGUgYHByZWZldGNoIG9uIGlkbGVgIGRlZmVycmVkIHRyaWdnZXIuXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtWRlZmVyUHJlZmV0Y2hPbklkbGUoKSB7XG4gIHNjaGVkdWxlRGVsYXllZFByZWZldGNoaW5nKG9uSWRsZSk7XG59XG5cbi8qKlxuICogU2V0cyB1cCBsb2dpYyB0byBoYW5kbGUgdGhlIGBvbiBpbW1lZGlhdGVgIGRlZmVycmVkIHRyaWdnZXIuXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtWRlZmVyT25JbW1lZGlhdGUoKSB7XG4gIGNvbnN0IGxWaWV3ID0gZ2V0TFZpZXcoKTtcbiAgY29uc3QgdE5vZGUgPSBnZXRDdXJyZW50VE5vZGUoKSE7XG4gIGNvbnN0IHRWaWV3ID0gbFZpZXdbVFZJRVddO1xuICBjb25zdCBpbmplY3RvciA9IGxWaWV3W0lOSkVDVE9SXSE7XG4gIGNvbnN0IHREZXRhaWxzID0gZ2V0VERlZmVyQmxvY2tEZXRhaWxzKHRWaWV3LCB0Tm9kZSk7XG5cbiAgLy8gUmVuZGVyIHBsYWNlaG9sZGVyIGJsb2NrIG9ubHkgaWYgbG9hZGluZyB0ZW1wbGF0ZSBpcyBub3QgcHJlc2VudCBhbmQgd2UncmUgb25cbiAgLy8gdGhlIGNsaWVudCB0byBhdm9pZCBjb250ZW50IGZsaWNrZXJpbmcsIHNpbmNlIGl0IHdvdWxkIGJlIGltbWVkaWF0ZWx5IHJlcGxhY2VkXG4gIC8vIGJ5IHRoZSBsb2FkaW5nIGJsb2NrLlxuICBpZiAoIXNob3VsZFRyaWdnZXJEZWZlckJsb2NrKGluamVjdG9yKSB8fCB0RGV0YWlscy5sb2FkaW5nVG1wbEluZGV4ID09PSBudWxsKSB7XG4gICAgcmVuZGVyUGxhY2Vob2xkZXIobFZpZXcsIHROb2RlKTtcbiAgfVxuICB0cmlnZ2VyRGVmZXJCbG9jayhsVmlldywgdE5vZGUpO1xufVxuXG5cbi8qKlxuICogU2V0cyB1cCBsb2dpYyB0byBoYW5kbGUgdGhlIGBwcmVmZXRjaCBvbiBpbW1lZGlhdGVgIGRlZmVycmVkIHRyaWdnZXIuXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtWRlZmVyUHJlZmV0Y2hPbkltbWVkaWF0ZSgpIHtcbiAgY29uc3QgbFZpZXcgPSBnZXRMVmlldygpO1xuICBjb25zdCB0Tm9kZSA9IGdldEN1cnJlbnRUTm9kZSgpITtcbiAgY29uc3QgdFZpZXcgPSBsVmlld1tUVklFV107XG4gIGNvbnN0IHREZXRhaWxzID0gZ2V0VERlZmVyQmxvY2tEZXRhaWxzKHRWaWV3LCB0Tm9kZSk7XG5cbiAgaWYgKHREZXRhaWxzLmxvYWRpbmdTdGF0ZSA9PT0gRGVmZXJEZXBlbmRlbmNpZXNMb2FkaW5nU3RhdGUuTk9UX1NUQVJURUQpIHtcbiAgICB0cmlnZ2VyUmVzb3VyY2VMb2FkaW5nKHREZXRhaWxzLCBsVmlldywgdE5vZGUpO1xuICB9XG59XG5cbi8qKlxuICogQ3JlYXRlcyBydW50aW1lIGRhdGEgc3RydWN0dXJlcyBmb3IgdGhlIGBvbiB0aW1lcmAgZGVmZXJyZWQgdHJpZ2dlci5cbiAqIEBwYXJhbSBkZWxheSBBbW91bnQgb2YgdGltZSB0byB3YWl0IGJlZm9yZSBsb2FkaW5nIHRoZSBjb250ZW50LlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVkZWZlck9uVGltZXIoZGVsYXk6IG51bWJlcikge1xuICBzY2hlZHVsZURlbGF5ZWRUcmlnZ2VyKG9uVGltZXIoZGVsYXkpKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIHJ1bnRpbWUgZGF0YSBzdHJ1Y3R1cmVzIGZvciB0aGUgYHByZWZldGNoIG9uIHRpbWVyYCBkZWZlcnJlZCB0cmlnZ2VyLlxuICogQHBhcmFtIGRlbGF5IEFtb3VudCBvZiB0aW1lIHRvIHdhaXQgYmVmb3JlIHByZWZldGNoaW5nIHRoZSBjb250ZW50LlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVkZWZlclByZWZldGNoT25UaW1lcihkZWxheTogbnVtYmVyKSB7XG4gIHNjaGVkdWxlRGVsYXllZFByZWZldGNoaW5nKG9uVGltZXIoZGVsYXkpKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIHJ1bnRpbWUgZGF0YSBzdHJ1Y3R1cmVzIGZvciB0aGUgYG9uIGhvdmVyYCBkZWZlcnJlZCB0cmlnZ2VyLlxuICogQHBhcmFtIHRyaWdnZXJJbmRleCBJbmRleCBhdCB3aGljaCB0byBmaW5kIHRoZSB0cmlnZ2VyIGVsZW1lbnQuXG4gKiBAcGFyYW0gd2Fsa1VwVGltZXMgTnVtYmVyIG9mIHRpbWVzIHRvIHdhbGsgdXAvZG93biB0aGUgdHJlZSBoaWVyYXJjaHkgdG8gZmluZCB0aGUgdHJpZ2dlci5cbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1ZGVmZXJPbkhvdmVyKHRyaWdnZXJJbmRleDogbnVtYmVyLCB3YWxrVXBUaW1lcz86IG51bWJlcikge1xuICBjb25zdCBsVmlldyA9IGdldExWaWV3KCk7XG4gIGNvbnN0IHROb2RlID0gZ2V0Q3VycmVudFROb2RlKCkhO1xuXG4gIHJlbmRlclBsYWNlaG9sZGVyKGxWaWV3LCB0Tm9kZSk7XG4gIHJlZ2lzdGVyRG9tVHJpZ2dlcihcbiAgICAgIGxWaWV3LCB0Tm9kZSwgdHJpZ2dlckluZGV4LCB3YWxrVXBUaW1lcywgb25Ib3ZlciwgKCkgPT4gdHJpZ2dlckRlZmVyQmxvY2sobFZpZXcsIHROb2RlKSxcbiAgICAgIFRyaWdnZXJUeXBlLlJlZ3VsYXIpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgcnVudGltZSBkYXRhIHN0cnVjdHVyZXMgZm9yIHRoZSBgcHJlZmV0Y2ggb24gaG92ZXJgIGRlZmVycmVkIHRyaWdnZXIuXG4gKiBAcGFyYW0gdHJpZ2dlckluZGV4IEluZGV4IGF0IHdoaWNoIHRvIGZpbmQgdGhlIHRyaWdnZXIgZWxlbWVudC5cbiAqIEBwYXJhbSB3YWxrVXBUaW1lcyBOdW1iZXIgb2YgdGltZXMgdG8gd2FsayB1cC9kb3duIHRoZSB0cmVlIGhpZXJhcmNoeSB0byBmaW5kIHRoZSB0cmlnZ2VyLlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVkZWZlclByZWZldGNoT25Ib3Zlcih0cmlnZ2VySW5kZXg6IG51bWJlciwgd2Fsa1VwVGltZXM/OiBudW1iZXIpIHtcbiAgY29uc3QgbFZpZXcgPSBnZXRMVmlldygpO1xuICBjb25zdCB0Tm9kZSA9IGdldEN1cnJlbnRUTm9kZSgpITtcbiAgY29uc3QgdFZpZXcgPSBsVmlld1tUVklFV107XG4gIGNvbnN0IHREZXRhaWxzID0gZ2V0VERlZmVyQmxvY2tEZXRhaWxzKHRWaWV3LCB0Tm9kZSk7XG5cbiAgaWYgKHREZXRhaWxzLmxvYWRpbmdTdGF0ZSA9PT0gRGVmZXJEZXBlbmRlbmNpZXNMb2FkaW5nU3RhdGUuTk9UX1NUQVJURUQpIHtcbiAgICByZWdpc3RlckRvbVRyaWdnZXIoXG4gICAgICAgIGxWaWV3LCB0Tm9kZSwgdHJpZ2dlckluZGV4LCB3YWxrVXBUaW1lcywgb25Ib3ZlcixcbiAgICAgICAgKCkgPT4gdHJpZ2dlclByZWZldGNoaW5nKHREZXRhaWxzLCBsVmlldywgdE5vZGUpLCBUcmlnZ2VyVHlwZS5QcmVmZXRjaCk7XG4gIH1cbn1cblxuLyoqXG4gKiBDcmVhdGVzIHJ1bnRpbWUgZGF0YSBzdHJ1Y3R1cmVzIGZvciB0aGUgYG9uIGludGVyYWN0aW9uYCBkZWZlcnJlZCB0cmlnZ2VyLlxuICogQHBhcmFtIHRyaWdnZXJJbmRleCBJbmRleCBhdCB3aGljaCB0byBmaW5kIHRoZSB0cmlnZ2VyIGVsZW1lbnQuXG4gKiBAcGFyYW0gd2Fsa1VwVGltZXMgTnVtYmVyIG9mIHRpbWVzIHRvIHdhbGsgdXAvZG93biB0aGUgdHJlZSBoaWVyYXJjaHkgdG8gZmluZCB0aGUgdHJpZ2dlci5cbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1ZGVmZXJPbkludGVyYWN0aW9uKHRyaWdnZXJJbmRleDogbnVtYmVyLCB3YWxrVXBUaW1lcz86IG51bWJlcikge1xuICBjb25zdCBsVmlldyA9IGdldExWaWV3KCk7XG4gIGNvbnN0IHROb2RlID0gZ2V0Q3VycmVudFROb2RlKCkhO1xuXG4gIHJlbmRlclBsYWNlaG9sZGVyKGxWaWV3LCB0Tm9kZSk7XG4gIHJlZ2lzdGVyRG9tVHJpZ2dlcihcbiAgICAgIGxWaWV3LCB0Tm9kZSwgdHJpZ2dlckluZGV4LCB3YWxrVXBUaW1lcywgb25JbnRlcmFjdGlvbiwgKCkgPT4gdHJpZ2dlckRlZmVyQmxvY2sobFZpZXcsIHROb2RlKSxcbiAgICAgIFRyaWdnZXJUeXBlLlJlZ3VsYXIpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgcnVudGltZSBkYXRhIHN0cnVjdHVyZXMgZm9yIHRoZSBgcHJlZmV0Y2ggb24gaW50ZXJhY3Rpb25gIGRlZmVycmVkIHRyaWdnZXIuXG4gKiBAcGFyYW0gdHJpZ2dlckluZGV4IEluZGV4IGF0IHdoaWNoIHRvIGZpbmQgdGhlIHRyaWdnZXIgZWxlbWVudC5cbiAqIEBwYXJhbSB3YWxrVXBUaW1lcyBOdW1iZXIgb2YgdGltZXMgdG8gd2FsayB1cC9kb3duIHRoZSB0cmVlIGhpZXJhcmNoeSB0byBmaW5kIHRoZSB0cmlnZ2VyLlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVkZWZlclByZWZldGNoT25JbnRlcmFjdGlvbih0cmlnZ2VySW5kZXg6IG51bWJlciwgd2Fsa1VwVGltZXM/OiBudW1iZXIpIHtcbiAgY29uc3QgbFZpZXcgPSBnZXRMVmlldygpO1xuICBjb25zdCB0Tm9kZSA9IGdldEN1cnJlbnRUTm9kZSgpITtcbiAgY29uc3QgdFZpZXcgPSBsVmlld1tUVklFV107XG4gIGNvbnN0IHREZXRhaWxzID0gZ2V0VERlZmVyQmxvY2tEZXRhaWxzKHRWaWV3LCB0Tm9kZSk7XG5cbiAgaWYgKHREZXRhaWxzLmxvYWRpbmdTdGF0ZSA9PT0gRGVmZXJEZXBlbmRlbmNpZXNMb2FkaW5nU3RhdGUuTk9UX1NUQVJURUQpIHtcbiAgICByZWdpc3RlckRvbVRyaWdnZXIoXG4gICAgICAgIGxWaWV3LCB0Tm9kZSwgdHJpZ2dlckluZGV4LCB3YWxrVXBUaW1lcywgb25JbnRlcmFjdGlvbixcbiAgICAgICAgKCkgPT4gdHJpZ2dlclByZWZldGNoaW5nKHREZXRhaWxzLCBsVmlldywgdE5vZGUpLCBUcmlnZ2VyVHlwZS5QcmVmZXRjaCk7XG4gIH1cbn1cblxuLyoqXG4gKiBDcmVhdGVzIHJ1bnRpbWUgZGF0YSBzdHJ1Y3R1cmVzIGZvciB0aGUgYG9uIHZpZXdwb3J0YCBkZWZlcnJlZCB0cmlnZ2VyLlxuICogQHBhcmFtIHRyaWdnZXJJbmRleCBJbmRleCBhdCB3aGljaCB0byBmaW5kIHRoZSB0cmlnZ2VyIGVsZW1lbnQuXG4gKiBAcGFyYW0gd2Fsa1VwVGltZXMgTnVtYmVyIG9mIHRpbWVzIHRvIHdhbGsgdXAvZG93biB0aGUgdHJlZSBoaWVyYXJjaHkgdG8gZmluZCB0aGUgdHJpZ2dlci5cbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1ZGVmZXJPblZpZXdwb3J0KHRyaWdnZXJJbmRleDogbnVtYmVyLCB3YWxrVXBUaW1lcz86IG51bWJlcikge1xuICBjb25zdCBsVmlldyA9IGdldExWaWV3KCk7XG4gIGNvbnN0IHROb2RlID0gZ2V0Q3VycmVudFROb2RlKCkhO1xuXG4gIHJlbmRlclBsYWNlaG9sZGVyKGxWaWV3LCB0Tm9kZSk7XG4gIHJlZ2lzdGVyRG9tVHJpZ2dlcihcbiAgICAgIGxWaWV3LCB0Tm9kZSwgdHJpZ2dlckluZGV4LCB3YWxrVXBUaW1lcywgb25WaWV3cG9ydCwgKCkgPT4gdHJpZ2dlckRlZmVyQmxvY2sobFZpZXcsIHROb2RlKSxcbiAgICAgIFRyaWdnZXJUeXBlLlJlZ3VsYXIpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgcnVudGltZSBkYXRhIHN0cnVjdHVyZXMgZm9yIHRoZSBgcHJlZmV0Y2ggb24gdmlld3BvcnRgIGRlZmVycmVkIHRyaWdnZXIuXG4gKiBAcGFyYW0gdHJpZ2dlckluZGV4IEluZGV4IGF0IHdoaWNoIHRvIGZpbmQgdGhlIHRyaWdnZXIgZWxlbWVudC5cbiAqIEBwYXJhbSB3YWxrVXBUaW1lcyBOdW1iZXIgb2YgdGltZXMgdG8gd2FsayB1cC9kb3duIHRoZSB0cmVlIGhpZXJhcmNoeSB0byBmaW5kIHRoZSB0cmlnZ2VyLlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVkZWZlclByZWZldGNoT25WaWV3cG9ydCh0cmlnZ2VySW5kZXg6IG51bWJlciwgd2Fsa1VwVGltZXM/OiBudW1iZXIpIHtcbiAgY29uc3QgbFZpZXcgPSBnZXRMVmlldygpO1xuICBjb25zdCB0Tm9kZSA9IGdldEN1cnJlbnRUTm9kZSgpITtcbiAgY29uc3QgdFZpZXcgPSBsVmlld1tUVklFV107XG4gIGNvbnN0IHREZXRhaWxzID0gZ2V0VERlZmVyQmxvY2tEZXRhaWxzKHRWaWV3LCB0Tm9kZSk7XG5cbiAgaWYgKHREZXRhaWxzLmxvYWRpbmdTdGF0ZSA9PT0gRGVmZXJEZXBlbmRlbmNpZXNMb2FkaW5nU3RhdGUuTk9UX1NUQVJURUQpIHtcbiAgICByZWdpc3RlckRvbVRyaWdnZXIoXG4gICAgICAgIGxWaWV3LCB0Tm9kZSwgdHJpZ2dlckluZGV4LCB3YWxrVXBUaW1lcywgb25WaWV3cG9ydCxcbiAgICAgICAgKCkgPT4gdHJpZ2dlclByZWZldGNoaW5nKHREZXRhaWxzLCBsVmlldywgdE5vZGUpLCBUcmlnZ2VyVHlwZS5QcmVmZXRjaCk7XG4gIH1cbn1cblxuLyoqKioqKioqKiogSGVscGVyIGZ1bmN0aW9ucyAqKioqKioqKioqL1xuXG4vKipcbiAqIFNjaGVkdWxlcyB0cmlnZ2VyaW5nIG9mIGEgZGVmZXIgYmxvY2sgZm9yIGBvbiBpZGxlYCBhbmQgYG9uIHRpbWVyYCBjb25kaXRpb25zLlxuICovXG5mdW5jdGlvbiBzY2hlZHVsZURlbGF5ZWRUcmlnZ2VyKFxuICAgIHNjaGVkdWxlRm46IChjYWxsYmFjazogVm9pZEZ1bmN0aW9uLCBsVmlldzogTFZpZXcpID0+IFZvaWRGdW5jdGlvbikge1xuICBjb25zdCBsVmlldyA9IGdldExWaWV3KCk7XG4gIGNvbnN0IHROb2RlID0gZ2V0Q3VycmVudFROb2RlKCkhO1xuXG4gIHJlbmRlclBsYWNlaG9sZGVyKGxWaWV3LCB0Tm9kZSk7XG5cbiAgLy8gT25seSB0cmlnZ2VyIHRoZSBzY2hlZHVsZWQgdHJpZ2dlciBvbiB0aGUgYnJvd3NlclxuICAvLyBzaW5jZSB3ZSBkb24ndCB3YW50IHRvIGRlbGF5IHRoZSBzZXJ2ZXIgcmVzcG9uc2UuXG4gIGlmIChpc1BsYXRmb3JtQnJvd3NlcihsVmlld1tJTkpFQ1RPUl0hKSkge1xuICAgIGNvbnN0IGNsZWFudXBGbiA9IHNjaGVkdWxlRm4oKCkgPT4gdHJpZ2dlckRlZmVyQmxvY2sobFZpZXcsIHROb2RlKSwgbFZpZXcpO1xuICAgIGNvbnN0IGxEZXRhaWxzID0gZ2V0TERlZmVyQmxvY2tEZXRhaWxzKGxWaWV3LCB0Tm9kZSk7XG4gICAgc3RvcmVUcmlnZ2VyQ2xlYW51cEZuKFRyaWdnZXJUeXBlLlJlZ3VsYXIsIGxEZXRhaWxzLCBjbGVhbnVwRm4pO1xuICB9XG59XG5cbi8qKlxuICogU2NoZWR1bGVzIHByZWZldGNoaW5nIGZvciBgb24gaWRsZWAgYW5kIGBvbiB0aW1lcmAgdHJpZ2dlcnMuXG4gKlxuICogQHBhcmFtIHNjaGVkdWxlRm4gQSBmdW5jdGlvbiB0aGF0IGRvZXMgdGhlIHNjaGVkdWxpbmcuXG4gKi9cbmZ1bmN0aW9uIHNjaGVkdWxlRGVsYXllZFByZWZldGNoaW5nKFxuICAgIHNjaGVkdWxlRm46IChjYWxsYmFjazogVm9pZEZ1bmN0aW9uLCBsVmlldzogTFZpZXcpID0+IFZvaWRGdW5jdGlvbikge1xuICBjb25zdCBsVmlldyA9IGdldExWaWV3KCk7XG5cbiAgLy8gT25seSB0cmlnZ2VyIHRoZSBzY2hlZHVsZWQgdHJpZ2dlciBvbiB0aGUgYnJvd3NlclxuICAvLyBzaW5jZSB3ZSBkb24ndCB3YW50IHRvIGRlbGF5IHRoZSBzZXJ2ZXIgcmVzcG9uc2UuXG4gIGlmIChpc1BsYXRmb3JtQnJvd3NlcihsVmlld1tJTkpFQ1RPUl0hKSkge1xuICAgIGNvbnN0IHROb2RlID0gZ2V0Q3VycmVudFROb2RlKCkhO1xuICAgIGNvbnN0IHRWaWV3ID0gbFZpZXdbVFZJRVddO1xuICAgIGNvbnN0IHREZXRhaWxzID0gZ2V0VERlZmVyQmxvY2tEZXRhaWxzKHRWaWV3LCB0Tm9kZSk7XG5cbiAgICBpZiAodERldGFpbHMubG9hZGluZ1N0YXRlID09PSBEZWZlckRlcGVuZGVuY2llc0xvYWRpbmdTdGF0ZS5OT1RfU1RBUlRFRCkge1xuICAgICAgY29uc3QgbERldGFpbHMgPSBnZXRMRGVmZXJCbG9ja0RldGFpbHMobFZpZXcsIHROb2RlKTtcbiAgICAgIGNvbnN0IHByZWZldGNoID0gKCkgPT4gdHJpZ2dlclByZWZldGNoaW5nKHREZXRhaWxzLCBsVmlldywgdE5vZGUpO1xuICAgICAgY29uc3QgY2xlYW51cEZuID0gc2NoZWR1bGVGbihwcmVmZXRjaCwgbFZpZXcpO1xuICAgICAgc3RvcmVUcmlnZ2VyQ2xlYW51cEZuKFRyaWdnZXJUeXBlLlByZWZldGNoLCBsRGV0YWlscywgY2xlYW51cEZuKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBUcmFuc2l0aW9ucyBhIGRlZmVyIGJsb2NrIHRvIHRoZSBuZXcgc3RhdGUuIFVwZGF0ZXMgdGhlICBuZWNlc3NhcnlcbiAqIGRhdGEgc3RydWN0dXJlcyBhbmQgcmVuZGVycyBjb3JyZXNwb25kaW5nIGJsb2NrLlxuICpcbiAqIEBwYXJhbSBuZXdTdGF0ZSBOZXcgc3RhdGUgdGhhdCBzaG91bGQgYmUgYXBwbGllZCB0byB0aGUgZGVmZXIgYmxvY2suXG4gKiBAcGFyYW0gdE5vZGUgVE5vZGUgdGhhdCByZXByZXNlbnRzIGEgZGVmZXIgYmxvY2suXG4gKiBAcGFyYW0gbENvbnRhaW5lciBSZXByZXNlbnRzIGFuIGluc3RhbmNlIG9mIGEgZGVmZXIgYmxvY2suXG4gKiBAcGFyYW0gc2tpcFRpbWVyU2NoZWR1bGluZyBJbmRpY2F0ZXMgdGhhdCBgQGxvYWRpbmdgIGFuZCBgQHBsYWNlaG9sZGVyYCBibG9ja1xuICogICBzaG91bGQgYmUgcmVuZGVyZWQgaW1tZWRpYXRlbHksIGV2ZW4gaWYgdGhleSBoYXZlIGBhZnRlcmAgb3IgYG1pbmltdW1gIGNvbmZpZ1xuICogICBvcHRpb25zIHNldHVwLiBUaGlzIGZsYWcgdG8gbmVlZGVkIGZvciB0ZXN0aW5nIEFQSXMgdG8gdHJhbnNpdGlvbiBkZWZlciBibG9ja1xuICogICBiZXR3ZWVuIHN0YXRlcyB2aWEgYERlZmVyRml4dHVyZS5yZW5kZXJgIG1ldGhvZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckRlZmVyQmxvY2tTdGF0ZShcbiAgICBuZXdTdGF0ZTogRGVmZXJCbG9ja1N0YXRlLCB0Tm9kZTogVE5vZGUsIGxDb250YWluZXI6IExDb250YWluZXIsXG4gICAgc2tpcFRpbWVyU2NoZWR1bGluZyA9IGZhbHNlKTogdm9pZCB7XG4gIGNvbnN0IGhvc3RMVmlldyA9IGxDb250YWluZXJbUEFSRU5UXTtcbiAgY29uc3QgaG9zdFRWaWV3ID0gaG9zdExWaWV3W1RWSUVXXTtcblxuICAvLyBDaGVjayBpZiB0aGlzIHZpZXcgaXMgbm90IGRlc3Ryb3llZC4gU2luY2UgdGhlIGxvYWRpbmcgcHJvY2VzcyB3YXMgYXN5bmMsXG4gIC8vIHRoZSB2aWV3IG1pZ2h0IGVuZCB1cCBiZWluZyBkZXN0cm95ZWQgYnkgdGhlIHRpbWUgcmVuZGVyaW5nIGhhcHBlbnMuXG4gIGlmIChpc0Rlc3Ryb3llZChob3N0TFZpZXcpKSByZXR1cm47XG5cbiAgLy8gTWFrZSBzdXJlIHRoaXMgVE5vZGUgYmVsb25ncyB0byBUVmlldyB0aGF0IHJlcHJlc2VudHMgaG9zdCBMVmlldy5cbiAgbmdEZXZNb2RlICYmIGFzc2VydFROb2RlRm9yTFZpZXcodE5vZGUsIGhvc3RMVmlldyk7XG5cbiAgY29uc3QgbERldGFpbHMgPSBnZXRMRGVmZXJCbG9ja0RldGFpbHMoaG9zdExWaWV3LCB0Tm9kZSk7XG5cbiAgbmdEZXZNb2RlICYmIGFzc2VydERlZmluZWQobERldGFpbHMsICdFeHBlY3RlZCBhIGRlZmVyIGJsb2NrIHN0YXRlIGRlZmluZWQnKTtcblxuICBjb25zdCBjdXJyZW50U3RhdGUgPSBsRGV0YWlsc1tERUZFUl9CTE9DS19TVEFURV07XG5cbiAgaWYgKGlzVmFsaWRTdGF0ZUNoYW5nZShjdXJyZW50U3RhdGUsIG5ld1N0YXRlKSAmJlxuICAgICAgaXNWYWxpZFN0YXRlQ2hhbmdlKGxEZXRhaWxzW05FWFRfREVGRVJfQkxPQ0tfU1RBVEVdID8/IC0xLCBuZXdTdGF0ZSkpIHtcbiAgICBjb25zdCBpbmplY3RvciA9IGhvc3RMVmlld1tJTkpFQ1RPUl0hO1xuICAgIGNvbnN0IHREZXRhaWxzID0gZ2V0VERlZmVyQmxvY2tEZXRhaWxzKGhvc3RUVmlldywgdE5vZGUpO1xuICAgIC8vIFNraXBzIHNjaGVkdWxpbmcgb24gdGhlIHNlcnZlciBzaW5jZSBpdCBjYW4gZGVsYXkgdGhlIHNlcnZlciByZXNwb25zZS5cbiAgICBjb25zdCBuZWVkc1NjaGVkdWxpbmcgPSAhc2tpcFRpbWVyU2NoZWR1bGluZyAmJiBpc1BsYXRmb3JtQnJvd3NlcihpbmplY3RvcikgJiZcbiAgICAgICAgKGdldExvYWRpbmdCbG9ja0FmdGVyKHREZXRhaWxzKSAhPT0gbnVsbCB8fFxuICAgICAgICAgZ2V0TWluaW11bUR1cmF0aW9uRm9yU3RhdGUodERldGFpbHMsIERlZmVyQmxvY2tTdGF0ZS5Mb2FkaW5nKSAhPT0gbnVsbCB8fFxuICAgICAgICAgZ2V0TWluaW11bUR1cmF0aW9uRm9yU3RhdGUodERldGFpbHMsIERlZmVyQmxvY2tTdGF0ZS5QbGFjZWhvbGRlcikpO1xuXG4gICAgaWYgKG5nRGV2TW9kZSAmJiBuZWVkc1NjaGVkdWxpbmcpIHtcbiAgICAgIGFzc2VydERlZmluZWQoXG4gICAgICAgICAgYXBwbHlEZWZlckJsb2NrU3RhdGVXaXRoU2NoZWR1bGluZ0ltcGwsICdFeHBlY3RlZCBzY2hlZHVsaW5nIGZ1bmN0aW9uIHRvIGJlIGRlZmluZWQnKTtcbiAgICB9XG5cbiAgICBjb25zdCBhcHBseVN0YXRlRm4gPVxuICAgICAgICBuZWVkc1NjaGVkdWxpbmcgPyBhcHBseURlZmVyQmxvY2tTdGF0ZVdpdGhTY2hlZHVsaW5nSW1wbCEgOiBhcHBseURlZmVyQmxvY2tTdGF0ZTtcbiAgICB0cnkge1xuICAgICAgYXBwbHlTdGF0ZUZuKG5ld1N0YXRlLCBsRGV0YWlscywgbENvbnRhaW5lciwgdE5vZGUsIGhvc3RMVmlldyk7XG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIGhhbmRsZUVycm9yKGhvc3RMVmlldywgZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIERldGVjdHMgd2hldGhlciBhbiBpbmplY3RvciBpcyBhbiBpbnN0YW5jZSBvZiBhIGBDaGFpbmVkSW5qZWN0b3JgLFxuICogY3JlYXRlZCBiYXNlZCBvbiB0aGUgYE91dGxldEluamVjdG9yYC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzUm91dGVyT3V0bGV0SW5qZWN0b3IoY3VycmVudEluamVjdG9yOiBJbmplY3Rvcik6IGJvb2xlYW4ge1xuICByZXR1cm4gKGN1cnJlbnRJbmplY3RvciBpbnN0YW5jZW9mIENoYWluZWRJbmplY3RvcikgJiZcbiAgICAgICh0eXBlb2YgKGN1cnJlbnRJbmplY3Rvci5pbmplY3RvciBhcyBhbnkpLl9fbmdPdXRsZXRJbmplY3RvciA9PT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiB0aGUgYE91dGxldEluamVjdG9yYCB1c2luZyBhIHByaXZhdGUgZmFjdG9yeVxuICogZnVuY3Rpb24gYXZhaWxhYmxlIG9uIHRoZSBgT3V0bGV0SW5qZWN0b3JgIGNsYXNzLlxuICpcbiAqIEBwYXJhbSBwYXJlbnRPdXRsZXRJbmplY3RvciBQYXJlbnQgT3V0bGV0SW5qZWN0b3IsIHdoaWNoIHNob3VsZCBiZSB1c2VkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gcHJvZHVjZSBhIG5ldyBpbnN0YW5jZS5cbiAqIEBwYXJhbSBwYXJlbnRJbmplY3RvciBBbiBJbmplY3Rvciwgd2hpY2ggc2hvdWxkIGJlIHVzZWQgYXMgYSBwYXJlbnQgb25lXG4gKiAgICAgICAgICAgICAgICAgICAgICAgZm9yIGEgbmV3bHkgY3JlYXRlZCBgT3V0bGV0SW5qZWN0b3JgIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBjcmVhdGVSb3V0ZXJPdXRsZXRJbmplY3RvcihcbiAgICBwYXJlbnRPdXRsZXRJbmplY3RvcjogQ2hhaW5lZEluamVjdG9yLCBwYXJlbnRJbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgY29uc3Qgb3V0bGV0SW5qZWN0b3IgPSBwYXJlbnRPdXRsZXRJbmplY3Rvci5pbmplY3RvciBhcyBhbnk7XG4gIHJldHVybiBvdXRsZXRJbmplY3Rvci5fX25nT3V0bGV0SW5qZWN0b3IocGFyZW50SW5qZWN0b3IpO1xufVxuXG5cbi8qKlxuICogQXBwbGllcyBjaGFuZ2VzIHRvIHRoZSBET00gdG8gcmVmbGVjdCBhIGdpdmVuIHN0YXRlLlxuICovXG5mdW5jdGlvbiBhcHBseURlZmVyQmxvY2tTdGF0ZShcbiAgICBuZXdTdGF0ZTogRGVmZXJCbG9ja1N0YXRlLCBsRGV0YWlsczogTERlZmVyQmxvY2tEZXRhaWxzLCBsQ29udGFpbmVyOiBMQ29udGFpbmVyLCB0Tm9kZTogVE5vZGUsXG4gICAgaG9zdExWaWV3OiBMVmlldzx1bmtub3duPikge1xuICBjb25zdCBzdGF0ZVRtcGxJbmRleCA9IGdldFRlbXBsYXRlSW5kZXhGb3JTdGF0ZShuZXdTdGF0ZSwgaG9zdExWaWV3LCB0Tm9kZSk7XG5cbiAgaWYgKHN0YXRlVG1wbEluZGV4ICE9PSBudWxsKSB7XG4gICAgbERldGFpbHNbREVGRVJfQkxPQ0tfU1RBVEVdID0gbmV3U3RhdGU7XG4gICAgY29uc3QgaG9zdFRWaWV3ID0gaG9zdExWaWV3W1RWSUVXXTtcbiAgICBjb25zdCBhZGp1c3RlZEluZGV4ID0gc3RhdGVUbXBsSW5kZXggKyBIRUFERVJfT0ZGU0VUO1xuICAgIGNvbnN0IGFjdGl2ZUJsb2NrVE5vZGUgPSBnZXRUTm9kZShob3N0VFZpZXcsIGFkanVzdGVkSW5kZXgpIGFzIFRDb250YWluZXJOb2RlO1xuXG4gICAgLy8gVGhlcmUgaXMgb25seSAxIHZpZXcgdGhhdCBjYW4gYmUgcHJlc2VudCBpbiBhbiBMQ29udGFpbmVyIHRoYXRcbiAgICAvLyByZXByZXNlbnRzIGEgZGVmZXIgYmxvY2ssIHNvIGFsd2F5cyByZWZlciB0byB0aGUgZmlyc3Qgb25lLlxuICAgIGNvbnN0IHZpZXdJbmRleCA9IDA7XG5cbiAgICByZW1vdmVMVmlld0Zyb21MQ29udGFpbmVyKGxDb250YWluZXIsIHZpZXdJbmRleCk7XG5cbiAgICBsZXQgaW5qZWN0b3I6IEluamVjdG9yfHVuZGVmaW5lZDtcbiAgICBpZiAobmV3U3RhdGUgPT09IERlZmVyQmxvY2tTdGF0ZS5Db21wbGV0ZSkge1xuICAgICAgLy8gV2hlbiB3ZSByZW5kZXIgYSBkZWZlciBibG9jayBpbiBjb21wbGV0ZWQgc3RhdGUsIHRoZXJlIG1pZ2h0IGJlXG4gICAgICAvLyBuZXdseSBsb2FkZWQgc3RhbmRhbG9uZSBjb21wb25lbnRzIHVzZWQgd2l0aGluIHRoZSBibG9jaywgd2hpY2ggbWF5XG4gICAgICAvLyBpbXBvcnQgTmdNb2R1bGVzIHdpdGggcHJvdmlkZXJzLiBJbiBvcmRlciB0byBtYWtlIHRob3NlIHByb3ZpZGVyc1xuICAgICAgLy8gYXZhaWxhYmxlIGZvciBjb21wb25lbnRzIGRlY2xhcmVkIGluIHRoYXQgTmdNb2R1bGUsIHdlIGNyZWF0ZSBhbiBpbnN0YW5jZVxuICAgICAgLy8gb2YgZW52aXJvbm1lbnQgaW5qZWN0b3IgdG8gaG9zdCB0aG9zZSBwcm92aWRlcnMgYW5kIHBhc3MgdGhpcyBpbmplY3RvclxuICAgICAgLy8gdG8gdGhlIGxvZ2ljIHRoYXQgY3JlYXRlcyBhIHZpZXcuXG4gICAgICBjb25zdCB0RGV0YWlscyA9IGdldFREZWZlckJsb2NrRGV0YWlscyhob3N0VFZpZXcsIHROb2RlKTtcbiAgICAgIGNvbnN0IHByb3ZpZGVycyA9IHREZXRhaWxzLnByb3ZpZGVycztcbiAgICAgIGlmIChwcm92aWRlcnMgJiYgcHJvdmlkZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgcGFyZW50SW5qZWN0b3IgPSBob3N0TFZpZXdbSU5KRUNUT1JdIGFzIEluamVjdG9yO1xuXG4gICAgICAgIC8vIE5vdGU6IHdlIGhhdmUgYSBzcGVjaWFsIGNhc2UgZm9yIFJvdXRlcidzIGBPdXRsZXRJbmplY3RvcmAsXG4gICAgICAgIC8vIHNpbmNlIGl0J3Mgbm90IGFuIGluc3RhbmNlIG9mIHRoZSBgRW52aXJvbm1lbnRJbmplY3RvcmAsIHNvXG4gICAgICAgIC8vIHdlIGNhbid0IGluamVjdCBpdC4gT25jZSB0aGUgYE91dGxldEluamVjdG9yYCBpcyByZXBsYWNlZFxuICAgICAgICAvLyB3aXRoIHRoZSBgRW52aXJvbm1lbnRJbmplY3RvcmAgaW4gUm91dGVyJ3MgY29kZSwgdGhpcyBzcGVjaWFsXG4gICAgICAgIC8vIGhhbmRsaW5nIGNhbiBiZSByZW1vdmVkLlxuICAgICAgICBjb25zdCBpc1BhcmVudE91dGxldEluamVjdG9yID0gaXNSb3V0ZXJPdXRsZXRJbmplY3RvcihwYXJlbnRJbmplY3Rvcik7XG4gICAgICAgIGNvbnN0IHBhcmVudEVudkluamVjdG9yID1cbiAgICAgICAgICAgIGlzUGFyZW50T3V0bGV0SW5qZWN0b3IgPyBwYXJlbnRJbmplY3RvciA6IHBhcmVudEluamVjdG9yLmdldChFbnZpcm9ubWVudEluamVjdG9yKTtcblxuICAgICAgICBpbmplY3RvciA9IHBhcmVudEVudkluamVjdG9yLmdldChDYWNoZWRJbmplY3RvclNlcnZpY2UpXG4gICAgICAgICAgICAgICAgICAgICAgIC5nZXRPckNyZWF0ZUluamVjdG9yKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdERldGFpbHMsIHBhcmVudEVudkluamVjdG9yIGFzIEVudmlyb25tZW50SW5qZWN0b3IsIHByb3ZpZGVycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nRGV2TW9kZSA/ICdEZWZlckJsb2NrIEluamVjdG9yJyA6ICcnKTtcblxuICAgICAgICAvLyBOb3RlOiB0aGlzIGlzIGEgY29udGludWF0aW9uIG9mIHRoZSBzcGVjaWFsIGNhc2UgZm9yIFJvdXRlcidzIGBPdXRsZXRJbmplY3RvcmAuXG4gICAgICAgIC8vIFNpbmNlIHRoZSBgT3V0bGV0SW5qZWN0b3JgIGhhbmRsZXMgYEFjdGl2YXRlZFJvdXRlYCBhbmQgYENoaWxkcmVuT3V0bGV0Q29udGV4dHNgXG4gICAgICAgIC8vIGR5bmFtaWNhbGx5IChpLmUuIHRoZWlyIHZhbHVlcyBhcmUgbm90IHJlYWxseSBzdG9yZWQgc3RhdGljYWxseSBpbiBhbiBpbmplY3RvciksXG4gICAgICAgIC8vIHdlIG5lZWQgdG8gXCJ3cmFwXCIgYSBkZWZlciBpbmplY3RvciBpbnRvIGFub3RoZXIgYE91dGxldEluamVjdG9yYCwgc28gd2UgcmV0YWluXG4gICAgICAgIC8vIHRoZSBkeW5hbWljIHJlc29sdXRpb24gb2YgdGhlIG1lbnRpb25lZCB0b2tlbnMuXG4gICAgICAgIGlmIChpc1BhcmVudE91dGxldEluamVjdG9yKSB7XG4gICAgICAgICAgaW5qZWN0b3IgPSBjcmVhdGVSb3V0ZXJPdXRsZXRJbmplY3RvcihwYXJlbnRJbmplY3RvciBhcyBDaGFpbmVkSW5qZWN0b3IsIGluamVjdG9yKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBkZWh5ZHJhdGVkVmlldyA9IGZpbmRNYXRjaGluZ0RlaHlkcmF0ZWRWaWV3KGxDb250YWluZXIsIGFjdGl2ZUJsb2NrVE5vZGUudFZpZXchLnNzcklkKTtcbiAgICBjb25zdCBlbWJlZGRlZExWaWV3ID1cbiAgICAgICAgY3JlYXRlQW5kUmVuZGVyRW1iZWRkZWRMVmlldyhob3N0TFZpZXcsIGFjdGl2ZUJsb2NrVE5vZGUsIG51bGwsIHtkZWh5ZHJhdGVkVmlldywgaW5qZWN0b3J9KTtcbiAgICBhZGRMVmlld1RvTENvbnRhaW5lcihcbiAgICAgICAgbENvbnRhaW5lciwgZW1iZWRkZWRMVmlldywgdmlld0luZGV4LCBzaG91bGRBZGRWaWV3VG9Eb20oYWN0aXZlQmxvY2tUTm9kZSwgZGVoeWRyYXRlZFZpZXcpKTtcbiAgICBtYXJrVmlld0RpcnR5KGVtYmVkZGVkTFZpZXcpO1xuICB9XG59XG5cbi8qKlxuICogRXh0ZW5kcyB0aGUgYGFwcGx5RGVmZXJCbG9ja1N0YXRlYCB3aXRoIHRpbWVyLWJhc2VkIHNjaGVkdWxpbmcuXG4gKiBUaGlzIGZ1bmN0aW9uIGJlY29tZXMgYXZhaWxhYmxlIG9uIGEgcGFnZSBpZiB0aGVyZSBhcmUgZGVmZXIgYmxvY2tzXG4gKiB0aGF0IHVzZSBgYWZ0ZXJgIG9yIGBtaW5pbXVtYCBwYXJhbWV0ZXJzIGluIHRoZSBgQGxvYWRpbmdgIG9yXG4gKiBgQHBsYWNlaG9sZGVyYCBibG9ja3MuXG4gKi9cbmZ1bmN0aW9uIGFwcGx5RGVmZXJCbG9ja1N0YXRlV2l0aFNjaGVkdWxpbmcoXG4gICAgbmV3U3RhdGU6IERlZmVyQmxvY2tTdGF0ZSwgbERldGFpbHM6IExEZWZlckJsb2NrRGV0YWlscywgbENvbnRhaW5lcjogTENvbnRhaW5lciwgdE5vZGU6IFROb2RlLFxuICAgIGhvc3RMVmlldzogTFZpZXc8dW5rbm93bj4pIHtcbiAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgY29uc3QgaG9zdFRWaWV3ID0gaG9zdExWaWV3W1RWSUVXXTtcbiAgY29uc3QgdERldGFpbHMgPSBnZXRURGVmZXJCbG9ja0RldGFpbHMoaG9zdFRWaWV3LCB0Tm9kZSk7XG5cbiAgaWYgKGxEZXRhaWxzW1NUQVRFX0lTX0ZST1pFTl9VTlRJTF0gPT09IG51bGwgfHwgbERldGFpbHNbU1RBVEVfSVNfRlJPWkVOX1VOVElMXSA8PSBub3cpIHtcbiAgICBsRGV0YWlsc1tTVEFURV9JU19GUk9aRU5fVU5USUxdID0gbnVsbDtcblxuICAgIGNvbnN0IGxvYWRpbmdBZnRlciA9IGdldExvYWRpbmdCbG9ja0FmdGVyKHREZXRhaWxzKTtcbiAgICBjb25zdCBpbkxvYWRpbmdBZnRlclBoYXNlID0gbERldGFpbHNbTE9BRElOR19BRlRFUl9DTEVBTlVQX0ZOXSAhPT0gbnVsbDtcbiAgICBpZiAobmV3U3RhdGUgPT09IERlZmVyQmxvY2tTdGF0ZS5Mb2FkaW5nICYmIGxvYWRpbmdBZnRlciAhPT0gbnVsbCAmJiAhaW5Mb2FkaW5nQWZ0ZXJQaGFzZSkge1xuICAgICAgLy8gVHJ5aW5nIHRvIHJlbmRlciBsb2FkaW5nLCBidXQgaXQgaGFzIGFuIGBhZnRlcmAgY29uZmlnLFxuICAgICAgLy8gc28gc2NoZWR1bGUgYW4gdXBkYXRlIGFjdGlvbiBhZnRlciBhIHRpbWVvdXQuXG4gICAgICBsRGV0YWlsc1tORVhUX0RFRkVSX0JMT0NLX1NUQVRFXSA9IG5ld1N0YXRlO1xuICAgICAgY29uc3QgY2xlYW51cEZuID1cbiAgICAgICAgICBzY2hlZHVsZURlZmVyQmxvY2tVcGRhdGUobG9hZGluZ0FmdGVyLCBsRGV0YWlscywgdE5vZGUsIGxDb250YWluZXIsIGhvc3RMVmlldyk7XG4gICAgICBsRGV0YWlsc1tMT0FESU5HX0FGVEVSX0NMRUFOVVBfRk5dID0gY2xlYW51cEZuO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJZiB3ZSB0cmFuc2l0aW9uIHRvIGEgY29tcGxldGUgb3IgYW4gZXJyb3Igc3RhdGUgYW5kIHRoZXJlIGlzIGEgcGVuZGluZ1xuICAgICAgLy8gb3BlcmF0aW9uIHRvIHJlbmRlciBsb2FkaW5nIGFmdGVyIGEgdGltZW91dCAtIGludm9rZSBhIGNsZWFudXAgb3BlcmF0aW9uLFxuICAgICAgLy8gd2hpY2ggc3RvcHMgdGhlIHRpbWVyLlxuICAgICAgaWYgKG5ld1N0YXRlID4gRGVmZXJCbG9ja1N0YXRlLkxvYWRpbmcgJiYgaW5Mb2FkaW5nQWZ0ZXJQaGFzZSkge1xuICAgICAgICBsRGV0YWlsc1tMT0FESU5HX0FGVEVSX0NMRUFOVVBfRk5dISgpO1xuICAgICAgICBsRGV0YWlsc1tMT0FESU5HX0FGVEVSX0NMRUFOVVBfRk5dID0gbnVsbDtcbiAgICAgICAgbERldGFpbHNbTkVYVF9ERUZFUl9CTE9DS19TVEFURV0gPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBhcHBseURlZmVyQmxvY2tTdGF0ZShuZXdTdGF0ZSwgbERldGFpbHMsIGxDb250YWluZXIsIHROb2RlLCBob3N0TFZpZXcpO1xuXG4gICAgICBjb25zdCBkdXJhdGlvbiA9IGdldE1pbmltdW1EdXJhdGlvbkZvclN0YXRlKHREZXRhaWxzLCBuZXdTdGF0ZSk7XG4gICAgICBpZiAoZHVyYXRpb24gIT09IG51bGwpIHtcbiAgICAgICAgbERldGFpbHNbU1RBVEVfSVNfRlJPWkVOX1VOVElMXSA9IG5vdyArIGR1cmF0aW9uO1xuICAgICAgICBzY2hlZHVsZURlZmVyQmxvY2tVcGRhdGUoZHVyYXRpb24sIGxEZXRhaWxzLCB0Tm9kZSwgbENvbnRhaW5lciwgaG9zdExWaWV3KTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gV2UgYXJlIHN0aWxsIHJlbmRlcmluZyB0aGUgcHJldmlvdXMgc3RhdGUuXG4gICAgLy8gVXBkYXRlIHRoZSBgTkVYVF9ERUZFUl9CTE9DS19TVEFURWAsIHdoaWNoIHdvdWxkIGJlXG4gICAgLy8gcGlja2VkIHVwIG9uY2UgaXQncyB0aW1lIHRvIHRyYW5zaXRpb24gdG8gdGhlIG5leHQgc3RhdGUuXG4gICAgbERldGFpbHNbTkVYVF9ERUZFUl9CTE9DS19TVEFURV0gPSBuZXdTdGF0ZTtcbiAgfVxufVxuXG4vKipcbiAqIFNjaGVkdWxlcyBhbiB1cGRhdGUgb3BlcmF0aW9uIGFmdGVyIGEgc3BlY2lmaWVkIHRpbWVvdXQuXG4gKi9cbmZ1bmN0aW9uIHNjaGVkdWxlRGVmZXJCbG9ja1VwZGF0ZShcbiAgICB0aW1lb3V0OiBudW1iZXIsIGxEZXRhaWxzOiBMRGVmZXJCbG9ja0RldGFpbHMsIHROb2RlOiBUTm9kZSwgbENvbnRhaW5lcjogTENvbnRhaW5lcixcbiAgICBob3N0TFZpZXc6IExWaWV3PHVua25vd24+KTogVm9pZEZ1bmN0aW9uIHtcbiAgY29uc3QgY2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgbmV4dFN0YXRlID0gbERldGFpbHNbTkVYVF9ERUZFUl9CTE9DS19TVEFURV07XG4gICAgbERldGFpbHNbU1RBVEVfSVNfRlJPWkVOX1VOVElMXSA9IG51bGw7XG4gICAgbERldGFpbHNbTkVYVF9ERUZFUl9CTE9DS19TVEFURV0gPSBudWxsO1xuICAgIGlmIChuZXh0U3RhdGUgIT09IG51bGwpIHtcbiAgICAgIHJlbmRlckRlZmVyQmxvY2tTdGF0ZShuZXh0U3RhdGUsIHROb2RlLCBsQ29udGFpbmVyKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBzY2hlZHVsZVRpbWVyVHJpZ2dlcih0aW1lb3V0LCBjYWxsYmFjaywgaG9zdExWaWV3KTtcbn1cblxuLyoqXG4gKiBDaGVja3Mgd2hldGhlciB3ZSBjYW4gdHJhbnNpdGlvbiB0byB0aGUgbmV4dCBzdGF0ZS5cbiAqXG4gKiBXZSB0cmFuc2l0aW9uIHRvIHRoZSBuZXh0IHN0YXRlIGlmIHRoZSBwcmV2aW91cyBzdGF0ZSB3YXMgcmVwcmVzZW50ZWRcbiAqIHdpdGggYSBudW1iZXIgdGhhdCBpcyBsZXNzIHRoYW4gdGhlIG5leHQgc3RhdGUuIEZvciBleGFtcGxlLCBpZiB0aGUgY3VycmVudFxuICogc3RhdGUgaXMgXCJsb2FkaW5nXCIgKHJlcHJlc2VudGVkIGFzIGAxYCksIHdlIHNob3VsZCBub3Qgc2hvdyBhIHBsYWNlaG9sZGVyXG4gKiAocmVwcmVzZW50ZWQgYXMgYDBgKSwgYnV0IHdlIGNhbiBzaG93IGEgY29tcGxldGVkIHN0YXRlIChyZXByZXNlbnRlZCBhcyBgMmApXG4gKiBvciBhbiBlcnJvciBzdGF0ZSAocmVwcmVzZW50ZWQgYXMgYDNgKS5cbiAqL1xuZnVuY3Rpb24gaXNWYWxpZFN0YXRlQ2hhbmdlKFxuICAgIGN1cnJlbnRTdGF0ZTogRGVmZXJCbG9ja1N0YXRlfERlZmVyQmxvY2tJbnRlcm5hbFN0YXRlLCBuZXdTdGF0ZTogRGVmZXJCbG9ja1N0YXRlKTogYm9vbGVhbiB7XG4gIHJldHVybiBjdXJyZW50U3RhdGUgPCBuZXdTdGF0ZTtcbn1cblxuLyoqXG4gKiBUcmlnZ2VyIHByZWZldGNoaW5nIG9mIGRlcGVuZGVuY2llcyBmb3IgYSBkZWZlciBibG9jay5cbiAqXG4gKiBAcGFyYW0gdERldGFpbHMgU3RhdGljIGluZm9ybWF0aW9uIGFib3V0IHRoaXMgZGVmZXIgYmxvY2suXG4gKiBAcGFyYW0gbFZpZXcgTFZpZXcgb2YgYSBob3N0IHZpZXcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmlnZ2VyUHJlZmV0Y2hpbmcodERldGFpbHM6IFREZWZlckJsb2NrRGV0YWlscywgbFZpZXc6IExWaWV3LCB0Tm9kZTogVE5vZGUpIHtcbiAgaWYgKGxWaWV3W0lOSkVDVE9SXSAmJiBzaG91bGRUcmlnZ2VyRGVmZXJCbG9jayhsVmlld1tJTkpFQ1RPUl0hKSkge1xuICAgIHRyaWdnZXJSZXNvdXJjZUxvYWRpbmcodERldGFpbHMsIGxWaWV3LCB0Tm9kZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBUcmlnZ2VyIGxvYWRpbmcgb2YgZGVmZXIgYmxvY2sgZGVwZW5kZW5jaWVzIGlmIHRoZSBwcm9jZXNzIGhhc24ndCBzdGFydGVkIHlldC5cbiAqXG4gKiBAcGFyYW0gdERldGFpbHMgU3RhdGljIGluZm9ybWF0aW9uIGFib3V0IHRoaXMgZGVmZXIgYmxvY2suXG4gKiBAcGFyYW0gbFZpZXcgTFZpZXcgb2YgYSBob3N0IHZpZXcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmlnZ2VyUmVzb3VyY2VMb2FkaW5nKFxuICAgIHREZXRhaWxzOiBURGVmZXJCbG9ja0RldGFpbHMsIGxWaWV3OiBMVmlldywgdE5vZGU6IFROb2RlKTogUHJvbWlzZTx1bmtub3duPiB7XG4gIGNvbnN0IGluamVjdG9yID0gbFZpZXdbSU5KRUNUT1JdITtcbiAgY29uc3QgdFZpZXcgPSBsVmlld1tUVklFV107XG5cbiAgaWYgKHREZXRhaWxzLmxvYWRpbmdTdGF0ZSAhPT0gRGVmZXJEZXBlbmRlbmNpZXNMb2FkaW5nU3RhdGUuTk9UX1NUQVJURUQpIHtcbiAgICAvLyBJZiB0aGUgbG9hZGluZyBzdGF0dXMgaXMgZGlmZmVyZW50IGZyb20gaW5pdGlhbCBvbmUsIGl0IG1lYW5zIHRoYXRcbiAgICAvLyB0aGUgbG9hZGluZyBvZiBkZXBlbmRlbmNpZXMgaXMgaW4gcHJvZ3Jlc3MgYW5kIHRoZXJlIGlzIG5vdGhpbmcgdG8gZG9cbiAgICAvLyBpbiB0aGlzIGZ1bmN0aW9uLiBBbGwgZGV0YWlscyBjYW4gYmUgb2J0YWluZWQgZnJvbSB0aGUgYHREZXRhaWxzYCBvYmplY3QuXG4gICAgcmV0dXJuIHREZXRhaWxzLmxvYWRpbmdQcm9taXNlID8/IFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgY29uc3QgbERldGFpbHMgPSBnZXRMRGVmZXJCbG9ja0RldGFpbHMobFZpZXcsIHROb2RlKTtcbiAgY29uc3QgcHJpbWFyeUJsb2NrVE5vZGUgPSBnZXRQcmltYXJ5QmxvY2tUTm9kZSh0VmlldywgdERldGFpbHMpO1xuXG4gIC8vIFN3aXRjaCBmcm9tIE5PVF9TVEFSVEVEIC0+IElOX1BST0dSRVNTIHN0YXRlLlxuICB0RGV0YWlscy5sb2FkaW5nU3RhdGUgPSBEZWZlckRlcGVuZGVuY2llc0xvYWRpbmdTdGF0ZS5JTl9QUk9HUkVTUztcblxuICAvLyBQcmVmZXRjaGluZyBpcyB0cmlnZ2VyZWQsIGNsZWFudXAgYWxsIHJlZ2lzdGVyZWQgcHJlZmV0Y2ggdHJpZ2dlcnMuXG4gIGludm9rZVRyaWdnZXJDbGVhbnVwRm5zKFRyaWdnZXJUeXBlLlByZWZldGNoLCBsRGV0YWlscyk7XG5cbiAgbGV0IGRlcGVuZGVuY2llc0ZuID0gdERldGFpbHMuZGVwZW5kZW5jeVJlc29sdmVyRm47XG5cbiAgaWYgKG5nRGV2TW9kZSkge1xuICAgIC8vIENoZWNrIGlmIGRlcGVuZGVuY3kgZnVuY3Rpb24gaW50ZXJjZXB0b3IgaXMgY29uZmlndXJlZC5cbiAgICBjb25zdCBkZWZlckRlcGVuZGVuY3lJbnRlcmNlcHRvciA9XG4gICAgICAgIGluamVjdG9yLmdldChERUZFUl9CTE9DS19ERVBFTkRFTkNZX0lOVEVSQ0VQVE9SLCBudWxsLCB7b3B0aW9uYWw6IHRydWV9KTtcblxuICAgIGlmIChkZWZlckRlcGVuZGVuY3lJbnRlcmNlcHRvcikge1xuICAgICAgZGVwZW5kZW5jaWVzRm4gPSBkZWZlckRlcGVuZGVuY3lJbnRlcmNlcHRvci5pbnRlcmNlcHQoZGVwZW5kZW5jaWVzRm4pO1xuICAgIH1cbiAgfVxuXG4gIC8vIEluZGljYXRlIHRoYXQgYW4gYXBwbGljYXRpb24gaXMgbm90IHN0YWJsZSBhbmQgaGFzIGEgcGVuZGluZyB0YXNrLlxuICBjb25zdCBwZW5kaW5nVGFza3MgPSBpbmplY3Rvci5nZXQoUGVuZGluZ1Rhc2tzKTtcbiAgY29uc3QgdGFza0lkID0gcGVuZGluZ1Rhc2tzLmFkZCgpO1xuXG4gIC8vIFRoZSBgZGVwZW5kZW5jaWVzRm5gIG1pZ2h0IGJlIGBudWxsYCB3aGVuIGFsbCBkZXBlbmRlbmNpZXMgd2l0aGluXG4gIC8vIGEgZ2l2ZW4gZGVmZXIgYmxvY2sgd2VyZSBlYWdlcmx5IHJlZmVyZW5jZWQgZWxzZXdoZXJlIGluIGEgZmlsZSxcbiAgLy8gdGh1cyBubyBkeW5hbWljIGBpbXBvcnQoKWBzIHdlcmUgcHJvZHVjZWQuXG4gIGlmICghZGVwZW5kZW5jaWVzRm4pIHtcbiAgICB0RGV0YWlscy5sb2FkaW5nUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgdERldGFpbHMubG9hZGluZ1Byb21pc2UgPSBudWxsO1xuICAgICAgdERldGFpbHMubG9hZGluZ1N0YXRlID0gRGVmZXJEZXBlbmRlbmNpZXNMb2FkaW5nU3RhdGUuQ09NUExFVEU7XG4gICAgICBwZW5kaW5nVGFza3MucmVtb3ZlKHRhc2tJZCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHREZXRhaWxzLmxvYWRpbmdQcm9taXNlO1xuICB9XG5cbiAgLy8gU3RhcnQgZG93bmxvYWRpbmcgb2YgZGVmZXIgYmxvY2sgZGVwZW5kZW5jaWVzLlxuICB0RGV0YWlscy5sb2FkaW5nUHJvbWlzZSA9IFByb21pc2UuYWxsU2V0dGxlZChkZXBlbmRlbmNpZXNGbigpKS50aGVuKHJlc3VsdHMgPT4ge1xuICAgIGxldCBmYWlsZWQgPSBmYWxzZTtcbiAgICBjb25zdCBkaXJlY3RpdmVEZWZzOiBEaXJlY3RpdmVEZWZMaXN0ID0gW107XG4gICAgY29uc3QgcGlwZURlZnM6IFBpcGVEZWZMaXN0ID0gW107XG5cbiAgICBmb3IgKGNvbnN0IHJlc3VsdCBvZiByZXN1bHRzKSB7XG4gICAgICBpZiAocmVzdWx0LnN0YXR1cyA9PT0gJ2Z1bGZpbGxlZCcpIHtcbiAgICAgICAgY29uc3QgZGVwZW5kZW5jeSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgY29uc3QgZGlyZWN0aXZlRGVmID0gZ2V0Q29tcG9uZW50RGVmKGRlcGVuZGVuY3kpIHx8IGdldERpcmVjdGl2ZURlZihkZXBlbmRlbmN5KTtcbiAgICAgICAgaWYgKGRpcmVjdGl2ZURlZikge1xuICAgICAgICAgIGRpcmVjdGl2ZURlZnMucHVzaChkaXJlY3RpdmVEZWYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHBpcGVEZWYgPSBnZXRQaXBlRGVmKGRlcGVuZGVuY3kpO1xuICAgICAgICAgIGlmIChwaXBlRGVmKSB7XG4gICAgICAgICAgICBwaXBlRGVmcy5wdXNoKHBpcGVEZWYpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmFpbGVkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTG9hZGluZyBpcyBjb21wbGV0ZWQsIHdlIG5vIGxvbmdlciBuZWVkIHRoZSBsb2FkaW5nIFByb21pc2VcbiAgICAvLyBhbmQgYSBwZW5kaW5nIHRhc2sgc2hvdWxkIGFsc28gYmUgcmVtb3ZlZC5cbiAgICB0RGV0YWlscy5sb2FkaW5nUHJvbWlzZSA9IG51bGw7XG4gICAgcGVuZGluZ1Rhc2tzLnJlbW92ZSh0YXNrSWQpO1xuXG4gICAgaWYgKGZhaWxlZCkge1xuICAgICAgdERldGFpbHMubG9hZGluZ1N0YXRlID0gRGVmZXJEZXBlbmRlbmNpZXNMb2FkaW5nU3RhdGUuRkFJTEVEO1xuXG4gICAgICBpZiAodERldGFpbHMuZXJyb3JUbXBsSW5kZXggPT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgdGVtcGxhdGVMb2NhdGlvbiA9IGdldFRlbXBsYXRlTG9jYXRpb25EZXRhaWxzKGxWaWV3KTtcbiAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgUnVudGltZUVycm9yKFxuICAgICAgICAgICAgUnVudGltZUVycm9yQ29kZS5ERUZFUl9MT0FESU5HX0ZBSUxFRCxcbiAgICAgICAgICAgIG5nRGV2TW9kZSAmJlxuICAgICAgICAgICAgICAgICdMb2FkaW5nIGRlcGVuZGVuY2llcyBmb3IgYEBkZWZlcmAgYmxvY2sgZmFpbGVkLCAnICtcbiAgICAgICAgICAgICAgICAgICAgYGJ1dCBubyBcXGBAZXJyb3JcXGAgYmxvY2sgd2FzIGNvbmZpZ3VyZWQke3RlbXBsYXRlTG9jYXRpb259LiBgICtcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnNpZGVyIHVzaW5nIHRoZSBgQGVycm9yYCBibG9jayB0byByZW5kZXIgYW4gZXJyb3Igc3RhdGUuJyk7XG4gICAgICAgIGhhbmRsZUVycm9yKGxWaWV3LCBlcnJvcik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHREZXRhaWxzLmxvYWRpbmdTdGF0ZSA9IERlZmVyRGVwZW5kZW5jaWVzTG9hZGluZ1N0YXRlLkNPTVBMRVRFO1xuXG4gICAgICAvLyBVcGRhdGUgZGlyZWN0aXZlIGFuZCBwaXBlIHJlZ2lzdHJpZXMgdG8gYWRkIG5ld2x5IGRvd25sb2FkZWQgZGVwZW5kZW5jaWVzLlxuICAgICAgY29uc3QgcHJpbWFyeUJsb2NrVFZpZXcgPSBwcmltYXJ5QmxvY2tUTm9kZS50VmlldyE7XG4gICAgICBpZiAoZGlyZWN0aXZlRGVmcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHByaW1hcnlCbG9ja1RWaWV3LmRpcmVjdGl2ZVJlZ2lzdHJ5ID1cbiAgICAgICAgICAgIGFkZERlcHNUb1JlZ2lzdHJ5PERpcmVjdGl2ZURlZkxpc3Q+KHByaW1hcnlCbG9ja1RWaWV3LmRpcmVjdGl2ZVJlZ2lzdHJ5LCBkaXJlY3RpdmVEZWZzKTtcblxuICAgICAgICAvLyBFeHRyYWN0IHByb3ZpZGVycyBmcm9tIGFsbCBOZ01vZHVsZXMgaW1wb3J0ZWQgYnkgc3RhbmRhbG9uZSBjb21wb25lbnRzXG4gICAgICAgIC8vIHVzZWQgd2l0aGluIHRoaXMgZGVmZXIgYmxvY2suXG4gICAgICAgIGNvbnN0IGRpcmVjdGl2ZVR5cGVzID0gZGlyZWN0aXZlRGVmcy5tYXAoZGVmID0+IGRlZi50eXBlKTtcbiAgICAgICAgY29uc3QgcHJvdmlkZXJzID0gaW50ZXJuYWxJbXBvcnRQcm92aWRlcnNGcm9tKGZhbHNlLCAuLi5kaXJlY3RpdmVUeXBlcyk7XG4gICAgICAgIHREZXRhaWxzLnByb3ZpZGVycyA9IHByb3ZpZGVycztcbiAgICAgIH1cbiAgICAgIGlmIChwaXBlRGVmcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHByaW1hcnlCbG9ja1RWaWV3LnBpcGVSZWdpc3RyeSA9XG4gICAgICAgICAgICBhZGREZXBzVG9SZWdpc3RyeTxQaXBlRGVmTGlzdD4ocHJpbWFyeUJsb2NrVFZpZXcucGlwZVJlZ2lzdHJ5LCBwaXBlRGVmcyk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHREZXRhaWxzLmxvYWRpbmdQcm9taXNlO1xufVxuXG4vKiogVXRpbGl0eSBmdW5jdGlvbiB0byByZW5kZXIgcGxhY2Vob2xkZXIgY29udGVudCAoaWYgcHJlc2VudCkgKi9cbmZ1bmN0aW9uIHJlbmRlclBsYWNlaG9sZGVyKGxWaWV3OiBMVmlldywgdE5vZGU6IFROb2RlKSB7XG4gIGNvbnN0IGxDb250YWluZXIgPSBsVmlld1t0Tm9kZS5pbmRleF07XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnRMQ29udGFpbmVyKGxDb250YWluZXIpO1xuXG4gIHJlbmRlckRlZmVyQmxvY2tTdGF0ZShEZWZlckJsb2NrU3RhdGUuUGxhY2Vob2xkZXIsIHROb2RlLCBsQ29udGFpbmVyKTtcbn1cblxuLyoqXG4gKiBTdWJzY3JpYmVzIHRvIHRoZSBcImxvYWRpbmdcIiBQcm9taXNlIGFuZCByZW5kZXJzIGNvcnJlc3BvbmRpbmcgZGVmZXIgc3ViLWJsb2NrLFxuICogYmFzZWQgb24gdGhlIGxvYWRpbmcgcmVzdWx0cy5cbiAqXG4gKiBAcGFyYW0gbENvbnRhaW5lciBSZXByZXNlbnRzIGFuIGluc3RhbmNlIG9mIGEgZGVmZXIgYmxvY2suXG4gKiBAcGFyYW0gdE5vZGUgUmVwcmVzZW50cyBkZWZlciBibG9jayBpbmZvIHNoYXJlZCBhY3Jvc3MgYWxsIGluc3RhbmNlcy5cbiAqL1xuZnVuY3Rpb24gcmVuZGVyRGVmZXJTdGF0ZUFmdGVyUmVzb3VyY2VMb2FkaW5nKFxuICAgIHREZXRhaWxzOiBURGVmZXJCbG9ja0RldGFpbHMsIHROb2RlOiBUTm9kZSwgbENvbnRhaW5lcjogTENvbnRhaW5lcikge1xuICBuZ0Rldk1vZGUgJiZcbiAgICAgIGFzc2VydERlZmluZWQoXG4gICAgICAgICAgdERldGFpbHMubG9hZGluZ1Byb21pc2UsICdFeHBlY3RlZCBsb2FkaW5nIFByb21pc2UgdG8gZXhpc3Qgb24gdGhpcyBkZWZlciBibG9jaycpO1xuXG4gIHREZXRhaWxzLmxvYWRpbmdQcm9taXNlIS50aGVuKCgpID0+IHtcbiAgICBpZiAodERldGFpbHMubG9hZGluZ1N0YXRlID09PSBEZWZlckRlcGVuZGVuY2llc0xvYWRpbmdTdGF0ZS5DT01QTEVURSkge1xuICAgICAgbmdEZXZNb2RlICYmIGFzc2VydERlZmVycmVkRGVwZW5kZW5jaWVzTG9hZGVkKHREZXRhaWxzKTtcblxuICAgICAgLy8gRXZlcnl0aGluZyBpcyBsb2FkZWQsIHNob3cgdGhlIHByaW1hcnkgYmxvY2sgY29udGVudFxuICAgICAgcmVuZGVyRGVmZXJCbG9ja1N0YXRlKERlZmVyQmxvY2tTdGF0ZS5Db21wbGV0ZSwgdE5vZGUsIGxDb250YWluZXIpO1xuXG4gICAgfSBlbHNlIGlmICh0RGV0YWlscy5sb2FkaW5nU3RhdGUgPT09IERlZmVyRGVwZW5kZW5jaWVzTG9hZGluZ1N0YXRlLkZBSUxFRCkge1xuICAgICAgcmVuZGVyRGVmZXJCbG9ja1N0YXRlKERlZmVyQmxvY2tTdGF0ZS5FcnJvciwgdE5vZGUsIGxDb250YWluZXIpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogQXR0ZW1wdHMgdG8gdHJpZ2dlciBsb2FkaW5nIG9mIGRlZmVyIGJsb2NrIGRlcGVuZGVuY2llcy5cbiAqIElmIHRoZSBibG9jayBpcyBhbHJlYWR5IGluIGEgbG9hZGluZywgY29tcGxldGVkIG9yIGFuIGVycm9yIHN0YXRlIC1cbiAqIG5vIGFkZGl0aW9uYWwgYWN0aW9ucyBhcmUgdGFrZW4uXG4gKi9cbmZ1bmN0aW9uIHRyaWdnZXJEZWZlckJsb2NrKGxWaWV3OiBMVmlldywgdE5vZGU6IFROb2RlKSB7XG4gIGNvbnN0IHRWaWV3ID0gbFZpZXdbVFZJRVddO1xuICBjb25zdCBsQ29udGFpbmVyID0gbFZpZXdbdE5vZGUuaW5kZXhdO1xuICBjb25zdCBpbmplY3RvciA9IGxWaWV3W0lOSkVDVE9SXSE7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnRMQ29udGFpbmVyKGxDb250YWluZXIpO1xuXG4gIGlmICghc2hvdWxkVHJpZ2dlckRlZmVyQmxvY2soaW5qZWN0b3IpKSByZXR1cm47XG5cbiAgY29uc3QgbERldGFpbHMgPSBnZXRMRGVmZXJCbG9ja0RldGFpbHMobFZpZXcsIHROb2RlKTtcbiAgY29uc3QgdERldGFpbHMgPSBnZXRURGVmZXJCbG9ja0RldGFpbHModFZpZXcsIHROb2RlKTtcblxuICAvLyBEZWZlciBibG9jayBpcyB0cmlnZ2VyZWQsIGNsZWFudXAgYWxsIHJlZ2lzdGVyZWQgdHJpZ2dlciBmdW5jdGlvbnMuXG4gIGludm9rZUFsbFRyaWdnZXJDbGVhbnVwRm5zKGxEZXRhaWxzKTtcblxuICBzd2l0Y2ggKHREZXRhaWxzLmxvYWRpbmdTdGF0ZSkge1xuICAgIGNhc2UgRGVmZXJEZXBlbmRlbmNpZXNMb2FkaW5nU3RhdGUuTk9UX1NUQVJURUQ6XG4gICAgICByZW5kZXJEZWZlckJsb2NrU3RhdGUoRGVmZXJCbG9ja1N0YXRlLkxvYWRpbmcsIHROb2RlLCBsQ29udGFpbmVyKTtcbiAgICAgIHRyaWdnZXJSZXNvdXJjZUxvYWRpbmcodERldGFpbHMsIGxWaWV3LCB0Tm9kZSk7XG5cbiAgICAgIC8vIFRoZSBgbG9hZGluZ1N0YXRlYCBtaWdodCBoYXZlIGNoYW5nZWQgdG8gXCJsb2FkaW5nXCIuXG4gICAgICBpZiAoKHREZXRhaWxzLmxvYWRpbmdTdGF0ZSBhcyBEZWZlckRlcGVuZGVuY2llc0xvYWRpbmdTdGF0ZSkgPT09XG4gICAgICAgICAgRGVmZXJEZXBlbmRlbmNpZXNMb2FkaW5nU3RhdGUuSU5fUFJPR1JFU1MpIHtcbiAgICAgICAgcmVuZGVyRGVmZXJTdGF0ZUFmdGVyUmVzb3VyY2VMb2FkaW5nKHREZXRhaWxzLCB0Tm9kZSwgbENvbnRhaW5lcik7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIERlZmVyRGVwZW5kZW5jaWVzTG9hZGluZ1N0YXRlLklOX1BST0dSRVNTOlxuICAgICAgcmVuZGVyRGVmZXJCbG9ja1N0YXRlKERlZmVyQmxvY2tTdGF0ZS5Mb2FkaW5nLCB0Tm9kZSwgbENvbnRhaW5lcik7XG4gICAgICByZW5kZXJEZWZlclN0YXRlQWZ0ZXJSZXNvdXJjZUxvYWRpbmcodERldGFpbHMsIHROb2RlLCBsQ29udGFpbmVyKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgRGVmZXJEZXBlbmRlbmNpZXNMb2FkaW5nU3RhdGUuQ09NUExFVEU6XG4gICAgICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RGVmZXJyZWREZXBlbmRlbmNpZXNMb2FkZWQodERldGFpbHMpO1xuICAgICAgcmVuZGVyRGVmZXJCbG9ja1N0YXRlKERlZmVyQmxvY2tTdGF0ZS5Db21wbGV0ZSwgdE5vZGUsIGxDb250YWluZXIpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBEZWZlckRlcGVuZGVuY2llc0xvYWRpbmdTdGF0ZS5GQUlMRUQ6XG4gICAgICByZW5kZXJEZWZlckJsb2NrU3RhdGUoRGVmZXJCbG9ja1N0YXRlLkVycm9yLCB0Tm9kZSwgbENvbnRhaW5lcik7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgaWYgKG5nRGV2TW9kZSkge1xuICAgICAgICB0aHJvd0Vycm9yKCdVbmtub3duIGRlZmVyIGJsb2NrIHN0YXRlJyk7XG4gICAgICB9XG4gIH1cbn1cbiJdfQ==