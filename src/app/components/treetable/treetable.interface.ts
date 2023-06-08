import { TemplateRef } from '@angular/core';
import { FilterMetadata, LazyLoadMeta, SortMeta, TreeNode } from 'primeng/api';
import { TreeTable } from './treetable';
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
 * Tree table node element.
 * @extends {TreeNode}
 * @group Interface
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
 * Custom node collapse event.
 * @see {@link TreeTable.onNodeCollapse}
 * @group Events
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
    node?: TreeTableNode;
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
    node: TreeTableNode;
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
 * @group Events
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
