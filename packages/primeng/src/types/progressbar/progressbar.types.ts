import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link ProgressBar.pt}
 * @group Interface
 */
export interface ProgressBarPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the value's DOM element.
     */
    value?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the label's DOM element.
     */
    label?: PassThroughOption<HTMLDivElement, I>;
}

/**
 * Defines valid pass-through options in ProgressBar.
 * @see {@link ProgressBarPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type ProgressBarPassThrough<I = unknown> = PassThrough<I, ProgressBarPassThroughOptions<I>>;

/**
 * Custom content template context.
 * @group Interface
 */
export interface ProgressBarContentTemplateContext {
    /**
     * Value of the progressbar.
     */
    $implicit: number | undefined;
}

/**
 * Defines valid templates in ProgressBar.
 * @group Templates
 */
export interface ProgressBarTemplates {
    /**
     * Custom template of content.
     * @param {ProgressBarContentTemplateContext} context - content context.
     */
    content(context: ProgressBarContentTemplateContext): TemplateRef<ProgressBarContentTemplateContext>;
}
