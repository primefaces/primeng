import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, ElementRef, HostListener, inject, InjectionToken, input, NgModule, output, signal, TemplateRef, viewChild, ViewEncapsulation } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { MotionEvent, MotionOptions } from '@primeuix/motion';
import { appendChild, focus } from '@primeuix/utils';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { blockBodyScroll, unblockBodyScroll } from 'primeng/dom';
import { FocusTrap } from 'primeng/focustrap';
import { EyeIcon, RefreshIcon, SearchMinusIcon, SearchPlusIcon, TimesIcon, UndoIcon } from 'primeng/icons';
import { MotionModule } from 'primeng/motion';
import type { AppendTo, CSSProperties } from 'primeng/types/shared';
import { Nullable } from 'primeng/ts-helpers';
import { ImageImageTemplateContext, ImagePassThrough, ImagePreviewTemplateContext } from 'primeng/types/image';
import { ZIndexUtils } from 'primeng/utils';
import { ImageStyle } from './style/imagestyle';

const IMAGE_INSTANCE = new InjectionToken<Image>('IMAGE_INSTANCE');

/**
 * Displays an image with preview and tranformation options. For multiple image, see Galleria.
 * @group Components
 */
@Component({
    selector: 'p-image',
    standalone: true,
    imports: [NgTemplateOutlet, RefreshIcon, EyeIcon, UndoIcon, SearchMinusIcon, SearchPlusIcon, TimesIcon, FocusTrap, SharedModule, BindModule, MotionModule],
    template: `
        @if (!imageTemplate()) {
            <img
                [attr.src]="src()"
                [attr.srcset]="srcSet()"
                [attr.sizes]="sizes()"
                [attr.alt]="alt()"
                [attr.width]="width()"
                [attr.height]="height()"
                [attr.loading]="loading()"
                [style]="imageStyle()"
                [class]="imageClass()"
                (error)="imageError($event)"
                [pBind]="ptm('image')"
            />
        }

        <ng-container *ngTemplateOutlet="imageTemplate(); context: imageTemplateContext()"></ng-container>

        @if (preview()) {
            <button [attr.aria-label]="zoomImageAriaLabel()" type="button" [class]="cx('previewMask')" (click)="onImageClick()" #previewButton [style]="previewMaskStyle()" [pBind]="ptm('previewMask')">
                @if (indicatorTemplate()) {
                    <ng-container *ngTemplateOutlet="indicatorTemplate()"></ng-container>
                } @else {
                    <svg data-p-icon="eye" [class]="cx('previewIcon')" [pBind]="ptm('previewIcon')" />
                }
            </button>
        }
        @if (renderMask()) {
            <div
                #mask
                [class]="cx('mask')"
                [attr.aria-modal]="maskVisible"
                role="dialog"
                (click)="onMaskClick()"
                (keydown)="onMaskKeydown($event)"
                pFocusTrap
                [pBind]="ptm('mask')"
                [pMotion]="maskVisible"
                [pMotionAppear]="true"
                [pMotionEnterActiveClass]="'p-overlay-mask-enter-active'"
                [pMotionLeaveActiveClass]="'p-overlay-mask-leave-active'"
                [pMotionOptions]="computedMaskMotionOptions()"
                (pMotionOnAfterLeave)="onMaskAfterLeave()"
            >
                <div [class]="cx('toolbar')" (click)="handleToolbarClick($event)" [pBind]="ptm('toolbar')">
                    <button [class]="cx('rotateRightButton')" (click)="rotateRight()" type="button" [attr.aria-label]="rightAriaLabel()" [pBind]="ptm('rotateRightButton')">
                        @if (!rotateRightIconTemplate()) {
                            <svg data-p-icon="refresh" />
                        }
                        <ng-container *ngTemplateOutlet="rotateRightIconTemplate()"></ng-container>
                    </button>
                    <button [class]="cx('rotateLeftButton')" (click)="rotateLeft()" type="button" [attr.aria-label]="leftAriaLabel()" [pBind]="ptm('rotateLeftButton')">
                        @if (!rotateLeftIconTemplate()) {
                            <svg data-p-icon="undo" />
                        }
                        <ng-container *ngTemplateOutlet="rotateLeftIconTemplate()"></ng-container>
                    </button>
                    <button [class]="cx('zoomOutButton')" (click)="zoomOut()" type="button" [disabled]="isZoomOutDisabled()" [attr.aria-label]="zoomOutAriaLabel()" [pBind]="ptm('zoomOutButton')">
                        @if (!zoomOutIconTemplate()) {
                            <svg data-p-icon="search-minus" />
                        }
                        <ng-container *ngTemplateOutlet="zoomOutIconTemplate()"></ng-container>
                    </button>
                    <button [class]="cx('zoomInButton')" (click)="zoomIn()" type="button" [disabled]="isZoomInDisabled()" [attr.aria-label]="zoomInAriaLabel()" [pBind]="ptm('zoomInButton')">
                        @if (!zoomInIconTemplate()) {
                            <svg data-p-icon="search-plus" />
                        }
                        <ng-container *ngTemplateOutlet="zoomInIconTemplate()"></ng-container>
                    </button>
                    <button [class]="cx('closeButton')" type="button" (click)="closePreview()" [attr.aria-label]="closeAriaLabel()" #closeButton [pBind]="ptm('closeButton')">
                        @if (!closeIconTemplate()) {
                            <svg data-p-icon="times" />
                        }
                        <ng-container *ngTemplateOutlet="closeIconTemplate()"></ng-container>
                    </button>
                </div>
                @if (renderPreview()) {
                    <p-motion [visible]="previewVisible" name="p-image-original" [appear]="true" [options]="computedMotionOptions()" (onBeforeEnter)="onAnimationStart($event)" (onBeforeLeave)="onBeforeLeave()" (onAfterLeave)="onAnimationEnd($event)">
                        @if (!previewTemplate()) {
                            <img
                                [attr.src]="previewImageSrc() ? previewImageSrc() : src()"
                                [attr.srcset]="previewImageSrcSet()"
                                [attr.sizes]="previewImageSizes()"
                                [class]="cx('original')"
                                [style]="imagePreviewStyle()"
                                (click)="onPreviewImageClick()"
                                [pBind]="ptm('original')"
                            />
                        }
                        <ng-container *ngTemplateOutlet="previewTemplate(); context: previewTemplateContext()"></ng-container>
                    </p-motion>
                }
            </div>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [ImageStyle, { provide: IMAGE_INSTANCE, useExisting: Image }, { provide: PARENT_INSTANCE, useExisting: Image }],
    host: {
        '[class]': "cx('root')"
    },
    hostDirectives: [Bind]
})
export class Image extends BaseComponent<ImagePassThrough> {
    componentName = 'Image';

    $pcImage: Image | undefined = inject(IMAGE_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    /**
     * Style class of the image element.
     * @group Props
     */
    imageClass = input<string>();

    /**
     * Inline style of the image element.
     * @group Props
     */
    imageStyle = input<CSSProperties>();

    /**
     * The source path for the main image.
     * @group Props
     */
    src = input<string | SafeUrl>();

    /**
     * The srcset definition for the main image.
     * @group Props
     */
    srcSet = input<string | SafeUrl>();

    /**
     * The sizes definition for the main image.
     * @group Props
     */
    sizes = input<string>();

    /**
     * The source path for the preview image.
     * @group Props
     */
    previewImageSrc = input<string | SafeUrl>();

    /**
     * The srcset definition for the preview image.
     * @group Props
     */
    previewImageSrcSet = input<string | SafeUrl>();

    /**
     * The sizes definition for the preview image.
     * @group Props
     */
    previewImageSizes = input<string>();

    /**
     * Attribute of the preview image element.
     * @group Props
     */
    alt = input<string>();

    /**
     * Attribute of the image element.
     * @group Props
     */
    width = input<string>();

    /**
     * Attribute of the image element.
     * @group Props
     */
    height = input<string>();

    /**
     * Attribute of the image element.
     * @group Props
     */
    loading = input<'lazy' | 'eager'>();

    /**
     * Controls the preview functionality.
     * @group Props
     */
    preview = input(false, { transform: booleanAttribute });

    /**
     * Enter animation class name of modal.
     * @defaultValue 'p-modal-enter'
     * @group Props
     */
    modalEnterAnimation = input<string | null | undefined>('p-modal-enter');

    /**
     * Leave animation class name of modal.
     * @defaultValue 'p-modal-leave'
     * @group Props
     */
    modalLeaveAnimation = input<string | null | undefined>('p-modal-leave');

    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @defaultValue 'self'
     * @group Props
     */
    appendTo = input<AppendTo>(undefined);

    /**
     * The motion options for the mask.
     * @group Props
     */
    maskMotionOptions = input<MotionOptions>();

    computedMaskMotionOptions = computed<MotionOptions>(() => {
        return {
            ...this.ptm('maskMotion'),
            ...this.maskMotionOptions()
        };
    });

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
     * Triggered when the preview overlay is shown.
     * @group Emits
     */
    onShow = output<any>();

    /**
     * Triggered when the preview overlay is hidden.
     * @group Emits
     */
    onHide = output<any>();

    /**
     * This event is triggered if an error occurs while loading an image file.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onImageError = output<Event>();

    mask = viewChild<ElementRef>('mask');

    previewButton = viewChild<ElementRef>('previewButton');

    closeButton = viewChild<ElementRef>('closeButton');

    /**
     * Custom indicator template.
     * @group Templates
     */
    indicatorTemplate = contentChild<TemplateRef<void>>('indicator', { descendants: false });

    /**
     * Custom rotate right icon template.
     * @group Templates
     */
    rotateRightIconTemplate = contentChild<TemplateRef<void>>('rotaterighticon', { descendants: false });

    /**
     * Custom rotate left icon template.
     * @group Templates
     */
    rotateLeftIconTemplate = contentChild<TemplateRef<void>>('rotatelefticon', { descendants: false });

    /**
     * Custom zoom out icon template.
     * @group Templates
     */
    zoomOutIconTemplate = contentChild<TemplateRef<void>>('zoomouticon', { descendants: false });

    /**
     * Custom zoom in icon template.
     * @group Templates
     */
    zoomInIconTemplate = contentChild<TemplateRef<void>>('zoominicon', { descendants: false });

    /**
     * Custom close icon template.
     * @group Templates
     */
    closeIconTemplate = contentChild<TemplateRef<void>>('closeicon', { descendants: false });

    /**
     * Custom preview template.
     * @group Templates
     */
    previewTemplate = contentChild<TemplateRef<ImagePreviewTemplateContext>>('preview', { descendants: false });

    /**
     * Custom image template.
     * @group Templates
     */
    imageTemplate = contentChild<TemplateRef<ImageImageTemplateContext>>('image', { descendants: false });

    renderMask = signal<boolean>(false);

    renderPreview = signal<boolean>(false);

    maskVisible: boolean = false;

    previewVisible: boolean = false;

    rotate = signal(0);

    scale = signal(1);

    previewClick: boolean = false;

    container: Nullable<HTMLElement>;

    wrapper: Nullable<HTMLElement>;

    _componentStyle = inject(ImageStyle);

    $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo());

    private zoomSettings = {
        default: 1,
        step: 0.1,
        max: 1.5,
        min: 0.5
    };

    private get aria() {
        return this.config.translation.aria;
    }

    isZoomOutDisabled = computed(() => this.scale() - this.zoomSettings.step <= this.zoomSettings.min);

    isZoomInDisabled = computed(() => this.scale() + this.zoomSettings.step >= this.zoomSettings.max);

    previewMaskStyle = computed(() => ({ height: this.height() + 'px', width: this.width() + 'px' }));

    imageTemplateContext() {
        return { errorCallback: this.imageError.bind(this) };
    }

    previewTemplateContext() {
        return {
            class: this.cx('original'),
            style: this.imagePreviewStyle(),
            previewCallback: this.onPreviewImageClick.bind(this)
        };
    }

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    onImageClick() {
        if (this.preview()) {
            this.maskVisible = true;
            this.previewVisible = true;
            this.renderMask.set(true);
            this.renderPreview.set(true);
            blockBodyScroll();
        }
    }

    onMaskClick() {
        if (!this.previewClick) {
            this.closePreview();
        }

        this.previewClick = false;
    }

    onMaskKeydown(event: KeyboardEvent) {
        switch (event.code) {
            case 'Escape':
                this.onMaskClick();
                setTimeout(() => {
                    focus(this.previewButton()?.nativeElement);
                }, 25);
                event.preventDefault();

                break;

            default:
                break;
        }
    }

    onPreviewImageClick() {
        this.previewClick = true;
    }

    rotateRight() {
        this.rotate.update((v) => v + 90);
        this.previewClick = true;
    }

    rotateLeft() {
        this.rotate.update((v) => v - 90);
        this.previewClick = true;
    }

    zoomIn() {
        this.scale.update((v) => v + this.zoomSettings.step);
        this.previewClick = true;
    }

    zoomOut() {
        this.scale.update((v) => v - this.zoomSettings.step);
        this.previewClick = true;
    }

    onAnimationStart(event: MotionEvent) {
        this.container = event.element as HTMLDivElement;
        this.wrapper = this.container?.parentElement;
        this.$attrSelector && this.wrapper?.setAttribute(this.$attrSelector, '');
        this.appendContainer();
        this.moveOnTop();
        this.onShow.emit({});
        setTimeout(() => {
            focus(this.closeButton()?.nativeElement);
        }, 25);
    }

    onBeforeLeave() {
        this.maskVisible = false;
    }

    onAnimationEnd() {
        this.renderPreview.set(false);
    }

    onMaskAfterLeave() {
        if (!this.renderPreview()) {
            this.renderMask.set(false);
        }
        ZIndexUtils.clear(this.wrapper);
        this.container = null;
        this.wrapper = null;
        this.rotate.set(0);
        this.scale.set(this.zoomSettings.default);
        unblockBodyScroll();
        this.onHide.emit({});
    }

    moveOnTop() {
        ZIndexUtils.set('modal', this.wrapper, this.config.zIndex.modal);
    }

    appendContainer() {
        if (this.$appendTo() && this.$appendTo() !== 'self') {
            if (this.$appendTo() === 'body' && this.wrapper) {
                this.document.body.appendChild(this.wrapper as HTMLElement);
            } else if (this.wrapper) {
                appendChild(this.$appendTo(), this.wrapper);
            }
        }
    }

    imagePreviewStyle() {
        return { transform: 'rotate(' + this.rotate() + 'deg) scale(' + this.scale() + ')' };
    }

    zoomImageAriaLabel() {
        return this.aria?.zoomImage;
    }

    handleToolbarClick(event: MouseEvent) {
        event.stopPropagation();
    }

    closePreview() {
        this.previewVisible = false;
    }

    imageError(event: Event) {
        this.onImageError.emit(event);
    }

    rightAriaLabel() {
        return this.aria?.rotateRight;
    }

    leftAriaLabel() {
        return this.aria?.rotateLeft;
    }

    zoomInAriaLabel() {
        return this.aria?.zoomIn;
    }

    zoomOutAriaLabel() {
        return this.aria?.zoomOut;
    }

    closeAriaLabel() {
        return this.aria?.close;
    }

    @HostListener('document:keydown.escape') onKeydownHandler() {
        if (this.previewVisible) {
            this.closePreview();
        }
    }
}

@NgModule({
    imports: [Image, SharedModule],
    exports: [Image, SharedModule]
})
export class ImageModule {}
