import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    NgModule,
    OnDestroy,
    Optional,
    Output,
    QueryList,
    TemplateRef,
    ViewEncapsulation,
    booleanAttribute
} from '@angular/core';
import { Message, MessageService, PrimeTemplate } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { CheckIcon } from 'primeng/icons/check';
import { ExclamationTriangleIcon } from 'primeng/icons/exclamationtriangle';
import { InfoCircleIcon } from 'primeng/icons/infocircle';
import { TimesIcon } from 'primeng/icons/times';
import { TimesCircleIcon } from 'primeng/icons/timescircle';
import { RippleModule } from 'primeng/ripple';
import { Subscription, timer } from 'rxjs';
/**
 * Messages is used to display alerts inline.
 * @group Components
 */
@Component({
    selector: 'p-messages',
    template: `
        <div class="p-messages p-component" role="alert" [ngStyle]="style" [class]="styleClass" [attr.aria-atomic]="true" [attr.aria-live]="'assertive'" [attr.data-pc-name]="'message'">
            <ng-container *ngIf="!contentTemplate; else staticMessage">
                <div
                    *ngFor="let msg of messages; let i = index"
                    [class]="'p-message p-message-' + msg.severity"
                    role="alert"
                    [@messageAnimation]="{ value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }"
                >
                    <div class="p-message-wrapper" [attr.data-pc-section]="'wrapper'">
                        <span *ngIf="msg.icon" [class]="'p-message-icon pi ' + msg.icon" [attr.data-pc-section]="'icon'"> </span>
                        <span class="p-message-icon" *ngIf="!msg.icon">
                            <ng-container>
                                <CheckIcon *ngIf="msg.severity === 'success'" [attr.data-pc-section]="'icon'" />
                                <InfoCircleIcon *ngIf="msg.severity === 'info'" [attr.data-pc-section]="'icon'" />
                                <TimesCircleIcon *ngIf="msg.severity === 'error'" [attr.data-pc-section]="'icon'" />
                                <ExclamationTriangleIcon *ngIf="msg.severity === 'warn'" [attr.data-pc-section]="'icon'" />
                            </ng-container>
                        </span>
                        <ng-container *ngIf="!escape; else escapeOut">
                            <span *ngIf="msg.summary" class="p-message-summary" [innerHTML]="msg.summary" [attr.data-pc-section]="'summary'"></span>
                            <span *ngIf="msg.detail" class="p-message-detail" [innerHTML]="msg.detail" [attr.data-pc-section]="'detail'"></span>
                        </ng-container>
                        <ng-template #escapeOut>
                            <span *ngIf="msg.summary" class="p-message-summary" [attr.data-pc-section]="'summary'">{{ msg.summary }}</span>
                            <span *ngIf="msg.detail" class="p-message-detail" [attr.data-pc-section]="'detail'">{{ msg.detail }}</span>
                        </ng-template>
                        <button class="p-message-close p-link" (click)="removeMessage(i)" *ngIf="closable" type="button" pRipple [attr.aria-label]="closeAriaLabel" [attr.data-pc-section]="'closebutton'">
                            <TimesIcon [styleClass]="'p-message-close-icon'" [attr.data-pc-section]="'closeicon'" />
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
    /**
     * An array of messages to display.
     * @group Props
     */
    @Input() set value(messages: Message[]) {
        this.messages = messages;
        this.startMessageLifes(this.messages);
    }
    /**
     * Defines if message box can be closed by the click icon.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) closable: boolean = true;
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Whether displaying services messages are enabled.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) enableService: boolean = true;
    /**
     * Id to match the key of the message to enable scoping in service based messaging.
     * @group Props
     */
    @Input() key: string | undefined;
    /**
     * Whether displaying messages would be escaped or not.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) escape: boolean = true;
    /**
     * Severity level of the message.
     * @group Props
     */
    @Input() severity: string | undefined;
    /**
     * Transition options of the show animation.
     * @group Props
     */
    @Input() showTransitionOptions: string = '300ms ease-out';
    /**
     * Transition options of the hide animation.
     * @group Props
     */
    @Input() hideTransitionOptions: string = '200ms cubic-bezier(0.86, 0, 0.07, 1)';
    /**
     * This function is executed when the value changes.
     * @param {Message[]} value - messages value.
     * @group Emits
     */
    @Output() valueChange: EventEmitter<Message[]> = new EventEmitter<Message[]>();

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    messages: Message[] | null | undefined;

    messageSubscription: Subscription | undefined;

    clearSubscription: Subscription | undefined;

    timerSubscriptions: Subscription[] = [];

    contentTemplate: TemplateRef<any> | undefined;

    constructor(@Optional() public messageService: MessageService, public el: ElementRef, public cd: ChangeDetectorRef, private config: PrimeNGConfig) {}

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
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
        this.messages = this.messages?.filter((msg, index) => index !== i);
        this.valueChange.emit(this.messages);
    }

    get icon(): string | null {
        const severity = this.severity || (this.hasMessages() ? this.messages![0].severity : null);

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
    get closeAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.close : undefined;
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
        const timerSubsctiption = timer(message.life!).subscribe(() => {
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
