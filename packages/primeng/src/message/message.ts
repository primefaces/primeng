import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, inject, InjectionToken, input, NgModule, numberAttribute, output, signal, TemplateRef, ViewEncapsulation } from '@angular/core';
import { MotionOptions } from '@primeuix/motion';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { Times as TimesIcon } from '@primeicons/angular/times';
import { MotionModule } from 'primeng/motion';
import { Ripple } from 'primeng/ripple';
import { MessageCloseEvent, MessageContainerTemplateContext, MessagePassThrough, MessageSeverity, MessageSize, MessageVariant } from 'primeng/types/message';
import { MessageStyle } from './style/messagestyle';

const MESSAGE_INSTANCE = new InjectionToken<Message>('MESSAGE_INSTANCE');

/**
 * Message groups a collection of contents in tabs.
 * @group Components
 */
@Component({
    selector: 'p-message',
    standalone: true,
    imports: [NgTemplateOutlet, TimesIcon, Ripple, SharedModule, Bind, MotionModule],
    template: `
        <div [pBind]="ptm('contentWrapper')" [class]="cx('contentWrapper')" [attr.data-p]="dataP()">
            <div [pBind]="ptm('content')" [class]="cx('content')" [attr.data-p]="dataP()">
                @if (iconTemplate()) {
                    <ng-container *ngTemplateOutlet="iconTemplate()"></ng-container>
                }
                @if (icon()) {
                    <i [pBind]="ptm('icon')" [class]="cn(cx('icon'), icon())" [attr.data-p]="dataP()"></i>
                }

                @if (containerTemplate()) {
                    <ng-container *ngTemplateOutlet="containerTemplate(); context: containerContext"></ng-container>
                } @else {
                    <span [pBind]="ptm('text')" [class]="cx('text')" [attr.data-p]="dataP()">
                        <ng-content />
                    </span>
                }
                @if (closable()) {
                    <button [pBind]="ptm('closeButton')" pRipple type="button" [class]="cx('closeButton')" (click)="close($event)" [attr.aria-label]="closeAriaLabel" [attr.data-p]="dataP()">
                        @if (closeIcon()) {
                            <i [pBind]="ptm('closeIcon')" [class]="cn(cx('closeIcon'), closeIcon())" [attr.data-p]="dataP()"></i>
                        } @else if (closeIconTemplate()) {
                            <ng-container *ngTemplateOutlet="closeIconTemplate()"></ng-container>
                        } @else {
                            <svg [pBind]="ptm('closeIcon')" data-p-icon="times" [class]="cx('closeIcon')" [attr.data-p]="dataP()" />
                        }
                    </button>
                }
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [MessageStyle, { provide: MESSAGE_INSTANCE, useExisting: Message }, { provide: PARENT_INSTANCE, useExisting: Message }],
    hostDirectives: [Bind],
    host: {
        '[attr.data-p]': 'dataP()',
        role: 'alert',
        'aria-live': 'polite',
        '[class]': "cx('root')",
        '[animate.enter]': '"p-message-enter-active"',
        '[animate.leave]': '"p-message-leave-active"',
        '[class.p-message-leave-active]': '!visible()'
    }
})
export class Message extends BaseComponent<MessagePassThrough> {
    componentName = 'Message';

    _componentStyle = inject(MessageStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    $pcMessage: Message | undefined = inject(MESSAGE_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    /**
     * Severity level of the message.
     * @defaultValue 'info'
     * @group Props
     */
    severity = input<MessageSeverity>('info');
    /**
     * Whether the message can be closed manually using the close icon.
     * @group Props
     * @defaultValue false
     */
    closable = input(false, { transform: booleanAttribute });
    /**
     * Icon to display in the message.
     * @group Props
     * @defaultValue undefined
     */
    icon = input<string>();
    /**
     * Icon to display in the message close button.
     * @group Props
     * @defaultValue undefined
     */
    closeIcon = input<string>();
    /**
     * Delay in milliseconds to close the message automatically.
     * @defaultValue undefined
     */
    life = input<number, unknown>(undefined, { transform: numberAttribute });
    /**
     * Defines the size of the component.
     * @group Props
     */
    size = input<MessageSize>();
    /**
     * Specifies the input variant of the component.
     * @group Props
     */
    variant = input<MessageVariant>();
    /**
     * The motion options.
     * @group Props
     */
    motionOptions = input<MotionOptions>();

    computedMotionOptions = computed<MotionOptions>(() => {
        return {
            ...this.ptm('motion'),
            ...this.motionOptions()
        };
    });
    /**
     * Emits when the message is closed.
     * @param {MessageCloseEvent} event - The event object containing the original event.
     * @group Emits
     */
    onClose = output<MessageCloseEvent>();

    get closeAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.close : undefined;
    }

    visible = signal<boolean>(true);

    /**
     * Custom template of the message container.
     * @param {MessageContainerTemplateContext} context - container context.
     * @see {@link MessageContainerTemplateContext}
     * @group Templates
     */
    containerTemplate = contentChild<TemplateRef<MessageContainerTemplateContext>>('container', { descendants: false });

    /**
     * Custom template of the message icon.
     * @group Templates
     */
    iconTemplate = contentChild<TemplateRef<void>>('icon', { descendants: false });

    /**
     * Custom template of the close icon.
     * @group Templates
     */
    closeIconTemplate = contentChild<TemplateRef<void>>('closeicon', { descendants: false });

    closeCallback = (event: Event) => {
        this.close(event);
    };

    containerContext: MessageContainerTemplateContext = { closeCallback: this.closeCallback };

    onInit() {
        const lifeValue = this.life();
        if (lifeValue) {
            setTimeout(() => {
                this.visible.set(false);
            }, lifeValue);
        }
    }

    /**
     * Closes the message.
     * @param {Event} event - Browser event.
     * @group Method
     */
    public close(event: Event) {
        this.visible.set(false);
        this.onClose.emit({ originalEvent: event });
    }

    dataP = computed(() => {
        return this.cn({
            outlined: this.variant() === 'outlined',
            simple: this.variant() === 'simple',
            [this.severity() as string]: this.severity(),
            [this.size() as string]: this.size()
        });
    });
}

@NgModule({
    imports: [Message, SharedModule],
    exports: [Message, SharedModule]
})
export class MessageModule {}
