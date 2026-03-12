import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: 'p-inputcolor-area-thumb'
};

@Injectable()
export class InputColorAreaThumbStyle extends BaseStyle {
    name = 'inputcolorareathumb';

    classes = classes;
}

export interface InputColorAreaThumbStyle extends BaseStyle {}
