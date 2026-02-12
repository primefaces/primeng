import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/slider';
import { BaseStyle } from 'primeng/base';

const inlineStyles = {
    handle: ({ instance }) => ({
        position: 'absolute',
        transition: instance.dragging() ? 'none' : null,
        'inset-inline-start': instance.isHorizontal() ? instance.handleValue() + '%' : null,
        bottom: instance.isVertical() ? instance.handleValue() + '%' : null
    }),
    range: ({ instance }) => {
        const offset = instance.offset();
        const diff = instance.diff();
        const handleValues = instance.handleValues();

        if (instance.range() && instance.isHorizontal()) {
            return {
                position: 'absolute',
                'inset-inline-start': offset !== null && offset !== undefined ? offset + '%' : handleValues[0] + '%',
                width: diff ? diff + '%' : handleValues[1] - handleValues[0] + '%'
            };
        }

        if (instance.range() && instance.isVertical()) {
            return {
                position: 'absolute',
                bottom: offset !== null && offset !== undefined ? offset + '%' : handleValues[0] + '%',
                height: diff ? diff + '%' : handleValues[1] - handleValues[0] + '%'
            };
        }

        if (!instance.range() && instance.isVertical()) {
            return {
                position: 'absolute',
                height: instance.handleValue() + '%'
            };
        }

        // Single horizontal (default)
        return {
            position: 'absolute',
            width: instance.handleValue() + '%'
        };
    },
    startHandler: ({ instance }) => {
        const handleValues = instance.handleValues();
        return {
            position: 'absolute',
            transition: instance.dragging() ? 'none' : null,
            'inset-inline-start': !instance.isVertical() ? (handleValues[0] > 100 ? '100%' : handleValues[0] + '%') : null,
            bottom: instance.isVertical() ? handleValues[0] + '%' : 'auto'
        };
    },
    endHandler: ({ instance }) => {
        const handleValues = instance.handleValues();
        return {
            position: 'absolute',
            transition: instance.dragging() ? 'none' : null,
            'inset-inline-start': instance.isVertical() ? null : handleValues[1] + '%',
            bottom: instance.isVertical() ? handleValues[1] + '%' : 'auto'
        };
    }
};

const classes = {
    root: ({ instance }) => [
        'p-slider p-component',
        {
            'p-disabled': instance.$disabled(),
            'p-invalid': instance.invalid(),
            'p-slider-horizontal': instance.isHorizontal(),
            'p-slider-vertical': instance.isVertical(),
            'p-slider-animate': instance.animate()
        }
    ],
    range: 'p-slider-range',
    handle: 'p-slider-handle'
};

@Injectable()
export class SliderStyle extends BaseStyle {
    name = 'slider';

    style = style;

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
