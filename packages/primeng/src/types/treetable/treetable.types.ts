import type { PassThrough, PassThroughOption } from 'primeng/api';
import type { BadgePassThrough } from 'primeng/types/badge';
import type { CheckboxPassThrough } from 'primeng/types/checkbox';
import type { PaginatorPassThrough } from 'primeng/types/paginator';
import type { ScrollerPassThrough } from 'primeng/types/scroller';

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
     * @see {@link ScrollerPassThrough}
     */
    virtualScroller?: ScrollerPassThrough;
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
