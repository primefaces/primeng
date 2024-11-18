import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-dialog {
    max-height: 90%;
    transform: scale(1);
    border-radius: ${dt('dialog.border.radius')};
    box-shadow: ${dt('dialog.shadow')};
    background: ${dt('dialog.background')};
    border: 1px solid ${dt('dialog.border.color')};
    color: ${dt('dialog.color')};
    display: flex;
    flex-direction: column;
    pointer-events: auto
}

.p-dialog-content {
    overflow-y: auto;
    padding: ${dt('dialog.content.padding')};
}

.p-dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    padding: ${dt('dialog.header.padding')};
}

.p-dialog-title {
    font-weight: ${dt('dialog.title.font.weight')};
    font-size: ${dt('dialog.title.font.size')};
}

.p-dialog-footer {
    flex-shrink: 0;
    padding: ${dt('dialog.footer.padding')};
    display: flex;
    justify-content: flex-end;
    gap: ${dt('dialog.footer.gap')};
}

.p-dialog-header-actions {
    display: flex;
    align-items: center;
    gap: ${dt('dialog.header.gap')};
}

.p-dialog-enter-active {
    transition: all 150ms cubic-bezier(0, 0, 0.2, 1);
}

.p-dialog-leave-active {
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.p-dialog-enter-from,
.p-dialog-leave-to {
    opacity: 0;
    transform: scale(0.7);
}

.p-dialog-top .p-dialog,
.p-dialog-bottom .p-dialog,
.p-dialog-left .p-dialog,
.p-dialog-right .p-dialog,
.p-dialog-topleft .p-dialog,
.p-dialog-topright .p-dialog,
.p-dialog-bottomleft .p-dialog,
.p-dialog-bottomright .p-dialog {
    margin: 0.75rem;
    transform: translate3d(0px, 0px, 0px);
}

.p-dialog-top .p-dialog-enter-active,
.p-dialog-top .p-dialog-leave-active,
.p-dialog-bottom .p-dialog-enter-active,
.p-dialog-bottom .p-dialog-leave-active,
.p-dialog-left .p-dialog-enter-active,
.p-dialog-left .p-dialog-leave-active,
.p-dialog-right .p-dialog-enter-active,
.p-dialog-right .p-dialog-leave-active,
.p-dialog-topleft .p-dialog-enter-active,
.p-dialog-topleft .p-dialog-leave-active,
.p-dialog-topright .p-dialog-enter-active,
.p-dialog-topright .p-dialog-leave-active,
.p-dialog-bottomleft .p-dialog-enter-active,
.p-dialog-bottomleft .p-dialog-leave-active,
.p-dialog-bottomright .p-dialog-enter-active,
.p-dialog-bottomright .p-dialog-leave-active {
    transition: all 0.3s ease-out;
}

.p-dialog-top .p-dialog-enter-from,
.p-dialog-top .p-dialog-leave-to {
    transform: translate3d(0px, -100%, 0px);
}

.p-dialog-bottom .p-dialog-enter-from,
.p-dialog-bottom .p-dialog-leave-to {
    transform: translate3d(0px, 100%, 0px);
}

.p-dialog-left .p-dialog-enter-from,
.p-dialog-left .p-dialog-leave-to,
.p-dialog-topleft .p-dialog-enter-from,
.p-dialog-topleft .p-dialog-leave-to,
.p-dialog-bottomleft .p-dialog-enter-from,
.p-dialog-bottomleft .p-dialog-leave-to {
    transform: translate3d(-100%, 0px, 0px);
}

.p-dialog-right .p-dialog-enter-from,
.p-dialog-right .p-dialog-leave-to,
.p-dialog-topright .p-dialog-enter-from,
.p-dialog-topright .p-dialog-leave-to,
.p-dialog-bottomright .p-dialog-enter-from,
.p-dialog-bottomright .p-dialog-leave-to {
    transform: translate3d(100%, 0px, 0px);
}

.p-dialog-maximized {
    width: 100vw !important;
    height: 100vh !important;
    top: 0px !important;
    left: 0px !important;
    max-height: 100%;
    height: 100%;
    border-radius: 0;
}

.p-dialog-maximized .p-dialog-content {
    flex-grow: 1;
}


/* For PrimeNG */

.p-dialog .p-resizable-handle {
    position: absolute;
    font-size: 0.1px;
    display: block;
    cursor: se-resize;
    width: 12px;
    height: 12px;
    right: 1px;
    bottom: 1px;
}

.p-confirm-dialog .p-dialog-content {
    display: flex;
    align-items: center;
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

        return {
            'p-dialog-mask': true,
            'p-overlay-mask p-overlay-mask-enter': instance.modal,
            [`p-dialog-${pos}`]: pos
        };
    },
    root: ({ instance }) => ({ 'p-dialog p-component': true, 'p-dialog-maximized': instance.maximizable && instance.maximized }),
    header: 'p-dialog-header',
    title: 'p-dialog-title',
    resizeHandle: 'p-resizable-handle',
    headerActions: 'p-dialog-header-actions',
    pcMaximizeButton: 'p-dialog-maximize-button',
    pcCloseButton: 'p-dialog-close-button',
    content: 'p-dialog-content',
    footer: 'p-dialog-footer'
};

@Injectable()
export class DialogStyle extends BaseStyle {
    name = 'dialog';

    theme = theme;

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
