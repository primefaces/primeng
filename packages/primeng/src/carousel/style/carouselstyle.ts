import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/carousel';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: ({ instance }) => [
        'p-carousel p-component',
        {
            'p-carousel-vertical': instance.isVertical(),
            'p-carousel-horizontal': !instance.isVertical()
        }
    ],
    header: 'p-carousel-header',
    contentContainer: 'p-carousel-content-container',
    content: 'p-carousel-content',
    pcPrevButton: ({ instance }) => [
        'p-carousel-prev-button',
        {
            'p-disabled': instance.isBackwardNavDisabled()
        }
    ],
    viewport: 'p-carousel-viewport',
    itemList: 'p-carousel-item-list',
    itemClone: ({ instance, index }) => [
        'p-carousel-item p-carousel-item-clone',
        {
            'p-carousel-item-active': instance.totalShiftedItems * -1 === instance.value.length,
            'p-carousel-item-start': 0 === index,
            'p-carousel-item-end': instance.clonedItemsForStarting.length - 1 === index
        }
    ],
    item: ({ instance, index }) => [
        'p-carousel-item',
        {
            'p-carousel-item-active': instance.firstIndex() <= index && instance.lastIndex() >= index,
            'p-carousel-item-start': instance.firstIndex() === index,
            'p-carousel-item-end': instance.lastIndex() === index
        }
    ],
    pcNextButton: ({ instance }) => [
        'p-carousel-next-button',
        {
            'p-disabled': instance.isForwardNavDisabled()
        }
    ],
    indicatorList: ({ instance }) => ['p-carousel-indicator-list', instance.indicatorsContentClass],
    indicator: ({ instance, index }) => [
        'p-carousel-indicator',
        {
            'p-carousel-indicator-active': instance._page === index
        }
    ],
    indicatorButton: ({ instance }) => ['p-carousel-indicator-button', instance.indicatorStyleClass],
    footer: 'p-carousel-footer'
};

@Injectable()
export class CarouselStyle extends BaseStyle {
    name = 'carousel';

    theme = style;

    classes = classes;
}

/**
 *
 * Carousel is a content slider featuring various customization options.
 *
 * [Live Demo](https://www.primeng.org/carousel/)
 *
 * @module carouselstyle
 *
 */
export enum CarouselClasses {
    /**
     * Class name of the root element
     */
    root = 'p-carousel',
    /**
     * Class name of the header element
     */
    header = 'p-carousel-header',
    /**
     * Class name of the content container element
     */
    contentContainer = 'p-carousel-content-container',
    /**
     * Class name of the content element
     */
    content = 'p-carousel-content',
    /**
     * Class name of the previous button element
     */
    pcPrevButton = 'p-carousel-prev-button',
    /**
     * Class name of the viewport element
     */
    viewport = 'p-carousel-viewport',
    /**
     * Class name of the item list element
     */
    itemList = 'p-carousel-item-list',
    /**
     * Class name of the item clone element
     */
    itemClone = 'p-carousel-item-clone',
    /**
     * Class name of the item element
     */
    item = 'p-carousel-item',
    /**
     * Class name of the next button element
     */
    pcNextButton = 'p-carousel-next-button',
    /**
     * Class name of the indicator list element
     */
    indicatorList = 'p-carousel-indicator-list',
    /**
     * Class name of the indicator element
     */
    indicator = 'p-carousel-indicator',
    /**
     * Class name of the indicator button element
     */
    indicatorButton = 'p-carousel-indicator-button',
    /**
     * Class name of the footer element
     */
    footer = 'p-carousel-footer'
}

export interface CarouselStyle extends BaseStyle {}
