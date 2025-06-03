import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/skeleton';
import { css } from '@primeuix/styled';
import { BaseStyle } from 'primeng/base';

const theme = css`
    ${style}

    /* For PrimeNG */
    .p-skeleton {
        display: block;
    }
`;

const inlineStyles = {
    root: { position: 'relative' }
};

const classes = {
    root: ({ instance }) => [
        'p-skeleton p-component',
        instance.styleClass,
        {
            'p-skeleton-circle': instance.shape === 'circle',
            'p-skeleton-animation-none': instance.animation === 'none'
        }
    ]
};

@Injectable()
export class SkeletonStyle extends BaseStyle {
    name = 'skeleton';

    theme = theme;

    classes = classes;

    inlineStyles = inlineStyles;
}

/**
 *
 * Skeleton is a placeholder to display instead of the actual content.
 *
 * [Live Demo](https://www.primeng.org/skeleton/)
 *
 * @module skeletonstyle
 *
 */
export enum SkeletonClasses {
    /**
     * Class name of the root element
     */
    root = 'p-skeleton'
}

export interface SkeletonStyle extends BaseStyle {}
