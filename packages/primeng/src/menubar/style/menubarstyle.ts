import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/menubar';
import { BaseStyle } from 'primeng/base';

const inlineStyles = {
    submenu: ({ instance, processedItem }) => ({ display: instance.isItemActive(processedItem) ? 'flex' : 'none' })
};

const classes = {
    root: ({ instance }) => [
        'p-menubar p-component',
        {
            'p-menubar-mobile': instance.queryMatches(),
            'p-menubar-mobile-active': instance.mobileActive()
        }
    ],
    start: 'p-menubar-start',
    button: 'p-menubar-button',
    rootList: 'p-menubar-root-list',
    item: ({ instance, processedItem }) => [
        'p-menubar-item',
        {
            'p-menubar-item-active': instance.isItemActive(processedItem),
            'p-focus': instance.isItemFocused(processedItem),
            'p-disabled': instance.isItemDisabled(processedItem)
        }
    ],
    itemContent: 'p-menubar-item-content',
    itemLink: 'p-menubar-item-link',
    itemIcon: 'p-menubar-item-icon',
    itemLabel: 'p-menubar-item-label',
    submenuIcon: 'p-menubar-submenu-icon',
    submenu: 'p-menubar-submenu',
    separator: 'p-menubar-separator',
    end: 'p-menubar-end'
};

@Injectable()
export class MenuBarStyle extends BaseStyle {
    name = 'menubar';

    style = style;

    classes = classes;

    inlineStyles = inlineStyles;
}

/**
 *
 * Menubar is a horizontal menu component.
 *
 * [Live Demo](https://www.primeng.org/menubar/)
 *
 * @module menubarstyle
 *
 */
export enum MenubarClasses {
    /**
     * Class name of the root element
     */
    root = 'p-menubar',
    /**
     * Class name of the start element
     */
    start = 'p-menubar-start',
    /**
     * Class name of the button element
     */
    button = 'p-menubar-button',
    /**
     * Class name of the root list element
     */
    rootList = 'p-menubar-root-list',
    /**
     * Class name of the item element
     */
    item = 'p-menubar-item',
    /**
     * Class name of the item content element
     */
    itemContent = 'p-menubar-item-content',
    /**
     * Class name of the item link element
     */
    itemLink = 'p-menubar-item-link',
    /**
     * Class name of the item icon element
     */
    itemIcon = 'p-menubar-item-icon',
    /**
     * Class name of the item label element
     */
    itemLabel = 'p-menubar-item-label',
    /**
     * Class name of the submenu icon element
     */
    submenuIcon = 'p-menubar-submenu-icon',
    /**
     * Class name of the submenu element
     */
    submenu = 'p-menubar-submenu',
    /**
     * Class name of the separator element
     */
    separator = 'p-menubar-separator',
    /**
     * Class name of the end element
     */
    end = 'p-menubar-end'
}

export interface MenubarStyle extends BaseStyle {}
