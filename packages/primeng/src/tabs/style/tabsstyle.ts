import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/tabs';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: ({ instance }) => [
        'p-tabs p-component',
        {
            'p-tabs-scrollable': instance.scrollable()
        }
    ]
};

@Injectable()
export class TabsStyle extends BaseStyle {
    name = 'tabs';

    theme = style;

    classes = classes;
}

/**
 *
 * Tabs facilitates seamless switching between different views.
 *
 * [Live Demo](https://www.primeng.org/tabs/)
 *
 * @module tabsstyle
 *
 */

export enum TabsClasses {
    /**
     * Class name of the root element
     */
    root = 'p-tabs',
    /**
     * Class name of the wrapper element
     */
    list = 'p-tablist',
    /**
     * Class name of the content element
     */
    content = 'p-tablist-content',
    /**
     * Class name of the tab list element
     */
    tablist = 'p-tablist-tab-list',
    /**
     * Class name of the tab list element
     */
    tab = 'p-tab',
    /**
     * Class name of the inkbar element
     */
    inkbar = 'p-tablist-active-bar',
    /**
     * Class name of the navigation buttons
     */
    button = 'p-tablist-nav-button',
    /**
     * Class name of the tab panels wrapper
     */
    tabpanels = 'p-tabpanels',
    /**
     * Class name of the tab panel element
     */
    tabpanel = 'p-tabs-panel'
}

export interface TabsStyle extends BaseStyle {}
