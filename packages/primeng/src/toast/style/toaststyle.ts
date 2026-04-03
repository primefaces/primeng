import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/toast';
import { BaseStyle } from 'primeng/base';

const stackStyle = `
    /* pMotion enter */
    .p-toast-stack-enter-from {
        opacity: 0;
        transform: translateY(calc(100% * var(--raise-factor) * -1));
    }

    .p-toast-stack-enter-active {
        transition: transform 0.3s, opacity 0.3s;
    }

    .p-toast-stack-enter-to {
        opacity: 1;
        transform: translateY(0);
    }
    
    .p-toast-stacked .p-toast-message[data-stack][data-mounted].p-toast-stack-leave-to {
        opacity: 0;
        transform: translateY(calc(var(--raise-factor) * -100%));
    }

    .p-toast-stacked .p-toast-message[data-stack] {
        position: absolute;
        width: 100%;
        margin: 0;
        opacity: 0;
        transform: translateY(calc(100% * var(--raise-factor) * -1));
    }

    /* After mount: stacking visuals + transition for repositioning */
    .p-toast-stacked .p-toast-message[data-stack][data-mounted] {
        opacity: 1;
        transform: translateY(0);
        transition: transform 0.3s, opacity 0.3s, height 0.3s;
    }

    .p-toast-stacked .p-toast-message[data-stack][data-mounted]:not([data-expanded]):not([data-front]) {
        overflow: hidden;
        height: var(--front-toast-height);
        transform: translateY(calc(var(--raise-factor) * var(--toast-index) * var(--gap))) scale(calc(var(--toast-index) * -0.05 + 1));
    }

    .p-toast-stacked .p-toast-message[data-stack][data-mounted][data-expanded] {
        height: var(--initial-height);
        transform: translateY(calc((var(--toast-offset) + var(--toast-index) * var(--gap)) * var(--raise-factor)));
    }

    .p-toast-stacked .p-toast-message[data-stack][data-expanded]::after {
        content: "";
        position: absolute;
        left: 0;
        height: calc(var(--gap) + 1px);
        width: 100%;
        bottom: 100%;
    }

    /* Position anchoring */
    .p-toast-top-right.p-toast-stacked .p-toast-message[data-stack],
    .p-toast-top-center.p-toast-stacked .p-toast-message[data-stack],
    .p-toast-top-left.p-toast-stacked .p-toast-message[data-stack] {
        top: 0;
    }

    .p-toast-bottom-right.p-toast-stacked .p-toast-message[data-stack],
    .p-toast-bottom-center.p-toast-stacked .p-toast-message[data-stack],
    .p-toast-bottom-left.p-toast-stacked .p-toast-message[data-stack] {
        bottom: 0;
    }

    /* Non-visible toasts */
    .p-toast-stacked .p-toast-message[data-stack]:not([data-visible]):not(.p-toast-stack-leave-active) {
        opacity: 0;
        pointer-events: none;
    }
`;

// Position
const inlineStyles = {
    root: ({ instance }) => {
        const position = instance.position();

        return {
            position: 'fixed',
            top: position === 'top-right' || position === 'top-left' || position === 'top-center' ? '20px' : position === 'center' ? '50%' : null,
            right: (position === 'top-right' || position === 'bottom-right') && '20px',
            bottom: (position === 'bottom-left' || position === 'bottom-right' || position === 'bottom-center') && '20px',
            left: position === 'top-left' || position === 'bottom-left' ? '20px' : position === 'center' || position === 'top-center' || position === 'bottom-center' ? '50%' : null
        };
    }
};

const classes = {
    root: ({ instance }) => ['p-toast p-component', `p-toast-${instance.position()}`, { 'p-toast-stacked': instance.mode() === 'stack' }],

    message: ({ instance }) => ({
        'p-toast-message': true,
        'p-toast-message-info': instance.message().severity === 'info' || instance.message().severity === undefined,
        'p-toast-message-warn': instance.message().severity === 'warn',
        'p-toast-message-error': instance.message().severity === 'error',
        'p-toast-message-success': instance.message().severity === 'success',
        'p-toast-message-secondary': instance.message().severity === 'secondary',
        'p-toast-message-contrast': instance.message().severity === 'contrast'
    }),
    messageContent: 'p-toast-message-content',
    messageIcon: ({ instance }) => ({
        'p-toast-message-icon': true,
        [`pi ${instance.message().icon}`]: !!instance.message().icon
    }),
    messageText: 'p-toast-message-text',
    summary: 'p-toast-summary',
    detail: 'p-toast-detail',
    closeButton: 'p-toast-close-button',
    closeIcon: ({ instance }) => ({
        'p-toast-close-icon': true,
        [`pi ${instance.message().closeIcon}`]: !!instance.message().closeIcon
    })
};

@Injectable()
export class ToastStyle extends BaseStyle {
    name = 'toast';

    style = style + stackStyle;

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
