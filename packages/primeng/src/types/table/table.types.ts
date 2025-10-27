import type { PassThrough, PassThroughOption } from 'primeng/api';
import type { CheckboxPassThrough } from 'primeng/types/checkbox';
import type { PaginatorPassThrough } from 'primeng/types/paginator';
import type { VirtualScrollerPassThrough } from 'primeng/types/scroller';

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
    pcColumnFilterButton?: PassThroughOption<HTMLButtonElement, I>;
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
    pcFilterOperatorDropdown?: PassThroughOption<HTMLElement, I>;
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
    pcFilterConstraintDropdown?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the filter remove rule button component.
     */
    pcFilterRemoveRuleButton?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the add rule button label.
     */
    pcAddRuleButtonLabel?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the filter button bar element.
     */
    filterButtonBar?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the filter clear button component.
     */
    pcFilterClearButton?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the filter apply button component.
     */
    pcFilterApplyButton?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the filter input text component.
     */
    pcFilterInputText?: PassThroughOption<HTMLInputElement, I>;
    /**
     * Used to pass attributes to the filter input number component.
     */
    pcFilterInputNumber?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the filter checkbox component.
     */
    pcFilterCheckbox?: CheckboxPassThrough;
    /**
     * Used to pass attributes to the filter datepicker component.
     */
    pcFilterDatePicker?: PassThroughOption<HTMLElement, I>;
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
