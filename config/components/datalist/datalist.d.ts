import { ElementRef, AfterViewInit, AfterContentInit, DoCheck, EventEmitter, IterableDiffers, TemplateRef, QueryList } from '@angular/core';
import { BlockableUI } from '../common/api';
export declare class DataList implements AfterViewInit, AfterContentInit, DoCheck, BlockableUI {
    el: ElementRef;
    value: any[];
    paginator: boolean;
    rows: number;
    totalRecords: number;
    pageLinks: number;
    rowsPerPageOptions: number[];
    lazy: boolean;
    onLazyLoad: EventEmitter<any>;
    style: any;
    styleClass: string;
    paginatorPosition: string;
    header: any;
    footer: any;
    templates: QueryList<any>;
    itemTemplate: TemplateRef<any>;
    dataToRender: any[];
    first: number;
    page: number;
    differ: any;
    constructor(el: ElementRef, differs: IterableDiffers);
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngDoCheck(): void;
    updatePaginator(): void;
    paginate(event: any): void;
    updateDataToRender(datasource: any): void;
    isEmpty(): boolean;
    createLazyLoadMetadata(): any;
    getBlockableElement(): HTMLElement;
}
export declare class DataListModule {
}
