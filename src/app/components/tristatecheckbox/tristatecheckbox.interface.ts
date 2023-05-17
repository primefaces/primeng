import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in TriStateCheckbox.
 * @group Templates
 */
export interface TriStateCheckboxTemplates {
    /**
     * Custom check icon template.
     */
    checkicon: TemplateRef<any> | null;
    /**
     * Custom uncheck icon template.
     */
    uncheckicon: TemplateRef<any> | null;
}
/**
 * Custom change event.
 * @see {@link TriStateCheckbox.onChange}
 * @event
 */
export interface TriStateCheckboxChangeEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Value of the checkbox.
     */
    value: boolean | null;
}
