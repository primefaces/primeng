import {NgModule,Component,ElementRef,AfterContentInit,AfterViewInit,AfterViewChecked,OnInit,OnDestroy,DoCheck,Input,ViewContainerRef,ViewChild,
        Output,SimpleChange,EventEmitter,ContentChild,ContentChildren,Renderer,IterableDiffers,QueryList,TemplateRef,ChangeDetectorRef,Inject,forwardRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms'
import {SharedModule} from '../common/shared';
import {PaginatorModule} from '../paginator/paginator';
import {InputTextModule} from '../inputtext/inputtext';
import {Column,Header,Footer,HeaderColumnGroup,FooterColumnGroup,PrimeTemplate} from '../common/shared';
import {LazyLoadEvent,FilterMetadata,SortMeta} from '../common/api';
import {DomHandler} from '../dom/domhandler';
import {Subscription} from 'rxjs/Subscription';
import {BlockableUI} from '../common/api';

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
                <span class="ui-radiobutton-icon" [ngClass]="{'fa fa-circle':checked}"></span>
            </div>
        </div>
    `
})
export class DTRadioButton {
    
    @Input() checked: boolean;

    @Output() onClick: EventEmitter<any> = new EventEmitter();
    
    public hover: boolean;
    
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
                <span class="ui-chkbox-icon ui-c" [ngClass]="{'fa fa-check':checked}"></span>
            </div>
        </div>
    `
})
export class DTCheckbox {
    
    @Input() checked: boolean;
    
    @Input() disabled: boolean;

    @Output() onChange: EventEmitter<any> = new EventEmitter();
    
    public hover: boolean;
    
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
    
    constructor(public viewContainer: ViewContainerRef) {}
    
    ngOnInit() {
        let view = this.viewContainer.createEmbeddedView(this.template, {
            '\$implicit': this.rowData
        });
    }
}

@Component({
    selector: '[pColumnHeaders]',
    template: `
        <template ngFor let-col [ngForOf]="columns" let-lastCol="last">
            <th #headerCell [ngStyle]="col.style" [class]="col.styleClass" [style.display]="col.hidden ? 'none' : 'table-cell'" (click)="dt.sort($event,col)" [attr.colspan]="col.colspan" [attr.rowspan]="col.rowspan"
                [ngClass]="{'ui-state-default ui-unselectable-text':true, 'ui-sortable-column': col.sortable, 'ui-state-active': dt.isSorted(col), 'ui-resizable-column': dt.resizableColumns, 'ui-selection-column':col.selectionMode}" 
                (dragstart)="dt.onColumnDragStart($event)" (dragover)="dt.onColumnDragover($event)" (dragleave)="dt.onColumnDragleave($event)" (drop)="dt.onColumnDrop($event)" (mousedown)="dt.onHeaderMousedown($event,headerCell)"
                [attr.tabindex]="col.sortable ? tabindex : null" (keydown)="dt.onHeaderKeydown($event,col)">
                <span class="ui-column-resizer" *ngIf="dt.resizableColumns && ((dt.columnResizeMode == 'fit' && !lastCol) || dt.columnResizeMode == 'expand')" (mousedown)="dt.initColumnResize($event)"></span>
                <span class="ui-column-title" *ngIf="!col.selectionMode&&!col.headerTemplate">{{col.header}}</span>
                <span class="ui-column-title" *ngIf="col.headerTemplate">
                    <p-columnHeaderTemplateLoader [column]="col"></p-columnHeaderTemplateLoader>
                </span>
                <span class="ui-sortable-column-icon fa fa-fw fa-sort" *ngIf="col.sortable"
                     [ngClass]="{'fa-sort-desc': (dt.getSortOrder(col) == -1),'fa-sort-asc': (dt.getSortOrder(col) == 1)}"></span>
                <input type="text" pInputText class="ui-column-filter" [attr.placeholder]="col.filterPlaceholder" *ngIf="col.filter&&!col.filterTemplate" [value]="dt.filters[col.field] ? filters[col.field].value : ''" 
                    (click)="dt.onFilterInputClick($event)" (keyup)="dt.onFilterKeyup($event.target.value, col.field, col.filterMatchMode)"/>
                <p-columnFilterTemplateLoader [column]="col" *ngIf="col.filterTemplate"></p-columnFilterTemplateLoader>
                <p-dtCheckbox *ngIf="col.selectionMode=='multiple'" (onChange)="dt.toggleRowsWithCheckbox($event)" [checked]="dt.allSelected" [disabled]="dt.isEmpty()"></p-dtCheckbox>
            </th>
        </template>
    `
})
export class ColumnHeaders {
        
    constructor(@Inject(forwardRef(() => DataTable)) private dt:DataTable) {}
    
    @Input("pColumnHeaders") columns: Column[];
}

@Component({
    selector: '[pColumnFooters]',
    template: `
        <th *ngFor="let col of columns" [ngStyle]="col.style" [class]="col.styleClass"
            [attr.colspan]="col.colspan" [attr.rowspan]="col.rowspan"
            [ngClass]="{'ui-state-default':true}" [style.display]="col.hidden ? 'none' : 'table-cell'">
            <span class="ui-column-footer" *ngIf="!col.footerTemplate">{{col.footer}}</span>
            <span class="ui-column-footer" *ngIf="col.footerTemplate">
                <p-columnFooterTemplateLoader [column]="col"></p-columnFooterTemplateLoader>
            </span>
        </th>
    `
})
export class ColumnFooters {
        
    constructor(@Inject(forwardRef(() => DataTable)) private dt:DataTable) {}
    
    @Input("pColumnFooters") columns: Column[];
}

@Component({
    selector: '[pTableBody]',
    template: `
        <template ngFor let-rowData [ngForOf]="dt.dataToRender" let-even="even" let-odd="odd" let-rowIndex="index">
            <tr #rowGroupElement class="ui-widget-header ui-rowgroup-header" 
                *ngIf="dt.rowGroupMode=='subheader' && (rowIndex === 0||(dt.resolveFieldData(rowData,dt.groupField) !== dt.resolveFieldData(dt.dataToRender[rowIndex - 1], dt.groupField)))"
                (click)="dt.onRowGroupClick($event)" [ngStyle]="{'cursor': dt.sortableRowGroup ? 'pointer' : 'auto'}">
                <td [attr.colspan]="columns.length">
                    <a href="#" *ngIf="dt.expandableRowGroups" (click)="dt.toggleRowGroup($event,rowData)">
                        <span class="fa fa-fw" [ngClass]="{'fa-chevron-circle-down':dt.isRowGroupExpanded(rowData), 'fa-chevron-circle-right': !dt.isRowGroupExpanded(rowData)}"></span>
                    </a>
                    <p-templateLoader [template]="dt.rowGroupHeaderTemplate" [data]="rowData"></p-templateLoader>
                </td>
            </tr>
            <tr #rowElement *ngIf="!dt.expandableRowGroups||dt.isRowGroupExpanded(rowData)" [class]="dt.getRowStyleClass(rowData,rowIndex)"
                    (click)="dt.handleRowClick($event, rowData)" (dblclick)="dt.rowDblclick($event,rowData)" (contextmenu)="dt.onRowRightClick($event,rowData)" (touchstart)="dt.handleRowTap($event, rowData)"
                    [ngClass]="{'ui-datatable-even':even&&dt.rowGroupMode!='rowspan','ui-datatable-odd':odd&&dt.rowGroupMode!='rowspan','ui-state-highlight': dt.isSelected(rowData)}">
                <template ngFor let-col [ngForOf]="columns" let-colIndex="index">
                    <td *ngIf="!dt.rowGroupMode || (dt.rowGroupMode == 'subheader') ||
                        (dt.rowGroupMode=='rowspan' && ((dt.sortField==col.field && dt.rowGroupMetadata[dt.resolveFieldData(rowData,dt.sortField)].index == rowIndex) || (dt.sortField!=col.field)))"
                        [ngStyle]="col.style" [class]="col.styleClass" [style.display]="col.hidden ? 'none' : 'table-cell'"
                        [ngClass]="{'ui-editable-column':col.editable,'ui-selection-column':col.selectionMode}" (click)="dt.switchCellToEditMode($event.target,col,rowData)"
                        [attr.rowspan]="(dt.rowGroupMode=='rowspan' && dt.sortField == col.field && dt.rowGroupMetadata[dt.resolveFieldData(rowData,dt.sortField)].index == rowIndex) ? dt.rowGroupMetadata[dt.resolveFieldData(rowData,dt.sortField)].size : null">
                        <span class="ui-column-title" *ngIf="dt.responsive">{{col.header}}</span>
                        <span class="ui-cell-data" *ngIf="!col.bodyTemplate && !col.expander && !col.selectionMode">{{dt.resolveFieldData(rowData,col.field)}}</span>
                        <span class="ui-cell-data" *ngIf="col.bodyTemplate">
                            <p-columnBodyTemplateLoader [column]="col" [rowData]="rowData" [rowIndex]="rowIndex + first"></p-columnBodyTemplateLoader>
                        </span>
                        <div class="ui-cell-editor" *ngIf="col.editable">
                            <input *ngIf="!col.editorTemplate" type="text" pInputText [(ngModel)]="rowData[col.field]" required="true"
                                (keydown)="dt.onCellEditorKeydown($event, col, rowData, colIndex)"/>
                            <p-columnEditorTemplateLoader *ngIf="col.editorTemplate" [column]="col" [rowData]="rowData"></p-columnEditorTemplateLoader>
                        </div>
                        <a href="#" *ngIf="col.expander" (click)="dt.toggleRow(rowData,$event)">
                            <span class="ui-row-toggler fa fa-fw ui-c" [ngClass]="{'fa-chevron-circle-down':dt.isRowExpanded(rowData), 'fa-chevron-circle-right': !dt.isRowExpanded(rowData)}"></span>
                        </a>
                        <p-dtRadioButton *ngIf="col.selectionMode=='single'" (onClick)="dt.selectRowWithRadio($event, rowData)" [checked]="dt.isSelected(rowData)"></p-dtRadioButton>
                        <p-dtCheckbox *ngIf="col.selectionMode=='multiple'" (onChange)="dt.toggleRowWithCheckbox($event,rowData)" [checked]="dt.isSelected(rowData)"></p-dtCheckbox>
                    </td>
                </template>
            </tr>
            <tr class="ui-widget-header" *ngIf="dt.rowGroupFooterTemplate && dt.rowGroupMode=='subheader' && ((rowIndex === dt.dataToRender.length - 1)||(dt.resolveFieldData(rowData,dt.groupField) !== dt.resolveFieldData(dt.dataToRender[rowIndex + 1],dt.groupField))) && (!dt.expandableRowGroups || dt.isRowGroupExpanded(rowData))">
                <p-templateLoader class="ui-helper-hidden" [data]="rowData" [template]="dt.rowGroupFooterTemplate"></p-templateLoader>
            </tr>
            <tr *ngIf="dt.expandableRows && dt.isRowExpanded(rowData)">
                <td [attr.colspan]="dt.visibleColumns().length">
                    <p-rowExpansionLoader [rowData]="rowData" [template]="dt.rowExpansionTemplate"></p-rowExpansionLoader>
                </td>
            </tr>
        </template>

        <tr *ngIf="dt.isEmpty()" class="ui-widget-content">
            <td [attr.colspan]="dt.visibleColumns().length" class="ui-datatable-emptymessage">{{emptyMessage}}</td>
        </tr>
    `
})
export class TableBody {
        
    constructor(@Inject(forwardRef(() => DataTable)) private dt:DataTable) {}
    
    @Input("pTableBody") columns: Column[];
    
    visibleColumns() {
        return this.columns ? this.columns.filter(c => !c.hidden): [];
    }
}

@Component({
    selector: '[pScrollableView]',
    template: `
        <div #scrollHeader class="ui-widget-header ui-datatable-scrollable-header" [ngStyle]="{'width': width}">
            <div #scrollHeaderBox  class="ui-datatable-scrollable-header-box">
                <table [class]="dt.tableStyleClass" [ngStyle]="dt.tableStyle">
                    <thead class="ui-datatable-thead">
                        <tr *ngIf="!dt.headerColumnGroup" class="ui-state-default" [pColumnHeaders]="columns"></tr>
                        <template [ngIf]="dt.headerColumnGroup">
                            <tr *ngFor="let headerRow of dt.headerColumnGroup.rows" class="ui-state-default" [pColumnHeaders]="headerRow.columns"></tr>
                        </template>
                    </thead>
                </table>
            </div>
        </div>
        <div #scrollBody class="ui-datatable-scrollable-body" [ngStyle]="{'width': width,'max-height':dt.scrollHeight}">
            <table [class]="dt.tableStyleClass" [ngStyle]="dt.tableStyle">
                <tbody [ngClass]="{'ui-datatable-data ui-widget-content': true, 'ui-datatable-hoverable-rows': (dt.rowHover||dt.selectionMode)}" [pTableBody]="columns"></tbody>
            </table>
        </div>
    `,
    host:{
        '[class.ui-datatable-scrollable-view]': 'true',
        '[class.ui-datatable-frozen-view]': 'frozen'
    }
})
export class ScrollableView implements AfterViewInit, OnDestroy {
        
    constructor(@Inject(forwardRef(() => DataTable)) private dt:DataTable, private domHandler: DomHandler, private el: ElementRef, public renderer: Renderer,) {}
    
    @Input("pScrollableView") columns: Column[];
    
    @ViewChild('scrollHeader') scrollHeaderViewChild: ElementRef;
    
    @ViewChild('scrollHeaderBox') scrollHeaderBoxViewChild: ElementRef;
    
    @ViewChild('scrollBody') scrollBodyViewChild: ElementRef;
    
    @Input() frozen: boolean;
    
    @Input() width: string;
                    
    public scrollBody: any;
    
    public scrollHeader: any
    
    public scrollHeaderBox: any;
    
    public bodyScrollListener: any;
    
    public headerScrollListener: any;
        
    ngAfterViewInit() {
        this.initScrolling();
    }
    
    initScrolling() {
        this.scrollHeader = <HTMLDivElement> this.scrollHeaderViewChild.nativeElement;
        this.scrollHeaderBox = <HTMLDivElement> this.scrollHeaderBoxViewChild.nativeElement;
        this.scrollBody = <HTMLDivElement> this.scrollBodyViewChild.nativeElement;
        
        if(!this.frozen) {
            let frozenView = this.el.nativeElement.previousElementSibling;
            if(frozenView) {
                var frozenScrollBody = this.domHandler.findSingle(frozenView, '.ui-datatable-scrollable-body');
            }
            
            this.bodyScrollListener = this.renderer.listen(this.scrollBody, 'scroll', () => {
                this.scrollHeaderBox.style.marginLeft = -1 * this.scrollBody.scrollLeft + 'px';
                if(frozenScrollBody) {
                    frozenScrollBody.scrollTop = this.scrollBody.scrollTop;
                }
            });
            
            this.headerScrollListener = this.renderer.listen(this.scrollHeader, 'scroll', () => {
                this.scrollHeader.scrollLeft = 0;
            });
        }
        
        let scrollBarWidth = this.calculateScrollbarWidth();
        if(!this.frozen)
            this.scrollHeaderBox.style.marginRight = scrollBarWidth + 'px';            
        else
            this.scrollBody.style.paddingBottom = scrollBarWidth + 'px';
    }
    
    calculateScrollbarWidth(): number {
        let scrollDiv = document.createElement("div");
        scrollDiv.className = "ui-scrollbar-measure";
        document.body.appendChild(scrollDiv);

        let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        
        return scrollbarWidth;
    }
        
    ngOnDestroy() {
        if(this.bodyScrollListener) {
            this.bodyScrollListener();
        }
        if(this.headerScrollListener) {
            this.headerScrollListener();
        }        
    }
}

@Component({
    selector: 'p-dataTable',
    template: `
        <div [ngStyle]="style" [class]="styleClass" [style.width]="containerWidth"
            [ngClass]="{'ui-datatable ui-widget':true,'ui-datatable-reflow':responsive,'ui-datatable-stacked':stacked,'ui-datatable-resizable':resizableColumns,'ui-datatable-scrollable':scrollable}">
            <div class="ui-datatable-header ui-widget-header" *ngIf="header">
                <ng-content select="p-header"></ng-content>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" styleClass="ui-paginator-bottom"
                (onPageChange)="paginate($event)" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && paginatorPosition!='bottom' || paginatorPosition =='both'"></p-paginator>
            <div class="ui-datatable-tablewrapper" *ngIf="!scrollable">
                <table [class]="tableStyleClass" [ngStyle]="tableStyle">
                    <thead class="ui-datatable-thead">
                        <tr *ngIf="!headerColumnGroup" class="ui-state-default" [pColumnHeaders]="columns"></tr>
                        <template [ngIf]="headerColumnGroup">
                            <tr *ngFor="let headerRow of headerColumnGroup.rows" class="ui-state-default" [pColumnHeaders]="headerRow.columns"></tr>
                        </template>
                    </thead>
                    <tfoot *ngIf="hasFooter()" class="ui-datatable-tfoot">
                        <tr *ngIf="!footerColumnGroup" [pColumnFooters]="columns"></tr>
                        <template [ngIf]="footerColumnGroup">
                            <tr *ngFor="let footerRow of footerColumnGroup.rows" [pColumnFooters]="footerRow.columns"></tr>
                        </template>
                    </tfoot>
                    <tbody [ngClass]="{'ui-datatable-data ui-widget-content': true, 'ui-datatable-hoverable-rows': (rowHover||selectionMode)}" [pTableBody]="columns"></tbody>
                </table>
                <div class="ui-column-resizer-helper ui-state-highlight" style="display:none"></div>
                <span class="fa fa-arrow-down ui-datatable-reorder-indicator-up" style="position: absolute; display: none;"></span>
                <span class="fa fa-arrow-up ui-datatable-reorder-indicator-down" style="position: absolute; display: none;"></span>
            </div>
            
            <template [ngIf]="scrollable">
                <div class="ui-datatable-scrollable-wrapper ui-helper-clearfix" [ngClass]="{'max-height':scrollHeight}">
                    <div *ngIf="frozenColumns && frozenColumns.length" [pScrollableView]="frozenColumns" frozen="true" [width]="this.frozenWidth"></div>
                    <div [pScrollableView]="scrollableColumns" [width]="this.scrollWidth"></div>
                </div>
            </template>
            
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" styleClass="ui-paginator-bottom"
                (onPageChange)="paginate($event)" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && paginatorPosition!='top' || paginatorPosition =='both'"></p-paginator>
            <div class="ui-datatable-footer ui-widget-header" *ngIf="footer">
                <ng-content select="p-footer"></ng-content>
            </div>
        </div>
    `,
    providers: [DomHandler]
})
export class DataTable implements AfterViewChecked,AfterViewInit,AfterContentInit,OnInit,DoCheck,OnDestroy,BlockableUI {

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
    
    @Input() frozenWidth: any;

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() tableStyle: any;

    @Input() tableStyleClass: string;

    @Input() globalFilter: any;

    @Input() sortMode: string = 'single';

    @Input() sortField: string;

    @Input() sortOrder: number = 1;
    
    @Input() groupField: string;

    @Input() multiSortMeta: SortMeta[];
    
    @Input() contextMenu: any;
    
    @Input() csvSeparator: string = ',';
    
    @Input() exportFilename: string = 'download';
    
    @Input() emptyMessage: string = 'No records found';
    
    @Input() paginatorPosition: string = 'bottom';
            
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
    
    @Input() expandedRows: any[];
    
    @Input() expandableRowGroups: boolean;
    
    @Input() public expandedRowsGroups: any[];
    
    @Input() tabindex: number = 1;
    
    @Input() rowStyleClass: Function;
    
    @Input() rowGroupMode: string; 
    
    @Input() sortableRowGroup: boolean = true; 
    
    @Input() sortFile: string; 

    @Input() rowHover: boolean;
    
    @Input() first: number = 0;
    
    @Input() public filters: {[s: string]: FilterMetadata;} = {};
        
    @Output() onRowExpand: EventEmitter<any> = new EventEmitter();
    
    @Output() onRowCollapse: EventEmitter<any> = new EventEmitter();
    
    @Output() onRowGroupExpand: EventEmitter<any> = new EventEmitter();
    
    @Output() onRowGroupCollapse: EventEmitter<any> = new EventEmitter();
        
    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
    
    @ContentChildren(Column) cols: QueryList<Column>;
    
    @ContentChild(HeaderColumnGroup) headerColumnGroup: HeaderColumnGroup;
    
    @ContentChild(FooterColumnGroup) footerColumnGroup: FooterColumnGroup;
        
    public dataToRender: any[];

    public page: number = 0;

    public filterTimeout: any;

    public filteredValue: any[];

    public columns: Column[];
    
    public frozenColumns: Column[];
    
    public scrollableColumns: Column[];

    public columnsChanged: boolean = false;
    
    public dataChanged: boolean = false;
    
    public stopSortPropagation: boolean;
    
    public sortColumn: Column;
    
    public columnResizing: boolean;
    
    public lastPageX: number;
        
    public documentColumnResizeListener: Function;
    
    public documentColumnResizeEndListener: Function;
    
    public resizerHelper: any;
    
    public resizeColumn: any;
    
    public reorderIndicatorUp: any;
    
    public reorderIndicatorDown: any;
    
    public draggedColumn: any;
    
    public dropPosition: number;
            
    public tbody: any;
    
    public rowTouch: boolean;
    
    public rowGroupToggleClick: boolean;
    
    public editingCell: any;
    
    public stopFilterPropagation: boolean;
    
    public rowGroupMetadata: any;
    
    public rowGroupHeaderTemplate: TemplateRef<any>;
    
    public rowGroupFooterTemplate: TemplateRef<any>;
    
    public rowExpansionTemplate: TemplateRef<any>;
    
    differ: any;

    globalFilterFunction: any;
    
    columnsSubscription: Subscription;
    
    constructor(public el: ElementRef, public domHandler: DomHandler, differs: IterableDiffers, 
            public renderer: Renderer, private changeDetector: ChangeDetectorRef) {
        this.differ = differs.find([]).create(null);
    }

    ngOnInit() {
        if(this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
    }
    
    ngAfterContentInit() {
        this.initColumns();
        
        this.columnsSubscription = this.cols.changes.subscribe(_ => {
            this.initColumns();
            this.changeDetector.markForCheck();
        });
        
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'rowexpansion':
                    this.rowExpansionTemplate = item.template;
                break;
                
                case 'rowgroupheader':
                    this.rowGroupHeaderTemplate = item.template;
                break;
                
                case 'rowgroupfooter':
                    this.rowGroupFooterTemplate = item.template;
                break;
            }
        });
    }

    ngAfterViewChecked() {
        if(this.columnsChanged && this.el.nativeElement.offsetParent) {
            if(this.resizableColumns) {
                this.initResizableColumns();
            }

            if(this.reorderableColumns) {
                this.initColumnReordering();
            }

            this.columnsChanged = false;
        }
        
        if(this.dataChanged) {            
            this.dataChanged = false;
        }
    }

    ngAfterViewInit() {
        if(this.globalFilter) {
            this.globalFilterFunction = this.renderer.listen(this.globalFilter, 'keyup', () => {
                this.filterTimeout = setTimeout(() => {
                    this._filter();
                    this.filterTimeout = null;
                }, this.filterDelay);
            });
        }
    }

    ngDoCheck() {
        let changes = this.differ.diff(this.value);
        if(changes) {
            this.dataChanged = true;
            if(this.paginator) {
                this.updatePaginator();
            }

            if(this.hasFilter()) {
                if(this.lazy) {
                    //prevent loop
                    if(this.stopFilterPropagation)
                        this.stopFilterPropagation = false;
                    else
                        this._filter();
                }
                else {
                    this._filter();
                }
            }
                        
            if(this.stopSortPropagation) {
                this.stopSortPropagation = false;
            }
            else if(!this.lazy && (this.sortField||this.multiSortMeta)) {  
                if(!this.sortColumn && this.columns) {
                    this.sortColumn = this.columns.find(col => col.field === this.sortField && col.sortable === 'custom');
                }              
                
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
        
        if(this.scrollable) {
            this.frozenColumns = [];
            this.scrollableColumns = [];
            this.cols.forEach((col) => {
                if(col.frozen)
                    this.frozenColumns.push(col);
                else
                    this.scrollableColumns.push(col);
            });
        }
        
        this.columnsChanged = true;
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
                    if (value == null) {
                        return null;
                    }
                    value = value[fields[i]];
                }
                return value;
            }
        }
        else {
            return null;
        }
    }
    
    updateRowGroupMetadata() {
        this.rowGroupMetadata = {};
        if(this.dataToRender) {
            for(let i = 0; i < this.dataToRender.length; i++) {
                let rowData = this.dataToRender[i];
                let group = this.resolveFieldData(rowData, this.sortField);
                if(i == 0) {
                    this.rowGroupMetadata[group] = {index:0, size: 1};
                }  
                else {
                    let previousRowData = this.dataToRender[i-1];
                    let previousRowGroup = this.resolveFieldData(previousRowData, this.sortField);
                    if(group === previousRowGroup) {
                        this.rowGroupMetadata[group].size++;
                    }
                    else {
                        this.rowGroupMetadata[group] = {index:i, size: 1};
                    }
                }
            }
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

        if(this.lazy) {
            this.stopFilterPropagation = true;
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }            
        else {
            this.updateDataToRender(this.filteredValue||this.value);
        }

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
        
        if(this.rowGroupMode) {
            this.updateRowGroupMetadata();
        }
    }
    
    onHeaderKeydown(event, column: Column) {
        if(event.keyCode == 13) {
            this.sort(event, column);
            event.preventDefault();
        }
    }
    
    onHeaderMousedown(event, header: any) {
        if(this.reorderableColumns) {
            if(event.target.nodeName !== 'INPUT') {
                header.draggable = true;
            } else if(event.target.nodeName === 'INPUT') {
                header.draggable = false;
            }
        }
    }
    
    sort(event, column: Column) {
        if(!column.sortable) {
            return;
        }
        
        let targetNode = event.target.nodeName;
        if(targetNode == 'TH' || (targetNode == 'SPAN' && !this.domHandler.hasClass(event.target, 'ui-c'))) {
            let columnSortField = column.sortField||column.field;
            this.sortOrder = (this.sortField === columnSortField)  ? this.sortOrder * -1 : 1;
            this.sortField = columnSortField;
            this.sortColumn = column;
            let metaKey = event.metaKey||event.ctrlKey;

            if(this.lazy) {
                this.stopFilterPropagation = true;
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
            
            this.first = 0;

            if(this.hasFilter()) {
                this._filter();
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
                this._filter();
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
        if(!column.sortable) {
            return false;
        }
        
        let columnSortField = column.sortField||column.field;
        
        if(this.sortMode === 'single') {
            return (this.sortField && columnSortField === this.sortField);
        }
        else if(this.sortMode === 'multiple') {
            let sorted = false;
            if(this.multiSortMeta) {
                for(let i = 0; i < this.multiSortMeta.length; i++) {
                    if(this.multiSortMeta[i].field == columnSortField) {
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
        let columnSortField = column.sortField||column.field;
        
        if(this.sortMode === 'single') {
            if(this.sortField && columnSortField === this.sortField) {
                order = this.sortOrder;
            }
        }
        else if(this.sortMode === 'multiple') {
            if(this.multiSortMeta) {
                for(let i = 0; i < this.multiSortMeta.length; i++) {
                    if(this.multiSortMeta[i].field == columnSortField) {
                        order = this.multiSortMeta[i].order;
                        break;
                    }
                }
            }
        }
        return order;
    }
    
    onRowGroupClick(event) {
        if(this.rowGroupToggleClick) {
            this.rowGroupToggleClick = false;
            return;
        }
        
        if(this.sortableRowGroup) {
            let targetNode = event.target.nodeName;
            if((targetNode == 'TD' || (targetNode == 'SPAN' && !this.domHandler.hasClass(event.target, 'ui-c')))) {
                if(this.sortField != this.groupField) {
                    this.sortField = this.groupField;
                    this.sortSingle();
                }
                else {
                    this.sortOrder = -1 * this.sortOrder;
                    this.sortSingle();
                }
            }
        }
    }
    
    handleRowClick(event, rowData) {
        if(this.rowTouch) {
            this.rowTouch = false;
            return false;
        }
        
        let targetNode = event.target.nodeName;
        if(targetNode == 'TD' || (targetNode == 'SPAN' && !this.domHandler.hasClass(event.target, 'ui-c'))) {
            this.onRowClick.next({originalEvent: event, data: rowData});
            
            if(!this.selectionMode) {
                return;
            }
            
            let metaKey = event.metaKey||event.ctrlKey;
            let selected = this.isSelected(rowData);
            
            if(selected && metaKey) {
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
                    if(metaKey)
                        this.selection = this.selection||[];
                    else 
                        this.selection = [];
                    
                    this.selection.push(rowData);
                    this.selectionChange.emit(this.selection);
                }

                this.onRowSelect.emit({originalEvent: event, data: rowData, type: 'row'});
            }
        }
    }

    handleRowTap(event, rowData) {
        this.rowTouch = true;
        
        let targetNode = event.target.nodeName;
        if(targetNode == 'TD' || (targetNode == 'SPAN' && !this.domHandler.hasClass(event.target, 'ui-c'))) {
            this.onRowClick.next({originalEvent: event, data: rowData});
            
            if(!this.selectionMode) {
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
    }
    
    selectRowWithRadio(event, rowData:any) {
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
        if(this.dataToRender && this.selection && (this.dataToRender.length <= this.selection.length)) {
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
            this.filter(value, field, matchMode);
            this.filterTimeout = null;            
        }, this.filterDelay);
    }
    
    filter(value, field, matchMode) {
        if(!this.isFilterBlank(value))
            this.filters[field] = {value: value, matchMode: matchMode};
        else if(this.filters[field])
            delete this.filters[field];
        
        this._filter(); 
    }
    
    isFilterBlank(filter: any): boolean {
        if(filter !== null && filter !== undefined) {
            if((typeof filter === 'string' && filter.trim().length == 0) || (filter instanceof Array && filter.length == 0))
                return true;
            else
                return false;
        } 
        return true;
    }

    _filter() {
        this.first = 0;
        
        if(this.lazy) {
            this.stopFilterPropagation = true;
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

        return !empty || (this.globalFilter && this.globalFilter.value && this.globalFilter.value.trim().length);
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
            if(filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
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

            let filterValue = filter.toString().toLowerCase();
            return value.toString().toLowerCase().indexOf(filterValue, value.toString().length - filterValue.length) !== -1;
        },
        
        equals(value, filter): boolean {
            if(filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                return true;
            }
            
            if(value === undefined || value === null) {
                return false;
            }
            
            return value.toString().toLowerCase() == filter.toString().toLowerCase();
        },
        
        in(value, filter: any[]): boolean {
            if(filter === undefined || filter === null || filter.length === 0) {
                return true;
            }

            if(value === undefined || value === null) {
                return false;
            }
            
            for(let i = 0; i < filter.length; i++) {
                if(filter[i] === value)
                    return true;
            }
            
            return false;
        }
    }

    switchCellToEditMode(element: any, column: Column, rowData: any) {
        if(!this.selectionMode && this.editable && column.editable) {
            let cell = this.findCell(element);            
            if(cell != this.editingCell) {
                if(this.editingCell && this.domHandler.find(this.editingCell, '.ng-invalid.ng-dirty').length == 0) {
                    this.domHandler.removeClass(this.editingCell, 'ui-cell-editing');
                }
                
                this.editingCell = cell;
                this.onEditInit.emit({column: column, data: rowData});
                this.domHandler.addClass(cell, 'ui-cell-editing');
                let focusable = this.domHandler.findSingle(cell, '.ui-cell-editor input');
                if(focusable) {
                    setTimeout(() => this.renderer.invokeElementMethod(focusable, 'focus'), 100);
                }
            }
        }
    }

    switchCellToViewMode(element: any) {
        let cell = this.findCell(element); 
        this.domHandler.removeClass(cell, 'ui-cell-editing');
    }

    onCellEditorKeydown(event, column: Column, rowData: any, colIndex: number) {
        if(this.editable) {
            this.onEdit.emit({originalEvent: event, column: column, data: rowData});
            
            //enter
            if(event.keyCode == 13) {
                this.onEditComplete.emit({column: column, data: rowData});
                this.renderer.invokeElementMethod(event.target, 'blur');
                this.switchCellToViewMode(event.target);
                event.preventDefault();
            }
            
            //escape
            else if(event.keyCode == 27) {
                this.onEditCancel.emit({column: column, data: rowData});
                this.renderer.invokeElementMethod(event.target, 'blur');
                this.switchCellToViewMode(event.target);
                event.preventDefault();
            }
            
            //tab
            else if(event.keyCode == 9) {
                let currentCell = this.findCell(event.target);
                let row = currentCell.parentElement;
                let targetCell;
                
                if(event.shiftKey) {
                    if(colIndex == 0) {
                        let previousRow = row.previousElementSibling;
                        if(previousRow) {
                            targetCell = previousRow.lastElementChild;
                        }
                    }
                    else {
                        targetCell = row.children[colIndex - 1];
                    }
                }
                else {
                    if(colIndex == (row.children.length - 1)) {
                        let nextRow = row.nextElementSibling;
                        if(nextRow) {
                            targetCell = nextRow.firstElementChild;
                        }
                    }
                    else {
                        targetCell = row.children[colIndex + 1];
                    }
                }
                
                if(targetCell) {
                    this.renderer.invokeElementMethod(targetCell, 'click');
                    event.preventDefault();
                }
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
                
                if(this.header) {
                    let headerEL = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-datatable-header');
                    headerEL.style.width = this.tbody.parentElement.style.width;
                }
                
                if(this.footer) {
                    let footerEL = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-datatable-footer');
                    footerEL.style.width = this.tbody.parentElement.style.width;
                }
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
            col.style.width = col.offsetWidth + 'px';
        }
    }
    
    onColumnDragStart(event) {
        if (this.columnResizing) {
            event.preventDefault();
            return;
        }

        this.draggedColumn = this.findParentHeader(event.target);
        event.dataTransfer.setData('text', 'b'); // Firefox requires this to make dragging possible
    }
    
    onColumnDragover(event) {
        if(this.reorderableColumns && this.draggedColumn) {
            event.preventDefault();
            let dropHeader = this.findParentHeader(event.target);
            
            if(this.draggedColumn != dropHeader) {
                let targetPosition = dropHeader.getBoundingClientRect();
                let targetLeft = targetPosition.left + this.domHandler.getWindowScrollLeft();
                let targetTop =  targetPosition.top + this.domHandler.getWindowScrollTop();
                let columnCenter = targetLeft + dropHeader.offsetWidth / 2;
                
                this.reorderIndicatorUp.style.top = (targetTop - 16) + 'px';
                this.reorderIndicatorDown.style.top = targetTop + dropHeader.offsetHeight + 'px';

                if(event.pageX > columnCenter) {
                    this.reorderIndicatorUp.style.left = (targetLeft + dropHeader.offsetWidth - 8) + 'px';
                    this.reorderIndicatorDown.style.left = (targetLeft + dropHeader.offsetWidth - 8)+ 'px';
                    this.dropPosition = 1;
                }
                else {
                    this.reorderIndicatorUp.style.left = (targetLeft - 8) + 'px';
                    this.reorderIndicatorDown.style.left = (targetLeft - 8)+ 'px';
                    this.dropPosition = -1;
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
        if(this.draggedColumn) {
             let dragIndex = this.domHandler.index(this.draggedColumn);
            let dropIndex = this.domHandler.index(this.findParentHeader(event.target));
            let allowDrop = (dragIndex != dropIndex);
            if(allowDrop && ((dropIndex - dragIndex == 1 && this.dropPosition === -1) || (dragIndex - dropIndex == 1 && this.dropPosition === 1))) {
                allowDrop = false;
            }
        
            if(allowDrop) {
                this.columns.splice(dropIndex, 0, this.columns.splice(dragIndex, 1)[0]);

                this.onColReorder.emit({
                    dragIndex: dragIndex,
                    dropIndex: dropIndex,
                    columns: this.columns
                });
            }
            
            this.reorderIndicatorUp.style.display = 'none';
            this.reorderIndicatorDown.style.display = 'none';
            this.draggedColumn.draggable = false;
            this.draggedColumn = null;
            this.dropPosition = null;
        }
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
            
    hasFooter() {
        if(this.footerColumnGroup) {
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
    
    toggleRow(row: any, event?: Event) {
        if(!this.expandedRows) {
            this.expandedRows = [];
        }
        
        let expandedRowIndex = this.findExpandedRowIndex(row);
        
        if(expandedRowIndex != -1) {
            this.expandedRows.splice(expandedRowIndex, 1);
            this.onRowCollapse.emit({
                originalEvent: event, 
                data: row
            });
        }
        else {
            this.expandedRows.push(row);
            this.onRowExpand.emit({
                originalEvent: event, 
                data: row
            });
        }
        
        if(event) {
            event.preventDefault();
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
    
    isRowExpanded(row: any): boolean {
        return this.findExpandedRowIndex(row) != -1;
    }
    
    findExpandedRowGroupIndex(row: any): number {
        let index = -1;
        if(this.expandedRowsGroups && this.expandedRowsGroups.length) {
            for(let i = 0; i < this.expandedRowsGroups.length; i++) {
                let group = this.expandedRowsGroups[i];
                let rowGroupField = this.resolveFieldData(row, this.groupField);
                if(rowGroupField === group) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }
    
    isRowGroupExpanded(row: any): boolean {
        return this.findExpandedRowGroupIndex(row) != -1;
    }
    
    toggleRowGroup(event: Event, row: any): void {
        this.rowGroupToggleClick = true;
        let index = this.findExpandedRowGroupIndex(row);
        let rowGroupField = this.resolveFieldData(row, this.groupField);
        if(index >= 0) {
            this.expandedRowsGroups.splice(index, 1);
            this.onRowGroupCollapse.emit({
                originalEvent: event, 
                group: rowGroupField
            });
        }
        else {
            this.expandedRowsGroups = this.expandedRowsGroups||[],
            this.expandedRowsGroups.push(rowGroupField);
            this.onRowGroupExpand.emit({
                originalEvent: event, 
                group: rowGroupField
            });
        }
        event.preventDefault();
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
    
    public exportCSV() {
        let data = this.value;
        let csv = '';
        
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
        
        let blob = new Blob([csv],{
            type: 'text/csv;charset=utf-8;'
        });
        
        if(window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, this.exportFilename + '.csv');
        }
        else {
            let link = document.createElement("a");
            link.style.display = 'none';
            document.body.appendChild(link);
            if(link.download !== undefined) {
                link.setAttribute('href', URL.createObjectURL(blob));
                link.setAttribute('download', this.exportFilename + '.csv');
                document.body.appendChild(link);
                link.click();
            }
            else {
                csv = 'data:text/csv;charset=utf-8,' + csv;
                window.open(encodeURI(csv));
            }
            document.body.removeChild(link);
        }
    }
    
    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }
    
    getRowStyleClass(rowData: any, rowIndex: number) {
        let styleClass = 'ui-widget-content';
        if(this.rowStyleClass) {
            let rowClass = this.rowStyleClass.call(this, rowData, rowIndex);
            if(rowClass) {
                styleClass += ' ' + rowClass;
            }
        }
        return styleClass;
    }
    
    visibleColumns() {
        return this.columns ? this.columns.filter(c => !c.hidden): [];
    }
    
    get containerWidth() {
        if(this.scrollable && this.scrollWidth) {
            var total = parseInt(this.scrollWidth);
            return this.frozenWidth ? (total + parseInt(this.frozenWidth) + 'px') : total + 'px';
        }
        else {
            return this.style ? this.style.width : null;
        }
    }

    ngOnDestroy() {
        //remove event listener
        if(this.globalFilterFunction) {
            this.globalFilterFunction();
        }
                
        if(this.resizableColumns && this.documentColumnResizeListener && this.documentColumnResizeEndListener) {
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
    declarations: [DataTable,DTRadioButton,DTCheckbox,ColumnHeaders,ColumnFooters,TableBody,ScrollableView,RowExpansionLoader]
})
export class DataTableModule { }
