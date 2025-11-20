import { Injectable } from '@angular/core';
import { style as dialog_style } from '@primeuix/styles/dialog';
import { BaseStyle } from 'primeng/base';
const style = /*css*/ `
${dialog_style}
/* Animations */
.p-dialog-enter-active {
    animation: p-animate-dialog-enter 300ms cubic-bezier(.19,1,.22,1);
}

.p-dialog-leave-active {
    animation: p-animate-dialog-leave 300ms cubic-bezier(.19,1,.22,1);
}

@keyframes p-animate-dialog-enter {
    from {
        opacity: 0;
        transform: scale(0.93);
    }
}

@keyframes p-animate-dialog-leave {
    to {
        opacity: 0;
        transform: scale(0.93);
    }
}
`;
/* Position */
const inlineStyles = {
    mask: ({ instance }) => ({
        position: 'fixed',
        height: '100%',
        width: '100%',
        left: 0,
        top: 0,
        display: 'flex',
        justifyContent:
            instance.position === 'left' || instance.position === 'topleft' || instance.position === 'bottomleft'
                ? 'flex-start'
                : instance.position === 'right' || instance.position === 'topright' || instance.position === 'bottomright'
                  ? 'flex-end'
                  : 'center',
        alignItems:
            instance.position === 'top' || instance.position === 'topleft' || instance.position === 'topright'
                ? 'flex-start'
                : instance.position === 'bottom' || instance.position === 'bottomleft' || instance.position === 'bottomright'
                  ? 'flex-end'
                  : 'center',
        pointerEvents: instance.modal ? 'auto' : 'none'
    }),
    root: {
        display: 'flex',
        flexDirection: 'column',
        pointerEvents: 'auto'
    }
};

const classes = {
    mask: ({ instance }) => {
        const positions = ['left', 'right', 'top', 'topleft', 'topright', 'bottom', 'bottomleft', 'bottomright'];
        const pos = positions.find((item) => item === instance.position);

        return ['p-dialog-mask', { 'p-overlay-mask': instance.modal }, pos ? `p-dialog-${pos}` : ''];
    },
    root: ({ instance }) => [
        'p-dialog p-component',
        {
            'p-dialog-maximized': instance.maximizable && instance.maximized
        }
    ],
    header: 'p-dialog-header',
    title: 'p-dialog-title',
    resizeHandle: 'p-resizable-handle',
    headerActions: 'p-dialog-header-actions',
    pcMaximizeButton: 'p-dialog-maximize-button',
    pcCloseButton: 'p-dialog-close-button',
    content: () => ['p-dialog-content'],
    footer: 'p-dialog-footer'
};

@Injectable()
export class DialogStyle extends BaseStyle {
    name = 'dialog';

    style = style;

    classes = classes;

    inlineStyles = inlineStyles;
}

/**
 *
 * Dialog is a container to display content in an overlay window.
 *
 * [Live Demo](https://www.primeng.org/dialog)
 *
 * @module dialogstyle
 *
 */
export enum DialogClasses {
    /**
     * Class name of the mask element
     */
    mask = 'p-dialog-mask',
    /**
     * Class name of the root element
     */
    root = 'p-dialog',
    /**
     * Class name of the header element
     */
    header = 'p-dialog-header',
    /**
     * Class name of the title element
     */
    title = 'p-dialog-title',
    /**
     * Class name of the header actions element
     */
    headerActions = 'p-dialog-header-actions',
    /**
     * Class name of the maximize button element
     */
    pcMaximizeButton = 'p-dialog-maximize-button',
    /**
     * Class name of the close button element
     */
    pcCloseButton = 'p-dialog-close-button',
    /**
     * Class name of the content element
     */
    content = 'p-dialog-content',
    /**
     * Class name of the footer element
     */
    footer = 'p-dialog-footer'
}

export interface DialogStyle extends BaseStyle {}
