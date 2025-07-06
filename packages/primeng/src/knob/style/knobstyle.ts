import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/knob';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: ({ instance }) => ['p-knob p-component', { 'p-disabled': instance.disabled() }],
    range: 'p-knob-range',
    value: 'p-knob-value',
    text: 'p-knob-text'
};

@Injectable()
export class KnobStyle extends BaseStyle {
    name = 'knob';

    theme = style;

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
