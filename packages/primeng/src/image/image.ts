import { CommonModule } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    HostListener,
    inject,
    InjectionToken,
    input,
    Input,
    NgModule,
    Output,
    QueryList,
    signal,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { MotionEvent, MotionOptions } from '@primeuix/motion';
import { appendChild, focus } from '@primeuix/utils';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { blockBodyScroll, unblockBodyScroll } from 'primeng/dom';
import { FocusTrap } from 'primeng/focustrap';
import { EyeIcon, RefreshIcon, SearchMinusIcon, SearchPlusIcon, TimesIcon, UndoIcon } from 'primeng/icons';
import { MotionModule } from 'primeng/motion';
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
    imports: [CommonModule, RefreshIcon, EyeIcon, UndoIcon, SearchMinusIcon, SearchPlusIcon, TimesIcon, FocusTrap, SharedModule, BindModule, MotionModule],
    template: `
        <ng-container *ngIf="!imageTemplate && !_imageTemplate">
            <img
                [attr.src]="src"
                [attr.srcset]="srcSet"
                [attr.sizes]="sizes"
                [attr.alt]="alt"
                [attr.width]="width"
                [attr.height]="height"
                [attr.loading]="loading"
                [ngStyle]="imageStyle"
                [class]="imageClass"
                (error)="imageError($event)"
                [pBind]="ptm('image')"
            />
        </ng-container>

        <ng-container *ngTemplateOutlet="imageTemplate || _imageTemplate; context: { errorCallback: imageError.bind(this) }"></ng-container>

        <button *ngIf="preview" [attr.aria-label]="zoomImageAriaLabel" type="button" [class]="cx('previewMask')" (click)="onImageClick()" #previewButton [ngStyle]="{ height: height + 'px', width: width + 'px' }" [pBind]="ptm('previewMask')">
            <ng-container *ngIf="indicatorTemplate || _indicatorTemplate; else defaultTemplate">
                <ng-container *ngTemplateOutlet="indicatorTemplate || _indicatorTemplate"></ng-container>
            </ng-container>
            <ng-template #defaultTemplate>
                <svg data-p-icon="eye" [class]="cx('previewIcon')" [pBind]="ptm('previewIcon')" />
            </ng-template>
        </button>
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
                        <svg data-p-icon="refresh" *ngIf="!rotateRightIconTemplate && !_rotateRightIconTemplate" />
                        <ng-template *ngTemplateOutlet="rotateRightIconTemplate || _rotateRightIconTemplate"></ng-template>
                    </button>
                    <button [class]="cx('rotateLeftButton')" (click)="rotateLeft()" type="button" [attr.aria-label]="leftAriaLabel()" [pBind]="ptm('rotateLeftButton')">
                        <svg data-p-icon="undo" *ngIf="!rotateLeftIconTemplate && !_rotateLeftIconTemplate" />
                        <ng-template *ngTemplateOutlet="rotateLeftIconTemplate || _rotateLeftIconTemplate"></ng-template>
                    </button>
                    <button [class]="cx('zoomOutButton')" (click)="zoomOut()" type="button" [disabled]="isZoomOutDisabled" [attr.aria-label]="zoomOutAriaLabel()" [pBind]="ptm('zoomOutButton')">
                        <svg data-p-icon="search-minus" *ngIf="!zoomOutIconTemplate && !_zoomOutIconTemplate" />
                        <ng-template *ngTemplateOutlet="zoomOutIconTemplate || _zoomOutIconTemplate"></ng-template>
                    </button>
                    <button [class]="cx('zoomInButton')" (click)="zoomIn()" type="button" [disabled]="isZoomInDisabled" [attr.aria-label]="zoomInAriaLabel()" [pBind]="ptm('zoomInButton')">
                        <svg data-p-icon="search-plus" *ngIf="!zoomInIconTemplate && !_zoomInIconTemplate" />
                        <ng-template *ngTemplateOutlet="zoomInIconTemplate || _zoomInIconTemplate"></ng-template>
                    </button>
                    <button [class]="cx('closeButton')" type="button" (click)="closePreview()" [attr.aria-label]="closeAriaLabel()" #closeButton [pBind]="ptm('closeButton')">
                        <svg data-p-icon="times" *ngIf="!closeIconTemplate && !_closeIconTemplate" />
                        <ng-template *ngTemplateOutlet="closeIconTemplate || _closeIconTemplate"></ng-template>
                    </button>
                </div>
                @if (renderPreview()) {
                    <p-motion [visible]="previewVisible" name="p-image-original" [appear]="true" [options]="computedMotionOptions()" (onBeforeEnter)="onAnimationStart($event)" (onBeforeLeave)="onBeforeLeave()" (onAfterLeave)="onAnimationEnd($event)">
                        <ng-container *ngIf="!previewTemplate && !_previewTemplate">
                            <img
                                [attr.src]="previewImageSrc ? previewImageSrc : src"
                                [attr.srcset]="previewImageSrcSet"
                                [attr.sizes]="previewImageSizes"
                                [class]="cx('original')"
                                [ngStyle]="imagePreviewStyle()"
                                (click)="onPreviewImageClick()"
                                [pBind]="ptm('original')"
                            />
                        </ng-container>
                        <ng-container
                            *ngTemplateOutlet="
                                previewTemplate || _previewTemplate;
                                context: {
                                    class: cx('original'),
                                    style: imagePreviewStyle(),
                                    previewCallback: onPreviewImageClick.bind(this)
                                }
                            "
                        >
                        </ng-container>
                    </p-motion>
                }
            </div>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [ImageStyle, { provide: IMAGE_INSTANCE, useExisting: Image }, { provide: PARENT_INSTANCE, useExisting: Image }],
    host: {
        '[class]': "cn(cx('root'),styleClass)"
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
    @Input() imageClass: string | undefined;
    /**
     * Inline style of the image element.
     * @group Props
     */
    @Input() imageStyle: { [klass: string]: any } | null | undefined;
    /**
     * Class of the element.
     * @deprecated since v20.0.0, use `class` instead.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * The source path for the main image.
     * @group Props
     */
    @Input() src: string | SafeUrl | undefined;
    /**
     * The srcset definition for the main image.
     * @group Props
     */
    @Input() srcSet: string | SafeUrl | undefined;
    /**
     * The sizes definition for the main image.
     * @group Props
     */
    @Input() sizes: string | undefined;
    /**
     * The source path for the preview image.
     * @group Props
     */
    @Input() previewImageSrc: string | SafeUrl | undefined;
    /**
     * The srcset definition for the preview image.
     * @group Props
     */
    @Input() previewImageSrcSet: string | SafeUrl | undefined;
    /**
     * The sizes definition for the preview image.
     * @group Props
     */
    @Input() previewImageSizes: string | undefined;
    /**
     * Attribute of the preview image element.
     * @group Props
     */
    @Input() alt: string | undefined;
    /**
     * Attribute of the image element.
     * @group Props
     */
    @Input() width: string | undefined;
    /**
     * Attribute of the image element.
     * @group Props
     */
    @Input() height: string | undefined;
    /**
     * Attribute of the image element.
     * @group Props
     */
    @Input() loading: 'lazy' | 'eager' | undefined;
    /**
     * Controls the preview functionality.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) preview: boolean = false;
    /**
     * Transition options of the show animation
     * @group Props
     * @deprecated since v21.0.0. Use `motionOptions` instead.
     */
    @Input() showTransitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Transition options of the hide animation
     * @group Props
     * @deprecated since v21.0.0. Use `motionOptions` instead.
     */
    @Input() hideTransitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
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
    appendTo = input<HTMLElement | ElementRef | TemplateRef<any> | 'self' | 'body' | null | undefined | any>(undefined);
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
     * Triggered when the preview overlay is shown.
     * @group Emits
     */
    @Output() onShow: EventEmitter<any> = new EventEmitter<any>();
    /**
     * Triggered when the preview overlay is hidden.
     * @group Emits
     */
    @Output() onHide: EventEmitter<any> = new EventEmitter<any>();
    /**
     * This event is triggered if an error occurs while loading an image file.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onImageError: EventEmitter<Event> = new EventEmitter<Event>();

    @ViewChild('mask') mask: ElementRef | undefined;

    @ViewChild('previewButton') previewButton: ElementRef | undefined;

    @ViewChild('closeButton') closeButton: ElementRef | undefined;

    /**
     * Custom indicator template.
     * @group Templates
     */
    @ContentChild('indicator', { descendants: false }) indicatorTemplate: TemplateRef<void> | undefined;

    /**
     * Custom rotate right icon template.
     * @group Templates
     */
    @ContentChild('rotaterighticon', { descendants: false }) rotateRightIconTemplate: TemplateRef<void> | undefined;

    /**
     * Custom rotate left icon template.
     * @group Templates
     */
    @ContentChild('rotatelefticon', { descendants: false }) rotateLeftIconTemplate: TemplateRef<void> | undefined;

    /**
     * Custom zoom out icon template.
     * @group Templates
     */
    @ContentChild('zoomouticon', { descendants: false }) zoomOutIconTemplate: TemplateRef<void> | undefined;

    /**
     * Custom zoom in icon template.
     * @group Templates
     */
    @ContentChild('zoominicon', { descendants: false }) zoomInIconTemplate: TemplateRef<void> | undefined;

    /**
     * Custom close icon template.
     * @group Templates
     */
    @ContentChild('closeicon', { descendants: false }) closeIconTemplate: TemplateRef<void> | undefined;

    /**
     * Custom preview template.
     * @group Templates
     */
    @ContentChild('preview', { descendants: false }) previewTemplate: TemplateRef<ImagePreviewTemplateContext> | undefined;

    /**
     * Custom image template.
     * @group Templates
     */
    @ContentChild('image', { descendants: false }) imageTemplate: TemplateRef<ImageImageTemplateContext> | undefined;

    renderMask = signal<boolean>(false);

    renderPreview = signal<boolean>(false);

    maskVisible: boolean = false;

    previewVisible: boolean = false;

    rotate: number = 0;

    scale: number = 1;

    previewClick: boolean = false;

    container: Nullable<HTMLElement>;

    wrapper: Nullable<HTMLElement>;

    _componentStyle = inject(ImageStyle);

    $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo());

    public get isZoomOutDisabled(): boolean {
        return this.scale - this.zoomSettings.step <= this.zoomSettings.min;
    }

    public get isZoomInDisabled(): boolean {
        return this.scale + this.zoomSettings.step >= this.zoomSettings.max;
    }

    private zoomSettings = {
        default: 1,
        step: 0.1,
        max: 1.5,
        min: 0.5
    };

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    _indicatorTemplate: TemplateRef<void> | undefined;

    _rotateRightIconTemplate: TemplateRef<void> | undefined;

    _rotateLeftIconTemplate: TemplateRef<void> | undefined;

    _zoomOutIconTemplate: TemplateRef<void> | undefined;

    _zoomInIconTemplate: TemplateRef<void> | undefined;

    _closeIconTemplate: TemplateRef<void> | undefined;

    _imageTemplate: TemplateRef<ImageImageTemplateContext> | undefined;

    _previewTemplate: TemplateRef<ImagePreviewTemplateContext> | undefined;

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    onAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'indicator':
                    this._indicatorTemplate = item.template;
                    break;

                case 'rotaterighticon':
                    this._rotateRightIconTemplate = item.template;
                    break;

                case 'rotatelefticon':
                    this._rotateLeftIconTemplate = item.template;
                    break;

                case 'zoomouticon':
                    this._zoomOutIconTemplate = item.template;
                    break;

                case 'zoominicon':
                    this._zoomInIconTemplate = item.template;
                    break;

                case 'closeicon':
                    this._closeIconTemplate = item.template;
                    break;

                case 'image':
                    this._imageTemplate = item.template;
                    break;

                case 'preview':
                    this._previewTemplate = item.template;
                    break;

                default:
                    this._indicatorTemplate = item.template;
                    break;
            }
        });
    }

    onImageClick() {
        if (this.preview) {
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
                    focus(this.previewButton?.nativeElement);
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
        this.rotate += 90;
        this.previewClick = true;
    }

    rotateLeft() {
        this.rotate -= 90;
        this.previewClick = true;
    }

    zoomIn() {
        this.scale = this.scale + this.zoomSettings.step;
        this.previewClick = true;
    }

    zoomOut() {
        this.scale = this.scale - this.zoomSettings.step;
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
            focus(this.closeButton?.nativeElement);
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
        this.rotate = 0;
        this.scale = this.zoomSettings.default;
        unblockBodyScroll();
        this.onHide.emit({});
        this.cd.markForCheck();
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
        return { transform: 'rotate(' + this.rotate + 'deg) scale(' + this.scale + ')' };
    }

    get zoomImageAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.zoomImage : undefined;
    }

    handleToolbarClick(event: MouseEvent): void {
        event.stopPropagation();
    }

    closePreview(): void {
        this.previewVisible = false;
    }

    imageError(event: Event) {
        this.onImageError.emit(event);
    }

    rightAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.rotateRight : undefined;
    }

    leftAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.rotateLeft : undefined;
    }

    zoomInAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.zoomIn : undefined;
    }

    zoomOutAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.zoomOut : undefined;
    }

    closeAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.close : undefined;
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
