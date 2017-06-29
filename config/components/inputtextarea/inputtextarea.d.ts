import { ElementRef, OnInit } from '@angular/core';
export declare class InputTextarea implements OnInit {
    el: ElementRef;
    autoResize: boolean;
    rows: number;
    cols: number;
    rowsDefault: number;
    colsDefault: number;
    constructor(el: ElementRef);
    ngOnInit(): void;
    onFocus(e: any): void;
    onBlur(e: any): void;
    onKeyup(e: any): void;
    resize(): void;
    readonly filled: boolean;
}
export declare class InputTextareaModule {
}
