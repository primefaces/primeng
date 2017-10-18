import { ElementRef, DoCheck } from '@angular/core';
export declare class InputText implements DoCheck {
    el: ElementRef;
    filled: boolean;
    constructor(el: ElementRef);
    ngDoCheck(): void;
    onInput(e: any): void;
    updateFilledState(): void;
}
export declare class InputTextModule {
}
