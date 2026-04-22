import { TemplateRef } from '@angular/core';
import type { MotionOptions } from '@primeuix/motion';
import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link Galleria.pt}
 * @group Interface
 */
export interface GalleriaPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLDivElement, I>;
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
     * Used to pass attributes to the previous icon's DOM element.
     */
    prevIcon?: PassThroughOption<SVGElement, I>;
    /**
     * Used to pass attributes to the item's DOM element.
     */
    item?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the next button's DOM element.
     */
    nextButton?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the next icon's DOM element.
     */
    nextIcon?: PassThroughOption<SVGElement, I>;
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
     * Used to pass attributes to the thumbnail previous icon's DOM element.
     */
    thumbnailPrevIcon?: PassThroughOption<SVGElement, I>;
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
     * Used to pass attributes to the thumbnail next icon's DOM element.
     */
    thumbnailNextIcon?: PassThroughOption<SVGElement, I>;
    /**
     * Used to pass attributes to the footer's DOM element.
     */
    footer?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass options to the motion component/directive.
     */
    motion?: MotionOptions;
}

/**
 * Defines valid pass-through options in Galleria.
 * @see {@link GalleriaPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type GalleriaPassThrough<I = unknown> = PassThrough<I, GalleriaPassThroughOptions<I>>;

/**
 * Responsive options of the component.
 * @group Interface
 */
export interface GalleriaResponsiveOptions {
    /**
     * Breakpoint for responsive mode. Exp; @media screen and (max-width: ${breakpoint}) {...}
     */
    breakpoint: string;
    /**
     * The number of visible items on breakpoint.
     */
    numVisible: number;
}

/**
 * Custom indicator template context.
 * @group Interface
 */
export interface GalleriaIndicatorTemplateContext {
    /**
     * Index of the indicator.
     */
    $implicit: number;
}

/**
 * Custom item template context.
 * @group Interface
 */
export interface GalleriaItemTemplateContext<T = any> {
    /**
     * Item instance.
     */
    $implicit: T;
}

/**
 * Custom thumbnail template context.
 * @group Interface
 */
export interface GalleriaThumbnailTemplateContext<T = any> {
    /**
     * Item instance.
     */
    $implicit: T;
}

/**
 * Custom caption template context.
 * @group Interface
 */
export interface GalleriaCaptionTemplateContext<T = any> {
    /**
     * Item instance.
     */
    $implicit: T;
}

/**
 * Defines valid templates in Galleria.
 * @group Templates
 */
export interface GalleriaTemplates {
    /**
     * Custom header template.
     */
    header(): TemplateRef<void>;
    /**
     * Custom footer template.
     */
    footer(): TemplateRef<void>;
    /**
     * Custom indicator template.
     * @param {Object} context - indicator context.
     */
    indicator(context: GalleriaIndicatorTemplateContext): TemplateRef<GalleriaIndicatorTemplateContext>;
    /**
     * Custom close icon template.
     */
    closeicon(): TemplateRef<void>;
    /**
     * Custom item next icon template.
     */
    itemnexticon(): TemplateRef<void>;
    /**
     * Custom item previous icon template.
     */
    itempreviousicon(): TemplateRef<void>;
    /**
     * Custom previous thumbnail icon template.
     */
    previousthumbnailicon(): TemplateRef<void>;
    /**
     * Custom next thumbnail icon template.
     */
    nextthumbnailicon(): TemplateRef<void>;
    /**
     * Custom caption template.
     * @param {Object} context - caption context.
     */
    caption(context: GalleriaCaptionTemplateContext): TemplateRef<GalleriaCaptionTemplateContext>;
    /**
     * Custom thumbnail template.
     * @param {Object} context - thumbnail context.
     */
    thumbnail(context: GalleriaThumbnailTemplateContext): TemplateRef<GalleriaThumbnailTemplateContext>;
    /**
     * Custom item template.
     * @param {Object} context - item context.
     */
    item(context: GalleriaItemTemplateContext): TemplateRef<GalleriaItemTemplateContext>;
}
