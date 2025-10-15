import type { PassThrough, PassThroughOption } from 'primeng/api';
import { TemplateRef } from '@angular/core';
import type { OrderList } from 'primeng/orderlist';
import type { ListBoxPassThrough } from 'primeng/listbox';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link OrderList.pt}
 * @group Interface
 */
export interface OrderListPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the controls container's DOM element.
     */
    controls?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the move up button's DOM element.
     */
    moveUpButton?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the move top button's DOM element.
     */
    moveTopButton?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the move down button's DOM element.
     */
    moveDownButton?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the move bottom button's DOM element.
     */
    moveBottomButton?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the Listbox component.
     */
    pcListbox?: ListBoxPassThrough;
}

/**
 * Defines valid pass-through options in OrderList.
 * @see {@link OrderListPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type OrderListPassThrough<I = unknown> = PassThrough<I, OrderListPassThroughOptions<I>>;

/**
 * Callbacks to invoke on filter.
 * @group Interface
 */
export interface OrderListFilterOptions {
    filter?: (value?: any) => void;
    reset?: () => void;
}

/**
 * Custom change event.
 * @see {@link OrderList.selectionChange}
 * @group Events
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
 * @group Events
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
    header(): TemplateRef<any>;
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
    emptyfilter(): TemplateRef<any>;
    /**
     * Custom empty template.
     */
    empty(): TemplateRef<any>;
    /**
     * Custom clear icon template.
     */
    clearicon(): TemplateRef<any>;
    /**
     * Custom filter icon template.
     */
    filtericon(): TemplateRef<any>;
    /**
     * Custom move up icon template.
     */
    moveupicon(): TemplateRef<any>;
    /**
     * Custom move top icon template.
     */
    movetopicon(): TemplateRef<any>;
    /**
     * Custom move down icon template.
     */
    movedownicon(): TemplateRef<any>;
    /**
     * Custom move bottom icon template.
     */
    movebottomicon(): TemplateRef<any>;
}
