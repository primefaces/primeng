import { TemplateRef } from '@angular/core';
import { Toast } from './toast';
/**
 * Breakpoints of toast element.
 */
export interface ToastBreakpoints {
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
/**
 * Custom close event.
 * @see {@link Toast.onClose}
 */
export interface ToastCloseEvent {
    /**
     * Message of the closed element.
     */
    message?: string;
    /**
     * Index of the removed element.
     */
    index?: number;
}
