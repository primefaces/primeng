import { Injectable } from '@angular/core';
import { style as confirmpopup_style } from '@primeuix/styles/confirmpopup';
import { BaseStyle } from 'primeng/base';
const style = /*css*/ `
${confirmpopup_style}

/* Animations */

.p-confirm-popup-enter-active {
    animation: p-animate-confirmpopup-enter 300ms cubic-bezier(.19,1,.22,1);
}

.p-confirm-popup-leave-active {
    animation: p-animate-confirmpopup-leave 300ms cubic-bezier(.19,1,.22,1);
}

@keyframes p-animate-confirmpopup-enter {
    from {
        opacity: 0;
        transform: scale(0.93);
    }
}

@keyframes p-animate-confirmpopup-leave {
    to {
        opacity: 0;
        transform: scale(0.93);
    }
}
`;
const classes = {
    root: () => ['p-confirmpopup p-component'],
    content: 'p-confirmpopup-content',
    icon: ({ instance }) => ['p-confirmpopup-icon', instance.confirmation?.icon],
    message: 'p-confirmpopup-message',
    footer: 'p-confirmpopup-footer',
    pcRejectButton: 'p-confirmpopup-reject-button',
    pcAcceptButton: 'p-confirmpopup-accept-button'
};

@Injectable()
export class ConfirmPopupStyle extends BaseStyle {
    name = 'confirmpopup';

    style = style;

    classes = classes;
}

/**
 *
 * ConfirmPopup displays a confirmation overlay displayed relatively to its target.
 *
 * [Live Demo](https://www.primeng.org/confirmpopup)
 *
 * @module confirmpopupstyle
 *
 */
export enum ConfirmPopupClasses {
    /**
     * Class name of the root element
     */
    root = 'p-confirmpopup',
    /**
     * Class name of the content element
     */
    content = 'p-confirmpopup-content',
    /**
     * Class name of the icon element
     */
    icon = 'p-confirmpopup-icon',
    /**
     * Class name of the message element
     */
    message = 'p-confirmpopup-message',
    /**
     * Class name of the footer element
     */
    footer = 'p-confirmpopup-footer',
    /**
     * Class name of the reject button element
     */
    pcRejectButton = 'p-confirmpopup-reject-button',
    /**
     * Class name of the accept button element
     */
    pcAcceptButton = 'p-confirmpopup-accept-button'
}

export interface ConfirmPopupStyle extends BaseStyle {}
