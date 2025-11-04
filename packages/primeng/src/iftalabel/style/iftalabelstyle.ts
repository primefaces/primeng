import { Injectable } from '@angular/core';
import { style as iftalabel_style } from '@primeuix/styles/iftalabel';
import { BaseStyle } from 'primeng/base';

const style = /*css*/ `
    ${iftalabel_style}

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

    style = style;

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
