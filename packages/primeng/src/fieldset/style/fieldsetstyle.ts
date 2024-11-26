import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-fieldset {
    background: ${dt('fieldset.background')};
    border: 1px solid ${dt('fieldset.border.color')};
    border-radius: ${dt('fieldset.border.radius')};
    color: ${dt('fieldset.color')};
    padding:  ${dt('fieldset.padding')};
    margin: 0;
}

.p-fieldset-legend {
    background: ${dt('fieldset.legend.background')};
    border-radius: ${dt('fieldset.legend.border.radius')};
    border-width: ${dt('fieldset.legend.border.width')};
    border-style: solid;
    border-color: ${dt('fieldset.legend.border.color')};
    padding: ${dt('fieldset.legend.padding')};
    transition: background ${dt('fieldset.transition.duration')}, color ${dt('fieldset.transition.duration')}, outline-color ${dt('fieldset.transition.duration')}, box-shadow ${dt('fieldset.transition.duration')};
}

.p-fieldset-toggleable > .p-fieldset-legend {
    padding: 0;
}

.p-fieldset-toggle-button {
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    position: relative;
    text-decoration: none;
    display: flex;
    gap: ${dt('fieldset.legend.gap')};
    align-items: center;
    justify-content: center;
    padding: ${dt('fieldset.legend.padding')};
    background: transparent;
    border: 0 none;
    border-radius: ${dt('fieldset.legend.border.radius')};
    transition: background ${dt('fieldset.transition.duration')}, color ${dt('fieldset.transition.duration')}, outline-color ${dt('fieldset.transition.duration')}, box-shadow ${dt('fieldset.transition.duration')};
    outline-color: transparent;
}

.p-fieldset-legend-label {
    font-weight: ${dt('fieldset.legend.font.weight')};
}

.p-fieldset-toggle-button:focus-visible {
    box-shadow: ${dt('fieldset.legend.focus.ring.shadow')};
    outline: ${dt('fieldset.legend.focus.ring.width')} ${dt('fieldset.legend.focus.ring.style')} ${dt('fieldset.legend.focus.ring.color')};
    outline-offset: ${dt('fieldset.legend.focus.ring.offset')};
}

.p-fieldset-toggleable > .p-fieldset-legend:hover {
    color: ${dt('fieldset.legend.hover.color')};
    background: ${dt('fieldset.legend.hover.background')};
}

.p-fieldset-toggle-icon {
    color: ${dt('fieldset.toggle.icon.color')};
    transition: color ${dt('fieldset.transition.duration')};
}

.p-fieldset-toggleable > .p-fieldset-legend:hover .p-fieldset-toggle-icon {
    color: ${dt('fieldset.toggle.icon.hover.color')};
}

.p-fieldset .p-fieldset-content {
    padding: ${dt('fieldset.content.padding')};
}

/* For PrimeNG */
.p-fieldset-toggleable.p-fieldset-expanded > .p-fieldset-content-container:not(.ng-animating) {
    overflow: visible
}

.p-fieldset-toggleable .p-fieldset-content-container {
    overflow: hidden;
}
`;

const classes = {
    root: ({ props }) => [
        'p-fieldset p-component',
        {
            'p-fieldset-toggleable': props.toggleable
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
