import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, effect, inject, InjectionToken, input, model, NgModule, numberAttribute, output, signal, TemplateRef, untracked, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { resolveFieldData } from '@primeuix/utils';
import { BlockableUI, FilterService, Footer, Header, TranslationKeys } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { SpinnerIcon } from 'primeng/icons';
import { PaginatorModule } from 'primeng/paginator';
import {
    DataViewGridTemplateContext,
    DataViewLayout,
    DataViewLayoutChangeEvent,
    DataViewLazyLoadEvent,
    DataViewListTemplateContext,
    DataViewPageEvent,
    DataViewPaginatorDropdownItemTemplateContext,
    DataViewPaginatorLeftTemplateContext,
    DataViewPaginatorPosition,
    DataViewPaginatorRightTemplateContext,
    DataViewPaginatorState,
    DataViewPassThrough,
    DataViewSortEvent
} from 'primeng/types/dataview';
import type { AppendTo } from 'primeng/types/shared';
import { DataViewStyle } from './style/dataviewstyle';

const DATAVIEW_INSTANCE = new InjectionToken<DataView>('DATAVIEW_INSTANCE');

/**
 * DataView displays data in grid or list layout with pagination and sorting features.
 * @group Components
 */
@Component({
    selector: 'p-dataview, p-data-view',
    standalone: true,
    imports: [NgTemplateOutlet, PaginatorModule, SpinnerIcon, Bind],
    template: `
        @if (loading()) {
            <div [pBind]="ptm('loading')" [class]="cx('loading')">
                <div [pBind]="ptm('loadingOverlay')" [class]="cx('loadingOverlay')">
                    @if (loadingIcon()) {
                        <i [class]="cn(cx('loadingIcon'), 'pi-spin' + loadingIcon())"></i>
                    } @else {
                        <ng-container>
                            <svg [pBind]="ptm('loadingIcon')" data-p-icon="spinner" [spin]="true" [class]="cx('loadingIcon')" />
                            <ng-template *ngTemplateOutlet="loadingicon()"></ng-template>
                        </ng-container>
                    }
                </div>
            </div>
        }
        @if (showHeader()) {
            <div [pBind]="ptm('header')" [class]="cx('header')">
                <ng-content select="p-header" />
                <ng-container *ngTemplateOutlet="headerTemplate()"></ng-container>
            </div>
        }
        @if (showTopPaginator()) {
            <p-paginator
                [rows]="rows()"
                [first]="first()"
                [totalRecords]="totalRecords()"
                [pageLinkSize]="pageLinks()"
                [alwaysShow]="alwaysShowPaginator()"
                (onPageChange)="paginate($event)"
                [rowsPerPageOptions]="rowsPerPageOptions()"
                [appendTo]="paginatorDropdownAppendTo()"
                [dropdownScrollHeight]="paginatorDropdownScrollHeight()"
                [templateLeft]="paginatorleft()"
                [templateRight]="paginatorright()"
                [currentPageReportTemplate]="currentPageReportTemplate()"
                [showFirstLastIcon]="showFirstLastIcon()"
                [dropdownItemTemplate]="paginatordropdownitem()"
                [showCurrentPageReport]="showCurrentPageReport()"
                [showJumpToPageDropdown]="showJumpToPageDropdown()"
                [showPageLinks]="showPageLinks()"
                [class]="cn(cx('pcPaginator', { position: 'top' }), paginatorStyleClass())"
                [pt]="ptm('pcPaginator')"
                [unstyled]="unstyled()"
            ></p-paginator>
        }
        <div [pBind]="ptm('content')" [class]="cx('content')">
            @if (isListLayout()) {
                <ng-container
                    *ngTemplateOutlet="
                        listTemplate();
                        context: {
                            $implicit: displayedItems()
                        }
                    "
                ></ng-container>
            }
            @if (isGridLayout()) {
                <ng-container
                    *ngTemplateOutlet="
                        gridTemplate();
                        context: {
                            $implicit: displayedItems()
                        }
                    "
                ></ng-container>
            }
            @if (showEmptyMessage()) {
                <div [pBind]="ptm('emptyMessage')" [class]="cx('emptyMessage')">
                    @if (!emptymessageTemplate()) {
                        {{ emptyMessageLabel() }}
                    } @else {
                        <ng-container *ngTemplateOutlet="emptymessageTemplate()"></ng-container>
                    }
                </div>
            }
        </div>
        @if (showBottomPaginator()) {
            <p-paginator
                [rows]="rows()"
                [first]="first()"
                [totalRecords]="totalRecords()"
                [pageLinkSize]="pageLinks()"
                [alwaysShow]="alwaysShowPaginator()"
                (onPageChange)="paginate($event)"
                [rowsPerPageOptions]="rowsPerPageOptions()"
                [appendTo]="paginatorDropdownAppendTo()"
                [dropdownScrollHeight]="paginatorDropdownScrollHeight()"
                [templateLeft]="paginatorleft()"
                [templateRight]="paginatorright()"
                [currentPageReportTemplate]="currentPageReportTemplate()"
                [showFirstLastIcon]="showFirstLastIcon()"
                [dropdownItemTemplate]="paginatordropdownitem()"
                [showCurrentPageReport]="showCurrentPageReport()"
                [showJumpToPageDropdown]="showJumpToPageDropdown()"
                [showPageLinks]="showPageLinks()"
                [class]="cn(cx('pcPaginator', { position: 'bottom' }), paginatorStyleClass())"
                [pt]="ptm('pcPaginator')"
                [unstyled]="unstyled()"
            ></p-paginator>
        }
        @if (showFooter()) {
            <div [pBind]="ptm('footer')" [class]="cx('footer')">
                <ng-content select="p-footer" />
                <ng-container *ngTemplateOutlet="footerTemplate()"></ng-container>
            </div>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [DataViewStyle, { provide: DATAVIEW_INSTANCE, useExisting: DataView }, { provide: PARENT_INSTANCE, useExisting: DataView }],
    host: {
        '[class]': "cx('root')"
    },
    hostDirectives: [Bind]
})
export class DataView extends BaseComponent<DataViewPassThrough> implements BlockableUI {
    componentName = 'DataView';

    bindDirectiveInstance = inject(Bind, { self: true });

    $pcDataView: DataView | undefined = inject(DATAVIEW_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    /**
     * When specified as true, enables the pagination.
     * @group Props
     */
    paginator = input(false, { transform: booleanAttribute });
    /**
     * Number of rows to display per page.
     * @group Props
     */
    rows = model<number>();
    /**
     * Number of total records, defaults to length of value when not defined.
     * @group Props
     */
    totalRecords = model<number>();
    /**
     * Number of page links to display in paginator.
     * @group Props
     */
    pageLinks = input(5, { transform: numberAttribute });
    /**
     * Array of integer/object values to display inside rows per page dropdown of paginator
     * @group Props
     */
    rowsPerPageOptions = input<number[] | any[]>();
    /**
     * Position of the paginator.
     * @group Props
     */
    paginatorPosition = input<DataViewPaginatorPosition>('bottom');
    /**
     * Custom style class for paginator
     * @group Props
     */
    paginatorStyleClass = input<string>();
    /**
     * Whether to show it even there is only one page.
     * @group Props
     */
    alwaysShowPaginator = input(true, { transform: booleanAttribute });
    /**
     * Target element to attach the paginator dropdown overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    paginatorDropdownAppendTo = input<AppendTo>();
    /**
     * Paginator dropdown height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.
     * @group Props
     */
    paginatorDropdownScrollHeight = input('200px');
    /**
     * Template of the current page report element. Available placeholders are {currentPage},{totalPages},{rows},{first},{last} and {totalRecords}
     * @group Props
     */
    currentPageReportTemplate = input('{currentPage} of {totalPages}');
    /**
     * Whether to display current page report.
     * @group Props
     */
    showCurrentPageReport = input(false, { transform: booleanAttribute });
    /**
     * Whether to display a dropdown to navigate to any page.
     * @group Props
     */
    showJumpToPageDropdown = input(false, { transform: booleanAttribute });
    /**
     * When enabled, icons are displayed on paginator to go first and last page.
     * @group Props
     */
    showFirstLastIcon = input(true, { transform: booleanAttribute });
    /**
     * Whether to show page links.
     * @group Props
     */
    showPageLinks = input(true, { transform: booleanAttribute });
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @group Props
     */
    lazy = input(false, { transform: booleanAttribute });
    /**
     * Whether to call lazy loading on initialization.
     * @group Props
     */
    lazyLoadOnInit = input(true, { transform: booleanAttribute });
    /**
     * Text to display when there is no data. Defaults to global value in i18n translation configuration.
     * @group Props
     */
    emptyMessage = input('');
    /**
     * Style class of the grid.
     * @group Props
     */
    gridStyleClass = input('');
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity.
     * @group Props
     */
    trackBy = input<Function>((_index: number, item: any) => item);
    /**
     * Comma separated list of fields in the object graph to search against.
     * @group Props
     */
    filterBy = input<string>();
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    filterLocale = input<string>();
    /**
     * Displays a loader to indicate data load is in progress.
     * @group Props
     */
    loading = input(false, { transform: booleanAttribute });
    /**
     * The icon to show while indicating data load is in progress.
     * @group Props
     */
    loadingIcon = input<string>();
    /**
     * Index of the first row to be displayed.
     * @group Props
     */
    first = model(0);
    /**
     * Property name of data to use in sorting by default.
     * @group Props
     */
    sortField = input<string>();
    /**
     * Order to sort the data by default.
     * @group Props
     */
    sortOrder = input<number>();
    /**
     * An array of objects to display.
     * @group Props
     */
    value = model<any[]>();
    /**
     * Defines the layout mode.
     * @group Props
     */
    layout = input<DataViewLayout>('list');
    /**
     * Callback to invoke when paging, sorting or filtering happens in lazy mode.
     * @param {DataViewLazyLoadEvent} event - Custom lazy load event.
     * @group Emits
     */
    onLazyLoad = output<DataViewLazyLoadEvent>();
    /**
     * Callback to invoke when pagination occurs.
     * @param {DataViewPageEvent} event - Custom page event.
     * @group Emits
     */
    onPage = output<DataViewPageEvent>();
    /**
     * Callback to invoke when sorting occurs.
     * @param {DataViewSortEvent} event - Custom sort event.
     * @group Emits
     */
    onSort = output<DataViewSortEvent>();
    /**
     * Callback to invoke when changing layout.
     * @param {DataViewLayoutChangeEvent} event - Custom layout change event.
     * @group Emits
     */
    onChangeLayout = output<DataViewLayoutChangeEvent>();
    /**
     * Template for the list layout.
     * @param {DataViewListTemplateContext} context - list template context.
     * @group Templates
     */
    listTemplate = contentChild<TemplateRef<DataViewListTemplateContext>>('list');
    /**
     * Template for grid layout.
     * @param {DataViewGridTemplateContext} context - grid template context.
     * @group Templates
     */
    gridTemplate = contentChild<TemplateRef<DataViewGridTemplateContext>>('grid');
    /**
     * Template for the header section.
     * @group Templates
     */
    headerTemplate = contentChild<TemplateRef<void>>('header');
    /**
     * Template for the empty message section.
     * @group Templates
     */
    emptymessageTemplate = contentChild<TemplateRef<void>>('emptymessage');
    /**
     * Template for the footer section.
     * @group Templates
     */
    footerTemplate = contentChild<TemplateRef<void>>('footer');
    /**
     * Template for the left side of paginator.
     * @param {DataViewPaginatorLeftTemplateContext} context - paginator left template context.
     * @group Templates
     */
    paginatorleft = contentChild<TemplateRef<DataViewPaginatorLeftTemplateContext>>('paginatorleft');
    /**
     * Template for the right side of paginator.
     * @param {DataViewPaginatorRightTemplateContext} context - paginator right template context.
     * @group Templates
     */
    paginatorright = contentChild<TemplateRef<DataViewPaginatorRightTemplateContext>>('paginatorright');
    /**
     * Template for items in paginator dropdown.
     * @param {DataViewPaginatorDropdownItemTemplateContext} context - paginator dropdown item template context.
     * @group Templates
     */
    paginatordropdownitem = contentChild<TemplateRef<DataViewPaginatorDropdownItemTemplateContext>>('paginatordropdownitem');
    /**
     * Template for loading icon.
     * @group Templates
     */
    loadingicon = contentChild<TemplateRef<void>>('loadingicon');
    /**
     * Template for list icon.
     * @group Templates
     */
    listicon = contentChild<TemplateRef<void>>('listicon');
    /**
     * Template for grid icon.
     * @group Templates
     */
    gridicon = contentChild<TemplateRef<void>>('gridicon');

    header = contentChild(Header);

    footer = contentChild(Footer);

    filteredValue = signal<any[] | null>(null);

    filterValue = signal<string | null>(null);

    initialized = false;

    private translation = toSignal(this.config.translationObserver, { initialValue: this.config.translation });

    _componentStyle = inject(DataViewStyle);

    emptyMessageLabel = computed(() => {
        this.translation();
        return this.emptyMessage() || this.translate(TranslationKeys.EMPTY_MESSAGE);
    });

    displayedItems = computed(() => {
        const items = this.filteredValue() || this.value();
        if (!this.paginator()) return items;
        const start = this.lazy() ? 0 : this.first();
        const end = start + (this.rows() ?? 0);
        return items?.slice(start, end) ?? [];
    });

    showHeader = computed(() => !!this.header() || !!this.headerTemplate());

    showFooter = computed(() => !!this.footer() || !!this.footerTemplate());

    showTopPaginator = computed(() => this.paginator() && (this.paginatorPosition() === 'top' || this.paginatorPosition() === 'both'));

    showBottomPaginator = computed(() => this.paginator() && (this.paginatorPosition() === 'bottom' || this.paginatorPosition() === 'both'));

    isListLayout = computed(() => this.layout() === 'list');

    isGridLayout = computed(() => this.layout() === 'grid');

    $isEmpty = computed(() => {
        const data = this.filteredValue() || this.value();
        return data == null || data.length == 0;
    });

    showEmptyMessage = computed(() => this.$isEmpty() && !this.loading());

    filterService = inject(FilterService);

    constructor() {
        super();

        let layoutInit = false;
        effect(() => {
            const layout = this.layout();
            if (layoutInit) {
                untracked(() => this.onChangeLayout.emit({ layout }));
            }
            layoutInit = true;
        });

        effect(() => {
            this.value();
            untracked(() => {
                this.updateTotalRecords();
                if (!this.lazy() && this.hasFilter()) {
                    this.filter(this.filterValue() as string);
                }
            });
        });

        let sortInit = false;
        effect(() => {
            this.sortField();
            this.sortOrder();
            if (sortInit) {
                untracked(() => this.sort());
            }
            sortInit = true;
        });
    }

    onInit() {
        if (this.lazy() && this.lazyLoadOnInit()) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        this.initialized = true;
    }

    updateTotalRecords() {
        if (!this.lazy()) {
            this.totalRecords.set(this.value()?.length ?? 0);
        }
    }

    paginate(event: DataViewPaginatorState) {
        this.first.set(event.first!);
        this.rows.set(event.rows!);

        if (this.lazy()) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }

        this.onPage.emit({
            first: this.first(),
            rows: this.rows()!
        });
    }

    sort() {
        this.first.set(0);

        if (this.lazy()) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        } else if (this.value()) {
            const sorted = [...this.value()!].sort((data1, data2) => {
                let value1 = resolveFieldData(data1, this.sortField());
                let value2 = resolveFieldData(data2, this.sortField());
                let result: number;

                if (value1 == null && value2 != null) result = -1;
                else if (value1 != null && value2 == null) result = 1;
                else if (value1 == null && value2 == null) result = 0;
                else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
                else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

                return (this.sortOrder() as number) * result;
            });

            this.value.set(sorted);

            if (this.hasFilter()) {
                this.filter(this.filterValue() as string);
            }
        }

        this.onSort.emit({
            sortField: this.sortField() as string,
            sortOrder: this.sortOrder() as number
        });
    }

    createLazyLoadMetadata(): DataViewLazyLoadEvent {
        return {
            first: this.first(),
            rows: this.rows()!,
            sortField: this.sortField() as string,
            sortOrder: this.sortOrder() as number
        };
    }

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

    filter(filter: string, filterMatchMode: string = 'contains') {
        this.filterValue.set(filter);

        const val = this.value();
        if (val && val.length) {
            let searchFields = (this.filterBy() as string).split(',');
            const filtered = this.filterService.filter(val, searchFields, filter, filterMatchMode, this.filterLocale());

            if (filtered.length === val.length) {
                this.filteredValue.set(null);
            } else {
                this.filteredValue.set(filtered);
            }

            if (this.paginator()) {
                this.first.set(0);
                this.totalRecords.set(this.filteredValue() ? this.filteredValue()!.length : val.length);
            }

            this.cd.markForCheck();
        }
    }

    hasFilter() {
        const fv = this.filterValue();
        return fv && fv.trim().length > 0;
    }
}

@NgModule({
    imports: [DataView],
    exports: [DataView]
})
export class DataViewModule {}
