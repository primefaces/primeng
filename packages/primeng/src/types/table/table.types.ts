import { TemplateRef } from '@angular/core';
import type { FilterMetadata, LazyLoadMeta, PassThrough, PassThroughOption } from 'primeng/api';
import type { ButtonPassThrough, ButtonProps } from 'primeng/types/button';
import type { CheckboxPassThrough } from 'primeng/types/checkbox';
import type { PaginatorPassThrough } from 'primeng/types/paginator';
import type { VirtualScrollerPassThrough } from 'primeng/types/scroller';
import type { InputTextPassThrough } from 'primeng/types/inputtext';
import type { SelectPassThrough } from 'primeng/types/select';
import type { InputNumberPassThrough } from 'primeng/types/inputnumber';
import type { DatePickerPassThrough } from 'primeng/types/datepicker';

/**
 * Custom pass-through(pt) options for ColumnFilter.
 * @template I Type of instance.
 *
 * @group Interface
 */
export interface ColumnFilterPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the filter container element.
     */
    filter?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the column filter button component.
     */
    pcColumnFilterButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the filter overlay element.
     */
    filterOverlay?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the filter constraint list element.
     */
    filterConstraintList?: PassThroughOption<HTMLUListElement, I>;
    /**
     * Used to pass attributes to the filter constraint element.
     */
    filterConstraint?: PassThroughOption<HTMLLIElement, I>;
    /**
     * Used to pass attributes to the filter constraint separator element.
     */
    filterConstraintSeparator?: PassThroughOption<HTMLLIElement, I>;
    /**
     * Used to pass attributes to the empty filter label element.
     */
    emtpyFilterLabel?: PassThroughOption<HTMLLIElement, I>;
    /**
     * Used to pass attributes to the filter operator element.
     */
    filterOperator?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the filter operator dropdown component.
     */
    pcFilterOperatorDropdown?: SelectPassThrough;
    /**
     * Used to pass attributes to the filter rule list element.
     */
    filterRuleList?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the filter rule element.
     */
    filterRule?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the filter constraint dropdown component.
     */
    pcFilterConstraintDropdown?: SelectPassThrough;
    /**
     * Used to pass attributes to the filter remove rule button component.
     */
    pcFilterRemoveRuleButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the add rule button label.
     */
    pcAddRuleButtonLabel?: ButtonPassThrough;
    /**
     * Used to pass attributes to the filter button bar element.
     */
    filterButtonBar?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the filter clear button component.
     */
    pcFilterClearButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the filter apply button component.
     */
    pcFilterApplyButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the filter input text component.
     */
    pcFilterInputText?: InputTextPassThrough;
    /**
     * Used to pass attributes to the filter input number component.
     */
    pcFilterInputNumber?: InputNumberPassThrough;
    /**
     * Used to pass attributes to the filter checkbox component.
     */
    pcFilterCheckbox?: CheckboxPassThrough;
    /**
     * Used to pass attributes to the filter datepicker component.
     */
    pcFilterDatePicker?: DatePickerPassThrough;
}

/**
 * Defines valid pass-through options in ColumnFilter.
 * @see {@link ColumnFilterPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type ColumnFilterPassThrough<I = unknown> = PassThrough<I, ColumnFilterPassThroughOptions<I>>;

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link TableProps.pt}
 * @group Interface
 */
export interface TablePassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the loading mask element.
     */
    mask?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the loading icon element.
     */
    loadingIcon?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the header (caption) element.
     */
    header?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the paginator component.
     */
    pcPaginator?: PaginatorPassThrough;
    /**
     * Used to pass attributes to the table container element.
     */
    tableContainer?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the virtual scroller component.
     */
    virtualScroller?: VirtualScrollerPassThrough;
    /**
     * Used to pass attributes to the table element.
     */
    table?: PassThroughOption<HTMLTableElement, I>;
    /**
     * Used to pass attributes to the thead element.
     */
    thead?: PassThroughOption<HTMLTableSectionElement, I>;
    /**
     * Used to pass attributes to the tbody element.
     */
    tbody?: PassThroughOption<HTMLTableSectionElement, I>;
    /**
     * Used to pass attributes to the virtual scroller spacer element.
     */
    virtualScrollerSpacer?: PassThroughOption<HTMLTableSectionElement, I>;
    /**
     * Used to pass attributes to the tfoot element.
     */
    tfoot?: PassThroughOption<HTMLTableSectionElement, I>;
    /**
     * Used to pass attributes to the footer element.
     */
    footer?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the column resize indicator element.
     */
    columnResizeIndicator?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the row reorder indicator up element.
     */
    rowReorderIndicatorUp?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the row reorder indicator down element.
     */
    rowReorderIndicatorDown?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the reorderable row element.
     */
    reorderableRow?: PassThroughOption<HTMLTableRowElement, I>;
    /**
     * Used to pass attributes to the reorderable row handle element.
     */
    reorderableRowHandle?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the header checkbox component.
     */
    headerCheckbox?: CheckboxPassThrough;
    /**
     * Used to pass attributes to the checkbox component.
     */
    pcCheckbox?: CheckboxPassThrough;
    /**
     * Used to pass attributes to the column filter component.
     */
    columnFilter?: ColumnFilterPassThroughOptions<I>;
    /**
     * Used to pass attributes to the column filter form element component.
     */
    columnFilterFormElement?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in Table.
 * @see {@link TablePassThroughOptions}
 *
 * @template I Type of instance.
 */
export type TablePassThrough<I = unknown> = PassThrough<I, TablePassThroughOptions<I>>;
/**
 * Custom select event.
 * @see {@link Table.onRowSelect}
 * @extends {LazyLoadMeta}
 * @group Events
 */
export interface TableRowSelectEvent<RowData = any> {
    /**
     * Browser event.
     */
    originalEvent?: Event;
    /**
     * Row data.
     */
    data?: RowData | RowData[];
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
export interface TableRowUnSelectEvent<RowData> extends TableRowSelectEvent<RowData> {}
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
export interface TableRowExpandEvent<RowData = any> {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Row data.
     */
    data: RowData;
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
export interface TableContextMenuSelectEvent<RowData = any> {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Row data.
     */
    data: RowData;
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
export interface TableContextMenuSelectionChangeEvent<RowData = any> {
    /**
     * Row data.
     */
    data: RowData;
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
export interface TableEditEvent<RowData = any> {
    /**
     * Field to be edited.
     */
    field?: string;
    /**
     * New value.
     */
    data?: RowData;
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
 * Custom table filter popover button props options.
 */
export interface TableFilterButtonPopoverPropsOptions {
    /**
     * Add rule button props
     */
    addRule: ButtonProps | undefined;
    /**
     * Remove rule button props
     */
    removeRule: ButtonProps | undefined;
    /**
     * Apply button props
     */
    apply: ButtonProps | undefined;
    /**
     * Apply button props
     */
    clear: ButtonProps | undefined;
}
/**
 * Custom table filter inline button props options.
 */
export interface TableFilterButtonInlinePropsOptions {
    /**
     * Apply button props
     */
    clear: ButtonProps | undefined;
}
/**
 * Custom table filter buttons' props options.
 */
export interface TableFilterButtonPropsOptions {
    /**
     * Filter button props
     */
    filter: ButtonProps | undefined;
    /**
     * Inline filter buttons' options
     */
    inline: TableFilterButtonInlinePropsOptions | undefined;
    /**
     * Popover filter buttons' options
     */
    popover: TableFilterButtonPopoverPropsOptions | undefined;
}
/**
 * Custom CSV export options.
 */
export interface ExportCSVOptions {
    /**
     * Boolean value determining whether to export all selected values.
     */
    selectionOnly?: boolean;
    /**
     * Boolean value determining whether to export all values.
     */
    allValues?: boolean;
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
    expandedrow(context: {
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
    frozenexpandedrow(context: {
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
     * Custom paginator dropdown trigger icon template.
     */
    paginatordropdownicon(): TemplateRef<any>;
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
