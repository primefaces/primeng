import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption } from 'primeng/api';
/**
 * Defines valid pass-through options in ListBox component.
 * @template I Type of instance.
 *
 * @see {@link Listbox.pt}
 * @group Interface
 */
export interface ListBoxPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the header's DOM element.
     */
    header?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the Checkbox component.
     */
    pcCheckbox?: any;
    /**
     * Used to pass attributes to the IconField component.
     */
    pcFilterContainer?: any;
    /**
     * Used to pass attributes to the filter input's DOM element.
     */
    pcFilter?: any;
    /**
     * Used to pass attributes to the InputIcon component.
     */
    pcFilterIconContainer?: any;
    /**
     * Used to pass attributes to the filter icon's DOM element.
     */
    filterIcon?: PassThroughOption<SVGElement, I>;
    /**
     * Used to pass attributes to the hidden filter result's DOM element.
     */
    hiddenFilterResult?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the list container's DOM element.
     */
    listContainer?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the VirtualScroller component.
     */
    virtualScroller?: any;
    /**
     * Used to pass attributes to the list's DOM element.
     */
    list?: PassThroughOption<HTMLUListElement, I>;
    /**
     * Used to pass attributes to the option group's DOM element.
     */
    optionGroup?: PassThroughOption<HTMLLIElement, I, ListBoxContext>;
    /**
     * Used to pass attributes to the option's DOM element.
     */
    option?: PassThroughOption<HTMLLIElement, I, ListBoxContext>;
    /**
     * Used to pass attributes to the option check icon's DOM element.
     */
    optionCheckIcon?: PassThroughOption<SVGElement, I>;
    /**
     * Used to pass attributes to the option blank icon's DOM element.
     */
    optionBlankIcon?: PassThroughOption<SVGElement, I>;
    /**
     * Used to pass attributes to the empty message's DOM element.
     */
    emptyMessage?: PassThroughOption<HTMLLIElement, I>;
    /**
     * Used to pass attributes to the hidden empty message's DOM element.
     */
    hiddenEmptyMessage?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the hidden selected message's DOM element.
     */
    hiddenSelectedMessage?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the first hidden focusable element.
     */
    hiddenFirstFocusableEl?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the last hidden focusable element.
     */
    hiddenLastFocusableEl?: PassThroughOption<HTMLSpanElement, I>;
}

/**
 * Defines valid pass-through options in ListBox component.
 * @see {@link ListBoxPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type ListBoxPassThrough<I = unknown> = PassThrough<I, ListBoxPassThroughOptions<I>>;

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
}
/**
 * Custom filter event.
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
 * @group Events
 */
export interface ListboxClickEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Value of the component.
     */
    value: any;
    /**
     * Selected option
     */
    option?: any;
}
/**
 * Custom change event.
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
    /**
     * Custom checkmark template.
     */
    checkmark(context: {
        /**
         * Selection status.
         */
        $implicit: boolean;
    }): TemplateRef<{ $implicit: boolean }>;
}

/**
 * Defines context options for ListBox passthrough.
 * @group Interface
 */
export interface ListBoxContext {
    /**
     * Whether the option is selected.
     */
    selected?: boolean;
    /**
     * Whether the option is focused.
     */
    focused?: boolean;
    /**
     * Whether the option is disabled.
     */
    disabled?: boolean;
}
