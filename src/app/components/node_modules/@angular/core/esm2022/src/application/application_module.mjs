/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '../metadata';
import { ApplicationRef } from './application_ref';
import * as i0 from "../r3_symbols";
import * as i1 from "./application_ref";
/**
 * Re-exported by `BrowserModule`, which is included automatically in the root
 * `AppModule` when you create a new app with the CLI `new` command. Eagerly injects
 * `ApplicationRef` to instantiate it.
 *
 * @publicApi
 */
export class ApplicationModule {
    // Inject ApplicationRef to make it eager...
    constructor(appRef) { }
    static { this.ɵfac = function ApplicationModule_Factory(t) { return new (t || ApplicationModule)(i0.ɵɵinject(i1.ApplicationRef)); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: ApplicationModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({}); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.setClassMetadata(ApplicationModule, [{
        type: NgModule
    }], () => [{ type: i1.ApplicationRef }], null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb25fbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvYXBwbGljYXRpb24vYXBwbGljYXRpb25fbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFckMsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDOzs7QUFFakQ7Ozs7OztHQU1HO0FBRUgsTUFBTSxPQUFPLGlCQUFpQjtJQUM1Qiw0Q0FBNEM7SUFDNUMsWUFBWSxNQUFzQixJQUFHLENBQUM7a0ZBRjNCLGlCQUFpQjttRUFBakIsaUJBQWlCOzs7Z0ZBQWpCLGlCQUFpQjtjQUQ3QixRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJy4uL21ldGFkYXRhJztcblxuaW1wb3J0IHtBcHBsaWNhdGlvblJlZn0gZnJvbSAnLi9hcHBsaWNhdGlvbl9yZWYnO1xuXG4vKipcbiAqIFJlLWV4cG9ydGVkIGJ5IGBCcm93c2VyTW9kdWxlYCwgd2hpY2ggaXMgaW5jbHVkZWQgYXV0b21hdGljYWxseSBpbiB0aGUgcm9vdFxuICogYEFwcE1vZHVsZWAgd2hlbiB5b3UgY3JlYXRlIGEgbmV3IGFwcCB3aXRoIHRoZSBDTEkgYG5ld2AgY29tbWFuZC4gRWFnZXJseSBpbmplY3RzXG4gKiBgQXBwbGljYXRpb25SZWZgIHRvIGluc3RhbnRpYXRlIGl0LlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQE5nTW9kdWxlKClcbmV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvbk1vZHVsZSB7XG4gIC8vIEluamVjdCBBcHBsaWNhdGlvblJlZiB0byBtYWtlIGl0IGVhZ2VyLi4uXG4gIGNvbnN0cnVjdG9yKGFwcFJlZjogQXBwbGljYXRpb25SZWYpIHt9XG59XG4iXX0=