/// <reference path="../../typedefinition/primeui.d.ts" />
import { ElementRef, OnInit, OnDestroy, OnChanges, SimpleChange } from 'angular2/core';
export declare class Button implements OnInit, OnDestroy, OnChanges {
    private el;
    icon: string;
    iconPos: string;
    disabled: boolean;
    initialized: boolean;
    constructor(el: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
}
