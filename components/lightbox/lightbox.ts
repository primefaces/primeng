import {Component,ElementRef,Input,Output} from '@angular/core';
import {DomHandler} from '../dom/domhandler';

@Component({
    selector: 'p-lightbox',
    template: `
        <div [ngStyle]="style" [class]="styleClass">
            <a *ngFor="let image of images; let i = index;" [href]="image.source" (click)="onImageClick($event,image, i, content, panel)">
                <img [src]="image.thumbnail" [title]="image.title" [alt]="image.alt">
            </a>
        </div>
        <div #panel class="ui-lightbox ui-widget ui-helper-hidden ui-corner-all ui-shadow" [style.display]="visible ? 'block' : 'none'" [style.zIndex]="zindex"
            [style.transitionProperty]="'all'" [style.transitionDuration]="effectDuration" [style.transitionTimingFunction]="easing">
           <div class="ui-lightbox-content-wrapper">
              <a class="ui-state-default ui-lightbox-nav-left ui-corner-right" [style.zIndex]="zindex + 1" (click)="prev(img)"
                [ngClass]="{'ui-helper-hidden':!leftVisible}"><span class="fa fa-fw fa-caret-left"></span></a>
              <div #content class="ui-lightbox-content ui-corner-all" #content [ngClass]="{'ui-lightbox-loading': loading}" 
                [style.transitionProperty]="'width,height'" [style.transitionDuration]="effectDuration" [style.transitionTimingFunction]="easing">
                <img #img [src]="currentImage ? currentImage.source||'' : ''" (load)="onImageLoad($event,panel,content)" style="display:none">
              </div>
              <a class="ui-state-default ui-lightbox-nav-right ui-corner-left ui-helper-hidden" [style.zIndex]="zindex + 1" (click)="next(img)"
                [ngClass]="{'ui-helper-hidden':!rightVisible}"><span class="fa fa-fw fa-caret-right"></span></a>
           </div>
           <div class="ui-lightbox-caption ui-widget-header" [style.display]="captionText ? 'block' : 'none'">
              <span class="ui-lightbox-caption-text">{{captionText}}</span><a class="ui-lightbox-close ui-corner-all" href="#" (click)="hide($event,panel)"><span class="fa fa-fw fa-close"></span></a>
              <div style="clear:both"></div>
           </div>
        </div>
    `,
    providers: [DomHandler]
})
export class Lightbox {

    @Input() images: any[];

    @Input() style: any;
        
    @Input() styleClass: string;
    
    @Input() easing: 'ease-out';
    
    @Input() effectDuration: any = '1500ms';
        
    private visible: boolean;
    
    private loading: boolean;
        
    private currentImage: any;
    
    private captionText: string;
    
    private zindex: any;
    
    private index: number;
    
    private mask: any;

    constructor(private el: ElementRef, private domHandler: DomHandler) {}
                
    onImageClick(event,image,i,content,panel) {
        this.index = i;
        this.loading = true;
        content.style.width = 32 + 'px';
        content.style.height = 32 + 'px';
        this.show(panel);
        this.displayImage(image);
        
        event.preventDefault();
    }
    
    displayImage(image) {
        setTimeout(() => {
            this.currentImage = image;
        }, 1000);
    }
    
    show(panel) {
        this.mask = document.createElement('div');
        this.mask.style.zIndex = ++DomHandler.zindex;
        this.domHandler.addMultipleClasses(this.mask, 'ui-widget-overlay ui-dialog-mask');
        document.body.appendChild(this.mask);
        
        this.zindex = ++DomHandler.zindex;
        this.center(panel);
        this.visible = true;
    }
    
    hide(event,panel) {
        this.captionText = null;
        this.index = null;
        this.currentImage = null;
        this.visible = false;
        panel.style.left = 'auto';
        panel.style.top = 'auto';
        
        if(this.mask) {
            document.body.removeChild(this.mask);
            this.mask = null;
        }
        
        event.preventDefault();
    }
    
    center(container) {
        let elementWidth = this.domHandler.getOuterWidth(container);
        let elementHeight = this.domHandler.getOuterHeight(container);
        if(elementWidth == 0 && elementHeight == 0) {
            container.style.visibility = 'hidden';
            container.style.display = 'block';
            elementWidth = this.domHandler.getOuterWidth(container);
            elementHeight = this.domHandler.getOuterHeight(container);
            container.style.display = 'none';
            container.style.visibility = 'visible';
        }
        let viewport = this.domHandler.getViewport();
        let x = (viewport.width - elementWidth) / 2;
        let y = (viewport.height - elementHeight) / 2;

        container.style.left = x + 'px';
        container.style.top = y + 'px';
    }
        
    onImageLoad(event,panel,content) {
        let image = event.target;
        image.style.visibility = 'hidden';
        image.style.display = 'block';
        let imageWidth = this.domHandler.getOuterWidth(image);
        let imageHeight = this.domHandler.getOuterHeight(image);
        image.style.display = 'none';
        image.style.visibility = 'visible';

        content.style.width = imageWidth + 'px';
        content.style.height = imageHeight + 'px';
        panel.style.left = parseInt(panel.style.left) + (this.domHandler.getOuterWidth(panel) - imageWidth) / 2 + 'px';
        panel.style.top = parseInt(panel.style.top) + (this.domHandler.getOuterHeight(panel) - imageHeight) / 2 + 'px';

        setTimeout(() => {
            this.domHandler.fadeIn(image, 500);
            image.style.display = 'block';
            this.captionText = this.currentImage.title;
            this.loading = false;
        }, parseInt(this.effectDuration));
    }
    
    prev(placeholder: any) {
        this.captionText = null;
        this.loading = true;
        placeholder.style.display = 'none';
        if(this.index > 0) {
            this.displayImage(this.images[--this.index]);
        }
    }
    
    next(placeholder: any) {
        this.captionText = null;
        this.loading = true;
        placeholder.style.display = 'none';
        if(this.index <= (this.images.length - 1)) {
            this.displayImage(this.images[++this.index]);
        }
    }
        
    get leftVisible():boolean {
        return this.images && this.images.length && this.index != 0 && !this.loading; 
    }
    
    get rightVisible():boolean {
        return this.images && this.images.length && this.index < (this.images.length - 1) && !this.loading; 
    }
        
}