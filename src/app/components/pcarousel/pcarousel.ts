import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewChecked, AfterContentInit, TemplateRef, ContentChildren, QueryList, NgModule, NgZone } from '@angular/core';
import { PrimeTemplate, SharedModule, UniqueComponentId } from '../common/shared';
import { CommonModule } from '@angular/common';
@Component({
	selector: 'p-carousel',
	template: `
	
		<div [attr.id]="id" [ngClass]="containerClass()">
			<div [class]="contentClasses()">
				<button [ngClass]="{'p-carousel-prev p-link':true, 'ui-state-disabled': _activeIndex === 0  && !circular}" [disabled]="_activeIndex === 0  && !circular" (click)="navBackward()">
					<span class="p-carousel-prev-icon pi pi-chevron-left"></span>
				</button>
				<div class="p-carousel-container" [ngStyle]="{'height': isVertical() ? verticalContentHeight : 'auto'}">
					<div class="p-carousel-header">
						<ng-content select="p-header"></ng-content>
					</div>
					<div #itemsContainer class="p-carousel-items" (touchend)="onTouchEnd($event)" (touchstart)="onTouchStart($event)" (touchmove)="onTouchMove($event)">
						<div *ngFor="let item of clonedItemsForStarting; let index = index" [ngClass]= "{'p-carousel-item p-carousel-item-cloned': true,'p-carousel-item-active': (this.totalShiftedItems === 0),
						'p-carousel-item-start': 0 === index,
						'p-carousel-item-end': (clonedItemsForStarting.length - 1) === index}">
							<ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
						</div>
						<div *ngFor="let item of value; let index = index" [ngClass]= "{'p-carousel-item': true,'p-carousel-item-active': (firstIndex() <= index && lastIndex() >= index),
						'p-carousel-item-start': firstIndex() === index,
						'p-carousel-item-end': lastIndex() === index}">
							<ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
						</div>
						<div *ngFor="let item of clonedItemsForStarting; let index = index" [ngClass]= "{'p-carousel-item p-carousel-item-cloned': true,'p-carousel-item-active': (this.totalShiftedItems * -1) === (this.value.length + this.numVisible),
						'p-carousel-item-start': 0 === index,
						'p-carousel-item-end': (clonedItemsForStarting.lenght - 1) === index}">
							<ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
						</div>
					</div>
					<div class="p-carousel-footer">
						<ng-content select="p-footer"></ng-content>
					</div>
				</div>
				<button [ngClass]="{'p-carousel-next p-link': true, 'ui-state-disabled': (_activeIndex === totalDots()-1 && !circular)}" (click)="navForward()" [disabled]="_activeIndex === totalDots()-1 && !circular">
					<span class="p-carousel-next-icon pi pi-chevron-right"></span>
				</button>
			</div>
			<ul [class]="dotsContentClasses()">
				<li *ngFor="let totalDot of totalDotsArray(); let i = index" [ngClass]="{'p-carousel-dot-item':true,'p-highlight': _activeIndex === i}">
					<button class="p-link" (click)="onDotClick($event, i)">
						<span [ngClass]="{'p-carousel-dot-icon pi':true, 'pi-circle-on': _activeIndex === i, 'pi-circle-off': !(_activeIndex === i)}"></span>
					</button>
				</li>
			</ul>
		</div>

	`,
	styleUrls: ['./pcarousel.css']
})
export class PCarousel implements OnInit, AfterContentInit {

	@Input() get page():number {
		return this._activeIndex;
	}
	set page(val:number) {
		this._activeIndex = val;
	}
		
	@Input() header = null;
		
	@Input() footer = null;
		
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
	
	@Input() responsive: any[];
	
	@Input() orientation = "horizontal";
	
	@Input() verticalContentHeight = "300px";
	
	@Input() contentClass: String = "";

	@Input() dotsContentClass: String = "";

	@Input() value :any[];
	
	@Input() circular:boolean = false;

	@ViewChild('itemsContainer', { static: true }) itemsContainer: ElementRef;

	@ContentChildren(PrimeTemplate) templates: QueryList<any>;

	_numVisible: number = 1;

	_numScroll: number = 1;

	_oldNumScroll: number = 0;

	defaultNumScroll:number = 1;

	defaultNumVisible:number = 1;

	_activeIndex: number = 0;

	carouselStyle:any;

	id:string;

	totalShiftedItems= this.page * this.numScroll * -1;

	isRemainingItemsAdded:boolean = false;

	animationTimeout:any;

	translateTimeout:any;

	remainingItems: number = 0;

	_items: any[];

	startPos: any;

	documentResizeListener: any;

	clonedItemsForStarting: any[];

	clonedItemsForFinishing: any[];

	public itemTemplate: TemplateRef<any>;

	constructor(public el: ElementRef, public zone: NgZone) { 
		
	}

	ngOnInit() {
	}

	ngAfterContentInit() {
		this.id = UniqueComponentId();
		if (this.circular) {
			this.setCloneItems();
		}

		if (this.responsive) {
			this.defaultNumScroll = this._numScroll;
			this.defaultNumVisible = this._numVisible;
		}

		this.createStyle();
		this.calculatePosition();

		if (this.responsive) {
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
		if(this._oldNumScroll !== this._numScroll) {
			this.remainingItems = (this.value.length - this._numVisible) % this._numScroll;

			let totalShiftedItems = this.totalShiftedItems;
			let activeIndex = this._activeIndex;

			if (activeIndex === (this.totalDots() - 1) && this.remainingItems > 0) {
				totalShiftedItems += (-1 * this.remainingItems) + this._numScroll;
				this.totalShiftedItems = totalShiftedItems;
				this.isRemainingItemsAdded = true;
			}
			else {
				this.isRemainingItemsAdded = false;
			}

			this._oldNumScroll = this._numScroll;

			this.itemsContainer.nativeElement.style.transform = this.isVertical() ? `translate3d(0, ${totalShiftedItems * (100/ this._numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100/ this._numVisible)}%, 0, 0)`;
		}
	}

	createStyle() {
			if (!this.carouselStyle) {
				this.carouselStyle = document.createElement('style');
				this.carouselStyle.type = 'text/css';
				document.body.appendChild(this.carouselStyle);
			}

			let innerHTML = `
            #${this.id} .p-carousel-item {
				flex: 1 0 ${ (100/ this.numVisible) }%
			}
        `;

			if (this.responsive) {
				this.responsive.sort((data1, data2) => {
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

				for (let i = 0; i < this.responsive.length; i++) {
					let res = this.responsive[i];

					innerHTML += `
                    @media screen and (max-width: ${res.breakpoint}) {
                        #${this.id} .p-carousel-item {
                            flex: 1 0 ${ (100/ res.numVisible) }%
                        }
                    }
                `
				}
			}

			this.carouselStyle.innerHTML = innerHTML;
		}

		calculatePosition() {
			if (this.itemsContainer && this.responsive) {
				let windowWidth = window.innerWidth;
				let matchedResponsiveData = {
					numVisible: this.defaultNumVisible,
					numScroll: this.defaultNumScroll
				};

				for (let i = 0; i < this.responsive.length; i++) {
					let res = this.responsive[i];

					if (parseInt(res.breakpoint, 10) >= windowWidth) {
						matchedResponsiveData = res;
					}
				}

				if (this._numScroll !== matchedResponsiveData.numScroll) {
					let activeIndex = this._activeIndex;
					activeIndex = Math.floor((activeIndex * this._numScroll) / matchedResponsiveData.numScroll);

					let totalShiftedItems = (matchedResponsiveData.numScroll * this.page) * -1;

					this.totalShiftedItems = totalShiftedItems;
					this._numScroll = matchedResponsiveData.numScroll;

					this.page = activeIndex;
				}

				if (this._numVisible !== matchedResponsiveData.numVisible) {
					this._numVisible = matchedResponsiveData.numVisible;
				}
			}
		}
		
		setCloneItems() {
			this.clonedItemsForStarting = [];
			this.clonedItemsForFinishing = [];
			if (this.circular) {
				this.clonedItemsForStarting.push(...this.value.slice(-1 * this._numVisible));
				this.clonedItemsForFinishing.push(...this.value.slice(0, this._numVisible));
			}
		}

		firstIndex() {
			return this.isCircular ? (-1 * (this.totalShiftedItems + this.numVisible)) : (this.totalShiftedItems * -1);
		}

		lastIndex() {
			return this.firstIndex() + this.numVisible - 1;
		}

		totalDots() {
			return this.value ? Math.ceil((this.value.length - this._numVisible) / this._numScroll) + 1 : 0;
		}
		totalDotsArray() {
			let totalDots = Array(this.value ? Math.ceil((this.value.length - this._numVisible) / this._numScroll) + 1 : 0).fill(0);
			return totalDots;
		}

		containerClass() {
			return {'p-carousel p-component':true, 
				'p-carousel-vertical': this.isVertical()
			};
		}

		contentClasses() {
			return 'p-carousel-content '+ this.contentClass;
		}

		dotsContentClasses() {
			return 'p-carousel-dots-content ui-helper-reset ' + this.dotsContentClass;
		}

		isVertical() {
			return this.orientation === 'vertical';
		}

		isCircular() {
			return this.circular && this.value.length >= this.numVisible;
		}

		navForward(e?,index?) {
			if (this._activeIndex < (this.totalDots() - 1)) {
				this.step(-1, index);
			}

			if (e && e.cancelable) {
				e.preventDefault();
			}
		}

		navBackward(e?,index?) {
			if (this._activeIndex !== 0) {
				this.step(1, index);
			}

			if (e && e.cancelable) {
				e.preventDefault();
			}
		}

		onDotClick(e?, index?) {
			let activeIndex = this._activeIndex;

			if (index > activeIndex) {
				this.navForward(e, index);
			}
			else if (index < activeIndex) {
				this.navBackward(e, index);
			}
		}

		step(dir, index) {
			let totalShiftedItems = this.totalShiftedItems;

			if (index != null) {
				totalShiftedItems = (this._numScroll * index) * -1;
				this.isRemainingItemsAdded = false;
			}
			else {
				totalShiftedItems += (this._numScroll * dir);
				if (this.isRemainingItemsAdded) {
					totalShiftedItems += this.remainingItems - (this._numScroll * dir);
					this.isRemainingItemsAdded = false;
				}

				index = Math.abs(Math.floor((totalShiftedItems / this._numScroll)));
			}

			if (index === (this.totalDots() - 1) && this.remainingItems > 0) {
				totalShiftedItems += ((this.remainingItems * -1) - (this._numScroll * dir));
				this.isRemainingItemsAdded = true;
			}

			if (this.itemsContainer) {
				this.itemsContainer.nativeElement.style.transform = this.isVertical() ? `translate3d(0, ${totalShiftedItems * (100/ this._numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100/ this._numVisible)}%, 0, 0)`;
				this.itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';

				if (this.animationTimeout) {
					clearTimeout(this.animationTimeout);
				}

				this.animationTimeout = setTimeout(() => {
					if (this.itemsContainer) {
						this.itemsContainer.nativeElement.style.transition = '';
					}
				}, 500);
			}

			this.totalShiftedItems = totalShiftedItems;

			this.page = index;
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
		if(this.documentResizeListener) {
			window.removeEventListener('resize', this.documentResizeListener);
			this.documentResizeListener = null;
		}
	}

	ngOnDestroy() {
		if (this.responsive) {
			this.unbindDocumentListeners();
		}
    }

}

@NgModule({
	imports: [CommonModule, SharedModule],
	exports: [CommonModule, PCarousel, SharedModule],
	declarations: [PCarousel]
})
export class PCarouselModule { }
