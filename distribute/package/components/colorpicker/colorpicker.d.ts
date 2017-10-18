import { ElementRef, AfterViewChecked, OnDestroy, EventEmitter, Renderer2, ChangeDetectorRef } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
import { ControlValueAccessor } from '@angular/forms';
export declare const COLORPICKER_VALUE_ACCESSOR: any;
export declare class ColorPicker implements ControlValueAccessor, AfterViewChecked, OnDestroy {
    el: ElementRef;
    domHandler: DomHandler;
    renderer: Renderer2;
    cd: ChangeDetectorRef;
    style: any;
    styleClass: string;
    inline: boolean;
    format: string;
    appendTo: string;
    disabled: boolean;
    tabindex: string;
    inputId: string;
    onChange: EventEmitter<any>;
    panelViewChild: ElementRef;
    colorSelectorViewChild: ElementRef;
    colorHandleViewChild: ElementRef;
    hueViewChild: ElementRef;
    hueHandleViewChild: ElementRef;
    inputViewChild: ElementRef;
    value: any;
    inputBgColor: string;
    shown: boolean;
    panelVisible: boolean;
    defaultColor: string;
    onModelChange: Function;
    onModelTouched: Function;
    documentClickListener: Function;
    documentMousemoveListener: Function;
    documentMouseupListener: Function;
    documentHueMoveListener: Function;
    selfClick: boolean;
    colorDragging: boolean;
    hueDragging: boolean;
    constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer2, cd: ChangeDetectorRef);
    ngAfterViewChecked(): void;
    onHueMousedown(event: MouseEvent): void;
    pickHue(event: MouseEvent): void;
    onColorMousedown(event: MouseEvent): void;
    pickColor(event: MouseEvent): void;
    getValueToUpdate(): any;
    updateModel(): void;
    writeValue(value: any): void;
    updateColorSelector(): void;
    updateUI(): void;
    onInputFocus(): void;
    show(): void;
    hide(): void;
    onShow(): void;
    alignPanel(): void;
    onInputClick(): void;
    togglePanel(): void;
    onInputKeydown(event: KeyboardEvent): void;
    onPanelClick(): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    bindDocumentClickListener(): void;
    unbindDocumentClickListener(): void;
    bindDocumentMousemoveListener(): void;
    unbindDocumentMousemoveListener(): void;
    bindDocumentMouseupListener(): void;
    unbindDocumentMouseupListener(): void;
    validateHSB(hsb: any): {
        h: number;
        s: number;
        b: number;
    };
    validateRGB(rgb: any): {
        r: number;
        g: number;
        b: number;
    };
    validateHEX(hex: any): any;
    HEXtoRGB(hex: any): {
        r: number;
        g: number;
        b: number;
    };
    HEXtoHSB(hex: any): {
        h: number;
        s: number;
        b: number;
    };
    RGBtoHSB(rgb: any): {
        h: number;
        s: number;
        b: number;
    };
    HSBtoRGB(hsb: any): {
        r: number;
        g: number;
        b: number;
    };
    RGBtoHEX(rgb: any): string;
    HSBtoHEX(hsb: any): string;
    ngOnDestroy(): void;
}
export declare class ColorPickerModule {
}
