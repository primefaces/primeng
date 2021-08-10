import { EventEmitter, ElementRef, QueryList, TemplateRef, AfterContentInit } from '@angular/core';
import { BlockableUI } from 'primeng/api';
export declare class Panel implements AfterContentInit, BlockableUI {
    private el;
    toggleable: boolean;
    header: string;
    collapsed: boolean;
    style: any;
    styleClass: string;
    expandIcon: string;
    collapseIcon: string;
    showHeader: boolean;
    toggler: string;
    collapsedChange: EventEmitter<any>;
    onBeforeToggle: EventEmitter<any>;
    onAfterToggle: EventEmitter<any>;
    transitionOptions: string;
    footerFacet: any;
    templates: QueryList<any>;
    iconTemplate: TemplateRef<any>;
    animating: boolean;
    headerTemplate: TemplateRef<any>;
    contentTemplate: TemplateRef<any>;
    footerTemplate: TemplateRef<any>;
    id: string;
    constructor(el: ElementRef);
    ngAfterContentInit(): void;
    onHeaderClick(event: Event): void;
    onIconClick(event: Event): void;
    toggle(event: Event): boolean;
    expand(event: any): void;
    collapse(event: any): void;
    getBlockableElement(): HTMLElement;
    onToggleDone(event: Event): void;
}
export declare class PanelModule {
}
