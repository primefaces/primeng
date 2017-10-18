import { EventEmitter, AfterViewInit, ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const TOGGLEBUTTON_VALUE_ACCESSOR: any;
export declare class ToggleButton implements ControlValueAccessor, AfterViewInit {
    onLabel: string;
    offLabel: string;
    onIcon: string;
    offIcon: string;
    disabled: boolean;
    style: any;
    styleClass: string;
    inputId: string;
    tabindex: number;
    onChange: EventEmitter<any>;
    checkboxViewChild: ElementRef;
    checkbox: HTMLInputElement;
    checked: boolean;
    focus: boolean;
    onModelChange: Function;
    onModelTouched: Function;
    ngAfterViewInit(): void;
    getIconClass(): string;
    toggle(event: Event): void;
    onFocus(): void;
    onBlur(): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    readonly hasOnLabel: boolean;
    readonly hasOffLabel: boolean;
}
export declare class ToggleButtonModule {
}
