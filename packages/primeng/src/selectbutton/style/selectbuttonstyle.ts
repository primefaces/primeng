import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/selectbutton';
import { css, dt } from '@primeuix/styled';
import { BaseStyle } from 'primeng/base';

const theme = css`
    ${style}

    /* For PrimeNG */
    .p-selectbutton.ng-invalid.ng-dirty {
        outline: 1px solid ${dt('selectbutton.invalid.border.color')};
        outline-offset: 0;
    }
`;

const classes = {
    root: () => ['p-selectbutton p-component']
};

@Injectable()
export class SelectButtonStyle extends BaseStyle {
    name = 'selectbutton';

    theme = theme;

    classes = classes;
}

/**
 *
 * SelectButton is used to choose single or multiple items from a list using buttons.
 *
 * [Live Demo](https://www.primeng.org/selectbutton/)
 *
 * @module selectbuttonstyle
 *
 */
export enum SelectButtonClasses {
    /**
     * Class name of the root element
     */
    root = 'p-selectbutton'
}

export interface SelectButtonStyle extends BaseStyle {}
