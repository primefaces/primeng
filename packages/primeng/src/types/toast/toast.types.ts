import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption, ToastMessageOptions } from 'primeng/api';

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
    /**
     * Headless template.
     */
    headless(context: {
        /**
         * Data of the message.
         */
        $implicit: any;
    }): TemplateRef<{ $implicit: any }>;
}

/**
 * Custom pass-through(pt) options for Toast.
 * @template I Type of instance.
 *
 * @group Interface
 */
export interface ToastPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the message's DOM element.
     */
    message?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the message content's DOM element.
     */
    messageContent?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the message icon's DOM element.
     */
    messageIcon?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the message text's DOM element.
     */
    messageText?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the summary's DOM element.
     */
    summary?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the detail's DOM element.
     */
    detail?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the close button's DOM element.
     */
    closeButton?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the close icon's DOM element.
     */
    closeIcon?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in Toast.
 * @see {@link ToastPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type ToastPassThrough<I = unknown> = PassThrough<I, ToastPassThroughOptions<I>>;

/**
 * Defines the position type for Toast.
 */
export type ToastPositionType = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'center';

/**
 * Custom close event.
 * @see {@link Toast.onClose}
 * @group Events
 */
export interface ToastCloseEvent {
    /**
     * Message of the closed element.
     */
    message: ToastMessageOptions;
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
