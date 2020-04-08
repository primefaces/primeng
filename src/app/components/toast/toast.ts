import {NgModule,Component,Input,Output,OnInit,AfterViewInit,AfterContentInit,OnDestroy,ElementRef,ViewChild,EventEmitter,ContentChildren,QueryList,TemplateRef,ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Message} from 'primeng/api';
import {DomHandler} from 'primeng/dom';
import {PrimeTemplate,SharedModule} from 'primeng/api';
import {MessageService} from 'primeng/api';
import {Subscription} from 'rxjs';
import {trigger,state,style,transition,animate,query,animateChild,AnimationEvent} from '@angular/animations';

@Component({
    selector: 'p-toastItem',
    template: `
        <div #container [attr.id]="message.id" class="ui-toast-message ui-shadow" [@messageState]="{value: 'visible', params: {showTransformParams: showTransformOptions, hideTransformParams: hideTransformOptions, showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}"
            [ngClass]="{'ui-toast-message-info': message.severity == 'info','ui-toast-message-warn': message.severity == 'warn',
                'ui-toast-message-error': message.severity == 'error','ui-toast-message-success': message.severity == 'success'}"
                (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="ui-toast-message-content">
                <a tabindex="0" class="ui-toast-close-icon pi pi-times" (click)="onCloseIconClick($event)" (keydown.enter)="onCloseIconClick($event)" *ngIf="message.closable !== false"></a>
                <ng-container *ngIf="!template">
                    <span class="ui-toast-icon pi"
                        [ngClass]="{'pi-info-circle': message.severity == 'info', 'pi-exclamation-triangle': message.severity == 'warn',
                            'pi-times-circle': message.severity == 'error', 'pi-check' :message.severity == 'success'}"></span>
                    <div class="ui-toast-message-text-content">
                        <div class="ui-toast-summary">{{message.summary}}</div>
                        <div class="ui-toast-detail">{{message.detail}}</div>
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
                style({transform: '{{showTransformParams}}', opacity: 0}),
                animate('{{showTransitionParams}}')
            ]),
            transition('* => void', [
                animate(('{{hideTransitionParams}}'), style({
                    height: 0,
                    opacity: 0,
                    transform: '{{hideTransformParams}}'
                }))
            ])
        ])
    ]
})
export class ToastItem implements AfterViewInit, OnDestroy {

    @Input() message: Message;

    @Input() index: number;

    @Input() template: TemplateRef<any>;

    @Input() showTransformOptions: string;

    @Input() hideTransformOptions: string;

    @Input() showTransitionOptions: string;

    @Input() hideTransitionOptions: string;

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
    selector: 'p-toast',
    template: `
        <div #container [ngClass]="{'ui-toast ui-widget': true, 
                'ui-toast-top-right': position === 'top-right',
                'ui-toast-top-left': position === 'top-left',
                'ui-toast-bottom-right': position === 'bottom-right',
                'ui-toast-bottom-left': position === 'bottom-left',
                'ui-toast-top-center': position === 'top-center',
                'ui-toast-bottom-center': position === 'bottom-center',
                'ui-toast-center': position === 'center'}" 
                [ngStyle]="style" [class]="styleClass">
            <p-toastItem *ngFor="let msg of messages; let i=index" [message]="msg" [index]="i" (onClose)="onMessageClose($event)"
                    [template]="template" @toastAnimation (@toastAnimation.start)="onAnimationStart($event)" 
                    [showTransformOptions]="showTransformOptions" [hideTransformOptions]="hideTransformOptions" 
                    [showTransitionOptions]="showTransitionOptions" [hideTransitionOptions]="hideTransitionOptions"></p-toastItem>
        </div>
    `,
    animations: [
        trigger('toastAnimation', [
            transition(':enter, :leave', [
                query('@*', animateChild())
            ])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.Default
})
export class Toast implements OnInit,AfterContentInit,OnDestroy {

    @Input() key: string;

    @Input() autoZIndex: boolean = true;
    
    @Input() baseZIndex: number = 0;

    @Input() style: any;
        
    @Input() styleClass: string;

    @Input() position: string = 'top-right';

    @Input() modal: boolean;

    @Input() preventOpenDuplicates: boolean = false;

    @Input() preventDuplicates: boolean = false;
    
    @Input() showTransformOptions: string = 'translateY(100%)';

    @Input() hideTransformOptions: string = 'translateY(-100%)';

    @Input() showTransitionOptions: string = '300ms ease-out';

    @Input() hideTransitionOptions: string = '250ms ease-in';

    @Output() onClose: EventEmitter<any> = new EventEmitter();

    @ViewChild('container') containerViewChild: ElementRef;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    messageSubscription: Subscription;

    clearSubscription: Subscription;

    messages: Message[];

    messagesArchieve: Message[];

    template: TemplateRef<any>;

    mask: HTMLDivElement;
    
    constructor(public messageService: MessageService) {}

    ngOnInit() {
        this.messageSubscription = this.messageService.messageObserver.subscribe(messages => {
            if (messages) {
                if (messages instanceof Array) {
                    const filteredMessages = messages.filter(m => this.canAdd(m));
                    this.add(filteredMessages);
                }
                else if (this.canAdd(messages)) {
                    this.add([messages]);
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

    add(messages: Message[]): void {
        this.messages = this.messages ? [...this.messages, ...messages] : [...messages];

        if (this.preventDuplicates) {
            this.messagesArchieve = this.messagesArchieve ? [...this.messagesArchieve, ...messages] : [...messages];
        }
    }

    canAdd(message: Message): boolean {
        let allow = this.key === message.key;

        if (allow && this.preventOpenDuplicates) {
            allow = !this.containsMessage(this.messages, message);
        }

        if (allow && this.preventDuplicates) {
            allow = !this.containsMessage(this.messagesArchieve, message);
        }

        return allow;
    }

    containsMessage(collection: Message[], message: Message): boolean {
        if (!collection) {
            return false;
        }

        return collection.find(m => {
           return (m.summary === message.summary && m.detail && message.detail && m.severity === message.severity);
        }) != null;
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
            DomHandler.addMultipleClasses(this.mask, maskStyleClass);
            document.body.appendChild(this.mask);
        }
    }
    
    disableModality() {
        if (this.mask) {
            document.body.removeChild(this.mask);
            this.mask = null;
        }
    }

    onAnimationStart(event: AnimationEvent) {
        if (event.fromState === 'void' && this.autoZIndex) {
            this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
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
    exports: [Toast,SharedModule],
    declarations: [Toast,ToastItem]
})
export class ToastModule { }
