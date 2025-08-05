import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/badge';
import { isEmpty, isNotEmpty } from '@primeuix/utils';
import { BaseStyle } from 'primeng/base';

const theme = /*css*/ `
    ${style}

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
    root: ({ instance }) => [
        'p-badge p-component',
        {
            'p-badge-circle': isNotEmpty(instance.value()) && String(instance.value()).length === 1,
            'p-badge-dot': isEmpty(instance.value()),
            'p-badge-sm': instance.size() === 'small' || instance.badgeSize() === 'small',
            'p-badge-lg': instance.size() === 'large' || instance.badgeSize() === 'large',
            'p-badge-xl': instance.size() === 'xlarge' || instance.badgeSize() === 'xlarge',
            'p-badge-info': instance.severity() === 'info',
            'p-badge-success': instance.severity() === 'success',
            'p-badge-warn': instance.severity() === 'warn',
            'p-badge-danger': instance.severity() === 'danger',
            'p-badge-secondary': instance.severity() === 'secondary',
            'p-badge-contrast': instance.severity() === 'contrast'
        }
    ]
};

@Injectable()
export class BadgeStyle extends BaseStyle {
    name = 'badge';

    theme = theme;

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
