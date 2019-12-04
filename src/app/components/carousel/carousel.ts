import { Component, Input, ElementRef, ViewChild, AfterContentInit, TemplateRef, ContentChildren, QueryList, NgModule, NgZone, EventEmitter, Output, ContentChild } from '@angular/core';
import { PrimeTemplate, SharedModule, Header, Footer } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { UniqueComponentId } from 'primeng/utils';

@Component({
	selector: 'p-carousel',
	template: `
		<div [attr.id]="id" [ngClass]="containerClass()" [ngStyle]="style" [class]="styleClass">
			<div class="ui-carousel-header" *ngIf="headerFacet">
				<ng-content select="p-header"></ng-content>
			</div>
			<div [class]="contentClasses()">
				<div class="ui-carousel-container">
					<button [ngClass]="{'ui-carousel-prev ui-button ui-widget ui-state-default ui-corner-all':true, 'ui-state-disabled': isBackwardNavDisabled()}" [disabled]="isBackwardNavDisabled()" (click)="navBackward($event)">
						<span [ngClass]="{'ui-carousel-prev-icon pi': true, 'pi-chevron-left': !isVertical(), 'pi-chevron-up': isVertical()}"></span>
					</button>
					<div class="ui-carousel-items-content" [ngStyle]="{'height': isVertical() ? verticalViewPortHeight : 'auto'}">
						<div #itemsContainer class="ui-carousel-items-container" (transitionend)="onTransitionEnd()" (touchend)="onTouchEnd($event)" (touchstart)="onTouchStart($event)" (touchmove)="onTouchMove($event)">
							<div *ngFor="let item of clonedItemsForStarting; let index = index" [ngClass]= "{'ui-carousel-item ui-carousel-item-cloned': true,'ui-carousel-item-active': (totalShiftedItems * -1) === (value.length),
							'ui-carousel-item-start': 0 === index,
							'ui-carousel-item-end': (clonedItemsForStarting.length - 1) === index}">
								<ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
							</div>
							<div *ngFor="let item of value; let index = index" [ngClass]= "{'ui-carousel-item': true,'ui-carousel-item-active': (firstIndex() <= index && lastIndex() >= index),
							'ui-carousel-item-start': firstIndex() === index,
							'ui-carousel-item-end': lastIndex() === index}">
								<ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
							</div>
							<div *ngFor="let item of clonedItemsForFinishing; let index = index" [ngClass]= "{'ui-carousel-item ui-carousel-item-cloned': true,'ui-carousel-item-active': ((totalShiftedItems *-1) === numVisible),
							'ui-carousel-item-start': 0 === index,
							'ui-carousel-item-end': (clonedItemsForFinishing.length - 1) === index}">
								<ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
							</div>
						</div>
					</div>
					<button [ngClass]="{'ui-carousel-next ui-button ui-widget ui-state-default ui-corner-all': true, 'ui-state-disabled': isForwardNavDisabled()}" [disabled]="isForwardNavDisabled()" (click)="navForward($event)">
						<span [ngClass]="{'ui-carousel-next-icon pi': true, 'pi-chevron-right': !isVertical(), 'pi-chevron-down': isVertical()}"></span>
					</button>
				</div>
				<ul [class]="dotsContentClasses()">
					<li *ngFor="let totalDot of totalDotsArray(); let i = index" [ngClass]="{'ui-carousel-dot-item':true,'ui-state-highlight': _page === i}">
						<button class="ui-button ui-widget ui-state-default ui-corner-all" (click)="onDotClick($event, i)">
							<span [ngClass]="{'ui-carousel-dot-icon pi':true, 'pi-circle-on': _page === i, 'pi-circle-off': !(_page === i)}"></span>
						</button>
					</li>
				</ul>
			</div>
			<div class="ui-carousel-footer" *ngIf="footerFacet">
				<ng-content select="p-footer"></ng-content>
			</div>
		</div>
	`
})
export class Carousel implements AfterContentInit {

	@Input() get page():number {
		return this._page;
	}
	set page(val:number) {
		if (this.isCreated && val !== this._page) {
			if (this.autoplayInterval) {
				this.stopAutoplay();
				this.allowAutoplay = false;
			}

			if (val > this._page && val < (this.totalDots() - 1)) {
				this.step(-1, val);
			}
			else if (val < this._page && val !== 0) {
				this.step(1, val);
			}
		} 

		this._page = val;
	}
		
	@Input() get numVisible():number {
		return this._numVisible;
	}
	set numVisible(val:number) {
		this._numVisible = val;
	}
		
	@Input() get numScroll():number {
		return this._numVisible;
	}
	set numScroll(val:number) {
		this._numScroll = val;
	}
	
	@Input() responsiveOptions: any[];
	
	@Input() orientation = "horizontal";
	
	@Input() verticalViewPortHeight = "300px";
	
	@Input() contentClass: String = "";

	@Input() dotsContainerClass: String = "";

	@Input() get value() :any[] {
		return this._value;
	};
	set value(val) {
		this._value = val;
		if (this.circular && this._value) {
			this.setCloneItems();
		}
	}
	
	@Input() circular:boolean = false;

	@Input() autoplayInterval:number = 0;

	@Input() style: any;

	@Input() styleClass: string;
	
    @Output() onPage: EventEmitter<any> = new EventEmitter();

	@ViewChild('itemsContainer', { static: true }) itemsContainer: ElementRef;

	@ContentChild(Header, { static: true }) headerFacet;

    @ContentChild(Footer, { static: true }) footerFacet;

	@ContentChildren(PrimeTemplate) templates: QueryList<any>;

	_numVisible: number = 1;

	_numScroll: number = 1;

	_oldNumScroll: number = 0;

	prevState: any = {
		numScroll:0,
		numVisible:0,
		value: []
	};

	defaultNumScroll:number = 1;

	defaultNumVisible:number = 1;

	_page: number = 0;

	_value: any[];

	carouselStyle:any;

	id:string;

	totalShiftedItems;

	isRemainingItemsAdded:boolean = false;

	animationTimeout:any;

	translateTimeout:any;

	remainingItems: number = 0;

	_items: any[];

	startPos: any;

	documentResizeListener: any;

	clonedItemsForStarting: any[];

	clonedItemsForFinishing: any[];

	allowAutoplay: boolean;

	interval: any;

	isCreated: boolean;

	public itemTemplate: TemplateRef<any>;

	constructor(public el: ElementRef, public zone: NgZone) { 
		this.totalShiftedItems = this.page * this.numScroll * -1; 
	}

	ngAfterContentInit() {
		this.id = UniqueComponentId();
		this.allowAutoplay = !!this.autoplayInterval;

		if (this.circular) {
			this.setCloneItems();
		}

		if (this.responsiveOptions) {
			this.defaultNumScroll = this._numScroll;
			this.defaultNumVisible = this._numVisible;
		}

		this.createStyle();
		this.calculatePosition();

		if (this.responsiveOptions) {
			this.bindDocumentListeners();
		}

		this.templates.forEach((item) => {
			switch (item.getType()) {
				case 'item':
					this.itemTemplate = item.template;
					break;

				default:
					this.itemTemplate = item.template;
					break;
			}
		});
	}

	ngAfterContentChecked() {
		const isCircular = this.isCircular();
		let totalShiftedItems = this.totalShiftedItems;
		
		if (this.value && (this.prevState.numScroll !== this._numScroll || this.prevState.numVisible !== this._numVisible || this.prevState.value.length !== this.value.length)) {
			if (this.autoplayInterval) {
				this.stopAutoplay();
			}
			
			this.remainingItems = (this.value.length - this._numVisible) % this._numScroll;

			let page = this._page;
			if (this.totalDots() !== 0 && page >= this.totalDots()) {
                page = this.totalDots() - 1;
				this._page = page;
				this.onPage.emit({
					page: this.page
				});
			}
			
			totalShiftedItems = (page * this._numScroll) * -1;
            if (isCircular) {
                totalShiftedItems -= this._numVisible;
            }

			if (page === (this.totalDots() - 1) && this.remainingItems > 0) {
				totalShiftedItems += (-1 * this.remainingItems) + this._numScroll;
				this.isRemainingItemsAdded = true;
			}
			else {
				this.isRemainingItemsAdded = false;
			}

			if (totalShiftedItems !== this.totalShiftedItems) {
                this.totalShiftedItems = totalShiftedItems;
            }

			this._oldNumScroll = this._numScroll;
			this.prevState.numScroll = this._numScroll;
			this.prevState.numVisible = this._numVisible;
			this.prevState.value = this._value;

			this.itemsContainer.nativeElement.style.transform = this.isVertical() ? `translate3d(0, ${totalShiftedItems * (100/ this._numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100/ this._numVisible)}%, 0, 0)`;
			this.isCreated = true;

			if (this.autoplayInterval && this.isAutoplay()) {
				this.startAutoplay();
			}
		}

		if (isCircular) {
            if (this.page === 0) {
                totalShiftedItems = -1 * this._numVisible;
            }
            else if (totalShiftedItems === 0) {
                totalShiftedItems = -1 * this.value.length;
                if (this.remainingItems > 0) {
                    this.isRemainingItemsAdded = true;
                }
            }

            if (totalShiftedItems !== this.totalShiftedItems) {
				this.totalShiftedItems = totalShiftedItems;
            }
		}
	}

	createStyle() {
			if (!this.carouselStyle) {
				this.carouselStyle = document.createElement('style');
				this.carouselStyle.type = 'text/css';
				document.body.appendChild(this.carouselStyle);
			}

			let innerHTML = `
            #${this.id} .ui-carousel-item {
				flex: 1 0 ${ (100/ this.numVisible) }%
			}
        `;

			if (this.responsiveOptions) {
				this.responsiveOptions.sort((data1, data2) => {
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

				for (let i = 0; i < this.responsiveOptions.length; i++) {
					let res = this.responsiveOptions[i];

					innerHTML += `
                    @media screen and (max-width: ${res.breakpoint}) {
                        #${this.id} .ui-carousel-item {
                            flex: 1 0 ${ (100/ res.numVisible) }%
                        }
                    }
                `
				}
			}

			this.carouselStyle.innerHTML = innerHTML;
		}

	calculatePosition() {
		if (this.itemsContainer && this.responsiveOptions) {
			let windowWidth = window.innerWidth;
			let matchedResponsiveData = {
				numVisible: this.defaultNumVisible,
				numScroll: this.defaultNumScroll
			};

			for (let i = 0; i < this.responsiveOptions.length; i++) {
				let res = this.responsiveOptions[i];

				if (parseInt(res.breakpoint, 10) >= windowWidth) {
					matchedResponsiveData = res;
				}
			}

			if (this._numScroll !== matchedResponsiveData.numScroll) {
				let page = this._page;
				page = Math.floor((page * this._numScroll) / matchedResponsiveData.numScroll);

				let totalShiftedItems = (matchedResponsiveData.numScroll * this.page) * -1;

				if (this.isCircular()) {
					totalShiftedItems -= matchedResponsiveData.numVisible;
				}

				this.totalShiftedItems = totalShiftedItems;
				this._numScroll = matchedResponsiveData.numScroll;

				this._page = page;
				this.onPage.emit({
					page: this.page
				});
			}

			if (this._numVisible !== matchedResponsiveData.numVisible) {
				this._numVisible = matchedResponsiveData.numVisible;
				this.setCloneItems();
			}
		}
	}
	
	setCloneItems() {
		this.clonedItemsForStarting = [];
		this.clonedItemsForFinishing = [];
		if (this.isCircular()) {
			this.clonedItemsForStarting.push(...this.value.slice(-1 * this._numVisible));
			this.clonedItemsForFinishing.push(...this.value.slice(0, this._numVisible));
		}
	}

	firstIndex() {
		return this.isCircular() ? (-1 * (this.totalShiftedItems + this.numVisible)) : (this.totalShiftedItems * -1);
	}

	lastIndex() {
		return this.firstIndex() + this.numVisible - 1;
	}

	totalDots() {
		return this.value ? Math.ceil((this.value.length - this._numVisible) / this._numScroll) + 1 : 0;
	}
	totalDotsArray() {
		let totalDots = this.totalDots();
		return totalDots === 0 ? [] : Array(totalDots).fill(0);
	}

	containerClass() {
		return {
			'ui-carousel ui-widget':true, 
			'ui-carousel-vertical': this.isVertical(),
			'ui-carousel-horizontal': !this.isVertical()
		};
	}

	contentClasses() {
		return 'ui-carousel-content '+ this.contentClass;
	}

	dotsContentClasses() {
		return 'ui-carousel-dots-container ui-helper-reset ' + this.dotsContainerClass;
	}

	isVertical() {
		return this.orientation === 'vertical';
	}

	isCircular() {
		return this.circular && this.value && this.value.length >= this.numVisible;
	}

	isAutoplay() {
		return this.autoplayInterval && this.allowAutoplay;
	}

	isForwardNavDisabled() {
		return this.isEmpty() || (this._page === this.totalDots() - 1 && !this.circular);
	}

	isBackwardNavDisabled() {
		return this.isEmpty() || (this._page === 0  && !this.circular);
	}

	isEmpty() {
		return !this.value || this.value.length === 0;
	}

	navForward(e,index?) {
		if (this.circular || this._page < (this.totalDots() - 1)) {
			this.step(-1, index);
		}

		if (this.autoplayInterval) {
			this.stopAutoplay();
			this.allowAutoplay = false;
		}

		if (e && e.cancelable) {
			e.preventDefault();
		}
	}

	navBackward(e,index?) {
		if (this.circular || this._page !== 0) {
			this.step(1, index);
		}

		if (this.autoplayInterval) {
			this.stopAutoplay();
			this.allowAutoplay = false;
		}
		
		if (e && e.cancelable) {
			e.preventDefault();
		}
	}

	onDotClick(e, index) {
		let page = this._page;

		if (this.autoplayInterval) {
			this.stopAutoplay();
			this.allowAutoplay = false;
		}
		
		if (index > page) {
			this.navForward(e, index);
		}
		else if (index < page) {
			this.navBackward(e, index);
		}
	}

	step(dir, page) {
		let totalShiftedItems = this.totalShiftedItems;
		const isCircular = this.isCircular();

		if (page != null) {
			totalShiftedItems = (this._numScroll * page) * -1;

			if (isCircular) {
				totalShiftedItems -= this._numVisible;
			}

			this.isRemainingItemsAdded = false;
		}
		else {
			totalShiftedItems += (this._numScroll * dir);
			if (this.isRemainingItemsAdded) {
				totalShiftedItems += this.remainingItems - (this._numScroll * dir);
				this.isRemainingItemsAdded = false;
			}

			let originalShiftedItems = isCircular ? (totalShiftedItems + this._numVisible) : totalShiftedItems;
			page = Math.abs(Math.floor((originalShiftedItems / this._numScroll)));
		}

		if (isCircular && this.page === (this.totalDots() - 1) && dir === -1) {
			totalShiftedItems = -1 * (this.value.length + this._numVisible);
			page = 0;
		}
		else if (isCircular && this.page === 0 && dir === 1) {
			totalShiftedItems = 0;
			page = (this.totalDots() - 1);
		}
		else if (page === (this.totalDots() - 1) && this.remainingItems > 0) {
			totalShiftedItems += ((this.remainingItems * -1) - (this._numScroll * dir));
			this.isRemainingItemsAdded = true;
		}

		if (this.itemsContainer) {
			this.itemsContainer.nativeElement.style.transform = this.isVertical() ? `translate3d(0, ${totalShiftedItems * (100/ this._numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100/ this._numVisible)}%, 0, 0)`;
			this.itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';
		}

		this.totalShiftedItems = totalShiftedItems;
		this._page = page;
		this.onPage.emit({
			page: this.page
		});
	}

	startAutoplay() {
		this.interval = setInterval(() => {
			if (this.page === (this.totalDots() - 1)) {
				this.step(-1, 0);
			}
			else {
				this.step(-1, this.page + 1);
			}
		}, 
		this.autoplayInterval);
	}

	stopAutoplay() {
		if (this.interval) {
			clearInterval(this.interval);
		}
	}

	onTransitionEnd() {
		if (this.itemsContainer) {
			this.itemsContainer.nativeElement.style.transition = '';

			if ((this.page === 0 || this.page === (this.totalDots() - 1)) && this.isCircular()) {
				this.itemsContainer.nativeElement.style.transform = this.isVertical() ? `translate3d(0, ${this.totalShiftedItems * (100/ this._numVisible)}%, 0)` : `translate3d(${this.totalShiftedItems * (100/ this._numVisible)}%, 0, 0)`;
			}
		}
	}

	onTouchStart(e) {
		let touchobj = e.changedTouches[0];

		this.startPos = {
			x: touchobj.pageX,
			y: touchobj.pageY
		};
	}

	onTouchMove(e) {
		if (e.cancelable) {
			e.preventDefault();
		}
	}
	onTouchEnd(e) {
		let touchobj = e.changedTouches[0];

		if (this.isVertical()) {
			this.changePageOnTouch(e, (touchobj.pageY - this.startPos.y));
		}
		else {
			this.changePageOnTouch(e, (touchobj.pageX - this.startPos.x));
		}
	}

	changePageOnTouch(e, diff) {
		if (diff < 0) {
			this.navForward(e);
		}
		else {
			this.navBackward(e);
		}
	}

	bindDocumentListeners() {
		if (!this.documentResizeListener) {
			this.documentResizeListener = (e) => {
				this.calculatePosition();
			};

			window.addEventListener('resize', this.documentResizeListener);
		}
	}

	unbindDocumentListeners() {
		if (this.documentResizeListener) {
			window.removeEventListener('resize', this.documentResizeListener);
			this.documentResizeListener = null;
		}
	}

	ngOnDestroy() {
		if (this.responsiveOptions) {
			this.unbindDocumentListeners();
		}
		if (this.autoplayInterval) {
			this.stopAutoplay();
		}
    }

}

@NgModule({
	imports: [CommonModule, SharedModule],
	exports: [CommonModule, Carousel, SharedModule],
	declarations: [Carousel]
})
export class CarouselModule { }
