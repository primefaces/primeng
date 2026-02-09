import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, effect, inject, InjectionToken, input, NgModule, numberAttribute, output, signal, TemplateRef, ViewEncapsulation } from '@angular/core';
import { MotionEvent, MotionOptions } from '@primeuix/motion';
import { isEmpty, setAttribute, uuid } from '@primeuix/utils';
import { MessageService, SharedModule, ToastMessageOptions } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { CheckIcon, ExclamationTriangleIcon, InfoCircleIcon, TimesCircleIcon, TimesIcon } from 'primeng/icons';
import { MotionModule } from 'primeng/motion';
import { ToastBreakpoints, ToastCloseEvent, ToastHeadlessTemplateContext, ToastItemCloseEvent, ToastMessageTemplateContext, ToastPassThrough, ToastPositionType } from 'primeng/types/toast';
import { ZIndexUtils } from 'primeng/utils';
import { Subscription } from 'rxjs';
import { ToastStyle } from './style/toaststyle';

const TOAST_INSTANCE = new InjectionToken<Toast>('TOAST_INSTANCE');

@Component({
    selector: 'p-toastItem',
    standalone: true,
    imports: [NgTemplateOutlet, CheckIcon, ExclamationTriangleIcon, InfoCircleIcon, TimesIcon, TimesCircleIcon, SharedModule, Bind, MotionModule],
    template: `
        <div
            #container
            [pMotion]="visible()"
            [pMotionAppear]="true"
            [pMotionName]="'p-toast-message'"
            [pMotionOptions]="motionOptions()"
            (pMotionOnBeforeEnter)="onBeforeEnter($event)"
            (pMotionOnAfterLeave)="onAfterLeave($event)"
            [attr.id]="message()?.id"
            [pBind]="ptm('message')"
            [class]="cn(cx('message'), message()?.styleClass)"
            (mouseenter)="onMouseEnter()"
            (mouseleave)="onMouseLeave()"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            [attr.data-p]="dataP()"
        >
            @if (headlessTemplate()) {
                <ng-container *ngTemplateOutlet="headlessTemplate(); context: headlessContext()"></ng-container>
            } @else {
                <div [pBind]="ptm('messageContent')" [class]="cn(cx('messageContent'), message()?.contentStyleClass)">
                    @if (!template()) {
                        @if (message()?.icon) {
                            <span [pBind]="ptm('messageIcon')" [class]="cn(cx('messageIcon'), message()?.icon)"></span>
                        } @else {
                            @switch (message()?.severity) {
                                @case ('success') {
                                    <svg [pBind]="ptm('messageIcon')" data-p-icon="check" [class]="cx('messageIcon')" [attr.aria-hidden]="true" />
                                }
                                @case ('info') {
                                    <svg [pBind]="ptm('messageIcon')" data-p-icon="info-circle" [class]="cx('messageIcon')" [attr.aria-hidden]="true" />
                                }
                                @case ('error') {
                                    <svg [pBind]="ptm('messageIcon')" data-p-icon="times-circle" [class]="cx('messageIcon')" [attr.aria-hidden]="true" />
                                }
                                @case ('warn') {
                                    <svg [pBind]="ptm('messageIcon')" data-p-icon="exclamation-triangle" [class]="cx('messageIcon')" [attr.aria-hidden]="true" />
                                }
                                @default {
                                    <svg [pBind]="ptm('messageIcon')" data-p-icon="info-circle" [class]="cx('messageIcon')" [attr.aria-hidden]="true" />
                                }
                            }
                        }
                        <div [pBind]="ptm('messageText')" [class]="cx('messageText')" [attr.data-p]="dataP()">
                            <div [pBind]="ptm('summary')" [class]="cx('summary')" [attr.data-p]="dataP()">
                                {{ message()?.summary }}
                            </div>
                            <div [pBind]="ptm('detail')" [class]="cx('detail')" [attr.data-p]="dataP()">{{ message()?.detail }}</div>
                        </div>
                    }
                    @if (template()) {
                        <ng-container *ngTemplateOutlet="template(); context: messageContext()"></ng-container>
                    }
                    @if (message()?.closable !== false) {
                        <div>
                            <button
                                [pBind]="ptm('closeButton')"
                                type="button"
                                [attr.class]="cx('closeButton')"
                                (click)="onCloseIconClick($event)"
                                (keydown.enter)="onCloseIconClick($event)"
                                [attr.aria-label]="closeAriaLabel"
                                autofocus
                                [attr.data-p]="dataP()"
                            >
                                @if (message()?.closeIcon) {
                                    <span [pBind]="ptm('closeIcon')" [class]="cn(cx('closeIcon'), message()?.closeIcon)"></span>
                                } @else {
                                    <svg [pBind]="ptm('closeIcon')" data-p-icon="times" [class]="cx('closeIcon')" [attr.aria-hidden]="true" />
                                }
                            </button>
                        </div>
                    }
                </div>
            }
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ToastStyle]
})
export class ToastItem extends BaseComponent<ToastPassThrough> {
    /**
     * Message instance.
     * @group Props
     */
    message = input<ToastMessageOptions | null>();
    /**
     * Index of the message.
     * @group Props
     */
    index = input<number, unknown>(undefined, { transform: numberAttribute });
    /**
     * Life duration in milliseconds.
     * @group Props
     */
    life = input<number, unknown>(undefined, { transform: numberAttribute });
    /**
     * Custom message template.
     * @group Props
     */
    template = input<TemplateRef<ToastMessageTemplateContext>>();
    /**
     * Custom headless template.
     * @group Props
     */
    headlessTemplate = input<TemplateRef<ToastHeadlessTemplateContext>>();
    /**
     * The motion options.
     * @group Props
     */
    motionOptions = input<MotionOptions>();
    /**
     * Clear all trigger.
     * @group Props
     */
    clearAll = input<object | null>(null);
    /**
     * Emits when animation starts.
     * @group Emits
     */
    onAnimationStart = output<HTMLElement>();
    /**
     * Emits when animation ends.
     * @group Emits
     */
    onAnimationEnd = output<HTMLElement>();
    /**
     * Emits when message is closed.
     * @group Emits
     */
    onClose = output<ToastItemCloseEvent>();

    _componentStyle = inject(ToastStyle);

    timeout: ReturnType<typeof setTimeout> | null = null;

    visible = signal<boolean | undefined>(undefined);

    private isDestroyed = false;

    private isClosing = false;

    constructor() {
        super();

        effect(() => {
            if (this.clearAll()) {
                this.visible.set(false);
            }
        });
    }

    onBeforeEnter(event: MotionEvent) {
        this.onAnimationStart.emit(event.element as HTMLElement);
    }

    onAfterLeave(event: MotionEvent) {
        if (!this.visible() && !this.isDestroyed) {
            this.onClose.emit({
                index: this.index() as number,
                message: this.message() as ToastMessageOptions
            });

            if (!this.isDestroyed) {
                this.onAnimationEnd.emit(event.element as HTMLElement);
            }
        }
    }

    onAfterViewInit() {
        this.message()?.sticky && this.visible.set(true);
        this.initTimeout();
    }

    initTimeout() {
        const msg = this.message();
        if (!msg?.sticky) {
            this.clearTimeout();
            this.visible.set(true);
            this.timeout = setTimeout(
                () => {
                    this.visible.set(false);
                },
                msg?.life || this.life() || 3000
            );
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
        if (!this.isClosing) {
            this.initTimeout();
        }
    }

    onCloseIconClick = (event: Event) => {
        this.isClosing = true;
        this.clearTimeout();
        this.visible.set(false);
        event.preventDefault();
    };

    get closeAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.close : undefined;
    }

    onDestroy() {
        this.isDestroyed = true;
        this.clearTimeout();
        this.visible.set(false);
    }

    headlessContext = computed<ToastHeadlessTemplateContext>(() => ({
        $implicit: this.message(),
        closeFn: this.onCloseIconClick
    }));

    messageContext = computed<ToastMessageTemplateContext>(() => ({
        $implicit: this.message()
    }));

    dataP = computed(() => {
        const msg = this.message();
        return this.cn({
            [msg?.severity as string]: msg?.severity
        });
    });
}

/**
 * Toast is used to display messages in an overlay.
 * @group Components
 */
@Component({
    selector: 'p-toast',
    standalone: true,
    imports: [ToastItem, SharedModule],
    template: `
        @for (msg of messages; track msg; let i = $index) {
            <p-toastItem
                [message]="msg"
                [index]="i"
                [life]="life()"
                [clearAll]="clearAllTrigger()"
                (onClose)="onMessageClose($event)"
                (onAnimationEnd)="onAnimationEnd()"
                (onAnimationStart)="onAnimationStart()"
                [template]="messageTemplate()"
                [headlessTemplate]="headlessTemplate()"
                [pt]="pt"
                [unstyled]="unstyled()"
                [motionOptions]="computedMotionOptions()"
            ></p-toastItem>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [ToastStyle, { provide: TOAST_INSTANCE, useExisting: Toast }, { provide: PARENT_INSTANCE, useExisting: Toast }],
    host: {
        '[class]': "cx('root')",
        '[style]': "sx('root')",
        '[attr.data-p]': 'dataP()'
    },
    hostDirectives: [Bind]
})
export class Toast extends BaseComponent<ToastPassThrough> {
    componentName = 'Toast';

    $pcToast: Toast | undefined = inject(TOAST_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
    /**
     * Key of the message in case message is targeted to a specific toast component.
     * @group Props
     */
    key = input<string>();
    /**
     * Whether to automatically manage layering.
     * @group Props
     */
    autoZIndex = input(true, { transform: booleanAttribute });
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    baseZIndex = input(0, { transform: numberAttribute });
    /**
     * The default time to display messages for in milliseconds.
     * @group Props
     */
    life = input(3000, { transform: numberAttribute });
    /**
     * Position of the toast in viewport.
     * @group Props
     */
    position = input<ToastPositionType>('top-right');
    /**
     * It does not add the new message if there is already a toast displayed with the same content
     * @group Props
     */
    preventOpenDuplicates = input(false, { transform: booleanAttribute });
    /**
     * Displays only once a message with the same content.
     * @group Props
     */
    preventDuplicates = input(false, { transform: booleanAttribute });
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
     * Object literal to define styles per screen size.
     * @group Props
     */
    breakpoints = input<ToastBreakpoints>();
    /**
     * Callback to invoke when a message is closed.
     * @param {ToastCloseEvent} event - custom close event.
     * @group Emits
     */
    onClose = output<ToastCloseEvent>();
    /**
     * Custom message template.
     * @param {ToastMessageTemplateContext} context - message context.
     * @see {@link ToastMessageTemplateContext}
     * @group Templates
     */
    messageTemplate = contentChild<TemplateRef<ToastMessageTemplateContext>>('message');
    /**
     * Custom headless template.
     * @param {ToastHeadlessTemplateContext} context - headless context.
     * @see {@link ToastHeadlessTemplateContext}
     * @group Templates
     */
    headlessTemplate = contentChild<TemplateRef<ToastHeadlessTemplateContext>>('headless');

    messageSubscription: Subscription | undefined;

    clearSubscription: Subscription | undefined;

    messages: ToastMessageOptions[] | null | undefined;

    messagesArchieve: ToastMessageOptions[] | undefined;

    messageService = inject(MessageService);

    _componentStyle = inject(ToastStyle);

    styleElement: HTMLStyleElement | null = null;

    id: string = uuid('pn_id_');

    clearAllTrigger = signal<object | null>(null);

    dataP = computed(() => {
        const pos = this.position();
        return this.cn({
            [pos]: pos
        });
    });

    onInit() {
        this.messageSubscription = this.messageService.messageObserver.subscribe((messages) => {
            if (messages) {
                if (Array.isArray(messages)) {
                    const filteredMessages = messages.filter((m) => this.canAdd(m));
                    this.add(filteredMessages);
                } else if (this.canAdd(messages)) {
                    this.add([messages]);
                }
            }
        });

        this.clearSubscription = this.messageService.clearObserver.subscribe((key) => {
            if (key) {
                if (this.key() === key) {
                    this.clearAll();
                }
            } else {
                this.clearAll();
            }

            this.cd.markForCheck();
        });
    }

    clearAll() {
        // trigger signal to clear all messages
        this.clearAllTrigger.set({});
    }

    onAfterViewInit() {
        if (this.breakpoints()) {
            this.createStyle();
        }
    }

    add(messages: ToastMessageOptions[]): void {
        this.messages = this.messages ? [...this.messages, ...messages] : [...messages];

        if (this.preventDuplicates()) {
            this.messagesArchieve = this.messagesArchieve ? [...this.messagesArchieve, ...messages] : [...messages];
        }

        this.cd.markForCheck();
    }

    canAdd(message: ToastMessageOptions): boolean {
        let allow = this.key() === message.key;

        if (allow && this.preventOpenDuplicates()) {
            allow = !this.containsMessage(this.messages!, message);
        }

        if (allow && this.preventDuplicates()) {
            allow = !this.containsMessage(this.messagesArchieve!, message);
        }

        return allow;
    }

    containsMessage(collection: ToastMessageOptions[], message: ToastMessageOptions): boolean {
        if (!collection) {
            return false;
        }

        return (
            collection.find((m) => {
                return m.summary === message.summary && m.detail == message.detail && m.severity === message.severity;
            }) != null
        );
    }

    onMessageClose(event: ToastItemCloseEvent) {
        this.messages?.splice(event.index, 1);

        this.onClose.emit({
            message: event.message
        });
        this.onAnimationEnd();
        this.cd.detectChanges();
    }

    onAnimationStart() {
        this.renderer.setAttribute(this.el?.nativeElement, this.id, '');
        if (this.autoZIndex() && this.el?.nativeElement.style.zIndex === '') {
            ZIndexUtils.set('modal', this.el?.nativeElement, this.baseZIndex() || this.config.zIndex.modal);
        }
    }

    onAnimationEnd() {
        if (this.autoZIndex() && isEmpty(this.messages)) {
            ZIndexUtils.clear(this.el?.nativeElement);
        }
    }

    createStyle() {
        const bp = this.breakpoints();
        if (!this.styleElement) {
            const styleEl: HTMLStyleElement = this.renderer.createElement('style');
            setAttribute(styleEl, 'nonce', this.config?.csp()?.nonce);
            this.renderer.appendChild(this.document.head, styleEl);
            let innerHTML = '';
            for (let breakpoint in bp) {
                let breakpointStyle = '';
                for (let styleProp in bp![breakpoint]) {
                    breakpointStyle += styleProp + ':' + bp![breakpoint][styleProp] + ' !important;';
                }
                innerHTML += `
                    @media screen and (max-width: ${breakpoint}) {
                        .p-toast[${this.id}] {
                           ${breakpointStyle}
                        }
                    }
                `;
            }

            this.renderer.setProperty(styleEl, 'innerHTML', innerHTML);
            setAttribute(styleEl, 'nonce', this.config?.csp()?.nonce);
            this.styleElement = styleEl;
        }
    }

    destroyStyle() {
        if (this.styleElement) {
            this.renderer.removeChild(this.document.head, this.styleElement);
            this.styleElement = null;
        }
    }

    onDestroy() {
        if (this.messageSubscription) {
            this.messageSubscription.unsubscribe();
        }

        if (this.el && this.autoZIndex()) {
            ZIndexUtils.clear(this.el.nativeElement);
        }

        if (this.clearSubscription) {
            this.clearSubscription.unsubscribe();
        }

        this.destroyStyle();
    }
}

@NgModule({
    imports: [Toast, SharedModule],
    exports: [Toast, SharedModule]
})
export class ToastModule {}
