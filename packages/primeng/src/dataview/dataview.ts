import { CommonModule } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    NgModule,
    numberAttribute,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { resolveFieldData } from '@primeuix/utils';
import { BlockableUI, FilterService, Footer, Header, SharedModule, TranslationKeys } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { SpinnerIcon } from 'primeng/icons';
import { PaginatorModule } from 'primeng/paginator';
import { Nullable } from 'primeng/ts-helpers';
import { Subscription } from 'rxjs';
import { DataViewLayoutChangeEvent, DataViewLazyLoadEvent, DataViewPageEvent, DataViewPaginatorState, DataViewSortEvent } from './dataview.interface';
import { DataViewStyle } from './style/dataviewstyle';

/**
 * DataView displays data in grid or list layout with pagination and sorting features.
 * @group Components
 */
@Component({
    selector: 'p-dataView, p-dataview, p-data-view',
    standalone: true,
    imports: [CommonModule, PaginatorModule, SpinnerIcon, SharedModule],
    template: `
        <div [ngClass]="{ 'p-dataview p-component': true, 'p-dataview-list': layout === 'list', 'p-dataview-grid': layout === 'grid' }" [ngStyle]="style" [class]="styleClass">
            <div class="p-dataview-loading" *ngIf="loading">
                <div class="p-dataview-loading-overlay p-overlay-mask">
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
                [styleClass]="paginatorStyleClass"
            ></p-paginator>

            <div class="p-dataview-content">
                @if (layout === 'list') {
                    <ng-container
                        *ngTemplateOutlet="
                            listTemplate;
                            context: {
                                $implicit: paginator ? (filteredValue || value | slice: (lazy ? 0 : first) : (lazy ? 0 : first) + rows) : filteredValue || value
                            }
                        "
                    ></ng-container>
                }
                @if (layout === 'grid') {
                    <ng-container
                        *ngTemplateOutlet="
                            gridTemplate;
                            context: {
                                $implicit: paginator ? (filteredValue || value | slice: (lazy ? 0 : first) : (lazy ? 0 : first) + rows) : filteredValue || value
                            }
                        "
                    ></ng-container>
                }
                <div *ngIf="isEmpty() && !loading">
                    <div class="p-dataview-emptymessage">
                        <ng-container *ngIf="!emptyMessageTemplate; else empty">
                            {{ emptyMessageLabel }}
                        </ng-container>
                        <ng-container #empty *ngTemplateOutlet="emptyMessageTemplate"></ng-container>
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
                [styleClass]="paginatorStyleClass"
            ></p-paginator>
            <div class="p-dataview-footer" *ngIf="footer || footerTemplate">
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [DataViewStyle]
})
export class DataView extends BaseComponent implements OnInit, OnDestroy, BlockableUI, OnChanges {
    /**
     * When specified as true, enables the pagination.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) paginator: boolean | undefined;
    /**
     * Number of rows to display per page.
     * @group Props
     */
    @Input({ transform: numberAttribute }) rows: number | undefined;
    /**
     * Number of total records, defaults to length of value when not defined.
     * @group Props
     */
    @Input({ transform: numberAttribute }) totalRecords: number | undefined;
    /**
     * Number of page links to display in paginator.
     * @group Props
     */
    @Input({ transform: numberAttribute }) pageLinks: number = 5;
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
     * Custom style class for paginator
     * @group Props
     */
    @Input() paginatorStyleClass: string | undefined;
    /**
     * Whether to show it even there is only one page.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) alwaysShowPaginator: boolean = true;
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
    @Input({ transform: booleanAttribute }) showCurrentPageReport: boolean | undefined;
    /**
     * Whether to display a dropdown to navigate to any page.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showJumpToPageDropdown: boolean | undefined;
    /**
     * When enabled, icons are displayed on paginator to go first and last page.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showFirstLastIcon: boolean = true;
    /**
     * Whether to show page links.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showPageLinks: boolean = true;
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) lazy: boolean | undefined;
    /**
     * Whether to call lazy loading on initialization.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) lazyLoadOnInit: boolean = true;
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
    @Input({ transform: booleanAttribute }) loading: boolean | undefined;
    /**
     * The icon to show while indicating data load is in progress.
     * @group Props
     */
    @Input() loadingIcon: string | undefined;
    /**
     * Index of the first row to be displayed.
     * @group Props
     */
    @Input({ transform: numberAttribute }) first: number | undefined = 0;
    /**
     * Property name of data to use in sorting by default.
     * @group Props
     */
    @Input() sortField: string | undefined;
    /**
     * Order to sort the data by default.
     * @group Props
     */
    @Input({ transform: numberAttribute }) sortOrder: number | undefined;
    /**
     * An array of objects to display.
     * @group Props
     */
    @Input() value: any[] | undefined;
    /**
     * Defines the layout mode.
     * @group Props
     */
    @Input() layout: 'list' | 'grid' = 'list';
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
    /**
     * Template for the list layout.
     * @group Templates
     */
    @ContentChild('list') listTemplate: Nullable<TemplateRef<any>>;
    /**
     * Template for grid layout.
     * @group Templates
     */
    @ContentChild('grid') gridTemplate: TemplateRef<any>;
    /**
     * Template for the header section.
     * @group Templates
     */
    @ContentChild('header') headerTemplate: TemplateRef<any>;
    /**
     * Template for the empty message section.
     * @group Templates
     */
    @ContentChild('emptymessage') emptyMessageTemplate: TemplateRef<any>;
    /**
     * Template for the footer section.
     * @group Templates
     */
    @ContentChild('footer') footerTemplate: TemplateRef<any>;
    /**
     * Template for the left side of paginator.
     * @group Templates
     */
    @ContentChild('paginatorleft') paginatorLeftTemplate: TemplateRef<any>;
    /**
     * Template for the right side of paginator.
     * @group Templates
     */
    @ContentChild('paginatorright') paginatorRightTemplate: TemplateRef<any>;
    /**
     * Template for items in paginator dropdown.
     * @group Templates
     */
    @ContentChild('paginatordropdownitem') paginatorDropdownItemTemplate: TemplateRef<any>;
    /**
     * Template for loading icon.
     * @group Templates
     */
    @ContentChild('loadingIcon') loadingIconTemplate: TemplateRef<any>;
    /**
     * Template for list icon.
     * @group Templates
     */
    @ContentChild('listicon') listIconTemplate: TemplateRef<any>;
    /**
     * Template for grid icon.
     * @group Templates
     */
    @ContentChild('gridicon') gridIconTemplate: TemplateRef<any>;

    @ContentChild(Header) header: any;

    @ContentChild(Footer) footer: any;

    _value: Nullable<any[]>;

    filteredValue: Nullable<any[]>;

    filterValue: Nullable<string>;

    initialized: Nullable<boolean>;

    _layout: 'list' | 'grid' = 'list';

    translationSubscription: Nullable<Subscription>;

    _componentStyle = inject(DataViewStyle);

    get emptyMessageLabel(): string {
        return this.emptyMessage || this.config.getTranslation(TranslationKeys.EMPTY_MESSAGE);
    }

    filterService = inject(FilterService);

    ngOnInit() {
        super.ngOnInit();
        if (this.lazy && this.lazyLoadOnInit) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }

        this.translationSubscription = this.config.translationObserver.subscribe(() => {
            this.cd.markForCheck();
        });
        this.initialized = true;
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
    }

    ngOnChanges(simpleChanges: SimpleChanges) {
        super.ngOnChanges(simpleChanges);
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

    // ngAfterContentInit() {
    //     (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
    //         switch (item.getType()) {
    //             // case 'listItem':
    //             // case 'list':
    //             //     this.listTemplate = item.template;
    //             //     break;
    //
    //             // case 'gridItem':
    //             // case 'grid':
    //             //     this.gridTemplate = item.template;
    //             //     break;
    //
    //             case 'paginatorleft':
    //                 this.paginatorLeftTemplate = item.template;
    //                 break;
    //
    //             case 'paginatorright':
    //                 this.paginatorRightTemplate = item.template;
    //                 break;
    //
    //             case 'paginatordropdownitem':
    //                 this.paginatorDropdownItemTemplate = item.template;
    //                 break;
    //
    //             case 'empty':
    //                 this.emptyMessageTemplate = item.template;
    //                 break;
    //
    //             case 'header':
    //                 this.headerTemplate = item.template;
    //                 break;
    //
    //             case 'footer':
    //                 this.footerTemplate = item.template;
    //                 break;
    //
    //             case 'loadingicon':
    //                 this.loadingIconTemplate = item.template;
    //                 break;
    //
    //             case 'listicon':
    //                 this.listIconTemplate = item.template;
    //                 break;
    //
    //             case 'gridicon':
    //                 this.gridIconTemplate = item.template;
    //                 break;
    //         }
    //     });
    //
    //     // this.updateItemTemplate();
    // }

    //
    // updateItemTemplate() {
    //     switch (this.layout) {
    //         case 'list':
    //             this.itemTemplate = this.listTemplate;
    //             break;
    //
    //         case 'grid':
    //             this.itemTemplate = this.gridTemplate;
    //             break;
    //     }
    // }
    //

    // changeLayout(layout: 'list' | 'grid') {
    //     this._layout = layout;
    //     this.onChangeLayout.emit({
    //         layout: this.layout,
    //     });
    //     this.cd.markForCheck();
    // }

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
                let value1 = resolveFieldData(data1, this.sortField);
                let value2 = resolveFieldData(data2, this.sortField);
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
        super.ngOnDestroy();
    }
}

@NgModule({
    imports: [DataView, SharedModule],
    exports: [DataView, SharedModule]
})
export class DataViewModule {}
