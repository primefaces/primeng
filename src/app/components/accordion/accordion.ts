import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    NgModule,
    OnDestroy,
    Output,
    QueryList,
    TemplateRef,
    ViewEncapsulation,
    booleanAttribute,
    forwardRef,
    inject,
    numberAttribute,
} from '@angular/core';
import { BlockableUI, Header, PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { Subscription } from 'rxjs';
import { AccordionTabCloseEvent, AccordionTabOpenEvent } from './accordion.interface';
import { UniqueComponentId } from 'primeng/utils';
import { AccordionStyle } from './style/accordionstyle';
import { BaseComponent } from 'primeng/basecomponent';
import { ChevronUpIcon } from 'primeng/icons/chevronup';

/**
 * AccordionTab is a helper component for Accordion.
 * @group Components
 */
@Component({
    selector: 'p-accordionTab',
    standalone: true,
    imports: [CommonModule, ChevronDownIcon, ChevronUpIcon],
    template: `
        <button
            class="p-accordionheader"
            type="button"
            [disabled]="disabled"
            [attr.aria-expanded]="selected"
            [attr.aria-level]="headerAriaLevel"
            [class.p-disabled]="disabled"
            [attr.data-p-disabled]="disabled"
            [attr.data-pc-section]="'header'"
            (click)="toggle($event)"
            (keydown)="onKeydown($event)"
            [ngClass]="headerStyleClass"
            [ngStyle]="headerStyle"
            [attr.tabindex]="disabled ? null : 0"
            [attr.id]="getTabHeaderActionId(id)"
            [attr.aria-controls]="getTabContentId(id)"
            [attr.data-pc-section]="'headeraction'"
        >
            @if (!hasHeaderFacet && !headerTemplate) {
                {{ header }}
            } @else {
                @if (headerTemplate) {
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                }
                @if (hasHeaderFacet) {
                    <ng-content select="p-header"></ng-content>
                }
            }
            @if (iconTemplate) {
                <ng-template *ngTemplateOutlet="iconTemplate; context: { $implicit: selected }"></ng-template>
            } @else {
                <ng-container *ngIf="selected">
                    <span
                        *ngIf="accordion.collapseIcon"
                        [class]="accordion.collapseIcon"
                        [ngClass]="iconClass"
                        [attr.aria-hidden]="true"
                    ></span>
                    <ChevronDownIcon *ngIf="!accordion.collapseIcon" [ngClass]="iconClass" [attr.aria-hidden]="true" />
                </ng-container>
                <ng-container *ngIf="!selected">
                    <span
                        *ngIf="accordion.expandIcon"
                        [class]="accordion.expandIcon"
                        [ngClass]="iconClass"
                        [attr.aria-hidden]="true"
                    ></span>
                    <ChevronUpIcon *ngIf="!accordion.expandIcon" [ngClass]="iconClass" [attr.aria-hidden]="true" />
                </ng-container>
            }
        </button>
        <div
            [attr.id]="getTabContentId(id)"
            class="p-accordioncontent"
            [@tabContent]="
                selected
                    ? { value: 'visible', params: { transitionParams: transitionOptions } }
                    : { value: 'hidden', params: { transitionParams: transitionOptions } }
            "
            role="region"
            [attr.aria-hidden]="!selected"
            [attr.aria-labelledby]="getTabHeaderActionId(id)"
            [attr.data-pc-section]="'toggleablecontent'"
        >
            <div class="p-accordioncontent-content" [ngClass]="contentStyleClass" [ngStyle]="contentStyle">
                <ng-content></ng-content>
                <ng-container *ngIf="contentTemplate && (cache ? loaded : selected)">
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </ng-container>
            </div>
        </div>
    `,
    animations: [
        trigger('tabContent', [
            state(
                'hidden',
                style({
                    height: '0',
                    visibility: 'hidden',
                }),
            ),
            state(
                'visible',
                style({
                    height: '*',
                    visibility: 'visible',
                }),
            ),
            transition('visible <=> hidden', [animate('{{transitionParams}}')]),
            transition('void => *', animate(0)),
        ]),
    ],
    host: {
        '[class.p-accordionpanel]': 'true',
        '[class.p-accordionpanel-active]': 'selected',
        '[attr.data-pc-name]': 'accordiontab',
    },
    providers: [AccordionStyle],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class AccordionTab extends BaseComponent implements AfterContentInit, OnDestroy {
    @HostBinding('class') get hostClass() {
        return this.tabStyleClass;
    }
    @HostBinding('style') get hostStyle() {
        return this.tabStyle;
    }
    /**
     * Current id state as a string.
     * @group Props
     */
    @Input() id: string | undefined = UniqueComponentId();
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

            this.cd.detectChanges();
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
            return 'p-accordionheader-toggle-icon icon-end';
        } else {
            return 'p-accordionheader-toggle-icon icon-start';
        }
    }

    contentTemplate: TemplateRef<any> | undefined;

    headerTemplate: TemplateRef<any> | undefined;

    iconTemplate: TemplateRef<any> | undefined;

    loaded: boolean = false;

    accordion = inject(forwardRef(() => Accordion)) as Accordion;

    _componentStyle = inject(AccordionStyle);

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
                        this.accordion.tabs[i].cd.markForCheck();
                    }
                }
            }

            this.selected = true;
            this.loaded = true;
            this.accordion.onOpen.emit({ originalEvent: event, index: index });
        }

        this.selectedChange.emit(this.selected);
        this.accordion.updateActiveIndex();
        this.cd.markForCheck();

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

        super.ngOnDestroy();
    }
}

/**
 * Accordion groups a collection of contents in tabs.
 * @group Components
 */
@Component({
    selector: 'p-accordion',
    standalone: true,
    imports: [CommonModule, AccordionTab, SharedModule],
    template: ` <ng-content></ng-content> `,
    host: {
        '[class.p-accordion]': 'true',
        '[class.p-component]': 'true',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [AccordionStyle],
})
export class Accordion extends BaseComponent implements BlockableUI, AfterContentInit, OnDestroy {
    @HostBinding('class') get hostClass() {
        return this.styleClass;
    }

    @HostBinding('style') get hostStyle() {
        return this.style;
    }
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

    _componentStyle = inject(AccordionStyle);

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

    focusedElementIsAccordionHeader() {
        return document.activeElement.tagName.toLowerCase() === 'a' && document.activeElement.classList.contains('p-accordion-header-link');
    }

    onTabArrowDownKey(event) {
        if (this.focusedElementIsAccordionHeader()) {
            const nextHeaderAction = this.findNextHeaderAction(event.target.parentElement.parentElement.parentElement);
            nextHeaderAction ? this.changeFocusedTab(nextHeaderAction) : this.onTabHomeKey(event);

            event.preventDefault();
        }
    }

    onTabArrowUpKey(event) {
        if (this.focusedElementIsAccordionHeader()) {
            const prevHeaderAction = this.findPrevHeaderAction(event.target.parentElement.parentElement.parentElement);
            prevHeaderAction ? this.changeFocusedTab(prevHeaderAction) : this.onTabEndKey(event);

            event.preventDefault();
        }
    }

    onTabHomeKey(event) {
        const firstHeaderAction = this.findFirstHeaderAction();
        this.changeFocusedTab(firstHeaderAction);
        event.preventDefault();
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
                    tab.cd.markForCheck();
                });
            }
        }
    }

    findNextHeaderAction(tabElement, selfCheck = false) {
        const nextTabElement = selfCheck ? tabElement : tabElement.nextElementSibling;
        const headerElement = DomHandler.findSingle(nextTabElement, '[data-pc-section="header"]');

        return headerElement
            ? DomHandler.getAttribute(headerElement, 'data-p-disabled')
                ? this.findNextHeaderAction(headerElement.parentElement.parentElement)
                : DomHandler.findSingle(headerElement, '[data-pc-section="headeraction"]')
            : null;
    }

    findPrevHeaderAction(tabElement, selfCheck = false) {
        const prevTabElement = selfCheck ? tabElement : tabElement.previousElementSibling;
        const headerElement = DomHandler.findSingle(prevTabElement, '[data-pc-section="header"]');

        return headerElement
            ? DomHandler.getAttribute(headerElement, 'data-p-disabled')
                ? this.findPrevHeaderAction(headerElement.parentElement.parentElement)
                : DomHandler.findSingle(headerElement, '[data-pc-section="headeraction"]')
            : null;
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
        const lastHeaderAction = this.findLastHeaderAction();
        this.changeFocusedTab(lastHeaderAction);
        event.preventDefault();
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
        this.cd.markForCheck();
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
                    this.tabs[i].cd.markForCheck();
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
        this._activeIndex = index;
        this.activeIndexChange.emit(index as number[] | number);
    }

    ngOnDestroy() {
        if (this.tabListSubscription) {
            this.tabListSubscription.unsubscribe();
        }

        super.ngOnDestroy();
    }
}

@NgModule({
    imports: [Accordion, AccordionTab],
    exports: [Accordion, AccordionTab, SharedModule],
})
export class AccordionModule {}
