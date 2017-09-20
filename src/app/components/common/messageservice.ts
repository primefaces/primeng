import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Message } from './message';

@Injectable()
export class MessageService {
    
    private messageSource = new Subject<Message>();
    
    messageObserver = this.messageSource.asObservable();
    
    add(message: Message) {
        if(message) {
            this.messageSource.next(message);
        }
    }
    
    addAll(messages: Message[]) {
        if(messages && messages.length) {
            this.messageSource.next(messages);
        } 
    }
    
    clear() {
        this.messageSource.next(null);
    }
}