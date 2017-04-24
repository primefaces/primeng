import {NgModule,Component,ElementRef,OnInit,OnDestroy,Input,Output,EventEmitter,ContentChildren,QueryList,Renderer} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {MenuItem} from '../common/api';
import {ButtonModule} from '../button/button';
import {Router} from '@angular/router';

@Component({
    selector: 'p-splitButton',
    template: `
        <div #container [ngClass]="{'ui-splitbutton ui-buttonset ui-widget':true,'ui-state-disabled':disabled}" [ngStyle]="style" [class]="styleClass">
            <button #defaultbtn type="button" pButton [icon]="icon" [iconPos]="iconPos" [label]="label" cornerStyleClass="ui-corner-left" (click)="onDefaultButtonClick($event)" [disabled]="disabled" [attr.tabindex]="tabindex">
            </button><button type="button" pButton class="ui-splitbutton-menubutton" icon="fa-caret-down" cornerStyleClass="ui-corner-right" (click)="onDropdownClick($event,menu,container)" [disabled]="disabled"></button>
            <div #menu [ngClass]="'ui-menu ui-menu-dynamic ui-widget ui-widget-content ui-corner-all ui-helper-clearfix ui-shadow'" [style.display]="menuVisible ? 'block' : 'none'"
                    [ngStyle]="menuStyle" [class]="menuStyleClass">
                <ul class="ui-menu-list ui-helper-reset">
                    <li class="ui-menuitem ui-widget ui-corner-all" role="menuitem" *ngFor="let item of model">
                        <a [href]="item.url||'#'" 
                        [ngClass]="{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':item.disabled}" 
                        (click)="itemClick($event,item)">
                            <span [ngClass]="'ui-menuitem-icon fa fa-fw'" [class]="item.icon" *ngIf="item.icon"></span>
                            <span class="ui-menuitem-text">{{item.label}}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    `,
    providers: [DomHandler]
})
export class SplitButton implements OnInit,OnDestroy {

    @Input() model: MenuItem[];

    @Input() icon: string;

    @Input() iconPos: string = 'left';
        
    @Input() label: string;
    
    @Output() onClick: EventEmitter<any> = new EventEmitter();
    
    @Input() style: any;
    
    @Input() styleClass: string;
    
    @Input() menuStyle: any;
    
    @Input() menuStyleClass: string;
    
    @Input() disabled: boolean;

    @Input() tabindex: number;
                
    public menuVisible: boolean = false;
    
    public documentClickListener: any;

    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer, public router: Router) {}
    
    ngOnInit() {
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', () => {
            this.menuVisible = false;
        });
    }
    
    onDefaultButtonClick(event: Event) {
        this.onClick.emit(event);
    }
    
    itemClick(event: Event, item: MenuItem) {
        if(item.disabled) {
            event.preventDefault();
            return;
        }
        
        if(!item.url||item.routerLink) {
            event.preventDefault();
        }
        
        if(item.command) {
            if(!item.eventEmitter) {
                item.eventEmitter = new EventEmitter();
                item.eventEmitter.subscribe(item.command);
            }
            
            item.eventEmitter.emit(event);
        }
        
        this.menuVisible = false;
        
        if(item.routerLink) {
            this.router.navigate(item.routerLink);
        }
    }
    
    onDropdownClick(event: Event, menu: HTMLDivElement, container: Element) {
        this.menuVisible= !this.menuVisible;
        this.domHandler.relativePosition(menu, container);
        this.domHandler.fadeIn(menu,25);
        menu.style.zIndex = String(++DomHandler.zindex);
        event.stopPropagation();
    }
        
    ngOnDestroy() {
        if(this.documentClickListener) {
            this.documentClickListener();
        }
    }
}

@NgModule({
    imports: [CommonModule,ButtonModule],
    exports: [SplitButton,ButtonModule],
    declarations: [SplitButton]
})
export class SplitButtonModule { }
