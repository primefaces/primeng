import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/message';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: ({ instance }) => ['p-message p-component p-message-' + instance.severity, 'p-message-' + instance.variant, { 'p-message-sm': instance.size === 'small', 'p-message-lg': instance.size === 'large' }],
    content: 'p-message-content',
    icon: 'p-message-icon',
    text: 'p-message-text',
    closeButton: 'p-message-close-button',
    closeIcon: 'p-message-close-icon'
};

@Injectable()
export class MessageStyle extends BaseStyle {
    name = 'message';

    theme = style;

    classes = classes;
}

/**
 *
 * Message groups a collection of contents in tabs.
 *
 * [Live Demo](https://www.primeng.org/message/)
 *
 * @module messagestyle
 *
 */

export enum MessageClasses {
    /**
     * Class name of the root element
     */
    root = 'p-message',
    /**
     * Class name of the content element
     */
    content = 'p-message-content',
    /**
     * Class name of the icon element
     */
    icon = 'p-message-icon',
    /**
     * Class name of the text element
     */
    text = 'p-message-text',
    /**
     * Class name of the close button element
     */
    closeButton = 'p-message-close-button',
    /**
     * Class name of the close icon element
     */
    closeIcon = 'p-message-close-icon'
}

export interface MessageStyle extends BaseStyle {}
