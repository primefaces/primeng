import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link CardProps.pt}
 * @group Interface
 */
export interface CardPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the header's DOM element.
     */
    header?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the body's DOM element.
     */
    body?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the subtitle's DOM element.
     */
    subtitle?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the title's DOM element.
     */
    title?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the footer's DOM element.
     */
    footer?: PassThroughOption<HTMLDivElement, I>;
}

/**
 * Defines valid pass-through options in Card component.
 * @see {@link CardPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type CardPassThrough<I = unknown> = PassThrough<I, CardPassThroughOptions<I>>;

/**
 * Defines valid templates in Card.
 * @group Templates
 */
export interface CardTemplates {
    /**
     * Custom template of header.
     */
    header(): TemplateRef<any>;
    /**
     * Custom template of title.
     */
    title(): TemplateRef<any>;
    /**
     * Custom template of subtitle.
     */
    subtitle(): TemplateRef<any>;
    /**
     * Custom template of content.
     */
    content(): TemplateRef<any>;
    /**
     * Custom template of footer.
     */
    footer(): TemplateRef<any>;
}
