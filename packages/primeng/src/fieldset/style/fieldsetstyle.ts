import { Injectable } from '@angular/core';
import { style as fieldset_style } from '@primeuix/styles/fieldset';
import { BaseStyle } from 'primeng/base';

const style = /*css*/ `
${fieldset_style}

/* Animations */
.p-fieldset-content-enter-from,
.p-fieldset-content-leave-to {
    max-height: 0;
}

.p-fieldset-content-enter-to,
.p-fieldset-content-leave-from {
    max-height: var(--pui-motion-height, 1000px);
}

.p-fieldset-content-leave-active {
    overflow: hidden;
    transition: max-height 400ms cubic-bezier(0.86, 0, 0.07, 1);
}

.p-fieldset-content-enter-active {
    overflow: hidden;
    transition: max-height 400ms cubic-bezier(0.86, 0, 0.07, 1);
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
    contentContainer: ({ instance }) => ['p-fieldset-content-container'],
    content: 'p-fieldset-content'
};

@Injectable()
export class FieldsetStyle extends BaseStyle {
    name = 'fieldset';

    style = style;

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
