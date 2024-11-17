import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-accordionpanel {
    display: flex;
    flex-direction: column;
    border-style: solid;
    border-width: ${dt('accordion.panel.border.width')};
    border-color: ${dt('accordion.panel.border.color')};
}

.p-accordionheader {
    all: unset;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${dt('accordion.header.padding')};
    color: ${dt('accordion.header.color')};
    background: ${dt('accordion.header.background')};
    border-style: solid;
    border-width: ${dt('accordion.header.border.width')};
    border-color: ${dt('accordion.header.border.color')};
    font-weight: ${dt('accordion.header.font.weight')};
    border-radius: ${dt('accordion.header.border.radius')};
    transition: background ${dt('accordion.transition.duration')}; color ${dt('accordion.transition.duration')}color ${dt('accordion.transition.duration')}, outline-color ${dt('accordion.transition.duration')}, box-shadow ${dt(
        'accordion.transition.duration'
    )};
    outline-color: transparent;
}

.p-accordionpanel:first-child > .p-accordionheader {
    border-width: ${dt('accordion.header.first.border.width')};
    border-top-left-radius: ${dt('accordion.header.first.top.border.radius')};
    border-top-right-radius: ${dt('accordion.header.first.top.border.radius')};
}

.p-accordionpanel:last-child > .p-accordionheader {
    border-bottom-left-radius: ${dt('accordion.header.last.bottom.border.radius')};
    border-bottom-right-radius: ${dt('accordion.header.last.bottom.border.radius')};
}

.p-accordionpanel:last-child.p-accordionpanel-active > .p-accordionheader {
    border-bottom-left-radius: ${dt('accordion.header.last.active.bottom.border.radius')};
    border-bottom-right-radius:${dt('accordion.header.last.active.bottom.border.radius')};
}

.p-accordionheader-toggle-icon {
    color: ${dt('accordion.header.toggle.icon.color')};
}

.p-accordionpanel:not(.p-disabled) .p-accordionheader:focus-visible {
    box-shadow: ${dt('accordion.header.focus.ring.shadow')};
    outline: ${dt('accordion.header.focus.ring.width')} ${dt('accordion.header.focus.ring.style')} ${dt('accordion.header.focus.ring.color')};
    outline-offset: ${dt('accordion.header.focus.ring.offset')};
}

.p-accordionpanel:not(.p-accordionpanel-active):not(.p-disabled) > .p-accordionheader:hover {
    background: ${dt('accordion.header.hover.background')};
    color: ${dt('accordion.header.hover.color')}
}

.p-accordionpanel:not(.p-accordionpanel-active):not(.p-disabled) .p-accordionheader:hover .p-accordionheader-toggle-icon {
    color: ${dt('accordion.header.toggle.icon.hover.color')};
}

.p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader {
    background: ${dt('accordion.header.active.background')};
    color: ${dt('accordion.header.active.color')}
}

.p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader .p-accordionheader-toggle-icon {
    color: ${dt('accordion.header.toggle.icon.active.color')};
}

.p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader:hover  {
    background: ${dt('accordion.header.active.hover.background')};
    color: ${dt('accordion.header.active.hover.color')}
}

.p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader:hover  .p-accordionheader-toggle-icon {
    color: ${dt('accordion.header.toggle.icon.active.hover.color')};
}

.p-accordioncontent-content {
    border-style: solid;
    border-width: ${dt('accordion.content.border.width')};
    border-color: ${dt('accordion.content.border.color')};
    background-color: ${dt('accordion.content.background')};
    color: ${dt('accordion.content.color')};
    padding: ${dt('accordion.content.padding')}
}

/*For PrimeNG*/

.p-accordion .p-accordioncontent {
    overflow: hidden;
}

.p-accordionpanel.p-accordioncontent:not(.ng-animating) {
    overflow: inherit;
}

.p-accordionheader-toggle-icon.icon-start {
    order: -1;
}

.p-accordionheader:has(.p-accordionheader-toggle-icon.icon-start) {
    justify-content: flex-start;
    gap: ${dt('accordion.header.padding')};
}
`;

const classes = {
    root: 'p-accordion p-component'
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
