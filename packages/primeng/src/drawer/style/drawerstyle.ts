import { Injectable } from '@angular/core';
import { style as drawer_style } from '@primeuix/styles/drawer';
import { BaseStyle } from 'primeng/base';

const style = /*css*/ `
${drawer_style}

/** For PrimeNG **/
.p-drawer {
    position: fixed;
    display: flex;
    flex-direction: column;
}

.p-drawer-left {
    top: 0;
    left: 0;
    width: 20rem;
    height: 100%;
}

.p-drawer-right {
    top: 0;
    right: 0;
    width: 20rem;
    height: 100%;
}

.p-drawer-top {
    top: 0;
    left: 0;
    width: 100%;
    height: 10rem;
}

.p-drawer-bottom {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 10rem;
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
.p-overlay-mask-enter {
    animation: p-overlay-mask-enter-animation 150ms forwards;
}

.p-overlay-mask-leave {
    animation: p-overlay-mask-leave-animation 150ms forwards;
}

.p-drawer-enter-left {
    animation: p-animate-drawer-enter-left 100ms linear;
}

.p-drawer-leave-left {
    animation: p-animate-drawer-leave-left 100ms linear;
}

.p-drawer-enter-right {
    animation: p-animate-drawer-enter-right 100ms linear;
}

.p-drawer-leave-right {
    animation: p-animate-drawer-leave-right 100ms linear;
}

.p-drawer-enter-top {
    animation: p-animate-drawer-enter-top 100ms linear;
}

.p-drawer-leave-top {
    animation: p-animate-drawer-leave-top 100ms linear;
}

.p-drawer-enter-bottom {
    animation: p-animate-drawer-enter-bottom 100ms linear;
}

.p-drawer-leave-bottom {
    animation: p-animate-drawer-leave-bottom 100ms linear;
}

.p-drawer-enter-full {
    animation: p-animate-drawer-enter-full 100ms linear;
}

.p-drawer-leave-full {
    animation: p-animate-drawer-leave-full 100ms linear;
}

/***** Mask Animations *****/

@keyframes p-overlay-mask-enter-animation {
    from {
        background-color: transparent;
    }
    to {
        background-color: rgba(0, 0, 0, 0.4);
    }
}

@keyframes p-overlay-mask-leave-animation {
    from {
        background-color: rgba(0, 0, 0, 0.4);
    }
    to {
        background-color: transparent;
    }
}
/***** Drawer Animations *****/

@keyframes p-animate-drawer-enter-left {
    from {
        transform: translate3d(-100%, 0px, 0px);
        opacity: 0;
    }
    to {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
}

@keyframes p-animate-drawer-leave-left {
    from {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
    to {
        transform: translate3d(-100%, 0px, 0px);
        opacity: 0;
    }
}

@keyframes p-animate-drawer-enter-right {
    from {
        transform: translate3d(100%, 0px, 0px);
        opacity: 0;
    }
    to {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
}

@keyframes p-animate-drawer-leave-right {
    from {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
    to {
        transform: translate3d(100%, 0px, 0px);
        opacity: 0;
    }
}

@keyframes p-animate-drawer-enter-top {
    from {
        transform: translate3d(0px, -100%, 0px);
        opacity: 0;
    }
    to {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
}

@keyframes p-animate-drawer-leave-top {
    from {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
    to {
        transform: translate3d(0px, -100%, 0px);
        opacity: 0;
    }
}

@keyframes p-animate-drawer-enter-bottom {
    from {
        transform: translate3d(0px, 100%, 0px);
        opacity: 0;
    }
    to {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
}

@keyframes p-animate-drawer-leave-bottom {
    from {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
    to {
        transform: translate3d(0px, 100%, 0px);
        opacity: 0;
    }
}

@keyframes p-animate-drawer-enter-full {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes p-animate-drawer-leave-full {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
`;

const classes = {
    mask: ({ instance }) => ['p-drawer-mask', { 'p-overlay-mask p-overlay-mask-enter': instance.modal }, { 'p-drawer-full': instance.fullScreen() }],
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
