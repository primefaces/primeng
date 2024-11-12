import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-radiobutton {
    position: relative;
    display: inline-flex;
    user-select: none;
    vertical-align: bottom;
    width: ${dt('radiobutton.width')};
    height: ${dt('radiobutton.height')};
}

.p-radiobutton-input {
    cursor: pointer;
    appearance: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: 1;
    outline: 0 none;
    border: 1px solid transparent;
    border-radius: 50%;
}

.p-radiobutton-box {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 1px solid ${dt('radiobutton.border.color')};
    background: ${dt('radiobutton.background')};
    width: ${dt('radiobutton.width')};
    height: ${dt('radiobutton.height')};
    transition: background ${dt('radiobutton.transition.duration')}, color ${dt('radiobutton.transition.duration')}, border-color ${dt('radiobutton.transition.duration')}, box-shadow ${dt('radiobutton.transition.duration')}, outline-color ${dt(
        'radiobutton.transition.duration'
    )};
    outline-color: transparent;
    box-shadow: ${dt('radiobutton.shadow')};
}

.p-radiobutton-icon {
    transition-duration: ${dt('radiobutton.transition.duration')};
    background: transparent;
    font-size: ${dt('radiobutton.icon.size')};
    width: ${dt('radiobutton.icon.size')};
    height: ${dt('radiobutton.icon.size')};
    border-radius: 50%;
    backface-visibility: hidden;
    transform: translateZ(0) scale(0.1);
}

.p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:hover) .p-radiobutton-box {
    border-color: ${dt('radiobutton.hover.border.color')};
}

.p-radiobutton-checked .p-radiobutton-box {
    border-color: ${dt('radiobutton.checked.border.color')};
    background: ${dt('radiobutton.checked.background')};
}

.p-radiobutton-checked .p-radiobutton-box .p-radiobutton-icon {
    background: ${dt('radiobutton.icon.checked.color')};
    transform: translateZ(0) scale(1, 1);
    visibility: visible;
}

.p-radiobutton-checked:not(.p-disabled):has(.p-radiobutton-input:hover) .p-radiobutton-box {
    border-color: ${dt('radiobutton.checked.hover.border.color')};
    background: ${dt('radiobutton.checked.hover.background')};
}

.p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:hover).p-radiobutton-checked .p-radiobutton-box .p-radiobutton-icon {
    background: ${dt('radiobutton.icon.checked.hover.color')};
}

.p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {
    border-color: ${dt('radiobutton.focus.border.color')};
    box-shadow: ${dt('radiobutton.focus.ring.shadow')};
    outline: ${dt('radiobutton.focus.ring.width')} ${dt('radiobutton.focus.ring.style')} ${dt('radiobutton.focus.ring.color')};
    outline-offset: ${dt('radiobutton.focus.ring.offset')};
}

.p-radiobutton-checked:not(.p-disabled):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {
    border-color: ${dt('radiobutton.checked.focus.border.color')};
}

.p-radiobutton.ng-invalid.ng-dirty > .p-radiobutton-box {
    border-color: ${dt('radiobutton.invalid.border.color')};
}

.p-radiobutton.p-variant-filled .p-radiobutton-box {
    background: ${dt('radiobutton.filled.background')};
}

.p-radiobutton.p-variant-filled.p-radiobutton-checked .p-radiobutton-box {
    background: ${dt('radiobutton.checked.background')};
}

.p-radiobutton.p-variant-filled:not(.p-disabled):has(.p-radiobutton-input:hover).p-radiobutton-checked .p-radiobutton-box {
    background: ${dt('radiobutton.checked.hover.background')};
}

.p-radiobutton.p-disabled {
    opacity: 1;
}

.p-radiobutton.p-disabled .p-radiobutton-box {
    background: ${dt('radiobutton.disabled.background')};
    border-color: ${dt('radiobutton.checked.disabled.border.color')};
}

.p-radiobutton-checked.p-disabled .p-radiobutton-box .p-radiobutton-icon {
    background: ${dt('radiobutton.icon.disabled.color')};
}

.p-radiobutton-sm,
.p-radiobutton-sm .p-radiobutton-box {
    width: ${dt('radiobutton.sm.width')};
    height: ${dt('radiobutton.sm.height')};
}

.p-radiobutton-sm .p-radiobutton-icon {
    font-size: ${dt('radiobutton.icon.sm.size')};
    width: ${dt('radiobutton.icon.sm.size')};
    height: ${dt('radiobutton.icon.sm.size')};
}

.p-radiobutton-lg,
.p-radiobutton-lg .p-radiobutton-box {
    width: ${dt('radiobutton.lg.width')};
    height: ${dt('radiobutton.lg.height')};
}

.p-radiobutton-lg .p-radiobutton-icon {
    font-size: ${dt('radiobutton.icon.lg.size')};
    width: ${dt('radiobutton.icon.lg.size')};
    height: ${dt('radiobutton.icon.lg.size')};
}
`;

const classes = {
    root: ({ instance, props }) => [
        'p-radiobutton p-component',
        {
            'p-radiobutton-checked': instance.checked,
            'p-disabled': props.disabled,
            'p-invalid': props.invalid,
            'p-variant-filled': props.variant ? props.variant === 'filled' : instance.config.inputStyle === 'filled' || instance.config.inputVariant === 'filled'
        }
    ],
    box: 'p-radiobutton-box',
    input: 'p-radiobutton-input',
    icon: 'p-radiobutton-icon'
};

@Injectable()
export class RadioButtonStyle extends BaseStyle {
    name = 'radiobutton';

    theme = theme;

    classes = classes;
}

/**
 *
 * RadioButton is an extension to standard radio button element with theming.
 *
 * [Live Demo](https://www.primeng.org/radiobutton/)
 *
 * @module radiobuttonstyle
 *
 */
export enum RadioButtonClasses {
    /**
     * Class name of the root element
     */
    root = 'p-radiobutton',
    /**
     * Class name of the box element
     */
    box = 'p-radiobutton-box',
    /**
     * Class name of the input element
     */
    input = 'p-radiobutton-input',
    /**
     * Class name of the icon element
     */
    icon = 'p-radiobutton-icon'
}

export interface RadioButtonStyle extends BaseStyle {}
