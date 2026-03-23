import { TemplateRef } from '@angular/core';
import type { MotionOptions } from '@primeuix/motion';
import type { PassThrough, PassThroughOption } from 'primeng/api';
import type { ButtonPassThrough } from 'primeng/types/button';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link ScrollTop.pt}
 * @group Interface
 */
export interface ScrollTopPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the Button component.
     * @see {@link ButtonPassThrough}
     */
    pcButton?: ButtonPassThrough;
    /**
     * Used to pass options to the motion component/directive.
     */
    motion?: MotionOptions;
}

/**
 * Defines valid pass-through options in ScrollTop.
 * @see {@link ScrollTopPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type ScrollTopPassThrough<I = unknown> = PassThrough<I, ScrollTopPassThroughOptions<I>>;

/**
 * Custom icon template context.
 * @group Interface
 */
export interface ScrollTopIconTemplateContext {
    /**
     * Style class of the icon.
     */
    styleClass: string;
}

/**
 * Defines valid templates in ScrollTop.
 * @group Templates
 */
export interface ScrollTopTemplates {
    /**
     * Custom icon template.
     * @param {ScrollTopIconTemplateContext} context - icon context.
     */
    icon(context: ScrollTopIconTemplateContext): TemplateRef<ScrollTopIconTemplateContext>;
}
