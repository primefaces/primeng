import { TemplateRef } from '@angular/core';
import { Checkbox } from './checkbox';
/**
 * Custom change event.
 * @see {@link Checkbox.onChange}
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
    icon: TemplateRef<any>;
}
