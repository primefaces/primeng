import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, effect, ElementRef, inject, input, model, numberAttribute, output, TemplateRef, untracked, viewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isClickable, setAttribute } from '@primeuix/utils';
import { BlockableUI, FilterMatchMode, FilterMetadata, FilterOperator, FilterService, LazyLoadMeta, OverlayService, ScrollerOptions, SortMeta, TableState } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { CheckboxChangeEvent } from 'primeng/checkbox';
import { DomHandler } from 'primeng/dom';
import { PaginatorModule } from 'primeng/paginator';
import { Scroller, ScrollerModule } from 'primeng/scroller';
import { ArrowDownIcon } from 'primeng/icons/arrowdown';
import { ArrowUpIcon } from 'primeng/icons/arrowup';
import { SpinnerIcon } from 'primeng/icons/spinner';
import {
    ExportCSVOptions,
    TableColResizeEvent,
    TableColumnReorderEvent,
    TableContextMenuSelectEvent,
    TableEditCancelEvent,
    TableEditCompleteEvent,
    TableEditInitEvent,
    TableFilterEvent,
    TableHeaderCheckboxToggleEvent,
    TableLazyLoadEvent,
    TablePageEvent,
    TablePaginatorPosition,
    TableColumnResizeMode,
    TableEditMode,
    TablePassThrough,
    TableRowExpandMode,
    TableRowGroupMode,
    TableSelectionMode,
    TableSize,
    TableSortMode,
    TableStateStorage,
    TableRowCollapseEvent,
    TableRowExpandEvent,
    TableRowReorderEvent,
    TableRowSelectEvent,
    TableRowUnSelectEvent,
    TableSelectAllChangeEvent
} from 'primeng/types/table';
import type { CSSProperties } from 'primeng/types/shared';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';
import { Subscription } from 'rxjs';
import { TableStyle } from './style/tablestyle';
import { TableBody } from './table-body';
import { TABLE_INSTANCE, TableService } from './table-service';
/**
 * Table displays data in tabular format.
 * @group Components
 */
@Component({
    selector: 'p-table',
    standalone: true,
    imports: [NgTemplateOutlet, PaginatorModule, ScrollerModule, FormsModule, BindModule, SpinnerIcon, ArrowDownIcon, ArrowUpIcon, TableBody],
    template: `
        @if (showLoadingMask()) {
            <div [class]="cx('mask')" [pBind]="ptm('mask')" animate.enter="p-overlay-mask-enter-active" animate.leave="p-overlay-mask-leave-active">
                @if (loadingIcon()) {
                    <i [class]="cn(cx('loadingIcon'), loadingIcon())" [pBind]="ptm('loadingIcon')"></i>
                }
                @if (!loadingIcon()) {
                    @if (!loadingIconTemplate()) {
                        <svg data-p-icon="spinner" [spin]="true" [class]="cx('loadingIcon')" [pBind]="ptm('loadingIcon')" />
                    }
                    @if (loadingIconTemplate()) {
                        <span [class]="cx('loadingIcon')" [pBind]="ptm('loadingIcon')">
                            <ng-template *ngTemplateOutlet="loadingIconTemplate()"></ng-template>
                        </span>
                    }
                }
            </div>
        }
        @if (captionTemplate()) {
            <div [class]="cx('header')" [pBind]="ptm('header')">
                <ng-container *ngTemplateOutlet="captionTemplate()"></ng-container>
            </div>
        }
        @if (showTopPaginator()) {
            <p-paginator
                [rows]="rows()"
                [first]="first()"
                [totalRecords]="totalRecords()"
                [pageLinkSize]="pageLinks()"
                [alwaysShow]="alwaysShowPaginator()"
                (onPageChange)="onPageChange($event)"
                [rowsPerPageOptions]="rowsPerPageOptions()"
                [templateLeft]="paginatorLeftTemplate()"
                [templateRight]="paginatorRightTemplate()"
                [appendTo]="paginatorDropdownAppendTo()"
                [dropdownScrollHeight]="paginatorDropdownScrollHeight()"
                [currentPageReportTemplate]="currentPageReportTemplate()"
                [showFirstLastIcon]="showFirstLastIcon()"
                [dropdownItemTemplate]="paginatorDropdownItemTemplate()"
                [showCurrentPageReport]="showCurrentPageReport()"
                [showJumpToPageDropdown]="showJumpToPageDropdown()"
                [showJumpToPageInput]="showJumpToPageInput()"
                [showPageLinks]="showPageLinks()"
                [class]="cn(cx('pcPaginator'), paginatorStyleClass())"
                [locale]="paginatorLocale()"
                [pt]="ptm('pcPaginator')"
                [unstyled]="unstyled()"
            >
                @if (paginatorDropdownIconTemplate()) {
                    <ng-template #dropdownicon>
                        <ng-container *ngTemplateOutlet="paginatorDropdownIconTemplate()"></ng-container>
                    </ng-template>
                }

                @if (paginatorFirstPageLinkIconTemplate()) {
                    <ng-template #firstpagelinkicon>
                        <ng-container *ngTemplateOutlet="paginatorFirstPageLinkIconTemplate()"></ng-container>
                    </ng-template>
                }

                @if (paginatorPreviousPageLinkIconTemplate()) {
                    <ng-template #previouspagelinkicon>
                        <ng-container *ngTemplateOutlet="paginatorPreviousPageLinkIconTemplate()"></ng-container>
                    </ng-template>
                }

                @if (paginatorLastPageLinkIconTemplate()) {
                    <ng-template #lastpagelinkicon>
                        <ng-container *ngTemplateOutlet="paginatorLastPageLinkIconTemplate()"></ng-container>
                    </ng-template>
                }

                @if (paginatorNextPageLinkIconTemplate()) {
                    <ng-template #nextpagelinkicon>
                        <ng-container *ngTemplateOutlet="paginatorNextPageLinkIconTemplate()"></ng-container>
                    </ng-template>
                }
            </p-paginator>
        }

        <div #wrapper [class]="cx('tableContainer')" [style]="sx('tableContainer')" [pBind]="ptm('tableContainer')" [attr.data-p]="dataP">
            @if (virtualScroll()) {
                <p-scroller
                    #scroller
                    [items]="processedData"
                    [columns]="columns"
                    [style]="scrollerStyle()"
                    [scrollHeight]="scrollerScrollHeight()"
                    [itemSize]="virtualScrollItemSize()"
                    [step]="rows()"
                    [delay]="scrollerDelay()"
                    [inline]="true"
                    [autoSize]="true"
                    [lazy]="lazy()"
                    (onLazyLoad)="onLazyItemLoad($event)"
                    [loaderDisabled]="true"
                    [showSpacer]="false"
                    [showLoader]="loadingBodyTemplate()"
                    [options]="virtualScrollOptions()"
                    [pt]="ptm('virtualScroller')"
                >
                    <ng-template #content let-items let-scrollerOptions="options">
                        <ng-container
                            *ngTemplateOutlet="
                                buildInTable;
                                context: {
                                    $implicit: items,
                                    options: scrollerOptions
                                }
                            "
                        ></ng-container>
                    </ng-template>
                </p-scroller>
            }
            @if (!virtualScroll()) {
                <ng-container
                    *ngTemplateOutlet="
                        buildInTable;
                        context: {
                            $implicit: processedData,
                            options: { columns }
                        }
                    "
                ></ng-container>
            }

            <ng-template #buildInTable let-items let-scrollerOptions="options">
                <table #table role="table" [class]="cn(cx('table'), tableStyleClass())" [pBind]="ptm('table')" [style]="tableStyle()" [attr.id]="id + '-table'">
                    <ng-container *ngTemplateOutlet="colGroupTemplate(); context: { $implicit: scrollerOptions.columns }"></ng-container>
                    <thead role="rowgroup" #thead [class]="cx('thead')" [style]="sx('thead')" [pBind]="ptm('thead')">
                        <ng-container
                            *ngTemplateOutlet="
                                headerGroupedTemplate() || headerTemplate();
                                context: {
                                    $implicit: scrollerOptions.columns
                                }
                            "
                        ></ng-container>
                    </thead>
                    @if (showFrozenBody()) {
                        <tbody
                            role="rowgroup"
                            [class]="cx('tbody')"
                            [pBind]="ptm('tbody')"
                            [value]="frozenValue()"
                            [frozenRows]="true"
                            [pTableBody]="scrollerOptions.columns"
                            [pTableBodyTemplate]="frozenBodyTemplate()"
                            [unstyled]="unstyled()"
                            [frozen]="true"
                            [attr.data-p-virtualscroll]="virtualScroll()"
                        ></tbody>
                    }
                    <tbody
                        role="rowgroup"
                        [class]="cn(cx('tbody'), scrollerOptions.contentStyleClass)"
                        [pBind]="ptm('tbody')"
                        [style]="scrollerOptions.contentStyle"
                        [value]="dataToRender(scrollerOptions.rows)"
                        [pTableBody]="scrollerOptions.columns"
                        [pTableBodyTemplate]="bodyTemplate()"
                        [scrollerOptions]="scrollerOptions"
                        [unstyled]="unstyled()"
                        [attr.data-p-virtualscroll]="virtualScroll()"
                    ></tbody>
                    @if (scrollerOptions.spacerStyle) {
                        <tbody role="rowgroup" [style]="getVirtualScrollerSpacerStyle(scrollerOptions)" [class]="cx('virtualScrollerSpacer')" [pBind]="ptm('virtualScrollerSpacer')"></tbody>
                    }
                    @if (showFooter()) {
                        <tfoot role="rowgroup" #tfoot [class]="cx('footer')" [style]="sx('tfoot')" [pBind]="ptm('tfoot')">
                            <ng-container
                                *ngTemplateOutlet="
                                    footerGroupedTemplate() || footerTemplate();
                                    context: {
                                        $implicit: scrollerOptions.columns
                                    }
                                "
                            ></ng-container>
                        </tfoot>
                    }
                </table>
            </ng-template>
        </div>

        @if (showBottomPaginator()) {
            <p-paginator
                [rows]="rows()"
                [first]="first()"
                [totalRecords]="totalRecords()"
                [pageLinkSize]="pageLinks()"
                [alwaysShow]="alwaysShowPaginator()"
                (onPageChange)="onPageChange($event)"
                [rowsPerPageOptions]="rowsPerPageOptions()"
                [templateLeft]="paginatorLeftTemplate()"
                [templateRight]="paginatorRightTemplate()"
                [appendTo]="paginatorDropdownAppendTo()"
                [dropdownScrollHeight]="paginatorDropdownScrollHeight()"
                [currentPageReportTemplate]="currentPageReportTemplate()"
                [showFirstLastIcon]="showFirstLastIcon()"
                [dropdownItemTemplate]="paginatorDropdownItemTemplate()"
                [showCurrentPageReport]="showCurrentPageReport()"
                [showJumpToPageDropdown]="showJumpToPageDropdown()"
                [showJumpToPageInput]="showJumpToPageInput()"
                [showPageLinks]="showPageLinks()"
                [class]="cn(cx('pcPaginator'), paginatorStyleClass())"
                [locale]="paginatorLocale()"
                [pt]="ptm('pcPaginator')"
                [unstyled]="unstyled()"
            >
                @if (paginatorDropdownIconTemplate()) {
                    <ng-template #dropdownicon>
                        <ng-container *ngTemplateOutlet="paginatorDropdownIconTemplate()"></ng-container>
                    </ng-template>
                }

                @if (paginatorFirstPageLinkIconTemplate()) {
                    <ng-template #firstpagelinkicon>
                        <ng-container *ngTemplateOutlet="paginatorFirstPageLinkIconTemplate()"></ng-container>
                    </ng-template>
                }

                @if (paginatorPreviousPageLinkIconTemplate()) {
                    <ng-template #previouspagelinkicon>
                        <ng-container *ngTemplateOutlet="paginatorPreviousPageLinkIconTemplate()"></ng-container>
                    </ng-template>
                }

                @if (paginatorLastPageLinkIconTemplate()) {
                    <ng-template #lastpagelinkicon>
                        <ng-container *ngTemplateOutlet="paginatorLastPageLinkIconTemplate()"></ng-container>
                    </ng-template>
                }

                @if (paginatorNextPageLinkIconTemplate()) {
                    <ng-template #nextpagelinkicon>
                        <ng-container *ngTemplateOutlet="paginatorNextPageLinkIconTemplate()"></ng-container>
                    </ng-template>
                }
            </p-paginator>
        }

        @if (summaryTemplate()) {
            <div [class]="cx('footer')" [pBind]="ptm('footer')">
                <ng-container *ngTemplateOutlet="summaryTemplate()"></ng-container>
            </div>
        }

        @if (resizableColumns()) {
            <div #resizeHelper [class]="cx('columnResizeIndicator')" [pBind]="ptm('columnResizeIndicator')" [style.display]="'none'"></div>
        }
        @if (reorderableColumns()) {
            <span #reorderIndicatorUp [class]="cx('rowReorderIndicatorUp')" [pBind]="ptm('rowReorderIndicatorUp')" [style.display]="'none'">
                @if (!reorderIndicatorUpIconTemplate()) {
                    <svg data-p-icon="arrow-down" [pBind]="ptm('rowReorderIndicatorUp')['icon']" />
                }
                <ng-template *ngTemplateOutlet="reorderIndicatorUpIconTemplate()"></ng-template>
            </span>
            <span #reorderIndicatorDown [class]="cx('rowReorderIndicatorDown')" [pBind]="ptm('rowReorderIndicatorDown')" [style.display]="'none'">
                @if (!reorderIndicatorDownIconTemplate()) {
                    <svg data-p-icon="arrow-up" [pBind]="ptm('rowReorderIndicatorDown')['icon']" />
                }
                <ng-template *ngTemplateOutlet="reorderIndicatorDownIconTemplate()"></ng-template>
            </span>
        }
    `,
    providers: [TableService, TableStyle, { provide: TABLE_INSTANCE, useExisting: Table }, { provide: PARENT_INSTANCE, useExisting: Table }],
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "cx('root')",
        '[attr.data-p]': 'dataP'
    },
    hostDirectives: [Bind]
})
export class Table<RowData = any> extends BaseComponent<TablePassThrough> implements BlockableUI {
    componentName = 'DataTable';
    /**
     * An array of objects to represent dynamic columns that are frozen.
     * @group Props
     */
    frozenColumns = input<any[]>();
    /**
     * An array of objects to display as frozen.
     * @group Props
     */
    frozenValue = input<any[]>();
    /**
     * Inline style of the table.
     * @group Props
     */
    tableStyle = input<CSSProperties>();
    /**
     * Style class of the table.
     * @group Props
     */
    tableStyleClass = input<string>();
    /**
     * When specified as true, enables the pagination.
     * @group Props
     */
    paginator = input(undefined, { transform: booleanAttribute });
    /**
     * Number of page links to display in paginator.
     * @group Props
     */
    pageLinks = input(5, { transform: numberAttribute });
    /**
     * Array of integer/object values to display inside rows per page dropdown of paginator
     * @group Props
     */
    rowsPerPageOptions = input<any[]>();
    /**
     * Whether to show it even there is only one page.
     * @group Props
     */
    alwaysShowPaginator = input(true, { transform: booleanAttribute });
    /**
     * Position of the paginator, options are "top", "bottom" or "both".
     * @group Props
     */
    paginatorPosition = input<TablePaginatorPosition>('bottom');
    /**
     * Custom style class for paginator
     * @group Props
     */
    paginatorStyleClass = input<string>();
    /**
     * Target element to attach the paginator dropdown overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    paginatorDropdownAppendTo = input<any>();
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
    showCurrentPageReport = input(undefined, { transform: booleanAttribute });
    /**
     * Whether to display a dropdown to navigate to any page.
     * @group Props
     */
    showJumpToPageDropdown = input(undefined, { transform: booleanAttribute });
    /**
     * Whether to display a input to navigate to any page.
     * @group Props
     */
    showJumpToPageInput = input(undefined, { transform: booleanAttribute });
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
     * Sort order to use when an unsorted column gets sorted by user interaction.
     * @group Props
     */
    defaultSortOrder = input(1, { transform: numberAttribute });
    /**
     * Defines whether sorting works on single column or on multiple columns.
     * @group Props
     */
    sortMode = input<TableSortMode>('single');
    /**
     * When true, resets paginator to first page after sorting. Available only when sortMode is set to single.
     * @group Props
     */
    resetPageOnSort = input(true, { transform: booleanAttribute });
    /**
     * Specifies the selection mode, valid values are "single" and "multiple".
     * @group Props
     */
    selectionMode = input<TableSelectionMode | undefined | null>();
    /**
     * When enabled with paginator and checkbox selection mode, the select all checkbox in the header will select all rows on the current page.
     * @group Props
     */
    selectionPageOnly = input(undefined, { transform: booleanAttribute });
    /**
     * Selected row with a context menu.
     * @group Props
     */
    contextMenuSelectionInput = input<any>(undefined, { alias: 'contextMenuSelection' });

    contextMenuSelection: any;
    /**
     * Callback to invoke on context menu selection change.
     * @param {*} object - row data.
     * @group Emits
     */
    contextMenuSelectionChange = output<any>();
    /**
     *  Defines the behavior of context menu selection, in "separate" mode context menu updates contextMenuSelection property whereas in joint mode selection property is used instead so that when row selection is enabled, both row selection and context menu selection use the same property.
     * @group Props
     */
    contextMenuSelectionMode = input('separate');
    /**
     * A property to uniquely identify a record in data.
     * @group Props
     */
    dataKey = input<string>();
    /**
     * Defines whether metaKey should be considered for the selection. On touch enabled devices, metaKeySelection is turned off automatically.
     * @group Props
     */
    metaKeySelection = input(false, { transform: booleanAttribute });
    /**
     * Defines if the row is selectable.
     * @group Props
     */
    rowSelectable = input<(row: { data: any; index: number }) => boolean>();
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity.
     * @group Props
     */
    rowTrackBy = input<Function>((index: number, item: any) => item);
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
     * Algorithm to define if a row is selected, valid values are "equals" that compares by reference and "deepEquals" that compares all fields.
     * @group Props
     */
    compareSelectionBy = input<'equals' | 'deepEquals'>('deepEquals');
    /**
     * Character to use as the csv separator.
     * @group Props
     */
    csvSeparator = input(',');
    /**
     * Name of the exported file.
     * @group Props
     */
    exportFilename = input('download');
    /**
     * An array of FilterMetadata objects to provide external filters.
     * @group Props
     */
    filtersInput = input<{ [s: string]: FilterMetadata | FilterMetadata[] }>({}, { alias: 'filters' });

    filters: { [s: string]: FilterMetadata | FilterMetadata[] } = {};
    /**
     * An array of fields as string to use in global filtering.
     * @group Props
     */
    globalFilterFields = input<string[]>();
    /**
     * Delay in milliseconds before filtering the data.
     * @group Props
     */
    filterDelay = input(300, { transform: numberAttribute });
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    filterLocale = input<string>();
    /**
     * Map instance to keep the expanded rows where key of the map is the data key of the row.
     * @group Props
     */
    expandedRowKeysInput = input<{ [s: string]: boolean }>({}, { alias: 'expandedRowKeys' });

    expandedRowKeys: { [s: string]: boolean } = {};
    /**
     * Map instance to keep the rows being edited where key of the map is the data key of the row.
     * @group Props
     */
    editingRowKeysInput = input<{ [s: string]: boolean }>({}, { alias: 'editingRowKeys' });

    editingRowKeys: { [s: string]: boolean } = {};
    /**
     * Whether multiple rows can be expanded at any time. Valid values are "multiple" and "single".
     * @group Props
     */
    rowExpandMode = input<TableRowExpandMode>('multiple');
    /**
     * Enables scrollable tables.
     * @group Props
     */
    scrollable = input(undefined, { transform: booleanAttribute });
    /**
     * Type of the row grouping, valid values are "subheader" and "rowspan".
     * @group Props
     */
    rowGroupMode = input<TableRowGroupMode>();
    /**
     * Height of the scroll viewport in fixed pixels or the "flex" keyword for a dynamic size.
     * @group Props
     */
    scrollHeight = input<string>();
    /**
     * Whether the data should be loaded on demand during scroll.
     * @group Props
     */
    virtualScroll = input(undefined, { transform: booleanAttribute });
    /**
     * Height of a row to use in calculations of virtual scrolling.
     * @group Props
     */
    virtualScrollItemSize = input(undefined, { transform: (v: unknown) => numberAttribute(v, undefined) });
    /**
     * Whether to use the scroller feature. The properties of scroller component can be used like an object in it.
     * @group Props
     */
    virtualScrollOptions = input<ScrollerOptions>();
    /**
     * Threshold in milliseconds to delay lazy loading during scrolling.
     * @group Props
     */
    virtualScrollDelay = input(250, { transform: numberAttribute });
    /**
     * Width of the frozen columns container.
     * @group Props
     */
    frozenWidth = input<string>();
    /**
     * Local ng-template varilable of a ContextMenu.
     * @group Props
     */
    contextMenu = input<any>();
    /**
     * When enabled, columns can be resized using drag and drop.
     * @group Props
     */
    resizableColumns = input(undefined, { transform: booleanAttribute });
    /**
     * Defines whether the overall table width should change on column resize, valid values are "fit" and "expand".
     * @group Props
     */
    columnResizeMode = input<TableColumnResizeMode>('fit');
    /**
     * When enabled, columns can be reordered using drag and drop.
     * @group Props
     */
    reorderableColumns = input(undefined, { transform: booleanAttribute });
    /**
     * Displays a loader to indicate data load is in progress.
     * @group Props
     */
    loading = input(undefined, { transform: booleanAttribute });
    /**
     * The icon to show while indicating data load is in progress.
     * @group Props
     */
    loadingIcon = input<string>();
    /**
     * Whether to show the loading mask when loading property is true.
     * @group Props
     */
    showLoader = input(true, { transform: booleanAttribute });
    /**
     * Adds hover effect to rows without the need for selectionMode. Note that tr elements that can be hovered need to have "p-selectable-row" class for rowHover to work.
     * @group Props
     */
    rowHover = input(undefined, { transform: booleanAttribute });
    /**
     * Whether to use the default sorting or a custom one using sortFunction.
     * @group Props
     */
    customSort = input(undefined, { transform: booleanAttribute });
    /**
     * Whether to use the initial sort badge or not.
     * @group Props
     */
    showInitialSortBadge = input(true, { transform: booleanAttribute });
    /**
     * Export function.
     * @group Props
     */
    exportFunction = input<Function>();
    /**
     * Custom export header of the column to be exported as CSV.
     * @group Props
     */
    exportHeader = input<string>();
    /**
     * Unique identifier of a stateful table to use in state storage.
     * @group Props
     */
    stateKey = input<string>();
    /**
     * Defines where a stateful table keeps its state, valid values are "session" for sessionStorage and "local" for localStorage.
     * @group Props
     */
    stateStorage = input<TableStateStorage>('session');
    /**
     * Defines the editing mode, valid values are "cell" and "row".
     * @group Props
     */
    editMode = input<TableEditMode>('cell');
    /**
     * Field name to use in row grouping.
     * @group Props
     */
    groupRowsBy = input<any>();
    /**
     * Defines the size of the table.
     * @group Props
     */
    size = input<TableSize>();
    /**
     * Whether to show grid lines between cells.
     * @group Props
     */
    showGridlines = input(undefined, { transform: booleanAttribute });
    /**
     * Whether to display rows with alternating colors.
     * @group Props
     */
    stripedRows = input(undefined, { transform: booleanAttribute });
    /**
     * Order to sort when default row grouping is enabled.
     * @group Props
     */
    groupRowsByOrder = input(1, { transform: numberAttribute });
    /**
     * Defines the responsive mode, valid options are "stack" and "scroll".
     * @deprecated since v20.0.0, always defaults to scroll, stack mode needs custom implementation
     * @group Props
     */
    responsiveLayout = input('scroll');
    /**
     * The breakpoint to define the maximum width boundary when using stack responsive layout.
     * @group Props
     */
    breakpoint = input('960px');
    /**
     * Locale to be used in paginator formatting.
     * @group Props
     */
    paginatorLocale = input<string>();
    /**
     * An array of objects to display.
     * @group Props
     */
    valueInput = input<RowData[]>(undefined, { alias: 'value' });
    /**
     * An array of objects to represent dynamic columns.
     * @group Props
     */
    columnsInput = input<any[]>(undefined, { alias: 'columns' });
    /**
     * Index of the first row to be displayed.
     * @group Props
     */
    first = model<number | null | undefined>(0);
    /**
     * Number of rows to display per page.
     * @group Props
     */
    rows = model<number | undefined>();
    /**
     * Number of total records, defaults to length of value when not defined.
     * @group Props
     */
    totalRecords = model(0);

    /**
     * Name of the field to sort data by default.
     * @group Props
     */
    sortFieldInput = input<string | null>(undefined, { alias: 'sortField' });
    /**
     * Order to sort when default sorting is enabled.
     * @group Props
     */
    sortOrderInput = input(1, { alias: 'sortOrder' });
    /**
     * An array of SortMeta objects to sort the data by default in multiple sort mode.
     * @group Props
     */
    multiSortMetaInput = input<SortMeta[] | null>(undefined, { alias: 'multiSortMeta' });
    /**
     * Selected row in single mode or an array of values in multiple mode.
     * @group Props
     */
    selection = model<any>();
    /**
     * Whether all data is selected.
     * @group Props
     */
    selectAllInput = input<boolean | null>(null, { alias: 'selectAll' });
    /**
     * Emits when the all of the items selected or unselected.
     * @param {TableSelectAllChangeEvent} event - custom  all selection change event.
     * @group Emits
     */
    selectAllChange = output<TableSelectAllChangeEvent>();
    /**
     * Callback to invoke when a row is selected.
     * @param {TableRowSelectEvent} event - custom select event.
     * @group Emits
     */
    onRowSelect = output<TableRowSelectEvent<RowData>>();
    /**
     * Callback to invoke when a row is unselected.
     * @param {TableRowUnSelectEvent} event - custom unselect event.
     * @group Emits
     */
    onRowUnselect = output<TableRowUnSelectEvent<RowData>>();
    /**
     * Callback to invoke when pagination occurs.
     * @param {TablePageEvent} event - custom pagination event.
     * @group Emits
     */
    onPage = output<TablePageEvent>();
    /**
     * Callback to invoke when a column gets sorted.
     * @param {Object} object - sort meta.
     * @group Emits
     */
    onSort = output<{ multisortmeta: SortMeta[] } | any>();
    /**
     * Callback to invoke when data is filtered.
     * @param {TableFilterEvent} event - custom filtering event.
     * @group Emits
     */
    onFilter = output<TableFilterEvent>();
    /**
     * Callback to invoke when paging, sorting or filtering happens in lazy mode.
     * @param {TableLazyLoadEvent} event - custom lazy loading event.
     * @group Emits
     */
    onLazyLoad = output<TableLazyLoadEvent>();
    /**
     * Callback to invoke when a row is expanded.
     * @param {TableRowExpandEvent} event - custom row expand event.
     * @group Emits
     */
    onRowExpand = output<TableRowExpandEvent<RowData>>();
    /**
     * Callback to invoke when a row is collapsed.
     * @param {TableRowCollapseEvent} event - custom row collapse event.
     * @group Emits
     */
    onRowCollapse = output<TableRowCollapseEvent>();
    /**
     * Callback to invoke when a row is selected with right click.
     * @param {TableContextMenuSelectEvent} event - custom context menu select event.
     * @group Emits
     */
    onContextMenuSelect = output<TableContextMenuSelectEvent<RowData>>();
    /**
     * Callback to invoke when a column is resized.
     * @param {TableColResizeEvent} event - custom column resize event.
     * @group Emits
     */
    onColResize = output<TableColResizeEvent>();
    /**
     * Callback to invoke when a column is reordered.
     * @param {TableColumnReorderEvent} event - custom column reorder event.
     * @group Emits
     */
    onColReorder = output<TableColumnReorderEvent>();
    /**
     * Callback to invoke when a row is reordered.
     * @param {TableRowReorderEvent} event - custom row reorder event.
     * @group Emits
     */
    onRowReorder = output<TableRowReorderEvent>();
    /**
     * Callback to invoke when a cell switches to edit mode.
     * @param {TableEditInitEvent} event - custom edit init event.
     * @group Emits
     */
    onEditInit = output<TableEditInitEvent>();
    /**
     * Callback to invoke when cell edit is completed.
     * @param {TableEditCompleteEvent} event - custom edit complete event.
     * @group Emits
     */
    onEditComplete = output<TableEditCompleteEvent>();
    /**
     * Callback to invoke when cell edit is cancelled with escape key.
     * @param {TableEditCancelEvent} event - custom edit cancel event.
     * @group Emits
     */
    onEditCancel = output<TableEditCancelEvent>();
    /**
     * Callback to invoke when state of header checkbox changes.
     * @param {TableHeaderCheckboxToggleEvent} event - custom header checkbox event.
     * @group Emits
     */
    onHeaderCheckboxToggle = output<TableHeaderCheckboxToggleEvent>();
    /**
     * A function to implement custom sorting, refer to sorting section for details.
     * @param {any} any - sort meta.
     * @group Emits
     */
    sortFunction = output<any>();
    /**
     * Callback to invoke table state is saved.
     * @param {TableState} object - table state.
     * @group Emits
     */
    onStateSave = output<TableState>();
    /**
     * Callback to invoke table state is restored.
     * @param {TableState} object - table state.
     * @group Emits
     */
    onStateRestore = output<TableState>();

    resizeHelperViewChild = viewChild<ElementRef>('resizeHelper');

    reorderIndicatorUpViewChild = viewChild<ElementRef>('reorderIndicatorUp');

    reorderIndicatorDownViewChild = viewChild<ElementRef>('reorderIndicatorDown');

    wrapperViewChild = viewChild<ElementRef>('wrapper');

    tableViewChild = viewChild<ElementRef>('table');

    tableHeaderViewChild = viewChild<ElementRef>('thead');

    tableFooterViewChild = viewChild<ElementRef>('tfoot');

    scroller = viewChild<Scroller>('scroller');

    value: RowData[] = [];

    columns: any[] | undefined;

    filteredValue: any[] | undefined | null;

    headerTemplate = contentChild<TemplateRef<any>>('header', { descendants: false });

    headerGroupedTemplate = contentChild<TemplateRef<any>>('headergrouped', { descendants: false });

    bodyTemplate = contentChild<TemplateRef<any>>('body', { descendants: false });

    loadingBodyTemplate = contentChild<TemplateRef<any>>('loadingbody', { descendants: false });

    captionTemplate = contentChild<TemplateRef<any>>('caption', { descendants: false });

    footerTemplate = contentChild<TemplateRef<any>>('footer', { descendants: false });

    footerGroupedTemplate = contentChild<TemplateRef<any>>('footergrouped', { descendants: false });

    summaryTemplate = contentChild<TemplateRef<any>>('summary', { descendants: false });

    colGroupTemplate = contentChild<TemplateRef<any>>('colgroup', { descendants: false });

    expandedRowTemplate = contentChild<TemplateRef<any>>('expandedrow', { descendants: false });

    groupHeaderTemplate = contentChild<TemplateRef<any>>('groupheader', { descendants: false });

    groupFooterTemplate = contentChild<TemplateRef<any>>('groupfooter', { descendants: false });

    frozenExpandedRowTemplate = contentChild<TemplateRef<any>>('frozenexpandedrow', { descendants: false });

    frozenHeaderTemplate = contentChild<TemplateRef<any>>('frozenheader', { descendants: false });

    frozenBodyTemplate = contentChild<TemplateRef<any>>('frozenbody', { descendants: false });

    frozenFooterTemplate = contentChild<TemplateRef<any>>('frozenfooter', { descendants: false });

    frozenColGroupTemplate = contentChild<TemplateRef<any>>('frozencolgroup', { descendants: false });

    emptyMessageTemplate = contentChild<TemplateRef<any>>('emptymessage', { descendants: false });

    paginatorLeftTemplate = contentChild<TemplateRef<any>>('paginatorleft', { descendants: false });

    paginatorRightTemplate = contentChild<TemplateRef<any>>('paginatorright', { descendants: false });

    paginatorDropdownItemTemplate = contentChild<TemplateRef<any>>('paginatordropdownitem', { descendants: false });

    loadingIconTemplate = contentChild<TemplateRef<any>>('loadingicon', { descendants: false });

    reorderIndicatorUpIconTemplate = contentChild<TemplateRef<any>>('reorderindicatorupicon', { descendants: false });

    reorderIndicatorDownIconTemplate = contentChild<TemplateRef<any>>('reorderindicatordownicon', { descendants: false });

    sortIconTemplate = contentChild<TemplateRef<any>>('sorticon', { descendants: false });

    checkboxIconTemplate = contentChild<TemplateRef<any>>('checkboxicon', { descendants: false });

    headerCheckboxIconTemplate = contentChild<TemplateRef<any>>('headercheckboxicon', { descendants: false });

    paginatorDropdownIconTemplate = contentChild<TemplateRef<any>>('paginatordropdownicon', { descendants: false });

    paginatorFirstPageLinkIconTemplate = contentChild<TemplateRef<any>>('paginatorfirstpagelinkicon', { descendants: false });

    paginatorLastPageLinkIconTemplate = contentChild<TemplateRef<any>>('paginatorlastpagelinkicon', { descendants: false });

    paginatorPreviousPageLinkIconTemplate = contentChild<TemplateRef<any>>('paginatorpreviouspagelinkicon', { descendants: false });

    paginatorNextPageLinkIconTemplate = contentChild<TemplateRef<any>>('paginatornextpagelinkicon', { descendants: false });

    showLoadingMask = computed(() => this.loading() && this.showLoader());

    showTopPaginator = computed(() => this.paginator() && (this.paginatorPosition() === 'top' || this.paginatorPosition() === 'both'));

    showBottomPaginator = computed(() => this.paginator() && (this.paginatorPosition() === 'bottom' || this.paginatorPosition() === 'both'));

    showFrozenBody = computed(() => !!(this.frozenValue() || this.frozenBodyTemplate()));

    showFooter = computed(() => !!(this.footerGroupedTemplate() || this.footerTemplate()));

    scrollerStyle = computed(() => ({
        height: this.scrollHeight() !== 'flex' ? this.scrollHeight() : undefined
    }));

    scrollerScrollHeight = computed(() => (this.scrollHeight() !== 'flex' ? undefined : '100%'));

    scrollerDelay = computed(() => (this.lazy() ? this.virtualScrollDelay() : 0));

    selectionKeys: any = {};

    lastResizerHelperX: number | undefined;

    reorderIconWidth: number | undefined;

    reorderIconHeight: number | undefined;

    draggedColumn: any;

    draggedRowIndex: number | undefined | null;

    droppedRowIndex: number | undefined | null;

    rowDragging: boolean | undefined | null;

    dropPosition: number | undefined | null;

    editingCell: Element | undefined | null;

    editingCellData: any;

    editingCellField: any;

    editingCellRowIndex: number | undefined | null;

    selfClick: boolean | undefined | null;

    documentEditListener: any;

    multiSortMeta: SortMeta[] | undefined | null;

    sortField: string | undefined | null;

    sortOrder: number = 1;

    preventSelectionSetterPropagation: boolean | undefined;

    _selectAll: boolean | null = null;

    anchorRowIndex: number | undefined | null;

    rangeRowIndex: number | undefined;

    filterTimeout: any;

    initialized: boolean | undefined | null;

    rowTouched: boolean | undefined;

    restoringSort: boolean | undefined;

    restoringFilter: boolean | undefined;

    stateRestored: boolean | undefined;

    columnOrderStateRestored: boolean | undefined;

    columnWidthsState: string | undefined;

    tableWidthState: string | undefined;

    overlaySubscription: Subscription | undefined;

    resizeColumnElement: HTMLElement;

    columnResizing: boolean = false;

    rowGroupHeaderStyleObject: any = {};

    id: string = UniqueComponentId();

    styleElement: any;

    responsiveStyleElement: any;

    overlayService = inject(OverlayService);

    filterService = inject(FilterService);

    tableService = inject(TableService);

    _componentStyle = inject(TableStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    constructor() {
        super();

        // Sync value + side effects
        effect(() => {
            const val = this.valueInput();
            untracked(() => {
                if (val !== undefined) {
                    if (this.isStateful() && !this.stateRestored && isPlatformBrowser(this.platformId)) {
                        this.restoreState();
                    }
                    this.value = val;
                    if (!this.lazy()) {
                        this.totalRecords.set(this.totalRecords() === 0 && this.value ? this.value.length : (this.totalRecords() ?? 0));
                        if (this.sortMode() == 'single' && (this.sortField || this.groupRowsBy())) this.sortSingle();
                        else if (this.sortMode() == 'multiple' && (this.multiSortMeta || this.groupRowsBy())) this.sortMultiple();
                        else if (this.hasFilter()) this._filter();
                    }
                    this.tableService.onValueChange(val);
                }
            });
        });

        // Sync columns + side effects
        effect(() => {
            const cols = this.columnsInput();
            untracked(() => {
                if (cols !== undefined) {
                    if (!this.isStateful()) {
                        this.columns = cols;
                        this.tableService.onColumnsChange(cols);
                    }
                    if (this.columns && this.isStateful() && this.reorderableColumns() && !this.columnOrderStateRestored) {
                        this.restoreColumnOrder();
                        this.tableService.onColumnsChange(this.columns);
                    }
                }
            });
        });

        // Sync sortField + side effects
        effect(() => {
            const val = this.sortFieldInput();
            untracked(() => {
                if (val !== undefined) {
                    this.sortField = val;
                    if (!this.lazy() || this.initialized) {
                        if (this.sortMode() === 'single') {
                            this.sortSingle();
                        }
                    }
                }
            });
        });

        // groupRowsBy change effect
        effect(() => {
            this.groupRowsBy();
            untracked(() => {
                if (!this.lazy() || this.initialized) {
                    if (this.sortMode() === 'single') {
                        this.sortSingle();
                    }
                }
            });
        });

        // Sync sortOrder + side effects
        effect(() => {
            const val = this.sortOrderInput();
            untracked(() => {
                this.sortOrder = val;
                if (!this.lazy() || this.initialized) {
                    if (this.sortMode() === 'single') {
                        this.sortSingle();
                    }
                }
            });
        });

        // groupRowsByOrder change effect
        effect(() => {
            this.groupRowsByOrder();
            untracked(() => {
                if (!this.lazy() || this.initialized) {
                    if (this.sortMode() === 'single') {
                        this.sortSingle();
                    }
                }
            });
        });

        // Sync multiSortMeta + side effects
        effect(() => {
            const val = this.multiSortMetaInput();
            untracked(() => {
                if (val !== undefined) {
                    this.multiSortMeta = val;
                    if (this.sortMode() === 'multiple' && (this.initialized || (!this.lazy() && !this.virtualScroll()))) {
                        this.sortMultiple();
                    }
                }
            });
        });

        // Selection side effects
        effect(() => {
            const val = this.selection();
            untracked(() => {
                if (val !== undefined) {
                    if (!this.preventSelectionSetterPropagation) {
                        this.updateSelectionKeys();
                        this.tableService.onSelectionChange();
                    }
                    this.preventSelectionSetterPropagation = false;
                }
            });
        });

        // Sync selectAll + side effects
        effect(() => {
            const val = this.selectAllInput();
            untracked(() => {
                if (val !== null) {
                    this._selectAll = val;
                    if (!this.preventSelectionSetterPropagation) {
                        this.updateSelectionKeys();
                        this.tableService.onSelectionChange();
                        if (this.isStateful()) {
                            this.saveState();
                        }
                    }
                    this.preventSelectionSetterPropagation = false;
                }
            });
        });

        // Sync contextMenuSelection
        effect(() => {
            const val = this.contextMenuSelectionInput();
            if (val !== undefined) {
                this.contextMenuSelection = val;
            }
        });

        // Sync filters
        effect(() => {
            const val = this.filtersInput();
            this.filters = val ?? {};
        });

        // Sync expandedRowKeys
        effect(() => {
            const val = this.expandedRowKeysInput();
            this.expandedRowKeys = val ?? {};
        });

        // Sync editingRowKeys
        effect(() => {
            const val = this.editingRowKeysInput();
            this.editingRowKeys = val ?? {};
        });
    }

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    onInit() {
        if (this.lazy() && this.lazyLoadOnInit()) {
            if (!this.virtualScroll()) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }

            if (this.restoringFilter) {
                this.restoringFilter = false;
            }
        }

        if (this.responsiveLayout() === 'stack') {
            this.createResponsiveStyle();
        }

        this.initialized = true;
    }

    onAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.isStateful() && this.resizableColumns()) {
                this.restoreColumnWidths();
            }
        }
    }

    get processedData() {
        return this.filteredValue || this.value || [];
    }

    private _initialColWidths: number[];

    dataToRender(data: any) {
        const _data = data || this.processedData;

        if (_data && this.paginator()) {
            const first = this.lazy() ? 0 : this.first();
            return _data.slice(first, <number>first + <number>this.rows());
        }

        return _data;
    }

    updateSelectionKeys() {
        if (this.dataKey() && this.selection()) {
            this.selectionKeys = {};
            if (Array.isArray(this.selection())) {
                for (let data of this.selection()) {
                    this.selectionKeys[String(ObjectUtils.resolveFieldData(data, this.dataKey()))] = 1;
                }
            } else {
                this.selectionKeys[String(ObjectUtils.resolveFieldData(this.selection(), this.dataKey()))] = 1;
            }
        }
    }

    onPageChange(event: TablePageEvent) {
        this.first.set(event.first);
        this.rows.set(event.rows);

        this.onPage.emit({
            first: <number>this.first(),
            rows: <number>this.rows()
        });

        if (this.lazy()) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }

        this.tableService.onValueChange(this.value);

        if (this.isStateful()) {
            this.saveState();
        }

        this.anchorRowIndex = null;

        if (this.scrollable()) {
            this.resetScrollTop();
        }
    }

    sort(event: any) {
        let originalEvent = event.originalEvent;

        if (this.sortMode() === 'single') {
            this.sortOrder = this.sortField === event.field ? this.sortOrder * -1 : this.defaultSortOrder();
            this.sortField = event.field;

            if (this.resetPageOnSort()) {
                this.first.set(0);

                if (this.scrollable()) {
                    this.resetScrollTop();
                }
            }

            this.sortSingle();
        }
        if (this.sortMode() === 'multiple') {
            let metaKey = (<KeyboardEvent>originalEvent).metaKey || (<KeyboardEvent>originalEvent).ctrlKey;
            let sortMeta = this.getSortMeta(<string>event.field);

            if (sortMeta) {
                if (!metaKey) {
                    this.multiSortMeta = [
                        {
                            field: <string>event.field,
                            order: sortMeta.order * -1
                        }
                    ];

                    if (this.resetPageOnSort()) {
                        this.first.set(0);

                        if (this.scrollable()) {
                            this.resetScrollTop();
                        }
                    }
                } else {
                    sortMeta.order = sortMeta.order * -1;
                }
            } else {
                if (!metaKey || !this.multiSortMeta) {
                    this.multiSortMeta = [];

                    if (this.resetPageOnSort()) {
                        this.first.set(0);
                    }
                }
                (<SortMeta[]>this.multiSortMeta).push({
                    field: <string>event.field,
                    order: this.defaultSortOrder()
                });
            }

            this.sortMultiple();
        }

        if (this.isStateful()) {
            this.saveState();
        }

        this.anchorRowIndex = null;
    }

    sortSingle() {
        let field = this.sortField || this.groupRowsBy();
        let order = this.sortField ? this.sortOrder : this.groupRowsByOrder();
        if (this.groupRowsBy() && this.sortField && this.groupRowsBy() !== this.sortField) {
            this.multiSortMeta = [this.getGroupRowsMeta(), { field: this.sortField, order: this.sortOrder }];
            this.sortMultiple();
            return;
        }

        if (field && order) {
            if (this.restoringSort) {
                this.restoringSort = false;
            }

            if (this.lazy()) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            } else if (this.value) {
                if (this.customSort()) {
                    this.sortFunction.emit({
                        data: this.value,
                        mode: this.sortMode(),
                        field: field,
                        order: order
                    });
                } else {
                    this.value.sort((data1, data2) => {
                        let value1 = ObjectUtils.resolveFieldData(data1, field);
                        let value2 = ObjectUtils.resolveFieldData(data2, field);
                        let result: any = null;

                        if (value1 == null && value2 != null) result = -1;
                        else if (value1 != null && value2 == null) result = 1;
                        else if (value1 == null && value2 == null) result = 0;
                        else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
                        else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

                        return order * (result || 0);
                    });

                    this.value = [...this.value];
                }

                if (this.hasFilter()) {
                    this._filter();
                }
            }

            let sortMeta: SortMeta = {
                field: field,
                order: order
            };

            this.onSort.emit(sortMeta);
            this.tableService.onSort(sortMeta);
        }
    }

    sortMultiple() {
        if (this.groupRowsBy()) {
            if (!this.multiSortMeta) this.multiSortMeta = [this.getGroupRowsMeta()];
            else if ((<SortMeta[]>this.multiSortMeta)[0].field !== this.groupRowsBy()) this.multiSortMeta = [this.getGroupRowsMeta(), ...this.multiSortMeta];
        }

        if (this.multiSortMeta) {
            if (this.lazy()) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            } else if (this.value) {
                if (this.customSort()) {
                    this.sortFunction.emit({
                        data: this.value,
                        mode: this.sortMode(),
                        multiSortMeta: this.multiSortMeta
                    });
                } else {
                    this.value.sort((data1, data2) => {
                        return this.multisortField(data1, data2, <SortMeta[]>this.multiSortMeta, 0);
                    });

                    this.value = [...this.value];
                }

                if (this.hasFilter()) {
                    this._filter();
                }
            }

            this.onSort.emit({
                multisortmeta: <SortMeta[]>this.multiSortMeta
            });
            this.tableService.onSort(this.multiSortMeta);
        }
    }

    multisortField(data1: any, data2: any, multiSortMeta: SortMeta[], index: number): any {
        const value1 = ObjectUtils.resolveFieldData(data1, multiSortMeta[index].field);
        const value2 = ObjectUtils.resolveFieldData(data2, multiSortMeta[index].field);
        if (ObjectUtils.compare(value1, value2, this.filterLocale()) === 0) {
            return multiSortMeta.length - 1 > index ? this.multisortField(data1, data2, multiSortMeta, index + 1) : 0;
        }
        return this.compareValuesOnSort(value1, value2, multiSortMeta[index].order);
    }

    compareValuesOnSort(value1: any, value2: any, order: any) {
        return ObjectUtils.sort(value1, value2, order, this.filterLocale(), this.sortOrder);
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
        if (this.sortMode() === 'single') {
            return this.sortField && this.sortField === field;
        } else if (this.sortMode() === 'multiple') {
            let sorted = false;
            if (this.multiSortMeta) {
                for (let i = 0; i < this.multiSortMeta.length; i++) {
                    if (this.multiSortMeta[i].field == field) {
                        sorted = true;
                        break;
                    }
                }
            }
            return sorted;
        }
    }

    handleRowClick(event: any) {
        let target = <HTMLElement>event.originalEvent.target;
        let targetNode = target.nodeName;
        let parentNode = target.parentElement && target.parentElement.nodeName;
        if (targetNode == 'INPUT' || targetNode == 'BUTTON' || targetNode == 'A' || parentNode == 'INPUT' || parentNode == 'BUTTON' || parentNode == 'A' || isClickable(event.originalEvent.target)) {
            return;
        }

        if (this.selectionMode()) {
            let rowData = event.rowData;
            let rowIndex = event.rowIndex;

            this.preventSelectionSetterPropagation = true;
            if (this.isMultipleSelectionMode() && event.originalEvent.shiftKey && this.anchorRowIndex != null) {
                DomHandler.clearSelection();
                if (this.rangeRowIndex != null) {
                    this.clearSelectionRange(event.originalEvent);
                }

                this.rangeRowIndex = rowIndex;
                this.selectRange(event.originalEvent, rowIndex);
            } else {
                let selected = this.isSelected(rowData);

                if (!selected && !this.isRowSelectable(rowData, rowIndex)) {
                    return;
                }

                let metaSelection = this.rowTouched ? false : this.metaKeySelection();
                let dataKeyValue = this.dataKey() ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey())) : null;
                this.anchorRowIndex = rowIndex;
                this.rangeRowIndex = rowIndex;

                if (metaSelection) {
                    let metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;

                    if (selected && metaKey) {
                        if (this.isSingleSelectionMode()) {
                            this.selection.set(null);
                            this.selectionKeys = {};
                        } else {
                            let selectionIndex = this.findIndexInSelection(rowData);
                            this.selection.set(this.selection().filter((val: any, i: number) => i != selectionIndex));
                            if (dataKeyValue) {
                                delete this.selectionKeys[dataKeyValue];
                            }
                        }

                        this.onRowUnselect.emit({
                            originalEvent: event.originalEvent,
                            data: rowData,
                            type: 'row'
                        });
                    } else {
                        if (this.isSingleSelectionMode()) {
                            this.selection.set(rowData);
                            if (dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        } else if (this.isMultipleSelectionMode()) {
                            if (metaKey) {
                                this.selection.set(this.selection() || []);
                            } else {
                                this.selection.set([]);
                                this.selectionKeys = {};
                            }

                            this.selection.set([...this.selection(), rowData]);
                            if (dataKeyValue) {
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }

                        this.onRowSelect.emit({
                            originalEvent: event.originalEvent,
                            data: rowData,
                            type: 'row',
                            index: rowIndex
                        });
                    }
                } else {
                    if (this.selectionMode() === 'single') {
                        if (selected) {
                            this.selection.set(null);
                            this.selectionKeys = {};
                            this.onRowUnselect.emit({
                                originalEvent: event.originalEvent,
                                data: rowData,
                                type: 'row',
                                index: rowIndex
                            });
                        } else {
                            this.selection.set(rowData);
                            this.onRowSelect.emit({
                                originalEvent: event.originalEvent,
                                data: rowData,
                                type: 'row',
                                index: rowIndex
                            });
                            if (dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                    } else if (this.selectionMode() === 'multiple') {
                        if (selected) {
                            let selectionIndex = this.findIndexInSelection(rowData);
                            this.selection.set(this.selection().filter((val: any, i: number) => i != selectionIndex));
                            this.onRowUnselect.emit({
                                originalEvent: event.originalEvent,
                                data: rowData,
                                type: 'row',
                                index: rowIndex
                            });
                            if (dataKeyValue) {
                                delete this.selectionKeys[dataKeyValue];
                            }
                        } else {
                            this.selection.set(this.selection() ? [...this.selection(), rowData] : [rowData]);
                            this.onRowSelect.emit({
                                originalEvent: event.originalEvent,
                                data: rowData,
                                type: 'row',
                                index: rowIndex
                            });
                            if (dataKeyValue) {
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                    }
                }
            }

            this.tableService.onSelectionChange();

            if (this.isStateful()) {
                this.saveState();
            }
        }

        this.rowTouched = false;
    }

    handleRowTouchEnd(event: Event) {
        this.rowTouched = true;
    }

    handleRowRightClick(event: any) {
        if (this.contextMenu()) {
            const rowData = event.rowData;
            const rowIndex = event.rowIndex;

            const showContextMenu = () => {
                this.contextMenu()!.show(event.originalEvent);
                this.contextMenu()!.hideCallback = () => {
                    this.contextMenuSelection = null;
                    this.contextMenuSelectionChange.emit(null);
                    this.tableService.onContextMenu(null);
                };
            };

            if (this.contextMenuSelectionMode() === 'separate') {
                this.contextMenuSelection = rowData;
                this.contextMenuSelectionChange.emit(rowData);
                this.tableService.onContextMenu(rowData);
                showContextMenu();
                this.onContextMenuSelect.emit({
                    originalEvent: event.originalEvent,
                    data: rowData,
                    index: event.rowIndex
                });
            } else if (this.contextMenuSelectionMode() === 'joint') {
                this.preventSelectionSetterPropagation = true;
                let selected = this.isSelected(rowData);
                let dataKeyValue = this.dataKey() ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey())) : null;

                if (!selected) {
                    if (!this.isRowSelectable(rowData, rowIndex)) {
                        return;
                    }

                    if (this.isSingleSelectionMode()) {
                        this.selection.set(rowData);

                        if (dataKeyValue) {
                            this.selectionKeys = {};
                            this.selectionKeys[dataKeyValue] = 1;
                        }
                    } else if (this.isMultipleSelectionMode()) {
                        this.selection.set(this.selection() ? [...this.selection(), rowData] : [rowData]);

                        if (dataKeyValue) {
                            this.selectionKeys[dataKeyValue] = 1;
                        }
                    }
                }

                // Also update contextMenuSelection in joint mode
                this.contextMenuSelection = rowData;
                this.contextMenuSelectionChange.emit(rowData);
                this.tableService.onContextMenu(rowData);

                this.tableService.onSelectionChange();
                showContextMenu();
                this.onContextMenuSelect.emit({
                    originalEvent: event,
                    data: rowData,
                    index: event.rowIndex
                });
            }
        }
    }

    selectRange(event: MouseEvent | KeyboardEvent, rowIndex: number, isMetaKeySelection?: boolean | undefined) {
        let rangeStart, rangeEnd;

        if (<number>this.anchorRowIndex > rowIndex) {
            rangeStart = rowIndex;
            rangeEnd = this.anchorRowIndex;
        } else if (<number>this.anchorRowIndex < rowIndex) {
            rangeStart = this.anchorRowIndex;
            rangeEnd = rowIndex;
        } else {
            rangeStart = rowIndex;
            rangeEnd = rowIndex;
        }

        if (this.lazy() && this.paginator()) {
            (rangeStart as number) -= <number>this.first();
            (rangeEnd as number) -= <number>this.first();
        }

        let rangeRowsData: RowData[] = [];
        for (let i = <number>rangeStart; i <= <number>rangeEnd; i++) {
            let rangeRowData = this.filteredValue ? this.filteredValue[i] : this.value[i];
            if (!this.isSelected(rangeRowData) && !isMetaKeySelection) {
                if (!this.isRowSelectable(rangeRowData, rowIndex)) {
                    continue;
                }

                rangeRowsData.push(rangeRowData);
                let dataKeyValue = this.dataKey() ? String(ObjectUtils.resolveFieldData(rangeRowData, this.dataKey())) : null;
                if (dataKeyValue) {
                    this.selectionKeys[dataKeyValue] = 1;
                }
            }
        }
        if (rangeRowsData.length > 0) {
            this.selection.set([...this.selection(), ...rangeRowsData]);
        }
        this.onRowSelect.emit({
            originalEvent: event,
            data: rangeRowsData,
            type: 'row'
        });
    }

    clearSelectionRange(event: MouseEvent | KeyboardEvent) {
        let rangeStart, rangeEnd;
        let rangeRowIndex = <number>this.rangeRowIndex;
        let anchorRowIndex = <number>this.anchorRowIndex;

        if (rangeRowIndex > anchorRowIndex) {
            rangeStart = this.anchorRowIndex;
            rangeEnd = this.rangeRowIndex;
        } else if (rangeRowIndex < anchorRowIndex) {
            rangeStart = this.rangeRowIndex;
            rangeEnd = this.anchorRowIndex;
        } else {
            rangeStart = this.rangeRowIndex;
            rangeEnd = this.rangeRowIndex;
        }

        const indicesToRemove = new Set<number>();
        for (let i = <number>rangeStart; i <= <number>rangeEnd; i++) {
            let rangeRowData = this.value[i];
            let selectionIndex = this.findIndexInSelection(rangeRowData);
            if (selectionIndex !== -1) {
                indicesToRemove.add(selectionIndex);
            }
            let dataKeyValue = this.dataKey() ? String(ObjectUtils.resolveFieldData(rangeRowData, this.dataKey())) : null;
            if (dataKeyValue) {
                delete this.selectionKeys[dataKeyValue];
            }
            this.onRowUnselect.emit({
                originalEvent: event,
                data: rangeRowData,
                type: 'row'
            });
        }
        this.selection.set(this.selection().filter((_: any, i: number) => !indicesToRemove.has(i)));
    }

    isSelected(rowData: any) {
        if (rowData && this.selection()) {
            if (this.dataKey()) {
                return this.selectionKeys[ObjectUtils.resolveFieldData(rowData, this.dataKey())] !== undefined;
            } else {
                if (Array.isArray(this.selection())) return this.findIndexInSelection(rowData) > -1;
                else return this.equals(rowData, this.selection());
            }
        }

        return false;
    }

    findIndexInSelection(rowData: any) {
        let index: number = -1;
        const sel = this.selection();
        if (sel && sel.length) {
            for (let i = 0; i < sel.length; i++) {
                if (this.equals(rowData, sel[i])) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }

    isRowSelectable(data: any, index: number) {
        if (this.rowSelectable() && !this.rowSelectable()!({ data, index })) {
            return false;
        }

        return true;
    }

    toggleRowWithRadio(event: any, rowData: any) {
        this.preventSelectionSetterPropagation = true;

        if (this.selection() != rowData) {
            if (!this.isRowSelectable(rowData, event.rowIndex)) {
                return;
            }

            this.selection.set(rowData);
            this.onRowSelect.emit({
                originalEvent: event.originalEvent,
                index: event.rowIndex,
                data: rowData,
                type: 'radiobutton'
            });

            if (this.dataKey()) {
                this.selectionKeys = {};
                this.selectionKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey()))] = 1;
            }
        } else {
            this.selection.set(null);
            this.onRowUnselect.emit({
                originalEvent: event.originalEvent,
                index: event.rowIndex,
                data: rowData,
                type: 'radiobutton'
            });
        }

        this.tableService.onSelectionChange();

        if (this.isStateful()) {
            this.saveState();
        }
    }

    toggleRowWithCheckbox(event: { originalEvent: Event; rowIndex: number }, rowData: any) {
        if (!this.selection()) this.selection.set([]);
        let selected = this.isSelected(rowData);
        let dataKeyValue = this.dataKey() ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey())) : null;
        this.preventSelectionSetterPropagation = true;

        if (selected) {
            let selectionIndex = this.findIndexInSelection(rowData);
            this.selection.set(this.selection().filter((val: any, i: number) => i != selectionIndex));
            this.onRowUnselect.emit({
                originalEvent: event.originalEvent,
                index: event.rowIndex,
                data: rowData,
                type: 'checkbox'
            });
            if (dataKeyValue) {
                delete this.selectionKeys[dataKeyValue];
            }
        } else {
            if (!this.isRowSelectable(rowData, event.rowIndex)) {
                return;
            }

            this.selection.set(this.selection() ? [...this.selection(), rowData] : [rowData]);
            this.onRowSelect.emit({
                originalEvent: event.originalEvent,
                index: event.rowIndex,
                data: rowData,
                type: 'checkbox'
            });
            if (dataKeyValue) {
                this.selectionKeys[dataKeyValue] = 1;
            }
        }

        this.tableService.onSelectionChange();

        if (this.isStateful()) {
            this.saveState();
        }
    }

    toggleRowsWithCheckbox({ originalEvent }: CheckboxChangeEvent, check: boolean) {
        if (this._selectAll !== null) {
            this.selectAllChange.emit({ originalEvent: originalEvent!, checked: check });
        } else {
            const data = this.selectionPageOnly() ? this.dataToRender(this.processedData) : this.processedData;
            let selection = this.selectionPageOnly() && this.selection() ? this.selection().filter((s: any) => !data.some((d: any) => this.equals(s, d))) : [];

            if (check) {
                selection = this.frozenValue() ? [...selection, ...this.frozenValue()!, ...data] : [...selection, ...data];
                selection = this.rowSelectable() ? selection.filter((data: any, index: number) => this.rowSelectable()!({ data, index })) : selection;
            }

            this.preventSelectionSetterPropagation = true;
            this.selection.set(selection);
            this.updateSelectionKeys();
            this.tableService.onSelectionChange();
            this.onHeaderCheckboxToggle.emit({
                originalEvent: originalEvent!,
                checked: check
            });

            if (this.isStateful()) {
                this.saveState();
            }
        }
    }

    equals(data1: any, data2: any) {
        return this.compareSelectionBy() === 'equals' ? data1 === data2 : ObjectUtils.equals(data1, data2, this.dataKey());
    }

    /* Legacy Filtering for custom elements */
    filter(value: any, field: string, matchMode: string) {
        if (this.filterTimeout) {
            clearTimeout(this.filterTimeout);
        }
        if (!this.isFilterBlank(value)) {
            this.filters[field] = { value: value, matchMode: matchMode };
        } else if (this.filters[field]) {
            delete this.filters[field];
        }

        this.filterTimeout = setTimeout(() => {
            this._filter();
            this.filterTimeout = null;
        }, this.filterDelay());

        this.anchorRowIndex = null;
    }

    filterGlobal(value: any, matchMode: string) {
        this.filter(value, 'global', matchMode);
    }

    isFilterBlank(filter: any): boolean {
        if (filter !== null && filter !== undefined) {
            if ((typeof filter === 'string' && filter.trim().length == 0) || (Array.isArray(filter) && filter.length == 0)) return true;
            else return false;
        }
        return true;
    }

    _filter() {
        if (!this.restoringFilter) {
            this.first.set(0);
        }

        if (this.lazy()) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        } else {
            if (!this.value) {
                return;
            }
            if (!this.hasFilter()) {
                this.filteredValue = null;
                if (this.paginator()) {
                    this.totalRecords.set(this.totalRecords() === 0 && this.value ? this.value.length : this.totalRecords());
                }
            } else {
                let globalFilterFieldsArray;
                if (this.filters['global']) {
                    if (!this.columns && !this.globalFilterFields()) throw new Error('Global filtering requires dynamic columns or globalFilterFields to be defined.');
                    else globalFilterFieldsArray = this.globalFilterFields() || this.columns;
                }

                this.filteredValue = [];

                for (let i = 0; i < this.value.length; i++) {
                    let localMatch = true;
                    let globalMatch = false;
                    let localFiltered = false;

                    for (let prop in this.filters) {
                        if (this.filters.hasOwnProperty(prop) && prop !== 'global') {
                            localFiltered = true;
                            let filterField = prop;
                            let filterMeta = this.filters[filterField];

                            if (Array.isArray(filterMeta)) {
                                for (let meta of filterMeta) {
                                    localMatch = this.executeLocalFilter(filterField, this.value[i], meta);

                                    if ((meta.operator === FilterOperator.OR && localMatch) || (meta.operator === FilterOperator.AND && !localMatch)) {
                                        break;
                                    }
                                }
                            } else {
                                localMatch = this.executeLocalFilter(filterField, this.value[i], <any>filterMeta);
                            }

                            if (!localMatch) {
                                break;
                            }
                        }
                    }

                    if (this.filters['global'] && !globalMatch && globalFilterFieldsArray) {
                        for (let j = 0; j < globalFilterFieldsArray.length; j++) {
                            let globalFilterField = globalFilterFieldsArray[j].field || globalFilterFieldsArray[j];
                            globalMatch = (<any>this.filterService).filters[(<any>this.filters['global']).matchMode](ObjectUtils.resolveFieldData(this.value[i], globalFilterField), (<FilterMetadata>this.filters['global']).value, this.filterLocale());

                            if (globalMatch) {
                                break;
                            }
                        }
                    }

                    let matches: boolean;
                    if (this.filters['global']) {
                        matches = localFiltered ? localFiltered && localMatch && globalMatch : globalMatch;
                    } else {
                        matches = localFiltered && localMatch;
                    }

                    if (matches) {
                        this.filteredValue.push(this.value[i]);
                    }
                }

                if (this.filteredValue.length === this.value.length) {
                    this.filteredValue = null;
                }

                if (this.paginator()) {
                    this.totalRecords.set(this.filteredValue ? this.filteredValue.length : this.totalRecords() === 0 && this.value ? this.value.length : (this.totalRecords() ?? 0));
                }
            }
        }

        this.onFilter.emit({
            filters: <{ [s: string]: FilterMetadata | undefined }>this.filters,
            filteredValue: this.filteredValue || this.value
        });

        this.tableService.onValueChange(this.value);

        if (this.isStateful() && !this.restoringFilter) {
            this.saveState();
        }

        if (this.restoringFilter) {
            this.restoringFilter = false;
        }

        this.cd.markForCheck();

        if (this.scrollable()) {
            this.resetScrollTop();
        }
    }

    executeLocalFilter(field: string, rowData: any, filterMeta: FilterMetadata): boolean {
        let filterValue = filterMeta.value;
        let filterMatchMode = filterMeta.matchMode || FilterMatchMode.STARTS_WITH;
        let dataFieldValue = ObjectUtils.resolveFieldData(rowData, field);
        let filterConstraint = (<any>this.filterService).filters[filterMatchMode];

        return filterConstraint(dataFieldValue, filterValue, this.filterLocale());
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

    createLazyLoadMetadata(): any {
        return {
            first: this.first(),
            rows: this.rows(),
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            filters: this.filters,
            globalFilter: this.filters && this.filters['global'] ? (<FilterMetadata>this.filters['global']).value : null,
            multiSortMeta: this.multiSortMeta,
            forceUpdate: () => this.cd.detectChanges()
        };
    }

    public clear() {
        this.sortField = null;
        this.sortOrder = this.defaultSortOrder();
        this.multiSortMeta = null;
        this.tableService.onSort(null);

        this.clearFilterValues();

        this.filteredValue = null;

        this.first.set(0);

        if (this.lazy()) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        } else {
            this.totalRecords.set(this.totalRecords() === 0 && this.value ? this.value.length : (this.totalRecords() ?? 0));
        }
    }

    clearFilterValues() {
        for (const [, filterMetadata] of Object.entries(this.filters)) {
            if (Array.isArray(filterMetadata)) {
                for (let filter of filterMetadata) {
                    filter.value = null;
                }
            } else if (filterMetadata) {
                filterMetadata.value = null;
            }
        }
    }

    reset() {
        this.clear();
    }

    getExportHeader(column: any) {
        return column[<string>this.exportHeader()] || column.header || column.field;
    }
    /**
     * Data export method.
     * @param {ExportCSVOptions} object - Export options.
     * @group Method
     */
    public exportCSV(options?: ExportCSVOptions) {
        let data;
        let csv = '';
        let columns = this.columns;

        if (options && options.selectionOnly) {
            data = this.selection() || [];
        } else if (options && options.allValues) {
            data = this.value || [];
        } else {
            data = this.filteredValue || this.value;

            if (this.frozenValue()) {
                data = data ? [...this.frozenValue()!, ...data] : this.frozenValue();
            }
        }

        const exportableColumns: any[] = (<any[]>columns).filter((column) => column.exportable !== false && column.field);

        //headers
        csv += exportableColumns.map((column) => '"' + this.getExportHeader(column) + '"').join(this.csvSeparator());

        //body
        const body = data
            .map((record: any) =>
                exportableColumns
                    .map((column) => {
                        let cellData = ObjectUtils.resolveFieldData(record, column.field);

                        if (cellData != null) {
                            if (this.exportFunction()) {
                                cellData = this.exportFunction()!({
                                    data: cellData,
                                    field: column.field
                                });
                            } else cellData = String(cellData).replace(/"/g, '""');
                        } else cellData = '';

                        return '"' + cellData + '"';
                    })
                    .join(this.csvSeparator())
            )
            .join('\n');

        if (body.length) {
            csv += '\n' + body;
        }

        let blob = new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), csv], {
            type: 'text/csv;charset=utf-8;'
        });

        let link = this.renderer.createElement('a');
        link.style.display = 'none';
        this.renderer.appendChild(this.document.body, link);
        if (link.download !== undefined) {
            link.setAttribute('href', URL.createObjectURL(blob));
            link.setAttribute('download', this.exportFilename() + '.csv');
            link.click();
        } else {
            csv = 'data:text/csv;charset=utf-8,' + csv;
            this.document.defaultView?.open(encodeURI(csv));
        }
        this.renderer.removeChild(this.document.body, link);
    }

    onLazyItemLoad(event: LazyLoadMeta) {
        this.onLazyLoad.emit({
            ...this.createLazyLoadMetadata(),
            ...event,
            rows: <number>event.last - <number>event.first
        });
    }
    /**
     * Resets scroll to top.
     * @group Method
     */
    public resetScrollTop() {
        if (this.virtualScroll()) this.scrollToVirtualIndex(0);
        else this.scrollTo({ top: 0 });
    }
    /**
     * Scrolls to given index when using virtual scroll.
     * @param {number} index - index of the element.
     * @group Method
     */
    public scrollToVirtualIndex(index: number) {
        this.scroller()?.scrollToIndex(index);
    }
    /**
     * Scrolls to given index.
     * @param {ScrollToOptions} options - scroll options.
     * @group Method
     */
    public scrollTo(options: any) {
        if (this.virtualScroll()) {
            this.scroller()?.scrollTo(options);
        } else if (this.wrapperViewChild()?.nativeElement) {
            if (this.wrapperViewChild()!.nativeElement.scrollTo) {
                this.wrapperViewChild()!.nativeElement.scrollTo(options);
            } else {
                this.wrapperViewChild()!.nativeElement.scrollLeft = options.left;
                this.wrapperViewChild()!.nativeElement.scrollTop = options.top;
            }
        }
    }

    updateEditingCell(cell: any, data: any, field: string, index: number) {
        this.editingCell = cell;
        this.editingCellData = data;
        this.editingCellField = field;
        this.editingCellRowIndex = index;
        this.bindDocumentEditListener();
    }

    isEditingCellValid() {
        return this.editingCell && DomHandler.find(this.editingCell, '.ng-invalid.ng-dirty').length === 0;
    }

    bindDocumentEditListener() {
        if (!this.documentEditListener) {
            this.documentEditListener = this.renderer.listen(this.document, 'click', (event) => {
                if (this.editingCell && !this.selfClick && this.isEditingCellValid()) {
                    !this.$unstyled() && DomHandler.removeClass(this.editingCell, 'p-cell-editing');
                    setAttribute(this.editingCell as HTMLElement, 'data-p-cell-editing', 'false');
                    this.editingCell = null;
                    this.onEditComplete.emit({
                        field: this.editingCellField,
                        data: this.editingCellData,
                        originalEvent: event,
                        index: <number>this.editingCellRowIndex
                    });
                    this.editingCellField = null;
                    this.editingCellData = null;
                    this.editingCellRowIndex = null;
                    this.unbindDocumentEditListener();
                    this.cd.markForCheck();

                    if (this.overlaySubscription) {
                        this.overlaySubscription.unsubscribe();
                    }
                }

                this.selfClick = false;
            });
        }
    }

    unbindDocumentEditListener() {
        if (this.documentEditListener) {
            this.documentEditListener();
            this.documentEditListener = null;
        }
    }

    initRowEdit(rowData: any) {
        let dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey()));
        this.editingRowKeys[dataKeyValue] = true;
    }

    saveRowEdit(rowData: any, rowElement: HTMLTableRowElement) {
        if (DomHandler.find(rowElement, '.ng-invalid.ng-dirty').length === 0) {
            let dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey()));
            delete this.editingRowKeys[dataKeyValue];
        }
    }

    cancelRowEdit(rowData: any) {
        let dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey()));
        delete this.editingRowKeys[dataKeyValue];
    }

    toggleRow(rowData: any, event?: Event) {
        if (!this.dataKey() && !this.groupRowsBy()) {
            throw new Error('dataKey or groupRowsBy must be defined to use row expansion');
        }

        let dataKeyValue = this.groupRowsBy() ? String(ObjectUtils.resolveFieldData(rowData, this.groupRowsBy())) : String(ObjectUtils.resolveFieldData(rowData, this.dataKey()));

        if (this.expandedRowKeys[dataKeyValue] != null) {
            delete this.expandedRowKeys[dataKeyValue];
            this.onRowCollapse.emit({
                originalEvent: <Event>event,
                data: rowData
            });
        } else {
            if (this.rowExpandMode() === 'single') {
                this.expandedRowKeys = {};
            }

            this.expandedRowKeys[dataKeyValue] = true;
            this.onRowExpand.emit({
                originalEvent: <Event>event,
                data: rowData
            });
        }

        if (event) {
            event.preventDefault();
        }

        if (this.isStateful()) {
            this.saveState();
        }
    }

    isRowExpanded(rowData: any): boolean {
        return this.groupRowsBy() ? this.expandedRowKeys[String(ObjectUtils.resolveFieldData(rowData, this.groupRowsBy()))] === true : this.expandedRowKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey()))] === true;
    }

    isRowEditing(rowData: any): boolean {
        return this.editingRowKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey()))] === true;
    }

    isSingleSelectionMode() {
        return this.selectionMode() === 'single';
    }

    isMultipleSelectionMode() {
        return this.selectionMode() === 'multiple';
    }

    onColumnResizeBegin(event: any) {
        let containerLeft = DomHandler.getOffset(this.el?.nativeElement).left;
        this.resizeColumnElement = event.target.closest('th');
        this.columnResizing = true;
        if (event.type == 'touchstart') {
            this.lastResizerHelperX = event.changedTouches[0].clientX - containerLeft + this.el?.nativeElement.scrollLeft;
        } else {
            this.lastResizerHelperX = event.pageX - containerLeft + this.el?.nativeElement.scrollLeft;
        }
        this.onColumnResize(event);
        event.preventDefault();
    }

    onColumnResize(event: any) {
        let containerLeft = DomHandler.getOffset(this.el?.nativeElement).left;
        !this.$unstyled() && DomHandler.addClass(this.el?.nativeElement, 'p-unselectable-text');
        this.resizeHelperViewChild()!.nativeElement.style.height = this.el?.nativeElement.offsetHeight + 'px';
        this.resizeHelperViewChild()!.nativeElement.style.top = 0 + 'px';
        if (event.type == 'touchmove') {
            this.resizeHelperViewChild()!.nativeElement.style.left = event.changedTouches[0].clientX - containerLeft + this.el?.nativeElement.scrollLeft + 'px';
        } else {
            this.resizeHelperViewChild()!.nativeElement.style.left = event.pageX - containerLeft + this.el?.nativeElement.scrollLeft + 'px';
        }
        this.resizeHelperViewChild()!.nativeElement.style.display = 'block';
    }

    onColumnResizeEnd() {
        const isRTL = getComputedStyle(this.el?.nativeElement ?? document.documentElement).direction === 'rtl';
        const rawDelta = this.resizeHelperViewChild()?.nativeElement.offsetLeft - <number>this.lastResizerHelperX;
        const delta = isRTL ? -rawDelta : rawDelta;
        const columnWidth = this.resizeColumnElement.offsetWidth;
        const newColumnWidth = columnWidth + delta;
        const elementMinWidth = this.resizeColumnElement.style.minWidth.replace(/[^\d.]/g, '');
        const minWidth = elementMinWidth ? parseFloat(elementMinWidth) : 15;

        if (newColumnWidth >= minWidth) {
            if (this.columnResizeMode() === 'fit') {
                const nextColumn = this.resizeColumnElement.nextElementSibling as HTMLElement;
                const nextColumnWidth = nextColumn.offsetWidth - delta;

                if (newColumnWidth > 15 && nextColumnWidth > 15) {
                    this.resizeTableCells(newColumnWidth, nextColumnWidth);
                }
            } else if (this.columnResizeMode() === 'expand') {
                this._initialColWidths = this._totalTableWidth();
                const tableWidth = this.tableViewChild()?.nativeElement.offsetWidth + delta;

                this.setResizeTableWidth(tableWidth + 'px');
                this.resizeTableCells(newColumnWidth, null);
            }

            this.onColResize.emit({
                element: this.resizeColumnElement,
                delta: delta
            });

            if (this.isStateful()) {
                this.saveState();
            }
        }

        this.resizeHelperViewChild()!.nativeElement.style.display = 'none';
        DomHandler.removeClass(this.el?.nativeElement, 'p-unselectable-text');
    }

    private _totalTableWidth(): number[] {
        let widths = [];
        const tableHead = DomHandler.findSingle(this.el.nativeElement, '[data-pc-section="thead"]');
        let headers = DomHandler.find(tableHead, 'tr > th');
        headers.forEach((header) => (widths as any[]).push(DomHandler.getOuterWidth(header)));

        return widths;
    }

    onColumnDragStart(event: any, columnElement: any) {
        this.reorderIconWidth = DomHandler.getHiddenElementOuterWidth(this.reorderIndicatorUpViewChild()?.nativeElement);
        this.reorderIconHeight = DomHandler.getHiddenElementOuterHeight(this.reorderIndicatorDownViewChild()?.nativeElement);
        this.draggedColumn = columnElement;
        event.dataTransfer.setData('text', 'b'); // For firefox
    }

    onColumnDragEnter(event: any, dropHeader: any) {
        if (this.reorderableColumns() && this.draggedColumn && dropHeader) {
            event.preventDefault();
            let containerOffset = DomHandler.getOffset(this.el?.nativeElement);
            let dropHeaderOffset = DomHandler.getOffset(dropHeader);

            if (this.draggedColumn != dropHeader) {
                let dragIndex = DomHandler.indexWithinGroup(this.draggedColumn, 'preorderablecolumn');
                let dropIndex = DomHandler.indexWithinGroup(dropHeader, 'preorderablecolumn');
                let targetLeft = dropHeaderOffset.left - containerOffset.left;
                let targetTop = containerOffset.top - dropHeaderOffset.top;
                let columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;

                this.reorderIndicatorUpViewChild()!.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top - (<number>this.reorderIconHeight - 1) + 'px';
                this.reorderIndicatorDownViewChild()!.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + 'px';

                if (event.pageX > columnCenter) {
                    this.reorderIndicatorUpViewChild()!.nativeElement.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(<number>this.reorderIconWidth / 2) + 'px';
                    this.reorderIndicatorDownViewChild()!.nativeElement.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(<number>this.reorderIconWidth / 2) + 'px';
                    this.dropPosition = 1;
                } else {
                    this.reorderIndicatorUpViewChild()!.nativeElement.style.left = targetLeft - Math.ceil(<number>this.reorderIconWidth / 2) + 'px';
                    this.reorderIndicatorDownViewChild()!.nativeElement.style.left = targetLeft - Math.ceil(<number>this.reorderIconWidth / 2) + 'px';
                    this.dropPosition = -1;
                }
                this.reorderIndicatorUpViewChild()!.nativeElement.style.display = 'block';
                this.reorderIndicatorDownViewChild()!.nativeElement.style.display = 'block';
            } else {
                event.dataTransfer.dropEffect = 'none';
            }
        }
    }

    onColumnDragLeave(event: Event) {
        if (this.reorderableColumns() && this.draggedColumn) {
            event.preventDefault();
        }
    }

    onColumnDrop(event: Event, dropColumn: any) {
        event.preventDefault();
        if (this.draggedColumn) {
            let dragIndex = DomHandler.indexWithinGroup(this.draggedColumn, 'preorderablecolumn');
            let dropIndex = DomHandler.indexWithinGroup(dropColumn, 'preorderablecolumn');
            let allowDrop = dragIndex != dropIndex;
            if (allowDrop && ((dropIndex - dragIndex == 1 && this.dropPosition === -1) || (dragIndex - dropIndex == 1 && this.dropPosition === 1))) {
                allowDrop = false;
            }

            if (allowDrop && dropIndex < dragIndex && this.dropPosition === 1) {
                dropIndex = dropIndex + 1;
            }

            if (allowDrop && dropIndex > dragIndex && this.dropPosition === -1) {
                dropIndex = dropIndex - 1;
            }

            if (allowDrop) {
                ObjectUtils.reorderArray(<any[]>this.columns, dragIndex, dropIndex);

                this.onColReorder.emit({
                    dragIndex: dragIndex,
                    dropIndex: dropIndex,
                    columns: this.columns
                });

                if (this.isStateful()) {
                    setTimeout(() => {
                        this.saveState();
                    });
                }
            }

            if (this.resizableColumns() && this.resizeColumnElement) {
                let width = this.columnResizeMode() === 'expand' ? this._initialColWidths : this._totalTableWidth();
                ObjectUtils.reorderArray(width, dragIndex + 1, dropIndex + 1);
                this.updateStyleElement(width, dragIndex, 0, 0);
            }

            this.reorderIndicatorUpViewChild()!.nativeElement.style.display = 'none';
            this.reorderIndicatorDownViewChild()!.nativeElement.style.display = 'none';
            this.draggedColumn.draggable = false;
            this.draggedColumn = null;
            this.dropPosition = null;
        }
    }

    resizeTableCells(newColumnWidth: number, nextColumnWidth: number | null) {
        let colIndex = DomHandler.index(this.resizeColumnElement);
        let width = this.columnResizeMode() === 'expand' ? this._initialColWidths : this._totalTableWidth();
        this.updateStyleElement(width, colIndex, newColumnWidth, nextColumnWidth);
    }

    updateStyleElement(width: number[], colIndex: number, newColumnWidth: number, nextColumnWidth: number | null) {
        this.destroyStyleElement();
        this.createStyleElement();

        let innerHTML = '';
        width.forEach((width, index) => {
            let colWidth = index === colIndex ? newColumnWidth : nextColumnWidth && index === colIndex + 1 ? nextColumnWidth : width;
            let style = `width: ${colWidth}px !important; max-width: ${colWidth}px !important;`;
            innerHTML += `
                #${this.id}-table > .p-datatable-thead > tr > th:nth-child(${index + 1}),
                #${this.id}-table > .p-datatable-tbody > tr > td:nth-child(${index + 1}),
                #${this.id}-table > .p-datatable-tfoot > tr > td:nth-child(${index + 1}) {
                    ${style}
                }
            `;
        });
        this.renderer.setProperty(this.styleElement, 'innerHTML', innerHTML);
    }

    onRowDragStart(event: any, index: number) {
        this.rowDragging = true;
        this.draggedRowIndex = index;
        event.dataTransfer.setData('text', 'b'); // For firefox
    }

    onRowDragOver(event: MouseEvent, index: number, rowElement: any) {
        if (this.rowDragging && this.draggedRowIndex !== index) {
            let rowY = DomHandler.getOffset(rowElement).top;
            let pageY = event.pageY;
            let rowMidY = rowY + DomHandler.getOuterHeight(rowElement) / 2;
            let prevRowElement = rowElement.previousElementSibling;

            if (pageY < rowMidY) {
                DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-bottom');

                this.droppedRowIndex = index;
                if (prevRowElement && !this.$unstyled()) DomHandler.addClass(prevRowElement, 'p-datatable-dragpoint-bottom');
                else !this.$unstyled() && DomHandler.addClass(rowElement, 'p-datatable-dragpoint-top');
            } else {
                if (prevRowElement && !this.$unstyled()) DomHandler.removeClass(prevRowElement, 'p-datatable-dragpoint-bottom');
                else !this.$unstyled() && DomHandler.addClass(rowElement, 'p-datatable-dragpoint-top');

                this.droppedRowIndex = index + 1;
                !this.$unstyled() && DomHandler.addClass(rowElement, 'p-datatable-dragpoint-bottom');
            }
        }
    }

    onRowDragLeave(event: Event, rowElement: any) {
        let prevRowElement = rowElement.previousElementSibling;
        if (prevRowElement) {
            !this.$unstyled() && DomHandler.removeClass(prevRowElement, 'p-datatable-dragpoint-bottom');
        }

        !this.$unstyled() && DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-bottom');
        !this.$unstyled() && DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-top');
    }

    onRowDragEnd(event: Event) {
        this.rowDragging = false;
        this.draggedRowIndex = null;
        this.droppedRowIndex = null;
    }

    onRowDrop(event: Event, rowElement: any) {
        if (this.droppedRowIndex != null) {
            let dropIndex = <number>this.draggedRowIndex > this.droppedRowIndex ? this.droppedRowIndex : this.droppedRowIndex === 0 ? 0 : this.droppedRowIndex - 1;
            ObjectUtils.reorderArray(this.value, <number>this.draggedRowIndex, dropIndex);

            if (this.virtualScroll()) {
                // TODO: Check
                this.value = [...this.value];
            }

            this.onRowReorder.emit({
                dragIndex: <number>this.draggedRowIndex,
                dropIndex: dropIndex
            });
        }
        //cleanup
        this.onRowDragLeave(event, rowElement);
        this.onRowDragEnd(event);
    }

    isEmpty() {
        let data = this.filteredValue || this.value;
        return data == null || data.length == 0;
    }

    getVirtualScrollerSpacerStyle(scrollerOptions: any) {
        return `height: calc(${scrollerOptions.spacerStyle.height} - ${scrollerOptions.rows.length * scrollerOptions.itemSize}px)`;
    }

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

    getStorage() {
        if (isPlatformBrowser(this.platformId)) {
            switch (this.stateStorage()) {
                case 'local':
                    return window.localStorage;

                case 'session':
                    return window.sessionStorage;

                default:
                    throw new Error(this.stateStorage() + ' is not a valid value for the state storage, supported values are "local" and "session".');
            }
        } else {
            throw new Error('Browser storage is not available in the server side.');
        }
    }

    isStateful() {
        return this.stateKey() != null;
    }

    saveState() {
        const storage = this.getStorage();
        let state: TableState = {};

        if (this.paginator()) {
            state.first = <number>this.first();
            state.rows = this.rows();
        }

        if (this.sortField) {
            state.sortField = this.sortField;
            state.sortOrder = this.sortOrder;
        }

        if (this.multiSortMeta) {
            state.multiSortMeta = this.multiSortMeta;
        }

        if (this.hasFilter()) {
            state.filters = this.filters;
        }

        if (this.resizableColumns()) {
            this.saveColumnWidths(state);
        }

        if (this.reorderableColumns()) {
            this.saveColumnOrder(state);
        }

        if (this.selection()) {
            state.selection = this.selection();
        }

        if (Object.keys(this.expandedRowKeys).length) {
            state.expandedRowKeys = this.expandedRowKeys;
        }

        storage.setItem(<string>this.stateKey(), JSON.stringify(state));
        this.onStateSave.emit(state);
    }

    clearState() {
        const storage = this.getStorage();

        if (this.stateKey()) {
            storage.removeItem(<string>this.stateKey());
        }
    }

    restoreState() {
        const storage = this.getStorage();
        const stateString = storage.getItem(<string>this.stateKey());
        const dateFormat = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;
        const reviver = function (key: any, value: any) {
            if (typeof value === 'string' && dateFormat.test(value)) {
                return new Date(value);
            }

            return value;
        };

        if (stateString) {
            let state: TableState = JSON.parse(stateString, reviver);

            if (this.paginator()) {
                if (this.first() !== undefined) {
                    this.first.set(state.first);
                }

                if (this.rows() !== undefined) {
                    this.rows.set(state.rows);
                }
            }

            if (state.sortField) {
                this.restoringSort = true;
                this.sortField = state.sortField;
                this.sortOrder = <number>state.sortOrder;
            }

            if (state.multiSortMeta) {
                this.restoringSort = true;
                this.multiSortMeta = state.multiSortMeta;
            }

            if (state.filters) {
                this.restoringFilter = true;
                this.filters = state.filters;
            }

            if (this.resizableColumns()) {
                this.columnWidthsState = state.columnWidths;
                this.tableWidthState = state.tableWidth;
            }

            // if (this.reorderableColumns) {
            //     this.restoreColumnOrder();
            // }

            if (state.expandedRowKeys) {
                this.expandedRowKeys = state.expandedRowKeys;
            }

            if (state.selection) {
                Promise.resolve(null).then(() => this.selection.set(state.selection));
            }

            this.stateRestored = true;

            this.onStateRestore.emit(state);
        }
    }

    saveColumnWidths(state: any) {
        let widths: any[] = [];
        let headers: any[] = [];

        const container = this.el?.nativeElement;

        if (container) {
            headers = DomHandler.find(container, '[data-pc-section="thead"] > tr > th');
        }

        headers.forEach((header) => (widths as any[]).push(DomHandler.getOuterWidth(header)));
        state.columnWidths = widths.join(',');

        if (this.columnResizeMode() === 'expand' && this.tableViewChild()) {
            state.tableWidth = DomHandler.getOuterWidth(this.tableViewChild()!.nativeElement);
        }
    }

    setResizeTableWidth(width: string) {
        this.tableViewChild()!.nativeElement.style.width = width;
        this.tableViewChild()!.nativeElement.style.minWidth = width;
    }

    restoreColumnWidths() {
        if (this.columnWidthsState) {
            let widths = this.columnWidthsState.split(',');

            if (this.columnResizeMode() === 'expand' && this.tableWidthState) {
                this.setResizeTableWidth(this.tableWidthState + 'px');
            }

            if (ObjectUtils.isNotEmpty(widths)) {
                this.createStyleElement();

                let innerHTML = '';
                widths.forEach((width, index) => {
                    let style = `width: ${width}px !important; max-width: ${width}px !important`;

                    innerHTML += `
                        #${this.id}-table > .p-datatable-thead > tr > th:nth-child(${index + 1}),
                        #${this.id}-table > .p-datatable-tbody > tr > td:nth-child(${index + 1}),
                        #${this.id}-table > .p-datatable-tfoot > tr > td:nth-child(${index + 1}) {
                            ${style}
                        }
                    `;
                });

                this.styleElement.innerHTML = innerHTML;
            }
        }
    }

    saveColumnOrder(state: any) {
        if (this.columns) {
            let columnOrder: string[] = [];
            this.columns.map((column) => {
                columnOrder.push(column.field || column.key);
            });

            state.columnOrder = columnOrder;
        }
    }

    restoreColumnOrder() {
        const storage = this.getStorage();
        const stateString = storage.getItem(<string>this.stateKey());
        if (stateString) {
            let state: TableState = JSON.parse(stateString);
            let columnOrder = state.columnOrder;

            if (columnOrder) {
                let reorderedColumns: any[] = [];

                columnOrder.map((key) => {
                    let col = this.findColumnByKey(key);
                    if (col) {
                        reorderedColumns.push(col);
                    }
                });
                this.columnOrderStateRestored = true;
                this.columns = reorderedColumns;
            }
        }
    }

    findColumnByKey(key: any) {
        if (this.columns) {
            for (let col of this.columns) {
                if (col.key === key || col.field === key) return col;
                else continue;
            }
        } else {
            return null;
        }
    }

    createStyleElement() {
        this.styleElement = this.renderer.createElement('style');
        this.styleElement.type = 'text/css';
        DomHandler.setAttribute(this.styleElement, 'nonce', this.config?.csp()?.nonce);
        this.renderer.appendChild(this.document.head, this.styleElement);
        DomHandler.setAttribute(this.styleElement, 'nonce', this.config?.csp()?.nonce);
    }

    getGroupRowsMeta() {
        return { field: this.groupRowsBy(), order: this.groupRowsByOrder() };
    }

    createResponsiveStyle() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.responsiveStyleElement) {
                this.responsiveStyleElement = this.renderer.createElement('style');
                this.responsiveStyleElement.type = 'text/css';
                DomHandler.setAttribute(this.responsiveStyleElement, 'nonce', this.config?.csp()?.nonce);
                this.renderer.appendChild(this.document.head, this.responsiveStyleElement);

                let innerHTML = `
    @media screen and (max-width: ${this.breakpoint()}) {
        #${this.id}-table > .p-datatable-thead > tr > th,
        #${this.id}-table > .p-datatable-tfoot > tr > td {
            display: none !important;
        }

        #${this.id}-table > .p-datatable-tbody > tr > td {
            display: flex;
            width: 100% !important;
            align-items: center;
            justify-content: space-between;
        }

        #${this.id}-table > .p-datatable-tbody > tr > td:not(:last-child) {
            border: 0 none;
        }

        #${this.id}.p-datatable-gridlines > .p-datatable-table-container > .p-datatable-table > .p-datatable-tbody > tr > td:last-child {
            border-top: 0;
            border-right: 0;
            border-left: 0;
        }

        #${this.id}-table > .p-datatable-tbody > tr > td > .p-datatable-column-title {
            display: block;
        }
    }
    `;
                this.renderer.setProperty(this.responsiveStyleElement, 'innerHTML', innerHTML);
                DomHandler.setAttribute(this.responsiveStyleElement, 'nonce', this.config?.csp()?.nonce);
            }
        }
    }

    destroyResponsiveStyle() {
        if (this.responsiveStyleElement) {
            this.renderer.removeChild(this.document.head, this.responsiveStyleElement);
            this.responsiveStyleElement = null;
        }
    }

    destroyStyleElement() {
        if (this.styleElement) {
            this.renderer.removeChild(this.document.head, this.styleElement);
            this.styleElement = null;
        }
    }

    ngAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    onDestroy() {
        this.unbindDocumentEditListener();
        this.editingCell = null;
        this.initialized = null;

        this.destroyStyleElement();
        this.destroyResponsiveStyle();
    }

    get dataP() {
        return this.cn({
            scrollable: this.scrollable(),
            'flex-scrollable': this.scrollable() && this.scrollHeight() === 'flex',
            [this.size() as string]: this.size(),
            loading: this.loading(),
            empty: this.isEmpty()
        });
    }
}
