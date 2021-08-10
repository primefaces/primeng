import { ElementRef, DoCheck } from '@angular/core';
import { NgModel } from '@angular/forms';
export declare class InputText implements DoCheck {
    el: ElementRef;
    ngModel: NgModel;
    filled: boolean;
    constructor(el: ElementRef, ngModel: NgModel);
    ngDoCheck(): void;
    onInput(e: any): void;
    updateFilledState(): void;
}
export declare class InputTextModule {
}
