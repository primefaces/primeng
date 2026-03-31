import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, computed, contentChild, effect, ElementRef, inject, input, numberAttribute, output, TemplateRef, untracked, viewChild, ViewEncapsulation } from '@angular/core';
import { addStyle, calculateScrollbarWidth, equals, find, findSingle, getHiddenElementOuterHeight, getHiddenElementOuterWidth, getIndex, getOffset, isClickable, isEmpty, removeClass, reorderArray, resolveFieldData } from '@primeuix/utils';
import { BlockableUI, FilterMetadata, FilterService, ScrollerOptions, SortMeta, TreeNode, TreeTableNode } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { DomHandler } from 'primeng/dom';
import { ArrowDown as ArrowDownIcon } from '@primeicons/angular/arrow-down';
import { ArrowUp as ArrowUpIcon } from '@primeicons/angular/arrow-up';
import { Spinner as SpinnerIcon } from '@primeicons/angular/spinner';
import { PaginatorModule } from 'primeng/paginator';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import type { CSSProperties } from 'primeng/types/shared';
import {
    TreeTableBodyTemplateContext,
    TreeTableCheckboxIconTemplateContext,
    TreeTableColResizeEvent,
    TreeTableColumnReorderEvent,
    TreeTableColumnsTemplateContext,
    TreeTableContextMenuSelectEvent,
    TreeTableEditEvent,
    TreeTableEmptyMessageTemplateContext,
    TreeTableFilterEvent,
    TreeTableFilterOptions,
    TreeTableHeaderCheckboxIconTemplateContext,
    TreeTableHeaderCheckboxToggleEvent,
    TreeTableLazyLoadEvent,
    TreeTableNodeCollapseEvent,
    TreeTableNodeExpandEvent,
    TreeTableColumnResizeMode,
    TreeTableCompareSelectionBy,
    TreeTableFilterMode,
    TreeTableNodeUnSelectEvent,
    TreeTablePaginatorPosition,
    TreeTablePaginatorState,
    TreeTablePassThrough,
    TreeTableSelectionMode,
    TreeTableSortEvent,
    TreeTableSortMode,
    TreeTableSortIconTemplateContext,
    TreeTableTogglerIconTemplateContext
} from 'primeng/types/treetable';
import { TreeTableStyle } from './style/treetablestyle';
import { TTBody } from './treetable-body';
import { TTScrollableView } from './treetable-scrollable-view';
import { TREETABLE_INSTANCE, TreeTableService } from './treetable-service';

/**
 * TreeTable is used to display hierarchical data in tabular format.
 * @group Components
 */
@Component({
    selector: 'p-treetable, p-tree-table',
    standalone: true,
    imports: [NgTemplateOutlet, Bind, PaginatorModule, SpinnerIcon, ArrowDownIcon, ArrowUpIcon, TTScrollableView, TTBody],
    template: `
        @if (showLoadingMask()) {
            <div [pBind]="ptm('mask')" [class]="cx('mask')" animate.enter="p-overlay-mask-enter-active" animate.leave="p-overlay-mask-leave-active">
                @if (loadingIcon()) {
                    <i [class]="cn(cx('loadingIcon'), 'pi-spin' + loadingIcon())"></i>
                }
                @if (!loadingIcon()) {
                    @if (!loadingIconTemplate()) {
                        <svg data-p-icon="spinner" [class]="cn(cx('loadingIcon'), 'animate-spin')" />
                    }
                    @if (loadingIconTemplate()) {
                        <span [class]="cx('loadingIcon')">
                            <ng-template *ngTemplateOutlet="loadingIconTemplate()"></ng-template>
                        </span>
                    }
                }
            </div>
        }
        @if (captionTemplate()) {
            <div [pBind]="ptm('header')" [class]="cx('header')">
                <ng-container *ngTemplateOutlet="captionTemplate()"></ng-container>
            </div>
        }
        @if (showTopPaginator()) {
            <p-paginator
                [pt]="ptm('pcPaginator')"
                [rows]="rows()"
                [first]="first"
                [totalRecords]="totalRecords"
                [pageLinkSize]="pageLinks()"
                [class]="cx('pcPaginator')"
                [alwaysShow]="alwaysShowPaginator()"
                (onPageChange)="onPageChange($event)"
                [rowsPerPageOptions]="rowsPerPageOptions()"
                [templateLeft]="paginatorLeftTemplate()"
                [templateRight]="paginatorRightTemplate()"
                [appendTo]="paginatorDropdownAppendTo()"
                [currentPageReportTemplate]="currentPageReportTemplate()"
                [showFirstLastIcon]="showFirstLastIcon()"
                [dropdownItemTemplate]="paginatorDropdownItemTemplate()"
                [showCurrentPageReport]="showCurrentPageReport()"
                [showJumpToPageDropdown]="showJumpToPageDropdown()"
                [showPageLinks]="showPageLinks()"
                [locale]="paginatorLocale()"
                [unstyled]="unstyled()"
            >
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

        @if (!scrollable()) {
            <div [pBind]="ptm('wrapper')" [class]="cx('wrapper')">
                <table role="treegrid" [pBind]="ptm('table')" #table [class]="tableStyleClass()" [style]="tableStyle()">
                    <ng-container *ngTemplateOutlet="colGroupTemplate(); context: { $implicit: columns() }"></ng-container>
                    <thead role="rowgroup" [class]="cx('thead')" [pBind]="ptm('thead')">
                        <ng-container *ngTemplateOutlet="headerTemplate(); context: { $implicit: columns() }"></ng-container>
                    </thead>
                    <tbody [class]="cx('tbody')" [pBind]="ptm('tbody')" role="rowgroup" [unstyled]="unstyled()" [pTreeTableBody]="columns()" [pTreeTableBodyTemplate]="bodyTemplate()"></tbody>
                    <tfoot [class]="cx('tfoot')" [pBind]="ptm('tfoot')" role="rowgroup">
                        <ng-container *ngTemplateOutlet="footerTemplate(); context: { $implicit: columns() }"></ng-container>
                    </tfoot>
                </table>
            </div>
        }

        @if (scrollable()) {
            <div [pBind]="ptm('scrollableWrapper')" [class]="cx('scrollableWrapper')">
                @if (frozenColumns() || frozenBodyTemplate()) {
                    <div
                        [class]="cn(cx('scrollableView'), cx('frozenView'))"
                        #scrollableFrozenView
                        [ttScrollableView]="frozenColumns()"
                        [unstyled]="unstyled()"
                        [frozen]="true"
                        [style]="{ width: frozenWidth() }"
                        [scrollHeight]="scrollHeight()"
                        [pBind]="ptm('scrollableView')"
                    ></div>
                }
                <div
                    [class]="cx('scrollableView')"
                    [pBind]="ptm('scrollableView')"
                    #scrollableView
                    [ttScrollableView]="columns()"
                    [unstyled]="unstyled()"
                    [frozen]="false"
                    [scrollHeight]="scrollHeight()"
                    [style]="{ left: frozenWidth(), width: 'calc(100% - ' + frozenWidth() + ')' }"
                ></div>
            </div>
        }

        @if (showBottomPaginator()) {
            <p-paginator
                [pt]="ptm('pcPaginator')"
                [rows]="rows()"
                [first]="first"
                [totalRecords]="totalRecords"
                [pageLinkSize]="pageLinks()"
                [class]="cx('pcPaginator')"
                [alwaysShow]="alwaysShowPaginator()"
                (onPageChange)="onPageChange($event)"
                [rowsPerPageOptions]="rowsPerPageOptions()"
                [templateLeft]="paginatorLeftTemplate()"
                [templateRight]="paginatorRightTemplate()"
                [appendTo]="paginatorDropdownAppendTo()"
                [currentPageReportTemplate]="currentPageReportTemplate()"
                [showFirstLastIcon]="showFirstLastIcon()"
                [dropdownItemTemplate]="paginatorDropdownItemTemplate()"
                [showCurrentPageReport]="showCurrentPageReport()"
                [showJumpToPageDropdown]="showJumpToPageDropdown()"
                [showPageLinks]="showPageLinks()"
                [locale]="paginatorLocale()"
                [unstyled]="unstyled()"
            >
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
            <div [pBind]="ptm('footer')" [class]="cx('footer')">
                <ng-container *ngTemplateOutlet="summaryTemplate()"></ng-container>
            </div>
        }

        @if (resizableColumns()) {
            <div [pBind]="ptm('columnResizerHelper')" #resizeHelper [class]="cx('columnResizerHelper')" [style.display]="'none'"></div>
        }
        @if (reorderableColumns()) {
            <span [pBind]="ptm('reorderIndicatorUp')" #reorderIndicatorUp [class]="cx('reorderIndicatorUp')" [style.display]="'none'">
                @if (!reorderIndicatorUpIconTemplate()) {
                    <svg data-p-icon="arrow-down" />
                }
                <ng-template *ngTemplateOutlet="reorderIndicatorUpIconTemplate()"></ng-template>
            </span>
            <span [pBind]="ptm('reorderIndicatorDown')" #reorderIndicatorDown [class]="cx('reorderIndicatorDown')" [style.display]="'none'">
                @if (!reorderIndicatorDownIconTemplate()) {
                    <svg data-p-icon="arrow-up" />
                }
                <ng-template *ngTemplateOutlet="reorderIndicatorDownIconTemplate()"></ng-template>
            </span>
        }
    `,
    providers: [TreeTableService, TreeTableStyle, { provide: TREETABLE_INSTANCE, useExisting: TreeTable }, { provide: PARENT_INSTANCE, useExisting: TreeTable }],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "cx('root')",
        '[attr.data-p]': 'dataP()',
        '[attr.data-scrollselectors]': "'.p-treetable-scrollable-body'"
    },
    hostDirectives: [Bind]
})
export class TreeTable extends BaseComponent<TreeTablePassThrough> implements BlockableUI {
    componentName = 'TreeTable';

    _componentStyle = inject(TreeTableStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
    /**
     * An array of objects to represent dynamic columns.
     * @group Props
     */
    columns = input<any[]>();
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
     * Whether the cell widths scale according to their content or not.
     * @group Props
     */
    autoLayout = input(undefined, { transform: booleanAttribute });
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
     * When specified as true, enables the pagination.
     * @group Props
     */
    paginator = input(undefined, { transform: booleanAttribute });
    /**
     * Number of rows to display per page.
     * @group Props
     */
    rows = input(undefined, { transform: numberAttribute });
    /**
     * Index of the first row to be displayed.
     * @group Props
     */
    firstInput = input(0, { alias: 'first', transform: numberAttribute });
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
     * Position of the paginator.
     * @group Props
     */
    paginatorPosition = input<TreeTablePaginatorPosition>('bottom');
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
    sortMode = input<TreeTableSortMode>('single');
    /**
     * When true, resets paginator to first page after sorting.
     * @group Props
     */
    resetPageOnSort = input(true, { transform: booleanAttribute });
    /**
     * Whether to use the default sorting or a custom one using sortFunction.
     * @group Props
     */
    customSort = input(undefined, { transform: booleanAttribute });
    /**
     * Specifies the selection mode, valid values are "single" and "multiple".
     * @group Props
     */
    selectionMode = input<TreeTableSelectionMode>();
    /**
     * Selected row with a context menu.
     * @group Props
     */
    contextMenuSelection = input<any>();
    /**
     * A property to uniquely identify a record in data.
     * @group Props
     */
    dataKey = input<string>();
    /**
     * Defines whether metaKey is should be considered for the selection. On touch enabled devices, metaKeySelection is turned off automatically.
     * @group Props
     */
    metaKeySelection = input(false, { transform: booleanAttribute });
    /**
     * Algorithm to define if a row is selected, valid values are "equals" that compares by reference and "deepEquals" that compares all fields.
     * @group Props
     */
    compareSelectionBy = input<TreeTableCompareSelectionBy>('deepEquals');
    /**
     * Adds hover effect to rows without the need for selectionMode.
     * @group Props
     */
    rowHover = input(undefined, { transform: booleanAttribute });
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
     * When specified, enables horizontal and/or vertical scrolling.
     * @group Props
     */
    scrollable = input(undefined, { transform: booleanAttribute });
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
    virtualScrollItemSize = input(undefined, { transform: numberAttribute });
    /**
     * Whether to use the scroller feature. The properties of scroller component can be used like an object in it.
     * @group Props
     */
    virtualScrollOptions = input<ScrollerOptions>();
    /**
     * The delay (in milliseconds) before triggering the virtual scroll. This determines the time gap between the user's scroll action and the actual rendering of the next set of items in the virtual scroll.
     * @group Props
     */
    virtualScrollDelay = input(150, { transform: numberAttribute });
    /**
     * Width of the frozen columns container.
     * @group Props
     */
    frozenWidth = input<string>();
    /**
     * An array of objects to represent dynamic columns that are frozen.
     * @group Props
     */
    frozenColumns = input<any>();
    /**
     * When enabled, columns can be resized using drag and drop.
     * @group Props
     */
    resizableColumns = input(undefined, { transform: booleanAttribute });
    /**
     * Defines whether the overall table width should change on column resize, valid values are "fit" and "expand".
     * @group Props
     */
    columnResizeMode = input<TreeTableColumnResizeMode>('fit');
    /**
     * When enabled, columns can be reordered using drag and drop.
     * @group Props
     */
    reorderableColumns = input(undefined, { transform: booleanAttribute });
    /**
     * Local ng-template varilable of a ContextMenu.
     * @group Props
     */
    contextMenu = input<any>();
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity.
     * @group Props
     */
    rowTrackBy = input<Function>((index: number, item: any) => item);
    /**
     * An array of FilterMetadata objects to provide external filters.
     * @group Props
     */
    filtersInput = input<{ [s: string]: FilterMetadata | undefined }>({}, { alias: 'filters' });
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
     * Mode for filtering valid values are "lenient" and "strict". Default is lenient.
     * @group Props
     */
    filterMode = input<TreeTableFilterMode>('lenient');
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    filterLocale = input<string>();
    /**
     * Locale to be used in paginator formatting.
     * @group Props
     */
    paginatorLocale = input<string>();
    /**
     * Number of total records, defaults to length of value when not defined.
     * @group Props
     */
    totalRecordsInput = input(0, { alias: 'totalRecords' });
    /**
     * Name of the field to sort data by default.
     * @group Props
     */
    sortFieldInput = input<string | null>(undefined, { alias: 'sortField' });
    /**
     * Order to sort when default sorting is enabled.
     * @defaultValue 1
     * @group Props
     */
    sortOrderInput = input(1, { alias: 'sortOrder' });
    /**
     * An array of SortMeta objects to sort the data by default in multiple sort mode.
     * @defaultValue null
     * @group Props
     */
    multiSortMetaInput = input<SortMeta[] | null>(undefined, { alias: 'multiSortMeta' });
    /**
     * Selected row in single mode or an array of values in multiple mode.
     * @defaultValue null
     * @group Props
     */
    selectionInput = input<any>(undefined, { alias: 'selection' });
    /**
     * An array of objects to display.
     * @defaultValue null
     * @group Props
     */
    valueInput = input<TreeNode<any>[]>(undefined, { alias: 'value' });
    /**
     * A map of keys to control the selection state.
     * @group Props
     */
    selectionKeysInput = input<any>(undefined, { alias: 'selectionKeys' });
    /**
     * Whether to show grid lines between cells.
     * @defaultValue false
     * @group Props
     */
    showGridlines = input(false, { transform: booleanAttribute });
    /**
     * Callback to invoke on selected node change.
     * @param {TreeTableNode} object - Node instance.
     * @group Emits
     */
    selectionChange = output<TreeTableNode<any> | TreeTableNode<any>[] | null>();
    /**
     * Callback to invoke on context menu selection change.
     * @param {TreeTableNode} object - Node instance.
     * @group Emits
     */
    contextMenuSelectionChange = output<TreeTableNode>();
    /**
     * Callback to invoke when data is filtered.
     * @param {TreeTableFilterEvent} event - Custom filter event.
     * @group Emits
     */
    onFilter = output<TreeTableFilterEvent>();
    /**
     * Callback to invoke when a node is expanded.
     * @param {TreeTableNodeExpandEvent} event - Node expand event.
     * @group Emits
     */
    onNodeExpand = output<TreeTableNodeExpandEvent>();
    /**
     * Callback to invoke when a node is collapsed.
     * @param {TreeTableNodeCollapseEvent} event - Node collapse event.
     * @group Emits
     */
    onNodeCollapse = output<TreeTableNodeCollapseEvent>();
    /**
     * Callback to invoke when pagination occurs.
     * @param {TreeTablePaginatorState} object - Paginator state.
     * @group Emits
     */
    onPage = output<TreeTablePaginatorState>();
    /**
     * Callback to invoke when a column gets sorted.
     * @param {Object} Object - Sort data.
     * @group Emits
     */
    onSort = output<any>();
    /**
     * Callback to invoke when paging, sorting or filtering happens in lazy mode.
     * @param {TreeTableLazyLoadEvent} event - Custom lazy load event.
     * @group Emits
     */
    onLazyLoad = output<TreeTableLazyLoadEvent>();
    /**
     * An event emitter to invoke on custom sorting, refer to sorting section for details.
     * @param {TreeTableSortEvent} event - Custom sort event.
     * @group Emits
     */
    sortFunction = output<TreeTableSortEvent>();
    /**
     * Callback to invoke when a column is resized.
     * @param {TreeTableColResizeEvent} event - Custom column resize event.
     * @group Emits
     */
    onColResize = output<TreeTableColResizeEvent>();
    /**
     * Callback to invoke when a column is reordered.
     * @param {TreeTableColumnReorderEvent} event - Custom column reorder.
     * @group Emits
     */
    onColReorder = output<TreeTableColumnReorderEvent>();
    /**
     * Callback to invoke when a node is selected.
     * @param {TreeTableNode} object - Node instance.
     * @group Emits
     */
    onNodeSelect = output<TreeTableNode>();
    /**
     * Callback to invoke when a node is unselected.
     * @param {TreeTableNodeUnSelectEvent} event - Custom node unselect event.
     * @group Emits
     */
    onNodeUnselect = output<TreeTableNodeUnSelectEvent>();
    /**
     * Callback to invoke when a node is selected with right click.
     * @param {TreeTableContextMenuSelectEvent} event - Custom context menu select event.
     * @group Emits
     */
    onContextMenuSelect = output<TreeTableContextMenuSelectEvent>();
    /**
     * Callback to invoke when state of header checkbox changes.
     * @param {TreeTableHeaderCheckboxToggleEvent} event - Custom checkbox toggle event.
     * @group Emits
     */
    onHeaderCheckboxToggle = output<TreeTableHeaderCheckboxToggleEvent>();
    /**
     * Callback to invoke when a cell switches to edit mode.
     * @param {TreeTableEditEvent} event - Custom edit event.
     * @group Emits
     */
    onEditInit = output<TreeTableEditEvent>();
    /**
     * Callback to invoke when cell edit is completed.
     * @param {TreeTableEditEvent} event - Custom edit event.
     * @group Emits
     */
    onEditComplete = output<TreeTableEditEvent>();
    /**
     * Callback to invoke when cell edit is cancelled with escape key.
     * @param {TreeTableEditEvent} event - Custom edit event.
     * @group Emits
     */
    onEditCancel = output<TreeTableEditEvent>();
    /**
     * Callback to invoke when selectionKeys are changed.
     * @param {Object} object - updated value of the selectionKeys.
     * @group Emits
     */
    selectionKeysChange = output<any>();

    resizeHelperViewChild = viewChild<ElementRef>('resizeHelper');

    reorderIndicatorUpViewChild = viewChild<ElementRef>('reorderIndicatorUp');

    reorderIndicatorDownViewChild = viewChild<ElementRef>('reorderIndicatorDown');

    tableViewChild = viewChild<ElementRef>('table');

    scrollableViewChild = viewChild<ElementRef>('scrollableView');

    scrollableFrozenViewChild = viewChild<ElementRef>('scrollableFrozenView');

    /**
     * @group Templates
     */
    colGroupTemplate = contentChild<TemplateRef<TreeTableColumnsTemplateContext>>('colgroup', { descendants: false });
    /**
     * @group Templates
     */
    captionTemplate = contentChild<TemplateRef<void>>('caption', { descendants: false });
    /**
     * @group Templates
     */
    headerTemplate = contentChild<TemplateRef<TreeTableColumnsTemplateContext>>('header', { descendants: false });
    /**
     * @group Templates
     */
    bodyTemplate = contentChild<TemplateRef<TreeTableBodyTemplateContext>>('body', { descendants: false });
    /**
     * @group Templates
     */
    footerTemplate = contentChild<TemplateRef<TreeTableColumnsTemplateContext>>('footer', { descendants: false });
    /**
     * @group Templates
     */
    summaryTemplate = contentChild<TemplateRef<void>>('summary', { descendants: false });
    /**
     * @group Templates
     */
    emptyMessageTemplate = contentChild<TemplateRef<TreeTableEmptyMessageTemplateContext>>('emptymessage', { descendants: false });
    /**
     * @group Templates
     */
    paginatorLeftTemplate = contentChild<TemplateRef<void>>('paginatorleft', { descendants: false });
    /**
     * @group Templates
     */
    paginatorRightTemplate = contentChild<TemplateRef<void>>('paginatorright', { descendants: false });
    /**
     * @group Templates
     */
    paginatorDropdownItemTemplate = contentChild<TemplateRef<void>>('paginatordropdownitem', { descendants: false });
    /**
     * @group Templates
     */
    frozenHeaderTemplate = contentChild<TemplateRef<TreeTableColumnsTemplateContext>>('frozenheader', { descendants: false });
    /**
     * @group Templates
     */
    frozenBodyTemplate = contentChild<TemplateRef<void>>('frozenbody', { descendants: false });
    /**
     * @group Templates
     */
    frozenFooterTemplate = contentChild<TemplateRef<TreeTableColumnsTemplateContext>>('frozenfooter', { descendants: false });
    /**
     * @group Templates
     */
    frozenColGroupTemplate = contentChild<TemplateRef<TreeTableColumnsTemplateContext>>('frozencolgroup', { descendants: false });
    /**
     * @group Templates
     */
    loadingIconTemplate = contentChild<TemplateRef<void>>('loadingicon', { descendants: false });
    /**
     * @group Templates
     */
    reorderIndicatorUpIconTemplate = contentChild<TemplateRef<void>>('reorderindicatorupicon', { descendants: false });
    /**
     * @group Templates
     */
    reorderIndicatorDownIconTemplate = contentChild<TemplateRef<void>>('reorderindicatordownicon', { descendants: false });
    /**
     * @group Templates
     */
    sortIconTemplate = contentChild<TemplateRef<TreeTableSortIconTemplateContext>>('sorticon', { descendants: false });
    /**
     * @group Templates
     */
    checkboxIconTemplate = contentChild<TemplateRef<TreeTableCheckboxIconTemplateContext>>('checkboxicon', { descendants: false });
    /**
     * @group Templates
     */
    headerCheckboxIconTemplate = contentChild<TemplateRef<TreeTableHeaderCheckboxIconTemplateContext>>('headercheckboxicon', { descendants: false });
    /**
     * @group Templates
     */
    togglerIconTemplate = contentChild<TemplateRef<TreeTableTogglerIconTemplateContext>>('togglericon', { descendants: false });
    /**
     * @group Templates
     */
    paginatorFirstPageLinkIconTemplate = contentChild<TemplateRef<void>>('paginatorfirstpagelinkicon', { descendants: false });
    /**
     * @group Templates
     */
    paginatorLastPageLinkIconTemplate = contentChild<TemplateRef<void>>('paginatorlastpagelinkicon', { descendants: false });
    /**
     * @group Templates
     */
    paginatorPreviousPageLinkIconTemplate = contentChild<TemplateRef<void>>('paginatorpreviouspagelinkicon', { descendants: false });
    /**
     * @group Templates
     */
    paginatorNextPageLinkIconTemplate = contentChild<TemplateRef<void>>('paginatornextpagelinkicon', { descendants: false });
    /**
     * @group Templates
     */
    loaderTemplate = contentChild<TemplateRef<void>>('loader', { descendants: false });

    showLoadingMask = computed(() => this.loading() && this.showLoader());

    showTopPaginator = computed(() => this.paginator() && (this.paginatorPosition() === 'top' || this.paginatorPosition() === 'both'));

    showBottomPaginator = computed(() => this.paginator() && (this.paginatorPosition() === 'bottom' || this.paginatorPosition() === 'both'));

    dataP = computed(() =>
        this.cn({
            scrollable: this.scrollable(),
            'flex-scrollable': this.scrollable() && this.scrollHeight() === 'flex',
            loading: this.loading(),
            empty: this.isEmpty()
        })
    );

    lastResizerHelperX: Nullable<number>;

    reorderIconWidth: Nullable<number>;

    reorderIconHeight: Nullable<number>;

    draggedColumn: Nullable<any[]>;

    dropPosition: Nullable<number>;

    preventSelectionSetterPropagation: Nullable<boolean>;

    _selection: any;

    value: TreeNode<any>[] | undefined = [];

    totalRecords: number = 0;

    _sortField: string | undefined | null;

    _sortOrder: number = 1;

    _multiSortMeta: SortMeta[] | undefined | null;

    _selectionKeys: any;

    first: number = 0;

    filters: { [s: string]: FilterMetadata | undefined } = {};

    selectedKeys: any = {};

    rowTouched: Nullable<boolean>;

    editingCell: Nullable<Element>;

    editingCellData: any | undefined | null;

    editingCellField: any | undefined | null;

    editingCellClick: Nullable<boolean>;

    documentEditListener: VoidListener;

    initialized: Nullable<boolean>;

    toggleRowIndex: Nullable<number>;

    serializedValue: any[] | undefined | null;

    filteredNodes: Nullable<any[]>;

    filterTimeout: any;

    filterService = inject(FilterService);

    tableService = inject(TreeTableService);

    constructor() {
        super();

        // value effect
        effect(() => {
            const val = this.valueInput();
            untracked(() => {
                if (val !== undefined) {
                    this.value = val;
                    if (!this.lazy()) {
                        this.totalRecords = this.value ? this.value.length : 0;
                        if (this.sortMode() == 'single' && this._sortField) this.sortSingle();
                        else if (this.sortMode() == 'multiple' && this._multiSortMeta) this.sortMultiple();
                        else if (this.hasFilter()) this._filter();
                    }
                    this.updateSerializedValue();
                    this.tableService.onUIUpdate(this.value);
                }
            });
        });

        // sortField effect
        effect(() => {
            const val = this.sortFieldInput();
            untracked(() => {
                if (val !== undefined) {
                    this._sortField = val;
                    if (!this.lazy() || this.initialized) {
                        if (this.sortMode() === 'single') {
                            this.sortSingle();
                        }
                    }
                }
            });
        });

        // sortOrder effect
        effect(() => {
            const val = this.sortOrderInput();
            untracked(() => {
                this._sortOrder = val;
                if (!this.lazy() || this.initialized) {
                    if (this.sortMode() === 'single') {
                        this.sortSingle();
                    }
                }
            });
        });

        // multiSortMeta effect
        effect(() => {
            const val = this.multiSortMetaInput();
            untracked(() => {
                if (val !== undefined) {
                    this._multiSortMeta = val;
                    if (this.sortMode() === 'multiple') {
                        this.sortMultiple();
                    }
                }
            });
        });

        // selection effect
        effect(() => {
            const val = this.selectionInput();
            untracked(() => {
                if (val !== undefined) {
                    this._selection = val;
                    if (!this.preventSelectionSetterPropagation) {
                        this.updateselectedKeys();
                        this.tableService.onSelectionChange();
                    }
                    this.preventSelectionSetterPropagation = false;
                }
            });
        });

        // totalRecords effect
        effect(() => {
            const val = this.totalRecordsInput();
            untracked(() => {
                this.totalRecords = val;
                this.tableService.onTotalRecordsChange(this.totalRecords);
            });
        });

        // selectionKeys effect
        effect(() => {
            const val = this.selectionKeysInput();
            untracked(() => {
                if (val !== undefined) {
                    this._selectionKeys = val;
                    this.selectionKeysChange.emit(this._selectionKeys);
                }
            });
        });

        // first effect
        effect(() => {
            const val = this.firstInput();
            untracked(() => {
                this.first = val;
            });
        });

        // filters effect
        effect(() => {
            const val = this.filtersInput();
            untracked(() => {
                this.filters = val;
            });
        });
    }

    onInit() {
        if (this.lazy() && this.lazyLoadOnInit() && !this.virtualScroll()) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        this.initialized = true;
    }

    updateSerializedValue() {
        this.serializedValue = [];

        if (this.paginator()) this.serializePageNodes();
        else this.serializeNodes(null, this.filteredNodes || this.value, 0, true);
    }

    serializeNodes(parent: Nullable<TreeTableNode>, nodes: Nullable<TreeNode[]>, level: Nullable<number>, visible: Nullable<boolean>) {
        if (nodes && nodes.length) {
            for (let node of nodes) {
                node.parent = <TreeTableNode>parent;
                const rowNode = {
                    node: node,
                    parent: parent,
                    level: level,
                    visible: visible && (parent ? parent.expanded : true)
                };
                (<TreeNode[]>this.serializedValue).push(<TreeTableNode>rowNode);

                if (rowNode.visible && node.expanded) {
                    this.serializeNodes(node, node.children, <number>level + 1, rowNode.visible);
                }
            }
        }
    }

    serializePageNodes() {
        let data = this.filteredNodes || this.value;
        this.serializedValue = [];
        if (data && data.length) {
            const first = this.lazy() ? 0 : this.first;

            for (let i = first; i < first + <number>this.rows(); i++) {
                let node = data[i];
                if (node) {
                    this.serializedValue.push({
                        node: node,
                        parent: <any>null,
                        level: 0,
                        visible: true
                    });

                    this.serializeNodes(node, node.children, 1, true);
                }
            }
        }
    }

    updateselectedKeys() {
        if (this.dataKey() && this._selection) {
            this.selectedKeys = {};
            if (Array.isArray(this._selection)) {
                for (let node of this._selection) {
                    this.selectedKeys[String(resolveFieldData(node.data, this.dataKey()))] = 1;
                }
            } else {
                this.selectedKeys[String(resolveFieldData((<any>this._selection).data, this.dataKey()))] = 1;
            }
        }
    }

    onPageChange(event: TreeTablePaginatorState) {
        this.first = <number>event.first;

        if (this.lazy()) this.onLazyLoad.emit(this.createLazyLoadMetadata());
        else this.serializePageNodes();

        this.onPage.emit({
            first: this.first,
            rows: <number>event.rows
        });

        this.tableService.onUIUpdate(this.value);

        if (this.scrollable()) {
            this.resetScrollTop();
        }
    }

    sort(event: TreeTableSortEvent) {
        let originalEvent = event.originalEvent;

        if (this.sortMode() === 'single') {
            this._sortOrder = this._sortField === event.field ? this._sortOrder * -1 : this.defaultSortOrder();
            this._sortField = event.field;
            this.sortSingle();

            if (this.resetPageOnSort() && this.scrollable()) {
                this.resetScrollTop();
            }
        }
        if (this.sortMode() === 'multiple') {
            let metaKey = (<KeyboardEvent>originalEvent).metaKey || (<KeyboardEvent>originalEvent).ctrlKey;
            let sortMeta = this.getSortMeta(<string>event.field);

            if (sortMeta) {
                if (!metaKey) {
                    this._multiSortMeta = [{ field: <string>event.field, order: sortMeta.order * -1 }];

                    if (this.resetPageOnSort() && this.scrollable()) {
                        this.resetScrollTop();
                    }
                } else {
                    sortMeta.order = sortMeta.order * -1;
                }
            } else {
                if (!metaKey || !this._multiSortMeta) {
                    this._multiSortMeta = [];

                    if (this.resetPageOnSort() && this.scrollable()) {
                        this.resetScrollTop();
                    }
                }
                (<SortMeta[]>this._multiSortMeta).push({ field: <string>event.field, order: this.defaultSortOrder() });
            }

            this.sortMultiple();
        }
    }

    sortSingle() {
        if (this._sortField && this._sortOrder) {
            if (this.lazy()) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            } else if (this.value) {
                this.sortNodes(this.value);

                if (this.hasFilter()) {
                    this._filter();
                }
            }

            let sortMeta: SortMeta = {
                field: this._sortField,
                order: this._sortOrder
            };

            this.onSort.emit(sortMeta);
            this.tableService.onSort(sortMeta);
            this.updateSerializedValue();
        }
    }

    sortNodes(nodes: TreeNode[]) {
        if (!nodes || nodes.length === 0) {
            return;
        }

        if (this.customSort()) {
            this.sortFunction.emit({
                data: nodes,
                mode: this.sortMode(),
                field: <string>this._sortField,
                order: this._sortOrder
            });
        } else {
            nodes.sort((node1, node2) => {
                let value1 = resolveFieldData(node1.data, this._sortField);
                let value2 = resolveFieldData(node2.data, this._sortField);
                let result: number = 0;

                if (value1 == null && value2 != null) result = -1;
                else if (value1 != null && value2 == null) result = 1;
                else if (value1 == null && value2 == null) result = 0;
                else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2, undefined, { numeric: true });
                else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

                return this._sortOrder * result;
            });
        }

        for (let node of nodes) {
            this.sortNodes(node.children as TreeNode[]);
        }
    }

    sortMultiple() {
        if (this._multiSortMeta) {
            if (this.lazy()) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            } else if (this.value) {
                this.sortMultipleNodes(this.value);

                if (this.hasFilter()) {
                    this._filter();
                }
            }

            this.onSort.emit({
                multisortmeta: this._multiSortMeta
            });
            this.updateSerializedValue();
            this.tableService.onSort(this._multiSortMeta);
        }
    }

    sortMultipleNodes(nodes: TreeNode[]) {
        if (!nodes || nodes.length === 0) {
            return;
        }

        if (this.customSort()) {
            this.sortFunction.emit({
                data: this.value,
                mode: this.sortMode(),
                multiSortMeta: this._multiSortMeta
            });
        } else {
            nodes.sort((node1, node2) => {
                return this.multisortField(node1, node2, <SortMeta[]>this._multiSortMeta, 0);
            });
        }

        for (let node of nodes) {
            this.sortMultipleNodes(node.children as TreeNode[]);
        }
    }

    multisortField(node1: TreeTableNode, node2: TreeTableNode, multiSortMeta: SortMeta[], index: number): number {
        if (isEmpty(this._multiSortMeta) || isEmpty(multiSortMeta[index])) {
            return 0;
        }

        let value1 = resolveFieldData(node1.data, multiSortMeta[index].field);
        let value2 = resolveFieldData(node2.data, multiSortMeta[index].field);
        let result: number = 0;

        if (value1 == null && value2 != null) result = -1;
        else if (value1 != null && value2 == null) result = 1;
        else if (value1 == null && value2 == null) result = 0;
        if (typeof value1 == 'string' || value1 instanceof String) {
            if (value1.localeCompare && value1 != value2) {
                return multiSortMeta[index].order * value1.localeCompare(value2, undefined, { numeric: true });
            }
        } else {
            result = value1 < value2 ? -1 : 1;
        }

        if (value1 == value2) {
            return multiSortMeta.length - 1 > index ? this.multisortField(node1, node2, multiSortMeta, index + 1) : 0;
        }

        return multiSortMeta[index].order * result;
    }

    getSortMeta(field: string) {
        if (this._multiSortMeta && this._multiSortMeta.length) {
            for (let i = 0; i < this._multiSortMeta.length; i++) {
                if (this._multiSortMeta[i].field === field) {
                    return this._multiSortMeta[i];
                }
            }
        }

        return null;
    }

    isSorted(field: string) {
        if (this.sortMode() === 'single') {
            return this._sortField && this._sortField === field;
        } else if (this.sortMode() === 'multiple') {
            let sorted = false;
            if (this._multiSortMeta) {
                for (let i = 0; i < this._multiSortMeta.length; i++) {
                    if (this._multiSortMeta[i].field == field) {
                        sorted = true;
                        break;
                    }
                }
            }
            return sorted;
        }
    }

    createLazyLoadMetadata(): any {
        return {
            first: this.first,
            rows: this.rows(),
            sortField: this._sortField,
            sortOrder: this._sortOrder,
            filters: this.filters,
            globalFilter: this.filters && this.filters['global'] ? this.filters['global'].value : null,
            multiSortMeta: this._multiSortMeta,
            forceUpdate: () => this.cd.detectChanges()
        };
    }

    onLazyItemLoad(event: TreeTableLazyLoadEvent) {
        this.onLazyLoad.emit({
            ...this.createLazyLoadMetadata(),
            ...event,
            rows: event.last - event.first
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
        if (this.scrollableViewChild()) {
            (<any>this.scrollableViewChild()).scrollToVirtualIndex(<number>index);
        }

        if (this.scrollableFrozenViewChild()) {
            (<any>this.scrollableViewChild()).scrollToVirtualIndex(index);
        }
    }
    /**
     * Scrolls to given index.
     * @param {ScrollToOptions} options - Scroll options.
     * @group Method
     */
    public scrollTo(options: ScrollToOptions) {
        if (this.scrollableViewChild()) {
            (<any>this.scrollableViewChild()).scrollTo(options);
        }

        if (this.scrollableFrozenViewChild()) {
            (<any>this.scrollableViewChild()).scrollTo(options);
        }
    }

    isEmpty() {
        let data = this.filteredNodes || this.value;
        return data == null || data.length == 0;
    }

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

    onColumnResizeBegin(event: MouseEvent) {
        let containerLeft = <any>getOffset(this.el?.nativeElement).left;
        this.lastResizerHelperX = event.pageX - containerLeft + this.el?.nativeElement.scrollLeft;
        event.preventDefault();
    }

    onColumnResize(event: MouseEvent) {
        let containerLeft = <any>getOffset(this.el?.nativeElement).left;
        this.el?.nativeElement.setAttribute('data-p-unselectable-text', 'true');
        !this.$unstyled() && addStyle(this.el.nativeElement, { 'user-select': 'none' });
        this.resizeHelperViewChild()!.nativeElement.style.height = this.el?.nativeElement.offsetHeight + 'px';
        this.resizeHelperViewChild()!.nativeElement.style.top = 0 + 'px';
        this.resizeHelperViewChild()!.nativeElement.style.left = event.pageX - containerLeft + this.el?.nativeElement.scrollLeft + 'px';

        this.resizeHelperViewChild()!.nativeElement.style.display = 'block';
    }

    onColumnResizeEnd(event: MouseEvent, column: any) {
        let delta = this.resizeHelperViewChild()!.nativeElement.offsetLeft - <number>this.lastResizerHelperX;
        let columnWidth = column.offsetWidth;
        let newColumnWidth = columnWidth + delta;
        let minWidth = column.style.minWidth || 15;

        if (columnWidth + delta > parseInt(minWidth)) {
            if (this.columnResizeMode() === 'fit') {
                let nextColumn = column.nextElementSibling;
                while (!nextColumn.offsetParent) {
                    nextColumn = nextColumn.nextElementSibling;
                }

                if (nextColumn) {
                    let nextColumnWidth = nextColumn.offsetWidth - delta;
                    let nextColumnMinWidth = nextColumn.style.minWidth || 15;

                    if (newColumnWidth > 15 && nextColumnWidth > parseInt(nextColumnMinWidth)) {
                        if (this.scrollable()) {
                            let scrollableView = this.findParentScrollableView(column);
                            let scrollableBodyTable = <any>findSingle(scrollableView, '[data-pc-section="scrollablebody"] table') || findSingle(scrollableView, '[data-pc-name="virtualscroller"] table');
                            let scrollableHeaderTable = <any>findSingle(scrollableView, '[data-pc-section="scrollableheadertable"]');
                            let scrollableFooterTable = <any>findSingle(scrollableView, '[data-pc-section="scrollablefootertable"]');
                            let resizeColumnIndex = getIndex(column);

                            this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                            this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                            this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                        } else {
                            column.style.width = newColumnWidth + 'px';
                            if (nextColumn) {
                                nextColumn.style.width = nextColumnWidth + 'px';
                            }
                        }
                    }
                }
            } else if (this.columnResizeMode() === 'expand') {
                if (this.scrollable()) {
                    let scrollableView = this.findParentScrollableView(column);
                    let scrollableBody = <any>findSingle(scrollableView, '[data-pc-section="scrollablebody"]') || findSingle(scrollableView, '[data-pc-name="virtualscroller"]');
                    let scrollableHeader = <any>findSingle(scrollableView, '[data-pc-section="scrollableheader"]');
                    let scrollableFooter = <any>findSingle(scrollableView, '[data-pc-section="scrollablefooter"]');
                    let scrollableBodyTable = <any>findSingle(scrollableView, '[data-pc-section="scrollablebody"] table') || findSingle(scrollableView, '[data-pc-name="virtualscroller"] table');
                    let scrollableHeaderTable = <any>findSingle(scrollableView, '[data-pc-section="scrollableheadertable"]');
                    let scrollableFooterTable = <any>findSingle(scrollableView, '[data-pc-section="scrollablefootertable"]');
                    scrollableBodyTable.style.width = scrollableBodyTable.offsetWidth + delta + 'px';
                    scrollableHeaderTable.style.width = scrollableHeaderTable.offsetWidth + delta + 'px';
                    if (scrollableFooterTable) {
                        scrollableFooterTable.style.width = scrollableFooterTable.offsetWidth + delta + 'px';
                    }
                    let resizeColumnIndex = getIndex(column);

                    const scrollableBodyTableWidth = column ? scrollableBodyTable.offsetWidth + delta : newColumnWidth;
                    const scrollableHeaderTableWidth = column ? scrollableHeaderTable.offsetWidth + delta : newColumnWidth;
                    const isContainerInViewport = this.el?.nativeElement.offsetWidth >= scrollableBodyTableWidth;

                    let setWidth = (container: HTMLElement, table: HTMLElement, width: number, isContainerInViewport: boolean) => {
                        if (container && table) {
                            container.style.width = isContainerInViewport ? width + calculateScrollbarWidth(scrollableBody) + 'px' : 'auto';
                            table.style.width = width + 'px';
                        }
                    };

                    setWidth(scrollableBody, scrollableBodyTable, scrollableBodyTableWidth, isContainerInViewport);
                    setWidth(scrollableHeader, scrollableHeaderTable, scrollableHeaderTableWidth, isContainerInViewport);
                    setWidth(scrollableFooter, scrollableFooterTable, scrollableHeaderTableWidth, isContainerInViewport);

                    this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, null);
                    this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, null);
                    this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, null);
                } else {
                    this.tableViewChild()!.nativeElement.style.width = this.tableViewChild()?.nativeElement.offsetWidth + delta + 'px';
                    column.style.width = newColumnWidth + 'px';
                    let containerWidth = this.tableViewChild()?.nativeElement.style.width;
                    (<ElementRef>this.el).nativeElement.style.width = containerWidth + 'px';
                }
            }

            this.onColResize.emit({
                element: column,
                delta: delta
            });
        }

        this.resizeHelperViewChild()!.nativeElement.style.display = 'none';

        this.el.nativeElement.removeAttribute('data-p-unselectable-text');
        !this.$unstyled() && (this.el.nativeElement.style['user-select'] = '');
    }

    findParentScrollableView(column: any) {
        if (column) {
            let parent = column.parentElement;
            while (parent && !findSingle(parent, '[data-pc-section="scrollableview"]')) {
                parent = parent.parentElement;
            }

            return parent;
        } else {
            return null;
        }
    }

    resizeColGroup(table: Nullable<HTMLElement>, resizeColumnIndex: Nullable<number>, newColumnWidth: Nullable<number>, nextColumnWidth: Nullable<number>) {
        if (table) {
            let colGroup = table.children[0].nodeName === 'COLGROUP' ? table.children[0] : null;

            if (colGroup) {
                let col = colGroup.children[<number>resizeColumnIndex];
                let nextCol = col.nextElementSibling;
                (<HTMLElement>col).style.width = newColumnWidth + 'px';

                if (nextCol && nextColumnWidth) {
                    (<HTMLElement>nextCol).style.width = nextColumnWidth + 'px';
                }
            } else {
                throw 'Scrollable tables require a colgroup to support resizable columns';
            }
        }
    }

    onColumnDragStart(event: DragEvent, columnElement: any) {
        this.reorderIconWidth = getHiddenElementOuterWidth(this.reorderIndicatorUpViewChild()?.nativeElement);
        this.reorderIconHeight = getHiddenElementOuterHeight(this.reorderIndicatorDownViewChild()?.nativeElement);
        this.draggedColumn = columnElement;
        (<any>event).dataTransfer.setData('text', 'b'); // For firefox
    }

    onColumnDragEnter(event: DragEvent, dropHeader: any) {
        if (this.reorderableColumns() && this.draggedColumn && dropHeader) {
            event.preventDefault();
            let containerOffset = <any>getOffset(this.el?.nativeElement);
            let dropHeaderOffset = <any>getOffset(dropHeader);

            if (this.draggedColumn != dropHeader) {
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
                (<any>event).dataTransfer.dropEffect = 'none';
            }
        }
    }

    onColumnDragLeave(event: DragEvent) {
        if (this.reorderableColumns() && this.draggedColumn) {
            event.preventDefault();
            this.reorderIndicatorUpViewChild()!.nativeElement.style.display = 'none';
            this.reorderIndicatorDownViewChild()!.nativeElement.style.display = 'none';
        }
    }

    onColumnDrop(event: DragEvent, dropColumn: any) {
        event.preventDefault();
        if (this.draggedColumn) {
            let dragIndex = DomHandler.indexWithinGroup(this.draggedColumn, 'ttreorderablecolumn');
            let dropIndex = DomHandler.indexWithinGroup(dropColumn, 'ttreorderablecolumn');
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
                reorderArray(<any[]>this.columns(), dragIndex, dropIndex);

                this.onColReorder.emit({
                    dragIndex: dragIndex,
                    dropIndex: dropIndex,
                    columns: this.columns()
                });
            }

            this.reorderIndicatorUpViewChild()!.nativeElement.style.display = 'none';
            this.reorderIndicatorDownViewChild()!.nativeElement.style.display = 'none';
            (this.draggedColumn as any).draggable = false;
            this.draggedColumn = null;
            this.dropPosition = null;
        }
    }

    handleRowClick(event: any) {
        let targetNode = (<HTMLElement>event.originalEvent.target).nodeName;
        if (targetNode == 'INPUT' || targetNode == 'BUTTON' || targetNode == 'A' || isClickable(event.originalEvent.target)) {
            return;
        }

        if (this.selectionMode()) {
            this.preventSelectionSetterPropagation = true;
            let rowNode = event.rowNode;
            let selected = this.isSelected((<any>rowNode).node);
            let metaSelection = this.rowTouched ? false : this.metaKeySelection();
            let dataKeyValue = this.dataKey() ? String(resolveFieldData((<TreeTableNode>rowNode.node).data, this.dataKey())) : null;

            if (metaSelection) {
                let keyboardEvent = <KeyboardEvent>event.originalEvent;
                let metaKey = keyboardEvent.metaKey || keyboardEvent.ctrlKey;

                if (selected && metaKey) {
                    if (this.isSingleSelectionMode()) {
                        this._selection = null;
                        this.selectedKeys = {};
                        this.selectionChange.emit(null);
                    } else {
                        let selectionIndex = this.findIndexInSelection(rowNode.node);
                        this._selection = this._selection.filter((val: TreeTableNode, i: number) => i != selectionIndex);
                        this.selectionChange.emit(this._selection);
                        if (dataKeyValue) {
                            delete this.selectedKeys[dataKeyValue];
                        }
                    }

                    this.onNodeUnselect.emit({
                        originalEvent: event.originalEvent,
                        node: <TreeTableNode>rowNode.node,
                        type: 'row'
                    });
                } else {
                    if (this.isSingleSelectionMode()) {
                        this._selection = rowNode.node;
                        this.selectionChange.emit(rowNode.node);
                        if (dataKeyValue) {
                            this.selectedKeys = {};
                            this.selectedKeys[dataKeyValue] = 1;
                        }
                    } else if (this.isMultipleSelectionMode()) {
                        if (metaKey) {
                            this._selection = this._selection || [];
                        } else {
                            this._selection = [];
                            this.selectedKeys = {};
                        }

                        this._selection = [...this._selection, rowNode.node];
                        this.selectionChange.emit(this._selection);
                        if (dataKeyValue) {
                            this.selectedKeys[dataKeyValue] = 1;
                        }
                    }

                    this.onNodeSelect.emit({
                        originalEvent: event.originalEvent,
                        node: rowNode.node,
                        type: 'row',
                        index: (<any>event).rowIndex
                    });
                }
            } else {
                if (this.selectionMode() === 'single') {
                    if (selected) {
                        this._selection = null;
                        this.selectedKeys = {};
                        this.selectionChange.emit(this._selection);
                        this.onNodeUnselect.emit({
                            originalEvent: event.originalEvent,
                            node: <TreeTableNode>rowNode.node,
                            type: 'row'
                        });
                    } else {
                        this._selection = rowNode.node;
                        this.selectionChange.emit(this._selection);
                        this.onNodeSelect.emit({
                            originalEvent: event.originalEvent,
                            node: rowNode.node,
                            type: 'row',
                            index: event.rowIndex
                        });
                        if (dataKeyValue) {
                            this.selectedKeys = {};
                            this.selectedKeys[dataKeyValue] = 1;
                        }
                    }
                } else if (this.selectionMode() === 'multiple') {
                    if (selected) {
                        let selectionIndex = this.findIndexInSelection(rowNode.node);
                        this._selection = this._selection.filter((val: TreeTableNode, i: number) => i != selectionIndex);
                        this.selectionChange.emit(this._selection);
                        this.onNodeUnselect.emit({
                            originalEvent: event.originalEvent,
                            node: rowNode.node,
                            type: 'row'
                        });
                        if (dataKeyValue) {
                            delete this.selectedKeys[dataKeyValue];
                        }
                    } else {
                        this._selection = this._selection ? [...this._selection, rowNode.node] : [rowNode.node];
                        this.selectionChange.emit(this._selection);
                        this.onNodeSelect.emit({
                            originalEvent: event.originalEvent,
                            node: rowNode.node,
                            type: 'row',
                            index: event.rowIndex
                        });
                        if (dataKeyValue) {
                            this.selectedKeys[dataKeyValue] = 1;
                        }
                    }
                }
            }

            this.tableService.onSelectionChange();
        }

        this.rowTouched = false;
    }

    handleRowTouchEnd(event: Event) {
        this.rowTouched = true;
    }

    handleRowRightClick(event: any) {
        const ctxMenu = this.contextMenu();
        if (ctxMenu) {
            const node = event.rowNode.node;

            const showContextMenu = () => {
                ctxMenu.show(event.originalEvent);
                ctxMenu.hideCallback = () => {
                    this.contextMenuSelectionChange.emit(null as any);
                    this.tableService.onContextMenu(null);
                };
            };

            this.contextMenuSelectionChange.emit(node);
            this.tableService.onContextMenu(node);
            showContextMenu();
            this.onContextMenuSelect.emit({ originalEvent: event.originalEvent, node: node });
        }
    }

    toggleNodeWithCheckbox(event: any) {
        // legacy selection support, will be removed in v18
        this._selection = this._selection || [];
        this.preventSelectionSetterPropagation = true;
        let node = event.rowNode.node;
        let selected = this.isSelected(node);

        if (selected) {
            this.propagateSelectionDown(node, false);
            if (event.rowNode.parent) {
                this.propagateSelectionUp(node.parent, false);
            }
            this.selectionChange.emit(this._selection);
            this.onNodeUnselect.emit({ originalEvent: event, node: node });
        } else {
            this.propagateSelectionDown(node, true);
            if (event.rowNode.parent) {
                this.propagateSelectionUp(node.parent, true);
            }
            this.selectionChange.emit(this._selection);
            this.onNodeSelect.emit({ originalEvent: event, node: node });
        }

        this.tableService.onSelectionChange();
    }

    toggleNodesWithCheckbox(event: Event, check: boolean) {
        // legacy selection support, will be removed in v18
        let data = this.filteredNodes || this.value;
        this._selection = check && data ? data.slice() : [];

        this.toggleAll(check);

        if (!check) {
            this._selection = [];
            this.selectedKeys = {};
        }

        this.preventSelectionSetterPropagation = true;
        this.selectionChange.emit(this._selection);
        this.tableService.onSelectionChange();

        this.onHeaderCheckboxToggle.emit({ originalEvent: event, checked: check });
    }

    toggleAll(checked: boolean) {
        let data = this.filteredNodes || this.value;

        if (!this._selectionKeys) {
            if (data && data.length) {
                for (let node of data) {
                    this.propagateSelectionDown(node, checked);
                }
            }
        } else {
            // legacy selection support, will be removed in v18
            if (data && data.length) {
                for (let node of data) {
                    this.propagateDown(node, checked);
                }
                this.selectionKeysChange.emit(this._selectionKeys);
            }
        }
    }

    propagateSelectionUp(node: TreeTableNode, select: boolean) {
        // legacy selection support, will be removed in v18
        if (node.children && node.children.length) {
            let selectedChildCount: number = 0;
            let childPartialSelected: boolean = false;
            let dataKeyValue = this.dataKey() ? String(resolveFieldData(node.data, this.dataKey())) : null;

            for (let child of node.children) {
                if (this.isSelected(child)) selectedChildCount++;
                else if (child.partialSelected) childPartialSelected = true;
            }

            if (select && selectedChildCount == node.children.length) {
                this._selection = [...(this._selection || []), node];
                node.partialSelected = false;
                if (dataKeyValue) {
                    this.selectedKeys[dataKeyValue] = 1;
                }
            } else {
                if (!select) {
                    let index = this.findIndexInSelection(node);
                    if (index >= 0) {
                        this._selection = this._selection.filter((val: any, i: number) => i != index);

                        if (dataKeyValue) {
                            delete this.selectedKeys[dataKeyValue];
                        }
                    }
                }

                if (childPartialSelected || (selectedChildCount > 0 && selectedChildCount != node.children.length)) node.partialSelected = true;
                else node.partialSelected = false;
            }
        }

        let parent = node.parent;
        node.checked = select;
        if (parent) {
            this.propagateSelectionUp(parent, select);
        }
    }

    propagateSelectionDown(node: TreeTableNode, select: boolean) {
        // legacy selection support, will be removed in v18
        let index = this.findIndexInSelection(node);
        let dataKeyValue = this.dataKey() ? String(resolveFieldData(node.data, this.dataKey())) : null;

        if (select && index == -1) {
            this._selection = [...(this._selection || []), node];
            if (dataKeyValue) {
                this.selectedKeys[dataKeyValue] = 1;
            }
        } else if (!select && index > -1) {
            this._selection = this._selection.filter((val: any, i: number) => i != index);
            if (dataKeyValue) {
                delete this.selectedKeys[dataKeyValue];
            }
        }

        node.partialSelected = false;
        node.checked = select;

        if (node.children && node.children.length) {
            for (let child of node.children) {
                this.propagateSelectionDown(child, select);
            }
        }
    }

    isSelected(node: TreeTableNode) {
        // legacy selection support, will be removed in v18
        if (node && this._selection) {
            if (this.dataKey()) {
                if (node.hasOwnProperty('checked')) {
                    return node['checked'];
                } else {
                    return this.selectedKeys[resolveFieldData(node.data, this.dataKey())] !== undefined;
                }
            } else {
                if (Array.isArray(this._selection)) return this.findIndexInSelection(node) > -1;
                else return this.equals(node, this._selection);
            }
        }

        return false;
    }

    isNodeSelected(node) {
        return this.selectionMode() && this._selectionKeys ? this._selectionKeys[this.nodeKey(node)]?.checked === true : false;
    }

    isNodePartialSelected(node) {
        return this.selectionMode() && this._selectionKeys ? this._selectionKeys[this.nodeKey(node)]?.partialChecked === true : false;
    }

    nodeKey(node) {
        return resolveFieldData(node, this.dataKey()) || resolveFieldData(node?.data, this.dataKey());
    }

    toggleCheckbox(event) {
        let { rowNode, check, originalEvent } = event;
        let node = rowNode.node;
        if (this._selectionKeys) {
            this.propagateDown(node, check);
            if (node.parent) {
                this.propagateUp(node.parent, check);
            }

            this.selectionKeysChange.emit(this._selectionKeys);
        } else {
            this.toggleNodeWithCheckbox({ originalEvent, rowNode });
        }

        this.tableService.onSelectionChange();
    }

    propagateDown(node, check) {
        if (check) {
            this._selectionKeys[this.nodeKey(node)] = { checked: true, partialChecked: false };
        } else {
            delete this._selectionKeys[this.nodeKey(node)];
        }

        if (node.children && node.children.length) {
            for (let child of node.children) {
                this.propagateDown(child, check);
            }
        }
    }

    propagateUp(node, check) {
        let checkedChildCount = 0;
        let childPartialSelected = false;

        for (let child of node.children) {
            if (this._selectionKeys[this.nodeKey(child)] && this._selectionKeys[this.nodeKey(child)].checked) checkedChildCount++;
            else if (this._selectionKeys[this.nodeKey(child)] && this._selectionKeys[this.nodeKey(child)].partialChecked) childPartialSelected = true;
        }

        if (check && checkedChildCount === node.children.length) {
            this._selectionKeys[this.nodeKey(node)] = { checked: true, partialChecked: false };
        } else {
            if (!check) {
                delete this._selectionKeys[this.nodeKey(node)];
            }

            if (childPartialSelected || (checkedChildCount > 0 && checkedChildCount !== node.children.length)) this._selectionKeys[this.nodeKey(node)] = { checked: false, partialChecked: true };
            else this._selectionKeys[this.nodeKey(node)] = { checked: false, partialChecked: false };
        }

        let parent = node.parent;
        if (parent) {
            this.propagateUp(parent, check);
        }
    }

    findIndexInSelection(node: any) {
        let index: number = -1;
        if (this._selection && this._selection.length) {
            for (let i = 0; i < this._selection.length; i++) {
                if (this.equals(node, this._selection[i])) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }

    isSingleSelectionMode() {
        return this.selectionMode() === 'single';
    }

    isMultipleSelectionMode() {
        return this.selectionMode() === 'multiple';
    }

    equals(node1: TreeTableNode, node2: TreeTableNode) {
        return this.compareSelectionBy() === 'equals' ? equals(node1, node2) : equals(node1.data, node2.data, this.dataKey());
    }

    filter(value: string | string[], field: string, matchMode: string) {
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
    }

    filterGlobal(value: string, matchMode: string) {
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
        if (this.lazy()) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        } else {
            if (!this.value) {
                return;
            }

            if (!this.hasFilter()) {
                this.filteredNodes = null;
                if (this.paginator()) {
                    this.totalRecords = this.value ? this.value.length : 0;
                }
            } else {
                let globalFilterFieldsArray;
                if (this.filters['global']) {
                    if (!this.columns() && !this.globalFilterFields()) throw new Error('Global filtering requires dynamic columns or globalFilterFields to be defined.');
                    else globalFilterFieldsArray = this.globalFilterFields() || this.columns();
                }

                this.filteredNodes = [];
                const isStrictMode = this.filterMode() === 'strict';
                let isValueChanged = false;

                for (let node of this.value) {
                    let copyNode = { ...node };
                    let localMatch = true;
                    let globalMatch = false;
                    let paramsWithoutNode;

                    for (let prop in this.filters) {
                        if (this.filters.hasOwnProperty(prop) && prop !== 'global') {
                            let filterMeta = <FilterMetadata>this.filters[prop];
                            let filterField = prop;
                            let filterValue = filterMeta.value;
                            let filterMatchMode = filterMeta.matchMode || 'startsWith';
                            let filterConstraint = (<any>this.filterService).filters[filterMatchMode];
                            paramsWithoutNode = { filterField, filterValue, filterConstraint, isStrictMode };
                            if (
                                (isStrictMode && !(this.findFilteredNodes(copyNode, paramsWithoutNode) || this.isFilterMatched(copyNode, paramsWithoutNode))) ||
                                (!isStrictMode && !(this.isFilterMatched(copyNode, paramsWithoutNode) || this.findFilteredNodes(copyNode, paramsWithoutNode)))
                            ) {
                                localMatch = false;
                            }

                            if (!localMatch) {
                                break;
                            }
                        }
                    }

                    if (this.filters['global'] && !globalMatch && globalFilterFieldsArray) {
                        let copyNodeForGlobal = { ...copyNode };
                        let filterField = undefined;
                        let filterValue = this.filters['global'].value;
                        let filterConstraint = (<any>this.filterService).filters[(<any>this.filters)['global'].matchMode];
                        paramsWithoutNode = {
                            filterField,
                            filterValue,
                            filterConstraint,
                            isStrictMode,
                            globalFilterFieldsArray
                        };

                        if (
                            (isStrictMode && (this.findFilteredNodes(copyNodeForGlobal, paramsWithoutNode) || this.isFilterMatched(copyNodeForGlobal, paramsWithoutNode))) ||
                            (!isStrictMode && (this.isFilterMatched(copyNodeForGlobal, paramsWithoutNode) || this.findFilteredNodes(copyNodeForGlobal, paramsWithoutNode)))
                        ) {
                            globalMatch = true;
                            copyNode = copyNodeForGlobal;
                        }
                    }

                    let matches = localMatch;
                    if (this.filters['global']) {
                        matches = localMatch && globalMatch;
                    }

                    if (matches) {
                        this.filteredNodes.push(copyNode);
                    }

                    isValueChanged = isValueChanged || !localMatch || globalMatch || (localMatch && this.filteredNodes.length > 0) || (!globalMatch && this.filteredNodes.length === 0);
                }

                if (!isValueChanged) {
                    this.filteredNodes = null;
                }

                if (this.paginator()) {
                    this.totalRecords = this.filteredNodes ? this.filteredNodes.length : this.value ? this.value.length : 0;
                }
            }
            this.cd.markForCheck();
        }

        this.first = 0;

        const filteredValue = this.filteredNodes || this.value;

        this.onFilter.emit({
            filters: this.filters,
            filteredValue: filteredValue
        });

        this.tableService.onUIUpdate(filteredValue);
        this.updateSerializedValue();

        if (this.scrollable()) {
            this.resetScrollTop();
        }
    }

    findFilteredNodes(node: TreeTableNode, paramsWithoutNode: any) {
        if (node) {
            let matched = false;
            if (node.children) {
                let childNodes = [...node.children];
                node.children = [];
                for (let childNode of childNodes) {
                    let copyChildNode = { ...childNode };
                    if (this.isFilterMatched(copyChildNode, paramsWithoutNode)) {
                        matched = true;
                        node.children.push(copyChildNode);
                    }
                }
            }

            if (matched) {
                return true;
            }
        }
    }

    isFilterMatched(node: TreeTableNode, filterOptions: TreeTableFilterOptions) {
        let { filterField, filterValue, filterConstraint, isStrictMode, globalFilterFieldsArray } = <any>filterOptions;
        let matched = false;
        const isMatched = (field: string) => filterConstraint(resolveFieldData(node.data, field), filterValue, <string>this.filterLocale());

        matched = globalFilterFieldsArray?.length ? globalFilterFieldsArray.some((globalFilterField) => isMatched(globalFilterField.field || globalFilterField)) : isMatched(filterField);

        if (!matched || (isStrictMode && !this.isNodeLeaf(node))) {
            matched =
                this.findFilteredNodes(node, {
                    filterField,
                    filterValue,
                    filterConstraint,
                    isStrictMode,
                    globalFilterFieldsArray
                }) || matched;
        }

        return matched;
    }

    isNodeLeaf(node: TreeTableNode) {
        return node.leaf === false ? false : !(node.children && node.children.length);
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
    /**
     * Clears the sort and paginator state.
     * @group Method
     */
    public reset() {
        this._sortField = null;
        this._sortOrder = 1;
        this._multiSortMeta = null;
        this.tableService.onSort(null);

        this.filteredNodes = null;
        this.filters = {};

        this.first = 0;

        if (this.lazy()) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        } else {
            this.totalRecords = this.value ? this.value.length : 0;
        }
    }

    updateEditingCell(cell: any, data: any, field: string) {
        this.editingCell = cell;
        this.editingCellData = data;
        this.editingCellField = field;
        this.bindDocumentEditListener();
    }

    isEditingCellValid() {
        return this.editingCell && find(this.editingCell, '.ng-invalid.ng-dirty').length === 0;
    }

    bindDocumentEditListener() {
        if (!this.documentEditListener) {
            this.documentEditListener = this.renderer.listen(this.document, 'click', (event) => {
                if (this.editingCell && !this.editingCellClick && this.isEditingCellValid()) {
                    !this.$unstyled() && removeClass(this.editingCell, 'p-cell-editing');
                    this.editingCell = null;
                    this.onEditComplete.emit({ field: this.editingCellField, data: this.editingCellData });
                    this.editingCellField = null;
                    this.editingCellData = null;
                    this.unbindDocumentEditListener();
                }

                this.editingCellClick = false;
            });
        }
    }

    unbindDocumentEditListener() {
        if (this.documentEditListener) {
            this.documentEditListener();
            this.documentEditListener = null;
        }
    }

    onDestroy() {
        this.unbindDocumentEditListener();
        this.editingCell = null;
        this.editingCellField = null;
        this.editingCellData = null;
        this.initialized = null;
    }
}
