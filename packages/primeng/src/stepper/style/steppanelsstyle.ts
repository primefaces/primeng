import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: 'p-steppanels'
};

@Injectable()
export class StepPanelsStyle extends BaseStyle {
    name = 'steppanel';

    classes = classes;
}

/**
 *
 * StepPanel is a helper component for Stepper component.
 *
 * [Live Demo](https://www.primeng.org/stepper/)
 *
 * @module steppanelsstyle
 *
 */
export enum StepPanelsClasses {
    /**
     * Class name of the root element
     */
    root = 'p-steppanels'
}

export interface StepPanelsStyle extends BaseStyle {}
