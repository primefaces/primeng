import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption } from 'primeng/api';
import { ToggleButton } from 'primeng/togglebutton';
/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link ToggleButtonProps.pt}
 * @group Interface
 */
export interface ToggleButtonPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the icon's DOM element.
     */
    icon?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the label's DOM element.
     */
    label?: PassThroughOption<HTMLSpanElement, I>;
}

/**
 * Custom passthrough attributes for each DOM elements
 * @group Interface
 */
export type ToggleButtonPassThrough<I = unknown> = PassThrough<I, ToggleButtonPassThroughOptions<I>>;

/**
 * Custom change event.
 * @see {@link ToggleButton.onChange}
 * @group Events
 */
export interface ToggleButtonChangeEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Checked state as a boolean.
     */
    checked: boolean;
}

/**
 * Defines valid templates in ToggleButton.
 * @group Templates
 */
export interface ToggleButtonTemplates {
    /**
     * Custom icon template.
     * @param {boolean} context - checked state as boolean.
     */
    icon(context: {
        /**
         * Checked.
         */
        $implicit: boolean;
    }): TemplateRef<{ $implicit: boolean }>;

    /**
     * Custom content template.
     * @param {Object} context - content data.
     */
    content(context: {
        /**
         * Checked.
         */
        $implicit: boolean;
        /**
         * Label of the component.
         */
        label: string;
    }): TemplateRef<{ $implicit: boolean | null; label: string }>;
}
