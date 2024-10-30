/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { global } from '../util/global';
export * from './compiler_facade_interface';
export function getCompilerFacade(request) {
    const globalNg = global['ng'];
    if (globalNg && globalNg.ɵcompilerFacade) {
        return globalNg.ɵcompilerFacade;
    }
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
        // Log the type as an error so that a developer can easily navigate to the type from the
        // console.
        console.error(`JIT compilation failed for ${request.kind}`, request.type);
        let message = `The ${request.kind} '${request
            .type.name}' needs to be compiled using the JIT compiler, but '@angular/compiler' is not available.\n\n`;
        if (request.usage === 1 /* JitCompilerUsage.PartialDeclaration */) {
            message += `The ${request.kind} is part of a library that has been partially compiled.\n`;
            message +=
                `However, the Angular Linker has not processed the library such that JIT compilation is used as fallback.\n`;
            message += '\n';
            message +=
                `Ideally, the library is processed using the Angular Linker to become fully AOT compiled.\n`;
        }
        else {
            message +=
                `JIT compilation is discouraged for production use-cases! Consider using AOT mode instead.\n`;
        }
        message +=
            `Alternatively, the JIT compiler should be loaded by bootstrapping using '@angular/platform-browser-dynamic' or '@angular/platform-server',\n`;
        message +=
            `or manually provide the compiler with 'import "@angular/compiler";' before bootstrapping.`;
        throw new Error(message);
    }
    else {
        throw new Error('JIT compiler unavailable');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXJfZmFjYWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvY29tcGlsZXIvY29tcGlsZXJfZmFjYWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0QyxjQUFjLDZCQUE2QixDQUFDO0FBYTVDLE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxPQUFnQztJQUNoRSxNQUFNLFFBQVEsR0FBMkIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RELElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN6QyxPQUFPLFFBQVEsQ0FBQyxlQUFlLENBQUM7SUFDbEMsQ0FBQztJQUVELElBQUksT0FBTyxTQUFTLEtBQUssV0FBVyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQ2xELHdGQUF3RjtRQUN4RixXQUFXO1FBQ1gsT0FBTyxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUxRSxJQUFJLE9BQU8sR0FBRyxPQUFPLE9BQU8sQ0FBQyxJQUFJLEtBQzdCLE9BQU87YUFDRixJQUFJLENBQUMsSUFBSSw4RkFBOEYsQ0FBQztRQUNqSCxJQUFJLE9BQU8sQ0FBQyxLQUFLLGdEQUF3QyxFQUFFLENBQUM7WUFDMUQsT0FBTyxJQUFJLE9BQU8sT0FBTyxDQUFDLElBQUksMkRBQTJELENBQUM7WUFDMUYsT0FBTztnQkFDSCw0R0FBNEcsQ0FBQztZQUNqSCxPQUFPLElBQUksSUFBSSxDQUFDO1lBQ2hCLE9BQU87Z0JBQ0gsNEZBQTRGLENBQUM7UUFDbkcsQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPO2dCQUNILDZGQUE2RixDQUFDO1FBQ3BHLENBQUM7UUFDRCxPQUFPO1lBQ0gsOElBQThJLENBQUM7UUFDbkosT0FBTztZQUNILDJGQUEyRixDQUFDO1FBQ2hHLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0IsQ0FBQztTQUFNLENBQUM7UUFDTixNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7SUFDOUMsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7Z2xvYmFsfSBmcm9tICcuLi91dGlsL2dsb2JhbCc7XG5pbXBvcnQge0NvbXBpbGVyRmFjYWRlLCBFeHBvcnRlZENvbXBpbGVyRmFjYWRlLCBUeXBlfSBmcm9tICcuL2NvbXBpbGVyX2ZhY2FkZV9pbnRlcmZhY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21waWxlcl9mYWNhZGVfaW50ZXJmYWNlJztcblxuZXhwb3J0IGNvbnN0IGVudW0gSml0Q29tcGlsZXJVc2FnZSB7XG4gIERlY29yYXRvcixcbiAgUGFydGlhbERlY2xhcmF0aW9uLFxufVxuXG5pbnRlcmZhY2UgSml0Q29tcGlsZXJVc2FnZVJlcXVlc3Qge1xuICB1c2FnZTogSml0Q29tcGlsZXJVc2FnZTtcbiAga2luZDogJ2RpcmVjdGl2ZSd8J2NvbXBvbmVudCd8J3BpcGUnfCdpbmplY3RhYmxlJ3wnTmdNb2R1bGUnO1xuICB0eXBlOiBUeXBlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tcGlsZXJGYWNhZGUocmVxdWVzdDogSml0Q29tcGlsZXJVc2FnZVJlcXVlc3QpOiBDb21waWxlckZhY2FkZSB7XG4gIGNvbnN0IGdsb2JhbE5nOiBFeHBvcnRlZENvbXBpbGVyRmFjYWRlID0gZ2xvYmFsWyduZyddO1xuICBpZiAoZ2xvYmFsTmcgJiYgZ2xvYmFsTmcuybVjb21waWxlckZhY2FkZSkge1xuICAgIHJldHVybiBnbG9iYWxOZy7JtWNvbXBpbGVyRmFjYWRlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkge1xuICAgIC8vIExvZyB0aGUgdHlwZSBhcyBhbiBlcnJvciBzbyB0aGF0IGEgZGV2ZWxvcGVyIGNhbiBlYXNpbHkgbmF2aWdhdGUgdG8gdGhlIHR5cGUgZnJvbSB0aGVcbiAgICAvLyBjb25zb2xlLlxuICAgIGNvbnNvbGUuZXJyb3IoYEpJVCBjb21waWxhdGlvbiBmYWlsZWQgZm9yICR7cmVxdWVzdC5raW5kfWAsIHJlcXVlc3QudHlwZSk7XG5cbiAgICBsZXQgbWVzc2FnZSA9IGBUaGUgJHtyZXF1ZXN0LmtpbmR9ICcke1xuICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAudHlwZS5uYW1lfScgbmVlZHMgdG8gYmUgY29tcGlsZWQgdXNpbmcgdGhlIEpJVCBjb21waWxlciwgYnV0ICdAYW5ndWxhci9jb21waWxlcicgaXMgbm90IGF2YWlsYWJsZS5cXG5cXG5gO1xuICAgIGlmIChyZXF1ZXN0LnVzYWdlID09PSBKaXRDb21waWxlclVzYWdlLlBhcnRpYWxEZWNsYXJhdGlvbikge1xuICAgICAgbWVzc2FnZSArPSBgVGhlICR7cmVxdWVzdC5raW5kfSBpcyBwYXJ0IG9mIGEgbGlicmFyeSB0aGF0IGhhcyBiZWVuIHBhcnRpYWxseSBjb21waWxlZC5cXG5gO1xuICAgICAgbWVzc2FnZSArPVxuICAgICAgICAgIGBIb3dldmVyLCB0aGUgQW5ndWxhciBMaW5rZXIgaGFzIG5vdCBwcm9jZXNzZWQgdGhlIGxpYnJhcnkgc3VjaCB0aGF0IEpJVCBjb21waWxhdGlvbiBpcyB1c2VkIGFzIGZhbGxiYWNrLlxcbmA7XG4gICAgICBtZXNzYWdlICs9ICdcXG4nO1xuICAgICAgbWVzc2FnZSArPVxuICAgICAgICAgIGBJZGVhbGx5LCB0aGUgbGlicmFyeSBpcyBwcm9jZXNzZWQgdXNpbmcgdGhlIEFuZ3VsYXIgTGlua2VyIHRvIGJlY29tZSBmdWxseSBBT1QgY29tcGlsZWQuXFxuYDtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZSArPVxuICAgICAgICAgIGBKSVQgY29tcGlsYXRpb24gaXMgZGlzY291cmFnZWQgZm9yIHByb2R1Y3Rpb24gdXNlLWNhc2VzISBDb25zaWRlciB1c2luZyBBT1QgbW9kZSBpbnN0ZWFkLlxcbmA7XG4gICAgfVxuICAgIG1lc3NhZ2UgKz1cbiAgICAgICAgYEFsdGVybmF0aXZlbHksIHRoZSBKSVQgY29tcGlsZXIgc2hvdWxkIGJlIGxvYWRlZCBieSBib290c3RyYXBwaW5nIHVzaW5nICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMnIG9yICdAYW5ndWxhci9wbGF0Zm9ybS1zZXJ2ZXInLFxcbmA7XG4gICAgbWVzc2FnZSArPVxuICAgICAgICBgb3IgbWFudWFsbHkgcHJvdmlkZSB0aGUgY29tcGlsZXIgd2l0aCAnaW1wb3J0IFwiQGFuZ3VsYXIvY29tcGlsZXJcIjsnIGJlZm9yZSBib290c3RyYXBwaW5nLmA7XG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignSklUIGNvbXBpbGVyIHVuYXZhaWxhYmxlJyk7XG4gIH1cbn1cbiJdfQ==