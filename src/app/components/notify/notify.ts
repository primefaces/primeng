import {NgModule,Component,Input,Output,OnInit,AfterViewInit,AfterContentInit,OnDestroy,ElementRef,ViewChild,EventEmitter,ContentChildren,QueryList,TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Message} from '../common/message';
import {DomHandler} from '../dom/domhandler';
import {PrimeTemplate} from '../common/shared';
import {MessageService} from '../common/messageservice';
import {Subscription} from 'rxjs';
import {trigger,state,style,transition,animate,query,animateChild} from '@angular/animations';

@Component({
    selector: 'p-notifyItem',
    template: `
        <div #container class="ui-notify-message ui-shadow" [@messageState]="'visible'"
            [ngClass]="{'ui-notify-message-info': message.severity == 'info','ui-notify-message-warn': message.severity == 'warn',
                'ui-notify-message-error': message.severity == 'error','ui-notify-message-success': message.severity == 'success'}"
                (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()">
            <div class="ui-notify-message-content">
                <a href="#" class="ui-notify-close-icon pi pi-times" (click)="onCloseIconClick($event)" *ngIf="message.closable !== false"></a>
                <ng-container *ngIf="!template">
                    <span class="ui-notify-icon pi"
                        [ngClass]="{'pi-info-circle': message.severity == 'info', 'pi-exclamation-triangle': message.severity == 'warn',
                            'pi-times': message.severity == 'error', 'pi-check' :message.severity == 'success'}"></span>
                    <div class="ui-notify-message-text-content">
                        <div class="ui-notify-summary">{{message.summary}}</div>
                        <div class="ui-notify-detail">{{message.detail}}</div>
                    </div>
                </ng-container>
                <ng-container *ngTemplateOutlet="template; context: {$implicit: message}"></ng-container>
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

    @Input() template: TemplateRef<any>;

    @Output() onClose: EventEmitter<any> = new EventEmitter();

    @ViewChild('container') containerViewChild: ElementRef;

    timeout: any;

    ngAfterViewInit() {
        this.initTimeout();
    }

    initTimeout() {
        if (!this.message.sticky) {
            this.timeout = setTimeout(() => {
                this.onClose.emit({
                    index: this.index,
                    message: this.message
                });
            }, this.message.life || 3000);
        }
    }

    clearTimeout() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }
    
    onMouseEnter() {
        this.clearTimeout();
    }

    onMouseLeave() {
        this.initTimeout();
    }
 
    onCloseIconClick(event) {
        this.clearTimeout();
        
        this.onClose.emit({
            index: this.index,
            message: this.message
        });

        event.preventDefault();
    }

    ngOnDestroy() {
        this.clearTimeout();
    }
}

@Component({
    selector: 'p-notify',
    template: `
        <div #container [ngClass]="{'ui-notify ui-widget': true, 
                'ui-notify-top-right': position === 'top-right',
                'ui-notify-top-left': position === 'top-left',
                'ui-notify-bottom-right': position === 'bottom-right',
                'ui-notify-bottom-left': position === 'bottom-left',
                'ui-notify-top-center': position === 'top-center',
                'ui-notify-bottom-center': position === 'bottom-center',
                'ui-notify-center': position === 'center'}" 
                [ngStyle]="style" [class]="styleClass">
            <p-notifyItem *ngFor="let msg of messages; let i=index" [message]="msg" [index]="i" (onClose)="onMessageClose($event)" [template]="template" @notifyAnimation></p-notifyItem>
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
export class Notify implements OnInit,AfterContentInit,OnDestroy {

    @Input() key: string;

    @Input() autoZIndex: boolean = true;
    
    @Input() baseZIndex: number = 0;

    @Input() style: any;
        
    @Input() styleClass: string;

    @Input() position: string = 'top-right';

    @Input() modal: boolean;

    @Output() onClose: EventEmitter<any> = new EventEmitter();

    @ViewChild('container') containerViewChild: ElementRef;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    messageSubscription: Subscription;

    clearSubscription: Subscription;

    messages: Message[];

    template: TemplateRef<any>;

    mask: HTMLDivElement;
    
    constructor(public messageService: MessageService, public domHandler: DomHandler) {}

    ngOnInit() {
        this.messageSubscription = this.messageService.messageObserver.subscribe(messages => {
            if (messages) {
                if (messages instanceof Array) {
                    let filteredMessages = messages.filter(m => this.key === m.key);
                    this.messages = this.messages ? [...this.messages, ...filteredMessages] : [...filteredMessages];
                }
                else if (this.key === messages.key) {
                    this.messages = this.messages ? [...this.messages, ...[messages]] : [messages];
                }

                if (this.modal && this.messages && this.messages.length) {
                    this.enableModality();
                }
            }
        });

        this.clearSubscription = this.messageService.clearObserver.subscribe(key => {
            if (key) {
                if (this.key === key) {
                    this.messages = null;
                }
            }
            else {
                this.messages = null;
            }

            if (this.modal) {
                this.disableModality();
            }
        });       
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'message':
                    this.template = item.template;
                break;

                default:
                    this.template = item.template;
                break;
            }
        });
    }

    ngAfterViewInit() {
        if (this.autoZIndex) {
            this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
    }

    onMessageClose(event) {
        this.messages.splice(event.index, 1);

        if (this.messages.length === 0) {
            this.disableModality();
        }

        this.onClose.emit({
            message: event.message
        });
    }

    enableModality() {
        if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = String(parseInt(this.containerViewChild.nativeElement.style.zIndex) - 1);
            let maskStyleClass = 'ui-widget-overlay ui-dialog-mask';
            this.domHandler.addMultipleClasses(this.mask, maskStyleClass);
            document.body.appendChild(this.mask);
        }
    }
    
    disableModality() {
        if (this.mask) {
            document.body.removeChild(this.mask);
            this.mask = null;
        }
    }

    ngOnDestroy() {        
        if (this.messageSubscription) {
            this.messageSubscription.unsubscribe();
        }
        
        if (this.clearSubscription) {
            this.clearSubscription.unsubscribe();
        }

        this.disableModality();
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Notify],
    declarations: [Notify,NotifyItem]
})
export class NotifyModule { }