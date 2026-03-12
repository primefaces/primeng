import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: 'p-inputcolor-swatch'
};

@Injectable()
export class InputColorSwatchStyle extends BaseStyle {
    name = 'inputcolorswatch';

    classes = classes;
}

export interface InputColorSwatchStyle extends BaseStyle {}
