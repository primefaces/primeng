import {NgModule,Component,OnDestroy,Input,Output,EventEmitter,AfterContentInit,Optional,ElementRef,ChangeDetectionStrategy,ContentChildren,QueryList,TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {trigger,state,style,transition,animate} from '@angular/animations';
import {Message,PrimeTemplate,MessageService} from 'primeng/api';
import {Subscription} from 'rxjs';

@Component({
    selector: 'p-messages',
    template: `
        <div *ngIf="hasMessages()" class="ui-messages ui-widget ui-corner-all"
                    [ngClass]="getSeverityClass()" role="alert" [ngStyle]="style" [class]="styleClass"
                    [@messageAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}">
            <a tabindex="0" class="ui-messages-close" (click)="clear($event)" (keydown.enter)="clear($event)" *ngIf="closable">
                <i class="pi pi-times"></i>
            </a>
            <span class="ui-messages-icon pi" [ngClass]="icon"></span>
            <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            <ul *ngIf="value && value.length">
                <li *ngFor="let msg of value">
                    <div *ngIf="!escape; else escapeOut">
                        <span *ngIf="msg.summary" class="ui-messages-summary" [innerHTML]="msg.summary"></span>
                        <span *ngIf="msg.detail" class="ui-messages-detail" [innerHTML]="msg.detail"></span>
                    </div>
                    <ng-template #escapeOut>
                        <span *ngIf="msg.summary" class="ui-messages-summary">{{msg.summary}}</span>
                        <span *ngIf="msg.detail" class="ui-messages-detail">{{msg.detail}}</span>
                    </ng-template>
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
    ],
    changeDetection: ChangeDetectionStrategy.Default
})
export class Messages implements AfterContentInit, OnDestroy {

    @Input() value: Message[];

    @Input() closable: boolean = true;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() enableService: boolean = true;

    @Input() key: string;

    @Input() escape: boolean = true;

    @Input() severity: string;

    @Input() showTransitionOptions: string = '300ms ease-out';

    @Input() hideTransitionOptions: string = '250ms ease-in';

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    @Output() valueChange: EventEmitter<Message[]> = new EventEmitter<Message[]>();

    messageSubscription: Subscription;

    clearSubscription: Subscription;

    contentTemplate: TemplateRef<any>;

    constructor(@Optional() public messageService: MessageService, public el: ElementRef) {}

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                break;

                default:
                    this.contentTemplate = item.template;
                break;
            }
        });

        if (this.messageService && this.enableService && !this.contentTemplate) {
            this.messageSubscription = this.messageService.messageObserver.subscribe((messages: any) => {
                if (messages) {
                    if (messages instanceof Array) {
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
        let parentEl = this.el.nativeElement.parentElement;
        if (parentEl && parentEl.offsetParent) {
            return this.contentTemplate != null || this.value && this.value.length > 0;
        }

        return false;
    }

    getSeverityClass() {
        if (this.severity) {
            return 'ui-messages-' + this.severity;
        }
        else {
            const msg = this.value[0];
            if (msg) {
                const severities = ['info', 'warn', 'error', 'success'];
                const severity = severities.find(item => item === msg.severity);

                return severity && `ui-messages-${severity}`;
            }
        }

        return null;
    }

    clear(event) {
        this.value = [];
        this.valueChange.emit(this.value);

        event.preventDefault();
    }

    get icon(): string {
        const severity = this.severity || (this.hasMessages() ? this.value[0].severity : null);

        if (this.hasMessages()) {
            switch(severity) {
                case 'success':
                    return 'pi-check';
                break;

                case 'info':
                    return 'pi-info-circle';
                break;

                case 'error':
                    return 'pi-times';
                break;

                case 'warn':
                    return 'pi-exclamation-triangle';
                break;

                default:
                    return 'pi-info-circle';
                break;
            }
        }

        return null;
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
