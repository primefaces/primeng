import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/slider';
import { BaseStyle } from 'primeng/base';

const inlineStyles = {
    handle: { position: 'absolute' },
    range: { position: 'absolute' }
};

const classes = {
    root: ({ instance }) => [
        'p-slider p-component',
        {
            'p-disabled': instance.disabled(),
            'p-invalid': instance.invalid(),
            'p-slider-horizontal': instance.orientation === 'horizontal',
            'p-slider-vertical': instance.orientation === 'vertical',
            'p-slider-animate': instance.animate
        }
    ],
    range: 'p-slider-range',
    handle: 'p-slider-handle'
};

@Injectable()
export class SliderStyle extends BaseStyle {
    name = 'slider';

    theme = style;

    classes = classes;

    inlineStyles = inlineStyles;
}

/**
 *
 * Slider is a component to provide input with a drag handle.
 *
 * [Live Demo](https://www.primeng.org/slider/)
 *
 * @module sliderstyle
 *
 */
export enum SliderClasses {
    /**
     * Class name of the root element
     */
    root = 'p-slider',
    /**
     * Class name of the range element
     */
    range = 'p-slider-range',
    /**
     * Class name of the handle element
     */
    handle = 'p-slider-handle'
}

export interface SliderStyle extends BaseStyle {}
