import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/ripple';
import { BaseStyle } from 'primeng/base';

const theme = /*css*/ `
    ${style}
    /* For PrimeNG */
    .p-ripple {
        overflow: hidden;
        position: relative;
    }

    .p-ripple-disabled .p-ink {
        display: none !important;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
`;

const classes = {
    root: 'p-ink'
};

@Injectable()
export class RippleStyle extends BaseStyle {
    name = 'ripple';

    theme = theme;

    classes = classes;
}

/**
 *
 * Ripple directive adds ripple effect to the host element.
 *
 * [Live Demo](https://www.primeng.org/ripple)
 *
 * @module ripplestyle
 *
 */

export enum RippleClasses {
    /**
     * Class name of the root element
     */
    root = 'p-ink'
}

export interface RippleStyle extends BaseStyle {}
