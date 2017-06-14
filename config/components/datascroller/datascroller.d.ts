import { ElementRef, AfterViewInit, OnDestroy, DoCheck, Renderer, EventEmitter, QueryList, IterableDiffers, TemplateRef } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
export declare class DataScroller implements AfterViewInit, DoCheck, OnDestroy {
    el: ElementRef;
    renderer: Renderer;
    domHandler: DomHandler;
    value: any[];
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
    itemTemplate: TemplateRef<any>;
    dataToRender: any[];
    first: number;
    differ: any;
    scrollFunction: any;
    contentElement: HTMLDivElement;
    constructor(el: ElementRef, differs: IterableDiffers, renderer: Renderer, domHandler: DomHandler);
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    ngDoCheck(): void;
    load(): void;
    reset(): void;
    isEmpty(): boolean;
    createLazyLoadMetadata(): any;
    bindScrollListener(): void;
    ngOnDestroy(): void;
}
export declare class DataScrollerModule {
}
