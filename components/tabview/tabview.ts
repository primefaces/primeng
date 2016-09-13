import {NgModule,Component,ElementRef,Input,Output,EventEmitter,AfterContentInit,ContentChildren,QueryList} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'p-tabPanel',
    template: `
        <div class="ui-tabview-panel ui-widget-content" [style.display]="selected ? 'block' : 'none'" 
            *ngIf="!closed" role="tabpanel" [attr.aria-hidden]="!selected">
            <ng-content></ng-content>
        </div>
    `,
})
export class TabPanel {

    @Input() header: string;

    @Input() selected: boolean;
    
    @Input() disabled: boolean;
    
    @Input() closable: boolean;
    
    @Input() headerStyle: any;
    
    @Input() headerStyleClass: string;
    
    @Input() leftIcon: string;
    
    @Input() rightIcon: string;
    
    public hoverHeader: boolean;
    
    public closed: boolean;
}

@Component({
    selector: 'p-tabView',
    template: `
        <div [ngClass]="'ui-tabview ui-widget ui-widget-content ui-corner-all ui-tabview-' + orientation" [ngStyle]="style" [class]="styleClass">
            <ul class="ui-tabview-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" role="tablist">
                <template ngFor let-tab [ngForOf]="tabs">
                    <li [class]="getDefaultHeaderClass(tab)" [ngStyle]="tab.headerStyle" role="tab"
                        [ngClass]="{'ui-tabview-selected ui-state-active': tab.selected, 'ui-state-hover': tab.hoverHeader&&!tab.disabled, 'ui-state-disabled': tab.disabled}"
                        (mouseenter)="tab.hoverHeader=true" (mouseleave)="tab.hoverHeader=false" (click)="open($event,tab)" *ngIf="!tab.closed"
                        [attr.aria-expanded]="tab.selected" [attr.aria-selected]="tab.selected">
                        <a href="#" (keydown)="onHeaderKeyDown($event,tab)">
                            <span class="ui-tabview-left-icon fa" [ngClass]="tab.leftIcon" *ngIf="tab.leftIcon"></span>
                            {{tab.header}}
                            <span class="ui-tabview-right-icon fa" [ngClass]="tab.rightIcon" *ngIf="tab.rightIcon"></span>
                        </a>
                        <span *ngIf="tab.closable" class="ui-tabview-close fa fa-close" (click)="close($event,tab)"></span>
                    </li>
                </template>
            </ul>
            <div class="ui-tabview-panels">
                <ng-content></ng-content>
            </div>
        </div>
    `,
})
export class TabView implements AfterContentInit {

    @Input() orientation: string = 'top';
    
    @Input() style: any;
    
    @Input() styleClass: string;
    
    @ContentChildren(TabPanel) tabPanels: QueryList<TabPanel>;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Output() onClose: EventEmitter<any> = new EventEmitter();

    initialized: boolean;
    
    tabs: TabPanel[];

    constructor(protected el: ElementRef) {}
    
    ngAfterContentInit() {
        this.initTabs();
        
        this.tabPanels.changes.subscribe(_ => {
            this.initTabs();
        });
    }
    
    initTabs(): void {
        this.tabs = this.tabPanels.toArray();
        let selectedTab: TabPanel = this.findSelectedTab();
        if(!selectedTab && this.tabs.length) {
            this.tabs[0].selected = true;
        }
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
    
    onHeaderKeyDown(event, tab: TabPanel) {
        if(event.keyCode == 13 || event.keyCode == 32) {
            this.open(event, tab);
            event.preventDefault();
        }
    }
}


@NgModule({
    imports: [CommonModule],
    exports: [TabView,TabPanel],
    declarations: [TabView,TabPanel]
})
export class TabViewModule { }