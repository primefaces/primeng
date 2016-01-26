/// <reference path="../../typedefinition/primeui.d.ts" />
import { ElementRef, OnInit, OnDestroy, OnChanges, SimpleChange, EventEmitter } from 'angular2/core';
export declare class ToggleButton implements OnInit, OnDestroy, OnChanges {
    private el;
    onLabel: string;
    offLabel: string;
    onIcon: string;
    offIcon: string;
    checked: boolean;
    disabled: boolean;
    style: string;
    styleClass: string;
    onChange: EventEmitter<any>;
    checkedChange: EventEmitter<any>;
    initialized: boolean;
    stopNgOnChangesPropagation: boolean;
    constructor(el: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
}
