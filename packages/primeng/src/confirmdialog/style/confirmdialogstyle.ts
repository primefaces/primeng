import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';
import { style } from '@primeuix/styles/confirmdialog';

const classes = {
    root: 'p-confirmdialog',
    icon: 'p-confirmdialog-icon',
    message: 'p-confirmdialog-message',
    pcRejectButton: 'p-confirmdialog-reject-button',
    pcAcceptButton: 'p-confirmdialog-accept-button'
};

@Injectable()
export class ConfirmDialogStyle extends BaseStyle {
    name = 'confirmdialog';

    theme = style;

    classes = classes;
}

/**
 *
 * ConfirmDialog uses a Dialog UI with confirmDialog method or <ConfirmDialog> tag.
 *
 * [Live Demo](https://www.primeng.org/confirmdialog)
 *
 * @module confirmdialogstyle
 *
 */
export enum ConfirmDialogClasses {
    /**
     * Class name of the root element
     */
    root = 'p-confirmdialog',
    /**
     * Class name of the icon element
     */
    icon = 'p-confirmdialog-icon',
    /**
     * Class name of the message element
     */
    message = 'p-confirmdialog-message',
    /**
     * Class name of the reject button element
     */
    pcRejectButton = 'p-confirmdialog-reject-button',
    /**
     * Class name of the accept button element
     */
    pcAcceptButton = 'p-confirmdialog-accept-button'
}

export interface ConfirmDialogStyle extends BaseStyle {}
