import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-inputotp {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.p-inputotp-input {
    text-align: center;
    width: 2.5rem;
}

.p-inputotp-input.p-inputtext-sm {
    text-align: center;
    width: ${dt('inputotp.input.sm.width')};
}

.p-inputotp-input.p-inputtext-lg {
    text-align: center;
    width: ${dt('inputotp.input.lg.width')};
}
`;

const classes = {
    root: 'p-inputotp p-component',
    pcInput: 'p-inputotp-input'
};

@Injectable()
export class InputOtpStyle extends BaseStyle {
    name = 'inputotp';

    theme = theme;

    classes = classes;
}

/**
 *
 * InputOtp is used to enter one time passwords.
 *
 * [Live Demo](https://www.primeng.org/inputotp/)
 *
 * @module inputotpstyle
 *
 */

export enum InputOtpClasses {
    /**
     * Class name of the root element
     */
    root = 'p-inputotp',
    /**
     * Class name of the input element
     */
    pcInput = 'p-inputotp-input'
}

export interface InputOtpStyle extends BaseStyle {}
