import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Inject, Input, NgModule, OnDestroy, Output, QueryList, TemplateRef, ViewEncapsulation, forwardRef } from '@angular/core';
import { BlockableUI, Header, PrimeTemplate, SharedModule } from 'primeng/api';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { Subscription } from 'rxjs';
import { AccordionTabCloseEvent, AccordionTabOpenEvent } from './accordion.interface';

let idx: number = 0;

@Component({
    selector: 'p-accordionTab',
    template: `
        <div class="p-accordion-tab" [class.p-accordion-tab-active]="selected" [ngClass]="tabStyleClass" [ngStyle]="tabStyle">
            <div class="p-accordion-header" [class.p-highlight]="selected" [class.p-disabled]="disabled">
                <a
                    [ngClass]="headerStyleClass"
                    [style]="headerStyle"
                    role="tab"
                    class="p-accordion-header-link"
                    (click)="toggle($event)"
                    (keydown)="onKeydown($event)"
                    [attr.tabindex]="disabled ? null : 0"
                    [attr.id]="id"
                    [attr.aria-controls]="id + '-content'"
                    [attr.aria-expanded]="selected"
                >
                    <ng-container *ngIf="!iconTemplate">
                        <ng-container *ngIf="selected">
                            <span *ngIf="accordion.collapseIcon" [class]="accordion.collapseIcon" [ngClass]="iconClass"></span>
                            <ChevronDownIcon *ngIf="!accordion.collapseIcon" [styleClass]="iconClass" />
                        </ng-container>
                        <ng-container *ngIf="!selected">
                            <span *ngIf="accordion.expandIcon" [class]="accordion.expandIcon" [ngClass]="iconClass"></span>
                            <ChevronRightIcon *ngIf="!accordion.expandIcon" [styleClass]="iconClass" />
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
                [attr.id]="id + '-content'"
                class="p-toggleable-content"
                [@tabContent]="selected ? { value: 'visible', params: { transitionParams: transitionOptions } } : { value: 'hidden', params: { transitionParams: transitionOptions } }"
                role="region"
                [attr.aria-hidden]="!selected"
                [attr.aria-labelledby]="id"
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
                    height: '0'
                })
            ),
            state(
                'visible',
                style({
                    height: '*'
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
    @Input() disabled: boolean | undefined;
    /**
     * Whether a lazy loaded panel should avoid getting loaded again on reselection.
     * @group Props
     */
    @Input() cache: boolean = true;
    /**
     * Transition options of the animation.
     * @group Props
     */
    @Input() transitionOptions: string = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
    /**
     * Position of the icon, valid values are "end", "start".
     * @group Props
     */
    @Input() iconPos: string = 'start';
    /**
     * Event triggered by changing the choice
     * @group Emits
     */
    @Output() selectedChange: EventEmitter<boolean> = new EventEmitter();

    @ContentChildren(Header) headerFacet!: QueryList<Header>;

    @ContentChildren(PrimeTemplate) templates!: QueryList<PrimeTemplate>;

    private _selected: boolean = false;

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

    id: string = `p-accordiontab-${idx++}`;

    loaded: boolean = false;

    accordion: Accordion;

    constructor(@Inject(forwardRef(() => Accordion)) accordion: Accordion, public changeDetector: ChangeDetectorRef) {
        this.accordion = accordion as Accordion;
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

    toggle(event: MouseEvent | KeyboardEvent) {
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

        event.preventDefault();
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
        if (event.which === 32 || event.which === 13) {
            this.toggle(event);
            event.preventDefault();
        }
    }

    ngOnDestroy() {
        this.accordion.tabs.splice(this.findTabIndex(), 1);
    }
}

@Component({
    selector: 'p-accordion',
    template: `
        <div [ngClass]="'p-accordion p-component'" [ngStyle]="style" [class]="styleClass" role="tablist">
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
    @Input() multiple: boolean = false;
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
     * Callback to invoke when an active tab is collapsed by clicking on the header.
     * @group Emits
     */
    @Output() onClose: EventEmitter<AccordionTabCloseEvent> = new EventEmitter();
    /**
     * Callback to invoke when a tab gets expanded.
     * @group Emits
     */
    @Output() onOpen: EventEmitter<AccordionTabOpenEvent> = new EventEmitter();
    /**
     * Returns the active index.
     * @group Emits
     */
    @Output() activeIndexChange: EventEmitter<number | number[] | null> = new EventEmitter();

    @ContentChildren(AccordionTab) tabList: QueryList<AccordionTab> | undefined;

    tabListSubscription: Subscription | null = null;

    private _activeIndex: number | number[] | null | undefined;

    preventActiveIndexPropagation: boolean = false;

    public tabs: AccordionTab[] = [];

    constructor(public el: ElementRef, public changeDetector: ChangeDetectorRef) {}

    ngAfterContentInit() {
        this.initTabs();

        this.tabListSubscription = (this.tabList as QueryList<AccordionTab>).changes.subscribe((_) => {
            this.initTabs();
        });
    }

    initTabs() {
        this.tabs = (this.tabList as QueryList<AccordionTab>).toArray();
        this.updateSelectionState();
        this.changeDetector.markForCheck();
    }

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

    updateSelectionState() {
        if (this.tabs && this.tabs.length && this._activeIndex != null) {
            for (let i = 0; i < this.tabs.length; i++) {
                let selected = this.multiple ? (this._activeIndex as number[]).includes(i) : i === this._activeIndex;
                let changed = selected !== this.tabs[i].selected;

                if (changed) {
                    this.tabs[i].selected = selected;
                    this.tabs[i].selectedChange.emit(selected);
                    this.tabs[i].changeDetector.markForCheck();
                }
            }
        }
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
        this.activeIndexChange.emit(index);
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
