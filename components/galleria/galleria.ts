import {Component, ElementRef, AfterViewInit, Input, SimpleChange, Output, EventEmitter} from 'angular2/core';
import {DomHandler} from '../dom/domhandler';

@Component({
    selector: 'p-galleria',
    template: `
    <div [ngClass]="{'ui-galleria ui-widget ui-widget-content ui-corner-all' : true}" [attr.style]="style" [class]="styleClass">
        <ul class="ui-galleria-panel-wrapper">
            <li class="ui-galleria-panel ui-helper-hidden" *ngFor="#image of images;">
                <img class="ui-panel-images" src="{{image.source}}" alt="{{image.alt}}" title="{{image.title}}"/>
            </li>
        </ul>
        <div [ngClass]="{'ui-galleria-filmstrip-wrapper' : true}">
            <ul class="ui-galleria-filmstrip">
                <li #frame class="ui-galleria-frame" (click)="frameClick(frame)" *ngFor="#image of images;">
                    <div class="ui-galleria-frame-content">
                        <img src="{{image.source}}" alt="{{image.alt}}" title="{{image.title}}" class="ui-galleria-frame-image">
                    </div>
                </li>
            </ul>
        </div>
        <div class="ui-galleria-nav-prev fa fa-fw fa-chevron-circle-left" (click)="onPrev()"></div>
        <div class="ui-galleria-nav-next fa fa-fw fa-chevron-circle-right" (click)="onNext()"></div>
        <div class="ui-galleria-caption" *ngIf="showCaption"></div>
    </div>
    `,
    providers: [DomHandler]
})
export class Galleria implements AfterViewInit {
    
    @Input() images: GalleriaImages[];
    
    @Input() style: string;

    @Input() styleClass: string;

    @Input() panelWidth: number;

    @Input() panelHeight: number;

    @Input() frameWidth: number;
    
    @Input() frameHeight: number;

    @Input() activeIndex: number;

    @Input() showFilmstrip: boolean = true;

    @Input() autoPlay: boolean = true;

    @Input() transitionInterval: number;

    @Input() effect: string;

    @Input() effectDuration: any;

    @Input() showCaption: boolean = true;

    @Input() customContent: boolean;
    
    slideshowActive: boolean;
    
    private container: any;
    
    private panelWrapper: any;
    
    private panels: any;
    
    private caption: any;
    
    private stripWrapper: any;
    
    private strip: any;
    
    private frames: any;
    
    private interval: any;
    
    private stepFactorHelper: number = 0;

    constructor(private el: ElementRef, private domHandler: DomHandler) {
    }
    
    ngAfterViewInit() {
        this.init();
    }
    
    init() {
        this.panelWidth = this.panelWidth||600;
        this.panelHeight = this.panelHeight||400;
        this.frameWidth = this.frameWidth||60;
        this.frameHeight = this.frameHeight||40;
        this.activeIndex = 0;
        this.showFilmstrip = (this.showFilmstrip === false) ? false : true;
        this.autoPlay = (this.autoPlay === false) ? false : true;
        this.transitionInterval = this.transitionInterval||4000;
        this.effect = this.effect||'fade';

        this.container = this.el.nativeElement.children[0];
        this.panelWrapper = this.domHandler.findSingle(this.el.nativeElement, 'ul.ui-galleria-panel-wrapper');
        this.panels = this.domHandler.find(this.panelWrapper, 'li.ui-galleria-panel');
        this.render();
    }
    
    render() {
        this.panelWrapper.style.width = this.panelWidth + 'px';
        this.panelWrapper.style.height = this.panelHeight + 'px';
        for (let i = 0; i < this.panels.length; i++) {
            this.panels[i].style.width = this.panelWidth + 'px';
            this.panels[i].style.height = this.panelHeight + 'px';
        }
        this.container.style.width = this.panelWidth + 'px';
        
        if(this.showFilmstrip) {
            this.renderStrip();
        }

        var activePanel = this.panels[this.activeIndex];
        this.domHandler.removeClass(activePanel,'ui-helper-hidden');

        if(this.showCaption) {
            this.caption = this.domHandler.findSingle(this.container,'div.ui-galleria-caption');
            this.caption.style.bottom = this.showFilmstrip ? this.domHandler.outerHeight(this.stripWrapper) + 'px' : 0 + 'px';
            this.caption.style.width = this.domHandler.width(this.panelWrapper) + 'px';
            this.caption.style.display = 'block';
            
            this.showPanelCaption(activePanel);
        }

        this.container.style.visibility = 'visible';

        if(this.autoPlay) {
            this.startSlideshow();
        }
    }
    
    renderStrip() {
        //strip
        var frameStyle = 'width:' + this.frameWidth + "px;height:" + this.frameHeight + 'px;';
                    
        this.stripWrapper = this.domHandler.findSingle(this.container,'div.ui-galleria-filmstrip-wrapper');
        this.stripWrapper.style.width = this.domHandler.width(this.panelWrapper) - 50 + 'px';
        this.stripWrapper.style.height = this.frameHeight + 'px';
        
        this.strip = this.domHandler.findSingle(this.stripWrapper,'ul.ui-galleria-filmstrip');
                    
        for(let i = 0; i < this.panels.length; i++) {
            let frameImages = [],
            image  = this.domHandler.find(this.panels[i], 'img.ui-panel-images');
            this.frames = this.domHandler.find(this.strip,'li.ui-galleria-frame');
            
            if(i == this.activeIndex)
                this.domHandler.addClass(this.frames[i],'ui-galleria-frame-active');
                
            this.frames[i].style = frameStyle;
            
            frameImages[i] = this.domHandler.findSingle(this.frames[i],'img.ui-galleria-frame-image');
            frameImages[i].style = frameStyle;
        }
                    
        //navigators
        this.domHandler.findSingle(this.container,'div.ui-galleria-nav-prev').style.bottom = this.frameHeight/2 + 'px';
        this.domHandler.findSingle(this.container,'div.ui-galleria-nav-next').style.bottom = this.frameHeight/2 + 'px';
    }
    
    startSlideshow() {
        this.interval = setInterval(() => {
            this.next();
        }, this.transitionInterval);
        
        this.slideshowActive = true;
    }
        
    stopSlideshow() {
        clearInterval(this.interval);
        
        this.slideshowActive = false;
    }
    
    onNext() {
        if(this.slideshowActive) {
            this.stopSlideshow();
        }
        this.next();
    } 
    
    onPrev() {
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
        if(this.activeIndex  !== (this.panels.length-1)) {
            this.select(this.activeIndex + 1, true);
        } 
        else {
            this.select(0, true);
        }
    }
    
    hidePanelCaption() {
        this.domHandler.removeClass(this.caption, 'ui-helper-hidden');
    }
        
    showPanelCaption(panel) {
        setTimeout(() => {
            this.domHandler.addClass(this.caption, 'ui-helper-hidden');
        }, 750);
        this.domHandler.fadeIn(this.caption, 1000);
        var image = panel.children;
        this.caption.innerHTML= '<h4>' + image[0].title + '</h4><p>' + image[0].alt + '</p>';
    }
    
    select(index, reposition) {
        if(index !== this.activeIndex) {
            if(this.showCaption) {
                this.hidePanelCaption();
            }
            
            var oldPanel = this.panels[this.activeIndex],
            newPanel = this.panels[index];
            
            this.domHandler.addClass(oldPanel, 'ui-helper-hidden');
            this.domHandler.removeClass(newPanel, 'ui-helper-hidden');
            this.domHandler.fadeIn(newPanel, 500);
            
            if(this.showFilmstrip) {
                var oldFrame = this.frames[this.activeIndex],
                newFrame = this.frames[index];
                this.domHandler.removeClass(oldFrame,'ui-galleria-frame-active');
                oldFrame.style.opacity = '';
                newFrame.style.opacity = '1.0';
                this.domHandler.addClass(newFrame,'ui-galleria-frame-active');
                newFrame.style.transition = "0.75s ease";
                
                //viewport
                if(reposition === undefined || reposition === true) {
                    var frameLeft = newFrame.offsetLeft,
                    stepFactor = this.frameWidth + 10,
                    stripLeft = this.strip.offsetLeft,
                    frameViewportLeft = frameLeft + stripLeft,
                    frameViewportRight = frameViewportLeft + this.frameWidth;
                    
                    if(frameViewportRight > this.domHandler.width(this.stripWrapper)) {
                        this.stepFactorHelper -= stepFactor;
                        this.strip.style.left = this.stepFactorHelper + 'px';
                        this.strip.style.transition = "1s ease";
                    } else if(frameViewportLeft < 0) {
                        this.stepFactorHelper = this.stepFactorHelper/8;
                        this.stepFactorHelper += stepFactor;
                        this.strip.style.left = this.stepFactorHelper + 'px';
                        this.strip.style.transition = "1s ease";
                    }
                }
            }
            
            //caption
            if(this.showCaption) {
                this.showPanelCaption(newPanel);
            }
            
            this.activeIndex = index;
        }
    }

}

export interface GalleriaImages {
    source: string;
    alt?: any;
    title?: any;
}