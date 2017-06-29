import { EventEmitter, ViewContainerRef, TemplateRef, OnInit, OnDestroy, AfterContentInit, QueryList, EmbeddedViewRef } from '@angular/core';
export declare class Header {
}
export declare class Footer {
}
export declare class PrimeTemplate {
    template: TemplateRef<any>;
    type: string;
    name: string;
    constructor(template: TemplateRef<any>);
    getType(): string;
}
export declare class TemplateWrapper implements OnInit, OnDestroy {
    viewContainer: ViewContainerRef;
    item: any;
    index: number;
    templateRef: TemplateRef<any>;
    view: EmbeddedViewRef<any>;
    constructor(viewContainer: ViewContainerRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
export declare class Column implements AfterContentInit {
    field: string;
    sortField: string;
    header: string;
    footer: string;
    sortable: any;
    editable: boolean;
    filter: boolean;
    filterMatchMode: string;
    rowspan: number;
    colspan: number;
    style: any;
    styleClass: string;
    hidden: boolean;
    expander: boolean;
    selectionMode: string;
    filterPlaceholder: string;
    frozen: boolean;
    sortFunction: EventEmitter<any>;
    templates: QueryList<any>;
    template: TemplateRef<any>;
    headerTemplate: TemplateRef<any>;
    bodyTemplate: TemplateRef<any>;
    footerTemplate: TemplateRef<any>;
    filterTemplate: TemplateRef<any>;
    editorTemplate: TemplateRef<any>;
    ngAfterContentInit(): void;
}
export declare class Row {
    columns: QueryList<Column>;
}
export declare class HeaderColumnGroup {
    rows: QueryList<any>;
}
export declare class FooterColumnGroup {
    rows: QueryList<any>;
}
export declare class ColumnBodyTemplateLoader implements OnInit, OnDestroy {
    viewContainer: ViewContainerRef;
    column: any;
    rowData: any;
    rowIndex: number;
    view: EmbeddedViewRef<any>;
    constructor(viewContainer: ViewContainerRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
export declare class ColumnHeaderTemplateLoader implements OnInit, OnDestroy {
    viewContainer: ViewContainerRef;
    column: any;
    view: EmbeddedViewRef<any>;
    constructor(viewContainer: ViewContainerRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
export declare class ColumnFooterTemplateLoader implements OnInit, OnDestroy {
    viewContainer: ViewContainerRef;
    column: any;
    view: EmbeddedViewRef<any>;
    constructor(viewContainer: ViewContainerRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
export declare class ColumnFilterTemplateLoader implements OnInit, OnDestroy {
    viewContainer: ViewContainerRef;
    column: any;
    view: EmbeddedViewRef<any>;
    constructor(viewContainer: ViewContainerRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
export declare class ColumnEditorTemplateLoader implements OnInit, OnDestroy {
    viewContainer: ViewContainerRef;
    column: any;
    rowData: any;
    view: EmbeddedViewRef<any>;
    constructor(viewContainer: ViewContainerRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
export declare class TemplateLoader implements OnInit, OnDestroy {
    viewContainer: ViewContainerRef;
    template: TemplateRef<any>;
    data: any;
    view: EmbeddedViewRef<any>;
    constructor(viewContainer: ViewContainerRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
export declare class SharedModule {
}
