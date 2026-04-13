import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/menu';
import { BaseStyle } from 'primeng/base';

const inlineStyles = {
    root: ({ instance }) => ({
        position: instance.popup() ? 'absolute' : 'relative',
        ...instance.style()
    })
};

const classes = {
    root: ({ instance }) => [
        'p-menu p-component',
        {
            'p-menu-overlay': instance.popup()
        }
    ],
    start: 'p-menu-start',
    list: 'p-menu-list',
    submenu: 'p-menu-submenu',
    submenuLabel: ({ toggleable }) => ['p-menu-submenu-label', { 'p-menu-submenu-label-toggleable': toggleable }],
    submenuLabelIcon: 'p-menu-submenu-label-icon',
    submenuIcon: 'p-menu-submenu-icon',
    submenuList: 'p-menu-submenu-list',
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

const toggleableStyle = `
    .p-menu-submenu {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: dt('menu.list.gap');
    }

    .p-menu-submenu-label-toggleable {
        cursor: pointer;
        display: flex;
        align-items: center;
        user-select: none;
        padding: dt('menu.item.padding');
        gap: dt('menu.item.gap');
        color: dt('menu.item.color');
        background: transparent;
        font-weight: dt('menu.item.label.font.weight');
        font-size: dt('menu.item.label.font.size');
        border-radius: dt('menu.item.border.radius');
        transition: background dt('menu.transition.duration'), color dt('menu.transition.duration');
    }

    .p-menu-submenu-label-toggleable:hover {
        background: dt('menu.item.focus.background');
        color: dt('menu.item.focus.color');
    }

    .p-menu-submenu-label-toggleable:hover .p-menu-submenu-label-icon,
    .p-menu-submenu-label-toggleable:hover .p-menu-submenu-icon {
        color: dt('menu.item.icon.focus.color');
    }

    .p-menu-submenu-label-icon {
        color: dt('menu.item.icon.color');
        font-size: dt('menu.item.icon.size');
        width: dt('menu.item.icon.size');
        height: dt('menu.item.icon.size');
        flex-shrink: 0;
    }

    .p-menu-submenu-icon {
        margin-inline-start: auto;
        color: dt('menu.item.icon.color');
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
        transition: transform 0.2s;
    }

    .p-menu-submenu-icon[data-p-expanded] {
        transform: rotate(180deg);
    }

    .p-menu-submenu-label[data-p-depth] {
        font-size: 0.6875rem;
    }

    .p-menu-submenu-label[data-p-depth="1"] {
        font-size: 0.8125rem;
    }

    .p-menu-submenu-label[data-p-depth="2"] {
        font-size: 0.75rem;
    }

    .p-menu-submenu-list {
        list-style: none;
        margin: 0;
        padding: 0;
        padding-inline-start: 1rem;
        display: flex;
        flex-direction: column;
        gap: dt('menu.list.gap');
    }
`;

@Injectable()
export class MenuStyle extends BaseStyle {
    name = 'menu';

    style = style + toggleableStyle;

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
    itemLabel = 'p-menu-item-label',
    /**
     * Class name of the submenu element
     */
    submenu = 'p-menu-submenu',
    /**
     * Class name of the submenu label element
     */
    submenuLabel = 'p-menu-submenu-label',
    /**
     * Class name of the submenu icon element
     */
    submenuIcon = 'p-menu-submenu-icon',
    /**
     * Class name of the submenu list element
     */
    submenuList = 'p-menu-submenu-list'
}

export interface MenuStyle extends BaseStyle {}
