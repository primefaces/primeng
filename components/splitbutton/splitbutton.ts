import {Component,ElementRef,AfterViewInit,Input,Output,EventEmitter,ContentChildren,QueryList} from 'angular2/core';
import {SplitButtonItem} from './splitbuttonitem';

@Component({
    selector: 'p-splitButton',
    template: `
        <div class="ui-splitbutton ui-buttonset ui-widget">
            <button id="btn" type="button" class="ui-button ui-widget ui-state-default ui-corner-left"
                [ngClass]="{'ui-button-text-only':(!icon&&label),'ui-button-icon-only':(icon&&!label),
                'ui-button-text-icon-left':(icon&&label&&iconPos=='left'),'ui-button-text-icon-right':(icon&&label&&iconPos=='right'),
                'ui-state-hover':hoverDefaultBtn,'ui-state-focus':focusDefaultBtn,'ui-state-active':activeDefaultBtn}"
                (mouseenter)="hoverDefaultBtn=true" (mouseleave)="hoverDefaultBtn=false"  (focus)="focusDefaultBtn=true" (blur)="focusDefaultBtn=false"
                (mousedown)="activeDefaultBtn=true" (mouseup)="activeDefaultBtn=false" (click)="onDefaultButtonClick($event)">
                <span [ngClass]="'ui-button-icon-left ui-c fa fa-fw'" [attr.class]="icon"></span>
                <span class="ui-button-text ui-c">{{label}}</span>
            </button>
            <button class="ui-splitbutton-menubutton ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-right" type="button"
                [ngClass]="{'ui-state-hover':hoverDropdown,'ui-state-focus':focusDropdown,'ui-state-active':activeDropdown}"
                (mouseenter)="hoverDropdown=true" (mouseleave)="hoverDropdown=false" (focus)="focusDropdown=true" (blur)="focusDropdown=false"
                (mousedown)="activeDropdown=true" (mouseup)="activeDropdown=false" (click)="menuVisible=!menuVisible">
                <span class="ui-button-icon-left ui-c fa fa-fw fa-caret-down"></span>
                <span class="ui-button-text ui-c">ui-button</span>
            </button>
            <div class="ui-menu ui-menu-dynamic ui-widget ui-widget-content ui-corner-all ui-helper-clearfix ui-shadow" [style.display]="menuVisible ? 'block' : 'none'">
                <ul class="ui-menu-list ui-helper-reset">
                    <li class="ui-menuitem ui-widget ui-corner-all" role="menuitem" *ngFor="#item of items">
                        <a href="#" class="ui-menuitem-link ui-corner-all" (click)="onItemClick($event,item)">
                            <span [ngClass]="'ui-menuitem-icon fa fa-fw'" [attr.class]="item.icon" *ngIf="item.icon"></span>
                            <span class="ui-menuitem-text">{{item.label}}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    ` 
})
export class SplitButton {

    @Input() icon: string;

    @Input() iconPos: string = 'left';
        
    @Input() label: string;
    
    @Output() onClick: EventEmitter<any> = new EventEmitter();
    
    @ContentChildren(SplitButtonItem) items : QueryList<SplitButtonItem>;
    
    private hoverDefaultBtn: boolean;
    
    private focusDefaultBtn: boolean;
    
    private activeDefaultBtn: boolean;
    
    private hoverDropdown: boolean;
    
    private focusDropdown: boolean;
    
    private activeDropdown: boolean;
    
    private menuVisible: boolean = false;

    constructor(private el: ElementRef) {}
    
    onDefaultButtonClick(event) {
        this.onClick.next(event);
    }
    
    onItemClick(event,item: SplitButtonItem) {
        item.onClick.next(event);
        this.menuVisible = false;
        event.preventDefault();
    }
    
}