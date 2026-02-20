import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    effect,
    ElementRef,
    inject,
    input,
    linkedSignal,
    model,
    NgModule,
    numberAttribute,
    output,
    signal,
    TemplateRef,
    viewChild,
    ViewEncapsulation
} from '@angular/core';
import { MotionEvent, MotionOptions } from '@primeuix/motion';
import { findSingle, focus, removeClass } from '@primeuix/utils';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { blockBodyScroll, unblockBodyScroll } from 'primeng/dom';
import { FocusTrap } from 'primeng/focustrap';
import { MotionModule } from 'primeng/motion';
import type { CSSProperties } from 'primeng/types/shared';
import type { GalleriaCaptionTemplateContext, GalleriaIndicatorTemplateContext, GalleriaItemTemplateContext, GalleriaPassThrough, GalleriaPosition, GalleriaResponsiveOptions, GalleriaThumbnailTemplateContext } from 'primeng/types/galleria';
import { ZIndexUtils } from 'primeng/utils';
import { GalleriaContent } from './galleria-content';
import { GALLERIA_INSTANCE } from './galleria-token';
import { GalleriaStyle } from './style/galleriastyle';

/**
 * Galleria is an advanced content gallery component.
 * @group Components
 */
@Component({
    selector: 'p-galleria',
    standalone: true,
    imports: [GalleriaContent, BindModule, MotionModule, FocusTrap],
    template: `
        @if (fullScreen()) {
            <div #container>
                @if (renderMask()) {
                    <div
                        [pBind]="ptm('mask')"
                        [pMotion]="maskVisible"
                        [pMotionAppear]="true"
                        [pMotionEnterActiveClass]="maskEnterActiveClass()"
                        [pMotionLeaveActiveClass]="maskLeaveActiveClass()"
                        [pMotionOptions]="computedMaskMotionOptions()"
                        (pMotionOnAfterLeave)="onMaskAfterLeave()"
                        [class]="cn(cx('mask'), maskClass())"
                        [attr.role]="maskRole()"
                        [attr.aria-modal]="maskAriaModal()"
                        (click)="onMaskHide($event)"
                    >
                        @if (renderContent()) {
                            <div
                                pGalleriaContent
                                [pMotion]="visible()"
                                [pMotionAppear]="true"
                                [pMotionName]="'p-galleria'"
                                [pMotionOptions]="computedMotionOptions()"
                                (pMotionOnBeforeEnter)="onBeforeEnter($event)"
                                (pMotionOnBeforeLeave)="onBeforeLeave()"
                                (pMotionOnAfterLeave)="onAfterLeave()"
                                [value]="value()"
                                [activeIndex]="_activeIndex()"
                                [numVisible]="d_numVisible()"
                                (maskHide)="onMaskHide()"
                                (activeItemChange)="onActiveItemChange($event)"
                                [style]="containerStyle()"
                                [fullScreen]="fullScreen()"
                                [pt]="pt()"
                                pFocusTrap
                                [pFocusTrapDisabled]="!fullScreen()"
                                [unstyled]="unstyled()"
                            ></div>
                        }
                    </div>
                }
            </div>
        } @else {
            <div pGalleriaContent [pt]="pt()" [unstyled]="unstyled()" [value]="value()" [activeIndex]="_activeIndex()" [numVisible]="d_numVisible()" (activeItemChange)="onActiveItemChange($event)"></div>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [GalleriaStyle, { provide: GALLERIA_INSTANCE, useExisting: Galleria }, { provide: PARENT_INSTANCE, useExisting: Galleria }],
    hostDirectives: [Bind]
})
export class Galleria extends BaseComponent<GalleriaPassThrough> {
    componentName = 'Galleria';

    bindDirectiveInstance = inject(Bind, { self: true });

    $pcGalleria: Galleria | undefined = inject(GALLERIA_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptm('host'));
    }

    /**
     * Index of the first item.
     * @group Props
     */
    activeIndex = input(0, { transform: numberAttribute });

    /**
     * Whether to display the component on fullscreen.
     * @group Props
     */
    fullScreen = input(false, { transform: booleanAttribute });

    /**
     * Unique identifier of the element.
     * @group Props
     */
    id = input<string>();

    /**
     * An array of objects to display.
     * @group Props
     */
    value = input<any[]>();

    /**
     * Number of items per page.
     * @group Props
     */
    numVisible = input(3, { transform: numberAttribute });

    /**
     * An array of options for responsive design.
     * @see {GalleriaResponsiveOptions}
     * @group Props
     */
    responsiveOptions = input<GalleriaResponsiveOptions[]>();

    /**
     * Whether to display navigation buttons in item section.
     * @group Props
     */
    showItemNavigators = input(false, { transform: booleanAttribute });

    /**
     * Whether to display navigation buttons in thumbnail container.
     * @group Props
     */
    showThumbnailNavigators = input(true, { transform: booleanAttribute });

    /**
     * Whether to display navigation buttons on item hover.
     * @group Props
     */
    showItemNavigatorsOnHover = input(false, { transform: booleanAttribute });

    /**
     * When enabled, item is changed on indicator hover.
     * @group Props
     */
    changeItemOnIndicatorHover = input(false, { transform: booleanAttribute });

    /**
     * Defines if scrolling would be infinite.
     * @group Props
     */
    circular = input(false, { transform: booleanAttribute });

    /**
     * Items are displayed with a slideshow in autoPlay mode.
     * @group Props
     */
    autoPlay = input(false, { transform: booleanAttribute });

    /**
     * When enabled, autorun should stop by click.
     * @group Props
     */
    shouldStopAutoplayByClick = input(true, { transform: booleanAttribute });

    /**
     * Time in milliseconds to scroll items.
     * @group Props
     */
    transitionInterval = input(4000, { transform: numberAttribute });

    /**
     * Whether to display thumbnail container.
     * @group Props
     */
    showThumbnails = input(true, { transform: booleanAttribute });

    /**
     * Position of thumbnails.
     * @group Props
     */
    thumbnailsPosition = input<GalleriaPosition>('bottom');

    /**
     * Height of the viewport in vertical thumbnail.
     * @group Props
     */
    verticalThumbnailViewPortHeight = input('300px');

    /**
     * Whether to display indicator container.
     * @group Props
     */
    showIndicators = input(false, { transform: booleanAttribute });

    /**
     * When enabled, indicator container is displayed on item container.
     * @group Props
     */
    showIndicatorsOnItem = input(false, { transform: booleanAttribute });

    /**
     * Position of indicators.
     * @group Props
     */
    indicatorsPosition = input<GalleriaPosition>('bottom');

    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    baseZIndex = input(0, { transform: numberAttribute });

    /**
     * Style class of the mask on fullscreen mode.
     * @group Props
     */
    maskClass = input<string>();

    /**
     * Style class of the component on fullscreen mode. Otherwise, the 'class' property can be used.
     * @group Props
     */
    containerClass = input<string>();

    /**
     * Inline style of the component on fullscreen mode. Otherwise, the 'style' property can be used.
     * @group Props
     */
    containerStyle = input<CSSProperties>();

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
     * The mask motion options.
     * @group Props
     */
    maskMotionOptions = input<MotionOptions>();

    computedMaskMotionOptions = computed<MotionOptions>(() => {
        return {
            ...this.ptm('maskMotion'),
            ...this.maskMotionOptions()
        };
    });

    maskEnterActiveClass = computed(() => (this.fullScreen() ? 'p-overlay-mask-enter-active' : ''));

    maskLeaveActiveClass = computed(() => (this.fullScreen() ? 'p-overlay-mask-leave-active' : ''));

    maskRole = computed(() => (this.fullScreen() ? 'dialog' : 'region'));

    maskAriaModal = computed(() => (this.fullScreen() ? 'true' : undefined));

    /**
     * Specifies the visibility of the mask on fullscreen mode.
     * @group Props
     */
    visible = model(false);

    renderMask = signal<boolean>(false);

    renderContent = signal<boolean>(false);

    /**
     * Callback to invoke on active index change.
     * @param {number} number - Active index.
     * @group Emits
     */
    activeIndexChange = output<number>();

    container = viewChild<ElementRef>('container');

    _activeIndex = linkedSignal(() => this.activeIndex());

    /**
     * Custom header template.
     * @group Templates
     */
    headerTemplate = contentChild<TemplateRef<void>>('header', { descendants: false });

    /**
     * Custom footer template.
     * @group Templates
     */
    footerTemplate = contentChild<TemplateRef<void>>('footer', { descendants: false });

    /**
     * Custom indicator template.
     * @group Templates
     */
    indicatorTemplate = contentChild<TemplateRef<GalleriaIndicatorTemplateContext>>('indicator', { descendants: false });

    /**
     * Custom caption template.
     * @group Templates
     */
    captionTemplate = contentChild<TemplateRef<GalleriaCaptionTemplateContext>>('caption', { descendants: false });

    /**
     * Custom close icon template.
     * @group Templates
     */
    closeIconTemplate = contentChild<TemplateRef<void>>('closeicon', { descendants: false });

    /**
     * Custom previous thumbnail icon template.
     * @group Templates
     */
    previousThumbnailIconTemplate = contentChild<TemplateRef<void>>('previousthumbnailicon', { descendants: false });

    /**
     * Custom next thumbnail icon template.
     * @group Templates
     */
    nextThumbnailIconTemplate = contentChild<TemplateRef<void>>('nextthumbnailicon', { descendants: false });

    /**
     * Custom item previous icon template.
     * @group Templates
     */
    itemPreviousIconTemplate = contentChild<TemplateRef<void>>('itempreviousicon', { descendants: false });

    /**
     * Custom item next icon template.
     * @group Templates
     */
    itemNextIconTemplate = contentChild<TemplateRef<void>>('itemnexticon', { descendants: false });

    /**
     * Custom item template.
     * @group Templates
     */
    itemTemplate = contentChild<TemplateRef<GalleriaItemTemplateContext>>('item', { descendants: false });

    /**
     * Custom thumbnail template.
     * @group Templates
     */
    thumbnailTemplate = contentChild<TemplateRef<GalleriaThumbnailTemplateContext>>('thumbnail', { descendants: false });

    maskVisible = false;

    numVisibleLimit = signal(0);

    d_numVisible = computed(() => this.numVisibleLimit() || this.numVisible());

    _componentStyle = inject(GalleriaStyle);

    mask: HTMLElement | undefined;

    element = inject(ElementRef);

    constructor() {
        super();

        // Effect for visible changes
        effect(() => {
            const isVisible = this.visible();
            if (isVisible && !this.maskVisible) {
                this.maskVisible = true;
                this.renderMask.set(true);
                this.renderContent.set(true);
            } else if (!isVisible && this.maskVisible) {
                this.maskVisible = false;
            }
        });

        // Effect for value changes
        effect(() => {
            const val = this.value();
            if (val && val.length < this.numVisible()) {
                this.numVisibleLimit.set(val.length);
            } else {
                this.numVisibleLimit.set(0);
            }
        });
    }

    onMaskHide(event?: MouseEvent) {
        if (!event || event.target === event.currentTarget) {
            this.visible.set(false);
        }
    }

    onActiveItemChange(index: number) {
        if (this._activeIndex() !== index) {
            this._activeIndex.set(index);
            this.activeIndexChange.emit(index);
        }
    }

    onBeforeEnter(event: MotionEvent) {
        this.mask = <HTMLElement>event.element?.parentElement;
        this.enableModality();
        setTimeout(() => {
            const focusTarget = findSingle(this.container()?.nativeElement, '[data-pc-section="closebutton"]');
            if (focusTarget) focus(focusTarget as HTMLElement);
        }, 25);
    }

    onBeforeLeave() {
        if (this.mask) {
            this.maskVisible = false;
        }
    }

    onAfterLeave() {
        this.disableModality();
        this.renderContent.set(false);
    }

    onMaskAfterLeave() {
        if (!this.renderContent()) {
            this.renderMask.set(false);
        }
    }

    enableModality() {
        //@ts-ignore
        blockBodyScroll();
        if (this.mask) {
            ZIndexUtils.set('modal', this.mask, this.baseZIndex() || this.config.zIndex.modal);
        }
    }

    disableModality() {
        //@ts-ignore
        unblockBodyScroll();
        if (this.mask) {
            ZIndexUtils.clear(this.mask);
        }
    }

    onDestroy() {
        if (this.fullScreen()) {
            removeClass(this.document.body, 'p-overflow-hidden');
        }

        if (this.mask) {
            this.disableModality();
        }
    }
}

@NgModule({
    imports: [Galleria, SharedModule],
    exports: [Galleria, SharedModule]
})
export class GalleriaModule {}
