import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-panelmenu {
    display: flex;
    flex-direction: column;
    gap: ${dt('panelmenu.gap')};
}

.p-panelmenu-panel {
    background: ${dt('panelmenu.panel.background')};
    border-width: ${dt('panelmenu.panel.border.width')};
    border-style: solid;
    border-color: ${dt('panelmenu.panel.border.color')};
    color: ${dt('panelmenu.panel.color')};
    border-radius: ${dt('panelmenu.panel.border.radius')};
    padding: ${dt('panelmenu.panel.padding')};
}

.p-panelmenu-panel:first-child {
    border-width: ${dt('panelmenu.panel.first.border.width')};
    border-top-left-radius: ${dt('panelmenu.panel.first.top.border.radius')};
    border-top-right-radius: ${dt('panelmenu.panel.first.top.border.radius')};
}

.p-panelmenu-panel:last-child {
    border-width: ${dt('panelmenu.panel.last.border.width')};
    border-bottom-left-radius: ${dt('panelmenu.panel.last.bottom.border.radius')};
    border-bottom-right-radius: ${dt('panelmenu.panel.last.bottom.border.radius')};
}

.p-panelmenu-header {
    outline: 0 none;
}

.p-panelmenu-header-content {
    border-radius: ${dt('panelmenu.item.border.radius')};
    transition: background ${dt('panelmenu.transition.duration')}, color ${dt('panelmenu.transition.duration')}, outline-color ${dt('panelmenu.transition.duration')}, box-shadow ${dt('panelmenu.transition.duration')};
    outline-color: transparent;
    color: ${dt('panelmenu.item.color')};
}

.p-panelmenu-header-link {
    display: flex;
    gap: ${dt('panelmenu.item.gap')};
    padding: ${dt('panelmenu.item.padding')};
    align-items: center;
    user-select: none;
    cursor: pointer;
    position: relative;
    text-decoration: none;
    color: inherit;
}

.p-panelmenu-header-icon,
.p-panelmenu-item-icon {
    color: ${dt('panelmenu.item.icon.color')};
}

.p-panelmenu-submenu-icon {
    color: ${dt('panelmenu.submenu.icon.color')};
}

.p-panelmenu-header:not(.p-disabled):focus-visible .p-panelmenu-header-content {
    background: ${dt('panelmenu.item.focus.background')};
    color: ${dt('panelmenu.item.focus.color')};
}

.p-panelmenu-header:not(.p-disabled):focus-visible .p-panelmenu-header-content .p-panelmenu-header-icon {
    color: ${dt('panelmenu.item.icon.focus.color')};
}

.p-panelmenu-header:not(.p-disabled):focus-visible .p-panelmenu-header-content .p-panelmenu-submenu-icon {
    color: ${dt('panelmenu.submenu.icon.focus.color')};
}

.p-panelmenu-header:not(.p-disabled) .p-panelmenu-header-content:hover {
    background: ${dt('panelmenu.item.focus.background')};
    color: ${dt('panelmenu.item.focus.color')};
}

.p-panelmenu-header:not(.p-disabled) .p-panelmenu-header-content:hover .p-panelmenu-header-icon {
    color: ${dt('panelmenu.item.icon.focus.color')};
}

.p-panelmenu-header:not(.p-disabled) .p-panelmenu-header-content:hover .p-panelmenu-submenu-icon {
    color: ${dt('panelmenu.submenu.icon.focus.color')};
}

.p-panelmenu-submenu {
    margin: 0;
    padding: 0 0 0 ${dt('panelmenu.submenu.indent')};
    outline: 0;
    list-style: none;
}

.p-panelmenu-item-link {
    display: flex;
    gap: ${dt('panelmenu.item.gap')};
    padding: ${dt('panelmenu.item.padding')};
    align-items: center;
    user-select: none;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    position: relative;
    overflow: hidden;
}

.p-panelmenu-item-label {
    line-height: 1;
}

.p-panelmenu-item-content {
    border-radius: ${dt('panelmenu.item.border.radius')};
    transition: background ${dt('panelmenu.transition.duration')}, color ${dt('panelmenu.transition.duration')}, outline-color ${dt('panelmenu.transition.duration')}, box-shadow ${dt('panelmenu.transition.duration')};
    color: ${dt('panelmenu.item.color')};
    outline-color: transparent;
}

.p-panelmenu-item.p-focus > .p-panelmenu-item-content {
    background: ${dt('panelmenu.item.focus.background')};
    color: ${dt('panelmenu.item.focus.color')};
}

.p-panelmenu-item.p-focus > .p-panelmenu-item-content .p-panelmenu-item-icon {
    color: ${dt('panelmenu.item.focus.color')};
}

.p-panelmenu-item.p-focus > .p-panelmenu-item-content .p-panelmenu-submenu-icon {
    color: ${dt('panelmenu.submenu.icon.focus.color')};
}

.p-panelmenu-item:not(.p-disabled) > .p-panelmenu-item-content:hover {
    background: ${dt('panelmenu.item.focus.background')};
    color: ${dt('panelmenu.item.focus.color')};
}

.p-panelmenu-item:not(.p-disabled) > .p-panelmenu-item-content:hover .p-panelmenu-item-icon {
    color: ${dt('panelmenu.item.icon.focus.color')};
}

.p-panelmenu-item:not(.p-disabled) > .p-panelmenu-item-content:hover .p-panelmenu-submenu-icon {
    color: ${dt('panelmenu.submenu.icon.focus.color')};
}


/*For PrimeNG*/

.p-panelmenu-item:not(.ng-animating) {
    overflow: hidden;
}

.p-panelmenu-panel {
    overflow: hidden;
}

`;

const classes = {
    root: 'p-panelmenu p-component',
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
    contentContainer: 'p-panelmenu-content-container',
    content: 'p-panelmenu-content',
    rootList: 'p-panelmenu-root-list',
    item: ({ instance, processedItem }) => [
        'p-panelmenu-item',
        {
            'p-focus': instance.isItemFocused(processedItem),
            'p-disabled': instance.isItemDisabled(processedItem)
        }
    ],
    itemContent: 'p-panelmenu-item-content',
    itemLink: 'p-panelmenu-item-link',
    itemIcon: 'p-panelmenu-item-icon',
    itemLabel: 'p-panelmenu-item-label',
    submenuIcon: 'p-panelmenu-submenu-icon',
    submenu: 'p-panelmenu-submenu',
    separator: 'p-menuitem-separator'
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
