import { NgModule, Component, HostListener, OnInit, AfterViewInit, AfterViewChecked, Directive, AfterContentInit, Input, Output, EventEmitter, ElementRef, ContentChildren, TemplateRef, QueryList, ViewChild, NgZone, EmbeddedViewRef, ViewContainerRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Column, PrimeTemplate, SharedModule } from '../common/shared';
import { PaginatorModule } from '../paginator/paginator';
import { DomHandler } from '../dom/domhandler';
import { ObjectUtils } from '../utils/objectutils';
import { SortMeta } from '../common/sortmeta';
import { FilterMetadata } from '../common/filtermetadata';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TableService {

    private sortSource = new Subject<SortMeta|SortMeta[]>();
    private selectionSource = new Subject();
    private contextMenuSource = new Subject<any>();
    private valueSource = new Subject<any>();
    private totalRecordsSource = new Subject<any>();

    sortSource$ = this.sortSource.asObservable();
    selectionSource$ = this.selectionSource.asObservable();
    contextMenuSource$ = this.contextMenuSource.asObservable();
    valueSource$ = this.valueSource.asObservable();
    totalRecordsSource$ = this.totalRecordsSource.asObservable();

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
}

@Component({
    selector: 'p-table',
    template: `
        <div #container [ngStyle]="style" [class]="styleClass"
            [ngClass]="{'ui-table ui-widget': true, 'ui-table-responsive': responsive, 'ui-table-resizable': resizableColumns,
                'ui-table-resizable-fit': (resizableColumns && columnResizeMode === 'fit'),
                'ui-table-hoverable-rows': (rowHover||selectionMode), 'ui-table-auto-layout': autoLayout}">
            <div class="ui-table-loading ui-widget-overlay" *ngIf="loading"></div>
            <div class="ui-table-loading-content" *ngIf="loading">
                <i [class]="'fa fa-spin fa-2x ' + loadingIcon"></i>
            </div>
            <div *ngIf="captionTemplate" class="ui-table-caption ui-widget-header">
                <ng-container *ngTemplateOutlet="captionTemplate"></ng-container>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" styleClass="ui-paginator-top" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'top' || paginatorPosition =='both')"
                [templateLeft]="paginatorLeftTemplate" [templateRight]="paginatorRightTemplate" [dropdownAppendTo]="paginatorDropdownAppendTo"></p-paginator>
            
            <div class="ui-table-wrapper" *ngIf="!scrollable">
                <table #table>
                    <ng-container *ngTemplateOutlet="colGroupTemplate; context {$implicit: columns}"></ng-container>
                    <thead class="ui-table-thead">
                        <ng-container *ngTemplateOutlet="headerTemplate; context: {$implicit: columns}"></ng-container>
                    </thead>
                    <tfoot class="ui-table-tfoot">
                        <ng-container *ngTemplateOutlet="footerTemplate; context {$implicit: columns}"></ng-container>
                    </tfoot>
                    <tbody class="ui-table-tbody" [pTableBody]="columns" [pTableBodyTemplate]="bodyTemplate"></tbody>
                </table>
            </div>

            <div class="ui-table-scrollable-wrapper" *ngIf="scrollable">
               <div class="ui-table-frozen-view" *ngIf="frozenColumns||frozenBodyTemplate" [pScrollableView]="frozenColumns" [frozen]="true" [ngStyle]="{width: frozenWidth}" [scrollHeight]="scrollHeight"></div>
               <div [pScrollableView]="columns" [frozen]="false" [scrollHeight]="scrollHeight"></div>
            </div>
            
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" styleClass="ui-paginator-bottom" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')"
                [templateLeft]="paginatorLeftTemplate" [templateRight]="paginatorRightTemplate" [dropdownAppendTo]="paginatorDropdownAppendTo"></p-paginator>
            <div *ngIf="summaryTemplate" class="ui-table-summary ui-widget-header">
                <ng-container *ngTemplateOutlet="summaryTemplate"></ng-container>
            </div>

            <div #resizeHelper class="ui-column-resizer-helper ui-state-highlight" style="display:none" *ngIf="resizableColumns"></div>

            <span #reorderIndicatorUp class="fa fa-arrow-down ui-table-reorder-indicator-up" *ngIf="reorderableColumns"></span>
            <span #reorderIndicatorDown class="fa fa-arrow-up ui-table-reorder-indicator-down" *ngIf="reorderableColumns"></span>
        </div>
    `,
    providers: [DomHandler, ObjectUtils, TableService]
})
export class Table implements OnInit, AfterContentInit {
    
    @Input() columns: any[];

    @Input() frozenColumns: any[];

    @Input() frozenValue: any[];

    @Input() style: any;

    @Input() styleClass: string;

    @Input() paginator: boolean;

    @Input() rows: number;

    @Input() first: number = 0;

    @Input() pageLinks: number = 5;

    @Input() rowsPerPageOptions: number[];

    @Input() alwaysShowPaginator: boolean = true;

    @Input() paginatorPosition: string = 'bottom';

    @Input() paginatorDropdownAppendTo: any;

    @Input() defaultSortOrder: number = 1;

    @Input() sortMode: string = 'single';
    
    @Input() resetPageOnSort: boolean = true;

    @Input() selectionMode: string;

    @Output() selectionChange: EventEmitter<any> = new EventEmitter();

    @Input() contextMenuSelection: any;

    @Output() contextMenuSelectionChange: EventEmitter<any> = new EventEmitter();

    @Input() dataKey: string;

    @Input() metaKeySelection: boolean;

    @Input() rowTrackBy: Function = (index: number, item: any) => item;

    @Input() lazy: boolean = false;

    @Input() compareSelectionBy: string = 'deepEquals';

    @Input() csvSeparator: string = ',';

    @Input() exportFilename: string = 'download';

    @Input() filters: { [s: string]: FilterMetadata; } = {};

    @Input() globalFilterFields: string[];

    @Input() filterDelay: number = 300;

    @Input() expandedRowKeys: { [s: string]: number; } = {};

    @Input() rowExpandMode: string = 'multiple';

    @Input() scrollable: boolean;

    @Input() scrollHeight: string;

    @Input() virtualScroll: boolean;

    @Input() virtualScrollDelay: number = 500;

    @Input() virtualRowHeight: number = 28;

    @Input() frozenWidth: string;

    @Input() responsive: boolean;

    @Input() contextMenu: any;
    
    @Input() resizableColumns: boolean;

    @Input() columnResizeMode: string = 'fit';

    @Input() reorderableColumns: boolean;

    @Input() loading: boolean;

    @Input() loadingIcon: string = 'fa fa-spin fa-2x fa-circle-o-notch';

    @Input() rowHover: boolean;

    @Input() customSort: boolean;

    @Input() autoLayout: boolean;
    
    @Input() exportFunction ;

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

    @ViewChild('container') containerViewChild: ElementRef;

    @ViewChild('resizeHelper') resizeHelperViewChild: ElementRef;

    @ViewChild('reorderIndicatorUp') reorderIndicatorUpViewChild: ElementRef;

    @ViewChild('reorderIndicatorDown') reorderIndicatorDownViewChild: ElementRef;

    @ViewChild('table') tableViewChild: ElementRef;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;

    _value: any[] = [];

    _totalRecords: number = 0;

    filteredValue: any[];

    headerTemplate: TemplateRef<any>;

    bodyTemplate: TemplateRef<any>;

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

    _multiSortMeta: SortMeta[];

    _sortField: string;

    _sortOrder: number = 1;

    virtualScrollTimer: any;
    
    virtualScrollCallback: Function;

    preventSelectionSetterPropagation: boolean;

    _selection: any;

    anchorRowIndex: number;
    
    rangeRowIndex: number;

    filterTimeout: any;

    initialized: boolean;

    rowTouched: boolean;

    constructor(public el: ElementRef, public domHandler: DomHandler, public objectUtils: ObjectUtils, public zone: NgZone, public tableService: TableService) {}

    ngOnInit() {
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
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
            }
        });
    }

    @Input() get value(): any[] {
        return this._value;
    }
    set value(val: any[]) {
        this._value = val;
        
        if (!this.lazy) {
            this.totalRecords = (this._value ? this._value.length : 0);

            if (this.sortMode == 'single' && this.sortField)
                this.sortSingle();
            else if (this.sortMode == 'multiple' && this.multiSortMeta)
                this.sortMultiple();
            else if(this.hasFilter())       //sort already filters
                this._filter();
        }

        if(this.virtualScroll && this.virtualScrollCallback) {
            this.virtualScrollCallback();
        }

        this.tableService.onValueChange(val);
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

        //avoid triggering lazy load prior to lazy initialization at onInit
        if ( !this.lazy || this.initialized ) {
            if (this.sortMode === 'single') {
                this.sortSingle();
            }
        }
    }

    @Input() get sortOrder(): number {
        return this._sortOrder;
    }
    set sortOrder(val: number) {
        this._sortOrder = val;

         //avoid triggering lazy load prior to lazy initialization at onInit
        if ( !this.lazy || this.initialized ) {
            if (this.sortMode === 'single') {
                this.sortSingle();
            }
        }
    }

    @Input() get multiSortMeta(): SortMeta[] {
        return this._multiSortMeta;
    }

    set multiSortMeta(val: SortMeta[]) {
        this._multiSortMeta = val;
        if (this.sortMode === 'multiple') {
            this.sortMultiple();
        }
    }

    @Input() get selection(): any {
        return this._selection;
    }

    set selection(val: any) {
        this._selection = val;

        if(!this.preventSelectionSetterPropagation) {
            this.updateSelectionKeys();
            this.tableService.onSelectionChange();
        }
        this.preventSelectionSetterPropagation = false;
    }

    updateSelectionKeys() {
        if(this.dataKey && this._selection) {
            this.selectionKeys = {};
            if(Array.isArray(this._selection)) {
                for(let data of this._selection) {
                    this.selectionKeys[String(this.objectUtils.resolveFieldData(data, this.dataKey))] = 1;
                }
            }
            else {
                this.selectionKeys[String(this.objectUtils.resolveFieldData(this._selection, this.dataKey))] = 1;
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

        this.tableService.onValueChange(this.value);
    }

    sort(event) {
        let originalEvent = event.originalEvent;

        if(this.sortMode === 'single') {
            this._sortOrder = (this.sortField === event.field) ? this.sortOrder * -1 : this.defaultSortOrder;
            this._sortField = event.field;
            this.sortSingle();
        }
        if (this.sortMode === 'multiple') {
            let metaKey = originalEvent.metaKey || originalEvent.ctrlKey;
            let sortMeta = this.getSortMeta(event.field);

            if (sortMeta) {
                if (!metaKey) {
                    this._multiSortMeta = [{ field: event.field, order: sortMeta.order * -1 }]
                }
                else {
                    sortMeta.order = sortMeta.order * -1;
                }
            }
            else {
                if (!metaKey || !this.multiSortMeta) {
                    this._multiSortMeta = [];
                }
                this.multiSortMeta.push({ field: event.field, order: this.defaultSortOrder });
            }
            
            this.sortMultiple();
        }
    }

    sortSingle() {
        if(this.sortField && this.sortOrder) {
            if(this.resetPageOnSort) {
                this.first = 0;
            }

            if(this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else if (this.value) {
                if(this.customSort) {
                    this.sortFunction.emit({
                        data: this.value,
                        mode: this.sortMode,
                        field: this.sortField,
                        order: this.sortOrder
                    });
                }
                else {
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
                
                if(this.hasFilter()) {
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
        if(this.multiSortMeta) {
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else if (this.value) {
                if(this.customSort) {
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
                }

                if(this.hasFilter()) {
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
        let value1 = this.objectUtils.resolveFieldData(data1, multiSortMeta[index].field);
        let value2 = this.objectUtils.resolveFieldData(data2, multiSortMeta[index].field);
        let result = null;

        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
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
        if(this.sortMode === 'single') {
            return (this.sortField && this.sortField === field);
        }
        else if(this.sortMode === 'multiple') {
            let sorted = false;
            if(this.multiSortMeta) {
                for(let i = 0; i < this.multiSortMeta.length; i++) {
                    if(this.multiSortMeta[i].field == field) {
                        sorted = true;
                        break;
                    }
                }
            }
            return sorted;
        }
    }

    handleRowClick(event) {
        let targetNode = (<HTMLElement> event.originalEvent.target).nodeName;
        if (targetNode == 'INPUT' || targetNode == 'BUTTON' || targetNode == 'A' || (this.domHandler.hasClass(event.originalEvent.target, 'ui-clickable'))) {
            return;
        }

        if(this.selectionMode) {
            this.preventSelectionSetterPropagation = true;
            if(this.isMultipleSelectionMode() && event.originalEvent.shiftKey && this.anchorRowIndex != null) {
                this.domHandler.clearSelection();
                if(this.rangeRowIndex != null) {
                    this.clearSelectionRange(event.originalEvent);
                }
                
                this.rangeRowIndex = event.rowIndex;
                this.selectRange(event.originalEvent, event.rowIndex);
            }
            else {
                let rowData = event.rowData;
                let selected = this.isSelected(rowData);
                let metaSelection = this.rowTouched ? false : this.metaKeySelection;
                let dataKeyValue = this.dataKey ? String(this.objectUtils.resolveFieldData(rowData, this.dataKey)) : null;
                this.anchorRowIndex = event.rowIndex;
                this.rangeRowIndex = event.rowIndex;

                if(metaSelection) {
                    let metaKey = event.originalEvent.metaKey||event.originalEvent.ctrlKey;
                    
                    if(selected && metaKey) {
                        if(this.isSingleSelectionMode()) {
                            this._selection = null;
                            this.selectionKeys = {};
                            this.selectionChange.emit(null);
                        }
                        else {
                            let selectionIndex = this.findIndexInSelection(rowData);
                            this._selection = this.selection.filter((val,i) => i!=selectionIndex);
                            this.selectionChange.emit(this.selection);
                            if(dataKeyValue) {
                                delete this.selectionKeys[dataKeyValue];
                            }
                        }
                        
                        this.onRowUnselect.emit({originalEvent: event.originalEvent, data: rowData, type: 'row'});
                    }
                    else {
                        if(this.isSingleSelectionMode()) {
                            this._selection = rowData;
                            this.selectionChange.emit(rowData);
                            if(dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                        else if(this.isMultipleSelectionMode()) {
                            if(metaKey) {
                                this._selection = this.selection||[];
                            }
                            else {
                                this._selection = [];
                                this.selectionKeys = {};
                            }

                            this._selection = [...this.selection,rowData];
                            this.selectionChange.emit(this.selection);
                            if(dataKeyValue) {
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
        }

        this.rowTouched = false;
    }

    handleRowTouchEnd(event) {
        this.rowTouched = true;
    }

    handleRowRightClick(event) {
        if (this.contextMenu) {
            this.contextMenuSelection = event.rowData;
            this.contextMenuSelectionChange.emit(event.rowData);
            this.onContextMenuSelect.emit({ originalEvent: event.originalEvent, data: event.rowData });
            this.contextMenu.show(event.originalEvent);
            this.tableService.onContextMenu(event.rowData);
        }
    }

    selectRange(event: MouseEvent, rowIndex: number) {
        let rangeStart, rangeEnd;
        
        if(this.anchorRowIndex > rowIndex) {
            rangeStart = rowIndex;
            rangeEnd = this.anchorRowIndex;
        }
        else if(this.anchorRowIndex < rowIndex) {
            rangeStart = this.anchorRowIndex;
            rangeEnd = rowIndex;
        }
        else {
            rangeStart = rowIndex;
            rangeEnd = rowIndex;
        }
        
        for(let i = rangeStart; i <= rangeEnd; i++) {
            let rangeRowData = this.value[i];
            if(!this.isSelected(rangeRowData)) {
                this._selection = [...this.selection, rangeRowData];
                let dataKeyValue: string = this.dataKey ? String(this.objectUtils.resolveFieldData(rangeRowData, this.dataKey)) : null;
                if(dataKeyValue) {
                    this.selectionKeys[dataKeyValue] = 1;
                }
                this.onRowSelect.emit({originalEvent: event, data: rangeRowData, type: 'row'});
            }
        }

        this.selectionChange.emit(this.selection);
    }

    clearSelectionRange(event: MouseEvent) {
        let rangeStart, rangeEnd;

        if(this.rangeRowIndex > this.anchorRowIndex) {
            rangeStart = this.anchorRowIndex;
            rangeEnd = this.rangeRowIndex;
        }
        else if(this.rangeRowIndex < this.anchorRowIndex) {
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
            let dataKeyValue: string = this.dataKey ? String(this.objectUtils.resolveFieldData(rangeRowData, this.dataKey)) : null;
            if(dataKeyValue) {
                delete this.selectionKeys[dataKeyValue];
            }
            this.onRowUnselect.emit({originalEvent: event, data: rangeRowData, type: 'row'});
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

    toggleRowWithRadio(event: Event, rowData:any) {
        this.preventSelectionSetterPropagation = true;

        if(this.selection != rowData) {
            this._selection = rowData;
            this.selectionChange.emit(this.selection);
            this.onRowSelect.emit({originalEvent: event, data: rowData, type: 'radiobutton'});
            
            if(this.dataKey) {
                this.selectionKeys = {};
                this.selectionKeys[String(this.objectUtils.resolveFieldData(rowData, this.dataKey))] = 1;
            }
        }
        else {
            this._selection = null;
            this.selectionChange.emit(this.selection);
            this.onRowUnselect.emit({originalEvent: event, data: rowData, type: 'radiobutton'});
        }

        this.tableService.onSelectionChange();
    }

    toggleRowWithCheckbox(event, rowData: any) {
        this.selection = this.selection||[];
        let selected = this.isSelected(rowData);
        let dataKeyValue = this.dataKey ? String(this.objectUtils.resolveFieldData(rowData, this.dataKey)) : null;
        this.preventSelectionSetterPropagation = true;

        if (selected) {
            let selectionIndex = this.findIndexInSelection(rowData);
            this._selection = this.selection.filter((val, i) => i != selectionIndex);
            this.selectionChange.emit(this.selection);
            this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'checkbox' });
            if (dataKeyValue) {
                delete this.selectionKeys[dataKeyValue];
            }
        }
        else {
            this._selection = this.selection ? [...this.selection, rowData] : [rowData];
            this.selectionChange.emit(this.selection);
            this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'checkbox' });
            if (dataKeyValue) {
                this.selectionKeys[dataKeyValue] = 1;
            }
        }
        
        this.tableService.onSelectionChange();
    }

    toggleRowsWithCheckbox(event: Event, check: boolean) {
        this._selection = check ? this.filteredValue ? this.filteredValue.slice(): this.value.slice() : [];
        this.preventSelectionSetterPropagation = true;
        this.updateSelectionKeys();
        this.selectionChange.emit(this._selection);
        this.tableService.onSelectionChange();
        this.onHeaderCheckboxToggle.emit({originalEvent: event, checked: check});
    }

    equals(data1, data2) {
        return this.compareSelectionBy === 'equals' ? (data1 === data2) : this.objectUtils.equals(data1, data2, this.dataKey);
    }

    filter(value, field, matchMode) {
        if(this.filterTimeout) {
            clearTimeout(this.filterTimeout);
        }

        this.filterTimeout = setTimeout(() => {
            if (!this.isFilterBlank(value))
                this.filters[field] = { value: value, matchMode: matchMode };
            else if (this.filters[field])
                delete this.filters[field];

            this._filter();
            this.filterTimeout = null;
        }, this.filterDelay);
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
        this.first = 0;

        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            if (!this.value) {
                return;
            }

            if(!this.hasFilter()) {
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
                            let filterMeta = this.filters[prop];
                            let filterField = prop;
                            let filterValue = filterMeta.value;
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
                    }
    
                    if (this.filters['global'] && !globalMatch && globalFilterFieldsArray) {
                        for(let j = 0; j < globalFilterFieldsArray.length; j++) {
                            let globalFilterField = globalFilterFieldsArray[j].field||globalFilterFieldsArray[j];
                            globalMatch = this.filterConstraints[this.filters['global'].matchMode](this.objectUtils.resolveFieldData(this.value[i], globalFilterField), this.filters['global'].value);
                            
                            if(globalMatch) {
                                break;
                            }
                        }
                    }
    
                    let matches: boolean;
                    if(this.filters['global']) {
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
            rows: this.virtualScroll ? this.rows * 2: this.rows,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            filters: this.filters,
            globalFilter: this.filters && this.filters['global'] ? this.filters['global'].value : null,
            multiSortMeta: this.multiSortMeta
        };
    }

    public reset() {
        this._sortField = null;
        this._sortOrder = 1;
        this._multiSortMeta = null;
        this.tableService.onSort(null);
        
        this.filteredValue = null;
        this.filters = {};
        
        this.first = 0;
        
        if(this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            this.totalRecords = (this._value ? this._value.length : 0);
        }
    }

    public exportCSV(options?: any) {
        let data = this.filteredValue || this.value;
        let csv = '\ufeff';

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
                        if (this.scrollable) {
                            let scrollableBodyTable = this.domHandler.findSingle(this.el.nativeElement, 'table.ui-table-scrollable-body-table');
                            let scrollableHeaderTable = this.domHandler.findSingle(this.el.nativeElement, 'table.ui-table-scrollable-header-table');
                            let scrollableFooterTable = this.domHandler.findSingle(this.el.nativeElement, 'table.ui-table-scrollable-footer-table');
                            let resizeColumnIndex = this.domHandler.index(column);

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
                if (this.scrollable) {
                    let scrollableBodyTable = this.domHandler.findSingle(this.el.nativeElement, 'table.ui-table-scrollable-body-table');
                    let scrollableHeaderTable = this.domHandler.findSingle(this.el.nativeElement, 'table.ui-table-scrollable-header-table');
                    let scrollableFooterTable = this.domHandler.findSingle(this.el.nativeElement, 'table.ui-table-scrollable-footer-table');
                    scrollableBodyTable.style.width = scrollableBodyTable.offsetWidth + delta + 'px';
                    scrollableHeaderTable.style.width = scrollableHeaderTable.offsetWidth + delta + 'px';
                    if(scrollableFooterTable) {
                        scrollableFooterTable.style.width = scrollableHeaderTable.offsetWidth + delta + 'px';
                    }
                    let resizeColumnIndex = this.domHandler.index(column);

                    this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, null);
                    this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, null);
                    this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, null);
                }
                else {
                    this.tableViewChild.nativeElement.style.width = this.tableViewChild.nativeElement.offsetWidth + delta + 'px';
                    column.style.width = newColumnWidth + 'px';
                    let containerWidth = this.tableViewChild.nativeElement.style.width;
                    this.containerViewChild.nativeElement.style.width = containerWidth + 'px';
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

    resizeColGroup(table, resizeColumnIndex, newColumnWidth, nextColumnWidth) {
        if(table) {
            let colGroup = table.children[0].nodeName === 'COLGROUP' ? table.children[0] : null;

            if(colGroup) {
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
            let dragIndex = this.domHandler.indexWithinGroup(this.draggedColumn, 'preorderablecolumn');
            let dropIndex = this.domHandler.indexWithinGroup(dropColumn, 'preorderablecolumn');
            let allowDrop = (dragIndex != dropIndex);
            if (allowDrop && ((dropIndex - dragIndex == 1 && this.dropPosition === -1) || (dragIndex - dropIndex == 1 && this.dropPosition === 1))) {
                allowDrop = false;
            }

            if (allowDrop) {
                this.objectUtils.reorderArray(this.columns, dragIndex, dropIndex);

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

    onRowDragStart(event, index) {
        this.rowDragging = true;
        this.draggedRowIndex = index;
        event.dataTransfer.setData('text', 'b');    // For firefox
    }

    onRowDragOver(event, index, rowElement) {
        if (this.rowDragging && this.draggedRowIndex !== index) {
            let rowY = this.domHandler.getOffset(rowElement).top + this.domHandler.getWindowScrollTop();
            let pageY = event.pageY;
            let rowMidY = rowY + this.domHandler.getOuterHeight(rowElement) / 2;
            let prevRowElement = rowElement.previousElementSibling;
            
            if (pageY < rowMidY) {
                this.domHandler.removeClass(rowElement, 'ui-table-dragpoint-bottom');
    
                this.droppedRowIndex = index;
                if (prevRowElement)
                    this.domHandler.addClass(prevRowElement, 'ui-table-dragpoint-bottom');
                else
                    this.domHandler.addClass(rowElement, 'ui-table-dragpoint-top');
            }
            else {
                if (prevRowElement)
                    this.domHandler.removeClass(prevRowElement, 'ui-table-dragpoint-bottom');
                else
                    this.domHandler.addClass(rowElement, 'ui-table-dragpoint-top');
    
                this.droppedRowIndex = index + 1;
                this.domHandler.addClass(rowElement, 'ui-table-dragpoint-bottom');
            }
        }
    }

    onRowDragLeave(event, rowElement) {
        let prevRowElement = rowElement.previousElementSibling;
        if (prevRowElement) {
            this.domHandler.removeClass(prevRowElement, 'ui-table-dragpoint-bottom');
        }

        this.domHandler.removeClass(rowElement, 'ui-table-dragpoint-bottom');
        this.domHandler.removeClass(rowElement, 'ui-table-dragpoint-top');
    }

    onRowDragEnd(event) {
        this.rowDragging = false;
        this.draggedRowIndex = null;
        this.droppedRowIndex = null;
    }

    onRowDrop(event, rowElement) {
        if (this.droppedRowIndex != null) {
            let dropIndex = (this.draggedRowIndex > this.droppedRowIndex) ? this.droppedRowIndex : (this.droppedRowIndex === 0) ? 0 : this.droppedRowIndex - 1;
            this.objectUtils.reorderArray(this.value, this.draggedRowIndex, dropIndex);

            this.onRowReorder.emit({
                dragIndex: this.draggedRowIndex,
                dropIndex: this.droppedRowIndex
            });
        }
        //cleanup
        this.onRowDragLeave(event, rowElement);
        this.onRowDragEnd(event);
    }

    handleVirtualScroll(event) {
        this.first = (event.page - 1) * this.rows;
        this.virtualScrollCallback = event.callback;
        
        this.zone.run(() => {
            if(this.virtualScrollTimer) {
                clearTimeout(this.virtualScrollTimer);
            }
            
            this.virtualScrollTimer = setTimeout(() => {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }, this.virtualScrollDelay);
        });
    }

    isEmpty() {
        let data = this.filteredValue||this.value;
        return data == null || data.length == 0;
    }

    ngOnDestroy() {
        this.editingCell = null;
        this.initialized = null;
    }
}

@Component({
    selector: '[pTableBody]',
    template: `
        <ng-container *ngIf="!dt.expandedRowTemplate">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="dt.paginator ? ((dt.filteredValue||dt.value) | slice:(dt.lazy ? 0 : dt.first):((dt.lazy ? 0 : dt.first) + dt.rows)) : (dt.filteredValue||dt.value)" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container *ngTemplateOutlet="template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns}"></ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.expandedRowTemplate">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="dt.paginator ? ((dt.filteredValue||dt.value) | slice:(dt.lazy ? 0 : dt.first):((dt.lazy ? 0 : dt.first) + dt.rows)) : (dt.filteredValue||dt.value)" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container *ngIf="dt.isRowExpanded(rowData); else collapsedrow">
                    <ng-container *ngTemplateOutlet="template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, expanded: true}"></ng-container>
                    <ng-container *ngTemplateOutlet="dt.expandedRowTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns}"></ng-container>
                </ng-container>
                <ng-template #collapsedrow>
                    <ng-container *ngTemplateOutlet="template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, expanded: false, columns: columns}"></ng-container>
                </ng-template>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.isEmpty()">
            <ng-container *ngTemplateOutlet="dt.emptyMessageTemplate; context: {$implicit: columns}"></ng-container>
        </ng-container>
    `
})
export class TableBody {

    @Input("pTableBody") columns: Column[];

    @Input("pTableBodyTemplate") template: TemplateRef<any>;

    constructor(public dt: Table) {}
}

@Component({
    selector: '[pScrollableView]',
    template: `
        <div #scrollHeader class="ui-table-scrollable-header ui-widget-header">
            <div #scrollHeaderBox class="ui-table-scrollable-header-box">
                <table class="ui-table-scrollable-header-table">
                    <ng-container *ngTemplateOutlet="frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}"></ng-container>
                    <thead class="ui-table-thead">
                        <ng-container *ngTemplateOutlet="frozen ? dt.frozenHeaderTemplate||dt.headerTemplate : dt.headerTemplate; context {$implicit: columns}"></ng-container>
                    </thead>
                    <tbody class="ui-table-tbody">
                        <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="dt.frozenValue" [ngForTrackBy]="dt.rowTrackBy">
                            <ng-container *ngTemplateOutlet="dt.frozenRowsTemplate; context: {$implicit: rowData, rowIndex: rowIndex, columns: columns}"></ng-container>
                        </ng-template>
                    </tbody>
                </table>
            </div>
        </div>
        <div #scrollBody class="ui-table-scrollable-body">
            <table #scrollTable [ngClass]="{'ui-table-virtual-table': dt.virtualScroll}" class="ui-table-scrollable-body-table">
                <ng-container *ngTemplateOutlet="frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}"></ng-container>
                <tbody class="ui-table-tbody" [pTableBody]="columns" [pTableBodyTemplate]="frozen ? dt.frozenBodyTemplate||dt.bodyTemplate : dt.bodyTemplate"></tbody>
            </table>
            <div #virtualScroller class="ui-table-virtual-scroller"></div>
        </div>
        <div #scrollFooter *ngIf="dt.footerTemplate" class="ui-table-scrollable-footer ui-widget-header">
            <div #scrollFooterBox class="ui-table-scrollable-footer-box">
                <table class="ui-table-scrollable-footer-table">
                    <ng-container *ngTemplateOutlet="frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}"></ng-container>
                    <tfoot class="ui-table-tfoot">
                        <ng-container *ngTemplateOutlet="frozen ? dt.frozenFooterTemplate||dt.footerTemplate : dt.footerTemplate; context {$implicit: columns}"></ng-container>
                    </tfoot>
                </table>
            </div>
        </div>
    `
})
export class ScrollableView implements AfterViewInit,OnDestroy,AfterViewChecked {

    @Input("pScrollableView") columns: Column[];

    @Input() frozen: boolean;

    @ViewChild('scrollHeader') scrollHeaderViewChild: ElementRef;

    @ViewChild('scrollHeaderBox') scrollHeaderBoxViewChild: ElementRef;

    @ViewChild('scrollBody') scrollBodyViewChild: ElementRef;

    @ViewChild('scrollTable') scrollTableViewChild: ElementRef;

    @ViewChild('scrollFooter') scrollFooterViewChild: ElementRef;

    @ViewChild('scrollFooterBox') scrollFooterBoxViewChild: ElementRef;

    @ViewChild('virtualScroller') virtualScrollerViewChild: ElementRef;

    headerScrollListener: Function;

    bodyScrollListener: Function;

    footerScrollListener: Function;

    frozenSiblingBody: Element;

    _scrollHeight: string;

    subscription: Subscription;

    totalRecordsSubscription: Subscription;
    
    initialized: boolean;

    constructor(public dt: Table, public el: ElementRef, public domHandler: DomHandler, public zone: NgZone) {
        this.subscription = this.dt.tableService.valueSource$.subscribe(() => {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    this.alignScrollBar();
                }, 50);
            });
        });

        if (this.dt.virtualScroll) {
            this.totalRecordsSubscription = this.dt.tableService.totalRecordsSource$.subscribe(() => {
                this.zone.runOutsideAngular(() => {
                    setTimeout(() => {
                        this.setVirtualScrollerHeight();
                    }, 50);
                });
            });
        }
        
        this.initialized = false;
     }

    @Input() get scrollHeight(): string {
        return this._scrollHeight;
    }
    set scrollHeight(val: string) {
        this._scrollHeight = val;
        this.setScrollHeight();
    }
    
    ngAfterViewChecked() {
        if(!this.initialized && this.el.nativeElement.offsetParent) {
            this.alignScrollBar();
            this.initialized = true;
        }
    }

    ngAfterViewInit() {
        this.bindEvents();
        this.setScrollHeight();
        this.alignScrollBar();

        if(!this.frozen) {
            if (this.dt.frozenColumns || this.dt.frozenBodyTemplate) {
                this.domHandler.addClass(this.el.nativeElement, 'ui-table-unfrozen-view');
            }

            if(this.dt.frozenWidth) {
                this.el.nativeElement.style.left = this.dt.frozenWidth;
                this.el.nativeElement.style.width = 'calc(100% - ' + this.dt.frozenWidth + ')';
            }

            let frozenView = this.el.nativeElement.previousElementSibling;
            if (frozenView) {
                this.frozenSiblingBody = this.domHandler.findSingle(frozenView, '.ui-table-scrollable-body');
            }
        }
        else {
            this.scrollBodyViewChild.nativeElement.style.paddingBottom = this.domHandler.calculateScrollbarWidth() + 'px';
        }

        if(this.dt.virtualScroll) {
            this.setVirtualScrollerHeight();
        }
    }

    bindEvents() {
        this.zone.runOutsideAngular(() => {
            let scrollBarWidth = this.domHandler.calculateScrollbarWidth();

            if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
                this.headerScrollListener = this.onHeaderScroll.bind(this);
                this.scrollHeaderBoxViewChild.nativeElement.addEventListener('scroll', this.headerScrollListener);
            }

            if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
                this.footerScrollListener = this.onFooterScroll.bind(this);
                this.scrollFooterViewChild.nativeElement.addEventListener('scroll', this.footerScrollListener);
            }

            if(!this.frozen) {
                this.bodyScrollListener = this.onBodyScroll.bind(this);
                this.scrollBodyViewChild.nativeElement.addEventListener('scroll', this.bodyScrollListener);
            }
        });
    }

    unbindEvents() {
        if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
            this.scrollHeaderBoxViewChild.nativeElement.removeEventListener('scroll', this.headerScrollListener);
        }

        if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
            this.scrollFooterViewChild.nativeElement.removeEventListener('scroll', this.footerScrollListener);
        }

        this.scrollBodyViewChild.nativeElement.addEventListener('scroll', this.bodyScrollListener);
    }

    onHeaderScroll(event) {
        this.scrollHeaderViewChild.nativeElement.scrollLeft = 0;
    }

    onFooterScroll(event) {
        this.scrollFooterViewChild.nativeElement.scrollLeft = 0;
    }

    onBodyScroll(event) {
        if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
            this.scrollHeaderBoxViewChild.nativeElement.style.marginLeft = -1 * this.scrollBodyViewChild.nativeElement.scrollLeft + 'px';
        }

        if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
            this.scrollFooterBoxViewChild.nativeElement.style.marginLeft = -1 * this.scrollBodyViewChild.nativeElement.scrollLeft + 'px';
        }

        if (this.frozenSiblingBody) {
            this.frozenSiblingBody.scrollTop = this.scrollBodyViewChild.nativeElement.scrollTop;
        }

        if(this.dt.virtualScroll) {
            let viewport = this.domHandler.getOuterHeight(this.scrollBodyViewChild.nativeElement);
            let tableHeight = this.domHandler.getOuterHeight(this.scrollTableViewChild.nativeElement);
            let pageHeight = this.dt.virtualRowHeight * this.dt.rows;
            let virtualTableHeight = this.domHandler.getOuterHeight(this.virtualScrollerViewChild.nativeElement);
            let pageCount = (virtualTableHeight / pageHeight)||1;
            let scrollBodyTop = this.scrollTableViewChild.nativeElement.style.top||'0';

            if((this.scrollBodyViewChild.nativeElement.scrollTop + viewport > parseFloat(scrollBodyTop) + tableHeight) || (this.scrollBodyViewChild.nativeElement.scrollTop < parseFloat(scrollBodyTop))) {
                let page = Math.floor((this.scrollBodyViewChild.nativeElement.scrollTop * pageCount) / (this.scrollBodyViewChild.nativeElement.scrollHeight)) + 1;
                this.dt.handleVirtualScroll({
                    page: page,
                    callback: () => {
                        this.scrollTableViewChild.nativeElement.style.top = ((page - 1) * pageHeight) + 'px';

                        if (this.frozenSiblingBody) {
                            (<HTMLElement> this.frozenSiblingBody.children[0]).style.top = this.scrollTableViewChild.nativeElement.style.top;
                        }
                    }
                });
            }
        }
    }

    setScrollHeight() {
        if(this.scrollHeight && this.scrollBodyViewChild && this.scrollBodyViewChild.nativeElement) {
            if(this.scrollHeight.indexOf('%') !== -1) {
                this.scrollBodyViewChild.nativeElement.style.visibility = 'hidden';
                this.scrollBodyViewChild.nativeElement.style.height = '100px';     //temporary height to calculate static height
                let containerHeight = this.domHandler.getOuterHeight(this.dt.el.nativeElement.children[0]);
                let relativeHeight = this.domHandler.getOuterHeight(this.dt.el.nativeElement.parentElement) * parseInt(this.scrollHeight) / 100;
                let staticHeight = containerHeight - 100;   //total height of headers, footers, paginators
                let scrollBodyHeight = (relativeHeight - staticHeight);

                if(this.frozen) {
                    scrollBodyHeight -= this.domHandler.calculateScrollbarWidth();
                }
                
                this.scrollBodyViewChild.nativeElement.style.height = 'auto';
                this.scrollBodyViewChild.nativeElement.style.maxHeight = scrollBodyHeight + 'px';
                this.scrollBodyViewChild.nativeElement.style.visibility = 'visible';
            }
            else {
                if(this.frozen)
                    this.scrollBodyViewChild.nativeElement.style.maxHeight = (parseInt(this.scrollHeight) - this.domHandler.calculateScrollbarWidth()) + 'px';
                else
                    this.scrollBodyViewChild.nativeElement.style.maxHeight = this.scrollHeight;
            }
        }
    }

    setVirtualScrollerHeight() {
        if(this.virtualScrollerViewChild.nativeElement) {
            this.virtualScrollerViewChild.nativeElement.style.height = this.dt.totalRecords * this.dt.virtualRowHeight + 'px';
        }
    }

    hasVerticalOverflow() {
        return this.domHandler.getOuterHeight(this.scrollTableViewChild.nativeElement) > this.domHandler.getOuterHeight(this.scrollBodyViewChild.nativeElement);
    }

    alignScrollBar() {
        if(!this.frozen) {
            let scrollBarWidth = this.hasVerticalOverflow() ? this.domHandler.calculateScrollbarWidth() : 0;
            this.scrollHeaderBoxViewChild.nativeElement.style.marginRight = scrollBarWidth + 'px';
            
            if(this.scrollFooterBoxViewChild && this.scrollFooterBoxViewChild.nativeElement) {
                this.scrollFooterBoxViewChild.nativeElement.style.marginRight = scrollBarWidth + 'px';
            }
        }
        this.initialized = false;
    }

    ngOnDestroy() {
        this.unbindEvents();

        this.frozenSiblingBody = null;

        if(this.subscription) {
            this.subscription.unsubscribe();
        }

        if(this.totalRecordsSubscription) {
            this.totalRecordsSubscription.unsubscribe();
        }
        this.initialized = false;
    }
}

@Directive({
    selector: '[pSortableColumn]',
    providers: [DomHandler],
    host: {
        '[class.ui-sortable-column]': 'true',
        '[class.ui-state-highlight]': 'sorted'
    }
})
export class SortableColumn implements OnInit, OnDestroy {

    @Input("pSortableColumn") field: string;

    @Input() pSortableColumnDisabled: boolean;

    sorted: boolean;
    
    subscription: Subscription;

    constructor(public dt: Table, public domHandler: DomHandler) {
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
    }

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
        if (this.isEnabled()) {
            this.updateSortState();
            this.dt.sort({
                originalEvent: event,
                field: this.field
            });

            this.domHandler.clearSelection();
        }
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
        <a href="#" (click)="onClick($event)" [attr.aria-label]=" sortOrder === 1 ? ariaLabelAsc : sortOrder === -1 ? ariaLabelDesc : '' ">
            <i class="ui-sortable-column-icon fa fa-fw fa-sort" [ngClass]="{'fa-sort-asc': sortOrder === 1, 'fa-sort-desc': sortOrder === -1}"></i>
        </a>
    `
})
export class SortIcon implements OnInit, OnDestroy {

    @Input() field: string;
    
    @Input() ariaLabelDesc: string;
    
    @Input() ariaLabelAsc: string;

    subscription: Subscription;

    sortOrder: number;

    constructor(public dt: Table) {
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
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

@Directive({
    selector: '[pSelectableRow]',
    providers: [DomHandler],
    host: {
        '[class.ui-state-highlight]': 'selected'
    }
})
export class SelectableRow implements OnInit, OnDestroy {

    @Input("pSelectableRow") data: any;

    @Input("pSelectableRowIndex") index: number;

    @Input() pSelectableRowDisabled: boolean;

    selected: boolean;

    subscription: Subscription;

    constructor(public dt: Table, public domHandler: DomHandler, public tableService: TableService) {
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
    providers: [DomHandler],
    host: {
        '[class.ui-state-highlight]': 'selected'
    }
})
export class SelectableRowDblClick implements OnInit, OnDestroy {

    @Input("pSelectableRowDblClick") data: any;

    @Input("pSelectableRowIndex") index: number;

    @Input() pSelectableRowDisabled: boolean;

    selected: boolean;

    subscription: Subscription;

    constructor(public dt: Table, public domHandler: DomHandler, public tableService: TableService) {
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
        '[class.ui-contextmenu-selected]': 'selected'
    }
})
export class ContextMenuRow {

    @Input("pContextMenuRow") data: any;

    @Input() pContextMenuRowDisabled: boolean;

    selected: boolean;

    subscription: Subscription;

    constructor(public dt: Table, public tableService: TableService) {
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
                rowData: this.data
            });
    
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

    constructor(public dt: Table, public el: ElementRef, public domHandler: DomHandler, public zone: NgZone) { }

    ngAfterViewInit() {
        if (this.isEnabled()) {
            this.domHandler.addClass(this.el.nativeElement, 'ui-resizable-column');
            this.resizer = document.createElement('span');
            this.resizer.className = 'ui-column-resizer ui-clickable';
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

    constructor(public dt: Table, public el: ElementRef, public domHandler: DomHandler, public zone: NgZone) { }

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
        if (event.target.nodeName === 'INPUT' || this.domHandler.hasClass(event.target, 'ui-column-resizer'))
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

    @Input() pEditableColumnDisabled: boolean;

    constructor(public dt: Table, public el: ElementRef, public domHandler: DomHandler, public zone: NgZone) {}

    ngAfterViewInit() {
        if (this.isEnabled()) {
            this.domHandler.addClass(this.el.nativeElement, 'ui-editable-column');
        }
    }

    isValid() {
        return (this.dt.editingCell && this.domHandler.find(this.dt.editingCell, '.ng-invalid.ng-dirty').length === 0);
    }

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
        if (this.isEnabled()) {
            if (this.dt.editingCell) {
                if (this.dt.editingCell !== this.el.nativeElement) {
                    if (!this.isValid()) {
                        return;
                    }
        
                    this.domHandler.removeClass(this.dt.editingCell, 'ui-editing-cell');
                    this.openCell();
                }
            }
            else {
                this.openCell();
            }
        }
    }

    openCell() {
        this.dt.editingCell = this.el.nativeElement;
        this.domHandler.addClass(this.el.nativeElement, 'ui-editing-cell');
        this.dt.onEditInit.emit({ field: this.field, data: this.data});
        this.zone.runOutsideAngular(() => {
            setTimeout(() => {
                let focusable = this.domHandler.findSingle(this.el.nativeElement, 'input, textarea');
                if (focusable) {
                    focusable.focus();
                }
            }, 50);
        });
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if (this.isEnabled()) {
            //enter
            if (event.keyCode == 13) {
                if (this.isValid()) {
                    this.domHandler.removeClass(this.dt.editingCell, 'ui-editing-cell');
                    this.dt.editingCell = null;
                    this.dt.onEditComplete.emit({ field: this.field, data: this.data });
                }
    
                event.preventDefault();
            }
    
            //escape
            else if (event.keyCode == 27) {
                if (this.isValid()) {
                    this.domHandler.removeClass(this.dt.editingCell, 'ui-editing-cell');
                    this.dt.editingCell = null;
                    this.dt.onEditCancel.emit({ field: this.field, data: this.data });
                }
    
                event.preventDefault();
            }
    
            //tab
            else if (event.keyCode == 9) {
                this.dt.onEditComplete.emit({ field: this.field, data: this.data });
                
                if (event.shiftKey)
                    this.moveToPreviousCell(event);
                else
                    this.moveToNextCell(event);
            }
        }
    }

    findCell(element) {
        if (element) {
            let cell = element;
            while (cell && !this.domHandler.hasClass(cell, 'ui-editing-cell')) {
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
        let row = currentCell.parentElement;
        let targetCell = this.findPreviousEditableColumn(currentCell);

        if (targetCell) {
            this.domHandler.invokeElementMethod(targetCell, 'click');
            event.preventDefault();
        }
    }

    moveToNextCell(event: KeyboardEvent) {
        let currentCell = this.findCell(event.target);
        let row = currentCell.parentElement;
        let targetCell = this.findNextEditableColumn(currentCell);

        if (targetCell) {
            this.domHandler.invokeElementMethod(targetCell, 'click');
            event.preventDefault();
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
            if (this.domHandler.hasClass(prevCell, 'ui-editable-column'))
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
            if (this.domHandler.hasClass(nextCell, 'ui-editable-column'))
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

@Component({
    selector: 'p-cellEditor',
    template: `
        <ng-container *ngIf="dt.editingCell === editableColumn.el.nativeElement">
            <ng-container *ngTemplateOutlet="inputTemplate"></ng-container>
        </ng-container>
        <ng-container *ngIf="!dt.editingCell || dt.editingCell !== editableColumn.el.nativeElement">
            <ng-container *ngTemplateOutlet="outputTemplate"></ng-container>
        </ng-container>
    `
})
export class CellEditor implements AfterContentInit {

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;

    inputTemplate: TemplateRef<any>;

    outputTemplate: TemplateRef<any>;

    constructor(public dt: Table, public editableColumn: EditableColumn) { }

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
    
}

@Component({
    selector: 'p-tableRadioButton',
    template: `
        <div class="ui-radiobutton ui-widget" (click)="onClick($event)">
            <div class="ui-helper-hidden-accessible">
                <input type="radio" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()">
            </div>
            <div #box [ngClass]="{'ui-radiobutton-box ui-widget ui-state-default':true,
                'ui-state-active':checked, 'ui-state-disabled':disabled}">
                <span class="ui-radiobutton-icon ui-clickable" [ngClass]="{'fa fa-circle':checked}"></span>
            </div>
        </div>
    `
})
export class TableRadioButton  {

    @Input() disabled: boolean;

    @Input() value: any;

    @ViewChild('box') boxViewChild: ElementRef;

    checked: boolean;

    subscription: Subscription;

    constructor(public dt: Table, public domHandler: DomHandler, public tableService: TableService) {
        this.subscription = this.dt.tableService.selectionSource$.subscribe(() => {
            this.checked = this.dt.isSelected(this.value);
        });
    }

    ngOnInit() {
        this.checked = this.dt.isSelected(this.value);
    }

    onClick(event: Event) {
        if(!this.disabled) {
            this.dt.toggleRowWithRadio(event, this.value);
        }
        this.domHandler.clearSelection();
    }

    onFocus() {
        this.domHandler.addClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    }

    onBlur() {
        this.domHandler.removeClass(this.boxViewChild.nativeElement, 'ui-state-focus');
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
        <div class="ui-chkbox ui-widget" (click)="onClick($event)">
            <div class="ui-helper-hidden-accessible">
                <input type="checkbox" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()">
            </div>
            <div #box [ngClass]="{'ui-chkbox-box ui-widget ui-state-default':true,
                'ui-state-active':checked, 'ui-state-disabled':disabled}">
                <span class="ui-chkbox-icon ui-clickable" [ngClass]="{'fa fa-check':checked}"></span>
            </div>
        </div>
    `
})
export class TableCheckbox  {

    @Input() disabled: boolean;

    @Input() value: any;

    @ViewChild('box') boxViewChild: ElementRef;

    checked: boolean;

    subscription: Subscription;

    constructor(public dt: Table, public domHandler: DomHandler, public tableService: TableService) {
        this.subscription = this.dt.tableService.selectionSource$.subscribe(() => {
            this.checked = this.dt.isSelected(this.value);
        });
    }

    ngOnInit() {
        this.checked = this.dt.isSelected(this.value);
    }

    onClick(event: Event) {
        if(!this.disabled) {
            this.dt.toggleRowWithCheckbox(event, this.value);
        }
        this.domHandler.clearSelection();
    }

    onFocus() {
        this.domHandler.addClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    }

    onBlur() {
        this.domHandler.removeClass(this.boxViewChild.nativeElement, 'ui-state-focus');
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
        <div class="ui-chkbox ui-widget" (click)="onClick($event, cb.checked)">
            <div class="ui-helper-hidden-accessible">
                <input #cb type="checkbox" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()" [disabled]="!dt.value || dt.value.length === 0">
            </div>
            <div #box [ngClass]="{'ui-chkbox-box ui-widget ui-state-default':true,
                'ui-state-active':checked, 'ui-state-disabled': (!dt.value || dt.value.length === 0)}">
                <span class="ui-chkbox-icon ui-clickable" [ngClass]="{'fa fa-check':checked}"></span>
            </div>
        </div>
    `
})
export class TableHeaderCheckbox  {

    @ViewChild('box') boxViewChild: ElementRef;

    checked: boolean;

    disabled: boolean;

    selectionChangeSubscription: Subscription;

    valueChangeSubscription: Subscription;

    constructor(public dt: Table, public domHandler: DomHandler, public tableService: TableService) {
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

    onClick(event: Event, checked) {
        if(this.dt.value && this.dt.value.length > 0) {
            this.dt.toggleRowsWithCheckbox(event, !checked);
        }
        
        this.domHandler.clearSelection();
    }

    onFocus() {
        this.domHandler.addClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    }

    onBlur() {
        this.domHandler.removeClass(this.boxViewChild.nativeElement, 'ui-state-focus');
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
        const val = this.dt.filteredValue||this.dt.value;
        return (val && val.length > 0 && this.dt.selection && this.dt.selection.length > 0 && this.dt.selection.length === val.length);
    }
   
}

@Directive({
    selector: '[pReorderableRowHandle]'
})
export class ReorderableRowHandle implements AfterViewInit {

    @Input("pReorderableRowHandle") index: number;
    
    constructor(public el: ElementRef, public domHandler: DomHandler) {}

    ngAfterViewInit() {
        this.domHandler.addClass(this.el.nativeElement, 'ui-table-reorderablerow-handle');
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

    constructor(public dt: Table, public el: ElementRef, public domHandler: DomHandler, public zone: NgZone) {}

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
        if (this.domHandler.hasClass(event.target, 'ui-table-reorderablerow-handle'))
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

@NgModule({
    imports: [CommonModule,PaginatorModule],
    exports: [Table,SharedModule,SortableColumn,SelectableRow,RowToggler,ContextMenuRow,ResizableColumn,ReorderableColumn,EditableColumn,CellEditor,SortIcon,TableRadioButton,TableCheckbox,TableHeaderCheckbox,ReorderableRowHandle,ReorderableRow,SelectableRowDblClick],
    declarations: [Table,SortableColumn,SelectableRow,RowToggler,ContextMenuRow,ResizableColumn,ReorderableColumn,EditableColumn,CellEditor,TableBody,ScrollableView,SortIcon,TableRadioButton,TableCheckbox,TableHeaderCheckbox,ReorderableRowHandle,ReorderableRow,SelectableRowDblClick]
})
export class TableModule { }
