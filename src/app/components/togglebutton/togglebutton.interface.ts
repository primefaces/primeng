import { TemplateRef } from '@angular/core';
import { ToggleButton } from './togglebutton';

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
     * Boolean value to represent checked state.
     */
    checked: boolean | undefined;
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
