import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/dock';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: ({ instance }) => [
        'p-dock p-component',
        `p-dock-${instance.position}`,
        {
            'p-dock-mobile': instance.queryMatches()
        }
    ],
    listContainer: 'p-dock-list-container',
    list: 'p-dock-list',
    item: ({ instance, item, id }) => [
        'p-dock-item',
        {
            'p-focus': instance.isItemActive(id),
            'p-disabled': instance.disabled(item)
        }
    ],
    itemContent: 'p-dock-item-content',
    itemLink: 'p-dock-item-link',
    itemIcon: 'p-dock-item-icon'
};

@Injectable()
export class DockStyle extends BaseStyle {
    name = 'dock';

    theme = style;

    classes = classes;
}

/**
 *
 * Dock is a navigation component consisting of menuitems.
 *
 * [Live Demo](https://www.primeng.org/dock/)
 *
 * @module dockstyle
 *
 */
export enum DockClasses {
    /**
     * Class name of the root element
     */
    root = 'p-dock',
    /**
     * Class name of the list container element
     */
    listContainer = 'p-dock-list-container',
    /**
     * Class name of the list element
     */
    list = 'p-dock-list',
    /**
     * Class name of the item element
     */
    item = 'p-dock-item',
    /**
     * Class name of the item content element
     */
    itemContent = 'p-dock-item-content',
    /**
     * Class name of the item link element
     */
    itemLink = 'p-dock-item-link',
    /**
     * Class name of the item icon element
     */
    itemIcon = 'p-dock-item-icon'
}

export interface DockStyle extends BaseStyle {}
