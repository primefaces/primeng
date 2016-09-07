import {NgModule,Component,ElementRef,AfterContentInit,AfterViewInit,AfterViewChecked,OnInit,OnDestroy,DoCheck,Input,ViewContainerRef,
        Output,SimpleChange,EventEmitter,ContentChild,ContentChildren,Renderer,IterableDiffers,QueryList,TemplateRef,ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms'
import {SharedModule} from '../common/shared';
import {PaginatorModule} from '../paginator/paginator';
import {InputTextModule} from '../inputtext/inputtext';
import {Column,Header,Footer} from '../common/shared';
import {LazyLoadEvent,FilterMetadata,SortMeta} from '../common/api';
import {DomHandler} from '../dom/domhandler';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'p-dtRadioButton',
    template: `
        <div class="ui-radiobutton ui-widget">
            <div class="ui-helper-hidden-accessible">
                <input type="radio" [checked]="checked">
            </div>
            <div class="ui-radiobutton-box ui-widget ui-radiobutton-relative ui-state-default" (click)="handleClick($event)"
                        (mouseenter)="hover=true" (mouseleave)="hover=false"
                        [ngClass]="{'ui-state-hover':hover,'ui-state-active':checked}">
                <span class="ui-radiobutton-icon" [ngClass]="{'fa fa-fw fa-circle':checked}"></span>
            </div>
        </div>
    `
})
export class DTRadioButton {
    
    @Input() checked: boolean;

    @Output() onClick: EventEmitter<any> = new EventEmitter();
    
    handleClick(event) {
        this.onClick.emit(event);
    }
}

@Component({
    selector: 'p-dtCheckbox',
    template: `
        <div class="ui-chkbox ui-widget">
            <div class="ui-helper-hidden-accessible">
                <input type="checkbox" [checked]="checked">
            </div>
            <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default" (click)="handleClick($event)"
                        (mouseover)="hover=true" (mouseout)="hover=false" 
                        [ngClass]="{'ui-state-hover':hover&&!disabled,'ui-state-active':checked&&!disabled,'ui-state-disabled':disabled}">
                <span class="ui-chkbox-icon ui-c" [ngClass]="{'fa fa-fw fa-check':checked}"></span>
            </div>
        </div>
    `
})
export class DTCheckbox {
    
    @Input() checked: boolean;
    
    @Input() disabled: boolean;

    @Output() onChange: EventEmitter<any> = new EventEmitter();
    
    handleClick(event) {
        if(!this.disabled) {
            this.onChange.emit({originalEvent: event, checked: !this.checked});
        }

    }
}

@Component({
    selector: 'p-rowExpansionLoader',
    template: ``
})
export class RowExpansionLoader {
        
    @Input() template: TemplateRef<any>;
    
    @Input() rowData: any;
    
    constructor(protected viewContainer: ViewContainerRef) {}
    
    ngOnInit() {
        let view = this.viewContainer.createEmbeddedView(this.template, {
            '\$implicit': this.rowData
        });
    }
}

@Component({
    selector: 'p-dataTable',
    template: `
        <div [ngStyle]="style" [class]="styleClass" 
            [ngClass]="{'ui-datatable ui-widget': true, 'ui-datatable-reflow':responsive, 'ui-datatable-stacked': stacked, 'ui-datatable-resizable': resizableColumns}">
            <div class="ui-datatable-header ui-widget-header" *ngIf="header" [ngStyle]="{'width': scrollWidth}">
                <ng-content select="header"></ng-content>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" styleClass="ui-paginator-bottom"
                (onPageChange)="paginate($event)" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && paginatorPosition!='bottom' || paginatorPosition =='both'"></p-paginator>
            <div class="ui-datatable-tablewrapper" *ngIf="!scrollable">
                <table>
                    <thead>
                        <tr *ngIf="!headerRows" class="ui-state-default">
                            <th #headerCell *ngFor="let col of columns;let lastCol = last" [ngStyle]="col.style" [class]="col.styleClass" [style.display]="col.hidden ? 'none' : 'table-cell'"
                                (click)="sort($event,col)" (mouseenter)="hoveredHeader = $event.target" (mouseleave)="hoveredHeader = null"
                                [ngClass]="{'ui-state-default ui-unselectable-text':true, 'ui-state-hover': headerCell === hoveredHeader && col.sortable,
                                'ui-sortable-column': col.sortable,'ui-state-active': isSorted(col), 'ui-resizable-column': resizableColumns,'ui-selection-column':col.selectionMode}" 
                                [draggable]="reorderableColumns" (dragstart)="onColumnDragStart($event)" (dragover)="onColumnDragover($event)" (dragleave)="onColumnDragleave($event)" (drop)="onColumnDrop($event)">
                                <span class="ui-column-resizer" *ngIf="resizableColumns && ((columnResizeMode == 'fit' && !lastCol) || columnResizeMode == 'expand')" (mousedown)="initColumnResize($event)"></span>
                                <span class="ui-column-title" *ngIf="!col.selectionMode&&!col.headerTemplate">{{col.header}}</span>
                                <span class="ui-column-title" *ngIf="col.headerTemplate">
                                    <p-columnHeaderTemplateLoader [column]="col"></p-columnHeaderTemplateLoader>
                                </span>
                                <span class="ui-sortable-column-icon fa fa-fw fa-sort" *ngIf="col.sortable"
                                     [ngClass]="{'fa-sort-desc': (getSortOrder(col) == -1),'fa-sort-asc': (getSortOrder(col) == 1)}"></span>
                                <input type="text" pInputText class="ui-column-filter" *ngIf="col.filter" [value]="filters[col.field] ? filters[col.field].value : ''" (click)="onFilterInputClick($event)" (keyup)="onFilterKeyup($event.target.value, col.field, col.filterMatchMode)"/>
                                <p-dtCheckbox *ngIf="col.selectionMode=='multiple'" (onChange)="toggleRowsWithCheckbox($event)" [checked]="allSelected" [disabled]="isEmpty()"></p-dtCheckbox>
                            </th>
                        </tr>
                        <tr *ngFor="let headerRow of headerRows" class="ui-state-default">
                            <th #headerCell *ngFor="let col of headerRow.columns" [ngStyle]="col.style" [class]="col.styleClass" [attr.colspan]="col.colspan" [attr.rowspan]="col.rowspan"
                                (click)="sort($event,col)" (mouseenter)="hoveredHeader = $event.target" (mouseleave)="hoveredHeader = null" [style.display]="col.hidden ? 'none' : 'table-cell'"
                                [ngClass]="{'ui-state-default ui-unselectable-text':true, 'ui-state-hover': headerCell === hoveredHeader && col.sortable,
                                'ui-sortable-column': col.sortable,'ui-state-active': isSorted(col), 'ui-resizable-column': resizableColumns}">
                                <span class="ui-column-resizer" *ngIf="resizableColumns && ((columnResizeMode == 'fit' && !lastCol) || columnResizeMode == 'expand')" (mousedown)="initColumnResize($event)"></span>
                                <span class="ui-column-title">{{col.header}}</span>
                                <span class="ui-sortable-column-icon fa fa-fw fa-sort" *ngIf="col.sortable"
                                     [ngClass]="{'fa-sort-desc': (getSortOrder(col) == -1),'fa-sort-asc': (getSortOrder(col) == 1)}"></span>
                                <input type="text" pInputText class="ui-column-filter" *ngIf="col.filter" [value]="filters[col.field] ? filters[col.field].value : ''" (click)="onFilterInputClick($event)" (keyup)="onFilterKeyup($event.target.value, col.field, col.filterMatchMode)"/>
                            </th>
                        </tr>
                    </thead>
                    <tfoot *ngIf="hasFooter()">
                        <tr *ngIf="!footerRows">
                            <th *ngFor="let col of columns" [ngStyle]="col.style" [class]="col.styleClass" [ngClass]="{'ui-state-default':true}" [style.display]="col.hidden ? 'none' : 'table-cell'">
                                <span class="ui-column-footer" *ngIf="!col.footerTemplate">{{col.footer}}</span>
                                <span class="ui-column-footer" *ngIf="col.footerTemplate">
                                    <p-columnFooterTemplateLoader [column]="col"></p-columnFooterTemplateLoader>
                                </span>
                            </th>
                        </tr>
                        <tr *ngFor="let footerRow of footerRows">
                            <th *ngFor="let col of footerRow.columns" [ngStyle]="col.style" [class]="col.styleClass"
                                [attr.colspan]="col.colspan" [attr.rowspan]="col.rowspan" [style.display]="col.hidden ? 'none' : 'table-cell'"
                                [ngClass]="{'ui-state-default':true}">{{col.footer}}</th>
                        </tr>
                    </tfoot>
                    <tbody class="ui-datatable-data ui-widget-content">
                        <template ngFor let-rowData [ngForOf]="dataToRender" let-even="even" let-odd="odd" let-rowIndex="index">
                            <tr #rowElement class="ui-widget-content" (mouseenter)="hoveredRow = $event.target" (mouseleave)="hoveredRow = null"
                                    (click)="handleRowClick($event, rowData)" (dblclick)="rowDblclick($event,rowData)" (contextmenu)="onRowRightClick($event,rowData)"
                                    [ngClass]="{'ui-datatable-even':even,'ui-datatable-odd':odd,'ui-state-hover': (selectionMode && rowElement == hoveredRow), 'ui-state-highlight': isSelected(rowData)}">
                                <td *ngFor="let col of columns" [ngStyle]="col.style" [class]="col.styleClass" [style.display]="col.hidden ? 'none' : 'table-cell'"
                                    [ngClass]="{'ui-editable-column':col.editable,'ui-selection-column':col.selectionMode}" (click)="switchCellToEditMode($event.target,col,rowData)">
                                    <span class="ui-column-title" *ngIf="responsive">{{col.header}}</span>
                                    <span class="ui-cell-data" *ngIf="!col.bodyTemplate && !col.expander && !col.selectionMode">{{resolveFieldData(rowData,col.field)}}</span>
                                    <span class="ui-cell-data" *ngIf="col.bodyTemplate">
                                        <p-columnBodyTemplateLoader [column]="col" [rowData]="rowData" [rowIndex]="rowIndex + first"></p-columnBodyTemplateLoader>
                                    </span>
                                    <input type="text" class="ui-cell-editor ui-state-highlight" *ngIf="col.editable" [(ngModel)]="rowData[col.field]"
                                            (blur)="switchCellToViewMode($event.target,col,rowData,true)" (keydown)="onCellEditorKeydown($event, col, rowData)"/>
                                    <div class="ui-row-toggler fa fa-fw ui-c" [ngClass]="{'fa-chevron-circle-down':isRowExpanded(rowData), 'fa-chevron-circle-right': !isRowExpanded(rowData)}"
                                        *ngIf="col.expander" (click)="toggleRow(rowData)"></div>
                                    <p-dtRadioButton *ngIf="col.selectionMode=='single'" (onClick)="selectRowWithRadio(rowData)" [checked]="isSelected(rowData)"></p-dtRadioButton>
                                    <p-dtCheckbox *ngIf="col.selectionMode=='multiple'" (onChange)="toggleRowWithCheckbox($event,rowData)" [checked]="isSelected(rowData)"></p-dtCheckbox>
                                </td>
                            </tr>
                            <tr *ngIf="expandableRows && isRowExpanded(rowData)">
                                <td [attr.colspan]="visibleColumns().length">
                                    <p-rowExpansionLoader [rowData]="rowData" [template]="rowExpansionTemplate"></p-rowExpansionLoader>
                                </td>
                            </tr>
                        </template>
                        
                        <tr *ngIf="isEmpty()" class="ui-widget-content">
                            <td [attr.colspan]="visibleColumns().length">{{emptyMessage}}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="ui-column-resizer-helper ui-state-highlight" style="display:none"></div>
                <span class="fa fa-arrow-down ui-datatable-reorder-indicator-up" style="position: absolute; display: none;"></span>
                <span class="fa fa-arrow-up ui-datatable-reorder-indicator-down" style="position: absolute; display: none;"></span>
            </div>
            <div class="ui-widget-header ui-datatable-scrollable-header" *ngIf="scrollable" [ngStyle]="{'width': scrollWidth}">
                <div class="ui-datatable-scrollable-header-box">
                    <table>
                        <thead>
                            <tr>
                                <th #headerCell *ngFor="let col of columns" [ngStyle]="col.style" [class]="col.styleClass" [style.display]="col.hidden ? 'none' : 'table-cell'"
                                    (click)="sort($event,col)" (mouseenter)="hoveredHeader = $event.target" (mouseleave)="hoveredHeader = null"
                                    [ngClass]="{'ui-state-default ui-unselectable-text':true, 'ui-state-hover': headerCell === hoveredHeader && col.sortable,
                                    'ui-sortable-column': col.sortable,'ui-state-active': isSorted(col), 'ui-resizable-column': resizableColumns}">
                                    <span class="ui-column-resizer" *ngIf="resizableColumns && ((columnResizeMode == 'fit' && !lastCol) || columnResizeMode == 'expand')"></span>
                                    <span class="ui-column-title">{{col.header}}</span>
                                    <span class="ui-sortable-column-icon fa fa-fw fa-sort" *ngIf="col.sortable"
                                         [ngClass]="{'fa-sort-desc': (col.field === sortField) && (sortOrder == -1),'fa-sort-asc': (col.field === sortField) && (sortOrder == 1)}"></span>
                                    <input type="text" pInputText class="ui-column-filter" *ngIf="col.filter" (click)="onFilterInputClick($event)" (keyup)="onFilterKeyup($event.target.value, col.field, col.filterMatchMode)"/>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
            <div class="ui-datatable-scrollable-body" *ngIf="scrollable" [ngStyle]="{'width': scrollWidth}">
                <table>
                    <tbody class="ui-datatable-data ui-widget-content">
                    <template ngFor let-rowData [ngForOf]="dataToRender" let-even="even" let-odd="odd" let-rowIndex="index">
                        <tr #rowElement class="ui-widget-content" (mouseenter)="hoveredRow = $event.target" (mouseleave)="hoveredRow = null"
                                (click)="handleRowClick($event, rowData)" (dblclick)="rowDblclick($event,rowData)" (contextmenu)="onRowRightClick($event,rowData)"
                                [ngClass]="{'ui-datatable-even':even,'ui-datatable-odd':odd,'ui-state-hover': (selectionMode && rowElement == hoveredRow), 'ui-state-highlight': isSelected(rowData)}">
                            <td *ngFor="let col of columns" [ngStyle]="col.style" [class]="col.styleClass" [style.display]="col.hidden ? 'none' : 'table-cell'"
                                [ngClass]="{'ui-editable-column':col.editable}" (click)="switchCellToEditMode($event.target,col,rowData)">
                                <span class="ui-column-title" *ngIf="responsive">{{col.header}}</span>
                                <span class="ui-cell-data" *ngIf="!col.bodyTemplate">{{resolveFieldData(rowData,col.field)}}</span>
                                <span class="ui-cell-data" *ngIf="col.bodyTemplate">
                                    <p-columnBodyTemplateLoader [column]="col" [rowData]="rowData" [rowIndex]="rowIndex + first"></p-columnBodyTemplateLoader>
                                </span>
                                <input type="text" class="ui-cell-editor ui-state-highlight" *ngIf="col.editable" [(ngModel)]="rowData[col.field]"
                                        (blur)="switchCellToViewMode($event.target,col,rowData,true)" (keydown)="onCellEditorKeydown($event, col, rowData)"/>
                                <div class="ui-row-toggler fa fa-fw ui-c" [ngClass]="{'fa-chevron-circle-down':isRowExpanded(rowData), 'fa-chevron-circle-right': !isRowExpanded(rowData)}"
                                    *ngIf="col.expander" (click)="toggleRow(rowData)"></div>
                            </td>
                        </tr>
                        <tr *ngIf="expandableRows && isRowExpanded(rowData)">
                            <td [attr.colspan]="visibleColumns().length">
                                <p-rowExpansionLoader [rowData]="rowData" [template]="rowExpansionTemplate"></p-rowExpansionLoader>
                            </td>
                        </tr>
                    </template>
                    </tbody>
                </table>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" styleClass="ui-paginator-bottom"
                (onPageChange)="paginate($event)" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && paginatorPosition!='top' || paginatorPosition =='both'"></p-paginator>
            <div class="ui-datatable-footer ui-widget-header" *ngIf="footer">
                <ng-content select="footer"></ng-content>
            </div>
        </div>
    `,
    providers: [DomHandler]
})
export class DataTable implements AfterViewChecked,AfterViewInit,AfterContentInit,OnInit,DoCheck,OnDestroy {

    @Input() value: any[];

    @Input() paginator: boolean;

    @Input() rows: number;

    @Input() totalRecords: number;

    @Input() pageLinks: number = 5;

    @Input() rowsPerPageOptions: number[];

    @Input() responsive: boolean;
    
    @Input() stacked: boolean;

    @Input() selectionMode: string;

    @Input() selection: any;

    @Output() selectionChange: EventEmitter<any> = new EventEmitter();

    @Input() editable: boolean;
    
    @Output() onRowClick: EventEmitter<any> = new EventEmitter();

    @Output() onRowSelect: EventEmitter<any> = new EventEmitter();

    @Output() onRowUnselect: EventEmitter<any> = new EventEmitter();

    @Output() onRowDblclick: EventEmitter<any> = new EventEmitter();
    
    @Output() onHeaderCheckboxToggle: EventEmitter<any> = new EventEmitter();
    
    @Output() onContextMenuSelect: EventEmitter<any> = new EventEmitter();

    @Input() filterDelay: number = 300;

    @Input() lazy: boolean;

    @Output() onLazyLoad: EventEmitter<any> = new EventEmitter();

    @Input() resizableColumns: boolean;

    @Input() columnResizeMode: string = 'fit';

    @Output() onColResize: EventEmitter<any> = new EventEmitter();

    @Input() reorderableColumns: boolean;

    @Output() onColReorder: EventEmitter<any> = new EventEmitter();

    @Input() scrollable: boolean;

    @Input() scrollHeight: any;

    @Input() scrollWidth: any;

    @Input() headerRows: any;

    @Input() footerRows: any;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() globalFilter: any;

    @Input() sortMode: string = 'single';

    @Input() sortField: string;

    @Input() sortOrder: number = 1;

    @Input() multiSortMeta: SortMeta[];
    
    @Input() contextMenu: any;
    
    @Input() csvSeparator: string = ',';
    
    @Input() emptyMessage: string = 'No records found';
    
    @Input() paginatorPosition: string = 'bottom';
    
    @Input() expandedRows: any[];
    
    @Output() onEditInit: EventEmitter<any> = new EventEmitter();

    @Output() onEditComplete: EventEmitter<any> = new EventEmitter();

    @Output() onEdit: EventEmitter<any> = new EventEmitter();

    @Output() onEditCancel: EventEmitter<any> = new EventEmitter();
    
    @Output() onPage: EventEmitter<any> = new EventEmitter();
        
    @Output() onSort: EventEmitter<any> = new EventEmitter();
            
    @Output() onFilter: EventEmitter<any> = new EventEmitter();

    @ContentChild(Header) header;

    @ContentChild(Footer) footer;
    
    @Input() expandableRows: boolean;
    
    @Output() onRowExpand: EventEmitter<any> = new EventEmitter();
    
    @Output() onRowCollapse: EventEmitter<any> = new EventEmitter();
    
    @ContentChild(TemplateRef) rowExpansionTemplate: TemplateRef<any>;
    
    @ContentChildren(Column) cols: QueryList<Column>;
    
    protected dataToRender: any[];

    protected first: number = 0;

    protected page: number = 0;

    protected filterTimeout: any;

    protected filters: {[s: string]: FilterMetadata;} = {};

    protected filteredValue: any[];

    protected columns: Column[];

    protected columnsUpdated: boolean = false;
    
    protected stopSortPropagation: boolean;
    
    protected sortColumn: Column;
    
    protected percentageScrollHeight: boolean;
        
    protected scrollBody: any;
    
    protected scrollHeader: any
    
    protected scrollHeaderBox: any;
    
    protected bodyScrollListener: any;
    
    protected headerScrollListener: any;
    
    protected resizeScrollListener: any;
    
    protected columnResizing: boolean;
    
    protected lastPageX: number;
        
    protected documentColumnResizeListener: any;
    
    protected documentColumnResizeEndListener: any;
    
    protected resizerHelper: any;
    
    protected resizeColumn: any;
    
    protected reorderIndicatorUp: any;
    
    protected reorderIndicatorDown: any;
    
    protected draggedColumn: any;
            
    protected tbody: any;

    differ: any;

    globalFilterFunction: any;

    preventBlurOnEdit: boolean;
    
    columnsSubscription: Subscription;

    constructor(protected el: ElementRef, protected domHandler: DomHandler, differs: IterableDiffers, 
            protected renderer: Renderer, private changeDetector: ChangeDetectorRef) {
        this.differ = differs.find([]).create(null);
    }

    ngOnInit() {
        if(this.lazy) {
            this.onLazyLoad.emit({
                first: this.first,
                rows: this.rows,
                sortField: this.sortField,
                sortOrder: this.sortOrder,
                filters: null,
                multiSortMeta: this.multiSortMeta
            });
        }
    }
    
    ngAfterContentInit() {
        this.initColumns();
        
        this.columnsSubscription = this.cols.changes.subscribe(_ => {
            this.initColumns();
            this.changeDetector.markForCheck();
        });
    }

    ngAfterViewChecked() {
        if(this.columnsUpdated) {
            if(this.resizableColumns) {
                this.initResizableColumns();
            }

            if(this.reorderableColumns) {
                this.initColumnReordering();
            }

            if(this.scrollable) {
                this.initScrolling();
            }

            this.columnsUpdated = false;
        }
    }

    ngAfterViewInit() {
        if(this.globalFilter) {
            this.globalFilterFunction = this.renderer.listen(this.globalFilter, 'keyup', () => {
                this.filterTimeout = setTimeout(() => {
                    this.filter();
                    this.filterTimeout = null;
                }, this.filterDelay);
            });
        }
    }

    ngDoCheck() {
        let changes = this.differ.diff(this.value);
        if(changes) {
            if(this.paginator) {
                this.updatePaginator();
            }
            
            if(this.stopSortPropagation) {
                this.stopSortPropagation = false;
            }
            else if(!this.lazy && (this.sortField||this.multiSortMeta)) {                    
                if(this.sortMode == 'single')
                    this.sortSingle();
                else if(this.sortMode == 'multiple')
                    this.sortMultiple();
            }
            
            this.updateDataToRender(this.filteredValue||this.value);
        }
    }
    
    initColumns(): void {
        this.columns = this.cols.toArray();
        this.columnsUpdated = true;
    }

    resolveFieldData(data: any, field: string): any {
        if(data && field) {
            if(field.indexOf('.') == -1) {
                return data[field];
            }
            else {
                let fields: string[] = field.split('.');
                let value = data;
                for(var i = 0, len = fields.length; i < len; ++i) {
                    value = value[fields[i]];
                }
                return value;
            }
        }
        else {
            return null;
        }
    }

    updatePaginator() {
        //total records
        this.totalRecords = this.lazy ? this.totalRecords : (this.value ? this.value.length: 0);

        //first
        if(this.totalRecords && this.first >= this.totalRecords) {
            let numberOfPages = Math.ceil(this.totalRecords/this.rows);
            this.first = Math.max((numberOfPages-1) * this.rows, 0);
        }
    }

    paginate(event) {
        this.first = event.first;
        this.rows = event.rows;

        if(this.lazy)
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        else
            this.updateDataToRender(this.filteredValue||this.value);
        
        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });
    }

    updateDataToRender(datasource) {
        if(this.paginator && datasource) {
            this.dataToRender = [];
            let startIndex = this.lazy ? 0 : this.first;
            for(let i = startIndex; i < (startIndex+ this.rows); i++) {
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

    sort(event, column: Column) {
        if(!column.sortable) {
            return;
        }

        this.sortOrder = (this.sortField === column.field)  ? this.sortOrder * -1 : 1;
        this.sortField = column.field;
        this.sortColumn = column;
        let metaKey = event.metaKey||event.ctrlKey;

        if(this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            if(this.sortMode == 'multiple') {
                if(!this.multiSortMeta||!metaKey) {
                    this.multiSortMeta = [];
                }

                this.addSortMeta({field: this.sortField, order: this.sortOrder});
                this.sortMultiple();
            }
            else {
                this.sortSingle();
            }
        }
        
        this.onSort.emit({
            field: this.sortField,
            order: this.sortOrder,
            multisortmeta: this.multiSortMeta
        });
    }

    sortSingle() {
        if(this.value) {
            if(this.sortColumn && this.sortColumn.sortable === 'custom') {
                this.sortColumn.sortFunction.emit({
                    field: this.sortField,
                    order: this.sortOrder
                });
            }
            else {
                this.value.sort((data1, data2) => {
                    let value1 = this.resolveFieldData(data1, this.sortField);
                    let value2 = this.resolveFieldData(data2, this.sortField);
                    let result = null;

                    if (value1 instanceof String && value2 instanceof String)
                        result = value1.localeCompare(value2);
                    else
                        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

                    return (this.sortOrder * result);
                });
            }
            
            this.first = 0;

            if(this.hasFilter()) {
                this.filter();
            }
        }
        
        //prevent resort at ngDoCheck
        this.stopSortPropagation = true;
    }

    sortMultiple() {
        if(this.value) {
            this.value.sort((data1,data2) => {
                return this.multisortField(data1, data2, this.multiSortMeta, 0);
            });

            if(this.hasFilter()) {
                this.filter();
            }
        }
        
        //prevent resort at ngDoCheck
        this.stopSortPropagation = true;
    }

    multisortField(data1,data2,multiSortMeta,index) {
        let value1 = this.resolveFieldData(data1, multiSortMeta[index].field);
        let value2 = this.resolveFieldData(data2, multiSortMeta[index].field);
        let result = null;

        if (typeof value1 == 'string' || value1 instanceof String) {
            if (value1.localeCompare && (value1 != value2)) {
                return (multiSortMeta[index].order * value1.localeCompare(value2));
            }
        }
        else {
            result = (value1 < value2) ? -1 : 1;
        }

        if(value1 == value2)  {
            return (multiSortMeta.length - 1) > (index) ? (this.multisortField(data1, data2, multiSortMeta, index + 1)) : 0;
        }

        return (multiSortMeta[index].order * result);
    }

    addSortMeta(meta) {
        var index = -1;
        for(var i = 0; i < this.multiSortMeta.length; i++) {
            if(this.multiSortMeta[i].field === meta.field) {
                index = i;
                break;
            }
        }

        if(index >= 0)
            this.multiSortMeta[index] = meta;
        else
            this.multiSortMeta.push(meta);
    }

    isSorted(column: Column) {
        if(this.sortMode === 'single') {
            return (this.sortField && column.field === this.sortField);
        }
        else if(this.sortMode === 'multiple') {
            let sorted = false;
            if(this.multiSortMeta) {
                for(let i = 0; i < this.multiSortMeta.length; i++) {
                    if(this.multiSortMeta[i].field == column.field) {
                        sorted = true;
                        break;
                    }
                }
            }
            return sorted;
        }
    }

    getSortOrder(column: Column) {
        let order = 0;
        if(this.sortMode === 'single') {
            if(this.sortField && column.field === this.sortField) {
                order = this.sortOrder;
            }
        }
        else if(this.sortMode === 'multiple') {
            if(this.multiSortMeta) {
                for(let i = 0; i < this.multiSortMeta.length; i++) {
                    if(this.multiSortMeta[i].field == column.field) {
                        order = this.multiSortMeta[i].order;
                        break;
                    }
                }
            }
        }
        return order;
    }

    handleRowClick(event, rowData) {
        this.onRowClick.next({originalEvent: event, data: rowData});
        
        if(!this.selectionMode) {
            return;
        }
        
        let targetNode = event.target.nodeName;
        if(targetNode == 'INPUT' || targetNode == 'BUTTON' || targetNode == 'A' 
            || (this.domHandler.hasClass(event.target, 'ui-c'))) {
            return;
        }
        
        if(this.isSelected(rowData)) {
            if(this.isSingleSelectionMode()) {
                this.selection = null;
                this.selectionChange.emit(null);
            }
            else {
                this.selection.splice(this.findIndexInSelection(rowData), 1);
                this.selectionChange.emit(this.selection);
            }
            
            this.onRowUnselect.emit({originalEvent: event, data: rowData, type: 'row'});
        }
        else {
            if(this.isSingleSelectionMode()) {
                this.selection = rowData;
                this.selectionChange.emit(rowData);
            }
            else if(this.isMultipleSelectionMode()) {
                this.selection = this.selection||[];
                this.selection.push(rowData);
                this.selectionChange.emit(this.selection);
            }

            this.onRowSelect.emit({originalEvent: event, data: rowData, type: 'row'});
        }
    }
    
    selectRowWithRadio(rowData:any) {
        if(this.selection != rowData) {
            this.selection = rowData;
            this.selectionChange.emit(this.selection);
            this.onRowSelect.emit({originalEvent: event, data: rowData, type: 'radiobutton'});
        }
    }
    
    toggleRowWithCheckbox(event,rowData) {
        let selectionIndex = this.findIndexInSelection(rowData);
        this.selection = this.selection||[];
        
        if(selectionIndex != -1) {
            this.selection.splice(selectionIndex, 1);
            this.onRowUnselect.emit({originalEvent: event, data: rowData, type: 'checkbox'});
        }
            
        else {
            this.selection.push(rowData);
            this.onRowSelect.emit({originalEvent: event, data: rowData, type: 'checkbox'});
        }
                 
        this.selectionChange.emit(this.selection);
    }
    
    toggleRowsWithCheckbox(event) {
        if(event.checked)
            this.selection = this.dataToRender.slice(0);
        else
            this.selection = [];
            
        this.selectionChange.emit(this.selection);
        
        this.onHeaderCheckboxToggle.emit({originalEvent: event, checked: event.checked});
    }
    
    onRowRightClick(event, rowData) {
        if(this.contextMenu) {
            let selectionIndex = this.findIndexInSelection(rowData);
            let selected = selectionIndex != -1;
            
            if(!selected) {
                if(this.isSingleSelectionMode()) {
                    this.selection = rowData;
                    this.selectionChange.emit(rowData);
                }
                else if(this.isMultipleSelectionMode()) {
                    this.selection = [];
                    this.selection.push(rowData);
                    this.selectionChange.emit(this.selection);
                }
            }

            this.contextMenu.show(event);            
            this.onContextMenuSelect.emit({originalEvent: event, data: rowData});
        }
    }

    rowDblclick(event, rowData) {
        this.onRowDblclick.emit({originalEvent: event, data: rowData});
    }

    isSingleSelectionMode() {
        return this.selectionMode === 'single';
    }

    isMultipleSelectionMode() {
        return this.selectionMode === 'multiple';
    }

    findIndexInSelection(rowData: any) {
        let index: number = -1;
        if(this.selection) {
            for(let i = 0; i  < this.selection.length; i++) {
                if(this.domHandler.equals(rowData, this.selection[i])) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }

    isSelected(rowData) {
        return ((rowData && this.domHandler.equals(rowData, this.selection)) || this.findIndexInSelection(rowData) != -1);
    }
    
    get allSelected() {
        let val = true;
        if(this.dataToRender && this.selection && (this.dataToRender.length == this.selection.length)) {
            for(let data of this.dataToRender) {
                if(!this.isSelected(data)) {
                    val = false;
                    break;
                }
            }
        }
        else {
            val = false;
        }
        return val;
    }

    onFilterKeyup(value, field, matchMode) {
        if(this.filterTimeout) {
            clearTimeout(this.filterTimeout);
        }

        this.filterTimeout = setTimeout(() => {
            this.filters[field] = {value: value, matchMode: matchMode};
            this.filter();
            this.filterTimeout = null;
        }, this.filterDelay);
    }

    filter() {
        this.first = 0;
        
        if(this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            this.filteredValue = [];

            for(let i = 0; i < this.value.length; i++) {
                let localMatch = true;
                let globalMatch = false;

                for(let j = 0; j < this.columns.length; j++) {
                    let col = this.columns[j],
                    filterMeta = this.filters[col.field];

                    //local
                    if(filterMeta) {
                        let filterValue = filterMeta.value,
                        filterField = col.field,
                        filterMatchMode = filterMeta.matchMode||'startsWith',
                        dataFieldValue = this.resolveFieldData(this.value[i], filterField);

                        let filterConstraint = this.filterConstraints[filterMatchMode];

                        if(!filterConstraint(dataFieldValue, filterValue)) {
                            localMatch = false;
                        }

                        if(!localMatch) {
                            break;
                        }
                    }

                    //global
                    if(this.globalFilter && !globalMatch) {
                        globalMatch = this.filterConstraints['contains'](this.resolveFieldData(this.value[i], col.field), this.globalFilter.value);
                    }
                }

                let matches = localMatch;
                if(this.globalFilter) {
                    matches = localMatch&&globalMatch;
                }

                if(matches) {
                    this.filteredValue.push(this.value[i]);
                }
            }

            if(this.filteredValue.length === this.value.length) {
                this.filteredValue = null;
            }

            if(this.paginator) {
                this.totalRecords = this.filteredValue ? this.filteredValue.length: this.value ? this.value.length: 0;
            }

            this.updateDataToRender(this.filteredValue||this.value);
        }
        
        this.onFilter.emit({
            filters: this.filters
        });
    }

    hasFilter() {
        let empty = true;
        for(let prop in this.filters) {
            if(this.filters.hasOwnProperty(prop)) {
                empty = false;
                break;
            }
        }

        return !empty;
    }

    onFilterInputClick(event) {
        event.stopPropagation();
    }

    filterConstraints = {

        startsWith(value, filter): boolean {
            if(filter === undefined || filter === null || filter.trim() === '') {
                return true;
            }

            if(value === undefined || value === null) {
                return false;
            }

            let filterValue = filter.toLowerCase();
            return value.toString().toLowerCase().slice(0, filterValue.length) === filterValue;
        },

        contains(value, filter): boolean {
            if(filter === undefined || filter === null || filter.trim() === '') {
                return true;
            }

            if(value === undefined || value === null) {
                return false;
            }

            return value.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        },

        endsWith(value, filter): boolean {
            if(filter === undefined || filter === null || filter.trim() === '') {
                return true;
            }

            if(value === undefined || value === null) {
                return false;
            }

            let filterValue = filter.toLowerCase();
            return value.indexOf(filterValue, value.length - filterValue.length) !== -1;
        }
    }

    switchCellToEditMode(element: any, column: Column, rowData: any) {
        if(!this.selectionMode && this.editable && column.editable) {
            this.onEditInit.emit({column: column, data: rowData});
            let cell = this.findCell(element);
            if(!this.domHandler.hasClass(cell, 'ui-cell-editing')) {
                this.domHandler.addClass(cell, 'ui-cell-editing');
                this.domHandler.addClass(cell, 'ui-state-highlight');
                let editor = cell.querySelector('.ui-cell-editor').focus();
            }
        }
    }

    switchCellToViewMode(element: any, column: Column, rowData: any, complete: boolean) {
        if(this.editable) {
            if(this.preventBlurOnEdit) {
                this.preventBlurOnEdit = false;
            }
            else {
                if(complete)
                    this.onEditComplete.emit({column: column, data: rowData});
                else
                    this.onEditCancel.emit({column: column, data: rowData});

                let cell = this.findCell(element);
                this.domHandler.removeClass(cell, 'ui-cell-editing');
                this.domHandler.removeClass(cell, 'ui-state-highlight');
            }
        }
    }

    onCellEditorKeydown(event, column: Column, rowData: any) {
        if(this.editable) {
            this.onEdit.emit({originalEvent: event,column: column, data: rowData});

            //enter
            if(event.keyCode == 13) {
                this.switchCellToViewMode(event.target, column, rowData, true);
                this.preventBlurOnEdit = true;
            }
            //escape
            if(event.keyCode == 27) {
                this.switchCellToViewMode(event.target, column, rowData, false);
                this.preventBlurOnEdit = true;
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
        this.tbody = this.domHandler.findSingle(this.el.nativeElement, 'tbody.ui-datatable-data');
        this.resizerHelper = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-column-resizer-helper');
        this.fixColumnWidths();
        
        this.documentColumnResizeListener = this.renderer.listenGlobal('body', 'mousemove', (event) => {
            if(this.columnResizing) {
                this.onColumnResize(event);
            }
        });
        
        this.documentColumnResizeEndListener = this.renderer.listenGlobal('body', 'mouseup', (event) => {
            if(this.columnResizing) {
                this.columnResizing = false;
                this.onColumnResizeEnd(event);
            }
        });
    }
    
    initColumnResize(event) {
        this.resizeColumn = event.target.parentElement;
        this.columnResizing = true;
        this.lastPageX = event.pageX;
    }
    
    onColumnResize(event) {
        let container = this.el.nativeElement.children[0];
        this.domHandler.addClass(container, 'ui-unselectable-text');
        this.resizerHelper.style.height = container.offsetHeight - 4 + 'px';
        this.resizerHelper.style.top = container.offsetTop + 'px';
        if(event.pageX > container.offsetLeft && event.pageX < (container.offsetLeft + container.offsetWidth)) {
            this.resizerHelper.style.left = event.pageX + 'px';
        }
        
        this.resizerHelper.style.display = 'block';
    }
    
    onColumnResizeEnd(event) {
        let delta = this.resizerHelper.offsetLeft - this.lastPageX;
        let columnWidth = this.resizeColumn.offsetWidth;
        let newColumnWidth = columnWidth + delta;
        let minWidth = this.resizeColumn.style.minWidth||15;
        
        if(columnWidth + delta > parseInt(minWidth)) {
            if(this.columnResizeMode === 'fit') {
                let nextColumn = this.resizeColumn.nextElementSibling;
                let nextColumnWidth = nextColumn.offsetWidth - delta;
                
                if(newColumnWidth > 15 && nextColumnWidth > 15) {
                    this.resizeColumn.style.width = newColumnWidth + 'px';
                    if(nextColumn) {
                        nextColumn.style.width = nextColumnWidth + 'px';
                    }
                }
            }
            else if(this.columnResizeMode === 'expand') {
                this.tbody.parentElement.style.width = this.tbody.parentElement.offsetWidth + delta + 'px';
                this.resizeColumn.style.width = newColumnWidth + 'px';
            }    
            
            this.onColResize.emit({
                element: this.resizeColumn,
                delta: delta
            });
        }
                
        this.resizerHelper.style.display = 'none';
        this.resizeColumn = null;
        this.domHandler.removeClass(this.el.nativeElement.children[0], 'ui-unselectable-text');
    }
    
    fixColumnWidths() {
        let columns = this.domHandler.find(this.el.nativeElement, 'th.ui-resizable-column');
        for(let col of columns) {
            col.style.width = 'auto';
        }
        
        for(let col of columns) {
            col.style.width = col.offsetWidth + 'px';
        }
    }
    
    onColumnDragStart(event) {
        this.draggedColumn = this.findParentHeader(event.target);
    }
    
    onColumnDragover(event) {
        if(this.reorderableColumns && this.draggedColumn) {
            event.preventDefault();
            let dropHeader = this.findParentHeader(event.target);
            
            if(this.draggedColumn != dropHeader) {
                let targetPosition = dropHeader.getBoundingClientRect();
                let targetLeft = targetPosition.left + document.body.scrollLeft;
                let targetTop =  targetPosition.top + document.body.scrollTop;
                let columnCenter = targetLeft + dropHeader.offsetWidth / 2;
                
                this.reorderIndicatorUp.style.top = (targetTop - 16) + 'px';
                this.reorderIndicatorDown.style.top = targetTop + dropHeader.offsetHeight + 'px';

                if(event.pageX > columnCenter) {
                    this.reorderIndicatorUp.style.left = (targetLeft + dropHeader.offsetWidth - 8) + 'px';
                    this.reorderIndicatorDown.style.left = (targetLeft + dropHeader.offsetWidth - 8)+ 'px';
                }
                else {
                    this.reorderIndicatorUp.style.left = (targetLeft - 8) + 'px';
                    this.reorderIndicatorDown.style.left = (targetLeft - 8)+ 'px';
                }
                
                this.reorderIndicatorUp.style.display = 'block';
                this.reorderIndicatorDown.style.display = 'block';
            }
            else {
                event.dataTransfer.dropEffect = 'none';
            }
        }
    }
    
    onColumnDragleave(event) {
        if(this.reorderableColumns && this.draggedColumn) {
            event.preventDefault();
            this.reorderIndicatorUp.style.display = 'none';
            this.reorderIndicatorDown.style.display = 'none';
        }
    }
    
    onColumnDrop(event) {
        event.preventDefault();
        let dragIndex = this.domHandler.index(this.draggedColumn);
        let dropIndex = this.domHandler.index(this.findParentHeader(event.target));

        if(dragIndex != dropIndex) {
            this.columns.splice(dropIndex, 0, this.columns.splice(dragIndex, 1)[0]);

            this.onColReorder.emit({
                dragIndex: dragIndex,
                dropIndex: dropIndex,
                columns: this.columns
            });
        }
        
        this.reorderIndicatorUp.style.display = 'none';
        this.reorderIndicatorDown.style.display = 'none';
        this.draggedColumn = null;
    }

    initColumnReordering() {
        this.reorderIndicatorUp = this.domHandler.findSingle(this.el.nativeElement.children[0], 'span.ui-datatable-reorder-indicator-up');
        this.reorderIndicatorDown = this.domHandler.findSingle(this.el.nativeElement.children[0], 'span.ui-datatable-reorder-indicator-down');
    }
    
    findParentHeader(element) {
        if(element.nodeName == 'TH') {
            return element;
        }
        else {
            let parent = element.parentElement;
            while(parent.nodeName != 'TH') {
                parent = parent.parentElement;
            }
            return parent;
        }
    }

    initScrolling() {
        this.scrollHeader = this.domHandler.findSingle(this.el.nativeElement, '.ui-datatable-scrollable-header');
        this.scrollHeaderBox = this.domHandler.findSingle(this.el.nativeElement, '.ui-datatable-scrollable-header-box');
        this.scrollBody = this.domHandler.findSingle(this.el.nativeElement, '.ui-datatable-scrollable-body');
        this.percentageScrollHeight = this.scrollHeight && (this.scrollHeight.indexOf('%') !== -1);
        
        if(this.scrollHeight) {
            if(this.percentageScrollHeight)
                this.scrollBody.style.maxHeight = this.domHandler.getOuterHeight(this.el.nativeElement.parentElement) * (parseInt(this.scrollHeight) / 100) + 'px';
            else
                this.scrollBody.style.maxHeight = this.scrollHeight;
                
            this.scrollHeaderBox.style.marginRight = this.calculateScrollbarWidth() + 'px';
        }
        
        this.bodyScrollListener = this.renderer.listen(this.scrollBody, 'scroll', () => {
            this.scrollHeaderBox.style.marginLeft = -1 * this.scrollBody.scrollLeft + 'px';
        });
        
        this.headerScrollListener = this.renderer.listen(this.scrollHeader, 'scroll', () => {
            this.scrollHeader.scrollLeft = 0;
        });
        
        if(this.percentageScrollHeight) {
            this.resizeScrollListener = this.renderer.listenGlobal('window', 'resize', () => {
                this.scrollBody.style.maxHeight = this.domHandler.getOuterHeight(this.el.nativeElement.parentElement) * (parseInt(this.scrollHeight) / 100) + 'px';
            });
        }
    }
        
    calculateScrollbarWidth(): number {
        let scrollDiv = document.createElement("div");
        scrollDiv.className = "ui-scrollbar-measure";
        document.body.appendChild(scrollDiv);

        let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        
        return scrollbarWidth;
    }

    hasFooter() {
        if(this.footerRows) {
            return true;
        }
        else {
            if(this.columns) {
                for(let i = 0; i  < this.columns.length; i++) {
                    if(this.columns[i].footer) {
                        return true;
                    }
                }
            }

        }
        return false;
    }

    isEmpty() {
        return !this.dataToRender||(this.dataToRender.length == 0);
    }

    createLazyLoadMetadata(): LazyLoadEvent {
        return {
            first: this.first,
            rows: this.rows,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            filters: this.filters,
            multiSortMeta: this.multiSortMeta
        };
    }
    
    toggleRow(row: any) {
        if(!this.expandedRows) {
            this.expandedRows = [];
        }
        
        let expandedRowIndex = this.findExpandedRowIndex(row);
        
        if(expandedRowIndex != -1) {
            this.expandedRows.splice(expandedRowIndex, 1);
            this.onRowCollapse.emit(row);
        }
        else {
            this.expandedRows.push(row);
            this.onRowExpand.emit(row);
        }
    }
    
    findExpandedRowIndex(row: any): number {
        let index = -1
        if(this.expandedRows) {
            for(let i = 0; i < this.expandedRows.length; i++) {
                if(this.expandedRows[i] == row) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }
    
    isRowExpanded(row) {
        return this.findExpandedRowIndex(row) != -1;
    }
        
    public reset() {
        this.sortField = null;
        this.sortOrder = 1;
        
        this.filteredValue = null;
        this.filters = {};

        if(this.paginator) {
            this.paginate({
                first: 0,
                rows: this.rows
            });
        }
        else {
            this.updateDataToRender(this.value);
        }
    }

    visibleColumns() {
        return this.columns.filter(c => !c.hidden);
    }
    
    public exportCSV() {
        let data = this.value,
        csv = "data:text/csv;charset=utf-8,";
        
        //headers
        for(let i = 0; i < this.columns.length; i++) {
            if(this.columns[i].field) {
                csv += this.columns[i].field;
                
                if(i < (this.columns.length - 1)) {
                    csv += this.csvSeparator;
                }
            }
        }
        
        //body        
        this.value.forEach((record, i) => {
            csv += '\n';
            for(let i = 0; i < this.columns.length; i++) {
                if(this.columns[i].field) {
                    csv += this.resolveFieldData(record, this.columns[i].field);
                    
                    if(i < (this.columns.length - 1)) {
                        csv += this.csvSeparator;
                    }
                }
            }
        });
        
        window.open(encodeURI(csv));
    }

    ngOnDestroy() {
        //remove event listener
        if(this.globalFilterFunction) {
            this.globalFilterFunction();
        }
        
        if(this.scrollable) {
            this.bodyScrollListener();
            this.headerScrollListener();
            
            if(this.percentageScrollHeight) {
                this.resizeScrollListener();
            }
        }
        
        if(this.resizableColumns) {
            this.documentColumnResizeListener();
            this.documentColumnResizeEndListener();
        }
        
        if(this.columnsSubscription) {
            this.columnsSubscription.unsubscribe();
        }
    }
}

@NgModule({
    imports: [CommonModule,SharedModule,PaginatorModule,FormsModule,InputTextModule],
    exports: [DataTable,SharedModule],
    declarations: [DataTable,DTRadioButton,DTCheckbox,RowExpansionLoader]
})
export class DataTableModule { }
