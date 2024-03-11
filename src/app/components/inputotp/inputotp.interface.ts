import { TemplateRef } from '@angular/core';

/**
 * Defines the custom events used by the component's emit.
 * @group Events
 */
export interface InputOtpTemplateEvents {
    input: Function;
    keydown: Function;
    focus: Function;
    blur: Function;
    paste: Function;
}

/**
 * InputOtp attr options
 */
export interface InputOtpTemplateAttrsOptions {
    /**
     * Input token value
     */
    value: string;
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
         * Events of the component
         */
        events: InputOtpTemplateEvents;
        /**
         * Attributes of the component
         */
        attrs: InputOtpTemplateAttrsOptions;
    }): TemplateRef<{ $implicit: any }>;
}
