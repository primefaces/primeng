import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link Tag.pt}
 * @group Interface
 */
export interface TagPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the icon's DOM element.
     */
    icon?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the label's DOM element.
     */
    label?: PassThroughOption<HTMLSpanElement, I>;
}

/**
 * Defines valid pass-through options in Tag.
 * @see {@link TagPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type TagPassThrough<I = unknown> = PassThrough<I, TagPassThroughOptions<I>>;

/**
 * Defines valid templates in Tag.
 * @group Templates
 */
export interface TagTemplates {
    /**
     * Custom icon template.
     */
    icon(): TemplateRef<void>;
}
