import {AfterViewInit, Component, ContentChild, ElementRef, Input, NgModule, OnDestroy, Renderer2} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {Footer, SharedModule} from '../common/shared';
import {ButtonModule} from '../button/button';
import {Confirmation} from '../common/confirmation';
import {ConfirmationService} from '../common/confirmationservice';
import {Subscription} from 'rxjs/Subscription';
import {Subject} from 'rxjs/Subject';

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
                <i [ngClass]="'fa'" [class]="icon"></i>
                <span class="ui-confirmdialog-message" [innerHTML]="message"></span>
            </div>
            <div class="ui-dialog-footer ui-widget-content" *ngIf="footer">
                <ng-content select="p-footer"></ng-content>
            </div>
            <div class="ui-dialog-footer ui-widget-content" *ngIf="!footer">
                <button type="button" pButton [icon]="acceptIcon" [label]="acceptLabel" (click)="accept()" *ngIf="acceptVisible"></button>
                <button type="button" pButton [icon]="rejectIcon" [label]="rejectLabel" (click)="reject()" *ngIf="rejectVisible"></button>
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
        
    @Input() width: any;

    @Input() height: any;
    
    @Input() closeOnEscape: boolean = true;

    @Input() rtl: boolean;

    @Input() closable: boolean = true;

    @Input() responsive: boolean = true;
    
    @Input() appendTo: any;
    
    @Input() key: string;
        
    @ContentChild(Footer) footer;
        
    _visible: boolean;
    
    documentEscapeListener: any;
    
    documentResponsiveListener: any;
    
    mask: any;
        
    contentContainer: any;
    
    positionInitialized: boolean;
    
    acceptEvent?: Subject<any>;
    
    rejectEvent?: Subject<any>;
    
    $acceptEvent: Subscription;
    
    $rejectEvent: Subscription;
    
    $subscription: Subscription;
    
    executePostShowActions: boolean;
            
    constructor(public el: ElementRef, public domHandler: DomHandler, 
            public renderer: Renderer2, private confirmationService: ConfirmationService) {
        this.$subscription = confirmationService.requireConfirmation$.subscribe(confirmation => {
            if(confirmation.key === this.key) {
                this.message = confirmation.message||this.message;
                this.icon = confirmation.icon||this.icon;
                this.header = confirmation.header||this.header;
                this.rejectVisible = confirmation.rejectVisible == null ? this.rejectVisible : confirmation.rejectVisible;
                this.acceptVisible = confirmation.acceptVisible == null ? this.acceptVisible : confirmation.acceptVisible;
                
                if(confirmation.accept) {
                    this.acceptEvent = new Subject();
                    this.$acceptEvent = this.acceptEvent.subscribe(() => {
                        confirmation.accept.apply(confirmation);
                    });
                }
                
                if(confirmation.reject) {
                    this.rejectEvent = new Subject();
                    this.$rejectEvent = this.rejectEvent.subscribe(() => {
                        confirmation.reject.apply(confirmation);
                    });
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
            this.executePostShowActions = true;
        } 
        
        if(this._visible)
            this.enableModality();
        else
            this.disableModality();
    }
    
    ngAfterViewInit() {
        this.contentContainer = this.domHandler.findSingle(this.el.nativeElement, '.ui-dialog-content');
        
        if(this.responsive) {
            this.documentResponsiveListener = this.renderer.listen('window', 'resize', (event) => {
                this.center();
            });
        }
        
        if(this.closeOnEscape && this.closable) {
            this.documentEscapeListener = this.renderer.listen('document', 'keydown', (event) => {
                if(event.which == 27) {
                    if(this.el.nativeElement.children[0].style.zIndex == DomHandler.zindex) {
                        this.close(event);
                    }
                }
            });
        }
        
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
        if(this.rejectEvent) {
            this.rejectEvent.next();
        }
        
        this.hide();
        event.preventDefault();
    }
    
    hide() {
        this.visible = false;
    }
    
    moveOnTop() {
        this.el.nativeElement.children[0].style.zIndex = ++DomHandler.zindex;
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
        
        if (this.$acceptEvent) {
            this.$acceptEvent.unsubscribe();
        }
        
        if (this.$rejectEvent) {
            this.$rejectEvent.unsubscribe();
        }
        
        this.$subscription.unsubscribe();
    }
    
    accept() {
        if(this.acceptEvent) {
            this.acceptEvent.next();
        }
        
        this.hide();
    }
    
    reject() {
        if(this.rejectEvent) {
            this.rejectEvent.next();
        }
        
        this.hide();
    }
}

@NgModule({
    imports: [CommonModule,ButtonModule],
    exports: [ConfirmDialog,ButtonModule,SharedModule],
    declarations: [ConfirmDialog]
})
export class ConfirmDialogModule { }