import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/stepper';
import { BaseStyle } from 'primeng/base';

const theme = /*css*/ `
    ${style}

    /* For PrimeNG */
    .p-steppanel:not(.p-steppanel-active) > .p-steppanel-content,
    .p-steppanel-content.ng-animating {
        overflow: hidden;
    }
`;

const classes = {
    root: ({ instance }) => [
        'p-stepper p-component',
        {
            'p-readonly': instance.linear()
        }
    ],
    separator: 'p-stepper-separator'
};

@Injectable()
export class StepperStyle extends BaseStyle {
    name = 'stepper';

    theme = theme;

    classes = classes;
}

/**
 *
 * Stepper is a component that streamlines a wizard-like workflow, organizing content into coherent steps and visually guiding users through a numbered progression in a multi-step process.
 *
 * [Live Demo](https://www.primeng.org/stepper/)
 *
 * @module stepperstyle
 *
 */
export enum StepperClasses {
    /**
     * Class name of the root element
     */
    root = 'p-stepper',
    /**
     * Class name of the separator element
     */
    separator = 'p-stepper-separator'
}

export interface StepperStyle extends BaseStyle {}
