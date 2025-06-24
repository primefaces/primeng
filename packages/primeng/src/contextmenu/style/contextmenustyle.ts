import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';
import { style } from '@primeuix/styles/contextmenu';

const inlineStyles = {
    root: { position: 'absolute' }
};

const classes = {
    root: () => ['p-contextmenu p-component'],
    rootList: 'p-contextmenu-root-list',
    item: ({ instance, processedItem }) => [
        'p-contextmenu-item',
        {
            'p-contextmenu-item-active': instance.isItemActive(processedItem),
            'p-focus': instance.isItemFocused(processedItem),
            'p-disabled': instance.isItemDisabled(processedItem),
            'p-contextmenu-mobile': instance.queryMatches
        }
    ],
    itemContent: 'p-contextmenu-item-content',
    itemLink: 'p-contextmenu-item-link',
    itemIcon: 'p-contextmenu-item-icon',
    itemLabel: 'p-contextmenu-item-label',
    submenuIcon: 'p-contextmenu-submenu-icon',
    submenu: 'p-contextmenu-submenu',
    separator: 'p-contextmenu-separator'
};

@Injectable()
export class ContextMenuStyle extends BaseStyle {
    name = 'contextmenu';

    theme = style;

    classes = classes;

    inlineStyles = inlineStyles;
}

/**
 *
 * ContextMenu displays an overlay menu on right click of its target. Note that components like DataTable has special integration with ContextMenu.
 * Refer to documentation of the individual documentation of the with context menu support.
 *
 * [Live Demo](https://www.primeng.org/contextmenu/)
 *
 * @module contextmenustyle
 *
 */
export enum ContextMenuClasses {
    /**
     * Class name of the root element
     */
    root = 'p-contextmenu',
    /**
     * Class name of the root list element
     */
    rootList = 'p-contextmenu-root-list',
    /**
     * Class name of the item element
     */
    item = 'p-contextmenu-item',
    /**
     * Class name of the item content element
     */
    itemContent = 'p-contextmenu-item-content',
    /**
     * Class name of the item link element
     */
    itemLink = 'p-contextmenu-item-link',
    /**
     * Class name of the item icon element
     */
    itemIcon = 'p-contextmenu-item-icon',
    /**
     * Class name of the item label element
     */
    itemLabel = 'p-contextmenu-item-label',
    /**
     * Class name of the submenu icon element
     */
    submenuIcon = 'p-contextmenu-submenu-icon',
    /**
     * Class name of the submenu element
     */
    submenu = 'p-contextmenu-submenu',
    /**
     * Class name of the separator element
     */
    separator = 'p-contextmenu-separator'
}

export interface ContextMenuStyle extends BaseStyle {}
