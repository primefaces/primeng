import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
    AfterContentInit,
    AfterViewChecked,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EmbeddedViewRef,
    EventEmitter,
    Inject,
    Input,
    NgModule,
    OnDestroy,
    Output,
    PLATFORM_ID,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
    forwardRef
} from '@angular/core';
import { BlockableUI, PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ChevronLeftIcon } from 'primeng/icons/chevronleft';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { TimesIcon } from 'primeng/icons/times';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { Subscription } from 'rxjs';
import { TabViewChangeEvent, TabViewCloseEvent } from './tabview.interface';

let idx: number = 0;

@Component({
    selector: 'p-tabPanel',
    template: `
        <div [attr.id]="id" class="p-tabview-panel" [hidden]="!selected" role="tabpanel" [attr.aria-hidden]="!selected" [attr.aria-labelledby]="id + '-label'" *ngIf="!closed">
            <ng-content></ng-content>
            <ng-container *ngIf="contentTemplate && (cache ? loaded : selected)">
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            </ng-container>
        </div>
    `,
    host: {
        class: 'p-element'
    }
})
export class TabPanel implements AfterContentInit, OnDestroy {
    /**
     * Defines if tab can be removed.
     * @group Props
     */
    @Input() closable: boolean | undefined = false;
    /**
     * Inline style of the tab header.
     * @group Props
     */
    @Input() headerStyle: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the tab header.
     * @group Props
     */
    @Input() headerStyleClass: string | undefined;
    /**
     * Whether a lazy loaded panel should avoid getting loaded again on reselection.
     * @group Props
     */
    @Input() cache: boolean | undefined = true;
    /**
     * Advisory information to display in a tooltip on hover.
     * @group Props
     */
    @Input() tooltip: string | undefined;
    /**
     * Position of the tooltip.
     * @group Props
     */
    @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' | undefined = 'top';
    /**
     * Type of CSS position.
     * @group Props
     */
    @Input() tooltipPositionStyle: string | undefined = 'absolute';
    /**
     * Style class of the tooltip.
     * @group Props
     */
    @Input() tooltipStyleClass: string | undefined;
    /**
     * Defines if tab is active.
     * @defaultValue false
     * @group Props
     */
    @Input() get selected(): boolean {
        return !!this._selected;
    }
    set selected(val: boolean) {
        this._selected = val;

        if (!this.loaded) {
            this.cd.detectChanges();
        }

        if (val) this.loaded = true;
    }
    /**
     * When true, tab cannot be activated.
     * @defaultValue false
     * @group Props
     */
    @Input() get disabled(): boolean {
        return !!this._disabled;
    }
    set disabled(disabled: boolean) {
        this._disabled = disabled;
        this.tabView.cd.markForCheck();
    }
    /**
     * Title of the tabPanel.
     * @group Props
     */
    @Input() get header(): string {
        return this._header;
    }
    set header(header: string) {
        this._header = header;

        // We have to wait for the rendering and then retrieve the actual size element from the DOM.
        // in future `Promise.resolve` can be changed to `queueMicrotask` (if ie11 support will be dropped)
        Promise.resolve().then(() => {
            this.tabView.updateInkBar();
            this.tabView.cd.markForCheck();
        });
    }
    /**
     * Left icon of the tabPanel.
     * @deprecated since v15.4.2, use `lefticon` template instead.
     * @group Props
     */
    @Input() get leftIcon(): string {
        return this._leftIcon;
    }
    set leftIcon(leftIcon: string) {
        this._leftIcon = leftIcon;
        this.tabView.cd.markForCheck();
    }
    /**
     * Left icon of the tabPanel.
     * @deprecated since v15.4.2, use `righticon` template instead.
     * @group Props
     */
    @Input() get rightIcon(): string | undefined {
        return this._rightIcon;
    }
    set rightIcon(rightIcon: string | undefined) {
        this._rightIcon = rightIcon;
        this.tabView.cd.markForCheck();
    }

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    closed: boolean = false;

    view: EmbeddedViewRef<any> | null = null;

    _selected: boolean | undefined;

    _disabled: boolean | undefined;

    _header!: string;

    _leftIcon!: string;

    _rightIcon: string | undefined = undefined;

    loaded: boolean = false;

    id: string = `p-tabpanel-${idx++}`;

    contentTemplate: TemplateRef<any> | undefined;

    headerTemplate: TemplateRef<any> | undefined;

    leftIconTemplate: TemplateRef<any> | undefined;

    rightIconTemplate: TemplateRef<any> | undefined;

    closeIconTemplate: TemplateRef<any> | undefined;

    tabView: TabView;

    constructor(@Inject(forwardRef(() => TabView)) tabView: TabView, public viewContainer: ViewContainerRef, public cd: ChangeDetectorRef) {
        this.tabView = tabView as TabView;
    }

    ngAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;

                case 'content':
                    this.contentTemplate = item.template;
                    break;

                case 'righticon':
                    this.rightIconTemplate = item.template;
                    break;

                case 'lefticon':
                    this.leftIconTemplate = item.template;
                    break;

                case 'closeicon':
                    this.closeIconTemplate = item.template;
                    break;

                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }

    ngOnDestroy() {
        this.view = null;
    }
}

@Component({
    selector: 'p-tabView',
    template: `
        <div [ngClass]="{ 'p-tabview p-component': true, 'p-tabview-scrollable': scrollable }" [ngStyle]="style" [class]="styleClass">
            <div class="p-tabview-nav-container">
                <button *ngIf="scrollable && !backwardIsDisabled" #prevBtn class="p-tabview-nav-prev p-tabview-nav-btn p-link" (click)="navBackward()" type="button" pRipple>
                    <ChevronLeftIcon *ngIf="!previousIconTemplate" />
                    <ng-template *ngTemplateOutlet="previousIconTemplate"></ng-template>
                </button>
                <div #content class="p-tabview-nav-content" (scroll)="onScroll($event)">
                    <ul #navbar class="p-tabview-nav" role="tablist">
                        <ng-template ngFor let-tab [ngForOf]="tabs">
                            <li role="presentation" [ngClass]="{ 'p-highlight': tab.selected, 'p-disabled': tab.disabled }" [ngStyle]="tab.headerStyle" [class]="tab.headerStyleClass" *ngIf="!tab.closed">
                                <a
                                    role="tab"
                                    class="p-tabview-nav-link"
                                    [attr.id]="tab.id + '-label'"
                                    [attr.aria-selected]="tab.selected"
                                    [attr.aria-controls]="tab.id"
                                    [pTooltip]="tab.tooltip"
                                    [tooltipPosition]="tab.tooltipPosition"
                                    [attr.aria-selected]="tab.selected"
                                    [positionStyle]="tab.tooltipPositionStyle"
                                    [tooltipStyleClass]="tab.tooltipStyleClass"
                                    (click)="open($event, tab)"
                                    (keydown.enter)="open($event, tab)"
                                    pRipple
                                    [attr.tabindex]="tab.disabled ? null : '0'"
                                >
                                    <ng-container *ngIf="!tab.headerTemplate">
                                        <span class="p-tabview-left-icon" [ngClass]="tab.leftIcon" *ngIf="tab.leftIcon && !tab.leftIconTemplate"></span>
                                        <span *ngIf="tab.leftIconTemplate" class="p-tabview-left-icon">
                                            <ng-template *ngTemplateOutlet="tab.leftIconTemplate"></ng-template>
                                        </span>
                                        <span class="p-tabview-title">{{ tab.header }}</span>
                                        <span class="p-tabview-right-icon" [ngClass]="tab.rightIcon" *ngIf="tab.rightIcon && !tab.rightIconTemplate"></span>
                                        <span *ngIf="tab.rightIconTemplate" class="p-tabview-right-icon">
                                            <ng-template *ngTemplateOutlet="tab.rightIconTemplate"></ng-template>
                                        </span>
                                    </ng-container>
                                    <ng-container *ngTemplateOutlet="tab.headerTemplate"></ng-container>
                                    <ng-container *ngIf="tab.closable">
                                        <TimesIcon *ngIf="!tab.closeIconTemplate" [styleClass]="'p-tabview-close'" (click)="close($event, tab)" />
                                        <span class="tab.closeIconTemplate" *ngIf="p - tabview - close"></span>
                                        <ng-template *ngTemplateOutlet="tab.closeIconTemplate"></ng-template>
                                    </ng-container>
                                </a>
                            </li>
                        </ng-template>
                        <li #inkbar class="p-tabview-ink-bar"></li>
                    </ul>
                </div>
                <button *ngIf="scrollable && !forwardIsDisabled" #nextBtn class="p-tabview-nav-next p-tabview-nav-btn p-link" (click)="navForward()" type="button" pRipple>
                    <ChevronRightIcon *ngIf="!nextIconTemplate" />
                    <ng-template *ngTemplateOutlet="nextIconTemplate"></ng-template>
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
        class: 'p-element'
    }
})
export class TabView implements AfterContentInit, AfterViewChecked, OnDestroy, BlockableUI {
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Whether tab close is controlled at onClose event or not.
     * @defaultValue false
     * @group Props
     */
    @Input() controlClose: boolean | undefined;
    /**
     * When enabled displays buttons at each side of the tab headers to scroll the tab list.
     * @defaultValue false
     * @group Props
     */
    @Input() scrollable: boolean | undefined;
    /**
     * Index of the active tab to change selected tab programmatically.
     * @group Props
     */
    @Input() get activeIndex(): number {
        return this._activeIndex;
    }
    set activeIndex(val: number) {
        this._activeIndex = val;
        if (this.preventActiveIndexPropagation) {
            this.preventActiveIndexPropagation = false;
            return;
        }

        if (this.tabs && this.tabs.length && this._activeIndex != null && this.tabs.length > this._activeIndex) {
            (this.findSelectedTab() as TabPanel).selected = false;
            this.tabs[this._activeIndex].selected = true;
            this.tabChanged = true;

            this.updateScrollBar(val);
        }
    }
    /**
     * Callback to invoke on tab change.
     * @param {TabViewChangeEvent} event - Custom tab change event
     * @group Emits
     */
    @Output() onChange: EventEmitter<TabViewChangeEvent> = new EventEmitter<TabViewChangeEvent>();
    /**
     * Callback to invoke on tab close.
     * @param {TabViewCloseEvent} event - Custom tab close event
     * @group Emits
     */
    @Output() onClose: EventEmitter<TabViewCloseEvent> = new EventEmitter<TabViewCloseEvent>();
    /**
     * Callback to invoke on the active tab change.
     * @param {number} index - New active index
     * @group Emits
     */
    @Output() activeIndexChange: EventEmitter<number> = new EventEmitter<number>();

    @ViewChild('content') content?: ElementRef<HTMLDivElement>;

    @ViewChild('navbar') navbar?: ElementRef<HTMLUListElement>;

    @ViewChild('prevBtn') prevBtn?: ElementRef;

    @ViewChild('nextBtn') nextBtn?: ElementRef;

    @ViewChild('inkbar') inkbar?: ElementRef;

    @ContentChildren(TabPanel) tabPanels: QueryList<TabPanel> | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    initialized: boolean | undefined;

    tabs!: TabPanel[];

    _activeIndex!: number;

    preventActiveIndexPropagation!: boolean;

    tabChanged: boolean | undefined;

    backwardIsDisabled: boolean = true;

    forwardIsDisabled: boolean = false;

    private tabChangesSubscription!: Subscription;

    nextIconTemplate: TemplateRef<any> | undefined;

    previousIconTemplate: TemplateRef<any> | undefined;

    constructor(@Inject(PLATFORM_ID) private platformId: any, public el: ElementRef, public cd: ChangeDetectorRef) {}

    ngAfterContentInit() {
        this.initTabs();

        this.tabChangesSubscription = (this.tabPanels as QueryList<TabPanel>).changes.subscribe((_) => {
            this.initTabs();
        });

        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'previousicon':
                    this.previousIconTemplate = item.template;
                    break;

                case 'nexticon':
                    this.nextIconTemplate = item.template;
                    break;
            }
        });
    }

    ngAfterViewChecked() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.tabChanged) {
                this.updateInkBar();
                this.tabChanged = false;
            }
        }
    }

    ngOnDestroy(): void {
        if (this.tabChangesSubscription) {
            this.tabChangesSubscription.unsubscribe();
        }
    }

    initTabs(): void {
        this.tabs = (this.tabPanels as QueryList<TabPanel>).toArray();
        let selectedTab: TabPanel = this.findSelectedTab() as TabPanel;
        if (!selectedTab && this.tabs.length) {
            if (this.activeIndex != null && this.tabs.length > this.activeIndex) this.tabs[this.activeIndex].selected = true;
            else this.tabs[0].selected = true;

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
            let selectedTab: TabPanel = this.findSelectedTab() as TabPanel;
            if (selectedTab) {
                selectedTab.selected = false;
            }

            this.tabChanged = true;
            tab.selected = true;
            let selectedTabIndex = this.findTabIndex(tab);
            this.preventActiveIndexPropagation = true;
            this.activeIndexChange.emit(selectedTabIndex);
            this.onChange.emit({ originalEvent: event, index: selectedTabIndex });

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
                }
            });
        } else {
            this.closeTab(tab);
            this.onClose.emit({
                originalEvent: event,
                index: this.findTabIndex(tab)
            });
        }
    }

    closeTab(tab: TabPanel) {
        if (tab.disabled) {
            return;
        }
        if (tab.selected) {
            this.tabChanged = true;
            tab.selected = false;
            for (let i = 0; i < this.tabs.length; i++) {
                let tabPanel = this.tabs[i];
                if (!tabPanel.closed && !tab.disabled) {
                    tabPanel.selected = true;
                    break;
                }
            }
        }

        tab.closed = true;
    }

    findSelectedTab(): TabPanel | null {
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].selected) {
                return this.tabs[i];
            }
        }
        return null;
    }

    findTabIndex(tab: TabPanel) {
        let index = -1;
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i] == tab) {
                index = i;
                break;
            }
        }
        return index;
    }

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

    updateInkBar() {
        if (this.navbar) {
            const tabHeader: HTMLElement | null = DomHandler.findSingle(this.navbar.nativeElement, 'li.p-highlight');

            if (!tabHeader) {
                return;
            }

            (this.inkbar as ElementRef).nativeElement.style.width = DomHandler.getWidth(tabHeader) + 'px';
            (this.inkbar as ElementRef).nativeElement.style.left = DomHandler.getOffset(tabHeader).left - DomHandler.getOffset(this.navbar.nativeElement).left + 'px';
        }
    }

    updateScrollBar(index: number) {
        let tabHeader = (this.navbar as ElementRef).nativeElement.children[index];
        tabHeader.scrollIntoView({ block: 'nearest' });
    }

    updateButtonState() {
        const content = (this.content as ElementRef).nativeElement;
        const { scrollLeft, scrollWidth } = content;
        const width = DomHandler.getWidth(content);

        this.backwardIsDisabled = scrollLeft === 0;
        this.forwardIsDisabled = scrollLeft === scrollWidth - width;
    }

    onScroll(event: Event) {
        this.scrollable && this.updateButtonState();

        event.preventDefault();
    }

    getVisibleButtonWidths() {
        return [this.prevBtn?.nativeElement, this.nextBtn?.nativeElement].reduce((acc, el) => (el ? acc + DomHandler.getWidth(el) : acc), 0);
    }

    navBackward() {
        const content = (this.content as ElementRef).nativeElement;
        const width = DomHandler.getWidth(content) - this.getVisibleButtonWidths();
        const pos = content.scrollLeft - width;
        content.scrollLeft = pos <= 0 ? 0 : pos;
    }

    navForward() {
        const content = (this.content as ElementRef).nativeElement;
        const width = DomHandler.getWidth(content) - this.getVisibleButtonWidths();
        const pos = content.scrollLeft + width;
        const lastPos = content.scrollWidth - width;

        content.scrollLeft = pos >= lastPos ? lastPos : pos;
    }
}

@NgModule({
    imports: [CommonModule, SharedModule, TooltipModule, RippleModule, TimesIcon, ChevronLeftIcon, ChevronRightIcon],
    exports: [TabView, TabPanel, SharedModule],
    declarations: [TabView, TabPanel]
})
export class TabViewModule {}
