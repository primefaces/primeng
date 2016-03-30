import {Component,ElementRef,Input,Output,EventEmitter,Query,QueryList} from 'angular2/core';
import {TabPanel} from './tabpanel';

@Component({
    selector: 'p-tabView',
    template: `
        <div [ngClass]="'ui-tabview ui-widget ui-widget-content ui-corner-all ui-tabview-' + orientation" [attr.style]="style" [attr.class]="styleClass">
            <ul class="ui-tabview-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all">
                <template ngFor #tab [ngForOf]="tabs">
                    <li [attr.class]="getDefaultHeaderClass(tab)" [attr.style]="tab.headerStyle"
                        [ngClass]="{'ui-tabview-selected ui-state-active': tab.selected, 'ui-state-hover': tab.hoverHeader&&!tab.disabled, 'ui-state-disabled': tab.disabled}"
                        (mouseenter)="tab.hoverHeader=true" (mouseleave)="tab.hoverHeader=false" (click)="open($event,tab)" *ngIf="!tab.closed">
                        <a href="#">{{tab.header}}</a><span *ngIf="tab.closable" class="fa fa-close" (click)="close($event,tab)"></span>
                    </li>
                </template>
            </ul>
            <div class="ui-tabview-panels">
                <ng-content></ng-content>
            </div>
        </div>
    `,
})
export class TabView {

    @Input() orientation: string = 'top';
    
    @Input() style: string;
    
    @Input() styleClass: string;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Output() onClose: EventEmitter<any> = new EventEmitter();

    initialized: boolean;
    
    tabs: TabPanel[];

    constructor(private el: ElementRef,@Query(TabPanel) tabPanels: QueryList<TabPanel>) {
        tabPanels.changes.subscribe(_ => {
            this.tabs = tabPanels.toArray();
            let selectedTab: TabPanel = this.findSelectedTab();
            if(!selectedTab && this.tabs.length) {
                this.tabs[0].selected = true;
            }
        });
    }
            
    open(event, tab: TabPanel) {
        if(tab.disabled) {
            event.preventDefault();
            return;
        }
        
        if(!tab.selected) {
            let selectedTab: TabPanel = this.findSelectedTab();
            if(selectedTab) {
                selectedTab.selected = false
            }
            tab.selected = true;
            this.onChange.emit({originalEvent: event, index: this.findTabIndex(tab)});
        }
        event.preventDefault();
    }
    
    close(event, tab: TabPanel) {        
        if(tab.selected) {
            tab.selected = false;
            for(let i = 0; i < this.tabs.length; i++) {
                let tabPanel = this.tabs[i];
                if(!tabPanel.closed&&!tab.disabled) {
                    tabPanel.selected = true;
                    break;
                }
            }
        }
        
        tab.closed = true;
        this.onClose.emit({originalEvent: event, index: this.findTabIndex(tab)});
        event.stopPropagation();
    }
    
    findSelectedTab() {
        for(let i = 0; i < this.tabs.length; i++) {
            if(this.tabs[i].selected) {
                return this.tabs[i];
            }
        }
        return null;
    }
    
    findTabIndex(tab: TabPanel) {
        let index = -1;
        for(let i = 0; i < this.tabs.length; i++) {
            if(this.tabs[i] == tab) {
                index = i;
                break;
            }
        }
        return index;
    }
    
    getDefaultHeaderClass(tab:TabPanel) {
        let styleClass = 'ui-state-default ui-corner-' + this.orientation; 
        if(tab.headerStyleClass) {
            styleClass = styleClass + " " + tab.headerStyleClass;
        }
        return styleClass;
    }
}