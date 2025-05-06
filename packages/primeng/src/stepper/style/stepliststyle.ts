import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: 'p-steplist'
};

@Injectable()
export class StepListStyle extends BaseStyle {
    name = 'steplist';

    classes = classes;
}

/**
 *
 * Stepper is a component that streamlines a wizard-like workflow, organizing content into coherent steps and visually guiding users through a numbered progression in a multi-step process.
 *
 * [Live Demo](https://www.primeng.org/stepper/)
 *
 * @module stepliststyle
 *
 */
export enum StepListClasses {
    /**
     * Class name of the root element
     */
    root = 'p-stepitem'
}

export interface StepListStyle extends BaseStyle {}
