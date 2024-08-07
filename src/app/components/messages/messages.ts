import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    NgModule,
    OnDestroy,
    Optional,
    Output,
    QueryList,
    TemplateRef,
    ViewEncapsulation,
    booleanAttribute,
    inject,
} from '@angular/core';
import { Message, MessageService, PrimeTemplate } from 'primeng/api';
import { CheckIcon } from 'primeng/icons/check';
import { ExclamationTriangleIcon } from 'primeng/icons/exclamationtriangle';
import { InfoCircleIcon } from 'primeng/icons/infocircle';
import { TimesIcon } from 'primeng/icons/times';
import { TimesCircleIcon } from 'primeng/icons/timescircle';
import { RippleModule } from 'primeng/ripple';
import { Subscription, timer } from 'rxjs';
import { MessageStyle } from './style/messagestyle';
import { BaseComponent } from 'primeng/basecomponent';
import { ButtonModule } from 'primeng/button';
/**
 * Messages is used to display alerts inline.
 * @group Components
 */
@Component({
    selector: 'p-messages',
    template: `
        <div
            [ngClass]="cx('container')"
            role="alert"
            [ngStyle]="style"
            [class]="styleClass"
            [attr.aria-atomic]="true"
            [attr.aria-live]="'assertive'"
            [attr.data-pc-name]="'message'"
        >
            @if(contentTemplate) {
            <div [ngClass]="'p-message p-message-' + severity" role="alert">
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            </div>
            }@else {
            <div
                *ngFor="let msg of messages; let i = index"
                [ngClass]="cx('root')"
                [class]="'p-message-' + msg.severity"
                role="alert"
                [@messageAnimation]="{
                    value: 'visible',
                    params: {
                        showTransitionParams: showTransitionOptions,
                        hideTransitionParams: hideTransitionOptions
                    }
                }"
            >
                <div [ngClass]="cx('content')" [attr.data-pc-section]="'wrapper'" [attr.id]="msg.id || null">
                    @if(msg.icon) {
                    <span [ngClass]="cx('icon')" [class]="'pi ' + msg.icon" [attr.data-pc-section]="'icon'"> </span>
                    }@else {
                    <span [ngClass]="cx('icon')">
                        @switch (msg.icon) { @case ('success') {
                        <CheckIcon [attr.data-pc-section]="'icon'" />
                        } @case ('error') {
                        <TimesCircleIcon [attr.data-pc-section]="'icon'" />
                        } @case ('danger') {
                        <TimesCircleIcon [attr.data-pc-section]="'icon'" />
                        }@case ('warn') {
                        <ExclamationTriangleIcon [attr.data-pc-section]="'icon'" />
                        } @default {
                        <InfoCircleIcon [attr.data-pc-section]="'icon'" />
                        } }
                    </span>
                    } @if(escape) { @if(msg.text) {
                    <span [ngClass]="cx('text')">{{ msg.text }}</span>
                    } @if(msg.summary) {
                    <span [ngClass]="cx('text', 'p-message-summary')" [attr.data-pc-section]="'summary'">
                        {{ msg.summary }}
                    </span>
                    }@if (msg.detail) {
                    <span [ngClass]="cx('text', 'p-message-detail')" [attr.data-pc-section]="'detail'">
                        {{ msg.detail }}
                    </span>
                    } }@else {
                    <span
                        *ngIf="msg.summary"
                        class="p-message-summary"
                        [innerHTML]="msg.summary"
                        [attr.data-pc-section]="'summary'"
                    ></span>
                    <span
                        *ngIf="msg.detail"
                        class="p-message-detail"
                        [innerHTML]="msg.detail"
                        [attr.data-pc-section]="'detail'"
                    ></span>
                    }
                    <p-button
                        *ngIf="closable && (msg.closable ?? true)"
                        rounded
                        text
                        [severity]="msg.severity"
                        [styleClass]="cx('closeButton')"
                        (onClick)="removeMessage(i)"
                        [ariaLabel]="closeAriaLabel"
                        [attr.data-pc-section]="'closebutton'"
                    >
                        <TimesIcon [ngClass]="cx('closeIcon')" [attr.data-pc-section]="'closeicon'" />
                    </p-button>
                </div>
            </div>
            }
        </div>
    `,
    animations: [
        trigger('messageAnimation', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(-25%)' }),
                animate('{{showTransitionParams}}'),
            ]),
            transition(':leave', [
                animate(
                    '{{hideTransitionParams}}',
                    style({
                        height: 0,
                        marginTop: 0,
                        marginBottom: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        opacity: 0,
                    }),
                ),
            ]),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [MessageStyle],
})
export class Messages extends BaseComponent implements AfterContentInit, OnDestroy {
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
    /**
     * This function is executed when a message is closed.
     * @param {Message} value - Closed message.
     * @group Emits
     */
    @Output() onClose: EventEmitter<Message> = new EventEmitter<Message>();

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    messages: Message[] | null | undefined;

    messageSubscription: Subscription | undefined;

    clearSubscription: Subscription | undefined;

    timerSubscriptions: Subscription[] = [];

    contentTemplate: TemplateRef<any> | undefined;

    _componentStyle = inject(MessageStyle);

    constructor(@Optional() public messageService: MessageService) {
        super();
    }

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
            this.messageSubscription = this.messageService.messageObserver.subscribe(
                (messages: Message | Message[]) => {
                    if (messages) {
                        if (!Array.isArray(messages)) {
                            messages = [messages];
                        }

                        const filteredMessages = messages.filter((m) => this.key === m.key);
                        this.messages = this.messages ? [...this.messages, ...filteredMessages] : [...filteredMessages];
                        this.startMessageLifes(filteredMessages);
                        this.cd.markForCheck();
                    }
                },
            );

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
        const removedMessage = this.messages[i];
        this.messages = this.messages?.filter((msg, index) => index !== i);
        removedMessage && this.onClose.emit(removedMessage);
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
                case 'danger':
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
        super.ngOnDestroy();
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
    imports: [
        CommonModule,
        RippleModule,
        CheckIcon,
        InfoCircleIcon,
        TimesCircleIcon,
        ExclamationTriangleIcon,
        TimesIcon,
        ButtonModule,
    ],
    exports: [Messages],
    declarations: [Messages],
})
export class MessagesModule {}
