import {NgModule,Component,Input,Output,AfterViewInit,OnDestroy,ElementRef,ViewChild,EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Message} from '../common/message';
import {DomHandler} from '../dom/domhandler';
import {MessageService} from '../common/messageservice';
import {Subscription} from 'rxjs';
import {trigger,state,style,transition,animate,query,animateChild} from '@angular/animations';

@Component({
    selector: 'p-notifyItem',
    template: `
        <div class="ui-notify-message ui-shadow"  [@messageState]="'visible'"
            [ngClass]="{'ui-notify-message-info': message.severity == 'info','ui-notify-message-warn': message.severity == 'warn',
                'ui-notify-message-error': message.severity == 'error','ui-notify-message-success': message.severity == 'success'}">
            <div class="ui-notify-message-content">
                <div class="ui-notify-close-icon pi pi-times" (click)="remove(i,msgel)"></div>
                <span class="ui-notify-icon pi"
                    [ngClass]="{'pi-info-circle': message.severity == 'info', 'pi-exclamation-triangle': message.severity == 'warn',
                        'pi-times': message.severity == 'error', 'pi-check' :message.severity == 'success'}"></span>
                <div class="ui-notify-message-text-content">
                    <div class="ui-notify-summary">{{message.summary}}</div>
                    <div class="ui-notify-detail">{{message.detail}}</div>
                </div>
            </div>
        </div>
    `,
    animations: [
        trigger('messageState', [
            state('visible', style({
                transform: 'translateY(0)',
                opacity: 1
            })),
            transition('void => *', [
                style({transform: 'translateY(100%)', opacity: 0}),
                animate('300ms ease-out')
            ]),
            transition('* => void', [
                animate(('250ms ease-in'), style({
                    height: 0,
                    opacity: 0,
                    transform: 'translateY(-100%)'
                }))
            ])
        ])
    ],
    providers: [DomHandler]
})
export class NotifyItem implements AfterViewInit, OnDestroy {

    @Input() message: Message;

    @Input() index: number;

    @Output() onClose: EventEmitter<any> = new EventEmitter();

    timeout: any;

    ngAfterViewInit() {
        if (!this.message.sticky) {
            this.timeout = setTimeout(() => {
                this.onClose.emit({
                    index: this.index,
                    message: this.message
                });
            }, this.message.timeout || 3000);
        }
    }

    ngOnDestroy() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }
}

@Component({
    selector: 'p-notify',
    template: `
        <div #container [ngClass]="'ui-notify ui-widget'" [ngStyle]="style" [class]="styleClass">
            <p-notifyItem *ngFor="let msg of messages; let i=index" [message]="msg" [index]="i" (onClose)="onClose($event)" @notifyAnimation></p-notifyItem>
        </div>
    `,
    animations: [
        trigger('notifyAnimation', [
            transition(':enter, :leave', [
                query('@*', animateChild())
            ])
        ])
    ],
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

    onClose(event) {
        this.messages.splice(event.index, 1);
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