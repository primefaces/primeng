import { NgModule, Component, HostListener, AfterViewInit, Directive, AfterContentInit, Input, Output, EventEmitter, ElementRef, ContentChildren, TemplateRef, QueryList, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Column, PrimeTemplate, SharedModule } from '../common/shared';
import { PaginatorModule } from '../paginator/paginator';
import { DomHandler } from '../dom/domhandler';
import { ObjectUtils } from '../utils/objectutils';

@Component({
    selector: 'p-table',
    template: `
        <div class="ui-table">
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" styleClass="ui-paginator-top" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'top' || paginatorPosition =='both')"></p-paginator>
            <table>
                <thead #thead>
                    <ng-container *ngTemplateOutlet="headerTemplate; context: {$implicit: columns}"></ng-container>
                </thead>
                <tbody #tbody>
                    <ng-template ngFor let-rowData [ngForOf]="paginator ? (value | slice:first:(first + rows)) : value">
                        <ng-container *ngTemplateOutlet="bodyTemplate; context: {$implicit: rowData, columns: columns}"></ng-container>
                    </ng-template>
                </tbody>
            </table>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" styleClass="ui-paginator-top" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')"></p-paginator>
        </div>
    `,
    providers: [DomHandler, ObjectUtils]
})
export class Table implements AfterContentInit {

    @Input() columns: Column[];

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

    @Input() selectionMode: string;

    @Input() selection: any;

    @Output() selectionChange: EventEmitter<any> = new EventEmitter();

    @Input() dataKey: string;

    @Input() compareSelectionBy: string = 'deepEquals';

    @Output() onRowClick: EventEmitter<any> = new EventEmitter();

    @Output() onRowSelect: EventEmitter<any> = new EventEmitter();

    @Output() onRowUnselect: EventEmitter<any> = new EventEmitter();

    @ViewChild('tbody') theadViewChild: ElementRef;

    @ViewChild('tbody') tbodyViewChild: ElementRef;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;

    _value: any[] = [];

    headerTemplate: TemplateRef<any>;

    bodyTemplate: TemplateRef<any>;

    selectionKeys: any;

    constructor(public el: ElementRef, public domHandler: DomHandler, public objectUtils: ObjectUtils) {}

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                break;

                case 'body':
                    this.bodyTemplate = item.template;
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
        if(this.sortMode === 'single') {
            this.sortOrder = (this.sortField === event.field) ? this.sortOrder * -1 : this.defaultSortOrder;
            this.sortField = event.field;
            this.sortSingle();
        }
        else {

        }
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
    onClick(event: Event) {
        let sortedColumn = this.domHandler.findSingle(this.dt.theadViewChild.nativeElement, 'th.ui-state-highlight');
        if (sortedColumn) {
            this.domHandler.removeClass(sortedColumn, 'ui-state-highlight');
            sortedColumn = 'ui-sortable-column-icon fa fa-fw fa-sort';
        }

        this.dt.sort({
            originalEvent: event,
            field: this.column.field,
            element: this.el.nativeElement
        });

        if(this.dt.sortOrder === 1) {
            this.domHandler.removeClass(this.icon, 'fa-sort-desc');
            this.domHandler.addClass(this.icon, 'fa-sort-asc');
        }
        else if (this.dt.sortOrder === -1) {
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
