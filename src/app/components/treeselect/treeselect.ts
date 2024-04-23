import { AnimationEvent } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    NgModule,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayOptions, OverlayService, PrimeNGConfig, PrimeTemplate, ScrollerOptions, SharedModule, TreeNode } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { SearchIcon } from 'primeng/icons/search';
import { TimesIcon } from 'primeng/icons/times';
import { Overlay, OverlayModule } from 'primeng/overlay';
import { RippleModule } from 'primeng/ripple';
import { Tree, TreeModule, TreeNodeSelectEvent, TreeNodeUnSelectEvent } from 'primeng/tree';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';
import { Nullable } from 'primeng/ts-helpers';
import { AutoFocusModule } from 'primeng/autofocus';
import { TreeSelectNodeCollapseEvent, TreeSelectNodeExpandEvent } from './treeselect.interface';

export const TREESELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TreeSelect),
    multi: true
};
/**
 * TreeSelect is a form component to choose from hierarchical data.
 * @group Components
 */
@Component({
    selector: 'p-treeSelect',
    template: `
        <div #container [ngClass]="containerClass()" [class]="containerStyleClass" [ngStyle]="containerStyle" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input
                    #focusInput
                    type="text"
                    role="combobox"
                    [attr.id]="inputId"
                    readonly
                    [disabled]="disabled"
                    (focus)="onFocus()"
                    (blur)="onBlur()"
                    (keydown)="onKeyDown($event)"
                    [attr.tabindex]="!disabled ? tabindex : -1"
                    [attr.aria-controls]="overlayVisible ? listId : null"
                    [attr.aria-haspopup]="'tree'"
                    [attr.aria-expanded]="overlayVisible ?? false"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    [attr.aria-label]="ariaLabel || (label === 'p-emptylabel' ? undefined : label)"
                    pAutoFocus
                    [autofocus]="autofocus"
                />
            </div>
            <div class="p-treeselect-label-container">
                <div [ngClass]="labelClass()" [class]="labelStyleClass" [ngStyle]="labelStyle">
                    <ng-container *ngIf="valueTemplate; else defaultValueTemplate">
                        <ng-container *ngTemplateOutlet="valueTemplate; context: { $implicit: value, placeholder: placeholder }"></ng-container>
                    </ng-container>
                    <ng-template #defaultValueTemplate>
                        <ng-container *ngIf="display === 'comma'; else chipsValueTemplate">
                            {{ label || 'empty' }}
                        </ng-container>
                        <ng-template #chipsValueTemplate>
                            <div *ngFor="let node of value" class="p-treeselect-token">
                                <span class="p-treeselect-token-label">{{ node.label }}</span>
                            </div>
                            <ng-container *ngIf="emptyValue">{{ placeholder || 'empty' }}</ng-container>
                        </ng-template>
                    </ng-template>
                </div>
                <ng-container *ngIf="checkValue() && !disabled && showClear">
                    <TimesIcon *ngIf="!clearIconTemplate" [styleClass]="'p-treeselect-clear-icon'" (click)="clear($event)" />
                    <span *ngIf="clearIconTemplate" class="p-treeselect-clear-icon" (click)="clear($event)">
                        <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                    </span>
                </ng-container>
            </div>
            <div class="p-treeselect-trigger" role="button" aria-haspopup="tree" [attr.aria-expanded]="overlayVisible ?? false" [attr.aria-label]="'treeselect trigger'">
                <ChevronDownIcon *ngIf="!triggerIconTemplate" [styleClass]="'p-treeselect-trigger-icon'" />
                <span *ngIf="triggerIconTemplate" class="p-treeselect-trigger-icon">
                    <ng-template *ngTemplateOutlet="triggerIconTemplate"></ng-template>
                </span>
            </div>
            <p-overlay
                #overlay
                [(visible)]="overlayVisible"
                [options]="overlayOptions"
                [target]="'@parent'"
                [appendTo]="appendTo"
                [showTransitionOptions]="showTransitionOptions"
                [hideTransitionOptions]="hideTransitionOptions"
                (onAnimationStart)="onOverlayAnimationStart($event)"
                (onBeforeHide)="onOverlayBeforeHide($event)"
                (onShow)="onShow.emit($event)"
                (onHide)="hide($event)"
            >
                <ng-template pTemplate="content">
                    <div #panel [attr.id]="listId" class="p-treeselect-panel p-component" [ngStyle]="panelStyle" [class]="panelStyleClass" [ngClass]="panelClass">
                        <span
                            #firstHiddenFocusableEl
                            role="presentation"
                            class="p-hidden-accessible p-hidden-focusable"
                            [attr.tabindex]="0"
                            (focus)="onFirstHiddenFocus($event)"
                            [attr.data-p-hidden-accessible]="true"
                            [attr.data-p-hidden-focusable]="true"
                        >
                        </span>
                        <ng-container *ngTemplateOutlet="headerTemplate; context: { $implicit: value, options: options }"></ng-container>
                        <div class="p-treeselect-header" *ngIf="filter" (keydown.arrowdown)="onArrowDown($event)">
                            <div class="p-treeselect-filter-container">
                                <input
                                    #filter
                                    type="text"
                                    autocomplete="off"
                                    class="p-treeselect-filter p-inputtext p-component"
                                    [attr.placeholder]="filterPlaceholder"
                                    (keydown.enter)="$event.preventDefault()"
                                    (input)="onFilterInput($event)"
                                    [value]="filterValue"
                                />
                                <SearchIcon *ngIf="!filterIconTemplate" [styleClass]="'p-treeselect-filter-icon'" />
                                <span *ngIf="filterIconTemplate" class="p-treeselect-filter-icon">
                                    <ng-template *ngTemplateOutlet="filterIconTemplate"></ng-template>
                                </span>
                            </div>
                            <button class="p-treeselect-close p-link" (click)="hide()">
                                <TimesIcon *ngIf="!closeIconTemplate" />
                                <span *ngIf="closeIconTemplate">
                                    <ng-template *ngTemplateOutlet="closeIconTemplate"></ng-template>
                                </span>
                            </button>
                        </div>
                        <div class="p-treeselect-items-wrapper" [ngStyle]="{ 'max-height': scrollHeight }">
                            <p-tree
                                #tree
                                [value]="options"
                                [propagateSelectionDown]="propagateSelectionDown"
                                [propagateSelectionUp]="propagateSelectionUp"
                                [selectionMode]="selectionMode"
                                (selectionChange)="onSelectionChange($event)"
                                [selection]="value"
                                [metaKeySelection]="metaKeySelection"
                                (onNodeExpand)="nodeExpand($event)"
                                (onNodeCollapse)="nodeCollapse($event)"
                                (onNodeSelect)="onSelect($event)"
                                [emptyMessage]="emptyMessage"
                                (onNodeUnselect)="onUnselect($event)"
                                [filterBy]="filterBy"
                                [filterMode]="filterMode"
                                [filterPlaceholder]="filterPlaceholder"
                                [filterLocale]="filterLocale"
                                [filteredNodes]="filteredNodes"
                                [virtualScroll]="virtualScroll"
                                [virtualScrollItemSize]="virtualScrollItemSize"
                                [virtualScrollOptions]="virtualScrollOptions"
                                [_templateMap]="templateMap"
                            >
                                <ng-container *ngIf="emptyTemplate">
                                    <ng-template pTemplate="empty">
                                        <ng-container *ngTemplateOutlet="emptyTemplate"></ng-container>
                                    </ng-template>
                                </ng-container>
                                <ng-template pTemplate="togglericon" let-expanded *ngIf="itemTogglerIconTemplate">
                                    <ng-container *ngTemplateOutlet="itemTogglerIconTemplate; context: { $implicit: expanded }"></ng-container>
                                </ng-template>
                                <ng-template pTemplate="checkboxicon" let-selected let-partialSelected="partialSelected" *ngIf="itemCheckboxIconTemplate">
                                    <ng-container *ngTemplateOutlet="itemCheckboxIconTemplate; context: { $implicit: selected, partialSelected: partialSelected }"></ng-container>
                                </ng-template>
                                <ng-template pTemplate="loadingicon" *ngIf="itemLoadingIconTemplate">
                                    <ng-container *ngTemplateOutlet="itemLoadingIconTemplate"></ng-container>
                                </ng-template>
                            </p-tree>
                        </div>
                        <ng-container *ngTemplateOutlet="footerTemplate; context: { $implicit: value, options: options }"></ng-container>
                        <span
                            #lastHiddenFocusableEl
                            role="presentation"
                            class="p-hidden-accessible p-hidden-focusable"
                            [attr.tabindex]="0"
                            (focus)="onLastHiddenFocus($event)"
                            [attr.data-p-hidden-accessible]="true"
                            [attr.data-p-hidden-focusable]="true"
                        ></span>
                    </div>
                </ng-template>
            </p-overlay>
        </div>
    `,
    styleUrls: ['./treeselect.css'],
    host: {
        class: 'p-element p-inputwrapper',
        '[class.p-inputwrapper-filled]': '!emptyValue',
        '[class.p-inputwrapper-focus]': 'focused',
        '[class.p-treeselect-clearable]': 'showClear && !disabled'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TREESELECT_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None
})
export class TreeSelect implements AfterContentInit {
    /**
     * Identifier of the underlying input element.
     * @group Props
     */
    @Input() inputId: string | undefined;
    /**
     * Height of the viewport, a scrollbar is defined if height of list exceeds this value.
     * @group Props
     */
    @Input() scrollHeight: string = '400px';
    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) disabled: boolean | undefined;
    /**
     * Defines how multiple items can be selected, when true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) metaKeySelection: boolean = false;
    /**
     * Defines how the selected items are displayed.
     * @group Props
     */
    @Input() display: 'comma' | 'chip' = 'comma';
    /**
     * Defines the selection mode.
     * @group Props
     */
    @Input() selectionMode: 'single' | 'multiple' | 'checkbox' = 'single';
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    @Input() tabindex: string | undefined = '0';
    /**
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    @Input() ariaLabel: string | undefined;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    @Input() ariaLabelledBy: string | undefined;
    /**
     * Label to display when there are no selections.
     * @group Props
     */
    @Input() placeholder: string | undefined;
    /**
     * Style class of the overlay panel.
     * @group Props
     */
    @Input() panelClass: string | string[] | Set<string> | { [klass: string]: any } | undefined;
    /**
     * Inline style of the panel element.
     * @group Props
     */
    @Input() panelStyle: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the panel element.
     * @group Props
     */
    @Input() panelStyleClass: string | undefined;
    /**
     * Inline style of the container element.
     * @group Props
     */
    @Input() containerStyle: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the container element.
     * @group Props
     */
    @Input() containerStyleClass: string | undefined;
    /**
     * Inline style of the label element.
     * @group Props
     */
    @Input() labelStyle: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the label element.
     * @group Props
     */
    @Input() labelStyleClass: string | undefined;
    /**
     * Specifies the options for the overlay.
     * @group Props
     */
    @Input() overlayOptions: OverlayOptions | undefined;
    /**
     * Text to display when there are no options available. Defaults to value from PrimeNG locale configuration.
     * @group Props
     */
    @Input() emptyMessage: string = '';
    /**
     * A valid query selector or an HTMLElement to specify where the overlay gets attached. Special keywords are "body" for document body and "self" for the element itself.
     * @group Props
     */
    @Input() appendTo: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any;
    /**
     * When specified, displays an input field to filter the items.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) filter: boolean = false;
    /**
     * When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.
     * @group Props
     */
    @Input() filterBy: string = 'label';
    /**
     * Mode for filtering valid values are "lenient" and "strict". Default is lenient.
     * @group Props
     */
    @Input() filterMode: string = 'lenient';
    /**
     * Placeholder text to show when filter input is empty.
     * @group Props
     */
    @Input() filterPlaceholder: string | undefined;
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    @Input() filterLocale: string | undefined;
    /**
     * Determines whether the filter input should be automatically focused when the component is rendered.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) filterInputAutoFocus: boolean = true;
    /**
     * Whether checkbox selections propagate to descendant nodes.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) propagateSelectionDown: boolean = true;
    /**
     * Whether checkbox selections propagate to ancestor nodes.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) propagateSelectionUp: boolean = true;
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showClear: boolean = false;
    /**
     * Clears the filter value when hiding the dropdown.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) resetFilterOnHide: boolean = true;
    /**
     * Whether the data should be loaded on demand during scroll.
     * @group Props
     */
    @Input() virtualScroll: boolean | undefined;
    /**
     * Height of an item in the list for VirtualScrolling.
     * @group Props
     */
    @Input() virtualScrollItemSize: number | undefined;
    /**
     * Whether to use the scroller feature. The properties of scroller component can be used like an object in it.
     * @group Props
     */
    @Input() virtualScrollOptions: ScrollerOptions | undefined;
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autofocus: boolean | undefined;
    /**
     * An array of treenodes.
     * @defaultValue undefined
     * @group Props
     */
    @Input() get options(): TreeNode[] | undefined {
        return this._options;
    }
    set options(options: TreeNode[] | undefined) {
        this._options = options;
        this.updateTreeState();
    }
    /**
     * Transition options of the show animation.
     * @group Props
     * @deprecated since v14.2.0 use overlayOptions property instead.
     */
    @Input() get showTransitionOptions(): string | undefined {
        return this._showTransitionOptions;
    }
    set showTransitionOptions(val: string | undefined) {
        this._showTransitionOptions = val;
        console.warn('The showTransitionOptions property is deprecated since v14.2.0, use overlayOptions property instead.');
    }
    /**
     * Transition options of the hide animation.
     * @group Props
     * @deprecated since v14.2.0 use overlayOptions property instead.
     */
    @Input() get hideTransitionOptions(): string | undefined {
        return this._hideTransitionOptions;
    }
    set hideTransitionOptions(val: string | undefined) {
        this._hideTransitionOptions = val;
        console.warn('The hideTransitionOptions property is deprecated since v14.2.0, use overlayOptions property instead.');
    }
    /**
     * Callback to invoke when a node is expanded.
     * @param {TreeSelectNodeExpandEvent} event - Custom node expand event.
     * @group Emits
     */
    @Output() onNodeExpand: EventEmitter<TreeSelectNodeExpandEvent> = new EventEmitter<TreeSelectNodeExpandEvent>();
    /**
     * Callback to invoke when a node is collapsed.
     * @param {TreeSelectNodeCollapseEvent} event - Custom node collapse event.
     * @group Emits
     */
    @Output() onNodeCollapse: EventEmitter<TreeSelectNodeCollapseEvent> = new EventEmitter<TreeSelectNodeCollapseEvent>();
    /**
     * Callback to invoke when the overlay is shown.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onShow: EventEmitter<Event> = new EventEmitter<Event>();
    /**
     * Callback to invoke when the overlay is hidden.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onHide: EventEmitter<Event> = new EventEmitter<Event>();
    /**
     * Callback to invoke when input field is cleared.
     * @group Emits
     */
    @Output() onClear: EventEmitter<any> = new EventEmitter<any>();
    /**
     * Callback to invoke when data is filtered.
     * @group Emits
     */
    @Output() onFilter: EventEmitter<any> = new EventEmitter<any>();
    /**
     * Callback to invoke when a node is unselected.
     * @param {TreeNodeUnSelectEvent} event - node unselect event.
     * @group Emits
     */
    @Output() onNodeUnselect: EventEmitter<TreeNodeUnSelectEvent> = new EventEmitter<TreeNodeUnSelectEvent>();
    /**
     * Callback to invoke when a node is selected.
     * @param {TreeNodeSelectEvent} event - node select event.
     * @group Emits
     */
    @Output() onNodeSelect: EventEmitter<TreeNodeSelectEvent> = new EventEmitter<TreeNodeSelectEvent>();

    _showTransitionOptions: string | undefined;

    _hideTransitionOptions: string | undefined;

    @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<PrimeTemplate>>;

    @ViewChild('container') containerEl: Nullable<ElementRef>;

    @ViewChild('focusInput') focusInput: Nullable<ElementRef>;

    @ViewChild('filter') filterViewChild: Nullable<ElementRef>;

    @ViewChild('tree') treeViewChild: Nullable<Tree>;

    @ViewChild('panel') panelEl: Nullable<ElementRef>;

    @ViewChild('overlay') overlayViewChild: Nullable<Overlay>;

    @ViewChild('firstHiddenFocusableEl') firstHiddenFocusableElementOnOverlay: Nullable<ElementRef>;

    @ViewChild('lastHiddenFocusableEl') lastHiddenFocusableElementOnOverlay: Nullable<ElementRef>;

    public filteredNodes: TreeNode[] | undefined | null;

    filterValue: Nullable<string> = null;

    serializedValue: Nullable<any[]>;

    valueTemplate: Nullable<TemplateRef<any>>;

    headerTemplate: Nullable<TemplateRef<any>>;

    emptyTemplate: Nullable<TemplateRef<any>>;

    footerTemplate: Nullable<TemplateRef<any>>;

    clearIconTemplate: Nullable<TemplateRef<any>>;

    triggerIconTemplate: Nullable<TemplateRef<any>>;

    filterIconTemplate: Nullable<TemplateRef<any>>;

    closeIconTemplate: Nullable<TemplateRef<any>>;

    itemTogglerIconTemplate: Nullable<TemplateRef<any>>;

    itemCheckboxIconTemplate: Nullable<TemplateRef<any>>;

    itemLoadingIconTemplate: Nullable<TemplateRef<any>>;

    focused: Nullable<boolean>;

    overlayVisible: Nullable<boolean>;

    selfChange: Nullable<boolean>;

    value: any | undefined;

    expandedNodes: any[] = [];

    _options: TreeNode[] | undefined;

    public templateMap: any;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    listId: string = '';

    constructor(public config: PrimeNGConfig, public cd: ChangeDetectorRef, public el: ElementRef, public overlayService: OverlayService) {}

    ngOnInit() {
        this.listId = UniqueComponentId() + '_list';
        this.updateTreeState();
    }

    ngAfterContentInit() {
        if ((this.templates as QueryList<PrimeTemplate>).length) {
            this.templateMap = {};
        }

        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'value':
                    this.valueTemplate = item.template;
                    break;

                case 'header':
                    this.headerTemplate = item.template;
                    break;

                case 'empty':
                    this.emptyTemplate = item.template;
                    break;

                case 'footer':
                    this.footerTemplate = item.template;
                    break;

                case 'clearicon':
                    this.clearIconTemplate = item.template;
                    break;

                case 'triggericon':
                    this.triggerIconTemplate = item.template;
                    break;

                case 'filtericon':
                    this.filterIconTemplate = item.template;
                    break;

                case 'closeicon':
                    this.closeIconTemplate = item.template;
                    break;

                case 'itemtogglericon':
                    this.itemTogglerIconTemplate = item.template;
                    break;

                case 'itemcheckboxicon':
                    this.itemCheckboxIconTemplate = item.template;
                    break;

                case 'itemloadingicon':
                    this.itemLoadingIconTemplate = item.template;
                    break;

                default: //TODO: @deprecated Used "value" template instead
                    if (item.name) this.templateMap[item.name] = item.template;
                    else this.valueTemplate = item.template;
                    break;
            }
        });
    }

    onOverlayAnimationStart(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
                if (this.filter) {
                    ObjectUtils.isNotEmpty(this.filterValue) && this.treeViewChild?._filter(<any>this.filterValue);
                    this.filterInputAutoFocus && this.filterViewChild?.nativeElement.focus();
                } else {
                    let focusableElements = DomHandler.getFocusableElements(this.panelEl.nativeElement);

                    if (focusableElements && focusableElements.length > 0) {
                        focusableElements[0].focus();
                    }
                }
                break;
        }
    }

    onOverlayBeforeHide(event: Event) {
        let focusableElements = DomHandler.getFocusableElements(this.containerEl.nativeElement);

        if (focusableElements && focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    }

    onSelectionChange(event: Event) {
        this.value = event;
        this.onModelChange(this.value);
        this.cd.markForCheck();
    }

    onClick(event: Event) {
        if (this.disabled) {
            return;
        }

        if (
            !this.overlayViewChild?.el?.nativeElement?.contains(event.target) &&
            !DomHandler.hasClass(event.target, 'p-treeselect-close') &&
            !DomHandler.hasClass(event.target, 'p-checkbox-box') &&
            !DomHandler.hasClass(event.target, 'p-checkbox-icon')
        ) {
            if (this.overlayVisible) {
                this.hide();
            } else {
                this.show();
            }

            this.focusInput?.nativeElement.focus();
        }
    }

    onKeyDown(event: KeyboardEvent) {
        switch (event.code) {
            //down
            case 'ArrowDown':
                if (!this.overlayVisible) {
                    this.show();
                    event.preventDefault();
                }
                this.onArrowDown(event);
                event.preventDefault();
                break;

            //space
            case 'Space':
            case 'Enter':
                if (!this.overlayVisible) {
                    this.show();
                    event.preventDefault();
                }
                break;

            //escape
            case 'Escape':
                if (this.overlayVisible) {
                    this.hide();
                    this.focusInput?.nativeElement.focus();
                    event.preventDefault();
                }
                break;

            //tab
            case 'Tab':
                this.onTabKey(event);
                break;

            default:
                break;
        }
    }

    onFilterInput(event: Event) {
        this.filterValue = (event.target as HTMLInputElement).value;
        this.treeViewChild?._filter(this.filterValue);
        this.onFilter.emit({
            originalEvent: event,
            filteredValue: this.treeViewChild?.filteredNodes
        });
        setTimeout(() => {
            this.overlayViewChild.alignOverlay();
        });
    }

    onArrowDown(event: KeyboardEvent) {
        if (this.overlayVisible && this.panelEl?.nativeElement) {
            let focusableElements = DomHandler.getFocusableElements(this.panelEl.nativeElement, '.p-treenode');

            if (focusableElements && focusableElements.length > 0) {
                focusableElements[0].focus();
            }

            event.preventDefault();
        }
    }

    onFirstHiddenFocus(event) {
        const focusableEl =
            event.relatedTarget === this.focusInput?.nativeElement ? DomHandler.getFirstFocusableElement(this.overlayViewChild?.overlayViewChild?.nativeElement, ':not([data-p-hidden-focusable="true"])') : this.focusInput?.nativeElement;

        DomHandler.focus(focusableEl);
    }

    onLastHiddenFocus(event) {
        const focusableEl =
            event.relatedTarget === this.focusInput?.nativeElement ? DomHandler.getLastFocusableElement(this.overlayViewChild?.overlayViewChild?.nativeElement, ':not([data-p-hidden-focusable="true"])') : this.focusInput?.nativeElement;

        DomHandler.focus(focusableEl);
    }

    show() {
        this.overlayVisible = true;
    }

    hide(event?: any) {
        this.overlayVisible = false;
        this.resetFilter();

        this.onHide.emit(event);
        this.cd.markForCheck();
    }

    clear(event: Event) {
        this.value = null;
        this.resetExpandedNodes();
        this.resetPartialSelected();
        this.onModelChange(this.value);
        this.onClear.emit();

        event.stopPropagation();
    }

    checkValue() {
        return this.value !== null && ObjectUtils.isNotEmpty(this.value);
    }

    onTabKey(event, pressedInInputText = false) {
        if (!pressedInInputText) {
            if (this.overlayVisible && this.hasFocusableElements()) {
                DomHandler.focus(event.shiftKey ? this.lastHiddenFocusableElementOnOverlay.nativeElement : this.firstHiddenFocusableElementOnOverlay.nativeElement);

                event.preventDefault();
            } else {
                this.overlayVisible && this.hide(this.filter);
            }
        }
    }

    hasFocusableElements() {
        return DomHandler.getFocusableElements(this.overlayViewChild.overlayViewChild.nativeElement, ':not([data-p-hidden-focusable="true"])').length > 0;
    }

    resetFilter() {
        if (this.filter && !this.resetFilterOnHide) {
            this.filteredNodes = this.treeViewChild?.filteredNodes;
            this.treeViewChild?.resetFilter();
        } else {
            this.filterValue = null;
        }
    }

    updateTreeState() {
        if (this.value) {
            let selectedNodes = this.selectionMode === 'single' ? [this.value] : [...this.value];
            this.resetExpandedNodes();
            this.resetPartialSelected();
            if (selectedNodes && this.options) {
                this.updateTreeBranchState(null, null, selectedNodes);
            }
        }
    }

    updateTreeBranchState(node: TreeNode | null, path: any, selectedNodes: TreeNode[]) {
        if (node) {
            if (this.isSelected(node)) {
                this.expandPath(path);
                selectedNodes.splice(selectedNodes.indexOf(node), 1);
            }

            if (selectedNodes.length > 0 && node.children) {
                for (let childNode of node.children) {
                    this.updateTreeBranchState(childNode, [...path, node], selectedNodes);
                }
            }
        } else {
            for (let childNode of this.options as TreeNode[]) {
                this.updateTreeBranchState(childNode, [], selectedNodes);
            }
        }
    }

    expandPath(expandedNodes: TreeNode[]) {
        for (let node of expandedNodes) {
            node.expanded = true;
        }

        this.expandedNodes = [...expandedNodes];
    }

    nodeExpand(event: { originalEvent: Event; node: TreeNode }) {
        this.onNodeExpand.emit(event);
        this.expandedNodes.push(event.node);
    }

    nodeCollapse(event: { originalEvent: Event; node: TreeNode }) {
        this.onNodeCollapse.emit(event);
        this.expandedNodes.splice(this.expandedNodes.indexOf(event.node), 1);
    }

    resetExpandedNodes() {
        for (let node of this.expandedNodes) {
            node.expanded = false;
        }

        this.expandedNodes = [];
    }

    resetPartialSelected(nodes = this.options): void {
        if (!nodes) {
            return;
        }

        for (let node of nodes) {
            node.partialSelected = false;

            if (node.children && node.children?.length > 0) {
                this.resetPartialSelected(node.children);
            }
        }
    }

    findSelectedNodes(node: TreeNode, keys: any[], selectedNodes: TreeNode[]) {
        if (node) {
            if (this.isSelected(node)) {
                selectedNodes.push(node);
                delete keys[node.key as any];
            }

            if (Object.keys(keys).length && node.children) {
                for (let childNode of node.children) {
                    this.findSelectedNodes(childNode, keys, selectedNodes);
                }
            }
        } else {
            for (let childNode of this.options as TreeNode[]) {
                this.findSelectedNodes(childNode, keys, selectedNodes);
            }
        }
    }

    isSelected(node: TreeNode) {
        return this.findIndexInSelection(node) != -1;
    }

    findIndexInSelection(node: TreeNode) {
        let index: number = -1;

        if (this.value) {
            if (this.selectionMode === 'single') {
                let areNodesEqual = (this.value.key && this.value.key === node.key) || this.value == node;
                index = areNodesEqual ? 0 : -1;
            } else {
                for (let i = 0; i < this.value.length; i++) {
                    let selectedNode = this.value[i];
                    let areNodesEqual = (selectedNode.key && selectedNode.key === node.key) || selectedNode == node;
                    if (areNodesEqual) {
                        index = i;
                        break;
                    }
                }
            }
        }

        return index;
    }

    onSelect(event: TreeNodeSelectEvent) {
        this.onNodeSelect.emit(event);

        if (this.selectionMode === 'single') {
            // this.hide();
            this.focusInput?.nativeElement.focus();
        }
    }

    onUnselect(event: TreeNodeUnSelectEvent) {
        this.onNodeUnselect.emit(event);
    }

    onFocus() {
        this.focused = true;
    }

    onBlur() {
        this.focused = false;
    }

    writeValue(value: any): void {
        this.value = value;
        this.updateTreeState();
        this.cd.markForCheck();
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    setDisabledState(val: boolean): void {
        setTimeout(() => {
            this.disabled = val;
        });
        this.cd.markForCheck();
    }

    containerClass() {
        return {
            'p-treeselect p-component p-inputwrapper': true,
            'p-treeselect-chip': this.display === 'chip',
            'p-disabled': this.disabled,
            'p-focus': this.focused
        };
    }

    labelClass() {
        return {
            'p-treeselect-label': true,
            'p-placeholder': this.label === this.placeholder,
            'p-treeselect-label-empty': !this.placeholder && this.emptyValue
        };
    }

    get emptyValue() {
        return !this.value || Object.keys(this.value).length === 0;
    }

    get emptyOptions() {
        return !this.options || this.options.length === 0;
    }

    get label() {
        let value = this.value || [];
        return value.length ? value.map((node: TreeNode) => node.label).join(', ') : this.selectionMode === 'single' && this.value ? value.label : this.placeholder;
    }
}

@NgModule({
    imports: [CommonModule, OverlayModule, RippleModule, SharedModule, TreeModule, AutoFocusModule, SearchIcon, TimesIcon, ChevronDownIcon],
    exports: [TreeSelect, OverlayModule, SharedModule, TreeModule],
    declarations: [TreeSelect]
})
export class TreeSelectModule {}
