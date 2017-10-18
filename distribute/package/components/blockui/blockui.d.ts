import { AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
export declare class BlockUI implements AfterViewInit, OnDestroy {
    el: ElementRef;
    domHandler: DomHandler;
    target: any;
    mask: ElementRef;
    _blocked: boolean;
    constructor(el: ElementRef, domHandler: DomHandler);
    blocked: boolean;
    ngAfterViewInit(): void;
    block(): void;
    unblock(): void;
    ngOnDestroy(): void;
}
export declare class BlockUIModule {
}
