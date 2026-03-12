import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: 'p-inputcolor-eyedropper'
};

@Injectable()
export class InputColorEyeDropperStyle extends BaseStyle {
    name = 'inputcoloreyedropper';

    classes = classes;
}

export interface InputColorEyeDropperStyle extends BaseStyle {}
