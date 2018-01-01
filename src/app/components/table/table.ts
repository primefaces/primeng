import { NgModule, Component, HostListener, OnInit, AfterViewInit, Directive, AfterContentInit, Input, Output, EventEmitter, ElementRef, ContentChildren, TemplateRef, QueryList, ViewChild, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Column, PrimeTemplate, SharedModule } from '../common/shared';
import { PaginatorModule } from '../paginator/paginator';
import { DomHandler } from '../dom/domhandler';
import { ObjectUtils } from '../utils/objectutils';
import { SortMeta } from '../common/sortmeta';
import { FilterMetadata } from '../common/filtermetadata';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'p-table',
    template: `
        <div #container [ngStyle]="style" [class]="styleClass" 
            [ngClass]="{'ui-table ui-widget': true, 'ui-table-responsive': responsive, 'ui-table-resizable': resizableColumns}">
            <div *ngIf="captionTemplate" class="ui-table-caption ui-widget-header">
                <ng-container *ngTemplateOutlet="captionTemplate"></ng-container>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" styleClass="ui-paginator-top" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'top' || paginatorPosition =='both')"></p-paginator>
            
            <div class="ui-table-wrapper" *ngIf="!scrollable">
                <table>
                    <ng-container *ngTemplateOutlet="colGroupTemplate; context {$implicit: columns}"></ng-container>
                    <thead #thead class="ui-table-thead">
                        <ng-container *ngTemplateOutlet="headerTemplate; context: {$implicit: columns}"></ng-container>
                    </thead>
                    <tfoot class="ui-table-tfoot">
                        <ng-container *ngTemplateOutlet="footerTemplate; context {$implicit: columns}"></ng-container>
                    </tfoot>
                    <tbody #tbody class="ui-table-tbody">
                        <ng-container *ngIf="!expandedRowTemplate">
                            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="paginator ? (filteredValue||value | slice:(lazy ? 0 : first):((lazy ? 0 : first) + rows)) : filteredValue||value" [ngForTrackBy]="rowTrackBy">
                                <ng-container *ngTemplateOutlet="bodyTemplate; context: {$implicit: rowData, rowIndex: rowIndex, columns: columns}"></ng-container>
                            </ng-template>
                        </ng-container>
                        <ng-container *ngIf="expandedRowTemplate">
                            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="paginator ? (filteredValue||value | slice:(lazy ? 0 : first):((lazy ? 0 : first) + rows)) : filteredValue||value" [ngForTrackBy]="rowTrackBy">
                                <ng-container *ngIf="isRowExpanded(rowData); else collapsedrow">
                                    <ng-container *ngTemplateOutlet="bodyTemplate; context: {$implicit: rowData, rowIndex: rowIndex, columns: columns, expanded: true}"></ng-container>
                                    <ng-container *ngTemplateOutlet="expandedRowTemplate; context: {$implicit: rowData, rowIndex: rowIndex, columns: columns}"></ng-container>
                                </ng-container>
                                <ng-template #collapsedrow>
                                    <ng-container *ngTemplateOutlet="bodyTemplate; context: {$implicit: rowData, rowIndex: rowIndex, expanded: false, columns: columns}"></ng-container>
                                </ng-template>
                            </ng-template>
                        </ng-container>
                    </tbody>
                </table>
            </div>

            <div class="ui-table-scrollable-wrapper" *ngIf="scrollable">
                <div #scrollHeader class="ui-table-scrollable-header">
                    <table>
                        <ng-container *ngTemplateOutlet="colGroupTemplate; context {$implicit: columns}"></ng-container>
                        <thead #thead class="ui-table-thead">
                            <ng-container *ngTemplateOutlet="headerTemplate; context {$implicit: columns}"></ng-container>
                        </thead>
                    </table>
                </div>
                <div #scrollBody class="ui-table-scrollable-body" [style.maxHeight]="scrollHeight">
                    <table #scrollTable>
                        <ng-container *ngTemplateOutlet="colGroupTemplate; context {$implicit: columns}"></ng-container>
                        <tbody #tbody class="ui-table-tbody">
                            <ng-container *ngIf="!expandedRowTemplate">
                                <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="paginator ? (filteredValue||value | slice:(lazy ? 0 : first):((lazy ? 0 : first) + rows)) : filteredValue||value" [ngForTrackBy]="rowTrackBy">
                                    <ng-container *ngTemplateOutlet="bodyTemplate; context: {$implicit: rowData, rowIndex: rowIndex, columns: columns}"></ng-container>
                                </ng-template>
                            </ng-container>
                            <ng-container *ngIf="expandedRowTemplate">
                                <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="paginator ? (filteredValue||value | slice:(lazy ? 0 : first):((lazy ? 0 : first) + rows)) : filteredValue||value" [ngForTrackBy]="rowTrackBy">
                                    <ng-container *ngIf="isRowExpanded(rowData); else collapsedrow">
                                        <ng-container *ngTemplateOutlet="bodyTemplate; context: {$implicit: rowData, rowIndex: rowIndex, columns: columns, expanded: true}"></ng-container>
                                        <ng-container *ngTemplateOutlet="expandedRowTemplate; context: {$implicit: rowData, rowIndex: rowIndex, columns: columns}"></ng-container>
                                    </ng-container>
                                    <ng-template #collapsedrow>
                                        <ng-container *ngTemplateOutlet="bodyTemplate; context: {$implicit: rowData, rowIndex: rowIndex, expanded: false, columns: columns}"></ng-container>
                                    </ng-template>
                                </ng-template>
                            </ng-container>
                        </tbody>
                    </table>
                </div>
                <div #scrollFooter *ngIf="footerTemplate" class="ui-table-scrollable-footer">
                    <table>
                        <ng-container *ngTemplateOutlet="colGroupTemplate; context {$implicit: columns}"></ng-container>
                        <tfoot class="ui-table-tfoot">
                            <ng-container *ngTemplateOutlet="footerTemplate; context {$implicit: columns}"></ng-container>
                        </tfoot>
                    </table>
                </div>
            </div>
                        
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" styleClass="ui-paginator-top" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')"></p-paginator>
            <div *ngIf="summaryTemplate" class="ui-table-summary ui-widget-header">
                <ng-container *ngTemplateOutlet="summaryTemplate"></ng-container>
            </div>

            <div #resizeHelper class="ui-column-resizer-helper ui-state-highlight" style="display:none" *ngIf="resizableColumns"></div>

            <span #reorderIndicatorUp class="fa fa-arrow-down ui-table-reorder-indicator-up" *ngIf="reorderableColumns"></span>
            <span #reorderIndicatorDown class="fa fa-arrow-up ui-table-reorder-indicator-down" *ngIf="reorderableColumns"></span>
        </div>
    `,
    providers: [DomHandler, ObjectUtils]
})
export class Table implements OnInit, AfterContentInit, AfterViewInit {
    
    @Input() columns: any[];

    @Input() style: any;

    @Input() styleClass: string;

    @Input() paginator: boolean;

    @Input() rows: number;

    @Input() first: number = 0;

    @Input() totalRecords: number = 0;

    @Input() pageLinks: number = 5;

    @Input() rowsPerPageOptions: number[];

    @Input() alwaysShowPaginator: boolean = true;

    @Input() paginatorPosition: string = 'bottom';

    @Input() sortField: string;

    @Input() sortOrder: number = 1;

    @Input() defaultSortOrder: number = 1;

    @Input() sortMode: string = 'single';

    @Input() multiSortMeta: SortMeta[] = [];

    @Input() selectionMode: string;

    @Input() selection: any;

    @Output() selectionChange: EventEmitter<any> = new EventEmitter();

    @Input() contextMenuSelection: any;

    @Output() contextMenuSelectionChange: EventEmitter<any> = new EventEmitter();

    @Input() dataKey: string;

    @Input() rowTrackBy: Function = (index: number, item: any) => item;

    @Input() lazy: boolean;

    @Input() compareSelectionBy: string = 'deepEquals';

    @Input() csvSeparator: string = ',';

    @Input() exportFilename: string = 'download';

    @Input() filters: { [s: string]: FilterMetadata; } = {};

    @Input() expandedRowIcon: string = 'fa fa-fw fa-chevron-circle-down';

    @Input() collapsedRowIcon: string = 'fa fa-fw fa-chevron-circle-right';

    @Input() expandedRowKeys: { [s: string]: number; } = {};

    @Input() rowExpandMode: string = 'multiple';

    @Input() scrollable: boolean;

    @Input() scrollHeight: string;

    @Input() responsive: boolean;

    @Input() contextMenu: any;
    
    @Input() resizableColumns: boolean;

    @Input() columnResizeMode: string = 'fit';

    @Input() reorderableColumns: boolean;

    @Output() onRowClick: EventEmitter<any> = new EventEmitter();

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

    @ViewChild('container') containerViewChild: ElementRef;

    @ViewChild('thead') theadViewChild: ElementRef;

    @ViewChild('tbody') tbodyViewChild: ElementRef;

    @ViewChild('scrollHeader') scrollHeaderViewChild: ElementRef;

    @ViewChild('scrollBody') scrollBodyViewChild: ElementRef;

    @ViewChild('scrollTable') scrollTableViewChild: ElementRef;

    @ViewChild('scrollFooter') scrollFooterViewChild: ElementRef;

    @ViewChild('resizeHelper') resizeHelperViewChild: ElementRef;

    @ViewChild('reorderIndicatorUp') reorderIndicatorUpViewChild: ElementRef;

    @ViewChild('reorderIndicatorDown') reorderIndicatorDownViewChild: ElementRef;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;

    _value: any[] = [];

    filteredValue: any[];

    headerTemplate: TemplateRef<any>;

    bodyTemplate: TemplateRef<any>;

    captionTemplate: TemplateRef<any>;

    footerTemplate: TemplateRef<any>;

    summaryTemplate: TemplateRef<any>;

    colGroupTemplate: TemplateRef<any>;

    expandedRowTemplate: TemplateRef<any>;

    selectionKeys: any;

    headerScrollListener: Function;

    bodyScrollListener: Function;

    footerScrollListener: Function;

    lastResizerHelperX: number;

    reorderIconWidth: number;

    reorderIconHeight: number;

    draggedColumn: any;

    dropPosition: number;

    constructor(public el: ElementRef, public domHandler: DomHandler, public objectUtils: ObjectUtils, public zone: NgZone) {}

    ngOnInit() {
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
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
            }
        });
    }

    ngAfterViewInit() {
        if(this.scrollable) {
            this.initScrolling();
        }
    }

    @Input() get value(): any[] {
        return this._value;
    }
    set value(val: any[]) {
        this._value = val;
        this.totalRecords = this.lazy ? this.totalRecords : (this._value ? this._value.length : 0);
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
    }

    sort(event) {
        let originalEvent = event.originalEvent;

        if(this.sortMode === 'single') {
            this.sortOrder = (this.sortField === event.field) ? this.sortOrder * -1 : this.defaultSortOrder;
            this.sortField = event.field;
            this.sortSingle();
        }
        if (this.sortMode === 'multiple') {
            let metaKey = originalEvent.metaKey || originalEvent.ctrlKey;
            let sortMeta = this.getSortMeta(event.field);

            if (sortMeta) {
                if (!metaKey) {
                    this.multiSortMeta = [{ field: event.field, order: sortMeta.order * -1 }]
                }
                else {
                    sortMeta.order = sortMeta.order * -1;
                }
            }
            else {
                if (!metaKey) {
                    this.multiSortMeta = [];
                }
                this.multiSortMeta.push({ field: event.field, order: this.defaultSortOrder });
            }
            
            this.sortMultiple();
        }

        this.onSort.emit({
            field: event.field,
            order: event.sortOrder,
            multisortmeta: this.multiSortMeta
        });
    }

    sortSingle() {
        this.first = 0;

        if(this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else if (this.value) {
            this.value.sort((data1, data2) => {
                let value1 = this.objectUtils.resolveFieldData(data1, this.sortField);
                let value2 = this.objectUtils.resolveFieldData(data2, this.sortField);
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
        }
    }

    sortMultiple() {
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else if (this.value) {
            this.value.sort((data1, data2) => {
                return this.multisortField(data1, data2, this.multiSortMeta, 0);
            });
        }
    }

    multisortField(data1, data2, multiSortMeta, index) {
        let value1 = this.objectUtils.resolveFieldData(data1, multiSortMeta[index].field);
        let value2 = this.objectUtils.resolveFieldData(data2, multiSortMeta[index].field);
        let result = null;

        if (typeof value1 == 'string' || value1 instanceof String) {
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
        for (let i = 0; i < this.multiSortMeta.length; i++) {
            if (this.multiSortMeta[i].field === field) {
                return this.multiSortMeta[i];
            }
        }

        return null;
    }

    handleRowClick(event) {
        let targetNode = (<HTMLElement> event.originalEvent.target).nodeName;
        if (targetNode == 'INPUT' || targetNode == 'BUTTON' || targetNode == 'A' || (this.domHandler.hasClass(event.originalEvent.target, 'ui-clickable'))) {
            return;
        }

        this.onRowClick.emit({ originalEvent: event.originalEvent, data: event.rowData });

        if(this.selectionMode) {
            let rowData = event.rowData;
            let dataKeyValue = this.dataKey ? String(this.objectUtils.resolveFieldData(rowData, this.dataKey)) : null;
            let selected = this.isSelected(rowData);

            if (this.selectionMode === 'single') {
                if (selected) {
                    this.selection = null;
                    this.selectionKeys = {};
                    this.selectionChange.emit(this.selection);
                    this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                }
                else {
                    this.selection = rowData;
                    this.selectionChange.emit(this.selection);
                    this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                    if (dataKeyValue) {
                        this.selectionKeys = {};
                        this.selectionKeys[dataKeyValue] = 1;
                    }
                }
            }
            else if (this.selectionMode === 'multiple') {
                if (selected) {
                    let selectionIndex = this.findIndexInSelection(rowData);
                    this.selection = this.selection.filter((val, i) => i != selectionIndex);
                    this.selectionChange.emit(this.selection);
                    this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                    if (dataKeyValue) {
                        delete this.selectionKeys[dataKeyValue];
                    }
                }
                else {
                    this.selection = this.selection ? [...this.selection, rowData] : [rowData];
                    this.selectionChange.emit(this.selection);
                    this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                    if (dataKeyValue) {
                        this.selectionKeys[dataKeyValue] = 1;
                    }
                }
            }
        }
    }

    handleRowRightClick(event) {
        if (this.contextMenu) {
            this.contextMenuSelection = event.rowData;
            this.contextMenuSelectionChange.emit(event.rowData);
            this.onContextMenuSelect.emit({ originalEvent: event.originalEvent, data: event.rowData });
            this.contextMenu.show(event.originalEvent);
        }
    }

    isSelected(rowData) {
        if (rowData && this.selection) {
            if (this.dataKey) {
                return this.selectionKeys[this.objectUtils.resolveFieldData(rowData, this.dataKey)] !== undefined;
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

    equals(data1, data2) {
        return this.compareSelectionBy === 'equals' ? (data1 === data2) : this.objectUtils.equals(data1, data2, this.dataKey);
    }

    filter(value, field, matchMode) {
        if (!this.isFilterBlank(value))
            this.filters[field] = { value: value, matchMode: matchMode };
        else if (this.filters[field])
            delete this.filters[field];

        if(this.hasFilter()) {
            this._filter();
        }
        else {
            this.filteredValue = null;
            if (this.paginator) {
                this.totalRecords = this.value ? this.value.length : 0;
            }
        }
    }

    filterGlobal(value, matchMode) {
        this.filter(value, 'global', matchMode);
        this._filter();
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
        this.first = 0;

        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            if (!this.value) {
                return;
            }

            this.filteredValue = [];

            for (let i = 0; i < this.value.length; i++) {
                let localMatch = true;
                let globalMatch = false;

                for (let j = 0; j < this.columns.length; j++) {
                    let col = this.columns[j];
                    let filterMeta = this.filters[col.filterField || col.field];

                    //local
                    if (filterMeta) {
                        let filterValue = filterMeta.value;
                        let filterField = col.filterField || col.field;
                        let filterMatchMode = filterMeta.matchMode || 'startsWith';
                        let dataFieldValue = this.objectUtils.resolveFieldData(this.value[i], filterField);
                        let filterConstraint = this.filterConstraints[filterMatchMode];

                        if (!filterConstraint(dataFieldValue, filterValue)) {
                            localMatch = false;
                        }

                        if (!localMatch) {
                            break;
                        }
                    }

                    //global
                    if (this.filters['global'] && !globalMatch) {
                        globalMatch = this.filterConstraints[this.filters['global'].matchMode](this.objectUtils.resolveFieldData(this.value[i], col.filterField || col.field), this.filters['global'].value);
                    }
                }

                let matches = localMatch;
                if (this.filters['global']) {
                    matches = localMatch && globalMatch;
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

        this.onFilter.emit({
            filters: this.filters,
            filteredValue: this.filteredValue || this.value
        });
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

    filterConstraints = {

        startsWith(value, filter): boolean {
            if (filter === undefined || filter === null || filter.trim() === '') {
                return true;
            }

            if (value === undefined || value === null) {
                return false;
            }

            let filterValue = filter.toLowerCase();
            return value.toString().toLowerCase().slice(0, filterValue.length) === filterValue;
        },

        contains(value, filter): boolean {
            if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                return true;
            }

            if (value === undefined || value === null) {
                return false;
            }

            return value.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        },

        endsWith(value, filter): boolean {
            if (filter === undefined || filter === null || filter.trim() === '') {
                return true;
            }

            if (value === undefined || value === null) {
                return false;
            }

            let filterValue = filter.toString().toLowerCase();
            return value.toString().toLowerCase().indexOf(filterValue, value.toString().length - filterValue.length) !== -1;
        },

        equals(value, filter): boolean {
            if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                return true;
            }

            if (value === undefined || value === null) {
                return false;
            }

            return value.toString().toLowerCase() == filter.toString().toLowerCase();
        },

        notEquals(value, filter): boolean {
            if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                return false;
            }

            if (value === undefined || value === null) {
                return true;
            }

            return value.toString().toLowerCase() != filter.toString().toLowerCase();
        },

        in(value, filter: any[]): boolean {
            if (filter === undefined || filter === null || filter.length === 0) {
                return true;
            }

            if (value === undefined || value === null) {
                return false;
            }

            for (let i = 0; i < filter.length; i++) {
                if (filter[i] === value)
                    return true;
            }

            return false;
        },

        lt(value, filter): boolean {
            if (filter === undefined || filter === null) {
                return true;
            }

            if (value === undefined || value === null) {
                return false;
            }

            return value < filter;
        },

        gt(value, filter): boolean {
            if (filter === undefined || filter === null) {
                return true;
            }

            if (value === undefined || value === null) {
                return false;
            }

            return value > filter;
        }
    }

    createLazyLoadMetadata(): any {
        return {
            first: this.first,
            rows: this.rows,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            filters: this.filters,
            globalFilter: this.filters && this.filters['global'] ? this.filters['global'].value : null,
            multiSortMeta: this.multiSortMeta
        };
    }

    public exportCSV(options?: any) {
        let data = this.filteredValue || this.value;
        let csv = '\ufeff';
        debugger;

        if (options && options.selectionOnly) {
            data = this.selection || [];
        }

        //headers
        for (let i = 0; i < this.columns.length; i++) {
            let column = this.columns[i];
            if (column.exportable !== false && column.field) {
                csv += '"' + (column.header || column.field) + '"';

                if (i < (this.columns.length - 1)) {
                    csv += this.csvSeparator;
                }
            }
        }

        //body
        data.forEach((record, i) => {
            csv += '\n';
            for (let i = 0; i < this.columns.length; i++) {
                let column = this.columns[i];
                if (column.exportable !== false && column.field) {
                    let cellData = this.objectUtils.resolveFieldData(record, column.field);

                    if (cellData != null)
                        cellData = String(cellData).replace(/"/g, '""');
                    else
                        cellData = '';

                    csv += '"' + cellData + '"';

                    if (i < (this.columns.length - 1)) {
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

    toggleRow(rowData: any, event?: Event) {        
        if(!this.dataKey) {
            throw new Error('dataKey must be defined to use row expansion');
        }

        let dataKeyValue = String(this.objectUtils.resolveFieldData(rowData, this.dataKey));

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

            this.expandedRowKeys[dataKeyValue] = 1;
            this.onRowExpand.emit({
                originalEvent: event,
                data: rowData
            });
        }

        if (event) {
            event.preventDefault();
        }
    }

    isRowExpanded(rowData: any): boolean {
        return this.expandedRowKeys[String(this.objectUtils.resolveFieldData(rowData, this.dataKey))] === 1;
    }

    initScrolling() {
        this.zone.runOutsideAngular(() => {
            let scrollBarWidth = this.domHandler.calculateScrollbarWidth();

            if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
                this.scrollHeaderViewChild.nativeElement.style.paddingRight = scrollBarWidth + 'px';
                this.headerScrollListener = this.onHeaderScroll.bind(this);
                this.scrollHeaderViewChild.nativeElement.addEventListener('scroll', this.onHeaderScroll.bind(this));
            }

            if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
                this.scrollFooterViewChild.nativeElement.style.paddingRight = scrollBarWidth + 'px';
                this.footerScrollListener = this.onFooterScroll.bind(this);
                this.scrollFooterViewChild.nativeElement.addEventListener('scroll', this.onFooterScroll.bind(this));
            }

            this.bodyScrollListener = this.onBodyScroll.bind(this);            
            this.scrollBodyViewChild.nativeElement.addEventListener('scroll', this.onBodyScroll.bind(this));
        });
    }

    onHeaderScroll(event) {
        this.scrollHeaderViewChild.nativeElement.scrollLeft = 0;
    }

    onFooterScroll(event) {
        this.scrollFooterViewChild.nativeElement.scrollLeft = 0;
    }

    onBodyScroll(event) {
        if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
            this.scrollHeaderViewChild.nativeElement.style.marginLeft = -1 * this.scrollBodyViewChild.nativeElement.scrollLeft + 'px';
        }

        if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
            this.scrollFooterViewChild.nativeElement.style.marginLeft = -1 * this.scrollBodyViewChild.nativeElement.scrollLeft + 'px';
        }
    }

    isSingleSelectionMode() {
        return this.selectionMode === 'single';
    }

    isMultipleSelectionMode() {
        return this.selectionMode === 'multiple';
    }

    onColumnResizeBegin(event) {
        let containerLeft = this.domHandler.getOffset(this.containerViewChild.nativeElement).left;
        this.lastResizerHelperX = (event.pageX - containerLeft + this.containerViewChild.nativeElement.scrollLeft);
    }

    onColumnResize(event) {
        let containerLeft = this.domHandler.getOffset(this.containerViewChild.nativeElement).left;
        this.domHandler.addClass(this.containerViewChild.nativeElement, 'ui-unselectable-text');
        this.resizeHelperViewChild.nativeElement.style.height = this.containerViewChild.nativeElement.offsetHeight + 'px';
        this.resizeHelperViewChild.nativeElement.style.top = 0 + 'px';
        this.resizeHelperViewChild.nativeElement.style.left = (event.pageX - containerLeft + this.containerViewChild.nativeElement.scrollLeft) + 'px';

        this.resizeHelperViewChild.nativeElement.style.display = 'block';
    }

    onColumnResizeEnd(event, column) {
        let delta = this.resizeHelperViewChild.nativeElement.offsetLeft - this.lastResizerHelperX;
        let columnWidth = column.offsetWidth;
        let newColumnWidth = columnWidth + delta;
        let minWidth = column.style.minWidth || 15;

        if (columnWidth + delta > parseInt(minWidth)) {
            if (this.columnResizeMode === 'fit') {
                let nextColumn = column.nextElementSibling;
                while (!nextColumn.offsetParent) {
                    nextColumn = nextColumn.nextElementSibling;
                }

                if (nextColumn) {
                    let nextColumnWidth = nextColumn.offsetWidth - delta;
                    let nextColumnMinWidth = nextColumn.style.minWidth || 15;

                    if (newColumnWidth > 15 && nextColumnWidth > parseInt(nextColumnMinWidth)) {
                        column.style.width = newColumnWidth + 'px';
                        if (nextColumn) {
                            nextColumn.style.width = nextColumnWidth + 'px';
                        }

                        if (this.scrollable) {
                            let colGroup = this.domHandler.findSingle(this.el.nativeElement, 'colgroup.ui-datatable-scrollable-colgroup');
                            let resizeColumnIndex = this.domHandler.index(column);
                            colGroup.children[resizeColumnIndex].style.width = newColumnWidth + 'px';

                            if (nextColumn) {
                                colGroup.children[resizeColumnIndex + 1].style.width = nextColumnWidth + 'px';
                            }
                        }
                    }
                }
            }
            else if (this.columnResizeMode === 'expand') {
                this.tbodyViewChild.nativeElement.parentElement.style.width = this.tbodyViewChild.nativeElement.parentElement.offsetWidth + delta + 'px';
                column.style.width = newColumnWidth + 'px';
                let containerWidth = this.tbodyViewChild.nativeElement.parentElement.style.width;

                if (this.scrollable) {
                    this.domHandler.findSingle(this.el.nativeElement, '.ui-datatable-scrollable-header-box').children[0].style.width = containerWidth;
                    let colGroup = this.domHandler.findSingle(this.el.nativeElement, 'colgroup.ui-datatable-scrollable-colgroup');
                    let resizeColumnIndex = this.domHandler.index(column);
                    colGroup.children[resizeColumnIndex].style.width = newColumnWidth + 'px';
                }
            }

            this.onColResize.emit({
                element: column,
                delta: delta
            });
        }

        this.resizeHelperViewChild.nativeElement.style.display = 'none';
        this.domHandler.removeClass(this.containerViewChild.nativeElement, 'ui-unselectable-text');
    }

    onColumnDragStart(event, columnElement) {
        if (this.domHandler.hasClass(event.target, 'ui-column-resizer')) {
            event.preventDefault();
            return;
        }

        this.reorderIconWidth = this.domHandler.getHiddenElementOuterWidth(this.reorderIndicatorUpViewChild.nativeElement);
        this.reorderIconHeight = this.domHandler.getHiddenElementOuterHeight(this.reorderIndicatorDownViewChild.nativeElement);
        this.draggedColumn = columnElement;
        event.dataTransfer.setData('text', 'b');    // For firefox
    }

    onColumnDragEnter(event, dropHeader) {
        if (this.reorderableColumns && this.draggedColumn && dropHeader) {
            event.preventDefault();
            let containerOffset = this.domHandler.getOffset(this.containerViewChild.nativeElement);
            let dropHeaderOffset = this.domHandler.getOffset(dropHeader);

            if (this.draggedColumn != dropHeader) {
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

                this.reorderIndicatorUpViewChild.nativeElement.style.display = 'block';
                this.reorderIndicatorDownViewChild.nativeElement.style.display = 'block';
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
            let dragIndex = this.domHandler.index(this.draggedColumn);
            let dropIndex = this.domHandler.index(dropColumn);
            let allowDrop = (dragIndex != dropIndex);
            if (allowDrop && ((dropIndex - dragIndex == 1 && this.dropPosition === -1) || (dragIndex - dropIndex == 1 && this.dropPosition === 1))) {
                allowDrop = false;
            }

            if (allowDrop) {
                for(let col of this.columns) {
                    console.log(col.header);
                }
                this.objectUtils.reorderArray(this.columns, dragIndex, dropIndex);
                for (let col of this.columns) {
                    console.log(col.header);
                }
                /*if (this.scrollable) {
                    this.initScrollableColumns();
                }*/

                this.onColReorder.emit({
                    dragIndex: dragIndex,
                    dropIndex: dropIndex,
                    columns: this.columns
                });
            }

            this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
            this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
            this.draggedColumn.draggable = false;
            this.draggedColumn = null;
            this.dropPosition = null;
        }
    }
}

@Directive({
    selector: '[pSortableColumn]',
    providers: [DomHandler]
})
export class SortableColumn implements AfterViewInit {

    @Input("pSortableColumn") column: Column;

    icon: HTMLSpanElement;

    constructor(public dt: Table, public el: ElementRef, public domHandler: DomHandler) { }

    ngAfterViewInit() {
        this.domHandler.addClass(this.el.nativeElement, 'ui-sortable-column');
        this.icon = document.createElement('span');
        this.icon.className = 'ui-sortable-column-icon fa fa-fw fa-sort';
        this.el.nativeElement.appendChild(this.icon);
    }

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
        let metaKey = event.metaKey || event.ctrlKey;

        if(this.dt.sortMode === 'single' || !metaKey) {
            let sortedColumns = this.domHandler.find(this.dt.theadViewChild.nativeElement, 'th.ui-state-highlight');
            if (sortedColumns.length) {
                for(let i = 0 ; i < sortedColumns.length; i++) {
                    this.domHandler.removeClass(sortedColumns[i], 'ui-state-highlight');
                    let sortIcon = this.domHandler.findSingle(sortedColumns[i], '.ui-sortable-column-icon');
                    sortIcon.className = 'ui-sortable-column-icon fa fa-fw fa-sort';
                }
            }
        }

        this.dt.sort({
            originalEvent: event,
            field: this.column.field
        });

        let sortOrder;
        if (this.dt.sortMode === 'single') {
            sortOrder = this.dt.sortOrder;
        }
        else if (this.dt.sortMode === 'multiple') {
            let sortMeta = this.dt.getSortMeta(this.column.field);
            if(sortMeta) {
                sortOrder = sortMeta.order;
            }
        }

        if (sortOrder === 1) {
            this.domHandler.removeClass(this.icon, 'fa-sort-desc');
            this.domHandler.addClass(this.icon, 'fa-sort-asc');
        }
        else if (sortOrder === -1) {
            this.domHandler.removeClass(this.icon, 'fa-sort-asc');
            this.domHandler.addClass(this.icon, 'fa-sort-desc');
        }

        this.domHandler.addClass(this.el.nativeElement, 'ui-state-highlight');
    }
}

@Directive({
    selector: '[pSelectableRow]',
    providers: [DomHandler]
})
export class SelectableRow implements AfterViewInit {

    @Input("pSelectableRow") data: any;

    constructor(public dt: Table, public el: ElementRef, public domHandler: DomHandler) { }

    ngAfterViewInit() {
        if(this.dt.isSelected(this.data)) {
            this.domHandler.addClass(this.el.nativeElement, 'ui-state-highlight');
        }
    }

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        this.dt.handleRowClick({
            originalEvent: event,
            rowData: this.data
        });
        
        if(this.domHandler.hasClass(this.el.nativeElement, 'ui-state-highlight')) {
            this.domHandler.removeClass(this.el.nativeElement, 'ui-state-highlight');
        }
        else {
            let selectedRow = this.domHandler.findSingle(this.dt.tbodyViewChild.nativeElement, 'tr.ui-state-highlight');
            if(selectedRow) {
                this.domHandler.removeClass(selectedRow, 'ui-state-highlight');
            }
            this.domHandler.addClass(this.el.nativeElement, 'ui-state-highlight');
        }
    }    

}

@Directive({
    selector: '[pContextMenuRow]',
    providers: [DomHandler]
})
export class ContextMenuRow {

    @Input("pContextMenuRow") data: any;

    constructor(public dt: Table, public el: ElementRef, public domHandler: DomHandler) { }

    @HostListener('contextmenu', ['$event'])
    onContextMenu(event: Event) {
        this.dt.handleRowRightClick({
            originalEvent: event,
            rowData: this.data
        });

        let outlinedRow = this.domHandler.findSingle(this.dt.tbodyViewChild.nativeElement, 'tr.ui-contextmenu-selected');
        if (outlinedRow) {
            this.domHandler.removeClass(outlinedRow, 'ui-contextmenu-selected');
        }
        this.domHandler.addClass(this.el.nativeElement, 'ui-contextmenu-selected');

        event.preventDefault();
    }

}

@Directive({
    selector: '[pRowToggler]'
})
export class RowToggler {

    @Input('pRowToggler') data: any;

    constructor(public dt: Table) { }

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        this.dt.toggleRow(this.data, event);
        event.preventDefault();
    }
}

@Directive({
    selector: '[pResizableColumn]'
})
export class ResizableColumn implements AfterViewInit, OnDestroy {

    resizer: HTMLSpanElement;

    resizerMouseDownListener: any;

    documentMouseMoveListener: any;

    documentMouseUpListener: any;

    constructor(public dt: Table, public el: ElementRef, public domHandler: DomHandler, public zone: NgZone) { }

    ngAfterViewInit() {
        this.domHandler.addClass(this.el.nativeElement, 'ui-resizable-column');
        this.resizer = document.createElement('span');
        this.resizer.className = 'ui-column-resizer ui-clickable';
        this.el.nativeElement.appendChild(this.resizer);

        this.zone.runOutsideAngular(() => {
            this.resizerMouseDownListener = this.onMouseDown.bind(this);
            this.resizer.addEventListener('mousedown', this.resizerMouseDownListener);
        });
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

    onMouseDown(event: Event) {
        this.dt.onColumnResizeBegin(event);
        this.bindDocumentEvents();
    }

    onDocumentMouseMove(event: Event) {
        this.dt.onColumnResize(event);
    }

    onDocumentMouseUp(event: Event) {
        this.dt.onColumnResizeEnd(event, this.el.nativeElement);
        this.unbindDocumentEvents();
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

    dragStartListener: any;

    dragOverListener: any;

    dragEnterListener: any;

    dragLeaveListener: any;

    mouseDownListener: any;

    constructor(public dt: Table, public el: ElementRef, public domHandler: DomHandler, public zone: NgZone) { }

    ngAfterViewInit() {
        this.bindEvents();
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
        if (event.target.nodeName === 'INPUT')
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
        this.dt.onColumnDrop(event, this.el.nativeElement);
    }

    ngOnDestroy() {
        this.unbindEvents();
    }
}

@NgModule({
    imports: [CommonModule,PaginatorModule],
    exports: [Table,SharedModule,SortableColumn,SelectableRow,RowToggler,ContextMenuRow,ResizableColumn,ReorderableColumn],
    declarations: [Table,SortableColumn,SelectableRow,RowToggler,ContextMenuRow,ResizableColumn,ReorderableColumn]
})
export class TableModule { }
