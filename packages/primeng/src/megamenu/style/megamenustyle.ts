import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/megamenu';
import { BaseStyle } from 'primeng/base';

const inlineStyles = {
    rootList: ({ instance }) => ({ 'max-height': instance.scrollHeight, overflow: 'auto' })
};

const classes = {
    root: ({ instance }) => [
        'p-megamenu p-component',
        {
            'p-megamenu-mobile': instance.queryMatches,
            'p-megamenu-mobile-active': instance.mobileActive,
            'p-megamenu-horizontal': instance.orientation === 'horizontal',
            'p-megamenu-vertical': instance.orientation === 'vertical'
        }
    ],
    start: 'p-megamenu-start',
    button: 'p-megamenu-button',
    rootList: 'p-megamenu-root-list',
    submenuLabel: ({ instance, processedItem }) => [
        'p-megamenu-submenu-label',
        {
            'p-disabled': instance.isItemDisabled(processedItem)
        }
    ],
    item: ({ instance, processedItem }) => [
        'p-megamenu-item',
        instance.getItemProp(processedItem, 'styleClass'),
        instance.getItemProp(processedItem, 'class'),
        {
            'p-megamenu-item-active': instance.isItemActive(processedItem),
            'p-focus': instance.isItemFocused(processedItem),
            'p-disabled': instance.isItemDisabled(processedItem)
        }
    ],
    itemContent: 'p-megamenu-item-content',
    itemLink: 'p-megamenu-item-link',
    itemIcon: 'p-megamenu-item-icon',
    itemLabel: 'p-megamenu-item-label',
    submenuIcon: 'p-megamenu-submenu-icon',
    overlay: 'p-megamenu-overlay',
    grid: 'p-megamenu-grid',
    column: ({ instance, processedItem }) => {
        let length = instance.isItemGroup(processedItem) ? processedItem.items.length : 0;
        let columnClass;

        if (instance.megaMenu.queryMatches) columnClass = 'p-megamenu-col-12';
        else {
            switch (length) {
                case 2:
                    columnClass = 'p-megamenu-col-6';
                    break;

                case 3:
                    columnClass = 'p-megamenu-col-4';
                    break;

                case 4:
                    columnClass = 'p-megamenu-col-3';
                    break;

                case 6:
                    columnClass = 'p-megamenu-col-2';
                    break;

                default:
                    columnClass = 'p-megamenu-col-12';
                    break;
            }
        }

        return columnClass;
    },
    submenu: 'p-megamenu-submenu',
    separator: 'p-megamenu-separator',
    end: 'p-megamenu-end'
};

@Injectable()
export class MegaMenuStyle extends BaseStyle {
    name = 'megamenu';

    theme = style;

    classes = classes;

    inlineStyles = inlineStyles;
}

/**
 *
 * MegaMenu is navigation component that displays submenus together.
 *
 * [Live Demo](https://www.primeng.org/megamenu/)
 *
 * @module megamenustyle
 *
 */

export enum MegaMenuClasses {
    /**
     * Class name of the root element
     */
    root = 'p-megamenu',
    /**
     * Class name of the start element
     */
    start = 'p-megamenu-start',
    /**
     * Class name of the button element
     */
    button = 'p-megamenu-button',
    /**
     * Class name of the root list element
     */
    rootList = 'p-megamenu-root-list',
    /**
     * Class name of the submenu item element
     */
    submenuItem = 'p-megamenu-submenu-item',
    /**
     * Class name of the item element
     */
    item = 'p-megamenu-item',
    /**
     * Class name of the item content element
     */
    itemContent = 'p-megamenu-item-content',
    /**
     * Class name of the item link element
     */
    itemLink = 'p-megamenu-item-link',
    /**
     * Class name of the item icon element
     */
    itemIcon = 'p-megamenu-item-icon',
    /**
     * Class name of the item label element
     */
    itemLabel = 'p-megamenu-item-label',
    /**
     * Class name of the submenu icon element
     */
    submenuIcon = 'p-megamenu-submenu-icon',
    /**
     * Class name of the panel element
     */
    panel = 'p-megamenu-panel',
    /**
     * Class name of the grid element
     */
    grid = 'p-megamenu-grid',
    /**
     * Class name of the submenu element
     */
    submenu = 'p-megamenu-submenu',
    /**
     * Class name of the submenu item label element
     */
    submenuItemLabel = 'p-megamenu-submenu-item-label',
    /**
     * Class name of the separator element
     */
    separator = 'p-megamenu-separator',
    /**
     * Class name of the end element
     */
    end = 'p-megamenu-end'
}

export interface MegaMenuStyle extends BaseStyle {}
