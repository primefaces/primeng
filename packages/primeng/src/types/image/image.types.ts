import { TemplateRef } from '@angular/core';
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
}

/**
 * Defines valid pass-through options in Image.
 * @see {@link ImagePassThroughOptions}
 *
 * @template I Type of instance.
 */
export type ImagePassThrough<I = unknown> = PassThrough<I, ImagePassThroughOptions<I>>;

/**
 * Defines valid templates in Image.
 * @group Templates
 */
export interface ImageTemplates {
    /**
     * Custom template of indicator.
     */
    indicator(): TemplateRef<any>;
    /**
     * Custom template of image.
     */
    image(context: {
        /**
         * Style class of the image element.
         */
        class: any;
        /**
         * Style of the image element.
         */
        style: any;
        /**
         * Image click function.
         */
        errorCallback: Function;
    }): TemplateRef<{ class: any; style: any; errorCallback: Function }>;
    /**
     * Custom preview template.
     */
    preview(context: {
        /**
         * Preview click function.
         */
        errorCallback: Function;
    }): TemplateRef<{ errorCallback: Function }>;
    /**
     * Custom template of rotaterighticon.
     */
    rotaterighticon(): TemplateRef<any>;
    /**
     * Custom template of rotatelefticon.
     */
    rotatelefticon(): TemplateRef<any>;
    /**
     * Custom template of zoomouticon.
     */
    zoomouticon(): TemplateRef<any>;
    /**
     * Custom template of zoominicon.
     */
    zoominicon(): TemplateRef<any>;
    /**
     * Custom template of closeicon.
     */
    closeicon(): TemplateRef<any>;
}

/**
 * Defines valid templates in Image.
 * @group Templates
 */
export interface ImageTemplates {
    /**
     * Custom template of indicator.
     */
    indicator(): TemplateRef<any>;
    /**
     * Custom template of image.
     */
    image(context: {
        /**
         * Style class of the image element.
         */
        class: any;
        /**
         * Style of the image element.
         */
        style: any;
        /**
         * Image click function.
         */
        errorCallback: Function;
    }): TemplateRef<{ class: any; style: any; errorCallback: Function }>;
    /**
     * Custom preview template.
     */
    preview(context: {
        /**
         * Preview click function.
         */
        errorCallback: Function;
    }): TemplateRef<{ errorCallback: Function }>;
    /**
     * Custom template of rotaterighticon.
     */
    rotaterighticon(): TemplateRef<any>;
    /**
     * Custom template of rotatelefticon.
     */
    rotatelefticon(): TemplateRef<any>;
    /**
     * Custom template of zoomouticon.
     */
    zoomouticon(): TemplateRef<any>;
    /**
     * Custom template of zoominicon.
     */
    zoominicon(): TemplateRef<any>;
    /**
     * Custom template of closeicon.
     */
    closeicon(): TemplateRef<any>;
}
