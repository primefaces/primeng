import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/image';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: ({ instance }) => [
        'p-image p-component',
        {
            'p-image-preview': instance.preview
        }
    ],
    previewMask: 'p-image-preview-mask',
    previewIcon: 'p-image-preview-icon',
    mask: 'p-image-mask p-overlay-mask p-overlay-mask-enter',
    toolbar: 'p-image-toolbar',
    rotateRightButton: 'p-image-action p-image-rotate-right-button',
    rotateLeftButton: 'p-image-action p-image-rotate-left-button',
    zoomOutButton: ({ instance }) => [
        'p-image-action p-image-zoom-out-button',
        {
            'p-disabled': instance.isZoomOutDisabled
        }
    ],
    zoomInButton: ({ instance }) => [
        'p-image-action p-image-zoom-in-button',
        {
            'p-disabled': instance.isZoomInDisabled
        }
    ],
    closeButton: 'p-image-action p-image-close-button',
    original: 'p-image-original'
};

@Injectable()
export class ImageStyle extends BaseStyle {
    name = 'image';

    theme = style;

    classes = classes;
}

/**
 *
 * Displays an image with preview and tranformation options. For multiple image, see Galleria.
 *
 * [Live Demo](https://www.primeng.org/image/)
 *
 * @module imagestyle
 *
 */
export enum ImageClasses {
    /**
     * Class name of the root element
     */
    root = 'p-image',
    /**
     * Class name of the preview mask element
     */
    previewMask = 'p-image-preview-mask',
    /**
     * Class name of the preview icon element
     */
    previewIcon = 'p-image-preview-icon',
    /**
     * Class name of the mask element
     */
    mask = 'p-image-mask',
    /**
     * Class name of the toolbar element
     */
    toolbar = 'p-image-toolbar',
    /**
     * Class name of the rotate right button element
     */
    rotateRightButton = 'p-image-rotate-right-button',
    /**
     * Class name of the rotate left button element
     */
    rotateLeftButton = 'p-image-rotate-left-button',
    /**
     * Class name of the zoom out button element
     */
    zoomOutButton = 'p-image-zoom-out-button',
    /**
     * Class name of the zoom in button element
     */
    zoomInButton = 'p-image-zoom-in-button',
    /**
     * Class name of the close button element
     */
    closeButton = 'p-image-close-button',
    /**
     * Class name of the original element
     */
    original = 'p-image-original'
}

export interface ImageStyle extends BaseStyle {}
