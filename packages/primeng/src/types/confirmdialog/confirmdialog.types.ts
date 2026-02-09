import { TemplateRef } from '@angular/core';
import type { Confirmation, PassThrough, PassThroughOption } from 'primeng/api';
import { DialogPassThrough } from 'primeng/types/dialog';
import type { ButtonPassThrough } from 'primeng/types/button';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link ConfirmDialog.pt}
 * @group Interface
 */
export interface ConfirmDialogPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     * @see {@link DialogPassThrough}
     */
    root?: DialogPassThrough;
    /**
     * Used to pass attributes to the mask's DOM element.
     */
    mask?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the icon's DOM element.
     */
    icon?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the message's DOM element.
     */
    message?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the resize handle's DOM element.
     */
    resizeHandle?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the header's DOM element.
     */
    header?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the title's DOM element.
     */
    title?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the header actions' DOM element.
     */
    headerActions?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the close Button component.
     * @see {@link ButtonPassThrough}
     */
    pcCloseButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the footer's DOM element.
     */
    footer?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the accept Button component.
     * @see {@link ButtonPassThrough}
     */
    pcAcceptButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the reject Button component.
     * @see {@link ButtonPassThrough}
     */
    pcRejectButton?: ButtonPassThrough;
}

/**
 * Defines valid pass-through options in ConfirmDialog.
 * @see {@link ConfirmDialogPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type ConfirmDialogPassThrough<I = unknown> = PassThrough<I, ConfirmDialogPassThroughOptions<I>>;

/**
 * Custom headless template context.
 * @group Interface
 */
export interface ConfirmDialogHeadlessTemplateContext {
    /**
     * Confirmation instance.
     */
    $implicit: Confirmation | null | undefined;
    /**
     * Callback to accept the confirmation.
     */
    onAccept: () => void;
    /**
     * Callback to reject the confirmation.
     */
    onReject: () => void;
}

/**
 * Custom message template context.
 * @group Interface
 */
export interface ConfirmDialogMessageTemplateContext {
    /**
     * Confirmation instance.
     */
    $implicit: Confirmation | null | undefined;
}

/**
 * Defines valid templates in ConfirmDialog.
 * @group Templates
 */
export interface ConfirmDialogTemplates {
    /**
     * Custom header template.
     */
    header(): TemplateRef<void>;
    /**
     * Custom footer template.
     */
    footer(): TemplateRef<void>;
    /**
     * Custom message template.
     * @param {Object} context - message context.
     */
    message(context: ConfirmDialogMessageTemplateContext): TemplateRef<ConfirmDialogMessageTemplateContext>;
    /**
     * Custom icon template.
     */
    icon(): TemplateRef<void>;
    /**
     * Custom reject icon template.
     */
    rejecticon(): TemplateRef<void>;
    /**
     * Custom accept icon template.
     */
    accepticon(): TemplateRef<void>;
    /**
     * Custom headless template.
     * @param {Object} context - headless context.
     */
    headless(context: ConfirmDialogHeadlessTemplateContext): TemplateRef<ConfirmDialogHeadlessTemplateContext>;
}
