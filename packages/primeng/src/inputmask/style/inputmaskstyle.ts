import { Injectable } from '@angular/core';
import { css } from '@primeuix/styled';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => css`
    /* For PrimeNG */
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

    p-inputMask.ng-invalid.ng-dirty > .p-inputtext,
    p-input-mask.ng-invalid.ng-dirty > .p-inputtext,
    p-inputmask.ng-invalid.ng-dirty > .p-inputtext {
        border-color: ${dt('inputtext.invalid.border.color')};
    }

    p-inputMask.ng-invalid.ng-dirty > .p-inputtext:enabled:focus,
    p-input-mask.ng-invalid.ng-dirty > .p-inputtext:enabled:focus,
    p-inputmask.ng-invalid.ng-dirty > .p-inputtext:enabled:focus {
        border-color: ${dt('inputtext.focus.border.color')};
    }

    p-inputMask.ng-invalid.ng-dirty > .p-inputtext::placeholder,
    p-input-mask.ng-invalid.ng-dirty > .p-inputtext::placeholder,
    p-inputmask.ng-invalid.ng-dirty > .p-inputtext::placeholder {
        color: ${dt('inputtext.invalid.placeholder.color')};
    }
`;

const classes = {
    root: ({ instance }) => [
        'p-inputmask',
        {
            'p-filled': instance.variant ? instance.variant === 'filled' : instance.config.inputStyle() === 'filled'
        }
    ],
    clearIcon: 'p-inputmask-clear-icon'
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
    root = 'p-inputmask',
    /**
     * Class name of the clear icon element
     */
    clearIcon = 'p-inputmask-clear-icon'
}

export interface InputMaskStyle extends BaseStyle {}
