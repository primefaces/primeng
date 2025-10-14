import { ElementRef, TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption } from 'primeng/api';
import { Overlay } from 'primeng/overlay';

/**
 * Custom panel show event.
 * @see {@link CascadeSelect.onShow}
 * @group Events
 */
export interface CascadeSelectShowEvent {
    /**
     * Overlay element.
     */
    overlay?: Overlay | ElementRef | TemplateRef<any> | HTMLElement | null | undefined;
    /**
     * Target element.
     */
    target?: Overlay | ElementRef | TemplateRef<any> | HTMLElement | null | undefined;
    /**
     * Overlay mode.
     */
    overlayMode?: 'modal' | 'overlay' | string;
}
/**
 * Custom panel hide event.
 * @see {@link CascadeSelect.onHide}
 * @extends {CascadeSelectShowEvent}
 * @group Events
 */
export interface CascadeSelectHideEvent extends CascadeSelectShowEvent {}
/**
 * Custom panel show event emits right before the panel is shown.
 * @see {@link CascadeSelect.onBeforeShow}
 * @extends {CascadeSelectShowEvent}
 * @group Events
 */
export interface CascadeSelectBeforeShowEvent extends CascadeSelectShowEvent {}
/**
 * Custom panel hide event emits right before the panel is hidden.
 * @see {@link CascadeSelect.onBeforeHide}
 * @extends {CascadeSelectShowEvent}
 * @group Events
 */
export interface CascadeSelectBeforeHideEvent extends CascadeSelectShowEvent {}
/**
 * Custom panel change event emits when selection changed.
 * @see {@link CascadeSelect.onChange}
 * @group Events
 */
export interface CascadeSelectChangeEvent {
    /**
     * Browser event.
     */
    originalEvent?: Event;
    /**
     * Selected value.
     */
    value?: any;
    /**
     * Focus state.
     */
    isFocus?: boolean;
}
/**
 * Defines valid templates in CascadeSelect.
 * @group Templates
 */
export interface CascadeSelectTemplates {
    /**
     * Custom value template.
     * @param {Object} context - value data.
     */
    value(context: {
        /**
         * Value.
         */
        $implicit: any;
        /**
         * Placeholder.
         */
        placeholder: string;
    }): TemplateRef<{ $implicit: any; placeholder: string }>;
    /**
     * Custom option template.
     * @param {Object} context - option data.
     */
    option(context: {
        /**
         * Option instance.
         */
        $implicit: any;
    }): TemplateRef<{ $implicit: any }>;
    /**
     * Custom dropdown trigger icon template.
     */
    triggericon(): TemplateRef<any>;
    /**
     * Custom clear icon template.
     */
    clearicon(): TemplateRef<any>;
    /**
     * Custom option group icon template.
     */
    optiongroupicon(): TemplateRef<any>;
    /**
     * Custom loading icon template.
     */
    loadingicon(): TemplateRef<any>;
}

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link CascadeSelectProps.pt}
 * @group Interface
 */
export interface CascadeSelectPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the hidden input wrapper's DOM element.
     */
    hiddenInputWrapper?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the hidden input's DOM element.
     */
    hiddenInput?: PassThroughOption<HTMLInputElement, I>;
    /**
     * Used to pass attributes to the label's DOM element.
     */
    label?: PassThroughOption<HTMLSpanElement, I>;
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
     * Used to pass attributes to the clear icon's DOM element.
     */
    clearIcon?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the overlay's DOM element.
     */
    overlay?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the list container's DOM element.
     */
    listContainer?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the list's DOM element.
     */
    list?: PassThroughOption<HTMLUListElement, I>;
    /**
     * Used to pass attributes to the option list's DOM element.
     */
    optionList?: PassThroughOption<HTMLUListElement, I>;
    /**
     * Used to pass attributes to the option's DOM element.
     */
    option?: PassThroughOption<HTMLLIElement, I>;
    /**
     * Used to pass attributes to the option content's DOM element.
     */
    optionContent?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the option text's DOM element.
     */
    optionText?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the group icon's DOM element.
     */
    groupIcon?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in CascadeSelect.
 * @see {@link CascadeSelectPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type CascadeSelectPassThrough<I = unknown> = PassThrough<I, CascadeSelectPassThroughOptions<I>>;
