/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '../di/injectable';
import { InjectionToken } from '../di/injection_token';
import { ComponentFactory as ComponentFactoryR3 } from '../render3/component_ref';
import { getComponentDef, getNgModuleDef } from '../render3/definition';
import { NgModuleFactory as NgModuleFactoryR3 } from '../render3/ng_module_ref';
import { maybeUnwrapFn } from '../render3/util/misc_utils';
import * as i0 from "../r3_symbols";
/**
 * Combination of NgModuleFactory and ComponentFactories.
 *
 * @publicApi
 *
 * @deprecated
 * Ivy JIT mode doesn't require accessing this symbol.
 * See [JIT API changes due to ViewEngine deprecation](guide/deprecations#jit-api-changes) for
 * additional context.
 */
export class ModuleWithComponentFactories {
    constructor(ngModuleFactory, componentFactories) {
        this.ngModuleFactory = ngModuleFactory;
        this.componentFactories = componentFactories;
    }
}
/**
 * Low-level service for running the angular compiler during runtime
 * to create {@link ComponentFactory}s, which
 * can later be used to create and render a Component instance.
 *
 * Each `@NgModule` provides an own `Compiler` to its injector,
 * that will use the directives/pipes of the ng module for compilation
 * of components.
 *
 * @publicApi
 *
 * @deprecated
 * Ivy JIT mode doesn't require accessing this symbol.
 * See [JIT API changes due to ViewEngine deprecation](guide/deprecations#jit-api-changes) for
 * additional context.
 */
export class Compiler {
    /**
     * Compiles the given NgModule and all of its components. All templates of the components
     * have to be inlined.
     */
    compileModuleSync(moduleType) {
        return new NgModuleFactoryR3(moduleType);
    }
    /**
     * Compiles the given NgModule and all of its components
     */
    compileModuleAsync(moduleType) {
        return Promise.resolve(this.compileModuleSync(moduleType));
    }
    /**
     * Same as {@link #compileModuleSync} but also creates ComponentFactories for all components.
     */
    compileModuleAndAllComponentsSync(moduleType) {
        const ngModuleFactory = this.compileModuleSync(moduleType);
        const moduleDef = getNgModuleDef(moduleType);
        const componentFactories = maybeUnwrapFn(moduleDef.declarations)
            .reduce((factories, declaration) => {
            const componentDef = getComponentDef(declaration);
            componentDef && factories.push(new ComponentFactoryR3(componentDef));
            return factories;
        }, []);
        return new ModuleWithComponentFactories(ngModuleFactory, componentFactories);
    }
    /**
     * Same as {@link #compileModuleAsync} but also creates ComponentFactories for all components.
     */
    compileModuleAndAllComponentsAsync(moduleType) {
        return Promise.resolve(this.compileModuleAndAllComponentsSync(moduleType));
    }
    /**
     * Clears all caches.
     */
    clearCache() { }
    /**
     * Clears the cache for the given component/ngModule.
     */
    clearCacheFor(type) { }
    /**
     * Returns the id for a given NgModule, if one is defined and known to the compiler.
     */
    getModuleId(moduleType) {
        return undefined;
    }
    static { this.ɵfac = function Compiler_Factory(t) { return new (t || Compiler)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Compiler, factory: Compiler.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.setClassMetadata(Compiler, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
/**
 * Token to provide CompilerOptions in the platform injector.
 *
 * @publicApi
 */
export const COMPILER_OPTIONS = new InjectionToken(ngDevMode ? 'compilerOptions' : '');
/**
 * A factory for creating a Compiler
 *
 * @publicApi
 *
 * @deprecated
 * Ivy JIT mode doesn't require accessing this symbol.
 * See [JIT API changes due to ViewEngine deprecation](guide/deprecations#jit-api-changes) for
 * additional context.
 */
export class CompilerFactory {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9saW5rZXIvY29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUtyRCxPQUFPLEVBQUMsZ0JBQWdCLElBQUksa0JBQWtCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRixPQUFPLEVBQUMsZUFBZSxFQUFFLGNBQWMsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3RFLE9BQU8sRUFBQyxlQUFlLElBQUksaUJBQWlCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUM5RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7O0FBS3pEOzs7Ozs7Ozs7R0FTRztBQUNILE1BQU0sT0FBTyw0QkFBNEI7SUFDdkMsWUFDVyxlQUFtQyxFQUNuQyxrQkFBMkM7UUFEM0Msb0JBQWUsR0FBZixlQUFlLENBQW9CO1FBQ25DLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBeUI7SUFBRyxDQUFDO0NBQzNEO0FBRUQ7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBRUgsTUFBTSxPQUFPLFFBQVE7SUFDbkI7OztPQUdHO0lBQ0gsaUJBQWlCLENBQUksVUFBbUI7UUFDdEMsT0FBTyxJQUFJLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRDs7T0FFRztJQUNILGtCQUFrQixDQUFJLFVBQW1CO1FBQ3ZDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxpQ0FBaUMsQ0FBSSxVQUFtQjtRQUN0RCxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0QsTUFBTSxTQUFTLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBRSxDQUFDO1FBQzlDLE1BQU0sa0JBQWtCLEdBQ3BCLGFBQWEsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDO2FBQ2hDLE1BQU0sQ0FBQyxDQUFDLFNBQWtDLEVBQUUsV0FBc0IsRUFBRSxFQUFFO1lBQ3JFLE1BQU0sWUFBWSxHQUFHLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNsRCxZQUFZLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDckUsT0FBTyxTQUFTLENBQUM7UUFDbkIsQ0FBQyxFQUFFLEVBQTZCLENBQUMsQ0FBQztRQUMxQyxPQUFPLElBQUksNEJBQTRCLENBQUMsZUFBZSxFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVEOztPQUVHO0lBQ0gsa0NBQWtDLENBQUksVUFBbUI7UUFFdkQsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFRDs7T0FFRztJQUNILFVBQVUsS0FBVSxDQUFDO0lBRXJCOztPQUVHO0lBQ0gsYUFBYSxDQUFDLElBQWUsSUFBRyxDQUFDO0lBRWpDOztPQUVHO0lBQ0gsV0FBVyxDQUFDLFVBQXFCO1FBQy9CLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7eUVBdkRVLFFBQVE7dUVBQVIsUUFBUSxXQUFSLFFBQVEsbUJBREksTUFBTTs7Z0ZBQ2xCLFFBQVE7Y0FEcEIsVUFBVTtlQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7QUFzRWhDOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FDekIsSUFBSSxjQUFjLENBQW9CLFNBQVMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRTlFOzs7Ozs7Ozs7R0FTRztBQUNILE1BQU0sT0FBZ0IsZUFBZTtDQUVwQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJy4uL2RpL2luamVjdGFibGUnO1xuaW1wb3J0IHtJbmplY3Rpb25Ub2tlbn0gZnJvbSAnLi4vZGkvaW5qZWN0aW9uX3Rva2VuJztcbmltcG9ydCB7U3RhdGljUHJvdmlkZXJ9IGZyb20gJy4uL2RpL2ludGVyZmFjZS9wcm92aWRlcic7XG5pbXBvcnQge01pc3NpbmdUcmFuc2xhdGlvblN0cmF0ZWd5fSBmcm9tICcuLi9pMThuL3Rva2Vucyc7XG5pbXBvcnQge1R5cGV9IGZyb20gJy4uL2ludGVyZmFjZS90eXBlJztcbmltcG9ydCB7Vmlld0VuY2Fwc3VsYXRpb259IGZyb20gJy4uL21ldGFkYXRhL3ZpZXcnO1xuaW1wb3J0IHtDb21wb25lbnRGYWN0b3J5IGFzIENvbXBvbmVudEZhY3RvcnlSM30gZnJvbSAnLi4vcmVuZGVyMy9jb21wb25lbnRfcmVmJztcbmltcG9ydCB7Z2V0Q29tcG9uZW50RGVmLCBnZXROZ01vZHVsZURlZn0gZnJvbSAnLi4vcmVuZGVyMy9kZWZpbml0aW9uJztcbmltcG9ydCB7TmdNb2R1bGVGYWN0b3J5IGFzIE5nTW9kdWxlRmFjdG9yeVIzfSBmcm9tICcuLi9yZW5kZXIzL25nX21vZHVsZV9yZWYnO1xuaW1wb3J0IHttYXliZVVud3JhcEZufSBmcm9tICcuLi9yZW5kZXIzL3V0aWwvbWlzY191dGlscyc7XG5cbmltcG9ydCB7Q29tcG9uZW50RmFjdG9yeX0gZnJvbSAnLi9jb21wb25lbnRfZmFjdG9yeSc7XG5pbXBvcnQge05nTW9kdWxlRmFjdG9yeX0gZnJvbSAnLi9uZ19tb2R1bGVfZmFjdG9yeSc7XG5cbi8qKlxuICogQ29tYmluYXRpb24gb2YgTmdNb2R1bGVGYWN0b3J5IGFuZCBDb21wb25lbnRGYWN0b3JpZXMuXG4gKlxuICogQHB1YmxpY0FwaVxuICpcbiAqIEBkZXByZWNhdGVkXG4gKiBJdnkgSklUIG1vZGUgZG9lc24ndCByZXF1aXJlIGFjY2Vzc2luZyB0aGlzIHN5bWJvbC5cbiAqIFNlZSBbSklUIEFQSSBjaGFuZ2VzIGR1ZSB0byBWaWV3RW5naW5lIGRlcHJlY2F0aW9uXShndWlkZS9kZXByZWNhdGlvbnMjaml0LWFwaS1jaGFuZ2VzKSBmb3JcbiAqIGFkZGl0aW9uYWwgY29udGV4dC5cbiAqL1xuZXhwb3J0IGNsYXNzIE1vZHVsZVdpdGhDb21wb25lbnRGYWN0b3JpZXM8VD4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBuZ01vZHVsZUZhY3Rvcnk6IE5nTW9kdWxlRmFjdG9yeTxUPixcbiAgICAgIHB1YmxpYyBjb21wb25lbnRGYWN0b3JpZXM6IENvbXBvbmVudEZhY3Rvcnk8YW55PltdKSB7fVxufVxuXG4vKipcbiAqIExvdy1sZXZlbCBzZXJ2aWNlIGZvciBydW5uaW5nIHRoZSBhbmd1bGFyIGNvbXBpbGVyIGR1cmluZyBydW50aW1lXG4gKiB0byBjcmVhdGUge0BsaW5rIENvbXBvbmVudEZhY3Rvcnl9cywgd2hpY2hcbiAqIGNhbiBsYXRlciBiZSB1c2VkIHRvIGNyZWF0ZSBhbmQgcmVuZGVyIGEgQ29tcG9uZW50IGluc3RhbmNlLlxuICpcbiAqIEVhY2ggYEBOZ01vZHVsZWAgcHJvdmlkZXMgYW4gb3duIGBDb21waWxlcmAgdG8gaXRzIGluamVjdG9yLFxuICogdGhhdCB3aWxsIHVzZSB0aGUgZGlyZWN0aXZlcy9waXBlcyBvZiB0aGUgbmcgbW9kdWxlIGZvciBjb21waWxhdGlvblxuICogb2YgY29tcG9uZW50cy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKlxuICogQGRlcHJlY2F0ZWRcbiAqIEl2eSBKSVQgbW9kZSBkb2Vzbid0IHJlcXVpcmUgYWNjZXNzaW5nIHRoaXMgc3ltYm9sLlxuICogU2VlIFtKSVQgQVBJIGNoYW5nZXMgZHVlIHRvIFZpZXdFbmdpbmUgZGVwcmVjYXRpb25dKGd1aWRlL2RlcHJlY2F0aW9ucyNqaXQtYXBpLWNoYW5nZXMpIGZvclxuICogYWRkaXRpb25hbCBjb250ZXh0LlxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBDb21waWxlciB7XG4gIC8qKlxuICAgKiBDb21waWxlcyB0aGUgZ2l2ZW4gTmdNb2R1bGUgYW5kIGFsbCBvZiBpdHMgY29tcG9uZW50cy4gQWxsIHRlbXBsYXRlcyBvZiB0aGUgY29tcG9uZW50c1xuICAgKiBoYXZlIHRvIGJlIGlubGluZWQuXG4gICAqL1xuICBjb21waWxlTW9kdWxlU3luYzxUPihtb2R1bGVUeXBlOiBUeXBlPFQ+KTogTmdNb2R1bGVGYWN0b3J5PFQ+IHtcbiAgICByZXR1cm4gbmV3IE5nTW9kdWxlRmFjdG9yeVIzKG1vZHVsZVR5cGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBpbGVzIHRoZSBnaXZlbiBOZ01vZHVsZSBhbmQgYWxsIG9mIGl0cyBjb21wb25lbnRzXG4gICAqL1xuICBjb21waWxlTW9kdWxlQXN5bmM8VD4obW9kdWxlVHlwZTogVHlwZTxUPik6IFByb21pc2U8TmdNb2R1bGVGYWN0b3J5PFQ+PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLmNvbXBpbGVNb2R1bGVTeW5jKG1vZHVsZVR5cGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYW1lIGFzIHtAbGluayAjY29tcGlsZU1vZHVsZVN5bmN9IGJ1dCBhbHNvIGNyZWF0ZXMgQ29tcG9uZW50RmFjdG9yaWVzIGZvciBhbGwgY29tcG9uZW50cy5cbiAgICovXG4gIGNvbXBpbGVNb2R1bGVBbmRBbGxDb21wb25lbnRzU3luYzxUPihtb2R1bGVUeXBlOiBUeXBlPFQ+KTogTW9kdWxlV2l0aENvbXBvbmVudEZhY3RvcmllczxUPiB7XG4gICAgY29uc3QgbmdNb2R1bGVGYWN0b3J5ID0gdGhpcy5jb21waWxlTW9kdWxlU3luYyhtb2R1bGVUeXBlKTtcbiAgICBjb25zdCBtb2R1bGVEZWYgPSBnZXROZ01vZHVsZURlZihtb2R1bGVUeXBlKSE7XG4gICAgY29uc3QgY29tcG9uZW50RmFjdG9yaWVzID1cbiAgICAgICAgbWF5YmVVbndyYXBGbihtb2R1bGVEZWYuZGVjbGFyYXRpb25zKVxuICAgICAgICAgICAgLnJlZHVjZSgoZmFjdG9yaWVzOiBDb21wb25lbnRGYWN0b3J5PGFueT5bXSwgZGVjbGFyYXRpb246IFR5cGU8YW55PikgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnREZWYgPSBnZXRDb21wb25lbnREZWYoZGVjbGFyYXRpb24pO1xuICAgICAgICAgICAgICBjb21wb25lbnREZWYgJiYgZmFjdG9yaWVzLnB1c2gobmV3IENvbXBvbmVudEZhY3RvcnlSMyhjb21wb25lbnREZWYpKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhY3RvcmllcztcbiAgICAgICAgICAgIH0sIFtdIGFzIENvbXBvbmVudEZhY3Rvcnk8YW55PltdKTtcbiAgICByZXR1cm4gbmV3IE1vZHVsZVdpdGhDb21wb25lbnRGYWN0b3JpZXMobmdNb2R1bGVGYWN0b3J5LCBjb21wb25lbnRGYWN0b3JpZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhbWUgYXMge0BsaW5rICNjb21waWxlTW9kdWxlQXN5bmN9IGJ1dCBhbHNvIGNyZWF0ZXMgQ29tcG9uZW50RmFjdG9yaWVzIGZvciBhbGwgY29tcG9uZW50cy5cbiAgICovXG4gIGNvbXBpbGVNb2R1bGVBbmRBbGxDb21wb25lbnRzQXN5bmM8VD4obW9kdWxlVHlwZTogVHlwZTxUPik6XG4gICAgICBQcm9taXNlPE1vZHVsZVdpdGhDb21wb25lbnRGYWN0b3JpZXM8VD4+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuY29tcGlsZU1vZHVsZUFuZEFsbENvbXBvbmVudHNTeW5jKG1vZHVsZVR5cGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgYWxsIGNhY2hlcy5cbiAgICovXG4gIGNsZWFyQ2FjaGUoKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIGNhY2hlIGZvciB0aGUgZ2l2ZW4gY29tcG9uZW50L25nTW9kdWxlLlxuICAgKi9cbiAgY2xlYXJDYWNoZUZvcih0eXBlOiBUeXBlPGFueT4pIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGlkIGZvciBhIGdpdmVuIE5nTW9kdWxlLCBpZiBvbmUgaXMgZGVmaW5lZCBhbmQga25vd24gdG8gdGhlIGNvbXBpbGVyLlxuICAgKi9cbiAgZ2V0TW9kdWxlSWQobW9kdWxlVHlwZTogVHlwZTxhbnk+KTogc3RyaW5nfHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG4vKipcbiAqIE9wdGlvbnMgZm9yIGNyZWF0aW5nIGEgY29tcGlsZXIuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgdHlwZSBDb21waWxlck9wdGlvbnMgPSB7XG4gIGRlZmF1bHRFbmNhcHN1bGF0aW9uPzogVmlld0VuY2Fwc3VsYXRpb24sXG4gIHByb3ZpZGVycz86IFN0YXRpY1Byb3ZpZGVyW10sXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM/OiBib29sZWFuLFxufTtcblxuLyoqXG4gKiBUb2tlbiB0byBwcm92aWRlIENvbXBpbGVyT3B0aW9ucyBpbiB0aGUgcGxhdGZvcm0gaW5qZWN0b3IuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgQ09NUElMRVJfT1BUSU9OUyA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPENvbXBpbGVyT3B0aW9uc1tdPihuZ0Rldk1vZGUgPyAnY29tcGlsZXJPcHRpb25zJyA6ICcnKTtcblxuLyoqXG4gKiBBIGZhY3RvcnkgZm9yIGNyZWF0aW5nIGEgQ29tcGlsZXJcbiAqXG4gKiBAcHVibGljQXBpXG4gKlxuICogQGRlcHJlY2F0ZWRcbiAqIEl2eSBKSVQgbW9kZSBkb2Vzbid0IHJlcXVpcmUgYWNjZXNzaW5nIHRoaXMgc3ltYm9sLlxuICogU2VlIFtKSVQgQVBJIGNoYW5nZXMgZHVlIHRvIFZpZXdFbmdpbmUgZGVwcmVjYXRpb25dKGd1aWRlL2RlcHJlY2F0aW9ucyNqaXQtYXBpLWNoYW5nZXMpIGZvclxuICogYWRkaXRpb25hbCBjb250ZXh0LlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29tcGlsZXJGYWN0b3J5IHtcbiAgYWJzdHJhY3QgY3JlYXRlQ29tcGlsZXIob3B0aW9ucz86IENvbXBpbGVyT3B0aW9uc1tdKTogQ29tcGlsZXI7XG59XG4iXX0=