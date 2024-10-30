/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ApplicationInitStatus } from '../application/application_init';
import { compileNgModuleFactory } from '../application/application_ngmodule_factory_compiler';
import { _callAndReportToErrorHandler, ApplicationRef, optionsReducer, remove } from '../application/application_ref';
import { getNgZoneOptions, internalProvideZoneChangeDetection, PROVIDED_NG_ZONE } from '../change_detection/scheduling/ng_zone_scheduling';
import { Injectable, InjectionToken, Injector } from '../di';
import { ErrorHandler } from '../error_handler';
import { RuntimeError } from '../errors';
import { DEFAULT_LOCALE_ID } from '../i18n/localization';
import { LOCALE_ID } from '../i18n/tokens';
import { setLocaleId } from '../render3';
import { createNgModuleRefWithProviders } from '../render3/ng_module_ref';
import { stringify } from '../util/stringify';
import { getNgZone } from '../zone/ng_zone';
import * as i0 from "../r3_symbols";
import * as i1 from "../di";
/**
 * Internal token that allows to register extra callbacks that should be invoked during the
 * `PlatformRef.destroy` operation. This token is needed to avoid a direct reference to the
 * `PlatformRef` class (i.e. register the callback via `PlatformRef.onDestroy`), thus making the
 * entire class tree-shakeable.
 */
export const PLATFORM_DESTROY_LISTENERS = new InjectionToken(ngDevMode ? 'PlatformDestroyListeners' : '');
/**
 * The Angular platform is the entry point for Angular on a web page.
 * Each page has exactly one platform. Services (such as reflection) which are common
 * to every Angular application running on the page are bound in its scope.
 * A page's platform is initialized implicitly when a platform is created using a platform
 * factory such as `PlatformBrowser`, or explicitly by calling the `createPlatform()` function.
 *
 * @publicApi
 */
export class PlatformRef {
    /** @internal */
    constructor(_injector) {
        this._injector = _injector;
        this._modules = [];
        this._destroyListeners = [];
        this._destroyed = false;
    }
    /**
     * Creates an instance of an `@NgModule` for the given platform.
     *
     * @deprecated Passing NgModule factories as the `PlatformRef.bootstrapModuleFactory` function
     *     argument is deprecated. Use the `PlatformRef.bootstrapModule` API instead.
     */
    bootstrapModuleFactory(moduleFactory, options) {
        // Note: We need to create the NgZone _before_ we instantiate the module,
        // as instantiating the module creates some providers eagerly.
        // So we create a mini parent injector that just contains the new NgZone and
        // pass that as parent to the NgModuleFactory.
        const ngZone = getNgZone(options?.ngZone, getNgZoneOptions({
            eventCoalescing: options?.ngZoneEventCoalescing,
            runCoalescing: options?.ngZoneRunCoalescing
        }));
        // Note: Create ngZoneInjector within ngZone.run so that all of the instantiated services are
        // created within the Angular zone
        // Do not try to replace ngZone.run with ApplicationRef#run because ApplicationRef would then be
        // created outside of the Angular zone.
        return ngZone.run(() => {
            const moduleRef = createNgModuleRefWithProviders(moduleFactory.moduleType, this.injector, internalProvideZoneChangeDetection(() => ngZone));
            if ((typeof ngDevMode === 'undefined' || ngDevMode) &&
                moduleRef.injector.get(PROVIDED_NG_ZONE, null) !== null) {
                throw new RuntimeError(207 /* RuntimeErrorCode.PROVIDER_IN_WRONG_CONTEXT */, '`bootstrapModule` does not support `provideZoneChangeDetection`. Use `BootstrapOptions` instead.');
            }
            const exceptionHandler = moduleRef.injector.get(ErrorHandler, null);
            if ((typeof ngDevMode === 'undefined' || ngDevMode) && exceptionHandler === null) {
                throw new RuntimeError(402 /* RuntimeErrorCode.MISSING_REQUIRED_INJECTABLE_IN_BOOTSTRAP */, 'No ErrorHandler. Is platform module (BrowserModule) included?');
            }
            ngZone.runOutsideAngular(() => {
                const subscription = ngZone.onError.subscribe({
                    next: (error) => {
                        exceptionHandler.handleError(error);
                    }
                });
                moduleRef.onDestroy(() => {
                    remove(this._modules, moduleRef);
                    subscription.unsubscribe();
                });
            });
            return _callAndReportToErrorHandler(exceptionHandler, ngZone, () => {
                const initStatus = moduleRef.injector.get(ApplicationInitStatus);
                initStatus.runInitializers();
                return initStatus.donePromise.then(() => {
                    // If the `LOCALE_ID` provider is defined at bootstrap then we set the value for ivy
                    const localeId = moduleRef.injector.get(LOCALE_ID, DEFAULT_LOCALE_ID);
                    setLocaleId(localeId || DEFAULT_LOCALE_ID);
                    this._moduleDoBootstrap(moduleRef);
                    return moduleRef;
                });
            });
        });
    }
    /**
     * Creates an instance of an `@NgModule` for a given platform.
     *
     * @usageNotes
     * ### Simple Example
     *
     * ```typescript
     * @NgModule({
     *   imports: [BrowserModule]
     * })
     * class MyModule {}
     *
     * let moduleRef = platformBrowser().bootstrapModule(MyModule);
     * ```
     *
     */
    bootstrapModule(moduleType, compilerOptions = []) {
        const options = optionsReducer({}, compilerOptions);
        return compileNgModuleFactory(this.injector, options, moduleType)
            .then(moduleFactory => this.bootstrapModuleFactory(moduleFactory, options));
    }
    _moduleDoBootstrap(moduleRef) {
        const appRef = moduleRef.injector.get(ApplicationRef);
        if (moduleRef._bootstrapComponents.length > 0) {
            moduleRef._bootstrapComponents.forEach(f => appRef.bootstrap(f));
        }
        else if (moduleRef.instance.ngDoBootstrap) {
            moduleRef.instance.ngDoBootstrap(appRef);
        }
        else {
            throw new RuntimeError(-403 /* RuntimeErrorCode.BOOTSTRAP_COMPONENTS_NOT_FOUND */, ngDevMode &&
                `The module ${stringify(moduleRef.instance.constructor)} was bootstrapped, ` +
                    `but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. ` +
                    `Please define one of these.`);
        }
        this._modules.push(moduleRef);
    }
    /**
     * Registers a listener to be called when the platform is destroyed.
     */
    onDestroy(callback) {
        this._destroyListeners.push(callback);
    }
    /**
     * Retrieves the platform {@link Injector}, which is the parent injector for
     * every Angular application on the page and provides singleton providers.
     */
    get injector() {
        return this._injector;
    }
    /**
     * Destroys the current Angular platform and all Angular applications on the page.
     * Destroys all modules and listeners registered with the platform.
     */
    destroy() {
        if (this._destroyed) {
            throw new RuntimeError(404 /* RuntimeErrorCode.PLATFORM_ALREADY_DESTROYED */, ngDevMode && 'The platform has already been destroyed!');
        }
        this._modules.slice().forEach(module => module.destroy());
        this._destroyListeners.forEach(listener => listener());
        const destroyListeners = this._injector.get(PLATFORM_DESTROY_LISTENERS, null);
        if (destroyListeners) {
            destroyListeners.forEach(listener => listener());
            destroyListeners.clear();
        }
        this._destroyed = true;
    }
    /**
     * Indicates whether this instance was destroyed.
     */
    get destroyed() {
        return this._destroyed;
    }
    static { this.ɵfac = function PlatformRef_Factory(t) { return new (t || PlatformRef)(i0.ɵɵinject(i1.Injector)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: PlatformRef, factory: PlatformRef.ɵfac, providedIn: 'platform' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.setClassMetadata(PlatformRef, [{
        type: Injectable,
        args: [{ providedIn: 'platform' }]
    }], () => [{ type: i1.Injector }], null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fcmVmLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcGxhdGZvcm0vcGxhdGZvcm1fcmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLHNEQUFzRCxDQUFDO0FBQzVGLE9BQU8sRUFBQyw0QkFBNEIsRUFBRSxjQUFjLEVBQW9CLGNBQWMsRUFBRSxNQUFNLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN0SSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsa0NBQWtDLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxtREFBbUQsQ0FBQztBQUN6SSxPQUFPLEVBQUMsVUFBVSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUMsTUFBTSxPQUFPLENBQUM7QUFDM0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxZQUFZLEVBQW1CLE1BQU0sV0FBVyxDQUFDO0FBQ3pELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUl6QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyw4QkFBOEIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUM1QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0saUJBQWlCLENBQUM7OztBQUcxQzs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxNQUFNLDBCQUEwQixHQUNuQyxJQUFJLGNBQWMsQ0FBb0IsU0FBUyxDQUFDLENBQUMsQ0FBQywwQkFB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QVgsV0FBVyxXQUFYLFdBQVcsbUJBREMsVUFBVTs7Z0ZBQ3RCLFdBQVc7Y0FEdkIsVUFBVTtlQUFDLEVBQUMsVUFBVSxFQUFFLFVBQVUsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0FwcGxpY2F0aW9uSW5pdFN0YXR1c30gZnJvbSAnLi4vYXBwbGljYXRpb24vYXBwbGljYXRpb25faW5pdCc7XG5pbXBvcnQge2NvbXBpbGVOZ01vZHVsZUZhY3Rvcnl9IGZyb20gJy4uL2FwcGxpY2F0aW9uL2FwcGxpY2F0aW9uX25nbW9kdWxlX2ZhY3RvcnlfY29tcGlsZXInO1xuaW1wb3J0IHtfY2FsbEFuZFJlcG9ydFRvRXJyb3JIYW5kbGVyLCBBcHBsaWNhdGlvblJlZiwgQm9vdHN0cmFwT3B0aW9ucywgb3B0aW9uc1JlZHVjZXIsIHJlbW92ZX0gZnJvbSAnLi4vYXBwbGljYXRpb24vYXBwbGljYXRpb25fcmVmJztcbmltcG9ydCB7Z2V0Tmdab25lT3B0aW9ucywgaW50ZXJuYWxQcm92aWRlWm9uZUNoYW5nZURldGVjdGlvbiwgUFJPVklERURfTkdfWk9ORX0gZnJvbSAnLi4vY2hhbmdlX2RldGVjdGlvbi9zY2hlZHVsaW5nL25nX3pvbmVfc2NoZWR1bGluZyc7XG5pbXBvcnQge0luamVjdGFibGUsIEluamVjdGlvblRva2VuLCBJbmplY3Rvcn0gZnJvbSAnLi4vZGknO1xuaW1wb3J0IHtFcnJvckhhbmRsZXJ9IGZyb20gJy4uL2Vycm9yX2hhbmRsZXInO1xuaW1wb3J0IHtSdW50aW1lRXJyb3IsIFJ1bnRpbWVFcnJvckNvZGV9IGZyb20gJy4uL2Vycm9ycyc7XG5pbXBvcnQge0RFRkFVTFRfTE9DQUxFX0lEfSBmcm9tICcuLi9pMThuL2xvY2FsaXphdGlvbic7XG5pbXBvcnQge0xPQ0FMRV9JRH0gZnJvbSAnLi4vaTE4bi90b2tlbnMnO1xuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi9pbnRlcmZhY2UvdHlwZSc7XG5pbXBvcnQge0NvbXBpbGVyT3B0aW9uc30gZnJvbSAnLi4vbGlua2VyJztcbmltcG9ydCB7SW50ZXJuYWxOZ01vZHVsZVJlZiwgTmdNb2R1bGVGYWN0b3J5LCBOZ01vZHVsZVJlZn0gZnJvbSAnLi4vbGlua2VyL25nX21vZHVsZV9mYWN0b3J5JztcbmltcG9ydCB7c2V0TG9jYWxlSWR9IGZyb20gJy4uL3JlbmRlcjMnO1xuaW1wb3J0IHtjcmVhdGVOZ01vZHVsZVJlZldpdGhQcm92aWRlcnN9IGZyb20gJy4uL3JlbmRlcjMvbmdfbW9kdWxlX3JlZic7XG5pbXBvcnQge3N0cmluZ2lmeX0gZnJvbSAnLi4vdXRpbC9zdHJpbmdpZnknO1xuaW1wb3J0IHtnZXROZ1pvbmV9IGZyb20gJy4uL3pvbmUvbmdfem9uZSc7XG5cblxuLyoqXG4gKiBJbnRlcm5hbCB0b2tlbiB0aGF0IGFsbG93cyB0byByZWdpc3RlciBleHRyYSBjYWxsYmFja3MgdGhhdCBzaG91bGQgYmUgaW52b2tlZCBkdXJpbmcgdGhlXG4gKiBgUGxhdGZvcm1SZWYuZGVzdHJveWAgb3BlcmF0aW9uLiBUaGlzIHRva2VuIGlzIG5lZWRlZCB0byBhdm9pZCBhIGRpcmVjdCByZWZlcmVuY2UgdG8gdGhlXG4gKiBgUGxhdGZvcm1SZWZgIGNsYXNzIChpLmUuIHJlZ2lzdGVyIHRoZSBjYWxsYmFjayB2aWEgYFBsYXRmb3JtUmVmLm9uRGVzdHJveWApLCB0aHVzIG1ha2luZyB0aGVcbiAqIGVudGlyZSBjbGFzcyB0cmVlLXNoYWtlYWJsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IFBMQVRGT1JNX0RFU1RST1lfTElTVEVORVJTID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48U2V0PFZvaWRGdW5jdGlvbj4+KG5nRGV2TW9kZSA/ICdQbGF0Zm9ybURlc3Ryb3lMaXN0ZW5lcnMnIDogJycpO1xuXG4vKipcbiAqIFRoZSBBbmd1bGFyIHBsYXRmb3JtIGlzIHRoZSBlbnRyeSBwb2ludCBmb3IgQW5ndWxhciBvbiBhIHdlYiBwYWdlLlxuICogRWFjaCBwYWdlIGhhcyBleGFjdGx5IG9uZSBwbGF0Zm9ybS4gU2VydmljZXMgKHN1Y2ggYXMgcmVmbGVjdGlvbikgd2hpY2ggYXJlIGNvbW1vblxuICogdG8gZXZlcnkgQW5ndWxhciBhcHBsaWNhdGlvbiBydW5uaW5nIG9uIHRoZSBwYWdlIGFyZSBib3VuZCBpbiBpdHMgc2NvcGUuXG4gKiBBIHBhZ2UncyBwbGF0Zm9ybSBpcyBpbml0aWFsaXplZCBpbXBsaWNpdGx5IHdoZW4gYSBwbGF0Zm9ybSBpcyBjcmVhdGVkIHVzaW5nIGEgcGxhdGZvcm1cbiAqIGZhY3Rvcnkgc3VjaCBhcyBgUGxhdGZvcm1Ccm93c2VyYCwgb3IgZXhwbGljaXRseSBieSBjYWxsaW5nIHRoZSBgY3JlYXRlUGxhdGZvcm0oKWAgZnVuY3Rpb24uXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3BsYXRmb3JtJ30pXG5leHBvcnQgY2xhc3MgUGxhdGZvcm1SZWYge1xuICBwcml2YXRlIF9tb2R1bGVzOiBOZ01vZHVsZVJlZjxhbnk+W10gPSBbXTtcbiAgcHJpdmF0ZSBfZGVzdHJveUxpc3RlbmVyczogQXJyYXk8KCkgPT4gdm9pZD4gPSBbXTtcbiAgcHJpdmF0ZSBfZGVzdHJveWVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9pbmplY3RvcjogSW5qZWN0b3IpIHt9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgYW4gYEBOZ01vZHVsZWAgZm9yIHRoZSBnaXZlbiBwbGF0Zm9ybS5cbiAgICpcbiAgICogQGRlcHJlY2F0ZWQgUGFzc2luZyBOZ01vZHVsZSBmYWN0b3JpZXMgYXMgdGhlIGBQbGF0Zm9ybVJlZi5ib290c3RyYXBNb2R1bGVGYWN0b3J5YCBmdW5jdGlvblxuICAgKiAgICAgYXJndW1lbnQgaXMgZGVwcmVjYXRlZC4gVXNlIHRoZSBgUGxhdGZvcm1SZWYuYm9vdHN0cmFwTW9kdWxlYCBBUEkgaW5zdGVhZC5cbiAgICovXG4gIGJvb3RzdHJhcE1vZHVsZUZhY3Rvcnk8TT4obW9kdWxlRmFjdG9yeTogTmdNb2R1bGVGYWN0b3J5PE0+LCBvcHRpb25zPzogQm9vdHN0cmFwT3B0aW9ucyk6XG4gICAgICBQcm9taXNlPE5nTW9kdWxlUmVmPE0+PiB7XG4gICAgLy8gTm90ZTogV2UgbmVlZCB0byBjcmVhdGUgdGhlIE5nWm9uZSBfYmVmb3JlXyB3ZSBpbnN0YW50aWF0ZSB0aGUgbW9kdWxlLFxuICAgIC8vIGFzIGluc3RhbnRpYXRpbmcgdGhlIG1vZHVsZSBjcmVhdGVzIHNvbWUgcHJvdmlkZXJzIGVhZ2VybHkuXG4gICAgLy8gU28gd2UgY3JlYXRlIGEgbWluaSBwYXJlbnQgaW5qZWN0b3IgdGhhdCBqdXN0IGNvbnRhaW5zIHRoZSBuZXcgTmdab25lIGFuZFxuICAgIC8vIHBhc3MgdGhhdCBhcyBwYXJlbnQgdG8gdGhlIE5nTW9kdWxlRmFjdG9yeS5cbiAgICBjb25zdCBuZ1pvbmUgPSBnZXROZ1pvbmUob3B0aW9ucz8ubmdab25lLCBnZXROZ1pvbmVPcHRpb25zKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudENvYWxlc2Npbmc6IG9wdGlvbnM/Lm5nWm9uZUV2ZW50Q29hbGVzY2luZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW5Db2FsZXNjaW5nOiBvcHRpb25zPy5uZ1pvbmVSdW5Db2FsZXNjaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAvLyBOb3RlOiBDcmVhdGUgbmdab25lSW5qZWN0b3Igd2l0aGluIG5nWm9uZS5ydW4gc28gdGhhdCBhbGwgb2YgdGhlIGluc3RhbnRpYXRlZCBzZXJ2aWNlcyBhcmVcbiAgICAvLyBjcmVhdGVkIHdpdGhpbiB0aGUgQW5ndWxhciB6b25lXG4gICAgLy8gRG8gbm90IHRyeSB0byByZXBsYWNlIG5nWm9uZS5ydW4gd2l0aCBBcHBsaWNhdGlvblJlZiNydW4gYmVjYXVzZSBBcHBsaWNhdGlvblJlZiB3b3VsZCB0aGVuIGJlXG4gICAgLy8gY3JlYXRlZCBvdXRzaWRlIG9mIHRoZSBBbmd1bGFyIHpvbmUuXG4gICAgcmV0dXJuIG5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgY29uc3QgbW9kdWxlUmVmID0gY3JlYXRlTmdNb2R1bGVSZWZXaXRoUHJvdmlkZXJzKFxuICAgICAgICAgIG1vZHVsZUZhY3RvcnkubW9kdWxlVHlwZSwgdGhpcy5pbmplY3RvcixcbiAgICAgICAgICBpbnRlcm5hbFByb3ZpZGVab25lQ2hhbmdlRGV0ZWN0aW9uKCgpID0+IG5nWm9uZSkpO1xuXG4gICAgICBpZiAoKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkgJiZcbiAgICAgICAgICBtb2R1bGVSZWYuaW5qZWN0b3IuZ2V0KFBST1ZJREVEX05HX1pPTkUsIG51bGwpICE9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBSdW50aW1lRXJyb3IoXG4gICAgICAgICAgICBSdW50aW1lRXJyb3JDb2RlLlBST1ZJREVSX0lOX1dST05HX0NPTlRFWFQsXG4gICAgICAgICAgICAnYGJvb3RzdHJhcE1vZHVsZWAgZG9lcyBub3Qgc3VwcG9ydCBgcHJvdmlkZVpvbmVDaGFuZ2VEZXRlY3Rpb25gLiBVc2UgYEJvb3RzdHJhcE9wdGlvbnNgIGluc3RlYWQuJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGV4Y2VwdGlvbkhhbmRsZXIgPSBtb2R1bGVSZWYuaW5qZWN0b3IuZ2V0KEVycm9ySGFuZGxlciwgbnVsbCk7XG4gICAgICBpZiAoKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkgJiYgZXhjZXB0aW9uSGFuZGxlciA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgUnVudGltZUVycm9yKFxuICAgICAgICAgICAgUnVudGltZUVycm9yQ29kZS5NSVNTSU5HX1JFUVVJUkVEX0lOSkVDVEFCTEVfSU5fQk9PVFNUUkFQLFxuICAgICAgICAgICAgJ05vIEVycm9ySGFuZGxlci4gSXMgcGxhdGZvcm0gbW9kdWxlIChCcm93c2VyTW9kdWxlKSBpbmNsdWRlZD8nKTtcbiAgICAgIH1cbiAgICAgIG5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IG5nWm9uZS5vbkVycm9yLnN1YnNjcmliZSh7XG4gICAgICAgICAgbmV4dDogKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGV4Y2VwdGlvbkhhbmRsZXIhLmhhbmRsZUVycm9yKGVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBtb2R1bGVSZWYub25EZXN0cm95KCgpID0+IHtcbiAgICAgICAgICByZW1vdmUodGhpcy5fbW9kdWxlcywgbW9kdWxlUmVmKTtcbiAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBfY2FsbEFuZFJlcG9ydFRvRXJyb3JIYW5kbGVyKGV4Y2VwdGlvbkhhbmRsZXIhLCBuZ1pvbmUsICgpID0+IHtcbiAgICAgICAgY29uc3QgaW5pdFN0YXR1czogQXBwbGljYXRpb25Jbml0U3RhdHVzID0gbW9kdWxlUmVmLmluamVjdG9yLmdldChBcHBsaWNhdGlvbkluaXRTdGF0dXMpO1xuICAgICAgICBpbml0U3RhdHVzLnJ1bkluaXRpYWxpemVycygpO1xuICAgICAgICByZXR1cm4gaW5pdFN0YXR1cy5kb25lUHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAvLyBJZiB0aGUgYExPQ0FMRV9JRGAgcHJvdmlkZXIgaXMgZGVmaW5lZCBhdCBib290c3RyYXAgdGhlbiB3ZSBzZXQgdGhlIHZhbHVlIGZvciBpdnlcbiAgICAgICAgICBjb25zdCBsb2NhbGVJZCA9IG1vZHVsZVJlZi5pbmplY3Rvci5nZXQoTE9DQUxFX0lELCBERUZBVUxUX0xPQ0FMRV9JRCk7XG4gICAgICAgICAgc2V0TG9jYWxlSWQobG9jYWxlSWQgfHwgREVGQVVMVF9MT0NBTEVfSUQpO1xuICAgICAgICAgIHRoaXMuX21vZHVsZURvQm9vdHN0cmFwKG1vZHVsZVJlZik7XG4gICAgICAgICAgcmV0dXJuIG1vZHVsZVJlZjtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIGFuIGBATmdNb2R1bGVgIGZvciBhIGdpdmVuIHBsYXRmb3JtLlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKiAjIyMgU2ltcGxlIEV4YW1wbGVcbiAgICpcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBATmdNb2R1bGUoe1xuICAgKiAgIGltcG9ydHM6IFtCcm93c2VyTW9kdWxlXVxuICAgKiB9KVxuICAgKiBjbGFzcyBNeU1vZHVsZSB7fVxuICAgKlxuICAgKiBsZXQgbW9kdWxlUmVmID0gcGxhdGZvcm1Ccm93c2VyKCkuYm9vdHN0cmFwTW9kdWxlKE15TW9kdWxlKTtcbiAgICogYGBgXG4gICAqXG4gICAqL1xuICBib290c3RyYXBNb2R1bGU8TT4oXG4gICAgICBtb2R1bGVUeXBlOiBUeXBlPE0+LFxuICAgICAgY29tcGlsZXJPcHRpb25zOiAoQ29tcGlsZXJPcHRpb25zJkJvb3RzdHJhcE9wdGlvbnMpfFxuICAgICAgQXJyYXk8Q29tcGlsZXJPcHRpb25zJkJvb3RzdHJhcE9wdGlvbnM+ID0gW10pOiBQcm9taXNlPE5nTW9kdWxlUmVmPE0+PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IG9wdGlvbnNSZWR1Y2VyKHt9LCBjb21waWxlck9wdGlvbnMpO1xuICAgIHJldHVybiBjb21waWxlTmdNb2R1bGVGYWN0b3J5KHRoaXMuaW5qZWN0b3IsIG9wdGlvbnMsIG1vZHVsZVR5cGUpXG4gICAgICAgIC50aGVuKG1vZHVsZUZhY3RvcnkgPT4gdGhpcy5ib290c3RyYXBNb2R1bGVGYWN0b3J5KG1vZHVsZUZhY3RvcnksIG9wdGlvbnMpKTtcbiAgfVxuXG4gIHByaXZhdGUgX21vZHVsZURvQm9vdHN0cmFwKG1vZHVsZVJlZjogSW50ZXJuYWxOZ01vZHVsZVJlZjxhbnk+KTogdm9pZCB7XG4gICAgY29uc3QgYXBwUmVmID0gbW9kdWxlUmVmLmluamVjdG9yLmdldChBcHBsaWNhdGlvblJlZik7XG4gICAgaWYgKG1vZHVsZVJlZi5fYm9vdHN0cmFwQ29tcG9uZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICBtb2R1bGVSZWYuX2Jvb3RzdHJhcENvbXBvbmVudHMuZm9yRWFjaChmID0+IGFwcFJlZi5ib290c3RyYXAoZikpO1xuICAgIH0gZWxzZSBpZiAobW9kdWxlUmVmLmluc3RhbmNlLm5nRG9Cb290c3RyYXApIHtcbiAgICAgIG1vZHVsZVJlZi5pbnN0YW5jZS5uZ0RvQm9vdHN0cmFwKGFwcFJlZik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBSdW50aW1lRXJyb3IoXG4gICAgICAgICAgUnVudGltZUVycm9yQ29kZS5CT09UU1RSQVBfQ09NUE9ORU5UU19OT1RfRk9VTkQsXG4gICAgICAgICAgbmdEZXZNb2RlICYmXG4gICAgICAgICAgICAgIGBUaGUgbW9kdWxlICR7c3RyaW5naWZ5KG1vZHVsZVJlZi5pbnN0YW5jZS5jb25zdHJ1Y3Rvcil9IHdhcyBib290c3RyYXBwZWQsIGAgK1xuICAgICAgICAgICAgICAgICAgYGJ1dCBpdCBkb2VzIG5vdCBkZWNsYXJlIFwiQE5nTW9kdWxlLmJvb3RzdHJhcFwiIGNvbXBvbmVudHMgbm9yIGEgXCJuZ0RvQm9vdHN0cmFwXCIgbWV0aG9kLiBgICtcbiAgICAgICAgICAgICAgICAgIGBQbGVhc2UgZGVmaW5lIG9uZSBvZiB0aGVzZS5gKTtcbiAgICB9XG4gICAgdGhpcy5fbW9kdWxlcy5wdXNoKG1vZHVsZVJlZik7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgbGlzdGVuZXIgdG8gYmUgY2FsbGVkIHdoZW4gdGhlIHBsYXRmb3JtIGlzIGRlc3Ryb3llZC5cbiAgICovXG4gIG9uRGVzdHJveShjYWxsYmFjazogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuX2Rlc3Ryb3lMaXN0ZW5lcnMucHVzaChjYWxsYmFjayk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBwbGF0Zm9ybSB7QGxpbmsgSW5qZWN0b3J9LCB3aGljaCBpcyB0aGUgcGFyZW50IGluamVjdG9yIGZvclxuICAgKiBldmVyeSBBbmd1bGFyIGFwcGxpY2F0aW9uIG9uIHRoZSBwYWdlIGFuZCBwcm92aWRlcyBzaW5nbGV0b24gcHJvdmlkZXJzLlxuICAgKi9cbiAgZ2V0IGluamVjdG9yKCk6IEluamVjdG9yIHtcbiAgICByZXR1cm4gdGhpcy5faW5qZWN0b3I7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgdGhlIGN1cnJlbnQgQW5ndWxhciBwbGF0Zm9ybSBhbmQgYWxsIEFuZ3VsYXIgYXBwbGljYXRpb25zIG9uIHRoZSBwYWdlLlxuICAgKiBEZXN0cm95cyBhbGwgbW9kdWxlcyBhbmQgbGlzdGVuZXJzIHJlZ2lzdGVyZWQgd2l0aCB0aGUgcGxhdGZvcm0uXG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl9kZXN0cm95ZWQpIHtcbiAgICAgIHRocm93IG5ldyBSdW50aW1lRXJyb3IoXG4gICAgICAgICAgUnVudGltZUVycm9yQ29kZS5QTEFURk9STV9BTFJFQURZX0RFU1RST1lFRCxcbiAgICAgICAgICBuZ0Rldk1vZGUgJiYgJ1RoZSBwbGF0Zm9ybSBoYXMgYWxyZWFkeSBiZWVuIGRlc3Ryb3llZCEnKTtcbiAgICB9XG4gICAgdGhpcy5fbW9kdWxlcy5zbGljZSgpLmZvckVhY2gobW9kdWxlID0+IG1vZHVsZS5kZXN0cm95KCkpO1xuICAgIHRoaXMuX2Rlc3Ryb3lMaXN0ZW5lcnMuZm9yRWFjaChsaXN0ZW5lciA9PiBsaXN0ZW5lcigpKTtcblxuICAgIGNvbnN0IGRlc3Ryb3lMaXN0ZW5lcnMgPSB0aGlzLl9pbmplY3Rvci5nZXQoUExBVEZPUk1fREVTVFJPWV9MSVNURU5FUlMsIG51bGwpO1xuICAgIGlmIChkZXN0cm95TGlzdGVuZXJzKSB7XG4gICAgICBkZXN0cm95TGlzdGVuZXJzLmZvckVhY2gobGlzdGVuZXIgPT4gbGlzdGVuZXIoKSk7XG4gICAgICBkZXN0cm95TGlzdGVuZXJzLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fZGVzdHJveWVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGlzIGluc3RhbmNlIHdhcyBkZXN0cm95ZWQuXG4gICAqL1xuICBnZXQgZGVzdHJveWVkKCkge1xuICAgIHJldHVybiB0aGlzLl9kZXN0cm95ZWQ7XG4gIH1cbn1cbiJdfQ==