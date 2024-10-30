/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { formatRuntimeError, RuntimeError } from '../../errors';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '../../metadata/schema';
import { throwError } from '../../util/assert';
import { getComponentDef } from '../definition';
import { CONTEXT, DECLARATION_COMPONENT_VIEW } from '../interfaces/view';
import { isAnimationProp } from '../util/attrs_utils';
let shouldThrowErrorOnUnknownElement = false;
/**
 * Sets a strict mode for JIT-compiled components to throw an error on unknown elements,
 * instead of just logging the error.
 * (for AOT-compiled ones this check happens at build time).
 */
export function ɵsetUnknownElementStrictMode(shouldThrow) {
    shouldThrowErrorOnUnknownElement = shouldThrow;
}
/**
 * Gets the current value of the strict mode.
 */
export function ɵgetUnknownElementStrictMode() {
    return shouldThrowErrorOnUnknownElement;
}
let shouldThrowErrorOnUnknownProperty = false;
/**
 * Sets a strict mode for JIT-compiled components to throw an error on unknown properties,
 * instead of just logging the error.
 * (for AOT-compiled ones this check happens at build time).
 */
export function ɵsetUnknownPropertyStrictMode(shouldThrow) {
    shouldThrowErrorOnUnknownProperty = shouldThrow;
}
/**
 * Gets the current value of the strict mode.
 */
export function ɵgetUnknownPropertyStrictMode() {
    return shouldThrowErrorOnUnknownProperty;
}
/**
 * Validates that the element is known at runtime and produces
 * an error if it's not the case.
 * This check is relevant for JIT-compiled components (for AOT-compiled
 * ones this check happens at build time).
 *
 * The element is considered known if either:
 * - it's a known HTML element
 * - it's a known custom element
 * - the element matches any directive
 * - the element is allowed by one of the schemas
 *
 * @param element Element to validate
 * @param lView An `LView` that represents a current component that is being rendered
 * @param tagName Name of the tag to check
 * @param schemas Array of schemas
 * @param hasDirectives Boolean indicating that the element matches any directive
 */
export function validateElementIsKnown(element, lView, tagName, schemas, hasDirectives) {
    // If `schemas` is set to `null`, that's an indication that this Component was compiled in AOT
    // mode where this check happens at compile time. In JIT mode, `schemas` is always present and
    // defined as an array (as an empty array in case `schemas` field is not defined) and we should
    // execute the check below.
    if (schemas === null)
        return;
    // If the element matches any directive, it's considered as valid.
    if (!hasDirectives && tagName !== null) {
        // The element is unknown if it's an instance of HTMLUnknownElement, or it isn't registered
        // as a custom element. Note that unknown elements with a dash in their name won't be instances
        // of HTMLUnknownElement in browsers that support web components.
        const isUnknown = 
        // Note that we can't check for `typeof HTMLUnknownElement === 'function'` because
        // Domino doesn't expose HTMLUnknownElement globally.
        (typeof HTMLUnknownElement !== 'undefined' && HTMLUnknownElement &&
            element instanceof HTMLUnknownElement) ||
            (typeof customElements !== 'undefined' && tagName.indexOf('-') > -1 &&
                !customElements.get(tagName));
        if (isUnknown && !matchingSchemas(schemas, tagName)) {
            const isHostStandalone = isHostComponentStandalone(lView);
            const templateLocation = getTemplateLocationDetails(lView);
            const schemas = `'${isHostStandalone ? '@Component' : '@NgModule'}.schemas'`;
            let message = `'${tagName}' is not a known element${templateLocation}:\n`;
            message += `1. If '${tagName}' is an Angular component, then verify that it is ${isHostStandalone ? 'included in the \'@Component.imports\' of this component' :
                'a part of an @NgModule where this component is declared'}.\n`;
            if (tagName && tagName.indexOf('-') > -1) {
                message +=
                    `2. If '${tagName}' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the ${schemas} of this component to suppress this message.`;
            }
            else {
                message +=
                    `2. To allow any element add 'NO_ERRORS_SCHEMA' to the ${schemas} of this component.`;
            }
            if (shouldThrowErrorOnUnknownElement) {
                throw new RuntimeError(304 /* RuntimeErrorCode.UNKNOWN_ELEMENT */, message);
            }
            else {
                console.error(formatRuntimeError(304 /* RuntimeErrorCode.UNKNOWN_ELEMENT */, message));
            }
        }
    }
}
/**
 * Validates that the property of the element is known at runtime and returns
 * false if it's not the case.
 * This check is relevant for JIT-compiled components (for AOT-compiled
 * ones this check happens at build time).
 *
 * The property is considered known if either:
 * - it's a known property of the element
 * - the element is allowed by one of the schemas
 * - the property is used for animations
 *
 * @param element Element to validate
 * @param propName Name of the property to check
 * @param tagName Name of the tag hosting the property
 * @param schemas Array of schemas
 */
export function isPropertyValid(element, propName, tagName, schemas) {
    // If `schemas` is set to `null`, that's an indication that this Component was compiled in AOT
    // mode where this check happens at compile time. In JIT mode, `schemas` is always present and
    // defined as an array (as an empty array in case `schemas` field is not defined) and we should
    // execute the check below.
    if (schemas === null)
        return true;
    // The property is considered valid if the element matches the schema, it exists on the element,
    // or it is synthetic.
    if (matchingSchemas(schemas, tagName) || propName in element || isAnimationProp(propName)) {
        return true;
    }
    // Note: `typeof Node` returns 'function' in most browsers, but is undefined with domino.
    return typeof Node === 'undefined' || Node === null || !(element instanceof Node);
}
/**
 * Logs or throws an error that a property is not supported on an element.
 *
 * @param propName Name of the invalid property
 * @param tagName Name of the tag hosting the property
 * @param nodeType Type of the node hosting the property
 * @param lView An `LView` that represents a current component
 */
export function handleUnknownPropertyError(propName, tagName, nodeType, lView) {
    // Special-case a situation when a structural directive is applied to
    // an `<ng-template>` element, for example: `<ng-template *ngIf="true">`.
    // In this case the compiler generates the `ɵɵtemplate` instruction with
    // the `null` as the tagName. The directive matching logic at runtime relies
    // on this effect (see `isInlineTemplate`), thus using the 'ng-template' as
    // a default value of the `tNode.value` is not feasible at this moment.
    if (!tagName && nodeType === 4 /* TNodeType.Container */) {
        tagName = 'ng-template';
    }
    const isHostStandalone = isHostComponentStandalone(lView);
    const templateLocation = getTemplateLocationDetails(lView);
    let message = `Can't bind to '${propName}' since it isn't a known property of '${tagName}'${templateLocation}.`;
    const schemas = `'${isHostStandalone ? '@Component' : '@NgModule'}.schemas'`;
    const importLocation = isHostStandalone ?
        'included in the \'@Component.imports\' of this component' :
        'a part of an @NgModule where this component is declared';
    if (KNOWN_CONTROL_FLOW_DIRECTIVES.has(propName)) {
        // Most likely this is a control flow directive (such as `*ngIf`) used in
        // a template, but the directive or the `CommonModule` is not imported.
        const correspondingImport = KNOWN_CONTROL_FLOW_DIRECTIVES.get(propName);
        message += `\nIf the '${propName}' is an Angular control flow directive, ` +
            `please make sure that either the '${correspondingImport}' directive or the 'CommonModule' is ${importLocation}.`;
    }
    else {
        // May be an Angular component, which is not imported/declared?
        message += `\n1. If '${tagName}' is an Angular component and it has the ` +
            `'${propName}' input, then verify that it is ${importLocation}.`;
        // May be a Web Component?
        if (tagName && tagName.indexOf('-') > -1) {
            message += `\n2. If '${tagName}' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' ` +
                `to the ${schemas} of this component to suppress this message.`;
            message += `\n3. To allow any property add 'NO_ERRORS_SCHEMA' to ` +
                `the ${schemas} of this component.`;
        }
        else {
            // If it's expected, the error can be suppressed by the `NO_ERRORS_SCHEMA` schema.
            message += `\n2. To allow any property add 'NO_ERRORS_SCHEMA' to ` +
                `the ${schemas} of this component.`;
        }
    }
    reportUnknownPropertyError(message);
}
export function reportUnknownPropertyError(message) {
    if (shouldThrowErrorOnUnknownProperty) {
        throw new RuntimeError(303 /* RuntimeErrorCode.UNKNOWN_BINDING */, message);
    }
    else {
        console.error(formatRuntimeError(303 /* RuntimeErrorCode.UNKNOWN_BINDING */, message));
    }
}
/**
 * WARNING: this is a **dev-mode only** function (thus should always be guarded by the `ngDevMode`)
 * and must **not** be used in production bundles. The function makes megamorphic reads, which might
 * be too slow for production mode and also it relies on the constructor function being available.
 *
 * Gets a reference to the host component def (where a current component is declared).
 *
 * @param lView An `LView` that represents a current component that is being rendered.
 */
export function getDeclarationComponentDef(lView) {
    !ngDevMode && throwError('Must never be called in production mode');
    const declarationLView = lView[DECLARATION_COMPONENT_VIEW];
    const context = declarationLView[CONTEXT];
    // Unable to obtain a context.
    if (!context)
        return null;
    return context.constructor ? getComponentDef(context.constructor) : null;
}
/**
 * WARNING: this is a **dev-mode only** function (thus should always be guarded by the `ngDevMode`)
 * and must **not** be used in production bundles. The function makes megamorphic reads, which might
 * be too slow for production mode.
 *
 * Checks if the current component is declared inside of a standalone component template.
 *
 * @param lView An `LView` that represents a current component that is being rendered.
 */
export function isHostComponentStandalone(lView) {
    !ngDevMode && throwError('Must never be called in production mode');
    const componentDef = getDeclarationComponentDef(lView);
    // Treat host component as non-standalone if we can't obtain the def.
    return !!componentDef?.standalone;
}
/**
 * WARNING: this is a **dev-mode only** function (thus should always be guarded by the `ngDevMode`)
 * and must **not** be used in production bundles. The function makes megamorphic reads, which might
 * be too slow for production mode.
 *
 * Constructs a string describing the location of the host component template. The function is used
 * in dev mode to produce error messages.
 *
 * @param lView An `LView` that represents a current component that is being rendered.
 */
export function getTemplateLocationDetails(lView) {
    !ngDevMode && throwError('Must never be called in production mode');
    const hostComponentDef = getDeclarationComponentDef(lView);
    const componentClassName = hostComponentDef?.type?.name;
    return componentClassName ? ` (used in the '${componentClassName}' component template)` : '';
}
/**
 * The set of known control flow directives and their corresponding imports.
 * We use this set to produce a more precises error message with a note
 * that the `CommonModule` should also be included.
 */
export const KNOWN_CONTROL_FLOW_DIRECTIVES = new Map([
    ['ngIf', 'NgIf'], ['ngFor', 'NgFor'], ['ngSwitchCase', 'NgSwitchCase'],
    ['ngSwitchDefault', 'NgSwitchDefault']
]);
/**
 * Returns true if the tag name is allowed by specified schemas.
 * @param schemas Array of schemas
 * @param tagName Name of the tag
 */
export function matchingSchemas(schemas, tagName) {
    if (schemas !== null) {
        for (let i = 0; i < schemas.length; i++) {
            const schema = schemas[i];
            if (schema === NO_ERRORS_SCHEMA ||
                schema === CUSTOM_ELEMENTS_SCHEMA && tagName && tagName.indexOf('-') > -1) {
                return true;
            }
        }
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudF92YWxpZGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9pbnN0cnVjdGlvbnMvZWxlbWVudF92YWxpZGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxZQUFZLEVBQW1CLE1BQU0sY0FBYyxDQUFDO0FBRWhGLE9BQU8sRUFBQyxzQkFBc0IsRUFBRSxnQkFBZ0IsRUFBaUIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvRixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDN0MsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUk5QyxPQUFPLEVBQUMsT0FBTyxFQUFFLDBCQUEwQixFQUFRLE1BQU0sb0JBQW9CLENBQUM7QUFDOUUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRXBELElBQUksZ0NBQWdDLEdBQUcsS0FBSyxDQUFDO0FBRTdDOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsNEJBQTRCLENBQUMsV0FBb0I7SUFDL0QsZ0NBQWdDLEdBQUcsV0FBVyxDQUFDO0FBQ2pELENBQUM7QUFFRDs7R0FFRztBQUNILE1BQU0sVUFBVSw0QkFBNEI7SUFDMUMsT0FBTyxnQ0FBZ0MsQ0FBQztBQUMxQyxDQUFDO0FBRUQsSUFBSSxpQ0FBaUMsR0FBRyxLQUFLLENBQUM7QUFFOUM7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSw2QkFBNkIsQ0FBQyxXQUFvQjtJQUNoRSxpQ0FBaUMsR0FBRyxXQUFXLENBQUM7QUFDbEQsQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxVQUFVLDZCQUE2QjtJQUMzQyxPQUFPLGlDQUFpQyxDQUFDO0FBQzNDLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxNQUFNLFVB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TSxLQUFLLGdCQUFnQjtnQkFDM0IsTUFBTSxLQUFLLHNCQUFzQixJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQzlFLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Zm9ybWF0UnVudGltZUVycm9yLCBSdW50aW1lRXJyb3IsIFJ1bnRpbWVFcnJvckNvZGV9IGZyb20gJy4uLy4uL2Vycm9ycyc7XG5pbXBvcnQge1R5cGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS90eXBlJztcbmltcG9ydCB7Q1VTVE9NX0VMRU1FTlRTX1NDSEVNQSwgTk9fRVJST1JTX1NDSEVNQSwgU2NoZW1hTWV0YWRhdGF9IGZyb20gJy4uLy4uL21ldGFkYXRhL3NjaGVtYSc7XG5pbXBvcnQge3Rocm93RXJyb3J9IGZyb20gJy4uLy4uL3V0aWwvYXNzZXJ0JztcbmltcG9ydCB7Z2V0Q29tcG9uZW50RGVmfSBmcm9tICcuLi9kZWZpbml0aW9uJztcbmltcG9ydCB7Q29tcG9uZW50RGVmfSBmcm9tICcuLi9pbnRlcmZhY2VzL2RlZmluaXRpb24nO1xuaW1wb3J0IHtUTm9kZVR5cGV9IGZyb20gJy4uL2ludGVyZmFjZXMvbm9kZSc7XG5pbXBvcnQge1JDb21tZW50LCBSRWxlbWVudH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZW5kZXJlcl9kb20nO1xuaW1wb3J0IHtDT05URVhULCBERUNMQVJBVElPTl9DT01QT05FTlRfVklFVywgTFZpZXd9IGZyb20gJy4uL2ludGVyZmFjZXMvdmlldyc7XG5pbXBvcnQge2lzQW5pbWF0aW9uUHJvcH0gZnJvbSAnLi4vdXRpbC9hdHRyc191dGlscyc7XG5cbmxldCBzaG91bGRUaHJvd0Vycm9yT25Vbmtub3duRWxlbWVudCA9IGZhbHNlO1xuXG4vKipcbiAqIFNldHMgYSBzdHJpY3QgbW9kZSBmb3IgSklULWNvbXBpbGVkIGNvbXBvbmVudHMgdG8gdGhyb3cgYW4gZXJyb3Igb24gdW5rbm93biBlbGVtZW50cyxcbiAqIGluc3RlYWQgb2YganVzdCBsb2dnaW5nIHRoZSBlcnJvci5cbiAqIChmb3IgQU9ULWNvbXBpbGVkIG9uZXMgdGhpcyBjaGVjayBoYXBwZW5zIGF0IGJ1aWxkIHRpbWUpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gybVzZXRVbmtub3duRWxlbWVudFN0cmljdE1vZGUoc2hvdWxkVGhyb3c6IGJvb2xlYW4pIHtcbiAgc2hvdWxkVGhyb3dFcnJvck9uVW5rbm93bkVsZW1lbnQgPSBzaG91bGRUaHJvdztcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBjdXJyZW50IHZhbHVlIG9mIHRoZSBzdHJpY3QgbW9kZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1Z2V0VW5rbm93bkVsZW1lbnRTdHJpY3RNb2RlKCkge1xuICByZXR1cm4gc2hvdWxkVGhyb3dFcnJvck9uVW5rbm93bkVsZW1lbnQ7XG59XG5cbmxldCBzaG91bGRUaHJvd0Vycm9yT25Vbmtub3duUHJvcGVydHkgPSBmYWxzZTtcblxuLyoqXG4gKiBTZXRzIGEgc3RyaWN0IG1vZGUgZm9yIEpJVC1jb21waWxlZCBjb21wb25lbnRzIHRvIHRocm93IGFuIGVycm9yIG9uIHVua25vd24gcHJvcGVydGllcyxcbiAqIGluc3RlYWQgb2YganVzdCBsb2dnaW5nIHRoZSBlcnJvci5cbiAqIChmb3IgQU9ULWNvbXBpbGVkIG9uZXMgdGhpcyBjaGVjayBoYXBwZW5zIGF0IGJ1aWxkIHRpbWUpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gybVzZXRVbmtub3duUHJvcGVydHlTdHJpY3RNb2RlKHNob3VsZFRocm93OiBib29sZWFuKSB7XG4gIHNob3VsZFRocm93RXJyb3JPblVua25vd25Qcm9wZXJ0eSA9IHNob3VsZFRocm93O1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGN1cnJlbnQgdmFsdWUgb2YgdGhlIHN0cmljdCBtb2RlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gybVnZXRVbmtub3duUHJvcGVydHlTdHJpY3RNb2RlKCkge1xuICByZXR1cm4gc2hvdWxkVGhyb3dFcnJvck9uVW5rbm93blByb3BlcnR5O1xufVxuXG4vKipcbiAqIFZhbGlkYXRlcyB0aGF0IHRoZSBlbGVtZW50IGlzIGtub3duIGF0IHJ1bnRpbWUgYW5kIHByb2R1Y2VzXG4gKiBhbiBlcnJvciBpZiBpdCdzIG5vdCB0aGUgY2FzZS5cbiAqIFRoaXMgY2hlY2sgaXMgcmVsZXZhbnQgZm9yIEpJVC1jb21waWxlZCBjb21wb25lbnRzIChmb3IgQU9ULWNvbXBpbGVkXG4gKiBvbmVzIHRoaXMgY2hlY2sgaGFwcGVucyBhdCBidWlsZCB0aW1lKS5cbiAqXG4gKiBUaGUgZWxlbWVudCBpcyBjb25zaWRlcmVkIGtub3duIGlmIGVpdGhlcjpcbiAqIC0gaXQncyBhIGtub3duIEhUTUwgZWxlbWVudFxuICogLSBpdCdzIGEga25vd24gY3VzdG9tIGVsZW1lbnRcbiAqIC0gdGhlIGVsZW1lbnQgbWF0Y2hlcyBhbnkgZGlyZWN0aXZlXG4gKiAtIHRoZSBlbGVtZW50IGlzIGFsbG93ZWQgYnkgb25lIG9mIHRoZSBzY2hlbWFzXG4gKlxuICogQHBhcmFtIGVsZW1lbnQgRWxlbWVudCB0byB2YWxpZGF0ZVxuICogQHBhcmFtIGxWaWV3IEFuIGBMVmlld2AgdGhhdCByZXByZXNlbnRzIGEgY3VycmVudCBjb21wb25lbnQgdGhhdCBpcyBiZWluZyByZW5kZXJlZFxuICogQHBhcmFtIHRhZ05hbWUgTmFtZSBvZiB0aGUgdGFnIHRvIGNoZWNrXG4gKiBAcGFyYW0gc2NoZW1hcyBBcnJheSBvZiBzY2hlbWFzXG4gKiBAcGFyYW0gaGFzRGlyZWN0aXZlcyBCb29sZWFuIGluZGljYXRpbmcgdGhhdCB0aGUgZWxlbWVudCBtYXRjaGVzIGFueSBkaXJlY3RpdmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlRWxlbWVudElzS25vd24oXG4gICAgZWxlbWVudDogUkVsZW1lbnQsIGxWaWV3OiBMVmlldywgdGFnTmFtZTogc3RyaW5nfG51bGwsIHNjaGVtYXM6IFNjaGVtYU1ldGFkYXRhW118bnVsbCxcbiAgICBoYXNEaXJlY3RpdmVzOiBib29sZWFuKTogdm9pZCB7XG4gIC8vIElmIGBzY2hlbWFzYCBpcyBzZXQgdG8gYG51bGxgLCB0aGF0J3MgYW4gaW5kaWNhdGlvbiB0aGF0IHRoaXMgQ29tcG9uZW50IHdhcyBjb21waWxlZCBpbiBBT1RcbiAgLy8gbW9kZSB3aGVyZSB0aGlzIGNoZWNrIGhhcHBlbnMgYXQgY29tcGlsZSB0aW1lLiBJbiBKSVQgbW9kZSwgYHNjaGVtYXNgIGlzIGFsd2F5cyBwcmVzZW50IGFuZFxuICAvLyBkZWZpbmVkIGFzIGFuIGFycmF5IChhcyBhbiBlbXB0eSBhcnJheSBpbiBjYXNlIGBzY2hlbWFzYCBmaWVsZCBpcyBub3QgZGVmaW5lZCkgYW5kIHdlIHNob3VsZFxuICAvLyBleGVjdXRlIHRoZSBjaGVjayBiZWxvdy5cbiAgaWYgKHNjaGVtYXMgPT09IG51bGwpIHJldHVybjtcblxuICAvLyBJZiB0aGUgZWxlbWVudCBtYXRjaGVzIGFueSBkaXJlY3RpdmUsIGl0J3MgY29uc2lkZXJlZCBhcyB2YWxpZC5cbiAgaWYgKCFoYXNEaXJlY3RpdmVzICYmIHRhZ05hbWUgIT09IG51bGwpIHtcbiAgICAvLyBUaGUgZWxlbWVudCBpcyB1bmtub3duIGlmIGl0J3MgYW4gaW5zdGFuY2Ugb2YgSFRNTFVua25vd25FbGVtZW50LCBvciBpdCBpc24ndCByZWdpc3RlcmVkXG4gICAgLy8gYXMgYSBjdXN0b20gZWxlbWVudC4gTm90ZSB0aGF0IHVua25vd24gZWxlbWVudHMgd2l0aCBhIGRhc2ggaW4gdGhlaXIgbmFtZSB3b24ndCBiZSBpbnN0YW5jZXNcbiAgICAvLyBvZiBIVE1MVW5rbm93bkVsZW1lbnQgaW4gYnJvd3NlcnMgdGhhdCBzdXBwb3J0IHdlYiBjb21wb25lbnRzLlxuICAgIGNvbnN0IGlzVW5rbm93biA9XG4gICAgICAgIC8vIE5vdGUgdGhhdCB3ZSBjYW4ndCBjaGVjayBmb3IgYHR5cGVvZiBIVE1MVW5rbm93bkVsZW1lbnQgPT09ICdmdW5jdGlvbidgIGJlY2F1c2VcbiAgICAgICAgLy8gRG9taW5vIGRvZXNuJ3QgZXhwb3NlIEhUTUxVbmtub3duRWxlbWVudCBnbG9iYWxseS5cbiAgICAgICAgKHR5cGVvZiBIVE1MVW5rbm93bkVsZW1lbnQgIT09ICd1bmRlZmluZWQnICYmIEhUTUxVbmtub3duRWxlbWVudCAmJlxuICAgICAgICAgZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxVbmtub3duRWxlbWVudCkgfHxcbiAgICAgICAgKHR5cGVvZiBjdXN0b21FbGVtZW50cyAhPT0gJ3VuZGVmaW5lZCcgJiYgdGFnTmFtZS5pbmRleE9mKCctJykgPiAtMSAmJlxuICAgICAgICAgIWN1c3RvbUVsZW1lbnRzLmdldCh0YWdOYW1lKSk7XG5cbiAgICBpZiAoaXNVbmtub3duICYmICFtYXRjaGluZ1NjaGVtYXMoc2NoZW1hcywgdGFnTmFtZSkpIHtcbiAgICAgIGNvbnN0IGlzSG9zdFN0YW5kYWxvbmUgPSBpc0hvc3RDb21wb25lbnRTdGFuZGFsb25lKGxWaWV3KTtcbiAgICAgIGNvbnN0IHRlbXBsYXRlTG9jYXRpb24gPSBnZXRUZW1wbGF0ZUxvY2F0aW9uRGV0YWlscyhsVmlldyk7XG4gICAgICBjb25zdCBzY2hlbWFzID0gYCcke2lzSG9zdFN0YW5kYWxvbmUgPyAnQENvbXBvbmVudCcgOiAnQE5nTW9kdWxlJ30uc2NoZW1hcydgO1xuXG4gICAgICBsZXQgbWVzc2FnZSA9IGAnJHt0YWdOYW1lfScgaXMgbm90IGEga25vd24gZWxlbWVudCR7dGVtcGxhdGVMb2NhdGlvbn06XFxuYDtcbiAgICAgIG1lc3NhZ2UgKz0gYDEuIElmICcke3RhZ05hbWV9JyBpcyBhbiBBbmd1bGFyIGNvbXBvbmVudCwgdGhlbiB2ZXJpZnkgdGhhdCBpdCBpcyAke1xuICAgICAgICAgIGlzSG9zdFN0YW5kYWxvbmUgPyAnaW5jbHVkZWQgaW4gdGhlIFxcJ0BDb21wb25lbnQuaW1wb3J0c1xcJyBvZiB0aGlzIGNvbXBvbmVudCcgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYSBwYXJ0IG9mIGFuIEBOZ01vZHVsZSB3aGVyZSB0aGlzIGNvbXBvbmVudCBpcyBkZWNsYXJlZCd9LlxcbmA7XG4gICAgICBpZiAodGFnTmFtZSAmJiB0YWdOYW1lLmluZGV4T2YoJy0nKSA+IC0xKSB7XG4gICAgICAgIG1lc3NhZ2UgKz1cbiAgICAgICAgICAgIGAyLiBJZiAnJHt0YWdOYW1lfScgaXMgYSBXZWIgQ29tcG9uZW50IHRoZW4gYWRkICdDVVNUT01fRUxFTUVOVFNfU0NIRU1BJyB0byB0aGUgJHtcbiAgICAgICAgICAgICAgICBzY2hlbWFzfSBvZiB0aGlzIGNvbXBvbmVudCB0byBzdXBwcmVzcyB0aGlzIG1lc3NhZ2UuYDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1lc3NhZ2UgKz1cbiAgICAgICAgICAgIGAyLiBUbyBhbGxvdyBhbnkgZWxlbWVudCBhZGQgJ05PX0VSUk9SU19TQ0hFTUEnIHRvIHRoZSAke3NjaGVtYXN9IG9mIHRoaXMgY29tcG9uZW50LmA7XG4gICAgICB9XG4gICAgICBpZiAoc2hvdWxkVGhyb3dFcnJvck9uVW5rbm93bkVsZW1lbnQpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJ1bnRpbWVFcnJvcihSdW50aW1lRXJyb3JDb2RlLlVOS05PV05fRUxFTUVOVCwgbWVzc2FnZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1hdFJ1bnRpbWVFcnJvcihSdW50aW1lRXJyb3JDb2RlLlVOS05PV05fRUxFTUVOVCwgbWVzc2FnZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFZhbGlkYXRlcyB0aGF0IHRoZSBwcm9wZXJ0eSBvZiB0aGUgZWxlbWVudCBpcyBrbm93biBhdCBydW50aW1lIGFuZCByZXR1cm5zXG4gKiBmYWxzZSBpZiBpdCdzIG5vdCB0aGUgY2FzZS5cbiAqIFRoaXMgY2hlY2sgaXMgcmVsZXZhbnQgZm9yIEpJVC1jb21waWxlZCBjb21wb25lbnRzIChmb3IgQU9ULWNvbXBpbGVkXG4gKiBvbmVzIHRoaXMgY2hlY2sgaGFwcGVucyBhdCBidWlsZCB0aW1lKS5cbiAqXG4gKiBUaGUgcHJvcGVydHkgaXMgY29uc2lkZXJlZCBrbm93biBpZiBlaXRoZXI6XG4gKiAtIGl0J3MgYSBrbm93biBwcm9wZXJ0eSBvZiB0aGUgZWxlbWVudFxuICogLSB0aGUgZWxlbWVudCBpcyBhbGxvd2VkIGJ5IG9uZSBvZiB0aGUgc2NoZW1hc1xuICogLSB0aGUgcHJvcGVydHkgaXMgdXNlZCBmb3IgYW5pbWF0aW9uc1xuICpcbiAqIEBwYXJhbSBlbGVtZW50IEVsZW1lbnQgdG8gdmFsaWRhdGVcbiAqIEBwYXJhbSBwcm9wTmFtZSBOYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBjaGVja1xuICogQHBhcmFtIHRhZ05hbWUgTmFtZSBvZiB0aGUgdGFnIGhvc3RpbmcgdGhlIHByb3BlcnR5XG4gKiBAcGFyYW0gc2NoZW1hcyBBcnJheSBvZiBzY2hlbWFzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1Byb3BlcnR5VmFsaWQoXG4gICAgZWxlbWVudDogUkVsZW1lbnR8UkNvbW1lbnQsIHByb3BOYW1lOiBzdHJpbmcsIHRhZ05hbWU6IHN0cmluZ3xudWxsLFxuICAgIHNjaGVtYXM6IFNjaGVtYU1ldGFkYXRhW118bnVsbCk6IGJvb2xlYW4ge1xuICAvLyBJZiBgc2NoZW1hc2AgaXMgc2V0IHRvIGBudWxsYCwgdGhhdCdzIGFuIGluZGljYXRpb24gdGhhdCB0aGlzIENvbXBvbmVudCB3YXMgY29tcGlsZWQgaW4gQU9UXG4gIC8vIG1vZGUgd2hlcmUgdGhpcyBjaGVjayBoYXBwZW5zIGF0IGNvbXBpbGUgdGltZS4gSW4gSklUIG1vZGUsIGBzY2hlbWFzYCBpcyBhbHdheXMgcHJlc2VudCBhbmRcbiAgLy8gZGVmaW5lZCBhcyBhbiBhcnJheSAoYXMgYW4gZW1wdHkgYXJyYXkgaW4gY2FzZSBgc2NoZW1hc2AgZmllbGQgaXMgbm90IGRlZmluZWQpIGFuZCB3ZSBzaG91bGRcbiAgLy8gZXhlY3V0ZSB0aGUgY2hlY2sgYmVsb3cuXG4gIGlmIChzY2hlbWFzID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcblxuICAvLyBUaGUgcHJvcGVydHkgaXMgY29uc2lkZXJlZCB2YWxpZCBpZiB0aGUgZWxlbWVudCBtYXRjaGVzIHRoZSBzY2hlbWEsIGl0IGV4aXN0cyBvbiB0aGUgZWxlbWVudCxcbiAgLy8gb3IgaXQgaXMgc3ludGhldGljLlxuICBpZiAobWF0Y2hpbmdTY2hlbWFzKHNjaGVtYXMsIHRhZ05hbWUpIHx8IHByb3BOYW1lIGluIGVsZW1lbnQgfHwgaXNBbmltYXRpb25Qcm9wKHByb3BOYW1lKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gTm90ZTogYHR5cGVvZiBOb2RlYCByZXR1cm5zICdmdW5jdGlvbicgaW4gbW9zdCBicm93c2VycywgYnV0IGlzIHVuZGVmaW5lZCB3aXRoIGRvbWluby5cbiAgcmV0dXJuIHR5cGVvZiBOb2RlID09PSAndW5kZWZpbmVkJyB8fCBOb2RlID09PSBudWxsIHx8ICEoZWxlbWVudCBpbnN0YW5jZW9mIE5vZGUpO1xufVxuXG4vKipcbiAqIExvZ3Mgb3IgdGhyb3dzIGFuIGVycm9yIHRoYXQgYSBwcm9wZXJ0eSBpcyBub3Qgc3VwcG9ydGVkIG9uIGFuIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtIHByb3BOYW1lIE5hbWUgb2YgdGhlIGludmFsaWQgcHJvcGVydHlcbiAqIEBwYXJhbSB0YWdOYW1lIE5hbWUgb2YgdGhlIHRhZyBob3N0aW5nIHRoZSBwcm9wZXJ0eVxuICogQHBhcmFtIG5vZGVUeXBlIFR5cGUgb2YgdGhlIG5vZGUgaG9zdGluZyB0aGUgcHJvcGVydHlcbiAqIEBwYXJhbSBsVmlldyBBbiBgTFZpZXdgIHRoYXQgcmVwcmVzZW50cyBhIGN1cnJlbnQgY29tcG9uZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVVbmtub3duUHJvcGVydHlFcnJvcihcbiAgICBwcm9wTmFtZTogc3RyaW5nLCB0YWdOYW1lOiBzdHJpbmd8bnVsbCwgbm9kZVR5cGU6IFROb2RlVHlwZSwgbFZpZXc6IExWaWV3KTogdm9pZCB7XG4gIC8vIFNwZWNpYWwtY2FzZSBhIHNpdHVhdGlvbiB3aGVuIGEgc3RydWN0dXJhbCBkaXJlY3RpdmUgaXMgYXBwbGllZCB0b1xuICAvLyBhbiBgPG5nLXRlbXBsYXRlPmAgZWxlbWVudCwgZm9yIGV4YW1wbGU6IGA8bmctdGVtcGxhdGUgKm5nSWY9XCJ0cnVlXCI+YC5cbiAgLy8gSW4gdGhpcyBjYXNlIHRoZSBjb21waWxlciBnZW5lcmF0ZXMgdGhlIGDJtcm1dGVtcGxhdGVgIGluc3RydWN0aW9uIHdpdGhcbiAgLy8gdGhlIGBudWxsYCBhcyB0aGUgdGFnTmFtZS4gVGhlIGRpcmVjdGl2ZSBtYXRjaGluZyBsb2dpYyBhdCBydW50aW1lIHJlbGllc1xuICAvLyBvbiB0aGlzIGVmZmVjdCAoc2VlIGBpc0lubGluZVRlbXBsYXRlYCksIHRodXMgdXNpbmcgdGhlICduZy10ZW1wbGF0ZScgYXNcbiAgLy8gYSBkZWZhdWx0IHZhbHVlIG9mIHRoZSBgdE5vZGUudmFsdWVgIGlzIG5vdCBmZWFzaWJsZSBhdCB0aGlzIG1vbWVudC5cbiAgaWYgKCF0YWdOYW1lICYmIG5vZGVUeXBlID09PSBUTm9kZVR5cGUuQ29udGFpbmVyKSB7XG4gICAgdGFnTmFtZSA9ICduZy10ZW1wbGF0ZSc7XG4gIH1cblxuICBjb25zdCBpc0hvc3RTdGFuZGFsb25lID0gaXNIb3N0Q29tcG9uZW50U3RhbmRhbG9uZShsVmlldyk7XG4gIGNvbnN0IHRlbXBsYXRlTG9jYXRpb24gPSBnZXRUZW1wbGF0ZUxvY2F0aW9uRGV0YWlscyhsVmlldyk7XG5cbiAgbGV0IG1lc3NhZ2UgPSBgQ2FuJ3QgYmluZCB0byAnJHtwcm9wTmFtZX0nIHNpbmNlIGl0IGlzbid0IGEga25vd24gcHJvcGVydHkgb2YgJyR7dGFnTmFtZX0nJHtcbiAgICAgIHRlbXBsYXRlTG9jYXRpb259LmA7XG5cbiAgY29uc3Qgc2NoZW1hcyA9IGAnJHtpc0hvc3RTdGFuZGFsb25lID8gJ0BDb21wb25lbnQnIDogJ0BOZ01vZHVsZSd9LnNjaGVtYXMnYDtcbiAgY29uc3QgaW1wb3J0TG9jYXRpb24gPSBpc0hvc3RTdGFuZGFsb25lID9cbiAgICAgICdpbmNsdWRlZCBpbiB0aGUgXFwnQENvbXBvbmVudC5pbXBvcnRzXFwnIG9mIHRoaXMgY29tcG9uZW50JyA6XG4gICAgICAnYSBwYXJ0IG9mIGFuIEBOZ01vZHVsZSB3aGVyZSB0aGlzIGNvbXBvbmVudCBpcyBkZWNsYXJlZCc7XG4gIGlmIChLTk9XTl9DT05UUk9MX0ZMT1dfRElSRUNUSVZFUy5oYXMocHJvcE5hbWUpKSB7XG4gICAgLy8gTW9zdCBsaWtlbHkgdGhpcyBpcyBhIGNvbnRyb2wgZmxvdyBkaXJlY3RpdmUgKHN1Y2ggYXMgYCpuZ0lmYCkgdXNlZCBpblxuICAgIC8vIGEgdGVtcGxhdGUsIGJ1dCB0aGUgZGlyZWN0aXZlIG9yIHRoZSBgQ29tbW9uTW9kdWxlYCBpcyBub3QgaW1wb3J0ZWQuXG4gICAgY29uc3QgY29ycmVzcG9uZGluZ0ltcG9ydCA9IEtOT1dOX0NPTlRST0xfRkxPV19ESVJFQ1RJVkVTLmdldChwcm9wTmFtZSk7XG4gICAgbWVzc2FnZSArPSBgXFxuSWYgdGhlICcke3Byb3BOYW1lfScgaXMgYW4gQW5ndWxhciBjb250cm9sIGZsb3cgZGlyZWN0aXZlLCBgICtcbiAgICAgICAgYHBsZWFzZSBtYWtlIHN1cmUgdGhhdCBlaXRoZXIgdGhlICcke1xuICAgICAgICAgICAgICAgICAgIGNvcnJlc3BvbmRpbmdJbXBvcnR9JyBkaXJlY3RpdmUgb3IgdGhlICdDb21tb25Nb2R1bGUnIGlzICR7aW1wb3J0TG9jYXRpb259LmA7XG4gIH0gZWxzZSB7XG4gICAgLy8gTWF5IGJlIGFuIEFuZ3VsYXIgY29tcG9uZW50LCB3aGljaCBpcyBub3QgaW1wb3J0ZWQvZGVjbGFyZWQ/XG4gICAgbWVzc2FnZSArPSBgXFxuMS4gSWYgJyR7dGFnTmFtZX0nIGlzIGFuIEFuZ3VsYXIgY29tcG9uZW50IGFuZCBpdCBoYXMgdGhlIGAgK1xuICAgICAgICBgJyR7cHJvcE5hbWV9JyBpbnB1dCwgdGhlbiB2ZXJpZnkgdGhhdCBpdCBpcyAke2ltcG9ydExvY2F0aW9ufS5gO1xuICAgIC8vIE1heSBiZSBhIFdlYiBDb21wb25lbnQ/XG4gICAgaWYgKHRhZ05hbWUgJiYgdGFnTmFtZS5pbmRleE9mKCctJykgPiAtMSkge1xuICAgICAgbWVzc2FnZSArPSBgXFxuMi4gSWYgJyR7dGFnTmFtZX0nIGlzIGEgV2ViIENvbXBvbmVudCB0aGVuIGFkZCAnQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQScgYCArXG4gICAgICAgICAgYHRvIHRoZSAke3NjaGVtYXN9IG9mIHRoaXMgY29tcG9uZW50IHRvIHN1cHByZXNzIHRoaXMgbWVzc2FnZS5gO1xuICAgICAgbWVzc2FnZSArPSBgXFxuMy4gVG8gYWxsb3cgYW55IHByb3BlcnR5IGFkZCAnTk9fRVJST1JTX1NDSEVNQScgdG8gYCArXG4gICAgICAgICAgYHRoZSAke3NjaGVtYXN9IG9mIHRoaXMgY29tcG9uZW50LmA7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIGl0J3MgZXhwZWN0ZWQsIHRoZSBlcnJvciBjYW4gYmUgc3VwcHJlc3NlZCBieSB0aGUgYE5PX0VSUk9SU19TQ0hFTUFgIHNjaGVtYS5cbiAgICAgIG1lc3NhZ2UgKz0gYFxcbjIuIFRvIGFsbG93IGFueSBwcm9wZXJ0eSBhZGQgJ05PX0VSUk9SU19TQ0hFTUEnIHRvIGAgK1xuICAgICAgICAgIGB0aGUgJHtzY2hlbWFzfSBvZiB0aGlzIGNvbXBvbmVudC5gO1xuICAgIH1cbiAgfVxuXG4gIHJlcG9ydFVua25vd25Qcm9wZXJ0eUVycm9yKG1lc3NhZ2UpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwb3J0VW5rbm93blByb3BlcnR5RXJyb3IobWVzc2FnZTogc3RyaW5nKSB7XG4gIGlmIChzaG91bGRUaHJvd0Vycm9yT25Vbmtub3duUHJvcGVydHkpIHtcbiAgICB0aHJvdyBuZXcgUnVudGltZUVycm9yKFJ1bnRpbWVFcnJvckNvZGUuVU5LTk9XTl9CSU5ESU5HLCBtZXNzYWdlKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKGZvcm1hdFJ1bnRpbWVFcnJvcihSdW50aW1lRXJyb3JDb2RlLlVOS05PV05fQklORElORywgbWVzc2FnZSkpO1xuICB9XG59XG5cbi8qKlxuICogV0FSTklORzogdGhpcyBpcyBhICoqZGV2LW1vZGUgb25seSoqIGZ1bmN0aW9uICh0aHVzIHNob3VsZCBhbHdheXMgYmUgZ3VhcmRlZCBieSB0aGUgYG5nRGV2TW9kZWApXG4gKiBhbmQgbXVzdCAqKm5vdCoqIGJlIHVzZWQgaW4gcHJvZHVjdGlvbiBidW5kbGVzLiBUaGUgZnVuY3Rpb24gbWFrZXMgbWVnYW1vcnBoaWMgcmVhZHMsIHdoaWNoIG1pZ2h0XG4gKiBiZSB0b28gc2xvdyBmb3IgcHJvZHVjdGlvbiBtb2RlIGFuZCBhbHNvIGl0IHJlbGllcyBvbiB0aGUgY29uc3RydWN0b3IgZnVuY3Rpb24gYmVpbmcgYXZhaWxhYmxlLlxuICpcbiAqIEdldHMgYSByZWZlcmVuY2UgdG8gdGhlIGhvc3QgY29tcG9uZW50IGRlZiAod2hlcmUgYSBjdXJyZW50IGNvbXBvbmVudCBpcyBkZWNsYXJlZCkuXG4gKlxuICogQHBhcmFtIGxWaWV3IEFuIGBMVmlld2AgdGhhdCByZXByZXNlbnRzIGEgY3VycmVudCBjb21wb25lbnQgdGhhdCBpcyBiZWluZyByZW5kZXJlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERlY2xhcmF0aW9uQ29tcG9uZW50RGVmKGxWaWV3OiBMVmlldyk6IENvbXBvbmVudERlZjx1bmtub3duPnxudWxsIHtcbiAgIW5nRGV2TW9kZSAmJiB0aHJvd0Vycm9yKCdNdXN0IG5ldmVyIGJlIGNhbGxlZCBpbiBwcm9kdWN0aW9uIG1vZGUnKTtcblxuICBjb25zdCBkZWNsYXJhdGlvbkxWaWV3ID0gbFZpZXdbREVDTEFSQVRJT05fQ09NUE9ORU5UX1ZJRVddIGFzIExWaWV3PFR5cGU8dW5rbm93bj4+O1xuICBjb25zdCBjb250ZXh0ID0gZGVjbGFyYXRpb25MVmlld1tDT05URVhUXTtcblxuICAvLyBVbmFibGUgdG8gb2J0YWluIGEgY29udGV4dC5cbiAgaWYgKCFjb250ZXh0KSByZXR1cm4gbnVsbDtcblxuICByZXR1cm4gY29udGV4dC5jb25zdHJ1Y3RvciA/IGdldENvbXBvbmVudERlZihjb250ZXh0LmNvbnN0cnVjdG9yKSA6IG51bGw7XG59XG5cbi8qKlxuICogV0FSTklORzogdGhpcyBpcyBhICoqZGV2LW1vZGUgb25seSoqIGZ1bmN0aW9uICh0aHVzIHNob3VsZCBhbHdheXMgYmUgZ3VhcmRlZCBieSB0aGUgYG5nRGV2TW9kZWApXG4gKiBhbmQgbXVzdCAqKm5vdCoqIGJlIHVzZWQgaW4gcHJvZHVjdGlvbiBidW5kbGVzLiBUaGUgZnVuY3Rpb24gbWFrZXMgbWVnYW1vcnBoaWMgcmVhZHMsIHdoaWNoIG1pZ2h0XG4gKiBiZSB0b28gc2xvdyBmb3IgcHJvZHVjdGlvbiBtb2RlLlxuICpcbiAqIENoZWNrcyBpZiB0aGUgY3VycmVudCBjb21wb25lbnQgaXMgZGVjbGFyZWQgaW5zaWRlIG9mIGEgc3RhbmRhbG9uZSBjb21wb25lbnQgdGVtcGxhdGUuXG4gKlxuICogQHBhcmFtIGxWaWV3IEFuIGBMVmlld2AgdGhhdCByZXByZXNlbnRzIGEgY3VycmVudCBjb21wb25lbnQgdGhhdCBpcyBiZWluZyByZW5kZXJlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSG9zdENvbXBvbmVudFN0YW5kYWxvbmUobFZpZXc6IExWaWV3KTogYm9vbGVhbiB7XG4gICFuZ0Rldk1vZGUgJiYgdGhyb3dFcnJvcignTXVzdCBuZXZlciBiZSBjYWxsZWQgaW4gcHJvZHVjdGlvbiBtb2RlJyk7XG5cbiAgY29uc3QgY29tcG9uZW50RGVmID0gZ2V0RGVjbGFyYXRpb25Db21wb25lbnREZWYobFZpZXcpO1xuICAvLyBUcmVhdCBob3N0IGNvbXBvbmVudCBhcyBub24tc3RhbmRhbG9uZSBpZiB3ZSBjYW4ndCBvYnRhaW4gdGhlIGRlZi5cbiAgcmV0dXJuICEhY29tcG9uZW50RGVmPy5zdGFuZGFsb25lO1xufVxuXG4vKipcbiAqIFdBUk5JTkc6IHRoaXMgaXMgYSAqKmRldi1tb2RlIG9ubHkqKiBmdW5jdGlvbiAodGh1cyBzaG91bGQgYWx3YXlzIGJlIGd1YXJkZWQgYnkgdGhlIGBuZ0Rldk1vZGVgKVxuICogYW5kIG11c3QgKipub3QqKiBiZSB1c2VkIGluIHByb2R1Y3Rpb24gYnVuZGxlcy4gVGhlIGZ1bmN0aW9uIG1ha2VzIG1lZ2Ftb3JwaGljIHJlYWRzLCB3aGljaCBtaWdodFxuICogYmUgdG9vIHNsb3cgZm9yIHByb2R1Y3Rpb24gbW9kZS5cbiAqXG4gKiBDb25zdHJ1Y3RzIGEgc3RyaW5nIGRlc2NyaWJpbmcgdGhlIGxvY2F0aW9uIG9mIHRoZSBob3N0IGNvbXBvbmVudCB0ZW1wbGF0ZS4gVGhlIGZ1bmN0aW9uIGlzIHVzZWRcbiAqIGluIGRldiBtb2RlIHRvIHByb2R1Y2UgZXJyb3IgbWVzc2FnZXMuXG4gKlxuICogQHBhcmFtIGxWaWV3IEFuIGBMVmlld2AgdGhhdCByZXByZXNlbnRzIGEgY3VycmVudCBjb21wb25lbnQgdGhhdCBpcyBiZWluZyByZW5kZXJlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRlbXBsYXRlTG9jYXRpb25EZXRhaWxzKGxWaWV3OiBMVmlldyk6IHN0cmluZyB7XG4gICFuZ0Rldk1vZGUgJiYgdGhyb3dFcnJvcignTXVzdCBuZXZlciBiZSBjYWxsZWQgaW4gcHJvZHVjdGlvbiBtb2RlJyk7XG5cbiAgY29uc3QgaG9zdENvbXBvbmVudERlZiA9IGdldERlY2xhcmF0aW9uQ29tcG9uZW50RGVmKGxWaWV3KTtcbiAgY29uc3QgY29tcG9uZW50Q2xhc3NOYW1lID0gaG9zdENvbXBvbmVudERlZj8udHlwZT8ubmFtZTtcbiAgcmV0dXJuIGNvbXBvbmVudENsYXNzTmFtZSA/IGAgKHVzZWQgaW4gdGhlICcke2NvbXBvbmVudENsYXNzTmFtZX0nIGNvbXBvbmVudCB0ZW1wbGF0ZSlgIDogJyc7XG59XG5cbi8qKlxuICogVGhlIHNldCBvZiBrbm93biBjb250cm9sIGZsb3cgZGlyZWN0aXZlcyBhbmQgdGhlaXIgY29ycmVzcG9uZGluZyBpbXBvcnRzLlxuICogV2UgdXNlIHRoaXMgc2V0IHRvIHByb2R1Y2UgYSBtb3JlIHByZWNpc2VzIGVycm9yIG1lc3NhZ2Ugd2l0aCBhIG5vdGVcbiAqIHRoYXQgdGhlIGBDb21tb25Nb2R1bGVgIHNob3VsZCBhbHNvIGJlIGluY2x1ZGVkLlxuICovXG5leHBvcnQgY29uc3QgS05PV05fQ09OVFJPTF9GTE9XX0RJUkVDVElWRVMgPSBuZXcgTWFwKFtcbiAgWyduZ0lmJywgJ05nSWYnXSwgWyduZ0ZvcicsICdOZ0ZvciddLCBbJ25nU3dpdGNoQ2FzZScsICdOZ1N3aXRjaENhc2UnXSxcbiAgWyduZ1N3aXRjaERlZmF1bHQnLCAnTmdTd2l0Y2hEZWZhdWx0J11cbl0pO1xuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHRhZyBuYW1lIGlzIGFsbG93ZWQgYnkgc3BlY2lmaWVkIHNjaGVtYXMuXG4gKiBAcGFyYW0gc2NoZW1hcyBBcnJheSBvZiBzY2hlbWFzXG4gKiBAcGFyYW0gdGFnTmFtZSBOYW1lIG9mIHRoZSB0YWdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hdGNoaW5nU2NoZW1hcyhzY2hlbWFzOiBTY2hlbWFNZXRhZGF0YVtdfG51bGwsIHRhZ05hbWU6IHN0cmluZ3xudWxsKTogYm9vbGVhbiB7XG4gIGlmIChzY2hlbWFzICE9PSBudWxsKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY2hlbWFzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBzY2hlbWEgPSBzY2hlbWFzW2ldO1xuICAgICAgaWYgKHNjaGVtYSA9PT0gTk9fRVJST1JTX1NDSEVNQSB8fFxuICAgICAgICAgIHNjaGVtYSA9PT0gQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSAmJiB0YWdOYW1lICYmIHRhZ05hbWUuaW5kZXhPZignLScpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuIl19