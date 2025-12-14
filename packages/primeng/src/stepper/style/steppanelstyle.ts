import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: ({ instance }) => [
        'p-steppanel',
        {
            'p-steppanel-active': instance.isVertical() && instance.active()
        }
    ],
    contentWrapper: 'p-steppanel-content-wrapper',
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
    root = 'p-steppanel',

    /**
     * Class name of the content wrapper element
     */
    contentWrapper = 'p-steppanel-content-wrapper',

    /**
     * Class name of the content element
     */
    content = 'p-steppanel-content'
}

export interface StepPanelStyle extends BaseStyle {}
