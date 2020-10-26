import { NgModule, Component, HostListener, OnInit, OnDestroy, AfterViewInit, Directive, Optional, AfterContentInit,
    Input, Output, EventEmitter, ElementRef, ContentChildren, TemplateRef, QueryList, ViewChild, NgZone, ChangeDetectorRef, OnChanges, SimpleChanges, ChangeDetectionStrategy, Query, ViewEncapsulation, Renderer2} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrimeTemplate, SharedModule, FilterMatchMode, FilterOperator, SelectItem, PrimeNGConfig, TranslationKeys } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { DomHandler, ConnectedOverlayScrollHandler } from 'primeng/dom';
import { ObjectUtils } from 'primeng/utils';
import { SortMeta } from 'primeng/api';
import { TableState } from 'primeng/api';
import { FilterMetadata } from 'primeng/api';
import { Injectable } from '@angular/core';
import { BlockableUI } from 'primeng/api';
import { Subject, Subscription } from 'rxjs';
import { FilterUtils } from 'primeng/utils';
import { ScrollingModule, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {trigger,style,transition,animate,AnimationEvent} from '@angular/animations';

@Injectable()
export class TableService {

    private sortSource = new Subject<SortMeta|SortMeta[]>();
    private selectionSource = new Subject();
    private contextMenuSource = new Subject<any>();
    private valueSource = new Subject<any>();
    private totalRecordsSource = new Subject<any>();
    private columnsSource = new Subject();

    sortSource$ = this.sortSource.asObservable();
    selectionSource$ = this.selectionSource.asObservable();
    contextMenuSource$ = this.contextMenuSource.asObservable();
    valueSource$ = this.valueSource.asObservable();
    totalRecordsSource$ = this.totalRecordsSource.asObservable();
    columnsSource$ = this.columnsSource.asObservable();

    onSort(sortMeta: SortMeta|SortMeta[]) {
        this.sortSource.next(sortMeta);
    }

    onSelectionChange() {
        this.selectionSource.next();
    }

    onContextMenu(data: any) {
        this.contextMenuSource.next(data);
    }

    onValueChange(value: any) {
        this.valueSource.next(value);
    }

    onTotalRecordsChange(value: number) {
        this.totalRecordsSource.next(value);
    }

    onColumnsChange(columns: any[]) {
        this.columnsSource.next(columns);
    }
}

@Component({
    selector: 'p-table',
    template: `
        <div #container [ngStyle]="style" [class]="styleClass" data-scrollselectors=".p-datatable-scrollable-body, .p-datatable-unfrozen-view .p-datatable-scrollable-body"
            [ngClass]="{'p-datatable p-component': true,
                'p-datatable-hoverable-rows': (rowHover||selectionMode),
                'p-datatable-auto-layout': autoLayout,
                'p-datatable-resizable': resizableColumns,
                'p-datatable-resizable-fit': (resizableColumns && columnResizeMode === 'fit'),
                'p-datatable-scrollable': scrollable,
                'p-datatable-flex-scrollable': (scrollable && scrollHeight === 'flex'),
                'p-datatable-responsive': responsive}">
            <div class="p-datatable-loading-overlay p-component-overlay" *ngIf="loading && showLoader">
                <i [class]="'p-datatable-loading-icon pi-spin ' + loadingIcon"></i>
            </div>
            <div *ngIf="captionTemplate" class="p-datatable-header">
                <ng-container *ngTemplateOutlet="captionTemplate"></ng-container>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" styleClass="p-paginator-top" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'top' || paginatorPosition =='both')"
                [templateLeft]="paginatorLeftTemplate" [templateRight]="paginatorRightTemplate" [dropdownAppendTo]="paginatorDropdownAppendTo" [dropdownScrollHeight]="paginatorDropdownScrollHeight"
                [currentPageReportTemplate]="currentPageReportTemplate" [showFirstLastIcon]="showFirstLastIcon" [dropdownItemTemplate]="paginatorDropdownItemTemplate" [showCurrentPageReport]="showCurrentPageReport" [showJumpToPageDropdown]="showJumpToPageDropdown" [showPageLinks]="showPageLinks"></p-paginator>

            <div class="p-datatable-wrapper" *ngIf="!scrollable">
                <table role="grid" #table [ngClass]="tableStyleClass" [ngStyle]="tableStyle">
                    <ng-container *ngTemplateOutlet="colGroupTemplate; context {$implicit: columns}"></ng-container>
                    <thead class="p-datatable-thead">
                        <ng-container *ngTemplateOutlet="headerTemplate; context: {$implicit: columns}"></ng-container>
                    </thead>
                    <tbody class="p-datatable-tbody" [pTableBody]="columns" [pTableBodyTemplate]="bodyTemplate"></tbody>
                    <tfoot *ngIf="footerTemplate" class="p-datatable-tfoot">
                        <ng-container *ngTemplateOutlet="footerTemplate; context {$implicit: columns}"></ng-container>
                    </tfoot>
                </table>
            </div>

            <div class="p-datatable-scrollable-wrapper" *ngIf="scrollable">
               <div class="p-datatable-scrollable-view p-datatable-frozen-view" *ngIf="frozenColumns||frozenBodyTemplate" #scrollableFrozenView [pScrollableView]="frozenColumns" [frozen]="true" [ngStyle]="{width: frozenWidth}" [scrollHeight]="scrollHeight"></div>
               <div class="p-datatable-scrollable-view" #scrollableView [pScrollableView]="columns" [frozen]="false" [scrollHeight]="scrollHeight" [ngStyle]="{left: frozenWidth, width: 'calc(100% - '+frozenWidth+')'}"></div>
            </div>

            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" styleClass="p-paginator-bottom" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')"
                [templateLeft]="paginatorLeftTemplate" [templateRight]="paginatorRightTemplate" [dropdownAppendTo]="paginatorDropdownAppendTo" [dropdownScrollHeight]="paginatorDropdownScrollHeight"
                [currentPageReportTemplate]="currentPageReportTemplate" [showFirstLastIcon]="showFirstLastIcon" [dropdownItemTemplate]="paginatorDropdownItemTemplate" [showCurrentPageReport]="showCurrentPageReport" [showJumpToPageDropdown]="showJumpToPageDropdown" [showPageLinks]="showPageLinks"></p-paginator>

            <div *ngIf="summaryTemplate" class="p-datatable-footer">
                <ng-container *ngTemplateOutlet="summaryTemplate"></ng-container>
            </div>

            <div #resizeHelper class="p-column-resizer-helper" style="display:none" *ngIf="resizableColumns"></div>
            <span #reorderIndicatorUp class="pi pi-arrow-down p-datatable-reorder-indicator-up" style="display:none" *ngIf="reorderableColumns"></span>
            <span #reorderIndicatorDown class="pi pi-arrow-up p-datatable-reorder-indicator-down" style="display:none" *ngIf="reorderableColumns"></span>
        </div>
    `,
    providers: [TableService],
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./table.css']
})
export class Table implements OnInit, AfterViewInit, AfterContentInit, BlockableUI, OnChanges {

    @Input() frozenColumns: any[];

    @Input() frozenValue: any[];

    @Input() style: any;

    @Input() styleClass: string;

    @Input() tableStyle: any;

    @Input() tableStyleClass: string;

    @Input() paginator: boolean;

    @Input() pageLinks: number = 5;

    @Input() rowsPerPageOptions: any[];

    @Input() alwaysShowPaginator: boolean = true;

    @Input() paginatorPosition: string = 'bottom';

    @Input() paginatorDropdownAppendTo: any;

    @Input() paginatorDropdownScrollHeight: string = '200px';

    @Input() currentPageReportTemplate: string = '{currentPage} of {totalPages}';

    @Input() showCurrentPageReport: boolean;

    @Input() showJumpToPageDropdown: boolean;

    @Input() showFirstLastIcon: boolean = true;

    @Input() showPageLinks: boolean = true;

    @Input() defaultSortOrder: number = 1;

    @Input() sortMode: string = 'single';

    @Input() resetPageOnSort: boolean = true;

    @Input() selectionMode: string;

    @Output() selectionChange: EventEmitter<any> = new EventEmitter();

    @Input() contextMenuSelection: any;

    @Output() contextMenuSelectionChange: EventEmitter<any> = new EventEmitter();

    @Input() contextMenuSelectionMode: string = "separate";

    @Input() dataKey: string;

    @Input() metaKeySelection: boolean;

    @Input() rowTrackBy: Function = (index: number, item: any) => item;

    @Input() lazy: boolean = false;

    @Input() lazyLoadOnInit: boolean = true;

    @Input() compareSelectionBy: string = 'deepEquals';

    @Input() csvSeparator: string = ',';

    @Input() exportFilename: string = 'download';

    @Input() filters: { [s: string]: FilterMetadata | FilterMetadata[] } = {};

    @Input() globalFilterFields: string[];

    @Input() filterDelay: number = 300;

    @Input() filterLocale: string;

    @Input() expandedRowKeys: { [s: string]: boolean; } = {};

    @Input() editingRowKeys: { [s: string]: boolean; } = {};

    @Input() rowExpandMode: string = 'multiple';

    @Input() scrollable: boolean;

    @Input() scrollHeight: string;

    @Input() virtualScroll: boolean;

    @Input() virtualScrollDelay: number = 150;

    @Input() virtualRowHeight: number = 28;

    @Input() frozenWidth: string;

    @Input() responsive: boolean;

    @Input() contextMenu: any;

    @Input() resizableColumns: boolean;

    @Input() columnResizeMode: string = 'fit';

    @Input() reorderableColumns: boolean;

    @Input() loading: boolean;

    @Input() loadingIcon: string = 'pi pi-spinner';

    @Input() showLoader: boolean = true;

    @Input() rowHover: boolean;

    @Input() customSort: boolean;

    @Input() autoLayout: boolean;

    @Input() exportFunction;

    @Input() stateKey: string;

    @Input() stateStorage: string = 'session';

    @Input() editMode: string = 'cell';

    @Input() minBufferPx: number;

    @Input() maxBufferPx: number;

    @Output() onRowSelect: EventEmitter<any> = new EventEmitter();

    @Output() onRowUnselect: EventEmitter<any> = new EventEmitter();

    @Output() onPage: EventEmitter<any> = new EventEmitter();

    @Output() onSort: EventEmitter<any> = new EventEmitter();

    @Output() onFilter: EventEmitter<any> = new EventEmitter();

    @Output() onLazyLoad: EventEmitter<any> = new EventEmitter();

    @Output() onRowExpand: EventEmitter<any> = new EventEmitter();

    @Output() onRowCollapse: EventEmitter<any> = new EventEmitter();

    @Output() onContextMenuSelect: EventEmitter<any> = new EventEmitter();

    @Output() onColResize: EventEmitter<any> = new EventEmitter();

    @Output() onColReorder: EventEmitter<any> = new EventEmitter();

    @Output() onRowReorder: EventEmitter<any> = new EventEmitter();

    @Output() onEditInit: EventEmitter<any> = new EventEmitter();

    @Output() onEditComplete: EventEmitter<any> = new EventEmitter();

    @Output() onEditCancel: EventEmitter<any> = new EventEmitter();

    @Output() onHeaderCheckboxToggle: EventEmitter<any> = new EventEmitter();

    @Output() sortFunction: EventEmitter<any> = new EventEmitter();

    @Output() firstChange: EventEmitter<number> = new EventEmitter();

    @Output() rowsChange: EventEmitter<number> = new EventEmitter();

    @Output() onStateSave: EventEmitter<any> = new EventEmitter();

    @Output() onStateRestore: EventEmitter<any> = new EventEmitter();

    @ViewChild('container') containerViewChild: ElementRef;

    @ViewChild('resizeHelper') resizeHelperViewChild: ElementRef;

    @ViewChild('reorderIndicatorUp') reorderIndicatorUpViewChild: ElementRef;

    @ViewChild('reorderIndicatorDown') reorderIndicatorDownViewChild: ElementRef;

    @ViewChild('table') tableViewChild: ElementRef;

    @ViewChild('scrollableView') scrollableViewChild;

    @ViewChild('scrollableFrozenView') scrollableFrozenViewChild;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;

    _value: any[] = [];

    _columns: any[];

    _totalRecords: number = 0;

    _first: number = 0;

    _rows: number;

    filteredValue: any[];

    headerTemplate: TemplateRef<any>;

    bodyTemplate: TemplateRef<any>;

    loadingBodyTemplate: TemplateRef<any>;

    captionTemplate: TemplateRef<any>;

    frozenRowsTemplate: TemplateRef<any>;

    footerTemplate: TemplateRef<any>;

    summaryTemplate: TemplateRef<any>;

    colGroupTemplate: TemplateRef<any>;

    expandedRowTemplate: TemplateRef<any>;

    frozenHeaderTemplate: TemplateRef<any>;

    frozenBodyTemplate: TemplateRef<any>;

    frozenFooterTemplate: TemplateRef<any>;

    frozenColGroupTemplate: TemplateRef<any>;

    emptyMessageTemplate: TemplateRef<any>;

    paginatorLeftTemplate: TemplateRef<any>;

    paginatorRightTemplate: TemplateRef<any>;

    paginatorDropdownItemTemplate: TemplateRef<any>;

    selectionKeys: any = {};

    lastResizerHelperX: number;

    reorderIconWidth: number;

    reorderIconHeight: number;

    draggedColumn: any;

    draggedRowIndex: number;

    droppedRowIndex: number;

    rowDragging: boolean;

    dropPosition: number;

    editingCell: Element;

    editingCellData: any;

    editingCellField: any;

    editingCellRowIndex: number;

    editingCellClick: boolean;

    documentEditListener: any;

    _multiSortMeta: SortMeta[];

    _sortField: string;

    _sortOrder: number = 1;

    preventSelectionSetterPropagation: boolean;

    _selection: any;

    anchorRowIndex: number;

    rangeRowIndex: number;

    filterTimeout: any;

    initialized: boolean;

    rowTouched: boolean;

    restoringSort: boolean;

    restoringFilter: boolean;

    stateRestored: boolean;

    columnOrderStateRestored: boolean;

    columnWidthsState: string;

    tableWidthState: string;

    constructor(public el: ElementRef, public zone: NgZone, public tableService: TableService, public cd: ChangeDetectorRef) {}

    ngOnInit() {
        if (this.lazy && this.lazyLoadOnInit) {
            if (!this.virtualScroll) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }

            if (this.restoringFilter) {
                this.restoringFilter = false;
            }
        }

        this.initialized = true;
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'caption':
                    this.captionTemplate = item.template;
                break;

                case 'header':
                    this.headerTemplate = item.template;
                break;

                case 'body':
                    this.bodyTemplate = item.template;
                break;

                case 'loadingbody':
                    this.loadingBodyTemplate = item.template;
                break;

                case 'footer':
                    this.footerTemplate = item.template;
                break;

                case 'summary':
                    this.summaryTemplate = item.template;
                break;

                case 'colgroup':
                    this.colGroupTemplate = item.template;
                break;

                case 'rowexpansion':
                    this.expandedRowTemplate = item.template;
                break;

                case 'frozenrows':
                    this.frozenRowsTemplate = item.template;
                break;

                case 'frozenheader':
                    this.frozenHeaderTemplate = item.template;
                break;

                case 'frozenbody':
                    this.frozenBodyTemplate = item.template;
                break;

                case 'frozenfooter':
                    this.frozenFooterTemplate = item.template;
                break;

                case 'frozencolgroup':
                    this.frozenColGroupTemplate = item.template;
                break;

                case 'emptymessage':
                    this.emptyMessageTemplate = item.template;
                break;

                case 'paginatorleft':
                    this.paginatorLeftTemplate = item.template;
                break;

                case 'paginatorright':
                    this.paginatorRightTemplate = item.template;
                break;

                case 'paginatordropdownitem':
                    this.paginatorDropdownItemTemplate = item.template;
                break;
            }
        });
    }

    ngAfterViewInit() {
        if (this.isStateful() && this.resizableColumns) {
            this.restoreColumnWidths();
        }
    }

    clearCache() {
        if (this.scrollable) {
            if (this.scrollableViewChild) {
                this.scrollableViewChild.clearCache();
            }

            if (this.scrollableFrozenViewChild) {
                this.scrollableViewChild.clearCache();
            }
        }
    }

    ngOnChanges(simpleChange: SimpleChanges) {
        if (simpleChange.value) {
            if (this.isStateful() && !this.stateRestored) {
                this.restoreState();
            }

            this._value = simpleChange.value.currentValue;

            if (!this.lazy) {
                this.clearCache();
                this.totalRecords = (this._value ? this._value.length : 0);

                if (this.sortMode == 'single' && this.sortField)
                    this.sortSingle();
                else if (this.sortMode == 'multiple' && this.multiSortMeta)
                    this.sortMultiple();
                else if (this.hasFilter())       //sort already filters
                    this._filter();
            }

            this.tableService.onValueChange(simpleChange.value.currentValue);
        }

        if (simpleChange.columns) {
            this._columns = simpleChange.columns.currentValue;
            this.tableService.onColumnsChange(simpleChange.columns.currentValue);

            if (this._columns && this.isStateful() && this.reorderableColumns && !this.columnOrderStateRestored ) {
                this.restoreColumnOrder();
            }
        }

        if (simpleChange.sortField) {
            this._sortField = simpleChange.sortField.currentValue;

            //avoid triggering lazy load prior to lazy initialization at onInit
            if ( !this.lazy || this.initialized ) {
                if (this.sortMode === 'single') {
                    this.sortSingle();
                }
            }
        }

        if (simpleChange.sortOrder) {
            this._sortOrder = simpleChange.sortOrder.currentValue;

            //avoid triggering lazy load prior to lazy initialization at onInit
            if ( !this.lazy || this.initialized ) {
                if (this.sortMode === 'single') {
                    this.sortSingle();
                }
            }
        }

        if (simpleChange.multiSortMeta) {
            this._multiSortMeta = simpleChange.multiSortMeta.currentValue;
            if (this.sortMode === 'multiple') {
                this.sortMultiple();
            }
        }

        if (simpleChange.selection) {
            this._selection = simpleChange.selection.currentValue;

            if (!this.preventSelectionSetterPropagation) {
                this.updateSelectionKeys();
                this.tableService.onSelectionChange();
            }
            this.preventSelectionSetterPropagation = false;
        }
    }

    @Input() get value(): any[] {
        return this._value;
    }
    set value(val: any[]) {
        this._value = val;
    }

    @Input() get columns(): any[] {
        return this._columns;
    }
    set columns(cols: any[]) {
        this._columns = cols;
    }

    @Input() get first(): number {
        return this._first;
    }
    set first(val: number) {
        this._first = val;
    }

    @Input() get rows(): number {
        return this._rows;
    }
    set rows(val: number) {
        this._rows = val;
    }

    @Input() get totalRecords(): number {
        return this._totalRecords;
    }
    set totalRecords(val: number) {
        this._totalRecords = val;
        this.tableService.onTotalRecordsChange(this._totalRecords);
    }

    @Input() get sortField(): string {
        return this._sortField;
    }

    set sortField(val: string) {
        this._sortField = val;
    }

    @Input() get sortOrder(): number {
        return this._sortOrder;
    }
    set sortOrder(val: number) {
        this._sortOrder = val;
    }

    @Input() get multiSortMeta(): SortMeta[] {
        return this._multiSortMeta;
    }

    set multiSortMeta(val: SortMeta[]) {
        this._multiSortMeta = val;
    }

    @Input() get selection(): any {
        return this._selection;
    }

    set selection(val: any) {
        this._selection = val;
    }

    updateSelectionKeys() {
        if (this.dataKey && this._selection) {
            this.selectionKeys = {};
            if (Array.isArray(this._selection)) {
                for(let data of this._selection) {
                    this.selectionKeys[String(ObjectUtils.resolveFieldData(data, this.dataKey))] = 1;
                }
            }
            else {
                this.selectionKeys[String(ObjectUtils.resolveFieldData(this._selection, this.dataKey))] = 1;
            }
        }
    }

    onPageChange(event) {
        this.first = event.first;
        this.rows = event.rows;

        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }

        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });

        this.firstChange.emit(this.first);
        this.rowsChange.emit(this.rows);
        this.tableService.onValueChange(this.value);

        if (this.isStateful()) {
            this.saveState();
        }

        this.anchorRowIndex = null;

        if (this.scrollable) {
            this.resetScrollTop();
        }
    }

    sort(event) {
        let originalEvent = event.originalEvent;

        if (this.sortMode === 'single') {
            this._sortOrder = (this.sortField === event.field) ? this.sortOrder * -1 : this.defaultSortOrder;
            this._sortField = event.field;
            this.sortSingle();

            if (this.resetPageOnSort) {
                this._first = 0;
                this.firstChange.emit(this._first);

                if (this.scrollable) {
                    this.resetScrollTop();
                }
            }
        }
        if (this.sortMode === 'multiple') {
            let metaKey = originalEvent.metaKey || originalEvent.ctrlKey;
            let sortMeta = this.getSortMeta(event.field);

            if (sortMeta) {
                if (!metaKey) {
                    this._multiSortMeta = [{ field: event.field, order: sortMeta.order * -1 }];

                    if (this.resetPageOnSort) {
                        this._first = 0;
                        this.firstChange.emit(this._first);

                        if (this.scrollable) {
                            this.resetScrollTop();
                        }
                    }
                }
                else {
                    sortMeta.order = sortMeta.order * -1;
                }
            }
            else {
                if (!metaKey || !this.multiSortMeta) {
                    this._multiSortMeta = [];

                    if (this.resetPageOnSort) {
                        this._first = 0;
                        this.firstChange.emit(this._first);
                    }
                }
                this._multiSortMeta.push({ field: event.field, order: this.defaultSortOrder });
            }

            this.sortMultiple();
        }

        if (this.isStateful()) {
            this.saveState();
        }

        this.anchorRowIndex = null;
    }

    sortSingle() {
        if (this.sortField && this.sortOrder) {
            if (this.restoringSort) {
                this.restoringSort = false;
            }

            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else if (this.value) {
                if (this.customSort) {
                    this.sortFunction.emit({
                        data: this.value,
                        mode: this.sortMode,
                        field: this.sortField,
                        order: this.sortOrder
                    });
                }
                else {
                    this.value.sort((data1, data2) => {
                        let value1 = ObjectUtils.resolveFieldData(data1, this.sortField);
                        let value2 = ObjectUtils.resolveFieldData(data2, this.sortField);
                        let result = null;

                        if (value1 == null && value2 != null)
                            result = -1;
                        else if (value1 != null && value2 == null)
                            result = 1;
                        else if (value1 == null && value2 == null)
                            result = 0;
                        else if (typeof value1 === 'string' && typeof value2 === 'string')
                            result = value1.localeCompare(value2);
                        else
                            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

                        return (this.sortOrder * result);
                    });

                    this._value = [...this.value];
                }

                if (this.hasFilter()) {
                    this._filter();
                }
            }

            let sortMeta: SortMeta = {
                field: this.sortField,
                order: this.sortOrder
            };

            this.onSort.emit(sortMeta);
            this.tableService.onSort(sortMeta);
        }
    }

    sortMultiple() {
        if (this.multiSortMeta) {
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else if (this.value) {
                if (this.customSort) {
                    this.sortFunction.emit({
                        data: this.value,
                        mode: this.sortMode,
                        multiSortMeta: this.multiSortMeta
                    });
                }
                else {
                    this.value.sort((data1, data2) => {
                        return this.multisortField(data1, data2, this.multiSortMeta, 0);
                    });

                    this._value = [...this.value];
                }

                if (this.hasFilter()) {
                    this._filter();
                }
            }

            this.onSort.emit({
                multisortmeta: this.multiSortMeta
            });
            this.tableService.onSort(this.multiSortMeta);
        }
    }

    multisortField(data1, data2, multiSortMeta, index) {
        let value1 = ObjectUtils.resolveFieldData(data1, multiSortMeta[index].field);
        let value2 = ObjectUtils.resolveFieldData(data2, multiSortMeta[index].field);
        let result = null;

        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        else if (typeof value1 == 'string' || value1 instanceof String) {
            if (value1.localeCompare && (value1 != value2)) {
                return (multiSortMeta[index].order * value1.localeCompare(value2));
            }
        }
        else {
            result = (value1 < value2) ? -1 : 1;
        }

        if (value1 == value2) {
            return (multiSortMeta.length - 1) > (index) ? (this.multisortField(data1, data2, multiSortMeta, index + 1)) : 0;
        }

        return (multiSortMeta[index].order * result);
    }

    getSortMeta(field: string) {
        if (this.multiSortMeta && this.multiSortMeta.length) {
            for (let i = 0; i < this.multiSortMeta.length; i++) {
                if (this.multiSortMeta[i].field === field) {
                    return this.multiSortMeta[i];
                }
            }
        }

        return null;
    }

    isSorted(field: string) {
        if (this.sortMode === 'single') {
            return (this.sortField && this.sortField === field);
        }
        else if (this.sortMode === 'multiple') {
            let sorted = false;
            if (this.multiSortMeta) {
                for(let i = 0; i < this.multiSortMeta.length; i++) {
                    if (this.multiSortMeta[i].field == field) {
                        sorted = true;
                        break;
                    }
                }
            }
            return sorted;
        }
    }

    handleRowClick(event) {
        let target = (<HTMLElement> event.originalEvent.target);
        let targetNode = target.nodeName;
        let parentNode = target.parentElement && target.parentElement.nodeName;
        if (targetNode == 'INPUT' || targetNode == 'BUTTON' || targetNode == 'A' ||
            parentNode == 'INPUT' || parentNode == 'BUTTON' || parentNode == 'A' ||
            (DomHandler.hasClass(event.originalEvent.target, 'p-clickable'))) {
            return;
        }

        if (this.selectionMode) {
            this.preventSelectionSetterPropagation = true;
            if (this.isMultipleSelectionMode() && event.originalEvent.shiftKey && this.anchorRowIndex != null) {
                DomHandler.clearSelection();
                if (this.rangeRowIndex != null) {
                    this.clearSelectionRange(event.originalEvent);
                }

                this.rangeRowIndex = event.rowIndex;
                this.selectRange(event.originalEvent, event.rowIndex);
            }
            else {
                let rowData = event.rowData;
                let selected = this.isSelected(rowData);
                let metaSelection = this.rowTouched ? false : this.metaKeySelection;
                let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;
                this.anchorRowIndex = event.rowIndex;
                this.rangeRowIndex = event.rowIndex;

                if (metaSelection) {
                    let metaKey = event.originalEvent.metaKey||event.originalEvent.ctrlKey;

                    if (selected && metaKey) {
                        if (this.isSingleSelectionMode()) {
                            this._selection = null;
                            this.selectionKeys = {};
                            this.selectionChange.emit(null);
                        }
                        else {
                            let selectionIndex = this.findIndexInSelection(rowData);
                            this._selection = this.selection.filter((val,i) => i!=selectionIndex);
                            this.selectionChange.emit(this.selection);
                            if (dataKeyValue) {
                                delete this.selectionKeys[dataKeyValue];
                            }
                        }

                        this.onRowUnselect.emit({originalEvent: event.originalEvent, data: rowData, type: 'row'});
                    }
                    else {
                        if (this.isSingleSelectionMode()) {
                            this._selection = rowData;
                            this.selectionChange.emit(rowData);
                            if (dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                        else if (this.isMultipleSelectionMode()) {
                            if (metaKey) {
                                this._selection = this.selection||[];
                            }
                            else {
                                this._selection = [];
                                this.selectionKeys = {};
                            }

                            this._selection = [...this.selection,rowData];
                            this.selectionChange.emit(this.selection);
                            if (dataKeyValue) {
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }

                        this.onRowSelect.emit({originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex});
                    }
                }
                else {
                    if (this.selectionMode === 'single') {
                        if (selected) {
                            this._selection = null;
                            this.selectionKeys = {};
                            this.selectionChange.emit(this.selection);
                            this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                        }
                        else {
                            this._selection = rowData;
                            this.selectionChange.emit(this.selection);
                            this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
                            if (dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                    }
                    else if (this.selectionMode === 'multiple') {
                        if (selected) {
                            let selectionIndex = this.findIndexInSelection(rowData);
                            this._selection = this.selection.filter((val, i) => i != selectionIndex);
                            this.selectionChange.emit(this.selection);
                            this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                            if (dataKeyValue) {
                                delete this.selectionKeys[dataKeyValue];
                            }
                        }
                        else {
                            this._selection = this.selection ? [...this.selection, rowData] : [rowData];
                            this.selectionChange.emit(this.selection);
                            this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
                            if (dataKeyValue) {
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                    }
                }
            }

            this.tableService.onSelectionChange();

            if (this.isStateful()) {
                this.saveState();
            }
        }

        this.rowTouched = false;
    }

    handleRowTouchEnd(event) {
        this.rowTouched = true;
    }

    handleRowRightClick(event) {
        if (this.contextMenu) {
            const rowData = event.rowData;

            if (this.contextMenuSelectionMode === 'separate') {
                this.contextMenuSelection = rowData;
                this.contextMenuSelectionChange.emit(rowData);
                this.onContextMenuSelect.emit({originalEvent: event.originalEvent, data: rowData, index: event.rowIndex});
                this.contextMenu.show(event.originalEvent);
                this.tableService.onContextMenu(rowData);
            }
            else if (this.contextMenuSelectionMode === 'joint') {
                this.preventSelectionSetterPropagation = true;
                let selected = this.isSelected(rowData);
                let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;

                if (!selected) {
                    if (this.isSingleSelectionMode()) {
                        this.selection = rowData;
                        this.selectionChange.emit(rowData);
                    }
                    else if (this.isMultipleSelectionMode()) {
                        this.selection = [rowData];
                        this.selectionChange.emit(this.selection);
                    }

                    if (dataKeyValue) {
                        this.selectionKeys[dataKeyValue] = 1;
                    }
                }

                this.contextMenu.show(event.originalEvent);
                this.onContextMenuSelect.emit({originalEvent: event, data: rowData, index: event.rowIndex});
            }
        }
    }

    selectRange(event: MouseEvent, rowIndex: number) {
        let rangeStart, rangeEnd;

        if (this.anchorRowIndex > rowIndex) {
            rangeStart = rowIndex;
            rangeEnd = this.anchorRowIndex;
        }
        else if (this.anchorRowIndex < rowIndex) {
            rangeStart = this.anchorRowIndex;
            rangeEnd = rowIndex;
        }
        else {
            rangeStart = rowIndex;
            rangeEnd = rowIndex;
        }

        if (this.lazy && this.paginator) {
            rangeStart -= this.first;
            rangeEnd -= this.first;
        }

        for(let i = rangeStart; i <= rangeEnd; i++) {
            let rangeRowData = this.filteredValue ? this.filteredValue[i] : this.value[i];
            if (!this.isSelected(rangeRowData)) {
                this._selection = [...this.selection, rangeRowData];
                let dataKeyValue: string = this.dataKey ? String(ObjectUtils.resolveFieldData(rangeRowData, this.dataKey)) : null;
                if (dataKeyValue) {
                    this.selectionKeys[dataKeyValue] = 1;
                }
                this.onRowSelect.emit({originalEvent: event, data: rangeRowData, type: 'row'});
            }
        }

        this.selectionChange.emit(this.selection);
    }

    clearSelectionRange(event: MouseEvent) {
        let rangeStart, rangeEnd;

        if (this.rangeRowIndex > this.anchorRowIndex) {
            rangeStart = this.anchorRowIndex;
            rangeEnd = this.rangeRowIndex;
        }
        else if (this.rangeRowIndex < this.anchorRowIndex) {
            rangeStart = this.rangeRowIndex;
            rangeEnd = this.anchorRowIndex;
        }
        else {
            rangeStart = this.rangeRowIndex;
            rangeEnd = this.rangeRowIndex;
        }

        for(let i = rangeStart; i <= rangeEnd; i++) {
            let rangeRowData = this.value[i];
            let selectionIndex = this.findIndexInSelection(rangeRowData);
            this._selection = this.selection.filter((val,i) => i!=selectionIndex);
            let dataKeyValue: string = this.dataKey ? String(ObjectUtils.resolveFieldData(rangeRowData, this.dataKey)) : null;
            if (dataKeyValue) {
                delete this.selectionKeys[dataKeyValue];
            }
            this.onRowUnselect.emit({originalEvent: event, data: rangeRowData, type: 'row'});
        }
    }

    isSelected(rowData) {
        if (rowData && this.selection) {
            if (this.dataKey) {
                return this.selectionKeys[ObjectUtils.resolveFieldData(rowData, this.dataKey)] !== undefined;
            }
            else {
                if (this.selection instanceof Array)
                    return this.findIndexInSelection(rowData) > -1;
                else
                    return this.equals(rowData, this.selection);
            }
        }

        return false;
    }

    findIndexInSelection(rowData: any) {
        let index: number = -1;
        if (this.selection && this.selection.length) {
            for (let i = 0; i < this.selection.length; i++) {
                if (this.equals(rowData, this.selection[i])) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }

    toggleRowWithRadio(event: any, rowData:any) {
        this.preventSelectionSetterPropagation = true;

        if (this.selection != rowData) {
            this._selection = rowData;
            this.selectionChange.emit(this.selection);
            this.onRowSelect.emit({originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'radiobutton'});

            if (this.dataKey) {
                this.selectionKeys = {};
                this.selectionKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey))] = 1;
            }
        }
        else {
            this._selection = null;
            this.selectionChange.emit(this.selection);
            this.onRowUnselect.emit({originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'radiobutton'});
        }

        this.tableService.onSelectionChange();

        if (this.isStateful()) {
            this.saveState();
        }
    }

    toggleRowWithCheckbox(event, rowData: any) {
        this.selection = this.selection||[];
        let selected = this.isSelected(rowData);
        let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;
        this.preventSelectionSetterPropagation = true;

        if (selected) {
            let selectionIndex = this.findIndexInSelection(rowData);
            this._selection = this.selection.filter((val, i) => i != selectionIndex);
            this.selectionChange.emit(this.selection);
            this.onRowUnselect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'checkbox' });
            if (dataKeyValue) {
                delete this.selectionKeys[dataKeyValue];
            }
        }
        else {
            this._selection = this.selection ? [...this.selection, rowData] : [rowData];
            this.selectionChange.emit(this.selection);
            this.onRowSelect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'checkbox' });
            if (dataKeyValue) {
                this.selectionKeys[dataKeyValue] = 1;
            }
        }

        this.tableService.onSelectionChange();

        if (this.isStateful()) {
            this.saveState();
        }
    }

    toggleRowsWithCheckbox(event: Event, check: boolean) {
        this._selection = check ? this.filteredValue ? this.filteredValue.slice(): this.value.slice() : [];
        this.preventSelectionSetterPropagation = true;
        this.updateSelectionKeys();
        this.selectionChange.emit(this._selection);
        this.tableService.onSelectionChange();
        this.onHeaderCheckboxToggle.emit({originalEvent: event, checked: check});

        if (this.isStateful()) {
            this.saveState();
        }
    }

    equals(data1, data2) {
        return this.compareSelectionBy === 'equals' ? (data1 === data2) : ObjectUtils.equals(data1, data2, this.dataKey);
    }

    /* Legacy Filtering for custom elements */
    filter(value: any, field: string, matchMode: string) {
        if (this.filterTimeout) {
            clearTimeout(this.filterTimeout);
        }
        if (!this.isFilterBlank(value)) {
            this.filters[field] = { value: value, matchMode: matchMode };
        } else if (this.filters[field]) {
            delete this.filters[field];
        }

        this.filterTimeout = setTimeout(() => {
            this._filter();
            this.filterTimeout = null;
        }, this.filterDelay);

        this.anchorRowIndex = null;
    }

    filterGlobal(value, matchMode) {
        this.filter(value, 'global', matchMode);
    }

    isFilterBlank(filter: any): boolean {
        if (filter !== null && filter !== undefined) {
            if ((typeof filter === 'string' && filter.trim().length == 0) || (filter instanceof Array && filter.length == 0))
                return true;
            else
                return false;
        }
        return true;
    }

    _filter() {
        if (!this.restoringFilter) {
            this.first = 0;
            this.firstChange.emit(this.first);
        }

        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            if (!this.value) {
                return;
            }

            if (!this.hasFilter()) {
                this.filteredValue = null;
                if (this.paginator) {
                    this.totalRecords = this.value ? this.value.length : 0;
                }
            }
            else {
                let globalFilterFieldsArray;
                if (this.filters['global']) {
                    if (!this.columns && !this.globalFilterFields)
                        throw new Error('Global filtering requires dynamic columns or globalFilterFields to be defined.');
                    else
                        globalFilterFieldsArray = this.globalFilterFields||this.columns;
                }

                this.filteredValue = [];

                for (let i = 0; i < this.value.length; i++) {
                    let localMatch = true;
                    let globalMatch = false;
                    let localFiltered = false;

                    for (let prop in this.filters) {
                        if (this.filters.hasOwnProperty(prop) && prop !== 'global') {
                            localFiltered = true;
                            let filterField = prop;
                            let filterMeta = this.filters[filterField];

                            if (Array.isArray(filterMeta)) {
                                for (let meta of filterMeta) {
                                    localMatch = this.executeLocalFilter(filterField, this.value[i], meta);

                                    if ((meta.operator === FilterOperator.OR && localMatch) || (meta.operator === FilterOperator.AND && !localMatch)) {
                                        break;
                                    }
                                }
                            }
                            else {
                                localMatch = this.executeLocalFilter(filterField, this.value[i], filterMeta);
                            }
                            
                            if (!localMatch) {
                                break;
                            }
                        }
                    }

                    if (this.filters['global'] && !globalMatch && globalFilterFieldsArray) {
                        for(let j = 0; j < globalFilterFieldsArray.length; j++) {
                            let globalFilterField = globalFilterFieldsArray[j].field||globalFilterFieldsArray[j];
                            globalMatch = FilterUtils[(<FilterMetadata> this.filters['global']).matchMode](ObjectUtils.resolveFieldData(this.value[i], globalFilterField), (<FilterMetadata> this.filters['global']).value, this.filterLocale);

                            if (globalMatch) {
                                break;
                            }
                        }
                    }

                    let matches: boolean;
                    if (this.filters['global']) {
                        matches = localFiltered ? (localFiltered && localMatch && globalMatch) : globalMatch;
                    }
                    else {
                        matches = localFiltered && localMatch;
                    }

                    if (matches) {
                        this.filteredValue.push(this.value[i]);
                    }
                }

                if (this.filteredValue.length === this.value.length) {
                    this.filteredValue = null;
                }

                if (this.paginator) {
                    this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
                }
            }
        }

        this.onFilter.emit({
            filters: this.filters,
            filteredValue: this.filteredValue || this.value
        });

        this.tableService.onValueChange(this.value);

        if (this.isStateful() && !this.restoringFilter) {
            this.saveState();
        }

        if (this.restoringFilter) {
            this.restoringFilter = false;
        }

        this.cd.markForCheck();

        if (this.scrollable) {
            this.resetScrollTop();
        }
    }

    executeLocalFilter(field: string, rowData: any, filterMeta: FilterMetadata): boolean {
        let filterValue = filterMeta.value;
        let filterMatchMode = filterMeta.matchMode || FilterMatchMode.STARTS_WITH;
        let dataFieldValue = ObjectUtils.resolveFieldData(rowData, field);
        let filterConstraint = FilterUtils[filterMatchMode];

        return filterConstraint(dataFieldValue, filterValue, this.filterLocale);
    }

    hasFilter() {
        let empty = true;
        for (let prop in this.filters) {
            if (this.filters.hasOwnProperty(prop)) {
                empty = false;
                break;
            }
        }

        return !empty;
    }

    createLazyLoadMetadata(): any {
        return {
            first: this.first,
            rows: this.rows,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            filters: this.filters,
            globalFilter: this.filters && this.filters['global'] ? (<FilterMetadata> this.filters['global']).value : null,
            multiSortMeta: this.multiSortMeta
        };
    }

    public clear() {
        this._sortField = null;
        this._sortOrder = this.defaultSortOrder;
        this._multiSortMeta = null;
        this.tableService.onSort(null);

        this.filteredValue = null;
        this.filters = {};

        this.first = 0;
        this.firstChange.emit(this.first);

        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            this.totalRecords = (this._value ? this._value.length : 0);
        }
    }

    public reset() {
        this.clear();
    }

    public exportCSV(options?: any) {
        let data;
        let csv = '';
        let columns = this.frozenColumns ? [...this.frozenColumns, ...this.columns] : this.columns;

        if (options && options.selectionOnly) {
            data = this.selection || [];
        }
        else {
            data = this.filteredValue || this.value;

            if (this.frozenValue) {
                data = data ? [...this.frozenValue, ...data] : this.frozenValue;
            }
        }

        //headers
        for (let i = 0; i < columns.length; i++) {
            let column = columns[i];
            if (column.exportable !== false && column.field) {
                csv += '"' + (column.header || column.field) + '"';

                if (i < (columns.length - 1)) {
                    csv += this.csvSeparator;
                }
            }
        }

        //body
        data.forEach((record, i) => {
            csv += '\n';
            for (let i = 0; i < columns.length; i++) {
                let column = columns[i];
                if (column.exportable !== false && column.field) {
                    let cellData = ObjectUtils.resolveFieldData(record, column.field);

                    if (cellData != null) {
                        if (this.exportFunction) {
                            cellData = this.exportFunction({
                                data: cellData,
                                field: column.field
                            });
                        }
                        else
                            cellData = String(cellData).replace(/"/g, '""');
                    }
                    else
                        cellData = '';

                    csv += '"' + cellData + '"';

                    if (i < (columns.length - 1)) {
                        csv += this.csvSeparator;
                    }
                }
            }
        });

        let blob = new Blob([csv], {
            type: 'text/csv;charset=utf-8;'
        });

        if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, this.exportFilename + '.csv');
        }
        else {
            let link = document.createElement("a");
            link.style.display = 'none';
            document.body.appendChild(link);
            if (link.download !== undefined) {
                link.setAttribute('href', URL.createObjectURL(blob));
                link.setAttribute('download', this.exportFilename + '.csv');
                link.click();
            }
            else {
                csv = 'data:text/csv;charset=utf-8,' + csv;
                window.open(encodeURI(csv));
            }
            document.body.removeChild(link);
        }
    }

    public resetScrollTop() {
        if (this.virtualScroll)
            this.scrollToVirtualIndex(0);
        else
            this.scrollTo({top: 0});
    }

    public scrollToVirtualIndex(index: number) {
        if (this.scrollableViewChild) {
            this.scrollableViewChild.scrollToVirtualIndex(index);
        }

        if (this.scrollableFrozenViewChild) {
            this.scrollableFrozenViewChild.scrollToVirtualIndex(index);
        }
    }

    public scrollTo(options) {
        if (this.scrollableViewChild) {
            this.scrollableViewChild.scrollTo(options);
        }

        if (this.scrollableFrozenViewChild) {
            this.scrollableFrozenViewChild.scrollTo(options);
        }
    }

    updateEditingCell(cell, data, field, index) {
        this.editingCell = cell;
        this.editingCellData = data;
        this.editingCellField = field;
        this.editingCellRowIndex = index;
        this.bindDocumentEditListener();
    }

    isEditingCellValid() {
        return (this.editingCell && DomHandler.find(this.editingCell, '.ng-invalid.ng-dirty').length === 0);
    }

    bindDocumentEditListener() {
        if (!this.documentEditListener) {
            this.documentEditListener = (event) => {
                if (this.editingCell && !this.editingCellClick && this.isEditingCellValid()) {
                    DomHandler.removeClass(this.editingCell, 'p-cell-editing');
                    this.editingCell = null;
                    this.onEditComplete.emit({ field: this.editingCellField, data: this.editingCellData, originalEvent: event, index: this.editingCellRowIndex });
                    this.editingCellField = null;
                    this.editingCellData = null;
                    this.editingCellRowIndex = null;
                    this.unbindDocumentEditListener();
                    this.cd.markForCheck();
                }

                this.editingCellClick = false;
            };

            document.addEventListener('click', this.documentEditListener);
        }
    }

    unbindDocumentEditListener() {
        if (this.documentEditListener) {
            document.removeEventListener('click', this.documentEditListener);
            this.documentEditListener = null;
        }
    }

    initRowEdit(rowData: any) {
        let dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));
        this.editingRowKeys[dataKeyValue] = true;
    }

    saveRowEdit(rowData: any, rowElement: HTMLTableRowElement) {
        if (DomHandler.find(rowElement, '.ng-invalid.ng-dirty').length === 0) {
            let dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));
            delete this.editingRowKeys[dataKeyValue];
        }
    }

    cancelRowEdit(rowData: any) {
        let dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));
        delete this.editingRowKeys[dataKeyValue];
    }

    toggleRow(rowData: any, event?: Event) {
        if (!this.dataKey) {
            throw new Error('dataKey must be defined to use row expansion');
        }

        let dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));

        if (this.expandedRowKeys[dataKeyValue] != null) {
            delete this.expandedRowKeys[dataKeyValue];
            this.onRowCollapse.emit({
                originalEvent: event,
                data: rowData
            });
        }
        else {
            if (this.rowExpandMode === 'single') {
                this.expandedRowKeys = {};
            }

            this.expandedRowKeys[dataKeyValue] = true;
            this.onRowExpand.emit({
                originalEvent: event,
                data: rowData
            });
        }

        if (event) {
            event.preventDefault();
        }

        if (this.isStateful()) {
            this.saveState();
        }
    }

    isRowExpanded(rowData: any): boolean {
        return this.expandedRowKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey))] === true;
    }

    isRowEditing(rowData: any): boolean {
        return this.editingRowKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey))] === true;
    }

    isSingleSelectionMode() {
        return this.selectionMode === 'single';
    }

    isMultipleSelectionMode() {
        return this.selectionMode === 'multiple';
    }

    onColumnResizeBegin(event) {
        let containerLeft = DomHandler.getOffset(this.containerViewChild.nativeElement).left;
        this.lastResizerHelperX = (event.pageX - containerLeft + this.containerViewChild.nativeElement.scrollLeft);
        this.onColumnResize(event);
        event.preventDefault();
    }

    onColumnResize(event) {
        let containerLeft = DomHandler.getOffset(this.containerViewChild.nativeElement).left;
        DomHandler.addClass(this.containerViewChild.nativeElement, 'p-unselectable-text');
        this.resizeHelperViewChild.nativeElement.style.height = this.containerViewChild.nativeElement.offsetHeight + 'px';
        this.resizeHelperViewChild.nativeElement.style.top = 0 + 'px';
        this.resizeHelperViewChild.nativeElement.style.left = (event.pageX - containerLeft + this.containerViewChild.nativeElement.scrollLeft) + 'px';

        this.resizeHelperViewChild.nativeElement.style.display = 'block';
    }

    onColumnResizeEnd(event, column) {
        let delta = this.resizeHelperViewChild.nativeElement.offsetLeft - this.lastResizerHelperX;
        let columnWidth = column.offsetWidth;
        let minWidth = parseInt(column.style.minWidth || 15);

        if (columnWidth + delta < minWidth) {
            delta = minWidth - columnWidth;
        }

        const newColumnWidth = columnWidth + delta;

        if (newColumnWidth >= minWidth) {
            if (this.columnResizeMode === 'fit') {
                let nextColumn = column.nextElementSibling;
                while (!nextColumn.offsetParent) {
                    nextColumn = nextColumn.nextElementSibling;
                }

                if (nextColumn) {
                    let nextColumnWidth = nextColumn.offsetWidth - delta;
                    let nextColumnMinWidth = nextColumn.style.minWidth || 15;

                    if (newColumnWidth > 15 && nextColumnWidth > parseInt(nextColumnMinWidth)) {
                        if (this.scrollable) {
                            let scrollableView = this.findParentScrollableView(column);
                            let scrollableBodyTable = DomHandler.findSingle(scrollableView, '.p-datatable-scrollable-body table') || DomHandler.findSingle(scrollableView, '.p-datatable-scrollable-body table');
                            let scrollableHeaderTable = DomHandler.findSingle(scrollableView, 'table.p-datatable-scrollable-header-table');
                            let scrollableFooterTable = DomHandler.findSingle(scrollableView, 'table.p-datatable-scrollable-footer-table');
                            let resizeColumnIndex = DomHandler.index(column);

                            this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                            this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                            this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                        }
                        else {
                            column.style.width = newColumnWidth + 'px';
                            if (nextColumn) {
                                nextColumn.style.width = nextColumnWidth + 'px';
                            }
                        }
                    }
                }
            }
            else if (this.columnResizeMode === 'expand') {
                if (newColumnWidth >= minWidth) {
                    if (this.scrollable) {
                        this.setScrollableItemsWidthOnExpandResize(column, newColumnWidth, delta);
                    }
                    else {
                        this.tableViewChild.nativeElement.style.width = this.tableViewChild.nativeElement.offsetWidth + delta + 'px';
                        column.style.width = newColumnWidth + 'px';
                        let containerWidth = this.tableViewChild.nativeElement.style.width;
                        this.containerViewChild.nativeElement.style.width = containerWidth + 'px';
                    }
                }
            }

            this.onColResize.emit({
                element: column,
                delta: delta
            });

            if (this.isStateful()) {
                this.saveState();
            }
        }

        this.resizeHelperViewChild.nativeElement.style.display = 'none';
        DomHandler.removeClass(this.containerViewChild.nativeElement, 'p-unselectable-text');
    }

    setScrollableItemsWidthOnExpandResize(column, newColumnWidth, delta) {
        let scrollableView = column ? this.findParentScrollableView(column) : this.containerViewChild.nativeElement;
        let scrollableBody = DomHandler.findSingle(scrollableView, '.p-datatable-scrollable-body') || DomHandler.findSingle(scrollableView, 'cdk-virtual-scroll-viewport');
        let scrollableHeader = DomHandler.findSingle(scrollableView, '.p-datatable-scrollable-header');
        let scrollableFooter = DomHandler.findSingle(scrollableView, '.p-datatable-scrollable-footer');
        let scrollableBodyTable = DomHandler.findSingle(scrollableBody, '.p-datatable-scrollable-body table') || DomHandler.findSingle(scrollableView, 'cdk-virtual-scroll-viewport table');
        let scrollableHeaderTable = DomHandler.findSingle(scrollableHeader, 'table.p-datatable-scrollable-header-table');
        let scrollableFooterTable = DomHandler.findSingle(scrollableFooter, 'table.p-datatable-scrollable-footer-table');

        const scrollableBodyTableWidth = column ? scrollableBodyTable.offsetWidth + delta : newColumnWidth;
        const scrollableHeaderTableWidth = column ? scrollableHeaderTable.offsetWidth + delta : newColumnWidth;
        const isContainerInViewport = this.containerViewChild.nativeElement.offsetWidth >= scrollableBodyTableWidth;

        let setWidth = (container, table, width, isContainerInViewport) => {
            if (container && table) {
                container.style.width = isContainerInViewport ? width + DomHandler.calculateScrollbarWidth(scrollableBody) + 'px' : 'auto'
                table.style.width = width + 'px';
            }
        };

        setWidth(scrollableBody, scrollableBodyTable, scrollableBodyTableWidth, isContainerInViewport);
        setWidth(scrollableHeader, scrollableHeaderTable, scrollableHeaderTableWidth, isContainerInViewport);
        setWidth(scrollableFooter, scrollableFooterTable, scrollableHeaderTableWidth, isContainerInViewport);

        if (column) {
            let resizeColumnIndex = DomHandler.index(column);

            this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, null);
            this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, null);
            this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, null);
        }
    }

    findParentScrollableView(column) {
        if (column) {
            let parent = column.parentElement;
            while (parent && !DomHandler.hasClass(parent, 'p-datatable-scrollable-view')) {
                parent = parent.parentElement;
            }

            return parent;
        }
        else {
            return null;
        }
    }

    resizeColGroup(table, resizeColumnIndex, newColumnWidth, nextColumnWidth) {
        if (table) {
            let colGroup = table.children[0].nodeName === 'COLGROUP' ? table.children[0] : null;

            if (colGroup) {
                let col = colGroup.children[resizeColumnIndex];
                let nextCol = col.nextElementSibling;
                col.style.width = newColumnWidth + 'px';

                if (nextCol && nextColumnWidth) {
                    nextCol.style.width = nextColumnWidth + 'px';
                }
            }
            else {
                throw "Scrollable tables require a colgroup to support resizable columns";
            }
        }
    }

    onColumnDragStart(event, columnElement) {
        this.reorderIconWidth = DomHandler.getHiddenElementOuterWidth(this.reorderIndicatorUpViewChild.nativeElement);
        this.reorderIconHeight = DomHandler.getHiddenElementOuterHeight(this.reorderIndicatorDownViewChild.nativeElement);
        this.draggedColumn = columnElement;
        event.dataTransfer.setData('text', 'b');    // For firefox
    }

    onColumnDragEnter(event, dropHeader) {
        if (this.reorderableColumns && this.draggedColumn && dropHeader) {
            event.preventDefault();
            let containerOffset = DomHandler.getOffset(this.containerViewChild.nativeElement);
            let dropHeaderOffset = DomHandler.getOffset(dropHeader);

            if (this.draggedColumn != dropHeader) {
                let dragIndex = DomHandler.indexWithinGroup(this.draggedColumn, 'preorderablecolumn');
                let dropIndex = DomHandler.indexWithinGroup(dropHeader, 'preorderablecolumn');
                let targetLeft = dropHeaderOffset.left - containerOffset.left;
                let targetTop = containerOffset.top - dropHeaderOffset.top;
                let columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;

                this.reorderIndicatorUpViewChild.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top - (this.reorderIconHeight - 1) + 'px';
                this.reorderIndicatorDownViewChild.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + 'px';

                if (event.pageX > columnCenter) {
                    this.reorderIndicatorUpViewChild.nativeElement.style.left = (targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.reorderIndicatorDownViewChild.nativeElement.style.left = (targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.dropPosition = 1;
                }
                else {
                    this.reorderIndicatorUpViewChild.nativeElement.style.left = (targetLeft - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.reorderIndicatorDownViewChild.nativeElement.style.left = (targetLeft - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.dropPosition = -1;
                }

                if ((dropIndex - dragIndex === 1 && this.dropPosition === -1) || (dropIndex - dragIndex === -1 && this.dropPosition === 1)) {
                    this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
                    this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
                }
                else {
                    this.reorderIndicatorUpViewChild.nativeElement.style.display = 'block';
                    this.reorderIndicatorDownViewChild.nativeElement.style.display = 'block';
                }
            }
            else {
                event.dataTransfer.dropEffect = 'none';
            }
        }
    }

    onColumnDragLeave(event) {
        if (this.reorderableColumns && this.draggedColumn) {
            event.preventDefault();
            this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
            this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
        }
    }

    onColumnDrop(event, dropColumn) {
        event.preventDefault();
        if (this.draggedColumn) {
            let dragIndex = DomHandler.indexWithinGroup(this.draggedColumn, 'preorderablecolumn');
            let dropIndex = DomHandler.indexWithinGroup(dropColumn, 'preorderablecolumn');
            let allowDrop = (dragIndex != dropIndex);
            if (allowDrop && ((dropIndex - dragIndex == 1 && this.dropPosition === -1) || (dragIndex - dropIndex == 1 && this.dropPosition === 1))) {
                allowDrop = false;
            }

            if (allowDrop && ((dropIndex < dragIndex && this.dropPosition === 1))) {
                dropIndex = dropIndex + 1;
            }

            if (allowDrop && ((dropIndex > dragIndex && this.dropPosition === -1))) {
                dropIndex = dropIndex - 1;
            }

            if (allowDrop) {
                ObjectUtils.reorderArray(this.columns, dragIndex, dropIndex);

                this.onColReorder.emit({
                    dragIndex: dragIndex,
                    dropIndex: dropIndex,
                    columns: this.columns
                });

                if (this.isStateful()) {
                    this.zone.runOutsideAngular(() => {
                        setTimeout(() => {
                            this.saveState();
                        });
                    });
                }
            }

            this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
            this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
            this.draggedColumn.draggable = false;
            this.draggedColumn = null;
            this.dropPosition = null;
        }
    }

    onRowDragStart(event, index) {
        this.rowDragging = true;
        this.draggedRowIndex = index;
        event.dataTransfer.setData('text', 'b');    // For firefox
    }

    onRowDragOver(event, index, rowElement) {
        if (this.rowDragging && this.draggedRowIndex !== index) {
            let rowY = DomHandler.getOffset(rowElement).top + DomHandler.getWindowScrollTop();
            let pageY = event.pageY;
            let rowMidY = rowY + DomHandler.getOuterHeight(rowElement) / 2;
            let prevRowElement = rowElement.previousElementSibling;

            if (pageY < rowMidY) {
                DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-bottom');

                this.droppedRowIndex = index;
                if (prevRowElement)
                    DomHandler.addClass(prevRowElement, 'p-datatable-dragpoint-bottom');
                else
                    DomHandler.addClass(rowElement, 'p-datatable-dragpoint-top');
            }
            else {
                if (prevRowElement)
                    DomHandler.removeClass(prevRowElement, 'p-datatable-dragpoint-bottom');
                else
                    DomHandler.addClass(rowElement, 'p-datatable-dragpoint-top');

                this.droppedRowIndex = index + 1;
                DomHandler.addClass(rowElement, 'p-datatable-dragpoint-bottom');
            }
        }
    }

    onRowDragLeave(event, rowElement) {
        let prevRowElement = rowElement.previousElementSibling;
        if (prevRowElement) {
            DomHandler.removeClass(prevRowElement, 'p-datatable-dragpoint-bottom');
        }

        DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-bottom');
        DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-top');
    }

    onRowDragEnd(event) {
        this.rowDragging = false;
        this.draggedRowIndex = null;
        this.droppedRowIndex = null;
    }

    onRowDrop(event, rowElement) {
        if (this.droppedRowIndex != null) {
            let dropIndex = (this.draggedRowIndex > this.droppedRowIndex) ? this.droppedRowIndex : (this.droppedRowIndex === 0) ? 0 : this.droppedRowIndex - 1;
            ObjectUtils.reorderArray(this.value, this.draggedRowIndex, dropIndex);

            this.onRowReorder.emit({
                dragIndex: this.draggedRowIndex,
                dropIndex: dropIndex
            });
        }
        //cleanup
        this.onRowDragLeave(event, rowElement);
        this.onRowDragEnd(event);
    }

    isEmpty() {
        let data = this.filteredValue||this.value;
        return data == null || data.length == 0;
    }

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

    getStorage() {
        switch(this.stateStorage) {
            case 'local':
                return window.localStorage;

            case 'session':
                return window.sessionStorage;

            default:
                throw new Error(this.stateStorage + ' is not a valid value for the state storage, supported values are "local" and "session".');
        }
    }

    isStateful() {
        return this.stateKey != null;
    }

    saveState() {
        const storage = this.getStorage();
        let state: TableState = {};

        if (this.paginator) {
            state.first = this.first;
            state.rows = this.rows;
        }

        if (this.sortField) {
            state.sortField = this.sortField;
            state.sortOrder = this.sortOrder;
        }

        if (this.multiSortMeta) {
            state.multiSortMeta = this.multiSortMeta;
        }

        if (this.hasFilter()) {
            state.filters = this.filters;
        }

        if (this.resizableColumns) {
            this.saveColumnWidths(state);
        }

        if (this.reorderableColumns) {
            this.saveColumnOrder(state);
        }

        if (this.selection) {
            state.selection = this.selection;
        }

        if (Object.keys(this.expandedRowKeys).length) {
            state.expandedRowKeys = this.expandedRowKeys;
        }

        if (Object.keys(state).length) {
            storage.setItem(this.stateKey, JSON.stringify(state));
        }

        this.onStateSave.emit(state);
    }

    clearState() {
        const storage = this.getStorage();

        if (this.stateKey) {
            storage.removeItem(this.stateKey);
        }
    }

    restoreState() {
        const storage = this.getStorage();
        const stateString = storage.getItem(this.stateKey);

        if (stateString) {
            let state: TableState = JSON.parse(stateString);

            if (this.paginator) {
                if (this.first !== undefined) {
                    this.first = state.first;
                    this.firstChange.emit(this.first);
                }

                if (this.rows !== undefined) {
                    this.rows = state.rows;
                    this.rowsChange.emit(this.rows);
                }
            }

            if (state.sortField) {
                this.restoringSort = true;
                this._sortField = state.sortField;
                this._sortOrder = state.sortOrder;
            }

            if (state.multiSortMeta) {
                this.restoringSort = true;
                this._multiSortMeta = state.multiSortMeta;
            }

            if (state.filters) {
                this.restoringFilter = true;
                this.filters = state.filters;
            }

            if (this.resizableColumns) {
                this.columnWidthsState = state.columnWidths;
                this.tableWidthState = state.tableWidth;
            }

            if (state.expandedRowKeys) {
                this.expandedRowKeys = state.expandedRowKeys;
            }

            if (state.selection) {
                Promise.resolve(null).then(() => this.selectionChange.emit(state.selection));
            }

            this.stateRestored = true;

            this.onStateRestore.emit(state);
        }
    }

    saveColumnWidths(state) {
        let widths = [];
        let headers = DomHandler.find(this.containerViewChild.nativeElement, '.p-datatable-thead > tr:first-child > th');
        headers.map(header => widths.push(DomHandler.getOuterWidth(header)));
        state.columnWidths = widths.join(',');

        if (this.columnResizeMode === 'expand') {
            state.tableWidth = this.scrollable ? DomHandler.findSingle(this.containerViewChild.nativeElement, '.p-datatable-scrollable-header-table').style.width :
                                                DomHandler.getOuterWidth(this.tableViewChild.nativeElement) + 'px';
        }
    }

    restoreColumnWidths() {
        if (this.columnWidthsState) {
            let widths = this.columnWidthsState.split(',');

            if (this.columnResizeMode === 'expand' && this.tableWidthState) {
                if (this.scrollable) {
                    this.setScrollableItemsWidthOnExpandResize(null, this.tableWidthState, 0);
                }
                else {
                    this.tableViewChild.nativeElement.style.width = this.tableWidthState;
                    this.containerViewChild.nativeElement.style.width = this.tableWidthState;
                }
            }

            if (this.scrollable) {
                let headerCols = DomHandler.find(this.containerViewChild.nativeElement, '.p-datatable-scrollable-header-table > colgroup > col');
                let bodyCols = DomHandler.find(this.containerViewChild.nativeElement, '.p-datatable-scrollable-body table > colgroup > col');

                headerCols.map((col, index) => col.style.width = widths[index] + 'px');
                bodyCols.map((col, index) => col.style.width = widths[index] + 'px');
            }
            else {
                let headers = DomHandler.find(this.tableViewChild.nativeElement, '.p-datatable-thead > tr:first-child > th');
                headers.map((header, index) => header.style.width = widths[index] + 'px');
            }
        }
    }

    saveColumnOrder(state) {
        if (this.columns) {
            let columnOrder: string[] = [];
            this.columns.map(column => {
                columnOrder.push(column.field||column.key)
            });

            state.columnOrder = columnOrder;
        }
    }

    restoreColumnOrder() {
        const storage = this.getStorage();
        const stateString = storage.getItem(this.stateKey);
        if (stateString) {
            let state: TableState = JSON.parse(stateString);
            let columnOrder = state.columnOrder;
            if (columnOrder) {
                let reorderedColumns = [];
                columnOrder.map(key => reorderedColumns.push(this.findColumnByKey(key)));
                this.columnOrderStateRestored = true;
                this.columns = reorderedColumns;
            }
        }
    }

    findColumnByKey(key) {
        if (this.columns) {
            for (let col of this.columns) {
                if (col.key === key || col.field === key)
                    return col;
                else
                    continue;
            }
        }
        else {
            return null;
        }
    }

    ngOnDestroy() {
        this.unbindDocumentEditListener();
        this.editingCell = null;
        this.initialized = null;
    }
}

@Component({
    selector: '[pTableBody]',
    template: `
        <ng-container *ngIf="!dt.expandedRowTemplate && !dt.virtualScroll">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="(dt.paginator && !dt.lazy) ? ((dt.filteredValue||dt.value) | slice:dt.first:(dt.first + dt.rows)) : (dt.filteredValue||dt.value)" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container *ngTemplateOutlet="template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, editing: (dt.editMode === 'row' && dt.isRowEditing(rowData))}"></ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="!dt.expandedRowTemplate && dt.virtualScroll">
            <ng-template cdkVirtualFor let-rowData let-rowIndex="index" [cdkVirtualForOf]="dt.filteredValue||dt.value" [cdkVirtualForTrackBy]="dt.rowTrackBy" [cdkVirtualForTemplateCacheSize]="0">
                <ng-container *ngTemplateOutlet="rowData ? template: dt.loadingBodyTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, editing: (dt.editMode === 'row' && dt.isRowEditing(rowData))}"></ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.expandedRowTemplate">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="(dt.paginator && !dt.lazy) ? ((dt.filteredValue||dt.value) | slice:dt.first:(dt.first + dt.rows)) : (dt.filteredValue||dt.value)" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container *ngTemplateOutlet="template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, expanded: dt.isRowExpanded(rowData), editing: (dt.editMode === 'row' && dt.isRowEditing(rowData))}"></ng-container>
                <ng-container *ngIf="dt.isRowExpanded(rowData)">
                    <ng-container *ngTemplateOutlet="dt.expandedRowTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns}"></ng-container>
                </ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.loading">
            <ng-container *ngTemplateOutlet="dt.loadingBodyTemplate; context: {$implicit: columns, frozen: frozen}"></ng-container>
        </ng-container>
        <ng-container *ngIf="dt.isEmpty() && !dt.loading">
            <ng-container *ngTemplateOutlet="dt.emptyMessageTemplate; context: {$implicit: columns, frozen: frozen}"></ng-container>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None
})
export class TableBody implements OnDestroy {

    @Input("pTableBody") columns: any[];

    @Input("pTableBodyTemplate") template: TemplateRef<any>;

    @Input() frozen: boolean;

    subscription: Subscription;

    constructor(public dt: Table, public tableService: TableService, public cd: ChangeDetectorRef) {
        this.subscription = this.dt.tableService.valueSource$.subscribe(() => {
            if (this.dt.virtualScroll) {
                this.cd.detectChanges();
            }
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

@Component({
    selector: '[pScrollableView]',
    template: `
        <div #scrollHeader class="p-datatable-scrollable-header">
            <div #scrollHeaderBox class="p-datatable-scrollable-header-box">
                <table class="p-datatable-scrollable-header-table" [ngClass]="dt.tableStyleClass" [ngStyle]="dt.tableStyle">
                    <ng-container *ngTemplateOutlet="frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}"></ng-container>
                    <thead class="p-datatable-thead">
                        <ng-container *ngTemplateOutlet="frozen ? dt.frozenHeaderTemplate||dt.headerTemplate : dt.headerTemplate; context {$implicit: columns}"></ng-container>
                    </thead>
                    <tbody class="p-datatable-tbody">
                        <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="dt.frozenValue" [ngForTrackBy]="dt.rowTrackBy">
                            <ng-container *ngTemplateOutlet="dt.frozenRowsTemplate; context: {$implicit: rowData, rowIndex: rowIndex, columns: columns}"></ng-container>
                        </ng-template>
                    </tbody>
                </table>
            </div>
        </div>
        <ng-container *ngIf="!dt.virtualScroll; else virtualScrollTemplate">
            <div #scrollBody class="p-datatable-scrollable-body" [ngStyle]="{'max-height': dt.scrollHeight !== 'flex' ? scrollHeight : undefined, 'overflow-y': !frozen && dt.scrollHeight ? 'scroll' : undefined}">
                <table #scrollTable [class]="dt.tableStyleClass" [ngStyle]="dt.tableStyle">
                    <ng-container *ngTemplateOutlet="frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}"></ng-container>
                    <tbody class="p-datatable-tbody" [pTableBody]="columns" [pTableBodyTemplate]="frozen ? dt.frozenBodyTemplate||dt.bodyTemplate : dt.bodyTemplate" [frozen]="frozen"></tbody>
                </table>
                <div #scrollableAligner style="background-color:transparent" *ngIf="frozen"></div>
            </div>
        </ng-container>
        <ng-template #virtualScrollTemplate>
            <cdk-virtual-scroll-viewport [itemSize]="dt.virtualRowHeight" tabindex="0" [style.height]="dt.scrollHeight !== 'flex' ? scrollHeight : undefined"
                    [minBufferPx]="dt.minBufferPx" [maxBufferPx]="dt.maxBufferPx" (scrolledIndexChange)="onScrollIndexChange($event)" class="p-datatable-virtual-scrollable-body">
                <table #scrollTable [class]="dt.tableStyleClass" [ngStyle]="dt.tableStyle">
                    <ng-container *ngTemplateOutlet="frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}"></ng-container>
                    <tbody class="p-datatable-tbody" [pTableBody]="columns" [pTableBodyTemplate]="frozen ? dt.frozenBodyTemplate||dt.bodyTemplate : dt.bodyTemplate" [frozen]="frozen"></tbody>
                </table>
                <div #scrollableAligner style="background-color:transparent" *ngIf="frozen"></div>
            </cdk-virtual-scroll-viewport>
        </ng-template>
        <div #scrollFooter class="p-datatable-scrollable-footer">
            <div #scrollFooterBox class="p-datatable-scrollable-footer-box">
                <table class="p-datatable-scrollable-footer-table" [ngClass]="dt.tableStyleClass" [ngStyle]="dt.tableStyle">
                    <ng-container *ngTemplateOutlet="frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}"></ng-container>
                    <tfoot class="p-datatable-tfoot">
                        <ng-container *ngTemplateOutlet="frozen ? dt.frozenFooterTemplate||dt.footerTemplate : dt.footerTemplate; context {$implicit: columns}"></ng-container>
                    </tfoot>
                </table>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None
})
export class ScrollableView implements AfterViewInit,OnDestroy {

    @Input("pScrollableView") columns: any[];

    @Input() frozen: boolean;

    @ViewChild('scrollHeader') scrollHeaderViewChild: ElementRef;

    @ViewChild('scrollHeaderBox') scrollHeaderBoxViewChild: ElementRef;

    @ViewChild('scrollBody') scrollBodyViewChild: ElementRef;

    @ViewChild('scrollTable') scrollTableViewChild: ElementRef;

    @ViewChild('scrollFooter') scrollFooterViewChild: ElementRef;

    @ViewChild('scrollFooterBox') scrollFooterBoxViewChild: ElementRef;

    @ViewChild('scrollableAligner') scrollableAlignerViewChild: ElementRef;

    @ViewChild(CdkVirtualScrollViewport) virtualScrollBody: CdkVirtualScrollViewport;

    headerScrollListener: any;

    bodyScrollListener: any;

    footerScrollListener: any;

    frozenSiblingBody: HTMLDivElement;

    preventBodyScrollPropagation: boolean;

    loadedPages: number[] = [];

    _scrollHeight: string;

    @Input() get scrollHeight(): string {
        return this._scrollHeight;
    }
    set scrollHeight(val: string) {
        this._scrollHeight = val;
        if (val != null && (val.includes('%') || val.includes('calc'))) {
            console.log('Percentage scroll height calculation is removed in favor of the more performant CSS based flex mode, use scrollHeight="flex" instead.')
        }

        if (this.dt.virtualScroll && this.virtualScrollBody) {
            this.virtualScrollBody.checkViewportSize();
        }
    }

    constructor(public dt: Table, public el: ElementRef, public zone: NgZone) {}

    ngAfterViewInit() {
        if (!this.frozen) {
            if (this.dt.frozenColumns || this.dt.frozenBodyTemplate) {
                DomHandler.addClass(this.el.nativeElement, 'p-datatable-unfrozen-view');
            }

            let frozenView = this.el.nativeElement.previousElementSibling;
            if (frozenView) {
                if (this.dt.virtualScroll)
                    this.frozenSiblingBody = DomHandler.findSingle(frozenView, '.p-datatable-virtual-scrollable-body');
                else
                    this.frozenSiblingBody = DomHandler.findSingle(frozenView, '.p-datatable-scrollable-body');
            }

            let scrollBarWidth = DomHandler.calculateScrollbarWidth();
            this.scrollHeaderBoxViewChild.nativeElement.style.paddingRight = scrollBarWidth + 'px';

            if (this.scrollFooterBoxViewChild && this.scrollFooterBoxViewChild.nativeElement) {
                this.scrollFooterBoxViewChild.nativeElement.style.paddingRight = scrollBarWidth + 'px';
            }
        }
        else {
            if (this.scrollableAlignerViewChild && this.scrollableAlignerViewChild.nativeElement) {
                this.scrollableAlignerViewChild.nativeElement.style.height = DomHandler.calculateScrollbarHeight() + 'px';
            }
        }

        this.bindEvents();
    }

    bindEvents() {
        this.zone.runOutsideAngular(() => {
            if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
                this.headerScrollListener = this.onHeaderScroll.bind(this);
                this.scrollHeaderViewChild.nativeElement.addEventListener('scroll', this.headerScrollListener);
            }

            if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
                this.footerScrollListener = this.onFooterScroll.bind(this);
                this.scrollFooterViewChild.nativeElement.addEventListener('scroll', this.footerScrollListener);
            }

            if (!this.frozen) {
                this.bodyScrollListener = this.onBodyScroll.bind(this);

                if (this.dt.virtualScroll)
                    this.virtualScrollBody.getElementRef().nativeElement.addEventListener('scroll', this.bodyScrollListener);
                else
                    this.scrollBodyViewChild.nativeElement.addEventListener('scroll', this.bodyScrollListener);
            }
        });
    }

    unbindEvents() {
        if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
            this.scrollHeaderViewChild.nativeElement.removeEventListener('scroll', this.headerScrollListener);
        }

        if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
            this.scrollFooterViewChild.nativeElement.removeEventListener('scroll', this.footerScrollListener);
        }

        if (this.scrollBodyViewChild && this.scrollBodyViewChild.nativeElement) {
            this.scrollBodyViewChild.nativeElement.removeEventListener('scroll', this.bodyScrollListener);
        }

        if (this.virtualScrollBody && this.virtualScrollBody.getElementRef()) {
            this.virtualScrollBody.getElementRef().nativeElement.removeEventListener('scroll', this.bodyScrollListener);
        }
    }

    onHeaderScroll() {
        const scrollLeft = this.scrollHeaderViewChild.nativeElement.scrollLeft;

        this.scrollBodyViewChild.nativeElement.scrollLeft = scrollLeft;

        if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
            this.scrollFooterViewChild.nativeElement.scrollLeft = scrollLeft;
        }

        this.preventBodyScrollPropagation = true;
    }

    onFooterScroll() {
        const scrollLeft = this.scrollFooterViewChild.nativeElement.scrollLeft;
        this.scrollBodyViewChild.nativeElement.scrollLeft = scrollLeft;

        if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
            this.scrollHeaderViewChild.nativeElement.scrollLeft = scrollLeft;
        }

        this.preventBodyScrollPropagation = true;
    }

    onBodyScroll(event) {
        if (this.preventBodyScrollPropagation) {
            this.preventBodyScrollPropagation = false;
            return;
        }

        if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
            this.scrollHeaderBoxViewChild.nativeElement.style.marginLeft = -1 * event.target.scrollLeft + 'px';
        }

        if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
            this.scrollFooterBoxViewChild.nativeElement.style.marginLeft = -1 * event.target.scrollLeft + 'px';
        }

        if (this.frozenSiblingBody) {
            this.frozenSiblingBody.scrollTop = event.target.scrollTop;
        }
    }

    onScrollIndexChange(index: number) {
        if (this.dt.lazy) {
            let pageRange = this.createPageRange(Math.floor(index / this.dt.rows));
            pageRange.forEach(page => this.loadPage(page));
        }
    }

    createPageRange(page: number) {
        let range: number[] = [];

        if (page !== 0) {
            range.push(page - 1);
        }
        range.push(page);
        if (page !== (this.getPageCount() - 1)) {
            range.push(page + 1);
        }

        return range;
    }

    loadPage(page: number) {
        if (!this.loadedPages.includes(page)) {
            this.dt.onLazyLoad.emit({
                first: this.dt.rows * page,
                rows: this.dt.rows,
                sortField: this.dt.sortField,
                sortOrder: this.dt.sortOrder,
                filters: this.dt.filters,
                globalFilter: this.dt.filters && this.dt.filters['global'] ? (<FilterMetadata> this.dt.filters['global']).value : null,
                multiSortMeta: this.dt.multiSortMeta
            });
            this.loadedPages.push(page);
        }
    }

    clearCache() {
        this.loadedPages = [];
    }

    getPageCount() {
        let dataToRender = this.dt.filteredValue || this.dt.value;
        let dataLength = dataToRender ? dataToRender.length: 0;
        return Math.ceil(dataLength / this.dt.rows);
    }

    scrollToVirtualIndex(index: number): void {
        if (this.virtualScrollBody) {
            this.virtualScrollBody.scrollToIndex(index);
        }
    }

    scrollTo(options): void {
        if (this.virtualScrollBody) {
            this.virtualScrollBody.scrollTo(options);
        }
        else {
            if (this.scrollBodyViewChild.nativeElement.scrollTo) {
                this.scrollBodyViewChild.nativeElement.scrollTo(options);
            }
            else {
                this.scrollBodyViewChild.nativeElement.scrollLeft = options.left;
                this.scrollBodyViewChild.nativeElement.scrollTop = options.top;
            }
        }
    }

    ngOnDestroy() {
        this.unbindEvents();
        this.frozenSiblingBody = null;
    }
}

@Directive({
    selector: '[pSortableColumn]',
    host: {
        '[class.p-sortable-column]': 'isEnabled()',
        '[class.p-highlight]': 'sorted',
        '[attr.tabindex]': 'isEnabled() ? "0" : null',
        '[attr.role]': '"columnheader"',
        '[attr.aria-sort]': 'sortOrder'
    }
})
export class SortableColumn implements OnInit, OnDestroy {

    @Input("pSortableColumn") field: string;

    @Input() pSortableColumnDisabled: boolean;

    sorted: boolean;

    sortOrder: string;

    subscription: Subscription;

    constructor(public dt: Table) {
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.sortSource$.subscribe(sortMeta => {
                this.updateSortState();
            });
        }
    }

    ngOnInit() {
        if (this.isEnabled()) {
            this.updateSortState();
        }
    }

    updateSortState() {
        this.sorted = this.dt.isSorted(this.field);
        this.sortOrder = this.sorted ? (this.dt.sortOrder === 1 ? 'ascending' : 'descending') : 'none';
    }

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
        if (this.isEnabled()) {
            this.updateSortState();
            this.dt.sort({
                originalEvent: event,
                field: this.field
            });

            DomHandler.clearSelection();
        }
    }

    @HostListener('keydown.enter', ['$event'])
    onEnterKey(event: MouseEvent) {
        this.onClick(event);
    }

    isEnabled() {
        return this.pSortableColumnDisabled !== true;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}


@Component({
    selector: 'p-sortIcon',
    template: `
        <i class="p-sortable-column-icon pi pi-fw" [ngClass]="{'pi-sort-amount-up-alt': sortOrder === 1, 'pi-sort-amount-down': sortOrder === -1, 'pi-sort-alt': sortOrder === 0}"></i>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SortIcon implements OnInit, OnDestroy {

    @Input() field: string;

    subscription: Subscription;

    sortOrder: number;

    constructor(public dt: Table, public cd: ChangeDetectorRef) {
        this.subscription = this.dt.tableService.sortSource$.subscribe(sortMeta => {
            this.updateSortState();
        });
    }

    ngOnInit() {
        this.updateSortState();
    }

    onClick(event){
        event.preventDefault();
    }

    updateSortState() {
        if (this.dt.sortMode === 'single') {
            this.sortOrder = this.dt.isSorted(this.field) ? this.dt.sortOrder : 0;
        }
        else if (this.dt.sortMode === 'multiple') {
            let sortMeta = this.dt.getSortMeta(this.field);
            this.sortOrder = sortMeta ? sortMeta.order: 0;
        }

        this.cd.markForCheck();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

@Directive({
    selector: '[pSelectableRow]',
    host: {
        '[class.p-selectable-row]': 'isEnabled()',
        '[class.p-highlight]': 'selected',
        '[attr.tabindex]': 'isEnabled() ? 0 : undefined'
    }
})
export class SelectableRow implements OnInit, OnDestroy {

    @Input("pSelectableRow") data: any;

    @Input("pSelectableRowIndex") index: number;

    @Input() pSelectableRowDisabled: boolean;

    selected: boolean;

    subscription: Subscription;

    constructor(public dt: Table, public tableService: TableService) {
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.selectionSource$.subscribe(() => {
                this.selected = this.dt.isSelected(this.data);
            });
        }
    }

    ngOnInit() {
        if (this.isEnabled()) {
            this.selected = this.dt.isSelected(this.data);
        }
    }

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        if (this.isEnabled()) {
            this.dt.handleRowClick({
                originalEvent: event,
                rowData: this.data,
                rowIndex: this.index
            });
        }
    }

    @HostListener('touchend', ['$event'])
    onTouchEnd(event: Event) {
        if (this.isEnabled()) {
            this.dt.handleRowTouchEnd(event);
        }
    }

    @HostListener('keydown.arrowdown', ['$event'])
    onArrowDownKeyDown(event: KeyboardEvent) {
        if (!this.isEnabled()) {
            return;
        }

        const row = <HTMLTableRowElement>event.currentTarget;
        const nextRow = this.findNextSelectableRow(row);

        if (nextRow) {
            nextRow.focus();
        }

        event.preventDefault();
    }

    @HostListener('keydown.arrowup', ['$event'])
    onArrowUpKeyDown(event: KeyboardEvent) {
        if (!this.isEnabled()) {
            return;
        }

        const row = <HTMLTableRowElement>event.currentTarget;
        const prevRow = this.findPrevSelectableRow(row);

        if (prevRow) {
            prevRow.focus();
        }

        event.preventDefault();
    }

    @HostListener('keydown.enter', ['$event'])
    @HostListener('keydown.shift.enter', ['$event'])
    @HostListener('keydown.meta.enter', ['$event'])
    onEnterKeyDown(event: KeyboardEvent) {
        if (!this.isEnabled()) {
            return;
        }

        this.dt.handleRowClick({
            originalEvent: event,
            rowData: this.data,
            rowIndex: this.index
        });
    }

    findNextSelectableRow(row: HTMLTableRowElement): HTMLTableRowElement {
        let nextRow = <HTMLTableRowElement> row.nextElementSibling;
        if (nextRow) {
            if (DomHandler.hasClass(nextRow, 'p-selectable-row'))
                return nextRow;
            else
                return this.findNextSelectableRow(nextRow);
        }
        else {
            return null;
        }
    }

    findPrevSelectableRow(row: HTMLTableRowElement): HTMLTableRowElement {
        let prevRow = <HTMLTableRowElement> row.previousElementSibling;
        if (prevRow) {
            if (DomHandler.hasClass(prevRow, 'p-selectable-row'))
                return prevRow;
            else
                return this.findPrevSelectableRow(prevRow);
        }
        else {
            return null;
        }
    }

    isEnabled() {
        return this.pSelectableRowDisabled !== true;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}

@Directive({
    selector: '[pSelectableRowDblClick]',
    host: {
        '[class.p-selectable-row]': 'isEnabled()',
        '[class.p-highlight]': 'selected'
    }
})
export class SelectableRowDblClick implements OnInit, OnDestroy {

    @Input("pSelectableRowDblClick") data: any;

    @Input("pSelectableRowIndex") index: number;

    @Input() pSelectableRowDisabled: boolean;

    selected: boolean;

    subscription: Subscription;

    constructor(public dt: Table, public tableService: TableService) {
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.selectionSource$.subscribe(() => {
                this.selected = this.dt.isSelected(this.data);
            });
        }
    }

    ngOnInit() {
        if (this.isEnabled()) {
            this.selected = this.dt.isSelected(this.data);
        }
    }

    @HostListener('dblclick', ['$event'])
    onClick(event: Event) {
        if (this.isEnabled()) {
            this.dt.handleRowClick({
                originalEvent: event,
                rowData: this.data,
                rowIndex: this.index
            });
        }
    }

    isEnabled() {
        return this.pSelectableRowDisabled !== true;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}

@Directive({
    selector: '[pContextMenuRow]',
    host: {
        '[class.p-highlight-contextmenu]': 'selected',
        '[attr.tabindex]': 'isEnabled() ? 0 : undefined'
    }
})
export class ContextMenuRow {

    @Input("pContextMenuRow") data: any;

    @Input("pContextMenuRowIndex") index: number;

    @Input() pContextMenuRowDisabled: boolean;

    selected: boolean;

    subscription: Subscription;

    constructor(public dt: Table, public tableService: TableService, private el: ElementRef) {
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.contextMenuSource$.subscribe((data) => {
                this.selected = this.dt.equals(this.data, data);
            });
        }
    }

    @HostListener('contextmenu', ['$event'])
    onContextMenu(event: Event) {
        if (this.isEnabled()) {
            this.dt.handleRowRightClick({
                originalEvent: event,
                rowData: this.data,
                rowIndex: this.index
            });

            this.el.nativeElement.focus();
            event.preventDefault();
        }
    }

    isEnabled() {
        return this.pContextMenuRowDisabled !== true;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}

@Directive({
    selector: '[pRowToggler]'
})
export class RowToggler {

    @Input('pRowToggler') data: any;

    @Input() pRowTogglerDisabled: boolean;

    constructor(public dt: Table) { }

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        if (this.isEnabled()) {
            this.dt.toggleRow(this.data, event);
            event.preventDefault();
        }
    }

    isEnabled() {
        return this.pRowTogglerDisabled !== true;
    }
}

@Directive({
    selector: '[pResizableColumn]'
})
export class ResizableColumn implements AfterViewInit, OnDestroy {

    @Input() pResizableColumnDisabled: boolean;

    resizer: HTMLSpanElement;

    resizerMouseDownListener: any;

    documentMouseMoveListener: any;

    documentMouseUpListener: any;

    constructor(public dt: Table, public el: ElementRef, public zone: NgZone) { }

    ngAfterViewInit() {
        if (this.isEnabled()) {
            DomHandler.addClass(this.el.nativeElement, 'p-resizable-column');
            this.resizer = document.createElement('span');
            this.resizer.className = 'p-column-resizer';
            this.el.nativeElement.appendChild(this.resizer);

            this.zone.runOutsideAngular(() => {
                this.resizerMouseDownListener = this.onMouseDown.bind(this);
                this.resizer.addEventListener('mousedown', this.resizerMouseDownListener);
            });
        }
    }

    bindDocumentEvents() {
        this.zone.runOutsideAngular(() => {
            this.documentMouseMoveListener = this.onDocumentMouseMove.bind(this);
            document.addEventListener('mousemove', this.documentMouseMoveListener);

            this.documentMouseUpListener = this.onDocumentMouseUp.bind(this);
            document.addEventListener('mouseup', this.documentMouseUpListener);
        });
    }

    unbindDocumentEvents() {
        if (this.documentMouseMoveListener) {
            document.removeEventListener('mousemove', this.documentMouseMoveListener);
            this.documentMouseMoveListener = null;
        }

        if (this.documentMouseUpListener) {
            document.removeEventListener('mouseup', this.documentMouseUpListener);
            this.documentMouseUpListener = null;
        }
    }

    onMouseDown(event: MouseEvent) {
        if (event.which === 1) {
            this.dt.onColumnResizeBegin(event);
            this.bindDocumentEvents();
        }
    }

    onDocumentMouseMove(event: MouseEvent) {
        this.dt.onColumnResize(event);
    }

    onDocumentMouseUp(event: MouseEvent) {
        this.dt.onColumnResizeEnd(event, this.el.nativeElement);
        this.unbindDocumentEvents();
    }

    isEnabled() {
        return this.pResizableColumnDisabled !== true;
    }

    ngOnDestroy() {
        if (this.resizerMouseDownListener) {
            this.resizer.removeEventListener('mousedown', this.resizerMouseDownListener);
        }

        this.unbindDocumentEvents();
    }
}

@Directive({
    selector: '[pReorderableColumn]'
})
export class ReorderableColumn implements AfterViewInit, OnDestroy {

    @Input() pReorderableColumnDisabled: boolean;

    dragStartListener: any;

    dragOverListener: any;

    dragEnterListener: any;

    dragLeaveListener: any;

    mouseDownListener: any;

    constructor(public dt: Table, public el: ElementRef, public zone: NgZone) { }

    ngAfterViewInit() {
        if (this.isEnabled()) {
            this.bindEvents();
        }
    }

    bindEvents() {
        this.zone.runOutsideAngular(() => {
            this.mouseDownListener = this.onMouseDown.bind(this);
            this.el.nativeElement.addEventListener('mousedown', this.mouseDownListener);

            this.dragStartListener = this.onDragStart.bind(this);
            this.el.nativeElement.addEventListener('dragstart', this.dragStartListener);

            this.dragOverListener = this.onDragEnter.bind(this);
            this.el.nativeElement.addEventListener('dragover', this.dragOverListener);

            this.dragEnterListener = this.onDragEnter.bind(this);
            this.el.nativeElement.addEventListener('dragenter', this.dragEnterListener);

            this.dragLeaveListener = this.onDragLeave.bind(this);
            this.el.nativeElement.addEventListener('dragleave', this.dragLeaveListener);
        });
    }

    unbindEvents() {
        if (this.mouseDownListener) {
            document.removeEventListener('mousedown', this.mouseDownListener);
            this.mouseDownListener = null;
        }

        if (this.dragOverListener) {
            document.removeEventListener('dragover', this.dragOverListener);
            this.dragOverListener = null;
        }

        if (this.dragEnterListener) {
            document.removeEventListener('dragenter', this.dragEnterListener);
            this.dragEnterListener = null;
        }

        if (this.dragEnterListener) {
            document.removeEventListener('dragenter', this.dragEnterListener);
            this.dragEnterListener = null;
        }

        if (this.dragLeaveListener) {
            document.removeEventListener('dragleave', this.dragLeaveListener);
            this.dragLeaveListener = null;
        }
    }

    onMouseDown(event) {
        if (event.target.nodeName === 'INPUT' || event.target.nodeName === 'TEXTAREA' || DomHandler.hasClass(event.target, 'p-column-resizer'))
            this.el.nativeElement.draggable = false;
        else
            this.el.nativeElement.draggable = true;
    }

    onDragStart(event) {
        this.dt.onColumnDragStart(event, this.el.nativeElement);
    }

    onDragOver(event) {
        event.preventDefault();
    }

    onDragEnter(event) {
        this.dt.onColumnDragEnter(event, this.el.nativeElement);
    }

    onDragLeave(event) {
        this.dt.onColumnDragLeave(event);
    }

    @HostListener('drop', ['$event'])
    onDrop(event) {
        if (this.isEnabled()) {
            this.dt.onColumnDrop(event, this.el.nativeElement);
        }
    }

    isEnabled() {
        return this.pReorderableColumnDisabled !== true;
    }

    ngOnDestroy() {
        this.unbindEvents();
    }

}

@Directive({
    selector: '[pEditableColumn]'
})
export class EditableColumn implements AfterViewInit {

    @Input("pEditableColumn") data: any;

    @Input("pEditableColumnField") field: any;

    @Input("pEditableColumnRowIndex") rowIndex: number;

    @Input() pEditableColumnDisabled: boolean;

    @Input() pFocusCellSelector: string;

    constructor(public dt: Table, public el: ElementRef, public zone: NgZone) {}

    ngAfterViewInit() {
        if (this.isEnabled()) {
            DomHandler.addClass(this.el.nativeElement, 'p-editable-column');
        }
    }

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
        if (this.isEnabled()) {
            this.dt.editingCellClick = true;

            if (this.dt.editingCell) {
                if (this.dt.editingCell !== this.el.nativeElement) {
                    if (!this.dt.isEditingCellValid()) {
                        return;
                    }

                    this.closeEditingCell(true, event);
                    this.openCell();
                }
            }
            else {
                this.openCell();
            }
        }
    }

    openCell() {
        this.dt.updateEditingCell(this.el.nativeElement, this.data, this.field, this.rowIndex);
        DomHandler.addClass(this.el.nativeElement, 'p-cell-editing');
        this.dt.onEditInit.emit({field: this.field, data: this.data, index: this.rowIndex});
        this.zone.runOutsideAngular(() => {
            setTimeout(() => {
                let focusCellSelector = this.pFocusCellSelector || 'input, textarea, select';
                let focusableElement = DomHandler.findSingle(this.el.nativeElement, focusCellSelector);

                if (focusableElement) {
                    focusableElement.focus();
                }
            }, 50);
        });
    }

    closeEditingCell(completed, event) {
        if (completed)
            this.dt.onEditComplete.emit({field: this.dt.editingCellField, data: this.dt.editingCellData, originalEvent: event, index: this.rowIndex});
        else
            this.dt.onEditCancel.emit({field: this.dt.editingCellField, data: this.dt.editingCellData, originalEvent: event, index: this.rowIndex});

        DomHandler.removeClass(this.dt.editingCell, 'p-cell-editing');
        this.dt.editingCell = null;
        this.dt.editingCellData = null;
        this.dt.editingCellField = null;
        this.dt.unbindDocumentEditListener();
    }

    @HostListener('keydown.enter', ['$event'])
    onEnterKeyDown(event: KeyboardEvent) {
        if (this.isEnabled()) {
            if (this.dt.isEditingCellValid()) {
                this.closeEditingCell(true, event);
            }

            event.preventDefault();
        }
    }

    @HostListener('keydown.escape', ['$event'])
    onEscapeKeyDown(event: KeyboardEvent) {
        if (this.isEnabled()) {
            if (this.dt.isEditingCellValid()) {
                this.closeEditingCell(false, event);
            }

            event.preventDefault();
        }
    }

    @HostListener('keydown.tab', ['$event'])
    @HostListener('keydown.shift.tab', ['$event'])
    @HostListener('keydown.meta.tab', ['$event'])
    onShiftKeyDown(event: KeyboardEvent) {
        if (this.isEnabled()) {
            if (event.shiftKey)
                this.moveToPreviousCell(event);
            else{
                this.moveToNextCell(event);
            }
        }
    }

    findCell(element) {
        if (element) {
            let cell = element;
            while (cell && !DomHandler.hasClass(cell, 'p-cell-editing')) {
                cell = cell.parentElement;
            }

            return cell;
        }
        else {
            return null;
        }
    }

    moveToPreviousCell(event: KeyboardEvent) {
        let currentCell = this.findCell(event.target);
        if (currentCell) {
            let targetCell = this.findPreviousEditableColumn(currentCell);

            if (targetCell) {
                if (this.dt.isEditingCellValid()) {
                    this.closeEditingCell(true, event);
                }

                DomHandler.invokeElementMethod(event.target, 'blur');
                DomHandler.invokeElementMethod(targetCell, 'click');
                event.preventDefault();
            }
        }
    }

    moveToNextCell(event: KeyboardEvent) {
        let currentCell = this.findCell(event.target);
        if (currentCell) {
            let targetCell = this.findNextEditableColumn(currentCell);

            if (targetCell) {
                if (this.dt.isEditingCellValid()) {
                    this.closeEditingCell(true, event);
                }

                DomHandler.invokeElementMethod(event.target, 'blur');
                DomHandler.invokeElementMethod(targetCell, 'click');
                event.preventDefault();
            }
        }
    }

    findPreviousEditableColumn(cell: Element) {
        let prevCell = cell.previousElementSibling;

        if (!prevCell) {
            let previousRow = cell.parentElement.previousElementSibling;
            if (previousRow) {
                prevCell = previousRow.lastElementChild;
            }
        }

        if (prevCell) {
            if (DomHandler.hasClass(prevCell, 'p-editable-column'))
                return prevCell;
            else
                return this.findPreviousEditableColumn(prevCell);
        }
        else {
            return null;
        }
    }

    findNextEditableColumn(cell: Element) {
        let nextCell = cell.nextElementSibling;

        if (!nextCell) {
            let nextRow = cell.parentElement.nextElementSibling;
            if (nextRow) {
                nextCell = nextRow.firstElementChild;
            }
        }

        if (nextCell) {
            if (DomHandler.hasClass(nextCell, 'p-editable-column'))
                return nextCell;
            else
                return this.findNextEditableColumn(nextCell);
        }
        else {
            return null;
        }
    }

    isEnabled() {
        return this.pEditableColumnDisabled !== true;
    }

}

@Directive({
    selector: '[pEditableRow]'
})
export class EditableRow {

    @Input("pEditableRow") data: any;

    @Input() pEditableRowDisabled: boolean;

    constructor(public el: ElementRef) {}

    isEnabled() {
        return this.pEditableRowDisabled !== true;
    }

}

@Directive({
    selector: '[pInitEditableRow]'
})
export class InitEditableRow {

    constructor(public dt: Table, public editableRow: EditableRow) {}

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        this.dt.initRowEdit(this.editableRow.data);
        event.preventDefault();
    }

}

@Directive({
    selector: '[pSaveEditableRow]'
})
export class SaveEditableRow {

    constructor(public dt: Table, public editableRow: EditableRow) {}

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        this.dt.saveRowEdit(this.editableRow.data, this.editableRow.el.nativeElement);
        event.preventDefault();
    }
}

@Directive({
    selector: '[pCancelEditableRow]'
})
export class CancelEditableRow {

    constructor(public dt: Table, public editableRow: EditableRow) {}

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        this.dt.cancelRowEdit(this.editableRow.data);
        event.preventDefault();
    }
}

@Component({
    selector: 'p-cellEditor',
    template: `
        <ng-container *ngIf="editing">
            <ng-container *ngTemplateOutlet="inputTemplate"></ng-container>
        </ng-container>
        <ng-container *ngIf="!editing">
            <ng-container *ngTemplateOutlet="outputTemplate"></ng-container>
        </ng-container>
    `,
    encapsulation: ViewEncapsulation.None
})
export class CellEditor implements AfterContentInit {

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;

    inputTemplate: TemplateRef<any>;

    outputTemplate: TemplateRef<any>;

    constructor(public dt: Table, @Optional() public editableColumn: EditableColumn, @Optional() public editableRow: EditableRow) { }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'input':
                    this.inputTemplate = item.template;
                    break;

                case 'output':
                    this.outputTemplate = item.template;
                    break;
            }
        });
    }

    get editing(): boolean {
        return (this.dt.editingCell && this.editableColumn && this.dt.editingCell === this.editableColumn.el.nativeElement) ||
                (this.editableRow && this.dt.editMode === 'row' && this.dt.isRowEditing(this.editableRow.data));
    }

}

@Component({
    selector: 'p-tableRadioButton',
    template: `
        <div class="p-radiobutton p-component" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input type="radio" [attr.id]="inputId" [attr.name]="name" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()"
                [disabled]="disabled" [attr.aria-label]="ariaLabel">
            </div>
            <div #box [ngClass]="{'p-radiobutton-box p-component':true,
                'p-highlight':checked, 'p-disabled':disabled}" role="radio" [attr.aria-checked]="checked">
                <div class="p-radiobutton-icon"></div>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TableRadioButton  {

    @Input() disabled: boolean;

    @Input() value: any;

    @Input() index: number;

    @Input() inputId: string;

    @Input() name: string;

    @Input() ariaLabel: string;

    @ViewChild('box') boxViewChild: ElementRef;

    checked: boolean;

    subscription: Subscription;

    constructor(public dt: Table, public tableService: TableService, public cd: ChangeDetectorRef) {
        this.subscription = this.dt.tableService.selectionSource$.subscribe(() => {
            this.checked = this.dt.isSelected(this.value);
            this.cd.markForCheck();
        });
    }

    ngOnInit() {
        this.checked = this.dt.isSelected(this.value);
    }

    onClick(event: Event) {
        if (!this.disabled) {
            this.dt.toggleRowWithRadio({
                originalEvent: event,
                rowIndex: this.index
            }, this.value);
        }
        DomHandler.clearSelection();
    }

    onFocus() {
        DomHandler.addClass(this.boxViewChild.nativeElement, 'p-focus');
    }

    onBlur() {
        DomHandler.removeClass(this.boxViewChild.nativeElement, 'p-focus');
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}

@Component({
    selector: 'p-tableCheckbox',
    template: `
        <div class="p-checkbox p-component" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input type="checkbox" [attr.id]="inputId" [attr.name]="name" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()" [disabled]="disabled"
                [attr.required]="required" [attr.aria-label]="ariaLabel">
            </div>
            <div #box [ngClass]="{'p-checkbox-box p-component':true,
                'p-highlight':checked, 'p-disabled':disabled}" role="checkbox" [attr.aria-checked]="checked">
                <span class="p-checkbox-icon" [ngClass]="{'pi pi-check':checked}"></span>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TableCheckbox  {

    @Input() disabled: boolean;

    @Input() value: any;

    @Input() index: number;

    @Input() inputId: string;

    @Input() name: string;

    @Input() required: boolean;

    @Input() ariaLabel: string;

    @ViewChild('box') boxViewChild: ElementRef;

    checked: boolean;

    subscription: Subscription;

    constructor(public dt: Table, public tableService: TableService, public cd: ChangeDetectorRef) {
        this.subscription = this.dt.tableService.selectionSource$.subscribe(() => {
            this.checked = this.dt.isSelected(this.value);
            this.cd.markForCheck();
        });
    }

    ngOnInit() {
        this.checked = this.dt.isSelected(this.value);
    }

    onClick(event: Event) {
        if (!this.disabled) {
            this.dt.toggleRowWithCheckbox({
                originalEvent: event,
                rowIndex: this.index
            }, this.value);
        }
        DomHandler.clearSelection();
    }

    onFocus() {
        DomHandler.addClass(this.boxViewChild.nativeElement, 'p-focus');
    }

    onBlur() {
        DomHandler.removeClass(this.boxViewChild.nativeElement, 'p-focus');
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}

@Component({
    selector: 'p-tableHeaderCheckbox',
    template: `
        <div class="p-checkbox p-component" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input #cb type="checkbox" [attr.id]="inputId" [attr.name]="name" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()"
                [disabled]="isDisabled()" [attr.aria-label]="ariaLabel">
            </div>
            <div #box [ngClass]="{'p-checkbox-box':true,
                'p-highlight':checked, 'p-disabled': isDisabled()}" role="checkbox" [attr.aria-checked]="checked">
                <span class="p-checkbox-icon" [ngClass]="{'pi pi-check':checked}"></span>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TableHeaderCheckbox  {

    @ViewChild('box') boxViewChild: ElementRef;

    @Input() disabled: boolean;

    @Input() inputId: string;

    @Input() name: string;

    @Input() ariaLabel: string;

    checked: boolean;

    selectionChangeSubscription: Subscription;

    valueChangeSubscription: Subscription;

    constructor(public dt: Table, public tableService: TableService, public cd: ChangeDetectorRef) {
        this.valueChangeSubscription = this.dt.tableService.valueSource$.subscribe(() => {
            this.checked = this.updateCheckedState();
        });

        this.selectionChangeSubscription = this.dt.tableService.selectionSource$.subscribe(() => {
            this.checked = this.updateCheckedState();
        });
    }

    ngOnInit() {
        this.checked = this.updateCheckedState();
    }

    onClick(event: Event) {
        if (!this.disabled) {
            if (this.dt.value && this.dt.value.length > 0) {
                this.dt.toggleRowsWithCheckbox(event, !this.checked);
            }
        }

        DomHandler.clearSelection();
    }

    onFocus() {
        DomHandler.addClass(this.boxViewChild.nativeElement, 'p-focus');
    }

    onBlur() {
        DomHandler.removeClass(this.boxViewChild.nativeElement, 'p-focus');
    }

    isDisabled() {
        return this.disabled || !this.dt.value || !this.dt.value.length;
    }

    ngOnDestroy() {
        if (this.selectionChangeSubscription) {
            this.selectionChangeSubscription.unsubscribe();
        }

        if (this.valueChangeSubscription) {
            this.valueChangeSubscription.unsubscribe();
        }
    }

    updateCheckedState() {
        this.cd.markForCheck();

        if (this.dt.filteredValue) {
            const val = this.dt.filteredValue;
            return (val && val.length > 0 && this.dt.selection && this.dt.selection.length > 0 && this.isAllFilteredValuesChecked());
        }
        else {
            const val = this.dt.value;
            return (val && val.length > 0 && this.dt.selection && this.dt.selection.length > 0 && this.dt.selection.length === val.length);
        }
    }

    isAllFilteredValuesChecked() {
        if (!this.dt.filteredValue) {
            return false;
        }
        else {
            for (let rowData of this.dt.filteredValue) {
                if (!this.dt.isSelected(rowData)) {
                    return false;
                }
            }
            return true;
        }
    }

}

@Directive({
    selector: '[pReorderableRowHandle]'
})
export class ReorderableRowHandle implements AfterViewInit {

    @Input("pReorderableRowHandle") index: number;

    constructor(public el: ElementRef) {}

    ngAfterViewInit() {
        DomHandler.addClass(this.el.nativeElement, 'p-datatable-reorderablerow-handle');
    }
}

@Directive({
    selector: '[pReorderableRow]'
})
export class ReorderableRow implements AfterViewInit {

    @Input("pReorderableRow") index: number;

    @Input() pReorderableRowDisabled: boolean;

    mouseDownListener: any;

    dragStartListener: any;

    dragEndListener: any;

    dragOverListener: any;

    dragLeaveListener: any;

    dropListener: any;

    constructor(public dt: Table, public el: ElementRef, public zone: NgZone) {}

    ngAfterViewInit() {
        if (this.isEnabled()) {
            this.el.nativeElement.droppable = true;
            this.bindEvents();
        }
    }

    bindEvents() {
        this.zone.runOutsideAngular(() => {
            this.mouseDownListener = this.onMouseDown.bind(this);
            this.el.nativeElement.addEventListener('mousedown', this.mouseDownListener);

            this.dragStartListener = this.onDragStart.bind(this);
            this.el.nativeElement.addEventListener('dragstart', this.dragStartListener);

            this.dragEndListener = this.onDragEnd.bind(this);
            this.el.nativeElement.addEventListener('dragend', this.dragEndListener);

            this.dragOverListener = this.onDragOver.bind(this);
            this.el.nativeElement.addEventListener('dragover', this.dragOverListener);

            this.dragLeaveListener = this.onDragLeave.bind(this);
            this.el.nativeElement.addEventListener('dragleave', this.dragLeaveListener);
        });
    }

    unbindEvents() {
        if (this.mouseDownListener) {
            document.removeEventListener('mousedown', this.mouseDownListener);
            this.mouseDownListener = null;
        }

        if (this.dragStartListener) {
            document.removeEventListener('dragstart', this.dragStartListener);
            this.dragStartListener = null;
        }

        if (this.dragEndListener) {
            document.removeEventListener('dragend', this.dragEndListener);
            this.dragEndListener = null;
        }

        if (this.dragOverListener) {
            document.removeEventListener('dragover', this.dragOverListener);
            this.dragOverListener = null;
        }

        if (this.dragLeaveListener) {
            document.removeEventListener('dragleave', this.dragLeaveListener);
            this.dragLeaveListener = null;
        }
    }

    onMouseDown(event) {
        if (DomHandler.hasClass(event.target, 'p-datatable-reorderablerow-handle'))
            this.el.nativeElement.draggable = true;
        else
            this.el.nativeElement.draggable = false;
    }

    onDragStart(event) {
        this.dt.onRowDragStart(event, this.index);
    }

    onDragEnd(event) {
        this.dt.onRowDragEnd(event);
        this.el.nativeElement.draggable = false;
    }

    onDragOver(event) {
        this.dt.onRowDragOver(event, this.index, this.el.nativeElement);
        event.preventDefault();
    }

    onDragLeave(event) {
        this.dt.onRowDragLeave(event, this.el.nativeElement);
    }

    isEnabled() {
        return this.pReorderableRowDisabled !== true;
    }

    @HostListener('drop', ['$event'])
    onDrop(event) {
        if (this.isEnabled() && this.dt.rowDragging) {
            this.dt.onRowDrop(event, this.el.nativeElement);
        }

        event.preventDefault()
    }
}

@Component({
    selector: 'p-columnFilterFormElement',
    template: `
        <ng-container *ngIf="filterTemplate; else builtInElement">
            <ng-container *ngTemplateOutlet="filterTemplate; context: {$implicit: filterConstraint.value, filterCallback: filterCallback}"></ng-container>
        </ng-container>
        <ng-template #builtInElement>
            <ng-container [ngSwitch]="type">
                <input *ngSwitchCase="'text'" type="text" pInputText [value]="filterConstraint?.value" (input)="onModelChange($event.target.value)"
                    (keydown.enter)="onTextInputEnterKeyDown($event)" [attr.placeholder]="placeholder">
                <p-inputNumber *ngSwitchCase="'numeric'" [ngModel]="filterConstraint?.value" (ngModelChange)="onModelChange($event)" (onKeyDown)="onNumericInputKeyDown($event)" [showButtons]="true" [attr.placeholder]="placeholder"
                    [minFractionDigits]="minFractionDigits" [maxFractionDigits]="maxFractionDigits" [prefix]="prefix" [suffix]="suffix"
                    [mode]="currency ? 'currency' : 'decimal'" [locale]="locale" [localeMatcher]="localeMatcher" [currency]="currency" [currencyDisplay]="currencyDisplay" [useGrouping]="useGrouping"></p-inputNumber>
                <p-triStateCheckbox *ngSwitchCase="'boolean'" [ngModel]="filterConstraint?.value" (ngModelChange)="onModelChange($event)"></p-triStateCheckbox>
                <p-calendar *ngSwitchCase="'date'" [ngModel]="filterConstraint?.value" (ngModelChange)="onModelChange($event)"></p-calendar>
            </ng-container>
        </ng-template>
    `,
    encapsulation: ViewEncapsulation.None
})
export class ColumnFilterFormElement implements OnInit {
    
    @Input() field: string;

    @Input() type: string;

    @Input() filterConstraint: FilterMetadata;

    @Input() filterTemplate: TemplateRef<any>;

    @Input() placeholder: string;

    @Input() minFractionDigits: number
    
    @Input() maxFractionDigits: number;

    @Input() prefix: string;

    @Input() suffix: string;

    @Input() locale: string;

    @Input() localeMatcher: string;

    @Input() currency: string;

    @Input() currencyDisplay: string;

    @Input() useGrouping: boolean = true;

    filterCallback: Function;

    constructor(public dt: Table) {}

    ngOnInit() {
        this.filterCallback = value => {
            this.filterConstraint.value = value;
            this.dt._filter();
        };
    }

    onModelChange(value: any) {
        this.filterConstraint.value = value;

        if (this.type === 'boolean') {
            this.dt._filter();
        }
    }

    onTextInputEnterKeyDown(event: KeyboardEvent) {
        this.dt._filter();
        event.preventDefault();
    }

    onNumericInputKeyDown(event: KeyboardEvent) {
        if (event.which === 13) {
            this.dt._filter();
            event.preventDefault();
        }
    }
}

@Component({
    selector: 'p-columnFilter',
    template: `
        <div class="p-column-filter" [ngClass]="{'p-column-filter-row': display === 'row', 'p-column-filter-menu': display === 'menu'}">
            <p-columnFilterFormElement *ngIf="display === 'row'" [type]="type" [field]="field" [filterConstraint]="dt.filters[field]" [filterTemplate]="filterTemplate" [placeholder]="placeholder" [minFractionDigits]="minFractionDigits" [maxFractionDigits]="maxFractionDigits" [prefix]="prefix" [suffix]="suffix"
                                    [locale]="locale"  [localeMatcher]="localeMatcher" [currency]="currency" [currencyDisplay]="currencyDisplay" [useGrouping]="useGrouping"></p-columnFilterFormElement>
            <button #icon *ngIf="showMenuButton" type="button" class="p-column-filter-menu-button p-link" aria-haspopup="true" [attr.aria-expanded]="overlayVisible"
                [ngClass]="{'p-column-filter-menu-button-open': overlayVisible, 'p-column-filter-menu-button-active': hasFilter()}" 
                (click)="toggleMenu()" (keydown)="onToggleButtonKeyDown($event)"><span class="pi pi-filter"></span></button>
            <button #icon *ngIf="showMenuButton && display === 'row'" [ngClass]="{'p-hidden-space': !hasRowFilter()}" type="button" class="p-column-filter-clear-button p-link" (click)="clearFilter()"><span class="pi pi-times"></span></button>
            <div *ngIf="showMenu && overlayVisible" [ngClass]="{'p-column-filter-overlay p-component p-fluid': true, 'p-column-filter-overlay-menu': display === 'menu'}" 
                [@overlayAnimation]="'visible'" (@overlayAnimation.start)="onOverlayAnimationStart($event)" (keydown.escape)="onEscape()">
                <ng-container *ngTemplateOutlet="headerTemplate; context: {$implicit: field}"></ng-container>
                <ul *ngIf="display === 'row'; else menu" class="p-column-filter-row-items">
                    <li class="p-column-filter-row-item" *ngFor="let matchMode of matchModes; let i = index;" (click)="onRowMatchModeChange(matchMode.value)" (keydown)="onRowMatchModeKeyDown($event, matchMode.value)"
                        [ngClass]="{'p-highlight': isRowMatchModeSelected(matchMode.value)}" [attr.tabindex]="i === 0 ? '0' : null">{{matchMode.label}}</li>
                    <li class="p-column-filter-separator"></li>
                    <li class="p-column-filter-row-item" (click)="onRowClearItemClick()" (keydown)="onRowMatchModeKeyDown($event)">No filter</li>
                </ul>
                <ng-template #menu>
                    <div class="p-column-filter-operator" *ngIf="isShowOperator">
                        <p-dropdown [options]="operatorOptions" [ngModel]="operator" (ngModelChange)="onOperatorChange($event)" styleClass="p-column-filter-operator-dropdown"></p-dropdown>
                    </div>
                    <div class="p-column-filter-constraints">
                        <div *ngFor="let fieldConstraint of fieldConstraints; let i = index" class="p-column-filter-constraint">
                            <p-dropdown  *ngIf="showMatchModes && matchModes" [options]="matchModes" [ngModel]="fieldConstraint.matchMode" (ngModelChange)="onMenuMatchModeChange($event, fieldConstraint)" styleClass="p-column-filter-matchmode-dropdown"></p-dropdown>
                            <p-columnFilterFormElement [type]="type" [field]="field" [filterConstraint]="fieldConstraint" [filterTemplate]="filterTemplate" [placeholder]="placeholder"
                            [minFractionDigits]="minFractionDigits" [maxFractionDigits]="maxFractionDigits" [prefix]="prefix" [suffix]="suffix"
                            [locale]="locale"  [localeMatcher]="localeMatcher" [currency]="currency" [currencyDisplay]="currencyDisplay" [useGrouping]="useGrouping"></p-columnFilterFormElement>
                            <button *ngIf="showRemoveIcon" type="button" pButton icon="pi pi-trash" class="p-column-filter-remove-button p-button-text p-button-danger p-button-sm" (click)="removeConstraint(fieldConstraint)" pRipple [label]="removeRuleButtonLabel"></button>
                        </div>
                    </div>
                    <div class="p-column-filter-add-rule" *ngIf="isShowAddConstraint">
                        <button type="button" pButton [label]="addRuleButtonLabel" icon="pi pi-plus" class="p-column-filter-add-button p-button-text p-button-sm" (click)="addConstraint()" pRipple></button>
                    </div>
                    <div class="p-column-filter-buttonbar">
                        <button type="button" pButton class="p-button-outlined" (click)="clearFilter()" [label]="clearButtonLabel" pRipple></button>
                        <button type="button" pButton (click)="applyFilter()" [label]="applyButtonLabel" pRipple></button>
                    </div>
                </ng-template>
                <ng-container *ngTemplateOutlet="footerTemplate; context: {$implicit: field}"></ng-container>
            </div>
        </div>
    `,
    animations: [
        trigger('overlayAnimation', [
            transition(':enter', [
                style({opacity: 0, transform: 'scaleY(0.8)'}),
                animate('.12s cubic-bezier(0, 0, 0.2, 1)')
            ]),
            transition(':leave', [
                animate('.1s linear', style({ opacity: 0 }))
            ])
        ])
    ],
    encapsulation: ViewEncapsulation.None
})
export class ColumnFilter implements AfterContentInit {

    @Input() field: string;

    @Input() type: string = 'text';

    @Input() display: string = 'row';

    @Input() showMenu: boolean = true;

    @Input() matchMode: string;

    @Input() operator: string = FilterOperator.AND;

    @Input() showOperator: boolean = true;

    @Input() showClearButton: boolean = true;

    @Input() showApplyButton: boolean = true;

    @Input() showMatchModes: boolean = true;

    @Input() showAddButton: boolean = true;

    @Input() placeholder: string;

    @Input() matchModeOptions: SelectItem[];

    @Input() maxConstraints: number = 2;

    @Input() minFractionDigits: number;
    
    @Input() maxFractionDigits: number;

    @Input() prefix: string;

    @Input() suffix: string;

    @Input() locale: string;

    @Input() localeMatcher: string;

    @Input() currency: string;

    @Input() currencyDisplay: string;

    @Input() useGrouping: boolean = true;

    @ViewChild('icon') icon: ElementRef;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    constructor(public el: ElementRef, public dt: Table, public renderer: Renderer2, public config: PrimeNGConfig) {}

    headerTemplate: TemplateRef<any>;

    filterTemplate: TemplateRef<any>;

    footerTemplate: TemplateRef<any>;

    operatorOptions: any[];

    overlayVisible: boolean;

    overlay: HTMLElement;

    scrollHandler: any;

    documentClickListener: any;

    documentResizeListener: any;

    matchModes: SelectItem[];

    translationSubscription: Subscription;

    ngOnInit() {
        if (!this.dt.filters[this.field]) {
            this.initFieldFilterConstraint();
        }

        this.translationSubscription = this.config.translationObserver.subscribe(() => {
            this.generateMatchModeOptions();
            this.generateOperatorOptions();
        });

        this.generateMatchModeOptions();
        this.generateOperatorOptions();
    }

    generateMatchModeOptions() {
        this.matchModes = this.matchModeOptions || 
        this.config.filterMatchModeOptions[this.type]?.map(key => {
            return {label: this.config.getTranslation(key), value: key}
        });
    }

    generateOperatorOptions() {
        this.operatorOptions = [
            {label: this.config.getTranslation(TranslationKeys.MATCH_ALL), value: FilterOperator.AND},
            {label: this.config.getTranslation(TranslationKeys.MATCH_ANY), value: FilterOperator.OR}
        ];
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                break;

                case 'filter':
                    this.filterTemplate = item.template;
                break;
                
                case 'footer':
                    this.footerTemplate = item.template;
                break;

                default:
                    this.filterTemplate = item.template;
                break;
            }
        });
    }

    initFieldFilterConstraint() {
        let defaultMatchMode = this.getDefaultMatchMode();
        this.dt.filters[this.field] = this.display == 'row' ? {value: null, matchMode: defaultMatchMode} : [{value: null, matchMode: defaultMatchMode, operator: this.operator}];
    }

    onMenuMatchModeChange(value: any, filterMeta: FilterMetadata) {
        filterMeta.matchMode = value;

        if (!this.showApplyButton) {
            this.dt._filter();
        }
    }

    onRowMatchModeChange(matchMode: string) {
        (<FilterMetadata> this.dt.filters[this.field]).matchMode = matchMode;
        this.dt._filter();
        this.hide();
    }
    
    onRowMatchModeKeyDown(event: KeyboardEvent, matchMode: string) {
        let item = <HTMLLIElement> event.target;

        switch(event.key) {            
            case 'ArrowDown':
                var nextItem = this.findNextItem(item);
                if (nextItem) {
                    item.removeAttribute('tabindex');
                    nextItem.tabIndex = '0';
                    nextItem.focus();
                }

                event.preventDefault();
            break;

            case 'ArrowUp':
                var prevItem = this.findPrevItem(item);
                if (prevItem) {
                    item.removeAttribute('tabindex');
                    prevItem.tabIndex = '0';
                    prevItem.focus();
                }

                event.preventDefault();
            break;

            case 'Enter':
                this.onRowMatchModeChange(matchMode);
                event.preventDefault();
            break;
        }
    }

    onRowClearItemClick() {
        this.clearFilter();
        this.hide();
    }

    isRowMatchModeSelected(matchMode: string) {
        return (<FilterMetadata> this.dt.filters[this.field]).matchMode === matchMode;
    }

    addConstraint() {
        (<FilterMetadata[]> this.dt.filters[this.field]).push({value: null, matchMode: this.getDefaultMatchMode(), operator: this.getDefaultOperator()});
        this.dt._filter();
    }

    removeConstraint(filterMeta: FilterMetadata) {
        this.dt.filters[this.field] = (<FilterMetadata[]> this.dt.filters[this.field]).filter(meta => meta !== filterMeta);
        this.dt._filter();
    }

    onOperatorChange(value) {
        (<FilterMetadata[]> this.dt.filters[this.field]).forEach(filterMeta => {
            filterMeta.operator = value;
        });

        if (!this.showApplyButton) {
            this.dt._filter();
        }
    }

    toggleMenu() {
        this.overlayVisible = !this.overlayVisible;
    }

    onToggleButtonKeyDown(event: KeyboardEvent) {
        switch(event.key) {
            case 'Escape':
            case 'Tab':
                this.overlayVisible = false;
            break;
            
            case 'ArrowDown':
                if (this.overlayVisible) {
                    let focusable = DomHandler.getFocusableElements(this.overlay);
                    if (focusable) {
                        focusable[0].focus();
                    }
                    event.preventDefault();
                }
                else if (event.altKey) {
                    this.overlayVisible = true;
                    event.preventDefault();
                }
            break;
        }
    }

    onEscape() {
        this.overlayVisible = false;
        this.icon.nativeElement.focus();
    }

    findNextItem(item: HTMLLIElement) {
        let nextItem = <HTMLLIElement> item.nextElementSibling;

        if (nextItem)
            return DomHandler.hasClass(nextItem, 'p-column-filter-separator')  ? this.findNextItem(nextItem) : nextItem;
        else
            return item.parentElement.firstElementChild;
    }

    findPrevItem(item: HTMLLIElement) {
        let prevItem = <HTMLLIElement> item.previousElementSibling;

        if (prevItem)
            return DomHandler.hasClass(prevItem, 'p-column-filter-separator')  ? this.findPrevItem(prevItem) : prevItem;
        else
        return item.parentElement.lastElementChild;
    }

    onOverlayAnimationStart(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
                this.overlay = event.element;
                
                document.body.appendChild(this.overlay);
                this.overlay.style.zIndex = String(++DomHandler.zindex);
                DomHandler.absolutePosition(this.overlay, this.icon.nativeElement)
                this.bindDocumentClickListener();
                this.bindDocumentResizeListener();
                this.bindScrollListener();
            break;

            case 'void':
                this.onOverlayHide();
            break;
        }
    }

    getDefaultMatchMode(): string {
        if (this.matchMode) {
            return this.matchMode;
        }
        else {
            if (this.type === 'text')
                return FilterMatchMode.STARTS_WITH;
            else if (this.type === 'numeric')
                return FilterMatchMode.EQUALS;
            else if (this.type === 'date')
                return FilterMatchMode.EQUALS;
            else
                return FilterMatchMode.CONTAINS;
        }
    }

    getDefaultOperator(): string {
        return this.dt.filters ? (<FilterMetadata[]> this.dt.filters[this.field])[0].operator: this.operator;
    }

    hasRowFilter() {
        return this.dt.filters[this.field] && !this.dt.isFilterBlank((<FilterMetadata>this.dt.filters[this.field]).value);
    }

    get fieldConstraints(): FilterMetadata[] {
        return this.dt.filters ? <FilterMetadata[]> this.dt.filters[this.field] : null;
    }

    get showRemoveIcon(): boolean {
        return this.fieldConstraints ? this.fieldConstraints.length > 1 : false;
    }

    get showMenuButton(): boolean {
        return this.showMenu && (this.display === 'row' ? this.type !== 'boolean': true);
    }

    get isShowOperator(): boolean {
        return this.showOperator && this.type !== 'boolean';
    }

    get isShowAddConstraint(): boolean {
        return this.showAddButton && this.type !== 'boolean' && (this.fieldConstraints && this.fieldConstraints.length < this.maxConstraints);
    }

    get applyButtonLabel(): string {
        return this.config.getTranslation(TranslationKeys.APPLY);
    }

    get clearButtonLabel(): string {
        return this.config.getTranslation(TranslationKeys.CLEAR);
    }

    get addRuleButtonLabel(): string {
        return this.config.getTranslation(TranslationKeys.ADD_RULE);
    }

    get removeRuleButtonLabel(): string {
        return this.config.getTranslation(TranslationKeys.REMOVE_RULE);
    }

    hasFilter(): boolean {
        let fieldFilter = this.dt.filters[this.field];
        if (fieldFilter) {
            if (Array.isArray(fieldFilter))
                return !this.dt.isFilterBlank((<FilterMetadata[]> fieldFilter)[0].value); 
            else
                return !this.dt.isFilterBlank(fieldFilter.value);
        }

        return false;
    }

    isOutsideClicked(event): boolean {
        return !(this.overlay.isSameNode(event.target) || this.overlay.contains(event.target) 
            || this.icon.nativeElement.isSameNode(event.target) || this.icon.nativeElement.contains(event.target)
            || DomHandler.hasClass(event.target, 'p-column-filter-add-button') || DomHandler.hasClass(event.target.parentElement, 'p-column-filter-add-button')
            || DomHandler.hasClass(event.target, 'p-column-filter-remove-button') || DomHandler.hasClass(event.target.parentElement, 'p-column-filter-remove-button'));
    }

    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

            this.documentClickListener = this.renderer.listen(documentTarget, 'click', event => {
                if (this.isOutsideClicked(event)) {
                    this.hide();
                }
            });
        }
    }

    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }

    bindDocumentResizeListener() {
        this.documentResizeListener = () => this.hide();
        window.addEventListener('resize', this.documentResizeListener);
    }

    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }

    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.icon.nativeElement, () => {
                if (this.overlayVisible) {
                    this.hide();
                }
            });
        }

        this.scrollHandler.bindScrollListener();
    }

    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }

    hide() {
        this.overlayVisible = false;
    }

    onOverlayHide() {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
        this.overlay = null;
    }

    clearFilter() {
        this.initFieldFilterConstraint();
        this.dt._filter();
    }

    applyFilter() {
        this.dt._filter();
        this.hide();
    }

    ngOnDestroy() {
        if (this.overlay) {
            this.el.nativeElement.appendChild(this.overlay);
            this.onOverlayHide();
        }

        if (this.translationSubscription) {
            this.translationSubscription.unsubscribe();
        }
    }
}

@NgModule({
    imports: [CommonModule,PaginatorModule,InputTextModule,DropdownModule,ScrollingModule,FormsModule,ButtonModule,SelectButtonModule,CalendarModule,InputNumberModule,TriStateCheckboxModule],
    exports: [Table,SharedModule,SortableColumn,SelectableRow,RowToggler,ContextMenuRow,ResizableColumn,ReorderableColumn,EditableColumn,CellEditor,SortIcon,
            TableRadioButton,TableCheckbox,TableHeaderCheckbox,ReorderableRowHandle,ReorderableRow,SelectableRowDblClick,EditableRow,InitEditableRow,SaveEditableRow,CancelEditableRow,ScrollingModule,ColumnFilter],
    declarations: [Table,SortableColumn,SelectableRow,RowToggler,ContextMenuRow,ResizableColumn,ReorderableColumn,EditableColumn,CellEditor,TableBody,ScrollableView,SortIcon,
            TableRadioButton,TableCheckbox,TableHeaderCheckbox,ReorderableRowHandle,ReorderableRow,SelectableRowDblClick,EditableRow,InitEditableRow,SaveEditableRow,CancelEditableRow,ColumnFilter,ColumnFilterFormElement]
})
export class TableModule { }