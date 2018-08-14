import {NgModule,Component,ElementRef,OnDestroy,Input,EventEmitter,Renderer2,ContentChild,NgZone} from '@angular/core';
import {trigger,state,style,transition,animate,AnimationEvent} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {Header,Footer,SharedModule} from '../common/shared';
import {ButtonModule} from '../button/button';
import {Confirmation} from '../common/confirmation';
import {ConfirmationService} from '../common/confirmationservice';
import {Subscription}   from 'rxjs';

@Component({
    selector: 'p-confirmDialog',
    template: `
        <div [ngClass]="{'ui-dialog ui-confirmdialog ui-widget ui-widget-content ui-corner-all ui-shadow':true,'ui-dialog-rtl':rtl}" 
            [style.width.px]="width" [style.height.px]="height" (mousedown)="moveOnTop()"
            [@animation]="'visible'" (@animation.start)="onAnimationStart($event)" *ngIf="visible">
            <div class="ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top">
                <span class="ui-dialog-title" *ngIf="header">{{header}}</span>
                <a *ngIf="closable" [ngClass]="{'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all':true}" href="#" role="button" (click)="close($event)">
                    <span class="pi pi-fw pi-times"></span>
                </a>
            </div>
            <div class="ui-dialog-content ui-widget-content">
                <i [ngClass]="'ui-confirmdialog-icon'" [class]="icon" *ngIf="icon"></i>
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
        trigger('animation', [
            state('void', style({
                transform: 'translate3d(0, 25%, 0) scale(0.9)',
                opacity: 0
            })),
            state('visible', style({
                transform: 'none',
                opacity: 1
            })),
            transition('* => *', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)'))
        ])
    ],
    providers: [DomHandler]
})
export class ConfirmDialog implements OnDestroy {
    
    @Input() visible: boolean;

    @Input() header: string;
    
    @Input() icon: string;
    
    @Input() message: string;
    
    @Input() acceptIcon: string = 'pi pi-check';
    
    @Input() acceptLabel: string = 'Yes';
    
    @Input() acceptVisible: boolean = true;

    @Input() rejectIcon: string = 'pi pi-times';
    
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

    @Input() autoZIndex: boolean = true;
    
    @Input() baseZIndex: number = 0;
        
    @ContentChild(Footer) footer;
    
    confirmation: Confirmation;
        
    _visible: boolean;
    
    documentEscapeListener: any;
    
    documentResponsiveListener: any;
    
    mask: any;

    container: HTMLDivElement;
        
    contentContainer: HTMLDivElement;
      
    subscription: Subscription;
                
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

    onAnimationStart(event: AnimationEvent) {
        switch(event.toState) {
            case 'visible':
                this.container = event.element;
                this.contentContainer = this.domHandler.findSingle(this.el.nativeElement, '.ui-dialog-content');
                this.domHandler.findSingle(this.container, 'button').focus();
                this.appendContainer();
                this.moveOnTop();
                this.center();
                this.bindGlobalListeners();
                this.enableModality();
            break;

            case 'void':
                this.onOverlayHide();
            break;
        }
    }

    appendContainer() {
        if(this.appendTo) {
            if(this.appendTo === 'body')
                document.body.appendChild(this.container);
            else
                this.domHandler.appendChild(this.container, this.appendTo);
        }
    }

    restoreAppend() {
        if (this.container && this.appendTo) {
            this.el.nativeElement.appendChild(this.container);
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
    }
    
    moveOnTop() {
        if (this.autoZIndex) {
            this.el.nativeElement.children[0].style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
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

    onOverlayHide() {
        this.disableModality();
        this.unbindGlobalListeners();
        this.container = null;
    }
                
    ngOnDestroy() {
        this.restoreAppend();
        this.onOverlayHide();
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