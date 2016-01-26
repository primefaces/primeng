/// <reference path="../../typedefinition/primeui.d.ts" />
import { ElementRef, OnInit, OnDestroy, OnChanges, SimpleChange, EventEmitter } from 'angular2/core';
export declare class Rating implements OnInit, OnDestroy, OnChanges {
    private el;
    value: number;
    disabled: boolean;
    readonly: boolean;
    stars: number;
    cancel: boolean;
    valueChange: EventEmitter<any>;
    onRate: EventEmitter<any>;
    onCancel: EventEmitter<any>;
    initialized: boolean;
    stopNgOnChangesPropagation: boolean;
    constructor(el: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
}
