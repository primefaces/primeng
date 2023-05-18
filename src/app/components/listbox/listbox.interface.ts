import { TemplateRef } from '@angular/core';
import { Listbox } from './listbox';
/**
 * Filter options of listbox.
 */
export interface ListboxFilterOptions {
    /**
     * Callback to filter options.
     * @param value - filter value
     */
    filter?: (value?: any) => void;
    /**
     * Callback to reset filter.
     */
    reset?: () => void;
}
/**
 * Custom change event.
 * @see {@link Listbox.onChange}
 */
export interface ListboxChangeEvent {
    /**
     * Original event
     */
    originalEvent: Event;
    /**
     * Selected option value
     */
    value: any;
}
/**
 * Custom change event.
 * @see {@link Listbox.onClick}
 */
export interface ListboxClickEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Selected option value
     */
    value: any;
    /**
     * Selected option
     */
    option: any;
}
/**
 * Custom change event.
 * @see {@link Listbox.onDblClick}
 */
export interface ListboxDoubleClickEvent extends ListboxClickEvent {}
/**
 * Defines valid templates in Panel.
 * @group Templates
 */
export interface ListboxTemplates {
    /**
     * Custom item template.
     * @param {Object} context - item data.
     */
    item(context: {
        /**
         * Data of the option.
         */
        $implicit: any;
        /**
         * Index of the option.
         */
        index: number;
    }): TemplateRef<{ $implicit: any; index: number }>;
    /**
     * Custom group template.
     * @param {Object} context - group data.
     */
    group(context: {
        /**
         * Group option.
         */
        $implicit: any;
    }): TemplateRef<{ $implicit: any }>;
    /**
     * Custom header template.
     */
    header: TemplateRef<any>;
    /**
     * Custom filter template.
     * @param {Object} context - filter options.
     */
    filter(context: {
        /**
         * Filter options.
         */
        options: ListboxFilterOptions;
    }): TemplateRef<any>;
    /**
     * Custom footer template.
     */
    footer: TemplateRef<any>;
    /**
     * Custom empty template.
     */
    empty: TemplateRef<any>;
    /**
     * Custom empty filter template.
     */
    emptyfilter: TemplateRef<any>;
    /**
     * Custom filter icon template.
     */
    filtericon: TemplateRef<any>;
    /**
     * Custom check icon template.
     */
    checkicon: TemplateRef<any>;
}
