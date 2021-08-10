import { ElementRef, AfterContentInit, OnDestroy, EventEmitter, QueryList, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { Header, BlockableUI } from 'primeng/api';
import { Subscription } from 'rxjs';
export declare class AccordionTab implements AfterContentInit, OnDestroy {
    changeDetector: ChangeDetectorRef;
    header: string;
    disabled: boolean;
    cache: boolean;
    selectedChange: EventEmitter<any>;
    transitionOptions: string;
    headerFacet: QueryList<Header>;
    templates: QueryList<any>;
    private _selected;
    get selected(): any;
    set selected(val: any);
    contentTemplate: TemplateRef<any>;
    headerTemplate: TemplateRef<any>;
    id: string;
    loaded: boolean;
    accordion: Accordion;
    constructor(accordion: any, changeDetector: ChangeDetectorRef);
    ngAfterContentInit(): void;
    toggle(event: any): boolean;
    findTabIndex(): number;
    get hasHeaderFacet(): boolean;
    onKeydown(event: KeyboardEvent): void;
    ngOnDestroy(): void;
}
export declare class Accordion implements BlockableUI, AfterContentInit, OnDestroy {
    el: ElementRef;
    changeDetector: ChangeDetectorRef;
    multiple: boolean;
    onClose: EventEmitter<any>;
    onOpen: EventEmitter<any>;
    style: any;
    styleClass: string;
    expandIcon: string;
    collapseIcon: string;
    activeIndexChange: EventEmitter<any>;
    tabList: QueryList<AccordionTab>;
    tabListSubscription: Subscription;
    private _activeIndex;
    preventActiveIndexPropagation: boolean;
    tabs: AccordionTab[];
    constructor(el: ElementRef, changeDetector: ChangeDetectorRef);
    ngAfterContentInit(): void;
    initTabs(): any;
    getBlockableElement(): HTMLElement;
    get activeIndex(): any;
    set activeIndex(val: any);
    updateSelectionState(): void;
    updateActiveIndex(): void;
    ngOnDestroy(): void;
}
export declare class AccordionModule {
}
