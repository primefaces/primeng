import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/colorpicker';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: ({ instance }) => ['p-colorpicker p-component', { 'p-colorpicker-overlay': !instance.inline, 'p-colorpicker-dragging': instance.colorDragging || instance.hueDragging }],
    preview: ({ instance }) => ['p-colorpicker-preview', { 'p-disabled': instance.disabled() }],
    panel: ({ instance }) => [
        'p-colorpicker-panel',
        {
            'p-colorpicker-panel-inline': instance.inline,
            'p-disabled': instance.disabled()
        }
    ],
    content: 'p-colorpicker-content',
    colorSelector: 'p-colorpicker-color-selector',
    colorBackground: 'p-colorpicker-color-background',
    colorHandle: 'p-colorpicker-color-handle',
    hue: 'p-colorpicker-hue',
    hueHandle: 'p-colorpicker-hue-handle'
};

@Injectable()
export class ColorPickerStyle extends BaseStyle {
    name = 'colorpicker';

    theme = style;

    classes = classes;
}

/**
 *
 * ColorPicker groups a collection of contents in tabs.
 *
 * [Live Demo](https://www.primeng.org/colorpicker/)
 *
 * @module colorpickerstyle
 *
 */
export enum ColorPickerClasses {
    /**
     * Class name of the root element
     */
    root = 'p-colorpicker',
    /**
     * Class name of the preview element
     */
    preview = 'p-colorpicker-preview',
    /**
     * Class name of the panel element
     */
    panel = 'p-colorpicker-panel',
    /**
     * Class name of the color selector element
     */
    colorSelector = 'p-colorpicker-color-selector',
    /**
     * Class name of the color background element
     */
    colorBackground = 'p-colorpicker-color-background',
    /**
     * Class name of the color handle element
     */
    colorHandle = 'p-colorpicker-color-handle',
    /**
     * Class name of the hue element
     */
    hue = 'p-colorpicker-hue',
    /**
     * Class name of the hue handle element
     */
    hueHandle = 'p-colorpicker-hue-handle'
}

export interface ColorPickerStyle extends BaseStyle {}
