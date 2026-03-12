import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: 'p-inputcolor-area'
};

@Injectable()
export class InputColorAreaStyle extends BaseStyle {
    name = 'inputcolorarea';

    classes = classes;
}

export interface InputColorAreaStyle extends BaseStyle {}
