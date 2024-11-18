import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-carousel {
    display: flex;
    flex-direction: column;
}

.p-carousel-content-container {
    display: flex;
    flex-direction: column;
    overflow: auto;
}

.p-carousel-content {
    display: flex;
    flex-direction: row;
    gap: ${dt('carousel.content.gap')};
}

.p-carousel-viewport {
    overflow: hidden;
    width: 100%;
}

.p-carousel-item-list {
    display: flex;
    flex-direction: row;
}

.p-carousel-prev-button,
.p-carousel-next-button {
    align-self: center;
}

.p-carousel-indicator-list {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    padding: ${dt('carousel.indicator.list.padding')};
    gap: ${dt('carousel.indicator.list.gap')};
    margin: 0;
    list-style: none;
}

.p-carousel-indicator-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${dt('carousel.indicator.background')};
    width: ${dt('carousel.indicator.width')};
    height: ${dt('carousel.indicator.height')};
    border: 0 none;
    transition: background ${dt('carousel.transition.duration')}, color ${dt('carousel.transition.duration')}, outline-color ${dt('carousel.transition.duration')}, box-shadow ${dt('carousel.transition.duration')};
    outline-color: transparent;
    border-radius: ${dt('carousel.indicator.border.radius')};
    padding: 0;
    margin: 0;
    user-select: none;
    cursor: pointer;
}

.p-carousel-indicator-button:focus-visible {
    box-shadow: ${dt('carousel.indicator.focus.ring.shadow')};
    outline: ${dt('carousel.indicator.focus.ring.width')} ${dt('carousel.indicator.focus.ring.style')} ${dt('carousel.indicator.focus.ring.color')};
    outline-offset: ${dt('carousel.indicator.focus.ring.offset')};
}

.p-carousel-indicator-button:hover {
    background: ${dt('carousel.indicator.hover.background')};
}

.p-carousel-indicator-active .p-carousel-indicator-button {
    background: ${dt('carousel.indicator.active.background')};
}

.p-carousel-vertical .p-carousel-content {
    flex-direction: column;
}

.p-carousel-vertical .p-carousel-item-list {
    flex-direction: column;
    height: 100%;
}

.p-items-hidden .p-carousel-item {
    visibility: hidden;
}

.p-items-hidden .p-carousel-item.p-carousel-item-active {
    visibility: visible;
}
`;

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
            'p-disabled': instance.backwardIsDisabled
        }
    ],
    viewport: 'p-carousel-viewport',
    itemList: 'p-carousel-item-list',
    itemClone: ({ index, value, totalShiftedItems, d_numVisible }) => [
        'p-carousel-item p-carousel-item-clone',
        {
            'p-carousel-item-active': totalShiftedItems * -1 === value.length + d_numVisible,
            'p-carousel-item-start': index === 0,
            'p-carousel-item-end': value.slice(-1 * d_numVisible).length - 1 === index
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
            'p-disabled': instance.forwardIsDisabled
        }
    ],
    indicatorList: 'p-carousel-indicator-list',
    indicator: ({ instance, index }) => [
        'p-carousel-indicator',
        {
            'p-carousel-indicator-active': instance.d_page === index
        }
    ],
    indicatorButton: 'p-carousel-indicator-button',
    footer: 'p-carousel-footer'
};

@Injectable()
export class CarouselStyle extends BaseStyle {
    name = 'carousel';

    theme = theme;

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
