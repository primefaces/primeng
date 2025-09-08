import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/imagecompare';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: 'p-imagecompare',
    slider: 'p-imagecompare-slider'
};

@Injectable()
export class ImageCompareStyle extends BaseStyle {
    name = 'imagecompare';

    theme = style;

    classes = classes;
}

/**
 *
 * ImageCompare compares two images side by side with a slider.
 *
 * [Live Demo](https://www.primeng.org/imagecompare/)
 *
 * @module imagecomparestyle
 *
 */
export enum ImageCompareClasses {
    /**
     * Class name of the root element
     */
    root = 'p-imagecompare',
    /**
     * Class name of the slider element
     */
    slider = 'p-imagecompare-slider'
}
export interface ImageCompareStyle extends BaseStyle {}
