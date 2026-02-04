import { isPlatformBrowser, NgStyle, NgTemplateOutlet } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    effect,
    ElementRef,
    inject,
    InjectionToken,
    input,
    model,
    NgModule,
    NgZone,
    numberAttribute,
    output,
    signal,
    TemplateRef,
    untracked,
    viewChild,
    ViewEncapsulation,
    ViewRef
} from '@angular/core';
import { MotionEvent, MotionOptions } from '@primeuix/motion';
import { addStyle, appendChild, getOuterHeight, getOuterWidth, getViewport, hasClass, removeClass, setAttribute, uuid } from '@primeuix/utils';
import { SharedModule, TranslationKeys } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { Button, ButtonProps } from 'primeng/button';
import { blockBodyScroll, DomHandler, unblockBodyScroll } from 'primeng/dom';
import { FocusTrap } from 'primeng/focustrap';
import { TimesIcon, WindowMaximizeIcon, WindowMinimizeIcon } from 'primeng/icons';
import { MotionModule } from 'primeng/motion';
import type { AppendTo, CSSProperties } from 'primeng/types/shared';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import { DialogPassThrough, DialogPosition } from 'primeng/types/dialog';
import { ZIndexUtils } from 'primeng/utils';
import { DialogStyle } from './style/dialogstyle';

const DIALOG_INSTANCE = new InjectionToken<Dialog>('DIALOG_INSTANCE');

/**
 * Dialog is a container to display content in an overlay window.
 * @group Components
 */
@Component({
    selector: 'p-dialog',
    standalone: true,
    imports: [NgStyle, NgTemplateOutlet, Button, FocusTrap, TimesIcon, WindowMaximizeIcon, WindowMinimizeIcon, SharedModule, Bind, MotionModule],
    template: `
        @if (renderMask()) {
            <div
                [class]="cn(cx('mask'), maskStyleClass())"
                [style]="sx('mask')"
                [pBind]="ptm('mask')"
                [pMotion]="maskVisible"
                [pMotionAppear]="true"
                [pMotionEnterActiveClass]="maskEnterActiveClass()"
                [pMotionLeaveActiveClass]="maskLeaveActiveClass()"
                [pMotionOptions]="computedMaskMotionOptions()"
                (pMotionOnAfterLeave)="onMaskAfterLeave()"
                [attr.data-p-scrollblocker-active]="modal() || blockScroll()"
                [attr.data-p]="dataP()"
            >
                @if (renderDialog()) {
                    <div
                        #container
                        [class]="cn(cx('root'), styleClass())"
                        [style]="sx('root')"
                        [ngStyle]="style()"
                        [pBind]="ptm('root')"
                        pFocusTrap
                        [pFocusTrapDisabled]="focusTrap() === false"
                        [pMotion]="visible()"
                        [pMotionAppear]="true"
                        [pMotionName]="'p-dialog'"
                        [pMotionOptions]="computedMotionOptions()"
                        (pMotionOnBeforeEnter)="onBeforeEnter($event)"
                        (pMotionOnAfterEnter)="onAfterEnter($event)"
                        (pMotionOnBeforeLeave)="onBeforeLeave($event)"
                        (pMotionOnAfterLeave)="onAfterLeave($event)"
                        [attr.role]="role()"
                        [attr.aria-labelledby]="ariaLabelledBy"
                        [attr.aria-modal]="true"
                        [attr.data-p]="dataP()"
                    >
                        @if (headlessTemplate()) {
                            <ng-container *ngTemplateOutlet="headlessTemplate()"></ng-container>
                        } @else {
                            @if (resizable()) {
                                <div [class]="cx('resizeHandle')" [pBind]="ptm('resizeHandle')" [style.z-index]="90" (mousedown)="initResize($event)"></div>
                            }
                            @if (showHeader()) {
                                <div #titlebar [class]="cx('header')" [pBind]="ptm('header')" (mousedown)="initDrag($event)">
                                    @if (!headerTemplate()) {
                                        <span [id]="ariaLabelledBy" [class]="cx('title')" [pBind]="ptm('title')">{{ header() }}</span>
                                    }
                                    <ng-container *ngTemplateOutlet="headerTemplate(); context: { ariaLabelledBy: ariaLabelledBy }"></ng-container>
                                    <div [class]="cx('headerActions')" [pBind]="ptm('headerActions')">
                                        @if (maximizable()) {
                                            <p-button
                                                [pt]="ptm('pcMaximizeButton')"
                                                [styleClass]="cx('pcMaximizeButton')"
                                                [ariaLabel]="maximizeButtonAriaLabel()"
                                                (onClick)="maximize()"
                                                (keydown.enter)="maximize()"
                                                [tabindex]="maximizeButtonTabindex()"
                                                [buttonProps]="maximizeButtonProps()"
                                                [unstyled]="unstyled()"
                                                [attr.data-pc-group-section]="'headericon'"
                                            >
                                                <ng-template #icon>
                                                    @if (showToggleIcon()) {
                                                        <span [ngClass]="toggleIcon()"></span>
                                                    }
                                                    @if (showDefaultMaximizeIcon()) {
                                                        @if (showMaximizeSvg()) {
                                                            <svg data-p-icon="window-maximize" />
                                                        }
                                                        @if (showMinimizeSvg()) {
                                                            <svg data-p-icon="window-minimize" />
                                                        }
                                                    }
                                                    @if (showMaximizeIconTemplate()) {
                                                        <ng-container *ngTemplateOutlet="maximizeIconTemplate()"></ng-container>
                                                    }
                                                    @if (showMinimizeIconTemplate()) {
                                                        <ng-container *ngTemplateOutlet="minimizeIconTemplate()"></ng-container>
                                                    }
                                                </ng-template>
                                            </p-button>
                                        }
                                        @if (closable()) {
                                            <p-button
                                                [pt]="ptm('pcCloseButton')"
                                                [styleClass]="cx('pcCloseButton')"
                                                [ariaLabel]="closeAriaLabel()"
                                                (onClick)="close($event)"
                                                (keydown.enter)="close($event)"
                                                [tabindex]="closeTabindex()"
                                                [buttonProps]="closeButtonProps()"
                                                [unstyled]="unstyled()"
                                                [attr.data-pc-group-section]="'headericon'"
                                            >
                                                <ng-template #icon>
                                                    @if (showDefaultCloseIcon) {
                                                        @if (closeIcon()) {
                                                            <span [class]="closeIcon()"></span>
                                                        } @else {
                                                            <svg data-p-icon="times" />
                                                        }
                                                    }
                                                    @if (closeIconTemplate()) {
                                                        <ng-container *ngTemplateOutlet="closeIconTemplate()"></ng-container>
                                                    }
                                                </ng-template>
                                            </p-button>
                                        }
                                    </div>
                                </div>
                            }
                            <div #content [class]="cn(cx('content'), contentStyleClass())" [ngStyle]="contentStyle()" [pBind]="ptm('content')">
                                <ng-content></ng-content>
                                @if (contentTemplate()) {
                                    <ng-container *ngTemplateOutlet="contentTemplate()"></ng-container>
                                }
                            </div>
                            @if (footerTemplate()) {
                                <div #footer [class]="cx('footer')" [pBind]="ptm('footer')">
                                    <ng-content select="p-footer"></ng-content>
                                    <ng-container *ngTemplateOutlet="footerTemplate()"></ng-container>
                                </div>
                            }
                        }
                    </div>
                }
            </div>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [DialogStyle, { provide: DIALOG_INSTANCE, useExisting: Dialog }, { provide: PARENT_INSTANCE, useExisting: Dialog }],
    hostDirectives: [Bind]
})
export class Dialog extends BaseComponent<DialogPassThrough> {
    componentName = 'Dialog';

    hostName = input<string>('');

    $pcDialog: Dialog | undefined = inject(DIALOG_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptm('host'));
    }

    /**
     * Title text of the dialog.
     * @group Props
     */
    header = input<string>();
    /**
     * Enables dragging to change the position using header.
     * @group Props
     */
    draggable = input(true, { transform: booleanAttribute });
    /**
     * Enables resizing of the content.
     * @group Props
     */
    resizable = input(true, { transform: booleanAttribute });
    /**
     * Style of the content section.
     * @group Props
     */
    contentStyle = input<CSSProperties>();
    /**
     * Style class of the content.
     * @group Props
     */
    contentStyleClass = input<string>();
    /**
     * Defines if background should be blocked when dialog is displayed.
     * @group Props
     */
    modal = input(false, { transform: booleanAttribute });
    /**
     * Specifies if pressing escape key should hide the dialog.
     * @group Props
     */
    closeOnEscape = input(true, { transform: booleanAttribute });
    /**
     * Specifies if clicking the modal background should hide the dialog.
     * @group Props
     */
    dismissableMask = input(false, { transform: booleanAttribute });
    /**
     * When enabled dialog is displayed in RTL direction.
     * @group Props
     */
    rtl = input(false, { transform: booleanAttribute });
    /**
     * Adds a close icon to the header to hide the dialog.
     * @group Props
     */
    closable = input(true, { transform: booleanAttribute });
    /**
     * Object literal to define widths per screen size.
     * @group Props
     */
    breakpoints = input<Record<string, string>>();
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass = input<string>();
    /**
     * Style class of the mask.
     * @group Props
     */
    maskStyleClass = input<string>();
    /**
     * Style of the mask.
     * @group Props
     */
    maskStyle = input<CSSProperties>();
    /**
     * Whether to show the header or not.
     * @group Props
     */
    showHeader = input(true, { transform: booleanAttribute });
    /**
     * Whether background scroll should be blocked when dialog is visible.
     * @group Props
     */
    blockScroll = input(false, { transform: booleanAttribute });
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
     * Minimum value for the left coordinate of dialog in dragging.
     * @group Props
     */
    minX = input(0, { transform: numberAttribute });
    /**
     * Minimum value for the top coordinate of dialog in dragging.
     * @group Props
     */
    minY = input(0, { transform: numberAttribute });
    /**
     * When enabled, first focusable element receives focus on show.
     * @group Props
     */
    focusOnShow = input(true, { transform: booleanAttribute });
    /**
     * Whether the dialog can be displayed full screen.
     * @group Props
     */
    maximizable = input(false, { transform: booleanAttribute });
    /**
     * Keeps dialog in the viewport.
     * @group Props
     */
    keepInViewport = input(true, { transform: booleanAttribute });
    /**
     * When enabled, can only focus on elements inside the dialog.
     * @group Props
     */
    focusTrap = input(true, { transform: booleanAttribute });
    /**
     * The motion options for the mask.
     * @group Props
     */
    maskMotionOptions = input<MotionOptions | undefined>(undefined);

    computedMaskMotionOptions = computed<MotionOptions>(() => {
        return {
            ...this.ptm('maskMotion'),
            ...this.maskMotionOptions()
        };
    });

    maskEnterActiveClass = computed(() => (this.modal() ? 'p-overlay-mask-enter-active' : ''));

    maskLeaveActiveClass = computed(() => (this.modal() ? 'p-overlay-mask-leave-active' : ''));
    /**
     * The motion options.
     * @group Props
     */
    motionOptions = input<MotionOptions | undefined>(undefined);

    computedMotionOptions = computed<MotionOptions>(() => {
        return {
            ...this.ptm('motion'),
            ...this.motionOptions()
        };
    });
    /**
     * Name of the close icon.
     * @group Props
     */
    closeIcon = input<string>();
    /**
     * Defines a string that labels the close button for accessibility.
     * @group Props
     */
    closeAriaLabel = input<string>();
    /**
     * Index of the close button in tabbing order.
     * @group Props
     */
    closeTabindex = input<string>('0');
    /**
     * Name of the minimize icon.
     * @group Props
     */
    minimizeIcon = input<string>();
    /**
     * Name of the maximize icon.
     * @group Props
     */
    maximizeIcon = input<string>();
    /**
     * Used to pass all properties of the ButtonProps to the Button component.
     * @group Props
     */
    closeButtonProps = input<ButtonProps>({
        severity: 'secondary',
        variant: 'text',
        rounded: true
    });
    /**
     * Used to pass all properties of the ButtonProps to the Button component.
     * @group Props
     */
    maximizeButtonProps = input<ButtonProps>({
        severity: 'secondary',
        variant: 'text',
        rounded: true
    });
    /**
     * Specifies the visibility of the dialog.
     * @group Props
     */
    visible = model<boolean>(false);
    /**
     * Inline style of the component.
     * @group Props
     */
    style = input<CSSProperties>();
    /**
     * Position of the dialog, options are "center", "top", "bottom", "left", "right", "topleft", "topright", "bottomleft" or "bottomright".
     * @group Props
     */
    position = input<DialogPosition>();
    /**
     * Role attribute of html element.
     * @group Emits
     */
    role = input<string>('dialog');
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @defaultValue 'self'
     * @group Props
     */
    appendTo = input<AppendTo>(undefined);
    /**
     * Callback to invoke when dialog is shown.
     * @group Emits
     */
    onShow = output<any>();
    /**
     * Callback to invoke when dialog is hidden.
     * @group Emits
     */
    onHide = output<any>();
    /**
     * Callback to invoke when dialog resizing is initiated.
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    onResizeInit = output<MouseEvent>();
    /**
     * Callback to invoke when dialog resizing is completed.
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    onResizeEnd = output<MouseEvent>();
    /**
     * Callback to invoke when dialog dragging is completed.
     * @param {DragEvent} event - Drag event.
     * @group Emits
     */
    onDragEnd = output<DragEvent>();
    /**
     * Callback to invoke when dialog maximized or unmaximized.
     * @group Emits
     */
    onMaximize = output<{ maximized: boolean | undefined }>();

    headerViewChild = viewChild<ElementRef>('titlebar');

    contentViewChild = viewChild<ElementRef>('content');

    footerViewChild = viewChild<ElementRef>('footer');

    /**
     * Custom header template.
     * @group Templates
     */
    headerTemplate = contentChild<TemplateRef<void>>('header');

    /**
     * Custom content template.
     * @group Templates
     */
    contentTemplate = contentChild<TemplateRef<void>>('content');

    /**
     * Custom footer template.
     * @group Templates
     */
    footerTemplate = contentChild<TemplateRef<void>>('footer');

    /**
     * Custom close icon template.
     * @group Templates
     */
    closeIconTemplate = contentChild<TemplateRef<void>>('closeicon');

    /**
     * Custom maximize icon template.
     * @group Templates
     */
    maximizeIconTemplate = contentChild<TemplateRef<void>>('maximizeicon');

    /**
     * Custom minimize icon template.
     * @group Templates
     */
    minimizeIconTemplate = contentChild<TemplateRef<void>>('minimizeicon');

    /**
     * Custom headless template.
     * @group Templates
     */
    headlessTemplate = contentChild<TemplateRef<void>>('headless');

    $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo());

    renderMask = signal<boolean>(false);

    renderDialog = signal<boolean>(false);

    maskVisible: boolean | undefined;

    container = signal<Nullable<HTMLElement>>(null);

    wrapper: Nullable<HTMLElement>;

    dragging: boolean | undefined;

    ariaLabelledBy: string | null = this.getAriaLabelledBy();

    documentDragListener: VoidListener;

    documentDragEndListener: VoidListener;

    resizing: boolean | undefined;

    documentResizeListener: VoidListener;

    documentResizeEndListener: VoidListener;

    documentEscapeListener: VoidListener;

    maskClickListener: VoidListener;

    lastPageX: number | undefined;

    lastPageY: number | undefined;

    preventVisibleChangePropagation: boolean | undefined;

    maximized = signal(false);

    preMaximizeContentHeight: number | undefined;

    preMaximizeContainerWidth: number | undefined;

    preMaximizeContainerHeight: number | undefined;

    preMaximizePageX: number | undefined;

    preMaximizePageY: number | undefined;

    id: string = uuid('pn_id_');

    _style: Record<string, string> = {};

    originalStyle: Record<string, string> | undefined;

    styleElement: HTMLStyleElement | null = null;

    _componentStyle = inject(DialogStyle);

    private zIndexForLayering?: number;

    get maximizeLabel(): string {
        return this.config.getTranslation(TranslationKeys.ARIA)['maximizeLabel'];
    }

    get minimizeLabel(): string {
        return this.config.getTranslation(TranslationKeys.ARIA)['minimizeLabel'];
    }

    maximizeButtonAriaLabel = computed(() => (this.maximized() ? this.minimizeLabel : this.maximizeLabel));

    maximizeButtonTabindex = computed(() => (this.maximizable() ? '0' : '-1'));

    toggleIcon = computed(() => (this.maximized() ? this.minimizeIcon() : this.maximizeIcon()));

    showToggleIcon = computed(() => !!this.maximizeIcon() && !this.maximizeIconTemplate() && !this.minimizeIconTemplate());

    showDefaultMaximizeIcon = computed(() => !this.maximizeIcon() && !this.maximizeButtonProps()?.icon);

    showMaximizeSvg = computed(() => !this.maximized() && !this.maximizeIconTemplate());

    showMinimizeSvg = computed(() => this.maximized() && !this.minimizeIconTemplate());

    showMaximizeIconTemplate = computed(() => !this.maximized() && !!this.maximizeIconTemplate());

    showMinimizeIconTemplate = computed(() => this.maximized() && !!this.minimizeIconTemplate());

    showDefaultCloseIcon = computed(() => !this.closeIconTemplate() && !this.closeButtonProps()?.icon);

    zone: NgZone = inject(NgZone);

    constructor() {
        super();
        effect(() => {
            const isVisible = this.visible();
            untracked(() => {
                if (isVisible && !this.maskVisible) {
                    this.maskVisible = true;
                    this.renderMask.set(true);
                    this.renderDialog.set(true);
                }
            });
        });
    }

    onInit() {
        if (this.breakpoints()) {
            this.createStyle();
        }
    }

    getAriaLabelledBy() {
        return this.header() !== null ? uuid('pn_id_') + '_header' : null;
    }

    _focus(focusParentElement?: HTMLElement): boolean {
        if (focusParentElement) {
            let _focusableElements = DomHandler.getFocusableElements(focusParentElement);
            if (_focusableElements && _focusableElements.length > 0) {
                _focusableElements[0].focus();
                return true;
            }
        }

        return false;
    }

    focus(focusParentElement?: HTMLElement) {
        const element = focusParentElement ?? this.contentViewChild()?.nativeElement;
        let focused = this._focus(element);

        if (!focused) {
            focused = this._focus(this.footerViewChild()?.nativeElement);
            if (!focused) {
                focused = this._focus(this.headerViewChild()?.nativeElement);
                if (!focused) {
                    this._focus(this.contentViewChild()?.nativeElement);
                }
            }
        }
    }

    close(event: Event) {
        this.visible.set(false);
        event.preventDefault();
    }

    enableModality() {
        if (this.closable() && this.dismissableMask()) {
            this.maskClickListener = this.renderer.listen(this.wrapper, 'mousedown', (event: MouseEvent) => {
                if (this.wrapper && this.wrapper.isSameNode(event.target as Node)) {
                    this.close(event);
                }
            });
        }

        if (this.modal()) {
            blockBodyScroll();
        }
    }

    disableModality() {
        if (this.wrapper) {
            if (this.dismissableMask()) {
                this.unbindMaskClickListener();
            }

            // for nested dialogs w/modal
            const scrollBlockers = document.querySelectorAll('[data-p-scrollblocker-active="true"]');

            if (this.modal() && scrollBlockers && scrollBlockers.length == 1) {
                unblockBodyScroll();
            }

            if (!(this.cd as ViewRef).destroyed) {
                this.cd.detectChanges();
            }
        }
    }

    maximize() {
        this.maximized.update((v) => !v);

        if (!this.modal() && !this.blockScroll()) {
            if (this.maximized()) {
                blockBodyScroll();
            } else {
                unblockBodyScroll();
            }
        }

        this.onMaximize.emit({ maximized: this.maximized() });
    }

    unbindMaskClickListener() {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    }

    moveOnTop() {
        if (this.autoZIndex()) {
            ZIndexUtils.set('modal', this.container(), this.baseZIndex() + this.config.zIndex.modal);
            (this.wrapper as HTMLElement).style.zIndex = String(parseInt((this.container() as HTMLDivElement).style.zIndex, 10) - 1);
        } else {
            this.zIndexForLayering = ZIndexUtils.generateZIndex('modal', (this.baseZIndex() ?? 0) + this.config.zIndex.modal);
        }
    }

    createStyle() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.styleElement && !this.$unstyled()) {
                const styleElement = this.renderer.createElement('style') as HTMLStyleElement;
                setAttribute(styleElement, 'nonce', this.config?.csp()?.nonce);
                this.renderer.appendChild(this.document.head, styleElement);
                let innerHTML = '';
                for (let breakpoint in this.breakpoints()) {
                    innerHTML += `
                        @media screen and (max-width: ${breakpoint}) {
                            .p-dialog[${this.id}]:not(.p-dialog-maximized) {
                                width: ${this.breakpoints()![breakpoint]} !important;
                            }
                        }
                    `;
                }

                this.renderer.setProperty(styleElement, 'innerHTML', innerHTML);
                setAttribute(styleElement, 'nonce', this.config?.csp()?.nonce);
                this.styleElement = styleElement;
            }
        }
    }

    initDrag(event: MouseEvent) {
        const target = event.target as HTMLElement;
        const closestDiv = target.closest('div');

        if (closestDiv?.getAttribute('data-pc-section') === 'headeractions') {
            return;
        }

        if (this.draggable()) {
            this.dragging = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;

            (this.container() as HTMLDivElement).style.margin = '0';
            this.document.body.setAttribute('data-p-unselectable-text', 'true');
            !this.$unstyled() && addStyle(this.document.body, { 'user-select': 'none' });
        }
    }

    onDrag(event: MouseEvent) {
        if (this.dragging && this.container()) {
            const containerWidth = getOuterWidth(this.container() as HTMLDivElement);
            const containerHeight = getOuterHeight(this.container() as HTMLDivElement);
            const deltaX = event.pageX - (this.lastPageX as number);
            const deltaY = event.pageY - (this.lastPageY as number);
            const offset = this.container()!.getBoundingClientRect();

            const containerComputedStyle = getComputedStyle(this.container() as HTMLDivElement);

            const leftMargin = parseFloat(containerComputedStyle.marginLeft);
            const topMargin = parseFloat(containerComputedStyle.marginTop);

            const leftPos = offset.left + deltaX - leftMargin;
            const topPos = offset.top + deltaY - topMargin;
            const viewport = getViewport();

            this.container()!.style.position = 'fixed';

            if (this.keepInViewport()) {
                if (leftPos >= this.minX() && leftPos + containerWidth < viewport.width) {
                    this._style.left = `${leftPos}px`;
                    this.lastPageX = event.pageX;
                    this.container()!.style.left = `${leftPos}px`;
                }

                if (topPos >= this.minY() && topPos + containerHeight < viewport.height) {
                    this._style.top = `${topPos}px`;
                    this.lastPageY = event.pageY;
                    this.container()!.style.top = `${topPos}px`;
                }
            } else {
                this.lastPageX = event.pageX;
                this.container()!.style.left = `${leftPos}px`;
                this.lastPageY = event.pageY;
                this.container()!.style.top = `${topPos}px`;
            }
        }
    }

    endDrag(event: DragEvent) {
        if (this.dragging) {
            this.dragging = false;
            this.document.body.removeAttribute('data-p-unselectable-text');
            !this.$unstyled() && (this.document.body.style['user-select'] = '');
            this.cd.detectChanges();
            this.onDragEnd.emit(event);
        }
    }

    resetPosition() {
        (this.container() as HTMLDivElement).style.position = '';
        (this.container() as HTMLDivElement).style.left = '';
        (this.container() as HTMLDivElement).style.top = '';
        (this.container() as HTMLDivElement).style.margin = '';
    }

    //backward compatibility
    center() {
        this.resetPosition();
    }

    initResize(event: MouseEvent) {
        if (this.resizable()) {
            this.resizing = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;

            this.document.body.setAttribute('data-p-unselectable-text', 'true');
            !this.$unstyled() && addStyle(this.document.body, { 'user-select': 'none' });
            this.onResizeInit.emit(event);
        }
    }

    onResize(event: MouseEvent) {
        if (this.resizing) {
            let deltaX = event.pageX - (this.lastPageX as number);
            let deltaY = event.pageY - (this.lastPageY as number);
            let containerWidth = getOuterWidth(this.container() as HTMLDivElement);
            let containerHeight = getOuterHeight(this.container() as HTMLDivElement);
            let contentHeight = getOuterHeight(this.contentViewChild()?.nativeElement);
            let newWidth = containerWidth + deltaX;
            let newHeight = containerHeight + deltaY;
            let minWidth = (this.container() as HTMLDivElement).style.minWidth;
            let minHeight = (this.container() as HTMLDivElement).style.minHeight;
            let offset = (this.container() as HTMLDivElement).getBoundingClientRect();
            let viewport = getViewport();
            let hasBeenDragged = !parseInt((this.container() as HTMLDivElement).style.top) || !parseInt((this.container() as HTMLDivElement).style.left);

            if (hasBeenDragged) {
                newWidth += deltaX;
                newHeight += deltaY;
            }

            if ((!minWidth || newWidth > parseInt(minWidth)) && offset.left + newWidth < viewport.width) {
                this._style.width = newWidth + 'px';
                (this.container() as HTMLDivElement).style.width = this._style.width;
            }

            if ((!minHeight || newHeight > parseInt(minHeight)) && offset.top + newHeight < viewport.height) {
                this.contentViewChild()!.nativeElement.style.height = contentHeight + newHeight - containerHeight + 'px';

                if (this._style.height) {
                    this._style.height = newHeight + 'px';
                    (this.container() as HTMLDivElement).style.height = this._style.height;
                }
            }

            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    }

    resizeEnd(event: MouseEvent) {
        if (this.resizing) {
            this.resizing = false;
            this.document.body.removeAttribute('data-p-unselectable-text');
            !this.$unstyled() && (this.document.body.style['user-select'] = '');
            this.onResizeEnd.emit(event);
        }
    }

    bindGlobalListeners() {
        if (this.draggable()) {
            this.bindDocumentDragListener();
            this.bindDocumentDragEndListener();
        }

        if (this.resizable()) {
            this.bindDocumentResizeListeners();
        }

        if (this.closeOnEscape() && this.closable()) {
            this.bindDocumentEscapeListener();
        }
    }

    unbindGlobalListeners() {
        this.unbindDocumentDragListener();
        this.unbindDocumentDragEndListener();
        this.unbindDocumentResizeListeners();
        this.unbindDocumentEscapeListener();
    }

    bindDocumentDragListener() {
        if (!this.documentDragListener) {
            this.zone.runOutsideAngular(() => {
                this.documentDragListener = this.renderer.listen(this.document.defaultView, 'mousemove', this.onDrag.bind(this));
            });
        }
    }

    unbindDocumentDragListener() {
        if (this.documentDragListener) {
            this.documentDragListener();
            this.documentDragListener = null;
        }
    }

    bindDocumentDragEndListener() {
        if (!this.documentDragEndListener) {
            this.zone.runOutsideAngular(() => {
                this.documentDragEndListener = this.renderer.listen(this.document.defaultView, 'mouseup', this.endDrag.bind(this));
            });
        }
    }

    unbindDocumentDragEndListener() {
        if (this.documentDragEndListener) {
            this.documentDragEndListener();
            this.documentDragEndListener = null;
        }
    }

    bindDocumentResizeListeners() {
        if (!this.documentResizeListener && !this.documentResizeEndListener) {
            this.zone.runOutsideAngular(() => {
                this.documentResizeListener = this.renderer.listen(this.document.defaultView, 'mousemove', this.onResize.bind(this));
                this.documentResizeEndListener = this.renderer.listen(this.document.defaultView, 'mouseup', this.resizeEnd.bind(this));
            });
        }
    }

    unbindDocumentResizeListeners() {
        if (this.documentResizeListener && this.documentResizeEndListener) {
            this.documentResizeListener();
            this.documentResizeEndListener();
            this.documentResizeListener = null;
            this.documentResizeEndListener = null;
        }
    }

    bindDocumentEscapeListener() {
        const documentTarget = this.el ? this.el.nativeElement.ownerDocument : this.document;

        this.documentEscapeListener = this.renderer.listen(documentTarget, 'keydown', (event: KeyboardEvent) => {
            if (event.key == 'Escape') {
                const container = this.container();
                if (!container) {
                    return;
                }
                const currentZIndex = ZIndexUtils.getCurrent();
                if (parseInt(container.style.zIndex) == currentZIndex || this.zIndexForLayering == currentZIndex) {
                    this.close(event);
                }
            }
        });
    }

    unbindDocumentEscapeListener() {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
    }

    appendContainer() {
        if (this.$appendTo() !== 'self') {
            appendChild(this.document.body, this.wrapper as HTMLElement);
        }
    }

    restoreAppend() {
        if (this.container() && this.$appendTo() !== 'self') {
            this.renderer.appendChild(this.el.nativeElement, this.wrapper);
        }
    }

    onBeforeEnter(event: MotionEvent) {
        this.container.set(event.element as HTMLDivElement);
        this.wrapper = this.container()?.parentElement;
        this.$attrSelector && this.container()?.setAttribute(this.$attrSelector, '');
        this.appendContainer();
        this.moveOnTop();
        this.bindGlobalListeners();
        this.container()?.setAttribute(this.id, '');

        if (this.modal()) {
            this.enableModality();
        }
    }

    onAfterEnter() {
        if (this.focusOnShow()) {
            this.focus();
        }

        this.onShow.emit({});
    }

    onBeforeLeave() {
        if (this.modal()) {
            this.maskVisible = false;
        }
    }

    onAfterLeave() {
        this.onContainerDestroy();
        this.renderDialog.set(false);

        if (this.modal()) {
            this.renderMask.set(false);
        } else {
            this.maskVisible = false;
        }

        this.onHide.emit({});
    }

    onMaskAfterLeave() {
        if (!this.renderDialog()) {
            this.renderMask.set(false);
        }
    }

    onContainerDestroy() {
        this.unbindGlobalListeners();
        this.dragging = false;

        if (this.maximized()) {
            removeClass(this.document.body, 'p-overflow-hidden');
            this.document.body.style.removeProperty('--scrollbar-width');
            this.maximized.set(false);
        }

        if (this.modal()) {
            this.disableModality();
        }

        if (hasClass(this.document.body, 'p-overflow-hidden')) {
            removeClass(this.document.body, 'p-overflow-hidden');
        }

        if (this.container() && this.autoZIndex()) {
            ZIndexUtils.clear(this.container());
        }
        if (this.zIndexForLayering) {
            ZIndexUtils.revertZIndex(this.zIndexForLayering);
        }

        this.container.set(null);
        this.wrapper = null;

        this._style = this.originalStyle ? { ...this.originalStyle } : {};
    }

    destroyStyle() {
        if (this.styleElement) {
            this.renderer.removeChild(this.document.head, this.styleElement);
            this.styleElement = null;
        }
    }

    onDestroy() {
        if (this.container()) {
            this.restoreAppend();
            this.onContainerDestroy();
        }

        this.destroyStyle();
    }

    dataP = computed(() =>
        this.cn({
            maximized: this.maximized(),
            modal: this.modal()
        })
    );
}

@NgModule({
    imports: [Dialog, SharedModule],
    exports: [Dialog, SharedModule]
})
export class DialogModule {}
