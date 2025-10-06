import { TemplateRef } from '@angular/core';
import { PassThrough, PassThroughOption } from 'primeng/api';
import { Card } from './card';
/**
 * Defines passthrough(pt) options type in component.
 */
export declare type CardPassThroughOption<E> = PassThroughOption<E, Card>;

/**
 * Custom passthrough(pt) options.
 * @see {@link CardProps.pt}
 */
export interface CardPassThroughOptions {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: CardPassThroughOption<HTMLElement>;
    /**
     * Used to pass attributes to the header's DOM element.
     */
    header?: CardPassThroughOption<HTMLDivElement>;
    /**
     * Used to pass attributes to the body's DOM element.
     */
    body?: CardPassThroughOption<HTMLDivElement>;
    /**
     * Used to pass attributes to the subtitle's DOM element.
     */
    subtitle?: CardPassThroughOption<HTMLDivElement>;
    /**
     * Used to pass attributes to the title's DOM element.
     */
    title?: CardPassThroughOption<HTMLDivElement>;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: CardPassThroughOption<HTMLDivElement>;
    /**
     * Used to pass attributes to the footer's DOM element.
     */
    footer?: CardPassThroughOption<HTMLDivElement>;
}

export type CardPassThrough = PassThrough<Card, CardPassThroughOptions>;

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
