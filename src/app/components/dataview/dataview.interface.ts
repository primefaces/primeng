import { TemplateRef } from '@angular/core';
import { DataView } from './dataview';
/**
 * State of the paginator.
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
 */
export interface DataViewLayoutChangeEvent {
    /**
     * Layout of the component.
     */
    layout: 'list' | 'grid';
}
/**
 * Defines valid templates in DataView.
 * @group Templates
 */
export interface DataViewTemplates {
    /**
     * Custom list item template.
     * @param {Object} context - data of the item.
     */
    listItem(context: {
        /**
         * Row data.
         */
        $implicit: any;
        /**
         * Row index.
         */
        rowIndex: number;
    }): TemplateRef<{ $implicit: any; rowIndex: number }>;
    /**
     * Custom grid item template.
     * @param {Object} context - data of the item.
     */
    gridItem(context: {
        /**
         * Row data.
         */
        $implicit: any;
        /**
         * Row index.
         */
        rowIndex: number;
    }): TemplateRef<{ $implicit: any; rowIndex: number }>;
    /**
     * Custom paginator left template.
     * @param {Object} context - paginator state.
     */
    paginatorleft(context: {
        /**
         * State of the paginator.
         */
        $implicit: DataViewPaginatorState;
    }): TemplateRef<DataViewPaginatorState>;
    /**
     * Custom paginator right template.
     * @param {Object} context - paginator state.
     */
    paginatorright(context: {
        /**
         * State of the paginator.
         */
        $implicit: DataViewPaginatorState;
    }): TemplateRef<DataViewPaginatorState>;
    /**
     * Custom paginator dropdown template.
     * @param {Object} context - dropdown item.
     */
    paginatordropdownitem(context: {
        /**
         * Dropdown item instance.
         */
        $implicit: any;
    }): TemplateRef<{ $implicit: any }>;
    /**
     * Custom empty message template.
     */
    empty: TemplateRef<any>;
    /**
     * Custom header template.
     */
    header: TemplateRef<any>;
    /**
     * Custom footer template.
     */
    footer: TemplateRef<any>;
    /**
     * Custom loading icon template.
     */
    loadingicon: TemplateRef<any>;
    /**
     * Custom list icon template.
     */
    listicon: TemplateRef<any>;
    /**
     * Custom grid icon template.
     */
    gridicon: TemplateRef<any>;
}
