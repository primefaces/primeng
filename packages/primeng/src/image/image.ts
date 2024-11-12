import { animate, AnimationEvent, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AfterContentInit, booleanAttribute, ChangeDetectionStrategy, Component, ContentChild, ElementRef, EventEmitter, HostListener, inject, Input, NgModule, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { addClass, appendChild, blockBodyScroll, focus, unblockBodyScroll } from '@primeuix/utils';
import { SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
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
        <span [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
            <ng-container *ngIf="!imageTemplate">
                <img [attr.src]="src" [attr.srcset]="srcSet" [attr.sizes]="sizes" [attr.alt]="alt" [attr.width]="width" [attr.height]="height" [attr.loading]="loading" [ngStyle]="imageStyle" [class]="imageClass" (error)="imageError($event)" />
            </ng-container>

            <ng-container *ngTemplateOutlet="imageTemplate; context: { errorCallback: imageError.bind(this) }"></ng-container>

            <button *ngIf="preview" [attr.aria-label]="zoomImageAriaLabel" type="button" class="p-image-preview-mask" (click)="onImageClick()" #previewButton [ngStyle]="{ height: height + 'px', width: width + 'px' }">
                <ng-container *ngIf="indicatorTemplate; else defaultTemplate">
                    <ng-container *ngTemplateOutlet="indicatorTemplate"></ng-container>
                </ng-container>
                <ng-template #defaultTemplate>
                    <EyeIcon [styleClass]="'p-image-preview-icon'" />
                </ng-template>
            </button>
            <div #mask class="p-image-mask p-overlay-mask p-overlay-mask-enter" *ngIf="maskVisible" [attr.aria-modal]="maskVisible" role="dialog" (click)="onMaskClick()" (keydown)="onMaskKeydown($event)" pFocusTrap>
                <div class="p-image-toolbar" (click)="handleToolbarClick($event)">
                    <button class="p-image-action p-image-rotate-right-button" (click)="rotateRight()" type="button" [attr.aria-label]="rightAriaLabel()">
                        <RefreshIcon *ngIf="!rotateRightIconTemplate" />
                        <ng-template *ngTemplateOutlet="rotateRightIconTemplate"></ng-template>
                    </button>
                    <button class="p-image-action p-image-rotate-left-button" (click)="rotateLeft()" type="button" [attr.aria-label]="leftAriaLabel()">
                        <UndoIcon *ngIf="!rotateLeftIconTemplate" />
                        <ng-template *ngTemplateOutlet="rotateLeftIconTemplate"></ng-template>
                    </button>
                    <button [ngClass]="{ 'p-image-action p-image-zoom-out-button': true, 'p-disabled': isZoomOutDisabled }" (click)="zoomOut()" type="button" [disabled]="isZoomOutDisabled" [attr.aria-label]="zoomOutAriaLabel()">
                        <SearchMinusIcon *ngIf="!zoomOutIconTemplate" />
                        <ng-template *ngTemplateOutlet="zoomOutIconTemplate"></ng-template>
                    </button>
                    <button [ngClass]="{ 'p-image-action p-image-zoom-in-button': true, 'p-disabled': isZoomOutDisabled }" (click)="zoomIn()" type="button" [disabled]="isZoomInDisabled" [attr.aria-label]="zoomInAriaLabel()">
                        <SearchPlusIcon *ngIf="!zoomInIconTemplate" />
                        <ng-template *ngTemplateOutlet="zoomInIconTemplate"></ng-template>
                    </button>
                    <button class="p-image-action p-image-close-button" type="button" (click)="closePreview()" [attr.aria-label]="closeAriaLabel()" #closeButton>
                        <TimesIcon *ngIf="!closeIconTemplate" />
                        <ng-template *ngTemplateOutlet="closeIconTemplate"></ng-template>
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
                    <ng-container *ngIf="!previewTemplate">
                        <img [attr.src]="previewImageSrc ? previewImageSrc : src" [attr.srcset]="previewImageSrcSet" [attr.sizes]="previewImageSizes" class="p-image-original" [ngStyle]="imagePreviewStyle()" (click)="onPreviewImageClick()" />
                    </ng-container>
                    <ng-container
                        *ngTemplateOutlet="
                            previewTemplate;
                            context: {
                                class: 'p-image-original',
                                style: imagePreviewStyle(),
                                previewCallback: onPreviewImageClick.bind(this)
                            }
                        "
                    >
                    </ng-container>
                </div>
            </div>
        </span>
    `,
    animations: [
        trigger('animation', [
            transition('void => visible', [style({ transform: 'scale(0.7)', opacity: 0 }), animate('{{showTransitionParams}}')]),
            transition('visible => void', [animate('{{hideTransitionParams}}', style({ transform: 'scale(0.7)', opacity: 0 }))])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [ImageStyle]
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
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Inline style of the element.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
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
     * Target element to attach the dialog, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    @Input() appendTo: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any;
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
    @ContentChild('indicator') indicatorTemplate: TemplateRef<any> | undefined;

    /**
     * Custom template of rotaterighticon.
     * @group Templates
     */
    @ContentChild('rotaterighticon') rotateRightIconTemplate: TemplateRef<any> | undefined;

    /**
     * Custom template of rotatelefticon.
     * @group Templates
     */
    @ContentChild('rotatelefticon') rotateLeftIconTemplate: TemplateRef<any> | undefined;

    /**
     * Custom template of zoomouticon.
     * @group Templates
     */
    @ContentChild('zoomouticon') zoomOutIconTemplate: TemplateRef<any> | undefined;

    /**
     * Custom template of zoominicon.
     * @group Templates
     */
    @ContentChild('zoominicon') zoomInIconTemplate: TemplateRef<any> | undefined;

    /**
     * Custom template of closeicon.
     * @group Templates
     */
    @ContentChild('closeicon') closeIconTemplate: TemplateRef<any> | undefined;

    /**
     * Custom template of preview.
     * @group Templates
     */
    @ContentChild('preview') previewTemplate: TemplateRef<any> | undefined;

    /**
     * Custom template of image.
     * @group Templates
     */
    @ContentChild('image') imageTemplate: TemplateRef<any> | undefined;

    maskVisible: boolean = false;

    previewVisible: boolean = false;

    rotate: number = 0;

    scale: number = 1;

    previewClick: boolean = false;

    container: Nullable<HTMLElement>;

    wrapper: Nullable<HTMLElement>;

    _componentStyle = inject(ImageStyle);

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

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'indicator':
                    this.indicatorTemplate = item.template;
                    break;

                case 'image':
                    this.imageTemplate = item.template;
                    break;

                case 'preview':
                    this.previewTemplate = item.template;
                    break;

                case 'rotaterighticon':
                    this.rotateRightIconTemplate = item.template;
                    break;

                case 'rotatelefticon':
                    this.rotateLeftIconTemplate = item.template;
                    break;

                case 'zoomouticon':
                    this.zoomOutIconTemplate = item.template;
                    break;

                case 'zoominicon':
                    this.zoomInIconTemplate = item.template;
                    break;

                case 'closeicon':
                    this.closeIconTemplate = item.template;
                    break;

                default:
                    this.indicatorTemplate = item.template;
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
        if (this.appendTo) {
            if (this.appendTo === 'body') this.document.body.appendChild(this.wrapper as HTMLElement);
            else appendChild(this.wrapper, this.appendTo);
        }
    }

    imagePreviewStyle() {
        return { transform: 'rotate(' + this.rotate + 'deg) scale(' + this.scale + ')' };
    }

    get zoomImageAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.zoomImage : undefined;
    }

    containerClass() {
        return {
            'p-image p-component': true,
            'p-image-preview': this.preview
        };
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
