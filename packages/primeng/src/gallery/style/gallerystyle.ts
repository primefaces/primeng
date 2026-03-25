import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const style = /*css*/ `
    .p-gallery {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
    .p-gallery-backdrop {
        position: absolute;
        inset: 0;
        z-index: 0;
        background-color: var(--p-surface-950);
    }
    .p-gallery-header {
        position: relative;
        z-index: 2;
        display: flex;
        align-items: center;
        padding: 0.75rem 1rem;
        background-color: var(--p-surface-950);
    }
    .p-gallery-footer {
        background-color: var(--p-surface-950);
        position: relative;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.25rem 0;
        border-top: 1px solid var(--p-surface-700);
        transition: transform 0.2s ease, opacity 0.2s ease;
    }
    .p-gallery-content {
        position: relative;
        z-index: 1;
        flex: 1;
        min-height: 0;
    }

    .p-gallery-item {
        --position-x: 0px;
        --position-y: 0px;
        --scale: 1;
        --rotation: 0deg;
        --flip-x: 1;
        --flip-y: 1;
        position: absolute;
        top: 50%;
        left: 50%;
        transform-origin: center;
        user-select: none;
        touch-action: none;
        align-items: center;
        justify-content: center;
        transform: translate(calc(-50% + var(--position-x)), calc(-50% + var(--position-y))) scale(var(--scale)) rotate(calc(var(--rotation))) scaleX(var(--flip-x)) scaleY(var(--flip-y));
        opacity: 0;
        pointer-events: none;
        visibility: hidden;
        z-index: 0;
        display: none;
        cursor: pointer;
        transition:
            transform 0.3s ease,
            opacity 0.3s ease;
    }

    .p-gallery-item[data-active="true"] {
        opacity: 1;
        pointer-events: auto;
        visibility: visible;
        z-index: 1;
        display: flex;
        cursor: zoom-in;
        will-change: transform;
    }

    .p-gallery-action {
        width: 2.25rem;
        height: 2.25rem;
        cursor: pointer;
        border-radius: 9999px;
        background: transparent;
        color: var(--p-surface-300);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.15s ease, color 0.15s ease;
    }

    .p-gallery-action svg {
        width: 1rem !important;
        height: 1rem !important;
    }

    .p-gallery-action i {
        font-size: 1rem !important;
    }

    .p-gallery-action:hover {
        background-color: var(--p-surface-800);
        color: var(--p-surface-0);
    }

    .p-gallery-action:disabled,
    .p-gallery-action[disabled] {
        opacity: 0.4;
        cursor: default;
        pointer-events: none;
    }

    .p-gallery-next,
    .p-gallery-prev {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 3;
        width: 2.25rem;
        height: 2.25rem;
        cursor: pointer;
        border-radius: 9999px;
        background: transparent;
        color: var(--p-surface-300);
        transition-property: background-color, color;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: color-mix(in srgb, var(--p-surface-800), transparent 40%);
    }

    .p-gallery-next svg,
    .p-gallery-prev svg {
        width: 1rem !important;
        height: 1rem !important;
    }

    .p-gallery-next i,
    .p-gallery-prev i {
        font-size: 1rem !important;
    }

    .p-gallery-next:hover,
    .p-gallery-prev:hover {
        background-color: var(--p-surface-800);
        color: var(--p-surface-0);
    }

    .p-gallery-next {
        right: 0.5rem;
    }

    .p-gallery-prev {
        left: 0.5rem;
    }

    .p-gallery-thumbnail {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 2;
    }

    .p-gallery-thumbnail-content {
        padding: 0.25rem 0;
    }

    .p-gallery-thumbnail-item {
        background-color: var(--p-surface-800);
        padding: 0.25rem;
        height: 5rem;
        width: 5rem;
        aspect-ratio: 1 / 1;
        cursor: pointer;
        border-radius: 0.25rem;
        overflow: hidden;
        display: flex;
        transition: scale 0.15s ease;
    }

    .p-gallery-thumbnail-item:hover {
        outline: 3px solid var(--p-surface-700);
    }

    .p-gallery-thumbnail-item[data-active] {
        outline: 3px solid var(--p-primary-500);
        scale: 0.85;
    }

    .p-gallery[data-zoomed] .p-gallery-footer {
        transform: translateY(100%);
        opacity: 0;
        pointer-events: none;
    }

    .p-gallery[data-zoomed] .p-gallery-next,
    .p-gallery[data-zoomed] .p-gallery-prev {
        opacity: 0;
        pointer-events: none;
    }
`;

const classes = {
    root: 'p-gallery',
    backdrop: 'p-gallery-backdrop',
    header: 'p-gallery-header',
    footer: 'p-gallery-footer',
    content: 'p-gallery-content',
    item: 'p-gallery-item',
    next: 'p-gallery-next',
    prev: 'p-gallery-prev',
    toolbar: 'p-gallery-toolbar',
    toolbarItem: 'p-gallery-toolbar-item',
    zoomIn: 'p-gallery-action',
    zoomOut: 'p-gallery-action',
    zoomToggle: 'p-gallery-action',
    rotateLeft: 'p-gallery-action',
    rotateRight: 'p-gallery-action',
    flipX: 'p-gallery-action',
    flipY: 'p-gallery-action',
    download: 'p-gallery-action',
    fullScreen: 'p-gallery-action',
    thumbnail: 'p-gallery-thumbnail',
    thumbnailContent: 'p-gallery-thumbnail-content',
    thumbnailItem: 'p-gallery-thumbnail-item'
};

@Injectable()
export class GalleryStyle extends BaseStyle {
    name = 'gallery';

    style = style;

    classes = classes;
}

/**
 *
 * Gallery groups a collection of contents in items.
 *
 * [Live Demo](https://www.primeng.org/gallery/)
 *
 * @module gallerystyle
 *
 */
export enum GalleryClasses {
    /**
     * Class name of the root element
     */
    root = 'p-gallery',
    /**
     * Class name of the backdrop element
     */
    backdrop = 'p-gallery-backdrop',
    /**
     * Class name of the header element
     */
    header = 'p-gallery-header',
    /**
     * Class name of the footer element
     */
    footer = 'p-gallery-footer',
    /**
     * Class name of the content element
     */
    content = 'p-gallery-content',
    /**
     * Class name of the item element
     */
    item = 'p-gallery-item',
    /**
     * Class name of the next button element
     */
    next = 'p-gallery-next',
    /**
     * Class name of the prev button element
     */
    prev = 'p-gallery-prev',
    /**
     * Class name of the toolbar element
     */
    toolbar = 'p-gallery-toolbar',
    /**
     * Class name of the toolbar item element
     */
    toolbarItem = 'p-gallery-toolbar-item',
    /**
     * Class name of the action element
     */
    action = 'p-gallery-action',
    /**
     * Class name of the thumbnail element
     */
    thumbnail = 'p-gallery-thumbnail',
    /**
     * Class name of the thumbnail content element
     */
    thumbnailContent = 'p-gallery-thumbnail-content',
    /**
     * Class name of the thumbnail item element
     */
    thumbnailItem = 'p-gallery-thumbnail-item'
}

export interface GalleryStyleType extends BaseStyle {}
