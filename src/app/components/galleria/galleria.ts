import {NgModule,Component,ElementRef,OnDestroy,Input,Output,EventEmitter,ChangeDetectionStrategy, ViewChild, ContentChildren, QueryList, TemplateRef, OnInit, OnChanges, AfterContentChecked, SimpleChanges, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import { SharedModule, PrimeTemplate } from 'primeng/api';
import { UniqueComponentId } from 'primeng/utils';
import { DomHandler } from 'primeng/dom';
import { RippleModule } from 'primeng/ripple';  

@Component({
    selector: 'p-galleria',
    template: `
        <div *ngIf="fullScreen;else windowed">
            <div *ngIf="visible" #mask [ngClass]="{'p-galleria-mask p-component-overlay':true, 'p-galleria-visible': this.visible}" [class]="maskClass" [ngStyle]="{'zIndex':zIndex}">
                <p-galleriaContent [value]="value" [activeIndex]="activeIndex" (maskHide)="onMaskHide()" (activeItemChange)="onActiveItemChange($event)" [ngStyle]="containerStyle"></p-galleriaContent>
            </div>
        </div>

        <ng-template #windowed>
            <p-galleriaContent [value]="value" [activeIndex]="activeIndex" (activeItemChange)="onActiveItemChange($event)"></p-galleriaContent>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./galleria.css']
})
export class Galleria implements OnChanges, OnDestroy {

    @Input() get activeIndex(): number {
        return this._activeIndex;
    };

    set activeIndex(activeIndex) {
        this._activeIndex = activeIndex;
    }

    @Input() fullScreen: boolean = false;

    @Input() id: string;

    @Input() value: any[];

    @Input() numVisible: number = 3;

    @Input() responsiveOptions: any[];

    @Input() showItemNavigators: boolean = false;

    @Input() showThumbnailNavigators: boolean = true;

    @Input() showItemNavigatorsOnHover: boolean = false;

    @Input() changeItemOnIndicatorHover: boolean = false;

    @Input() circular: boolean = false;

    @Input() autoPlay: boolean = false;

    @Input() transitionInterval: number = 4000;

    @Input() showThumbnails: boolean = true;

    @Input() thumbnailsPosition: string = "bottom";

    @Input() verticalThumbnailViewPortHeight: string = "300px";

    @Input() showIndicators: boolean = false;

    @Input() showIndicatorsOnItem: boolean = false;

    @Input() indicatorsPosition: string = "bottom";

    @Input() baseZIndex: number = 0;

    @Input() maskClass: string;

    @Input() containerClass: string;

    @Input() containerStyle: any;

    @ViewChild('mask', {static: false}) mask: ElementRef;

    @Input() get visible(): boolean {
        return this._visible;
    };

    set visible(visible: boolean) {
        this._visible = visible;
    }

    @Output() activeIndexChange: EventEmitter<any> = new EventEmitter();

    @Output() visibleChange: EventEmitter<any> = new EventEmitter();
    
	@ContentChildren(PrimeTemplate) templates: QueryList<any>;


    _visible: boolean = false;

    _activeIndex: number = 0;

    headerFacet: any;

    footerFacet: any;

    indicatorFacet: any;

    captionFacet: any;

    zIndex: string;

    constructor(public element: ElementRef, public cd: ChangeDetectorRef) { }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'header':
                    this.headerFacet = item.template;
                break;
                case 'footer':
                    this.footerFacet = item.template;
                break;
                case 'indicator':
                    this.indicatorFacet = item.template;
                break;
                case 'caption':
                    this.captionFacet = item.template;
                break;
            }
        });
    }

    ngOnChanges(simpleChanges: SimpleChanges) {
        if (this.fullScreen && simpleChanges.visible) {
            if (simpleChanges.visible.currentValue) {
                DomHandler.addClass(document.body, 'p-overflow-hidden');

                this.zIndex = String(this.baseZIndex + ++DomHandler.zindex)
            }
            else {
                DomHandler.removeClass(document.body, 'p-overflow-hidden');
            }
        }
    }
    
    onMaskHide() {
        this.visible = false;
        this.visibleChange.emit(false);
    }

    onActiveItemChange(index) {
        if (this.activeIndex !== index) {
            this.activeIndex = index;
            this.activeIndexChange.emit(index);
        }
    }

    ngOnDestroy() {
        if (this.fullScreen) {
            DomHandler.removeClass(document.body, 'p-overflow-hidden');
        }
    }
}

@Component({
    selector: 'p-galleriaContent',
    template: `
        <div [attr.id]="id" *ngIf="value && value.length > 0" [ngClass]="{'p-galleria p-component': true, 'p-galleria-fullscreen': this.galleria.fullScreen, 
            'p-galleria-indicator-onitem': this.galleria.showIndicatorsOnItem, 'p-galleria-item-nav-onhover': this.galleria.showItemNavigatorsOnHover && !this.galleria.fullScreen}"
            [ngStyle]="!galleria.fullScreen ? galleria.containerStyle : {}" [class]="galleriaClass()">
            <button *ngIf="galleria.fullScreen" type="button" class="p-galleria-close p-link" (click)="maskHide.emit()" pRipple>
                <span class="p-galleria-close-icon pi pi-times"></span>
            </button>
            <div *ngIf="galleria.templates && galleria.headerFacet" class="p-galleria-header">
                <p-galleriaItemSlot type="header" [templates]="galleria.templates"></p-galleriaItemSlot>
            </div>
            <div class="p-galleria-content">
                <p-galleriaItem [value]="value" [activeIndex]="activeIndex" [circular]="galleria.circular" [templates]="galleria.templates" (onActiveIndexChange)="onActiveIndexChange($event)" 
                    [showIndicators]="galleria.showIndicators" [changeItemOnIndicatorHover]="galleria.changeItemOnIndicatorHover" [indicatorFacet]="galleria.indicatorFacet"
                    [captionFacet]="galleria.captionFacet" [showItemNavigators]="galleria.showItemNavigators" [autoPlay]="galleria.autoPlay" [slideShowActive]="slideShowActive"
                    (startSlideShow)="startSlideShow()" (stopSlideShow)="stopSlideShow()"></p-galleriaItem>

                <p-galleriaThumbnails *ngIf="galleria.showThumbnails" [containerId]="id" [value]="value" (onActiveIndexChange)="onActiveIndexChange($event)" [activeIndex]="activeIndex" [templates]="galleria.templates"
                    [numVisible]="galleria.numVisible" [responsiveOptions]="galleria.responsiveOptions" [circular]="galleria.circular"
                    [isVertical]="isVertical()" [contentHeight]="galleria.verticalThumbnailViewPortHeight" [showThumbnailNavigators]="galleria.showThumbnailNavigators"
                    [slideShowActive]="slideShowActive" (stopSlideShow)="stopSlideShow()"></p-galleriaThumbnails>
            </div>
            <div *ngIf="galleria.templates && galleria.footerFacet" class="p-galleria-footer">
                <p-galleriaItemSlot type="footer" [templates]="galleria.templates"></p-galleriaItemSlot>
            </div>
        </div>
    `,
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleriaContent {

    @Input() get activeIndex(): number {
        return this._activeIndex;
    };

    set activeIndex(activeIndex: number) {
        this._activeIndex = activeIndex;
    }

    @Input() value: any[] = [];

    @Output() maskHide: EventEmitter<any> = new EventEmitter();

    @Output() activeItemChange: EventEmitter<any> = new EventEmitter();

    id: string = this.galleria.id || UniqueComponentId();

    slideShowActicve: boolean = false;

    _activeIndex: number = 0;

    slideShowActive: boolean = true;

    interval: any;

    styleClass: string;

    constructor(public galleria: Galleria, public cd: ChangeDetectorRef) { }

    galleriaClass() {
        const thumbnailsPosClass = this.galleria.showThumbnails && this.getPositionClass('p-galleria-thumbnails', this.galleria.thumbnailsPosition);
        const indicatorPosClass = this.galleria.showIndicators && this.getPositionClass('p-galleria-indicators', this.galleria.indicatorsPosition);

        return (this.galleria.containerClass ? this.galleria.containerClass + " " : '') + (thumbnailsPosClass ? thumbnailsPosClass + " " : '') + (indicatorPosClass ? indicatorPosClass + " " : '');
    }

    startSlideShow() {
        this.interval = setInterval(() => {
            let activeIndex = (this.galleria.circular && (this.value.length - 1) === this.activeIndex) ? 0 : (this.activeIndex + 1);
            this.onActiveIndexChange(activeIndex);
            this.activeIndex = activeIndex;
        }, this.galleria.transitionInterval);

        this.slideShowActive = true;
    }

    stopSlideShow() {
        if (this.interval) {
            clearInterval(this.interval);
        }

        this.slideShowActive = false;
    }

    getPositionClass(preClassName, position) {
        const positions = ['top', 'left', 'bottom', 'right'];
        const pos = positions.find(item => item === position);

        return pos ? `${preClassName}-${pos}` : '';
    }

    isVertical() {
        return this.galleria.thumbnailsPosition === 'left' || this.galleria.thumbnailsPosition === 'right';
    }

    onActiveIndexChange(index) {
        if (this.activeIndex !== index) {
            this.activeIndex = index;
            this.activeItemChange.emit(this.activeIndex);
        }
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
    @Input() templates: QueryList<any>;

    @Input() index: number;

    @Input() get item(): any {
        return this._item;
    };

    set item(item:any) {
        this._item = item;
        if (this.templates) {
            this.templates.forEach((item) => {
                if (item.getType() === this.type) {
                    switch(this.type) {
                        case 'item':
                        case 'caption':
                        case 'thumbnail':
                            this.context = {$implicit: this.item};
                            this.contentTemplate = item.template;
                        break;
                    }
                }
            });
        }
    }

    @Input() type: string;

    contentTemplate: TemplateRef<any>;

    context:any;

    _item:any;

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            if (item.getType() === this.type) {
                switch(this.type) {
                    case 'item':
                    case 'caption':
                    case 'thumbnail':
                        this.context = {$implicit: this.item};
                        this.contentTemplate = item.template;
                    break;
                    case 'indicator':
                        this.context = {$implicit: this.index};
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
                <button *ngIf="showItemNavigators" type="button" [ngClass]="{'p-galleria-item-prev p-galleria-item-nav p-link': true, 'p-disabled': this.isNavBackwardDisabled()}" (click)="navBackward($event)" [disabled]="isNavBackwardDisabled()" pRipple>
                    <span class="p-galleria-item-prev-icon pi pi-chevron-left"></span>
                </button>
                <p-galleriaItemSlot type="item" [item]="activeItem" [templates]="templates" class="p-galleria-item"></p-galleriaItemSlot>
                <button *ngIf="showItemNavigators" type="button" [ngClass]="{'p-galleria-item-next p-galleria-item-nav p-link': true,'p-disabled': this.isNavForwardDisabled()}" (click)="navForward($event)"  [disabled]="isNavForwardDisabled()" pRipple>
                    <span class="p-galleria-item-next-icon pi pi-chevron-right"></span>
                </button>
                <div class="p-galleria-caption" *ngIf="captionFacet">
                    <p-galleriaItemSlot type="caption" [item]="activeItem" [templates]="templates"></p-galleriaItemSlot>
                </div>
            </div>
            <ul *ngIf="showIndicators" class="p-galleria-indicators p-reset">
                <li *ngFor="let item of value; let index = index;" tabindex="0"
                    (click)="onIndicatorClick(index)" (mouseenter)="onIndicatorMouseEnter(index)" (keydown.enter)="onIndicatorKeyDown(index)"
                    [ngClass]="{'p-galleria-indicator': true,'p-highlight': isIndicatorItemActive(index)}">
                    <button type="button" tabIndex="-1" class="p-link" *ngIf="!indicatorFacet">
                    </button>
                    <p-galleriaItemSlot type="indicator" [index]="index" [templates]="templates"></p-galleriaItemSlot>
                </li>
            </ul>
        </div>
    `,
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleriaItem implements OnInit {

    @Input() circular: boolean = false;

    @Input() value: any[];

    @Input() showItemNavigators: boolean = false;

    @Input() showIndicators: boolean = true;

    @Input() slideShowActive: boolean = true;

    @Input() changeItemOnIndicatorHover: boolean = true;

    @Input() autoPlay: boolean = false;

    @Input() templates: QueryList<any>;

    @Input() indicatorFacet: any;

    @Input() captionFacet: any;

    @Output() startSlideShow: EventEmitter<any> = new EventEmitter();

    @Output() stopSlideShow: EventEmitter<any> = new EventEmitter();
    
    @Output() onActiveIndexChange: EventEmitter<any> = new EventEmitter();

    @Input() get activeIndex(): number {
        return this._activeIndex;
    };

    set activeIndex(activeIndex) {
        this._activeIndex = activeIndex;
        this.activeItem = this.value[this._activeIndex];
    }

    _activeIndex: number = 0;

    activeItem: any;

    ngOnInit() {
        if (this.autoPlay) {
            this.startSlideShow.emit();
        }
    }

    next() {
        let nextItemIndex = this.activeIndex + 1;
        let activeIndex = this.circular && this.value.length - 1 === this.activeIndex
                    ? 0
                    : nextItemIndex;
        this.onActiveIndexChange.emit(activeIndex);
    }

    prev() {
        let prevItemIndex = this.activeIndex !== 0 ? this.activeIndex - 1 : 0;
        let activeIndex = this.circular && this.activeIndex === 0
                ? this.value.length - 1
                : prevItemIndex
        this.onActiveIndexChange.emit(activeIndex);
    }

    stopTheSlideShow() {
        if (this.slideShowActive && this.stopSlideShow) {
            this.stopSlideShow.emit();
        }
    }

    navForward(e) {
        this.stopTheSlideShow();
        this.next();

        if (e && e.cancelable) {
            e.preventDefault();
        }
    }

    navBackward(e) {
        this.stopTheSlideShow();
        this.prev();

        if (e && e.cancelable) {
            e.preventDefault();
        }
    }

    onIndicatorClick(index) {
        this.stopTheSlideShow();
        this.onActiveIndexChange.emit(index);
    }

    onIndicatorMouseEnter(index) {
        if (this.changeItemOnIndicatorHover) {
            this.stopTheSlideShow();
            this.onActiveIndexChange.emit(index);
        }
    }

    onIndicatorKeyDown(index) {
        this.stopTheSlideShow();
        this.onActiveIndexChange.emit(index);
    }

    isNavForwardDisabled() {
        return !this.circular && this.activeIndex === (this.value.length - 1);
    }

    isNavBackwardDisabled() {
        return !this.circular && this.activeIndex === 0;
    }

    isIndicatorItemActive(index) {
        return this.activeIndex === index;
    }
}

@Component({
    selector: 'p-galleriaThumbnails',
    template: `
        <div class="p-galleria-thumbnail-wrapper">
            <div class="p-galleria-thumbnail-container">
                <button *ngIf="showThumbnailNavigators" type="button" [ngClass]="{'p-galleria-thumbnail-prev p-link': true, 'p-disabled': this.isNavBackwardDisabled()}" (click)="navBackward($event)" [disabled]="isNavBackwardDisabled()" pRipple>
                    <span [ngClass]="{'p-galleria-thumbnail-prev-icon pi': true, 'pi-chevron-left': !this.isVertical, 'pi-chevron-up': this.isVertical}"></span>
                </button>
                <div class="p-galleria-thumbnail-items-container" [ngStyle]="{'height': isVertical ? contentHeight : ''}">
                    <div #itemsContainer class="p-galleria-thumbnail-items" (transitionend)="onTransitionEnd()"
                        (touchstart)="onTouchStart($event)" (touchmove)="onTouchMove($event)" (touchend)="onTouchEnd($event)">
                        <div *ngFor="let item of value; let index = index;" [ngClass]="{'p-galleria-thumbnail-item': true, 'p-galleria-thumbnail-item-current': activeIndex === index, 'p-galleria-thumbnail-item-active': isItemActive(index),
                            'p-galleria-thumbnail-item-start': firstItemAciveIndex() === index, 'p-galleria-thumbnail-item-end': lastItemActiveIndex() === index }">
                            <div class="p-galleria-thumbnail-item-content" [attr.tabindex]="getTabIndex(index)" (click)="onItemClick(index)" (keydown.enter)="onItemClick(index)">
                                <p-galleriaItemSlot type="thumbnail" [item]="item" [templates]="templates"></p-galleriaItemSlot>
                            </div>
                        </div>
                    </div>
                </div>
                <button *ngIf="showThumbnailNavigators" type="button" [ngClass]="{'p-galleria-thumbnail-next p-link': true, 'p-disabled': this.isNavForwardDisabled()}" (click)="navForward($event)" [disabled]="isNavForwardDisabled()" pRipple>
                    <span [ngClass]="{'p-galleria-thumbnail-next-icon pi': true, 'pi-chevron-right': !this.isVertical, 'pi-chevron-down': this.isVertical}"></span>
                </button>
            </div>
        </div>
    `,
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleriaThumbnails implements OnInit, AfterContentChecked, OnDestroy {

    @Input() containerId: string;

    @Input() value: any[];

    @Input() isVertical: boolean = false;

    @Input() slideShowActive: boolean = false;

    @Input() circular: boolean = false;

    @Input() responsiveOptions: any[];

    @Input() contentHeight: string = "300px";

    @Input() showThumbnailNavigators = true;

    @Input() templates: QueryList<any>;

    @Output() onActiveIndexChange: EventEmitter<any> = new EventEmitter();

    @Output() stopSlideShow: EventEmitter<any> = new EventEmitter();

    @ViewChild('itemsContainer') itemsContainer: ElementRef;

    @Input() get numVisible(): number {
        return this._numVisible;
    };

    set numVisible(numVisible) {
        this._numVisible = numVisible;
        this._oldNumVisible = this.d_numVisible;
        this.d_numVisible = numVisible;
    }

    @Input() get activeIndex(): number {
        return this._activeIndex;
    };

    set activeIndex(activeIndex) {
        this._oldactiveIndex = this._activeIndex;
        this._activeIndex = activeIndex;
    }
    
    index: number;

    startPos = null;
    
    thumbnailsStyle = null;

    sortedResponsiveOptions = null;

    totalShiftedItems: number = 0;

    page: number = 0;

    documentResizeListener: any;

    _numVisible:number = 0;

    d_numVisible: number = 0;

    _oldNumVisible: number = 0;

    _activeIndex: number = 0;
    
    _oldactiveIndex: number = 0;

    ngOnInit() {
        this.createStyle();
		this.calculatePosition();

		if (this.responsiveOptions) {
			this.bindDocumentListeners();
		}
    }

    ngAfterContentChecked() {
        let totalShiftedItems = this.totalShiftedItems;

        if ((this._oldNumVisible !== this.d_numVisible || this._oldactiveIndex !== this._activeIndex) && this.itemsContainer) {
            if (this._activeIndex <= this.getMedianItemIndex()) {
                totalShiftedItems = 0;
            }
            else if (this.value.length - this.d_numVisible + this.getMedianItemIndex() < this._activeIndex) {
                totalShiftedItems = this.d_numVisible - this.value.length;
            }
            else if (this.value.length - this.d_numVisible < this._activeIndex && this.d_numVisible % 2 === 0) {
                totalShiftedItems = (this._activeIndex * -1) + this.getMedianItemIndex() + 1;
            }
            else {
                totalShiftedItems = (this._activeIndex * -1) + this.getMedianItemIndex();
            }

            if (totalShiftedItems !== this.totalShiftedItems) {
                this.totalShiftedItems = totalShiftedItems;
            }

            if (this.itemsContainer && this.itemsContainer.nativeElement) {
                this.itemsContainer.nativeElement.style.transform = this.isVertical ? `translate3d(0, ${totalShiftedItems * (100/ this.d_numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100/ this.d_numVisible)}%, 0, 0)`;
            }

            if (this._oldactiveIndex !== this._activeIndex) {
                DomHandler.removeClass(this.itemsContainer.nativeElement, 'p-items-hidden');
                this.itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';
            }

            this._oldactiveIndex = this._activeIndex;
            this._oldNumVisible = this.d_numVisible;
        }
    }

    createStyle() {
        if (!this.thumbnailsStyle) {
            this.thumbnailsStyle = document.createElement('style');
            this.thumbnailsStyle.type = 'text/css';
            document.body.appendChild(this.thumbnailsStyle);
        }

        let innerHTML = `
            #${this.containerId} .p-galleria-thumbnail-item {
                flex: 1 0 ${ (100/ this.d_numVisible) }%
            }
        `;

        if (this.responsiveOptions) {
            this.sortedResponsiveOptions = [...this.responsiveOptions];
            this.sortedResponsiveOptions.sort((data1, data2) => {
                const value1 = data1.breakpoint;
                const value2 = data2.breakpoint;
                let result = null;

                if (value1 == null && value2 != null)
                    result = -1;
                else if (value1 != null && value2 == null)
                    result = 1;
                else if (value1 == null && value2 == null)
                    result = 0;
                else if (typeof value1 === 'string' && typeof value2 === 'string')
                    result = value1.localeCompare(value2, undefined, { numeric: true });
                else
                    result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

                return -1 * result;
            });

            for (let i = 0; i < this.sortedResponsiveOptions.length; i++) {
                let res = this.sortedResponsiveOptions[i];

                innerHTML += `
                    @media screen and (max-width: ${res.breakpoint}) {
                        #${this.containerId} .p-galleria-thumbnail-item {
                            flex: 1 0 ${ (100/ res.numVisible) }%
                        }
                    }
                `
            }
        }

        this.thumbnailsStyle.innerHTML = innerHTML;
    }

    calculatePosition() {
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
            }
        }
    }

    getTabIndex(index) {
        return this.isItemActive(index) ? 0 : null;
    }

    navForward(e) {
        this.stopTheSlideShow();

        let nextItemIndex = this._activeIndex + 1;
        if (nextItemIndex + this.totalShiftedItems > this.getMedianItemIndex() && ((-1 * this.totalShiftedItems) < this.getTotalPageNumber() - 1 || this.circular)) {
            this.step(-1);
        }

        let activeIndex = this.circular && (this.value.length - 1) === this._activeIndex ? 0 : nextItemIndex;
        this.onActiveIndexChange.emit(activeIndex);

        if (e.cancelable) {
            e.preventDefault();
        }
    }

    navBackward(e) {
        this.stopTheSlideShow();

        let prevItemIndex = this._activeIndex !== 0 ? this._activeIndex - 1 : 0;
        let diff = prevItemIndex + this.totalShiftedItems;
        if ((this.d_numVisible - diff - 1) > this.getMedianItemIndex() && ((-1 * this.totalShiftedItems) !== 0 || this.circular)) {
            this.step(1);
        }

        let activeIndex = this.circular && this._activeIndex === 0 ? this.value.length - 1 : prevItemIndex;
        this.onActiveIndexChange.emit(activeIndex);

        if (e.cancelable) {
            e.preventDefault();
        }
    }

    onItemClick(index) {
        this.stopTheSlideShow();

        let selectedItemIndex = index;
        if (selectedItemIndex !== this._activeIndex) {
            const diff = selectedItemIndex + this.totalShiftedItems;
            let dir = 0;
            if (selectedItemIndex < this._activeIndex) {
                dir = (this.d_numVisible - diff - 1) - this.getMedianItemIndex();
                if (dir > 0 && (-1 * this.totalShiftedItems) !== 0) {
                    this.step(dir);
                }
            }
            else {
                dir = this.getMedianItemIndex() - diff;
                if (dir < 0 && (-1 * this.totalShiftedItems) < this.getTotalPageNumber() - 1) {
                    this.step(dir);
                }
            }

            this.activeIndex = selectedItemIndex;
            this.onActiveIndexChange.emit(this.activeIndex);
        }
    }

    step(dir) {
        let totalShiftedItems = this.totalShiftedItems + dir;

        if (dir < 0 && (-1 * totalShiftedItems) + this.d_numVisible > (this.value.length - 1)) {
            totalShiftedItems = this.d_numVisible - this.value.length;
        }
        else if (dir > 0 && totalShiftedItems > 0) {
            totalShiftedItems = 0;
        }

        if (this.circular) {
            if (dir < 0 && this.value.length - 1 === this._activeIndex) {
                totalShiftedItems = 0;
            }
            else if (dir > 0 && this._activeIndex === 0) {
                totalShiftedItems = this.d_numVisible - this.value.length;
            }
        }

        if (this.itemsContainer) {
            DomHandler.removeClass(this.itemsContainer.nativeElement, 'p-items-hidden');
            this.itemsContainer.nativeElement.style.transform = this.isVertical ? `translate3d(0, ${totalShiftedItems * (100/ this.d_numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100/ this.d_numVisible)}%, 0, 0)`;
            this.itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';
        }

        this.totalShiftedItems = totalShiftedItems;
    }

    stopTheSlideShow() {
        if (this.slideShowActive && this.stopSlideShow) {
            this.stopSlideShow.emit();
        }
    }

    changePageOnTouch(e, diff) {
        if (diff < 0) {           // left
            this.navForward(e);
        }
        else {                    // right
            this.navBackward(e);
        }
    }
    
    getTotalPageNumber() {
        return this.value.length > this.d_numVisible ? (this.value.length - this.d_numVisible) + 1 : 0;
    }

    getMedianItemIndex() {
        let index = Math.floor(this.d_numVisible / 2);

        return (this.d_numVisible % 2) ? index : index - 1;
    }

    onTransitionEnd() {
        if (this.itemsContainer && this.itemsContainer.nativeElement) {
            DomHandler.addClass(this.itemsContainer.nativeElement, 'p-items-hidden');
            this.itemsContainer.nativeElement.style.transition = '';
        }
    }

    onTouchEnd(e) {
        let touchobj = e.changedTouches[0];

        if (this.isVertical) {
            this.changePageOnTouch(e, (touchobj.pageY - this.startPos.y));
        }
        else {
            this.changePageOnTouch(e, (touchobj.pageX - this.startPos.x));
        }
    }

    onTouchMove(e) {
        if (e.cancelable) {
            e.preventDefault();
        }
    }

    onTouchStart(e) {
        let touchobj = e.changedTouches[0];

        this.startPos = {
            x: touchobj.pageX,
            y: touchobj.pageY
        };
    }

    isNavBackwardDisabled() {
        return (!this.circular && this._activeIndex === 0) || (this.value.length <= this.d_numVisible);
    }

    isNavForwardDisabled() {
        return (!this.circular && this._activeIndex === (this.value.length - 1)) || (this.value.length <= this.d_numVisible);
    }

    firstItemAciveIndex() {
        return this.totalShiftedItems * -1;
    }

    lastItemActiveIndex() {
        return this.firstItemAciveIndex() + this.d_numVisible - 1;
    }

    isItemActive(index) {
        return this.firstItemAciveIndex() <= index && this.lastItemActiveIndex() >= index;
    }

    bindDocumentListeners() {
        if (!this.documentResizeListener) {
            this.documentResizeListener = () => {
                this.calculatePosition();
            };

            window.addEventListener('resize', this.documentResizeListener);
        }
    }

    unbindDocumentListeners() {
        if(this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }

    ngOnDestroy() {
        if (this.responsiveOptions) {
			this.unbindDocumentListeners();
        }

        if (this.thumbnailsStyle) {
            this.thumbnailsStyle.parentNode.removeChild(this.thumbnailsStyle);
        }
    }
}

@NgModule({
    imports: [CommonModule, SharedModule, RippleModule],
    exports: [CommonModule, Galleria, GalleriaContent, GalleriaItemSlot, GalleriaItem, GalleriaThumbnails, SharedModule],
    declarations: [Galleria, GalleriaContent, GalleriaItemSlot, GalleriaItem, GalleriaThumbnails]
})
export class GalleriaModule { }