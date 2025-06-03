import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';
import { css, dt } from '@primeuix/styled';
import { style } from '@primeuix/styles/inputgroup';

const theme = css`
    ${style}

    /*For PrimeNG*/

    .p-inputgroup > .p-component,
    .p-inputgroup > .p-inputwrapper > .p-component,
    .p-inputgroup:first-child > p-button > .p-button,
    .p-inputgroup > .p-floatlabel > .p-component,
    .p-inputgroup > .p-floatlabel > .p-inputwrapper > .p-component,
    .p-inputgroup > .p-iftalabel > .p-component,
    .p-inputgroup > .p-iftalabel > .p-inputwrapper > .p-component {
        border-radius: 0;
        margin: 0;
    }

    .p-inputgroup p-button:first-child,
    .p-inputgroup p-button:last-child {
        display: inline-flex;
    }

    .p-inputgroup:has(> p-button:first-child) .p-button {
        border-start-start-radius: ${dt('inputgroup.addon.border.radius')};
        border-end-start-radius: ${dt('inputgroup.addon.border.radius')};
    }

    .p-inputgroup:has(> p-button:last-child) .p-button {
        border-start-end-radius: ${dt('inputgroup.addon.border.radius')};
        border-end-end-radius: ${dt('inputgroup.addon.border.radius')};
    }
`;

const classes = {
    root: ({ instance }) => [
        'p-inputgroup',
        instance.styleClass,
        {
            'p-inputgroup-fluid': instance.fluid
        }
    ]
};

@Injectable()
export class InputGroupStyle extends BaseStyle {
    name = 'inputgroup';

    theme = theme;

    classes = classes;
}

/**
 *
 * InputGroup displays text, icon, buttons and other content can be grouped next to an input.
 *
 * [Live Demo](https://www.primeng.org/inputgroup/)
 *
 * @module inputgroupstyle
 *
 */

export enum InputGroupClasses {
    /**
     * Class name of the root element
     */
    root = 'p-inputgroup'
}

export interface InputGroupStyle extends BaseStyle {}
