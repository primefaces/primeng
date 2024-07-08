import { AnimationEvent } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    computed,
    ContentChild,
    ContentChildren,
    effect,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    NgModule,
    NgZone,
    numberAttribute,
    OnInit,
    Output,
    QueryList,
    Renderer2,
    Signal,
    signal,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FilterService, Footer, Header, OverlayOptions, OverlayService, PrimeNGConfig, PrimeTemplate, SharedModule, TranslationKeys } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { Overlay, OverlayModule } from 'primeng/overlay';
import { RippleModule } from 'primeng/ripple';
import { Scroller, ScrollerModule } from 'primeng/scroller';
import { ScrollerOptions } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';
import { CheckIcon } from 'primeng/icons/check';
import { SearchIcon } from 'primeng/icons/search';
import { TimesCircleIcon } from 'primeng/icons/timescircle';
import { TimesIcon } from 'primeng/icons/times';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { Nullable } from 'primeng/ts-helpers';
import { AutoFocusModule } from 'primeng/autofocus';
import { MultiSelectRemoveEvent, MultiSelectFilterOptions, MultiSelectFilterEvent, MultiSelectBlurEvent, MultiSelectChangeEvent, MultiSelectFocusEvent, MultiSelectLazyLoadEvent, MultiSelectSelectAllChangeEvent } from './multiselect.interface';
import { MinusIcon } from 'primeng/icons/minus';

export const MULTISELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiSelect),
    multi: true
};

@Component({
    selector: 'p-multiSelectItem',
    template: `
        <li
            pRipple
            role="option"
            [ngStyle]="{ height: itemSize + 'px' }"
            class="p-multiselect-item"
            [ngClass]="{ 'p-multiselect-item': true, 'p-disabled': disabled, 'p-focus': focused }"
            [id]="id"
            [attr.aria-label]="label"
            [attr.aria-setsize]="ariaSetSize"
            [attr.aria-posinset]="ariaPosInset"
            [attr.aria-selected]="selected"
            [attr.data-p-focused]="focused"
            [attr.data-p-highlight]="selected"
            [attr.data-p-disabled]="disabled"
            [attr.aria-checked]="selected"
            (click)="onOptionClick($event)"
            (mouseenter)="onOptionMouseEnter($event)"
        >
            <div class="p-checkbox p-component" [ngClass]="{ 'p-variant-filled': config.inputStyle() === 'filled' }">
                <div class="p-checkbox-box" [ngClass]="{ 'p-highlight': selected }">
                    <ng-container *ngIf="selected">
                        <CheckIcon *ngIf="!checkIconTemplate && !itemCheckboxIconTemplate" [styleClass]="'p-checkbox-icon'" [attr.aria-hidden]="true" />
                        <span *ngIf="checkIconTemplate" class="p-checkbox-icon" [attr.aria-hidden]="true">
                            <ng-template *ngTemplateOutlet="checkIconTemplate"></ng-template>
                        </span>
                        <span *ngIf="itemCheckboxIconTemplate" class="p-checkbox-icon" [attr.aria-hidden]="true">
                            <ng-template *ngTemplateOutlet="itemCheckboxIconTemplate; context: { $implicit: selected }"></ng-template>
                        </span>
                    </ng-container>
                </div>
            </div>
            <span *ngIf="!template">{{ label ?? 'empty' }}</span>
            <ng-container *ngTemplateOutlet="template; context: { $implicit: option }"></ng-container>
        </li>
    `,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    }
})
export class MultiSelectItem {
    @Input() id: string | undefined;

    @Input() option: any;

    @Input({ transform: booleanAttribute }) selected: boolean | undefined;

    @Input() label: string | undefined;

    @Input({ transform: booleanAttribute }) disabled: boolean | undefined;

    @Input({ transform: numberAttribute }) itemSize: number | undefined;

    @Input({ transform: booleanAttribute }) focused: boolean | undefined;

    @Input() ariaPosInset: string | undefined;

    @Input() ariaSetSize: string | undefined;

    @Input() template: TemplateRef<any> | undefined;

    @Input() checkIconTemplate: TemplateRef<any> | undefined;

    @Input() itemCheckboxIconTemplate: TemplateRef<any> | undefined;

    @Output() onClick: EventEmitter<any> = new EventEmitter();

    @Output() onMouseEnter: EventEmitter<any> = new EventEmitter();

    constructor(public config: PrimeNGConfig) {}

    onOptionClick(event: Event) {
        this.onClick.emit({
            originalEvent: event,
            option: this.option,
            selected: this.selected
        });
        event.stopPropagation();
    }

    onOptionMouseEnter(event: Event) {
        this.onMouseEnter.emit({
            originalEvent: event,
            option: this.option,
            selected: this.selected
        });
    }
}
/**
 * MultiSelect is used to select multiple items from a collection.
 * @group Components
 */
@Component({
    selector: 'p-multiSelect',
    template: `
        <div #container [attr.id]="id" [ngClass]="containerClass" [ngStyle]="style" [class]="styleClass" (click)="onContainerClick($event)">
            <div class="p-hidden-accessible" [attr.data-p-hidden-accessible]="true">
                <input
                    #focusInput
                    [pTooltip]="tooltip"
                    [tooltipPosition]="tooltipPosition"
                    [positionStyle]="tooltipPositionStyle"
                    [tooltipStyleClass]="tooltipStyleClass"
                    [attr.aria-disabled]="disabled"
                    [attr.id]="inputId"
                    role="combobox"
                    [attr.aria-label]="ariaLabel"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    [attr.aria-haspopup]="'listbox'"
                    [attr.aria-expanded]="overlayVisible ?? false"
                    [attr.aria-controls]="overlayVisible ? id + '_list' : null"
                    [attr.tabindex]="!disabled ? tabindex : -1"
                    [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
                    (focus)="onInputFocus($event)"
                    (blur)="onInputBlur($event)"
                    (keydown)="onKeyDown($event)"
                    pAutoFocus
                    [autofocus]="autofocus"
                    [attr.value]="label() || 'empty'"
                />
            </div>
            <div
                class="p-multiselect-label-container"
                [pTooltip]="tooltip"
                (mouseleave)="labelContainerMouseLeave()"
                [tooltipDisabled]="_disableTooltip"
                [tooltipPosition]="tooltipPosition"
                [positionStyle]="tooltipPositionStyle"
                [tooltipStyleClass]="tooltipStyleClass"
            >
                <div [ngClass]="labelClass">
                    <ng-container *ngIf="!selectedItemsTemplate">
                        <ng-container *ngIf="display === 'comma'">{{ label() || 'empty' }}</ng-container>
                        <ng-container *ngIf="display === 'chip'">
                            <div #token *ngFor="let item of chipSelectedItems(); let i = index" class="p-multiselect-token">
                                <span class="p-multiselect-token-label">{{ getLabelByValue(item) }}</span>
                                <ng-container *ngIf="!disabled">
                                    <TimesCircleIcon
                                        *ngIf="!removeTokenIconTemplate"
                                        [ngClass]="{ 'p-disabled': isOptionDisabled(item) }"
                                        [styleClass]="'p-multiselect-token-icon'"
                                        (click)="removeOption(item, event)"
                                        [attr.data-pc-section]="'clearicon'"
                                        [attr.aria-hidden]="true"
                                    />
                                    <span *ngIf="removeTokenIconTemplate" class="p-multiselect-token-icon" (click)="removeOption(item, event)" [attr.data-pc-section]="'clearicon'" [attr.aria-hidden]="true">
                                        <ng-container *ngTemplateOutlet="removeTokenIconTemplate"></ng-container>
                                    </span>
                                </ng-container>
                            </div>
                            <ng-container *ngIf="!modelValue() || modelValue().length === 0">{{ placeholder() || defaultLabel || 'empty' }}</ng-container>
                        </ng-container>
                    </ng-container>
                    <ng-container *ngTemplateOutlet="selectedItemsTemplate; context: { $implicit: selectedOptions, removeChip: removeOption.bind(this) }"></ng-container>
                </div>
                <ng-container *ngIf="isVisibleClearIcon">
                    <TimesIcon *ngIf="!clearIconTemplate" [styleClass]="'p-multiselect-clear-icon'" (click)="clear($event)" [attr.data-pc-section]="'clearicon'" [attr.aria-hidden]="true" />
                    <span *ngIf="clearIconTemplate" class="p-multiselect-clear-icon" (click)="clear($event)" [attr.data-pc-section]="'clearicon'" [attr.aria-hidden]="true">
                        <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                    </span>
                </ng-container>
            </div>
            <div class="p-multiselect-trigger">
                <ng-container *ngIf="loading; else elseBlock">
                    <ng-container *ngIf="loadingIconTemplate">
                        <ng-container *ngTemplateOutlet="loadingIconTemplate"></ng-container>
                    </ng-container>
                    <ng-container *ngIf="!loadingIconTemplate">
                        <span *ngIf="loadingIcon" [ngClass]="'p-multiselect-trigger-icon pi-spin ' + loadingIcon" aria-hidden="true"></span>
                        <span *ngIf="!loadingIcon" [class]="'p-multiselect-trigger-icon pi pi-spinner pi-spin'" aria-hidden="true"></span>
                    </ng-container>
                </ng-container>
                <ng-template #elseBlock>
                    <ng-container *ngIf="!dropdownIconTemplate">
                        <span *ngIf="dropdownIcon" class="p-multiselect-trigger-icon" [ngClass]="dropdownIcon" [attr.data-pc-section]="'triggericon'" [attr.aria-hidden]="true"></span>
                        <ChevronDownIcon *ngIf="!dropdownIcon" [styleClass]="'p-multiselect-trigger-icon'" [attr.data-pc-section]="'triggericon'" [attr.aria-hidden]="true" />
                    </ng-container>
                    <span *ngIf="dropdownIconTemplate" class="p-multiselect-trigger-icon" [attr.data-pc-section]="'triggericon'" [attr.aria-hidden]="true">
                        <ng-template *ngTemplateOutlet="dropdownIconTemplate"></ng-template>
                    </span>
                </ng-template>
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
                    <div [attr.id]="id + '_list'" [ngClass]="'p-multiselect-panel p-component'" [ngStyle]="panelStyle" [class]="panelStyleClass">
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
                        <div class="p-multiselect-header" *ngIf="showHeader">
                            <ng-content select="p-header"></ng-content>
                            <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                            <ng-container *ngIf="filterTemplate; else builtInFilterElement">
                                <ng-container *ngTemplateOutlet="filterTemplate; context: { options: filterOptions }"></ng-container>
                            </ng-container>
                            <ng-template #builtInFilterElement>
                                <div
                                    class="p-checkbox p-component"
                                    *ngIf="isSelectionAllDisabled()"
                                    [ngClass]="{ 'p-variant-filled': variant === 'filled' || config.inputStyle() === 'filled', 'p-checkbox-disabled': disabled || toggleAllDisabled }"
                                    (click)="onToggleAll($event)"
                                    (keydown)="onHeaderCheckboxKeyDown($event)"
                                >
                                    <div class="p-hidden-accessible" [attr.data-p-hidden-accessible]="true">
                                        <input
                                            #headerCheckbox
                                            type="checkbox"
                                            [readonly]="readonly"
                                            [attr.checked]="allSelected()"
                                            (focus)="onHeaderCheckboxFocus()"
                                            (blur)="onHeaderCheckboxBlur()"
                                            [disabled]="disabled || toggleAllDisabled"
                                            [attr.aria-label]="toggleAllAriaLabel"
                                        />
                                    </div>
                                    <div
                                        class="p-checkbox-box"
                                        role="checkbox"
                                        [attr.aria-label]="toggleAllAriaLabel"
                                        [attr.aria-checked]="allSelected()"
                                        [ngClass]="{ 'p-highlight': allSelected(), 'p-focus': headerCheckboxFocus, 'p-disabled': disabled || toggleAllDisabled }"
                                    >
                                        <ng-container *ngIf="allSelected() || partialSelected()">
                                            <ng-container *ngIf="!checkIconTemplate && !headerCheckboxIconTemplate">
                                                <CheckIcon [styleClass]="'p-checkbox-icon'" *ngIf="allSelected()" [attr.aria-hidden]="true" />
                                            </ng-container>

                                            <span *ngIf="checkIconTemplate" class="p-checkbox-icon" [attr.aria-hidden]="true">
                                                <ng-template *ngTemplateOutlet="checkIconTemplate; context: { $implicit: allSelected() }"></ng-template>
                                            </span>
                                            <span *ngIf="headerCheckboxIconTemplate" class="p-checkbox-icon" [attr.aria-hidden]="true">
                                                <ng-template *ngTemplateOutlet="headerCheckboxIconTemplate; context: { $implicit: allSelected(), partialSelected: partialSelected() }"></ng-template>
                                            </span>
                                        </ng-container>
                                    </div>
                                </div>
                                <div class="p-multiselect-filter-container" *ngIf="filter">
                                    <input
                                        #filterInput
                                        type="text"
                                        role="searchbox"
                                        [attr.autocomplete]="autocomplete"
                                        [attr.placeholder]="filterPlaceHolder"
                                        role="searchbox"
                                        [attr.aria-owns]="id + '_list'"
                                        [attr.aria-activedescendant]="focusedOptionId"
                                        [value]="_filterValue() || ''"
                                        (input)="onFilterInputChange($event)"
                                        (keydown)="onFilterKeyDown($event)"
                                        (click)="onInputClick($event)"
                                        (blur)="onFilterBlur($event)"
                                        class="p-multiselect-filter p-inputtext p-component"
                                        [disabled]="disabled"
                                        [attr.placeholder]="filterPlaceHolder"
                                        [attr.aria-label]="ariaFilterLabel"
                                    />
                                    <SearchIcon [styleClass]="'p-multiselect-filter-icon'" *ngIf="!filterIconTemplate" />
                                    <span *ngIf="filterIconTemplate" class="p-multiselect-filter-icon">
                                        <ng-template *ngTemplateOutlet="filterIconTemplate"></ng-template>
                                    </span>
                                </div>

                                <button class="p-multiselect-close p-link p-button-icon-only" type="button" (click)="close($event)" pRipple [attr.aria-label]="closeAriaLabel">
                                    <TimesIcon [styleClass]="'p-multiselect-close-icon'" *ngIf="!closeIconTemplate" />
                                    <span *ngIf="closeIconTemplate" class="p-multiselect-close-icon">
                                        <ng-template *ngTemplateOutlet="closeIconTemplate"></ng-template>
                                    </span>
                                </button>
                            </ng-template>
                        </div>
                        <div class="p-multiselect-items-wrapper" [style.max-height]="virtualScroll ? 'auto' : scrollHeight || 'auto'">
                            <p-scroller
                                *ngIf="virtualScroll"
                                #scroller
                                [items]="visibleOptions()"
                                [style]="{ height: scrollHeight }"
                                [itemSize]="virtualScrollItemSize || _itemSize"
                                [autoSize]="true"
                                [tabindex]="-1"
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
                                <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: visibleOptions(), options: {} }"></ng-container>
                            </ng-container>

                            <ng-template #buildInItems let-items let-scrollerOptions="options">
                                <ul #items class="p-multiselect-items p-component" [ngClass]="scrollerOptions.contentStyleClass" [style]="scrollerOptions.contentStyle" role="listbox" aria-multiselectable="true" [attr.aria-label]="listLabel">
                                    <ng-template ngFor let-option [ngForOf]="items" let-i="index">
                                        <ng-container *ngIf="isOptionGroup(option)">
                                            <li [attr.id]="id + '_' + getOptionIndex(i, scrollerOptions)" class="p-multiselect-item-group" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                                <span *ngIf="!groupTemplate">{{ getOptionGroupLabel(option.optionGroup) }}</span>
                                                <ng-container *ngTemplateOutlet="groupTemplate; context: { $implicit: option.optionGroup }"></ng-container>
                                            </li>
                                        </ng-container>
                                        <ng-container *ngIf="!isOptionGroup(option)">
                                            <p-multiSelectItem
                                                [id]="id + '_' + getOptionIndex(i, scrollerOptions)"
                                                [option]="option"
                                                [selected]="isSelected(option)"
                                                [label]="getOptionLabel(option)"
                                                [disabled]="isOptionDisabled(option)"
                                                [template]="itemTemplate"
                                                [checkIconTemplate]="checkIconTemplate"
                                                [itemCheckboxIconTemplate]="itemCheckboxIconTemplate"
                                                [itemSize]="scrollerOptions.itemSize"
                                                [focused]="focusedOptionIndex() === getOptionIndex(i, scrollerOptions)"
                                                [ariaPosInset]="getAriaPosInset(getOptionIndex(i, scrollerOptions))"
                                                [ariaSetSize]="ariaSetSize"
                                                (onClick)="onOptionSelect($event, false, getOptionIndex(i, scrollerOptions))"
                                                (onMouseEnter)="onOptionMouseEnter($event, getOptionIndex(i, scrollerOptions))"
                                            ></p-multiSelectItem>
                                        </ng-container>
                                    </ng-template>

                                    <li *ngIf="hasFilter() && isEmpty()" class="p-multiselect-empty-message" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                        <ng-container *ngIf="!emptyFilterTemplate && !emptyTemplate; else emptyFilter">
                                            {{ emptyFilterMessageLabel }}
                                        </ng-container>
                                        <ng-container #emptyFilter *ngTemplateOutlet="emptyFilterTemplate || emptyTemplate"></ng-container>
                                    </li>
                                    <li *ngIf="!hasFilter() && isEmpty()" class="p-multiselect-empty-message" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                        <ng-container *ngIf="!emptyTemplate; else empty">
                                            {{ emptyMessageLabel }}
                                        </ng-container>
                                        <ng-container #empty *ngTemplateOutlet="emptyTemplate"></ng-container>
                                    </li>
                                </ul>
                            </ng-template>
                        </div>
                        <div class="p-multiselect-footer" *ngIf="footerFacet || footerTemplate">
                            <ng-content select="p-footer"></ng-content>
                            <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                        </div>

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
    host: {
        class: 'p-element p-inputwrapper',
        '[class.p-inputwrapper-focus]': 'focused || overlayVisible',
        '[class.p-inputwrapper-filled]': 'filled'
    },
    providers: [MULTISELECT_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./multiselect.css']
})
export class MultiSelect implements OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, ControlValueAccessor {
    /**
     * Unique identifier of the component
     * @group Props
     */
    @Input() id: string | undefined;
    /**
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    @Input() ariaLabel: string | undefined;
    /**
     * Inline style of the element.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the element.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Inline style of the overlay panel.
     * @group Props
     */
    @Input() panelStyle: any;
    /**
     * Style class of the overlay panel element.
     * @group Props
     */
    @Input() panelStyleClass: string | undefined;
    /**
     * Identifier of the focus input to match a label defined for the component.
     * @group Props
     */
    @Input() inputId: string | undefined;
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) disabled: boolean | undefined;
    /**
     * When present, it specifies that the component cannot be edited.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) readonly: boolean | undefined;
    /**
     * Whether to display options as grouped when nested options are provided.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) group: boolean | undefined;
    /**
     * When specified, displays an input field to filter the items on keyup.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) filter: boolean = true;
    /**
     * Defines placeholder of the filter input.
     * @group Props
     */
    @Input() filterPlaceHolder: string | undefined;
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    @Input() filterLocale: string | undefined;
    /**
     * Specifies the visibility of the options panel.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) overlayVisible: boolean | undefined;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    @Input({ transform: numberAttribute }) tabindex: number | undefined = 0;
    /**
     * Specifies the input variant of the component.
     * @group Props
     */
    @Input() variant: 'filled' | 'outlined' = 'outlined';
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    @Input() appendTo: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any;
    /**
     * A property to uniquely identify a value in options.
     * @group Props
     */
    @Input() dataKey: string | undefined;
    /**
     * Name of the input element.
     * @group Props
     */
    @Input() name: string | undefined;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    @Input() ariaLabelledBy: string | undefined;
    /**
     * Whether to show labels of selected item labels or use default label.
     * @group Props
     * @defaultValue true
     */
    @Input() set displaySelectedLabel(val: boolean) {
        this._displaySelectedLabel = val;
    }
    get displaySelectedLabel(): boolean {
        return this._displaySelectedLabel;
    }
    /**
     * Decides how many selected item labels to show at most.
     * @group Props
     * @defaultValue 3
     */
    @Input() set maxSelectedLabels(val: number | null | undefined) {
        this._maxSelectedLabels = val;
    }
    get maxSelectedLabels(): number | null | undefined {
        return this._maxSelectedLabels;
    }
    /**
     * Decides how many selected item labels to show at most.
     * @group Props
     */
    @Input({ transform: numberAttribute }) selectionLimit: number | undefined;
    /**
     * Label to display after exceeding max selected labels e.g. ({0} items selected), defaults "ellipsis" keyword to indicate a text-overflow.
     * @group Props
     */
    @Input() selectedItemsLabel: string | undefined;
    /**
     * Whether to show the checkbox at header to toggle all items at once.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showToggleAll: boolean = true;
    /**
     * Text to display when filtering does not return any results.
     * @group Props
     */
    @Input() emptyFilterMessage: string = '';
    /**
     * Text to display when there is no data. Defaults to global value in i18n translation configuration.
     * @group Props
     */
    @Input() emptyMessage: string = '';
    /**
     * Clears the filter value when hiding the dropdown.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) resetFilterOnHide: boolean = false;
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
    @Input() optionGroupLabel: string | undefined = 'label';
    /**
     * Name of the options field of an option group.
     * @group Props
     */
    @Input() optionGroupChildren: string = 'items';
    /**
     * Whether to show the header.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showHeader: boolean = true;
    /**
     * When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.
     * @group Props
     */
    @Input() filterBy: string | undefined;
    /**
     * Height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.
     * @group Props
     */
    @Input() scrollHeight: string = '200px';
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) lazy: boolean = false;
    /**
     * Whether the data should be loaded on demand during scroll.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) virtualScroll: boolean | undefined;
    /**
     * Whether the multiselect is in loading state.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) loading: boolean | undefined = false;
    /**
     * Height of an item in the list for VirtualScrolling.
     * @group Props
     */
    @Input({ transform: numberAttribute }) virtualScrollItemSize: number | undefined;
    /**
     * Icon to display in loading state.
     * @group Props
     */
    @Input() loadingIcon: string | undefined;
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
     * Defines how the items are filtered.
     * @group Props
     */
    @Input() filterMatchMode: 'contains' | 'startsWith' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte' = 'contains';
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
    @Input({ transform: booleanAttribute }) autofocusFilter: boolean = true;
    /**
     * Defines how the selected items are displayed.
     * @group Props
     */
    @Input() display: string | 'comma' | 'chip' = 'comma';
    /**
     * Defines the autocomplete is active.
     * @group Props
     */
    @Input() autocomplete: string = 'off';
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showClear: boolean = false;
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autofocus: boolean | undefined;
    /**
     * @deprecated since v14.2.0, use overlayOptions property instead.
     * Whether to automatically manage layering.
     * @group Props
     */
    @Input() get autoZIndex(): boolean | undefined {
        return this._autoZIndex;
    }
    set autoZIndex(val: boolean | undefined) {
        this._autoZIndex = val;
        console.warn('The autoZIndex property is deprecated since v14.2.0, use overlayOptions property instead.');
    }
    /**
     * @deprecated since v14.2.0, use overlayOptions property instead.
     * Base zIndex value to use in layering.
     * @group Props
     */
    @Input() get baseZIndex(): number | undefined {
        return this._baseZIndex;
    }
    set baseZIndex(val: number | undefined) {
        this._baseZIndex = val;
        console.warn('The baseZIndex property is deprecated since v14.2.0, use overlayOptions property instead.');
    }
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
    /**
     * Label to display when there are no selections.
     * @group Props
     * @deprecated Use placeholder instead.
     */
    @Input() set defaultLabel(val: string | undefined) {
        this._defaultLabel = val;
        console.warn('defaultLabel property is deprecated since 16.6.0, use placeholder instead');
    }
    get defaultLabel(): string | undefined {
        return this._defaultLabel;
    }
    /**
     * Label to display when there are no selections.
     * @group Props
     */
    @Input() set placeholder(val: string | undefined) {
        this._placeholder.set(val);
    }
    get placeholder(): Signal<string | undefined> {
        return this._placeholder.asReadonly();
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
        if (!ObjectUtils.deepEquals(this._options(), val)) {
            this._options.set(val);
        }
    }
    /**
     * When specified, filter displays with this value.
     * @group Props
     */
    @Input() get filterValue(): string | undefined | null {
        return this._filterValue();
    }
    set filterValue(val: string | undefined | null) {
        this._filterValue.set(val);
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
    /**
     * Whether all data is selected.
     * @group Props
     */
    @Input() get selectAll(): boolean | undefined | null {
        return this._selectAll;
    }
    set selectAll(value: boolean | undefined | null) {
        this._selectAll = value;
    }
    /**
     * Indicates whether to focus on options when hovering over them, defaults to optionLabel.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) focusOnHover: boolean = false;
    /**
     * Fields used when filtering the options, defaults to optionLabel.
     * @group Props
     */
    @Input() filterFields: any[] | undefined;
    /**
     * Determines if the option will be selected on focus.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) selectOnFocus: boolean = false;
    /**
     * Whether to focus on the first visible or selected element when the overlay panel is shown.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autoOptionFocus: boolean = true;
    /**
     * Callback to invoke when value changes.
     * @param {MultiSelectChangeEvent} event - Custom change event.
     * @group Emits
     */
    @Output() onChange: EventEmitter<MultiSelectChangeEvent> = new EventEmitter<MultiSelectChangeEvent>();
    /**
     * Callback to invoke when data is filtered.
     * @param {MultiSelectFilterEvent} event - Custom filter event.
     * @group Emits
     */
    @Output() onFilter: EventEmitter<MultiSelectFilterEvent> = new EventEmitter<MultiSelectFilterEvent>();
    /**
     * Callback to invoke when multiselect receives focus.
     * @param {MultiSelectFocusEvent} event - Custom focus event.
     * @group Emits
     */
    @Output() onFocus: EventEmitter<MultiSelectFocusEvent> = new EventEmitter<MultiSelectFocusEvent>();
    /**
     * Callback to invoke when multiselect loses focus.
     * @param {MultiSelectBlurEvent} event - Custom blur event.
     * @group Emits
     */
    @Output() onBlur: EventEmitter<MultiSelectBlurEvent> = new EventEmitter<MultiSelectBlurEvent>();
    /**
     * Callback to invoke when component is clicked.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onClick: EventEmitter<Event> = new EventEmitter<Event>();
    /**
     * Callback to invoke when input field is cleared.
     * @group Emits
     */
    @Output() onClear: EventEmitter<void> = new EventEmitter<void>();
    /**
     * Callback to invoke when overlay panel becomes visible.
     * @group Emits
     */
    @Output() onPanelShow: EventEmitter<void> = new EventEmitter<void>();
    /**
     * Callback to invoke when overlay panel becomes hidden.
     * @group Emits
     */
    @Output() onPanelHide: EventEmitter<void> = new EventEmitter<void>();
    /**
     * Callback to invoke in lazy mode to load new data.
     * @param {MultiSelectLazyLoadEvent} event - Lazy load event.
     * @group Emits
     */
    @Output() onLazyLoad: EventEmitter<MultiSelectLazyLoadEvent> = new EventEmitter<MultiSelectLazyLoadEvent>();
    /**
     * Callback to invoke in lazy mode to load new data.
     * @param {MultiSelectRemoveEvent} event - Remove event.
     * @group Emits
     */
    @Output() onRemove: EventEmitter<MultiSelectRemoveEvent> = new EventEmitter<MultiSelectRemoveEvent>();
    /**
     * Callback to invoke when all data is selected.
     * @param {MultiSelectSelectAllChangeEvent} event - Custom select event.
     * @group Emits
     */
    @Output() onSelectAllChange: EventEmitter<MultiSelectSelectAllChangeEvent> = new EventEmitter<MultiSelectSelectAllChangeEvent>();

    @ViewChild('container') containerViewChild: Nullable<ElementRef>;

    @ViewChild('overlay') overlayViewChild: Nullable<Overlay>;

    @ViewChild('filterInput') filterInputChild: Nullable<ElementRef>;

    @ViewChild('focusInput') focusInputViewChild: Nullable<ElementRef>;

    @ViewChild('items') itemsViewChild: Nullable<ElementRef>;

    @ViewChild('scroller') scroller: Nullable<Scroller>;

    @ViewChild('lastHiddenFocusableEl') lastHiddenFocusableElementOnOverlay: Nullable<ElementRef>;

    @ViewChild('firstHiddenFocusableEl') firstHiddenFocusableElementOnOverlay: Nullable<ElementRef>;

    @ViewChild('headerCheckbox') headerCheckboxViewChild: Nullable<ElementRef>;

    @ContentChild(Footer) footerFacet: any;

    @ContentChild(Header) headerFacet: any;

    @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<PrimeTemplate>>;

    searchValue: Nullable<string>;

    searchTimeout: any;

    _selectAll: boolean | undefined | null = null;

    _autoZIndex: boolean | undefined;

    _baseZIndex: number | undefined;

    _showTransitionOptions: string | undefined;

    _hideTransitionOptions: string | undefined;

    _defaultLabel: string | undefined;

    _placeholder = signal<string | undefined>(undefined);

    _itemSize: number | undefined;

    _selectionLimit: number | undefined;

    _disableTooltip = false;

    value: any[];

    public _filteredOptions: any[] | undefined | null;

    public onModelChange: Function = () => {};

    public onModelTouched: Function = () => {};

    public valuesAsString: string | undefined;

    public focus: boolean | undefined;

    public filtered: boolean | undefined;

    public itemTemplate: TemplateRef<any> | undefined;

    public groupTemplate: TemplateRef<any> | undefined;

    public loaderTemplate: TemplateRef<any> | undefined;

    public headerTemplate: TemplateRef<any> | undefined;

    public filterTemplate: TemplateRef<any> | undefined;

    public footerTemplate: TemplateRef<any> | undefined;

    public emptyFilterTemplate: TemplateRef<any> | undefined;

    public emptyTemplate: TemplateRef<any> | undefined;

    public selectedItemsTemplate: TemplateRef<any> | undefined;

    checkIconTemplate: TemplateRef<any> | undefined;

    loadingIconTemplate: TemplateRef<any> | undefined;

    filterIconTemplate: TemplateRef<any> | undefined;

    removeTokenIconTemplate: TemplateRef<any> | undefined;

    closeIconTemplate: TemplateRef<any> | undefined;

    clearIconTemplate: TemplateRef<any> | undefined;

    dropdownIconTemplate: TemplateRef<any> | undefined;

    itemCheckboxIconTemplate: TemplateRef<any> | undefined;

    headerCheckboxIconTemplate: TemplateRef<any> | undefined;

    public headerCheckboxFocus: boolean | undefined;

    filterOptions: MultiSelectFilterOptions | undefined;

    preventModelTouched: boolean | undefined;

    preventDocumentDefault: boolean | undefined;

    focused: boolean = false;

    itemsWrapper: any;

    _displaySelectedLabel: boolean = true;

    _maxSelectedLabels: number = 3;

    modelValue = signal<any>(null);

    _filterValue = signal<any>(null);

    _options = signal<any[]>(null);

    startRangeIndex = signal<number>(-1);

    focusedOptionIndex = signal<number>(-1);

    selectedOptions: any;

    clickInProgress: boolean = false;

    get containerClass() {
        return {
            'p-multiselect p-component p-inputwrapper': true,
            'p-disabled': this.disabled,
            'p-multiselect-clearable': this.showClear && !this.disabled,
            'p-multiselect-chip': this.display === 'chip',
            'p-focus': this.focused,
            'p-variant-filled': this.variant === 'filled' || this.config.inputStyle() === 'filled'
        };
    }

    get inputClass() {
        return {
            'p-multiselect-label p-inputtext': true,
            'p-placeholder': (this.placeholder() || this.defaultLabel) && (this.label() === this.placeholder() || this.label() === this.defaultLabel),
            'p-multiselect-label-empty': !this.selectedItemsTemplate && (this.label() === 'p-emptylabel' || this.label().length === 0)
        };
    }

    get panelClass() {
        return {
            'p-multiselect-panel p-component': true,
            'p-input-filled': this.config.inputStyle() === 'filled',
            'p-ripple-disabled': this.config.ripple === false
        };
    }

    get labelClass() {
        return {
            'p-multiselect-label': true,
            'p-placeholder': this.label() === this.placeholder() || this.label() === this.defaultLabel,
            'p-multiselect-label-empty': !this.placeholder() && !this.defaultLabel && (!this.modelValue() || this.modelValue().length === 0)
        };
    }

    get emptyMessageLabel(): string {
        return this.emptyMessage || this.config.getTranslation(TranslationKeys.EMPTY_MESSAGE);
    }

    get emptyFilterMessageLabel(): string {
        return this.emptyFilterMessage || this.config.getTranslation(TranslationKeys.EMPTY_FILTER_MESSAGE);
    }

    get filled(): boolean {
        if (typeof this.modelValue() === 'string') return !!this.modelValue();

        return ObjectUtils.isNotEmpty(this.modelValue());
    }

    get isVisibleClearIcon(): boolean | undefined {
        return this.modelValue() != null && this.modelValue() !== '' && ObjectUtils.isNotEmpty(this.modelValue()) && this.showClear && !this.disabled && this.filled;
    }

    get toggleAllAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria[this.allSelected() ? 'selectAll' : 'unselectAll'] : undefined;
    }

    get closeAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.close : undefined;
    }

    get listLabel(): string {
        return this.config.getTranslation(TranslationKeys.ARIA)['listLabel'];
    }

    private getAllVisibleAndNonVisibleOptions() {
        return this.group ? this.flatOptions(this.options) : this.options || [];
    }

    visibleOptions = computed(() => {
        const options = this.getAllVisibleAndNonVisibleOptions();
        const isArrayOfObjects = ObjectUtils.isArray(options) && ObjectUtils.isObject(options[0]);

        if (this._filterValue()) {
            let filteredOptions;

            if (isArrayOfObjects) {
                filteredOptions = this.filterService.filter(options, this.searchFields(), this._filterValue(), this.filterMatchMode, this.filterLocale);
            } else {
                filteredOptions = options.filter((option) => option.toString().toLocaleLowerCase().includes(this._filterValue().toLocaleLowerCase()));
            }

            if (this.group) {
                const optionGroups = this.options || [];
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
    });

    label = computed(() => {
        let label;
        const modelValue = this.modelValue();

        if (modelValue && modelValue.length && this.displaySelectedLabel) {
            if (ObjectUtils.isNotEmpty(this.maxSelectedLabels) && modelValue.length > this.maxSelectedLabels) {
                return this.getSelectedItemsLabel();
            } else {
                label = '';

                for (let i = 0; i < modelValue.length; i++) {
                    if (i !== 0) {
                        label += ', ';
                    }

                    label += this.getLabelByValue(modelValue[i]);
                }
            }
        } else {
            label = this.placeholder() || this.defaultLabel || '';
        }
        return label;
    });

    chipSelectedItems = computed(() => {
        return ObjectUtils.isNotEmpty(this.maxSelectedLabels) && this.modelValue() && this.modelValue().length > this.maxSelectedLabels ? this.modelValue().slice(0, this.maxSelectedLabels) : this.modelValue();
    });

    constructor(
        public el: ElementRef,
        public renderer: Renderer2,
        public cd: ChangeDetectorRef,
        public zone: NgZone,
        public filterService: FilterService,
        public config: PrimeNGConfig,
        public overlayService: OverlayService
    ) {
        effect(() => {
            const modelValue = this.modelValue();

            const visibleOptions = this.visibleOptions();
            if (visibleOptions && ObjectUtils.isNotEmpty(visibleOptions)) {
                if (this.optionValue && this.optionLabel && modelValue) {
                    this.selectedOptions = visibleOptions.filter((option) => modelValue.includes(option[this.optionLabel]) || modelValue.includes(option[this.optionValue]));
                } else {
                    this.selectedOptions = modelValue;
                }
                this.cd.markForCheck();
            }
        });
    }

    ngOnInit() {
        this.id = this.id || UniqueComponentId();
        this.autoUpdateModel();

        if (this.filterBy) {
            this.filterOptions = {
                filter: (value) => this.onFilterInputChange(value),
                reset: () => this.resetFilter()
            };
        }
    }

    maxSelectionLimitReached() {
        return ObjectUtils.isNotEmpty(this.selectionLimit) && this.modelValue() && this.modelValue().length === this.selectionLimit;
    }

    ngAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;

                case 'group':
                    this.groupTemplate = item.template;
                    break;

                case 'selectedItems':
                    this.selectedItemsTemplate = item.template;
                    break;

                case 'header':
                    this.headerTemplate = item.template;
                    break;

                case 'filter':
                    this.filterTemplate = item.template;
                    break;

                case 'emptyfilter':
                    this.emptyFilterTemplate = item.template;
                    break;

                case 'empty':
                    this.emptyTemplate = item.template;
                    break;

                case 'footer':
                    this.footerTemplate = item.template;
                    break;

                case 'loader':
                    this.loaderTemplate = item.template;
                    break;

                case 'checkicon':
                    this.checkIconTemplate = item.template;
                    console.warn('checkicon is deprecated and will removed in v18. Use itemcheckboxicon or headercheckboxicon templates instead.');
                    break;

                case 'headercheckboxicon':
                    this.headerCheckboxIconTemplate = item.template;
                    break;

                case 'loadingicon':
                    this.loadingIconTemplate = item.template;
                    break;

                case 'filtericon':
                    this.filterIconTemplate = item.template;
                    break;

                case 'removetokenicon':
                    this.removeTokenIconTemplate = item.template;
                    break;

                case 'closeicon':
                    this.closeIconTemplate = item.template;
                    break;

                case 'clearicon':
                    this.clearIconTemplate = item.template;
                    break;

                case 'dropdownicon':
                    this.dropdownIconTemplate = item.template;
                    break;

                case 'itemcheckboxicon':
                    this.itemCheckboxIconTemplate = item.template;
                    break;

                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }

    ngAfterViewInit() {
        if (this.overlayVisible) {
            this.show();
        }
    }

    ngAfterViewChecked() {
        if (this.filtered) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    this.overlayViewChild?.alignOverlay();
                }, 1);
            });
            this.filtered = false;
        }
    }

    flatOptions(options) {
        return (options || []).reduce((result, option, index) => {
            result.push({ optionGroup: option, group: true, index });

            const optionGroupChildren = this.getOptionGroupChildren(option);

            optionGroupChildren && optionGroupChildren.forEach((o) => result.push(o));

            return result;
        }, []);
    }

    autoUpdateModel() {
        if (this.selectOnFocus && this.autoOptionFocus && !this.hasSelectedOption()) {
            this.focusedOptionIndex.set(this.findFirstFocusedOptionIndex());
            const value = this.getOptionValue(this.visibleOptions()[this.focusedOptionIndex()]);
            this.onOptionSelect({ originalEvent: null, option: [value] });
        }
    }

    /**
     * Updates the model value.
     * @group Method
     */
    public updateModel(value, event?) {
        this.value = value;
        this.onModelChange(value);
        this.modelValue.set(value);
    }

    onInputClick(event) {
        event.stopPropagation();
        event.preventDefault();
        this.focusedOptionIndex.set(-1);
    }

    onOptionSelect(event, isFocus = false, index = -1) {
        const { originalEvent, option } = event;
        if (this.disabled || this.isOptionDisabled(option)) {
            return;
        }

        let selected = this.isSelected(option);
        let value = null;
        if (selected) {
            value = this.modelValue().filter((val) => !ObjectUtils.equals(val, this.getOptionValue(option), this.equalityKey()));
            this.onRemove.emit({ newValue: this.value, removed: this.getOptionValue(option) });
        } else {
            value = [...(this.modelValue() || []), this.getOptionValue(option)];
        }

        this.updateModel(value, originalEvent);
        index !== -1 && this.focusedOptionIndex.set(index);

        isFocus && DomHandler.focus(this.focusInputViewChild?.nativeElement);

        this.onChange.emit({
            originalEvent: { ...event, selected: !event.selected },
            value: value,
            itemValue: option
        });
    }

    findSelectedOptionIndex() {
        return this.hasSelectedOption() ? this.visibleOptions().findIndex((option) => this.isValidSelectedOption(option)) : -1;
    }

    onOptionSelectRange(event, start = -1, end = -1) {
        start === -1 && (start = this.findNearestSelectedOptionIndex(end, true));
        end === -1 && (end = this.findNearestSelectedOptionIndex(start));

        if (start !== -1 && end !== -1) {
            const rangeStart = Math.min(start, end);
            const rangeEnd = Math.max(start, end);
            const value = this.visibleOptions()
                .slice(rangeStart, rangeEnd + 1)
                .filter((option) => this.isValidOption(option))
                .map((option) => this.getOptionValue(option));

            this.updateModel(value, event);
        }
    }

    searchFields() {
        return (this.filterBy || this.optionLabel || 'label').split(',');
    }

    findNearestSelectedOptionIndex(index, firstCheckUp = false) {
        let matchedOptionIndex = -1;

        if (this.hasSelectedOption()) {
            if (firstCheckUp) {
                matchedOptionIndex = this.findPrevSelectedOptionIndex(index);
                matchedOptionIndex = matchedOptionIndex === -1 ? this.findNextSelectedOptionIndex(index) : matchedOptionIndex;
            } else {
                matchedOptionIndex = this.findNextSelectedOptionIndex(index);
                matchedOptionIndex = matchedOptionIndex === -1 ? this.findPrevSelectedOptionIndex(index) : matchedOptionIndex;
            }
        }

        return matchedOptionIndex > -1 ? matchedOptionIndex : index;
    }

    findPrevSelectedOptionIndex(index) {
        const matchedOptionIndex = this.hasSelectedOption() && index > 0 ? ObjectUtils.findLastIndex(this.visibleOptions().slice(0, index), (option) => this.isValidSelectedOption(option)) : -1;

        return matchedOptionIndex > -1 ? matchedOptionIndex : -1;
    }

    findFirstFocusedOptionIndex() {
        const selectedIndex = this.findFirstSelectedOptionIndex();

        return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
    }

    findFirstOptionIndex() {
        return this.visibleOptions().findIndex((option) => this.isValidOption(option));
    }

    findFirstSelectedOptionIndex() {
        return this.hasSelectedOption() ? this.visibleOptions().findIndex((option) => this.isValidSelectedOption(option)) : -1;
    }

    findNextSelectedOptionIndex(index) {
        const matchedOptionIndex =
            this.hasSelectedOption() && index < this.visibleOptions().length - 1
                ? this.visibleOptions()
                      .slice(index + 1)
                      .findIndex((option) => this.isValidSelectedOption(option))
                : -1;

        return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : -1;
    }

    equalityKey() {
        return this.optionValue ? null : this.dataKey;
    }

    hasSelectedOption() {
        return ObjectUtils.isNotEmpty(this.modelValue());
    }

    isSelectionAllDisabled() {
        return this.showToggleAll && ObjectUtils.isEmpty(this.selectionLimit);
    }

    isValidSelectedOption(option) {
        return this.isValidOption(option) && this.isSelected(option);
    }

    isOptionGroup(option) {
        return (this.group || this.optionGroupLabel) && option.optionGroup && option.group;
    }

    isValidOption(option) {
        return option && !(this.isOptionDisabled(option) || this.isOptionGroup(option));
    }

    isOptionDisabled(option: any) {
        if (this.maxSelectionLimitReached() && !this.isSelected(option)) {
            return true;
        }
        return this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : option && option.disabled !== undefined ? option.disabled : false;
    }

    isSelected(option) {
        const optionValue = this.getOptionValue(option);
        return (this.modelValue() || []).some((value) => ObjectUtils.equals(value, optionValue, this.equalityKey()));
    }

    isOptionMatched(option) {
        return this.isValidOption(option) && this.getOptionLabel(option).toString().toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale));
    }

    isEmpty() {
        return !this._options() || (this.visibleOptions() && this.visibleOptions().length === 0);
    }

    getOptionIndex(index, scrollerOptions) {
        return this.virtualScrollerDisabled ? index : scrollerOptions && scrollerOptions.getItemOptions(index)['index'];
    }

    getAriaPosInset(index) {
        return (
            (this.optionGroupLabel
                ? index -
                  this.visibleOptions()
                      .slice(0, index)
                      .filter((option) => this.isOptionGroup(option)).length
                : index) + 1
        );
    }

    get ariaSetSize() {
        return this.visibleOptions().filter((option) => !this.isOptionGroup(option)).length;
    }

    getLabelByValue(value) {
        const options = this.group ? this.flatOptions(this._options()) : this._options() || [];
        const matchedOption = options.find((option) => !this.isOptionGroup(option) && ObjectUtils.equals(this.getOptionValue(option), value, this.equalityKey()));
        return matchedOption ? this.getOptionLabel(matchedOption) : null;
    }

    getSelectedItemsLabel() {
        let pattern = /{(.*?)}/;
        let message = this.selectedItemsLabel ? this.selectedItemsLabel : this.config.getTranslation(TranslationKeys.SELECTION_MESSAGE);

        if (pattern.test(message)) {
            return message.replace(message.match(pattern)[0], this.modelValue().length + '');
        }

        return message;
    }

    getOptionLabel(option: any) {
        return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : option && option.label != undefined ? option.label : option;
    }

    getOptionValue(option: any) {
        return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : !this.optionLabel && option && option.value !== undefined ? option.value : option;
    }

    getOptionGroupLabel(optionGroup: any) {
        return this.optionGroupLabel ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel) : optionGroup && optionGroup.label != undefined ? optionGroup.label : optionGroup;
    }

    getOptionGroupChildren(optionGroup: any) {
        return this.optionGroupChildren ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren) : optionGroup.items;
    }

    onKeyDown(event: KeyboardEvent) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }

        const metaKey = event.metaKey || event.ctrlKey;

        switch (event.code) {
            case 'ArrowDown':
                this.onArrowDownKey(event);
                break;

            case 'ArrowUp':
                this.onArrowUpKey(event);
                break;

            case 'Home':
                this.onHomeKey(event);
                break;

            case 'End':
                this.onEndKey(event);
                break;

            case 'PageDown':
                this.onPageDownKey(event);
                break;

            case 'PageUp':
                this.onPageUpKey(event);
                break;

            case 'Enter':
            case 'Space':
                this.onEnterKey(event);
                break;

            case 'Escape':
                this.onEscapeKey(event);
                break;

            case 'Tab':
                this.onTabKey(event);
                break;

            case 'ShiftLeft':
            case 'ShiftRight':
                this.onShiftKey();
                break;

            default:
                if (event.code === 'KeyA' && metaKey) {
                    const value = this.visibleOptions()
                        .filter((option) => this.isValidOption(option))
                        .map((option) => this.getOptionValue(option));

                    this.updateModel(value, event);

                    event.preventDefault();
                    break;
                }

                if (!metaKey && ObjectUtils.isPrintableCharacter(event.key)) {
                    !this.overlayVisible && this.show();
                    this.searchOptions(event, event.key);
                    event.preventDefault();
                }

                break;
        }
    }

    onFilterKeyDown(event: KeyboardEvent) {
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
            case 'NumpadEnter':
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

    onArrowLeftKey(event: KeyboardEvent, pressedInInputText: boolean = false) {
        pressedInInputText && this.focusedOptionIndex.set(-1);
    }

    onArrowDownKey(event) {
        const optionIndex = this.focusedOptionIndex() !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex()) : this.findFirstFocusedOptionIndex();

        if (event.shiftKey) {
            this.onOptionSelectRange(event, this.startRangeIndex(), optionIndex);
        }

        this.changeFocusedOptionIndex(event, optionIndex);
        !this.overlayVisible && this.show();
        event.preventDefault();
        event.stopPropagation();
    }

    onArrowUpKey(event, pressedInInputText = false) {
        if (event.altKey && !pressedInInputText) {
            if (this.focusedOptionIndex() !== -1) {
                this.onOptionSelect(event, this.visibleOptions()[this.focusedOptionIndex()]);
            }

            this.overlayVisible && this.hide();
            event.preventDefault();
        } else {
            const optionIndex = this.focusedOptionIndex() !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex()) : this.findLastFocusedOptionIndex();

            if (event.shiftKey) {
                this.onOptionSelectRange(event, optionIndex, this.startRangeIndex());
            }

            this.changeFocusedOptionIndex(event, optionIndex);

            !this.overlayVisible && this.show();
            event.preventDefault();
        }
        event.stopPropagation();
    }

    onHomeKey(event, pressedInInputText = false) {
        const { currentTarget } = event;

        if (pressedInInputText) {
            const len = currentTarget.value.length;

            currentTarget.setSelectionRange(0, event.shiftKey ? len : 0);
            this.focusedOptionIndex.set(-1);
        } else {
            let metaKey = event.metaKey || event.ctrlKey;
            let optionIndex = this.findFirstOptionIndex();

            if (event.shiftKey && metaKey) {
                this.onOptionSelectRange(event, optionIndex, this.startRangeIndex());
            }

            this.changeFocusedOptionIndex(event, optionIndex);

            !this.overlayVisible && this.show();
        }

        event.preventDefault();
    }

    onEndKey(event, pressedInInputText = false) {
        const { currentTarget } = event;

        if (pressedInInputText) {
            const len = currentTarget.value.length;
            currentTarget.setSelectionRange(event.shiftKey ? 0 : len, len);
            this.focusedOptionIndex.set(-1);
        } else {
            let metaKey = event.metaKey || event.ctrlKey;
            let optionIndex = this.findLastFocusedOptionIndex();

            if (event.shiftKey && metaKey) {
                this.onOptionSelectRange(event, this.startRangeIndex(), optionIndex);
            }

            this.changeFocusedOptionIndex(event, optionIndex);

            !this.overlayVisible && this.show();
        }

        event.preventDefault();
    }

    onPageDownKey(event) {
        this.scrollInView(this.visibleOptions().length - 1);
        event.preventDefault();
    }

    onPageUpKey(event) {
        this.scrollInView(0);
        event.preventDefault();
    }

    onEnterKey(event) {
        if (!this.overlayVisible) {
            this.onArrowDownKey(event);
        } else {
            if (this.focusedOptionIndex() !== -1) {
                if (event.shiftKey) {
                    this.onOptionSelectRange(event, this.focusedOptionIndex());
                } else {
                    this.onOptionSelect({ originalEvent: event, option: this.visibleOptions()[this.focusedOptionIndex()] });
                }
            }
        }

        event.preventDefault();
    }

    onEscapeKey(event) {
        this.overlayVisible && this.hide(true);
        event.preventDefault();
    }

    onDeleteKey(event: KeyboardEvent) {
        if (this.showClear) {
            this.clear(event);
            event.preventDefault();
        }
    }

    onTabKey(event, pressedInInputText = false) {
        if (!pressedInInputText) {
            if (this.overlayVisible && this.hasFocusableElements()) {
                DomHandler.focus(event.shiftKey ? this.lastHiddenFocusableElementOnOverlay.nativeElement : this.firstHiddenFocusableElementOnOverlay.nativeElement);

                event.preventDefault();
            } else {
                if (this.focusedOptionIndex() !== -1) {
                    this.onOptionSelect({ originalEvent: event, option: this.visibleOptions()[this.focusedOptionIndex()] });
                }

                this.overlayVisible && this.hide(this.filter);
            }
        }
    }

    onShiftKey() {
        this.startRangeIndex.set(this.focusedOptionIndex());
    }

    onContainerClick(event: any) {
        if (this.disabled || this.loading || this.readonly || (event.target as Node).isSameNode(this.focusInputViewChild?.nativeElement)) {
            return;
        }

        if (event.target.tagName === 'INPUT' || event.target.getAttribute('data-pc-section') === 'clearicon' || event.target.closest('[data-pc-section="clearicon"]')) {
            event.preventDefault();
            return;
        } else if (!this.overlayViewChild || !this.overlayViewChild.el.nativeElement.contains(event.target)) {
            if (this.clickInProgress) {
                return;
            }

            this.clickInProgress = true;

            setTimeout(() => {
                this.clickInProgress = false;
            }, 150);

            this.overlayVisible ? this.hide(true) : this.show(true);
        }
        this.focusInputViewChild?.nativeElement.focus({ preventScroll: true });
        this.onClick.emit(event);
        this.cd.detectChanges();
    }

    onFirstHiddenFocus(event) {
        const focusableEl =
            event.relatedTarget === this.focusInputViewChild?.nativeElement
                ? DomHandler.getFirstFocusableElement(this.overlayViewChild?.overlayViewChild?.nativeElement, ':not([data-p-hidden-focusable="true"])')
                : this.focusInputViewChild?.nativeElement;

        DomHandler.focus(focusableEl);
    }

    onInputFocus(event: Event) {
        this.focused = true;
        const focusedOptionIndex = this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : this.overlayVisible && this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
        this.focusedOptionIndex.set(focusedOptionIndex);
        this.overlayVisible && this.scrollInView(this.focusedOptionIndex());
        this.onFocus.emit({ originalEvent: event });
    }

    onInputBlur(event: Event) {
        this.focused = false;
        this.onBlur.emit({ originalEvent: event });

        if (!this.preventModelTouched) {
            this.onModelTouched();
        }
        this.preventModelTouched = false;
    }

    onFilterInputChange(event: KeyboardEvent) {
        let value: string = (event.target as HTMLInputElement).value;
        this._filterValue.set(value);
        this.focusedOptionIndex.set(-1);
        this.onFilter.emit({ originalEvent: event, filter: this._filterValue() });

        !this.virtualScrollerDisabled && this.scroller.scrollToIndex(0);
        setTimeout(() => {
            this.overlayViewChild.alignOverlay();
        });
    }

    onLastHiddenFocus(event) {
        const focusableEl =
            event.relatedTarget === this.focusInputViewChild?.nativeElement
                ? DomHandler.getLastFocusableElement(this.overlayViewChild?.overlayViewChild?.nativeElement, ':not([data-p-hidden-focusable="true"])')
                : this.focusInputViewChild?.nativeElement;

        DomHandler.focus(focusableEl);
    }

    onOptionMouseEnter(event, index) {
        if (this.focusOnHover) {
            this.changeFocusedOptionIndex(event, index);
        }
    }

    onHeaderCheckboxKeyDown(event) {
        if (this.disabled) {
            event.preventDefault();

            return;
        }

        switch (event.code) {
            case 'Space':
                this.onToggleAll(event);
                break;
            case 'Enter':
                this.onToggleAll(event);
                break;
            default:
                break;
        }
    }

    onFilterBlur(event) {
        this.focusedOptionIndex.set(-1);
    }

    onHeaderCheckboxFocus() {
        this.headerCheckboxFocus = true;
    }

    onHeaderCheckboxBlur() {
        this.headerCheckboxFocus = false;
    }

    onToggleAll(event) {
        if (this.disabled || this.readonly) {
            return;
        }

        if (this.selectAll != null) {
            this.onSelectAllChange.emit({
                originalEvent: event,
                checked: !this.allSelected()
            });
        } else {
            // pre-selected disabled options should always be selected.
            const selectedDisabledOptions = this.getAllVisibleAndNonVisibleOptions().filter(
                (option) => this.isSelected(option) && (this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : option && option.disabled !== undefined ? option.disabled : false)
            );

            const visibleOptions = this.allSelected()
                ? this.visibleOptions().filter((option) => !this.isValidOption(option) && this.isSelected(option))
                : this.visibleOptions().filter((option) => this.isSelected(option) || this.isValidOption(option));

            const optionValues = [...selectedDisabledOptions, ...visibleOptions].map((option) => this.getOptionValue(option));
            const value = [...new Set(optionValues)];

            this.updateModel(value, event);

            // because onToggleAll could have been called during filtering, this additional test needs to be performed before calling onSelectAllChange.emit
            if (!value.length || value.length === this.getAllVisibleAndNonVisibleOptions().length) {
                this.onSelectAllChange.emit({
                    originalEvent: event,
                    checked: !!value.length
                });
            }
        }

        if (this.partialSelected()) {
            this.selectedOptions = null;
            this.cd.markForCheck();
        }

        this.onChange.emit({ originalEvent: event, value: this.value });
        DomHandler.focus(this.headerCheckboxViewChild?.nativeElement);
        this.headerCheckboxFocus = true;

        event.preventDefault();
        event.stopPropagation();
    }

    changeFocusedOptionIndex(event, index) {
        if (this.focusedOptionIndex() !== index) {
            this.focusedOptionIndex.set(index);
            this.scrollInView();
        }
    }

    get virtualScrollerDisabled() {
        return !this.virtualScroll;
    }

    scrollInView(index = -1) {
        const id = index !== -1 ? `${this.id}_${index}` : this.focusedOptionId;
        if (this.itemsViewChild && this.itemsViewChild.nativeElement) {
            const element = DomHandler.findSingle(this.itemsViewChild.nativeElement, `li[id="${id}"]`);
            if (element) {
                element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
            } else if (!this.virtualScrollerDisabled) {
                setTimeout(() => {
                    this.virtualScroll && this.scroller?.scrollToIndex(index !== -1 ? index : this.focusedOptionIndex());
                }, 0);
            }
        }
    }

    get focusedOptionId() {
        return this.focusedOptionIndex() !== -1 ? `${this.id}_${this.focusedOptionIndex()}` : null;
    }

    writeValue(value: any): void {
        this.value = value;
        if (!ObjectUtils.isEmpty(this.selectionLimit) && ObjectUtils.isEmpty(this.value)) {
            this.modelValue.set([]);
        } else {
            this.modelValue.set(this.value);
        }

        this.cd.markForCheck();
    }

    public registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    public registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    setDisabledState(val: boolean): void {
        this.disabled = val;
        this.cd.markForCheck();
    }

    allSelected() {
        return this.selectAll !== null ? this.selectAll : ObjectUtils.isNotEmpty(this.visibleOptions()) && this.visibleOptions().every((option) => this.isOptionGroup(option) || this.isOptionDisabled(option) || this.isSelected(option));
    }

    partialSelected() {
        return this.selectedOptions && this.selectedOptions.length > 0 && this.selectedOptions.length < this.options.length;
    }

    /**
     * Displays the panel.
     * @group Method
     */
    public show(isFocus?) {
        this.overlayVisible = true;
        const focusedOptionIndex = this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
        this.focusedOptionIndex.set(focusedOptionIndex);

        if (isFocus) {
            DomHandler.focus(this.focusInputViewChild?.nativeElement);
        }

        this.cd.markForCheck();
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
        if (this.overlayOptions?.mode === 'modal') {
            DomHandler.unblockBodyScroll();
        }

        isFocus && DomHandler.focus(this.focusInputViewChild?.nativeElement);
        this.onPanelHide.emit();
        this.cd.markForCheck();
    }

    onOverlayAnimationStart(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
                this.itemsWrapper = DomHandler.findSingle(this.overlayViewChild?.overlayViewChild?.nativeElement, this.virtualScroll ? '.p-scroller' : '.p-multiselect-items-wrapper');
                this.virtualScroll && this.scroller?.setContentEl(this.itemsViewChild?.nativeElement);

                if (this._options() && this._options().length) {
                    if (this.virtualScroll) {
                        const selectedIndex = ObjectUtils.isNotEmpty(this.modelValue()) ? this.focusedOptionIndex() : -1;
                        if (selectedIndex !== -1) {
                            this.scroller?.scrollToIndex(selectedIndex);
                        }
                    } else {
                        let selectedListItem = DomHandler.findSingle(this.itemsWrapper, '[data-p-highlight="true"]');

                        if (selectedListItem) {
                            selectedListItem.scrollIntoView({ block: 'nearest', inline: 'nearest' });
                        }
                    }
                }

                if (this.filterInputChild && this.filterInputChild.nativeElement) {
                    this.preventModelTouched = true;

                    if (this.autofocusFilter) {
                        this.filterInputChild.nativeElement.focus();
                    }
                }

                this.onPanelShow.emit();
            case 'void':
                this.itemsWrapper = null;
                this.onModelTouched();
                break;
        }
    }

    resetFilter() {
        if (this.filterInputChild && this.filterInputChild.nativeElement) {
            this.filterInputChild.nativeElement.value = '';
        }

        this._filterValue.set(null);
        this._filteredOptions = null;
    }

    close(event: Event) {
        this.hide();
        event.preventDefault();
        event.stopPropagation();
    }

    clear(event: Event) {
        this.value = null;
        this.updateModel(null, event);
        this.selectedOptions = null;
        this.onClear.emit();
        this._disableTooltip = true;

        event.stopPropagation();
    }

    labelContainerMouseLeave() {
        if (this._disableTooltip) this._disableTooltip = false;
    }

    removeOption(optionValue, event) {
        let value = this.modelValue().filter((val) => !ObjectUtils.equals(val, optionValue, this.equalityKey()));

        this.updateModel(value, event);
        this.onChange.emit({
            originalEvent: event,
            value: value,
            itemValue: optionValue
        });

        event && event.stopPropagation();
    }

    findNextItem(item: any): HTMLElement | null {
        let nextItem = item.nextElementSibling;

        if (nextItem) return DomHandler.hasClass(nextItem.children[0], 'p-disabled') || DomHandler.isHidden(nextItem.children[0]) || DomHandler.hasClass(nextItem, 'p-multiselect-item-group') ? this.findNextItem(nextItem) : nextItem.children[0];
        else return null;
    }

    findPrevItem(item: any): HTMLElement | null {
        let prevItem = item.previousElementSibling;

        if (prevItem) return DomHandler.hasClass(prevItem.children[0], 'p-disabled') || DomHandler.isHidden(prevItem.children[0]) || DomHandler.hasClass(prevItem, 'p-multiselect-item-group') ? this.findPrevItem(prevItem) : prevItem.children[0];
        else return null;
    }

    findNextOptionIndex(index) {
        const matchedOptionIndex =
            index < this.visibleOptions().length - 1
                ? this.visibleOptions()
                      .slice(index + 1)
                      .findIndex((option) => this.isValidOption(option))
                : -1;
        return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
    }

    findPrevOptionIndex(index) {
        const matchedOptionIndex = index > 0 ? ObjectUtils.findLastIndex(this.visibleOptions().slice(0, index), (option) => this.isValidOption(option)) : -1;

        return matchedOptionIndex > -1 ? matchedOptionIndex : index;
    }

    findLastSelectedOptionIndex() {
        return this.hasSelectedOption() ? ObjectUtils.findLastIndex(this.visibleOptions(), (option) => this.isValidSelectedOption(option)) : -1;
    }

    findLastFocusedOptionIndex() {
        const selectedIndex = this.findLastSelectedOptionIndex();

        return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
    }

    findLastOptionIndex() {
        return ObjectUtils.findLastIndex(this.visibleOptions(), (option) => this.isValidOption(option));
    }

    searchOptions(event, char) {
        this.searchValue = (this.searchValue || '') + char;

        let optionIndex = -1;
        let matched = false;

        if (this.focusedOptionIndex() !== -1) {
            optionIndex = this.visibleOptions()
                .slice(this.focusedOptionIndex())
                .findIndex((option) => this.isOptionMatched(option));
            optionIndex =
                optionIndex === -1
                    ? this.visibleOptions()
                          .slice(0, this.focusedOptionIndex())
                          .findIndex((option) => this.isOptionMatched(option))
                    : optionIndex + this.focusedOptionIndex();
        } else {
            optionIndex = this.visibleOptions().findIndex((option) => this.isOptionMatched(option));
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

    activateFilter() {
        if (this.hasFilter() && this._options) {
            if (this.group) {
                let filteredGroups = [];
                for (let optgroup of this.options as any[]) {
                    let filteredSubOptions = this.filterService.filter(this.getOptionGroupChildren(optgroup), this.searchFields(), this.filterValue, this.filterMatchMode, this.filterLocale);
                    if (filteredSubOptions && filteredSubOptions.length) {
                        filteredGroups.push({ ...optgroup, ...{ [this.optionGroupChildren]: filteredSubOptions } });
                    }
                }

                this._filteredOptions = filteredGroups;
            } else {
                this._filteredOptions = this.filterService.filter(this.options as any[], this.searchFields(), this.filterValue, this.filterMatchMode, this.filterLocale);
            }
        } else {
            this._filteredOptions = null;
        }
    }

    hasFocusableElements() {
        return DomHandler.getFocusableElements(this.overlayViewChild.overlayViewChild.nativeElement, ':not([data-p-hidden-focusable="true"])').length > 0;
    }

    hasFilter() {
        return this._filterValue() && this._filterValue().trim().length > 0;
    }
}

@NgModule({
    imports: [CommonModule, OverlayModule, SharedModule, TooltipModule, RippleModule, ScrollerModule, AutoFocusModule, CheckIcon, SearchIcon, TimesCircleIcon, TimesIcon, ChevronDownIcon, CheckIcon, MinusIcon],
    exports: [MultiSelect, OverlayModule, SharedModule, ScrollerModule],
    declarations: [MultiSelect, MultiSelectItem]
})
export class MultiSelectModule {}
