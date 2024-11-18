import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-breadcrumb {
    background: ${dt('breadcrumb.background')};
    padding: ${dt('breadcrumb.padding')};
    overflow-x: auto;
}

.p-breadcrumb-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    gap: ${dt('breadcrumb.gap')};
}

.p-breadcrumb-separator {
    display: flex;
    align-items: center;
    color: ${dt('breadcrumb.separator.color')};
}

.p-breadcrumb::-webkit-scrollbar {
    display: none;
}

.p-breadcrumb-item-link {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: ${dt('breadcrumb.item.gap')};
    transition: background ${dt('breadcrumb.transition.duration')}, color ${dt('breadcrumb.transition.duration')}, outline-color ${dt('breadcrumb.transition.duration')}, box-shadow ${dt('breadcrumb.transition.duration')};
    border-radius: ${dt('breadcrumb.item.border.radius')};
    outline-color: transparent;
    color: ${dt('breadcrumb.item.color')};
}

.p-breadcrumb-item-link:focus-visible {
    box-shadow: ${dt('breadcrumb.item.focus.ring.shadow')};
    outline: ${dt('breadcrumb.item.focus.ring.width')} ${dt('breadcrumb.item.focus.ring.style')} ${dt('breadcrumb.item.focus.ring.color')};
    outline-offset: ${dt('breadcrumb.item.focus.ring.offset')};
}

.p-breadcrumb-item-link:hover .p-breadcrumb-item-label {
    color: ${dt('breadcrumb.item.hover.color')};
}

.p-breadcrumb-item-label {
    transition: inherit;
}

.p-breadcrumb-item-icon {
    color: ${dt('breadcrumb.item.icon.color')};
    transition: inherit;
}

.p-breadcrumb-item-link:hover .p-breadcrumb-item-icon {
    color: ${dt('breadcrumb.item.icon.hover.color')};
}
`;

const classes = {
    root: 'p-breadcrumb p-component',
    list: 'p-breadcrumb-list',
    homeItem: 'p-breadcrumb-home-item',
    separator: 'p-breadcrumb-separator',
    item: ({ instance }) => ['p-breadcrumb-item', { 'p-disabled': instance.disabled() }],
    itemLink: 'p-breadcrumb-item-link',
    itemIcon: 'p-breadcrumb-item-icon',
    itemLabel: 'p-breadcrumb-item-label'
};

@Injectable()
export class BreadCrumbStyle extends BaseStyle {
    name = 'breadcrumb';

    theme = theme;

    classes = classes;
}

/**
 *
 * Breadcrumb provides contextual information about page hierarchy.
 *
 * [Live Demo](https://www.primeng.org/breadcrumb/)
 *
 * @module breadcrumbstyle
 *
 */
export enum BreadcrumbClasses {
    /**
     * Class name of the root element
     */
    root = 'p-breadcrumb',
    /**
     * Class name of the list element
     */
    list = 'p-breadcrumb-list',
    /**
     * Class name of the home item element
     */
    homeItem = 'p-breadcrumb-home-item',
    /**
     * Class name of the separator element
     */
    separator = 'p-breadcrumb-separator',
    /**
     * Class name of the item element
     */
    item = 'p-breadcrumb-item',
    /**
     * Class name of the item link element
     */
    itemLink = 'p-breadcrumb-item-link',
    /**
     * Class name of the item icon element
     */
    itemIcon = 'p-breadcrumb-item-icon',
    /**
     * Class name of the item label element
     */
    itemLabel = 'p-breadcrumb-item-label'
}

export interface BreadcrumbStyle extends BaseStyle {}
