import type { PassThrough, PassThroughOption } from 'primeng/api';
import type { Image } from 'primeng/image';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link Image.pt}
 * @group Interface
 */
export interface ImagePassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the image's DOM element.
     */
    image?: PassThroughOption<HTMLImageElement, I>;
    /**
     * Used to pass attributes to the preview mask button's DOM element.
     */
    previewMask?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the preview icon's DOM element.
     */
    previewIcon?: PassThroughOption<SVGElement, I>;
    /**
     * Used to pass attributes to the mask's DOM element.
     */
    mask?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the toolbar's DOM element.
     */
    toolbar?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the rotate right button's DOM element.
     */
    rotateRightButton?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the rotate left button's DOM element.
     */
    rotateLeftButton?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the zoom out button's DOM element.
     */
    zoomOutButton?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the zoom in button's DOM element.
     */
    zoomInButton?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the close button's DOM element.
     */
    closeButton?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the original/preview image's DOM element.
     */
    original?: PassThroughOption<HTMLImageElement, I>;
}

/**
 * Defines valid pass-through options in Image.
 * @see {@link ImagePassThroughOptions}
 *
 * @template I Type of instance.
 */
export type ImagePassThrough<I = unknown> = PassThrough<I, ImagePassThroughOptions<I>>;
