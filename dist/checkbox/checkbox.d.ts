import { EventEmitter, ChangeDetectorRef, ElementRef } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
export declare const CHECKBOX_VALUE_ACCESSOR: any;
export declare class Checkbox implements ControlValueAccessor {
    private cd;
    value: any;
    name: string;
    disabled: boolean;
    binary: boolean;
    label: string;
    ariaLabelledBy: string;
    ariaLabel: string;
    tabindex: number;
    inputId: string;
    style: any;
    styleClass: string;
    labelStyleClass: string;
    formControl: FormControl;
    checkboxIcon: string;
    readonly: boolean;
    required: boolean;
    inputViewChild: ElementRef;
    onChange: EventEmitter<any>;
    model: any;
    onModelChange: Function;
    onModelTouched: Function;
    focused: boolean;
    checked: boolean;
    constructor(cd: ChangeDetectorRef);
    onClick(event: any, checkbox: any, focus: boolean): void;
    updateModel(event: any): void;
    handleChange(event: any): void;
    isChecked(): boolean;
    removeValue(): void;
    addValue(): void;
    onFocus(): void;
    onBlur(): void;
    focus(): void;
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
}
export declare class CheckboxModule {
}
