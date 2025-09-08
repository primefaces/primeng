import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/breadcrumb';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: () => ['p-breadcrumb p-component'],
    list: 'p-breadcrumb-list',
    homeItem: 'p-breadcrumb-home-item',
    separator: 'p-breadcrumb-separator',
    item: ({ menuitem }) => ['p-breadcrumb-item', { 'p-disabled': menuitem.disabled }],
    itemLink: 'p-breadcrumb-item-link',
    itemIcon: 'p-breadcrumb-item-icon',
    itemLabel: 'p-breadcrumb-item-label'
};

@Injectable()
export class BreadCrumbStyle extends BaseStyle {
    name = 'breadcrumb';

    theme = style;

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
