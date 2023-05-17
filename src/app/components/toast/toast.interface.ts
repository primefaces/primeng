import { TemplateRef } from '@angular/core';

export interface ToastBreakpointsType {
    /**
     * Breakpoint for responsive mode.
     */
    [key: string]: any;
}

/**
 * Defines valid templates in Toast.
 * @group Templates
 */
export interface ToastTemplates {
    /**
     * Custom template of message.
     */
    message(context: {
        /**
         * Data of the message.
         */
        $implicit: any;
    }): TemplateRef<{ $implicit: any }>;
}
