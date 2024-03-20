import { TemplateRef } from '@angular/core';

/**
 * Defines the custom events used by the component's emit.
 * @group Events
 */
export interface InputOtpTemplateEvents {
    /**
     * Input event.
     */
    input: Function;
    /**
     * Keydown event.
     */
    keydown: Function;
    /**
     * Focus event.
     */
    focus: Function;
    /**
     * Blur event.
     */
    blur: Function;
    /**
     * Paste event.
     */
    paste: Function;
}

/**
 * Defines valid templates in InputOtp.
 * @group Templates
 */
export interface InputOtpTemplates {
    /**
     * Custom template of input.
     * @param {Object} context
     */
    input(context: {
        /**
         * Input value.
         */
        $implicit: any;
        /**
         * Events of the component
         */
        events: InputOtpTemplateEvents;
    }): TemplateRef<{ $implicit: any; events: InputOtpTemplateEvents }>;
}

/**
 * Custom change event.
 * @see {@link InputOtp.onChange}
 * @group Events
 */
export interface InputOtpChangeEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Selected value.
     */
    value: any;
}
