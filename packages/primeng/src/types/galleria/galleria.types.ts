import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link GalleriaProps.pt}
 * @group Interface
 */
export interface GalleriaPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the mask's DOM element.
     */
    mask?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the close button's DOM element.
     */
    closeButton?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the close icon's DOM element.
     */
    closeIcon?: PassThroughOption<SVGElement, I>;
    /**
     * Used to pass attributes to the header's DOM element.
     */
    header?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the items container's DOM element.
     */
    itemsContainer?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the items's DOM element.
     */
    items?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the previous button's DOM element.
     */
    prevButton?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the previous button icon's DOM element.
     */
    prevButtonIcon?: PassThroughOption<SVGElement, I>;
    /**
     * Used to pass attributes to the item's DOM element.
     */
    item?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the next button's DOM element.
     */
    nextButton?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the next button icon's DOM element.
     */
    nextButtonIcon?: PassThroughOption<SVGElement, I>;
    /**
     * Used to pass attributes to the caption's DOM element.
     */
    caption?: PassThroughOption<HTMLDivElement, I>;
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
     * Used to pass attributes to the thumbnails's DOM element.
     */
    thumbnails?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the thumbnail content's DOM element.
     */
    thumbnailContent?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the thumbnail previous button's DOM element.
     */
    thumbnailPrevButton?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the thumbnail previous button icon's DOM element.
     */
    thumbnailPrevButtonIcon?: PassThroughOption<SVGElement, I>;
    /**
     * Used to pass attributes to the thumbnails viewport's DOM element.
     */
    thumbnailsViewport?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the thumbnail items's DOM element.
     */
    thumbnailItems?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the thumbnail item's DOM element.
     */
    thumbnailItem?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the thumbnail's DOM element.
     */
    thumbnail?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the thumbnail next button's DOM element.
     */
    thumbnailNextButton?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the thumbnail next button icon's DOM element.
     */
    thumbnailNextButtonIcon?: PassThroughOption<SVGElement, I>;
    /**
     * Used to pass attributes to the footer's DOM element.
     */
    footer?: PassThroughOption<HTMLDivElement, I>;
}

/**
 * Defines valid pass-through options in Galleria.
 * @see {@link GalleriaPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type GalleriaPassThrough<I = unknown> = PassThrough<I, GalleriaPassThroughOptions<I>>;
