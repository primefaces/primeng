import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-rating {
    position: relative;
    display: flex;
    align-items: center;
    gap: ${dt('rating.gap')};
}

.p-rating-option {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    outline-color: transparent;
    border-radius: 50%;
    transition: background ${dt('rating.transition.duration')}, color ${dt('rating.transition.duration')}, border-color ${dt('rating.transition.duration')}, outline-color ${dt('rating.transition.duration')}, box-shadow ${dt(
        'rating.transition.duration'
    )};
}

.p-rating-option.p-focus-visible {
    box-shadow: ${dt('rating.focus.ring.shadow')};
    outline: ${dt('rating.focus.ring.width')} ${dt('rating.focus.ring.style')} ${dt('rating.focus.ring.color')};
    outline-offset: ${dt('rating.focus.ring.offset')};
}

.p-rating-icon {
    color: ${dt('rating.icon.color')};
    transition: background ${dt('rating.transition.duration')}, color ${dt('rating.transition.duration')}, border-color ${dt('rating.transition.duration')}, outline-color ${dt('rating.transition.duration')}, box-shadow ${dt(
        'rating.transition.duration'
    )};
    font-size: ${dt('rating.icon.size')};
    width: ${dt('rating.icon.size')};
    height: ${dt('rating.icon.size')};
}

.p-rating:not(.p-disabled):not(.p-readonly) .p-rating-option:hover .p-rating-icon {
    color: ${dt('rating.icon.hover.color')};
}

.p-rating-option-active .p-rating-icon {
    color: ${dt('rating.icon.active.color')};
}

/* For PrimeNG */
p-rating.ng-invalid.ng-dirty > .p-rating > .p-rating-icon {
    stroke: ${dt('rating.invalid.icon.color')};
}`;

const classes = {
    root: ({ props }) => [
        'p-rating',
        {
            'p-readonly': props.readonly,
            'p-disabled': props.disabled
        }
    ],
    option: ({ instance, props, value }) => [
        'p-rating-option',
        {
            'p-rating-option-active': value <= props.modelValue,
            'p-focus-visible': value === instance.focusedOptionIndex && instance.isFocusVisibleItem
        }
    ],
    onIcon: 'p-rating-icon p-rating-on-icon',
    offIcon: 'p-rating-icon p-rating-off-icon'
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
