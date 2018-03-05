import {NgModule,Component,OnInit,OnDestroy,Input,Output,EventEmitter,Optional} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Message} from '../common/message';
import {MessageService} from '../common/messageservice';
import {Subscription}   from 'rxjs/Subscription';

@Component({
    selector: 'p-messages',
    template: `
        <div *ngIf="hasMessages()" class="ui-messages ui-widget ui-corner-all" style="display:block"
                    [ngClass]="{'ui-messages-info':(value[0].severity === 'info'),
                    'ui-messages-warn':(value[0].severity === 'warn'),
                    'ui-messages-error':(value[0].severity === 'error'),
                    'ui-messages-success':(value[0].severity === 'success')}"
                    [ngStyle]="style" [class]="styleClass">
            <a href="#" class="ui-messages-close" (click)="clear($event)" *ngIf="closable">
                <i class="fa fa-close"></i>
            </a>
            <span class="ui-messages-icon fa fa-fw fa-2x" [ngClass]="icon"></span>
            <ul>
                <li *ngFor="let msg of value">
                    <span *ngIf="msg.summary" class="ui-messages-summary" [innerHTML]="msg.summary"></span>
                    <span *ngIf="msg.detail" class="ui-messages-detail" [innerHTML]="msg.detail"></span>
                </li>
            </ul>
        </div>
    `
})
export class Messages implements OnInit, OnDestroy {

    @Input() value: Message[];

    @Input() closable: boolean = true;

    @Input() style: any;
    
    @Input() styleClass: string;

    @Input() enableService: boolean = true;

    @Input() key: string;

    @Output() valueChange: EventEmitter<Message[]> = new EventEmitter<Message[]>();

    subscription: Subscription;

    constructor(@Optional() public messageService: MessageService) {}

    ngOnInit() {
        if(this.messageService && this.enableService) {
            this.subscription = this.messageService.messageObserver.subscribe((messages: any) => {
                if(messages) {
                    if(messages instanceof Array) {
                        let filteredMessages = messages.filter(m => this.key === m.key);
                        this.value = this.value ? [...this.value, ...filteredMessages] : [...filteredMessages];
                    }
                    else if (this.key === messages.key) {
                        this.value = this.value ? [...this.value, ...[messages]] : [messages];
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
                    icon = 'fa-check';
                break;

                case 'info':
                    icon = 'fa-info-circle';
                break;

                case 'error':
                    icon = 'fa-close';
                break;

                case 'warn':
                    icon = 'fa-warning';
                break;

                default:
                    icon = 'fa-info-circle';
                break;
            }
        }

        return icon;
    }

    ngOnDestroy() {
        if(this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Messages],
    declarations: [Messages]
})
export class MessagesModule { }
