import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption } from 'primeng/api';
import { ScrollerOptions } from 'primeng/api';
import type { ChipPassThrough } from 'primeng/types/chip';
import type { InputTextPassThrough } from 'primeng/types/inputtext';
import type { OverlayPassThrough } from 'primeng/types/overlay';
import type { VirtualScrollerPassThrough } from 'primeng/types/scroller';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link AutoComplete.pt}
 * @group Interface
 */
export interface AutoCompletePassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the InputText component.
     * @see {@link InputTextPassThrough}
     */
    pcInputText?: InputTextPassThrough;
    /**
     * Used to pass attributes to the input multiple's DOM element.
     */
    inputMultiple?: PassThroughOption<HTMLUListElement, I>;
    /**
     * Used to pass attributes to the chip item's DOM element.
     */
    chipItem?: PassThroughOption<HTMLLIElement, I>;
    /**
     * Used to pass attributes to the Chip component.
     * @see {@link ChipPassThrough}
     */
    pcChip?: ChipPassThrough;
    /**
     * Used to pass attributes to the chip icon's DOM element.
     */
    chipIcon?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the input chip's DOM element.
     */
    inputChip?: PassThroughOption<HTMLLIElement, I>;
    /**
     * Used to pass attributes to the clear icon's DOM element.
     */
    clearIcon?: PassThroughOption<SVGElement, I>;
    /**
     * Used to pass attributes to the loader's DOM element.
     */
    loader?: PassThroughOption<SVGElement, I>;
    /**
     * Used to pass attributes to the dropdown button's DOM element.
     */
    dropdown?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the Overlay component.
     * @see {@link OverlayPassThrough}
     */
    pcOverlay?: OverlayPassThrough;
    /**
     * Used to pass attributes to the overlay's DOM element.
     */
    overlay?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the list container's DOM element.
     */
    listContainer?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the Scroller component.
     * @see {@link VirtualScrollerPassThrough}
     */
    pcScroller?: VirtualScrollerPassThrough;
    /**
     * Used to pass attributes to the list's DOM element.
     */
    list?: PassThroughOption<HTMLUListElement, I>;
    /**
     * Used to pass attributes to the option group's DOM element.
     */
    optionGroup?: PassThroughOption<HTMLLIElement, I>;
    /**
     * Used to pass attributes to the option's DOM element.
     */
    option?: PassThroughOption<HTMLLIElement, I>;
    /**
     * Used to pass attributes to the empty message's DOM element.
     */
    emptyMessage?: PassThroughOption<HTMLLIElement, I>;
}

/**
 * Defines valid pass-through options in AutoComplete.
 * @see {@link AutoCompletePassThroughOptions}
 *
 * @template I Type of instance.
 */
export type AutoCompletePassThrough<I = unknown> = PassThrough<I, AutoCompletePassThroughOptions<I>>;

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
    query?: string;
}
/**
 * Custom select event.
 * @see {@link AutoComplete.onSelect}
 * @group Events
 */
export interface AutoCompleteSelectEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Selected value.
     */
    value: any;
}
/**
 * Custom unselect event.
 * @see {@link AutoComplete.onUnSelect}
 * @group Events
 */
export interface AutoCompleteUnselectEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Removed value.
     */
    value: any;
}
/**
 * Custom add event.
 * @see {@link AutoComplete.onAdd}
 * @group Events
 */
export interface AutoCompleteAddEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Added value.
     */
    value: any;
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
 * Custom item template context.
 * @group Interface
 */
export interface AutoCompleteItemTemplateContext<T = any> {
    /**
     * Data of the option.
     */
    $implicit: T;
    /**
     * Index of the option.
     */
    index: number;
}

/**
 * Custom group template context.
 * @group Interface
 */
export interface AutoCompleteGroupTemplateContext<T = any> {
    /**
     * Group option.
     */
    $implicit: T;
}

/**
 * Custom selected item template context.
 * @group Interface
 */
export interface AutoCompleteSelectedItemTemplateContext<T = any> {
    /**
     * Selected option value.
     */
    $implicit: T;
}

/**
 * Custom loader template context.
 * @group Interface
 */
export interface AutoCompleteLoaderTemplateContext {
    /**
     * Virtual scroller options.
     */
    options: ScrollerOptions;
}

/**
 * Custom remove icon template context.
 * @group Interface
 */
export interface AutoCompleteRemoveIconTemplateContext {
    /**
     * Style class of the icon.
     */
    class: string;
    /**
     * Callback to remove the item.
     */
    removeCallback: (event: Event, index: number) => void;
    /**
     * Index of the item.
     */
    index: number;
}

/**
 * Defines valid templates in AutoComplete.
 * @group Templates
 */
export interface AutoCompleteTemplates<T = any> {
    /**
     * Custom item template.
     * @param {Object} context - option data.
     */
    item(context: AutoCompleteItemTemplateContext<T>): TemplateRef<AutoCompleteItemTemplateContext<T>>;
    /**
     * Custom group template.
     * @param {Object} context - group data.
     */
    group(context: AutoCompleteGroupTemplateContext<T>): TemplateRef<AutoCompleteGroupTemplateContext<T>>;
    /**
     * Custom selected item template, only supported in multiple mode.
     * @param {Object} context - selected item data.
     */
    selecteditem(context: AutoCompleteSelectedItemTemplateContext<T>): TemplateRef<AutoCompleteSelectedItemTemplateContext<T>>;
    /**
     * Custom header template.
     */
    header(): TemplateRef<void>;
    /**
     * Custom empty template.
     */
    empty(): TemplateRef<void>;
    /**
     * Custom footer template.
     */
    footer(): TemplateRef<void>;
    /**
     * Custom loader template.
     * @param {Object} context - scroller options.
     */
    loader(context: AutoCompleteLoaderTemplateContext): TemplateRef<AutoCompleteLoaderTemplateContext>;
    /**
     * Custom remove icon template.
     * @param {Object} context - icon context.
     */
    removeicon(context: AutoCompleteRemoveIconTemplateContext): TemplateRef<AutoCompleteRemoveIconTemplateContext>;
    /**
     * Custom loading icon template.
     */
    loadingicon(): TemplateRef<void>;
    /**
     * Custom clear icon template.
     */
    clearicon(): TemplateRef<void>;
    /**
     * Custom dropdown icon template.
     */
    dropdownicon(): TemplateRef<void>;
}
