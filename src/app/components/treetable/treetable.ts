import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Inject,
    Injectable,
    Input,
    NgModule,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    PLATFORM_ID,
    QueryList,
    Renderer2,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    booleanAttribute,
    numberAttribute
} from '@angular/core';
import { BlockableUI, FilterMetadata, FilterService, PrimeNGConfig, PrimeTemplate, ScrollerOptions, SharedModule, SortMeta, TreeNode, TreeTableNode } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ArrowDownIcon } from 'primeng/icons/arrowdown';
import { ArrowUpIcon } from 'primeng/icons/arrowup';
import { CheckIcon } from 'primeng/icons/check';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { MinusIcon } from 'primeng/icons/minus';
import { SortAltIcon } from 'primeng/icons/sortalt';
import { SortAmountDownIcon } from 'primeng/icons/sortamountdown';
import { SortAmountUpAltIcon } from 'primeng/icons/sortamountupalt';
import { SpinnerIcon } from 'primeng/icons/spinner';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { Scroller, ScrollerModule } from 'primeng/scroller';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import { ObjectUtils } from 'primeng/utils';
import { Subject, Subscription } from 'rxjs';
import {
    TreeTableColResizeEvent,
    TreeTableColumnReorderEvent,
    TreeTableContextMenuSelectEvent,
    TreeTableEditEvent,
    TreeTableFilterEvent,
    TreeTableFilterOptions,
    TreeTableHeaderCheckboxToggleEvent,
    TreeTableLazyLoadEvent,
    TreeTableNodeCollapseEvent,
    TreeTableNodeExpandEvent,
    TreeTableNodeUnSelectEvent,
    TreeTablePaginatorState,
    TreeTableSortEvent
} from './treetable.interface';

@Injectable()
export class TreeTableService {
    private sortSource = new Subject<SortMeta | SortMeta[] | null>();
    private selectionSource = new Subject();
    private contextMenuSource = new Subject<any>();
    private uiUpdateSource = new Subject<any>();
    private totalRecordsSource = new Subject<any>();

    sortSource$ = this.sortSource.asObservable();
    selectionSource$ = this.selectionSource.asObservable();
    contextMenuSource$ = this.contextMenuSource.asObservable();
    uiUpdateSource$ = this.uiUpdateSource.asObservable();
    totalRecordsSource$ = this.totalRecordsSource.asObservable();

    onSort(sortMeta: SortMeta | SortMeta[] | null) {
        this.sortSource.next(sortMeta);
    }

    onSelectionChange() {
        this.selectionSource.next(null);
    }

    onContextMenu(node: any) {
        this.contextMenuSource.next(node);
    }

    onUIUpdate(value: any) {
        this.uiUpdateSource.next(value);
    }

    onTotalRecordsChange(value: number) {
        this.totalRecordsSource.next(value);
    }
}
/**
 * TreeTable is used to display hierarchical data in tabular format.
 * @group Components
 */
@Component({
    selector: 'p-treeTable',
    template: `
        <div
            #container
            [ngStyle]="style"
            [class]="styleClass"
            data-scrollselectors=".p-treetable-scrollable-body"
            [ngClass]="{
                'p-treetable p-component': true,
                'p-treetable-hoverable-rows': rowHover || selectionMode === 'single' || selectionMode === 'multiple',
                'p-treetable-auto-layout': autoLayout,
                'p-treetable-resizable': resizableColumns,
                'p-treetable-resizable-fit': resizableColumns && columnResizeMode === 'fit',
                'p-treetable-flex-scrollable': scrollable && scrollHeight === 'flex'
            }"
        >
            <div class="p-treetable-loading" *ngIf="loading && showLoader">
                <div class="p-treetable-loading-overlay p-component-overlay">
                    <i *ngIf="loadingIcon" [class]="'p-treetable-loading-icon pi-spin ' + loadingIcon"></i>
                    <ng-container *ngIf="!loadingIcon">
                        <SpinnerIcon *ngIf="!loadingIconTemplate" [spin]="true" [styleClass]="'p-treetable-loading-icon'" />
                        <span *ngIf="loadingIconTemplate" class="p-treetable-loading-icon">
                            <ng-template *ngTemplateOutlet="loadingIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                </div>
            </div>
            <div *ngIf="captionTemplate" class="p-treetable-header">
                <ng-container *ngTemplateOutlet="captionTemplate"></ng-container>
            </div>
            <p-paginator
                [rows]="rows"
                [first]="first"
                [totalRecords]="totalRecords"
                [pageLinkSize]="pageLinks"
                styleClass="p-paginator-top"
                [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)"
                [rowsPerPageOptions]="rowsPerPageOptions"
                *ngIf="paginator && (paginatorPosition === 'top' || paginatorPosition == 'both')"
                [templateLeft]="paginatorLeftTemplate"
                [templateRight]="paginatorRightTemplate"
                [dropdownAppendTo]="paginatorDropdownAppendTo"
                [currentPageReportTemplate]="currentPageReportTemplate"
                [showFirstLastIcon]="showFirstLastIcon"
                [dropdownItemTemplate]="paginatorDropdownItemTemplate"
                [showCurrentPageReport]="showCurrentPageReport"
                [showJumpToPageDropdown]="showJumpToPageDropdown"
                [showPageLinks]="showPageLinks"
                [styleClass]="paginatorStyleClass"
                [locale]="paginatorLocale"
            >
                <ng-template pTemplate="firstpagelinkicon" *ngIf="paginatorFirstPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorFirstPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="previouspagelinkicon" *ngIf="paginatorPreviousPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorPreviousPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="lastpagelinkicon" *ngIf="paginatorLastPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorLastPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="nextpagelinkicon" *ngIf="paginatorNextPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorNextPageLinkIconTemplate"></ng-container>
                </ng-template>
            </p-paginator>

            <div class="p-treetable-wrapper" *ngIf="!scrollable">
                <table role="table" #table [ngClass]="tableStyleClass" [ngStyle]="tableStyle">
                    <ng-container *ngTemplateOutlet="colGroupTemplate; context: { $implicit: columns }"></ng-container>
                    <thead role="rowgroup" class="p-treetable-thead">
                        <ng-container *ngTemplateOutlet="headerTemplate; context: { $implicit: columns }"></ng-container>
                    </thead>
                    <tbody class="p-treetable-tbody" role="rowgroup" [pTreeTableBody]="columns" [pTreeTableBodyTemplate]="bodyTemplate"></tbody>
                    <tfoot class="p-treetable-tfoot" role="rowgroup">
                        <ng-container *ngTemplateOutlet="footerTemplate; context: { $implicit: columns }"></ng-container>
                    </tfoot>
                </table>
            </div>

            <div class="p-treetable-scrollable-wrapper" *ngIf="scrollable">
                <div
                    class="p-treetable-scrollable-view p-treetable-frozen-view"
                    *ngIf="frozenColumns || frozenBodyTemplate"
                    #scrollableFrozenView
                    [ttScrollableView]="frozenColumns"
                    [frozen]="true"
                    [ngStyle]="{ width: frozenWidth }"
                    [scrollHeight]="scrollHeight"
                ></div>
                <div class="p-treetable-scrollable-view" #scrollableView [ttScrollableView]="columns" [frozen]="false" [scrollHeight]="scrollHeight" [ngStyle]="{ left: frozenWidth, width: 'calc(100% - ' + frozenWidth + ')' }"></div>
            </div>

            <p-paginator
                [rows]="rows"
                [first]="first"
                [totalRecords]="totalRecords"
                [pageLinkSize]="pageLinks"
                styleClass="p-paginator-bottom"
                [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)"
                [rowsPerPageOptions]="rowsPerPageOptions"
                *ngIf="paginator && (paginatorPosition === 'bottom' || paginatorPosition == 'both')"
                [templateLeft]="paginatorLeftTemplate"
                [templateRight]="paginatorRightTemplate"
                [dropdownAppendTo]="paginatorDropdownAppendTo"
                [currentPageReportTemplate]="currentPageReportTemplate"
                [showFirstLastIcon]="showFirstLastIcon"
                [dropdownItemTemplate]="paginatorDropdownItemTemplate"
                [showCurrentPageReport]="showCurrentPageReport"
                [showJumpToPageDropdown]="showJumpToPageDropdown"
                [showPageLinks]="showPageLinks"
                [styleClass]="paginatorStyleClass"
                [locale]="paginatorLocale"
            >
                <ng-template pTemplate="firstpagelinkicon" *ngIf="paginatorFirstPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorFirstPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="previouspagelinkicon" *ngIf="paginatorPreviousPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorPreviousPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="lastpagelinkicon" *ngIf="paginatorLastPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorLastPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="nextpagelinkicon" *ngIf="paginatorNextPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorNextPageLinkIconTemplate"></ng-container>
                </ng-template>
            </p-paginator>
            <div *ngIf="summaryTemplate" class="p-treetable-footer">
                <ng-container *ngTemplateOutlet="summaryTemplate"></ng-container>
            </div>

            <div #resizeHelper class="p-column-resizer-helper" [ngStyle]="{ display: 'none' }" *ngIf="resizableColumns"></div>
            <span #reorderIndicatorUp class="p-treetable-reorder-indicator-up" [ngStyle]="{ display: 'none' }" *ngIf="reorderableColumns">
                <ArrowDownIcon *ngIf="!reorderIndicatorUpIconTemplate" />
                <ng-template *ngTemplateOutlet="reorderIndicatorUpIconTemplate"></ng-template>
            </span>
            <span #reorderIndicatorDown class="p-treetable-reorder-indicator-down" [ngStyle]="{ display: 'none' }" *ngIf="reorderableColumns">
                <ArrowUpIcon *ngIf="!reorderIndicatorDownIconTemplate" />
                <ng-template *ngTemplateOutlet="reorderIndicatorDownIconTemplate"></ng-template>
            </span>
        </div>
    `,
    providers: [TreeTableService],
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./treetable.css'],
    host: {
        class: 'p-element'
    }
})
export class TreeTable implements AfterContentInit, OnInit, OnDestroy, BlockableUI, OnChanges {
    /**
     * An array of objects to represent dynamic columns.
     * @group Props
     */
    @Input() columns: any[] | undefined;
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
     * Whether the cell widths scale according to their content or not.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autoLayout: boolean | undefined;
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
     * Index of the first row to be displayed.
     * @group Props
     */
    @Input({ transform: numberAttribute }) first: number = 0;
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
     * Target element to attach the paginator dropdown overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    @Input() paginatorDropdownAppendTo: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any;
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
     * When true, resets paginator to first page after sorting.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) resetPageOnSort: boolean = true;
    /**
     * Whether to use the default sorting or a custom one using sortFunction.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) customSort: boolean | undefined;
    /**
     * Specifies the selection mode, valid values are "single" and "multiple".
     * @group Props
     */
    @Input() selectionMode: string | undefined;
    /**
     * Selected row with a context menu.
     * @group Props
     */
    @Input() contextMenuSelection: any;
    /**
     * Mode of the contet menu selection.
     * @group Props
     */
    @Input() contextMenuSelectionMode: string = 'separate';
    /**
     * A property to uniquely identify a record in data.
     * @group Props
     */
    @Input() dataKey: string | undefined;
    /**
     * Defines whether metaKey is should be considered for the selection. On touch enabled devices, metaKeySelection is turned off automatically.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) metaKeySelection: boolean | undefined = false;
    /**
     * Algorithm to define if a row is selected, valid values are "equals" that compares by reference and "deepEquals" that compares all fields.
     * @group Props
     */
    @Input() compareSelectionBy: string = 'deepEquals';
    /**
     * Adds hover effect to rows without the need for selectionMode.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) rowHover: boolean | undefined;
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
     * When specifies, enables horizontal and/or vertical scrolling.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) scrollable: boolean | undefined;
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
     * The delay (in milliseconds) before triggering the virtual scroll. This determines the time gap between the user's scroll action and the actual rendering of the next set of items in the virtual scroll.
     * @group Props
     */
    @Input({ transform: numberAttribute }) virtualScrollDelay: number = 150;
    /**
     * Width of the frozen columns container.
     * @group Props
     */
    @Input() frozenWidth: string | undefined;
    /**
     * An array of objects to represent dynamic columns that are frozen.
     * @group Props
     */
    @Input() frozenColumns: { [klass: string]: any } | null | undefined;
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
     * Local ng-template varilable of a ContextMenu.
     * @group Props
     */
    @Input() contextMenu: any;
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity.
     * @group Props
     */
    @Input() rowTrackBy: Function = (index: number, item: any) => item;
    /**
     * An array of FilterMetadata objects to provide external filters.
     * @group Props
     */
    @Input() filters: { [s: string]: FilterMetadata | undefined } = {};
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
     * Mode for filtering valid values are "lenient" and "strict". Default is lenient.
     * @group Props
     */
    @Input() filterMode: string = 'lenient';
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    @Input() filterLocale: string | undefined;
    /**
     * Locale to be used in paginator formatting.
     * @group Props
     */
    @Input() paginatorLocale: string | undefined;
    /**
     * Number of total records, defaults to length of value when not defined.
     * @group Props
     */
    @Input() get totalRecords(): number {
        return this._totalRecords;
    }
    set totalRecords(val: number) {
        this._totalRecords = val;
        this.tableService.onTotalRecordsChange(this._totalRecords);
    }
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
     * @defaultValue 1
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
     * @defaultValue null
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
     * @defaultValue null
     * @group Props
     */
    @Input() get selection(): any {
        return this._selection;
    }
    set selection(val: any) {
        this._selection = val;
    }
    /**
     * An array of objects to display.
     * @defaultValue null
     * @group Props
     */
    @Input() get value(): TreeNode<any>[] | undefined {
        return this._value;
    }
    set value(val: TreeNode<any>[] | undefined) {
        this._value = val;
    }
    /**
     * Indicates the height of rows to be scrolled.
     * @defaultValue 28
     * @group Props
     * @deprecated use virtualScrollItemSize property instead.
     */
    @Input() get virtualRowHeight(): number {
        return this._virtualRowHeight;
    }
    set virtualRowHeight(val: number) {
        this._virtualRowHeight = val;
        console.warn('The virtualRowHeight property is deprecated, use virtualScrollItemSize property instead.');
    }
    /**
     * A map of keys to control the selection state.
     * @group Props
     */
    @Input() get selectionKeys(): any {
        return this._selectionKeys;
    }
    set selectionKeys(value: any) {
        this._selectionKeys = value;
        this.selectionKeysChange.emit(this._selectionKeys);
    }
    /**
     * Callback to invoke on selected node change.
     * @param {TreeTableNode} object - Node instance.
     * @group Emits
     */
    @Output() selectionChange: EventEmitter<TreeTableNode<any> | TreeTableNode<any>[] | null> = new EventEmitter<TreeTableNode<any> | TreeTableNode<any>[] | null>();
    /**
     * Callback to invoke on context menu selection change.
     * @param {TreeTableNode} object - Node instance.
     * @group Emits
     */
    @Output() contextMenuSelectionChange: EventEmitter<TreeTableNode> = new EventEmitter<TreeTableNode>();
    /**
     * Callback to invoke when data is filtered.
     * @param {TreeTableFilterEvent} event - Custom filter event.
     * @group Emits
     */
    @Output() onFilter: EventEmitter<TreeTableFilterEvent> = new EventEmitter<TreeTableFilterEvent>();
    /**
     * Callback to invoke when a node is expanded.
     * @param {TreeTableNodeExpandEvent} event - Node expand event.
     * @group Emits
     */
    @Output() onNodeExpand: EventEmitter<TreeTableNodeExpandEvent> = new EventEmitter<TreeTableNodeExpandEvent>();
    /**
     * Callback to invoke when a node is collapsed.
     * @param {TreeTableNodeCollapseEvent} event - Node collapse event.
     * @group Emits
     */
    @Output() onNodeCollapse: EventEmitter<TreeTableNodeCollapseEvent> = new EventEmitter<TreeTableNodeCollapseEvent>();
    /**
     * Callback to invoke when pagination occurs.
     * @param {TreeTablePaginatorState} object - Paginator state.
     * @group Emits
     */
    @Output() onPage: EventEmitter<TreeTablePaginatorState> = new EventEmitter<TreeTablePaginatorState>();
    /**
     * Callback to invoke when a column gets sorted.
     * @param {Object} Object - Sort data.
     * @group Emits
     */
    @Output() onSort: EventEmitter<any> = new EventEmitter<any>();
    /**
     * Callback to invoke when paging, sorting or filtering happens in lazy mode.
     * @param {TreeTableLazyLoadEvent} event - Custom lazy load event.
     * @group Emits
     */
    @Output() onLazyLoad: EventEmitter<TreeTableLazyLoadEvent> = new EventEmitter<TreeTableLazyLoadEvent>();
    /**
     * An event emitter to invoke on custom sorting, refer to sorting section for details.
     * @param {TreeTableSortEvent} event - Custom sort event.
     * @group Emits
     */
    @Output() sortFunction: EventEmitter<TreeTableSortEvent> = new EventEmitter<TreeTableSortEvent>();
    /**
     * Callback to invoke when a column is resized.
     * @param {TreeTableColResizeEvent} event - Custom column resize event.
     * @group Emits
     */
    @Output() onColResize: EventEmitter<TreeTableColResizeEvent> = new EventEmitter<TreeTableColResizeEvent>();
    /**
     * Callback to invoke when a column is reordered.
     * @param {TreeTableColumnReorderEvent} event - Custom column reorder.
     * @group Emits
     */
    @Output() onColReorder: EventEmitter<TreeTableColumnReorderEvent> = new EventEmitter<TreeTableColumnReorderEvent>();
    /**
     * Callback to invoke when a node is selected.
     * @param {TreeTableNode} object - Node instance.
     * @group Emits
     */
    @Output() onNodeSelect: EventEmitter<TreeTableNode> = new EventEmitter<TreeTableNode>();
    /**
     * Callback to invoke when a node is unselected.
     * @param {TreeTableNodeUnSelectEvent} event - Custom node unselect event.
     * @group Emits
     */
    @Output() onNodeUnselect: EventEmitter<TreeTableNodeUnSelectEvent> = new EventEmitter<TreeTableNodeUnSelectEvent>();
    /**
     * Callback to invoke when a node is selected with right click.
     * @param {TreeTableContextMenuSelectEvent} event - Custom context menu select event.
     * @group Emits
     */
    @Output() onContextMenuSelect: EventEmitter<TreeTableContextMenuSelectEvent> = new EventEmitter<TreeTableContextMenuSelectEvent>();
    /**
     * Callback to invoke when state of header checkbox changes.
     * @param {TreeTableHeaderCheckboxToggleEvent} event - Custom checkbox toggle event.
     * @group Emits
     */
    @Output() onHeaderCheckboxToggle: EventEmitter<TreeTableHeaderCheckboxToggleEvent> = new EventEmitter<TreeTableHeaderCheckboxToggleEvent>();
    /**
     * Callback to invoke when a cell switches to edit mode.
     * @param {TreeTableEditEvent} event - Custom edit event.
     * @group Emits
     */
    @Output() onEditInit: EventEmitter<TreeTableEditEvent> = new EventEmitter<TreeTableEditEvent>();
    /**
     * Callback to invoke when cell edit is completed.
     * @param {TreeTableEditEvent} event - Custom edit event.
     * @group Emits
     */
    @Output() onEditComplete: EventEmitter<TreeTableEditEvent> = new EventEmitter<TreeTableEditEvent>();
    /**
     * Callback to invoke when cell edit is cancelled with escape key.
     * @param {TreeTableEditEvent} event - Custom edit event.
     * @group Emits
     */
    @Output() onEditCancel: EventEmitter<TreeTableEditEvent> = new EventEmitter<TreeTableEditEvent>();
    /**
     * Callback to invoke when selectionKeys are changed.
     * @param {Object} object - updated value of the selectionKeys.
     * @group Emits
     */
    @Output() selectionKeysChange: EventEmitter<any> = new EventEmitter();

    @ViewChild('container') containerViewChild: Nullable<ElementRef>;

    @ViewChild('resizeHelper') resizeHelperViewChild: Nullable<ElementRef>;

    @ViewChild('reorderIndicatorUp') reorderIndicatorUpViewChild: Nullable<ElementRef>;

    @ViewChild('reorderIndicatorDown') reorderIndicatorDownViewChild: Nullable<ElementRef>;

    @ViewChild('table') tableViewChild: Nullable<ElementRef>;

    @ViewChild('scrollableView') scrollableViewChild: Nullable<ElementRef>;

    @ViewChild('scrollableFrozenView') scrollableFrozenViewChild: Nullable<ElementRef>;

    @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<PrimeTemplate>>;

    _value: TreeNode<any>[] | undefined = [];

    _virtualRowHeight: number = 28;

    _selectionKeys: any;

    serializedValue: any[] | undefined | null;

    _totalRecords: number = 0;

    _multiSortMeta: SortMeta[] | undefined | null;

    _sortField: string | undefined | null;

    _sortOrder: number = 1;

    filteredNodes: Nullable<any[]>;

    filterTimeout: any;

    colGroupTemplate: Nullable<TemplateRef<any>>;

    captionTemplate: Nullable<TemplateRef<any>>;

    headerTemplate: Nullable<TemplateRef<any>>;

    bodyTemplate: Nullable<TemplateRef<any>>;

    footerTemplate: Nullable<TemplateRef<any>>;

    summaryTemplate: Nullable<TemplateRef<any>>;

    emptyMessageTemplate: Nullable<TemplateRef<any>>;

    paginatorLeftTemplate: Nullable<TemplateRef<any>>;

    paginatorRightTemplate: Nullable<TemplateRef<any>>;

    paginatorDropdownItemTemplate: Nullable<TemplateRef<any>>;

    frozenHeaderTemplate: Nullable<TemplateRef<any>>;

    frozenBodyTemplate: Nullable<TemplateRef<any>>;

    frozenFooterTemplate: Nullable<TemplateRef<any>>;

    frozenColGroupTemplate: Nullable<TemplateRef<any>>;

    loadingIconTemplate: Nullable<TemplateRef<any>>;

    reorderIndicatorUpIconTemplate: Nullable<TemplateRef<any>>;

    reorderIndicatorDownIconTemplate: Nullable<TemplateRef<any>>;

    sortIconTemplate: Nullable<TemplateRef<any>>;

    checkboxIconTemplate: Nullable<TemplateRef<any>>;

    headerCheckboxIconTemplate: Nullable<TemplateRef<any>>;

    togglerIconTemplate: Nullable<TemplateRef<any>>;

    paginatorFirstPageLinkIconTemplate: Nullable<TemplateRef<any>>;

    paginatorLastPageLinkIconTemplate: Nullable<TemplateRef<any>>;

    paginatorPreviousPageLinkIconTemplate: Nullable<TemplateRef<any>>;

    paginatorNextPageLinkIconTemplate: Nullable<TemplateRef<any>>;

    lastResizerHelperX: Nullable<number>;

    reorderIconWidth: Nullable<number>;

    reorderIconHeight: Nullable<number>;

    draggedColumn: Nullable<any[]>;

    dropPosition: Nullable<number>;

    preventSelectionSetterPropagation: Nullable<boolean>;

    _selection: any;

    selectedKeys: any = {};

    rowTouched: Nullable<boolean>;

    editingCell: Nullable<Element>;

    editingCellData: any | undefined | null;

    editingCellField: any | undefined | null;

    editingCellClick: Nullable<boolean>;

    documentEditListener: VoidListener;

    initialized: Nullable<boolean>;

    toggleRowIndex: Nullable<number>;

    ngOnInit() {
        if (this.lazy && this.lazyLoadOnInit && !this.virtualScroll) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        this.initialized = true;
    }

    ngAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'caption':
                    this.captionTemplate = item.template;
                    break;

                case 'header':
                    this.headerTemplate = item.template;
                    break;

                case 'body':
                    this.bodyTemplate = item.template;
                    break;

                case 'footer':
                    this.footerTemplate = item.template;
                    break;

                case 'summary':
                    this.summaryTemplate = item.template;
                    break;

                case 'colgroup':
                    this.colGroupTemplate = item.template;
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

                case 'paginatordropdownitem':
                    this.paginatorDropdownItemTemplate = item.template;
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

                case 'togglericon':
                    this.togglerIconTemplate = item.template;
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
            }
        });
    }

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private renderer: Renderer2,
        public el: ElementRef,
        public cd: ChangeDetectorRef,
        public zone: NgZone,
        public tableService: TreeTableService,
        public filterService: FilterService,
        public config: PrimeNGConfig
    ) {}

    ngOnChanges(simpleChange: SimpleChanges) {
        if (simpleChange.value) {
            this._value = simpleChange.value.currentValue;

            if (!this.lazy) {
                this.totalRecords = this._value ? this._value.length : 0;

                if (this.sortMode == 'single' && this.sortField) this.sortSingle();
                else if (this.sortMode == 'multiple' && this.multiSortMeta) this.sortMultiple();
                else if (this.hasFilter())
                    //sort already filters
                    this._filter();
            }

            this.updateSerializedValue();
            this.tableService.onUIUpdate(this.value);
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

        if (simpleChange.sortOrder) {
            this._sortOrder = simpleChange.sortOrder.currentValue;

            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                if (this.sortMode === 'single') {
                    this.sortSingle();
                }
            }
        }

        if (simpleChange.multiSortMeta) {
            this._multiSortMeta = simpleChange.multiSortMeta.currentValue;
            if (this.sortMode === 'multiple') {
                this.sortMultiple();
            }
        }

        if (simpleChange.selection) {
            this._selection = simpleChange.selection.currentValue;

            if (!this.preventSelectionSetterPropagation) {
                this.updateselectedKeys();
                this.tableService.onSelectionChange();
            }
            this.preventSelectionSetterPropagation = false;
        }
    }

    updateSerializedValue() {
        this.serializedValue = [];

        if (this.paginator) this.serializePageNodes();
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
            const first = this.lazy ? 0 : this.first;

            for (let i = first; i < first + <number>this.rows; i++) {
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
        if (this.dataKey && this._selection) {
            this.selectedKeys = {};
            if (Array.isArray(this._selection)) {
                for (let node of this._selection) {
                    this.selectedKeys[String(ObjectUtils.resolveFieldData(node.data, this.dataKey))] = 1;
                }
            } else {
                this.selectedKeys[String(ObjectUtils.resolveFieldData((<any>this._selection).data, this.dataKey))] = 1;
            }
        }
    }

    onPageChange(event: TreeTablePaginatorState) {
        this.first = <number>event.first;
        this.rows = <number>event.rows;

        if (this.lazy) this.onLazyLoad.emit(this.createLazyLoadMetadata());
        else this.serializePageNodes();

        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });

        this.tableService.onUIUpdate(this.value);

        if (this.scrollable) {
            this.resetScrollTop();
        }
    }

    sort(event: TreeTableSortEvent) {
        let originalEvent = event.originalEvent;

        if (this.sortMode === 'single') {
            this._sortOrder = this.sortField === event.field ? this.sortOrder * -1 : this.defaultSortOrder;
            this._sortField = event.field;
            this.sortSingle();

            if (this.resetPageOnSort && this.scrollable) {
                this.resetScrollTop();
            }
        }
        if (this.sortMode === 'multiple') {
            let metaKey = (<KeyboardEvent>originalEvent).metaKey || (<KeyboardEvent>originalEvent).ctrlKey;
            let sortMeta = this.getSortMeta(<string>event.field);

            if (sortMeta) {
                if (!metaKey) {
                    this._multiSortMeta = [{ field: <string>event.field, order: sortMeta.order * -1 }];

                    if (this.resetPageOnSort && this.scrollable) {
                        this.resetScrollTop();
                    }
                } else {
                    sortMeta.order = sortMeta.order * -1;
                }
            } else {
                if (!metaKey || !this.multiSortMeta) {
                    this._multiSortMeta = [];

                    if (this.resetPageOnSort && this.scrollable) {
                        this.resetScrollTop();
                    }
                }
                (<SortMeta[]>this.multiSortMeta).push({ field: <string>event.field, order: this.defaultSortOrder });
            }

            this.sortMultiple();
        }
    }

    sortSingle() {
        if (this.sortField && this.sortOrder) {
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            } else if (this.value) {
                this.sortNodes(this.value);

                if (this.hasFilter()) {
                    this._filter();
                }
            }

            let sortMeta: SortMeta = {
                field: this.sortField,
                order: this.sortOrder
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

        if (this.customSort) {
            this.sortFunction.emit({
                data: nodes,
                mode: this.sortMode,
                field: <string>this.sortField,
                order: this.sortOrder
            });
        } else {
            nodes.sort((node1, node2) => {
                let value1 = ObjectUtils.resolveFieldData(node1.data, this.sortField);
                let value2 = ObjectUtils.resolveFieldData(node2.data, this.sortField);
                let result = null;

                if (value1 == null && value2 != null) result = -1;
                else if (value1 != null && value2 == null) result = 1;
                else if (value1 == null && value2 == null) result = 0;
                else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2, undefined, { numeric: true });
                else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

                return this.sortOrder * result;
            });
        }

        for (let node of nodes) {
            this.sortNodes(node.children as TreeNode[]);
        }
    }

    sortMultiple() {
        if (this.multiSortMeta) {
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            } else if (this.value) {
                this.sortMultipleNodes(this.value);

                if (this.hasFilter()) {
                    this._filter();
                }
            }

            this.onSort.emit({
                multisortmeta: this.multiSortMeta
            });
            this.updateSerializedValue();
            this.tableService.onSort(this.multiSortMeta);
        }
    }

    sortMultipleNodes(nodes: TreeNode[]) {
        if (!nodes || nodes.length === 0) {
            return;
        }

        if (this.customSort) {
            this.sortFunction.emit({
                data: this.value,
                mode: this.sortMode,
                multiSortMeta: this.multiSortMeta
            });
        } else {
            nodes.sort((node1, node2) => {
                return this.multisortField(node1, node2, <SortMeta[]>this.multiSortMeta, 0);
            });
        }

        for (let node of nodes) {
            this.sortMultipleNodes(node.children as TreeNode[]);
        }
    }

    multisortField(node1: TreeTableNode, node2: TreeTableNode, multiSortMeta: SortMeta[], index: number): number {
        if (ObjectUtils.isEmpty(this.multiSortMeta) || ObjectUtils.isEmpty(multiSortMeta[index])) {
            return 0;
        }

        let value1 = ObjectUtils.resolveFieldData(node1.data, multiSortMeta[index].field);
        let value2 = ObjectUtils.resolveFieldData(node2.data, multiSortMeta[index].field);
        let result = null;

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

        return multiSortMeta[index].order * <number>result;
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

    createLazyLoadMetadata(): any {
        return {
            first: this.first,
            rows: this.rows,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            filters: this.filters,
            globalFilter: this.filters && this.filters['global'] ? this.filters['global'].value : null,
            multiSortMeta: this.multiSortMeta,
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
        if (this.virtualScroll) this.scrollToVirtualIndex(0);
        else this.scrollTo({ top: 0 });
    }
    /**
     * Scrolls to given index when using virtual scroll.
     * @param {number} index - index of the element.
     * @group Method
     */
    public scrollToVirtualIndex(index: number) {
        if (this.scrollableViewChild) {
            (<any>this.scrollableViewChild).scrollToVirtualIndex(<number>index);
        }

        if (this.scrollableFrozenViewChild) {
            (<any>this.scrollableViewChild).scrollToVirtualIndex(index);
        }
    }
    /**
     * Scrolls to given index.
     * @param {ScrollToOptions} options - Scroll options.
     * @group Method
     */
    public scrollTo(options: ScrollToOptions) {
        if (this.scrollableViewChild) {
            (<any>this.scrollableViewChild).scrollTo(options);
        }

        if (this.scrollableFrozenViewChild) {
            (<any>this.scrollableViewChild).scrollTo(options);
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
        let containerLeft = DomHandler.getOffset(this.containerViewChild?.nativeElement).left;
        this.lastResizerHelperX = event.pageX - containerLeft + this.containerViewChild?.nativeElement.scrollLeft;
        event.preventDefault();
    }

    onColumnResize(event: MouseEvent) {
        let containerLeft = DomHandler.getOffset(this.containerViewChild?.nativeElement).left;
        DomHandler.addClass(this.containerViewChild?.nativeElement, 'p-unselectable-text');
        (<ElementRef>this.resizeHelperViewChild).nativeElement.style.height = this.containerViewChild?.nativeElement.offsetHeight + 'px';
        (<ElementRef>this.resizeHelperViewChild).nativeElement.style.top = 0 + 'px';
        (<ElementRef>this.resizeHelperViewChild).nativeElement.style.left = event.pageX - containerLeft + this.containerViewChild?.nativeElement.scrollLeft + 'px';

        (<ElementRef>this.resizeHelperViewChild).nativeElement.style.display = 'block';
    }

    onColumnResizeEnd(event: MouseEvent, column: any) {
        let delta = (<ElementRef>this.resizeHelperViewChild).nativeElement.offsetLeft - <number>this.lastResizerHelperX;
        let columnWidth = column.offsetWidth;
        let newColumnWidth = columnWidth + delta;
        let minWidth = column.style.minWidth || 15;

        if (columnWidth + delta > parseInt(minWidth)) {
            if (this.columnResizeMode === 'fit') {
                let nextColumn = column.nextElementSibling;
                while (!nextColumn.offsetParent) {
                    nextColumn = nextColumn.nextElementSibling;
                }

                if (nextColumn) {
                    let nextColumnWidth = nextColumn.offsetWidth - delta;
                    let nextColumnMinWidth = nextColumn.style.minWidth || 15;

                    if (newColumnWidth > 15 && nextColumnWidth > parseInt(nextColumnMinWidth)) {
                        if (this.scrollable) {
                            let scrollableView = this.findParentScrollableView(column);
                            let scrollableBodyTable = DomHandler.findSingle(scrollableView, '.p-treetable-scrollable-body table') || DomHandler.findSingle(scrollableView, '.p-scroller-viewport table');
                            let scrollableHeaderTable = DomHandler.findSingle(scrollableView, 'table.p-treetable-scrollable-header-table');
                            let scrollableFooterTable = DomHandler.findSingle(scrollableView, 'table.p-treetable-scrollable-footer-table');
                            let resizeColumnIndex = DomHandler.index(column);

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
            } else if (this.columnResizeMode === 'expand') {
                if (this.scrollable) {
                    let scrollableView = this.findParentScrollableView(column);
                    let scrollableBody = DomHandler.findSingle(scrollableView, '.p-treetable-scrollable-body') || DomHandler.findSingle(scrollableView, '.p-scroller-viewport');
                    let scrollableHeader = DomHandler.findSingle(scrollableView, '.p-treetable-scrollable-header');
                    let scrollableFooter = DomHandler.findSingle(scrollableView, '.p-treetable-scrollable-footer');
                    let scrollableBodyTable = DomHandler.findSingle(scrollableView, '.p-treetable-scrollable-body table') || DomHandler.findSingle(scrollableView, '.p-scroller-viewport table');
                    let scrollableHeaderTable = DomHandler.findSingle(scrollableView, 'table.p-treetable-scrollable-header-table');
                    let scrollableFooterTable = DomHandler.findSingle(scrollableView, 'table.p-treetable-scrollable-footer-table');
                    scrollableBodyTable.style.width = scrollableBodyTable.offsetWidth + delta + 'px';
                    scrollableHeaderTable.style.width = scrollableHeaderTable.offsetWidth + delta + 'px';
                    if (scrollableFooterTable) {
                        scrollableFooterTable.style.width = scrollableFooterTable.offsetWidth + delta + 'px';
                    }
                    let resizeColumnIndex = DomHandler.index(column);

                    const scrollableBodyTableWidth = column ? scrollableBodyTable.offsetWidth + delta : newColumnWidth;
                    const scrollableHeaderTableWidth = column ? scrollableHeaderTable.offsetWidth + delta : newColumnWidth;
                    const isContainerInViewport = this.containerViewChild?.nativeElement.offsetWidth >= scrollableBodyTableWidth;

                    let setWidth = (container: HTMLElement, table: HTMLElement, width: number, isContainerInViewport: boolean) => {
                        if (container && table) {
                            container.style.width = isContainerInViewport ? width + DomHandler.calculateScrollbarWidth(scrollableBody) + 'px' : 'auto';
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
                    (<ElementRef>this.tableViewChild).nativeElement.style.width = this.tableViewChild?.nativeElement.offsetWidth + delta + 'px';
                    column.style.width = newColumnWidth + 'px';
                    let containerWidth = this.tableViewChild?.nativeElement.style.width;
                    (<ElementRef>this.containerViewChild).nativeElement.style.width = containerWidth + 'px';
                }
            }

            this.onColResize.emit({
                element: column,
                delta: delta
            });
        }

        (this.resizeHelperViewChild as ElementRef).nativeElement.style.display = 'none';
        DomHandler.removeClass(this.containerViewChild?.nativeElement, 'p-unselectable-text');
    }

    findParentScrollableView(column: any) {
        if (column) {
            let parent = column.parentElement;
            while (parent && !DomHandler.hasClass(parent, 'p-treetable-scrollable-view')) {
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
        this.reorderIconWidth = DomHandler.getHiddenElementOuterWidth(this.reorderIndicatorUpViewChild?.nativeElement);
        this.reorderIconHeight = DomHandler.getHiddenElementOuterHeight(this.reorderIndicatorDownViewChild?.nativeElement);
        this.draggedColumn = columnElement;
        (<any>event).dataTransfer.setData('text', 'b'); // For firefox
    }

    onColumnDragEnter(event: DragEvent, dropHeader: any) {
        if (this.reorderableColumns && this.draggedColumn && dropHeader) {
            event.preventDefault();
            let containerOffset = DomHandler.getOffset(this.containerViewChild?.nativeElement);
            let dropHeaderOffset = DomHandler.getOffset(dropHeader);

            if (this.draggedColumn != dropHeader) {
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
                (<any>event).dataTransfer.dropEffect = 'none';
            }
        }
    }

    onColumnDragLeave(event: DragEvent) {
        if (this.reorderableColumns && this.draggedColumn) {
            event.preventDefault();
            (<ElementRef>this.reorderIndicatorUpViewChild).nativeElement.style.display = 'none';
            (<ElementRef>this.reorderIndicatorDownViewChild).nativeElement.style.display = 'none';
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
                ObjectUtils.reorderArray(<any[]>this.columns, dragIndex, dropIndex);

                this.onColReorder.emit({
                    dragIndex: dragIndex,
                    dropIndex: dropIndex,
                    columns: this.columns
                });
            }

            (<ElementRef>this.reorderIndicatorUpViewChild).nativeElement.style.display = 'none';
            (<ElementRef>this.reorderIndicatorDownViewChild).nativeElement.style.display = 'none';
            (this.draggedColumn as any).draggable = false;
            this.draggedColumn = null;
            this.dropPosition = null;
        }
    }

    handleRowClick(event: any) {
        let targetNode = (<HTMLElement>event.originalEvent.target).nodeName;
        if (targetNode == 'INPUT' || targetNode == 'BUTTON' || targetNode == 'A' || DomHandler.hasClass(event.originalEvent.target, 'p-clickable')) {
            return;
        }

        if (this.selectionMode) {
            this.preventSelectionSetterPropagation = true;
            let rowNode = event.rowNode;
            let selected = this.isSelected((<any>rowNode).node);
            let metaSelection = this.rowTouched ? false : this.metaKeySelection;
            let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData((<TreeTableNode>rowNode.node).data, this.dataKey)) : null;

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
                        this._selection = this.selection.filter((val: TreeTableNode, i: number) => i != selectionIndex);
                        this.selectionChange.emit(this.selection);
                        if (dataKeyValue) {
                            delete this.selectedKeys[dataKeyValue];
                        }
                    }

                    this.onNodeUnselect.emit({ originalEvent: event.originalEvent, node: <TreeTableNode>rowNode.node, type: 'row' });
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
                            this._selection = this.selection || [];
                        } else {
                            this._selection = [];
                            this.selectedKeys = {};
                        }

                        this._selection = [...this.selection, rowNode.node];
                        this.selectionChange.emit(this.selection);
                        if (dataKeyValue) {
                            this.selectedKeys[dataKeyValue] = 1;
                        }
                    }

                    this.onNodeSelect.emit({ originalEvent: event.originalEvent, node: rowNode.node, type: 'row', index: (<any>event).rowIndex });
                }
            } else {
                if (this.selectionMode === 'single') {
                    if (selected) {
                        this._selection = null;
                        this.selectedKeys = {};
                        this.selectionChange.emit(this.selection);
                        this.onNodeUnselect.emit({ originalEvent: event.originalEvent, node: <TreeTableNode>rowNode.node, type: 'row' });
                    } else {
                        this._selection = rowNode.node;
                        this.selectionChange.emit(this.selection);
                        this.onNodeSelect.emit({ originalEvent: event.originalEvent, node: rowNode.node, type: 'row', index: event.rowIndex });
                        if (dataKeyValue) {
                            this.selectedKeys = {};
                            this.selectedKeys[dataKeyValue] = 1;
                        }
                    }
                } else if (this.selectionMode === 'multiple') {
                    if (selected) {
                        let selectionIndex = this.findIndexInSelection(rowNode.node);
                        this._selection = this.selection.filter((val: TreeTableNode, i: number) => i != selectionIndex);
                        this.selectionChange.emit(this.selection);
                        this.onNodeUnselect.emit({ originalEvent: event.originalEvent, node: rowNode.node, type: 'row' });
                        if (dataKeyValue) {
                            delete this.selectedKeys[dataKeyValue];
                        }
                    } else {
                        this._selection = this.selection ? [...this.selection, rowNode.node] : [rowNode.node];
                        this.selectionChange.emit(this.selection);
                        this.onNodeSelect.emit({ originalEvent: event.originalEvent, node: rowNode.node, type: 'row', index: event.rowIndex });
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
        if (this.contextMenu) {
            const node = event.rowNode.node;

            if (this.contextMenuSelectionMode === 'separate') {
                this.contextMenuSelection = node;
                this.contextMenuSelectionChange.emit(node);
                this.onContextMenuSelect.emit({ originalEvent: event.originalEvent, node: node });
                this.contextMenu.show(event.originalEvent);
                this.tableService.onContextMenu(node);
            } else if (this.contextMenuSelectionMode === 'joint') {
                this.preventSelectionSetterPropagation = true;
                let selected = this.isSelected(node);
                let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(node.data, this.dataKey)) : null;

                if (!selected) {
                    if (this.isSingleSelectionMode()) {
                        this.selection = node;
                        this.selectionChange.emit(node);
                    } else if (this.isMultipleSelectionMode()) {
                        this.selection = [node];
                        this.selectionChange.emit(this.selection);
                    }

                    if (dataKeyValue) {
                        this.selectedKeys[dataKeyValue] = 1;
                    }
                }

                this.contextMenu.show(event.originalEvent);
                this.onContextMenuSelect.emit({ originalEvent: event.originalEvent, node: node });
            }
        }
    }

    toggleNodeWithCheckbox(event: any) {
        // legacy selection support, will be removed in v18
        this.selection = this.selection || [];
        this.preventSelectionSetterPropagation = true;
        let node = event.rowNode.node;
        let selected = this.isSelected(node);

        if (selected) {
            this.propagateSelectionDown(node, false);
            if (event.rowNode.parent) {
                this.propagateSelectionUp(node.parent, false);
            }
            this.selectionChange.emit(this.selection);
            this.onNodeUnselect.emit({ originalEvent: event, node: node });
        } else {
            this.propagateSelectionDown(node, true);
            if (event.rowNode.parent) {
                this.propagateSelectionUp(node.parent, true);
            }
            this.selectionChange.emit(this.selection);
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

        if (!this.selectionKeys) {
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
                this.selectionKeysChange.emit(this.selectionKeys);
            }
        }
    }

    propagateSelectionUp(node: TreeTableNode, select: boolean) {
        // legacy selection support, will be removed in v18
        if (node.children && node.children.length) {
            let selectedChildCount: number = 0;
            let childPartialSelected: boolean = false;
            let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(node.data, this.dataKey)) : null;

            for (let child of node.children) {
                if (this.isSelected(child)) selectedChildCount++;
                else if (child.partialSelected) childPartialSelected = true;
            }

            if (select && selectedChildCount == node.children.length) {
                this._selection = [...(this.selection || []), node];
                node.partialSelected = false;
                if (dataKeyValue) {
                    this.selectedKeys[dataKeyValue] = 1;
                }
            } else {
                if (!select) {
                    let index = this.findIndexInSelection(node);
                    if (index >= 0) {
                        this._selection = this.selection.filter((val: any, i: number) => i != index);

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
        let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(node.data, this.dataKey)) : null;

        if (select && index == -1) {
            this._selection = [...(this.selection || []), node];
            if (dataKeyValue) {
                this.selectedKeys[dataKeyValue] = 1;
            }
        } else if (!select && index > -1) {
            this._selection = this.selection.filter((val: any, i: number) => i != index);
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
        if (node && this.selection) {
            if (this.dataKey) {
                if (node.hasOwnProperty('checked')) {
                    return node['checked'];
                } else {
                    return this.selectedKeys[ObjectUtils.resolveFieldData(node.data, this.dataKey)] !== undefined;
                }
            } else {
                if (Array.isArray(this.selection)) return this.findIndexInSelection(node) > -1;
                else return this.equals(node, this.selection);
            }
        }

        return false;
    }

    isNodeSelected(node) {
        return this.selectionMode && this.selectionKeys ? this.selectionKeys[this.nodeKey(node)]?.checked === true : false;
    }

    isNodePartialSelected(node) {
        return this.selectionMode && this.selectionKeys ? this.selectionKeys[this.nodeKey(node)]?.partialChecked === true : false;
    }

    nodeKey(node) {
        return ObjectUtils.resolveFieldData(node, this.dataKey) || ObjectUtils.resolveFieldData(node?.data, this.dataKey);
    }

    toggleCheckbox(event) {
        let { rowNode, check, originalEvent } = event;
        let node = rowNode.node;
        if (this.selectionKeys) {
            this.propagateDown(node, check);
            if (node.parent) {
                this.propagateUp(node.parent, check);
            }

            this.selectionKeysChange.emit(this.selectionKeys);
        } else {
            this.toggleNodeWithCheckbox({ originalEvent, rowNode });
        }

        this.tableService.onSelectionChange();
    }

    propagateDown(node, check) {
        if (check) {
            this.selectionKeys[this.nodeKey(node)] = { checked: true, partialChecked: false };
        } else {
            delete this.selectionKeys[this.nodeKey(node)];
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
            if (this.selectionKeys[this.nodeKey(child)] && this.selectionKeys[this.nodeKey(child)].checked) checkedChildCount++;
            else if (this.selectionKeys[this.nodeKey(child)] && this.selectionKeys[this.nodeKey(child)].partialChecked) childPartialSelected = true;
        }

        if (check && checkedChildCount === node.children.length) {
            this.selectionKeys[this.nodeKey(node)] = { checked: true, partialChecked: false };
        } else {
            if (!check) {
                delete this.selectionKeys[this.nodeKey(node)];
            }

            if (childPartialSelected || (checkedChildCount > 0 && checkedChildCount !== node.children.length)) this.selectionKeys[this.nodeKey(node)] = { checked: false, partialChecked: true };
            else this.selectionKeys[this.nodeKey(node)] = { checked: false, partialChecked: false };
        }

        let parent = node.parent;
        if (parent) {
            this.propagateUp(parent, check);
        }
    }

    findIndexInSelection(node: any) {
        let index: number = -1;
        if (this.selection && this.selection.length) {
            for (let i = 0; i < this.selection.length; i++) {
                if (this.equals(node, this.selection[i])) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }

    isSingleSelectionMode() {
        return this.selectionMode === 'single';
    }

    isMultipleSelectionMode() {
        return this.selectionMode === 'multiple';
    }

    equals(node1: TreeTableNode, node2: TreeTableNode) {
        return this.compareSelectionBy === 'equals' ? ObjectUtils.equals(node1, node2) : ObjectUtils.equals(node1.data, node2.data, this.dataKey);
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
        }, this.filterDelay);
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
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        } else {
            if (!this.value) {
                return;
            }

            if (!this.hasFilter()) {
                this.filteredNodes = null;
                if (this.paginator) {
                    this.totalRecords = this.value ? this.value.length : 0;
                }
            } else {
                let globalFilterFieldsArray;
                if (this.filters['global']) {
                    if (!this.columns && !this.globalFilterFields) throw new Error('Global filtering requires dynamic columns or globalFilterFields to be defined.');
                    else globalFilterFieldsArray = this.globalFilterFields || this.columns;
                }

                this.filteredNodes = [];
                const isStrictMode = this.filterMode === 'strict';
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
                        paramsWithoutNode = { filterField, filterValue, filterConstraint, isStrictMode, globalFilterFieldsArray };

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

                if (this.paginator) {
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

        if (this.scrollable) {
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
        const isMatched = (field: string) => filterConstraint(ObjectUtils.resolveFieldData(node.data, field), filterValue, <string>this.filterLocale);

        matched = globalFilterFieldsArray?.length ? globalFilterFieldsArray.some((globalFilterField) => isMatched(globalFilterField.field || globalFilterField)) : isMatched(filterField);

        if (!matched || (isStrictMode && !this.isNodeLeaf(node))) {
            matched = this.findFilteredNodes(node, { filterField, filterValue, filterConstraint, isStrictMode, globalFilterFieldsArray }) || matched;
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

        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        } else {
            this.totalRecords = this._value ? this._value.length : 0;
        }
    }

    updateEditingCell(cell: any, data: any, field: string) {
        this.editingCell = cell;
        this.editingCellData = data;
        this.editingCellField = field;
        this.bindDocumentEditListener();
    }

    isEditingCellValid() {
        return this.editingCell && DomHandler.find(this.editingCell, '.ng-invalid.ng-dirty').length === 0;
    }

    bindDocumentEditListener() {
        if (!this.documentEditListener) {
            this.documentEditListener = this.renderer.listen(this.document, 'click', (event) => {
                if (this.editingCell && !this.editingCellClick && this.isEditingCellValid()) {
                    DomHandler.removeClass(this.editingCell, 'p-cell-editing');
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

    ngOnDestroy() {
        this.unbindDocumentEditListener();
        this.editingCell = null;
        this.editingCellField = null;
        this.editingCellData = null;
        this.initialized = null;
    }
}

@Component({
    selector: '[pTreeTableBody]',
    template: `
        <ng-template ngFor let-serializedNode let-rowIndex="index" [ngForOf]="serializedNodes || tt.serializedValue" [ngForTrackBy]="tt.rowTrackBy">
            <ng-container *ngIf="serializedNode.visible">
                <ng-container *ngTemplateOutlet="template; context: { $implicit: serializedNode, node: serializedNode.node, rowData: serializedNode.node.data, columns: columns }"></ng-container>
            </ng-container>
        </ng-template>
        <ng-container *ngIf="tt.isEmpty()">
            <ng-container *ngTemplateOutlet="tt.emptyMessageTemplate; context: { $implicit: columns, frozen: frozen }"></ng-container>
        </ng-container>
    `,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    }
})
export class TTBody {
    @Input('pTreeTableBody') columns: any[] | undefined;

    @Input('pTreeTableBodyTemplate') template: Nullable<TemplateRef<any>>;

    @Input({ transform: booleanAttribute }) frozen: boolean | undefined;

    @Input() serializedNodes: any;

    @Input() scrollerOptions: any;

    subscription: Subscription;

    constructor(public tt: TreeTable, public treeTableService: TreeTableService, public cd: ChangeDetectorRef) {
        this.subscription = this.tt.tableService.uiUpdateSource$.subscribe(() => {
            if (this.tt.virtualScroll) {
                this.cd.detectChanges();
            }
        });
    }

    getScrollerOption(option: any, options?: any) {
        if (this.tt.virtualScroll) {
            options = options || this.scrollerOptions;
            return options ? options[option] : null;
        }

        return null;
    }

    getRowIndex(rowIndex: number) {
        const getItemOptions = this.getScrollerOption('getItemOptions');
        return getItemOptions ? getItemOptions(rowIndex).index : rowIndex;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

@Component({
    selector: '[ttScrollableView]',
    template: `
        <div #scrollHeader class="p-treetable-scrollable-header">
            <div #scrollHeaderBox class="p-treetable-scrollable-header-box">
                <table class="p-treetable-scrollable-header-table" [ngClass]="tt.tableStyleClass" [ngStyle]="tt.tableStyle">
                    <ng-container *ngTemplateOutlet="frozen ? tt.frozenColGroupTemplate || tt.colGroupTemplate : tt.colGroupTemplate; context: { $implicit: columns }"></ng-container>
                    <thead role="rowgroup" class="p-treetable-thead">
                        <ng-container *ngTemplateOutlet="frozen ? tt.frozenHeaderTemplate || tt.headerTemplate : tt.headerTemplate; context: { $implicit: columns }"></ng-container>
                    </thead>
                </table>
            </div>
        </div>

        <p-scroller
            *ngIf="tt.virtualScroll"
            #scroller
            [items]="tt.serializedValue"
            styleClass="p-treetable-scrollable-body"
            [style]="{ height: tt.scrollHeight !== 'flex' ? tt.scrollHeight : undefined }"
            [scrollHeight]="scrollHeight !== 'flex' ? undefined : '100%'"
            [itemSize]="tt.virtualScrollItemSize || tt._virtualRowHeight"
            [lazy]="tt.lazy"
            (onLazyLoad)="tt.onLazyItemLoad($event)"
            [options]="tt.virtualScrollOptions"
        >
            <ng-template pTemplate="content" let-items let-scrollerOptions="options">
                <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: items, options: scrollerOptions }"></ng-container>
            </ng-template>
            <ng-container *ngIf="loaderTemplate">
                <ng-template pTemplate="loader" let-scrollerOptions="options">
                    <ng-container *ngTemplateOutlet="loaderTemplate; context: { options: scrollerOptions }"></ng-container>
                </ng-template>
            </ng-container>
        </p-scroller>
        <ng-container *ngIf="!tt.virtualScroll">
            <div #scrollBody class="p-treetable-scrollable-body" [ngStyle]="{ 'max-height': tt.scrollHeight !== 'flex' ? scrollHeight : undefined, 'overflow-y': !frozen && tt.scrollHeight ? 'scroll' : undefined }">
                <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: serializedValue, options: {} }"></ng-container>
            </div>
        </ng-container>

        <ng-template #buildInItems let-items let-scrollerOptions="options">
            <table role="table" #scrollTable [class]="tt.tableStyleClass" [ngClass]="scrollerOptions.contentStyleClass" [ngStyle]="getMergedTableStyles(scrollerOptions.contentStyle)">
                <ng-container *ngTemplateOutlet="frozen ? tt.frozenColGroupTemplate || tt.colGroupTemplate : tt.colGroupTemplate; context: { $implicit: columns }"></ng-container>
                <tbody role="rowgroup" class="p-treetable-tbody" [pTreeTableBody]="columns" [pTreeTableBodyTemplate]="frozen ? tt.frozenBodyTemplate || tt.bodyTemplate : tt.bodyTemplate" [serializedNodes]="items" [frozen]="frozen"></tbody>
            </table>
            <div #scrollableAligner [ngStyle]="{ 'background-color': 'transparent' }" *ngIf="frozen"></div>
        </ng-template>

        <div #scrollFooter *ngIf="tt.footerTemplate" class="p-treetable-scrollable-footer">
            <div #scrollFooterBox class="p-treetable-scrollable-footer-box">
                <table class="p-treetable-scrollable-footer-table" [ngClass]="tt.tableStyleClass" [ngStyle]="tt.tableStyle">
                    <ng-container *ngTemplateOutlet="frozen ? tt.frozenColGroupTemplate || tt.colGroupTemplate : tt.colGroupTemplate; context: { $implicit: columns }"></ng-container>
                    <tfoot role="rowgroup" class="p-treetable-tfoot">
                        <ng-container *ngTemplateOutlet="frozen ? tt.frozenFooterTemplate || tt.footerTemplate : tt.footerTemplate; context: { $implicit: columns }"></ng-container>
                    </tfoot>
                </table>
            </div>
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    }
})
export class TTScrollableView implements AfterViewInit, OnDestroy {
    @Input('ttScrollableView') columns: any[] | undefined;

    @Input({ transform: booleanAttribute }) frozen: boolean | undefined;

    @ViewChild('scrollHeader') scrollHeaderViewChild: Nullable<ElementRef>;

    @ViewChild('scrollHeaderBox') scrollHeaderBoxViewChild: Nullable<ElementRef>;

    @ViewChild('scrollBody') scrollBodyViewChild: Nullable<ElementRef>;

    @ViewChild('scrollTable') scrollTableViewChild: Nullable<ElementRef>;

    @ViewChild('loadingTable') scrollLoadingTableViewChild: Nullable<ElementRef>;

    @ViewChild('scrollFooter') scrollFooterViewChild: Nullable<ElementRef>;

    @ViewChild('scrollFooterBox') scrollFooterBoxViewChild: Nullable<ElementRef>;

    @ViewChild('scrollableAligner') scrollableAlignerViewChild: Nullable<ElementRef>;

    @ViewChild('scroller') scroller: Nullable<Scroller>;

    headerScrollListener: VoidListener;

    bodyScrollListener: VoidListener;

    footerScrollListener: VoidListener;

    frozenSiblingBody: Nullable<Element>;

    totalRecordsSubscription: Nullable<Subscription>;

    _scrollHeight: string | undefined | null;

    preventBodyScrollPropagation: boolean | undefined;

    getMergedTableStyles(contentStyle) {
        return {
            ...this.tt.tableStyle,
            ...contentStyle
        };
    }

    @Input() get scrollHeight(): string | undefined | null {
        return this._scrollHeight;
    }
    set scrollHeight(val: string | undefined | null) {
        this._scrollHeight = val;
        if (val != null && (val.includes('%') || val.includes('calc'))) {
            console.log('Percentage scroll height calculation is removed in favor of the more performant CSS based flex mode, use scrollHeight="flex" instead.');
        }
    }

    constructor(@Inject(PLATFORM_ID) private platformId: any, private renderer: Renderer2, public tt: TreeTable, public el: ElementRef, public zone: NgZone) {}

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.frozen) {
                if (this.tt.frozenColumns || this.tt.frozenBodyTemplate) {
                    DomHandler.addClass(this.el.nativeElement, 'p-treetable-unfrozen-view');
                }

                let frozenView = this.el.nativeElement.previousElementSibling;
                if (frozenView) {
                    if (this.tt.virtualScroll) this.frozenSiblingBody = DomHandler.findSingle(frozenView, '.p-scroller-viewport');
                    else this.frozenSiblingBody = DomHandler.findSingle(frozenView, '.p-treetable-scrollable-body');
                }

                let scrollBarWidth = DomHandler.calculateScrollbarWidth();
                (this.scrollHeaderBoxViewChild as ElementRef).nativeElement.style.paddingRight = scrollBarWidth + 'px';

                if (this.scrollFooterBoxViewChild && this.scrollFooterBoxViewChild.nativeElement) {
                    this.scrollFooterBoxViewChild.nativeElement.style.paddingRight = scrollBarWidth + 'px';
                }
            } else {
                if (this.scrollableAlignerViewChild && this.scrollableAlignerViewChild.nativeElement) {
                    this.scrollableAlignerViewChild.nativeElement.style.height = DomHandler.calculateScrollbarHeight() + 'px';
                }
            }

            this.bindEvents();
        }
    }

    bindEvents() {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
                    this.headerScrollListener = this.renderer.listen(this.scrollHeaderBoxViewChild?.nativeElement, 'scroll', this.onHeaderScroll.bind(this));
                }

                if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
                    this.footerScrollListener = this.renderer.listen(this.scrollFooterViewChild.nativeElement, 'scroll', this.onFooterScroll.bind(this));
                }

                if (!this.frozen) {
                    if (this.tt.virtualScroll) {
                        this.bodyScrollListener = this.renderer.listen((this.scroller?.getElementRef() as ElementRef).nativeElement, 'scroll', this.onBodyScroll.bind(this));
                    } else {
                        this.bodyScrollListener = this.renderer.listen(this.scrollBodyViewChild?.nativeElement, 'scroll', this.onBodyScroll.bind(this));
                    }
                }
            });
        }
    }

    unbindEvents() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
                if (this.headerScrollListener) {
                    this.headerScrollListener();
                    this.headerScrollListener = null;
                }
            }

            if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
                if (this.footerScrollListener) {
                    this.footerScrollListener();
                    this.footerScrollListener = null;
                }
            }

            if (this.scrollBodyViewChild && this.scrollBodyViewChild.nativeElement) {
                if (this.bodyScrollListener) {
                    this.bodyScrollListener();
                    this.bodyScrollListener = null;
                }
            }

            if (this.scroller && this.scroller.getElementRef()) {
                if (this.bodyScrollListener) {
                    this.bodyScrollListener();
                    this.bodyScrollListener = null;
                }
            }
        }
    }

    onHeaderScroll() {
        const scrollLeft = this.scrollHeaderViewChild?.nativeElement.scrollLeft;

        (this.scrollBodyViewChild as ElementRef).nativeElement.scrollLeft = scrollLeft;

        if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
            this.scrollFooterViewChild.nativeElement.scrollLeft = scrollLeft;
        }

        this.preventBodyScrollPropagation = true;
    }

    onFooterScroll() {
        const scrollLeft = this.scrollFooterViewChild?.nativeElement.scrollLeft;
        (this.scrollBodyViewChild as ElementRef).nativeElement.scrollLeft = scrollLeft;

        if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
            this.scrollHeaderViewChild.nativeElement.scrollLeft = scrollLeft;
        }

        this.preventBodyScrollPropagation = true;
    }

    onBodyScroll(event: any) {
        if (this.preventBodyScrollPropagation) {
            this.preventBodyScrollPropagation = false;
            return;
        }

        if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
            (this.scrollHeaderBoxViewChild as ElementRef).nativeElement.style.marginLeft = -1 * event.target.scrollLeft + 'px';
        }

        if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
            (this.scrollFooterBoxViewChild as ElementRef).nativeElement.style.marginLeft = -1 * event.target.scrollLeft + 'px';
        }

        if (this.frozenSiblingBody) {
            this.frozenSiblingBody.scrollTop = event.target.scrollTop;
        }
    }

    scrollToVirtualIndex(index: number): void {
        if (this.scroller) {
            this.scroller.scrollToIndex(index);
        }
    }

    scrollTo(options: ScrollToOptions): void {
        if (this.scroller) {
            this.scroller.scrollTo(options);
        } else {
            if (this.scrollBodyViewChild?.nativeElement.scrollTo) {
                this.scrollBodyViewChild.nativeElement.scrollTo(options);
            } else {
                (this.scrollBodyViewChild as ElementRef).nativeElement.scrollLeft = options.left;
                (this.scrollBodyViewChild as ElementRef).nativeElement.scrollTop = options.top;
            }
        }
    }

    ngOnDestroy() {
        this.unbindEvents();

        this.frozenSiblingBody = null;
    }
}

@Directive({
    selector: '[ttSortableColumn]',
    host: {
        class: 'p-element',
        '[class.p-sortable-column]': 'isEnabled()',
        '[class.p-highlight]': 'sorted',
        '[attr.tabindex]': 'isEnabled() ? "0" : null',
        '[attr.role]': '"columnheader"',
        '[attr.aria-sort]': 'ariaSorted'
    }
})
export class TTSortableColumn implements OnInit, OnDestroy {
    @Input('ttSortableColumn') field: string | undefined;

    @Input({ transform: booleanAttribute }) ttSortableColumnDisabled: boolean | undefined;

    sorted: boolean | undefined;

    subscription: Subscription | undefined;

    get ariaSorted() {
        if (this.sorted && this.tt.sortOrder < 0) return 'descending';
        else if (this.sorted && this.tt.sortOrder > 0) return 'ascending';
        else return 'none';
    }

    constructor(public tt: TreeTable) {
        if (this.isEnabled()) {
            this.subscription = this.tt.tableService.sortSource$.subscribe((sortMeta) => {
                this.updateSortState();
            });
        }
    }

    ngOnInit() {
        if (this.isEnabled()) {
            this.updateSortState();
        }
    }

    updateSortState() {
        this.sorted = this.tt.isSorted(<string>this.field) as boolean;
    }

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
        if (this.isEnabled()) {
            this.updateSortState();
            this.tt.sort({
                originalEvent: event,
                field: this.field
            });

            DomHandler.clearSelection();
        }
    }

    @HostListener('keydown.enter', ['$event'])
    onEnterKey(event: MouseEvent) {
        this.onClick(event);
    }

    isEnabled() {
        return this.ttSortableColumnDisabled !== true;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

@Component({
    selector: 'p-treeTableSortIcon',
    template: ` <ng-container *ngIf="!tt.sortIconTemplate">
            <SortAltIcon [styleClass]="'p-sortable-column-icon'" *ngIf="sortOrder === 0" />
            <SortAmountUpAltIcon [styleClass]="'p-sortable-column-icon'" *ngIf="sortOrder === 1" />
            <SortAmountDownIcon [styleClass]="'p-sortable-column-icon'" *ngIf="sortOrder === -1" />
        </ng-container>
        <span *ngIf="tt.sortIconTemplate" class="p-sortable-column-icon">
            <ng-template *ngTemplateOutlet="tt.sortIconTemplate; context: { $implicit: sortOrder }"></ng-template>
        </span>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'p-element'
    }
})
export class TTSortIcon implements OnInit, OnDestroy {
    @Input() field: string | undefined;

    @Input() ariaLabelDesc: string | undefined;

    @Input() ariaLabelAsc: string | undefined;

    subscription: Subscription | undefined;

    sortOrder: number | undefined;

    constructor(public tt: TreeTable, public cd: ChangeDetectorRef) {
        this.subscription = this.tt.tableService.sortSource$.subscribe((sortMeta) => {
            this.updateSortState();
            this.cd.markForCheck();
        });
    }

    ngOnInit() {
        this.updateSortState();
    }

    onClick(event: Event) {
        event.preventDefault();
    }

    updateSortState() {
        if (this.tt.sortMode === 'single') {
            this.sortOrder = this.tt.isSorted(<string>this.field) ? this.tt.sortOrder : 0;
        } else if (this.tt.sortMode === 'multiple') {
            let sortMeta = this.tt.getSortMeta(<string>this.field);
            this.sortOrder = sortMeta ? sortMeta.order : 0;
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

@Directive({
    selector: '[ttResizableColumn]',
    host: {
        class: 'p-element'
    }
})
export class TTResizableColumn implements AfterViewInit, OnDestroy {
    @Input({ transform: booleanAttribute }) ttResizableColumnDisabled: boolean | undefined;

    resizer: HTMLSpanElement | undefined;

    resizerMouseDownListener: VoidListener;

    documentMouseMoveListener: VoidListener;

    documentMouseUpListener: VoidListener;

    constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: any, private renderer: Renderer2, public tt: TreeTable, public el: ElementRef, public zone: NgZone) {}

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.isEnabled()) {
                DomHandler.addClass(this.el.nativeElement, 'p-resizable-column');
                this.resizer = this.renderer.createElement('span');
                this.renderer.addClass(this.resizer, 'p-column-resizer');
                this.renderer.appendChild(this.el.nativeElement, this.resizer);

                this.zone.runOutsideAngular(() => {
                    this.resizerMouseDownListener = this.renderer.listen(this.resizer, 'mousedown', this.onMouseDown.bind(this));
                });
            }
        }
    }

    bindDocumentEvents() {
        this.zone.runOutsideAngular(() => {
            this.documentMouseMoveListener = this.renderer.listen(this.document, 'mousemove', this.onDocumentMouseMove.bind(this));
            this.documentMouseUpListener = this.renderer.listen(this.document, 'mouseup', this.onDocumentMouseUp.bind(this));
        });
    }

    unbindDocumentEvents() {
        if (this.documentMouseMoveListener) {
            this.documentMouseMoveListener();
            this.documentMouseMoveListener = null;
        }

        if (this.documentMouseUpListener) {
            this.documentMouseUpListener();
            this.documentMouseUpListener = null;
        }
    }

    onMouseDown(event: MouseEvent) {
        this.tt.onColumnResizeBegin(event);
        this.bindDocumentEvents();
    }

    onDocumentMouseMove(event: MouseEvent) {
        this.tt.onColumnResize(event);
    }

    onDocumentMouseUp(event: MouseEvent) {
        this.tt.onColumnResizeEnd(event, this.el.nativeElement);
        this.unbindDocumentEvents();
    }

    isEnabled() {
        return this.ttResizableColumnDisabled !== true;
    }

    ngOnDestroy() {
        if (this.resizerMouseDownListener) {
            this.resizerMouseDownListener();
            this.resizerMouseDownListener = null;
        }

        this.unbindDocumentEvents();
    }
}

@Directive({
    selector: '[ttReorderableColumn]',
    host: {
        class: 'p-element'
    }
})
export class TTReorderableColumn implements AfterViewInit, OnDestroy {
    @Input({ transform: booleanAttribute }) ttReorderableColumnDisabled: boolean | undefined;

    dragStartListener: VoidListener;

    dragOverListener: VoidListener;

    dragEnterListener: VoidListener;

    dragLeaveListener: VoidListener;

    mouseDownListener: VoidListener;

    constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: any, private renderer: Renderer2, public tt: TreeTable, public el: ElementRef, public zone: NgZone) {}

    ngAfterViewInit() {
        if (this.isEnabled()) {
            this.bindEvents();
        }
    }

    bindEvents() {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                this.mouseDownListener = this.renderer.listen(this.el.nativeElement, 'mousedown', this.onMouseDown.bind(this));
                this.dragStartListener = this.renderer.listen(this.el.nativeElement, 'dragstart', this.onDragStart.bind(this));
                this.dragOverListener = this.renderer.listen(this.el.nativeElement, 'dragover', this.onDragEnter.bind(this));
                this.dragEnterListener = this.renderer.listen(this.el.nativeElement, 'dragenter', this.onDragEnter.bind(this));
                this.dragLeaveListener = this.renderer.listen(this.el.nativeElement, 'dragleave', this.onDragLeave.bind(this));
            });
        }
    }

    unbindEvents() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.mouseDownListener) {
                this.mouseDownListener();
                this.mouseDownListener = null;
            }

            if (this.dragOverListener) {
                this.dragOverListener();
                this.dragOverListener = null;
            }

            if (this.dragEnterListener) {
                this.dragEnterListener();
                this.dragEnterListener = null;
            }

            if (this.dragLeaveListener) {
                this.dragLeaveListener();
                this.dragLeaveListener = null;
            }
        }
    }

    onMouseDown(event: any) {
        if (event.target.nodeName === 'INPUT' || event.target.nodeName === 'TEXTAREA' || DomHandler.hasClass(event.target, 'p-column-resizer')) this.el.nativeElement.draggable = false;
        else this.el.nativeElement.draggable = true;
    }

    onDragStart(event: DragEvent) {
        this.tt.onColumnDragStart(event, this.el.nativeElement);
    }

    onDragOver(event: DragEvent) {
        event.preventDefault();
    }

    onDragEnter(event: DragEvent) {
        this.tt.onColumnDragEnter(event, this.el.nativeElement);
    }

    onDragLeave(event: DragEvent) {
        this.tt.onColumnDragLeave(event);
    }

    @HostListener('drop', ['$event'])
    onDrop(event: DragEvent) {
        if (this.isEnabled()) {
            this.tt.onColumnDrop(event, this.el.nativeElement);
        }
    }

    isEnabled() {
        return this.ttReorderableColumnDisabled !== true;
    }

    ngOnDestroy() {
        this.unbindEvents();
    }
}

@Directive({
    selector: '[ttSelectableRow]',
    host: {
        class: 'p-element',
        '[class.p-highlight]': 'selected',
        '[attr.data-p-highlight]': 'selected',
        '[attr.aria-checked]': 'selected'
    }
})
export class TTSelectableRow implements OnInit, OnDestroy {
    @Input('ttSelectableRow') rowNode: any;

    @Input({ transform: booleanAttribute }) ttSelectableRowDisabled: boolean | undefined;

    selected: boolean | undefined;

    subscription: Subscription | undefined;

    constructor(public tt: TreeTable, public tableService: TreeTableService) {
        if (this.isEnabled()) {
            this.subscription = this.tt.tableService.selectionSource$.subscribe(() => {
                this.selected = this.tt.isSelected(this.rowNode.node);
            });
        }
    }

    ngOnInit() {
        if (this.isEnabled()) {
            this.selected = this.tt.isSelected(this.rowNode.node);
        }
    }

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        if (this.isEnabled()) {
            this.tt.handleRowClick({
                originalEvent: event,
                rowNode: this.rowNode
            });
        }
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        switch (event.code) {
            case 'Enter':
            case 'Space':
                this.onEnterKey(event);
                break;

            default:
                break;
        }
    }

    @HostListener('touchend', ['$event'])
    onTouchEnd(event: Event) {
        if (this.isEnabled()) {
            this.tt.handleRowTouchEnd(event);
        }
    }

    onEnterKey(event) {
        if (this.tt.selectionMode === 'checkbox') {
            this.tt.toggleNodeWithCheckbox({
                originalEvent: event,
                rowNode: this.rowNode
            });
        } else {
            this.onClick(event);
        }
        event.preventDefault();
    }

    isEnabled() {
        return this.ttSelectableRowDisabled !== true;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

@Directive({
    selector: '[ttSelectableRowDblClick]',
    host: {
        class: 'p-element',
        '[class.p-highlight]': 'selected'
    }
})
export class TTSelectableRowDblClick implements OnInit, OnDestroy {
    @Input('ttSelectableRowDblClick') rowNode: any;

    @Input({ transform: booleanAttribute }) ttSelectableRowDisabled: boolean | undefined;

    selected: boolean | undefined;

    subscription: Subscription | undefined;

    constructor(public tt: TreeTable, public tableService: TreeTableService) {
        if (this.isEnabled()) {
            this.subscription = this.tt.tableService.selectionSource$.subscribe(() => {
                this.selected = this.tt.isSelected(this.rowNode.node);
            });
        }
    }

    ngOnInit() {
        if (this.isEnabled()) {
            this.selected = this.tt.isSelected(this.rowNode.node);
        }
    }

    @HostListener('dblclick', ['$event'])
    onClick(event: Event) {
        if (this.isEnabled()) {
            this.tt.handleRowClick({
                originalEvent: event,
                rowNode: this.rowNode
            });
        }
    }

    isEnabled() {
        return this.ttSelectableRowDisabled !== true;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

@Directive({
    selector: '[ttContextMenuRow]',
    host: {
        class: 'p-element',
        '[class.p-highlight-contextmenu]': 'selected',
        '[attr.tabindex]': 'isEnabled() ? 0 : undefined'
    }
})
export class TTContextMenuRow {
    @Input('ttContextMenuRow') rowNode: any | undefined;

    @Input({ transform: booleanAttribute }) ttContextMenuRowDisabled: boolean | undefined;

    selected: boolean | undefined;

    subscription: Subscription | undefined;

    constructor(public tt: TreeTable, public tableService: TreeTableService, private el: ElementRef) {
        if (this.isEnabled()) {
            this.subscription = this.tt.tableService.contextMenuSource$.subscribe((node) => {
                this.selected = this.tt.equals(this.rowNode.node, node);
            });
        }
    }

    @HostListener('contextmenu', ['$event'])
    onContextMenu(event: Event) {
        if (this.isEnabled()) {
            this.tt.handleRowRightClick({
                originalEvent: event,
                rowNode: this.rowNode
            });

            this.el.nativeElement.focus();

            event.preventDefault();
        }
    }

    isEnabled() {
        return this.ttContextMenuRowDisabled !== true;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

@Component({
    selector: 'p-treeTableCheckbox',
    template: `
        <div class="p-checkbox p-component" [ngClass]="{ 'p-checkbox-focused': focused, 'p-variant-filled': tt.config.inputStyle() === 'filled' }" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input type="checkbox" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()" tabindex="-1" />
            </div>
            <div #box [ngClass]="{ 'p-checkbox-box': true, 'p-highlight': checked, 'p-focus': focused, 'p-indeterminate': partialChecked, 'p-disabled': disabled }" role="checkbox" [attr.aria-checked]="checked">
                <ng-container *ngIf="!tt.checkboxIconTemplate">
                    <CheckIcon [styleClass]="'p-checkbox-icon'" *ngIf="checked" />
                    <MinusIcon [styleClass]="'p-checkbox-icon'" *ngIf="partialChecked" />
                </ng-container>
                <span *ngIf="tt.checkboxIconTemplate">
                    <ng-template *ngTemplateOutlet="tt.checkboxIconTemplate; context: { $implicit: checked, partialSelected: partialChecked }"></ng-template>
                </span>
            </div>
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'p-element'
    }
})
export class TTCheckbox {
    @Input({ transform: booleanAttribute }) disabled: boolean | undefined;

    @Input('value') rowNode: any;

    checked: boolean | undefined;

    partialChecked: boolean | undefined;

    focused: boolean | undefined;

    subscription: Subscription | undefined;

    constructor(public tt: TreeTable, public tableService: TreeTableService, public cd: ChangeDetectorRef) {
        this.subscription = this.tt.tableService.selectionSource$.subscribe(() => {
            if (this.tt.selectionKeys) {
                this.checked = this.tt.isNodeSelected(this.rowNode.node);
                this.partialChecked = this.tt.isNodePartialSelected(this.rowNode.node);
            } else {
                this.checked = this.tt.isSelected(this.rowNode.node);
                this.partialChecked = this.rowNode.node.partialSelected;
            }
            this.cd.markForCheck();
        });
    }

    ngOnInit() {
        if (this.tt.selectionKeys) {
            this.checked = this.tt.isNodeSelected(this.rowNode.node);
            this.partialChecked = this.tt.isNodePartialSelected(this.rowNode.node);
        } else {
            // for backward compatibility
            this.checked = this.tt.isSelected(this.rowNode.node);
            this.partialChecked = this.rowNode.node.partialSelected;
        }
    }

    onClick(event: Event) {
        if (!this.disabled) {
            if (this.tt.selectionKeys) {
                const _check = !this.checked;
                this.tt.toggleCheckbox({
                    originalEvent: event,
                    check: _check,
                    rowNode: this.rowNode
                });
            } else {
                this.tt.toggleNodeWithCheckbox({
                    originalEvent: event,
                    rowNode: this.rowNode
                });
            }
        }
        DomHandler.clearSelection();
    }

    onFocus() {
        this.focused = true;
    }

    onBlur() {
        this.focused = false;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

@Component({
    selector: 'p-treeTableHeaderCheckbox',
    template: `
        <div class="p-checkbox p-component" [ngClass]="{ 'p-checkbox-focused': focused }" (click)="onClick($event, cb.checked)">
            <div class="p-hidden-accessible">
                <input #cb type="checkbox" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()" [disabled]="!tt.value || tt.value.length === 0" />
            </div>
            <div #box [ngClass]="{ 'p-checkbox-box': true, 'p-highlight': checked, 'p-focus': focused, 'p-disabled': !tt.value || tt.value.length === 0 }" role="checkbox" [attr.aria-checked]="checked">
                <ng-container *ngIf="!tt.headerCheckboxIconTemplate">
                    <CheckIcon *ngIf="checked" [styleClass]="'p-checkbox-icon'" />
                </ng-container>
                <span class="p-checkbox-icon" *ngIf="tt.headerCheckboxIconTemplate">
                    <ng-template *ngTemplateOutlet="tt.headerCheckboxIconTemplate; context: { $implicit: checked }"></ng-template>
                </span>
            </div>
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'p-element'
    }
})
export class TTHeaderCheckbox {
    @ViewChild('box') boxViewChild: ElementRef | undefined;

    checked: boolean | undefined;

    focused: boolean | undefined;

    disabled: boolean | undefined;

    selectionChangeSubscription: Subscription;

    valueChangeSubscription: Subscription;

    constructor(public tt: TreeTable, public tableService: TreeTableService, private cd: ChangeDetectorRef) {
        this.valueChangeSubscription = this.tt.tableService.uiUpdateSource$.subscribe(() => {
            this.checked = this.updateCheckedState();
        });

        this.selectionChangeSubscription = this.tt.tableService.selectionSource$.subscribe(() => {
            this.checked = this.updateCheckedState();
        });
    }

    ngOnInit() {
        this.checked = this.updateCheckedState();
    }

    onClick(event: Event, checked: boolean) {
        if ((this.tt.value || this.tt.filteredNodes) && (this.tt.value.length > 0 || this.tt.filteredNodes.length > 0)) {
            this.tt.toggleNodesWithCheckbox(event, !checked);
        }

        DomHandler.clearSelection();
    }

    onFocus() {
        this.focused = true;
    }

    onBlur() {
        this.focused = false;
    }

    ngOnDestroy() {
        if (this.selectionChangeSubscription) {
            this.selectionChangeSubscription.unsubscribe();
        }

        if (this.valueChangeSubscription) {
            this.valueChangeSubscription.unsubscribe();
        }
    }

    updateCheckedState() {
        this.cd.markForCheck();
        let checked!: boolean;
        const data = this.tt.filteredNodes || this.tt.value;

        if (data) {
            if (this.tt.selectionKeys) {
                for (let node of data) {
                    if (this.tt.isNodeSelected(node)) {
                        checked = true;
                    } else {
                        checked = false;
                        break;
                    }
                }
            }
            if (!this.tt.selectionKeys) {
                // legacy selection support, will be removed in v18
                for (let node of data) {
                    if (this.tt.isSelected(node)) {
                        checked = true;
                    } else {
                        checked = false;
                        break;
                    }
                }
            }
        } else {
            checked = false;
        }

        return checked;
    }
}

@Directive({
    selector: '[ttEditableColumn]',
    host: {
        class: 'p-element'
    }
})
export class TTEditableColumn implements AfterViewInit {
    @Input('ttEditableColumn') data: any;

    @Input('ttEditableColumnField') field: any;

    @Input({ transform: booleanAttribute }) ttEditableColumnDisabled: boolean | undefined;

    constructor(public tt: TreeTable, public el: ElementRef, public zone: NgZone) {}

    ngAfterViewInit() {
        if (this.isEnabled()) {
            DomHandler.addClass(this.el.nativeElement, 'p-editable-column');
        }
    }

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
        if (this.isEnabled()) {
            this.tt.editingCellClick = true;

            if (this.tt.editingCell) {
                if (this.tt.editingCell !== this.el.nativeElement) {
                    if (!this.tt.isEditingCellValid()) {
                        return;
                    }

                    DomHandler.removeClass(this.tt.editingCell, 'p-cell-editing');
                    this.openCell();
                }
            } else {
                this.openCell();
            }
        }
    }

    openCell() {
        this.tt.updateEditingCell(this.el.nativeElement, this.data, this.field);
        DomHandler.addClass(this.el.nativeElement, 'p-cell-editing');
        this.tt.onEditInit.emit({ field: this.field, data: this.data });
        this.tt.editingCellClick = true;
        this.zone.runOutsideAngular(() => {
            setTimeout(() => {
                let focusable = DomHandler.findSingle(this.el.nativeElement, 'input, textarea');
                if (focusable) {
                    focusable.focus();
                }
            }, 50);
        });
    }

    closeEditingCell() {
        DomHandler.removeClass(this.tt.editingCell, 'p-checkbox-icon');
        this.tt.editingCell = null;
        this.tt.unbindDocumentEditListener();
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if (this.isEnabled()) {
            if (event.code == 'Enter' && !event.shiftKey) {
                if (this.tt.isEditingCellValid()) {
                    DomHandler.removeClass(this.tt.editingCell, 'p-cell-editing');
                    this.closeEditingCell();
                    this.tt.onEditComplete.emit({ field: this.field, data: this.data });
                }

                event.preventDefault();
            } else if (event.code == 'Escape') {
                if (this.tt.isEditingCellValid()) {
                    DomHandler.removeClass(this.tt.editingCell, 'p-cell-editing');
                    this.closeEditingCell();
                    this.tt.onEditCancel.emit({ field: this.field, data: this.data });
                }

                event.preventDefault();
            } else if (event.code == 'Tab') {
                this.tt.onEditComplete.emit({ field: this.field, data: this.data });

                if (event.shiftKey) this.moveToPreviousCell(event);
                else this.moveToNextCell(event);
            }
        }
    }

    findCell(element: any) {
        if (element) {
            let cell = element;
            while (cell && !DomHandler.hasClass(cell, 'p-cell-editing')) {
                cell = cell.parentElement;
            }

            return cell;
        } else {
            return null;
        }
    }

    moveToPreviousCell(event: KeyboardEvent) {
        let currentCell = this.findCell(event.target);
        let row = currentCell.parentElement;
        let targetCell = this.findPreviousEditableColumn(currentCell);

        if (targetCell) {
            DomHandler.invokeElementMethod(targetCell, 'click');
            event.preventDefault();
        }
    }

    moveToNextCell(event: KeyboardEvent) {
        let currentCell = this.findCell(event.target);
        let row = currentCell.parentElement;
        let targetCell = this.findNextEditableColumn(currentCell);

        if (targetCell) {
            DomHandler.invokeElementMethod(targetCell, 'click');
            event.preventDefault();
        }
    }

    findPreviousEditableColumn(cell: any): Element | null {
        let prevCell = cell.previousElementSibling;

        if (!prevCell) {
            let previousRow = cell.parentElement ? cell.parentElement.previousElementSibling : null;
            if (previousRow) {
                prevCell = previousRow.lastElementChild;
            }
        }

        if (prevCell) {
            if (DomHandler.hasClass(prevCell, 'p-editable-column')) return prevCell;
            else return this.findPreviousEditableColumn(prevCell);
        } else {
            return null;
        }
    }

    findNextEditableColumn(cell: Element): Element | null {
        let nextCell = cell.nextElementSibling;

        if (!nextCell) {
            let nextRow = cell.parentElement ? cell.parentElement.nextElementSibling : null;
            if (nextRow) {
                nextCell = nextRow.firstElementChild;
            }
        }

        if (nextCell) {
            if (DomHandler.hasClass(nextCell, 'p-editable-column')) return nextCell;
            else return this.findNextEditableColumn(nextCell);
        } else {
            return null;
        }
    }

    isEnabled() {
        return this.ttEditableColumnDisabled !== true;
    }
}

@Component({
    selector: 'p-treeTableCellEditor',
    template: `
        <ng-container *ngIf="tt.editingCell === editableColumn.el.nativeElement">
            <ng-container *ngTemplateOutlet="inputTemplate"></ng-container>
        </ng-container>
        <ng-container *ngIf="!tt.editingCell || tt.editingCell !== editableColumn.el.nativeElement">
            <ng-container *ngTemplateOutlet="outputTemplate"></ng-container>
        </ng-container>
    `,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    }
})
export class TreeTableCellEditor implements AfterContentInit {
    @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<PrimeTemplate>>;

    inputTemplate: Nullable<TemplateRef<any>>;

    outputTemplate: Nullable<TemplateRef<any>>;

    constructor(public tt: TreeTable, public editableColumn: TTEditableColumn) {}

    ngAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'input':
                    this.inputTemplate = item.template;
                    break;

                case 'output':
                    this.outputTemplate = item.template;
                    break;
            }
        });
    }
}

@Directive({
    selector: '[ttRow]',
    host: {
        class: 'p-element',
        '[class]': `'p-element ' + styleClass`,
        '[attr.tabindex]': "'0'",
        '[attr.aria-expanded]': 'expanded',
        '[attr.aria-level]': 'level',
        '[attr.data-pc-section]': 'row',
        '[attr.role]': 'row'
    }
})
export class TTRow {
    get level() {
        return this.rowNode?.['level'] + 1;
    }

    get styleClass() {
        return this.rowNode?.node['styleClass'] || '';
    }

    get expanded() {
        return this.rowNode?.node['expanded'];
    }

    @Input('ttRow') rowNode: any;

    constructor(public tt: TreeTable, public el: ElementRef, public zone: NgZone) {}

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        switch (event.code) {
            case 'ArrowDown':
                this.onArrowDownKey(event);
                break;

            case 'ArrowUp':
                this.onArrowUpKey(event);
                break;

            case 'ArrowRight':
                this.onArrowRightKey(event);
                break;

            case 'ArrowLeft':
                this.onArrowLeftKey(event);
                break;

            case 'Tab':
                this.onTabKey(event);
                break;

            case 'Home':
                this.onHomeKey(event);
                break;

            case 'End':
                this.onEndKey(event);
                break;

            default:
                break;
        }
    }

    onArrowDownKey(event: KeyboardEvent) {
        let nextRow = this.el?.nativeElement?.nextElementSibling;
        if (nextRow) {
            this.focusRowChange(<HTMLElement>event.currentTarget, nextRow);
        }

        event.preventDefault();
    }

    onArrowUpKey(event: KeyboardEvent) {
        let prevRow = this.el?.nativeElement?.previousElementSibling;
        if (prevRow) {
            this.focusRowChange(<HTMLElement>event.currentTarget, prevRow);
        }

        event.preventDefault();
    }

    onArrowRightKey(event: KeyboardEvent) {
        const currentTarget = <HTMLElement>event.currentTarget;
        const isHiddenIcon = DomHandler.findSingle(currentTarget, 'button').style.visibility === 'hidden';

        if (!isHiddenIcon && !this.expanded && this.rowNode.node['children']) {
            this.expand(event);

            currentTarget.tabIndex = -1;
        }
        event.preventDefault();
    }

    onArrowLeftKey(event: KeyboardEvent) {
        const container = this.tt.containerViewChild?.nativeElement;
        const expandedRows = DomHandler.find(container, '[aria-expanded="true"]');
        const lastExpandedRow = expandedRows[expandedRows.length - 1];

        if (this.expanded) {
            this.collapse(event);
        }
        if (lastExpandedRow) {
            this.tt.toggleRowIndex = DomHandler.index(lastExpandedRow);
        }
        this.restoreFocus();
        event.preventDefault();
    }

    onHomeKey(event: KeyboardEvent) {
        const firstElement = DomHandler.findSingle(this.tt.containerViewChild?.nativeElement, `tr[aria-level="${this.level}"]`);
        firstElement && DomHandler.focus(firstElement);
        event.preventDefault();
    }

    onEndKey(event: KeyboardEvent) {
        const nodes = DomHandler.find(this.tt.containerViewChild?.nativeElement, `tr[aria-level="${this.level}"]`);
        const lastElement = nodes[nodes.length - 1];
        DomHandler.focus(lastElement);
        event.preventDefault();
    }

    onTabKey(event: KeyboardEvent) {
        const rows = this.el.nativeElement ? [...DomHandler.find(this.el.nativeElement.parentNode, 'tr')] : undefined;

        if (rows && ObjectUtils.isNotEmpty(rows)) {
            const hasSelectedRow = rows.some((row) => DomHandler.getAttribute(row, 'data-p-highlight') || row.getAttribute('aria-checked') === 'true');
            rows.forEach((row) => {
                row.tabIndex = -1;
            });

            if (hasSelectedRow) {
                const selectedNodes = rows.filter((node) => DomHandler.getAttribute(node, 'data-p-highlight') || node.getAttribute('aria-checked') === 'true');
                selectedNodes[0].tabIndex = 0;

                return;
            }

            rows[0].tabIndex = 0;
        }
    }

    expand(event: Event) {
        this.tt.toggleRowIndex = DomHandler.index(this.el.nativeElement);
        this.rowNode.node['expanded'] = true;

        this.tt.updateSerializedValue();
        this.tt.tableService.onUIUpdate(this.tt.value);
        this.rowNode.node['children'] ? this.restoreFocus(this.tt.toggleRowIndex + 1) : this.restoreFocus();

        this.tt.onNodeExpand.emit({
            originalEvent: event,
            node: this.rowNode.node
        });
    }

    collapse(event: Event) {
        this.rowNode.node['expanded'] = false;

        this.tt.updateSerializedValue();
        this.tt.tableService.onUIUpdate(this.tt.value);

        this.tt.onNodeCollapse.emit({ originalEvent: event, node: this.rowNode.node });
    }

    focusRowChange(firstFocusableRow, currentFocusedRow, lastVisibleDescendant?) {
        firstFocusableRow.tabIndex = '-1';
        currentFocusedRow.tabIndex = '0';

        DomHandler.focus(currentFocusedRow);
    }

    restoreFocus(index?) {
        this.zone.runOutsideAngular(() => {
            setTimeout(() => {
                const container = this.tt.containerViewChild?.nativeElement;
                const row = DomHandler.findSingle(container, '.p-treetable-tbody').children[<number>index || this.tt.toggleRowIndex];
                const rows = [...DomHandler.find(container, 'tr')];

                rows &&
                    rows.forEach((r) => {
                        if (!row.isSameNode(r)) {
                            r.tabIndex = -1;
                        }
                    });

                if (row) {
                    row.tabIndex = 0;
                    row.focus();
                }
            }, 25);
        });
    }
}

@Component({
    selector: 'p-treeTableToggler',
    template: `
        <button
            type="button"
            class="p-treetable-toggler p-link"
            (click)="onClick($event)"
            tabindex="-1"
            pRipple
            [ngStyle]="{
                visibility: rowNode.node.leaf === false || (rowNode.node.children && rowNode.node.children.length) ? 'visible' : 'hidden',
                'margin-left': rowNode.level * 16 + 'px'
            }"
            [attr.data-pc-section]="'rowtoggler'"
            [attr.data-pc-group-section]="'rowactionbutton'"
            [attr.aria-label]="toggleButtonAriaLabel"
        >
            <ng-container *ngIf="!tt.togglerIconTemplate">
                <ChevronDownIcon *ngIf="rowNode.node.expanded" [attr.aria-hidden]="true" />
                <ChevronRightIcon *ngIf="!rowNode.node.expanded" [attr.aria-hidden]="true" />
            </ng-container>
            <ng-template *ngTemplateOutlet="tt.togglerIconTemplate; context: { $implicit: rowNode.node.expanded }"></ng-template>
        </button>
    `,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    }
})
export class TreeTableToggler {
    @Input() rowNode: any;

    constructor(public tt: TreeTable, private config: PrimeNGConfig) {}

    get toggleButtonAriaLabel() {
        return this.config.translation ? (this.rowNode.expanded ? this.config.translation.aria.collapseRow : this.config.translation.aria.expandRow) : undefined;
    }

    onClick(event: Event) {
        this.rowNode.node.expanded = !this.rowNode.node.expanded;

        if (this.rowNode.node.expanded) {
            this.tt.onNodeExpand.emit({
                originalEvent: event,
                node: this.rowNode.node
            });
        } else {
            this.tt.onNodeCollapse.emit({
                originalEvent: event,
                node: this.rowNode.node
            });
        }

        this.tt.updateSerializedValue();
        this.tt.tableService.onUIUpdate(this.tt.value);

        event.preventDefault();
    }
}

@NgModule({
    imports: [CommonModule, PaginatorModule, RippleModule, ScrollerModule, SpinnerIcon, ArrowDownIcon, ArrowUpIcon, SortAltIcon, SortAmountUpAltIcon, SortAmountDownIcon, CheckIcon, MinusIcon, ChevronDownIcon, ChevronRightIcon],
    exports: [
        TreeTable,
        SharedModule,
        TreeTableToggler,
        TTSortableColumn,
        TTSortIcon,
        TTResizableColumn,
        TTRow,
        TTReorderableColumn,
        TTSelectableRow,
        TTSelectableRowDblClick,
        TTContextMenuRow,
        TTCheckbox,
        TTHeaderCheckbox,
        TTEditableColumn,
        TreeTableCellEditor,
        ScrollerModule
    ],
    declarations: [
        TreeTable,
        TreeTableToggler,
        TTScrollableView,
        TTBody,
        TTSortableColumn,
        TTSortIcon,
        TTResizableColumn,
        TTRow,
        TTReorderableColumn,
        TTSelectableRow,
        TTSelectableRowDblClick,
        TTContextMenuRow,
        TTCheckbox,
        TTHeaderCheckbox,
        TTEditableColumn,
        TreeTableCellEditor
    ]
})
export class TreeTableModule {}
