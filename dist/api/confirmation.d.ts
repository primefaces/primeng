import { EventEmitter } from '@angular/core';
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
    defaultFocus?: string;
    acceptButtonStyleClass?: string;
    rejectButtonStyleClass?: string;
    target?: EventTarget;
    acceptEvent?: EventEmitter<any>;
    rejectEvent?: EventEmitter<any>;
}
