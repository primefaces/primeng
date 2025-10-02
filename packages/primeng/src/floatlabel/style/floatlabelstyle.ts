import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/floatlabel';
import { BaseStyle } from 'primeng/base';

const theme = /*css*/ `
    ${style}

    /* For PrimeNG */
    .p-floatlabel:has(.ng-invalid.ng-dirty) label {
        color: dt('floatlabel.invalid.color');
    }
`;

const classes = {
    root: ({ instance }) => [
        'p-floatlabel',
        {
            'p-floatlabel-over': instance.variant === 'over',
            'p-floatlabel-on': instance.variant === 'on',
            'p-floatlabel-in': instance.variant === 'in'
        }
    ]
};

@Injectable()
export class FloatLabelStyle extends BaseStyle {
    name = 'floatlabel';

    theme = theme;

    classes = classes;
}

/**
 *
 * FloatLabel visually integrates a label with its form element.
 *
 * [Live Demo](https://www.primeng.org/floatlabel/)
 *
 * @module floatlabelstyle
 *
 */
export enum FloatLabelClasses {
    /**
     * Class name of the root element
     */
    root = 'p-floatlabel'
}

export interface FloatLabelStyle extends BaseStyle {}
