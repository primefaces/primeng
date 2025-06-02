import { Injectable } from '@angular/core';
import { css } from '@primeuix/styled';
import { style } from '@primeuix/styles/scrolltop';
import { BaseStyle } from 'primeng/base';

const theme = css`
    ${style}

    /* For PrimeNG */
    .p-scrolltop-sticky.p-link {
        margin-left: auto;
    }
`;

const classes = {
    root: ({ instance }) => ['p-scrolltop', instance.styleClass, { 'p-scrolltop-sticky': instance.target !== 'window' }],
    icon: 'p-scrolltop-icon'
};

@Injectable()
export class ScrollTopStyle extends BaseStyle {
    name = 'scrolltop';

    theme = theme;

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
