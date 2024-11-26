import { AnimationEvent } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, ContentChild, ElementRef, EventEmitter, forwardRef, inject, Input, NgModule, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { focus, getFirstFocusableElement, getFocusableElements, getLastFocusableElement, hasClass, isNotEmpty, uuid } from '@primeuix/utils';
import { OverlayOptions, ScrollerOptions, SharedModule, TreeNode } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { BaseComponent } from 'primeng/basecomponent';
import { Chip } from 'primeng/chip';
import { ChevronDownIcon, SearchIcon, TimesIcon } from 'primeng/icons';
import { InputText } from 'primeng/inputtext';
import { Overlay } from 'primeng/overlay';
import { Ripple } from 'primeng/ripple';
import { Tree, TreeFilterEvent, TreeNodeSelectEvent, TreeNodeUnSelectEvent } from 'primeng/tree';
import { Nullable } from 'primeng/ts-helpers';
import { TreeSelectStyle } from './style/treeselectstyle';
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
    selector: 'p-treeSelect, p-treeselect, p-tree-select',
    standalone: true,
    imports: [CommonModule, Overlay, SharedModule, Ripple, InputText, Tree, AutoFocus, SearchIcon, TimesIcon, ChevronDownIcon, Chip],
    template: `
        <div #container [ngClass]="containerClass" [class]="containerStyleClass" [ngStyle]="containerStyle" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input
                    #focusInput
                    type="text"
                    role="combobox"
                    [attr.id]="inputId"
                    readonly
                    [disabled]="disabled"
                    (focus)="onInputFocus($event)"
                    (blur)="onInputBlur($event)"
                    (keydown)="onKeyDown($event)"
                    [attr.tabindex]="!disabled ? tabindex : -1"
                    [attr.aria-controls]="overlayVisible ? listId : null"
                    [attr.aria-haspopup]="'tree'"
                    [attr.aria-expanded]="overlayVisible ?? false"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    [attr.aria-label]="ariaLabel || (label === 'p-emptylabel' ? undefined : label)"
                    [pAutoFocus]="autofocus"
                />
            </div>
            <div class="p-treeselect-label-container">
                <div [ngClass]="labelClass" [class]="labelStyleClass" [ngStyle]="labelStyle">
                    <ng-container *ngIf="valueTemplate; else defaultValueTemplate">
                        <ng-container *ngTemplateOutlet="valueTemplate; context: { $implicit: value, placeholder: placeholder }"></ng-container>
                    </ng-container>
                    <ng-template #defaultValueTemplate>
                        <ng-container *ngIf="display === 'comma'; else chipsValueTemplate">
                            {{ label || 'empty' }}
                        </ng-container>
                        <ng-template #chipsValueTemplate>
                            <div *ngFor="let node of value" class="p-treeselect-chip-item">
                                <p-chip [label]="node.label" styleClass="p-treeselect-chip" />
                            </div>
                            <ng-container *ngIf="emptyValue">{{ placeholder || 'empty' }}</ng-container>
                        </ng-template>
                    </ng-template>
                </div>
            </div>
            <ng-container *ngIf="checkValue() && !disabled && showClear">
                <TimesIcon *ngIf="!clearIconTemplate" [class]="'p-treeselect-clear-icon'" (click)="clear($event)" />
                <span *ngIf="clearIconTemplate" class="p-treeselect-clear-icon" (click)="clear($event)">
                    <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                </span>
            </ng-container>
            <div class="p-treeselect-dropdown" role="button" aria-haspopup="tree" [attr.aria-expanded]="overlayVisible ?? false" [attr.aria-label]="'treeselect trigger'">
                <ChevronDownIcon *ngIf="!triggerIconTemplate && !dropdownIconTemplate" [styleClass]="'p-treeselect-dropdown-icon'" />
                <span *ngIf="triggerIconTemplate || dropdownIconTemplate" class="p-treeselect-dropdown-icon">
                    <ng-template *ngTemplateOutlet="triggerIconTemplate || dropdownIconTemplate"></ng-template>
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
                <ng-template #content>
                    <div #panel [attr.id]="listId" class="p-treeselect-overlay p-component" [ngStyle]="panelStyle" [class]="panelStyleClass" [ngClass]="panelClass">
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
                        <div class="p-treeselect-tree-container" [ngStyle]="{ 'max-height': scrollHeight }">
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
                                [filter]="filter"
                                [filterBy]="filterBy"
                                [filterMode]="filterMode"
                                [filterPlaceholder]="filterPlaceholder"
                                [filterLocale]="filterLocale"
                                [filteredNodes]="filteredNodes"
                                [virtualScroll]="virtualScroll"
                                [virtualScrollItemSize]="virtualScrollItemSize"
                                [virtualScrollOptions]="virtualScrollOptions"
                                [_templateMap]="templateMap"
                                [loading]="loading"
                            >
                                <ng-container *ngIf="emptyTemplate">
                                    <ng-template #empty>
                                        <ng-container *ngTemplateOutlet="emptyTemplate"></ng-container>
                                    </ng-template>
                                </ng-container>
                                <ng-template #togglericon let-expanded *ngIf="itemTogglerIconTemplate">
                                    <ng-container *ngTemplateOutlet="itemTogglerIconTemplate; context: { $implicit: expanded }"></ng-container>
                                </ng-template>
                                <ng-template #checkboxicon let-selected let-partialSelected="partialSelected" *ngIf="itemCheckboxIconTemplate">
                                    <ng-container *ngTemplateOutlet="itemCheckboxIconTemplate; context: { $implicit: selected, partialSelected: partialSelected }"></ng-container>
                                </ng-template>
                                <ng-template #loadingicon *ngIf="itemLoadingIconTemplate">
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TREESELECT_VALUE_ACCESSOR, TreeSelectStyle],
    encapsulation: ViewEncapsulation.None
})
export class TreeSelect extends BaseComponent {
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
     * Specifies the input variant of the component.
     * @group Props
     */
    @Input() variant: 'filled' | 'outlined' = 'outlined';
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
     * Spans 100% width of the container when enabled.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) fluid: boolean = false;
    /**
     * Style class of the panel element.
     * @group Props
     */
    @Input() panelStyleClass: string | undefined;
    /**
     * Inline style of the container element.
     * @group Props
     */
    @Input() set containerStyle(val: { [klass: string]: any } | null | undefined) {
        const _rootStyle = this._componentStyle.inlineStyles.root({ instance: this });
        this._containerStyle = { ..._rootStyle, ...val };
    }
    get containerStyle(): { [klass: string]: any } | null | undefined {
        return this._containerStyle;
    }
    _containerStyle: { [klass: string]: any } | null | undefined;
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
     * Defines the size of the component.
     * @group Props
     */
    @Input() size: 'large' | 'small';
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
        console.log('The showTransitionOptions property is deprecated since v14.2.0, use overlayOptions property instead.');
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
        console.log('The hideTransitionOptions property is deprecated since v14.2.0, use overlayOptions property instead.');
    }
    /**
     * Displays a loader to indicate data load is in progress.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) loading: boolean | undefined;
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
    @Output() onShow: EventEmitter<any> = new EventEmitter<any>();
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
    @Output() onFilter: EventEmitter<TreeFilterEvent> = new EventEmitter<TreeFilterEvent>();
    /**
     * Callback to invoke when treeselect gets focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onFocus: EventEmitter<Event> = new EventEmitter<Event>();
    /**
     * Callback to invoke when treeselect loses focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onBlur: EventEmitter<Event> = new EventEmitter<Event>();
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
    /**
     * Custom value template.
     * @group Templates
     */
    @ContentChild('value') valueTemplate: Nullable<TemplateRef<any>>;

    /**
     * Custom header template.
     * @group Templates
     */
    @ContentChild('header') headerTemplate: Nullable<TemplateRef<any>>;

    /**
     * Custom empty message template.
     * @group Templates
     */
    @ContentChild('empty') emptyTemplate: Nullable<TemplateRef<any>>;

    /**
     * Custom footer template.
     * @group Templates
     */
    @ContentChild('footer') footerTemplate: Nullable<TemplateRef<any>>;

    /**
     * Custom clear icon template.
     * @group Templates
     */
    @ContentChild('clearicon') clearIconTemplate: Nullable<TemplateRef<any>>;

    /**
     * Custom trigger icon template.
     * @group Templates
     */
    @ContentChild('triggericon') triggerIconTemplate: Nullable<TemplateRef<any>>;

    /**
     * Custom dropdown icon template.
     * @group Templates
     */
    @ContentChild('dropdownicon') dropdownIconTemplate: Nullable<TemplateRef<any>>;

    /**
     * Custom filter icon template.
     * @group Templates
     */
    @ContentChild('filtericon') filterIconTemplate: Nullable<TemplateRef<any>>;

    /**
     * Custom close icon template.
     * @group Templates
     */
    @ContentChild('closeicon') closeIconTemplate: Nullable<TemplateRef<any>>;

    /**
     * Custom item toggler icon template.
     * @group Templates
     */
    @ContentChild('itemtogglericon') itemTogglerIconTemplate: Nullable<TemplateRef<any>>;

    /**
     * Custom item checkbox icon template.
     * @group Templates
     */
    @ContentChild('itemcheckboxicon') itemCheckboxIconTemplate: Nullable<TemplateRef<any>>;

    /**
     * Custom item loading icon template.
     * @group Templates
     */
    @ContentChild('itemloadingicon') itemLoadingIconTemplate: Nullable<TemplateRef<any>>;

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

    _componentStyle = inject(TreeSelectStyle);

    ngOnInit() {
        super.ngOnInit();
        this.listId = uuid('pn_id_') + '_list';
        this.updateTreeState();
    }

    onOverlayAnimationStart(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
                if (this.filter) {
                    isNotEmpty(this.filterValue) && this.treeViewChild?._filter(<any>this.filterValue);
                    this.filterInputAutoFocus && this.filterViewChild?.nativeElement.focus();
                } else {
                    let focusableElements = <any>getFocusableElements(this.panelEl.nativeElement);

                    if (focusableElements && focusableElements.length > 0) {
                        focusableElements[0].focus();
                    }
                }
                break;
        }
    }

    onOverlayBeforeHide(event: any) {
        let focusableElements = <any>getFocusableElements(this.containerEl.nativeElement);

        if (focusableElements && focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    }

    onSelectionChange(event: any) {
        this.value = event;
        this.onModelChange(this.value);
        this.cd.markForCheck();
    }

    onClick(event: any) {
        if (this.disabled) {
            return;
        }

        if (!this.overlayViewChild?.el?.nativeElement?.contains(event.target) && !hasClass(event.target, 'p-treeselect-close') && !hasClass(event.target, 'p-checkbox-box') && !hasClass(event.target, 'p-checkbox-icon')) {
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
            filter: this.filterValue,
            filteredValue: this.treeViewChild?.filteredNodes
        });
        setTimeout(() => {
            this.overlayViewChild.alignOverlay();
        });
    }

    onArrowDown(event: KeyboardEvent) {
        if (this.overlayVisible && this.panelEl?.nativeElement) {
            let focusableElements = <any>getFocusableElements(this.panelEl.nativeElement, '.p-treenode');

            if (focusableElements && focusableElements.length > 0) {
                focusableElements[0].focus();
            }

            event.preventDefault();
        }
    }

    onFirstHiddenFocus(event) {
        const focusableEl = event.relatedTarget === this.focusInput?.nativeElement ? getFirstFocusableElement(this.overlayViewChild?.overlayViewChild?.nativeElement, ':not([data-p-hidden-focusable="true"])') : this.focusInput?.nativeElement;

        focus(focusableEl);
    }

    onLastHiddenFocus(event) {
        const focusableEl = event.relatedTarget === this.focusInput?.nativeElement ? getLastFocusableElement(this.overlayViewChild?.overlayViewChild?.nativeElement, ':not([data-p-hidden-focusable="true"])') : this.focusInput?.nativeElement;

        focus(focusableEl);
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
        return this.value !== null && isNotEmpty(this.value);
    }

    onTabKey(event, pressedInInputText = false) {
        if (!pressedInInputText) {
            if (this.overlayVisible && this.hasFocusableElements()) {
                focus(event.shiftKey ? this.lastHiddenFocusableElementOnOverlay.nativeElement : this.firstHiddenFocusableElementOnOverlay.nativeElement);

                event.preventDefault();
            } else {
                this.overlayVisible && this.hide(this.filter);
            }
        }
    }

    hasFocusableElements() {
        return getFocusableElements(this.overlayViewChild.overlayViewChild.nativeElement, ':not([data-p-hidden-focusable="true"])').length > 0;
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
            this.hide();
            this.focusInput?.nativeElement.focus();
        }
    }

    onUnselect(event: TreeNodeUnSelectEvent) {
        this.onNodeUnselect.emit(event);
    }

    onInputFocus(event: Event) {
        if (this.disabled) {
            // For ScreenReaders
            return;
        }

        this.focused = true;
        this.onFocus.emit(event);
    }

    onInputBlur(event: Event) {
        this.focused = false;
        this.onBlur.emit(event);
        this.onModelTouched();
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
            this.cd.markForCheck();
        });
    }

    get containerClass() {
        return this._componentStyle.classes.root({ instance: this });
    }

    get hasFluid() {
        const nativeElement = this.el.nativeElement;
        const fluidComponent = nativeElement.closest('p-fluid');
        return this.fluid || !!fluidComponent;
    }

    get labelClass() {
        return this._componentStyle.classes.label({ instance: this });
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
    imports: [TreeSelect, SharedModule],
    exports: [TreeSelect, SharedModule]
})
export class TreeSelectModule {}
