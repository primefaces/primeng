/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { getCompilerFacade } from '../../compiler/compiler_facade';
import { resolveForwardRef } from '../../di/forward_ref';
import { NG_INJ_DEF } from '../../di/interface/defs';
import { reflectDependencies } from '../../di/jit/util';
import { registerNgModuleType } from '../../linker/ng_module_registration';
import { deepForEach, flatten } from '../../util/array_utils';
import { assertDefined } from '../../util/assert';
import { EMPTY_ARRAY } from '../../util/empty';
import { GENERATED_COMP_IDS, getComponentDef, getDirectiveDef, getNgModuleDef, getPipeDef, isStandalone } from '../definition';
import { depsTracker, USE_RUNTIME_DEPS_TRACKER_FOR_JIT } from '../deps_tracker/deps_tracker';
import { NG_COMP_DEF, NG_DIR_DEF, NG_FACTORY_DEF, NG_MOD_DEF, NG_PIPE_DEF } from '../fields';
import { maybeUnwrapFn } from '../util/misc_utils';
import { stringifyForError } from '../util/stringify_utils';
import { angularCoreEnv } from './environment';
import { patchModuleCompilation } from './module_patch';
import { isModuleWithProviders, isNgModule } from './util';
const moduleQueue = [];
/**
 * Enqueues moduleDef to be checked later to see if scope can be set on its
 * component declarations.
 */
function enqueueModuleForDelayedScoping(moduleType, ngModule) {
    moduleQueue.push({ moduleType, ngModule });
}
let flushingModuleQueue = false;
/**
 * Loops over queued module definitions, if a given module definition has all of its
 * declarations resolved, it dequeues that module definition and sets the scope on
 * its declarations.
 */
export function flushModuleScopingQueueAsMuchAsPossible() {
    if (!flushingModuleQueue) {
        flushingModuleQueue = true;
        try {
            for (let i = moduleQueue.length - 1; i >= 0; i--) {
                const { moduleType, ngModule } = moduleQueue[i];
                if (ngModule.declarations && ngModule.declarations.every(isResolvedDeclaration)) {
                    // dequeue
                    moduleQueue.splice(i, 1);
                    setScopeOnDeclaredComponents(moduleType, ngModule);
                }
            }
        }
        finally {
            flushingModuleQueue = false;
        }
    }
}
/**
 * Returns truthy if a declaration has resolved. If the declaration happens to be
 * an array of declarations, it will recurse to check each declaration in that array
 * (which may also be arrays).
 */
function isResolvedDeclaration(declaration) {
    if (Array.isArray(declaration)) {
        return declaration.every(isResolvedDeclaration);
    }
    return !!resolveForwardRef(declaration);
}
/**
 * Compiles a module in JIT mode.
 *
 * This function automatically gets called when a class has a `@NgModule` decorator.
 */
export function compileNgModule(moduleType, ngModule = {}) {
    patchModuleCompilation();
    compileNgModuleDefs(moduleType, ngModule);
    if (ngModule.id !== undefined) {
        registerNgModuleType(moduleType, ngModule.id);
    }
    // Because we don't know if all declarations have resolved yet at the moment the
    // NgModule decorator is executing, we're enqueueing the setting of module scope
    // on its declarations to be run at a later time when all declarations for the module,
    // including forward refs, have resolved.
    enqueueModuleForDelayedScoping(moduleType, ngModule);
}
/**
 * Compiles and adds the `ɵmod`, `ɵfac` and `ɵinj` properties to the module class.
 *
 * It's possible to compile a module via this API which will allow duplicate declarations in its
 * root.
 */
export function compileNgModuleDefs(moduleType, ngModule, allowDuplicateDeclarationsInRoot = false) {
    ngDevMode && assertDefined(moduleType, 'Required value moduleType');
    ngDevMode && assertDefined(ngModule, 'Required value ngModule');
    const declarations = flatten(ngModule.declarations || EMPTY_ARRAY);
    let ngModuleDef = null;
    Object.defineProperty(moduleType, NG_MOD_DEF, {
        configurable: true,
        get: () => {
            if (ngModuleDef === null) {
                if (ngDevMode && ngModule.imports && ngModule.imports.indexOf(moduleType) > -1) {
                    // We need to assert this immediately, because allowing it to continue will cause it to
                    // go into an infinite loop before we've reached the point where we throw all the errors.
                    throw new Error(`'${stringifyForError(moduleType)}' module can't import itself`);
                }
                const compiler = getCompilerFacade({ usage: 0 /* JitCompilerUsage.Decorator */, kind: 'NgModule', type: moduleType });
                ngModuleDef = compiler.compileNgModule(angularCoreEnv, `ng:///${moduleType.name}/ɵmod.js`, {
                    type: moduleType,
                    bootstrap: flatten(ngModule.bootstrap || EMPTY_ARRAY).map(resolveForwardRef),
                    declarations: declarations.map(resolveForwardRef),
                    imports: flatten(ngModule.imports || EMPTY_ARRAY)
                        .map(resolveForwardRef)
                        .map(expandModuleWithProviders),
                    exports: flatten(ngModule.exports || EMPTY_ARRAY)
                        .map(resolveForwardRef)
                        .map(expandModuleWithProviders),
                    schemas: ngModule.schemas ? flatten(ngModule.schemas) : null,
                    id: ngModule.id || null,
                });
                // Set `schemas` on ngModuleDef to an empty array in JIT mode to indicate that runtime
                // should verify that there are no unknown elements in a template. In AOT mode, that check
                // happens at compile time and `schemas` information is not present on Component and Module
                // defs after compilation (so the check doesn't happen the second time at runtime).
                if (!ngModuleDef.schemas) {
                    ngModuleDef.schemas = [];
                }
            }
            return ngModuleDef;
        }
    });
    let ngFactoryDef = null;
    Object.defineProperty(moduleType, NG_FACTORY_DEF, {
        get: () => {
            if (ngFactoryDef === null) {
                const compiler = getCompilerFacade({ usage: 0 /* JitCompilerUsage.Decorator */, kind: 'NgModule', type: moduleType });
                ngFactoryDef = compiler.compileFactory(angularCoreEnv, `ng:///${moduleType.name}/ɵfac.js`, {
                    name: moduleType.name,
                    type: moduleType,
                    deps: reflectDependencies(moduleType),
                    target: compiler.FactoryTarget.NgModule,
                    typeArgumentCount: 0,
                });
            }
            return ngFactoryDef;
        },
        // Make the property configurable in dev mode to allow overriding in tests
        configurable: !!ngDevMode,
    });
    let ngInjectorDef = null;
    Object.defineProperty(moduleType, NG_INJ_DEF, {
        get: () => {
            if (ngInjectorDef === null) {
                ngDevMode && verifySemanticsOfNgModuleDef(moduleType, allowDuplicateDeclarationsInRoot);
                const meta = {
                    name: moduleType.name,
                    type: moduleType,
                    providers: ngModule.providers || EMPTY_ARRAY,
                    imports: [
                        (ngModule.imports || EMPTY_ARRAY).map(resolveForwardRef),
                        (ngModule.exports || EMPTY_ARRAY).map(resolveForwardRef),
                    ],
                };
                const compiler = getCompilerFacade({ usage: 0 /* JitCompilerUsage.Decorator */, kind: 'NgModule', type: moduleType });
                ngInjectorDef =
                    compiler.compileInjector(angularCoreEnv, `ng:///${moduleType.name}/ɵinj.js`, meta);
            }
            return ngInjectorDef;
        },
        // Make the property configurable in dev mode to allow overriding in tests
        configurable: !!ngDevMode,
    });
}
export function generateStandaloneInDeclarationsError(type, location) {
    const prefix = `Unexpected "${stringifyForError(type)}" found in the "declarations" array of the`;
    const suffix = `"${stringifyForError(type)}" is marked as standalone and can't be declared ` +
        'in any NgModule - did you intend to import it instead (by adding it to the "imports" array)?';
    return `${prefix} ${location}, ${suffix}`;
}
function verifySemanticsOfNgModuleDef(moduleType, allowDuplicateDeclarationsInRoot, importingModule) {
    if (verifiedNgModule.get(moduleType))
        return;
    // skip verifications of standalone components, directives, and pipes
    if (isStandalone(moduleType))
        return;
    verifiedNgModule.set(moduleType, true);
    moduleType = resolveForwardRef(moduleType);
    let ngModuleDef;
    if (importingModule) {
        ngModuleDef = getNgModuleDef(moduleType);
        if (!ngModuleDef) {
            throw new Error(`Unexpected value '${moduleType.name}' imported by the module '${importingModule.name}'. Please add an @NgModule annotation.`);
        }
    }
    else {
        ngModuleDef = getNgModuleDef(moduleType, true);
    }
    const errors = [];
    const declarations = maybeUnwrapFn(ngModuleDef.declarations);
    const imports = maybeUnwrapFn(ngModuleDef.imports);
    flatten(imports).map(unwrapModuleWithProvidersImports).forEach(modOrStandaloneCmpt => {
        verifySemanticsOfNgModuleImport(modOrStandaloneCmpt, moduleType);
        verifySemanticsOfNgModuleDef(modOrStandaloneCmpt, false, moduleType);
    });
    const exports = maybeUnwrapFn(ngModuleDef.exports);
    declarations.forEach(verifyDeclarationsHaveDefinitions);
    declarations.forEach(verifyDirectivesHaveSelector);
    declarations.forEach((declarationType) => verifyNotStandalone(declarationType, moduleType));
    const combinedDeclarations = [
        ...declarations.map(resolveForwardRef),
        ...flatten(imports.map(computeCombinedExports)).map(resolveForwardRef),
    ];
    exports.forEach(verifyExportsAreDeclaredOrReExported);
    declarations.forEach(decl => verifyDeclarationIsUnique(decl, allowDuplicateDeclarationsInRoot));
    const ngModule = getAnnotation(moduleType, 'NgModule');
    if (ngModule) {
        ngModule.imports &&
            flatten(ngModule.imports).map(unwrapModuleWithProvidersImports).forEach(mod => {
                verifySemanticsOfNgModuleImport(mod, moduleType);
                verifySemanticsOfNgModuleDef(mod, false, moduleType);
            });
        ngModule.bootstrap && deepForEach(ngModule.bootstrap, verifyCorrectBootstrapType);
        ngModule.bootstrap && deepForEach(ngModule.bootstrap, verifyComponentIsPartOfNgModule);
    }
    // Throw Error if any errors were detected.
    if (errors.length) {
        throw new Error(errors.join('\n'));
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////
    function verifyDeclarationsHaveDefinitions(type) {
        type = resolveForwardRef(type);
        const def = getComponentDef(type) || getDirectiveDef(type) || getPipeDef(type);
        if (!def) {
            errors.push(`Unexpected value '${stringifyForError(type)}' declared by the module '${stringifyForError(moduleType)}'. Please add a @Pipe/@Directive/@Component annotation.`);
        }
    }
    function verifyDirectivesHaveSelector(type) {
        type = resolveForwardRef(type);
        const def = getDirectiveDef(type);
        if (!getComponentDef(type) && def && def.selectors.length == 0) {
            errors.push(`Directive ${stringifyForError(type)} has no selector, please add it!`);
        }
    }
    function verifyNotStandalone(type, moduleType) {
        type = resolveForwardRef(type);
        const def = getComponentDef(type) || getDirectiveDef(type) || getPipeDef(type);
        if (def?.standalone) {
            const location = `"${stringifyForError(moduleType)}" NgModule`;
            errors.push(generateStandaloneInDeclarationsError(type, location));
        }
    }
    function verifyExportsAreDeclaredOrReExported(type) {
        type = resolveForwardRef(type);
        const kind = getComponentDef(type) && 'component' || getDirectiveDef(type) && 'directive' ||
            getPipeDef(type) && 'pipe';
        if (kind) {
            // only checked if we are declared as Component, Directive, or Pipe
            // Modules don't need to be declared or imported.
            if (combinedDeclarations.lastIndexOf(type) === -1) {
                // We are exporting something which we don't explicitly declare or import.
                errors.push(`Can't export ${kind} ${stringifyForError(type)} from ${stringifyForError(moduleType)} as it was neither declared nor imported!`);
            }
        }
    }
    function verifyDeclarationIsUnique(type, suppressErrors) {
        type = resolveForwardRef(type);
        const existingModule = ownerNgModule.get(type);
        if (existingModule && existingModule !== moduleType) {
            if (!suppressErrors) {
                const modules = [existingModule, moduleType].map(stringifyForError).sort();
                errors.push(`Type ${stringifyForError(type)} is part of the declarations of 2 modules: ${modules[0]} and ${modules[1]}! ` +
                    `Please consider moving ${stringifyForError(type)} to a higher module that imports ${modules[0]} and ${modules[1]}. ` +
                    `You can also create a new NgModule that exports and includes ${stringifyForError(type)} then import that NgModule in ${modules[0]} and ${modules[1]}.`);
            }
        }
        else {
            // Mark type as having owner.
            ownerNgModule.set(type, moduleType);
        }
    }
    function verifyComponentIsPartOfNgModule(type) {
        type = resolveForwardRef(type);
        const existingModule = ownerNgModule.get(type);
        if (!existingModule && !isStandalone(type)) {
            errors.push(`Component ${stringifyForError(type)} is not part of any NgModule or the module has not been imported into your module.`);
        }
    }
    function verifyCorrectBootstrapType(type) {
        type = resolveForwardRef(type);
        if (!getComponentDef(type)) {
            errors.push(`${stringifyForError(type)} cannot be used as an entry component.`);
        }
        if (isStandalone(type)) {
            // Note: this error should be the same as the
            // `NGMODULE_BOOTSTRAP_IS_STANDALONE` one in AOT compiler.
            errors.push(`The \`${stringifyForError(type)}\` class is a standalone component, which can ` +
                `not be used in the \`@NgModule.bootstrap\` array. Use the \`bootstrapApplication\` ` +
                `function for bootstrap instead.`);
        }
    }
    function verifySemanticsOfNgModuleImport(type, importingModule) {
        type = resolveForwardRef(type);
        const directiveDef = getComponentDef(type) || getDirectiveDef(type);
        if (directiveDef !== null && !directiveDef.standalone) {
            throw new Error(`Unexpected directive '${type.name}' imported by the module '${importingModule.name}'. Please add an @NgModule annotation.`);
        }
        const pipeDef = getPipeDef(type);
        if (pipeDef !== null && !pipeDef.standalone) {
            throw new Error(`Unexpected pipe '${type.name}' imported by the module '${importingModule.name}'. Please add an @NgModule annotation.`);
        }
    }
}
function unwrapModuleWithProvidersImports(typeOrWithProviders) {
    typeOrWithProviders = resolveForwardRef(typeOrWithProviders);
    return typeOrWithProviders.ngModule || typeOrWithProviders;
}
function getAnnotation(type, name) {
    let annotation = null;
    collect(type.__annotations__);
    collect(type.decorators);
    return annotation;
    function collect(annotations) {
        if (annotations) {
            annotations.forEach(readAnnotation);
        }
    }
    function readAnnotation(decorator) {
        if (!annotation) {
            const proto = Object.getPrototypeOf(decorator);
            if (proto.ngMetadataName == name) {
                annotation = decorator;
            }
            else if (decorator.type) {
                const proto = Object.getPrototypeOf(decorator.type);
                if (proto.ngMetadataName == name) {
                    annotation = decorator.args[0];
                }
            }
        }
    }
}
/**
 * Keep track of compiled components. This is needed because in tests we often want to compile the
 * same component with more than one NgModule. This would cause an error unless we reset which
 * NgModule the component belongs to. We keep the list of compiled components here so that the
 * TestBed can reset it later.
 */
let ownerNgModule = new WeakMap();
let verifiedNgModule = new WeakMap();
export function resetCompiledComponents() {
    ownerNgModule = new WeakMap();
    verifiedNgModule = new WeakMap();
    moduleQueue.length = 0;
    GENERATED_COMP_IDS.clear();
}
/**
 * Computes the combined declarations of explicit declarations, as well as declarations inherited by
 * traversing the exports of imported modules.
 * @param type
 */
function computeCombinedExports(type) {
    type = resolveForwardRef(type);
    const ngModuleDef = getNgModuleDef(type);
    // a standalone component, directive or pipe
    if (ngModuleDef === null) {
        return [type];
    }
    return flatten(maybeUnwrapFn(ngModuleDef.exports).map((type) => {
        const ngModuleDef = getNgModuleDef(type);
        if (ngModuleDef) {
            verifySemanticsOfNgModuleDef(type, false);
            return computeCombinedExports(type);
        }
        else {
            return type;
        }
    }));
}
/**
 * Some declared components may be compiled asynchronously, and thus may not have their
 * ɵcmp set yet. If this is the case, then a reference to the module is written into
 * the `ngSelectorScope` property of the declared type.
 */
function setScopeOnDeclaredComponents(moduleType, ngModule) {
    const declarations = flatten(ngModule.declarations || EMPTY_ARRAY);
    const transitiveScopes = transitiveScopesFor(moduleType);
    declarations.forEach(declaration => {
        declaration = resolveForwardRef(declaration);
        if (declaration.hasOwnProperty(NG_COMP_DEF)) {
            // A `ɵcmp` field exists - go ahead and patch the component directly.
            const component = declaration;
            const componentDef = getComponentDef(component);
            patchComponentDefWithScope(componentDef, transitiveScopes);
        }
        else if (!declaration.hasOwnProperty(NG_DIR_DEF) && !declaration.hasOwnProperty(NG_PIPE_DEF)) {
            // Set `ngSelectorScope` for future reference when the component compilation finishes.
            declaration.ngSelectorScope = moduleType;
        }
    });
}
/**
 * Patch the definition of a component with directives and pipes from the compilation scope of
 * a given module.
 */
export function patchComponentDefWithScope(componentDef, transitiveScopes) {
    componentDef.directiveDefs = () => Array.from(transitiveScopes.compilation.directives)
        .map(dir => dir.hasOwnProperty(NG_COMP_DEF) ? getComponentDef(dir) : getDirectiveDef(dir))
        .filter(def => !!def);
    componentDef.pipeDefs = () => Array.from(transitiveScopes.compilation.pipes).map(pipe => getPipeDef(pipe));
    componentDef.schemas = transitiveScopes.schemas;
    // Since we avoid Components/Directives/Pipes recompiling in case there are no overrides, we
    // may face a problem where previously compiled defs available to a given Component/Directive
    // are cached in TView and may become stale (in case any of these defs gets recompiled). In
    // order to avoid this problem, we force fresh TView to be created.
    componentDef.tView = null;
}
/**
 * Compute the pair of transitive scopes (compilation scope and exported scope) for a given type
 * (either a NgModule or a standalone component / directive / pipe).
 */
export function transitiveScopesFor(type) {
    if (isNgModule(type)) {
        if (USE_RUNTIME_DEPS_TRACKER_FOR_JIT) {
            const scope = depsTracker.getNgModuleScope(type);
            const def = getNgModuleDef(type, true);
            return {
                schemas: def.schemas || null,
                ...scope,
            };
        }
        else {
            return transitiveScopesForNgModule(type);
        }
    }
    else if (isStandalone(type)) {
        const directiveDef = getComponentDef(type) || getDirectiveDef(type);
        if (directiveDef !== null) {
            return {
                schemas: null,
                compilation: {
                    directives: new Set(),
                    pipes: new Set(),
                },
                exported: {
                    directives: new Set([type]),
                    pipes: new Set(),
                },
            };
        }
        const pipeDef = getPipeDef(type);
        if (pipeDef !== null) {
            return {
                schemas: null,
                compilation: {
                    directives: new Set(),
                    pipes: new Set(),
                },
                exported: {
                    directives: new Set(),
                    pipes: new Set([type]),
                },
            };
        }
    }
    // TODO: change the error message to be more user-facing and take standalone into account
    throw new Error(`${type.name} does not have a module def (ɵmod property)`);
}
/**
 * Compute the pair of transitive scopes (compilation scope and exported scope) for a given module.
 *
 * This operation is memoized and the result is cached on the module's definition. This function can
 * be called on modules with components that have not fully compiled yet, but the result should not
 * be used until they have.
 *
 * @param moduleType module that transitive scope should be calculated for.
 */
export function transitiveScopesForNgModule(moduleType) {
    const def = getNgModuleDef(moduleType, true);
    if (def.transitiveCompileScopes !== null) {
        return def.transitiveCompileScopes;
    }
    const scopes = {
        schemas: def.schemas || null,
        compilation: {
            directives: new Set(),
            pipes: new Set(),
        },
        exported: {
            directives: new Set(),
            pipes: new Set(),
        },
    };
    maybeUnwrapFn(def.imports).forEach((imported) => {
        // When this module imports another, the imported module's exported directives and pipes are
        // added to the compilation scope of this module.
        const importedScope = transitiveScopesFor(imported);
        importedScope.exported.directives.forEach(entry => scopes.compilation.directives.add(entry));
        importedScope.exported.pipes.forEach(entry => scopes.compilation.pipes.add(entry));
    });
    maybeUnwrapFn(def.declarations).forEach(declared => {
        const declaredWithDefs = declared;
        if (getPipeDef(declaredWithDefs)) {
            scopes.compilation.pipes.add(declared);
        }
        else {
            // Either declared has a ɵcmp or ɵdir, or it's a component which hasn't
            // had its template compiled yet. In either case, it gets added to the compilation's
            // directives.
            scopes.compilation.directives.add(declared);
        }
    });
    maybeUnwrapFn(def.exports).forEach((exported) => {
        const exportedType = exported;
        // Either the type is a module, a pipe, or a component/directive (which may not have a
        // ɵcmp as it might be compiled asynchronously).
        if (isNgModule(exportedType)) {
            // When this module exports another, the exported module's exported directives and pipes are
            // added to both the compilation and exported scopes of this module.
            const exportedScope = transitiveScopesFor(exportedType);
            exportedScope.exported.directives.forEach(entry => {
                scopes.compilation.directives.add(entry);
                scopes.exported.directives.add(entry);
            });
            exportedScope.exported.pipes.forEach(entry => {
                scopes.compilation.pipes.add(entry);
                scopes.exported.pipes.add(entry);
            });
        }
        else if (getPipeDef(exportedType)) {
            scopes.exported.pipes.add(exportedType);
        }
        else {
            scopes.exported.directives.add(exportedType);
        }
    });
    def.transitiveCompileScopes = scopes;
    return scopes;
}
function expandModuleWithProviders(value) {
    if (isModuleWithProviders(value)) {
        return value.ngModule;
    }
    return value;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9qaXQvbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxpQkFBaUIsRUFBNkMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM3RyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFFbkQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFdEQsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFJekUsT0FBTyxFQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdILE9BQU8sRUFBQyxXQUFXLEVBQUUsZ0NBQWdDLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRixPQUFPLEVBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUUzRixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDakQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFFMUQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3QyxPQUFPLEVBQUMs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LENBQUMsWUFBWSxDQUFDLENBQUM7UUFDL0MsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsR0FBRyxDQUFDLHVCQUF1QixHQUFHLE1BQU0sQ0FBQztJQUNyQyxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQsU0FBUyx5QkFBeUIsQ0FBQyxLQUF3QztJQUN6RSxJQUFJLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDakMsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFDO0lBQ3hCLENBQUM7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtnZXRDb21waWxlckZhY2FkZSwgSml0Q29tcGlsZXJVc2FnZSwgUjNJbmplY3Rvck1ldGFkYXRhRmFjYWRlfSBmcm9tICcuLi8uLi9jb21waWxlci9jb21waWxlcl9mYWNhZGUnO1xuaW1wb3J0IHtyZXNvbHZlRm9yd2FyZFJlZn0gZnJvbSAnLi4vLi4vZGkvZm9yd2FyZF9yZWYnO1xuaW1wb3J0IHtOR19JTkpfREVGfSBmcm9tICcuLi8uLi9kaS9pbnRlcmZhY2UvZGVmcyc7XG5pbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJy4uLy4uL2RpL2ludGVyZmFjZS9wcm92aWRlcic7XG5pbXBvcnQge3JlZmxlY3REZXBlbmRlbmNpZXN9IGZyb20gJy4uLy4uL2RpL2ppdC91dGlsJztcbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3R5cGUnO1xuaW1wb3J0IHtyZWdpc3Rlck5nTW9kdWxlVHlwZX0gZnJvbSAnLi4vLi4vbGlua2VyL25nX21vZHVsZV9yZWdpc3RyYXRpb24nO1xuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4uLy4uL21ldGFkYXRhL2RpcmVjdGl2ZXMnO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnLi4vLi4vbWV0YWRhdGEvbmdfbW9kdWxlJztcbmltcG9ydCB7TmdNb2R1bGVEZWYsIE5nTW9kdWxlVHJhbnNpdGl2ZVNjb3BlcywgTmdNb2R1bGVUeXBlfSBmcm9tICcuLi8uLi9tZXRhZGF0YS9uZ19tb2R1bGVfZGVmJztcbmltcG9ydCB7ZGVlcEZvckVhY2gsIGZsYXR0ZW59IGZyb20gJy4uLy4uL3V0aWwvYXJyYXlfdXRpbHMnO1xuaW1wb3J0IHthc3NlcnREZWZpbmVkfSBmcm9tICcuLi8uLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQge0VNUFRZX0FSUkFZfSBmcm9tICcuLi8uLi91dGlsL2VtcHR5JztcbmltcG9ydCB7R0VORVJBVEVEX0NPTVBfSURTLCBnZXRDb21wb25lbnREZWYsIGdldERpcmVjdGl2ZURlZiwgZ2V0TmdNb2R1bGVEZWYsIGdldFBpcGVEZWYsIGlzU3RhbmRhbG9uZX0gZnJvbSAnLi4vZGVmaW5pdGlvbic7XG5pbXBvcnQge2RlcHNUcmFja2VyLCBVU0VfUlVOVElNRV9ERVBTX1RSQUNLRVJfRk9SX0pJVH0gZnJvbSAnLi4vZGVwc190cmFja2VyL2RlcHNfdHJhY2tlcic7XG5pbXBvcnQge05HX0NPTVBfREVGLCBOR19ESVJfREVGLCBOR19GQUNUT1JZX0RFRiwgTkdfTU9EX0RFRiwgTkdfUElQRV9ERUZ9IGZyb20gJy4uL2ZpZWxkcyc7XG5pbXBvcnQge0NvbXBvbmVudERlZn0gZnJvbSAnLi4vaW50ZXJmYWNlcy9kZWZpbml0aW9uJztcbmltcG9ydCB7bWF5YmVVbndyYXBGbn0gZnJvbSAnLi4vdXRpbC9taXNjX3V0aWxzJztcbmltcG9ydCB7c3RyaW5naWZ5Rm9yRXJyb3J9IGZyb20gJy4uL3V0aWwvc3RyaW5naWZ5X3V0aWxzJztcblxuaW1wb3J0IHthbmd1bGFyQ29yZUVudn0gZnJvbSAnLi9lbnZpcm9ubWVudCc7XG5pbXBvcnQge3BhdGNoTW9kdWxlQ29tcGlsYXRpb259IGZyb20gJy4vbW9kdWxlX3BhdGNoJztcbmltcG9ydCB7aXNNb2R1bGVXaXRoUHJvdmlkZXJzLCBpc05nTW9kdWxlfSBmcm9tICcuL3V0aWwnO1xuXG5pbnRlcmZhY2UgTW9kdWxlUXVldWVJdGVtIHtcbiAgbW9kdWxlVHlwZTogVHlwZTxhbnk+O1xuICBuZ01vZHVsZTogTmdNb2R1bGU7XG59XG5cbmNvbnN0IG1vZHVsZVF1ZXVlOiBNb2R1bGVRdWV1ZUl0ZW1bXSA9IFtdO1xuXG4vKipcbiAqIEVucXVldWVzIG1vZHVsZURlZiB0byBiZSBjaGVja2VkIGxhdGVyIHRvIHNlZSBpZiBzY29wZSBjYW4gYmUgc2V0IG9uIGl0c1xuICogY29tcG9uZW50IGRlY2xhcmF0aW9ucy5cbiAqL1xuZnVuY3Rpb24gZW5xdWV1ZU1vZHVsZUZvckRlbGF5ZWRTY29waW5nKG1vZHVsZVR5cGU6IFR5cGU8YW55PiwgbmdNb2R1bGU6IE5nTW9kdWxlKSB7XG4gIG1vZHVsZVF1ZXVlLnB1c2goe21vZHVsZVR5cGUsIG5nTW9kdWxlfSk7XG59XG5cbmxldCBmbHVzaGluZ01vZHVsZVF1ZXVlID0gZmFsc2U7XG4vKipcbiAqIExvb3BzIG92ZXIgcXVldWVkIG1vZHVsZSBkZWZpbml0aW9ucywgaWYgYSBnaXZlbiBtb2R1bGUgZGVmaW5pdGlvbiBoYXMgYWxsIG9mIGl0c1xuICogZGVjbGFyYXRpb25zIHJlc29sdmVkLCBpdCBkZXF1ZXVlcyB0aGF0IG1vZHVsZSBkZWZpbml0aW9uIGFuZCBzZXRzIHRoZSBzY29wZSBvblxuICogaXRzIGRlY2xhcmF0aW9ucy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZsdXNoTW9kdWxlU2NvcGluZ1F1ZXVlQXNNdWNoQXNQb3NzaWJsZSgpIHtcbiAgaWYgKCFmbHVzaGluZ01vZHVsZVF1ZXVlKSB7XG4gICAgZmx1c2hpbmdNb2R1bGVRdWV1ZSA9IHRydWU7XG4gICAgdHJ5IHtcbiAgICAgIGZvciAobGV0IGkgPSBtb2R1bGVRdWV1ZS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBjb25zdCB7bW9kdWxlVHlwZSwgbmdNb2R1bGV9ID0gbW9kdWxlUXVldWVbaV07XG5cbiAgICAgICAgaWYgKG5nTW9kdWxlLmRlY2xhcmF0aW9ucyAmJiBuZ01vZHVsZS5kZWNsYXJhdGlvbnMuZXZlcnkoaXNSZXNvbHZlZERlY2xhcmF0aW9uKSkge1xuICAgICAgICAgIC8vIGRlcXVldWVcbiAgICAgICAgICBtb2R1bGVRdWV1ZS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgc2V0U2NvcGVPbkRlY2xhcmVkQ29tcG9uZW50cyhtb2R1bGVUeXBlLCBuZ01vZHVsZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgZmx1c2hpbmdNb2R1bGVRdWV1ZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1dGh5IGlmIGEgZGVjbGFyYXRpb24gaGFzIHJlc29sdmVkLiBJZiB0aGUgZGVjbGFyYXRpb24gaGFwcGVucyB0byBiZVxuICogYW4gYXJyYXkgb2YgZGVjbGFyYXRpb25zLCBpdCB3aWxsIHJlY3Vyc2UgdG8gY2hlY2sgZWFjaCBkZWNsYXJhdGlvbiBpbiB0aGF0IGFycmF5XG4gKiAod2hpY2ggbWF5IGFsc28gYmUgYXJyYXlzKS5cbiAqL1xuZnVuY3Rpb24gaXNSZXNvbHZlZERlY2xhcmF0aW9uKGRlY2xhcmF0aW9uOiBhbnlbXXxUeXBlPGFueT4pOiBib29sZWFuIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoZGVjbGFyYXRpb24pKSB7XG4gICAgcmV0dXJuIGRlY2xhcmF0aW9uLmV2ZXJ5KGlzUmVzb2x2ZWREZWNsYXJhdGlvbik7XG4gIH1cbiAgcmV0dXJuICEhcmVzb2x2ZUZvcndhcmRSZWYoZGVjbGFyYXRpb24pO1xufVxuXG4vKipcbiAqIENvbXBpbGVzIGEgbW9kdWxlIGluIEpJVCBtb2RlLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gYXV0b21hdGljYWxseSBnZXRzIGNhbGxlZCB3aGVuIGEgY2xhc3MgaGFzIGEgYEBOZ01vZHVsZWAgZGVjb3JhdG9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tcGlsZU5nTW9kdWxlKG1vZHVsZVR5cGU6IFR5cGU8YW55PiwgbmdNb2R1bGU6IE5nTW9kdWxlID0ge30pOiB2b2lkIHtcbiAgcGF0Y2hNb2R1bGVDb21waWxhdGlvbigpO1xuICBjb21waWxlTmdNb2R1bGVEZWZzKG1vZHVsZVR5cGUgYXMgTmdNb2R1bGVUeXBlLCBuZ01vZHVsZSk7XG4gIGlmIChuZ01vZHVsZS5pZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmVnaXN0ZXJOZ01vZHVsZVR5cGUobW9kdWxlVHlwZSBhcyBOZ01vZHVsZVR5cGUsIG5nTW9kdWxlLmlkKTtcbiAgfVxuXG4gIC8vIEJlY2F1c2Ugd2UgZG9uJ3Qga25vdyBpZiBhbGwgZGVjbGFyYXRpb25zIGhhdmUgcmVzb2x2ZWQgeWV0IGF0IHRoZSBtb21lbnQgdGhlXG4gIC8vIE5nTW9kdWxlIGRlY29yYXRvciBpcyBleGVjdXRpbmcsIHdlJ3JlIGVucXVldWVpbmcgdGhlIHNldHRpbmcgb2YgbW9kdWxlIHNjb3BlXG4gIC8vIG9uIGl0cyBkZWNsYXJhdGlvbnMgdG8gYmUgcnVuIGF0IGEgbGF0ZXIgdGltZSB3aGVuIGFsbCBkZWNsYXJhdGlvbnMgZm9yIHRoZSBtb2R1bGUsXG4gIC8vIGluY2x1ZGluZyBmb3J3YXJkIHJlZnMsIGhhdmUgcmVzb2x2ZWQuXG4gIGVucXVldWVNb2R1bGVGb3JEZWxheWVkU2NvcGluZyhtb2R1bGVUeXBlLCBuZ01vZHVsZSk7XG59XG5cbi8qKlxuICogQ29tcGlsZXMgYW5kIGFkZHMgdGhlIGDJtW1vZGAsIGDJtWZhY2AgYW5kIGDJtWluamAgcHJvcGVydGllcyB0byB0aGUgbW9kdWxlIGNsYXNzLlxuICpcbiAqIEl0J3MgcG9zc2libGUgdG8gY29tcGlsZSBhIG1vZHVsZSB2aWEgdGhpcyBBUEkgd2hpY2ggd2lsbCBhbGxvdyBkdXBsaWNhdGUgZGVjbGFyYXRpb25zIGluIGl0c1xuICogcm9vdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBpbGVOZ01vZHVsZURlZnMoXG4gICAgbW9kdWxlVHlwZTogTmdNb2R1bGVUeXBlLCBuZ01vZHVsZTogTmdNb2R1bGUsXG4gICAgYWxsb3dEdXBsaWNhdGVEZWNsYXJhdGlvbnNJblJvb3Q6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RGVmaW5lZChtb2R1bGVUeXBlLCAnUmVxdWlyZWQgdmFsdWUgbW9kdWxlVHlwZScpO1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RGVmaW5lZChuZ01vZHVsZSwgJ1JlcXVpcmVkIHZhbHVlIG5nTW9kdWxlJyk7XG4gIGNvbnN0IGRlY2xhcmF0aW9uczogVHlwZTxhbnk+W10gPSBmbGF0dGVuKG5nTW9kdWxlLmRlY2xhcmF0aW9ucyB8fCBFTVBUWV9BUlJBWSk7XG4gIGxldCBuZ01vZHVsZURlZjogYW55ID0gbnVsbDtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZVR5cGUsIE5HX01PRF9ERUYsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiAoKSA9PiB7XG4gICAgICBpZiAobmdNb2R1bGVEZWYgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKG5nRGV2TW9kZSAmJiBuZ01vZHVsZS5pbXBvcnRzICYmIG5nTW9kdWxlLmltcG9ydHMuaW5kZXhPZihtb2R1bGVUeXBlKSA+IC0xKSB7XG4gICAgICAgICAgLy8gV2UgbmVlZCB0byBhc3NlcnQgdGhpcyBpbW1lZGlhdGVseSwgYmVjYXVzZSBhbGxvd2luZyBpdCB0byBjb250aW51ZSB3aWxsIGNhdXNlIGl0IHRvXG4gICAgICAgICAgLy8gZ28gaW50byBhbiBpbmZpbml0ZSBsb29wIGJlZm9yZSB3ZSd2ZSByZWFjaGVkIHRoZSBwb2ludCB3aGVyZSB3ZSB0aHJvdyBhbGwgdGhlIGVycm9ycy5cbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCcke3N0cmluZ2lmeUZvckVycm9yKG1vZHVsZVR5cGUpfScgbW9kdWxlIGNhbid0IGltcG9ydCBpdHNlbGZgKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb21waWxlciA9IGdldENvbXBpbGVyRmFjYWRlKFxuICAgICAgICAgICAge3VzYWdlOiBKaXRDb21waWxlclVzYWdlLkRlY29yYXRvciwga2luZDogJ05nTW9kdWxlJywgdHlwZTogbW9kdWxlVHlwZX0pO1xuICAgICAgICBuZ01vZHVsZURlZiA9IGNvbXBpbGVyLmNvbXBpbGVOZ01vZHVsZShhbmd1bGFyQ29yZUVudiwgYG5nOi8vLyR7bW9kdWxlVHlwZS5uYW1lfS/JtW1vZC5qc2AsIHtcbiAgICAgICAgICB0eXBlOiBtb2R1bGVUeXBlLFxuICAgICAgICAgIGJvb3RzdHJhcDogZmxhdHRlbihuZ01vZHVsZS5ib290c3RyYXAgfHwgRU1QVFlfQVJSQVkpLm1hcChyZXNvbHZlRm9yd2FyZFJlZiksXG4gICAgICAgICAgZGVjbGFyYXRpb25zOiBkZWNsYXJhdGlvbnMubWFwKHJlc29sdmVGb3J3YXJkUmVmKSxcbiAgICAgICAgICBpbXBvcnRzOiBmbGF0dGVuKG5nTW9kdWxlLmltcG9ydHMgfHwgRU1QVFlfQVJSQVkpXG4gICAgICAgICAgICAgICAgICAgICAgIC5tYXAocmVzb2x2ZUZvcndhcmRSZWYpXG4gICAgICAgICAgICAgICAgICAgICAgIC5tYXAoZXhwYW5kTW9kdWxlV2l0aFByb3ZpZGVycyksXG4gICAgICAgICAgZXhwb3J0czogZmxhdHRlbihuZ01vZHVsZS5leHBvcnRzIHx8IEVNUFRZX0FSUkFZKVxuICAgICAgICAgICAgICAgICAgICAgICAubWFwKHJlc29sdmVGb3J3YXJkUmVmKVxuICAgICAgICAgICAgICAgICAgICAgICAubWFwKGV4cGFuZE1vZHVsZVdpdGhQcm92aWRlcnMpLFxuICAgICAgICAgIHNjaGVtYXM6IG5nTW9kdWxlLnNjaGVtYXMgPyBmbGF0dGVuKG5nTW9kdWxlLnNjaGVtYXMpIDogbnVsbCxcbiAgICAgICAgICBpZDogbmdNb2R1bGUuaWQgfHwgbnVsbCxcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFNldCBgc2NoZW1hc2Agb24gbmdNb2R1bGVEZWYgdG8gYW4gZW1wdHkgYXJyYXkgaW4gSklUIG1vZGUgdG8gaW5kaWNhdGUgdGhhdCBydW50aW1lXG4gICAgICAgIC8vIHNob3VsZCB2ZXJpZnkgdGhhdCB0aGVyZSBhcmUgbm8gdW5rbm93biBlbGVtZW50cyBpbiBhIHRlbXBsYXRlLiBJbiBBT1QgbW9kZSwgdGhhdCBjaGVja1xuICAgICAgICAvLyBoYXBwZW5zIGF0IGNvbXBpbGUgdGltZSBhbmQgYHNjaGVtYXNgIGluZm9ybWF0aW9uIGlzIG5vdCBwcmVzZW50IG9uIENvbXBvbmVudCBhbmQgTW9kdWxlXG4gICAgICAgIC8vIGRlZnMgYWZ0ZXIgY29tcGlsYXRpb24gKHNvIHRoZSBjaGVjayBkb2Vzbid0IGhhcHBlbiB0aGUgc2Vjb25kIHRpbWUgYXQgcnVudGltZSkuXG4gICAgICAgIGlmICghbmdNb2R1bGVEZWYuc2NoZW1hcykge1xuICAgICAgICAgIG5nTW9kdWxlRGVmLnNjaGVtYXMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5nTW9kdWxlRGVmO1xuICAgIH1cbiAgfSk7XG5cbiAgbGV0IG5nRmFjdG9yeURlZjogYW55ID0gbnVsbDtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZVR5cGUsIE5HX0ZBQ1RPUllfREVGLCB7XG4gICAgZ2V0OiAoKSA9PiB7XG4gICAgICBpZiAobmdGYWN0b3J5RGVmID09PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGNvbXBpbGVyID0gZ2V0Q29tcGlsZXJGYWNhZGUoXG4gICAgICAgICAgICB7dXNhZ2U6IEppdENvbXBpbGVyVXNhZ2UuRGVjb3JhdG9yLCBraW5kOiAnTmdNb2R1bGUnLCB0eXBlOiBtb2R1bGVUeXBlfSk7XG4gICAgICAgIG5nRmFjdG9yeURlZiA9IGNvbXBpbGVyLmNvbXBpbGVGYWN0b3J5KGFuZ3VsYXJDb3JlRW52LCBgbmc6Ly8vJHttb2R1bGVUeXBlLm5hbWV9L8m1ZmFjLmpzYCwge1xuICAgICAgICAgIG5hbWU6IG1vZHVsZVR5cGUubmFtZSxcbiAgICAgICAgICB0eXBlOiBtb2R1bGVUeXBlLFxuICAgICAgICAgIGRlcHM6IHJlZmxlY3REZXBlbmRlbmNpZXMobW9kdWxlVHlwZSksXG4gICAgICAgICAgdGFyZ2V0OiBjb21waWxlci5GYWN0b3J5VGFyZ2V0Lk5nTW9kdWxlLFxuICAgICAgICAgIHR5cGVBcmd1bWVudENvdW50OiAwLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZ0ZhY3RvcnlEZWY7XG4gICAgfSxcbiAgICAvLyBNYWtlIHRoZSBwcm9wZXJ0eSBjb25maWd1cmFibGUgaW4gZGV2IG1vZGUgdG8gYWxsb3cgb3ZlcnJpZGluZyBpbiB0ZXN0c1xuICAgIGNvbmZpZ3VyYWJsZTogISFuZ0Rldk1vZGUsXG4gIH0pO1xuXG4gIGxldCBuZ0luamVjdG9yRGVmOiBhbnkgPSBudWxsO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlVHlwZSwgTkdfSU5KX0RFRiwge1xuICAgIGdldDogKCkgPT4ge1xuICAgICAgaWYgKG5nSW5qZWN0b3JEZWYgPT09IG51bGwpIHtcbiAgICAgICAgbmdEZXZNb2RlICYmIHZlcmlmeVNlbWFudGljc09mTmdNb2R1bGVEZWYobW9kdWxlVHlwZSwgYWxsb3dEdXBsaWNhdGVEZWNsYXJhdGlvbnNJblJvb3QpO1xuICAgICAgICBjb25zdCBtZXRhOiBSM0luamVjdG9yTWV0YWRhdGFGYWNhZGUgPSB7XG4gICAgICAgICAgbmFtZTogbW9kdWxlVHlwZS5uYW1lLFxuICAgICAgICAgIHR5cGU6IG1vZHVsZVR5cGUsXG4gICAgICAgICAgcHJvdmlkZXJzOiBuZ01vZHVsZS5wcm92aWRlcnMgfHwgRU1QVFlfQVJSQVksXG4gICAgICAgICAgaW1wb3J0czogW1xuICAgICAgICAgICAgKG5nTW9kdWxlLmltcG9ydHMgfHwgRU1QVFlfQVJSQVkpLm1hcChyZXNvbHZlRm9yd2FyZFJlZiksXG4gICAgICAgICAgICAobmdNb2R1bGUuZXhwb3J0cyB8fCBFTVBUWV9BUlJBWSkubWFwKHJlc29sdmVGb3J3YXJkUmVmKSxcbiAgICAgICAgICBdLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjb21waWxlciA9IGdldENvbXBpbGVyRmFjYWRlKFxuICAgICAgICAgICAge3VzYWdlOiBKaXRDb21waWxlclVzYWdlLkRlY29yYXRvciwga2luZDogJ05nTW9kdWxlJywgdHlwZTogbW9kdWxlVHlwZX0pO1xuICAgICAgICBuZ0luamVjdG9yRGVmID1cbiAgICAgICAgICAgIGNvbXBpbGVyLmNvbXBpbGVJbmplY3Rvcihhbmd1bGFyQ29yZUVudiwgYG5nOi8vLyR7bW9kdWxlVHlwZS5uYW1lfS/JtWluai5qc2AsIG1ldGEpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5nSW5qZWN0b3JEZWY7XG4gICAgfSxcbiAgICAvLyBNYWtlIHRoZSBwcm9wZXJ0eSBjb25maWd1cmFibGUgaW4gZGV2IG1vZGUgdG8gYWxsb3cgb3ZlcnJpZGluZyBpbiB0ZXN0c1xuICAgIGNvbmZpZ3VyYWJsZTogISFuZ0Rldk1vZGUsXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVTdGFuZGFsb25lSW5EZWNsYXJhdGlvbnNFcnJvcih0eXBlOiBUeXBlPGFueT4sIGxvY2F0aW9uOiBzdHJpbmcpIHtcbiAgY29uc3QgcHJlZml4ID0gYFVuZXhwZWN0ZWQgXCIke3N0cmluZ2lmeUZvckVycm9yKHR5cGUpfVwiIGZvdW5kIGluIHRoZSBcImRlY2xhcmF0aW9uc1wiIGFycmF5IG9mIHRoZWA7XG4gIGNvbnN0IHN1ZmZpeCA9IGBcIiR7c3RyaW5naWZ5Rm9yRXJyb3IodHlwZSl9XCIgaXMgbWFya2VkIGFzIHN0YW5kYWxvbmUgYW5kIGNhbid0IGJlIGRlY2xhcmVkIGAgK1xuICAgICAgJ2luIGFueSBOZ01vZHVsZSAtIGRpZCB5b3UgaW50ZW5kIHRvIGltcG9ydCBpdCBpbnN0ZWFkIChieSBhZGRpbmcgaXQgdG8gdGhlIFwiaW1wb3J0c1wiIGFycmF5KT8nO1xuICByZXR1cm4gYCR7cHJlZml4fSAke2xvY2F0aW9ufSwgJHtzdWZmaXh9YDtcbn1cblxuZnVuY3Rpb24gdmVyaWZ5U2VtYW50aWNzT2ZOZ01vZHVsZURlZihcbiAgICBtb2R1bGVUeXBlOiBOZ01vZHVsZVR5cGUsIGFsbG93RHVwbGljYXRlRGVjbGFyYXRpb25zSW5Sb290OiBib29sZWFuLFxuICAgIGltcG9ydGluZ01vZHVsZT86IE5nTW9kdWxlVHlwZSk6IHZvaWQge1xuICBpZiAodmVyaWZpZWROZ01vZHVsZS5nZXQobW9kdWxlVHlwZSkpIHJldHVybjtcblxuICAvLyBza2lwIHZlcmlmaWNhdGlvbnMgb2Ygc3RhbmRhbG9uZSBjb21wb25lbnRzLCBkaXJlY3RpdmVzLCBhbmQgcGlwZXNcbiAgaWYgKGlzU3RhbmRhbG9uZShtb2R1bGVUeXBlKSkgcmV0dXJuO1xuXG4gIHZlcmlmaWVkTmdNb2R1bGUuc2V0KG1vZHVsZVR5cGUsIHRydWUpO1xuICBtb2R1bGVUeXBlID0gcmVzb2x2ZUZvcndhcmRSZWYobW9kdWxlVHlwZSk7XG4gIGxldCBuZ01vZHVsZURlZjogTmdNb2R1bGVEZWY8YW55PjtcbiAgaWYgKGltcG9ydGluZ01vZHVsZSkge1xuICAgIG5nTW9kdWxlRGVmID0gZ2V0TmdNb2R1bGVEZWYobW9kdWxlVHlwZSkhO1xuICAgIGlmICghbmdNb2R1bGVEZWYpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCB2YWx1ZSAnJHttb2R1bGVUeXBlLm5hbWV9JyBpbXBvcnRlZCBieSB0aGUgbW9kdWxlICcke1xuICAgICAgICAgIGltcG9ydGluZ01vZHVsZS5uYW1lfScuIFBsZWFzZSBhZGQgYW4gQE5nTW9kdWxlIGFubm90YXRpb24uYCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIG5nTW9kdWxlRGVmID0gZ2V0TmdNb2R1bGVEZWYobW9kdWxlVHlwZSwgdHJ1ZSk7XG4gIH1cbiAgY29uc3QgZXJyb3JzOiBzdHJpbmdbXSA9IFtdO1xuICBjb25zdCBkZWNsYXJhdGlvbnMgPSBtYXliZVVud3JhcEZuKG5nTW9kdWxlRGVmLmRlY2xhcmF0aW9ucyk7XG4gIGNvbnN0IGltcG9ydHMgPSBtYXliZVVud3JhcEZuKG5nTW9kdWxlRGVmLmltcG9ydHMpO1xuICBmbGF0dGVuKGltcG9ydHMpLm1hcCh1bndyYXBNb2R1bGVXaXRoUHJvdmlkZXJzSW1wb3J0cykuZm9yRWFjaChtb2RPclN0YW5kYWxvbmVDbXB0ID0+IHtcbiAgICB2ZXJpZnlTZW1hbnRpY3NPZk5nTW9kdWxlSW1wb3J0KG1vZE9yU3RhbmRhbG9uZUNtcHQsIG1vZHVsZVR5cGUpO1xuICAgIHZlcmlmeVNlbWFudGljc09mTmdNb2R1bGVEZWYobW9kT3JTdGFuZGFsb25lQ21wdCwgZmFsc2UsIG1vZHVsZVR5cGUpO1xuICB9KTtcbiAgY29uc3QgZXhwb3J0cyA9IG1heWJlVW53cmFwRm4obmdNb2R1bGVEZWYuZXhwb3J0cyk7XG4gIGRlY2xhcmF0aW9ucy5mb3JFYWNoKHZlcmlmeURlY2xhcmF0aW9uc0hhdmVEZWZpbml0aW9ucyk7XG4gIGRlY2xhcmF0aW9ucy5mb3JFYWNoKHZlcmlmeURpcmVjdGl2ZXNIYXZlU2VsZWN0b3IpO1xuICBkZWNsYXJhdGlvbnMuZm9yRWFjaCgoZGVjbGFyYXRpb25UeXBlKSA9PiB2ZXJpZnlOb3RTdGFuZGFsb25lKGRlY2xhcmF0aW9uVHlwZSwgbW9kdWxlVHlwZSkpO1xuICBjb25zdCBjb21iaW5lZERlY2xhcmF0aW9uczogVHlwZTxhbnk+W10gPSBbXG4gICAgLi4uZGVjbGFyYXRpb25zLm1hcChyZXNvbHZlRm9yd2FyZFJlZiksXG4gICAgLi4uZmxhdHRlbihpbXBvcnRzLm1hcChjb21wdXRlQ29tYmluZWRFeHBvcnRzKSkubWFwKHJlc29sdmVGb3J3YXJkUmVmKSxcbiAgXTtcbiAgZXhwb3J0cy5mb3JFYWNoKHZlcmlmeUV4cG9ydHNBcmVEZWNsYXJlZE9yUmVFeHBvcnRlZCk7XG4gIGRlY2xhcmF0aW9ucy5mb3JFYWNoKGRlY2wgPT4gdmVyaWZ5RGVjbGFyYXRpb25Jc1VuaXF1ZShkZWNsLCBhbGxvd0R1cGxpY2F0ZURlY2xhcmF0aW9uc0luUm9vdCkpO1xuXG4gIGNvbnN0IG5nTW9kdWxlID0gZ2V0QW5ub3RhdGlvbjxOZ01vZHVsZT4obW9kdWxlVHlwZSwgJ05nTW9kdWxlJyk7XG4gIGlmIChuZ01vZHVsZSkge1xuICAgIG5nTW9kdWxlLmltcG9ydHMgJiZcbiAgICAgICAgZmxhdHRlbihuZ01vZHVsZS5pbXBvcnRzKS5tYXAodW53cmFwTW9kdWxlV2l0aFByb3ZpZGVyc0ltcG9ydHMpLmZvckVhY2gobW9kID0+IHtcbiAgICAgICAgICB2ZXJpZnlTZW1hbnRpY3NPZk5nTW9kdWxlSW1wb3J0KG1vZCwgbW9kdWxlVHlwZSk7XG4gICAgICAgICAgdmVyaWZ5U2VtYW50aWNzT2ZOZ01vZHVsZURlZihtb2QsIGZhbHNlLCBtb2R1bGVUeXBlKTtcbiAgICAgICAgfSk7XG4gICAgbmdNb2R1bGUuYm9vdHN0cmFwICYmIGRlZXBGb3JFYWNoKG5nTW9kdWxlLmJvb3RzdHJhcCwgdmVyaWZ5Q29ycmVjdEJvb3RzdHJhcFR5cGUpO1xuICAgIG5nTW9kdWxlLmJvb3RzdHJhcCAmJiBkZWVwRm9yRWFjaChuZ01vZHVsZS5ib290c3RyYXAsIHZlcmlmeUNvbXBvbmVudElzUGFydE9mTmdNb2R1bGUpO1xuICB9XG5cbiAgLy8gVGhyb3cgRXJyb3IgaWYgYW55IGVycm9ycyB3ZXJlIGRldGVjdGVkLlxuICBpZiAoZXJyb3JzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcihlcnJvcnMuam9pbignXFxuJykpO1xuICB9XG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICBmdW5jdGlvbiB2ZXJpZnlEZWNsYXJhdGlvbnNIYXZlRGVmaW5pdGlvbnModHlwZTogVHlwZTxhbnk+KTogdm9pZCB7XG4gICAgdHlwZSA9IHJlc29sdmVGb3J3YXJkUmVmKHR5cGUpO1xuICAgIGNvbnN0IGRlZiA9IGdldENvbXBvbmVudERlZih0eXBlKSB8fCBnZXREaXJlY3RpdmVEZWYodHlwZSkgfHwgZ2V0UGlwZURlZih0eXBlKTtcbiAgICBpZiAoIWRlZikge1xuICAgICAgZXJyb3JzLnB1c2goYFVuZXhwZWN0ZWQgdmFsdWUgJyR7c3RyaW5naWZ5Rm9yRXJyb3IodHlwZSl9JyBkZWNsYXJlZCBieSB0aGUgbW9kdWxlICcke1xuICAgICAgICAgIHN0cmluZ2lmeUZvckVycm9yKG1vZHVsZVR5cGUpfScuIFBsZWFzZSBhZGQgYSBAUGlwZS9ARGlyZWN0aXZlL0BDb21wb25lbnQgYW5ub3RhdGlvbi5gKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB2ZXJpZnlEaXJlY3RpdmVzSGF2ZVNlbGVjdG9yKHR5cGU6IFR5cGU8YW55Pik6IHZvaWQge1xuICAgIHR5cGUgPSByZXNvbHZlRm9yd2FyZFJlZih0eXBlKTtcbiAgICBjb25zdCBkZWYgPSBnZXREaXJlY3RpdmVEZWYodHlwZSk7XG4gICAgaWYgKCFnZXRDb21wb25lbnREZWYodHlwZSkgJiYgZGVmICYmIGRlZi5zZWxlY3RvcnMubGVuZ3RoID09IDApIHtcbiAgICAgIGVycm9ycy5wdXNoKGBEaXJlY3RpdmUgJHtzdHJpbmdpZnlGb3JFcnJvcih0eXBlKX0gaGFzIG5vIHNlbGVjdG9yLCBwbGVhc2UgYWRkIGl0IWApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHZlcmlmeU5vdFN0YW5kYWxvbmUodHlwZTogVHlwZTxhbnk+LCBtb2R1bGVUeXBlOiBOZ01vZHVsZVR5cGUpOiB2b2lkIHtcbiAgICB0eXBlID0gcmVzb2x2ZUZvcndhcmRSZWYodHlwZSk7XG4gICAgY29uc3QgZGVmID0gZ2V0Q29tcG9uZW50RGVmKHR5cGUpIHx8IGdldERpcmVjdGl2ZURlZih0eXBlKSB8fCBnZXRQaXBlRGVmKHR5cGUpO1xuICAgIGlmIChkZWY/LnN0YW5kYWxvbmUpIHtcbiAgICAgIGNvbnN0IGxvY2F0aW9uID0gYFwiJHtzdHJpbmdpZnlGb3JFcnJvcihtb2R1bGVUeXBlKX1cIiBOZ01vZHVsZWA7XG4gICAgICBlcnJvcnMucHVzaChnZW5lcmF0ZVN0YW5kYWxvbmVJbkRlY2xhcmF0aW9uc0Vycm9yKHR5cGUsIGxvY2F0aW9uKSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdmVyaWZ5RXhwb3J0c0FyZURlY2xhcmVkT3JSZUV4cG9ydGVkKHR5cGU6IFR5cGU8YW55Pikge1xuICAgIHR5cGUgPSByZXNvbHZlRm9yd2FyZFJlZih0eXBlKTtcbiAgICBjb25zdCBraW5kID0gZ2V0Q29tcG9uZW50RGVmKHR5cGUpICYmICdjb21wb25lbnQnIHx8IGdldERpcmVjdGl2ZURlZih0eXBlKSAmJiAnZGlyZWN0aXZlJyB8fFxuICAgICAgICBnZXRQaXBlRGVmKHR5cGUpICYmICdwaXBlJztcbiAgICBpZiAoa2luZCkge1xuICAgICAgLy8gb25seSBjaGVja2VkIGlmIHdlIGFyZSBkZWNsYXJlZCBhcyBDb21wb25lbnQsIERpcmVjdGl2ZSwgb3IgUGlwZVxuICAgICAgLy8gTW9kdWxlcyBkb24ndCBuZWVkIHRvIGJlIGRlY2xhcmVkIG9yIGltcG9ydGVkLlxuICAgICAgaWYgKGNvbWJpbmVkRGVjbGFyYXRpb25zLmxhc3RJbmRleE9mKHR5cGUpID09PSAtMSkge1xuICAgICAgICAvLyBXZSBhcmUgZXhwb3J0aW5nIHNvbWV0aGluZyB3aGljaCB3ZSBkb24ndCBleHBsaWNpdGx5IGRlY2xhcmUgb3IgaW1wb3J0LlxuICAgICAgICBlcnJvcnMucHVzaChgQ2FuJ3QgZXhwb3J0ICR7a2luZH0gJHtzdHJpbmdpZnlGb3JFcnJvcih0eXBlKX0gZnJvbSAke1xuICAgICAgICAgICAgc3RyaW5naWZ5Rm9yRXJyb3IobW9kdWxlVHlwZSl9IGFzIGl0IHdhcyBuZWl0aGVyIGRlY2xhcmVkIG5vciBpbXBvcnRlZCFgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB2ZXJpZnlEZWNsYXJhdGlvbklzVW5pcXVlKHR5cGU6IFR5cGU8YW55Piwgc3VwcHJlc3NFcnJvcnM6IGJvb2xlYW4pIHtcbiAgICB0eXBlID0gcmVzb2x2ZUZvcndhcmRSZWYodHlwZSk7XG4gICAgY29uc3QgZXhpc3RpbmdNb2R1bGUgPSBvd25lck5nTW9kdWxlLmdldCh0eXBlKTtcbiAgICBpZiAoZXhpc3RpbmdNb2R1bGUgJiYgZXhpc3RpbmdNb2R1bGUgIT09IG1vZHVsZVR5cGUpIHtcbiAgICAgIGlmICghc3VwcHJlc3NFcnJvcnMpIHtcbiAgICAgICAgY29uc3QgbW9kdWxlcyA9IFtleGlzdGluZ01vZHVsZSwgbW9kdWxlVHlwZV0ubWFwKHN0cmluZ2lmeUZvckVycm9yKS5zb3J0KCk7XG4gICAgICAgIGVycm9ycy5wdXNoKFxuICAgICAgICAgICAgYFR5cGUgJHtzdHJpbmdpZnlGb3JFcnJvcih0eXBlKX0gaXMgcGFydCBvZiB0aGUgZGVjbGFyYXRpb25zIG9mIDIgbW9kdWxlczogJHtcbiAgICAgICAgICAgICAgICBtb2R1bGVzWzBdfSBhbmQgJHttb2R1bGVzWzFdfSEgYCArXG4gICAgICAgICAgICBgUGxlYXNlIGNvbnNpZGVyIG1vdmluZyAke3N0cmluZ2lmeUZvckVycm9yKHR5cGUpfSB0byBhIGhpZ2hlciBtb2R1bGUgdGhhdCBpbXBvcnRzICR7XG4gICAgICAgICAgICAgICAgbW9kdWxlc1swXX0gYW5kICR7bW9kdWxlc1sxXX0uIGAgK1xuICAgICAgICAgICAgYFlvdSBjYW4gYWxzbyBjcmVhdGUgYSBuZXcgTmdNb2R1bGUgdGhhdCBleHBvcnRzIGFuZCBpbmNsdWRlcyAke1xuICAgICAgICAgICAgICAgIHN0cmluZ2lmeUZvckVycm9yKFxuICAgICAgICAgICAgICAgICAgICB0eXBlKX0gdGhlbiBpbXBvcnQgdGhhdCBOZ01vZHVsZSBpbiAke21vZHVsZXNbMF19IGFuZCAke21vZHVsZXNbMV19LmApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBNYXJrIHR5cGUgYXMgaGF2aW5nIG93bmVyLlxuICAgICAgb3duZXJOZ01vZHVsZS5zZXQodHlwZSwgbW9kdWxlVHlwZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdmVyaWZ5Q29tcG9uZW50SXNQYXJ0T2ZOZ01vZHVsZSh0eXBlOiBUeXBlPGFueT4pIHtcbiAgICB0eXBlID0gcmVzb2x2ZUZvcndhcmRSZWYodHlwZSk7XG4gICAgY29uc3QgZXhpc3RpbmdNb2R1bGUgPSBvd25lck5nTW9kdWxlLmdldCh0eXBlKTtcbiAgICBpZiAoIWV4aXN0aW5nTW9kdWxlICYmICFpc1N0YW5kYWxvbmUodHlwZSkpIHtcbiAgICAgIGVycm9ycy5wdXNoKGBDb21wb25lbnQgJHtcbiAgICAgICAgICBzdHJpbmdpZnlGb3JFcnJvcihcbiAgICAgICAgICAgICAgdHlwZSl9IGlzIG5vdCBwYXJ0IG9mIGFueSBOZ01vZHVsZSBvciB0aGUgbW9kdWxlIGhhcyBub3QgYmVlbiBpbXBvcnRlZCBpbnRvIHlvdXIgbW9kdWxlLmApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHZlcmlmeUNvcnJlY3RCb290c3RyYXBUeXBlKHR5cGU6IFR5cGU8YW55Pikge1xuICAgIHR5cGUgPSByZXNvbHZlRm9yd2FyZFJlZih0eXBlKTtcbiAgICBpZiAoIWdldENvbXBvbmVudERlZih0eXBlKSkge1xuICAgICAgZXJyb3JzLnB1c2goYCR7c3RyaW5naWZ5Rm9yRXJyb3IodHlwZSl9IGNhbm5vdCBiZSB1c2VkIGFzIGFuIGVudHJ5IGNvbXBvbmVudC5gKTtcbiAgICB9XG4gICAgaWYgKGlzU3RhbmRhbG9uZSh0eXBlKSkge1xuICAgICAgLy8gTm90ZTogdGhpcyBlcnJvciBzaG91bGQgYmUgdGhlIHNhbWUgYXMgdGhlXG4gICAgICAvLyBgTkdNT0RVTEVfQk9PVFNUUkFQX0lTX1NUQU5EQUxPTkVgIG9uZSBpbiBBT1QgY29tcGlsZXIuXG4gICAgICBlcnJvcnMucHVzaChcbiAgICAgICAgICBgVGhlIFxcYCR7c3RyaW5naWZ5Rm9yRXJyb3IodHlwZSl9XFxgIGNsYXNzIGlzIGEgc3RhbmRhbG9uZSBjb21wb25lbnQsIHdoaWNoIGNhbiBgICtcbiAgICAgICAgICBgbm90IGJlIHVzZWQgaW4gdGhlIFxcYEBOZ01vZHVsZS5ib290c3RyYXBcXGAgYXJyYXkuIFVzZSB0aGUgXFxgYm9vdHN0cmFwQXBwbGljYXRpb25cXGAgYCArXG4gICAgICAgICAgYGZ1bmN0aW9uIGZvciBib290c3RyYXAgaW5zdGVhZC5gKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB2ZXJpZnlTZW1hbnRpY3NPZk5nTW9kdWxlSW1wb3J0KHR5cGU6IFR5cGU8YW55PiwgaW1wb3J0aW5nTW9kdWxlOiBUeXBlPGFueT4pIHtcbiAgICB0eXBlID0gcmVzb2x2ZUZvcndhcmRSZWYodHlwZSk7XG5cbiAgICBjb25zdCBkaXJlY3RpdmVEZWYgPSBnZXRDb21wb25lbnREZWYodHlwZSkgfHwgZ2V0RGlyZWN0aXZlRGVmKHR5cGUpO1xuICAgIGlmIChkaXJlY3RpdmVEZWYgIT09IG51bGwgJiYgIWRpcmVjdGl2ZURlZi5zdGFuZGFsb25lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuZXhwZWN0ZWQgZGlyZWN0aXZlICcke3R5cGUubmFtZX0nIGltcG9ydGVkIGJ5IHRoZSBtb2R1bGUgJyR7XG4gICAgICAgICAgaW1wb3J0aW5nTW9kdWxlLm5hbWV9Jy4gUGxlYXNlIGFkZCBhbiBATmdNb2R1bGUgYW5ub3RhdGlvbi5gKTtcbiAgICB9XG5cbiAgICBjb25zdCBwaXBlRGVmID0gZ2V0UGlwZURlZih0eXBlKTtcbiAgICBpZiAocGlwZURlZiAhPT0gbnVsbCAmJiAhcGlwZURlZi5zdGFuZGFsb25lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuZXhwZWN0ZWQgcGlwZSAnJHt0eXBlLm5hbWV9JyBpbXBvcnRlZCBieSB0aGUgbW9kdWxlICcke1xuICAgICAgICAgIGltcG9ydGluZ01vZHVsZS5uYW1lfScuIFBsZWFzZSBhZGQgYW4gQE5nTW9kdWxlIGFubm90YXRpb24uYCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHVud3JhcE1vZHVsZVdpdGhQcm92aWRlcnNJbXBvcnRzKHR5cGVPcldpdGhQcm92aWRlcnM6IE5nTW9kdWxlVHlwZTxhbnk+fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge25nTW9kdWxlOiBOZ01vZHVsZVR5cGU8YW55Pn0pOiBOZ01vZHVsZVR5cGU8YW55PiB7XG4gIHR5cGVPcldpdGhQcm92aWRlcnMgPSByZXNvbHZlRm9yd2FyZFJlZih0eXBlT3JXaXRoUHJvdmlkZXJzKTtcbiAgcmV0dXJuICh0eXBlT3JXaXRoUHJvdmlkZXJzIGFzIGFueSkubmdNb2R1bGUgfHwgdHlwZU9yV2l0aFByb3ZpZGVycztcbn1cblxuZnVuY3Rpb24gZ2V0QW5ub3RhdGlvbjxUPih0eXBlOiBhbnksIG5hbWU6IHN0cmluZyk6IFR8bnVsbCB7XG4gIGxldCBhbm5vdGF0aW9uOiBUfG51bGwgPSBudWxsO1xuICBjb2xsZWN0KHR5cGUuX19hbm5vdGF0aW9uc19fKTtcbiAgY29sbGVjdCh0eXBlLmRlY29yYXRvcnMpO1xuICByZXR1cm4gYW5ub3RhdGlvbjtcblxuICBmdW5jdGlvbiBjb2xsZWN0KGFubm90YXRpb25zOiBhbnlbXXxudWxsKSB7XG4gICAgaWYgKGFubm90YXRpb25zKSB7XG4gICAgICBhbm5vdGF0aW9ucy5mb3JFYWNoKHJlYWRBbm5vdGF0aW9uKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFkQW5ub3RhdGlvbihcbiAgICAgIGRlY29yYXRvcjoge3R5cGU6IHtwcm90b3R5cGU6IHtuZ01ldGFkYXRhTmFtZTogc3RyaW5nfSwgYXJnczogYW55W119LCBhcmdzOiBhbnl9KTogdm9pZCB7XG4gICAgaWYgKCFhbm5vdGF0aW9uKSB7XG4gICAgICBjb25zdCBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihkZWNvcmF0b3IpO1xuICAgICAgaWYgKHByb3RvLm5nTWV0YWRhdGFOYW1lID09IG5hbWUpIHtcbiAgICAgICAgYW5ub3RhdGlvbiA9IGRlY29yYXRvciBhcyBhbnk7XG4gICAgICB9IGVsc2UgaWYgKGRlY29yYXRvci50eXBlKSB7XG4gICAgICAgIGNvbnN0IHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGRlY29yYXRvci50eXBlKTtcbiAgICAgICAgaWYgKHByb3RvLm5nTWV0YWRhdGFOYW1lID09IG5hbWUpIHtcbiAgICAgICAgICBhbm5vdGF0aW9uID0gZGVjb3JhdG9yLmFyZ3NbMF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBLZWVwIHRyYWNrIG9mIGNvbXBpbGVkIGNvbXBvbmVudHMuIFRoaXMgaXMgbmVlZGVkIGJlY2F1c2UgaW4gdGVzdHMgd2Ugb2Z0ZW4gd2FudCB0byBjb21waWxlIHRoZVxuICogc2FtZSBjb21wb25lbnQgd2l0aCBtb3JlIHRoYW4gb25lIE5nTW9kdWxlLiBUaGlzIHdvdWxkIGNhdXNlIGFuIGVycm9yIHVubGVzcyB3ZSByZXNldCB3aGljaFxuICogTmdNb2R1bGUgdGhlIGNvbXBvbmVudCBiZWxvbmdzIHRvLiBXZSBrZWVwIHRoZSBsaXN0IG9mIGNvbXBpbGVkIGNvbXBvbmVudHMgaGVyZSBzbyB0aGF0IHRoZVxuICogVGVzdEJlZCBjYW4gcmVzZXQgaXQgbGF0ZXIuXG4gKi9cbmxldCBvd25lck5nTW9kdWxlID0gbmV3IFdlYWtNYXA8VHlwZTxhbnk+LCBOZ01vZHVsZVR5cGU8YW55Pj4oKTtcbmxldCB2ZXJpZmllZE5nTW9kdWxlID0gbmV3IFdlYWtNYXA8TmdNb2R1bGVUeXBlPGFueT4sIGJvb2xlYW4+KCk7XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNldENvbXBpbGVkQ29tcG9uZW50cygpOiB2b2lkIHtcbiAgb3duZXJOZ01vZHVsZSA9IG5ldyBXZWFrTWFwPFR5cGU8YW55PiwgTmdNb2R1bGVUeXBlPGFueT4+KCk7XG4gIHZlcmlmaWVkTmdNb2R1bGUgPSBuZXcgV2Vha01hcDxOZ01vZHVsZVR5cGU8YW55PiwgYm9vbGVhbj4oKTtcbiAgbW9kdWxlUXVldWUubGVuZ3RoID0gMDtcbiAgR0VORVJBVEVEX0NPTVBfSURTLmNsZWFyKCk7XG59XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIGNvbWJpbmVkIGRlY2xhcmF0aW9ucyBvZiBleHBsaWNpdCBkZWNsYXJhdGlvbnMsIGFzIHdlbGwgYXMgZGVjbGFyYXRpb25zIGluaGVyaXRlZCBieVxuICogdHJhdmVyc2luZyB0aGUgZXhwb3J0cyBvZiBpbXBvcnRlZCBtb2R1bGVzLlxuICogQHBhcmFtIHR5cGVcbiAqL1xuZnVuY3Rpb24gY29tcHV0ZUNvbWJpbmVkRXhwb3J0cyh0eXBlOiBUeXBlPGFueT4pOiBUeXBlPGFueT5bXSB7XG4gIHR5cGUgPSByZXNvbHZlRm9yd2FyZFJlZih0eXBlKTtcbiAgY29uc3QgbmdNb2R1bGVEZWYgPSBnZXROZ01vZHVsZURlZih0eXBlKTtcblxuICAvLyBhIHN0YW5kYWxvbmUgY29tcG9uZW50LCBkaXJlY3RpdmUgb3IgcGlwZVxuICBpZiAobmdNb2R1bGVEZWYgPT09IG51bGwpIHtcbiAgICByZXR1cm4gW3R5cGVdO1xuICB9XG5cbiAgcmV0dXJuIGZsYXR0ZW4obWF5YmVVbndyYXBGbihuZ01vZHVsZURlZi5leHBvcnRzKS5tYXAoKHR5cGUpID0+IHtcbiAgICBjb25zdCBuZ01vZHVsZURlZiA9IGdldE5nTW9kdWxlRGVmKHR5cGUpO1xuICAgIGlmIChuZ01vZHVsZURlZikge1xuICAgICAgdmVyaWZ5U2VtYW50aWNzT2ZOZ01vZHVsZURlZih0eXBlIGFzIGFueSBhcyBOZ01vZHVsZVR5cGUsIGZhbHNlKTtcbiAgICAgIHJldHVybiBjb21wdXRlQ29tYmluZWRFeHBvcnRzKHR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG4gIH0pKTtcbn1cblxuLyoqXG4gKiBTb21lIGRlY2xhcmVkIGNvbXBvbmVudHMgbWF5IGJlIGNvbXBpbGVkIGFzeW5jaHJvbm91c2x5LCBhbmQgdGh1cyBtYXkgbm90IGhhdmUgdGhlaXJcbiAqIMm1Y21wIHNldCB5ZXQuIElmIHRoaXMgaXMgdGhlIGNhc2UsIHRoZW4gYSByZWZlcmVuY2UgdG8gdGhlIG1vZHVsZSBpcyB3cml0dGVuIGludG9cbiAqIHRoZSBgbmdTZWxlY3RvclNjb3BlYCBwcm9wZXJ0eSBvZiB0aGUgZGVjbGFyZWQgdHlwZS5cbiAqL1xuZnVuY3Rpb24gc2V0U2NvcGVPbkRlY2xhcmVkQ29tcG9uZW50cyhtb2R1bGVUeXBlOiBUeXBlPGFueT4sIG5nTW9kdWxlOiBOZ01vZHVsZSkge1xuICBjb25zdCBkZWNsYXJhdGlvbnM6IFR5cGU8YW55PltdID0gZmxhdHRlbihuZ01vZHVsZS5kZWNsYXJhdGlvbnMgfHwgRU1QVFlfQVJSQVkpO1xuXG4gIGNvbnN0IHRyYW5zaXRpdmVTY29wZXMgPSB0cmFuc2l0aXZlU2NvcGVzRm9yKG1vZHVsZVR5cGUpO1xuXG4gIGRlY2xhcmF0aW9ucy5mb3JFYWNoKGRlY2xhcmF0aW9uID0+IHtcbiAgICBkZWNsYXJhdGlvbiA9IHJlc29sdmVGb3J3YXJkUmVmKGRlY2xhcmF0aW9uKTtcbiAgICBpZiAoZGVjbGFyYXRpb24uaGFzT3duUHJvcGVydHkoTkdfQ09NUF9ERUYpKSB7XG4gICAgICAvLyBBIGDJtWNtcGAgZmllbGQgZXhpc3RzIC0gZ28gYWhlYWQgYW5kIHBhdGNoIHRoZSBjb21wb25lbnQgZGlyZWN0bHkuXG4gICAgICBjb25zdCBjb21wb25lbnQgPSBkZWNsYXJhdGlvbiBhcyBUeXBlPGFueT4mIHvJtWNtcDogQ29tcG9uZW50RGVmPGFueT59O1xuICAgICAgY29uc3QgY29tcG9uZW50RGVmID0gZ2V0Q29tcG9uZW50RGVmKGNvbXBvbmVudCkhO1xuICAgICAgcGF0Y2hDb21wb25lbnREZWZXaXRoU2NvcGUoY29tcG9uZW50RGVmLCB0cmFuc2l0aXZlU2NvcGVzKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgICAhZGVjbGFyYXRpb24uaGFzT3duUHJvcGVydHkoTkdfRElSX0RFRikgJiYgIWRlY2xhcmF0aW9uLmhhc093blByb3BlcnR5KE5HX1BJUEVfREVGKSkge1xuICAgICAgLy8gU2V0IGBuZ1NlbGVjdG9yU2NvcGVgIGZvciBmdXR1cmUgcmVmZXJlbmNlIHdoZW4gdGhlIGNvbXBvbmVudCBjb21waWxhdGlvbiBmaW5pc2hlcy5cbiAgICAgIChkZWNsYXJhdGlvbiBhcyBUeXBlPGFueT4mIHtuZ1NlbGVjdG9yU2NvcGU/OiBhbnl9KS5uZ1NlbGVjdG9yU2NvcGUgPSBtb2R1bGVUeXBlO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogUGF0Y2ggdGhlIGRlZmluaXRpb24gb2YgYSBjb21wb25lbnQgd2l0aCBkaXJlY3RpdmVzIGFuZCBwaXBlcyBmcm9tIHRoZSBjb21waWxhdGlvbiBzY29wZSBvZlxuICogYSBnaXZlbiBtb2R1bGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXRjaENvbXBvbmVudERlZldpdGhTY29wZTxDPihcbiAgICBjb21wb25lbnREZWY6IENvbXBvbmVudERlZjxDPiwgdHJhbnNpdGl2ZVNjb3BlczogTmdNb2R1bGVUcmFuc2l0aXZlU2NvcGVzKSB7XG4gIGNvbXBvbmVudERlZi5kaXJlY3RpdmVEZWZzID0gKCkgPT5cbiAgICAgIEFycmF5LmZyb20odHJhbnNpdGl2ZVNjb3Blcy5jb21waWxhdGlvbi5kaXJlY3RpdmVzKVxuICAgICAgICAgIC5tYXAoXG4gICAgICAgICAgICAgIGRpciA9PiBkaXIuaGFzT3duUHJvcGVydHkoTkdfQ09NUF9ERUYpID8gZ2V0Q29tcG9uZW50RGVmKGRpcikhIDogZ2V0RGlyZWN0aXZlRGVmKGRpcikhXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAuZmlsdGVyKGRlZiA9PiAhIWRlZik7XG4gIGNvbXBvbmVudERlZi5waXBlRGVmcyA9ICgpID0+XG4gICAgICBBcnJheS5mcm9tKHRyYW5zaXRpdmVTY29wZXMuY29tcGlsYXRpb24ucGlwZXMpLm1hcChwaXBlID0+IGdldFBpcGVEZWYocGlwZSkhKTtcbiAgY29tcG9uZW50RGVmLnNjaGVtYXMgPSB0cmFuc2l0aXZlU2NvcGVzLnNjaGVtYXM7XG5cbiAgLy8gU2luY2Ugd2UgYXZvaWQgQ29tcG9uZW50cy9EaXJlY3RpdmVzL1BpcGVzIHJlY29tcGlsaW5nIGluIGNhc2UgdGhlcmUgYXJlIG5vIG92ZXJyaWRlcywgd2VcbiAgLy8gbWF5IGZhY2UgYSBwcm9ibGVtIHdoZXJlIHByZXZpb3VzbHkgY29tcGlsZWQgZGVmcyBhdmFpbGFibGUgdG8gYSBnaXZlbiBDb21wb25lbnQvRGlyZWN0aXZlXG4gIC8vIGFyZSBjYWNoZWQgaW4gVFZpZXcgYW5kIG1heSBiZWNvbWUgc3RhbGUgKGluIGNhc2UgYW55IG9mIHRoZXNlIGRlZnMgZ2V0cyByZWNvbXBpbGVkKS4gSW5cbiAgLy8gb3JkZXIgdG8gYXZvaWQgdGhpcyBwcm9ibGVtLCB3ZSBmb3JjZSBmcmVzaCBUVmlldyB0byBiZSBjcmVhdGVkLlxuICBjb21wb25lbnREZWYudFZpZXcgPSBudWxsO1xufVxuXG4vKipcbiAqIENvbXB1dGUgdGhlIHBhaXIgb2YgdHJhbnNpdGl2ZSBzY29wZXMgKGNvbXBpbGF0aW9uIHNjb3BlIGFuZCBleHBvcnRlZCBzY29wZSkgZm9yIGEgZ2l2ZW4gdHlwZVxuICogKGVpdGhlciBhIE5nTW9kdWxlIG9yIGEgc3RhbmRhbG9uZSBjb21wb25lbnQgLyBkaXJlY3RpdmUgLyBwaXBlKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zaXRpdmVTY29wZXNGb3I8VD4odHlwZTogVHlwZTxUPik6IE5nTW9kdWxlVHJhbnNpdGl2ZVNjb3BlcyB7XG4gIGlmIChpc05nTW9kdWxlKHR5cGUpKSB7XG4gICAgaWYgKFVTRV9SVU5USU1FX0RFUFNfVFJBQ0tFUl9GT1JfSklUKSB7XG4gICAgICBjb25zdCBzY29wZSA9IGRlcHNUcmFja2VyLmdldE5nTW9kdWxlU2NvcGUodHlwZSk7XG4gICAgICBjb25zdCBkZWYgPSBnZXROZ01vZHVsZURlZih0eXBlLCB0cnVlKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNjaGVtYXM6IGRlZi5zY2hlbWFzIHx8IG51bGwsXG4gICAgICAgIC4uLnNjb3BlLFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRyYW5zaXRpdmVTY29wZXNGb3JOZ01vZHVsZSh0eXBlKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNTdGFuZGFsb25lKHR5cGUpKSB7XG4gICAgY29uc3QgZGlyZWN0aXZlRGVmID0gZ2V0Q29tcG9uZW50RGVmKHR5cGUpIHx8IGdldERpcmVjdGl2ZURlZih0eXBlKTtcbiAgICBpZiAoZGlyZWN0aXZlRGVmICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzY2hlbWFzOiBudWxsLFxuICAgICAgICBjb21waWxhdGlvbjoge1xuICAgICAgICAgIGRpcmVjdGl2ZXM6IG5ldyBTZXQ8YW55PigpLFxuICAgICAgICAgIHBpcGVzOiBuZXcgU2V0PGFueT4oKSxcbiAgICAgICAgfSxcbiAgICAgICAgZXhwb3J0ZWQ6IHtcbiAgICAgICAgICBkaXJlY3RpdmVzOiBuZXcgU2V0PGFueT4oW3R5cGVdKSxcbiAgICAgICAgICBwaXBlczogbmV3IFNldDxhbnk+KCksXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0IHBpcGVEZWYgPSBnZXRQaXBlRGVmKHR5cGUpO1xuICAgIGlmIChwaXBlRGVmICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzY2hlbWFzOiBudWxsLFxuICAgICAgICBjb21waWxhdGlvbjoge1xuICAgICAgICAgIGRpcmVjdGl2ZXM6IG5ldyBTZXQ8YW55PigpLFxuICAgICAgICAgIHBpcGVzOiBuZXcgU2V0PGFueT4oKSxcbiAgICAgICAgfSxcbiAgICAgICAgZXhwb3J0ZWQ6IHtcbiAgICAgICAgICBkaXJlY3RpdmVzOiBuZXcgU2V0PGFueT4oKSxcbiAgICAgICAgICBwaXBlczogbmV3IFNldDxhbnk+KFt0eXBlXSksXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIC8vIFRPRE86IGNoYW5nZSB0aGUgZXJyb3IgbWVzc2FnZSB0byBiZSBtb3JlIHVzZXItZmFjaW5nIGFuZCB0YWtlIHN0YW5kYWxvbmUgaW50byBhY2NvdW50XG4gIHRocm93IG5ldyBFcnJvcihgJHt0eXBlLm5hbWV9IGRvZXMgbm90IGhhdmUgYSBtb2R1bGUgZGVmICjJtW1vZCBwcm9wZXJ0eSlgKTtcbn1cblxuLyoqXG4gKiBDb21wdXRlIHRoZSBwYWlyIG9mIHRyYW5zaXRpdmUgc2NvcGVzIChjb21waWxhdGlvbiBzY29wZSBhbmQgZXhwb3J0ZWQgc2NvcGUpIGZvciBhIGdpdmVuIG1vZHVsZS5cbiAqXG4gKiBUaGlzIG9wZXJhdGlvbiBpcyBtZW1vaXplZCBhbmQgdGhlIHJlc3VsdCBpcyBjYWNoZWQgb24gdGhlIG1vZHVsZSdzIGRlZmluaXRpb24uIFRoaXMgZnVuY3Rpb24gY2FuXG4gKiBiZSBjYWxsZWQgb24gbW9kdWxlcyB3aXRoIGNvbXBvbmVudHMgdGhhdCBoYXZlIG5vdCBmdWxseSBjb21waWxlZCB5ZXQsIGJ1dCB0aGUgcmVzdWx0IHNob3VsZCBub3RcbiAqIGJlIHVzZWQgdW50aWwgdGhleSBoYXZlLlxuICpcbiAqIEBwYXJhbSBtb2R1bGVUeXBlIG1vZHVsZSB0aGF0IHRyYW5zaXRpdmUgc2NvcGUgc2hvdWxkIGJlIGNhbGN1bGF0ZWQgZm9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNpdGl2ZVNjb3Blc0Zvck5nTW9kdWxlPFQ+KG1vZHVsZVR5cGU6IFR5cGU8VD4pOiBOZ01vZHVsZVRyYW5zaXRpdmVTY29wZXMge1xuICBjb25zdCBkZWYgPSBnZXROZ01vZHVsZURlZihtb2R1bGVUeXBlLCB0cnVlKTtcblxuICBpZiAoZGVmLnRyYW5zaXRpdmVDb21waWxlU2NvcGVzICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIGRlZi50cmFuc2l0aXZlQ29tcGlsZVNjb3BlcztcbiAgfVxuXG4gIGNvbnN0IHNjb3BlczogTmdNb2R1bGVUcmFuc2l0aXZlU2NvcGVzID0ge1xuICAgIHNjaGVtYXM6IGRlZi5zY2hlbWFzIHx8IG51bGwsXG4gICAgY29tcGlsYXRpb246IHtcbiAgICAgIGRpcmVjdGl2ZXM6IG5ldyBTZXQ8YW55PigpLFxuICAgICAgcGlwZXM6IG5ldyBTZXQ8YW55PigpLFxuICAgIH0sXG4gICAgZXhwb3J0ZWQ6IHtcbiAgICAgIGRpcmVjdGl2ZXM6IG5ldyBTZXQ8YW55PigpLFxuICAgICAgcGlwZXM6IG5ldyBTZXQ8YW55PigpLFxuICAgIH0sXG4gIH07XG5cbiAgbWF5YmVVbndyYXBGbihkZWYuaW1wb3J0cykuZm9yRWFjaCg8ST4oaW1wb3J0ZWQ6IFR5cGU8ST4pID0+IHtcbiAgICAvLyBXaGVuIHRoaXMgbW9kdWxlIGltcG9ydHMgYW5vdGhlciwgdGhlIGltcG9ydGVkIG1vZHVsZSdzIGV4cG9ydGVkIGRpcmVjdGl2ZXMgYW5kIHBpcGVzIGFyZVxuICAgIC8vIGFkZGVkIHRvIHRoZSBjb21waWxhdGlvbiBzY29wZSBvZiB0aGlzIG1vZHVsZS5cbiAgICBjb25zdCBpbXBvcnRlZFNjb3BlID0gdHJhbnNpdGl2ZVNjb3Blc0ZvcihpbXBvcnRlZCk7XG4gICAgaW1wb3J0ZWRTY29wZS5leHBvcnRlZC5kaXJlY3RpdmVzLmZvckVhY2goZW50cnkgPT4gc2NvcGVzLmNvbXBpbGF0aW9uLmRpcmVjdGl2ZXMuYWRkKGVudHJ5KSk7XG4gICAgaW1wb3J0ZWRTY29wZS5leHBvcnRlZC5waXBlcy5mb3JFYWNoKGVudHJ5ID0+IHNjb3Blcy5jb21waWxhdGlvbi5waXBlcy5hZGQoZW50cnkpKTtcbiAgfSk7XG5cbiAgbWF5YmVVbndyYXBGbihkZWYuZGVjbGFyYXRpb25zKS5mb3JFYWNoKGRlY2xhcmVkID0+IHtcbiAgICBjb25zdCBkZWNsYXJlZFdpdGhEZWZzID0gZGVjbGFyZWQgYXMgVHlwZTxhbnk+JiB7XG4gICAgICDJtXBpcGU/OiBhbnk7XG4gICAgfTtcblxuICAgIGlmIChnZXRQaXBlRGVmKGRlY2xhcmVkV2l0aERlZnMpKSB7XG4gICAgICBzY29wZXMuY29tcGlsYXRpb24ucGlwZXMuYWRkKGRlY2xhcmVkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRWl0aGVyIGRlY2xhcmVkIGhhcyBhIMm1Y21wIG9yIMm1ZGlyLCBvciBpdCdzIGEgY29tcG9uZW50IHdoaWNoIGhhc24ndFxuICAgICAgLy8gaGFkIGl0cyB0ZW1wbGF0ZSBjb21waWxlZCB5ZXQuIEluIGVpdGhlciBjYXNlLCBpdCBnZXRzIGFkZGVkIHRvIHRoZSBjb21waWxhdGlvbidzXG4gICAgICAvLyBkaXJlY3RpdmVzLlxuICAgICAgc2NvcGVzLmNvbXBpbGF0aW9uLmRpcmVjdGl2ZXMuYWRkKGRlY2xhcmVkKTtcbiAgICB9XG4gIH0pO1xuXG4gIG1heWJlVW53cmFwRm4oZGVmLmV4cG9ydHMpLmZvckVhY2goPEU+KGV4cG9ydGVkOiBUeXBlPEU+KSA9PiB7XG4gICAgY29uc3QgZXhwb3J0ZWRUeXBlID0gZXhwb3J0ZWQgYXMgVHlwZTxFPiYge1xuICAgICAgLy8gQ29tcG9uZW50cywgRGlyZWN0aXZlcywgTmdNb2R1bGVzLCBhbmQgUGlwZXMgY2FuIGFsbCBiZSBleHBvcnRlZC5cbiAgICAgIMm1Y21wPzogYW55O1xuICAgICAgybVkaXI/OiBhbnk7XG4gICAgICDJtW1vZD86IE5nTW9kdWxlRGVmPEU+O1xuICAgICAgybVwaXBlPzogYW55O1xuICAgIH07XG5cbiAgICAvLyBFaXRoZXIgdGhlIHR5cGUgaXMgYSBtb2R1bGUsIGEgcGlwZSwgb3IgYSBjb21wb25lbnQvZGlyZWN0aXZlICh3aGljaCBtYXkgbm90IGhhdmUgYVxuICAgIC8vIMm1Y21wIGFzIGl0IG1pZ2h0IGJlIGNvbXBpbGVkIGFzeW5jaHJvbm91c2x5KS5cbiAgICBpZiAoaXNOZ01vZHVsZShleHBvcnRlZFR5cGUpKSB7XG4gICAgICAvLyBXaGVuIHRoaXMgbW9kdWxlIGV4cG9ydHMgYW5vdGhlciwgdGhlIGV4cG9ydGVkIG1vZHVsZSdzIGV4cG9ydGVkIGRpcmVjdGl2ZXMgYW5kIHBpcGVzIGFyZVxuICAgICAgLy8gYWRkZWQgdG8gYm90aCB0aGUgY29tcGlsYXRpb24gYW5kIGV4cG9ydGVkIHNjb3BlcyBvZiB0aGlzIG1vZHVsZS5cbiAgICAgIGNvbnN0IGV4cG9ydGVkU2NvcGUgPSB0cmFuc2l0aXZlU2NvcGVzRm9yKGV4cG9ydGVkVHlwZSk7XG4gICAgICBleHBvcnRlZFNjb3BlLmV4cG9ydGVkLmRpcmVjdGl2ZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICAgIHNjb3Blcy5jb21waWxhdGlvbi5kaXJlY3RpdmVzLmFkZChlbnRyeSk7XG4gICAgICAgIHNjb3Blcy5leHBvcnRlZC5kaXJlY3RpdmVzLmFkZChlbnRyeSk7XG4gICAgICB9KTtcbiAgICAgIGV4cG9ydGVkU2NvcGUuZXhwb3J0ZWQucGlwZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICAgIHNjb3Blcy5jb21waWxhdGlvbi5waXBlcy5hZGQoZW50cnkpO1xuICAgICAgICBzY29wZXMuZXhwb3J0ZWQucGlwZXMuYWRkKGVudHJ5KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoZ2V0UGlwZURlZihleHBvcnRlZFR5cGUpKSB7XG4gICAgICBzY29wZXMuZXhwb3J0ZWQucGlwZXMuYWRkKGV4cG9ydGVkVHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNjb3Blcy5leHBvcnRlZC5kaXJlY3RpdmVzLmFkZChleHBvcnRlZFR5cGUpO1xuICAgIH1cbiAgfSk7XG5cbiAgZGVmLnRyYW5zaXRpdmVDb21waWxlU2NvcGVzID0gc2NvcGVzO1xuICByZXR1cm4gc2NvcGVzO1xufVxuXG5mdW5jdGlvbiBleHBhbmRNb2R1bGVXaXRoUHJvdmlkZXJzKHZhbHVlOiBUeXBlPGFueT58TW9kdWxlV2l0aFByb3ZpZGVyczx7fT4pOiBUeXBlPGFueT4ge1xuICBpZiAoaXNNb2R1bGVXaXRoUHJvdmlkZXJzKHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZS5uZ01vZHVsZTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG4iXX0=