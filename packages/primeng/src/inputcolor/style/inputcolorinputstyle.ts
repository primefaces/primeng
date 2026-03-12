import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: 'p-inputcolor-input'
};

@Injectable()
export class InputColorInputStyle extends BaseStyle {
    name = 'inputcolorinput';

    classes = classes;
}

export interface InputColorInputStyle extends BaseStyle {}
