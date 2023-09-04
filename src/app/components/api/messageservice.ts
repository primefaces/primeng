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
    private removeSource = new Subject<{ key: string, value: any }>();

    messageObserver = this.messageSource.asObservable();
    clearObserver = this.clearSource.asObservable();
    removeObserver = this.removeSource.asObservable();
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
     * Inserts new messages.
     * @param {Message[]} messages - Messages to be added.
     * @group Method
     */
    addAll(messages: Message[]) {
        if (messages && messages.length) {
            this.messageSource.next(messages);
        }
    }
    /**
     * Removes single message.
     * @param {string} key - Property name of the Message to be removed.
     * @param {any} value - Property value of the Message to be removed.
     * @group Method
     */
    remove(key: string, value: any) {
        if (key && value) {
            this.removeSource.next({ key, value });
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
