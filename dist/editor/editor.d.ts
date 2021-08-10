import { ElementRef, AfterViewInit, EventEmitter, QueryList, AfterContentInit, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const EDITOR_VALUE_ACCESSOR: any;
export declare class Editor implements AfterViewInit, AfterContentInit, ControlValueAccessor {
    el: ElementRef;
    onTextChange: EventEmitter<any>;
    onSelectionChange: EventEmitter<any>;
    toolbar: any;
    style: any;
    styleClass: string;
    placeholder: string;
    formats: string[];
    modules: any;
    bounds: any;
    scrollingContainer: any;
    debug: string;
    onInit: EventEmitter<any>;
    templates: QueryList<any>;
    value: string;
    _readonly: boolean;
    onModelChange: Function;
    onModelTouched: Function;
    quill: any;
    headerTemplate: TemplateRef<any>;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    getQuill(): any;
    get readonly(): boolean;
    set readonly(val: boolean);
}
export declare class EditorModule {
}
