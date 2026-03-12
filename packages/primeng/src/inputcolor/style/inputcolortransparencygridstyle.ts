import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: 'p-inputcolor-transparency-grid'
};

@Injectable()
export class InputColorTransparencyGridStyle extends BaseStyle {
    name = 'inputcolortransparencygrid';

    classes = classes;
}

export interface InputColorTransparencyGridStyle extends BaseStyle {}
