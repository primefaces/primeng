import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-blockui {
    position: relative;
}

.p-blockui-mask {
    border-radius: ${dt('blockui.border.radius')};
}

.p-blockui-mask.p-overlay-mask {
    position: absolute;
}

.p-blockui-mask-document.p-overlay-mask {
    position: fixed;
}
`;

const classes = {
    root: 'p-blockui'
};

@Injectable()
export class BlockUiStyle extends BaseStyle {
    name = 'blockui';

    theme = theme;

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
