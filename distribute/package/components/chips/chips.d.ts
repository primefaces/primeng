import { ElementRef, EventEmitter, AfterContentInit, QueryList, TemplateRef } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
import { ControlValueAccessor } from '@angular/forms';
export declare const CHIPS_VALUE_ACCESSOR: any;
export declare class Chips implements AfterContentInit, ControlValueAccessor {
    el: ElementRef;
    domHandler: DomHandler;
    style: any;
    styleClass: string;
    disabled: boolean;
    onAdd: EventEmitter<any>;
    onRemove: EventEmitter<any>;
    field: string;
    placeholder: string;
    max: number;
    tabindex: number;
    inputId: string;
    allowDuplicate: boolean;
    inputStyle: any;
    inputStyleClass: any;
    addOnTab: boolean;
    onFocus: EventEmitter<any>;
    onBlur: EventEmitter<any>;
    templates: QueryList<any>;
    itemTemplate: TemplateRef<any>;
    value: any;
    onModelChange: Function;
    onModelTouched: Function;
    valueChanged: boolean;
    focus: boolean;
    constructor(el: ElementRef, domHandler: DomHandler);
    ngAfterContentInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    resolveFieldData(data: any, field: string): any;
    onInputFocus(): void;
    onInputBlur(): void;
    removeItem(event: Event, index: number): void;
    addItem(event: Event, item: string): void;
    onKeydown(event: KeyboardEvent, inputEL: HTMLInputElement): void;
    readonly maxedOut: boolean;
}
export declare class ChipsModule {
}
