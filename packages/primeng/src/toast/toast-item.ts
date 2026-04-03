import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input, numberAttribute, output, signal, TemplateRef, ViewEncapsulation } from '@angular/core';
import { MotionEvent, MotionOptions } from '@primeuix/motion';
import { SharedModule, ToastMessageOptions } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { Check as CheckIcon } from '@primeicons/angular/check';
import { ExclamationTriangle as ExclamationTriangleIcon } from '@primeicons/angular/exclamation-triangle';
import { InfoCircle as InfoCircleIcon } from '@primeicons/angular/info-circle';
import { TimesCircle as TimesCircleIcon } from '@primeicons/angular/times-circle';
import { Times as TimesIcon } from '@primeicons/angular/times';
import { MotionModule } from 'primeng/motion';
import { ToastHeadlessTemplateContext, ToastItemCloseEvent, ToastMessageTemplateContext, ToastPassThrough } from 'primeng/types/toast';
import { ToastStyle } from './style/toaststyle';

@Component({
    selector: 'p-toast-item',
    standalone: true,
    imports: [NgTemplateOutlet, CheckIcon, ExclamationTriangleIcon, InfoCircleIcon, TimesIcon, TimesCircleIcon, SharedModule, Bind, MotionModule],
    template: `
        <div
            #container
            [pMotion]="visible()"
            [pMotionAppear]="true"
            [pMotionName]="motionName()"
            [pMotionOptions]="motionOptions()"
            (pMotionOnBeforeEnter)="onBeforeEnter($event)"
            (pMotionOnAfterEnter)="onAfterEnter()"
            (pMotionOnAfterLeave)="onAfterLeave($event)"
            [attr.id]="message()?.id"
            [pBind]="ptm('message')"
            [class]="cn(cx('message'), message()?.styleClass)"
            [style]="stackStyles()"
            (mouseenter)="onMouseEnter()"
            (mouseleave)="onMouseLeave()"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            [attr.data-p]="dataP()"
            [attr.data-stack]="dataStack()"
            [attr.data-mounted]="dataMounted()"
            [attr.data-front]="dataFront()"
            [attr.data-expanded]="dataExpanded()"
            [attr.data-visible]="dataVisible()"
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
     * Whether the toast is in stack mode.
     * @group Props
     */
    stackMode = input(false);
    /**
     * Whether the stack is expanded.
     * @group Props
     */
    stackExpanded = input(false);
    /**
     * Index of this toast in the stack.
     * @group Props
     */
    stackIndex = input(0, { transform: numberAttribute });
    /**
     * Total number of toasts in the stack.
     * @group Props
     */
    stackTotal = input(0, { transform: numberAttribute });
    /**
     * Cumulative offset for expanded state in pixels.
     * @group Props
     */
    stackOffset = input(0, { transform: numberAttribute });
    /**
     * Whether this toast is within the visible limit.
     * @group Props
     */
    stackIsVisible = input(false);
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
    /**
     * Emits when toast height is measured (for stack mode).
     * @group Emits
     */
    onHeightChange = output<{ index: number; height: number; removed?: boolean }>();

    _componentStyle = inject(ToastStyle);

    timeout: ReturnType<typeof setTimeout> | null = null;

    visible = signal<boolean | undefined>(undefined);

    showCloseButton = computed(() => this.message()?.closable !== false);

    private isDestroyed = false;

    private isClosing = false;

    mounted = signal(false);

    measuredHeight = signal(0);

    motionName = computed(() => (this.stackMode() ? 'p-toast-stack' : 'p-toast-message'));

    dataStack = computed(() => (this.stackMode() ? '' : null));

    dataMounted = computed(() => (this.stackMode() && this.mounted() ? '' : null));

    dataFront = computed(() => (this.stackMode() && this.stackIndex() === 0 ? '' : null));

    dataExpanded = computed(() => (this.stackMode() && this.stackExpanded() ? '' : null));

    dataVisible = computed(() => (this.stackMode() && this.stackIsVisible() ? '' : null));

    stackStyles = computed(() => {
        if (!this.stackMode()) return null;
        const idx = this.stackIndex();
        const total = this.stackTotal();
        return {
            '--toast-index': idx,
            '--toast-z-index': total - idx,
            '--initial-height': this.measuredHeight() + 'px',
            '--toast-offset': this.stackOffset() + 'px',
            'z-index': total - idx
        };
    });

    constructor() {
        super();

        effect(() => {
            if (this.clearAll()) {
                this.visible.set(false);
            }
        });

        effect(() => {
            if (this.stackMode()) {
                const expanded = this.stackExpanded();

                if (expanded) {
                    this.pauseStackTimer();
                } else {
                    this.startStackTimer();
                }
            }
        });
    }

    onBeforeEnter(event: MotionEvent) {
        this.onAnimationStart.emit(event.element as HTMLElement);
    }

    onAfterEnter() {
        if (this.stackMode() && !this.mounted()) {
            const el = this.el.nativeElement.querySelector('[data-stack]') as HTMLElement;
            if (el) {
                const orig = el.style.height;
                el.style.height = 'auto';
                const height = el.getBoundingClientRect().height;
                el.style.height = orig;
                this.measuredHeight.set(height);
                this.onHeightChange.emit({ index: this.index() as number, height });
            }
            this.mounted.set(true);
        }
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

        if (this.stackMode()) {
            this.visible.set(true);
        } else {
            this.initTimeout();
        }
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

    private remainingTime = 0;

    private timerStartTime = 0;

    startStackTimer() {
        const msg = this.message();
        if (msg?.sticky) return;
        this.clearTimeout();
        if (this.remainingTime <= 0) {
            this.remainingTime = msg?.life || this.life() || 3000;
        }
        this.timerStartTime = Date.now();
        this.timeout = setTimeout(() => {
            this.handleFocusOnRemove();
            this.closeStack();
        }, this.remainingTime);
    }

    pauseStackTimer() {
        if (this.timerStartTime > 0 && this.timeout) {
            const elapsed = Date.now() - this.timerStartTime;
            this.remainingTime = Math.max(0, this.remainingTime - elapsed);
        }
        this.clearTimeout();
    }

    clearTimeout() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }

    onMouseEnter() {
        if (!this.stackMode()) {
            this.clearTimeout();
        }
    }

    onMouseLeave() {
        if (!this.isClosing && !this.stackMode()) {
            this.initTimeout();
        }
    }

    onCloseIconClick = (event: Event) => {
        this.isClosing = true;
        this.clearTimeout();

        if (this.stackMode()) {
            this.handleFocusOnRemove();
            this.closeStack();
        } else {
            this.visible.set(false);
        }

        event.preventDefault();
    };

    private closeStack() {
        this.onHeightChange.emit({ index: this.index() as number, height: 0, removed: true });
        this.visible.set(false);
    }

    private handleFocusOnRemove() {
        const el = this.el.nativeElement;
        const activeEl = this.document.activeElement as HTMLElement;
        if (!el?.contains(activeEl)) return;
        const next = el.nextElementSibling?.querySelector('[data-pc-section="closebutton"]') as HTMLElement;
        const prev = el.previousElementSibling?.querySelector('[data-pc-section="closebutton"]') as HTMLElement;
        requestAnimationFrame(() => {
            if (next) next.focus({ preventScroll: true });
            else if (prev) prev.focus({ preventScroll: true });
        });
    }

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
