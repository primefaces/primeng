import {NgModule,Component,Input,OnDestroy,ElementRef,ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Message} from '../common/message';
import {DomHandler} from '../dom/domhandler';
import {MessageService} from '../common/messageservice';
import {Subscription}   from 'rxjs';

@Component({
    selector: 'p-notifyItem',
    template: `
        <div class="ui-notify-message"
            [ngClass]="{'ui-notify-message-info': message.severity == 'info','ui-notify-message-warn': message.severity == 'warn',
                'ui-notify-message-error': message.severity == 'error','ui-notify-message-success': message.severity == 'success'}">
            <div class="ui-notify-close-icon pi pi-times" (click)="remove(i,msgel)"></div>
            <span class="ui-notify-icon pi"
                [ngClass]="{'pi-info-circle': message.severity == 'info', 'pi-exclamation-triangle': message.severity == 'warn',
                    'pi-times': message.severity == 'error', 'pi-check' :message.severity == 'success'}"></span>
            <div class="ui-notify-message-content">
                <div class="ui-notify-summary">{{message.summary}}</div>
                <div class="ui-notify-detail">{{message.detail}}</div>
            </div>
        </div>
    `,
    providers: [DomHandler]
})
export class NotifyItem implements OnDestroy {

    @Input() message: Message;

    ngOnDestroy() {

    }
}

@Component({
    selector: 'p-notify',
    template: `
        <div #container [ngClass]="'ui-notify ui-widget'" [ngStyle]="style" [class]="styleClass">
            <p-notifyItem *ngFor="let msg of messages" [message]="msg"></p-notifyItem>
        </div>
    `,
    providers: [DomHandler]
})
export class Notify implements OnDestroy {

    @Input() key: string;

    @Input() autoZIndex: boolean = true;
    
    @Input() baseZIndex: number = 0;

    @Input() style: any;
        
    @Input() styleClass: string;

    @ViewChild('container') containerViewChild: ElementRef;

    subscription: Subscription;

    messages: Message[];
    
    constructor(public messageService: MessageService) {        
        if (messageService) {
            this.subscription = messageService.messageObserver.subscribe(messages => {
                if (messages) {
                    if (messages instanceof Array) {
                        let filteredMessages = messages.filter(m => this.key === m.key);
                        this.messages = this.messages ? [...this.messages, ...filteredMessages] : [...filteredMessages];
                    }
                    else if (this.key === messages.key) {
                        this.messages = this.messages ? [...this.messages, ...[messages]] : [messages];
                    }
                }
                else {
                    this.messages = null;
                }
            });
        }
    }

    ngAfterViewInit() {
        if (this.autoZIndex) {
            this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
    }

    ngOnDestroy() {        
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Notify],
    declarations: [Notify,NotifyItem]
})
export class NotifyModule { }