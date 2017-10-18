import { EventEmitter, ViewContainerRef, TemplateRef, OnInit, OnChanges, OnDestroy, AfterContentInit, QueryList, SimpleChanges, EmbeddedViewRef } from '@angular/core';
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
    colId: string;
    sortField: string;
    filterField: string;
    header: string;
    footer: string;
    sortable: any;
    editable: boolean;
    filter: boolean;
    filterMatchMode: string;
    filterType: string;
    rowspan: number;
    colspan: number;
    style: any;
    styleClass: string;
    hidden: boolean;
    expander: boolean;
    selectionMode: string;
    filterPlaceholder: string;
    filterMaxlength: number;
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
    frozen: boolean;
    rows: QueryList<any>;
}
export declare class FooterColumnGroup {
    frozen: boolean;
    rows: QueryList<any>;
}
export declare class ColumnBodyTemplateLoader implements OnInit, OnChanges, OnDestroy {
    viewContainer: ViewContainerRef;
    column: any;
    rowData: any;
    rowIndex: number;
    view: EmbeddedViewRef<any>;
    constructor(viewContainer: ViewContainerRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
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
    rowIndex: any;
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
