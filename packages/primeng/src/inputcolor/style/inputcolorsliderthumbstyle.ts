import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: 'p-inputcolor-slider-thumb'
};

@Injectable()
export class InputColorSliderThumbStyle extends BaseStyle {
    name = 'inputcolorsliderthumb';

    classes = classes;
}

export interface InputColorSliderThumbStyle extends BaseStyle {}
