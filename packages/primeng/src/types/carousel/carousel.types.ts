import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Defines the orientation of the carousel.
 * @group Types
 */
export type CarouselOrientation = 'horizontal' | 'vertical';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link Carousel.pt}
 * @group Interface
 */
export interface CarouselPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
}

/**
 * Defines valid pass-through options in Carousel.
 * @see {@link CarouselPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type CarouselPassThrough<I = unknown> = PassThrough<I, CarouselPassThroughOptions<I>>;

/**
 * Responsive options of the component.
 * @group Interface
 */
export interface CarouselResponsiveOptions {
    /**
     * Breakpoint for responsive mode. Exp; @media screen and (max-width: ${breakpoint}) {...}
     */
    breakpoint: string;
    /**
     * The number of visible items on breakpoint.
     */
    numVisible: number;
    /**
     * The number of scrolled items on breakpoint.
     */
    numScroll: number;
}
/**
 * Custom page event.
 * @group Events
 */
export interface CarouselPageEvent {
    /**
     * Current page.
     */
    page?: number;
}
/**
 * Custom item template context.
 * @group Interface
 */
export interface CarouselItemTemplateContext<T = any> {
    /**
     * Data of the item.
     */
    $implicit: T;
}

/**
 * Defines valid templates in Carousel.
 * @group Templates
 */
export interface CarouselTemplates<T = any> {
    /**
     * Custom header template.
     */
    header(): TemplateRef<void>;
    /**
     * Custom item template.
     * @param {Object} context - item data.
     */
    item(context: CarouselItemTemplateContext<T>): TemplateRef<CarouselItemTemplateContext<T>>;
    /**
     * Custom previous icon template.
     */
    previousicon(): TemplateRef<void>;
    /**
     * Custom next icon template.
     */
    nexticon(): TemplateRef<void>;
    /**
     * Custom footer template.
     */
    footer(): TemplateRef<void>;
}

/**
 * Defines valid pass-through options in CarouselContent component.
 * @template I Type of instance.
 * @group Interface
 */
export interface CarouselContentPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * @see {@link CarouselContentPassThroughOptions}
 * @template I Type of instance.
 */
export type CarouselContentPassThrough<I = unknown> = PassThrough<I, CarouselContentPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in CarouselItem component.
 * @template I Type of instance.
 * @group Interface
 */
export interface CarouselItemPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * @see {@link CarouselItemPassThroughOptions}
 * @template I Type of instance.
 */
export type CarouselItemPassThrough<I = unknown> = PassThrough<I, CarouselItemPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in CarouselIndicators component.
 * @template I Type of instance.
 * @group Interface
 */
export interface CarouselIndicatorsPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * @see {@link CarouselIndicatorsPassThroughOptions}
 * @template I Type of instance.
 */
export type CarouselIndicatorsPassThrough<I = unknown> = PassThrough<I, CarouselIndicatorsPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in CarouselNext directive.
 * @template I Type of instance.
 * @group Interface
 */
export interface CarouselNextPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * @see {@link CarouselNextPassThroughOptions}
 * @template I Type of instance.
 */
export type CarouselNextPassThrough<I = unknown> = PassThrough<I, CarouselNextPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in CarouselPrev directive.
 * @template I Type of instance.
 * @group Interface
 */
export interface CarouselPrevPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * @see {@link CarouselPrevPassThroughOptions}
 * @template I Type of instance.
 */
export type CarouselPrevPassThrough<I = unknown> = PassThrough<I, CarouselPrevPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in CarouselIndicator directive.
 * @template I Type of instance.
 * @group Interface
 */
export interface CarouselIndicatorPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * @see {@link CarouselIndicatorPassThroughOptions}
 * @template I Type of instance.
 */
export type CarouselIndicatorPassThrough<I = unknown> = PassThrough<I, CarouselIndicatorPassThroughOptions<I>>;
