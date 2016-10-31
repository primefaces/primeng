import {NgModule,Component,ElementRef,OnInit,OnDestroy,Input,Output,EventEmitter,ContentChildren,QueryList,Renderer} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {MenuItem} from '../common/api';
import {Router} from '@angular/router';

@Component({
    selector: 'p-splitButton',
    template: `
        <div #container [ngClass]="{'ui-splitbutton ui-buttonset ui-widget':true,'ui-state-disabled':disabled}" [ngStyle]="style" [class]="styleClass">
            <button #defaultbtn type="button" class="ui-button ui-widget ui-state-default ui-corner-left"
                [ngClass]="{'ui-button-text-only':(!icon&&label),'ui-button-icon-only':(icon&&!label),
                'ui-button-text-icon-left':(icon&&label&&iconPos=='left'),'ui-button-text-icon-right':(icon&&label&&iconPos=='right'),
                'ui-state-hover':hoverDefaultBtn&&!disabled,'ui-state-focus':focusDefaultBtn&&!disabled,'ui-state-active':activeDefaultBtn&&!disabled}"
                (mouseenter)="hoverDefaultBtn=true" (mouseleave)="hoverDefaultBtn=false" (focus)="focusDefaultBtn=true" (blur)="focusDefaultBtn=false"
                (mousedown)="activeDefaultBtn=true" (mouseup)="activeDefaultBtn=false" (click)="onDefaultButtonClick($event)"
                [disabled]="disabled">
                <span [ngClass]="'ui-button-icon-left ui-c fa fa-fw'" [class]="icon"></span>
                <span class="ui-button-text ui-c">{{label}}</span>
            </button>
            <button class="ui-splitbutton-menubutton ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-right" type="button"
                [ngClass]="{'ui-state-hover':hoverDropdown&&!disabled,'ui-state-focus':focusDropdown&&!disabled,'ui-state-active':activeDropdown&&!disabled}"
                (mouseenter)="hoverDropdown=true" (mouseleave)="hoverDropdown=false" (focus)="focusDropdown=true" (blur)="focusDropdown=false"
                (mousedown)="activeDropdown=true" (mouseup)="activeDropdown=false" (click)="onDropdownClick($event,menu,container)"
                [disabled]="disabled">
                <span class="ui-button-icon-left ui-c fa fa-fw fa-caret-down"></span>
                <span class="ui-button-text ui-c">ui-button</span>
            </button>
            <div #menu [ngClass]="'ui-menu ui-menu-dynamic ui-widget ui-widget-content ui-corner-all ui-helper-clearfix ui-shadow'" [style.display]="menuVisible ? 'block' : 'none'"
                    [ngStyle]="menuStyle" [class]="menuStyleClass">
                <ul class="ui-menu-list ui-helper-reset">
                    <li class="ui-menuitem ui-widget ui-corner-all" role="menuitem" *ngFor="let item of model"
                        (mouseenter)="hoveredItem=item" (mouseleave)="hoveredItem=null">
                        <a [href]="item.url||'#'" 
                        [ngClass]="{'ui-menuitem-link ui-corner-all':true,'ui-state-hover':(hoveredItem==item&&!item.disabled),'ui-state-disabled':item.disabled}" 
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
        
    public hoverDefaultBtn: boolean;
    
    public focusDefaultBtn: boolean;
    
    public activeDefaultBtn: boolean;
    
    public hoverDropdown: boolean;
    
    public focusDropdown: boolean;
    
    public activeDropdown: boolean;
    
    public hoveredItem: any;
    
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
    
    onDropdownClick(event: Event, menu: Element, container: Element) {
        this.menuVisible= !this.menuVisible;
        this.domHandler.relativePosition(menu, container);
        this.domHandler.fadeIn(menu,25);
        event.stopPropagation();
    }
        
    ngOnDestroy() {
        this.documentClickListener();
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [SplitButton],
    declarations: [SplitButton]
})
export class SplitButtonModule { }