import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/buttongroup';
import { BaseStyle } from 'primeng/base';

const theme = /*css*/ `
    ${style}

    /* For PrimeNG */
    .p-buttongroup p-button:focus .p-button {
        position: relative;
        z-index: 1;
    }

    .p-buttongroup p-button:not(:last-child) .p-button,
    .p-buttongroup p-button:not(:last-child) .p-button:hover {
        border-right: 0 none;
    }

    .p-buttongroup p-button:not(:first-of-type):not(:last-of-type) .p-button {
        border-radius: 0;
    }

    .p-buttongroup p-button:first-of-type:not(:only-of-type) .p-button {
        border-start-end-radius: 0;
        border-end-end-radius: 0;
    }

    .p-buttongroup p-button:last-of-type:not(:only-of-type) .p-button {
        border-start-start-radius: 0;
        border-end-start-radius: 0;
    }
`;

const classes = {
    root: 'p-buttongroup p-component'
};

@Injectable()
export class ButtonGroupStyle extends BaseStyle {
    name = 'buttongroup';

    theme = theme;

    classes = classes;
}

/**
 *
 * A set of Buttons can be displayed together using the ButtonGroup component.
 *
 * [Live Demo](https://www.primeng.org/button/)
 *
 * @module buttongroupstyle
 *
 */
export enum ButtonGroupClasses {
    /**
     * Class name of the root element
     */
    root = 'p-buttongroup'
}

export interface ButtonGroupStyle extends BaseStyle {}
