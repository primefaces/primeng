/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { resolveForwardRef } from '../../di';
import { RuntimeError } from '../../errors';
import { flatten } from '../../util/array_utils';
import { getComponentDef, getNgModuleDef, isStandalone } from '../definition';
import { isComponent, isDirective, isNgModule, isPipe, verifyStandaloneImport } from '../jit/util';
import { maybeUnwrapFn } from '../util/misc_utils';
/**
 * Indicates whether to use the runtime dependency tracker for scope calculation in JIT compilation.
 * The value "false" means the old code path based on patching scope info into the types will be
 * used.
 *
 * @deprecated For migration purposes only, to be removed soon.
 */
export const USE_RUNTIME_DEPS_TRACKER_FOR_JIT = true;
/**
 * An implementation of DepsTrackerApi which will be used for JIT and local compilation.
 */
class DepsTracker {
    constructor() {
        this.ownerNgModule = new Map();
        this.ngModulesWithSomeUnresolvedDecls = new Set();
        this.ngModulesScopeCache = new Map();
        this.standaloneComponentsScopeCache = new Map();
    }
    /**
     * Attempts to resolve ng module's forward ref declarations as much as possible and add them to
     * the `ownerNgModule` map. This method normally should be called after the initial parsing when
     * all the forward refs are resolved (e.g., when trying to render a component)
     */
    resolveNgModulesDecls() {
        if (this.ngModulesWithSomeUnresolvedDecls.size === 0) {
            return;
        }
        for (const moduleType of this.ngModulesWithSomeUnresolvedDecls) {
            const def = getNgModuleDef(moduleType);
            if (def?.declarations) {
                for (const decl of maybeUnwrapFn(def.declarations)) {
                    if (isComponent(decl)) {
                        this.ownerNgModule.set(decl, moduleType);
                    }
                }
            }
        }
        this.ngModulesWithSomeUnresolvedDecls.clear();
    }
    /** @override */
    getComponentDependencies(type, rawImports) {
        this.resolveNgModulesDecls();
        const def = getComponentDef(type);
        if (def === null) {
            throw new Error(`Attempting to get component dependencies for a type that is not a component: ${type}`);
        }
        if (def.standalone) {
            const scope = this.getStandaloneComponentScope(type, rawImports);
            if (scope.compilation.isPoisoned) {
                return { dependencies: [] };
            }
            return {
                dependencies: [
                    ...scope.compilation.directives,
                    ...scope.compilation.pipes,
                    ...scope.compilation.ngModules,
                ]
            };
        }
        else {
            if (!this.ownerNgModule.has(type)) {
                // This component is orphan! No need to handle the error since the component rendering
                // pipeline (e.g., view_container_ref) will check for this error based on configs.
                return { dependencies: [] };
            }
            const scope = this.getNgModuleScope(this.ownerNgModule.get(type));
            if (scope.compilation.isPoisoned) {
                return { dependencies: [] };
            }
            return {
                dependencies: [
                    ...scope.compilation.directives,
                    ...scope.compilation.pipes,
                ],
            };
        }
    }
    /**
     * @override
     * This implementation does not make use of param scopeInfo since it assumes the scope info is
     * already added to the type itself through methods like {@link ɵɵsetNgModuleScope}
     */
    registerNgModule(type, scopeInfo) {
        if (!isNgModule(type)) {
            throw new Error(`Attempting to register a Type which is not NgModule as NgModule: ${type}`);
        }
        // Lazily process the NgModules later when needed.
        this.ngModulesWithSomeUnresolvedDecls.add(type);
    }
    /** @override */
    clearScopeCacheFor(type) {
        this.ngModulesScopeCache.delete(type);
        this.standaloneComponentsScopeCache.delete(type);
    }
    /** @override */
    getNgModuleScope(type) {
        if (this.ngModulesScopeCache.has(type)) {
            return this.ngModulesScopeCache.get(type);
        }
        const scope = this.computeNgModuleScope(type);
        this.ngModulesScopeCache.set(type, scope);
        return scope;
    }
    /** Compute NgModule scope afresh. */
    computeNgModuleScope(type) {
        const def = getNgModuleDef(type, true);
        const scope = {
            exported: { directives: new Set(), pipes: new Set() },
            compilation: { directives: new Set(), pipes: new Set() },
        };
        // Analyzing imports
        for (const imported of maybeUnwrapFn(def.imports)) {
            if (isNgModule(imported)) {
                const importedScope = this.getNgModuleScope(imported);
                // When this module imports another, the imported module's exported directives and pipes
                // are added to the compilation scope of this module.
                addSet(importedScope.exported.directives, scope.compilation.directives);
                addSet(importedScope.exported.pipes, scope.compilation.pipes);
            }
            else if (isStandalone(imported)) {
                if (isDirective(imported) || isComponent(imported)) {
                    scope.compilation.directives.add(imported);
                }
                else if (isPipe(imported)) {
                    scope.compilation.pipes.add(imported);
                }
                else {
                    // The standalone thing is neither a component nor a directive nor a pipe ... (what?)
                    throw new RuntimeError(1000 /* RuntimeErrorCode.RUNTIME_DEPS_INVALID_IMPORTED_TYPE */, 'The standalone imported type is neither a component nor a directive nor a pipe');
                }
            }
            else {
                // The import is neither a module nor a module-with-providers nor a standalone thing. This
                // is going to be an error. So we short circuit.
                scope.compilation.isPoisoned = true;
                break;
            }
        }
        // Analyzing declarations
        if (!scope.compilation.isPoisoned) {
            for (const decl of maybeUnwrapFn(def.declarations)) {
                // Cannot declare another NgModule or a standalone thing
                if (isNgModule(decl) || isStandalone(decl)) {
                    scope.compilation.isPoisoned = true;
                    break;
                }
                if (isPipe(decl)) {
                    scope.compilation.pipes.add(decl);
                }
                else {
                    // decl is either a directive or a component. The component may not yet have the ɵcmp due
                    // to async compilation.
                    scope.compilation.directives.add(decl);
                }
            }
        }
        // Analyzing exports
        for (const exported of maybeUnwrapFn(def.exports)) {
            if (isNgModule(exported)) {
                // When this module exports another, the exported module's exported directives and pipes
                // are added to both the compilation and exported scopes of this module.
                const exportedScope = this.getNgModuleScope(exported);
                // Based on the current logic there is no way to have poisoned exported scope. So no need to
                // check for it.
                addSet(exportedScope.exported.directives, scope.exported.directives);
                addSet(exportedScope.exported.pipes, scope.exported.pipes);
                // Some test toolings which run in JIT mode depend on this behavior that the exported scope
                // should also be present in the compilation scope, even though AoT does not support this
                // and it is also in odds with NgModule metadata definitions. Without this some tests in
                // Google will fail.
                addSet(exportedScope.exported.directives, scope.compilation.directives);
                addSet(exportedScope.exported.pipes, scope.compilation.pipes);
            }
            else if (isPipe(exported)) {
                scope.exported.pipes.add(exported);
            }
            else {
                scope.exported.directives.add(exported);
            }
        }
        return scope;
    }
    /** @override */
    getStandaloneComponentScope(type, rawImports) {
        if (this.standaloneComponentsScopeCache.has(type)) {
            return this.standaloneComponentsScopeCache.get(type);
        }
        const ans = this.computeStandaloneComponentScope(type, rawImports);
        this.standaloneComponentsScopeCache.set(type, ans);
        return ans;
    }
    computeStandaloneComponentScope(type, rawImports) {
        const ans = {
            compilation: {
                // Standalone components are always able to self-reference.
                directives: new Set([type]),
                pipes: new Set(),
                ngModules: new Set(),
            },
        };
        for (const rawImport of flatten(rawImports ?? [])) {
            const imported = resolveForwardRef(rawImport);
            try {
                verifyStandaloneImport(imported, type);
            }
            catch (e) {
                // Short-circuit if an import is not valid
                ans.compilation.isPoisoned = true;
                return ans;
            }
            if (isNgModule(imported)) {
                ans.compilation.ngModules.add(imported);
                const importedScope = this.getNgModuleScope(imported);
                // Short-circuit if an imported NgModule has corrupted exported scope.
                if (importedScope.exported.isPoisoned) {
                    ans.compilation.isPoisoned = true;
                    return ans;
                }
                addSet(importedScope.exported.directives, ans.compilation.directives);
                addSet(importedScope.exported.pipes, ans.compilation.pipes);
            }
            else if (isPipe(imported)) {
                ans.compilation.pipes.add(imported);
            }
            else if (isDirective(imported) || isComponent(imported)) {
                ans.compilation.directives.add(imported);
            }
            else {
                // The imported thing is not module/pipe/directive/component, so we error and short-circuit
                // here
                ans.compilation.isPoisoned = true;
                return ans;
            }
        }
        return ans;
    }
    /** @override */
    isOrphanComponent(cmp) {
        const def = getComponentDef(cmp);
        if (!def || def.standalone) {
            return false;
        }
        this.resolveNgModulesDecls();
        return !this.ownerNgModule.has(cmp);
    }
}
function addSet(sourceSet, targetSet) {
    for (const m of sourceSet) {
        targetSet.add(m);
    }
}
/** The deps tracker to be used in the current Angular app in dev mode. */
export const depsTracker = new DepsTracker();
export const TEST_ONLY = { DepsTracker };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwc190cmFja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9kZXBzX3RyYWNrZXIvZGVwc190cmFja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUMzQyxPQUFPLEVBQUMsWUFBWSxFQUFtQixNQUFNLGNBQWMsQ0FBQztBQUc1RCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDL0MsT0FBTyxFQUFDLGVBQWUsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTVFLE9BQU8sRUFBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsc0JBQXNCLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDakcsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBSWpEOzs7Ozs7R0FNRztBQUNILE1BQU0sQ0FBQyxNQUFNLGdDQUFnQyxHQUFHLElBQUksQ0FBQztBQUVyRDs7R0FFRztBQUNILE1BQU0sV0FBVztJQUFqQjtRQUNVLGtCQUFhLEdBQUcsSUFBSSxHQUFHLEVBQXlDLENBQUM7UUFDakUscUNBQWdDLEdBQUcsSUFBSSxHQUFHLEVBQXFCLENBQUM7UUFDaEUsd0JBQW1CLEdBQUcsSUFBSSxHQUFHLEVBQW9DLENBQUM7UUFDbEUsbUNBQThCLEdBQUcsSUFBSSxHQUFHLEVBQWdELENBQUM7SUF1UW5HLENBQUM7SUFyUUM7Ozs7T0FJRztJQUNLLHFCQUFxQjtRQUMzQixJQUFJLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDckQsT0FBTztRQUNULENBQUM7UUFFRCxLQUFLLE1BQU0sVUFBVSxJQUFJLElBQUksQ0FBQyxnQ0FB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TSxDQUFDO2dCQUNOLDJGQUEyRjtnQkFDM0YsT0FBTztnQkFDUCxHQUFHLENBQUMsV0FBVyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQ2xDLE9BQU8sR0FBRyxDQUFDO1lBQ2IsQ0FBQztRQUNILENBQUM7UUFFRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRCxnQkFBZ0I7SUFDaEIsaUJBQWlCLENBQUMsR0FBYztRQUM5QixNQUFNLEdBQUcsR0FBRyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFakMsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDM0IsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO1FBRUQsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFFN0IsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQXlCLENBQUMsQ0FBQztJQUM1RCxDQUFDO0NBQ0Y7QUFFRCxTQUFTLE1BQU0sQ0FBSSxTQUFpQixFQUFFLFNBQWlCO0lBQ3JELEtBQUssTUFBTSxDQUFDLElBQUksU0FBUyxFQUFFLENBQUM7UUFDMUIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0FBQ0gsQ0FBQztBQUVELDBFQUEwRTtBQUMxRSxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUU3QyxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsRUFBQyxXQUFXLEVBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge3Jlc29sdmVGb3J3YXJkUmVmfSBmcm9tICcuLi8uLi9kaSc7XG5pbXBvcnQge1J1bnRpbWVFcnJvciwgUnVudGltZUVycm9yQ29kZX0gZnJvbSAnLi4vLi4vZXJyb3JzJztcbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3R5cGUnO1xuaW1wb3J0IHtOZ01vZHVsZVR5cGV9IGZyb20gJy4uLy4uL21ldGFkYXRhL25nX21vZHVsZV9kZWYnO1xuaW1wb3J0IHtmbGF0dGVufSBmcm9tICcuLi8uLi91dGlsL2FycmF5X3V0aWxzJztcbmltcG9ydCB7Z2V0Q29tcG9uZW50RGVmLCBnZXROZ01vZHVsZURlZiwgaXNTdGFuZGFsb25lfSBmcm9tICcuLi9kZWZpbml0aW9uJztcbmltcG9ydCB7Q29tcG9uZW50VHlwZSwgTmdNb2R1bGVTY29wZUluZm9Gcm9tRGVjb3JhdG9yLCBSYXdTY29wZUluZm9Gcm9tRGVjb3JhdG9yfSBmcm9tICcuLi9pbnRlcmZhY2VzL2RlZmluaXRpb24nO1xuaW1wb3J0IHtpc0NvbXBvbmVudCwgaXNEaXJlY3RpdmUsIGlzTmdNb2R1bGUsIGlzUGlwZSwgdmVyaWZ5U3RhbmRhbG9uZUltcG9ydH0gZnJvbSAnLi4vaml0L3V0aWwnO1xuaW1wb3J0IHttYXliZVVud3JhcEZufSBmcm9tICcuLi91dGlsL21pc2NfdXRpbHMnO1xuXG5pbXBvcnQge0NvbXBvbmVudERlcGVuZGVuY2llcywgRGVwc1RyYWNrZXJBcGksIE5nTW9kdWxlU2NvcGUsIFN0YW5kYWxvbmVDb21wb25lbnRTY29wZX0gZnJvbSAnLi9hcGknO1xuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRvIHVzZSB0aGUgcnVudGltZSBkZXBlbmRlbmN5IHRyYWNrZXIgZm9yIHNjb3BlIGNhbGN1bGF0aW9uIGluIEpJVCBjb21waWxhdGlvbi5cbiAqIFRoZSB2YWx1ZSBcImZhbHNlXCIgbWVhbnMgdGhlIG9sZCBjb2RlIHBhdGggYmFzZWQgb24gcGF0Y2hpbmcgc2NvcGUgaW5mbyBpbnRvIHRoZSB0eXBlcyB3aWxsIGJlXG4gKiB1c2VkLlxuICpcbiAqIEBkZXByZWNhdGVkIEZvciBtaWdyYXRpb24gcHVycG9zZXMgb25seSwgdG8gYmUgcmVtb3ZlZCBzb29uLlxuICovXG5leHBvcnQgY29uc3QgVVNFX1JVTlRJTUVfREVQU19UUkFDS0VSX0ZPUl9KSVQgPSB0cnVlO1xuXG4vKipcbiAqIEFuIGltcGxlbWVudGF0aW9uIG9mIERlcHNUcmFja2VyQXBpIHdoaWNoIHdpbGwgYmUgdXNlZCBmb3IgSklUIGFuZCBsb2NhbCBjb21waWxhdGlvbi5cbiAqL1xuY2xhc3MgRGVwc1RyYWNrZXIgaW1wbGVtZW50cyBEZXBzVHJhY2tlckFwaSB7XG4gIHByaXZhdGUgb3duZXJOZ01vZHVsZSA9IG5ldyBNYXA8Q29tcG9uZW50VHlwZTxhbnk+LCBOZ01vZHVsZVR5cGU8YW55Pj4oKTtcbiAgcHJpdmF0ZSBuZ01vZHVsZXNXaXRoU29tZVVucmVzb2x2ZWREZWNscyA9IG5ldyBTZXQ8TmdNb2R1bGVUeXBlPGFueT4+KCk7XG4gIHByaXZhdGUgbmdNb2R1bGVzU2NvcGVDYWNoZSA9IG5ldyBNYXA8TmdNb2R1bGVUeXBlPGFueT4sIE5nTW9kdWxlU2NvcGU+KCk7XG4gIHByaXZhdGUgc3RhbmRhbG9uZUNvbXBvbmVudHNTY29wZUNhY2hlID0gbmV3IE1hcDxDb21wb25lbnRUeXBlPGFueT4sIFN0YW5kYWxvbmVDb21wb25lbnRTY29wZT4oKTtcblxuICAvKipcbiAgICogQXR0ZW1wdHMgdG8gcmVzb2x2ZSBuZyBtb2R1bGUncyBmb3J3YXJkIHJlZiBkZWNsYXJhdGlvbnMgYXMgbXVjaCBhcyBwb3NzaWJsZSBhbmQgYWRkIHRoZW0gdG9cbiAgICogdGhlIGBvd25lck5nTW9kdWxlYCBtYXAuIFRoaXMgbWV0aG9kIG5vcm1hbGx5IHNob3VsZCBiZSBjYWxsZWQgYWZ0ZXIgdGhlIGluaXRpYWwgcGFyc2luZyB3aGVuXG4gICAqIGFsbCB0aGUgZm9yd2FyZCByZWZzIGFyZSByZXNvbHZlZCAoZS5nLiwgd2hlbiB0cnlpbmcgdG8gcmVuZGVyIGEgY29tcG9uZW50KVxuICAgKi9cbiAgcHJpdmF0ZSByZXNvbHZlTmdNb2R1bGVzRGVjbHMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubmdNb2R1bGVzV2l0aFNvbWVVbnJlc29sdmVkRGVjbHMuc2l6ZSA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgbW9kdWxlVHlwZSBvZiB0aGlzLm5nTW9kdWxlc1dpdGhTb21lVW5yZXNvbHZlZERlY2xzKSB7XG4gICAgICBjb25zdCBkZWYgPSBnZXROZ01vZHVsZURlZihtb2R1bGVUeXBlKTtcbiAgICAgIGlmIChkZWY/LmRlY2xhcmF0aW9ucykge1xuICAgICAgICBmb3IgKGNvbnN0IGRlY2wgb2YgbWF5YmVVbndyYXBGbihkZWYuZGVjbGFyYXRpb25zKSkge1xuICAgICAgICAgIGlmIChpc0NvbXBvbmVudChkZWNsKSkge1xuICAgICAgICAgICAgdGhpcy5vd25lck5nTW9kdWxlLnNldChkZWNsLCBtb2R1bGVUeXBlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLm5nTW9kdWxlc1dpdGhTb21lVW5yZXNvbHZlZERlY2xzLmNsZWFyKCk7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICovXG4gIGdldENvbXBvbmVudERlcGVuZGVuY2llcyh0eXBlOiBDb21wb25lbnRUeXBlPGFueT4sIHJhd0ltcG9ydHM/OiBSYXdTY29wZUluZm9Gcm9tRGVjb3JhdG9yW10pOlxuICAgICAgQ29tcG9uZW50RGVwZW5kZW5jaWVzIHtcbiAgICB0aGlzLnJlc29sdmVOZ01vZHVsZXNEZWNscygpO1xuXG4gICAgY29uc3QgZGVmID0gZ2V0Q29tcG9uZW50RGVmKHR5cGUpO1xuICAgIGlmIChkZWYgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgQXR0ZW1wdGluZyB0byBnZXQgY29tcG9uZW50IGRlcGVuZGVuY2llcyBmb3IgYSB0eXBlIHRoYXQgaXMgbm90IGEgY29tcG9uZW50OiAke3R5cGV9YCk7XG4gICAgfVxuXG4gICAgaWYgKGRlZi5zdGFuZGFsb25lKSB7XG4gICAgICBjb25zdCBzY29wZSA9IHRoaXMuZ2V0U3RhbmRhbG9uZUNvbXBvbmVudFNjb3BlKHR5cGUsIHJhd0ltcG9ydHMpO1xuXG4gICAgICBpZiAoc2NvcGUuY29tcGlsYXRpb24uaXNQb2lzb25lZCkge1xuICAgICAgICByZXR1cm4ge2RlcGVuZGVuY2llczogW119O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBkZXBlbmRlbmNpZXM6IFtcbiAgICAgICAgICAuLi5zY29wZS5jb21waWxhdGlvbi5kaXJlY3RpdmVzLFxuICAgICAgICAgIC4uLnNjb3BlLmNvbXBpbGF0aW9uLnBpcGVzLFxuICAgICAgICAgIC4uLnNjb3BlLmNvbXBpbGF0aW9uLm5nTW9kdWxlcyxcbiAgICAgICAgXVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCF0aGlzLm93bmVyTmdNb2R1bGUuaGFzKHR5cGUpKSB7XG4gICAgICAgIC8vIFRoaXMgY29tcG9uZW50IGlzIG9ycGhhbiEgTm8gbmVlZCB0byBoYW5kbGUgdGhlIGVycm9yIHNpbmNlIHRoZSBjb21wb25lbnQgcmVuZGVyaW5nXG4gICAgICAgIC8vIHBpcGVsaW5lIChlLmcuLCB2aWV3X2NvbnRhaW5lcl9yZWYpIHdpbGwgY2hlY2sgZm9yIHRoaXMgZXJyb3IgYmFzZWQgb24gY29uZmlncy5cbiAgICAgICAgcmV0dXJuIHtkZXBlbmRlbmNpZXM6IFtdfTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc2NvcGUgPSB0aGlzLmdldE5nTW9kdWxlU2NvcGUodGhpcy5vd25lck5nTW9kdWxlLmdldCh0eXBlKSEpO1xuXG4gICAgICBpZiAoc2NvcGUuY29tcGlsYXRpb24uaXNQb2lzb25lZCkge1xuICAgICAgICByZXR1cm4ge2RlcGVuZGVuY2llczogW119O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBkZXBlbmRlbmNpZXM6IFtcbiAgICAgICAgICAuLi5zY29wZS5jb21waWxhdGlvbi5kaXJlY3RpdmVzLFxuICAgICAgICAgIC4uLnNjb3BlLmNvbXBpbGF0aW9uLnBpcGVzLFxuICAgICAgICBdLFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqIFRoaXMgaW1wbGVtZW50YXRpb24gZG9lcyBub3QgbWFrZSB1c2Ugb2YgcGFyYW0gc2NvcGVJbmZvIHNpbmNlIGl0IGFzc3VtZXMgdGhlIHNjb3BlIGluZm8gaXNcbiAgICogYWxyZWFkeSBhZGRlZCB0byB0aGUgdHlwZSBpdHNlbGYgdGhyb3VnaCBtZXRob2RzIGxpa2Uge0BsaW5rIMm1ybVzZXROZ01vZHVsZVNjb3BlfVxuICAgKi9cbiAgcmVnaXN0ZXJOZ01vZHVsZSh0eXBlOiBUeXBlPGFueT4sIHNjb3BlSW5mbzogTmdNb2R1bGVTY29wZUluZm9Gcm9tRGVjb3JhdG9yKTogdm9pZCB7XG4gICAgaWYgKCFpc05nTW9kdWxlKHR5cGUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEF0dGVtcHRpbmcgdG8gcmVnaXN0ZXIgYSBUeXBlIHdoaWNoIGlzIG5vdCBOZ01vZHVsZSBhcyBOZ01vZHVsZTogJHt0eXBlfWApO1xuICAgIH1cblxuICAgIC8vIExhemlseSBwcm9jZXNzIHRoZSBOZ01vZHVsZXMgbGF0ZXIgd2hlbiBuZWVkZWQuXG4gICAgdGhpcy5uZ01vZHVsZXNXaXRoU29tZVVucmVzb2x2ZWREZWNscy5hZGQodHlwZSk7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICovXG4gIGNsZWFyU2NvcGVDYWNoZUZvcih0eXBlOiBUeXBlPGFueT4pOiB2b2lkIHtcbiAgICB0aGlzLm5nTW9kdWxlc1Njb3BlQ2FjaGUuZGVsZXRlKHR5cGUgYXMgTmdNb2R1bGVUeXBlKTtcbiAgICB0aGlzLnN0YW5kYWxvbmVDb21wb25lbnRzU2NvcGVDYWNoZS5kZWxldGUodHlwZSBhcyBDb21wb25lbnRUeXBlPGFueT4pO1xuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqL1xuICBnZXROZ01vZHVsZVNjb3BlKHR5cGU6IE5nTW9kdWxlVHlwZTxhbnk+KTogTmdNb2R1bGVTY29wZSB7XG4gICAgaWYgKHRoaXMubmdNb2R1bGVzU2NvcGVDYWNoZS5oYXModHlwZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLm5nTW9kdWxlc1Njb3BlQ2FjaGUuZ2V0KHR5cGUpITtcbiAgICB9XG5cbiAgICBjb25zdCBzY29wZSA9IHRoaXMuY29tcHV0ZU5nTW9kdWxlU2NvcGUodHlwZSk7XG4gICAgdGhpcy5uZ01vZHVsZXNTY29wZUNhY2hlLnNldCh0eXBlLCBzY29wZSk7XG5cbiAgICByZXR1cm4gc2NvcGU7XG4gIH1cblxuICAvKiogQ29tcHV0ZSBOZ01vZHVsZSBzY29wZSBhZnJlc2guICovXG4gIHByaXZhdGUgY29tcHV0ZU5nTW9kdWxlU2NvcGUodHlwZTogTmdNb2R1bGVUeXBlPGFueT4pOiBOZ01vZHVsZVNjb3BlIHtcbiAgICBjb25zdCBkZWYgPSBnZXROZ01vZHVsZURlZih0eXBlLCB0cnVlKTtcbiAgICBjb25zdCBzY29wZTogTmdNb2R1bGVTY29wZSA9IHtcbiAgICAgIGV4cG9ydGVkOiB7ZGlyZWN0aXZlczogbmV3IFNldCgpLCBwaXBlczogbmV3IFNldCgpfSxcbiAgICAgIGNvbXBpbGF0aW9uOiB7ZGlyZWN0aXZlczogbmV3IFNldCgpLCBwaXBlczogbmV3IFNldCgpfSxcbiAgICB9O1xuXG4gICAgLy8gQW5hbHl6aW5nIGltcG9ydHNcbiAgICBmb3IgKGNvbnN0IGltcG9ydGVkIG9mIG1heWJlVW53cmFwRm4oZGVmLmltcG9ydHMpKSB7XG4gICAgICBpZiAoaXNOZ01vZHVsZShpbXBvcnRlZCkpIHtcbiAgICAgICAgY29uc3QgaW1wb3J0ZWRTY29wZSA9IHRoaXMuZ2V0TmdNb2R1bGVTY29wZShpbXBvcnRlZCk7XG5cbiAgICAgICAgLy8gV2hlbiB0aGlzIG1vZHVsZSBpbXBvcnRzIGFub3RoZXIsIHRoZSBpbXBvcnRlZCBtb2R1bGUncyBleHBvcnRlZCBkaXJlY3RpdmVzIGFuZCBwaXBlc1xuICAgICAgICAvLyBhcmUgYWRkZWQgdG8gdGhlIGNvbXBpbGF0aW9uIHNjb3BlIG9mIHRoaXMgbW9kdWxlLlxuICAgICAgICBhZGRTZXQoaW1wb3J0ZWRTY29wZS5leHBvcnRlZC5kaXJlY3RpdmVzLCBzY29wZS5jb21waWxhdGlvbi5kaXJlY3RpdmVzKTtcbiAgICAgICAgYWRkU2V0KGltcG9ydGVkU2NvcGUuZXhwb3J0ZWQucGlwZXMsIHNjb3BlLmNvbXBpbGF0aW9uLnBpcGVzKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNTdGFuZGFsb25lKGltcG9ydGVkKSkge1xuICAgICAgICBpZiAoaXNEaXJlY3RpdmUoaW1wb3J0ZWQpIHx8IGlzQ29tcG9uZW50KGltcG9ydGVkKSkge1xuICAgICAgICAgIHNjb3BlLmNvbXBpbGF0aW9uLmRpcmVjdGl2ZXMuYWRkKGltcG9ydGVkKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1BpcGUoaW1wb3J0ZWQpKSB7XG4gICAgICAgICAgc2NvcGUuY29tcGlsYXRpb24ucGlwZXMuYWRkKGltcG9ydGVkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBUaGUgc3RhbmRhbG9uZSB0aGluZyBpcyBuZWl0aGVyIGEgY29tcG9uZW50IG5vciBhIGRpcmVjdGl2ZSBub3IgYSBwaXBlIC4uLiAod2hhdD8pXG4gICAgICAgICAgdGhyb3cgbmV3IFJ1bnRpbWVFcnJvcihcbiAgICAgICAgICAgICAgUnVudGltZUVycm9yQ29kZS5SVU5USU1FX0RFUFNfSU5WQUxJRF9JTVBPUlRFRF9UWVBFLFxuICAgICAgICAgICAgICAnVGhlIHN0YW5kYWxvbmUgaW1wb3J0ZWQgdHlwZSBpcyBuZWl0aGVyIGEgY29tcG9uZW50IG5vciBhIGRpcmVjdGl2ZSBub3IgYSBwaXBlJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRoZSBpbXBvcnQgaXMgbmVpdGhlciBhIG1vZHVsZSBub3IgYSBtb2R1bGUtd2l0aC1wcm92aWRlcnMgbm9yIGEgc3RhbmRhbG9uZSB0aGluZy4gVGhpc1xuICAgICAgICAvLyBpcyBnb2luZyB0byBiZSBhbiBlcnJvci4gU28gd2Ugc2hvcnQgY2lyY3VpdC5cbiAgICAgICAgc2NvcGUuY29tcGlsYXRpb24uaXNQb2lzb25lZCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFuYWx5emluZyBkZWNsYXJhdGlvbnNcbiAgICBpZiAoIXNjb3BlLmNvbXBpbGF0aW9uLmlzUG9pc29uZWQpIHtcbiAgICAgIGZvciAoY29uc3QgZGVjbCBvZiBtYXliZVVud3JhcEZuKGRlZi5kZWNsYXJhdGlvbnMpKSB7XG4gICAgICAgIC8vIENhbm5vdCBkZWNsYXJlIGFub3RoZXIgTmdNb2R1bGUgb3IgYSBzdGFuZGFsb25lIHRoaW5nXG4gICAgICAgIGlmIChpc05nTW9kdWxlKGRlY2wpIHx8IGlzU3RhbmRhbG9uZShkZWNsKSkge1xuICAgICAgICAgIHNjb3BlLmNvbXBpbGF0aW9uLmlzUG9pc29uZWQgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzUGlwZShkZWNsKSkge1xuICAgICAgICAgIHNjb3BlLmNvbXBpbGF0aW9uLnBpcGVzLmFkZChkZWNsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBkZWNsIGlzIGVpdGhlciBhIGRpcmVjdGl2ZSBvciBhIGNvbXBvbmVudC4gVGhlIGNvbXBvbmVudCBtYXkgbm90IHlldCBoYXZlIHRoZSDJtWNtcCBkdWVcbiAgICAgICAgICAvLyB0byBhc3luYyBjb21waWxhdGlvbi5cbiAgICAgICAgICBzY29wZS5jb21waWxhdGlvbi5kaXJlY3RpdmVzLmFkZChkZWNsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFuYWx5emluZyBleHBvcnRzXG4gICAgZm9yIChjb25zdCBleHBvcnRlZCBvZiBtYXliZVVud3JhcEZuKGRlZi5leHBvcnRzKSkge1xuICAgICAgaWYgKGlzTmdNb2R1bGUoZXhwb3J0ZWQpKSB7XG4gICAgICAgIC8vIFdoZW4gdGhpcyBtb2R1bGUgZXhwb3J0cyBhbm90aGVyLCB0aGUgZXhwb3J0ZWQgbW9kdWxlJ3MgZXhwb3J0ZWQgZGlyZWN0aXZlcyBhbmQgcGlwZXNcbiAgICAgICAgLy8gYXJlIGFkZGVkIHRvIGJvdGggdGhlIGNvbXBpbGF0aW9uIGFuZCBleHBvcnRlZCBzY29wZXMgb2YgdGhpcyBtb2R1bGUuXG4gICAgICAgIGNvbnN0IGV4cG9ydGVkU2NvcGUgPSB0aGlzLmdldE5nTW9kdWxlU2NvcGUoZXhwb3J0ZWQpO1xuXG4gICAgICAgIC8vIEJhc2VkIG9uIHRoZSBjdXJyZW50IGxvZ2ljIHRoZXJlIGlzIG5vIHdheSB0byBoYXZlIHBvaXNvbmVkIGV4cG9ydGVkIHNjb3BlLiBTbyBubyBuZWVkIHRvXG4gICAgICAgIC8vIGNoZWNrIGZvciBpdC5cbiAgICAgICAgYWRkU2V0KGV4cG9ydGVkU2NvcGUuZXhwb3J0ZWQuZGlyZWN0aXZlcywgc2NvcGUuZXhwb3J0ZWQuZGlyZWN0aXZlcyk7XG4gICAgICAgIGFkZFNldChleHBvcnRlZFNjb3BlLmV4cG9ydGVkLnBpcGVzLCBzY29wZS5leHBvcnRlZC5waXBlcyk7XG5cbiAgICAgICAgLy8gU29tZSB0ZXN0IHRvb2xpbmdzIHdoaWNoIHJ1biBpbiBKSVQgbW9kZSBkZXBlbmQgb24gdGhpcyBiZWhhdmlvciB0aGF0IHRoZSBleHBvcnRlZCBzY29wZVxuICAgICAgICAvLyBzaG91bGQgYWxzbyBiZSBwcmVzZW50IGluIHRoZSBjb21waWxhdGlvbiBzY29wZSwgZXZlbiB0aG91Z2ggQW9UIGRvZXMgbm90IHN1cHBvcnQgdGhpc1xuICAgICAgICAvLyBhbmQgaXQgaXMgYWxzbyBpbiBvZGRzIHdpdGggTmdNb2R1bGUgbWV0YWRhdGEgZGVmaW5pdGlvbnMuIFdpdGhvdXQgdGhpcyBzb21lIHRlc3RzIGluXG4gICAgICAgIC8vIEdvb2dsZSB3aWxsIGZhaWwuXG4gICAgICAgIGFkZFNldChleHBvcnRlZFNjb3BlLmV4cG9ydGVkLmRpcmVjdGl2ZXMsIHNjb3BlLmNvbXBpbGF0aW9uLmRpcmVjdGl2ZXMpO1xuICAgICAgICBhZGRTZXQoZXhwb3J0ZWRTY29wZS5leHBvcnRlZC5waXBlcywgc2NvcGUuY29tcGlsYXRpb24ucGlwZXMpO1xuICAgICAgfSBlbHNlIGlmIChpc1BpcGUoZXhwb3J0ZWQpKSB7XG4gICAgICAgIHNjb3BlLmV4cG9ydGVkLnBpcGVzLmFkZChleHBvcnRlZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY29wZS5leHBvcnRlZC5kaXJlY3RpdmVzLmFkZChleHBvcnRlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNjb3BlO1xuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqL1xuICBnZXRTdGFuZGFsb25lQ29tcG9uZW50U2NvcGUodHlwZTogQ29tcG9uZW50VHlwZTxhbnk+LCByYXdJbXBvcnRzPzogUmF3U2NvcGVJbmZvRnJvbURlY29yYXRvcltdKTpcbiAgICAgIFN0YW5kYWxvbmVDb21wb25lbnRTY29wZSB7XG4gICAgaWYgKHRoaXMuc3RhbmRhbG9uZUNvbXBvbmVudHNTY29wZUNhY2hlLmhhcyh0eXBlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RhbmRhbG9uZUNvbXBvbmVudHNTY29wZUNhY2hlLmdldCh0eXBlKSE7XG4gICAgfVxuXG4gICAgY29uc3QgYW5zID0gdGhpcy5jb21wdXRlU3RhbmRhbG9uZUNvbXBvbmVudFNjb3BlKHR5cGUsIHJhd0ltcG9ydHMpO1xuICAgIHRoaXMuc3RhbmRhbG9uZUNvbXBvbmVudHNTY29wZUNhY2hlLnNldCh0eXBlLCBhbnMpO1xuXG4gICAgcmV0dXJuIGFucztcbiAgfVxuXG4gIHByaXZhdGUgY29tcHV0ZVN0YW5kYWxvbmVDb21wb25lbnRTY29wZShcbiAgICAgIHR5cGU6IENvbXBvbmVudFR5cGU8YW55PixcbiAgICAgIHJhd0ltcG9ydHM/OiBSYXdTY29wZUluZm9Gcm9tRGVjb3JhdG9yW10pOiBTdGFuZGFsb25lQ29tcG9uZW50U2NvcGUge1xuICAgIGNvbnN0IGFuczogU3RhbmRhbG9uZUNvbXBvbmVudFNjb3BlID0ge1xuICAgICAgY29tcGlsYXRpb246IHtcbiAgICAgICAgLy8gU3RhbmRhbG9uZSBjb21wb25lbnRzIGFyZSBhbHdheXMgYWJsZSB0byBzZWxmLXJlZmVyZW5jZS5cbiAgICAgICAgZGlyZWN0aXZlczogbmV3IFNldChbdHlwZV0pLFxuICAgICAgICBwaXBlczogbmV3IFNldCgpLFxuICAgICAgICBuZ01vZHVsZXM6IG5ldyBTZXQoKSxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGZvciAoY29uc3QgcmF3SW1wb3J0IG9mIGZsYXR0ZW4ocmF3SW1wb3J0cyA/PyBbXSkpIHtcbiAgICAgIGNvbnN0IGltcG9ydGVkID0gcmVzb2x2ZUZvcndhcmRSZWYocmF3SW1wb3J0KSBhcyBUeXBlPGFueT47XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHZlcmlmeVN0YW5kYWxvbmVJbXBvcnQoaW1wb3J0ZWQsIHR5cGUpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBTaG9ydC1jaXJjdWl0IGlmIGFuIGltcG9ydCBpcyBub3QgdmFsaWRcbiAgICAgICAgYW5zLmNvbXBpbGF0aW9uLmlzUG9pc29uZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gYW5zO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNOZ01vZHVsZShpbXBvcnRlZCkpIHtcbiAgICAgICAgYW5zLmNvbXBpbGF0aW9uLm5nTW9kdWxlcy5hZGQoaW1wb3J0ZWQpO1xuICAgICAgICBjb25zdCBpbXBvcnRlZFNjb3BlID0gdGhpcy5nZXROZ01vZHVsZVNjb3BlKGltcG9ydGVkKTtcblxuICAgICAgICAvLyBTaG9ydC1jaXJjdWl0IGlmIGFuIGltcG9ydGVkIE5nTW9kdWxlIGhhcyBjb3JydXB0ZWQgZXhwb3J0ZWQgc2NvcGUuXG4gICAgICAgIGlmIChpbXBvcnRlZFNjb3BlLmV4cG9ydGVkLmlzUG9pc29uZWQpIHtcbiAgICAgICAgICBhbnMuY29tcGlsYXRpb24uaXNQb2lzb25lZCA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIGFucztcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZFNldChpbXBvcnRlZFNjb3BlLmV4cG9ydGVkLmRpcmVjdGl2ZXMsIGFucy5jb21waWxhdGlvbi5kaXJlY3RpdmVzKTtcbiAgICAgICAgYWRkU2V0KGltcG9ydGVkU2NvcGUuZXhwb3J0ZWQucGlwZXMsIGFucy5jb21waWxhdGlvbi5waXBlcyk7XG4gICAgICB9IGVsc2UgaWYgKGlzUGlwZShpbXBvcnRlZCkpIHtcbiAgICAgICAgYW5zLmNvbXBpbGF0aW9uLnBpcGVzLmFkZChpbXBvcnRlZCk7XG4gICAgICB9IGVsc2UgaWYgKGlzRGlyZWN0aXZlKGltcG9ydGVkKSB8fCBpc0NvbXBvbmVudChpbXBvcnRlZCkpIHtcbiAgICAgICAgYW5zLmNvbXBpbGF0aW9uLmRpcmVjdGl2ZXMuYWRkKGltcG9ydGVkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRoZSBpbXBvcnRlZCB0aGluZyBpcyBub3QgbW9kdWxlL3BpcGUvZGlyZWN0aXZlL2NvbXBvbmVudCwgc28gd2UgZXJyb3IgYW5kIHNob3J0LWNpcmN1aXRcbiAgICAgICAgLy8gaGVyZVxuICAgICAgICBhbnMuY29tcGlsYXRpb24uaXNQb2lzb25lZCA9IHRydWU7XG4gICAgICAgIHJldHVybiBhbnM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFucztcbiAgfVxuXG4gIC8qKiBAb3ZlcnJpZGUgKi9cbiAgaXNPcnBoYW5Db21wb25lbnQoY21wOiBUeXBlPGFueT4pOiBib29sZWFuIHtcbiAgICBjb25zdCBkZWYgPSBnZXRDb21wb25lbnREZWYoY21wKTtcblxuICAgIGlmICghZGVmIHx8IGRlZi5zdGFuZGFsb25lKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5yZXNvbHZlTmdNb2R1bGVzRGVjbHMoKTtcblxuICAgIHJldHVybiAhdGhpcy5vd25lck5nTW9kdWxlLmhhcyhjbXAgYXMgQ29tcG9uZW50VHlwZTxhbnk+KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRTZXQ8VD4oc291cmNlU2V0OiBTZXQ8VD4sIHRhcmdldFNldDogU2V0PFQ+KTogdm9pZCB7XG4gIGZvciAoY29uc3QgbSBvZiBzb3VyY2VTZXQpIHtcbiAgICB0YXJnZXRTZXQuYWRkKG0pO1xuICB9XG59XG5cbi8qKiBUaGUgZGVwcyB0cmFja2VyIHRvIGJlIHVzZWQgaW4gdGhlIGN1cnJlbnQgQW5ndWxhciBhcHAgaW4gZGV2IG1vZGUuICovXG5leHBvcnQgY29uc3QgZGVwc1RyYWNrZXIgPSBuZXcgRGVwc1RyYWNrZXIoKTtcblxuZXhwb3J0IGNvbnN0IFRFU1RfT05MWSA9IHtEZXBzVHJhY2tlcn07XG4iXX0=