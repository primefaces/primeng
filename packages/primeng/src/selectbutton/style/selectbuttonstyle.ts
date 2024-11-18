import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-selectbutton {
    display: inline-flex;
    user-select: none;
    vertical-align: bottom;
    outline-color: transparent;
    border-radius: ${dt('selectbutton.border.radius')};
}

.p-selectbutton .p-togglebutton {
    border-radius: 0;
    border-width: 1px 1px 1px 0;
}

.p-selectbutton .p-togglebutton:focus-visible {
    position: relative;
    z-index: 1;
}

.p-selectbutton p-togglebutton:first-child .p-togglebutton {
    border-left-width: 1px;
    border-top-left-radius: ${dt('selectbutton.border.radius')};
    border-bottom-left-radius: ${dt('selectbutton.border.radius')};
}

.p-selectbutton p-togglebutton:last-child .p-togglebutton{
    border-top-right-radius: ${dt('selectbutton.border.radius')};
    border-bottom-right-radius: ${dt('selectbutton.border.radius')};
}

.p-selectbutton.ng-invalid.ng-dirty {
    outline: 1px solid ${dt('selectbutton.invalid.border.color')};
    outline-offset: 0;
}
`;

const classes = {
    root: ({ props }) => [
        'p-selectbutton p-component',
        {
            'p-invalid': props.invalid
        }
    ]
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
