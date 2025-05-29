import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: ({ instance }) => [
        'p-steppanel',
        {
            'p-steppanel-active': instance.isVertical() && instance.active()
        }
    ],
    content: 'p-steppanel-content'
};

@Injectable()
export class StepPanelStyle extends BaseStyle {
    name = 'steppanel';

    classes = classes;
}

/**
 *
 * StepPanel is a helper component for Stepper component.
 *
 * [Live Demo](https://www.primeng.org/stepper/)
 *
 * @module steppanelstyle
 *
 */
export enum StepPanelClasses {
    /**
     * Class name of the root element
     */
    root = 'p-steppanel'
}

export interface StepPanelStyle extends BaseStyle {}
