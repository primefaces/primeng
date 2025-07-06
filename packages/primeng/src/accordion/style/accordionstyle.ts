import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/accordion';
import { BaseStyle } from 'primeng/base';

const theme = /*css*/ `
    ${style}

    /*For PrimeNG*/
    .p-accordionpanel:not(.p-accordionpanel-active) > .p-accordioncontent,
    .p-accordioncontent-content.ng-animating {
        overflow: hidden;
    }

    .p-accordionheader-toggle-icon.icon-start {
        order: -1;
    }

    .p-accordionheader:has(.p-accordionheader-toggle-icon.icon-start) {
        justify-content: flex-start;
        gap: dt('accordion.header.padding');
    }
`;

const classes = {
    root: 'p-accordion p-component',
    panel: ({ instance }) => [
        'p-accordionpanel',
        {
            'p-accordionpanel-active': instance.active(),
            'p-disabled': instance.disabled()
        }
    ],
    header: 'p-accordionheader',
    toggleicon: 'p-accordionheader-toggle-icon',
    contentContainer: 'p-accordioncontent',
    content: 'p-accordioncontent-content'
};

@Injectable()
export class AccordionStyle extends BaseStyle {
    name = 'accordion';

    theme = theme;

    classes = classes;
}

/**
 *
 * Accordion groups a collection of contents in tabs.
 *
 * [Live Demo](https://www.primeng.org/accordion/)
 *
 * @module accordionstyle
 *
 */
export enum AccordionClasses {
    /**
     * Class name of the root element
     */
    root = 'p-accordion',
    /**
     * Class name of the content wrapper
     */
    contentwrapper = 'p-accordioncontent',
    /**
     * Class name of the content
     */
    content = 'p-accordioncontent-content',
    /**
     * Class name of the header
     */
    header = 'p-accordionheader',
    /**
     * Class name of the toggle icon
     */
    toggleicon = 'p-accordionheader-toggle-icon',
    /**
     * Class name of the panel
     */
    panel = 'p-accordionpanel'
}

export interface AccordionStyle extends BaseStyle {}
