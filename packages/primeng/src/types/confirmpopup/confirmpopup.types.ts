import type { Confirmation, PassThrough, PassThroughOption } from 'primeng/api';
import type { ButtonPassThrough } from 'primeng/types/button';
import { TemplateRef } from '@angular/core';
import type { MotionOptions } from '@primeuix/motion';

/**
 * Element to receive the focus when the popup gets visible.
 * @group Types
 */
export type ConfirmPopupDefaultFocus = 'accept' | 'reject' | 'none';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link ConfirmPopup.pt}
 * @group Interface
 */
export interface ConfirmPopupPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the icon's DOM element.
     */
    icon?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the message's DOM element.
     */
    message?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the footer's DOM element.
     */
    footer?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the reject Button component.
     * @see {@link ButtonPassThrough}
     */
    pcRejectButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the accept Button component.
     * @see {@link ButtonPassThrough}
     */
    pcAcceptButton?: ButtonPassThrough;
    /**
     * Used to pass options to the motion component/directive.
     */
    motion?: MotionOptions;
}

/**
 * Defines valid pass-through options in ConfirmPopup.
 * @see {@link ConfirmPopupPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type ConfirmPopupPassThrough<I = unknown> = PassThrough<I, ConfirmPopupPassThroughOptions<I>>;

/**
 * Custom headless template context.
 * @group Interface
 */
export interface ConfirmPopupHeadlessTemplateContext {
    /**
     * Confirmation instance.
     */
    $implicit: Confirmation | null | undefined;
}

/**
 * Custom content template context.
 * @group Interface
 */
export interface ConfirmPopupContentTemplateContext {
    /**
     * Confirmation instance.
     */
    $implicit: Confirmation | null | undefined;
}

/**
 * Defines valid templates in ConfirmPopup.
 * @group Templates
 */
export interface ConfirmPopupTemplates {
    /**
     * Custom content template.
     * @param {Object} context - content context.
     */
    content(context: ConfirmPopupContentTemplateContext): TemplateRef<ConfirmPopupContentTemplateContext>;
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
    headless(context: ConfirmPopupHeadlessTemplateContext): TemplateRef<ConfirmPopupHeadlessTemplateContext>;
}
