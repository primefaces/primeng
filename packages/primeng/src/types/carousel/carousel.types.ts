import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption } from 'primeng/api';
import type { ButtonPassThroughOptions } from 'primeng/types/button';

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
    /**
     * Used to pass attributes to the header's DOM element.
     */
    header?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the content container's DOM element.
     */
    contentContainer?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the previous button's DOM element.
     */
    pcPrevButton?: ButtonPassThroughOptions;
    /**
     * Used to pass attributes to the viewport's DOM element.
     */
    viewport?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the item list's DOM element.
     */
    itemList?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the item's DOM element.
     */
    item?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the item clone's DOM element.
     */
    itemClone?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the next button's DOM element.
     */
    pcNextButton?: ButtonPassThroughOptions;
    /**
     * Used to pass attributes to the indicator list's DOM element.
     */
    indicatorList?: PassThroughOption<HTMLUListElement, I>;
    /**
     * Used to pass attributes to the indicator's DOM element.
     */
    indicator?: PassThroughOption<HTMLLIElement, I>;
    /**
     * Used to pass attributes to the indicator button's DOM element.
     */
    indicatorButton?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the footer's DOM element.
     */
    footer?: PassThroughOption<HTMLDivElement, I>;
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
