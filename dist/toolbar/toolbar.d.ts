import { ElementRef, AfterContentInit, QueryList, TemplateRef } from '@angular/core';
import { BlockableUI } from 'primeng/api';
export declare class Toolbar implements AfterContentInit, BlockableUI {
    private el;
    style: any;
    styleClass: string;
    templates: QueryList<any>;
    leftTemplate: TemplateRef<any>;
    rightTemplate: TemplateRef<any>;
    constructor(el: ElementRef);
    getBlockableElement(): HTMLElement;
    ngAfterContentInit(): void;
}
export declare class ToolbarModule {
}
