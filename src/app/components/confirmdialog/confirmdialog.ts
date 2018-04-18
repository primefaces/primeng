import {NgModule,Component,ElementRef,AfterViewInit,OnDestroy,Input,Output,AfterViewChecked,EventEmitter,Renderer2,ContentChild,NgZone} from '@angular/core';
import {trigger,state,style,transition,animate} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {Header,Footer,SharedModule} from '../common/shared';
import {ButtonModule} from '../button/button';
import {Confirmation} from '../common/confirmation';
import {ConfirmationService} from '../common/confirmationservice';
import {Subscription}   from 'rxjs/Subscription';

@Component({
    selector: 'p-confirmDialog',
    template: `
        <div [ngClass]="{'ui-dialog ui-confirmdialog ui-widget ui-widget-content ui-corner-all ui-shadow':true,'ui-dialog-rtl':rtl}" 
            [style.display]="visible ? 'block' : 'none'" [style.width.px]="width" [style.height.px]="height" (mousedown)="moveOnTop()" [@dialogState]="visible ? 'visible' : 'hidden'">
            <div class="ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top">
                <span class="ui-dialog-title" *ngIf="header">{{header}}</span>
                <a *ngIf="closable" [ngClass]="{'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all':true}" href="#" role="button" (click)="close($event)">
                    <span class="fa fa-fw fa-close"></span>
                </a>
            </div>
            <div class="ui-dialog-content ui-widget-content">
                <i [ngClass]="'fa'" [class]="icon" *ngIf="icon"></i>
                <span class="ui-confirmdialog-message" [innerHTML]="message"></span>
            </div>
            <div class="ui-dialog-footer ui-widget-content" *ngIf="footer">
                <ng-content select="p-footer"></ng-content>
            </div>
            <div class="ui-dialog-footer ui-widget-content" *ngIf="!footer">
                <button type="button" pButton [icon]="acceptIcon" [label]="acceptLabel" (click)="accept()" [class]="acceptButtonStyleClass" *ngIf="acceptVisible"></button>
                <button type="button" pButton [icon]="rejectIcon" [label]="rejectLabel" (click)="reject()" [class]="rejectButtonStyleClass" *ngIf="rejectVisible"></button>
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
export class ConfirmDialog implements AfterViewInit,AfterViewChecked,OnDestroy {
    
    @Input() header: string;
    
    @Input() icon: string;
    
    @Input() message: string;
    
    @Input() acceptIcon: string = 'fa-check';
    
    @Input() acceptLabel: string = 'Yes';
    
    @Input() acceptVisible: boolean = true;

    @Input() rejectIcon: string = 'fa-close';
    
    @Input() rejectLabel: string = 'No';
    
    @Input() rejectVisible: boolean = true;
    
    @Input() acceptButtonStyleClass: string;
    
    @Input() rejectButtonStyleClass: string;
        
    @Input() width: any;

    @Input() height: any;
    
    @Input() closeOnEscape: boolean = true;

    @Input() rtl: boolean;

    @Input() closable: boolean = true;

    @Input() responsive: boolean = true;
    
    @Input() appendTo: any;
    
    @Input() key: string;
        
    @ContentChild(Footer) footer;
    
    confirmation: Confirmation;
        
    _visible: boolean;
    
    documentEscapeListener: any;
    
    documentResponsiveListener: any;
    
    mask: any;
        
    contentContainer: any;
    
    positionInitialized: boolean;
    
    subscription: Subscription;
    
    executePostShowActions: boolean;
            
    constructor(public el: ElementRef, public domHandler: DomHandler, 
            public renderer: Renderer2, private confirmationService: ConfirmationService, public zone: NgZone) {
        this.subscription = confirmationService.requireConfirmation$.subscribe(confirmation => {
            if(confirmation.key === this.key) {
                this.confirmation = confirmation;
                this.message = this.confirmation.message||this.message;
                this.icon = this.confirmation.icon||this.icon;
                this.header = this.confirmation.header||this.header;
                this.rejectVisible = this.confirmation.rejectVisible == null ? this.rejectVisible : this.confirmation.rejectVisible;
                this.acceptVisible = this.confirmation.acceptVisible == null ? this.acceptVisible : this.confirmation.acceptVisible;
                this.acceptLabel = this.confirmation.acceptLabel||this.acceptLabel;
                this.rejectLabel = this.confirmation.rejectLabel||this.rejectLabel;

                if(this.confirmation.accept) {
                    this.confirmation.acceptEvent = new EventEmitter();
                    this.confirmation.acceptEvent.subscribe(this.confirmation.accept);
                }
                
                if(this.confirmation.reject) {
                    this.confirmation.rejectEvent = new EventEmitter();
                    this.confirmation.rejectEvent.subscribe(this.confirmation.reject);
                }

                this.visible = true;
            }
        });         
    }
    
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
            this.bindGlobalListeners();
            this.executePostShowActions = true;
        } 
        
        if(this._visible)
            this.enableModality();
        else
            this.disableModality();
    }
    
    ngAfterViewInit() {
        this.contentContainer = this.domHandler.findSingle(this.el.nativeElement, '.ui-dialog-content');
        
        if(this.appendTo) {
            if(this.appendTo === 'body')
                document.body.appendChild(this.el.nativeElement);
            else
                this.domHandler.appendChild(this.el.nativeElement, this.appendTo);
        }
    }
    
    ngAfterViewChecked() {
        if(this.executePostShowActions) {
            this.domHandler.findSingle(this.el.nativeElement.children[0], 'button').focus();
            this.executePostShowActions = false;
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
            this.domHandler.addClass(document.body, 'ui-overflow-hidden');
        }
    }
    
    disableModality() {
        if(this.mask) {
            document.body.removeChild(this.mask);
            this.domHandler.removeClass(document.body, 'ui-overflow-hidden');
            this.mask = null;
        }
    }
    
    close(event: Event) {
        if(this.confirmation.rejectEvent) {
            this.confirmation.rejectEvent.emit();
        }
        
        this.hide();
        event.preventDefault();
    }
    
    hide() {
        this.visible = false;
        this.unbindGlobalListeners();
    }
    
    moveOnTop() {
        this.el.nativeElement.children[0].style.zIndex = ++DomHandler.zindex;
    }
    
    bindGlobalListeners() {
        if(this.closeOnEscape && this.closable && !this.documentEscapeListener) {
            this.documentEscapeListener = this.renderer.listen('document', 'keydown', (event) => {
                if(event.which == 27) {
                    if(this.el.nativeElement.children[0].style.zIndex == DomHandler.zindex && this.visible) {
                        this.close(event);
                    }
                }
            });
        }
        
        if(this.responsive) {
            this.zone.runOutsideAngular(() => {
                this.documentResponsiveListener = this.center.bind(this);
                window.addEventListener('resize', this.documentResponsiveListener);
            });
        }
    }
    
    unbindGlobalListeners() {
        if(this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
        
        if(this.documentResponsiveListener) {
            window.removeEventListener('resize', this.documentResponsiveListener);
            this.documentResponsiveListener = null;
        }
    }
                
    ngOnDestroy() {
        this.disableModality();
                        
        if(this.documentResponsiveListener) {
            this.documentResponsiveListener();
        }
        
        if(this.documentEscapeListener) {
            this.documentEscapeListener();
        }
        
        if(this.appendTo && this.appendTo === 'body') {
            document.body.removeChild(this.el.nativeElement);
        }
        
        this.subscription.unsubscribe();
    }
    
    accept() {
        if(this.confirmation.acceptEvent) {
            this.confirmation.acceptEvent.emit();
        }
        
        this.hide();
        this.confirmation = null;
    }
    
    reject() {
        if(this.confirmation.rejectEvent) {
            this.confirmation.rejectEvent.emit();
        }
        
        this.hide();
        this.confirmation = null;
    }
}

@NgModule({
    imports: [CommonModule,ButtonModule],
    exports: [ConfirmDialog,ButtonModule,SharedModule],
    declarations: [ConfirmDialog]
})
export class ConfirmDialogModule { }