import { Injectable } from '@angular/core';
import { style as popover_style } from '@primeuix/styles/popover';
import { BaseStyle } from 'primeng/base';

const style = /*css*/ `
${popover_style}
/*For PrimeNG*/
.p-popover {
    position: absolute;
}`;

const classes = {
    root: 'p-popover p-component',
    content: 'p-popover-content'
};

@Injectable()
export class PopoverStyle extends BaseStyle {
    name = 'popover';

    style = style;

    classes = classes;
}
