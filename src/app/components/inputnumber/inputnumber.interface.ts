import { TemplateRef } from '@angular/core';
import { InputNumber } from './inputnumber';
/**
 * Custom input event.
 * @see {@link InputNumber.onInput}
 */
export interface InputNumberInputEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Input value.
     */
    value: string;
    /**
     * Selected option value.
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
    clearicon: TemplateRef<any>;
    /**
     * Custom increment button icon template.
     */
    incrementbuttonicon: TemplateRef<any>;
    /**
     * Custom decrement button icon template.
     */
    decrementbuttonicon: TemplateRef<any>;
}
