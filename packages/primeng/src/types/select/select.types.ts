import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption, ScrollerOptions } from 'primeng/api';
import type { OverlayPassThrough } from 'primeng/types/overlay';
import type { IconFieldPassThrough } from 'primeng/types/iconfield';
import type { InputIconPassThrough } from 'primeng/types/inputicon';
import type { InputTextPassThrough } from 'primeng/types/inputtext';
import type { ScrollerPassThrough } from 'primeng/types/scroller';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link SelectProps.pt}
 * @group Interface
 */
export interface SelectPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the label's DOM element.
     */
    label?: PassThroughOption<HTMLSpanElement | HTMLInputElement, I>;
    /**
     * Used to pass attributes to the clear icon's DOM element.
     */
    clearIcon?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the dropdown's DOM element.
     */
    dropdown?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the loading icon's DOM element.
     */
    loadingIcon?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the dropdown icon's DOM element.
     */
    dropdownIcon?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the Overlay component.
     * @see {@link OverlayPassThrough}
     */
    pcOverlay?: OverlayPassThrough;
    /**
     * Used to pass attributes to the header's DOM element.
     */
    header?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the filter container's DOM element.
     */
    pcFilterContainer?: IconFieldPassThrough;
    /**
     * Used to pass attributes to the filter input's DOM element.
     */
    pcFilter?: InputTextPassThrough;
    /**
     * Used to pass attributes to the filter icon container's DOM element.
     */
    pcFilterIconContainer?: InputIconPassThrough;
    /**
     * Used to pass attributes to the filter icon's DOM element.
     */
    filterIcon?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the list container's DOM element.
     */
    listContainer?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the VirtualScroller component.
     * @see {@link ScrollerOptions}
     */
    virtualScroller?: ScrollerPassThrough;
    /**
     * Used to pass attributes to the list's DOM element.
     */
    list?: PassThroughOption<HTMLUListElement, I>;
    /**
     * Used to pass attributes to the option group's DOM element.
     */
    optionGroup?: PassThroughOption<HTMLLIElement, I>;
    /**
     * Used to pass attributes to the option group label's DOM element.
     */
    optionGroupLabel?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the option's DOM element.
     */
    option?: PassThroughOption<HTMLLIElement, I>;
    /**
     * Used to pass attributes to the option check icon's DOM element.
     */
    optionCheckIcon?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the option blank icon's DOM element.
     */
    optionBlankIcon?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the option label's DOM element.
     */
    optionLabel?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the empty message's DOM element.
     */
    emptyMessage?: PassThroughOption<HTMLLIElement, I>;
    /**
     * Used to pass attributes to the hidden first focusable element's DOM element.
     */
    hiddenFirstFocusableEl?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the hidden filter result's DOM element.
     */
    hiddenFilterResult?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the hidden empty message's DOM element.
     */
    hiddenEmptyMessage?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the hidden selected message's DOM element.
     */
    hiddenSelectedMessage?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the hidden last focusable element's DOM element.
     */
    hiddenLastFocusableEl?: PassThroughOption<HTMLSpanElement, I>;
}

/**
 * Defines valid pass-through options in Select component.
 * @see {@link SelectPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type SelectPassThrough<I = unknown> = PassThrough<I, SelectPassThroughOptions<I>>;

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
    originalEvent?: Event;
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
