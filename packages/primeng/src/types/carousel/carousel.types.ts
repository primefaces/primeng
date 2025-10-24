import type { PassThrough, PassThroughOption } from 'primeng/api';
import type { ButtonPassThroughOptions } from 'primeng/button';
import type { Carousel } from 'primeng/carousel';

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
