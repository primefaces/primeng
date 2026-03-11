import type { PassThrough, PassThroughOption } from 'primeng/api';
import { TemplateRef } from '@angular/core';
import { PaginatorPassThrough } from 'primeng/types/paginator';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link DataView.pt}
 * @group Interface
 */
export interface DataViewPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the loading container's DOM element.
     */
    loading?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the loading overlay's DOM element.
     */
    loadingOverlay?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the loading icon's DOM element.
     */
    loadingIcon?: PassThroughOption<SVGElement, I>;
    /**
     * Used to pass attributes to the header's DOM element.
     */
    header?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the content container's DOM element.
     */
    content?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the empty message's DOM element.
     */
    emptyMessage?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the footer's DOM element.
     */
    footer?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the Paginator component.
     */
    pcPaginator?: PaginatorPassThrough;
}

/**
 * Defines valid pass-through options in DataView.
 * @see {@link DataViewPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type DataViewPassThrough<I = unknown> = PassThrough<I, DataViewPassThroughOptions<I>>;

/**
 * State of the paginator.
 * @group Interface
 */
export interface DataViewPaginatorState {
    /**
     * Current page.
     */
    page?: number;
    /**
     * First item in the current page.
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
 * @see {@link DataView.onLazyLoad}
 * @group Events
 */
export interface DataViewLazyLoadEvent {
    /**
     * Index of the first element.
     */
    first: number;
    /**
     * Row count.
     */
    rows: number;
    /**
     * Property name of data to use in sorting by default.
     */
    sortField: string;
    /**
     * Order to sort the data by default.
     */
    sortOrder: number;
}

/**
 * Custom page event.
 * @see {@link DataView.onPage}
 * @group Events
 */
export interface DataViewPageEvent {
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
 * Custom sort event.
 * @see {@link DataView.onSort}
 * @group Events
 */
export interface DataViewSortEvent {
    /**
     * Sort field.
     */
    sortField: string;
    /**
     * Sort order.
     */
    sortOrder: number;
}

/**
 * Custom layout change.
 * @see {@link DataView.onChangeLayout}
 * @group Events
 */
export interface DataViewLayoutChangeEvent {
    /**
     * Layout of the component.
     */
    layout: 'list' | 'grid';
}

/**
 * Custom list template context.
 * @group Interface
 */
export interface DataViewListTemplateContext<T = any> {
    /**
     * Rows data for the current page.
     */
    $implicit: T[];
}

/**
 * Custom grid template context.
 * @group Interface
 */
export interface DataViewGridTemplateContext<T = any> {
    /**
     * Rows data for the current page.
     */
    $implicit: T[];
}

/**
 * Custom paginator left template context.
 * @group Interface
 */
export interface DataViewPaginatorLeftTemplateContext {
    /**
     * State of the paginator.
     */
    $implicit: DataViewPaginatorState;
}

/**
 * Custom paginator right template context.
 * @group Interface
 */
export interface DataViewPaginatorRightTemplateContext {
    /**
     * State of the paginator.
     */
    $implicit: DataViewPaginatorState;
}

/**
 * Custom paginator dropdown item template context.
 * @group Interface
 */
export interface DataViewPaginatorDropdownItemTemplateContext {
    /**
     * Dropdown item instance (rows per page option).
     */
    $implicit: number;
}

/**
 * Defines valid templates in DataView.
 * @group Templates
 */
export interface DataViewTemplates<T = any> {
    /**
     * Custom list template.
     * @param {Object} context - data of the DataView.
     */
    list(context: DataViewListTemplateContext<T>): TemplateRef<DataViewListTemplateContext<T>>;
    /**
     * Custom grid template.
     * @param {Object} context - data of the DataView.
     */
    grid(context: DataViewGridTemplateContext<T>): TemplateRef<DataViewGridTemplateContext<T>>;
    /**
     * Custom paginator left template.
     * @param {Object} context - paginator state.
     */
    paginatorleft(context: DataViewPaginatorLeftTemplateContext): TemplateRef<DataViewPaginatorLeftTemplateContext>;
    /**
     * Custom paginator right template.
     * @param {Object} context - paginator state.
     */
    paginatorright(context: DataViewPaginatorRightTemplateContext): TemplateRef<DataViewPaginatorRightTemplateContext>;
    /**
     * Custom paginator dropdown template.
     * @param {Object} context - dropdown item.
     */
    paginatordropdownitem(context: DataViewPaginatorDropdownItemTemplateContext): TemplateRef<DataViewPaginatorDropdownItemTemplateContext>;
    /**
     * Custom empty message template.
     */
    emptymessage(): TemplateRef<void>;
    /**
     * Custom header template.
     */
    header(): TemplateRef<void>;
    /**
     * Custom footer template.
     */
    footer(): TemplateRef<void>;
    /**
     * Custom loading icon template.
     */
    loadingicon(): TemplateRef<void>;
    /**
     * Custom list icon template.
     */
    listicon(): TemplateRef<void>;
    /**
     * Custom grid icon template.
     */
    gridicon(): TemplateRef<void>;
}
