import { AnimationEvent } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    computed,
    ContentChildren,
    effect,
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
    signal,
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
            [id]="id"
            (click)="onOptionClick($event)"
            (mouseenter)="onOptionMouseEnter($event)"
            role="option"
            pRipple
            [attr.aria-label]="label"
            [attr.aria-setsize]="ariaSetSize"
            [attr.aria-posinset]="ariaPosInset"
            [attr.aria-selected]="selected"
            [attr.data-p-focused]="focused"
            [attr.data-p-highlight]="selected"
            [attr.data-p-disabled]="disabled"
            [ngStyle]="{ height: itemSize + 'px' }"
            [ngClass]="{ 'p-dropdown-item': true, 'p-highlight': selected, 'p-disabled': disabled, 'p-focus': focused }"
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
    @Input() id: string | undefined;

    @Input() option: SelectItem | undefined;

    @Input() selected: boolean | undefined;

    @Input() focused: boolean | undefined;

    @Input() label: string | undefined;

    @Input() disabled: boolean | undefined;

    @Input() visible: boolean | undefined;

    @Input() itemSize: number | undefined;

    @Input() ariaPosInset: string | undefined;

    @Input() ariaSetSize: string | undefined;

    @Input() template: TemplateRef<any> | undefined;

    @Output() onClick: EventEmitter<any> = new EventEmitter();

    @Output() onMouseMove: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
    }

    onOptionClick(event: Event) {
        this.onClick.emit(event);
    }

    onOptionMouseEnter(event: Event){
        this.onMouseMove.emit(event);
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
            [attr.id]="id"
            [ngClass]="{
                'p-dropdown p-component p-inputwrapper': true,
                'p-disabled': disabled,
                'p-dropdown-open': overlayVisible,
                'p-focus': focused,
                'p-dropdown-clearable': showClear && !disabled,
                'p-inputwrapper-filled': modelValue(),
                'p-inputwrapper-focus': focused || overlayVisible,
                'p-overlay-open': overlayVisible
            }"
            (click)="onContainerClick($event)"
            [ngStyle]="style"
            [class]="styleClass"
        >
            <span
                #focusInput
                [ngClass]="{ 'p-dropdown-label p-inputtext': true, 'p-dropdown-label-empty': label == null || label.length === 0 }"
                *ngIf="!editable && label != null"
                [pTooltip]="tooltip"
                [tooltipPosition]="tooltipPosition"
                [positionStyle]="tooltipPositionStyle"
                [tooltipStyleClass]="tooltipStyleClass"
                [attr.aria-disabled]="disabled"
                [attr.id]="inputId"
                [attr.role]="'combobox'"
                [attr.aria-label]="ariaLabel"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.aria-haspopup]="'listbox'"
                [attr.aria-expanded]="overlayVisible"
                [attr.aria-controls]="id + '_list'"
                [attr.tabindex]="!disabled ? tabindex : -1"
                pAutoFocus
                [autofocus]="autofocus"
                [attr.aria-activedescendant]="focused ? focusedOptionId() : undefined"
                (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)"
                (keydown)="onKeyDown($event)"
            >
                <ng-container *ngIf="!selectedItemTemplate">{{ label || 'empty' }}</ng-container>
                <ng-container *ngTemplateOutlet="selectedItemTemplate; context: { $implicit: selectedOpt }"></ng-container>
            </span>
            <span
                (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)"
                (keydown)="onKeyDown($event)"
                [attr.tabindex]="!disabled ? tabindex : -1"
                [ngClass]="{ 'p-dropdown-label p-inputtext p-placeholder': true, 'p-dropdown-label-empty': placeholder == null || placeholder.length === 0 }"
                *ngIf="!editable && label == null"
            >
                {{ placeholder || 'empty' }}
            </span>
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
                (input)="onEditableInput($event)"
                (keydown)="onKeyDown($event)"
                (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)"
            />

            <ng-container *ngIf="isVisibleClearIcon">
                <TimesIcon [styleClass]="'p-dropdown-clear-icon'" (click)="clear($event)" *ngIf="!clearIconTemplate" [attr.data-pc-section]="'clearicon'" />
                <span class="p-dropdown-clear-icon" (click)="clear($event)" *ngIf="clearIconTemplate" [attr.data-pc-section]="'clearicon'">
                    <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                </span>
            </ng-container>

            <div class="p-dropdown-trigger" role="button" aria-label="dropdown trigger" aria-haspopup="listbox" [attr.aria-expanded]="overlayVisible" [attr.data-pc-section]="'trigger'">
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
                        <span
                            #firstHiddenFocusableElementOnOverlay
                            role="presentation"
                            [attr.aria-hidden]="true"
                            class="p-hidden-accessible p-hidden-focusable"
                            [attr.tabindex]="0"
                            (focus)="onFirstHiddenFocus($event)"
                            [attr.data-p-hidden-focusable]="true"
                        ></span>
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
                                        [attr.aria-owns]="id + '_list'"
                                        (input)="onFilterInputChange($event)"
                                        [attr.aria-label]="ariaFilterLabel"
                                        [attr.aria-activedescendant]="focusedOptionId()"
                                        (keydown)="onFilterKeyDown($event)"
                                        (blur)="onFilterBlur($event)"
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
                                [items]="visibleOptions"
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
                                <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: items, options: {} }"></ng-container>
                            </ng-container>

                            <ng-template #buildInItems let-items let-scrollerOptions="options">
                                <ul #items [id]="id + '_list'" class="p-dropdown-items" [ngClass]="scrollerOptions.contentStyleClass" [style]="scrollerOptions.contentStyle" role="listbox">

                                    <ng-template ngFor let-option [ngForOf]="visibleOptions" let-i="index">
                                        <ng-container *ngIf="option.group">
                                            <li class="p-dropdown-item-group" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" [attr.role]="'option'">
                                                <span *ngIf="!groupTemplate">{{ getOptionGroupLabel(option.optionGroup) }}</span>
                                                <ng-container *ngTemplateOutlet="groupTemplate; context: { $implicit: option.optionGroup }"></ng-container>
                                            </li>
                                        </ng-container>
                                        <ng-container *ngIf="!option.group">
                                            <p-dropdownItem
                                                [id]="id + '_' + getOptionIndex(i)"
                                                [option]="option"
                                                [selected]="isSelected(option)"
                                                [label]="getOptionLabel(option)"
                                                [disabled]="isOptionDisabled(option)"
                                                [template]="itemTemplate"
                                                [focused]="focusedOptionIndex() === i"
                                                [ariaPosInset]="getAriaPosInset(i)"
                                                [ariaSetSize]="getAriaSetSize()"
                                                (onClick)="onOptionSelect($event, option)"
                                                (onMouseMove)="onOptionMouseEnter($event, getOptionIndex(i))"
                                            ></p-dropdownItem>
                                        </ng-container>
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
    getOptionIndex(index, fn) {
        return this.virtualScrollerDisabled() ? index : fn && fn(index)['index'];
    }

    @Input() id: string | undefined;
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
    @Input() tabindex: number | undefined = 0;
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
    }
    /**
     * An array of objects to display as the available options.
     * @group Props
     */
    @Input() get options(): any[] | undefined {
        const options = this._options();
        return options;
    }
    set options(val: any[] | undefined) {
        this._options.set(val);
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

    @ViewChild('focusInput') focusInputViewChild: Nullable<ElementRef>;

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

    // selectedOption: any;

    _options = signal<any[] | undefined>(null);

    modelValue = signal<any>(null);

    value: any;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    // optionsToDisplay: any[] | undefined;

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

    focusedOptionIndex = signal<number>(-1);

    labelId: Nullable<string>;

    listId: Nullable<string>;

    @Input() filterFields: any[] | undefined;

    // visibleOptions = computed(() => {
    //     const options = this.optionGroupLabel ? this.flatOptions(this._options()) : this._options() || [];

    //     if (this.filterValue) {
    //         const filteredOptions = this.filterService.filter(options, this.searchFields(), this.filterValue, this.filterMatchMode, this.filterLocale);

    //         if (this.optionGroupLabel) {
    //             const optionGroups = this._options() || [];
    //             const filtered = [];

    //             optionGroups.forEach((group) => {
    //                 const groupChildren = this.getOptionGroupChildren(group);
    //                 const filteredItems = groupChildren.filter((item) => filteredOptions.includes(item));

    //                 if (filteredItems.length > 0) filtered.push({ ...group, [typeof this.optionGroupChildren === 'string' ? this.optionGroupChildren : 'items']: [...filteredItems] });
    //             });

    //             return this.flatOptions(filtered);
    //         }

    //         return filteredOptions;
    //     }
    //     return options;
    // });

    get visibleOptions() {
        const options = this.optionGroupLabel ? this.flatOptions(this._options()) : this._options() || [];

        if (this.filterValue) {
            const filteredOptions = this.filterService.filter(options, this.searchFields(), this.filterValue, this.filterMatchMode, this.filterLocale);

            if (this.optionGroupLabel) {
                const optionGroups = this._options() || [];
                const filtered = [];

                optionGroups.forEach((group) => {
                    const groupChildren = this.getOptionGroupChildren(group);
                    const filteredItems = groupChildren.filter((item) => filteredOptions.includes(item));

                    if (filteredItems.length > 0) filtered.push({ ...group, [typeof this.optionGroupChildren === 'string' ? this.optionGroupChildren : 'items']: [...filteredItems] });
                });

                return this.flatOptions(filtered);
            }

            return filteredOptions;
        }
        return options;
    }

    searchFields() {
        return this.filterFields || [this.optionLabel];
    }

    getAriaPosInset(index) {
        return (
            (this.optionGroupLabel
                ? index -
                  this.visibleOptions
                      .slice(0, index)
                      .filter((option) => this.isOptionGroup(option)).length
                : index) + 1
        );
    }

    getAriaSetSize() {
        return this.visibleOptions.filter((option) => !this.isOptionGroup(option)).length;
    }

    flatOptions(options) {
        return (options || []).reduce((result, option, index) => {
            result.push({ optionGroup: option, group: true, index });

            const optionGroupChildren = this.getOptionGroupChildren(option);

            optionGroupChildren && optionGroupChildren.forEach((o) => result.push(o));

            return result;
        }, []);
    }

    constructor(public el: ElementRef, public renderer: Renderer2, public cd: ChangeDetectorRef, public zone: NgZone, public filterService: FilterService, public config: PrimeNGConfig) {
        effect(() => {
            // const visibleOptions = this.visibleOptions;
            // console.log('eff', visibleOptions)
            const modelValue = this.modelValue();
            if(this.autoDisplayFirst) {
                this.label = this.getOptionLabel(modelValue);
                this.value = modelValue;
            } else if (!this.autoDisplayFirst) {
                const selectedOptionIndex = this.findSelectedOptionIndex();
                this.label = selectedOptionIndex !== -1 ? this.getOptionLabel(this.visibleOptions[selectedOptionIndex]) : this.placeholder || 'p-emptylabel';
            }
        })
    }

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
        this.id = this.id || UniqueComponentId();
        this.autoUpdateModel();
        this.selectedOpt = null;
        // if(this.autoDisplayFirst) {
        //     this.focusedOptionIndex.set(this.findFirstOptionIndex());
        //     this.onOptionSelect(null, this.visibleOptions[this.focusedOptionIndex()], false);
        // }

        if(this.autoDisplayFirst) {
            this.label = this.getOptionLabel(this.modelValue());
            console.log(this.modelValue(), this.value)
            this.onOptionSelect(null, this.visibleOptions[this.findFirstOptionIndex()], false);
        }

        if (this.filterBy) {
            this.filterOptions = {
                filter: (value) => this.onFilterInputChange(value),
                reset: () => this.resetFilter()
            };
        }
    }

    autoUpdateModel() {
        if (this.selectOnFocus && this.autoOptionFocus && !this.hasSelectedOption()) {
            this.focusedOptionIndex.set(this.findFirstFocusedOptionIndex());
            this.onOptionSelect(null, this.visibleOptions[this.focusedOptionIndex()], false);
        }
    }

    onOptionSelect(event, option, isHide = true) {
        const value = this.getOptionValue(option);
        this.updateModel(event, value);
        isHide && this.hide(true);
    }

    onOptionMouseEnter(event, index){
        if(this.focusOnHover) {
            this.changeFocusedOptionIndex(event, index);
        }
    }

    updateModel(event, value) {
        this.onModelChange(value);
        this.modelValue.set(value);
        this.selectedOptionUpdated = true;
        this.onChange.emit({
            originalEvent: event,
            value: value
        });
    }


    isSelected(option) {
        return this.isValidOption(option) && ObjectUtils.equals(this.modelValue(), this.getOptionValue(option), this.equalityKey());
    }

    ngAfterViewInit() {
        if (this.editable) {
            this.updateEditableLabel();
        }
    }

    // label = computed(() => {
    //     let selectedOptionIndex;

    //     if(this.autoDisplayFirst) {
    //         selectedOptionIndex = this.findFirstOptionIndex();
    //     } else {
    //         selectedOptionIndex = this.findSelectedOptionIndex();
    //     }
    //     return selectedOptionIndex !== -1 ? this.getOptionLabel(this.visibleOptions[selectedOptionIndex]) : this.placeholder || 'p-emptylabel';
    // })

    label: string;

    get emptyMessageLabel(): string {
        return this.emptyMessage || this.config.getTranslation(TranslationKeys.EMPTY_MESSAGE);
    }

    get emptyFilterMessageLabel(): string {
        return this.emptyFilterMessage || this.config.getTranslation(TranslationKeys.EMPTY_FILTER_MESSAGE);
    }

    get filled(): boolean {
        if (typeof this.modelValue() === 'string') return !!this.modelValue();

        return this.modelValue() || this.modelValue() != null || this.modelValue() != undefined;
    }

    get isVisibleClearIcon(): boolean | undefined {
        return this.modelValue() != null && this.modelValue() !== '' && this.showClear && !this.disabled;
    }

    updateEditableLabel(): void {
        if (this.editableInputViewChild && this.editableInputViewChild.nativeElement) {
            this.editableInputViewChild.nativeElement.value = this.modelValue() ? this.getOptionLabel(this.modelValue()) : '';
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

    getOptionGroupLabel(optionGroup) {
        return ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel);
    }

    getOptionGroupChildren(optionGroup) {
        return ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren);
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
        if(!value) {
            this.value = this.modelValue();
        } else {
            this.modelValue.set(value);
            this.value = value;
        }

        this.selectedOpt = this.modelValue();
        this.updateEditableLabel();
        this.cd.markForCheck();
    }

    selectedOpt: any;

    /**
     * Callback to invoke on filter reset.
     * @group Method
     */
    public resetFilter(): void {
        this._filterValue = null;

        if (this.filterViewChild && this.filterViewChild.nativeElement) {
            this.filterViewChild.nativeElement.value = '';
        }
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

    onContainerClick(event: any) {
        if (this.disabled || this.readonly) {
            return;
        }

        this.focusInputViewChild?.nativeElement.focus({ preventScroll: true });

        if (event.target.tagName === 'INPUT' || event.target.getAttribute('data-pc-section') === 'clearicon' || event.target.closest('[data-pc-section="clearicon"]')) {
            return;
        } else if (!this.overlayViewChild || !this.overlayViewChild.el.nativeElement.contains(event.target)) {
            this.overlayVisible ? this.hide(true) : this.show(true);
        }
        this.onClick.emit(event);
        this.cd.detectChanges();
    }

    isEmpty() {
        return !this._options() || (this._options() && this._options().length === 0);
    }

    onEditableInput(event: KeyboardEvent) {
        const value = (event.target as HTMLInputElement).value;
        this.searchValue = '';
        const matched = this.searchOptions(event, value);
        !matched && this.focusedOptionIndex.set(-1);

        this.onModelChange(value);
        this.updateModel(event, value);
    }
    /**
     * Displays the panel.
     * @group Method
     */
    public show(isFocus?) {
        this.overlayVisible = true;
        const focusedOptionIndex = this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
        this.focusedOptionIndex.set(focusedOptionIndex);

        if(isFocus) {
            DomHandler.focus(this.focusInputViewChild?.nativeElement)
        }
        this.cd.markForCheck();
    }

    onOverlayAnimationStart(event: AnimationEvent) {
        if (event.toState === 'visible') {
            this.itemsWrapper = DomHandler.findSingle(this.overlayViewChild?.overlayViewChild?.nativeElement, this.virtualScroll ? '.p-scroller' : '.p-dropdown-items-wrapper');
            this.virtualScroll && this.scroller?.setContentEl(this.itemsViewChild?.nativeElement);

            if (this.options && this.options.length) {
                if (this.virtualScroll) {
                    const selectedIndex = this.modelValue() ? this.focusedOptionIndex() : -1;
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
    public hide(isFocus?) {
        this.overlayVisible = false;
        this.focusedOptionIndex.set(-1);

        if (this.filter && this.resetFilterOnHide) {
            this.resetFilter();
        }

        isFocus && DomHandler.focus(this.focusInputViewChild?.nativeElement);
        this.cd.markForCheck();
    }

    @Input() autoOptionFocus: boolean = true;

    onInputFocus(event: Event) {
        if (this.disabled) {
            // For ScreenReaders
            return;
        }

        this.focused = true;
        const focusedOptionIndex = this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : this.overlayVisible && this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
        this.focusedOptionIndex.set(focusedOptionIndex);
        this.overlayVisible && this.scrollInView(this.focusedOptionIndex());

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

    onKeyDown(event: KeyboardEvent, search: boolean) {
        if (this.disabled || this.readonly) {
            return;
        }

        switch (event.code) {
            //down
            case 'ArrowDown':
                this.onArrowDownKey(event);
                break;

            //up
            case 'ArrowUp':
                this.onArrowUpKey(event, this.editable);
                break;

            case 'ArrowLeft':
            case 'ArrowRight':
                this.onArrowLeftKey(event, this.editable);
                break;

            case 'Delete':
                this.onDeleteKey(event);
                break;

            case 'Home':
                this.onHomeKey(event, this.editable);
                break;

            case 'End':
                this.onEndKey(event, this.editable);
                break;

            case 'PageDown':
                this.onPageDownKey(event);
                break;

            case 'PageUp':
                this.onPageUpKey(event);
                break;

            //space
            case 'Space':
                this.onSpaceKey(event, search);
                break;

            //enter
            case 'Enter':
            case 'NumpadEnter':
                this.onEnterKey(event);
                break;

            //escape and tab
            case 'Escape':
                this.onEscapeKey(event);
                break;

            case 'Tab':
                this.onTabKey(event);
                break;

            case 'Backspace':
                this.onBackspaceKey(event, this.editable);
                break;

            case 'ShiftLeft':
            case 'ShiftRight':
                //NOOP
                break;

            default:
                if (!event.metaKey && ObjectUtils.isPrintableCharacter(event.key)) {
                    !this.overlayVisible && this.show();
                    !this.editable && this.searchOptions(event, event.key);
                }

                break;
        }
    }

    onFilterKeyDown(event) {
        switch (event.code) {
            case 'ArrowDown':
                this.onArrowDownKey(event);
                break;

            case 'ArrowUp':
                this.onArrowUpKey(event, true);
                break;

            case 'ArrowLeft':
            case 'ArrowRight':
                this.onArrowLeftKey(event, true);
                break;

            case 'Home':
                this.onHomeKey(event, true);
                break;

            case 'End':
                this.onEndKey(event, true);
                break;

            case 'Enter':
                this.onEnterKey(event);
                break;

            case 'Escape':
                this.onEscapeKey(event);
                break;

            case 'Tab':
                this.onTabKey(event, true);
                break;

            default:
                break;
        }
    }

    onFilterBlur(event) {
        this.focusedOptionIndex.set(-1);
    }

    onArrowDownKey(event: KeyboardEvent) {

        const optionIndex = this.focusedOptionIndex() !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex()) : this.findFirstFocusedOptionIndex();
        this.changeFocusedOptionIndex(event, optionIndex);

        !this.overlayVisible && this.show();
        event.preventDefault();
    }

    changeFocusedOptionIndex(event, index) {
        if (this.focusedOptionIndex() !== index) {
            this.focusedOptionIndex.set(index);
            this.scrollInView();

            if (this.selectOnFocus) {
                const option = this.visibleOptions[index];
                this.onOptionSelect(event, option, false);
            }
        }
    }

    @Input() focusOnHover: boolean = false;

    @Input() selectOnFocus: boolean = false;

    virtualScrollerDisabled() {
        return !this.virtualScrollOptions;
    }

    scrollInView(index = -1) {
        const id = index !== -1 ? `${this.id}_${index}` : this.focusedOptionId();
        if (this.itemsViewChild && this.itemsViewChild.nativeElement) {
            const element = DomHandler.findSingle(this.itemsViewChild.nativeElement, `li[id="${id}"]`);
            if (element) {
                element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'start' });
            } else if (!this.virtualScrollerDisabled()) {
                setTimeout(() => {
                    this.virtualScroll && this.scroller?.scrollToIndex(index !== -1 ? index : this.focusedOptionIndex());
                }, 0);
            }
        }
    }

    focusedOptionId() {
        return this.focusedOptionIndex() !== -1 ? `${this.id}_${this.focusedOptionIndex()}` : null;
    }

    hasSelectedOption() {
        return ObjectUtils.isNotEmpty(this.modelValue());
    }

    isValidSelectedOption(option) {
        return this.isValidOption(option) && this.isSelected(option);
    }


    equalityKey() {
        return this.optionValue ? null : this.dataKey;
    }

    findFirstFocusedOptionIndex() {
        const selectedIndex = this.findSelectedOptionIndex();
        return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
    }

    findFirstOptionIndex() {
        return this.visibleOptions.findIndex((option) => this.isValidOption(option));
    }

    findSelectedOptionIndex() {
        return this.hasSelectedOption() ? this.visibleOptions.findIndex((option) => this.isValidSelectedOption(option)) : -1;
    }

    findNextOptionIndex(index) {
        const matchedOptionIndex =
            index < this.visibleOptions.length - 1
                ? this.visibleOptions
                      .slice(index + 1)
                      .findIndex((option) => this.isValidOption(option))
                : -1;
        return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
    }

    findPrevOptionIndex(index) {
        const matchedOptionIndex = index > 0 ? ObjectUtils.findLastIndex(this.visibleOptions.slice(0, index), (option) => this.isValidOption(option)) : -1;

        return matchedOptionIndex > -1 ? matchedOptionIndex : index;
    }

    findLastOptionIndex() {
        return ObjectUtils.findLastIndex(this.visibleOptions, (option) => this.isValidOption(option));
    }

    findLastFocusedOptionIndex() {
        const selectedIndex = this.findSelectedOptionIndex();

        return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
    }

    isValidOption(option) {
        return option && !(this.isOptionDisabled(option) || this.isOptionGroup(option));
    }

    isOptionGroup(option) {
        return this.optionGroupLabel && option.optionGroup && option.group;
    }

    onArrowUpKey(event: KeyboardEvent, pressedInInputText: boolean = false) {
        if (event.altKey && !pressedInInputText) {
            if (this.focusedOptionIndex() !== -1) {
                const option = this.visibleOptions[this.focusedOptionIndex()];
                this.onOptionSelect(event, option);
            }

            this.overlayVisible && this.hide();
            event.preventDefault();
        } else {
            const optionIndex = this.focusedOptionIndex() !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex()) : this.findLastFocusedOptionIndex();

            this.changeFocusedOptionIndex(event, optionIndex);

            !this.overlayVisible && this.show();
            event.preventDefault();
        }
    }

    onArrowLeftKey(event: KeyboardEvent, pressedInInputText: boolean = false) {
        pressedInInputText && this.focusedOptionIndex.set(-1);
    }

    onDeleteKey(event: KeyboardEvent) {
        if (this.showClear) {
            this.clear(event);
            event.preventDefault();
        }
    }

    onHomeKey(event: any, pressedInInputText: boolean = false) {
        if (pressedInInputText) {
            event.currentTarget.setSelectionRange(0, 0);
            this.focusedOptionIndex.set(-1);
        } else {
            this.changeFocusedOptionIndex(event, this.findFirstOptionIndex());

            !this.overlayVisible && this.show();
        }

        event.preventDefault();
    }

    onEndKey(event: any, pressedInInputText = false) {
        if (pressedInInputText) {
            const target = event.currentTarget;
            const len = target.value.length;

            target.setSelectionRange(len, len);
            this.focusedOptionIndex.set(-1);
        } else {
            this.changeFocusedOptionIndex(event, this.findLastOptionIndex());

            !this.overlayVisible && this.show();
        }

        event.preventDefault();
    }

    onPageDownKey(event: KeyboardEvent) {
        this.scrollInView(this.visibleOptions.length - 1);
        event.preventDefault();
    }

    onPageUpKey(event: KeyboardEvent) {
        this.scrollInView(0);
        event.preventDefault();
    }

    onSpaceKey(event: KeyboardEvent, pressedInInputText: boolean = false) {
        !pressedInInputText && this.onEnterKey(event);
    }

    onEnterKey(event) {
        if (!this.overlayVisible) {
            this.onArrowDownKey(event);
        } else {
            if (this.focusedOptionIndex() !== -1) {
                const option = this.visibleOptions[this.focusedOptionIndex()];
                this.onOptionSelect(event, option);
            }

            this.hide();
        }

        event.preventDefault();
    }

    onEscapeKey(event: KeyboardEvent) {
        this.overlayVisible && this.hide(true);
        event.preventDefault();
    }

    @ViewChild('firstHiddenFocusableElementOnOverlay') firstHiddenFocusableElementOnOverlay: ElementRef;

    onTabKey(event, pressedInInputText = false) {
        if (!pressedInInputText) {
            if (this.overlayVisible && this.hasFocusableElements()) {
                DomHandler.focus(this.firstHiddenFocusableElementOnOverlay.nativeElement);
                event.preventDefault();
            } else {
                if (this.focusedOptionIndex() !== -1) {
                    const option = this.visibleOptions[this.focusedOptionIndex()];
                    // this.onItemClick({originalEvent: event, option});
                    this.onOptionSelect(event, option);
                }
                this.overlayVisible && this.hide(this.filter);
            }
        }
    }

    onFirstHiddenFocus(event) {
        const focusableEl = event.relatedTarget === this.focusInputViewChild.nativeElement ? DomHandler.getFirstFocusableElement(this.overlayViewChild.el.nativeElement, ':not(.p-hidden-focusable)') : this.focusInputViewChild.nativeElement;
        DomHandler.focus(focusableEl);
    }

    hasFocusableElements() {
        return DomHandler.getFocusableElements(this.overlayViewChild.overlayViewChild.nativeElement, ':not(.p-hidden-focusable)').length > 0;
    }

    onBackspaceKey(event: KeyboardEvent, pressedInInputText = false) {
        if (pressedInInputText) {
            !this.overlayVisible && this.show();
        }
    }

    searchOptions(event, char) {
        this.searchValue = (this.searchValue || '') + char;

        let optionIndex = -1;
        let matched = false;

        if (this.focusedOptionIndex() !== -1) {
            optionIndex = this.visibleOptions
                .slice(this.focusedOptionIndex())
                .findIndex((option) => this.isOptionMatched(option));
            optionIndex =
                optionIndex === -1
                    ? this.visibleOptions
                          .slice(0, this.focusedOptionIndex())
                          .findIndex((option) => this.isOptionMatched(option))
                    : optionIndex + this.focusedOptionIndex();
        } else {
            optionIndex = this.visibleOptions.findIndex((option) => this.isOptionMatched(option));
        }

        if (optionIndex !== -1) {
            matched = true;
        }

        if (optionIndex === -1 && this.focusedOptionIndex() === -1) {
            optionIndex = this.findFirstFocusedOptionIndex();
        }

        if (optionIndex !== -1) {
            this.changeFocusedOptionIndex(event, optionIndex);
        }

        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }

        this.searchTimeout = setTimeout(() => {
            this.searchValue = '';
            this.searchTimeout = null;
        }, 500);

        return matched;
    }

    isOptionMatched(option) {
        return this.isValidOption(option) && this.getOptionLabel(option).toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale));
    }

    onFilterInputChange(event: Event | any): void {
        let value: string = (event.target as HTMLInputElement).value?.trim();
        this.filterValue = value;

        console.log(this.visibleOptions)

        this.focusedOptionIndex.set(-1);
        this.onFilter.emit({ originalEvent: event, filter: this._filterValue });

        !this.virtualScrollerDisabled() && this.scroller.scrollToIndex(0);
        this.cd.markForCheck()

        // let inputValue: string = (event.target as HTMLInputElement).value?.trim();
        // if (inputValue && inputValue.length) {
        //     this._filterValue = inputValue;
        //     this.activateFilter();
        // } else {
        //     this._filterValue = null;
        //     this.optionsToDisplay = this.options;
        // }

        // this.virtualScroll && this.scroller?.scrollToIndex(0);

        // this.optionsChanged = true;
        // this.onFilter.emit({ originalEvent: event, filter: this._filterValue });
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
        this.updateModel(event, null);
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
