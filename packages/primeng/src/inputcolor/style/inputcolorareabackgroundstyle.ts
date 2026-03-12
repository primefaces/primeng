import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: 'p-inputcolor-area-background'
};

@Injectable()
export class InputColorAreaBackgroundStyle extends BaseStyle {
    name = 'inputcolorareabackground';

    classes = classes;
}

export interface InputColorAreaBackgroundStyle extends BaseStyle {}
