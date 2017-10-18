import { ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
export declare class Button implements AfterViewInit, OnDestroy {
    el: ElementRef;
    domHandler: DomHandler;
    iconPos: string;
    cornerStyleClass: string;
    _label: string;
    _icon: string;
    initialized: boolean;
    constructor(el: ElementRef, domHandler: DomHandler);
    ngAfterViewInit(): void;
    getStyleClass(): string;
    label: string;
    icon: string;
    ngOnDestroy(): void;
}
export declare class ButtonModule {
}
