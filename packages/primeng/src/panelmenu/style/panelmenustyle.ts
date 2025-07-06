import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/panelmenu';
import { BaseStyle } from 'primeng/base';

const theme = /*css*/ `
    ${style}
    /*For PrimeNG*/
    .p-panelmenu-item:not(.ng-animating) {
        overflow: hidden;
    }

    .p-panelmenu-panel {
        overflow: hidden;
    }

    .p-panelmenu-root-list,
    .p-panelmenu-submenu,
    .p-panelmenu-item-link {
        outline: 0 none;
    }
`;

const classes = {
    root: () => ['p-panelmenu p-component'],
    panel: 'p-panelmenu-panel',
    header: ({ instance, item }) => [
        'p-panelmenu-header',
        {
            'p-panelmenu-header-active': instance.isItemActive(item) && !!item.items,
            'p-disabled': instance.isItemDisabled(item)
        }
    ],
    headerContent: 'p-panelmenu-header-content',
    headerLink: 'p-panelmenu-header-link',
    headerIcon: 'p-panelmenu-header-icon',
    headerLabel: 'p-panelmenu-header-label',
    contentContainer: ({ instance, processedItem }) => ['p-panelmenu-content-container', { 'p-panelmenu-expanded': instance.isItemActive(processedItem) }],
    content: 'p-panelmenu-content',
    rootList: 'p-panelmenu-root-list',
    item: ({ instance, processedItem }) => [
        'p-panelmenu-item',
        {
            'p-focus': instance.isItemFocused(processedItem) && !instance.isItemDisabled(processedItem),
            'p-disabled': instance.isItemDisabled(processedItem)
        }
    ],
    itemContent: 'p-panelmenu-item-content',
    itemLink: 'p-panelmenu-item-link',
    itemIcon: 'p-panelmenu-item-icon',
    itemLabel: 'p-panelmenu-item-label',
    submenuIcon: 'p-panelmenu-submenu-icon',
    submenu: 'p-panelmenu-submenu',
    separator: 'p-menuitem-separator',
    badge: 'p-menuitem-badge'
};

@Injectable()
export class PanelMenuStyle extends BaseStyle {
    name = 'panelmenu';

    theme = theme;

    classes = classes;
}

/**
 *
 * PanelMenu is a hybrid of Accordion and Tree components.
 *
 * [Live Demo](https://www.primeng.org/panelmenu/)
 *
 * @module panelmenustyle
 *
 */
export enum PanelMenuClasses {
    /**
     * Class name of the root element
     */
    root = 'p-panelmenu',
    /**
     * Class name of the panel element
     */
    panel = 'p-panelmenu-panel',
    /**
     * Class name of the header element
     */
    header = 'p-panelmenu-header',
    /**
     * Class name of the header content element
     */
    headerContent = 'p-panelmenu-header-content',
    /**
     * Class name of the header link element
     */
    headerLink = 'p-panelmenu-header-link',
    /**
     * Class name of the header icon element
     */
    headerIcon = 'p-panelmenu-header-icon',
    /**
     * Class name of the header label element
     */
    headerLabel = 'p-panelmenu-header-label',
    /**
     * Class name of the content container element
     */
    contentContainer = 'p-panelmenu-content-container',
    /**
     * Class name of the content element
     */
    content = 'p-panelmenu-content',
    /**
     * Class name of the root list element
     */
    rootList = 'p-panelmenu-root-list',
    /**
     * Class name of the item element
     */
    item = 'p-panelmenu-item',
    /**
     * Class name of the item content element
     */
    itemContent = 'p-panelmenu-item-content',
    /**
     * Class name of the item link element
     */
    itemLink = 'p-panelmenu-item-link',
    /**
     * Class name of the item icon element
     */
    itemIcon = 'p-panelmenu-item-icon',
    /**
     * Class name of the item label element
     */
    itemLabel = 'p-panelmenu-item-label',
    /**
     * Class name of the submenu icon element
     */
    submenuIcon = 'p-panelmenu-submenu-icon',
    /**
     * Class name of the submenu element
     */
    submenu = 'p-panelmenu-submenu',
    separator = 'p-menuitem-separator'
}

export interface PanelMenuStyle extends BaseStyle {}
