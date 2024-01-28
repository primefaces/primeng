import { AnimationEvent, animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
    AfterContentChecked,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    DoCheck,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    KeyValueDiffers,
    NgModule,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    PLATFORM_ID,
    QueryList,
    Renderer2,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    booleanAttribute,
    numberAttribute
} from '@angular/core';
import { PrimeNGConfig, PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ChevronLeftIcon } from 'primeng/icons/chevronleft';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { TimesIcon } from 'primeng/icons/times';
import { WindowMaximizeIcon } from 'primeng/icons/windowmaximize';
import { WindowMinimizeIcon } from 'primeng/icons/windowminimize';
import { RippleModule } from 'primeng/ripple';
import { VoidListener } from 'primeng/ts-helpers';
import { UniqueComponentId, ZIndexUtils } from 'primeng/utils';
import { GalleriaResponsiveOptions } from './galleria.interface';
import { FocusTrapModule } from 'primeng/focustrap';
/**
 * Galleria is an advanced content gallery component.
 * @group Components
 */
@Component({
    selector: 'p-galleria',
    template: `
        <div *ngIf="fullScreen; else windowed" #container>
            <div
                *ngIf="maskVisible"
                #mask
                [ngClass]="{ 'p-galleria-mask p-component-overlay p-component-overlay-enter': true, 'p-galleria-visible': this.visible }"
                [class]="maskClass"
                [attr.role]="fullScreen ? 'dialog' : 'region'"
                [attr.aria-modal]="fullScreen ? 'true' : undefined"
            >
                <p-galleriaContent
                    *ngIf="visible"
                    [@animation]="{ value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }"
                    (@animation.start)="onAnimationStart($event)"
                    (@animation.done)="onAnimationEnd($event)"
                    [value]="value"
                    [activeIndex]="activeIndex"
                    [numVisible]="numVisibleLimit || numVisible"
                    (maskHide)="onMaskHide()"
                    (activeItemChange)="onActiveItemChange($event)"
                    [ngStyle]="containerStyle"
                ></p-galleriaContent>
            </div>
        </div>

        <ng-template #windowed>
            <p-galleriaContent [value]="value" [activeIndex]="activeIndex" [numVisible]="numVisibleLimit || numVisible" (activeItemChange)="onActiveItemChange($event)"></p-galleriaContent>
        </ng-template>
    `,
    animations: [
        trigger('animation', [
            transition('void => visible', [style({ transform: 'scale(0.7)', opacity: 0 }), animate('{{showTransitionParams}}')]),
            transition('visible => void', [animate('{{hideTransitionParams}}', style({ transform: 'scale(0.7)', opacity: 0 }))])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./galleria.css'],
    host: {
        class: 'p-element'
    }
})
export class Galleria implements OnChanges, OnDestroy {
    /**
     * Index of the first item.
     * @group Props
     */
    @Input() get activeIndex(): number {
        return this._activeIndex;
    }
    set activeIndex(activeIndex) {
        this._activeIndex = activeIndex;
    }
    /**
     * Whether to display the component on fullscreen.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) fullScreen: boolean = false;
    /**
     * Unique identifier of the element.
     * @group Props
     */
    @Input() id: string | undefined;
    /**
     * An array of objects to display.
     * @group Props
     */
    @Input() value: any[] | undefined;
    /**
     * Number of items per page.
     * @group Props
     */
    @Input({ transform: numberAttribute }) numVisible: number = 3;
    /**
     * An array of options for responsive design.
     * @see {GalleriaResponsiveOptions}
     * @group Props
     */
    @Input() responsiveOptions: GalleriaResponsiveOptions[] | undefined;
    /**
     * Whether to display navigation buttons in item section.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showItemNavigators: boolean = false;
    /**
     * Whether to display navigation buttons in thumbnail container.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showThumbnailNavigators: boolean = true;
    /**
     * Whether to display navigation buttons on item hover.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showItemNavigatorsOnHover: boolean = false;
    /**
     * When enabled, item is changed on indicator hover.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) changeItemOnIndicatorHover: boolean = false;
    /**
     * Defines if scrolling would be infinite.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) circular: boolean = false;
    /**
     * Items are displayed with a slideshow in autoPlay mode.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autoPlay: boolean = false;
    /**
     * When enabled, autorun should stop by click.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) shouldStopAutoplayByClick: boolean = true;
    /**
     * Time in milliseconds to scroll items.
     * @group Props
     */
    @Input({ transform: numberAttribute }) transitionInterval: number = 4000;
    /**
     * Whether to display thumbnail container.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showThumbnails: boolean = true;
    /**
     * Position of thumbnails.
     * @group Props
     */
    @Input() thumbnailsPosition: 'bottom' | 'top' | 'left' | 'right' | undefined = 'bottom';
    /**
     * Height of the viewport in vertical thumbnail.
     * @group Props
     */
    @Input() verticalThumbnailViewPortHeight: string = '300px';
    /**
     * Whether to display indicator container.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showIndicators: boolean = false;
    /**
     * When enabled, indicator container is displayed on item container.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showIndicatorsOnItem: boolean = false;
    /**
     * Position of indicators.
     * @group Props
     */
    @Input() indicatorsPosition: 'bottom' | 'top' | 'left' | 'right' | undefined = 'bottom';
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    @Input({ transform: numberAttribute }) baseZIndex: number = 0;
    /**
     * Style class of the mask on fullscreen mode.
     * @group Props
     */
    @Input() maskClass: string | undefined;
    /**
     * Style class of the component on fullscreen mode. Otherwise, the 'class' property can be used.
     * @group Props
     */
    @Input() containerClass: string | undefined;
    /**
     * Inline style of the component on fullscreen mode. Otherwise, the 'style' property can be used.
     * @group Props
     */
    @Input() containerStyle: { [klass: string]: any } | null | undefined;
    /**
     * Transition options of the show animation.
     * @group Props
     */
    @Input() showTransitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Transition options of the hide animation.
     * @group Props
     */
    @Input() hideTransitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Specifies the visibility of the mask on fullscreen mode.
     * @group Props
     */
    @Input() get visible(): boolean {
        return this._visible;
    }
    set visible(visible: boolean) {
        this._visible = visible;

        if (this._visible && !this.maskVisible) {
            this.maskVisible = true;
        }
    }
    /**
     * Callback to invoke on active index change.
     * @param {number} number - Active index.
     * @group Emits
     */
    @Output() activeIndexChange: EventEmitter<number> = new EventEmitter<number>();
    /**
     * Callback to invoke on visiblity change.
     * @param {boolean} boolean - Visible value.
     * @group Emits
     */
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ViewChild('mask') mask: ElementRef | undefined;

    @ViewChild('container') container: ElementRef | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    _visible: boolean = false;

    _activeIndex: number = 0;

    headerFacet: any;

    footerFacet: any;

    indicatorFacet: any;

    captionFacet: any;

    closeIconTemplate: TemplateRef<any> | undefined;

    previousThumbnailIconTemplate: TemplateRef<any> | undefined;

    nextThumbnailIconTemplate: TemplateRef<any> | undefined;

    itemPreviousIconTemplate: TemplateRef<any> | undefined;

    itemNextIconTemplate: TemplateRef<any> | undefined;

    maskVisible: boolean = false;

    numVisibleLimit = 0;

    constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) public platformId: any, public element: ElementRef, public cd: ChangeDetectorRef, public config: PrimeNGConfig) {}

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerFacet = item.template;
                    break;

                case 'footer':
                    this.footerFacet = item.template;
                    break;

                case 'indicator':
                    this.indicatorFacet = item.template;
                    break;

                case 'closeicon':
                    this.closeIconTemplate = item.template;
                    break;

                case 'itemnexticon':
                    this.itemNextIconTemplate = item.template;
                    break;

                case 'itempreviousicon':
                    this.itemPreviousIconTemplate = item.template;
                    break;

                case 'previousthumbnailicon':
                    this.previousThumbnailIconTemplate = item.template;
                    break;

                case 'nextthumbnailicon':
                    this.nextThumbnailIconTemplate = item.template;
                    break;

                case 'caption':
                    this.captionFacet = item.template;
                    break;
            }
        });
    }

    ngOnChanges(simpleChanges: SimpleChanges) {
        if (simpleChanges.value && simpleChanges.value.currentValue?.length < this.numVisible) {
            this.numVisibleLimit = simpleChanges.value.currentValue.length;
        } else {
            this.numVisibleLimit = 0;
        }
    }

    onMaskHide() {
        this.visible = false;
        this.visibleChange.emit(false);
    }

    onActiveItemChange(index: number) {
        if (this.activeIndex !== index) {
            this.activeIndex = index;
            this.activeIndexChange.emit(index);
        }
    }

    onAnimationStart(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
                this.enableModality();
                setTimeout(() => {
                    DomHandler.focus(DomHandler.findSingle(this.container.nativeElement, '[data-pc-section="closebutton"]'));
                }, 25);
                break;

            case 'void':
                DomHandler.addClass(this.mask?.nativeElement, 'p-component-overlay-leave');
                break;
        }
    }

    onAnimationEnd(event: AnimationEvent) {
        switch (event.toState) {
            case 'void':
                this.disableModality();
                break;
        }
    }

    enableModality() {
        DomHandler.blockBodyScroll();
        this.cd.markForCheck();

        if (this.mask) {
            ZIndexUtils.set('modal', this.mask.nativeElement, this.baseZIndex || this.config.zIndex.modal);
        }
    }

    disableModality() {
        DomHandler.unblockBodyScroll();
        this.maskVisible = false;
        this.cd.markForCheck();

        if (this.mask) {
            ZIndexUtils.clear(this.mask.nativeElement);
        }
    }

    ngOnDestroy() {
        if (this.fullScreen) {
            DomHandler.removeClass(this.document.body, 'p-overflow-hidden');
        }

        if (this.mask) {
            this.disableModality();
        }
    }
}

@Component({
    selector: 'p-galleriaContent',
    template: `
        <div
            [attr.id]="id"
            [attr.role]="'region'"
            *ngIf="value && value.length > 0"
            [ngClass]="{
                'p-galleria p-component': true,
                'p-galleria-fullscreen': this.galleria.fullScreen,
                'p-galleria-indicator-onitem': this.galleria.showIndicatorsOnItem,
                'p-galleria-item-nav-onhover': this.galleria.showItemNavigatorsOnHover && !this.galleria.fullScreen
            }"
            [ngStyle]="!galleria.fullScreen ? galleria.containerStyle : {}"
            [class]="galleriaClass()"
            pFocusTrap
        >
            <button *ngIf="galleria.fullScreen" type="button" class="p-galleria-close p-link" (click)="maskHide.emit()" pRipple [attr.aria-label]="closeAriaLabel()" [attr.data-pc-section]="'closebutton'">
                <TimesIcon *ngIf="!galleria.closeIconTemplate" [styleClass]="'p-galleria-close-icon'" />
                <ng-template *ngTemplateOutlet="galleria.closeIconTemplate"></ng-template>
            </button>
            <div *ngIf="galleria.templates && galleria.headerFacet" class="p-galleria-header">
                <p-galleriaItemSlot type="header" [templates]="galleria.templates"></p-galleriaItemSlot>
            </div>
            <div class="p-galleria-content" [attr.aria-live]="galleria.autoPlay ? 'polite' : 'off'">
                <p-galleriaItem
                    [id]="id"
                    [value]="value"
                    [activeIndex]="activeIndex"
                    [circular]="galleria.circular"
                    [templates]="galleria.templates"
                    (onActiveIndexChange)="onActiveIndexChange($event)"
                    [showIndicators]="galleria.showIndicators"
                    [changeItemOnIndicatorHover]="galleria.changeItemOnIndicatorHover"
                    [indicatorFacet]="galleria.indicatorFacet"
                    [captionFacet]="galleria.captionFacet"
                    [showItemNavigators]="galleria.showItemNavigators"
                    [autoPlay]="galleria.autoPlay"
                    [slideShowActive]="slideShowActive"
                    (startSlideShow)="startSlideShow()"
                    (stopSlideShow)="stopSlideShow()"
                ></p-galleriaItem>

                <p-galleriaThumbnails
                    *ngIf="galleria.showThumbnails"
                    [containerId]="id"
                    [value]="value"
                    (onActiveIndexChange)="onActiveIndexChange($event)"
                    [activeIndex]="activeIndex"
                    [templates]="galleria.templates"
                    [numVisible]="numVisible"
                    [responsiveOptions]="galleria.responsiveOptions"
                    [circular]="galleria.circular"
                    [isVertical]="isVertical()"
                    [contentHeight]="galleria.verticalThumbnailViewPortHeight"
                    [showThumbnailNavigators]="galleria.showThumbnailNavigators"
                    [slideShowActive]="slideShowActive"
                    (stopSlideShow)="stopSlideShow()"
                ></p-galleriaThumbnails>
            </div>
            <div *ngIf="galleria.templates && galleria.footerFacet" class="p-galleria-footer">
                <p-galleriaItemSlot type="footer" [templates]="galleria.templates"></p-galleriaItemSlot>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleriaContent implements DoCheck {
    @Input() get activeIndex(): number {
        return this._activeIndex;
    }
    set activeIndex(activeIndex: number) {
        this._activeIndex = activeIndex;
    }

    @Input() value: any[] = [];

    @Input({ transform: numberAttribute }) numVisible: number | undefined;

    @Output() maskHide: EventEmitter<boolean> = new EventEmitter();

    @Output() activeItemChange: EventEmitter<number> = new EventEmitter();

    @ViewChild('closeButton') closeButton: ElementRef | undefined;

    id: string;

    _activeIndex: number = 0;

    slideShowActive: boolean = true;

    interval: any;

    styleClass: string | undefined;

    private differ: any;

    constructor(public galleria: Galleria, public cd: ChangeDetectorRef, private differs: KeyValueDiffers, public config: PrimeNGConfig) {
        this.id = this.galleria.id || UniqueComponentId();
        this.differ = this.differs.find(this.galleria).create();
    }

    ngDoCheck(): void {
        if (isPlatformBrowser(this.galleria.platformId)) {
            const changes = this.differ.diff(this.galleria as unknown as Record<string, unknown>);
            if (changes && changes.forEachItem.length > 0) {
                // Because we change the properties of the parent component,
                // and the children take our entity from the injector.
                // We can tell the children to redraw themselves when we change the properties of the parent component.
                // Since we have an onPush strategy
                this.cd.markForCheck();
            }
        }
    }

    galleriaClass() {
        const thumbnailsPosClass = this.galleria.showThumbnails && this.getPositionClass('p-galleria-thumbnails', this.galleria.thumbnailsPosition as string);
        const indicatorPosClass = this.galleria.showIndicators && this.getPositionClass('p-galleria-indicators', this.galleria.indicatorsPosition as string);

        return (this.galleria.containerClass ? this.galleria.containerClass + ' ' : '') + (thumbnailsPosClass ? thumbnailsPosClass + ' ' : '') + (indicatorPosClass ? indicatorPosClass + ' ' : '');
    }

    startSlideShow() {
        if (isPlatformBrowser(this.galleria.platformId)) {
            this.interval = setInterval(() => {
                let activeIndex = this.galleria.circular && this.value.length - 1 === this.activeIndex ? 0 : this.activeIndex + 1;
                this.onActiveIndexChange(activeIndex);
                this.activeIndex = activeIndex;
            }, this.galleria.transitionInterval);

            this.slideShowActive = true;
        }
    }

    stopSlideShow() {
        if (this.galleria.autoPlay && !this.galleria.shouldStopAutoplayByClick) {
            return;
        }

        if (this.interval) {
            clearInterval(this.interval);
        }

        this.slideShowActive = false;
    }

    getPositionClass(preClassName: string, position: string) {
        const positions = ['top', 'left', 'bottom', 'right'];
        const pos = positions.find((item) => item === position);

        return pos ? `${preClassName}-${pos}` : '';
    }

    isVertical() {
        return this.galleria.thumbnailsPosition === 'left' || this.galleria.thumbnailsPosition === 'right';
    }

    onActiveIndexChange(index: number) {
        if (this.activeIndex !== index) {
            this.activeIndex = index;
            this.activeItemChange.emit(this.activeIndex);
        }
    }

    closeAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.close : undefined;
    }
}

@Component({
    selector: 'p-galleriaItemSlot',
    template: `
        <ng-container *ngIf="contentTemplate">
            <ng-container *ngTemplateOutlet="contentTemplate; context: context"></ng-container>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleriaItemSlot {
    @Input() templates: QueryList<PrimeTemplate> | undefined;

    @Input({ transform: numberAttribute }) index: number | undefined;

    @Input() get item(): any {
        return this._item;
    }

    set item(item: any) {
        this._item = item;
        if (this.templates) {
            this.templates.forEach((item) => {
                if (item.getType() === this.type) {
                    switch (this.type) {
                        case 'item':
                        case 'caption':
                        case 'thumbnail':
                            this.context = { $implicit: this.item };
                            this.contentTemplate = item.template;
                            break;
                    }
                }
            });
        }
    }

    @Input() type: string | undefined;

    contentTemplate: TemplateRef<any> | undefined;

    context: any;

    _item: any;

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            if (item.getType() === this.type) {
                switch (this.type) {
                    case 'item':
                    case 'caption':
                    case 'thumbnail':
                        this.context = { $implicit: this.item };
                        this.contentTemplate = item.template;
                        break;

                    case 'indicator':
                        this.context = { $implicit: this.index };
                        this.contentTemplate = item.template;
                        break;

                    default:
                        this.context = {};
                        this.contentTemplate = item.template;
                        break;
                }
            }
        });
    }
}

@Component({
    selector: 'p-galleriaItem',
    template: `
        <div class="p-galleria-item-wrapper">
            <div class="p-galleria-item-container">
                <button
                    *ngIf="showItemNavigators"
                    type="button"
                    role="navigation"
                    [ngClass]="{ 'p-galleria-item-prev p-galleria-item-nav p-link': true, 'p-disabled': this.isNavBackwardDisabled() }"
                    (click)="navBackward($event)"
                    [disabled]="isNavBackwardDisabled()"
                    pRipple
                >
                    <ChevronLeftIcon *ngIf="!galleria.itemPreviousIconTemplate" [styleClass]="'p-galleria-item-prev-icon'" />
                    <ng-template *ngTemplateOutlet="galleria.itemPreviousIconTemplate"></ng-template>
                </button>
                <div [id]="id + '_item_' + activeIndex" role="group" [attr.aria-label]="ariaSlideNumber(activeIndex + 1)" [attr.aria-roledescription]="ariaSlideLabel()" [style.width]="'100%'">
                    <p-galleriaItemSlot type="item" [item]="activeItem" [templates]="templates" class="p-galleria-item"></p-galleriaItemSlot>
                </div>
                <button
                    *ngIf="showItemNavigators"
                    type="button"
                    [ngClass]="{ 'p-galleria-item-next p-galleria-item-nav p-link': true, 'p-disabled': this.isNavForwardDisabled() }"
                    (click)="navForward($event)"
                    [disabled]="isNavForwardDisabled()"
                    pRipple
                    role="navigation"
                >
                    <ChevronRightIcon *ngIf="!galleria.itemNextIconTemplate" [styleClass]="'p-galleria-item-next-icon'" />
                    <ng-template *ngTemplateOutlet="galleria.itemNextIconTemplate"></ng-template>
                </button>
                <div class="p-galleria-caption" *ngIf="captionFacet">
                    <p-galleriaItemSlot type="caption" [item]="activeItem" [templates]="templates"></p-galleriaItemSlot>
                </div>
            </div>
            <ul *ngIf="showIndicators" class="p-galleria-indicators p-reset">
                <li
                    *ngFor="let item of value; let index = index"
                    tabindex="0"
                    (click)="onIndicatorClick(index)"
                    (mouseenter)="onIndicatorMouseEnter(index)"
                    (keydown)="onIndicatorKeyDown($event, index)"
                    [ngClass]="{ 'p-galleria-indicator': true, 'p-highlight': isIndicatorItemActive(index) }"
                    [attr.aria-label]="ariaPageLabel(index + 1)"
                    [attr.aria-selected]="activeIndex === index"
                    [attr.aria-controls]="id + '_item_' + index"
                >
                    <button type="button" tabIndex="-1" class="p-link" *ngIf="!indicatorFacet"></button>
                    <p-galleriaItemSlot type="indicator" [index]="index" [templates]="templates"></p-galleriaItemSlot>
                </li>
            </ul>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleriaItem implements OnChanges {
    @Input() id: string | undefined;

    @Input({ transform: booleanAttribute }) circular: boolean = false;

    @Input() value: any[] | undefined;

    @Input({ transform: booleanAttribute }) showItemNavigators: boolean = false;

    @Input({ transform: booleanAttribute }) showIndicators: boolean = true;

    @Input({ transform: booleanAttribute }) slideShowActive: boolean = true;

    @Input({ transform: booleanAttribute }) changeItemOnIndicatorHover: boolean = true;

    @Input({ transform: booleanAttribute }) autoPlay: boolean = false;

    @Input() templates: QueryList<PrimeTemplate> | undefined;

    @Input() indicatorFacet: any;

    @Input() captionFacet: any;

    @Output() startSlideShow: EventEmitter<Event> = new EventEmitter();

    @Output() stopSlideShow: EventEmitter<Event> = new EventEmitter();

    @Output() onActiveIndexChange: EventEmitter<number> = new EventEmitter();

    @Input() get activeIndex(): number {
        return this._activeIndex;
    }

    set activeIndex(activeIndex) {
        this._activeIndex = activeIndex;
    }

    get activeItem() {
        return this.value && this.value[this._activeIndex];
    }

    _activeIndex: number = 0;

    constructor(public galleria: Galleria) {}

    ngOnChanges({ autoPlay }: SimpleChanges): void {
        if (autoPlay?.currentValue) {
            this.startSlideShow.emit();
        }

        if (autoPlay && autoPlay.currentValue === false) {
            this.stopTheSlideShow();
        }
    }

    next() {
        let nextItemIndex = this.activeIndex + 1;
        let activeIndex = this.circular && (<any[]>this.value).length - 1 === this.activeIndex ? 0 : nextItemIndex;
        this.onActiveIndexChange.emit(activeIndex);
    }

    prev() {
        let prevItemIndex = this.activeIndex !== 0 ? this.activeIndex - 1 : 0;
        let activeIndex = this.circular && this.activeIndex === 0 ? (<any[]>this.value).length - 1 : prevItemIndex;
        this.onActiveIndexChange.emit(activeIndex);
    }

    stopTheSlideShow() {
        if (this.slideShowActive && this.stopSlideShow) {
            this.stopSlideShow.emit();
        }
    }

    navForward(e: MouseEvent) {
        this.stopTheSlideShow();
        this.next();

        if (e && e.cancelable) {
            e.preventDefault();
        }
    }

    navBackward(e: MouseEvent) {
        this.stopTheSlideShow();
        this.prev();

        if (e && e.cancelable) {
            e.preventDefault();
        }
    }

    onIndicatorClick(index: number) {
        this.stopTheSlideShow();
        this.onActiveIndexChange.emit(index);
    }

    onIndicatorMouseEnter(index: number) {
        if (this.changeItemOnIndicatorHover) {
            this.stopTheSlideShow();
            this.onActiveIndexChange.emit(index);
        }
    }

    onIndicatorKeyDown(event, index: number) {
        switch (event.code) {
            case 'Enter':
            case 'Space':
                this.stopTheSlideShow();
                this.onActiveIndexChange.emit(index);
                event.preventDefault();
                break;

            case 'ArrowDown':
            case 'ArrowUp':
                event.preventDefault();
                break;

            default:
                break;
        }
    }

    isNavForwardDisabled() {
        return !this.circular && this.activeIndex === (<any[]>this.value).length - 1;
    }

    isNavBackwardDisabled() {
        return !this.circular && this.activeIndex === 0;
    }

    isIndicatorItemActive(index: number) {
        return this.activeIndex === index;
    }

    ariaSlideLabel() {
        return this.galleria.config.translation.aria ? this.galleria.config.translation.aria.slide : undefined;
    }

    ariaSlideNumber(value) {
        return this.galleria.config.translation.aria ? this.galleria.config.translation.aria.slideNumber.replace(/{slideNumber}/g, value) : undefined;
    }

    ariaPageLabel(value) {
        return this.galleria.config.translation.aria ? this.galleria.config.translation.aria.pageLabel.replace(/{page}/g, value) : undefined;
    }
}

@Component({
    selector: 'p-galleriaThumbnails',
    template: `
        <div class="p-galleria-thumbnail-wrapper">
            <div class="p-galleria-thumbnail-container">
                <button
                    *ngIf="showThumbnailNavigators"
                    type="button"
                    [ngClass]="{ 'p-galleria-thumbnail-prev p-link': true, 'p-disabled': this.isNavBackwardDisabled() }"
                    (click)="navBackward($event)"
                    [disabled]="isNavBackwardDisabled()"
                    pRipple
                    [attr.aria-label]="ariaPrevButtonLabel()"
                >
                    <ng-container *ngIf="!galleria.previousThumbnailIconTemplate">
                        <ChevronLeftIcon *ngIf="!isVertical" [styleClass]="'p-galleria-thumbnail-prev-icon'" />
                        <ChevronUpIcon *ngIf="isVertical" [styleClass]="'p-galleria-thumbnail-prev-icon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="galleria.previousThumbnailIconTemplate"></ng-template>
                </button>
                <div class="p-galleria-thumbnail-items-container" [ngStyle]="{ height: isVertical ? contentHeight : '' }">
                    <div #itemsContainer class="p-galleria-thumbnail-items" (transitionend)="onTransitionEnd()" (touchstart)="onTouchStart($event)" (touchmove)="onTouchMove($event)" role="tablist">
                        <div
                            *ngFor="let item of value; let index = index"
                            [ngClass]="{
                                'p-galleria-thumbnail-item': true,
                                'p-galleria-thumbnail-item-current': activeIndex === index,
                                'p-galleria-thumbnail-item-active': isItemActive(index),
                                'p-galleria-thumbnail-item-start': firstItemAciveIndex() === index,
                                'p-galleria-thumbnail-item-end': lastItemActiveIndex() === index
                            }"
                            [attr.aria-selected]="activeIndex === index"
                            [attr.aria-controls]="containerId + '_item_' + index"
                            [attr.data-pc-section]="'thumbnailitem'"
                            [attr.data-p-active]="activeIndex === index"
                            (keydown)="onThumbnailKeydown($event, index)"
                        >
                            <div
                                class="p-galleria-thumbnail-item-content"
                                [attr.tabindex]="activeIndex === index ? 0 : -1"
                                [attr.aria-current]="activeIndex === index ? 'page' : undefined"
                                [attr.aria-label]="ariaPageLabel(index + 1)"
                                (click)="onItemClick(index)"
                                (touchend)="onItemClick(index)"
                                (keydown.enter)="onItemClick(index)"
                            >
                                <p-galleriaItemSlot type="thumbnail" [item]="item" [templates]="templates"></p-galleriaItemSlot>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    *ngIf="showThumbnailNavigators"
                    type="button"
                    [ngClass]="{ 'p-galleria-thumbnail-next p-link': true, 'p-disabled': this.isNavForwardDisabled() }"
                    (click)="navForward($event)"
                    [disabled]="isNavForwardDisabled()"
                    pRipple
                    [attr.aria-label]="ariaNextButtonLabel()"
                >
                    <ng-container *ngIf="!galleria.nextThumbnailIconTemplate">
                        <ChevronRightIcon *ngIf="!isVertical" [ngClass]="'p-galleria-thumbnail-next-icon'" />
                        <ChevronDownIcon *ngIf="isVertical" [ngClass]="'p-galleria-thumbnail-next-icon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="galleria.nextThumbnailIconTemplate"></ng-template>
                </button>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleriaThumbnails implements OnInit, AfterContentChecked, AfterViewInit, OnDestroy {
    @Input() containerId: string | undefined;

    @Input() value: any[] | undefined;

    @Input({ transform: booleanAttribute }) isVertical: boolean = false;

    @Input({ transform: booleanAttribute }) slideShowActive: boolean = false;

    @Input({ transform: booleanAttribute }) circular: boolean = false;

    @Input() responsiveOptions: GalleriaResponsiveOptions[] | undefined;

    @Input() contentHeight: string = '300px';

    @Input() showThumbnailNavigators = true;

    @Input() templates: QueryList<PrimeTemplate> | undefined;

    @Output() onActiveIndexChange: EventEmitter<number> = new EventEmitter();

    @Output() stopSlideShow: EventEmitter<Event> = new EventEmitter();

    @ViewChild('itemsContainer') itemsContainer: ElementRef | undefined;

    @Input() get numVisible(): number {
        return this._numVisible;
    }

    set numVisible(numVisible) {
        this._numVisible = numVisible;
        this._oldNumVisible = this.d_numVisible;
        this.d_numVisible = numVisible;
    }

    @Input() get activeIndex(): number {
        return this._activeIndex;
    }

    set activeIndex(activeIndex) {
        this._oldactiveIndex = this._activeIndex;
        this._activeIndex = activeIndex;
    }

    index: number | undefined;

    startPos: { x: number; y: number } | null = null;

    thumbnailsStyle: HTMLStyleElement | null = null;

    sortedResponsiveOptions: GalleriaResponsiveOptions[] | null = null;

    totalShiftedItems: number = 0;

    page: number = 0;

    documentResizeListener: VoidListener;

    _numVisible: number = 0;

    d_numVisible: number = 0;

    _oldNumVisible: number = 0;

    _activeIndex: number = 0;

    _oldactiveIndex: number = 0;

    constructor(public galleria: Galleria, @Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: any, private renderer: Renderer2, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.createStyle();

            if (this.responsiveOptions) {
                this.bindDocumentListeners();
            }
        }
    }

    ngAfterContentChecked() {
        let totalShiftedItems = this.totalShiftedItems;

        if ((this._oldNumVisible !== this.d_numVisible || this._oldactiveIndex !== this._activeIndex) && this.itemsContainer) {
            if (this._activeIndex <= this.getMedianItemIndex()) {
                totalShiftedItems = 0;
            } else if ((<any[]>this.value).length - this.d_numVisible + this.getMedianItemIndex() < this._activeIndex) {
                totalShiftedItems = this.d_numVisible - (<any[]>this.value).length;
            } else if ((<any[]>this.value).length - this.d_numVisible < this._activeIndex && this.d_numVisible % 2 === 0) {
                totalShiftedItems = this._activeIndex * -1 + this.getMedianItemIndex() + 1;
            } else {
                totalShiftedItems = this._activeIndex * -1 + this.getMedianItemIndex();
            }

            if (totalShiftedItems !== this.totalShiftedItems) {
                this.totalShiftedItems = totalShiftedItems;
            }

            if (this.itemsContainer && this.itemsContainer.nativeElement) {
                this.itemsContainer.nativeElement.style.transform = this.isVertical ? `translate3d(0, ${totalShiftedItems * (100 / this.d_numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / this.d_numVisible)}%, 0, 0)`;
            }

            if (this._oldactiveIndex !== this._activeIndex) {
                DomHandler.removeClass(this.itemsContainer.nativeElement, 'p-items-hidden');
                this.itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';
            }

            this._oldactiveIndex = this._activeIndex;
            this._oldNumVisible = this.d_numVisible;
        }
    }

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.calculatePosition();
        }
    }

    createStyle() {
        if (!this.thumbnailsStyle) {
            this.thumbnailsStyle = this.document.createElement('style');
            this.document.body.appendChild(this.thumbnailsStyle);
        }

        let innerHTML = `
            #${this.containerId} .p-galleria-thumbnail-item {
                flex: 1 0 ${100 / this.d_numVisible}%
            }
        `;

        if (this.responsiveOptions) {
            this.sortedResponsiveOptions = [...this.responsiveOptions];
            this.sortedResponsiveOptions.sort((data1, data2) => {
                const value1 = data1.breakpoint;
                const value2 = data2.breakpoint;
                let result = null;

                if (value1 == null && value2 != null) result = -1;
                else if (value1 != null && value2 == null) result = 1;
                else if (value1 == null && value2 == null) result = 0;
                else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2, undefined, { numeric: true });
                else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

                return -1 * result;
            });

            for (let i = 0; i < this.sortedResponsiveOptions.length; i++) {
                let res = this.sortedResponsiveOptions[i];

                innerHTML += `
                    @media screen and (max-width: ${res.breakpoint}) {
                        #${this.containerId} .p-galleria-thumbnail-item {
                            flex: 1 0 ${100 / res.numVisible}%
                        }
                    }
                `;
            }
        }

        this.thumbnailsStyle.innerHTML = innerHTML;
    }

    calculatePosition() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.itemsContainer && this.sortedResponsiveOptions) {
                let windowWidth = window.innerWidth;
                let matchedResponsiveData = {
                    numVisible: this._numVisible
                };

                for (let i = 0; i < this.sortedResponsiveOptions.length; i++) {
                    let res = this.sortedResponsiveOptions[i];

                    if (parseInt(res.breakpoint, 10) >= windowWidth) {
                        matchedResponsiveData = res;
                    }
                }

                if (this.d_numVisible !== matchedResponsiveData.numVisible) {
                    this.d_numVisible = matchedResponsiveData.numVisible;
                    this.cd.markForCheck();
                }
            }
        }
    }

    getTabIndex(index: number) {
        return this.isItemActive(index) ? 0 : null;
    }

    navForward(e: TouchEvent | MouseEvent) {
        this.stopTheSlideShow();

        let nextItemIndex = this._activeIndex + 1;
        if (nextItemIndex + this.totalShiftedItems > this.getMedianItemIndex() && (-1 * this.totalShiftedItems < this.getTotalPageNumber() - 1 || this.circular)) {
            this.step(-1);
        }

        let activeIndex = this.circular && (<any[]>this.value).length - 1 === this._activeIndex ? 0 : nextItemIndex;
        this.onActiveIndexChange.emit(activeIndex);

        if (e.cancelable) {
            e.preventDefault();
        }
    }

    navBackward(e: TouchEvent | MouseEvent) {
        this.stopTheSlideShow();

        let prevItemIndex = this._activeIndex !== 0 ? this._activeIndex - 1 : 0;
        let diff = prevItemIndex + this.totalShiftedItems;
        if (this.d_numVisible - diff - 1 > this.getMedianItemIndex() && (-1 * this.totalShiftedItems !== 0 || this.circular)) {
            this.step(1);
        }

        let activeIndex = this.circular && this._activeIndex === 0 ? (<any[]>this.value).length - 1 : prevItemIndex;
        this.onActiveIndexChange.emit(activeIndex);

        if (e.cancelable) {
            e.preventDefault();
        }
    }

    onItemClick(index: number) {
        this.stopTheSlideShow();

        let selectedItemIndex = index;
        if (selectedItemIndex !== this._activeIndex) {
            const diff = selectedItemIndex + this.totalShiftedItems;
            let dir = 0;
            if (selectedItemIndex < this._activeIndex) {
                dir = this.d_numVisible - diff - 1 - this.getMedianItemIndex();
                if (dir > 0 && -1 * this.totalShiftedItems !== 0) {
                    this.step(dir);
                }
            } else {
                dir = this.getMedianItemIndex() - diff;
                if (dir < 0 && -1 * this.totalShiftedItems < this.getTotalPageNumber() - 1) {
                    this.step(dir);
                }
            }

            this.activeIndex = selectedItemIndex;
            this.onActiveIndexChange.emit(this.activeIndex);
        }
    }

    onThumbnailKeydown(event: KeyboardEvent, index: number) {
        if (event.code === 'Enter' || event.code === 'Space') {
            this.onItemClick(index);
            event.preventDefault();
        }

        switch (event.code) {
            case 'ArrowRight':
                this.onRightKey();
                break;

            case 'ArrowLeft':
                this.onLeftKey();
                break;

            case 'Home':
                this.onHomeKey();
                event.preventDefault();
                break;

            case 'End':
                this.onEndKey();
                event.preventDefault();
                break;

            case 'ArrowUp':
            case 'ArrowDown':
                event.preventDefault();
                break;

            case 'Tab':
                this.onTabKey();
                break;

            default:
                break;
        }
    }

    onRightKey() {
        const indicators = DomHandler.find(this.itemsContainer.nativeElement, '[data-pc-section="thumbnailitem"]');
        const activeIndex = this.findFocusedIndicatorIndex();

        this.changedFocusedIndicator(activeIndex, activeIndex + 1 === indicators.length ? indicators.length - 1 : activeIndex + 1);
    }

    onLeftKey() {
        const activeIndex = this.findFocusedIndicatorIndex();

        this.changedFocusedIndicator(activeIndex, activeIndex - 1 <= 0 ? 0 : activeIndex - 1);
    }

    onHomeKey() {
        const activeIndex = this.findFocusedIndicatorIndex();

        this.changedFocusedIndicator(activeIndex, 0);
    }

    onEndKey() {
        const indicators = DomHandler.find(this.itemsContainer.nativeElement, '[data-pc-section="thumbnailitem"]');
        const activeIndex = this.findFocusedIndicatorIndex();

        this.changedFocusedIndicator(activeIndex, indicators.length - 1);
    }

    onTabKey() {
        const indicators = [...DomHandler.find(this.itemsContainer.nativeElement, '[data-pc-section="thumbnailitem"]')];
        const highlightedIndex = indicators.findIndex((ind) => DomHandler.getAttribute(ind, 'data-p-active') === true);

        const activeIndicator = DomHandler.findSingle(this.itemsContainer.nativeElement, '[tabindex="0"]');

        const activeIndex = indicators.findIndex((ind) => ind === activeIndicator.parentElement);

        indicators[activeIndex].children[0].tabIndex = '-1';
        indicators[highlightedIndex].children[0].tabIndex = '0';
    }

    findFocusedIndicatorIndex() {
        const indicators = [...DomHandler.find(this.itemsContainer.nativeElement, '[data-pc-section="thumbnailitem"]')];
        const activeIndicator = DomHandler.findSingle(this.itemsContainer.nativeElement, '[data-pc-section="thumbnailitem"] > [tabindex="0"]');

        return indicators.findIndex((ind) => ind === activeIndicator.parentElement);
    }

    changedFocusedIndicator(prevInd, nextInd) {
        const indicators = DomHandler.find(this.itemsContainer.nativeElement, '[data-pc-section="thumbnailitem"]');

        indicators[prevInd].children[0].tabIndex = '-1';
        indicators[nextInd].children[0].tabIndex = '0';
        indicators[nextInd].children[0].focus();
    }

    step(dir: number) {
        let totalShiftedItems = this.totalShiftedItems + dir;

        if (dir < 0 && -1 * totalShiftedItems + this.d_numVisible > (<any[]>this.value).length - 1) {
            totalShiftedItems = this.d_numVisible - (<any[]>this.value).length;
        } else if (dir > 0 && totalShiftedItems > 0) {
            totalShiftedItems = 0;
        }

        if (this.circular) {
            if (dir < 0 && (<any[]>this.value).length - 1 === this._activeIndex) {
                totalShiftedItems = 0;
            } else if (dir > 0 && this._activeIndex === 0) {
                totalShiftedItems = this.d_numVisible - (<any[]>this.value).length;
            }
        }

        if (this.itemsContainer) {
            DomHandler.removeClass(this.itemsContainer.nativeElement, 'p-items-hidden');
            this.itemsContainer.nativeElement.style.transform = this.isVertical ? `translate3d(0, ${totalShiftedItems * (100 / this.d_numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / this.d_numVisible)}%, 0, 0)`;
            this.itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';
        }

        this.totalShiftedItems = totalShiftedItems;
    }

    stopTheSlideShow() {
        if (this.slideShowActive && this.stopSlideShow) {
            this.stopSlideShow.emit();
        }
    }

    changePageOnTouch(e: TouchEvent, diff: number) {
        if (diff < 0) {
            // left
            this.navForward(e);
        } else {
            // right
            this.navBackward(e);
        }
    }

    getTotalPageNumber() {
        return (<any[]>this.value).length > this.d_numVisible ? (<any[]>this.value).length - this.d_numVisible + 1 : 0;
    }

    getMedianItemIndex() {
        let index = Math.floor(this.d_numVisible / 2);

        return this.d_numVisible % 2 ? index : index - 1;
    }

    onTransitionEnd() {
        if (this.itemsContainer && this.itemsContainer.nativeElement) {
            DomHandler.addClass(this.itemsContainer.nativeElement, 'p-items-hidden');
            this.itemsContainer.nativeElement.style.transition = '';
        }
    }

    onTouchEnd(e: TouchEvent) {
        let touchobj = e.changedTouches[0];

        if (this.isVertical) {
            this.changePageOnTouch(e, touchobj.pageY - (<{ x: number; y: number }>this.startPos).y);
        } else {
            this.changePageOnTouch(e, touchobj.pageX - (<{ x: number; y: number }>this.startPos).x);
        }
    }

    onTouchMove(e: TouchEvent) {
        if (e.cancelable) {
            e.preventDefault();
        }
    }

    onTouchStart(e: TouchEvent) {
        let touchobj = e.changedTouches[0];

        this.startPos = {
            x: touchobj.pageX,
            y: touchobj.pageY
        };
    }

    isNavBackwardDisabled() {
        return (!this.circular && this._activeIndex === 0) || (<any[]>this.value).length <= this.d_numVisible;
    }

    isNavForwardDisabled() {
        return (!this.circular && this._activeIndex === (<any[]>this.value).length - 1) || (<any[]>this.value).length <= this.d_numVisible;
    }

    firstItemAciveIndex() {
        return this.totalShiftedItems * -1;
    }

    lastItemActiveIndex() {
        return this.firstItemAciveIndex() + this.d_numVisible - 1;
    }

    isItemActive(index: number) {
        return this.firstItemAciveIndex() <= index && this.lastItemActiveIndex() >= index;
    }

    bindDocumentListeners() {
        if (isPlatformBrowser(this.platformId)) {
            const window = this.document.defaultView || 'window';
            this.documentResizeListener = this.renderer.listen(window, 'resize', () => {
                this.calculatePosition();
            });
        }
    }

    unbindDocumentListeners() {
        if (this.documentResizeListener) {
            this.documentResizeListener();
            this.documentResizeListener = null;
        }
    }

    ngOnDestroy() {
        if (this.responsiveOptions) {
            this.unbindDocumentListeners();
        }

        if (this.thumbnailsStyle) {
            this.thumbnailsStyle.parentNode?.removeChild(this.thumbnailsStyle);
        }
    }

    ariaPrevButtonLabel() {
        return this.galleria.config.translation.aria ? this.galleria.config.translation.aria.prevPageLabel : undefined;
    }

    ariaNextButtonLabel() {
        return this.galleria.config.translation.aria ? this.galleria.config.translation.aria.nextPageLabel : undefined;
    }

    ariaPageLabel(value) {
        return this.galleria.config.translation.aria ? this.galleria.config.translation.aria.pageLabel.replace(/{page}/g, value) : undefined;
    }
}

@NgModule({
    imports: [CommonModule, SharedModule, RippleModule, TimesIcon, ChevronRightIcon, ChevronLeftIcon, WindowMaximizeIcon, WindowMinimizeIcon, FocusTrapModule],
    exports: [CommonModule, Galleria, GalleriaContent, GalleriaItemSlot, GalleriaItem, GalleriaThumbnails, SharedModule],
    declarations: [Galleria, GalleriaContent, GalleriaItemSlot, GalleriaItem, GalleriaThumbnails]
})
export class GalleriaModule {}
