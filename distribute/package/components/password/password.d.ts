import { ElementRef, AfterViewInit, OnDestroy, DoCheck } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
export declare class Password implements AfterViewInit, OnDestroy, DoCheck {
    el: ElementRef;
    domHandler: DomHandler;
    promptLabel: string;
    weakLabel: string;
    mediumLabel: string;
    strongLabel: string;
    feedback: boolean;
    panel: any;
    meter: any;
    info: any;
    filled: boolean;
    constructor(el: ElementRef, domHandler: DomHandler);
    ngAfterViewInit(): void;
    ngDoCheck(): void;
    onInput(e: any): void;
    updateFilledState(): void;
    onFocus(e: any): void;
    onBlur(e: any): void;
    onKeyup(e: any): void;
    testStrength(str: string): number;
    normalize(x: any, y: any): number;
    readonly disabled: boolean;
    ngOnDestroy(): void;
}
export declare class PasswordModule {
}
