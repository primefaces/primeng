/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertLessThan } from '../util/assert';
import { ɵɵdefineInjectable } from './interface/defs';
/**
 * Creates a token that can be used in a DI Provider.
 *
 * Use an `InjectionToken` whenever the type you are injecting is not reified (does not have a
 * runtime representation) such as when injecting an interface, callable type, array or
 * parameterized type.
 *
 * `InjectionToken` is parameterized on `T` which is the type of object which will be returned by
 * the `Injector`. This provides an additional level of type safety.
 *
 * <div class="alert is-helpful">
 *
 * **Important Note**: Ensure that you use the same instance of the `InjectionToken` in both the
 * provider and the injection call. Creating a new instance of `InjectionToken` in different places,
 * even with the same description, will be treated as different tokens by Angular's DI system,
 * leading to a `NullInjectorError`.
 *
 * </div>
 *
 * <code-example format="typescript" language="typescript" path="injection-token/src/main.ts"
 * region="InjectionToken"></code-example>
 *
 * When creating an `InjectionToken`, you can optionally specify a factory function which returns
 * (possibly by creating) a default value of the parameterized type `T`. This sets up the
 * `InjectionToken` using this factory as a provider as if it was defined explicitly in the
 * application's root injector. If the factory function, which takes zero arguments, needs to inject
 * dependencies, it can do so using the [`inject`](api/core/inject) function.
 * As you can see in the Tree-shakable InjectionToken example below.
 *
 * Additionally, if a `factory` is specified you can also specify the `providedIn` option, which
 * overrides the above behavior and marks the token as belonging to a particular `@NgModule` (note:
 * this option is now deprecated). As mentioned above, `'root'` is the default value for
 * `providedIn`.
 *
 * The `providedIn: NgModule` and `providedIn: 'any'` options are deprecated.
 *
 * @usageNotes
 * ### Basic Examples
 *
 * ### Plain InjectionToken
 *
 * {@example core/di/ts/injector_spec.ts region='InjectionToken'}
 *
 * ### Tree-shakable InjectionToken
 *
 * {@example core/di/ts/injector_spec.ts region='ShakableInjectionToken'}
 *
 * @publicApi
 */
export class InjectionToken {
    /**
     * @param _desc   Description for the token,
     *                used only for debugging purposes,
     *                it should but does not need to be unique
     * @param options Options for the token's usage, as described above
     */
    constructor(_desc, options) {
        this._desc = _desc;
        /** @internal */
        this.ngMetadataName = 'InjectionToken';
        this.ɵprov = undefined;
        if (typeof options == 'number') {
            (typeof ngDevMode === 'undefined' || ngDevMode) &&
                assertLessThan(options, 0, 'Only negative numbers are supported here');
            // This is a special hack to assign __NG_ELEMENT_ID__ to this instance.
            // See `InjectorMarkers`
            this.__NG_ELEMENT_ID__ = options;
        }
        else if (options !== undefined) {
            this.ɵprov = ɵɵdefineInjectable({
                token: this,
                providedIn: options.providedIn || 'root',
                factory: options.factory,
            });
        }
    }
    /**
     * @internal
     */
    get multi() {
        return this;
    }
    toString() {
        return `InjectionToken ${this._desc}`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0aW9uX3Rva2VuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvZGkvaW5qZWN0aW9uX3Rva2VuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUdILE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUVwRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBZ0RHO0FBQ0gsTUFBTSxPQUFPLGNBQWM7SUFNekI7Ozs7O09BS0c7SUFDSCxZQUFzQixLQUFhLEVBQUUsT0FFcEM7UUFGcUIsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQVhuQyxnQkFBZ0I7UUFDUCxtQkFBYyxHQUFHLGdCQUFnQixDQUFDO1FBYXpDLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ3ZCLElBQUksT0FBTyxPQUFPLElBQUksUUFBUSxFQUFFLENBQUM7WUFDL0IsQ0FBQyxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxDQUFDO2dCQUMzQyxjQUFjLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSwwQ0FBMEMsQ0FBQyxDQUFDO1lBQzNFLHVFQUF1RTtZQUN2RSx3QkFBd0I7WUFDdkIsSUFBWSxDQUFDLGlCQUFpQixHQUFHLE9BQU8sQ0FBQztRQUM1QyxDQUFDO2FBQU0sSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQztnQkFDOUIsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsVUFBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVLElBQUksTUFBTTtnQkFDeEMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO2FBQ3pCLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQWdDLENBQUM7SUFDMUMsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLGtCQUFrQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDeEMsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3R5cGUnO1xuaW1wb3J0IHthc3NlcnRMZXNzVGhhbn0gZnJvbSAnLi4vdXRpbC9hc3NlcnQnO1xuXG5pbXBvcnQge8m1ybVkZWZpbmVJbmplY3RhYmxlfSBmcm9tICcuL2ludGVyZmFjZS9kZWZzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgdG9rZW4gdGhhdCBjYW4gYmUgdXNlZCBpbiBhIERJIFByb3ZpZGVyLlxuICpcbiAqIFVzZSBhbiBgSW5qZWN0aW9uVG9rZW5gIHdoZW5ldmVyIHRoZSB0eXBlIHlvdSBhcmUgaW5qZWN0aW5nIGlzIG5vdCByZWlmaWVkIChkb2VzIG5vdCBoYXZlIGFcbiAqIHJ1bnRpbWUgcmVwcmVzZW50YXRpb24pIHN1Y2ggYXMgd2hlbiBpbmplY3RpbmcgYW4gaW50ZXJmYWNlLCBjYWxsYWJsZSB0eXBlLCBhcnJheSBvclxuICogcGFyYW1ldGVyaXplZCB0eXBlLlxuICpcbiAqIGBJbmplY3Rpb25Ub2tlbmAgaXMgcGFyYW1ldGVyaXplZCBvbiBgVGAgd2hpY2ggaXMgdGhlIHR5cGUgb2Ygb2JqZWN0IHdoaWNoIHdpbGwgYmUgcmV0dXJuZWQgYnlcbiAqIHRoZSBgSW5qZWN0b3JgLiBUaGlzIHByb3ZpZGVzIGFuIGFkZGl0aW9uYWwgbGV2ZWwgb2YgdHlwZSBzYWZldHkuXG4gKlxuICogPGRpdiBjbGFzcz1cImFsZXJ0IGlzLWhlbHBmdWxcIj5cbiAqXG4gKiAqKkltcG9ydGFudCBOb3RlKio6IEVuc3VyZSB0aGF0IHlvdSB1c2UgdGhlIHNhbWUgaW5zdGFuY2Ugb2YgdGhlIGBJbmplY3Rpb25Ub2tlbmAgaW4gYm90aCB0aGVcbiAqIHByb3ZpZGVyIGFuZCB0aGUgaW5qZWN0aW9uIGNhbGwuIENyZWF0aW5nIGEgbmV3IGluc3RhbmNlIG9mIGBJbmplY3Rpb25Ub2tlbmAgaW4gZGlmZmVyZW50IHBsYWNlcyxcbiAqIGV2ZW4gd2l0aCB0aGUgc2FtZSBkZXNjcmlwdGlvbiwgd2lsbCBiZSB0cmVhdGVkIGFzIGRpZmZlcmVudCB0b2tlbnMgYnkgQW5ndWxhcidzIERJIHN5c3RlbSxcbiAqIGxlYWRpbmcgdG8gYSBgTnVsbEluamVjdG9yRXJyb3JgLlxuICpcbiAqIDwvZGl2PlxuICpcbiAqIDxjb2RlLWV4YW1wbGUgZm9ybWF0PVwidHlwZXNjcmlwdFwiIGxhbmd1YWdlPVwidHlwZXNjcmlwdFwiIHBhdGg9XCJpbmplY3Rpb24tdG9rZW4vc3JjL21haW4udHNcIlxuICogcmVnaW9uPVwiSW5qZWN0aW9uVG9rZW5cIj48L2NvZGUtZXhhbXBsZT5cbiAqXG4gKiBXaGVuIGNyZWF0aW5nIGFuIGBJbmplY3Rpb25Ub2tlbmAsIHlvdSBjYW4gb3B0aW9uYWxseSBzcGVjaWZ5IGEgZmFjdG9yeSBmdW5jdGlvbiB3aGljaCByZXR1cm5zXG4gKiAocG9zc2libHkgYnkgY3JlYXRpbmcpIGEgZGVmYXVsdCB2YWx1ZSBvZiB0aGUgcGFyYW1ldGVyaXplZCB0eXBlIGBUYC4gVGhpcyBzZXRzIHVwIHRoZVxuICogYEluamVjdGlvblRva2VuYCB1c2luZyB0aGlzIGZhY3RvcnkgYXMgYSBwcm92aWRlciBhcyBpZiBpdCB3YXMgZGVmaW5lZCBleHBsaWNpdGx5IGluIHRoZVxuICogYXBwbGljYXRpb24ncyByb290IGluamVjdG9yLiBJZiB0aGUgZmFjdG9yeSBmdW5jdGlvbiwgd2hpY2ggdGFrZXMgemVybyBhcmd1bWVudHMsIG5lZWRzIHRvIGluamVjdFxuICogZGVwZW5kZW5jaWVzLCBpdCBjYW4gZG8gc28gdXNpbmcgdGhlIFtgaW5qZWN0YF0oYXBpL2NvcmUvaW5qZWN0KSBmdW5jdGlvbi5cbiAqIEFzIHlvdSBjYW4gc2VlIGluIHRoZSBUcmVlLXNoYWthYmxlIEluamVjdGlvblRva2VuIGV4YW1wbGUgYmVsb3cuXG4gKlxuICogQWRkaXRpb25hbGx5LCBpZiBhIGBmYWN0b3J5YCBpcyBzcGVjaWZpZWQgeW91IGNhbiBhbHNvIHNwZWNpZnkgdGhlIGBwcm92aWRlZEluYCBvcHRpb24sIHdoaWNoXG4gKiBvdmVycmlkZXMgdGhlIGFib3ZlIGJlaGF2aW9yIGFuZCBtYXJrcyB0aGUgdG9rZW4gYXMgYmVsb25naW5nIHRvIGEgcGFydGljdWxhciBgQE5nTW9kdWxlYCAobm90ZTpcbiAqIHRoaXMgb3B0aW9uIGlzIG5vdyBkZXByZWNhdGVkKS4gQXMgbWVudGlvbmVkIGFib3ZlLCBgJ3Jvb3QnYCBpcyB0aGUgZGVmYXVsdCB2YWx1ZSBmb3JcbiAqIGBwcm92aWRlZEluYC5cbiAqXG4gKiBUaGUgYHByb3ZpZGVkSW46IE5nTW9kdWxlYCBhbmQgYHByb3ZpZGVkSW46ICdhbnknYCBvcHRpb25zIGFyZSBkZXByZWNhdGVkLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKiAjIyMgQmFzaWMgRXhhbXBsZXNcbiAqXG4gKiAjIyMgUGxhaW4gSW5qZWN0aW9uVG9rZW5cbiAqXG4gKiB7QGV4YW1wbGUgY29yZS9kaS90cy9pbmplY3Rvcl9zcGVjLnRzIHJlZ2lvbj0nSW5qZWN0aW9uVG9rZW4nfVxuICpcbiAqICMjIyBUcmVlLXNoYWthYmxlIEluamVjdGlvblRva2VuXG4gKlxuICoge0BleGFtcGxlIGNvcmUvZGkvdHMvaW5qZWN0b3Jfc3BlYy50cyByZWdpb249J1NoYWthYmxlSW5qZWN0aW9uVG9rZW4nfVxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNsYXNzIEluamVjdGlvblRva2VuPFQ+IHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICByZWFkb25seSBuZ01ldGFkYXRhTmFtZSA9ICdJbmplY3Rpb25Ub2tlbic7XG5cbiAgcmVhZG9ubHkgybVwcm92OiB1bmtub3duO1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gX2Rlc2MgICBEZXNjcmlwdGlvbiBmb3IgdGhlIHRva2VuLFxuICAgKiAgICAgICAgICAgICAgICB1c2VkIG9ubHkgZm9yIGRlYnVnZ2luZyBwdXJwb3NlcyxcbiAgICogICAgICAgICAgICAgICAgaXQgc2hvdWxkIGJ1dCBkb2VzIG5vdCBuZWVkIHRvIGJlIHVuaXF1ZVxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciB0aGUgdG9rZW4ncyB1c2FnZSwgYXMgZGVzY3JpYmVkIGFib3ZlXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX2Rlc2M6IHN0cmluZywgb3B0aW9ucz86IHtcbiAgICBwcm92aWRlZEluPzogVHlwZTxhbnk+fCdyb290J3wncGxhdGZvcm0nfCdhbnknfG51bGwsIGZhY3Rvcnk6ICgpID0+IFRcbiAgfSkge1xuICAgIHRoaXMuybVwcm92ID0gdW5kZWZpbmVkO1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PSAnbnVtYmVyJykge1xuICAgICAgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkgJiZcbiAgICAgICAgICBhc3NlcnRMZXNzVGhhbihvcHRpb25zLCAwLCAnT25seSBuZWdhdGl2ZSBudW1iZXJzIGFyZSBzdXBwb3J0ZWQgaGVyZScpO1xuICAgICAgLy8gVGhpcyBpcyBhIHNwZWNpYWwgaGFjayB0byBhc3NpZ24gX19OR19FTEVNRU5UX0lEX18gdG8gdGhpcyBpbnN0YW5jZS5cbiAgICAgIC8vIFNlZSBgSW5qZWN0b3JNYXJrZXJzYFxuICAgICAgKHRoaXMgYXMgYW55KS5fX05HX0VMRU1FTlRfSURfXyA9IG9wdGlvbnM7XG4gICAgfSBlbHNlIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuybVwcm92ID0gybXJtWRlZmluZUluamVjdGFibGUoe1xuICAgICAgICB0b2tlbjogdGhpcyxcbiAgICAgICAgcHJvdmlkZWRJbjogb3B0aW9ucy5wcm92aWRlZEluIHx8ICdyb290JyxcbiAgICAgICAgZmFjdG9yeTogb3B0aW9ucy5mYWN0b3J5LFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZ2V0IG11bHRpKCk6IEluamVjdGlvblRva2VuPEFycmF5PFQ+PiB7XG4gICAgcmV0dXJuIHRoaXMgYXMgSW5qZWN0aW9uVG9rZW48QXJyYXk8VD4+O1xuICB9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYEluamVjdGlvblRva2VuICR7dGhpcy5fZGVzY31gO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW5qZWN0YWJsZURlZlRva2VuPFQ+IGV4dGVuZHMgSW5qZWN0aW9uVG9rZW48VD4ge1xuICDJtXByb3Y6IHVua25vd247XG59XG4iXX0=