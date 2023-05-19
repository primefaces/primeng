import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Confirmation } from './confirmation';

@Injectable()
export class ConfirmationService {
    private requireConfirmationSource = new Subject<Confirmation | null>();
    private acceptConfirmationSource = new Subject<Confirmation | null>();

    requireConfirmation$ = this.requireConfirmationSource.asObservable();
    accept = this.acceptConfirmationSource.asObservable();

    confirm(confirmation: Confirmation) {
        this.requireConfirmationSource.next(confirmation);
        return this;
    }

    close() {
        this.requireConfirmationSource.next(null);
        return this;
    }

    onAccept() {
        this.acceptConfirmationSource.next(null);
    }
}
