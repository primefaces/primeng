import { Observable } from 'rxjs/Observable';
import { Message } from './message';
export declare class MessageService {
    private messageSource;
    messageObserver: Observable<Message>;
    add(message: Message): void;
    addAll(messages: Message[]): void;
    clear(): void;
}
