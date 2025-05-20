import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/progressbar';
import { css } from '@primeuix/styled';
import { BaseStyle } from 'primeng/base';

const theme = css`
    ${style}

    /* For PrimeNG */
    .p-progressbar {
        display: block;
    }
`;

const classes = {
    root: ({ instance }) => [
        'p-progressbar p-component',
        instance.styleClass,
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

    theme = theme;

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
