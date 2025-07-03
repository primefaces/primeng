import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/textarea';
import { BaseStyle } from 'primeng/base';

const theme = /*css*/ `
    ${style}

    /* For PrimeNG */
    .p-textarea.ng-invalid.ng-dirty {
        border-color: dt('textarea.invalid.border.color');
    }
    .p-textarea.ng-invalid.ng-dirty::placeholder {
        color: dt('textarea.invalid.placeholder.color');
    }
`;

const classes = {
    root: ({ instance }) => [
        'p-textarea p-component',
        {
            'p-filled': instance.$filled(),
            'p-textarea-resizable ': instance.autoResize,
            'p-variant-filled': instance.$variant() === 'filled',
            'p-textarea-fluid': instance.hasFluid,
            'p-inputfield-sm p-textarea-sm': instance.pSize === 'small',
            'p-textarea-lg p-inputfield-lg': instance.pSize === 'large',
            'p-invalid': instance.invalid(),
            'p-disabled': instance.disabled()
        }
    ]
};

@Injectable()
export class TextareaStyle extends BaseStyle {
    name = 'textarea';

    theme = theme;

    classes = classes;
}

/**
 *
 * Textarea is a multi-line text input element.
 *
 * [Live Demo](https://www.primeng.org/textarea/)
 *
 * @module textareastyle
 *
 */
export enum TextareaClasses {
    /**
     * Class name of the root element
     */
    root = 'p-textarea'
}

export interface TextareaStyle extends BaseStyle {}
