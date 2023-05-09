import { NgModule, Component, OnDestroy, Input, Output, EventEmitter, AfterContentInit, Optional, ElementRef, ChangeDetectionStrategy, ContentChildren, QueryList, TemplateRef, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, transition, animate } from '@angular/animations';
import { Message, PrimeTemplate, MessageService } from 'primeng/api';
import { Subscription, timer } from 'rxjs';
import { RippleModule } from 'primeng/ripple';
import { CheckIcon } from 'primeng/icons/check';
import { InfoCircleIcon } from 'primeng/icons/infocircle';
import { TimesCircleIcon } from 'primeng/icons/timescircle';
import { ExclamationTriangleIcon } from 'primeng/icons/exclamationtriangle';
import { TimesIcon } from 'primeng/icons/times';

@Component({
    selector: 'p-messages',
    template: `
        <div class="p-messages p-component" role="alert" [ngStyle]="style" [class]="styleClass">
            <ng-container *ngIf="!contentTemplate; else staticMessage">
                <div
                    *ngFor="let msg of messages; let i = index"
                    [class]="'p-message p-message-' + msg.severity"
                    role="alert"
                    [@messageAnimation]="{ value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }"
                >
                    <div class="p-message-wrapper">
                        <span *ngIf="msg.icon" [class]="'p-message-icon pi ' + msg.icon"> </span>
                        <span class="p-message-icon" *ngIf="!msg.icon">
                            <ng-container>
                                <CheckIcon *ngIf="msg.severity === 'success'" />
                                <InfoCircleIcon *ngIf="msg.severity === 'info'" />
                                <TimesCircleIcon *ngIf="msg.severity === 'error'" />
                                <ExclamationTriangleIcon *ngIf="msg.severity === 'warn'" />
                            </ng-container>
                        </span>
                        <ng-container *ngIf="!escape; else escapeOut">
                            <span *ngIf="msg.summary" class="p-message-summary" [innerHTML]="msg.summary"></span>
                            <span *ngIf="msg.detail" class="p-message-detail" [innerHTML]="msg.detail"></span>
                        </ng-container>
                        <ng-template #escapeOut>
                            <span *ngIf="msg.summary" class="p-message-summary">{{ msg.summary }}</span>
                            <span *ngIf="msg.detail" class="p-message-detail">{{ msg.detail }}</span>
                        </ng-template>
                        <button class="p-message-close p-link" (click)="removeMessage(i)" *ngIf="closable" type="button" pRipple>
                            <TimesIcon [styleClass]="'p-message-close-icon'" />
                        </button>
                    </div>
                </div>
            </ng-container>
            <ng-template #staticMessage>
                <div [ngClass]="'p-message p-message-' + severity" role="alert">
                    <div class="p-message-wrapper">
                        <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                    </div>
                </div>
            </ng-template>
        </div>
    `,
    animations: [
        trigger('messageAnimation', [
            transition(':enter', [style({ opacity: 0, transform: 'translateY(-25%)' }), animate('{{showTransitionParams}}')]),
            transition(':leave', [animate('{{hideTransitionParams}}', style({ height: 0, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, opacity: 0 }))])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./messages.css'],
    host: {
        class: 'p-element'
    }
})
export class Messages implements AfterContentInit, OnDestroy {
    @Input() set value(messages: Message[]) {
        this.messages = messages;
        this.startMessageLifes(this.messages);
    }

    @Input() closable: boolean = true;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() enableService: boolean = true;

    @Input() key: string;

    @Input() escape: boolean = true;

    @Input() severity: string;

    @Input() showTransitionOptions: string = '300ms ease-out';

    @Input() hideTransitionOptions: string = '200ms cubic-bezier(0.86, 0, 0.07, 1)';

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    @Output() valueChange: EventEmitter<Message[]> = new EventEmitter<Message[]>();

    messages: Message[];

    messageSubscription: Subscription;

    clearSubscription: Subscription;

    timerSubscriptions: Subscription[] = [];

    contentTemplate: TemplateRef<any>;

    constructor(@Optional() public messageService: MessageService, public el: ElementRef, public cd: ChangeDetectorRef) {}

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;

                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });

        if (this.messageService && this.enableService && !this.contentTemplate) {
            this.messageSubscription = this.messageService.messageObserver.subscribe((messages: Message | Message[]) => {
                if (messages) {
                    if (!Array.isArray(messages)) {
                        messages = [messages];
                    }

                    const filteredMessages = messages.filter((m) => this.key === m.key);
                    this.messages = this.messages ? [...this.messages, ...filteredMessages] : [...filteredMessages];
                    this.startMessageLifes(filteredMessages);
                    this.cd.markForCheck();
                }
            });

            this.clearSubscription = this.messageService.clearObserver.subscribe((key) => {
                if (key) {
                    if (this.key === key) {
                        this.messages = null;
                    }
                } else {
                    this.messages = null;
                }

                this.cd.markForCheck();
            });
        }
    }

    hasMessages() {
        let parentEl = this.el.nativeElement.parentElement;
        if (parentEl && parentEl.offsetParent) {
            return this.contentTemplate != null || (this.messages && this.messages.length > 0);
        }

        return false;
    }

    clear() {
        this.messages = [];
        this.valueChange.emit(this.messages);
    }

    removeMessage(i: number) {
        this.messages = this.messages.filter((msg, index) => index !== i);
        this.valueChange.emit(this.messages);
    }

    get icon(): string {
        const severity = this.severity || (this.hasMessages() ? this.messages[0].severity : null);

        if (this.hasMessages()) {
            switch (severity) {
                case 'success':
                    return 'pi-check';

                case 'info':
                    return 'pi-info-circle';

                case 'error':
                    return 'pi-times';

                case 'warn':
                    return 'pi-exclamation-triangle';

                default:
                    return 'pi-info-circle';
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

        this.timerSubscriptions?.forEach((subscription) => subscription.unsubscribe());
    }

    private startMessageLifes(messages: Message[]): void {
        messages?.forEach((message) => message.life && this.startMessageLife(message));
    }

    private startMessageLife(message: Message): void {
        const timerSubsctiption = timer(message.life).subscribe(() => {
            this.messages = this.messages?.filter((msgEl) => msgEl !== message);
            this.timerSubscriptions = this.timerSubscriptions?.filter((timerEl) => timerEl !== timerSubsctiption);
            this.valueChange.emit(this.messages);
            this.cd.markForCheck();
        });
        this.timerSubscriptions.push(timerSubsctiption);
    }
}

@NgModule({
    imports: [CommonModule, RippleModule, CheckIcon, InfoCircleIcon, TimesCircleIcon, ExclamationTriangleIcon, TimesIcon],
    exports: [Messages],
    declarations: [Messages]
})
export class MessagesModule {}
