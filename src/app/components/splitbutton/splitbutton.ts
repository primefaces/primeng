import {NgModule,Component,ElementRef,OnDestroy,Input,Output,ContentChildren,EventEmitter,QueryList,Renderer2,ChangeDetectorRef,ViewChild} from '@angular/core';
import {trigger,state,style,transition,animate,AnimationEvent} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {MenuItem} from '../common/menuitem';
import {ButtonModule} from '../button/button';
import {Router} from '@angular/router';
import {RouterModule} from '@angular/router';

@Component({
    selector: 'p-splitButton',
    template: `
        <div #container [ngClass]="{'ui-splitbutton ui-buttonset ui-widget':true,'ui-state-disabled':disabled}" [ngStyle]="style" [class]="styleClass">
            <button #defaultbtn type="button" pButton [icon]="icon" [iconPos]="iconPos" [label]="label" [cornerStyleClass]="dir === 'rtl' ? 'ui-corner-right': 'ui-corner-left'" (click)="onDefaultButtonClick($event)" [disabled]="disabled" [attr.tabindex]="tabindex">
            </button><button type="button" pButton class="ui-splitbutton-menubutton" icon="pi pi-caret-down" [cornerStyleClass]="dir === 'rtl' ? 'ui-corner-left': 'ui-corner-right'" (click)="onDropdownButtonClick($event)" [disabled]="disabled"></button>
            <div #overlay [ngClass]="'ui-menu ui-menu-dynamic ui-widget ui-widget-content ui-corner-all ui-helper-clearfix ui-shadow'" *ngIf="overlayVisible"
                    [ngStyle]="menuStyle" [class]="menuStyleClass"
                    [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" (@overlayAnimation.start)="onOverlayAnimationStart($event)">
                <ul class="ui-menu-list ui-helper-reset">
                    <ng-template ngFor let-item [ngForOf]="model">
                        <li class="ui-menuitem ui-widget ui-corner-all" role="menuitem" *ngIf="item.visible !== false">
                            <a *ngIf="!item.routerLink" [href]="item.url||'#'" class="ui-menuitem-link ui-corner-all" [attr.target]="item.target"
                                [ngClass]="{'ui-state-disabled':item.disabled}" (click)="itemClick($event, item)">
                                <span [ngClass]="'ui-menuitem-icon'" [class]="item.icon" *ngIf="item.icon"></span>
                                <span class="ui-menuitem-text">{{item.label}}</span>
                            </a>
                            <a *ngIf="item.routerLink" [routerLink]="item.routerLink" [queryParams]="item.queryParams"
                                class="ui-menuitem-link ui-corner-all" [attr.target]="item.target" [ngClass]="{'ui-state-disabled':item.disabled}" (click)="itemClick($event, item)">
                                <span [ngClass]="'ui-menuitem-icon'" [class]="item.icon" *ngIf="item.icon"></span>
                                <span class="ui-menuitem-text">{{item.label}}</span>
                            </a>
                        </li>
                    </ng-template>
                </ul>
            </div>
        </div>
    `,
    animations: [
        trigger('overlayAnimation', [
            state('void', style({
                transform: 'translateY(5%)',
                opacity: 0
            })),
            state('visible', style({
                transform: 'translateY(0)',
                opacity: 1
            })),
            transition('void => visible', animate('{{showTransitionParams}}')),
            transition('visible => void', animate('{{hideTransitionParams}}'))
        ])
    ],
    providers: [DomHandler]
})
export class SplitButton implements OnDestroy {

    @Input() model: MenuItem[];

    @Input() icon: string;

    @Input() iconPos: string = 'left';
        
    @Input() label: string;
    
    @Output() onClick: EventEmitter<any> = new EventEmitter();
    
    @Output() onDropdownClick: EventEmitter<any> = new EventEmitter();
    
    @Input() style: any;
    
    @Input() styleClass: string;
    
    @Input() menuStyle: any;
    
    @Input() menuStyleClass: string;
    
    @Input() disabled: boolean;

    @Input() tabindex: number;
    
    @Input() appendTo: any;
    
    @Input() dir: string;

    @Input() showTransitionOptions: string = '225ms ease-out';

    @Input() hideTransitionOptions: string = '195ms ease-in';

    @ViewChild('container') containerViewChild: ElementRef;
    
    @ViewChild('defaultbtn') buttonViewChild: ElementRef;

    overlay: HTMLDivElement;
                    
    public overlayVisible: boolean = false;
    
    public documentClickListener: any;
    
    public dropdownClick: boolean;
    
    public shown: boolean;

    documentResizeListener: any;

    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2, public router: Router, public cd: ChangeDetectorRef) {}
                
    onDefaultButtonClick(event: Event) {
        this.onClick.emit(event);
    }
    
    itemClick(event: Event, item: MenuItem) {
        if(item.disabled) {
            event.preventDefault();
            return;
        }
        
        if(!item.url) {
            event.preventDefault();
        }
        
        if(item.command) {            
            item.command({
                originalEvent: event,
                item: item
            });
        }
        
        this.overlayVisible = false;
    }
    
    show() {
        this.overlayVisible = !this.overlayVisible;
    }

    onOverlayAnimationStart(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
                this.overlay = event.element;
                this.appendOverlay();
                this.overlay.style.zIndex = String(++DomHandler.zindex);
                this.alignOverlay();
                this.bindDocumentClickListener();
                this.bindDocumentResizeListener();
            break;

            case 'void':
                this.onOverlayHide();
            break;
        }
    }
        
    onDropdownButtonClick(event: Event) {
        this.onDropdownClick.emit(event);
        this.dropdownClick = true;
        this.show();
    }

    alignOverlay() {
        if(this.appendTo)
            this.domHandler.absolutePosition(this.overlay, this.containerViewChild.nativeElement);
        else
            this.domHandler.relativePosition(this.overlay, this.containerViewChild.nativeElement);
    }

    appendOverlay() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlay);
            else
                this.domHandler.appendChild(this.overlay, this.appendTo);

            this.overlay.style.minWidth = this.domHandler.getWidth(this.el.nativeElement.children[0]) + 'px';
        }
    }

    restoreOverlayAppend() {
        if (this.overlay && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    }
    
    bindDocumentClickListener() {
        if(!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', () => {
                if(this.dropdownClick) {
                    this.dropdownClick = false;
                }
                else {
                    this.overlayVisible = false;
                    this.unbindDocumentClickListener();
                    this.cd.markForCheck();
                }
            });
        }
    }
    
    unbindDocumentClickListener() {
        if(this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
    
    bindDocumentResizeListener() {
        this.documentResizeListener = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.documentResizeListener);
    }
    
    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }

    onWindowResize() {
        this.overlayVisible = false;
    }

    onOverlayHide() {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.overlay = null;
    }
         
    ngOnDestroy() {
        this.restoreOverlayAppend();
        this.onOverlayHide();
    }
}

@NgModule({
    imports: [CommonModule,ButtonModule,RouterModule],
    exports: [SplitButton,ButtonModule,RouterModule],
    declarations: [SplitButton]
})
export class SplitButtonModule { }
