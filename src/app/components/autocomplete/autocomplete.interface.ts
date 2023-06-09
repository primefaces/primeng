import { TemplateRef } from '@angular/core';
import { ScrollerOptions } from 'primeng/api';
import { AutoComplete } from './autocomplete';

/**
 * Custom complete event.
 * @see {@link AutoComplete.completeMethod}
 * @group Events
 */
export interface AutoCompleteCompleteEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Selected option value.
     */
    query: string;
}
/**
 * Custom click event.
 * @see {@link AutoComplete.onDropdownClick}
 * @group Events
 */
export interface AutoCompleteDropdownClickEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Selected option value.
     */
    query: string;
}
/**
 * Custom lazy load event.
 * @see {@link AutoComplete.onLazyLoad}
 * @group Events
 */
export interface AutoCompleteLazyLoadEvent {
    /**
     * First element in viewport.
     */
    first: any;
    /**
     * Last element in viewport.
     */
    last: any;
}
/**
 * Defines valid templates in AutoComplete.
 * @group Templates
 */
export interface AutoCompleteTemplates {
    /**
     * Custom item template.
     * @param {Object} context - option data.
     */
    item(context: {
        /**
         * Option.
         */
        $implicit: any;
        /**
         * Option index.
         */
        index: number;
    }): TemplateRef<{ $implicit: any; index: number }>;
    /**
     * Custom group template.
     * @param {Object} context - group data.
     */
    group(context: {
        /**
         * Option group.
         */
        $implicit: any | any[];
    }): TemplateRef<{ $implicit: any | any[] }>;
    /**
     * Custom selected item template.
     * @param {Object} context - selected item data.
     */
    selectedItem(context: {
        /**
         * Selected value.
         */
        $implicit: any;
    }): TemplateRef<{ $implici: any }>;
    /**
     * Custom header template.
     */
    header(): TemplateRef<any>;
    /**
     * Custom empty template.
     */
    empty(): TemplateRef<any>;
    /**
     * Custom footer template.
     */
    footer(): TemplateRef<any>;
    /**
     * Custom loader template.
     * @param {Object} context - scroller options.
     */
    loader(context: {
        /**
         * Virtual scroller options.
         */
        $implicit: ScrollerOptions;
    }): TemplateRef<{ $implicit: ScrollerOptions }>;
    /**
     * Custom remove token icon template.
     */
    removetokenicon(): TemplateRef<any>;
    /**
     * Custom loading icon template.
     */
    loadingicon(): TemplateRef<any>;
    /**
     * Custom clear icon template.
     */
    clearicon(): TemplateRef<any>;
    /**
     * Custom dropdown icon template.
     */
    dropdownicon(): TemplateRef<any>;
}
