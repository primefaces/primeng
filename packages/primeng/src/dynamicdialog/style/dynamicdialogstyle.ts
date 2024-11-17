import { Injectable } from '@angular/core';
import { DialogStyle } from 'primeng/dialog';

@Injectable()
export class DynamicDialogStyle extends DialogStyle {
    name = 'dialog';
}

/**
 *
 * DynamicDialog is a container to display content in an overlay window.
 *
 * [Live Demo](https://www.primeng.org/dynamicdialog)
 *
 * @module dynamicdialogstyle
 *
 */
export enum DynamicDialogClasses {
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

export interface DynamicDialogStyle {}
