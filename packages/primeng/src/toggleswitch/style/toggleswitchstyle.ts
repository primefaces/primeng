import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-toggleswitch {
    display: inline-block;
    width: ${dt('toggleswitch.width')};
    height: ${dt('toggleswitch.height')};
}

.p-toggleswitch-input {
    cursor: pointer;
    appearance: none;
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: 1;
    outline: 0 none;
    border-radius: ${dt('toggleswitch.border.radius')};
}

.p-toggleswitch-slider {
    display: inline-block;
    cursor: pointer;
    width: 100%;
    height: 100%;
    border-width: ${dt('toggleswitch.border.width')};
    border-style: solid;
    border-color: ${dt('toggleswitch.border.color')};
    background: ${dt('toggleswitch.background')};
    transition: background ${dt('toggleswitch.transition.duration')}, color ${dt('toggleswitch.transition.duration')}, border-color ${dt('toggleswitch.transition.duration')}, outline-color ${dt('toggleswitch.transition.duration')}, box-shadow ${dt(
        'toggleswitch.transition.duration'
    )};
    border-radius: ${dt('toggleswitch.border.radius')};
    outline-color: transparent;
    box-shadow: ${dt('toggleswitch.shadow')};
}

.p-toggleswitch-handle {
    position: absolute;
    top: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${dt('toggleswitch.handle.background')};
    color: ${dt('toggleswitch.handle.color')};
    width: ${dt('toggleswitch.handle.size')};
    height: ${dt('toggleswitch.handle.size')};
    inset-inline-start: ${dt('toggleswitch.gap')};
    margin-block-start: calc(-1 * calc(${dt('toggleswitch.handle.size')} / 2));
    border-radius: ${dt('toggleswitch.handle.border.radius')};
    transition: background ${dt('toggleswitch.transition.duration')}, color ${dt('toggleswitch.transition.duration')}, inset-inline-start ${dt('toggleswitch.slide.duration')}, box-shadow ${dt('toggleswitch.slide.duration')};
}

.p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider {
    background: ${dt('toggleswitch.checked.background')};
    border-color: ${dt('toggleswitch.checked.border.color')};
}

.p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-handle {
    background: ${dt('toggleswitch.handle.checked.background')};
    color: ${dt('toggleswitch.handle.checked.color')};
    inset-inline-start: calc(${dt('toggleswitch.width')} - calc(${dt('toggleswitch.handle.size')} + ${dt('toggleswitch.gap')}));
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-slider {
    background: ${dt('toggleswitch.hover.background')};
    border-color: ${dt('toggleswitch.hover.border.color')};
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-handle {
    background: ${dt('toggleswitch.handle.hover.background')};
    color: ${dt('toggleswitch.handle.hover.color')};
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-slider {
    background: ${dt('toggleswitch.checked.hover.background')};
    border-color: ${dt('toggleswitch.checked.hover.border.color')};
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-handle {
    background: ${dt('toggleswitch.handle.checked.hover.background')};
    color: ${dt('toggleswitch.handle.checked.hover.color')};
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:focus-visible) .p-toggleswitch-slider {
    box-shadow: ${dt('toggleswitch.focus.ring.shadow')};
    outline: ${dt('toggleswitch.focus.ring.width')} ${dt('toggleswitch.focus.ring.style')} ${dt('toggleswitch.focus.ring.color')};
    outline-offset: ${dt('toggleswitch.focus.ring.offset')};
}

.p-toggleswitch.p-invalid > .p-toggleswitch-slider {
    border-color: ${dt('toggleswitch.invalid.border.color')};
}

.p-toggleswitch.p-disabled {
    opacity: 1;
}

.p-toggleswitch.p-disabled .p-toggleswitch-slider {
    background: ${dt('toggleswitch.disabled.background')};
}

.p-toggleswitch.p-disabled .p-toggleswitch-handle {
    background: ${dt('toggleswitch.handle.disabled.background')};
}

/* For PrimeNG */

p-toggleswitch.ng-invalid.ng-dirty > .p-toggleswitch > .p-toggleswitch-slider {
    border-color: ${dt('toggleswitch.invalid.border.color')};
}`;

const inlineStyles = {
    root: { position: 'relative' }
};

const classes = {
    root: ({ instance }) => ({
        'p-toggleswitch p-component': true,
        'p-toggleswitch-checked': instance.checked(),
        'p-disabled': instance.disabled,
        'p-invalid': instance.invalid
    }),
    input: 'p-toggleswitch-input',
    slider: 'p-toggleswitch-slider',
    handle: 'p-toggleswitch-handle'
};

@Injectable()
export class ToggleSwitchStyle extends BaseStyle {
    name = 'toggleswitch';

    theme = theme;

    classes = classes;

    inlineStyles = inlineStyles;
}

/**
 *
 * ToggleSwitch is used to select a boolean value.
 *
 * [Live Demo](https://www.primeng.org/toggleswitch/)
 *
 * @module toggleswitchstyle
 *
 */
export enum ToggleSwitchClasses {
    /**
     * Class name of the root element
     */
    root = 'p-toggleswitch',
    /**
     * Class name of the input element
     */
    input = 'p-toggleswitch-input',
    /**
     * Class name of the slider element
     */
    slider = 'p-toggleswitch-slider'
}

export interface ToggleSwitchStyle extends BaseStyle {}
