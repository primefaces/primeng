import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/confirmpopup';
import { BaseStyle } from 'primeng/base';

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

    theme = style;

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
