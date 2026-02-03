import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, ElementRef, HostListener, inject, InjectionToken, input, NgModule, NgZone, numberAttribute, output, TemplateRef, ViewEncapsulation, ViewRef } from '@angular/core';
import { MotionEvent, MotionOptions } from '@primeuix/motion';
import { $dt } from '@primeuix/styled';
import { absolutePosition, addClass, appendChild, findSingle, getOffset, isIOS, isTouchDevice } from '@primeuix/utils';
import { OverlayService, SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { ConnectedOverlayScrollHandler } from 'primeng/dom';
import { MotionModule } from 'primeng/motion';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import { PopoverContentTemplateContext, PopoverPassThrough } from 'primeng/types/popover';
import { ZIndexUtils } from 'primeng/utils';
import { Subscription } from 'rxjs';
import { PopoverStyle } from './style/popoverstyle';

const POPOVER_INSTANCE = new InjectionToken<Popover>('POPOVER_INSTANCE');

/**
 * Popover is a container component that can overlay other components on page.
 * @group Components
 */
@Component({
    selector: 'p-popover',
    standalone: true,
    imports: [NgTemplateOutlet, SharedModule, Bind, MotionModule],
    providers: [PopoverStyle, { provide: POPOVER_INSTANCE, useExisting: Popover }, { provide: PARENT_INSTANCE, useExisting: Popover }],
    hostDirectives: [Bind],
    template: `
        @if (render) {
            <div
                [pBind]="ptm('root')"
                [class]="cn(cx('root'), styleClass())"
                [style]="sx('root')"
                [ngStyle]="style()"
                (click)="onOverlayClick($event)"
                role="dialog"
                [attr.aria-modal]="overlayVisible"
                [attr.aria-label]="ariaLabel()"
                [attr.aria-labelledBy]="ariaLabelledBy()"
                [pMotion]="overlayVisible"
                pMotionName="p-anchored-overlay"
                [pMotionAppear]="true"
                (pMotionOnEnter)="onAnimationStart($event)"
                (pMotionOnAfterLeave)="onAnimationEnd()"
                [pMotionOptions]="computedMotionOptions()"
            >
                <div [pBind]="ptm('content')" [class]="cx('content')" (click)="onContentClick($event)" (mousedown)="onContentClick($event)">
                    <ng-content></ng-content>
                    @if (contentTemplate()) {
                        <ng-container *ngTemplateOutlet="contentTemplate(); context: { closeCallback: onCloseClick.bind(this) }"></ng-container>
                    }
                </div>
            </div>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class Popover extends BaseComponent<PopoverPassThrough> {
    componentName = 'Popover';

    $pcPopover: Popover | undefined = inject(POPOVER_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptm('host'));
    }

    /**
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    ariaLabel = input<string>();
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy = input<string>();
    /**
     * Enables to hide the overlay when outside is clicked.
     * @group Props
     */
    dismissable = input(true, { transform: booleanAttribute });
    /**
     * Inline style of the component.
     * @group Props
     */
    style = input<{ [klass: string]: any } | null>();
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass = input<string>();
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @defaultValue 'body'
     * @group Props
     */
    appendTo = input<HTMLElement | ElementRef | TemplateRef<any> | 'self' | 'body' | null | undefined | any>('body');
    /**
     * Whether to automatically manage layering.
     * @group Props
     */
    autoZIndex = input(true, { transform: booleanAttribute });
    /**
     * Aria label of the close icon.
     * @group Props
     */
    ariaCloseLabel = input<string>();
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    baseZIndex = input(0, { transform: numberAttribute });
    /**
     * When enabled, first button receives focus on show.
     * @group Props
     */
    focusOnShow = input(true, { transform: booleanAttribute });
    /**
     * Transition options of the show animation.
     * @group Props
     * @deprecated since v21.0.0. Use `motionOptions` instead.
     */
    showTransitionOptions = input<string>('.12s cubic-bezier(0, 0, 0.2, 1)');
    /**
     * Transition options of the hide animation.
     * @group Props
     * @deprecated since v21.0.0. Use `motionOptions` instead.
     */
    hideTransitionOptions = input<string>('.1s linear');
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
     * Callback to invoke when an overlay becomes visible.
     * @group Emits
     */
    onShow = output<any>();
    /**
     * Callback to invoke when an overlay gets hidden.
     * @group Emits
     */
    onHide = output<any>();

    $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo());

    container: Nullable<HTMLDivElement>;

    overlayVisible: boolean = false;

    render: boolean = false;

    selfClick: boolean = false;

    documentClickListener: VoidListener;

    target: any;

    willHide: Nullable<boolean>;

    scrollHandler: Nullable<ConnectedOverlayScrollHandler>;

    documentResizeListener: VoidListener;

    /**
     * Custom content template.
     * @param {PopoverContentTemplateContext} context - content context.
     * @see {@link PopoverContentTemplateContext}
     * @group Templates
     */
    contentTemplate = contentChild<TemplateRef<PopoverContentTemplateContext>>('content');

    destroyCallback: Nullable<Function>;

    overlayEventListener: Nullable<(event?: any) => void>;

    overlaySubscription: Subscription | undefined;

    _componentStyle = inject(PopoverStyle);

    zone = inject(NgZone);

    overlayService = inject(OverlayService);

    bindDocumentClickListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.documentClickListener) {
                let documentEvent = isIOS() ? 'touchstart' : 'click';
                const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : this.document;

                this.documentClickListener = this.renderer.listen(documentTarget, documentEvent, (event) => {
                    if (!this.dismissable()) {
                        return;
                    }

                    if (!this.container?.contains(event.target) && this.target !== event.target && !this.target.contains(event.target) && !this.selfClick) {
                        this.hide();
                    }

                    this.selfClick = false;
                    this.cd.markForCheck();
                });
            }
        }
    }

    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
            this.selfClick = false;
        }
    }

    /**
     * Toggles the visibility of the panel.
     * @param {Event} event - Browser event
     * @param {Target} target - Target element.
     * @group Method
     */
    toggle(event: any, target?: any) {
        if (this.overlayVisible) {
            if (this.hasTargetChanged(event, target)) {
                this.destroyCallback = () => {
                    this.show(null, target || event.currentTarget || event.target);
                };
            }

            this.hide();
        } else {
            this.show(event, target);
        }
    }
    /**
     * Displays the panel.
     * @param {Event} event - Browser event
     * @param {Target} target - Target element.
     * @group Method
     */
    show(event: any, target?: any) {
        target && event && event.stopPropagation();

        // Clear container if it exists from previous show
        if (this.container && !this.overlayVisible) {
            this.container = null;
        }

        this.target = target || event.currentTarget || event.target;
        this.overlayVisible = true;
        this.render = true;
        this.cd.markForCheck();
    }

    onOverlayClick(event: MouseEvent) {
        this.overlayService.add({
            originalEvent: event,
            target: this.el.nativeElement
        });

        this.selfClick = true;
    }

    onContentClick(event: MouseEvent) {
        const targetElement = event.target as HTMLElement;
        this.selfClick = event.offsetX < targetElement.clientWidth && event.offsetY < targetElement.clientHeight;
    }

    hasTargetChanged(event: any, target: any) {
        return this.target != null && this.target !== (target || event.currentTarget || event.target);
    }

    appendOverlay() {
        if (this.$appendTo() && this.$appendTo() !== 'self') {
            if (this.$appendTo() === 'body') {
                appendChild(this.document.body, this.container!);
            } else {
                appendChild(this.$appendTo(), this.container!);
            }
        }
    }

    restoreAppend() {
        if (this.container && this.$appendTo() && this.$appendTo() !== 'self') {
            appendChild(this.el.nativeElement, this.container);
        }
    }

    setZIndex() {
        if (this.autoZIndex()) {
            ZIndexUtils.set('overlay', this.container, this.baseZIndex() + this.config.zIndex.overlay);
        }
    }

    align() {
        if (this.target && this.container) {
            absolutePosition(this.container, this.target, false);

            const containerOffset = <any>getOffset(this.container);
            const targetOffset = <any>getOffset(this.target);
            const borderRadius = this.document.defaultView?.getComputedStyle(this.container).getPropertyValue('border-radius');
            let arrowLeft = 0;

            if (containerOffset.left < targetOffset.left) {
                arrowLeft = targetOffset.left - containerOffset.left - parseFloat(borderRadius!) * 2;
            }
            this.container.style.setProperty($dt('popover.arrow.left').name, `${arrowLeft}px`);

            if (containerOffset.top < targetOffset.top) {
                this.container.setAttribute('data-p-popover-flipped', 'true');
                !this.$unstyled() && addClass(this.container, 'p-popover-flipped');
            }
        }
    }

    onAnimationStart(event: MotionEvent) {
        this.container = event.element as HTMLDivElement;
        this.container?.setAttribute(this.$attrSelector, '');
        this.appendOverlay();
        this.align();
        this.setZIndex();
        this.bindDocumentClickListener();
        this.bindDocumentResizeListener();
        this.bindScrollListener();

        if (this.focusOnShow()) {
            this.focus();
        }

        this.overlayEventListener = (e) => {
            if (this.container && this.container.contains(e.target)) {
                this.selfClick = true;
            }
        };

        this.overlaySubscription = this.overlayService.clickObservable.subscribe(this.overlayEventListener);
        this.onShow.emit(null);
    }

    onAnimationEnd() {
        if (!this.overlayVisible) {
            if (this.destroyCallback) {
                this.destroyCallback();
                this.destroyCallback = null;
            }

            if (this.overlaySubscription) {
                this.overlaySubscription.unsubscribe();
            }

            if (this.autoZIndex()) {
                ZIndexUtils.clear(this.container);
            }

            this.onContainerDestroy();
            this.onHide.emit({});
            this.render = false;
            this.container = null;
        }
    }

    focus() {
        let focusable = <any>findSingle(this.container!, '[autofocus]');
        if (focusable) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => focusable.focus(), 5);
            });
        }
    }
    /**
     * Hides the panel.
     * @group Method
     */
    hide() {
        this.overlayVisible = false;
        this.cd.markForCheck();
    }

    onCloseClick(event: MouseEvent) {
        this.hide();
        event.preventDefault();
    }

    @HostListener('document:keydown.escape', ['$event'])
    onEscapeKeydown(_event: KeyboardEvent) {
        this.hide();
    }

    onWindowResize() {
        if (this.overlayVisible && !isTouchDevice()) {
            this.hide();
        }
    }

    bindDocumentResizeListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.documentResizeListener) {
                const window = this.document.defaultView as Window;
                this.documentResizeListener = this.renderer.listen(window, 'resize', this.onWindowResize.bind(this));
            }
        }
    }

    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            this.documentResizeListener();
            this.documentResizeListener = null;
        }
    }

    bindScrollListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.scrollHandler) {
                this.scrollHandler = new ConnectedOverlayScrollHandler(this.target, () => {
                    if (this.overlayVisible) {
                        this.hide();
                    }
                });
            }

            this.scrollHandler.bindScrollListener();
        }
    }

    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }

    onContainerDestroy() {
        if (!(this.cd as ViewRef).destroyed) {
            this.target = null;
        }

        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
    }

    onDestroy() {
        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }

        if (this.container && this.autoZIndex()) {
            ZIndexUtils.clear(this.container);
        }

        if (!(this.cd as ViewRef).destroyed) {
            this.target = null;
        }

        this.destroyCallback = null;
        if (this.container) {
            this.restoreAppend();
            this.onContainerDestroy();
        }

        if (this.overlaySubscription) {
            this.overlaySubscription.unsubscribe();
        }
    }
}

@NgModule({
    imports: [Popover, SharedModule],
    exports: [Popover, SharedModule]
})
export class PopoverModule {}
