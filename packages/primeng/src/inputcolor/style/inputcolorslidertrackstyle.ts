import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: 'p-inputcolor-slider-track'
};

@Injectable()
export class InputColorSliderTrackStyle extends BaseStyle {
    name = 'inputcolorslidertrack';

    classes = classes;
}

export interface InputColorSliderTrackStyle extends BaseStyle {}
