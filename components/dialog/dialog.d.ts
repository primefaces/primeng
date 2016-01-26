/// <reference path="../../typedefinition/primeui.d.ts" />
import { ElementRef, AfterViewInit, OnDestroy, OnChanges, SimpleChange, EventEmitter } from 'angular2/core';
export declare class Dialog implements AfterViewInit, OnDestroy, OnChanges {
    private el;
    header: string;
    draggable: boolean;
    resizable: boolean;
    minWidth: number;
    minHeight: number;
    width: any;
    height: any;
    visible: boolean;
    modal: boolean;
    showEffect: string;
    hideEffect: string;
    effectDuration: any;
    closeOnEscape: boolean;
    rtl: boolean;
    closable: boolean;
    minimizable: boolean;
    maximizable: boolean;
    responsive: boolean;
    onBeforeShow: EventEmitter<any>;
    onAfterShow: EventEmitter<any>;
    onBeforeHide: EventEmitter<any>;
    onAfterHide: EventEmitter<any>;
    onMinimize: EventEmitter<any>;
    onMaximize: EventEmitter<any>;
    visibleChange: EventEmitter<any>;
    initialized: boolean;
    stopNgOnChangesPropagation: boolean;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
}
