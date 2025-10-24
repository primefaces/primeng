import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/inputotp';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: 'p-inputotp p-component',
    pcInputText: 'p-inputotp-input'
};

@Injectable()
export class InputOtpStyle extends BaseStyle {
    name = 'inputotp';

    style = style;

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
    pcInputText = 'p-inputotp-input'
}

export interface InputOtpStyle extends BaseStyle {}
