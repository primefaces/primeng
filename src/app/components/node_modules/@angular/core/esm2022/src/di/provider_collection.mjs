/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { RuntimeError } from '../errors';
import { getComponentDef } from '../render3/definition';
import { getFactoryDef } from '../render3/definition_factory';
import { throwCyclicDependencyError, throwInvalidProviderError } from '../render3/errors_di';
import { stringifyForError } from '../render3/util/stringify_utils';
import { deepForEach } from '../util/array_utils';
import { EMPTY_ARRAY } from '../util/empty';
import { getClosureSafeProperty } from '../util/property';
import { stringify } from '../util/stringify';
import { resolveForwardRef } from './forward_ref';
import { ENVIRONMENT_INITIALIZER } from './initializer_token';
import { ɵɵinject as inject } from './injector_compatibility';
import { getInjectorDef } from './interface/defs';
import { isEnvironmentProviders } from './interface/provider';
import { INJECTOR_DEF_TYPES } from './internal_tokens';
/**
 * Wrap an array of `Provider`s into `EnvironmentProviders`, preventing them from being accidentally
 * referenced in `@Component` in a component injector.
 */
export function makeEnvironmentProviders(providers) {
    return {
        ɵproviders: providers,
    };
}
/**
 * Collects providers from all NgModules and standalone components, including transitively imported
 * ones.
 *
 * Providers extracted via `importProvidersFrom` are only usable in an application injector or
 * another environment injector (such as a route injector). They should not be used in component
 * providers.
 *
 * More information about standalone components can be found in [this
 * guide](guide/standalone-components).
 *
 * @usageNotes
 * The results of the `importProvidersFrom` call can be used in the `bootstrapApplication` call:
 *
 * ```typescript
 * await bootstrapApplication(RootComponent, {
 *   providers: [
 *     importProvidersFrom(NgModuleOne, NgModuleTwo)
 *   ]
 * });
 * ```
 *
 * You can also use the `importProvidersFrom` results in the `providers` field of a route, when a
 * standalone component is used:
 *
 * ```typescript
 * export const ROUTES: Route[] = [
 *   {
 *     path: 'foo',
 *     providers: [
 *       importProvidersFrom(NgModuleOne, NgModuleTwo)
 *     ],
 *     component: YourStandaloneComponent
 *   }
 * ];
 * ```
 *
 * @returns Collected providers from the specified list of types.
 * @publicApi
 */
export function importProvidersFrom(...sources) {
    return {
        ɵproviders: internalImportProvidersFrom(true, sources),
        ɵfromNgModule: true,
    };
}
export function internalImportProvidersFrom(checkForStandaloneCmp, ...sources) {
    const providersOut = [];
    const dedup = new Set(); // already seen types
    let injectorTypesWithProviders;
    const collectProviders = (provider) => {
        providersOut.push(provider);
    };
    deepForEach(sources, source => {
        if ((typeof ngDevMode === 'undefined' || ngDevMode) && checkForStandaloneCmp) {
            const cmpDef = getComponentDef(source);
            if (cmpDef?.standalone) {
                throw new RuntimeError(800 /* RuntimeErrorCode.IMPORT_PROVIDERS_FROM_STANDALONE */, `Importing providers supports NgModule or ModuleWithProviders but got a standalone component "${stringifyForError(source)}"`);
            }
        }
        // Narrow `source` to access the internal type analogue for `ModuleWithProviders`.
        const internalSource = source;
        if (walkProviderTree(internalSource, collectProviders, [], dedup)) {
            injectorTypesWithProviders ||= [];
            injectorTypesWithProviders.push(internalSource);
        }
    });
    // Collect all providers from `ModuleWithProviders` types.
    if (injectorTypesWithProviders !== undefined) {
        processInjectorTypesWithProviders(injectorTypesWithProviders, collectProviders);
    }
    return providersOut;
}
/**
 * Collects all providers from the list of `ModuleWithProviders` and appends them to the provided
 * array.
 */
function processInjectorTypesWithProviders(typesWithProviders, visitor) {
    for (let i = 0; i < typesWithProviders.length; i++) {
        const { ngModule, providers } = typesWithProviders[i];
        deepForEachProvider(providers, provider => {
            ngDevMode && validateProvider(provider, providers || EMPTY_ARRAY, ngModule);
            visitor(provider, ngModule);
        });
    }
}
/**
 * The logic visits an `InjectorType`, an `InjectorTypeWithProviders`, or a standalone
 * `ComponentType`, and all of its transitive providers and collects providers.
 *
 * If an `InjectorTypeWithProviders` that declares providers besides the type is specified,
 * the function will return "true" to indicate that the providers of the type definition need
 * to be processed. This allows us to process providers of injector types after all imports of
 * an injector definition are processed. (following View Engine semantics: see FW-1349)
 */
export function walkProviderTree(container, visitor, parents, dedup) {
    container = resolveForwardRef(container);
    if (!container)
        return false;
    // The actual type which had the definition. Usually `container`, but may be an unwrapped type
    // from `InjectorTypeWithProviders`.
    let defType = null;
    let injDef = getInjectorDef(container);
    const cmpDef = !injDef && getComponentDef(container);
    if (!injDef && !cmpDef) {
        // `container` is not an injector type or a component type. It might be:
        //  * An `InjectorTypeWithProviders` that wraps an injector type.
        //  * A standalone directive or pipe that got pulled in from a standalone component's
        //    dependencies.
        // Try to unwrap it as an `InjectorTypeWithProviders` first.
        const ngModule = container.ngModule;
        injDef = getInjectorDef(ngModule);
        if (injDef) {
            defType = ngModule;
        }
        else {
            // Not a component or injector type, so ignore it.
            return false;
        }
    }
    else if (cmpDef && !cmpDef.standalone) {
        return false;
    }
    else {
        defType = container;
    }
    // Check for circular dependencies.
    if (ngDevMode && parents.indexOf(defType) !== -1) {
        const defName = stringify(defType);
        const path = parents.map(stringify);
        throwCyclicDependencyError(defName, path);
    }
    // Check for multiple imports of the same module
    const isDuplicate = dedup.has(defType);
    if (cmpDef) {
        if (isDuplicate) {
            // This component definition has already been processed.
            return false;
        }
        dedup.add(defType);
        if (cmpDef.dependencies) {
            const deps = typeof cmpDef.dependencies === 'function' ? cmpDef.dependencies() : cmpDef.dependencies;
            for (const dep of deps) {
                walkProviderTree(dep, visitor, parents, dedup);
            }
        }
    }
    else if (injDef) {
        // First, include providers from any imports.
        if (injDef.imports != null && !isDuplicate) {
            // Before processing defType's imports, add it to the set of parents. This way, if it ends
            // up deeply importing itself, this can be detected.
            ngDevMode && parents.push(defType);
            // Add it to the set of dedups. This way we can detect multiple imports of the same module
            dedup.add(defType);
            let importTypesWithProviders;
            try {
                deepForEach(injDef.imports, imported => {
                    if (walkProviderTree(imported, visitor, parents, dedup)) {
                        importTypesWithProviders ||= [];
                        // If the processed import is an injector type with providers, we store it in the
                        // list of import types with providers, so that we can process those afterwards.
                        importTypesWithProviders.push(imported);
                    }
                });
            }
            finally {
                // Remove it from the parents set when finished.
                ngDevMode && parents.pop();
            }
            // Imports which are declared with providers (TypeWithProviders) need to be processed
            // after all imported modules are processed. This is similar to how View Engine
            // processes/merges module imports in the metadata resolver. See: FW-1349.
            if (importTypesWithProviders !== undefined) {
                processInjectorTypesWithProviders(importTypesWithProviders, visitor);
            }
        }
        if (!isDuplicate) {
            // Track the InjectorType and add a provider for it.
            // It's important that this is done after the def's imports.
            const factory = getFactoryDef(defType) || (() => new defType());
            // Append extra providers to make more info available for consumers (to retrieve an injector
            // type), as well as internally (to calculate an injection scope correctly and eagerly
            // instantiate a `defType` when an injector is created).
            // Provider to create `defType` using its factory.
            visitor({ provide: defType, useFactory: factory, deps: EMPTY_ARRAY }, defType);
            // Make this `defType` available to an internal logic that calculates injector scope.
            visitor({ provide: INJECTOR_DEF_TYPES, useValue: defType, multi: true }, defType);
            // Provider to eagerly instantiate `defType` via `INJECTOR_INITIALIZER`.
            visitor({ provide: ENVIRONMENT_INITIALIZER, useValue: () => inject(defType), multi: true }, defType);
        }
        // Next, include providers listed on the definition itself.
        const defProviders = injDef.providers;
        if (defProviders != null && !isDuplicate) {
            const injectorType = container;
            deepForEachProvider(defProviders, provider => {
                ngDevMode && validateProvider(provider, defProviders, injectorType);
                visitor(provider, injectorType);
            });
        }
    }
    else {
        // Should not happen, but just in case.
        return false;
    }
    return (defType !== container &&
        container.providers !== undefined);
}
function validateProvider(provider, providers, containerType) {
    if (isTypeProvider(provider) || isValueProvider(provider) || isFactoryProvider(provider) ||
        isExistingProvider(provider)) {
        return;
    }
    // Here we expect the provider to be a `useClass` provider (by elimination).
    const classRef = resolveForwardRef(provider && (provider.useClass || provider.provide));
    if (!classRef) {
        throwInvalidProviderError(containerType, providers, provider);
    }
}
function deepForEachProvider(providers, fn) {
    for (let provider of providers) {
        if (isEnvironmentProviders(provider)) {
            provider = provider.ɵproviders;
        }
        if (Array.isArray(provider)) {
            deepForEachProvider(provider, fn);
        }
        else {
            fn(provider);
        }
    }
}
export const USE_VALUE = getClosureSafeProperty({ provide: String, useValue: getClosureSafeProperty });
export function isValueProvider(value) {
    return value !== null && typeof value == 'object' && USE_VALUE in value;
}
export function isExistingProvider(value) {
    return !!(value && value.useExisting);
}
export function isFactoryProvider(value) {
    return !!(value && value.useFactory);
}
export function isTypeProvider(value) {
    return typeof value === 'function';
}
export function isClassProvider(value) {
    return !!value.useClass;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmlkZXJfY29sbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2RpL3Byb3ZpZGVyX2NvbGxlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBbUIsTUFBTSxXQUFXLENBQUM7QUFFekQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3RELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUMsMEJBQTBCLEVBQUUseUJBQXlCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUMzRixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN4RCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFNUMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hELE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzVELE9BQU8sRUFBQyxRQUFRLElBQUksTUFBTSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxFQUFDLGNBQWMsRUFBMEMsTUFBTSxrQkFBa0IsQ0FBQztBQUN6RixPQUFPLEVBQXVKLHNCQUFzQixFQUFrRixNQUFNLHNCQUFzQixDQUFDO0FBQ25TLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRXJEOzs7R0FHRztBQUNILE1BQU0sVUFBVSx3QkFBd0IsQ0FBQyxTQUE0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QyxFQUFFLENBQUM7WUFDckMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFDakMsQ0FBQztRQUNELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1lBQzVCLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNwQyxDQUFDO2FBQU0sQ0FBQztZQUNOLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNmLENBQUM7SUFDSCxDQUFDO0FBQ0gsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FDbEIsc0JBQXNCLENBQWdCLEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsc0JBQXNCLEVBQUMsQ0FBQyxDQUFDO0FBRS9GLE1BQU0sVUFBVSxlQUFlLENBQUMsS0FBcUI7SUFDbkQsT0FBTyxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU8sS0FBSyxJQUFJLFFBQVEsSUFBSSxTQUFTLElBQUksS0FBSyxDQUFDO0FBQzFFLENBQUM7QUFFRCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsS0FBcUI7SUFDdEQsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUssS0FBMEIsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUM5RCxDQUFDO0FBRUQsTUFBTSxVQUFVLGlCQUFpQixDQUFDLEtBQXFCO0lBQ3JELE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFLLEtBQXlCLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDNUQsQ0FBQztBQUVELE1BQU0sVUFBVSxjQUFjLENBQUMsS0FBcUI7SUFDbEQsT0FBTyxPQUFPLEtBQUssS0FBSyxVQUFVLENBQUM7QUFDckMsQ0FBQztBQUVELE1BQU0sVUFBVSxlQUFlLENBQUMsS0FBcUI7SUFDbkQsT0FBTyxDQUFDLENBQUUsS0FBNkMsQ0FBQyxRQUFRLENBQUM7QUFDbkUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1J1bnRpbWVFcnJvciwgUnVudGltZUVycm9yQ29kZX0gZnJvbSAnLi4vZXJyb3JzJztcbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3R5cGUnO1xuaW1wb3J0IHtnZXRDb21wb25lbnREZWZ9IGZyb20gJy4uL3JlbmRlcjMvZGVmaW5pdGlvbic7XG5pbXBvcnQge2dldEZhY3RvcnlEZWZ9IGZyb20gJy4uL3JlbmRlcjMvZGVmaW5pdGlvbl9mYWN0b3J5JztcbmltcG9ydCB7dGhyb3dDeWNsaWNEZXBlbmRlbmN5RXJyb3IsIHRocm93SW52YWxpZFByb3ZpZGVyRXJyb3J9IGZyb20gJy4uL3JlbmRlcjMvZXJyb3JzX2RpJztcbmltcG9ydCB7c3RyaW5naWZ5Rm9yRXJyb3J9IGZyb20gJy4uL3JlbmRlcjMvdXRpbC9zdHJpbmdpZnlfdXRpbHMnO1xuaW1wb3J0IHtkZWVwRm9yRWFjaH0gZnJvbSAnLi4vdXRpbC9hcnJheV91dGlscyc7XG5pbXBvcnQge0VNUFRZX0FSUkFZfSBmcm9tICcuLi91dGlsL2VtcHR5JztcbmltcG9ydCB7Z2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eX0gZnJvbSAnLi4vdXRpbC9wcm9wZXJ0eSc7XG5pbXBvcnQge3N0cmluZ2lmeX0gZnJvbSAnLi4vdXRpbC9zdHJpbmdpZnknO1xuXG5pbXBvcnQge3Jlc29sdmVGb3J3YXJkUmVmfSBmcm9tICcuL2ZvcndhcmRfcmVmJztcbmltcG9ydCB7RU5WSVJPTk1FTlRfSU5JVElBTElaRVJ9IGZyb20gJy4vaW5pdGlhbGl6ZXJfdG9rZW4nO1xuaW1wb3J0IHvJtcm1aW5qZWN0IGFzIGluamVjdH0gZnJvbSAnLi9pbmplY3Rvcl9jb21wYXRpYmlsaXR5JztcbmltcG9ydCB7Z2V0SW5qZWN0b3JEZWYsIEluamVjdG9yVHlwZSwgSW5qZWN0b3JUeXBlV2l0aFByb3ZpZGVyc30gZnJvbSAnLi9pbnRlcmZhY2UvZGVmcyc7XG5pbXBvcnQge0NsYXNzUHJvdmlkZXIsIENvbnN0cnVjdG9yUHJvdmlkZXIsIEVudmlyb25tZW50UHJvdmlkZXJzLCBFeGlzdGluZ1Byb3ZpZGVyLCBGYWN0b3J5UHJvdmlkZXIsIEltcG9ydGVkTmdNb2R1bGVQcm92aWRlcnMsIEludGVybmFsRW52aXJvbm1lbnRQcm92aWRlcnMsIGlzRW52aXJvbm1lbnRQcm92aWRlcnMsIE1vZHVsZVdpdGhQcm92aWRlcnMsIFByb3ZpZGVyLCBTdGF0aWNDbGFzc1Byb3ZpZGVyLCBUeXBlUHJvdmlkZXIsIFZhbHVlUHJvdmlkZXJ9IGZyb20gJy4vaW50ZXJmYWNlL3Byb3ZpZGVyJztcbmltcG9ydCB7SU5KRUNUT1JfREVGX1RZUEVTfSBmcm9tICcuL2ludGVybmFsX3Rva2Vucyc7XG5cbi8qKlxuICogV3JhcCBhbiBhcnJheSBvZiBgUHJvdmlkZXJgcyBpbnRvIGBFbnZpcm9ubWVudFByb3ZpZGVyc2AsIHByZXZlbnRpbmcgdGhlbSBmcm9tIGJlaW5nIGFjY2lkZW50YWxseVxuICogcmVmZXJlbmNlZCBpbiBgQENvbXBvbmVudGAgaW4gYSBjb21wb25lbnQgaW5qZWN0b3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYWtlRW52aXJvbm1lbnRQcm92aWRlcnMocHJvdmlkZXJzOiAoUHJvdmlkZXJ8RW52aXJvbm1lbnRQcm92aWRlcnMpW10pOlxuICAgIEVudmlyb25tZW50UHJvdmlkZXJzIHtcbiAgcmV0dXJuIHtcbiAgICDJtXByb3ZpZGVyczogcHJvdmlkZXJzLFxuICB9IGFzIHVua25vd24gYXMgRW52aXJvbm1lbnRQcm92aWRlcnM7XG59XG5cbi8qKlxuICogQSBzb3VyY2Ugb2YgcHJvdmlkZXJzIGZvciB0aGUgYGltcG9ydFByb3ZpZGVyc0Zyb21gIGZ1bmN0aW9uLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IHR5cGUgSW1wb3J0UHJvdmlkZXJzU291cmNlID1cbiAgICBUeXBlPHVua25vd24+fE1vZHVsZVdpdGhQcm92aWRlcnM8dW5rbm93bj58QXJyYXk8SW1wb3J0UHJvdmlkZXJzU291cmNlPjtcblxudHlwZSBXYWxrUHJvdmlkZXJUcmVlVmlzaXRvciA9XG4gICAgKHByb3ZpZGVyOiBTaW5nbGVQcm92aWRlciwgY29udGFpbmVyOiBUeXBlPHVua25vd24+fEluamVjdG9yVHlwZTx1bmtub3duPikgPT4gdm9pZDtcblxuLyoqXG4gKiBDb2xsZWN0cyBwcm92aWRlcnMgZnJvbSBhbGwgTmdNb2R1bGVzIGFuZCBzdGFuZGFsb25lIGNvbXBvbmVudHMsIGluY2x1ZGluZyB0cmFuc2l0aXZlbHkgaW1wb3J0ZWRcbiAqIG9uZXMuXG4gKlxuICogUHJvdmlkZXJzIGV4dHJhY3RlZCB2aWEgYGltcG9ydFByb3ZpZGVyc0Zyb21gIGFyZSBvbmx5IHVzYWJsZSBpbiBhbiBhcHBsaWNhdGlvbiBpbmplY3RvciBvclxuICogYW5vdGhlciBlbnZpcm9ubWVudCBpbmplY3RvciAoc3VjaCBhcyBhIHJvdXRlIGluamVjdG9yKS4gVGhleSBzaG91bGQgbm90IGJlIHVzZWQgaW4gY29tcG9uZW50XG4gKiBwcm92aWRlcnMuXG4gKlxuICogTW9yZSBpbmZvcm1hdGlvbiBhYm91dCBzdGFuZGFsb25lIGNvbXBvbmVudHMgY2FuIGJlIGZvdW5kIGluIFt0aGlzXG4gKiBndWlkZV0oZ3VpZGUvc3RhbmRhbG9uZS1jb21wb25lbnRzKS5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogVGhlIHJlc3VsdHMgb2YgdGhlIGBpbXBvcnRQcm92aWRlcnNGcm9tYCBjYWxsIGNhbiBiZSB1c2VkIGluIHRoZSBgYm9vdHN0cmFwQXBwbGljYXRpb25gIGNhbGw6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogYXdhaXQgYm9vdHN0cmFwQXBwbGljYXRpb24oUm9vdENvbXBvbmVudCwge1xuICogICBwcm92aWRlcnM6IFtcbiAqICAgICBpbXBvcnRQcm92aWRlcnNGcm9tKE5nTW9kdWxlT25lLCBOZ01vZHVsZVR3bylcbiAqICAgXVxuICogfSk7XG4gKiBgYGBcbiAqXG4gKiBZb3UgY2FuIGFsc28gdXNlIHRoZSBgaW1wb3J0UHJvdmlkZXJzRnJvbWAgcmVzdWx0cyBpbiB0aGUgYHByb3ZpZGVyc2AgZmllbGQgb2YgYSByb3V0ZSwgd2hlbiBhXG4gKiBzdGFuZGFsb25lIGNvbXBvbmVudCBpcyB1c2VkOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGV4cG9ydCBjb25zdCBST1VURVM6IFJvdXRlW10gPSBbXG4gKiAgIHtcbiAqICAgICBwYXRoOiAnZm9vJyxcbiAqICAgICBwcm92aWRlcnM6IFtcbiAqICAgICAgIGltcG9ydFByb3ZpZGVyc0Zyb20oTmdNb2R1bGVPbmUsIE5nTW9kdWxlVHdvKVxuICogICAgIF0sXG4gKiAgICAgY29tcG9uZW50OiBZb3VyU3RhbmRhbG9uZUNvbXBvbmVudFxuICogICB9XG4gKiBdO1xuICogYGBgXG4gKlxuICogQHJldHVybnMgQ29sbGVjdGVkIHByb3ZpZGVycyBmcm9tIHRoZSBzcGVjaWZpZWQgbGlzdCBvZiB0eXBlcy5cbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGltcG9ydFByb3ZpZGVyc0Zyb20oLi4uc291cmNlczogSW1wb3J0UHJvdmlkZXJzU291cmNlW10pOiBFbnZpcm9ubWVudFByb3ZpZGVycyB7XG4gIHJldHVybiB7XG4gICAgybVwcm92aWRlcnM6IGludGVybmFsSW1wb3J0UHJvdmlkZXJzRnJvbSh0cnVlLCBzb3VyY2VzKSxcbiAgICDJtWZyb21OZ01vZHVsZTogdHJ1ZSxcbiAgfSBhcyBJbnRlcm5hbEVudmlyb25tZW50UHJvdmlkZXJzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW50ZXJuYWxJbXBvcnRQcm92aWRlcnNGcm9tKFxuICAgIGNoZWNrRm9yU3RhbmRhbG9uZUNtcDogYm9vbGVhbiwgLi4uc291cmNlczogSW1wb3J0UHJvdmlkZXJzU291cmNlW10pOiBQcm92aWRlcltdIHtcbiAgY29uc3QgcHJvdmlkZXJzT3V0OiBTaW5nbGVQcm92aWRlcltdID0gW107XG4gIGNvbnN0IGRlZHVwID0gbmV3IFNldDxUeXBlPHVua25vd24+PigpOyAgLy8gYWxyZWFkeSBzZWVuIHR5cGVzXG4gIGxldCBpbmplY3RvclR5cGVzV2l0aFByb3ZpZGVyczogSW5qZWN0b3JUeXBlV2l0aFByb3ZpZGVyczx1bmtub3duPltdfHVuZGVmaW5lZDtcblxuICBjb25zdCBjb2xsZWN0UHJvdmlkZXJzOiBXYWxrUHJvdmlkZXJUcmVlVmlzaXRvciA9IChwcm92aWRlcikgPT4ge1xuICAgIHByb3ZpZGVyc091dC5wdXNoKHByb3ZpZGVyKTtcbiAgfTtcblxuICBkZWVwRm9yRWFjaChzb3VyY2VzLCBzb3VyY2UgPT4ge1xuICAgIGlmICgodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSAmJiBjaGVja0ZvclN0YW5kYWxvbmVDbXApIHtcbiAgICAgIGNvbnN0IGNtcERlZiA9IGdldENvbXBvbmVudERlZihzb3VyY2UpO1xuICAgICAgaWYgKGNtcERlZj8uc3RhbmRhbG9uZSkge1xuICAgICAgICB0aHJvdyBuZXcgUnVudGltZUVycm9yKFxuICAgICAgICAgICAgUnVudGltZUVycm9yQ29kZS5JTVBPUlRfUFJPVklERVJTX0ZST01fU1RBTkRBTE9ORSxcbiAgICAgICAgICAgIGBJbXBvcnRpbmcgcHJvdmlkZXJzIHN1cHBvcnRzIE5nTW9kdWxlIG9yIE1vZHVsZVdpdGhQcm92aWRlcnMgYnV0IGdvdCBhIHN0YW5kYWxvbmUgY29tcG9uZW50IFwiJHtcbiAgICAgICAgICAgICAgICBzdHJpbmdpZnlGb3JFcnJvcihzb3VyY2UpfVwiYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTmFycm93IGBzb3VyY2VgIHRvIGFjY2VzcyB0aGUgaW50ZXJuYWwgdHlwZSBhbmFsb2d1ZSBmb3IgYE1vZHVsZVdpdGhQcm92aWRlcnNgLlxuICAgIGNvbnN0IGludGVybmFsU291cmNlID0gc291cmNlIGFzIFR5cGU8dW5rbm93bj58IEluamVjdG9yVHlwZVdpdGhQcm92aWRlcnM8dW5rbm93bj47XG4gICAgaWYgKHdhbGtQcm92aWRlclRyZWUoaW50ZXJuYWxTb3VyY2UsIGNvbGxlY3RQcm92aWRlcnMsIFtdLCBkZWR1cCkpIHtcbiAgICAgIGluamVjdG9yVHlwZXNXaXRoUHJvdmlkZXJzIHx8PSBbXTtcbiAgICAgIGluamVjdG9yVHlwZXNXaXRoUHJvdmlkZXJzLnB1c2goaW50ZXJuYWxTb3VyY2UpO1xuICAgIH1cbiAgfSk7XG4gIC8vIENvbGxlY3QgYWxsIHByb3ZpZGVycyBmcm9tIGBNb2R1bGVXaXRoUHJvdmlkZXJzYCB0eXBlcy5cbiAgaWYgKGluamVjdG9yVHlwZXNXaXRoUHJvdmlkZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICBwcm9jZXNzSW5qZWN0b3JUeXBlc1dpdGhQcm92aWRlcnMoaW5qZWN0b3JUeXBlc1dpdGhQcm92aWRlcnMsIGNvbGxlY3RQcm92aWRlcnMpO1xuICB9XG5cbiAgcmV0dXJuIHByb3ZpZGVyc091dDtcbn1cblxuLyoqXG4gKiBDb2xsZWN0cyBhbGwgcHJvdmlkZXJzIGZyb20gdGhlIGxpc3Qgb2YgYE1vZHVsZVdpdGhQcm92aWRlcnNgIGFuZCBhcHBlbmRzIHRoZW0gdG8gdGhlIHByb3ZpZGVkXG4gKiBhcnJheS5cbiAqL1xuZnVuY3Rpb24gcHJvY2Vzc0luamVjdG9yVHlwZXNXaXRoUHJvdmlkZXJzKFxuICAgIHR5cGVzV2l0aFByb3ZpZGVyczogSW5qZWN0b3JUeXBlV2l0aFByb3ZpZGVyczx1bmtub3duPltdLFxuICAgIHZpc2l0b3I6IFdhbGtQcm92aWRlclRyZWVWaXNpdG9yKTogdm9pZCB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdHlwZXNXaXRoUHJvdmlkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qge25nTW9kdWxlLCBwcm92aWRlcnN9ID0gdHlwZXNXaXRoUHJvdmlkZXJzW2ldO1xuICAgIGRlZXBGb3JFYWNoUHJvdmlkZXIocHJvdmlkZXJzISBhcyBBcnJheTxQcm92aWRlcnxJbnRlcm5hbEVudmlyb25tZW50UHJvdmlkZXJzPiwgcHJvdmlkZXIgPT4ge1xuICAgICAgbmdEZXZNb2RlICYmIHZhbGlkYXRlUHJvdmlkZXIocHJvdmlkZXIsIHByb3ZpZGVycyB8fCBFTVBUWV9BUlJBWSwgbmdNb2R1bGUpO1xuICAgICAgdmlzaXRvcihwcm92aWRlciwgbmdNb2R1bGUpO1xuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogSW50ZXJuYWwgdHlwZSBmb3IgYSBzaW5nbGUgcHJvdmlkZXIgaW4gYSBkZWVwIHByb3ZpZGVyIGFycmF5LlxuICovXG5leHBvcnQgdHlwZSBTaW5nbGVQcm92aWRlciA9IFR5cGVQcm92aWRlcnxWYWx1ZVByb3ZpZGVyfENsYXNzUHJvdmlkZXJ8Q29uc3RydWN0b3JQcm92aWRlcnxcbiAgICBFeGlzdGluZ1Byb3ZpZGVyfEZhY3RvcnlQcm92aWRlcnxTdGF0aWNDbGFzc1Byb3ZpZGVyO1xuXG4vKipcbiAqIFRoZSBsb2dpYyB2aXNpdHMgYW4gYEluamVjdG9yVHlwZWAsIGFuIGBJbmplY3RvclR5cGVXaXRoUHJvdmlkZXJzYCwgb3IgYSBzdGFuZGFsb25lXG4gKiBgQ29tcG9uZW50VHlwZWAsIGFuZCBhbGwgb2YgaXRzIHRyYW5zaXRpdmUgcHJvdmlkZXJzIGFuZCBjb2xsZWN0cyBwcm92aWRlcnMuXG4gKlxuICogSWYgYW4gYEluamVjdG9yVHlwZVdpdGhQcm92aWRlcnNgIHRoYXQgZGVjbGFyZXMgcHJvdmlkZXJzIGJlc2lkZXMgdGhlIHR5cGUgaXMgc3BlY2lmaWVkLFxuICogdGhlIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIFwidHJ1ZVwiIHRvIGluZGljYXRlIHRoYXQgdGhlIHByb3ZpZGVycyBvZiB0aGUgdHlwZSBkZWZpbml0aW9uIG5lZWRcbiAqIHRvIGJlIHByb2Nlc3NlZC4gVGhpcyBhbGxvd3MgdXMgdG8gcHJvY2VzcyBwcm92aWRlcnMgb2YgaW5qZWN0b3IgdHlwZXMgYWZ0ZXIgYWxsIGltcG9ydHMgb2ZcbiAqIGFuIGluamVjdG9yIGRlZmluaXRpb24gYXJlIHByb2Nlc3NlZC4gKGZvbGxvd2luZyBWaWV3IEVuZ2luZSBzZW1hbnRpY3M6IHNlZSBGVy0xMzQ5KVxuICovXG5leHBvcnQgZnVuY3Rpb24gd2Fsa1Byb3ZpZGVyVHJlZShcbiAgICBjb250YWluZXI6IFR5cGU8dW5rbm93bj58SW5qZWN0b3JUeXBlV2l0aFByb3ZpZGVyczx1bmtub3duPiwgdmlzaXRvcjogV2Fsa1Byb3ZpZGVyVHJlZVZpc2l0b3IsXG4gICAgcGFyZW50czogVHlwZTx1bmtub3duPltdLFxuICAgIGRlZHVwOiBTZXQ8VHlwZTx1bmtub3duPj4pOiBjb250YWluZXIgaXMgSW5qZWN0b3JUeXBlV2l0aFByb3ZpZGVyczx1bmtub3duPiB7XG4gIGNvbnRhaW5lciA9IHJlc29sdmVGb3J3YXJkUmVmKGNvbnRhaW5lcik7XG4gIGlmICghY29udGFpbmVyKSByZXR1cm4gZmFsc2U7XG5cbiAgLy8gVGhlIGFjdHVhbCB0eXBlIHdoaWNoIGhhZCB0aGUgZGVmaW5pdGlvbi4gVXN1YWxseSBgY29udGFpbmVyYCwgYnV0IG1heSBiZSBhbiB1bndyYXBwZWQgdHlwZVxuICAvLyBmcm9tIGBJbmplY3RvclR5cGVXaXRoUHJvdmlkZXJzYC5cbiAgbGV0IGRlZlR5cGU6IFR5cGU8dW5rbm93bj58bnVsbCA9IG51bGw7XG5cbiAgbGV0IGluakRlZiA9IGdldEluamVjdG9yRGVmKGNvbnRhaW5lcik7XG4gIGNvbnN0IGNtcERlZiA9ICFpbmpEZWYgJiYgZ2V0Q29tcG9uZW50RGVmKGNvbnRhaW5lcik7XG4gIGlmICghaW5qRGVmICYmICFjbXBEZWYpIHtcbiAgICAvLyBgY29udGFpbmVyYCBpcyBub3QgYW4gaW5qZWN0b3IgdHlwZSBvciBhIGNvbXBvbmVudCB0eXBlLiBJdCBtaWdodCBiZTpcbiAgICAvLyAgKiBBbiBgSW5qZWN0b3JUeXBlV2l0aFByb3ZpZGVyc2AgdGhhdCB3cmFwcyBhbiBpbmplY3RvciB0eXBlLlxuICAgIC8vICAqIEEgc3RhbmRhbG9uZSBkaXJlY3RpdmUgb3IgcGlwZSB0aGF0IGdvdCBwdWxsZWQgaW4gZnJvbSBhIHN0YW5kYWxvbmUgY29tcG9uZW50J3NcbiAgICAvLyAgICBkZXBlbmRlbmNpZXMuXG4gICAgLy8gVHJ5IHRvIHVud3JhcCBpdCBhcyBhbiBgSW5qZWN0b3JUeXBlV2l0aFByb3ZpZGVyc2AgZmlyc3QuXG4gICAgY29uc3QgbmdNb2R1bGU6IFR5cGU8dW5rbm93bj58dW5kZWZpbmVkID1cbiAgICAgICAgKGNvbnRhaW5lciBhcyBJbmplY3RvclR5cGVXaXRoUHJvdmlkZXJzPGFueT4pLm5nTW9kdWxlIGFzIFR5cGU8dW5rbm93bj58IHVuZGVmaW5lZDtcbiAgICBpbmpEZWYgPSBnZXRJbmplY3RvckRlZihuZ01vZHVsZSk7XG4gICAgaWYgKGluakRlZikge1xuICAgICAgZGVmVHlwZSA9IG5nTW9kdWxlITtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTm90IGEgY29tcG9uZW50IG9yIGluamVjdG9yIHR5cGUsIHNvIGlnbm9yZSBpdC5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoY21wRGVmICYmICFjbXBEZWYuc3RhbmRhbG9uZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICBkZWZUeXBlID0gY29udGFpbmVyIGFzIFR5cGU8dW5rbm93bj47XG4gIH1cblxuICAvLyBDaGVjayBmb3IgY2lyY3VsYXIgZGVwZW5kZW5jaWVzLlxuICBpZiAobmdEZXZNb2RlICYmIHBhcmVudHMuaW5kZXhPZihkZWZUeXBlKSAhPT0gLTEpIHtcbiAgICBjb25zdCBkZWZOYW1lID0gc3RyaW5naWZ5KGRlZlR5cGUpO1xuICAgIGNvbnN0IHBhdGggPSBwYXJlbnRzLm1hcChzdHJpbmdpZnkpO1xuICAgIHRocm93Q3ljbGljRGVwZW5kZW5jeUVycm9yKGRlZk5hbWUsIHBhdGgpO1xuICB9XG5cbiAgLy8gQ2hlY2sgZm9yIG11bHRpcGxlIGltcG9ydHMgb2YgdGhlIHNhbWUgbW9kdWxlXG4gIGNvbnN0IGlzRHVwbGljYXRlID0gZGVkdXAuaGFzKGRlZlR5cGUpO1xuXG4gIGlmIChjbXBEZWYpIHtcbiAgICBpZiAoaXNEdXBsaWNhdGUpIHtcbiAgICAgIC8vIFRoaXMgY29tcG9uZW50IGRlZmluaXRpb24gaGFzIGFscmVhZHkgYmVlbiBwcm9jZXNzZWQuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGRlZHVwLmFkZChkZWZUeXBlKTtcblxuICAgIGlmIChjbXBEZWYuZGVwZW5kZW5jaWVzKSB7XG4gICAgICBjb25zdCBkZXBzID1cbiAgICAgICAgICB0eXBlb2YgY21wRGVmLmRlcGVuZGVuY2llcyA9PT0gJ2Z1bmN0aW9uJyA/IGNtcERlZi5kZXBlbmRlbmNpZXMoKSA6IGNtcERlZi5kZXBlbmRlbmNpZXM7XG4gICAgICBmb3IgKGNvbnN0IGRlcCBvZiBkZXBzKSB7XG4gICAgICAgIHdhbGtQcm92aWRlclRyZWUoZGVwLCB2aXNpdG9yLCBwYXJlbnRzLCBkZWR1cCk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKGluakRlZikge1xuICAgIC8vIEZpcnN0LCBpbmNsdWRlIHByb3ZpZGVycyBmcm9tIGFueSBpbXBvcnRzLlxuICAgIGlmIChpbmpEZWYuaW1wb3J0cyAhPSBudWxsICYmICFpc0R1cGxpY2F0ZSkge1xuICAgICAgLy8gQmVmb3JlIHByb2Nlc3NpbmcgZGVmVHlwZSdzIGltcG9ydHMsIGFkZCBpdCB0byB0aGUgc2V0IG9mIHBhcmVudHMuIFRoaXMgd2F5LCBpZiBpdCBlbmRzXG4gICAgICAvLyB1cCBkZWVwbHkgaW1wb3J0aW5nIGl0c2VsZiwgdGhpcyBjYW4gYmUgZGV0ZWN0ZWQuXG4gICAgICBuZ0Rldk1vZGUgJiYgcGFyZW50cy5wdXNoKGRlZlR5cGUpO1xuICAgICAgLy8gQWRkIGl0IHRvIHRoZSBzZXQgb2YgZGVkdXBzLiBUaGlzIHdheSB3ZSBjYW4gZGV0ZWN0IG11bHRpcGxlIGltcG9ydHMgb2YgdGhlIHNhbWUgbW9kdWxlXG4gICAgICBkZWR1cC5hZGQoZGVmVHlwZSk7XG5cbiAgICAgIGxldCBpbXBvcnRUeXBlc1dpdGhQcm92aWRlcnM6IChJbmplY3RvclR5cGVXaXRoUHJvdmlkZXJzPGFueT5bXSl8dW5kZWZpbmVkO1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGVlcEZvckVhY2goaW5qRGVmLmltcG9ydHMsIGltcG9ydGVkID0+IHtcbiAgICAgICAgICBpZiAod2Fsa1Byb3ZpZGVyVHJlZShpbXBvcnRlZCwgdmlzaXRvciwgcGFyZW50cywgZGVkdXApKSB7XG4gICAgICAgICAgICBpbXBvcnRUeXBlc1dpdGhQcm92aWRlcnMgfHw9IFtdO1xuICAgICAgICAgICAgLy8gSWYgdGhlIHByb2Nlc3NlZCBpbXBvcnQgaXMgYW4gaW5qZWN0b3IgdHlwZSB3aXRoIHByb3ZpZGVycywgd2Ugc3RvcmUgaXQgaW4gdGhlXG4gICAgICAgICAgICAvLyBsaXN0IG9mIGltcG9ydCB0eXBlcyB3aXRoIHByb3ZpZGVycywgc28gdGhhdCB3ZSBjYW4gcHJvY2VzcyB0aG9zZSBhZnRlcndhcmRzLlxuICAgICAgICAgICAgaW1wb3J0VHlwZXNXaXRoUHJvdmlkZXJzLnB1c2goaW1wb3J0ZWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICAvLyBSZW1vdmUgaXQgZnJvbSB0aGUgcGFyZW50cyBzZXQgd2hlbiBmaW5pc2hlZC5cbiAgICAgICAgbmdEZXZNb2RlICYmIHBhcmVudHMucG9wKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIEltcG9ydHMgd2hpY2ggYXJlIGRlY2xhcmVkIHdpdGggcHJvdmlkZXJzIChUeXBlV2l0aFByb3ZpZGVycykgbmVlZCB0byBiZSBwcm9jZXNzZWRcbiAgICAgIC8vIGFmdGVyIGFsbCBpbXBvcnRlZCBtb2R1bGVzIGFyZSBwcm9jZXNzZWQuIFRoaXMgaXMgc2ltaWxhciB0byBob3cgVmlldyBFbmdpbmVcbiAgICAgIC8vIHByb2Nlc3Nlcy9tZXJnZXMgbW9kdWxlIGltcG9ydHMgaW4gdGhlIG1ldGFkYXRhIHJlc29sdmVyLiBTZWU6IEZXLTEzNDkuXG4gICAgICBpZiAoaW1wb3J0VHlwZXNXaXRoUHJvdmlkZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcHJvY2Vzc0luamVjdG9yVHlwZXNXaXRoUHJvdmlkZXJzKGltcG9ydFR5cGVzV2l0aFByb3ZpZGVycywgdmlzaXRvcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFpc0R1cGxpY2F0ZSkge1xuICAgICAgLy8gVHJhY2sgdGhlIEluamVjdG9yVHlwZSBhbmQgYWRkIGEgcHJvdmlkZXIgZm9yIGl0LlxuICAgICAgLy8gSXQncyBpbXBvcnRhbnQgdGhhdCB0aGlzIGlzIGRvbmUgYWZ0ZXIgdGhlIGRlZidzIGltcG9ydHMuXG4gICAgICBjb25zdCBmYWN0b3J5ID0gZ2V0RmFjdG9yeURlZihkZWZUeXBlKSB8fCAoKCkgPT4gbmV3IGRlZlR5cGUhKCkpO1xuXG4gICAgICAvLyBBcHBlbmQgZXh0cmEgcHJvdmlkZXJzIHRvIG1ha2UgbW9yZSBpbmZvIGF2YWlsYWJsZSBmb3IgY29uc3VtZXJzICh0byByZXRyaWV2ZSBhbiBpbmplY3RvclxuICAgICAgLy8gdHlwZSksIGFzIHdlbGwgYXMgaW50ZXJuYWxseSAodG8gY2FsY3VsYXRlIGFuIGluamVjdGlvbiBzY29wZSBjb3JyZWN0bHkgYW5kIGVhZ2VybHlcbiAgICAgIC8vIGluc3RhbnRpYXRlIGEgYGRlZlR5cGVgIHdoZW4gYW4gaW5qZWN0b3IgaXMgY3JlYXRlZCkuXG5cbiAgICAgIC8vIFByb3ZpZGVyIHRvIGNyZWF0ZSBgZGVmVHlwZWAgdXNpbmcgaXRzIGZhY3RvcnkuXG4gICAgICB2aXNpdG9yKHtwcm92aWRlOiBkZWZUeXBlLCB1c2VGYWN0b3J5OiBmYWN0b3J5LCBkZXBzOiBFTVBUWV9BUlJBWX0sIGRlZlR5cGUpO1xuXG4gICAgICAvLyBNYWtlIHRoaXMgYGRlZlR5cGVgIGF2YWlsYWJsZSB0byBhbiBpbnRlcm5hbCBsb2dpYyB0aGF0IGNhbGN1bGF0ZXMgaW5qZWN0b3Igc2NvcGUuXG4gICAgICB2aXNpdG9yKHtwcm92aWRlOiBJTkpFQ1RPUl9ERUZfVFlQRVMsIHVzZVZhbHVlOiBkZWZUeXBlLCBtdWx0aTogdHJ1ZX0sIGRlZlR5cGUpO1xuXG4gICAgICAvLyBQcm92aWRlciB0byBlYWdlcmx5IGluc3RhbnRpYXRlIGBkZWZUeXBlYCB2aWEgYElOSkVDVE9SX0lOSVRJQUxJWkVSYC5cbiAgICAgIHZpc2l0b3IoXG4gICAgICAgICAge3Byb3ZpZGU6IEVOVklST05NRU5UX0lOSVRJQUxJWkVSLCB1c2VWYWx1ZTogKCkgPT4gaW5qZWN0KGRlZlR5cGUhKSwgbXVsdGk6IHRydWV9LFxuICAgICAgICAgIGRlZlR5cGUpO1xuICAgIH1cblxuICAgIC8vIE5leHQsIGluY2x1ZGUgcHJvdmlkZXJzIGxpc3RlZCBvbiB0aGUgZGVmaW5pdGlvbiBpdHNlbGYuXG4gICAgY29uc3QgZGVmUHJvdmlkZXJzID0gaW5qRGVmLnByb3ZpZGVycyBhcyBBcnJheTxTaW5nbGVQcm92aWRlcnxJbnRlcm5hbEVudmlyb25tZW50UHJvdmlkZXJzPjtcbiAgICBpZiAoZGVmUHJvdmlkZXJzICE9IG51bGwgJiYgIWlzRHVwbGljYXRlKSB7XG4gICAgICBjb25zdCBpbmplY3RvclR5cGUgPSBjb250YWluZXIgYXMgSW5qZWN0b3JUeXBlPGFueT47XG4gICAgICBkZWVwRm9yRWFjaFByb3ZpZGVyKGRlZlByb3ZpZGVycywgcHJvdmlkZXIgPT4ge1xuICAgICAgICBuZ0Rldk1vZGUgJiYgdmFsaWRhdGVQcm92aWRlcihwcm92aWRlciBhcyBTaW5nbGVQcm92aWRlciwgZGVmUHJvdmlkZXJzLCBpbmplY3RvclR5cGUpO1xuICAgICAgICB2aXNpdG9yKHByb3ZpZGVyLCBpbmplY3RvclR5cGUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIFNob3VsZCBub3QgaGFwcGVuLCBidXQganVzdCBpbiBjYXNlLlxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgICBkZWZUeXBlICE9PSBjb250YWluZXIgJiZcbiAgICAgIChjb250YWluZXIgYXMgSW5qZWN0b3JUeXBlV2l0aFByb3ZpZGVyczxhbnk+KS5wcm92aWRlcnMgIT09IHVuZGVmaW5lZCk7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlUHJvdmlkZXIoXG4gICAgcHJvdmlkZXI6IFNpbmdsZVByb3ZpZGVyLCBwcm92aWRlcnM6IEFycmF5PFNpbmdsZVByb3ZpZGVyfEludGVybmFsRW52aXJvbm1lbnRQcm92aWRlcnM+LFxuICAgIGNvbnRhaW5lclR5cGU6IFR5cGU8dW5rbm93bj4pOiB2b2lkIHtcbiAgaWYgKGlzVHlwZVByb3ZpZGVyKHByb3ZpZGVyKSB8fCBpc1ZhbHVlUHJvdmlkZXIocHJvdmlkZXIpIHx8IGlzRmFjdG9yeVByb3ZpZGVyKHByb3ZpZGVyKSB8fFxuICAgICAgaXNFeGlzdGluZ1Byb3ZpZGVyKHByb3ZpZGVyKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEhlcmUgd2UgZXhwZWN0IHRoZSBwcm92aWRlciB0byBiZSBhIGB1c2VDbGFzc2AgcHJvdmlkZXIgKGJ5IGVsaW1pbmF0aW9uKS5cbiAgY29uc3QgY2xhc3NSZWYgPSByZXNvbHZlRm9yd2FyZFJlZihcbiAgICAgIHByb3ZpZGVyICYmICgocHJvdmlkZXIgYXMgU3RhdGljQ2xhc3NQcm92aWRlciB8IENsYXNzUHJvdmlkZXIpLnVzZUNsYXNzIHx8IHByb3ZpZGVyLnByb3ZpZGUpKTtcbiAgaWYgKCFjbGFzc1JlZikge1xuICAgIHRocm93SW52YWxpZFByb3ZpZGVyRXJyb3IoY29udGFpbmVyVHlwZSwgcHJvdmlkZXJzLCBwcm92aWRlcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVlcEZvckVhY2hQcm92aWRlcihcbiAgICBwcm92aWRlcnM6IEFycmF5PFByb3ZpZGVyfEludGVybmFsRW52aXJvbm1lbnRQcm92aWRlcnM+LFxuICAgIGZuOiAocHJvdmlkZXI6IFNpbmdsZVByb3ZpZGVyKSA9PiB2b2lkKTogdm9pZCB7XG4gIGZvciAobGV0IHByb3ZpZGVyIG9mIHByb3ZpZGVycykge1xuICAgIGlmIChpc0Vudmlyb25tZW50UHJvdmlkZXJzKHByb3ZpZGVyKSkge1xuICAgICAgcHJvdmlkZXIgPSBwcm92aWRlci7JtXByb3ZpZGVycztcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocHJvdmlkZXIpKSB7XG4gICAgICBkZWVwRm9yRWFjaFByb3ZpZGVyKHByb3ZpZGVyLCBmbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZuKHByb3ZpZGVyKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IFVTRV9WQUxVRSA9XG4gICAgZ2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eTxWYWx1ZVByb3ZpZGVyPih7cHJvdmlkZTogU3RyaW5nLCB1c2VWYWx1ZTogZ2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eX0pO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNWYWx1ZVByb3ZpZGVyKHZhbHVlOiBTaW5nbGVQcm92aWRlcik6IHZhbHVlIGlzIFZhbHVlUHJvdmlkZXIge1xuICByZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnICYmIFVTRV9WQUxVRSBpbiB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRXhpc3RpbmdQcm92aWRlcih2YWx1ZTogU2luZ2xlUHJvdmlkZXIpOiB2YWx1ZSBpcyBFeGlzdGluZ1Byb3ZpZGVyIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmICh2YWx1ZSBhcyBFeGlzdGluZ1Byb3ZpZGVyKS51c2VFeGlzdGluZyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0ZhY3RvcnlQcm92aWRlcih2YWx1ZTogU2luZ2xlUHJvdmlkZXIpOiB2YWx1ZSBpcyBGYWN0b3J5UHJvdmlkZXIge1xuICByZXR1cm4gISEodmFsdWUgJiYgKHZhbHVlIGFzIEZhY3RvcnlQcm92aWRlcikudXNlRmFjdG9yeSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1R5cGVQcm92aWRlcih2YWx1ZTogU2luZ2xlUHJvdmlkZXIpOiB2YWx1ZSBpcyBUeXBlUHJvdmlkZXIge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDbGFzc1Byb3ZpZGVyKHZhbHVlOiBTaW5nbGVQcm92aWRlcik6IHZhbHVlIGlzIENsYXNzUHJvdmlkZXIge1xuICByZXR1cm4gISEodmFsdWUgYXMgU3RhdGljQ2xhc3NQcm92aWRlciB8IENsYXNzUHJvdmlkZXIpLnVzZUNsYXNzO1xufVxuIl19