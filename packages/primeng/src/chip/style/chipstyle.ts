import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/chip';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: () => ['p-chip p-component'],
    image: 'p-chip-image',
    icon: 'p-chip-icon',
    label: 'p-chip-label',
    removeIcon: 'p-chip-remove-icon'
};

@Injectable()
export class ChipStyle extends BaseStyle {
    name = 'chip';

    theme = style;

    classes = classes;
}

/**
 *
 * Chip represents people using icons, labels and images.
 *
 * [Live Demo](https://www.primeng.org/chip)
 *
 * @module chipstyle
 *
 */
export enum ChipClasses {
    /**
     * Class name of the root element
     */
    root = 'p-chip',
    /**
     * Class name of the image element
     */
    image = 'p-chip-image',
    /**
     * Class name of the icon element
     */
    icon = 'p-chip-icon',
    /**
     * Class name of the label element
     */
    label = 'p-chip-label',
    /**
     * Class name of the remove icon element
     */
    removeIcon = 'p-chip-remove-icon'
}

export interface ChipStyle extends BaseStyle {}
