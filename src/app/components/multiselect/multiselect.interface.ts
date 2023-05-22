import { TemplateRef } from '@angular/core';
import { ScrollerOptions } from 'primeng/scroller';
import { MultiSelect, MultiSelectItem } from './multiselect';
/**
 * Callbacks to invoke on filter or reset.
 */
export interface MultiSelectFilterOptions {
    filter?: (value?: any) => void;
    reset?: () => void;
}
/**
 * Custom change event.
 * @see {@link MultiSelect.onChange}
 */
export interface MultiSelectChangeEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Current selected values.
     */
    value: any;
    /**
     * Toggled item value.
     */
    itemValue?: any;
}
/**
 * Custom filter event.
 * @see {@link MultiSelect.onFilter}
 */
export interface MultiSelectFilterEvent {
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
 * Custom focus event.
 * @see {@link MultiSelect.onFocus}
 */
export interface MultiSelectFocusEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
}
/**
 * Custom blur event.
 * @see {@link MultiSelect.onBlur}
 */
export interface MultiSelectBlurEvent extends MultiSelectFocusEvent {}

/**
 * Custom lazy load event.
 * @see {@link MultiSelect.onLazyLoad}
 */
export interface MultiSelectLazyLoadEvent {
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
 * Custom remove event.
 * @see {@link MultiSelect.onRemove}
 */
export interface MultiSelectRemoveEvent {
    /**
     * Value after the item removed.
     */
    newValue: object;
    /**
     * Removed value.
     */
    removed: MultiSelectItem;
}

/**
 * Defines valid templates in MultiSelect.
 * @group Templates
 */
export interface MultiSelectTemplates {
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
     * @param {Object} context - selected items data.
     */
    selectedItems(context: {
        /**
         * Selected option value.
         */
        $implicit: any;
        /**
         * Function to remove chip.
         */
        removeChip: (chip: MultiSelectItem, event: MouseEvent) => void;
    }): TemplateRef<{ $implicit: any; removeChip: Function }>;
    /**
     * Custom header template.
     */
    header: TemplateRef<any>;
    /**
     * Custom filter template.
     * @param {MultiSelectFilterOptions} options - filter options.
     */
    filter(context: {
        /**
         * Filter options.
         */
        options: MultiSelectFilterOptions;
    }): TemplateRef<{ options: MultiSelectFilterOptions }>;
    /**
     * Custom footer template.
     */
    footer: TemplateRef<any>;
    /**
     * Custom empty filter template.
     */
    emptyfilter: TemplateRef<any>;
    /**
     * Custom empty template.
     */
    empty: TemplateRef<any>;
    /**
     * Custom group template.
     */
    group(context: {
        /**
         * Data of the item.
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
    dropdownicon: TemplateRef<any>;
    /**
     * Custom clear icon template.
     */
    clearicon: TemplateRef<any>;
    /**
     * Custom filter icon template.
     */
    filtericon: TemplateRef<any>;
    /**
     * Custom check icon template.
     */
    checkicon: TemplateRef<any>;
    /**
     * Custom close icon template.
     */
    closeicon: TemplateRef<any>;
    /**
     * Custom remove token icon template.
     */
    removetokenicon: TemplateRef<any>;
}
