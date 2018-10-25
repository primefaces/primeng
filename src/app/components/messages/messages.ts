import {NgModule,Component,OnInit,OnDestroy,Input,Output,EventEmitter,Optional} from '@angular/core';
import {CommonModule} from '@angular/common';
import {trigger,state,style,transition,animate} from '@angular/animations';
import {Message} from '../common/message';
import {MessageService} from '../common/messageservice';
import {Subscription} from 'rxjs';

@Component({
    selector: 'p-messages',
    template: `
        <div *ngIf="hasMessages()" class="ui-messages ui-widget ui-corner-all" style="display:block"
                    [ngClass]="{'ui-messages-info':(value[0].severity === 'info'),
                    'ui-messages-warn':(value[0].severity === 'warn'),
                    'ui-messages-error':(value[0].severity === 'error'),
                    'ui-messages-success':(value[0].severity === 'success')}"
                    [ngStyle]="style" [class]="styleClass" [@messageAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}">
            <a tabindex="0" class="ui-messages-close" (click)="clear($event)" (keydown.enter)="clear($event)" *ngIf="closable">
                <i class="pi pi-times"></i>
            </a>
            <span class="ui-messages-icon pi" [ngClass]="icon"></span>
            <ul>
                <li *ngFor="let msg of value">
                    <span *ngIf="msg.summary" class="ui-messages-summary" [innerHTML]="msg.summary"></span>
                    <span *ngIf="msg.detail" class="ui-messages-detail" [innerHTML]="msg.detail"></span>
                </li>
            </ul>
        </div>
    `,
    animations: [
        trigger('messageAnimation', [
            state('visible', style({
                transform: 'translateY(0)',
                opacity: 1
            })),
            transition('void => *', [
                style({transform: 'translateY(-25%)', opacity: 0}),
                animate('{{showTransitionParams}}')
            ]),
            transition('* => void', [
                animate(('{{hideTransitionParams}}'), style({
                    opacity: 0,
                    transform: 'translateY(-25%)'
                }))
            ])
        ])
    ]
})
export class Messages implements OnInit, OnDestroy {

    @Input() value: Message[];

    @Input() closable: boolean = true;

    @Input() style: any;
    
    @Input() styleClass: string;

    @Input() enableService: boolean = true;

    @Input() key: string;

    @Input() showTransitionOptions: string = '300ms ease-out';

    @Input() hideTransitionOptions: string = '250ms ease-in';

    @Output() valueChange: EventEmitter<Message[]> = new EventEmitter<Message[]>();
    
    messageSubscription: Subscription;

    clearSubscription: Subscription;

    constructor(@Optional() public messageService: MessageService) {}

    ngOnInit() {
        if(this.messageService && this.enableService) {
            this.messageSubscription = this.messageService.messageObserver.subscribe((messages: any) => {
                if(messages) {
                    if(messages instanceof Array) {
                        let filteredMessages = messages.filter(m => this.key === m.key);
                        this.value = this.value ? [...this.value, ...filteredMessages] : [...filteredMessages];
                    }
                    else if (this.key === messages.key) {
                        this.value = this.value ? [...this.value, ...[messages]] : [messages];
                    }
                }
            });

            this.clearSubscription = this.messageService.clearObserver.subscribe(key => {
                if (key) {
                    if (this.key === key) {
                        this.value = null;
                    }
                }
                else {
                    this.value = null;
                }
            });
        }
    }

    hasMessages() {
        return this.value && this.value.length > 0;
    }

    getSeverityClass() {
        return this.value[0].severity;
    }

    clear(event) {
        this.value = [];
        this.valueChange.emit(this.value);

        event.preventDefault();
    }

    get icon(): string {
        let icon: string = null;
        if(this.hasMessages()) {
            let msg = this.value[0];
            switch(msg.severity) {
                case 'success':
                    icon = 'pi-check';
                break;

                case 'info':
                    icon = 'pi-info-circle';
                break;

                case 'error':
                    icon = 'pi-times';
                break;

                case 'warn':
                    icon = 'pi-exclamation-triangle';
                break;

                default:
                    icon = 'pi-info-circle';
                break;
            }
        }

        return icon;
    }

    ngOnDestroy() {
        if (this.messageSubscription) {
            this.messageSubscription.unsubscribe();
        }
        
        if (this.clearSubscription) {
            this.clearSubscription.unsubscribe();
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Messages],
    declarations: [Messages]
})
export class MessagesModule { }
