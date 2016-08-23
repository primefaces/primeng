import {NgModule,Component,ElementRef,OnInit,AfterViewInit,AfterViewChecked,DoCheck,OnDestroy,Input,Output,IterableDiffers,TemplateRef,ContentChild,Renderer} from '@angular/core';
import {DomHandler} from '../dom/domhandler';
import {SharedModule} from '../common/shared';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'p-carousel',
    template: `
        <div [ngClass]="{'ui-carousel ui-widget ui-widget-content ui-corner-all':true}" [ngStyle]="style" [class]="styleClass">
            <div class="ui-carousel-header ui-widget-header">
                <div class="ui-carousel-header-title">{{headerText}}</div>
                <span class="ui-carousel-button ui-carousel-next-button fa fa-arrow-circle-right" (click)="onNextNav()" 
                        [ngClass]="{'ui-state-disabled':(page === (totalPages-1)) && !circular}"></span>
                <span class="ui-carousel-button ui-carousel-prev-button fa fa-arrow-circle-left" (click)="onPrevNav()" 
                        [ngClass]="{'ui-state-disabled':(page === 0 && !circular)}"></span>
                <div *ngIf="displayPageLinks" class="ui-carousel-page-links">
                    <a href="#" (click)="setPageWithLink($event,i)" class="ui-carousel-page-link fa fa-circle-o" *ngFor="let links of anchorPageLinks;let i=index" [ngClass]="{'fa-dot-circle-o':page===i}"></a>
                </div>
                <select *ngIf="displayPageDropdown" class="ui-carousel-dropdown ui-widget ui-state-default ui-corner-left" [value]="page" (change)="onDropdownChange($event.target.value)">
                    <option *ngFor="let option of selectDropdownOptions" [value]="option" [selected]="value == option">{{option+1}}</option>
                </select>
                <select *ngIf="responsive" class="ui-carousel-mobiledropdown ui-widget ui-state-default ui-corner-left" [value]="page" (change)="onDropdownChange($event.target.value)"
                    [style.display]="shrinked ? 'block' : 'none'">
                    <option *ngFor="let option of mobileDropdownOptions" [value]="option" [selected]="value == option">{{option+1}}</option>
                </select>
            </div>
            <div class="ui-carousel-viewport">
                <ul class="ui-carousel-items" [style.left.px]="left" [style.transitionProperty]="'left'" 
                            [style.transitionDuration]="effectDuration" [style.transitionTimingFunction]="easing">
                    <li *ngFor="let item of value" class="ui-carousel-item ui-widget-content ui-corner-all">
                        <template [pTemplateWrapper]="itemTemplate" [item]="item"></template>
                    </li>
                </ul>
            </div>
        </div>
    `,
    providers: [DomHandler]
})
export class Carousel implements OnInit,AfterViewChecked,AfterViewInit,DoCheck,OnDestroy{
    
    @Input() value: any[];

    @Input() numVisible: number = 3;

    @Input() firstVisible: number = 0;

    @Input() headerText: string;

    @Input() circular: boolean = false;

    @Input() breakpoint: number = 560;

    @Input() responsive: boolean = true;

    @Input() autoplayInterval: number = 0;
    
    @Input() effectDuration: any = '1s';
        
    @Input() easing: string = 'ease-out';

    @Input() pageLinks: number = 3;

    @Input() style: any;

    @Input() styleClass: string;
    
    @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;
        
    protected container: any;    
    
    protected left: any = 0;
    
    protected viewport: any;
    
    protected itemsContainer: any;
    
    protected items: any;
    
    protected columns: any;
        
    protected page: number;
                    
    protected valuesChanged: any;
    
    protected interval: any;
    
    protected anchorPageLinks: any[];
    
    protected mobileDropdownOptions: any[];
    
    protected selectDropdownOptions: any[];
    
    protected shrinked: boolean;
    
    documentResponsiveListener: any;
    
    differ: any;

    constructor(protected el: ElementRef, protected domHandler: DomHandler, differs: IterableDiffers, protected renderer: Renderer) {
        this.differ = differs.find([]).create(null);
    }
    
    ngDoCheck() {
        let changes = this.differ.diff(this.value);
        
        if(changes) {
            if(this.value && this.value.length) {
                if(this.value.length && this.firstVisible >= this.value.length) {
                    this.setPage(this.totalPages - 1);
                }
            }
            else {
                this.setPage(0);
            }

            this.valuesChanged = true;
            
            if(this.autoplayInterval) {
                this.stopAutoplay();
            }
            
            this.updateMobileDropdown();
            this.updateLinks();
            this.updateDropdown();
        }
    }
    
    ngAfterViewChecked() {
        if(this.valuesChanged) {
            this.render();
            this.valuesChanged = false;
        }
    }
    
    ngOnInit() {
        if(window.innerWidth <= this.breakpoint) {
            this.shrinked = true;
            this.columns = 1;
        }
        else {
            this.shrinked = false;
            this.columns = this.numVisible;
        }
        this.page = Math.floor(this.firstVisible / this.columns);
    }

    ngAfterViewInit() {
        this.container = this.el.nativeElement.children[0];
        this.viewport = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-carousel-viewport');
        this.itemsContainer = this.domHandler.findSingle(this.el.nativeElement, 'ul.ui-carousel-items');    

        if(this.responsive) {
            this.documentResponsiveListener = this.renderer.listenGlobal('window', 'resize', (event) => {
                this.updateState();
            });
        }
        
        if(this.value && this.value.length) {
            this.render();
        }
    }
    
    updateLinks() {
        this.anchorPageLinks = [];
        for (let i = 0; i < this.totalPages; i++) {
            this.anchorPageLinks.push(i);
        }
    }
    
    updateDropdown() {
        this.selectDropdownOptions = [];
        for (let i = 0; i < this.totalPages; i++) {
            this.selectDropdownOptions.push(i);
        }
    }
    
    updateMobileDropdown() {
        this.mobileDropdownOptions = [];
        for (let i = 0; i < this.value.length; i++) {
            this.mobileDropdownOptions.push(i);
        }
    }
    
    render() {
        this.items = this.domHandler.find(this.itemsContainer,'li');
        this.calculateItemWidths();
        
        if(!this.responsive) {
            this.container.style.width = (this.domHandler.width(this.container)) + 'px';
        }
        
        if(this.autoplayInterval) {
            this.circular = true;
            this.startAutoplay();
        }
    }
    
    calculateItemWidths () {
        let firstItem = (this.items && this.items.length) ? this.items[0] : null;
        if(firstItem) {
            for (let i = 0; i < this.items.length; i++) {
                this.items[i].style.width = ((this.domHandler.innerWidth(this.viewport) - (this.domHandler.getHorizontalMargin(firstItem) * this.columns)) / this.columns) + 'px';
            }
        }
    }
    
    onNextNav() {
        let lastPage = (this.page === (this.totalPages - 1));

        if(!lastPage)
            this.setPage(this.page + 1);
        else if(this.circular)
            this.setPage(0);
    }
    
    onPrevNav() {
        if(this.page !== 0)
            this.setPage(this.page - 1);
        else if(this.circular)
            this.setPage(this.totalPages - 1);
    }
    
    setPageWithLink(event, p: number) {
        this.setPage(p);
        event.preventDefault();
    }
    
    setPage(p, enforce?: boolean) {
        if(p !== this.page || enforce) {
            this.page = p;
            this.left = (-1 * (this.domHandler.innerWidth(this.viewport) * this.page));
            this.firstVisible = this.page * this.columns;
        }
    }
    
    onDropdownChange(val: string) {
        this.setPage(parseInt(val));
    }
    
    get displayPageLinks(): boolean {
        return (this.totalPages <= this.pageLinks && !this.shrinked);
    }
    
    get displayPageDropdown(): boolean {
        return (this.totalPages > this.pageLinks && !this.shrinked);
    }
    
    get totalPages(): number {
        return (this.value && this.value.length) ? Math.ceil(this.value.length / this.columns) : 0;
    }
        
    routerDisplay () {
        let win = window;
        if(win.innerWidth <= this.breakpoint)
            return true;
        else
            return false;
    }
    
    updateState() {
        let win = window;
        if(win.innerWidth <= this.breakpoint) {
            this.shrinked = true;
            this.columns = 1;
        }
        else if(this.shrinked) {
            this.shrinked = false;
            this.columns = this.numVisible;
            this.updateLinks();
            this.updateDropdown();
        }
        
        this.calculateItemWidths();
        this.setPage(Math.floor(this.firstVisible / this.columns), true);
    }
    
    startAutoplay() {
        this.interval = setInterval(() => {
            if(this.page === (this.totalPages - 1))
                this.setPage(0);
            else
                this.setPage(this.page + 1);
        }, 
        this.autoplayInterval);
    }

    stopAutoplay() {
        clearInterval(this.interval);
    }
    
    ngOnDestroy() {
        if(this.responsive) {
            this.documentResponsiveListener();
        }
        
        if(this.autoplayInterval) {
            this.stopAutoplay();
        }
    }
}

@NgModule({
    imports: [CommonModule,SharedModule],
    exports: [Carousel,SharedModule],
    declarations: [Carousel]
})
export class CarouselModule { }