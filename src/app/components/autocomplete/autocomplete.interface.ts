import { TemplateRef } from '@angular/core';

/**
 * Custom complete event.
 * @see {@link AutoComplete.completeMethod}
 * @event
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
 * Custom complete event.
 * @see {@link AutoComplete.completeMethod}
 * @event
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
     */
    item: TemplateRef<any>;
    /**
     * Custom group template.
     * @param {Object} implicit - option group.
     */
    group: TemplateRef<any>;
    /**
     * Custom selected item template.
     * @param {Object} implicit - selected item.
     */
    selectedItem: TemplateRef<any>;
    /**
     * Custom header template.
     */
    header: TemplateRef<any>;
    /**
     * Custom empty template.
     */
    empty: TemplateRef<any>;
    /**
     * Custom footer template.
     */
    footer: TemplateRef<any>;
    /**
     * Custom loader template.
     */
    loader: TemplateRef<any>;
    /**
     * Custom remove token icon template.
     */
    removetokenicon: TemplateRef<any>;
    /**
     * Custom loading icon template.
     */
    loadingicon: TemplateRef<any>;
    /**
     * Custom clear icon template.
     */
    clearicon: TemplateRef<any>;
    /**
     * Custom dropdown icon template.
     */
    dropdownicon: TemplateRef<any>;
}
