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
    HostListener,
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
import { equals, findLastIndex, findSingle, focus, isEmpty, isNotEmpty, resolveFieldData, uuid } from '@primeuix/utils';
import { OverlayOptions, OverlayService, ScrollerOptions, SharedModule, TranslationKeys } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { PARENT_INSTANCE } from 'primeng/basecomponent';
import { BaseInput } from 'primeng/baseinput';
import { Bind, BindModule } from 'primeng/bind';
import { Chip } from 'primeng/chip';
import type { AppendTo, CSSProperties } from 'primeng/types/shared';
import { ConnectedOverlayScrollHandler } from 'primeng/dom';
import { ChevronDownIcon, SpinnerIcon, TimesCircleIcon, TimesIcon } from 'primeng/icons';
import { InputText } from 'primeng/inputtext';
import { Overlay } from 'primeng/overlay';
import { Ripple } from 'primeng/ripple';
import { Scroller } from 'primeng/scroller';
import { Nullable } from 'primeng/ts-helpers';
import {
    AutoCompleteAddEvent,
    AutoCompleteCompleteEvent,
    AutoCompleteDropdownClickEvent,
    AutoCompleteGroupTemplateContext,
    AutoCompleteItemTemplateContext,
    AutoCompleteLazyLoadEvent,
    AutoCompleteLoaderTemplateContext,
    AutoCompletePassThrough,
    AutoCompleteRemoveIconTemplateContext,
    AutoCompleteSelectedItemTemplateContext,
    AutoCompleteSelectEvent,
    AutoCompleteUnselectEvent
} from 'primeng/types/autocomplete';
import { AutoCompleteStyle } from './style/autocompletestyle';

const AUTOCOMPLETE_INSTANCE = new InjectionToken<AutoComplete>('AUTOCOMPLETE_INSTANCE');

export const AUTOCOMPLETE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutoComplete),
    multi: true
};

/**
 * AutoComplete is an input component that provides real-time suggestions when being typed.
 * @group Components
 */
@Component({
    selector: 'p-autoComplete, p-autocomplete, p-auto-complete',
    standalone: true,
    imports: [NgTemplateOutlet, Overlay, InputText, Ripple, Scroller, AutoFocus, TimesCircleIcon, SpinnerIcon, ChevronDownIcon, Chip, SharedModule, TimesIcon, BindModule],
    template: `
        @if (!multiple()) {
            <input
                #focusInput
                [pAutoFocus]="autofocus()"
                pInputText
                [pt]="ptm('pcInputText')"
                [class]="cn(cx('pcInputText'), inputStyleClass())"
                [style]="inputStyle()"
                [attr.type]="type()"
                [attr.value]="inputValue()"
                [variant]="$variant()"
                [invalid]="invalid()"
                [attr.id]="inputId()"
                [attr.autocomplete]="autocomplete()"
                aria-autocomplete="list"
                role="combobox"
                [attr.placeholder]="placeholder()"
                [attr.name]="name()"
                [attr.minlength]="minlength()"
                [pSize]="size()"
                [attr.min]="min()"
                [attr.max]="max()"
                [attr.pattern]="pattern()"
                [attr.size]="inputSize()"
                [attr.maxlength]="maxlength()"
                [attr.tabindex]="$tabindex()"
                [attr.required]="requiredAttr()"
                [attr.readonly]="readonlyAttr()"
                [attr.disabled]="disabledAttr()"
                [attr.aria-label]="ariaLabel()"
                [attr.aria-labelledby]="ariaLabelledBy()"
                [attr.aria-required]="required()"
                [attr.aria-expanded]="overlayVisible()"
                [attr.aria-controls]="getAriaControls()"
                [attr.aria-activedescendant]="getAriaActiveDescendant()"
                (input)="onInput($event)"
                (keydown)="onKeyDown($event)"
                (change)="onInputChange($event)"
                (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)"
                (paste)="onInputPaste($event)"
                (keyup)="onInputKeyUp($event)"
                [fluid]="hasFluid"
                [pInputTextUnstyled]="unstyled()"
            />
        }
        @if ($showClear()) {
            @if (!clearIconTemplate()) {
                <svg data-p-icon="times" [pBind]="ptm('clearIcon')" [class]="cx('clearIcon')" (click)="clear()" [attr.aria-hidden]="true" />
            } @else {
                <span [pBind]="ptm('clearIcon')" [class]="cx('clearIcon')" (click)="clear()" [attr.aria-hidden]="true">
                    <ng-container [ngTemplateOutlet]="clearIconTemplate()!"></ng-container>
                </span>
            }
        }

        @if (multiple()) {
            <ul
                #multiContainer
                [pBind]="ptm('inputMultiple')"
                [class]="cx('inputMultiple')"
                [attr.data-p]="inputMultipleDataP"
                [tabindex]="-1"
                role="listbox"
                [attr.aria-orientation]="'horizontal'"
                [attr.aria-activedescendant]="getMultipleAriaActiveDescendant()"
                (focus)="onMultipleContainerFocus($event)"
                (blur)="onMultipleContainerBlur($event)"
                (keydown)="onMultipleContainerKeyDown($event)"
            >
                @for (option of modelValue(); track getOptionValue(option); let i = $index) {
                    <li
                        #token
                        [pBind]="ptm('chipItem')"
                        [class]="cx('chipItem', { i })"
                        [attr.id]="getMultipleOptionId(i)"
                        role="option"
                        [attr.aria-label]="getOptionLabel(option)"
                        [attr.aria-setsize]="modelValue().length"
                        [attr.aria-posinset]="i + 1"
                        [attr.aria-selected]="true"
                    >
                        <p-chip [pt]="ptm('pcChip')" [class]="cx('pcChip')" [label]="getChipLabel(option)" [disabled]="$disabled()" [removable]="true" (onRemove)="!readonly() ? removeOption($event, i) : ''" [unstyled]="unstyled()">
                            @if (selectedItemTemplate()) {
                                <ng-container [ngTemplateOutlet]="selectedItemTemplate()!" [ngTemplateOutletContext]="getSelectedItemContext(option)"></ng-container>
                            }
                            <ng-template #removeicon>
                                @if (!removeIconTemplate()) {
                                    <span [pBind]="ptm('chipIcon')" [class]="cx('chipIcon')" (click)="!readonly() && !$disabled() ? removeOption($event, i) : ''">
                                        <svg data-p-icon="times-circle" [class]="cx('chipIcon')" [attr.aria-hidden]="true" />
                                    </span>
                                } @else {
                                    <span [pBind]="ptm('chipIcon')" [attr.aria-hidden]="true">
                                        <ng-container [ngTemplateOutlet]="removeIconTemplate()!" [ngTemplateOutletContext]="getRemoveIconContext(i)"></ng-container>
                                    </span>
                                }
                            </ng-template>
                        </p-chip>
                    </li>
                }
                <li [pBind]="ptm('inputChip')" [class]="cx('inputChip')" role="option">
                    <input
                        #focusInput
                        #multiIn
                        [pAutoFocus]="autofocus()"
                        [pBind]="ptm('input')"
                        [class]="cx('pcInputText')"
                        [style]="inputStyle()"
                        [attr.type]="type()"
                        [attr.id]="inputId()"
                        [attr.autocomplete]="autocomplete()"
                        [attr.name]="name()"
                        [attr.minlength]="minlength()"
                        [attr.maxlength]="maxlength()"
                        [attr.size]="size()"
                        [attr.min]="min()"
                        [attr.max]="max()"
                        [attr.pattern]="pattern()"
                        role="combobox"
                        [attr.placeholder]="getMultiplePlaceholder()"
                        aria-autocomplete="list"
                        [attr.tabindex]="$tabindex()"
                        [attr.required]="requiredAttr()"
                        [attr.readonly]="readonlyAttr()"
                        [attr.disabled]="disabledAttr()"
                        [attr.aria-label]="ariaLabel()"
                        [attr.aria-labelledby]="ariaLabelledBy()"
                        [attr.aria-required]="required()"
                        [attr.aria-expanded]="overlayVisible()"
                        [attr.aria-controls]="getAriaControls()"
                        [attr.aria-activedescendant]="getAriaActiveDescendant()"
                        (input)="onInput($event)"
                        (keydown)="onKeyDown($event)"
                        (change)="onInputChange($event)"
                        (focus)="onInputFocus($event)"
                        (blur)="onInputBlur($event)"
                        (paste)="onInputPaste($event)"
                        (keyup)="onInputKeyUp($event)"
                    />
                </li>
            </ul>
        }
        @if (loading()) {
            @if (!loadingIconTemplate()) {
                <svg data-p-icon="spinner" [pBind]="ptm('loader')" [class]="cx('loader')" [spin]="true" [attr.aria-hidden]="true" />
            } @else {
                <span [pBind]="ptm('loader')" [class]="cx('loader')" [attr.aria-hidden]="true">
                    <ng-container [ngTemplateOutlet]="loadingIconTemplate()!"></ng-container>
                </span>
            }
        }
        @if (dropdown()) {
            <button #ddBtn type="button" [pBind]="ptm('dropdown')" [attr.aria-label]="dropdownAriaLabel()" [class]="cx('dropdown')" [disabled]="$disabled()" pRipple (click)="handleDropdownClick($event)" [attr.tabindex]="tabindex()">
                @if (dropdownIcon()) {
                    <span [class]="dropdownIcon()" [attr.aria-hidden]="true"></span>
                } @else {
                    @if (!dropdownIconTemplate()) {
                        <svg data-p-icon="chevron-down" [pBind]="ptm('dropdown')" />
                    } @else {
                        <ng-container [ngTemplateOutlet]="dropdownIconTemplate()!"></ng-container>
                    }
                }
            </button>
        }
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
            (onHide)="hide()"
            [attr.data-p]="overlayDataP"
        >
            <ng-template #content>
                <div [pBind]="ptm('overlay')" [class]="cn(cx('overlay'), panelStyleClass())" [style]="panelStyle()">
                    @if (headerTemplate()) {
                        <ng-container [ngTemplateOutlet]="headerTemplate()!"></ng-container>
                    }
                    <div [pBind]="ptm('listContainer')" [class]="cx('listContainer')" [style.max-height]="getListContainerMaxHeight()" [tabindex]="-1">
                        @if (virtualScroll()) {
                            <p-scroller
                                #scroller
                                [tabindex]="-1"
                                [pt]="ptm('virtualScroller')"
                                [items]="visibleOptions()"
                                [style]="scrollerStyle()"
                                [itemSize]="virtualScrollItemSize()"
                                [autoSize]="true"
                                [lazy]="lazy()"
                                (onLazyLoad)="onLazyLoad.emit($event)"
                                [options]="virtualScrollOptions()"
                            >
                                <ng-template #content let-items let-scrollerOptions="options">
                                    <ng-container [ngTemplateOutlet]="buildInItems" [ngTemplateOutletContext]="getBuildInItemsContext(items, scrollerOptions)"></ng-container>
                                </ng-template>
                                @if (loaderTemplate()) {
                                    <ng-template #loader let-scrollerOptions="options">
                                        <ng-container [ngTemplateOutlet]="loaderTemplate()!" [ngTemplateOutletContext]="getLoaderContext(scrollerOptions)"></ng-container>
                                    </ng-template>
                                }
                            </p-scroller>
                        } @else {
                            <ng-container [ngTemplateOutlet]="buildInItems" [ngTemplateOutletContext]="getBuildInItemsContext(visibleOptions(), {})"></ng-container>
                        }
                    </div>

                    <ng-template #buildInItems let-items let-scrollerOptions="options">
                        <ul #items [pBind]="ptm('list')" [class]="cn(cx('list'), scrollerOptions.contentStyleClass)" [style]="scrollerOptions.contentStyle" role="listbox" [attr.id]="$listId()" [attr.aria-label]="listLabel">
                            @for (option of items; track getOptionValue(option); let i = $index) {
                                @if (isOptionGroup(option)) {
                                    <li [pBind]="ptm('optionGroup')" [attr.id]="getOptionElementId(i, scrollerOptions)" [class]="cx('optionGroup')" [style]="getItemStyle(scrollerOptions)" role="option">
                                        @if (!groupTemplate()) {
                                            <span>{{ getOptionGroupLabel(option.optionGroup) }}</span>
                                        }
                                        @if (groupTemplate()) {
                                            <ng-container [ngTemplateOutlet]="groupTemplate()!" [ngTemplateOutletContext]="getGroupContext(option.optionGroup)"></ng-container>
                                        }
                                    </li>
                                } @else {
                                    <li
                                        pRipple
                                        [pBind]="getPTOptions(option, scrollerOptions, i, 'option')"
                                        [style]="getItemStyle(scrollerOptions)"
                                        [class]="cx('option', { option, i, scrollerOptions })"
                                        [attr.id]="getOptionElementId(i, scrollerOptions)"
                                        role="option"
                                        [attr.aria-label]="getOptionLabel(option)"
                                        [attr.aria-selected]="isSelected(option)"
                                        [attr.data-p-selected]="isSelected(option)"
                                        [attr.aria-disabled]="isOptionDisabled(option)"
                                        [attr.data-p-focused]="isOptionFocused(i, scrollerOptions)"
                                        [attr.aria-setsize]="ariaSetSize"
                                        [attr.aria-posinset]="getAriaPosInset(getOptionIndex(i, scrollerOptions))"
                                        (click)="onOptionSelect($event, option)"
                                        (mouseenter)="onOptionMouseEnter($event, getOptionIndex(i, scrollerOptions))"
                                    >
                                        @if (!itemTemplate()) {
                                            <span>{{ getOptionLabel(option) }}</span>
                                        } @else {
                                            <ng-container [ngTemplateOutlet]="itemTemplate()!" [ngTemplateOutletContext]="getItemContext(option, i, scrollerOptions)"></ng-container>
                                        }
                                    </li>
                                }
                            }
                            @if (shouldShowEmptyMessage(items)) {
                                <li [pBind]="ptm('emptyMessage')" [class]="cx('emptyMessage')" [style]="getItemStyle(scrollerOptions)" role="option">
                                    @if (!emptyTemplate()) {
                                        {{ searchResultMessageText }}
                                    } @else {
                                        <ng-container [ngTemplateOutlet]="emptyTemplate()!"></ng-container>
                                    }
                                </li>
                            }
                        </ul>
                    </ng-template>
                    @if (footerTemplate()) {
                        <ng-container [ngTemplateOutlet]="footerTemplate()!"></ng-container>
                    }
                </div>
                <span role="status" aria-live="polite" class="p-hidden-accessible">
                    {{ selectedMessageText }}
                </span>
            </ng-template>
        </p-overlay>
    `,
    providers: [AUTOCOMPLETE_VALUE_ACCESSOR, AutoCompleteStyle, { provide: AUTOCOMPLETE_INSTANCE, useExisting: AutoComplete }, { provide: PARENT_INSTANCE, useExisting: AutoComplete }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "cx('root')",
        '[style]': "sx('root')",
        '[attr.data-p]': 'containerDataP'
    },
    hostDirectives: [Bind]
})
export class AutoComplete extends BaseInput<AutoCompletePassThrough> {
    componentName = 'AutoComplete';

    $pcAutoComplete: AutoComplete | undefined = inject(AUTOCOMPLETE_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    /**
     * Minimum number of characters to initiate a search.
     * @group Props
     */
    minQueryLength = input<number>();
    /**
     * Delay between keystrokes to wait before sending a query.
     * @group Props
     */
    delay = input(300, { transform: numberAttribute });
    /**
     * Inline style of the overlay panel element.
     * @group Props
     */
    panelStyle = input<CSSProperties>();
    /**
     * Style class of the overlay panel element.
     * @group Props
     */
    panelStyleClass = input<string>();
    /**
     * Inline style of the input field.
     * @group Props
     */
    inputStyle = input<CSSProperties>();
    /**
     * Identifier of the focus input to match a label defined for the component.
     * @group Props
     */
    inputId = input<string>();
    /**
     * Inline style of the input field.
     * @group Props
     */
    inputStyleClass = input<string>();
    /**
     * Hint text for the input field.
     * @group Props
     */
    placeholder = input<string>();
    /**
     * When present, it specifies that the input cannot be typed.
     * @group Props
     */
    readonly = input(false, { transform: booleanAttribute });
    /**
     * Maximum height of the suggestions panel.
     * @group Props
     */
    scrollHeight = input('200px');
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @group Props
     */
    lazy = input(false, { transform: booleanAttribute });
    /**
     * Whether the data should be loaded on demand during scroll.
     * @group Props
     */
    virtualScroll = input(false, { transform: booleanAttribute });
    /**
     * Height of an item in the list for VirtualScrolling.
     * @group Props
     */
    virtualScrollItemSize = input<number>();
    /**
     * Whether to use the scroller feature. The properties of scroller component can be used like an object in it.
     * @group Props
     */
    virtualScrollOptions = input<ScrollerOptions>();
    /**
     * When enabled, highlights the first item in the list by default.
     * @group Props
     */
    autoHighlight = input(false, { transform: booleanAttribute });
    /**
     * When present, autocomplete clears the manual input if it does not match of the suggestions to force only accepting values from the suggestions.
     * @group Props
     */
    forceSelection = input(false, { transform: booleanAttribute });
    /**
     * Type of the input, defaults to "text".
     * @group Props
     */
    type = input('text');
    /**
     * Whether to automatically manage layering.
     * @group Props
     */
    autoZIndex = input(true, { transform: booleanAttribute });
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    baseZIndex = input(0, { transform: numberAttribute });
    /**
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    ariaLabel = input<string>();
    /**
     * Defines a string that labels the dropdown button for accessibility.
     * @group Props
     */
    dropdownAriaLabel = input<string>();
    /**
     * Specifies one or more IDs in the DOM that labels the input field.
     * @group Props
     */
    ariaLabelledBy = input<string>();
    /**
     * Icon class of the dropdown icon.
     * @group Props
     */
    dropdownIcon = input<string>();
    /**
     * Ensures uniqueness of selected items on multiple mode.
     * @group Props
     */
    unique = input(true, { transform: booleanAttribute });
    /**
     * Whether to display options as grouped when nested options are provided.
     * @group Props
     */
    group = input(false, { transform: booleanAttribute });
    /**
     * Whether to run a query when input receives focus.
     * @group Props
     */
    completeOnFocus = input(false, { transform: booleanAttribute });
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @group Props
     */
    showClear = input(false, { transform: booleanAttribute });
    /**
     * Displays a button next to the input field when enabled.
     * @group Props
     */
    dropdown = input(false, { transform: booleanAttribute });
    /**
     * Whether to show the empty message or not.
     * @group Props
     */
    showEmptyMessage = input(true, { transform: booleanAttribute });
    /**
     * Specifies the behavior dropdown button. Default "blank" mode sends an empty string and "current" mode sends the input value.
     * @group Props
     */
    dropdownMode = input('blank');
    /**
     * Specifies if multiple values can be selected.
     * @group Props
     */
    multiple = input(false, { transform: booleanAttribute });
    /**
     * When enabled, the input value is added to the selected items on tab key press when multiple is true and typeahead is false.
     * @group Props
     */
    addOnTab = input(false, { transform: booleanAttribute });
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = input<number>();
    /**
     * A property to uniquely identify a value in options.
     * @group Props
     */
    dataKey = input<string>();
    /**
     * Text to display when there is no data. Defaults to global value in i18n translation configuration.
     * @group Props
     */
    emptyMessage = input<string>();
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus = input(false, { transform: booleanAttribute });
    /**
     * Used to define a string that autocomplete attribute the current element.
     * @group Props
     */
    autocomplete = input('off');
    /**
     * Name of the options field of an option group.
     * @group Props
     */
    optionGroupChildren = input<string>('items');
    /**
     * Name of the label field of an option group.
     * @group Props
     */
    optionGroupLabel = input<string>('label');
    /**
     * Options for the overlay element.
     * @group Props
     */
    overlayOptions = input<OverlayOptions>();
    /**
     * An array of suggestions to display.
     * @group Props
     */
    suggestions = input<any[]>([]);
    /**
     * Property name or getter function to use as the label of an option.
     * @group Props
     */
    optionLabel = input<string | ((item: any) => string)>();
    /**
     * Property name or getter function to use as the value of an option.
     * @group Props
     */
    optionValue = input<string | ((item: any) => string)>();
    /**
     * Unique identifier of the component.
     * @group Props
     */
    id = input<string>();
    /**
     * Text to display when the search is active. Defaults to global value in i18n translation configuration.
     * @group Props
     * @defaultValue '{0} results are available'
     */
    searchMessage = input<string>();
    /**
     * Text to display when filtering does not return any results. Defaults to global value in i18n translation configuration.
     * @group Props
     * @defaultValue 'No selected item'
     */
    emptySelectionMessage = input<string>();
    /**
     * Text to be displayed in hidden accessible field when options are selected. Defaults to global value in i18n translation configuration.
     * @group Props
     * @defaultValue '{0} items selected'
     */
    selectionMessage = input<string>();
    /**
     * Whether to focus on the first visible or selected element when the overlay panel is shown.
     * @group Props
     */
    autoOptionFocus = input(false, { transform: booleanAttribute });
    /**
     * When enabled, the focused option is selected.
     * @group Props
     */
    selectOnFocus = input(false, { transform: booleanAttribute });
    /**
     * Locale to use in searching. The default locale is the host environment's current locale.
     * @group Props
     */
    searchLocale = input<string | string[]>();
    /**
     * Property name or getter function to use as the disabled flag of an option, defaults to false when not defined.
     * @group Props
     */
    optionDisabled = input<string | ((item: any) => string)>();
    /**
     * When enabled, the hovered option will be focused.
     * @group Props
     */
    focusOnHover = input(true, { transform: booleanAttribute });
    /**
     * Whether typeahead is active or not.
     * @defaultValue true
     * @group Props
     */
    typeahead = input(true, { transform: booleanAttribute });
    /**
     * Whether to add an item on blur event if the input has value and typeahead is false with multiple mode.
     * @defaultValue false
     * @group Props
     */
    addOnBlur = input(false, { transform: booleanAttribute });
    /**
     * Separator char to add item when typeahead is false and multiple mode is enabled.
     * @group Props
     */
    separator = input<string | RegExp>();
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
     * Callback to invoke to search for suggestions.
     * @param {AutoCompleteCompleteEvent} event - Custom complete event.
     * @group Emits
     */
    completeMethod = output<AutoCompleteCompleteEvent>();
    /**
     * Callback to invoke when a suggestion is selected.
     * @param {AutoCompleteSelectEvent} event - custom select event.
     * @group Emits
     */
    onSelect = output<AutoCompleteSelectEvent>();
    /**
     * Callback to invoke when a selected value is removed.
     * @param {AutoCompleteUnselectEvent} event - custom unselect event.
     * @group Emits
     */
    onUnselect = output<AutoCompleteUnselectEvent>();
    /**
     * Callback to invoke when an item is added via addOnBlur or separator features.
     * @param {AutoCompleteAddEvent} event - Custom add event.
     * @group Emits
     */
    onAdd = output<AutoCompleteAddEvent>();
    /**
     * Callback to invoke when the component receives focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onFocus = output<Event>();
    /**
     * Callback to invoke when the component loses focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onBlur = output<Event>();
    /**
     * Callback to invoke to when dropdown button is clicked.
     * @param {AutoCompleteDropdownClickEvent} event - custom dropdown click event.
     * @group Emits
     */
    onDropdownClick = output<AutoCompleteDropdownClickEvent>();
    /**
     * Callback to invoke when clear button is clicked.
     * @group Emits
     */
    onClear = output<void>();
    /**
     * Callback to invoke on input key down.
     * @param {KeyboardEvent} event - Keyboard event.
     * @group Emits
     */
    onInputKeydown = output<KeyboardEvent>();
    /**
     * Callback to invoke on input key up.
     * @param {KeyboardEvent} event - Keyboard event.
     * @group Emits
     */
    onKeyUp = output<KeyboardEvent>();
    /**
     * Callback to invoke on overlay is shown.
     * @group Emits
     */
    onShow = output<void>();
    /**
     * Callback to invoke on overlay is hidden.
     * @group Emits
     */
    onHide = output<void>();
    /**
     * Callback to invoke on lazy load data.
     * @param {AutoCompleteLazyLoadEvent} event - Lazy load event.
     * @group Emits
     */
    onLazyLoad = output<AutoCompleteLazyLoadEvent>();

    inputEL = viewChild<ElementRef>('focusInput');

    multiInputEl = viewChild<ElementRef>('multiIn');

    multiContainerEL = viewChild<ElementRef>('multiContainer');

    dropdownButton = viewChild<ElementRef>('ddBtn');

    itemsViewChild = viewChild<ElementRef>('items');

    scroller = viewChild<Scroller>('scroller');

    overlayViewChild = viewChild<Overlay>('overlay');

    itemsWrapper: Nullable<HTMLDivElement>;

    /**
     * Custom item template.
     * @group Templates
     */
    itemTemplate = contentChild<TemplateRef<AutoCompleteItemTemplateContext>>('item', { descendants: false });

    /**
     * Custom empty message template.
     * @group Templates
     */
    emptyTemplate = contentChild<TemplateRef<void>>('empty', { descendants: false });

    /**
     * Custom header template.
     * @group Templates
     */
    headerTemplate = contentChild<TemplateRef<void>>('header', { descendants: false });

    /**
     * Custom footer template.
     * @group Templates
     */
    footerTemplate = contentChild<TemplateRef<void>>('footer', { descendants: false });

    /**
     * Custom selected item template.
     * @group Templates
     */
    selectedItemTemplate = contentChild<TemplateRef<AutoCompleteSelectedItemTemplateContext>>('selecteditem', { descendants: false });

    /**
     * Custom group template.
     * @group Templates
     */
    groupTemplate = contentChild<TemplateRef<AutoCompleteGroupTemplateContext>>('group', { descendants: false });

    /**
     * Custom loader template.
     * @group Templates
     */
    loaderTemplate = contentChild<TemplateRef<AutoCompleteLoaderTemplateContext>>('loader', { descendants: false });

    /**
     * Custom remove icon template.
     * @group Templates
     */
    removeIconTemplate = contentChild<TemplateRef<AutoCompleteRemoveIconTemplateContext>>('removeicon', { descendants: false });

    /**
     * Custom loading icon template.
     * @group Templates
     */
    loadingIconTemplate = contentChild<TemplateRef<void>>('loadingicon', { descendants: false });

    /**
     * Custom clear icon template.
     * @group Templates
     */
    clearIconTemplate = contentChild<TemplateRef<void>>('clearicon', { descendants: false });

    /**
     * Custom dropdown icon template.
     * @group Templates
     */
    dropdownIconTemplate = contentChild<TemplateRef<void>>('dropdownicon', { descendants: false });

    @HostListener('click', ['$event'])
    onHostClick(event: MouseEvent) {
        this.onContainerClick(event);
    }

    value: any;

    timeout: ReturnType<typeof setTimeout> | null = null;

    overlayVisible = signal<boolean>(false);

    suggestionsUpdated: Nullable<boolean>;

    highlightOption: unknown;

    highlightOptionChanged: Nullable<boolean>;

    focused = signal<boolean>(false);

    loading = signal<boolean>(false);

    scrollHandler: Nullable<ConnectedOverlayScrollHandler>;

    listId: string | undefined;

    searchTimeout: ReturnType<typeof setTimeout> | null = null;

    dirty: boolean = false;

    focusedMultipleOptionIndex = signal<number>(-1);

    focusedOptionIndex = signal<number>(-1);

    _componentStyle = inject(AutoCompleteStyle);

    overlayService = inject(OverlayService);

    private _internalId = uuid('pn_id_');

    $id = computed(() => this.id() || this._internalId);

    $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo());

    visibleOptions = computed(() => {
        return this.group() ? this.flatOptions(this.suggestions()) : this.suggestions() || [];
    });

    inputValue = computed(() => {
        const modelValue = this.modelValue();
        const selectedOption = this.optionValueSelected ? (this.suggestions() || []).find((option: any) => equals(option, modelValue, this.equalityKey())) : modelValue;

        if (isNotEmpty(modelValue)) {
            if (typeof modelValue === 'object' || this.optionValueSelected) {
                const label = this.getOptionLabel(selectedOption);

                return label != null ? label : modelValue;
            } else {
                return modelValue;
            }
        } else {
            return '';
        }
    });

    $showClear = computed(() => this.$filled() && !this.$disabled() && this.showClear() && !this.loading());

    scrollerStyle = computed(() => ({ height: this.scrollHeight() }));

    $tabindex = computed(() => (!this.$disabled() ? this.tabindex() : -1));

    requiredAttr = computed(() => (this.required() ? '' : undefined));

    readonlyAttr = computed(() => (this.readonly() ? '' : undefined));

    disabledAttr = computed(() => (this.$disabled() ? '' : undefined));

    $listId = computed(() => this.$id() + '_list');

    get focusedMultipleOptionId() {
        return this.focusedMultipleOptionIndex() !== -1 ? `${this.$id()}_multiple_option_${this.focusedMultipleOptionIndex()}` : null;
    }

    get focusedOptionId() {
        return this.focusedOptionIndex() !== -1 ? `${this.$id()}_${this.focusedOptionIndex()}` : null;
    }

    get searchResultMessageText() {
        return isNotEmpty(this.visibleOptions()) && this.overlayVisible() ? this.searchMessageText.replaceAll('{0}', this.visibleOptions().length) : this.emptySearchMessageText;
    }

    get searchMessageText() {
        return this.searchMessage() || this.config.translation.searchMessage || '';
    }

    get emptySearchMessageText() {
        return this.emptyMessage() || this.config.translation.emptySearchMessage || '';
    }

    get selectionMessageText() {
        return this.selectionMessage() || this.config.translation.selectionMessage || '';
    }

    get emptySelectionMessageText() {
        return this.emptySelectionMessage() || this.config.translation.emptySelectionMessage || '';
    }

    get selectedMessageText() {
        return this.hasSelectedOption() ? this.selectionMessageText.replaceAll('{0}', this.multiple() ? this.modelValue()?.length : '1') : this.emptySelectionMessageText;
    }

    get ariaSetSize() {
        return this.visibleOptions().filter((option) => !this.isOptionGroup(option)).length;
    }

    get listLabel(): string {
        return this.translate(TranslationKeys.ARIA, 'listLabel');
    }

    get virtualScrollerDisabled() {
        return !this.virtualScroll();
    }

    get optionValueSelected() {
        return typeof this.modelValue() === 'string' && this.optionValue();
    }

    chipItemClass(index: number) {
        return this._componentStyle.classes.chipItem({ instance: this, i: index });
    }

    constructor() {
        super();
        effect(() => {
            const value = this.suggestions();
            if (value) {
                this.handleSuggestionsChange();
            }
        });
    }

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
        //Use timeouts as since Angular 4.2, AfterViewChecked is broken and not called after panel is updated
        if (this.suggestionsUpdated && this.overlayViewChild()) {
            setTimeout(() => {
                if (this.overlayViewChild()) {
                    this.overlayViewChild()!.alignOverlay();
                }
            }, 1);
            this.suggestionsUpdated = false;
        }
    }

    handleSuggestionsChange() {
        if (this.loading()) {
            this.suggestions()?.length > 0 || this.showEmptyMessage() || !!this.emptyTemplate() ? this.show() : this.hide();
            const focusedOptionIndex = this.overlayVisible() && this.autoOptionFocus() ? this.findFirstFocusedOptionIndex() : -1;
            this.focusedOptionIndex.set(focusedOptionIndex);
            this.suggestionsUpdated = true;
            this.loading.set(false);
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

    isOptionGroup(option: any): boolean {
        return this.optionGroupLabel() && option.optionGroup && option.group;
    }

    findFirstOptionIndex(): number {
        return this.visibleOptions().findIndex((option) => this.isValidOption(option));
    }

    findLastOptionIndex(): number {
        return findLastIndex(this.visibleOptions(), (option) => this.isValidOption(option));
    }

    findFirstFocusedOptionIndex(): number {
        const selectedIndex = this.findSelectedOptionIndex();

        return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
    }

    findLastFocusedOptionIndex(): number {
        const selectedIndex = this.findSelectedOptionIndex();

        return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
    }

    findSelectedOptionIndex(): number {
        return this.hasSelectedOption() ? this.visibleOptions().findIndex((option) => this.isValidSelectedOption(option)) : -1;
    }

    findNextOptionIndex(index: number): number {
        const matchedOptionIndex =
            index < this.visibleOptions().length - 1
                ? this.visibleOptions()
                      .slice(index + 1)
                      .findIndex((option) => this.isValidOption(option))
                : -1;

        return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
    }

    findPrevOptionIndex(index: number): number {
        const matchedOptionIndex = index > 0 ? findLastIndex(this.visibleOptions().slice(0, index), (option) => this.isValidOption(option)) : -1;

        return matchedOptionIndex > -1 ? matchedOptionIndex : index;
    }

    isValidSelectedOption(option: any): boolean {
        return this.isValidOption(option) && this.isSelected(option);
    }

    isValidOption(option: any): boolean {
        return option && !(this.isOptionDisabled(option) || this.isOptionGroup(option));
    }

    isOptionDisabled(option: any): boolean {
        return this.optionDisabled() ? resolveFieldData(option, this.optionDisabled()) : false;
    }

    isSelected(option: any): boolean {
        if (this.multiple()) {
            return this.unique() ? (this.modelValue() as string[])?.some((model) => equals(model, option, this.equalityKey())) : false;
        }
        return equals(this.modelValue(), option, this.equalityKey());
    }

    isOptionMatched(option: any, value: string): boolean {
        return this.isValidOption(option) && this.getOptionLabel(option).toLocaleLowerCase(this.searchLocale()) === value.toLocaleLowerCase(this.searchLocale());
    }

    isInputClicked(event: MouseEvent): boolean {
        return event.target === this.inputEL()?.nativeElement;
    }

    isDropdownClicked(event: MouseEvent): boolean {
        return this.dropdownButton()?.nativeElement ? event.target === this.dropdownButton()!.nativeElement || this.dropdownButton()!.nativeElement.contains(event.target) : false;
    }

    equalityKey(): string | undefined {
        return this.optionValue() ? undefined : this.dataKey();
    }

    onContainerClick(event: MouseEvent) {
        if (this.$disabled() || this.loading() || this.isInputClicked(event) || this.isDropdownClicked(event)) {
            return;
        }

        if (!this.overlayViewChild() || !this.overlayViewChild()!.overlayViewChild?.nativeElement.contains(event.target)) {
            focus(this.inputEL()?.nativeElement);
        }
    }

    handleDropdownClick(event: MouseEvent) {
        let query: string | undefined = undefined;

        if (this.overlayVisible()) {
            this.hide(true);
        } else {
            focus(this.inputEL()?.nativeElement);
            query = this.inputEL()?.nativeElement?.value as string;

            if (this.dropdownMode() === 'blank') this.search(event, '', 'dropdown');
            else if (this.dropdownMode() === 'current') this.search(event, query, 'dropdown');
        }

        this.onDropdownClick.emit({ originalEvent: event, query });
    }

    onInput(event: Event) {
        if (this.typeahead()) {
            const _minLength = this.minQueryLength() || 1;

            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }

            let query = (event.target as HTMLInputElement).value;
            const maxLen = this.maxlength();
            if (maxLen != null) {
                query = query.split('').slice(0, maxLen).join('');
            }

            if (!this.multiple() && !this.forceSelection()) {
                this.updateModel(query);
            }

            if (query.length === 0 && !this.multiple()) {
                this.onClear.emit();

                setTimeout(() => {
                    this.hide();
                }, this.delay() / 2);
            } else {
                if (query.length >= _minLength) {
                    this.focusedOptionIndex.set(-1);

                    this.searchTimeout = setTimeout(() => {
                        this.search(event, query, 'input');
                    }, this.delay());
                } else {
                    this.hide();
                }
            }
        }
    }

    onInputChange(event: Event) {
        this.updateInputWithForceSelection(event);
    }

    onInputFocus(event: FocusEvent) {
        if (this.$disabled()) {
            // For ScreenReaders
            return;
        }

        if (!this.dirty && this.completeOnFocus()) {
            this.search(event, (event.target as HTMLInputElement).value, 'focus');
        }
        this.dirty = true;
        this.focused.set(true);
        const focusedOptionIndex = this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : this.overlayVisible() && this.autoOptionFocus() ? this.findFirstFocusedOptionIndex() : -1;
        this.focusedOptionIndex.set(focusedOptionIndex);
        this.overlayVisible() && this.scrollInView(this.focusedOptionIndex());
        this.onFocus.emit(event);
    }

    onMultipleContainerFocus(event: FocusEvent) {
        if (this.$disabled()) {
            // For ScreenReaders
            return;
        }

        this.focused.set(true);
    }

    onMultipleContainerBlur(event: FocusEvent) {
        this.focusedMultipleOptionIndex.set(-1);
        this.focused.set(false);
    }

    onMultipleContainerKeyDown(event: KeyboardEvent) {
        if (this.$disabled()) {
            event.preventDefault();

            return;
        }

        switch (event.code) {
            case 'ArrowLeft':
                this.onArrowLeftKeyOnMultiple(event);
                break;

            case 'ArrowRight':
                this.onArrowRightKeyOnMultiple(event);
                break;

            case 'Backspace':
                this.onBackspaceKeyOnMultiple(event);
                break;

            default:
                break;
        }
    }

    onInputBlur(event: FocusEvent) {
        this.dirty = false;
        this.focused.set(false);
        this.focusedOptionIndex.set(-1);

        if (this.addOnBlur() && this.multiple() && !this.typeahead()) {
            const inputValue = (this.multiInputEl()?.nativeElement?.value || (event.target as HTMLInputElement).value || '').trim();
            if (inputValue && !this.isSelected(inputValue)) {
                this.updateModel([...(this.modelValue() || []), inputValue]);
                this.onAdd.emit({ originalEvent: event, value: inputValue });
                if (this.multiInputEl()?.nativeElement) {
                    this.multiInputEl()!.nativeElement.value = '';
                } else {
                    (event.target as HTMLInputElement).value = '';
                }
            }
        }

        this.onModelTouched();
        this.onBlur.emit(event);
    }

    onInputPaste(event: ClipboardEvent) {
        if (this.separator() && this.multiple() && !this.typeahead()) {
            const pastedData = event.clipboardData?.getData('Text');
            if (pastedData) {
                const values = pastedData.split(this.separator()!);
                const newValues = [...(this.modelValue() || [])];

                values.forEach((value: string) => {
                    const trimmedValue = value.trim();
                    if (trimmedValue && !this.isSelected(trimmedValue)) {
                        newValues.push(trimmedValue);
                    }
                });

                if (newValues.length > (this.modelValue() || []).length) {
                    const addedValues = newValues.slice((this.modelValue() || []).length);
                    this.updateModel(newValues);
                    addedValues.forEach((addedValue) => {
                        this.onAdd.emit({ originalEvent: event, value: addedValue });
                    });
                    if (this.multiInputEl()?.nativeElement) {
                        this.multiInputEl()!.nativeElement.value = '';
                    } else {
                        (event.target as HTMLInputElement).value = '';
                    }
                    event.preventDefault();
                }
            }
        } else {
            this.onKeyDown(event as any);
        }
    }

    onInputKeyUp(event: KeyboardEvent) {
        this.onKeyUp.emit(event);
    }

    onKeyDown(event: KeyboardEvent) {
        if (this.$disabled()) {
            event.preventDefault();

            return;
        }

        // Emit keydown event for external handling
        this.onInputKeydown.emit(event);

        switch (event.code) {
            case 'ArrowDown':
                this.onArrowDownKey(event);
                break;

            case 'ArrowUp':
                this.onArrowUpKey(event);
                break;

            case 'ArrowLeft':
                this.onArrowLeftKey(event);
                break;

            case 'ArrowRight':
                this.onArrowRightKey(event);
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
            case 'NumpadEnter':
                this.onEnterKey(event);
                break;

            case 'Escape':
                this.onEscapeKey(event);
                break;

            case 'Tab':
                this.onTabKey(event);
                break;

            case 'Backspace':
                this.onBackspaceKey(event);
                break;

            case 'ShiftLeft':
            case 'ShiftRight':
                //NOOP
                break;

            default:
                this.handleSeparatorKey(event);
                break;
        }
    }

    handleSeparatorKey(event: KeyboardEvent) {
        const separator = this.separator();
        if (separator && this.multiple() && !this.typeahead()) {
            if (separator === event.key || (typeof separator === 'string' && event.key === separator) || (separator instanceof RegExp && event.key.match(separator))) {
                const inputValue = (this.multiInputEl()?.nativeElement?.value || (event.target as HTMLInputElement).value || '').trim();
                if (inputValue && !this.isSelected(inputValue)) {
                    this.updateModel([...(this.modelValue() || []), inputValue]);
                    this.onAdd.emit({ originalEvent: event, value: inputValue });
                    if (this.multiInputEl()?.nativeElement) {
                        this.multiInputEl()!.nativeElement.value = '';
                    } else {
                        (event.target as HTMLInputElement).value = '';
                    }
                    event.preventDefault();
                }
            }
        }
    }

    onArrowDownKey(event: KeyboardEvent) {
        if (!this.overlayVisible()) {
            return;
        }

        const optionIndex = this.focusedOptionIndex() !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex()) : this.findFirstFocusedOptionIndex();

        this.changeFocusedOptionIndex(event, optionIndex);

        event.preventDefault();
        event.stopPropagation();
    }

    onArrowUpKey(event: KeyboardEvent) {
        if (!this.overlayVisible()) {
            return;
        }

        if (event.altKey) {
            if (this.focusedOptionIndex() !== -1) {
                this.onOptionSelect(event, this.visibleOptions()[this.focusedOptionIndex()]);
            }

            this.overlayVisible() && this.hide();
            event.preventDefault();
        } else {
            const optionIndex = this.focusedOptionIndex() !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex()) : this.findLastFocusedOptionIndex();

            this.changeFocusedOptionIndex(event, optionIndex);

            event.preventDefault();
            event.stopPropagation();
        }
    }

    onArrowLeftKey(event: KeyboardEvent) {
        const target = event.currentTarget as HTMLInputElement;
        this.focusedOptionIndex.set(-1);
        if (this.multiple()) {
            if (isEmpty(target.value) && this.hasSelectedOption()) {
                focus(this.multiContainerEL()?.nativeElement);
                this.focusedMultipleOptionIndex.set(this.modelValue().length);
            } else {
                event.stopPropagation(); // To prevent onArrowLeftKeyOnMultiple method
            }
        }
    }

    onArrowRightKey(event: KeyboardEvent) {
        this.focusedOptionIndex.set(-1);

        this.multiple() && event.stopPropagation(); // To prevent onArrowRightKeyOnMultiple method
    }

    onHomeKey(event: KeyboardEvent) {
        const currentTarget = event.currentTarget as HTMLInputElement;
        const len = currentTarget.value.length;

        currentTarget.setSelectionRange(0, event.shiftKey ? len : 0);
        this.focusedOptionIndex.set(-1);

        event.preventDefault();
    }

    onEndKey(event: KeyboardEvent) {
        const currentTarget = event.currentTarget as HTMLInputElement;
        const len = currentTarget.value.length;

        currentTarget.setSelectionRange(event.shiftKey ? 0 : len, len);
        this.focusedOptionIndex.set(-1);

        event.preventDefault();
    }

    onPageDownKey(event: KeyboardEvent) {
        this.scrollInView(this.visibleOptions().length - 1);
        event.preventDefault();
    }

    onPageUpKey(event: KeyboardEvent) {
        this.scrollInView(0);
        event.preventDefault();
    }

    onEnterKey(event: KeyboardEvent) {
        if (!this.typeahead() && !this.forceSelection()) {
            if (this.multiple()) {
                const inputValue = (event.target as HTMLInputElement).value?.trim();
                if (inputValue && !this.isSelected(inputValue)) {
                    this.updateModel([...(this.modelValue() || []), inputValue]);
                    this.onAdd.emit({ originalEvent: event, value: inputValue });
                    this.inputEL()?.nativeElement && (this.inputEL()!.nativeElement.value = '');
                }
            }
        }
        if (!this.overlayVisible()) {
            return;
        } else {
            if (this.focusedOptionIndex() !== -1) {
                this.onOptionSelect(event, this.visibleOptions()[this.focusedOptionIndex()]);
            }

            this.hide();
        }

        event.preventDefault();
    }

    onEscapeKey(event: KeyboardEvent) {
        this.overlayVisible() && this.hide(true);
        event.preventDefault();
    }

    onTabKey(event: KeyboardEvent) {
        // If there's a focused option in the dropdown, select it
        if (this.focusedOptionIndex() !== -1) {
            this.onOptionSelect(event, this.visibleOptions()[this.focusedOptionIndex()]);
            return;
        }

        // Handle tab key behavior for multiple mode without typeahead
        if (this.multiple() && !this.typeahead()) {
            const inputValue = (this.multiInputEl()?.nativeElement?.value || this.inputEL()?.nativeElement?.value || '').trim();

            if (this.addOnTab()) {
                if (inputValue && !this.isSelected(inputValue)) {
                    // Add the value and keep focus
                    this.updateModel([...(this.modelValue() || []), inputValue]);
                    this.onAdd.emit({ originalEvent: event, value: inputValue });
                    if (this.multiInputEl()?.nativeElement) {
                        this.multiInputEl()!.nativeElement.value = '';
                    } else if (this.inputEL()?.nativeElement) {
                        this.inputEL()!.nativeElement.value = '';
                    }

                    this.updateInputValue();
                    event.preventDefault(); // Keep focus on the component
                    this.overlayVisible() && this.hide();
                    return;
                }
                // If no value or already selected, allow normal tab behavior (blur)
            }
            // If addOnTab is false or no value to add, allow normal tab behavior
            // which will trigger blur and potentially addOnBlur
        }

        this.overlayVisible() && this.hide();
    }

    onBackspaceKey(event: KeyboardEvent) {
        if (this.multiple()) {
            if (isNotEmpty(this.modelValue()) && !this.inputEL()?.nativeElement?.value) {
                const removedValue = this.modelValue()[this.modelValue().length - 1];
                const newValue = this.modelValue().slice(0, -1);
                this.updateModel(newValue);
                this.onUnselect.emit({ originalEvent: event, value: removedValue });
            }

            event.stopPropagation(); // To prevent onBackspaceKeyOnMultiple method
        }
    }

    onArrowLeftKeyOnMultiple(event: KeyboardEvent) {
        const optionIndex = this.focusedMultipleOptionIndex() < 1 ? 0 : this.focusedMultipleOptionIndex() - 1;
        this.focusedMultipleOptionIndex.set(optionIndex);
    }

    onArrowRightKeyOnMultiple(event: KeyboardEvent) {
        let optionIndex = this.focusedMultipleOptionIndex();
        optionIndex++;

        this.focusedMultipleOptionIndex.set(optionIndex);
        if (optionIndex > this.modelValue().length - 1) {
            this.focusedMultipleOptionIndex.set(-1);
            focus(this.inputEL()?.nativeElement);
        }
    }

    onBackspaceKeyOnMultiple(event: KeyboardEvent) {
        if (this.focusedMultipleOptionIndex() !== -1) {
            this.removeOption(event, this.focusedMultipleOptionIndex());
        }
    }

    onOptionSelect(event: Event | null, option: any, isHide = true) {
        if (this.multiple()) {
            this.inputEL()?.nativeElement && (this.inputEL()!.nativeElement.value = '');

            if (!this.isSelected(option)) {
                this.updateModel([...(this.modelValue() || []), option]);
            }
        } else {
            this.updateModel(option);
        }

        if (event) {
            this.onSelect.emit({ originalEvent: event, value: option });
        }

        isHide && this.hide(true);
    }

    onOptionMouseEnter(event: MouseEvent, index: number) {
        if (this.focusOnHover()) {
            this.changeFocusedOptionIndex(event, index);
        }
    }

    search(event: Event, query: string, source: string) {
        //allow empty string but not undefined or null
        if (query === undefined || query === null) {
            return;
        }

        //do not search blank values on input change
        if (source === 'input' && query.trim().length === 0) {
            return;
        }
        this.loading.set(true);
        this.completeMethod.emit({ originalEvent: event, query });
    }

    removeOption(event: Event, index: number) {
        event.stopPropagation();

        const removedOption = this.modelValue()[index];
        const value = (this.modelValue() as string[]).filter((_, i) => i !== index);

        this.updateModel(value);
        this.onUnselect.emit({ originalEvent: event, value: removedOption });
        focus(this.inputEL()?.nativeElement);
    }

    updateModel(options) {
        let value = null;
        if (options) {
            value = this.multiple() ? options.map((option) => this.getOptionValue(option)) : this.getOptionValue(options);
        }

        this.value = value;
        this.writeModelValue(options);
        this.onModelChange(value);
        this.updateInputValue();
    }

    updateInputValue() {
        const inputEl = this.inputEL();
        if (inputEl && inputEl.nativeElement) {
            if (!this.multiple()) {
                inputEl.nativeElement.value = this.inputValue();
            } else {
                inputEl.nativeElement.value = '';
            }
        }
    }

    updateInputWithForceSelection(event: Event | null) {
        const input = this.inputEL()?.nativeElement;

        if (!this.forceSelection() || this.overlayVisible() || !input?.value) {
            return;
        }

        const _minLength = this.minQueryLength();

        if (_minLength != null && input.value.length < _minLength) {
            return;
        }

        const matchedOption = this.visibleOptions()?.find((option) => this.isOptionMatched(option, input.value));

        if (!matchedOption) {
            input.value = '';
            if (!this.multiple()) {
                this.clear();
            }
            return;
        }

        if (matchedOption && !this.isSelected(matchedOption)) {
            this.onOptionSelect(event, matchedOption);
        }
    }

    autoUpdateModel() {
        if ((this.selectOnFocus() || this.autoHighlight()) && this.autoOptionFocus() && !this.hasSelectedOption()) {
            const focusedOptionIndex = this.findFirstFocusedOptionIndex();
            this.focusedOptionIndex.set(focusedOptionIndex);
            this.onOptionSelect(null, this.visibleOptions()[this.focusedOptionIndex()], false);
        }
    }

    scrollInView(index = -1) {
        const id = index !== -1 ? `${this.$id()}_${index}` : this.focusedOptionId;
        const itemsViewChild = this.itemsViewChild();
        if (itemsViewChild && itemsViewChild.nativeElement) {
            const element = findSingle(itemsViewChild.nativeElement, `li[id="${id}"]`);
            if (element) {
                element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
            } else if (!this.virtualScrollerDisabled) {
                setTimeout(() => {
                    this.virtualScroll() && this.scroller()?.scrollToIndex(index !== -1 ? index : this.focusedOptionIndex());
                }, 0);
            }
        }
    }

    changeFocusedOptionIndex(event: Event, index: number) {
        if (this.focusedOptionIndex() !== index) {
            this.focusedOptionIndex.set(index);
            this.scrollInView();

            if (this.selectOnFocus()) {
                this.onOptionSelect(event, this.visibleOptions()[index], false);
            }
        }
    }

    show(isFocus = false) {
        this.dirty = true;
        this.overlayVisible.set(true);
        const focusedOptionIndex = this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : this.autoOptionFocus() ? this.findFirstFocusedOptionIndex() : -1;
        this.focusedOptionIndex.set(focusedOptionIndex);
        isFocus && focus(this.inputEL()?.nativeElement);
        if (isFocus) {
            focus(this.inputEL()?.nativeElement);
        }
        this.onShow.emit();
    }

    hide(isFocus = false) {
        const _hide = () => {
            this.dirty = isFocus;
            this.overlayVisible.set(false);
            this.focusedOptionIndex.set(-1);
            isFocus && focus(this.inputEL()?.nativeElement);
            this.onHide.emit();
            this.updateInputWithForceSelection(null);
        };

        setTimeout(() => {
            _hide();
        }, 0); // For ScreenReaders
    }

    clear() {
        this.updateModel(null);
        this.inputEL()?.nativeElement && (this.inputEL()!.nativeElement.value = '');
        this.onClear.emit();
    }

    hasSelectedOption(): boolean {
        return isNotEmpty(this.modelValue());
    }

    getAriaPosInset(index: number): number {
        return (
            (this.optionGroupLabel()
                ? index -
                  this.visibleOptions()
                      .slice(0, index)
                      .filter((option) => this.isOptionGroup(option)).length
                : index) + 1
        );
    }

    getOptionLabel(option: any) {
        const optionLabel = this.optionLabel();
        return optionLabel ? resolveFieldData(option, optionLabel) : option && option.label != undefined ? option.label : option;
    }

    getOptionValue(option) {
        const optionValue = this.optionValue();
        return optionValue ? resolveFieldData(option, optionValue) : option && option.value != undefined ? option.value : option;
    }

    getOptionIndex(index: number, scrollerOptions: any): number {
        return this.virtualScrollerDisabled ? index : scrollerOptions && scrollerOptions.getItemOptions(index)['index'];
    }

    getOptionGroupLabel(optionGroup: any) {
        const optionGroupLabel = this.optionGroupLabel();
        return optionGroupLabel ? resolveFieldData(optionGroup, optionGroupLabel) : optionGroup && optionGroup.label != undefined ? optionGroup.label : optionGroup;
    }

    getOptionGroupChildren(optionGroup: any) {
        const optionGroupChildren = this.optionGroupChildren();
        return optionGroupChildren ? resolveFieldData(optionGroup, optionGroupChildren) : optionGroup.items;
    }

    getPTOptions(option: any, scrollerOptions: any, index: number, key: string) {
        return this.ptm(key, {
            context: {
                option,
                index: this.getOptionIndex(index, scrollerOptions),
                selected: this.isSelected(option),
                focused: this.focusedOptionIndex() === this.getOptionIndex(index, scrollerOptions),
                disabled: this.isOptionDisabled(option)
            }
        });
    }

    getSelectedItemContext(option: any) {
        return { $implicit: option };
    }

    getRemoveIconContext(index: number) {
        return { removeCallback: this.removeOption.bind(this), index, class: this.cx('chipIcon') };
    }

    getGroupContext(optionGroup: any) {
        return { $implicit: optionGroup };
    }

    getItemContext(option: any, index: number, scrollerOptions: any) {
        return {
            $implicit: option,
            index: scrollerOptions.getOptions ? scrollerOptions.getOptions(index) : index
        };
    }

    getLoaderContext(scrollerOptions: any) {
        return { options: scrollerOptions };
    }

    getBuildInItemsContext(items: any[], scrollerOptions: any) {
        return { $implicit: items, options: scrollerOptions };
    }

    shouldShowEmptyMessage(items: any[]): boolean {
        return !items || (items.length === 0 && this.showEmptyMessage());
    }

    getItemStyle(scrollerOptions: any): CSSProperties {
        return { height: scrollerOptions.itemSize + 'px' };
    }

    getChipLabel(option: any) {
        return !this.selectedItemTemplate() && this.getOptionLabel(option);
    }

    getMultipleOptionId(index: number): string {
        return this.$id() + '_multiple_option_' + index;
    }

    getOptionElementId(index: number, scrollerOptions: any): string {
        return this.$id() + '_' + this.getOptionIndex(index, scrollerOptions);
    }

    isOptionFocused(index: number, scrollerOptions: any): boolean {
        return this.focusedOptionIndex() === this.getOptionIndex(index, scrollerOptions);
    }

    getAriaControls(): string | null {
        return this.overlayVisible() ? this.$listId() : null;
    }

    getAriaActiveDescendant(): string | null | undefined {
        return this.focused() ? this.focusedOptionId : undefined;
    }

    getMultipleAriaActiveDescendant(): string | null | undefined {
        return this.focused() ? this.focusedMultipleOptionId : undefined;
    }

    getMultiplePlaceholder(): string | null | undefined {
        return !this.$filled() ? this.placeholder() : null;
    }

    getListContainerMaxHeight(): string {
        return this.virtualScroll() ? 'auto' : this.scrollHeight();
    }

    onOverlayBeforeEnter() {
        this.itemsWrapper = <any>findSingle(this.overlayViewChild()?.overlayViewChild?.nativeElement, this.virtualScroll() ? '[data-pc-name="virtualscroller"]' : '[data-pc-name="pcoverlay"]');

        if (this.virtualScroll()) {
            this.scroller()?.setContentEl(this.itemsViewChild()?.nativeElement);
            this.scroller()?.viewInit();
        }
        if (this.visibleOptions() && this.visibleOptions().length) {
            if (this.virtualScroll()) {
                const selectedIndex = this.modelValue() ? this.focusedOptionIndex() : -1;

                if (selectedIndex !== -1) {
                    this.scroller()?.scrollToIndex(selectedIndex);
                }
            } else {
                let selectedListItem = findSingle(this.itemsWrapper as HTMLElement, '[data-pc-section="option"][data-p-selected="true"]');

                if (selectedListItem) {
                    selectedListItem.scrollIntoView({ block: 'nearest', inline: 'center' });
                }
            }
        }
    }

    get containerDataP() {
        return this.cn({
            fluid: this.hasFluid
        });
    }

    get overlayDataP() {
        return this.cn({
            [`overlay-${this.$appendTo()}`]: true
        });
    }

    get inputMultipleDataP() {
        return this.cn({
            invalid: this.invalid(),
            disabled: this.$disabled(),
            focus: this.focused(),
            fluid: this.hasFluid,
            filled: this.$variant() === 'filled',
            empty: !this.$filled(),
            [this.size() as string]: this.size()
        });
    }

    /**
     * @override
     *
     * @see {@link BaseEditableHolder.writeControlValue}
     * Writes the value to the control.
     */
    writeControlValue(value: any, setModelValue: (value: any) => void): void {
        const options = this.multiple() ? this.visibleOptions().filter((option) => value?.some((val) => equals(val, option, this.equalityKey()))) : this.visibleOptions().find((option) => equals(value, option, this.equalityKey()));

        this.value = value;
        setModelValue(isEmpty(options) ? value : options);
        this.updateInputValue();
    }

    onDestroy() {
        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }
    }
}

@NgModule({
    imports: [AutoComplete, SharedModule],
    exports: [AutoComplete, SharedModule]
})
export class AutoCompleteModule {}
