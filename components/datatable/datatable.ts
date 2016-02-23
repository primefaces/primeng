import {Component,ElementRef,AfterViewInit,OnDestroy,OnChanges,Input,Output,SimpleChange,EventEmitter,ContentChild} from 'angular2/core';
import {Column} from '../api/column';
import {Header} from '../common/header';
import {Footer} from '../common/footer';
import {Paginator} from '../paginator/paginator';
import {InputText} from '../inputtext/inputtext';

@Component({
    selector: 'p-dataTable',
    template: `
        <div [attr.style]="style" [attr.class]="styleClass" [ngClass]="{'ui-datatable ui-widget': true, 'ui-datatable-reflow':responsive}">
            <div class="ui-datatable-header ui-widget-header" *ngIf="header">
                <ng-content select="header"></ng-content>
            </div>
            <div class="ui-datatable-tablewrapper" *ngIf="!scrollable">
                <table>
                    <thead>
                        <tr *ngIf="!headerRows" class="ui-state-default">
                            <th #headerCell *ngFor="#col of columns" [attr.style]="col.style" [attr.class]="col.styleClass"
                                (click)="sort(col)" (mouseenter)="hoveredHeader = $event.target" (mouseleave)="hoveredHeader = null"
                                [ngClass]="{'ui-state-default ui-unselectable-text':true, 'ui-state-hover': headerCell === hoveredHeader && col.sortable,'ui-sortable-column': col.sortable,'ui-state-active': (sortField && col.field === sortField)}">
                                <span class="ui-column-title">{{col.header}}</span>
                                <span class="ui-sortable-column-icon fa fa-fw fa-sort" *ngIf="col.sortable"
                                     [ngClass]="{'fa-sort-desc': (col.field === sortField) && (sortOrder == -1),'fa-sort-asc': (col.field === sortField) && (sortOrder == 1)}"></span>
                                <input type="text" pInputText class="ui-column-filter" *ngIf="col.filter" (keyup)="onFilterKeyup($event.target.value, col.field, col.filterMatchMode)"/>
                            </th>
                        </tr>
                        <tr *ngFor="#headerRow of headerRows" class="ui-state-default">
                            <th #headerCell *ngFor="#col of headerRow.columns" [attr.style]="col.style" [attr.class]="col.styleClass" [attr.colspan]="col.colspan" [attr.rowspan]="col.rowspan"
                                (click)="sort(col)" (mouseenter)="hoveredHeader = $event.target" (mouseleave)="hoveredHeader = null"
                                [ngClass]="{'ui-state-default ui-unselectable-text':true, 'ui-state-hover': headerCell === hoveredHeader && col.sortable,'ui-sortable-column': col.sortable,'ui-state-active': (sortField && col.field === sortField)}">
                                <span class="ui-column-title">{{col.header}}</span>
                                <span class="ui-sortable-column-icon fa fa-fw fa-sort" *ngIf="col.sortable"
                                     [ngClass]="{'fa-sort-desc': (col.field === sortField) && (sortOrder == -1),'fa-sort-asc': (col.field === sortField) && (sortOrder == 1)}"></span>
                                <input type="text" pInputText class="ui-column-filter" *ngIf="col.filter" (keyup)="onFilterKeyup($event.target.value, col.field, col.filterMatchMode)"/>
                            </th>
                        </tr>
                    </thead>
                    <tfoot *ngIf="hasFooter()">
                        <tr *ngIf="!footerRows">
                            <th *ngFor="#col of columns" [attr.style]="col.style" [attr.class]="col.styleClass" [ngClass]="{'ui-state-default':true}">{{col.footer}}</th>
                        </tr>
                        <tr *ngFor="#footerRow of footerRows">
                            <th *ngFor="#col of footerRow.columns" [attr.style]="col.style" [attr.class]="col.styleClass" 
                                [attr.colspan]="col.colspan" [attr.rowspan]="col.rowspan"
                                [ngClass]="{'ui-state-default':true}">{{col.footer}}</th>
                        </tr>
                    </tfoot>
                    <tbody class="ui-datatable-data ui-widget-content">
                        <tr #rowElement *ngFor="#rowData of dataToRender;#even = even; #odd = odd;" class="ui-widget-content" (mouseenter)="hoveredRow = $event.target" (mouseleave)="hoveredRow = null"
                                (click)="onRowClick($event, rowData)" [ngClass]="{'ui-datatable-even':even,'ui-datatable-odd':odd,'ui-state-hover': (selectionMode && rowElement == hoveredRow), 'ui-state-highlight': isSelected(rowData)}">
                            <td *ngFor="#col of columns" [attr.style]="col.style" [attr.class]="col.styleClass" 
                                [ngClass]="{'ui-editable-column':col.editable}" (click)="switchCellToEditMode($event.target)">
                                <span class="ui-column-title" *ngIf="responsive">{{col.headerText}}</span>
                                <span class="ui-cell-data" (click)="switchCellToEditMode($event.target)">{{rowData[col.field]}}</span>
                                <input type="text" class="ui-cell-editor ui-state-highlight" *ngIf="col.editable" [(ngModel)]="rowData[col.field]" (blur)="switchCellToViewMode($event.target)" (keydown)="onCellEditorKeydown($event)"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="ui-widget-header ui-datatable-scrollable-header" *ngIf="scrollable">
                <div class="ui-datatable-scrollable-header-box">
                    <table>
                        <thead>
                            <tr>
                                <th #headerCell *ngFor="#col of columns" [attr.style]="col.style" [attr.class]="col.styleClass"
                                    (click)="sort(col)" (mouseenter)="hoveredHeader = $event.target" (mouseleave)="hoveredHeader = null"
                                    [ngClass]="{'ui-state-default ui-unselectable-text':true, 'ui-state-hover': headerCell === hoveredHeader && col.sortable,'ui-sortable-column': col.sortable,'ui-state-active': col.field === sortField}">
                                    <span class="ui-column-title">{{col.header}}</span>
                                    <span class="ui-sortable-column-icon fa fa-fw fa-sort" *ngIf="col.sortable"
                                         [ngClass]="{'fa-sort-desc': (col.field === sortField) && (sortOrder == -1),'fa-sort-asc': (col.field === sortField) && (sortOrder == 1)}"></span>
                                    <input type="text" pInputText class="ui-column-filter" *ngIf="col.filter" (keyup)="onFilterKeyup($event.target.value, col.field, col.filterMatchMode)"/>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
            <div class="ui-datatable-scrollable-body" *ngIf="scrollable">
                <table>
                    <thead class="ui-datatable-scrollable-theadclone">
                        <tr>
                            <th *ngFor="#col of columns" [attr.style]="col.style" [attr.class]="col.styleClass" [ngClass]="{'ui-state-default ui-unselectable-text':true}">
                                <span class="ui-column-title">{{col.headerText}}</span>
                                <span class="ui-sortable-column-icon fa fa-fw fa-sort" *ngIf="col.sortable"></span>
                                <input type="text" pInputText class="ui-column-filter" *ngIf="col.filter"/>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="ui-datatable-data ui-widget-content">
                        <tr #rowElement *ngFor="#rowData of dataToRender;#even = even; #odd = odd;" class="ui-widget-content" (mouseenter)="hoveredRow = $event.target" (mouseleave)="hoveredRow = null"
                                (click)="onRowClick($event, rowData)" [ngClass]="{'ui-datatable-even':even,'ui-datatable-odd':odd,'ui-state-hover': (selectionMode && rowElement == hoveredRow), 'ui-state-highlight': isSelected(rowData)}">
                            <td *ngFor="#col of columns" [attr.style]="col.style" [attr.class]="col.styleClass" [ngClass]="{'ui-editable-column':col.editable}" (click)="switchCellToEditMode($event.target)">
                                <span class="ui-column-title" *ngIf="responsive">{{col.headerText}}</span>
                                <span class="ui-cell-data" (click)="switchCellToEditMode($event.target)">{{rowData[col.field]}}</span>
                                <input type="text" class="ui-cell-editor ui-state-highlight" *ngIf="col.editable" [(ngModel)]="rowData[col.field]" (blur)="switchCellToViewMode($event.target)" (keydown)="onCellEditorKeydown($event)"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p-paginator [rows]="rows" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" (onPageChange)="paginate($event)" *ngIf="paginator"></p-paginator>
            <div class="ui-datatable-footer ui-widget-header" *ngIf="footer">
                <ng-content select="footer"></ng-content>
            </div>
        </div>
    `,
    directives: [Paginator,InputText]
})
export class DataTable implements AfterViewInit {

    @Input() columns: Column[];

    @Input() paginator: boolean;

    @Input() rows: number;

    @Input() totalRecords: number;

    @Input() pageLinks: number = 5;

    @Input() responsive: boolean;

    @Input() selectionMode: string;

    @Input() selection: any;

    @Output() selectionChange: EventEmitter<any> = new EventEmitter();

    @Input() editable: boolean;

    @Output() onRowSelect: EventEmitter<any> = new EventEmitter();

    @Output() onRowUnselect: EventEmitter<any> = new EventEmitter();

    @Input() filterDelay: number = 300;

    @Input() lazy: boolean;

    @Input() resizableColumns: boolean;

    @Input() columnResizeMode: string;

    @Output() onColResize: EventEmitter<any> = new EventEmitter();

    @Input() reorderableColumns: boolean;

    @Output() onColReorder: EventEmitter<any> = new EventEmitter();

    @Input() scrollable: boolean;

    @Input() scrollHeight: any;

    @Input() scrollWidth: any;

    @Input() headerRows: any;
    
    @Input() footerRows: any;

    @Input() style: string;

    @Input() styleClass: string;
    
    @ContentChild(Header) header;

    @ContentChild(Footer) footer;

    private _value: any[];

    private dataToRender: any[];

    private first: number = 0;

    private sortField: string;

    private sortOrder: number;

    private filterTimeout: any;

    private filterMetadata: any = {};

    private filteredValue: any[];

    constructor(private el: ElementRef) {

    }

    ngAfterViewInit() {
        if(this.resizableColumns) {
            this.initResizableColumns();
        }

        if(this.reorderableColumns) {
            this.initColumnReordering();
        }

        if(this.scrollable) {
            this.initScrolling();
        }
    }

    @Input() get value(): any[] {
        return this._value;
    }

    set value(val:any[]) {
        this._value = val;
        this.totalRecords = this._value ? this._value.length: 0;
        this.updateDataToRender(this._value);
    }

    paginate(event) {
        this.first = event.first;
        this.rows = event.rows;
        this.updateDataToRender(this._value);
    }

    updateDataToRender(datasource) {
        if(this.paginator && datasource) {
            this.dataToRender = [];
            for(let i = this.first; i < (this.first + this.rows); i++) {
                if(i >= datasource.length) {
                    break;
                }

                this.dataToRender.push(datasource[i]);
            }
        }
        else {
            this.dataToRender = datasource;
        }
    }

    sort(column: Column) {
        if(!column.sortable) {
            return;
        }

        if(this._value) {
            this.sortOrder = (this.sortField === column.field)  ? this.sortOrder * -1 : 1;
            this.sortField = column.field;

            this._value.sort((data1, data2) => {
                let value1 = data1[this.sortField],
                value2 = data2[this.sortField],
                result = null;

                if (value1 instanceof String && value2 instanceof String)
                    result = value1.localeCompare(value2);
                else
                    result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

                return (this.sortOrder * result);
            });

            this.first = 0;

            if(this.hasFilter())
                this.filter();
            else
                this.updateDataToRender(this._value);
        }
    }

    onRowClick(event, rowData) {
        if(!this.selectionMode) {
            return;
        }

        let selectionIndex = this.findIndexInSelection(rowData),
        selected = selectionIndex != -1;

        if(selected && event.metaKey) {
            if(this.isSingleSelectionMode()) {
                this.selection = null;
                this.selectionChange.next(null);
            }
            else {
                this.selection.splice(selectionIndex,1);
                this.selectionChange.next(this.selection);
            }

            this.onRowUnselect.next({originalEvent: event, data: rowData});
        }
        else {
            if(this.isSingleSelectionMode()) {
                this.selection = rowData;
                this.selectionChange.next(rowData);
            }
            else if(this.isMultipleSelectionMode()) {
                this.selection = (!event.metaKey) ? [] : this.selection||[];
                this.selection.push(rowData);
                this.selectionChange.next(this.selection);
            }

            this.onRowSelect.next({originalEvent: event, data: rowData});
        }
    }

    isSingleSelectionMode() {
        return this.selectionMode === 'single';
    }

    isMultipleSelectionMode() {
        return this.selectionMode === 'multiple';
    }

    findIndexInSelection(rowData: any) {
        let index: number = -1;

        if(this.selectionMode && this.selection) {
            if(this.isSingleSelectionMode()) {
                index = (this.selection == rowData) ? 0 : - 1;
            }
            else if(this.isMultipleSelectionMode()) {
                for(let i = 0; i  < this.selection.length; i++) {
                    if(this.selection[i] == rowData) {
                        index = i;
                        break;
                    }
                }
            }
        }

        return index;
    }

    isSelected(rowData) {
        return this.findIndexInSelection(rowData) != -1;
    }

    onFilterKeyup(value, field, matchMode) {
        if(this.filterTimeout) {
            clearTimeout(this.filterTimeout);
        }

        this.filterTimeout = setTimeout(() => {
            this.filterMetadata[field] = {value: value, matchMode: matchMode};
            this.filter();
            this.filterTimeout = null;
        }, this.filterDelay);
    }

    filter() {
        if(this.lazy) {
            //TODO
        }
        else {
            this.filteredValue = [];

            for(let i = 0; i < this._value.length; i++) {
                let localMatch = true;

                for(let prop in this.filterMetadata) {
                    if(this.filterMetadata.hasOwnProperty(prop)) {
                        let filterMeta = this.filterMetadata[prop],
                            filterValue = filterMeta.value,
                            filterField = prop,
                            filterMatchMode = filterMeta.matchMode||'startsWith',
                            dataFieldValue = this._value[i][filterField];

                        var filterConstraint = this.filterConstraints[filterMatchMode];
                        if(!filterConstraint(dataFieldValue, filterValue)) {
                            localMatch = false;
                        }

                        if(!localMatch) {
                            break;
                        }
                    }
                }

                if(localMatch) {
                    this.filteredValue.push(this._value[i]);
                }
            }

            if(this.filteredValue.length === this._value.length) {
                this.filteredValue = null;
            }

            if(this.paginator) {
                this.totalRecords = this.filteredValue ? this.filteredValue.length: this.value ? this.value.length: 0;
            }

            this.updateDataToRender(this.filteredValue||this._value);
        }
    }

    hasFilter() {
        let empty = true;
        for(let prop in this.filterMetadata) {
            if(this.filterMetadata.hasOwnProperty(prop)) {
                empty = false;
                break;
            }
        }

        return !empty;
    }

    filterConstraints = {

        startsWith(value, filter): boolean {
            if(filter === undefined || filter === null || filter.trim() === '') {
                return true;
            }

            if(value === undefined || value === null) {
                return false;
            }

            return value.toString().toLowerCase().slice(0, filter.length) === filter;
        },

        contains(value, filter): boolean {
            if(filter === undefined || filter === null || filter.trim() === '') {
                return true;
            }

            if(value === undefined || value === null) {
                return false;
            }

            return value.toString().toLowerCase().indexOf(filter) !== -1;
        },

        endsWith(value, filter): boolean {
            if(filter === undefined || filter === null || filter.trim() === '') {
                return true;
            }

            if(value === undefined || value === null) {
                return false;
            }

            return value.indexOf(filter, value.length - filter.length) !== -1;
        }
    }

    switchCellToEditMode(element: any) {
        if(!this.selectionMode && this.editable) {
            let cell = this.findCell(element);
            cell.classList.add('ui-cell-editing','ui-state-highlight');
            let editor = cell.querySelector('.ui-cell-editor').focus();
        }
    }

    switchCellToViewMode(element: any) {
        if(this.editable) {
            let cell = this.findCell(element);
            cell.classList.remove('ui-cell-editing','ui-state-highlight');
        }
    }

    onCellEditorKeydown(event) {
        if(this.editable) {
            if(event.keyCode == 13) {
                this.switchCellToViewMode(event.target);
            }
        }
    }

    findCell(element) {
        let cell = element;
        while(cell.tagName != 'TD') {
            cell = cell.parentElement;
        }

        return cell;
    }

    initResizableColumns() {
        jQuery(this.el.nativeElement.children[0]).puicolresize({
            mode: this.columnResizeMode,
            colResize: (event: Event, ui: PrimeUI.ColResizeEventParams) => {
                this.onColResize.next(ui.element);
            }
        });
    }

    initColumnReordering() {
        jQuery(this.el.nativeElement.children[0]).puicolreorder({
            colReorder: (event: Event, ui: PrimeUI.ColReorderEventParams) => {
                //right
                if(ui.dropSide > 0) {
                    this.columns.splice(ui.dropIndex + 1, 0, this.columns.splice(ui.dragIndex, 1)[0]);
                }
                //left
                else {
                    this.columns.splice(ui.dropIndex, 0, this.columns.splice(ui.dragIndex, 1)[0]);
                }

                this.onColReorder.next(ui);
            }
        });
    }

    initScrolling() {
        jQuery(this.el.nativeElement.children[0]).puitablescroll({
            scrollHeight: this.scrollHeight,
            scrollWidth: this.scrollWidth
        });
    }
    
    hasFooter() {
        if(this.footerRows) {
            return true;
        }
        else {
            for(let i = 0; i  < this.columns.length; i++) {
                if(this.columns[i].footer) {
                    return true;
                }
            }
        }
        return false;
    }
    
    isEmpty() {
        return !this.dataToRender||(this.dataToRender.length == 0);
    }

    ngOnDestroy() {
        if(this.resizableColumns) {
            jQuery(this.el.nativeElement.children[0]).puicolresize('destroy');
        }
    }
}
