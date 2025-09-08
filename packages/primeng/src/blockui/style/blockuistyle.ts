import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/blockui';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: ({ instance }) => [
        'p-blockui p-blockui-mask p-overlay-mask',
        {
            'p-blockui-mask-document': !instance.target
        }
    ]
};

@Injectable()
export class BlockUiStyle extends BaseStyle {
    name = 'blockui';

    theme = style;

    classes = classes;
}

/**
 *
 * BlockUI represents people using icons, labels and images.
 *
 * [Live Demo](https://www.primeng.org/blockui)
 *
 * @module blockuistyle
 *
 */
export enum BlockUIClasses {
    /**
     * Class name of the root element
     */
    root = 'p-blockui'
}

export interface BlockUIStyle extends BaseStyle {}
