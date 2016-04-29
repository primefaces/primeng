import {Component,ElementRef,OnInit,OnDestroy,Input,Output,EventEmitter,ContentChildren,QueryList,Renderer} from 'angular2/core';
import {SplitButtonItem} from './splitbuttonitem';
import {DomHandler} from '../dom/domhandler';
import {Router,RouteConfig,ROUTER_DIRECTIVES} from 'angular2/router';
import {Location} from 'angular2/platform/common';

@Component({
    selector: 'p-splitButton',
    template: `
        <div [ngClass]="'ui-splitbutton ui-buttonset ui-widget'" [attr.style]="style" [attr.styleClass]="styleClass">
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
                (mousedown)="activeDropdown=true" (mouseup)="activeDropdown=false" (click)="onDropdownClick($event,menu,defaultbtn)">
                <span class="ui-button-icon-left ui-c fa fa-fw fa-caret-down"></span>
                <span class="ui-button-text ui-c">ui-button</span>
            </button>
            <div #menu [ngClass]="'ui-menu ui-menu-dynamic ui-widget ui-widget-content ui-corner-all ui-helper-clearfix ui-shadow'" [style.display]="menuVisible ? 'block' : 'none'"
                    [attr.style]="menuStyle" [attr.styleClass]="menuStyleClass">
                <ul class="ui-menu-list ui-helper-reset">
                    <li class="ui-menuitem ui-widget ui-corner-all" role="menuitem" *ngFor="let item of items" [ngClass]="{'ui-state-hover':(hoveredItem==item)}"
                        (mouseenter)="hoveredItem=item" (mouseleave)="hoveredItem=null">
                        <a [href]="getItemUrl(item)" class="ui-menuitem-link ui-corner-all" (click)="onItemClick($event,item)">
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
    
    @Input() style: string;
    
    @Input() styleClass: string;
    
    @Input() menuStyle: string;
    
    @Input() menuStyleClass: string;
    
    @ContentChildren(SplitButtonItem) items : QueryList<SplitButtonItem>;
    
    private hoverDefaultBtn: boolean;
    
    private focusDefaultBtn: boolean;
    
    private activeDefaultBtn: boolean;
    
    private hoverDropdown: boolean;
    
    private focusDropdown: boolean;
    
    private activeDropdown: boolean;
    
    private hoveredItem: any;
    
    private menuVisible: boolean = false;
    
    private documentClickListener: any;

    constructor(private el: ElementRef, private domHandler: DomHandler, private renderer: Renderer, private router: Router, private location: Location) {}
    
    ngOnInit() {
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', () => {
            this.menuVisible = false;
        });
    }
    
    onDefaultButtonClick(event) {
        this.onClick.emit(event);
    }
    
    onDropdownClick(event, menu, defaultbtn) {
        this.menuVisible= !this.menuVisible;
        this.domHandler.relativePosition(menu, defaultbtn);
        this.domHandler.fadeIn(menu,25);
        event.stopPropagation();
    }
    
    onItemClick(event,item: SplitButtonItem) {
        item.onClick.emit(event);
        this.hoveredItem = null;
        
        if(!item.url) {
            event.preventDefault();
        }          
    }
    
    getItemUrl(item: SplitButtonItem): string {
        if(item.url) {
            if(Array.isArray(item.url))
                return this.location.prepareExternalUrl(this.router.generate(item.url).toLinkUrl());
            else
                return item.url;
        }
        else {
            return '#';
        }
    }
    
    ngOnDestroy() {
        this.documentClickListener();
    }
}