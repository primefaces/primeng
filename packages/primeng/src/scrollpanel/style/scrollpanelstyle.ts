import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/scrollpanel';
import { BaseStyle } from 'primeng/base';

const theme = /*css*/ `
    ${style}

    .p-scrollpanel {
        display: block;
    }
`;

const classes = {
    root: 'p-scrollpanel p-component',
    contentContainer: 'p-scrollpanel-content-container',
    content: 'p-scrollpanel-content',
    barX: 'p-scrollpanel-bar p-scrollpanel-bar-x',
    barY: 'p-scrollpanel-bar p-scrollpanel-bar-y'
};

@Injectable()
export class ScrollPanelStyle extends BaseStyle {
    name = 'scrollpanel';

    theme = theme;

    classes = classes;
}

/**
 *
 * ScrollPanel is a cross browser, lightweight and themable alternative to native browser scrollbar.
 *
 * [Live Demo](https://www.primeng.org/scrollpanel/)
 *
 * @module scrollpanelstyle
 *
 */
export enum ScrollPanelClasses {
    /**
     * Class name of the root element
     */
    root = 'p-scrollpanel',
    /**
     * Class name of the content container element
     */
    contentContainer = 'p-scrollpanel-content-container',
    /**
     * Class name of the content element
     */
    content = 'p-scrollpanel-content',
    /**
     * Class name of the bar x element
     */
    barX = 'p-scrollpanel-bar-x',
    /**
     * Class name of the bar y element
     */
    barY = 'p-scrollpanel-bar-y'
}

export interface ScrollPanelStyle extends BaseStyle {}
