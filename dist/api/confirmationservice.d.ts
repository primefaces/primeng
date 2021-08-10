import { Confirmation } from './confirmation';
export declare class ConfirmationService {
    private requireConfirmationSource;
    private acceptConfirmationSource;
    requireConfirmation$: import("rxjs").Observable<Confirmation>;
    accept: import("rxjs").Observable<Confirmation>;
    confirm(confirmation: Confirmation): this;
    close(): this;
    onAccept(): void;
}
