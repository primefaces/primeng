import { EventEmitter } from '@angular/core';
import type { ButtonProps } from 'primeng/types/button';
import type { ConfirmDialogDefaultFocus } from 'primeng/types/confirmdialog';
import type { DialogPosition } from 'primeng/types/dialog';
import type { ConfirmEventType } from './confirmaeventtype';

/**
 * Represents a confirmation dialog configuration.
 * @group Interface
 */
export interface Confirmation {
    /**
     * The message to be displayed in the confirmation dialog.
     */
    message?: string;
    /**
     * A unique key to identify the confirmation dialog.
     */
    key?: string;
    /**
     * The name of the icon to be displayed in the confirmation dialog.
     */
    icon?: string;
    /**
     * The header text of the confirmation dialog.
     */
    header?: string;
    /**
     * The callback function to be executed when the accept button is clicked.
     */
    accept?: () => void;
    /**
     * The callback function to be executed when the reject button is clicked.
     */
    reject?: () => void;
    /**
     * The label text for the accept button.
     */
    acceptLabel?: string;
    /**
     * The label text for the reject button.
     */
    rejectLabel?: string;
    /**
     * The name of the icon to be displayed on the accept button.
     */
    acceptIcon?: string;
    /**
     * The name of the icon to be displayed on the reject button.
     */
    rejectIcon?: string;
    /**
     * Specifies whether the accept button should be visible.
     */
    acceptVisible?: boolean;
    /**
     * Specifies whether the reject button should be visible.
     */
    rejectVisible?: boolean;
    /**
     * Specifies whether to block scrolling on the page when the confirmation dialog is displayed.
     */
    blockScroll?: boolean;
    /**
     * Specifies whether the confirmation dialog should be closed when the escape key is pressed.
     */
    closeOnEscape?: boolean;
    /**
     * Specifies whether clicking outside the confirmation dialog should dismiss it.
     */
    dismissableMask?: boolean;
    /**
     * Element to receive the focus when the dialog gets visible.
     * @defaultValue 'accept'
     */
    defaultFocus?: ConfirmDialogDefaultFocus;
    /**
     * The CSS class name to be applied to the accept button.
     */
    acceptButtonStyleClass?: string;
    /**
     * The CSS class name to be applied to the reject button.
     */
    rejectButtonStyleClass?: string;
    /**
     * The target event where the confirmation dialog is triggered from.
     */
    target?: EventTarget;
    /**
     * An event emitter for the accept event.
     */
    acceptEvent?: EventEmitter<void>;
    /**
     * An event emitter for the reject event.
     */
    rejectEvent?: EventEmitter<ConfirmEventType>;
    /**
     * Accept button properties.
     */
    acceptButtonProps?: ButtonProps;
    /**
     * Reject button properties.
     */
    rejectButtonProps?: ButtonProps;
    /**
     * Close button properties.
     */
    closeButtonProps?: ButtonProps;
    /**
     * Defines if the dialog is closable.
     */
    closable?: boolean;
    /**
     * Defines the dialog position.
     */
    position?: DialogPosition;
    /**
     * Specifies whether the dialog displayed as modal or not.
     * @defaultValue true
     */
    modal?: boolean;
}
