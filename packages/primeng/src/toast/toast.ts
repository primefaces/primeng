import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, inject, InjectionToken, input, NgModule, numberAttribute, output, signal, TemplateRef, ViewEncapsulation } from '@angular/core';
import { MotionOptions } from '@primeuix/motion';
import { isEmpty, setAttribute, uuid } from '@primeuix/utils';
import { MessageService, SharedModule, ToastMessageOptions } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { ToastBreakpoints, ToastCloseEvent, ToastHeadlessTemplateContext, ToastItemCloseEvent, ToastMessageTemplateContext, ToastPassThrough, ToastPositionType } from 'primeng/types/toast';
import { ZIndexUtils } from 'primeng/utils';
import { Subscription } from 'rxjs';
import { ToastStyle } from './style/toaststyle';
import { ToastItem } from './toast-item';

const TOAST_INSTANCE = new InjectionToken<Toast>('TOAST_INSTANCE');

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
