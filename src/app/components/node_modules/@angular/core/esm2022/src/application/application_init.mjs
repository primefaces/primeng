import { inject, Injectable, InjectionToken } from '../di';
import { RuntimeError } from '../errors';
import { isPromise, isSubscribable } from '../util/lang';
import * as i0 from "../r3_symbols";
/**
 * A [DI token](guide/glossary#di-token "DI token definition") that you can use to provide
 * one or more initialization functions.
 *
 * The provided functions are injected at application startup and executed during
 * app initialization. If any of these functions returns a Promise or an Observable, initialization
 * does not complete until the Promise is resolved or the Observable is completed.
 *
 * You can, for example, create a factory function that loads language data
 * or an external configuration, and provide that function to the `APP_INITIALIZER` token.
 * The function is executed during the application bootstrap process,
 * and the needed data is available on startup.
 *
 * @see {@link ApplicationInitStatus}
 *
 * @usageNotes
 *
 * The following example illustrates how to configure a multi-provider using `APP_INITIALIZER` token
 * and a function returning a promise.
 * ### Example with NgModule-based application
 * ```
 *  function initializeApp(): Promise<any> {
 *    return new Promise((resolve, reject) => {
 *      // Do some asynchronous stuff
 *      resolve();
 *    });
 *  }
 *
 *  @NgModule({
 *   imports: [BrowserModule],
 *   declarations: [AppComponent],
 *   bootstrap: [AppComponent],
 *   providers: [{
 *     provide: APP_INITIALIZER,
 *     useFactory: () => initializeApp,
 *     multi: true
 *    }]
 *   })
 *  export class AppModule {}
 * ```
 *
 * ### Example with standalone application
 * ```
 * export function initializeApp(http: HttpClient) {
 *   return (): Promise<any> =>
 *     firstValueFrom(
 *       http
 *         .get("https://someUrl.com/api/user")
 *         .pipe(tap(user => { ... }))
 *     );
 * }
 *
 * bootstrapApplication(App, {
 *   providers: [
 *     provideHttpClient(),
 *     {
 *       provide: APP_INITIALIZER,
 *       useFactory: initializeApp,
 *       multi: true,
 *       deps: [HttpClient],
 *     },
 *   ],
 * });

 * ```
 *
 *
 * It's also possible to configure a multi-provider using `APP_INITIALIZER` token and a function
 * returning an observable, see an example below. Note: the `HttpClient` in this example is used for
 * demo purposes to illustrate how the factory function can work with other providers available
 * through DI.
 *
 * ### Example with NgModule-based application
 * ```
 *  function initializeAppFactory(httpClient: HttpClient): () => Observable<any> {
 *   return () => httpClient.get("https://someUrl.com/api/user")
 *     .pipe(
 *        tap(user => { ... })
 *     );
 *  }
 *
 *  @NgModule({
 *    imports: [BrowserModule, HttpClientModule],
 *    declarations: [AppComponent],
 *    bootstrap: [AppComponent],
 *    providers: [{
 *      provide: APP_INITIALIZER,
 *      useFactory: initializeAppFactory,
 *      deps: [HttpClient],
 *      multi: true
 *    }]
 *  })
 *  export class AppModule {}
 * ```
 *
 * ### Example with standalone application
 * ```
 *  function initializeAppFactory(httpClient: HttpClient): () => Observable<any> {
 *   return () => httpClient.get("https://someUrl.com/api/user")
 *     .pipe(
 *        tap(user => { ... })
 *     );
 *  }
 *
 * bootstrapApplication(App, {
 *   providers: [
 *     provideHttpClient(),
 *     {
 *       provide: APP_INITIALIZER,
 *       useFactory: initializeAppFactory,
 *       multi: true,
 *       deps: [HttpClient],
 *     },
 *   ],
 * });
 * ```
 *
 * @publicApi
 */
export const APP_INITIALIZER = new InjectionToken(ngDevMode ? 'Application Initializer' : '');
/**
 * A class that reflects the state of running {@link APP_INITIALIZER} functions.
 *
 * @publicApi
 */
export class ApplicationInitStatus {
    constructor() {
        this.initialized = false;
        this.done = false;
        this.donePromise = new Promise((res, rej) => {
            this.resolve = res;
            this.reject = rej;
        });
        this.appInits = inject(APP_INITIALIZER, { optional: true }) ?? [];
        if ((typeof ngDevMode === 'undefined' || ngDevMode) && !Array.isArray(this.appInits)) {
            throw new RuntimeError(-209 /* RuntimeErrorCode.INVALID_MULTI_PROVIDER */, 'Unexpected type of the `APP_INITIALIZER` token value ' +
                `(expected an array, but got ${typeof this.appInits}). ` +
                'Please check that the `APP_INITIALIZER` token is configured as a ' +
                '`multi: true` provider.');
        }
    }
    /** @internal */
    runInitializers() {
        if (this.initialized) {
            return;
        }
        const asyncInitPromises = [];
        for (const appInits of this.appInits) {
            const initResult = appInits();
            if (isPromise(initResult)) {
                asyncInitPromises.push(initResult);
            }
            else if (isSubscribable(initResult)) {
                const observableAsPromise = new Promise((resolve, reject) => {
                    initResult.subscribe({ complete: resolve, error: reject });
                });
                asyncInitPromises.push(observableAsPromise);
            }
        }
        const complete = () => {
            // @ts-expect-error overwriting a readonly
            this.done = true;
            this.resolve();
        };
        Promise.all(asyncInitPromises)
            .then(() => {
            complete();
        })
            .catch(e => {
            this.reject(e);
        });
        if (asyncInitPromises.length === 0) {
            complete();
        }
        this.initialized = true;
    }
    static { this.ɵfac = function ApplicationInitStatus_Factory(t) { return new (t || ApplicationInitStatus)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApplicationInitStatus, factory: ApplicationInitStatus.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.setClassMetadata(ApplicationInitStatus, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [], null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb25faW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2FwcGxpY2F0aW9uL2FwcGxpY2F0aW9uX2luaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBVUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFDLE1BQU0sT0FBTyxDQUFDO0FBQ3pELE9BQU8sRUFBQyxZQUFZLEVBQW1CLE1BQU0sV0FBVyxDQUFDO0FBQ3pELE9BQU8sRUFBQyxTQUFTLEVBQUUsY0FBYyxFQUFDLE1BQU0sY0FBYyxDQUFDOztBQUV2RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNIRztBQUNILE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FDeEIsSUFBSSxjQUFjLENBQ2QsU0FBUyxDQUFDLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFcEQ7Ozs7R0FJRztBQUVILE1BQU0sT0FBTyxxQkFBcUI7SUFlaEM7UUFUUSxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNaLFNBQUksR0FBRyxLQUFLLENBQUM7UUFDYixnQkFBVyxHQUFpQixJQUFJLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUNuRSxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztZQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztRQUVjLGFBQVEsR0FBRyxNQUFNLENBQUMsZUFBZSxFQUFFLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRzFFLElBQUksQ0FBQyxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1lBQ3JGLE1BQU0sSUFBSSxZQUFZLHFEQUVsQix1REFBdUQ7Z0JBQ25ELCtCQUErQixPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUs7Z0JBQ3hELG1FQUFtRTtnQkFDbkUseUJBQXlCLENBQUMsQ0FBQztRQUNyQyxDQUFDO0lBQ0gsQ0FBQztJQUVELGdCQUFnQjtJQUNoQixlQUFlO1FBQ2IsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDckIsT0FBTztRQUNULENBQUM7UUFFRCxNQUFNLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUM3QixLQUFLLE1BQU0sUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNyQyxNQUFNLFVBQVUsR0FBRyxRQUFRLEVBQUUsQ0FBQztZQUM5QixJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO2dCQUMxQixpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDckMsQ0FBQztpQkFBTSxJQUFJLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO2dCQUN0QyxNQUFNLG1CQUFtQixHQUFHLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO29CQUNoRSxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztnQkFDM0QsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsaUJBQWlCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDOUMsQ0FBQztRQUNILENBQUM7UUFFRCxNQUFNLFFBQVEsR0FBRyxHQUFHLEVBQUU7WUFDcEIsMENBQTBDO1lBQzFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNqQixDQUFDLENBQUM7UUFFRixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDO2FBQ3pCLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDVCxRQUFRLEVBQUUsQ0FBQztRQUNiLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNULElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7UUFFUCxJQUFJLGlCQUFpQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUNuQyxRQUFRLEVBQUUsQ0FBQztRQUNiLENBQUM7UUFDRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO3NGQS9EVSxxQkFBcUI7dUVBQXJCLHFCQUFxQixXQUFyQixxQkFBcUIsbUJBRFQsTUFBTTs7Z0ZBQ2xCLHFCQUFxQjtjQURqQyxVQUFVO2VBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7aW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbn0gZnJvbSAnLi4vZGknO1xuaW1wb3J0IHtSdW50aW1lRXJyb3IsIFJ1bnRpbWVFcnJvckNvZGV9IGZyb20gJy4uL2Vycm9ycyc7XG5pbXBvcnQge2lzUHJvbWlzZSwgaXNTdWJzY3JpYmFibGV9IGZyb20gJy4uL3V0aWwvbGFuZyc7XG5cbi8qKlxuICogQSBbREkgdG9rZW5dKGd1aWRlL2dsb3NzYXJ5I2RpLXRva2VuIFwiREkgdG9rZW4gZGVmaW5pdGlvblwiKSB0aGF0IHlvdSBjYW4gdXNlIHRvIHByb3ZpZGVcbiAqIG9uZSBvciBtb3JlIGluaXRpYWxpemF0aW9uIGZ1bmN0aW9ucy5cbiAqXG4gKiBUaGUgcHJvdmlkZWQgZnVuY3Rpb25zIGFyZSBpbmplY3RlZCBhdCBhcHBsaWNhdGlvbiBzdGFydHVwIGFuZCBleGVjdXRlZCBkdXJpbmdcbiAqIGFwcCBpbml0aWFsaXphdGlvbi4gSWYgYW55IG9mIHRoZXNlIGZ1bmN0aW9ucyByZXR1cm5zIGEgUHJvbWlzZSBvciBhbiBPYnNlcnZhYmxlLCBpbml0aWFsaXphdGlvblxuICogZG9lcyBub3QgY29tcGxldGUgdW50aWwgdGhlIFByb21pc2UgaXMgcmVzb2x2ZWQgb3IgdGhlIE9ic2VydmFibGUgaXMgY29tcGxldGVkLlxuICpcbiAqIFlvdSBjYW4sIGZvciBleGFtcGxlLCBjcmVhdGUgYSBmYWN0b3J5IGZ1bmN0aW9uIHRoYXQgbG9hZHMgbGFuZ3VhZ2UgZGF0YVxuICogb3IgYW4gZXh0ZXJuYWwgY29uZmlndXJhdGlvbiwgYW5kIHByb3ZpZGUgdGhhdCBmdW5jdGlvbiB0byB0aGUgYEFQUF9JTklUSUFMSVpFUmAgdG9rZW4uXG4gKiBUaGUgZnVuY3Rpb24gaXMgZXhlY3V0ZWQgZHVyaW5nIHRoZSBhcHBsaWNhdGlvbiBib290c3RyYXAgcHJvY2VzcyxcbiAqIGFuZCB0aGUgbmVlZGVkIGRhdGEgaXMgYXZhaWxhYmxlIG9uIHN0YXJ0dXAuXG4gKlxuICogQHNlZSB7QGxpbmsgQXBwbGljYXRpb25Jbml0U3RhdHVzfVxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogVGhlIGZvbGxvd2luZyBleGFtcGxlIGlsbHVzdHJhdGVzIGhvdyB0byBjb25maWd1cmUgYSBtdWx0aS1wcm92aWRlciB1c2luZyBgQVBQX0lOSVRJQUxJWkVSYCB0b2tlblxuICogYW5kIGEgZnVuY3Rpb24gcmV0dXJuaW5nIGEgcHJvbWlzZS5cbiAqICMjIyBFeGFtcGxlIHdpdGggTmdNb2R1bGUtYmFzZWQgYXBwbGljYXRpb25cbiAqIGBgYFxuICogIGZ1bmN0aW9uIGluaXRpYWxpemVBcHAoKTogUHJvbWlzZTxhbnk+IHtcbiAqICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gKiAgICAgIC8vIERvIHNvbWUgYXN5bmNocm9ub3VzIHN0dWZmXG4gKiAgICAgIHJlc29sdmUoKTtcbiAqICAgIH0pO1xuICogIH1cbiAqXG4gKiAgQE5nTW9kdWxlKHtcbiAqICAgaW1wb3J0czogW0Jyb3dzZXJNb2R1bGVdLFxuICogICBkZWNsYXJhdGlvbnM6IFtBcHBDb21wb25lbnRdLFxuICogICBib290c3RyYXA6IFtBcHBDb21wb25lbnRdLFxuICogICBwcm92aWRlcnM6IFt7XG4gKiAgICAgcHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLFxuICogICAgIHVzZUZhY3Rvcnk6ICgpID0+IGluaXRpYWxpemVBcHAsXG4gKiAgICAgbXVsdGk6IHRydWVcbiAqICAgIH1dXG4gKiAgIH0pXG4gKiAgZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7fVxuICogYGBgXG4gKlxuICogIyMjIEV4YW1wbGUgd2l0aCBzdGFuZGFsb25lIGFwcGxpY2F0aW9uXG4gKiBgYGBcbiAqIGV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplQXBwKGh0dHA6IEh0dHBDbGllbnQpIHtcbiAqICAgcmV0dXJuICgpOiBQcm9taXNlPGFueT4gPT5cbiAqICAgICBmaXJzdFZhbHVlRnJvbShcbiAqICAgICAgIGh0dHBcbiAqICAgICAgICAgLmdldChcImh0dHBzOi8vc29tZVVybC5jb20vYXBpL3VzZXJcIilcbiAqICAgICAgICAgLnBpcGUodGFwKHVzZXIgPT4geyAuLi4gfSkpXG4gKiAgICAgKTtcbiAqIH1cbiAqXG4gKiBib290c3RyYXBBcHBsaWNhdGlvbihBcHAsIHtcbiAqICAgcHJvdmlkZXJzOiBbXG4gKiAgICAgcHJvdmlkZUh0dHBDbGllbnQoKSxcbiAqICAgICB7XG4gKiAgICAgICBwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsXG4gKiAgICAgICB1c2VGYWN0b3J5OiBpbml0aWFsaXplQXBwLFxuICogICAgICAgbXVsdGk6IHRydWUsXG4gKiAgICAgICBkZXBzOiBbSHR0cENsaWVudF0sXG4gKiAgICAgfSxcbiAqICAgXSxcbiAqIH0pO1xuXG4gKiBgYGBcbiAqXG4gKlxuICogSXQncyBhbHNvIHBvc3NpYmxlIHRvIGNvbmZpZ3VyZSBhIG11bHRpLXByb3ZpZGVyIHVzaW5nIGBBUFBfSU5JVElBTElaRVJgIHRva2VuIGFuZCBhIGZ1bmN0aW9uXG4gKiByZXR1cm5pbmcgYW4gb2JzZXJ2YWJsZSwgc2VlIGFuIGV4YW1wbGUgYmVsb3cuIE5vdGU6IHRoZSBgSHR0cENsaWVudGAgaW4gdGhpcyBleGFtcGxlIGlzIHVzZWQgZm9yXG4gKiBkZW1vIHB1cnBvc2VzIHRvIGlsbHVzdHJhdGUgaG93IHRoZSBmYWN0b3J5IGZ1bmN0aW9uIGNhbiB3b3JrIHdpdGggb3RoZXIgcHJvdmlkZXJzIGF2YWlsYWJsZVxuICogdGhyb3VnaCBESS5cbiAqXG4gKiAjIyMgRXhhbXBsZSB3aXRoIE5nTW9kdWxlLWJhc2VkIGFwcGxpY2F0aW9uXG4gKiBgYGBcbiAqICBmdW5jdGlvbiBpbml0aWFsaXplQXBwRmFjdG9yeShodHRwQ2xpZW50OiBIdHRwQ2xpZW50KTogKCkgPT4gT2JzZXJ2YWJsZTxhbnk+IHtcbiAqICAgcmV0dXJuICgpID0+IGh0dHBDbGllbnQuZ2V0KFwiaHR0cHM6Ly9zb21lVXJsLmNvbS9hcGkvdXNlclwiKVxuICogICAgIC5waXBlKFxuICogICAgICAgIHRhcCh1c2VyID0+IHsgLi4uIH0pXG4gKiAgICAgKTtcbiAqICB9XG4gKlxuICogIEBOZ01vZHVsZSh7XG4gKiAgICBpbXBvcnRzOiBbQnJvd3Nlck1vZHVsZSwgSHR0cENsaWVudE1vZHVsZV0sXG4gKiAgICBkZWNsYXJhdGlvbnM6IFtBcHBDb21wb25lbnRdLFxuICogICAgYm9vdHN0cmFwOiBbQXBwQ29tcG9uZW50XSxcbiAqICAgIHByb3ZpZGVyczogW3tcbiAqICAgICAgcHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLFxuICogICAgICB1c2VGYWN0b3J5OiBpbml0aWFsaXplQXBwRmFjdG9yeSxcbiAqICAgICAgZGVwczogW0h0dHBDbGllbnRdLFxuICogICAgICBtdWx0aTogdHJ1ZVxuICogICAgfV1cbiAqICB9KVxuICogIGV4cG9ydCBjbGFzcyBBcHBNb2R1bGUge31cbiAqIGBgYFxuICpcbiAqICMjIyBFeGFtcGxlIHdpdGggc3RhbmRhbG9uZSBhcHBsaWNhdGlvblxuICogYGBgXG4gKiAgZnVuY3Rpb24gaW5pdGlhbGl6ZUFwcEZhY3RvcnkoaHR0cENsaWVudDogSHR0cENsaWVudCk6ICgpID0+IE9ic2VydmFibGU8YW55PiB7XG4gKiAgIHJldHVybiAoKSA9PiBodHRwQ2xpZW50LmdldChcImh0dHBzOi8vc29tZVVybC5jb20vYXBpL3VzZXJcIilcbiAqICAgICAucGlwZShcbiAqICAgICAgICB0YXAodXNlciA9PiB7IC4uLiB9KVxuICogICAgICk7XG4gKiAgfVxuICpcbiAqIGJvb3RzdHJhcEFwcGxpY2F0aW9uKEFwcCwge1xuICogICBwcm92aWRlcnM6IFtcbiAqICAgICBwcm92aWRlSHR0cENsaWVudCgpLFxuICogICAgIHtcbiAqICAgICAgIHByb3ZpZGU6IEFQUF9JTklUSUFMSVpFUixcbiAqICAgICAgIHVzZUZhY3Rvcnk6IGluaXRpYWxpemVBcHBGYWN0b3J5LFxuICogICAgICAgbXVsdGk6IHRydWUsXG4gKiAgICAgICBkZXBzOiBbSHR0cENsaWVudF0sXG4gKiAgICAgfSxcbiAqICAgXSxcbiAqIH0pO1xuICogYGBgXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgQVBQX0lOSVRJQUxJWkVSID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48UmVhZG9ubHlBcnJheTwoKSA9PiBPYnNlcnZhYmxlPHVua25vd24+fCBQcm9taXNlPHVua25vd24+fCB2b2lkPj4oXG4gICAgICAgIG5nRGV2TW9kZSA/ICdBcHBsaWNhdGlvbiBJbml0aWFsaXplcicgOiAnJyk7XG5cbi8qKlxuICogQSBjbGFzcyB0aGF0IHJlZmxlY3RzIHRoZSBzdGF0ZSBvZiBydW5uaW5nIHtAbGluayBBUFBfSU5JVElBTElaRVJ9IGZ1bmN0aW9ucy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIEFwcGxpY2F0aW9uSW5pdFN0YXR1cyB7XG4gIC8vIFVzaW5nIG5vbiBudWxsIGFzc2VydGlvbiwgdGhlc2UgZmllbGRzIGFyZSBkZWZpbmVkIGJlbG93XG4gIC8vIHdpdGhpbiB0aGUgYG5ldyBQcm9taXNlYCBjYWxsYmFjayAoc3luY2hyb25vdXNseSkuXG4gIHByaXZhdGUgcmVzb2x2ZSE6ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZDtcbiAgcHJpdmF0ZSByZWplY3QhOiAoLi4uYXJnczogYW55W10pID0+IHZvaWQ7XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplZCA9IGZhbHNlO1xuICBwdWJsaWMgcmVhZG9ubHkgZG9uZSA9IGZhbHNlO1xuICBwdWJsaWMgcmVhZG9ubHkgZG9uZVByb21pc2U6IFByb21pc2U8YW55PiA9IG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgIHRoaXMucmVzb2x2ZSA9IHJlcztcbiAgICB0aGlzLnJlamVjdCA9IHJlajtcbiAgfSk7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBhcHBJbml0cyA9IGluamVjdChBUFBfSU5JVElBTElaRVIsIHtvcHRpb25hbDogdHJ1ZX0pID8/IFtdO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGlmICgodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSAmJiAhQXJyYXkuaXNBcnJheSh0aGlzLmFwcEluaXRzKSkge1xuICAgICAgdGhyb3cgbmV3IFJ1bnRpbWVFcnJvcihcbiAgICAgICAgICBSdW50aW1lRXJyb3JDb2RlLklOVkFMSURfTVVMVElfUFJPVklERVIsXG4gICAgICAgICAgJ1VuZXhwZWN0ZWQgdHlwZSBvZiB0aGUgYEFQUF9JTklUSUFMSVpFUmAgdG9rZW4gdmFsdWUgJyArXG4gICAgICAgICAgICAgIGAoZXhwZWN0ZWQgYW4gYXJyYXksIGJ1dCBnb3QgJHt0eXBlb2YgdGhpcy5hcHBJbml0c30pLiBgICtcbiAgICAgICAgICAgICAgJ1BsZWFzZSBjaGVjayB0aGF0IHRoZSBgQVBQX0lOSVRJQUxJWkVSYCB0b2tlbiBpcyBjb25maWd1cmVkIGFzIGEgJyArXG4gICAgICAgICAgICAgICdgbXVsdGk6IHRydWVgIHByb3ZpZGVyLicpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcnVuSW5pdGlhbGl6ZXJzKCkge1xuICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYXN5bmNJbml0UHJvbWlzZXMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGFwcEluaXRzIG9mIHRoaXMuYXBwSW5pdHMpIHtcbiAgICAgIGNvbnN0IGluaXRSZXN1bHQgPSBhcHBJbml0cygpO1xuICAgICAgaWYgKGlzUHJvbWlzZShpbml0UmVzdWx0KSkge1xuICAgICAgICBhc3luY0luaXRQcm9taXNlcy5wdXNoKGluaXRSZXN1bHQpO1xuICAgICAgfSBlbHNlIGlmIChpc1N1YnNjcmliYWJsZShpbml0UmVzdWx0KSkge1xuICAgICAgICBjb25zdCBvYnNlcnZhYmxlQXNQcm9taXNlID0gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIGluaXRSZXN1bHQuc3Vic2NyaWJlKHtjb21wbGV0ZTogcmVzb2x2ZSwgZXJyb3I6IHJlamVjdH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgYXN5bmNJbml0UHJvbWlzZXMucHVzaChvYnNlcnZhYmxlQXNQcm9taXNlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3Igb3ZlcndyaXRpbmcgYSByZWFkb25seVxuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcbiAgICAgIHRoaXMucmVzb2x2ZSgpO1xuICAgIH07XG5cbiAgICBQcm9taXNlLmFsbChhc3luY0luaXRQcm9taXNlcylcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGNvbXBsZXRlKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICB0aGlzLnJlamVjdChlKTtcbiAgICAgICAgfSk7XG5cbiAgICBpZiAoYXN5bmNJbml0UHJvbWlzZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBjb21wbGV0ZSgpO1xuICAgIH1cbiAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgfVxufVxuIl19