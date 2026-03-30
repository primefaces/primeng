import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/orderlist';
import { BaseStyle } from 'primeng/base';

const theme = /*css*/ `
    ${style}

    /* For PrimeNG */
    .p-orderlist-controls-right .p-orderlist-controls {
        order: 2;
    }
`;

const classes = {
    root: ({ instance }) => ['p-orderlist p-component', { 'p-orderlist-controls-left': instance.controlsPosition() === 'left', 'p-orderlist-controls-right': instance.controlsPosition() === 'right' }],
    controls: 'p-orderlist-controls'
};

@Injectable()
export class OrderListStyle extends BaseStyle {
    name = 'orderlist';

    style = theme;

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
