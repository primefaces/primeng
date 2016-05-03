import {Component,ElementRef,AfterViewInit,AfterViewChecked,DoCheck,OnDestroy,OnChanges,Input,Output,SimpleChange,IterableDiffers,EventEmitter,TemplateRef,ContentChild,NgZone} from 'angular2/core';
import {DomHandler} from '../dom/domhandler';

@Component({
    selector: 'p-carousel',
    template: `
        <div [ngClass]="{'ui-carousel ui-widget ui-widget-content ui-corner-all':true}" [attr.style]="style" [class]="styleClass">
            <div [ngClass]="{'ui-carousel-header ui-widget-header':true}">
                <div class="ui-carousel-header-title">{{headerText}}</div>
                <span class="ui-carousel-button ui-carousel-next-button fa fa-arrow-circle-right" (click)="onNextNav()" [ngClass]="{'ui-state-disabled':page === totalPages-1 && !circular}"></span>
                <span class="ui-carousel-button ui-carousel-prev-button fa fa-arrow-circle-left" (click)="onPrevNav()" [ngClass]="{'ui-state-disabled':page === 0 && !circular}"></span>
                <div class="ui-carousel-page-links">
                    <a href="#" class="ui-carousel-page-link fa fa-circle-o" *ngFor="let links of anchorPageLinks;let i=index" [ngClass]="{'fa-dot-circle-o':page===i}"></a>
                </div>
                <select class="ui-carousel-mobiledropdown ui-widget ui-state-default ui-corner-left" (change)="setPage($event.target.value)">
                    <option *ngFor="let option of mobileDropdownOptions" [value]="option" [selected]="value == option">{{option+1}}</option>
                </select>
            </div>
            <div [ngClass]="{'ui-carousel-viewport':true}">
                <ul class="ui-carousel-items" [style.transition]="easing">
                    <template ngFor [ngForOf]="dataToRender" [ngForTemplate]="itemTemplate"></template>
                </ul>
            </div>
        </div>
    `,
    providers: [DomHandler]
})
export class Carousel implements AfterViewChecked,AfterViewInit,DoCheck{
    
    @Input() value: any[];

    @Input() numVisible: number = 3;

    @Input() firstVisible: number = 0;

    @Input() headerText: string;

    @Input() effectDuration: any = 500;

    @Input() circular: boolean = false;

    @Input() breakpoint: number = 560;

    @Input() responsive: boolean = true;

    @Input() autoplayInterval: number = 0;

    @Input() easing: string = 'left 1s';

    @Input() pageLinks: number = 3;

    @Input() style: string;

    @Input() styleClass: string;
    
    @ContentChild(TemplateRef) itemTemplate: TemplateRef;
    
    private dataToRender: any[];
    
    private container: any;
    
    private viewport: any;
    
    private itemsContainer: any;
    
    private itemsCount: any;
    
    private items: any;
    
    private columns: any;
    
    private first: any;
    
    private page: any;
    
    private totalPages: any;
    
    private mobileDropdown: any;
    
    private pageLinksEl: any;
    
    private valuesChanged: any;
    
    private interval: any;
    
    private anchorPageLinks: any[];
    
    private mobileDropdownOptions: any[];
    
    differ: any;

    constructor(private el: ElementRef, private domHandler: DomHandler, differs: IterableDiffers,private zone:NgZone) {
        this.differ = differs.find([]).create(null);
    }
    
    ngDoCheck() {
        let changes = this.differ.diff(this.value);
        
        if(changes) {
            this.dataToRender = this.value;
            this.valuesChanged = true;
        }
    
        this.generateLinks();
        this.generateMobileDropdown();
    }
    
    ngAfterViewChecked() {
        if(this.valuesChanged) {
            this.stopAutoplay();
            this.render();
            this.valuesChanged = false;
        }
    }

    ngAfterViewInit() {
        this.container = this.el.nativeElement.children[0];
        this.viewport = this.domHandler.findSingle(this.el.nativeElement,'div.ui-carousel-viewport');
        this.itemsContainer = this.domHandler.findSingle(this.el.nativeElement,'ul.ui-carousel-items');
        
        if(this.value && this.value.length) {
            this.render();
        } 
    }
    
    generateLinks() {
        this.anchorPageLinks = [];
        for (let i = 0; i < this.pageLinks; i++) {
            this.anchorPageLinks.push(i);
        }
    }
    
    generateMobileDropdown() {
        this.mobileDropdownOptions = [];
        for (let i = 0; i < this.numVisible * this.pageLinks; i++) {
            this.mobileDropdownOptions.push(i);
        }
    }
    
    render() {
        this.items = this.domHandler.find(this.itemsContainer,'li');
        this.itemsCount = this.itemsContainer.children.length;
        this.columns = this.numVisible;
        this.first = this.firstVisible;
        this.page = this.first/this.columns;
        this.totalPages = Math.ceil(this.itemsCount/this.columns);
        
        this.mobileDropdown = this.domHandler.findSingle(this.el.nativeElement,'select.ui-carousel-mobiledropdown');
        this.pageLinksEl = this.domHandler.findSingle(this.el.nativeElement,'div.ui-carousel-page-links');
        
        if(this.responsive) {
            this.refreshDimensions();
            this.container.style.width = (this.domHandler.width(this.container)) + 'px';
        }
        else {
            this.calculateItemWidths();
            this.container.style.width = (this.domHandler.width(this.container)) + 'px';
        }
        
        if(this.autoplayInterval) {
            this.circular = true;
            this.startAutoplay();
        }
    }
    
    calculateItemWidths () {
        let firstItem = this.items[0];
        if(firstItem) {
            let itemFrameWidth = this.domHandler.getOuterWidth(firstItem,true) - this.domHandler.width(firstItem);    //sum of margin, border and padding
            for (let i = 0; i < this.items.length; i++) {
                this.items[i].style.width = ((this.domHandler.innerWidth(this.viewport) - itemFrameWidth * this.columns) / this.columns) + 'px';
            }
        }
    }
    
    onNextNav() {
        let lastPage = (this.page === (this.totalPages - 1));

        if(!lastPage) {
            this.setPage(this.page + 1);
        }
        else if(this.circular) {
            this.setPage(0);
        }
    }
    
    onPrevNav() {
        if(this.page !== 0) {
            this.setPage(this.page - 1);
        }
        else if(this.circular) {
            this.setPage(this.totalPages - 1);
        }
    }
    
    setPage (p) {
        if(p !== this.page) {
            this.itemsContainer.style.left = (-1 * (this.domHandler.innerWidth(this.viewport) * p)) + 'px';
            this.page = p;
            this.first = this.page * this.columns;
        }
    }
    
    refreshDimensions() {
        let win = window;
        if(win.innerWidth <= this.breakpoint) {
            this.columns = 1;
            this.calculateItemWidths();
            this.totalPages = this.itemsCount;
            this.mobileDropdown.style.display = "block";
            this.pageLinksEl.style.display = "none";
        }
        else {
            this.columns = this.numVisible;
            this.calculateItemWidths();
            this.totalPages = Math.ceil(this.itemsCount / this.numVisible);
            this.mobileDropdown.style.display = "none";
            this.pageLinksEl.style.display = "block";
        }

        this.page = this.first / this.columns;
        this.itemsContainer.style.left = (-1 * (this.domHandler.innerWidth(this.viewport) * this.page)) + 'px';
    }
    
    startAutoplay() {
        this.interval = setInterval(() => {
            if(this.page === (this.totalPages - 1))
                this.setPage(0);
            else
                this.setPage(this.page + 1);
        }, this.autoplayInterval);
    }

    stopAutoplay() {
        clearInterval(this.interval);
    }
    
}