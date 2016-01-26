/// <reference path="../../typedefinition/primeui.d.ts" />
import { ElementRef, OnDestroy, OnChanges, AfterViewInit, SimpleChange, EventEmitter } from 'angular2/core';
import { AccordionTab } from './accordiontab';
export declare class Accordion implements OnDestroy, OnChanges, AfterViewInit {
    private el;
    activeIndex: number;
    multiple: boolean;
    onChange: EventEmitter<any>;
    activeIndexChange: EventEmitter<any>;
    initialized: boolean;
    tabPanels: AccordionTab[];
    stopNgOnChangesPropagation: boolean;
    constructor(el: ElementRef);
    addTab(tab: AccordionTab): void;
    ngAfterViewInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
}
