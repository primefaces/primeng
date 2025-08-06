import { animate, AnimationEvent, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
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
    input,
    Input,
    NgModule,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { addClass, appendChild, focus } from '@primeuix/utils';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { blockBodyScroll, unblockBodyScroll } from 'primeng/dom';
import { FocusTrap } from 'primeng/focustrap';
import { EyeIcon, RefreshIcon, SearchMinusIcon, SearchPlusIcon, TimesIcon, UndoIcon } from 'primeng/icons';
import { Nullable } from 'primeng/ts-helpers';
import { ZIndexUtils } from 'primeng/utils';
import { ImageStyle } from './style/imagestyle';

/**
 * Displays an image with preview and tranformation options. For multiple image, see Galleria.
 * @group Components
 */
@Component({
    selector: 'p-image',
    standalone: true,
    imports: [CommonModule, RefreshIcon, EyeIcon, UndoIcon, SearchMinusIcon, SearchPlusIcon, TimesIcon, FocusTrap, SharedModule],
    template: `
        <ng-container *ngIf="!imageTemplate && !_imageTemplate">
            <img [attr.src]="src" [attr.srcset]="srcSet" [attr.sizes]="sizes" [attr.alt]="alt" [attr.width]="width" [attr.height]="height" [attr.loading]="loading" [ngStyle]="imageStyle" [class]="imageClass" (error)="imageError($event)" />
        </ng-container>

        <ng-container *ngTemplateOutlet="imageTemplate || _imageTemplate; context: { errorCallback: imageError.bind(this) }"></ng-container>

        <button *ngIf="preview" [attr.aria-label]="zoomImageAriaLabel" type="button" [class]="cx('previewMask')" (click)="onImageClick()" #previewButton [ngStyle]="{ height: height + 'px', width: width + 'px' }">
            <ng-container *ngIf="indicatorTemplate || _indicatorTemplate; else defaultTemplate">
                <ng-container *ngTemplateOutlet="indicatorTemplate || _indicatorTemplate"></ng-container>
            </ng-container>
            <ng-template #defaultTemplate>
                <svg data-p-icon="eye" [class]="cx('previewIcon')" />
            </ng-template>
        </button>
        <div #mask [class]="cx('mask')" *ngIf="maskVisible" [attr.aria-modal]="maskVisible" role="dialog" (click)="onMaskClick()" (keydown)="onMaskKeydown($event)" pFocusTrap>
            <div [class]="cx('toolbar')" (click)="handleToolbarClick($event)">
                <button [class]="cx('rotateRightButton')" (click)="rotateRight()" type="button" [attr.aria-label]="rightAriaLabel()">
                    <svg data-p-icon="refresh" *ngIf="!rotateRightIconTemplate && !_rotateRightIconTemplate" />
                    <ng-template *ngTemplateOutlet="rotateRightIconTemplate || _rotateRightIconTemplate"></ng-template>
                </button>
                <button [class]="cx('rotateLeftButton')" (click)="rotateLeft()" type="button" [attr.aria-label]="leftAriaLabel()">
                    <svg data-p-icon="undo" *ngIf="!rotateLeftIconTemplate && !_rotateLeftIconTemplate" />
                    <ng-template *ngTemplateOutlet="rotateLeftIconTemplate || _rotateLeftIconTemplate"></ng-template>
                </button>
                <button [class]="cx('zoomOutButton')" (click)="zoomOut()" type="button" [disabled]="isZoomOutDisabled" [attr.aria-label]="zoomOutAriaLabel()">
                    <svg data-p-icon="search-minus" *ngIf="!zoomOutIconTemplate && !_zoomOutIconTemplate" />
                    <ng-template *ngTemplateOutlet="zoomOutIconTemplate || _zoomOutIconTemplate"></ng-template>
                </button>
                <button [class]="cx('zoomInButton')" (click)="zoomIn()" type="button" [disabled]="isZoomInDisabled" [attr.aria-label]="zoomInAriaLabel()">
                    <svg data-p-icon="search-plus" *ngIf="!zoomInIconTemplate && !_zoomInIconTemplate" />
                    <ng-template *ngTemplateOutlet="zoomInIconTemplate || _zoomInIconTemplate"></ng-template>
                </button>
                <button [class]="cx('closeButton')" type="button" (click)="closePreview()" [attr.aria-label]="closeAriaLabel()" #closeButton>
                    <svg data-p-icon="times" *ngIf="!closeIconTemplate && !_closeIconTemplate" />
                    <ng-template *ngTemplateOutlet="closeIconTemplate || _closeIconTemplate"></ng-template>
                </button>
            </div>
            <div
                *ngIf="previewVisible"
                [@animation]="{
                    value: 'visible',
                    params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions }
                }"
                (@animation.start)="onAnimationStart($event)"
                (@animation.done)="onAnimationEnd($event)"
            >
                <ng-container *ngIf="!previewTemplate && !_previewTemplate">
                    <img [attr.src]="previewImageSrc ? previewImageSrc : src" [attr.srcset]="previewImageSrcSet" [attr.sizes]="previewImageSizes" [class]="cx('original')" [ngStyle]="imagePreviewStyle()" (click)="onPreviewImageClick()" />
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
            </div>
        </div>
    `,
    animations: [
        trigger('animation', [
            transition('void => visible', [style({ transform: 'scale(0.7)', opacity: 0 }), animate('{{showTransitionParams}}')]),
            transition('visible => void', [animate('{{hideTransitionParams}}', style({ transform: 'scale(0.7)', opacity: 0 }))])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [ImageStyle],
    host: {
        '[class]': "cn(cx('root'),styleClass)"
    }
})
export class Image extends BaseComponent implements AfterContentInit {
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
     */
    @Input() showTransitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Transition options of the hide animation
     * @group Props
     */
    @Input() hideTransitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @defaultValue 'self'
     * @group Props
     */
    appendTo = input<HTMLElement | ElementRef | TemplateRef<any> | 'self' | 'body' | null | undefined | any>(undefined);
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
     * Custom template of indicator.
     * @group Templates
     */
    @ContentChild('indicator', { descendants: false }) indicatorTemplate: TemplateRef<any> | undefined;

    /**
     * Custom template of rotaterighticon.
     * @group Templates
     */
    @ContentChild('rotaterighticon', { descendants: false }) rotateRightIconTemplate: TemplateRef<any> | undefined;

    /**
     * Custom template of rotatelefticon.
     * @group Templates
     */
    @ContentChild('rotatelefticon', { descendants: false }) rotateLeftIconTemplate: TemplateRef<any> | undefined;

    /**
     * Custom template of zoomouticon.
     * @group Templates
     */
    @ContentChild('zoomouticon', { descendants: false }) zoomOutIconTemplate: TemplateRef<any> | undefined;

    /**
     * Custom template of zoominicon.
     * @group Templates
     */
    @ContentChild('zoominicon', { descendants: false }) zoomInIconTemplate: TemplateRef<any> | undefined;

    /**
     * Custom template of closeicon.
     * @group Templates
     */
    @ContentChild('closeicon', { descendants: false }) closeIconTemplate: TemplateRef<any> | undefined;

    /**
     * Custom template of preview.
     * @group Templates
     */
    @ContentChild('preview', { descendants: false }) previewTemplate: TemplateRef<any> | undefined;

    /**
     * Custom template of image.
     * @group Templates
     */
    @ContentChild('image', { descendants: false }) imageTemplate: TemplateRef<any> | undefined;

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

    constructor() {
        super();
    }

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    _indicatorTemplate: TemplateRef<any> | undefined;

    _rotateRightIconTemplate: TemplateRef<any> | undefined;

    _rotateLeftIconTemplate: TemplateRef<any> | undefined;

    _zoomOutIconTemplate: TemplateRef<any> | undefined;

    _zoomInIconTemplate: TemplateRef<any> | undefined;

    _closeIconTemplate: TemplateRef<any> | undefined;

    _imageTemplate: TemplateRef<any> | undefined;

    _previewTemplate: TemplateRef<any> | undefined;

    ngAfterContentInit() {
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
            blockBodyScroll();
        }
    }

    onMaskClick() {
        if (!this.previewClick) {
            this.closePreview();
        }

        this.previewClick = false;
    }

    onMaskKeydown(event) {
        switch (event.code) {
            case 'Escape':
                this.onMaskClick();
                setTimeout(() => {
                    focus(this.previewButton.nativeElement);
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

    onAnimationStart(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
                this.container = event.element;
                this.wrapper = this.container?.parentElement;
                this.attrSelector && this.wrapper.setAttribute(this.attrSelector, '');
                this.appendContainer();
                this.moveOnTop();

                setTimeout(() => {
                    focus(this.closeButton.nativeElement);
                }, 25);
                break;

            case 'void':
                addClass(this.wrapper, 'p-overlay-mask-leave');
                break;
        }
    }

    onAnimationEnd(event: AnimationEvent) {
        switch (event.toState) {
            case 'void':
                ZIndexUtils.clear(this.wrapper);
                this.maskVisible = false;
                this.container = null;
                this.wrapper = null;
                this.cd.markForCheck();
                this.onHide.emit({});
                break;
            case 'visible':
                this.onShow.emit({});
                break;
        }
    }

    moveOnTop() {
        ZIndexUtils.set('modal', this.wrapper, this.config.zIndex.modal);
    }

    appendContainer() {
        if (this.$appendTo() && this.$appendTo() !== 'self') {
            if (this.$appendTo() === 'body') this.document.body.appendChild(this.wrapper as HTMLElement);
            else appendChild(this.$appendTo(), this.wrapper);
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
        this.rotate = 0;
        this.scale = this.zoomSettings.default;
        unblockBodyScroll();
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

    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
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
