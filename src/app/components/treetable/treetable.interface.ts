import { FilterMetadata, LazyLoadMeta, SortMeta, TreeNode } from 'primeng/api';
/**
 * Paginator state.
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
 * Tree table node element.
 * @extends {TreeNode}
 */
export interface TreeTableNode extends TreeNode {
    /**
     * Browser event.
     */
    originalEvent?: Event;
    /**
     * Row of the node.
     */
    rowNode?: any;
    /**
     * Node instance.
     */
    node?: TreeNode;
    /**
     * Selection type.
     */
    type?: string;
    /**
     * Node index.
     */
    index?: number;
    /**
     * Node level.
     */
    level?: number;
    /**
     * Boolean value indicates if node is in viewport.
     */
    visible?: boolean;
}
/**
 * Custom filter event.
 * @see {@link TreeTable.onFilter}
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
 * Custom node collapse event.
 * @see {@link TreeTable.onNodeCollapse}
 */
export interface TreeTableNodeCollapseEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Node instance.
     */
    node: TreeTableNode;
}
/**
 * Custom sort event.
 * @see {@link TreeTable.onSort}
 * @see {@link TreeTable.sortFunction}
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
 */
export interface TreeTableNodeSelectEvent extends TreeTableNode {}
/**
 * Custom node unselect event.
 * @see {@link TreeTable.onNodeUnSelect}
 */
export interface TreeTableNodeUnSelectEvent {
    /**
     * Browser event.
     */
    originalEvent?: Event;
    /**
     * Node instance.
     */
    node?: TreeTableNode;
    /**
     * Selection type.
     */
    type?: string;
}
/**
 * Custom context menu select event.
 * @see {@link TreeTable.onContextMenuSelect}
 */
export interface TreeTableContextMenuSelectEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Node instance.
     */
    node: TreeTableNode;
}
/**
 * Custom checkbox toggle event.
 * @see {@link TreeTable.onHeaderCheckboxToggle}
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
 */
export interface TreeTableEditEvent{
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
 */
export type TreeTableFilterOptions = {
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
};
  