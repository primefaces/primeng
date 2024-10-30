/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ENVIRONMENT_INITIALIZER } from '../../di/initializer_token';
import { getInjectorDef } from '../../di/interface/defs';
import { INJECTOR_DEF_TYPES } from '../../di/internal_tokens';
import { NullInjector } from '../../di/null_injector';
import { walkProviderTree } from '../../di/provider_collection';
import { EnvironmentInjector, R3Injector } from '../../di/r3_injector';
import { NgModuleRef as viewEngine_NgModuleRef } from '../../linker/ng_module_factory';
import { deepForEach } from '../../util/array_utils';
import { throwError } from '../../util/assert';
import { assertTNode, assertTNodeForLView } from '../assert';
import { ChainedInjector } from '../component_ref';
import { getFrameworkDIDebugData } from '../debug/framework_injector_profiler';
import { getComponentDef } from '../definition';
import { getNodeInjectorLView, getNodeInjectorTNode, getParentInjectorLocation, NodeInjector } from '../di';
import { INJECTOR, TVIEW } from '../interfaces/view';
import { getParentInjectorIndex, getParentInjectorView, hasParentInjector } from './injector_utils';
import { getNativeByTNode } from './view_utils';
/**
 * Discovers the dependencies of an injectable instance. Provides DI information about each
 * dependency that the injectable was instantiated with, including where they were provided from.
 *
 * @param injector An injector instance
 * @param token a DI token that was constructed by the given injector instance
 * @returns an object that contains the created instance of token as well as all of the dependencies
 * that it was instantiated with OR undefined if the token was not created within the given
 * injector.
 */
export function getDependenciesFromInjectable(injector, token) {
    // First we check to see if the token given maps to an actual instance in the injector given.
    // We use `self: true` because we only want to look at the injector we were given.
    // We use `optional: true` because it's possible that the token we were given was never
    // constructed by the injector we were given.
    const instance = injector.get(token, null, { self: true, optional: true });
    if (instance === null) {
        throw new Error(`Unable to determine instance of ${token} in given injector`);
    }
    const unformattedDependencies = getDependenciesForTokenInInjector(token, injector);
    const resolutionPath = getInjectorResolutionPath(injector);
    const dependencies = unformattedDependencies.map(dep => {
        // injectedIn contains private fields, so we omit it from the response
        const formattedDependency = {
            value: dep.value,
        };
        // convert injection flags to booleans
        const flags = dep.flags;
        formattedDependency.flags = {
            optional: (8 /* InternalInjectFlags.Optional */ & flags) === 8 /* InternalInjectFlags.Optional */,
            host: (1 /* InternalInjectFlags.Host */ & flags) === 1 /* InternalInjectFlags.Host */,
            self: (2 /* InternalInjectFlags.Self */ & flags) === 2 /* InternalInjectFlags.Self */,
            skipSelf: (4 /* InternalInjectFlags.SkipSelf */ & flags) === 4 /* InternalInjectFlags.SkipSelf */,
        };
        // find the injector that provided the dependency
        for (let i = 0; i < resolutionPath.length; i++) {
            const injectorToCheck = resolutionPath[i];
            // if skipSelf is true we skip the first injector
            if (i === 0 && formattedDependency.flags.skipSelf) {
                continue;
            }
            // host only applies to NodeInjectors
            if (formattedDependency.flags.host && injectorToCheck instanceof EnvironmentInjector) {
                break;
            }
            const instance = injectorToCheck.get(dep.token, null, { self: true, optional: true });
            if (instance !== null) {
                // if host flag is true we double check that we can get the service from the first element
                // in the resolution path by using the host flag. This is done to make sure that we've found
                // the correct providing injector, and not a node injector that is connected to our path via
                // a router outlet.
                if (formattedDependency.flags.host) {
                    const firstInjector = resolutionPath[0];
                    const lookupFromFirstInjector = firstInjector.get(dep.token, null, { ...formattedDependency.flags, optional: true });
                    if (lookupFromFirstInjector !== null) {
                        formattedDependency.providedIn = injectorToCheck;
                    }
                    break;
                }
                formattedDependency.providedIn = injectorToCheck;
                break;
            }
            // if self is true we stop after the first injector
            if (i === 0 && formattedDependency.flags.self) {
                break;
            }
        }
        if (dep.token)
            formattedDependency.token = dep.token;
        return formattedDependency;
    });
    return { instance, dependencies };
}
function getDependenciesForTokenInInjector(token, injector) {
    const { resolverToTokenToDependencies } = getFrameworkDIDebugData();
    if (!(injector instanceof NodeInjector)) {
        return resolverToTokenToDependencies.get(injector)?.get?.(token) ?? [];
    }
    const lView = getNodeInjectorLView(injector);
    const tokenDependencyMap = resolverToTokenToDependencies.get(lView);
    const dependencies = tokenDependencyMap?.get(token) ?? [];
    // In the NodeInjector case, all injections for every node are stored in the same lView.
    // We use the injectedIn field of the dependency to filter out the dependencies that
    // do not come from the same node as the instance we're looking at.
    return dependencies.filter(dependency => {
        const dependencyNode = dependency.injectedIn?.tNode;
        if (dependencyNode === undefined) {
            return false;
        }
        const instanceNode = getNodeInjectorTNode(injector);
        assertTNode(dependencyNode);
        assertTNode(instanceNode);
        return dependencyNode === instanceNode;
    });
}
/**
 * Gets the class associated with an injector that contains a provider `imports` array in it's
 * definition
 *
 * For Module Injectors this returns the NgModule constructor.
 *
 * For Standalone injectors this returns the standalone component constructor.
 *
 * @param injector Injector an injector instance
 * @returns the constructor where the `imports` array that configures this injector is located
 */
function getProviderImportsContainer(injector) {
    const { standaloneInjectorToComponent } = getFrameworkDIDebugData();
    // standalone components configure providers through a component def, so we have to
    // use the standalone component associated with this injector if Injector represents
    // a standalone components EnvironmentInjector
    if (standaloneInjectorToComponent.has(injector)) {
        return standaloneInjectorToComponent.get(injector);
    }
    // Module injectors configure providers through their NgModule def, so we use the
    // injector to lookup its NgModuleRef and through that grab its instance
    const defTypeRef = injector.get(viewEngine_NgModuleRef, null, { self: true, optional: true });
    // If we can't find an associated imports container, return null.
    // This could be the case if this function is called with an R3Injector that does not represent
    // a standalone component or NgModule.
    if (defTypeRef === null) {
        return null;
    }
    // In standalone applications, the root environment injector created by bootstrapApplication
    // may have no associated "instance".
    if (defTypeRef.instance === null) {
        return null;
    }
    return defTypeRef.instance.constructor;
}
/**
 * Gets the providers configured on a NodeInjector
 *
 * @param injector A NodeInjector instance
 * @returns ProviderRecord[] an array of objects representing the providers configured on this
 *     injector
 */
function getNodeInjectorProviders(injector) {
    const diResolver = getNodeInjectorTNode(injector);
    const { resolverToProviders } = getFrameworkDIDebugData();
    return resolverToProviders.get(diResolver) ?? [];
}
/**
 * Gets a mapping of providers configured on an injector to their import paths
 *
 * ModuleA -> imports ModuleB
 * ModuleB -> imports ModuleC
 * ModuleB -> provides MyServiceA
 * ModuleC -> provides MyServiceB
 *
 * getProviderImportPaths(ModuleA)
 * > Map(2) {
 *   MyServiceA => [ModuleA, ModuleB]
 *   MyServiceB => [ModuleA, ModuleB, ModuleC]
 *  }
 *
 * @param providerImportsContainer constructor of class that contains an `imports` array in it's
 *     definition
 * @returns A Map object that maps providers to an array of constructors representing it's import
 *     path
 *
 */
function getProviderImportPaths(providerImportsContainer) {
    const providerToPath = new Map();
    const visitedContainers = new Set();
    const visitor = walkProviderTreeToDiscoverImportPaths(providerToPath, visitedContainers);
    walkProviderTree(providerImportsContainer, visitor, [], new Set());
    return providerToPath;
}
/**
 *
 * Higher order function that returns a visitor for WalkProviderTree
 *
 * Takes in a Map and Set to keep track of the providers and containers
 * visited, so that we can discover the import paths of these providers
 * during the traversal.
 *
 * This visitor takes advantage of the fact that walkProviderTree performs a
 * postorder traversal of the provider tree for the passed in container. Because postorder
 * traversal recursively processes subtrees from leaf nodes until the traversal reaches the root,
 * we write a visitor that constructs provider import paths in reverse.
 *
 *
 * We use the visitedContainers set defined outside this visitor
 * because we want to run some logic only once for
 * each container in the tree. That logic can be described as:
 *
 *
 * 1. for each discovered_provider and discovered_path in the incomplete provider paths we've
 * already discovered
 * 2. get the first container in discovered_path
 * 3. if that first container is in the imports array of the container we're visiting
 *    Then the container we're visiting is also in the import path of discovered_provider, so we
 *    unshift discovered_path with the container we're currently visiting
 *
 *
 * Example Run:
 * ```
 *                 ┌──────────┐
 *                 │containerA│
 *      ┌─imports-─┤          ├──imports─┐
 *      │          │  provA   │          │
 *      │          │  provB   │          │
 *      │          └──────────┘          │
 *      │                                │
 *     ┌▼─────────┐             ┌────────▼─┐
 *     │containerB│             │containerC│
 *     │          │             │          │
 *     │  provD   │             │  provF   │
 *     │  provE   │             │  provG   │
 *     └──────────┘             └──────────┘
 * ```
 *
 * Each step of the traversal,
 *
 * ```
 * visitor(provD, containerB)
 * providerToPath === Map { provD => [containerB] }
 * visitedContainers === Set { containerB }
 *
 * visitor(provE, containerB)
 * providerToPath === Map { provD => [containerB], provE => [containerB] }
 * visitedContainers === Set { containerB }
 *
 * visitor(provF, containerC)
 * providerToPath === Map { provD => [containerB], provE => [containerB], provF => [containerC] }
 * visitedContainers === Set { containerB, containerC }
 *
 * visitor(provG, containerC)
 * providerToPath === Map {
 *   provD => [containerB], provE => [containerB], provF => [containerC], provG => [containerC]
 * }
 * visitedContainers === Set { containerB, containerC }
 *
 * visitor(provA, containerA)
 * providerToPath === Map {
 *   provD => [containerA, containerB],
 *   provE => [containerA, containerB],
 *   provF => [containerA, containerC],
 *   provG => [containerA, containerC],
 *   provA => [containerA]
 * }
 * visitedContainers === Set { containerB, containerC, containerA }
 *
 * visitor(provB, containerA)
 * providerToPath === Map {
 *   provD => [containerA, containerB],
 *   provE => [containerA, containerB],
 *   provF => [containerA, containerC],
 *   provG => [containerA, containerC],
 *   provA => [containerA]
 *   provB => [containerA]
 * }
 * visitedContainers === Set { containerB, containerC, containerA }
 * ```
 *
 * @param providerToPath Map map of providers to paths that this function fills
 * @param visitedContainers Set a set to keep track of the containers we've already visited
 * @return function(provider SingleProvider, container: Type<unknown> | InjectorType<unknown>) =>
 *     void
 */
function walkProviderTreeToDiscoverImportPaths(providerToPath, visitedContainers) {
    return (provider, container) => {
        // If the provider is not already in the providerToPath map,
        // add an entry with the provider as the key and an array containing the current container as
        // the value
        if (!providerToPath.has(provider)) {
            providerToPath.set(provider, [container]);
        }
        // This block will run exactly once for each container in the import tree.
        // This is where we run the logic to check the imports array of the current
        // container to see if it's the next container in the path for our currently
        // discovered providers.
        if (!visitedContainers.has(container)) {
            // Iterate through the providers we've already seen
            for (const prov of providerToPath.keys()) {
                const existingImportPath = providerToPath.get(prov);
                let containerDef = getInjectorDef(container);
                if (!containerDef) {
                    const ngModule = container.ngModule;
                    containerDef = getInjectorDef(ngModule);
                }
                if (!containerDef) {
                    return;
                }
                const lastContainerAddedToPath = existingImportPath[0];
                let isNextStepInPath = false;
                deepForEach(containerDef.imports, (moduleImport) => {
                    if (isNextStepInPath) {
                        return;
                    }
                    isNextStepInPath = moduleImport.ngModule === lastContainerAddedToPath ||
                        moduleImport === lastContainerAddedToPath;
                    if (isNextStepInPath) {
                        providerToPath.get(prov)?.unshift(container);
                    }
                });
            }
        }
        visitedContainers.add(container);
    };
}
/**
 * Gets the providers configured on an EnvironmentInjector
 *
 * @param injector EnvironmentInjector
 * @returns an array of objects representing the providers of the given injector
 */
function getEnvironmentInjectorProviders(injector) {
    const providerRecordsWithoutImportPaths = getFrameworkDIDebugData().resolverToProviders.get(injector) ?? [];
    // platform injector has no provider imports container so can we skip trying to
    // find import paths
    if (isPlatformInjector(injector)) {
        return providerRecordsWithoutImportPaths;
    }
    const providerImportsContainer = getProviderImportsContainer(injector);
    if (providerImportsContainer === null) {
        // We assume that if an environment injector exists without an associated provider imports
        // container, it was created without such a container. Some examples cases where this could
        // happen:
        // - The root injector of a standalone application
        // - A router injector created by using the providers array in a lazy loaded route
        // - A manually created injector that is attached to the injector tree
        // Since each of these cases has no provider container, there is no concept of import paths,
        // so we can simply return the provider records.
        return providerRecordsWithoutImportPaths;
    }
    const providerToPath = getProviderImportPaths(providerImportsContainer);
    const providerRecords = [];
    for (const providerRecord of providerRecordsWithoutImportPaths) {
        const provider = providerRecord.provider;
        // Ignore these special providers for now until we have a cleaner way of
        // determing when they are provided by the framework vs provided by the user.
        const token = provider.provide;
        if (token === ENVIRONMENT_INITIALIZER || token === INJECTOR_DEF_TYPES) {
            continue;
        }
        let importPath = providerToPath.get(provider) ?? [];
        const def = getComponentDef(providerImportsContainer);
        const isStandaloneComponent = !!def?.standalone;
        // We prepend the component constructor in the standalone case
        // because walkProviderTree does not visit this constructor during it's traversal
        if (isStandaloneComponent) {
            importPath = [providerImportsContainer, ...importPath];
        }
        providerRecords.push({ ...providerRecord, importPath });
    }
    return providerRecords;
}
function isPlatformInjector(injector) {
    return injector instanceof R3Injector && injector.scopes.has('platform');
}
/**
 * Gets the providers configured on an injector.
 *
 * @param injector the injector to lookup the providers of
 * @returns ProviderRecord[] an array of objects representing the providers of the given injector
 */
export function getInjectorProviders(injector) {
    if (injector instanceof NodeInjector) {
        return getNodeInjectorProviders(injector);
    }
    else if (injector instanceof EnvironmentInjector) {
        return getEnvironmentInjectorProviders(injector);
    }
    throwError('getInjectorProviders only supports NodeInjector and EnvironmentInjector');
}
/**
 *
 * Given an injector, this function will return
 * an object containing the type and source of the injector.
 *
 * |              | type        | source                                                      |
 * |--------------|-------------|-------------------------------------------------------------|
 * | NodeInjector | element     | DOM element that created this injector                      |
 * | R3Injector   | environment | `injector.source`                                           |
 * | NullInjector | null        | null                                                        |
 *
 * @param injector the Injector to get metadata for
 * @returns an object containing the type and source of the given injector. If the injector metadata
 *     cannot be determined, returns null.
 */
export function getInjectorMetadata(injector) {
    if (injector instanceof NodeInjector) {
        const lView = getNodeInjectorLView(injector);
        const tNode = getNodeInjectorTNode(injector);
        assertTNodeForLView(tNode, lView);
        return { type: 'element', source: getNativeByTNode(tNode, lView) };
    }
    if (injector instanceof R3Injector) {
        return { type: 'environment', source: injector.source ?? null };
    }
    if (injector instanceof NullInjector) {
        return { type: 'null', source: null };
    }
    return null;
}
export function getInjectorResolutionPath(injector) {
    const resolutionPath = [injector];
    getInjectorResolutionPathHelper(injector, resolutionPath);
    return resolutionPath;
}
function getInjectorResolutionPathHelper(injector, resolutionPath) {
    const parent = getInjectorParent(injector);
    // if getInjectorParent can't find a parent, then we've either reached the end
    // of the path, or we need to move from the Element Injector tree to the
    // module injector tree using the first injector in our path as the connection point.
    if (parent === null) {
        if (injector instanceof NodeInjector) {
            const firstInjector = resolutionPath[0];
            if (firstInjector instanceof NodeInjector) {
                const moduleInjector = getModuleInjectorOfNodeInjector(firstInjector);
                if (moduleInjector === null) {
                    throwError('NodeInjector must have some connection to the module injector tree');
                }
                resolutionPath.push(moduleInjector);
                getInjectorResolutionPathHelper(moduleInjector, resolutionPath);
            }
            return resolutionPath;
        }
    }
    else {
        resolutionPath.push(parent);
        getInjectorResolutionPathHelper(parent, resolutionPath);
    }
    return resolutionPath;
}
/**
 * Gets the parent of an injector.
 *
 * This function is not able to make the jump from the Element Injector Tree to the Module
 * injector tree. This is because the "parent" (the next step in the reoslution path)
 * of a root NodeInjector is dependent on which NodeInjector ancestor initiated
 * the DI lookup. See getInjectorResolutionPath for a function that can make this jump.
 *
 * In the below diagram:
 * ```ts
 * getInjectorParent(NodeInjectorB)
 *  > NodeInjectorA
 * getInjectorParent(NodeInjectorA) // or getInjectorParent(getInjectorParent(NodeInjectorB))
 *  > null // cannot jump to ModuleInjector tree
 * ```
 *
 * ```
 *                ┌───────┐                ┌───────────────────┐
 *    ┌───────────┤ModuleA├───Injector────►│EnvironmentInjector│
 *    │           └───┬───┘                └───────────────────┘
 *    │               │
 *    │           bootstraps
 *    │               │
 *    │               │
 *    │          ┌────▼─────┐                 ┌─────────────┐
 * declares      │ComponentA├────Injector────►│NodeInjectorA│
 *    │          └────┬─────┘                 └─────▲───────┘
 *    │               │                             │
 *    │            renders                        parent
 *    │               │                             │
 *    │          ┌────▼─────┐                 ┌─────┴───────┐
 *    └─────────►│ComponentB├────Injector────►│NodeInjectorB│
 *               └──────────┘                 └─────────────┘
 *```
 *
 * @param injector an Injector to get the parent of
 * @returns Injector the parent of the given injector
 */
function getInjectorParent(injector) {
    if (injector instanceof R3Injector) {
        return injector.parent;
    }
    let tNode;
    let lView;
    if (injector instanceof NodeInjector) {
        tNode = getNodeInjectorTNode(injector);
        lView = getNodeInjectorLView(injector);
    }
    else if (injector instanceof NullInjector) {
        return null;
    }
    else if (injector instanceof ChainedInjector) {
        return injector.parentInjector;
    }
    else {
        throwError('getInjectorParent only support injectors of type R3Injector, NodeInjector, NullInjector, ChainedInjector');
    }
    const parentLocation = getParentInjectorLocation(tNode, lView);
    if (hasParentInjector(parentLocation)) {
        const parentInjectorIndex = getParentInjectorIndex(parentLocation);
        const parentLView = getParentInjectorView(parentLocation, lView);
        const parentTView = parentLView[TVIEW];
        const parentTNode = parentTView.data[parentInjectorIndex + 8 /* NodeInjectorOffset.TNODE */];
        return new NodeInjector(parentTNode, parentLView);
    }
    else {
        const chainedInjector = lView[INJECTOR];
        // Case where chainedInjector.injector is an OutletInjector and chainedInjector.injector.parent
        // is a NodeInjector.
        // todo(aleksanderbodurri): ideally nothing in packages/core should deal
        // directly with router concerns. Refactor this so that we can make the jump from
        // NodeInjector -> OutletInjector -> NodeInjector
        // without explictly relying on types contracts from packages/router
        const injectorParent = chainedInjector.injector?.parent;
        if (injectorParent instanceof NodeInjector) {
            return injectorParent;
        }
    }
    return null;
}
/**
 * Gets the module injector of a NodeInjector.
 *
 * @param injector NodeInjector to get module injector of
 * @returns Injector representing module injector of the given NodeInjector
 */
function getModuleInjectorOfNodeInjector(injector) {
    let lView;
    if (injector instanceof NodeInjector) {
        lView = getNodeInjectorLView(injector);
    }
    else {
        throwError('getModuleInjectorOfNodeInjector must be called with a NodeInjector');
    }
    const inj = lView[INJECTOR];
    const moduleInjector = (inj instanceof ChainedInjector) ? inj.parentInjector : inj.parent;
    if (!moduleInjector) {
        throwError('NodeInjector must have some connection to the module injector tree');
    }
    return moduleInjector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0b3JfZGlzY292ZXJ5X3V0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy91dGlsL2luamVjdG9yX2Rpc2NvdmVyeV91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUduRSxPQUFPLEVBQUMsY0FBYyxFQUFlLE1BQU0seUJBQXlCLENBQUM7QUFHckUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBaUIsZ0JBQWdCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUUsVUFBVSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFckUsT0FBTyxFQUFDLFdBQVcsSUFBSSxzQkFBc0IsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ3JGLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQWdCLFVBQVUsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzVELE9BQU8sRUFBQyxXQUFXLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDM0QsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBRTdFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUMsT0FBTyxFQUFDLG9CQUFvQixFQUFFLG9CQUFvQixFQUFFLHlCQUF5QixFQUFFLFlBQVksRUFBQyxNQUFNLE9BQU8sQ0FBQztBQUkxRyxPQUFPLEVBQUMsUUFBUSxF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R0FBRyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQWlDLENBQUM7SUFDNUQsTUFBTSxjQUFjLEdBQUcsQ0FBQyxHQUFHLFlBQVksZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDMUYsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3BCLFVBQVUsQ0FBQyxvRUFBb0UsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFRCxPQUFPLGNBQWMsQ0FBQztBQUN4QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RU5WSVJPTk1FTlRfSU5JVElBTElaRVJ9IGZyb20gJy4uLy4uL2RpL2luaXRpYWxpemVyX3Rva2VuJztcbmltcG9ydCB7SW5qZWN0aW9uVG9rZW59IGZyb20gJy4uLy4uL2RpL2luamVjdGlvbl90b2tlbic7XG5pbXBvcnQge0luamVjdG9yfSBmcm9tICcuLi8uLi9kaS9pbmplY3Rvcic7XG5pbXBvcnQge2dldEluamVjdG9yRGVmLCBJbmplY3RvclR5cGV9IGZyb20gJy4uLy4uL2RpL2ludGVyZmFjZS9kZWZzJztcbmltcG9ydCB7SW5qZWN0RmxhZ3MsIEludGVybmFsSW5qZWN0RmxhZ3N9IGZyb20gJy4uLy4uL2RpL2ludGVyZmFjZS9pbmplY3Rvcic7XG5pbXBvcnQge1ZhbHVlUHJvdmlkZXJ9IGZyb20gJy4uLy4uL2RpL2ludGVyZmFjZS9wcm92aWRlcic7XG5pbXBvcnQge0lOSkVDVE9SX0RFRl9UWVBFU30gZnJvbSAnLi4vLi4vZGkvaW50ZXJuYWxfdG9rZW5zJztcbmltcG9ydCB7TnVsbEluamVjdG9yfSBmcm9tICcuLi8uLi9kaS9udWxsX2luamVjdG9yJztcbmltcG9ydCB7U2luZ2xlUHJvdmlkZXIsIHdhbGtQcm92aWRlclRyZWV9IGZyb20gJy4uLy4uL2RpL3Byb3ZpZGVyX2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtFbnZpcm9ubWVudEluamVjdG9yLCBSM0luamVjdG9yfSBmcm9tICcuLi8uLi9kaS9yM19pbmplY3Rvcic7XG5pbXBvcnQge1R5cGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS90eXBlJztcbmltcG9ydCB7TmdNb2R1bGVSZWYgYXMgdmlld0VuZ2luZV9OZ01vZHVsZVJlZn0gZnJvbSAnLi4vLi4vbGlua2VyL25nX21vZHVsZV9mYWN0b3J5JztcbmltcG9ydCB7ZGVlcEZvckVhY2h9IGZyb20gJy4uLy4uL3V0aWwvYXJyYXlfdXRpbHMnO1xuaW1wb3J0IHthc3NlcnREZWZpbmVkLCB0aHJvd0Vycm9yfSBmcm9tICcuLi8uLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQge2Fzc2VydFROb2RlLCBhc3NlcnRUTm9kZUZvckxWaWV3fSBmcm9tICcuLi9hc3NlcnQnO1xuaW1wb3J0IHtDaGFpbmVkSW5qZWN0b3J9IGZyb20gJy4uL2NvbXBvbmVudF9yZWYnO1xuaW1wb3J0IHtnZXRGcmFtZXdvcmtESURlYnVnRGF0YX0gZnJvbSAnLi4vZGVidWcvZnJhbWV3b3JrX2luamVjdG9yX3Byb2ZpbGVyJztcbmltcG9ydCB7SW5qZWN0ZWRTZXJ2aWNlLCBQcm92aWRlclJlY29yZH0gZnJvbSAnLi4vZGVidWcvaW5qZWN0b3JfcHJvZmlsZXInO1xuaW1wb3J0IHtnZXRDb21wb25lbnREZWZ9IGZyb20gJy4uL2RlZmluaXRpb24nO1xuaW1wb3J0IHtnZXROb2RlSW5qZWN0b3JMVmlldywgZ2V0Tm9kZUluamVjdG9yVE5vZGUsIGdldFBhcmVudEluamVjdG9yTG9jYXRpb24sIE5vZGVJbmplY3Rvcn0gZnJvbSAnLi4vZGknO1xuaW1wb3J0IHtOb2RlSW5qZWN0b3JPZmZzZXR9IGZyb20gJy4uL2ludGVyZmFjZXMvaW5qZWN0b3InO1xuaW1wb3J0IHtUQ29udGFpbmVyTm9kZSwgVEVsZW1lbnRDb250YWluZXJOb2RlLCBURWxlbWVudE5vZGUsIFROb2RlfSBmcm9tICcuLi9pbnRlcmZhY2VzL25vZGUnO1xuaW1wb3J0IHtSRWxlbWVudH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZW5kZXJlcl9kb20nO1xuaW1wb3J0IHtJTkpFQ1RPUiwgTFZpZXcsIFRWSUVXfSBmcm9tICcuLi9pbnRlcmZhY2VzL3ZpZXcnO1xuXG5pbXBvcnQge2dldFBhcmVudEluamVjdG9ySW5kZXgsIGdldFBhcmVudEluamVjdG9yVmlldywgaGFzUGFyZW50SW5qZWN0b3J9IGZyb20gJy4vaW5qZWN0b3JfdXRpbHMnO1xuaW1wb3J0IHtnZXROYXRpdmVCeVROb2RlfSBmcm9tICcuL3ZpZXdfdXRpbHMnO1xuXG4vKipcbiAqIERpc2NvdmVycyB0aGUgZGVwZW5kZW5jaWVzIG9mIGFuIGluamVjdGFibGUgaW5zdGFuY2UuIFByb3ZpZGVzIERJIGluZm9ybWF0aW9uIGFib3V0IGVhY2hcbiAqIGRlcGVuZGVuY3kgdGhhdCB0aGUgaW5qZWN0YWJsZSB3YXMgaW5zdGFudGlhdGVkIHdpdGgsIGluY2x1ZGluZyB3aGVyZSB0aGV5IHdlcmUgcHJvdmlkZWQgZnJvbS5cbiAqXG4gKiBAcGFyYW0gaW5qZWN0b3IgQW4gaW5qZWN0b3IgaW5zdGFuY2VcbiAqIEBwYXJhbSB0b2tlbiBhIERJIHRva2VuIHRoYXQgd2FzIGNvbnN0cnVjdGVkIGJ5IHRoZSBnaXZlbiBpbmplY3RvciBpbnN0YW5jZVxuICogQHJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgdGhlIGNyZWF0ZWQgaW5zdGFuY2Ugb2YgdG9rZW4gYXMgd2VsbCBhcyBhbGwgb2YgdGhlIGRlcGVuZGVuY2llc1xuICogdGhhdCBpdCB3YXMgaW5zdGFudGlhdGVkIHdpdGggT1IgdW5kZWZpbmVkIGlmIHRoZSB0b2tlbiB3YXMgbm90IGNyZWF0ZWQgd2l0aGluIHRoZSBnaXZlblxuICogaW5qZWN0b3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREZXBlbmRlbmNpZXNGcm9tSW5qZWN0YWJsZTxUPihcbiAgICBpbmplY3RvcjogSW5qZWN0b3IsIHRva2VuOiBUeXBlPFQ+fEluamVjdGlvblRva2VuPFQ+KTpcbiAgICB7aW5zdGFuY2U6IFQ7IGRlcGVuZGVuY2llczogT21pdDxJbmplY3RlZFNlcnZpY2UsICdpbmplY3RlZEluJz5bXX18dW5kZWZpbmVkIHtcbiAgLy8gRmlyc3Qgd2UgY2hlY2sgdG8gc2VlIGlmIHRoZSB0b2tlbiBnaXZlbiBtYXBzIHRvIGFuIGFjdHVhbCBpbnN0YW5jZSBpbiB0aGUgaW5qZWN0b3IgZ2l2ZW4uXG4gIC8vIFdlIHVzZSBgc2VsZjogdHJ1ZWAgYmVjYXVzZSB3ZSBvbmx5IHdhbnQgdG8gbG9vayBhdCB0aGUgaW5qZWN0b3Igd2Ugd2VyZSBnaXZlbi5cbiAgLy8gV2UgdXNlIGBvcHRpb25hbDogdHJ1ZWAgYmVjYXVzZSBpdCdzIHBvc3NpYmxlIHRoYXQgdGhlIHRva2VuIHdlIHdlcmUgZ2l2ZW4gd2FzIG5ldmVyXG4gIC8vIGNvbnN0cnVjdGVkIGJ5IHRoZSBpbmplY3RvciB3ZSB3ZXJlIGdpdmVuLlxuICBjb25zdCBpbnN0YW5jZSA9IGluamVjdG9yLmdldCh0b2tlbiwgbnVsbCwge3NlbGY6IHRydWUsIG9wdGlvbmFsOiB0cnVlfSk7XG4gIGlmIChpbnN0YW5jZSA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgVW5hYmxlIHRvIGRldGVybWluZSBpbnN0YW5jZSBvZiAke3Rva2VufSBpbiBnaXZlbiBpbmplY3RvcmApO1xuICB9XG5cbiAgY29uc3QgdW5mb3JtYXR0ZWREZXBlbmRlbmNpZXMgPSBnZXREZXBlbmRlbmNpZXNGb3JUb2tlbkluSW5qZWN0b3IodG9rZW4sIGluamVjdG9yKTtcbiAgY29uc3QgcmVzb2x1dGlvblBhdGggPSBnZXRJbmplY3RvclJlc29sdXRpb25QYXRoKGluamVjdG9yKTtcblxuICBjb25zdCBkZXBlbmRlbmNpZXMgPSB1bmZvcm1hdHRlZERlcGVuZGVuY2llcy5tYXAoZGVwID0+IHtcbiAgICAvLyBpbmplY3RlZEluIGNvbnRhaW5zIHByaXZhdGUgZmllbGRzLCBzbyB3ZSBvbWl0IGl0IGZyb20gdGhlIHJlc3BvbnNlXG4gICAgY29uc3QgZm9ybWF0dGVkRGVwZW5kZW5jeTogT21pdDxJbmplY3RlZFNlcnZpY2UsICdpbmplY3RlZEluJz4gPSB7XG4gICAgICB2YWx1ZTogZGVwLnZhbHVlLFxuICAgIH07XG5cbiAgICAvLyBjb252ZXJ0IGluamVjdGlvbiBmbGFncyB0byBib29sZWFuc1xuICAgIGNvbnN0IGZsYWdzID0gZGVwLmZsYWdzIGFzIEludGVybmFsSW5qZWN0RmxhZ3M7XG4gICAgZm9ybWF0dGVkRGVwZW5kZW5jeS5mbGFncyA9IHtcbiAgICAgIG9wdGlvbmFsOiAoSW50ZXJuYWxJbmplY3RGbGFncy5PcHRpb25hbCAmIGZsYWdzKSA9PT0gSW50ZXJuYWxJbmplY3RGbGFncy5PcHRpb25hbCxcbiAgICAgIGhvc3Q6IChJbnRlcm5hbEluamVjdEZsYWdzLkhvc3QgJiBmbGFncykgPT09IEludGVybmFsSW5qZWN0RmxhZ3MuSG9zdCxcbiAgICAgIHNlbGY6IChJbnRlcm5hbEluamVjdEZsYWdzLlNlbGYgJiBmbGFncykgPT09IEludGVybmFsSW5qZWN0RmxhZ3MuU2VsZixcbiAgICAgIHNraXBTZWxmOiAoSW50ZXJuYWxJbmplY3RGbGFncy5Ta2lwU2VsZiAmIGZsYWdzKSA9PT0gSW50ZXJuYWxJbmplY3RGbGFncy5Ta2lwU2VsZixcbiAgICB9O1xuXG5cbiAgICAvLyBmaW5kIHRoZSBpbmplY3RvciB0aGF0IHByb3ZpZGVkIHRoZSBkZXBlbmRlbmN5XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXNvbHV0aW9uUGF0aC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgaW5qZWN0b3JUb0NoZWNrID0gcmVzb2x1dGlvblBhdGhbaV07XG5cbiAgICAgIC8vIGlmIHNraXBTZWxmIGlzIHRydWUgd2Ugc2tpcCB0aGUgZmlyc3QgaW5qZWN0b3JcbiAgICAgIGlmIChpID09PSAwICYmIGZvcm1hdHRlZERlcGVuZGVuY3kuZmxhZ3Muc2tpcFNlbGYpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGhvc3Qgb25seSBhcHBsaWVzIHRvIE5vZGVJbmplY3RvcnNcbiAgICAgIGlmIChmb3JtYXR0ZWREZXBlbmRlbmN5LmZsYWdzLmhvc3QgJiYgaW5qZWN0b3JUb0NoZWNrIGluc3RhbmNlb2YgRW52aXJvbm1lbnRJbmplY3Rvcikge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY29uc3QgaW5zdGFuY2UgPVxuICAgICAgICAgIGluamVjdG9yVG9DaGVjay5nZXQoZGVwLnRva2VuIGFzIFR5cGU8dW5rbm93bj4sIG51bGwsIHtzZWxmOiB0cnVlLCBvcHRpb25hbDogdHJ1ZX0pO1xuXG4gICAgICBpZiAoaW5zdGFuY2UgIT09IG51bGwpIHtcbiAgICAgICAgLy8gaWYgaG9zdCBmbGFnIGlzIHRydWUgd2UgZG91YmxlIGNoZWNrIHRoYXQgd2UgY2FuIGdldCB0aGUgc2VydmljZSBmcm9tIHRoZSBmaXJzdCBlbGVtZW50XG4gICAgICAgIC8vIGluIHRoZSByZXNvbHV0aW9uIHBhdGggYnkgdXNpbmcgdGhlIGhvc3QgZmxhZy4gVGhpcyBpcyBkb25lIHRvIG1ha2Ugc3VyZSB0aGF0IHdlJ3ZlIGZvdW5kXG4gICAgICAgIC8vIHRoZSBjb3JyZWN0IHByb3ZpZGluZyBpbmplY3RvciwgYW5kIG5vdCBhIG5vZGUgaW5qZWN0b3IgdGhhdCBpcyBjb25uZWN0ZWQgdG8gb3VyIHBhdGggdmlhXG4gICAgICAgIC8vIGEgcm91dGVyIG91dGxldC5cbiAgICAgICAgaWYgKGZvcm1hdHRlZERlcGVuZGVuY3kuZmxhZ3MuaG9zdCkge1xuICAgICAgICAgIGNvbnN0IGZpcnN0SW5qZWN0b3IgPSByZXNvbHV0aW9uUGF0aFswXTtcbiAgICAgICAgICBjb25zdCBsb29rdXBGcm9tRmlyc3RJbmplY3RvciA9IGZpcnN0SW5qZWN0b3IuZ2V0KFxuICAgICAgICAgICAgICBkZXAudG9rZW4gYXMgVHlwZTx1bmtub3duPiwgbnVsbCwgey4uLmZvcm1hdHRlZERlcGVuZGVuY3kuZmxhZ3MsIG9wdGlvbmFsOiB0cnVlfSk7XG5cbiAgICAgICAgICBpZiAobG9va3VwRnJvbUZpcnN0SW5qZWN0b3IgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGZvcm1hdHRlZERlcGVuZGVuY3kucHJvdmlkZWRJbiA9IGluamVjdG9yVG9DaGVjaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcm1hdHRlZERlcGVuZGVuY3kucHJvdmlkZWRJbiA9IGluamVjdG9yVG9DaGVjaztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIHNlbGYgaXMgdHJ1ZSB3ZSBzdG9wIGFmdGVyIHRoZSBmaXJzdCBpbmplY3RvclxuICAgICAgaWYgKGkgPT09IDAgJiYgZm9ybWF0dGVkRGVwZW5kZW5jeS5mbGFncy5zZWxmKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkZXAudG9rZW4pIGZvcm1hdHRlZERlcGVuZGVuY3kudG9rZW4gPSBkZXAudG9rZW47XG5cbiAgICByZXR1cm4gZm9ybWF0dGVkRGVwZW5kZW5jeTtcbiAgfSk7XG5cbiAgcmV0dXJuIHtpbnN0YW5jZSwgZGVwZW5kZW5jaWVzfTtcbn1cblxuZnVuY3Rpb24gZ2V0RGVwZW5kZW5jaWVzRm9yVG9rZW5JbkluamVjdG9yPFQ+KFxuICAgIHRva2VuOiBUeXBlPFQ+fEluamVjdGlvblRva2VuPFQ+LCBpbmplY3RvcjogSW5qZWN0b3IpOiBJbmplY3RlZFNlcnZpY2VbXSB7XG4gIGNvbnN0IHtyZXNvbHZlclRvVG9rZW5Ub0RlcGVuZGVuY2llc30gPSBnZXRGcmFtZXdvcmtESURlYnVnRGF0YSgpO1xuXG4gIGlmICghKGluamVjdG9yIGluc3RhbmNlb2YgTm9kZUluamVjdG9yKSkge1xuICAgIHJldHVybiByZXNvbHZlclRvVG9rZW5Ub0RlcGVuZGVuY2llcy5nZXQoaW5qZWN0b3IpPy5nZXQ/Lih0b2tlbiBhcyBUeXBlPFQ+KSA/PyBbXTtcbiAgfVxuXG4gIGNvbnN0IGxWaWV3ID0gZ2V0Tm9kZUluamVjdG9yTFZpZXcoaW5qZWN0b3IpO1xuICBjb25zdCB0b2tlbkRlcGVuZGVuY3lNYXAgPSByZXNvbHZlclRvVG9rZW5Ub0RlcGVuZGVuY2llcy5nZXQobFZpZXcpO1xuICBjb25zdCBkZXBlbmRlbmNpZXMgPSB0b2tlbkRlcGVuZGVuY3lNYXA/LmdldCh0b2tlbiBhcyBUeXBlPFQ+KSA/PyBbXTtcblxuICAvLyBJbiB0aGUgTm9kZUluamVjdG9yIGNhc2UsIGFsbCBpbmplY3Rpb25zIGZvciBldmVyeSBub2RlIGFyZSBzdG9yZWQgaW4gdGhlIHNhbWUgbFZpZXcuXG4gIC8vIFdlIHVzZSB0aGUgaW5qZWN0ZWRJbiBmaWVsZCBvZiB0aGUgZGVwZW5kZW5jeSB0byBmaWx0ZXIgb3V0IHRoZSBkZXBlbmRlbmNpZXMgdGhhdFxuICAvLyBkbyBub3QgY29tZSBmcm9tIHRoZSBzYW1lIG5vZGUgYXMgdGhlIGluc3RhbmNlIHdlJ3JlIGxvb2tpbmcgYXQuXG4gIHJldHVybiBkZXBlbmRlbmNpZXMuZmlsdGVyKGRlcGVuZGVuY3kgPT4ge1xuICAgIGNvbnN0IGRlcGVuZGVuY3lOb2RlID0gZGVwZW5kZW5jeS5pbmplY3RlZEluPy50Tm9kZTtcbiAgICBpZiAoZGVwZW5kZW5jeU5vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGluc3RhbmNlTm9kZSA9IGdldE5vZGVJbmplY3RvclROb2RlKGluamVjdG9yKTtcbiAgICBhc3NlcnRUTm9kZShkZXBlbmRlbmN5Tm9kZSk7XG4gICAgYXNzZXJ0VE5vZGUoaW5zdGFuY2VOb2RlISk7XG5cbiAgICByZXR1cm4gZGVwZW5kZW5jeU5vZGUgPT09IGluc3RhbmNlTm9kZTtcbiAgfSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgY2xhc3MgYXNzb2NpYXRlZCB3aXRoIGFuIGluamVjdG9yIHRoYXQgY29udGFpbnMgYSBwcm92aWRlciBgaW1wb3J0c2AgYXJyYXkgaW4gaXQnc1xuICogZGVmaW5pdGlvblxuICpcbiAqIEZvciBNb2R1bGUgSW5qZWN0b3JzIHRoaXMgcmV0dXJucyB0aGUgTmdNb2R1bGUgY29uc3RydWN0b3IuXG4gKlxuICogRm9yIFN0YW5kYWxvbmUgaW5qZWN0b3JzIHRoaXMgcmV0dXJucyB0aGUgc3RhbmRhbG9uZSBjb21wb25lbnQgY29uc3RydWN0b3IuXG4gKlxuICogQHBhcmFtIGluamVjdG9yIEluamVjdG9yIGFuIGluamVjdG9yIGluc3RhbmNlXG4gKiBAcmV0dXJucyB0aGUgY29uc3RydWN0b3Igd2hlcmUgdGhlIGBpbXBvcnRzYCBhcnJheSB0aGF0IGNvbmZpZ3VyZXMgdGhpcyBpbmplY3RvciBpcyBsb2NhdGVkXG4gKi9cbmZ1bmN0aW9uIGdldFByb3ZpZGVySW1wb3J0c0NvbnRhaW5lcihpbmplY3RvcjogSW5qZWN0b3IpOiBUeXBlPHVua25vd24+fG51bGwge1xuICBjb25zdCB7c3RhbmRhbG9uZUluamVjdG9yVG9Db21wb25lbnR9ID0gZ2V0RnJhbWV3b3JrRElEZWJ1Z0RhdGEoKTtcblxuICAvLyBzdGFuZGFsb25lIGNvbXBvbmVudHMgY29uZmlndXJlIHByb3ZpZGVycyB0aHJvdWdoIGEgY29tcG9uZW50IGRlZiwgc28gd2UgaGF2ZSB0b1xuICAvLyB1c2UgdGhlIHN0YW5kYWxvbmUgY29tcG9uZW50IGFzc29jaWF0ZWQgd2l0aCB0aGlzIGluamVjdG9yIGlmIEluamVjdG9yIHJlcHJlc2VudHNcbiAgLy8gYSBzdGFuZGFsb25lIGNvbXBvbmVudHMgRW52aXJvbm1lbnRJbmplY3RvclxuICBpZiAoc3RhbmRhbG9uZUluamVjdG9yVG9Db21wb25lbnQuaGFzKGluamVjdG9yKSkge1xuICAgIHJldHVybiBzdGFuZGFsb25lSW5qZWN0b3JUb0NvbXBvbmVudC5nZXQoaW5qZWN0b3IpITtcbiAgfVxuXG4gIC8vIE1vZHVsZSBpbmplY3RvcnMgY29uZmlndXJlIHByb3ZpZGVycyB0aHJvdWdoIHRoZWlyIE5nTW9kdWxlIGRlZiwgc28gd2UgdXNlIHRoZVxuICAvLyBpbmplY3RvciB0byBsb29rdXAgaXRzIE5nTW9kdWxlUmVmIGFuZCB0aHJvdWdoIHRoYXQgZ3JhYiBpdHMgaW5zdGFuY2VcbiAgY29uc3QgZGVmVHlwZVJlZiA9IGluamVjdG9yLmdldCh2aWV3RW5naW5lX05nTW9kdWxlUmVmLCBudWxsLCB7c2VsZjogdHJ1ZSwgb3B0aW9uYWw6IHRydWV9KSE7XG5cbiAgLy8gSWYgd2UgY2FuJ3QgZmluZCBhbiBhc3NvY2lhdGVkIGltcG9ydHMgY29udGFpbmVyLCByZXR1cm4gbnVsbC5cbiAgLy8gVGhpcyBjb3VsZCBiZSB0aGUgY2FzZSBpZiB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aXRoIGFuIFIzSW5qZWN0b3IgdGhhdCBkb2VzIG5vdCByZXByZXNlbnRcbiAgLy8gYSBzdGFuZGFsb25lIGNvbXBvbmVudCBvciBOZ01vZHVsZS5cbiAgaWYgKGRlZlR5cGVSZWYgPT09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIEluIHN0YW5kYWxvbmUgYXBwbGljYXRpb25zLCB0aGUgcm9vdCBlbnZpcm9ubWVudCBpbmplY3RvciBjcmVhdGVkIGJ5IGJvb3RzdHJhcEFwcGxpY2F0aW9uXG4gIC8vIG1heSBoYXZlIG5vIGFzc29jaWF0ZWQgXCJpbnN0YW5jZVwiLlxuICBpZiAoZGVmVHlwZVJlZi5pbnN0YW5jZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIGRlZlR5cGVSZWYuaW5zdGFuY2UuY29uc3RydWN0b3I7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgcHJvdmlkZXJzIGNvbmZpZ3VyZWQgb24gYSBOb2RlSW5qZWN0b3JcbiAqXG4gKiBAcGFyYW0gaW5qZWN0b3IgQSBOb2RlSW5qZWN0b3IgaW5zdGFuY2VcbiAqIEByZXR1cm5zIFByb3ZpZGVyUmVjb3JkW10gYW4gYXJyYXkgb2Ygb2JqZWN0cyByZXByZXNlbnRpbmcgdGhlIHByb3ZpZGVycyBjb25maWd1cmVkIG9uIHRoaXNcbiAqICAgICBpbmplY3RvclxuICovXG5mdW5jdGlvbiBnZXROb2RlSW5qZWN0b3JQcm92aWRlcnMoaW5qZWN0b3I6IE5vZGVJbmplY3Rvcik6IFByb3ZpZGVyUmVjb3JkW10ge1xuICBjb25zdCBkaVJlc29sdmVyID0gZ2V0Tm9kZUluamVjdG9yVE5vZGUoaW5qZWN0b3IpO1xuICBjb25zdCB7cmVzb2x2ZXJUb1Byb3ZpZGVyc30gPSBnZXRGcmFtZXdvcmtESURlYnVnRGF0YSgpO1xuICByZXR1cm4gcmVzb2x2ZXJUb1Byb3ZpZGVycy5nZXQoZGlSZXNvbHZlciBhcyBUTm9kZSkgPz8gW107XG59XG5cbi8qKlxuICogR2V0cyBhIG1hcHBpbmcgb2YgcHJvdmlkZXJzIGNvbmZpZ3VyZWQgb24gYW4gaW5qZWN0b3IgdG8gdGhlaXIgaW1wb3J0IHBhdGhzXG4gKlxuICogTW9kdWxlQSAtPiBpbXBvcnRzIE1vZHVsZUJcbiAqIE1vZHVsZUIgLT4gaW1wb3J0cyBNb2R1bGVDXG4gKiBNb2R1bGVCIC0+IHByb3ZpZGVzIE15U2VydmljZUFcbiAqIE1vZHVsZUMgLT4gcHJvdmlkZXMgTXlTZXJ2aWNlQlxuICpcbiAqIGdldFByb3ZpZGVySW1wb3J0UGF0aHMoTW9kdWxlQSlcbiAqID4gTWFwKDIpIHtcbiAqICAgTXlTZXJ2aWNlQSA9PiBbTW9kdWxlQSwgTW9kdWxlQl1cbiAqICAgTXlTZXJ2aWNlQiA9PiBbTW9kdWxlQSwgTW9kdWxlQiwgTW9kdWxlQ11cbiAqICB9XG4gKlxuICogQHBhcmFtIHByb3ZpZGVySW1wb3J0c0NvbnRhaW5lciBjb25zdHJ1Y3RvciBvZiBjbGFzcyB0aGF0IGNvbnRhaW5zIGFuIGBpbXBvcnRzYCBhcnJheSBpbiBpdCdzXG4gKiAgICAgZGVmaW5pdGlvblxuICogQHJldHVybnMgQSBNYXAgb2JqZWN0IHRoYXQgbWFwcyBwcm92aWRlcnMgdG8gYW4gYXJyYXkgb2YgY29uc3RydWN0b3JzIHJlcHJlc2VudGluZyBpdCdzIGltcG9ydFxuICogICAgIHBhdGhcbiAqXG4gKi9cbmZ1bmN0aW9uIGdldFByb3ZpZGVySW1wb3J0UGF0aHMocHJvdmlkZXJJbXBvcnRzQ29udGFpbmVyOiBUeXBlPHVua25vd24+KTpcbiAgICBNYXA8U2luZ2xlUHJvdmlkZXIsIChUeXBlPHVua25vd24+fCBJbmplY3RvclR5cGU8dW5rbm93bj4pW10+IHtcbiAgY29uc3QgcHJvdmlkZXJUb1BhdGggPSBuZXcgTWFwPFNpbmdsZVByb3ZpZGVyLCAoVHlwZTx1bmtub3duPnwgSW5qZWN0b3JUeXBlPHVua25vd24+KVtdPigpO1xuICBjb25zdCB2aXNpdGVkQ29udGFpbmVycyA9IG5ldyBTZXQ8VHlwZTx1bmtub3duPj4oKTtcbiAgY29uc3QgdmlzaXRvciA9IHdhbGtQcm92aWRlclRyZWVUb0Rpc2NvdmVySW1wb3J0UGF0aHMocHJvdmlkZXJUb1BhdGgsIHZpc2l0ZWRDb250YWluZXJzKTtcblxuICB3YWxrUHJvdmlkZXJUcmVlKHByb3ZpZGVySW1wb3J0c0NvbnRhaW5lciwgdmlzaXRvciwgW10sIG5ldyBTZXQoKSk7XG5cbiAgcmV0dXJuIHByb3ZpZGVyVG9QYXRoO1xufVxuXG4vKipcbiAqXG4gKiBIaWdoZXIgb3JkZXIgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgdmlzaXRvciBmb3IgV2Fsa1Byb3ZpZGVyVHJlZVxuICpcbiAqIFRha2VzIGluIGEgTWFwIGFuZCBTZXQgdG8ga2VlcCB0cmFjayBvZiB0aGUgcHJvdmlkZXJzIGFuZCBjb250YWluZXJzXG4gKiB2aXNpdGVkLCBzbyB0aGF0IHdlIGNhbiBkaXNjb3ZlciB0aGUgaW1wb3J0IHBhdGhzIG9mIHRoZXNlIHByb3ZpZGVyc1xuICogZHVyaW5nIHRoZSB0cmF2ZXJzYWwuXG4gKlxuICogVGhpcyB2aXNpdG9yIHRha2VzIGFkdmFudGFnZSBvZiB0aGUgZmFjdCB0aGF0IHdhbGtQcm92aWRlclRyZWUgcGVyZm9ybXMgYVxuICogcG9zdG9yZGVyIHRyYXZlcnNhbCBvZiB0aGUgcHJvdmlkZXIgdHJlZSBmb3IgdGhlIHBhc3NlZCBpbiBjb250YWluZXIuIEJlY2F1c2UgcG9zdG9yZGVyXG4gKiB0cmF2ZXJzYWwgcmVjdXJzaXZlbHkgcHJvY2Vzc2VzIHN1YnRyZWVzIGZyb20gbGVhZiBub2RlcyB1bnRpbCB0aGUgdHJhdmVyc2FsIHJlYWNoZXMgdGhlIHJvb3QsXG4gKiB3ZSB3cml0ZSBhIHZpc2l0b3IgdGhhdCBjb25zdHJ1Y3RzIHByb3ZpZGVyIGltcG9ydCBwYXRocyBpbiByZXZlcnNlLlxuICpcbiAqXG4gKiBXZSB1c2UgdGhlIHZpc2l0ZWRDb250YWluZXJzIHNldCBkZWZpbmVkIG91dHNpZGUgdGhpcyB2aXNpdG9yXG4gKiBiZWNhdXNlIHdlIHdhbnQgdG8gcnVuIHNvbWUgbG9naWMgb25seSBvbmNlIGZvclxuICogZWFjaCBjb250YWluZXIgaW4gdGhlIHRyZWUuIFRoYXQgbG9naWMgY2FuIGJlIGRlc2NyaWJlZCBhczpcbiAqXG4gKlxuICogMS4gZm9yIGVhY2ggZGlzY292ZXJlZF9wcm92aWRlciBhbmQgZGlzY292ZXJlZF9wYXRoIGluIHRoZSBpbmNvbXBsZXRlIHByb3ZpZGVyIHBhdGhzIHdlJ3ZlXG4gKiBhbHJlYWR5IGRpc2NvdmVyZWRcbiAqIDIuIGdldCB0aGUgZmlyc3QgY29udGFpbmVyIGluIGRpc2NvdmVyZWRfcGF0aFxuICogMy4gaWYgdGhhdCBmaXJzdCBjb250YWluZXIgaXMgaW4gdGhlIGltcG9ydHMgYXJyYXkgb2YgdGhlIGNvbnRhaW5lciB3ZSdyZSB2aXNpdGluZ1xuICogICAgVGhlbiB0aGUgY29udGFpbmVyIHdlJ3JlIHZpc2l0aW5nIGlzIGFsc28gaW4gdGhlIGltcG9ydCBwYXRoIG9mIGRpc2NvdmVyZWRfcHJvdmlkZXIsIHNvIHdlXG4gKiAgICB1bnNoaWZ0IGRpc2NvdmVyZWRfcGF0aCB3aXRoIHRoZSBjb250YWluZXIgd2UncmUgY3VycmVudGx5IHZpc2l0aW5nXG4gKlxuICpcbiAqIEV4YW1wbGUgUnVuOlxuICogYGBgXG4gKiAgICAgICAgICAgICAgICAg4pSM4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSQXG4gKiAgICAgICAgICAgICAgICAg4pSCY29udGFpbmVyQeKUglxuICogICAgICDilIzilIBpbXBvcnRzLeKUgOKUpCAgICAgICAgICDilJzilIDilIBpbXBvcnRz4pSA4pSQXG4gKiAgICAgIOKUgiAgICAgICAgICDilIIgIHByb3ZBICAg4pSCICAgICAgICAgIOKUglxuICogICAgICDilIIgICAgICAgICAg4pSCICBwcm92QiAgIOKUgiAgICAgICAgICDilIJcbiAqICAgICAg4pSCICAgICAgICAgIOKUlOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUmCAgICAgICAgICDilIJcbiAqICAgICAg4pSCICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIJcbiAqICAgICDilIzilrzilIDilIDilIDilIDilIDilIDilIDilIDilIDilJAgICAgICAgICAgICAg4pSM4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pa84pSA4pSQXG4gKiAgICAg4pSCY29udGFpbmVyQuKUgiAgICAgICAgICAgICDilIJjb250YWluZXJD4pSCXG4gKiAgICAg4pSCICAgICAgICAgIOKUgiAgICAgICAgICAgICDilIIgICAgICAgICAg4pSCXG4gKiAgICAg4pSCICBwcm92RCAgIOKUgiAgICAgICAgICAgICDilIIgIHByb3ZGICAg4pSCXG4gKiAgICAg4pSCICBwcm92RSAgIOKUgiAgICAgICAgICAgICDilIIgIHByb3ZHICAg4pSCXG4gKiAgICAg4pSU4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSYICAgICAgICAgICAgIOKUlOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUmFxuICogYGBgXG4gKlxuICogRWFjaCBzdGVwIG9mIHRoZSB0cmF2ZXJzYWwsXG4gKlxuICogYGBgXG4gKiB2aXNpdG9yKHByb3ZELCBjb250YWluZXJCKVxuICogcHJvdmlkZXJUb1BhdGggPT09IE1hcCB7IHByb3ZEID0+IFtjb250YWluZXJCXSB9XG4gKiB2aXNpdGVkQ29udGFpbmVycyA9PT0gU2V0IHsgY29udGFpbmVyQiB9XG4gKlxuICogdmlzaXRvcihwcm92RSwgY29udGFpbmVyQilcbiAqIHByb3ZpZGVyVG9QYXRoID09PSBNYXAgeyBwcm92RCA9PiBbY29udGFpbmVyQl0sIHByb3ZFID0+IFtjb250YWluZXJCXSB9XG4gKiB2aXNpdGVkQ29udGFpbmVycyA9PT0gU2V0IHsgY29udGFpbmVyQiB9XG4gKlxuICogdmlzaXRvcihwcm92RiwgY29udGFpbmVyQylcbiAqIHByb3ZpZGVyVG9QYXRoID09PSBNYXAgeyBwcm92RCA9PiBbY29udGFpbmVyQl0sIHByb3ZFID0+IFtjb250YWluZXJCXSwgcHJvdkYgPT4gW2NvbnRhaW5lckNdIH1cbiAqIHZpc2l0ZWRDb250YWluZXJzID09PSBTZXQgeyBjb250YWluZXJCLCBjb250YWluZXJDIH1cbiAqXG4gKiB2aXNpdG9yKHByb3ZHLCBjb250YWluZXJDKVxuICogcHJvdmlkZXJUb1BhdGggPT09IE1hcCB7XG4gKiAgIHByb3ZEID0+IFtjb250YWluZXJCXSwgcHJvdkUgPT4gW2NvbnRhaW5lckJdLCBwcm92RiA9PiBbY29udGFpbmVyQ10sIHByb3ZHID0+IFtjb250YWluZXJDXVxuICogfVxuICogdmlzaXRlZENvbnRhaW5lcnMgPT09IFNldCB7IGNvbnRhaW5lckIsIGNvbnRhaW5lckMgfVxuICpcbiAqIHZpc2l0b3IocHJvdkEsIGNvbnRhaW5lckEpXG4gKiBwcm92aWRlclRvUGF0aCA9PT0gTWFwIHtcbiAqICAgcHJvdkQgPT4gW2NvbnRhaW5lckEsIGNvbnRhaW5lckJdLFxuICogICBwcm92RSA9PiBbY29udGFpbmVyQSwgY29udGFpbmVyQl0sXG4gKiAgIHByb3ZGID0+IFtjb250YWluZXJBLCBjb250YWluZXJDXSxcbiAqICAgcHJvdkcgPT4gW2NvbnRhaW5lckEsIGNvbnRhaW5lckNdLFxuICogICBwcm92QSA9PiBbY29udGFpbmVyQV1cbiAqIH1cbiAqIHZpc2l0ZWRDb250YWluZXJzID09PSBTZXQgeyBjb250YWluZXJCLCBjb250YWluZXJDLCBjb250YWluZXJBIH1cbiAqXG4gKiB2aXNpdG9yKHByb3ZCLCBjb250YWluZXJBKVxuICogcHJvdmlkZXJUb1BhdGggPT09IE1hcCB7XG4gKiAgIHByb3ZEID0+IFtjb250YWluZXJBLCBjb250YWluZXJCXSxcbiAqICAgcHJvdkUgPT4gW2NvbnRhaW5lckEsIGNvbnRhaW5lckJdLFxuICogICBwcm92RiA9PiBbY29udGFpbmVyQSwgY29udGFpbmVyQ10sXG4gKiAgIHByb3ZHID0+IFtjb250YWluZXJBLCBjb250YWluZXJDXSxcbiAqICAgcHJvdkEgPT4gW2NvbnRhaW5lckFdXG4gKiAgIHByb3ZCID0+IFtjb250YWluZXJBXVxuICogfVxuICogdmlzaXRlZENvbnRhaW5lcnMgPT09IFNldCB7IGNvbnRhaW5lckIsIGNvbnRhaW5lckMsIGNvbnRhaW5lckEgfVxuICogYGBgXG4gKlxuICogQHBhcmFtIHByb3ZpZGVyVG9QYXRoIE1hcCBtYXAgb2YgcHJvdmlkZXJzIHRvIHBhdGhzIHRoYXQgdGhpcyBmdW5jdGlvbiBmaWxsc1xuICogQHBhcmFtIHZpc2l0ZWRDb250YWluZXJzIFNldCBhIHNldCB0byBrZWVwIHRyYWNrIG9mIHRoZSBjb250YWluZXJzIHdlJ3ZlIGFscmVhZHkgdmlzaXRlZFxuICogQHJldHVybiBmdW5jdGlvbihwcm92aWRlciBTaW5nbGVQcm92aWRlciwgY29udGFpbmVyOiBUeXBlPHVua25vd24+IHwgSW5qZWN0b3JUeXBlPHVua25vd24+KSA9PlxuICogICAgIHZvaWRcbiAqL1xuZnVuY3Rpb24gd2Fsa1Byb3ZpZGVyVHJlZVRvRGlzY292ZXJJbXBvcnRQYXRocyhcbiAgICBwcm92aWRlclRvUGF0aDogTWFwPFNpbmdsZVByb3ZpZGVyLCAoVHlwZTx1bmtub3duPnwgSW5qZWN0b3JUeXBlPHVua25vd24+KVtdPixcbiAgICB2aXNpdGVkQ29udGFpbmVyczogU2V0PFR5cGU8dW5rbm93bj4+KTpcbiAgICAocHJvdmlkZXI6IFNpbmdsZVByb3ZpZGVyLCBjb250YWluZXI6IFR5cGU8dW5rbm93bj58SW5qZWN0b3JUeXBlPHVua25vd24+KSA9PiB2b2lkIHtcbiAgcmV0dXJuIChwcm92aWRlcjogU2luZ2xlUHJvdmlkZXIsIGNvbnRhaW5lcjogVHlwZTx1bmtub3duPnxJbmplY3RvclR5cGU8dW5rbm93bj4pID0+IHtcbiAgICAvLyBJZiB0aGUgcHJvdmlkZXIgaXMgbm90IGFscmVhZHkgaW4gdGhlIHByb3ZpZGVyVG9QYXRoIG1hcCxcbiAgICAvLyBhZGQgYW4gZW50cnkgd2l0aCB0aGUgcHJvdmlkZXIgYXMgdGhlIGtleSBhbmQgYW4gYXJyYXkgY29udGFpbmluZyB0aGUgY3VycmVudCBjb250YWluZXIgYXNcbiAgICAvLyB0aGUgdmFsdWVcbiAgICBpZiAoIXByb3ZpZGVyVG9QYXRoLmhhcyhwcm92aWRlcikpIHtcbiAgICAgIHByb3ZpZGVyVG9QYXRoLnNldChwcm92aWRlciwgW2NvbnRhaW5lcl0pO1xuICAgIH1cblxuICAgIC8vIFRoaXMgYmxvY2sgd2lsbCBydW4gZXhhY3RseSBvbmNlIGZvciBlYWNoIGNvbnRhaW5lciBpbiB0aGUgaW1wb3J0IHRyZWUuXG4gICAgLy8gVGhpcyBpcyB3aGVyZSB3ZSBydW4gdGhlIGxvZ2ljIHRvIGNoZWNrIHRoZSBpbXBvcnRzIGFycmF5IG9mIHRoZSBjdXJyZW50XG4gICAgLy8gY29udGFpbmVyIHRvIHNlZSBpZiBpdCdzIHRoZSBuZXh0IGNvbnRhaW5lciBpbiB0aGUgcGF0aCBmb3Igb3VyIGN1cnJlbnRseVxuICAgIC8vIGRpc2NvdmVyZWQgcHJvdmlkZXJzLlxuICAgIGlmICghdmlzaXRlZENvbnRhaW5lcnMuaGFzKGNvbnRhaW5lcikpIHtcbiAgICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCB0aGUgcHJvdmlkZXJzIHdlJ3ZlIGFscmVhZHkgc2VlblxuICAgICAgZm9yIChjb25zdCBwcm92IG9mIHByb3ZpZGVyVG9QYXRoLmtleXMoKSkge1xuICAgICAgICBjb25zdCBleGlzdGluZ0ltcG9ydFBhdGggPSBwcm92aWRlclRvUGF0aC5nZXQocHJvdikhO1xuXG4gICAgICAgIGxldCBjb250YWluZXJEZWYgPSBnZXRJbmplY3RvckRlZihjb250YWluZXIpO1xuICAgICAgICBpZiAoIWNvbnRhaW5lckRlZikge1xuICAgICAgICAgIGNvbnN0IG5nTW9kdWxlOiBUeXBlPHVua25vd24+fHVuZGVmaW5lZCA9XG4gICAgICAgICAgICAgIChjb250YWluZXIgYXMgYW55KS5uZ01vZHVsZSBhcyBUeXBlPHVua25vd24+fCB1bmRlZmluZWQ7XG4gICAgICAgICAgY29udGFpbmVyRGVmID0gZ2V0SW5qZWN0b3JEZWYobmdNb2R1bGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjb250YWluZXJEZWYpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsYXN0Q29udGFpbmVyQWRkZWRUb1BhdGggPSBleGlzdGluZ0ltcG9ydFBhdGhbMF07XG5cbiAgICAgICAgbGV0IGlzTmV4dFN0ZXBJblBhdGggPSBmYWxzZTtcbiAgICAgICAgZGVlcEZvckVhY2goY29udGFpbmVyRGVmLmltcG9ydHMsIChtb2R1bGVJbXBvcnQpID0+IHtcbiAgICAgICAgICBpZiAoaXNOZXh0U3RlcEluUGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlzTmV4dFN0ZXBJblBhdGggPSAobW9kdWxlSW1wb3J0IGFzIGFueSkubmdNb2R1bGUgPT09IGxhc3RDb250YWluZXJBZGRlZFRvUGF0aCB8fFxuICAgICAgICAgICAgICBtb2R1bGVJbXBvcnQgPT09IGxhc3RDb250YWluZXJBZGRlZFRvUGF0aDtcblxuICAgICAgICAgIGlmIChpc05leHRTdGVwSW5QYXRoKSB7XG4gICAgICAgICAgICBwcm92aWRlclRvUGF0aC5nZXQocHJvdik/LnVuc2hpZnQoY29udGFpbmVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZpc2l0ZWRDb250YWluZXJzLmFkZChjb250YWluZXIpO1xuICB9O1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHByb3ZpZGVycyBjb25maWd1cmVkIG9uIGFuIEVudmlyb25tZW50SW5qZWN0b3JcbiAqXG4gKiBAcGFyYW0gaW5qZWN0b3IgRW52aXJvbm1lbnRJbmplY3RvclxuICogQHJldHVybnMgYW4gYXJyYXkgb2Ygb2JqZWN0cyByZXByZXNlbnRpbmcgdGhlIHByb3ZpZGVycyBvZiB0aGUgZ2l2ZW4gaW5qZWN0b3JcbiAqL1xuZnVuY3Rpb24gZ2V0RW52aXJvbm1lbnRJbmplY3RvclByb3ZpZGVycyhpbmplY3RvcjogRW52aXJvbm1lbnRJbmplY3Rvcik6IFByb3ZpZGVyUmVjb3JkW10ge1xuICBjb25zdCBwcm92aWRlclJlY29yZHNXaXRob3V0SW1wb3J0UGF0aHMgPVxuICAgICAgZ2V0RnJhbWV3b3JrRElEZWJ1Z0RhdGEoKS5yZXNvbHZlclRvUHJvdmlkZXJzLmdldChpbmplY3RvcikgPz8gW107XG5cbiAgLy8gcGxhdGZvcm0gaW5qZWN0b3IgaGFzIG5vIHByb3ZpZGVyIGltcG9ydHMgY29udGFpbmVyIHNvIGNhbiB3ZSBza2lwIHRyeWluZyB0b1xuICAvLyBmaW5kIGltcG9ydCBwYXRoc1xuICBpZiAoaXNQbGF0Zm9ybUluamVjdG9yKGluamVjdG9yKSkge1xuICAgIHJldHVybiBwcm92aWRlclJlY29yZHNXaXRob3V0SW1wb3J0UGF0aHM7XG4gIH1cblxuICBjb25zdCBwcm92aWRlckltcG9ydHNDb250YWluZXIgPSBnZXRQcm92aWRlckltcG9ydHNDb250YWluZXIoaW5qZWN0b3IpO1xuICBpZiAocHJvdmlkZXJJbXBvcnRzQ29udGFpbmVyID09PSBudWxsKSB7XG4gICAgLy8gV2UgYXNzdW1lIHRoYXQgaWYgYW4gZW52aXJvbm1lbnQgaW5qZWN0b3IgZXhpc3RzIHdpdGhvdXQgYW4gYXNzb2NpYXRlZCBwcm92aWRlciBpbXBvcnRzXG4gICAgLy8gY29udGFpbmVyLCBpdCB3YXMgY3JlYXRlZCB3aXRob3V0IHN1Y2ggYSBjb250YWluZXIuIFNvbWUgZXhhbXBsZXMgY2FzZXMgd2hlcmUgdGhpcyBjb3VsZFxuICAgIC8vIGhhcHBlbjpcbiAgICAvLyAtIFRoZSByb290IGluamVjdG9yIG9mIGEgc3RhbmRhbG9uZSBhcHBsaWNhdGlvblxuICAgIC8vIC0gQSByb3V0ZXIgaW5qZWN0b3IgY3JlYXRlZCBieSB1c2luZyB0aGUgcHJvdmlkZXJzIGFycmF5IGluIGEgbGF6eSBsb2FkZWQgcm91dGVcbiAgICAvLyAtIEEgbWFudWFsbHkgY3JlYXRlZCBpbmplY3RvciB0aGF0IGlzIGF0dGFjaGVkIHRvIHRoZSBpbmplY3RvciB0cmVlXG4gICAgLy8gU2luY2UgZWFjaCBvZiB0aGVzZSBjYXNlcyBoYXMgbm8gcHJvdmlkZXIgY29udGFpbmVyLCB0aGVyZSBpcyBubyBjb25jZXB0IG9mIGltcG9ydCBwYXRocyxcbiAgICAvLyBzbyB3ZSBjYW4gc2ltcGx5IHJldHVybiB0aGUgcHJvdmlkZXIgcmVjb3Jkcy5cbiAgICByZXR1cm4gcHJvdmlkZXJSZWNvcmRzV2l0aG91dEltcG9ydFBhdGhzO1xuICB9XG5cbiAgY29uc3QgcHJvdmlkZXJUb1BhdGggPSBnZXRQcm92aWRlckltcG9ydFBhdGhzKHByb3ZpZGVySW1wb3J0c0NvbnRhaW5lcik7XG4gIGNvbnN0IHByb3ZpZGVyUmVjb3JkcyA9IFtdO1xuXG4gIGZvciAoY29uc3QgcHJvdmlkZXJSZWNvcmQgb2YgcHJvdmlkZXJSZWNvcmRzV2l0aG91dEltcG9ydFBhdGhzKSB7XG4gICAgY29uc3QgcHJvdmlkZXIgPSBwcm92aWRlclJlY29yZC5wcm92aWRlcjtcbiAgICAvLyBJZ25vcmUgdGhlc2Ugc3BlY2lhbCBwcm92aWRlcnMgZm9yIG5vdyB1bnRpbCB3ZSBoYXZlIGEgY2xlYW5lciB3YXkgb2ZcbiAgICAvLyBkZXRlcm1pbmcgd2hlbiB0aGV5IGFyZSBwcm92aWRlZCBieSB0aGUgZnJhbWV3b3JrIHZzIHByb3ZpZGVkIGJ5IHRoZSB1c2VyLlxuICAgIGNvbnN0IHRva2VuID0gKHByb3ZpZGVyIGFzIFZhbHVlUHJvdmlkZXIpLnByb3ZpZGU7XG4gICAgaWYgKHRva2VuID09PSBFTlZJUk9OTUVOVF9JTklUSUFMSVpFUiB8fCB0b2tlbiA9PT0gSU5KRUNUT1JfREVGX1RZUEVTKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBsZXQgaW1wb3J0UGF0aCA9IHByb3ZpZGVyVG9QYXRoLmdldChwcm92aWRlcikgPz8gW107XG5cbiAgICBjb25zdCBkZWYgPSBnZXRDb21wb25lbnREZWYocHJvdmlkZXJJbXBvcnRzQ29udGFpbmVyKTtcbiAgICBjb25zdCBpc1N0YW5kYWxvbmVDb21wb25lbnQgPSAhIWRlZj8uc3RhbmRhbG9uZTtcbiAgICAvLyBXZSBwcmVwZW5kIHRoZSBjb21wb25lbnQgY29uc3RydWN0b3IgaW4gdGhlIHN0YW5kYWxvbmUgY2FzZVxuICAgIC8vIGJlY2F1c2Ugd2Fsa1Byb3ZpZGVyVHJlZSBkb2VzIG5vdCB2aXNpdCB0aGlzIGNvbnN0cnVjdG9yIGR1cmluZyBpdCdzIHRyYXZlcnNhbFxuICAgIGlmIChpc1N0YW5kYWxvbmVDb21wb25lbnQpIHtcbiAgICAgIGltcG9ydFBhdGggPSBbcHJvdmlkZXJJbXBvcnRzQ29udGFpbmVyLCAuLi5pbXBvcnRQYXRoXTtcbiAgICB9XG5cbiAgICBwcm92aWRlclJlY29yZHMucHVzaCh7Li4ucHJvdmlkZXJSZWNvcmQsIGltcG9ydFBhdGh9KTtcbiAgfVxuICByZXR1cm4gcHJvdmlkZXJSZWNvcmRzO1xufVxuXG5mdW5jdGlvbiBpc1BsYXRmb3JtSW5qZWN0b3IoaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gIHJldHVybiBpbmplY3RvciBpbnN0YW5jZW9mIFIzSW5qZWN0b3IgJiYgaW5qZWN0b3Iuc2NvcGVzLmhhcygncGxhdGZvcm0nKTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBwcm92aWRlcnMgY29uZmlndXJlZCBvbiBhbiBpbmplY3Rvci5cbiAqXG4gKiBAcGFyYW0gaW5qZWN0b3IgdGhlIGluamVjdG9yIHRvIGxvb2t1cCB0aGUgcHJvdmlkZXJzIG9mXG4gKiBAcmV0dXJucyBQcm92aWRlclJlY29yZFtdIGFuIGFycmF5IG9mIG9iamVjdHMgcmVwcmVzZW50aW5nIHRoZSBwcm92aWRlcnMgb2YgdGhlIGdpdmVuIGluamVjdG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbmplY3RvclByb3ZpZGVycyhpbmplY3RvcjogSW5qZWN0b3IpOiBQcm92aWRlclJlY29yZFtdIHtcbiAgaWYgKGluamVjdG9yIGluc3RhbmNlb2YgTm9kZUluamVjdG9yKSB7XG4gICAgcmV0dXJuIGdldE5vZGVJbmplY3RvclByb3ZpZGVycyhpbmplY3Rvcik7XG4gIH0gZWxzZSBpZiAoaW5qZWN0b3IgaW5zdGFuY2VvZiBFbnZpcm9ubWVudEluamVjdG9yKSB7XG4gICAgcmV0dXJuIGdldEVudmlyb25tZW50SW5qZWN0b3JQcm92aWRlcnMoaW5qZWN0b3IgYXMgRW52aXJvbm1lbnRJbmplY3Rvcik7XG4gIH1cblxuICB0aHJvd0Vycm9yKCdnZXRJbmplY3RvclByb3ZpZGVycyBvbmx5IHN1cHBvcnRzIE5vZGVJbmplY3RvciBhbmQgRW52aXJvbm1lbnRJbmplY3RvcicpO1xufVxuXG4vKipcbiAqXG4gKiBHaXZlbiBhbiBpbmplY3RvciwgdGhpcyBmdW5jdGlvbiB3aWxsIHJldHVyblxuICogYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHR5cGUgYW5kIHNvdXJjZSBvZiB0aGUgaW5qZWN0b3IuXG4gKlxuICogfCAgICAgICAgICAgICAgfCB0eXBlICAgICAgICB8IHNvdXJjZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwtLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8IE5vZGVJbmplY3RvciB8IGVsZW1lbnQgICAgIHwgRE9NIGVsZW1lbnQgdGhhdCBjcmVhdGVkIHRoaXMgaW5qZWN0b3IgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCBSM0luamVjdG9yICAgfCBlbnZpcm9ubWVudCB8IGBpbmplY3Rvci5zb3VyY2VgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgTnVsbEluamVjdG9yIHwgbnVsbCAgICAgICAgfCBudWxsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKlxuICogQHBhcmFtIGluamVjdG9yIHRoZSBJbmplY3RvciB0byBnZXQgbWV0YWRhdGEgZm9yXG4gKiBAcmV0dXJucyBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgdHlwZSBhbmQgc291cmNlIG9mIHRoZSBnaXZlbiBpbmplY3Rvci4gSWYgdGhlIGluamVjdG9yIG1ldGFkYXRhXG4gKiAgICAgY2Fubm90IGJlIGRldGVybWluZWQsIHJldHVybnMgbnVsbC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEluamVjdG9yTWV0YWRhdGEoaW5qZWN0b3I6IEluamVjdG9yKToge3R5cGU6ICdlbGVtZW50Jywgc291cmNlOiBSRWxlbWVudH18XG4gICAge3R5cGU6ICdlbnZpcm9ubWVudCcsIHNvdXJjZTogc3RyaW5nIHwgbnVsbH18e3R5cGU6ICdudWxsJywgc291cmNlOiBudWxsfXxudWxsIHtcbiAgaWYgKGluamVjdG9yIGluc3RhbmNlb2YgTm9kZUluamVjdG9yKSB7XG4gICAgY29uc3QgbFZpZXcgPSBnZXROb2RlSW5qZWN0b3JMVmlldyhpbmplY3Rvcik7XG4gICAgY29uc3QgdE5vZGUgPSBnZXROb2RlSW5qZWN0b3JUTm9kZShpbmplY3RvcikhO1xuICAgIGFzc2VydFROb2RlRm9yTFZpZXcodE5vZGUsIGxWaWV3KTtcblxuICAgIHJldHVybiB7dHlwZTogJ2VsZW1lbnQnLCBzb3VyY2U6IGdldE5hdGl2ZUJ5VE5vZGUodE5vZGUsIGxWaWV3KSBhcyBSRWxlbWVudH07XG4gIH1cblxuICBpZiAoaW5qZWN0b3IgaW5zdGFuY2VvZiBSM0luamVjdG9yKSB7XG4gICAgcmV0dXJuIHt0eXBlOiAnZW52aXJvbm1lbnQnLCBzb3VyY2U6IGluamVjdG9yLnNvdXJjZSA/PyBudWxsfTtcbiAgfVxuXG4gIGlmIChpbmplY3RvciBpbnN0YW5jZW9mIE51bGxJbmplY3Rvcikge1xuICAgIHJldHVybiB7dHlwZTogJ251bGwnLCBzb3VyY2U6IG51bGx9O1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbmplY3RvclJlc29sdXRpb25QYXRoKGluamVjdG9yOiBJbmplY3Rvcik6IEluamVjdG9yW10ge1xuICBjb25zdCByZXNvbHV0aW9uUGF0aDogSW5qZWN0b3JbXSA9IFtpbmplY3Rvcl07XG4gIGdldEluamVjdG9yUmVzb2x1dGlvblBhdGhIZWxwZXIoaW5qZWN0b3IsIHJlc29sdXRpb25QYXRoKTtcbiAgcmV0dXJuIHJlc29sdXRpb25QYXRoO1xufVxuXG5mdW5jdGlvbiBnZXRJbmplY3RvclJlc29sdXRpb25QYXRoSGVscGVyKFxuICAgIGluamVjdG9yOiBJbmplY3RvciwgcmVzb2x1dGlvblBhdGg6IEluamVjdG9yW10pOiBJbmplY3RvcltdIHtcbiAgY29uc3QgcGFyZW50ID0gZ2V0SW5qZWN0b3JQYXJlbnQoaW5qZWN0b3IpO1xuXG4gIC8vIGlmIGdldEluamVjdG9yUGFyZW50IGNhbid0IGZpbmQgYSBwYXJlbnQsIHRoZW4gd2UndmUgZWl0aGVyIHJlYWNoZWQgdGhlIGVuZFxuICAvLyBvZiB0aGUgcGF0aCwgb3Igd2UgbmVlZCB0byBtb3ZlIGZyb20gdGhlIEVsZW1lbnQgSW5qZWN0b3IgdHJlZSB0byB0aGVcbiAgLy8gbW9kdWxlIGluamVjdG9yIHRyZWUgdXNpbmcgdGhlIGZpcnN0IGluamVjdG9yIGluIG91ciBwYXRoIGFzIHRoZSBjb25uZWN0aW9uIHBvaW50LlxuICBpZiAocGFyZW50ID09PSBudWxsKSB7XG4gICAgaWYgKGluamVjdG9yIGluc3RhbmNlb2YgTm9kZUluamVjdG9yKSB7XG4gICAgICBjb25zdCBmaXJzdEluamVjdG9yID0gcmVzb2x1dGlvblBhdGhbMF07XG4gICAgICBpZiAoZmlyc3RJbmplY3RvciBpbnN0YW5jZW9mIE5vZGVJbmplY3Rvcikge1xuICAgICAgICBjb25zdCBtb2R1bGVJbmplY3RvciA9IGdldE1vZHVsZUluamVjdG9yT2ZOb2RlSW5qZWN0b3IoZmlyc3RJbmplY3Rvcik7XG4gICAgICAgIGlmIChtb2R1bGVJbmplY3RvciA9PT0gbnVsbCkge1xuICAgICAgICAgIHRocm93RXJyb3IoJ05vZGVJbmplY3RvciBtdXN0IGhhdmUgc29tZSBjb25uZWN0aW9uIHRvIHRoZSBtb2R1bGUgaW5qZWN0b3IgdHJlZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzb2x1dGlvblBhdGgucHVzaChtb2R1bGVJbmplY3Rvcik7XG4gICAgICAgIGdldEluamVjdG9yUmVzb2x1dGlvblBhdGhIZWxwZXIobW9kdWxlSW5qZWN0b3IsIHJlc29sdXRpb25QYXRoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc29sdXRpb25QYXRoO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXNvbHV0aW9uUGF0aC5wdXNoKHBhcmVudCk7XG4gICAgZ2V0SW5qZWN0b3JSZXNvbHV0aW9uUGF0aEhlbHBlcihwYXJlbnQsIHJlc29sdXRpb25QYXRoKTtcbiAgfVxuXG4gIHJldHVybiByZXNvbHV0aW9uUGF0aDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBwYXJlbnQgb2YgYW4gaW5qZWN0b3IuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBpcyBub3QgYWJsZSB0byBtYWtlIHRoZSBqdW1wIGZyb20gdGhlIEVsZW1lbnQgSW5qZWN0b3IgVHJlZSB0byB0aGUgTW9kdWxlXG4gKiBpbmplY3RvciB0cmVlLiBUaGlzIGlzIGJlY2F1c2UgdGhlIFwicGFyZW50XCIgKHRoZSBuZXh0IHN0ZXAgaW4gdGhlIHJlb3NsdXRpb24gcGF0aClcbiAqIG9mIGEgcm9vdCBOb2RlSW5qZWN0b3IgaXMgZGVwZW5kZW50IG9uIHdoaWNoIE5vZGVJbmplY3RvciBhbmNlc3RvciBpbml0aWF0ZWRcbiAqIHRoZSBESSBsb29rdXAuIFNlZSBnZXRJbmplY3RvclJlc29sdXRpb25QYXRoIGZvciBhIGZ1bmN0aW9uIHRoYXQgY2FuIG1ha2UgdGhpcyBqdW1wLlxuICpcbiAqIEluIHRoZSBiZWxvdyBkaWFncmFtOlxuICogYGBgdHNcbiAqIGdldEluamVjdG9yUGFyZW50KE5vZGVJbmplY3RvckIpXG4gKiAgPiBOb2RlSW5qZWN0b3JBXG4gKiBnZXRJbmplY3RvclBhcmVudChOb2RlSW5qZWN0b3JBKSAvLyBvciBnZXRJbmplY3RvclBhcmVudChnZXRJbmplY3RvclBhcmVudChOb2RlSW5qZWN0b3JCKSlcbiAqICA+IG51bGwgLy8gY2Fubm90IGp1bXAgdG8gTW9kdWxlSW5qZWN0b3IgdHJlZVxuICogYGBgXG4gKlxuICogYGBgXG4gKiAgICAgICAgICAgICAgICDilIzilIDilIDilIDilIDilIDilIDilIDilJAgICAgICAgICAgICAgICAg4pSM4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSQXG4gKiAgICDilIzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilKRNb2R1bGVB4pSc4pSA4pSA4pSASW5qZWN0b3LilIDilIDilIDilIDilrrilIJFbnZpcm9ubWVudEluamVjdG9y4pSCXG4gKiAgICDilIIgICAgICAgICAgIOKUlOKUgOKUgOKUgOKUrOKUgOKUgOKUgOKUmCAgICAgICAgICAgICAgICDilJTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJhcbiAqICAgIOKUgiAgICAgICAgICAgICAgIOKUglxuICogICAg4pSCICAgICAgICAgICBib290c3RyYXBzXG4gKiAgICDilIIgICAgICAgICAgICAgICDilIJcbiAqICAgIOKUgiAgICAgICAgICAgICAgIOKUglxuICogICAg4pSCICAgICAgICAgIOKUjOKUgOKUgOKUgOKUgOKWvOKUgOKUgOKUgOKUgOKUgOKUkCAgICAgICAgICAgICAgICAg4pSM4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSQXG4gKiBkZWNsYXJlcyAgICAgIOKUgkNvbXBvbmVudEHilJzilIDilIDilIDilIBJbmplY3RvcuKUgOKUgOKUgOKUgOKWuuKUgk5vZGVJbmplY3RvckHilIJcbiAqICAgIOKUgiAgICAgICAgICDilJTilIDilIDilIDilIDilKzilIDilIDilIDilIDilIDilJggICAgICAgICAgICAgICAgIOKUlOKUgOKUgOKUgOKUgOKUgOKWsuKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUmFxuICogICAg4pSCICAgICAgICAgICAgICAg4pSCICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIJcbiAqICAgIOKUgiAgICAgICAgICAgIHJlbmRlcnMgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRcbiAqICAgIOKUgiAgICAgICAgICAgICAgIOKUgiAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSCXG4gKiAgICDilIIgICAgICAgICAg4pSM4pSA4pSA4pSA4pSA4pa84pSA4pSA4pSA4pSA4pSA4pSQICAgICAgICAgICAgICAgICDilIzilIDilIDilIDilIDilIDilLTilIDilIDilIDilIDilIDilIDilIDilJBcbiAqICAgIOKUlOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKWuuKUgkNvbXBvbmVudELilJzilIDilIDilIDilIBJbmplY3RvcuKUgOKUgOKUgOKUgOKWuuKUgk5vZGVJbmplY3RvckLilIJcbiAqICAgICAgICAgICAgICAg4pSU4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSYICAgICAgICAgICAgICAgICDilJTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJhcbiAqYGBgXG4gKlxuICogQHBhcmFtIGluamVjdG9yIGFuIEluamVjdG9yIHRvIGdldCB0aGUgcGFyZW50IG9mXG4gKiBAcmV0dXJucyBJbmplY3RvciB0aGUgcGFyZW50IG9mIHRoZSBnaXZlbiBpbmplY3RvclxuICovXG5mdW5jdGlvbiBnZXRJbmplY3RvclBhcmVudChpbmplY3RvcjogSW5qZWN0b3IpOiBJbmplY3RvcnxudWxsIHtcbiAgaWYgKGluamVjdG9yIGluc3RhbmNlb2YgUjNJbmplY3Rvcikge1xuICAgIHJldHVybiBpbmplY3Rvci5wYXJlbnQ7XG4gIH1cblxuICBsZXQgdE5vZGU6IFRFbGVtZW50Tm9kZXxUQ29udGFpbmVyTm9kZXxURWxlbWVudENvbnRhaW5lck5vZGV8bnVsbDtcbiAgbGV0IGxWaWV3OiBMVmlldzx1bmtub3duPjtcbiAgaWYgKGluamVjdG9yIGluc3RhbmNlb2YgTm9kZUluamVjdG9yKSB7XG4gICAgdE5vZGUgPSBnZXROb2RlSW5qZWN0b3JUTm9kZShpbmplY3Rvcik7XG4gICAgbFZpZXcgPSBnZXROb2RlSW5qZWN0b3JMVmlldyhpbmplY3Rvcik7XG4gIH0gZWxzZSBpZiAoaW5qZWN0b3IgaW5zdGFuY2VvZiBOdWxsSW5qZWN0b3IpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSBlbHNlIGlmIChpbmplY3RvciBpbnN0YW5jZW9mIENoYWluZWRJbmplY3Rvcikge1xuICAgIHJldHVybiBpbmplY3Rvci5wYXJlbnRJbmplY3RvcjtcbiAgfSBlbHNlIHtcbiAgICB0aHJvd0Vycm9yKFxuICAgICAgICAnZ2V0SW5qZWN0b3JQYXJlbnQgb25seSBzdXBwb3J0IGluamVjdG9ycyBvZiB0eXBlIFIzSW5qZWN0b3IsIE5vZGVJbmplY3RvciwgTnVsbEluamVjdG9yLCBDaGFpbmVkSW5qZWN0b3InKTtcbiAgfVxuXG4gIGNvbnN0IHBhcmVudExvY2F0aW9uID0gZ2V0UGFyZW50SW5qZWN0b3JMb2NhdGlvbihcbiAgICAgIHROb2RlIGFzIFRFbGVtZW50Tm9kZSB8IFRDb250YWluZXJOb2RlIHwgVEVsZW1lbnRDb250YWluZXJOb2RlLCBsVmlldyk7XG5cbiAgaWYgKGhhc1BhcmVudEluamVjdG9yKHBhcmVudExvY2F0aW9uKSkge1xuICAgIGNvbnN0IHBhcmVudEluamVjdG9ySW5kZXggPSBnZXRQYXJlbnRJbmplY3RvckluZGV4KHBhcmVudExvY2F0aW9uKTtcbiAgICBjb25zdCBwYXJlbnRMVmlldyA9IGdldFBhcmVudEluamVjdG9yVmlldyhwYXJlbnRMb2NhdGlvbiwgbFZpZXcpO1xuICAgIGNvbnN0IHBhcmVudFRWaWV3ID0gcGFyZW50TFZpZXdbVFZJRVddO1xuICAgIGNvbnN0IHBhcmVudFROb2RlID0gcGFyZW50VFZpZXcuZGF0YVtwYXJlbnRJbmplY3RvckluZGV4ICsgTm9kZUluamVjdG9yT2Zmc2V0LlROT0RFXSBhcyBUTm9kZTtcbiAgICByZXR1cm4gbmV3IE5vZGVJbmplY3RvcihcbiAgICAgICAgcGFyZW50VE5vZGUgYXMgVEVsZW1lbnROb2RlIHwgVENvbnRhaW5lck5vZGUgfCBURWxlbWVudENvbnRhaW5lck5vZGUsIHBhcmVudExWaWV3KTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBjaGFpbmVkSW5qZWN0b3IgPSBsVmlld1tJTkpFQ1RPUl0gYXMgQ2hhaW5lZEluamVjdG9yO1xuXG4gICAgLy8gQ2FzZSB3aGVyZSBjaGFpbmVkSW5qZWN0b3IuaW5qZWN0b3IgaXMgYW4gT3V0bGV0SW5qZWN0b3IgYW5kIGNoYWluZWRJbmplY3Rvci5pbmplY3Rvci5wYXJlbnRcbiAgICAvLyBpcyBhIE5vZGVJbmplY3Rvci5cbiAgICAvLyB0b2RvKGFsZWtzYW5kZXJib2R1cnJpKTogaWRlYWxseSBub3RoaW5nIGluIHBhY2thZ2VzL2NvcmUgc2hvdWxkIGRlYWxcbiAgICAvLyBkaXJlY3RseSB3aXRoIHJvdXRlciBjb25jZXJucy4gUmVmYWN0b3IgdGhpcyBzbyB0aGF0IHdlIGNhbiBtYWtlIHRoZSBqdW1wIGZyb21cbiAgICAvLyBOb2RlSW5qZWN0b3IgLT4gT3V0bGV0SW5qZWN0b3IgLT4gTm9kZUluamVjdG9yXG4gICAgLy8gd2l0aG91dCBleHBsaWN0bHkgcmVseWluZyBvbiB0eXBlcyBjb250cmFjdHMgZnJvbSBwYWNrYWdlcy9yb3V0ZXJcbiAgICBjb25zdCBpbmplY3RvclBhcmVudCA9IChjaGFpbmVkSW5qZWN0b3IuaW5qZWN0b3IgYXMgYW55KT8ucGFyZW50IGFzIEluamVjdG9yO1xuXG4gICAgaWYgKGluamVjdG9yUGFyZW50IGluc3RhbmNlb2YgTm9kZUluamVjdG9yKSB7XG4gICAgICByZXR1cm4gaW5qZWN0b3JQYXJlbnQ7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbW9kdWxlIGluamVjdG9yIG9mIGEgTm9kZUluamVjdG9yLlxuICpcbiAqIEBwYXJhbSBpbmplY3RvciBOb2RlSW5qZWN0b3IgdG8gZ2V0IG1vZHVsZSBpbmplY3RvciBvZlxuICogQHJldHVybnMgSW5qZWN0b3IgcmVwcmVzZW50aW5nIG1vZHVsZSBpbmplY3RvciBvZiB0aGUgZ2l2ZW4gTm9kZUluamVjdG9yXG4gKi9cbmZ1bmN0aW9uIGdldE1vZHVsZUluamVjdG9yT2ZOb2RlSW5qZWN0b3IoaW5qZWN0b3I6IE5vZGVJbmplY3Rvcik6IEluamVjdG9yIHtcbiAgbGV0IGxWaWV3OiBMVmlldzx1bmtub3duPjtcbiAgaWYgKGluamVjdG9yIGluc3RhbmNlb2YgTm9kZUluamVjdG9yKSB7XG4gICAgbFZpZXcgPSBnZXROb2RlSW5qZWN0b3JMVmlldyhpbmplY3Rvcik7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3dFcnJvcignZ2V0TW9kdWxlSW5qZWN0b3JPZk5vZGVJbmplY3RvciBtdXN0IGJlIGNhbGxlZCB3aXRoIGEgTm9kZUluamVjdG9yJyk7XG4gIH1cblxuICBjb25zdCBpbmogPSBsVmlld1tJTkpFQ1RPUl0gYXMgUjNJbmplY3RvciB8IENoYWluZWRJbmplY3RvcjtcbiAgY29uc3QgbW9kdWxlSW5qZWN0b3IgPSAoaW5qIGluc3RhbmNlb2YgQ2hhaW5lZEluamVjdG9yKSA/IGluai5wYXJlbnRJbmplY3RvciA6IGluai5wYXJlbnQ7XG4gIGlmICghbW9kdWxlSW5qZWN0b3IpIHtcbiAgICB0aHJvd0Vycm9yKCdOb2RlSW5qZWN0b3IgbXVzdCBoYXZlIHNvbWUgY29ubmVjdGlvbiB0byB0aGUgbW9kdWxlIGluamVjdG9yIHRyZWUnKTtcbiAgfVxuXG4gIHJldHVybiBtb2R1bGVJbmplY3Rvcjtcbn1cbiJdfQ==