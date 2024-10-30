/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { internalAfterNextRender } from '../render3/after_render_hooks';
import { assertLContainer, assertLView } from '../render3/assert';
import { CONTAINER_HEADER_OFFSET } from '../render3/interfaces/container';
import { isDestroyed } from '../render3/interfaces/type_checks';
import { HEADER_OFFSET, INJECTOR } from '../render3/interfaces/view';
import { getNativeByIndex, removeLViewOnDestroy, storeLViewOnDestroy, walkUpViews } from '../render3/util/view_utils';
import { assertElement, assertEqual } from '../util/assert';
import { NgZone } from '../zone';
import { storeTriggerCleanupFn } from './cleanup';
import { DEFER_BLOCK_STATE, DeferBlockInternalState, DeferBlockState } from './interfaces';
import { getLDeferBlockDetails } from './utils';
/** Configuration object used to register passive and capturing events. */
const eventListenerOptions = {
    passive: true,
    capture: true
};
/** Keeps track of the currently-registered `on hover` triggers. */
const hoverTriggers = new WeakMap();
/** Keeps track of the currently-registered `on interaction` triggers. */
const interactionTriggers = new WeakMap();
/** Currently-registered `viewport` triggers. */
const viewportTriggers = new WeakMap();
/** Names of the events considered as interaction events. */
const interactionEventNames = ['click', 'keydown'];
/** Names of the events considered as hover events. */
const hoverEventNames = ['mouseenter', 'focusin'];
/** `IntersectionObserver` used to observe `viewport` triggers. */
let intersectionObserver = null;
/** Number of elements currently observed with `viewport` triggers. */
let observedViewportElements = 0;
/** Object keeping track of registered callbacks for a deferred block trigger. */
class DeferEventEntry {
    constructor() {
        this.callbacks = new Set();
        this.listener = () => {
            for (const callback of this.callbacks) {
                callback();
            }
        };
    }
}
/**
 * Registers an interaction trigger.
 * @param trigger Element that is the trigger.
 * @param callback Callback to be invoked when the trigger is interacted with.
 */
export function onInteraction(trigger, callback) {
    let entry = interactionTriggers.get(trigger);
    // If this is the first entry for this element, add the listeners.
    if (!entry) {
        // Note that managing events centrally like this lends itself well to using global
        // event delegation. It currently does delegation at the element level, rather than the
        // document level, because:
        // 1. Global delegation is the most effective when there are a lot of events being registered
        // at the same time. Deferred blocks are unlikely to be used in such a way.
        // 2. Matching events to their target isn't free. For each `click` and `keydown` event we
        // would have look through all the triggers and check if the target either is the element
        // itself or it's contained within the element. Given that `click` and `keydown` are some
        // of the most common events, this may end up introducing a lot of runtime overhead.
        // 3. We're still registering only two events per element, no matter how many deferred blocks
        // are referencing it.
        entry = new DeferEventEntry();
        interactionTriggers.set(trigger, entry);
        for (const name of interactionEventNames) {
            trigger.addEventListener(name, entry.listener, eventListenerOptions);
        }
    }
    entry.callbacks.add(callback);
    return () => {
        const { callbacks, listener } = entry;
        callbacks.delete(callback);
        if (callbacks.size === 0) {
            interactionTriggers.delete(trigger);
            for (const name of interactionEventNames) {
                trigger.removeEventListener(name, listener, eventListenerOptions);
            }
        }
    };
}
/**
 * Registers a hover trigger.
 * @param trigger Element that is the trigger.
 * @param callback Callback to be invoked when the trigger is hovered over.
 */
export function onHover(trigger, callback) {
    let entry = hoverTriggers.get(trigger);
    // If this is the first entry for this element, add the listener.
    if (!entry) {
        entry = new DeferEventEntry();
        hoverTriggers.set(trigger, entry);
        for (const name of hoverEventNames) {
            trigger.addEventListener(name, entry.listener, eventListenerOptions);
        }
    }
    entry.callbacks.add(callback);
    return () => {
        const { callbacks, listener } = entry;
        callbacks.delete(callback);
        if (callbacks.size === 0) {
            for (const name of hoverEventNames) {
                trigger.removeEventListener(name, listener, eventListenerOptions);
            }
            hoverTriggers.delete(trigger);
        }
    };
}
/**
 * Registers a viewport trigger.
 * @param trigger Element that is the trigger.
 * @param callback Callback to be invoked when the trigger comes into the viewport.
 * @param injector Injector that can be used by the trigger to resolve DI tokens.
 */
export function onViewport(trigger, callback, injector) {
    const ngZone = injector.get(NgZone);
    let entry = viewportTriggers.get(trigger);
    intersectionObserver = intersectionObserver || ngZone.runOutsideAngular(() => {
        return new IntersectionObserver(entries => {
            for (const current of entries) {
                // Only invoke the callbacks if the specific element is intersecting.
                if (current.isIntersecting && viewportTriggers.has(current.target)) {
                    ngZone.run(viewportTriggers.get(current.target).listener);
                }
            }
        });
    });
    if (!entry) {
        entry = new DeferEventEntry();
        ngZone.runOutsideAngular(() => intersectionObserver.observe(trigger));
        viewportTriggers.set(trigger, entry);
        observedViewportElements++;
    }
    entry.callbacks.add(callback);
    return () => {
        // It's possible that a different cleanup callback fully removed this element already.
        if (!viewportTriggers.has(trigger)) {
            return;
        }
        entry.callbacks.delete(callback);
        if (entry.callbacks.size === 0) {
            intersectionObserver?.unobserve(trigger);
            viewportTriggers.delete(trigger);
            observedViewportElements--;
        }
        if (observedViewportElements === 0) {
            intersectionObserver?.disconnect();
            intersectionObserver = null;
        }
    };
}
/**
 * Helper function to get the LView in which a deferred block's trigger is rendered.
 * @param deferredHostLView LView in which the deferred block is defined.
 * @param deferredTNode TNode defining the deferred block.
 * @param walkUpTimes Number of times to go up in the view hierarchy to find the trigger's view.
 *   A negative value means that the trigger is inside the block's placeholder, while an undefined
 *   value means that the trigger is in the same LView as the deferred block.
 */
export function getTriggerLView(deferredHostLView, deferredTNode, walkUpTimes) {
    // The trigger is in the same view, we don't need to traverse.
    if (walkUpTimes == null) {
        return deferredHostLView;
    }
    // A positive value or zero means that the trigger is in a parent view.
    if (walkUpTimes >= 0) {
        return walkUpViews(walkUpTimes, deferredHostLView);
    }
    // If the value is negative, it means that the trigger is inside the placeholder.
    const deferredContainer = deferredHostLView[deferredTNode.index];
    ngDevMode && assertLContainer(deferredContainer);
    const triggerLView = deferredContainer[CONTAINER_HEADER_OFFSET] ?? null;
    // We need to null check, because the placeholder might not have been rendered yet.
    if (ngDevMode && triggerLView !== null) {
        const lDetails = getLDeferBlockDetails(deferredHostLView, deferredTNode);
        const renderedState = lDetails[DEFER_BLOCK_STATE];
        assertEqual(renderedState, DeferBlockState.Placeholder, 'Expected a placeholder to be rendered in this defer block.');
        assertLView(triggerLView);
    }
    return triggerLView;
}
/**
 * Gets the element that a deferred block's trigger is pointing to.
 * @param triggerLView LView in which the trigger is defined.
 * @param triggerIndex Index at which the trigger element should've been rendered.
 */
export function getTriggerElement(triggerLView, triggerIndex) {
    const element = getNativeByIndex(HEADER_OFFSET + triggerIndex, triggerLView);
    ngDevMode && assertElement(element);
    return element;
}
/**
 * Registers a DOM-node based trigger.
 * @param initialLView LView in which the defer block is rendered.
 * @param tNode TNode representing the defer block.
 * @param triggerIndex Index at which to find the trigger element.
 * @param walkUpTimes Number of times to go up/down in the view hierarchy to find the trigger.
 * @param registerFn Function that will register the DOM events.
 * @param callback Callback to be invoked when the trigger receives the event that should render
 *     the deferred block.
 * @param type Trigger type to distinguish between regular and prefetch triggers.
 */
export function registerDomTrigger(initialLView, tNode, triggerIndex, walkUpTimes, registerFn, callback, type) {
    const injector = initialLView[INJECTOR];
    function pollDomTrigger() {
        // If the initial view was destroyed, we don't need to do anything.
        if (isDestroyed(initialLView)) {
            return;
        }
        const lDetails = getLDeferBlockDetails(initialLView, tNode);
        const renderedState = lDetails[DEFER_BLOCK_STATE];
        // If the block was loaded before the trigger was resolved, we don't need to do anything.
        if (renderedState !== DeferBlockInternalState.Initial &&
            renderedState !== DeferBlockState.Placeholder) {
            return;
        }
        const triggerLView = getTriggerLView(initialLView, tNode, walkUpTimes);
        // Keep polling until we resolve the trigger's LView.
        if (!triggerLView) {
            internalAfterNextRender(pollDomTrigger, { injector });
            return;
        }
        // It's possible that the trigger's view was destroyed before we resolved the trigger element.
        if (isDestroyed(triggerLView)) {
            return;
        }
        const element = getTriggerElement(triggerLView, triggerIndex);
        const cleanup = registerFn(element, () => {
            if (initialLView !== triggerLView) {
                removeLViewOnDestroy(triggerLView, cleanup);
            }
            callback();
        }, injector);
        // The trigger and deferred block might be in different LViews.
        // For the main LView the cleanup would happen as a part of
        // `storeTriggerCleanupFn` logic. For trigger LView we register
        // a cleanup function there to remove event handlers in case an
        // LView gets destroyed before a trigger is invoked.
        if (initialLView !== triggerLView) {
            storeLViewOnDestroy(triggerLView, cleanup);
        }
        storeTriggerCleanupFn(type, lDetails, cleanup);
    }
    // Begin polling for the trigger.
    internalAfterNextRender(pollDomTrigger, { injector });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX3RyaWdnZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvZGVmZXIvZG9tX3RyaWdnZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUdILE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3RFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxXQUFXLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUV4RSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDOUQsT0FBTyxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQVEsTUFBTSw0QkFBNEIsQ0FBQztBQUMxRSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsb0JBQW9CLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDcEgsT0FBTyxFQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxRCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQy9CLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUVoRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQUUsZUFBZSxFQUFjLE1BQU0sY0FBYyxDQUFDO0FBQ3RHLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUU5QywwRUFBMEU7QUFDMUUsTUFBTSxvQkFBb0IsR0FBNEI7SUFDcEQsT0FBTyxFQUFFLElBQUk7SUFDYixPQUFPLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFFRixtRUFBbUU7QUFDbkUsTUFBTSxhQUFhLEdBQUcsSUFBSSxPQUFPLEVBQTRCLENBQUM7QUFFOUQseUVBQXlFO0FBQ3pFLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxPQUFPLEVBQTRCLENBQUM7QUFFcEUsZ0RBQWdEO0FBQ2hELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxPQUFPLEVBQTRCLENBQUM7QUFFakUsNERBQTREO0FBQzVELE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFVLENBQUM7QUFFNUQsc0RBQXNEO0FBQ3RELE1BQU0sZUFBZSxHQUFHLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBVSxDQUFDO0FBRTNELGtFQUFrRTtBQUNsRSxJQUFJLG9CQUFvQixHQUE4QixJQUFJLENBQUM7QUFFM0Qsc0VBQXNFO0FBQ3RFLElBQUksd0JBQXdCLEdBQUcsQ0FBQyxDQUFDO0FBRWpDLGlGQUFpRjtBQUNqRixNQUFNLGVBQWU7SUFBckI7UUFDRSxjQUFTLEdBQUcsSUFBSSxHQUFHLEVBQWdCLENBQUM7UUFFcEMsYUFBUSxHQUFHLEdBQUcsRUFBRTtZQUNkLEtBQUssTUFBTSxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUN0QyxRQUFRLEVBQUUsQ0FBQztZQUNiLENBQUM7UUFDSCxDQUFDLENBQUE7SUFDSCxDQUFDO0NBQUE7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGFBQWEsQ0FBQyxPQUFnQixFQUFFLFFBQXNCO0lBQ3BFLElBQUksS0FBSyxHQUFHLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUU3QyxrRUFBa0U7SUFDbEUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ1gsa0ZBQWtGO1FBQ2xGLHVGQUF1RjtRQUN2RiwyQkFBMkI7UUFDM0IsNkZBQTZGO1FBQzdGLDJFQUEyRTtRQUMzRSx5RkFBeUY7UUFDekYseUZBQXlGO1FBQ3pGLHlGQUF5RjtRQUN6RixvRkFBb0Y7UUFDcEYsNkZBQTZGO1FBQzdGLHNCQUFzQjtRQUN0QixLQUFLLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUM5QixtQkFBbUIsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhDLEtBQUssTUFBTSxJQUFJLElBQUkscUJBQXFCLEVBQUUsQ0FBQztZQUN6QyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEtBQU0sQ0FBQyxRQUFRLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUN4RSxDQUFDO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRTlCLE9BQU8sR0FBRyxFQUFFO1FBQ1YsTUFBTSxFQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUMsR0FBRyxLQUFNLENBQUM7UUFDckMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUzQixJQUFJLFNBQVMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDekIsbUJBQW1CLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXBDLEtBQUssTUFBTSxJQUFJLElBQUkscUJBQXFCLEVBQUUsQ0FBQztnQkFDekMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztZQUNwRSxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLE9BQU8sQ0FBQyxPQUFnQixFQUFFLFFBQXNCO0lBQzlELElBQUksS0FBSyxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFdkMsaUVBQWlFO0lBQ2pFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNYLEtBQUssR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1FBQzlCLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRWxDLEtBQUssTUFBTSxJQUFJLElBQUksZUFBZSxFQUFFLENBQUM7WUFDbkMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxLQUFNLENBQUMsUUFBUSxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDeEUsQ0FBQztJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUU5QixPQUFPLEdBQUcsRUFBRTtRQUNWLE1BQU0sRUFBQyxTQUFTLEVBQUUsUUFBUSxFQUFDLEdBQUcsS0FBTSxDQUFDO1FBQ3JDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFM0IsSUFBSSxTQUFTLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3pCLEtBQUssTUFBTSxJQUFJLElBQUksZUFBZSxFQUFFLENBQUM7Z0JBQ25DLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixDQUFDLENBQUM7WUFDcEUsQ0FBQztZQUNELGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEMsQ0FBQztJQUNILENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRDs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxVQUFVLENBQ3RCLE9BQWdCLEVBQUUsUUFBc0IsRUFBRSxRQUFrQjtJQUM5RCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLElBQUksS0FBSyxHQUFHLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUUxQyxvQkFBb0IsR0FBRyxvQkFBb0IsSUFBSSxNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO1FBQzNFLE9BQU8sSUFBSSxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN4QyxLQUFLLE1BQU0sT0FBTyxJQUFJLE9BQU8sRUFBRSxDQUFDO2dCQUM5QixxRUFBcUU7Z0JBQ3JFLElBQUksT0FBTyxDQUFDLGNBQWMsSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7b0JBQ25FLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDN0QsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ1gsS0FBSyxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7UUFDOUIsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFDLG9CQUFxQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDckMsd0JBQXdCLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFOUIsT0FBTyxHQUFHLEVBQUU7UUFDVixzRkFBc0Y7UUFDdEYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ25DLE9BQU87UUFDVCxDQUFDO1FBRUQsS0FBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFbEMsSUFBSSxLQUFNLENBQUMsU0FBUyxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUNoQyxvQkFBb0IsRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDekMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pDLHdCQUF3QixFQUFFLENBQUM7UUFDN0IsQ0FBQztRQUVELElBQUksd0JBQXdCLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDbkMsb0JBQW9CLEVBQUUsVUFBVSxFQUFFLENBQUM7WUFDbkMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO1FBQzlCLENBQUM7SUFDSCxDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILE1BQU0sVUFBVSxlQUFlLENBQzNCLGlCQUF3QixFQUFFLGFBQW9CLEVBQUUsV0FBNkI7SUFDL0UsOERBQThEO0lBQzlELElBQUksV0FBVyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3hCLE9BQU8saUJBQWlCLENBQUM7SUFDM0IsQ0FBQztJQUVELHVFQUF1RTtJQUN2RSxJQUFJLFdBQVcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNyQixPQUFPLFdBQVcsQ0FBQyxXQUFXLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsaUZBQWlGO0lBQ2pGLE1BQU0saUJBQWlCLEdBQUcsaUJBQWlCLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pFLFNBQVMsSUFBSSxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ2pELE1BQU0sWUFBWSxHQUFHLGlCQUFpQixDQUFDLHVCQUF1QixDQUFDLElBQUksSUFBSSxDQUFDO0lBRXhFLG1GQUFtRjtJQUNuRixJQUFJLFNBQVMsSUFBSSxZQUFZLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDdkMsTUFBTSxRQUFRLEdBQUcscUJBQXFCLENBQUMsaUJBQWlCLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDekUsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDbEQsV0FBVyxDQUNQLGFBQWEsRUFBRSxlQUFlLENBQUMsV0FBVyxFQUMxQyw0REFBNEQsQ0FBQyxDQUFDO1FBQ2xFLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsT0FBTyxZQUFZLENBQUM7QUFDdEIsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsWUFBbUIsRUFBRSxZQUFvQjtJQUN6RSxNQUFNLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQyxhQUFhLEdBQUcsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQzdFLFNBQVMsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEMsT0FBTyxPQUFrQixDQUFDO0FBQzVCLENBQUM7QUFFRDs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxVQUFVLGtCQUFrQixDQUM5QixZQUFtQixFQUFFLEtBQVksRUFBRSxZQUFvQixFQUFFLFdBQTZCLEVBQ3RGLFVBQTBGLEVBQzFGLFFBQXNCLEVBQUUsSUFBaUI7SUFDM0MsTUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBRSxDQUFDO0lBQ3pDLFNBQVMsY0FBYztRQUNyQixtRUFBbUU7UUFDbkUsSUFBSSxXQUFXLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQztZQUM5QixPQUFPO1FBQ1QsQ0FBQztRQUVELE1BQU0sUUFBUSxHQUFHLHFCQUFxQixDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM1RCxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUVsRCx5RkFBeUY7UUFDekYsSUFBSSxhQUFhLEtBQUssdUJBQXVCLENBQUMsT0FBTztZQUNqRCxhQUFhLEtBQUssZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2xELE9BQU87UUFDVCxDQUFDO1FBRUQsTUFBTSxZQUFZLEdBQUcsZUFBZSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFdkUscURBQXFEO1FBQ3JELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNsQix1QkFBdUIsQ0FBQyxjQUFjLEVBQUUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDO1lBQ3BELE9BQU87UUFDVCxDQUFDO1FBRUQsOEZBQThGO1FBQzlGLElBQUksV0FBVyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUM7WUFDOUIsT0FBTztRQUNULENBQUM7UUFFRCxNQUFNLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDOUQsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDdkMsSUFBSSxZQUFZLEtBQUssWUFBWSxFQUFFLENBQUM7Z0JBQ2xDLG9CQUFvQixDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztZQUM5QyxDQUFDO1lBQ0QsUUFBUSxFQUFFLENBQUM7UUFDYixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFYiwrREFBK0Q7UUFDL0QsMkRBQTJEO1FBQzNELCtEQUErRDtRQUMvRCwrREFBK0Q7UUFDL0Qsb0RBQW9EO1FBQ3BELElBQUksWUFBWSxLQUFLLFlBQVksRUFBRSxDQUFDO1lBQ2xDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM3QyxDQUFDO1FBRUQscUJBQXFCLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsaUNBQWlDO0lBQ2pDLHVCQUF1QixDQUFDLGNBQWMsRUFBRSxFQUFDLFFBQVEsRUFBQyxDQUFDLENBQUM7QUFDdEQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgdHlwZSB7SW5qZWN0b3J9IGZyb20gJy4uL2RpJztcbmltcG9ydCB7aW50ZXJuYWxBZnRlck5leHRSZW5kZXJ9IGZyb20gJy4uL3JlbmRlcjMvYWZ0ZXJfcmVuZGVyX2hvb2tzJztcbmltcG9ydCB7YXNzZXJ0TENvbnRhaW5lciwgYXNzZXJ0TFZpZXd9IGZyb20gJy4uL3JlbmRlcjMvYXNzZXJ0JztcbmltcG9ydCB7Q09OVEFJTkVSX0hFQURFUl9PRkZTRVR9IGZyb20gJy4uL3JlbmRlcjMvaW50ZXJmYWNlcy9jb250YWluZXInO1xuaW1wb3J0IHtUTm9kZX0gZnJvbSAnLi4vcmVuZGVyMy9pbnRlcmZhY2VzL25vZGUnO1xuaW1wb3J0IHtpc0Rlc3Ryb3llZH0gZnJvbSAnLi4vcmVuZGVyMy9pbnRlcmZhY2VzL3R5cGVfY2hlY2tzJztcbmltcG9ydCB7SEVBREVSX09GRlNFVCwgSU5KRUNUT1IsIExWaWV3fSBmcm9tICcuLi9yZW5kZXIzL2ludGVyZmFjZXMvdmlldyc7XG5pbXBvcnQge2dldE5hdGl2ZUJ5SW5kZXgsIHJlbW92ZUxWaWV3T25EZXN0cm95LCBzdG9yZUxWaWV3T25EZXN0cm95LCB3YWxrVXBWaWV3c30gZnJvbSAnLi4vcmVuZGVyMy91dGlsL3ZpZXdfdXRpbHMnO1xuaW1wb3J0IHthc3NlcnRFbGVtZW50LCBhc3NlcnRFcXVhbH0gZnJvbSAnLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHtOZ1pvbmV9IGZyb20gJy4uL3pvbmUnO1xuaW1wb3J0IHtzdG9yZVRyaWdnZXJDbGVhbnVwRm59IGZyb20gJy4vY2xlYW51cCc7XG5cbmltcG9ydCB7REVGRVJfQkxPQ0tfU1RBVEUsIERlZmVyQmxvY2tJbnRlcm5hbFN0YXRlLCBEZWZlckJsb2NrU3RhdGUsIFRyaWdnZXJUeXBlfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHtnZXRMRGVmZXJCbG9ja0RldGFpbHN9IGZyb20gJy4vdXRpbHMnO1xuXG4vKiogQ29uZmlndXJhdGlvbiBvYmplY3QgdXNlZCB0byByZWdpc3RlciBwYXNzaXZlIGFuZCBjYXB0dXJpbmcgZXZlbnRzLiAqL1xuY29uc3QgZXZlbnRMaXN0ZW5lck9wdGlvbnM6IEFkZEV2ZW50TGlzdGVuZXJPcHRpb25zID0ge1xuICBwYXNzaXZlOiB0cnVlLFxuICBjYXB0dXJlOiB0cnVlXG59O1xuXG4vKiogS2VlcHMgdHJhY2sgb2YgdGhlIGN1cnJlbnRseS1yZWdpc3RlcmVkIGBvbiBob3ZlcmAgdHJpZ2dlcnMuICovXG5jb25zdCBob3ZlclRyaWdnZXJzID0gbmV3IFdlYWtNYXA8RWxlbWVudCwgRGVmZXJFdmVudEVudHJ5PigpO1xuXG4vKiogS2VlcHMgdHJhY2sgb2YgdGhlIGN1cnJlbnRseS1yZWdpc3RlcmVkIGBvbiBpbnRlcmFjdGlvbmAgdHJpZ2dlcnMuICovXG5jb25zdCBpbnRlcmFjdGlvblRyaWdnZXJzID0gbmV3IFdlYWtNYXA8RWxlbWVudCwgRGVmZXJFdmVudEVudHJ5PigpO1xuXG4vKiogQ3VycmVudGx5LXJlZ2lzdGVyZWQgYHZpZXdwb3J0YCB0cmlnZ2Vycy4gKi9cbmNvbnN0IHZpZXdwb3J0VHJpZ2dlcnMgPSBuZXcgV2Vha01hcDxFbGVtZW50LCBEZWZlckV2ZW50RW50cnk+KCk7XG5cbi8qKiBOYW1lcyBvZiB0aGUgZXZlbnRzIGNvbnNpZGVyZWQgYXMgaW50ZXJhY3Rpb24gZXZlbnRzLiAqL1xuY29uc3QgaW50ZXJhY3Rpb25FdmVudE5hbWVzID0gWydjbGljaycsICdrZXlkb3duJ10gYXMgY29uc3Q7XG5cbi8qKiBOYW1lcyBvZiB0aGUgZXZlbnRzIGNvbnNpZGVyZWQgYXMgaG92ZXIgZXZlbnRzLiAqL1xuY29uc3QgaG92ZXJFdmVudE5hbWVzID0gWydtb3VzZWVudGVyJywgJ2ZvY3VzaW4nXSBhcyBjb25zdDtcblxuLyoqIGBJbnRlcnNlY3Rpb25PYnNlcnZlcmAgdXNlZCB0byBvYnNlcnZlIGB2aWV3cG9ydGAgdHJpZ2dlcnMuICovXG5sZXQgaW50ZXJzZWN0aW9uT2JzZXJ2ZXI6IEludGVyc2VjdGlvbk9ic2VydmVyfG51bGwgPSBudWxsO1xuXG4vKiogTnVtYmVyIG9mIGVsZW1lbnRzIGN1cnJlbnRseSBvYnNlcnZlZCB3aXRoIGB2aWV3cG9ydGAgdHJpZ2dlcnMuICovXG5sZXQgb2JzZXJ2ZWRWaWV3cG9ydEVsZW1lbnRzID0gMDtcblxuLyoqIE9iamVjdCBrZWVwaW5nIHRyYWNrIG9mIHJlZ2lzdGVyZWQgY2FsbGJhY2tzIGZvciBhIGRlZmVycmVkIGJsb2NrIHRyaWdnZXIuICovXG5jbGFzcyBEZWZlckV2ZW50RW50cnkge1xuICBjYWxsYmFja3MgPSBuZXcgU2V0PFZvaWRGdW5jdGlvbj4oKTtcblxuICBsaXN0ZW5lciA9ICgpID0+IHtcbiAgICBmb3IgKGNvbnN0IGNhbGxiYWNrIG9mIHRoaXMuY2FsbGJhY2tzKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFJlZ2lzdGVycyBhbiBpbnRlcmFjdGlvbiB0cmlnZ2VyLlxuICogQHBhcmFtIHRyaWdnZXIgRWxlbWVudCB0aGF0IGlzIHRoZSB0cmlnZ2VyLlxuICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIHRvIGJlIGludm9rZWQgd2hlbiB0aGUgdHJpZ2dlciBpcyBpbnRlcmFjdGVkIHdpdGguXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvbkludGVyYWN0aW9uKHRyaWdnZXI6IEVsZW1lbnQsIGNhbGxiYWNrOiBWb2lkRnVuY3Rpb24pOiBWb2lkRnVuY3Rpb24ge1xuICBsZXQgZW50cnkgPSBpbnRlcmFjdGlvblRyaWdnZXJzLmdldCh0cmlnZ2VyKTtcblxuICAvLyBJZiB0aGlzIGlzIHRoZSBmaXJzdCBlbnRyeSBmb3IgdGhpcyBlbGVtZW50LCBhZGQgdGhlIGxpc3RlbmVycy5cbiAgaWYgKCFlbnRyeSkge1xuICAgIC8vIE5vdGUgdGhhdCBtYW5hZ2luZyBldmVudHMgY2VudHJhbGx5IGxpa2UgdGhpcyBsZW5kcyBpdHNlbGYgd2VsbCB0byB1c2luZyBnbG9iYWxcbiAgICAvLyBldmVudCBkZWxlZ2F0aW9uLiBJdCBjdXJyZW50bHkgZG9lcyBkZWxlZ2F0aW9uIGF0IHRoZSBlbGVtZW50IGxldmVsLCByYXRoZXIgdGhhbiB0aGVcbiAgICAvLyBkb2N1bWVudCBsZXZlbCwgYmVjYXVzZTpcbiAgICAvLyAxLiBHbG9iYWwgZGVsZWdhdGlvbiBpcyB0aGUgbW9zdCBlZmZlY3RpdmUgd2hlbiB0aGVyZSBhcmUgYSBsb3Qgb2YgZXZlbnRzIGJlaW5nIHJlZ2lzdGVyZWRcbiAgICAvLyBhdCB0aGUgc2FtZSB0aW1lLiBEZWZlcnJlZCBibG9ja3MgYXJlIHVubGlrZWx5IHRvIGJlIHVzZWQgaW4gc3VjaCBhIHdheS5cbiAgICAvLyAyLiBNYXRjaGluZyBldmVudHMgdG8gdGhlaXIgdGFyZ2V0IGlzbid0IGZyZWUuIEZvciBlYWNoIGBjbGlja2AgYW5kIGBrZXlkb3duYCBldmVudCB3ZVxuICAgIC8vIHdvdWxkIGhhdmUgbG9vayB0aHJvdWdoIGFsbCB0aGUgdHJpZ2dlcnMgYW5kIGNoZWNrIGlmIHRoZSB0YXJnZXQgZWl0aGVyIGlzIHRoZSBlbGVtZW50XG4gICAgLy8gaXRzZWxmIG9yIGl0J3MgY29udGFpbmVkIHdpdGhpbiB0aGUgZWxlbWVudC4gR2l2ZW4gdGhhdCBgY2xpY2tgIGFuZCBga2V5ZG93bmAgYXJlIHNvbWVcbiAgICAvLyBvZiB0aGUgbW9zdCBjb21tb24gZXZlbnRzLCB0aGlzIG1heSBlbmQgdXAgaW50cm9kdWNpbmcgYSBsb3Qgb2YgcnVudGltZSBvdmVyaGVhZC5cbiAgICAvLyAzLiBXZSdyZSBzdGlsbCByZWdpc3RlcmluZyBvbmx5IHR3byBldmVudHMgcGVyIGVsZW1lbnQsIG5vIG1hdHRlciBob3cgbWFueSBkZWZlcnJlZCBibG9ja3NcbiAgICAvLyBhcmUgcmVmZXJlbmNpbmcgaXQuXG4gICAgZW50cnkgPSBuZXcgRGVmZXJFdmVudEVudHJ5KCk7XG4gICAgaW50ZXJhY3Rpb25UcmlnZ2Vycy5zZXQodHJpZ2dlciwgZW50cnkpO1xuXG4gICAgZm9yIChjb25zdCBuYW1lIG9mIGludGVyYWN0aW9uRXZlbnROYW1lcykge1xuICAgICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGVudHJ5IS5saXN0ZW5lciwgZXZlbnRMaXN0ZW5lck9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIGVudHJ5LmNhbGxiYWNrcy5hZGQoY2FsbGJhY2spO1xuXG4gIHJldHVybiAoKSA9PiB7XG4gICAgY29uc3Qge2NhbGxiYWNrcywgbGlzdGVuZXJ9ID0gZW50cnkhO1xuICAgIGNhbGxiYWNrcy5kZWxldGUoY2FsbGJhY2spO1xuXG4gICAgaWYgKGNhbGxiYWNrcy5zaXplID09PSAwKSB7XG4gICAgICBpbnRlcmFjdGlvblRyaWdnZXJzLmRlbGV0ZSh0cmlnZ2VyKTtcblxuICAgICAgZm9yIChjb25zdCBuYW1lIG9mIGludGVyYWN0aW9uRXZlbnROYW1lcykge1xuICAgICAgICB0cmlnZ2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgbGlzdGVuZXIsIGV2ZW50TGlzdGVuZXJPcHRpb25zKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbi8qKlxuICogUmVnaXN0ZXJzIGEgaG92ZXIgdHJpZ2dlci5cbiAqIEBwYXJhbSB0cmlnZ2VyIEVsZW1lbnQgdGhhdCBpcyB0aGUgdHJpZ2dlci5cbiAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayB0byBiZSBpbnZva2VkIHdoZW4gdGhlIHRyaWdnZXIgaXMgaG92ZXJlZCBvdmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gb25Ib3Zlcih0cmlnZ2VyOiBFbGVtZW50LCBjYWxsYmFjazogVm9pZEZ1bmN0aW9uKTogVm9pZEZ1bmN0aW9uIHtcbiAgbGV0IGVudHJ5ID0gaG92ZXJUcmlnZ2Vycy5nZXQodHJpZ2dlcik7XG5cbiAgLy8gSWYgdGhpcyBpcyB0aGUgZmlyc3QgZW50cnkgZm9yIHRoaXMgZWxlbWVudCwgYWRkIHRoZSBsaXN0ZW5lci5cbiAgaWYgKCFlbnRyeSkge1xuICAgIGVudHJ5ID0gbmV3IERlZmVyRXZlbnRFbnRyeSgpO1xuICAgIGhvdmVyVHJpZ2dlcnMuc2V0KHRyaWdnZXIsIGVudHJ5KTtcblxuICAgIGZvciAoY29uc3QgbmFtZSBvZiBob3ZlckV2ZW50TmFtZXMpIHtcbiAgICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBlbnRyeSEubGlzdGVuZXIsIGV2ZW50TGlzdGVuZXJPcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBlbnRyeS5jYWxsYmFja3MuYWRkKGNhbGxiYWNrKTtcblxuICByZXR1cm4gKCkgPT4ge1xuICAgIGNvbnN0IHtjYWxsYmFja3MsIGxpc3RlbmVyfSA9IGVudHJ5ITtcbiAgICBjYWxsYmFja3MuZGVsZXRlKGNhbGxiYWNrKTtcblxuICAgIGlmIChjYWxsYmFja3Muc2l6ZSA9PT0gMCkge1xuICAgICAgZm9yIChjb25zdCBuYW1lIG9mIGhvdmVyRXZlbnROYW1lcykge1xuICAgICAgICB0cmlnZ2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgbGlzdGVuZXIsIGV2ZW50TGlzdGVuZXJPcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIGhvdmVyVHJpZ2dlcnMuZGVsZXRlKHRyaWdnZXIpO1xuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBSZWdpc3RlcnMgYSB2aWV3cG9ydCB0cmlnZ2VyLlxuICogQHBhcmFtIHRyaWdnZXIgRWxlbWVudCB0aGF0IGlzIHRoZSB0cmlnZ2VyLlxuICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIHRvIGJlIGludm9rZWQgd2hlbiB0aGUgdHJpZ2dlciBjb21lcyBpbnRvIHRoZSB2aWV3cG9ydC5cbiAqIEBwYXJhbSBpbmplY3RvciBJbmplY3RvciB0aGF0IGNhbiBiZSB1c2VkIGJ5IHRoZSB0cmlnZ2VyIHRvIHJlc29sdmUgREkgdG9rZW5zLlxuICovXG5leHBvcnQgZnVuY3Rpb24gb25WaWV3cG9ydChcbiAgICB0cmlnZ2VyOiBFbGVtZW50LCBjYWxsYmFjazogVm9pZEZ1bmN0aW9uLCBpbmplY3RvcjogSW5qZWN0b3IpOiBWb2lkRnVuY3Rpb24ge1xuICBjb25zdCBuZ1pvbmUgPSBpbmplY3Rvci5nZXQoTmdab25lKTtcbiAgbGV0IGVudHJ5ID0gdmlld3BvcnRUcmlnZ2Vycy5nZXQodHJpZ2dlcik7XG5cbiAgaW50ZXJzZWN0aW9uT2JzZXJ2ZXIgPSBpbnRlcnNlY3Rpb25PYnNlcnZlciB8fCBuZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgIHJldHVybiBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoZW50cmllcyA9PiB7XG4gICAgICBmb3IgKGNvbnN0IGN1cnJlbnQgb2YgZW50cmllcykge1xuICAgICAgICAvLyBPbmx5IGludm9rZSB0aGUgY2FsbGJhY2tzIGlmIHRoZSBzcGVjaWZpYyBlbGVtZW50IGlzIGludGVyc2VjdGluZy5cbiAgICAgICAgaWYgKGN1cnJlbnQuaXNJbnRlcnNlY3RpbmcgJiYgdmlld3BvcnRUcmlnZ2Vycy5oYXMoY3VycmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgbmdab25lLnJ1bih2aWV3cG9ydFRyaWdnZXJzLmdldChjdXJyZW50LnRhcmdldCkhLmxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICBpZiAoIWVudHJ5KSB7XG4gICAgZW50cnkgPSBuZXcgRGVmZXJFdmVudEVudHJ5KCk7XG4gICAgbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IGludGVyc2VjdGlvbk9ic2VydmVyIS5vYnNlcnZlKHRyaWdnZXIpKTtcbiAgICB2aWV3cG9ydFRyaWdnZXJzLnNldCh0cmlnZ2VyLCBlbnRyeSk7XG4gICAgb2JzZXJ2ZWRWaWV3cG9ydEVsZW1lbnRzKys7XG4gIH1cblxuICBlbnRyeS5jYWxsYmFja3MuYWRkKGNhbGxiYWNrKTtcblxuICByZXR1cm4gKCkgPT4ge1xuICAgIC8vIEl0J3MgcG9zc2libGUgdGhhdCBhIGRpZmZlcmVudCBjbGVhbnVwIGNhbGxiYWNrIGZ1bGx5IHJlbW92ZWQgdGhpcyBlbGVtZW50IGFscmVhZHkuXG4gICAgaWYgKCF2aWV3cG9ydFRyaWdnZXJzLmhhcyh0cmlnZ2VyKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGVudHJ5IS5jYWxsYmFja3MuZGVsZXRlKGNhbGxiYWNrKTtcblxuICAgIGlmIChlbnRyeSEuY2FsbGJhY2tzLnNpemUgPT09IDApIHtcbiAgICAgIGludGVyc2VjdGlvbk9ic2VydmVyPy51bm9ic2VydmUodHJpZ2dlcik7XG4gICAgICB2aWV3cG9ydFRyaWdnZXJzLmRlbGV0ZSh0cmlnZ2VyKTtcbiAgICAgIG9ic2VydmVkVmlld3BvcnRFbGVtZW50cy0tO1xuICAgIH1cblxuICAgIGlmIChvYnNlcnZlZFZpZXdwb3J0RWxlbWVudHMgPT09IDApIHtcbiAgICAgIGludGVyc2VjdGlvbk9ic2VydmVyPy5kaXNjb25uZWN0KCk7XG4gICAgICBpbnRlcnNlY3Rpb25PYnNlcnZlciA9IG51bGw7XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBnZXQgdGhlIExWaWV3IGluIHdoaWNoIGEgZGVmZXJyZWQgYmxvY2sncyB0cmlnZ2VyIGlzIHJlbmRlcmVkLlxuICogQHBhcmFtIGRlZmVycmVkSG9zdExWaWV3IExWaWV3IGluIHdoaWNoIHRoZSBkZWZlcnJlZCBibG9jayBpcyBkZWZpbmVkLlxuICogQHBhcmFtIGRlZmVycmVkVE5vZGUgVE5vZGUgZGVmaW5pbmcgdGhlIGRlZmVycmVkIGJsb2NrLlxuICogQHBhcmFtIHdhbGtVcFRpbWVzIE51bWJlciBvZiB0aW1lcyB0byBnbyB1cCBpbiB0aGUgdmlldyBoaWVyYXJjaHkgdG8gZmluZCB0aGUgdHJpZ2dlcidzIHZpZXcuXG4gKiAgIEEgbmVnYXRpdmUgdmFsdWUgbWVhbnMgdGhhdCB0aGUgdHJpZ2dlciBpcyBpbnNpZGUgdGhlIGJsb2NrJ3MgcGxhY2Vob2xkZXIsIHdoaWxlIGFuIHVuZGVmaW5lZFxuICogICB2YWx1ZSBtZWFucyB0aGF0IHRoZSB0cmlnZ2VyIGlzIGluIHRoZSBzYW1lIExWaWV3IGFzIHRoZSBkZWZlcnJlZCBibG9jay5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRyaWdnZXJMVmlldyhcbiAgICBkZWZlcnJlZEhvc3RMVmlldzogTFZpZXcsIGRlZmVycmVkVE5vZGU6IFROb2RlLCB3YWxrVXBUaW1lczogbnVtYmVyfHVuZGVmaW5lZCk6IExWaWV3fG51bGwge1xuICAvLyBUaGUgdHJpZ2dlciBpcyBpbiB0aGUgc2FtZSB2aWV3LCB3ZSBkb24ndCBuZWVkIHRvIHRyYXZlcnNlLlxuICBpZiAod2Fsa1VwVGltZXMgPT0gbnVsbCkge1xuICAgIHJldHVybiBkZWZlcnJlZEhvc3RMVmlldztcbiAgfVxuXG4gIC8vIEEgcG9zaXRpdmUgdmFsdWUgb3IgemVybyBtZWFucyB0aGF0IHRoZSB0cmlnZ2VyIGlzIGluIGEgcGFyZW50IHZpZXcuXG4gIGlmICh3YWxrVXBUaW1lcyA+PSAwKSB7XG4gICAgcmV0dXJuIHdhbGtVcFZpZXdzKHdhbGtVcFRpbWVzLCBkZWZlcnJlZEhvc3RMVmlldyk7XG4gIH1cblxuICAvLyBJZiB0aGUgdmFsdWUgaXMgbmVnYXRpdmUsIGl0IG1lYW5zIHRoYXQgdGhlIHRyaWdnZXIgaXMgaW5zaWRlIHRoZSBwbGFjZWhvbGRlci5cbiAgY29uc3QgZGVmZXJyZWRDb250YWluZXIgPSBkZWZlcnJlZEhvc3RMVmlld1tkZWZlcnJlZFROb2RlLmluZGV4XTtcbiAgbmdEZXZNb2RlICYmIGFzc2VydExDb250YWluZXIoZGVmZXJyZWRDb250YWluZXIpO1xuICBjb25zdCB0cmlnZ2VyTFZpZXcgPSBkZWZlcnJlZENvbnRhaW5lcltDT05UQUlORVJfSEVBREVSX09GRlNFVF0gPz8gbnVsbDtcblxuICAvLyBXZSBuZWVkIHRvIG51bGwgY2hlY2ssIGJlY2F1c2UgdGhlIHBsYWNlaG9sZGVyIG1pZ2h0IG5vdCBoYXZlIGJlZW4gcmVuZGVyZWQgeWV0LlxuICBpZiAobmdEZXZNb2RlICYmIHRyaWdnZXJMVmlldyAhPT0gbnVsbCkge1xuICAgIGNvbnN0IGxEZXRhaWxzID0gZ2V0TERlZmVyQmxvY2tEZXRhaWxzKGRlZmVycmVkSG9zdExWaWV3LCBkZWZlcnJlZFROb2RlKTtcbiAgICBjb25zdCByZW5kZXJlZFN0YXRlID0gbERldGFpbHNbREVGRVJfQkxPQ0tfU1RBVEVdO1xuICAgIGFzc2VydEVxdWFsKFxuICAgICAgICByZW5kZXJlZFN0YXRlLCBEZWZlckJsb2NrU3RhdGUuUGxhY2Vob2xkZXIsXG4gICAgICAgICdFeHBlY3RlZCBhIHBsYWNlaG9sZGVyIHRvIGJlIHJlbmRlcmVkIGluIHRoaXMgZGVmZXIgYmxvY2suJyk7XG4gICAgYXNzZXJ0TFZpZXcodHJpZ2dlckxWaWV3KTtcbiAgfVxuXG4gIHJldHVybiB0cmlnZ2VyTFZpZXc7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgZWxlbWVudCB0aGF0IGEgZGVmZXJyZWQgYmxvY2sncyB0cmlnZ2VyIGlzIHBvaW50aW5nIHRvLlxuICogQHBhcmFtIHRyaWdnZXJMVmlldyBMVmlldyBpbiB3aGljaCB0aGUgdHJpZ2dlciBpcyBkZWZpbmVkLlxuICogQHBhcmFtIHRyaWdnZXJJbmRleCBJbmRleCBhdCB3aGljaCB0aGUgdHJpZ2dlciBlbGVtZW50IHNob3VsZCd2ZSBiZWVuIHJlbmRlcmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJpZ2dlckVsZW1lbnQodHJpZ2dlckxWaWV3OiBMVmlldywgdHJpZ2dlckluZGV4OiBudW1iZXIpOiBFbGVtZW50IHtcbiAgY29uc3QgZWxlbWVudCA9IGdldE5hdGl2ZUJ5SW5kZXgoSEVBREVSX09GRlNFVCArIHRyaWdnZXJJbmRleCwgdHJpZ2dlckxWaWV3KTtcbiAgbmdEZXZNb2RlICYmIGFzc2VydEVsZW1lbnQoZWxlbWVudCk7XG4gIHJldHVybiBlbGVtZW50IGFzIEVsZW1lbnQ7XG59XG5cbi8qKlxuICogUmVnaXN0ZXJzIGEgRE9NLW5vZGUgYmFzZWQgdHJpZ2dlci5cbiAqIEBwYXJhbSBpbml0aWFsTFZpZXcgTFZpZXcgaW4gd2hpY2ggdGhlIGRlZmVyIGJsb2NrIGlzIHJlbmRlcmVkLlxuICogQHBhcmFtIHROb2RlIFROb2RlIHJlcHJlc2VudGluZyB0aGUgZGVmZXIgYmxvY2suXG4gKiBAcGFyYW0gdHJpZ2dlckluZGV4IEluZGV4IGF0IHdoaWNoIHRvIGZpbmQgdGhlIHRyaWdnZXIgZWxlbWVudC5cbiAqIEBwYXJhbSB3YWxrVXBUaW1lcyBOdW1iZXIgb2YgdGltZXMgdG8gZ28gdXAvZG93biBpbiB0aGUgdmlldyBoaWVyYXJjaHkgdG8gZmluZCB0aGUgdHJpZ2dlci5cbiAqIEBwYXJhbSByZWdpc3RlckZuIEZ1bmN0aW9uIHRoYXQgd2lsbCByZWdpc3RlciB0aGUgRE9NIGV2ZW50cy5cbiAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayB0byBiZSBpbnZva2VkIHdoZW4gdGhlIHRyaWdnZXIgcmVjZWl2ZXMgdGhlIGV2ZW50IHRoYXQgc2hvdWxkIHJlbmRlclxuICogICAgIHRoZSBkZWZlcnJlZCBibG9jay5cbiAqIEBwYXJhbSB0eXBlIFRyaWdnZXIgdHlwZSB0byBkaXN0aW5ndWlzaCBiZXR3ZWVuIHJlZ3VsYXIgYW5kIHByZWZldGNoIHRyaWdnZXJzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJEb21UcmlnZ2VyKFxuICAgIGluaXRpYWxMVmlldzogTFZpZXcsIHROb2RlOiBUTm9kZSwgdHJpZ2dlckluZGV4OiBudW1iZXIsIHdhbGtVcFRpbWVzOiBudW1iZXJ8dW5kZWZpbmVkLFxuICAgIHJlZ2lzdGVyRm46IChlbGVtZW50OiBFbGVtZW50LCBjYWxsYmFjazogVm9pZEZ1bmN0aW9uLCBpbmplY3RvcjogSW5qZWN0b3IpID0+IFZvaWRGdW5jdGlvbixcbiAgICBjYWxsYmFjazogVm9pZEZ1bmN0aW9uLCB0eXBlOiBUcmlnZ2VyVHlwZSkge1xuICBjb25zdCBpbmplY3RvciA9IGluaXRpYWxMVmlld1tJTkpFQ1RPUl0hO1xuICBmdW5jdGlvbiBwb2xsRG9tVHJpZ2dlcigpIHtcbiAgICAvLyBJZiB0aGUgaW5pdGlhbCB2aWV3IHdhcyBkZXN0cm95ZWQsIHdlIGRvbid0IG5lZWQgdG8gZG8gYW55dGhpbmcuXG4gICAgaWYgKGlzRGVzdHJveWVkKGluaXRpYWxMVmlldykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBsRGV0YWlscyA9IGdldExEZWZlckJsb2NrRGV0YWlscyhpbml0aWFsTFZpZXcsIHROb2RlKTtcbiAgICBjb25zdCByZW5kZXJlZFN0YXRlID0gbERldGFpbHNbREVGRVJfQkxPQ0tfU1RBVEVdO1xuXG4gICAgLy8gSWYgdGhlIGJsb2NrIHdhcyBsb2FkZWQgYmVmb3JlIHRoZSB0cmlnZ2VyIHdhcyByZXNvbHZlZCwgd2UgZG9uJ3QgbmVlZCB0byBkbyBhbnl0aGluZy5cbiAgICBpZiAocmVuZGVyZWRTdGF0ZSAhPT0gRGVmZXJCbG9ja0ludGVybmFsU3RhdGUuSW5pdGlhbCAmJlxuICAgICAgICByZW5kZXJlZFN0YXRlICE9PSBEZWZlckJsb2NrU3RhdGUuUGxhY2Vob2xkZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0cmlnZ2VyTFZpZXcgPSBnZXRUcmlnZ2VyTFZpZXcoaW5pdGlhbExWaWV3LCB0Tm9kZSwgd2Fsa1VwVGltZXMpO1xuXG4gICAgLy8gS2VlcCBwb2xsaW5nIHVudGlsIHdlIHJlc29sdmUgdGhlIHRyaWdnZXIncyBMVmlldy5cbiAgICBpZiAoIXRyaWdnZXJMVmlldykge1xuICAgICAgaW50ZXJuYWxBZnRlck5leHRSZW5kZXIocG9sbERvbVRyaWdnZXIsIHtpbmplY3Rvcn0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEl0J3MgcG9zc2libGUgdGhhdCB0aGUgdHJpZ2dlcidzIHZpZXcgd2FzIGRlc3Ryb3llZCBiZWZvcmUgd2UgcmVzb2x2ZWQgdGhlIHRyaWdnZXIgZWxlbWVudC5cbiAgICBpZiAoaXNEZXN0cm95ZWQodHJpZ2dlckxWaWV3KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGVsZW1lbnQgPSBnZXRUcmlnZ2VyRWxlbWVudCh0cmlnZ2VyTFZpZXcsIHRyaWdnZXJJbmRleCk7XG4gICAgY29uc3QgY2xlYW51cCA9IHJlZ2lzdGVyRm4oZWxlbWVudCwgKCkgPT4ge1xuICAgICAgaWYgKGluaXRpYWxMVmlldyAhPT0gdHJpZ2dlckxWaWV3KSB7XG4gICAgICAgIHJlbW92ZUxWaWV3T25EZXN0cm95KHRyaWdnZXJMVmlldywgY2xlYW51cCk7XG4gICAgICB9XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH0sIGluamVjdG9yKTtcblxuICAgIC8vIFRoZSB0cmlnZ2VyIGFuZCBkZWZlcnJlZCBibG9jayBtaWdodCBiZSBpbiBkaWZmZXJlbnQgTFZpZXdzLlxuICAgIC8vIEZvciB0aGUgbWFpbiBMVmlldyB0aGUgY2xlYW51cCB3b3VsZCBoYXBwZW4gYXMgYSBwYXJ0IG9mXG4gICAgLy8gYHN0b3JlVHJpZ2dlckNsZWFudXBGbmAgbG9naWMuIEZvciB0cmlnZ2VyIExWaWV3IHdlIHJlZ2lzdGVyXG4gICAgLy8gYSBjbGVhbnVwIGZ1bmN0aW9uIHRoZXJlIHRvIHJlbW92ZSBldmVudCBoYW5kbGVycyBpbiBjYXNlIGFuXG4gICAgLy8gTFZpZXcgZ2V0cyBkZXN0cm95ZWQgYmVmb3JlIGEgdHJpZ2dlciBpcyBpbnZva2VkLlxuICAgIGlmIChpbml0aWFsTFZpZXcgIT09IHRyaWdnZXJMVmlldykge1xuICAgICAgc3RvcmVMVmlld09uRGVzdHJveSh0cmlnZ2VyTFZpZXcsIGNsZWFudXApO1xuICAgIH1cblxuICAgIHN0b3JlVHJpZ2dlckNsZWFudXBGbih0eXBlLCBsRGV0YWlscywgY2xlYW51cCk7XG4gIH1cblxuICAvLyBCZWdpbiBwb2xsaW5nIGZvciB0aGUgdHJpZ2dlci5cbiAgaW50ZXJuYWxBZnRlck5leHRSZW5kZXIocG9sbERvbVRyaWdnZXIsIHtpbmplY3Rvcn0pO1xufVxuIl19