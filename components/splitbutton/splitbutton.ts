import {NgModule,Component,ElementRef,OnInit,OnDestroy,Input,Output,EventEmitter,ContentChildren,QueryList,Renderer} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {Router,ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    selector: 'p-splitButtonItem',
    template: `` 
})
export class SplitButtonItem {

    @Input() icon: string;
        
    @Input() label: string;
    
    @Input() url: string;
    
    @Input() routerLink: any;
    
    @Output() onClick: EventEmitter<any> = new EventEmitter();
            
}

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
                    <li class="ui-menuitem ui-widget ui-corner-all" role="menuitem" *ngFor="let item of items"
                        (mouseenter)="hoveredItem=item" (mouseleave)="hoveredItem=null">
                        <a [href]="item.url||'#'" class="ui-menuitem-link ui-corner-all" (click)="onItemClick($event,item)" [ngClass]="{'ui-state-hover':(hoveredItem==item)}">
                            <span [ngClass]="'ui-menuitem-icon fa fa-fw'" [class]="item.icon" *ngIf="item.icon"></span>
                            <span class="ui-menuitem-text">{{item.label}}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    `,
    providers: [DomHandler],
    directives: [ROUTER_DIRECTIVES]
})
export class SplitButton implements OnInit,OnDestroy {

    @Input() icon: string;

    @Input() iconPos: string = 'left';
        
    @Input() label: string;
    
    @Output() onClick: EventEmitter<any> = new EventEmitter();
    
    @Input() style: any;
    
    @Input() styleClass: string;
    
    @Input() menuStyle: any;
    
    @Input() menuStyleClass: string;
    
    @ContentChildren(SplitButtonItem) items : QueryList<SplitButtonItem>;
    
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
    
    onDropdownClick(event, menu, container) {
        this.menuVisible= !this.menuVisible;
        this.domHandler.relativePosition(menu, container);
        this.domHandler.fadeIn(menu,25);
        event.stopPropagation();
    }
    
    onItemClick(event,item: SplitButtonItem) {
        if(!item.url&&!item.routerLink) {
            event.preventDefault();
        }
        
        this.hoveredItem = null;
        
        item.onClick.emit(event);
        
        if(item.routerLink) {
            this.router.navigate(item.routerLink);
        }         
    }
    
    ngOnDestroy() {
        this.documentClickListener();
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [SplitButton,SplitButtonItem],
    declarations: [SplitButton,SplitButtonItem]
})
export class SplitButtonModule { }