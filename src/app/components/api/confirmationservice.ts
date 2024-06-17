import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Confirmation } from './confirmation';
/**
 * Methods used in confirmation service.
 * @group Service
 */
@Injectable()
export class ConfirmationService {
    private requireConfirmationSource = new Subject<Confirmation | null>();
    private acceptConfirmationSource = new Subject<Confirmation | null>();

    requireConfirmation$ = this.requireConfirmationSource.asObservable();
    accept = this.acceptConfirmationSource.asObservable();
    /**
     * Callback to invoke on confirm.
     * @param {Confirmation} confirmation - Represents a confirmation dialog configuration.
     * @group Method
     */
    confirm(confirmation: Confirmation) {
        this.requireConfirmationSource.next(confirmation);
        return this;
    }
    /**
     * Closes the dialog.
     * @group Method
     */
    close() {
        this.requireConfirmationSource.next(null);
        return this;
    }
    /**
     * Accepts the dialog.
     * @group Method
     */
    onAccept() {
        this.acceptConfirmationSource.next(null);
    }
}
