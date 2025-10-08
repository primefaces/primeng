import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link PopoverProps.pt}
 * @group Interface
 */
export interface PopoverPassThroughOptions<I = unknown> {
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
}

/**
 * Defines valid pass-through options in Popover.
 * @see {@link PopoverPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type PopoverPassThrough<I = unknown> = PassThrough<I, PopoverPassThroughOptions<I>>;

/**
 * Defines valid templates in OverlayPanel.
 * @group Templates
 */
export interface PopoverTemplates {
    /**
     * Custom template of content.
     * @param {Object} context - closeCallback.
     */
    content(context: { closeCallback: VoidFunction }): TemplateRef<{ closeCallback: VoidFunction }>;
    /**
     * Custom template of closeicon.
     */
    closeicon(): TemplateRef<any>;
}
