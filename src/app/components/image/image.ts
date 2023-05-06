import { NgModule, Component, Input, ElementRef, ChangeDetectionStrategy, ViewEncapsulation, TemplateRef, AfterContentInit, ContentChildren, QueryList, Output, EventEmitter, ChangeDetectorRef, ViewChild, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { SharedModule, PrimeTemplate, PrimeNGConfig } from 'primeng/api';
import { trigger, style, transition, animate, AnimationEvent } from '@angular/animations';
import { SafeUrl } from '@angular/platform-browser';
import { DomHandler } from 'primeng/dom';
import { ZIndexUtils } from 'primeng/utils';
import { RefreshIcon } from 'primeng/icons/refresh';
import { EyeIcon } from 'primeng/icons/eye';
import { UndoIcon } from 'primeng/icons/undo';
import { SearchMinusIcon } from 'primeng/icons/searchminus';
import { SearchPlusIcon } from 'primeng/icons/searchplus';
import { TimesIcon } from 'primeng/icons/times';

@Component({
    selector: 'p-image',
    template: `
        <span [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
            <img [attr.src]="src" [attr.alt]="alt" [attr.width]="width" [attr.height]="height" [ngStyle]="imageStyle" [class]="imageClass" (error)="imageError($event)" />
            <div class="p-image-preview-indicator" *ngIf="preview" (click)="onImageClick()">
                <ng-container *ngIf="indicatorTemplate; else defaultTemplate">
                    <ng-container *ngTemplateOutlet="indicatorTemplate"></ng-container>
                </ng-container>
                <ng-template #defaultTemplate>
                    <EyeIcon [styleClass]="'p-image-preview-icon'" />
                </ng-template>
            </div>
            <div #mask class="p-image-mask p-component-overlay p-component-overlay-enter" *ngIf="maskVisible" (click)="onMaskClick()">
                <div class="p-image-toolbar" (click)="handleToolbarClick($event)">
                    <button class="p-image-action p-link" (click)="rotateRight()" type="button">
                        <RefreshIcon *ngIf="!rotateRightIconTemplate" />
                        <ng-template *ngTemplateOutlet="rotateRightIconTemplate"></ng-template>
                    </button>
                    <button class="p-image-action p-link" (click)="rotateLeft()" type="button">
                        <UndoIcon *ngIf="!rotateLeftIconTemplate" />
                        <ng-template *ngTemplateOutlet="rotateLeftIconTemplate"></ng-template>
                    </button>
                    <button class="p-image-action p-link" (click)="zoomOut()" type="button" [disabled]="isZoomOutDisabled">
                        <SearchMinusIcon *ngIf="!zoomOutIconTemplate" />
                        <ng-template *ngTemplateOutlet="zoomOutIconTemplate"></ng-template>
                    </button>
                    <button class="p-image-action p-link" (click)="zoomIn()" type="button" [disabled]="isZoomInDisabled">
                        <SearchPlusIcon *ngIf="!zoomInIconTemplate" />
                        <ng-template *ngTemplateOutlet="zoomInIconTemplate"></ng-template>
                    </button>
                    <button class="p-image-action p-link" type="button" (click)="closePreview()">
                        <TimesIcon *ngIf="!closeIconTemplate" />
                        <ng-template *ngTemplateOutlet="closeIconTemplate"></ng-template>
                    </button>
                </div>
                <div
                    *ngIf="previewVisible"
                    [@animation]="{ value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }"
                    (@animation.start)="onAnimationStart($event)"
                    (@animation.done)="onAnimationEnd($event)"
                >
                    <img [attr.src]="src" class="p-image-preview" [ngStyle]="imagePreviewStyle()" (click)="onPreviewImageClick()" />
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
    styleUrls: ['./image.css'],
    host: {
        class: 'p-element'
    }
})
export class Image implements AfterContentInit {
    @Input() imageClass: string;

    @Input() imageStyle: any;

    @Input() styleClass: string;

    @Input() style: any;

    @Input() src: string | SafeUrl;

    @Input() alt: string;

    @Input() width: string;

    @Input() height: string;

    @Input() appendTo: any;

    @Input() preview: boolean = false;

    @Input() showTransitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';

    @Input() hideTransitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';

    @Output() onShow: EventEmitter<any> = new EventEmitter();

    @Output() onHide: EventEmitter<any> = new EventEmitter();

    @Output() onImageError: EventEmitter<any> = new EventEmitter();

    @ViewChild('mask') mask: ElementRef;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    indicatorTemplate: TemplateRef<any>;

    rotateRightIconTemplate: TemplateRef<any>;

    rotateLeftIconTemplate: TemplateRef<any>;

    zoomOutIconTemplate: TemplateRef<any>;

    zoomInIconTemplate: TemplateRef<any>;

    closeIconTemplate: TemplateRef<any>;

    maskVisible: boolean = false;

    previewVisible: boolean = false;

    rotate: number = 0;

    scale: number = 1;

    previewClick: boolean = false;

    container: HTMLElement;

    wrapper: HTMLElement;

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

    constructor(@Inject(DOCUMENT) private document: Document, private config: PrimeNGConfig, private cd: ChangeDetectorRef) {}

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'indicator':
                    this.indicatorTemplate = item.template;
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
        }
    }

    onMaskClick() {
        if (!this.previewClick) {
            this.closePreview();
        }

        this.previewClick = false;
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
                this.wrapper = this.container.parentElement;
                this.appendContainer();
                this.moveOnTop();
                break;

            case 'void':
                DomHandler.addClass(this.wrapper, 'p-component-overlay-leave');
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
            if (this.appendTo === 'body') this.document.body.appendChild(this.wrapper);
            else DomHandler.appendChild(this.wrapper, this.appendTo);
        }
    }

    imagePreviewStyle() {
        return { transform: 'rotate(' + this.rotate + 'deg) scale(' + this.scale + ')' };
    }

    containerClass() {
        return {
            'p-image p-component': true,
            'p-image-preview-container': this.preview
        };
    }

    handleToolbarClick(event: MouseEvent): void {
        event.stopPropagation();
    }

    closePreview(): void {
        this.previewVisible = false;
        this.rotate = 0;
        this.scale = this.zoomSettings.default;
    }

    imageError(event) {
        this.onImageError.emit(event);
    }
}

@NgModule({
    imports: [CommonModule, SharedModule, RefreshIcon, EyeIcon, UndoIcon, SearchMinusIcon, SearchPlusIcon, TimesIcon],
    exports: [Image, SharedModule],
    declarations: [Image]
})
export class ImageModule {}
