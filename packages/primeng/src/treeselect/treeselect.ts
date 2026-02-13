import { NgTemplateOutlet } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    effect,
    ElementRef,
    forwardRef,
    inject,
    InjectionToken,
    input,
    NgModule,
    numberAttribute,
    output,
    signal,
    TemplateRef,
    viewChild,
    ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MotionOptions } from '@primeuix/motion';
import { focus, getFirstFocusableElement, getFocusableElements, getLastFocusableElement, isNotEmpty, uuid } from '@primeuix/utils';
import { OverlayOptions, ScrollerOptions, SharedModule, TreeNode } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { PARENT_INSTANCE } from 'primeng/basecomponent';
import { BaseEditableHolder } from 'primeng/baseeditableholder';
import { Bind } from 'primeng/bind';
import { Chip } from 'primeng/chip';
import { Fluid } from 'primeng/fluid';
import { ChevronDownIcon, TimesIcon } from 'primeng/icons';
import { Overlay } from 'primeng/overlay';
import { Tree, TreeFilterEvent, TreeNodeSelectEvent, TreeNodeUnSelectEvent } from 'primeng/tree';
import type { AppendTo, CSSProperties, InputSize, InputVariant } from 'primeng/types/shared';
import { Nullable } from 'primeng/ts-helpers';
import {
    TreeSelectDisplay,
    TreeSelectHeaderTemplateContext,
    TreeSelectItemCheckboxIconTemplateContext,
    TreeSelectItemTogglerIconTemplateContext,
    TreeSelectLoadingMode,
    TreeSelectNodeCollapseEvent,
    TreeSelectNodeExpandEvent,
    TreeSelectPassThrough,
    TreeSelectSelectionMode,
    TreeSelectValueTemplateContext
} from 'primeng/types/treeselect';
import { TreeSelectStyle } from './style/treeselectstyle';

export const TREESELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TreeSelect),
    multi: true
};

const TREESELECT_INSTANCE = new InjectionToken<TreeSelect>('TREESELECT_INSTANCE');

/**
 * TreeSelect is a form component to choose from hierarchical data.
 * @group Components
 */
@Component({
    selector: 'p-tree-select, p-treeselect',
    standalone: true,
    imports: [NgTemplateOutlet, Overlay, SharedModule, Tree, AutoFocus, TimesIcon, ChevronDownIcon, Chip, Bind],
    hostDirectives: [Bind],
    template: `
        <div class="p-hidden-accessible" [pBind]="ptm('hiddenInputContainer')" [attr.data-p-hidden-accessible]="true">
            <input
                #focusInput
                type="text"
                role="combobox"
                [attr.id]="inputId()"
                readonly
                [attr.disabled]="$inputDisabledAttr()"
                (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)"
                (keydown)="onKeyDown($event)"
                [attr.tabindex]="$inputTabindex()"
                [attr.aria-controls]="$ariaControls()"
                [attr.aria-haspopup]="'tree'"
                [attr.aria-expanded]="$ariaExpanded()"
                [attr.aria-labelledby]="ariaLabelledBy()"
                [attr.aria-label]="$inputAriaLabel()"
                [pAutoFocus]="autofocus()"
                [pBind]="ptm('hiddenInput')"
            />
        </div>
        <div [class]="cx('labelContainer')" [pBind]="ptm('labelContainer')">
            <div [class]="cn(cx('label'), labelStyleClass())" [style]="labelStyle()" [pBind]="ptm('label')">
                @if (valueTemplate()) {
                    <ng-container *ngTemplateOutlet="valueTemplate(); context: valueTemplateContext()"></ng-container>
                } @else {
                    @if (display() === 'comma') {
                        {{ $labelText() }}
                    } @else {
                        @for (node of _value(); track node.key || $index) {
                            <div [class]="cx('chipItem')" [pBind]="ptm('chipItem')">
                                <p-chip [unstyled]="unstyled()" [label]="node.label" [class]="cx('pcChip')" [pt]="ptm('pcChip')" />
                            </div>
                        }
                        @if (emptyValue()) {
                            {{ $placeholderText() }}
                        }
                    }
                }
            </div>
        </div>
        @if ($showClearIcon()) {
            @if (!clearIconTemplate()) {
                <svg data-p-icon="times" [class]="cx('clearIcon')" (click)="clear($event)" [pBind]="ptm('clearIcon')" />
            } @else {
                <span [class]="cx('clearIcon')" (click)="clear($event)" [pBind]="ptm('clearIcon')">
                    <ng-template *ngTemplateOutlet="clearIconTemplate()"></ng-template>
                </span>
            }
        }
        <div [class]="cx('dropdown')" role="button" aria-haspopup="tree" [attr.aria-expanded]="$ariaExpanded()" [attr.aria-label]="'treeselect trigger'" [pBind]="ptm('dropdown')">
            @if ($showDefaultDropdownIcon()) {
                <svg data-p-icon="chevron-down" [class]="cx('dropdownIcon')" [pBind]="ptm('dropdownIcon')" />
            } @else {
                <span [class]="cx('dropdownIcon')" [pBind]="ptm('dropdownIcon')">
                    <ng-template *ngTemplateOutlet="$dropdownIconTemplate()"></ng-template>
                </span>
            }
        </div>
        <p-overlay
            #overlay
            [hostAttrSelector]="$attrSelector"
            [visible]="overlayVisible()"
            (visibleChange)="overlayVisible.set($event)"
            [options]="overlayOptions()"
            [target]="'@parent'"
            [appendTo]="$appendTo()"
            [unstyled]="unstyled()"
            [pt]="ptm('pcOverlay')"
            [motionOptions]="motionOptions()"
            (onBeforeEnter)="onOverlayBeforeEnter()"
            (onBeforeHide)="onOverlayBeforeHide()"
            (onShow)="onShow.emit($event)"
            (onHide)="hide($event)"
        >
            <ng-template #content>
                <div #panel [attr.id]="listId" [class]="cn(cx('panel'), panelStyleClass(), panelClass())" [style]="panelStyle()" [pBind]="ptm('panel')">
                    <span
                        #firstHiddenFocusableEl
                        role="presentation"
                        class="p-hidden-accessible p-hidden-focusable"
                        [attr.tabindex]="0"
                        (focus)="onFirstHiddenFocus($event)"
                        [attr.data-p-hidden-accessible]="true"
                        [attr.data-p-hidden-focusable]="true"
                        [pBind]="ptm('hiddenFirstFocusableEl')"
                    >
                    </span>
                    @if (headerTemplate()) {
                        <ng-container *ngTemplateOutlet="headerTemplate(); context: headerTemplateContext()"></ng-container>
                    }
                    <div [class]="cx('treeContainer')" [style]="$treeContainerStyle()" [pBind]="ptm('treeContainer')">
                        <p-tree
                            #tree
                            [value]="_options()"
                            [propagateSelectionDown]="propagateSelectionDown()"
                            [propagateSelectionUp]="propagateSelectionUp()"
                            [selectionMode]="selectionMode()"
                            (selectionChange)="onSelectionChange($event)"
                            [selection]="_value()"
                            [metaKeySelection]="metaKeySelection()"
                            (onNodeExpand)="nodeExpand($event)"
                            (onNodeCollapse)="nodeCollapse($event)"
                            (onNodeSelect)="onSelect($event)"
                            [emptyMessage]="emptyMessage()"
                            (onNodeUnselect)="onUnselect($event)"
                            [filter]="filter()"
                            [filterBy]="filterBy()"
                            [filterMode]="filterMode()"
                            [filterPlaceholder]="filterPlaceholder()"
                            [filterLocale]="filterLocale()"
                            [filteredNodes]="filteredNodes"
                            [virtualScroll]="virtualScroll()"
                            [virtualScrollItemSize]="virtualScrollItemSize()"
                            [virtualScrollOptions]="virtualScrollOptions()"
                            [loading]="loading()"
                            [filterInputAutoFocus]="filterInputAutoFocus()"
                            [loadingMode]="loadingMode()"
                            [pt]="ptm('pcTree')"
                            [unstyled]="unstyled()"
                        >
                            @if (emptyTemplate()) {
                                <ng-template #empty>
                                    <ng-container *ngTemplateOutlet="emptyTemplate()"></ng-container>
                                </ng-template>
                            }
                            @if (itemTogglerIconTemplate()) {
                                <ng-template #togglericon let-expanded>
                                    <ng-container *ngTemplateOutlet="itemTogglerIconTemplate(); context: { $implicit: expanded }"></ng-container>
                                </ng-template>
                            }
                            @if (itemCheckboxIconTemplate()) {
                                <ng-template #checkboxicon let-selected let-partialSelected="partialSelected">
                                    <ng-container *ngTemplateOutlet="itemCheckboxIconTemplate(); context: { $implicit: selected, partialSelected: partialSelected }"></ng-container>
                                </ng-template>
                            }
                            @if (itemLoadingIconTemplate()) {
                                <ng-template #loadingicon>
                                    <ng-container *ngTemplateOutlet="itemLoadingIconTemplate()"></ng-container>
                                </ng-template>
                            }
                            @if (filterIconTemplate()) {
                                <ng-template #filtericon>
                                    <ng-container *ngTemplateOutlet="filterIconTemplate()"></ng-container>
                                </ng-template>
                            }
                        </p-tree>
                    </div>
                    @if (footerTemplate()) {
                        <ng-container *ngTemplateOutlet="footerTemplate(); context: footerTemplateContext()"></ng-container>
                    }
                    <span
                        #lastHiddenFocusableEl
                        role="presentation"
                        class="p-hidden-accessible p-hidden-focusable"
                        [attr.tabindex]="0"
                        (focus)="onLastHiddenFocus($event)"
                        [attr.data-p-hidden-accessible]="true"
                        [attr.data-p-hidden-focusable]="true"
                        [pBind]="ptm('hiddenLastFocusableEl')"
                    ></span>
                </div>
            </ng-template>
        </p-overlay>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        TREESELECT_VALUE_ACCESSOR,
        TreeSelectStyle,
        {
            provide: TREESELECT_INSTANCE,
            useExisting: TreeSelect
        },
        {
            provide: PARENT_INSTANCE,
            useExisting: TreeSelect
        }
    ],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "cx('root')",
        '[style]': "sx('root')",
        '(mousedown)': 'onClick($event)'
    }
})
export class TreeSelect extends BaseEditableHolder<TreeSelectPassThrough> {
    componentName = 'TreeSelect';

    $pcTreeSelect: TreeSelect | undefined = inject(TREESELECT_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    _componentStyle = inject(TreeSelectStyle);

    /**
     * Identifier of the underlying input element.
     * @group Props
     */
    inputId = input<string>();
    /**
     * Height of the viewport, a scrollbar is defined if height of list exceeds this value.
     * @group Props
     */
    scrollHeight = input<string>('400px');
    /**
     * Defines how multiple items can be selected, when true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.
     * @group Props
     */
    metaKeySelection = input(false, { transform: booleanAttribute });
    /**
     * Defines how the selected items are displayed.
     * @group Props
     */
    display = input<TreeSelectDisplay>('comma');
    /**
     * Defines the selection mode.
     * @group Props
     */
    selectionMode = input<TreeSelectSelectionMode>('single');
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = input<string>('0');
    /**
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    ariaLabel = input<string>();
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy = input<string>();
    /**
     * Label to display when there are no selections.
     * @group Props
     */
    placeholder = input<string>();
    /**
     * Style class of the overlay panel.
     * @group Props
     */
    panelClass = input<string | string[] | Set<string> | { [klass: string]: any }>();
    /**
     * Inline style of the panel element.
     * @group Props
     */
    panelStyle = input<CSSProperties>();
    /**
     * Style class of the panel element.
     * @group Props
     */
    panelStyleClass = input<string>();
    /**
     * Inline style of the label element.
     * @group Props
     */
    labelStyle = input<CSSProperties>();
    /**
     * Style class of the label element.
     * @group Props
     */
    labelStyleClass = input<string>();
    /**
     * Specifies the options for the overlay.
     * @group Props
     */
    overlayOptions = input<OverlayOptions>();
    /**
     * Text to display when there are no options available. Defaults to value from PrimeNG locale configuration.
     * @group Props
     */
    emptyMessage = input<string>('');
    /**
     * When specified, displays an input field to filter the items.
     * @group Props
     */
    filter = input(false, { transform: booleanAttribute });
    /**
     * When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.
     * @group Props
     */
    filterBy = input<string>('label');
    /**
     * Mode for filtering valid values are "lenient" and "strict". Default is lenient.
     * @group Props
     */
    filterMode = input<string>('lenient');
    /**
     * Placeholder text to show when filter input is empty.
     * @group Props
     */
    filterPlaceholder = input<string>();
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    filterLocale = input<string>();
    /**
     * Determines whether the filter input should be automatically focused when the component is rendered.
     * @group Props
     */
    filterInputAutoFocus = input(true, { transform: booleanAttribute });
    /**
     * Whether checkbox selections propagate to descendant nodes.
     * @group Props
     */
    propagateSelectionDown = input(true, { transform: booleanAttribute });
    /**
     * Whether checkbox selections propagate to ancestor nodes.
     * @group Props
     */
    propagateSelectionUp = input(true, { transform: booleanAttribute });
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @group Props
     */
    showClear = input(false, { transform: booleanAttribute });
    /**
     * Clears the filter value when hiding the dropdown.
     * @group Props
     */
    resetFilterOnHide = input(true, { transform: booleanAttribute });
    /**
     * Whether the data should be loaded on demand during scroll.
     * @group Props
     */
    virtualScroll = input(undefined, { transform: booleanAttribute });
    /**
     * Height of an item in the list for VirtualScrolling.
     * @group Props
     */
    virtualScrollItemSize = input(undefined, { transform: numberAttribute });
    /**
     * Whether to use the scroller feature. The properties of scroller component can be used like an object in it.
     * @group Props
     */
    virtualScrollOptions = input<ScrollerOptions>();
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus = input(undefined, { transform: booleanAttribute });
    /**
     * An array of treenodes.
     * @defaultValue undefined
     * @group Props
     */
    options = input<TreeNode[]>();
    /**
     * Displays a loader to indicate data load is in progress.
     * @group Props
     */
    loading = input(undefined, { transform: booleanAttribute });
    /**
     * Loading mode display.
     * @group Props
     */
    loadingMode = input<TreeSelectLoadingMode>('mask');
    /**
     * Specifies the size of the component.
     * @defaultValue undefined
     * @group Props
     */
    size = input<InputSize>();
    /**
     * Specifies the input variant of the component.
     * @defaultValue undefined
     * @group Props
     */
    variant = input<InputVariant>();
    /**
     * Spans 100% width of the container when enabled.
     * @defaultValue undefined
     * @group Props
     */
    fluid = input(undefined, { transform: booleanAttribute });
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @defaultValue 'self'
     * @group Props
     */
    appendTo = input<AppendTo>(undefined);
    /**
     * The motion options.
     * @group Props
     */
    motionOptions = input<MotionOptions | undefined>(undefined);

    /**
     * Callback to invoke when a node is expanded.
     * @param {TreeSelectNodeExpandEvent} event - Custom node expand event.
     * @group Emits
     */
    onNodeExpand = output<TreeSelectNodeExpandEvent>();
    /**
     * Callback to invoke when a node is collapsed.
     * @param {TreeSelectNodeCollapseEvent} event - Custom node collapse event.
     * @group Emits
     */
    onNodeCollapse = output<TreeSelectNodeCollapseEvent>();
    /**
     * Callback to invoke when the overlay is shown.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onShow = output<any>();
    /**
     * Callback to invoke when the overlay is hidden.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onHide = output<Event>();
    /**
     * Callback to invoke when input field is cleared.
     * @group Emits
     */
    onClear = output<any>();
    /**
     * Callback to invoke when data is filtered.
     * @group Emits
     */
    onFilter = output<TreeFilterEvent>();
    /**
     * Callback to invoke when treeselect gets focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onFocus = output<Event>();
    /**
     * Callback to invoke when treeselect loses focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onBlur = output<Event>();
    /**
     * Callback to invoke when a node is unselected.
     * @param {TreeNodeUnSelectEvent} event - node unselect event.
     * @group Emits
     */
    onNodeUnselect = output<TreeNodeUnSelectEvent>();
    /**
     * Callback to invoke when a node is selected.
     * @param {TreeNodeSelectEvent} event - node select event.
     * @group Emits
     */
    onNodeSelect = output<TreeNodeSelectEvent>();

    $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo());

    focusInputViewChild = viewChild<ElementRef>('focusInput');

    filterViewChild = viewChild<ElementRef>('filter');

    treeViewChild = viewChild<Tree>('tree');

    panelEl = viewChild<ElementRef>('panel');

    overlayViewChild = viewChild<Overlay>('overlay');

    firstHiddenFocusableElementOnOverlay = viewChild<ElementRef>('firstHiddenFocusableEl');

    lastHiddenFocusableElementOnOverlay = viewChild<ElementRef>('lastHiddenFocusableEl');

    $variant = computed(() => this.variant() || this.config.inputStyle() || this.config.inputVariant());

    pcFluid: Fluid | null = inject(Fluid, { optional: true, host: true, skipSelf: true });

    get hasFluid() {
        return this.fluid() ?? !!this.pcFluid;
    }

    public filteredNodes: TreeNode[] | undefined | null;

    filterValue: Nullable<string> = null;

    serializedValue: Nullable<any[]>;

    /**
     * Custom value template.
     * @param {TreeSelectValueTemplateContext} context - value context.
     * @see {@link TreeSelectValueTemplateContext}
     * @group Templates
     */
    valueTemplate = contentChild<TemplateRef<TreeSelectValueTemplateContext>>('value', { descendants: false });

    /**
     * Custom header template.
     * @param {TreeSelectHeaderTemplateContext} context - header context.
     * @see {@link TreeSelectHeaderTemplateContext}
     * @group Templates
     */
    headerTemplate = contentChild<TemplateRef<TreeSelectHeaderTemplateContext>>('header', { descendants: false });

    /**
     * Custom empty message template.
     * @group Templates
     */
    emptyTemplate = contentChild<TemplateRef<void>>('empty', { descendants: false });

    /**
     * Custom footer template.
     * @param {TreeSelectHeaderTemplateContext} context - footer context.
     * @see {@link TreeSelectHeaderTemplateContext}
     * @group Templates
     */
    footerTemplate = contentChild<TemplateRef<TreeSelectHeaderTemplateContext>>('footer', { descendants: false });

    /**
     * Custom clear icon template.
     * @group Templates
     */
    clearIconTemplate = contentChild<TemplateRef<void>>('clearicon', { descendants: false });

    /**
     * Custom trigger icon template.
     * @group Templates
     */
    triggerIconTemplate = contentChild<TemplateRef<void>>('triggericon', { descendants: false });

    /**
     * Custom dropdown icon template.
     * @group Templates
     */
    dropdownIconTemplate = contentChild<TemplateRef<void>>('dropdownicon', { descendants: false });

    /**
     * Custom filter icon template.
     * @group Templates
     */
    filterIconTemplate = contentChild<TemplateRef<void>>('filtericon', { descendants: false });

    /**
     * Custom close icon template.
     * @group Templates
     */
    closeIconTemplate = contentChild<TemplateRef<void>>('closeicon', { descendants: false });

    /**
     * Custom item toggler icon template.
     * @param {TreeSelectItemTogglerIconTemplateContext} context - toggler icon context.
     * @see {@link TreeSelectItemTogglerIconTemplateContext}
     * @group Templates
     */
    itemTogglerIconTemplate = contentChild<TemplateRef<TreeSelectItemTogglerIconTemplateContext>>('itemtogglericon', { descendants: false });

    /**
     * Custom item checkbox icon template.
     * @param {TreeSelectItemCheckboxIconTemplateContext} context - checkbox icon context.
     * @see {@link TreeSelectItemCheckboxIconTemplateContext}
     * @group Templates
     */
    itemCheckboxIconTemplate = contentChild<TemplateRef<TreeSelectItemCheckboxIconTemplateContext>>('itemcheckboxicon', { descendants: false });

    /**
     * Custom item loading icon template.
     * @group Templates
     */
    itemLoadingIconTemplate = contentChild<TemplateRef<void>>('itemloadingicon', { descendants: false });

    focused = signal<boolean>(false);

    overlayVisible = signal<boolean>(false);

    _value = signal<any>(undefined);

    expandedNodes: any[] = [];

    _options = signal<TreeNode[] | undefined>(undefined);

    listId: string = '';

    valueTemplateContext = computed(() => ({ $implicit: this._value(), placeholder: this.placeholder() }));

    headerTemplateContext = computed(() => ({ $implicit: this._value(), options: this._options() }));

    footerTemplateContext = computed(() => ({ $implicit: this._value(), options: this._options() }));

    label = computed(() => {
        const value = this._value() || [];
        return value.length ? value.map((node: TreeNode) => node.label).join(', ') : this.selectionMode() === 'single' && this._value() ? this._value().label : this.placeholder();
    });

    emptyValue = computed(() => !this._value() || Object.keys(this._value()).length === 0);

    emptyOptions = computed(() => !this._options() || this._options()!.length === 0);

    $inputDisabledAttr = computed(() => (this.$disabled() ? '' : undefined));

    $inputTabindex = computed(() => (!this.$disabled() ? this.tabindex() : '-1'));

    $ariaControls = computed(() => (this.overlayVisible() ? this.listId : null));

    $ariaExpanded = computed(() => this.overlayVisible() ?? false);

    $inputAriaLabel = computed(() => {
        const ariaLabel = this.ariaLabel();
        const label = this.label();
        return ariaLabel || (label === 'p-emptylabel' ? undefined : label);
    });

    $showClearIcon = computed(() => this.checkValue() && !this.$disabled() && this.showClear());

    $showDefaultDropdownIcon = computed(() => !this.triggerIconTemplate() && !this.dropdownIconTemplate());

    $dropdownIconTemplate = computed(() => this.triggerIconTemplate() || this.dropdownIconTemplate());

    $labelText = computed(() => this.label() || 'empty');

    $placeholderText = computed(() => this.placeholder() || 'empty');

    $treeContainerStyle = computed(() => ({ 'max-height': this.scrollHeight() }));

    constructor() {
        super();

        // Handle options input changes
        effect(() => {
            const opts = this.options();
            this._options.set(opts);
            this.updateTreeState();
        });
    }

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    onInit() {
        this.listId = uuid('pn_id_') + '_list';
        this.updateTreeState();
    }

    onOverlayBeforeEnter() {
        if (this.filter()) {
            isNotEmpty(this.filterValue) && this.treeViewChild()?._filter(<any>this.filterValue);
            this.filterInputAutoFocus() && this.filterViewChild()?.nativeElement.focus();
        } else {
            let focusableElements = <any>getFocusableElements(this.panelEl()?.nativeElement!);

            if (focusableElements && focusableElements.length > 0) {
                focusableElements[0].focus();
            }
        }
    }

    onOverlayBeforeHide() {
        let focusableElements = <any>getFocusableElements(this.el.nativeElement);

        if (focusableElements && focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    }

    onSelectionChange(event: any) {
        this._value.set(event);
        this.onModelChange(this._value());
    }

    onClick(event: any) {
        if (this.$disabled()) {
            return;
        }
        const section = event.target?.getAttribute?.('data-pc-section');
        if (!this.overlayViewChild()?.el?.nativeElement?.contains(event.target) && section !== 'box' && section !== 'icon') {
            if (this.overlayVisible()) {
                this.hide();
            } else {
                this.show();
            }

            this.focusInputViewChild()?.nativeElement.focus();
        }
    }

    onKeyDown(event: KeyboardEvent) {
        switch (event.code) {
            //down
            case 'ArrowDown':
                if (!this.overlayVisible()) {
                    this.show();
                    event.preventDefault();
                }
                this.onArrowDown(event);
                event.preventDefault();
                break;

            //space
            case 'Space':
            case 'Enter':
                if (!this.overlayVisible()) {
                    this.show();
                    event.preventDefault();
                }
                break;

            //escape
            case 'Escape':
                if (this.overlayVisible()) {
                    this.hide();
                    this.focusInputViewChild()?.nativeElement.focus();
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
        this.treeViewChild()?._filter(this.filterValue);
        this.onFilter.emit({
            filter: this.filterValue,
            filteredValue: this.treeViewChild()?.filteredNodes
        });
        setTimeout(() => {
            this.overlayViewChild()?.alignOverlay();
        });
    }

    onArrowDown(event: KeyboardEvent) {
        if (this.overlayVisible() && this.panelEl()?.nativeElement) {
            let focusableElements = <any>getFocusableElements(this.panelEl()!.nativeElement, '[data-pc-section="node"]');
            if (focusableElements && focusableElements.length > 0) {
                focusableElements[0].focus();
            }

            event.preventDefault();
        }
    }

    onFirstHiddenFocus(event: FocusEvent) {
        const focusableEl =
            event.relatedTarget === this.focusInputViewChild()?.nativeElement ? getFirstFocusableElement(this.overlayViewChild()?.overlayViewChild?.nativeElement, ':not([data-p-hidden-focusable="true"])') : this.focusInputViewChild()?.nativeElement;

        focus(focusableEl);
    }

    onLastHiddenFocus(event: FocusEvent) {
        const focusableEl =
            event.relatedTarget === this.focusInputViewChild()?.nativeElement ? getLastFocusableElement(this.overlayViewChild()?.overlayViewChild?.nativeElement, ':not([data-p-hidden-focusable="true"])') : this.focusInputViewChild()?.nativeElement;

        focus(focusableEl);
    }

    show() {
        this.overlayVisible.set(true);
    }

    hide(event?: any) {
        this.overlayVisible.set(false);
        this.resetFilter();

        this.onHide.emit(event);
    }

    clear(event: Event) {
        this._value.set(null);
        this.resetExpandedNodes();
        this.resetPartialSelected();
        this.onModelChange(this._value());
        this.onClear.emit(null);

        event.stopPropagation();
    }

    checkValue() {
        return this._value() !== null && isNotEmpty(this._value());
    }

    onTabKey(event: KeyboardEvent, pressedInInputText = false) {
        if (!pressedInInputText) {
            if (this.overlayVisible() && this.hasFocusableElements()) {
                focus(event.shiftKey ? this.lastHiddenFocusableElementOnOverlay()?.nativeElement : this.firstHiddenFocusableElementOnOverlay()?.nativeElement);

                event.preventDefault();
            } else {
                this.overlayVisible() && this.hide(this.filter());
            }
        }
    }

    hasFocusableElements() {
        return getFocusableElements(this.overlayViewChild()?.overlayViewChild?.nativeElement, ':not([data-p-hidden-focusable="true"])').length > 0;
    }

    resetFilter() {
        if (this.filter() && !this.resetFilterOnHide()) {
            this.filteredNodes = this.treeViewChild()?.filteredNodes;
            this.treeViewChild()?.resetFilter();
        } else {
            this.filterValue = null;
        }
    }

    updateTreeState() {
        if (this._value()) {
            let selectedNodes = this.selectionMode() === 'single' ? [this._value()] : [...this._value()];
            this.resetExpandedNodes();
            this.resetPartialSelected();
            if (selectedNodes && this._options()) {
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
            for (let childNode of this._options() as TreeNode[]) {
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
        setTimeout(() => {
            this.overlayViewChild()?.alignOverlay();
        });
    }

    nodeCollapse(event: { originalEvent: Event; node: TreeNode }) {
        this.onNodeCollapse.emit(event);
        this.expandedNodes.splice(this.expandedNodes.indexOf(event.node), 1);
        setTimeout(() => {
            this.overlayViewChild()?.alignOverlay();
        });
    }

    resetExpandedNodes() {
        for (let node of this.expandedNodes) {
            node.expanded = false;
        }

        this.expandedNodes = [];
    }

    resetPartialSelected(nodes = this._options()): void {
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
            for (let childNode of this._options() as TreeNode[]) {
                this.findSelectedNodes(childNode, keys, selectedNodes);
            }
        }
    }

    isSelected(node: TreeNode) {
        return this.findIndexInSelection(node) != -1;
    }

    findIndexInSelection(node: TreeNode) {
        let index: number = -1;
        const value = this._value();

        if (value) {
            if (this.selectionMode() === 'single') {
                let areNodesEqual = (value.key && value.key === node.key) || value == node;
                index = areNodesEqual ? 0 : -1;
            } else {
                for (let i = 0; i < value.length; i++) {
                    let selectedNode = value[i];
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

        if (this.selectionMode() === 'single') {
            this.hide();
            this.focusInputViewChild()?.nativeElement.focus();
        }
    }

    onUnselect(event: TreeNodeUnSelectEvent) {
        this.onNodeUnselect.emit(event);
    }

    onInputFocus(event: Event) {
        if (this.$disabled()) {
            // For ScreenReaders
            return;
        }

        this.focused.set(true);
        this.onFocus.emit(event);
    }

    onInputBlur(event: Event) {
        this.focused.set(false);
        this.onBlur.emit(event);
        this.onModelTouched();
    }

    /**
     * @override
     *
     * @see {@link BaseEditableHolder.writeControlValue}
     * Writes the value to the control.
     */
    writeControlValue(value: any): void {
        this._value.set(value);
        this.updateTreeState();
    }
}

@NgModule({
    imports: [TreeSelect, SharedModule],
    exports: [TreeSelect, SharedModule]
})
export class TreeSelectModule {}
