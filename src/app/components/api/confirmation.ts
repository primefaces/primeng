import { EventEmitter } from '@angular/core';

export type ConfirmationDefaultFocus = 'accept' | 'reject' | 'close' | 'none';

export interface Confirmation {
    message?: string;
    key?: string;
    icon?: string;
    header?: string;
    accept?: Function;
    reject?: Function;
    acceptLabel?: string;
    rejectLabel?: string;
    acceptIcon?: string;
    rejectIcon?: string;
    acceptVisible?: boolean;
    rejectVisible?: boolean;
    blockScroll?: boolean;
    closeOnEscape?: boolean;
    dismissableMask?: boolean;
    defaultFocus?: ConfirmationDefaultFocus;
    acceptButtonStyleClass?: string;
    rejectButtonStyleClass?: string;
    target?: EventTarget;
    acceptEvent?: EventEmitter<any>;
    rejectEvent?: EventEmitter<any>;
}
