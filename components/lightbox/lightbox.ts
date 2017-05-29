import {NgModule,Component,ElementRef,Input,Output,Renderer2,AfterViewInit,OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';

@Component({
    selector: 'p-lightbox',
    template: `
        <div [ngStyle]="style" [class]="styleClass" *ngIf="(type == 'image')">
            <a *ngFor="let image of images; let i = index;" [href]="image.source" (click)="onImageClick($event,image,i,content)">
                <img [src]="image.thumbnail" [title]="image.title" [alt]="image.alt">
            </a>
        </div>
        <span [ngStyle]="style" [class]="styleClass" *ngIf="(type == 'content')" (click)="onLinkClick($event,content)">
            <ng-content select="a"></ng-content>
        </span>
        <div class="ui-lightbox ui-widget ui-helper-hidden ui-corner-all ui-shadow" [style.display]="visible ? 'block' : 'none'" [style.zIndex]="zindex"
            [style.transitionProperty]="'all'" [style.transitionDuration]="effectDuration" [style.transitionTimingFunction]="easing" (click)="preventDocumentClickListener=true">
           <div class="ui-lightbox-content-wrapper">
              <a class="ui-state-default ui-lightbox-nav-left ui-corner-right" [style.zIndex]="zindex + 1" (click)="prev(img)"
                [ngClass]="{'ui-helper-hidden':!leftVisible}"><span class="fa fa-fw fa-caret-left"></span></a>
              <div #content class="ui-lightbox-content ui-corner-all" #content [ngClass]="{'ui-lightbox-loading': loading}" 
                [style.transitionProperty]="'width,height'" [style.transitionDuration]="effectDuration" [style.transitionTimingFunction]="easing">
                <img #img [src]="currentImage ? currentImage.source||'' : ''" (load)="onImageLoad($event,content)" style="display:none">
                <ng-content></ng-content>
              </div>
              <a class="ui-state-default ui-lightbox-nav-right ui-corner-left ui-helper-hidden" [style.zIndex]="zindex + 1" (click)="next(img)"
                [ngClass]="{'ui-helper-hidden':!rightVisible}"><span class="fa fa-fw fa-caret-right"></span></a>
           </div>
           <div class="ui-lightbox-caption ui-widget-header" [style.display]="captionText ? 'block' : 'none'">
              <span class="ui-lightbox-caption-text">{{captionText}}</span><a class="ui-lightbox-close ui-corner-all" href="#" (click)="hide($event)"><span class="fa fa-fw fa-close"></span></a>
              <div style="clear:both"></div>
           </div>
        </div>
    `,
    providers: [DomHandler]
})
export class Lightbox implements AfterViewInit,OnDestroy{ 

    @Input() images: any[];
    
    @Input() type: string = 'image';

    @Input() style: any;
        
    @Input() styleClass: string;
    
    @Input() appendTo: any;
    
    @Input() easing: 'ease-out';
    
    @Input() effectDuration: any = '500ms';
                
    public visible: boolean;
    
    public loading: boolean;
        
    public currentImage: any;
    
    public captionText: string;
    
    public zindex: any;
    
    public panel: any;
    
    public index: number;
    
    public mask: any;
    
    public preventDocumentClickListener: boolean;
    
    public documentClickListener: any;

    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2) {}
                
    onImageClick(event,image,i,content) {
        this.index = i;
        this.loading = true;
        content.style.width = 32 + 'px';
        content.style.height = 32 + 'px';
        this.show();
        this.displayImage(image);
        
        this.preventDocumentClickListener = true;
        event.preventDefault();
    }
    
    ngAfterViewInit() {
        this.panel = this.domHandler.findSingle(this.el.nativeElement, '.ui-lightbox ');
        
        if(this.appendTo) {
            if(this.appendTo === 'body')
                document.body.appendChild(this.panel);
            else
                this.domHandler.appendChild(this.panel, this.appendTo);
        }
        
        this.documentClickListener = this.renderer.listen('document', 'click', (event) => {
            if(!this.preventDocumentClickListener&&this.visible) {
                this.hide(event);
            }
            this.preventDocumentClickListener = false;
        });
    }
    
    onLinkClick(event,content) {
        this.show();
        this.preventDocumentClickListener = true;
        event.preventDefault();
    }
    
    displayImage(image) {
        setTimeout(() => {
            this.currentImage = image;
            this.captionText = image.title;
        }, 1000);
    }
    
    show() {
        this.mask = document.createElement('div');
        this.mask.style.zIndex = ++DomHandler.zindex;
        this.domHandler.addMultipleClasses(this.mask, 'ui-widget-overlay ui-dialog-mask');
        document.body.appendChild(this.mask);
        
        this.zindex = ++DomHandler.zindex;
        this.center();
        this.visible = true;
    }
    
    hide(event) {
        this.captionText = null;
        this.index = null;
        this.currentImage = null;
        this.visible = false;
        this.panel.style.left = 'auto';
        this.panel.style.top = 'auto';
        
        if(this.mask) {
            document.body.removeChild(this.mask);
            this.mask = null;
        }
        
        event.preventDefault();
    }
    
    center() {
        let elementWidth = this.domHandler.getOuterWidth(this.panel);
        let elementHeight = this.domHandler.getOuterHeight(this.panel);
        if(elementWidth == 0 && elementHeight == 0) {
            this.panel.style.visibility = 'hidden';
            this.panel.style.display = 'block';
            elementWidth = this.domHandler.getOuterWidth(this.panel);
            elementHeight = this.domHandler.getOuterHeight(this.panel);
            this.panel.style.display = 'none';
            this.panel.style.visibility = 'visible';
        }
        let viewport = this.domHandler.getViewport();
        let x = (viewport.width - elementWidth) / 2;
        let y = (viewport.height - elementHeight) / 2;

        this.panel.style.left = x + 'px';
        this.panel.style.top = y + 'px';
    }
        
    onImageLoad(event,content) {
        let image = event.target;
        image.style.visibility = 'hidden';
        image.style.display = 'block';
        let imageWidth = this.domHandler.getOuterWidth(image);
        let imageHeight = this.domHandler.getOuterHeight(image);
        image.style.display = 'none';
        image.style.visibility = 'visible';

        content.style.width = imageWidth + 'px';
        content.style.height = imageHeight + 'px';
        this.panel.style.left = parseInt(this.panel.style.left) + (this.domHandler.getOuterWidth(this.panel) - imageWidth) / 2 + 'px';
        this.panel.style.top = parseInt(this.panel.style.top) + (this.domHandler.getOuterHeight(this.panel) - imageHeight) / 2 + 'px';

        setTimeout(() => {
            this.domHandler.fadeIn(image, 500);
            image.style.display = 'block';
            //this.captionText = this.currentImage.title;
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
    
    ngOnDestroy() {
        if(this.documentClickListener) {
            this.documentClickListener();
        }
        
        if(this.appendTo) {
            this.el.nativeElement.appendChild(this.panel);
        }
    }
        
}

@NgModule({
    imports: [CommonModule],
    exports: [Lightbox],
    declarations: [Lightbox]
})
export class LightboxModule { }
