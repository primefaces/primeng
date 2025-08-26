import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/iconfield';
import { BaseStyle } from 'primeng/base';

const theme = /*css*/ `
    ${style}

    /* For PrimeNG */
    .p-iconfield p-inputmask:not(:first-child) .p-inputtext {
        padding-inline-start: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-iconfield p-inputmask:not(:last-child) .p-inputtext {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }
  
`;

const classes = {
    root: ({ instance }) => [
        'p-iconfield',
        {
            'p-iconfield-left': instance.iconPosition == 'left',
            'p-iconfield-right': instance.iconPosition == 'right'
        }
    ]
};

@Injectable()
export class IconFieldStyle extends BaseStyle {
    name = 'iconfield';

    theme = theme;

    classes = classes;
}

/**
 *
 * IconField wraps an input and an icon.
 *
 * [Live Demo](https://www.primeng.org/iconfield/)
 *
 * @module iconfieldstyle
 *
 */
export enum IconFieldClasses {
    /**
     * Class name of the root element
     */
    root = 'p-iconfield'
}

export interface IconFieldStyle extends BaseStyle {}
