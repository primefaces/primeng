import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const SELECTBUTTON_VALUE_ACCESSOR: any;
export declare class SelectButton implements ControlValueAccessor {
    cd: ChangeDetectorRef;
    options: any[];
    optionLabel: string;
    optionValue: string;
    optionDisabled: string;
    tabindex: number;
    multiple: boolean;
    style: any;
    styleClass: string;
    ariaLabelledBy: string;
    disabled: boolean;
    dataKey: string;
    onOptionClick: EventEmitter<any>;
    onChange: EventEmitter<any>;
    itemTemplate: any;
    value: any;
    onModelChange: Function;
    onModelTouched: Function;
    constructor(cd: ChangeDetectorRef);
    getOptionLabel(option: any): any;
    getOptionValue(option: any): any;
    isOptionDisabled(option: any): any;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    onItemClick(event: any, option: any, index: number): void;
    onBlur(): void;
    removeOption(option: any): void;
    isSelected(option: any): boolean;
}
export declare class SelectButtonModule {
}
