import {NgModule,Component,ElementRef,OnInit,AfterContentInit,DoCheck,OnDestroy,Input,Output,SimpleChange,EventEmitter,ContentChild,ContentChildren,QueryList,TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ObjectUtils} from '../utils/objectutils';
import {Header,Footer,PrimeTemplate,SharedModule} from '../common/shared';
import {PaginatorModule} from '../paginator/paginator';
import {BlockableUI} from '../common/blockableui';

@Component({
    selector: 'p-dataView',
    template: `
        <div [ngClass]="{'ui-dataview ui-widget': true, 'ui-dataview-list': (layout === 'list'), 'ui-dataview-grid': (layout === 'grid')}" [ngStyle]="style" [class]="styleClass">
            <div class="ui-dataview-loading ui-widget-overlay" *ngIf="loading"></div>
            <div class="ui-dataview-loading-content" *ngIf="loading">
                <i [class]="'ui-dataview-loading-icon pi-spin ' + loadingIcon"></i>
            </div>
            <div class="ui-dataview-header ui-widget-header ui-corner-top">
                <ng-content select="p-header"></ng-content>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="paginate($event)" styleClass="ui-paginator-top" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'top' || paginatorPosition =='both')"
                [dropdownAppendTo]="paginatorDropdownAppendTo" [templateLeft]="paginatorLeftTemplate" [templateRight]="paginatorRightTemplate"
                [currentPageReportTemplate]="currentPageReportTemplate" [showCurrentPageReport]="showCurrentPageReport"></p-paginator>
            <div class="ui-dataview-content ui-widget-content">
                <div class="ui-g">
                    <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="paginator ? ((filteredValue||value) | slice:(lazy ? 0 : first):((lazy ? 0 : first) + rows)) : (filteredValue||value)" [ngForTrackBy]="trackBy">
                        <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: rowData, rowIndex: rowIndex}"></ng-container>
                    </ng-template>
                    <div *ngIf="isEmpty()" class="ui-g-12 ui-dataview-emptymessage">{{emptyMessage}}</div>
                </div>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="paginate($event)" styleClass="ui-paginator-bottom" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')"
                [dropdownAppendTo]="paginatorDropdownAppendTo" [templateLeft]="paginatorLeftTemplate" [templateRight]="paginatorRightTemplate"
                [currentPageReportTemplate]="currentPageReportTemplate" [showCurrentPageReport]="showCurrentPageReport"></p-paginator>
            <div class="ui-dataview-footer ui-widget-header ui-corner-bottom" *ngIf="footer">
                <ng-content select="p-footer"></ng-content>
            </div>
        </div>
    `
})
export class DataView implements OnInit,AfterContentInit,BlockableUI {

    @Input() layout: string = 'list';

    @Input() paginator: boolean;

    @Input() rows: number;
    
    @Input() totalRecords: number;

    @Input() pageLinks: number = 5;
    
    @Input() rowsPerPageOptions: number[];

    @Input() paginatorPosition: string = 'bottom';
    
    @Input() alwaysShowPaginator: boolean = true;

    @Input() paginatorDropdownAppendTo: any;

    @Input() currentPageReportTemplate: string = '{currentPage} of {totalPages}';

    @Input() showCurrentPageReport: boolean;

    @Input() lazy: boolean;

    @Input() emptyMessage: string = 'No records found';
    
    @Output() onLazyLoad: EventEmitter<any> = new EventEmitter();

    @Input() style: any;

    @Input() styleClass: string;

    @Input() trackBy: Function = (index: number, item: any) => item;

    @Input() filterBy: string;
    
    @Input() loading: boolean;

    @Input() loadingIcon: string = 'pi pi-spinner';

    @Input() first: number = 0;

    @Output() onPage: EventEmitter<any> = new EventEmitter();

    @Output() onSort: EventEmitter<any> = new EventEmitter();
    
    @ContentChild(Header) header;

    @ContentChild(Footer) footer;
    
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;
    
    _value: any[];
    
    listItemTemplate: TemplateRef<any>;

    gridItemTemplate: TemplateRef<any>;

    itemTemplate: TemplateRef<any>;

    paginatorLeftTemplate: TemplateRef<any>;

    paginatorRightTemplate: TemplateRef<any>;
    
    filteredValue: any[];

    filterValue: string;

    _sortField: string;

    _sortOrder: number = 1;

    initialized: boolean;
    
    constructor(public el: ElementRef) {}

    ngOnInit() {
        if(this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        this.initialized = true;
    }

    @Input() get sortField(): string {
        return this._sortField;
    }

    set sortField(val: string) {
        this._sortField = val;

        //avoid triggering lazy load prior to lazy initialization at onInit
        if ( !this.lazy || this.initialized ) {
            this.sort();
        }
    }

    @Input() get sortOrder(): number {
        return this._sortOrder;
    }
    set sortOrder(val: number) {
        this._sortOrder = val;

         //avoid triggering lazy load prior to lazy initialization at onInit
        if ( !this.lazy || this.initialized ) {
            this.sort();
        }
    }
    
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'listItem':
                    this.listItemTemplate = item.template;
                break;
                
                case 'gridItem':
                    this.gridItemTemplate = item.template;
                break;

                case 'paginatorleft':
                    this.paginatorLeftTemplate = item.template;
                break;

                case 'paginatorright':
                    this.paginatorRightTemplate = item.template;
                break;
            }
        });

        this.updateItemTemplate();
    }

    updateItemTemplate() {
        switch(this.layout) {
            case 'list':
                this.itemTemplate = this.listItemTemplate;
            break;
            
            case 'grid':
                this.itemTemplate = this.gridItemTemplate;
            break;
        }
    }
    
    @Input() get value(): any[] {
        return this._value;
    }

    set value(val:any[]) {
        this._value = val;
        this.updateTotalRecords();
        if (!this.lazy && this.hasFilter()) {
            this.filter(this.filterValue);
        }
    }

    changeLayout(layout: string) {
        this.layout = layout;
        this.updateItemTemplate();
    }
        
    updateTotalRecords() {
        this.totalRecords = this.lazy ? this.totalRecords : (this._value ? this._value.length : 0);
    }

    paginate(event) {
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

    sort() {
        this.first = 0;

        if(this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else if (this.value) {
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

            if (this.hasFilter()) {
                this.filter(this.filterValue);
            }
        }

        this.onSort.emit({
            sortField: this.sortField,
            sortOrder: this.sortOrder
        });
    }

    isEmpty() {
        let data = this.filteredValue||this.value;
        return data == null || data.length == 0;
    }
    
    createLazyLoadMetadata(): any {
        return {
            first: this.first,
            rows: this.rows,
            sortField: this.sortField,
            sortOrder: this.sortOrder
        };
    }
    
    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

    filter(filter: string) {
        this.filterValue = filter;

        if (this.value && this.value.length) {
            let searchFields = this.filterBy.split(',');
            this.filteredValue = ObjectUtils.filter(this.value, searchFields, filter);
    
            if (this.filteredValue.length === this.value.length ) {
                this.filteredValue = null;
            }
    
            if (this.paginator) {
                this.first = 0;
                this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
            }
        }       
    }

    hasFilter() {
        return this.filterValue && this.filterValue.trim().length > 0;
    }
}

@Component({
    selector: 'p-dataViewLayoutOptions',
    template: `
        <div [ngClass]="'ui-dataview-layout-options ui-selectbutton ui-buttonset'" [ngStyle]="style" [class]="styleClass">
            <a tabindex="0" class="ui-button ui-button-icon-only ui-state-default" (click)="changeLayout($event, 'list')" (keydown.enter)="changeLayout($event, 'list')"
                [ngClass]="{'ui-state-active': dv.layout === 'list'}">
                <i class="pi pi-bars ui-button-icon-left"></i>
                <span class="ui-button-text ui-clickable">ui-btn</span>
            </a><a tabindex="0" class="ui-button ui-button-icon-only ui-state-default" (click)="changeLayout($event, 'grid')" (keydown.enter)="changeLayout($event, 'grid')"
                [ngClass]="{'ui-state-active': dv.layout === 'grid'}">
                <i class="pi pi-th-large ui-button-icon-left"></i>
                <span class="ui-button-text ui-clickable">ui-btn</span>
            </a>
        </div>
    `
})
export class DataViewLayoutOptions  {

    @Input() style: any;

    @Input() styleClass: string;

    constructor(public dv: DataView) {}

    changeLayout(event: Event, layout: string) {
        this.dv.changeLayout(layout);
        event.preventDefault();
    }
}
@NgModule({
    imports: [CommonModule,SharedModule,PaginatorModule],
    exports: [DataView,SharedModule,DataViewLayoutOptions],
    declarations: [DataView,DataViewLayoutOptions]
})
export class DataViewModule { }
