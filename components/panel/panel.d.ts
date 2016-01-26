/// <reference path="../../typedefinition/primeui.d.ts" />
import { ElementRef, AfterViewInit, OnDestroy, OnChanges, SimpleChange, EventEmitter } from 'angular2/core';
export declare class Panel implements AfterViewInit, OnDestroy, OnChanges {
    private el;
    toggleable: boolean;
    toggleDuration: any;
    toggleOrientation: any;
    header: string;
    closable: boolean;
    closeDuration: any;
    collapsed: boolean;
    onBeforeCollapse: EventEmitter<any>;
    onAfterCollapse: EventEmitter<any>;
    onBeforeExpand: EventEmitter<any>;
    onAfterExpand: EventEmitter<any>;
    onBeforeClose: EventEmitter<any>;
    onAfterClose: EventEmitter<any>;
    initialized: boolean;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
}
