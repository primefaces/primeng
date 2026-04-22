import { Injectable } from '@angular/core';
import { style as badge_style } from '@primeuix/styles/badge';
import { isEmpty, isNotEmpty } from '@primeuix/utils';
import { BaseStyle } from 'primeng/base';

const style = /*css*/ `
    ${badge_style}

    /* For PrimeNG (directive)*/
    .p-overlay-badge {
        position: relative;
    }

    .p-overlay-badge > .p-badge {
        position: absolute;
        top: 0;
        inset-inline-end: 0;
        transform: translate(50%, -50%);
        transform-origin: 100% 0;
        margin: 0;
    }
`;

const classes = {
    root: ({ instance }) => {
        const value = typeof instance.value === 'function' ? instance.value() : instance.value;
        const size = typeof instance.size === 'function' ? instance.size() : instance.size;
        const badgeSize = typeof instance.badgeSize === 'function' ? instance.badgeSize() : instance.badgeSize;
        const severity = typeof instance.severity === 'function' ? instance.severity() : instance.severity;

        return [
            'p-badge p-component',
            {
                'p-badge-circle': isNotEmpty(value) && String(value).length === 1,
                'p-badge-dot': isEmpty(value),
                'p-badge-sm': size === 'small' || badgeSize === 'small',
                'p-badge-lg': size === 'large' || badgeSize === 'large',
                'p-badge-xl': size === 'xlarge' || badgeSize === 'xlarge',
                'p-badge-info': severity === 'info',
                'p-badge-success': severity === 'success',
                'p-badge-warn': severity === 'warn',
                'p-badge-danger': severity === 'danger',
                'p-badge-secondary': severity === 'secondary',
                'p-badge-contrast': severity === 'contrast'
            }
        ];
    }
};

@Injectable()
export class BadgeStyle extends BaseStyle {
    name = 'badge';

    style = style;

    classes = classes;
}

/**
 *
 * Badge represents people using icons, labels and images.
 *
 * [Live Demo](https://www.primeng.org/badge)
 *
 * @module badgestyle
 *
 */
export enum BadgeClasses {
    /**
     * Class name of the root element
     */
    root = 'p-badge'
}

export interface BadgeStyle extends BaseStyle {}
