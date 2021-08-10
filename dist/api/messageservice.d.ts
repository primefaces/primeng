import { Message } from './message';
export declare class MessageService {
    private messageSource;
    private clearSource;
    messageObserver: import("rxjs").Observable<Message | Message[]>;
    clearObserver: import("rxjs").Observable<string>;
    add(message: Message): void;
    addAll(messages: Message[]): void;
    clear(key?: string): void;
}
