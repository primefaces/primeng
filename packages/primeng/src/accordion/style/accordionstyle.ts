import { Injectable } from '@angular/core';
import { style as accordion_style } from '@primeuix/styles/accordion';
import { BaseStyle } from 'primeng/base';

const style = /*css*/ `
${accordion_style}

/* Animations */
.p-accordion-content-enter-from,
.p-accordion-content-leave-to {
    max-height: 0;
}

.p-accordion-content-enter-to,
.p-accordion-content-leave-from {
    max-height: var(--pui-motion-height, 1000px);
}

.p-accordion-content-leave-active {
    overflow: hidden;
    transition: max-height 400ms cubic-bezier(0.86, 0, 0.07, 1);
}

.p-accordion-content-enter-active {
    overflow: hidden;
    transition: max-height 400ms cubic-bezier(0.86, 0, 0.07, 1);
}

/* For PrimeNG */
.p-accordionheader-toggle-icon.icon-start {
    order: -1;
}

.p-accordionheader:has(.p-accordionheader-toggle-icon.icon-start) {
    justify-content: flex-start;
    gap: dt('accordion.header.padding');
}

.p-accordionheader.p-ripple {
    overflow: hidden;
    position: relative;
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

    style = style;

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
