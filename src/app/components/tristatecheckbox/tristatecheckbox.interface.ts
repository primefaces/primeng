import { TemplateRef } from '@angular/core';
import { TriStateCheckbox } from './tristatecheckbox';

/**
 * Defines valid templates in TriStateCheckbox.
 * @group Templates
 */
export interface TriStateCheckboxTemplates {
    /**
     * Custom check icon template.
     */
    checkicon(): TemplateRef<any>;
    /**
     * Custom uncheck icon template.
     */
    uncheckicon(): TemplateRef<any>;
}
/**
 * Custom change event.
 * @see {@link TriStateCheckbox.onChange}
 * @group Events
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
