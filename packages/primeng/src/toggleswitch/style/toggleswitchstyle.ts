import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/toggleswitch';
import { css, dt } from '@primeuix/styled';
import { BaseStyle } from 'primeng/base';

const theme = css`
    ${style}

    /* For PrimeNG */
    .p-toggleswitch-slider {
        display: inline-block;
    }

    p-toggleSwitch.ng-invalid.ng-dirty > .p-toggleswitch > .p-toggleswitch-slider,
    p-toggle-switch.ng-invalid.ng-dirty > .p-toggleswitch > .p-toggleswitch-slider,
    p-toggleswitch.ng-invalid.ng-dirty > .p-toggleswitch > .p-toggleswitch-slider {
        border-color: ${dt('toggleswitch.invalid.border.color')};
    }
`;

const inlineStyles = {
    root: { position: 'relative' }
};

const classes = {
    root: ({ instance }) => [
        'p-toggleswitch p-component',
        instance.styleClass,
        {
            'p-toggleswitch p-component': true,
            'p-toggleswitch-checked': instance.checked(),
            'p-disabled': instance.disabled,
            'p-invalid': instance.invalid
        }
    ],

    input: 'p-toggleswitch-input',
    slider: 'p-toggleswitch-slider',
    handle: 'p-toggleswitch-handle'
};

@Injectable()
export class ToggleSwitchStyle extends BaseStyle {
    name = 'toggleswitch';

    theme = theme;

    classes = classes;

    inlineStyles = inlineStyles;
}

/**
 *
 * ToggleSwitch is used to select a boolean value.
 *
 * [Live Demo](https://www.primeng.org/toggleswitch/)
 *
 * @module toggleswitchstyle
 *
 */
export enum ToggleSwitchClasses {
    /**
     * Class name of the root element
     */
    root = 'p-toggleswitch',
    /**
     * Class name of the input element
     */
    input = 'p-toggleswitch-input',
    /**
     * Class name of the slider element
     */
    slider = 'p-toggleswitch-slider'
}

export interface ToggleSwitchStyle extends BaseStyle {}
