import {NgModule,Component,ElementRef,OnDestroy,Input,Output,EventEmitter,AfterContentInit,
        ContentChildren,QueryList,TemplateRef,EmbeddedViewRef,ViewContainerRef,ChangeDetectorRef,ChangeDetectionStrategy, ViewEncapsulation, ViewChild, AfterViewChecked, forwardRef, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TooltipModule} from 'primeng/tooltip';
import {RippleModule} from 'primeng/ripple';
import {SharedModule,PrimeTemplate} from 'primeng/api';
import {BlockableUI} from 'primeng/api';
import {DomHandler} from 'primeng/dom';

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
    `,
    host: {
        'class': 'p-element'
    }
})
export class TabPanel implements AfterContentInit,OnDestroy {

    @Input() closable: boolean;

    @Input() headerStyle: any;

    @Input() headerStyleClass: string;

    @Input() cache: boolean = true;

    @Input() tooltip: any;

    @Input() tooltipPosition: string = 'top';

    @Input() tooltipPositionStyle: string = 'absolute';

    @Input() tooltipStyleClass: string;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    closed: boolean;

    view: EmbeddedViewRef<any>;

    _selected: boolean;

    _disabled: boolean;

    _header: string;

    _leftIcon: string;

    _rightIcon: string;

    loaded: boolean;

    id: string = `p-tabpanel-${idx++}`;

    contentTemplate: TemplateRef<any>;

    headerTemplate: TemplateRef<any>;

    tabView: TabView;

    constructor(@Inject(forwardRef(() => TabView)) tabView, public viewContainer: ViewContainerRef, public cd: ChangeDetectorRef) {
        this.tabView = tabView as TabView;
    }

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

        if (val)
            this.loaded = true;
    }

    @Input() get disabled(): boolean {
        return this._disabled;
    };

    set disabled(disabled: boolean) {
        this._disabled = disabled;
        this.tabView.cd.markForCheck();
    }

    @Input() get header(): string {
        return this._header;
    }

    set header(header: string) {
        this._header = header;
        this.tabView.cd.markForCheck();
    }

    @Input() get leftIcon(): string {
        return this._leftIcon;
    }

    set leftIcon(leftIcon :string) {
        this._leftIcon = leftIcon;
        this.tabView.cd.markForCheck();
    }

    @Input() get rightIcon(): string {
        return this._rightIcon;
    }

    set rightIcon(rightIcon :string) {
        this._rightIcon = rightIcon;
        this.tabView.cd.markForCheck();
    }

    ngOnDestroy() {
        this.view = null;
    }
}

@Component({
    selector: 'p-tabView',
    template: `
        <div [ngClass]="{'p-tabview p-component': true, 'p-tabview-scrollable': scrollable}" [ngStyle]="style" [class]="styleClass">
            <div class="p-tabview-nav-container">
                <button *ngIf="scrollable && !backwardIsDisabled" #prevBtn class="p-tabview-nav-prev p-tabview-nav-btn p-link" (click)="navBackward()" type="button" pRipple>
                    <span class="pi pi-chevron-left"></span>
                </button>
                <div #content class="p-tabview-nav-content" (scroll)="onScroll($event)">
                    <ul #navbar class="p-tabview-nav" role="tablist">
                        <ng-template ngFor let-tab [ngForOf]="tabs">
                            <li role="presentation" [ngClass]="{'p-highlight': tab.selected, 'p-disabled': tab.disabled}" [ngStyle]="tab.headerStyle" [class]="tab.headerStyleClass" *ngIf="!tab.closed">
                                <a role="tab" class="p-tabview-nav-link" [attr.id]="tab.id + '-label'" [attr.aria-selected]="tab.selected" [attr.aria-controls]="tab.id" [pTooltip]="tab.tooltip" [tooltipPosition]="tab.tooltipPosition"
                                    [attr.aria-selected]="tab.selected" [positionStyle]="tab.tooltipPositionStyle" [tooltipStyleClass]="tab.tooltipStyleClass"
                                    (click)="open($event,tab)" (keydown.enter)="open($event,tab)" pRipple [attr.tabindex]="tab.disabled ? null : '0'">
                                    <ng-container *ngIf="!tab.headerTemplate">
                                        <span class="p-tabview-left-icon" [ngClass]="tab.leftIcon" *ngIf="tab.leftIcon"></span>
                                        <span class="p-tabview-title">{{tab.header}}</span>
                                        <span class="p-tabview-right-icon" [ngClass]="tab.rightIcon" *ngIf="tab.rightIcon"></span>
                                    </ng-container>
                                    <ng-container *ngTemplateOutlet="tab.headerTemplate"></ng-container>
                                    <span *ngIf="tab.closable" class="p-tabview-close pi pi-times" (click)="close($event,tab)"></span>
                                </a>
                            </li>
                        </ng-template>
                        <li #inkbar class="p-tabview-ink-bar"></li>
                    </ul>
                </div>
                <button *ngIf="scrollable && !forwardIsDisabled" #nextBtn class="p-tabview-nav-next p-tabview-nav-btn p-link" (click)="navForward()" type="button" pRipple>
                    <span class="pi pi-chevron-right"></span>
                </button>
            </div>
            <div class="p-tabview-panels">
                <ng-content></ng-content>
            </div>
        </div>
    `,
   changeDetection: ChangeDetectionStrategy.OnPush,
   encapsulation: ViewEncapsulation.None,
   styleUrls: ['./tabview.css'],
   host: {
    'class': 'p-element'
}
})
export class TabView implements AfterContentInit,AfterViewChecked,BlockableUI {

    @Input() orientation: string = 'top';

    @Input() style: any;

    @Input() styleClass: string;

    @Input() controlClose: boolean;

    @Input() scrollable: boolean;

    @ViewChild('content') content: ElementRef;

    @ViewChild('navbar') navbar: ElementRef;

    @ViewChild('prevBtn') prevBtn: ElementRef;

    @ViewChild('nextBtn') nextBtn: ElementRef;

    @ViewChild('inkbar') inkbar: ElementRef;

    @ContentChildren(TabPanel) tabPanels: QueryList<TabPanel>;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Output() onClose: EventEmitter<any> = new EventEmitter();

    @Output() activeIndexChange: EventEmitter<number> = new EventEmitter();

    initialized: boolean;

    tabs: TabPanel[];

    _activeIndex: number;

    preventActiveIndexPropagation: boolean;

    tabChanged: boolean;

    backwardIsDisabled: boolean = true;

    forwardIsDisabled: boolean = false;

    constructor(public el: ElementRef, public cd: ChangeDetectorRef) {}

    ngAfterContentInit() {
        this.initTabs();

        this.tabPanels.changes.subscribe(_ => {
            this.initTabs();
        });
    }

    ngAfterViewChecked() {
        if (this.tabChanged) {
            this.updateInkBar();
            this.tabChanged = false;
        }
    }

    initTabs(): void {
        this.tabs = this.tabPanels.toArray();
        let selectedTab: TabPanel = this.findSelectedTab();
        if (!selectedTab && this.tabs.length) {
            if (this.activeIndex != null && this.tabs.length > this.activeIndex)
                this.tabs[this.activeIndex].selected = true;
            else
                this.tabs[0].selected = true;

            this.tabChanged = true;
        }

        this.cd.markForCheck();
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

            this.tabChanged = true;
            tab.selected = true;
            let selectedTabIndex = this.findTabIndex(tab);
            this.preventActiveIndexPropagation = true;
            this.activeIndexChange.emit(selectedTabIndex);
            this.onChange.emit({originalEvent: event, index: selectedTabIndex});

            this.updateScrollBar(selectedTabIndex);
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
            this.tabChanged = true;
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
            this.tabChanged = true;

            this.updateScrollBar(val);
        }
    }

    updateInkBar() {
        let tabHeader = DomHandler.findSingle(this.navbar.nativeElement, 'li.p-highlight');
        this.inkbar.nativeElement.style.width = DomHandler.getWidth(tabHeader) + 'px';
        this.inkbar.nativeElement.style.left =  DomHandler.getOffset(tabHeader).left - DomHandler.getOffset(this.navbar.nativeElement).left + 'px';
    }

    updateScrollBar(index) {
        let tabHeader = this.navbar.nativeElement.children[index];
        tabHeader.scrollIntoView({ block: 'nearest' })
    }

    updateButtonState() {
        const content = this.content.nativeElement;
        const { scrollLeft, scrollWidth } = content;
        const width = DomHandler.getWidth(content);

        this.backwardIsDisabled = scrollLeft === 0;
        this.forwardIsDisabled = scrollLeft === scrollWidth - width;
    }

    onScroll(event) {
        this.scrollable && this.updateButtonState();

        event.preventDefault();
    }

    getVisibleButtonWidths() {
        return [this.prevBtn?.nativeElement, this.nextBtn?.nativeElement].reduce((acc, el) => el ? acc + DomHandler.getWidth(el) : acc, 0);
    }

    navBackward() {
        const content = this.content.nativeElement;
        const width = DomHandler.getWidth(content) - this.getVisibleButtonWidths();
        const pos = content.scrollLeft - width;
        content.scrollLeft = pos <= 0 ? 0 : pos;
    }

    navForward() {
        const content = this.content.nativeElement;
        const width = DomHandler.getWidth(content) - this.getVisibleButtonWidths();
        const pos = content.scrollLeft + width;
        const lastPos = content.scrollWidth - width;

        content.scrollLeft = pos >= lastPos ? lastPos : pos;
    }
}


@NgModule({
    imports: [CommonModule,SharedModule,TooltipModule,RippleModule],
    exports: [TabView,TabPanel,SharedModule],
    declarations: [TabView,TabPanel]
})
export class TabViewModule { }
