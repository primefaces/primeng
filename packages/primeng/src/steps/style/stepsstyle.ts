import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/steps';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: ({ instance }) => ['p-steps p-component', { 'p-readonly': instance.readonly }],
    list: 'p-steps-list',
    item: ({ instance, item, index }) => [
        'p-steps-item',
        {
            'p-steps-item-active': instance.isActive(item, index),
            'p-disabled': instance.isItemDisabled(item, index)
        }
    ],
    itemLink: 'p-steps-item-link',
    itemNumber: 'p-steps-item-number',
    itemLabel: 'p-steps-item-label'
};
@Injectable()
export class StepsStyle extends BaseStyle {
    name = 'steps';

    theme = style;

    classes = classes;
}

/**
 *
 * Steps components is an indicator for the steps in a wizard workflow. Example below uses nested routes with Steps.
 *
 * [Live Demo](https://www.primeng.org/steps/)
 *
 * @module stepsstyle
 *
 */
export enum StepsClasses {
    /**
     * Class name of the root element
     */
    root = 'p-steps',
    /**
     * Class name of the list element
     */
    list = 'p-steps-list',
    /**
     * Class name of the item element
     */
    item = 'p-steps-item',
    /**
     * Class name of the item link element
     */
    itemLink = 'p-steps-item-link',
    /**
     * Class name of the item number element
     */
    itemNumber = 'p-steps-item-number',
    /**
     * Class name of the item label element
     */
    itemLabel = 'p-steps-item-label'
}

export interface StepsStyle extends BaseStyle {}
