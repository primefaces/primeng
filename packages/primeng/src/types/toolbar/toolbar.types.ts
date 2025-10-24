import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption } from 'primeng/api';
import type { Toolbar } from 'primeng/toolbar';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link Toolbar.pt}
 * @group Interface
 */
export interface ToolbarPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the start's DOM element.
     */
    start?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the center's DOM element.
     */
    center?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the right's DOM element.
     */
    end?: PassThroughOption<HTMLDivElement, I>;
}

/**
 * Defines valid pass-through options in Toolbar component.
 * @see {@link ToolbarPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type ToolbarPassThrough<I = unknown> = PassThrough<I, ToolbarPassThroughOptions<I>>;

/**
 * Defines valid templates in Toolbar.
 * @group Templates
 */
export interface ToolbarTemplates {
    /**
     * Custom start content.
     */
    start(): TemplateRef<any>;
    /**
     * Custom end content.
     */
    end(): TemplateRef<any>;
    /**
     * Custom center content.
     */
    center(): TemplateRef<any>;
}
