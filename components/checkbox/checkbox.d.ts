/// <reference path="../../typedefinition/primeui.d.ts" />
import { EventEmitter } from 'angular2/core';
export declare class Checkbox {
    value: any;
    name: string;
    disabled: boolean;
    model: any;
    onChange: EventEmitter<any>;
    modelChange: EventEmitter<any>;
    hover: boolean;
    onClick(input: any): void;
    isChecked(value: any): boolean;
    removeValue(value: any): void;
    addValue(value: any): void;
    findValueIndex(value: any): number;
}
