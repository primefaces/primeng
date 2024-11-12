import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    ContentChild,
    ContentChildren,
    EventEmitter,
    forwardRef,
    HostBinding,
    HostListener,
    inject,
    Input,
    input,
    InputSignalWithTransform,
    model,
    NgModule,
    numberAttribute,
    OnDestroy,
    Output,
    QueryList,
    signal,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { findSingle, focus, getAttribute, uuid } from '@primeuix/utils';
import { BlockableUI, Header, SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { ChevronDownIcon, ChevronUpIcon } from 'primeng/icons';
import { Ripple } from 'primeng/ripple';
import { transformToBoolean } from 'primeng/utils';
import { Subscription } from 'rxjs';
import { AccordionStyle } from './style/accordionstyle';

/**
 * Custom tab open event.
 * @see {@link onOpen}
 * @group Interface
 */
export interface AccordionTabOpenEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Opened tab index.
     */
    index: number;
}

/**
 * Custom tab close event.
 * @see {@link onClose}
 * @extends {AccordionTabOpenEvent}
 * @group Interface
 */
export interface AccordionTabCloseEvent extends AccordionTabOpenEvent {}

/**
 * Toggle icon template context.
 * @group Interface
 */
export interface AccordionToggleIconTemplateContext {
    /**
     * Represents the active status of the panel.
     */
    active: boolean;
}

/**
 * AccordionPanel is a helper component for Accordion component.
 * @group Components
 */
@Component({
    selector: 'p-accordion-panel',
    imports: [CommonModule],
    standalone: true,
    template: `<ng-content />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.p-accordionpanel]': 'true',
        '[class.p-accordionpanel-active]': 'active()',
        '[class.p-disabled]': 'disabled()',
        '[attr.data-pc-name]': '"accordionpanel"',
        '[attr.data-p-disabled]': 'disabled()',
        '[attr.data-p-active]': 'active()'
    }
})
export class AccordionPanel extends BaseComponent {
    pcAccordion = inject(forwardRef(() => Accordion));
    /**
     * Value of the active tab.
     * @defaultValue undefined
     * @group Props
     */
    value = model<undefined | null | string | number | string[] | number[]>(undefined);
    /**
     * Disables the tab when enabled.
     * @defaultValue false
     * @group Props
     */
    disabled: InputSignalWithTransform<any, boolean> = input(false, { transform: (v: any) => transformToBoolean(v) });

    active = computed(() => (this.pcAccordion.multiple() ? this.valueEquals(this.pcAccordion.value(), this.value()) : this.pcAccordion.value() === this.value()));

    valueEquals(currentValue: any, value: any): boolean {
        if (Array.isArray(currentValue)) {
            return currentValue.includes(value);
        }
        return currentValue === value;
    }
}
/**
 * AccordionHeader is a helper component for Accordion component.
 * @group Components
 */
@Component({
    selector: 'p-accordion-header',
    imports: [CommonModule, ChevronDownIcon, ChevronUpIcon, Ripple],
    standalone: true,
    template: `
        <ng-content />
        @if (toggleIconTemplate) {
            <ng-template *ngTemplateOutlet="toggleIconTemplate; context: { active: active() }"></ng-template>
        } @else {
            <ng-container *ngIf="active()">
                <span *ngIf="pcAccordion.collapseIcon" [class]="pcAccordion.collapseIcon" [ngClass]="pcAccordion.iconClass" [attr.aria-hidden]="true"></span>
                <ChevronDownIcon *ngIf="!pcAccordion.collapseIcon" [ngClass]="pcAccordion.iconClass" [attr.aria-hidden]="true" />
            </ng-container>
            <ng-container *ngIf="!active()">
                <span *ngIf="pcAccordion.expandIcon" [class]="pcAccordion.expandIcon" [ngClass]="pcAccordion.iconClass" [attr.aria-hidden]="true"></span>
                <ChevronUpIcon *ngIf="!pcAccordion.expandIcon" [ngClass]="pcAccordion.iconClass" [attr.aria-hidden]="true" />
            </ng-container>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.p-accordionheader]': 'true',
        '[attr.id]': 'id()',
        '[attr.aria-expanded]': 'active()',
        '[attr.aria-controls]': 'ariaControls()',
        '[attr.role]': '"button"',
        '[attr.tabindex]': '"0"',
        '[attr.data-p-active]': 'active()',
        '[attr.data-p-disabled]': 'disabled()',
        '[attr.data-pc-name]': '"accordionheader"',
        '[style.user-select]': '"none"'
    },
    hostDirectives: [Ripple]
})
export class AccordionHeader extends BaseComponent {
    pcAccordion = inject(forwardRef(() => Accordion));

    pcAccordionPanel = inject(forwardRef(() => AccordionPanel));

    id = computed(() => `${this.pcAccordion.id()}_accordionheader_${this.pcAccordionPanel.value()}`);

    active = computed(() => this.pcAccordionPanel.active());

    disabled = computed(() => this.pcAccordionPanel.disabled());

    ariaControls = computed(() => `${this.pcAccordion.id()}_accordioncontent_${this.pcAccordionPanel.value()}`);
    /**
     * Toggle icon template.
     * @type {TemplateRef<AccordionToggleIconTemplateContext>} context - Context of the template
     * @example
     * ```html
     * <ng-template #toggleicon let-active="active"> </ng-template>
     * ```
     * @see {@link AccordionToggleIconTemplateContext}
     * @group Templates
     */
    @ContentChild('toggleicon') toggleIconTemplate: TemplateRef<AccordionToggleIconTemplateContext> | undefined;

    @HostListener('click', ['$event']) onClick() {
        this.changeActiveValue();
    }

    @HostListener('focus', ['$event']) onFocus() {
        this.pcAccordion.selectOnFocus() && this.changeActiveValue();
    }

    @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
        switch (event.code) {
            case 'ArrowDown':
                this.arrowDownKey(event);
                break;
            case 'ArrowUp':
                this.arrowUpKey(event);
                break;
            case 'Home':
                this.onHomeKey(event);
                break;
            case 'End':
                this.onEndKey(event);
                break;
            case 'Enter':
            case 'Space':
            case 'NumpadEnter':
                this.onEnterKey(event);
                break;
            default:
                break;
        }
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'toggleicon':
                    this.toggleIconTemplate = item.template;
                    break;
            }
        });
    }

    changeActiveValue() {
        this.pcAccordion.updateValue(this.pcAccordionPanel.value());
    }

    private findPanel(headerElement) {
        return headerElement?.closest('[data-pc-name="accordionpanel"]');
    }

    private findHeader(panelElement) {
        return findSingle(panelElement, '[data-pc-name="accordionheader"]');
    }

    private findNextPanel(panelElement, selfCheck = false) {
        const element = selfCheck ? panelElement : panelElement.nextElementSibling;

        return element ? (getAttribute(element, 'data-p-disabled') ? this.findNextPanel(element) : this.findHeader(element)) : null;
    }

    private findPrevPanel(panelElement, selfCheck = false) {
        const element = selfCheck ? panelElement : panelElement.previousElementSibling;

        return element ? (getAttribute(element, 'data-p-disabled') ? this.findPrevPanel(element) : this.findHeader(element)) : null;
    }

    private findFirstPanel() {
        return this.findNextPanel(this.pcAccordion.el.nativeElement.firstElementChild, true);
    }

    private findLastPanel() {
        return this.findPrevPanel(this.pcAccordion.el.nativeElement.lastElementChild, true);
    }

    private changeFocusedPanel(event, element) {
        focus(element);
    }

    private arrowDownKey(event: KeyboardEvent) {
        const nextPanel = this.findNextPanel(this.findPanel(event.currentTarget));
        nextPanel ? this.changeFocusedPanel(event, nextPanel) : this.onHomeKey(event);
        event.preventDefault();
    }

    private arrowUpKey(event: KeyboardEvent) {
        const prevPanel = this.findPrevPanel(this.findPanel(event.currentTarget));

        prevPanel ? this.changeFocusedPanel(event, prevPanel) : this.onEndKey(event);
        event.preventDefault();
    }

    private onHomeKey(event: KeyboardEvent) {
        const firstPanel = this.findFirstPanel();

        this.changeFocusedPanel(event, firstPanel);
        event.preventDefault();
    }

    private onEndKey(event: KeyboardEvent) {
        const lastPanel = this.findLastPanel();

        this.changeFocusedPanel(event, lastPanel);
        event.preventDefault();
    }

    private onEnterKey(event: KeyboardEvent) {
        this.changeActiveValue();
        event.preventDefault();
    }
}

@Component({
    selector: 'p-accordion-content',
    imports: [CommonModule],
    standalone: true,
    template: ` <div class="p-accordioncontent-content">
        <ng-content />
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.p-accordioncontent]': 'true',
        '[attr.id]': 'id()',
        '[attr.role]': '"region"',
        '[attr.data-pc-name]': '"accordioncontent"',
        '[attr.data-p-active]': 'active()',
        '[attr.aria-labelledby]': 'ariaLabelledby()',
        '[@content]': `active()
            ? { value: 'visible', params: { transitionParams: pcAccordion.transitionOptions } }
            : { value: 'hidden', params: { transitionParams: pcAccordion.transitionOptions } }`
    },
    animations: [
        trigger('content', [
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
    ]
})
export class AccordionContent extends BaseComponent {
    pcAccordion = inject(forwardRef(() => Accordion));

    pcAccordionPanel = inject(forwardRef(() => AccordionPanel));

    active = computed(() => this.pcAccordionPanel.active());

    ariaLabelledby = computed(() => `${this.pcAccordion.id()}_accordionheader_${this.pcAccordionPanel.value()}`);

    id = computed(() => `${this.pcAccordion.id()}_accordioncontent_${this.pcAccordionPanel.value()}`);
}

/**
 * AccordionTab is a helper component for Accordion.
 * @deprecated Use AccordionPanel, AccordionHeader, AccordionContent instead.
 * @group Components
 */
@Component({
    selector: 'p-accordionTab, p-accordion-tab',
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
            [attr.data-pc-section]="'accordionheader'"
            (click)="toggle($event)"
            (keydown)="onKeydown($event)"
            [ngClass]="headerStyleClass"
            [ngStyle]="headerStyle"
            [attr.tabindex]="disabled ? null : 0"
            [attr.id]="getTabHeaderActionId(id)"
            [attr.aria-controls]="getTabContentId(id)"
        >
            @if (!headerTemplate) {
                {{ header }}
            } @else {
                @if (headerTemplate) {
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                }
                @if (headerFacet) {
                    <ng-content select="p-header" />
                }
            }
            @if (iconTemplate) {
                <ng-template *ngTemplateOutlet="iconTemplate; context: { $implicit: selected }"></ng-template>
            } @else {
                <ng-container *ngIf="selected">
                    <span *ngIf="accordion.collapseIcon" [class]="accordion.collapseIcon" [ngClass]="iconClass" [attr.aria-hidden]="true"></span>
                    <ChevronDownIcon *ngIf="!accordion.collapseIcon" [ngClass]="iconClass" [attr.aria-hidden]="true" />
                </ng-container>
                <ng-container *ngIf="!selected">
                    <span *ngIf="accordion.expandIcon" [class]="accordion.expandIcon" [ngClass]="iconClass" [attr.aria-hidden]="true"></span>
                    <ChevronUpIcon *ngIf="!accordion.expandIcon" [ngClass]="iconClass" [attr.aria-hidden]="true" />
                </ng-container>
            }
        </button>
        <div
            [attr.id]="getTabContentId(id)"
            class="p-accordioncontent"
            [@tabContent]="selected ? { value: 'visible', params: { transitionParams: transitionOptions } } : { value: 'hidden', params: { transitionParams: transitionOptions } }"
            role="region"
            [attr.aria-hidden]="!selected"
            [attr.aria-labelledby]="getTabHeaderActionId(id)"
            [attr.data-pc-section]="'toggleablecontent'"
        >
            <div class="p-accordioncontent-content" [ngClass]="contentStyleClass" [ngStyle]="contentStyle">
                <ng-content />
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
    host: {
        '[class.p-accordionpanel]': 'true',
        '[class.p-accordionpanel-active]': 'selected',
        '[attr.data-pc-name]': '"accordiontab"'
    },
    providers: [AccordionStyle],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
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
    @Input() id: string | undefined = uuid('pn_id_');
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

    private _selected: boolean = false;

    get iconClass() {
        if (this.iconPos === 'end') {
            return 'p-accordionheader-toggle-icon icon-end';
        } else {
            return 'p-accordionheader-toggle-icon icon-start';
        }
    }
    /**
     * Content template for the content of the drawer.
     * @group Templates
     */
    @ContentChild('header') headerTemplate: TemplateRef<any> | undefined;
    /**
     * Header template for the header of the drawer.
     * @group Templates
     */
    @ContentChild('footer') footerTemplate: TemplateRef<any> | undefined;
    /**
     * Template for the header icon.
     * @group Templates
     */
    @ContentChild('icon') iconTemplate: TemplateRef<any> | undefined;
    /**
     * Content template for the footer of the drawer.
     * @group Templates
     */
    @ContentChild('content') contentTemplate: TemplateRef<any> | undefined;

    loaded: boolean = false;

    accordion = inject(forwardRef(() => Accordion)) as Accordion;

    _componentStyle = inject(AccordionStyle);

    ngOnInit() {
        super.ngOnInit();
        console.log('AccordionTab is deprecated as of v18, please use the new structure instead.');
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
            if (!this.accordion.multiple()) {
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
    template: ` <ng-content /> `,
    host: {
        '[class.p-accordion]': 'true',
        '[class.p-component]': 'true'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [AccordionStyle]
})
export class Accordion extends BaseComponent implements BlockableUI, AfterContentInit, OnDestroy {
    @HostBinding('class') get hostClass() {
        return this.styleClass;
    }

    @HostBinding('style') get hostStyle() {
        return this.style;
    }
    /**
     * Value of the active tab.
     * @defaultValue undefined
     * @group Props
     */
    value = model<undefined | null | string | number | string[] | number[]>(undefined);
    /**
     * When enabled, multiple tabs can be activated at the same time.
     * @defaultValue false
     * @group Props
     */
    multiple = input(false, { transform: (v: any) => transformToBoolean(v) });
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
     * When enabled, the focused tab is activated.
     * @defaultValue false
     * @group Props
     */
    selectOnFocus = input(false, { transform: (v: any) => transformToBoolean(v) });
    set activeIndex(val: number | number[] | null | undefined) {
        this._activeIndex = val;
        if (this.preventActiveIndexPropagation) {
            this.preventActiveIndexPropagation = false;
            return;
        }

        this.updateSelectionState();
    }
    /**
     * Transition options of the animation.
     * @group Props
     */
    @Input() transitionOptions: string = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
    /**
     * Returns the active index.
     * @param {number | number[]} value - New index.
     * @deprecated use native valueChange emitter of the value model.
     * @group Emits
     */
    @Output() activeIndexChange: EventEmitter<number | number[]> = new EventEmitter<number | number[]>();

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

    id = signal(uuid('pn_id_'));

    @ContentChildren(AccordionTab, { descendants: true }) tabList: QueryList<AccordionTab> | undefined;

    tabListSubscription: Subscription | null = null;

    private _activeIndex: any;

    private _headerAriaLevel: number = 2;

    preventActiveIndexPropagation: boolean = false;

    public tabs: AccordionTab[] = [];

    _componentStyle = inject(AccordionStyle);

    /**
     * Index of the active tab or an array of indexes in multiple mode.
     * @deprecated use value property with new architecture instead.
     * @group Props
     */
    @Input() get activeIndex(): number | number[] | null | undefined {
        return this._activeIndex;
    }

    /**
     * The aria-level that each accordion header will have. The default value is 2 as per W3C specifications
     * @deprecated use AccoridonHeader component and bind attribute to the host.
     * @group Props
     */
    @Input() get headerAriaLevel(): number {
        return this._headerAriaLevel;
    }

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

    onTabArrowDownKey(event) {
        const nextHeaderAction = this.findNextHeaderAction(event.target.parentElement);
        nextHeaderAction ? this.changeFocusedTab(nextHeaderAction) : this.onTabHomeKey(event);

        event.preventDefault();
    }

    onTabArrowUpKey(event) {
        const prevHeaderAction = this.findPrevHeaderAction(event.target.parentElement);
        prevHeaderAction ? this.changeFocusedTab(prevHeaderAction) : this.onTabEndKey(event);

        event.preventDefault();
    }

    onTabHomeKey(event) {
        const firstHeaderAction = this.findFirstHeaderAction();
        this.changeFocusedTab(firstHeaderAction);
        event.preventDefault();
    }

    changeFocusedTab(element) {
        if (element) {
            focus(element);

            if (this.selectOnFocus()) {
                this.tabs.forEach((tab, i) => {
                    let selected = this.multiple() ? this._activeIndex.includes(i) : i === this._activeIndex;

                    if (this.multiple()) {
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
        const headerElement = findSingle(nextTabElement, '[data-pc-section="accordionheader"]');

        return headerElement ? (getAttribute(headerElement, 'data-p-disabled') ? this.findNextHeaderAction(headerElement.parentElement) : findSingle(headerElement.parentElement, '[data-pc-section="accordionheader"]')) : null;
    }

    findPrevHeaderAction(tabElement, selfCheck = false) {
        const prevTabElement = selfCheck ? tabElement : tabElement.previousElementSibling;
        const headerElement = findSingle(prevTabElement, '[data-pc-section="accordionheader"]');

        return headerElement ? (getAttribute(headerElement, 'data-p-disabled') ? this.findPrevHeaderAction(headerElement.parentElement) : findSingle(headerElement.parentElement, '[data-pc-section="accordionheader"]')) : null;
    }

    findFirstHeaderAction() {
        const firstEl = this.el.nativeElement.firstElementChild;
        return this.findNextHeaderAction(firstEl, true);
    }

    findLastHeaderAction() {
        const lastEl = this.el.nativeElement.lastElementChild;
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
                let selected = this.multiple() ? this._activeIndex.includes(i) : i === this._activeIndex;
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
        return this.multiple() ? this._activeIndex && (<number[]>this._activeIndex).includes(index) : this._activeIndex === index;
    }

    getTabProp(tab, name) {
        return tab.props ? tab.props[name] : undefined;
    }

    updateActiveIndex() {
        let index: number | number[] | null = this.multiple() ? [] : null;
        this.tabs.forEach((tab, i) => {
            if (tab.selected) {
                if (this.multiple()) {
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

    updateValue(value: string | number) {
        const currentValue = this.value();
        if (this.multiple()) {
            const newValue = Array.isArray(currentValue) ? [...currentValue] : [];
            const index = newValue.indexOf(value);

            if (index !== -1) {
                newValue.splice(index, 1);
            } else {
                newValue.push(value);
            }

            this.value.set(newValue as typeof this.value extends (...args: any) => infer R ? R : never);
        } else {
            if (currentValue === value) {
                this.value.set(undefined);
            } else {
                this.value.set(value);
            }
        }
    }

    ngOnDestroy() {
        if (this.tabListSubscription) {
            this.tabListSubscription.unsubscribe();
        }

        super.ngOnDestroy();
    }
}

@NgModule({
    imports: [Accordion, AccordionTab, SharedModule, AccordionPanel, AccordionHeader, AccordionContent],
    exports: [Accordion, AccordionTab, SharedModule, AccordionPanel, AccordionHeader, AccordionContent]
})
export class AccordionModule {}
