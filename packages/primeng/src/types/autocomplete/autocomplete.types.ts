import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption } from 'primeng/api';
import { ScrollerOptions } from 'primeng/api';
import type { AutoComplete } from 'primeng/autocomplete';
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
     * Custom selected item template, only supported in multiple mode.
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
     * Custom remove icon template.
     */
    removeicon(context: {
        /**
         * Class of the removeicon.
         */
        class: string;
        /**
         * Remove callback.
         */
        removeCallback: (event: Event, index: number) => void;
        /**
         * Option index.
         */
        index: number;
    }): TemplateRef<{ class: string; removeCallback: (event: Event, index: number) => void; index: number }>;
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
