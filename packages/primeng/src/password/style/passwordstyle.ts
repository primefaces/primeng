import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/password';
import { BaseStyle } from 'primeng/base';

const theme = /*css*/ `
    ${style}

    /* For PrimeNG */
    p-password.ng-invalid.ng-dirty .p-inputtext {
        border-color: dt('inputtext.invalid.border.color');
    }

    p-password.ng-invalid.ng-dirty .p-inputtext:enabled:focus {
        border-color: dt('inputtext.focus.border.color');
    }

    p-password.ng-invalid.ng-dirty .p-inputtext::placeholder {
        color: dt('inputtext.invalid.placeholder.color');
    }

    .p-password-fluid-directive {
        width: 100%;
    }
`;

const inlineStyles = {
    root: ({ instance }) => ({ position: instance.$appendTo() === 'self' ? 'relative' : undefined }),
    overlay: { position: 'absolute' }
};

const classes = {
    root: ({ instance }) => [
        'p-password p-component p-inputwrapper',
        {
            'p-inputwrapper-filled': instance.$filled(),
            'p-variant-filled': instance.$variant() === 'filled',
            'p-inputwrapper-focus': instance.focused,
            'p-password-fluid': instance.hasFluid
        }
    ],
    rootDirective: ({ instance }) => [
        'p-password p-inputtext p-component p-inputwrapper',
        {
            'p-inputwrapper-filled': instance.$filled(),
            'p-variant-filled': instance.$variant() === 'filled',
            'p-password-fluid-directive': instance.hasFluid
        }
    ],
    pcInputText: 'p-password-input',
    maskIcon: 'p-password-toggle-mask-icon p-password-mask-icon',
    unmaskIcon: 'p-password-toggle-mask-icon p-password-unmask-icon',
    overlay: 'p-password-overlay p-component',
    content: 'p-password-content',
    meter: 'p-password-meter',
    meterLabel: ({ instance }) => `p-password-meter-label ${instance.meter ? 'p-password-meter-' + instance.meter.strength : ''}`,
    meterText: 'p-password-meter-text',
    clearIcon: 'p-password-clear-icon'
};

@Injectable()
export class PasswordStyle extends BaseStyle {
    name = 'password';

    theme = theme;

    classes = classes;

    inlineStyles = inlineStyles;
}

/**
 *
 * Password displays strength indicator for password fields.
 *
 * [Live Demo](https://www.primeng.org/password/)
 *
 * @module passwordstyle
 *
 */

export enum PasswordClasses {
    /**
     * Class name of the root element
     */
    root = 'p-password',
    /**
     * Class name of the pt input element
     */
    pcInputText = 'p-password-input',
    /**
     * Class name of the mask icon element
     */
    maskIcon = 'p-password-mask-icon',
    /**
     * Class name of the unmask icon element
     */
    unmaskIcon = 'p-password-unmask-icon',
    /**
     * Class name of the overlay element
     */
    overlay = 'p-password-overlay',
    /**
     * Class name of the meter element
     */
    meter = 'p-password-meter',
    /**
     * Class name of the meter label element
     */
    meterLabel = 'p-password-meter-label',
    /**
     * Class name of the meter text element
     */
    meterText = 'p-password-meter-text',
    /**
     * Class name of the clear icon
     */
    clearIcon = 'p-password-clear-icon'
}

export interface PasswordStyle extends BaseStyle {}
