import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/rating';
import { BaseStyle } from 'primeng/base';

const theme = /*css*/ `
    ${style}

    /* For PrimeNG */
    p-rating.ng-invalid.ng-dirty > .p-rating > .p-rating-icon {
        stroke: dt('rating.invalid.icon.color');
    }
`;

const classes = {
    root: ({ instance }) => [
        'p-rating',
        {
            'p-readonly': instance.readonly,
            'p-disabled': instance.disabled()
        }
    ],
    option: ({ instance, star, value }) => [
        'p-rating-option',

        {
            'p-rating-option-active': star + 1 <= value,
            'p-focus-visible': star + 1 === instance.focusedOptionIndex() && instance.isFocusVisibleItem
        }
    ],
    onIcon: ({ instance }) => ['p-rating-icon p-rating-on-icon', { 'p-invalid': instance.invalid() }],
    offIcon: ({ instance }) => ['p-rating-icon p-rating-off-icon', { 'p-invalid': instance.invalid() }]
};

@Injectable()
export class RatingStyle extends BaseStyle {
    name = 'rating';

    theme = theme;

    classes = classes;
}

/**
 *
 * Rating component is a star based selection input.
 *
 * [Live Demo](https://www.primeng.org/rating/)
 *
 * @module ratingstyle
 *
 */
export enum RatingClasses {
    /**
     * Class name of the root element
     */
    root = 'p-rating',
    /**
     * Class name of the option element
     */
    option = 'p-rating-option',
    /**
     * Class name of the on icon element
     */
    onIcon = 'p-rating-on-icon',
    /**
     * Class name of the off icon element
     */
    offIcon = 'p-rating-off-icon'
}

export interface RatingStyle extends BaseStyle {}
