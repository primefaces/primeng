import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/inputtext';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: ({ instance }) => [
        'p-inputtext p-component',
        {
            'p-filled': instance.filled,
            'p-inputtext-sm': instance.pSize === 'small',
            'p-inputtext-lg': instance.pSize === 'large',
            'p-invalid': instance.isInvalid,
            'p-variant-filled': (instance.variant ?? (instance.config.inputStyle() || instance.config.inputVariant())) === 'filled',
            'p-inputtext-fluid': instance.hasFluid
        }
    ]
};

@Injectable()
export class InputTextStyle extends BaseStyle {
    name = 'inputtext';

    theme = style;

    classes = classes;
}

/**
 *
 * InputText renders a text field to enter data.
 *
 * [Live Demo](https://www.primeng.org/inputtext/)
 *
 * @module inputtextstyle
 *
 */
export enum InputTextClasses {
    /**
     * The class of root element
     */
    root = 'p-inputtext'
}

export interface InputTextStyle extends BaseStyle {}
