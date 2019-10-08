import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Confirmation } from './confirmation';

@Injectable()
export class ConfirmationService {
    // used to create confirmation dialog
    private requireConfirmationSource = new Subject<Confirmation>();
    requireConfirmation$ = this.requireConfirmationSource.asObservable();

    // allows interception of all confirmation events
    private eventsSource = new Subject<ConfirmationEvent>();
    events$ = this.eventsSource.asObservable();

    confirm(confirmation: Confirmation): ConfirmationService {
        this.eventsSource.next({ Confirmation: confirmation, Event: ConfirmationEventTypes.Created });
        this.requireConfirmationSource.next(confirmation);
        return this;
    }

    accept(confirmation: Confirmation): void {
        this.eventsSource.next({ Confirmation: confirmation, Event: ConfirmationEventTypes.Accepted});
    }

    reject(confirmation: Confirmation): void {
        this.eventsSource.next({ Confirmation: confirmation, Event: ConfirmationEventTypes.Reject});
    }
}

export class ConfirmationEvent {
    Confirmation: Confirmation;
    Event: ConfirmationEventTypes;
}

export enum ConfirmationEventTypes {
    Created,
    Accepted,
    Reject
}
