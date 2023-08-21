import { TemplateRef } from '@angular/core';
import { Message } from 'primeng/api';
import { Toast } from './toast';

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
 * @group Events
 */
export interface ToastCloseEvent {
    /**
     * Message of the closed element.
     */
    message: Message;
}
/**
 * Custom close event.
 * @see {@link ToastItem.onClose}
 */
export interface ToastItemCloseEvent extends ToastCloseEvent {
    /**
     * Index of the closed element.
     */
    index: number;
}
