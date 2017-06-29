import { ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
export declare class Password implements AfterViewInit, OnDestroy {
    el: ElementRef;
    domHandler: DomHandler;
    promptLabel: string;
    weakLabel: string;
    mediumLabel: string;
    strongLabel: string;
    panel: any;
    meter: any;
    info: any;
    constructor(el: ElementRef, domHandler: DomHandler);
    ngAfterViewInit(): void;
    onFocus(e: any): void;
    onBlur(e: any): void;
    onKeyup(e: any): void;
    testStrength(str: string): number;
    normalize(x: any, y: any): number;
    readonly disabled: boolean;
    readonly filled: boolean;
    ngOnDestroy(): void;
}
export declare class PasswordModule {
}
