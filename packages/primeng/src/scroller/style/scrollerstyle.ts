import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = /*css*/ `
.p-virtualscroller {
    position: relative;
    overflow: auto;
    contain: strict;
    transform: translateZ(0);
    will-change: scroll-position;
    outline: 0 none;
}

.p-virtualscroller-content {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
    min-width: 100%;
    will-change: transform;
}

.p-virtualscroller-spacer {
    position: absolute;
    top: 0;
    left: 0;
    height: 1px;
    width: 1px;
    transform-origin: 0 0;
    pointer-events: none;
}

.p-virtualscroller-loader {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: dt('virtualscroller.loader.mask.background');
    color: dt('virtualscroller.loader.mask.color');
}

.p-virtualscroller-loader-mask {
    display: flex;
    align-items: center;
    justify-content: center;
}

.p-virtualscroller-loading-icon {
    font-size: dt('virtualscroller.loader.icon.size');
    width: dt('virtualscroller.loader.icon.size');
    height: dt('virtualscroller.loader.icon.size');
}

.p-virtualscroller-horizontal > .p-virtualscroller-content {
    display: flex;
}

.p-virtualscroller-inline .p-virtualscroller-content {
    position: static;
}
`;

const classes = {
    root: ({ instance }) => [
        'p-virtualscroller',
        {
            'p-virtualscroller-inline': instance.inline,
            'p-virtualscroller-both p-both-scroll': instance.both,
            'p-virtualscroller-horizontal p-horizontal-scroll': instance.horizontal
        }
    ],
    content: 'p-virtualscroller-content',
    spacer: 'p-virtualscroller-spacer',
    loader: ({ instance }) => [
        'p-virtualscroller-loader',
        {
            'p-virtualscroller-loader-mask': !instance.loaderTemplate
        }
    ],
    loadingIcon: 'p-virtualscroller-loading-icon'
};

@Injectable()
export class ScrollerStyle extends BaseStyle {
    name = 'virtualscroller';

    theme = theme;

    classes = classes;
}

/**
 *
 * VirtualScroller is a performant approach to handle huge data efficiently.
 *
 * [Live Demo](https://www.primeng.org/scroller/)
 *
 * @module scrollerstyle
 *
 */
export enum ScrollerClasses {
    /**
     * Class name of the root element
     */
    root = 'p-virtualscroller',
    /**
     * Class name of the content element
     */
    content = 'p-virtualscroller-content',
    /**
     * Class name of the spacer element
     */
    spacer = 'p-virtualscroller-spacer',
    /**
     * Class name of the loader element
     */
    loader = 'p-virtualscroller-loader',
    /**
     * Class name of the loading icon element
     */
    loadingIcon = 'p-virtualscroller-loading-icon'
}

export interface ScrollerStyle extends BaseStyle {}
