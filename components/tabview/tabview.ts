import {NgModule,Component,ElementRef,Input,Output,EventEmitter,HostListener,AfterContentInit,ContentChildren,QueryList,forwardRef,Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlockableUI} from '../common/api';

@Component({
    selector: '[p-tabViewNav]',
    host:{
        '[class.ui-tabview-nav]': 'true',
        '[class.ui-helper-reset]': 'true',
        '[class.ui-helper-clearfix]': 'true',
        '[class.ui-widget-header]': 'true',
        '[class.ui-corner-all]': 'true'
    },
    template: `
        <template ngFor let-tab [ngForOf]="tabs">
            <li [class]="getDefaultHeaderClass(tab)" [ngStyle]="tab.headerStyle" role="tab"
                [ngClass]="{'ui-tabview-selected ui-state-active': tab.selected, 'ui-state-disabled': tab.disabled}"
                (click)="tabView.open($event,tab)" *ngIf="!tab.closed"
                [attr.aria-expanded]="tab.selected" [attr.aria-selected]="tab.selected">
                <a href="#">
                    <span class="ui-tabview-left-icon fa" [ngClass]="tab.leftIcon" *ngIf="tab.leftIcon"></span>
                    <span class="ui-tabview-title">{{tab.header}}</span>
                    <span class="ui-tabview-right-icon fa" [ngClass]="tab.rightIcon" *ngIf="tab.rightIcon"></span>
                </a>
                <span *ngIf="tab.closable" class="ui-tabview-close fa fa-close" (click)="tabView.close($event,tab)"></span>
            </li>
        </template>
    `,
})
export class TabViewNav {

    constructor(@Inject(forwardRef(() => TabView)) public tabView:TabView) {}
    
    @Input() tabs: TabPanel[];

    @Input() orientation: string = 'top';

    getDefaultHeaderClass(tab:TabPanel) {
        let styleClass = 'ui-state-default ui-corner-' + this.orientation; 
        if(tab.headerStyleClass) {
            styleClass = styleClass + " " + tab.headerStyleClass;
        }
        return styleClass;
    }
}

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
        
    public closed: boolean;
}

@Component({
    selector: 'p-tabView',
    template: `
        <div [ngClass]="'ui-tabview ui-widget ui-widget-content ui-corner-all ui-tabview-' + orientation" [ngStyle]="style" [class]="styleClass">
            <ul p-tabViewNav role="tablist" *ngIf="orientation!='bottom'" [tabs]="tabs" [orientation]="orientation"></ul>
            
            <div class="ui-tabview-panels">
                <ng-content></ng-content>
            </div>
            <ul p-tabViewNav role="tablist" *ngIf="orientation=='bottom'" [tabs]="tabs" [orientation]="orientation"></ul>
            
        </div>
    `,
})
export class TabView implements AfterContentInit,BlockableUI {

    @Input() orientation: string = 'top';
    
    @Input() style: any;
    
    @Input() styleClass: string;
    
    @Input() controlClose: boolean;
    
    @ContentChildren(TabPanel) tabPanels: QueryList<TabPanel>;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Output() onClose: EventEmitter<any> = new EventEmitter();
    
    initialized: boolean;
    
    tabs: TabPanel[];

    constructor(public el: ElementRef) {}
    
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
            
    open(event: Event, tab: TabPanel) {
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
    
    close(event: Event, tab: TabPanel) {  
        if(this.controlClose) {
            this.onClose.emit({
                originalEvent: event, 
                index: this.findTabIndex(tab),
                close: () => {
                    this.closeTab(tab);
                }}
            );
        }
        else {
            this.closeTab(tab);
            this.onClose.emit({
                originalEvent: event, 
                index: this.findTabIndex(tab)
            });
        }
        
        event.stopPropagation();
    }
    
    closeTab(tab: TabPanel) {
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
    
    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }
}


@NgModule({
    imports: [CommonModule],
    exports: [TabView,TabPanel,TabViewNav],
    declarations: [TabView,TabPanel,TabViewNav]
})
export class TabViewModule { }