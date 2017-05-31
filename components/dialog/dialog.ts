import {NgModule,Component,ElementRef,AfterViewInit,OnDestroy,Input,Output,EventEmitter,Renderer2,ContentChild,ViewChild} from '@angular/core';
import {trigger,state,style,transition,animate} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {Header,Footer,SharedModule} from '../common/shared';

@Component({
    selector: 'p-dialog',
    template: `
        <div #container [ngClass]="{'ui-dialog ui-widget ui-widget-content ui-corner-all ui-shadow':true,'ui-dialog-rtl':rtl,'ui-dialog-draggable':draggable}" [ngStyle]="style" [class]="styleClass"
            [style.display]="visible ? 'block' : 'none'" [style.width.px]="width" [style.height.px]="height" (mousedown)="moveOnTop()" [@dialogState]="visible ? 'visible' : 'hidden'">
            <div #titlebar class="ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top"
                (mousedown)="initDrag($event)" (mouseup)="endDrag($event)" *ngIf="showHeader">
                <span class="ui-dialog-title" *ngIf="header">{{header}}</span>
                <span class="ui-dialog-title" *ngIf="headerFacet">
                    <ng-content select="p-header"></ng-content>
                </span>
                <a *ngIf="closable" [ngClass]="{'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all':true}" href="#" role="button" (click)="close($event)" (mousedown)="onCloseMouseDown($event)">
                    <span class="fa fa-fw fa-close"></span>
                </a>
            </div>
            <div #content class="ui-dialog-content ui-widget-content" [ngStyle]="contentStyle">
                <ng-content></ng-content>
            </div>
            <div class="ui-dialog-footer ui-widget-content" *ngIf="footerFacet">
                <ng-content select="p-footer"></ng-content>
            </div>
            <div *ngIf="resizable" class="ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se" style="z-index: 90;"
                (mousedown)="initResize($event)"></div>
        </div>
    `,
    animations: [
        trigger('dialogState', [
            state('hidden', style({
                opacity: 0
            })),
            state('visible', style({
                opacity: 1
            })),
            transition('visible => hidden', animate('400ms ease-in')),
            transition('hidden => visible', animate('400ms ease-out'))
        ])
    ],
    providers: [DomHandler]
})
export class Dialog implements AfterViewInit,OnDestroy {

    @Input() header: string;

    @Input() draggable: boolean = true;

    @Input() resizable: boolean = true;
    
    @Input() minWidth: number = 150;

    @Input() minHeight: number = 150;

    @Input() width: any;

    @Input() height: any;

    @Input() positionLeft: number;

    @Input() positionTop: number;

    @Input() contentStyle: any;

    @Input() modal: boolean;

    @Input() closeOnEscape: boolean = true;
	
    @Input() dismissableMask: boolean;

    @Input() rtl: boolean;

    @Input() closable: boolean = true;

    @Input() responsive: boolean = true;
    
    @Input() appendTo: any;
    
    @Input() style: any;
        
    @Input() styleClass: string;
    
    @Input() showHeader: boolean = true;
    
    @Input() breakpoint: number = 640;
        
    @ContentChild(Header) headerFacet;
    
    @ContentChild(Footer) footerFacet;
    
    @ViewChild('container') containerViewChild: ElementRef;
    
    @ViewChild('titlebar') headerViewChild: ElementRef;
    
    @ViewChild('content') contentViewChild: ElementRef;

    @Output() onShow: EventEmitter<any> = new EventEmitter();

    @Output() onHide: EventEmitter<any> = new EventEmitter();

    @Output() visibleChange:EventEmitter<any> = new EventEmitter();
    
    _visible: boolean;
    
    dragging: boolean;

    documentDragListener: Function;
    
    resizing: boolean;

    documentResizeListener: Function;
    
    documentResizeEndListener: Function;
    
    documentResponsiveListener: Function;
    
    documentEscapeListener: Function;
	
    maskClickListener: Function;
    
    lastPageX: number;
    
    lastPageY: number;
    
    mask: HTMLDivElement;
            
    closeIconMouseDown: boolean;
    
    preWidth: number;
                
    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2) {}
    
    @Input() get visible(): boolean {
        return this._visible;
    }

    set visible(val:boolean) {
        this._visible = val;
        
        if(this.containerViewChild && this.containerViewChild.nativeElement) {
            if(this._visible)
                this.show();
            else
                this.hide();
        }
    }

    show() {
        this.onShow.emit({});
        this.positionOverlay();
        this.containerViewChild.nativeElement.style.zIndex = String(++DomHandler.zindex);
        this.bindGlobalListeners();
        
        if(this.modal) {
            this.enableModality();
        }
    }
    
    positionOverlay() {
        if(this.positionLeft >= 0 && this.positionTop >= 0) {
            this.containerViewChild.nativeElement.style.left = this.positionLeft + 'px';
            this.containerViewChild.nativeElement.style.top = this.positionTop + 'px';
        } 
        else if (this.positionTop >= 0) {
          this.center();
          this.containerViewChild.nativeElement.style.top = this.positionTop + 'px';
        }
        else{
            this.center();
        }
    }
    
    hide() {
        this.onHide.emit({});
        this.unbindMaskClickListener();
        
        if(this.modal) {
            this.disableModality();
        }
    }
    
    close(event: Event) {
        this.hide();
        this.visibleChange.emit(false);
        event.preventDefault();
    }
        
    ngAfterViewInit() {                
        if(this.appendTo) {
            if(this.appendTo === 'body')
                document.body.appendChild(this.containerViewChild.nativeElement);
            else
                this.domHandler.appendChild(this.containerViewChild.nativeElement, this.appendTo);
        }
        
        if(this.visible) {
            this.show();
        }
    }
        
    center() {
        let elementWidth = this.domHandler.getOuterWidth(this.containerViewChild.nativeElement);
        let elementHeight = this.domHandler.getOuterHeight(this.containerViewChild.nativeElement);
        if(elementWidth == 0 && elementHeight == 0) {
            this.containerViewChild.nativeElement.style.visibility = 'hidden';
            this.containerViewChild.nativeElement.style.display = 'block';
            elementWidth = this.domHandler.getOuterWidth(this.containerViewChild.nativeElement);
            elementHeight = this.domHandler.getOuterHeight(this.containerViewChild.nativeElement);
            this.containerViewChild.nativeElement.style.display = 'none';
            this.containerViewChild.nativeElement.style.visibility = 'visible';
        }
        let viewport = this.domHandler.getViewport();
        let x = Math.max((viewport.width - elementWidth) / 2, 0);
        let y = Math.max((viewport.height - elementHeight) / 2, 0);

        this.containerViewChild.nativeElement.style.left = x + 'px';
        this.containerViewChild.nativeElement.style.top = y + 'px';
    }
    
    enableModality() {
        if(!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = String(parseInt(this.containerViewChild.nativeElement.style.zIndex) - 1);
            this.domHandler.addMultipleClasses(this.mask, 'ui-widget-overlay ui-dialog-mask');
            
			if(this.closable && this.dismissableMask) {
	             this.maskClickListener = this.renderer.listen(this.mask, 'click', (event: any) => {
					this.close(event);
	             });
			}
            document.body.appendChild(this.mask);
        }
    }
    
    disableModality() {
        if(this.mask) {
            document.body.removeChild(this.mask);
            this.mask = null;
        }
    }
        
    unbindMaskClickListener() {
        if(this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
		}
    }
    
    moveOnTop() {
        this.containerViewChild.nativeElement.style.zIndex = String(++DomHandler.zindex);
    }
    
    onCloseMouseDown(event: Event) {
        this.closeIconMouseDown = true;
    }
    
    initDrag(event: MouseEvent) {
        if(this.closeIconMouseDown) {
            this.closeIconMouseDown = false;
            return;
        }
        
        if(this.draggable) {
            this.dragging = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    }
    
    onDrag(event: MouseEvent) {
        if(this.dragging) {
            let deltaX = event.pageX - this.lastPageX;
            let deltaY = event.pageY - this.lastPageY;
            let leftPos = parseInt(this.containerViewChild.nativeElement.style.left);
            let topPos = parseInt(this.containerViewChild.nativeElement.style.top);

            this.containerViewChild.nativeElement.style.left = leftPos + deltaX + 'px';
            this.containerViewChild.nativeElement.style.top = topPos + deltaY + 'px';
            
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    }
    
    endDrag(event: MouseEvent) {
        if(this.draggable) {
            this.dragging = false;
        }
    }
    
    initResize(event: MouseEvent) {
        if(this.resizable) {
            this.preWidth = null;
            this.resizing = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    }
    
    onResize(event: MouseEvent) {
        if(this.resizing) {
            let deltaX = event.pageX - this.lastPageX;
            let deltaY = event.pageY - this.lastPageY;
            let containerWidth = this.domHandler.getOuterWidth(this.containerViewChild.nativeElement);
            let containerHeight = this.domHandler.getOuterHeight(this.containerViewChild.nativeElement);
            let contentHeight = this.domHandler.getOuterHeight(this.contentViewChild.nativeElement);
            let newWidth = containerWidth + deltaX;
            let newHeight = containerHeight + deltaY;

            if(newWidth > this.minWidth) {
                this.containerViewChild.nativeElement.style.width = newWidth + 'px';
            }
                
            if(newHeight > this.minHeight) {
                this.containerViewChild.nativeElement.style.height = newHeight + 'px';
                this.contentViewChild.nativeElement.style.height = contentHeight + deltaY + 'px';
            }

            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    }
    
    bindGlobalListeners() {
        if(this.draggable) {
            this.bindDocumentDragListener();
        }
        
        if(this.resizable) {
            this.bindDocumentResizeListeners();
        }
        
        if(this.responsive) {
            this.bindDocumentResponsiveListener();
        }
        
        if(this.closeOnEscape && this.closable) {
            this.bindDocumentEscapeListener();
        }
    }
    
    unbindGlobalListeners() {
        this.unbindDocumentDragListener();
    }
    
    bindDocumentDragListener() {
        this.documentDragListener = this.renderer.listen('document', 'mousemove', (event) => {
            this.onDrag(event);
        });
    }
    
    unbindDocumentDragListener() {
        if(this.documentDragListener) {
            this.documentDragListener();
            this.documentDragListener = null;
        }
    }
    
    bindDocumentResizeListeners() {
        this.documentResizeListener = this.renderer.listen('document', 'mousemove', (event) => {
            this.onResize(event);
        });
        
        this.documentResizeEndListener = this.renderer.listen('document', 'mouseup', (event) => {
            if(this.resizing) {
                this.resizing = false;
            }
        });
    }
    
    unbindDocumentResizeListeners() {
        if(this.documentResizeListener && this.documentResizeEndListener) {
            this.documentResizeListener();
            this.documentResizeEndListener();
            this.documentResizeListener = null;
            this.documentResizeEndListener = null;
        }
    }
    
    bindDocumentResponsiveListener() {
        this.documentResponsiveListener = this.renderer.listen('window', 'resize', (event) => {
            let viewport = this.domHandler.getViewport();
            let width = this.domHandler.getOuterWidth(this.containerViewChild.nativeElement);
            if(viewport.width <= this.breakpoint) {
                if(!this.preWidth) {
                    this.preWidth = width;
                }
                this.containerViewChild.nativeElement.style.left = '0px';
                this.containerViewChild.nativeElement.style.width = '100%';
            }
            else {
                this.containerViewChild.nativeElement.style.width = this.preWidth + 'px';
                this.positionOverlay();
            }
        });
    }
    
    unbindDocumentResponseListener() {
        if(this.documentResponsiveListener) {
            this.documentResponsiveListener();
            this.documentResponsiveListener = null;
        }
    }
    
    bindDocumentEscapeListener() {
        this.documentEscapeListener = this.renderer.listen('document', 'keydown', (event) => {
            if(event.which == 27) {
                if(parseInt(this.containerViewChild.nativeElement.style.zIndex) == DomHandler.zindex) {
                    this.close(event);
                }
            }
        });
    }
    
    unbindDocumentEscapeListener() {
        if(this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
    }
    
    ngOnDestroy() {
        this.disableModality();
        
        this.unbindGlobalListeners();
        
        if(this.appendTo) {
            this.el.nativeElement.appendChild(this.containerViewChild.nativeElement);
        }
		
		this.unbindMaskClickListener();
    }

}

@NgModule({
    imports: [CommonModule],
    exports: [Dialog,SharedModule],
    declarations: [Dialog]
})
export class DialogModule { }
