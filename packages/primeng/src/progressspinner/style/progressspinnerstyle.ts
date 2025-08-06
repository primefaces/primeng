import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/progressspinner';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: () => ['p-progressspinner'],
    spin: 'p-progressspinner-spin',
    circle: 'p-progressspinner-circle'
};

@Injectable()
export class ProgressSpinnerStyle extends BaseStyle {
    name = 'progressspinner';

    theme = style;

    classes = classes;
}

/**
 *
 * ProgressSpinner is a process status indicator.
 *
 * [Live Demo](https://www.primeng.org/progressspinner)
 *
 * @module progressspinnerstyle
 *
 */
export enum ProgressSpinnerClasses {
    /**
     * Class name of the root element
     */
    root = 'p-progressspinner',
    /**
     * Class name of the spin element
     */
    spin = 'p-progressspinner-spin',
    /**
     * Class name of the circle element
     */
    circle = 'p-progressspinner-circle'
}

export interface ProgressSpinnerStyle extends BaseStyle {}
