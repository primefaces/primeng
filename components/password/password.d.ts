/// <reference path="../../typedefinition/primeui.d.ts" />
import { ElementRef, OnInit, OnDestroy, OnChanges, SimpleChange } from 'angular2/core';
export declare class Password implements OnInit, OnDestroy, OnChanges {
    private el;
    promptLabel: string;
    weakLabel: string;
    goodLabel: string;
    strongLabel: string;
    inline: boolean;
    disabled: boolean;
    initialized: boolean;
    constructor(el: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
}
