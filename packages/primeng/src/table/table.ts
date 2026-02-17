import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    NgZone,
    numberAttribute,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isClickable, setAttribute } from '@primeuix/utils';
import { BlockableUI, FilterMatchMode, FilterMetadata, FilterOperator, FilterService, LazyLoadMeta, OverlayService, PrimeTemplate, ScrollerOptions, SharedModule, SortMeta, TableState } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { CheckboxChangeEvent } from 'primeng/checkbox';
import { DomHandler } from 'primeng/dom';
import { PaginatorModule } from 'primeng/paginator';
import { Scroller, ScrollerModule } from 'primeng/scroller';
import { ArrowDownIcon } from 'primeng/icons/arrowdown';
import { ArrowUpIcon } from 'primeng/icons/arrowup';
import { SpinnerIcon } from 'primeng/icons/spinner';
import { Nullable } from 'primeng/ts-helpers';
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
    TablePassThrough,
    TableRowCollapseEvent,
    TableRowExpandEvent,
    TableRowReorderEvent,
    TableRowSelectEvent,
    TableRowUnSelectEvent,
    TableSelectAllChangeEvent
} from 'primeng/types/table';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';
import { Subscription } from 'rxjs';
import { TableStyle } from './style/tablestyle';
import { TableBody } from './table-body';
import { TABLE_INSTANCE, TableService } from './table-token';
/**
 * Table displays data in tabular format.
 * @group Components
 */
@Component({
    selector: 'p-table',
    standalone: true,
    imports: [CommonModule, PaginatorModule, ScrollerModule, FormsModule, BindModule, SharedModule, SpinnerIcon, ArrowDownIcon, ArrowUpIcon, TableBody],
    template: `
        <div [class]="cx('mask')" [pBind]="ptm('mask')" *ngIf="loading && showLoader" animate.enter="p-overlay-mask-enter-active" animate.leave="p-overlay-mask-leave-active">
            <i *ngIf="loadingIcon" [class]="cn(cx('loadingIcon'), loadingIcon)" [pBind]="ptm('loadingIcon')"></i>
            <ng-container *ngIf="!loadingIcon">
                <svg data-p-icon="spinner" *ngIf="!loadingIconTemplate && !_loadingIconTemplate" [spin]="true" [class]="cx('loadingIcon')" [pBind]="ptm('loadingIcon')" />
                <span *ngIf="loadingIconTemplate || _loadingIconTemplate" [class]="cx('loadingIcon')" [pBind]="ptm('loadingIcon')">
                    <ng-template *ngTemplateOutlet="loadingIconTemplate || _loadingIconTemplate"></ng-template>
                </span>
            </ng-container>
        </div>
        <div *ngIf="captionTemplate || _captionTemplate" [class]="cx('header')" [pBind]="ptm('header')">
            <ng-container *ngTemplateOutlet="captionTemplate || _captionTemplate"></ng-container>
        </div>
        <p-paginator
            [rows]="rows"
            [first]="first"
            [totalRecords]="totalRecords"
            [pageLinkSize]="pageLinks"
            [alwaysShow]="alwaysShowPaginator"
            (onPageChange)="onPageChange($event)"
            [rowsPerPageOptions]="rowsPerPageOptions"
            *ngIf="paginator && (paginatorPosition === 'top' || paginatorPosition == 'both')"
            [templateLeft]="paginatorLeftTemplate || _paginatorLeftTemplate"
            [templateRight]="paginatorRightTemplate || _paginatorRightTemplate"
            [appendTo]="paginatorDropdownAppendTo"
            [dropdownScrollHeight]="paginatorDropdownScrollHeight"
            [currentPageReportTemplate]="currentPageReportTemplate"
            [showFirstLastIcon]="showFirstLastIcon"
            [dropdownItemTemplate]="paginatorDropdownItemTemplate || _paginatorDropdownItemTemplate"
            [showCurrentPageReport]="showCurrentPageReport"
            [showJumpToPageDropdown]="showJumpToPageDropdown"
            [showJumpToPageInput]="showJumpToPageInput"
            [showPageLinks]="showPageLinks"
            [class]="cx('pcPaginator') + ' ' + paginatorStyleClass && paginatorStyleClass"
            [locale]="paginatorLocale"
            [pt]="ptm('pcPaginator')"
            [unstyled]="unstyled()"
        >
            <ng-template #dropdownicon *ngIf="paginatorDropdownIconTemplate || _paginatorDropdownIconTemplate">
                <ng-container *ngTemplateOutlet="paginatorDropdownIconTemplate || _paginatorDropdownIconTemplate"></ng-container>
            </ng-template>

            <ng-template #firstpagelinkicon *ngIf="paginatorFirstPageLinkIconTemplate || _paginatorFirstPageLinkIconTemplate">
                <ng-container *ngTemplateOutlet="paginatorFirstPageLinkIconTemplate || _paginatorFirstPageLinkIconTemplate"></ng-container>
            </ng-template>

            <ng-template #previouspagelinkicon *ngIf="paginatorPreviousPageLinkIconTemplate || _paginatorPreviousPageLinkIconTemplate">
                <ng-container *ngTemplateOutlet="paginatorPreviousPageLinkIconTemplate || _paginatorPreviousPageLinkIconTemplate"></ng-container>
            </ng-template>

            <ng-template #lastpagelinkicon *ngIf="paginatorLastPageLinkIconTemplate || _paginatorLastPageLinkIconTemplate">
                <ng-container *ngTemplateOutlet="paginatorLastPageLinkIconTemplate || _paginatorLastPageLinkIconTemplate"></ng-container>
            </ng-template>

            <ng-template #nextpagelinkicon *ngIf="paginatorNextPageLinkIconTemplate || _paginatorNextPageLinkIconTemplate">
                <ng-container *ngTemplateOutlet="paginatorNextPageLinkIconTemplate || _paginatorNextPageLinkIconTemplate"></ng-container>
            </ng-template>
        </p-paginator>

        <div #wrapper [class]="cx('tableContainer')" [ngStyle]="sx('tableContainer')" [pBind]="ptm('tableContainer')" [attr.data-p]="dataP">
            <p-scroller
                #scroller
                *ngIf="virtualScroll"
                [items]="processedData"
                [columns]="columns"
                [style]="{
                    height: scrollHeight !== 'flex' ? scrollHeight : undefined
                }"
                [scrollHeight]="scrollHeight !== 'flex' ? undefined : '100%'"
                [itemSize]="virtualScrollItemSize"
                [step]="rows"
                [delay]="lazy ? virtualScrollDelay : 0"
                [inline]="true"
                [autoSize]="true"
                [lazy]="lazy"
                (onLazyLoad)="onLazyItemLoad($event)"
                [loaderDisabled]="true"
                [showSpacer]="false"
                [showLoader]="loadingBodyTemplate || _loadingBodyTemplate"
                [options]="virtualScrollOptions"
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
            <ng-container *ngIf="!virtualScroll">
                <ng-container
                    *ngTemplateOutlet="
                        buildInTable;
                        context: {
                            $implicit: processedData,
                            options: { columns }
                        }
                    "
                ></ng-container>
            </ng-container>

            <ng-template #buildInTable let-items let-scrollerOptions="options">
                <table #table role="table" [class]="cn(cx('table'), tableStyleClass)" [pBind]="ptm('table')" [style]="tableStyle" [attr.id]="id + '-table'">
                    <ng-container *ngTemplateOutlet="colGroupTemplate || _colGroupTemplate; context: { $implicit: scrollerOptions.columns }"></ng-container>
                    <thead role="rowgroup" #thead [class]="cx('thead')" [ngStyle]="sx('thead')" [pBind]="ptm('thead')">
                        <ng-container
                            *ngTemplateOutlet="
                                headerGroupedTemplate || headerTemplate || _headerTemplate;
                                context: {
                                    $implicit: scrollerOptions.columns
                                }
                            "
                        ></ng-container>
                    </thead>
                    <tbody
                        role="rowgroup"
                        [class]="cx('tbody')"
                        [pBind]="ptm('tbody')"
                        *ngIf="frozenValue || frozenBodyTemplate || _frozenBodyTemplate"
                        [value]="frozenValue"
                        [frozenRows]="true"
                        [pTableBody]="scrollerOptions.columns"
                        [pTableBodyTemplate]="frozenBodyTemplate || _frozenBodyTemplate"
                        [unstyled]="unstyled()"
                        [frozen]="true"
                        [attr.data-p-virtualscroll]="virtualScroll"
                    ></tbody>
                    <tbody
                        role="rowgroup"
                        [class]="cx('tbody', scrollerOptions.contentStyleClass)"
                        [pBind]="ptm('tbody')"
                        [style]="scrollerOptions.contentStyle"
                        [value]="dataToRender(scrollerOptions.rows)"
                        [pTableBody]="scrollerOptions.columns"
                        [pTableBodyTemplate]="bodyTemplate || _bodyTemplate"
                        [scrollerOptions]="scrollerOptions"
                        [unstyled]="unstyled()"
                        [attr.data-p-virtualscroll]="virtualScroll"
                    ></tbody>
                    <tbody
                        role="rowgroup"
                        *ngIf="scrollerOptions.spacerStyle"
                        [style]="'height: calc(' + scrollerOptions.spacerStyle.height + ' - ' + scrollerOptions.rows.length * scrollerOptions.itemSize + 'px);'"
                        [class]="cx('virtualScrollerSpacer')"
                        [pBind]="ptm('virtualScrollerSpacer')"
                    ></tbody>
                    <tfoot role="rowgroup" *ngIf="footerGroupedTemplate || footerTemplate || _footerTemplate || _footerGroupedTemplate" #tfoot [ngClass]="cx('footer')" [ngStyle]="sx('tfoot')" [pBind]="ptm('tfoot')">
                        <ng-container
                            *ngTemplateOutlet="
                                footerGroupedTemplate || footerTemplate || _footerTemplate || _footerGroupedTemplate;
                                context: {
                                    $implicit: scrollerOptions.columns
                                }
                            "
                        ></ng-container>
                    </tfoot>
                </table>
            </ng-template>
        </div>

        <p-paginator
            [rows]="rows"
            [first]="first"
            [totalRecords]="totalRecords"
            [pageLinkSize]="pageLinks"
            [alwaysShow]="alwaysShowPaginator"
            (onPageChange)="onPageChange($event)"
            [rowsPerPageOptions]="rowsPerPageOptions"
            *ngIf="paginator && (paginatorPosition === 'bottom' || paginatorPosition == 'both')"
            [templateLeft]="paginatorLeftTemplate || _paginatorLeftTemplate"
            [templateRight]="paginatorRightTemplate || _paginatorRightTemplate"
            [appendTo]="paginatorDropdownAppendTo"
            [dropdownScrollHeight]="paginatorDropdownScrollHeight"
            [currentPageReportTemplate]="currentPageReportTemplate"
            [showFirstLastIcon]="showFirstLastIcon"
            [dropdownItemTemplate]="paginatorDropdownItemTemplate || _paginatorDropdownItemTemplate"
            [showCurrentPageReport]="showCurrentPageReport"
            [showJumpToPageDropdown]="showJumpToPageDropdown"
            [showJumpToPageInput]="showJumpToPageInput"
            [showPageLinks]="showPageLinks"
            [class]="cx('pcPaginator') + ' ' + paginatorStyleClass && paginatorStyleClass"
            [locale]="paginatorLocale"
            [pt]="ptm('pcPaginator')"
            [unstyled]="unstyled()"
        >
            <ng-template #dropdownicon *ngIf="paginatorDropdownIconTemplate || _paginatorDropdownIconTemplate">
                <ng-container *ngTemplateOutlet="paginatorDropdownIconTemplate || _paginatorDropdownIconTemplate"></ng-container>
            </ng-template>

            <ng-template #firstpagelinkicon *ngIf="paginatorFirstPageLinkIconTemplate || _paginatorFirstPageLinkIconTemplate">
                <ng-container *ngTemplateOutlet="paginatorFirstPageLinkIconTemplate || _paginatorFirstPageLinkIconTemplate"></ng-container>
            </ng-template>

            <ng-template #previouspagelinkicon *ngIf="paginatorPreviousPageLinkIconTemplate || _paginatorPreviousPageLinkIconTemplate">
                <ng-container *ngTemplateOutlet="paginatorPreviousPageLinkIconTemplate || _paginatorPreviousPageLinkIconTemplate"></ng-container>
            </ng-template>

            <ng-template #lastpagelinkicon *ngIf="paginatorLastPageLinkIconTemplate || _paginatorLastPageLinkIconTemplate">
                <ng-container *ngTemplateOutlet="paginatorLastPageLinkIconTemplate || _paginatorLastPageLinkIconTemplate"></ng-container>
            </ng-template>

            <ng-template #nextpagelinkicon *ngIf="paginatorNextPageLinkIconTemplate || _paginatorNextPageLinkIconTemplate">
                <ng-container *ngTemplateOutlet="paginatorNextPageLinkIconTemplate || _paginatorNextPageLinkIconTemplate"></ng-container>
            </ng-template>
        </p-paginator>

        <div *ngIf="summaryTemplate || _summaryTemplate" [ngClass]="cx('footer')" [pBind]="ptm('footer')">
            <ng-container *ngTemplateOutlet="summaryTemplate || _summaryTemplate"></ng-container>
        </div>

        <div #resizeHelper [ngClass]="cx('columnResizeIndicator')" [pBind]="ptm('columnResizeIndicator')" [style.display]="'none'" *ngIf="resizableColumns"></div>
        <span #reorderIndicatorUp [ngClass]="cx('rowReorderIndicatorUp')" [pBind]="ptm('rowReorderIndicatorUp')" [style.display]="'none'" *ngIf="reorderableColumns">
            <svg data-p-icon="arrow-down" *ngIf="!reorderIndicatorUpIconTemplate && !_reorderIndicatorUpIconTemplate" [pBind]="ptm('rowReorderIndicatorUp')['icon']" />
            <ng-template *ngTemplateOutlet="reorderIndicatorUpIconTemplate || _reorderIndicatorUpIconTemplate"></ng-template>
        </span>
        <span #reorderIndicatorDown [ngClass]="cx('rowReorderIndicatorDown')" [pBind]="ptm('rowReorderIndicatorDown')" [style.display]="'none'" *ngIf="reorderableColumns">
            <svg data-p-icon="arrow-up" *ngIf="!reorderIndicatorDownIconTemplate && !_reorderIndicatorDownIconTemplate" [pBind]="ptm('rowReorderIndicatorDown')['icon']" />
            <ng-template *ngTemplateOutlet="reorderIndicatorDownIconTemplate || _reorderIndicatorDownIconTemplate"></ng-template>
        </span>
    `,
    providers: [TableService, TableStyle, { provide: TABLE_INSTANCE, useExisting: Table }, { provide: PARENT_INSTANCE, useExisting: Table }],
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "cn(cx('root'), styleClass)",
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
    @Input() frozenColumns: any[] | undefined;
    /**
     * An array of objects to display as frozen.
     * @group Props
     */
    @Input() frozenValue: any[] | undefined;
    /**
     * Style class of the component.
     * @deprecated since v20.0.0, use `class` instead.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Inline style of the table.
     * @group Props
     */
    @Input() tableStyle: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the table.
     * @group Props
     */
    @Input() tableStyleClass: string | undefined;
    /**
     * When specified as true, enables the pagination.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) paginator: boolean | undefined;
    /**
     * Number of page links to display in paginator.
     * @group Props
     */
    @Input({ transform: numberAttribute }) pageLinks: number = 5;
    /**
     * Array of integer/object values to display inside rows per page dropdown of paginator
     * @group Props
     */
    @Input() rowsPerPageOptions: any[] | undefined;
    /**
     * Whether to show it even there is only one page.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) alwaysShowPaginator: boolean = true;
    /**
     * Position of the paginator, options are "top", "bottom" or "both".
     * @group Props
     */
    @Input() paginatorPosition: 'top' | 'bottom' | 'both' = 'bottom';
    /**
     * Custom style class for paginator
     * @group Props
     */
    @Input() paginatorStyleClass: string | undefined;
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
     * Whether to display a input to navigate to any page.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showJumpToPageInput: boolean | undefined;
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
     * Sort order to use when an unsorted column gets sorted by user interaction.
     * @group Props
     */
    @Input({ transform: numberAttribute }) defaultSortOrder: number = 1;
    /**
     * Defines whether sorting works on single column or on multiple columns.
     * @group Props
     */
    @Input() sortMode: 'single' | 'multiple' = 'single';
    /**
     * When true, resets paginator to first page after sorting. Available only when sortMode is set to single.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) resetPageOnSort: boolean = true;
    /**
     * Specifies the selection mode, valid values are "single" and "multiple".
     * @group Props
     */
    @Input() selectionMode: 'single' | 'multiple' | undefined | null;
    /**
     * When enabled with paginator and checkbox selection mode, the select all checkbox in the header will select all rows on the current page.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) selectionPageOnly: boolean | undefined;
    /**
     * Selected row with a context menu.
     * @group Props
     */
    @Input() contextMenuSelection: any;
    /**
     * Callback to invoke on context menu selection change.
     * @param {*} object - row data.
     * @group Emits
     */
    @Output() contextMenuSelectionChange: EventEmitter<any> = new EventEmitter();
    /**
     *  Defines the behavior of context menu selection, in "separate" mode context menu updates contextMenuSelection property whereas in joint mode selection property is used instead so that when row selection is enabled, both row selection and context menu selection use the same property.
     * @group Props
     */
    @Input() contextMenuSelectionMode: string = 'separate';
    /**
     * A property to uniquely identify a record in data.
     * @group Props
     */
    @Input() dataKey: string | undefined;
    /**
     * Defines whether metaKey should be considered for the selection. On touch enabled devices, metaKeySelection is turned off automatically.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) metaKeySelection: boolean | undefined = false;
    /**
     * Defines if the row is selectable.
     * @group Props
     */
    @Input() rowSelectable: (row: { data: any; index: number }) => boolean | undefined;
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity.
     * @group Props
     */
    @Input() rowTrackBy: Function = (index: number, item: any) => item;
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) lazy: boolean = false;
    /**
     * Whether to call lazy loading on initialization.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) lazyLoadOnInit: boolean = true;
    /**
     * Algorithm to define if a row is selected, valid values are "equals" that compares by reference and "deepEquals" that compares all fields.
     * @group Props
     */
    @Input() compareSelectionBy: 'equals' | 'deepEquals' = 'deepEquals';
    /**
     * Character to use as the csv separator.
     * @group Props
     */
    @Input() csvSeparator: string = ',';
    /**
     * Name of the exported file.
     * @group Props
     */
    @Input() exportFilename: string = 'download';
    /**
     * An array of FilterMetadata objects to provide external filters.
     * @group Props
     */
    @Input() filters: { [s: string]: FilterMetadata | FilterMetadata[] } = {};
    /**
     * An array of fields as string to use in global filtering.
     * @group Props
     */
    @Input() globalFilterFields: string[] | undefined;
    /**
     * Delay in milliseconds before filtering the data.
     * @group Props
     */
    @Input({ transform: numberAttribute }) filterDelay: number = 300;
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    @Input() filterLocale: string | undefined;
    /**
     * Map instance to keep the expanded rows where key of the map is the data key of the row.
     * @group Props
     */
    @Input() expandedRowKeys: { [s: string]: boolean } = {};
    /**
     * Map instance to keep the rows being edited where key of the map is the data key of the row.
     * @group Props
     */
    @Input() editingRowKeys: { [s: string]: boolean } = {};
    /**
     * Whether multiple rows can be expanded at any time. Valid values are "multiple" and "single".
     * @group Props
     */
    @Input() rowExpandMode: 'multiple' | 'single' = 'multiple';
    /**
     * Enables scrollable tables.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) scrollable: boolean | undefined;
    /**
     * Type of the row grouping, valid values are "subheader" and "rowspan".
     * @group Props
     */
    @Input() rowGroupMode: 'subheader' | 'rowspan' | undefined;
    /**
     * Height of the scroll viewport in fixed pixels or the "flex" keyword for a dynamic size.
     * @group Props
     */
    @Input() scrollHeight: string | undefined;
    /**
     * Whether the data should be loaded on demand during scroll.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) virtualScroll: boolean | undefined;
    /**
     * Height of a row to use in calculations of virtual scrolling.
     * @group Props
     */
    @Input({ transform: numberAttribute }) virtualScrollItemSize: number | undefined;
    /**
     * Whether to use the scroller feature. The properties of scroller component can be used like an object in it.
     * @group Props
     */
    @Input() virtualScrollOptions: ScrollerOptions | undefined;
    /**
     * Threshold in milliseconds to delay lazy loading during scrolling.
     * @group Props
     */
    @Input({ transform: numberAttribute }) virtualScrollDelay: number = 250;
    /**
     * Width of the frozen columns container.
     * @group Props
     */
    @Input() frozenWidth: string | undefined;
    /**
     * Local ng-template varilable of a ContextMenu.
     * @group Props
     */
    @Input() contextMenu: any;
    /**
     * When enabled, columns can be resized using drag and drop.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) resizableColumns: boolean | undefined;
    /**
     * Defines whether the overall table width should change on column resize, valid values are "fit" and "expand".
     * @group Props
     */
    @Input() columnResizeMode: string = 'fit';
    /**
     * When enabled, columns can be reordered using drag and drop.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) reorderableColumns: boolean | undefined;
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
     * Whether to show the loading mask when loading property is true.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showLoader: boolean = true;
    /**
     * Adds hover effect to rows without the need for selectionMode. Note that tr elements that can be hovered need to have "p-selectable-row" class for rowHover to work.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) rowHover: boolean | undefined;
    /**
     * Whether to use the default sorting or a custom one using sortFunction.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) customSort: boolean | undefined;
    /**
     * Whether to use the initial sort badge or not.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showInitialSortBadge: boolean = true;
    /**
     * Export function.
     * @group Props
     */
    @Input() exportFunction: Function | undefined;
    /**
     * Custom export header of the column to be exported as CSV.
     * @group Props
     */
    @Input() exportHeader: string | undefined;
    /**
     * Unique identifier of a stateful table to use in state storage.
     * @group Props
     */
    @Input() stateKey: string | undefined;
    /**
     * Defines where a stateful table keeps its state, valid values are "session" for sessionStorage and "local" for localStorage.
     * @group Props
     */
    @Input() stateStorage: 'session' | 'local' = 'session';
    /**
     * Defines the editing mode, valid values are "cell" and "row".
     * @group Props
     */
    @Input() editMode: 'cell' | 'row' = 'cell';
    /**
     * Field name to use in row grouping.
     * @group Props
     */
    @Input() groupRowsBy: any;
    /**
     * Defines the size of the table.
     * @group Props
     */
    @Input() size: 'small' | 'large' | undefined;
    /**
     * Whether to show grid lines between cells.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showGridlines: boolean | undefined;
    /**
     * Whether to display rows with alternating colors.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) stripedRows: boolean | undefined;
    /**
     * Order to sort when default row grouping is enabled.
     * @group Props
     */
    @Input({ transform: numberAttribute }) groupRowsByOrder: number = 1;
    /**
     * Defines the responsive mode, valid options are "stack" and "scroll".
     * @deprecated since v20.0.0, always defaults to scroll, stack mode needs custom implementation
     * @group Props
     */
    @Input() responsiveLayout: string = 'scroll';
    /**
     * The breakpoint to define the maximum width boundary when using stack responsive layout.
     * @group Props
     */
    @Input() breakpoint: string = '960px';
    /**
     * Locale to be used in paginator formatting.
     * @group Props
     */
    @Input() paginatorLocale: string | undefined;
    /**
     * An array of objects to display.
     * @group Props
     */
    @Input() get value(): RowData[] {
        return this._value;
    }
    set value(val: RowData[]) {
        this._value = val;
    }
    /**
     * An array of objects to represent dynamic columns.
     * @group Props
     */
    @Input() get columns(): any[] | undefined {
        return this._columns;
    }
    set columns(cols: any[] | undefined) {
        this._columns = cols;
    }
    /**
     * Index of the first row to be displayed.
     * @group Props
     */
    @Input() get first(): number | null | undefined {
        return this._first;
    }
    set first(val: number | null | undefined) {
        this._first = val;
    }
    /**
     * Number of rows to display per page.
     * @group Props
     */
    @Input() get rows(): number | undefined {
        return this._rows;
    }
    set rows(val: number | undefined) {
        this._rows = val;
    }
    /**
     * Number of total records, defaults to length of value when not defined.
     * @group Props
     */
    @Input() totalRecords: number = 0;

    /**
     * Name of the field to sort data by default.
     * @group Props
     */
    @Input() get sortField(): string | undefined | null {
        return this._sortField;
    }
    set sortField(val: string | undefined | null) {
        this._sortField = val;
    }
    /**
     * Order to sort when default sorting is enabled.
     * @group Props
     */
    @Input() get sortOrder(): number {
        return this._sortOrder;
    }
    set sortOrder(val: number) {
        this._sortOrder = val;
    }
    /**
     * An array of SortMeta objects to sort the data by default in multiple sort mode.
     * @group Props
     */
    @Input() get multiSortMeta(): SortMeta[] | undefined | null {
        return this._multiSortMeta;
    }
    set multiSortMeta(val: SortMeta[] | undefined | null) {
        this._multiSortMeta = val;
    }
    /**
     * Selected row in single mode or an array of values in multiple mode.
     * @group Props
     */
    @Input() get selection(): any {
        return this._selection;
    }
    set selection(val: any) {
        this._selection = val;
    }
    /**
     * Whether all data is selected.
     * @group Props
     */
    @Input() get selectAll(): boolean | null {
        return this._selection;
    }
    set selectAll(val: boolean | null) {
        this._selection = val;
    }
    /**
     * Emits when the all of the items selected or unselected.
     * @param {TableSelectAllChangeEvent} event - custom  all selection change event.
     * @group Emits
     */
    @Output() selectAllChange: EventEmitter<TableSelectAllChangeEvent> = new EventEmitter<TableSelectAllChangeEvent>();
    /**
     * Callback to invoke on selection changed.
     * @param {any | null} value - selected data.
     * @group Emits
     */
    @Output() selectionChange: EventEmitter<any | null> = new EventEmitter<any | null>();
    /**
     * Callback to invoke when a row is selected.
     * @param {TableRowSelectEvent} event - custom select event.
     * @group Emits
     */
    @Output() onRowSelect: EventEmitter<TableRowSelectEvent<RowData>> = new EventEmitter<TableRowSelectEvent<RowData>>();
    /**
     * Callback to invoke when a row is unselected.
     * @param {TableRowUnSelectEvent} event - custom unselect event.
     * @group Emits
     */
    @Output() onRowUnselect: EventEmitter<TableRowUnSelectEvent<RowData>> = new EventEmitter<TableRowUnSelectEvent<RowData>>();
    /**
     * Callback to invoke when pagination occurs.
     * @param {TablePageEvent} event - custom pagination event.
     * @group Emits
     */
    @Output() onPage: EventEmitter<TablePageEvent> = new EventEmitter<TablePageEvent>();
    /**
     * Callback to invoke when a column gets sorted.
     * @param {Object} object - sort meta.
     * @group Emits
     */
    @Output() onSort: EventEmitter<{ multisortmeta: SortMeta[] } | any> = new EventEmitter<{ multisortmeta: SortMeta[] } | any>();
    /**
     * Callback to invoke when data is filtered.
     * @param {TableFilterEvent} event - custom filtering event.
     * @group Emits
     */
    @Output() onFilter: EventEmitter<TableFilterEvent> = new EventEmitter<TableFilterEvent>();
    /**
     * Callback to invoke when paging, sorting or filtering happens in lazy mode.
     * @param {TableLazyLoadEvent} event - custom lazy loading event.
     * @group Emits
     */
    @Output() onLazyLoad: EventEmitter<TableLazyLoadEvent> = new EventEmitter<TableLazyLoadEvent>();
    /**
     * Callback to invoke when a row is expanded.
     * @param {TableRowExpandEvent} event - custom row expand event.
     * @group Emits
     */
    @Output() onRowExpand: EventEmitter<TableRowExpandEvent<RowData>> = new EventEmitter<TableRowExpandEvent<RowData>>();
    /**
     * Callback to invoke when a row is collapsed.
     * @param {TableRowCollapseEvent} event - custom row collapse event.
     * @group Emits
     */
    @Output() onRowCollapse: EventEmitter<TableRowCollapseEvent> = new EventEmitter<TableRowCollapseEvent>();
    /**
     * Callback to invoke when a row is selected with right click.
     * @param {TableContextMenuSelectEvent} event - custom context menu select event.
     * @group Emits
     */
    @Output() onContextMenuSelect: EventEmitter<TableContextMenuSelectEvent<RowData>> = new EventEmitter<TableContextMenuSelectEvent<RowData>>();
    /**
     * Callback to invoke when a column is resized.
     * @param {TableColResizeEvent} event - custom column resize event.
     * @group Emits
     */
    @Output() onColResize: EventEmitter<TableColResizeEvent> = new EventEmitter<TableColResizeEvent>();
    /**
     * Callback to invoke when a column is reordered.
     * @param {TableColumnReorderEvent} event - custom column reorder event.
     * @group Emits
     */
    @Output() onColReorder: EventEmitter<TableColumnReorderEvent> = new EventEmitter<TableColumnReorderEvent>();
    /**
     * Callback to invoke when a row is reordered.
     * @param {TableRowReorderEvent} event - custom row reorder event.
     * @group Emits
     */
    @Output() onRowReorder: EventEmitter<TableRowReorderEvent> = new EventEmitter<TableRowReorderEvent>();
    /**
     * Callback to invoke when a cell switches to edit mode.
     * @param {TableEditInitEvent} event - custom edit init event.
     * @group Emits
     */
    @Output() onEditInit: EventEmitter<TableEditInitEvent> = new EventEmitter<TableEditInitEvent>();
    /**
     * Callback to invoke when cell edit is completed.
     * @param {TableEditCompleteEvent} event - custom edit complete event.
     * @group Emits
     */
    @Output() onEditComplete: EventEmitter<TableEditCompleteEvent> = new EventEmitter<TableEditCompleteEvent>();
    /**
     * Callback to invoke when cell edit is cancelled with escape key.
     * @param {TableEditCancelEvent} event - custom edit cancel event.
     * @group Emits
     */
    @Output() onEditCancel: EventEmitter<TableEditCancelEvent> = new EventEmitter<TableEditCancelEvent>();
    /**
     * Callback to invoke when state of header checkbox changes.
     * @param {TableHeaderCheckboxToggleEvent} event - custom header checkbox event.
     * @group Emits
     */
    @Output()
    onHeaderCheckboxToggle: EventEmitter<TableHeaderCheckboxToggleEvent> = new EventEmitter<TableHeaderCheckboxToggleEvent>();
    /**
     * A function to implement custom sorting, refer to sorting section for details.
     * @param {any} any - sort meta.
     * @group Emits
     */
    @Output() sortFunction: EventEmitter<any> = new EventEmitter<any>();
    /**
     * Callback to invoke on pagination.
     * @param {number} number - first element.
     * @group Emits
     */
    @Output() firstChange: EventEmitter<number> = new EventEmitter<number>();
    /**
     * Callback to invoke on rows change.
     * @param {number} number - Row count.
     * @group Emits
     */
    @Output() rowsChange: EventEmitter<number> = new EventEmitter<number>();
    /**
     * Callback to invoke table state is saved.
     * @param {TableState} object - table state.
     * @group Emits
     */
    @Output() onStateSave: EventEmitter<TableState> = new EventEmitter<TableState>();
    /**
     * Callback to invoke table state is restored.
     * @param {TableState} object - table state.
     * @group Emits
     */
    @Output() onStateRestore: EventEmitter<TableState> = new EventEmitter<TableState>();

    @ViewChild('resizeHelper') resizeHelperViewChild: Nullable<ElementRef>;

    @ViewChild('reorderIndicatorUp')
    reorderIndicatorUpViewChild: Nullable<ElementRef>;

    @ViewChild('reorderIndicatorDown')
    reorderIndicatorDownViewChild: Nullable<ElementRef>;

    @ViewChild('wrapper') wrapperViewChild: Nullable<ElementRef>;

    @ViewChild('table') tableViewChild: Nullable<ElementRef>;

    @ViewChild('thead') tableHeaderViewChild: Nullable<ElementRef>;

    @ViewChild('tfoot') tableFooterViewChild: Nullable<ElementRef>;

    @ViewChild('scroller') scroller: Nullable<Scroller>;

    @ContentChildren(PrimeTemplate) _templates: Nullable<QueryList<PrimeTemplate>>;

    _value: RowData[] = [];

    _columns: any[] | undefined;

    _totalRecords: number = 0;

    _first: number | null | undefined = 0;

    _rows: number | undefined;

    filteredValue: any[] | undefined | null;

    // @todo will be refactored later
    @ContentChild('header', { descendants: false }) _headerTemplate: TemplateRef<any>;
    headerTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('headergrouped', { descendants: false }) _headerGroupedTemplate: TemplateRef<any>;
    headerGroupedTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('body', { descendants: false }) _bodyTemplate: TemplateRef<any>;
    bodyTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('loadingbody', { descendants: false }) _loadingBodyTemplate: TemplateRef<any>;
    loadingBodyTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('caption', { descendants: false }) _captionTemplate: TemplateRef<any>;
    captionTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('footer', { descendants: false }) _footerTemplate: TemplateRef<any>;
    footerTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('footergrouped', { descendants: false }) _footerGroupedTemplate: TemplateRef<any>;
    footerGroupedTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('summary', { descendants: false }) _summaryTemplate: TemplateRef<any>;
    summaryTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('colgroup', { descendants: false }) _colGroupTemplate: TemplateRef<any>;
    colGroupTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('expandedrow', { descendants: false }) _expandedRowTemplate: TemplateRef<any>;
    expandedRowTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('groupheader', { descendants: false }) _groupHeaderTemplate: TemplateRef<any>;
    groupHeaderTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('groupfooter', { descendants: false }) _groupFooterTemplate: TemplateRef<any>;
    groupFooterTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('frozenexpandedrow', { descendants: false }) _frozenExpandedRowTemplate: TemplateRef<any>;
    frozenExpandedRowTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('frozenheader', { descendants: false }) _frozenHeaderTemplate: TemplateRef<any>;
    frozenHeaderTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('frozenbody', { descendants: false }) _frozenBodyTemplate: TemplateRef<any>;
    frozenBodyTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('frozenfooter', { descendants: false }) _frozenFooterTemplate: TemplateRef<any>;
    frozenFooterTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('frozencolgroup', { descendants: false }) _frozenColGroupTemplate: TemplateRef<any>;
    frozenColGroupTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('emptymessage', { descendants: false }) _emptyMessageTemplate: TemplateRef<any>;
    emptyMessageTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('paginatorleft', { descendants: false }) _paginatorLeftTemplate: TemplateRef<any>;
    paginatorLeftTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('paginatorright', { descendants: false }) _paginatorRightTemplate: TemplateRef<any>;
    paginatorRightTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('paginatordropdownitem', { descendants: false }) _paginatorDropdownItemTemplate: TemplateRef<any>;
    paginatorDropdownItemTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('loadingicon', { descendants: false }) _loadingIconTemplate: TemplateRef<any>;
    loadingIconTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('reorderindicatorupicon', { descendants: false }) _reorderIndicatorUpIconTemplate: TemplateRef<any>;
    reorderIndicatorUpIconTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('reorderindicatordownicon', { descendants: false }) _reorderIndicatorDownIconTemplate: TemplateRef<any>;
    reorderIndicatorDownIconTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('sorticon', { descendants: false }) _sortIconTemplate: TemplateRef<any>;
    sortIconTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('checkboxicon', { descendants: false }) _checkboxIconTemplate: TemplateRef<any>;
    checkboxIconTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('headercheckboxicon', { descendants: false }) _headerCheckboxIconTemplate: TemplateRef<any>;
    headerCheckboxIconTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('paginatordropdownicon', { descendants: false }) _paginatorDropdownIconTemplate: TemplateRef<any>;
    paginatorDropdownIconTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('paginatorfirstpagelinkicon', { descendants: false }) _paginatorFirstPageLinkIconTemplate: TemplateRef<any>;
    paginatorFirstPageLinkIconTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('paginatorlastpagelinkicon', { descendants: false }) _paginatorLastPageLinkIconTemplate: TemplateRef<any>;
    paginatorLastPageLinkIconTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('paginatorpreviouspagelinkicon', { descendants: false }) _paginatorPreviousPageLinkIconTemplate: TemplateRef<any>;
    paginatorPreviousPageLinkIconTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('paginatornextpagelinkicon', { descendants: false }) _paginatorNextPageLinkIconTemplate: TemplateRef<any>;
    paginatorNextPageLinkIconTemplate: Nullable<TemplateRef<any>>;

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

    _multiSortMeta: SortMeta[] | undefined | null;

    _sortField: string | undefined | null;

    _sortOrder: number = 1;

    preventSelectionSetterPropagation: boolean | undefined;

    _selection: any;

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

    zone = inject(NgZone);

    _componentStyle = inject(TableStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    onInit() {
        if (this.lazy && this.lazyLoadOnInit) {
            if (!this.virtualScroll) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }

            if (this.restoringFilter) {
                this.restoringFilter = false;
            }
        }

        if (this.responsiveLayout === 'stack') {
            this.createResponsiveStyle();
        }

        this.initialized = true;
    }

    onAfterContentInit() {
        (this._templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'caption':
                    this.captionTemplate = item.template;
                    break;

                case 'header':
                    this.headerTemplate = item.template;
                    break;

                case 'headergrouped':
                    this.headerGroupedTemplate = item.template;
                    break;

                case 'body':
                    this.bodyTemplate = item.template;
                    break;

                case 'loadingbody':
                    this.loadingBodyTemplate = item.template;
                    break;

                case 'footer':
                    this.footerTemplate = item.template;
                    break;

                case 'footergrouped':
                    this.footerGroupedTemplate = item.template;
                    break;

                case 'summary':
                    this.summaryTemplate = item.template;
                    break;

                case 'colgroup':
                    this.colGroupTemplate = item.template;
                    break;

                case 'expandedrow':
                    this.expandedRowTemplate = item.template;
                    break;

                case 'groupheader':
                    this.groupHeaderTemplate = item.template;
                    break;

                case 'groupfooter':
                    this.groupFooterTemplate = item.template;
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

                case 'frozenexpandedrow':
                    this.frozenExpandedRowTemplate = item.template;
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

                case 'paginatordropdownicon':
                    this.paginatorDropdownIconTemplate = item.template;
                    break;

                case 'paginatordropdownitem':
                    this.paginatorDropdownItemTemplate = item.template;
                    break;

                case 'paginatorfirstpagelinkicon':
                    this.paginatorFirstPageLinkIconTemplate = item.template;
                    break;

                case 'paginatorlastpagelinkicon':
                    this.paginatorLastPageLinkIconTemplate = item.template;
                    break;

                case 'paginatorpreviouspagelinkicon':
                    this.paginatorPreviousPageLinkIconTemplate = item.template;
                    break;

                case 'paginatornextpagelinkicon':
                    this.paginatorNextPageLinkIconTemplate = item.template;
                    break;

                case 'loadingicon':
                    this.loadingIconTemplate = item.template;
                    break;

                case 'reorderindicatorupicon':
                    this.reorderIndicatorUpIconTemplate = item.template;
                    break;

                case 'reorderindicatordownicon':
                    this.reorderIndicatorDownIconTemplate = item.template;
                    break;

                case 'sorticon':
                    this.sortIconTemplate = item.template;
                    break;

                case 'checkboxicon':
                    this.checkboxIconTemplate = item.template;
                    break;

                case 'headercheckboxicon':
                    this.headerCheckboxIconTemplate = item.template;
                    break;
            }
        });
    }

    onAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.isStateful() && this.resizableColumns) {
                this.restoreColumnWidths();
            }
        }
    }

    onChanges(simpleChange: SimpleChanges) {
        if (simpleChange.totalRecords && simpleChange.totalRecords.firstChange) {
            this._totalRecords = simpleChange.totalRecords.currentValue;
        }

        if (simpleChange.value) {
            if (this.isStateful() && !this.stateRestored && isPlatformBrowser(this.platformId)) {
                this.restoreState();
            }

            this._value = simpleChange.value.currentValue;

            if (!this.lazy) {
                this.totalRecords = this._totalRecords === 0 && this._value ? this._value.length : (this._totalRecords ?? 0);

                if (this.sortMode == 'single' && (this.sortField || this.groupRowsBy)) this.sortSingle();
                else if (this.sortMode == 'multiple' && (this.multiSortMeta || this.groupRowsBy)) this.sortMultiple();
                else if (this.hasFilter())
                    //sort already filters
                    this._filter();
            }

            this.tableService.onValueChange(simpleChange.value.currentValue);
        }

        if (simpleChange.columns) {
            if (!this.isStateful()) {
                this._columns = simpleChange.columns.currentValue;
                this.tableService.onColumnsChange(simpleChange.columns.currentValue);
            }

            if (this._columns && this.isStateful() && this.reorderableColumns && !this.columnOrderStateRestored) {
                this.restoreColumnOrder();

                this.tableService.onColumnsChange(this._columns);
            }
        }

        if (simpleChange.sortField) {
            this._sortField = simpleChange.sortField.currentValue;

            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                if (this.sortMode === 'single') {
                    this.sortSingle();
                }
            }
        }

        if (simpleChange.groupRowsBy) {
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                if (this.sortMode === 'single') {
                    this.sortSingle();
                }
            }
        }

        if (simpleChange.sortOrder) {
            this._sortOrder = simpleChange.sortOrder.currentValue;

            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                if (this.sortMode === 'single') {
                    this.sortSingle();
                }
            }
        }

        if (simpleChange.groupRowsByOrder) {
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                if (this.sortMode === 'single') {
                    this.sortSingle();
                }
            }
        }

        if (simpleChange.multiSortMeta) {
            this._multiSortMeta = simpleChange.multiSortMeta.currentValue;
            if (this.sortMode === 'multiple' && (this.initialized || (!this.lazy && !this.virtualScroll))) {
                this.sortMultiple();
            }
        }

        if (simpleChange.selection) {
            this._selection = simpleChange.selection.currentValue;

            if (!this.preventSelectionSetterPropagation) {
                this.updateSelectionKeys();
                this.tableService.onSelectionChange();
            }
            this.preventSelectionSetterPropagation = false;
        }

        if (simpleChange.selectAll) {
            this._selectAll = simpleChange.selectAll.currentValue;

            if (!this.preventSelectionSetterPropagation) {
                this.updateSelectionKeys();
                this.tableService.onSelectionChange();

                if (this.isStateful()) {
                    this.saveState();
                }
            }
            this.preventSelectionSetterPropagation = false;
        }
    }

    get processedData() {
        return this.filteredValue || this.value || [];
    }

    private _initialColWidths: number[];

    dataToRender(data: any) {
        const _data = data || this.processedData;

        if (_data && this.paginator) {
            const first = this.lazy ? 0 : this.first;
            return _data.slice(first, <number>first + <number>this.rows);
        }

        return _data;
    }

    updateSelectionKeys() {
        if (this.dataKey && this._selection) {
            this.selectionKeys = {};
            if (Array.isArray(this._selection)) {
                for (let data of this._selection) {
                    this.selectionKeys[String(ObjectUtils.resolveFieldData(data, this.dataKey))] = 1;
                }
            } else {
                this.selectionKeys[String(ObjectUtils.resolveFieldData(this._selection, this.dataKey))] = 1;
            }
        }
    }

    onPageChange(event: TablePageEvent) {
        this.first = event.first;
        this.rows = event.rows;

        this.onPage.emit({
            first: this.first,
            rows: <number>this.rows
        });

        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }

        this.firstChange.emit(this.first);
        this.rowsChange.emit(this.rows);
        this.tableService.onValueChange(this.value);

        if (this.isStateful()) {
            this.saveState();
        }

        this.anchorRowIndex = null;

        if (this.scrollable) {
            this.resetScrollTop();
        }
    }

    sort(event: any) {
        let originalEvent = event.originalEvent;

        if (this.sortMode === 'single') {
            this._sortOrder = this.sortField === event.field ? this.sortOrder * -1 : this.defaultSortOrder;
            this._sortField = event.field;

            if (this.resetPageOnSort) {
                this._first = 0;
                this.firstChange.emit(this._first);

                if (this.scrollable) {
                    this.resetScrollTop();
                }
            }

            this.sortSingle();
        }
        if (this.sortMode === 'multiple') {
            let metaKey = (<KeyboardEvent>originalEvent).metaKey || (<KeyboardEvent>originalEvent).ctrlKey;
            let sortMeta = this.getSortMeta(<string>event.field);

            if (sortMeta) {
                if (!metaKey) {
                    this._multiSortMeta = [
                        {
                            field: <string>event.field,
                            order: sortMeta.order * -1
                        }
                    ];

                    if (this.resetPageOnSort) {
                        this._first = 0;
                        this.firstChange.emit(this._first);

                        if (this.scrollable) {
                            this.resetScrollTop();
                        }
                    }
                } else {
                    sortMeta.order = sortMeta.order * -1;
                }
            } else {
                if (!metaKey || !this.multiSortMeta) {
                    this._multiSortMeta = [];

                    if (this.resetPageOnSort) {
                        this._first = 0;
                        this.firstChange.emit(this._first);
                    }
                }
                (<SortMeta[]>this._multiSortMeta).push({
                    field: <string>event.field,
                    order: this.defaultSortOrder
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
        let field = this.sortField || this.groupRowsBy;
        let order = this.sortField ? this.sortOrder : this.groupRowsByOrder;
        if (this.groupRowsBy && this.sortField && this.groupRowsBy !== this.sortField) {
            this._multiSortMeta = [this.getGroupRowsMeta(), { field: this.sortField, order: this.sortOrder }];
            this.sortMultiple();
            return;
        }

        if (field && order) {
            if (this.restoringSort) {
                this.restoringSort = false;
            }

            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            } else if (this.value) {
                if (this.customSort) {
                    this.sortFunction.emit({
                        data: this.value,
                        mode: this.sortMode,
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

                    this._value = [...this.value];
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
        if (this.groupRowsBy) {
            if (!this._multiSortMeta) this._multiSortMeta = [this.getGroupRowsMeta()];
            else if ((<SortMeta[]>this.multiSortMeta)[0].field !== this.groupRowsBy) this._multiSortMeta = [this.getGroupRowsMeta(), ...this._multiSortMeta];
        }

        if (this.multiSortMeta) {
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            } else if (this.value) {
                if (this.customSort) {
                    this.sortFunction.emit({
                        data: this.value,
                        mode: this.sortMode,
                        multiSortMeta: this.multiSortMeta
                    });
                } else {
                    this.value.sort((data1, data2) => {
                        return this.multisortField(data1, data2, <SortMeta[]>this.multiSortMeta, 0);
                    });

                    this._value = [...this.value];
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
        if (ObjectUtils.compare(value1, value2, this.filterLocale) === 0) {
            return multiSortMeta.length - 1 > index ? this.multisortField(data1, data2, multiSortMeta, index + 1) : 0;
        }
        return this.compareValuesOnSort(value1, value2, multiSortMeta[index].order);
    }

    compareValuesOnSort(value1: any, value2: any, order: any) {
        return ObjectUtils.sort(value1, value2, order, this.filterLocale, this.sortOrder);
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
        if (this.sortMode === 'single') {
            return this.sortField && this.sortField === field;
        } else if (this.sortMode === 'multiple') {
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

        if (this.selectionMode) {
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

                let metaSelection = this.rowTouched ? false : this.metaKeySelection;
                let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;
                this.anchorRowIndex = rowIndex;
                this.rangeRowIndex = rowIndex;

                if (metaSelection) {
                    let metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;

                    if (selected && metaKey) {
                        if (this.isSingleSelectionMode()) {
                            this._selection = null;
                            this.selectionKeys = {};
                            this.selectionChange.emit(null);
                        } else {
                            let selectionIndex = this.findIndexInSelection(rowData);
                            this._selection = this.selection.filter((val: any, i: number) => i != selectionIndex);
                            this.selectionChange.emit(this.selection);
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
                            this._selection = rowData;
                            this.selectionChange.emit(rowData);
                            if (dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        } else if (this.isMultipleSelectionMode()) {
                            if (metaKey) {
                                this._selection = this.selection || [];
                            } else {
                                this._selection = [];
                                this.selectionKeys = {};
                            }

                            this._selection = [...this.selection, rowData];
                            this.selectionChange.emit(this.selection);
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
                    if (this.selectionMode === 'single') {
                        if (selected) {
                            this._selection = null;
                            this.selectionKeys = {};
                            this.selectionChange.emit(this.selection);
                            this.onRowUnselect.emit({
                                originalEvent: event.originalEvent,
                                data: rowData,
                                type: 'row',
                                index: rowIndex
                            });
                        } else {
                            this._selection = rowData;
                            this.selectionChange.emit(this.selection);
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
                    } else if (this.selectionMode === 'multiple') {
                        if (selected) {
                            let selectionIndex = this.findIndexInSelection(rowData);
                            this._selection = this.selection.filter((val: any, i: number) => i != selectionIndex);
                            this.selectionChange.emit(this.selection);
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
                            this._selection = this.selection ? [...this.selection, rowData] : [rowData];
                            this.selectionChange.emit(this.selection);
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
        if (this.contextMenu) {
            const rowData = event.rowData;
            const rowIndex = event.rowIndex;

            const showContextMenu = () => {
                this.contextMenu.show(event.originalEvent);
                this.contextMenu.hideCallback = () => {
                    this.contextMenuSelection = null;
                    this.contextMenuSelectionChange.emit(null);
                    this.tableService.onContextMenu(null);
                };
            };

            if (this.contextMenuSelectionMode === 'separate') {
                this.contextMenuSelection = rowData;
                this.contextMenuSelectionChange.emit(rowData);
                this.tableService.onContextMenu(rowData);
                showContextMenu();
                this.onContextMenuSelect.emit({
                    originalEvent: event.originalEvent,
                    data: rowData,
                    index: event.rowIndex
                });
            } else if (this.contextMenuSelectionMode === 'joint') {
                this.preventSelectionSetterPropagation = true;
                let selected = this.isSelected(rowData);
                let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;

                if (!selected) {
                    if (!this.isRowSelectable(rowData, rowIndex)) {
                        return;
                    }

                    if (this.isSingleSelectionMode()) {
                        this.selection = rowData;
                        this.selectionChange.emit(rowData);

                        if (dataKeyValue) {
                            this.selectionKeys = {};
                            this.selectionKeys[dataKeyValue] = 1;
                        }
                    } else if (this.isMultipleSelectionMode()) {
                        this._selection = this.selection ? [...this.selection, rowData] : [rowData];
                        this.selectionChange.emit(this.selection);

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

        if (this.lazy && this.paginator) {
            (rangeStart as number) -= <number>this.first;
            (rangeEnd as number) -= <number>this.first;
        }

        let rangeRowsData: RowData[] = [];
        for (let i = <number>rangeStart; i <= <number>rangeEnd; i++) {
            let rangeRowData = this.filteredValue ? this.filteredValue[i] : this.value[i];
            if (!this.isSelected(rangeRowData) && !isMetaKeySelection) {
                if (!this.isRowSelectable(rangeRowData, rowIndex)) {
                    continue;
                }

                rangeRowsData.push(rangeRowData);
                this._selection = [...this.selection, rangeRowData];
                let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rangeRowData, this.dataKey)) : null;
                if (dataKeyValue) {
                    this.selectionKeys[dataKeyValue] = 1;
                }
            }
        }
        this.selectionChange.emit(this.selection);
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

        for (let i = <number>rangeStart; i <= <number>rangeEnd; i++) {
            let rangeRowData = this.value[i];
            let selectionIndex = this.findIndexInSelection(rangeRowData);
            this._selection = this.selection.filter((val: any, i: number) => i != selectionIndex);
            let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rangeRowData, this.dataKey)) : null;
            if (dataKeyValue) {
                delete this.selectionKeys[dataKeyValue];
            }
            this.onRowUnselect.emit({
                originalEvent: event,
                data: rangeRowData,
                type: 'row'
            });
        }
    }

    isSelected(rowData: any) {
        if (rowData && this.selection) {
            if (this.dataKey) {
                return this.selectionKeys[ObjectUtils.resolveFieldData(rowData, this.dataKey)] !== undefined;
            } else {
                if (Array.isArray(this.selection)) return this.findIndexInSelection(rowData) > -1;
                else return this.equals(rowData, this.selection);
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

    isRowSelectable(data: any, index: number) {
        if (this.rowSelectable && !this.rowSelectable({ data, index })) {
            return false;
        }

        return true;
    }

    toggleRowWithRadio(event: any, rowData: any) {
        this.preventSelectionSetterPropagation = true;

        if (this.selection != rowData) {
            if (!this.isRowSelectable(rowData, event.rowIndex)) {
                return;
            }

            this._selection = rowData;
            this.selectionChange.emit(this.selection);
            this.onRowSelect.emit({
                originalEvent: event.originalEvent,
                index: event.rowIndex,
                data: rowData,
                type: 'radiobutton'
            });

            if (this.dataKey) {
                this.selectionKeys = {};
                this.selectionKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey))] = 1;
            }
        } else {
            this._selection = null;
            this.selectionChange.emit(this.selection);
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
        this.selection = this.selection || [];
        let selected = this.isSelected(rowData);
        let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;
        this.preventSelectionSetterPropagation = true;

        if (selected) {
            let selectionIndex = this.findIndexInSelection(rowData);
            this._selection = this.selection.filter((val: any, i: number) => i != selectionIndex);
            this.selectionChange.emit(this.selection);
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

            this._selection = this.selection ? [...this.selection, rowData] : [rowData];
            this.selectionChange.emit(this.selection);
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
            const data = this.selectionPageOnly ? this.dataToRender(this.processedData) : this.processedData;
            let selection = this.selectionPageOnly && this._selection ? this._selection.filter((s: any) => !data.some((d: any) => this.equals(s, d))) : [];

            if (check) {
                selection = this.frozenValue ? [...selection, ...this.frozenValue, ...data] : [...selection, ...data];
                selection = this.rowSelectable ? selection.filter((data: any, index: number) => this.rowSelectable({ data, index })) : selection;
            }

            this._selection = selection;
            this.preventSelectionSetterPropagation = true;
            this.updateSelectionKeys();
            this.selectionChange.emit(this._selection);
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
        return this.compareSelectionBy === 'equals' ? data1 === data2 : ObjectUtils.equals(data1, data2, this.dataKey);
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
        }, this.filterDelay);

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
            this.first = 0;
            this.firstChange.emit(this.first);
        }

        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        } else {
            if (!this.value) {
                return;
            }
            if (!this.hasFilter()) {
                this.filteredValue = null;
                if (this.paginator) {
                    this.totalRecords = this._totalRecords === 0 && this.value ? this.value.length : this._totalRecords;
                }
            } else {
                let globalFilterFieldsArray;
                if (this.filters['global']) {
                    if (!this.columns && !this.globalFilterFields) throw new Error('Global filtering requires dynamic columns or globalFilterFields to be defined.');
                    else globalFilterFieldsArray = this.globalFilterFields || this.columns;
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
                            globalMatch = (<any>this.filterService).filters[(<any>this.filters['global']).matchMode](ObjectUtils.resolveFieldData(this.value[i], globalFilterField), (<FilterMetadata>this.filters['global']).value, this.filterLocale);

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

                if (this.paginator) {
                    this.totalRecords = this.filteredValue ? this.filteredValue.length : this._totalRecords === 0 && this.value ? this.value.length : (this._totalRecords ?? 0);
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

        if (this.scrollable) {
            this.resetScrollTop();
        }
    }

    executeLocalFilter(field: string, rowData: any, filterMeta: FilterMetadata): boolean {
        let filterValue = filterMeta.value;
        let filterMatchMode = filterMeta.matchMode || FilterMatchMode.STARTS_WITH;
        let dataFieldValue = ObjectUtils.resolveFieldData(rowData, field);
        let filterConstraint = (<any>this.filterService).filters[filterMatchMode];

        return filterConstraint(dataFieldValue, filterValue, this.filterLocale);
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
            first: this.first,
            rows: this.rows,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            filters: this.filters,
            globalFilter: this.filters && this.filters['global'] ? (<FilterMetadata>this.filters['global']).value : null,
            multiSortMeta: this.multiSortMeta,
            forceUpdate: () => this.cd.detectChanges()
        };
    }

    public clear() {
        this._sortField = null;
        this._sortOrder = this.defaultSortOrder;
        this._multiSortMeta = null;
        this.tableService.onSort(null);

        this.clearFilterValues();

        this.filteredValue = null;

        this.first = 0;
        this.firstChange.emit(this.first);

        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        } else {
            this.totalRecords = this._totalRecords === 0 && this._value ? this._value.length : (this._totalRecords ?? 0);
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
        return column[<string>this.exportHeader] || column.header || column.field;
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
            data = this.selection || [];
        } else if (options && options.allValues) {
            data = this.value || [];
        } else {
            data = this.filteredValue || this.value;

            if (this.frozenValue) {
                data = data ? [...this.frozenValue, ...data] : this.frozenValue;
            }
        }

        const exportableColumns: any[] = (<any[]>columns).filter((column) => column.exportable !== false && column.field);

        //headers
        csv += exportableColumns.map((column) => '"' + this.getExportHeader(column) + '"').join(this.csvSeparator);

        //body
        const body = data
            .map((record: any) =>
                exportableColumns
                    .map((column) => {
                        let cellData = ObjectUtils.resolveFieldData(record, column.field);

                        if (cellData != null) {
                            if (this.exportFunction) {
                                cellData = this.exportFunction({
                                    data: cellData,
                                    field: column.field
                                });
                            } else cellData = String(cellData).replace(/"/g, '""');
                        } else cellData = '';

                        return '"' + cellData + '"';
                    })
                    .join(this.csvSeparator)
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
            link.setAttribute('download', this.exportFilename + '.csv');
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
        if (this.virtualScroll) this.scrollToVirtualIndex(0);
        else this.scrollTo({ top: 0 });
    }
    /**
     * Scrolls to given index when using virtual scroll.
     * @param {number} index - index of the element.
     * @group Method
     */
    public scrollToVirtualIndex(index: number) {
        this.scroller && this.scroller.scrollToIndex(index);
    }
    /**
     * Scrolls to given index.
     * @param {ScrollToOptions} options - scroll options.
     * @group Method
     */
    public scrollTo(options: any) {
        if (this.virtualScroll) {
            this.scroller?.scrollTo(options);
        } else if (this.wrapperViewChild && this.wrapperViewChild.nativeElement) {
            if (this.wrapperViewChild.nativeElement.scrollTo) {
                this.wrapperViewChild.nativeElement.scrollTo(options);
            } else {
                this.wrapperViewChild.nativeElement.scrollLeft = options.left;
                this.wrapperViewChild.nativeElement.scrollTop = options.top;
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
        let dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));
        this.editingRowKeys[dataKeyValue] = true;
    }

    saveRowEdit(rowData: any, rowElement: HTMLTableRowElement) {
        if (DomHandler.find(rowElement, '.ng-invalid.ng-dirty').length === 0) {
            let dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));
            delete this.editingRowKeys[dataKeyValue];
        }
    }

    cancelRowEdit(rowData: any) {
        let dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));
        delete this.editingRowKeys[dataKeyValue];
    }

    toggleRow(rowData: any, event?: Event) {
        if (!this.dataKey && !this.groupRowsBy) {
            throw new Error('dataKey or groupRowsBy must be defined to use row expansion');
        }

        let dataKeyValue = this.groupRowsBy ? String(ObjectUtils.resolveFieldData(rowData, this.groupRowsBy)) : String(ObjectUtils.resolveFieldData(rowData, this.dataKey));

        if (this.expandedRowKeys[dataKeyValue] != null) {
            delete this.expandedRowKeys[dataKeyValue];
            this.onRowCollapse.emit({
                originalEvent: <Event>event,
                data: rowData
            });
        } else {
            if (this.rowExpandMode === 'single') {
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
        return this.groupRowsBy ? this.expandedRowKeys[String(ObjectUtils.resolveFieldData(rowData, this.groupRowsBy))] === true : this.expandedRowKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey))] === true;
    }

    isRowEditing(rowData: any): boolean {
        return this.editingRowKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey))] === true;
    }

    isSingleSelectionMode() {
        return this.selectionMode === 'single';
    }

    isMultipleSelectionMode() {
        return this.selectionMode === 'multiple';
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
        (<ElementRef>this.resizeHelperViewChild).nativeElement.style.height = this.el?.nativeElement.offsetHeight + 'px';
        (<ElementRef>this.resizeHelperViewChild).nativeElement.style.top = 0 + 'px';
        if (event.type == 'touchmove') {
            (<ElementRef>this.resizeHelperViewChild).nativeElement.style.left = event.changedTouches[0].clientX - containerLeft + this.el?.nativeElement.scrollLeft + 'px';
        } else {
            (<ElementRef>this.resizeHelperViewChild).nativeElement.style.left = event.pageX - containerLeft + this.el?.nativeElement.scrollLeft + 'px';
        }
        (<ElementRef>this.resizeHelperViewChild).nativeElement.style.display = 'block';
    }

    onColumnResizeEnd() {
        const isRTL = getComputedStyle(this.el?.nativeElement ?? document.documentElement).direction === 'rtl';
        const rawDelta = this.resizeHelperViewChild?.nativeElement.offsetLeft - <number>this.lastResizerHelperX;
        const delta = isRTL ? -rawDelta : rawDelta;
        const columnWidth = this.resizeColumnElement.offsetWidth;
        const newColumnWidth = columnWidth + delta;
        const elementMinWidth = this.resizeColumnElement.style.minWidth.replace(/[^\d.]/g, '');
        const minWidth = elementMinWidth ? parseFloat(elementMinWidth) : 15;

        if (newColumnWidth >= minWidth) {
            if (this.columnResizeMode === 'fit') {
                const nextColumn = this.resizeColumnElement.nextElementSibling as HTMLElement;
                const nextColumnWidth = nextColumn.offsetWidth - delta;

                if (newColumnWidth > 15 && nextColumnWidth > 15) {
                    this.resizeTableCells(newColumnWidth, nextColumnWidth);
                }
            } else if (this.columnResizeMode === 'expand') {
                this._initialColWidths = this._totalTableWidth();
                const tableWidth = this.tableViewChild?.nativeElement.offsetWidth + delta;

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

        (<ElementRef>this.resizeHelperViewChild).nativeElement.style.display = 'none';
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
        this.reorderIconWidth = DomHandler.getHiddenElementOuterWidth(this.reorderIndicatorUpViewChild?.nativeElement);
        this.reorderIconHeight = DomHandler.getHiddenElementOuterHeight(this.reorderIndicatorDownViewChild?.nativeElement);
        this.draggedColumn = columnElement;
        event.dataTransfer.setData('text', 'b'); // For firefox
    }

    onColumnDragEnter(event: any, dropHeader: any) {
        if (this.reorderableColumns && this.draggedColumn && dropHeader) {
            event.preventDefault();
            let containerOffset = DomHandler.getOffset(this.el?.nativeElement);
            let dropHeaderOffset = DomHandler.getOffset(dropHeader);

            if (this.draggedColumn != dropHeader) {
                let dragIndex = DomHandler.indexWithinGroup(this.draggedColumn, 'preorderablecolumn');
                let dropIndex = DomHandler.indexWithinGroup(dropHeader, 'preorderablecolumn');
                let targetLeft = dropHeaderOffset.left - containerOffset.left;
                let targetTop = containerOffset.top - dropHeaderOffset.top;
                let columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;

                (<ElementRef>this.reorderIndicatorUpViewChild).nativeElement.style.top = dropHeaderOffset.top - containerOffset.top - (<number>this.reorderIconHeight - 1) + 'px';
                (<ElementRef>this.reorderIndicatorDownViewChild).nativeElement.style.top = dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + 'px';

                if (event.pageX > columnCenter) {
                    (<ElementRef>this.reorderIndicatorUpViewChild).nativeElement.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(<number>this.reorderIconWidth / 2) + 'px';
                    (<ElementRef>this.reorderIndicatorDownViewChild).nativeElement.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(<number>this.reorderIconWidth / 2) + 'px';
                    this.dropPosition = 1;
                } else {
                    (<ElementRef>this.reorderIndicatorUpViewChild).nativeElement.style.left = targetLeft - Math.ceil(<number>this.reorderIconWidth / 2) + 'px';
                    (<ElementRef>this.reorderIndicatorDownViewChild).nativeElement.style.left = targetLeft - Math.ceil(<number>this.reorderIconWidth / 2) + 'px';
                    this.dropPosition = -1;
                }
                (<ElementRef>this.reorderIndicatorUpViewChild).nativeElement.style.display = 'block';
                (<ElementRef>this.reorderIndicatorDownViewChild).nativeElement.style.display = 'block';
            } else {
                event.dataTransfer.dropEffect = 'none';
            }
        }
    }

    onColumnDragLeave(event: Event) {
        if (this.reorderableColumns && this.draggedColumn) {
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
                    this.zone.runOutsideAngular(() => {
                        setTimeout(() => {
                            this.saveState();
                        });
                    });
                }
            }

            if (this.resizableColumns && this.resizeColumnElement) {
                let width = this.columnResizeMode === 'expand' ? this._initialColWidths : this._totalTableWidth();
                ObjectUtils.reorderArray(width, dragIndex + 1, dropIndex + 1);
                this.updateStyleElement(width, dragIndex, 0, 0);
            }

            (<ElementRef>this.reorderIndicatorUpViewChild).nativeElement.style.display = 'none';
            (<ElementRef>this.reorderIndicatorDownViewChild).nativeElement.style.display = 'none';
            this.draggedColumn.draggable = false;
            this.draggedColumn = null;
            this.dropPosition = null;
        }
    }

    resizeTableCells(newColumnWidth: number, nextColumnWidth: number | null) {
        let colIndex = DomHandler.index(this.resizeColumnElement);
        let width = this.columnResizeMode === 'expand' ? this._initialColWidths : this._totalTableWidth();
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

            if (this.virtualScroll) {
                // TODO: Check
                this._value = [...this._value];
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

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

    getStorage() {
        if (isPlatformBrowser(this.platformId)) {
            switch (this.stateStorage) {
                case 'local':
                    return window.localStorage;

                case 'session':
                    return window.sessionStorage;

                default:
                    throw new Error(this.stateStorage + ' is not a valid value for the state storage, supported values are "local" and "session".');
            }
        } else {
            throw new Error('Browser storage is not available in the server side.');
        }
    }

    isStateful() {
        return this.stateKey != null;
    }

    saveState() {
        const storage = this.getStorage();
        let state: TableState = {};

        if (this.paginator) {
            state.first = <number>this.first;
            state.rows = this.rows;
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

        if (this.resizableColumns) {
            this.saveColumnWidths(state);
        }

        if (this.reorderableColumns) {
            this.saveColumnOrder(state);
        }

        if (this.selection) {
            state.selection = this.selection;
        }

        if (Object.keys(this.expandedRowKeys).length) {
            state.expandedRowKeys = this.expandedRowKeys;
        }

        storage.setItem(<string>this.stateKey, JSON.stringify(state));
        this.onStateSave.emit(state);
    }

    clearState() {
        const storage = this.getStorage();

        if (this.stateKey) {
            storage.removeItem(this.stateKey);
        }
    }

    restoreState() {
        const storage = this.getStorage();
        const stateString = storage.getItem(<string>this.stateKey);
        const dateFormat = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;
        const reviver = function (key: any, value: any) {
            if (typeof value === 'string' && dateFormat.test(value)) {
                return new Date(value);
            }

            return value;
        };

        if (stateString) {
            let state: TableState = JSON.parse(stateString, reviver);

            if (this.paginator) {
                if (this.first !== undefined) {
                    this.first = state.first;
                    this.firstChange.emit(this.first);
                }

                if (this.rows !== undefined) {
                    this.rows = state.rows;
                    this.rowsChange.emit(this.rows);
                }
            }

            if (state.sortField) {
                this.restoringSort = true;
                this._sortField = state.sortField;
                this._sortOrder = <number>state.sortOrder;
            }

            if (state.multiSortMeta) {
                this.restoringSort = true;
                this._multiSortMeta = state.multiSortMeta;
            }

            if (state.filters) {
                this.restoringFilter = true;
                this.filters = state.filters;
            }

            if (this.resizableColumns) {
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
                Promise.resolve(null).then(() => this.selectionChange.emit(state.selection));
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

        if (this.columnResizeMode === 'expand' && this.tableViewChild) {
            state.tableWidth = DomHandler.getOuterWidth(this.tableViewChild.nativeElement);
        }
    }

    setResizeTableWidth(width: string) {
        (<ElementRef>this.tableViewChild).nativeElement.style.width = width;
        (<ElementRef>this.tableViewChild).nativeElement.style.minWidth = width;
    }

    restoreColumnWidths() {
        if (this.columnWidthsState) {
            let widths = this.columnWidthsState.split(',');

            if (this.columnResizeMode === 'expand' && this.tableWidthState) {
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
        const stateString = storage.getItem(<string>this.stateKey);
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
        return { field: this.groupRowsBy, order: this.groupRowsByOrder };
    }

    createResponsiveStyle() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.responsiveStyleElement) {
                this.responsiveStyleElement = this.renderer.createElement('style');
                this.responsiveStyleElement.type = 'text/css';
                DomHandler.setAttribute(this.responsiveStyleElement, 'nonce', this.config?.csp()?.nonce);
                this.renderer.appendChild(this.document.head, this.responsiveStyleElement);

                let innerHTML = `
    @media screen and (max-width: ${this.breakpoint}) {
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
            scrollable: this.scrollable,
            'flex-scrollable': this.scrollable && this.scrollHeight === 'flex',
            [this.size as string]: this.size,
            loading: this.loading,
            empty: this.isEmpty()
        });
    }
}
