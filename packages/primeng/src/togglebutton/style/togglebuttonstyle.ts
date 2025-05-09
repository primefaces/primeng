import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/togglebutton';
import { css, dt } from '@primeuix/styled';
import { BaseStyle } from 'primeng/base';

const theme = css`
    ${style}

    /* For PrimeNG (iconPos) */
    .p-togglebutton-icon-right {
        order: 1;
    }

    .p-togglebutton.ng-invalid.ng-dirty {
        border-color: ${dt('togglebutton.invalid.border.color')};
    }
`;

const classes = {
    root: ({ instance }) => [
        'p-togglebutton p-component',
        instance.styleClass,
        {
            'p-togglebutton-checked': instance.checked,
            'p-disabled': instance.disabled,
            'p-togglebutton-sm p-inputfield-sm': instance.size === 'small',
            'p-togglebutton-lg p-inputfield-lg': instance.size === 'large'
        }
    ],
    content: 'p-togglebutton-content',
    icon: ({ instance }) => ['p-togglebutton-icon', instance.checked ? instance.onIcon : instance.offIcon, { 'p-togglebutton-icon-left': instance.iconPos === 'left', 'p-togglebutton-icon-right': instance.iconPos === 'right' }],
    label: 'p-togglebutton-label'
};

@Injectable()
export class ToggleButtonStyle extends BaseStyle {
    name = 'togglebutton';

    theme = theme;

    classes = classes;
}

/**
 *
 * ToggleButton is used to select a boolean value using a button.
 *
 * [Live Demo](https://www.primeng.org/togglebutton/)
 *
 * @module togglebuttonstyle
 *
 */
export enum ToggleButtonClasses {
    /**
     * Class name of the root element
     */
    root = 'p-togglebutton',
    /**
     * Class name of the icon element
     */
    icon = 'p-togglebutton-icon',
    /**
     * Class name of the label element
     */
    label = 'p-togglebutton-label'
}

export interface ToggleButtonStyle extends BaseStyle {}
