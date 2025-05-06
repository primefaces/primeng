import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: ({ instance }) => [
        'p-step',
        {
            'p-step-active': instance.active(),
            'p-disabled': instance.isStepDisabled()
        }
    ],
    header: 'p-step-header',
    number: 'p-step-number',
    title: 'p-step-title'
};

@Injectable()
export class StepStyle extends BaseStyle {
    name = 'step';

    classes = classes;
}

/**
 *
 * Stepper is a component that streamlines a wizard-like workflow, organizing content into coherent steps and visually guiding users through a numbered progression in a multi-step process.
 *
 * [Live Demo](https://www.primeng.org/stepper/)
 *
 * @module stepstyle
 *
 */
export enum StepClasses {
    /**
     * Class name of the root element
     */
    root = 'p-step',
    /**
     * Class name of the header element
     */
    header = 'p-step-header',
    /**
     * Class name of the number element
     */
    number = 'p-step-number',
    /**
     * Class name of the title element
     */
    title = 'p-step-title'
}

export interface StepStyle extends BaseStyle {}
