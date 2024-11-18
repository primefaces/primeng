import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-messages {
    display: flex;
    flex-direction: column;
    position: relative;
    gap: ${dt('message.content.gap')};
}

.p-message {
    border-radius: ${dt('message.border.radius')};
    outline-width: ${dt('message.border.width')};
    outline-style: solid;
}

.p-message-content {
    display: flex;
    align-items: center;
    padding: ${dt('message.content.padding')};
    height: 100%;
}

.p-message .p-message-content:has(:nth-child(1)) {
    gap: ${dt('message.content.gap')};
}

.p-message-icon {
    flex-shrink: 0;
}

.p-message-close-button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin: 0 0 0 auto;
    overflow: hidden;
    position: relative;
    width: ${dt('message.close.button.width')};
    height: ${dt('message.close.button.height')};
    border-radius: ${dt('message.close.button.border.radius')};
    background: transparent;
    transition: background ${dt('message.transition.duration')}, color ${dt('message.transition.duration')}, outline-color ${dt('message.transition.duration')}, box-shadow ${dt('message.transition.duration')}, opacity 0.3s;
    outline-color: transparent;
    color: inherit;
    padding: 0;
    border: none;
    cursor: pointer;
    user-select: none;
}

.p-message-close-icon {
    font-size: ${dt('message.close.icon.size')};
    width: ${dt('message.close.icon.size')};
    height: ${dt('message.close.icon.size')};
}

.p-message-close-button:focus-visible {
    outline-width: ${dt('message.close.button.focus.ring.width')};
    outline-style: ${dt('message.close.button.focus.ring.style')};
    outline-offset: ${dt('message.close.button.focus.ring.offset')};
}

.p-message-info {
    background: ${dt('message.info.background')};
    outline-color: ${dt('message.info.border.color')};
    color: ${dt('message.info.color')};
    box-shadow: ${dt('message.info.shadow')};
}

.p-message-info .p-message-close-button:focus-visible {
    outline-color: ${dt('message.info.close.button.focus.ring.color')};
    box-shadow: ${dt('message.info.close.button.focus.ring.shadow')};
}

.p-message-info .p-message-close-button:hover {
    background: ${dt('message.info.close.button.hover.background')};
}

.p-message-success {
    background: ${dt('message.success.background')};
    outline-color: ${dt('message.success.border.color')};
    color: ${dt('message.success.color')};
    box-shadow: ${dt('message.success.shadow')};
}

.p-message-success .p-message-close-button:focus-visible {
    outline-color: ${dt('message.success.close.button.focus.ring.color')};
    box-shadow: ${dt('message.success.close.button.focus.ring.shadow')};
}

.p-message-success .p-message-close-button:hover {
    background: ${dt('message.success.close.button.hover.background')};
}

.p-message-warn {
    background: ${dt('message.warn.background')};
    outline-color: ${dt('message.warn.border.color')};
    color: ${dt('message.warn.color')};
    box-shadow: ${dt('message.warn.shadow')};
}

.p-message-warn .p-message-close-button:focus-visible {
    outline-color: ${dt('message.warn.close.button.focus.ring.color')};
    box-shadow: ${dt('message.warn.close.button.focus.ring.shadow')};
}

.p-message-warn .p-message-close-button:hover {
    background: ${dt('message.warn.close.button.hover.background')};
}

.p-message-error {
    background: ${dt('message.error.background')};
    outline-color: ${dt('message.error.border.color')};
    color: ${dt('message.error.color')};
    box-shadow: ${dt('message.error.shadow')};
}

.p-message-error .p-message-close-button:focus-visible {
    outline-color: ${dt('message.error.close.button.focus.ring.color')};
    box-shadow: ${dt('message.error.close.button.focus.ring.shadow')};
}

.p-message-error .p-message-close-button:hover {
    background: ${dt('message.error.close.button.hover.background')};
}

.p-message-secondary {
    background: ${dt('message.secondary.background')};
    outline-color: ${dt('message.secondary.border.color')};
    color: ${dt('message.secondary.color')};
    box-shadow: ${dt('message.secondary.shadow')};
}

.p-message-secondary .p-message-close-button:focus-visible {
    outline-color: ${dt('message.secondary.close.button.focus.ring.color')};
    box-shadow: ${dt('message.secondary.close.button.focus.ring.shadow')};
}

.p-message-secondary .p-message-close-button:hover {
    background: ${dt('message.secondary.close.button.hover.background')};
}

.p-message-contrast {
    background: ${dt('message.contrast.background')};
    outline-color: ${dt('message.contrast.border.color')};
    color: ${dt('message.contrast.color')};
    box-shadow: ${dt('message.contrast.shadow')};
}

.p-message-contrast .p-message-close-button:focus-visible {
    outline-color: ${dt('message.contrast.close.button.focus.ring.color')};
    box-shadow: ${dt('message.contrast.close.button.focus.ring.shadow')};
}

.p-message-contrast .p-message-close-button:hover {
    background: ${dt('message.contrast.close.button.hover.background')};
}

.p-message-text {
    font-size: ${dt('message.text.font.size')};
    font-weight: ${dt('message.text.font.weight')};
}

.p-message-icon {
    font-size: ${dt('message.icon.size')};
    width: ${dt('message.icon.size')};
    height: ${dt('message.icon.size')};
}

.p-message-enter-from {
    opacity: 0;
}

.p-message-enter-active {
    transition: opacity 0.3s;
}

.p-message.p-message-leave-from {
    max-height: 1000px;
}

.p-message.p-message-leave-to {
    max-height: 0;
    opacity: 0;
    margin: 0;
}

.p-message-leave-active {
    overflow: hidden;
    transition: max-height 0.45s cubic-bezier(0, 1, 0, 1), opacity 0.3s, margin 0.3s;
}

.p-message-leave-active .p-message-close-button {
    opacity: 0;
}
/* For PrimeNG */
.p-messages .p-message.ng-animating {
    overflow: hidden;
}

.p-message-content > p-button[data-pc-section="closebutton"] {
    margin-left: auto;
}
`;

const classes = {
    root: ({ instance }) => ({
        'p-message': true
    }),
    container: 'p-messages p-component',
    content: 'p-message-content',
    icon: 'p-message-icon',
    text: 'p-message-text',
    closeButton: 'p-message-close-button',
    closeIcon: 'p-message-close-icon'
};

@Injectable()
export class MessagesStyle extends BaseStyle {
    name = 'message';

    theme = theme;

    classes = classes;
}
