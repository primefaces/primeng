import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
p-inputmask {
    position: relative;
}

.p-inputmask-clear-icon {
    position: absolute;
    top: 50%;
    margin-top: -0.5rem;
    cursor: pointer;
    inset-inline-end: ${dt('form.field.padding.x')};
    color: ${dt('form.field.icon.color')};
}

p-inputmask.ng-invalid.ng-dirty > .p-inputtext {
    border-color: ${dt('inputtext.invalid.border.color')};
}

p-inputmask.ng-invalid.ng-dirty > .p-inputtext:enabled:focus {
    border-color: ${dt('inputtext.focus.border.color')};
}

p-inputmask.ng-invalid.ng-dirty > .p-inputtext::placeholder {
    color: ${dt('inputtext.invalid.placeholder.color')};
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
