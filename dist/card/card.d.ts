import { ElementRef, TemplateRef, AfterContentInit, QueryList } from '@angular/core';
import { BlockableUI } from 'primeng/api';
export declare class Card implements AfterContentInit, BlockableUI {
    private el;
    header: string;
    subheader: string;
    style: any;
    styleClass: string;
    headerFacet: any;
    footerFacet: any;
    templates: QueryList<any>;
    headerTemplate: TemplateRef<any>;
    titleTemplate: TemplateRef<any>;
    subtitleTemplate: TemplateRef<any>;
    contentTemplate: TemplateRef<any>;
    footerTemplate: TemplateRef<any>;
    constructor(el: ElementRef);
    ngAfterContentInit(): void;
    getBlockableElement(): HTMLElement;
}
export declare class CardModule {
}
