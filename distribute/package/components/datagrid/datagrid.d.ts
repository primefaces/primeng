import { ElementRef, AfterViewInit, AfterContentInit, DoCheck, EventEmitter, QueryList, TemplateRef, IterableDiffers } from '@angular/core';
import { BlockableUI } from '../common/blockableui';
export declare class DataGrid implements AfterViewInit, AfterContentInit, DoCheck, BlockableUI {
    el: ElementRef;
    differs: IterableDiffers;
    paginator: boolean;
    rows: number;
    totalRecords: number;
    pageLinks: number;
    rowsPerPageOptions: number[];
    lazy: boolean;
    emptyMessage: string;
    onLazyLoad: EventEmitter<any>;
    style: any;
    styleClass: string;
    paginatorPosition: string;
    alwaysShowPaginator: boolean;
    trackBy: Function;
    immutable: boolean;
    onPage: EventEmitter<any>;
    header: any;
    footer: any;
    templates: QueryList<any>;
    _value: any[];
    itemTemplate: TemplateRef<any>;
    dataToRender: any[];
    first: number;
    page: number;
    differ: any;
    constructor(el: ElementRef, differs: IterableDiffers);
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    value: any[];
    handleDataChange(): void;
    ngDoCheck(): void;
    updatePaginator(): void;
    paginate(event: any): void;
    updateDataToRender(datasource: any): void;
    isEmpty(): boolean;
    createLazyLoadMetadata(): any;
    getBlockableElement(): HTMLElement;
}
export declare class DataGridModule {
}
