import { TemplateRef } from '@angular/core';
import type { MotionOptions } from '@primeuix/motion';
import type { PassThrough, PassThroughOption } from 'primeng/api';

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
    /**
     * Used to pass options to the motion component/directive.
     */
    motion?: MotionOptions;
    /**
     * Used to pass motion options for the mask animation.
     */
    maskMotion?: MotionOptions;
}

/**
 * Defines valid pass-through options in Image.
 * @see {@link ImagePassThroughOptions}
 *
 * @template I Type of instance.
 */
export type ImagePassThrough<I = unknown> = PassThrough<I, ImagePassThroughOptions<I>>;

/**
 * Custom image template context.
 * @group Interface
 */
export interface ImageImageTemplateContext {
    /**
     * Callback to invoke on image error.
     */
    errorCallback: (event: Event) => void;
}

/**
 * Custom preview template context.
 * @group Interface
 */
export interface ImagePreviewTemplateContext {
    /**
     * Style class of the preview image element.
     */
    class: string;
    /**
     * Inline style of the preview image element.
     */
    style: { [key: string]: any };
    /**
     * Callback to invoke on preview image click.
     */
    previewCallback: () => void;
}

/**
 * Defines valid templates in Image.
 * @group Templates
 */
export interface ImageTemplates {
    /**
     * Custom indicator template.
     */
    indicator(): TemplateRef<void>;
    /**
     * Custom image template.
     * @param {Object} context - image context.
     */
    image(context: ImageImageTemplateContext): TemplateRef<ImageImageTemplateContext>;
    /**
     * Custom preview template.
     * @param {Object} context - preview context.
     */
    preview(context: ImagePreviewTemplateContext): TemplateRef<ImagePreviewTemplateContext>;
    /**
     * Custom rotate right icon template.
     */
    rotaterighticon(): TemplateRef<void>;
    /**
     * Custom rotate left icon template.
     */
    rotatelefticon(): TemplateRef<void>;
    /**
     * Custom zoom out icon template.
     */
    zoomouticon(): TemplateRef<void>;
    /**
     * Custom zoom in icon template.
     */
    zoominicon(): TemplateRef<void>;
    /**
     * Custom close icon template.
     */
    closeicon(): TemplateRef<void>;
}
