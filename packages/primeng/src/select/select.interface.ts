import { TemplateRef } from '@angular/core';
import { ScrollerOptions } from 'primeng/api';
import { Select } from './select';
/**
 * Filter callbacks of the select.
 * @group Interface
 */
export interface SelectFilterOptions {
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
 * @see {@link Select.onChange}
 * @group Events
 */
export interface SelectChangeEvent {
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
 * @see {@link Select.onFilter}
 * @group Events
 */
export interface SelectFilterEvent {
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
 * @see {@link Select.onLazyLoad}
 * @group Events
 */
export interface SelectLazyLoadEvent {
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
 * Defines valid templates in Select.
 * @group Templates
 */
export interface SelectTemplates {
    /**
     * Custom item template.
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
     * @param {SelectFilterOptions} options - filter options.
     */
    filter(context: {
        /**
         * Filter options.
         */
        options: SelectFilterOptions;
    }): TemplateRef<{ options: SelectFilterOptions }>;
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
     * Custom select icon template.
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
