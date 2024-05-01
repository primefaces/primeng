import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    HostListener,
    Inject,
    Input,
    NgModule,
    OnDestroy,
    Output,
    QueryList,
    TemplateRef,
    ViewEncapsulation,
    booleanAttribute,
    forwardRef,
    numberAttribute
} from '@angular/core';
import { BlockableUI, Header, PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { UniqueComponentId } from 'primeng/utils';
import { Subscription } from 'rxjs';
import { AccordionTabCloseEvent, AccordionTabOpenEvent } from './accordion.interface';

/**
 * AccordionTab is a helper component for Accordion.
 * @group Components
 */
@Component({
    selector: 'p-accordionTab',
    template: `
        <div class="p-accordion-tab" [class.p-accordion-tab-active]="selected" [ngClass]="tabStyleClass" [ngStyle]="tabStyle" [attr.data-pc-name]="'accordiontab'">
            <div class="p-accordion-header" role="heading" [attr.aria-level]="headerAriaLevel" [class.p-highlight]="selected" [class.p-disabled]="disabled" [attr.data-p-disabled]="disabled" [attr.data-pc-section]="'header'">
                <a
                    [ngClass]="headerStyleClass"
                    [style]="headerStyle"
                    role="button"
                    class="p-accordion-header-link"
                    (click)="toggle($event)"
                    (keydown)="onKeydown($event)"
                    [attr.tabindex]="disabled ? null : 0"
                    [attr.id]="getTabHeaderActionId(id)"
                    [attr.aria-controls]="getTabContentId(id)"
                    [attr.aria-expanded]="selected"
                    [attr.aria-disabled]="disabled"
                    [attr.data-pc-section]="'headeraction'"
                >
                    <ng-container *ngIf="!iconTemplate">
                        <ng-container *ngIf="selected">
                            <span *ngIf="accordion.collapseIcon" [class]="accordion.collapseIcon" [ngClass]="iconClass" [attr.aria-hidden]="true"></span>
                            <ChevronDownIcon *ngIf="!accordion.collapseIcon" [ngClass]="iconClass" [attr.aria-hidden]="true" />
                        </ng-container>
                        <ng-container *ngIf="!selected">
                            <span *ngIf="accordion.expandIcon" [class]="accordion.expandIcon" [ngClass]="iconClass" [attr.aria-hidden]="true"></span>
                            <ChevronRightIcon *ngIf="!accordion.expandIcon" [ngClass]="iconClass" [attr.aria-hidden]="true" />
                        </ng-container>
                    </ng-container>
                    <ng-template *ngTemplateOutlet="iconTemplate; context: { $implicit: selected }"></ng-template>
                    <span class="p-accordion-header-text" *ngIf="!hasHeaderFacet">
                        {{ header }}
                    </span>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                    <ng-content select="p-header" *ngIf="hasHeaderFacet"></ng-content>
                </a>
            </div>
            <div
                [attr.id]="getTabContentId(id)"
                class="p-toggleable-content"
                [@tabContent]="selected ? { value: 'visible', params: { transitionParams: transitionOptions } } : { value: 'hidden', params: { transitionParams: transitionOptions } }"
                role="region"
                [attr.aria-hidden]="!selected"
                [attr.aria-labelledby]="getTabHeaderActionId(id)"
                [attr.data-pc-section]="'toggleablecontent'"
            >
                <div class="p-accordion-content" [ngClass]="contentStyleClass" [ngStyle]="contentStyle">
                    <ng-content></ng-content>
                    <ng-container *ngIf="contentTemplate && (cache ? loaded : selected)">
                        <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                    </ng-container>
                </div>
            </div>
        </div>
    `,
    animations: [
        trigger('tabContent', [
            state(
                'hidden',
                style({
                    height: '0',
                    visibility: 'hidden'
                })
            ),
            state(
                'visible',
                style({
                    height: '*',
                    visibility: 'visible'
                })
            ),
            transition('visible <=> hidden', [animate('{{transitionParams}}')]),
            transition('void => *', animate(0))
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./accordion.css'],
    host: {
        class: 'p-element'
    }
})
export class AccordionTab implements AfterContentInit, OnDestroy {
    /**
     * Current id state as a string.
     * @group Props
     */
    @Input() id: string | undefined;
    /**
     * Used to define the header of the tab.
     * @group Props
     */
    @Input() header: string | undefined;
    /**
     * Inline style of the tab header.
     * @group Props
     */
    @Input() headerStyle: { [klass: string]: any } | null | undefined;
    /**
     * Inline style of the tab.
     * @group Props
     */
    @Input() tabStyle: { [klass: string]: any } | null | undefined;
    /**
     * Inline style of the tab content.
     * @group Props
     */
    @Input() contentStyle: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the tab.
     * @group Props
     */
    @Input() tabStyleClass: string | undefined;
    /**
     * Style class of the tab header.
     * @group Props
     */
    @Input() headerStyleClass: string | undefined;
    /**
     * Style class of the tab content.
     * @group Props
     */
    @Input() contentStyleClass: string | undefined;
    /**
     * Whether the tab is disabled.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) disabled: boolean | undefined;
    /**
     * Whether a lazy loaded panel should avoid getting loaded again on reselection.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) cache: boolean = true;
    /**
     * Transition options of the animation.
     * @group Props
     */
    @Input() transitionOptions: string = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
    /**
     * Position of the icon.
     * @group Props
     */
    @Input() iconPos: 'end' | 'start' = 'start';
    /**
     * The value that returns the selection.
     * @group Props
     */
    @Input() get selected(): boolean {
        return this._selected;
    }
    set selected(val: boolean) {
        this._selected = val;

        if (!this.loaded) {
            if (this._selected && this.cache) {
                this.loaded = true;
            }

            this.changeDetector.detectChanges();
        }
    }
    /**
     * The aria-level that each accordion header will have. The default value is 2 as per W3C specifications
     * @group Props
     */
    @Input({ transform: numberAttribute }) headerAriaLevel: number = 2;
    /**
     * Event triggered by changing the choice.
     * @param {boolean} value - Boolean value indicates that the option is changed.
     * @group Emits
     */
    @Output() selectedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ContentChildren(Header) headerFacet!: QueryList<Header>;

    @ContentChildren(PrimeTemplate) templates!: QueryList<PrimeTemplate>;

    private _selected: boolean = false;

    get iconClass() {
        if (this.iconPos === 'end') {
            return 'p-accordion-toggle-icon-end';
        } else {
            return 'p-accordion-toggle-icon';
        }
    }

    contentTemplate: TemplateRef<any> | undefined;

    headerTemplate: TemplateRef<any> | undefined;

    iconTemplate: TemplateRef<any> | undefined;

    loaded: boolean = false;

    accordion: Accordion;

    constructor(@Inject(forwardRef(() => Accordion)) accordion: Accordion, public el: ElementRef, public changeDetector: ChangeDetectorRef) {
        this.accordion = accordion as Accordion;
        this.id = UniqueComponentId();
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;

                case 'header':
                    this.headerTemplate = item.template;
                    break;

                case 'icon':
                    this.iconTemplate = item.template;
                    break;

                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }

    toggle(event?: MouseEvent | KeyboardEvent) {
        if (this.disabled) {
            return false;
        }

        let index = this.findTabIndex();

        if (this.selected) {
            this.selected = false;
            this.accordion.onClose.emit({ originalEvent: event, index: index });
        } else {
            if (!this.accordion.multiple) {
                for (var i = 0; i < this.accordion.tabs.length; i++) {
                    if (this.accordion.tabs[i].selected) {
                        this.accordion.tabs[i].selected = false;
                        this.accordion.tabs[i].selectedChange.emit(false);
                        this.accordion.tabs[i].changeDetector.markForCheck();
                    }
                }
            }

            this.selected = true;
            this.loaded = true;
            this.accordion.onOpen.emit({ originalEvent: event, index: index });
        }

        this.selectedChange.emit(this.selected);
        this.accordion.updateActiveIndex();
        this.changeDetector.markForCheck();

        event?.preventDefault();
    }

    findTabIndex() {
        let index = -1;
        for (var i = 0; i < this.accordion.tabs.length; i++) {
            if (this.accordion.tabs[i] == this) {
                index = i;
                break;
            }
        }
        return index;
    }

    get hasHeaderFacet(): boolean {
        return (this.headerFacet as QueryList<Header>) && (this.headerFacet as QueryList<Header>).length > 0;
    }

    onKeydown(event: KeyboardEvent) {
        switch (event.code) {
            case 'Enter':
            case 'Space':
                this.toggle(event);
                event.preventDefault();
                break;
            default:
                break;
        }
    }

    getTabHeaderActionId(tabId) {
        return `${tabId}_header_action`;
    }

    getTabContentId(tabId) {
        return `${tabId}_content`;
    }

    ngOnDestroy() {
        this.accordion.tabs.splice(this.findTabIndex(), 1);
    }
}

/**
 * Accordion groups a collection of contents in tabs.
 * @group Components
 */
@Component({
    selector: 'p-accordion',
    template: `
        <div [ngClass]="'p-accordion p-component'" [ngStyle]="style" [class]="styleClass">
            <ng-content></ng-content>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'p-element'
    }
})
export class Accordion implements BlockableUI, AfterContentInit, OnDestroy {
    /**
     * When enabled, multiple tabs can be activated at the same time.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) multiple: boolean = false;
    /**
     * Inline style of the tab header and content.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Class of the element.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Icon of a collapsed tab.
     * @group Props
     */
    @Input() expandIcon: string | undefined;
    /**
     * Icon of an expanded tab.
     * @group Props
     */
    @Input() collapseIcon: string | undefined;
    /**
     * Index of the active tab or an array of indexes in multiple mode.
     * @group Props
     */
    @Input() get activeIndex(): number | number[] | null | undefined {
        return this._activeIndex;
    }
    set activeIndex(val: number | number[] | null | undefined) {
        this._activeIndex = val;
        if (this.preventActiveIndexPropagation) {
            this.preventActiveIndexPropagation = false;
            return;
        }

        this.updateSelectionState();
    }
    /**
     * When enabled, the focused tab is activated.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) selectOnFocus: boolean = false;
    /**
     * The aria-level that each accordion header will have. The default value is 2 as per W3C specifications
     * @group Props
     */
    @Input() get headerAriaLevel(): number {
        return this._headerAriaLevel;
    }
    set headerAriaLevel(val: number) {
        if (typeof val === 'number' && val > 0) {
            this._headerAriaLevel = val;
        } else if (this._headerAriaLevel !== 2) {
            this._headerAriaLevel = 2;
        }
    }
    /**
     * Callback to invoke when an active tab is collapsed by clicking on the header.
     * @param {AccordionTabCloseEvent} event - Custom tab close event.
     * @group Emits
     */
    @Output() onClose: EventEmitter<AccordionTabCloseEvent> = new EventEmitter();
    /**
     * Callback to invoke when a tab gets expanded.
     * @param {AccordionTabOpenEvent} event - Custom tab open event.
     * @group Emits
     */
    @Output() onOpen: EventEmitter<AccordionTabOpenEvent> = new EventEmitter();
    /**
     * Returns the active index.
     * @param {number | number[]} value - New index.
     * @group Emits
     */
    @Output() activeIndexChange: EventEmitter<number | number[]> = new EventEmitter<number | number[]>();

    @ContentChildren(AccordionTab, { descendants: true }) tabList: QueryList<AccordionTab> | undefined;

    tabListSubscription: Subscription | null = null;

    private _activeIndex: any;
    private _headerAriaLevel: number = 2;

    preventActiveIndexPropagation: boolean = false;

    public tabs: AccordionTab[] = [];

    constructor(public el: ElementRef, public changeDetector: ChangeDetectorRef) {}

    @HostListener('keydown', ['$event'])
    onKeydown(event) {
        switch (event.code) {
            case 'ArrowDown':
                this.onTabArrowDownKey(event);
                break;

            case 'ArrowUp':
                this.onTabArrowUpKey(event);
                break;

            case 'Home':
                if (!event.shiftKey) {
                    this.onTabHomeKey(event);
                }
                break;

            case 'End':
                if (!event.shiftKey) {
                    this.onTabEndKey(event);
                }
                break;
        }
    }

    isInput(event): boolean {
        const { tagName } = event.target;
        return tagName?.toLowerCase() === 'input';
    }

    isTextArea(event): boolean {
        const { tagName } = event.target;
        return tagName?.toLowerCase() === 'textarea';
    }

    onTabArrowDownKey(event) {
        if (!this.isInput(event) && !this.isTextArea(event) && document.activeElement.className == 'p-accordion-header-link') {
            const nextHeaderAction = this.findNextHeaderAction(event.target.parentElement.parentElement.parentElement);
            nextHeaderAction ? this.changeFocusedTab(nextHeaderAction) : this.onTabHomeKey(event);

            event.preventDefault();
        }
    }

    onTabArrowUpKey(event) {
        if (!this.isInput(event) && !this.isTextArea(event)  && document.activeElement.className == 'p-accordion-header-link') {
            const prevHeaderAction = this.findPrevHeaderAction(event.target.parentElement.parentElement.parentElement);
            prevHeaderAction ? this.changeFocusedTab(prevHeaderAction) : this.onTabEndKey(event);

            event.preventDefault();
        }
    }

    onTabHomeKey(event) {
        if(document.activeElement.className == 'p-accordion-header-link'){
            const firstHeaderAction = this.findFirstHeaderAction();
            this.changeFocusedTab(firstHeaderAction);
            event.preventDefault();
        }
    }

    changeFocusedTab(element) {
        if (element) {
            DomHandler.focus(element);

            if (this.selectOnFocus) {
                this.tabs.forEach((tab, i) => {
                    let selected = this.multiple ? this._activeIndex.includes(i) : i === this._activeIndex;

                    if (this.multiple) {
                        if (!this._activeIndex) {
                            this._activeIndex = [];
                        }
                        if (tab.id == element.id) {
                            tab.selected = !tab.selected;
                            if (!this._activeIndex.includes(i)) {
                                this._activeIndex.push(i);
                            } else {
                                this._activeIndex = this._activeIndex.filter((ind) => ind !== i);
                            }
                        }
                    } else {
                        if (tab.id == element.id) {
                            tab.selected = !tab.selected;
                            this._activeIndex = i;
                        } else {
                            tab.selected = false;
                        }
                    }

                    tab.selectedChange.emit(selected);
                    this.activeIndexChange.emit(this._activeIndex);
                    tab.changeDetector.markForCheck();
                });
            }
        }
    }

    findNextHeaderAction(tabElement, selfCheck = false) {
        const nextTabElement = selfCheck ? tabElement : tabElement.nextElementSibling;
        const headerElement = DomHandler.findSingle(nextTabElement, '[data-pc-section="header"]');

        return headerElement ? (DomHandler.getAttribute(headerElement, 'data-p-disabled') ? this.findNextHeaderAction(headerElement.parentElement.parentElement) : DomHandler.findSingle(headerElement, '[data-pc-section="headeraction"]')) : null;
    }

    findPrevHeaderAction(tabElement, selfCheck = false) {
        const prevTabElement = selfCheck ? tabElement : tabElement.previousElementSibling;
        const headerElement = DomHandler.findSingle(prevTabElement, '[data-pc-section="header"]');

        return headerElement ? (DomHandler.getAttribute(headerElement, 'data-p-disabled') ? this.findPrevHeaderAction(headerElement.parentElement.parentElement) : DomHandler.findSingle(headerElement, '[data-pc-section="headeraction"]')) : null;
    }

    findFirstHeaderAction() {
        const firstEl = this.el.nativeElement.firstElementChild.childNodes[0];
        return this.findNextHeaderAction(firstEl, true);
    }

    findLastHeaderAction() {
        const childNodes = this.el.nativeElement.firstElementChild.childNodes;
        const lastEl = childNodes[childNodes.length - 1];

        return this.findPrevHeaderAction(lastEl, true);
    }

    onTabEndKey(event) {
        if(document.activeElement.className == 'p-accordion-header-link'){
            const lastHeaderAction = this.findLastHeaderAction();
            this.changeFocusedTab(lastHeaderAction);
            event.preventDefault();
        }
    }

    ngAfterContentInit() {
        this.initTabs();

        this.tabListSubscription = (this.tabList as QueryList<AccordionTab>).changes.subscribe((_) => {
            this.initTabs();
        });
    }

    initTabs() {
        this.tabs = (this.tabList as QueryList<AccordionTab>).toArray();

        this.tabs.forEach((tab) => {
            tab.headerAriaLevel = this._headerAriaLevel;
        });

        this.updateSelectionState();
        this.changeDetector.markForCheck();
    }

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

    updateSelectionState() {
        if (this.tabs && this.tabs.length && this._activeIndex != null) {
            for (let i = 0; i < this.tabs.length; i++) {
                let selected = this.multiple ? this._activeIndex.includes(i) : i === this._activeIndex;
                let changed = selected !== this.tabs[i].selected;

                if (changed) {
                    this.tabs[i].selected = selected;
                    this.tabs[i].selectedChange.emit(selected);
                    this.tabs[i].changeDetector.markForCheck();
                }
            }
        }
    }

    isTabActive(index) {
        return this.multiple ? this._activeIndex && (<number[]>this._activeIndex).includes(index) : this._activeIndex === index;
    }

    getTabProp(tab, name) {
        return tab.props ? tab.props[name] : undefined;
    }

    updateActiveIndex() {
        let index: number | number[] | null = this.multiple ? [] : null;
        this.tabs.forEach((tab, i) => {
            if (tab.selected) {
                if (this.multiple) {
                    (index as number[]).push(i);
                } else {
                    index = i;
                    return;
                }
            }
        });
        this.preventActiveIndexPropagation = true;
        this.activeIndexChange.emit(index as number[] | number);
    }

    ngOnDestroy() {
        if (this.tabListSubscription) {
            this.tabListSubscription.unsubscribe();
        }
    }
}

@NgModule({
    imports: [CommonModule, ChevronRightIcon, ChevronDownIcon],
    exports: [Accordion, AccordionTab, SharedModule],
    declarations: [Accordion, AccordionTab]
})
export class AccordionModule {}
