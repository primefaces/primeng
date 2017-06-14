import { ElementRef, AfterViewInit, AfterViewChecked, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { DomHandler } from '../dom/domhandler';
export declare const INPUTSWITCH_VALUE_ACCESSOR: any;
export declare class InputSwitch implements ControlValueAccessor, AfterViewInit, AfterViewChecked {
    el: ElementRef;
    domHandler: DomHandler;
    onLabel: string;
    offLabel: string;
    disabled: boolean;
    style: any;
    styleClass: string;
    tabindex: number;
    onChange: EventEmitter<any>;
    checked: boolean;
    focused: boolean;
    onModelChange: Function;
    onModelTouched: Function;
    container: any;
    handle: any;
    onContainer: any;
    offContainer: any;
    onLabelChild: any;
    offLabelChild: any;
    offset: any;
    initialized: boolean;
    constructor(el: ElementRef, domHandler: DomHandler);
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    render(): void;
    toggle(event: any, checkbox: any): void;
    checkUI(): void;
    uncheckUI(): void;
    onFocus(event: any): void;
    onBlur(event: any): void;
    writeValue(checked: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
}
export declare class InputSwitchModule {
}
