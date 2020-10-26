import {NgModule,Component,ElementRef,OnInit,AfterContentInit,Input,Output,EventEmitter,ContentChild,ContentChildren,QueryList,TemplateRef,OnChanges,SimpleChanges,ChangeDetectionStrategy,ChangeDetectorRef, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ObjectUtils} from 'primeng/utils';
import {Header,Footer,PrimeTemplate,SharedModule} from 'primeng/api';
import {PaginatorModule} from 'primeng/paginator';
import {BlockableUI} from 'primeng/api';
import {FilterUtils} from 'primeng/utils';

@Component({
    selector: 'p-dataView',
    template: `
        <div [ngClass]="{'p-dataview p-component': true, 'p-dataview-list': (layout === 'list'), 'p-dataview-grid': (layout === 'grid')}" [ngStyle]="style" [class]="styleClass">
            <div class="p-dataview-loading" *ngIf="loading">
                <div class="p-dataview-loading-overlay p-component-overlay">
                    <i [class]="'p-dataview-loading-icon pi-spin ' + loadingIcon"></i>
                </div>
            </div>
            <div class="p-dataview-header" *ngIf="header || headerTemplate">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="paginate($event)" styleClass="p-paginator-top" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'top' || paginatorPosition =='both')"
                [dropdownAppendTo]="paginatorDropdownAppendTo" [dropdownScrollHeight]="paginatorDropdownScrollHeight" [templateLeft]="paginatorLeftTemplate" [templateRight]="paginatorRightTemplate"
                [currentPageReportTemplate]="currentPageReportTemplate" [showFirstLastIcon]="showFirstLastIcon" [dropdownItemTemplate]="paginatorDropdownItemTemplate" [showCurrentPageReport]="showCurrentPageReport" [showJumpToPageDropdown]="showJumpToPageDropdown" [showPageLinks]="showPageLinks"></p-paginator>
            <div class="p-dataview-content">
                <div class="p-grid p-nogutter">
                    <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="paginator ? ((filteredValue||value) | slice:(lazy ? 0 : first):((lazy ? 0 : first) + rows)) : (filteredValue||value)" [ngForTrackBy]="trackBy">
                        <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: rowData, rowIndex: rowIndex}"></ng-container>
                    </ng-template>
                    <div *ngIf="isEmpty()" class="p-col">
                        <div class="p-dataview-emptymessage">{{emptyMessage}}</div>
                    </div>
                </div>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="paginate($event)" styleClass="p-paginator-bottom" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')"
                [dropdownAppendTo]="paginatorDropdownAppendTo" [dropdownScrollHeight]="paginatorDropdownScrollHeight" [templateLeft]="paginatorLeftTemplate" [templateRight]="paginatorRightTemplate"
                [currentPageReportTemplate]="currentPageReportTemplate" [showFirstLastIcon]="showFirstLastIcon" [dropdownItemTemplate]="paginatorDropdownItemTemplate" [showCurrentPageReport]="showCurrentPageReport" [showJumpToPageDropdown]="showJumpToPageDropdown" [showPageLinks]="showPageLinks"></p-paginator>
            <div class="p-dataview-footer" *ngIf="footer || footerTemplate">
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./dataview.css']
})
export class DataView implements OnInit,AfterContentInit,BlockableUI,OnChanges {

    @Input() layout: string = 'list';

    @Input() paginator: boolean;

    @Input() rows: number;

    @Input() totalRecords: number;

    @Input() pageLinks: number = 5;

    @Input() rowsPerPageOptions: any[];

    @Input() paginatorPosition: string = 'bottom';

    @Input() alwaysShowPaginator: boolean = true;

    @Input() paginatorDropdownAppendTo: any;

    @Input() paginatorDropdownScrollHeight: string = '200px';

    @Input() currentPageReportTemplate: string = '{currentPage} of {totalPages}';

    @Input() showCurrentPageReport: boolean;

    @Input() showJumpToPageDropdown: boolean;

    @Input() showFirstLastIcon: boolean = true;

    @Input() showPageLinks: boolean = true;

    @Input() lazy: boolean;

    @Input() emptyMessage: string = 'No records found';

    @Output() onLazyLoad: EventEmitter<any> = new EventEmitter();

    @Input() style: any;

    @Input() styleClass: string;

    @Input() trackBy: Function = (index: number, item: any) => item;

    @Input() filterBy: string;

    @Input() filterLocale: string;

    @Input() loading: boolean;

    @Input() loadingIcon: string = 'pi pi-spinner';

    @Input() first: number = 0;

    @Input() sortField: string;

    @Input() sortOrder: number;

    @Input() value: any[];

    @Output() onPage: EventEmitter<any> = new EventEmitter();

    @Output() onSort: EventEmitter<any> = new EventEmitter();

    @Output() onChangeLayout: EventEmitter<any> = new EventEmitter();

    @ContentChild(Header) header;

    @ContentChild(Footer) footer;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    _value: any[];

    listItemTemplate: TemplateRef<any>;

    gridItemTemplate: TemplateRef<any>;

    itemTemplate: TemplateRef<any>;

    headerTemplate: TemplateRef<any>;

    footerTemplate: TemplateRef<any>;

    paginatorLeftTemplate: TemplateRef<any>;

    paginatorRightTemplate: TemplateRef<any>;

    paginatorDropdownItemTemplate: TemplateRef<any>;

    filteredValue: any[];

    filterValue: string;

    initialized: boolean;

    constructor(public el: ElementRef, public cd: ChangeDetectorRef) {}

    ngOnInit() {
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        this.initialized = true;
    }

    ngOnChanges(simpleChanges: SimpleChanges) {
        if (simpleChanges.value) {
            this._value = simpleChanges.value.currentValue;
            this.updateTotalRecords();

            if (!this.lazy && this.hasFilter()) {
                this.filter(this.filterValue);
            }
        }

        if (simpleChanges.sortField || simpleChanges.sortOrder) {
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                this.sort();
            }
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

                case 'paginatordropdownitem':
                    this.paginatorDropdownItemTemplate = item.template;
                break;

                case 'header':
                    this.headerTemplate = item.template;
                break;

                case 'footer':
                    this.footerTemplate = item.template;
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

    changeLayout(layout: string) {
        this.layout = layout;
        this.onChangeLayout.emit({
            layout: this.layout
        });
        this.updateItemTemplate();

        this.cd.markForCheck();
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

        if (this.lazy) {
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

    filter(filter: string, filterMatchMode:string ="contains") {
        this.filterValue = filter;

        if (this.value && this.value.length) {
            let searchFields = this.filterBy.split(',');
            this.filteredValue = FilterUtils.filter(this.value, searchFields, filter, filterMatchMode, this.filterLocale);

            if (this.filteredValue.length === this.value.length ) {
                this.filteredValue = null;
            }

            if (this.paginator) {
                this.first = 0;
                this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
            }

            this.cd.markForCheck();
        }
    }

    hasFilter() {
        return this.filterValue && this.filterValue.trim().length > 0;
    }
}

@Component({
    selector: 'p-dataViewLayoutOptions',
    template: `
        <div [ngClass]="'p-dataview-layout-options p-selectbutton p-buttonset'" [ngStyle]="style" [class]="styleClass">
            <button type="button" class="p-button p-button-icon-only" [ngClass]="{'p-highlight': dv.layout === 'list'}" (click)="changeLayout($event, 'list')" (keydown.enter)="changeLayout($event, 'list')">
                <i class="pi pi-bars"></i>
            </button><button type="button" class="p-button p-button-icon-only" [ngClass]="{'p-highlight': dv.layout === 'grid'}" (click)="changeLayout($event, 'grid')" (keydown.enter)="changeLayout($event, 'grid')">
                <i class="pi pi-th-large"></i>
            </button>
        </div>
    `,
    encapsulation: ViewEncapsulation.None
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
