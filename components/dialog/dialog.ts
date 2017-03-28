import {NgModule,Component,ElementRef,AfterViewInit,AfterViewChecked,OnDestroy,Input,Output,EventEmitter,Renderer,ContentChild,ViewChild} from '@angular/core';
import {trigger,state,style,transition,animate} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {Header,SharedModule} from '../common/shared';

@Component({
    selector: 'p-dialog',
    template: `
        <div #container [ngClass]="{'ui-dialog ui-widget ui-widget-content ui-corner-all ui-shadow':true,'ui-dialog-rtl':rtl,'ui-dialog-draggable':draggable}" [ngStyle]="style" [class]="styleClass"
            [style.display]="visible ? 'block' : 'none'" [style.width.px]="width" [style.height.px]="height" (mousedown)="moveOnTop()" [@dialogState]="visible ? 'visible' : 'hidden'">
            <div class="ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top"
                (mousedown)="initDrag($event)" (mouseup)="endDrag($event)" *ngIf="showHeader">
                <span class="ui-dialog-title" *ngIf="header">{{header}}</span>
                <span class="ui-dialog-title" *ngIf="headerFacet">
                    <ng-content select="p-header"></ng-content>
                </span>
                <a *ngIf="closable" [ngClass]="{'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all':true}" href="#" role="button" (click)="hide($event)">
                    <span class="fa fa-fw fa-close"></span>
                </a>
            </div>
            <div #content class="ui-dialog-content ui-widget-content" [ngStyle]="contentStyle">
                <ng-content></ng-content>
            </div>
            <ng-content select="p-footer"></ng-content>
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
        
    @Input() contentStyle: any;

    @Input() modal: boolean;

    @Input() closeOnEscape: boolean = true;
	
    @Input() dismissableMask: boolean;

    @Input() rtl: boolean;

    @Input() closable: boolean = true;

    @Input() responsive: boolean;
    
    @Input() appendTo: any;
    
    @Input() style: any;
        
    @Input() styleClass: string;
    
    @Input() showHeader: boolean = true;
    
    @ContentChild(Header) headerFacet;
    
    @ViewChild('container') containerViewChild: ElementRef;
    
    @ViewChild('content') contentViewChild: ElementRef;

    @Output() onBeforeShow: EventEmitter<any> = new EventEmitter();

    @Output() onAfterShow: EventEmitter<any> = new EventEmitter();

    @Output() onBeforeHide: EventEmitter<any> = new EventEmitter();

    @Output() onAfterHide: EventEmitter<any> = new EventEmitter();

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
    
    shown: boolean;
    
    container: HTMLDivElement;
    
    contentContainer: HTMLDivElement;
    
    positionInitialized: boolean;
            
    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer) {}
    
    @Input() get visible(): boolean {
        return this._visible;
    }

    set visible(val:boolean) {
        this._visible = val;
        
        if(this._visible) {
            this.onBeforeShow.emit({});
            this.shown = true;
        } 
        
		if(!this._visible) {
			if(this.modal) {
				this.disableModality();
			}
			this.domHandler.removeClass(document.body, 'ui-dialog-is-visible' + (this.modal ? '-modal' : ''));
		}
    }
    
    show() {
        if(!this.positionInitialized) {
            this.center();
            this.positionInitialized = true;
        }
        
        this.container.style.zIndex = String(++DomHandler.zindex);
        
        if(this.modal) {
            this.enableModality();
        }
    }
    
    ngAfterViewInit() {
        this.container = <HTMLDivElement> this.containerViewChild.nativeElement;
        this.contentContainer =  <HTMLDivElement> this.contentViewChild.nativeElement;
        
        if(this.draggable) {
            this.documentDragListener = this.renderer.listenGlobal('body', 'mousemove', (event) => {
                this.onDrag(event);
            });
        }
        
        if(this.resizable) {
            this.documentResizeListener = this.renderer.listenGlobal('body', 'mousemove', (event) => {
                this.onResize(event);
            });
            
            this.documentResizeEndListener = this.renderer.listenGlobal('body', 'mouseup', (event) => {
                if(this.resizing) {
                    this.resizing = false;
                }
            });
        }
        
        if(this.responsive) {
            this.documentResponsiveListener = this.renderer.listenGlobal('window', 'resize', (event) => {
                this.center();
            });
        }
        
        if(this.closeOnEscape && this.closable) {
            this.documentEscapeListener = this.renderer.listenGlobal('body', 'keydown', (event) => {
                if(event.which == 27) {
                    if(parseInt(this.container.style.zIndex) == DomHandler.zindex) {
                        this.hide(event);
                    }
                }
            });
        }
        
        if(this.appendTo) {
            if(this.appendTo === 'body')
                document.body.appendChild(this.container);
            else
                this.domHandler.appendChild(this.container, this.appendTo);
        }
    }
    
    ngAfterViewChecked() {
        if(this.shown) {
            this.show();
            this.onAfterShow.emit({});
            this.shown = false;
			this.domHandler.addClass(document.body, 'ui-dialog-is-visible' + (this.modal ? '-modal' : ''));
        }
    }
    
    center() {
        let elementWidth = this.domHandler.getOuterWidth(this.container);
        let elementHeight = this.domHandler.getOuterHeight(this.container);
        if(elementWidth == 0 && elementHeight == 0) {
            this.container.style.visibility = 'hidden';
            this.container.style.display = 'block';
            elementWidth = this.domHandler.getOuterWidth(this.container);
            elementHeight = this.domHandler.getOuterHeight(this.container);
            this.container.style.display = 'none';
            this.container.style.visibility = 'visible';
        }
        let viewport = this.domHandler.getViewport();
        let x = Math.max((viewport.width - elementWidth) / 2, 0);
        let y = Math.max((viewport.height - elementHeight) / 2, 0);

        this.container.style.left = x + 'px';
        this.container.style.top = y + 'px';
    }
    
    enableModality() {
        if(!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = String(parseInt(this.container.style.zIndex) - 1);
            this.domHandler.addMultipleClasses(this.mask, 'ui-widget-overlay ui-dialog-mask');
            
			if(this.closable && this.dismissableMask) {
	             this.maskClickListener = this.renderer.listen(this.mask, 'click', (event: any) => {
					this.hide(event);
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
    
    hide(event) {
        this.onBeforeHide.emit(event);
        this.visibleChange.emit(false);
        this.onAfterHide.emit(event);
        this.unbindMaskClickListener();
        event.preventDefault();
    }
    
    unbindMaskClickListener() {
        if(this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
		}
    }
    
    moveOnTop() {
        this.container.style.zIndex = String(++DomHandler.zindex);
    }
    
    initDrag(event) {
        if(this.draggable) {
            this.dragging = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    }
    
    onDrag(event) {
        if(this.dragging) {
            let deltaX = event.pageX - this.lastPageX;
            let deltaY = event.pageY - this.lastPageY;
            let leftPos = parseInt(this.container.style.left);
            let topPos = parseInt(this.container.style.top);

            this.container.style.left = leftPos + deltaX + 'px';
            this.container.style.top = topPos + deltaY + 'px';
            
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    }
    
    endDrag(event) {
        if(this.draggable) {
            this.dragging = false;
        }
    }
    
    initResize(event) {
        if(this.resizable) {
            this.resizing = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    }
    
    onResize(event) {
        if(this.resizing) {
            let deltaX = event.pageX - this.lastPageX;
            let deltaY = event.pageY - this.lastPageY;
            let containerWidth = this.domHandler.getWidth(this.container);
            let contentHeight = this.domHandler.getOuterHeight(this.contentContainer);
            let newWidth = containerWidth + deltaX;
            let newHeight = contentHeight + deltaY;
            
            if(newWidth > this.minWidth)
                this.container.style.width = newWidth + 'px';
                
            if(newHeight > this.minHeight)
                this.contentContainer.style.height = newHeight + 'px';
            
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    }
    
    ngOnDestroy() {
        this.disableModality();
        
        if(this.documentDragListener) {
            this.documentDragListener();
        }
        
        if(this.documentResizeListener && this.documentResizeEndListener) {
            this.documentResizeListener();
            this.documentResizeEndListener();
        }
        
        if(this.documentResponsiveListener) {
            this.documentResponsiveListener();
        }
        
        if(this.documentEscapeListener) {
            this.documentEscapeListener();
        }
        
        if(this.appendTo) {
            this.el.nativeElement.appendChild(this.container);
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