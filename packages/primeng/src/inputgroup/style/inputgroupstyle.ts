import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-inputgroup,
.p-inputgroup .p-floatlabel,
.p-inputgroup .p-iftalabel {
    display: flex;
    align-items: stretch;
    width: 100%;
}

.p-inputgroup .p-inputtext,
.p-inputgroup .p-inputwrapper {
    flex: 1 1 auto;
    width: 1%;
}

.p-inputgroupaddon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${dt('inputgroup.addon.padding')};
    background: ${dt('inputgroup.addon.background')};
    color: ${dt('inputgroup.addon.color')};
    border-block-start: 1px solid ${dt('inputgroup.addon.border.color')};
    border-block-end: 1px solid ${dt('inputgroup.addon.border.color')};
    min-width: ${dt('inputgroup.addon.min.width')};
}

.p-inputgroupaddon:first-child,
.p-inputgroupaddon + .p-inputgroupaddon {
    border-inline-start: 1px solid ${dt('inputgroup.addon.border.color')};
}

.p-inputgroupaddon:last-child {
    border-inline-end: 1px solid ${dt('inputgroup.addon.border.color')};
}

.p-inputgroupaddon:has(.p-button) {
    padding: 0;
    overflow: hidden;
}

.p-inputgroupaddon .p-button {
    border-radius: 0;
}

.p-inputgroup > .p-component,
.p-inputgroup > .p-inputwrapper > .p-component,
.p-inputgroup:first-child > p-button > .p-button,
.p-inputgroup > .p-floatlabel > .p-component,
.p-inputgroup > .p-floatlabel > .p-inputwrapper > .p-component,
.p-inputgroup > .p-iftalabel > .p-component,
.p-inputgroup > .p-iftalabel > .p-inputwrapper > .p-component {
    border-radius: 0;
    margin: 0;
}

.p-inputgroupaddon:first-child,
.p-inputgroup > .p-component:first-child,
.p-inputgroup > .p-inputwrapper:first-child > .p-component,
.p-inputgroup > .p-floatlabel:first-child > .p-component,
.p-inputgroup > .p-floatlabel:first-child > .p-inputwrapper > .p-component,
.p-inputgroup > .p-iftalabel:first-child > .p-component,
.p-inputgroup > .p-iftalabel:first-child > .p-inputwrapper > .p-component {
    border-start-start-radius: ${dt('inputgroup.addon.border.radius')};
    border-end-start-radius: ${dt('inputgroup.addon.border.radius')};
}

.p-inputgroupaddon:last-child,
.p-inputgroup > .p-component:last-child,
.p-inputgroup > .p-inputwrapper:last-child > .p-component,
.p-inputgroup > .p-floatlabel:last-child > .p-component,
.p-inputgroup > .p-floatlabel:last-child > .p-inputwrapper > .p-component,
.p-inputgroup > .p-iftalabel:last-child > .p-component,
.p-inputgroup > .p-iftalabel:last-child > .p-inputwrapper > .p-component {
    border-start-end-radius: ${dt('inputgroup.addon.border.radius')};
    border-end-end-radius: ${dt('inputgroup.addon.border.radius')};
}

.p-inputgroup .p-component:focus,
.p-inputgroup .p-component.p-focus,
.p-inputgroup .p-inputwrapper-focus,
.p-inputgroup .p-component:focus ~ label,
.p-inputgroup .p-component.p-focus ~ label,
.p-inputgroup .p-inputwrapper-focus ~ label {
    z-index: 1;
}

.p-inputgroup > .p-button:not(.p-button-icon-only) {
    width: auto;
}

/*For PrimeNG*/

.p-inputgroup p-button:first-child, .p-inputgroup p-button:last-child {
    display: inline-flex;
}

.p-inputgroup:has(> p-button:first-child) .p-button{
    border-start-start-radius: ${dt('inputgroup.addon.border.radius')};
    border-end-start-radius: ${dt('inputgroup.addon.border.radius')};
}

.p-inputgroup:has(> p-button:last-child) .p-button {
    border-start-end-radius: ${dt('inputgroup.addon.border.radius')};
    border-end-end-radius: ${dt('inputgroup.addon.border.radius')};
}
`;

const classes = {
    root: ({ props }) => [
        'p-inputgroup',
        {
            'p-inputgroup-fluid': props.fluid
        }
    ]
};

@Injectable()
export class InputGroupStyle extends BaseStyle {
    name = 'inputgroup';

    theme = theme;

    classes = classes;
}

/**
 *
 * InputGroup displays text, icon, buttons and other content can be grouped next to an input.
 *
 * [Live Demo](https://www.primeng.org/inputgroup/)
 *
 * @module inputgroupstyle
 *
 */

export enum InputGroupClasses {
    /**
     * Class name of the root element
     */
    root = 'p-inputgroup'
}

export interface InputGroupStyle extends BaseStyle {}
