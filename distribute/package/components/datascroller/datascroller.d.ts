import { ElementRef, AfterViewInit, OnDestroy, Renderer2, EventEmitter, QueryList, TemplateRef } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
export declare class DataScroller implements AfterViewInit, OnDestroy {
    el: ElementRef;
    renderer: Renderer2;
    domHandler: DomHandler;
    rows: number;
    lazy: boolean;
    onLazyLoad: EventEmitter<any>;
    style: any;
    styleClass: string;
    buffer: number;
    inline: boolean;
    scrollHeight: any;
    loader: any;
    contentViewChild: ElementRef;
    header: any;
    footer: any;
    templates: QueryList<any>;
    _value: any[];
    itemTemplate: TemplateRef<any>;
    dataToRender: any[];
    first: number;
    scrollFunction: any;
    contentElement: HTMLDivElement;
    constructor(el: ElementRef, renderer: Renderer2, domHandler: DomHandler);
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    value: any[];
    handleDataChange(): void;
    load(): void;
    reset(): void;
    isEmpty(): boolean;
    createLazyLoadMetadata(): any;
    bindScrollListener(): void;
    ngOnDestroy(): void;
}
export declare class DataScrollerModule {
}
