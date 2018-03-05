import {NgModule,Component,ElementRef,AfterViewInit,AfterViewChecked,OnDestroy,Input,Output,ContentChildren,EventEmitter,QueryList,Renderer2,ChangeDetectorRef,ViewChild} from '@angular/core';
import {trigger,state,style,transition,animate} from '@angular/animations';
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
            </button><button type="button" pButton class="ui-splitbutton-menubutton" icon="fa-caret-down" [cornerStyleClass]="dir === 'rtl' ? 'ui-corner-left': 'ui-corner-right'" (click)="onDropdownButtonClick($event)" [disabled]="disabled"></button>
            <div #overlay [ngClass]="'ui-menu ui-menu-dynamic ui-widget ui-widget-content ui-corner-all ui-helper-clearfix ui-shadow'" [style.display]="menuVisible ? 'block' : 'none'"
                    [ngStyle]="menuStyle" [class]="menuStyleClass" [@overlayState]="menuVisible ? 'visible' : 'hidden'">
                <ul class="ui-menu-list ui-helper-reset">
                    <ng-template ngFor let-item [ngForOf]="model">
                        <li class="ui-menuitem ui-widget ui-corner-all" role="menuitem" *ngIf="item.visible !== false">
                            <a *ngIf="!item.routerLink" [href]="item.url||'#'" class="ui-menuitem-link ui-corner-all" [attr.target]="item.target"
                                [ngClass]="{'ui-state-disabled':item.disabled}" (click)="itemClick($event, item)">
                                <span [ngClass]="'ui-menuitem-icon fa fa-fw'" [class]="item.icon" *ngIf="item.icon"></span>
                                <span class="ui-menuitem-text">{{item.label}}</span>
                            </a>
                            <a *ngIf="item.routerLink" [routerLink]="item.routerLink" [queryParams]="item.queryParams"
                                class="ui-menuitem-link ui-corner-all" [attr.target]="item.target" [ngClass]="{'ui-state-disabled':item.disabled}" (click)="itemClick($event, item)">
                                <span [ngClass]="'ui-menuitem-icon fa fa-fw'" [class]="item.icon" *ngIf="item.icon"></span>
                                <span class="ui-menuitem-text">{{item.label}}</span>
                            </a>
                        </li>
                    </ng-template>
                </ul>
            </div>
        </div>
    `,
    animations: [
        trigger('overlayState', [
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
export class SplitButton implements AfterViewInit,AfterViewChecked,OnDestroy {

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

    @ViewChild('container') containerViewChild: ElementRef;
    
    @ViewChild('defaultbtn') buttonViewChild: ElementRef;
    
    @ViewChild('overlay') overlayViewChild: ElementRef;
                
    public menuVisible: boolean = false;
    
    public documentClickListener: any;
    
    public dropdownClick: boolean;
    
    public shown: boolean;

    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2, public router: Router, public cd: ChangeDetectorRef) {}
        
    ngAfterViewInit() {
        if(this.appendTo) {
            if(this.appendTo === 'body')
                document.body.appendChild(this.overlayViewChild.nativeElement);
            else
                this.domHandler.appendChild(this.overlayViewChild.nativeElement, this.appendTo);
        }
    }
    
    ngAfterViewChecked() {
        if(this.shown) {
            this.onShow();
            this.shown = false;
        }
    }
    
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
        
        this.menuVisible = false;
    }
    
    show() {
        this.shown = true;
        this.menuVisible= !this.menuVisible;
        this.alignPanel(); 
        this.overlayViewChild.nativeElement.style.zIndex = String(++DomHandler.zindex);
    }
    
    onShow() {
        this.alignPanel();
        this.bindDocumentClickListener();
    }
    
    onDropdownButtonClick(event: Event) {
        this.onDropdownClick.emit(event);
        this.dropdownClick = true;
        this.show();
    }
    
    alignPanel() {
        if(this.appendTo)
            this.domHandler.absolutePosition(this.overlayViewChild.nativeElement, this.containerViewChild.nativeElement);
        else
            this.domHandler.relativePosition(this.overlayViewChild.nativeElement, this.containerViewChild.nativeElement);
    }
    
    bindDocumentClickListener() {
        if(!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', () => {
                if(this.dropdownClick) {
                    this.dropdownClick = false;
                }
                else {
                    this.menuVisible = false;
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
         
    ngOnDestroy() {
        this.unbindDocumentClickListener();
    }
}

@NgModule({
    imports: [CommonModule,ButtonModule,RouterModule],
    exports: [SplitButton,ButtonModule,RouterModule],
    declarations: [SplitButton]
})
export class SplitButtonModule { }
