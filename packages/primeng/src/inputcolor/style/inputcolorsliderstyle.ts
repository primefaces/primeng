import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: 'p-inputcolor-slider'
};

@Injectable()
export class InputColorSliderStyle extends BaseStyle {
    name = 'inputcolorslider';

    classes = classes;
}

export interface InputColorSliderStyle extends BaseStyle {}
