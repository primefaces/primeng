/// <reference path="../../typedefinition/primeui.d.ts" />
import { ElementRef, AfterViewInit, OnDestroy, OnChanges, SimpleChange } from 'angular2/core';
export declare class Galleria implements AfterViewInit, OnDestroy, OnChanges {
    private el;
    panelWidth: number;
    panelHeight: number;
    frameWidth: number;
    activeIndex: number;
    showFilmstrip: boolean;
    autoPlay: boolean;
    transitionInterval: number;
    effect: string;
    effectDuration: any;
    showCaption: boolean;
    customContent: boolean;
    initialized: boolean;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
}
