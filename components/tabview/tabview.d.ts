/// <reference path="../../typedefinition/primeui.d.ts" />
import { ElementRef, OnDestroy, OnChanges, AfterViewInit, SimpleChange, EventEmitter } from 'angular2/core';
import { TabPanel } from './tabpanel';
export declare class TabView implements OnDestroy, OnChanges, AfterViewInit {
    private el;
    activeIndex: number;
    orientation: string;
    effect: string;
    effectDuration: any;
    onChange: EventEmitter<any>;
    onClose: EventEmitter<any>;
    activeIndexChange: EventEmitter<any>;
    initialized: boolean;
    tabPanels: TabPanel[];
    stopNgOnChangesPropagation: boolean;
    constructor(el: ElementRef);
    addTab(tab: TabPanel): void;
    ngAfterViewInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
}
