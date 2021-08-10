import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const TOGGLEBUTTON_VALUE_ACCESSOR: any;
export declare class ToggleButton implements ControlValueAccessor {
    cd: ChangeDetectorRef;
    onLabel: string;
    offLabel: string;
    onIcon: string;
    offIcon: string;
    ariaLabelledBy: string;
    disabled: boolean;
    style: any;
    styleClass: string;
    inputId: string;
    tabindex: number;
    iconPos: string;
    onChange: EventEmitter<any>;
    checked: boolean;
    onModelChange: Function;
    onModelTouched: Function;
    constructor(cd: ChangeDetectorRef);
    toggle(event: Event): void;
    onBlur(): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    get hasOnLabel(): boolean;
    get hasOffLabel(): boolean;
}
export declare class ToggleButtonModule {
}
