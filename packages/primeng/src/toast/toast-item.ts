import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input, numberAttribute, output, signal, TemplateRef, ViewEncapsulation } from '@angular/core';
import { MotionEvent, MotionOptions } from '@primeuix/motion';
import { SharedModule, ToastMessageOptions } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { CheckIcon, ExclamationTriangleIcon, InfoCircleIcon, TimesCircleIcon, TimesIcon } from 'primeng/icons';
import { MotionModule } from 'primeng/motion';
import { ToastHeadlessTemplateContext, ToastItemCloseEvent, ToastMessageTemplateContext, ToastPassThrough } from 'primeng/types/toast';
import { ToastStyle } from './style/toaststyle';

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
                    @if (showCloseButton()) {
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

    showCloseButton = computed(() => this.message()?.closable !== false);

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
