import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/popover';
import { BaseStyle } from 'primeng/base';

const inlineStyles = {
    root: ({ instance }) => {
        const style = instance.style();

        return {
            position: 'absolute',
            ...style
        };
    }
};

const classes = {
    root: 'p-popover p-component',
    content: 'p-popover-content'
};

@Injectable()
export class PopoverStyle extends BaseStyle {
    name = 'popover';

    style = style;

    classes = classes;

    inlineStyles = inlineStyles;
}
