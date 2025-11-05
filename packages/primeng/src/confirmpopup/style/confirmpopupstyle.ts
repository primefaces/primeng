import { Injectable } from '@angular/core';
import { style as confirmpopup_style } from '@primeuix/styles/confirmpopup';
import { BaseStyle } from 'primeng/base';
const style = /*css*/ `
${confirmpopup_style}

/* Animations */

.p-confirmpopup-enter {
    animation: p-animate-confirmpopup-enter 120ms cubic-bezier(0, 0, 0.2, 1);
}

.p-confirmpopup-leave {
    animation: p-animate-confirmpopup-leave 100ms linear;
}

@keyframes p-animate-confirmpopup-enter {
    from {
        opacity: 0;
        transform: scaleY(0.8);
    }
}

@keyframes p-animate-confirmpopup-leave {
    to {
        opacity: 0;
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
