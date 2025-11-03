import { TemplateRef } from '@angular/core';
import type { FilterMetadata, LazyLoadMeta, PassThrough, PassThroughOption, SortMeta, TreeNode, TreeTableNode } from 'primeng/api';
import type { BadgePassThrough } from 'primeng/types/badge';
import type { CheckboxPassThrough } from 'primeng/types/checkbox';
import type { PaginatorPassThrough } from 'primeng/types/paginator';
import type { VirtualScrollerPassThrough } from 'primeng/types/scroller';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link TreeTableProps.pt}
 * @group Interface
 */
export interface TreeTablePassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the loading's DOM element.
     */
    loading?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the mask's DOM element.
     */
    mask?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the loading icon's DOM element.
     */
    loadingIcon?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the header's DOM element.
     */
    header?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the Paginator component.
     * @see {@link PaginatorPassThrough}
     */
    pcPaginator?: PaginatorPassThrough;
    /**
     * Used to pass attributes to the wrapper's DOM element.
     */
    wrapper?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the table's DOM element.
     */
    table?: PassThroughOption<HTMLTableElement, I>;
    /**
     * Used to pass attributes to the thead's DOM element.
     */
    thead?: PassThroughOption<HTMLTableSectionElement, I>;
    /**
     * Used to pass attributes to the tbody's DOM element.
     */
    tbody?: PassThroughOption<HTMLTableSectionElement, I>;
    /**
     * Used to pass attributes to the tfoot's DOM element.
     */
    tfoot?: PassThroughOption<HTMLTableSectionElement, I>;
    /**
     * Used to pass attributes to the footer's DOM element.
     */
    footer?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the scrollable wrapper's DOM element.
     */
    scrollableWrapper?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the scrollable container's DOM element.
     */
    scrollableView?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the scrollable header's DOM element.
     */
    scrollableHeader?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the scrollable header box's DOM element.
     */
    scrollableHeaderBox?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the scrollable header table's DOM element.
     */
    scrollableHeaderTable?: PassThroughOption<HTMLTableElement, I>;
    /**
     * Used to pass attributes to the Scroller component.
     * @see {@link VirtualScrollerPassThrough}
     */
    virtualScroller?: VirtualScrollerPassThrough;
    /**
     * Used to pass attributes to the scrollable body's DOM element.
     */
    scrollableBody?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the scrollable footer's DOM element.
     */
    scrollableFooter?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the scrollable footer box's DOM element.
     */
    scrollableFooterBox?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the scrollable footer table's DOM element.
     */
    scrollableFooterTable?: PassThroughOption<HTMLTableElement, I>;
    /**
     * Used to pass attributes to the column resizer helper's DOM element.
     */
    columnResizerHelper?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the reorder indicator up's DOM element.
     */
    reorderIndicatorUp?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the reorder indicator down's DOM element.
     */
    reorderIndicatorDown?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the sortable column's DOM element.
     */
    sortableColumn?: PassThroughOption<HTMLTableCellElement, I>;
    /**
     * Used to pass attributes to the sortable column icon's DOM element.
     */
    sortableColumnIcon?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the Badge component for sortable column.
     * @see {@link BadgePassThrough}
     */
    pcSortableColumnBadge?: BadgePassThrough;
    /**
     * Used to pass attributes to the row's DOM element.
     */
    row?: PassThroughOption<HTMLTableRowElement, I>;
    /**
     * Used to pass attributes to the Checkbox component for row.
     * @see {@link CheckboxPassThrough}
     */
    pcRowCheckbox?: CheckboxPassThrough;
    /**
     * Used to pass attributes to the Checkbox component for header.
     * @see {@link CheckboxPassThrough}
     */
    pcHeaderCheckbox?: CheckboxPassThrough;
    /**
     * Used to pass attributes to the cell editor's DOM element.
     */
    cellEditor?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the row toggle button's DOM element.
     */
    rowToggleButton?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the toggler's DOM element.
     */
    toggler?: PassThroughOption<HTMLButtonElement, I>;
}

/**
 * Defines valid pass-through options in TreeTable.
 * @see {@link TreeTablePassThroughOptions}
 *
 * @template I Type of instance.
 */
export type TreeTablePassThrough<I = unknown> = PassThrough<I, TreeTablePassThroughOptions<I>>;

/**
 * Paginator state.
 * @group Interface
 */
export interface TreeTablePaginatorState {
    /**
     * Current page.
     */
    page?: number;
    /**
     * Index of the first element.
     */
    first?: number;
    /**
     * Row count.
     */
    rows?: number;
    /**
     * Page count.
     */
    pageCount?: number;
}
/**
 * Custom lazy load event.
 * @see {@link TreeTable.onLazyLoad}
 * @extends {LazyLoadMeta}
 * @group Events
 */
export interface TreeTableLazyLoadEvent extends LazyLoadMeta {
    /**
     * First element in viewport.
     */
    first: any;
    /**
     * Last element in viewport.
     */
    last: any;
}
/**
 * Custom column reorder event.
 * @see {@link TreeTable.onColReorder}
 * @group Events
 */
export interface TreeTableColumnReorderEvent {
    /**
     * Index of the dragged item.
     */
    dragIndex?: number;
    /**
     * Index of the drop position.
     */
    dropIndex?: number;
    /**
     * Columns after reorder.
     */
    columns?: any[];
}
/**
 * Custom filter event.
 * @see {@link TreeTable.onFilter}
 * @group Events
 */
export interface TreeTableFilterEvent {
    /**
     * Filter meta.
     */
    filters?: { [s: string]: FilterMetadata | undefined };
    /**
     * Value after filter.
     */
    filteredValue?: TreeNode[];
}
/**
 * Custom node expand event.
 * @see {@link TreeTable.onNodeExpand}
 * @group Events
 */
export interface TreeTableNodeExpandEvent<T = any> extends TreeTableNodeCollapseEvent<T> {}
/**
 * Custom node collapse event.
 * @see {@link TreeTable.onNodeCollapse}
 * @group Events
 */
export interface TreeTableNodeCollapseEvent<T = any> {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Node instance.
     */
    node: TreeTableNode<T>;
}
/**
 * Custom sort event.
 * @see {@link TreeTable.onSort}
 * @see {@link TreeTable.sortFunction}
 * @group Events
 */
export interface TreeTableSortEvent {
    /**
     * Browser event.
     */
    originalEvent?: Event;
    /**
     * Value to be sorted.
     */
    data?: TreeNode[];
    /**
     * Sort mode.
     */
    mode?: 'single' | 'multiple';
    /**
     * Sort field.
     */
    field?: string;
    /**
     * Sort order.
     */
    order?: number;
    /**
     * Multiple sort meta.
     */
    multiSortMeta?: SortMeta[] | null | undefined;
    /**
     * Multiple sort meta.
     */
    multisortmeta?: any;
    /**
     * Sort meta.
     */
    sortMeta?: SortMeta;
}
/**
 * Custom column resize event.
 * @see {@link TreeTable.onColResize}
 * @group Events
 */
export interface TreeTableColResizeEvent {
    /**
     * Instance of resized column.
     */
    element: HTMLElement;
    /**
     * Position.
     */
    delta: number;
}
/**
 * Custom node select event.
 * @see {@link TreeTable.onNodeSelect}
 * @extends {TreeTableNode}
 * @group Events
 */
export interface TreeTableNodeSelectEvent extends TreeTableNode {}
/**
 * Custom node unselect event.
 * @see {@link TreeTable.onNodeUnSelect}
 * @group Events
 */
export interface TreeTableNodeUnSelectEvent {
    /**
     * Browser event.
     */
    originalEvent?: Event;
    /**
     * Node instance.
     */
    node?: TreeTableNode<any>;
    /**
     * Selection type.
     */
    type?: string;
}
/**
 * Custom context menu select event.
 * @see {@link TreeTable.onContextMenuSelect}
 * @group Events
 */
export interface TreeTableContextMenuSelectEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Node instance.
     */
    node: TreeTableNode<any>;
}
/**
 * Custom checkbox toggle event.
 * @see {@link TreeTable.onHeaderCheckboxToggle}
 * @group Events
 */
export interface TreeTableHeaderCheckboxToggleEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Checked state.
     */
    checked: boolean;
}
/**
 * Custom edit event.
 * @see {@link TreeTable.onEditInit}
 * @see {@link TreeTable.onEditCancel}
 * @see {@link TreeTable.onEditComplete}
 * @group Events
 */
export interface TreeTableEditEvent {
    /**
     * Field to be edited.
     */
    field: string;
    /**
     * New value.
     */
    data: string;
}
/**
 * Filtering options.
 * @group Interface
 */
export interface TreeTableFilterOptions {
    /**
     * Field to be filtered.
     */
    filterField: string;
    /**
     * Value to use when filtering.
     */
    filterValue: any;
    /**
     * Filter constraints.
     */
    filterConstraint: (dataFieldValue: any, filterValue: any, filterLocale: string) => boolean;
    /**
     * Boolean value that defines if strict mode enabled.
     */
    isStrictMode: boolean;
}
/**
 * Defines valid templates in TreeTable.
 * @group Templates
 */
export interface TreeTableTemplates {
    /**
     * Custom caption template.
     */
    caption(): TemplateRef<any>;
    /**
     * Custom header template.
     * @param {Object} context - header data.
     */
    header(context: {
        /**
         * Columns instance.
         */
        $implicit: any[];
    }): TemplateRef<{ $implicit: any[] }>;
    /**
     * Custom body template.
     * @param {Object} context - body data.
     */
    body(context: {
        $implicit: TreeNode;
        /**
         * Serialized node.
         */
        node: TreeNode;
        /**
         * Row data.
         */
        rowData: any;
        /**
         * Columns instance.
         */
        columns: any[];
    }): TemplateRef<{ $implicit: TreeNode; node: TreeNode; rowData: any; columns: any[] }>;
    /**
     * Custom footer template.
     * @param {Object} context - footer data.
     */
    footer(context: {
        /**
         * Columns instance.
         */
        $implicit: any[];
    }): TemplateRef<{ $implicit: any[] }>;
    /**
     * Custom summary template.
     */
    summary(): TemplateRef<any>;
    /**
     * Custom colgroup template.
     * @param {Object} context - column group data.
     */
    colgroup(context: {
        /**
         * Columns instance.
         */
        $implicit: any[];
    }): TemplateRef<{ $implicit: any[] }>;
    /**
     * Custom emptymessage template.
     */
    emptymessage(context: {
        /**
         * Columns instance.
         */
        $implicit: any[];
        /**
         * Boolean value indicates whether column is frozen.
         */
        frozen: boolean;
    }): TemplateRef<{ $implicit: any[]; frozen: boolean }>;
    /**
     * Custom paginator left section template.
     */
    paginatorleft(): TemplateRef<any>;
    /**
     * Custom paginator right section template.
     */
    paginatorright(): TemplateRef<any>;
    /**
     * Custom paginator dropdown template.
     */
    paginatordropdownitem(): TemplateRef<any>;
    /**
     * Custom frozenheader template.
     * @param {Object} context - frozen header data.
     */
    frozenheader(context: {
        /**
         * Columns instance.
         */
        $implicit: any[];
    }): TemplateRef<{ $implicit: any[] }>;
    /**
     * Custom frozenbody template.
     */
    frozenbody(): TemplateRef<any>;
    /**
     * Custom frozenfooter template.
     * @param {Object} context - frozen footer data.
     */
    frozenfooter(context: {
        /**
         * Columns instance.
         */
        $implicit: any[];
    }): TemplateRef<{ $implicit: any[] }>;
    /**
     * Custom frozen column group template.
     * @param {Object} context - group data.
     */
    frozencolgroup(context: {
        /**
         * Columns instance.
         */
        $implicit: any[];
    }): TemplateRef<{ $implicit: any[] }>;
    /**
     * Custom loading icon template.
     */
    loadingicon(): TemplateRef<any>;
    /**
     * Custom reorder indicator up icon template.
     */
    reorderindicatorupicon(): TemplateRef<any>;
    /**
     * Custom reorder indicator down icon template.
     */
    reorderindicatordownicon(): TemplateRef<any>;
    /**
     * Custom sort icon template.
     * @param {Object} context - sort data.
     */
    sorticon(context: {
        /**
         * Sort order.
         */
        $implicit: number;
    }): TemplateRef<{ $implicit: number }>;
    /**
     * Custom checkbox icon template.
     * @param {Object} context - checkbox data.
     */
    checkboxicon(context: {
        /**
         * Checkbox state.
         */
        $implicit: boolean;
        /**
         * Partial selection state of row node.
         */
        partialSelected: boolean;
    }): TemplateRef<{ $implicit: boolean; partialSelected: boolean }>;
    /**
     * Custom header checkbox icon template.
     * @param {Object} context - checkbox data.
     */
    headercheckboxicon(context: {
        /**
         * Checkbox state.
         */
        $implicit: boolean;
    }): TemplateRef<{ $implicit: boolean }>;
    /**
     * Custom toggler icon template.
     * @param {Object} context - toggle icon data.
     */
    togglericon(context: {
        /**
         * Expand state of row node.
         */
        $implicit: boolean;
    }): TemplateRef<{ $implicit: boolean }>;
    /**
     * Custom paginator first page link icon template.
     */
    paginatorfirstpagelinkicon(): TemplateRef<any>;
    /**
     * Custom paginatorlastpagelinkicon template.
     */
    paginatorlastpagelinkicon(): TemplateRef<any>;
    /**
     * Custom paginatorpreviouspagelinkicon template.
     */
    paginatorpreviouspagelinkicon(): TemplateRef<any>;
    /**
     * Custom paginatornextpagelinkicon template.
     */
    paginatornextpagelinkicon(): TemplateRef<any>;
}
