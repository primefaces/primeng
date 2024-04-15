import { TemplateRef } from '@angular/core';
import { ScrollerOptions } from '@alamote/primeng/api';
import { Dropdown } from './dropdown';
/**
 * Filter callbacks of the dropdown.
 * @group Interface
 */
export interface DropdownFilterOptions {
    /**
     * Filter function.
     */
    filter?: (value?: any) => void;
    /**
     * Reset function.
     */
    reset?: () => void;
}
/**
 * Custom change event.
 * @see {@link Dropdown.onChange}
 * @group Events
 */
export interface DropdownChangeEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Selected option value
     */
    value: any;
}
/**
 * Custom filter event.
 * @see {@link Dropdown.onFilter}
 * @group Events
 */
export interface DropdownFilterEvent {
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
 * Custom lazy load event.
 * @see {@link Dropdown.onLazyLoad}
 * @group Events
 */
export interface DropdownLazyLoadEvent {
    /**
     * Index of the first element in viewport.
     */
    first: number;
    /**
     * Index of the last element in viewport.
     */
    last: number;
}
/**
 * Defines valid templates in Dropdown.
 * @group Templates
 */
export interface DropdownTemplates {
    /**
     * Custom header template.
     * @param {Object} context - item data.
     */
    item(context: {
        /**
         * Data of the option.
         */
        $implicit: any;
    }): TemplateRef<{ $implicit: any }>;
    /**
     * Custom selected item template.
     * @param {Object} context - selected item data.
     */
    selectedItem(context: {
        /**
         * Selected option value.
         */
        $implicit: any;
    }): TemplateRef<{ $implicit: any }>;
    /**
     * Custom header template.
     */
    header(): TemplateRef<any>;
    /**
     * Custom filter template.
     * @param {DropdownFilterOptions} options - filter options.
     */
    filter(context: {
        /**
         * Filter options.
         */
        options: DropdownFilterOptions;
    }): TemplateRef<{ options: DropdownFilterOptions }>;
    /**
     * Custom footer template.
     */
    footer(): TemplateRef<any>;
    /**
     * Custom empty filter template.
     */
    emptyfilter(): TemplateRef<any>;
    /**
     * Custom empty template.
     */
    empty(): TemplateRef<any>;
    /**
     * Custom group template.
     */
    group(context: {
        /**
         * Group option.
         */
        $implicit: any;
    }): TemplateRef<{ $implicit: any }>;
    /**
     * Custom loader template. This template can be used with virtualScroll.
     * @param {ScrollerOptions} options - virtual scroller options.
     */
    loader(context: {
        /**
         * Virtual scroller options.
         */
        options: ScrollerOptions;
    }): TemplateRef<{ options: ScrollerOptions }>;
    /**
     * Custom dropdown trigger icon template.
     */
    dropdownicon(): TemplateRef<any>;
    /**
     * Custom clear icon template.
     */
    clearicon(): TemplateRef<any>;
    /**
     * Custom filter icon template.
     */
    filtericon(): TemplateRef<any>;
}
