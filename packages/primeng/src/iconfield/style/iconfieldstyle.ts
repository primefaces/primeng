import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/iconfield';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: ({ instance }) => {
        const iconPosition = instance.iconPosition();
        return [
            'p-iconfield',
            {
                'p-iconfield-left': iconPosition === 'left',
                'p-iconfield-right': iconPosition === 'right'
            }
        ];
    }
};

@Injectable()
export class IconFieldStyle extends BaseStyle {
    name = 'iconfield';

    style = style;

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
