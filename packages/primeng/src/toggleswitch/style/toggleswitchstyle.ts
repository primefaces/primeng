import { Injectable } from '@angular/core';
import { style as toggleswitch_style } from '@primeuix/styles/toggleswitch';
import { BaseStyle } from 'primeng/base';

const style = /*css*/ `
    ${toggleswitch_style}

    p-toggleswitch.ng-invalid.ng-dirty > .p-toggleswitch-slider {
        border-color: dt('toggleswitch.invalid.border.color');
    }

    .p-toggleswitch-sm {
        width: 2rem;
        height: 1.25rem;
    }

    .p-toggleswitch-sm .p-toggleswitch-handle {
        width: 0.875rem;
        height: 0.875rem;
        margin-block-start: calc(-1 * calc(0.875rem / 2));
    }

    .p-toggleswitch-sm.p-toggleswitch-checked .p-toggleswitch-handle {
        inset-inline-start: calc(2rem - calc(0.875rem + dt('toggleswitch.gap')));
    }

    .p-toggleswitch-lg {
        width: 3rem;
        height: 1.75rem;
    }

    .p-toggleswitch-lg .p-toggleswitch-handle {
        width: 1.25rem;
        height: 1.25rem;
        margin-block-start: calc(-1 * calc(1.25rem / 2));
    }

    .p-toggleswitch-lg.p-toggleswitch-checked .p-toggleswitch-handle {
        inset-inline-start: calc(3rem - calc(1.25rem + dt('toggleswitch.gap')));
    }
`;

const inlineStyles = {
    root: { position: 'relative' }
};

const classes = {
    root: ({ instance }) => [
        'p-toggleswitch p-component',
        {
            'p-toggleswitch p-component': true,
            'p-toggleswitch-checked': instance.checked(),
            'p-toggleswitch-sm': instance.size() === 'small',
            'p-toggleswitch-lg': instance.size() === 'large',
            'p-disabled': instance.$disabled(),
            'p-invalid': instance.invalid()
        }
    ],

    input: 'p-toggleswitch-input',
    slider: 'p-toggleswitch-slider',
    handle: 'p-toggleswitch-handle'
};

@Injectable()
export class ToggleSwitchStyle extends BaseStyle {
    name = 'toggleswitch';

    style = style;

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
