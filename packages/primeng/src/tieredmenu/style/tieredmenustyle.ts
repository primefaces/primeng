import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';
import { style } from '@primeuix/styles/tieredmenu';

const inlineStyles = {
    submenu: ({ instance, processedItem }) => ({ display: instance.isItemActive(processedItem) ? 'flex' : 'none' })
};

const classes = {
    root: ({ instance }) => [
        'p-tieredmenu p-component',
        {
            'p-tieredmenu-overlay': instance.popup,
            'p-tieredmenu-mobile': instance.queryMatches
        }
    ],
    start: 'p-tieredmenu-start',
    rootList: 'p-tieredmenu-root-list',
    item: ({ instance, processedItem }) => [
        'p-tieredmenu-item',
        processedItem.styleClass,
        {
            'p-tieredmenu-item-active': instance.isItemActive(processedItem),
            'p-focus': instance.isItemFocused(processedItem),
            'p-disabled': instance.isItemDisabled(processedItem)
        }
    ],
    itemContent: 'p-tieredmenu-item-content',
    itemLink: 'p-tieredmenu-item-link',
    itemIcon: 'p-tieredmenu-item-icon',
    itemLabel: 'p-tieredmenu-item-label',
    itemBadge: 'p-menuitem-badge',
    submenuIcon: 'p-tieredmenu-submenu-icon',
    submenu: 'p-tieredmenu-submenu',
    separator: 'p-tieredmenu-separator',
    end: 'p-tieredmenu-end'
};

@Injectable()
export class TieredMenuStyle extends BaseStyle {
    name = 'tieredmenu';

    theme = style;

    classes = classes;

    inlineStyles = inlineStyles;
}

/**
 *
 * TieredMenu displays submenus in nested overlays.
 *
 * [Live Demo](https://www.primeng.org/menu/)
 *
 * @module tieredmenustyle
 *
 */
export enum TieredMenuClasses {
    /**
     * Class name of the root element
     */
    root = 'p-tieredmenu',
    /**
     * Class name of the start element
     */
    start = 'p-tieredmenu-start',
    /**
     * Class name of the root list element
     */
    rootList = 'p-tieredmenu-root-list',
    /**
     * Class name of the item element
     */
    item = 'p-tieredmenu-item',
    /**
     * Class name of the item content element
     */
    itemContent = 'p-tieredmenu-item-content',
    /**
     * Class name of the item link element
     */
    itemLink = 'p-tieredmenu-item-link',
    /**
     * Class name of the item icon element
     */
    itemIcon = 'p-tieredmenu-item-icon',
    /**
     * Class name of the item label element
     */
    itemLabel = 'p-tieredmenu-item-label',
    /**
     * Class name of the submenu icon element
     */
    submenuIcon = 'p-tieredmenu-submenu-icon',
    /**
     * Class name of the submenu element
     */
    submenu = 'p-tieredmenu-submenu',
    /**
     * Class name of the separator element
     */
    separator = 'p-tieredmenu-separator',
    /**
     * Class name of the end element
     */
    end = 'p-tieredmenu-end'
}

export interface TieredMenuStyle extends BaseStyle {}
