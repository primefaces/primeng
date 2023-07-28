import { animate, AnimationEvent, style, transition, trigger } from '@angular/animations';
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
    Optional,
    Output,
    PLATFORM_ID,
    QueryList,
    Renderer2,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BlockableUI, FilterMatchMode, FilterMetadata, FilterOperator, FilterService, LazyLoadMeta, OverlayService, PrimeNGConfig, PrimeTemplate, SelectItem, SharedModule, SortMeta, TableState, TranslationKeys } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConnectedOverlayScrollHandler, DomHandler } from 'primeng/dom';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { Scroller, ScrollerModule } from 'primeng/scroller';
import { ScrollerOptions } from 'primeng/api';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { ObjectUtils, UniqueComponentId, ZIndexUtils } from 'primeng/utils';
import { Subject, Subscription } from 'rxjs';
import { ArrowDownIcon } from 'primeng/icons/arrowdown';
import { ArrowUpIcon } from 'primeng/icons/arrowup';
import { CheckIcon } from 'primeng/icons/check';
import { FilterIcon } from 'primeng/icons/filter';
import { SortAltIcon } from 'primeng/icons/sortalt';
import { SortAmountDownIcon } from 'primeng/icons/sortamountdown';
import { SortAmountUpAltIcon } from 'primeng/icons/sortamountupalt';
import { SpinnerIcon } from 'primeng/icons/spinner';
import {
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
    TableRowCollapseEvent,
    TableRowExpandEvent,
    TableRowReorderEvent,
    TableRowSelectEvent,
    TableRowUnSelectEvent,
    TableSelectAllChangeEvent
} from './table.interface';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import { FilterSlashIcon } from 'primeng/icons/filterslash';

@Injectable()
export class TableService {
    private sortSource = new Subject<SortMeta | SortMeta[] | null>();
    private selectionSource = new Subject();
    private contextMenuSource = new Subject<any>();
    private valueSource = new Subject<any>();
    private totalRecordsSource = new Subject<any>();
    private columnsSource = new Subject();

    sortSource$ = this.sortSource.asObservable();
    selectionSource$ = this.selectionSource.asObservable();
    contextMenuSource$ = this.contextMenuSource.asObservable();
    valueSource$ = this.valueSource.asObservable();
    totalRecordsSource$ = this.totalRecordsSource.asObservable();
    columnsSource$ = this.columnsSource.asObservable();

    onSort(sortMeta: SortMeta | SortMeta[] | null) {
        this.sortSource.next(sortMeta);
    }

    onSelectionChange() {
        this.selectionSource.next(null);
    }

    onContextMenu(data: any) {
        this.contextMenuSource.next(data);
    }

    onValueChange(value: any) {
        this.valueSource.next(value);
    }

    onTotalRecordsChange(value: number) {
        this.totalRecordsSource.next(value);
    }

    onColumnsChange(columns: any[]) {
        this.columnsSource.next(columns);
    }
}
/**
 * Table displays data in tabular format.
 * @group Components
 */
@Component({
    selector: 'p-table',
    template: `
        <div
            #container
            [ngStyle]="style"
            [class]="styleClass"
            [ngClass]="{ 'p-datatable p-component': true, 'p-datatable-hoverable-rows': rowHover || selectionMode, 'p-datatable-scrollable': scrollable, 'p-datatable-flex-scrollable': scrollable && scrollHeight === 'flex' }"
            [attr.id]="id"
        >
            <div class="p-datatable-loading-overlay p-component-overlay" *ngIf="loading && showLoader">
                <i *ngIf="loadingIcon" [class]="'p-datatable-loading-icon ' + loadingIcon"></i>
                <ng-container *ngIf="!loadingIcon">
                    <SpinnerIcon *ngIf="!loadingIconTemplate" [spin]="true" [styleClass]="'p-datatable-loading-icon'" />
                    <span *ngIf="loadingIconTemplate" class="p-datatable-loading-icon">
                        <ng-template *ngTemplateOutlet="loadingIconTemplate"></ng-template>
                    </span>
                </ng-container>
            </div>
            <div *ngIf="captionTemplate" class="p-datatable-header">
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
                [dropdownScrollHeight]="paginatorDropdownScrollHeight"
                [currentPageReportTemplate]="currentPageReportTemplate"
                [showFirstLastIcon]="showFirstLastIcon"
                [dropdownItemTemplate]="paginatorDropdownItemTemplate"
                [showCurrentPageReport]="showCurrentPageReport"
                [showJumpToPageDropdown]="showJumpToPageDropdown"
                [showJumpToPageInput]="showJumpToPageInput"
                [showPageLinks]="showPageLinks"
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

            <div #wrapper class="p-datatable-wrapper" [ngStyle]="{ maxHeight: virtualScroll ? '' : scrollHeight }">
                <p-scroller
                    #scroller
                    *ngIf="virtualScroll"
                    [items]="processedData"
                    [columns]="columns"
                    [style]="{ height: scrollHeight !== 'flex' ? scrollHeight : undefined }"
                    [scrollHeight]="scrollHeight !== 'flex' ? undefined : '100%'"
                    [itemSize]="virtualScrollItemSize || _virtualRowHeight"
                    [step]="rows"
                    [delay]="lazy ? virtualScrollDelay : 0"
                    [inline]="true"
                    [lazy]="lazy"
                    (onLazyLoad)="onLazyItemLoad($event)"
                    [loaderDisabled]="true"
                    [showSpacer]="false"
                    [showLoader]="loadingBodyTemplate"
                    [options]="virtualScrollOptions"
                    [autoSize]="true"
                >
                    <ng-template pTemplate="content" let-items let-scrollerOptions="options">
                        <ng-container *ngTemplateOutlet="buildInTable; context: { $implicit: items, options: scrollerOptions }"></ng-container>
                    </ng-template>
                </p-scroller>
                <ng-container *ngIf="!virtualScroll">
                    <ng-container *ngTemplateOutlet="buildInTable; context: { $implicit: processedData, options: { columns } }"></ng-container>
                </ng-container>

                <ng-template #buildInTable let-items let-scrollerOptions="options">
                    <table
                        #table
                        role="table"
                        [ngClass]="{ 'p-datatable-table': true, 'p-datatable-scrollable-table': scrollable, 'p-datatable-resizable-table': resizableColumns, 'p-datatable-resizable-table-fit': resizableColumns && columnResizeMode === 'fit' }"
                        [class]="tableStyleClass"
                        [style]="tableStyle"
                        [attr.id]="id + '-table'"
                    >
                        <ng-container *ngTemplateOutlet="colGroupTemplate; context: { $implicit: scrollerOptions.columns }"></ng-container>
                        <thead #thead class="p-datatable-thead">
                            <ng-container *ngTemplateOutlet="headerGroupedTemplate || headerTemplate; context: { $implicit: scrollerOptions.columns }"></ng-container>
                        </thead>
                        <tbody
                            class="p-datatable-tbody p-datatable-frozen-tbody"
                            *ngIf="frozenValue || frozenBodyTemplate"
                            [value]="frozenValue"
                            [frozenRows]="true"
                            [pTableBody]="scrollerOptions.columns"
                            [pTableBodyTemplate]="frozenBodyTemplate"
                            [frozen]="true"
                        ></tbody>
                        <tbody
                            class="p-datatable-tbody"
                            [ngClass]="scrollerOptions.contentStyleClass"
                            [style]="scrollerOptions.contentStyle"
                            [value]="dataToRender(scrollerOptions.rows)"
                            [pTableBody]="scrollerOptions.columns"
                            [pTableBodyTemplate]="bodyTemplate"
                            [scrollerOptions]="scrollerOptions"
                        ></tbody>
                        <tbody *ngIf="scrollerOptions.spacerStyle" [style]="'height: calc(' + scrollerOptions.spacerStyle.height + ' - ' + scrollerOptions.rows.length * scrollerOptions.itemSize + 'px);'" class="p-datatable-scroller-spacer"></tbody>
                        <tfoot *ngIf="footerGroupedTemplate || footerTemplate" #tfoot class="p-datatable-tfoot">
                            <ng-container *ngTemplateOutlet="footerGroupedTemplate || footerTemplate; context: { $implicit: scrollerOptions.columns }"></ng-container>
                        </tfoot>
                    </table>
                </ng-template>
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
                [dropdownScrollHeight]="paginatorDropdownScrollHeight"
                [currentPageReportTemplate]="currentPageReportTemplate"
                [showFirstLastIcon]="showFirstLastIcon"
                [dropdownItemTemplate]="paginatorDropdownItemTemplate"
                [showCurrentPageReport]="showCurrentPageReport"
                [showJumpToPageDropdown]="showJumpToPageDropdown"
                [showJumpToPageInput]="showJumpToPageInput"
                [showPageLinks]="showPageLinks"
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

            <div *ngIf="summaryTemplate" class="p-datatable-footer">
                <ng-container *ngTemplateOutlet="summaryTemplate"></ng-container>
            </div>

            <div #resizeHelper class="p-column-resizer-helper" style="display:none" *ngIf="resizableColumns"></div>
            <span #reorderIndicatorUp class="p-datatable-reorder-indicator-up" style="display: none;" *ngIf="reorderableColumns">
                <ArrowDownIcon *ngIf="!reorderIndicatorUpIconTemplate" />
                <ng-template *ngTemplateOutlet="reorderIndicatorUpIconTemplate"></ng-template>
            </span>
            <span #reorderIndicatorDown class="p-datatable-reorder-indicator-down" style="display: none;" *ngIf="reorderableColumns">
                <ArrowUpIcon *ngIf="!reorderIndicatorDownIconTemplate" />
                <ng-template *ngTemplateOutlet="reorderIndicatorDownIconTemplate"></ng-template>
            </span>
        </div>
    `,
    providers: [TableService],
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./table.css'],
    host: {
        class: 'p-element'
    }
})
export class Table implements OnInit, AfterViewInit, AfterContentInit, BlockableUI, OnChanges {
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
     * When specified as true, enables the pagination.
     * @group Props
     */
    @Input() paginator: boolean | undefined;
    /**
     * Number of page links to display in paginator.
     * @group Props
     */
    @Input() pageLinks: number = 5;
    /**
     * Array of integer/object values to display inside rows per page dropdown of paginator
     * @group Props
     */
    @Input() rowsPerPageOptions: any[] | undefined;
    /**
     * Whether to show it even there is only one page.
     * @group Props
     */
    @Input() alwaysShowPaginator: boolean = true;
    /**
     * Position of the paginator, options are "top", "bottom" or "both".
     * @group Props
     */
    @Input() paginatorPosition: 'top' | 'bottom' | 'both' = 'bottom';
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
     * Whether to display a input to navigate to any page.
     * @group Props
     */
    @Input() showJumpToPageInput: boolean | undefined;
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
     * Sort order to use when an unsorted column gets sorted by user interaction.
     * @group Props
     */
    @Input() defaultSortOrder: number = 1;
    /**
     * Defines whether sorting works on single column or on multiple columns.
     * @group Props
     */
    @Input() sortMode: 'single' | 'multiple' = 'single';
    /**
     * When true, resets paginator to first page after sorting. Available only when sortMode is set to single.
     * @group Props
     */
    @Input() resetPageOnSort: boolean = true;
    /**
     * Specifies the selection mode, valid values are "single" and "multiple".
     * @group Props
     */
    @Input() selectionMode: 'single' | 'multiple' | undefined | null;
    /**
     * When enabled with paginator and checkbox selection mode, the select all checkbox in the header will select all rows on the current page.
     * @group Props
     */
    @Input() selectionPageOnly: boolean | undefined;
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
    @Input() metaKeySelection: boolean | undefined;
    /**
     * Defines if the row is selectable.
     * @group Props
     */
    @Input() rowSelectable: boolean | undefined | any;
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity.
     * @group Props
     */
    @Input() rowTrackBy: Function = (index: number, item: any) => item;
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @group Props
     */
    @Input() lazy: boolean = false;
    /**
     * Whether to call lazy loading on initialization.
     * @group Props
     */
    @Input() lazyLoadOnInit: boolean = true;
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
    @Input() filterDelay: number = 300;
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
    @Input() scrollable: boolean | undefined;
    /**
     * Orientation of the scrolling, options are "vertical", "horizontal" and "both".
     * @group Props
     * @deprecated Property is obselete since v14.2.0.
     */
    @Input() scrollDirection: 'vertical' | 'horizontal' | 'both' = 'vertical';
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
    @Input() virtualScroll: boolean | undefined;
    /**
     * Height of a row to use in calculations of virtual scrolling.
     * @group Props
     */
    @Input() virtualScrollItemSize: number | undefined;
    /**
     * Whether to use the scroller feature. The properties of scroller component can be used like an object in it.
     * @group Props
     */
    @Input() virtualScrollOptions: ScrollerOptions | undefined;
    /**
     * Threshold in milliseconds to delay lazy loading during scrolling.
     * @group Props
     */
    @Input() virtualScrollDelay: number = 250;
    /**
     * Width of the frozen columns container.
     * @group Props
     */
    @Input() frozenWidth: string | undefined;
    /**
     * Defines if the table is responsive.
     * @group Props
     * @deprecated table is always responsive with scrollable behavior.
     */
    @Input() get responsive(): boolean | undefined | null {
        return this._responsive;
    }
    set responsive(val: boolean | undefined | null) {
        this._responsive = val;
        console.warn('responsive property is deprecated as table is always responsive with scrollable behavior.');
    }
    _responsive: boolean | undefined | null;
    /**
     * Local ng-template varilable of a ContextMenu.
     * @group Props
     */
    @Input() contextMenu: any;
    /**
     * When enabled, columns can be resized using drag and drop.
     * @group Props
     */
    @Input() resizableColumns: boolean | undefined;
    /**
     * Defines whether the overall table width should change on column resize, valid values are "fit" and "expand".
     * @group Props
     */
    @Input() columnResizeMode: string = 'fit';
    /**
     * When enabled, columns can be reordered using drag and drop.
     * @group Props
     */
    @Input() reorderableColumns: boolean | undefined;
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
     * Whether to show the loading mask when loading property is true.
     * @group Props
     */
    @Input() showLoader: boolean = true;
    /**
     * Adds hover effect to rows without the need for selectionMode. Note that tr elements that can be hovered need to have "p-selectable-row" class for rowHover to work.
     * @group Props
     */
    @Input() rowHover: boolean | undefined;
    /**
     * Whether to use the default sorting or a custom one using sortFunction.
     * @group Props
     */
    @Input() customSort: boolean | undefined;
    /**
     * Whether to use the initial sort badge or not.
     * @group Props
     */
    @Input() showInitialSortBadge: boolean = true;
    /**
     * Whether the cell widths scale according to their content or not.  Deprecated:  Table layout is always "auto".
     * @group Props
     */
    @Input() autoLayout: boolean | undefined;
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
     * Order to sort when default row grouping is enabled.
     * @group Props
     */
    @Input() groupRowsByOrder: number = 1;
    /**
     * Defines the responsive mode, valid options are "stack" and "scroll".
     * @group Props
     */
    @Input() responsiveLayout: string = 'scroll';
    /**
     * The breakpoint to define the maximum width boundary when using stack responsive layout.
     * @group Props
     */
    @Input() breakpoint: string = '960px';
    /**
     * No description available.
     * @param {TableSelectAllChangeEvent} event - custom  all selection change event.
     * @group Emits
     */
    /**
     * An array of objects to display.
     * @group Props
     */
    @Input() get value(): any[] {
        return this._value;
    }
    set value(val: any[]) {
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
    @Output() onRowSelect: EventEmitter<TableRowSelectEvent> = new EventEmitter<TableRowSelectEvent>();
    /**
     * Callback to invoke when a row is unselected.
     * @param {TableRowUnSelectEvent} event - custom unselect event.
     * @group Emits
     */
    @Output() onRowUnselect: EventEmitter<TableRowUnSelectEvent> = new EventEmitter<TableRowUnSelectEvent>();
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
    @Output() onRowExpand: EventEmitter<TableRowExpandEvent> = new EventEmitter<TableRowExpandEvent>();
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
    @Output() onContextMenuSelect: EventEmitter<TableContextMenuSelectEvent> = new EventEmitter<TableContextMenuSelectEvent>();
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
    @Output() onHeaderCheckboxToggle: EventEmitter<TableHeaderCheckboxToggleEvent> = new EventEmitter<TableHeaderCheckboxToggleEvent>();
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

    @ViewChild('container') containerViewChild: Nullable<ElementRef>;

    @ViewChild('resizeHelper') resizeHelperViewChild: Nullable<ElementRef>;

    @ViewChild('reorderIndicatorUp') reorderIndicatorUpViewChild: Nullable<ElementRef>;

    @ViewChild('reorderIndicatorDown') reorderIndicatorDownViewChild: Nullable<ElementRef>;

    @ViewChild('wrapper') wrapperViewChild: Nullable<ElementRef>;

    @ViewChild('table') tableViewChild: Nullable<ElementRef>;

    @ViewChild('thead') tableHeaderViewChild: Nullable<ElementRef>;

    @ViewChild('tfoot') tableFooterViewChild: Nullable<ElementRef>;

    @ViewChild('scroller') scroller: Nullable<Scroller>;

    @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<PrimeTemplate>>;
    /**
     * Indicates the height of rows to be scrolled.
     * @group Props
     * @deprecated use virtualScrollItemSize property instead.
     */
    @Input() get virtualRowHeight(): number {
        return this._virtualRowHeight;
    }
    set virtualRowHeight(val: number) {
        this._virtualRowHeight = val;
        console.warn('The virtualRowHeight property is deprecated.');
    }
    _virtualRowHeight: number = 28;

    _value: any[] = [];

    _columns: any[] | undefined;

    _totalRecords: number = 0;

    _first: number | null | undefined = 0;

    _rows: number | undefined;

    filteredValue: any[] | undefined | null;

    headerTemplate: Nullable<TemplateRef<any>>;

    headerGroupedTemplate: Nullable<TemplateRef<any>>;

    bodyTemplate: Nullable<TemplateRef<any>>;

    loadingBodyTemplate: Nullable<TemplateRef<any>>;

    captionTemplate: Nullable<TemplateRef<any>>;

    footerTemplate: Nullable<TemplateRef<any>>;

    footerGroupedTemplate: Nullable<TemplateRef<any>>;

    summaryTemplate: Nullable<TemplateRef<any>>;

    colGroupTemplate: Nullable<TemplateRef<any>>;

    expandedRowTemplate: Nullable<TemplateRef<any>>;

    groupHeaderTemplate: Nullable<TemplateRef<any>>;

    groupFooterTemplate: Nullable<TemplateRef<any>>;

    frozenExpandedRowTemplate: Nullable<TemplateRef<any>>;

    frozenHeaderTemplate: Nullable<TemplateRef<any>>;

    frozenBodyTemplate: Nullable<TemplateRef<any>>;

    frozenFooterTemplate: Nullable<TemplateRef<any>>;

    frozenColGroupTemplate: Nullable<TemplateRef<any>>;

    emptyMessageTemplate: Nullable<TemplateRef<any>>;

    paginatorLeftTemplate: Nullable<TemplateRef<any>>;

    paginatorRightTemplate: Nullable<TemplateRef<any>>;

    paginatorDropdownItemTemplate: Nullable<TemplateRef<any>>;

    loadingIconTemplate: Nullable<TemplateRef<any>>;

    reorderIndicatorUpIconTemplate: Nullable<TemplateRef<any>>;

    reorderIndicatorDownIconTemplate: Nullable<TemplateRef<any>>;

    sortIconTemplate: Nullable<TemplateRef<any>>;

    checkboxIconTemplate: Nullable<TemplateRef<any>>;

    headerCheckboxIconTemplate: Nullable<TemplateRef<any>>;

    paginatorFirstPageLinkIconTemplate: Nullable<TemplateRef<any>>;

    paginatorLastPageLinkIconTemplate: Nullable<TemplateRef<any>>;

    paginatorPreviousPageLinkIconTemplate: Nullable<TemplateRef<any>>;

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

    resizeColumnElement: any;

    columnResizing: boolean = false;

    rowGroupHeaderStyleObject: any = {};

    id: string = UniqueComponentId();

    styleElement: any;

    responsiveStyleElement: any;

    private window: Window;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: any,
        private renderer: Renderer2,
        public el: ElementRef,
        public zone: NgZone,
        public tableService: TableService,
        public cd: ChangeDetectorRef,
        public filterService: FilterService,
        public overlayService: OverlayService
    ) {
        this.window = this.document.defaultView as Window;
    }

    ngOnInit() {
        if (this.lazy && this.lazyLoadOnInit) {
            if (!this.virtualScroll) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }

            if (this.restoringFilter) {
                this.restoringFilter = false;
            }
        }

        if (this.responsiveLayout === 'stack' && !this.scrollable) {
            this.createResponsiveStyle();
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

                case 'rowexpansion':
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

                case 'frozenrowexpansion':
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

    ngAfterViewInit() {
        if (this.isStateful() && this.resizableColumns) {
            this.restoreColumnWidths();
        }
    }

    ngOnChanges(simpleChange: SimpleChanges) {
        if (simpleChange.value) {
            if (this.isStateful() && !this.stateRestored) {
                this.restoreState();
            }

            this._value = simpleChange.value.currentValue;

            if (!this.lazy) {
                this.totalRecords = this._value ? this._value.length : 0;

                if (this.sortMode == 'single' && (this.sortField || this.groupRowsBy)) this.sortSingle();
                else if (this.sortMode == 'multiple' && (this.multiSortMeta || this.groupRowsBy)) this.sortMultiple();
                else if (this.hasFilter())
                    //sort already filters
                    this._filter();
            }

            this.tableService.onValueChange(simpleChange.value.currentValue);
        }

        if (simpleChange.columns) {
            this._columns = simpleChange.columns.currentValue;
            this.tableService.onColumnsChange(simpleChange.columns.currentValue);

            if (this._columns && this.isStateful() && this.reorderableColumns && !this.columnOrderStateRestored) {
                this.restoreColumnOrder();
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
                    this._multiSortMeta = [{ field: <string>event.field, order: sortMeta.order * -1 }];

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
                (<SortMeta[]>this._multiSortMeta).push({ field: <string>event.field, order: this.defaultSortOrder });
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
                        let result = null;

                        if (value1 == null && value2 != null) result = -1;
                        else if (value1 != null && value2 == null) result = 1;
                        else if (value1 == null && value2 == null) result = 0;
                        else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
                        else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

                        return order * result;
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
        if (targetNode == 'INPUT' || targetNode == 'BUTTON' || targetNode == 'A' || parentNode == 'INPUT' || parentNode == 'BUTTON' || parentNode == 'A' || DomHandler.hasClass(event.originalEvent.target, 'p-clickable')) {
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

                        this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
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

                        this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: rowIndex });
                    }
                } else {
                    if (this.selectionMode === 'single') {
                        if (selected) {
                            this._selection = null;
                            this.selectionKeys = {};
                            this.selectionChange.emit(this.selection);
                            this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: rowIndex });
                        } else {
                            this._selection = rowData;
                            this.selectionChange.emit(this.selection);
                            this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: rowIndex });
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
                            this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: rowIndex });
                            if (dataKeyValue) {
                                delete this.selectionKeys[dataKeyValue];
                            }
                        } else {
                            this._selection = this.selection ? [...this.selection, rowData] : [rowData];
                            this.selectionChange.emit(this.selection);
                            this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: rowIndex });
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

            if (this.contextMenuSelectionMode === 'separate') {
                this.contextMenuSelection = rowData;
                this.contextMenuSelectionChange.emit(rowData);
                this.onContextMenuSelect.emit({ originalEvent: event.originalEvent, data: rowData, index: event.rowIndex });
                this.contextMenu.show(event.originalEvent);
                this.tableService.onContextMenu(rowData);
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

                this.tableService.onSelectionChange();
                this.contextMenu.show(event.originalEvent);
                this.onContextMenuSelect.emit({ originalEvent: event, data: rowData, index: event.rowIndex });
            }
        }
    }

    selectRange(event: MouseEvent, rowIndex: number) {
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
            (rangeStart as number) -= <number>this.first;
        }

        let rangeRowsData = [];
        for (let i = <number>rangeStart; i <= <number>rangeEnd; i++) {
            let rangeRowData = this.filteredValue ? this.filteredValue[i] : this.value[i];
            if (!this.isSelected(rangeRowData)) {
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
        this.onRowSelect.emit({ originalEvent: event, data: rangeRowsData, type: 'row' });
    }

    clearSelectionRange(event: MouseEvent) {
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
            this.onRowUnselect.emit({ originalEvent: event, data: rangeRowData, type: 'row' });
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
            this.onRowSelect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'radiobutton' });

            if (this.dataKey) {
                this.selectionKeys = {};
                this.selectionKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey))] = 1;
            }
        } else {
            this._selection = null;
            this.selectionChange.emit(this.selection);
            this.onRowUnselect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'radiobutton' });
        }

        this.tableService.onSelectionChange();

        if (this.isStateful()) {
            this.saveState();
        }
    }

    toggleRowWithCheckbox(event: any, rowData: any) {
        this.selection = this.selection || [];
        let selected = this.isSelected(rowData);
        let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;
        this.preventSelectionSetterPropagation = true;

        if (selected) {
            let selectionIndex = this.findIndexInSelection(rowData);
            this._selection = this.selection.filter((val: any, i: number) => i != selectionIndex);
            this.selectionChange.emit(this.selection);
            this.onRowUnselect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'checkbox' });
            if (dataKeyValue) {
                delete this.selectionKeys[dataKeyValue];
            }
        } else {
            if (!this.isRowSelectable(rowData, event.rowIndex)) {
                return;
            }

            this._selection = this.selection ? [...this.selection, rowData] : [rowData];
            this.selectionChange.emit(this.selection);
            this.onRowSelect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'checkbox' });
            if (dataKeyValue) {
                this.selectionKeys[dataKeyValue] = 1;
            }
        }

        this.tableService.onSelectionChange();

        if (this.isStateful()) {
            this.saveState();
        }
    }

    toggleRowsWithCheckbox(event: Event, check: boolean) {
        if (this._selectAll !== null) {
            this.selectAllChange.emit({ originalEvent: event, checked: check });
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
            this.onHeaderCheckboxToggle.emit({ originalEvent: event, checked: check });

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
                    this.totalRecords = this.value ? this.value.length : 0;
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
                    this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
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
            this.totalRecords = this._value ? this._value.length : 0;
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
     * @param {Object} object - Export options.
     * @group Method
     */
    public exportCSV(options?: any) {
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

        //headers
        for (let i = 0; i < (<any[]>columns).length; i++) {
            let column = (<any[]>columns)[i];
            if (column.exportable !== false && column.field) {
                csv += '"' + this.getExportHeader(column) + '"';

                if (i < (<any[]>columns).length - 1) {
                    csv += this.csvSeparator;
                }
            }
        }

        //body
        data.forEach((record: any, i: number) => {
            csv += '\n';
            for (let i = 0; i < (<any[]>columns).length; i++) {
                let column = (<any[]>columns)[i];
                if (column.exportable !== false && column.field) {
                    let cellData = ObjectUtils.resolveFieldData(record, column.field);

                    if (cellData != null) {
                        if (this.exportFunction) {
                            cellData = this.exportFunction({
                                data: cellData,
                                field: column.field
                            });
                        } else cellData = String(cellData).replace(/"/g, '""');
                    } else cellData = '';

                    csv += '"' + cellData + '"';

                    if (i < (<any[]>columns).length - 1) {
                        csv += this.csvSeparator;
                    }
                }
            }
        });

        let blob = new Blob([csv], {
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
            this.window.open(encodeURI(csv));
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
                    DomHandler.removeClass(this.editingCell, 'p-cell-editing');
                    this.editingCell = null;
                    this.onEditComplete.emit({ field: this.editingCellField, data: this.editingCellData, originalEvent: event, index: <number>this.editingCellRowIndex });
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
        if (!this.dataKey) {
            throw new Error('dataKey must be defined to use row expansion');
        }

        let dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));

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
        return this.expandedRowKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey))] === true;
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
        let containerLeft = DomHandler.getOffset(this.containerViewChild?.nativeElement).left;
        this.resizeColumnElement = event.target.parentElement;
        this.columnResizing = true;
        this.lastResizerHelperX = event.pageX - containerLeft + this.containerViewChild?.nativeElement.scrollLeft;
        this.onColumnResize(event);
        event.preventDefault();
    }

    onColumnResize(event: any) {
        let containerLeft = DomHandler.getOffset(this.containerViewChild?.nativeElement).left;
        DomHandler.addClass(this.containerViewChild?.nativeElement, 'p-unselectable-text');
        (<ElementRef>this.resizeHelperViewChild).nativeElement.style.height = this.containerViewChild?.nativeElement.offsetHeight + 'px';
        (<ElementRef>this.resizeHelperViewChild).nativeElement.style.top = 0 + 'px';
        (<ElementRef>this.resizeHelperViewChild).nativeElement.style.left = event.pageX - containerLeft + this.containerViewChild?.nativeElement.scrollLeft + 'px';

        (<ElementRef>this.resizeHelperViewChild).nativeElement.style.display = 'block';
    }

    onColumnResizeEnd() {
        let delta = this.resizeHelperViewChild?.nativeElement.offsetLeft - <number>this.lastResizerHelperX;
        let columnWidth = this.resizeColumnElement.offsetWidth;
        let newColumnWidth = columnWidth + delta;
        let minWidth = this.resizeColumnElement.style.minWidth.replace(/[^\d.]/g, '') || 15;

        if (newColumnWidth >= minWidth) {
            if (this.columnResizeMode === 'fit') {
                let nextColumn = this.resizeColumnElement.nextElementSibling;
                let nextColumnWidth = nextColumn.offsetWidth - delta;

                if (newColumnWidth > 15 && nextColumnWidth > 15) {
                    this.resizeTableCells(newColumnWidth, nextColumnWidth);
                }
            } else if (this.columnResizeMode === 'expand') {
                this._initialColWidths = this._totalTableWidth();
                let tableWidth = this.tableViewChild?.nativeElement.offsetWidth + delta;

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
        DomHandler.removeClass(this.containerViewChild?.nativeElement, 'p-unselectable-text');
    }

    private _totalTableWidth(): number[] {
        let widths = [];
        const tableHead = DomHandler.findSingle(this.containerViewChild.nativeElement, '.p-datatable-thead');
        let headers = DomHandler.find(tableHead, 'tr > th');
        headers.forEach((header) => widths.push(DomHandler.getOuterWidth(header)));

        return widths;
    }

    resizeTableCells(newColumnWidth: number, nextColumnWidth: number | null) {
        let colIndex = DomHandler.index(this.resizeColumnElement);
        let width = this.columnResizeMode === 'expand' ? this._initialColWidths : this._totalTableWidth();

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

    onColumnDragStart(event: any, columnElement: any) {
        this.reorderIconWidth = DomHandler.getHiddenElementOuterWidth(this.reorderIndicatorUpViewChild?.nativeElement);
        this.reorderIconHeight = DomHandler.getHiddenElementOuterHeight(this.reorderIndicatorDownViewChild?.nativeElement);
        this.draggedColumn = columnElement;
        event.dataTransfer.setData('text', 'b'); // For firefox
    }

    onColumnDragEnter(event: any, dropHeader: any) {
        if (this.reorderableColumns && this.draggedColumn && dropHeader) {
            event.preventDefault();
            let containerOffset = DomHandler.getOffset(this.containerViewChild?.nativeElement);
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

            (<ElementRef>this.reorderIndicatorUpViewChild).nativeElement.style.display = 'none';
            (<ElementRef>this.reorderIndicatorDownViewChild).nativeElement.style.display = 'none';
            this.draggedColumn.draggable = false;
            this.draggedColumn = null;
            this.dropPosition = null;
        }
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
                if (prevRowElement) DomHandler.addClass(prevRowElement, 'p-datatable-dragpoint-bottom');
                else DomHandler.addClass(rowElement, 'p-datatable-dragpoint-top');
            } else {
                if (prevRowElement) DomHandler.removeClass(prevRowElement, 'p-datatable-dragpoint-bottom');
                else DomHandler.addClass(rowElement, 'p-datatable-dragpoint-top');

                this.droppedRowIndex = index + 1;
                DomHandler.addClass(rowElement, 'p-datatable-dragpoint-bottom');
            }
        }
    }

    onRowDragLeave(event: Event, rowElement: any) {
        let prevRowElement = rowElement.previousElementSibling;
        if (prevRowElement) {
            DomHandler.removeClass(prevRowElement, 'p-datatable-dragpoint-bottom');
        }

        DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-bottom');
        DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-top');
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
        let headers = DomHandler.find(this.containerViewChild?.nativeElement, '.p-datatable-thead > tr > th');
        headers.forEach((header) => widths.push(DomHandler.getOuterWidth(header)));
        state.columnWidths = widths.join(',');

        if (this.columnResizeMode === 'expand') {
            state.tableWidth = DomHandler.getOuterWidth(this.tableViewChild?.nativeElement);
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
        this.renderer.appendChild(this.document.head, this.styleElement);
    }

    getGroupRowsMeta() {
        return { field: this.groupRowsBy, order: this.groupRowsByOrder };
    }

    createResponsiveStyle() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.responsiveStyleElement) {
                this.responsiveStyleElement = this.renderer.createElement('style');
                this.responsiveStyleElement.type = 'text/css';
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
    
        #${this.id}.p-datatable-gridlines > .p-datatable-wrapper > .p-datatable-table > .p-datatable-tbody > tr > td:last-child {
            border-top: 0;
            border-right: 0;
            border-left: 0;
        }
    
        #${this.id}-table > .p-datatable-tbody > tr > td > .p-column-title {
            display: block;
        }
    }
    `;
                this.renderer.setProperty(this.responsiveStyleElement, 'innerHTML', innerHTML);
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

    ngOnDestroy() {
        this.unbindDocumentEditListener();
        this.editingCell = null;
        this.initialized = null;

        this.destroyStyleElement();
        this.destroyResponsiveStyle();
    }
}

@Component({
    selector: '[pTableBody]',
    template: `
        <ng-container *ngIf="!dt.expandedRowTemplate">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="value" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container *ngIf="dt.groupHeaderTemplate && !dt.virtualScroll && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupHeader(value, rowData, rowIndex)" role="row">
                    <ng-container
                        *ngTemplateOutlet="dt.groupHeaderTemplate; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }"
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.rowGroupMode !== 'rowspan'">
                    <ng-container
                        *ngTemplateOutlet="rowData ? template : dt.loadingBodyTemplate; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }"
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.rowGroupMode === 'rowspan'">
                    <ng-container
                        *ngTemplateOutlet="
                            rowData ? template : dt.loadingBodyTemplate;
                            context: {
                                $implicit: rowData,
                                rowIndex: getRowIndex(rowIndex),
                                columns: columns,
                                editing: dt.editMode === 'row' && dt.isRowEditing(rowData),
                                frozen: frozen,
                                rowgroup: shouldRenderRowspan(value, rowData, rowIndex),
                                rowspan: calculateRowGroupSize(value, rowData, rowIndex)
                            }
                        "
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.groupFooterTemplate && !dt.virtualScroll && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupFooter(value, rowData, rowIndex)" role="row">
                    <ng-container
                        *ngTemplateOutlet="dt.groupFooterTemplate; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }"
                    ></ng-container>
                </ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.expandedRowTemplate && !(frozen && dt.frozenExpandedRowTemplate)">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="value" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container *ngIf="!dt.groupHeaderTemplate">
                    <ng-container
                        *ngTemplateOutlet="template; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, expanded: dt.isRowExpanded(rowData), editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }"
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.groupHeaderTemplate && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupHeader(value, rowData, getRowIndex(rowIndex))" role="row">
                    <ng-container
                        *ngTemplateOutlet="
                            dt.groupHeaderTemplate;
                            context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, expanded: dt.isRowExpanded(rowData), editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }
                        "
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.isRowExpanded(rowData)">
                    <ng-container *ngTemplateOutlet="dt.expandedRowTemplate; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, frozen: frozen }"></ng-container>
                    <ng-container *ngIf="dt.groupFooterTemplate && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupFooter(value, rowData, getRowIndex(rowIndex))" role="row">
                        <ng-container
                            *ngTemplateOutlet="
                                dt.groupFooterTemplate;
                                context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, expanded: dt.isRowExpanded(rowData), editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }
                            "
                        ></ng-container>
                    </ng-container>
                </ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.frozenExpandedRowTemplate && frozen">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="value" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container
                    *ngTemplateOutlet="template; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, expanded: dt.isRowExpanded(rowData), editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }"
                ></ng-container>
                <ng-container *ngIf="dt.isRowExpanded(rowData)">
                    <ng-container *ngTemplateOutlet="dt.frozenExpandedRowTemplate; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, frozen: frozen }"></ng-container>
                </ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.loading">
            <ng-container *ngTemplateOutlet="dt.loadingBodyTemplate; context: { $implicit: columns, frozen: frozen }"></ng-container>
        </ng-container>
        <ng-container *ngIf="dt.isEmpty() && !dt.loading">
            <ng-container *ngTemplateOutlet="dt.emptyMessageTemplate; context: { $implicit: columns, frozen: frozen }"></ng-container>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    }
})
export class TableBody implements AfterViewInit, OnDestroy {
    @Input('pTableBody') columns: any[] | undefined;

    @Input('pTableBodyTemplate') template: Nullable<TemplateRef<any>>;

    @Input() get value(): any[] | undefined {
        return this._value;
    }
    set value(val: any[] | undefined) {
        this._value = val;
        if (this.frozenRows) {
            this.updateFrozenRowStickyPosition();
        }

        if (this.dt.scrollable && this.dt.rowGroupMode === 'subheader') {
            this.updateFrozenRowGroupHeaderStickyPosition();
        }
    }

    @Input() frozen: boolean | undefined;

    @Input() frozenRows: boolean | undefined;

    @Input() scrollerOptions: any;

    subscription: Subscription;

    _value: any[] | undefined;

    ngAfterViewInit() {
        if (this.frozenRows) {
            this.updateFrozenRowStickyPosition();
        }

        if (this.dt.scrollable && this.dt.rowGroupMode === 'subheader') {
            this.updateFrozenRowGroupHeaderStickyPosition();
        }
    }

    constructor(public dt: Table, public tableService: TableService, public cd: ChangeDetectorRef, public el: ElementRef) {
        this.subscription = this.dt.tableService.valueSource$.subscribe(() => {
            if (this.dt.virtualScroll) {
                this.cd.detectChanges();
            }
        });
    }

    shouldRenderRowGroupHeader(value: any, rowData: any, i: number) {
        let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, this.dt.groupRowsBy);
        let prevRowData = value[i - 1];
        if (prevRowData) {
            let previousRowFieldData = ObjectUtils.resolveFieldData(prevRowData, this.dt.groupRowsBy);
            return currentRowFieldData !== previousRowFieldData;
        } else {
            return true;
        }
    }

    shouldRenderRowGroupFooter(value: any, rowData: any, i: number) {
        let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, this.dt.groupRowsBy);
        let nextRowData = value[i + 1];
        if (nextRowData) {
            let nextRowFieldData = ObjectUtils.resolveFieldData(nextRowData, this.dt.groupRowsBy);
            return currentRowFieldData !== nextRowFieldData;
        } else {
            return true;
        }
    }

    shouldRenderRowspan(value: any, rowData: any, i: number) {
        let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, this.dt.groupRowsBy);
        let prevRowData = value[i - 1];
        if (prevRowData) {
            let previousRowFieldData = ObjectUtils.resolveFieldData(prevRowData, this.dt.groupRowsBy);
            return currentRowFieldData !== previousRowFieldData;
        } else {
            return true;
        }
    }

    calculateRowGroupSize(value: any, rowData: any, index: number) {
        let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, this.dt.groupRowsBy);
        let nextRowFieldData = currentRowFieldData;
        let groupRowSpan = 0;

        while (currentRowFieldData === nextRowFieldData) {
            groupRowSpan++;
            let nextRowData = value[++index];
            if (nextRowData) {
                nextRowFieldData = ObjectUtils.resolveFieldData(nextRowData, this.dt.groupRowsBy);
            } else {
                break;
            }
        }

        return groupRowSpan === 1 ? null : groupRowSpan;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    updateFrozenRowStickyPosition() {
        this.el.nativeElement.style.top = DomHandler.getOuterHeight(this.el.nativeElement.previousElementSibling) + 'px';
    }

    updateFrozenRowGroupHeaderStickyPosition() {
        if (this.el.nativeElement.previousElementSibling) {
            let tableHeaderHeight = DomHandler.getOuterHeight(this.el.nativeElement.previousElementSibling);
            this.dt.rowGroupHeaderStyleObject.top = tableHeaderHeight + 'px';
        }
    }

    getScrollerOption(option: any, options?: any) {
        if (this.dt.virtualScroll) {
            options = options || this.scrollerOptions;
            return options ? options[option] : null;
        }

        return null;
    }

    getRowIndex(rowIndex: number) {
        const index = this.dt.paginator ? <number>this.dt.first + rowIndex : rowIndex;
        const getItemOptions = this.getScrollerOption('getItemOptions');
        return getItemOptions ? getItemOptions(index).index : index;
    }
}

@Directive({
    selector: '[pRowGroupHeader]',
    host: {
        class: 'p-rowgroup-header p-element',
        '[style.top]': 'getFrozenRowGroupHeaderStickyPosition'
    }
})
export class RowGroupHeader {
    constructor(public dt: Table) {}

    get getFrozenRowGroupHeaderStickyPosition() {
        return this.dt.rowGroupHeaderStyleObject ? this.dt.rowGroupHeaderStyleObject.top : '';
    }
}

@Directive({
    selector: '[pFrozenColumn]',
    host: {
        class: 'p-element',
        '[class.p-frozen-column]': 'frozen'
    }
})
export class FrozenColumn implements AfterViewInit {
    @Input() get frozen(): boolean {
        return this._frozen;
    }

    set frozen(val: boolean) {
        this._frozen = val;
        this.updateStickyPosition();
    }

    @Input() alignFrozen: string = 'left';

    constructor(private el: ElementRef) {}

    ngAfterViewInit() {
        setTimeout(() => {
            this.updateStickyPosition();
        }, 1000);
    }

    _frozen: boolean = true;

    updateStickyPosition() {
        if (this._frozen) {
            if (this.alignFrozen === 'right') {
                let right = 0;
                let next = this.el.nativeElement.nextElementSibling;
                if (next) {
                    right = DomHandler.getOuterWidth(next) + (parseFloat(next.style.right) || 0);
                }
                this.el.nativeElement.style.right = right + 'px';
            } else {
                let left = 0;
                let prev = this.el.nativeElement.previousElementSibling;
                if (prev) {
                    left = DomHandler.getOuterWidth(prev) + (parseFloat(prev.style.left) || 0);
                }
                this.el.nativeElement.style.left = left + 'px';
            }

            const filterRow = this.el.nativeElement?.parentElement?.nextElementSibling;

            if (filterRow) {
                let index = DomHandler.index(this.el.nativeElement);
                if (filterRow.children && filterRow.children[index]) {
                    filterRow.children[index].style.left = this.el.nativeElement.style.left;
                    filterRow.children[index].style.right = this.el.nativeElement.style.right;
                }
            }
        }
    }
}
@Directive({
    selector: '[pSortableColumn]',
    host: {
        class: 'p-element',
        '[class.p-sortable-column]': 'isEnabled()',
        '[class.p-highlight]': 'sorted',
        '[attr.tabindex]': 'isEnabled() ? "0" : null',
        '[attr.role]': '"columnheader"',
        '[attr.aria-sort]': 'sortOrder'
    }
})
export class SortableColumn implements OnInit, OnDestroy {
    @Input('pSortableColumn') field: string | undefined;

    @Input() pSortableColumnDisabled: boolean | undefined;

    sorted: boolean | undefined;

    sortOrder: string | undefined;

    subscription: Subscription | undefined;

    constructor(public dt: Table) {
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.sortSource$.subscribe((sortMeta) => {
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
        this.sorted = this.dt.isSorted(<string>this.field) as boolean;
        this.sortOrder = this.sorted ? (this.dt.sortOrder === 1 ? 'ascending' : 'descending') : 'none';
    }

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
        if (this.isEnabled()) {
            this.updateSortState();
            this.dt.sort({
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
        return this.pSortableColumnDisabled !== true;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

@Component({
    selector: 'p-sortIcon',
    template: `
        <ng-container *ngIf="!dt.sortIconTemplate">
            <SortAltIcon [styleClass]="'p-sortable-column-icon'" *ngIf="sortOrder === 0" />
            <SortAmountUpAltIcon [styleClass]="'p-sortable-column-icon'" *ngIf="sortOrder === 1" />
            <SortAmountDownIcon [styleClass]="'p-sortable-column-icon'" *ngIf="sortOrder === -1" />
        </ng-container>
        <span *ngIf="dt.sortIconTemplate" class="p-sortable-column-icon">
            <ng-template *ngTemplateOutlet="dt.sortIconTemplate; context: { $implicit: sortOrder }"></ng-template>
        </span>
        <span *ngIf="isMultiSorted()" class="p-sortable-column-badge">{{ getBadgeValue() }}</span>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    }
})
export class SortIcon implements OnInit, OnDestroy {
    @Input() field: string | undefined;

    subscription: Subscription | undefined;

    sortOrder: number | undefined;

    constructor(public dt: Table, public cd: ChangeDetectorRef) {
        this.subscription = this.dt.tableService.sortSource$.subscribe((sortMeta) => {
            this.updateSortState();
        });
    }

    ngOnInit() {
        this.updateSortState();
    }

    onClick(event: Event) {
        event.preventDefault();
    }

    updateSortState() {
        if (this.dt.sortMode === 'single') {
            this.sortOrder = this.dt.isSorted(<string>this.field) ? this.dt.sortOrder : 0;
        } else if (this.dt.sortMode === 'multiple') {
            let sortMeta = this.dt.getSortMeta(<string>this.field);
            this.sortOrder = sortMeta ? sortMeta.order : 0;
        }

        this.cd.markForCheck();
    }

    getMultiSortMetaIndex() {
        let multiSortMeta = this.dt._multiSortMeta;
        let index = -1;

        if (multiSortMeta && this.dt.sortMode === 'multiple' && (this.dt.showInitialSortBadge || multiSortMeta.length > 1)) {
            for (let i = 0; i < multiSortMeta.length; i++) {
                let meta = multiSortMeta[i];
                if (meta.field === this.field || meta.field === this.field) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }

    getBadgeValue() {
        let index = this.getMultiSortMetaIndex();

        return this.dt.groupRowsBy && index > -1 ? index : index + 1;
    }

    isMultiSorted() {
        return this.dt.sortMode === 'multiple' && this.getMultiSortMetaIndex() > -1;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

@Directive({
    selector: '[pSelectableRow]',
    host: {
        class: 'p-element',
        '[class.p-selectable-row]': 'isEnabled()',
        '[class.p-highlight]': 'selected',
        '[attr.tabindex]': 'isEnabled() ? 0 : undefined'
    }
})
export class SelectableRow implements OnInit, OnDestroy {
    @Input('pSelectableRow') data: any;

    @Input('pSelectableRowIndex') index: number | undefined;

    @Input() pSelectableRowDisabled: boolean | undefined;

    selected: boolean | undefined;

    subscription: Subscription | undefined;

    constructor(public dt: Table, public tableService: TableService) {
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.selectionSource$.subscribe(() => {
                this.selected = this.dt.isSelected(this.data);
            });
        }
    }

    ngOnInit() {
        if (this.isEnabled()) {
            this.selected = this.dt.isSelected(this.data);
        }
    }

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        if (this.isEnabled()) {
            this.dt.handleRowClick({
                originalEvent: event,
                rowData: this.data,
                rowIndex: this.index
            });
        }
    }

    @HostListener('touchend', ['$event'])
    onTouchEnd(event: Event) {
        if (this.isEnabled()) {
            this.dt.handleRowTouchEnd(event);
        }
    }

    @HostListener('keydown.arrowdown', ['$event'])
    onArrowDownKeyDown(event: KeyboardEvent) {
        if (!this.isEnabled()) {
            return;
        }

        const row = <HTMLTableRowElement>event.currentTarget;
        const nextRow = this.findNextSelectableRow(row);

        if (nextRow) {
            nextRow.focus();
        }

        event.preventDefault();
    }

    @HostListener('keydown.arrowup', ['$event'])
    onArrowUpKeyDown(event: KeyboardEvent) {
        if (!this.isEnabled()) {
            return;
        }

        const row = <HTMLTableRowElement>event.currentTarget;
        const prevRow = this.findPrevSelectableRow(row);

        if (prevRow) {
            prevRow.focus();
        }

        event.preventDefault();
    }

    @HostListener('keydown.enter', ['$event'])
    @HostListener('keydown.shift.enter', ['$event'])
    @HostListener('keydown.meta.enter', ['$event'])
    onEnterKeyDown(event: KeyboardEvent) {
        if (!this.isEnabled()) {
            return;
        }

        this.dt.handleRowClick({
            originalEvent: event,
            rowData: this.data,
            rowIndex: this.index
        });
    }

    @HostListener('keydown.pagedown')
    @HostListener('keydown.pageup')
    @HostListener('keydown.home')
    @HostListener('keydown.end')
    onPageDownKeyDown() {
        if (this.dt.virtualScroll) {
            (<any>this.dt.scroller).elementViewChild.nativeElement.focus();
        }
    }

    @HostListener('keydown.space')
    onSpaceKeydown() {
        if (this.dt.virtualScroll && !this.dt.editingCell) {
            (<any>this.dt.scroller).elementViewChild.nativeElement.focus();
        }
    }

    findNextSelectableRow(row: HTMLTableRowElement): HTMLTableRowElement | null {
        let nextRow = <HTMLTableRowElement>row.nextElementSibling;
        if (nextRow) {
            if (DomHandler.hasClass(nextRow, 'p-selectable-row')) return nextRow;
            else return this.findNextSelectableRow(nextRow);
        } else {
            return null;
        }
    }

    findPrevSelectableRow(row: HTMLTableRowElement): HTMLTableRowElement | null {
        let prevRow = <HTMLTableRowElement>row.previousElementSibling;
        if (prevRow) {
            if (DomHandler.hasClass(prevRow, 'p-selectable-row')) return prevRow;
            else return this.findPrevSelectableRow(prevRow);
        } else {
            return null;
        }
    }

    isEnabled() {
        return this.pSelectableRowDisabled !== true;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

@Directive({
    selector: '[pSelectableRowDblClick]',
    host: {
        class: 'p-element',
        '[class.p-selectable-row]': 'isEnabled()',
        '[class.p-highlight]': 'selected'
    }
})
export class SelectableRowDblClick implements OnInit, OnDestroy {
    @Input('pSelectableRowDblClick') data: any;

    @Input('pSelectableRowIndex') index: number | undefined;

    @Input() pSelectableRowDisabled: boolean | undefined;

    selected: boolean | undefined;

    subscription: Subscription | undefined;

    constructor(public dt: Table, public tableService: TableService) {
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.selectionSource$.subscribe(() => {
                this.selected = this.dt.isSelected(this.data);
            });
        }
    }

    ngOnInit() {
        if (this.isEnabled()) {
            this.selected = this.dt.isSelected(this.data);
        }
    }

    @HostListener('dblclick', ['$event'])
    onClick(event: Event) {
        if (this.isEnabled()) {
            this.dt.handleRowClick({
                originalEvent: event,
                rowData: this.data,
                rowIndex: this.index
            });
        }
    }

    isEnabled() {
        return this.pSelectableRowDisabled !== true;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

@Directive({
    selector: '[pContextMenuRow]',
    host: {
        class: 'p-element',
        '[class.p-highlight-contextmenu]': 'selected',
        '[attr.tabindex]': 'isEnabled() ? 0 : undefined'
    }
})
export class ContextMenuRow {
    @Input('pContextMenuRow') data: any;

    @Input('pContextMenuRowIndex') index: number | undefined;

    @Input() pContextMenuRowDisabled: boolean | undefined;

    selected: boolean | undefined;

    subscription: Subscription | undefined;

    constructor(public dt: Table, public tableService: TableService, private el: ElementRef) {
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.contextMenuSource$.subscribe((data) => {
                this.selected = this.dt.equals(this.data, data);
            });
        }
    }

    @HostListener('contextmenu', ['$event'])
    onContextMenu(event: Event) {
        if (this.isEnabled()) {
            this.dt.handleRowRightClick({
                originalEvent: event,
                rowData: this.data,
                rowIndex: this.index
            });

            this.el.nativeElement.focus();
            event.preventDefault();
        }
    }

    isEnabled() {
        return this.pContextMenuRowDisabled !== true;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

@Directive({
    selector: '[pRowToggler]',
    host: {
        class: 'p-element'
    }
})
export class RowToggler {
    @Input('pRowToggler') data: any;

    @Input() pRowTogglerDisabled: boolean | undefined;

    constructor(public dt: Table) {}

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        if (this.isEnabled()) {
            this.dt.toggleRow(this.data, event);
            event.preventDefault();
        }
    }

    isEnabled() {
        return this.pRowTogglerDisabled !== true;
    }
}

@Directive({
    selector: '[pResizableColumn]',
    host: {
        class: 'p-element'
    }
})
export class ResizableColumn implements AfterViewInit, OnDestroy {
    @Input() pResizableColumnDisabled: boolean | undefined;

    resizer: HTMLSpanElement | undefined;

    resizerMouseDownListener: VoidListener;

    documentMouseMoveListener: VoidListener;

    documentMouseUpListener: VoidListener;

    constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: any, private renderer: Renderer2, public dt: Table, public el: ElementRef, public zone: NgZone) {}

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
        if (event.which === 1) {
            this.dt.onColumnResizeBegin(event);
            this.bindDocumentEvents();
        }
    }

    onDocumentMouseMove(event: MouseEvent) {
        this.dt.onColumnResize(event);
    }

    onDocumentMouseUp(event: MouseEvent) {
        this.dt.onColumnResizeEnd();
        this.unbindDocumentEvents();
    }

    isEnabled() {
        return this.pResizableColumnDisabled !== true;
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
    selector: '[pReorderableColumn]',
    host: {
        class: 'p-element'
    }
})
export class ReorderableColumn implements AfterViewInit, OnDestroy {
    @Input() pReorderableColumnDisabled: boolean | undefined;

    dragStartListener: VoidListener;

    dragOverListener: VoidListener;

    dragEnterListener: VoidListener;

    dragLeaveListener: VoidListener;

    mouseDownListener: VoidListener;

    constructor(@Inject(PLATFORM_ID) private platformId: any, private renderer: Renderer2, public dt: Table, public el: ElementRef, public zone: NgZone) {}

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

                this.dragOverListener = this.renderer.listen(this.el.nativeElement, 'dragover', this.onDragOver.bind(this));

                this.dragEnterListener = this.renderer.listen(this.el.nativeElement, 'dragenter', this.onDragEnter.bind(this));

                this.dragLeaveListener = this.renderer.listen(this.el.nativeElement, 'dragleave', this.onDragLeave.bind(this));
            });
        }
    }

    unbindEvents() {
        if (this.mouseDownListener) {
            this.mouseDownListener();
            this.mouseDownListener = null;
        }

        if (this.dragStartListener) {
            this.dragStartListener();
            this.dragStartListener = null;
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

    onMouseDown(event: any) {
        if (event.target.nodeName === 'INPUT' || event.target.nodeName === 'TEXTAREA' || DomHandler.hasClass(event.target, 'p-column-resizer')) this.el.nativeElement.draggable = false;
        else this.el.nativeElement.draggable = true;
    }

    onDragStart(event: any) {
        this.dt.onColumnDragStart(event, this.el.nativeElement);
    }

    onDragOver(event: any) {
        event.preventDefault();
    }

    onDragEnter(event: any) {
        this.dt.onColumnDragEnter(event, this.el.nativeElement);
    }

    onDragLeave(event: any) {
        this.dt.onColumnDragLeave(event);
    }

    @HostListener('drop', ['$event'])
    onDrop(event: any) {
        if (this.isEnabled()) {
            this.dt.onColumnDrop(event, this.el.nativeElement);
        }
    }

    isEnabled() {
        return this.pReorderableColumnDisabled !== true;
    }

    ngOnDestroy() {
        this.unbindEvents();
    }
}

@Directive({
    selector: '[pEditableColumn]',
    host: {
        class: 'p-element'
    }
})
export class EditableColumn implements AfterViewInit, OnDestroy {
    @Input('pEditableColumn') data: any;

    @Input('pEditableColumnField') field: any;

    @Input('pEditableColumnRowIndex') rowIndex: number | undefined;

    @Input() pEditableColumnDisabled: boolean | undefined;

    @Input() pFocusCellSelector: string | undefined;

    overlayEventListener: any;

    constructor(public dt: Table, public el: ElementRef, public zone: NgZone) {}

    ngAfterViewInit() {
        if (this.isEnabled()) {
            DomHandler.addClass(this.el.nativeElement, 'p-editable-column');
        }
    }

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
        if (this.isEnabled()) {
            this.dt.selfClick = true;

            if (this.dt.editingCell) {
                if (this.dt.editingCell !== this.el.nativeElement) {
                    if (!this.dt.isEditingCellValid()) {
                        return;
                    }

                    this.closeEditingCell(true, event);
                    this.openCell();
                }
            } else {
                this.openCell();
            }
        }
    }

    openCell() {
        this.dt.updateEditingCell(this.el.nativeElement, this.data, this.field, <number>this.rowIndex);
        DomHandler.addClass(this.el.nativeElement, 'p-cell-editing');
        this.dt.onEditInit.emit({ field: this.field, data: this.data, index: <number>this.rowIndex });
        this.zone.runOutsideAngular(() => {
            setTimeout(() => {
                let focusCellSelector = this.pFocusCellSelector || 'input, textarea, select';
                let focusableElement = DomHandler.findSingle(this.el.nativeElement, focusCellSelector);

                if (focusableElement) {
                    focusableElement.focus();
                }
            }, 50);
        });

        this.overlayEventListener = (e: any) => {
            if (this.el && this.el.nativeElement.contains(e.target)) {
                this.dt.selfClick = true;
            }
        };

        this.dt.overlaySubscription = this.dt.overlayService.clickObservable.subscribe(this.overlayEventListener);
    }

    closeEditingCell(completed: any, event: Event) {
        const eventData = { field: <string>this.dt.editingCellField, data: <any>this.dt.editingCellData, originalEvent: <Event>event, index: <number>this.dt.editingCellRowIndex };

        if (completed) {
            this.dt.onEditComplete.emit(eventData);
        } else {
            this.dt.onEditCancel.emit(eventData);

            this.dt.value.forEach((element) => {
                if (element[this.dt.editingCellField] === this.data) {
                    element[this.dt.editingCellField] = this.dt.editingCellData;
                }
            });
        }

        DomHandler.removeClass(this.dt.editingCell, 'p-cell-editing');
        this.dt.editingCell = null;
        this.dt.editingCellData = null;
        this.dt.editingCellField = null;
        this.dt.unbindDocumentEditListener();

        if (this.dt.overlaySubscription) {
            this.dt.overlaySubscription.unsubscribe();
        }
    }

    @HostListener('keydown.enter', ['$event'])
    onEnterKeyDown(event: KeyboardEvent) {
        if (this.isEnabled()) {
            if (this.dt.isEditingCellValid()) {
                this.closeEditingCell(true, event);
            }

            event.preventDefault();
        }
    }

    @HostListener('keydown.tab', ['$event'])
    onTabKeyDown(event: KeyboardEvent) {
        if (this.isEnabled()) {
            if (this.dt.isEditingCellValid()) {
                this.closeEditingCell(true, event);
            }

            event.preventDefault();
        }
    }

    @HostListener('keydown.escape', ['$event'])
    onEscapeKeyDown(event: KeyboardEvent) {
        if (this.isEnabled()) {
            if (this.dt.isEditingCellValid()) {
                this.closeEditingCell(false, event);
            }

            event.preventDefault();
        }
    }

    @HostListener('keydown.tab', ['$event'])
    @HostListener('keydown.shift.tab', ['$event'])
    @HostListener('keydown.meta.tab', ['$event'])
    onShiftKeyDown(event: KeyboardEvent) {
        if (this.isEnabled()) {
            if (event.shiftKey) this.moveToPreviousCell(event);
            else {
                this.moveToNextCell(event);
            }
        }
    }
    @HostListener('keydown.arrowdown', ['$event'])
    onArrowDown(event: KeyboardEvent) {
        if (this.isEnabled()) {
            let currentCell = this.findCell(event.target);
            if (currentCell) {
                let cellIndex = DomHandler.index(currentCell);
                let targetCell = this.findNextEditableColumnByIndex(currentCell, cellIndex);

                if (targetCell) {
                    if (this.dt.isEditingCellValid()) {
                        this.closeEditingCell(true, event);
                    }

                    DomHandler.invokeElementMethod(event.target, 'blur');
                    DomHandler.invokeElementMethod(targetCell, 'click');
                }

                event.preventDefault();
            }
        }
    }

    @HostListener('keydown.arrowup', ['$event'])
    onArrowUp(event: KeyboardEvent) {
        if (this.isEnabled()) {
            let currentCell = this.findCell(event.target);
            if (currentCell) {
                let cellIndex = DomHandler.index(currentCell);
                let targetCell = this.findPrevEditableColumnByIndex(currentCell, cellIndex);

                if (targetCell) {
                    if (this.dt.isEditingCellValid()) {
                        this.closeEditingCell(true, event);
                    }

                    DomHandler.invokeElementMethod(event.target, 'blur');
                    DomHandler.invokeElementMethod(targetCell, 'click');
                }

                event.preventDefault();
            }
        }
    }

    @HostListener('keydown.arrowleft', ['$event'])
    onArrowLeft(event: KeyboardEvent) {
        if (this.isEnabled()) {
            this.moveToPreviousCell(event);
        }
    }

    @HostListener('keydown.arrowright', ['$event'])
    onArrowRight(event: KeyboardEvent) {
        if (this.isEnabled()) {
            this.moveToNextCell(event);
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
        if (currentCell) {
            let targetCell = this.findPreviousEditableColumn(currentCell);

            if (targetCell) {
                if (this.dt.isEditingCellValid()) {
                    this.closeEditingCell(true, event);
                }

                DomHandler.invokeElementMethod(event.target, 'blur');
                DomHandler.invokeElementMethod(targetCell, 'click');
                event.preventDefault();
            }
        }
    }

    moveToNextCell(event: KeyboardEvent) {
        let currentCell = this.findCell(event.target);
        if (currentCell) {
            let targetCell = this.findNextEditableColumn(currentCell);

            if (targetCell) {
                if (this.dt.isEditingCellValid()) {
                    this.closeEditingCell(true, event);
                }

                DomHandler.invokeElementMethod(event.target, 'blur');
                DomHandler.invokeElementMethod(targetCell, 'click');
                event.preventDefault();
            }
        }
    }

    findPreviousEditableColumn(cell: any): HTMLTableCellElement | null {
        let prevCell = cell.previousElementSibling;

        if (!prevCell) {
            let previousRow = cell.parentElement?.previousElementSibling;
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

    findNextEditableColumn(cell: any): HTMLTableCellElement | null {
        let nextCell = cell.nextElementSibling;

        if (!nextCell) {
            let nextRow = cell.parentElement?.nextElementSibling;
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

    findNextEditableColumnByIndex(cell: Element, index: number) {
        let nextRow = cell.parentElement?.nextElementSibling;

        if (nextRow) {
            let nextCell = nextRow.children[index];

            if (nextCell && DomHandler.hasClass(nextCell, 'p-editable-column')) {
                return nextCell;
            }

            return null;
        } else {
            return null;
        }
    }

    findPrevEditableColumnByIndex(cell: Element, index: number) {
        let prevRow = cell.parentElement?.previousElementSibling;

        if (prevRow) {
            let prevCell = prevRow.children[index];

            if (prevCell && DomHandler.hasClass(prevCell, 'p-editable-column')) {
                return prevCell;
            }

            return null;
        } else {
            return null;
        }
    }

    isEnabled() {
        return this.pEditableColumnDisabled !== true;
    }

    ngOnDestroy() {
        if (this.dt.overlaySubscription) {
            this.dt.overlaySubscription.unsubscribe();
        }
    }
}

@Directive({
    selector: '[pEditableRow]',
    host: {
        class: 'p-element'
    }
})
export class EditableRow {
    @Input('pEditableRow') data: any;

    @Input() pEditableRowDisabled: boolean | undefined;

    constructor(public el: ElementRef) {}

    isEnabled() {
        return this.pEditableRowDisabled !== true;
    }
}

@Directive({
    selector: '[pInitEditableRow]',
    host: {
        class: 'p-element'
    }
})
export class InitEditableRow {
    constructor(public dt: Table, public editableRow: EditableRow) {}

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        this.dt.initRowEdit(this.editableRow.data);
        event.preventDefault();
    }
}

@Directive({
    selector: '[pSaveEditableRow]',
    host: {
        class: 'p-element'
    }
})
export class SaveEditableRow {
    constructor(public dt: Table, public editableRow: EditableRow) {}

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        this.dt.saveRowEdit(this.editableRow.data, this.editableRow.el.nativeElement);
        event.preventDefault();
    }
}

@Directive({
    selector: '[pCancelEditableRow]',
    host: {
        class: 'p-element'
    }
})
export class CancelEditableRow {
    constructor(public dt: Table, public editableRow: EditableRow) {}

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        this.dt.cancelRowEdit(this.editableRow.data);
        event.preventDefault();
    }
}

@Component({
    selector: 'p-cellEditor',
    template: `
        <ng-container *ngIf="editing">
            <ng-container *ngTemplateOutlet="inputTemplate"></ng-container>
        </ng-container>
        <ng-container *ngIf="!editing">
            <ng-container *ngTemplateOutlet="outputTemplate"></ng-container>
        </ng-container>
    `,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    }
})
export class CellEditor implements AfterContentInit {
    @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<PrimeTemplate>>;

    inputTemplate: Nullable<TemplateRef<any>>;

    outputTemplate: Nullable<TemplateRef<any>>;

    constructor(public dt: Table, @Optional() public editableColumn: EditableColumn, @Optional() public editableRow: EditableRow) {}

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

    get editing(): boolean {
        return (this.dt.editingCell && this.editableColumn && this.dt.editingCell === this.editableColumn.el.nativeElement) || (this.editableRow && this.dt.editMode === 'row' && this.dt.isRowEditing(this.editableRow.data));
    }
}

@Component({
    selector: 'p-tableRadioButton',
    template: `
        <div class="p-radiobutton p-component" [ngClass]="{ 'p-radiobutton-focused': focused, 'p-radiobutton-checked': checked, 'p-radiobutton-disabled': disabled }" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input #rb type="radio" [attr.id]="inputId" [attr.name]="name" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()" [disabled]="disabled" [attr.aria-label]="ariaLabel" />
            </div>
            <div #box [ngClass]="{ 'p-radiobutton-box p-component': true, 'p-highlight': checked, 'p-focus': focused, 'p-disabled': disabled }" role="radio" [attr.aria-checked]="checked">
                <div class="p-radiobutton-icon"></div>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    }
})
export class TableRadioButton {
    @Input() disabled: boolean | undefined;

    @Input() value: any;

    @Input() index: number | undefined;

    @Input() inputId: string | undefined;

    @Input() name: string | undefined;

    @Input() ariaLabel: string | undefined;

    @ViewChild('rb') inputViewChild: Nullable<ElementRef>;

    checked: boolean | undefined;

    focused: boolean | undefined;

    subscription: Subscription;

    constructor(public dt: Table, public cd: ChangeDetectorRef) {
        this.subscription = this.dt.tableService.selectionSource$.subscribe(() => {
            this.checked = this.dt.isSelected(this.value);
            this.cd.markForCheck();
        });
    }

    ngOnInit() {
        this.checked = this.dt.isSelected(this.value);
    }

    onClick(event: Event) {
        if (!this.disabled) {
            this.dt.toggleRowWithRadio(
                {
                    originalEvent: event,
                    rowIndex: this.index
                },
                this.value
            );

            this.inputViewChild?.nativeElement?.focus();
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
    selector: 'p-tableCheckbox',
    template: `
        <div class="p-checkbox p-component" [ngClass]="{ 'p-checkbox-focused': focused, 'p-checkbox-disabled': disabled }" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input type="checkbox" [attr.id]="inputId" [attr.name]="name" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()" [disabled]="disabled" [attr.required]="required" [attr.aria-label]="ariaLabel" />
            </div>
            <div #box [ngClass]="{ 'p-checkbox-box p-component': true, 'p-highlight': checked, 'p-focus': focused, 'p-disabled': disabled }" role="checkbox" [attr.aria-checked]="checked">
                <ng-container *ngIf="!dt.checkboxIconTemplate">
                    <CheckIcon [styleClass]="'p-checkbox-icon'" *ngIf="checked" />
                </ng-container>
                <span *ngIf="dt.checkboxIconTemplate">
                    <ng-template *ngTemplateOutlet="dt.checkboxIconTemplate; context: { $implicit: checked }"></ng-template>
                </span>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    }
})
export class TableCheckbox {
    @Input() disabled: boolean | undefined;

    @Input() value: any;

    @Input() index: number | undefined;

    @Input() inputId: string | undefined;

    @Input() name: string | undefined;

    @Input() required: boolean | undefined;

    @Input() ariaLabel: string | undefined;

    checked: boolean | undefined;

    focused: boolean | undefined;

    subscription: Subscription;

    constructor(public dt: Table, public tableService: TableService, public cd: ChangeDetectorRef) {
        this.subscription = this.dt.tableService.selectionSource$.subscribe(() => {
            this.checked = this.dt.isSelected(this.value);
            this.cd.markForCheck();
        });
    }

    ngOnInit() {
        this.checked = this.dt.isSelected(this.value);
    }

    onClick(event: Event) {
        if (!this.disabled) {
            this.dt.toggleRowWithCheckbox(
                {
                    originalEvent: event,
                    rowIndex: this.index
                },
                this.value
            );
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
    selector: 'p-tableHeaderCheckbox',
    template: `
        <div class="p-checkbox p-component" [ngClass]="{ 'p-checkbox-focused': focused, 'p-checkbox-disabled': isDisabled() }" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input #cb type="checkbox" [attr.id]="inputId" [attr.name]="name" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()" [disabled]="isDisabled()" [attr.aria-label]="ariaLabel" />
            </div>
            <div #box [ngClass]="{ 'p-checkbox-box': true, 'p-highlight': checked, 'p-focus': focused, 'p-disabled': isDisabled() }" role="checkbox" [attr.aria-checked]="checked">
                <ng-container *ngIf="!dt.headerCheckboxIconTemplate">
                    <CheckIcon *ngIf="checked" [styleClass]="'p-checkbox-icon'" />
                </ng-container>
                <span class="p-checkbox-icon" *ngIf="dt.headerCheckboxIconTemplate">
                    <ng-template *ngTemplateOutlet="dt.headerCheckboxIconTemplate; context: { $implicit: checked }"></ng-template>
                </span>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    }
})
export class TableHeaderCheckbox {
    @Input() disabled: boolean | undefined;

    @Input() inputId: string | undefined;

    @Input() name: string | undefined;

    @Input() ariaLabel: string | undefined;

    checked: boolean | undefined;

    focused: boolean | undefined;

    selectionChangeSubscription: Subscription;

    valueChangeSubscription: Subscription;

    constructor(public dt: Table, public tableService: TableService, public cd: ChangeDetectorRef) {
        this.valueChangeSubscription = this.dt.tableService.valueSource$.subscribe(() => {
            this.checked = this.updateCheckedState();
        });

        this.selectionChangeSubscription = this.dt.tableService.selectionSource$.subscribe(() => {
            this.checked = this.updateCheckedState();
        });
    }

    ngOnInit() {
        this.checked = this.updateCheckedState();
    }

    onClick(event: Event) {
        if (!this.disabled) {
            if (this.dt.value && this.dt.value.length > 0) {
                this.dt.toggleRowsWithCheckbox(event, !this.checked);
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

    isDisabled() {
        return this.disabled || !this.dt.value || !this.dt.value.length;
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

        if (this.dt._selectAll !== null) {
            return this.dt._selectAll;
        } else {
            const data = this.dt.selectionPageOnly ? this.dt.dataToRender(this.dt.processedData) : this.dt.processedData;
            const val = this.dt.frozenValue ? [...this.dt.frozenValue, ...data] : data;
            const selectableVal = this.dt.rowSelectable ? val.filter((data: any, index: number) => this.dt.rowSelectable({ data, index })) : val;

            return ObjectUtils.isNotEmpty(selectableVal) && ObjectUtils.isNotEmpty(this.dt.selection) && selectableVal.every((v: any) => this.dt.selection.some((s: any) => this.dt.equals(v, s)));
        }
    }
}

@Directive({
    selector: '[pReorderableRowHandle]',
    host: {
        class: 'p-element'
    }
})
export class ReorderableRowHandle implements AfterViewInit {
    constructor(public el: ElementRef) {}

    ngAfterViewInit() {
        DomHandler.addClass(this.el.nativeElement, 'p-datatable-reorderablerow-handle');
    }
}

@Directive({
    selector: '[pReorderableRow]',
    host: {
        class: 'p-element'
    }
})
export class ReorderableRow implements AfterViewInit {
    @Input('pReorderableRow') index: number | undefined;

    @Input() pReorderableRowDisabled: boolean | undefined;

    mouseDownListener: VoidListener;

    dragStartListener: VoidListener;

    dragEndListener: VoidListener;

    dragOverListener: VoidListener;

    dragLeaveListener: VoidListener;

    dropListener: VoidListener;

    constructor(private renderer: Renderer2, public dt: Table, public el: ElementRef, public zone: NgZone) {}

    ngAfterViewInit() {
        if (this.isEnabled()) {
            this.el.nativeElement.droppable = true;
            this.bindEvents();
        }
    }

    bindEvents() {
        this.zone.runOutsideAngular(() => {
            this.mouseDownListener = this.renderer.listen(this.el.nativeElement, 'mousedown', this.onMouseDown.bind(this));

            this.dragStartListener = this.renderer.listen(this.el.nativeElement, 'dragstart', this.onDragStart.bind(this));

            this.dragEndListener = this.renderer.listen(this.el.nativeElement, 'dragend', this.onDragEnd.bind(this));

            this.dragOverListener = this.renderer.listen(this.el.nativeElement, 'dragover', this.onDragOver.bind(this));

            this.dragLeaveListener = this.renderer.listen(this.el.nativeElement, 'dragleave', this.onDragLeave.bind(this));
        });
    }

    unbindEvents() {
        if (this.mouseDownListener) {
            this.mouseDownListener();
            this.mouseDownListener = null;
        }

        if (this.dragStartListener) {
            this.dragStartListener();
            this.dragStartListener = null;
        }

        if (this.dragEndListener) {
            this.dragEndListener();
            this.dragEndListener = null;
        }

        if (this.dragOverListener) {
            this.dragOverListener();
            this.dragOverListener = null;
        }

        if (this.dragLeaveListener) {
            this.dragLeaveListener();
            this.dragLeaveListener = null;
        }
    }

    onMouseDown(event: Event) {
        if (DomHandler.hasClass(event.target, 'p-datatable-reorderablerow-handle')) this.el.nativeElement.draggable = true;
        else this.el.nativeElement.draggable = false;
    }

    onDragStart(event: DragEvent) {
        this.dt.onRowDragStart(event, <number>this.index);
    }

    onDragEnd(event: DragEvent) {
        this.dt.onRowDragEnd(event);
        this.el.nativeElement.draggable = false;
    }

    onDragOver(event: DragEvent) {
        this.dt.onRowDragOver(event, <number>this.index, this.el.nativeElement);
        event.preventDefault();
    }

    onDragLeave(event: DragEvent) {
        this.dt.onRowDragLeave(event, this.el.nativeElement);
    }

    isEnabled() {
        return this.pReorderableRowDisabled !== true;
    }

    @HostListener('drop', ['$event'])
    onDrop(event: DragEvent) {
        if (this.isEnabled() && this.dt.rowDragging) {
            this.dt.onRowDrop(event, this.el.nativeElement);
        }

        event.preventDefault();
    }

    ngOnDestroy() {
        this.unbindEvents();
    }
}

@Component({
    selector: 'p-columnFilter',
    template: `
        <div class="p-column-filter" [ngClass]="{ 'p-column-filter-row': display === 'row', 'p-column-filter-menu': display === 'menu' }">
            <p-columnFilterFormElement
                *ngIf="display === 'row'"
                class="p-fluid"
                [type]="type"
                [field]="field"
                [filterConstraint]="dt.filters[field]"
                [filterTemplate]="filterTemplate"
                [placeholder]="placeholder"
                [minFractionDigits]="minFractionDigits"
                [maxFractionDigits]="maxFractionDigits"
                [prefix]="prefix"
                [suffix]="suffix"
                [locale]="locale"
                [localeMatcher]="localeMatcher"
                [currency]="currency"
                [currencyDisplay]="currencyDisplay"
                [useGrouping]="useGrouping"
                [showButtons]="showButtons"
            ></p-columnFilterFormElement>
            <button
                #icon
                *ngIf="showMenuButton"
                type="button"
                class="p-column-filter-menu-button p-link"
                aria-haspopup="true"
                [attr.aria-expanded]="overlayVisible"
                [ngClass]="{ 'p-column-filter-menu-button-open': overlayVisible, 'p-column-filter-menu-button-active': hasFilter() }"
                (click)="toggleMenu($event)"
                (keydown)="onToggleButtonKeyDown($event)"
            >
                <FilterIcon [styleClass]="'pi-filter-icon'" *ngIf="!filterIconTemplate" />
                <span class="pi-filter-icon" *ngIf="filterIconTemplate">
                    <ng-template *ngTemplateOutlet="filterIconTemplate"></ng-template>
                </span>
            </button>
            <button #icon *ngIf="showClearButton && display === 'row'" [ngClass]="{ 'p-hidden-space': !hasRowFilter() }" type="button" class="p-column-filter-clear-button p-link" (click)="clearFilter()">
                <FilterSlashIcon *ngIf="!clearIconTemplate" />
                <ng-template *ngTemplateOutlet="clearFilterIcon"></ng-template>
            </button>
            <div
                *ngIf="showMenu && overlayVisible"
                [ngClass]="{ 'p-column-filter-overlay p-component p-fluid': true, 'p-column-filter-overlay-menu': display === 'menu' }"
                (click)="onContentClick()"
                [@overlayAnimation]="'visible'"
                (@overlayAnimation.start)="onOverlayAnimationStart($event)"
                (@overlayAnimation.done)="onOverlayAnimationEnd($event)"
                (keydown.escape)="onEscape()"
            >
                <ng-container *ngTemplateOutlet="headerTemplate; context: { $implicit: field }"></ng-container>
                <ul *ngIf="display === 'row'; else menu" class="p-column-filter-row-items">
                    <li
                        class="p-column-filter-row-item"
                        *ngFor="let matchMode of matchModes; let i = index"
                        (click)="onRowMatchModeChange(matchMode.value)"
                        (keydown)="onRowMatchModeKeyDown($event)"
                        (keydown.enter)="this.onRowMatchModeChange(matchMode.value)"
                        [ngClass]="{ 'p-highlight': isRowMatchModeSelected(matchMode.value) }"
                        [attr.tabindex]="i === 0 ? '0' : null"
                    >
                        {{ matchMode.label }}
                    </li>
                    <li class="p-column-filter-separator"></li>
                    <li class="p-column-filter-row-item" (click)="onRowClearItemClick()" (keydown)="onRowMatchModeKeyDown($event)" (keydown.enter)="onRowClearItemClick()">{{ noFilterLabel }}</li>
                </ul>
                <ng-template #menu>
                    <div class="p-column-filter-operator" *ngIf="isShowOperator">
                        <p-dropdown [options]="operatorOptions" [ngModel]="operator" (ngModelChange)="onOperatorChange($event)" styleClass="p-column-filter-operator-dropdown"></p-dropdown>
                    </div>
                    <div class="p-column-filter-constraints">
                        <div *ngFor="let fieldConstraint of fieldConstraints; let i = index" class="p-column-filter-constraint">
                            <p-dropdown
                                *ngIf="showMatchModes && matchModes"
                                [options]="matchModes"
                                [ngModel]="fieldConstraint.matchMode"
                                (ngModelChange)="onMenuMatchModeChange($event, fieldConstraint)"
                                styleClass="p-column-filter-matchmode-dropdown"
                            ></p-dropdown>
                            <p-columnFilterFormElement
                                [type]="type"
                                [field]="field"
                                [filterConstraint]="fieldConstraint"
                                [filterTemplate]="filterTemplate"
                                [placeholder]="placeholder"
                                [minFractionDigits]="minFractionDigits"
                                [maxFractionDigits]="maxFractionDigits"
                                [prefix]="prefix"
                                [suffix]="suffix"
                                [locale]="locale"
                                [localeMatcher]="localeMatcher"
                                [currency]="currency"
                                [currencyDisplay]="currencyDisplay"
                                [useGrouping]="useGrouping"
                            ></p-columnFilterFormElement>
                            <div>
                                <button *ngIf="showRemoveIcon" type="button" pButton class="p-column-filter-remove-button p-button-text p-button-danger p-button-sm" (click)="removeConstraint(fieldConstraint)" pRipple [label]="removeRuleButtonLabel">
                                    <TrashIcon *ngIf="!removeRuleIconTemplate" />
                                    <ng-template *ngTemplateOutlet="removeRuleIconTemplate"></ng-template>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="p-column-filter-add-rule" *ngIf="isShowAddConstraint">
                        <button type="button" pButton [label]="addRuleButtonLabel" class="p-column-filter-add-button p-button-text p-button-sm" (click)="addConstraint()" pRipple>
                            <PlusIcon *ngIf="!addRuleIconTemplate" />
                            <ng-template *ngTemplateOutlet="addRuleIconTemplate"></ng-template>
                        </button>
                    </div>
                    <div class="p-column-filter-buttonbar">
                        <button *ngIf="showClearButton" type="button" pButton class="p-button-outlined p-button-sm" (click)="clearFilter()" [label]="clearButtonLabel" pRipple></button>
                        <button *ngIf="showApplyButton" type="button" pButton (click)="applyFilter()" class="p-button-sm" [label]="applyButtonLabel" pRipple></button>
                    </div>
                </ng-template>
                <ng-container *ngTemplateOutlet="footerTemplate; context: { $implicit: field }"></ng-container>
            </div>
        </div>
    `,
    animations: [trigger('overlayAnimation', [transition(':enter', [style({ opacity: 0, transform: 'scaleY(0.8)' }), animate('.12s cubic-bezier(0, 0, 0.2, 1)')]), transition(':leave', [animate('.1s linear', style({ opacity: 0 }))])])],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    }
})
export class ColumnFilter implements AfterContentInit {
    @Input() field: string | undefined;

    @Input() type: string = 'text';

    @Input() display: string = 'row';

    @Input() showMenu: boolean = true;

    @Input() matchMode: string | undefined;

    @Input() operator: string = FilterOperator.AND;

    @Input() showOperator: boolean = true;

    @Input() showClearButton: boolean = true;

    @Input() showApplyButton: boolean = true;

    @Input() showMatchModes: boolean = true;

    @Input() showAddButton: boolean = true;

    @Input() hideOnClear: boolean = false;

    @Input() placeholder: string | undefined;

    @Input() matchModeOptions: SelectItem[] | undefined;

    @Input() maxConstraints: number = 2;

    @Input() minFractionDigits: number | undefined;

    @Input() maxFractionDigits: number | undefined;

    @Input() prefix: string | undefined;

    @Input() suffix: string | undefined;

    @Input() locale: string | undefined;

    @Input() localeMatcher: string | undefined;

    @Input() currency: string | undefined;

    @Input() currencyDisplay: string | undefined;

    @Input() useGrouping: boolean = true;

    @Input() showButtons: boolean = true;

    @ViewChild('icon') icon: Nullable<ElementRef>;

    @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<any>>;

    overlaySubscription: Subscription | undefined;

    headerTemplate: Nullable<TemplateRef<any>>;

    filterTemplate: Nullable<TemplateRef<any>>;

    footerTemplate: Nullable<TemplateRef<any>>;

    filterIconTemplate: Nullable<TemplateRef<any>>;

    removeRuleIconTemplate: Nullable<TemplateRef<any>>;

    addRuleIconTemplate: Nullable<TemplateRef<any>>;

    operatorOptions: any[] | undefined;

    overlayVisible: boolean | undefined;

    overlay: HTMLElement | undefined | null;

    scrollHandler: ConnectedOverlayScrollHandler | null | undefined;

    documentClickListener: VoidListener;

    documentResizeListener: VoidListener;

    matchModes: SelectItem[] | undefined;

    translationSubscription: Subscription | undefined;

    resetSubscription: Subscription | undefined;

    selfClick: boolean | undefined;

    overlayEventListener: any;

    private window: Window;

    constructor(@Inject(DOCUMENT) private document: Document, public el: ElementRef, public dt: Table, public renderer: Renderer2, public config: PrimeNGConfig, public overlayService: OverlayService) {
        this.window = this.document.defaultView as Window;
    }

    ngOnInit() {
        if (!this.dt.filters[<string>this.field]) {
            this.initFieldFilterConstraint();
        }

        this.translationSubscription = this.config.translationObserver.subscribe(() => {
            this.generateMatchModeOptions();
            this.generateOperatorOptions();
        });

        this.generateMatchModeOptions();
        this.generateOperatorOptions();
    }

    generateMatchModeOptions() {
        this.matchModes =
            this.matchModeOptions ||
            (this.config as any).filterMatchModeOptions[this.type]?.map((key: any) => {
                return { label: this.config.getTranslation(key), value: key };
            });
    }

    generateOperatorOptions() {
        this.operatorOptions = [
            { label: this.config.getTranslation(TranslationKeys.MATCH_ALL), value: FilterOperator.AND },
            { label: this.config.getTranslation(TranslationKeys.MATCH_ANY), value: FilterOperator.OR }
        ];
    }

    ngAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;

                case 'filter':
                    this.filterTemplate = item.template;
                    break;

                case 'footer':
                    this.footerTemplate = item.template;
                    break;

                case 'filtericon':
                    this.filterIconTemplate = item.template;
                    break;

                case 'removeruleicon':
                    this.removeRuleIconTemplate = item.template;
                    break;

                case 'addruleicon':
                    this.addRuleIconTemplate = item.template;
                    break;

                default:
                    this.filterTemplate = item.template;
                    break;
            }
        });
    }

    initFieldFilterConstraint() {
        let defaultMatchMode = this.getDefaultMatchMode();
        this.dt.filters[<string>this.field] = this.display == 'row' ? { value: null, matchMode: defaultMatchMode } : [{ value: null, matchMode: defaultMatchMode, operator: this.operator }];
    }

    onMenuMatchModeChange(value: any, filterMeta: FilterMetadata) {
        filterMeta.matchMode = value;

        if (!this.showApplyButton) {
            this.dt._filter();
        }
    }

    onRowMatchModeChange(matchMode: string) {
        (<FilterMetadata>this.dt.filters[<string>this.field]).matchMode = matchMode;
        this.dt._filter();
        this.hide();
    }

    onRowMatchModeKeyDown(event: KeyboardEvent) {
        let item = <HTMLLIElement>event.target;

        switch (event.key) {
            case 'ArrowDown':
                var nextItem = this.findNextItem(item);
                if (nextItem) {
                    item.removeAttribute('tabindex');
                    nextItem.tabIndex = '0';
                    nextItem.focus();
                }

                event.preventDefault();
                break;

            case 'ArrowUp':
                var prevItem = this.findPrevItem(item);
                if (prevItem) {
                    item.removeAttribute('tabindex');
                    prevItem.tabIndex = '0';
                    prevItem.focus();
                }

                event.preventDefault();
                break;
        }
    }

    onRowClearItemClick() {
        this.clearFilter();
        this.hide();
    }

    isRowMatchModeSelected(matchMode: string) {
        return (<FilterMetadata>this.dt.filters[<string>this.field]).matchMode === matchMode;
    }

    addConstraint() {
        (<FilterMetadata[]>this.dt.filters[<string>this.field]).push({ value: null, matchMode: this.getDefaultMatchMode(), operator: this.getDefaultOperator() });
    }

    removeConstraint(filterMeta: FilterMetadata) {
        this.dt.filters[<string>this.field] = (<FilterMetadata[]>this.dt.filters[<string>this.field]).filter((meta) => meta !== filterMeta);
        this.dt._filter();
    }

    onOperatorChange(value: any) {
        (<FilterMetadata[]>this.dt.filters[<string>this.field]).forEach((filterMeta) => {
            filterMeta.operator = value;
            this.operator = value;
        });

        if (!this.showApplyButton) {
            this.dt._filter();
        }
    }

    toggleMenu(event : any) {
        this.overlayVisible = !this.overlayVisible;
        event.stopPropagation();
    }

    onToggleButtonKeyDown(event: KeyboardEvent) {
        switch (event.key) {
            case 'Escape':
            case 'Tab':
                this.overlayVisible = false;
                break;

            case 'ArrowDown':
                if (this.overlayVisible) {
                    let focusable = DomHandler.getFocusableElements(<HTMLElement>this.overlay);
                    if (focusable) {
                        focusable[0].focus();
                    }
                    event.preventDefault();
                } else if (event.altKey) {
                    this.overlayVisible = true;
                    event.preventDefault();
                }
                break;
        }
    }

    onEscape() {
        this.overlayVisible = false;
        this.icon?.nativeElement.focus();
    }

    findNextItem(item: HTMLLIElement): any {
        let nextItem = <HTMLLIElement>item.nextElementSibling;

        if (nextItem) return DomHandler.hasClass(nextItem, 'p-column-filter-separator') ? this.findNextItem(nextItem) : nextItem;
        else return item.parentElement?.firstElementChild;
    }

    findPrevItem(item: HTMLLIElement): any {
        let prevItem = <HTMLLIElement>item.previousElementSibling;

        if (prevItem) return DomHandler.hasClass(prevItem, 'p-column-filter-separator') ? this.findPrevItem(prevItem) : prevItem;
        else return item.parentElement?.lastElementChild;
    }

    onContentClick() {
        this.selfClick = true;
    }

    onOverlayAnimationStart(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
                this.overlay = event.element;
                this.renderer.appendChild(this.document.body, this.overlay);
                ZIndexUtils.set('overlay', this.overlay, this.config.zIndex.overlay);
                DomHandler.absolutePosition(this.overlay, this.icon?.nativeElement);
                this.bindDocumentClickListener();
                this.bindDocumentResizeListener();
                this.bindScrollListener();

                this.overlayEventListener = (e: any) => {
                    if (this.overlay && this.overlay.contains(e.target)) {
                        this.selfClick = true;
                    }
                };

                this.overlaySubscription = this.overlayService.clickObservable.subscribe(this.overlayEventListener);
                break;

            case 'void':
                this.onOverlayHide();

                if (this.overlaySubscription) {
                    this.overlaySubscription.unsubscribe();
                }
                break;
        }
    }

    onOverlayAnimationEnd(event: AnimationEvent) {
        switch (event.toState) {
            case 'void':
                ZIndexUtils.clear(event.element);
                break;
        }
    }

    getDefaultMatchMode(): string {
        if (this.matchMode) {
            return this.matchMode;
        } else {
            if (this.type === 'text') return FilterMatchMode.STARTS_WITH;
            else if (this.type === 'numeric') return FilterMatchMode.EQUALS;
            else if (this.type === 'date') return FilterMatchMode.DATE_IS;
            else return FilterMatchMode.CONTAINS;
        }
    }

    getDefaultOperator(): string | undefined {
        return this.dt.filters ? (<FilterMetadata[]>this.dt.filters[<string>(<string>this.field)])[0].operator : this.operator;
    }

    hasRowFilter() {
        return this.dt.filters[<string>this.field] && !this.dt.isFilterBlank((<FilterMetadata>this.dt.filters[<string>this.field]).value);
    }

    get fieldConstraints(): FilterMetadata[] | undefined | null {
        return this.dt.filters ? <FilterMetadata[]>this.dt.filters[<string>this.field] : null;
    }

    get showRemoveIcon(): boolean {
        return this.fieldConstraints ? this.fieldConstraints.length > 1 : false;
    }

    get showMenuButton(): boolean {
        return this.showMenu && (this.display === 'row' ? this.type !== 'boolean' : true);
    }

    get isShowOperator(): boolean {
        return this.showOperator && this.type !== 'boolean';
    }

    get isShowAddConstraint(): boolean | undefined | null {
        return this.showAddButton && this.type !== 'boolean' && this.fieldConstraints && this.fieldConstraints.length < this.maxConstraints;
    }

    get applyButtonLabel(): string {
        return this.config.getTranslation(TranslationKeys.APPLY);
    }

    get clearButtonLabel(): string {
        return this.config.getTranslation(TranslationKeys.CLEAR);
    }

    get addRuleButtonLabel(): string {
        return this.config.getTranslation(TranslationKeys.ADD_RULE);
    }

    get removeRuleButtonLabel(): string {
        return this.config.getTranslation(TranslationKeys.REMOVE_RULE);
    }

    get noFilterLabel(): string {
        return this.config.getTranslation(TranslationKeys.NO_FILTER);
    }

    hasFilter(): boolean {
        let fieldFilter = this.dt.filters[<string>this.field];
        if (fieldFilter) {
            if (Array.isArray(fieldFilter)) return !this.dt.isFilterBlank((<FilterMetadata[]>fieldFilter)[0].value);
            else return !this.dt.isFilterBlank(fieldFilter.value);
        }

        return false;
    }

    isOutsideClicked(event: any): boolean {
        return !(
            this.overlay?.isSameNode(event.target) ||
            this.overlay?.contains(event.target) ||
            this.icon?.nativeElement.isSameNode(event.target) ||
            this.icon?.nativeElement.contains(event.target) ||
            DomHandler.hasClass(event.target, 'p-column-filter-add-button') ||
            DomHandler.hasClass(event.target.parentElement, 'p-column-filter-add-button') ||
            DomHandler.hasClass(event.target, 'p-column-filter-remove-button') ||
            DomHandler.hasClass(event.target.parentElement, 'p-column-filter-remove-button')
        );
    }

    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

            this.documentClickListener = this.renderer.listen(documentTarget, 'click', (event) => {
                if (this.overlayVisible && !this.selfClick && this.isOutsideClicked(event)) {
                    this.hide();
                }

                this.selfClick = false;
            });
        }
    }

    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
            this.selfClick = false;
        }
    }

    bindDocumentResizeListener() {
        if (!this.documentResizeListener) {
            this.documentResizeListener = this.renderer.listen(this.window, 'resize', (event) => {
                if (this.overlayVisible && !DomHandler.isTouchDevice()) {
                    this.hide();
                }
            });
        }
    }

    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            this.documentResizeListener();
            this.documentResizeListener = null;
        }
    }

    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.icon?.nativeElement, () => {
                if (this.overlayVisible) {
                    this.hide();
                }
            });
        }

        this.scrollHandler.bindScrollListener();
    }

    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }

    hide() {
        this.overlayVisible = false;
    }

    onOverlayHide() {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
        this.overlay = null;
    }

    clearFilter() {
        this.initFieldFilterConstraint();
        this.dt._filter();
        if (this.hideOnClear) this.hide();
    }

    applyFilter() {
        this.dt._filter();
        this.hide();
    }

    ngOnDestroy() {
        if (this.overlay) {
            this.renderer.appendChild(this.el.nativeElement, this.overlay);
            ZIndexUtils.clear(this.overlay);
            this.onOverlayHide();
        }

        if (this.translationSubscription) {
            this.translationSubscription.unsubscribe();
        }

        if (this.resetSubscription) {
            this.resetSubscription.unsubscribe();
        }

        if (this.overlaySubscription) {
            this.overlaySubscription.unsubscribe();
        }
    }
}

@Component({
    selector: 'p-columnFilterFormElement',
    template: `
        <ng-container *ngIf="filterTemplate; else builtInElement">
            <ng-container
                *ngTemplateOutlet="
                    filterTemplate;
                    context: {
                        $implicit: filterConstraint.value,
                        filterCallback: filterCallback,
                        type: type,
                        field: field,
                        filterConstraint: filterConstraint,
                        placeholder: placeholder,
                        minFractionDigits: minFractionDigits,
                        maxFractionDigits: maxFractionDigits,
                        prefix: prefix,
                        suffix: suffix,
                        locale: locale,
                        localeMatcher: localeMatcher,
                        currency: currency,
                        currencyDisplay: currencyDisplay,
                        useGrouping: useGrouping,
                        showButtons: showButtons
                    }
                "
            ></ng-container>
        </ng-container>
        <ng-template #builtInElement>
            <ng-container [ngSwitch]="type">
                <input *ngSwitchCase="'text'" type="text" pInputText [value]="filterConstraint?.value" (input)="onModelChange($event.target.value)" (keydown.enter)="onTextInputEnterKeyDown($event)" [attr.placeholder]="placeholder" />
                <p-inputNumber
                    *ngSwitchCase="'numeric'"
                    [ngModel]="filterConstraint?.value"
                    (ngModelChange)="onModelChange($event)"
                    (onKeyDown)="onNumericInputKeyDown($event)"
                    [showButtons]="showButtons"
                    [minFractionDigits]="minFractionDigits"
                    [maxFractionDigits]="maxFractionDigits"
                    [prefix]="prefix"
                    [suffix]="suffix"
                    [placeholder]="placeholder"
                    [mode]="currency ? 'currency' : 'decimal'"
                    [locale]="locale"
                    [localeMatcher]="localeMatcher"
                    [currency]="currency"
                    [currencyDisplay]="currencyDisplay"
                    [useGrouping]="useGrouping"
                ></p-inputNumber>
                <p-triStateCheckbox *ngSwitchCase="'boolean'" [ngModel]="filterConstraint?.value" (ngModelChange)="onModelChange($event)"></p-triStateCheckbox>
                <p-calendar *ngSwitchCase="'date'" [placeholder]="placeholder" [ngModel]="filterConstraint?.value" (ngModelChange)="onModelChange($event)"></p-calendar>
            </ng-container>
        </ng-template>
    `,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    }
})
export class ColumnFilterFormElement implements OnInit {
    @Input() field: string | undefined;

    @Input() type: string | undefined;

    @Input() filterConstraint: FilterMetadata | undefined;

    @Input() filterTemplate: Nullable<TemplateRef<any>>;

    @Input() placeholder: string | undefined;

    @Input() minFractionDigits: number | undefined;

    @Input() maxFractionDigits: number | undefined;

    @Input() prefix: string | undefined;

    @Input() suffix: string | undefined;

    @Input() locale: string | undefined;

    @Input() localeMatcher: string | undefined;

    @Input() currency: string | undefined;

    @Input() currencyDisplay: string | undefined;

    @Input() useGrouping: boolean = true;

    get showButtons(): boolean {
        return this.colFilter.showButtons;
    }

    filterCallback: any;

    constructor(public dt: Table, private colFilter: ColumnFilter) {}

    ngOnInit() {
        this.filterCallback = (value: any) => {
            (<any>this.filterConstraint).value = value;
            this.dt._filter();
        };
    }

    onModelChange(value: any) {
        (<any>this.filterConstraint).value = value;

        if (this.type === 'boolean' || value === '') {
            this.dt._filter();
        }
    }

    onTextInputEnterKeyDown(event: KeyboardEvent) {
        this.dt._filter();
        event.preventDefault();
    }

    onNumericInputKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.dt._filter();
            event.preventDefault();
        }
    }
}

@NgModule({
    imports: [
        CommonModule,
        PaginatorModule,
        InputTextModule,
        DropdownModule,
        FormsModule,
        ButtonModule,
        SelectButtonModule,
        CalendarModule,
        InputNumberModule,
        TriStateCheckboxModule,
        ScrollerModule,
        ArrowDownIcon,
        ArrowUpIcon,
        SpinnerIcon,
        SortAltIcon,
        SortAmountUpAltIcon,
        SortAmountDownIcon,
        CheckIcon,
        FilterIcon,
        FilterSlashIcon
    ],
    exports: [
        Table,
        SharedModule,
        SortableColumn,
        FrozenColumn,
        RowGroupHeader,
        SelectableRow,
        RowToggler,
        ContextMenuRow,
        ResizableColumn,
        ReorderableColumn,
        EditableColumn,
        CellEditor,
        SortIcon,
        TableRadioButton,
        TableCheckbox,
        TableHeaderCheckbox,
        ReorderableRowHandle,
        ReorderableRow,
        SelectableRowDblClick,
        EditableRow,
        InitEditableRow,
        SaveEditableRow,
        CancelEditableRow,
        ColumnFilter,
        ColumnFilterFormElement,
        ScrollerModule
    ],
    declarations: [
        Table,
        SortableColumn,
        FrozenColumn,
        RowGroupHeader,
        SelectableRow,
        RowToggler,
        ContextMenuRow,
        ResizableColumn,
        ReorderableColumn,
        EditableColumn,
        CellEditor,
        TableBody,
        SortIcon,
        TableRadioButton,
        TableCheckbox,
        TableHeaderCheckbox,
        ReorderableRowHandle,
        ReorderableRow,
        SelectableRowDblClick,
        EditableRow,
        InitEditableRow,
        SaveEditableRow,
        CancelEditableRow,
        ColumnFilter,
        ColumnFilterFormElement
    ]
})
export class TableModule {}
