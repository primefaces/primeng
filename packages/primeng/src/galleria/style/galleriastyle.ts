import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/galleria';
import { BaseStyle } from 'primeng/base';

const classes = {
    mask: 'p-galleria-mask p-overlay-mask p-overlay-mask-enter',
    root: ({ instance }) => {
        const thumbnailsPosClass = instance.galleria.showThumbnails && instance.getPositionClass('p-galleria-thumbnails', instance.galleria.thumbnailsPosition);
        const indicatorPosClass = instance.galleria.showIndicators && instance.getPositionClass('p-galleria-indicators', instance.galleria.indicatorsPosition);

        return [
            'p-galleria p-component',
            {
                'p-galleria-fullscreen': instance.galleria.fullScreen,
                'p-galleria-inset-indicators': instance.galleria.showIndicatorsOnItem,
                'p-galleria-hover-navigators': instance.galleria.showItemNavigatorsOnHover && !instance.galleria.fullScreen
            },
            thumbnailsPosClass,
            indicatorPosClass
        ];
    },
    closeButton: 'p-galleria-close-button',
    closeIcon: 'p-galleria-close-icon',
    header: 'p-galleria-header',
    content: 'p-galleria-content',
    footer: 'p-galleria-footer',
    itemsContainer: 'p-galleria-items-container',
    items: 'p-galleria-items',
    prevButton: ({ instance }) => [
        'p-galleria-prev-button p-galleria-nav-button',
        {
            'p-disabled': instance.isNavBackwardDisabled()
        }
    ],
    prevIcon: 'p-galleria-prev-icon',
    item: 'p-galleria-item',
    nextButton: ({ instance }) => [
        'p-galleria-next-button p-galleria-nav-button',
        {
            'p-disabled': instance.isNavForwardDisabled()
        }
    ],
    nextIcon: 'p-galleria-next-icon',
    caption: 'p-galleria-caption',
    indicatorList: 'p-galleria-indicator-list',
    indicator: ({ instance, index }) => [
        'p-galleria-indicator',
        {
            'p-galleria-indicator-active': instance.isIndicatorItemActive(index)
        }
    ],
    indicatorButton: 'p-galleria-indicator-button',
    thumbnails: 'p-galleria-thumbnails',
    thumbnailContent: 'p-galleria-thumbnails-content',
    thumbnailPrevButton: ({ instance }) => [
        'p-galleria-thumbnail-prev-button p-galleria-thumbnail-nav-button',
        {
            'p-disabled': instance.isNavBackwardDisabled()
        }
    ],
    thumbnailPrevIcon: 'p-galleria-thumbnail-prev-icon',
    thumbnailsViewport: 'p-galleria-thumbnails-viewport',
    thumbnailItems: 'p-galleria-thumbnail-items',
    thumbnailItem: ({ instance, index, activeIndex }) => [
        'p-galleria-thumbnail-item',
        {
            'p-galleria-thumbnail-item-current': activeIndex === index,
            'p-galleria-thumbnail-item-active': instance.isItemActive(index),
            'p-galleria-thumbnail-item-start': instance.firstItemAciveIndex() === index,
            'p-galleria-thumbnail-item-end': instance.lastItemActiveIndex() === index
        }
    ],
    thumbnail: 'p-galleria-thumbnail',
    thumbnailNextButton: ({ instance }) => [
        'p-galleria-thumbnail-next-button  p-galleria-thumbnail-nav-button',
        {
            'p-disabled': instance.isNavForwardDisabled()
        }
    ],
    thumbnailNextIcon: 'p-galleria-thumbnail-next-icon'
};

@Injectable()
export class GalleriaStyle extends BaseStyle {
    name = 'galleria';

    theme = style;

    classes = classes;
}

/**
 *
 * Galleria is an advanced content gallery component.
 *
 * [Live Demo](https://www.primeng.org/galleria/)
 *
 * @module galleriastyle
 *
 */
export enum GalleriaClasses {
    /**
     * Class name of the mask element
     */
    mask = 'p-galleria-mask',
    /**
     * Class name of the root element
     */
    root = 'p-galleria',
    /**
     * Class name of the close button element
     */
    closeButton = 'p-galleria-close-button',
    /**
     * Class name of the close icon element
     */
    closeIcon = 'p-galleria-close-icon',
    /**
     * Class name of the header element
     */
    header = 'p-galleria-header',
    /**
     * Class name of the content element
     */
    content = 'p-galleria-content',
    /**
     * Class name of the footer element
     */
    footer = 'p-galleria-footer',
    /**
     * Class name of the items container element
     */
    itemsContainer = 'p-galleria-items-container',
    /**
     * Class name of the items element
     */
    items = 'p-galleria-items',
    /**
     * Class name of the previous item button element
     */
    prevButton = 'p-galleria-prev-button',
    /**
     * Class name of the previous item icon element
     */
    prevIcon = 'p-galleria-prev-icon',
    /**
     * Class name of the item element
     */
    item = 'p-galleria-item',
    /**
     * Class name of the next item button element
     */
    nextButton = 'p-galleria-next-button',
    /**
     * Class name of the next item icon element
     */
    nextIcon = 'p-galleria-next-icon',
    /**
     * Class name of the caption element
     */
    caption = 'p-galleria-caption',
    /**
     * Class name of the indicator list element
     */
    indicatorList = 'p-galleria-indicator-list',
    /**
     * Class name of the indicator element
     */
    indicator = 'p-galleria-indicator',
    /**
     * Class name of the indicator button element
     */
    indicatorButton = 'p-galleria-indicator-button',
    /**
     * Class name of the thumbnails element
     */
    thumbnails = 'p-galleria-thumbnails',
    /**
     * Class name of the thumbnail content element
     */
    thumbnailContent = 'p-galleria-thumbnails-content',
    /**
     * Class name of the previous thumbnail button element
     */
    previousThumbnailButton = 'p-galleria-thumbnail-prev-button',
    /**
     * Class name of the previous thumbnail icon element
     */
    previousThumbnailIcon = 'p-galleria-thumbnail-prev-icon',
    /**
     * Class name of the thumbnails viewport element
     */
    thumbnailsViewport = 'p-galleria-thumbnails-viewport',
    /**
     * Class name of the thumbnail items element
     */
    thumbnailItems = 'p-galleria-thumbnail-items',
    /**
     * Class name of the thumbnail item element
     */
    thumbnailItem = 'p-galleria-thumbnail-item',
    /**
     * Class name of the thumbnail element
     */
    thumbnail = 'p-galleria-thumbnail',
    /**
     * Class name of the next thumbnail button element
     */
    nextThumbnailButton = 'p-galleria-thumbnail-next-button',
    /**
     * Class name of the next thumbnail icon element
     */
    nextThumbnailIcon = 'p-galleria-thumbnail-next-icon'
}

export interface GalleriaStyle extends BaseStyle {}
