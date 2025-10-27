import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link ScrollPanel.pt}
 * @group Interface
 */
export interface ScrollPanelPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the content container's DOM element.
     */
    contentContainer?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the horizontal panel's DOM element.
     */
    barX?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the vertical panel's DOM element.
     */
    barY?: PassThroughOption<HTMLDivElement, I>;
}

/**
 * Defines valid pass-through options in ScrollPanel component.
 * @see {@link ScrollPanelPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type ScrollPanelPassThrough<I = unknown> = PassThrough<I, ScrollPanelPassThroughOptions<I>>;

/**
 * Defines valid templates in ScrollPanel.
 * @group Templates
 */
export interface ScrollPanelTemplates {
    /**
     * Custom content template.
     */
    content(): TemplateRef<any>;
}
