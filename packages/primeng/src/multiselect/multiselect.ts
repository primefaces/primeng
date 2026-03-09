import { NgTemplateOutlet } from '@angular/common';
import {
    afterNextRender,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    effect,
    ElementRef,
    forwardRef,
    inject,
    input,
    NgModule,
    numberAttribute,
    output,
    Provider,
    signal,
    TemplateRef,
    untracked,
    viewChild,
    ViewEncapsulation
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MotionOptions } from '@primeuix/motion';
import { deepEquals, equals, findLastIndex, findSingle, focus, getFirstFocusableElement, getFocusableElements, getLastFocusableElement, isArray, isNotEmpty, isPrintableCharacter, resolveFieldData, uuid } from '@primeuix/utils';
import { FilterMatchModeType, FilterService, Footer, Header, OverlayOptions, OverlayService, ScrollerOptions, SharedModule, TranslationKeys } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { PARENT_INSTANCE } from 'primeng/basecomponent';
import { BaseEditableHolder } from 'primeng/baseeditableholder';
import { Bind, BindModule } from 'primeng/bind';
import { Checkbox } from 'primeng/checkbox';
import { Chip } from 'primeng/chip';
import { DomHandler, unblockBodyScroll } from 'primeng/dom';
import { Fluid } from 'primeng/fluid';
import { IconField } from 'primeng/iconfield';
import { Check as CheckIcon } from '@primeicons/angular/check';
import { ChevronDown as ChevronDownIcon } from '@primeicons/angular/chevron-down';
import { Search as SearchIcon } from '@primeicons/angular/search';
import { Times as TimesIcon } from '@primeicons/angular/times';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Overlay } from 'primeng/overlay';
import { Scroller } from 'primeng/scroller';
import { Tooltip } from 'primeng/tooltip';
import { Nullable } from 'primeng/ts-helpers';
import type { AppendTo, CSSProperties } from 'primeng/types/shared';
import {
    MultiSelectBlurEvent,
    MultiSelectChangeEvent,
    MultiSelectChipIconTemplateContext,
    MultiSelectDisplay,
    MultiSelectDropdownIconTemplateContext,
    MultiSelectFilterEvent,
    MultiSelectFilterOptions,
    MultiSelectFilterTemplateContext,
    MultiSelectFocusEvent,
    MultiSelectGroupTemplateContext,
    MultiSelectHeaderCheckboxIconTemplateContext,
    MultiSelectItemCheckboxIconTemplateContext,
    MultiSelectItemTemplateContext,
    MultiSelectLazyLoadEvent,
    MultiSelectLoaderTemplateContext,
    MultiSelectPassThrough,
    MultiSelectRemoveEvent,
    MultiSelectSelectAllChangeEvent,
    MultiSelectSelectedItemsTemplateContext
} from 'primeng/types/multiselect';
import type { TooltipPosition } from 'primeng/types/tooltip';
import { ObjectUtils } from 'primeng/utils';
import { MultiSelectItem } from './multiselect-item';
import { MULTISELECT_INSTANCE } from './multiselect-token';
import { MultiSelectStyle } from './style/multiselectstyle';

export const MULTISELECT_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiSelect),
    multi: true
};

/**
 * MultiSelect is used to select multiple items from a collection.
 * @group Components
 */
@Component({
    selector: 'p-multiselect, p-multi-select',
    standalone: true,
    imports: [NgTemplateOutlet, MultiSelectItem, Overlay, SharedModule, Tooltip, Scroller, AutoFocus, CheckIcon, SearchIcon, TimesIcon, ChevronDownIcon, IconField, InputIcon, InputText, Chip, Checkbox, FormsModule, BindModule],
    hostDirectives: [Bind],
    template: `
        <div class="p-hidden-accessible" [attr.data-p-hidden-accessible]="true" [pBind]="ptm('hiddenInputContainer')">
            <input
                #focusInput
                [pTooltip]="tooltip()"
                [pTooltipUnstyled]="unstyled()"
                [tooltipPosition]="tooltipPosition()"
                [positionStyle]="tooltipPositionStyle()"
                [tooltipStyleClass]="tooltipStyleClass()"
                [attr.aria-disabled]="$disabled()"
                [attr.id]="inputId()"
                role="combobox"
                [attr.aria-label]="ariaLabel()"
                [attr.aria-labelledby]="ariaLabelledBy()"
                [attr.aria-haspopup]="'listbox'"
                [attr.aria-expanded]="ariaExpanded()"
                [attr.aria-controls]="ariaControls()"
                [attr.tabindex]="inputTabindex()"
                [attr.aria-activedescendant]="ariaActivedescendant"
                (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)"
                (keydown)="onKeyDown($event)"
                [pAutoFocus]="autofocus()"
                [attr.value]="modelValue()"
                [attr.name]="name()"
                [attr.required]="requiredAttr()"
                [attr.disabled]="disabledAttr()"
                [pBind]="ptm('hiddenInput')"
            />
        </div>
        <div
            [pBind]="ptm('labelContainer')"
            [class]="cx('labelContainer')"
            [pTooltip]="tooltip()"
            [pTooltipUnstyled]="unstyled()"
            (mouseleave)="labelContainerMouseLeave()"
            [tooltipDisabled]="_disableTooltip"
            [tooltipPosition]="tooltipPosition()"
            [positionStyle]="tooltipPositionStyle()"
            [tooltipStyleClass]="tooltipStyleClass()"
        >
            <div [pBind]="ptm('label')" [class]="cx('label')" [attr.data-p]="labelDataP()">
                @if (!selectedItemsTemplate()) {
                    @if (isCommaDisplay()) {
                        {{ labelDisplay() }}
                    }
                    @if (isChipDisplay()) {
                        @if (showSelectedItemsLabel()) {
                            {{ getSelectedItemsLabel() }}
                        } @else {
                            @for (item of chipSelectedItems(); track item) {
                                <div #token [pBind]="ptm('chipItem')" [class]="cx('chipItem')">
                                    <p-chip [pt]="ptm('pcChip')" [unstyled]="unstyled()" [class]="cx('pcChip')" [label]="getLabelByValue(item)" [removable]="isEditable()" (onRemove)="removeOption(item, $event)" [removeIcon]="chipIcon()">
                                        @if (hasChipRemoveIconTemplate()) {
                                            <ng-template #removeicon>
                                                @if (isEditable()) {
                                                    <span [class]="cx('chipIcon')" (click)="removeOption(item, $event)" [attr.aria-hidden]="true" [pBind]="ptm('chipIcon')">
                                                        <ng-container *ngTemplateOutlet="chipIconTemplate() || removeTokenIconTemplate(); context: chipIconContext"></ng-container>
                                                    </span>
                                                }
                                            </ng-template>
                                        }
                                    </p-chip>
                                </div>
                            }
                        }
                        @if (isModelEmpty()) {
                            {{ placeholderLabel() }}
                        }
                    }
                } @else {
                    <ng-container *ngTemplateOutlet="selectedItemsTemplate(); context: selectedItemsContext()"></ng-container>
                    @if (isModelEmpty()) {
                        {{ placeholderLabel() }}
                    }
                }
            </div>
        </div>
        @if (isVisibleClearIcon()) {
            @if (!clearIconTemplate()) {
                <svg data-p-icon="times" [pBind]="ptm('clearIcon')" [class]="cx('clearIcon')" (click)="clear($event)" [attr.aria-hidden]="true" />
            } @else {
                <span [pBind]="ptm('clearIcon')" [class]="cx('clearIcon')" (click)="clear($event)" [attr.aria-hidden]="true">
                    <ng-template *ngTemplateOutlet="clearIconTemplate()"></ng-template>
                </span>
            }
        }
        <div [pBind]="ptm('dropdown')" [class]="cx('dropdown')">
            @if (loading()) {
                @if (loadingIconTemplate()) {
                    <ng-container *ngTemplateOutlet="loadingIconTemplate()"></ng-container>
                } @else {
                    @if (loadingIcon()) {
                        <span [pBind]="ptm('loadingIcon')" [class]="cn(cx('loadingIcon'), 'pi-spin ' + loadingIcon())" [attr.aria-hidden]="true"></span>
                    } @else {
                        <span [pBind]="ptm('loadingIcon')" [class]="cn(cx('loadingIcon'), 'pi pi-spinner pi-spin')" [attr.aria-hidden]="true"></span>
                    }
                }
            } @else {
                @if (!dropdownIconTemplate()) {
                    @if (dropdownIcon()) {
                        <span [pBind]="ptm('dropdownIcon')" [class]="cn(cx('dropdownIcon'), dropdownIcon())" [attr.aria-hidden]="true" [attr.data-p]="dropdownIconDataP()"></span>
                    } @else {
                        <svg data-p-icon="chevron-down" [pBind]="ptm('dropdownIcon')" [class]="cx('dropdownIcon')" [attr.aria-hidden]="true" [attr.data-p]="dropdownIconDataP()" />
                    }
                } @else {
                    <span [pBind]="ptm('dropdownIcon')" [class]="cx('dropdownIcon')" [attr.aria-hidden]="true">
                        <ng-template *ngTemplateOutlet="dropdownIconTemplate(); context: dropdownIconContext()"></ng-template>
                    </span>
                }
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
            (onBeforeEnter)="onOverlayBeforeEnter($event)"
            (onAfterLeave)="onOverlayAfterLeave($event)"
            (onHide)="onOverlayHide($event)"
        >
            <ng-template #content>
                <div [pBind]="ptm('overlay')" [attr.data-p]="overlayDataP()" [attr.id]="listId()" [class]="cn(cx('overlay'), panelStyleClass())" [style]="panelStyle()">
                    <span
                        #firstHiddenFocusableEl
                        role="presentation"
                        class="p-hidden-accessible p-hidden-focusable"
                        [attr.tabindex]="0"
                        (focus)="onFirstHiddenFocus($event)"
                        [attr.data-p-hidden-accessible]="true"
                        [attr.data-p-hidden-focusable]="true"
                        [pBind]="ptm('firstHiddenFocusableEl')"
                    >
                    </span>
                    <ng-container *ngTemplateOutlet="headerTemplate()"></ng-container>
                    @if (showHeader()) {
                        <div [pBind]="ptm('header')" [class]="cx('header')">
                            <ng-content select="p-header"></ng-content>
                            @if (filterTemplate()) {
                                <ng-container *ngTemplateOutlet="filterTemplate(); context: filterContext()"></ng-container>
                            } @else {
                                @if (showToggleAllCheckbox()) {
                                    <p-checkbox
                                        [pt]="getHeaderCheckboxPTOptions('pcHeaderCheckbox')"
                                        [ngModel]="allSelected()"
                                        [ariaLabel]="toggleAllAriaLabel"
                                        [binary]="true"
                                        (onChange)="onToggleAll($event)"
                                        [variant]="$variant()"
                                        [disabled]="$disabled()"
                                        [unstyled]="unstyled()"
                                        #headerCheckbox
                                    >
                                        <ng-template #icon let-klass="class">
                                            @if (showDefaultHeaderCheckIcon()) {
                                                <svg data-p-icon="check" [class]="klass" [pBind]="getHeaderCheckboxPTOptions('pcHeaderCheckbox.icon')" />
                                            }
                                            <ng-template *ngTemplateOutlet="headerCheckboxIconTemplate(); context: getHeaderCheckboxIconContext(klass)"></ng-template>
                                        </ng-template>
                                    </p-checkbox>
                                }

                                @if (filter()) {
                                    <p-iconfield [pt]="ptm('pcFilterContainer')" [class]="cx('pcFilterContainer')" [unstyled]="unstyled()">
                                        <input
                                            #filterInput
                                            pInputText
                                            [pt]="ptm('pcFilter')"
                                            [variant]="$variant()"
                                            type="text"
                                            [attr.autocomplete]="autocomplete()"
                                            role="searchbox"
                                            [attr.aria-owns]="listId()"
                                            [attr.aria-activedescendant]="focusedOptionId"
                                            [value]="filterInputValue()"
                                            (input)="onFilterInputChange($event)"
                                            (keydown)="onFilterKeyDown($event)"
                                            (click)="onInputClick($event)"
                                            (blur)="onFilterBlur($event)"
                                            [class]="cx('pcFilter')"
                                            [attr.disabled]="disabledAttr()"
                                            [attr.placeholder]="filterPlaceHolder()"
                                            [attr.aria-label]="ariaFilterLabel()"
                                            [unstyled]="unstyled()"
                                        />
                                        <p-inputicon [pt]="ptm('pcFilterIconContainer')" [unstyled]="unstyled()">
                                            @if (!filterIconTemplate()) {
                                                <svg data-p-icon="search" [pBind]="ptm('filterIcon')" />
                                            } @else {
                                                <span [pBind]="ptm('filterIcon')" class="p-multiselect-filter-icon">
                                                    <ng-template *ngTemplateOutlet="filterIconTemplate()"></ng-template>
                                                </span>
                                            }
                                        </p-inputicon>
                                    </p-iconfield>
                                }
                            }
                        </div>
                    }
                    <div [pBind]="ptm('listContainer')" [class]="cx('listContainer')" [style.max-height]="listContainerMaxHeight()">
                        @if (virtualScroll()) {
                            <p-scroller
                                #scroller
                                [items]="visibleOptions()"
                                [style]="{ height: scrollHeight() }"
                                [itemSize]="virtualScrollItemSize()"
                                [autoSize]="true"
                                [tabindex]="-1"
                                [lazy]="lazy()"
                                (onLazyLoad)="onLazyLoad.emit($event)"
                                [options]="virtualScrollOptions()"
                            >
                                <ng-template #content let-items let-scrollerOptions="options">
                                    <ng-container *ngTemplateOutlet="buildInItems; context: getScrollerItemsContext(items, scrollerOptions)"></ng-container>
                                </ng-template>
                                @if (loaderTemplate()) {
                                    <ng-template #loader let-scrollerOptions="options">
                                        <ng-container *ngTemplateOutlet="loaderTemplate(); context: getLoaderContext(scrollerOptions)"></ng-container>
                                    </ng-template>
                                }
                            </p-scroller>
                        } @else {
                            <ng-container *ngTemplateOutlet="buildInItems; context: defaultItemsContext()"></ng-container>
                        }

                        <ng-template #buildInItems let-items let-scrollerOptions="options">
                            <ul #items [pBind]="ptm('list')" [class]="cn(cx('list'), scrollerOptions.contentStyleClass)" [style]="scrollerOptions.contentStyle" role="listbox" aria-multiselectable="true" [attr.aria-label]="listLabel">
                                @for (option of items; track option; let i = $index) {
                                    @if (isOptionGroup(option)) {
                                        <li [pBind]="ptm('optionGroup')" [attr.id]="$id() + '_' + getOptionIndex(i, scrollerOptions)" [class]="cx('optionGroup')" [style.height.px]="scrollerOptions.itemSize" role="option">
                                            @if (!groupTemplate() && option.optionGroup) {
                                                <span>{{ getOptionGroupLabel(option.optionGroup) }}</span>
                                            }
                                            @if (option.optionGroup && groupTemplate()) {
                                                <ng-container [ngTemplateOutlet]="groupTemplate()" [ngTemplateOutletContext]="getGroupContext(option)"></ng-container>
                                            }
                                        </li>
                                    } @else {
                                        <li
                                            pMultiSelectItem
                                            pRipple
                                            [pBind]="getPTOptions(option, getItemOptions, i, 'option')"
                                            [id]="$id() + '_' + getOptionIndex(i, scrollerOptions)"
                                            [option]="option"
                                            [selected]="isSelected(option)"
                                            [label]="getOptionLabel(option)"
                                            [disabled]="isOptionDisabled(option)"
                                            [template]="itemTemplate()"
                                            [itemCheckboxIconTemplate]="itemCheckboxIconTemplate()"
                                            [itemSize]="scrollerOptions.itemSize"
                                            [focused]="focusedOptionIndex() === getOptionIndex(i, scrollerOptions)"
                                            [ariaPosInset]="getAriaPosInset(getOptionIndex(i, scrollerOptions))"
                                            [ariaSetSize]="$ariaSetSize()"
                                            [variant]="$variant()"
                                            [highlightOnSelect]="highlightOnSelect()"
                                            (onClick)="onOptionSelect($event, false, getOptionIndex(i, scrollerOptions))"
                                            (onMouseEnter)="onOptionMouseEnter($event, getOptionIndex(i, scrollerOptions))"
                                            [pt]="pt"
                                            [unstyled]="unstyled()"
                                        ></li>
                                    }
                                }

                                @if (showEmptyFilterMessage()) {
                                    <li [pBind]="ptm('emptyMessage')" [class]="cx('emptyMessage')" [style.height.px]="scrollerOptions.itemSize" role="option">
                                        @if (!emptyFilterTemplate() && !emptyTemplate()) {
                                            {{ emptyFilterMessageLabel() }}
                                        } @else {
                                            <ng-container *ngTemplateOutlet="emptyFilterTemplate() || emptyTemplate()"></ng-container>
                                        }
                                    </li>
                                }
                                @if (showEmptyMessage()) {
                                    <li [pBind]="ptm('emptyMessage')" [class]="cx('emptyMessage')" [style.height.px]="scrollerOptions.itemSize" role="option">
                                        @if (!emptyTemplate()) {
                                            {{ emptyMessageLabel() }}
                                        } @else {
                                            <ng-container *ngTemplateOutlet="emptyTemplate()"></ng-container>
                                        }
                                    </li>
                                }
                            </ul>
                        </ng-template>
                    </div>
                    @if (hasFooterContent()) {
                        <div>
                            <ng-content select="p-footer"></ng-content>
                            <ng-container *ngTemplateOutlet="footerTemplate()"></ng-container>
                        </div>
                    }

                    <span
                        #lastHiddenFocusableEl
                        role="presentation"
                        class="p-hidden-accessible p-hidden-focusable"
                        [attr.tabindex]="0"
                        (focus)="onLastHiddenFocus($event)"
                        [attr.data-p-hidden-accessible]="true"
                        [attr.data-p-hidden-focusable]="true"
                        [pBind]="ptm('lastHiddenFocusableEl')"
                    ></span>
                </div>
            </ng-template>
        </p-overlay>
    `,
    providers: [MULTISELECT_VALUE_ACCESSOR, MultiSelectStyle, { provide: MULTISELECT_INSTANCE, useExisting: MultiSelect }, { provide: PARENT_INSTANCE, useExisting: MultiSelect }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.id]': '$id()',
        '[attr.data-p]': 'containerDataP',
        '(click)': 'onContainerClick($event)',
        '[class]': "cx('root')",
        '[style]': "sx('root')"
    }
})
export class MultiSelect extends BaseEditableHolder<MultiSelectPassThrough> {
    componentName = 'MultiSelect';

    /**
     * Unique identifier of the component
     * @group Props
     */
    id = input<string>();
    /**
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    ariaLabel = input<string>();
    /**
     * Inline style of the overlay panel.
     * @group Props
     */
    panelStyle = input<CSSProperties>();
    /**
     * Style class of the overlay panel element.
     * @group Props
     */
    panelStyleClass = input<string>();
    /**
     * Identifier of the focus input to match a label defined for the component.
     * @group Props
     */
    inputId = input<string>();
    /**
     * When present, it specifies that the component cannot be edited.
     * @group Props
     */
    readonly = input(undefined, { transform: booleanAttribute });
    /**
     * Whether to display options as grouped when nested options are provided.
     * @group Props
     */
    group = input(undefined, { transform: booleanAttribute });
    /**
     * When specified, displays an input field to filter the items on keyup.
     * @group Props
     */
    filter = input(true, { transform: booleanAttribute });
    /**
     * Defines placeholder of the filter input.
     * @group Props
     */
    filterPlaceHolder = input<string>();
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    filterLocale = input<string>();
    /**
     * Specifies the visibility of the options panel.
     * @group Props
     */
    overlayVisible = signal<boolean>(false);
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = input(0, { transform: numberAttribute });
    /**
     * A property to uniquely identify a value in options.
     * @group Props
     */
    dataKey = input<string>();
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy = input<string>();
    /**
     * Whether to show labels of selected item labels or use default label.
     * @group Props
     * @defaultValue true
     */
    displaySelectedLabel = input(true, { transform: booleanAttribute });
    /**
     * Decides how many selected item labels to show at most.
     * @group Props
     * @defaultValue 3
     */
    maxSelectedLabels = input<number | null>(3);
    /**
     * Maximum number of selectable items.
     * @group Props
     */
    selectionLimit = input(undefined, { transform: numberAttribute });
    /**
     * Label to display after exceeding max selected labels e.g. ({0} items selected), defaults "ellipsis" keyword to indicate a text-overflow.
     * @group Props
     */
    selectedItemsLabel = input<string>();
    /**
     * Whether to show the checkbox at header to toggle all items at once.
     * @group Props
     */
    showToggleAll = input(true, { transform: booleanAttribute });
    /**
     * Text to display when filtering does not return any results.
     * @group Props
     */
    emptyFilterMessage = input<string>('');
    /**
     * Text to display when there is no data. Defaults to global value in i18n translation configuration.
     * @group Props
     */
    emptyMessage = input<string>('');
    /**
     * Clears the filter value when hiding the dropdown.
     * @group Props
     */
    resetFilterOnHide = input(false, { transform: booleanAttribute });
    /**
     * Icon class of the dropdown icon.
     * @group Props
     */
    dropdownIcon = input<string>();
    /**
     * Icon class of the chip icon.
     * @group Props
     */
    chipIcon = input<string>();
    /**
     * Name of the label field of an option.
     * @group Props
     */
    optionLabel = input<string>();
    /**
     * Name of the value field of an option.
     * @group Props
     */
    optionValue = input<string>();
    /**
     * Name of the disabled field of an option.
     * @group Props
     */
    optionDisabled = input<string>();
    /**
     * Name of the label field of an option group.
     * @group Props
     */
    optionGroupLabel = input<string>('label');
    /**
     * Name of the options field of an option group.
     * @group Props
     */
    optionGroupChildren = input<string>('items');
    /**
     * Whether to show the header.
     * @group Props
     */
    showHeader = input(true, { transform: booleanAttribute });
    /**
     * When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.
     * @group Props
     */
    filterBy = input<string>();
    /**
     * Height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.
     * @group Props
     */
    scrollHeight = input<string>('200px');
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @group Props
     */
    lazy = input(false, { transform: booleanAttribute });
    /**
     * Whether the data should be loaded on demand during scroll.
     * @group Props
     */
    virtualScroll = input(undefined, { transform: booleanAttribute });
    /**
     * Whether the multiselect is in loading state.
     * @group Props
     */
    loading = input(false, { transform: booleanAttribute });
    /**
     * Height of an item in the list for VirtualScrolling.
     * @group Props
     */
    virtualScrollItemSize = input(undefined, { transform: numberAttribute });
    /**
     * Icon to display in loading state.
     * @group Props
     */
    loadingIcon = input<string>();
    /**
     * Whether to use the scroller feature. The properties of scroller component can be used like an object in it.
     * @group Props
     */
    virtualScrollOptions = input<ScrollerOptions>();
    /**
     * Whether to use overlay API feature. The properties of overlay API can be used like an object in it.
     * @group Props
     */
    overlayOptions = input<OverlayOptions>();
    /**
     * Defines a string that labels the filter input.
     * @group Props
     */
    ariaFilterLabel = input<string>();
    /**
     * Defines how the items are filtered.
     * @group Props
     */
    filterMatchMode = input<FilterMatchModeType>('contains');
    /**
     * Advisory information to display in a tooltip on hover.
     * @group Props
     */
    tooltip = input<string>('');
    /**
     * Position of the tooltip.
     * @group Props
     */
    tooltipPosition = input<TooltipPosition>('right');
    /**
     * Type of CSS position.
     * @group Props
     */
    tooltipPositionStyle = input<string>('absolute');
    /**
     * Style class of the tooltip.
     * @group Props
     */
    tooltipStyleClass = input<string>();
    /**
     * Applies focus to the filter element when the overlay is shown.
     * @group Props
     */
    autofocusFilter = input(false, { transform: booleanAttribute });
    /**
     * Defines how the selected items are displayed.
     * @group Props
     */
    display = input<MultiSelectDisplay>('comma');
    /**
     * Defines the autocomplete is active.
     * @group Props
     */
    autocomplete = input<string>('off');
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @group Props
     */
    showClear = input(false, { transform: booleanAttribute });
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus = input(undefined, { transform: booleanAttribute });
    /**
     * Label to display when there are no selections.
     * @group Props
     */
    placeholder = input<string>();
    /**
     * An array of objects to display as the available options.
     * @group Props
     */
    options = input<any[]>();
    /**
     * When specified, filter displays with this value.
     * @group Props
     */
    filterValue = input<string | null>();
    /**
     * Whether all data is selected.
     * @group Props
     */
    selectAll = input<boolean | null>();
    /**
     * Indicates whether to focus on options when hovering over them, defaults to optionLabel.
     * @group Props
     */
    focusOnHover = input(true, { transform: booleanAttribute });
    /**
     * Fields used when filtering the options, defaults to optionLabel.
     * @group Props
     */
    filterFields = input<string[]>();
    /**
     * Determines if the option will be selected on focus.
     * @group Props
     */
    selectOnFocus = input(false, { transform: booleanAttribute });
    /**
     * Whether to focus on the first visible or selected element when the overlay panel is shown.
     * @group Props
     */
    autoOptionFocus = input(false, { transform: booleanAttribute });
    /**
     * Whether the selected option will be add highlight class.
     * @group Props
     */
    highlightOnSelect = input(true, { transform: booleanAttribute });
    /**
     * Specifies the size of the component.
     * @defaultValue undefined
     * @group Props
     */
    size = input<'large' | 'small' | undefined>();
    /**
     * Specifies the input variant of the component.
     * @defaultValue undefined
     * @group Props
     */
    variant = input<'filled' | 'outlined' | undefined>();
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
     * Callback to invoke when value changes.
     * @param {MultiSelectChangeEvent} event - Custom change event.
     * @group Emits
     */
    onChange = output<MultiSelectChangeEvent>();
    /**
     * Callback to invoke when data is filtered.
     * @param {MultiSelectFilterEvent} event - Custom filter event.
     * @group Emits
     */
    onFilter = output<MultiSelectFilterEvent>();
    /**
     * Callback to invoke when multiselect receives focus.
     * @param {MultiSelectFocusEvent} event - Custom focus event.
     * @group Emits
     */
    onFocus = output<MultiSelectFocusEvent>();
    /**
     * Callback to invoke when multiselect loses focus.
     * @param {MultiSelectBlurEvent} event - Custom blur event.
     * @group Emits
     */
    onBlur = output<MultiSelectBlurEvent>();
    /**
     * Callback to invoke when component is clicked.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onClick = output<Event>();
    /**
     * Callback to invoke when input field is cleared.
     * @group Emits
     */
    onClear = output<void>();
    /**
     * Callback to invoke when overlay panel becomes visible.
     * @param {AnimationEvent} event - Animation event.
     * @group Emits
     */
    onPanelShow = output<AnimationEvent>();
    /**
     * Callback to invoke when overlay panel becomes hidden.
     * @param {AnimationEvent} event - Animation event.
     * @group Emits
     */
    onPanelHide = output<AnimationEvent>();
    /**
     * Callback to invoke in lazy mode to load new data.
     * @param {MultiSelectLazyLoadEvent} event - Lazy load event.
     * @group Emits
     */
    onLazyLoad = output<MultiSelectLazyLoadEvent>();
    /**
     * Callback to invoke in lazy mode to load new data.
     * @param {MultiSelectRemoveEvent} event - Remove event.
     * @group Emits
     */
    onRemove = output<MultiSelectRemoveEvent>();
    /**
     * Callback to invoke when all data is selected.
     * @param {MultiSelectSelectAllChangeEvent} event - Custom select event.
     * @group Emits
     */
    onSelectAllChange = output<MultiSelectSelectAllChangeEvent>();

    overlayViewChild = viewChild<Overlay>('overlay');

    filterInputChild = viewChild<ElementRef>('filterInput');

    focusInputViewChild = viewChild<ElementRef>('focusInput');

    itemsViewChild = viewChild<ElementRef>('items');

    scroller = viewChild<Scroller>('scroller');

    lastHiddenFocusableElementOnOverlay = viewChild<ElementRef>('lastHiddenFocusableEl');

    firstHiddenFocusableElementOnOverlay = viewChild<ElementRef>('firstHiddenFocusableEl');

    headerCheckboxViewChild = viewChild<Checkbox>('headerCheckbox');

    footerFacet = contentChild(Footer);

    headerFacet = contentChild(Header);

    _componentStyle = inject(MultiSelectStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    searchValue: Nullable<string>;

    searchTimeout: ReturnType<typeof setTimeout> | null = null;

    _disableTooltip = false;

    value: any[];

    public _filteredOptions: any[] | undefined | null;

    public focus: boolean | undefined;

    public filtered: boolean | undefined;

    /**
     * Custom item template.
     * @group Templates
     */
    itemTemplate = contentChild<TemplateRef<MultiSelectItemTemplateContext>>('item', { descendants: false });

    /**
     * Custom group template.
     * @group Templates
     */
    groupTemplate = contentChild<TemplateRef<MultiSelectGroupTemplateContext>>('group', { descendants: false });

    /**
     * Custom loader template.
     * @group Templates
     */
    loaderTemplate = contentChild<TemplateRef<MultiSelectLoaderTemplateContext>>('loader', { descendants: false });

    /**
     * Custom header template.
     * @group Templates
     */
    headerTemplate = contentChild<TemplateRef<void>>('header', { descendants: false });

    /**
     * Custom filter template.
     * @group Templates
     */
    filterTemplate = contentChild<TemplateRef<MultiSelectFilterTemplateContext>>('filter', { descendants: false });

    /**
     * Custom footer template.
     * @group Templates
     */
    footerTemplate = contentChild<TemplateRef<void>>('footer', { descendants: false });

    /**
     * Custom empty filter template.
     * @group Templates
     */
    emptyFilterTemplate = contentChild<TemplateRef<void>>('emptyfilter', { descendants: false });

    /**
     * Custom empty template.
     * @group Templates
     */
    emptyTemplate = contentChild<TemplateRef<void>>('empty', { descendants: false });

    /**
     * Custom selected items template.
     * @group Templates
     */
    selectedItemsTemplate = contentChild<TemplateRef<MultiSelectSelectedItemsTemplateContext>>('selecteditems', { descendants: false });

    /**
     * Custom loading icon template.
     * @group Templates
     */
    loadingIconTemplate = contentChild<TemplateRef<void>>('loadingicon', { descendants: false });

    /**
     * Custom filter icon template.
     * @group Templates
     */
    filterIconTemplate = contentChild<TemplateRef<void>>('filtericon', { descendants: false });

    /**
     * Custom remove token icon template.
     * @group Templates
     */
    removeTokenIconTemplate = contentChild<TemplateRef<MultiSelectChipIconTemplateContext>>('removetokenicon', { descendants: false });

    /**
     * Custom chip icon template.
     * @group Templates
     */
    chipIconTemplate = contentChild<TemplateRef<MultiSelectChipIconTemplateContext>>('chipicon', { descendants: false });

    /**
     * Custom clear icon template.
     * @group Templates
     */
    clearIconTemplate = contentChild<TemplateRef<void>>('clearicon', { descendants: false });

    /**
     * Custom dropdown icon template.
     * @group Templates
     */
    dropdownIconTemplate = contentChild<TemplateRef<MultiSelectDropdownIconTemplateContext>>('dropdownicon', { descendants: false });

    /**
     * Custom item checkbox icon template.
     * @group Templates
     */
    itemCheckboxIconTemplate = contentChild<TemplateRef<MultiSelectItemCheckboxIconTemplateContext>>('itemcheckboxicon', { descendants: false });

    /**
     * Custom header checkbox icon template.
     * @group Templates
     */
    headerCheckboxIconTemplate = contentChild<TemplateRef<MultiSelectHeaderCheckboxIconTemplateContext>>('headercheckboxicon', { descendants: false });

    $variant = computed(() => this.variant() || this.config.inputVariant());

    $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo());

    internalId = uuid('pn_id_');

    $id = computed(() => this.id() || this.internalId);

    $pcMultiSelect: MultiSelect | undefined = inject(MULTISELECT_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    pcFluid: Fluid | null = inject(Fluid, { optional: true, host: true, skipSelf: true });

    private translation = toSignal(this.config.translationObserver, { initialValue: this.config.translation });

    get hasFluid() {
        return this.fluid() ?? !!this.pcFluid;
    }

    public headerCheckboxFocus: boolean | undefined;

    filterOptions: MultiSelectFilterOptions | undefined;

    preventModelTouched: boolean | undefined;

    focused: boolean = false;

    itemsWrapper: HTMLElement | null = null;

    modelValue = signal<any>(null);

    _filterValue = signal<string | null>(null);

    _options = signal<any[]>([]);

    startRangeIndex = signal<number>(-1);

    focusedOptionIndex = signal<number>(-1);

    selectedOptions = signal<any>(null);

    clickInProgress: boolean = false;

    emptyMessageLabel = computed(() => {
        const t = this.translation();
        return this.emptyMessage() || t?.emptyMessage || '';
    });

    emptyFilterMessageLabel = computed(() => {
        const t = this.translation();
        return this.emptyFilterMessage() || t?.emptyFilterMessage || '';
    });

    isVisibleClearIcon = computed(() => {
        return this.modelValue() != null && this.modelValue() !== '' && isNotEmpty(this.modelValue()) && this.showClear() && !this.$disabled() && !this.readonly() && this.$filled();
    });

    toggleAllAriaLabel = computed(() => {
        const t = this.translation();
        return t?.aria ? t.aria[this.allSelected() ? 'selectAll' : 'unselectAll'] : undefined;
    });

    listLabel = computed(() => {
        const t = this.translation();
        return t?.aria?.listLabel || '';
    });

    placeholderLabel = computed(() => this.placeholder() || 'empty');

    labelDisplay = computed(() => this.label() || 'empty');

    listId = computed(() => this.$id() + '_list');

    private getAllVisibleAndNonVisibleOptions() {
        const group = this.group();
        const options = this.options();
        return group ? this.flatOptions(options) : options || [];
    }

    visibleOptions = computed(() => {
        const options = this.getAllVisibleAndNonVisibleOptions();
        const isArrayOfObjects = isArray(options) && ObjectUtils.isObject(options[0]);
        const filterVal = this.filterValue() ?? this._filterValue();
        const group = this.group();
        const filterMatchMode = this.filterMatchMode();
        const filterLocale = this.filterLocale();
        const optionGroupChildren = this.optionGroupChildren();

        if (filterVal) {
            let filteredOptions;

            if (isArrayOfObjects) {
                filteredOptions = this.filterService.filter(options, this.searchFields(), filterVal, filterMatchMode, filterLocale);
            } else {
                filteredOptions = options.filter((option) => option.toString().toLocaleLowerCase().includes(filterVal.toLocaleLowerCase()));
            }

            if (group) {
                const optionGroups = this.options() || [];
                const filtered: any[] = [];

                optionGroups.forEach((grp) => {
                    const groupChildren = this.getOptionGroupChildren(grp);
                    const filteredItems = groupChildren.filter((item: any) => filteredOptions.includes(item));

                    if (filteredItems.length > 0)
                        filtered.push({
                            ...grp,
                            [typeof optionGroupChildren === 'string' ? optionGroupChildren : 'items']: [...filteredItems]
                        });
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
        const displaySelectedLabel = this.displaySelectedLabel();
        const maxSelectedLabels = this.maxSelectedLabels();

        if (modelValue && modelValue?.length && displaySelectedLabel) {
            if (isNotEmpty(maxSelectedLabels) && modelValue?.length > (maxSelectedLabels || 0)) {
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
            label = this.placeholder() || '';
        }
        return label;
    });

    chipSelectedItems = computed(() => {
        const maxSelectedLabels = this.maxSelectedLabels();
        return isNotEmpty(maxSelectedLabels) && this.modelValue() && this.modelValue()?.length > (maxSelectedLabels || 0) ? this.modelValue()?.slice(0, maxSelectedLabels) : this.modelValue();
    });

    filterService = inject(FilterService);

    overlayService = inject(OverlayService);

    constructor() {
        super();

        // Sync options input to internal signal
        effect(() => {
            const opts = this.options();
            if (
                opts !== undefined &&
                !deepEquals(
                    untracked(() => this._options()),
                    opts
                )
            ) {
                this._options.set(opts || []);
            }
        });

        // Sync filterValue input to internal signal
        effect(() => {
            const fv = this.filterValue();
            if (fv !== undefined) {
                this._filterValue.set(fv);
            }
        });

        effect(() => {
            const modelValue = this.modelValue();
            const optionValue = this.optionValue();
            const optionLabel = this.optionLabel();

            const allVisibleAndNonVisibleOptions = this.getAllVisibleAndNonVisibleOptions();
            if (allVisibleAndNonVisibleOptions && isNotEmpty(allVisibleAndNonVisibleOptions)) {
                if (optionValue && optionLabel && modelValue) {
                    this.selectedOptions.set(allVisibleAndNonVisibleOptions.filter((option) => modelValue.includes(option[optionLabel]) || modelValue.includes(option[optionValue])));
                } else {
                    this.selectedOptions.set(modelValue);
                }
            }
        });
    }

    onInit() {
        this.autoUpdateModel();

        if (this.filterBy()) {
            this.filterOptions = {
                filter: (value) => this.onFilterInputChange(value),
                reset: () => this.resetFilter()
            };
        }
    }

    maxSelectionLimitReached() {
        const selectionLimit = this.selectionLimit();
        return selectionLimit && this.modelValue() && this.modelValue().length === selectionLimit;
    }

    onAfterViewInit() {
        if (this.overlayVisible()) {
            this.show();
        }
    }

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
        if (this.filtered) {
            setTimeout(() => {
                this.overlayViewChild()?.alignOverlay();
            }, 1);
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
        if (this.selectOnFocus() && this.autoOptionFocus() && !this.hasSelectedOption()) {
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
        this.writeValue(value);
    }

    onInputClick(event) {
        event.stopPropagation();
        event.preventDefault();
        this.focusedOptionIndex.set(-1);
    }

    onOptionSelect(event, isFocus = false, index = -1) {
        const { originalEvent, option } = event;
        if (this.$disabled() || this.isOptionDisabled(option)) {
            return;
        }

        let selected = this.isSelected(option);
        let value: any[] = [];

        if (selected) {
            value = this.modelValue().filter((val) => !equals(val, this.getOptionValue(option), this.equalityKey() || ''));
        } else {
            value = [...(this.modelValue() || []), this.getOptionValue(option)];
        }

        this.updateModel(value, originalEvent);
        index !== -1 && this.focusedOptionIndex.set(index);

        isFocus && focus(this.focusInputViewChild()?.nativeElement);

        this.onChange.emit({
            originalEvent: event,
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
        return (this.filterBy() || this.optionLabel() || 'label').split(',');
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
        const matchedOptionIndex = this.hasSelectedOption() && index > 0 ? findLastIndex(this.visibleOptions().slice(0, index), (option) => this.isValidSelectedOption(option)) : -1;

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
        return this.optionValue() ? null : this.dataKey();
    }

    hasSelectedOption() {
        return isNotEmpty(this.modelValue());
    }

    isValidSelectedOption(option) {
        return this.isValidOption(option) && this.isSelected(option);
    }

    isOptionGroup(option) {
        return option && (this.group() || this.optionGroupLabel()) && option.optionGroup && option.group;
    }

    isValidOption(option) {
        return option && !(this.isOptionDisabled(option) || this.isOptionGroup(option));
    }

    isOptionDisabled(option: any) {
        if (this.maxSelectionLimitReached() && !this.isSelected(option)) {
            return true;
        }
        const optionDisabled = this.optionDisabled();
        return optionDisabled ? resolveFieldData(option, optionDisabled) : option && option.disabled !== undefined ? option.disabled : false;
    }

    isSelected(option) {
        const optionValue = this.getOptionValue(option);
        return (this.modelValue() || []).some((value) => equals(value, optionValue, this.equalityKey() || ''));
    }

    isOptionMatched(option) {
        const filterLocale = this.filterLocale();
        return this.isValidOption(option) && this.getOptionLabel(option).toString().toLocaleLowerCase(filterLocale).startsWith(this.searchValue?.toLocaleLowerCase(filterLocale));
    }

    isEmpty() {
        return !this._options() || (this.visibleOptions() && this.visibleOptions().length === 0);
    }

    getOptionIndex(index, scrollerOptions) {
        return this.$virtualScrollerDisabled() ? index : scrollerOptions && scrollerOptions.getItemOptions(index)['index'];
    }

    getAriaPosInset(index) {
        return (
            (this.optionGroupLabel()
                ? index -
                  this.visibleOptions()
                      .slice(0, index)
                      .filter((option) => this.isOptionGroup(option)).length
                : index) + 1
        );
    }

    $ariaSetSize = computed(() => {
        return this.visibleOptions().filter((option) => !this.isOptionGroup(option)).length;
    });

    getLabelByValue(value) {
        const group = this.group();
        const opts = this.options();
        const options = group ? this.flatOptions(opts) : opts || [];
        const matchedOption = options.find((option) => !this.isOptionGroup(option) && equals(this.getOptionValue(option), value, this.equalityKey() || ''));
        return matchedOption ? this.getOptionLabel(matchedOption) : null;
    }

    getSelectedItemsLabel() {
        let pattern = /{(.*?)}/;
        const selectedItemsLabel = this.selectedItemsLabel();
        let message = selectedItemsLabel ? selectedItemsLabel : this.translate(TranslationKeys.SELECTION_MESSAGE);

        if (pattern.test(message)) {
            return message.replace(message.match(pattern)[0], this.modelValue().length + '');
        }

        return message;
    }

    getOptionLabel(option: any) {
        const optionLabel = this.optionLabel();
        return optionLabel ? resolveFieldData(option, optionLabel) : option && option.label != undefined ? option.label : option;
    }

    getOptionValue(option: any) {
        const optionValue = this.optionValue();
        const optionLabel = this.optionLabel();
        return optionValue ? resolveFieldData(option, optionValue) : !optionLabel && option && option.value !== undefined ? option.value : option;
    }

    getOptionGroupLabel(optionGroup: any) {
        const optionGroupLabel = this.optionGroupLabel();
        return optionGroupLabel ? resolveFieldData(optionGroup, optionGroupLabel) : optionGroup && optionGroup.label != undefined ? optionGroup.label : optionGroup;
    }

    getOptionGroupChildren(optionGroup: any) {
        const optionGroupChildren = this.optionGroupChildren();
        return optionGroup ? (optionGroupChildren ? resolveFieldData(optionGroup, optionGroupChildren) : optionGroup.items) : [];
    }

    onKeyDown(event: KeyboardEvent) {
        if (this.$disabled()) {
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

                if (!metaKey && isPrintableCharacter(event.key)) {
                    !this.overlayVisible() && this.show();
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
        !this.overlayVisible() && this.show();
        event.preventDefault();
        event.stopPropagation();
    }

    onArrowUpKey(event, pressedInInputText = false) {
        if (event.altKey && !pressedInInputText) {
            if (this.focusedOptionIndex() !== -1) {
                this.onOptionSelect(event, this.visibleOptions()[this.focusedOptionIndex()]);
            }

            this.overlayVisible() && this.hide();
            event.preventDefault();
        } else {
            const optionIndex = this.focusedOptionIndex() !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex()) : this.findLastFocusedOptionIndex();

            if (event.shiftKey) {
                this.onOptionSelectRange(event, optionIndex, this.startRangeIndex());
            }

            this.changeFocusedOptionIndex(event, optionIndex);

            !this.overlayVisible() && this.show();
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

            !this.overlayVisible() && this.show();
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

            !this.overlayVisible() && this.show();
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
        if (!this.overlayVisible()) {
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

    onEscapeKey(event: KeyboardEvent) {
        if (this.overlayVisible()) {
            this.hide(true);
            event.stopPropagation();
            event.preventDefault();
        }
    }

    onTabKey(event, pressedInInputText = false) {
        if (!pressedInInputText) {
            if (this.overlayVisible() && this.hasFocusableElements()) {
                focus(event.shiftKey ? this.lastHiddenFocusableElementOnOverlay()?.nativeElement : this.firstHiddenFocusableElementOnOverlay()?.nativeElement);

                event.preventDefault();
            } else {
                if (this.focusedOptionIndex() !== -1) {
                    const option = this.visibleOptions()[this.focusedOptionIndex()];

                    !this.isSelected(option) && this.onOptionSelect({ originalEvent: event, option });
                }

                this.overlayVisible() && this.hide(this.filter());
            }
        }
    }

    onShiftKey() {
        this.startRangeIndex.set(this.focusedOptionIndex());
    }

    onContainerClick(event: MouseEvent) {
        if (this.$disabled() || this.loading() || this.readonly() || (event.target as Node | null)?.isSameNode?.(this.focusInputViewChild()?.nativeElement)) {
            return;
        }

        const overlayViewChild = this.overlayViewChild();
        if (!overlayViewChild || !overlayViewChild.el.nativeElement.contains(event.target)) {
            if (this.clickInProgress) {
                return;
            }

            this.clickInProgress = true;

            setTimeout(() => {
                this.clickInProgress = false;
            }, 150);

            this.overlayVisible() ? this.hide(true) : this.show(true);
        }
        this.focusInputViewChild()?.nativeElement.focus({ preventScroll: true });
        this.onClick.emit(event);
        this.cd.detectChanges();
    }

    onFirstHiddenFocus(event) {
        const focusInputViewChild = this.focusInputViewChild();
        const overlayViewChild = this.overlayViewChild();
        const focusableEl = event.relatedTarget === focusInputViewChild?.nativeElement ? getFirstFocusableElement(overlayViewChild?.overlayViewChild()?.nativeElement, ':not([data-p-hidden-focusable="true"])') : focusInputViewChild?.nativeElement;

        focus(focusableEl);
    }

    onInputFocus(event: Event) {
        this.focused = true;
        const focusedOptionIndex = this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : this.overlayVisible() && this.autoOptionFocus() ? this.findFirstFocusedOptionIndex() : -1;
        this.focusedOptionIndex.set(focusedOptionIndex);
        this.overlayVisible() && this.scrollInView(this.focusedOptionIndex());
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

    onFilterInputChange(event: Event) {
        let value: string = (event.target as HTMLInputElement).value;
        this._filterValue.set(value);
        this.focusedOptionIndex.set(-1);
        this.onFilter.emit({ originalEvent: event, filter: this._filterValue() });

        !this.$virtualScrollerDisabled() && this.scroller()?.scrollToIndex(0);
        setTimeout(() => {
            this.overlayViewChild()?.alignOverlay();
        });
    }

    onLastHiddenFocus(event) {
        const focusInputViewChild = this.focusInputViewChild();
        const overlayViewChild = this.overlayViewChild();
        const focusableEl = event.relatedTarget === focusInputViewChild?.nativeElement ? getLastFocusableElement(overlayViewChild?.overlayViewChild()?.nativeElement, ':not([data-p-hidden-focusable="true"])') : focusInputViewChild?.nativeElement;

        focus(focusableEl);
    }

    onOptionMouseEnter(event, index) {
        if (this.focusOnHover()) {
            this.changeFocusedOptionIndex(event, index);
        }
    }

    onFilterBlur(event) {
        this.focusedOptionIndex.set(-1);
    }

    onToggleAll(event) {
        if (this.$disabled() || this.readonly()) {
            return;
        }

        const selectAll = this.selectAll();
        if (selectAll != null) {
            this.onSelectAllChange.emit({
                originalEvent: event,
                checked: !this.allSelected()
            });
        } else {
            // pre-selected disabled options should always be selected.
            const optionDisabled = this.optionDisabled();
            const selectedDisabledOptions = this.getAllVisibleAndNonVisibleOptions().filter(
                (option) => this.isSelected(option) && (optionDisabled ? resolveFieldData(option, optionDisabled) : option && option.disabled !== undefined ? option.disabled : false)
            );

            const visibleOptions = this.allSelected()
                ? this.visibleOptions().filter((option) => !this.isValidOption(option) && this.isSelected(option))
                : this.visibleOptions().filter((option) => this.isSelected(option) || this.isValidOption(option));

            const selectedOptionsBeforeSearch = this.filter() && !this.allSelected() ? this.getAllVisibleAndNonVisibleOptions().filter((option) => this.isSelected(option) && this.isValidOption(option)) : [];

            const optionValues = [...selectedOptionsBeforeSearch, ...selectedDisabledOptions, ...visibleOptions].map((option) => this.getOptionValue(option));
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
            this.selectedOptions.set([]);
        }

        this.onChange.emit({ originalEvent: event, value: this.value });
        DomHandler.focus(this.headerCheckboxViewChild()?.inputViewChild()?.nativeElement);
        this.headerCheckboxFocus = true;

        event.originalEvent.preventDefault();
        event.originalEvent.stopPropagation();
    }

    changeFocusedOptionIndex(event, index) {
        if (this.focusedOptionIndex() !== index) {
            this.focusedOptionIndex.set(index);
            this.scrollInView();
        }
    }

    $virtualScrollerDisabled = computed(() => !this.virtualScroll());

    scrollInView(index = -1) {
        const id = index !== -1 ? `${this.$id()}_${index}` : this.$focusedOptionId();
        const itemsViewChild = this.itemsViewChild();
        if (itemsViewChild && itemsViewChild.nativeElement) {
            const element = findSingle(itemsViewChild.nativeElement, `li[id="${id}"]`);
            if (element) {
                element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
            } else if (!this.$virtualScrollerDisabled()) {
                setTimeout(() => {
                    this.virtualScroll() && this.scroller()?.scrollToIndex(index !== -1 ? index : this.focusedOptionIndex());
                }, 0);
            }
        }
    }

    $focusedOptionId = computed(() => {
        return this.focusedOptionIndex() !== -1 ? `${this.$id()}_${this.focusedOptionIndex()}` : null;
    });

    allSelected() {
        const selectAll = this.selectAll();
        return selectAll !== null ? selectAll : isNotEmpty(this.visibleOptions()) && this.visibleOptions().every((option) => this.isOptionGroup(option) || this.isOptionDisabled(option) || this.isSelected(option));
    }

    partialSelected() {
        const opts = this.options();
        const selected = this.selectedOptions();
        return selected && selected.length > 0 && selected.length < (opts?.length || 0);
    }

    /**
     * Displays the panel.
     * @group Method
     */
    public show(isFocus?) {
        this.overlayVisible.set(true);

        const focusedOptionIndex = this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : this.autoOptionFocus() ? this.findFirstFocusedOptionIndex() : this.findSelectedOptionIndex();
        this.focusedOptionIndex.set(focusedOptionIndex);

        if (isFocus) {
            focus(this.focusInputViewChild()?.nativeElement);
        }
    }

    /**
     * Hides the panel.
     * @group Method
     */
    public hide(isFocus?) {
        this.overlayVisible.set(false);
        this.focusedOptionIndex.set(-1);

        if (this.filter() && this.resetFilterOnHide()) {
            this.resetFilter();
        }
        if (this.overlayOptions()?.mode === 'modal') {
            unblockBodyScroll();
        }

        isFocus && focus(this.focusInputViewChild()?.nativeElement);
    }

    onOverlayBeforeEnter(event: AnimationEvent) {
        const overlayViewChild = this.overlayViewChild();
        const scroller = this.scroller();
        const itemsViewChild = this.itemsViewChild();
        const virtualScroll = this.virtualScroll();
        const opts = this.options();

        this.itemsWrapper = findSingle(overlayViewChild?.overlayViewChild()?.nativeElement, virtualScroll ? '[data-pc-name="virtualscroller"]' : '[data-pc-section="listcontainer"]') as HTMLElement | null;
        virtualScroll && scroller?.setContentEl(itemsViewChild?.nativeElement);

        if (opts && opts.length) {
            if (virtualScroll) {
                const selectedIndex = this.modelValue() ? this.focusedOptionIndex() : -1;
                if (selectedIndex !== -1) {
                    scroller?.scrollToIndex(selectedIndex);
                }
            } else if (this.itemsWrapper) {
                let selectedListItem = findSingle(this.itemsWrapper, '[data-pc-section="option"][data-p-selected="true"]');

                if (selectedListItem) {
                    selectedListItem.scrollIntoView({ block: 'nearest', inline: 'nearest' });
                }
            }
        }

        const filterInputChild = this.filterInputChild();
        if (filterInputChild && filterInputChild.nativeElement) {
            this.preventModelTouched = true;

            if (this.autofocusFilter()) {
                filterInputChild.nativeElement.focus();
            }
        }

        this.onPanelShow.emit(event);
    }

    onOverlayAfterLeave(event: AnimationEvent) {
        this.itemsWrapper = null;
        this.onModelTouched();
        this.onPanelHide.emit(event);
    }

    resetFilter() {
        const filterInputChild = this.filterInputChild();
        if (filterInputChild && filterInputChild.nativeElement) {
            filterInputChild.nativeElement.value = '';
        }

        this._filterValue.set(null);
        this._filteredOptions = null;
    }

    onOverlayHide(event: AnimationEvent) {
        // Called when overlay completes its hide animation
        // Don't call hide() again to avoid recursive calls
        this.focusedOptionIndex.set(-1);
        if (this.filter() && this.resetFilterOnHide()) {
            this.resetFilter();
        }
    }

    close(event: Event) {
        this.hide();
        event.preventDefault();
        event.stopPropagation();
    }

    clear(event: Event) {
        this.value = [];
        this.updateModel(null, event);
        this.selectedOptions.set([]);
        this.onClear.emit();
        this._disableTooltip = true;

        event.stopPropagation();
    }

    labelContainerMouseLeave() {
        if (this._disableTooltip) this._disableTooltip = false;
    }

    removeOption(optionValue, event) {
        let value = this.modelValue().filter((val) => !equals(val, optionValue, this.equalityKey() || ''));

        this.updateModel(value, event);
        this.onChange.emit({
            originalEvent: event,
            value: value,
            itemValue: optionValue
        });
        this.onRemove.emit({
            newValue: value,
            removed: optionValue
        });

        event && event.stopPropagation();
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
        const matchedOptionIndex = index > 0 ? findLastIndex(this.visibleOptions().slice(0, index), (option) => this.isValidOption(option)) : -1;

        return matchedOptionIndex > -1 ? matchedOptionIndex : index;
    }

    findLastSelectedOptionIndex() {
        return this.hasSelectedOption() ? findLastIndex(this.visibleOptions(), (option) => this.isValidSelectedOption(option)) : -1;
    }

    findLastFocusedOptionIndex() {
        const selectedIndex = this.findLastSelectedOptionIndex();

        return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
    }

    findLastOptionIndex() {
        return findLastIndex(this.visibleOptions(), (option) => this.isValidOption(option));
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

    hasFocusableElements() {
        return getFocusableElements(this.overlayViewChild()?.overlayViewChild()?.nativeElement, ':not([data-p-hidden-focusable="true"])').length > 0;
    }

    hasFilter() {
        const filterVal = this._filterValue();
        return filterVal && filterVal.trim().length > 0;
    }

    get containerDataP() {
        return this.cn({
            invalid: this.invalid(),
            disabled: this.$disabled(),
            focus: this.focused,
            fluid: this.hasFluid,
            filled: this.$variant() === 'filled',
            [this.size() as string]: this.size()
        });
    }

    labelDataP = computed(() => {
        const maxSelectedLabels = this.maxSelectedLabels();
        const modelValue = this.modelValue();
        return this.cn({
            placeholder: this.label() === this.placeholder(),
            clearable: this.showClear(),
            disabled: this.$disabled(),
            [this.size() as string]: this.size(),
            'has-chip': this.display() === 'chip' && modelValue && modelValue.length && (maxSelectedLabels ? modelValue.length <= maxSelectedLabels : true),
            empty: !this.placeholder() && !this.$filled()
        });
    });

    dropdownIconDataP = computed(() => {
        return this.cn({
            [this.size() as string]: this.size()
        });
    });

    overlayDataP = computed(() => {
        return this.cn({
            ['overlay-' + this.appendTo()]: 'overlay-' + this.appendTo()
        });
    });

    ariaExpanded = computed(() => this.overlayVisible() ?? false);

    ariaControls = computed(() => (this.overlayVisible() ? this.listId() : null));

    inputTabindex = computed(() => (!this.$disabled() ? this.tabindex() : -1));

    requiredAttr = computed(() => (this.required() ? '' : undefined));

    disabledAttr = computed(() => (this.$disabled() ? '' : undefined));

    get ariaActivedescendant() {
        return this.focused ? this.$focusedOptionId() : undefined;
    }

    isCommaDisplay = computed(() => this.display() === 'comma');

    isChipDisplay = computed(() => this.display() === 'chip');

    showSelectedItemsLabel = computed(() => {
        const items = this.chipSelectedItems();
        return items && items.length === this.maxSelectedLabels();
    });

    hasChipRemoveIconTemplate = computed(() => !!(this.chipIconTemplate() || this.removeTokenIconTemplate()));

    isEditable = computed(() => !this.$disabled() && !this.readonly());

    isModelEmpty = computed(() => {
        const value = this.modelValue();
        return !value || value.length === 0;
    });

    showToggleAllCheckbox = computed(() => this.showToggleAll() && !this.selectionLimit());

    showDefaultHeaderCheckIcon = computed(() => !this.headerCheckboxIconTemplate() && this.allSelected());

    showEmptyFilterMessage = computed(() => this.hasFilter() && this.isEmpty());

    showEmptyMessage = computed(() => !this.hasFilter() && this.isEmpty());

    hasFooterContent = computed(() => !!(this.footerFacet() || this.footerTemplate()));

    readonly chipIconContext = { class: 'p-multiselect-chip-icon' };

    selectedItemsContext = computed(() => ({
        $implicit: this.selectedOptions(),
        removeChip: this.removeOption.bind(this)
    }));

    dropdownIconContext = computed(() => ({ dataP: this.dropdownIconDataP() }));

    filterContext = computed(() => ({ options: this.filterOptions }));

    getHeaderCheckboxIconContext(klass: string) {
        return { checked: this.allSelected(), partialSelected: this.partialSelected(), class: klass };
    }

    getScrollerItemsContext(items: any[], scrollerOptions: any) {
        return { $implicit: items, options: scrollerOptions };
    }

    getLoaderContext(scrollerOptions: any) {
        return { options: scrollerOptions };
    }

    getGroupContext(option: any) {
        return { $implicit: option.optionGroup };
    }

    defaultItemsContext = computed(() => ({ $implicit: this.visibleOptions(), options: {} }));

    filterInputValue = computed(() => this._filterValue() || '');

    listContainerMaxHeight = computed(() => (this.virtualScroll() ? 'auto' : this.scrollHeight() || 'auto'));

    /**
     * @override
     *
     * @see {@link BaseEditableHolder.writeControlValue}
     * Writes the value to the control.
     */
    writeControlValue(value: any, setModelValue: (value: any) => void): void {
        this.value = value;
        setModelValue(value);
    }

    getHeaderCheckboxPTOptions(key: string) {
        return this.ptm(key, {
            context: {
                selected: this.allSelected()
            }
        });
    }

    getPTOptions(option, itemOptions, index, key) {
        return this.ptm(key, {
            context: {
                selected: this.isSelected(option),
                focused: this.focusedOptionIndex() === this.getOptionIndex(index, itemOptions),
                disabled: this.isOptionDisabled(option)
            }
        });
    }
}

@NgModule({
    imports: [MultiSelect, SharedModule],
    exports: [MultiSelect, SharedModule]
})
export class MultiSelectModule {}
