import {NgModule,Component,ElementRef,OnDestroy,Input,EventEmitter,Renderer2,ContentChild,NgZone,ViewChild} from '@angular/core';
import {trigger,state,style,transition,animate,AnimationEvent} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {Footer,SharedModule} from '../common/shared';
import {ButtonModule} from '../button/button';
import {Confirmation} from '../common/confirmation';
import {ConfirmationService} from '../common/confirmationservice';
import {Subscription}   from 'rxjs';

@Component({
    selector: 'p-confirmDialog',
    template: `
        <div [ngClass]="{'ui-dialog ui-confirmdialog ui-widget ui-widget-content ui-corner-all ui-shadow':true,'ui-dialog-rtl':rtl}" [ngStyle]="style" [class]="styleClass" (mousedown)="moveOnTop()"
            [@animation]="{value: 'visible', params: {transitionParams: transitionOptions}}" (@animation.start)="onAnimationStart($event)" *ngIf="visible">
            <div class="ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top">
                <span class="ui-dialog-title" *ngIf="header">{{header}}</span>
                <a *ngIf="closable" [ngClass]="{'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all':true}" tabindex="0" role="button" (click)="close($event)" (keydown.enter)="close($event)">
                    <span class="pi pi-fw pi-times"></span>
                </a>
            </div>
            <div #content class="ui-dialog-content ui-widget-content">
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
                transform: 'translateX(-50%) translateY(-50%) scale(0.7)',
                opacity: 0
            })),
            state('visible', style({
                transform: 'translateX(-50%) translateY(-50%) scale(1)',
                opacity: 1
            })),
            transition('* => *', animate('{{transitionParams}}'))
        ])
    ]
})
export class ConfirmDialog implements OnDestroy {
    
    @Input() visible: boolean;

    @Input() header: string;
    
    @Input() icon: string;
    
    @Input() message: string;

    @Input() style: any;
    
    @Input() styleClass: string;
    
    @Input() acceptIcon: string = 'pi pi-check';
    
    @Input() acceptLabel: string = 'Yes';
    
    @Input() acceptVisible: boolean = true;

    @Input() rejectIcon: string = 'pi pi-times';
    
    @Input() rejectLabel: string = 'No';
    
    @Input() rejectVisible: boolean = true;
    
    @Input() acceptButtonStyleClass: string;
    
    @Input() rejectButtonStyleClass: string;

    @Input() closeOnEscape: boolean = true;

    @Input() blockScroll: boolean = true;

    @Input() rtl: boolean;

    @Input() closable: boolean = true;
    
    @Input() appendTo: any;
    
    @Input() key: string;

    @Input() autoZIndex: boolean = true;
    
    @Input() baseZIndex: number = 0;
    
    @Input() transitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';

    @ContentChild(Footer, { static: false }) footer;

    @ViewChild('content', { static: false }) contentViewChild: ElementRef;
    
    confirmation: Confirmation;
        
    _visible: boolean;
    
    documentEscapeListener: any;
        
    mask: any;

    container: HTMLDivElement;
        
    contentContainer: HTMLDivElement;
      
    subscription: Subscription;

    preWidth: number;

    _width: any;

    _height: any;
                
    constructor(public el: ElementRef, public renderer: Renderer2, private confirmationService: ConfirmationService, public zone: NgZone) {
        this.subscription = this.confirmationService.requireConfirmation$.subscribe(confirmation => {
            if (confirmation.key === this.key) {
                this.confirmation = confirmation;
                this.message = this.confirmation.message||this.message;
                this.icon = this.confirmation.icon||this.icon;
                this.header = this.confirmation.header||this.header;
                this.rejectVisible = this.confirmation.rejectVisible == null ? this.rejectVisible : this.confirmation.rejectVisible;
                this.acceptVisible = this.confirmation.acceptVisible == null ? this.acceptVisible : this.confirmation.acceptVisible;
                this.acceptLabel = this.confirmation.acceptLabel||this.acceptLabel;
                this.rejectLabel = this.confirmation.rejectLabel||this.rejectLabel;

                if (this.confirmation.accept) {
                    this.confirmation.acceptEvent = new EventEmitter();
                    this.confirmation.acceptEvent.subscribe(this.confirmation.accept);
                }
                
                if (this.confirmation.reject) {
                    this.confirmation.rejectEvent = new EventEmitter();
                    this.confirmation.rejectEvent.subscribe(this.confirmation.reject);
                }

                if (this.confirmation.blockScroll === false) {
                    this.blockScroll = this.confirmation.blockScroll;
                }

                this.visible = true;
            }
        });         
    }

    @Input() get width(): any {
        return this._width;
    }

    set width(val:any) {
        this._width = val;
        console.warn("width property is deprecated, use style to define the width of the Dialog.");
    }

    @Input() get height(): any {
        return this._height;
    }

    set height(val:any) {
        this._height = val;
        console.warn("height property is deprecated, use style to define the height of the Dialog.");
    }

    onAnimationStart(event: AnimationEvent) {
        switch(event.toState) {
            case 'visible':
                this.container = event.element;
                this.setDimensions();
                this.contentContainer = DomHandler.findSingle(this.container, '.ui-dialog-content');
                DomHandler.findSingle(this.container, 'button').focus();
                this.appendContainer();
                this.moveOnTop();
                this.bindGlobalListeners();
                this.enableModality();
            break;

            case 'void':
                this.onOverlayHide();
            break;
        }
    }

    setDimensions() {
        if (this.width) {
            this.container.style.width = this.width + 'px';
        }

        if (this.height) {
            this.container.style.height = this.height + 'px';
        }
    }

    appendContainer() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.container);
            else
                DomHandler.appendChild(this.container, this.appendTo);
        }
    }

    restoreAppend() {
        if (this.container && this.appendTo) {
            this.el.nativeElement.appendChild(this.container);
        }
    }
        
    enableModality() {
        if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = String(parseInt(this.container.style.zIndex) - 1);
            DomHandler.addMultipleClasses(this.mask, 'ui-widget-overlay ui-dialog-mask');
            document.body.appendChild(this.mask);
            DomHandler.addClass(document.body, 'ui-overflow-hidden');

            if(this.blockScroll) {
                DomHandler.addClass(document.body, 'ui-overflow-hidden');
            }
        }
    }
    
    disableModality() {
        if (this.mask) {
            document.body.removeChild(this.mask);
            DomHandler.removeClass(document.body, 'ui-overflow-hidden');

            if(this.blockScroll) {            
                DomHandler.removeClass(document.body, 'ui-overflow-hidden');
            }
            
            this.mask = null;
        }
    }
    
    close(event: Event) {
        if (this.confirmation.rejectEvent) {
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
            this.container.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
    }
    
    bindGlobalListeners() {
        if (this.closeOnEscape && this.closable && !this.documentEscapeListener) {
            this.documentEscapeListener = this.renderer.listen('document', 'keydown', (event) => {
                if (event.which == 27) {
                    if (parseInt(this.container.style.zIndex) === (DomHandler.zindex + this.baseZIndex) && this.visible) {
                        this.close(event);
                    }
                }
            });
        }
    }
    
    unbindGlobalListeners() {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
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
        if (this.confirmation.acceptEvent) {
            this.confirmation.acceptEvent.emit();
        }
        
        this.hide();
        this.confirmation = null;
    }
    
    reject() {
        if (this.confirmation.rejectEvent) {
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