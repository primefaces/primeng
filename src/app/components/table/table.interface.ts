import { FilterMetadata, LazyLoadMeta, TableState } from 'primeng/api';
import { Table } from './table';
import { TemplateRef } from '@angular/core';
/**
 * Custom select event.
 * @see {@link Table.onRowSelect}
 * @extends {LazyLoadMeta}
 * @group Events
 */
export interface TableRowSelectEvent {
    /**
     * Browser event.
     */
    originalEvent?: Event;
    /**
     * Row data.
     */
    data?: any[];
    /**
     * Selection type.
     */
    type?: string;
    /**
     * Index of the selected row.
     */
    index?: number;
}
/**
 * Custom unselect event.
 * @see {@link Table.onRowUnselect}
 * @extends {TableRowSelectEvent}
 * @group Events
 */
export interface TableRowUnSelectEvent extends TableRowSelectEvent {}
/**
 * Custom page event.
 * @see {@link Table.onPage}
 */
export interface TablePageEvent {
    /**
     * Index of the first element.
     */
    first: number;
    /**
     * Row count.
     */
    rows: number;
}
/**
 * Custom filter event.
 * @see {@link Table.onFilter}
 * @group Events
 */
export interface TableFilterEvent {
    /**
     * Filter meta.
     */
    filters?: { [s: string]: FilterMetadata | undefined };
    /**
     * Value after filter.
     */
    filteredValue?: any[] | any;
}
/**
 * Custom lazy load event.
 * @see {@link Table.onLazyLoad}
 * @extends {LazyLoadMeta}
 * @group Events
 */
export interface TableLazyLoadEvent extends LazyLoadMeta {
    /**
     * First element in viewport.
     */
    first?: number;
    /**
     * Last element in viewport.
     */
    last?: number;
}
/**
 * Custom row expand event.
 * @see {@link Table.onRowExpand}
 * @group Events
 */
export interface TableRowExpandEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Row data.
     */
    data: any;
}
/**
 * Custom row collapse event.
 * @see {@link Table.onRowCollapse}
 * @extends {TableRowExpandEvent}
 * @group Events
 */
export interface TableRowCollapseEvent extends TableRowExpandEvent {}
/**
 * Custom context menu select event.
 * @see {@link Table.onContextMenuSelect}
 * @group Events
 */
export interface TableContextMenuSelectEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Row data.
     */
    data: any;
    /**
     * Row index.
     */
    index: number;
}
/**
 * Custom context menu selection change event.
 * @see {@link Table.contextMenuSelectionChange}
 * @group Events
 */
export interface TableContextMenuSelectionChangeEvent {
    /**
     * Row data.
     */
    data: any;
}
/**
 * Custom column resize event.
 * @see {@link Table.onColResize}
 * @group Events
 */
export interface TableColResizeEvent {
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
 * Custom column reorder event.
 * @see {@link Table.onColReorder}
 * @group Events
 */
export interface TableColumnReorderEvent {
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
 * Custom row reorder event.
 * @see {@link Table.onRowReorder}
 * @group Events
 */
export interface TableRowReorderEvent {
    /**
     * Index of the dragged item.
     */
    dragIndex?: number;
    /**
     * Index of the drop position.
     */
    dropIndex?: number;
}
/**
 * Custom edit event.
 * @group Events
 */
export interface TableEditEvent {
    /**
     * Field to be edited.
     */
    field?: string;
    /**
     * New value.
     */
    data?: any;
}
/**
 * Custom edit init event.
 * @see {@link Table.onEditInit}
 * @group Events
 */
export interface TableEditInitEvent extends TableEditEvent {
    /**
     * Edited element index.
     */
    index: number;
}
/**
 * Custom edit cancel event.
 * @see {@link Table.onEditCancel}
 * @group Events
 */
export interface TableEditCancelEvent extends TableEditEvent {
    /**
     * Browser event.
     */
    originalEvent?: Event;
    /**
     * Edited element index.
     */
    index?: number;
}
/**
 * Custom edit complete event.
 * @see {@link Table.onEditComplete}
 * @group Events
 */
export interface TableEditCompleteEvent extends TableEditCancelEvent {}
/**
 * Custom checkbox toggle event.
 * @see {@link Table.onHeaderCheckboxToggle}
 * @group Events
 */
export interface TableHeaderCheckboxToggleEvent {
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
 * Custom all selection change event.
 * @see {@link Table.selectAllChange}
 * @group Events
 */
export interface TableSelectAllChangeEvent {
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
 * Defines valid templates in Table.
 * @group Templates
 */
export interface TableTemplates {
    /**
     * Custom caption template.
     */
    caption(): TemplateRef<any>;
    /**
     * Custom grouped header template.
     * @param {Object} context - row data.
     */
    headergrouped(context: {
        /**
         * Row data.
         */
        $implicit?: any;
        /**
         * Row index.
         */
        rowIndex?: number;
        /**
         * Columns.
         */
        columns?: any[];
        /**
         * Editing state.
         */
        editing?: boolean;
        /**
         * Frozen state.
         */
        frozen?: boolean;
    }): TemplateRef<any>;
    /**
     * Custom grouped header template.
     * @param {Object} context - header data.
     */
    header(context: {
        /**
         * Field.
         */
        $implicit: string;
    }): TemplateRef<{ $implicit: string }>;
    /**
     * Custom body template.
     * @param {Object} context - body data.
     */
    body(context: {
        /**
         * Columns.
         */
        $implicit: any;
        /**
         * Frozen state.
         */
        frozen: boolean;
    }): TemplateRef<{ $implicit: any; frozen: boolean }>;
    /**
     * Custom loading body template.
     * @param {Object} context - loading body data.
     */
    loadingbody(context: {
        /**
         * Row span.
         */
        rowspan?: number;
        /**
         * Row group.
         */
        rowgroup?: number;
    }): TemplateRef<any>;
    /**
     * Custom footer template.
     * @param {Object} context - footer data.
     */
    footer(context: {
        /**
         * Field.
         */
        $implicit: string;
    }): TemplateRef<{ $implicit: string }>;
    /**
     * Custom footer template.
     * @param {Object} context - footer data.
     */
    footergrouped(context: {
        /**
         * Columns.
         */
        $implicit: any[];
    }): TemplateRef<any[]>;
    /**
     * Custom column group template.
     * @param {Object} context - columns data.
     */
    colgroup(context: {
        /**
         * Columns.
         */
        $implicit: any[];
    }): TemplateRef<any[]>;
    /**
     * Custom summary template.
     */
    summary(): TemplateRef<any>;
    /**
     * Custom expanded row template.
     * @param {Object} context - expanded row data.
     */
    rowexpansion(context: {
        /**
         * Row span.
         */
        rowspan?: number;
        /**
         * Row group.
         */
        rowgroup?: number;
        /**
         * Expanded state.
         */
        expanded: boolean;
    }): TemplateRef<any>;
    /**
     * Custom group header template.
     * @param {Object} context - row data.
     */
    groupheader(context: {
        /**
         * Row data.
         */
        $implicit?: any;
        /**
         * Row index.
         */
        rowIndex?: number;
        /**
         * Columns.
         */
        columns?: any[];
        /**
         * Editing state.
         */
        editing?: boolean;
        /**
         * Frozen state.
         */
        frozen?: boolean;
    }): TemplateRef<any>;
    /**
     * Custom group footer template.
     * @param {TableRowContext} context - row data.
     */
    groupfooter(context: {
        /**
         * Row data.
         */
        $implicit?: any;
        /**
         * Row index.
         */
        rowIndex?: number;
        /**
         * Columns.
         */
        columns?: any[];
        /**
         * Editing state.
         */
        editing?: boolean;
        /**
         * Frozen state.
         */
        frozen?: boolean;
    }): TemplateRef<any>;
    /**
     * Custom frozen header template.
     * @param {*} context - columns.
     */
    frozenheader(): TemplateRef<{ $implicit: any[] }>;
    /**
     * Custom frozen body template.
     * @param {Object} context - row data.
     */
    frozenbody(context: {
        /**
         * Row data.
         */
        $implicit?: any;
        /**
         * Row index.
         */
        rowIndex?: number;
        /**
         * Columns.
         */
        columns?: any[];
        /**
         * Editing state.
         */
        editing?: boolean;
        /**
         * Frozen state.
         */
        frozen?: boolean;
    }): TemplateRef<any>;
    /**
     * Custom frozen footer template.
     * @param {*} context - columns.
     */
    frozenfooter(): TemplateRef<{ $implicit: any[] }>;
    /**
     * Custom frozen column group template.
     * @param {*} context - columns.
     */
    frozencolgroup(): TemplateRef<{ $implicit: any[] }>;
    /**
     * Custom frozen expanded row template.
     * @param {Object} context - row data.
     */
    frozenrowexpansion(context: {
        /**
         * Row span.
         */
        rowspan?: number;
        /**
         * Row group.
         */
        rowgroup?: number;
        /**
         * Expanded state.
         */
        expanded: boolean;
    }): TemplateRef<any>;
    /**
     * Custom empty message template.
     */
    emptymessage(context: {
        /**
         * Columns
         */
        $implicit: any[];
        /**
         * Frozen state.
         */
        frozen: boolean;
    }): TemplateRef<{ $implicit: any[]; frozen: boolean }>;
    /**
     * Custom paginator left template.
     */
    paginatorleft(): TemplateRef<any>;
    /**
     * Custom paginator right template.
     */
    paginatorright(): TemplateRef<any>;
    /**
     * Custom paginator dropdown item template.
     */
    paginatordropdownitem(): TemplateRef<any>;
    /**
     * Custom paginator first page link icon template.
     */
    paginatorfirstpagelinkicon(): TemplateRef<any>;
    /**
     * Custom paginator last page link icon template.
     */
    paginatorlastpagelinkicon(): TemplateRef<any>;
    /**
     * Custom paginator previous page link icon template.
     */
    paginatorpreviouspagelinkicon(): TemplateRef<any>;
    /**
     * Custom paginator next page link icon template.
     */
    paginatornextpagelinkicon(): TemplateRef<any>;
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
         * Checked state.
         */
        $implicit: boolean;
    }): TemplateRef<{ $implicit: boolean }>;
}
