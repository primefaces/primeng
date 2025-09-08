import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/orderlist';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: () => ['p-orderlist p-component'],
    controls: 'p-orderlist-controls'
};

@Injectable()
export class OrderListStyle extends BaseStyle {
    name = 'orderlist';

    theme = style;

    classes = classes;
}

/**
 *
 * OrderList is used to maneged the order of a collection.
 *
 * [Live Demo](https://primeng.org/orderlist)
 *
 * @module orderliststyle
 *
 */

export enum OrderListClasses {
    /**
     * Class name of the root element
     */
    root = 'p-orderlist',
    /**
     * Class name of the controls element
     */
    controls = 'p-orderlist-controls'
}

export interface OrderListStyle extends BaseStyle {}
