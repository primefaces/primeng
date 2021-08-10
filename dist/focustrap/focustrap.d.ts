import { ElementRef } from '@angular/core';
export declare class FocusTrap {
    el: ElementRef;
    pFocusTrapDisabled: boolean;
    constructor(el: ElementRef);
    onkeydown(e: any): void;
}
export declare class FocusTrapModule {
}
