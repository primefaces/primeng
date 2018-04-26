import {NgModule,Component,ElementRef,AfterViewInit,AfterViewChecked,OnDestroy,Input,Output,EventEmitter,Renderer2,
        ContentChildren,QueryList,ViewChild,NgZone} from '@angular/core';
import {trigger,state,style,transition,animate} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {Header,Footer,SharedModule} from '../common/shared';

let idx: number = 0;

@Component({
    selector: 'p-dialog',
    template: `
        <div #container [ngClass]="{'ui-dialog ui-widget ui-widget-content ui-corner-all ui-shadow':true, 'ui-dialog-rtl':rtl,'ui-dialog-draggable':draggable}" [style.display]="visible ? 'block' : 'none'"
            [ngStyle]="style" [class]="styleClass" [style.width.px]="width" [style.height.px]="height" [style.minWidth.px]="minWidth" [style.minHeight.px]="minHeight" (mousedown)="moveOnTop()" [@dialogState]="visible ? 'visible' : 'hidden'"
            role="dialog" [attr.aria-labelledby]="id + '-label'">
            <div #titlebar class="ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top"
                (mousedown)="initDrag($event)" *ngIf="showHeader">
                <span [attr.id]="id + '-label'" class="ui-dialog-title" *ngIf="header">{{header}}</span>
                <span [attr.id]="id + '-label'" class="ui-dialog-title" *ngIf="headerFacet && headerFacet.first">
                    <ng-content select="p-header"></ng-content>
                </span>
                <a *ngIf="closable" [ngClass]="{'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all':true}" href="#" role="button" (click)="close($event)" (mousedown)="onCloseMouseDown($event)">
                    <span class="fa fa-fw fa-close"></span>
                </a>
            </div>
            <div #content class="ui-dialog-content ui-widget-content" [ngStyle]="contentStyle">
                <ng-content></ng-content>
            </div>
            <div class="ui-dialog-footer ui-widget-content" *ngIf="footerFacet && footerFacet.first">
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
export class Dialog implements AfterViewInit,AfterViewChecked,OnDestroy {
    
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
    
    @Input() blockScroll: boolean = false;
    
    @Input() autoZIndex: boolean = true;
    
    @Input() baseZIndex: number = 0;

    @Input() minX: number = 0;

    @Input() minY: number = 0;

    @Input() autoAlign: boolean = true;

    @Input() focusOnShow: boolean = true;
        
    @ContentChildren(Header, {descendants: false}) headerFacet: QueryList<Header>;
    
    @ContentChildren(Footer, {descendants: false}) footerFacet: QueryList<Header>;
            
    @ViewChild('container') containerViewChild: ElementRef;
    
    @ViewChild('titlebar') headerViewChild: ElementRef;
    
    @ViewChild('content') contentViewChild: ElementRef;

    @Output() onShow: EventEmitter<any> = new EventEmitter();

    @Output() onHide: EventEmitter<any> = new EventEmitter();

    @Output() visibleChange:EventEmitter<any> = new EventEmitter();
    
    _visible: boolean;
    
    dragging: boolean;

    documentDragListener: any;

    documentDragEndListener: any;
    
    resizing: boolean;

    documentResizeListener: any;
    
    documentResizeEndListener: any;
    
    documentResponsiveListener: any;
    
    documentEscapeListener: Function;
	
    maskClickListener: Function;
    
    lastPageX: number;
    
    lastPageY: number;
    
    mask: HTMLDivElement;
            
    closeIconMouseDown: boolean;
    
    preWidth: number;
    
    preventVisibleChangePropagation: boolean;
    
    executePostDisplayActions: boolean;
    
    initialized: boolean;

    currentHeight: number;
    
    id: string = `ui-dialog-${idx++}`;
                
    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2, public zone: NgZone) {}
    
    @Input() get visible(): boolean {
        return this._visible;
    }

    set visible(val:boolean) {
        this._visible = val;
        
        if(this.initialized && this.containerViewChild && this.containerViewChild.nativeElement) {
            if(this._visible)
                this.show();
            else {
                if(this.preventVisibleChangePropagation)
                    this.preventVisibleChangePropagation = false;
                else
                    this.hide();
            }
        }
    }
        
    ngAfterViewChecked() {
        if(this.executePostDisplayActions) {
            this.onShow.emit({});
            this.positionOverlay();
            if(this.focusOnShow) {
                this.focus();
            }
            this.currentHeight = this.domHandler.getOuterHeight(this.containerViewChild.nativeElement);
            this.executePostDisplayActions = false;
        }
        else if(this.autoAlign && this.visible) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    let height = this.domHandler.getOuterHeight(this.containerViewChild.nativeElement);

                    if(height !== this.currentHeight) {
                        this.currentHeight = height;
                        this.positionOverlay();
                    }
                }, 50);
            });
        }
    }

    focus() {
        let focusable = this.domHandler.findSingle(this.containerViewChild.nativeElement, 'button');
        if(focusable) {
            focusable.focus();
        }
    }

    show() {
        this.executePostDisplayActions = true;
        this.moveOnTop();
        this.bindGlobalListeners();
        
        if(this.modal) {
            this.enableModality();
        }
    }
        
    positionOverlay() {
        let viewport = this.domHandler.getViewport();
        if(this.domHandler.getOuterHeight(this.containerViewChild.nativeElement) > viewport.height) {
             this.contentViewChild.nativeElement.style.height = (viewport.height * .75) + 'px';
        }
        
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
        this.unbindGlobalListeners();
        this.dragging = false;
        
        if(this.modal) {
            this.disableModality();
        }
    }
    
    close(event: Event) {
        this.preventVisibleChangePropagation = true;
        this.hide();
        this.visibleChange.emit(false);
        event.preventDefault();
    }
        
    ngAfterViewInit() { 
        this.initialized = true;
                      
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
            let maskStyleClass = 'ui-widget-overlay ui-dialog-mask';
            if(this.blockScroll) {
                maskStyleClass += ' ui-dialog-mask-scrollblocker';
            }
            this.domHandler.addMultipleClasses(this.mask, maskStyleClass);
            
			if(this.closable && this.dismissableMask) {
	             this.maskClickListener = this.renderer.listen(this.mask, 'click', (event: any) => {
					this.close(event);
	             });
			}
            document.body.appendChild(this.mask);
            if(this.blockScroll) {
                this.domHandler.addClass(document.body, 'ui-overflow-hidden');
            }
        }
    }
    
    disableModality() {
        if(this.mask) {
            document.body.removeChild(this.mask);
            if(this.blockScroll) {
                let bodyChildren = document.body.children;
                let hasBlockerMasks: boolean;
                for(let i = 0; i < bodyChildren.length; i++) {
                    let bodyChild = bodyChildren[i];
                    if(this.domHandler.hasClass(bodyChild, 'ui-dialog-mask-scrollblocker')) {
                        hasBlockerMasks = true;
                        break;
                    }
                }
                
                if(!hasBlockerMasks) {
                    this.domHandler.removeClass(document.body, 'ui-overflow-hidden');
                }
            }
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
        if(this.autoZIndex) {
            this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        } 
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
            this.domHandler.addClass(document.body, 'ui-unselectable-text');
        }
    }
    
    onDrag(event: MouseEvent) {
        if(this.dragging) {
            let deltaX = event.pageX - this.lastPageX;
            let deltaY = event.pageY - this.lastPageY;
            let leftPos = parseInt(this.containerViewChild.nativeElement.style.left) + deltaX;
            let topPos = parseInt(this.containerViewChild.nativeElement.style.top) + deltaY;

            if(leftPos >= this.minX) {
                this.containerViewChild.nativeElement.style.left = leftPos + 'px';
            }

            if(topPos >= this.minY) {
                this.containerViewChild.nativeElement.style.top = topPos + 'px';
            }

            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    }
    
    endDrag(event: MouseEvent) {
        if(this.draggable) {
            this.dragging = false;
            this.domHandler.removeClass(document.body, 'ui-unselectable-text');
        }
    }
    
    initResize(event: MouseEvent) {
        if(this.resizable) {
            this.preWidth = null;
            this.resizing = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
            this.domHandler.addClass(document.body, 'ui-unselectable-text');
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
    
    onResizeEnd(event: MouseEvent) {
        if(this.resizing) {
            this.resizing = false;
            this.domHandler.removeClass(document.body, 'ui-unselectable-text');
        }
    } 
    
    bindGlobalListeners() {
        if(this.draggable) {
            this.bindDocumentDragListener();
            this.bindDocumentDragEndListener();
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
        this.unbindDocumentDragEndListener();
        this.unbindDocumentResizeListeners();
        this.unbindDocumentResponsiveListener();
        this.unbindDocumentEscapeListener();
    }
    
    bindDocumentDragListener() {
        this.zone.runOutsideAngular(() => {
            this.documentDragListener = this.onDrag.bind(this);
            window.document.addEventListener('mousemove', this.documentDragListener);
        });
    }
    
    unbindDocumentDragListener() {
        if(this.documentDragListener) {
            window.document.removeEventListener('mousemove', this.documentDragListener);
            this.documentDragListener = null;
        }
    }

    bindDocumentDragEndListener() {
        this.zone.runOutsideAngular(() => {
            this.documentDragEndListener = this.endDrag.bind(this);
            window.document.addEventListener('mouseup', this.documentDragEndListener);
        });
    }
    
    unbindDocumentDragEndListener() {
        if(this.documentDragEndListener) {
            window.document.removeEventListener('mouseup', this.documentDragEndListener);
            this.documentDragEndListener = null;
        }
    }
    
    bindDocumentResizeListeners() {
        this.zone.runOutsideAngular(() => {
            this.documentResizeListener = this.onResize.bind(this);
            this.documentResizeEndListener = this.onResizeEnd.bind(this);
            window.document.addEventListener('mousemove', this.documentResizeListener);
            window.document.addEventListener('mouseup', this.documentResizeEndListener);
        });
    }
    
    unbindDocumentResizeListeners() {
        if(this.documentResizeListener && this.documentResizeEndListener) {
            window.document.removeEventListener('mouseup', this.documentResizeListener);
            window.document.removeEventListener('mouseup', this.documentResizeEndListener);
            this.documentResizeListener = null;
            this.documentResizeEndListener = null;
        }
    }
    
    bindDocumentResponsiveListener() {
        this.zone.runOutsideAngular(() => {
            this.documentResponsiveListener = this.onWindowResize.bind(this);
            window.addEventListener('resize', this.documentResponsiveListener);
        });
    }
    
    unbindDocumentResponsiveListener() {
        if(this.documentResponsiveListener) {
            window.removeEventListener('resize', this.documentResponsiveListener);
            this.documentResponsiveListener = null;
        }
    }
    
    onWindowResize(event) {
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
        this.initialized = false;
        
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
