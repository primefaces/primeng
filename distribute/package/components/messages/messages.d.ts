import { OnDestroy, EventEmitter } from '@angular/core';
import { Message } from '../common/message';
import { MessageService } from '../common/messageservice';
import { Subscription } from 'rxjs/Subscription';
export declare class Messages implements OnDestroy {
    messageService: MessageService;
    value: Message[];
    closable: boolean;
    valueChange: EventEmitter<Message[]>;
    subscription: Subscription;
    constructor(messageService: MessageService);
    hasMessages(): boolean;
    getSeverityClass(): string;
    clear(event: any): void;
    readonly icon: string;
    ngOnDestroy(): void;
}
export declare class MessagesModule {
}
