import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from './message';
/**
 * Message service used in messages and toast components.
 * @group Service
 */
@Injectable()
export class MessageService {
    private messageSource = new Subject<Message | Message[]>();
    private clearSource = new Subject<string | null>();

    messageObserver = this.messageSource.asObservable();
    clearObserver = this.clearSource.asObservable();
    /**
     * Inserts single message.
     * @param {Message} message - Message to be added.
     * @group Method
     */
    add(message: Message) {
        if (message) {
            this.messageSource.next(message);
        }
    }
    /**
     * Insterts new messages.
     * @param {Message[]} messages - Messages to be added.
     * @group Method
     */
    addAll(messages: Message[]) {
        if (messages && messages.length) {
            this.messageSource.next(messages);
        }
    }
    /**
     * Clears the message with the given key.
     * @param {string} key - Key of the message to be cleared.
     * @group Method
     */
    clear(key?: string) {
        this.clearSource.next(key || null);
    }
}
