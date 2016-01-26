/// <reference path="../../typedefinition/primeui.d.ts" />
import { EventEmitter } from 'angular2/core';
export declare class RadioButton {
    value: any;
    name: string;
    disabled: boolean;
    model: any;
    click: EventEmitter<any>;
    modelChange: EventEmitter<any>;
    hover: boolean;
    onclick(input: any): void;
}
