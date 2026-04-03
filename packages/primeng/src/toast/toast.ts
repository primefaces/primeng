import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, inject, InjectionToken, input, NgModule, numberAttribute, output, signal, TemplateRef, ViewEncapsulation } from '@angular/core';
import { MotionOptions } from '@primeuix/motion';
import { isEmpty, setAttribute, uuid } from '@primeuix/utils';
import { MessageService, SharedModule, ToastMessageOptions } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { ToastBreakpoints, ToastCloseEvent, ToastHeadlessTemplateContext, ToastItemCloseEvent, ToastMessageTemplateContext, ToastModeType, ToastPassThrough, ToastPositionType } from 'primeng/types/toast';
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
            <p-toast-item
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
                [stackMode]="isStackMode()"
                [stackExpanded]="expanded()"
                [stackIndex]="getStackIndex(i)"
                [stackTotal]="stackTotal()"
                [stackOffset]="getStackOffset(i)"
                [stackIsVisible]="isStackVisible(i)"
                (onHeightChange)="onItemHeightChange($event)"
            ></p-toast-item>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [ToastStyle, { provide: TOAST_INSTANCE, useExisting: Toast }, { provide: PARENT_INSTANCE, useExisting: Toast }],
    host: {
        '[class]': "cx('root')",
        '[style]': "sx('root')",
        '[attr.data-p]': 'dataP()',
        '[attr.data-expanded]': 'hostDataExpanded()',
        '[style.--gap.px]': 'stackGapVar()',
        '[style.--front-toast-height.px]': 'stackFrontHeightVar()',
        '[style.--raise-factor]': 'stackRaiseFactorVar()',
        '(mouseenter)': 'onContainerMouseEnter()',
        '(mouseleave)': 'onContainerMouseLeave($event)'
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
     * Display mode of the toast.
     * @group Props
     */
    mode = input<ToastModeType>('single');
    /**
     * Gap between stacked toast items in pixels.
     * @group Props
     */
    stackGap = input(8, { transform: numberAttribute });
    /**
     * Maximum number of visible toasts in the stack.
     * @group Props
     */
    stackVisibleLimit = input(3, { transform: numberAttribute });
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
    messageTemplate = contentChild<TemplateRef<ToastMessageTemplateContext>>('message', { descendants: false });
    /**
     * Custom headless template.
     * @param {ToastHeadlessTemplateContext} context - headless context.
     * @see {@link ToastHeadlessTemplateContext}
     * @group Templates
     */
    headlessTemplate = contentChild<TemplateRef<ToastHeadlessTemplateContext>>('headless', { descendants: false });

    messageSubscription: Subscription | undefined;

    clearSubscription: Subscription | undefined;

    messages: ToastMessageOptions[] | null | undefined;

    messageArchive: ToastMessageOptions[] | undefined;

    messageService = inject(MessageService);

    _componentStyle = inject(ToastStyle);

    styleElement: HTMLStyleElement | null = null;

    id: string = uuid('pn_id_');

    clearAllTrigger = signal<object | null>(null);

    expanded = signal(false);

    removingCount = signal(0);

    heights = signal<{ index: number; height: number }[]>([]);

    // Single sorted source — all stack computeds derive from this
    sortedHeights = computed(() => [...this.heights()].sort((a, b) => b.index - a.index));

    frontToastHeight = computed(() => this.sortedHeights()[0]?.height ?? 0);

    stackOffsets = computed(() => {
        const sorted = this.sortedHeights();
        const offsets: number[] = [0];
        for (let i = 1; i < sorted.length; i++) {
            offsets[i] = offsets[i - 1] + sorted[i - 1].height;
        }
        return offsets;
    });

    visualStackIndices = computed(() => {
        const map = new Map<number, number>();
        this.sortedHeights().forEach((entry, idx) => map.set(entry.index, idx));
        return map;
    });

    visibleIndices = computed(
        () =>
            new Set(
                this.sortedHeights()
                    .slice(0, this.stackVisibleLimit())
                    .map((x) => x.index)
            )
    );

    raiseFactor = computed(() => {
        const pos = this.position();
        return pos.startsWith('bottom') ? -1 : 1;
    });

    isStackMode = computed(() => this.mode() === 'stack');

    hostDataExpanded = computed(() => (this.isStackMode() && this.expanded() ? '' : null));

    stackGapVar = computed(() => (this.isStackMode() ? this.stackGap() : null));

    stackFrontHeightVar = computed(() => (this.isStackMode() ? this.frontToastHeight() : null));

    stackRaiseFactorVar = computed(() => (this.isStackMode() ? this.raiseFactor() : null));

    stackTotal = computed(() => this.messages?.length ?? 0);

    getStackIndex(domIndex: number): number {
        return this.visualStackIndices().get(domIndex) ?? (this.messages?.length ?? 0) - 1 - domIndex;
    }

    getStackOffset(domIndex: number): number {
        const visualIdx = this.visualStackIndices().get(domIndex) ?? 0;
        return this.stackOffsets()[visualIdx] ?? 0;
    }

    isStackVisible(domIndex: number): boolean {
        return this.visibleIndices().has(domIndex);
    }

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
        this.clearAllTrigger.set({});
        this.heights.set([]);
        this.removingCount.set(0);
        this.expanded.set(false);
        this.messageArchive = undefined;
    }

    onAfterViewInit() {
        if (this.breakpoints()) {
            this.createStyle();
        }
    }

    add(messages: ToastMessageOptions[]): void {
        this.messages = this.messages ? [...this.messages, ...messages] : [...messages];

        if (this.preventDuplicates()) {
            this.messageArchive = this.messageArchive ? [...this.messageArchive, ...messages] : [...messages];
        }

        this.cd.markForCheck();
    }

    canAdd(message: ToastMessageOptions): boolean {
        let allow = this.key() === message.key;

        if (allow && this.preventOpenDuplicates()) {
            allow = !this.containsMessage(this.messages ?? [], message);
        }

        if (allow && this.preventDuplicates()) {
            allow = !this.containsMessage(this.messageArchive ?? [], message);
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

        if (this.isStackMode()) {
            this.heights.update((h) => h.filter((x) => x.index !== event.index).map((x) => (x.index > event.index ? { ...x, index: x.index - 1 } : x)));
            this.removingCount.update((c) => Math.max(0, c - 1));
            if ((this.messages?.length ?? 0) <= 1) {
                this.expanded.set(false);
            }
        }

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

    onContainerMouseEnter() {
        if (this.isStackMode()) {
            this.expanded.set(true);
        }
    }

    onContainerMouseLeave(event: MouseEvent) {
        if (this.isStackMode()) {
            const container = this.el?.nativeElement;
            const relatedTarget = event.relatedTarget as Node | null;
            if (relatedTarget && container?.contains(relatedTarget)) {
                return;
            }
            if (this.removingCount() > 0) {
                return;
            }
            this.expanded.set(false);
        }
    }

    onItemHeightChange(event: { index: number; height: number; removed?: boolean }) {
        if (event.removed) {
            this.heights.update((h) => h.filter((x) => x.index !== event.index));
            this.removingCount.update((c) => c + 1);
            return;
        }
        this.heights.update((h) => {
            const existing = h.findIndex((x) => x.index === event.index);
            if (existing >= 0) {
                const copy = [...h];
                copy[existing] = event;
                return copy;
            }
            return [...h, event].sort((a, b) => a.index - b.index);
        });
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
