import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/iftalabel';
import { BaseStyle } from 'primeng/base';

const theme = /*css*/ `
    ${style}

    /* For PrimeNG */
    .p-iftalabel:has(.ng-invalid.ng-dirty) label {
        color: dt('iftalabel.invalid.color');
    }
`;

const classes = {
    root: 'p-iftalabel'
};

@Injectable()
export class IftaLabelStyle extends BaseStyle {
    name = 'iftalabel';

    theme = theme;

    classes = classes;
}

/**
 *
 * IftaLabel visually integrates a label within its form element.
 *
 * [Live Demo](https://www.primeng.org/iftalabel/)
 *
 * @module iftalabelstyle
 *
 */
export enum IftaLabelClasses {
    /**
     * Class name of the root element
     */
    root = 'p-iftalabel'
}

export interface IftaLabelStyle extends BaseStyle {}
