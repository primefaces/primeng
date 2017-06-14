import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const CHECKBOX_VALUE_ACCESSOR: any;
export declare class Checkbox implements ControlValueAccessor {
    private cd;
    value: any;
    name: string;
    disabled: boolean;
    binary: string;
    label: string;
    tabindex: number;
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
    removeValue(value: any): void;
    addValue(value: any): void;
    onFocus(event: any): void;
    onBlur(event: any): void;
    findValueIndex(value: any): number;
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
}
export declare class CheckboxModule {
}
