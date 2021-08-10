import { ElementRef, AfterContentInit, QueryList, TemplateRef } from '@angular/core';
import { BlockableUI } from 'primeng/api';
export declare class Timeline implements AfterContentInit, BlockableUI {
    private el;
    value: any[];
    style: any;
    styleClass: string;
    align: string;
    layout: string;
    templates: QueryList<any>;
    contentTemplate: TemplateRef<any>;
    oppositeTemplate: TemplateRef<any>;
    markerTemplate: TemplateRef<any>;
    constructor(el: ElementRef);
    getBlockableElement(): HTMLElement;
    ngAfterContentInit(): void;
}
export declare class TimelineModule {
}
