/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { isForwardRef, resolveForwardRef } from '../di/forward_ref';
import { injectRootLimpMode, setInjectImplementation } from '../di/inject_switch';
import { convertToBitFlags } from '../di/injector_compatibility';
import { InjectFlags } from '../di/interface/injector';
import { assertDefined, assertEqual, assertIndexInRange } from '../util/assert';
import { noSideEffects } from '../util/closure';
import { assertDirectiveDef, assertNodeInjector, assertTNodeForLView } from './assert';
import { emitInstanceCreatedByInjectorEvent, runInInjectorProfilerContext, setInjectorProfilerContext } from './debug/injector_profiler';
import { getFactoryDef } from './definition_factory';
import { throwCyclicDependencyError, throwProviderNotFoundError } from './errors_di';
import { NG_ELEMENT_ID, NG_FACTORY_DEF } from './fields';
import { registerPreOrderHooks } from './hooks';
import { isFactory, NO_PARENT_INJECTOR } from './interfaces/injector';
import { isComponentDef, isComponentHost } from './interfaces/type_checks';
import { DECLARATION_COMPONENT_VIEW, DECLARATION_VIEW, EMBEDDED_VIEW_INJECTOR, FLAGS, INJECTOR, T_HOST, TVIEW } from './interfaces/view';
import { assertTNodeType } from './node_assert';
import { enterDI, getCurrentTNode, getLView, leaveDI } from './state';
import { isNameOnlyAttributeMarker } from './util/attrs_utils';
import { getParentInjectorIndex, getParentInjectorView, hasParentInjector } from './util/injector_utils';
import { stringifyForError } from './util/stringify_utils';
/**
 * Defines if the call to `inject` should include `viewProviders` in its resolution.
 *
 * This is set to true when we try to instantiate a component. This value is reset in
 * `getNodeInjectable` to a value which matches the declaration location of the token about to be
 * instantiated. This is done so that if we are injecting a token which was declared outside of
 * `viewProviders` we don't accidentally pull `viewProviders` in.
 *
 * Example:
 *
 * ```
 * @Injectable()
 * class MyService {
 *   constructor(public value: String) {}
 * }
 *
 * @Component({
 *   providers: [
 *     MyService,
 *     {provide: String, value: 'providers' }
 *   ]
 *   viewProviders: [
 *     {provide: String, value: 'viewProviders'}
 *   ]
 * })
 * class MyComponent {
 *   constructor(myService: MyService, value: String) {
 *     // We expect that Component can see into `viewProviders`.
 *     expect(value).toEqual('viewProviders');
 *     // `MyService` was not declared in `viewProviders` hence it can't see it.
 *     expect(myService.value).toEqual('providers');
 *   }
 * }
 *
 * ```
 */
let includeViewProviders = true;
export function setIncludeViewProviders(v) {
    const oldValue = includeViewProviders;
    includeViewProviders = v;
    return oldValue;
}
/**
 * The number of slots in each bloom filter (used by DI). The larger this number, the fewer
 * directives that will share slots, and thus, the fewer false positives when checking for
 * the existence of a directive.
 */
const BLOOM_SIZE = 256;
const BLOOM_MASK = BLOOM_SIZE - 1;
/**
 * The number of bits that is represented by a single bloom bucket. JS bit operations are 32 bits,
 * so each bucket represents 32 distinct tokens which accounts for log2(32) = 5 bits of a bloom hash
 * number.
 */
const BLOOM_BUCKET_BITS = 5;
/** Counter used to generate unique IDs for directives. */
let nextNgElementId = 0;
/** Value used when something wasn't found by an injector. */
const NOT_FOUND = {};
/**
 * Registers this directive as present in its node's injector by flipping the directive's
 * corresponding bit in the injector's bloom filter.
 *
 * @param injectorIndex The index of the node injector where this token should be registered
 * @param tView The TView for the injector's bloom filters
 * @param type The directive token to register
 */
export function bloomAdd(injectorIndex, tView, type) {
    ngDevMode && assertEqual(tView.firstCreatePass, true, 'expected firstCreatePass to be true');
    let id;
    if (typeof type === 'string') {
        id = type.charCodeAt(0) || 0;
    }
    else if (type.hasOwnProperty(NG_ELEMENT_ID)) {
        id = type[NG_ELEMENT_ID];
    }
    // Set a unique ID on the directive type, so if something tries to inject the directive,
    // we can easily retrieve the ID and hash it into the bloom bit that should be checked.
    if (id == null) {
        id = type[NG_ELEMENT_ID] = nextNgElementId++;
    }
    // We only have BLOOM_SIZE (256) slots in our bloom filter (8 buckets * 32 bits each),
    // so all unique IDs must be modulo-ed into a number from 0 - 255 to fit into the filter.
    const bloomHash = id & BLOOM_MASK;
    // Create a mask that targets the specific bit associated with the directive.
    // JS bit operations are 32 bits, so this will be a number between 2^0 and 2^31, corresponding
    // to bit positions 0 - 31 in a 32 bit integer.
    const mask = 1 << bloomHash;
    // Each bloom bucket in `tData` represents `BLOOM_BUCKET_BITS` number of bits of `bloomHash`.
    // Any bits in `bloomHash` beyond `BLOOM_BUCKET_BITS` indicate the bucket offset that the mask
    // should be written to.
    tView.data[injectorIndex + (bloomHash >> BLOOM_BUCKET_BITS)] |= mask;
}
/**
 * Creates (or gets an existing) injector for a given element or container.
 *
 * @param tNode for which an injector should be retrieved / created.
 * @param lView View where the node is stored
 * @returns Node injector
 */
export function getOrCreateNodeInjectorForNode(tNode, lView) {
    const existingInjectorIndex = getInjectorIndex(tNode, lView);
    if (existingInjectorIndex !== -1) {
        return existingInjectorIndex;
    }
    const tView = lView[TVIEW];
    if (tView.firstCreatePass) {
        tNode.injectorIndex = lView.length;
        insertBloom(tView.data, tNode); // foundation for node bloom
        insertBloom(lView, null); // foundation for cumulative bloom
        insertBloom(tView.blueprint, null);
    }
    const parentLoc = getParentInjectorLocation(tNode, lView);
    const injectorIndex = tNode.injectorIndex;
    // If a parent injector can't be found, its location is set to -1.
    // In that case, we don't need to set up a cumulative bloom
    if (hasParentInjector(parentLoc)) {
        const parentIndex = getParentInjectorIndex(parentLoc);
        const parentLView = getParentInjectorView(parentLoc, lView);
        const parentData = parentLView[TVIEW].data;
        // Creates a cumulative bloom filter that merges the parent's bloom filter
        // and its own cumulative bloom (which contains tokens for all ancestors)
        for (let i = 0; i < 8 /* NodeInjectorOffset.BLOOM_SIZE */; i++) {
            lView[injectorIndex + i] = parentLView[parentIndex + i] | parentData[parentIndex + i];
        }
    }
    lView[injectorIndex + 8 /* NodeInjectorOffset.PARENT */] = parentLoc;
    return injectorIndex;
}
function insertBloom(arr, footer) {
    arr.push(0, 0, 0, 0, 0, 0, 0, 0, footer);
}
export function getInjectorIndex(tNode, lView) {
    if (tNode.injectorIndex === -1 ||
        // If the injector index is the same as its parent's injector index, then the index has been
        // copied down from the parent node. No injector has been created yet on this node.
        (tNode.parent && tNode.parent.injectorIndex === tNode.injectorIndex) ||
        // After the first template pass, the injector index might exist but the parent values
        // might not have been calculated yet for this instance
        lView[tNode.injectorIndex + 8 /* NodeInjectorOffset.PARENT */] === null) {
        return -1;
    }
    else {
        ngDevMode && assertIndexInRange(lView, tNode.injectorIndex);
        return tNode.injectorIndex;
    }
}
/**
 * Finds the index of the parent injector, with a view offset if applicable. Used to set the
 * parent injector initially.
 *
 * @returns Returns a number that is the combination of the number of LViews that we have to go up
 * to find the LView containing the parent inject AND the index of the injector within that LView.
 */
export function getParentInjectorLocation(tNode, lView) {
    if (tNode.parent && tNode.parent.injectorIndex !== -1) {
        // If we have a parent `TNode` and there is an injector associated with it we are done, because
        // the parent injector is within the current `LView`.
        return tNode.parent.injectorIndex; // ViewOffset is 0
    }
    // When parent injector location is computed it may be outside of the current view. (ie it could
    // be pointing to a declared parent location). This variable stores number of declaration parents
    // we need to walk up in order to find the parent injector location.
    let declarationViewOffset = 0;
    let parentTNode = null;
    let lViewCursor = lView;
    // The parent injector is not in the current `LView`. We will have to walk the declared parent
    // `LView` hierarchy and look for it. If we walk of the top, that means that there is no parent
    // `NodeInjector`.
    while (lViewCursor !== null) {
        parentTNode = getTNodeFromLView(lViewCursor);
        if (parentTNode === null) {
            // If we have no parent, than we are done.
            return NO_PARENT_INJECTOR;
        }
        ngDevMode && parentTNode && assertTNodeForLView(parentTNode, lViewCursor[DECLARATION_VIEW]);
        // Every iteration of the loop requires that we go to the declared parent.
        declarationViewOffset++;
        lViewCursor = lViewCursor[DECLARATION_VIEW];
        if (parentTNode.injectorIndex !== -1) {
            // We found a NodeInjector which points to something.
            return (parentTNode.injectorIndex |
                (declarationViewOffset << 16 /* RelativeInjectorLocationFlags.ViewOffsetShift */));
        }
    }
    return NO_PARENT_INJECTOR;
}
/**
 * Makes a type or an injection token public to the DI system by adding it to an
 * injector's bloom filter.
 *
 * @param di The node injector in which a directive will be added
 * @param token The type or the injection token to be made public
 */
export function diPublicInInjector(injectorIndex, tView, token) {
    bloomAdd(injectorIndex, tView, token);
}
/**
 * Inject static attribute value into directive constructor.
 *
 * This method is used with `factory` functions which are generated as part of
 * `defineDirective` or `defineComponent`. The method retrieves the static value
 * of an attribute. (Dynamic attributes are not supported since they are not resolved
 *  at the time of injection and can change over time.)
 *
 * # Example
 * Given:
 * ```
 * @Component(...)
 * class MyComponent {
 *   constructor(@Attribute('title') title: string) { ... }
 * }
 * ```
 * When instantiated with
 * ```
 * <my-component title="Hello"></my-component>
 * ```
 *
 * Then factory method generated is:
 * ```
 * MyComponent.ɵcmp = defineComponent({
 *   factory: () => new MyComponent(injectAttribute('title'))
 *   ...
 * })
 * ```
 *
 * @publicApi
 */
export function injectAttributeImpl(tNode, attrNameToInject) {
    ngDevMode && assertTNodeType(tNode, 12 /* TNodeType.AnyContainer */ | 3 /* TNodeType.AnyRNode */);
    ngDevMode && assertDefined(tNode, 'expecting tNode');
    if (attrNameToInject === 'class') {
        return tNode.classes;
    }
    if (attrNameToInject === 'style') {
        return tNode.styles;
    }
    const attrs = tNode.attrs;
    if (attrs) {
        const attrsLength = attrs.length;
        let i = 0;
        while (i < attrsLength) {
            const value = attrs[i];
            // If we hit a `Bindings` or `Template` marker then we are done.
            if (isNameOnlyAttributeMarker(value))
                break;
            // Skip namespaced attributes
            if (value === 0 /* AttributeMarker.NamespaceURI */) {
                // we skip the next two values
                // as namespaced attributes looks like
                // [..., AttributeMarker.NamespaceURI, 'http://someuri.com/test', 'test:exist',
                // 'existValue', ...]
                i = i + 2;
            }
            else if (typeof value === 'number') {
                // Skip to the first value of the marked attribute.
                i++;
                while (i < attrsLength && typeof attrs[i] === 'string') {
                    i++;
                }
            }
            else if (value === attrNameToInject) {
                return attrs[i + 1];
            }
            else {
                i = i + 2;
            }
        }
    }
    return null;
}
function notFoundValueOrThrow(notFoundValue, token, flags) {
    if ((flags & InjectFlags.Optional) || notFoundValue !== undefined) {
        return notFoundValue;
    }
    else {
        throwProviderNotFoundError(token, 'NodeInjector');
    }
}
/**
 * Returns the value associated to the given token from the ModuleInjector or throws exception
 *
 * @param lView The `LView` that contains the `tNode`
 * @param token The token to look for
 * @param flags Injection flags
 * @param notFoundValue The value to return when the injection flags is `InjectFlags.Optional`
 * @returns the value from the injector or throws an exception
 */
function lookupTokenUsingModuleInjector(lView, token, flags, notFoundValue) {
    if ((flags & InjectFlags.Optional) && notFoundValue === undefined) {
        // This must be set or the NullInjector will throw for optional deps
        notFoundValue = null;
    }
    if ((flags & (InjectFlags.Self | InjectFlags.Host)) === 0) {
        const moduleInjector = lView[INJECTOR];
        // switch to `injectInjectorOnly` implementation for module injector, since module injector
        // should not have access to Component/Directive DI scope (that may happen through
        // `directiveInject` implementation)
        const previousInjectImplementation = setInjectImplementation(undefined);
        try {
            if (moduleInjector) {
                return moduleInjector.get(token, notFoundValue, flags & InjectFlags.Optional);
            }
            else {
                return injectRootLimpMode(token, notFoundValue, flags & InjectFlags.Optional);
            }
        }
        finally {
            setInjectImplementation(previousInjectImplementation);
        }
    }
    return notFoundValueOrThrow(notFoundValue, token, flags);
}
/**
 * Returns the value associated to the given token from the NodeInjectors => ModuleInjector.
 *
 * Look for the injector providing the token by walking up the node injector tree and then
 * the module injector tree.
 *
 * This function patches `token` with `__NG_ELEMENT_ID__` which contains the id for the bloom
 * filter. `-1` is reserved for injecting `Injector` (implemented by `NodeInjector`)
 *
 * @param tNode The Node where the search for the injector should start
 * @param lView The `LView` that contains the `tNode`
 * @param token The token to look for
 * @param flags Injection flags
 * @param notFoundValue The value to return when the injection flags is `InjectFlags.Optional`
 * @returns the value from the injector, `null` when not found, or `notFoundValue` if provided
 */
export function getOrCreateInjectable(tNode, lView, token, flags = InjectFlags.Default, notFoundValue) {
    if (tNode !== null) {
        // If the view or any of its ancestors have an embedded
        // view injector, we have to look it up there first.
        if (lView[FLAGS] & 2048 /* LViewFlags.HasEmbeddedViewInjector */ &&
            // The token must be present on the current node injector when the `Self`
            // flag is set, so the lookup on embedded view injector(s) can be skipped.
            !(flags & InjectFlags.Self)) {
            const embeddedInjectorValue = lookupTokenUsingEmbeddedInjector(tNode, lView, token, flags, NOT_FOUND);
            if (embeddedInjectorValue !== NOT_FOUND) {
                return embeddedInjectorValue;
            }
        }
        // Otherwise try the node injector.
        const value = lookupTokenUsingNodeInjector(tNode, lView, token, flags, NOT_FOUND);
        if (value !== NOT_FOUND) {
            return value;
        }
    }
    // Finally, fall back to the module injector.
    return lookupTokenUsingModuleInjector(lView, token, flags, notFoundValue);
}
/**
 * Returns the value associated to the given token from the node injector.
 *
 * @param tNode The Node where the search for the injector should start
 * @param lView The `LView` that contains the `tNode`
 * @param token The token to look for
 * @param flags Injection flags
 * @param notFoundValue The value to return when the injection flags is `InjectFlags.Optional`
 * @returns the value from the injector, `null` when not found, or `notFoundValue` if provided
 */
function lookupTokenUsingNodeInjector(tNode, lView, token, flags, notFoundValue) {
    const bloomHash = bloomHashBitOrFactory(token);
    // If the ID stored here is a function, this is a special object like ElementRef or TemplateRef
    // so just call the factory function to create it.
    if (typeof bloomHash === 'function') {
        if (!enterDI(lView, tNode, flags)) {
            // Failed to enter DI, try module injector instead. If a token is injected with the @Host
            // flag, the module injector is not searched for that token in Ivy.
            return (flags & InjectFlags.Host) ?
                notFoundValueOrThrow(notFoundValue, token, flags) :
                lookupTokenUsingModuleInjector(lView, token, flags, notFoundValue);
        }
        try {
            let value;
            if (ngDevMode) {
                runInInjectorProfilerContext(new NodeInjector(getCurrentTNode(), getLView()), token, () => {
                    value = bloomHash(flags);
                    if (value != null) {
                        emitInstanceCreatedByInjectorEvent(value);
                    }
                });
            }
            else {
                value = bloomHash(flags);
            }
            if (value == null && !(flags & InjectFlags.Optional)) {
                throwProviderNotFoundError(token);
            }
            else {
                return value;
            }
        }
        finally {
            leaveDI();
        }
    }
    else if (typeof bloomHash === 'number') {
        // A reference to the previous injector TView that was found while climbing the element
        // injector tree. This is used to know if viewProviders can be accessed on the current
        // injector.
        let previousTView = null;
        let injectorIndex = getInjectorIndex(tNode, lView);
        let parentLocation = NO_PARENT_INJECTOR;
        let hostTElementNode = flags & InjectFlags.Host ? lView[DECLARATION_COMPONENT_VIEW][T_HOST] : null;
        // If we should skip this injector, or if there is no injector on this node, start by
        // searching the parent injector.
        if (injectorIndex === -1 || flags & InjectFlags.SkipSelf) {
            parentLocation = injectorIndex === -1 ? getParentInjectorLocation(tNode, lView) :
                lView[injectorIndex + 8 /* NodeInjectorOffset.PARENT */];
            if (parentLocation === NO_PARENT_INJECTOR || !shouldSearchParent(flags, false)) {
                injectorIndex = -1;
            }
            else {
                previousTView = lView[TVIEW];
                injectorIndex = getParentInjectorIndex(parentLocation);
                lView = getParentInjectorView(parentLocation, lView);
            }
        }
        // Traverse up the injector tree until we find a potential match or until we know there
        // *isn't* a match.
        while (injectorIndex !== -1) {
            ngDevMode && assertNodeInjector(lView, injectorIndex);
            // Check the current injector. If it matches, see if it contains token.
            const tView = lView[TVIEW];
            ngDevMode &&
                assertTNodeForLView(tView.data[injectorIndex + 8 /* NodeInjectorOffset.TNODE */], lView);
            if (bloomHasToken(bloomHash, injectorIndex, tView.data)) {
                // At this point, we have an injector which *may* contain the token, so we step through
                // the providers and directives associated with the injector's corresponding node to get
                // the instance.
                const instance = searchTokensOnInjector(injectorIndex, lView, token, previousTView, flags, hostTElementNode);
                if (instance !== NOT_FOUND) {
                    return instance;
                }
            }
            parentLocation = lView[injectorIndex + 8 /* NodeInjectorOffset.PARENT */];
            if (parentLocation !== NO_PARENT_INJECTOR &&
                shouldSearchParent(flags, lView[TVIEW].data[injectorIndex + 8 /* NodeInjectorOffset.TNODE */] === hostTElementNode) &&
                bloomHasToken(bloomHash, injectorIndex, lView)) {
                // The def wasn't found anywhere on this node, so it was a false positive.
                // Traverse up the tree and continue searching.
                previousTView = tView;
                injectorIndex = getParentInjectorIndex(parentLocation);
                lView = getParentInjectorView(parentLocation, lView);
            }
            else {
                // If we should not search parent OR If the ancestor bloom filter value does not have the
                // bit corresponding to the directive we can give up on traversing up to find the specific
                // injector.
                injectorIndex = -1;
            }
        }
    }
    return notFoundValue;
}
function searchTokensOnInjector(injectorIndex, lView, token, previousTView, flags, hostTElementNode) {
    const currentTView = lView[TVIEW];
    const tNode = currentTView.data[injectorIndex + 8 /* NodeInjectorOffset.TNODE */];
    // First, we need to determine if view providers can be accessed by the starting element.
    // There are two possibilities
    const canAccessViewProviders = previousTView == null ?
        // 1) This is the first invocation `previousTView == null` which means that we are at the
        // `TNode` of where injector is starting to look. In such a case the only time we are allowed
        // to look into the ViewProviders is if:
        // - we are on a component
        // - AND the injector set `includeViewProviders` to true (implying that the token can see
        // ViewProviders because it is the Component or a Service which itself was declared in
        // ViewProviders)
        (isComponentHost(tNode) && includeViewProviders) :
        // 2) `previousTView != null` which means that we are now walking across the parent nodes.
        // In such a case we are only allowed to look into the ViewProviders if:
        // - We just crossed from child View to Parent View `previousTView != currentTView`
        // - AND the parent TNode is an Element.
        // This means that we just came from the Component's View and therefore are allowed to see
        // into the ViewProviders.
        (previousTView != currentTView && ((tNode.type & 3 /* TNodeType.AnyRNode */) !== 0));
    // This special case happens when there is a @host on the inject and when we are searching
    // on the host element node.
    const isHostSpecialCase = (flags & InjectFlags.Host) && hostTElementNode === tNode;
    const injectableIdx = locateDirectiveOrProvider(tNode, currentTView, token, canAccessViewProviders, isHostSpecialCase);
    if (injectableIdx !== null) {
        return getNodeInjectable(lView, currentTView, injectableIdx, tNode);
    }
    else {
        return NOT_FOUND;
    }
}
/**
 * Searches for the given token among the node's directives and providers.
 *
 * @param tNode TNode on which directives are present.
 * @param tView The tView we are currently processing
 * @param token Provider token or type of a directive to look for.
 * @param canAccessViewProviders Whether view providers should be considered.
 * @param isHostSpecialCase Whether the host special case applies.
 * @returns Index of a found directive or provider, or null when none found.
 */
export function locateDirectiveOrProvider(tNode, tView, token, canAccessViewProviders, isHostSpecialCase) {
    const nodeProviderIndexes = tNode.providerIndexes;
    const tInjectables = tView.data;
    const injectablesStart = nodeProviderIndexes & 1048575 /* TNodeProviderIndexes.ProvidersStartIndexMask */;
    const directivesStart = tNode.directiveStart;
    const directiveEnd = tNode.directiveEnd;
    const cptViewProvidersCount = nodeProviderIndexes >> 20 /* TNodeProviderIndexes.CptViewProvidersCountShift */;
    const startingIndex = canAccessViewProviders ? injectablesStart : injectablesStart + cptViewProvidersCount;
    // When the host special case applies, only the viewProviders and the component are visible
    const endIndex = isHostSpecialCase ? injectablesStart + cptViewProvidersCount : directiveEnd;
    for (let i = startingIndex; i < endIndex; i++) {
        const providerTokenOrDef = tInjectables[i];
        if (i < directivesStart && token === providerTokenOrDef ||
            i >= directivesStart && providerTokenOrDef.type === token) {
            return i;
        }
    }
    if (isHostSpecialCase) {
        const dirDef = tInjectables[directivesStart];
        if (dirDef && isComponentDef(dirDef) && dirDef.type === token) {
            return directivesStart;
        }
    }
    return null;
}
/**
 * Retrieve or instantiate the injectable from the `LView` at particular `index`.
 *
 * This function checks to see if the value has already been instantiated and if so returns the
 * cached `injectable`. Otherwise if it detects that the value is still a factory it
 * instantiates the `injectable` and caches the value.
 */
export function getNodeInjectable(lView, tView, index, tNode) {
    let value = lView[index];
    const tData = tView.data;
    if (isFactory(value)) {
        const factory = value;
        if (factory.resolving) {
            throwCyclicDependencyError(stringifyForError(tData[index]));
        }
        const previousIncludeViewProviders = setIncludeViewProviders(factory.canSeeViewProviders);
        factory.resolving = true;
        let prevInjectContext;
        if (ngDevMode) {
            // tData indexes mirror the concrete instances in its corresponding LView.
            // lView[index] here is either the injectable instace itself or a factory,
            // therefore tData[index] is the constructor of that injectable or a
            // definition object that contains the constructor in a `.type` field.
            const token = tData[index].type || tData[index];
            const injector = new NodeInjector(tNode, lView);
            prevInjectContext = setInjectorProfilerContext({ injector, token });
        }
        const previousInjectImplementation = factory.injectImpl ? setInjectImplementation(factory.injectImpl) : null;
        const success = enterDI(lView, tNode, InjectFlags.Default);
        ngDevMode &&
            assertEqual(success, true, 'Because flags do not contain \`SkipSelf\' we expect this to always succeed.');
        try {
            value = lView[index] = factory.factory(undefined, tData, lView, tNode);
            ngDevMode && emitInstanceCreatedByInjectorEvent(value);
            // This code path is hit for both directives and providers.
            // For perf reasons, we want to avoid searching for hooks on providers.
            // It does no harm to try (the hooks just won't exist), but the extra
            // checks are unnecessary and this is a hot path. So we check to see
            // if the index of the dependency is in the directive range for this
            // tNode. If it's not, we know it's a provider and skip hook registration.
            if (tView.firstCreatePass && index >= tNode.directiveStart) {
                ngDevMode && assertDirectiveDef(tData[index]);
                registerPreOrderHooks(index, tData[index], tView);
            }
        }
        finally {
            ngDevMode && setInjectorProfilerContext(prevInjectContext);
            previousInjectImplementation !== null &&
                setInjectImplementation(previousInjectImplementation);
            setIncludeViewProviders(previousIncludeViewProviders);
            factory.resolving = false;
            leaveDI();
        }
    }
    return value;
}
/**
 * Returns the bit in an injector's bloom filter that should be used to determine whether or not
 * the directive might be provided by the injector.
 *
 * When a directive is public, it is added to the bloom filter and given a unique ID that can be
 * retrieved on the Type. When the directive isn't public or the token is not a directive `null`
 * is returned as the node injector can not possibly provide that token.
 *
 * @param token the injection token
 * @returns the matching bit to check in the bloom filter or `null` if the token is not known.
 *   When the returned value is negative then it represents special values such as `Injector`.
 */
export function bloomHashBitOrFactory(token) {
    ngDevMode && assertDefined(token, 'token must be defined');
    if (typeof token === 'string') {
        return token.charCodeAt(0) || 0;
    }
    const tokenId = 
    // First check with `hasOwnProperty` so we don't get an inherited ID.
    token.hasOwnProperty(NG_ELEMENT_ID) ? token[NG_ELEMENT_ID] : undefined;
    // Negative token IDs are used for special objects such as `Injector`
    if (typeof tokenId === 'number') {
        if (tokenId >= 0) {
            return tokenId & BLOOM_MASK;
        }
        else {
            ngDevMode &&
                assertEqual(tokenId, -1 /* InjectorMarkers.Injector */, 'Expecting to get Special Injector Id');
            return createNodeInjector;
        }
    }
    else {
        return tokenId;
    }
}
export function bloomHasToken(bloomHash, injectorIndex, injectorView) {
    // Create a mask that targets the specific bit associated with the directive we're looking for.
    // JS bit operations are 32 bits, so this will be a number between 2^0 and 2^31, corresponding
    // to bit positions 0 - 31 in a 32 bit integer.
    const mask = 1 << bloomHash;
    // Each bloom bucket in `injectorView` represents `BLOOM_BUCKET_BITS` number of bits of
    // `bloomHash`. Any bits in `bloomHash` beyond `BLOOM_BUCKET_BITS` indicate the bucket offset
    // that should be used.
    const value = injectorView[injectorIndex + (bloomHash >> BLOOM_BUCKET_BITS)];
    // If the bloom filter value has the bit corresponding to the directive's bloomBit flipped on,
    // this injector is a potential match.
    return !!(value & mask);
}
/** Returns true if flags prevent parent injector from being searched for tokens */
function shouldSearchParent(flags, isFirstHostTNode) {
    return !(flags & InjectFlags.Self) && !(flags & InjectFlags.Host && isFirstHostTNode);
}
export function getNodeInjectorLView(nodeInjector) {
    return nodeInjector._lView;
}
export function getNodeInjectorTNode(nodeInjector) {
    return nodeInjector._tNode;
}
export class NodeInjector {
    constructor(_tNode, _lView) {
        this._tNode = _tNode;
        this._lView = _lView;
    }
    get(token, notFoundValue, flags) {
        return getOrCreateInjectable(this._tNode, this._lView, token, convertToBitFlags(flags), notFoundValue);
    }
}
/** Creates a `NodeInjector` for the current node. */
export function createNodeInjector() {
    return new NodeInjector(getCurrentTNode(), getLView());
}
/**
 * @codeGenApi
 */
export function ɵɵgetInheritedFactory(type) {
    return noSideEffects(() => {
        const ownConstructor = type.prototype.constructor;
        const ownFactory = ownConstructor[NG_FACTORY_DEF] || getFactoryOf(ownConstructor);
        const objectPrototype = Object.prototype;
        let parent = Object.getPrototypeOf(type.prototype).constructor;
        // Go up the prototype until we hit `Object`.
        while (parent && parent !== objectPrototype) {
            const factory = parent[NG_FACTORY_DEF] || getFactoryOf(parent);
            // If we hit something that has a factory and the factory isn't the same as the type,
            // we've found the inherited factory. Note the check that the factory isn't the type's
            // own factory is redundant in most cases, but if the user has custom decorators on the
            // class, this lookup will start one level down in the prototype chain, causing us to
            // find the own factory first and potentially triggering an infinite loop downstream.
            if (factory && factory !== ownFactory) {
                return factory;
            }
            parent = Object.getPrototypeOf(parent);
        }
        // There is no factory defined. Either this was improper usage of inheritance
        // (no Angular decorator on the superclass) or there is no constructor at all
        // in the inheritance chain. Since the two cases cannot be distinguished, the
        // latter has to be assumed.
        return (t) => new t();
    });
}
function getFactoryOf(type) {
    if (isForwardRef(type)) {
        return () => {
            const factory = getFactoryOf(resolveForwardRef(type));
            return factory && factory();
        };
    }
    return getFactoryDef(type);
}
/**
 * Returns a value from the closest embedded or node injector.
 *
 * @param tNode The Node where the search for the injector should start
 * @param lView The `LView` that contains the `tNode`
 * @param token The token to look for
 * @param flags Injection flags
 * @param notFoundValue The value to return when the injection flags is `InjectFlags.Optional`
 * @returns the value from the injector, `null` when not found, or `notFoundValue` if provided
 */
function lookupTokenUsingEmbeddedInjector(tNode, lView, token, flags, notFoundValue) {
    let currentTNode = tNode;
    let currentLView = lView;
    // When an LView with an embedded view injector is inserted, it'll likely be interlaced with
    // nodes who may have injectors (e.g. node injector -> embedded view injector -> node injector).
    // Since the bloom filters for the node injectors have already been constructed and we don't
    // have a way of extracting the records from an injector, the only way to maintain the correct
    // hierarchy when resolving the value is to walk it node-by-node while attempting to resolve
    // the token at each level.
    while (currentTNode !== null && currentLView !== null &&
        (currentLView[FLAGS] & 2048 /* LViewFlags.HasEmbeddedViewInjector */) &&
        !(currentLView[FLAGS] & 512 /* LViewFlags.IsRoot */)) {
        ngDevMode && assertTNodeForLView(currentTNode, currentLView);
        // Note that this lookup on the node injector is using the `Self` flag, because
        // we don't want the node injector to look at any parent injectors since we
        // may hit the embedded view injector first.
        const nodeInjectorValue = lookupTokenUsingNodeInjector(currentTNode, currentLView, token, flags | InjectFlags.Self, NOT_FOUND);
        if (nodeInjectorValue !== NOT_FOUND) {
            return nodeInjectorValue;
        }
        // Has an explicit type due to a TS bug: https://github.com/microsoft/TypeScript/issues/33191
        let parentTNode = currentTNode.parent;
        // `TNode.parent` includes the parent within the current view only. If it doesn't exist,
        // it means that we've hit the view boundary and we need to go up to the next view.
        if (!parentTNode) {
            // Before we go to the next LView, check if the token exists on the current embedded injector.
            const embeddedViewInjector = currentLView[EMBEDDED_VIEW_INJECTOR];
            if (embeddedViewInjector) {
                const embeddedViewInjectorValue = embeddedViewInjector.get(token, NOT_FOUND, flags);
                if (embeddedViewInjectorValue !== NOT_FOUND) {
                    return embeddedViewInjectorValue;
                }
            }
            // Otherwise keep going up the tree.
            parentTNode = getTNodeFromLView(currentLView);
            currentLView = currentLView[DECLARATION_VIEW];
        }
        currentTNode = parentTNode;
    }
    return notFoundValue;
}
/** Gets the TNode associated with an LView inside of the declaration view. */
function getTNodeFromLView(lView) {
    const tView = lView[TVIEW];
    const tViewType = tView.type;
    // The parent pointer differs based on `TView.type`.
    if (tViewType === 2 /* TViewType.Embedded */) {
        ngDevMode && assertDefined(tView.declTNode, 'Embedded TNodes should have declaration parents.');
        return tView.declTNode;
    }
    else if (tViewType === 1 /* TViewType.Component */) {
        // Components don't have `TView.declTNode` because each instance of component could be
        // inserted in different location, hence `TView.declTNode` is meaningless.
        return lView[T_HOST];
    }
    return null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2RpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRSxPQUFPLEVBQUMsa0JBQWtCLEVBQUUsdUJBQXVCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUVoRixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUUvRCxPQUFPLEVBQUMsV0FBVyxFQUFnQixNQUFNLDBCQUEwQixDQUFDO0FBR3BFLE9BQU8sRUFBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTlDLE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUNyRixPQUFPLEVBQUMsa0NBQWtDLEVBQTJCLDRCQUE0QixFQUFFLDBCQUEwQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDaEssT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBQywwQkFBMEIsRUFBRSwwQkFBMEIsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUNuRixPQUFPLEVBQUMsYUFBYSxFQUFFLGNBQWMsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUN2RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFHOUMsT0FBTyxFQUFDLFNBQVMsRUFBRSxrQkFBa0IsRUFBbUcsTUFBTSx1QkFBdUIsQ0FBQztBQUV0SyxPQUFPLEVBQUMsY0FBYyxFQUFFLGVBQWUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3pFLE9BQU8sRUFBQywwQkFBMEIsRUFBRSxnQkFBZ0IsRUFBRSxzQkFBc0IsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFxQixNQUFNLEVBQVMsS0FBSyxFQUFtQixNQUFNLG1CQUFtQixDQUFDO0FBQ25MLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUMsT0FBTyxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUNwRSxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUM3RCxPQUFPLEVBQUMsc0JBQXNCLEVBQUUscUJBQXFCLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUl6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQ0c7QUFDSCxJQUFJLG9CQUFvQixHQUFHLElBQUksQ0FBQztBQUVoQyxNQUFNLFVBQVUsdUJBQXVCLENBQUMsQ0FBVTtJQUNoRCxNQUFNLFFBQVEsR0FBRyxvQkFBb0IsQ0FBQztJQUN0QyxvQkFBb0IsR0FBRyxDQUFDLENBQUM7SUFDekIsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUM7QUFDdkIsTUFBTSxVQUFVLEdBQUcsVUFBVSxHQUFHLENBQUMsQ0FBQztBQUVsQzs7OztHQUlHO0FBQ0gsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLENBQUM7QUFFNUIsMERBQTBEO0FBQzFELElBQUksZUFBZSxHQUFHLENBQUMsQ0FBQztBQUV4Qiw2REFBNkQ7QUFDN0QsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBRXJCOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLFVBQVUsUUFBUSxDQUNwQixhQUFxQixFQUFFLEtBQVksRUFBRSxJQUErQjtJQUN0RSxTQUFTLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsSUFBSSxFQUFFLHFDQUFxQyxDQUFDLENBQUM7SUFDN0YsSUFBSSxFQUFvQixDQUFDO0lBQ3pCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFLENBQUM7UUFDN0IsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7U0FBTSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQztRQUM5QyxFQUFFLEdBQUksSUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCx3RkFBd0Y7SUFDeEYsdUZBQXVGO0lBQ3ZGLElBQUksRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ2YsRUFBRSxHQUFJLElBQVksQ0FBQyxhQUFhLENBQUMsR0FBRyxlQUFlLEVBQUUsQ0FBQztJQUN4RCxDQUFDO0lBRUQsc0ZBQXNGO0lBQ3RGLHlGQUF5RjtJQUN6RixNQUFNLFNBQVMsR0FBRyxFQUFFLEdBQUcsVUFBVSxDQUFDO0lBRWxDLDZFQUE2RTtJQUM3RSw4RkFBOEY7SUFDOUYsK0NBQStDO0lBQy9DLE1BQU0sSUFBSSxHQUFHLENBQUMsSUFBSSxTQUFTLENBQUM7SUFFNUIsNkZBQTZGO0lBQzdGLDhGQUE4RjtJQUM5Rix3QkFBd0I7SUFDdkIsS0FBSyxDQUFDLElBQWlCLENBQUMsYUFBYSxHQUFHLENBQUMsU0FBUyxJQUFJLGlCQUFpQixDQUFDLENBQUMsSUFBSSxJQUFJLENBQUM7QUFDckYsQ0FBQztBQUVEOzs7Ozs7R0FNRztBQUNILE1BQU0sVUFBVSw4QkFBOEIsQ0FDMUMsS0FBd0QsRUFBRSxLQUFZO0lBQ3hFLE1BQU0scUJBQXFCLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdELElBQUkscUJBQXFCLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNqQyxPQUFPLHFCQUFxQixDQUFDO0lBQy9CLENBQUM7SUFFRCxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsSUFBSSxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDMUIsS0FBSyxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ25DLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUUsNEJBQTRCO1FBQzdELFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBUSxrQ0FBa0M7UUFDbkUsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELE1BQU0sU0FBUyxHQUFHLHlCQUF5QixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMxRCxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDO0lBRTFDLGtFQUFrRTtJQUNsRSwyREFBMkQ7SUFDM0QsSUFBSSxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO1FBQ2pDLE1BQU0sV0FBVyxHQUFHLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RELE1BQU0sV0FBVyxHQUFHLHFCQUFxQixDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM1RCxNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBVyxDQUFDO1FBQ2xELDBFQUEwRTtRQUMxRSx5RUFBeUU7UUFDekUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyx3Q0FBZ0MsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3ZELEtBQUssQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3hGLENBQUM7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLGFBQWEsb0NBQTRCLENBQUMsR0FBRyxTQUFTLENBQUM7SUFDN0QsT0FBTyxhQUFhLENBQUM7QUFDdkIsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLEdBQVUsRUFBRSxNQUFrQjtJQUNqRCxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDM0MsQ0FBQztBQUdELE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxLQUFZLEVBQUUsS0FBWTtJQUN6RCxJQUFJLEtBQUssQ0FBQyxhQUFhLEtBQUssQ0FBQyxDQUFDO1FBQzFCLDRGQUE0RjtRQUM1RixtRkFBbUY7UUFDbkYsQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsYUFBYSxLQUFLLEtBQUssQ0FBQyxhQUFhLENBQUM7UUFDcEUsc0ZBQXNGO1FBQ3RGLHVEQUF1RDtRQUN2RCxLQUFLLENBQUMsS0FBSyxDQUFDLGFBQWEsb0NBQTRCLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUNwRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ1osQ0FBQztTQUFNLENBQUM7UUFDTixTQUFTLElBQUksa0JBQWtCLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM1RCxPQUFPLEtBQUssQ0FBQyxhQUFhLENBQUM7SUFDN0IsQ0FBQztBQUNILENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUseUJBQXlCLENBQUMsS0FBWSxFQUFFLEtBQVk7SUFDbEUsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsYUFBYSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDdEQsK0ZBQStGO1FBQy9GLHFEQUFxRDtRQUNyRCxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsYUFBeUMsQ0FBQyxDQUFFLGtCQUFrQjtJQUNwRixDQUFDO0lBRUQsZ0dBQWdHO0lBQ2hHLGlHQUFpRztJQUNqRyxvRUFBb0U7SUFDcEUsSUFBSSxxQkFBcUIsR0FBRyxDQUFDLENBQUM7SUFDOUIsSUFBSSxXQUFXLEdBQWUsSUFBSSxDQUFDO0lBQ25DLElBQUksV0FBVyxHQUFlLEtBQUssQ0FBQztJQUVwQyw4RkFBOEY7SUFDOUYsK0ZBQStGO0lBQy9GLGtCQUFrQjtJQUNsQixPQUFPLFdBQVcsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUM1QixXQUFXLEdBQUcsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFN0MsSUFBSSxXQUFXLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDekIsMENBQTBDO1lBQzFDLE9BQU8sa0JBQWtCLENBQUM7UUFDNUIsQ0FBQztRQUVELFNBQVMsSUFBSSxXQUFXLElBQUksbUJBQW1CLENBQUMsV0FBWSxFQUFFLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBRSxDQUFDLENBQUM7UUFDOUYsMEVBQTBFO1FBQzFFLHFCQUFxQixFQUFFLENBQUM7UUFDeEIsV0FBVyxHQUFHLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRTVDLElBQUksV0FBVyxDQUFDLGFBQWEsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3JDLHFEQUFxRDtZQUNyRCxPQUFPLENBQUMsV0FBVyxDQUFDLGFBQWE7Z0JBQ3pCLENBQUMscUJBQXFCLDBEQUFpRCxDQUFDLENBQ3BELENBQUM7UUFDL0IsQ0FBQztJQUNILENBQUM7SUFDRCxPQUFPLGtCQUFrQixDQUFDO0FBQzVCLENBQUM7QUFDRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsa0JBQWtCLENBQzlCLGFBQXFCLEVBQUUsS0FBWSxFQUFFLEtBQXlCO0lBQ2hFLFFBQVEsQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3hDLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBQ0gsTUFBTSxVQUFVLG1CQUFtQixDQUFDLEtBQVksRUFBRSxnQkFBd0I7SUFDeEUsU0FBUyxJQUFJLGVBQWUsQ0FBQyxLQUFLLEVBQUUsNERBQTJDLENBQUMsQ0FBQztJQUNqRixTQUFTLElBQUksYUFBYSxDQUFDLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3JELElBQUksZ0JBQWdCLEtBQUssT0FBTyxFQUFFLENBQUM7UUFDakMsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxJQUFJLGdCQUFnQixLQUFLLE9BQU8sRUFBRSxDQUFDO1FBQ2pDLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUN0QixDQUFDO0lBRUQsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztJQUMxQixJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ1YsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixPQUFPLENBQUMsR0FBRyxXQUFXLEVBQUUsQ0FBQztZQUN2QixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFdkIsZ0VBQWdFO1lBQ2hFLElBQUkseUJBQXlCLENBQUMsS0FBSyxDQUFDO2dCQUFFLE1BQU07WUFFNUMsNkJBQTZCO1lBQzdCLElBQUksS0FBSyx5Q0FBaUMsRUFBRSxDQUFDO2dCQUMzQyw4QkFBOEI7Z0JBQzlCLHNDQUFzQztnQkFDdEMsK0VBQStFO2dCQUMvRSxxQkFBcUI7Z0JBQ3JCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ1osQ0FBQztpQkFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRSxDQUFDO2dCQUNyQyxtREFBbUQ7Z0JBQ25ELENBQUMsRUFBRSxDQUFDO2dCQUNKLE9BQU8sQ0FBQyxHQUFHLFdBQVcsSUFBSSxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUUsQ0FBQztvQkFDdkQsQ0FBQyxFQUFFLENBQUM7Z0JBQ04sQ0FBQztZQUNILENBQUM7aUJBQU0sSUFBSSxLQUFLLEtBQUssZ0JBQWdCLEVBQUUsQ0FBQztnQkFDdEMsT0FBTyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBVyxDQUFDO1lBQ2hDLENBQUM7aUJBQU0sQ0FBQztnQkFDTixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNaLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUdELFNBQVMsb0JBQW9CLENBQ3pCLGFBQXFCLEVBQUUsS0FBdUIsRUFBRSxLQUFrQjtJQUNwRSxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxhQUFhLEtBQUssU0FBUyxFQUFFLENBQUM7UUFDbEUsT0FBTyxhQUFhLENBQUM7SUFDdkIsQ0FBQztTQUFNLENBQUM7UUFDTiwwQkFBMEIsQ0FBQyxLQUFLLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDcEQsQ0FBQztBQUNILENBQUM7QUFFRDs7Ozs7Ozs7R0FRRztBQUNILFNBQVMsOEJBQThCLENBQ25DLEtBQVksRUFBRSxLQUF1QixFQUFFLEtBQWtCLEVBQUUsYUFBbUI7SUFDaEYsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksYUFBYSxLQUFLLFNBQVMsRUFBRSxDQUFDO1FBQ2xFLG9FQUFvRTtRQUNwRSxhQUFhLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUMxRCxNQUFNLGNBQWMsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkMsMkZBQTJGO1FBQzNGLGtGQUFrRjtRQUNsRixvQ0FBb0M7UUFDcEMsTUFBTSw0QkFBNEIsR0FBRyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUM7WUFDSCxJQUFJLGNBQWMsRUFBRSxDQUFDO2dCQUNuQixPQUFPLGNBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRSxLQUFLLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hGLENBQUM7aUJBQU0sQ0FBQztnQkFDTixPQUFPLGtCQUFrQixDQUFDLEtBQUssRUFBRSxhQUFhLEVBQUUsS0FBSyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRixDQUFDO1FBQ0gsQ0FBQztnQkFBUyxDQUFDO1lBQ1QsdUJBQXVCLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUN4RCxDQUFDO0lBQ0gsQ0FBQztJQUNELE9BQU8sb0JBQW9CLENBQUksYUFBYSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM5RCxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBTSxVQUFVLHFCQUFxQixDQUNqQyxLQUE4QixFQUFFLEtBQVksRUFBRSxLQUF1QixFQUNyRSxRQUFxQixXQUFXLENBQUMsT0FBTyxFQUFFLGFBQW1CO0lBQy9ELElBQUksS0FBSyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ25CLHVEQUF1RDtRQUN2RCxvREFBb0Q7UUFDcEQsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLGdEQUFxQztZQUNqRCx5RUFBeUU7WUFDekUsMEVBQTBFO1lBQzFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDaEMsTUFBTSxxQkFBcUIsR0FDdkIsZ0NBQWdDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQzVFLElBQUkscUJBQXFCLEtBQUssU0FBUyxFQUFFLENBQUM7Z0JBQ3hDLE9BQU8scUJBQXFCLENBQUM7WUFDL0IsQ0FBQztRQUNILENBQUM7UUFFRCxtQ0FBbUM7UUFDbkMsTUFBTSxLQUFLLEdBQUcsNEJBQTRCLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2xGLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ3hCLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztJQUNILENBQUM7SUFFRCw2Q0FBNkM7SUFDN0MsT0FBTyw4QkFBOEIsQ0FBSSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztBQUMvRSxDQUFDO0FBRUQ7Ozs7Ozs7OztHQVNHO0FBQ0gsU0FBUyw0QkFBNEIsQ0FDakMsS0FBeUIsRUFBRSxLQUFZLEVBQUUsS0FBdUIsRUFBRSxLQUFrQixFQUNwRixhQUFtQjtJQUNyQixNQUFNLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQywrRkFBK0Y7SUFDL0Ysa0RBQWtEO0lBQ2xELElBQUksT0FBTyxTQUFTLEtBQUssVUFBVSxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDbEMseUZBQXlGO1lBQ3pGLG1FQUFtRTtZQUNuRSxPQUFPLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixvQkFBb0IsQ0FBSSxhQUFhLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3RELDhCQUE4QixDQUFJLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQzVFLENBQUM7UUFDRCxJQUFJLENBQUM7WUFDSCxJQUFJLEtBQWMsQ0FBQztZQUVuQixJQUFJLFNBQVMsRUFBRSxDQUFDO2dCQUNkLDRCQUE0QixDQUN4QixJQUFJLFlBQVksQ0FBQyxlQUFlLEVBQWtCLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxLQUFnQixFQUNqRixHQUFHLEVBQUU7b0JBQ0gsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFFekIsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFLENBQUM7d0JBQ2xCLGtDQUFrQyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUM1QyxDQUFDO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ1QsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0IsQ0FBQztZQUVELElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO2dCQUNyRCwwQkFBMEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQyxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sT0FBTyxLQUFLLENBQUM7WUFDZixDQUFDO1FBQ0gsQ0FBQztnQkFBUyxDQUFDO1lBQ1QsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDO0lBQ0gsQ0FBQztTQUFNLElBQUksT0FBTyxTQUFTLEtBQUssUUFBUSxFQUFFLENBQUM7UUFDekMsdUZBQXVGO1FBQ3ZGLHNGQUFzRjtRQUN0RixZQUFZO1FBQ1osSUFBSSxhQUFhLEdBQWUsSUFBSSxDQUFDO1FBQ3JDLElBQUksYUFBYSxHQUFHLGdCQUFnQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNuRCxJQUFJLGNBQWMsR0FBRyxrQkFBa0IsQ0FBQztRQUN4QyxJQUFJLGdCQUFnQixHQUNoQixLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUVoRixxRkFBcUY7UUFDckYsaUNBQWlDO1FBQ2pDLElBQUksYUFBYSxLQUFLLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDekQsY0FBYyxHQUFHLGFBQWEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMseUJBQXlCLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLEtBQUssQ0FBQyxhQUFhLG9DQUE0QixDQUFDLENBQUM7WUFFekYsSUFBSSxjQUFjLEtBQUssa0JBQWtCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQztnQkFDL0UsYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLENBQUM7aUJBQU0sQ0FBQztnQkFDTixhQUFhLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM3QixhQUFhLEdBQUcsc0JBQXNCLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ3ZELEtBQUssR0FBRyxxQkFBcUIsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdkQsQ0FBQztRQUNILENBQUM7UUFFRCx1RkFBdUY7UUFDdkYsbUJBQW1CO1FBQ25CLE9BQU8sYUFBYSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDNUIsU0FBUyxJQUFJLGtCQUFrQixDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztZQUV0RCx1RUFBdUU7WUFDdkUsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNCLFNBQVM7Z0JBQ0wsbUJBQW1CLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLG1DQUEyQixDQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDOUYsSUFBSSxhQUFhLENBQUMsU0FBUyxFQUFFLGFBQWEsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDeEQsdUZBQXVGO2dCQUN2Rix3RkFBd0Y7Z0JBQ3hGLGdCQUFnQjtnQkFDaEIsTUFBTSxRQUFRLEdBQWMsc0JBQXNCLENBQzlDLGFBQWEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztnQkFDekUsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFLENBQUM7b0JBQzNCLE9BQU8sUUFBUSxDQUFDO2dCQUNsQixDQUFDO1lBQ0gsQ0FBQztZQUNELGNBQWMsR0FBRyxLQUFLLENBQUMsYUFBYSxvQ0FBNEIsQ0FBQyxDQUFDO1lBQ2xFLElBQUksY0FBYyxLQUFLLGtCQUFrQjtnQkFDckMsa0JBQWtCLENBQ2QsS0FBSyxFQUNMLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxtQ0FBMkIsQ0FBQyxLQUFLLGdCQUFnQixDQUFDO2dCQUNyRixhQUFhLENBQUMsU0FBUyxFQUFFLGFBQWEsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUNuRCwwRUFBMEU7Z0JBQzFFLCtDQUErQztnQkFDL0MsYUFBYSxHQUFHLEtBQUssQ0FBQztnQkFDdEIsYUFBYSxHQUFHLHNCQUFzQixDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUN2RCxLQUFLLEdBQUcscUJBQXFCLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3ZELENBQUM7aUJBQU0sQ0FBQztnQkFDTix5RkFBeUY7Z0JBQ3pGLDBGQUEwRjtnQkFDMUYsWUFBWTtnQkFDWixhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDckIsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRUQsT0FBTyxhQUFhLENBQUM7QUFDdkIsQ0FBQztBQUVELFNBQVMsc0JBQXNCLENBQzNCLGFBQXFCLEVBQUUsS0FBWSxFQUFFLEtBQXVCLEVBQUUsYUFBeUIsRUFDdkYsS0FBa0IsRUFBRSxnQkFBNEI7SUFDbEQsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLE1BQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxtQ0FBMkIsQ0FBVSxDQUFDO0lBQ25GLHlGQUF5RjtJQUN6Riw4QkFBOEI7SUFDOUIsTUFBTSxzQkFBc0IsR0FBRyxhQUFhLElBQUksSUFBSSxDQUFDLENBQUM7UUFDbEQseUZBQXlGO1FBQ3pGLDZGQUE2RjtRQUM3Rix3Q0FBd0M7UUFDeEMsMEJBQTBCO1FBQzFCLHlGQUF5RjtRQUN6RixzRkFBc0Y7UUFDdEYsaUJBQWlCO1FBQ2pCLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLG9CQUFvQixDQUFDLENBQUMsQ0FBQztRQUNsRCwwRkFBMEY7UUFDMUYsd0VBQXdFO1FBQ3hFLG1GQUFtRjtRQUNuRix3Q0FBd0M7UUFDeEMsMEZBQTBGO1FBQzFGLDBCQUEwQjtRQUMxQixDQUFDLGFBQWEsSUFBSSxZQUFZLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLDZCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVqRiwwRkFBMEY7SUFDMUYsNEJBQTRCO0lBQzVCLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLGdCQUFnQixLQUFLLEtBQUssQ0FBQztJQUVuRixNQUFNLGFBQWEsR0FBRyx5QkFBeUIsQ0FDM0MsS0FBSyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsc0JBQXNCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUMzRSxJQUFJLGFBQWEsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUMzQixPQUFPLGlCQUFpQixDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLEtBQXFCLENBQUMsQ0FBQztJQUN0RixDQUFDO1NBQU0sQ0FBQztRQUNOLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7QUFDSCxDQUFDO0FBRUQ7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBTSxVQUFVLHlCQUF5QixDQUNyQyxLQUFZLEVBQUUsS0FBWSxFQUFFLEtBQThCLEVBQUUsc0JBQStCLEVBQzNGLGlCQUFpQztJQUNuQyxNQUFNLG1CQUFtQixHQUFHLEtBQUssQ0FBQyxlQUFlLENBQUM7SUFDbEQsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztJQUVoQyxNQUFNLGdCQUFnQixHQUFHLG1CQUFtQiw2REFBK0MsQ0FBQztJQUM1RixNQUFNLGVBQWUsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDO0lBQzdDLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUM7SUFDeEMsTUFBTSxxQkFBcUIsR0FDdkIsbUJBQW1CLDREQUFtRCxDQUFDO0lBQzNFLE1BQU0sYUFBYSxHQUNmLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLEdBQUcscUJBQXFCLENBQUM7SUFDekYsMkZBQTJGO0lBQzNGLE1BQU0sUUFBUSxHQUFHLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsR0FBRyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO0lBQzdGLEtBQUssSUFBSSxDQUFDLEdBQUcsYUFBYSxFQUFFLENBQUMsR0FBRyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUM5QyxNQUFNLGtCQUFrQixHQUFHLFlBQVksQ0FBQyxDQUFDLENBQWtELENBQUM7UUFDNUYsSUFBSSxDQUFDLEdBQUcsZUFBZSxJQUFJLEtBQUssS0FBSyxrQkFBa0I7WUFDbkQsQ0FBQyxJQUFJLGVBQWUsSUFBSyxrQkFBd0MsQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFLENBQUM7WUFDckYsT0FBTyxDQUFDLENBQUM7UUFDWCxDQUFDO0lBQ0gsQ0FBQztJQUNELElBQUksaUJBQWlCLEVBQUUsQ0FBQztRQUN0QixNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsZUFBZSxDQUFzQixDQUFDO1FBQ2xFLElBQUksTUFBTSxJQUFJLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRSxDQUFDO1lBQzlELE9BQU8sZUFBZSxDQUFDO1FBQ3pCLENBQUM7SUFDSCxDQUFDO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsTUFBTSxVQUFVLGlCQUFpQixDQUM3QixLQUFZLEVBQUUsS0FBWSxFQUFFLEtBQWEsRUFBRSxLQUF5QjtJQUN0RSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekIsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztJQUN6QixJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQ3JCLE1BQU0sT0FBTyxHQUF3QixLQUFLLENBQUM7UUFDM0MsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDdEIsMEJBQTBCLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5RCxDQUFDO1FBQ0QsTUFBTSw0QkFBNEIsR0FBRyx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUMxRixPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUV6QixJQUFJLGlCQUFvRCxDQUFDO1FBQ3pELElBQUksU0FBUyxFQUFFLENBQUM7WUFDZCwwRUFBMEU7WUFDMUUsMEVBQTBFO1lBQzFFLG9FQUFvRTtZQUNwRSxzRUFBc0U7WUFDdEUsTUFBTSxLQUFLLEdBQ04sS0FBSyxDQUFDLEtBQUssQ0FBb0QsQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFGLE1BQU0sUUFBUSxHQUFHLElBQUksWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNoRCxpQkFBaUIsR0FBRywwQkFBMEIsQ0FBQyxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBQ3BFLENBQUM7UUFFRCxNQUFNLDRCQUE0QixHQUM5QixPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUM1RSxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0QsU0FBUztZQUNMLFdBQVcsQ0FDUCxPQUFPLEVBQUUsSUFBSSxFQUNiLDZFQUE2RSxDQUFDLENBQUM7UUFDdkYsSUFBSSxDQUFDO1lBQ0gsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRXZFLFNBQVMsSUFBSSxrQ0FBa0MsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUV2RCwyREFBMkQ7WUFDM0QsdUVBQXVFO1lBQ3ZFLHFFQUFxRTtZQUNyRSxvRUFBb0U7WUFDcEUsb0VBQW9FO1lBQ3BFLDBFQUEwRTtZQUMxRSxJQUFJLEtBQUssQ0FBQyxlQUFlLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDM0QsU0FBUyxJQUFJLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUM5QyxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBc0IsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN6RSxDQUFDO1FBQ0gsQ0FBQztnQkFBUyxDQUFDO1lBQ1QsU0FBUyxJQUFJLDBCQUEwQixDQUFDLGlCQUFrQixDQUFDLENBQUM7WUFFNUQsNEJBQTRCLEtBQUssSUFBSTtnQkFDakMsdUJBQXVCLENBQUMsNEJBQTRCLENBQUMsQ0FBQztZQUMxRCx1QkFBdUIsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1lBQ3RELE9BQU8sQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQzFCLE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQztJQUNILENBQUM7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxLQUFnQztJQUNwRSxTQUFTLElBQUksYUFBYSxDQUFDLEtBQUssRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO0lBQzNELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFLENBQUM7UUFDOUIsT0FBTyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBQ0QsTUFBTSxPQUFPO0lBQ1QscUVBQXFFO0lBQ3JFLEtBQUssQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFFLEtBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3BGLHFFQUFxRTtJQUNyRSxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRSxDQUFDO1FBQ2hDLElBQUksT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2pCLE9BQU8sT0FBTyxHQUFHLFVBQVUsQ0FBQztRQUM5QixDQUFDO2FBQU0sQ0FBQztZQUNOLFNBQVM7Z0JBQ0wsV0FBVyxDQUFDLE9BQU8scUNBQTRCLHNDQUFzQyxDQUFDLENBQUM7WUFDM0YsT0FBTyxrQkFBa0IsQ0FBQztRQUM1QixDQUFDO0lBQ0gsQ0FBQztTQUFNLENBQUM7UUFDTixPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSxhQUFhLENBQUMsU0FBaUIsRUFBRSxhQUFxQixFQUFFLFlBQXlCO0lBQy9GLCtGQUErRjtJQUMvRiw4RkFBOEY7SUFDOUYsK0NBQStDO0lBQy9DLE1BQU0sSUFBSSxHQUFHLENBQUMsSUFBSSxTQUFTLENBQUM7SUFFNUIsdUZBQXVGO0lBQ3ZGLDZGQUE2RjtJQUM3Rix1QkFBdUI7SUFDdkIsTUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLGFBQWEsR0FBRyxDQUFDLFNBQVMsSUFBSSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFFN0UsOEZBQThGO0lBQzlGLHNDQUFzQztJQUN0QyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBRUQsbUZBQW1GO0FBQ25GLFNBQVMsa0JBQWtCLENBQUMsS0FBa0IsRUFBRSxnQkFBeUI7SUFDdkUsT0FBTyxDQUFDLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxJQUFJLElBQUksZ0JBQWdCLENBQUMsQ0FBQztBQUN4RixDQUFDO0FBRUQsTUFBTSxVQUFVLG9CQUFvQixDQUFDLFlBQTBCO0lBQzdELE9BQVEsWUFBb0IsQ0FBQyxNQUFlLENBQUM7QUFDL0MsQ0FBQztBQUVELE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxZQUEwQjtJQUU3RCxPQUFRLFlBQW9CLENBQUMsTUFDckIsQ0FBQztBQUNYLENBQUM7QUFFRCxNQUFNLE9BQU8sWUFBWTtJQUN2QixZQUNZLE1BQThELEVBQzlELE1BQWE7UUFEYixXQUFNLEdBQU4sTUFBTSxDQUF3RDtRQUM5RCxXQUFNLEdBQU4sTUFBTSxDQUFPO0lBQUcsQ0FBQztJQUU3QixHQUFHLENBQUMsS0FBVSxFQUFFLGFBQW1CLEVBQUUsS0FBaUM7UUFDcEUsT0FBTyxxQkFBcUIsQ0FDeEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUNoRixDQUFDO0NBQ0Y7QUFFRCxxREFBcUQ7QUFDckQsTUFBTSxVQUFVLGtCQUFrQjtJQUNoQyxPQUFPLElBQUksWUFBWSxDQUFDLGVBQWUsRUFBeUIsRUFBRSxRQUFRLEVBQUUsQ0FBUSxDQUFDO0FBQ3ZGLENBQUM7QUFFRDs7R0FFRztBQUNILE1BQU0sVUFBVSxxQkFBcUIsQ0FBSSxJQUFlO0lBQ3RELE9BQU8sYUFBYSxDQUFDLEdBQUcsRUFBRTtRQUN4QixNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztRQUNsRCxNQUFNLFVBQVUsR0FBRyxjQUFjLENBQUMsY0FBYyxDQUFDLElBQUksWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2xGLE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDekMsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDO1FBRS9ELDZDQUE2QztRQUM3QyxPQUFPLE1BQU0sSUFBSSxNQUFNLEtBQUssZUFBZSxFQUFFLENBQUM7WUFDNUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUUvRCxxRkFBcUY7WUFDckYsc0ZBQXNGO1lBQ3RGLHVGQUF1RjtZQUN2RixxRkFBcUY7WUFDckYscUZBQXFGO1lBQ3JGLElBQUksT0FBTyxJQUFJLE9BQU8sS0FBSyxVQUFVLEVBQUUsQ0FBQztnQkFDdEMsT0FBTyxPQUFPLENBQUM7WUFDakIsQ0FBQztZQUVELE1BQU0sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLENBQUM7UUFFRCw2RUFBNkU7UUFDN0UsNkVBQTZFO1FBQzdFLDZFQUE2RTtRQUM3RSw0QkFBNEI7UUFDNUIsT0FBTyxDQUFDLENBQVUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBSSxJQUFlO0lBQ3RDLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDdkIsT0FBTyxHQUFHLEVBQUU7WUFDVixNQUFNLE9BQU8sR0FBRyxZQUFZLENBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN6RCxPQUFPLE9BQU8sSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUM5QixDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0QsT0FBTyxhQUFhLENBQUksSUFBSSxDQUFDLENBQUM7QUFDaEMsQ0FBQztBQUVEOzs7Ozs7Ozs7R0FTRztBQUNILFNBQVMsZ0NBQWdDLENBQ3JDLEtBQXlCLEVBQUUsS0FBWSxFQUFFLEtBQXVCLEVBQUUsS0FBa0IsRUFDcEYsYUFBbUI7SUFDckIsSUFBSSxZQUFZLEdBQTRCLEtBQUssQ0FBQztJQUNsRCxJQUFJLFlBQVksR0FBZSxLQUFLLENBQUM7SUFFckMsNEZBQTRGO0lBQzVGLGdHQUFnRztJQUNoRyw0RkFBNEY7SUFDNUYsOEZBQThGO0lBQzlGLDRGQUE0RjtJQUM1RiwyQkFBMkI7SUFDM0IsT0FBTyxZQUFZLEtBQUssSUFBSSxJQUFJLFlBQVksS0FBSyxJQUFJO1FBQzlDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxnREFBcUMsQ0FBQztRQUMxRCxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyw4QkFBb0IsQ0FBQyxFQUFFLENBQUM7UUFDbEQsU0FBUyxJQUFJLG1CQUFtQixDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUU3RCwrRUFBK0U7UUFDL0UsMkVBQTJFO1FBQzNFLDRDQUE0QztRQUM1QyxNQUFNLGlCQUFpQixHQUFHLDRCQUE0QixDQUNsRCxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM1RSxJQUFJLGlCQUFpQixLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ3BDLE9BQU8saUJBQWlCLENBQUM7UUFDM0IsQ0FBQztRQUVELDZGQUE2RjtRQUM3RixJQUFJLFdBQVcsR0FBcUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztRQUV4RSx3RkFBd0Y7UUFDeEYsbUZBQW1GO1FBQ25GLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNqQiw4RkFBOEY7WUFDOUYsTUFBTSxvQkFBb0IsR0FBRyxZQUFZLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUNsRSxJQUFJLG9CQUFvQixFQUFFLENBQUM7Z0JBQ3pCLE1BQU0seUJBQXlCLEdBQzNCLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsU0FBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDaEUsSUFBSSx5QkFBeUIsS0FBSyxTQUFTLEVBQUUsQ0FBQztvQkFDNUMsT0FBTyx5QkFBeUIsQ0FBQztnQkFDbkMsQ0FBQztZQUNILENBQUM7WUFFRCxvQ0FBb0M7WUFDcEMsV0FBVyxHQUFHLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzlDLFlBQVksR0FBRyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNoRCxDQUFDO1FBRUQsWUFBWSxHQUFHLFdBQVcsQ0FBQztJQUM3QixDQUFDO0lBRUQsT0FBTyxhQUFhLENBQUM7QUFDdkIsQ0FBQztBQUVELDhFQUE4RTtBQUM5RSxTQUFTLGlCQUFpQixDQUFDLEtBQVk7SUFDckMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFFN0Isb0RBQW9EO0lBQ3BELElBQUksU0FBUywrQkFBdUIsRUFBRSxDQUFDO1FBQ3JDLFNBQVMsSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxrREFBa0QsQ0FBQyxDQUFDO1FBQ2hHLE9BQU8sS0FBSyxDQUFDLFNBQWtDLENBQUM7SUFDbEQsQ0FBQztTQUFNLElBQUksU0FBUyxnQ0FBd0IsRUFBRSxDQUFDO1FBQzdDLHNGQUFzRjtRQUN0RiwwRUFBMEU7UUFDMUUsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFpQixDQUFDO0lBQ3ZDLENBQUM7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtpc0ZvcndhcmRSZWYsIHJlc29sdmVGb3J3YXJkUmVmfSBmcm9tICcuLi9kaS9mb3J3YXJkX3JlZic7XG5pbXBvcnQge2luamVjdFJvb3RMaW1wTW9kZSwgc2V0SW5qZWN0SW1wbGVtZW50YXRpb259IGZyb20gJy4uL2RpL2luamVjdF9zd2l0Y2gnO1xuaW1wb3J0IHtJbmplY3Rvcn0gZnJvbSAnLi4vZGkvaW5qZWN0b3InO1xuaW1wb3J0IHtjb252ZXJ0VG9CaXRGbGFnc30gZnJvbSAnLi4vZGkvaW5qZWN0b3JfY29tcGF0aWJpbGl0eSc7XG5pbXBvcnQge0luamVjdG9yTWFya2Vyc30gZnJvbSAnLi4vZGkvaW5qZWN0b3JfbWFya2VyJztcbmltcG9ydCB7SW5qZWN0RmxhZ3MsIEluamVjdE9wdGlvbnN9IGZyb20gJy4uL2RpL2ludGVyZmFjZS9pbmplY3Rvcic7XG5pbXBvcnQge1Byb3ZpZGVyVG9rZW59IGZyb20gJy4uL2RpL3Byb3ZpZGVyX3Rva2VuJztcbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3R5cGUnO1xuaW1wb3J0IHthc3NlcnREZWZpbmVkLCBhc3NlcnRFcXVhbCwgYXNzZXJ0SW5kZXhJblJhbmdlfSBmcm9tICcuLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQge25vU2lkZUVmZmVjdHN9IGZyb20gJy4uL3V0aWwvY2xvc3VyZSc7XG5cbmltcG9ydCB7YXNzZXJ0RGlyZWN0aXZlRGVmLCBhc3NlcnROb2RlSW5qZWN0b3IsIGFzc2VydFROb2RlRm9yTFZpZXd9IGZyb20gJy4vYXNzZXJ0JztcbmltcG9ydCB7ZW1pdEluc3RhbmNlQ3JlYXRlZEJ5SW5qZWN0b3JFdmVudCwgSW5qZWN0b3JQcm9maWxlckNvbnRleHQsIHJ1bkluSW5qZWN0b3JQcm9maWxlckNvbnRleHQsIHNldEluamVjdG9yUHJvZmlsZXJDb250ZXh0fSBmcm9tICcuL2RlYnVnL2luamVjdG9yX3Byb2ZpbGVyJztcbmltcG9ydCB7Z2V0RmFjdG9yeURlZn0gZnJvbSAnLi9kZWZpbml0aW9uX2ZhY3RvcnknO1xuaW1wb3J0IHt0aHJvd0N5Y2xpY0RlcGVuZGVuY3lFcnJvciwgdGhyb3dQcm92aWRlck5vdEZvdW5kRXJyb3J9IGZyb20gJy4vZXJyb3JzX2RpJztcbmltcG9ydCB7TkdfRUxFTUVOVF9JRCwgTkdfRkFDVE9SWV9ERUZ9IGZyb20gJy4vZmllbGRzJztcbmltcG9ydCB7cmVnaXN0ZXJQcmVPcmRlckhvb2tzfSBmcm9tICcuL2hvb2tzJztcbmltcG9ydCB7IEF0dHJpYnV0ZU1hcmtlciB9IGZyb20gJy4vaW50ZXJmYWNlcy9hdHRyaWJ1dGVfbWFya2VyJztcbmltcG9ydCB7Q29tcG9uZW50RGVmLCBEaXJlY3RpdmVEZWZ9IGZyb20gJy4vaW50ZXJmYWNlcy9kZWZpbml0aW9uJztcbmltcG9ydCB7aXNGYWN0b3J5LCBOT19QQVJFTlRfSU5KRUNUT1IsIE5vZGVJbmplY3RvckZhY3RvcnksIE5vZGVJbmplY3Rvck9mZnNldCwgUmVsYXRpdmVJbmplY3RvckxvY2F0aW9uLCBSZWxhdGl2ZUluamVjdG9yTG9jYXRpb25GbGFnc30gZnJvbSAnLi9pbnRlcmZhY2VzL2luamVjdG9yJztcbmltcG9ydCB7VENvbnRhaW5lck5vZGUsIFREaXJlY3RpdmVIb3N0Tm9kZSwgVEVsZW1lbnRDb250YWluZXJOb2RlLCBURWxlbWVudE5vZGUsIFROb2RlLCBUTm9kZVByb3ZpZGVySW5kZXhlcywgVE5vZGVUeXBlfSBmcm9tICcuL2ludGVyZmFjZXMvbm9kZSc7XG5pbXBvcnQge2lzQ29tcG9uZW50RGVmLCBpc0NvbXBvbmVudEhvc3R9IGZyb20gJy4vaW50ZXJmYWNlcy90eXBlX2NoZWNrcyc7XG5pbXBvcnQge0RFQ0xBUkFUSU9OX0NPTVBPTkVOVF9WSUVXLCBERUNMQVJBVElPTl9WSUVXLCBFTUJFRERFRF9WSUVXX0lOSkVDVE9SLCBGTEFHUywgSU5KRUNUT1IsIExWaWV3LCBMVmlld0ZsYWdzLCBUX0hPU1QsIFREYXRhLCBUVklFVywgVFZpZXcsIFRWaWV3VHlwZX0gZnJvbSAnLi9pbnRlcmZhY2VzL3ZpZXcnO1xuaW1wb3J0IHthc3NlcnRUTm9kZVR5cGV9IGZyb20gJy4vbm9kZV9hc3NlcnQnO1xuaW1wb3J0IHtlbnRlckRJLCBnZXRDdXJyZW50VE5vZGUsIGdldExWaWV3LCBsZWF2ZURJfSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7aXNOYW1lT25seUF0dHJpYnV0ZU1hcmtlcn0gZnJvbSAnLi91dGlsL2F0dHJzX3V0aWxzJztcbmltcG9ydCB7Z2V0UGFyZW50SW5qZWN0b3JJbmRleCwgZ2V0UGFyZW50SW5qZWN0b3JWaWV3LCBoYXNQYXJlbnRJbmplY3Rvcn0gZnJvbSAnLi91dGlsL2luamVjdG9yX3V0aWxzJztcbmltcG9ydCB7c3RyaW5naWZ5Rm9yRXJyb3J9IGZyb20gJy4vdXRpbC9zdHJpbmdpZnlfdXRpbHMnO1xuXG5cblxuLyoqXG4gKiBEZWZpbmVzIGlmIHRoZSBjYWxsIHRvIGBpbmplY3RgIHNob3VsZCBpbmNsdWRlIGB2aWV3UHJvdmlkZXJzYCBpbiBpdHMgcmVzb2x1dGlvbi5cbiAqXG4gKiBUaGlzIGlzIHNldCB0byB0cnVlIHdoZW4gd2UgdHJ5IHRvIGluc3RhbnRpYXRlIGEgY29tcG9uZW50LiBUaGlzIHZhbHVlIGlzIHJlc2V0IGluXG4gKiBgZ2V0Tm9kZUluamVjdGFibGVgIHRvIGEgdmFsdWUgd2hpY2ggbWF0Y2hlcyB0aGUgZGVjbGFyYXRpb24gbG9jYXRpb24gb2YgdGhlIHRva2VuIGFib3V0IHRvIGJlXG4gKiBpbnN0YW50aWF0ZWQuIFRoaXMgaXMgZG9uZSBzbyB0aGF0IGlmIHdlIGFyZSBpbmplY3RpbmcgYSB0b2tlbiB3aGljaCB3YXMgZGVjbGFyZWQgb3V0c2lkZSBvZlxuICogYHZpZXdQcm92aWRlcnNgIHdlIGRvbid0IGFjY2lkZW50YWxseSBwdWxsIGB2aWV3UHJvdmlkZXJzYCBpbi5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYFxuICogQEluamVjdGFibGUoKVxuICogY2xhc3MgTXlTZXJ2aWNlIHtcbiAqICAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBTdHJpbmcpIHt9XG4gKiB9XG4gKlxuICogQENvbXBvbmVudCh7XG4gKiAgIHByb3ZpZGVyczogW1xuICogICAgIE15U2VydmljZSxcbiAqICAgICB7cHJvdmlkZTogU3RyaW5nLCB2YWx1ZTogJ3Byb3ZpZGVycycgfVxuICogICBdXG4gKiAgIHZpZXdQcm92aWRlcnM6IFtcbiAqICAgICB7cHJvdmlkZTogU3RyaW5nLCB2YWx1ZTogJ3ZpZXdQcm92aWRlcnMnfVxuICogICBdXG4gKiB9KVxuICogY2xhc3MgTXlDb21wb25lbnQge1xuICogICBjb25zdHJ1Y3RvcihteVNlcnZpY2U6IE15U2VydmljZSwgdmFsdWU6IFN0cmluZykge1xuICogICAgIC8vIFdlIGV4cGVjdCB0aGF0IENvbXBvbmVudCBjYW4gc2VlIGludG8gYHZpZXdQcm92aWRlcnNgLlxuICogICAgIGV4cGVjdCh2YWx1ZSkudG9FcXVhbCgndmlld1Byb3ZpZGVycycpO1xuICogICAgIC8vIGBNeVNlcnZpY2VgIHdhcyBub3QgZGVjbGFyZWQgaW4gYHZpZXdQcm92aWRlcnNgIGhlbmNlIGl0IGNhbid0IHNlZSBpdC5cbiAqICAgICBleHBlY3QobXlTZXJ2aWNlLnZhbHVlKS50b0VxdWFsKCdwcm92aWRlcnMnKTtcbiAqICAgfVxuICogfVxuICpcbiAqIGBgYFxuICovXG5sZXQgaW5jbHVkZVZpZXdQcm92aWRlcnMgPSB0cnVlO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0SW5jbHVkZVZpZXdQcm92aWRlcnModjogYm9vbGVhbik6IGJvb2xlYW4ge1xuICBjb25zdCBvbGRWYWx1ZSA9IGluY2x1ZGVWaWV3UHJvdmlkZXJzO1xuICBpbmNsdWRlVmlld1Byb3ZpZGVycyA9IHY7XG4gIHJldHVybiBvbGRWYWx1ZTtcbn1cblxuLyoqXG4gKiBUaGUgbnVtYmVyIG9mIHNsb3RzIGluIGVhY2ggYmxvb20gZmlsdGVyICh1c2VkIGJ5IERJKS4gVGhlIGxhcmdlciB0aGlzIG51bWJlciwgdGhlIGZld2VyXG4gKiBkaXJlY3RpdmVzIHRoYXQgd2lsbCBzaGFyZSBzbG90cywgYW5kIHRodXMsIHRoZSBmZXdlciBmYWxzZSBwb3NpdGl2ZXMgd2hlbiBjaGVja2luZyBmb3JcbiAqIHRoZSBleGlzdGVuY2Ugb2YgYSBkaXJlY3RpdmUuXG4gKi9cbmNvbnN0IEJMT09NX1NJWkUgPSAyNTY7XG5jb25zdCBCTE9PTV9NQVNLID0gQkxPT01fU0laRSAtIDE7XG5cbi8qKlxuICogVGhlIG51bWJlciBvZiBiaXRzIHRoYXQgaXMgcmVwcmVzZW50ZWQgYnkgYSBzaW5nbGUgYmxvb20gYnVja2V0LiBKUyBiaXQgb3BlcmF0aW9ucyBhcmUgMzIgYml0cyxcbiAqIHNvIGVhY2ggYnVja2V0IHJlcHJlc2VudHMgMzIgZGlzdGluY3QgdG9rZW5zIHdoaWNoIGFjY291bnRzIGZvciBsb2cyKDMyKSA9IDUgYml0cyBvZiBhIGJsb29tIGhhc2hcbiAqIG51bWJlci5cbiAqL1xuY29uc3QgQkxPT01fQlVDS0VUX0JJVFMgPSA1O1xuXG4vKiogQ291bnRlciB1c2VkIHRvIGdlbmVyYXRlIHVuaXF1ZSBJRHMgZm9yIGRpcmVjdGl2ZXMuICovXG5sZXQgbmV4dE5nRWxlbWVudElkID0gMDtcblxuLyoqIFZhbHVlIHVzZWQgd2hlbiBzb21ldGhpbmcgd2Fzbid0IGZvdW5kIGJ5IGFuIGluamVjdG9yLiAqL1xuY29uc3QgTk9UX0ZPVU5EID0ge307XG5cbi8qKlxuICogUmVnaXN0ZXJzIHRoaXMgZGlyZWN0aXZlIGFzIHByZXNlbnQgaW4gaXRzIG5vZGUncyBpbmplY3RvciBieSBmbGlwcGluZyB0aGUgZGlyZWN0aXZlJ3NcbiAqIGNvcnJlc3BvbmRpbmcgYml0IGluIHRoZSBpbmplY3RvcidzIGJsb29tIGZpbHRlci5cbiAqXG4gKiBAcGFyYW0gaW5qZWN0b3JJbmRleCBUaGUgaW5kZXggb2YgdGhlIG5vZGUgaW5qZWN0b3Igd2hlcmUgdGhpcyB0b2tlbiBzaG91bGQgYmUgcmVnaXN0ZXJlZFxuICogQHBhcmFtIHRWaWV3IFRoZSBUVmlldyBmb3IgdGhlIGluamVjdG9yJ3MgYmxvb20gZmlsdGVyc1xuICogQHBhcmFtIHR5cGUgVGhlIGRpcmVjdGl2ZSB0b2tlbiB0byByZWdpc3RlclxuICovXG5leHBvcnQgZnVuY3Rpb24gYmxvb21BZGQoXG4gICAgaW5qZWN0b3JJbmRleDogbnVtYmVyLCB0VmlldzogVFZpZXcsIHR5cGU6IFByb3ZpZGVyVG9rZW48YW55PnxzdHJpbmcpOiB2b2lkIHtcbiAgbmdEZXZNb2RlICYmIGFzc2VydEVxdWFsKHRWaWV3LmZpcnN0Q3JlYXRlUGFzcywgdHJ1ZSwgJ2V4cGVjdGVkIGZpcnN0Q3JlYXRlUGFzcyB0byBiZSB0cnVlJyk7XG4gIGxldCBpZDogbnVtYmVyfHVuZGVmaW5lZDtcbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgIGlkID0gdHlwZS5jaGFyQ29kZUF0KDApIHx8IDA7XG4gIH0gZWxzZSBpZiAodHlwZS5oYXNPd25Qcm9wZXJ0eShOR19FTEVNRU5UX0lEKSkge1xuICAgIGlkID0gKHR5cGUgYXMgYW55KVtOR19FTEVNRU5UX0lEXTtcbiAgfVxuXG4gIC8vIFNldCBhIHVuaXF1ZSBJRCBvbiB0aGUgZGlyZWN0aXZlIHR5cGUsIHNvIGlmIHNvbWV0aGluZyB0cmllcyB0byBpbmplY3QgdGhlIGRpcmVjdGl2ZSxcbiAgLy8gd2UgY2FuIGVhc2lseSByZXRyaWV2ZSB0aGUgSUQgYW5kIGhhc2ggaXQgaW50byB0aGUgYmxvb20gYml0IHRoYXQgc2hvdWxkIGJlIGNoZWNrZWQuXG4gIGlmIChpZCA9PSBudWxsKSB7XG4gICAgaWQgPSAodHlwZSBhcyBhbnkpW05HX0VMRU1FTlRfSURdID0gbmV4dE5nRWxlbWVudElkKys7XG4gIH1cblxuICAvLyBXZSBvbmx5IGhhdmUgQkxPT01fU0laRSAoMjU2KSBzbG90cyBpbiBvdXIgYmxvb20gZmlsdGVyICg4IGJ1Y2tldHMgKiAzMiBiaXRzIGVhY2gpLFxuICAvLyBzbyBhbGwgdW5pcXVlIElEcyBtdXN0IGJlIG1vZHVsby1lZCBpbnRvIGEgbnVtYmVyIGZyb20gMCAtIDI1NSB0byBmaXQgaW50byB0aGUgZmlsdGVyLlxuICBjb25zdCBibG9vbUhhc2ggPSBpZCAmIEJMT09NX01BU0s7XG5cbiAgLy8gQ3JlYXRlIGEgbWFzayB0aGF0IHRhcmdldHMgdGhlIHNwZWNpZmljIGJpdCBhc3NvY2lhdGVkIHdpdGggdGhlIGRpcmVjdGl2ZS5cbiAgLy8gSlMgYml0IG9wZXJhdGlvbnMgYXJlIDMyIGJpdHMsIHNvIHRoaXMgd2lsbCBiZSBhIG51bWJlciBiZXR3ZWVuIDJeMCBhbmQgMl4zMSwgY29ycmVzcG9uZGluZ1xuICAvLyB0byBiaXQgcG9zaXRpb25zIDAgLSAzMSBpbiBhIDMyIGJpdCBpbnRlZ2VyLlxuICBjb25zdCBtYXNrID0gMSA8PCBibG9vbUhhc2g7XG5cbiAgLy8gRWFjaCBibG9vbSBidWNrZXQgaW4gYHREYXRhYCByZXByZXNlbnRzIGBCTE9PTV9CVUNLRVRfQklUU2AgbnVtYmVyIG9mIGJpdHMgb2YgYGJsb29tSGFzaGAuXG4gIC8vIEFueSBiaXRzIGluIGBibG9vbUhhc2hgIGJleW9uZCBgQkxPT01fQlVDS0VUX0JJVFNgIGluZGljYXRlIHRoZSBidWNrZXQgb2Zmc2V0IHRoYXQgdGhlIG1hc2tcbiAgLy8gc2hvdWxkIGJlIHdyaXR0ZW4gdG8uXG4gICh0Vmlldy5kYXRhIGFzIG51bWJlcltdKVtpbmplY3RvckluZGV4ICsgKGJsb29tSGFzaCA+PiBCTE9PTV9CVUNLRVRfQklUUyldIHw9IG1hc2s7XG59XG5cbi8qKlxuICogQ3JlYXRlcyAob3IgZ2V0cyBhbiBleGlzdGluZykgaW5qZWN0b3IgZm9yIGEgZ2l2ZW4gZWxlbWVudCBvciBjb250YWluZXIuXG4gKlxuICogQHBhcmFtIHROb2RlIGZvciB3aGljaCBhbiBpbmplY3RvciBzaG91bGQgYmUgcmV0cmlldmVkIC8gY3JlYXRlZC5cbiAqIEBwYXJhbSBsVmlldyBWaWV3IHdoZXJlIHRoZSBub2RlIGlzIHN0b3JlZFxuICogQHJldHVybnMgTm9kZSBpbmplY3RvclxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0T3JDcmVhdGVOb2RlSW5qZWN0b3JGb3JOb2RlKFxuICAgIHROb2RlOiBURWxlbWVudE5vZGV8VENvbnRhaW5lck5vZGV8VEVsZW1lbnRDb250YWluZXJOb2RlLCBsVmlldzogTFZpZXcpOiBudW1iZXIge1xuICBjb25zdCBleGlzdGluZ0luamVjdG9ySW5kZXggPSBnZXRJbmplY3RvckluZGV4KHROb2RlLCBsVmlldyk7XG4gIGlmIChleGlzdGluZ0luamVjdG9ySW5kZXggIT09IC0xKSB7XG4gICAgcmV0dXJuIGV4aXN0aW5nSW5qZWN0b3JJbmRleDtcbiAgfVxuXG4gIGNvbnN0IHRWaWV3ID0gbFZpZXdbVFZJRVddO1xuICBpZiAodFZpZXcuZmlyc3RDcmVhdGVQYXNzKSB7XG4gICAgdE5vZGUuaW5qZWN0b3JJbmRleCA9IGxWaWV3Lmxlbmd0aDtcbiAgICBpbnNlcnRCbG9vbSh0Vmlldy5kYXRhLCB0Tm9kZSk7ICAvLyBmb3VuZGF0aW9uIGZvciBub2RlIGJsb29tXG4gICAgaW5zZXJ0Qmxvb20obFZpZXcsIG51bGwpOyAgICAgICAgLy8gZm91bmRhdGlvbiBmb3IgY3VtdWxhdGl2ZSBibG9vbVxuICAgIGluc2VydEJsb29tKHRWaWV3LmJsdWVwcmludCwgbnVsbCk7XG4gIH1cblxuICBjb25zdCBwYXJlbnRMb2MgPSBnZXRQYXJlbnRJbmplY3RvckxvY2F0aW9uKHROb2RlLCBsVmlldyk7XG4gIGNvbnN0IGluamVjdG9ySW5kZXggPSB0Tm9kZS5pbmplY3RvckluZGV4O1xuXG4gIC8vIElmIGEgcGFyZW50IGluamVjdG9yIGNhbid0IGJlIGZvdW5kLCBpdHMgbG9jYXRpb24gaXMgc2V0IHRvIC0xLlxuICAvLyBJbiB0aGF0IGNhc2UsIHdlIGRvbid0IG5lZWQgdG8gc2V0IHVwIGEgY3VtdWxhdGl2ZSBibG9vbVxuICBpZiAoaGFzUGFyZW50SW5qZWN0b3IocGFyZW50TG9jKSkge1xuICAgIGNvbnN0IHBhcmVudEluZGV4ID0gZ2V0UGFyZW50SW5qZWN0b3JJbmRleChwYXJlbnRMb2MpO1xuICAgIGNvbnN0IHBhcmVudExWaWV3ID0gZ2V0UGFyZW50SW5qZWN0b3JWaWV3KHBhcmVudExvYywgbFZpZXcpO1xuICAgIGNvbnN0IHBhcmVudERhdGEgPSBwYXJlbnRMVmlld1tUVklFV10uZGF0YSBhcyBhbnk7XG4gICAgLy8gQ3JlYXRlcyBhIGN1bXVsYXRpdmUgYmxvb20gZmlsdGVyIHRoYXQgbWVyZ2VzIHRoZSBwYXJlbnQncyBibG9vbSBmaWx0ZXJcbiAgICAvLyBhbmQgaXRzIG93biBjdW11bGF0aXZlIGJsb29tICh3aGljaCBjb250YWlucyB0b2tlbnMgZm9yIGFsbCBhbmNlc3RvcnMpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOb2RlSW5qZWN0b3JPZmZzZXQuQkxPT01fU0laRTsgaSsrKSB7XG4gICAgICBsVmlld1tpbmplY3RvckluZGV4ICsgaV0gPSBwYXJlbnRMVmlld1twYXJlbnRJbmRleCArIGldIHwgcGFyZW50RGF0YVtwYXJlbnRJbmRleCArIGldO1xuICAgIH1cbiAgfVxuXG4gIGxWaWV3W2luamVjdG9ySW5kZXggKyBOb2RlSW5qZWN0b3JPZmZzZXQuUEFSRU5UXSA9IHBhcmVudExvYztcbiAgcmV0dXJuIGluamVjdG9ySW5kZXg7XG59XG5cbmZ1bmN0aW9uIGluc2VydEJsb29tKGFycjogYW55W10sIGZvb3RlcjogVE5vZGV8bnVsbCk6IHZvaWQge1xuICBhcnIucHVzaCgwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCBmb290ZXIpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbmplY3RvckluZGV4KHROb2RlOiBUTm9kZSwgbFZpZXc6IExWaWV3KTogbnVtYmVyIHtcbiAgaWYgKHROb2RlLmluamVjdG9ySW5kZXggPT09IC0xIHx8XG4gICAgICAvLyBJZiB0aGUgaW5qZWN0b3IgaW5kZXggaXMgdGhlIHNhbWUgYXMgaXRzIHBhcmVudCdzIGluamVjdG9yIGluZGV4LCB0aGVuIHRoZSBpbmRleCBoYXMgYmVlblxuICAgICAgLy8gY29waWVkIGRvd24gZnJvbSB0aGUgcGFyZW50IG5vZGUuIE5vIGluamVjdG9yIGhhcyBiZWVuIGNyZWF0ZWQgeWV0IG9uIHRoaXMgbm9kZS5cbiAgICAgICh0Tm9kZS5wYXJlbnQgJiYgdE5vZGUucGFyZW50LmluamVjdG9ySW5kZXggPT09IHROb2RlLmluamVjdG9ySW5kZXgpIHx8XG4gICAgICAvLyBBZnRlciB0aGUgZmlyc3QgdGVtcGxhdGUgcGFzcywgdGhlIGluamVjdG9yIGluZGV4IG1pZ2h0IGV4aXN0IGJ1dCB0aGUgcGFyZW50IHZhbHVlc1xuICAgICAgLy8gbWlnaHQgbm90IGhhdmUgYmVlbiBjYWxjdWxhdGVkIHlldCBmb3IgdGhpcyBpbnN0YW5jZVxuICAgICAgbFZpZXdbdE5vZGUuaW5qZWN0b3JJbmRleCArIE5vZGVJbmplY3Rvck9mZnNldC5QQVJFTlRdID09PSBudWxsKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9IGVsc2Uge1xuICAgIG5nRGV2TW9kZSAmJiBhc3NlcnRJbmRleEluUmFuZ2UobFZpZXcsIHROb2RlLmluamVjdG9ySW5kZXgpO1xuICAgIHJldHVybiB0Tm9kZS5pbmplY3RvckluZGV4O1xuICB9XG59XG5cbi8qKlxuICogRmluZHMgdGhlIGluZGV4IG9mIHRoZSBwYXJlbnQgaW5qZWN0b3IsIHdpdGggYSB2aWV3IG9mZnNldCBpZiBhcHBsaWNhYmxlLiBVc2VkIHRvIHNldCB0aGVcbiAqIHBhcmVudCBpbmplY3RvciBpbml0aWFsbHkuXG4gKlxuICogQHJldHVybnMgUmV0dXJucyBhIG51bWJlciB0aGF0IGlzIHRoZSBjb21iaW5hdGlvbiBvZiB0aGUgbnVtYmVyIG9mIExWaWV3cyB0aGF0IHdlIGhhdmUgdG8gZ28gdXBcbiAqIHRvIGZpbmQgdGhlIExWaWV3IGNvbnRhaW5pbmcgdGhlIHBhcmVudCBpbmplY3QgQU5EIHRoZSBpbmRleCBvZiB0aGUgaW5qZWN0b3Igd2l0aGluIHRoYXQgTFZpZXcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXJlbnRJbmplY3RvckxvY2F0aW9uKHROb2RlOiBUTm9kZSwgbFZpZXc6IExWaWV3KTogUmVsYXRpdmVJbmplY3RvckxvY2F0aW9uIHtcbiAgaWYgKHROb2RlLnBhcmVudCAmJiB0Tm9kZS5wYXJlbnQuaW5qZWN0b3JJbmRleCAhPT0gLTEpIHtcbiAgICAvLyBJZiB3ZSBoYXZlIGEgcGFyZW50IGBUTm9kZWAgYW5kIHRoZXJlIGlzIGFuIGluamVjdG9yIGFzc29jaWF0ZWQgd2l0aCBpdCB3ZSBhcmUgZG9uZSwgYmVjYXVzZVxuICAgIC8vIHRoZSBwYXJlbnQgaW5qZWN0b3IgaXMgd2l0aGluIHRoZSBjdXJyZW50IGBMVmlld2AuXG4gICAgcmV0dXJuIHROb2RlLnBhcmVudC5pbmplY3RvckluZGV4IGFzIFJlbGF0aXZlSW5qZWN0b3JMb2NhdGlvbjsgIC8vIFZpZXdPZmZzZXQgaXMgMFxuICB9XG5cbiAgLy8gV2hlbiBwYXJlbnQgaW5qZWN0b3IgbG9jYXRpb24gaXMgY29tcHV0ZWQgaXQgbWF5IGJlIG91dHNpZGUgb2YgdGhlIGN1cnJlbnQgdmlldy4gKGllIGl0IGNvdWxkXG4gIC8vIGJlIHBvaW50aW5nIHRvIGEgZGVjbGFyZWQgcGFyZW50IGxvY2F0aW9uKS4gVGhpcyB2YXJpYWJsZSBzdG9yZXMgbnVtYmVyIG9mIGRlY2xhcmF0aW9uIHBhcmVudHNcbiAgLy8gd2UgbmVlZCB0byB3YWxrIHVwIGluIG9yZGVyIHRvIGZpbmQgdGhlIHBhcmVudCBpbmplY3RvciBsb2NhdGlvbi5cbiAgbGV0IGRlY2xhcmF0aW9uVmlld09mZnNldCA9IDA7XG4gIGxldCBwYXJlbnRUTm9kZTogVE5vZGV8bnVsbCA9IG51bGw7XG4gIGxldCBsVmlld0N1cnNvcjogTFZpZXd8bnVsbCA9IGxWaWV3O1xuXG4gIC8vIFRoZSBwYXJlbnQgaW5qZWN0b3IgaXMgbm90IGluIHRoZSBjdXJyZW50IGBMVmlld2AuIFdlIHdpbGwgaGF2ZSB0byB3YWxrIHRoZSBkZWNsYXJlZCBwYXJlbnRcbiAgLy8gYExWaWV3YCBoaWVyYXJjaHkgYW5kIGxvb2sgZm9yIGl0LiBJZiB3ZSB3YWxrIG9mIHRoZSB0b3AsIHRoYXQgbWVhbnMgdGhhdCB0aGVyZSBpcyBubyBwYXJlbnRcbiAgLy8gYE5vZGVJbmplY3RvcmAuXG4gIHdoaWxlIChsVmlld0N1cnNvciAhPT0gbnVsbCkge1xuICAgIHBhcmVudFROb2RlID0gZ2V0VE5vZGVGcm9tTFZpZXcobFZpZXdDdXJzb3IpO1xuXG4gICAgaWYgKHBhcmVudFROb2RlID09PSBudWxsKSB7XG4gICAgICAvLyBJZiB3ZSBoYXZlIG5vIHBhcmVudCwgdGhhbiB3ZSBhcmUgZG9uZS5cbiAgICAgIHJldHVybiBOT19QQVJFTlRfSU5KRUNUT1I7XG4gICAgfVxuXG4gICAgbmdEZXZNb2RlICYmIHBhcmVudFROb2RlICYmIGFzc2VydFROb2RlRm9yTFZpZXcocGFyZW50VE5vZGUhLCBsVmlld0N1cnNvcltERUNMQVJBVElPTl9WSUVXXSEpO1xuICAgIC8vIEV2ZXJ5IGl0ZXJhdGlvbiBvZiB0aGUgbG9vcCByZXF1aXJlcyB0aGF0IHdlIGdvIHRvIHRoZSBkZWNsYXJlZCBwYXJlbnQuXG4gICAgZGVjbGFyYXRpb25WaWV3T2Zmc2V0Kys7XG4gICAgbFZpZXdDdXJzb3IgPSBsVmlld0N1cnNvcltERUNMQVJBVElPTl9WSUVXXTtcblxuICAgIGlmIChwYXJlbnRUTm9kZS5pbmplY3RvckluZGV4ICE9PSAtMSkge1xuICAgICAgLy8gV2UgZm91bmQgYSBOb2RlSW5qZWN0b3Igd2hpY2ggcG9pbnRzIHRvIHNvbWV0aGluZy5cbiAgICAgIHJldHVybiAocGFyZW50VE5vZGUuaW5qZWN0b3JJbmRleCB8XG4gICAgICAgICAgICAgIChkZWNsYXJhdGlvblZpZXdPZmZzZXQgPDwgUmVsYXRpdmVJbmplY3RvckxvY2F0aW9uRmxhZ3MuVmlld09mZnNldFNoaWZ0KSkgYXNcbiAgICAgICAgICBSZWxhdGl2ZUluamVjdG9yTG9jYXRpb247XG4gICAgfVxuICB9XG4gIHJldHVybiBOT19QQVJFTlRfSU5KRUNUT1I7XG59XG4vKipcbiAqIE1ha2VzIGEgdHlwZSBvciBhbiBpbmplY3Rpb24gdG9rZW4gcHVibGljIHRvIHRoZSBESSBzeXN0ZW0gYnkgYWRkaW5nIGl0IHRvIGFuXG4gKiBpbmplY3RvcidzIGJsb29tIGZpbHRlci5cbiAqXG4gKiBAcGFyYW0gZGkgVGhlIG5vZGUgaW5qZWN0b3IgaW4gd2hpY2ggYSBkaXJlY3RpdmUgd2lsbCBiZSBhZGRlZFxuICogQHBhcmFtIHRva2VuIFRoZSB0eXBlIG9yIHRoZSBpbmplY3Rpb24gdG9rZW4gdG8gYmUgbWFkZSBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpUHVibGljSW5JbmplY3RvcihcbiAgICBpbmplY3RvckluZGV4OiBudW1iZXIsIHRWaWV3OiBUVmlldywgdG9rZW46IFByb3ZpZGVyVG9rZW48YW55Pik6IHZvaWQge1xuICBibG9vbUFkZChpbmplY3RvckluZGV4LCB0VmlldywgdG9rZW4pO1xufVxuXG4vKipcbiAqIEluamVjdCBzdGF0aWMgYXR0cmlidXRlIHZhbHVlIGludG8gZGlyZWN0aXZlIGNvbnN0cnVjdG9yLlxuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHVzZWQgd2l0aCBgZmFjdG9yeWAgZnVuY3Rpb25zIHdoaWNoIGFyZSBnZW5lcmF0ZWQgYXMgcGFydCBvZlxuICogYGRlZmluZURpcmVjdGl2ZWAgb3IgYGRlZmluZUNvbXBvbmVudGAuIFRoZSBtZXRob2QgcmV0cmlldmVzIHRoZSBzdGF0aWMgdmFsdWVcbiAqIG9mIGFuIGF0dHJpYnV0ZS4gKER5bmFtaWMgYXR0cmlidXRlcyBhcmUgbm90IHN1cHBvcnRlZCBzaW5jZSB0aGV5IGFyZSBub3QgcmVzb2x2ZWRcbiAqICBhdCB0aGUgdGltZSBvZiBpbmplY3Rpb24gYW5kIGNhbiBjaGFuZ2Ugb3ZlciB0aW1lLilcbiAqXG4gKiAjIEV4YW1wbGVcbiAqIEdpdmVuOlxuICogYGBgXG4gKiBAQ29tcG9uZW50KC4uLilcbiAqIGNsYXNzIE15Q29tcG9uZW50IHtcbiAqICAgY29uc3RydWN0b3IoQEF0dHJpYnV0ZSgndGl0bGUnKSB0aXRsZTogc3RyaW5nKSB7IC4uLiB9XG4gKiB9XG4gKiBgYGBcbiAqIFdoZW4gaW5zdGFudGlhdGVkIHdpdGhcbiAqIGBgYFxuICogPG15LWNvbXBvbmVudCB0aXRsZT1cIkhlbGxvXCI+PC9teS1jb21wb25lbnQ+XG4gKiBgYGBcbiAqXG4gKiBUaGVuIGZhY3RvcnkgbWV0aG9kIGdlbmVyYXRlZCBpczpcbiAqIGBgYFxuICogTXlDb21wb25lbnQuybVjbXAgPSBkZWZpbmVDb21wb25lbnQoe1xuICogICBmYWN0b3J5OiAoKSA9PiBuZXcgTXlDb21wb25lbnQoaW5qZWN0QXR0cmlidXRlKCd0aXRsZScpKVxuICogICAuLi5cbiAqIH0pXG4gKiBgYGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbmplY3RBdHRyaWJ1dGVJbXBsKHROb2RlOiBUTm9kZSwgYXR0ck5hbWVUb0luamVjdDogc3RyaW5nKTogc3RyaW5nfG51bGwge1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0VE5vZGVUeXBlKHROb2RlLCBUTm9kZVR5cGUuQW55Q29udGFpbmVyIHwgVE5vZGVUeXBlLkFueVJOb2RlKTtcbiAgbmdEZXZNb2RlICYmIGFzc2VydERlZmluZWQodE5vZGUsICdleHBlY3RpbmcgdE5vZGUnKTtcbiAgaWYgKGF0dHJOYW1lVG9JbmplY3QgPT09ICdjbGFzcycpIHtcbiAgICByZXR1cm4gdE5vZGUuY2xhc3NlcztcbiAgfVxuICBpZiAoYXR0ck5hbWVUb0luamVjdCA9PT0gJ3N0eWxlJykge1xuICAgIHJldHVybiB0Tm9kZS5zdHlsZXM7XG4gIH1cblxuICBjb25zdCBhdHRycyA9IHROb2RlLmF0dHJzO1xuICBpZiAoYXR0cnMpIHtcbiAgICBjb25zdCBhdHRyc0xlbmd0aCA9IGF0dHJzLmxlbmd0aDtcbiAgICBsZXQgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBhdHRyc0xlbmd0aCkge1xuICAgICAgY29uc3QgdmFsdWUgPSBhdHRyc1tpXTtcblxuICAgICAgLy8gSWYgd2UgaGl0IGEgYEJpbmRpbmdzYCBvciBgVGVtcGxhdGVgIG1hcmtlciB0aGVuIHdlIGFyZSBkb25lLlxuICAgICAgaWYgKGlzTmFtZU9ubHlBdHRyaWJ1dGVNYXJrZXIodmFsdWUpKSBicmVhaztcblxuICAgICAgLy8gU2tpcCBuYW1lc3BhY2VkIGF0dHJpYnV0ZXNcbiAgICAgIGlmICh2YWx1ZSA9PT0gQXR0cmlidXRlTWFya2VyLk5hbWVzcGFjZVVSSSkge1xuICAgICAgICAvLyB3ZSBza2lwIHRoZSBuZXh0IHR3byB2YWx1ZXNcbiAgICAgICAgLy8gYXMgbmFtZXNwYWNlZCBhdHRyaWJ1dGVzIGxvb2tzIGxpa2VcbiAgICAgICAgLy8gWy4uLiwgQXR0cmlidXRlTWFya2VyLk5hbWVzcGFjZVVSSSwgJ2h0dHA6Ly9zb21ldXJpLmNvbS90ZXN0JywgJ3Rlc3Q6ZXhpc3QnLFxuICAgICAgICAvLyAnZXhpc3RWYWx1ZScsIC4uLl1cbiAgICAgICAgaSA9IGkgKyAyO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIC8vIFNraXAgdG8gdGhlIGZpcnN0IHZhbHVlIG9mIHRoZSBtYXJrZWQgYXR0cmlidXRlLlxuICAgICAgICBpKys7XG4gICAgICAgIHdoaWxlIChpIDwgYXR0cnNMZW5ndGggJiYgdHlwZW9mIGF0dHJzW2ldID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gYXR0ck5hbWVUb0luamVjdCkge1xuICAgICAgICByZXR1cm4gYXR0cnNbaSArIDFdIGFzIHN0cmluZztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGkgPSBpICsgMjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cblxuZnVuY3Rpb24gbm90Rm91bmRWYWx1ZU9yVGhyb3c8VD4oXG4gICAgbm90Rm91bmRWYWx1ZTogVHxudWxsLCB0b2tlbjogUHJvdmlkZXJUb2tlbjxUPiwgZmxhZ3M6IEluamVjdEZsYWdzKTogVHxudWxsIHtcbiAgaWYgKChmbGFncyAmIEluamVjdEZsYWdzLk9wdGlvbmFsKSB8fCBub3RGb3VuZFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gbm90Rm91bmRWYWx1ZTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvd1Byb3ZpZGVyTm90Rm91bmRFcnJvcih0b2tlbiwgJ05vZGVJbmplY3RvcicpO1xuICB9XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgdmFsdWUgYXNzb2NpYXRlZCB0byB0aGUgZ2l2ZW4gdG9rZW4gZnJvbSB0aGUgTW9kdWxlSW5qZWN0b3Igb3IgdGhyb3dzIGV4Y2VwdGlvblxuICpcbiAqIEBwYXJhbSBsVmlldyBUaGUgYExWaWV3YCB0aGF0IGNvbnRhaW5zIHRoZSBgdE5vZGVgXG4gKiBAcGFyYW0gdG9rZW4gVGhlIHRva2VuIHRvIGxvb2sgZm9yXG4gKiBAcGFyYW0gZmxhZ3MgSW5qZWN0aW9uIGZsYWdzXG4gKiBAcGFyYW0gbm90Rm91bmRWYWx1ZSBUaGUgdmFsdWUgdG8gcmV0dXJuIHdoZW4gdGhlIGluamVjdGlvbiBmbGFncyBpcyBgSW5qZWN0RmxhZ3MuT3B0aW9uYWxgXG4gKiBAcmV0dXJucyB0aGUgdmFsdWUgZnJvbSB0aGUgaW5qZWN0b3Igb3IgdGhyb3dzIGFuIGV4Y2VwdGlvblxuICovXG5mdW5jdGlvbiBsb29rdXBUb2tlblVzaW5nTW9kdWxlSW5qZWN0b3I8VD4oXG4gICAgbFZpZXc6IExWaWV3LCB0b2tlbjogUHJvdmlkZXJUb2tlbjxUPiwgZmxhZ3M6IEluamVjdEZsYWdzLCBub3RGb3VuZFZhbHVlPzogYW55KTogVHxudWxsIHtcbiAgaWYgKChmbGFncyAmIEluamVjdEZsYWdzLk9wdGlvbmFsKSAmJiBub3RGb3VuZFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBUaGlzIG11c3QgYmUgc2V0IG9yIHRoZSBOdWxsSW5qZWN0b3Igd2lsbCB0aHJvdyBmb3Igb3B0aW9uYWwgZGVwc1xuICAgIG5vdEZvdW5kVmFsdWUgPSBudWxsO1xuICB9XG5cbiAgaWYgKChmbGFncyAmIChJbmplY3RGbGFncy5TZWxmIHwgSW5qZWN0RmxhZ3MuSG9zdCkpID09PSAwKSB7XG4gICAgY29uc3QgbW9kdWxlSW5qZWN0b3IgPSBsVmlld1tJTkpFQ1RPUl07XG4gICAgLy8gc3dpdGNoIHRvIGBpbmplY3RJbmplY3Rvck9ubHlgIGltcGxlbWVudGF0aW9uIGZvciBtb2R1bGUgaW5qZWN0b3IsIHNpbmNlIG1vZHVsZSBpbmplY3RvclxuICAgIC8vIHNob3VsZCBub3QgaGF2ZSBhY2Nlc3MgdG8gQ29tcG9uZW50L0RpcmVjdGl2ZSBESSBzY29wZSAodGhhdCBtYXkgaGFwcGVuIHRocm91Z2hcbiAgICAvLyBgZGlyZWN0aXZlSW5qZWN0YCBpbXBsZW1lbnRhdGlvbilcbiAgICBjb25zdCBwcmV2aW91c0luamVjdEltcGxlbWVudGF0aW9uID0gc2V0SW5qZWN0SW1wbGVtZW50YXRpb24odW5kZWZpbmVkKTtcbiAgICB0cnkge1xuICAgICAgaWYgKG1vZHVsZUluamVjdG9yKSB7XG4gICAgICAgIHJldHVybiBtb2R1bGVJbmplY3Rvci5nZXQodG9rZW4sIG5vdEZvdW5kVmFsdWUsIGZsYWdzICYgSW5qZWN0RmxhZ3MuT3B0aW9uYWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGluamVjdFJvb3RMaW1wTW9kZSh0b2tlbiwgbm90Rm91bmRWYWx1ZSwgZmxhZ3MgJiBJbmplY3RGbGFncy5PcHRpb25hbCk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldEluamVjdEltcGxlbWVudGF0aW9uKHByZXZpb3VzSW5qZWN0SW1wbGVtZW50YXRpb24pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbm90Rm91bmRWYWx1ZU9yVGhyb3c8VD4obm90Rm91bmRWYWx1ZSwgdG9rZW4sIGZsYWdzKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSB2YWx1ZSBhc3NvY2lhdGVkIHRvIHRoZSBnaXZlbiB0b2tlbiBmcm9tIHRoZSBOb2RlSW5qZWN0b3JzID0+IE1vZHVsZUluamVjdG9yLlxuICpcbiAqIExvb2sgZm9yIHRoZSBpbmplY3RvciBwcm92aWRpbmcgdGhlIHRva2VuIGJ5IHdhbGtpbmcgdXAgdGhlIG5vZGUgaW5qZWN0b3IgdHJlZSBhbmQgdGhlblxuICogdGhlIG1vZHVsZSBpbmplY3RvciB0cmVlLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gcGF0Y2hlcyBgdG9rZW5gIHdpdGggYF9fTkdfRUxFTUVOVF9JRF9fYCB3aGljaCBjb250YWlucyB0aGUgaWQgZm9yIHRoZSBibG9vbVxuICogZmlsdGVyLiBgLTFgIGlzIHJlc2VydmVkIGZvciBpbmplY3RpbmcgYEluamVjdG9yYCAoaW1wbGVtZW50ZWQgYnkgYE5vZGVJbmplY3RvcmApXG4gKlxuICogQHBhcmFtIHROb2RlIFRoZSBOb2RlIHdoZXJlIHRoZSBzZWFyY2ggZm9yIHRoZSBpbmplY3RvciBzaG91bGQgc3RhcnRcbiAqIEBwYXJhbSBsVmlldyBUaGUgYExWaWV3YCB0aGF0IGNvbnRhaW5zIHRoZSBgdE5vZGVgXG4gKiBAcGFyYW0gdG9rZW4gVGhlIHRva2VuIHRvIGxvb2sgZm9yXG4gKiBAcGFyYW0gZmxhZ3MgSW5qZWN0aW9uIGZsYWdzXG4gKiBAcGFyYW0gbm90Rm91bmRWYWx1ZSBUaGUgdmFsdWUgdG8gcmV0dXJuIHdoZW4gdGhlIGluamVjdGlvbiBmbGFncyBpcyBgSW5qZWN0RmxhZ3MuT3B0aW9uYWxgXG4gKiBAcmV0dXJucyB0aGUgdmFsdWUgZnJvbSB0aGUgaW5qZWN0b3IsIGBudWxsYCB3aGVuIG5vdCBmb3VuZCwgb3IgYG5vdEZvdW5kVmFsdWVgIGlmIHByb3ZpZGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRPckNyZWF0ZUluamVjdGFibGU8VD4oXG4gICAgdE5vZGU6IFREaXJlY3RpdmVIb3N0Tm9kZXxudWxsLCBsVmlldzogTFZpZXcsIHRva2VuOiBQcm92aWRlclRva2VuPFQ+LFxuICAgIGZsYWdzOiBJbmplY3RGbGFncyA9IEluamVjdEZsYWdzLkRlZmF1bHQsIG5vdEZvdW5kVmFsdWU/OiBhbnkpOiBUfG51bGwge1xuICBpZiAodE5vZGUgIT09IG51bGwpIHtcbiAgICAvLyBJZiB0aGUgdmlldyBvciBhbnkgb2YgaXRzIGFuY2VzdG9ycyBoYXZlIGFuIGVtYmVkZGVkXG4gICAgLy8gdmlldyBpbmplY3Rvciwgd2UgaGF2ZSB0byBsb29rIGl0IHVwIHRoZXJlIGZpcnN0LlxuICAgIGlmIChsVmlld1tGTEFHU10gJiBMVmlld0ZsYWdzLkhhc0VtYmVkZGVkVmlld0luamVjdG9yICYmXG4gICAgICAgIC8vIFRoZSB0b2tlbiBtdXN0IGJlIHByZXNlbnQgb24gdGhlIGN1cnJlbnQgbm9kZSBpbmplY3RvciB3aGVuIHRoZSBgU2VsZmBcbiAgICAgICAgLy8gZmxhZyBpcyBzZXQsIHNvIHRoZSBsb29rdXAgb24gZW1iZWRkZWQgdmlldyBpbmplY3RvcihzKSBjYW4gYmUgc2tpcHBlZC5cbiAgICAgICAgIShmbGFncyAmIEluamVjdEZsYWdzLlNlbGYpKSB7XG4gICAgICBjb25zdCBlbWJlZGRlZEluamVjdG9yVmFsdWUgPVxuICAgICAgICAgIGxvb2t1cFRva2VuVXNpbmdFbWJlZGRlZEluamVjdG9yKHROb2RlLCBsVmlldywgdG9rZW4sIGZsYWdzLCBOT1RfRk9VTkQpO1xuICAgICAgaWYgKGVtYmVkZGVkSW5qZWN0b3JWYWx1ZSAhPT0gTk9UX0ZPVU5EKSB7XG4gICAgICAgIHJldHVybiBlbWJlZGRlZEluamVjdG9yVmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gT3RoZXJ3aXNlIHRyeSB0aGUgbm9kZSBpbmplY3Rvci5cbiAgICBjb25zdCB2YWx1ZSA9IGxvb2t1cFRva2VuVXNpbmdOb2RlSW5qZWN0b3IodE5vZGUsIGxWaWV3LCB0b2tlbiwgZmxhZ3MsIE5PVF9GT1VORCk7XG4gICAgaWYgKHZhbHVlICE9PSBOT1RfRk9VTkQpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICAvLyBGaW5hbGx5LCBmYWxsIGJhY2sgdG8gdGhlIG1vZHVsZSBpbmplY3Rvci5cbiAgcmV0dXJuIGxvb2t1cFRva2VuVXNpbmdNb2R1bGVJbmplY3RvcjxUPihsVmlldywgdG9rZW4sIGZsYWdzLCBub3RGb3VuZFZhbHVlKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSB2YWx1ZSBhc3NvY2lhdGVkIHRvIHRoZSBnaXZlbiB0b2tlbiBmcm9tIHRoZSBub2RlIGluamVjdG9yLlxuICpcbiAqIEBwYXJhbSB0Tm9kZSBUaGUgTm9kZSB3aGVyZSB0aGUgc2VhcmNoIGZvciB0aGUgaW5qZWN0b3Igc2hvdWxkIHN0YXJ0XG4gKiBAcGFyYW0gbFZpZXcgVGhlIGBMVmlld2AgdGhhdCBjb250YWlucyB0aGUgYHROb2RlYFxuICogQHBhcmFtIHRva2VuIFRoZSB0b2tlbiB0byBsb29rIGZvclxuICogQHBhcmFtIGZsYWdzIEluamVjdGlvbiBmbGFnc1xuICogQHBhcmFtIG5vdEZvdW5kVmFsdWUgVGhlIHZhbHVlIHRvIHJldHVybiB3aGVuIHRoZSBpbmplY3Rpb24gZmxhZ3MgaXMgYEluamVjdEZsYWdzLk9wdGlvbmFsYFxuICogQHJldHVybnMgdGhlIHZhbHVlIGZyb20gdGhlIGluamVjdG9yLCBgbnVsbGAgd2hlbiBub3QgZm91bmQsIG9yIGBub3RGb3VuZFZhbHVlYCBpZiBwcm92aWRlZFxuICovXG5mdW5jdGlvbiBsb29rdXBUb2tlblVzaW5nTm9kZUluamVjdG9yPFQ+KFxuICAgIHROb2RlOiBURGlyZWN0aXZlSG9zdE5vZGUsIGxWaWV3OiBMVmlldywgdG9rZW46IFByb3ZpZGVyVG9rZW48VD4sIGZsYWdzOiBJbmplY3RGbGFncyxcbiAgICBub3RGb3VuZFZhbHVlPzogYW55KSB7XG4gIGNvbnN0IGJsb29tSGFzaCA9IGJsb29tSGFzaEJpdE9yRmFjdG9yeSh0b2tlbik7XG4gIC8vIElmIHRoZSBJRCBzdG9yZWQgaGVyZSBpcyBhIGZ1bmN0aW9uLCB0aGlzIGlzIGEgc3BlY2lhbCBvYmplY3QgbGlrZSBFbGVtZW50UmVmIG9yIFRlbXBsYXRlUmVmXG4gIC8vIHNvIGp1c3QgY2FsbCB0aGUgZmFjdG9yeSBmdW5jdGlvbiB0byBjcmVhdGUgaXQuXG4gIGlmICh0eXBlb2YgYmxvb21IYXNoID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKCFlbnRlckRJKGxWaWV3LCB0Tm9kZSwgZmxhZ3MpKSB7XG4gICAgICAvLyBGYWlsZWQgdG8gZW50ZXIgREksIHRyeSBtb2R1bGUgaW5qZWN0b3IgaW5zdGVhZC4gSWYgYSB0b2tlbiBpcyBpbmplY3RlZCB3aXRoIHRoZSBASG9zdFxuICAgICAgLy8gZmxhZywgdGhlIG1vZHVsZSBpbmplY3RvciBpcyBub3Qgc2VhcmNoZWQgZm9yIHRoYXQgdG9rZW4gaW4gSXZ5LlxuICAgICAgcmV0dXJuIChmbGFncyAmIEluamVjdEZsYWdzLkhvc3QpID9cbiAgICAgICAgICBub3RGb3VuZFZhbHVlT3JUaHJvdzxUPihub3RGb3VuZFZhbHVlLCB0b2tlbiwgZmxhZ3MpIDpcbiAgICAgICAgICBsb29rdXBUb2tlblVzaW5nTW9kdWxlSW5qZWN0b3I8VD4obFZpZXcsIHRva2VuLCBmbGFncywgbm90Rm91bmRWYWx1ZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBsZXQgdmFsdWU6IHVua25vd247XG5cbiAgICAgIGlmIChuZ0Rldk1vZGUpIHtcbiAgICAgICAgcnVuSW5JbmplY3RvclByb2ZpbGVyQ29udGV4dChcbiAgICAgICAgICAgIG5ldyBOb2RlSW5qZWN0b3IoZ2V0Q3VycmVudFROb2RlKCkgYXMgVEVsZW1lbnROb2RlLCBnZXRMVmlldygpKSwgdG9rZW4gYXMgVHlwZTxUPixcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgdmFsdWUgPSBibG9vbUhhc2goZmxhZ3MpO1xuXG4gICAgICAgICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZW1pdEluc3RhbmNlQ3JlYXRlZEJ5SW5qZWN0b3JFdmVudCh2YWx1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBibG9vbUhhc2goZmxhZ3MpO1xuICAgICAgfVxuXG4gICAgICBpZiAodmFsdWUgPT0gbnVsbCAmJiAhKGZsYWdzICYgSW5qZWN0RmxhZ3MuT3B0aW9uYWwpKSB7XG4gICAgICAgIHRocm93UHJvdmlkZXJOb3RGb3VuZEVycm9yKHRva2VuKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgbGVhdmVESSgpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgYmxvb21IYXNoID09PSAnbnVtYmVyJykge1xuICAgIC8vIEEgcmVmZXJlbmNlIHRvIHRoZSBwcmV2aW91cyBpbmplY3RvciBUVmlldyB0aGF0IHdhcyBmb3VuZCB3aGlsZSBjbGltYmluZyB0aGUgZWxlbWVudFxuICAgIC8vIGluamVjdG9yIHRyZWUuIFRoaXMgaXMgdXNlZCB0byBrbm93IGlmIHZpZXdQcm92aWRlcnMgY2FuIGJlIGFjY2Vzc2VkIG9uIHRoZSBjdXJyZW50XG4gICAgLy8gaW5qZWN0b3IuXG4gICAgbGV0IHByZXZpb3VzVFZpZXc6IFRWaWV3fG51bGwgPSBudWxsO1xuICAgIGxldCBpbmplY3RvckluZGV4ID0gZ2V0SW5qZWN0b3JJbmRleCh0Tm9kZSwgbFZpZXcpO1xuICAgIGxldCBwYXJlbnRMb2NhdGlvbiA9IE5PX1BBUkVOVF9JTkpFQ1RPUjtcbiAgICBsZXQgaG9zdFRFbGVtZW50Tm9kZTogVE5vZGV8bnVsbCA9XG4gICAgICAgIGZsYWdzICYgSW5qZWN0RmxhZ3MuSG9zdCA/IGxWaWV3W0RFQ0xBUkFUSU9OX0NPTVBPTkVOVF9WSUVXXVtUX0hPU1RdIDogbnVsbDtcblxuICAgIC8vIElmIHdlIHNob3VsZCBza2lwIHRoaXMgaW5qZWN0b3IsIG9yIGlmIHRoZXJlIGlzIG5vIGluamVjdG9yIG9uIHRoaXMgbm9kZSwgc3RhcnQgYnlcbiAgICAvLyBzZWFyY2hpbmcgdGhlIHBhcmVudCBpbmplY3Rvci5cbiAgICBpZiAoaW5qZWN0b3JJbmRleCA9PT0gLTEgfHwgZmxhZ3MgJiBJbmplY3RGbGFncy5Ta2lwU2VsZikge1xuICAgICAgcGFyZW50TG9jYXRpb24gPSBpbmplY3RvckluZGV4ID09PSAtMSA/IGdldFBhcmVudEluamVjdG9yTG9jYXRpb24odE5vZGUsIGxWaWV3KSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbFZpZXdbaW5qZWN0b3JJbmRleCArIE5vZGVJbmplY3Rvck9mZnNldC5QQVJFTlRdO1xuXG4gICAgICBpZiAocGFyZW50TG9jYXRpb24gPT09IE5PX1BBUkVOVF9JTkpFQ1RPUiB8fCAhc2hvdWxkU2VhcmNoUGFyZW50KGZsYWdzLCBmYWxzZSkpIHtcbiAgICAgICAgaW5qZWN0b3JJbmRleCA9IC0xO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJldmlvdXNUVmlldyA9IGxWaWV3W1RWSUVXXTtcbiAgICAgICAgaW5qZWN0b3JJbmRleCA9IGdldFBhcmVudEluamVjdG9ySW5kZXgocGFyZW50TG9jYXRpb24pO1xuICAgICAgICBsVmlldyA9IGdldFBhcmVudEluamVjdG9yVmlldyhwYXJlbnRMb2NhdGlvbiwgbFZpZXcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRyYXZlcnNlIHVwIHRoZSBpbmplY3RvciB0cmVlIHVudGlsIHdlIGZpbmQgYSBwb3RlbnRpYWwgbWF0Y2ggb3IgdW50aWwgd2Uga25vdyB0aGVyZVxuICAgIC8vICppc24ndCogYSBtYXRjaC5cbiAgICB3aGlsZSAoaW5qZWN0b3JJbmRleCAhPT0gLTEpIHtcbiAgICAgIG5nRGV2TW9kZSAmJiBhc3NlcnROb2RlSW5qZWN0b3IobFZpZXcsIGluamVjdG9ySW5kZXgpO1xuXG4gICAgICAvLyBDaGVjayB0aGUgY3VycmVudCBpbmplY3Rvci4gSWYgaXQgbWF0Y2hlcywgc2VlIGlmIGl0IGNvbnRhaW5zIHRva2VuLlxuICAgICAgY29uc3QgdFZpZXcgPSBsVmlld1tUVklFV107XG4gICAgICBuZ0Rldk1vZGUgJiZcbiAgICAgICAgICBhc3NlcnRUTm9kZUZvckxWaWV3KHRWaWV3LmRhdGFbaW5qZWN0b3JJbmRleCArIE5vZGVJbmplY3Rvck9mZnNldC5UTk9ERV0gYXMgVE5vZGUsIGxWaWV3KTtcbiAgICAgIGlmIChibG9vbUhhc1Rva2VuKGJsb29tSGFzaCwgaW5qZWN0b3JJbmRleCwgdFZpZXcuZGF0YSkpIHtcbiAgICAgICAgLy8gQXQgdGhpcyBwb2ludCwgd2UgaGF2ZSBhbiBpbmplY3RvciB3aGljaCAqbWF5KiBjb250YWluIHRoZSB0b2tlbiwgc28gd2Ugc3RlcCB0aHJvdWdoXG4gICAgICAgIC8vIHRoZSBwcm92aWRlcnMgYW5kIGRpcmVjdGl2ZXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBpbmplY3RvcidzIGNvcnJlc3BvbmRpbmcgbm9kZSB0byBnZXRcbiAgICAgICAgLy8gdGhlIGluc3RhbmNlLlxuICAgICAgICBjb25zdCBpbnN0YW5jZTogVHx7fXxudWxsID0gc2VhcmNoVG9rZW5zT25JbmplY3RvcjxUPihcbiAgICAgICAgICAgIGluamVjdG9ySW5kZXgsIGxWaWV3LCB0b2tlbiwgcHJldmlvdXNUVmlldywgZmxhZ3MsIGhvc3RURWxlbWVudE5vZGUpO1xuICAgICAgICBpZiAoaW5zdGFuY2UgIT09IE5PVF9GT1VORCkge1xuICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcGFyZW50TG9jYXRpb24gPSBsVmlld1tpbmplY3RvckluZGV4ICsgTm9kZUluamVjdG9yT2Zmc2V0LlBBUkVOVF07XG4gICAgICBpZiAocGFyZW50TG9jYXRpb24gIT09IE5PX1BBUkVOVF9JTkpFQ1RPUiAmJlxuICAgICAgICAgIHNob3VsZFNlYXJjaFBhcmVudChcbiAgICAgICAgICAgICAgZmxhZ3MsXG4gICAgICAgICAgICAgIGxWaWV3W1RWSUVXXS5kYXRhW2luamVjdG9ySW5kZXggKyBOb2RlSW5qZWN0b3JPZmZzZXQuVE5PREVdID09PSBob3N0VEVsZW1lbnROb2RlKSAmJlxuICAgICAgICAgIGJsb29tSGFzVG9rZW4oYmxvb21IYXNoLCBpbmplY3RvckluZGV4LCBsVmlldykpIHtcbiAgICAgICAgLy8gVGhlIGRlZiB3YXNuJ3QgZm91bmQgYW55d2hlcmUgb24gdGhpcyBub2RlLCBzbyBpdCB3YXMgYSBmYWxzZSBwb3NpdGl2ZS5cbiAgICAgICAgLy8gVHJhdmVyc2UgdXAgdGhlIHRyZWUgYW5kIGNvbnRpbnVlIHNlYXJjaGluZy5cbiAgICAgICAgcHJldmlvdXNUVmlldyA9IHRWaWV3O1xuICAgICAgICBpbmplY3RvckluZGV4ID0gZ2V0UGFyZW50SW5qZWN0b3JJbmRleChwYXJlbnRMb2NhdGlvbik7XG4gICAgICAgIGxWaWV3ID0gZ2V0UGFyZW50SW5qZWN0b3JWaWV3KHBhcmVudExvY2F0aW9uLCBsVmlldyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJZiB3ZSBzaG91bGQgbm90IHNlYXJjaCBwYXJlbnQgT1IgSWYgdGhlIGFuY2VzdG9yIGJsb29tIGZpbHRlciB2YWx1ZSBkb2VzIG5vdCBoYXZlIHRoZVxuICAgICAgICAvLyBiaXQgY29ycmVzcG9uZGluZyB0byB0aGUgZGlyZWN0aXZlIHdlIGNhbiBnaXZlIHVwIG9uIHRyYXZlcnNpbmcgdXAgdG8gZmluZCB0aGUgc3BlY2lmaWNcbiAgICAgICAgLy8gaW5qZWN0b3IuXG4gICAgICAgIGluamVjdG9ySW5kZXggPSAtMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbm90Rm91bmRWYWx1ZTtcbn1cblxuZnVuY3Rpb24gc2VhcmNoVG9rZW5zT25JbmplY3RvcjxUPihcbiAgICBpbmplY3RvckluZGV4OiBudW1iZXIsIGxWaWV3OiBMVmlldywgdG9rZW46IFByb3ZpZGVyVG9rZW48VD4sIHByZXZpb3VzVFZpZXc6IFRWaWV3fG51bGwsXG4gICAgZmxhZ3M6IEluamVjdEZsYWdzLCBob3N0VEVsZW1lbnROb2RlOiBUTm9kZXxudWxsKSB7XG4gIGNvbnN0IGN1cnJlbnRUVmlldyA9IGxWaWV3W1RWSUVXXTtcbiAgY29uc3QgdE5vZGUgPSBjdXJyZW50VFZpZXcuZGF0YVtpbmplY3RvckluZGV4ICsgTm9kZUluamVjdG9yT2Zmc2V0LlROT0RFXSBhcyBUTm9kZTtcbiAgLy8gRmlyc3QsIHdlIG5lZWQgdG8gZGV0ZXJtaW5lIGlmIHZpZXcgcHJvdmlkZXJzIGNhbiBiZSBhY2Nlc3NlZCBieSB0aGUgc3RhcnRpbmcgZWxlbWVudC5cbiAgLy8gVGhlcmUgYXJlIHR3byBwb3NzaWJpbGl0aWVzXG4gIGNvbnN0IGNhbkFjY2Vzc1ZpZXdQcm92aWRlcnMgPSBwcmV2aW91c1RWaWV3ID09IG51bGwgP1xuICAgICAgLy8gMSkgVGhpcyBpcyB0aGUgZmlyc3QgaW52b2NhdGlvbiBgcHJldmlvdXNUVmlldyA9PSBudWxsYCB3aGljaCBtZWFucyB0aGF0IHdlIGFyZSBhdCB0aGVcbiAgICAgIC8vIGBUTm9kZWAgb2Ygd2hlcmUgaW5qZWN0b3IgaXMgc3RhcnRpbmcgdG8gbG9vay4gSW4gc3VjaCBhIGNhc2UgdGhlIG9ubHkgdGltZSB3ZSBhcmUgYWxsb3dlZFxuICAgICAgLy8gdG8gbG9vayBpbnRvIHRoZSBWaWV3UHJvdmlkZXJzIGlzIGlmOlxuICAgICAgLy8gLSB3ZSBhcmUgb24gYSBjb21wb25lbnRcbiAgICAgIC8vIC0gQU5EIHRoZSBpbmplY3RvciBzZXQgYGluY2x1ZGVWaWV3UHJvdmlkZXJzYCB0byB0cnVlIChpbXBseWluZyB0aGF0IHRoZSB0b2tlbiBjYW4gc2VlXG4gICAgICAvLyBWaWV3UHJvdmlkZXJzIGJlY2F1c2UgaXQgaXMgdGhlIENvbXBvbmVudCBvciBhIFNlcnZpY2Ugd2hpY2ggaXRzZWxmIHdhcyBkZWNsYXJlZCBpblxuICAgICAgLy8gVmlld1Byb3ZpZGVycylcbiAgICAgIChpc0NvbXBvbmVudEhvc3QodE5vZGUpICYmIGluY2x1ZGVWaWV3UHJvdmlkZXJzKSA6XG4gICAgICAvLyAyKSBgcHJldmlvdXNUVmlldyAhPSBudWxsYCB3aGljaCBtZWFucyB0aGF0IHdlIGFyZSBub3cgd2Fsa2luZyBhY3Jvc3MgdGhlIHBhcmVudCBub2Rlcy5cbiAgICAgIC8vIEluIHN1Y2ggYSBjYXNlIHdlIGFyZSBvbmx5IGFsbG93ZWQgdG8gbG9vayBpbnRvIHRoZSBWaWV3UHJvdmlkZXJzIGlmOlxuICAgICAgLy8gLSBXZSBqdXN0IGNyb3NzZWQgZnJvbSBjaGlsZCBWaWV3IHRvIFBhcmVudCBWaWV3IGBwcmV2aW91c1RWaWV3ICE9IGN1cnJlbnRUVmlld2BcbiAgICAgIC8vIC0gQU5EIHRoZSBwYXJlbnQgVE5vZGUgaXMgYW4gRWxlbWVudC5cbiAgICAgIC8vIFRoaXMgbWVhbnMgdGhhdCB3ZSBqdXN0IGNhbWUgZnJvbSB0aGUgQ29tcG9uZW50J3MgVmlldyBhbmQgdGhlcmVmb3JlIGFyZSBhbGxvd2VkIHRvIHNlZVxuICAgICAgLy8gaW50byB0aGUgVmlld1Byb3ZpZGVycy5cbiAgICAgIChwcmV2aW91c1RWaWV3ICE9IGN1cnJlbnRUVmlldyAmJiAoKHROb2RlLnR5cGUgJiBUTm9kZVR5cGUuQW55Uk5vZGUpICE9PSAwKSk7XG5cbiAgLy8gVGhpcyBzcGVjaWFsIGNhc2UgaGFwcGVucyB3aGVuIHRoZXJlIGlzIGEgQGhvc3Qgb24gdGhlIGluamVjdCBhbmQgd2hlbiB3ZSBhcmUgc2VhcmNoaW5nXG4gIC8vIG9uIHRoZSBob3N0IGVsZW1lbnQgbm9kZS5cbiAgY29uc3QgaXNIb3N0U3BlY2lhbENhc2UgPSAoZmxhZ3MgJiBJbmplY3RGbGFncy5Ib3N0KSAmJiBob3N0VEVsZW1lbnROb2RlID09PSB0Tm9kZTtcblxuICBjb25zdCBpbmplY3RhYmxlSWR4ID0gbG9jYXRlRGlyZWN0aXZlT3JQcm92aWRlcihcbiAgICAgIHROb2RlLCBjdXJyZW50VFZpZXcsIHRva2VuLCBjYW5BY2Nlc3NWaWV3UHJvdmlkZXJzLCBpc0hvc3RTcGVjaWFsQ2FzZSk7XG4gIGlmIChpbmplY3RhYmxlSWR4ICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIGdldE5vZGVJbmplY3RhYmxlKGxWaWV3LCBjdXJyZW50VFZpZXcsIGluamVjdGFibGVJZHgsIHROb2RlIGFzIFRFbGVtZW50Tm9kZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIE5PVF9GT1VORDtcbiAgfVxufVxuXG4vKipcbiAqIFNlYXJjaGVzIGZvciB0aGUgZ2l2ZW4gdG9rZW4gYW1vbmcgdGhlIG5vZGUncyBkaXJlY3RpdmVzIGFuZCBwcm92aWRlcnMuXG4gKlxuICogQHBhcmFtIHROb2RlIFROb2RlIG9uIHdoaWNoIGRpcmVjdGl2ZXMgYXJlIHByZXNlbnQuXG4gKiBAcGFyYW0gdFZpZXcgVGhlIHRWaWV3IHdlIGFyZSBjdXJyZW50bHkgcHJvY2Vzc2luZ1xuICogQHBhcmFtIHRva2VuIFByb3ZpZGVyIHRva2VuIG9yIHR5cGUgb2YgYSBkaXJlY3RpdmUgdG8gbG9vayBmb3IuXG4gKiBAcGFyYW0gY2FuQWNjZXNzVmlld1Byb3ZpZGVycyBXaGV0aGVyIHZpZXcgcHJvdmlkZXJzIHNob3VsZCBiZSBjb25zaWRlcmVkLlxuICogQHBhcmFtIGlzSG9zdFNwZWNpYWxDYXNlIFdoZXRoZXIgdGhlIGhvc3Qgc3BlY2lhbCBjYXNlIGFwcGxpZXMuXG4gKiBAcmV0dXJucyBJbmRleCBvZiBhIGZvdW5kIGRpcmVjdGl2ZSBvciBwcm92aWRlciwgb3IgbnVsbCB3aGVuIG5vbmUgZm91bmQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2NhdGVEaXJlY3RpdmVPclByb3ZpZGVyPFQ+KFxuICAgIHROb2RlOiBUTm9kZSwgdFZpZXc6IFRWaWV3LCB0b2tlbjogUHJvdmlkZXJUb2tlbjxUPnxzdHJpbmcsIGNhbkFjY2Vzc1ZpZXdQcm92aWRlcnM6IGJvb2xlYW4sXG4gICAgaXNIb3N0U3BlY2lhbENhc2U6IGJvb2xlYW58bnVtYmVyKTogbnVtYmVyfG51bGwge1xuICBjb25zdCBub2RlUHJvdmlkZXJJbmRleGVzID0gdE5vZGUucHJvdmlkZXJJbmRleGVzO1xuICBjb25zdCB0SW5qZWN0YWJsZXMgPSB0Vmlldy5kYXRhO1xuXG4gIGNvbnN0IGluamVjdGFibGVzU3RhcnQgPSBub2RlUHJvdmlkZXJJbmRleGVzICYgVE5vZGVQcm92aWRlckluZGV4ZXMuUHJvdmlkZXJzU3RhcnRJbmRleE1hc2s7XG4gIGNvbnN0IGRpcmVjdGl2ZXNTdGFydCA9IHROb2RlLmRpcmVjdGl2ZVN0YXJ0O1xuICBjb25zdCBkaXJlY3RpdmVFbmQgPSB0Tm9kZS5kaXJlY3RpdmVFbmQ7XG4gIGNvbnN0IGNwdFZpZXdQcm92aWRlcnNDb3VudCA9XG4gICAgICBub2RlUHJvdmlkZXJJbmRleGVzID4+IFROb2RlUHJvdmlkZXJJbmRleGVzLkNwdFZpZXdQcm92aWRlcnNDb3VudFNoaWZ0O1xuICBjb25zdCBzdGFydGluZ0luZGV4ID1cbiAgICAgIGNhbkFjY2Vzc1ZpZXdQcm92aWRlcnMgPyBpbmplY3RhYmxlc1N0YXJ0IDogaW5qZWN0YWJsZXNTdGFydCArIGNwdFZpZXdQcm92aWRlcnNDb3VudDtcbiAgLy8gV2hlbiB0aGUgaG9zdCBzcGVjaWFsIGNhc2UgYXBwbGllcywgb25seSB0aGUgdmlld1Byb3ZpZGVycyBhbmQgdGhlIGNvbXBvbmVudCBhcmUgdmlzaWJsZVxuICBjb25zdCBlbmRJbmRleCA9IGlzSG9zdFNwZWNpYWxDYXNlID8gaW5qZWN0YWJsZXNTdGFydCArIGNwdFZpZXdQcm92aWRlcnNDb3VudCA6IGRpcmVjdGl2ZUVuZDtcbiAgZm9yIChsZXQgaSA9IHN0YXJ0aW5nSW5kZXg7IGkgPCBlbmRJbmRleDsgaSsrKSB7XG4gICAgY29uc3QgcHJvdmlkZXJUb2tlbk9yRGVmID0gdEluamVjdGFibGVzW2ldIGFzIFByb3ZpZGVyVG9rZW48YW55PnwgRGlyZWN0aXZlRGVmPGFueT58IHN0cmluZztcbiAgICBpZiAoaSA8IGRpcmVjdGl2ZXNTdGFydCAmJiB0b2tlbiA9PT0gcHJvdmlkZXJUb2tlbk9yRGVmIHx8XG4gICAgICAgIGkgPj0gZGlyZWN0aXZlc1N0YXJ0ICYmIChwcm92aWRlclRva2VuT3JEZWYgYXMgRGlyZWN0aXZlRGVmPGFueT4pLnR5cGUgPT09IHRva2VuKSB7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gIH1cbiAgaWYgKGlzSG9zdFNwZWNpYWxDYXNlKSB7XG4gICAgY29uc3QgZGlyRGVmID0gdEluamVjdGFibGVzW2RpcmVjdGl2ZXNTdGFydF0gYXMgRGlyZWN0aXZlRGVmPGFueT47XG4gICAgaWYgKGRpckRlZiAmJiBpc0NvbXBvbmVudERlZihkaXJEZWYpICYmIGRpckRlZi50eXBlID09PSB0b2tlbikge1xuICAgICAgcmV0dXJuIGRpcmVjdGl2ZXNTdGFydDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogUmV0cmlldmUgb3IgaW5zdGFudGlhdGUgdGhlIGluamVjdGFibGUgZnJvbSB0aGUgYExWaWV3YCBhdCBwYXJ0aWN1bGFyIGBpbmRleGAuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBjaGVja3MgdG8gc2VlIGlmIHRoZSB2YWx1ZSBoYXMgYWxyZWFkeSBiZWVuIGluc3RhbnRpYXRlZCBhbmQgaWYgc28gcmV0dXJucyB0aGVcbiAqIGNhY2hlZCBgaW5qZWN0YWJsZWAuIE90aGVyd2lzZSBpZiBpdCBkZXRlY3RzIHRoYXQgdGhlIHZhbHVlIGlzIHN0aWxsIGEgZmFjdG9yeSBpdFxuICogaW5zdGFudGlhdGVzIHRoZSBgaW5qZWN0YWJsZWAgYW5kIGNhY2hlcyB0aGUgdmFsdWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXROb2RlSW5qZWN0YWJsZShcbiAgICBsVmlldzogTFZpZXcsIHRWaWV3OiBUVmlldywgaW5kZXg6IG51bWJlciwgdE5vZGU6IFREaXJlY3RpdmVIb3N0Tm9kZSk6IGFueSB7XG4gIGxldCB2YWx1ZSA9IGxWaWV3W2luZGV4XTtcbiAgY29uc3QgdERhdGEgPSB0Vmlldy5kYXRhO1xuICBpZiAoaXNGYWN0b3J5KHZhbHVlKSkge1xuICAgIGNvbnN0IGZhY3Rvcnk6IE5vZGVJbmplY3RvckZhY3RvcnkgPSB2YWx1ZTtcbiAgICBpZiAoZmFjdG9yeS5yZXNvbHZpbmcpIHtcbiAgICAgIHRocm93Q3ljbGljRGVwZW5kZW5jeUVycm9yKHN0cmluZ2lmeUZvckVycm9yKHREYXRhW2luZGV4XSkpO1xuICAgIH1cbiAgICBjb25zdCBwcmV2aW91c0luY2x1ZGVWaWV3UHJvdmlkZXJzID0gc2V0SW5jbHVkZVZpZXdQcm92aWRlcnMoZmFjdG9yeS5jYW5TZWVWaWV3UHJvdmlkZXJzKTtcbiAgICBmYWN0b3J5LnJlc29sdmluZyA9IHRydWU7XG5cbiAgICBsZXQgcHJldkluamVjdENvbnRleHQ6IEluamVjdG9yUHJvZmlsZXJDb250ZXh0fHVuZGVmaW5lZDtcbiAgICBpZiAobmdEZXZNb2RlKSB7XG4gICAgICAvLyB0RGF0YSBpbmRleGVzIG1pcnJvciB0aGUgY29uY3JldGUgaW5zdGFuY2VzIGluIGl0cyBjb3JyZXNwb25kaW5nIExWaWV3LlxuICAgICAgLy8gbFZpZXdbaW5kZXhdIGhlcmUgaXMgZWl0aGVyIHRoZSBpbmplY3RhYmxlIGluc3RhY2UgaXRzZWxmIG9yIGEgZmFjdG9yeSxcbiAgICAgIC8vIHRoZXJlZm9yZSB0RGF0YVtpbmRleF0gaXMgdGhlIGNvbnN0cnVjdG9yIG9mIHRoYXQgaW5qZWN0YWJsZSBvciBhXG4gICAgICAvLyBkZWZpbml0aW9uIG9iamVjdCB0aGF0IGNvbnRhaW5zIHRoZSBjb25zdHJ1Y3RvciBpbiBhIGAudHlwZWAgZmllbGQuXG4gICAgICBjb25zdCB0b2tlbiA9XG4gICAgICAgICAgKHREYXRhW2luZGV4XSBhcyAoRGlyZWN0aXZlRGVmPHVua25vd24+fCBDb21wb25lbnREZWY8dW5rbm93bj4pKS50eXBlIHx8IHREYXRhW2luZGV4XTtcbiAgICAgIGNvbnN0IGluamVjdG9yID0gbmV3IE5vZGVJbmplY3Rvcih0Tm9kZSwgbFZpZXcpO1xuICAgICAgcHJldkluamVjdENvbnRleHQgPSBzZXRJbmplY3RvclByb2ZpbGVyQ29udGV4dCh7aW5qZWN0b3IsIHRva2VufSk7XG4gICAgfVxuXG4gICAgY29uc3QgcHJldmlvdXNJbmplY3RJbXBsZW1lbnRhdGlvbiA9XG4gICAgICAgIGZhY3RvcnkuaW5qZWN0SW1wbCA/IHNldEluamVjdEltcGxlbWVudGF0aW9uKGZhY3RvcnkuaW5qZWN0SW1wbCkgOiBudWxsO1xuICAgIGNvbnN0IHN1Y2Nlc3MgPSBlbnRlckRJKGxWaWV3LCB0Tm9kZSwgSW5qZWN0RmxhZ3MuRGVmYXVsdCk7XG4gICAgbmdEZXZNb2RlICYmXG4gICAgICAgIGFzc2VydEVxdWFsKFxuICAgICAgICAgICAgc3VjY2VzcywgdHJ1ZSxcbiAgICAgICAgICAgICdCZWNhdXNlIGZsYWdzIGRvIG5vdCBjb250YWluIFxcYFNraXBTZWxmXFwnIHdlIGV4cGVjdCB0aGlzIHRvIGFsd2F5cyBzdWNjZWVkLicpO1xuICAgIHRyeSB7XG4gICAgICB2YWx1ZSA9IGxWaWV3W2luZGV4XSA9IGZhY3RvcnkuZmFjdG9yeSh1bmRlZmluZWQsIHREYXRhLCBsVmlldywgdE5vZGUpO1xuXG4gICAgICBuZ0Rldk1vZGUgJiYgZW1pdEluc3RhbmNlQ3JlYXRlZEJ5SW5qZWN0b3JFdmVudCh2YWx1ZSk7XG5cbiAgICAgIC8vIFRoaXMgY29kZSBwYXRoIGlzIGhpdCBmb3IgYm90aCBkaXJlY3RpdmVzIGFuZCBwcm92aWRlcnMuXG4gICAgICAvLyBGb3IgcGVyZiByZWFzb25zLCB3ZSB3YW50IHRvIGF2b2lkIHNlYXJjaGluZyBmb3IgaG9va3Mgb24gcHJvdmlkZXJzLlxuICAgICAgLy8gSXQgZG9lcyBubyBoYXJtIHRvIHRyeSAodGhlIGhvb2tzIGp1c3Qgd29uJ3QgZXhpc3QpLCBidXQgdGhlIGV4dHJhXG4gICAgICAvLyBjaGVja3MgYXJlIHVubmVjZXNzYXJ5IGFuZCB0aGlzIGlzIGEgaG90IHBhdGguIFNvIHdlIGNoZWNrIHRvIHNlZVxuICAgICAgLy8gaWYgdGhlIGluZGV4IG9mIHRoZSBkZXBlbmRlbmN5IGlzIGluIHRoZSBkaXJlY3RpdmUgcmFuZ2UgZm9yIHRoaXNcbiAgICAgIC8vIHROb2RlLiBJZiBpdCdzIG5vdCwgd2Uga25vdyBpdCdzIGEgcHJvdmlkZXIgYW5kIHNraXAgaG9vayByZWdpc3RyYXRpb24uXG4gICAgICBpZiAodFZpZXcuZmlyc3RDcmVhdGVQYXNzICYmIGluZGV4ID49IHROb2RlLmRpcmVjdGl2ZVN0YXJ0KSB7XG4gICAgICAgIG5nRGV2TW9kZSAmJiBhc3NlcnREaXJlY3RpdmVEZWYodERhdGFbaW5kZXhdKTtcbiAgICAgICAgcmVnaXN0ZXJQcmVPcmRlckhvb2tzKGluZGV4LCB0RGF0YVtpbmRleF0gYXMgRGlyZWN0aXZlRGVmPGFueT4sIHRWaWV3KTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgbmdEZXZNb2RlICYmIHNldEluamVjdG9yUHJvZmlsZXJDb250ZXh0KHByZXZJbmplY3RDb250ZXh0ISk7XG5cbiAgICAgIHByZXZpb3VzSW5qZWN0SW1wbGVtZW50YXRpb24gIT09IG51bGwgJiZcbiAgICAgICAgICBzZXRJbmplY3RJbXBsZW1lbnRhdGlvbihwcmV2aW91c0luamVjdEltcGxlbWVudGF0aW9uKTtcbiAgICAgIHNldEluY2x1ZGVWaWV3UHJvdmlkZXJzKHByZXZpb3VzSW5jbHVkZVZpZXdQcm92aWRlcnMpO1xuICAgICAgZmFjdG9yeS5yZXNvbHZpbmcgPSBmYWxzZTtcbiAgICAgIGxlYXZlREkoKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGJpdCBpbiBhbiBpbmplY3RvcidzIGJsb29tIGZpbHRlciB0aGF0IHNob3VsZCBiZSB1c2VkIHRvIGRldGVybWluZSB3aGV0aGVyIG9yIG5vdFxuICogdGhlIGRpcmVjdGl2ZSBtaWdodCBiZSBwcm92aWRlZCBieSB0aGUgaW5qZWN0b3IuXG4gKlxuICogV2hlbiBhIGRpcmVjdGl2ZSBpcyBwdWJsaWMsIGl0IGlzIGFkZGVkIHRvIHRoZSBibG9vbSBmaWx0ZXIgYW5kIGdpdmVuIGEgdW5pcXVlIElEIHRoYXQgY2FuIGJlXG4gKiByZXRyaWV2ZWQgb24gdGhlIFR5cGUuIFdoZW4gdGhlIGRpcmVjdGl2ZSBpc24ndCBwdWJsaWMgb3IgdGhlIHRva2VuIGlzIG5vdCBhIGRpcmVjdGl2ZSBgbnVsbGBcbiAqIGlzIHJldHVybmVkIGFzIHRoZSBub2RlIGluamVjdG9yIGNhbiBub3QgcG9zc2libHkgcHJvdmlkZSB0aGF0IHRva2VuLlxuICpcbiAqIEBwYXJhbSB0b2tlbiB0aGUgaW5qZWN0aW9uIHRva2VuXG4gKiBAcmV0dXJucyB0aGUgbWF0Y2hpbmcgYml0IHRvIGNoZWNrIGluIHRoZSBibG9vbSBmaWx0ZXIgb3IgYG51bGxgIGlmIHRoZSB0b2tlbiBpcyBub3Qga25vd24uXG4gKiAgIFdoZW4gdGhlIHJldHVybmVkIHZhbHVlIGlzIG5lZ2F0aXZlIHRoZW4gaXQgcmVwcmVzZW50cyBzcGVjaWFsIHZhbHVlcyBzdWNoIGFzIGBJbmplY3RvcmAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBibG9vbUhhc2hCaXRPckZhY3RvcnkodG9rZW46IFByb3ZpZGVyVG9rZW48YW55PnxzdHJpbmcpOiBudW1iZXJ8RnVuY3Rpb258dW5kZWZpbmVkIHtcbiAgbmdEZXZNb2RlICYmIGFzc2VydERlZmluZWQodG9rZW4sICd0b2tlbiBtdXN0IGJlIGRlZmluZWQnKTtcbiAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdG9rZW4uY2hhckNvZGVBdCgwKSB8fCAwO1xuICB9XG4gIGNvbnN0IHRva2VuSWQ6IG51bWJlcnx1bmRlZmluZWQgPVxuICAgICAgLy8gRmlyc3QgY2hlY2sgd2l0aCBgaGFzT3duUHJvcGVydHlgIHNvIHdlIGRvbid0IGdldCBhbiBpbmhlcml0ZWQgSUQuXG4gICAgICB0b2tlbi5oYXNPd25Qcm9wZXJ0eShOR19FTEVNRU5UX0lEKSA/ICh0b2tlbiBhcyBhbnkpW05HX0VMRU1FTlRfSURdIDogdW5kZWZpbmVkO1xuICAvLyBOZWdhdGl2ZSB0b2tlbiBJRHMgYXJlIHVzZWQgZm9yIHNwZWNpYWwgb2JqZWN0cyBzdWNoIGFzIGBJbmplY3RvcmBcbiAgaWYgKHR5cGVvZiB0b2tlbklkID09PSAnbnVtYmVyJykge1xuICAgIGlmICh0b2tlbklkID49IDApIHtcbiAgICAgIHJldHVybiB0b2tlbklkICYgQkxPT01fTUFTSztcbiAgICB9IGVsc2Uge1xuICAgICAgbmdEZXZNb2RlICYmXG4gICAgICAgICAgYXNzZXJ0RXF1YWwodG9rZW5JZCwgSW5qZWN0b3JNYXJrZXJzLkluamVjdG9yLCAnRXhwZWN0aW5nIHRvIGdldCBTcGVjaWFsIEluamVjdG9yIElkJyk7XG4gICAgICByZXR1cm4gY3JlYXRlTm9kZUluamVjdG9yO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdG9rZW5JZDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYmxvb21IYXNUb2tlbihibG9vbUhhc2g6IG51bWJlciwgaW5qZWN0b3JJbmRleDogbnVtYmVyLCBpbmplY3RvclZpZXc6IExWaWV3fFREYXRhKSB7XG4gIC8vIENyZWF0ZSBhIG1hc2sgdGhhdCB0YXJnZXRzIHRoZSBzcGVjaWZpYyBiaXQgYXNzb2NpYXRlZCB3aXRoIHRoZSBkaXJlY3RpdmUgd2UncmUgbG9va2luZyBmb3IuXG4gIC8vIEpTIGJpdCBvcGVyYXRpb25zIGFyZSAzMiBiaXRzLCBzbyB0aGlzIHdpbGwgYmUgYSBudW1iZXIgYmV0d2VlbiAyXjAgYW5kIDJeMzEsIGNvcnJlc3BvbmRpbmdcbiAgLy8gdG8gYml0IHBvc2l0aW9ucyAwIC0gMzEgaW4gYSAzMiBiaXQgaW50ZWdlci5cbiAgY29uc3QgbWFzayA9IDEgPDwgYmxvb21IYXNoO1xuXG4gIC8vIEVhY2ggYmxvb20gYnVja2V0IGluIGBpbmplY3RvclZpZXdgIHJlcHJlc2VudHMgYEJMT09NX0JVQ0tFVF9CSVRTYCBudW1iZXIgb2YgYml0cyBvZlxuICAvLyBgYmxvb21IYXNoYC4gQW55IGJpdHMgaW4gYGJsb29tSGFzaGAgYmV5b25kIGBCTE9PTV9CVUNLRVRfQklUU2AgaW5kaWNhdGUgdGhlIGJ1Y2tldCBvZmZzZXRcbiAgLy8gdGhhdCBzaG91bGQgYmUgdXNlZC5cbiAgY29uc3QgdmFsdWUgPSBpbmplY3RvclZpZXdbaW5qZWN0b3JJbmRleCArIChibG9vbUhhc2ggPj4gQkxPT01fQlVDS0VUX0JJVFMpXTtcblxuICAvLyBJZiB0aGUgYmxvb20gZmlsdGVyIHZhbHVlIGhhcyB0aGUgYml0IGNvcnJlc3BvbmRpbmcgdG8gdGhlIGRpcmVjdGl2ZSdzIGJsb29tQml0IGZsaXBwZWQgb24sXG4gIC8vIHRoaXMgaW5qZWN0b3IgaXMgYSBwb3RlbnRpYWwgbWF0Y2guXG4gIHJldHVybiAhISh2YWx1ZSAmIG1hc2spO1xufVxuXG4vKiogUmV0dXJucyB0cnVlIGlmIGZsYWdzIHByZXZlbnQgcGFyZW50IGluamVjdG9yIGZyb20gYmVpbmcgc2VhcmNoZWQgZm9yIHRva2VucyAqL1xuZnVuY3Rpb24gc2hvdWxkU2VhcmNoUGFyZW50KGZsYWdzOiBJbmplY3RGbGFncywgaXNGaXJzdEhvc3RUTm9kZTogYm9vbGVhbik6IGJvb2xlYW58bnVtYmVyIHtcbiAgcmV0dXJuICEoZmxhZ3MgJiBJbmplY3RGbGFncy5TZWxmKSAmJiAhKGZsYWdzICYgSW5qZWN0RmxhZ3MuSG9zdCAmJiBpc0ZpcnN0SG9zdFROb2RlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE5vZGVJbmplY3RvckxWaWV3KG5vZGVJbmplY3RvcjogTm9kZUluamVjdG9yKTogTFZpZXcge1xuICByZXR1cm4gKG5vZGVJbmplY3RvciBhcyBhbnkpLl9sVmlldyBhcyBMVmlldztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE5vZGVJbmplY3RvclROb2RlKG5vZGVJbmplY3RvcjogTm9kZUluamVjdG9yKTogVEVsZW1lbnROb2RlfFRDb250YWluZXJOb2RlfFxuICAgIFRFbGVtZW50Q29udGFpbmVyTm9kZXxudWxsIHtcbiAgcmV0dXJuIChub2RlSW5qZWN0b3IgYXMgYW55KS5fdE5vZGUgYXMgVEVsZW1lbnROb2RlIHwgVENvbnRhaW5lck5vZGUgfCBURWxlbWVudENvbnRhaW5lck5vZGUgfFxuICAgICAgbnVsbDtcbn1cblxuZXhwb3J0IGNsYXNzIE5vZGVJbmplY3RvciBpbXBsZW1lbnRzIEluamVjdG9yIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF90Tm9kZTogVEVsZW1lbnROb2RlfFRDb250YWluZXJOb2RlfFRFbGVtZW50Q29udGFpbmVyTm9kZXxudWxsLFxuICAgICAgcHJpdmF0ZSBfbFZpZXc6IExWaWV3KSB7fVxuXG4gIGdldCh0b2tlbjogYW55LCBub3RGb3VuZFZhbHVlPzogYW55LCBmbGFncz86IEluamVjdEZsYWdzfEluamVjdE9wdGlvbnMpOiBhbnkge1xuICAgIHJldHVybiBnZXRPckNyZWF0ZUluamVjdGFibGUoXG4gICAgICAgIHRoaXMuX3ROb2RlLCB0aGlzLl9sVmlldywgdG9rZW4sIGNvbnZlcnRUb0JpdEZsYWdzKGZsYWdzKSwgbm90Rm91bmRWYWx1ZSk7XG4gIH1cbn1cblxuLyoqIENyZWF0ZXMgYSBgTm9kZUluamVjdG9yYCBmb3IgdGhlIGN1cnJlbnQgbm9kZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVOb2RlSW5qZWN0b3IoKTogSW5qZWN0b3Ige1xuICByZXR1cm4gbmV3IE5vZGVJbmplY3RvcihnZXRDdXJyZW50VE5vZGUoKSEgYXMgVERpcmVjdGl2ZUhvc3ROb2RlLCBnZXRMVmlldygpKSBhcyBhbnk7XG59XG5cbi8qKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVnZXRJbmhlcml0ZWRGYWN0b3J5PFQ+KHR5cGU6IFR5cGU8YW55Pik6ICh0eXBlOiBUeXBlPFQ+KSA9PiBUIHtcbiAgcmV0dXJuIG5vU2lkZUVmZmVjdHMoKCkgPT4ge1xuICAgIGNvbnN0IG93bkNvbnN0cnVjdG9yID0gdHlwZS5wcm90b3R5cGUuY29uc3RydWN0b3I7XG4gICAgY29uc3Qgb3duRmFjdG9yeSA9IG93bkNvbnN0cnVjdG9yW05HX0ZBQ1RPUllfREVGXSB8fCBnZXRGYWN0b3J5T2Yob3duQ29uc3RydWN0b3IpO1xuICAgIGNvbnN0IG9iamVjdFByb3RvdHlwZSA9IE9iamVjdC5wcm90b3R5cGU7XG4gICAgbGV0IHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0eXBlLnByb3RvdHlwZSkuY29uc3RydWN0b3I7XG5cbiAgICAvLyBHbyB1cCB0aGUgcHJvdG90eXBlIHVudGlsIHdlIGhpdCBgT2JqZWN0YC5cbiAgICB3aGlsZSAocGFyZW50ICYmIHBhcmVudCAhPT0gb2JqZWN0UHJvdG90eXBlKSB7XG4gICAgICBjb25zdCBmYWN0b3J5ID0gcGFyZW50W05HX0ZBQ1RPUllfREVGXSB8fCBnZXRGYWN0b3J5T2YocGFyZW50KTtcblxuICAgICAgLy8gSWYgd2UgaGl0IHNvbWV0aGluZyB0aGF0IGhhcyBhIGZhY3RvcnkgYW5kIHRoZSBmYWN0b3J5IGlzbid0IHRoZSBzYW1lIGFzIHRoZSB0eXBlLFxuICAgICAgLy8gd2UndmUgZm91bmQgdGhlIGluaGVyaXRlZCBmYWN0b3J5LiBOb3RlIHRoZSBjaGVjayB0aGF0IHRoZSBmYWN0b3J5IGlzbid0IHRoZSB0eXBlJ3NcbiAgICAgIC8vIG93biBmYWN0b3J5IGlzIHJlZHVuZGFudCBpbiBtb3N0IGNhc2VzLCBidXQgaWYgdGhlIHVzZXIgaGFzIGN1c3RvbSBkZWNvcmF0b3JzIG9uIHRoZVxuICAgICAgLy8gY2xhc3MsIHRoaXMgbG9va3VwIHdpbGwgc3RhcnQgb25lIGxldmVsIGRvd24gaW4gdGhlIHByb3RvdHlwZSBjaGFpbiwgY2F1c2luZyB1cyB0b1xuICAgICAgLy8gZmluZCB0aGUgb3duIGZhY3RvcnkgZmlyc3QgYW5kIHBvdGVudGlhbGx5IHRyaWdnZXJpbmcgYW4gaW5maW5pdGUgbG9vcCBkb3duc3RyZWFtLlxuICAgICAgaWYgKGZhY3RvcnkgJiYgZmFjdG9yeSAhPT0gb3duRmFjdG9yeSkge1xuICAgICAgICByZXR1cm4gZmFjdG9yeTtcbiAgICAgIH1cblxuICAgICAgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHBhcmVudCk7XG4gICAgfVxuXG4gICAgLy8gVGhlcmUgaXMgbm8gZmFjdG9yeSBkZWZpbmVkLiBFaXRoZXIgdGhpcyB3YXMgaW1wcm9wZXIgdXNhZ2Ugb2YgaW5oZXJpdGFuY2VcbiAgICAvLyAobm8gQW5ndWxhciBkZWNvcmF0b3Igb24gdGhlIHN1cGVyY2xhc3MpIG9yIHRoZXJlIGlzIG5vIGNvbnN0cnVjdG9yIGF0IGFsbFxuICAgIC8vIGluIHRoZSBpbmhlcml0YW5jZSBjaGFpbi4gU2luY2UgdGhlIHR3byBjYXNlcyBjYW5ub3QgYmUgZGlzdGluZ3Vpc2hlZCwgdGhlXG4gICAgLy8gbGF0dGVyIGhhcyB0byBiZSBhc3N1bWVkLlxuICAgIHJldHVybiAodDogVHlwZTxUPikgPT4gbmV3IHQoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldEZhY3RvcnlPZjxUPih0eXBlOiBUeXBlPGFueT4pOiAoKHR5cGU/OiBUeXBlPFQ+KSA9PiBUIHwgbnVsbCl8bnVsbCB7XG4gIGlmIChpc0ZvcndhcmRSZWYodHlwZSkpIHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgZmFjdG9yeSA9IGdldEZhY3RvcnlPZjxUPihyZXNvbHZlRm9yd2FyZFJlZih0eXBlKSk7XG4gICAgICByZXR1cm4gZmFjdG9yeSAmJiBmYWN0b3J5KCk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZ2V0RmFjdG9yeURlZjxUPih0eXBlKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgdmFsdWUgZnJvbSB0aGUgY2xvc2VzdCBlbWJlZGRlZCBvciBub2RlIGluamVjdG9yLlxuICpcbiAqIEBwYXJhbSB0Tm9kZSBUaGUgTm9kZSB3aGVyZSB0aGUgc2VhcmNoIGZvciB0aGUgaW5qZWN0b3Igc2hvdWxkIHN0YXJ0XG4gKiBAcGFyYW0gbFZpZXcgVGhlIGBMVmlld2AgdGhhdCBjb250YWlucyB0aGUgYHROb2RlYFxuICogQHBhcmFtIHRva2VuIFRoZSB0b2tlbiB0byBsb29rIGZvclxuICogQHBhcmFtIGZsYWdzIEluamVjdGlvbiBmbGFnc1xuICogQHBhcmFtIG5vdEZvdW5kVmFsdWUgVGhlIHZhbHVlIHRvIHJldHVybiB3aGVuIHRoZSBpbmplY3Rpb24gZmxhZ3MgaXMgYEluamVjdEZsYWdzLk9wdGlvbmFsYFxuICogQHJldHVybnMgdGhlIHZhbHVlIGZyb20gdGhlIGluamVjdG9yLCBgbnVsbGAgd2hlbiBub3QgZm91bmQsIG9yIGBub3RGb3VuZFZhbHVlYCBpZiBwcm92aWRlZFxuICovXG5mdW5jdGlvbiBsb29rdXBUb2tlblVzaW5nRW1iZWRkZWRJbmplY3RvcjxUPihcbiAgICB0Tm9kZTogVERpcmVjdGl2ZUhvc3ROb2RlLCBsVmlldzogTFZpZXcsIHRva2VuOiBQcm92aWRlclRva2VuPFQ+LCBmbGFnczogSW5qZWN0RmxhZ3MsXG4gICAgbm90Rm91bmRWYWx1ZT86IGFueSkge1xuICBsZXQgY3VycmVudFROb2RlOiBURGlyZWN0aXZlSG9zdE5vZGV8bnVsbCA9IHROb2RlO1xuICBsZXQgY3VycmVudExWaWV3OiBMVmlld3xudWxsID0gbFZpZXc7XG5cbiAgLy8gV2hlbiBhbiBMVmlldyB3aXRoIGFuIGVtYmVkZGVkIHZpZXcgaW5qZWN0b3IgaXMgaW5zZXJ0ZWQsIGl0J2xsIGxpa2VseSBiZSBpbnRlcmxhY2VkIHdpdGhcbiAgLy8gbm9kZXMgd2hvIG1heSBoYXZlIGluamVjdG9ycyAoZS5nLiBub2RlIGluamVjdG9yIC0+IGVtYmVkZGVkIHZpZXcgaW5qZWN0b3IgLT4gbm9kZSBpbmplY3RvcikuXG4gIC8vIFNpbmNlIHRoZSBibG9vbSBmaWx0ZXJzIGZvciB0aGUgbm9kZSBpbmplY3RvcnMgaGF2ZSBhbHJlYWR5IGJlZW4gY29uc3RydWN0ZWQgYW5kIHdlIGRvbid0XG4gIC8vIGhhdmUgYSB3YXkgb2YgZXh0cmFjdGluZyB0aGUgcmVjb3JkcyBmcm9tIGFuIGluamVjdG9yLCB0aGUgb25seSB3YXkgdG8gbWFpbnRhaW4gdGhlIGNvcnJlY3RcbiAgLy8gaGllcmFyY2h5IHdoZW4gcmVzb2x2aW5nIHRoZSB2YWx1ZSBpcyB0byB3YWxrIGl0IG5vZGUtYnktbm9kZSB3aGlsZSBhdHRlbXB0aW5nIHRvIHJlc29sdmVcbiAgLy8gdGhlIHRva2VuIGF0IGVhY2ggbGV2ZWwuXG4gIHdoaWxlIChjdXJyZW50VE5vZGUgIT09IG51bGwgJiYgY3VycmVudExWaWV3ICE9PSBudWxsICYmXG4gICAgICAgICAoY3VycmVudExWaWV3W0ZMQUdTXSAmIExWaWV3RmxhZ3MuSGFzRW1iZWRkZWRWaWV3SW5qZWN0b3IpICYmXG4gICAgICAgICAhKGN1cnJlbnRMVmlld1tGTEFHU10gJiBMVmlld0ZsYWdzLklzUm9vdCkpIHtcbiAgICBuZ0Rldk1vZGUgJiYgYXNzZXJ0VE5vZGVGb3JMVmlldyhjdXJyZW50VE5vZGUsIGN1cnJlbnRMVmlldyk7XG5cbiAgICAvLyBOb3RlIHRoYXQgdGhpcyBsb29rdXAgb24gdGhlIG5vZGUgaW5qZWN0b3IgaXMgdXNpbmcgdGhlIGBTZWxmYCBmbGFnLCBiZWNhdXNlXG4gICAgLy8gd2UgZG9uJ3Qgd2FudCB0aGUgbm9kZSBpbmplY3RvciB0byBsb29rIGF0IGFueSBwYXJlbnQgaW5qZWN0b3JzIHNpbmNlIHdlXG4gICAgLy8gbWF5IGhpdCB0aGUgZW1iZWRkZWQgdmlldyBpbmplY3RvciBmaXJzdC5cbiAgICBjb25zdCBub2RlSW5qZWN0b3JWYWx1ZSA9IGxvb2t1cFRva2VuVXNpbmdOb2RlSW5qZWN0b3IoXG4gICAgICAgIGN1cnJlbnRUTm9kZSwgY3VycmVudExWaWV3LCB0b2tlbiwgZmxhZ3MgfCBJbmplY3RGbGFncy5TZWxmLCBOT1RfRk9VTkQpO1xuICAgIGlmIChub2RlSW5qZWN0b3JWYWx1ZSAhPT0gTk9UX0ZPVU5EKSB7XG4gICAgICByZXR1cm4gbm9kZUluamVjdG9yVmFsdWU7XG4gICAgfVxuXG4gICAgLy8gSGFzIGFuIGV4cGxpY2l0IHR5cGUgZHVlIHRvIGEgVFMgYnVnOiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzMzMTkxXG4gICAgbGV0IHBhcmVudFROb2RlOiBURWxlbWVudE5vZGV8VENvbnRhaW5lck5vZGV8bnVsbCA9IGN1cnJlbnRUTm9kZS5wYXJlbnQ7XG5cbiAgICAvLyBgVE5vZGUucGFyZW50YCBpbmNsdWRlcyB0aGUgcGFyZW50IHdpdGhpbiB0aGUgY3VycmVudCB2aWV3IG9ubHkuIElmIGl0IGRvZXNuJ3QgZXhpc3QsXG4gICAgLy8gaXQgbWVhbnMgdGhhdCB3ZSd2ZSBoaXQgdGhlIHZpZXcgYm91bmRhcnkgYW5kIHdlIG5lZWQgdG8gZ28gdXAgdG8gdGhlIG5leHQgdmlldy5cbiAgICBpZiAoIXBhcmVudFROb2RlKSB7XG4gICAgICAvLyBCZWZvcmUgd2UgZ28gdG8gdGhlIG5leHQgTFZpZXcsIGNoZWNrIGlmIHRoZSB0b2tlbiBleGlzdHMgb24gdGhlIGN1cnJlbnQgZW1iZWRkZWQgaW5qZWN0b3IuXG4gICAgICBjb25zdCBlbWJlZGRlZFZpZXdJbmplY3RvciA9IGN1cnJlbnRMVmlld1tFTUJFRERFRF9WSUVXX0lOSkVDVE9SXTtcbiAgICAgIGlmIChlbWJlZGRlZFZpZXdJbmplY3Rvcikge1xuICAgICAgICBjb25zdCBlbWJlZGRlZFZpZXdJbmplY3RvclZhbHVlID1cbiAgICAgICAgICAgIGVtYmVkZGVkVmlld0luamVjdG9yLmdldCh0b2tlbiwgTk9UX0ZPVU5EIGFzIFQgfCB7fSwgZmxhZ3MpO1xuICAgICAgICBpZiAoZW1iZWRkZWRWaWV3SW5qZWN0b3JWYWx1ZSAhPT0gTk9UX0ZPVU5EKSB7XG4gICAgICAgICAgcmV0dXJuIGVtYmVkZGVkVmlld0luamVjdG9yVmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gT3RoZXJ3aXNlIGtlZXAgZ29pbmcgdXAgdGhlIHRyZWUuXG4gICAgICBwYXJlbnRUTm9kZSA9IGdldFROb2RlRnJvbUxWaWV3KGN1cnJlbnRMVmlldyk7XG4gICAgICBjdXJyZW50TFZpZXcgPSBjdXJyZW50TFZpZXdbREVDTEFSQVRJT05fVklFV107XG4gICAgfVxuXG4gICAgY3VycmVudFROb2RlID0gcGFyZW50VE5vZGU7XG4gIH1cblxuICByZXR1cm4gbm90Rm91bmRWYWx1ZTtcbn1cblxuLyoqIEdldHMgdGhlIFROb2RlIGFzc29jaWF0ZWQgd2l0aCBhbiBMVmlldyBpbnNpZGUgb2YgdGhlIGRlY2xhcmF0aW9uIHZpZXcuICovXG5mdW5jdGlvbiBnZXRUTm9kZUZyb21MVmlldyhsVmlldzogTFZpZXcpOiBURWxlbWVudE5vZGV8VEVsZW1lbnRDb250YWluZXJOb2RlfG51bGwge1xuICBjb25zdCB0VmlldyA9IGxWaWV3W1RWSUVXXTtcbiAgY29uc3QgdFZpZXdUeXBlID0gdFZpZXcudHlwZTtcblxuICAvLyBUaGUgcGFyZW50IHBvaW50ZXIgZGlmZmVycyBiYXNlZCBvbiBgVFZpZXcudHlwZWAuXG4gIGlmICh0Vmlld1R5cGUgPT09IFRWaWV3VHlwZS5FbWJlZGRlZCkge1xuICAgIG5nRGV2TW9kZSAmJiBhc3NlcnREZWZpbmVkKHRWaWV3LmRlY2xUTm9kZSwgJ0VtYmVkZGVkIFROb2RlcyBzaG91bGQgaGF2ZSBkZWNsYXJhdGlvbiBwYXJlbnRzLicpO1xuICAgIHJldHVybiB0Vmlldy5kZWNsVE5vZGUgYXMgVEVsZW1lbnRDb250YWluZXJOb2RlO1xuICB9IGVsc2UgaWYgKHRWaWV3VHlwZSA9PT0gVFZpZXdUeXBlLkNvbXBvbmVudCkge1xuICAgIC8vIENvbXBvbmVudHMgZG9uJ3QgaGF2ZSBgVFZpZXcuZGVjbFROb2RlYCBiZWNhdXNlIGVhY2ggaW5zdGFuY2Ugb2YgY29tcG9uZW50IGNvdWxkIGJlXG4gICAgLy8gaW5zZXJ0ZWQgaW4gZGlmZmVyZW50IGxvY2F0aW9uLCBoZW5jZSBgVFZpZXcuZGVjbFROb2RlYCBpcyBtZWFuaW5nbGVzcy5cbiAgICByZXR1cm4gbFZpZXdbVF9IT1NUXSBhcyBURWxlbWVudE5vZGU7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cbiJdfQ==