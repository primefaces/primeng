/// <reference path="../../typedefinition/primeui.d.ts" />
import { ElementRef, AfterViewInit, OnDestroy, OnChanges, SimpleChange, EventEmitter } from 'angular2/core';
export declare class Fieldset implements AfterViewInit, OnDestroy, OnChanges {
    private el;
    legend: string;
    toggleable: boolean;
    toggleDuration: any;
    collapsed: boolean;
    onBeforeToggle: EventEmitter<any>;
    onAfterToggle: EventEmitter<any>;
    initialized: boolean;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
}
