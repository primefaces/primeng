import { Injectable } from '@angular/core';
import { style as accordion_style } from '@primeuix/styles/accordion';
import { BaseStyle } from 'primeng/base';

const style = /*css*/ `
${accordion_style}

/*For PrimeNG*/
.p-accordionheader-toggle-icon.icon-start {
    order: -1;
}

.p-accordionheader:has(.p-accordionheader-toggle-icon.icon-start) {
    justify-content: flex-start;
    gap: dt('accordion.header.padding');
}

.p-collapsible-enter .p-accordioncontent-content,
.p-collapsible-leave .p-accordioncontent-content {
    overflow: hidden;
}

.p-accordionheader.p-ripple {
    overflow: hidden;
    position: relative;
}

/* Animations */

.p-accordion-collapsible-enter {
    animation-name: p-animate-accordion-collapsible-enter;
    animation-duration: 1000ms;
    animation-timing-function: ease-in-out;
}

.p-accordion-collapsible-leave {
    animation-name: p-animate-accordion-collapsible-leave;
    animation-duration: 450ms;
    animation-timing-function: cubic-bezier(0, 1, 0, 1);
    animation-fill-mode: forwards;
}

@keyframes p-animate-accordion-collapsible-enter {
    from {
        max-height: 0;
        overflow: hidden
    }
    to {
        max-height: 1000px;
    }
}

@keyframes p-animate-accordion-collapsible-leave {
    from {
        max-height: 1000px;
    }
    to {
        overflow: hidden;
        max-height: 0;
    }
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
