import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/popover';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: ({ instance }) => ['p-popover p-component', instance.styleClass],
    content: 'p-popover-content'
};

@Injectable()
export class PopoverStyle extends BaseStyle {
    name = 'popover';

    theme = style;

    classes = classes;
}

/**
 *
 * Popover is a container component positioned as connected to its target.
 *
 * [Live Demo](https://www.primeng.org/popover)
 *
 * @module popoverstyle
 *
 */
export enum PopoverClasses {
    /**
     * Class name of the root element
     */
    root = 'p-popover',
    /**
     * Class name of the content element
     */
    content = 'p-popover-content'
}

export interface PopoverStyle extends BaseStyle {}
