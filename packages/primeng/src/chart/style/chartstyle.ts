import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const inlineStyles = {
    root: { position: 'relative' }
};

const classes = {
    root: 'p-chart'
};

@Injectable()
export class ChartStyle extends BaseStyle {
    name = 'chart';

    classes = classes;

    inlineStyles = inlineStyles;
}

/**
 *
 * Chart groups a collection of contents in tabs.
 *
 * [Live Demo](https://www.primeng.org/chart/)
 *
 * @module chartstyle
 *
 */
export enum ChartClasses {
    /**
     * Class name of the root element
     */
    root = 'p-chart'
}

export interface ChartStyle extends BaseStyle {}
