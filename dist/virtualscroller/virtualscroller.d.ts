import { ElementRef, AfterContentInit, EventEmitter, QueryList, TemplateRef } from '@angular/core';
import { Header, Footer } from 'primeng/api';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { BlockableUI } from 'primeng/api';
export declare class VirtualScroller implements AfterContentInit, BlockableUI {
    el: ElementRef;
    value: any[];
    itemSize: number;
    style: any;
    styleClass: string;
    scrollHeight: any;
    lazy: boolean;
    rows: number;
    minBufferPx: number;
    maxBufferPx: number;
    delay: number;
    trackBy: Function;
    header: Header;
    footer: Footer;
    templates: QueryList<any>;
    viewport: CdkVirtualScrollViewport;
    onLazyLoad: EventEmitter<any>;
    itemTemplate: TemplateRef<any>;
    headerTemplate: TemplateRef<any>;
    footerTemplate: TemplateRef<any>;
    loadingItemTemplate: TemplateRef<any>;
    _totalRecords: number;
    page: number;
    _first: number;
    _cache: boolean;
    virtualScrollTimeout: any;
    virtualPage: number;
    constructor(el: ElementRef);
    get totalRecords(): number;
    set totalRecords(val: number);
    get first(): number;
    set first(val: number);
    get cache(): boolean;
    set cache(val: boolean);
    ngAfterContentInit(): void;
    onScrollIndexChange(index: number): void;
    getBlockableElement(): HTMLElement;
    scrollTo(index: number, mode?: ScrollBehavior): void;
    scrollToIndex(index: number, mode?: ScrollBehavior): void;
}
export declare class VirtualScrollerModule {
}
