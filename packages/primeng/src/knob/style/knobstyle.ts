import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-knob-range {
    fill: none;
    transition: stroke 0.1s ease-in;
}

.p-knob-value {
    animation-name: p-knob-dash-frame;
    animation-fill-mode: forwards;
    fill: none;
}

.p-knob-text {
    font-size: 1.3rem;
    text-align: center;
}

.p-knob svg {
    border-radius: 50%;
    outline-color: transparent;
    transition: background ${dt('knob.transition.duration')}, color ${dt('knob.transition.duration')}, outline-color ${dt('knob.transition.duration')}, box-shadow ${dt('knob.transition.duration')};
}

.p-knob svg:focus-visible {
    box-shadow: ${dt('knob.focus.ring.shadow')};
    outline: ${dt('knob.focus.ring.width')} ${dt('knob.focus.ring.style')} ${dt('knob.focus.ring.color')};
    outline-offset: ${dt('knob.focus.ring.offset')};
}

@keyframes p-knob-dash-frame {
    100% {
        stroke-dashoffset: 0;
    }
}
`;

const classes = {
    root: ({ props }) => ['p-knob p-component', { 'p-disabled': props.disabled }],
    range: 'p-knob-range',
    value: 'p-knob-value',
    text: 'p-knob-text'
};

@Injectable()
export class KnobStyle extends BaseStyle {
    name = 'knob';

    theme = theme;

    classes = classes;
}

/**
 *
 * Knob is a form component to define number inputs with a dial.
 *
 * [Live Demo](https://www.primeng.org/knob/)
 *
 * @module knobstyle
 *
 */
export enum KnobClasses {
    /**
     * Class name of the root element
     */
    root = 'p-knob',
    /**
     * Class name of the range element
     */
    range = 'p-knob-range',
    /**
     * Class name of the value element
     */
    value = 'p-knob-value',
    /**
     * Class name of the text element
     */
    text = 'p-knob-text'
}

export interface KnobStyle extends BaseStyle {}
