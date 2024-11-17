import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
    .p-fluid{
        width:100%
    }
`;

const classes = {
    root: 'p-fluid'
};

@Injectable()
export class FluidStyle extends BaseStyle {
    name = 'fluid';

    classes = classes;

    theme = theme;
}

/**
 *
 * Fluid is a layout component to make descendant components span full width of their container.
 *
 * [Live Demo](https://www.primeng.org/fluid/)
 *
 * @module fluidstyle
 *
 */
export enum FluidClasses {
    /**
     * Class name of the root element
     */
    root = 'p-fluid'
}

export interface FluidStyle extends BaseStyle {}
