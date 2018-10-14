import {NgModule,Component,ElementRef,OnDestroy,Input,Output,EventEmitter,HostListener,AfterContentInit,
        ContentChildren,ContentChild,QueryList,TemplateRef,EmbeddedViewRef,ViewContainerRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TooltipModule} from '../tooltip/tooltip';
import {SharedModule,PrimeTemplate} from '../common/shared';
import {BlockableUI} from '../common/blockableui';

let idx: number = 0;

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
        <ng-template ngFor let-tab [ngForOf]="tabs">
            <li [class]="getDefaultHeaderClass(tab)" [ngStyle]="tab.headerStyle" role="presentation"
                [ngClass]="{'ui-tabview-selected ui-state-active': tab.selected, 'ui-state-disabled': tab.disabled}"
                (click)="clickTab($event,tab)" *ngIf="!tab.closed" tabindex="0" (keydown.enter)="clickTab($event,tab)">
                <a [attr.id]="tab.id + '-label'" role="tab" [attr.aria-selected]="tab.selected" [attr.aria-controls]="tab.id" [pTooltip]="tab.tooltip" [tooltipPosition]="orientation">
                    <ng-container *ngIf="!tab.headerTemplate" >
                        <span class="ui-tabview-left-icon" [ngClass]="tab.leftIcon" *ngIf="tab.leftIcon"></span>
                        <span class="ui-tabview-title">{{tab.header}}</span>
                        <span class="ui-tabview-right-icon" [ngClass]="tab.rightIcon" *ngIf="tab.rightIcon"></span>
                    </ng-container>
                    <ng-container *ngIf="tab.headerTemplate">
                        <ng-container *ngTemplateOutlet="tab.headerTemplate"></ng-container>
                    </ng-container>
                </a>
                <span *ngIf="tab.closable" class="ui-tabview-close pi pi-times" (click)="clickClose($event,tab)"></span>
            </li>
        </ng-template>
    `,
})
export class TabViewNav {
    
    @Input() tabs: TabPanel[];

    @Input() orientation: string = 'top';
    
    @Output() onTabClick: EventEmitter<any> = new EventEmitter();
    
    @Output() onTabCloseClick: EventEmitter<any> = new EventEmitter();
    
    getDefaultHeaderClass(tab:TabPanel) {
        let styleClass = 'ui-state-default ui-corner-' + this.orientation;
        if(tab.headerStyleClass) {
            styleClass = styleClass + " " + tab.headerStyleClass;
        }
        return styleClass;
    }
    
    clickTab(event, tab: TabPanel) {
        this.onTabClick.emit({
            originalEvent: event,
            tab: tab
        })
    }
    
    clickClose(event, tab: TabPanel) {
        this.onTabCloseClick.emit({
            originalEvent: event,
            tab: tab
        })
    }
}

@Component({
    selector: 'p-tabPanel',
    template: `
        <div [attr.id]="id" class="ui-tabview-panel ui-widget-content" [ngClass]="{'ui-helper-hidden': !selected}"
            role="tabpanel" [attr.aria-hidden]="!selected" [attr.aria-labelledby]="id + '-label'" *ngIf="!closed">
            <ng-content></ng-content>
            <ng-container *ngIf="contentTemplate && (cache ? loaded : selected)">
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            </ng-container>
        </div>
    `
})
export class TabPanel implements AfterContentInit,OnDestroy {

    @Input() header: string;
    
    @Input() disabled: boolean;
    
    @Input() closable: boolean;
    
    @Input() headerStyle: any;
    
    @Input() headerStyleClass: string;
    
    @Input() leftIcon: string;
    
    @Input() rightIcon: string;
    
    @Input() cache: boolean = true;

    @Input() tooltip: any;
    
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;
    
    constructor(public viewContainer: ViewContainerRef) {}
    
    closed: boolean;
    
    view: EmbeddedViewRef<any>;
    
    _selected: boolean;
    
    loaded: boolean;
    
    id: string = `ui-tabpanel-${idx++}`;
    
    contentTemplate: TemplateRef<any>;

    headerTemplate: TemplateRef<any>;
    
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                break;

                case 'content':
                    this.contentTemplate = item.template;
                break;
                
                default:
                    this.contentTemplate = item.template;
                break;
            }
        });
    }
    
    @Input() get selected(): boolean {
        return this._selected;
    }

    set selected(val: boolean) {
        this._selected = val;
        this.loaded = true;
    }
    
    ngOnDestroy() {
        this.view = null;
    }
}

@Component({
    selector: 'p-tabView',
    template: `
        <div [ngClass]="'ui-tabview ui-widget ui-widget-content ui-corner-all ui-tabview-' + orientation" [ngStyle]="style" [class]="styleClass">
            <ul p-tabViewNav role="tablist" *ngIf="orientation!='bottom'" [tabs]="tabs" [orientation]="orientation"
                (onTabClick)="open($event.originalEvent, $event.tab)" (onTabCloseClick)="close($event.originalEvent, $event.tab)"></ul>
            <div class="ui-tabview-panels">
                <ng-content></ng-content>
            </div>
            <ul p-tabViewNav role="tablist" *ngIf="orientation=='bottom'" [tabs]="tabs" [orientation]="orientation"
                (onTabClick)="open($event.originalEvent, $event.tab)" (onTabCloseClick)="close($event.originalEvent, $event.tab)"></ul>
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

    @Output() activeIndexChange: EventEmitter<number> = new EventEmitter();
    
    initialized: boolean;
    
    tabs: TabPanel[];
    
    _activeIndex: number;
    
    preventActiveIndexPropagation: boolean;

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
            if(this.activeIndex != null && this.tabs.length > this.activeIndex)
                this.tabs[this.activeIndex].selected = true;
            else
                this.tabs[0].selected = true;
        }
    }
    
    open(event: Event, tab: TabPanel) {
        if(tab.disabled) {
            if(event) {
                event.preventDefault();
            }
            return;
        }
        
        if(!tab.selected) {
            let selectedTab: TabPanel = this.findSelectedTab();
            if(selectedTab) {
                selectedTab.selected = false
            }
            
            tab.selected = true;
            let selectedTabIndex = this.findTabIndex(tab);
            this.preventActiveIndexPropagation = true;
            this.activeIndexChange.emit(selectedTabIndex);
            this.onChange.emit({originalEvent: event, index: selectedTabIndex});
        }
        
        if(event) {
            event.preventDefault();
        }
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
        if(tab.disabled) {
            return;
        }
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
    
    @Input() get activeIndex(): number {
        return this._activeIndex;
    }

    set activeIndex(val:number) {
        this._activeIndex = val;
        if(this.preventActiveIndexPropagation) {
            this.preventActiveIndexPropagation = false;
            return;
        }

        if(this.tabs && this.tabs.length && this._activeIndex != null && this.tabs.length > this._activeIndex) {
            this.findSelectedTab().selected = false;
            this.tabs[this._activeIndex].selected = true;
        }
    }
}


@NgModule({
    imports: [CommonModule,SharedModule,TooltipModule],
    exports: [TabView,TabPanel,TabViewNav,SharedModule],
    declarations: [TabView,TabPanel,TabViewNav]
})
export class TabViewModule { }
