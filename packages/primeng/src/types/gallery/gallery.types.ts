import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption } from 'primeng/api';

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
 *
 * @see {@link GalleryRoot.pt}
 * @group Interface
 */
export interface GalleryPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the backdrop's DOM element.
     */
    backdrop?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the header's DOM element.
     */
    header?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the footer's DOM element.
     */
    footer?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the item's DOM element.
     */
    item?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the next button's DOM element.
     */
    next?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the prev button's DOM element.
     */
    prev?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the toolbar's DOM element.
     */
    toolbar?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the toolbar item's DOM element.
     */
    toolbarItem?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the thumbnail's DOM element.
     */
    thumbnail?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the thumbnail content's DOM element.
     */
    thumbnailContent?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the thumbnail item's DOM element.
     */
    thumbnailItem?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the zoom in button's DOM element.
     */
    zoomIn?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the zoom out button's DOM element.
     */
    zoomOut?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the zoom toggle button's DOM element.
     */
    zoomToggle?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the rotate left button's DOM element.
     */
    rotateLeft?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the rotate right button's DOM element.
     */
    rotateRight?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the flip x button's DOM element.
     */
    flipX?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the flip y button's DOM element.
     */
    flipY?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the download button's DOM element.
     */
    download?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the fullscreen button's DOM element.
     */
    fullScreen?: PassThroughOption<HTMLButtonElement, I>;
}

/**
 * Defines valid pass-through options in Gallery component.
 * @see {@link GalleryPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type GalleryPassThrough<I = unknown> = PassThrough<I, GalleryPassThroughOptions<I>>;

/**
 * Custom fullscreen template context.
 * @group Interface
 */
export interface GalleryFullScreenTemplateContext {
    /**
     * Whether the gallery is currently in fullscreen mode.
     */
    $implicit: boolean;
}

/**
 * Defines valid templates in Gallery.
 * @group Templates
 */
export interface GalleryTemplates {
    /**
     * Custom fullscreen button content template.
     * @param {Object} context - fullscreen context.
     */
    fullscreen(context: GalleryFullScreenTemplateContext): TemplateRef<GalleryFullScreenTemplateContext>;
}
