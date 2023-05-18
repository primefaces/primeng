import { TemplateRef } from '@angular/core';
import { OrderList } from './orderlist';
/**
 * Callbacks to invoke on filter.
 */
export interface OrderListFilterOptions {
    filter?: (value?: any) => void;
    reset?: () => void;
}
/**
 * Custom change event.
 * @see {@link OrderList.selectionChange}
 */
export interface OrderListSelectionChangeEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Current selected values.
     */
    value: any[];
}
/**
 * Custom change event.
 * @see {@link OrderList.selectionChange}
 */
export interface OrderListFilterEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Filtered options.
     */
    value: any[];
}
/**
 * Defines valid templates in OrderList.
 * @group Templates
 */
export interface OrderListTemplates {
    /**
     * Custom header template.
     * @param {Object} context - item data.
     */
    item(context: {
        /**
         * Item instance.
         */
        $implicit: any;
        /**
         * Index of the item.
         */
        index: number;
    }): TemplateRef<{ $implicit: any; index: number }>;
    /**
     * Custom header template.
     */
    header: TemplateRef<any>;
    /**
     * Custom filter template.
     * @param {OrderListFilterOptions} options - filter options.
     */
    filter(context: {
        /**
         * Filter options.
         */
        options: OrderListFilterOptions;
    }): TemplateRef<{ options: OrderListFilterOptions }>;
    /**
     * Custom empty filter template.
     */
    emptyfilter: TemplateRef<any>;
    /**
     * Custom empty template.
     */
    empty: TemplateRef<any>;
    /**
     * Custom clear icon template.
     */
    clearicon: TemplateRef<any>;
    /**
     * Custom filter icon template.
     */
    filtericon: TemplateRef<any>;
    /**
     * Custom move up icon template.
     */
    moveupicon: TemplateRef<any>;
    /**
     * Custom move top icon template.
     */
    movetopicon: TemplateRef<any>;
    /**
     * Custom move down icon template.
     */
    movedownicon: TemplateRef<any>;
    /**
     * Custom move bottom icon template.
     */
    movebottomicon: TemplateRef<any>;
}
