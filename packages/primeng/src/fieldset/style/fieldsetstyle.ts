import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/fieldset';
import { BaseStyle } from 'primeng/base';

const theme = /*css*/ `
    ${style}

    /* For PrimeNG */
    .p-fieldset-collapsed > .p-fieldset-content-container,
    .p-fieldset-content-container.ng-animating {
        overflow: hidden;
    }
`;

const classes = {
    root: ({ instance }) => [
        'p-fieldset p-component',
        {
            'p-fieldset-toggleable': instance.toggleable,
            'p-fieldset-collapsed': instance.collapsed && instance.toggleable
        }
    ],
    legend: 'p-fieldset-legend',
    legendLabel: 'p-fieldset-legend-label',
    toggleButton: 'p-fieldset-toggle-button',
    toggleIcon: 'p-fieldset-toggle-icon',
    contentContainer: 'p-fieldset-content-container',
    content: 'p-fieldset-content'
};

@Injectable()
export class FieldsetStyle extends BaseStyle {
    name = 'fieldset';

    theme = theme;

    classes = classes;
}

/**
 *
 * Fieldset is a grouping component with the optional content toggle feature.
 *
 * [Live Demo](https://www.primeng.org/fieldset/)
 *
 * @module fieldsetstyle
 *
 */
export enum FieldsetClasses {
    /**
     * Class name of the root element
     */
    root = 'p-fieldset',
    /**
     * Class name of the legend element
     */
    legend = 'p-fieldset-legend',
    /**
     * Class name of the legend label element
     */
    legendLabel = 'p-fieldset-legend-label',
    /**
     * Class name of the toggle icon element
     */
    toggleIcon = 'p-fieldset-toggle-icon',
    /**
     * Class name of the content container element
     */
    contentContainer = 'p-fieldset-content-container',
    /**
     * Class name of the content element
     */
    content = 'p-fieldset-content'
}

export interface FieldsetStyle extends BaseStyle {}
