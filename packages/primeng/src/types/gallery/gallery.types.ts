import type { PassThrough, PassThroughOption } from 'primeng/api';
import type { CarouselPassThrough, CarouselContentPassThrough, CarouselItemPassThrough } from 'primeng/types/carousel';

/**
 * Represents a pending action dispatched from toolbar to the active gallery item.
 * @group Interface
 */
export interface GalleryPendingAction {
    /**
     * The type of the action.
     */
    type: 'zoom-in' | 'zoom-out' | 'rotate-left' | 'rotate-right' | 'flip-x' | 'flip-y' | 'download';
    /**
     * Timestamp to ensure repeated identical actions trigger new effects.
     */
    timestamp: number;
}

/**
 * Event fired when the gallery's active index changes.
 * @group Events
 */
export interface GalleryActiveIndexChangeEvent {
    /**
     * The original event that triggered the change.
     */
    originalEvent?: Event;
    /**
     * The new active index value.
     */
    value: number;
}

/**
 * Defines the state of a gallery item.
 * @group Interface
 */
export interface GalleryItemState {
    /**
     * The index of the item in the gallery.
     */
    index: number;
    /**
     * Whether the item is the active (visible) item.
     */
    isActive: boolean;
    /**
     * The current pan position.
     */
    position: { x: number; y: number };
    /**
     * The current zoom scale.
     */
    scale: number;
    /**
     * The current rotation in degrees.
     */
    rotation: number;
    /**
     * The current flip state.
     */
    flip: { x: number; y: number };
}

/**
 * Defines valid pass-through options in Gallery component.
 * @template I Type of instance.
 * @group Interface
 */
export interface GalleryPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in Gallery component.
 * @see {@link GalleryPassThroughOptions}
 * @template I Type of instance.
 */
export type GalleryPassThrough<I = unknown> = PassThrough<I, GalleryPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in GalleryBackdrop component.
 * @template I Type of instance.
 * @group Interface
 */
export interface GalleryBackdropPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * @see {@link GalleryBackdropPassThroughOptions}
 * @template I Type of instance.
 */
export type GalleryBackdropPassThrough<I = unknown> = PassThrough<I, GalleryBackdropPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in GalleryHeader component.
 * @template I Type of instance.
 * @group Interface
 */
export interface GalleryHeaderPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * @see {@link GalleryHeaderPassThroughOptions}
 * @template I Type of instance.
 */
export type GalleryHeaderPassThrough<I = unknown> = PassThrough<I, GalleryHeaderPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in GalleryContent component.
 * @template I Type of instance.
 * @group Interface
 */
export interface GalleryContentPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * @see {@link GalleryContentPassThroughOptions}
 * @template I Type of instance.
 */
export type GalleryContentPassThrough<I = unknown> = PassThrough<I, GalleryContentPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in GalleryFooter component.
 * @template I Type of instance.
 * @group Interface
 */
export interface GalleryFooterPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * @see {@link GalleryFooterPassThroughOptions}
 * @template I Type of instance.
 */
export type GalleryFooterPassThrough<I = unknown> = PassThrough<I, GalleryFooterPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in GalleryItem component.
 * @template I Type of instance.
 * @group Interface
 */
export interface GalleryItemPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * @see {@link GalleryItemPassThroughOptions}
 * @template I Type of instance.
 */
export type GalleryItemPassThrough<I = unknown> = PassThrough<I, GalleryItemPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in GalleryPrev component.
 * @template I Type of instance.
 * @group Interface
 */
export interface GalleryPrevPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * @see {@link GalleryPrevPassThroughOptions}
 * @template I Type of instance.
 */
export type GalleryPrevPassThrough<I = unknown> = PassThrough<I, GalleryPrevPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in GalleryNext component.
 * @template I Type of instance.
 * @group Interface
 */
export interface GalleryNextPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * @see {@link GalleryNextPassThroughOptions}
 * @template I Type of instance.
 */
export type GalleryNextPassThrough<I = unknown> = PassThrough<I, GalleryNextPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in GalleryToolbar component.
 * @template I Type of instance.
 * @group Interface
 */
export interface GalleryToolbarPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * @see {@link GalleryToolbarPassThroughOptions}
 * @template I Type of instance.
 */
export type GalleryToolbarPassThrough<I = unknown> = PassThrough<I, GalleryToolbarPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in GalleryToolbarItem component.
 * @template I Type of instance.
 * @group Interface
 */
export interface GalleryToolbarItemPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * @see {@link GalleryToolbarItemPassThroughOptions}
 * @template I Type of instance.
 */
export type GalleryToolbarItemPassThrough<I = unknown> = PassThrough<I, GalleryToolbarItemPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in GalleryZoomIn component.
 * @template I Type of instance.
 * @group Interface
 */
export interface GalleryZoomInPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * @see {@link GalleryZoomInPassThroughOptions}
 * @template I Type of instance.
 */
export type GalleryZoomInPassThrough<I = unknown> = PassThrough<I, GalleryZoomInPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in GalleryZoomOut component.
 * @template I Type of instance.
 * @group Interface
 */
export interface GalleryZoomOutPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * @see {@link GalleryZoomOutPassThroughOptions}
 * @template I Type of instance.
 */
export type GalleryZoomOutPassThrough<I = unknown> = PassThrough<I, GalleryZoomOutPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in GalleryZoomToggle component.
 * @template I Type of instance.
 * @group Interface
 */
export interface GalleryZoomTogglePassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * @see {@link GalleryZoomTogglePassThroughOptions}
 * @template I Type of instance.
 */
export type GalleryZoomTogglePassThrough<I = unknown> = PassThrough<I, GalleryZoomTogglePassThroughOptions<I>>;

/**
 * Defines valid pass-through options in GalleryRotateLeft component.
 * @template I Type of instance.
 * @group Interface
 */
export interface GalleryRotateLeftPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * @see {@link GalleryRotateLeftPassThroughOptions}
 * @template I Type of instance.
 */
export type GalleryRotateLeftPassThrough<I = unknown> = PassThrough<I, GalleryRotateLeftPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in GalleryRotateRight component.
 * @template I Type of instance.
 * @group Interface
 */
export interface GalleryRotateRightPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * @see {@link GalleryRotateRightPassThroughOptions}
 * @template I Type of instance.
 */
export type GalleryRotateRightPassThrough<I = unknown> = PassThrough<I, GalleryRotateRightPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in GalleryFlipX component.
 * @template I Type of instance.
 * @group Interface
 */
export interface GalleryFlipXPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * @see {@link GalleryFlipXPassThroughOptions}
 * @template I Type of instance.
 */
export type GalleryFlipXPassThrough<I = unknown> = PassThrough<I, GalleryFlipXPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in GalleryFlipY component.
 * @template I Type of instance.
 * @group Interface
 */
export interface GalleryFlipYPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * @see {@link GalleryFlipYPassThroughOptions}
 * @template I Type of instance.
 */
export type GalleryFlipYPassThrough<I = unknown> = PassThrough<I, GalleryFlipYPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in GalleryDownload component.
 * @template I Type of instance.
 * @group Interface
 */
export interface GalleryDownloadPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * @see {@link GalleryDownloadPassThroughOptions}
 * @template I Type of instance.
 */
export type GalleryDownloadPassThrough<I = unknown> = PassThrough<I, GalleryDownloadPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in GalleryFullScreen component.
 * @template I Type of instance.
 * @group Interface
 */
export interface GalleryFullScreenPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * @see {@link GalleryFullScreenPassThroughOptions}
 * @template I Type of instance.
 */
export type GalleryFullScreenPassThrough<I = unknown> = PassThrough<I, GalleryFullScreenPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in GalleryThumbnail component.
 * @template I Type of instance.
 * @group Interface
 */
export interface GalleryThumbnailPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the internal Carousel component.
     */
    pcCarousel?: CarouselPassThrough;
    /**
     * Used to pass attributes to the internal CarouselContent component.
     */
    pcCarouselContent?: CarouselContentPassThrough;
    /**
     * Used to pass attributes to the internal CarouselItem components.
     */
    pcCarouselItem?: CarouselItemPassThrough;
}

/**
 * @see {@link GalleryThumbnailPassThroughOptions}
 * @template I Type of instance.
 */
export type GalleryThumbnailPassThrough<I = unknown> = PassThrough<I, GalleryThumbnailPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in GalleryThumbnailContent component.
 * @template I Type of instance.
 * @group Interface
 */
export interface GalleryThumbnailContentPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * @see {@link GalleryThumbnailContentPassThroughOptions}
 * @template I Type of instance.
 */
export type GalleryThumbnailContentPassThrough<I = unknown> = PassThrough<I, GalleryThumbnailContentPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in GalleryThumbnailItem component.
 * @template I Type of instance.
 * @group Interface
 */
export interface GalleryThumbnailItemPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * @see {@link GalleryThumbnailItemPassThroughOptions}
 * @template I Type of instance.
 */
export type GalleryThumbnailItemPassThrough<I = unknown> = PassThrough<I, GalleryThumbnailItemPassThroughOptions<I>>;
