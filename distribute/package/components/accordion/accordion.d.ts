import { ElementRef, OnDestroy, EventEmitter, QueryList } from '@angular/core';
import { BlockableUI } from '../common/blockableui';
export declare class Accordion implements BlockableUI {
    el: ElementRef;
    multiple: boolean;
    onClose: EventEmitter<any>;
    onOpen: EventEmitter<any>;
    style: any;
    styleClass: string;
    lazy: boolean;
    private _activeIndex;
    tabs: AccordionTab[];
    constructor(el: ElementRef);
    addTab(tab: AccordionTab): void;
    getBlockableElement(): HTMLElement;
    activeIndex: any;
}
export declare class AccordionTab implements OnDestroy {
    accordion: Accordion;
    header: string;
    selected: boolean;
    disabled: boolean;
    selectedChange: EventEmitter<any>;
    headerFacet: QueryList<AccordionTab>;
    animating: boolean;
    constructor(accordion: Accordion);
    toggle(event: any): boolean;
    findTabIndex(): number;
    readonly lazy: boolean;
    readonly hasHeaderFacet: boolean;
    onToggleDone(event: Event): void;
    ngOnDestroy(): void;
}
export declare class AccordionModule {
}
