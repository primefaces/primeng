import {NgModule,Component,ElementRef,Input,Renderer2,AfterViewInit,OnDestroy,ChangeDetectorRef,ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from 'primeng/dom';

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
        <div class="ui-lightbox ui-widget ui-corner-all ui-shadow" [style.display]="visible ? 'block' : 'none'" [style.zIndex]="zindex"
            [ngClass]="{'ui-lightbox-loading': loading}"
            [style.transitionProperty]="'all'" [style.transitionDuration]="effectDuration" [style.transitionTimingFunction]="easing" (click)="preventDocumentClickListener=true">
           <div class="ui-lightbox-content-wrapper">
              <a class="ui-state-default ui-lightbox-nav-left ui-corner-right" [style.zIndex]="zindex + 1" (click)="prev(img)"
                [ngClass]="{'ui-helper-hidden':!leftVisible}"><span class="ui-lightbox-nav-icon pi pi-chevron-left"></span></a>
              <div #content class="ui-lightbox-content ui-corner-all" 
                [style.transitionProperty]="'width,height'" [style.transitionDuration]="effectDuration" [style.transitionTimingFunction]="easing">
                <img #img [src]="currentImage ? currentImage.source||'' : ''" (load)="onImageLoad($event,content)" style="display:none">
                <ng-content></ng-content>
              </div>
              <a class="ui-state-default ui-lightbox-nav-right ui-corner-left ui-helper-hidden" [style.zIndex]="zindex + 1" (click)="next(img)"
                [ngClass]="{'ui-helper-hidden':!rightVisible}"><span class="ui-lightbox-nav-icon pi pi-chevron-right"></span></a>
           </div>
           <div class="ui-lightbox-caption ui-widget-header" [style.display]="captionText ? 'block' : 'none'">
              <span class="ui-lightbox-caption-text">{{captionText}}</span><a class="ui-lightbox-close ui-corner-all" tabindex="0" (click)="hide($event)" (keydown.enter)="hide($event)"><span class="pi pi-times"></span></a>
              <div style="clear:both"></div>
           </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        './lightbox.css',
        '../dialog/dialog.css'
    ]
})
export class Lightbox implements AfterViewInit,OnDestroy {

    @Input() images: any[];
    
    @Input() type: string = 'image';

    @Input() style: any;
        
    @Input() styleClass: string;
    
    @Input() appendTo: any;
    
    @Input() easing: 'ease-out';
    
    @Input() effectDuration: any = '500ms';

    @Input() autoZIndex: boolean = true;
    
    @Input() baseZIndex: number = 0;
                
    @Input() closeOnEscape: boolean = true;

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

    public documentEscapeListener: any;

    constructor(public el: ElementRef, public renderer: Renderer2,private cd: ChangeDetectorRef) {}
                
    onImageClick(event,image,i,content) {
        this.index = i;
        this.loading = true;
        content.style.width = 32 + 'px';
        content.style.height = 32 + 'px';
        this.preventDocumentClickListener = true;
        this.show();
        this.displayImage(image);
        event.preventDefault();
    }
    
    ngAfterViewInit() {
        this.panel = DomHandler.findSingle(this.el.nativeElement, '.ui-lightbox ');
        
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.panel);
            else
                DomHandler.appendChild(this.panel, this.appendTo);
        }
    }
    
    onLinkClick(event,content) {
        this.preventDocumentClickListener = true;
        this.show();
        event.preventDefault();
    }
    
    displayImage(image) {
        setTimeout(() => {
            this.cd.markForCheck();
            this.currentImage = image;
            this.captionText = image.title;
            this.center();
        }, 1000);
    }
    
    show() {
        this.mask = document.createElement('div');
        
        DomHandler.addMultipleClasses(this.mask, 'ui-widget-overlay ui-dialog-mask');
        document.body.appendChild(this.mask);
        if (this.autoZIndex) {
            this.zindex = this.baseZIndex + (++DomHandler.zindex);
        }
        this.mask.style.zIndex = this.zindex - 1;
        this.center();
        this.visible = true;
        this.bindGlobalListeners();
    }
    
    hide(event) {
        this.captionText = null;
        this.index = null;
        this.currentImage = null;
        this.visible = false;
        
        if (this.mask) {
            document.body.removeChild(this.mask);
            this.mask = null;
        }
        
        this.unbindGlobalListeners();
        event.preventDefault();
    }
    
    center() {
        let elementWidth = DomHandler.getOuterWidth(this.panel);
        let elementHeight = DomHandler.getOuterHeight(this.panel);
        if (elementWidth == 0 && elementHeight == 0) {
            this.panel.style.visibility = 'hidden';
            this.panel.style.display = 'block';
            elementWidth = DomHandler.getOuterWidth(this.panel);
            elementHeight = DomHandler.getOuterHeight(this.panel);
            this.panel.style.display = 'none';
            this.panel.style.visibility = 'visible';
        }
    }
        
    onImageLoad(event,content) {
        let image = event.target;
        image.style.visibility = 'hidden';
        image.style.display = 'block';
        let imageWidth = DomHandler.getOuterWidth(image);
        let imageHeight = DomHandler.getOuterHeight(image);
        image.style.display = 'none';
        image.style.visibility = 'visible';

        content.style.width = imageWidth + 'px';
        content.style.height = imageHeight + 'px';
        this.panel.style.left = parseInt(this.panel.style.left) + (DomHandler.getOuterWidth(this.panel) - imageWidth) / 2 + 'px';
        this.panel.style.top = parseInt(this.panel.style.top) + (DomHandler.getOuterHeight(this.panel) - imageHeight) / 2 + 'px';

        setTimeout(() => {
            this.cd.markForCheck();
            DomHandler.fadeIn(image, 500);
            image.style.display = 'block';
            //this.captionText = this.currentImage.title;
            this.loading = false;
        }, parseInt(this.effectDuration));
    }
    
    prev(placeholder: any) {
        this.captionText = null;
        this.loading = true;
        placeholder.style.display = 'none';
        if (this.index > 0) {
            this.displayImage(this.images[--this.index]);
        }
    }
    
    next(placeholder: any) {
        this.captionText = null;
        this.loading = true;
        placeholder.style.display = 'none';
        if (this.index <= (this.images.length - 1)) {
            this.displayImage(this.images[++this.index]);
        }
    }

    bindGlobalListeners() {
        const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

        this.documentClickListener = this.renderer.listen(documentTarget, 'click', (event) => {
            if (!this.preventDocumentClickListener && this.visible) {
                this.hide(event);
            }
            this.preventDocumentClickListener = false;
            this.cd.markForCheck();
        });
        if (this.closeOnEscape && !this.documentEscapeListener) {
            this.documentEscapeListener = this.renderer.listen(documentTarget, 'keydown', (event) => {
                    if (event.which == 27) {
                    if (parseInt(this.panel.style.zIndex) === (DomHandler.zindex + this.baseZIndex)) {
                        this.hide(event);
                    }
                }
            });
        }
    }

    unbindGlobalListeners() {
        if (this.documentEscapeListener){
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }

        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
        
    get leftVisible():boolean {
        return this.images && this.images.length && this.index != 0 && !this.loading; 
    }
    
    get rightVisible():boolean {
        return this.images && this.images.length && this.index < (this.images.length - 1) && !this.loading; 
    }
    
    ngOnDestroy() {
        this.unbindGlobalListeners();
        
        if (this.appendTo) {
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
