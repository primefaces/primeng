import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-skeleton {
    overflow: hidden;
    background: ${dt('skeleton.background')};
    border-radius: ${dt('skeleton.border.radius')};
}

.p-skeleton::after {
    content: "";
    animation: p-skeleton-animation 1.2s infinite;
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(-100%);
    z-index: 1;
    background: linear-gradient( 90deg, rgba(255, 255, 255, 0), ${dt('skeleton.animation.background')}, rgba(255, 255, 255, 0) );
}

.p-skeleton-circle {
    border-radius: 50%;
}

.p-skeleton-animation-none::after {
    animation: none;
}

@keyframes p-skeleton-animation {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(100%);
    }
}
`;

const inlineStyles = {
    root: { position: 'relative' }
};

const classes = {
    root: ({ props }) => [
        'p-skeleton p-component',
        {
            'p-skeleton-circle': props.shape === 'circle',
            'p-skeleton-animation-none': props.animation === 'none'
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
