import { Injectable } from '@angular/core';
import { style as toast_style } from '@primeuix/styles/toast';
import { BaseStyle } from 'primeng/base';
const style = /*css*/ `
${toast_style}
/* Animations */
.p-toast-enter {
    animation: p-toast-enter-animation 450ms cubic-bezier(0, 1, 0, 1);
}

.p-toast-leave {
    animation: p-toast-leave-animation 250ms ease-out;
}

/* Bottom positions - slide down on leave */
.p-toast.p-toast-bottom-left .p-toast-message.p-toast-leave,
.p-toast.p-toast-bottom-right .p-toast-message.p-toast-leave,
.p-toast.p-toast-bottom-center .p-toast-message.p-toast-leave {
    animation: p-toast-leave-bottom-animation 250ms ease-out;
}

@keyframes p-toast-enter-animation {
    from {
        opacity: 0;
        transform: translateY(100%);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes p-toast-leave-animation {
    from {
        max-height: 1000px;
        opacity: 1;
    }
    to {
        max-height: 0;
        opacity: 0;
        margin-bottom: 0;
        overflow: hidden;
        transform: translateY(-100%);
    }
}

@keyframes p-toast-leave-bottom-animation {
    from {
        max-height: 1000px;
        opacity: 1;
    }
    to {
        max-height: 0;
        opacity: 0;
        margin-bottom: 0;
        overflow: hidden;
        transform: translateY(100%);
    }
}
`;
// Position
const inlineStyles = {
    root: ({ instance }) => {
        const { _position } = instance;

        return {
            position: 'fixed',
            top: _position === 'top-right' || _position === 'top-left' || _position === 'top-center' ? '20px' : _position === 'center' ? '50%' : null,
            right: (_position === 'top-right' || _position === 'bottom-right') && '20px',
            bottom: (_position === 'bottom-left' || _position === 'bottom-right' || _position === 'bottom-center') && '20px',
            left: _position === 'top-left' || _position === 'bottom-left' ? '20px' : _position === 'center' || _position === 'top-center' || _position === 'bottom-center' ? '50%' : null
        };
    }
};

const classes = {
    root: ({ instance }) => ['p-toast p-component', `p-toast-${instance._position}`],

    message: ({ instance }) => ({
        'p-toast-message': true,
        'p-toast-message-info': instance.message.severity === 'info' || instance.message.severity === undefined,
        'p-toast-message-warn': instance.message.severity === 'warn',
        'p-toast-message-error': instance.message.severity === 'error',
        'p-toast-message-success': instance.message.severity === 'success',
        'p-toast-message-secondary': instance.message.severity === 'secondary',
        'p-toast-message-contrast': instance.message.severity === 'contrast'
    }),
    messageContent: 'p-toast-message-content',
    messageIcon: ({ instance }) => ({
        'p-toast-message-icon': true,
        [`pi ${instance.message.icon}`]: !!instance.message.icon
    }),
    messageText: 'p-toast-message-text',
    summary: 'p-toast-summary',
    detail: 'p-toast-detail',
    closeButton: 'p-toast-close-button',
    closeIcon: ({ instance }) => ({
        'p-toast-close-icon': true,
        [`pi ${instance.message.closeIcon}`]: !!instance.message.closeIcon
    })
};

@Injectable()
export class ToastStyle extends BaseStyle {
    name = 'toast';

    style = style;

    classes = classes;

    inlineStyles = inlineStyles;
}

/**
 *
 * Toast is used to display messages in an overlay.
 *
 * [Live Demo](https://www.primeng.org/toast/)
 *
 * @module toaststyle
 *
 */
export enum ToastClasses {
    /**
     * Class name of the root element
     */
    root = 'p-toast',
    /**
     * Class name of the message element
     */
    message = 'p-toast-message',
    /**
     * Class name of the message content element
     */
    messageContent = 'p-toast-message-content',
    /**
     * Class name of the message icon element
     */
    messageIcon = 'p-toast-message-icon',
    /**
     * Class name of the message text element
     */
    messageText = 'p-toast-message-text',
    /**
     * Class name of the summary element
     */
    summary = 'p-toast-summary',
    /**
     * Class name of the detail element
     */
    detail = 'p-toast-detail',
    /**
     * Class name of the close button element
     */
    closeButton = 'p-toast-close-button',
    /**
     * Class name of the close icon element
     */
    closeIcon = 'p-toast-close-icon'
}

export interface ToastStyle extends BaseStyle {}
