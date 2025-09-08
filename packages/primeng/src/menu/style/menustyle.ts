import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/menu';
import { BaseStyle } from 'primeng/base';

const inlineStyles = {
    root: ({ instance }) => ({ position: instance.popup ? 'absolute' : 'relative' })
};

const classes = {
    root: ({ instance }) => [
        'p-menu p-component',
        {
            'p-menu-overlay': instance.popup
        }
    ],
    start: 'p-menu-start',
    list: 'p-menu-list',
    submenuLabel: 'p-menu-submenu-label',
    separator: 'p-menu-separator',
    end: 'p-menu-end',
    item: ({ instance, item, id }) => [
        'p-menu-item',
        {
            'p-focus': instance.focusedOptionId() && id === instance.focusedOptionId(),
            'p-disabled': instance.disabled(item.disabled)
        },
        item.styleClass
    ],
    itemContent: 'p-menu-item-content',
    itemLink: 'p-menu-item-link',
    itemIcon: ({ item }) => ['p-menu-item-icon', item.icon, item.iconClass],
    itemLabel: 'p-menu-item-label'
};

@Injectable()
export class MenuStyle extends BaseStyle {
    name = 'menu';

    theme = style;

    classes = classes;

    inlineStyles = inlineStyles;
}

/**
 *
 * Menu is a navigation / command component that supports dynamic and static positioning.
 *
 * [Live Demo](https://www.primeng.org/menu/)
 *
 * @module menustyle
 *
 */

export enum MenuClasses {
    /**
     * Class name of the root element
     */
    root = 'p-menu',
    /**
     * Class name of the start element
     */
    start = 'p-menu-start',
    /**
     * Class name of the list element
     */
    list = 'p-menu-list',
    /**
     * Class name of the submenu item element
     */
    submenuItem = 'p-menu-submenu-item',
    /**
     * Class name of the separator element
     */
    separator = 'p-menu-separator',
    /**
     * Class name of the end element
     */
    end = 'p-menu-end',
    /**
     * Class name of the item element
     */
    item = 'p-menu-item',
    /**
     * Class name of the item content element
     */
    itemContent = 'p-menu-item-content',
    /**
     * Class name of the item link element
     */
    itemLink = 'p-menu-item-link',
    /**
     * Class name of the item icon element
     */
    itemIcon = 'p-menu-item-icon',
    /**
     * Class name of the item label element
     */
    itemLabel = 'p-menu-item-label'
}

export interface MenuStyle extends BaseStyle {}
