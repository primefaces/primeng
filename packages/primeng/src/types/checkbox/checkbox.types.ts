import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom change event.
 * @see {@link Checkbox.onChange}
 * @group Events
 */
export interface CheckboxChangeEvent {
    /**
     * Checked value.
     */
    checked?: any;
    /**
     * Browser event.
     */
    originalEvent?: Event;
}

/**
 * Defines valid templates in Checkbox.
 * @group Templates
 */
export interface CheckboxTemplates {
    /**
     * Custom checkbox icon template
     */
    icon(context: {
        /**
         * State of the checkbox.
         */
        checked: boolean;
        /**
         * Class of the icon.
         */
        class: string;
        /**
         * DataP attributes.
         */
        dataP: string;
    }): TemplateRef<{ checked: boolean; class: string; dataP: string }>;
}

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link CheckboxProps.pt}
 * @group Interface
 */
export interface CheckboxPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the input's DOM element.
     */
    input?: PassThroughOption<HTMLInputElement, I>;
    /**
     * Used to pass attributes to the box's DOM element.
     */
    box?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the icon's DOM element.
     */
    icon?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in Checkbox.
 * @see {@link CheckboxPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type CheckboxPassThrough<I = unknown> = PassThrough<I, CheckboxPassThroughOptions<I>>;
