import { EventEmitter, ElementRef, AfterContentInit, QueryList, TemplateRef } from '@angular/core';
import { BlockableUI } from 'primeng/api';
export declare class Fieldset implements AfterContentInit, BlockableUI {
    private el;
    legend: string;
    toggleable: boolean;
    collapsed: boolean;
    collapsedChange: EventEmitter<any>;
    onBeforeToggle: EventEmitter<any>;
    onAfterToggle: EventEmitter<any>;
    style: any;
    styleClass: string;
    transitionOptions: string;
    templates: QueryList<any>;
    animating: boolean;
    headerTemplate: TemplateRef<any>;
    contentTemplate: TemplateRef<any>;
    constructor(el: ElementRef);
    id: string;
    ngAfterContentInit(): void;
    toggle(event: any): boolean;
    expand(event: any): void;
    collapse(event: any): void;
    getBlockableElement(): HTMLElement;
    onToggleDone(event: Event): void;
}
export declare class FieldsetModule {
}
