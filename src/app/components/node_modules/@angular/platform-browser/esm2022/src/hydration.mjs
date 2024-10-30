/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵwithHttpTransferCache } from '@angular/common/http';
import { ENVIRONMENT_INITIALIZER, inject, makeEnvironmentProviders, NgZone, ɵConsole as Console, ɵformatRuntimeError as formatRuntimeError, ɵwithDomHydration as withDomHydration, } from '@angular/core';
/**
 * The list of features as an enum to uniquely type each `HydrationFeature`.
 * @see {@link HydrationFeature}
 *
 * @publicApi
 */
export var HydrationFeatureKind;
(function (HydrationFeatureKind) {
    HydrationFeatureKind[HydrationFeatureKind["NoHttpTransferCache"] = 0] = "NoHttpTransferCache";
    HydrationFeatureKind[HydrationFeatureKind["HttpTransferCacheOptions"] = 1] = "HttpTransferCacheOptions";
})(HydrationFeatureKind || (HydrationFeatureKind = {}));
/**
 * Helper function to create an object that represents a Hydration feature.
 */
function hydrationFeature(ɵkind, ɵproviders = [], ɵoptions = {}) {
    return { ɵkind, ɵproviders };
}
/**
 * Disables HTTP transfer cache. Effectively causes HTTP requests to be performed twice: once on the
 * server and other one on the browser.
 *
 * @publicApi
 */
export function withNoHttpTransferCache() {
    // This feature has no providers and acts as a flag that turns off
    // HTTP transfer cache (which otherwise is turned on by default).
    return hydrationFeature(HydrationFeatureKind.NoHttpTransferCache);
}
/**
 * The function accepts a an object, which allows to configure cache parameters,
 * such as which headers should be included (no headers are included by default),
 * wether POST requests should be cached or a callback function to determine if a
 * particular request should be cached.
 *
 * @publicApi
 */
export function withHttpTransferCacheOptions(options) {
    // This feature has no providers and acts as a flag to pass options to the HTTP transfer cache.
    return hydrationFeature(HydrationFeatureKind.HttpTransferCacheOptions, ɵwithHttpTransferCache(options));
}
/**
 * Returns an `ENVIRONMENT_INITIALIZER` token setup with a function
 * that verifies whether compatible ZoneJS was used in an application
 * and logs a warning in a console if it's not the case.
 */
function provideZoneJsCompatibilityDetector() {
    return [{
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => {
                const ngZone = inject(NgZone);
                // Checking `ngZone instanceof NgZone` would be insufficient here,
                // because custom implementations might use NgZone as a base class.
                if (ngZone.constructor !== NgZone) {
                    const console = inject(Console);
                    const message = formatRuntimeError(-5000 /* RuntimeErrorCode.UNSUPPORTED_ZONEJS_INSTANCE */, 'Angular detected that hydration was enabled for an application ' +
                        'that uses a custom or a noop Zone.js implementation. ' +
                        'This is not yet a fully supported configuration.');
                    // tslint:disable-next-line:no-console
                    console.warn(message);
                }
            },
            multi: true,
        }];
}
/**
 * Sets up providers necessary to enable hydration functionality for the application.
 *
 * By default, the function enables the recommended set of features for the optimal
 * performance for most of the applications. It includes the following features:
 *
 * * Reconciling DOM hydration. Learn more about it [here](guide/hydration).
 * * [`HttpClient`](api/common/http/HttpClient) response caching while running on the server and
 * transferring this cache to the client to avoid extra HTTP requests. Learn more about data caching
 * [here](/guide/ssr#caching-data-when-using-httpclient).
 *
 * These functions allow you to disable some of the default features or configure features
 * * {@link withNoHttpTransferCache} to disable HTTP transfer cache
 * * {@link withHttpTransferCacheOptions} to configure some HTTP transfer cache options
 *
 * @usageNotes
 *
 * Basic example of how you can enable hydration in your application when
 * `bootstrapApplication` function is used:
 * ```
 * bootstrapApplication(AppComponent, {
 *   providers: [provideClientHydration()]
 * });
 * ```
 *
 * Alternatively if you are using NgModules, you would add `provideClientHydration`
 * to your root app module's provider list.
 * ```
 * @NgModule({
 *   declarations: [RootCmp],
 *   bootstrap: [RootCmp],
 *   providers: [provideClientHydration()],
 * })
 * export class AppModule {}
 * ```
 *
 * @see {@link withNoHttpTransferCache}
 * @see {@link withHttpTransferCacheOptions}
 *
 * @param features Optional features to configure additional router behaviors.
 * @returns A set of providers to enable hydration.
 *
 * @publicApi
 */
export function provideClientHydration(...features) {
    const providers = [];
    const featuresKind = new Set();
    const hasHttpTransferCacheOptions = featuresKind.has(HydrationFeatureKind.HttpTransferCacheOptions);
    for (const { ɵproviders, ɵkind } of features) {
        featuresKind.add(ɵkind);
        if (ɵproviders.length) {
            providers.push(ɵproviders);
        }
    }
    if (typeof ngDevMode !== 'undefined' && ngDevMode &&
        featuresKind.has(HydrationFeatureKind.NoHttpTransferCache) && hasHttpTransferCacheOptions) {
        // TODO: Make this a runtime error
        throw new Error('Configuration error: found both withHttpTransferCacheOptions() and withNoHttpTransferCache() in the same call to provideClientHydration(), which is a contradiction.');
    }
    return makeEnvironmentProviders([
        (typeof ngDevMode !== 'undefined' && ngDevMode) ? provideZoneJsCompatibilityDetector() : [],
        withDomHydration(),
        ((featuresKind.has(HydrationFeatureKind.NoHttpTransferCache) || hasHttpTransferCacheOptions) ?
            [] :
            ɵwithHttpTransferCache({})),
        providers,
    ]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHlkcmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvaHlkcmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBMkIsc0JBQXNCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RixPQUFPLEVBQUMsdUJBQXVCLEVBQXdCLE1BQU0sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLEVBQVksUUFBUSxJQUFJLE9BQU8sRUFBRSxtQkFBbUIsSUFBSSxrQkFBa0IsRUFBRSxpQkFBaUIsSUFBSSxnQkFBZ0IsR0FBRSxNQUFNLGVBQWUsQ0FBQztBQUl4Tzs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBTixJQUFZLG9CQUdYO0FBSEQsV0FBWSxvQkFBb0I7SUFDOUIsNkZBQW1CLENBQUE7SUFDbkIsdUdBQXdCLENBQUE7QUFDMUIsQ0FBQyxFQUhXLG9CQUFvQixLQUFwQixvQkFBb0IsUUFHL0I7QUFZRDs7R0FFRztBQUNILFNBQVMsZ0JBQWdCLENBQ3JCLEtBQWtCLEVBQUUsYUFBeUIsRUFBRSxFQUMvQyxXQUFvQixFQUFFO0lBQ3hCLE9BQU8sRUFBQyxLQUFLLEVBQUUsVUFBVSxFQUFDLENBQUM7QUFDN0IsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLHVCQUF1QjtJQUVyQyxrRUFBa0U7SUFDbEUsaUVBQWlFO0lBQ2pFLE9BQU8sZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNwRSxDQUFDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILE1BQU0sVUFBVSw0QkFBNEIsQ0FDeEMsT0FBaUM7SUFFbkMsK0ZBQStGO0lBQy9GLE9BQU8sZ0JBQWdCLENBQ25CLG9CQUFvQixDQUFDLHdCQUF3QixFQUFFLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDdEYsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFTLGtDQUFrQztJQUN6QyxPQUFPLENBQUM7WUFDTixPQUFPLEVBQUUsdUJBQXVCO1lBQ2hDLFFBQVEsRUFBRSxHQUFHLEVBQUU7Z0JBQ2IsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM5QixrRUFBa0U7Z0JBQ2xFLG1FQUFtRTtnQkFDbkUsSUFBSSxNQUFNLENBQUMsV0FBVyxLQUFLLE1BQU0sRUFBRSxDQUFDO29CQUNsQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ2hDLE1BQU0sT0FBTyxHQUFHLGtCQUFrQiwyREFFOUIsaUVBQWlFO3dCQUM3RCx1REFBdUQ7d0JBQ3ZELGtEQUFrRCxDQUFDLENBQUM7b0JBQzVELHNDQUFzQztvQkFDdEMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDeEIsQ0FBQztZQUNILENBQUM7WUFDRCxLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJDRztBQUNILE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxHQUFHLFFBQWtEO0lBRTFGLE1BQU0sU0FBUyxHQUFlLEVBQUUsQ0FBQztJQUNqQyxNQUFNLFlBQVksR0FBRyxJQUFJLEdBQUcsRUFBd0IsQ0FBQztJQUNyRCxNQUFNLDJCQUEyQixHQUM3QixZQUFZLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFFcEUsS0FBSyxNQUFNLEVBQUMsVUFBVSxFQUFFLEtBQUssRUFBQyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQzNDLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFeEIsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDdEIsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3QixDQUFDO0lBQ0gsQ0FBQztJQUVELElBQUksT0FBTyxTQUFTLEtBQUssV0FBVyxJQUFJLFNBQVM7UUFDN0MsWUFBWSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLDJCQUEyQixFQUFFLENBQUM7UUFDOUYsa0NBQWtDO1FBQ2xDLE1BQU0sSUFBSSxLQUFLLENBQ1gsc0tBQXNLLENBQUMsQ0FBQztJQUM5SyxDQUFDO0lBRUQsT0FBTyx3QkFBd0IsQ0FBQztRQUM5QixDQUFDLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsa0NBQWtDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUMzRixnQkFBZ0IsRUFBRTtRQUNsQixDQUFDLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLDJCQUEyQixDQUFDLENBQUMsQ0FBQztZQUN6RixFQUFFLENBQUMsQ0FBQztZQUNKLHNCQUFzQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLFNBQVM7S0FDVixDQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SHR0cFRyYW5zZmVyQ2FjaGVPcHRpb25zLCDJtXdpdGhIdHRwVHJhbnNmZXJDYWNoZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtFTlZJUk9OTUVOVF9JTklUSUFMSVpFUiwgRW52aXJvbm1lbnRQcm92aWRlcnMsIGluamVjdCwgbWFrZUVudmlyb25tZW50UHJvdmlkZXJzLCBOZ1pvbmUsIFByb3ZpZGVyLCDJtUNvbnNvbGUgYXMgQ29uc29sZSwgybVmb3JtYXRSdW50aW1lRXJyb3IgYXMgZm9ybWF0UnVudGltZUVycm9yLCDJtXdpdGhEb21IeWRyYXRpb24gYXMgd2l0aERvbUh5ZHJhdGlvbix9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1J1bnRpbWVFcnJvckNvZGV9IGZyb20gJy4vZXJyb3JzJztcblxuLyoqXG4gKiBUaGUgbGlzdCBvZiBmZWF0dXJlcyBhcyBhbiBlbnVtIHRvIHVuaXF1ZWx5IHR5cGUgZWFjaCBgSHlkcmF0aW9uRmVhdHVyZWAuXG4gKiBAc2VlIHtAbGluayBIeWRyYXRpb25GZWF0dXJlfVxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGVudW0gSHlkcmF0aW9uRmVhdHVyZUtpbmQge1xuICBOb0h0dHBUcmFuc2ZlckNhY2hlLFxuICBIdHRwVHJhbnNmZXJDYWNoZU9wdGlvbnMsXG59XG5cbi8qKlxuICogSGVscGVyIHR5cGUgdG8gcmVwcmVzZW50IGEgSHlkcmF0aW9uIGZlYXR1cmUuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEh5ZHJhdGlvbkZlYXR1cmU8RmVhdHVyZUtpbmQgZXh0ZW5kcyBIeWRyYXRpb25GZWF0dXJlS2luZD4ge1xuICDJtWtpbmQ6IEZlYXR1cmVLaW5kO1xuICDJtXByb3ZpZGVyczogUHJvdmlkZXJbXTtcbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gY3JlYXRlIGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgYSBIeWRyYXRpb24gZmVhdHVyZS5cbiAqL1xuZnVuY3Rpb24gaHlkcmF0aW9uRmVhdHVyZTxGZWF0dXJlS2luZCBleHRlbmRzIEh5ZHJhdGlvbkZlYXR1cmVLaW5kPihcbiAgICDJtWtpbmQ6IEZlYXR1cmVLaW5kLCDJtXByb3ZpZGVyczogUHJvdmlkZXJbXSA9IFtdLFxuICAgIMm1b3B0aW9uczogdW5rbm93biA9IHt9KTogSHlkcmF0aW9uRmVhdHVyZTxGZWF0dXJlS2luZD4ge1xuICByZXR1cm4ge8m1a2luZCwgybVwcm92aWRlcnN9O1xufVxuXG4vKipcbiAqIERpc2FibGVzIEhUVFAgdHJhbnNmZXIgY2FjaGUuIEVmZmVjdGl2ZWx5IGNhdXNlcyBIVFRQIHJlcXVlc3RzIHRvIGJlIHBlcmZvcm1lZCB0d2ljZTogb25jZSBvbiB0aGVcbiAqIHNlcnZlciBhbmQgb3RoZXIgb25lIG9uIHRoZSBicm93c2VyLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdpdGhOb0h0dHBUcmFuc2ZlckNhY2hlKCk6XG4gICAgSHlkcmF0aW9uRmVhdHVyZTxIeWRyYXRpb25GZWF0dXJlS2luZC5Ob0h0dHBUcmFuc2ZlckNhY2hlPiB7XG4gIC8vIFRoaXMgZmVhdHVyZSBoYXMgbm8gcHJvdmlkZXJzIGFuZCBhY3RzIGFzIGEgZmxhZyB0aGF0IHR1cm5zIG9mZlxuICAvLyBIVFRQIHRyYW5zZmVyIGNhY2hlICh3aGljaCBvdGhlcndpc2UgaXMgdHVybmVkIG9uIGJ5IGRlZmF1bHQpLlxuICByZXR1cm4gaHlkcmF0aW9uRmVhdHVyZShIeWRyYXRpb25GZWF0dXJlS2luZC5Ob0h0dHBUcmFuc2ZlckNhY2hlKTtcbn1cblxuLyoqXG4gKiBUaGUgZnVuY3Rpb24gYWNjZXB0cyBhIGFuIG9iamVjdCwgd2hpY2ggYWxsb3dzIHRvIGNvbmZpZ3VyZSBjYWNoZSBwYXJhbWV0ZXJzLFxuICogc3VjaCBhcyB3aGljaCBoZWFkZXJzIHNob3VsZCBiZSBpbmNsdWRlZCAobm8gaGVhZGVycyBhcmUgaW5jbHVkZWQgYnkgZGVmYXVsdCksXG4gKiB3ZXRoZXIgUE9TVCByZXF1ZXN0cyBzaG91bGQgYmUgY2FjaGVkIG9yIGEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGlmIGFcbiAqIHBhcnRpY3VsYXIgcmVxdWVzdCBzaG91bGQgYmUgY2FjaGVkLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdpdGhIdHRwVHJhbnNmZXJDYWNoZU9wdGlvbnMoXG4gICAgb3B0aW9uczogSHR0cFRyYW5zZmVyQ2FjaGVPcHRpb25zLFxuICAgICk6IEh5ZHJhdGlvbkZlYXR1cmU8SHlkcmF0aW9uRmVhdHVyZUtpbmQuSHR0cFRyYW5zZmVyQ2FjaGVPcHRpb25zPiB7XG4gIC8vIFRoaXMgZmVhdHVyZSBoYXMgbm8gcHJvdmlkZXJzIGFuZCBhY3RzIGFzIGEgZmxhZyB0byBwYXNzIG9wdGlvbnMgdG8gdGhlIEhUVFAgdHJhbnNmZXIgY2FjaGUuXG4gIHJldHVybiBoeWRyYXRpb25GZWF0dXJlKFxuICAgICAgSHlkcmF0aW9uRmVhdHVyZUtpbmQuSHR0cFRyYW5zZmVyQ2FjaGVPcHRpb25zLCDJtXdpdGhIdHRwVHJhbnNmZXJDYWNoZShvcHRpb25zKSk7XG59XG5cbi8qKlxuICogUmV0dXJucyBhbiBgRU5WSVJPTk1FTlRfSU5JVElBTElaRVJgIHRva2VuIHNldHVwIHdpdGggYSBmdW5jdGlvblxuICogdGhhdCB2ZXJpZmllcyB3aGV0aGVyIGNvbXBhdGlibGUgWm9uZUpTIHdhcyB1c2VkIGluIGFuIGFwcGxpY2F0aW9uXG4gKiBhbmQgbG9ncyBhIHdhcm5pbmcgaW4gYSBjb25zb2xlIGlmIGl0J3Mgbm90IHRoZSBjYXNlLlxuICovXG5mdW5jdGlvbiBwcm92aWRlWm9uZUpzQ29tcGF0aWJpbGl0eURldGVjdG9yKCk6IFByb3ZpZGVyW10ge1xuICByZXR1cm4gW3tcbiAgICBwcm92aWRlOiBFTlZJUk9OTUVOVF9JTklUSUFMSVpFUixcbiAgICB1c2VWYWx1ZTogKCkgPT4ge1xuICAgICAgY29uc3Qgbmdab25lID0gaW5qZWN0KE5nWm9uZSk7XG4gICAgICAvLyBDaGVja2luZyBgbmdab25lIGluc3RhbmNlb2YgTmdab25lYCB3b3VsZCBiZSBpbnN1ZmZpY2llbnQgaGVyZSxcbiAgICAgIC8vIGJlY2F1c2UgY3VzdG9tIGltcGxlbWVudGF0aW9ucyBtaWdodCB1c2UgTmdab25lIGFzIGEgYmFzZSBjbGFzcy5cbiAgICAgIGlmIChuZ1pvbmUuY29uc3RydWN0b3IgIT09IE5nWm9uZSkge1xuICAgICAgICBjb25zdCBjb25zb2xlID0gaW5qZWN0KENvbnNvbGUpO1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gZm9ybWF0UnVudGltZUVycm9yKFxuICAgICAgICAgICAgUnVudGltZUVycm9yQ29kZS5VTlNVUFBPUlRFRF9aT05FSlNfSU5TVEFOQ0UsXG4gICAgICAgICAgICAnQW5ndWxhciBkZXRlY3RlZCB0aGF0IGh5ZHJhdGlvbiB3YXMgZW5hYmxlZCBmb3IgYW4gYXBwbGljYXRpb24gJyArXG4gICAgICAgICAgICAgICAgJ3RoYXQgdXNlcyBhIGN1c3RvbSBvciBhIG5vb3AgWm9uZS5qcyBpbXBsZW1lbnRhdGlvbi4gJyArXG4gICAgICAgICAgICAgICAgJ1RoaXMgaXMgbm90IHlldCBhIGZ1bGx5IHN1cHBvcnRlZCBjb25maWd1cmF0aW9uLicpO1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLndhcm4obWVzc2FnZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBtdWx0aTogdHJ1ZSxcbiAgfV07XG59XG5cbi8qKlxuICogU2V0cyB1cCBwcm92aWRlcnMgbmVjZXNzYXJ5IHRvIGVuYWJsZSBoeWRyYXRpb24gZnVuY3Rpb25hbGl0eSBmb3IgdGhlIGFwcGxpY2F0aW9uLlxuICpcbiAqIEJ5IGRlZmF1bHQsIHRoZSBmdW5jdGlvbiBlbmFibGVzIHRoZSByZWNvbW1lbmRlZCBzZXQgb2YgZmVhdHVyZXMgZm9yIHRoZSBvcHRpbWFsXG4gKiBwZXJmb3JtYW5jZSBmb3IgbW9zdCBvZiB0aGUgYXBwbGljYXRpb25zLiBJdCBpbmNsdWRlcyB0aGUgZm9sbG93aW5nIGZlYXR1cmVzOlxuICpcbiAqICogUmVjb25jaWxpbmcgRE9NIGh5ZHJhdGlvbi4gTGVhcm4gbW9yZSBhYm91dCBpdCBbaGVyZV0oZ3VpZGUvaHlkcmF0aW9uKS5cbiAqICogW2BIdHRwQ2xpZW50YF0oYXBpL2NvbW1vbi9odHRwL0h0dHBDbGllbnQpIHJlc3BvbnNlIGNhY2hpbmcgd2hpbGUgcnVubmluZyBvbiB0aGUgc2VydmVyIGFuZFxuICogdHJhbnNmZXJyaW5nIHRoaXMgY2FjaGUgdG8gdGhlIGNsaWVudCB0byBhdm9pZCBleHRyYSBIVFRQIHJlcXVlc3RzLiBMZWFybiBtb3JlIGFib3V0IGRhdGEgY2FjaGluZ1xuICogW2hlcmVdKC9ndWlkZS9zc3IjY2FjaGluZy1kYXRhLXdoZW4tdXNpbmctaHR0cGNsaWVudCkuXG4gKlxuICogVGhlc2UgZnVuY3Rpb25zIGFsbG93IHlvdSB0byBkaXNhYmxlIHNvbWUgb2YgdGhlIGRlZmF1bHQgZmVhdHVyZXMgb3IgY29uZmlndXJlIGZlYXR1cmVzXG4gKiAqIHtAbGluayB3aXRoTm9IdHRwVHJhbnNmZXJDYWNoZX0gdG8gZGlzYWJsZSBIVFRQIHRyYW5zZmVyIGNhY2hlXG4gKiAqIHtAbGluayB3aXRoSHR0cFRyYW5zZmVyQ2FjaGVPcHRpb25zfSB0byBjb25maWd1cmUgc29tZSBIVFRQIHRyYW5zZmVyIGNhY2hlIG9wdGlvbnNcbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqIEJhc2ljIGV4YW1wbGUgb2YgaG93IHlvdSBjYW4gZW5hYmxlIGh5ZHJhdGlvbiBpbiB5b3VyIGFwcGxpY2F0aW9uIHdoZW5cbiAqIGBib290c3RyYXBBcHBsaWNhdGlvbmAgZnVuY3Rpb24gaXMgdXNlZDpcbiAqIGBgYFxuICogYm9vdHN0cmFwQXBwbGljYXRpb24oQXBwQ29tcG9uZW50LCB7XG4gKiAgIHByb3ZpZGVyczogW3Byb3ZpZGVDbGllbnRIeWRyYXRpb24oKV1cbiAqIH0pO1xuICogYGBgXG4gKlxuICogQWx0ZXJuYXRpdmVseSBpZiB5b3UgYXJlIHVzaW5nIE5nTW9kdWxlcywgeW91IHdvdWxkIGFkZCBgcHJvdmlkZUNsaWVudEh5ZHJhdGlvbmBcbiAqIHRvIHlvdXIgcm9vdCBhcHAgbW9kdWxlJ3MgcHJvdmlkZXIgbGlzdC5cbiAqIGBgYFxuICogQE5nTW9kdWxlKHtcbiAqICAgZGVjbGFyYXRpb25zOiBbUm9vdENtcF0sXG4gKiAgIGJvb3RzdHJhcDogW1Jvb3RDbXBdLFxuICogICBwcm92aWRlcnM6IFtwcm92aWRlQ2xpZW50SHlkcmF0aW9uKCldLFxuICogfSlcbiAqIGV4cG9ydCBjbGFzcyBBcHBNb2R1bGUge31cbiAqIGBgYFxuICpcbiAqIEBzZWUge0BsaW5rIHdpdGhOb0h0dHBUcmFuc2ZlckNhY2hlfVxuICogQHNlZSB7QGxpbmsgd2l0aEh0dHBUcmFuc2ZlckNhY2hlT3B0aW9uc31cbiAqXG4gKiBAcGFyYW0gZmVhdHVyZXMgT3B0aW9uYWwgZmVhdHVyZXMgdG8gY29uZmlndXJlIGFkZGl0aW9uYWwgcm91dGVyIGJlaGF2aW9ycy5cbiAqIEByZXR1cm5zIEEgc2V0IG9mIHByb3ZpZGVycyB0byBlbmFibGUgaHlkcmF0aW9uLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVDbGllbnRIeWRyYXRpb24oLi4uZmVhdHVyZXM6IEh5ZHJhdGlvbkZlYXR1cmU8SHlkcmF0aW9uRmVhdHVyZUtpbmQ+W10pOlxuICAgIEVudmlyb25tZW50UHJvdmlkZXJzIHtcbiAgY29uc3QgcHJvdmlkZXJzOiBQcm92aWRlcltdID0gW107XG4gIGNvbnN0IGZlYXR1cmVzS2luZCA9IG5ldyBTZXQ8SHlkcmF0aW9uRmVhdHVyZUtpbmQ+KCk7XG4gIGNvbnN0IGhhc0h0dHBUcmFuc2ZlckNhY2hlT3B0aW9ucyA9XG4gICAgICBmZWF0dXJlc0tpbmQuaGFzKEh5ZHJhdGlvbkZlYXR1cmVLaW5kLkh0dHBUcmFuc2ZlckNhY2hlT3B0aW9ucyk7XG5cbiAgZm9yIChjb25zdCB7ybVwcm92aWRlcnMsIMm1a2luZH0gb2YgZmVhdHVyZXMpIHtcbiAgICBmZWF0dXJlc0tpbmQuYWRkKMm1a2luZCk7XG5cbiAgICBpZiAoybVwcm92aWRlcnMubGVuZ3RoKSB7XG4gICAgICBwcm92aWRlcnMucHVzaCjJtXByb3ZpZGVycyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiBuZ0Rldk1vZGUgIT09ICd1bmRlZmluZWQnICYmIG5nRGV2TW9kZSAmJlxuICAgICAgZmVhdHVyZXNLaW5kLmhhcyhIeWRyYXRpb25GZWF0dXJlS2luZC5Ob0h0dHBUcmFuc2ZlckNhY2hlKSAmJiBoYXNIdHRwVHJhbnNmZXJDYWNoZU9wdGlvbnMpIHtcbiAgICAvLyBUT0RPOiBNYWtlIHRoaXMgYSBydW50aW1lIGVycm9yXG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnQ29uZmlndXJhdGlvbiBlcnJvcjogZm91bmQgYm90aCB3aXRoSHR0cFRyYW5zZmVyQ2FjaGVPcHRpb25zKCkgYW5kIHdpdGhOb0h0dHBUcmFuc2ZlckNhY2hlKCkgaW4gdGhlIHNhbWUgY2FsbCB0byBwcm92aWRlQ2xpZW50SHlkcmF0aW9uKCksIHdoaWNoIGlzIGEgY29udHJhZGljdGlvbi4nKTtcbiAgfVxuXG4gIHJldHVybiBtYWtlRW52aXJvbm1lbnRQcm92aWRlcnMoW1xuICAgICh0eXBlb2YgbmdEZXZNb2RlICE9PSAndW5kZWZpbmVkJyAmJiBuZ0Rldk1vZGUpID8gcHJvdmlkZVpvbmVKc0NvbXBhdGliaWxpdHlEZXRlY3RvcigpIDogW10sXG4gICAgd2l0aERvbUh5ZHJhdGlvbigpLFxuICAgICgoZmVhdHVyZXNLaW5kLmhhcyhIeWRyYXRpb25GZWF0dXJlS2luZC5Ob0h0dHBUcmFuc2ZlckNhY2hlKSB8fCBoYXNIdHRwVHJhbnNmZXJDYWNoZU9wdGlvbnMpID9cbiAgICAgICAgIFtdIDpcbiAgICAgICAgIMm1d2l0aEh0dHBUcmFuc2ZlckNhY2hlKHt9KSksXG4gICAgcHJvdmlkZXJzLFxuICBdKTtcbn1cbiJdfQ==