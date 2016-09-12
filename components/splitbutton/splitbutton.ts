import {NgModule,Component,ElementRef,OnInit,OnDestroy,Input,Output,EventEmitter,ContentChildren,QueryList,Renderer} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {MenuItem} from '../common/api';
import {Router} from '@angular/router';

@Component({
    selector: 'p-splitButton',
    template: `
        <div #container [ngClass]="'ui-splitbutton ui-buttonset ui-widget'" [ngStyle]="style" [class]="styleClass">
            <button #defaultbtn type="button" class="ui-button ui-widget ui-state-default ui-corner-left"
                [ngClass]="{'ui-button-text-only':(!icon&&label),'ui-button-icon-only':(icon&&!label),
                'ui-button-text-icon-left':(icon&&label&&iconPos=='left'),'ui-button-text-icon-right':(icon&&label&&iconPos=='right'),
                'ui-state-hover':hoverDefaultBtn,'ui-state-focus':focusDefaultBtn,'ui-state-active':activeDefaultBtn}"
                (mouseenter)="hoverDefaultBtn=true" (mouseleave)="hoverDefaultBtn=false"  (focus)="focusDefaultBtn=true" (blur)="focusDefaultBtn=false"
                (mousedown)="activeDefaultBtn=true" (mouseup)="activeDefaultBtn=false" (click)="onDefaultButtonClick($event)">
                <span [ngClass]="'ui-button-icon-left ui-c fa fa-fw'" [class]="icon"></span>
                <span class="ui-button-text ui-c">{{label}}</span>
            </button>
            <button class="ui-splitbutton-menubutton ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-right" type="button"
                [ngClass]="{'ui-state-hover':hoverDropdown,'ui-state-focus':focusDropdown,'ui-state-active':activeDropdown}"
                (mouseenter)="hoverDropdown=true" (mouseleave)="hoverDropdown=false" (focus)="focusDropdown=true" (blur)="focusDropdown=false"
                (mousedown)="activeDropdown=true" (mouseup)="activeDropdown=false" (click)="onDropdownClick($event,menu,container)">
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
        
    protected hoverDefaultBtn: boolean;
    
    protected focusDefaultBtn: boolean;
    
    protected activeDefaultBtn: boolean;
    
    protected hoverDropdown: boolean;
    
    protected focusDropdown: boolean;
    
    protected activeDropdown: boolean;
    
    protected hoveredItem: any;
    
    protected menuVisible: boolean = false;
    
    protected documentClickListener: any;

    constructor(protected el: ElementRef, protected domHandler: DomHandler, protected renderer: Renderer, protected router: Router) {}
    
    ngOnInit() {
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', () => {
            this.menuVisible = false;
        });
    }
    
    onDefaultButtonClick(event) {
        this.onClick.emit(event);
    }
    
    itemClick(event, item: MenuItem) {
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
    
    onDropdownClick(event, menu, container) {
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