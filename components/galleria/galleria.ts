import {Component,ElementRef,AfterViewChecked,AfterViewInit,OnDestroy,Input,Output,IterableDiffers,EventEmitter} from '@angular/core';
import {DomHandler} from '../dom/domhandler';

@Component({
    selector: 'p-galleria',
    template: `
        <div [ngClass]="{'ui-galleria ui-widget ui-widget-content ui-corner-all':true}" [ngStyle]="style" [class]="styleClass" [style.width.px]="panelWidth">
            <ul class="ui-galleria-panel-wrapper" [style.width.px]="panelWidth" [style.height.px]="panelHeight">
                <li *ngFor="let image of images;let i=index" class="ui-galleria-panel" [ngClass]="{'ui-helper-hidden':i!=activeIndex}"
                    [style.width.px]="panelWidth" [style.height.px]="panelHeight">
                    <img class="ui-panel-images" [src]="image.source" [alt]="image.alt" [title]="image.title"/>
                </li>
            </ul>
            <div [ngClass]="{'ui-galleria-filmstrip-wrapper':true}" *ngIf="showFilmstrip">
                <ul class="ui-galleria-filmstrip" style="transition:left 1s" [style.left.px]="stripLeft">
                    <li #frame *ngFor="let image of images;let i=index" [ngClass]="{'ui-galleria-frame-active':i==activeIndex}" class="ui-galleria-frame" (click)="frameClick(frame)"
                        [style.width.px]="frameWidth" [style.height.px]="frameHeight" [style.transition]="'opacity 0.75s ease'">
                        <div class="ui-galleria-frame-content">
                            <img [src]="image.source" [alt]="image.alt" [title]="image.title" class="ui-galleria-frame-image"
                                [style.width.px]="frameWidth" [style.height.px]="frameHeight">
                        </div>
                    </li>
                </ul>
            </div>
            <div class="ui-galleria-nav-prev fa fa-fw fa-chevron-circle-left" (click)="clickNavLeft()" [style.bottom.px]="frameHeight/2"></div>
            <div class="ui-galleria-nav-next fa fa-fw fa-chevron-circle-right" (click)="clickNavRight()" [style.bottom.px]="frameHeight/2"></div>
            <div class="ui-galleria-caption" *ngIf="showCaption&&images" style="display:block">
                <h4>{{images[activeIndex].title}}</h4><p>{{images[activeIndex].alt}}</p>
            </div>
        </div>
    `,
    providers: [DomHandler]
})
export class Galleria implements AfterViewChecked,AfterViewInit,OnDestroy {
    
    @Input() images: any[];
    
    @Input() style: any;

    @Input() styleClass: string;

    @Input() panelWidth: number = 600;

    @Input() panelHeight: number = 400;

    @Input() frameWidth: number = 60;
    
    @Input() frameHeight: number = 40;

    @Input() activeIndex: number = 0;

    @Input() showFilmstrip: boolean = true;

    @Input() autoPlay: boolean = true;

    @Input() transitionInterval: number = 4000;

    @Input() showCaption: boolean = true;
    
    differ: any;
    
    slideshowActive: boolean;
    
    private container: any;
    
    private panelWrapper: any;
    
    private panels: any;
    
    private caption: any;
    
    private stripWrapper: any;
    
    private strip: any;
    
    private frames: any;
    
    private interval: any;
    
    private stripLeft: number = 0;
    
    private imagesChanged: boolean;
    
    private initialized: boolean;

    constructor(private el: ElementRef, private domHandler: DomHandler, differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
    }
    
    ngAfterViewChecked() {
        if(this.imagesChanged) {
            this.stopSlideshow();
            this.render();
            this.imagesChanged = false;
        }
    }
    
    ngDoCheck() {
        let changes = this.differ.diff(this.images);
        
        if(changes && this.initialized) {
            this.activeIndex = 0;
            this.imagesChanged = true;
        }
    }
    
    ngAfterViewInit() {
        this.container = this.el.nativeElement.children[0];
        this.panelWrapper = this.domHandler.findSingle(this.el.nativeElement, 'ul.ui-galleria-panel-wrapper');
        this.initialized = true;
        
        if(this.showFilmstrip) {
            this.stripWrapper = this.domHandler.findSingle(this.container,'div.ui-galleria-filmstrip-wrapper');
            this.strip = this.domHandler.findSingle(this.stripWrapper,'ul.ui-galleria-filmstrip');
        }
        
        if(this.images && this.images.length) {
            this.render();
        } 
    }
    
    render() {
        this.panels = this.domHandler.find(this.panelWrapper, 'li.ui-galleria-panel'); 
        
        if(this.showFilmstrip) {
            this.frames = this.domHandler.find(this.strip,'li.ui-galleria-frame');
            this.stripWrapper.style.width = this.domHandler.width(this.panelWrapper) - 50 + 'px';
            this.stripWrapper.style.height = this.frameHeight + 'px';
        }
        
        if(this.showCaption) {
            this.caption = this.domHandler.findSingle(this.container,'div.ui-galleria-caption');
            this.caption.style.bottom = this.showFilmstrip ? this.domHandler.getOuterHeight(this.stripWrapper,true) + 'px' : 0 + 'px';
            this.caption.style.width = this.domHandler.width(this.panelWrapper) + 'px';
        }
   
        if(this.autoPlay) {
            this.startSlideshow();
        }
        
        this.container.style.visibility = 'visible';
    }
    
    startSlideshow() {
        this.interval = setInterval(() => {
            this.next();
        }, this.transitionInterval);
        
        this.slideshowActive = true;
    }
        
    stopSlideshow() {
        if(this.interval) {
            clearInterval(this.interval);
        }
        
        this.slideshowActive = false;
    }
    
    clickNavRight() {
        if(this.slideshowActive) {
            this.stopSlideshow();
        }
        this.next();
    } 
    
    clickNavLeft() {
        if(this.slideshowActive) {
            this.stopSlideshow();
        }
        this.prev();
    }
    
    frameClick(frame) {
        if(this.slideshowActive) {
            this.stopSlideshow();
        }
        
        this.select(this.domHandler.index(frame), false);
    }
    
    prev() {
        if(this.activeIndex !== 0) {
            this.select(this.activeIndex - 1, true);
        }
    }
    
    next() {
        if(this.activeIndex !== (this.panels.length-1)) {
            this.select(this.activeIndex + 1, true);
        }
        else {
            this.select(0, false);
            this.stripLeft = 0;
        }
    }
        
    select(index, reposition) {
        if(index !== this.activeIndex) {            
            let oldPanel = this.panels[this.activeIndex],
            newPanel = this.panels[index];
            
            this.domHandler.fadeIn(newPanel, 500);
            
            if(this.showFilmstrip) {
                let oldFrame = this.frames[this.activeIndex],
                newFrame = this.frames[index];
                
                if(reposition === undefined || reposition === true) {
                    let frameLeft = newFrame.offsetLeft,
                    stepFactor = this.frameWidth + parseInt(getComputedStyle(newFrame)['margin-right'], 10),
                    stripLeft = this.strip.offsetLeft,
                    frameViewportLeft = frameLeft + stripLeft,
                    frameViewportRight = frameViewportLeft + this.frameWidth;
                    
                    if(frameViewportRight > this.domHandler.width(this.stripWrapper))
                        this.stripLeft -= stepFactor;
                    else if(frameViewportLeft < 0)
                        this.stripLeft += stepFactor;
                }
            }
            
            this.activeIndex = index;
        }
    }
        
    ngOnDestroy() {
        this.stopSlideshow();
    }

}