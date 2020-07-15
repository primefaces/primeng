import {NgModule,Component,ElementRef,OnDestroy,Input,Output,EventEmitter,AfterContentInit,
        ContentChildren,QueryList,TemplateRef,EmbeddedViewRef,ViewContainerRef,ChangeDetectorRef,ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TooltipModule} from 'primeng/tooltip';
import {SharedModule,PrimeTemplate} from 'primeng/api';
import {BlockableUI} from 'primeng/api';

let idx: number = 0;

@Component({
    selector: 'p-tabPanel',
    template: `
        <div [attr.id]="id" class="p-tabview-panel" [hidden]="!selected"
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
    
    @Input() tooltipPosition: string = 'top';

    @Input() tooltipPositionStyle: string = 'absolute';

    @Input() tooltipStyleClass: string;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;
    
    constructor(public viewContainer: ViewContainerRef, private cd: ChangeDetectorRef) {}
    
    closed: boolean;
    
    view: EmbeddedViewRef<any>;
    
    _selected: boolean;
    
    loaded: boolean;
    
    id: string = `p-tabpanel-${idx++}`;
    
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
        
        if (!this.loaded) {
            this.cd.detectChanges();
        }

        this.loaded = true;
    }
    
    ngOnDestroy() {
        this.view = null;
    }
}

@Component({
    selector: 'p-tabView',
    template: `
        <div [ngClass]="'p-tabview p-component'" [ngStyle]="style" [class]="styleClass">
            <ul class="p-tabview-nav" role="tablist">
                <ng-template ngFor let-tab [ngForOf]="tabs">
                    <li role="presentation" [ngClass]="{'p-highlight': tab.selected, 'p-disabled': tab.disabled}" [ngStyle]="tab.headerStyle" [class]="tab.headerStyleClass" *ngIf="!tab.closed">
                        <a role="tab" class="p-tabview-nav-link" [attr.id]="tab.id + '-label'" [attr.aria-selected]="tab.selected" [attr.aria-controls]="tab.id" [pTooltip]="tab.tooltip" [tooltipPosition]="tab.tooltipPosition"
                            [attr.aria-selected]="tab.selected" [positionStyle]="tab.tooltipPositionStyle" [tooltipStyleClass]="tab.tooltipStyleClass"
                            (click)="open($event,tab)" (keydown.enter)="open($event,tab)">
                            <ng-container *ngIf="!tab.headerTemplate">
                                <span class="p-tabview-left-icon" [ngClass]="tab.leftIcon" *ngIf="tab.leftIcon"></span>
                                <span class="p-tabview-title">{{tab.header}}</span>
                                <span class="p-tabview-right-icon" [ngClass]="tab.rightIcon" *ngIf="tab.rightIcon"></span>
                            </ng-container>
                            <ng-container *ngIf="tab.headerTemplate">
                                <ng-container *ngTemplateOutlet="tab.headerTemplate"></ng-container>
                            </ng-container>
                        </a>
                        <span *ngIf="tab.closable" class="p-tabview-close pi pi-times" (click)="close($event,tab)"></span>
                    </li>
                    </ng-template>
                <li ref="inkbar" class="p-tabview-ink-bar"></li>
            </ul>
            <div class="p-tabview-panels">
                <ng-content></ng-content>
            </div>
        </div>
    `,
   changeDetection: ChangeDetectionStrategy.OnPush,
   encapsulation: ViewEncapsulation.None,
   styleUrls: ['./tabview.css']
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
        if (!selectedTab && this.tabs.length) {
            if (this.activeIndex != null && this.tabs.length > this.activeIndex)
                this.tabs[this.activeIndex].selected = true;
            else
                this.tabs[0].selected = true;
        }
    }
    
    open(event: Event, tab: TabPanel) {
        if (tab.disabled) {
            if (event) {
                event.preventDefault();
            }
            return;
        }
        
        if (!tab.selected) {
            let selectedTab: TabPanel = this.findSelectedTab();
            if (selectedTab) {
                selectedTab.selected = false
            }
            
            tab.selected = true;
            let selectedTabIndex = this.findTabIndex(tab);
            this.preventActiveIndexPropagation = true;
            this.activeIndexChange.emit(selectedTabIndex);
            this.onChange.emit({originalEvent: event, index: selectedTabIndex});
        }
        
        if (event) {
            event.preventDefault();
        }
    }
    
    close(event: Event, tab: TabPanel) {
        if (this.controlClose) {
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
        if (tab.disabled) {
            return;
        }
        if (tab.selected) {
            tab.selected = false;
            for(let i = 0; i < this.tabs.length; i++) {
                let tabPanel = this.tabs[i];
                if (!tabPanel.closed&&!tab.disabled) {
                    tabPanel.selected = true;
                    break;
                }
            }
        }
        
        tab.closed = true;
    }
    
    findSelectedTab() {
        for(let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].selected) {
                return this.tabs[i];
            }
        }
        return null;
    }
    
    findTabIndex(tab: TabPanel) {
        let index = -1;
        for(let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i] == tab) {
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
        if (this.preventActiveIndexPropagation) {
            this.preventActiveIndexPropagation = false;
            return;
        }

        if (this.tabs && this.tabs.length && this._activeIndex != null && this.tabs.length > this._activeIndex) {
            this.findSelectedTab().selected = false;
            this.tabs[this._activeIndex].selected = true;
        }
    }
}


@NgModule({
    imports: [CommonModule,SharedModule,TooltipModule],
    exports: [TabView,TabPanel,SharedModule],
    declarations: [TabView,TabPanel]
})
export class TabViewModule { }
