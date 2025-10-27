import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption } from 'primeng/api';
import type { ButtonPassThrough } from 'primeng/types/button';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link Inplace.pt}
 * @group Interface
 */
export interface InplacePassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the display's DOM element.
     */
    display?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the Button component.
     * @see {@link ButtonPassThrough}
     */
    pcButton?: ButtonPassThrough;
}

/**
 * Defines valid pass-through options in Inplace.
 * @see {@link InplacePassThroughOptions}
 *
 * @template I Type of instance.
 */
export type InplacePassThrough<I = unknown> = PassThrough<I, InplacePassThroughOptions<I>>;

/**
 * Defines valid templates in Inplace.
 * @group Templates
 */
export interface InplaceTemplates {
    /**
     * Custom template of display.
     */
    display(): TemplateRef<any>;
    /**
     * Custom template of content.
     */
    content(): TemplateRef<any>;
    /**
     * Custom template of close icon.
     */
    closeicon(): TemplateRef<any>;
}
