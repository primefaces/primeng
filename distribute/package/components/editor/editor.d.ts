import { ElementRef, AfterViewInit, EventEmitter } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
import { ControlValueAccessor } from '@angular/forms';
export declare const EDITOR_VALUE_ACCESSOR: any;
export declare class Editor implements AfterViewInit, ControlValueAccessor {
    el: ElementRef;
    domHandler: DomHandler;
    onTextChange: EventEmitter<any>;
    onSelectionChange: EventEmitter<any>;
    toolbar: any;
    style: any;
    styleClass: string;
    placeholder: string;
    formats: string[];
    onInit: EventEmitter<any>;
    value: string;
    _readonly: boolean;
    onModelChange: Function;
    onModelTouched: Function;
    quill: any;
    constructor(el: ElementRef, domHandler: DomHandler);
    ngAfterViewInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    getQuill(): any;
    readonly: boolean;
}
export declare class EditorModule {
}
