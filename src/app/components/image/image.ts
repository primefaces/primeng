import { NgModule, Component, Input, ElementRef, ContentChild, ChangeDetectionStrategy, ViewEncapsulation, TemplateRef, AfterContentInit, ContentChildren, QueryList, Output, EventEmitter, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, PrimeTemplate, PrimeNGConfig } from 'primeng/api';
import {trigger,style,transition,animate, AnimationEvent,} from '@angular/animations';
import { DomHandler } from 'primeng/dom';
import { ZIndexUtils } from 'primeng/utils';

@Component({
    selector: 'p-image',
    template: `
        <span [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
            <img [attr.src]="src" [attr.alt]="alt" [attr.width]="width" [attr.height]="height" [ngStyle]="imageStyle" [class]="imageClass" />
            <div class="p-image-preview-indicator" *ngIf="preview" (click)="onImageClick()">
                <ng-container *ngIf="indicatorTemplate;else defaultTemplate">
                    <ng-container *ngTemplateOutlet="indicatorTemplate"></ng-container>
                </ng-container>
                <ng-template #defaultTemplate>
                    <i class="p-image-preview-icon pi pi-eye"></i>
                </ng-template>
            </div>
            <div #mask class="p-image-mask p-component-overlay p-component-overlay-enter" *ngIf="maskVisible" (click)="onMaskClick()">
                <div class="p-image-toolbar">
                    <button class="p-image-action p-link" (click)="rotateRight()" type="button">
                        <i class="pi pi-refresh"></i>
                    </button>
                    <button class="p-image-action p-link" (click)="rotateLeft()" type="button">
                        <i class="pi pi-undo"></i>
                    </button>
                    <button class="p-image-action p-link" (click)="zoomOut()" type="button" [disabled]="zoomDisabled()">
                        <i class="pi pi-search-minus"></i>
                    </button>
                    <button class="p-image-action p-link" (click)="zoomIn()" type="button" [disabled]="zoomDisabled()">
                        <i class="pi pi-search-plus"></i>
                    </button>
                    <button class="p-image-action p-link" type="button">
                        <i class="pi pi-times"></i>
                    </button>
                </div>
                <div *ngIf="previewVisible" [@animation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}"
                    (@animation.start)="onAnimationStart($event)" (@animation.done)="onAnimationEnd($event)">
                    <img [attr.src]="src" class="p-image-preview" [ngStyle]="imagePreviewStyle()" (click)="onPreviewImageClick()"/>
                </div>
            </div>
        </span>
    `,
    animations: [
        trigger('animation', [
            transition('void => visible', [
                style({ transform: 'scale(0.7)', opacity: 0 }),
                animate('{{showTransitionParams}}')
            ]),
            transition('visible => void', [
                animate('{{hideTransitionParams}}', style({ transform: 'scale(0.7)', opacity: 0 }))
            ])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./image.css'],
    host: {
        'class': 'p-element'
    }
})
export class Image implements AfterContentInit {

    @Input() imageClass: string;

    @Input() imageStyle: any;

    @Input() styleClass: string;

    @Input() style: any;

    @Input() src: string;

    @Input() alt: string;

    @Input() width: string;

    @Input() height: string;

    @Input() appendTo: any;

    @Input() preview: boolean = false;

    @Input() showTransitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';

    @Input() hideTransitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';

    @Output() onShow: EventEmitter<any> = new EventEmitter();

    @Output() onHide: EventEmitter<any> = new EventEmitter();

    @ViewChild('mask') mask: ElementRef;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    indicatorTemplate: TemplateRef<any>;

    maskVisible: boolean = false;

    previewVisible: boolean =  false;

    rotate: number = 0;

    scale: number = 1;

    previewClick: boolean = false;

    container: HTMLElement;

    wrapper: HTMLElement;

    constructor(private config: PrimeNGConfig, private cd: ChangeDetectorRef) { }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'indicator':
                    this.indicatorTemplate = item.template;
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
            this.previewVisible = false;
            this.rotate = 0;
            this.scale = 1;
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
        this.scale = this.scale + 0.1;
        this.previewClick = true;
    }

    zoomOut() {
        this.scale = this.scale - 0.1;
        this.previewClick = true;
    }

    zoomDisabled() {
        return this.scale <= 0.5 || this.scale >= 1.5;
    }

    onAnimationStart(event: AnimationEvent) {
        switch(event.toState) {
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
        switch(event.toState) {
            case 'void':
                ZIndexUtils.clear(this.container);
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
        ZIndexUtils.set('modal', this.container, this.config.zIndex.modal);
        this.wrapper.style.zIndex = String(parseInt(this.container.style.zIndex, 10) - 1);
    }

    appendContainer() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.wrapper);
            else
                DomHandler.appendChild(this.wrapper, this.appendTo);
        }
    }

    imagePreviewStyle() {
        return {transform: 'rotate(' + this.rotate + 'deg) scale(' + this.scale + ')'};
    }

    containerClass() {
        return {
            'p-image p-component': true,
            'p-image-preview-container': this.preview
        };
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Image, SharedModule],
    declarations: [Image]
})
export class ImageModule { }
