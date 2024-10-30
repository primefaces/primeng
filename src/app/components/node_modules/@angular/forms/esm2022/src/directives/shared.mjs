/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectionToken, ɵRuntimeError as RuntimeError } from '@angular/core';
import { getControlAsyncValidators, getControlValidators, mergeValidators } from '../validators';
import { BuiltInControlValueAccessor } from './control_value_accessor';
import { DefaultValueAccessor } from './default_value_accessor';
import { ngModelWarning } from './reactive_errors';
/**
 * Token to provide to allow SetDisabledState to always be called when a CVA is added, regardless of
 * whether the control is disabled or enabled.
 *
 * @see {@link FormsModule#withconfig}
 */
export const CALL_SET_DISABLED_STATE = new InjectionToken('CallSetDisabledState', { providedIn: 'root', factory: () => setDisabledStateDefault });
/**
 * Whether to use the fixed setDisabledState behavior by default.
 */
export const setDisabledStateDefault = 'always';
export function controlPath(name, parent) {
    return [...parent.path, name];
}
/**
 * Links a Form control and a Form directive by setting up callbacks (such as `onChange`) on both
 * instances. This function is typically invoked when form directive is being initialized.
 *
 * @param control Form control instance that should be linked.
 * @param dir Directive that should be linked with a given control.
 */
export function setUpControl(control, dir, callSetDisabledState = setDisabledStateDefault) {
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
        if (!control)
            _throwError(dir, 'Cannot find control with');
        if (!dir.valueAccessor)
            _throwMissingValueAccessorError(dir);
    }
    setUpValidators(control, dir);
    dir.valueAccessor.writeValue(control.value);
    // The legacy behavior only calls the CVA's `setDisabledState` if the control is disabled.
    // If the `callSetDisabledState` option is set to `always`, then this bug is fixed and
    // the method is always called.
    if (control.disabled || callSetDisabledState === 'always') {
        dir.valueAccessor.setDisabledState?.(control.disabled);
    }
    setUpViewChangePipeline(control, dir);
    setUpModelChangePipeline(control, dir);
    setUpBlurPipeline(control, dir);
    setUpDisabledChangeHandler(control, dir);
}
/**
 * Reverts configuration performed by the `setUpControl` control function.
 * Effectively disconnects form control with a given form directive.
 * This function is typically invoked when corresponding form directive is being destroyed.
 *
 * @param control Form control which should be cleaned up.
 * @param dir Directive that should be disconnected from a given control.
 * @param validateControlPresenceOnChange Flag that indicates whether onChange handler should
 *     contain asserts to verify that it's not called once directive is destroyed. We need this flag
 *     to avoid potentially breaking changes caused by better control cleanup introduced in #39235.
 */
export function cleanUpControl(control, dir, validateControlPresenceOnChange = true) {
    const noop = () => {
        if (validateControlPresenceOnChange && (typeof ngDevMode === 'undefined' || ngDevMode)) {
            _noControlError(dir);
        }
    };
    // The `valueAccessor` field is typically defined on FromControl and FormControlName directive
    // instances and there is a logic in `selectValueAccessor` function that throws if it's not the
    // case. We still check the presence of `valueAccessor` before invoking its methods to make sure
    // that cleanup works correctly if app code or tests are setup to ignore the error thrown from
    // `selectValueAccessor`. See https://github.com/angular/angular/issues/40521.
    if (dir.valueAccessor) {
        dir.valueAccessor.registerOnChange(noop);
        dir.valueAccessor.registerOnTouched(noop);
    }
    cleanUpValidators(control, dir);
    if (control) {
        dir._invokeOnDestroyCallbacks();
        control._registerOnCollectionChange(() => { });
    }
}
function registerOnValidatorChange(validators, onChange) {
    validators.forEach((validator) => {
        if (validator.registerOnValidatorChange)
            validator.registerOnValidatorChange(onChange);
    });
}
/**
 * Sets up disabled change handler function on a given form control if ControlValueAccessor
 * associated with a given directive instance supports the `setDisabledState` call.
 *
 * @param control Form control where disabled change handler should be setup.
 * @param dir Corresponding directive instance associated with this control.
 */
export function setUpDisabledChangeHandler(control, dir) {
    if (dir.valueAccessor.setDisabledState) {
        const onDisabledChange = (isDisabled) => {
            dir.valueAccessor.setDisabledState(isDisabled);
        };
        control.registerOnDisabledChange(onDisabledChange);
        // Register a callback function to cleanup disabled change handler
        // from a control instance when a directive is destroyed.
        dir._registerOnDestroy(() => {
            control._unregisterOnDisabledChange(onDisabledChange);
        });
    }
}
/**
 * Sets up sync and async directive validators on provided form control.
 * This function merges validators from the directive into the validators of the control.
 *
 * @param control Form control where directive validators should be setup.
 * @param dir Directive instance that contains validators to be setup.
 */
export function setUpValidators(control, dir) {
    const validators = getControlValidators(control);
    if (dir.validator !== null) {
        control.setValidators(mergeValidators(validators, dir.validator));
    }
    else if (typeof validators === 'function') {
        // If sync validators are represented by a single validator function, we force the
        // `Validators.compose` call to happen by executing the `setValidators` function with
        // an array that contains that function. We need this to avoid possible discrepancies in
        // validators behavior, so sync validators are always processed by the `Validators.compose`.
        // Note: we should consider moving this logic inside the `setValidators` function itself, so we
        // have consistent behavior on AbstractControl API level. The same applies to the async
        // validators logic below.
        control.setValidators([validators]);
    }
    const asyncValidators = getControlAsyncValidators(control);
    if (dir.asyncValidator !== null) {
        control.setAsyncValidators(mergeValidators(asyncValidators, dir.asyncValidator));
    }
    else if (typeof asyncValidators === 'function') {
        control.setAsyncValidators([asyncValidators]);
    }
    // Re-run validation when validator binding changes, e.g. minlength=3 -> minlength=4
    const onValidatorChange = () => control.updateValueAndValidity();
    registerOnValidatorChange(dir._rawValidators, onValidatorChange);
    registerOnValidatorChange(dir._rawAsyncValidators, onValidatorChange);
}
/**
 * Cleans up sync and async directive validators on provided form control.
 * This function reverts the setup performed by the `setUpValidators` function, i.e.
 * removes directive-specific validators from a given control instance.
 *
 * @param control Form control from where directive validators should be removed.
 * @param dir Directive instance that contains validators to be removed.
 * @returns true if a control was updated as a result of this action.
 */
export function cleanUpValidators(control, dir) {
    let isControlUpdated = false;
    if (control !== null) {
        if (dir.validator !== null) {
            const validators = getControlValidators(control);
            if (Array.isArray(validators) && validators.length > 0) {
                // Filter out directive validator function.
                const updatedValidators = validators.filter((validator) => validator !== dir.validator);
                if (updatedValidators.length !== validators.length) {
                    isControlUpdated = true;
                    control.setValidators(updatedValidators);
                }
            }
        }
        if (dir.asyncValidator !== null) {
            const asyncValidators = getControlAsyncValidators(control);
            if (Array.isArray(asyncValidators) && asyncValidators.length > 0) {
                // Filter out directive async validator function.
                const updatedAsyncValidators = asyncValidators.filter((asyncValidator) => asyncValidator !== dir.asyncValidator);
                if (updatedAsyncValidators.length !== asyncValidators.length) {
                    isControlUpdated = true;
                    control.setAsyncValidators(updatedAsyncValidators);
                }
            }
        }
    }
    // Clear onValidatorChange callbacks by providing a noop function.
    const noop = () => { };
    registerOnValidatorChange(dir._rawValidators, noop);
    registerOnValidatorChange(dir._rawAsyncValidators, noop);
    return isControlUpdated;
}
function setUpViewChangePipeline(control, dir) {
    dir.valueAccessor.registerOnChange((newValue) => {
        control._pendingValue = newValue;
        control._pendingChange = true;
        control._pendingDirty = true;
        if (control.updateOn === 'change')
            updateControl(control, dir);
    });
}
function setUpBlurPipeline(control, dir) {
    dir.valueAccessor.registerOnTouched(() => {
        control._pendingTouched = true;
        if (control.updateOn === 'blur' && control._pendingChange)
            updateControl(control, dir);
        if (control.updateOn !== 'submit')
            control.markAsTouched();
    });
}
function updateControl(control, dir) {
    if (control._pendingDirty)
        control.markAsDirty();
    control.setValue(control._pendingValue, { emitModelToViewChange: false });
    dir.viewToModelUpdate(control._pendingValue);
    control._pendingChange = false;
}
function setUpModelChangePipeline(control, dir) {
    const onChange = (newValue, emitModelEvent) => {
        // control -> view
        dir.valueAccessor.writeValue(newValue);
        // control -> ngModel
        if (emitModelEvent)
            dir.viewToModelUpdate(newValue);
    };
    control.registerOnChange(onChange);
    // Register a callback function to cleanup onChange handler
    // from a control instance when a directive is destroyed.
    dir._registerOnDestroy(() => {
        control._unregisterOnChange(onChange);
    });
}
/**
 * Links a FormGroup or FormArray instance and corresponding Form directive by setting up validators
 * present in the view.
 *
 * @param control FormGroup or FormArray instance that should be linked.
 * @param dir Directive that provides view validators.
 */
export function setUpFormContainer(control, dir) {
    if (control == null && (typeof ngDevMode === 'undefined' || ngDevMode))
        _throwError(dir, 'Cannot find control with');
    setUpValidators(control, dir);
}
/**
 * Reverts the setup performed by the `setUpFormContainer` function.
 *
 * @param control FormGroup or FormArray instance that should be cleaned up.
 * @param dir Directive that provided view validators.
 * @returns true if a control was updated as a result of this action.
 */
export function cleanUpFormContainer(control, dir) {
    return cleanUpValidators(control, dir);
}
function _noControlError(dir) {
    return _throwError(dir, 'There is no FormControl instance attached to form control element with');
}
function _throwError(dir, message) {
    const messageEnd = _describeControlLocation(dir);
    throw new Error(`${message} ${messageEnd}`);
}
function _describeControlLocation(dir) {
    const path = dir.path;
    if (path && path.length > 1)
        return `path: '${path.join(' -> ')}'`;
    if (path?.[0])
        return `name: '${path}'`;
    return 'unspecified name attribute';
}
function _throwMissingValueAccessorError(dir) {
    const loc = _describeControlLocation(dir);
    throw new RuntimeError(-1203 /* RuntimeErrorCode.NG_MISSING_VALUE_ACCESSOR */, `No value accessor for form control ${loc}.`);
}
function _throwInvalidValueAccessorError(dir) {
    const loc = _describeControlLocation(dir);
    throw new RuntimeError(1200 /* RuntimeErrorCode.NG_VALUE_ACCESSOR_NOT_PROVIDED */, `Value accessor was not provided as an array for form control with ${loc}. ` +
        `Check that the \`NG_VALUE_ACCESSOR\` token is configured as a \`multi: true\` provider.`);
}
export function isPropertyUpdated(changes, viewModel) {
    if (!changes.hasOwnProperty('model'))
        return false;
    const change = changes['model'];
    if (change.isFirstChange())
        return true;
    return !Object.is(viewModel, change.currentValue);
}
export function isBuiltInAccessor(valueAccessor) {
    // Check if a given value accessor is an instance of a class that directly extends
    // `BuiltInControlValueAccessor` one.
    return Object.getPrototypeOf(valueAccessor.constructor) === BuiltInControlValueAccessor;
}
export function syncPendingControls(form, directives) {
    form._syncPendingControls();
    directives.forEach((dir) => {
        const control = dir.control;
        if (control.updateOn === 'submit' && control._pendingChange) {
            dir.viewToModelUpdate(control._pendingValue);
            control._pendingChange = false;
        }
    });
}
// TODO: vsavkin remove it once https://github.com/angular/angular/issues/3011 is implemented
export function selectValueAccessor(dir, valueAccessors) {
    if (!valueAccessors)
        return null;
    if (!Array.isArray(valueAccessors) && (typeof ngDevMode === 'undefined' || ngDevMode))
        _throwInvalidValueAccessorError(dir);
    let defaultAccessor = undefined;
    let builtinAccessor = undefined;
    let customAccessor = undefined;
    valueAccessors.forEach((v) => {
        if (v.constructor === DefaultValueAccessor) {
            defaultAccessor = v;
        }
        else if (isBuiltInAccessor(v)) {
            if (builtinAccessor && (typeof ngDevMode === 'undefined' || ngDevMode))
                _throwError(dir, 'More than one built-in value accessor matches form control with');
            builtinAccessor = v;
        }
        else {
            if (customAccessor && (typeof ngDevMode === 'undefined' || ngDevMode))
                _throwError(dir, 'More than one custom value accessor matches form control with');
            customAccessor = v;
        }
    });
    if (customAccessor)
        return customAccessor;
    if (builtinAccessor)
        return builtinAccessor;
    if (defaultAccessor)
        return defaultAccessor;
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
        _throwError(dir, 'No valid value accessor for form control with');
    }
    return null;
}
export function removeListItem(list, el) {
    const index = list.indexOf(el);
    if (index > -1)
        list.splice(index, 1);
}
// TODO(kara): remove after deprecation period
export function _ngModelWarning(name, type, instance, warningConfig) {
    if (warningConfig === 'never')
        return;
    if (((warningConfig === null || warningConfig === 'once') && !type._ngModelWarningSentOnce) ||
        (warningConfig === 'always' && !instance._ngModelWarningSent)) {
        console.warn(ngModelWarning(name));
        type._ngModelWarningSentOnce = true;
        instance._ngModelWarningSent = true;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvZm9ybXMvc3JjL2RpcmVjdGl2ZXMvc2hhcmVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBUyxjQUFjLEVBQUUsYUFBYSxJQUFJLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQU9wRixPQUFPLEVBQUMseUJBQXlCLEVBQUUsb0JBQW9CLEVBQUUsZUFBZSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBSy9GLE9BQU8sRUFBQywyQkFBMkIsRUFBdUIsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRixPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUc5RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFHakQ7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBRyxJQUFJLGNBQWMsQ0FDckQsc0JBQXNCLEVBQUUsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyx1QkFBdUIsRUFBQyxDQUFDLENBQUM7QUFZMUY7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBMkIsUUFBUSxDQUFDO0FBRXhFLE1BQU0sVUFBVSxXQUFXLENBQUMsSUFBaUIsRUFBRSxNQUF3QjtJQUNyRSxPQUFPLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSyxFQUFFLElBQUssQ0FBQyxDQUFDO0FBQ2xDLENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsWUFBWSxDQUN4QixPQUFvQixFQUFFLEdBQWMsRUFDcEMsdUJBQStDLHVCQUF1QjtJQUN4RSxJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUNsRCxJQUFJLENBQUMsT0FBTztZQUFFLFdBQVcsQ0FBQyxHQUFH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QWUsQ0FBQztJQUM1QyxJQUFJLGVBQWU7UUFBRSxPQUFPLGVBQWUsQ0FBQztJQUU1QyxJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUNsRCxXQUFXLENBQUMsR0FBRyxFQUFFLCtDQUErQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVELE1BQU0sVUFBVSxjQUFjLENBQUksSUFBUyxFQUFFLEVBQUs7SUFDaEQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMvQixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBRUQsOENBQThDO0FBQzlDLE1BQU0sVUFBVSxlQUFlLENBQzNCLElBQVksRUFBRSxJQUF3QyxFQUN0RCxRQUF3QyxFQUFFLGFBQTBCO0lBQ3RFLElBQUksYUFBYSxLQUFLLE9BQU87UUFBRSxPQUFPO0lBRXRDLElBQUksQ0FBQyxDQUFDLGFBQWEsS0FBSyxJQUFJLElBQUksYUFBYSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDO1FBQ3ZGLENBQUMsYUFBYSxLQUFLLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUM7UUFDbEUsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDO1FBQ3BDLFFBQVEsQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7SUFDdEMsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3QsIEluamVjdGlvblRva2VuLCDJtVJ1bnRpbWVFcnJvciBhcyBSdW50aW1lRXJyb3J9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1J1bnRpbWVFcnJvckNvZGV9IGZyb20gJy4uL2Vycm9ycyc7XG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbH0gZnJvbSAnLi4vbW9kZWwvYWJzdHJhY3RfbW9kZWwnO1xuaW1wb3J0IHtGb3JtQXJyYXl9IGZyb20gJy4uL21vZGVsL2Zvcm1fYXJyYXknO1xuaW1wb3J0IHtGb3JtQ29udHJvbH0gZnJvbSAnLi4vbW9kZWwvZm9ybV9jb250cm9sJztcbmltcG9ydCB7Rm9ybUdyb3VwfSBmcm9tICcuLi9tb2RlbC9mb3JtX2dyb3VwJztcbmltcG9ydCB7Z2V0Q29udHJvbEFzeW5jVmFsaWRhdG9ycywgZ2V0Q29udHJvbFZhbGlkYXRvcnMsIG1lcmdlVmFsaWRhdG9yc30gZnJvbSAnLi4vdmFsaWRhdG9ycyc7XG5cbmltcG9ydCB7QWJzdHJhY3RDb250cm9sRGlyZWN0aXZlfSBmcm9tICcuL2Fic3RyYWN0X2NvbnRyb2xfZGlyZWN0aXZlJztcbmltcG9ydCB7QWJzdHJhY3RGb3JtR3JvdXBEaXJlY3RpdmV9IGZyb20gJy4vYWJzdHJhY3RfZm9ybV9ncm91cF9kaXJlY3RpdmUnO1xuaW1wb3J0IHtDb250cm9sQ29udGFpbmVyfSBmcm9tICcuL2NvbnRyb2xfY29udGFpbmVyJztcbmltcG9ydCB7QnVpbHRJbkNvbnRyb2xWYWx1ZUFjY2Vzc29yLCBDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9jb250cm9sX3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7RGVmYXVsdFZhbHVlQWNjZXNzb3J9IGZyb20gJy4vZGVmYXVsdF92YWx1ZV9hY2Nlc3Nvcic7XG5pbXBvcnQge05nQ29udHJvbH0gZnJvbSAnLi9uZ19jb250cm9sJztcbmltcG9ydCB7Rm9ybUFycmF5TmFtZX0gZnJvbSAnLi9yZWFjdGl2ZV9kaXJlY3RpdmVzL2Zvcm1fZ3JvdXBfbmFtZSc7XG5pbXBvcnQge25nTW9kZWxXYXJuaW5nfSBmcm9tICcuL3JlYWN0aXZlX2Vycm9ycyc7XG5pbXBvcnQge0FzeW5jVmFsaWRhdG9yRm4sIFZhbGlkYXRvciwgVmFsaWRhdG9yRm59IGZyb20gJy4vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogVG9rZW4gdG8gcHJvdmlkZSB0byBhbGxvdyBTZXREaXNhYmxlZFN0YXRlIHRvIGFsd2F5cyBiZSBjYWxsZWQgd2hlbiBhIENWQSBpcyBhZGRlZCwgcmVnYXJkbGVzcyBvZlxuICogd2hldGhlciB0aGUgY29udHJvbCBpcyBkaXNhYmxlZCBvciBlbmFibGVkLlxuICpcbiAqIEBzZWUge0BsaW5rIEZvcm1zTW9kdWxlI3dpdGhjb25maWd9XG4gKi9cbmV4cG9ydCBjb25zdCBDQUxMX1NFVF9ESVNBQkxFRF9TVEFURSA9IG5ldyBJbmplY3Rpb25Ub2tlbihcbiAgICAnQ2FsbFNldERpc2FibGVkU3RhdGUnLCB7cHJvdmlkZWRJbjogJ3Jvb3QnLCBmYWN0b3J5OiAoKSA9PiBzZXREaXNhYmxlZFN0YXRlRGVmYXVsdH0pO1xuXG4vKipcbiAqIFRoZSB0eXBlIGZvciBDQUxMX1NFVF9ESVNBQkxFRF9TVEFURS4gSWYgYGFsd2F5c2AsIHRoZW4gQ29udHJvbFZhbHVlQWNjZXNzb3Igd2lsbCBhbHdheXMgY2FsbFxuICogYHNldERpc2FibGVkU3RhdGVgIHdoZW4gYXR0YWNoZWQsIHdoaWNoIGlzIHRoZSBtb3N0IGNvcnJlY3QgYmVoYXZpb3IuIE90aGVyd2lzZSwgaXQgd2lsbCBvbmx5IGJlXG4gKiBjYWxsZWQgd2hlbiBkaXNhYmxlZCwgd2hpY2ggaXMgdGhlIGxlZ2FjeSBiZWhhdmlvciBmb3IgY29tcGF0aWJpbGl0eS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKiBAc2VlIHtAbGluayBGb3Jtc01vZHVsZSN3aXRoY29uZmlnfVxuICovXG5leHBvcnQgdHlwZSBTZXREaXNhYmxlZFN0YXRlT3B0aW9uID0gJ3doZW5EaXNhYmxlZEZvckxlZ2FjeUNvZGUnfCdhbHdheXMnO1xuXG4vKipcbiAqIFdoZXRoZXIgdG8gdXNlIHRoZSBmaXhlZCBzZXREaXNhYmxlZFN0YXRlIGJlaGF2aW9yIGJ5IGRlZmF1bHQuXG4gKi9cbmV4cG9ydCBjb25zdCBzZXREaXNhYmxlZFN0YXRlRGVmYXVsdDogU2V0RGlzYWJsZWRTdGF0ZU9wdGlvbiA9ICdhbHdheXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udHJvbFBhdGgobmFtZTogc3RyaW5nfG51bGwsIHBhcmVudDogQ29udHJvbENvbnRhaW5lcik6IHN0cmluZ1tdIHtcbiAgcmV0dXJuIFsuLi5wYXJlbnQucGF0aCEsIG5hbWUhXTtcbn1cblxuLyoqXG4gKiBMaW5rcyBhIEZvcm0gY29udHJvbCBhbmQgYSBGb3JtIGRpcmVjdGl2ZSBieSBzZXR0aW5nIHVwIGNhbGxiYWNrcyAoc3VjaCBhcyBgb25DaGFuZ2VgKSBvbiBib3RoXG4gKiBpbnN0YW5jZXMuIFRoaXMgZnVuY3Rpb24gaXMgdHlwaWNhbGx5IGludm9rZWQgd2hlbiBmb3JtIGRpcmVjdGl2ZSBpcyBiZWluZyBpbml0aWFsaXplZC5cbiAqXG4gKiBAcGFyYW0gY29udHJvbCBGb3JtIGNvbnRyb2wgaW5zdGFuY2UgdGhhdCBzaG91bGQgYmUgbGlua2VkLlxuICogQHBhcmFtIGRpciBEaXJlY3RpdmUgdGhhdCBzaG91bGQgYmUgbGlua2VkIHdpdGggYSBnaXZlbiBjb250cm9sLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0VXBDb250cm9sKFxuICAgIGNvbnRyb2w6IEZvcm1Db250cm9sLCBkaXI6IE5nQ29udHJvbCxcbiAgICBjYWxsU2V0RGlzYWJsZWRTdGF0ZTogU2V0RGlzYWJsZWRTdGF0ZU9wdGlvbiA9IHNldERpc2FibGVkU3RhdGVEZWZhdWx0KTogdm9pZCB7XG4gIGlmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpIHtcbiAgICBpZiAoIWNvbnRyb2wpIF90aHJvd0Vycm9yKGRpciwgJ0Nhbm5vdCBmaW5kIGNvbnRyb2wgd2l0aCcpO1xuICAgIGlmICghZGlyLnZhbHVlQWNjZXNzb3IpIF90aHJvd01pc3NpbmdWYWx1ZUFjY2Vzc29yRXJyb3IoZGlyKTtcbiAgfVxuXG4gIHNldFVwVmFsaWRhdG9ycyhjb250cm9sLCBkaXIpO1xuXG4gIGRpci52YWx1ZUFjY2Vzc29yIS53cml0ZVZhbHVlKGNvbnRyb2wudmFsdWUpO1xuXG4gIC8vIFRoZSBsZWdhY3kgYmVoYXZpb3Igb25seSBjYWxscyB0aGUgQ1ZBJ3MgYHNldERpc2FibGVkU3RhdGVgIGlmIHRoZSBjb250cm9sIGlzIGRpc2FibGVkLlxuICAvLyBJZiB0aGUgYGNhbGxTZXREaXNhYmxlZFN0YXRlYCBvcHRpb24gaXMgc2V0IHRvIGBhbHdheXNgLCB0aGVuIHRoaXMgYnVnIGlzIGZpeGVkIGFuZFxuICAvLyB0aGUgbWV0aG9kIGlzIGFsd2F5cyBjYWxsZWQuXG4gIGlmIChjb250cm9sLmRpc2FibGVkIHx8IGNhbGxTZXREaXNhYmxlZFN0YXRlID09PSAnYWx3YXlzJykge1xuICAgIGRpci52YWx1ZUFjY2Vzc29yIS5zZXREaXNhYmxlZFN0YXRlPy4oY29udHJvbC5kaXNhYmxlZCk7XG4gIH1cblxuICBzZXRVcFZpZXdDaGFuZ2VQaXBlbGluZShjb250cm9sLCBkaXIpO1xuICBzZXRVcE1vZGVsQ2hhbmdlUGlwZWxpbmUoY29udHJvbCwgZGlyKTtcblxuICBzZXRVcEJsdXJQaXBlbGluZShjb250cm9sLCBkaXIpO1xuXG4gIHNldFVwRGlzYWJsZWRDaGFuZ2VIYW5kbGVyKGNvbnRyb2wsIGRpcik7XG59XG5cbi8qKlxuICogUmV2ZXJ0cyBjb25maWd1cmF0aW9uIHBlcmZvcm1lZCBieSB0aGUgYHNldFVwQ29udHJvbGAgY29udHJvbCBmdW5jdGlvbi5cbiAqIEVmZmVjdGl2ZWx5IGRpc2Nvbm5lY3RzIGZvcm0gY29udHJvbCB3aXRoIGEgZ2l2ZW4gZm9ybSBkaXJlY3RpdmUuXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIHR5cGljYWxseSBpbnZva2VkIHdoZW4gY29ycmVzcG9uZGluZyBmb3JtIGRpcmVjdGl2ZSBpcyBiZWluZyBkZXN0cm95ZWQuXG4gKlxuICogQHBhcmFtIGNvbnRyb2wgRm9ybSBjb250cm9sIHdoaWNoIHNob3VsZCBiZSBjbGVhbmVkIHVwLlxuICogQHBhcmFtIGRpciBEaXJlY3RpdmUgdGhhdCBzaG91bGQgYmUgZGlzY29ubmVjdGVkIGZyb20gYSBnaXZlbiBjb250cm9sLlxuICogQHBhcmFtIHZhbGlkYXRlQ29udHJvbFByZXNlbmNlT25DaGFuZ2UgRmxhZyB0aGF0IGluZGljYXRlcyB3aGV0aGVyIG9uQ2hhbmdlIGhhbmRsZXIgc2hvdWxkXG4gKiAgICAgY29udGFpbiBhc3NlcnRzIHRvIHZlcmlmeSB0aGF0IGl0J3Mgbm90IGNhbGxlZCBvbmNlIGRpcmVjdGl2ZSBpcyBkZXN0cm95ZWQuIFdlIG5lZWQgdGhpcyBmbGFnXG4gKiAgICAgdG8gYXZvaWQgcG90ZW50aWFsbHkgYnJlYWtpbmcgY2hhbmdlcyBjYXVzZWQgYnkgYmV0dGVyIGNvbnRyb2wgY2xlYW51cCBpbnRyb2R1Y2VkIGluICMzOTIzNS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsZWFuVXBDb250cm9sKFxuICAgIGNvbnRyb2w6IEZvcm1Db250cm9sfG51bGwsIGRpcjogTmdDb250cm9sLFxuICAgIHZhbGlkYXRlQ29udHJvbFByZXNlbmNlT25DaGFuZ2U6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gIGNvbnN0IG5vb3AgPSAoKSA9PiB7XG4gICAgaWYgKHZhbGlkYXRlQ29udHJvbFByZXNlbmNlT25DaGFuZ2UgJiYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkpIHtcbiAgICAgIF9ub0NvbnRyb2xFcnJvcihkaXIpO1xuICAgIH1cbiAgfTtcblxuICAvLyBUaGUgYHZhbHVlQWNjZXNzb3JgIGZpZWxkIGlzIHR5cGljYWxseSBkZWZpbmVkIG9uIEZyb21Db250cm9sIGFuZCBGb3JtQ29udHJvbE5hbWUgZGlyZWN0aXZlXG4gIC8vIGluc3RhbmNlcyBhbmQgdGhlcmUgaXMgYSBsb2dpYyBpbiBgc2VsZWN0VmFsdWVBY2Nlc3NvcmAgZnVuY3Rpb24gdGhhdCB0aHJvd3MgaWYgaXQncyBub3QgdGhlXG4gIC8vIGNhc2UuIFdlIHN0aWxsIGNoZWNrIHRoZSBwcmVzZW5jZSBvZiBgdmFsdWVBY2Nlc3NvcmAgYmVmb3JlIGludm9raW5nIGl0cyBtZXRob2RzIHRvIG1ha2Ugc3VyZVxuICAvLyB0aGF0IGNsZWFudXAgd29ya3MgY29ycmVjdGx5IGlmIGFwcCBjb2RlIG9yIHRlc3RzIGFyZSBzZXR1cCB0byBpZ25vcmUgdGhlIGVycm9yIHRocm93biBmcm9tXG4gIC8vIGBzZWxlY3RWYWx1ZUFjY2Vzc29yYC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzQwNTIxLlxuICBpZiAoZGlyLnZhbHVlQWNjZXNzb3IpIHtcbiAgICBkaXIudmFsdWVBY2Nlc3Nvci5yZWdpc3Rlck9uQ2hhbmdlKG5vb3ApO1xuICAgIGRpci52YWx1ZUFjY2Vzc29yLnJlZ2lzdGVyT25Ub3VjaGVkKG5vb3ApO1xuICB9XG5cbiAgY2xlYW5VcFZhbGlkYXRvcnMoY29udHJvbCwgZGlyKTtcblxuICBpZiAoY29udHJvbCkge1xuICAgIGRpci5faW52b2tlT25EZXN0cm95Q2FsbGJhY2tzKCk7XG4gICAgY29udHJvbC5fcmVnaXN0ZXJPbkNvbGxlY3Rpb25DaGFuZ2UoKCkgPT4ge30pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyT25WYWxpZGF0b3JDaGFuZ2U8Vj4odmFsaWRhdG9yczogKFZ8VmFsaWRhdG9yKVtdLCBvbkNoYW5nZTogKCkgPT4gdm9pZCk6IHZvaWQge1xuICB2YWxpZGF0b3JzLmZvckVhY2goKHZhbGlkYXRvcjogVnxWYWxpZGF0b3IpID0+IHtcbiAgICBpZiAoKDxWYWxpZGF0b3I+dmFsaWRhdG9yKS5yZWdpc3Rlck9uVmFsaWRhdG9yQ2hhbmdlKVxuICAgICAgKDxWYWxpZGF0b3I+dmFsaWRhdG9yKS5yZWdpc3Rlck9uVmFsaWRhdG9yQ2hhbmdlIShvbkNoYW5nZSk7XG4gIH0pO1xufVxuXG4vKipcbiAqIFNldHMgdXAgZGlzYWJsZWQgY2hhbmdlIGhhbmRsZXIgZnVuY3Rpb24gb24gYSBnaXZlbiBmb3JtIGNvbnRyb2wgaWYgQ29udHJvbFZhbHVlQWNjZXNzb3JcbiAqIGFzc29jaWF0ZWQgd2l0aCBhIGdpdmVuIGRpcmVjdGl2ZSBpbnN0YW5jZSBzdXBwb3J0cyB0aGUgYHNldERpc2FibGVkU3RhdGVgIGNhbGwuXG4gKlxuICogQHBhcmFtIGNvbnRyb2wgRm9ybSBjb250cm9sIHdoZXJlIGRpc2FibGVkIGNoYW5nZSBoYW5kbGVyIHNob3VsZCBiZSBzZXR1cC5cbiAqIEBwYXJhbSBkaXIgQ29ycmVzcG9uZGluZyBkaXJlY3RpdmUgaW5zdGFuY2UgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY29udHJvbC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldFVwRGlzYWJsZWRDaGFuZ2VIYW5kbGVyKGNvbnRyb2w6IEZvcm1Db250cm9sLCBkaXI6IE5nQ29udHJvbCk6IHZvaWQge1xuICBpZiAoZGlyLnZhbHVlQWNjZXNzb3IhLnNldERpc2FibGVkU3RhdGUpIHtcbiAgICBjb25zdCBvbkRpc2FibGVkQ2hhbmdlID0gKGlzRGlzYWJsZWQ6IGJvb2xlYW4pID0+IHtcbiAgICAgIGRpci52YWx1ZUFjY2Vzc29yIS5zZXREaXNhYmxlZFN0YXRlIShpc0Rpc2FibGVkKTtcbiAgICB9O1xuICAgIGNvbnRyb2wucmVnaXN0ZXJPbkRpc2FibGVkQ2hhbmdlKG9uRGlzYWJsZWRDaGFuZ2UpO1xuXG4gICAgLy8gUmVnaXN0ZXIgYSBjYWxsYmFjayBmdW5jdGlvbiB0byBjbGVhbnVwIGRpc2FibGVkIGNoYW5nZSBoYW5kbGVyXG4gICAgLy8gZnJvbSBhIGNvbnRyb2wgaW5zdGFuY2Ugd2hlbiBhIGRpcmVjdGl2ZSBpcyBkZXN0cm95ZWQuXG4gICAgZGlyLl9yZWdpc3Rlck9uRGVzdHJveSgoKSA9PiB7XG4gICAgICBjb250cm9sLl91bnJlZ2lzdGVyT25EaXNhYmxlZENoYW5nZShvbkRpc2FibGVkQ2hhbmdlKTtcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIFNldHMgdXAgc3luYyBhbmQgYXN5bmMgZGlyZWN0aXZlIHZhbGlkYXRvcnMgb24gcHJvdmlkZWQgZm9ybSBjb250cm9sLlxuICogVGhpcyBmdW5jdGlvbiBtZXJnZXMgdmFsaWRhdG9ycyBmcm9tIHRoZSBkaXJlY3RpdmUgaW50byB0aGUgdmFsaWRhdG9ycyBvZiB0aGUgY29udHJvbC5cbiAqXG4gKiBAcGFyYW0gY29udHJvbCBGb3JtIGNvbnRyb2wgd2hlcmUgZGlyZWN0aXZlIHZhbGlkYXRvcnMgc2hvdWxkIGJlIHNldHVwLlxuICogQHBhcmFtIGRpciBEaXJlY3RpdmUgaW5zdGFuY2UgdGhhdCBjb250YWlucyB2YWxpZGF0b3JzIHRvIGJlIHNldHVwLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0VXBWYWxpZGF0b3JzKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgZGlyOiBBYnN0cmFjdENvbnRyb2xEaXJlY3RpdmUpOiB2b2lkIHtcbiAgY29uc3QgdmFsaWRhdG9ycyA9IGdldENvbnRyb2xWYWxpZGF0b3JzKGNvbnRyb2wpO1xuICBpZiAoZGlyLnZhbGlkYXRvciAhPT0gbnVsbCkge1xuICAgIGNvbnRyb2wuc2V0VmFsaWRhdG9ycyhtZXJnZVZhbGlkYXRvcnM8VmFsaWRhdG9yRm4+KHZhbGlkYXRvcnMsIGRpci52YWxpZGF0b3IpKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsaWRhdG9ycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIElmIHN5bmMgdmFsaWRhdG9ycyBhcmUgcmVwcmVzZW50ZWQgYnkgYSBzaW5nbGUgdmFsaWRhdG9yIGZ1bmN0aW9uLCB3ZSBmb3JjZSB0aGVcbiAgICAvLyBgVmFsaWRhdG9ycy5jb21wb3NlYCBjYWxsIHRvIGhhcHBlbiBieSBleGVjdXRpbmcgdGhlIGBzZXRWYWxpZGF0b3JzYCBmdW5jdGlvbiB3aXRoXG4gICAgLy8gYW4gYXJyYXkgdGhhdCBjb250YWlucyB0aGF0IGZ1bmN0aW9uLiBXZSBuZWVkIHRoaXMgdG8gYXZvaWQgcG9zc2libGUgZGlzY3JlcGFuY2llcyBpblxuICAgIC8vIHZhbGlkYXRvcnMgYmVoYXZpb3IsIHNvIHN5bmMgdmFsaWRhdG9ycyBhcmUgYWx3YXlzIHByb2Nlc3NlZCBieSB0aGUgYFZhbGlkYXRvcnMuY29tcG9zZWAuXG4gICAgLy8gTm90ZTogd2Ugc2hvdWxkIGNvbnNpZGVyIG1vdmluZyB0aGlzIGxvZ2ljIGluc2lkZSB0aGUgYHNldFZhbGlkYXRvcnNgIGZ1bmN0aW9uIGl0c2VsZiwgc28gd2VcbiAgICAvLyBoYXZlIGNvbnNpc3RlbnQgYmVoYXZpb3Igb24gQWJzdHJhY3RDb250cm9sIEFQSSBsZXZlbC4gVGhlIHNhbWUgYXBwbGllcyB0byB0aGUgYXN5bmNcbiAgICAvLyB2YWxpZGF0b3JzIGxvZ2ljIGJlbG93LlxuICAgIGNvbnRyb2wuc2V0VmFsaWRhdG9ycyhbdmFsaWRhdG9yc10pO1xuICB9XG5cbiAgY29uc3QgYXN5bmNWYWxpZGF0b3JzID0gZ2V0Q29udHJvbEFzeW5jVmFsaWRhdG9ycyhjb250cm9sKTtcbiAgaWYgKGRpci5hc3luY1ZhbGlkYXRvciAhPT0gbnVsbCkge1xuICAgIGNvbnRyb2wuc2V0QXN5bmNWYWxpZGF0b3JzKFxuICAgICAgICBtZXJnZVZhbGlkYXRvcnM8QXN5bmNWYWxpZGF0b3JGbj4oYXN5bmNWYWxpZGF0b3JzLCBkaXIuYXN5bmNWYWxpZGF0b3IpKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgYXN5bmNWYWxpZGF0b3JzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29udHJvbC5zZXRBc3luY1ZhbGlkYXRvcnMoW2FzeW5jVmFsaWRhdG9yc10pO1xuICB9XG5cbiAgLy8gUmUtcnVuIHZhbGlkYXRpb24gd2hlbiB2YWxpZGF0b3IgYmluZGluZyBjaGFuZ2VzLCBlLmcuIG1pbmxlbmd0aD0zIC0+IG1pbmxlbmd0aD00XG4gIGNvbnN0IG9uVmFsaWRhdG9yQ2hhbmdlID0gKCkgPT4gY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gIHJlZ2lzdGVyT25WYWxpZGF0b3JDaGFuZ2U8VmFsaWRhdG9yRm4+KGRpci5fcmF3VmFsaWRhdG9ycywgb25WYWxpZGF0b3JDaGFuZ2UpO1xuICByZWdpc3Rlck9uVmFsaWRhdG9yQ2hhbmdlPEFzeW5jVmFsaWRhdG9yRm4+KGRpci5fcmF3QXN5bmNWYWxpZGF0b3JzLCBvblZhbGlkYXRvckNoYW5nZSk7XG59XG5cbi8qKlxuICogQ2xlYW5zIHVwIHN5bmMgYW5kIGFzeW5jIGRpcmVjdGl2ZSB2YWxpZGF0b3JzIG9uIHByb3ZpZGVkIGZvcm0gY29udHJvbC5cbiAqIFRoaXMgZnVuY3Rpb24gcmV2ZXJ0cyB0aGUgc2V0dXAgcGVyZm9ybWVkIGJ5IHRoZSBgc2V0VXBWYWxpZGF0b3JzYCBmdW5jdGlvbiwgaS5lLlxuICogcmVtb3ZlcyBkaXJlY3RpdmUtc3BlY2lmaWMgdmFsaWRhdG9ycyBmcm9tIGEgZ2l2ZW4gY29udHJvbCBpbnN0YW5jZS5cbiAqXG4gKiBAcGFyYW0gY29udHJvbCBGb3JtIGNvbnRyb2wgZnJvbSB3aGVyZSBkaXJlY3RpdmUgdmFsaWRhdG9ycyBzaG91bGQgYmUgcmVtb3ZlZC5cbiAqIEBwYXJhbSBkaXIgRGlyZWN0aXZlIGluc3RhbmNlIHRoYXQgY29udGFpbnMgdmFsaWRhdG9ycyB0byBiZSByZW1vdmVkLlxuICogQHJldHVybnMgdHJ1ZSBpZiBhIGNvbnRyb2wgd2FzIHVwZGF0ZWQgYXMgYSByZXN1bHQgb2YgdGhpcyBhY3Rpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGVhblVwVmFsaWRhdG9ycyhcbiAgICBjb250cm9sOiBBYnN0cmFjdENvbnRyb2x8bnVsbCwgZGlyOiBBYnN0cmFjdENvbnRyb2xEaXJlY3RpdmUpOiBib29sZWFuIHtcbiAgbGV0IGlzQ29udHJvbFVwZGF0ZWQgPSBmYWxzZTtcbiAgaWYgKGNvbnRyb2wgIT09IG51bGwpIHtcbiAgICBpZiAoZGlyLnZhbGlkYXRvciAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgdmFsaWRhdG9ycyA9IGdldENvbnRyb2xWYWxpZGF0b3JzKGNvbnRyb2wpO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsaWRhdG9ycykgJiYgdmFsaWRhdG9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIEZpbHRlciBvdXQgZGlyZWN0aXZlIHZhbGlkYXRvciBmdW5jdGlvbi5cbiAgICAgICAgY29uc3QgdXBkYXRlZFZhbGlkYXRvcnMgPSB2YWxpZGF0b3JzLmZpbHRlcigodmFsaWRhdG9yKSA9PiB2YWxpZGF0b3IgIT09IGRpci52YWxpZGF0b3IpO1xuICAgICAgICBpZiAodXBkYXRlZFZhbGlkYXRvcnMubGVuZ3RoICE9PSB2YWxpZGF0b3JzLmxlbmd0aCkge1xuICAgICAgICAgIGlzQ29udHJvbFVwZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgIGNvbnRyb2wuc2V0VmFsaWRhdG9ycyh1cGRhdGVkVmFsaWRhdG9ycyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZGlyLmFzeW5jVmFsaWRhdG9yICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBhc3luY1ZhbGlkYXRvcnMgPSBnZXRDb250cm9sQXN5bmNWYWxpZGF0b3JzKGNvbnRyb2wpO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXN5bmNWYWxpZGF0b3JzKSAmJiBhc3luY1ZhbGlkYXRvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyBGaWx0ZXIgb3V0IGRpcmVjdGl2ZSBhc3luYyB2YWxpZGF0b3IgZnVuY3Rpb24uXG4gICAgICAgIGNvbnN0IHVwZGF0ZWRBc3luY1ZhbGlkYXRvcnMgPVxuICAgICAgICAgICAgYXN5bmNWYWxpZGF0b3JzLmZpbHRlcigoYXN5bmNWYWxpZGF0b3IpID0+IGFzeW5jVmFsaWRhdG9yICE9PSBkaXIuYXN5bmNWYWxpZGF0b3IpO1xuICAgICAgICBpZiAodXBkYXRlZEFzeW5jVmFsaWRhdG9ycy5sZW5ndGggIT09IGFzeW5jVmFsaWRhdG9ycy5sZW5ndGgpIHtcbiAgICAgICAgICBpc0NvbnRyb2xVcGRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICBjb250cm9sLnNldEFzeW5jVmFsaWRhdG9ycyh1cGRhdGVkQXN5bmNWYWxpZGF0b3JzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENsZWFyIG9uVmFsaWRhdG9yQ2hhbmdlIGNhbGxiYWNrcyBieSBwcm92aWRpbmcgYSBub29wIGZ1bmN0aW9uLlxuICBjb25zdCBub29wID0gKCkgPT4ge307XG4gIHJlZ2lzdGVyT25WYWxpZGF0b3JDaGFuZ2U8VmFsaWRhdG9yRm4+KGRpci5fcmF3VmFsaWRhdG9ycywgbm9vcCk7XG4gIHJlZ2lzdGVyT25WYWxpZGF0b3JDaGFuZ2U8QXN5bmNWYWxpZGF0b3JGbj4oZGlyLl9yYXdBc3luY1ZhbGlkYXRvcnMsIG5vb3ApO1xuXG4gIHJldHVybiBpc0NvbnRyb2xVcGRhdGVkO1xufVxuXG5mdW5jdGlvbiBzZXRVcFZpZXdDaGFuZ2VQaXBlbGluZShjb250cm9sOiBGb3JtQ29udHJvbCwgZGlyOiBOZ0NvbnRyb2wpOiB2b2lkIHtcbiAgZGlyLnZhbHVlQWNjZXNzb3IhLnJlZ2lzdGVyT25DaGFuZ2UoKG5ld1ZhbHVlOiBhbnkpID0+IHtcbiAgICBjb250cm9sLl9wZW5kaW5nVmFsdWUgPSBuZXdWYWx1ZTtcbiAgICBjb250cm9sLl9wZW5kaW5nQ2hhbmdlID0gdHJ1ZTtcbiAgICBjb250cm9sLl9wZW5kaW5nRGlydHkgPSB0cnVlO1xuXG4gICAgaWYgKGNvbnRyb2wudXBkYXRlT24gPT09ICdjaGFuZ2UnKSB1cGRhdGVDb250cm9sKGNvbnRyb2wsIGRpcik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZXRVcEJsdXJQaXBlbGluZShjb250cm9sOiBGb3JtQ29udHJvbCwgZGlyOiBOZ0NvbnRyb2wpOiB2b2lkIHtcbiAgZGlyLnZhbHVlQWNjZXNzb3IhLnJlZ2lzdGVyT25Ub3VjaGVkKCgpID0+IHtcbiAgICBjb250cm9sLl9wZW5kaW5nVG91Y2hlZCA9IHRydWU7XG5cbiAgICBpZiAoY29udHJvbC51cGRhdGVPbiA9PT0gJ2JsdXInICYmIGNvbnRyb2wuX3BlbmRpbmdDaGFuZ2UpIHVwZGF0ZUNvbnRyb2woY29udHJvbCwgZGlyKTtcbiAgICBpZiAoY29udHJvbC51cGRhdGVPbiAhPT0gJ3N1Ym1pdCcpIGNvbnRyb2wubWFya0FzVG91Y2hlZCgpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ29udHJvbChjb250cm9sOiBGb3JtQ29udHJvbCwgZGlyOiBOZ0NvbnRyb2wpOiB2b2lkIHtcbiAgaWYgKGNvbnRyb2wuX3BlbmRpbmdEaXJ0eSkgY29udHJvbC5tYXJrQXNEaXJ0eSgpO1xuICBjb250cm9sLnNldFZhbHVlKGNvbnRyb2wuX3BlbmRpbmdWYWx1ZSwge2VtaXRNb2RlbFRvVmlld0NoYW5nZTogZmFsc2V9KTtcbiAgZGlyLnZpZXdUb01vZGVsVXBkYXRlKGNvbnRyb2wuX3BlbmRpbmdWYWx1ZSk7XG4gIGNvbnRyb2wuX3BlbmRpbmdDaGFuZ2UgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gc2V0VXBNb2RlbENoYW5nZVBpcGVsaW5lKGNvbnRyb2w6IEZvcm1Db250cm9sLCBkaXI6IE5nQ29udHJvbCk6IHZvaWQge1xuICBjb25zdCBvbkNoYW5nZSA9IChuZXdWYWx1ZT86IGFueSwgZW1pdE1vZGVsRXZlbnQ/OiBib29sZWFuKSA9PiB7XG4gICAgLy8gY29udHJvbCAtPiB2aWV3XG4gICAgZGlyLnZhbHVlQWNjZXNzb3IhLndyaXRlVmFsdWUobmV3VmFsdWUpO1xuXG4gICAgLy8gY29udHJvbCAtPiBuZ01vZGVsXG4gICAgaWYgKGVtaXRNb2RlbEV2ZW50KSBkaXIudmlld1RvTW9kZWxVcGRhdGUobmV3VmFsdWUpO1xuICB9O1xuICBjb250cm9sLnJlZ2lzdGVyT25DaGFuZ2Uob25DaGFuZ2UpO1xuXG4gIC8vIFJlZ2lzdGVyIGEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gY2xlYW51cCBvbkNoYW5nZSBoYW5kbGVyXG4gIC8vIGZyb20gYSBjb250cm9sIGluc3RhbmNlIHdoZW4gYSBkaXJlY3RpdmUgaXMgZGVzdHJveWVkLlxuICBkaXIuX3JlZ2lzdGVyT25EZXN0cm95KCgpID0+IHtcbiAgICBjb250cm9sLl91bnJlZ2lzdGVyT25DaGFuZ2Uob25DaGFuZ2UpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBMaW5rcyBhIEZvcm1Hcm91cCBvciBGb3JtQXJyYXkgaW5zdGFuY2UgYW5kIGNvcnJlc3BvbmRpbmcgRm9ybSBkaXJlY3RpdmUgYnkgc2V0dGluZyB1cCB2YWxpZGF0b3JzXG4gKiBwcmVzZW50IGluIHRoZSB2aWV3LlxuICpcbiAqIEBwYXJhbSBjb250cm9sIEZvcm1Hcm91cCBvciBGb3JtQXJyYXkgaW5zdGFuY2UgdGhhdCBzaG91bGQgYmUgbGlua2VkLlxuICogQHBhcmFtIGRpciBEaXJlY3RpdmUgdGhhdCBwcm92aWRlcyB2aWV3IHZhbGlkYXRvcnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRVcEZvcm1Db250YWluZXIoXG4gICAgY29udHJvbDogRm9ybUdyb3VwfEZvcm1BcnJheSwgZGlyOiBBYnN0cmFjdEZvcm1Hcm91cERpcmVjdGl2ZXxGb3JtQXJyYXlOYW1lKSB7XG4gIGlmIChjb250cm9sID09IG51bGwgJiYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkpXG4gICAgX3Rocm93RXJyb3IoZGlyLCAnQ2Fubm90IGZpbmQgY29udHJvbCB3aXRoJyk7XG4gIHNldFVwVmFsaWRhdG9ycyhjb250cm9sLCBkaXIpO1xufVxuXG4vKipcbiAqIFJldmVydHMgdGhlIHNldHVwIHBlcmZvcm1lZCBieSB0aGUgYHNldFVwRm9ybUNvbnRhaW5lcmAgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIGNvbnRyb2wgRm9ybUdyb3VwIG9yIEZvcm1BcnJheSBpbnN0YW5jZSB0aGF0IHNob3VsZCBiZSBjbGVhbmVkIHVwLlxuICogQHBhcmFtIGRpciBEaXJlY3RpdmUgdGhhdCBwcm92aWRlZCB2aWV3IHZhbGlkYXRvcnMuXG4gKiBAcmV0dXJucyB0cnVlIGlmIGEgY29udHJvbCB3YXMgdXBkYXRlZCBhcyBhIHJlc3VsdCBvZiB0aGlzIGFjdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsZWFuVXBGb3JtQ29udGFpbmVyKFxuICAgIGNvbnRyb2w6IEZvcm1Hcm91cHxGb3JtQXJyYXksIGRpcjogQWJzdHJhY3RGb3JtR3JvdXBEaXJlY3RpdmV8Rm9ybUFycmF5TmFtZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gY2xlYW5VcFZhbGlkYXRvcnMoY29udHJvbCwgZGlyKTtcbn1cblxuZnVuY3Rpb24gX25vQ29udHJvbEVycm9yKGRpcjogTmdDb250cm9sKSB7XG4gIHJldHVybiBfdGhyb3dFcnJvcihkaXIsICdUaGVyZSBpcyBubyBGb3JtQ29udHJvbCBpbnN0YW5jZSBhdHRhY2hlZCB0byBmb3JtIGNvbnRyb2wgZWxlbWVudCB3aXRoJyk7XG59XG5cbmZ1bmN0aW9uIF90aHJvd0Vycm9yKGRpcjogQWJzdHJhY3RDb250cm9sRGlyZWN0aXZlLCBtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcbiAgY29uc3QgbWVzc2FnZUVuZCA9IF9kZXNjcmliZUNvbnRyb2xMb2NhdGlvbihkaXIpO1xuICB0aHJvdyBuZXcgRXJyb3IoYCR7bWVzc2FnZX0gJHttZXNzYWdlRW5kfWApO1xufVxuXG5mdW5jdGlvbiBfZGVzY3JpYmVDb250cm9sTG9jYXRpb24oZGlyOiBBYnN0cmFjdENvbnRyb2xEaXJlY3RpdmUpOiBzdHJpbmcge1xuICBjb25zdCBwYXRoID0gZGlyLnBhdGg7XG4gIGlmIChwYXRoICYmIHBhdGgubGVuZ3RoID4gMSkgcmV0dXJuIGBwYXRoOiAnJHtwYXRoLmpvaW4oJyAtPiAnKX0nYDtcbiAgaWYgKHBhdGg/LlswXSkgcmV0dXJuIGBuYW1lOiAnJHtwYXRofSdgO1xuICByZXR1cm4gJ3Vuc3BlY2lmaWVkIG5hbWUgYXR0cmlidXRlJztcbn1cblxuZnVuY3Rpb24gX3Rocm93TWlzc2luZ1ZhbHVlQWNjZXNzb3JFcnJvcihkaXI6IEFic3RyYWN0Q29udHJvbERpcmVjdGl2ZSkge1xuICBjb25zdCBsb2MgPSBfZGVzY3JpYmVDb250cm9sTG9jYXRpb24oZGlyKTtcbiAgdGhyb3cgbmV3IFJ1bnRpbWVFcnJvcihcbiAgICAgIFJ1bnRpbWVFcnJvckNvZGUuTkdfTUlTU0lOR19WQUxVRV9BQ0NFU1NPUiwgYE5vIHZhbHVlIGFjY2Vzc29yIGZvciBmb3JtIGNvbnRyb2wgJHtsb2N9LmApO1xufVxuXG5mdW5jdGlvbiBfdGhyb3dJbnZhbGlkVmFsdWVBY2Nlc3NvckVycm9yKGRpcjogQWJzdHJhY3RDb250cm9sRGlyZWN0aXZlKSB7XG4gIGNvbnN0IGxvYyA9IF9kZXNjcmliZUNvbnRyb2xMb2NhdGlvbihkaXIpO1xuICB0aHJvdyBuZXcgUnVudGltZUVycm9yKFxuICAgICAgUnVudGltZUVycm9yQ29kZS5OR19WQUxVRV9BQ0NFU1NPUl9OT1RfUFJPVklERUQsXG4gICAgICBgVmFsdWUgYWNjZXNzb3Igd2FzIG5vdCBwcm92aWRlZCBhcyBhbiBhcnJheSBmb3IgZm9ybSBjb250cm9sIHdpdGggJHtsb2N9LiBgICtcbiAgICAgICAgICBgQ2hlY2sgdGhhdCB0aGUgXFxgTkdfVkFMVUVfQUNDRVNTT1JcXGAgdG9rZW4gaXMgY29uZmlndXJlZCBhcyBhIFxcYG11bHRpOiB0cnVlXFxgIHByb3ZpZGVyLmApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQcm9wZXJ0eVVwZGF0ZWQoY2hhbmdlczoge1trZXk6IHN0cmluZ106IGFueX0sIHZpZXdNb2RlbDogYW55KTogYm9vbGVhbiB7XG4gIGlmICghY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnbW9kZWwnKSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBjaGFuZ2UgPSBjaGFuZ2VzWydtb2RlbCddO1xuXG4gIGlmIChjaGFuZ2UuaXNGaXJzdENoYW5nZSgpKSByZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuICFPYmplY3QuaXModmlld01vZGVsLCBjaGFuZ2UuY3VycmVudFZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQnVpbHRJbkFjY2Vzc29yKHZhbHVlQWNjZXNzb3I6IENvbnRyb2xWYWx1ZUFjY2Vzc29yKTogYm9vbGVhbiB7XG4gIC8vIENoZWNrIGlmIGEgZ2l2ZW4gdmFsdWUgYWNjZXNzb3IgaXMgYW4gaW5zdGFuY2Ugb2YgYSBjbGFzcyB0aGF0IGRpcmVjdGx5IGV4dGVuZHNcbiAgLy8gYEJ1aWx0SW5Db250cm9sVmFsdWVBY2Nlc3NvcmAgb25lLlxuICByZXR1cm4gT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbHVlQWNjZXNzb3IuY29uc3RydWN0b3IpID09PSBCdWlsdEluQ29udHJvbFZhbHVlQWNjZXNzb3I7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzeW5jUGVuZGluZ0NvbnRyb2xzKGZvcm06IEZvcm1Hcm91cCwgZGlyZWN0aXZlczogU2V0PE5nQ29udHJvbD58TmdDb250cm9sW10pOiB2b2lkIHtcbiAgZm9ybS5fc3luY1BlbmRpbmdDb250cm9scygpO1xuICBkaXJlY3RpdmVzLmZvckVhY2goKGRpcjogTmdDb250cm9sKSA9PiB7XG4gICAgY29uc3QgY29udHJvbCA9IGRpci5jb250cm9sIGFzIEZvcm1Db250cm9sO1xuICAgIGlmIChjb250cm9sLnVwZGF0ZU9uID09PSAnc3VibWl0JyAmJiBjb250cm9sLl9wZW5kaW5nQ2hhbmdlKSB7XG4gICAgICBkaXIudmlld1RvTW9kZWxVcGRhdGUoY29udHJvbC5fcGVuZGluZ1ZhbHVlKTtcbiAgICAgIGNvbnRyb2wuX3BlbmRpbmdDaGFuZ2UgPSBmYWxzZTtcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBUT0RPOiB2c2F2a2luIHJlbW92ZSBpdCBvbmNlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzMwMTEgaXMgaW1wbGVtZW50ZWRcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3RWYWx1ZUFjY2Vzc29yKFxuICAgIGRpcjogTmdDb250cm9sLCB2YWx1ZUFjY2Vzc29yczogQ29udHJvbFZhbHVlQWNjZXNzb3JbXSk6IENvbnRyb2xWYWx1ZUFjY2Vzc29yfG51bGwge1xuICBpZiAoIXZhbHVlQWNjZXNzb3JzKSByZXR1cm4gbnVsbDtcblxuICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWVBY2Nlc3NvcnMpICYmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpKVxuICAgIF90aHJvd0ludmFsaWRWYWx1ZUFjY2Vzc29yRXJyb3IoZGlyKTtcblxuICBsZXQgZGVmYXVsdEFjY2Vzc29yOiBDb250cm9sVmFsdWVBY2Nlc3Nvcnx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIGxldCBidWlsdGluQWNjZXNzb3I6IENvbnRyb2xWYWx1ZUFjY2Vzc29yfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgbGV0IGN1c3RvbUFjY2Vzc29yOiBDb250cm9sVmFsdWVBY2Nlc3Nvcnx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG5cbiAgdmFsdWVBY2Nlc3NvcnMuZm9yRWFjaCgodjogQ29udHJvbFZhbHVlQWNjZXNzb3IpID0+IHtcbiAgICBpZiAodi5jb25zdHJ1Y3RvciA9PT0gRGVmYXVsdFZhbHVlQWNjZXNzb3IpIHtcbiAgICAgIGRlZmF1bHRBY2Nlc3NvciA9IHY7XG4gICAgfSBlbHNlIGlmIChpc0J1aWx0SW5BY2Nlc3Nvcih2KSkge1xuICAgICAgaWYgKGJ1aWx0aW5BY2Nlc3NvciAmJiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSlcbiAgICAgICAgX3Rocm93RXJyb3IoZGlyLCAnTW9yZSB0aGFuIG9uZSBidWlsdC1pbiB2YWx1ZSBhY2Nlc3NvciBtYXRjaGVzIGZvcm0gY29udHJvbCB3aXRoJyk7XG4gICAgICBidWlsdGluQWNjZXNzb3IgPSB2O1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY3VzdG9tQWNjZXNzb3IgJiYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkpXG4gICAgICAgIF90aHJvd0Vycm9yKGRpciwgJ01vcmUgdGhhbiBvbmUgY3VzdG9tIHZhbHVlIGFjY2Vzc29yIG1hdGNoZXMgZm9ybSBjb250cm9sIHdpdGgnKTtcbiAgICAgIGN1c3RvbUFjY2Vzc29yID0gdjtcbiAgICB9XG4gIH0pO1xuXG4gIGlmIChjdXN0b21BY2Nlc3NvcikgcmV0dXJuIGN1c3RvbUFjY2Vzc29yO1xuICBpZiAoYnVpbHRpbkFjY2Vzc29yKSByZXR1cm4gYnVpbHRpbkFjY2Vzc29yO1xuICBpZiAoZGVmYXVsdEFjY2Vzc29yKSByZXR1cm4gZGVmYXVsdEFjY2Vzc29yO1xuXG4gIGlmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpIHtcbiAgICBfdGhyb3dFcnJvcihkaXIsICdObyB2YWxpZCB2YWx1ZSBhY2Nlc3NvciBmb3IgZm9ybSBjb250cm9sIHdpdGgnKTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUxpc3RJdGVtPFQ+KGxpc3Q6IFRbXSwgZWw6IFQpOiB2b2lkIHtcbiAgY29uc3QgaW5kZXggPSBsaXN0LmluZGV4T2YoZWwpO1xuICBpZiAoaW5kZXggPiAtMSkgbGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xufVxuXG4vLyBUT0RPKGthcmEpOiByZW1vdmUgYWZ0ZXIgZGVwcmVjYXRpb24gcGVyaW9kXG5leHBvcnQgZnVuY3Rpb24gX25nTW9kZWxXYXJuaW5nKFxuICAgIG5hbWU6IHN0cmluZywgdHlwZToge19uZ01vZGVsV2FybmluZ1NlbnRPbmNlOiBib29sZWFufSxcbiAgICBpbnN0YW5jZToge19uZ01vZGVsV2FybmluZ1NlbnQ6IGJvb2xlYW59LCB3YXJuaW5nQ29uZmlnOiBzdHJpbmd8bnVsbCkge1xuICBpZiAod2FybmluZ0NvbmZpZyA9PT0gJ25ldmVyJykgcmV0dXJuO1xuXG4gIGlmICgoKHdhcm5pbmdDb25maWcgPT09IG51bGwgfHwgd2FybmluZ0NvbmZpZyA9PT0gJ29uY2UnKSAmJiAhdHlwZS5fbmdNb2RlbFdhcm5pbmdTZW50T25jZSkgfHxcbiAgICAgICh3YXJuaW5nQ29uZmlnID09PSAnYWx3YXlzJyAmJiAhaW5zdGFuY2UuX25nTW9kZWxXYXJuaW5nU2VudCkpIHtcbiAgICBjb25zb2xlLndhcm4obmdNb2RlbFdhcm5pbmcobmFtZSkpO1xuICAgIHR5cGUuX25nTW9kZWxXYXJuaW5nU2VudE9uY2UgPSB0cnVlO1xuICAgIGluc3RhbmNlLl9uZ01vZGVsV2FybmluZ1NlbnQgPSB0cnVlO1xuICB9XG59XG4iXX0=