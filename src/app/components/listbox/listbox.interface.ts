import { TemplateRef } from '@angular/core';
import { Listbox } from './listbox';
/**
 * Filter options of listbox.
 * @group Interface
 */
export interface ListboxFilterOptions {
    /**
     * Callback to filter options.
     * @param {any} value - Filter value.
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
 * @group Events
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
 * @see {@link Listbox.onSelectAllChange}
 * @group Events
 */
export interface ListboxSelectAllChangeEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Boolean value indicates whether all data is selected.
     */
    checked: boolean;
    /**
     * Method to invoke on model value change.
     */
    updateModel?: (value?: any, event?: Event) => void;
}
/**
 * Custom filter event.
 * @see {@link Listbox.onFilter}
 * @group Events
 */
export interface ListboxFilterEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Filter value.
     */
    filter: any;
}
/**
 * Custom change event.
 * @see {@link Listbox.onClick}
 * @group Events
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
    option?: any;
}
/**
 * Custom change event.
 * @see {@link Listbox.onDblClick}
 * @group Events
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
    header(): TemplateRef<any>;
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
    footer(): TemplateRef<any>;
    /**
     * Custom empty template.
     */
    empty(): TemplateRef<any>;
    /**
     * Custom empty filter template.
     */
    emptyfilter(): TemplateRef<any>;
    /**
     * Custom filter icon template.
     */
    filtericon(): TemplateRef<any>;
    /**
     * Custom check icon template.
     */
    checkicon(): TemplateRef<any>;
}
