import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: 'p-inputcolor-swatch-background'
};

@Injectable()
export class InputColorSwatchBackgroundStyle extends BaseStyle {
    name = 'inputcolorswatchbackground';

    classes = classes;
}

export interface InputColorSwatchBackgroundStyle extends BaseStyle {}
