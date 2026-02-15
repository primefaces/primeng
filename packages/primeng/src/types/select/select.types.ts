import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption, ScrollerOptions } from 'primeng/api';
import type { IconFieldPassThrough } from 'primeng/types/iconfield';
import type { InputIconPassThrough } from 'primeng/types/inputicon';
import type { InputTextPassThrough } from 'primeng/types/inputtext';
import type { OverlayPassThrough } from 'primeng/types/overlay';
import type { VirtualScrollerPassThrough } from 'primeng/types/scroller';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link Select.pt}
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
    virtualScroller?: VirtualScrollerPassThrough;
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
    /**
     * The current value of the filter.
     */
    filter: string | null;
}

/**
 * Custom item template context.
 * @group Interface
 */
export interface SelectItemTemplateContext<T = any> {
    /**
     * Data of the option.
     */
    $implicit: T;
}

/**
 * Custom selected item template context.
 * @group Interface
 */
export interface SelectSelectedItemTemplateContext<T = any> {
    /**
     * Selected option value.
     */
    $implicit: T;
}

/**
 * Custom group template context.
 * @group Interface
 */
export interface SelectGroupTemplateContext<T = any> {
    /**
     * Group option.
     */
    $implicit: T;
}

/**
 * Custom filter template context.
 * @group Interface
 */
export interface SelectFilterTemplateContext {
    /**
     * Filter options.
     */
    options: SelectFilterOptions;
}

/**
 * Custom loader template context.
 * @group Interface
 */
export interface SelectLoaderTemplateContext {
    /**
     * Virtual scroller options.
     */
    options: ScrollerOptions;
}

/**
 * Custom icon template context.
 * @group Interface
 */
export interface SelectIconTemplateContext {
    /**
     * Style class of the icon.
     */
    class: string;
}

/**
 * Defines valid templates in Select.
 * @group Templates
 */
export interface SelectTemplates<T = any> {
    /**
     * Custom item template.
     * @param {Object} context - item data.
     */
    item(context: SelectItemTemplateContext<T>): TemplateRef<SelectItemTemplateContext<T>>;
    /**
     * Custom selected item template.
     * @param {Object} context - selected item data.
     */
    selectedItem(context: SelectSelectedItemTemplateContext<T>): TemplateRef<SelectSelectedItemTemplateContext<T>>;
    /**
     * Custom header template.
     */
    header(): TemplateRef<void>;
    /**
     * Custom filter template.
     * @param {SelectFilterOptions} options - filter options.
     */
    filter(context: SelectFilterTemplateContext): TemplateRef<SelectFilterTemplateContext>;
    /**
     * Custom footer template.
     */
    footer(): TemplateRef<void>;
    /**
     * Custom empty filter template.
     */
    emptyfilter(): TemplateRef<void>;
    /**
     * Custom empty template.
     */
    empty(): TemplateRef<void>;
    /**
     * Custom group template.
     */
    group(context: SelectGroupTemplateContext<T>): TemplateRef<SelectGroupTemplateContext<T>>;
    /**
     * Custom loader template. This template can be used with virtualScroll.
     * @param {ScrollerOptions} options - virtual scroller options.
     */
    loader(context: SelectLoaderTemplateContext): TemplateRef<SelectLoaderTemplateContext>;
    /**
     * Custom select icon template.
     * @param {Object} context - icon context.
     */
    dropdownicon(context: SelectIconTemplateContext): TemplateRef<SelectIconTemplateContext>;
    /**
     * Custom clear icon template.
     * @param {Object} context - icon context.
     */
    clearicon(context: SelectIconTemplateContext): TemplateRef<SelectIconTemplateContext>;
    /**
     * Custom filter icon template.
     */
    filtericon(): TemplateRef<void>;
    /**
     * Custom loading icon template.
     */
    loadingicon(): TemplateRef<void>;
}
