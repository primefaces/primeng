import { EventEmitter, ElementRef } from '@angular/core';
import { BlockableUI } from '../common/blockableui';
export declare class Panel implements BlockableUI {
    private el;
    toggleable: boolean;
    header: string;
    collapsed: boolean;
    style: any;
    styleClass: string;
    expandIcon: string;
    collapseIcon: string;
    collapsedChange: EventEmitter<any>;
    onBeforeToggle: EventEmitter<any>;
    onAfterToggle: EventEmitter<any>;
    footerFacet: any;
    animating: boolean;
    constructor(el: ElementRef);
    toggle(event: any): boolean;
    expand(event: any): void;
    collapse(event: any): void;
    getBlockableElement(): HTMLElement;
    onToggleDone(event: Event): void;
}
export declare class PanelModule {
}
