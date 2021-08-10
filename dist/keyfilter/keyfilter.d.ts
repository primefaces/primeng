import { ElementRef, EventEmitter } from '@angular/core';
import { Validator, AbstractControl } from '@angular/forms';
export declare const KEYFILTER_VALIDATOR: any;
export declare class KeyFilter implements Validator {
    el: ElementRef;
    pValidateOnly: boolean;
    ngModelChange: EventEmitter<any>;
    regex: RegExp;
    _pattern: any;
    isAndroid: boolean;
    lastValue: any;
    constructor(el: ElementRef);
    get pattern(): any;
    set pattern(_pattern: any);
    isNavKeyPress(e: KeyboardEvent): boolean;
    isSpecialKey(e: KeyboardEvent): boolean;
    getKey(e: KeyboardEvent): any;
    getCharCode(e: KeyboardEvent): number;
    findDelta(value: string, prevValue: string): string;
    isValidChar(c: string): boolean;
    isValidString(str: string): boolean;
    onInput(e: KeyboardEvent): void;
    onKeyPress(e: KeyboardEvent): void;
    onPaste(e: any): void;
    validate(c: AbstractControl): {
        [key: string]: any;
    };
}
export declare class KeyFilterModule {
}
