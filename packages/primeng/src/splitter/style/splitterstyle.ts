import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';
import { style } from '@primeuix/styles/splitter';

const classes = {
    root: ({ instance }) => ['p-splitter p-component', 'p-splitter-' + instance.layout],
    panel: ({ instance }) => ['p-splitterpanel', { 'p-splitterpanel-nested': instance.nestedState() }],
    gutter: 'p-splitter-gutter',
    gutterHandle: 'p-splitter-gutter-handle'
};

const inlineStyles = {
    root: ({ instance }) => [{ display: 'flex', 'flex-wrap': 'nowrap' }, instance.layout === 'vertical' ? { 'flex-direction': 'column' } : '']
};

@Injectable()
export class SplitterStyle extends BaseStyle {
    name = 'splitter';

    theme = style;

    classes = classes;

    inlineStyles = inlineStyles;
}

/**
 *
 * Splitter is utilized to separate and resize panels.
 *
 * [Live Demo](https://www.primeng.org/splitter/)
 *
 * @module splitterstyle
 *
 */
export enum SplitterClasses {
    /**
     * Class name of the root element
     */
    root = 'p-splitter',
    /**
     * Class name of the gutter element
     */
    gutter = 'p-splitter-gutter',
    /**
     * Class name of the gutter handle element
     */
    gutterHandle = 'p-splitter-gutter-handle'
}

export interface SplitterStyle extends BaseStyle {}
