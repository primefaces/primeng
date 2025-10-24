import type { PassThrough, PassThroughOption } from 'primeng/api';
import { TemplateRef } from '@angular/core';
import type { Rating } from 'primeng/rating';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link Rating.pt}
 * @group Interface
 */
export interface RatingPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the option's DOM element.
     */
    option?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the on icon's DOM element.
     */
    onIcon?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the off icon's DOM element.
     */
    offIcon?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the hidden option input container's DOM element.
     */
    hiddenOptionInputContainer?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the hidden option input's DOM element.
     */
    hiddenOptionInput?: PassThroughOption<HTMLInputElement, I>;
}

/**
 * Defines valid pass-through options in Rating component.
 * @see {@link RatingPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type RatingPassThrough<I = unknown> = PassThrough<I, RatingPassThroughOptions<I>>;

/**
 * Custom change event.
 * @see {@link Rating.onRate}
 * @group Events
 */
export interface RatingRateEvent {
    /**
     * Browser event
     */
    originalEvent: Event;
    /**
     * Selected option value
     */
    value: number;
}
/**
 * Defines valid templates in Rating.
 * @group Templates
 */
export interface RatingTemplates {
    /**
     * Custom on icon template.
     */
    onicon(): TemplateRef<any>;
    /**
     * Custom off icon template.
     */
    officon(): TemplateRef<any>;
    /**
     * Custom cancel icon template.
     */
    cancelicon(): TemplateRef<any>;
}
