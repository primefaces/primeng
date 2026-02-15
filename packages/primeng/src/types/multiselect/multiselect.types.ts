import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption, ScrollerOptions } from 'primeng/api';
import type { CheckboxPassThrough } from 'primeng/types/checkbox';
import type { ChipPassThrough } from 'primeng/types/chip';
import type { IconFieldPassThrough } from 'primeng/types/iconfield';
import type { InputIconPassThrough } from 'primeng/types/inputicon';
import type { InputTextPassThrough } from 'primeng/types/inputtext';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 * @see {@link MultiSelect.pt}
 * @group Interface
 */
export interface MultiSelectPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the label container's DOM element.
     */
    labelContainer?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the label's DOM element.
     */
    label?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the clear icon's DOM element.
     */
    clearIcon?: PassThroughOption<SVGElement, I>;
    /**
     * Used to pass attributes to the chip item's DOM element.
     */
    chipItem?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the Chip component.
     * @see {@link ChipPassThrough}
     */
    pcChip?: ChipPassThrough;
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
    dropdownIcon?: PassThroughOption<SVGElement, I>;
    /**
     * Used to pass attributes to the overlay's DOM element.
     */
    overlay?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the header's DOM element.
     */
    header?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the header checkbox component.
     * @see {@link CheckboxPassThrough}
     */
    pcHeaderCheckbox?: CheckboxPassThrough;
    /**
     * Used to pass attributes to the IconField component.
     * @see {@link IconFieldPassThrough}
     */
    pcFilterContainer?: IconFieldPassThrough;
    /**
     * Used to pass attributes to the InputText component.
     * @see {@link InputTextPassThrough}
     */
    pcFilter?: InputTextPassThrough;
    /**
     * Used to pass attributes to the InputIcon component.
     * @see {@link InputIconPassThrough}
     */
    pcFilterIconContainer?: InputIconPassThrough;
    /**
     * Used to pass attributes to the filter icon's DOM element.
     */
    filterIcon?: PassThroughOption<SVGElement, I>;
    /**
     * Used to pass attributes to the list container's DOM element.
     */
    listContainer?: PassThroughOption<HTMLDivElement, I>;
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
     * Used to pass attributes to the option checkbox component.
     * @see {@link CheckboxPassThrough}
     */
    pcOptionCheckbox?: CheckboxPassThrough;
    /**
     * Used to pass attributes to the empty message's DOM element.
     */
    emptyMessage?: PassThroughOption<HTMLLIElement, I>;
}

/**
 * Defines valid pass-through options in MultiSelect.
 * @see {@link MultiSelectPassThroughOptions}
 * @template I Type of instance.
 */
export type MultiSelectPassThrough<I = unknown> = PassThrough<I, MultiSelectPassThroughOptions<I>>;

/**
 * Callbacks to invoke on filter or reset.
 * @group Interface
 */
export interface MultiSelectFilterOptions {
    filter?: (value?: any) => void;
    reset?: () => void;
}

/**
 * Custom change event.
 * @see {@link MultiSelect.onChange}
 * @group Events
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
 * Custom change event.
 * @see {@link MultiSelect.onSelectAllChange}
 * @group Events
 */
export interface MultiSelectSelectAllChangeEvent {
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
 * @see {@link MultiSelect.onFilter}
 * @group Events
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
 * @group Events
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
 * @extends {MultiSelectFocusEvent}
 * @group Events
 */
export interface MultiSelectBlurEvent extends MultiSelectFocusEvent {}

/**
 * Custom lazy load event.
 * @see {@link MultiSelect.onLazyLoad}
 * @group Events
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
    /**
     * The current value of the filter.
     */
    filter: string | null;
}

/**
 * Custom remove event.
 * @see {@link MultiSelect.onRemove}
 * @group Events
 */
export interface MultiSelectRemoveEvent {
    /**
     * Value after the item removed.
     */
    newValue: object;
    /**
     * Removed value.
     */
    removed: unknown;
}

/**
 * Custom item template context.
 * @group Interface
 */
export interface MultiSelectItemTemplateContext<T = any> {
    /**
     * Data of the option.
     */
    $implicit: T;
}

/**
 * Custom selected items template context.
 * @group Interface
 */
export interface MultiSelectSelectedItemsTemplateContext<T = any> {
    /**
     * Selected options value.
     */
    $implicit: T[];
    /**
     * Function to remove a chip.
     */
    removeChip: (chip: T, event: MouseEvent) => void;
}

/**
 * Custom group template context.
 * @group Interface
 */
export interface MultiSelectGroupTemplateContext<T = any> {
    /**
     * Group option.
     */
    $implicit: T;
}

/**
 * Custom filter template context.
 * @group Interface
 */
export interface MultiSelectFilterTemplateContext {
    /**
     * Filter options.
     */
    options: MultiSelectFilterOptions;
}

/**
 * Custom loader template context.
 * @group Interface
 */
export interface MultiSelectLoaderTemplateContext {
    /**
     * Virtual scroller options.
     */
    options: ScrollerOptions;
}

/**
 * Custom dropdown icon template context.
 * @group Interface
 */
export interface MultiSelectDropdownIconTemplateContext {
    /**
     * DataP attributes.
     */
    dataP: string;
}

/**
 * Custom chip icon template context.
 * @group Interface
 */
export interface MultiSelectChipIconTemplateContext {
    /**
     * Style class of the icon.
     */
    class: string;
}

/**
 * Custom header checkbox icon template context.
 * @group Interface
 */
export interface MultiSelectHeaderCheckboxIconTemplateContext {
    /**
     * Defines if all items are selected.
     */
    checked: boolean;
    /**
     * Defines if items are partially selected.
     */
    partialSelected: boolean;
    /**
     * Style class of the icon.
     */
    class: string;
}

/**
 * Custom item checkbox icon template context.
 * @group Interface
 */
export interface MultiSelectItemCheckboxIconTemplateContext {
    /**
     * Selection status of the item.
     */
    checked: boolean;
    /**
     * Style class of the icon.
     */
    class: string;
}

/**
 * Defines valid templates in MultiSelect.
 * @group Templates
 */
export interface MultiSelectTemplates<T = any> {
    /**
     * Custom item template.
     * @param {Object} context - item data.
     */
    item(context: MultiSelectItemTemplateContext<T>): TemplateRef<MultiSelectItemTemplateContext<T>>;
    /**
     * Custom selected items template.
     * @param {Object} context - selected items data.
     */
    selecteditems(context: MultiSelectSelectedItemsTemplateContext<T>): TemplateRef<MultiSelectSelectedItemsTemplateContext<T>>;
    /**
     * Custom header template.
     */
    header(): TemplateRef<void>;
    /**
     * Custom filter template.
     * @param {MultiSelectFilterOptions} options - filter options.
     */
    filter(context: MultiSelectFilterTemplateContext): TemplateRef<MultiSelectFilterTemplateContext>;
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
    group(context: MultiSelectGroupTemplateContext<T>): TemplateRef<MultiSelectGroupTemplateContext<T>>;
    /**
     * Custom loader template. This template can be used with virtualScroll.
     * @param {ScrollerOptions} options - virtual scroller options.
     */
    loader(context: MultiSelectLoaderTemplateContext): TemplateRef<MultiSelectLoaderTemplateContext>;
    /**
     * Custom dropdown trigger icon template.
     * @param {Object} context - icon context.
     */
    dropdownicon(context: MultiSelectDropdownIconTemplateContext): TemplateRef<MultiSelectDropdownIconTemplateContext>;
    /**
     * Custom clear icon template.
     */
    clearicon(): TemplateRef<void>;
    /**
     * Custom filter icon template.
     */
    filtericon(): TemplateRef<void>;
    /**
     * Custom loading icon template.
     */
    loadingicon(): TemplateRef<void>;
    /**
     * Custom check icon template for the header checkbox.
     * @param {Object} context - checkbox icon context.
     */
    headercheckboxicon(context: MultiSelectHeaderCheckboxIconTemplateContext): TemplateRef<MultiSelectHeaderCheckboxIconTemplateContext>;
    /**
     * Custom check icon template for the item checkbox.
     * @param {Object} context - checkbox icon context.
     */
    itemcheckboxicon(context: MultiSelectItemCheckboxIconTemplateContext): TemplateRef<MultiSelectItemCheckboxIconTemplateContext>;
    /**
     * Custom chip icon template.
     * @param {Object} context - icon context.
     */
    chipicon(context: MultiSelectChipIconTemplateContext): TemplateRef<MultiSelectChipIconTemplateContext>;
    /**
     * Custom remove token icon template.
     * @deprecated Use chipicon instead.
     * @param {Object} context - icon context.
     */
    removetokenicon(context: MultiSelectChipIconTemplateContext): TemplateRef<MultiSelectChipIconTemplateContext>;
}
