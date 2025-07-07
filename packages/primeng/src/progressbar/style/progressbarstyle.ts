import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/progressbar';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: ({ instance }) => [
        'p-progressbar p-component',
        {
            'p-progressbar-determinate': instance.mode == 'determinate',
            'p-progressbar-indeterminate': instance.mode == 'indeterminate'
        }
    ],
    value: 'p-progressbar-value',
    label: 'p-progressbar-label'
};

@Injectable()
export class ProgressBarStyle extends BaseStyle {
    name = 'progressbar';

    theme = style;

    classes = classes;
}

/**
 *
 * ProgressBar is a process status indicator.
 *
 * [Live Demo](https://www.primeng.org/progressbar)
 *
 * @module progressbarstyle
 *
 */
export enum ProgressBarClasses {
    /**
     * Class name of the root element
     */
    root = 'p-progressbar',
    /**
     * Class name of the value element
     */
    value = 'p-progressbar-value',
    /**
     * Class name of the label element
     */
    label = 'p-progressbar-label'
}

export interface ProgressBarStyle extends BaseStyle {}
