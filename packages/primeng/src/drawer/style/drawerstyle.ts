import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/drawer';
import { BaseStyle } from 'primeng/base';

const theme = /*css*/ `
    ${style}

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

    .p-overlay-mask-enter {
        animation: p-overlay-mask-enter-animation 150ms forwards;
    }

    .p-overlay-mask-leave {
        animation: p-overlay-mask-leave-animation 150ms forwards;
    }

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
`;

const classes = {
    mask: ({ instance }) => ['p-drawer-mask', { 'p-overlay-mask p-overlay-mask-enter': instance.modal }, { 'p-drawer-full': instance.fullScreen }],
    root: ({ instance }) => [
        'p-drawer p-component',
        {
            'p-drawer-full': instance.fullScreen,
            'p-drawer-open': instance.visible
        },
        `p-drawer-${instance.position}`
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

    theme = theme;

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
