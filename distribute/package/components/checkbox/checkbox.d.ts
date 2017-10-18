import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
export declare const CHECKBOX_VALUE_ACCESSOR: any;
export declare class Checkbox implements ControlValueAccessor {
    private cd;
    value: any;
    name: string;
    disabled: boolean;
    binary: string;
    label: string;
    tabindex: number;
    inputId: string;
    style: any;
    styleClass: string;
    formControl: FormControl;
    onChange: EventEmitter<any>;
    model: any;
    onModelChange: Function;
    onModelTouched: Function;
    focused: boolean;
    checked: boolean;
    constructor(cd: ChangeDetectorRef);
    onClick(event: any, checkbox: any, focus: boolean): void;
    updateModel(): void;
    handleChange(event: any): void;
    isChecked(): boolean;
    removeValue(): void;
    addValue(): void;
    onFocus(event: any): void;
    onBlur(event: any): void;
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
}
export declare class CheckboxModule {
}
