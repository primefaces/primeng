import { AnimationEvent } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    NgModule,
    NgZone,
    OnInit,
    Output,
    QueryList,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    ViewRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FilterService, OverlayOptions, PrimeNGConfig, PrimeTemplate, SelectItem, SharedModule, TranslationKeys } from 'primeng/api';
import { AutoFocusModule } from 'primeng/autofocus';
import { DomHandler } from 'primeng/dom';
import { Overlay, OverlayModule } from 'primeng/overlay';
import { RippleModule } from 'primeng/ripple';
import { Scroller, ScrollerModule } from 'primeng/scroller';
import { ScrollerOptions } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';
import { TimesIcon } from 'primeng/icons/times';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { SearchIcon } from 'primeng/icons/search';
import { DropdownChangeEvent, DropdownFilterEvent, DropdownFilterOptions, DropdownLazyLoadEvent } from './dropdown.interface';
import { Nullable } from 'primeng/ts-helpers';

export const DROPDOWN_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Dropdown),
    multi: true
};

@Component({
    selector: 'p-dropdownItem',
    template: `
        <li
            (click)="onOptionClick($event)"
            role="option"
            pRipple
            [attr.aria-label]="label"
            [attr.aria-selected]="selected"
            [ngStyle]="{ height: itemSize + 'px' }"
            [id]="selected ? 'p-highlighted-option' : ''"
            [ngClass]="{ 'p-dropdown-item': true, 'p-highlight': selected, 'p-disabled': disabled }"
        >
            <span *ngIf="!template">{{ label ?? 'empty' }}</span>
            <ng-container *ngTemplateOutlet="template; context: { $implicit: option }"></ng-container>
        </li>
    `,
    host: {
        class: 'p-element'
    }
})
export class DropdownItem {
    @Input() option: SelectItem | undefined;

    @Input() selected: boolean | undefined;

    @Input() label: string | undefined;

    @Input() disabled: boolean | undefined;

    @Input() visible: boolean | undefined;

    @Input() itemSize: number | undefined;

    @Input() template: TemplateRef<any> | undefined;

    @Output() onClick: EventEmitter<any> = new EventEmitter();

    onOptionClick(event: Event) {
        this.onClick.emit({
            originalEvent: event,
            option: this.option
        });
    }
}
/**
 * Dropdown also known as Select, is used to choose an item from a collection of options.
 * @group Components
 */
@Component({
    selector: 'p-dropdown',
    template: `
        <div
            #container
            [ngClass]="{ 'p-dropdown p-component': true, 'p-disabled': disabled, 'p-dropdown-open': overlayVisible, 'p-focus': focused, 'p-dropdown-clearable': showClear && !disabled }"
            (click)="onMouseclick($event)"
            [ngStyle]="style"
            [class]="styleClass"
        >
            <div class="p-hidden-accessible">
                <input
                    #in
                    [attr.id]="inputId"
                    type="text"
                    readonly
                    (focus)="onInputFocus($event)"
                    aria-haspopup="listbox"
                    [attr.placeholder]="placeholder"
                    aria-haspopup="listbox"
                    [attr.aria-label]="ariaLabel"
                    [attr.aria-expanded]="false"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    (blur)="onInputBlur($event)"
                    (keydown)="onKeydown($event, true)"
                    [disabled]="disabled"
                    [attr.tabindex]="tabindex"
                    pAutoFocus
                    [autofocus]="autofocus"
                    [attr.aria-activedescendant]="overlayVisible ? labelId : null"
                    role="combobox"
                />
            </div>
            <span
                [attr.id]="labelId"
                [ngClass]="{ 'p-dropdown-label p-inputtext': true, 'p-dropdown-label-empty': label == null || label.length === 0 }"
                *ngIf="!editable && label != null"
                [pTooltip]="tooltip"
                [tooltipPosition]="tooltipPosition"
                [positionStyle]="tooltipPositionStyle"
                [tooltipStyleClass]="tooltipStyleClass"
            >
                <ng-container *ngIf="!selectedItemTemplate">{{ label || 'empty' }}</ng-container>
                <ng-container *ngTemplateOutlet="selectedItemTemplate; context: { $implicit: selectedOption }"></ng-container>
            </span>
            <span [ngClass]="{ 'p-dropdown-label p-inputtext p-placeholder': true, 'p-dropdown-label-empty': placeholder == null || placeholder.length === 0 }" *ngIf="!editable && label == null">{{ placeholder || 'empty' }}</span>
            <input
                #editableInput
                type="text"
                [attr.maxlength]="maxlength"
                class="p-dropdown-label p-inputtext"
                *ngIf="editable"
                [disabled]="disabled"
                [attr.placeholder]="placeholder"
                aria-haspopup="listbox"
                [attr.aria-expanded]="overlayVisible"
                (input)="onEditableInputChange($event)"
                (focus)="onEditableInputFocus($event)"
                (blur)="onInputBlur($event)"
            />

            <ng-container *ngIf="isVisibleClearIcon">
                <TimesIcon [styleClass]="'p-dropdown-clear-icon'" (click)="clear($event)" *ngIf="!clearIconTemplate" />
                <span class="p-dropdown-clear-icon" (click)="clear($event)" *ngIf="clearIconTemplate">
                    <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                </span>
            </ng-container>

            <div class="p-dropdown-trigger" role="button" aria-label="dropdown trigger" aria-haspopup="listbox" [attr.aria-expanded]="overlayVisible">
                <ng-container *ngIf="!dropdownIconTemplate">
                    <span class="p-dropdown-trigger-icon" *ngIf="dropdownIcon" [ngClass]="dropdownIcon"></span>
                    <ChevronDownIcon *ngIf="!dropdownIcon" [styleClass]="'p-dropdown-trigger-icon'" />
                </ng-container>
                <span *ngIf="dropdownIconTemplate" class="p-dropdown-trigger-icon">
                    <ng-template *ngTemplateOutlet="dropdownIconTemplate"></ng-template>
                </span>
            </div>

            <p-overlay
                #overlay
                [(visible)]="overlayVisible"
                [options]="overlayOptions"
                [target]="'@parent'"
                [appendTo]="appendTo"
                [autoZIndex]="autoZIndex"
                [baseZIndex]="baseZIndex"
                [showTransitionOptions]="showTransitionOptions"
                [hideTransitionOptions]="hideTransitionOptions"
                (onAnimationStart)="onOverlayAnimationStart($event)"
                (onHide)="hide()"
            >
                <ng-template pTemplate="content">
                    <div [ngClass]="'p-dropdown-panel p-component'" [ngStyle]="panelStyle" [class]="panelStyleClass">
                        <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                        <div class="p-dropdown-header" *ngIf="filter" (click)="$event.stopPropagation()">
                            <ng-container *ngIf="filterTemplate; else builtInFilterElement">
                                <ng-container *ngTemplateOutlet="filterTemplate; context: { options: filterOptions }"></ng-container>
                            </ng-container>
                            <ng-template #builtInFilterElement>
                                <div class="p-dropdown-filter-container">
                                    <input
                                        #filter
                                        type="text"
                                        autocomplete="off"
                                        [value]="filterValue || ''"
                                        class="p-dropdown-filter p-inputtext p-component"
                                        [attr.placeholder]="filterPlaceholder"
                                        (keydown.enter)="$event.preventDefault()"
                                        (keydown)="onKeydown($event, false)"
                                        (input)="onFilterInputChange($event)"
                                        [attr.aria-label]="ariaFilterLabel"
                                        [attr.aria-activedescendant]="overlayVisible ? 'p-highlighted-option' : labelId"
                                    />
                                    <SearchIcon *ngIf="!filterIconTemplate" [styleClass]="'p-dropdown-filter-icon'" />
                                    <span *ngIf="filterIconTemplate" class="p-dropdown-filter-icon">
                                        <ng-template *ngTemplateOutlet="filterIconTemplate"></ng-template>
                                    </span>
                                </div>
                            </ng-template>
                        </div>
                        <div class="p-dropdown-items-wrapper" [style.max-height]="virtualScroll ? 'auto' : scrollHeight || 'auto'">
                            <p-scroller
                                *ngIf="virtualScroll"
                                #scroller
                                [items]="optionsToDisplay"
                                [style]="{ height: scrollHeight }"
                                [itemSize]="virtualScrollItemSize || _itemSize"
                                [autoSize]="true"
                                [lazy]="lazy"
                                (onLazyLoad)="onLazyLoad.emit($event)"
                                [options]="virtualScrollOptions"
                            >
                                <ng-template pTemplate="content" let-items let-scrollerOptions="options">
                                    <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: items, options: scrollerOptions }"></ng-container>
                                </ng-template>
                                <ng-container *ngIf="loaderTemplate">
                                    <ng-template pTemplate="loader" let-scrollerOptions="options">
                                        <ng-container *ngTemplateOutlet="loaderTemplate; context: { options: scrollerOptions }"></ng-container>
                                    </ng-template>
                                </ng-container>
                            </p-scroller>
                            <ng-container *ngIf="!virtualScroll">
                                <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: optionsToDisplay, options: {} }"></ng-container>
                            </ng-container>

                            <ng-template #buildInItems let-items let-scrollerOptions="options">
                                <ul #items [attr.id]="listId" class="p-dropdown-items" [ngClass]="scrollerOptions.contentStyleClass" [style]="scrollerOptions.contentStyle" role="listbox">
                                    <ng-container *ngIf="group">
                                        <ng-template ngFor let-optgroup [ngForOf]="items">
                                            <li class="p-dropdown-item-group" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }">
                                                <span *ngIf="!groupTemplate">{{ getOptionGroupLabel(optgroup) || 'empty' }}</span>
                                                <ng-container *ngTemplateOutlet="groupTemplate; context: { $implicit: optgroup }"></ng-container>
                                            </li>
                                            <ng-container *ngTemplateOutlet="itemslist; context: { $implicit: getOptionGroupChildren(optgroup), selectedOption: selectedOption }"></ng-container>
                                        </ng-template>
                                    </ng-container>
                                    <ng-container *ngIf="!group">
                                        <ng-container *ngTemplateOutlet="itemslist; context: { $implicit: items, selectedOption: selectedOption }"></ng-container>
                                    </ng-container>
                                    <ng-template #itemslist let-options let-selectedOption="selectedOption">
                                        <ng-template ngFor let-option let-i="index" [ngForOf]="options">
                                            <p-dropdownItem
                                                [option]="option"
                                                [selected]="selectedOption == option"
                                                [label]="getOptionLabel(option)"
                                                [disabled]="isOptionDisabled(option)"
                                                (onClick)="onItemClick($event)"
                                                [template]="itemTemplate"
                                            ></p-dropdownItem>
                                        </ng-template>
                                    </ng-template>
                                    <li *ngIf="filterValue && isEmpty()" class="p-dropdown-empty-message" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }">
                                        <ng-container *ngIf="!emptyFilterTemplate && !emptyTemplate; else emptyFilter">
                                            {{ emptyFilterMessageLabel }}
                                        </ng-container>
                                        <ng-container #emptyFilter *ngTemplateOutlet="emptyFilterTemplate || emptyTemplate"></ng-container>
                                    </li>
                                    <li *ngIf="!filterValue && isEmpty()" class="p-dropdown-empty-message" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }">
                                        <ng-container *ngIf="!emptyTemplate; else empty">
                                            {{ emptyMessageLabel }}
                                        </ng-container>
                                        <ng-container #empty *ngTemplateOutlet="emptyTemplate"></ng-container>
                                    </li>
                                </ul>
                            </ng-template>
                        </div>
                        <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                    </div>
                </ng-template>
            </p-overlay>
        </div>
    `,

    host: {
        class: 'p-element p-inputwrapper',
        '[class.p-inputwrapper-filled]': 'filled',
        '[class.p-inputwrapper-focus]': 'focused || overlayVisible'
    },
    providers: [DROPDOWN_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./dropdown.css']
})
export class Dropdown implements OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, ControlValueAccessor {
    /**
     * Height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.
     * @group Props
     */
    @Input() scrollHeight: string = '200px';
    /**
     * When specified, displays an input field to filter the items on keyup.
     * @group Props
     */
    @Input() filter: boolean | undefined;
    /**
     * Name of the input element.
     * @group Props
     */
    @Input() name: string | undefined;
    /**
     * Inline style of the element.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Inline style of the overlay panel element.
     * @group Props
     */
    @Input() panelStyle: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the element.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Style class of the overlay panel element.
     * @group Props
     */
    @Input() panelStyleClass: string | undefined;
    /**
     * When present, it specifies that the component cannot be edited.
     * @group Props
     */
    @Input() readonly: boolean | undefined;
    /**
     * When present, it specifies that an input field must be filled out before submitting the form.
     * @group Props
     */
    @Input() required: boolean | undefined;
    /**
     * When present, custom value instead of predefined options can be entered using the editable input field.
     * @group Props
     */
    @Input() editable: boolean | undefined;
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    @Input() appendTo: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    @Input() tabindex: number | undefined;
    /**
     * Default text to display when no option is selected.
     * @group Props
     */
    @Input() placeholder: string | undefined;
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
     * Identifier of the accessible input element.
     * @group Props
     */
    @Input() inputId: string | undefined;
    /**
     * No description available.
     * @group Props
     */
    @Input() selectId: string | undefined;
    /**
     * A property to uniquely identify a value in options.
     * @group Props
     */
    @Input() dataKey: string | undefined;
    /**
     * When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.
     * @group Props
     */
    @Input() filterBy: string | undefined;
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    @Input() autofocus: boolean | undefined;
    /**
     * Clears the filter value when hiding the dropdown.
     * @group Props
     */
    @Input() resetFilterOnHide: boolean = false;
    /**
     * Icon class of the dropdown icon.
     * @group Props
     */
    @Input() dropdownIcon: string | undefined;
    /**
     * Name of the label field of an option.
     * @group Props
     */
    @Input() optionLabel: string | undefined;
    /**
     * Name of the value field of an option.
     * @group Props
     */
    @Input() optionValue: string | undefined;
    /**
     * Name of the disabled field of an option.
     * @group Props
     */
    @Input() optionDisabled: string | undefined;
    /**
     * Name of the label field of an option group.
     * @group Props
     */
    @Input() optionGroupLabel: string | undefined;
    /**
     * Name of the options field of an option group.
     * @group Props
     */
    @Input() optionGroupChildren: string = 'items';
    /**
     * Whether to display the first item as the label if no placeholder is defined and value is null.
     * @group Props
     */
    @Input() autoDisplayFirst: boolean = true;
    /**
     * Whether to display options as grouped when nested options are provided.
     * @group Props
     */
    @Input() group: boolean | undefined;
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @group Props
     */
    @Input() showClear: boolean | undefined;
    /**
     * Text to display when filtering does not return any results. Defaults to global value in i18n translation configuration.
     * @group Props
     */
    @Input() emptyFilterMessage: string = '';
    /**
     * Text to display when there is no data. Defaults to global value in i18n translation configuration.
     * @group Props
     */
    @Input() emptyMessage: string = '';
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @group Props
     */
    @Input() lazy: boolean = false;
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
     * Whether to use overlay API feature. The properties of overlay API can be used like an object in it.
     * @group Props
     */
    @Input() overlayOptions: OverlayOptions | undefined;
    /**
     * Defines a string that labels the filter input.
     * @group Props
     */
    @Input() ariaFilterLabel: string | undefined;
    /**
     * Used to define a string that autocomplete attribute the current element.
     * @group Props
     */
    @Input() ariaLabel: string | undefined;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    @Input() ariaLabelledBy: string | undefined;
    /**
     * Defines how the items are filtered.
     * @group Props
     */
    @Input() filterMatchMode: 'contains' | 'startsWith' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte' = 'contains';
    /**
     * Maximum number of character allows in the editable input field.
     * @group Props
     */
    @Input() maxlength: number | undefined;
    /**
     * Advisory information to display in a tooltip on hover.
     * @group Props
     */
    @Input() tooltip: string = '';
    /**
     * Position of the tooltip.
     * @group Props
     */
    @Input() tooltipPosition: 'top' | 'left' | 'right' | 'bottom' = 'right';
    /**
     * Type of CSS position.
     * @group Props
     */
    @Input() tooltipPositionStyle: string = 'absolute';
    /**
     * Style class of the tooltip.
     * @group Props
     */
    @Input() tooltipStyleClass: string | undefined;
    /**
     * Applies focus to the filter element when the overlay is shown.
     * @group Props
     */
    @Input() autofocusFilter: boolean = true;
    /**
     * No description available.
     * @group Props
     */
    @Input() overlayDirection: string = 'end';
    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    @Input() get disabled(): boolean | undefined {
        return this._disabled;
    }
    set disabled(_disabled: boolean | undefined) {
        if (_disabled) {
            this.focused = false;

            if (this.overlayVisible) this.hide();
        }

        this._disabled = _disabled;
        if (!(this.cd as ViewRef).destroyed) {
            this.cd.detectChanges();
        }
    }
    /**
     * Item size of item to be virtual scrolled.
     * @group Props
     * @deprecated use virtualScrollItemSize property instead.
     */
    @Input() get itemSize(): number | undefined {
        return this._itemSize;
    }
    set itemSize(val: number | undefined) {
        this._itemSize = val;
        console.warn('The itemSize property is deprecated, use virtualScrollItemSize property instead.');
    }
    _itemSize: number | undefined;
    /**
     * Whether to automatically manage layering.
     * @group Props
     * @deprecated since v14.2.0, use overlayOptions property instead.
     */
    @Input() get autoZIndex(): boolean | undefined {
        return this._autoZIndex;
    }
    set autoZIndex(val: boolean | undefined) {
        this._autoZIndex = val;
        console.warn('The autoZIndex property is deprecated since v14.2.0, use overlayOptions property instead.');
    }
    _autoZIndex: boolean | undefined;
    /**
     * Base zIndex value to use in layering.
     * @group Props
     * @deprecated since v14.2.0, use overlayOptions property instead.
     */
    @Input() get baseZIndex(): number | undefined {
        return this._baseZIndex;
    }
    set baseZIndex(val: number | undefined) {
        this._baseZIndex = val;
        console.warn('The baseZIndex property is deprecated since v14.2.0, use overlayOptions property instead.');
    }
    _baseZIndex: number | undefined;
    /**
     * Transition options of the show animation.
     * @group Props
     * @deprecated since v14.2.0, use overlayOptions property instead.
     */
    @Input() get showTransitionOptions(): string | undefined {
        return this._showTransitionOptions;
    }
    set showTransitionOptions(val: string | undefined) {
        this._showTransitionOptions = val;
        console.warn('The showTransitionOptions property is deprecated since v14.2.0, use overlayOptions property instead.');
    }
    _showTransitionOptions: string | undefined;
    /**
     * Transition options of the hide animation.
     * @group Props
     * @deprecated since v14.2.0, use overlayOptions property instead.
     */
    @Input() get hideTransitionOptions(): string | undefined {
        return this._hideTransitionOptions;
    }
    set hideTransitionOptions(val: string | undefined) {
        this._hideTransitionOptions = val;
        console.warn('The hideTransitionOptions property is deprecated since v14.2.0, use overlayOptions property instead.');
    }
    _hideTransitionOptions: string | undefined;
    /**
     * When specified, filter displays with this value.
     * @group Props
     */
    @Input() get filterValue(): string | undefined | null {
        return this._filterValue;
    }
    set filterValue(val: string | undefined | null) {
        this._filterValue = val;
        this.activateFilter();
    }
    /**
     * An array of objects to display as the available options.
     * @group Props
     */
    @Input() get options(): any[] | undefined {
        return this._options;
    }
    set options(val: any[] | undefined) {
        this._options = val;
        this.optionsToDisplay = this._options;
        this.updateSelectedOption(this.value);

        this.selectedOption = this.findOption(this.value, this.optionsToDisplay as any[]);
        if (!this.selectedOption && ObjectUtils.isNotEmpty(this.value) && !this.editable) {
            this.value = null;
            this.onModelChange(this.value);
        }

        this.optionsChanged = true;

        if (this._filterValue && this._filterValue.length) {
            this.activateFilter();
        }
    }
    /**
     * Callback to invoke when value of dropdown changes.
     * @param {DropdownChangeEvent} event - custom change event.
     * @group Emits
     */
    @Output() onChange: EventEmitter<DropdownChangeEvent> = new EventEmitter<DropdownChangeEvent>();
    /**
     * Callback to invoke when data is filtered.
     * @param {DropdownFilterEvent} event - custom filter event.
     * @group Emits
     */
    @Output() onFilter: EventEmitter<DropdownFilterEvent> = new EventEmitter<DropdownFilterEvent>();
    /**
     * Callback to invoke when dropdown gets focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onFocus: EventEmitter<Event> = new EventEmitter<Event>();
    /**
     * Callback to invoke when dropdown loses focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onBlur: EventEmitter<Event> = new EventEmitter<Event>();
    /**
     * Callback to invoke when component is clicked.
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    @Output() onClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
    /**
     * Callback to invoke when dropdown overlay gets visible.
     * @param {AnimationEvent} event - Animation event.
     * @group Emits
     */
    @Output() onShow: EventEmitter<AnimationEvent> = new EventEmitter<AnimationEvent>();
    /**
     * Callback to invoke when dropdown overlay gets hidden.
     * @param {AnimationEvent} event - Animation event.
     * @group Emits
     */
    @Output() onHide: EventEmitter<AnimationEvent> = new EventEmitter<AnimationEvent>();
    /**
     * Callback to invoke when dropdown clears the value.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onClear: EventEmitter<Event> = new EventEmitter<Event>();
    /**
     * Callback to invoke in lazy mode to load new data.
     * @param {DropdownLazyLoadEvent} event - Lazy load event.
     * @group Emits
     */
    @Output() onLazyLoad: EventEmitter<DropdownLazyLoadEvent> = new EventEmitter<DropdownLazyLoadEvent>();

    @ViewChild('container') containerViewChild: Nullable<ElementRef>;

    @ViewChild('filter') filterViewChild: Nullable<ElementRef>;

    @ViewChild('in') accessibleViewChild: Nullable<ElementRef>;

    @ViewChild('editableInput') editableInputViewChild: Nullable<ElementRef>;

    @ViewChild('items') itemsViewChild: Nullable<ElementRef>;

    @ViewChild('scroller') scroller: Nullable<Scroller>;

    @ViewChild('overlay') overlayViewChild: Nullable<Overlay>;

    @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<PrimeTemplate>>;

    _disabled: boolean | undefined;

    itemsWrapper: Nullable<HTMLDivElement>;

    itemTemplate: Nullable<TemplateRef<any>>;

    groupTemplate: Nullable<TemplateRef<any>>;

    loaderTemplate: Nullable<TemplateRef<any>>;

    selectedItemTemplate: Nullable<TemplateRef<any>>;

    headerTemplate: Nullable<TemplateRef<any>>;

    filterTemplate: Nullable<TemplateRef<any>>;

    footerTemplate: Nullable<TemplateRef<any>>;

    emptyFilterTemplate: Nullable<TemplateRef<any>>;

    emptyTemplate: Nullable<TemplateRef<any>>;

    dropdownIconTemplate: Nullable<TemplateRef<any>>;

    clearIconTemplate: Nullable<TemplateRef<any>>;

    filterIconTemplate: Nullable<TemplateRef<any>>;

    filterOptions: DropdownFilterOptions | undefined;

    selectedOption: any;

    _options: any[] | undefined;

    value: any;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    optionsToDisplay: any[] | undefined;

    hover: Nullable<boolean>;

    focused: Nullable<boolean>;

    overlayVisible: Nullable<boolean>;

    optionsChanged: Nullable<boolean>;

    panel: Nullable<HTMLDivElement>;

    dimensionsUpdated: Nullable<boolean>;

    hoveredItem: any;

    selectedOptionUpdated: Nullable<boolean>;

    _filterValue: string | undefined | null;

    searchValue: Nullable<string>;

    searchIndex: Nullable<number>;

    searchTimeout: any;

    previousSearchChar: Nullable<string>;

    currentSearchChar: Nullable<string>;

    preventModelTouched: Nullable<boolean>;

    id: string = UniqueComponentId();

    labelId: Nullable<string>;

    listId: Nullable<string>;

    constructor(public el: ElementRef, public renderer: Renderer2, public cd: ChangeDetectorRef, public zone: NgZone, public filterService: FilterService, public config: PrimeNGConfig) {}

    ngAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;

                case 'selectedItem':
                    this.selectedItemTemplate = item.template;
                    break;

                case 'header':
                    this.headerTemplate = item.template;
                    break;

                case 'filter':
                    this.filterTemplate = item.template;
                    break;

                case 'footer':
                    this.footerTemplate = item.template;
                    break;

                case 'emptyfilter':
                    this.emptyFilterTemplate = item.template;
                    break;

                case 'empty':
                    this.emptyTemplate = item.template;
                    break;

                case 'group':
                    this.groupTemplate = item.template;
                    break;

                case 'loader':
                    this.loaderTemplate = item.template;
                    break;

                case 'dropdownicon':
                    this.dropdownIconTemplate = item.template;
                    break;

                case 'clearicon':
                    this.clearIconTemplate = item.template;
                    break;

                case 'filtericon':
                    this.filterIconTemplate = item.template;
                    break;

                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }

    ngOnInit() {
        this.optionsToDisplay = this.options;
        this.updateSelectedOption(null);
        this.labelId = this.id + '_label';
        this.listId = this.id + '_list';

        if (this.filterBy) {
            this.filterOptions = {
                filter: (value) => this.onFilterInputChange(value),
                reset: () => this.resetFilter()
            };
        }
    }

    ngAfterViewInit() {
        if (this.editable) {
            this.updateEditableLabel();
        }
    }

    get label(): string {
        if (typeof this.selectedOption === 'number') {
            this.selectedOption = this.selectedOption.toString();
        }

        return this.selectedOption ? this.getOptionLabel(this.selectedOption) : null;
    }

    get emptyMessageLabel(): string {
        return this.emptyMessage || this.config.getTranslation(TranslationKeys.EMPTY_MESSAGE);
    }

    get emptyFilterMessageLabel(): string {
        return this.emptyFilterMessage || this.config.getTranslation(TranslationKeys.EMPTY_FILTER_MESSAGE);
    }

    get filled(): boolean {
        if (typeof this.value === 'string') return !!this.value;

        return this.value || this.value != null || this.value != undefined;
    }

    get isVisibleClearIcon(): boolean | undefined {
        return this.value != null && this.value !== '' && this.showClear && !this.disabled;
    }

    updateEditableLabel(): void {
        if (this.editableInputViewChild && this.editableInputViewChild.nativeElement) {
            this.editableInputViewChild.nativeElement.value = this.selectedOption ? this.getOptionLabel(this.selectedOption) : this.value || '';
        }
    }

    getOptionLabel(option: any) {
        return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : option && option.label !== undefined ? option.label : option;
    }

    getOptionValue(option: any) {
        return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : !this.optionLabel && option && option.value !== undefined ? option.value : option;
    }

    isOptionDisabled(option: any) {
        return this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : option && option.disabled !== undefined ? option.disabled : false;
    }

    getOptionGroupLabel(optionGroup: any) {
        return this.optionGroupLabel ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel) : optionGroup && optionGroup.label !== undefined ? optionGroup.label : optionGroup;
    }

    getOptionGroupChildren(optionGroup: any) {
        return this.optionGroupChildren ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren) : optionGroup.items;
    }

    onItemClick(event: { originalEvent: Event; option: any }) {
        const option = event.option;

        if (!this.isOptionDisabled(option)) {
            this.selectItem(event.originalEvent, option);
            this.accessibleViewChild?.nativeElement.focus({ preventScroll: true });
        }

        setTimeout(() => {
            this.hide();
        }, 1);
    }

    selectItem(event: Event, option: any) {
        if (this.selectedOption != option) {
            this.selectedOption = option;
            this.value = this.getOptionValue(option);

            this.onModelChange(this.value);
            this.updateEditableLabel();
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    }

    ngAfterViewChecked() {
        if (this.optionsChanged && this.overlayVisible) {
            this.optionsChanged = false;

            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    if (this.overlayViewChild) {
                        this.overlayViewChild.alignOverlay();
                    }
                }, 1);
            });
        }

        if (this.selectedOptionUpdated && this.itemsWrapper) {
            let selectedItem = DomHandler.findSingle(this.overlayViewChild?.overlayViewChild?.nativeElement, 'li.p-highlight');
            if (selectedItem) {
                DomHandler.scrollInView(this.itemsWrapper, selectedItem);
            }
            this.selectedOptionUpdated = false;
        }
    }

    writeValue(value: any): void {
        if (this.filter) {
            this.resetFilter();
        }

        this.value = value;
        this.updateSelectedOption(value);
        this.updateEditableLabel();
        this.cd.markForCheck();
    }

    /**
     * Callback to invoke on filter reset.
     * @group Method
     */
    public resetFilter(): void {
        this._filterValue = null;

        if (this.filterViewChild && this.filterViewChild.nativeElement) {
            this.filterViewChild.nativeElement.value = '';
        }

        this.optionsToDisplay = this.options;
    }

    updateSelectedOption(val: any): void {
        this.selectedOption = this.findOption(val, this.optionsToDisplay as any[]);

        if (this.autoDisplayFirst && !this.placeholder && !this.selectedOption && this.optionsToDisplay && this.optionsToDisplay.length && !this.editable) {
            if (this.group) {
                this.selectedOption = this.optionsToDisplay[0].items[0];
            } else {
                this.selectedOption = this.optionsToDisplay[0];
            }
            this.value = this.getOptionValue(this.selectedOption);
            this.onModelChange(this.value);
        }

        this.selectedOptionUpdated = true;
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    setDisabledState(val: boolean): void {
        this.disabled = val;
        this.cd.markForCheck();
    }

    onMouseclick(event: MouseEvent) {
        if (this.disabled || this.readonly || this.isInputClick(event)) {
            return;
        }

        this.onClick.emit(event);

        this.accessibleViewChild?.nativeElement.focus({ preventScroll: true });

        if (this.overlayVisible) this.hide();
        else this.show();

        this.cd.detectChanges();
    }

    isInputClick(event: MouseEvent): boolean {
        return (
            DomHandler.hasClass(event.target, 'p-dropdown-clear-icon') ||
            (event.target as HTMLInputElement).isSameNode(this.accessibleViewChild?.nativeElement) ||
            ((this.editableInputViewChild && (event.target as HTMLInputElement).isSameNode(this.editableInputViewChild.nativeElement)) as boolean)
        );
    }

    isEmpty() {
        return !this.optionsToDisplay || (this.optionsToDisplay && this.optionsToDisplay.length === 0);
    }

    onEditableInputFocus(event: Event) {
        this.focused = true;
        this.hide();
        this.onFocus.emit(event);
    }

    onEditableInputChange(event: Event) {
        this.value = (event.target as HTMLInputElement).value;
        this.updateSelectedOption(this.value);
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    }
    /**
     * Displays the panel.
     * @group Method
     */
    public show() {
        this.overlayVisible = true;
        this.cd.markForCheck();
    }

    onOverlayAnimationStart(event: AnimationEvent) {
        if (event.toState === 'visible') {
            this.itemsWrapper = DomHandler.findSingle(this.overlayViewChild?.overlayViewChild?.nativeElement, this.virtualScroll ? '.p-scroller' : '.p-dropdown-items-wrapper');
            this.virtualScroll && this.scroller?.setContentEl(this.itemsViewChild?.nativeElement);

            if (this.options && this.options.length) {
                if (this.virtualScroll) {
                    const selectedIndex = this.selectedOption ? this.findOptionIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay as any[]) : -1;
                    if (selectedIndex !== -1) {
                        this.scroller?.scrollToIndex(selectedIndex);
                    }
                } else {
                    let selectedListItem = DomHandler.findSingle(this.itemsWrapper, '.p-dropdown-item.p-highlight');

                    if (selectedListItem) {
                        selectedListItem.scrollIntoView({ block: 'nearest', inline: 'center' });
                    }
                }
            }

            if (this.filterViewChild && this.filterViewChild.nativeElement) {
                this.preventModelTouched = true;

                if (this.autofocusFilter) {
                    this.filterViewChild.nativeElement.focus();
                }
            }

            this.onShow.emit(event);
        }
        if (event.toState === 'void') {
            this.itemsWrapper = null;
            this.onModelTouched();
            this.onHide.emit(event);
        }
    }
    /**
     * Hides the panel.
     * @group Method
     */
    public hide() {
        this.overlayVisible = false;

        if (this.filter && this.resetFilterOnHide) {
            this.resetFilter();
        }

        this.cd.markForCheck();
    }

    onInputFocus(event: Event) {
        this.focused = true;
        this.onFocus.emit(event);
    }

    onInputBlur(event: Event) {
        this.focused = false;
        this.onBlur.emit(event);

        if (!this.preventModelTouched) {
            this.onModelTouched();
        }
        this.preventModelTouched = false;
    }

    findPrevEnabledOption(index: number) {
        let prevEnabledOption;

        if (this.optionsToDisplay && this.optionsToDisplay.length) {
            for (let i = index - 1; 0 <= i; i--) {
                let option = this.optionsToDisplay[i];
                if (this.isOptionDisabled(option)) {
                    continue;
                } else {
                    prevEnabledOption = option;
                    break;
                }
            }

            if (!prevEnabledOption) {
                for (let i = this.optionsToDisplay.length - 1; i >= index; i--) {
                    let option = this.optionsToDisplay[i];
                    if (this.isOptionDisabled(option)) {
                        continue;
                    } else {
                        prevEnabledOption = option;
                        break;
                    }
                }
            }
        }

        return prevEnabledOption;
    }

    findNextEnabledOption(index: number) {
        let nextEnabledOption;

        if (this.optionsToDisplay && this.optionsToDisplay.length) {
            for (let i = index + 1; i < this.optionsToDisplay.length; i++) {
                let option = this.optionsToDisplay[i];
                if (this.isOptionDisabled(option)) {
                    continue;
                } else {
                    nextEnabledOption = option;
                    break;
                }
            }

            if (!nextEnabledOption) {
                for (let i = 0; i < index; i++) {
                    let option = this.optionsToDisplay[i];
                    if (this.isOptionDisabled(option)) {
                        continue;
                    } else {
                        nextEnabledOption = option;
                        break;
                    }
                }
            }
        }

        return nextEnabledOption;
    }

    onKeydown(event: KeyboardEvent, search: boolean) {
        if (this.readonly || !this.optionsToDisplay || this.optionsToDisplay.length === null) {
            return;
        }

        switch (event.which) {
            //down
            case 40:
                if (!this.overlayVisible && event.altKey) {
                    this.show();
                } else {
                    if (this.group) {
                        let selectedItemIndex = this.selectedOption ? this.findOptionGroupIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : -1;

                        if (selectedItemIndex !== -1) {
                            let nextItemIndex = selectedItemIndex.itemIndex + 1;
                            if (nextItemIndex < this.getOptionGroupChildren(this.optionsToDisplay[selectedItemIndex.groupIndex]).length) {
                                this.selectItem(event, this.getOptionGroupChildren(this.optionsToDisplay[selectedItemIndex.groupIndex])[nextItemIndex]);
                                this.selectedOptionUpdated = true;
                            } else if (this.optionsToDisplay[selectedItemIndex.groupIndex + 1]) {
                                this.selectItem(event, this.getOptionGroupChildren(this.optionsToDisplay[selectedItemIndex.groupIndex + 1])[0]);
                                this.selectedOptionUpdated = true;
                            }
                        } else {
                            if (this.optionsToDisplay && this.optionsToDisplay.length > 0) {
                                this.selectItem(event, this.getOptionGroupChildren(this.optionsToDisplay[0])[0]);
                            }
                        }
                    } else {
                        let selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : -1;
                        let nextEnabledOption = this.findNextEnabledOption(selectedItemIndex);
                        if (nextEnabledOption) {
                            this.selectItem(event, nextEnabledOption);
                            this.selectedOptionUpdated = true;
                        }
                    }
                }

                event.preventDefault();

                break;

            //up
            case 38:
                if (this.group) {
                    let selectedItemIndex = this.selectedOption ? this.findOptionGroupIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : -1;
                    if (selectedItemIndex !== -1) {
                        let prevItemIndex = selectedItemIndex.itemIndex - 1;
                        if (prevItemIndex >= 0) {
                            this.selectItem(event, this.getOptionGroupChildren(this.optionsToDisplay[selectedItemIndex.groupIndex])[prevItemIndex]);
                            this.selectedOptionUpdated = true;
                        } else if (prevItemIndex < 0) {
                            let prevGroup = this.optionsToDisplay[selectedItemIndex.groupIndex - 1];
                            if (prevGroup) {
                                this.selectItem(event, this.getOptionGroupChildren(prevGroup)[this.getOptionGroupChildren(prevGroup).length - 1]);
                                this.selectedOptionUpdated = true;
                            }
                        }
                    }
                } else {
                    let selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : -1;
                    let prevEnabledOption = this.findPrevEnabledOption(selectedItemIndex);
                    if (prevEnabledOption) {
                        this.selectItem(event, prevEnabledOption);
                        this.selectedOptionUpdated = true;
                    }
                }

                event.preventDefault();
                break;

            //space
            case 32:
                if (search) {
                    if (!this.overlayVisible) {
                        this.show();
                    } else {
                        this.hide();
                    }

                    event.preventDefault();
                }
                break;

            //enter
            case 13:
                if (this.overlayVisible && (!this.filter || (this.optionsToDisplay && this.optionsToDisplay.length > 0))) {
                    this.hide();
                } else if (!this.overlayVisible) {
                    this.show();
                }

                event.preventDefault();
                break;

            //escape and tab
            case 27:
            case 9:
                this.hide();
                break;

            //search item based on keyboard input
            default:
                if (search && !event.metaKey && event.which !== 17) {
                    this.search(event);
                }
                break;
        }
    }

    search(event: KeyboardEvent) {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }

        const char = event.key;
        this.previousSearchChar = this.currentSearchChar;
        this.currentSearchChar = char;

        if (this.previousSearchChar === this.currentSearchChar) this.searchValue = this.currentSearchChar;
        else this.searchValue = this.searchValue ? this.searchValue + char : char;

        let newOption;
        if (this.group) {
            let searchIndex = this.selectedOption ? this.findOptionGroupIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay as any[]) : { groupIndex: 0, itemIndex: 0 };
            newOption = this.searchOptionWithinGroup(searchIndex);
        } else {
            let searchIndex = this.selectedOption ? this.findOptionIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay as any[]) : -1;
            newOption = this.searchOption(++searchIndex);
        }

        if (newOption && !this.isOptionDisabled(newOption)) {
            this.selectItem(event, newOption);
            this.selectedOptionUpdated = true;
        }

        this.searchTimeout = setTimeout(() => {
            this.searchValue = null;
        }, 250);
    }

    searchOption(index: number) {
        let option;

        if (this.searchValue) {
            option = this.searchOptionInRange(index, (this.optionsToDisplay as any[]).length);

            if (!option) {
                option = this.searchOptionInRange(0, index);
            }
        }

        return option;
    }

    searchOptionInRange(start: number, end: number) {
        for (let i = start; i < end; i++) {
            let opt = (this.optionsToDisplay as any[])[i];
            if (
                this.getOptionLabel(opt)
                    .toLocaleLowerCase(this.filterLocale)
                    .startsWith((this.searchValue as any).toLocaleLowerCase(this.filterLocale)) &&
                !this.isOptionDisabled(opt)
            ) {
                return opt;
            }
        }

        return null;
    }

    searchOptionWithinGroup(index: any) {
        let option;

        if (this.searchValue) {
            if (this.optionsToDisplay) {
                for (let i = index.groupIndex; i < this.optionsToDisplay.length; i++) {
                    for (let j = index.groupIndex === i ? index.itemIndex + 1 : 0; j < this.getOptionGroupChildren(this.optionsToDisplay[i]).length; j++) {
                        let opt = this.getOptionGroupChildren(this.optionsToDisplay[i])[j];
                        if (
                            this.getOptionLabel(opt)
                                .toLocaleLowerCase(this.filterLocale)
                                .startsWith((this.searchValue as any).toLocaleLowerCase(this.filterLocale)) &&
                            !this.isOptionDisabled(opt)
                        ) {
                            return opt;
                        }
                    }
                }

                if (!option) {
                    for (let i = 0; i <= index.groupIndex; i++) {
                        for (let j = 0; j < (index.groupIndex === i ? index.itemIndex : this.getOptionGroupChildren(this.optionsToDisplay[i]).length); j++) {
                            let opt = this.getOptionGroupChildren(this.optionsToDisplay[i])[j];
                            if (
                                this.getOptionLabel(opt)
                                    .toLocaleLowerCase(this.filterLocale)
                                    .startsWith((this.searchValue as any).toLocaleLowerCase(this.filterLocale)) &&
                                !this.isOptionDisabled(opt)
                            ) {
                                return opt;
                            }
                        }
                    }
                }
            }
        }

        return null;
    }

    findOptionIndex(val: any, opts: any[]): number {
        let index: number = -1;
        if (opts) {
            for (let i = 0; i < opts.length; i++) {
                if ((val == null && this.getOptionValue(opts[i]) == null) || ObjectUtils.equals(val, this.getOptionValue(opts[i]), this.dataKey)) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }

    findOptionGroupIndex(val: any, opts: any[]): any {
        let groupIndex, itemIndex;

        if (opts) {
            for (let i = 0; i < opts.length; i++) {
                groupIndex = i;
                itemIndex = this.findOptionIndex(val, this.getOptionGroupChildren(opts[i]));

                if (itemIndex !== -1) {
                    break;
                }
            }
        }

        if (itemIndex !== -1) {
            return { groupIndex: groupIndex, itemIndex: itemIndex };
        } else {
            return -1;
        }
    }

    findOption(val: any, opts: any[], inGroup?: boolean): SelectItem {
        if (this.group && !inGroup) {
            let opt!: SelectItem;
            if (opts && opts.length) {
                for (let optgroup of opts) {
                    opt = this.findOption(val, this.getOptionGroupChildren(optgroup), true);
                    if (opt) {
                        break;
                    }
                }
            }
            return opt;
        } else {
            let index: number = this.findOptionIndex(val, opts);
            return index != -1 ? opts[index] : null;
        }
    }

    onFilterInputChange(event: Event | any): void {
        let inputValue = (event.target as HTMLInputElement).value;
        if (inputValue && inputValue.length) {
            this._filterValue = inputValue;
            this.activateFilter();
        } else {
            this._filterValue = null;
            this.optionsToDisplay = this.options;
        }

        this.virtualScroll && this.scroller?.scrollToIndex(0);

        this.optionsChanged = true;
        this.onFilter.emit({ originalEvent: event, filter: this._filterValue });
    }

    activateFilter() {
        let searchFields: string[] = (this.filterBy || this.optionLabel || 'label').split(',');

        if (this.options && this.options.length) {
            if (this.group) {
                let filteredGroups = [];
                for (let optgroup of this.options) {
                    let filteredSubOptions = this.filterService.filter(this.getOptionGroupChildren(optgroup), searchFields, this.filterValue, this.filterMatchMode, this.filterLocale);
                    if (filteredSubOptions && filteredSubOptions.length) {
                        filteredGroups.push({ ...optgroup, ...{ [this.optionGroupChildren]: filteredSubOptions } });
                    }
                }

                this.optionsToDisplay = filteredGroups;
            } else {
                this.optionsToDisplay = this.filterService.filter(this.options, searchFields, this.filterValue, this.filterMatchMode, this.filterLocale);
            }

            this.optionsChanged = true;
        }
    }

    applyFocus(): void {
        if (this.editable) DomHandler.findSingle(this.el.nativeElement, '.p-dropdown-label.p-inputtext').focus();
        else DomHandler.findSingle(this.el.nativeElement, 'input[readonly]').focus();
    }
    /**
     * Applies focus.
     * @group Method
     */
    public focus(): void {
        this.applyFocus();
    }

    clear(event: Event) {
        this.value = null;
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
        this.updateSelectedOption(this.value);
        this.updateEditableLabel();
        this.onClear.emit(event);
    }
}

@NgModule({
    imports: [CommonModule, OverlayModule, SharedModule, TooltipModule, RippleModule, ScrollerModule, AutoFocusModule, TimesIcon, ChevronDownIcon, SearchIcon],
    exports: [Dropdown, OverlayModule, SharedModule, ScrollerModule],
    declarations: [Dropdown, DropdownItem]
})
export class DropdownModule {}
