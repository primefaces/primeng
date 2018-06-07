import {NgModule, Component, ElementRef, AfterContentInit, AfterViewInit, AfterViewChecked, OnInit, OnDestroy, Input,
  ViewContainerRef, ViewChild, IterableDiffers,
  Output, EventEmitter, ContentChild, ContentChildren, Renderer2, QueryList, TemplateRef,
  ChangeDetectorRef, Inject, forwardRef, EmbeddedViewRef, NgZone
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms'
import {SharedModule} from '../common/shared';
import {PaginatorModule} from '../paginator/paginator';
import {Column,Header,Footer,HeaderColumnGroup,FooterColumnGroup,PrimeTemplate} from '../common/shared';
import {LazyLoadEvent} from '../common/lazyloadevent';
import {FilterMetadata} from '../common/filtermetadata';
import {SortMeta} from '../common/sortmeta';
import {DomHandler} from '../dom/domhandler';
import {ObjectUtils} from '../utils/objectutils';
import {Subscription} from 'rxjs';
import {BlockableUI} from '../common/blockableui';

@Component({
    selector: 'p-dtRadioButton',
    template: `
        <div class="ui-radiobutton ui-widget">
            <div class="ui-helper-hidden-accessible">
                <input type="radio" [checked]="checked">
            </div>
            <div class="ui-radiobutton-box ui-widget ui-radiobutton-relative ui-state-default" (click)="handleClick($event)"
                        [ngClass]="{'ui-state-active':checked}">
                <span class="ui-radiobutton-icon ui-clickable" [ngClass]="{'fa fa-circle':checked}"></span>
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
                        [ngClass]="{'ui-state-active':checked&&!disabled,'ui-state-disabled':disabled}">
                <span class="ui-chkbox-icon ui-clickable" [ngClass]="{'fa fa-check':checked}"></span>
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
    selector: '[pColumnHeaders]',
    template: `
        <ng-template ngFor let-col [ngForOf]="columns" let-lastCol="last">
            <th #headerCell [attr.id]="col.colId" [ngStyle]="col.headerStyle||col.style" [class]="col.headerStyleClass||col.styleClass" (click)="dt.sort($event,col)" [attr.colspan]="col.colspan" [attr.rowspan]="col.rowspan"
                [ngClass]="{'ui-state-default ui-unselectable-text':true, 'ui-sortable-column': col.sortable, 'ui-state-active': dt.isSorted(col), 'ui-resizable-column': dt.resizableColumns, 'ui-selection-column':col.selectionMode,
                            'ui-helper-hidden': col.hidden}"
                (dragstart)="dt.onColumnDragStart($event)" (dragleave)="dt.onColumnDragleave($event)" (drop)="dt.onColumnDrop($event)" (mousedown)="dt.onHeaderMousedown($event,headerCell)"
                [attr.tabindex]="col.sortable ? dt.tabindex : null" (keydown)="dt.onHeaderKeydown($event,col)"
                [attr.scope]="col.scope||(col.colspan ? 'colgroup' : 'col')">
                <span class="ui-column-resizer ui-clickable" *ngIf="dt.resizableColumns && col.resizable && ((dt.columnResizeMode == 'fit' && !lastCol) || dt.columnResizeMode == 'expand')" (mousedown)="dt.initColumnResize($event)"></span>
                <span class="ui-column-title" *ngIf="!col.selectionMode&&!col.headerTemplate">{{col.header}}</span>
                <span class="ui-column-title" *ngIf="col.headerTemplate">
                    <ng-container *ngTemplateOutlet="col.headerTemplate; context: {$implicit: col}"></ng-container>
                </span>
                <span class="ui-sortable-column-icon fa fa-fw fa-sort" *ngIf="col.sortable"
                     [ngClass]="{'fa-sort-desc': (dt.getSortOrder(col) == -1),'fa-sort-asc': (dt.getSortOrder(col) == 1)}"></span>
                <input [attr.type]="col.filterType" class="ui-column-filter ui-inputtext ui-widget ui-state-default ui-corner-all" [attr.maxlength]="col.filterMaxlength" [attr.placeholder]="col.filterPlaceholder" *ngIf="col.filter&&!col.filterTemplate" [value]="dt.filters[col.filterField||col.field] ? dt.filters[col.filterField||col.field].value : ''"
                    (click)="dt.onFilterInputClick($event)" (input)="dt.onFilterKeyup($event.target.value, col.filterField||col.field, col.filterMatchMode)"/>
                <ng-container *ngIf="col.filter && col.filterTemplate">
                    <ng-container *ngTemplateOutlet="col.filterTemplate; context: {$implicit: col}"></ng-container>
                </ng-container>
                <p-dtCheckbox *ngIf="col.selectionMode=='multiple' && dt.showHeaderCheckbox === true" (onChange)="dt.toggleRowsWithCheckbox($event)" [checked]="dt.allSelected" [disabled]="dt.isEmpty()"></p-dtCheckbox>
            </th>
        </ng-template>
    `
})
export class ColumnHeaders {
    
    constructor(@Inject(forwardRef(() => DataTable)) public dt:DataTable) {}
    
    @Input("pColumnHeaders") columns: Column[];
}

@Component({
    selector: '[pColumnFooters]',
    template: `
        <td *ngFor="let col of columns" [ngStyle]="col.footerStyle||col.style" [class]="col.footerStyleClass||col.styleClass"
            [attr.colspan]="col.colspan" [attr.rowspan]="col.rowspan"
            [ngClass]="{'ui-state-default':true, 'ui-helper-hidden': col.hidden}">
            <span class="ui-column-footer" *ngIf="!col.footerTemplate">{{col.footer}}</span>
            <span class="ui-column-footer" *ngIf="col.footerTemplate">
                <ng-container *ngTemplateOutlet="col.footerTemplate; context: {$implicit: col}"></ng-container>
            </span>
        </td>
    `
})
export class ColumnFooters {
    
    constructor(@Inject(forwardRef(() => DataTable)) public dt:DataTable) {}
    
    @Input("pColumnFooters") columns: Column[];
}

@Component({
    selector: '[pTableBody]',
    template: `
        <ng-template ngFor let-rowData [ngForOf]="data" let-even="even" let-odd="odd" let-rowIndex="index" [ngForTrackBy]="dt.rowTrackBy">
            <tr #rowGroupElement class="ui-widget-header ui-rowgroup-header"
                *ngIf="dt.rowGroupMode=='subheader' && (rowIndex === 0||(dt.resolveFieldData(rowData,dt.groupField) !== dt.resolveFieldData(dt.dataToRender[rowIndex - 1], dt.groupField)))"
                (click)="dt.onRowGroupClick($event)" [ngStyle]="{'cursor': dt.sortableRowGroup ? 'pointer' : 'auto'}">
                <td [attr.colspan]="dt.visibleColumns().length">
                    <a href="#" *ngIf="dt.expandableRowGroups" (click)="dt.toggleRowGroup($event,rowData)">
                        <span class="fa fa-fw" [ngClass]="dt.isRowGroupExpanded(rowData) ? dt.expandedIcon : dt.collapsedIcon"></span>
                    </a>
                    <span class="ui-rowgroup-header-name">
                        <ng-container *ngTemplateOutlet="dt.rowGroupHeaderTemplate; context: {$implicit: rowData}"></ng-container>
                    </span>
                </td>
            </tr>
            <tr #rowElement *ngIf="!dt.expandableRowGroups||dt.isRowGroupExpanded(rowData)"
                    (click)="dt.handleRowClick($event, rowData, rowIndex)" (dblclick)="dt.rowDblclick($event,rowData)" (contextmenu)="dt.onRowRightClick($event,rowData)" (touchend)="dt.handleRowTouchEnd($event)"
                    [ngClass]="[even&&dt.rowGroupMode!='rowspan'? 'ui-datatable-even':'',
                                odd&&dt.rowGroupMode!='rowspan'?'ui-datatable-odd':'',
                                dt.isSelected(rowData)? 'ui-state-highlight': '',
                                dt.isRowExpanded(rowData) ? 'ui-expanded-row': '',
                                dt.getRowStyleClass(rowData,rowIndex)]">
                <ng-template ngFor let-col [ngForOf]="columns" let-colIndex="index">
                    <td #cell *ngIf="!dt.rowGroupMode || (dt.rowGroupMode == 'subheader') ||
                        (dt.rowGroupMode=='rowspan' && ((dt.sortField==col.field && dt.rowGroupMetadata[dt.resolveFieldData(rowData,dt.sortField)].index == rowIndex) || (dt.sortField!=col.field)))"
                        [ngStyle]="col.bodyStyle||col.style" [class]="col.bodyStyleClass||col.styleClass" (click)="dt.switchCellToEditMode(cell,col,rowData)"
                        [ngClass]="{'ui-editable-column':col.editable,'ui-selection-column':col.selectionMode, 'ui-helper-hidden': col.hidden}"
                        [attr.rowspan]="(dt.rowGroupMode=='rowspan' && dt.sortField == col.field && dt.rowGroupMetadata[dt.resolveFieldData(rowData,dt.sortField)].index == rowIndex) ? dt.rowGroupMetadata[dt.resolveFieldData(rowData,dt.sortField)].size : null">
                        <span class="ui-column-title" *ngIf="dt.responsive">{{col.header}}</span>
                        <span class="ui-cell-data" *ngIf="!col.bodyTemplate && !col.expander && !col.selectionMode">{{dt.resolveFieldData(rowData,col.field)}}</span>
                        <span class="ui-cell-data" *ngIf="col.bodyTemplate">
                            <ng-container *ngTemplateOutlet="col.bodyTemplate; context: {$implicit: col, rowData: rowData, rowIndex: (rowIndex + dt.first)}"></ng-container>
                        </span>
                        <div class="ui-cell-editor" *ngIf="col.editable">
                            <input *ngIf="!col.editorTemplate" type="text" [(ngModel)]="rowData[col.field]"
                                (keydown)="dt.onCellEditorKeydown($event, col, rowData, rowIndex)" (blur)="dt.onCellEditorBlur($event, col, rowData, rowIndex)"
                                (input)="dt.onCellEditorInput($event, col, rowData, rowIndex)" (change)="dt.onCellEditorChange($event, col, rowData, rowIndex)"
                                class="ui-inputtext ui-widget ui-state-default ui-corner-all"/>
                            <a *ngIf="col.editorTemplate" class="ui-cell-editor-proxy-focus" href="#" (focus)="dt.onCustomEditorFocusPrev($event)"></a>
                            <ng-container *ngTemplateOutlet="col.editorTemplate; context: {$implicit: col, rowData: rowData, rowIndex: rowIndex}"></ng-container>
                            <a *ngIf="col.editorTemplate" class="ui-cell-editor-proxy-focus" href="#" (focus)="dt.onCustomEditorFocusNext($event)"></a>
                        </div>
                        <a href="#" *ngIf="col.expander" (click)="dt.toggleRow(rowData,$event)">
                            <span class="ui-row-toggler fa fa-fw ui-clickable" [ngClass]="dt.isRowExpanded(rowData) ? dt.expandedIcon : dt.collapsedIcon"></span>
                        </a>
                        <p-dtRadioButton *ngIf="col.selectionMode=='single'" (onClick)="dt.selectRowWithRadio($event, rowData)" [checked]="dt.isSelected(rowData)"></p-dtRadioButton>
                        <p-dtCheckbox *ngIf="col.selectionMode=='multiple'" (onChange)="dt.toggleRowWithCheckbox($event,rowData)" [checked]="dt.isSelected(rowData)"></p-dtCheckbox>
                    </td>
                </ng-template>
            </tr>
            <tr *ngIf="dt.expandableRows && dt.isRowExpanded(rowData)" class="ui-expanded-row-content">
                <td [attr.colspan]="dt.visibleColumns().length">
                    <ng-container *ngTemplateOutlet="dt.rowExpansionTemplate; context: {$implicit: rowData, rowIndex: rowIndex}"></ng-container>
                </td>
            </tr>
            <tr class="ui-widget-header ui-rowgroup-footer" *ngIf="dt.rowGroupFooterTemplate && dt.rowGroupMode=='subheader' && ((rowIndex === dt.dataToRender.length - 1)||(dt.resolveFieldData(rowData,dt.groupField) !== dt.resolveFieldData(dt.dataToRender[rowIndex + 1],dt.groupField))) && (!dt.expandableRowGroups || dt.isRowGroupExpanded(rowData))">
                <ng-container *ngTemplateOutlet="dt.rowGroupFooterTemplate; context: {$implicit: rowData}"></ng-container>
            </tr>
        </ng-template>

        <tr *ngIf="dt.isEmpty()" class="ui-widget-content ui-datatable-emptymessage-row" [style.visibility]="dt.loading ? 'hidden' : 'visible'">
            <td [attr.colspan]="dt.visibleColumns().length" class="ui-datatable-emptymessage">
                <span *ngIf="!dt.emptyMessageTemplate">{{dt.emptyMessage}}</span>
                <ng-container *ngIf="dt.emptyMessageTemplate">
                    <ng-container *ngTemplateOutlet="dt.emptyMessageTemplate"></ng-container>
                </ng-container>
            </td>
        </tr>
    `
})
export class TableBody {
    
    constructor(@Inject(forwardRef(() => DataTable)) public dt:DataTable) {}
    
    @Input("pTableBody") columns: Column[];
    
    @Input() data: any[];
    
    visibleColumns() {
        return this.columns ? this.columns.filter(c => !c.hidden): [];
    }
}

@Component({
    selector: '[pScrollableView]',
    template: `
        <div #scrollHeader class="ui-widget-header ui-datatable-scrollable-header" [ngStyle]="{'width': width}">
            <div #scrollHeaderBox  class="ui-datatable-scrollable-header-box">
                <table [ngClass]="dt.tableStyleClass" [ngStyle]="dt.tableStyle">
                    <thead class="ui-datatable-thead">
                        <tr *ngIf="!headerColumnGroup" class="ui-state-default" [pColumnHeaders]="columns"></tr>
                        <ng-template [ngIf]="headerColumnGroup">
                            <tr *ngFor="let headerRow of headerColumnGroup.rows" class="ui-state-default" [pColumnHeaders]="headerRow.columns"></tr>
                        </ng-template>
                    </thead>
                    <tbody *ngIf="dt.frozenValue" [ngClass]="{'ui-datatable-data ui-widget-content': true, 'ui-datatable-hoverable-rows': (dt.rowHover||dt.selectionMode)}" [pTableBody]="columns" [data]="dt.frozenValue"></tbody>
                </table>
            </div>
        </div>
        <div #scrollBody class="ui-datatable-scrollable-body" [ngStyle]="{'width': width}">
            <div #scrollTableWrapper class="ui-datatable-scrollable-table-wrapper" style="position:relative">
                <table #scrollTable [class]="dt.tableStyleClass" [ngStyle]="dt.tableStyle" [ngClass]="{'ui-datatable-virtual-table':virtualScroll}" style="top:0px">
                    <colgroup class="ui-datatable-scrollable-colgroup">
                        <col *ngFor="let col of columns" [ngStyle]="col.headerStyle||col.style" [ngClass]="{'ui-helper-hidden': col.hidden}"/>
                    </colgroup>
                    <tbody [ngClass]="{'ui-datatable-data ui-widget-content': true, 'ui-datatable-hoverable-rows': (dt.rowHover||dt.selectionMode)}" [pTableBody]="columns" [data]="dt.dataToRender"></tbody>
                </table>
            </div>
        </div>
        <div #scrollFooter class="ui-widget-header ui-datatable-scrollable-footer" [ngStyle]="{'width': width}" *ngIf="dt.hasFooter()">
            <div #scrollFooterBox  class="ui-datatable-scrollable-footer-box">
                <table [ngClass]="dt.tableStyleClass" [ngStyle]="dt.tableStyle">
                    <tfoot class="ui-datatable-tfoot">
                        <tr *ngIf="!footerColumnGroup" [pColumnFooters]="columns" class="ui-state-default"></tr>
                        <ng-template [ngIf]="footerColumnGroup">
                            <tr *ngFor="let footerRow of footerColumnGroup.rows" class="ui-state-default" [pColumnFooters]="footerRow.columns"></tr>
                        </ng-template>
                    </tfoot>
                </table>
            </div>
        </div>
    `
})
export class ScrollableView implements AfterViewInit,AfterViewChecked,OnDestroy {
    
    constructor(@Inject(forwardRef(() => DataTable)) public dt:DataTable, public domHandler: DomHandler, public el: ElementRef, public renderer: Renderer2, public zone: NgZone) {}
    
    @Input("pScrollableView") columns: Column[];
    
    @Input() headerColumnGroup: HeaderColumnGroup;
    
    @Input() footerColumnGroup: HeaderColumnGroup;
    
    @ViewChild('scrollHeader') scrollHeaderViewChild: ElementRef;
    
    @ViewChild('scrollHeaderBox') scrollHeaderBoxViewChild: ElementRef;
    
    @ViewChild('scrollBody') scrollBodyViewChild: ElementRef;
    
    @ViewChild('scrollTable') scrollTableViewChild: ElementRef;
    
    @ViewChild('scrollTableWrapper') scrollTableWrapperViewChild: ElementRef;
    
    @ViewChild('scrollFooter') scrollFooterViewChild: ElementRef;
    
    @ViewChild('scrollFooterBox') scrollFooterBoxViewChild: ElementRef;
    
    @Input() frozen: boolean;
    
    @Input() width: string;
    
    @Input() virtualScroll: boolean;
    
    @Output() onVirtualScroll: EventEmitter<any> = new EventEmitter();
    
    public scrollBody: HTMLDivElement;
    
    public scrollHeader: HTMLDivElement;
    
    public scrollHeaderBox: HTMLDivElement;
    
    public scrollTable: HTMLDivElement;
    
    public scrollTableWrapper: HTMLDivElement;
    
    public scrollFooter: HTMLDivElement;
    
    public scrollFooterBox: HTMLDivElement;
    
    public bodyScrollListener: Function;
    
    public headerScrollListener: Function;
    
    public scrollBodyMouseWheelListener: Function;
    
    public scrollFunction: Function;
    
    public rowHeight: number;
    
    public scrollTimeout: any;
    
    ngAfterViewInit() {
        this.initScrolling();
    }
    
    ngAfterViewChecked() {
        if(this.virtualScroll && !this.rowHeight) {
             let row = this.domHandler.findSingle(this.scrollTable, 'tr.ui-widget-content:not(.ui-datatable-emptymessage-row)');
             if(row) {
                 this.rowHeight = this.domHandler.getOuterHeight(row);
             }
        }
        
        if(!this.frozen) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    this.alignScrollBar();
                }, 1);
            });
        }
    }
    
    initScrolling() {
        this.scrollHeader = <HTMLDivElement> this.scrollHeaderViewChild.nativeElement;
        this.scrollHeaderBox = <HTMLDivElement> this.scrollHeaderBoxViewChild.nativeElement;
        this.scrollBody = <HTMLDivElement> this.scrollBodyViewChild.nativeElement;
        this.scrollTable = <HTMLDivElement> this.scrollTableViewChild.nativeElement;
        this.scrollTableWrapper = <HTMLDivElement> this.scrollTableWrapperViewChild.nativeElement;
        this.scrollFooter =  this.scrollFooterViewChild ? <HTMLDivElement> this.scrollFooterViewChild.nativeElement : null;
        this.scrollFooterBox =  this.scrollFooterBoxViewChild ? <HTMLDivElement> this.scrollFooterBoxViewChild.nativeElement : null;
        
        this.setScrollHeight();
        
        if(!this.frozen) {
            this.zone.runOutsideAngular(() => {
                this.scrollHeader.addEventListener('scroll', this.onHeaderScroll.bind(this));
                this.scrollBody.addEventListener('scroll', this.onBodyScroll.bind(this));
            });
        }

        if(!this.frozen) {
            this.alignScrollBar();
        }
        else {
            this.scrollBody.style.paddingBottom = this.domHandler.calculateScrollbarWidth() + 'px';
        }
    }
    
    onBodyScroll(event) {
        let frozenView = this.el.nativeElement.previousElementSibling;
        if(frozenView) {
            var frozenScrollBody = this.domHandler.findSingle(frozenView, '.ui-datatable-scrollable-body');
        }
        
        this.scrollHeaderBox.style.marginLeft = -1 * this.scrollBody.scrollLeft + 'px';
        if(this.scrollFooterBox) {
            this.scrollFooterBox.style.marginLeft = -1 * this.scrollBody.scrollLeft + 'px';
        }
        
        if(frozenScrollBody) {
            frozenScrollBody.scrollTop = this.scrollBody.scrollTop;
        }
        
        if(this.virtualScroll) {
            let viewport = this.domHandler.getOuterHeight(this.scrollBody);
            let tableHeight = this.domHandler.getOuterHeight(this.scrollTable);
            let pageHeight = this.rowHeight * this.dt.rows;
            let virtualTableHeight = this.domHandler.getOuterHeight(this.scrollTableWrapper);
            let pageCount = (virtualTableHeight / pageHeight)||1;

            if(this.scrollBody.scrollTop + viewport > parseFloat(this.scrollTable.style.top) + tableHeight || this.scrollBody.scrollTop < parseFloat(this.scrollTable.style.top)) {
                let page = Math.floor((this.scrollBody.scrollTop * pageCount) / (this.scrollBody.scrollHeight)) + 1;
                this.onVirtualScroll.emit({
                    page: page,
                    callback: () => {
                        this.scrollTable.style.top = ((page - 1) * pageHeight) + 'px';
                    }
                });
            }
        }
    }
    
    setScrollHeight() {
        if(this.dt.scrollHeight) {
            if(this.dt.scrollHeight.indexOf('%') !== -1) {
                this.scrollBody.style.visibility = 'hidden';
                this.scrollBody.style.height = '100px';     //temporary height to calculate static height
                let containerHeight = this.domHandler.getOuterHeight(this.dt.el.nativeElement.children[0]);
                let relativeHeight = this.domHandler.getOuterHeight(this.dt.el.nativeElement.parentElement) * parseInt(this.dt.scrollHeight) / 100;
                let staticHeight = containerHeight - 100;   //total height of headers, footers, paginators
                let scrollBodyHeight = (relativeHeight - staticHeight);
                
                this.scrollBody.style.height = 'auto';
                this.scrollBody.style.maxHeight = scrollBodyHeight + 'px';
                this.scrollBody.style.visibility = 'visible';
            }
            else {
                this.scrollBody.style.maxHeight = this.dt.scrollHeight;
            }
        }
    }
    
    onHeaderScroll(event) {
        this.scrollHeader.scrollLeft = 0;
    }
    
    hasVerticalOverflow() {
        return this.domHandler.getOuterHeight(this.scrollTable) > this.domHandler.getOuterHeight(this.scrollBody);
    }
    
    alignScrollBar() {
        let scrollBarWidth = this.hasVerticalOverflow() ? this.domHandler.calculateScrollbarWidth() : 0;
        this.scrollHeaderBox.style.marginRight = scrollBarWidth + 'px';
        if(this.scrollFooterBox) {
            this.scrollFooterBox.style.marginRight = scrollBarWidth + 'px';
        }
    }
    
    ngOnDestroy() {
        this.scrollHeader.removeEventListener('scroll', this.onHeaderScroll);
        this.scrollBody.removeEventListener('scroll', this.onBodyScroll);
    }
}

@Component({
    selector: 'p-dataTable',
    template: `
        <div [ngStyle]="style" [class]="styleClass" [style.width]="containerWidth"
            [ngClass]="{'ui-datatable ui-widget':true,'ui-datatable-reflow':responsive,'ui-datatable-stacked':stacked,'ui-datatable-resizable':resizableColumns,'ui-datatable-scrollable':scrollable}">
            <div class="ui-datatable-loading ui-widget-overlay" *ngIf="loading"></div>
            <div class="ui-datatable-loading-content" *ngIf="loading">
                <i [class]="'fa fa-spin fa-2x ' + loadingIcon"></i>
            </div>
            <div class="ui-datatable-header ui-widget-header" *ngIf="header">
                <ng-content select="p-header"></ng-content>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" styleClass="ui-paginator-top" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'top' || paginatorPosition =='both')"
                [templateLeft]="paginatorLeftTemplate" [templateRight]="paginatorRightTemplate"></p-paginator>
            <div class="ui-datatable-tablewrapper" *ngIf="!scrollable">
                <table [ngClass]="tableStyleClass" [ngStyle]="tableStyle">
                    <thead class="ui-datatable-thead">
                        <tr *ngIf="!headerColumnGroups || !headerColumnGroups.first" class="ui-state-default" [pColumnHeaders]="columns"></tr>
                        <ng-template [ngIf]="headerColumnGroups && headerColumnGroups.first">
                            <tr *ngFor="let headerRow of headerColumnGroups.first.rows" class="ui-state-default" [pColumnHeaders]="headerRow.columns"></tr>
                        </ng-template>
                    </thead>
                    <tfoot *ngIf="hasFooter()" class="ui-datatable-tfoot">
                        <tr *ngIf="!footerColumnGroups.first" class="ui-state-default" [pColumnFooters]="columns"></tr>
                        <ng-template [ngIf]="footerColumnGroups.first">
                            <tr *ngFor="let footerRow of footerColumnGroups.first.rows" class="ui-state-default" [pColumnFooters]="footerRow.columns"></tr>
                        </ng-template>
                    </tfoot>
                    <tbody [ngClass]="{'ui-datatable-data ui-widget-content': true, 'ui-datatable-hoverable-rows': (rowHover||selectionMode)}" [pTableBody]="columns" [data]="dataToRender"></tbody>
                </table>
            </div>
            
            <ng-template [ngIf]="scrollable">
                <div class="ui-datatable-scrollable-wrapper ui-helper-clearfix">
                    <div *ngIf="hasFrozenColumns()" [pScrollableView]="frozenColumns" frozen="true"
                        [headerColumnGroup]="frozenHeaderColumnGroup" [footerColumnGroup]="frozenFooterColumnGroup"
                        [ngStyle]="{'width':this.frozenWidth}" class="ui-datatable-scrollable-view ui-datatable-frozen-view"></div>
                    <div [pScrollableView]="scrollableColumns" [ngStyle]="{'width':this.unfrozenWidth, 'left': this.frozenWidth}"
                        [headerColumnGroup]="scrollableHeaderColumnGroup" [footerColumnGroup]="scrollableFooterColumnGroup"
                        class="ui-datatable-scrollable-view" [virtualScroll]="virtualScroll" (onVirtualScroll)="onVirtualScroll($event)"
                        [ngClass]="{'ui-datatable-unfrozen-view': hasFrozenColumns()}"></div>
                </div>
            </ng-template>
            
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" styleClass="ui-paginator-bottom" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')"
                [templateLeft]="paginatorLeftTemplate" [templateRight]="paginatorRightTemplate"></p-paginator>
            <div class="ui-datatable-footer ui-widget-header" *ngIf="footer">
                <ng-content select="p-footer"></ng-content>
            </div>
            
            <div class="ui-column-resizer-helper ui-state-highlight" style="display:none"></div>
            <span class="fa fa-arrow-down ui-datatable-reorder-indicator-up" style="position: absolute; display: none;"></span>
            <span class="fa fa-arrow-up ui-datatable-reorder-indicator-down" style="position: absolute; display: none;"></span>
        </div>
    `,
    providers: [DomHandler,ObjectUtils]
})
export class DataTable implements AfterViewChecked,AfterViewInit,AfterContentInit,OnInit,OnDestroy,BlockableUI {

    @Input() paginator: boolean;

    @Input() rows: number;

    @Input() pageLinks: number = 5;

    @Input() rowsPerPageOptions: number[];

    @Input() responsive: boolean;
    
    @Input() stacked: boolean;

    @Input() selectionMode: string;

    @Output() selectionChange: EventEmitter<any> = new EventEmitter();

    @Input() editable: boolean;
    
    @Input() showHeaderCheckbox: boolean = true;
    
    @Output() onRowClick: EventEmitter<any> = new EventEmitter();

    @Output() onRowSelect: EventEmitter<any> = new EventEmitter();

    @Output() onRowUnselect: EventEmitter<any> = new EventEmitter();

    @Output() onRowDblclick: EventEmitter<any> = new EventEmitter();
    
    @Output() onHeaderCheckboxToggle: EventEmitter<any> = new EventEmitter();
    
    @Input() headerCheckboxToggleAllPages: boolean;
    
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
    
    @Input() virtualScroll: boolean;

    @Input() scrollHeight: any;

    @Input() scrollWidth: any;
    
    @Input() frozenWidth: any;
    
    @Input() unfrozenWidth: any;

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() tableStyle: any;

    @Input() tableStyleClass: string;

    @Input() globalFilter: any;

    @Input() sortMode: string = 'single';
    
    @Input() defaultSortOrder: number = 1;
    
    @Input() groupField: string;
    
    @Input() contextMenu: any;
    
    @Input() csvSeparator: string = ',';
    
    @Input() exportFilename: string = 'download';
    
    @Input() emptyMessage: string = 'No records found';
    
    @Input() paginatorPosition: string = 'bottom';
    
    @Input() alwaysShowPaginator: boolean = true;
    
    @Input() metaKeySelection: boolean = true;
    
    @Input() rowTrackBy: Function = (index: number, item: any) => item;
    
    @Input() immutable: boolean = true;
    
    @Input() frozenValue: any[];
    
    @Input() compareSelectionBy: string = 'deepEquals';
    
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
    
    @Input() rowExpandMode: string = 'multiple';
    
    @Input() public expandedRowsGroups: any[];
    
    @Input() expandedIcon: string = 'fa-chevron-circle-down';

    @Input() collapsedIcon: string = 'fa-chevron-circle-right';
    
    @Input() tabindex: number = 1;
    
    @Input() rowStyleClass: Function;

    @Input() rowStyleMap: Object;

    @Input() rowGroupMode: string;
    
    @Input() sortableRowGroup: boolean = true;
    
    @Input() sortFile: string;

    @Input() rowHover: boolean;
    
    @Input() public filters: {[s: string]: FilterMetadata;} = {};
    
    @Input() dataKey: string;
    
    @Input() loading: boolean;

    @Input() loadingIcon: string = 'fa-circle-o-notch';
    
    @Input() virtualScrollDelay: number = 500;
  
    @Input() rowGroupExpandMode: string = 'multiple';
    
    @Output() valueChange: EventEmitter<any[]> = new EventEmitter<any[]>();
    
    @Output() firstChange: EventEmitter<number> = new EventEmitter<number>();
    
    @Output() onRowExpand: EventEmitter<any> = new EventEmitter();
    
    @Output() onRowCollapse: EventEmitter<any> = new EventEmitter();
    
    @Output() onRowGroupExpand: EventEmitter<any> = new EventEmitter();
    
    @Output() onRowGroupCollapse: EventEmitter<any> = new EventEmitter();
    
    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
    
    @ContentChildren(Column) cols: QueryList<Column>;
    
    @ContentChildren(HeaderColumnGroup) headerColumnGroups: QueryList<HeaderColumnGroup>;
    
    @ContentChildren(FooterColumnGroup) footerColumnGroups: QueryList<FooterColumnGroup>;
    
    public _value: any[];
    
    public dataToRender: any[];

    public page: number = 0;

    public filterTimeout: any;

    public filteredValue: any[];

    public columns: Column[];
    
    public frozenColumns: Column[];
    
    public scrollableColumns: Column[];
    
    public frozenHeaderColumnGroup: HeaderColumnGroup;
    
    public scrollableHeaderColumnGroup: HeaderColumnGroup;
    
    public frozenFooterColumnGroup: HeaderColumnGroup;
    
    public scrollableFooterColumnGroup: HeaderColumnGroup;

    public columnsChanged: boolean = false;
    
    public sortColumn: Column;
    
    public columnResizing: boolean;
    
    public lastResizerHelperX: number;
    
    public documentEditListener: Function;
    
    public documentColumnResizeEndListener: Function;
    
    public resizerHelper: any;
    
    public resizeColumn: any;
    
    public reorderIndicatorUp: any;
    
    public reorderIndicatorDown: any;
    
    public iconWidth: number;
    
    public iconHeight: number;
    
    public draggedColumn: any;
    
    public dropPosition: number;
    
    public tbody: any;
    
    public rowTouched: boolean;
    
    public rowGroupToggleClick: boolean;
    
    public editingCell: any;
    
    public virtualTableHeight: number;
    
    public rowGroupMetadata: any;
    
    public rowGroupHeaderTemplate: TemplateRef<any>;
    
    public rowGroupFooterTemplate: TemplateRef<any>;
    
    public rowExpansionTemplate: TemplateRef<any>;
    
    public emptyMessageTemplate: TemplateRef<any>;
    
    public paginatorLeftTemplate: TemplateRef<any>;
    
    public paginatorRightTemplate: TemplateRef<any>;
    
    public scrollBarWidth: number;
    
    public editorClick: boolean;
    
    public _first: number = 0;
    
    public selectionKeys: any;
    
    public preventSelectionKeysPropagation: boolean;
    
    public preventSortPropagation: boolean;
    
    public preventRowClickPropagation: boolean;
  
    _multiSortMeta: SortMeta[];
    
    _sortField: string;
    
    _sortOrder: number = 1;
    
    differ: any;
    
    _selection: any;
    
    _totalRecords: number;
    
    globalFilterFunction: any;
    
    columnsSubscription: Subscription;
    
    totalRecordsChanged: boolean;
    
    anchorRowIndex: number;
    
    rangeRowIndex: number;
    
    initialized: boolean;
    
    virtualScrollTimer: any;
    
    virtualScrollableTableWrapper: HTMLDivElement;
    
    virtualScrollCallback: Function;
    
    editChanged: boolean;
    
    constructor(public el: ElementRef, public domHandler: DomHandler, public differs: IterableDiffers,
            public renderer: Renderer2, public changeDetector: ChangeDetectorRef, public objectUtils: ObjectUtils,
            public zone: NgZone) {
    	this.differ = differs.find([]).create(null);
    }

    ngOnInit() {
        if(this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
    }
    
    ngAfterContentInit() {
        this.initColumns();
        this.initColumnGroups();
        
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
                
                case 'emptymessage':
                    this.emptyMessageTemplate = item.template;
                break;
                
                case 'paginatorLeft':
                    this.paginatorLeftTemplate = item.template;
                break;
                
                case 'paginatorRight':
                    this.paginatorRightTemplate = item.template;
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
        
        if(this.totalRecordsChanged && this.virtualScroll && this.virtualScrollableTableWrapper && this.virtualScrollableTableWrapper.offsetParent) {
            let row = this.domHandler.findSingle(this.virtualScrollableTableWrapper,'tr.ui-widget-content');
            let rowHeight = this.domHandler.getOuterHeight(row);
            this.virtualTableHeight = this._totalRecords * rowHeight;
            this.virtualScrollableTableWrapper.style.height = this.virtualTableHeight + 'px';
            this.totalRecordsChanged = false;
        }
    }

    ngAfterViewInit() {
        if(this.globalFilter) {
            this.globalFilterFunction = this.renderer.listen(this.globalFilter, 'keyup', () => {
                if (this.filterTimeout) {
                    clearTimeout(this.filterTimeout);
                }
                this.filterTimeout = setTimeout(() => {
                    this._filter();
                    this.filterTimeout = null;
                }, this.filterDelay);
            });
        }

        this.virtualScrollableTableWrapper = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-datatable-scrollable-table-wrapper');

        this.initialized = true;
    }
    
    @Input() get multiSortMeta(): SortMeta[]{
        return this._multiSortMeta;
    }
  
    set multiSortMeta(val: SortMeta[]){
        this._multiSortMeta = val;
        if(this.sortMode === 'multiple') {
            this.sortMultiple();
        }
    }

    @Input() get sortField(): string{
        return this._sortField;
    }

    set sortField(val: string){
        this._sortField = val;
        if(this.sortMode === 'single') {
            this.sortSingle();
        }
    }

    @Input() get sortOrder(): number {
      return this._sortOrder;
    }
    set sortOrder(val: number) {
        this._sortOrder = val;
        if(this.sortMode === 'single') {
            this.sortSingle();
        }
    }
    
    @Input() get value(): any[] {
        return this._value;
    }
    set value(val:any[]) {
        if(this.immutable) {
            this._value = val ? [...val] : null;
            this.handleDataChange();
        }
        else {
            this._value = val;
        }
        
        this.valueChange.emit(this.value);
    }
    
    @Input() get first(): number {
        return this._first;
    }

    set first(val:number) {
        let shouldPaginate = this.initialized && this._first !== val;
        
        this._first = val;
        
        if(shouldPaginate) {
            this.paginate();
        }
    }
    
    @Input() get totalRecords(): number {
        return this._totalRecords;
    }

    set totalRecords(val:number) {
        this._totalRecords = val;
        this.totalRecordsChanged = true;
    }
    
    @Input() get selection(): any {
        return this._selection;
    }

    set selection(val: any) {
        this._selection = val;

        if(this.dataKey && !this.preventSelectionKeysPropagation) {
            this.selectionKeys = {};
            if(this._selection) {
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
        this.preventSelectionKeysPropagation = false;
    }
    
    ngDoCheck() {
        if(!this.immutable) {
            let changes = this.differ.diff(this.value);
            if(changes) {
                this.handleDataChange();
            }
        }
    }
    
    handleDataChange() {
        if(this.paginator) {
            this.updatePaginator();
        }
        
        if(this.virtualScroll && this.virtualScrollCallback) {
            this.virtualScrollCallback();
        }
        
        if(!this.lazy) {
            if(this.hasFilter()) {
                this._filter();
            }
            
            if(this.preventSortPropagation) {
                this.preventSortPropagation = false;
            }
            else if(this.sortField||this.multiSortMeta) {
                if(!this.sortColumn && this.columns) {
                    this.sortColumn = this.columns.find(col => col.field === this.sortField && col.sortable === 'custom');
                }
                
                if(this.sortMode == 'single')
                    this.sortSingle();
                else if(this.sortMode == 'multiple')
                    this.sortMultiple();
            }
        }

        this.updateDataToRender(this.filteredValue||this.value);
    }
    
    initColumns(): void {
        this.columns = this.cols.toArray();
        this.initScrollableColumns();
        
        this.columnsChanged = true;
    }
    
    initScrollableColumns() {
        this.scrollableColumns = [];
        this.frozenColumns = [];
        
        for(let col of this.columns) {
            if(col.frozen)
                this.frozenColumns.push(col);
            else
                this.scrollableColumns.push(col);
        }
    }
    
    initColumnGroups(): void {
        let headerColumnsGroups = this.headerColumnGroups.toArray();
        let footerColumnsGroups = this.footerColumnGroups.toArray();
        
        for(let columnGroup of headerColumnsGroups) {
            if(columnGroup.frozen)
                this.frozenHeaderColumnGroup = columnGroup;
            else
                this.scrollableHeaderColumnGroup = columnGroup;
        }
        
        for(let columnGroup of footerColumnsGroups) {
            if(columnGroup.frozen)
                this.frozenFooterColumnGroup = columnGroup;
            else
                this.scrollableFooterColumnGroup = columnGroup;
        }
    }

    resolveFieldData(data: any, field: string): any {
        return this.objectUtils.resolveFieldData(data, field);
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
        this.updateTotalRecords();

        //first
        if(this.totalRecords && this.first >= this.totalRecords) {
            let numberOfPages = Math.ceil(this.totalRecords/this.rows);
            this._first = Math.max((numberOfPages-1) * this.rows, 0);
        }
    }
    
    updateTotalRecords() {
        this.totalRecords = this.lazy ? this.totalRecords : (this.value ? this.value.length: 0);
    }

    onPageChange(event) {
        this._first = event.first;
        this.firstChange.emit(this.first);
        this.rows = event.rows;
        this.paginate();
    }
    
    paginate() {
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
        if((this.paginator || this.virtualScroll) && datasource) {
            this.dataToRender = [];
            let startIndex: number = this.lazy ? 0 : this.first;
            let endIndex: number = this.virtualScroll ? this.first + this.rows * 2 : startIndex + this.rows;

            for(let i = startIndex; i < endIndex; i++) {
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

        this.changeDetector.markForCheck();
    }
    
    onVirtualScroll(event) {
        this._first = (event.page - 1) * this.rows;
        this.virtualScrollCallback = event.callback;
        
        this.zone.run(() => {
            if(this.virtualScrollTimer) {
                clearTimeout(this.virtualScrollTimer);
            }
            
            this.virtualScrollTimer = setTimeout(() => {
                if(this.lazy)
                    this.onLazyLoad.emit(this.createLazyLoadMetadata());
                else
                    this.updateDataToRender(this.filteredValue||this.value);
            }, this.virtualScrollDelay);
        });
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
        let targetNode = event.target;
        if(this.domHandler.hasClass(targetNode, 'ui-sortable-column') || this.domHandler.hasClass(targetNode, 'ui-column-title') || this.domHandler.hasClass(targetNode, 'ui-sortable-column-icon')) {
            if(!this.immutable) {
                this.preventSortPropagation = true;
            }
            
            let columnSortField = column.sortField||column.field;
            this._sortOrder = (this.sortField === columnSortField)  ? this.sortOrder * -1 : this.defaultSortOrder;
            this._sortField = columnSortField;
            this.sortColumn = column;
            let metaKey = event.metaKey||event.ctrlKey;

            if(this.sortMode == 'multiple') {
                if(!this.multiSortMeta||!metaKey) {
                    this._multiSortMeta = [];
                }

                this.addSortMeta({field: this.sortField, order: this.sortOrder});
            }

            if(this.lazy) {
                this._first = 0;
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else {
                if(this.sortMode == 'multiple')
                    this.sortMultiple();
                else
                    this.sortSingle();
            }
            
            this.onSort.emit({
                field: this.sortField,
                order: this.sortOrder,
                multisortmeta: this.multiSortMeta
            });
        }
        
        this.updateDataToRender(this.filteredValue||this.value);
    }

    sortSingle() {
        if(this.value) {
            if(this.sortColumn && this.sortColumn.sortable === 'custom') {
                this.preventSortPropagation = true;
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
            
            this._first = 0;

            if(this.hasFilter()) {
                this._filter();
            }
        }
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
            if((targetNode == 'TD' || (targetNode == 'SPAN' && !this.domHandler.hasClass(event.target, 'ui-clickable')))) {
                if(this.sortField != this.groupField) {
                    this._sortField = this.groupField;
                    this.sortSingle();
                }
                else {
                    this._sortOrder = -1 * this.sortOrder;
                    this.sortSingle();
                }
            }
        }
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
            let rangeRowData = this.dataToRender[i];
            let selectionIndex = this.findIndexInSelection(rangeRowData);
            this._selection = this.selection.filter((val,i) => i!=selectionIndex);
            let dataKeyValue: string = this.dataKey ? String(this.resolveFieldData(rangeRowData, this.dataKey)) : null;
            if(dataKeyValue) {
                delete this.selectionKeys[dataKeyValue];
            }
            this.onRowUnselect.emit({originalEvent: event, data: rangeRowData, type: 'row'});
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
            let rangeRowData = this.dataToRender[i];
            this._selection = [...this.selection, rangeRowData];
            this.selectionChange.emit(this.selection);
            let dataKeyValue: string = this.dataKey ? String(this.resolveFieldData(rangeRowData, this.dataKey)) : null;
            if(dataKeyValue) {
                this.selectionKeys[dataKeyValue] = 1;
            }
            this.onRowSelect.emit({originalEvent: event, data: rangeRowData, type: 'row'});
        }
    }
    
    handleRowClick(event: MouseEvent, rowData: any, index: number) {
        if(this.preventRowClickPropagation) {
            this.preventRowClickPropagation = false;
            return;
        }
        
        let targetNode = (<HTMLElement> event.target).nodeName;
        
        if(targetNode == 'INPUT' || targetNode == 'BUTTON' || targetNode == 'A' || (this.domHandler.hasClass(event.target, 'ui-clickable'))) {
            return;
        }
        
        this.onRowClick.next({originalEvent: event, data: rowData});
        
        if(this.selectionMode) {
            if(this.isMultipleSelectionMode() && event.shiftKey && this.anchorRowIndex != null) {
                this.domHandler.clearSelection();
                if(this.rangeRowIndex != null) {
                    this.clearSelectionRange(event);
                }
                
                this.rangeRowIndex = index;
                this.selectRange(event, index);
            }
            else {
                let selected = this.isSelected(rowData);
                let metaSelection = this.rowTouched ? false : this.metaKeySelection;
                let dataKeyValue: string = this.dataKey ? String(this.resolveFieldData(rowData, this.dataKey)) : null;
                this.anchorRowIndex = index;
                this.rangeRowIndex = index;
                
                if(metaSelection) {
                    let metaKey = event.metaKey||event.ctrlKey;
                    
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
                        
                        this.onRowUnselect.emit({originalEvent: event, data: rowData, type: 'row'});
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

                        this.onRowSelect.emit({originalEvent: event, data: rowData, type: 'row'});
                    }
                }
                else {
                    if(this.isSingleSelectionMode()) {
                        if(selected) {
                            this._selection = null;
                            this.selectionKeys = {};
                            this.selectionChange.emit(this.selection);
                            this.onRowUnselect.emit({originalEvent: event, data: rowData, type: 'row'});
                        }
                        else {
                            this._selection = rowData;
                            this.selectionChange.emit(this.selection);
                            this.onRowSelect.emit({originalEvent: event, data: rowData, type: 'row'});
                            if(dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                    }
                    else {
                        if(selected) {
                            let selectionIndex = this.findIndexInSelection(rowData);
                            this._selection = this.selection.filter((val,i) => i!=selectionIndex);
                            this.selectionChange.emit(this.selection);
                            this.onRowUnselect.emit({originalEvent: event, data: rowData, type: 'row'});
                            if(dataKeyValue) {
                                delete this.selectionKeys[dataKeyValue];
                            }
                        }
                        else {
                            this._selection = [...this.selection||[],rowData];
                            this.selectionChange.emit(this.selection);
                            this.onRowSelect.emit({originalEvent: event, data: rowData, type: 'row'});
                            if(dataKeyValue) {
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                    }

                }
            }

            this.preventSelectionKeysPropagation = true;
        }

        this.rowTouched = false;
    }

    handleRowTouchEnd(event: Event) {
        this.rowTouched = true;
    }
    
    selectRowWithRadio(event: Event, rowData:any) {
        if(this.selection != rowData) {
            this._selection = rowData;
            this.selectionChange.emit(this.selection);
            this.onRowSelect.emit({originalEvent: event, data: rowData, type: 'radiobutton'});
            
            if(this.dataKey) {
                this.selectionKeys = {};
                this.selectionKeys[String(this.resolveFieldData(rowData, this.dataKey))] = 1;
            }
        }
        else {
            this._selection = null;
            this.selectionChange.emit(this.selection);
            this.onRowUnselect.emit({originalEvent: event, data: rowData, type: 'radiobutton'});
        }
        
        this.preventSelectionKeysPropagation = true;
        this.preventRowClickPropagation = true;
    }
    
    toggleRowWithCheckbox(event, rowData: any) {
        let selectionIndex = this.findIndexInSelection(rowData);
        this.selection = this.selection||[];
        let dataKeyValue: string = this.dataKey ? String(this.resolveFieldData(rowData, this.dataKey)) : null;
        
        if(selectionIndex != -1) {
            this._selection = this.selection.filter((val,i) => i!=selectionIndex);
            this.selectionChange.emit(this.selection);
            this.onRowUnselect.emit({originalEvent: event, data: rowData, type: 'checkbox'});
            if(dataKeyValue) {
                delete this.selectionKeys[dataKeyValue];
            }
        }
        else {
            this._selection = [...this.selection,rowData];
            this.selectionChange.emit(this.selection);
            this.onRowSelect.emit({originalEvent: event, data: rowData, type: 'checkbox'});
            if(dataKeyValue) {
                this.selectionKeys[dataKeyValue] = 1;
            }
        }
        
        this.preventSelectionKeysPropagation = true;
        this.preventRowClickPropagation = true;
    }
    
    toggleRowsWithCheckbox(event) {
        if(event.checked)
            this.selection = this.headerCheckboxToggleAllPages ? this.value.slice() : this.dataToRender.slice();
        else
            this.selection = [];
            
        this.selectionChange.emit(this.selection);
        
        this.onHeaderCheckboxToggle.emit({originalEvent: event, checked: event.checked});
    }
    
    onRowRightClick(event, rowData) {
        if(this.contextMenu) {
            let selectionIndex = this.findIndexInSelection(rowData);
            let selected = selectionIndex != -1;
            let dataKeyValue: string = this.dataKey ? String(this.resolveFieldData(rowData, this.dataKey)) : null;
            
            if(!selected) {
                if(this.isSingleSelectionMode()) {
                    this.selection = rowData;
                    this.selectionChange.emit(rowData);
                }
                else if(this.isMultipleSelectionMode()) {
                    this.selection = [rowData];
                    this.selectionChange.emit(this.selection);
                }
                
                if(this.dataKey) {
                    this.selectionKeys[String(this.resolveFieldData(rowData, this.dataKey))] = 1;
                    this.preventSelectionKeysPropagation = true;
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
                if(this.equals(rowData, this.selection[i])) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }

    isSelected(rowData) {
        if(rowData && this.selection) {
            if(this.dataKey) {
                return this.selectionKeys[this.objectUtils.resolveFieldData(rowData, this.dataKey)] !== undefined;
            }
            else {
                if(this.selection instanceof Array)
                    return this.findIndexInSelection(rowData) > -1;
                else
                    return this.equals(rowData, this.selection);
            }
        }
        
        return false;
    }
    
    equals(data1, data2) {
        return this.compareSelectionBy === 'equals' ? (data1 === data2) : this.objectUtils.equals(data1, data2, this.dataKey);
    }
    
    get allSelected() {
        if(this.headerCheckboxToggleAllPages) {
            return this.selection && this.value && this.selection.length === this.value.length;
        }
        else {
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
        this._first = 0;
        
        if(this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            if(!this.value || !this.columns) {
                return;
            }
            
            this.filteredValue = [];

            for(let i = 0; i < this.value.length; i++) {
                let localMatch = true;
                let globalMatch = false;

                for(let j = 0; j < this.columns.length; j++) {
                    let col = this.columns[j],
                    filterMeta = this.filters[col.filterField||col.field];

                    //local
                    if(filterMeta) {
                        let filterValue = filterMeta.value,
                        filterField = col.filterField||col.field,
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
                    if(!col.excludeGlobalFilter && this.globalFilter && !globalMatch) {
                        globalMatch = this.filterConstraints['contains'](this.resolveFieldData(this.value[i], col.filterField||col.field), this.globalFilter.value);
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
            filters: this.filters,
            filteredValue: this.filteredValue||this.value
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
		
        notEquals(value, filter): boolean {
            if(filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                return false;
            }
            
            if(value === undefined || value === null) {
                return true;
            }
            
            return value.toString().toLowerCase() != filter.toString().toLowerCase();
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

    switchCellToEditMode(cell: any, column: Column, rowData: any) {
        if(!this.selectionMode && this.editable && column.editable) {
            this.editorClick = true;
            this.bindDocumentEditListener();
            
            if(cell != this.editingCell) {
                if(this.editingCell && this.domHandler.find(this.editingCell, '.ng-invalid.ng-dirty').length == 0) {
                    this.domHandler.removeClass(this.editingCell, 'ui-cell-editing');
                }
                
                this.editingCell = cell;
                this.onEditInit.emit({column: column, data: rowData});
                this.domHandler.addClass(cell, 'ui-cell-editing');
                let focusable = this.domHandler.findSingle(cell, '.ui-cell-editor input, .ui-cell-editor textarea');
                if(focusable) {
                    setTimeout(() => this.domHandler.invokeElementMethod(focusable, 'focus'), 50);
                }
            }
        }
    }

    switchCellToViewMode(element: any) {
        this.editingCell = null;
        let cell = this.findCell(element);
        this.domHandler.removeClass(cell, 'ui-cell-editing');
        this.unbindDocumentEditListener();
    }
    
    closeCell() {
        if(this.editingCell) {
            this.domHandler.removeClass(this.editingCell, 'ui-cell-editing');
            this.editingCell = null;
            this.unbindDocumentEditListener();
        }
    }
    
    bindDocumentEditListener() {
        if(!this.documentEditListener) {
            this.documentEditListener = this.renderer.listen('document', 'click', (event) => {
                if(!this.editorClick && event.button !== 2) {
                    this.closeCell();
                }
                this.editorClick = false;
            });
        }
    }
    
    unbindDocumentEditListener() {
        if(this.documentEditListener) {
            this.documentEditListener();
            this.documentEditListener = null;
        }
    }

    onCellEditorKeydown(event, column: Column, rowData: any, rowIndex: number) {
        if(this.editable) {
            //enter
            if(event.keyCode == 13) {
                if(this.domHandler.find(this.editingCell, '.ng-invalid.ng-dirty').length == 0) {
                    this.switchCellToViewMode(event.target);
                    event.preventDefault();
                }
            }
            
            //escape
            else if(event.keyCode == 27) {
                this.switchCellToViewMode(event.target);
                event.preventDefault();
            }
            
            //tab
            else if(event.keyCode == 9) {
                if(event.shiftKey)
                    this.moveToPreviousCell(event);
                else
                    this.moveToNextCell(event);
            }
        }
    }
    
    onCellEditorInput(event, column: Column, rowData: any, rowIndex: number) {
        if(this.editable) {
            this.onEdit.emit({originalEvent: event, column: column, data: rowData, index: rowIndex});
        }
    }
    
    onCellEditorChange(event, column: Column, rowData: any, rowIndex: number) {
        if(this.editable) {
            this.editChanged = true;
            
            this.onEditComplete.emit({column: column, data: rowData, index: rowIndex});
        }
    }
    
    onCellEditorBlur(event, column: Column, rowData: any, rowIndex: number) {
        if(this.editable) {
            if(this.editChanged)
                this.editChanged = false;
            else
                this.onEditCancel.emit({column: column, data: rowData, index: rowIndex});
        }
    }
    
    moveToPreviousCell(event: KeyboardEvent) {
        let currentCell = this.findCell(event.target);
        let row = currentCell.parentElement;
        let targetCell = this.findPreviousEditableColumn(currentCell);
        
        if(targetCell) {
            this.domHandler.invokeElementMethod(targetCell, 'click');
            event.preventDefault();
        }
    }
    
    moveToNextCell(event: KeyboardEvent) {
        let currentCell = this.findCell(event.target);
        let row = currentCell.parentElement;
        let targetCell = this.findNextEditableColumn(currentCell);
        
        if(targetCell) {
            this.domHandler.invokeElementMethod(targetCell, 'click');
            event.preventDefault();
        }
    }
    
    findPreviousEditableColumn(cell: Element) {
        let prevCell = cell.previousElementSibling;
        
        if(!prevCell) {
            let previousRow = cell.parentElement.previousElementSibling;
            if(previousRow) {
                prevCell = previousRow.lastElementChild;
            }
        }
        
        if(prevCell) {
            if(this.domHandler.hasClass(prevCell, 'ui-editable-column'))
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
        
        if(!nextCell) {
            let nextRow = cell.parentElement.nextElementSibling;
            if(nextRow) {
                nextCell = nextRow.firstElementChild;
            }
        }
        
        if(nextCell) {
            if(this.domHandler.hasClass(nextCell, 'ui-editable-column'))
                return nextCell;
            else
                return this.findNextEditableColumn(nextCell);
        }
        else {
            return null;
        }
    }
    
    onCustomEditorFocusPrev(event: KeyboardEvent) {
        this.moveToPreviousCell(event);
    }
    
    onCustomEditorFocusNext(event: KeyboardEvent) {
        this.moveToNextCell(event);
    }
    
    findCell(element) {
        if(element) {
            let cell = element;
            while(cell && cell.tagName != 'TD') {
                cell = cell.parentElement;
            }

            return cell;
        }
        else {
            return null;
        }
    }

    initResizableColumns() {
        this.tbody = this.domHandler.findSingle(this.el.nativeElement, 'tbody.ui-datatable-data');
        this.resizerHelper = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-column-resizer-helper');
        this.fixColumnWidths();
    }
    
    onDocumentMouseMove(event) {
        if(this.columnResizing) {
            this.onColumnResize(event);
        }
    }
    
    onDocumentMouseUp(event) {
        if(this.columnResizing) {
            this.columnResizing = false;
            this.onColumnResizeEnd(event);
        }
    }
    
    bindColumnResizeEvents() {
        this.zone.runOutsideAngular(() => {
            window.document.addEventListener('mousemove', this.onDocumentMouseMove.bind(this));
        });
        
        this.documentColumnResizeEndListener = this.renderer.listen('document', 'mouseup', (event) => {
            if(this.columnResizing) {
                this.columnResizing = false;
                this.onColumnResizeEnd(event);
            }
        });
    }
    
    unbindColumnResizeEvents() {
        window.document.removeEventListener('mousemove', this.onDocumentMouseMove);
        
        if(this.documentColumnResizeEndListener) {
            this.documentColumnResizeEndListener();
            this.documentColumnResizeEndListener = null;
        }
    }
    
    initColumnResize(event) {
        this.bindColumnResizeEvents();
        
        let container = this.el.nativeElement.children[0];
        let containerLeft = this.domHandler.getOffset(container).left;
        this.resizeColumn = event.target.parentElement;
        this.columnResizing = true;
        this.lastResizerHelperX = (event.pageX - containerLeft + container.scrollLeft);
    }
    
    onColumnResize(event) {
        let container = this.el.nativeElement.children[0];
        let containerLeft = this.domHandler.getOffset(container).left;
        this.domHandler.addClass(container, 'ui-unselectable-text');
        this.resizerHelper.style.height = container.offsetHeight + 'px';
        this.resizerHelper.style.top = 0 + 'px';
        this.resizerHelper.style.left = (event.pageX - containerLeft + container.scrollLeft) + 'px';
        
        this.resizerHelper.style.display = 'block';
    }
    
    onColumnResizeEnd(event) {
        let delta = this.resizerHelper.offsetLeft - this.lastResizerHelperX;
        let columnWidth = this.resizeColumn.offsetWidth;
        let newColumnWidth = columnWidth + delta;
        let minWidth = this.resizeColumn.style.minWidth||15;

        if(columnWidth + delta > parseInt(minWidth)) {
            if(this.columnResizeMode === 'fit') {
                let nextColumn = this.resizeColumn.nextElementSibling;
                while (this.domHandler.hasClass(nextColumn, 'ui-helper-hidden')) {
                    nextColumn = nextColumn.nextElementSibling;
                }

                if(nextColumn) {
                    let nextColumnWidth = nextColumn.offsetWidth - delta;
                    let nextColumnMinWidth = nextColumn.style.minWidth || 15;

                    if (newColumnWidth > 15 && nextColumnWidth > parseInt(nextColumnMinWidth)) {
                        this.resizeColumn.style.width = newColumnWidth + 'px';
                        if (nextColumn) {
                            nextColumn.style.width = nextColumnWidth + 'px';
                        }

                        if (this.scrollable) {
                            let colGroup = this.domHandler.findSingle(this.el.nativeElement, 'colgroup.ui-datatable-scrollable-colgroup');
                            let resizeColumnIndex = this.domHandler.index(this.resizeColumn);
                            colGroup.children[resizeColumnIndex].style.width = newColumnWidth + 'px';

                            if (nextColumn) {
                                colGroup.children[resizeColumnIndex + 1].style.width = nextColumnWidth + 'px';
                            }
                        }
                    }
                }
            }
            else if(this.columnResizeMode === 'expand') {
                this.tbody.parentElement.style.width = this.tbody.parentElement.offsetWidth + delta + 'px';
                this.resizeColumn.style.width = newColumnWidth + 'px';
                let containerWidth = this.tbody.parentElement.style.width;
                
                if(this.scrollable) {
                    this.domHandler.findSingle(this.el.nativeElement, '.ui-datatable-scrollable-header-box').children[0].style.width = containerWidth;
                    let colGroup = this.domHandler.findSingle(this.el.nativeElement, 'colgroup.ui-datatable-scrollable-colgroup');
                    let resizeColumnIndex = this.domHandler.index(this.resizeColumn);
                    colGroup.children[resizeColumnIndex].style.width = newColumnWidth + 'px';
                }
                else {
                    this.el.nativeElement.children[0].style.width = containerWidth;
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
        this.unbindColumnResizeEvents();
    }
    
    fixColumnWidths() {
        let columns = this.domHandler.find(this.el.nativeElement, 'th.ui-resizable-column');
        let bodyCols;
        
        for(let i = 0; i < columns.length; i++) {
            columns[i].style.width = columns[i].offsetWidth + 'px';
        }
        
        if(this.scrollable) {
            let colGroup = this.domHandler.findSingle(this.el.nativeElement, 'colgroup.ui-datatable-scrollable-colgroup');
            bodyCols = colGroup.children;
            
            if(bodyCols) {
                for (let i = 0; i < bodyCols.length; i++) {
                    bodyCols[i].style.width = columns[i].offsetWidth + 'px';
                }
            }
        }
    }
    
    onColumnDragStart(event) {
        if (this.columnResizing) {
            event.preventDefault();
            return;
        }

        this.draggedColumn = this.findParentHeader(event.target);
        event.dataTransfer.setData('text', 'b'); // Firefox requires this to make dragging possible
        this.zone.runOutsideAngular(() => {
            window.document.addEventListener('dragover', this.onColumnDragover.bind(this));
        });
    }
    
    onColumnDragover(event) {
        let dropHeader = this.findParentHeader(event.target);
        if(this.reorderableColumns && this.draggedColumn && dropHeader) {
            event.preventDefault();
            let container = this.el.nativeElement.children[0];
            let containerOffset = this.domHandler.getOffset(container);
            let dropHeaderOffset = this.domHandler.getOffset(dropHeader);
            
            if(this.draggedColumn != dropHeader) {
                let targetLeft =  dropHeaderOffset.left - containerOffset.left;
                let targetTop =  containerOffset.top - dropHeaderOffset.top;
                let columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;
                
                this.reorderIndicatorUp.style.top = dropHeaderOffset.top - containerOffset.top - (this.iconHeight - 1) + 'px';
                this.reorderIndicatorDown.style.top = dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + 'px';

                if(event.pageX > columnCenter) {
                    this.reorderIndicatorUp.style.left = (targetLeft + dropHeader.offsetWidth - Math.ceil(this.iconWidth / 2)) + 'px';
                    this.reorderIndicatorDown.style.left = (targetLeft + dropHeader.offsetWidth - Math.ceil(this.iconWidth / 2))+ 'px';
                    this.dropPosition = 1;
                }
                else {
                    this.reorderIndicatorUp.style.left = (targetLeft - Math.ceil(this.iconWidth / 2)) + 'px';
                    this.reorderIndicatorDown.style.left = (targetLeft - Math.ceil(this.iconWidth / 2))+ 'px';
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
            window.document.removeEventListener('dragover', this.onColumnDragover);
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
                this.objectUtils.reorderArray(this.columns, dragIndex, dropIndex);
                if(this.scrollable) {
                    this.initScrollableColumns();
                }

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
        this.iconWidth = this.domHandler.getHiddenElementOuterWidth(this.reorderIndicatorUp);
        this.iconHeight = this.domHandler.getHiddenElementOuterHeight(this.reorderIndicatorUp);
    }
    
    findParentHeader(element) {
        if(element.nodeName == 'TH') {
            return element;
        }
        else {
            let parent = element.parentElement;
            while(parent.nodeName != 'TH') {
                parent = parent.parentElement;
                if(!parent) break;
            }
            return parent;
        }
    }
    
    hasFooter() {
        if(this.footerColumnGroups && this.footerColumnGroups.first) {
            return true;
        }
        else {
            if(this.columns) {
                for(let i = 0; i  < this.columns.length; i++) {
                    if(this.columns[i].footer || this.columns[i].footerTemplate) {
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
            rows: this.virtualScroll ? this.rows * 2 : this.rows,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            filters: this.filters,
            globalFilter: this.globalFilter ? this.globalFilter.value : null,
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
            if(this.rowExpandMode === 'single') {
                this.expandedRows = [];
            }
            
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
        let index = -1;
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
  
        if(!this.expandedRowsGroups) {
          this.expandedRowsGroups = [];
        }
        
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
  
            if(this.rowGroupExpandMode === 'single') {
              this.expandedRowsGroups = [];
            }
            
            this.expandedRowsGroups.push(rowGroupField);
            this.onRowGroupExpand.emit({
                originalEvent: event,
                group: rowGroupField
            });
        }
        event.preventDefault();
    }
    
    public reset() {
        this._sortField = null;
        this._sortOrder = 1;
        
        this.filteredValue = null;
        this.filters = {};
        
        this._first = 0;
        this.firstChange.emit(this._first);
        this.updateTotalRecords();
        
        if(this.lazy)
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        else
            this.updateDataToRender(this.value);
    }
    
    public exportCSV(options?:any) {
        let data = this.filteredValue||this.value;
        let csv = '\ufeff';
        
        if(options && options.selectionOnly) {
            data = this.selection||[];
        }
        
        //headers
        for(let i = 0; i < this.columns.length; i++) {
            let column = this.columns[i];
            if(column.exportable && column.field) {
                csv += '"' + (column.header || column.field) + '"';
                
                if(i < (this.columns.length - 1)) {
                    csv += this.csvSeparator;
                }
            }
        }
        
        //body
        data.forEach((record, i) => {
            csv += '\n';
            for(let i = 0; i < this.columns.length; i++) {
                let column = this.columns[i];
                if(column.exportable && column.field) {
                    let cellData = this.resolveFieldData(record, column.field);
                    
                    if(cellData != null)
                        cellData = String(cellData).replace(/"/g, '""');
                    else
                        cellData = '';
                        
                     csv += '"' + cellData + '"';
                    
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
        else if (this.rowStyleMap && this.dataKey) {
            let rowClass = this.rowStyleMap[rowData[this.dataKey]];
            if (rowClass) {
                styleClass += ' ' + rowClass;
            }
        }
        
        return styleClass;
    }
    
    visibleColumns() {
        return this.columns ? this.columns.filter(c => !c.hidden): [];
    }
    
    get containerWidth() {
        if(this.scrollable) {
            if(this.scrollWidth) {
                return this.scrollWidth;
            }
            else if(this.frozenWidth && this.unfrozenWidth) {
                return parseFloat(this.frozenWidth) + parseFloat(this.unfrozenWidth) + 'px';
            }
        }
        else {
            return this.style ? this.style.width : null;
        }
    }
    
    hasFrozenColumns() {
        return this.frozenColumns && this.frozenColumns.length > 0;
    }

    ngOnDestroy() {
        //remove event listener
        if(this.globalFilterFunction) {
            this.globalFilterFunction();
        }
        
        if(this.resizableColumns) {
            this.unbindColumnResizeEvents();
        }
        
        this.unbindDocumentEditListener();
        
        if(this.columnsSubscription) {
            this.columnsSubscription.unsubscribe();
        }
        
        if(this.virtualScrollCallback) {
            this.virtualScrollCallback = null;
        }
    }
}

@NgModule({
    imports: [CommonModule,SharedModule,PaginatorModule,FormsModule],
    exports: [DataTable,SharedModule],
    declarations: [DataTable,DTRadioButton,DTCheckbox,ColumnHeaders,ColumnFooters,TableBody,ScrollableView]
})
export class DataTableModule { }
