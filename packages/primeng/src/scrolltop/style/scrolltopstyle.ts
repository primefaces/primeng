import { Injectable } from '@angular/core';
import { style as scrolltop_style } from '@primeuix/styles/scrolltop';
import { BaseStyle } from 'primeng/base';

const style = /*css*/ `
${scrolltop_style}

/* Animations */
.p-scrolltop-enter {
    animation: p-animate-scrolltop-enter 300ms cubic-bezier(.19,1,.22,1);
}

.p-scrolltop-leave {
    animation: p-animate-scrolltop-leave 300ms cubic-bezier(.19,1,.22,1);
}

@keyframes p-animate-scrolltop-enter {
    from {
        opacity: 0;
        transform: scale(0.93);
    }
}

@keyframes p-animate-scrolltop-leave {
    from {
        opacity: 0;
        transform: scale(0.93);
    }
}
`;
const classes = {
    root: ({ instance }) => ['p-scrolltop', { 'p-scrolltop-sticky': instance.target !== 'window' }],
    icon: 'p-scrolltop-icon'
};

@Injectable()
export class ScrollTopStyle extends BaseStyle {
    name = 'scrolltop';

    style = style;

    classes = classes;
}

/**
 *
 * ScrollTop gets displayed after a certain scroll position and used to navigates to the top of the page quickly.
 *
 * [Live Demo](https://www.primeng.org/scrolltop/)
 *
 * @module scrolltopstyle
 *
 */
export enum ScrollTopClasses {
    /**
     * Class name of the root element
     */
    root = 'p-scrolltop',
    /**
     * Class name of the icon element
     */
    icon = 'p-scrolltop-icon'
}

export interface ScrollTopStyle extends BaseStyle {}
