import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-tieredmenu {
    background: ${dt('tieredmenu.background')};
    color: ${dt('tieredmenu.color')};
    border: 1px solid ${dt('tieredmenu.border.color')};
    border-radius: ${dt('tieredmenu.border.radius')};
    min-width: 12.5rem;
}

.p-tieredmenu-root-list,
.p-tieredmenu-submenu {
    margin: 0;
    padding: ${dt('tieredmenu.list.padding')};
    list-style: none;
    outline: 0 none;
    display: flex;
    flex-direction: column;
    gap: ${dt('tieredmenu.list.gap')};
}

.p-tieredmenu-submenu {
    position: absolute;
    min-width: 100%;
    z-index: 1;
    background: ${dt('tieredmenu.background')};
    color: ${dt('tieredmenu.color')};
    border: 1px solid ${dt('tieredmenu.border.color')};
    border-radius: ${dt('tieredmenu.border.radius')};
    box-shadow: ${dt('tieredmenu.shadow')};
}

.p-tieredmenu-item {
    position: relative;
}

.p-tieredmenu-item-content {
    transition: background ${dt('tieredmenu.transition.duration')}, color ${dt('tieredmenu.transition.duration')};
    border-radius: ${dt('tieredmenu.item.border.radius')};
    color: ${dt('tieredmenu.item.color')};
}

.p-tieredmenu-item-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    text-decoration: none;
    overflow: hidden;
    position: relative;
    color: inherit;
    padding: ${dt('tieredmenu.item.padding')};
    gap: ${dt('tieredmenu.item.gap')};
    user-select: none;
    outline: 0 none;
}

.p-tieredmenu-item-label {
    line-height: 1;
}

.p-tieredmenu-item-icon {
    color: ${dt('tieredmenu.item.icon.color')};
}

.p-tieredmenu-submenu-icon {
    color: ${dt('tieredmenu.submenu.icon.color')};
    margin-left: auto;
    font-size: ${dt('tieredmenu.submenu.icon.size')};
    width: ${dt('tieredmenu.submenu.icon.size')};
    height: ${dt('tieredmenu.submenu.icon.size')};
}

.p-tieredmenu-item.p-focus > .p-tieredmenu-item-content {
    color: ${dt('tieredmenu.item.focus.color')};
    background: ${dt('tieredmenu.item.focus.background')};
}

.p-tieredmenu-item.p-focus > .p-tieredmenu-item-content .p-tieredmenu-item-icon {
    color: ${dt('tieredmenu.item.icon.focus.color')};
}

.p-tieredmenu-item.p-focus > .p-tieredmenu-item-content .p-tieredmenu-submenu-icon {
    color: ${dt('tieredmenu.submenu.icon.focus.color')};
}

.p-tieredmenu-item:not(.p-disabled) > .p-tieredmenu-item-content:hover {
    color: ${dt('tieredmenu.item.focus.color')};
    background: ${dt('tieredmenu.item.focus.background')};
}

.p-tieredmenu-item:not(.p-disabled) > .p-tieredmenu-item-content:hover .p-tieredmenu-item-icon {
    color: ${dt('tieredmenu.item.icon.focus.color')};
}

.p-tieredmenu-item:not(.p-disabled) > .p-tieredmenu-item-content:hover .p-tieredmenu-submenu-icon {
    color: ${dt('tieredmenu.submenu.icon.focus.color')};
}

.p-tieredmenu-item-active > .p-tieredmenu-item-content {
    color: ${dt('tieredmenu.item.active.color')};
    background: ${dt('tieredmenu.item.active.background')};
}

.p-tieredmenu-item-active > .p-tieredmenu-item-content .p-tieredmenu-item-icon {
    color: ${dt('tieredmenu.item.icon.active.color')};
}

.p-tieredmenu-item-active > .p-tieredmenu-item-content .p-tieredmenu-submenu-icon {
    color: ${dt('tieredmenu.submenu.icon.active.color')};
}

.p-tieredmenu-separator {
    border-top: 1px solid ${dt('tieredmenu.separator.border.color')};
}

.p-tieredmenu-overlay {
    position: absolute;
    box-shadow: ${dt('tieredmenu.shadow')};
}

.p-tieredmenu-enter-from,
.p-tieredmenu-leave-active {
    opacity: 0;
}

.p-tieredmenu-enter-active {
    transition: opacity 250ms;
}
    .p-tieredmenu-mobile {
    position: relative;
}

.p-tieredmenu-mobile .p-tieredmenu-button {
    display: flex;
}

.p-tieredmenu-mobile .p-tieredmenu-root-list > .p-tieredmenu-item > .p-tieredmenu-item-content > .p-tieredmenu-item-link {
    padding: ${dt('tieredmenu.item.padding')};
}

.p-tieredmenu-mobile .p-tieredmenu-root-list .p-tieredmenu-separator {
    border-top: 1px solid ${dt('tieredmenu.separator.border.color')};
}

.p-tieredmenu-mobile .p-tieredmenu-root-list > .p-tieredmenu-item > .p-tieredmenu-item-content .p-tieredmenu-submenu-icon {
    margin-left: auto;
    transition: transform 0.2s;
}

.p-tieredmenu-mobile .p-tieredmenu-root-list > .p-tieredmenu-item-active > .p-tieredmenu-item-content .p-tieredmenu-submenu-icon {
    transform: rotate(-90deg);
}

.p-tieredmenu-mobile .p-tieredmenu-submenu .p-tieredmenu-submenu-icon {
    transition: transform 0.2s;
    transform: rotate(90deg);
}

.p-tieredmenu-mobile  .p-tieredmenu-item-active > .p-tieredmenu-item-content .p-tieredmenu-submenu-icon {
    transform: rotate(-90deg);
}

.p-tieredmenu-mobile .p-tieredmenu-submenu {
    position: static;
    box-shadow: none;
    border: 0 none;
    padding-left: ${dt('tieredmenu.submenu.mobile.indent')};
}
`;

const inlineStyles = {
    submenu: ({ instance, processedItem }) => ({ display: instance.isItemActive(processedItem) ? 'flex' : 'none' })
};

const classes = {
    root: ({ instance, props }) => [
        'p-tieredmenu p-component',
        {
            'p-tieredmenu-overlay': props.popup
        }
    ],
    start: 'p-tieredmenu-start',
    rootList: 'p-tieredmenu-root-list',
    item: ({ instance, processedItem }) => [
        'p-tieredmenu-item',
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
    submenuIcon: 'p-tieredmenu-submenu-icon',
    submenu: 'p-tieredmenu-submenu',
    separator: 'p-tieredmenu-separator',
    end: 'p-tieredmenu-end'
};

@Injectable()
export class TieredMenuStyle extends BaseStyle {
    name = 'tieredmenu';

    theme = theme;

    classes = classes;
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
