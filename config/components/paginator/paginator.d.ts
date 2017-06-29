import { EventEmitter } from '@angular/core';
export declare class Paginator {
    rows: number;
    pageLinkSize: number;
    onPageChange: EventEmitter<any>;
    style: any;
    styleClass: string;
    rowsPerPageOptions: number[];
    pageLinks: number[];
    _totalRecords: number;
    _first: number;
    totalRecords: number;
    first: number;
    isFirstPage(): boolean;
    isLastPage(): boolean;
    getPageCount(): number;
    calculatePageLinkBoundaries(): number[];
    updatePageLinks(): void;
    changePage(p: number, event: any): void;
    getPage(): number;
    changePageToFirst(event: any): void;
    changePageToPrev(event: any): void;
    changePageToNext(event: any): void;
    changePageToLast(event: any): void;
    onRppChange(event: any): void;
}
export declare class PaginatorModule {
}
