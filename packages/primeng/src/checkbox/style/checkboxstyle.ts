import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/checkbox';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: ({ instance }) => [
        'p-checkbox p-component',
        instance.styleClass,
        {
            'p-checkbox-checked p-highlight': instance.checked,
            'p-disabled': instance.disabled,
            'p-variant-filled': instance.variant === 'filled' || instance.config.inputStyle() === 'filled' || instance.config.inputVariant() === 'filled',
            'p-checkbox-sm p-inputfield-sm': instance.size === 'small',
            'p-checkbox-lg p-inputfield-lg': instance.size === 'large'
        }
    ],
    box: 'p-checkbox-box',
    input: 'p-checkbox-input',
    icon: 'p-checkbox-icon'
};

@Injectable()
export class CheckboxStyle extends BaseStyle {
    name = 'checkbox';

    theme = style;

    classes = classes;
}

/**
 *
 * Checkbox is an extension to standard checkbox element with theming.
 *
 * [Live Demo](https://www.primeng.org/checkbox/)
 *
 * @module checkboxstyle
 *
 */
export enum CheckboxClasses {
    /**
     * Class name of the root element
     */
    root = 'p-checkbox',
    /**
     * Class name of the box element
     */
    box = 'p-checkbox-box',
    /**
     * Class name of the input element
     */
    input = 'p-checkbox-input',
    /**
     * Class name of the icon element
     */
    icon = 'p-checkbox-icon'
}

export interface CheckboxStyle extends BaseStyle {}
