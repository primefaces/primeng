import {
    NgModule,
    Component,
    ElementRef,
    OnInit,
    AfterContentInit,
    Input,
    Output,
    EventEmitter,
    ContentChild,
    ContentChildren,
    QueryList,
    TemplateRef,
    OnChanges,
    SimpleChanges,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    ViewEncapsulation,
    OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectUtils } from 'primeng/utils';
import { Header, Footer, PrimeTemplate, SharedModule, FilterService, TranslationKeys, PrimeNGConfig } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { BlockableUI } from 'primeng/api';
import { Subscription } from 'rxjs';
import { SpinnerIcon } from 'primeng/icons/spinner';
import { ThLargeIcon } from 'primeng/icons/thlarge';
import { BarsIcon } from 'primeng/icons/bars';
import { Nullable } from 'primeng/ts-helpers';
import { DataViewLayoutChangeEvent, DataViewLazyLoadEvent, DataViewPageEvent, DataViewPaginatorState, DataViewSortEvent } from './dataview.interface';
/**
 * DataView displays data in grid or list layout with pagination and sorting features.
 * @group Components
 */
@Component({
    selector: 'p-dataView',
    template: `
        <div [ngClass]="{ 'p-dataview p-component': true, 'p-dataview-list': layout === 'list', 'p-dataview-grid': layout === 'grid' }" [ngStyle]="style" [class]="styleClass">
            <div class="p-dataview-loading" *ngIf="loading">
                <div class="p-dataview-loading-overlay p-component-overlay">
                    <i *ngIf="loadingIcon" [class]="'p-dataview-loading-icon pi-spin ' + loadingIcon"></i>
                    <ng-container *ngIf="!loadingIcon">
                        <SpinnerIcon *ngIf="!loadingIconTemplate" [spin]="true" [styleClass]="'p-dataview-loading-icon'" />
                        <ng-template *ngTemplateOutlet="loadingIconTemplate"></ng-template>
                    </ng-container>
                </div>
            </div>
            <div class="p-dataview-header" *ngIf="header || headerTemplate">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            </div>
            <p-paginator
                [rows]="rows"
                [first]="first"
                [totalRecords]="totalRecords"
                [pageLinkSize]="pageLinks"
                [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="paginate($event)"
                styleClass="p-paginator-top"
                [rowsPerPageOptions]="rowsPerPageOptions"
                *ngIf="paginator && (paginatorPosition === 'top' || paginatorPosition == 'both')"
                [dropdownAppendTo]="paginatorDropdownAppendTo"
                [dropdownScrollHeight]="paginatorDropdownScrollHeight"
                [templateLeft]="paginatorLeftTemplate"
                [templateRight]="paginatorRightTemplate"
                [currentPageReportTemplate]="currentPageReportTemplate"
                [showFirstLastIcon]="showFirstLastIcon"
                [dropdownItemTemplate]="paginatorDropdownItemTemplate"
                [showCurrentPageReport]="showCurrentPageReport"
                [showJumpToPageDropdown]="showJumpToPageDropdown"
                [showPageLinks]="showPageLinks"
            ></p-paginator>
            <div class="p-dataview-content">
                <div class="p-grid p-nogutter grid grid-nogutter" [ngClass]="gridStyleClass">
                    <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="paginator ? (filteredValue || value | slice : (lazy ? 0 : first) : (lazy ? 0 : first) + rows) : filteredValue || value" [ngForTrackBy]="trackBy">
                        <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: rowData, rowIndex: rowIndex }"></ng-container>
                    </ng-template>
                    <div *ngIf="isEmpty() && !loading" class="p-col col">
                        <div class="p-dataview-emptymessage">
                            <ng-container *ngIf="!emptyMessageTemplate; else emptyFilter">
                                {{ emptyMessageLabel }}
                            </ng-container>
                            <ng-container #emptyFilter *ngTemplateOutlet="emptyMessageTemplate"></ng-container>
                        </div>
                    </div>
                </div>
            </div>
            <p-paginator
                [rows]="rows"
                [first]="first"
                [totalRecords]="totalRecords"
                [pageLinkSize]="pageLinks"
                [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="paginate($event)"
                styleClass="p-paginator-bottom"
                [rowsPerPageOptions]="rowsPerPageOptions"
                *ngIf="paginator && (paginatorPosition === 'bottom' || paginatorPosition == 'both')"
                [dropdownAppendTo]="paginatorDropdownAppendTo"
                [dropdownScrollHeight]="paginatorDropdownScrollHeight"
                [templateLeft]="paginatorLeftTemplate"
                [templateRight]="paginatorRightTemplate"
                [currentPageReportTemplate]="currentPageReportTemplate"
                [showFirstLastIcon]="showFirstLastIcon"
                [dropdownItemTemplate]="paginatorDropdownItemTemplate"
                [showCurrentPageReport]="showCurrentPageReport"
                [showJumpToPageDropdown]="showJumpToPageDropdown"
                [showPageLinks]="showPageLinks"
            ></p-paginator>
            <div class="p-dataview-footer" *ngIf="footer || footerTemplate">
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./dataview.css'],
    host: {
        class: 'p-element'
    }
})
export class DataView implements OnInit, AfterContentInit, OnDestroy, BlockableUI, OnChanges {
    /**
     * When specified as true, enables the pagination.
     * @group Props
     */
    @Input() paginator: boolean | undefined;
    /**
     * Number of rows to display per page.
     * @group Props
     */
    @Input() rows: number | undefined;
    /**
     * Number of total records, defaults to length of value when not defined.
     * @group Props
     */
    @Input() totalRecords: number | undefined;
    /**
     * Number of page links to display in paginator.
     * @group Props
     */
    @Input() pageLinks: number = 5;
    /**
     * Array of integer/object values to display inside rows per page dropdown of paginator
     * @group Props
     */
    @Input() rowsPerPageOptions: number[] | any[] | undefined;
    /**
     * Position of the paginator.
     * @group Props
     */
    @Input() paginatorPosition: 'top' | 'bottom' | 'both' = 'bottom';
    /**
     * Whether to show it even there is only one page.
     * @group Props
     */
    @Input() alwaysShowPaginator: boolean = true;
    /**
     * Target element to attach the paginator dropdown overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    @Input() paginatorDropdownAppendTo: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any;
    /**
     * Paginator dropdown height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.
     * @group Props
     */
    @Input() paginatorDropdownScrollHeight: string = '200px';
    /**
     * Template of the current page report element. Available placeholders are {currentPage},{totalPages},{rows},{first},{last} and {totalRecords}
     * @group Props
     */
    @Input() currentPageReportTemplate: string = '{currentPage} of {totalPages}';
    /**
     * Whether to display current page report.
     * @group Props
     */
    @Input() showCurrentPageReport: boolean | undefined;
    /**
     * Whether to display a dropdown to navigate to any page.
     * @group Props
     */
    @Input() showJumpToPageDropdown: boolean | undefined;
    /**
     * When enabled, icons are displayed on paginator to go first and last page.
     * @group Props
     */
    @Input() showFirstLastIcon: boolean = true;
    /**
     * Whether to show page links.
     * @group Props
     */
    @Input() showPageLinks: boolean = true;
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @group Props
     */
    @Input() lazy: boolean | undefined;
    /**
     * Whether to call lazy loading on initialization.
     * @group Props
     */
    @Input() lazyLoadOnInit: boolean = true;
    /**
     * Text to display when there is no data. Defaults to global value in i18n translation configuration.
     * @group Props
     */
    @Input() emptyMessage: string = '';
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Style class of the grid.
     * @group Props
     */
    @Input() gridStyleClass: string = '';
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity.
     * @group Props
     */
    @Input() trackBy: Function = (index: number, item: any) => item;
    /**
     * Comma separated list of fields in the object graph to search against.
     * @group Props
     */
    @Input() filterBy: string | undefined;
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    @Input() filterLocale: string | undefined;
    /**
     * Displays a loader to indicate data load is in progress.
     * @group Props
     */
    @Input() loading: boolean | undefined;
    /**
     * The icon to show while indicating data load is in progress.
     * @group Props
     */
    @Input() loadingIcon: string | undefined;
    /**
     * Index of the first row to be displayed.
     * @group Props
     */
    @Input() first: number | undefined = 0;
    /**
     * Property name of data to use in sorting by default.
     * @group Props
     */
    @Input() sortField: string | undefined;
    /**
     * Order to sort the data by default.
     * @group Props
     */
    @Input() sortOrder: number | undefined;
    /**
     * An array of objects to display.
     * @group Props
     */
    @Input() value: any[] | undefined;
    /**
     * Defines the layout mode.
     * @group Props
     */
    @Input() get layout(): 'list' | 'grid' {
        return this._layout;
    }
    set layout(layout: 'list' | 'grid') {
        this._layout = layout;

        if (this.initialized) {
            this.changeLayout(layout);
        }
    }
    /**
     * Callback to invoke when paging, sorting or filtering happens in lazy mode.
     * @param {DataViewLazyLoadEvent} event - Custom lazy load event.
     * @group Emits
     */
    @Output() onLazyLoad: EventEmitter<DataViewLazyLoadEvent> = new EventEmitter<DataViewLazyLoadEvent>();
    /**
     * Callback to invoke when pagination occurs.
     * @param {DataViewPageEvent} event - Custom page event.
     * @group Emits
     */
    @Output() onPage: EventEmitter<DataViewPageEvent> = new EventEmitter<DataViewPageEvent>();
    /**
     * Callback to invoke when sorting occurs.
     * @param {DataViewSortEvent} event - Custom sort event.
     * @group Emits
     */
    @Output() onSort: EventEmitter<DataViewSortEvent> = new EventEmitter<DataViewSortEvent>();
    /**
     * Callback to invoke when changing layout.
     * @param {DataViewLayoutChangeEvent} event - Custom layout change event.
     * @group Emits
     */
    @Output() onChangeLayout: EventEmitter<DataViewLayoutChangeEvent> = new EventEmitter<DataViewLayoutChangeEvent>();

    @ContentChild(Header) header: any;

    @ContentChild(Footer) footer: any;

    @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<PrimeTemplate>>;

    _value: Nullable<any[]>;

    listItemTemplate: Nullable<TemplateRef<any>>;

    gridItemTemplate: Nullable<TemplateRef<any>>;

    itemTemplate: Nullable<TemplateRef<any>>;

    headerTemplate: Nullable<TemplateRef<any>>;

    emptyMessageTemplate: Nullable<TemplateRef<any>>;

    footerTemplate: Nullable<TemplateRef<any>>;

    paginatorLeftTemplate: Nullable<TemplateRef<any>>;

    paginatorRightTemplate: Nullable<TemplateRef<any>>;

    paginatorDropdownItemTemplate: Nullable<TemplateRef<any>>;

    loadingIconTemplate: Nullable<TemplateRef<any>>;

    listIconTemplate: Nullable<TemplateRef<any>>;

    gridIconTemplate: Nullable<TemplateRef<any>>;

    filteredValue: Nullable<any[]>;

    filterValue: Nullable<string>;

    initialized: Nullable<boolean>;

    _layout: 'list' | 'grid' = 'list';

    translationSubscription: Nullable<Subscription>;

    get emptyMessageLabel(): string {
        return this.emptyMessage || this.config.getTranslation(TranslationKeys.EMPTY_MESSAGE);
    }

    constructor(public el: ElementRef, public cd: ChangeDetectorRef, public filterService: FilterService, public config: PrimeNGConfig) {}

    ngOnInit() {
        if (this.lazy && this.lazyLoadOnInit) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }

        this.translationSubscription = this.config.translationObserver.subscribe(() => {
            this.cd.markForCheck();
        });
        this.initialized = true;
    }

    ngOnChanges(simpleChanges: SimpleChanges) {
        if (simpleChanges.value) {
            this._value = simpleChanges.value.currentValue;
            this.updateTotalRecords();

            if (!this.lazy && this.hasFilter()) {
                this.filter(this.filterValue as string);
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
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
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

                case 'empty':
                    this.emptyMessageTemplate = item.template;
                    break;

                case 'header':
                    this.headerTemplate = item.template;
                    break;

                case 'footer':
                    this.footerTemplate = item.template;
                    break;

                case 'loadingicon':
                    this.loadingIconTemplate = item.template;
                    break;

                case 'listicon':
                    this.listIconTemplate = item.template;
                    break;

                case 'gridicon':
                    this.gridIconTemplate = item.template;
                    break;
            }
        });

        this.updateItemTemplate();
    }

    updateItemTemplate() {
        switch (this.layout) {
            case 'list':
                this.itemTemplate = this.listItemTemplate;
                break;

            case 'grid':
                this.itemTemplate = this.gridItemTemplate;
                break;
        }
    }

    changeLayout(layout: 'list' | 'grid') {
        this._layout = layout;
        this.onChangeLayout.emit({
            layout: this.layout
        });
        this.updateItemTemplate();

        this.cd.markForCheck();
    }

    updateTotalRecords() {
        this.totalRecords = this.lazy ? this.totalRecords : this._value ? this._value.length : 0;
    }

    paginate(event: DataViewPaginatorState) {
        this.first = event.first;
        this.rows = event.rows;

        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }

        this.onPage.emit({
            first: <number>this.first,
            rows: <number>this.rows
        });
    }

    sort() {
        this.first = 0;

        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        } else if (this.value) {
            this.value.sort((data1, data2) => {
                let value1 = ObjectUtils.resolveFieldData(data1, this.sortField);
                let value2 = ObjectUtils.resolveFieldData(data2, this.sortField);
                let result = null;

                if (value1 == null && value2 != null) result = -1;
                else if (value1 != null && value2 == null) result = 1;
                else if (value1 == null && value2 == null) result = 0;
                else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
                else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

                return (this.sortOrder as number) * result;
            });

            if (this.hasFilter()) {
                this.filter(this.filterValue as string);
            }
        }

        this.onSort.emit({
            sortField: <string>this.sortField,
            sortOrder: <number>this.sortOrder
        });
    }

    isEmpty() {
        let data = this.filteredValue || this.value;
        return data == null || data.length == 0;
    }

    createLazyLoadMetadata(): DataViewLazyLoadEvent {
        return {
            first: <number>this.first,
            rows: <number>this.rows,
            sortField: <string>this.sortField,
            sortOrder: <number>this.sortOrder
        };
    }

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

    filter(filter: string, filterMatchMode: string = 'contains') {
        this.filterValue = filter;

        if (this.value && this.value.length) {
            let searchFields = (this.filterBy as string).split(',');
            this.filteredValue = this.filterService.filter(this.value, searchFields, filter, filterMatchMode, this.filterLocale);

            if (this.filteredValue.length === this.value.length) {
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

    ngOnDestroy() {
        if (this.translationSubscription) {
            this.translationSubscription.unsubscribe();
        }
    }
}

@Component({
    selector: 'p-dataViewLayoutOptions',
    template: `
        <div [ngClass]="'p-dataview-layout-options p-selectbutton p-buttonset'" [ngStyle]="style" [class]="styleClass">
            <button type="button" class="p-button p-button-icon-only" [ngClass]="{ 'p-highlight': dv.layout === 'list' }" (click)="changeLayout($event, 'list')" (keydown.enter)="changeLayout($event, 'list')">
                <BarsIcon *ngIf="!dv.listIconTemplate" />
                <ng-template *ngTemplateOutlet="dv.listIconTemplate"></ng-template></button
            ><button type="button" class="p-button p-button-icon-only" [ngClass]="{ 'p-highlight': dv.layout === 'grid' }" (click)="changeLayout($event, 'grid')" (keydown.enter)="changeLayout($event, 'grid')">
                <ThLargeIcon *ngIf="!dv.gridIconTemplate" />
                <ng-template *ngTemplateOutlet="dv.gridIconTemplate"></ng-template>
            </button>
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    }
})
export class DataViewLayoutOptions {
    @Input() style: { [klass: string]: any } | null | undefined;

    @Input() styleClass: string | undefined;

    constructor(public dv: DataView) {}

    changeLayout(event: Event, layout: 'list' | 'grid') {
        this.dv.changeLayout(layout);
        event.preventDefault();
    }
}
@NgModule({
    imports: [CommonModule, SharedModule, PaginatorModule, SpinnerIcon, BarsIcon, ThLargeIcon],
    exports: [DataView, SharedModule, DataViewLayoutOptions],
    declarations: [DataView, DataViewLayoutOptions]
})
export class DataViewModule {}
