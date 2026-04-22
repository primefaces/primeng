import { TemplateRef } from '@angular/core';
import type { MotionOptions } from '@primeuix/motion';
import type { PassThrough, PassThroughOption, ToastMessageOptions } from 'primeng/api';

/**
 * Custom pass-through(pt) options for Toast.
 * @template I Type of instance.
 *
 * @see {@link Toast.pt}
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
    /**
     * Used to pass options to the motion component/directive.
     */
    motion?: MotionOptions;
}

/**
 * Defines valid pass-through options in Toast.
 * @see {@link ToastPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type ToastPassThrough<I = unknown> = PassThrough<I, ToastPassThroughOptions<I>>;

/**
 * Custom message template context.
 * @group Interface
 */
export interface ToastMessageTemplateContext {
    /**
     * Message instance.
     */
    $implicit: ToastMessageOptions | null | undefined;
}

/**
 * Custom headless template context.
 * @group Interface
 */
export interface ToastHeadlessTemplateContext {
    /**
     * Message instance.
     */
    $implicit: ToastMessageOptions | null | undefined;
    /**
     * Callback to close the toast.
     */
    closeFn: (event: Event) => void;
}

/**
 * Defines valid templates in Toast.
 * @group Templates
 */
export interface ToastTemplates {
    /**
     * Custom message template.
     * @param {ToastMessageTemplateContext} context - message context.
     */
    message(context: ToastMessageTemplateContext): TemplateRef<ToastMessageTemplateContext>;
    /**
     * Custom headless template.
     * @param {ToastHeadlessTemplateContext} context - headless context.
     */
    headless(context: ToastHeadlessTemplateContext): TemplateRef<ToastHeadlessTemplateContext>;
}

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
