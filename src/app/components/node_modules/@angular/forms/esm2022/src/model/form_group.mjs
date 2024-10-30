/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AbstractControl, assertAllValuesPresent, assertControlPresent, pickAsyncValidators, pickValidators } from './abstract_model';
/**
 * Tracks the value and validity state of a group of `FormControl` instances.
 *
 * A `FormGroup` aggregates the values of each child `FormControl` into one object,
 * with each control name as the key.  It calculates its status by reducing the status values
 * of its children. For example, if one of the controls in a group is invalid, the entire
 * group becomes invalid.
 *
 * `FormGroup` is one of the four fundamental building blocks used to define forms in Angular,
 * along with `FormControl`, `FormArray`, and `FormRecord`.
 *
 * When instantiating a `FormGroup`, pass in a collection of child controls as the first
 * argument. The key for each child registers the name for the control.
 *
 * `FormGroup` is intended for use cases where the keys are known ahead of time.
 * If you need to dynamically add and remove controls, use {@link FormRecord} instead.
 *
 * `FormGroup` accepts an optional type parameter `TControl`, which is an object type with inner
 * control types as values.
 *
 * @usageNotes
 *
 * ### Create a form group with 2 controls
 *
 * ```
 * const form = new FormGroup({
 *   first: new FormControl('Nancy', Validators.minLength(2)),
 *   last: new FormControl('Drew'),
 * });
 *
 * console.log(form.value);   // {first: 'Nancy', last; 'Drew'}
 * console.log(form.status);  // 'VALID'
 * ```
 *
 * ### The type argument, and optional controls
 *
 * `FormGroup` accepts one generic argument, which is an object containing its inner controls.
 * This type will usually be inferred automatically, but you can always specify it explicitly if you
 * wish.
 *
 * If you have controls that are optional (i.e. they can be removed, you can use the `?` in the
 * type):
 *
 * ```
 * const form = new FormGroup<{
 *   first: FormControl<string|null>,
 *   middle?: FormControl<string|null>, // Middle name is optional.
 *   last: FormControl<string|null>,
 * }>({
 *   first: new FormControl('Nancy'),
 *   last: new FormControl('Drew'),
 * });
 * ```
 *
 * ### Create a form group with a group-level validator
 *
 * You include group-level validators as the second arg, or group-level async
 * validators as the third arg. These come in handy when you want to perform validation
 * that considers the value of more than one child control.
 *
 * ```
 * const form = new FormGroup({
 *   password: new FormControl('', Validators.minLength(2)),
 *   passwordConfirm: new FormControl('', Validators.minLength(2)),
 * }, passwordMatchValidator);
 *
 *
 * function passwordMatchValidator(g: FormGroup) {
 *    return g.get('password').value === g.get('passwordConfirm').value
 *       ? null : {'mismatch': true};
 * }
 * ```
 *
 * Like `FormControl` instances, you choose to pass in
 * validators and async validators as part of an options object.
 *
 * ```
 * const form = new FormGroup({
 *   password: new FormControl('')
 *   passwordConfirm: new FormControl('')
 * }, { validators: passwordMatchValidator, asyncValidators: otherValidator });
 * ```
 *
 * ### Set the updateOn property for all controls in a form group
 *
 * The options object is used to set a default value for each child
 * control's `updateOn` property. If you set `updateOn` to `'blur'` at the
 * group level, all child controls default to 'blur', unless the child
 * has explicitly specified a different `updateOn` value.
 *
 * ```ts
 * const c = new FormGroup({
 *   one: new FormControl()
 * }, { updateOn: 'blur' });
 * ```
 *
 * ### Using a FormGroup with optional controls
 *
 * It is possible to have optional controls in a FormGroup. An optional control can be removed later
 * using `removeControl`, and can be omitted when calling `reset`. Optional controls must be
 * declared optional in the group's type.
 *
 * ```ts
 * const c = new FormGroup<{one?: FormControl<string>}>({
 *   one: new FormControl('')
 * });
 * ```
 *
 * Notice that `c.value.one` has type `string|null|undefined`. This is because calling `c.reset({})`
 * without providing the optional key `one` will cause it to become `null`.
 *
 * @publicApi
 */
export class FormGroup extends AbstractControl {
    /**
     * Creates a new `FormGroup` instance.
     *
     * @param controls A collection of child controls. The key for each child is the name
     * under which it is registered.
     *
     * @param validatorOrOpts A synchronous validator function, or an array of
     * such functions, or an `AbstractControlOptions` object that contains validation functions
     * and a validation trigger.
     *
     * @param asyncValidator A single async validator or array of async validator functions
     *
     */
    constructor(controls, validatorOrOpts, asyncValidator) {
        super(pickValidators(validatorOrOpts), pickAsyncValidators(asyncValidator, validatorOrOpts));
        (typeof ngDevMode === 'undefined' || ngDevMode) && validateFormGroupControls(controls);
        this.controls = controls;
        this._initObservables();
        this._setUpdateStrategy(validatorOrOpts);
        this._setUpControls();
        this.updateValueAndValidity({
            onlySelf: true,
            // If `asyncValidator` is present, it will trigger control status change from `PENDING` to
            // `VALID` or `INVALID`. The status should be broadcasted via the `statusChanges` observable,
            // so we set `emitEvent` to `true` to allow that during the control creation process.
            emitEvent: !!this.asyncValidator
        });
    }
    registerControl(name, control) {
        if (this.controls[name])
            return this.controls[name];
        this.controls[name] = control;
        control.setParent(this);
        control._registerOnCollectionChange(this._onCollectionChange);
        return control;
    }
    addControl(name, control, options = {}) {
        this.registerControl(name, control);
        this.updateValueAndValidity({ emitEvent: options.emitEvent });
        this._onCollectionChange();
    }
    /**
     * Remove a control from this group. In a strongly-typed group, required controls cannot be
     * removed.
     *
     * This method also updates the value and validity of the control.
     *
     * @param name The control name to remove from the collection
     * @param options Specifies whether this FormGroup instance should emit events after a
     *     control is removed.
     * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
     * `valueChanges` observables emit events with the latest status and value when the control is
     * removed. When false, no events are emitted.
     */
    removeControl(name, options = {}) {
        if (this.controls[name])
            this.controls[name]._registerOnCollectionChange(() => { });
        delete (this.controls[name]);
        this.updateValueAndValidity({ emitEvent: options.emitEvent });
        this._onCollectionChange();
    }
    setControl(name, control, options = {}) {
        if (this.controls[name])
            this.controls[name]._registerOnCollectionChange(() => { });
        delete (this.controls[name]);
        if (control)
            this.registerControl(name, control);
        this.updateValueAndValidity({ emitEvent: options.emitEvent });
        this._onCollectionChange();
    }
    contains(controlName) {
        return this.controls.hasOwnProperty(controlName) && this.controls[controlName].enabled;
    }
    /**
     * Sets the value of the `FormGroup`. It accepts an object that matches
     * the structure of the group, with control names as keys.
     *
     * @usageNotes
     * ### Set the complete value for the form group
     *
     * ```
     * const form = new FormGroup({
     *   first: new FormControl(),
     *   last: new FormControl()
     * });
     *
     * console.log(form.value);   // {first: null, last: null}
     *
     * form.setValue({first: 'Nancy', last: 'Drew'});
     * console.log(form.value);   // {first: 'Nancy', last: 'Drew'}
     * ```
     *
     * @throws When strict checks fail, such as setting the value of a control
     * that doesn't exist or if you exclude a value of a control that does exist.
     *
     * @param value The new value for the control that matches the structure of the group.
     * @param options Configuration options that determine how the control propagates changes
     * and emits events after the value changes.
     * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
     * updateValueAndValidity} method.
     *
     * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
     * false.
     * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
     * `valueChanges`
     * observables emit events with the latest status and value when the control value is updated.
     * When false, no events are emitted.
     */
    setValue(value, options = {}) {
        assertAllValuesPresent(this, true, value);
        Object.keys(value).forEach(name => {
            assertControlPresent(this, true, name);
            this.controls[name].setValue(value[name], { onlySelf: true, emitEvent: options.emitEvent });
        });
        this.updateValueAndValidity(options);
    }
    /**
     * Patches the value of the `FormGroup`. It accepts an object with control
     * names as keys, and does its best to match the values to the correct controls
     * in the group.
     *
     * It accepts both super-sets and sub-sets of the group without throwing an error.
     *
     * @usageNotes
     * ### Patch the value for a form group
     *
     * ```
     * const form = new FormGroup({
     *    first: new FormControl(),
     *    last: new FormControl()
     * });
     * console.log(form.value);   // {first: null, last: null}
     *
     * form.patchValue({first: 'Nancy'});
     * console.log(form.value);   // {first: 'Nancy', last: null}
     * ```
     *
     * @param value The object that matches the structure of the group.
     * @param options Configuration options that determine how the control propagates changes and
     * emits events after the value is patched.
     * * `onlySelf`: When true, each change only affects this control and not its parent. Default is
     * true.
     * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
     * `valueChanges` observables emit events with the latest status and value when the control value
     * is updated. When false, no events are emitted. The configuration options are passed to
     * the {@link AbstractControl#updateValueAndValidity updateValueAndValidity} method.
     */
    patchValue(value, options = {}) {
        // Even though the `value` argument type doesn't allow `null` and `undefined` values, the
        // `patchValue` can be called recursively and inner data structures might have these values, so
        // we just ignore such cases when a field containing FormGroup instance receives `null` or
        // `undefined` as a value.
        if (value == null /* both `null` and `undefined` */)
            return;
        Object.keys(value).forEach(name => {
            // The compiler cannot see through the uninstantiated conditional type of `this.controls`, so
            // `as any` is required.
            const control = this.controls[name];
            if (control) {
                control.patchValue(
                /* Guaranteed to be present, due to the outer forEach. */ value[name], { onlySelf: true, emitEvent: options.emitEvent });
            }
        });
        this.updateValueAndValidity(options);
    }
    /**
     * Resets the `FormGroup`, marks all descendants `pristine` and `untouched` and sets
     * the value of all descendants to their default values, or null if no defaults were provided.
     *
     * You reset to a specific form state by passing in a map of states
     * that matches the structure of your form, with control names as keys. The state
     * is a standalone value or a form state object with both a value and a disabled
     * status.
     *
     * @param value Resets the control with an initial value,
     * or an object that defines the initial value and disabled state.
     *
     * @param options Configuration options that determine how the control propagates changes
     * and emits events when the group is reset.
     * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
     * false.
     * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
     * `valueChanges`
     * observables emit events with the latest status and value when the control is reset.
     * When false, no events are emitted.
     * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
     * updateValueAndValidity} method.
     *
     * @usageNotes
     *
     * ### Reset the form group values
     *
     * ```ts
     * const form = new FormGroup({
     *   first: new FormControl('first name'),
     *   last: new FormControl('last name')
     * });
     *
     * console.log(form.value);  // {first: 'first name', last: 'last name'}
     *
     * form.reset({ first: 'name', last: 'last name' });
     *
     * console.log(form.value);  // {first: 'name', last: 'last name'}
     * ```
     *
     * ### Reset the form group values and disabled status
     *
     * ```
     * const form = new FormGroup({
     *   first: new FormControl('first name'),
     *   last: new FormControl('last name')
     * });
     *
     * form.reset({
     *   first: {value: 'name', disabled: true},
     *   last: 'last'
     * });
     *
     * console.log(form.value);  // {last: 'last'}
     * console.log(form.get('first').status);  // 'DISABLED'
     * ```
     */
    reset(value = {}, options = {}) {
        this._forEachChild((control, name) => {
            control.reset(value ? value[name] : null, { onlySelf: true, emitEvent: options.emitEvent });
        });
        this._updatePristine(options);
        this._updateTouched(options);
        this.updateValueAndValidity(options);
    }
    /**
     * The aggregate value of the `FormGroup`, including any disabled controls.
     *
     * Retrieves all values regardless of disabled status.
     */
    getRawValue() {
        return this._reduceChildren({}, (acc, control, name) => {
            acc[name] = control.getRawValue();
            return acc;
        });
    }
    /** @internal */
    _syncPendingControls() {
        let subtreeUpdated = this._reduceChildren(false, (updated, child) => {
            return child._syncPendingControls() ? true : updated;
        });
        if (subtreeUpdated)
            this.updateValueAndValidity({ onlySelf: true });
        return subtreeUpdated;
    }
    /** @internal */
    _forEachChild(cb) {
        Object.keys(this.controls).forEach(key => {
            // The list of controls can change (for ex. controls might be removed) while the loop
            // is running (as a result of invoking Forms API in `valueChanges` subscription), so we
            // have to null check before invoking the callback.
            const control = this.controls[key];
            control && cb(control, key);
        });
    }
    /** @internal */
    _setUpControls() {
        this._forEachChild((control) => {
            control.setParent(this);
            control._registerOnCollectionChange(this._onCollectionChange);
        });
    }
    /** @internal */
    _updateValue() {
        this.value = this._reduceValue();
    }
    /** @internal */
    _anyControls(condition) {
        for (const [controlName, control] of Object.entries(this.controls)) {
            if (this.contains(controlName) && condition(control)) {
                return true;
            }
        }
        return false;
    }
    /** @internal */
    _reduceValue() {
        let acc = {};
        return this._reduceChildren(acc, (acc, control, name) => {
            if (control.enabled || this.disabled) {
                acc[name] = control.value;
            }
            return acc;
        });
    }
    /** @internal */
    _reduceChildren(initValue, fn) {
        let res = initValue;
        this._forEachChild((control, name) => {
            res = fn(res, control, name);
        });
        return res;
    }
    /** @internal */
    _allControlsDisabled() {
        for (const controlName of Object.keys(this.controls)) {
            if (this.controls[controlName].enabled) {
                return false;
            }
        }
        return Object.keys(this.controls).length > 0 || this.disabled;
    }
    /** @internal */
    _find(name) {
        return this.controls.hasOwnProperty(name) ?
            this.controls[name] :
            null;
    }
}
/**
 * Will validate that none of the controls has a key with a dot
 * Throws other wise
 */
function validateFormGroupControls(controls) {
    const invalidKeys = Object.keys(controls).filter(key => key.includes('.'));
    if (invalidKeys.length > 0) {
        // TODO: make this an error once there are no more uses in G3
        console.warn(`FormGroup keys cannot include \`.\`, please replace the keys for: ${invalidKeys.join(',')}.`);
    }
}
export const UntypedFormGroup = FormGroup;
/**
 * @description
 * Asserts that the given control is an instance of `FormGroup`
 *
 * @publicApi
 */
export const isFormGroup = (control) => control instanceof FormGroup;
/**
 * Tracks the value and validity state of a collection of `FormControl` instances, each of which has
 * the same value type.
 *
 * `FormRecord` is very similar to {@link FormGroup}, except it can be used with a dynamic keys,
 * with controls added and removed as needed.
 *
 * `FormRecord` accepts one generic argument, which describes the type of the controls it contains.
 *
 * @usageNotes
 *
 * ```
 * let numbers = new FormRecord({bill: new FormControl('415-123-456')});
 * numbers.addControl('bob', new FormControl('415-234-567'));
 * numbers.removeControl('bill');
 * ```
 *
 * @publicApi
 */
export class FormRecord extends FormGroup {
}
/**
 * @description
 * Asserts that the given control is an instance of `FormRecord`
 *
 * @publicApi
 */
export const isFormRecord = (control) => control instanceof FormRecord;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybV9ncm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Zvcm1zL3NyYy9tb2RlbC9mb3JtX2dyb3VwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQU1ILE9BQU8sRUFBQyxlQUFlLEVBQTBCLHNCQUFzQixFQUFFLG9CQUFvQixFQUFFLG1CQUFtQixFQUFFLGNBQWMsRUFBcUMsTUFBTSxrQkFBa0IsQ0FBQztBQWlDaE07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnSEc7QUFDSCxNQUFNLE9BQU8sU0FBZ0YsU0FDekYsZUFFaUU7SUFDbkU7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsWUFDSSxRQUFrQixFQUFFLGVBQXVFLEVBQzNGLGNBQXlEO1FBQzNELEtBQUssQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLEVBQUUsbUJBQW1CLENBQUMsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDN0YsQ0FBQyxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxDQUFDLElBQUkseUJBQXlCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkYsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsc0JBQXNCLENBQUM7WUFDMUIsUUFBUSxFQUFFLElBQUk7WUFDZCwwRkFBMEY7WUFDMUYsNkZBQTZGO1lBQzdGLHFGQUFxRjtZQUNyRixTQUFTLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxj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UUFBNkQ7SUFDL0QsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDM0UsSUFBSSxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQzNCLDZEQUE2RDtRQUM3RCxPQUFPLENBQUMsSUFBSSxDQUFDLHFFQUNULFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7QUFDSCxDQUFDO0FBb0JELE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUF5QixTQUFTLENBQUM7QUFFaEU7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsQ0FBQyxPQUFnQixFQUF3QixFQUFFLENBQUMsT0FBTyxZQUFZLFNBQVMsQ0FBQztBQUVwRzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxPQUFPLFVBQStELFNBQ3hFLFNBQW9DO0NBQUc7QUFnRjNDOzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLENBQUMsT0FBZ0IsRUFBeUIsRUFBRSxDQUNwRSxPQUFPLFlBQVksVUFBVSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7ybVXcml0YWJsZSBhcyBXcml0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QXN5bmNWYWxpZGF0b3JGbiwgVmFsaWRhdG9yRm59IGZyb20gJy4uL2RpcmVjdGl2ZXMvdmFsaWRhdG9ycyc7XG5cbmltcG9ydCB7QWJzdHJhY3RDb250cm9sLCBBYnN0cmFjdENvbnRyb2xPcHRpb25zLCBhc3NlcnRBbGxWYWx1ZXNQcmVzZW50LCBhc3NlcnRDb250cm9sUHJlc2VudCwgcGlja0FzeW5jVmFsaWRhdG9ycywgcGlja1ZhbGlkYXRvcnMsIMm1UmF3VmFsdWUsIMm1VHlwZWRPclVudHlwZWQsIMm1VmFsdWV9IGZyb20gJy4vYWJzdHJhY3RfbW9kZWwnO1xuXG4vKipcbiAqIEZvcm1Hcm91cFZhbHVlIGV4dHJhY3RzIHRoZSB0eXBlIG9mIGAudmFsdWVgIGZyb20gYSBGb3JtR3JvdXAncyBpbm5lciBvYmplY3QgdHlwZS4gVGhlIHVudHlwZWRcbiAqIGNhc2UgZmFsbHMgYmFjayB0byB7W2tleTogc3RyaW5nXTogYW55fS5cbiAqXG4gKiBBbmd1bGFyIHVzZXMgdGhpcyB0eXBlIGludGVybmFsbHkgdG8gc3VwcG9ydCBUeXBlZCBGb3JtczsgZG8gbm90IHVzZSBpdCBkaXJlY3RseS5cbiAqXG4gKiBGb3IgaW50ZXJuYWwgdXNlIG9ubHkuXG4gKi9cbmV4cG9ydCB0eXBlIMm1Rm9ybUdyb3VwVmFsdWU8VCBleHRlbmRzIHtbSyBpbiBrZXlvZiBUXT86IEFic3RyYWN0Q29udHJvbDxhbnk+fT4gPVxuICAgIMm1VHlwZWRPclVudHlwZWQ8VCwgUGFydGlhbDx7W0sgaW4ga2V5b2YgVF06IMm1VmFsdWU8VFtLXT59Piwge1trZXk6IHN0cmluZ106IGFueX0+O1xuXG4vKipcbiAqIEZvcm1Hcm91cFJhd1ZhbHVlIGV4dHJhY3RzIHRoZSB0eXBlIG9mIGAuZ2V0UmF3VmFsdWUoKWAgZnJvbSBhIEZvcm1Hcm91cCdzIGlubmVyIG9iamVjdCB0eXBlLiBUaGVcbiAqIHVudHlwZWQgY2FzZSBmYWxscyBiYWNrIHRvIHtba2V5OiBzdHJpbmddOiBhbnl9LlxuICpcbiAqIEFuZ3VsYXIgdXNlcyB0aGlzIHR5cGUgaW50ZXJuYWxseSB0byBzdXBwb3J0IFR5cGVkIEZvcm1zOyBkbyBub3QgdXNlIGl0IGRpcmVjdGx5LlxuICpcbiAqIEZvciBpbnRlcm5hbCB1c2Ugb25seS5cbiAqL1xuZXhwb3J0IHR5cGUgybVGb3JtR3JvdXBSYXdWYWx1ZTxUIGV4dGVuZHMge1tLIGluIGtleW9mIFRdPzogQWJzdHJhY3RDb250cm9sPGFueT59PiA9XG4gICAgybVUeXBlZE9yVW50eXBlZDxULCB7W0sgaW4ga2V5b2YgVF06IMm1UmF3VmFsdWU8VFtLXT59LCB7W2tleTogc3RyaW5nXTogYW55fT47XG5cbi8qKlxuICogT3B0aW9uYWxLZXlzIHJldHVybnMgdGhlIHVuaW9uIG9mIGFsbCBvcHRpb25hbCBrZXlzIGluIHRoZSBvYmplY3QuXG4gKlxuICogQW5ndWxhciB1c2VzIHRoaXMgdHlwZSBpbnRlcm5hbGx5IHRvIHN1cHBvcnQgVHlwZWQgRm9ybXM7IGRvIG5vdCB1c2UgaXQgZGlyZWN0bHkuXG4gKi9cbmV4cG9ydCB0eXBlIMm1T3B0aW9uYWxLZXlzPFQ+ID0ge1xuICBbSyBpbiBrZXlvZiBUXSAtPzogdW5kZWZpbmVkIGV4dGVuZHMgVFtLXSA/IEsgOiBuZXZlclxufVtrZXlvZiBUXTtcblxuLyoqXG4gKiBUcmFja3MgdGhlIHZhbHVlIGFuZCB2YWxpZGl0eSBzdGF0ZSBvZiBhIGdyb3VwIG9mIGBGb3JtQ29udHJvbGAgaW5zdGFuY2VzLlxuICpcbiAqIEEgYEZvcm1Hcm91cGAgYWdncmVnYXRlcyB0aGUgdmFsdWVzIG9mIGVhY2ggY2hpbGQgYEZvcm1Db250cm9sYCBpbnRvIG9uZSBvYmplY3QsXG4gKiB3aXRoIGVhY2ggY29udHJvbCBuYW1lIGFzIHRoZSBrZXkuICBJdCBjYWxjdWxhdGVzIGl0cyBzdGF0dXMgYnkgcmVkdWNpbmcgdGhlIHN0YXR1cyB2YWx1ZXNcbiAqIG9mIGl0cyBjaGlsZHJlbi4gRm9yIGV4YW1wbGUsIGlmIG9uZSBvZiB0aGUgY29udHJvbHMgaW4gYSBncm91cCBpcyBpbnZhbGlkLCB0aGUgZW50aXJlXG4gKiBncm91cCBiZWNvbWVzIGludmFsaWQuXG4gKlxuICogYEZvcm1Hcm91cGAgaXMgb25lIG9mIHRoZSBmb3VyIGZ1bmRhbWVudGFsIGJ1aWxkaW5nIGJsb2NrcyB1c2VkIHRvIGRlZmluZSBmb3JtcyBpbiBBbmd1bGFyLFxuICogYWxvbmcgd2l0aCBgRm9ybUNvbnRyb2xgLCBgRm9ybUFycmF5YCwgYW5kIGBGb3JtUmVjb3JkYC5cbiAqXG4gKiBXaGVuIGluc3RhbnRpYXRpbmcgYSBgRm9ybUdyb3VwYCwgcGFzcyBpbiBhIGNvbGxlY3Rpb24gb2YgY2hpbGQgY29udHJvbHMgYXMgdGhlIGZpcnN0XG4gKiBhcmd1bWVudC4gVGhlIGtleSBmb3IgZWFjaCBjaGlsZCByZWdpc3RlcnMgdGhlIG5hbWUgZm9yIHRoZSBjb250cm9sLlxuICpcbiAqIGBGb3JtR3JvdXBgIGlzIGludGVuZGVkIGZvciB1c2UgY2FzZXMgd2hlcmUgdGhlIGtleXMgYXJlIGtub3duIGFoZWFkIG9mIHRpbWUuXG4gKiBJZiB5b3UgbmVlZCB0byBkeW5hbWljYWxseSBhZGQgYW5kIHJlbW92ZSBjb250cm9scywgdXNlIHtAbGluayBGb3JtUmVjb3JkfSBpbnN0ZWFkLlxuICpcbiAqIGBGb3JtR3JvdXBgIGFjY2VwdHMgYW4gb3B0aW9uYWwgdHlwZSBwYXJhbWV0ZXIgYFRDb250cm9sYCwgd2hpY2ggaXMgYW4gb2JqZWN0IHR5cGUgd2l0aCBpbm5lclxuICogY29udHJvbCB0eXBlcyBhcyB2YWx1ZXMuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiAjIyMgQ3JlYXRlIGEgZm9ybSBncm91cCB3aXRoIDIgY29udHJvbHNcbiAqXG4gKiBgYGBcbiAqIGNvbnN0IGZvcm0gPSBuZXcgRm9ybUdyb3VwKHtcbiAqICAgZmlyc3Q6IG5ldyBGb3JtQ29udHJvbCgnTmFuY3knLCBWYWxpZGF0b3JzLm1pbkxlbmd0aCgyKSksXG4gKiAgIGxhc3Q6IG5ldyBGb3JtQ29udHJvbCgnRHJldycpLFxuICogfSk7XG4gKlxuICogY29uc29sZS5sb2coZm9ybS52YWx1ZSk7ICAgLy8ge2ZpcnN0OiAnTmFuY3knLCBsYXN0OyAnRHJldyd9XG4gKiBjb25zb2xlLmxvZyhmb3JtLnN0YXR1cyk7ICAvLyAnVkFMSUQnXG4gKiBgYGBcbiAqXG4gKiAjIyMgVGhlIHR5cGUgYXJndW1lbnQsIGFuZCBvcHRpb25hbCBjb250cm9sc1xuICpcbiAqIGBGb3JtR3JvdXBgIGFjY2VwdHMgb25lIGdlbmVyaWMgYXJndW1lbnQsIHdoaWNoIGlzIGFuIG9iamVjdCBjb250YWluaW5nIGl0cyBpbm5lciBjb250cm9scy5cbiAqIFRoaXMgdHlwZSB3aWxsIHVzdWFsbHkgYmUgaW5mZXJyZWQgYXV0b21hdGljYWxseSwgYnV0IHlvdSBjYW4gYWx3YXlzIHNwZWNpZnkgaXQgZXhwbGljaXRseSBpZiB5b3VcbiAqIHdpc2guXG4gKlxuICogSWYgeW91IGhhdmUgY29udHJvbHMgdGhhdCBhcmUgb3B0aW9uYWwgKGkuZS4gdGhleSBjYW4gYmUgcmVtb3ZlZCwgeW91IGNhbiB1c2UgdGhlIGA/YCBpbiB0aGVcbiAqIHR5cGUpOlxuICpcbiAqIGBgYFxuICogY29uc3QgZm9ybSA9IG5ldyBGb3JtR3JvdXA8e1xuICogICBmaXJzdDogRm9ybUNvbnRyb2w8c3RyaW5nfG51bGw+LFxuICogICBtaWRkbGU/OiBGb3JtQ29udHJvbDxzdHJpbmd8bnVsbD4sIC8vIE1pZGRsZSBuYW1lIGlzIG9wdGlvbmFsLlxuICogICBsYXN0OiBGb3JtQ29udHJvbDxzdHJpbmd8bnVsbD4sXG4gKiB9Pih7XG4gKiAgIGZpcnN0OiBuZXcgRm9ybUNvbnRyb2woJ05hbmN5JyksXG4gKiAgIGxhc3Q6IG5ldyBGb3JtQ29udHJvbCgnRHJldycpLFxuICogfSk7XG4gKiBgYGBcbiAqXG4gKiAjIyMgQ3JlYXRlIGEgZm9ybSBncm91cCB3aXRoIGEgZ3JvdXAtbGV2ZWwgdmFsaWRhdG9yXG4gKlxuICogWW91IGluY2x1ZGUgZ3JvdXAtbGV2ZWwgdmFsaWRhdG9ycyBhcyB0aGUgc2Vjb25kIGFyZywgb3IgZ3JvdXAtbGV2ZWwgYXN5bmNcbiAqIHZhbGlkYXRvcnMgYXMgdGhlIHRoaXJkIGFyZy4gVGhlc2UgY29tZSBpbiBoYW5keSB3aGVuIHlvdSB3YW50IHRvIHBlcmZvcm0gdmFsaWRhdGlvblxuICogdGhhdCBjb25zaWRlcnMgdGhlIHZhbHVlIG9mIG1vcmUgdGhhbiBvbmUgY2hpbGQgY29udHJvbC5cbiAqXG4gKiBgYGBcbiAqIGNvbnN0IGZvcm0gPSBuZXcgRm9ybUdyb3VwKHtcbiAqICAgcGFzc3dvcmQ6IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5taW5MZW5ndGgoMikpLFxuICogICBwYXNzd29yZENvbmZpcm06IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5taW5MZW5ndGgoMikpLFxuICogfSwgcGFzc3dvcmRNYXRjaFZhbGlkYXRvcik7XG4gKlxuICpcbiAqIGZ1bmN0aW9uIHBhc3N3b3JkTWF0Y2hWYWxpZGF0b3IoZzogRm9ybUdyb3VwKSB7XG4gKiAgICByZXR1cm4gZy5nZXQoJ3Bhc3N3b3JkJykudmFsdWUgPT09IGcuZ2V0KCdwYXNzd29yZENvbmZpcm0nKS52YWx1ZVxuICogICAgICAgPyBudWxsIDogeydtaXNtYXRjaCc6IHRydWV9O1xuICogfVxuICogYGBgXG4gKlxuICogTGlrZSBgRm9ybUNvbnRyb2xgIGluc3RhbmNlcywgeW91IGNob29zZSB0byBwYXNzIGluXG4gKiB2YWxpZGF0b3JzIGFuZCBhc3luYyB2YWxpZGF0b3JzIGFzIHBhcnQgb2YgYW4gb3B0aW9ucyBvYmplY3QuXG4gKlxuICogYGBgXG4gKiBjb25zdCBmb3JtID0gbmV3IEZvcm1Hcm91cCh7XG4gKiAgIHBhc3N3b3JkOiBuZXcgRm9ybUNvbnRyb2woJycpXG4gKiAgIHBhc3N3b3JkQ29uZmlybTogbmV3IEZvcm1Db250cm9sKCcnKVxuICogfSwgeyB2YWxpZGF0b3JzOiBwYXNzd29yZE1hdGNoVmFsaWRhdG9yLCBhc3luY1ZhbGlkYXRvcnM6IG90aGVyVmFsaWRhdG9yIH0pO1xuICogYGBgXG4gKlxuICogIyMjIFNldCB0aGUgdXBkYXRlT24gcHJvcGVydHkgZm9yIGFsbCBjb250cm9scyBpbiBhIGZvcm0gZ3JvdXBcbiAqXG4gKiBUaGUgb3B0aW9ucyBvYmplY3QgaXMgdXNlZCB0byBzZXQgYSBkZWZhdWx0IHZhbHVlIGZvciBlYWNoIGNoaWxkXG4gKiBjb250cm9sJ3MgYHVwZGF0ZU9uYCBwcm9wZXJ0eS4gSWYgeW91IHNldCBgdXBkYXRlT25gIHRvIGAnYmx1cidgIGF0IHRoZVxuICogZ3JvdXAgbGV2ZWwsIGFsbCBjaGlsZCBjb250cm9scyBkZWZhdWx0IHRvICdibHVyJywgdW5sZXNzIHRoZSBjaGlsZFxuICogaGFzIGV4cGxpY2l0bHkgc3BlY2lmaWVkIGEgZGlmZmVyZW50IGB1cGRhdGVPbmAgdmFsdWUuXG4gKlxuICogYGBgdHNcbiAqIGNvbnN0IGMgPSBuZXcgRm9ybUdyb3VwKHtcbiAqICAgb25lOiBuZXcgRm9ybUNvbnRyb2woKVxuICogfSwgeyB1cGRhdGVPbjogJ2JsdXInIH0pO1xuICogYGBgXG4gKlxuICogIyMjIFVzaW5nIGEgRm9ybUdyb3VwIHdpdGggb3B0aW9uYWwgY29udHJvbHNcbiAqXG4gKiBJdCBpcyBwb3NzaWJsZSB0byBoYXZlIG9wdGlvbmFsIGNvbnRyb2xzIGluIGEgRm9ybUdyb3VwLiBBbiBvcHRpb25hbCBjb250cm9sIGNhbiBiZSByZW1vdmVkIGxhdGVyXG4gKiB1c2luZyBgcmVtb3ZlQ29udHJvbGAsIGFuZCBjYW4gYmUgb21pdHRlZCB3aGVuIGNhbGxpbmcgYHJlc2V0YC4gT3B0aW9uYWwgY29udHJvbHMgbXVzdCBiZVxuICogZGVjbGFyZWQgb3B0aW9uYWwgaW4gdGhlIGdyb3VwJ3MgdHlwZS5cbiAqXG4gKiBgYGB0c1xuICogY29uc3QgYyA9IG5ldyBGb3JtR3JvdXA8e29uZT86IEZvcm1Db250cm9sPHN0cmluZz59Pih7XG4gKiAgIG9uZTogbmV3IEZvcm1Db250cm9sKCcnKVxuICogfSk7XG4gKiBgYGBcbiAqXG4gKiBOb3RpY2UgdGhhdCBgYy52YWx1ZS5vbmVgIGhhcyB0eXBlIGBzdHJpbmd8bnVsbHx1bmRlZmluZWRgLiBUaGlzIGlzIGJlY2F1c2UgY2FsbGluZyBgYy5yZXNldCh7fSlgXG4gKiB3aXRob3V0IHByb3ZpZGluZyB0aGUgb3B0aW9uYWwga2V5IGBvbmVgIHdpbGwgY2F1c2UgaXQgdG8gYmVjb21lIGBudWxsYC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjbGFzcyBGb3JtR3JvdXA8VENvbnRyb2wgZXh0ZW5kcyB7W0sgaW4ga2V5b2YgVENvbnRyb2xdOiBBYnN0cmFjdENvbnRyb2w8YW55Pn0gPSBhbnk+IGV4dGVuZHNcbiAgICBBYnN0cmFjdENvbnRyb2w8XG4gICAgICAgIMm1VHlwZWRPclVudHlwZWQ8VENvbnRyb2wsIMm1Rm9ybUdyb3VwVmFsdWU8VENvbnRyb2w+LCBhbnk+LFxuICAgICAgICDJtVR5cGVkT3JVbnR5cGVkPFRDb250cm9sLCDJtUZvcm1Hcm91cFJhd1ZhbHVlPFRDb250cm9sPiwgYW55Pj4ge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgRm9ybUdyb3VwYCBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIGNvbnRyb2xzIEEgY29sbGVjdGlvbiBvZiBjaGlsZCBjb250cm9scy4gVGhlIGtleSBmb3IgZWFjaCBjaGlsZCBpcyB0aGUgbmFtZVxuICAgKiB1bmRlciB3aGljaCBpdCBpcyByZWdpc3RlcmVkLlxuICAgKlxuICAgKiBAcGFyYW0gdmFsaWRhdG9yT3JPcHRzIEEgc3luY2hyb25vdXMgdmFsaWRhdG9yIGZ1bmN0aW9uLCBvciBhbiBhcnJheSBvZlxuICAgKiBzdWNoIGZ1bmN0aW9ucywgb3IgYW4gYEFic3RyYWN0Q29udHJvbE9wdGlvbnNgIG9iamVjdCB0aGF0IGNvbnRhaW5zIHZhbGlkYXRpb24gZnVuY3Rpb25zXG4gICAqIGFuZCBhIHZhbGlkYXRpb24gdHJpZ2dlci5cbiAgICpcbiAgICogQHBhcmFtIGFzeW5jVmFsaWRhdG9yIEEgc2luZ2xlIGFzeW5jIHZhbGlkYXRvciBvciBhcnJheSBvZiBhc3luYyB2YWxpZGF0b3IgZnVuY3Rpb25zXG4gICAqXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIGNvbnRyb2xzOiBUQ29udHJvbCwgdmFsaWRhdG9yT3JPcHRzPzogVmFsaWRhdG9yRm58VmFsaWRhdG9yRm5bXXxBYnN0cmFjdENvbnRyb2xPcHRpb25zfG51bGwsXG4gICAgICBhc3luY1ZhbGlkYXRvcj86IEFzeW5jVmFsaWRhdG9yRm58QXN5bmNWYWxpZGF0b3JGbltdfG51bGwpIHtcbiAgICBzdXBlcihwaWNrVmFsaWRhdG9ycyh2YWxpZGF0b3JPck9wdHMpLCBwaWNrQXN5bmNWYWxpZGF0b3JzKGFzeW5jVmFsaWRhdG9yLCB2YWxpZGF0b3JPck9wdHMpKTtcbiAgICAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSAmJiB2YWxpZGF0ZUZvcm1Hcm91cENvbnRyb2xzKGNvbnRyb2xzKTtcbiAgICB0aGlzLmNvbnRyb2xzID0gY29udHJvbHM7XG4gICAgdGhpcy5faW5pdE9ic2VydmFibGVzKCk7XG4gICAgdGhpcy5fc2V0VXBkYXRlU3RyYXRlZ3kodmFsaWRhdG9yT3JPcHRzKTtcbiAgICB0aGlzLl9zZXRVcENvbnRyb2xzKCk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHtcbiAgICAgIG9ubHlTZWxmOiB0cnVlLFxuICAgICAgLy8gSWYgYGFzeW5jVmFsaWRhdG9yYCBpcyBwcmVzZW50LCBpdCB3aWxsIHRyaWdnZXIgY29udHJvbCBzdGF0dXMgY2hhbmdlIGZyb20gYFBFTkRJTkdgIHRvXG4gICAgICAvLyBgVkFMSURgIG9yIGBJTlZBTElEYC4gVGhlIHN0YXR1cyBzaG91bGQgYmUgYnJvYWRjYXN0ZWQgdmlhIHRoZSBgc3RhdHVzQ2hhbmdlc2Agb2JzZXJ2YWJsZSxcbiAgICAgIC8vIHNvIHdlIHNldCBgZW1pdEV2ZW50YCB0byBgdHJ1ZWAgdG8gYWxsb3cgdGhhdCBkdXJpbmcgdGhlIGNvbnRyb2wgY3JlYXRpb24gcHJvY2Vzcy5cbiAgICAgIGVtaXRFdmVudDogISF0aGlzLmFzeW5jVmFsaWRhdG9yXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgY29udHJvbHM6IMm1VHlwZWRPclVudHlwZWQ8VENvbnRyb2wsIFRDb250cm9sLCB7W2tleTogc3RyaW5nXTogQWJzdHJhY3RDb250cm9sPGFueT59PjtcblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgY29udHJvbCB3aXRoIHRoZSBncm91cCdzIGxpc3Qgb2YgY29udHJvbHMuIEluIGEgc3Ryb25nbHktdHlwZWQgZ3JvdXAsIHRoZSBjb250cm9sXG4gICAqIG11c3QgYmUgaW4gdGhlIGdyb3VwJ3MgdHlwZSAocG9zc2libHkgYXMgYW4gb3B0aW9uYWwga2V5KS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZG9lcyBub3QgdXBkYXRlIHRoZSB2YWx1ZSBvciB2YWxpZGl0eSBvZiB0aGUgY29udHJvbC5cbiAgICogVXNlIHtAbGluayBGb3JtR3JvdXAjYWRkQ29udHJvbCBhZGRDb250cm9sfSBpbnN0ZWFkLlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBUaGUgY29udHJvbCBuYW1lIHRvIHJlZ2lzdGVyIGluIHRoZSBjb2xsZWN0aW9uXG4gICAqIEBwYXJhbSBjb250cm9sIFByb3ZpZGVzIHRoZSBjb250cm9sIGZvciB0aGUgZ2l2ZW4gbmFtZVxuICAgKi9cbiAgcmVnaXN0ZXJDb250cm9sPEsgZXh0ZW5kcyBzdHJpbmcma2V5b2YgVENvbnRyb2w+KG5hbWU6IEssIGNvbnRyb2w6IFRDb250cm9sW0tdKTogVENvbnRyb2xbS107XG4gIHJlZ2lzdGVyQ29udHJvbChcbiAgICAgIHRoaXM6IEZvcm1Hcm91cDx7W2tleTogc3RyaW5nXTogQWJzdHJhY3RDb250cm9sPGFueT59PiwgbmFtZTogc3RyaW5nLFxuICAgICAgY29udHJvbDogQWJzdHJhY3RDb250cm9sPGFueT4pOiBBYnN0cmFjdENvbnRyb2w8YW55PjtcblxuICByZWdpc3RlckNvbnRyb2w8SyBleHRlbmRzIHN0cmluZyZrZXlvZiBUQ29udHJvbD4obmFtZTogSywgY29udHJvbDogVENvbnRyb2xbS10pOiBUQ29udHJvbFtLXSB7XG4gICAgaWYgKHRoaXMuY29udHJvbHNbbmFtZV0pIHJldHVybiAodGhpcy5jb250cm9scyBhcyBhbnkpW25hbWVdO1xuICAgIHRoaXMuY29udHJvbHNbbmFtZV0gPSBjb250cm9sO1xuICAgIGNvbnRyb2wuc2V0UGFyZW50KHRoaXMgYXMgRm9ybUdyb3VwKTtcbiAgICBjb250cm9sLl9yZWdpc3Rlck9uQ29sbGVjdGlvbkNoYW5nZSh0aGlzLl9vbkNvbGxlY3Rpb25DaGFuZ2UpO1xuICAgIHJldHVybiBjb250cm9sO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIGNvbnRyb2wgdG8gdGhpcyBncm91cC4gSW4gYSBzdHJvbmdseS10eXBlZCBncm91cCwgdGhlIGNvbnRyb2wgbXVzdCBiZSBpbiB0aGUgZ3JvdXAncyB0eXBlXG4gICAqIChwb3NzaWJseSBhcyBhbiBvcHRpb25hbCBrZXkpLlxuICAgKlxuICAgKiBJZiBhIGNvbnRyb2wgd2l0aCBhIGdpdmVuIG5hbWUgYWxyZWFkeSBleGlzdHMsIGl0IHdvdWxkICpub3QqIGJlIHJlcGxhY2VkIHdpdGggYSBuZXcgb25lLlxuICAgKiBJZiB5b3Ugd2FudCB0byByZXBsYWNlIGFuIGV4aXN0aW5nIGNvbnRyb2wsIHVzZSB0aGUge0BsaW5rIEZvcm1Hcm91cCNzZXRDb250cm9sIHNldENvbnRyb2x9XG4gICAqIG1ldGhvZCBpbnN0ZWFkLiBUaGlzIG1ldGhvZCBhbHNvIHVwZGF0ZXMgdGhlIHZhbHVlIGFuZCB2YWxpZGl0eSBvZiB0aGUgY29udHJvbC5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgVGhlIGNvbnRyb2wgbmFtZSB0byBhZGQgdG8gdGhlIGNvbGxlY3Rpb25cbiAgICogQHBhcmFtIGNvbnRyb2wgUHJvdmlkZXMgdGhlIGNvbnRyb2wgZm9yIHRoZSBnaXZlbiBuYW1lXG4gICAqIEBwYXJhbSBvcHRpb25zIFNwZWNpZmllcyB3aGV0aGVyIHRoaXMgRm9ybUdyb3VwIGluc3RhbmNlIHNob3VsZCBlbWl0IGV2ZW50cyBhZnRlciBhIG5ld1xuICAgKiAgICAgY29udHJvbCBpcyBhZGRlZC5cbiAgICogKiBgZW1pdEV2ZW50YDogV2hlbiB0cnVlIG9yIG5vdCBzdXBwbGllZCAodGhlIGRlZmF1bHQpLCBib3RoIHRoZSBgc3RhdHVzQ2hhbmdlc2AgYW5kXG4gICAqIGB2YWx1ZUNoYW5nZXNgIG9ic2VydmFibGVzIGVtaXQgZXZlbnRzIHdpdGggdGhlIGxhdGVzdCBzdGF0dXMgYW5kIHZhbHVlIHdoZW4gdGhlIGNvbnRyb2wgaXNcbiAgICogYWRkZWQuIFdoZW4gZmFsc2UsIG5vIGV2ZW50cyBhcmUgZW1pdHRlZC5cbiAgICovXG4gIGFkZENvbnRyb2woXG4gICAgICB0aGlzOiBGb3JtR3JvdXA8e1trZXk6IHN0cmluZ106IEFic3RyYWN0Q29udHJvbDxhbnk+fT4sIG5hbWU6IHN0cmluZyxcbiAgICAgIGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgb3B0aW9ucz86IHtlbWl0RXZlbnQ/OiBib29sZWFufSk6IHZvaWQ7XG4gIGFkZENvbnRyb2w8SyBleHRlbmRzIHN0cmluZyZrZXlvZiBUQ29udHJvbD4obmFtZTogSywgY29udHJvbDogUmVxdWlyZWQ8VENvbnRyb2w+W0tdLCBvcHRpb25zPzoge1xuICAgIGVtaXRFdmVudD86IGJvb2xlYW5cbiAgfSk6IHZvaWQ7XG5cbiAgYWRkQ29udHJvbDxLIGV4dGVuZHMgc3RyaW5nJmtleW9mIFRDb250cm9sPihuYW1lOiBLLCBjb250cm9sOiBSZXF1aXJlZDxUQ29udHJvbD5bS10sIG9wdGlvbnM6IHtcbiAgICBlbWl0RXZlbnQ/OiBib29sZWFuXG4gIH0gPSB7fSk6IHZvaWQge1xuICAgIHRoaXMucmVnaXN0ZXJDb250cm9sKG5hbWUsIGNvbnRyb2wpO1xuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSh7ZW1pdEV2ZW50OiBvcHRpb25zLmVtaXRFdmVudH0pO1xuICAgIHRoaXMuX29uQ29sbGVjdGlvbkNoYW5nZSgpO1xuICB9XG5cbiAgcmVtb3ZlQ29udHJvbCh0aGlzOiBGb3JtR3JvdXA8e1trZXk6IHN0cmluZ106IEFic3RyYWN0Q29udHJvbDxhbnk+fT4sIG5hbWU6IHN0cmluZywgb3B0aW9ucz86IHtcbiAgICBlbWl0RXZlbnQ/OiBib29sZWFuO1xuICB9KTogdm9pZDtcbiAgcmVtb3ZlQ29udHJvbDxTIGV4dGVuZHMgc3RyaW5nPihuYW1lOiDJtU9wdGlvbmFsS2V5czxUQ29udHJvbD4mUywgb3B0aW9ucz86IHtcbiAgICBlbWl0RXZlbnQ/OiBib29sZWFuO1xuICB9KTogdm9pZDtcblxuICAvKipcbiAgICogUmVtb3ZlIGEgY29udHJvbCBmcm9tIHRoaXMgZ3JvdXAuIEluIGEgc3Ryb25nbHktdHlwZWQgZ3JvdXAsIHJlcXVpcmVkIGNvbnRyb2xzIGNhbm5vdCBiZVxuICAgKiByZW1vdmVkLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBhbHNvIHVwZGF0ZXMgdGhlIHZhbHVlIGFuZCB2YWxpZGl0eSBvZiB0aGUgY29udHJvbC5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgVGhlIGNvbnRyb2wgbmFtZSB0byByZW1vdmUgZnJvbSB0aGUgY29sbGVjdGlvblxuICAgKiBAcGFyYW0gb3B0aW9ucyBTcGVjaWZpZXMgd2hldGhlciB0aGlzIEZvcm1Hcm91cCBpbnN0YW5jZSBzaG91bGQgZW1pdCBldmVudHMgYWZ0ZXIgYVxuICAgKiAgICAgY29udHJvbCBpcyByZW1vdmVkLlxuICAgKiAqIGBlbWl0RXZlbnRgOiBXaGVuIHRydWUgb3Igbm90IHN1cHBsaWVkICh0aGUgZGVmYXVsdCksIGJvdGggdGhlIGBzdGF0dXNDaGFuZ2VzYCBhbmRcbiAgICogYHZhbHVlQ2hhbmdlc2Agb2JzZXJ2YWJsZXMgZW1pdCBldmVudHMgd2l0aCB0aGUgbGF0ZXN0IHN0YXR1cyBhbmQgdmFsdWUgd2hlbiB0aGUgY29udHJvbCBpc1xuICAgKiByZW1vdmVkLiBXaGVuIGZhbHNlLCBubyBldmVudHMgYXJlIGVtaXR0ZWQuXG4gICAqL1xuICByZW1vdmVDb250cm9sKG5hbWU6IHN0cmluZywgb3B0aW9uczoge2VtaXRFdmVudD86IGJvb2xlYW47fSA9IHt9KTogdm9pZCB7XG4gICAgaWYgKCh0aGlzLmNvbnRyb2xzIGFzIGFueSlbbmFtZV0pXG4gICAgICAodGhpcy5jb250cm9scyBhcyBhbnkpW25hbWVdLl9yZWdpc3Rlck9uQ29sbGVjdGlvbkNoYW5nZSgoKSA9PiB7fSk7XG4gICAgZGVsZXRlICgodGhpcy5jb250cm9scyBhcyBhbnkpW25hbWVdKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoe2VtaXRFdmVudDogb3B0aW9ucy5lbWl0RXZlbnR9KTtcbiAgICB0aGlzLl9vbkNvbGxlY3Rpb25DaGFuZ2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlIGFuIGV4aXN0aW5nIGNvbnRyb2wuIEluIGEgc3Ryb25nbHktdHlwZWQgZ3JvdXAsIHRoZSBjb250cm9sIG11c3QgYmUgaW4gdGhlIGdyb3VwJ3MgdHlwZVxuICAgKiAocG9zc2libHkgYXMgYW4gb3B0aW9uYWwga2V5KS5cbiAgICpcbiAgICogSWYgYSBjb250cm9sIHdpdGggYSBnaXZlbiBuYW1lIGRvZXMgbm90IGV4aXN0IGluIHRoaXMgYEZvcm1Hcm91cGAsIGl0IHdpbGwgYmUgYWRkZWQuXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBjb250cm9sIG5hbWUgdG8gcmVwbGFjZSBpbiB0aGUgY29sbGVjdGlvblxuICAgKiBAcGFyYW0gY29udHJvbCBQcm92aWRlcyB0aGUgY29udHJvbCBmb3IgdGhlIGdpdmVuIG5hbWVcbiAgICogQHBhcmFtIG9wdGlvbnMgU3BlY2lmaWVzIHdoZXRoZXIgdGhpcyBGb3JtR3JvdXAgaW5zdGFuY2Ugc2hvdWxkIGVtaXQgZXZlbnRzIGFmdGVyIGFuXG4gICAqICAgICBleGlzdGluZyBjb250cm9sIGlzIHJlcGxhY2VkLlxuICAgKiAqIGBlbWl0RXZlbnRgOiBXaGVuIHRydWUgb3Igbm90IHN1cHBsaWVkICh0aGUgZGVmYXVsdCksIGJvdGggdGhlIGBzdGF0dXNDaGFuZ2VzYCBhbmRcbiAgICogYHZhbHVlQ2hhbmdlc2Agb2JzZXJ2YWJsZXMgZW1pdCBldmVudHMgd2l0aCB0aGUgbGF0ZXN0IHN0YXR1cyBhbmQgdmFsdWUgd2hlbiB0aGUgY29udHJvbCBpc1xuICAgKiByZXBsYWNlZCB3aXRoIGEgbmV3IG9uZS4gV2hlbiBmYWxzZSwgbm8gZXZlbnRzIGFyZSBlbWl0dGVkLlxuICAgKi9cbiAgc2V0Q29udHJvbDxLIGV4dGVuZHMgc3RyaW5nJmtleW9mIFRDb250cm9sPihuYW1lOiBLLCBjb250cm9sOiBUQ29udHJvbFtLXSwgb3B0aW9ucz86IHtcbiAgICBlbWl0RXZlbnQ/OiBib29sZWFuXG4gIH0pOiB2b2lkO1xuICBzZXRDb250cm9sKFxuICAgICAgdGhpczogRm9ybUdyb3VwPHtba2V5OiBzdHJpbmddOiBBYnN0cmFjdENvbnRyb2w8YW55Pn0+LCBuYW1lOiBzdHJpbmcsXG4gICAgICBjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIG9wdGlvbnM/OiB7ZW1pdEV2ZW50PzogYm9vbGVhbn0pOiB2b2lkO1xuXG4gIHNldENvbnRyb2w8SyBleHRlbmRzIHN0cmluZyZrZXlvZiBUQ29udHJvbD4obmFtZTogSywgY29udHJvbDogVENvbnRyb2xbS10sIG9wdGlvbnM6IHtcbiAgICBlbWl0RXZlbnQ/OiBib29sZWFuXG4gIH0gPSB7fSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbnRyb2xzW25hbWVdKSB0aGlzLmNvbnRyb2xzW25hbWVdLl9yZWdpc3Rlck9uQ29sbGVjdGlvbkNoYW5nZSgoKSA9PiB7fSk7XG4gICAgZGVsZXRlICh0aGlzLmNvbnRyb2xzW25hbWVdKTtcbiAgICBpZiAoY29udHJvbCkgdGhpcy5yZWdpc3RlckNvbnRyb2wobmFtZSwgY29udHJvbCk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHtlbWl0RXZlbnQ6IG9wdGlvbnMuZW1pdEV2ZW50fSk7XG4gICAgdGhpcy5fb25Db2xsZWN0aW9uQ2hhbmdlKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgd2hldGhlciB0aGVyZSBpcyBhbiBlbmFibGVkIGNvbnRyb2wgd2l0aCB0aGUgZ2l2ZW4gbmFtZSBpbiB0aGUgZ3JvdXAuXG4gICAqXG4gICAqIFJlcG9ydHMgZmFsc2UgZm9yIGRpc2FibGVkIGNvbnRyb2xzLiBJZiB5b3UnZCBsaWtlIHRvIGNoZWNrIGZvciBleGlzdGVuY2UgaW4gdGhlIGdyb3VwXG4gICAqIG9ubHksIHVzZSB7QGxpbmsgQWJzdHJhY3RDb250cm9sI2dldCBnZXR9IGluc3RlYWQuXG4gICAqXG4gICAqIEBwYXJhbSBjb250cm9sTmFtZSBUaGUgY29udHJvbCBuYW1lIHRvIGNoZWNrIGZvciBleGlzdGVuY2UgaW4gdGhlIGNvbGxlY3Rpb25cbiAgICpcbiAgICogQHJldHVybnMgZmFsc2UgZm9yIGRpc2FibGVkIGNvbnRyb2xzLCB0cnVlIG90aGVyd2lzZS5cbiAgICovXG4gIGNvbnRhaW5zPEsgZXh0ZW5kcyBzdHJpbmc+KGNvbnRyb2xOYW1lOiBLKTogYm9vbGVhbjtcbiAgY29udGFpbnModGhpczogRm9ybUdyb3VwPHtba2V5OiBzdHJpbmddOiBBYnN0cmFjdENvbnRyb2w8YW55Pn0+LCBjb250cm9sTmFtZTogc3RyaW5nKTogYm9vbGVhbjtcblxuICBjb250YWluczxLIGV4dGVuZHMgc3RyaW5nJmtleW9mIFRDb250cm9sPihjb250cm9sTmFtZTogSyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNvbnRyb2xzLmhhc093blByb3BlcnR5KGNvbnRyb2xOYW1lKSAmJiB0aGlzLmNvbnRyb2xzW2NvbnRyb2xOYW1lXS5lbmFibGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHZhbHVlIG9mIHRoZSBgRm9ybUdyb3VwYC4gSXQgYWNjZXB0cyBhbiBvYmplY3QgdGhhdCBtYXRjaGVzXG4gICAqIHRoZSBzdHJ1Y3R1cmUgb2YgdGhlIGdyb3VwLCB3aXRoIGNvbnRyb2wgbmFtZXMgYXMga2V5cy5cbiAgICpcbiAgICogQHVzYWdlTm90ZXNcbiAgICogIyMjIFNldCB0aGUgY29tcGxldGUgdmFsdWUgZm9yIHRoZSBmb3JtIGdyb3VwXG4gICAqXG4gICAqIGBgYFxuICAgKiBjb25zdCBmb3JtID0gbmV3IEZvcm1Hcm91cCh7XG4gICAqICAgZmlyc3Q6IG5ldyBGb3JtQ29udHJvbCgpLFxuICAgKiAgIGxhc3Q6IG5ldyBGb3JtQ29udHJvbCgpXG4gICAqIH0pO1xuICAgKlxuICAgKiBjb25zb2xlLmxvZyhmb3JtLnZhbHVlKTsgICAvLyB7Zmlyc3Q6IG51bGwsIGxhc3Q6IG51bGx9XG4gICAqXG4gICAqIGZvcm0uc2V0VmFsdWUoe2ZpcnN0OiAnTmFuY3knLCBsYXN0OiAnRHJldyd9KTtcbiAgICogY29uc29sZS5sb2coZm9ybS52YWx1ZSk7ICAgLy8ge2ZpcnN0OiAnTmFuY3knLCBsYXN0OiAnRHJldyd9XG4gICAqIGBgYFxuICAgKlxuICAgKiBAdGhyb3dzIFdoZW4gc3RyaWN0IGNoZWNrcyBmYWlsLCBzdWNoIGFzIHNldHRpbmcgdGhlIHZhbHVlIG9mIGEgY29udHJvbFxuICAgKiB0aGF0IGRvZXNuJ3QgZXhpc3Qgb3IgaWYgeW91IGV4Y2x1ZGUgYSB2YWx1ZSBvZiBhIGNvbnRyb2wgdGhhdCBkb2VzIGV4aXN0LlxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWUgVGhlIG5ldyB2YWx1ZSBmb3IgdGhlIGNvbnRyb2wgdGhhdCBtYXRjaGVzIHRoZSBzdHJ1Y3R1cmUgb2YgdGhlIGdyb3VwLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBDb25maWd1cmF0aW9uIG9wdGlvbnMgdGhhdCBkZXRlcm1pbmUgaG93IHRoZSBjb250cm9sIHByb3BhZ2F0ZXMgY2hhbmdlc1xuICAgKiBhbmQgZW1pdHMgZXZlbnRzIGFmdGVyIHRoZSB2YWx1ZSBjaGFuZ2VzLlxuICAgKiBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIGFyZSBwYXNzZWQgdG8gdGhlIHtAbGluayBBYnN0cmFjdENvbnRyb2wjdXBkYXRlVmFsdWVBbmRWYWxpZGl0eVxuICAgKiB1cGRhdGVWYWx1ZUFuZFZhbGlkaXR5fSBtZXRob2QuXG4gICAqXG4gICAqICogYG9ubHlTZWxmYDogV2hlbiB0cnVlLCBlYWNoIGNoYW5nZSBvbmx5IGFmZmVjdHMgdGhpcyBjb250cm9sLCBhbmQgbm90IGl0cyBwYXJlbnQuIERlZmF1bHQgaXNcbiAgICogZmFsc2UuXG4gICAqICogYGVtaXRFdmVudGA6IFdoZW4gdHJ1ZSBvciBub3Qgc3VwcGxpZWQgKHRoZSBkZWZhdWx0KSwgYm90aCB0aGUgYHN0YXR1c0NoYW5nZXNgIGFuZFxuICAgKiBgdmFsdWVDaGFuZ2VzYFxuICAgKiBvYnNlcnZhYmxlcyBlbWl0IGV2ZW50cyB3aXRoIHRoZSBsYXRlc3Qgc3RhdHVzIGFuZCB2YWx1ZSB3aGVuIHRoZSBjb250cm9sIHZhbHVlIGlzIHVwZGF0ZWQuXG4gICAqIFdoZW4gZmFsc2UsIG5vIGV2ZW50cyBhcmUgZW1pdHRlZC5cbiAgICovXG4gIG92ZXJyaWRlIHNldFZhbHVlKHZhbHVlOiDJtUZvcm1Hcm91cFJhd1ZhbHVlPFRDb250cm9sPiwgb3B0aW9uczoge1xuICAgIG9ubHlTZWxmPzogYm9vbGVhbixcbiAgICBlbWl0RXZlbnQ/OiBib29sZWFuXG4gIH0gPSB7fSk6IHZvaWQge1xuICAgIGFzc2VydEFsbFZhbHVlc1ByZXNlbnQodGhpcywgdHJ1ZSwgdmFsdWUpO1xuICAgIChPYmplY3Qua2V5cyh2YWx1ZSkgYXMgQXJyYXk8a2V5b2YgVENvbnRyb2w+KS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgYXNzZXJ0Q29udHJvbFByZXNlbnQodGhpcywgdHJ1ZSwgbmFtZSBhcyBhbnkpO1xuICAgICAgKHRoaXMuY29udHJvbHMgYXMgYW55KVtuYW1lXS5zZXRWYWx1ZShcbiAgICAgICAgICAodmFsdWUgYXMgYW55KVtuYW1lXSwge29ubHlTZWxmOiB0cnVlLCBlbWl0RXZlbnQ6IG9wdGlvbnMuZW1pdEV2ZW50fSk7XG4gICAgfSk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhdGNoZXMgdGhlIHZhbHVlIG9mIHRoZSBgRm9ybUdyb3VwYC4gSXQgYWNjZXB0cyBhbiBvYmplY3Qgd2l0aCBjb250cm9sXG4gICAqIG5hbWVzIGFzIGtleXMsIGFuZCBkb2VzIGl0cyBiZXN0IHRvIG1hdGNoIHRoZSB2YWx1ZXMgdG8gdGhlIGNvcnJlY3QgY29udHJvbHNcbiAgICogaW4gdGhlIGdyb3VwLlxuICAgKlxuICAgKiBJdCBhY2NlcHRzIGJvdGggc3VwZXItc2V0cyBhbmQgc3ViLXNldHMgb2YgdGhlIGdyb3VwIHdpdGhvdXQgdGhyb3dpbmcgYW4gZXJyb3IuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqICMjIyBQYXRjaCB0aGUgdmFsdWUgZm9yIGEgZm9ybSBncm91cFxuICAgKlxuICAgKiBgYGBcbiAgICogY29uc3QgZm9ybSA9IG5ldyBGb3JtR3JvdXAoe1xuICAgKiAgICBmaXJzdDogbmV3IEZvcm1Db250cm9sKCksXG4gICAqICAgIGxhc3Q6IG5ldyBGb3JtQ29udHJvbCgpXG4gICAqIH0pO1xuICAgKiBjb25zb2xlLmxvZyhmb3JtLnZhbHVlKTsgICAvLyB7Zmlyc3Q6IG51bGwsIGxhc3Q6IG51bGx9XG4gICAqXG4gICAqIGZvcm0ucGF0Y2hWYWx1ZSh7Zmlyc3Q6ICdOYW5jeSd9KTtcbiAgICogY29uc29sZS5sb2coZm9ybS52YWx1ZSk7ICAgLy8ge2ZpcnN0OiAnTmFuY3knLCBsYXN0OiBudWxsfVxuICAgKiBgYGBcbiAgICpcbiAgICogQHBhcmFtIHZhbHVlIFRoZSBvYmplY3QgdGhhdCBtYXRjaGVzIHRoZSBzdHJ1Y3R1cmUgb2YgdGhlIGdyb3VwLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBDb25maWd1cmF0aW9uIG9wdGlvbnMgdGhhdCBkZXRlcm1pbmUgaG93IHRoZSBjb250cm9sIHByb3BhZ2F0ZXMgY2hhbmdlcyBhbmRcbiAgICogZW1pdHMgZXZlbnRzIGFmdGVyIHRoZSB2YWx1ZSBpcyBwYXRjaGVkLlxuICAgKiAqIGBvbmx5U2VsZmA6IFdoZW4gdHJ1ZSwgZWFjaCBjaGFuZ2Ugb25seSBhZmZlY3RzIHRoaXMgY29udHJvbCBhbmQgbm90IGl0cyBwYXJlbnQuIERlZmF1bHQgaXNcbiAgICogdHJ1ZS5cbiAgICogKiBgZW1pdEV2ZW50YDogV2hlbiB0cnVlIG9yIG5vdCBzdXBwbGllZCAodGhlIGRlZmF1bHQpLCBib3RoIHRoZSBgc3RhdHVzQ2hhbmdlc2AgYW5kXG4gICAqIGB2YWx1ZUNoYW5nZXNgIG9ic2VydmFibGVzIGVtaXQgZXZlbnRzIHdpdGggdGhlIGxhdGVzdCBzdGF0dXMgYW5kIHZhbHVlIHdoZW4gdGhlIGNvbnRyb2wgdmFsdWVcbiAgICogaXMgdXBkYXRlZC4gV2hlbiBmYWxzZSwgbm8gZXZlbnRzIGFyZSBlbWl0dGVkLiBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIGFyZSBwYXNzZWQgdG9cbiAgICogdGhlIHtAbGluayBBYnN0cmFjdENvbnRyb2wjdXBkYXRlVmFsdWVBbmRWYWxpZGl0eSB1cGRhdGVWYWx1ZUFuZFZhbGlkaXR5fSBtZXRob2QuXG4gICAqL1xuICBvdmVycmlkZSBwYXRjaFZhbHVlKHZhbHVlOiDJtUZvcm1Hcm91cFZhbHVlPFRDb250cm9sPiwgb3B0aW9uczoge1xuICAgIG9ubHlTZWxmPzogYm9vbGVhbixcbiAgICBlbWl0RXZlbnQ/OiBib29sZWFuXG4gIH0gPSB7fSk6IHZvaWQge1xuICAgIC8vIEV2ZW4gdGhvdWdoIHRoZSBgdmFsdWVgIGFyZ3VtZW50IHR5cGUgZG9lc24ndCBhbGxvdyBgbnVsbGAgYW5kIGB1bmRlZmluZWRgIHZhbHVlcywgdGhlXG4gICAgLy8gYHBhdGNoVmFsdWVgIGNhbiBiZSBjYWxsZWQgcmVjdXJzaXZlbHkgYW5kIGlubmVyIGRhdGEgc3RydWN0dXJlcyBtaWdodCBoYXZlIHRoZXNlIHZhbHVlcywgc29cbiAgICAvLyB3ZSBqdXN0IGlnbm9yZSBzdWNoIGNhc2VzIHdoZW4gYSBmaWVsZCBjb250YWluaW5nIEZvcm1Hcm91cCBpbnN0YW5jZSByZWNlaXZlcyBgbnVsbGAgb3JcbiAgICAvLyBgdW5kZWZpbmVkYCBhcyBhIHZhbHVlLlxuICAgIGlmICh2YWx1ZSA9PSBudWxsIC8qIGJvdGggYG51bGxgIGFuZCBgdW5kZWZpbmVkYCAqLykgcmV0dXJuO1xuICAgIChPYmplY3Qua2V5cyh2YWx1ZSkgYXMgQXJyYXk8a2V5b2YgVENvbnRyb2w+KS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgLy8gVGhlIGNvbXBpbGVyIGNhbm5vdCBzZWUgdGhyb3VnaCB0aGUgdW5pbnN0YW50aWF0ZWQgY29uZGl0aW9uYWwgdHlwZSBvZiBgdGhpcy5jb250cm9sc2AsIHNvXG4gICAgICAvLyBgYXMgYW55YCBpcyByZXF1aXJlZC5cbiAgICAgIGNvbnN0IGNvbnRyb2wgPSAodGhpcy5jb250cm9scyBhcyBhbnkpW25hbWVdO1xuICAgICAgaWYgKGNvbnRyb2wpIHtcbiAgICAgICAgY29udHJvbC5wYXRjaFZhbHVlKFxuICAgICAgICAgICAgLyogR3VhcmFudGVlZCB0byBiZSBwcmVzZW50LCBkdWUgdG8gdGhlIG91dGVyIGZvckVhY2guICovIHZhbHVlXG4gICAgICAgICAgICAgICAgW25hbWUgYXMga2V5b2YgybVGb3JtR3JvdXBWYWx1ZTxUQ29udHJvbD5dISxcbiAgICAgICAgICAgIHtvbmx5U2VsZjogdHJ1ZSwgZW1pdEV2ZW50OiBvcHRpb25zLmVtaXRFdmVudH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eShvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIGBGb3JtR3JvdXBgLCBtYXJrcyBhbGwgZGVzY2VuZGFudHMgYHByaXN0aW5lYCBhbmQgYHVudG91Y2hlZGAgYW5kIHNldHNcbiAgICogdGhlIHZhbHVlIG9mIGFsbCBkZXNjZW5kYW50cyB0byB0aGVpciBkZWZhdWx0IHZhbHVlcywgb3IgbnVsbCBpZiBubyBkZWZhdWx0cyB3ZXJlIHByb3ZpZGVkLlxuICAgKlxuICAgKiBZb3UgcmVzZXQgdG8gYSBzcGVjaWZpYyBmb3JtIHN0YXRlIGJ5IHBhc3NpbmcgaW4gYSBtYXAgb2Ygc3RhdGVzXG4gICAqIHRoYXQgbWF0Y2hlcyB0aGUgc3RydWN0dXJlIG9mIHlvdXIgZm9ybSwgd2l0aCBjb250cm9sIG5hbWVzIGFzIGtleXMuIFRoZSBzdGF0ZVxuICAgKiBpcyBhIHN0YW5kYWxvbmUgdmFsdWUgb3IgYSBmb3JtIHN0YXRlIG9iamVjdCB3aXRoIGJvdGggYSB2YWx1ZSBhbmQgYSBkaXNhYmxlZFxuICAgKiBzdGF0dXMuXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZSBSZXNldHMgdGhlIGNvbnRyb2wgd2l0aCBhbiBpbml0aWFsIHZhbHVlLFxuICAgKiBvciBhbiBvYmplY3QgdGhhdCBkZWZpbmVzIHRoZSBpbml0aWFsIHZhbHVlIGFuZCBkaXNhYmxlZCBzdGF0ZS5cbiAgICpcbiAgICogQHBhcmFtIG9wdGlvbnMgQ29uZmlndXJhdGlvbiBvcHRpb25zIHRoYXQgZGV0ZXJtaW5lIGhvdyB0aGUgY29udHJvbCBwcm9wYWdhdGVzIGNoYW5nZXNcbiAgICogYW5kIGVtaXRzIGV2ZW50cyB3aGVuIHRoZSBncm91cCBpcyByZXNldC5cbiAgICogKiBgb25seVNlbGZgOiBXaGVuIHRydWUsIGVhY2ggY2hhbmdlIG9ubHkgYWZmZWN0cyB0aGlzIGNvbnRyb2wsIGFuZCBub3QgaXRzIHBhcmVudC4gRGVmYXVsdCBpc1xuICAgKiBmYWxzZS5cbiAgICogKiBgZW1pdEV2ZW50YDogV2hlbiB0cnVlIG9yIG5vdCBzdXBwbGllZCAodGhlIGRlZmF1bHQpLCBib3RoIHRoZSBgc3RhdHVzQ2hhbmdlc2AgYW5kXG4gICAqIGB2YWx1ZUNoYW5nZXNgXG4gICAqIG9ic2VydmFibGVzIGVtaXQgZXZlbnRzIHdpdGggdGhlIGxhdGVzdCBzdGF0dXMgYW5kIHZhbHVlIHdoZW4gdGhlIGNvbnRyb2wgaXMgcmVzZXQuXG4gICAqIFdoZW4gZmFsc2UsIG5vIGV2ZW50cyBhcmUgZW1pdHRlZC5cbiAgICogVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyBhcmUgcGFzc2VkIHRvIHRoZSB7QGxpbmsgQWJzdHJhY3RDb250cm9sI3VwZGF0ZVZhbHVlQW5kVmFsaWRpdHlcbiAgICogdXBkYXRlVmFsdWVBbmRWYWxpZGl0eX0gbWV0aG9kLlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKlxuICAgKiAjIyMgUmVzZXQgdGhlIGZvcm0gZ3JvdXAgdmFsdWVzXG4gICAqXG4gICAqIGBgYHRzXG4gICAqIGNvbnN0IGZvcm0gPSBuZXcgRm9ybUdyb3VwKHtcbiAgICogICBmaXJzdDogbmV3IEZvcm1Db250cm9sKCdmaXJzdCBuYW1lJyksXG4gICAqICAgbGFzdDogbmV3IEZvcm1Db250cm9sKCdsYXN0IG5hbWUnKVxuICAgKiB9KTtcbiAgICpcbiAgICogY29uc29sZS5sb2coZm9ybS52YWx1ZSk7ICAvLyB7Zmlyc3Q6ICdmaXJzdCBuYW1lJywgbGFzdDogJ2xhc3QgbmFtZSd9XG4gICAqXG4gICAqIGZvcm0ucmVzZXQoeyBmaXJzdDogJ25hbWUnLCBsYXN0OiAnbGFzdCBuYW1lJyB9KTtcbiAgICpcbiAgICogY29uc29sZS5sb2coZm9ybS52YWx1ZSk7ICAvLyB7Zmlyc3Q6ICduYW1lJywgbGFzdDogJ2xhc3QgbmFtZSd9XG4gICAqIGBgYFxuICAgKlxuICAgKiAjIyMgUmVzZXQgdGhlIGZvcm0gZ3JvdXAgdmFsdWVzIGFuZCBkaXNhYmxlZCBzdGF0dXNcbiAgICpcbiAgICogYGBgXG4gICAqIGNvbnN0IGZvcm0gPSBuZXcgRm9ybUdyb3VwKHtcbiAgICogICBmaXJzdDogbmV3IEZvcm1Db250cm9sKCdmaXJzdCBuYW1lJyksXG4gICAqICAgbGFzdDogbmV3IEZvcm1Db250cm9sKCdsYXN0IG5hbWUnKVxuICAgKiB9KTtcbiAgICpcbiAgICogZm9ybS5yZXNldCh7XG4gICAqICAgZmlyc3Q6IHt2YWx1ZTogJ25hbWUnLCBkaXNhYmxlZDogdHJ1ZX0sXG4gICAqICAgbGFzdDogJ2xhc3QnXG4gICAqIH0pO1xuICAgKlxuICAgKiBjb25zb2xlLmxvZyhmb3JtLnZhbHVlKTsgIC8vIHtsYXN0OiAnbGFzdCd9XG4gICAqIGNvbnNvbGUubG9nKGZvcm0uZ2V0KCdmaXJzdCcpLnN0YXR1cyk7ICAvLyAnRElTQUJMRUQnXG4gICAqIGBgYFxuICAgKi9cbiAgb3ZlcnJpZGUgcmVzZXQoXG4gICAgICB2YWx1ZTogybVUeXBlZE9yVW50eXBlZDxUQ29udHJvbCwgybVGb3JtR3JvdXBWYWx1ZTxUQ29udHJvbD4sIGFueT4gPSB7fSBhcyB1bmtub3duIGFzXG4gICAgICAgICAgybVGb3JtR3JvdXBWYWx1ZTxUQ29udHJvbD4sXG4gICAgICBvcHRpb25zOiB7b25seVNlbGY/OiBib29sZWFuLCBlbWl0RXZlbnQ/OiBib29sZWFufSA9IHt9KTogdm9pZCB7XG4gICAgdGhpcy5fZm9yRWFjaENoaWxkKChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIG5hbWUpID0+IHtcbiAgICAgIGNvbnRyb2wucmVzZXQoXG4gICAgICAgICAgdmFsdWUgPyAodmFsdWUgYXMgYW55KVtuYW1lXSA6IG51bGwsIHtvbmx5U2VsZjogdHJ1ZSwgZW1pdEV2ZW50OiBvcHRpb25zLmVtaXRFdmVudH0pO1xuICAgIH0pO1xuICAgIHRoaXMuX3VwZGF0ZVByaXN0aW5lKG9wdGlvbnMpO1xuICAgIHRoaXMuX3VwZGF0ZVRvdWNoZWQob3B0aW9ucyk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBhZ2dyZWdhdGUgdmFsdWUgb2YgdGhlIGBGb3JtR3JvdXBgLCBpbmNsdWRpbmcgYW55IGRpc2FibGVkIGNvbnRyb2xzLlxuICAgKlxuICAgKiBSZXRyaWV2ZXMgYWxsIHZhbHVlcyByZWdhcmRsZXNzIG9mIGRpc2FibGVkIHN0YXR1cy5cbiAgICovXG4gIG92ZXJyaWRlIGdldFJhd1ZhbHVlKCk6IMm1VHlwZWRPclVudHlwZWQ8VENvbnRyb2wsIMm1Rm9ybUdyb3VwUmF3VmFsdWU8VENvbnRyb2w+LCBhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVkdWNlQ2hpbGRyZW4oe30sIChhY2MsIGNvbnRyb2wsIG5hbWUpID0+IHtcbiAgICAgIChhY2MgYXMgYW55KVtuYW1lXSA9IChjb250cm9sIGFzIGFueSkuZ2V0UmF3VmFsdWUoKTtcbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSkgYXMgYW55O1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBvdmVycmlkZSBfc3luY1BlbmRpbmdDb250cm9scygpOiBib29sZWFuIHtcbiAgICBsZXQgc3VidHJlZVVwZGF0ZWQgPSB0aGlzLl9yZWR1Y2VDaGlsZHJlbihmYWxzZSwgKHVwZGF0ZWQ6IGJvb2xlYW4sIGNoaWxkKSA9PiB7XG4gICAgICByZXR1cm4gY2hpbGQuX3N5bmNQZW5kaW5nQ29udHJvbHMoKSA/IHRydWUgOiB1cGRhdGVkO1xuICAgIH0pO1xuICAgIGlmIChzdWJ0cmVlVXBkYXRlZCkgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHtvbmx5U2VsZjogdHJ1ZX0pO1xuICAgIHJldHVybiBzdWJ0cmVlVXBkYXRlZDtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgb3ZlcnJpZGUgX2ZvckVhY2hDaGlsZChjYjogKHY6IGFueSwgazogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgT2JqZWN0LmtleXModGhpcy5jb250cm9scykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgLy8gVGhlIGxpc3Qgb2YgY29udHJvbHMgY2FuIGNoYW5nZSAoZm9yIGV4LiBjb250cm9scyBtaWdodCBiZSByZW1vdmVkKSB3aGlsZSB0aGUgbG9vcFxuICAgICAgLy8gaXMgcnVubmluZyAoYXMgYSByZXN1bHQgb2YgaW52b2tpbmcgRm9ybXMgQVBJIGluIGB2YWx1ZUNoYW5nZXNgIHN1YnNjcmlwdGlvbiksIHNvIHdlXG4gICAgICAvLyBoYXZlIHRvIG51bGwgY2hlY2sgYmVmb3JlIGludm9raW5nIHRoZSBjYWxsYmFjay5cbiAgICAgIGNvbnN0IGNvbnRyb2wgPSAodGhpcy5jb250cm9scyBhcyBhbnkpW2tleV07XG4gICAgICBjb250cm9sICYmIGNiKGNvbnRyb2wsIGtleSk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9zZXRVcENvbnRyb2xzKCk6IHZvaWQge1xuICAgIHRoaXMuX2ZvckVhY2hDaGlsZCgoY29udHJvbCkgPT4ge1xuICAgICAgY29udHJvbC5zZXRQYXJlbnQodGhpcyk7XG4gICAgICBjb250cm9sLl9yZWdpc3Rlck9uQ29sbGVjdGlvbkNoYW5nZSh0aGlzLl9vbkNvbGxlY3Rpb25DaGFuZ2UpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBvdmVycmlkZSBfdXBkYXRlVmFsdWUoKTogdm9pZCB7XG4gICAgKHRoaXMgYXMgV3JpdGFibGU8dGhpcz4pLnZhbHVlID0gdGhpcy5fcmVkdWNlVmFsdWUoKSBhcyBhbnk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIG92ZXJyaWRlIF9hbnlDb250cm9scyhjb25kaXRpb246IChjOiBBYnN0cmFjdENvbnRyb2wpID0+IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICBmb3IgKGNvbnN0IFtjb250cm9sTmFtZSwgY29udHJvbF0gb2YgT2JqZWN0LmVudHJpZXModGhpcy5jb250cm9scykpIHtcbiAgICAgIGlmICh0aGlzLmNvbnRhaW5zKGNvbnRyb2xOYW1lIGFzIGFueSkgJiYgY29uZGl0aW9uKGNvbnRyb2wgYXMgYW55KSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcmVkdWNlVmFsdWUoKTogUGFydGlhbDxUQ29udHJvbD4ge1xuICAgIGxldCBhY2M6IFBhcnRpYWw8VENvbnRyb2w+ID0ge307XG4gICAgcmV0dXJuIHRoaXMuX3JlZHVjZUNoaWxkcmVuKGFjYywgKGFjYywgY29udHJvbCwgbmFtZSkgPT4ge1xuICAgICAgaWYgKGNvbnRyb2wuZW5hYmxlZCB8fCB0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgIGFjY1tuYW1lXSA9IGNvbnRyb2wudmFsdWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcmVkdWNlQ2hpbGRyZW48VCwgSyBleHRlbmRzIGtleW9mIFRDb250cm9sPihcbiAgICAgIGluaXRWYWx1ZTogVCwgZm46IChhY2M6IFQsIGNvbnRyb2w6IFRDb250cm9sW0tdLCBuYW1lOiBLKSA9PiBUKTogVCB7XG4gICAgbGV0IHJlcyA9IGluaXRWYWx1ZTtcbiAgICB0aGlzLl9mb3JFYWNoQ2hpbGQoKGNvbnRyb2w6IFRDb250cm9sW0tdLCBuYW1lOiBLKSA9PiB7XG4gICAgICByZXMgPSBmbihyZXMsIGNvbnRyb2wsIG5hbWUpO1xuICAgIH0pO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIG92ZXJyaWRlIF9hbGxDb250cm9sc0Rpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIGZvciAoY29uc3QgY29udHJvbE5hbWUgb2YgKE9iamVjdC5rZXlzKHRoaXMuY29udHJvbHMpIGFzIEFycmF5PGtleW9mIFRDb250cm9sPikpIHtcbiAgICAgIGlmICgodGhpcy5jb250cm9scyBhcyBhbnkpW2NvbnRyb2xOYW1lXS5lbmFibGVkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuY29udHJvbHMpLmxlbmd0aCA+IDAgfHwgdGhpcy5kaXNhYmxlZDtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgb3ZlcnJpZGUgX2ZpbmQobmFtZTogc3RyaW5nfG51bWJlcik6IEFic3RyYWN0Q29udHJvbHxudWxsIHtcbiAgICByZXR1cm4gdGhpcy5jb250cm9scy5oYXNPd25Qcm9wZXJ0eShuYW1lIGFzIHN0cmluZykgP1xuICAgICAgICAodGhpcy5jb250cm9scyBhcyBhbnkpW25hbWUgYXMga2V5b2YgVENvbnRyb2xdIDpcbiAgICAgICAgbnVsbDtcbiAgfVxufVxuXG4vKipcbiAqIFdpbGwgdmFsaWRhdGUgdGhhdCBub25lIG9mIHRoZSBjb250cm9scyBoYXMgYSBrZXkgd2l0aCBhIGRvdFxuICogVGhyb3dzIG90aGVyIHdpc2VcbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVGb3JtR3JvdXBDb250cm9sczxUQ29udHJvbD4oXG4gICAgY29udHJvbHM6IHtbSyBpbiBrZXlvZiBUQ29udHJvbF06IEFic3RyYWN0Q29udHJvbDxhbnksIGFueT47fSkge1xuICBjb25zdCBpbnZhbGlkS2V5cyA9IE9iamVjdC5rZXlzKGNvbnRyb2xzKS5maWx0ZXIoa2V5ID0+IGtleS5pbmNsdWRlcygnLicpKTtcbiAgaWYgKGludmFsaWRLZXlzLmxlbmd0aCA+IDApIHtcbiAgICAvLyBUT0RPOiBtYWtlIHRoaXMgYW4gZXJyb3Igb25jZSB0aGVyZSBhcmUgbm8gbW9yZSB1c2VzIGluIEczXG4gICAgY29uc29sZS53YXJuKGBGb3JtR3JvdXAga2V5cyBjYW5ub3QgaW5jbHVkZSBcXGAuXFxgLCBwbGVhc2UgcmVwbGFjZSB0aGUga2V5cyBmb3I6ICR7XG4gICAgICAgIGludmFsaWRLZXlzLmpvaW4oJywnKX0uYCk7XG4gIH1cbn1cblxuXG5pbnRlcmZhY2UgVW50eXBlZEZvcm1Hcm91cEN0b3Ige1xuICBuZXcoY29udHJvbHM6IHtba2V5OiBzdHJpbmddOiBBYnN0cmFjdENvbnRyb2x9LFxuICAgICAgdmFsaWRhdG9yT3JPcHRzPzogVmFsaWRhdG9yRm58VmFsaWRhdG9yRm5bXXxBYnN0cmFjdENvbnRyb2xPcHRpb25zfG51bGwsXG4gICAgICBhc3luY1ZhbGlkYXRvcj86IEFzeW5jVmFsaWRhdG9yRm58QXN5bmNWYWxpZGF0b3JGbltdfG51bGwpOiBVbnR5cGVkRm9ybUdyb3VwO1xuXG4gIC8qKlxuICAgKiBUaGUgcHJlc2VuY2Ugb2YgYW4gZXhwbGljaXQgYHByb3RvdHlwZWAgcHJvcGVydHkgcHJvdmlkZXMgYmFja3dhcmRzLWNvbXBhdGliaWxpdHkgZm9yIGFwcHMgdGhhdFxuICAgKiBtYW51YWxseSBpbnNwZWN0IHRoZSBwcm90b3R5cGUgY2hhaW4uXG4gICAqL1xuICBwcm90b3R5cGU6IEZvcm1Hcm91cDxhbnk+O1xufVxuXG4vKipcbiAqIFVudHlwZWRGb3JtR3JvdXAgaXMgYSBub24tc3Ryb25nbHktdHlwZWQgdmVyc2lvbiBvZiBgRm9ybUdyb3VwYC5cbiAqL1xuZXhwb3J0IHR5cGUgVW50eXBlZEZvcm1Hcm91cCA9IEZvcm1Hcm91cDxhbnk+O1xuXG5leHBvcnQgY29uc3QgVW50eXBlZEZvcm1Hcm91cDogVW50eXBlZEZvcm1Hcm91cEN0b3IgPSBGb3JtR3JvdXA7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBc3NlcnRzIHRoYXQgdGhlIGdpdmVuIGNvbnRyb2wgaXMgYW4gaW5zdGFuY2Ugb2YgYEZvcm1Hcm91cGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBpc0Zvcm1Hcm91cCA9IChjb250cm9sOiB1bmtub3duKTogY29udHJvbCBpcyBGb3JtR3JvdXAgPT4gY29udHJvbCBpbnN0YW5jZW9mIEZvcm1Hcm91cDtcblxuLyoqXG4gKiBUcmFja3MgdGhlIHZhbHVlIGFuZCB2YWxpZGl0eSBzdGF0ZSBvZiBhIGNvbGxlY3Rpb24gb2YgYEZvcm1Db250cm9sYCBpbnN0YW5jZXMsIGVhY2ggb2Ygd2hpY2ggaGFzXG4gKiB0aGUgc2FtZSB2YWx1ZSB0eXBlLlxuICpcbiAqIGBGb3JtUmVjb3JkYCBpcyB2ZXJ5IHNpbWlsYXIgdG8ge0BsaW5rIEZvcm1Hcm91cH0sIGV4Y2VwdCBpdCBjYW4gYmUgdXNlZCB3aXRoIGEgZHluYW1pYyBrZXlzLFxuICogd2l0aCBjb250cm9scyBhZGRlZCBhbmQgcmVtb3ZlZCBhcyBuZWVkZWQuXG4gKlxuICogYEZvcm1SZWNvcmRgIGFjY2VwdHMgb25lIGdlbmVyaWMgYXJndW1lbnQsIHdoaWNoIGRlc2NyaWJlcyB0aGUgdHlwZSBvZiB0aGUgY29udHJvbHMgaXQgY29udGFpbnMuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiBgYGBcbiAqIGxldCBudW1iZXJzID0gbmV3IEZvcm1SZWNvcmQoe2JpbGw6IG5ldyBGb3JtQ29udHJvbCgnNDE1LTEyMy00NTYnKX0pO1xuICogbnVtYmVycy5hZGRDb250cm9sKCdib2InLCBuZXcgRm9ybUNvbnRyb2woJzQxNS0yMzQtNTY3JykpO1xuICogbnVtYmVycy5yZW1vdmVDb250cm9sKCdiaWxsJyk7XG4gKiBgYGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjbGFzcyBGb3JtUmVjb3JkPFRDb250cm9sIGV4dGVuZHMgQWJzdHJhY3RDb250cm9sID0gQWJzdHJhY3RDb250cm9sPiBleHRlbmRzXG4gICAgRm9ybUdyb3VwPHtba2V5OiBzdHJpbmddOiBUQ29udHJvbH0+IHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybVJlY29yZDxUQ29udHJvbD4ge1xuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgY29udHJvbCB3aXRoIHRoZSByZWNvcmRzJ3MgbGlzdCBvZiBjb250cm9scy5cbiAgICpcbiAgICogU2VlIGBGb3JtR3JvdXAjcmVnaXN0ZXJDb250cm9sYCBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbi5cbiAgICovXG4gIHJlZ2lzdGVyQ29udHJvbChuYW1lOiBzdHJpbmcsIGNvbnRyb2w6IFRDb250cm9sKTogVENvbnRyb2w7XG5cbiAgLyoqXG4gICAqIEFkZCBhIGNvbnRyb2wgdG8gdGhpcyBncm91cC5cbiAgICpcbiAgICogU2VlIGBGb3JtR3JvdXAjYWRkQ29udHJvbGAgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24uXG4gICAqL1xuICBhZGRDb250cm9sKG5hbWU6IHN0cmluZywgY29udHJvbDogVENvbnRyb2wsIG9wdGlvbnM/OiB7ZW1pdEV2ZW50PzogYm9vbGVhbn0pOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBjb250cm9sIGZyb20gdGhpcyBncm91cC5cbiAgICpcbiAgICogU2VlIGBGb3JtR3JvdXAjcmVtb3ZlQ29udHJvbGAgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24uXG4gICAqL1xuICByZW1vdmVDb250cm9sKG5hbWU6IHN0cmluZywgb3B0aW9ucz86IHtlbWl0RXZlbnQ/OiBib29sZWFufSk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFJlcGxhY2UgYW4gZXhpc3RpbmcgY29udHJvbC5cbiAgICpcbiAgICogU2VlIGBGb3JtR3JvdXAjc2V0Q29udHJvbGAgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24uXG4gICAqL1xuICBzZXRDb250cm9sKG5hbWU6IHN0cmluZywgY29udHJvbDogVENvbnRyb2wsIG9wdGlvbnM/OiB7ZW1pdEV2ZW50PzogYm9vbGVhbn0pOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBDaGVjayB3aGV0aGVyIHRoZXJlIGlzIGFuIGVuYWJsZWQgY29udHJvbCB3aXRoIHRoZSBnaXZlbiBuYW1lIGluIHRoZSBncm91cC5cbiAgICpcbiAgICogU2VlIGBGb3JtR3JvdXAjY29udGFpbnNgIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgY29udGFpbnMoY29udHJvbE5hbWU6IHN0cmluZyk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHZhbHVlIG9mIHRoZSBgRm9ybVJlY29yZGAuIEl0IGFjY2VwdHMgYW4gb2JqZWN0IHRoYXQgbWF0Y2hlc1xuICAgKiB0aGUgc3RydWN0dXJlIG9mIHRoZSBncm91cCwgd2l0aCBjb250cm9sIG5hbWVzIGFzIGtleXMuXG4gICAqXG4gICAqIFNlZSBgRm9ybUdyb3VwI3NldFZhbHVlYCBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbi5cbiAgICovXG4gIHNldFZhbHVlKHZhbHVlOiB7W2tleTogc3RyaW5nXTogybVWYWx1ZTxUQ29udHJvbD59LCBvcHRpb25zPzoge1xuICAgIG9ubHlTZWxmPzogYm9vbGVhbixcbiAgICBlbWl0RXZlbnQ/OiBib29sZWFuXG4gIH0pOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBQYXRjaGVzIHRoZSB2YWx1ZSBvZiB0aGUgYEZvcm1SZWNvcmRgLiBJdCBhY2NlcHRzIGFuIG9iamVjdCB3aXRoIGNvbnRyb2xcbiAgICogbmFtZXMgYXMga2V5cywgYW5kIGRvZXMgaXRzIGJlc3QgdG8gbWF0Y2ggdGhlIHZhbHVlcyB0byB0aGUgY29ycmVjdCBjb250cm9sc1xuICAgKiBpbiB0aGUgZ3JvdXAuXG4gICAqXG4gICAqIFNlZSBgRm9ybUdyb3VwI3BhdGNoVmFsdWVgIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgcGF0Y2hWYWx1ZSh2YWx1ZToge1trZXk6IHN0cmluZ106IMm1VmFsdWU8VENvbnRyb2w+fSwgb3B0aW9ucz86IHtcbiAgICBvbmx5U2VsZj86IGJvb2xlYW4sXG4gICAgZW1pdEV2ZW50PzogYm9vbGVhblxuICB9KTogdm9pZDtcblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBgRm9ybVJlY29yZGAsIG1hcmtzIGFsbCBkZXNjZW5kYW50cyBgcHJpc3RpbmVgIGFuZCBgdW50b3VjaGVkYCBhbmQgc2V0c1xuICAgKiB0aGUgdmFsdWUgb2YgYWxsIGRlc2NlbmRhbnRzIHRvIG51bGwuXG4gICAqXG4gICAqIFNlZSBgRm9ybUdyb3VwI3Jlc2V0YCBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbi5cbiAgICovXG4gIHJlc2V0KHZhbHVlPzoge1trZXk6IHN0cmluZ106IMm1VmFsdWU8VENvbnRyb2w+fSwgb3B0aW9ucz86IHtcbiAgICBvbmx5U2VsZj86IGJvb2xlYW4sXG4gICAgZW1pdEV2ZW50PzogYm9vbGVhblxuICB9KTogdm9pZDtcblxuICAvKipcbiAgICogVGhlIGFnZ3JlZ2F0ZSB2YWx1ZSBvZiB0aGUgYEZvcm1SZWNvcmRgLCBpbmNsdWRpbmcgYW55IGRpc2FibGVkIGNvbnRyb2xzLlxuICAgKlxuICAgKiBTZWUgYEZvcm1Hcm91cCNnZXRSYXdWYWx1ZWAgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24uXG4gICAqL1xuICBnZXRSYXdWYWx1ZSgpOiB7W2tleTogc3RyaW5nXTogybVSYXdWYWx1ZTxUQ29udHJvbD59O1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQXNzZXJ0cyB0aGF0IHRoZSBnaXZlbiBjb250cm9sIGlzIGFuIGluc3RhbmNlIG9mIGBGb3JtUmVjb3JkYFxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IGlzRm9ybVJlY29yZCA9IChjb250cm9sOiB1bmtub3duKTogY29udHJvbCBpcyBGb3JtUmVjb3JkID0+XG4gICAgY29udHJvbCBpbnN0YW5jZW9mIEZvcm1SZWNvcmQ7XG4iXX0=