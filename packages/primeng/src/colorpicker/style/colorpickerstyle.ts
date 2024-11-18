import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-colorpicker {
    display: inline-block;
    position: relative;
}

.p-colorpicker-dragging {
    cursor: pointer;
}

.p-colorpicker-preview {
    width: ${dt('colorpicker.preview.width')};
    height: ${dt('colorpicker.preview.height')};
    padding: 0;
    border: 0 none;
    border-radius: ${dt('colorpicker.preview.border.radius')};
    transition: background ${dt('colorpicker.transition.duration')}, color ${dt('colorpicker.transition.duration')}, border-color ${dt('colorpicker.transition.duration')}, outline-color ${dt('colorpicker.transition.duration')}, box-shadow ${dt(
        'colorpicker.transition.duration'
    )};
    outline-color: transparent;
    cursor: pointer;
}

.p-colorpicker-preview:enabled:focus-visible {
    border-color: ${dt('colorpicker.preview.focus.border.color')};
    box-shadow: ${dt('colorpicker.preview.focus.ring.shadow')};
    outline: ${dt('colorpicker.preview.focus.ring.width')} ${dt('colorpicker.preview.focus.ring.style')} ${dt('colorpicker.preview.focus.ring.color')};
    outline-offset: ${dt('colorpicker.preview.focus.ring.offset')};
}

.p-colorpicker-panel {
    background: ${dt('colorpicker.panel.background')};
    border: 1px solid ${dt('colorpicker.panel.border.color')};
    border-radius: ${dt('colorpicker.panel.border.radius')};
    box-shadow: ${dt('colorpicker.panel.shadow')};
    width: 193px;
    height: 166px;
    position: absolute;
    top: 0;
    left: 0;
}

.p-colorpicker-panel-inline {
    box-shadow: none;
    position: static;
}

.p-colorpicker-content {
    position: relative;
}

.p-colorpicker-color-selector {
    width: 150px;
    height: 150px;
    top: 8px;
    left: 8px;
    position: absolute;
}

.p-colorpicker-color-background {
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, #000 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%);
}

.p-colorpicker-color-handle {
    position: absolute;
    top: 0px;
    left: 150px;
    border-radius: 100%;
    width: 10px;
    height: 10px;
    border-width: 1px;
    border-style: solid;
    margin: -5px 0 0 -5px;
    cursor: pointer;
    opacity: 0.85;
    border-color: ${dt('colorpicker.handle.color')};
}

.p-colorpicker-hue {
    width: 17px;
    height: 150px;
    top: 8px;
    left: 167px;
    position: absolute;
    opacity: 0.85;
    background: linear-gradient(0deg,
        red 0,
        #ff0 17%,
        #0f0 33%,
        #0ff 50%,
        #00f 67%,
        #f0f 83%,
        red);
}

.p-colorpicker-hue-handle {
    position: absolute;
    top: 150px;
    left: 0px;
    width: 21px;
    margin-left: -2px;
    margin-top: -5px;
    height: 10px;
    border-width: 2px;
    border-style: solid;
    opacity: 0.85;
    cursor: pointer;
    border-color: ${dt('colorpicker.handle.color')};
}
`;

const classes = {
    root: 'p-colorpicker p-component',
    preview: ({ props }) => ['p-colorpicker-preview', { 'p-disabled': props.disabled }],
    panel: ({ props }) => [
        'p-colorpicker-panel',
        {
            'p-colorpicker-panel-inline': props.inline,
            'p-disabled': props.disabled
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

    theme = theme;

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
