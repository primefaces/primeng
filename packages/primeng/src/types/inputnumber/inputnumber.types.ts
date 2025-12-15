import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption } from 'primeng/api';
import type { InputTextPassThrough } from 'primeng/types/inputtext';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link InputNumber.pt}
 * @group Interface
 */
export interface InputNumberPassThroughOptions<I = unknown> {
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
     */
    pcInputText?: InputTextPassThrough;
    /**
     * Used to pass attributes to the clear icon's DOM element.
     */
    clearIcon?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the button group's DOM element.
     */
    buttonGroup?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the increment button's DOM element.
     */
    incrementButton?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the decrement button's DOM element.
     */
    decrementButton?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the increment button icon's DOM element.
     */
    incrementButtonIcon?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the decrement button icon's DOM element.
     */
    decrementButtonIcon?: PassThroughOption<HTMLSpanElement, I>;
}

/**
 * Defines valid pass-through options in InputNumber component.
 * @see {@link InputNumberPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type InputNumberPassThrough<I = unknown> = PassThrough<I, InputNumberPassThroughOptions<I>>;

/**
 * Custom InputNumber input event.
 * @see {@link onInput}
 * @group Interface
 */
export interface InputNumberInputEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Input value.
     */
    value: number | null;
    /**
     * Formatted value.
     */
    formattedValue: string;
}

/**
 * Defines valid templates in InputNumber.
 * @group Templates
 */
export interface InputNumberTemplates {
    /**
     * Custom clear icon template.
     */
    clearicon(): TemplateRef<void>;
    /**
     * Custom increment button icon template.
     */
    incrementbuttonicon(): TemplateRef<void>;
    /**
     * Custom decrement button icon template.
     */
    decrementbuttonicon(): TemplateRef<void>;
}
