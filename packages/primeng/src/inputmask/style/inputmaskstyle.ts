import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
/* For PrimeNG */
p-inputmask.ng-invalid.ng-dirty > .p-inputtext {
    border-color: ${dt('inputtext.invalid.border.color')};
}

p-inputmask {
    position: relative;
}

.p-icon-wrapper {
    position: absolute;
    top: 50%;
    margin-top: -0.5rem;
    cursor: pointer;
    right: ${dt('form.field.padding.x')};
    color: ${dt('form.field.icon.color')};
}
`;

const classes = {
    root: ({ instance }) => ({
        'p-inputmask': true,
        'p-filled': instance.variant ? instance.variant === 'filled' : instance.config.inputStyle() === 'filled'
    })
};

@Injectable()
export class InputMaskStyle extends BaseStyle {
    name = 'inputmask';

    theme = theme;

    classes = classes;
}

/**
 *
 * InputMask component is used to enter input in a certain format such as numeric, date, currency, email and phone.
 *
 * [Live Demo](https://www.primeng.org/inputmask/)
 *
 * @module inputmaskstyle
 *
 */

export enum InputMaskClasses {
    /**
     * Class name of the root element
     */
    root = 'p-inputmask'
}

export interface InputMaskStyle extends BaseStyle {}
