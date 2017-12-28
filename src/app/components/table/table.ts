import { NgModule, Component, HostListener, AfterViewInit, Directive, AfterContentInit, Input, Output, EventEmitter, ElementRef, ContentChildren, TemplateRef, QueryList, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Column, PrimeTemplate, SharedModule } from '../common/shared';
import { PaginatorModule } from '../paginator/paginator';
import { DomHandler } from '../dom/domhandler';
import { ObjectUtils } from '../utils/objectutils';
import { SortMeta } from '../common/sortmeta';
import { FilterMetadata } from '../common/filtermetadata';

@Component({
    selector: 'p-table',
    template: `
        <div class="ui-table ui-widget">
            <div *ngIf="captionTemplate" class="ui-table-caption ui-widget-header">
                <ng-container *ngTemplateOutlet="captionTemplate"></ng-container>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" styleClass="ui-paginator-top" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'top' || paginatorPosition =='both')"></p-paginator>
            <table>
                <ng-container *ngTemplateOutlet="colGroupTemplate"></ng-container>
                <thead #thead>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                </thead>
                <tfoot>
                    <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                </tfoot>
                <tbody #tbody>
                    <ng-template ngFor let-rowData [ngForOf]="paginator ? (filteredValue||value | slice:first:(first + rows)) : filteredValue||value" [ngForTrackBy]="rowTrackBy">
                        <ng-container *ngTemplateOutlet="bodyTemplate; context: {$implicit: rowData}"></ng-container>
                    </ng-template>
                </tbody>
            </table>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" styleClass="ui-paginator-top" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')"></p-paginator>
            <div *ngIf="footerTemplate" class="ui-table-summary ui-widget-header">
                <ng-container *ngTemplateOutlet="summaryTemplate"></ng-container>
            </div>
        </div>
    `,
    providers: [DomHandler, ObjectUtils]
})
export class Table implements AfterContentInit {

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

    @Input() dataKey: string;

    @Input() rowTrackBy: Function = (index: number, item: any) => item;

    @Input() lazy: boolean;

    @Input() compareSelectionBy: string = 'deepEquals';

    @Input() public filters: { [s: string]: FilterMetadata; } = {};

    @Output() onRowClick: EventEmitter<any> = new EventEmitter();

    @Output() onRowSelect: EventEmitter<any> = new EventEmitter();

    @Output() onRowUnselect: EventEmitter<any> = new EventEmitter();

    @Output() onPage: EventEmitter<any> = new EventEmitter();

    @Output() onSort: EventEmitter<any> = new EventEmitter();

    @Output() onFilter: EventEmitter<any> = new EventEmitter();

    @ViewChild('thead') theadViewChild: ElementRef;

    @ViewChild('tbody') tbodyViewChild: ElementRef;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;

    _value: any[] = [];

    filteredValue: any[];

    headerTemplate: TemplateRef<any>;

    bodyTemplate: TemplateRef<any>;

    captionTemplate: TemplateRef<any>;

    footerTemplate: TemplateRef<any>;

    summaryTemplate: TemplateRef<any>;

    colGroupTemplate: TemplateRef<any>;

    selectionKeys: any;

    constructor(public el: ElementRef, public domHandler: DomHandler, public objectUtils: ObjectUtils) {}

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
            }
        });
    }

    @Input() get value(): any[] {
        return this._value;
    }
    set value(val: any[]) {
        this._value = val;
        this.totalRecords = this._value ? this._value.length: 0;
    }

    onPageChange(event) {
        this.first = event.first;
        this.rows = event.rows;
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
        if (this.value) {
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
            
            this.first = 0;
        }
    }

    sortMultiple() {
        if (this.value) {
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

    filter(value, columns, field, matchMode) {
        if (!this.isFilterBlank(value))
            this.filters[field] = { value: value, matchMode: matchMode };
        else if (this.filters[field])
            delete this.filters[field];

        if(this.hasFilter()) {
            this._filter(columns);
        }
        else {
            this.filteredValue = null;
            if (this.paginator) {
                this.totalRecords = this.value ? this.value.length : 0;
            }
        }
    }

    filterGlobal(value, columns, matchMode) {
        this.filter(value, columns, 'global', matchMode);
        this._filter(columns);
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

    _filter(columns) {
        this.first = 0;

        if (this.lazy) {
            //this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            if (!this.value) {
                return;
            }

            this.filteredValue = [];

            for (let i = 0; i < this.value.length; i++) {
                let localMatch = true;
                let globalMatch = false;

                for (let j = 0; j < columns.length; j++) {
                    let col = columns[j];
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

@NgModule({
    imports: [CommonModule,PaginatorModule],
    exports: [Table,SharedModule,SortableColumn,SelectableRow],
    declarations: [Table,SortableColumn,SelectableRow]
})
export class TableModule { }
