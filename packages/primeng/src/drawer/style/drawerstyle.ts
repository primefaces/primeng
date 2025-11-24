import { Injectable } from '@angular/core';
import { style as drawer_style } from '@primeuix/styles/drawer';
import { BaseStyle } from 'primeng/base';

const style = /*css*/ `
${drawer_style}

/** For PrimeNG **/
.p-drawer {
    position: fixed;
}

.p-drawer-left {
    top: 0;
    left: 0;
    width: 20rem;
    height: 100%;
    border-inline-end-width: 1px;
}

.p-drawer-right {
    top: 0;
    right: 0;
    width: 20rem;
    height: 100%;
    border-inline-start-width: 1px;
}

.p-drawer-top {
    top: 0;
    left: 0;
    width: 100%;
    height: 10rem;
    border-block-end-width: 1px;
}

.p-drawer-bottom {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 10rem;
    border-block-start-width: 1px;
}

.p-drawer-full {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    -webkit-transition: none;
    transition: none;
}

/* Animations */
.p-drawer-enter-left {
    animation: p-animate-drawer-enter-left 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-leave-left {
    animation: p-animate-drawer-leave-left 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-enter-right {
    animation: p-animate-drawer-enter-right 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-leave-right {
    animation: p-animate-drawer-leave-right 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-enter-top {
    animation: p-animate-drawer-enter-top 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-leave-top {
    animation: p-animate-drawer-leave-top 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-enter-bottom {
    animation: p-animate-drawer-enter-bottom 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-leave-bottom {
    animation: p-animate-drawer-leave-bottom 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-enter-full {
    animation: p-animate-drawer-enter-full 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-leave-full {
    animation: p-animate-drawer-leave-full 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}
`;

const classes = {
    mask: ({ instance }) => ['p-drawer-mask', { [`p-overlay-mask p-overlay-mask-enter`]: instance.modal }, { 'p-drawer-full': instance.fullScreen() }],
    root: ({ instance }) => [
        'p-drawer p-component',
        {
            'p-drawer-full': instance.fullScreen(),
            'p-drawer-open': instance.visible
        },
        `p-drawer-${instance.position()}`
    ],
    header: 'p-drawer-header',
    title: 'p-drawer-title',
    pcCloseButton: 'p-drawer-close-button',
    content: 'p-drawer-content',
    footer: 'p-drawer-footer'
};

@Injectable()
export class DrawerStyle extends BaseStyle {
    name = 'drawer';

    style = style;

    classes = classes;
}

/**
 *
 * Drawer is a panel component displayed as an overlay at the edges of the screen.
 *
 * [Live Demo](https://www.primeng.org/drawer)
 *
 * @module drawerstyle
 *
 */
export enum DrawerClasses {
    /**
     * Class name of the mask element
     */
    mask = 'p-drawer-mask',
    /**
     * Class name of the root element
     */
    root = 'p-drawer',
    /**
     * Class name of the header element
     */
    header = 'p-drawer-header',
    /**
     * Class name of the title element
     */
    title = 'p-drawer-title',
    /**
     * Class name of the close button element
     */
    pcCloseButton = 'p-drawer-close-button',
    /**
     * Class name of the content element
     */
    content = 'p-drawer-content'
}

export interface DrawerStyle extends BaseStyle {}
