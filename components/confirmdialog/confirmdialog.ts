import {NgModule,Component,ElementRef,AfterViewInit,OnDestroy,Input,Output,EventEmitter,Renderer,ContentChild,trigger,state,style,transition,animate} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {Header} from '../common/shared';

@Component({
    selector: 'p-confirmDialog',
    template: `
        <div [ngClass]="{'ui-dialog ui-confirmdialog ui-widget ui-widget-content ui-corner-all ui-shadow':true,'ui-dialog-rtl':rtl}" 
            [style.display]="visible ? 'block' : 'none'" [style.width.px]="width" [style.height.px]="height" (mousedown)="moveOnTop()" [@dialogState]="visible ? 'visible' : 'hidden'">
            <div class="ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top">
                <span class="ui-dialog-title" *ngIf="header">{{header}}</span>
                <a [ngClass]="{'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all':true,'ui-state-hover':hoverCloseIcon}" href="#" role="button" *ngIf="closable" 
                    (click)="hide($event)" (mouseenter)="hoverCloseIcon=true" (mouseleave)="hoverCloseIcon=false">
                    <span class="fa fa-fw fa-close"></span>
                </a>
            </div>
            <div class="ui-dialog-content ui-widget-content" [style.height.px]="contentHeight">
                <i [class]="icon"></i>
                <span class="ui-confirmdialog-message">{{message}}</span>
            </div>
            <div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix">
                <button type="button" pButton icon="fa-close" label="No"></button>
                <button type="button" pButton icon="fa-check" label="Yes"></button>
            </div>
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
export class ConfirmDialog implements AfterViewInit,OnDestroy {

    @Input() header: string;
    
    @Input() icon: string;
    
    @Input() message: string;
    
    @Input() width: any;

    @Input() height: any;
    
    @Input() contentHeight: any;

    @Input() closeOnEscape: boolean = true;

    @Input() rtl: boolean;

    @Input() closable: boolean = true;

    @Input() responsive: boolean;
    
    @Input() appendTo: any;
    
    @Output() visibleChange:EventEmitter<any> = new EventEmitter();
    
    _visible: boolean;
    
    documentEscapeListener: any;
    
    documentResponsiveListener: any;
    
    mask: any;
        
    contentContainer: any;
    
    positionInitialized: boolean;
            
    constructor(protected el: ElementRef, protected domHandler: DomHandler, protected renderer: Renderer) {}
    
    @Input() get visible(): boolean {
        return this._visible;
    }

    set visible(val:boolean) {
        this._visible = val;
        
        if(this._visible) {            
            if(!this.positionInitialized) {
                this.center();
                this.positionInitialized = true;
            }
            
            this.el.nativeElement.children[0].style.zIndex = ++DomHandler.zindex;
        } 
        
        if(this._visible)
            this.enableModality();
        else
            this.disableModality();
    }
    
    ngAfterViewInit() {
        this.contentContainer = this.domHandler.findSingle(this.el.nativeElement, '.ui-dialog-content');
        
        if(this.responsive) {
            this.documentResponsiveListener = this.renderer.listenGlobal('window', 'resize', (event) => {
                this.center();
            });
        }
        
        if(this.closeOnEscape && this.closable) {
            this.documentEscapeListener = this.renderer.listenGlobal('body', 'keydown', (event) => {
                if(event.which == 27) {
                    if(this.el.nativeElement.children[0].style.zIndex == DomHandler.zindex) {
                        this.hide(event);
                    }
                }
            });
        }
        
        if(this.appendTo) {
            if(this.appendTo === 'body')
                document.body.appendChild(this.el.nativeElement);
            else
                this.appendTo.appendChild(this.el.nativeElement);
        }
    }
        
    center() {
        let container = this.el.nativeElement.children[0];
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
    
    enableModality() {
        if(!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = this.el.nativeElement.children[0].style.zIndex - 1;
            this.domHandler.addMultipleClasses(this.mask, 'ui-widget-overlay ui-dialog-mask');
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
        this.visibleChange.emit(false);
        event.preventDefault();
    }
    
    moveOnTop() {
        this.el.nativeElement.children[0].style.zIndex = ++DomHandler.zindex;
    }
                
    ngOnDestroy() {
        this.disableModality();
                        
        if(this.responsive) {
            this.documentResponsiveListener();
        }
        
        if(this.closeOnEscape && this.closable) {
            this.documentEscapeListener();
        }
        
        if(this.appendTo && this.appendTo === 'body') {
            document.body.removeChild(this.el.nativeElement);
        }
    }

}

@NgModule({
    imports: [CommonModule],
    exports: [ConfirmDialog],
    declarations: [ConfirmDialog]
})
export class ConfirmDialogModule { }