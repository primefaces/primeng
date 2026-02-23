import { CDK_DRAG_CONFIG, CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    contentChild,
    effect,
    ElementRef,
    HostListener,
    InjectionToken,
    NgModule,
    output,
    TemplateRef,
    viewChild,
    ViewEncapsulation,
    booleanAttribute,
    computed,
    forwardRef,
    inject,
    input,
    numberAttribute,
    signal
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { equals, findLastIndex, findSingle, focus, getFirstFocusableElement, isEmpty, isFunction, isNotEmpty, isPrintableCharacter, resolveFieldData, uuid } from '@primeuix/utils';
import { FilterMatchModeType, FilterService, Footer, Header, ScrollerOptions, SharedModule } from 'primeng/api';
import { PARENT_INSTANCE } from 'primeng/basecomponent';
import { BaseEditableHolder } from 'primeng/baseeditableholder';
import { Bind, BindModule } from 'primeng/bind';
import { Checkbox } from 'primeng/checkbox';
import { IconField } from 'primeng/iconfield';
import { BlankIcon, CheckIcon, SearchIcon } from 'primeng/icons';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Ripple } from 'primeng/ripple';
import { Scroller, ScrollerLazyLoadEvent } from 'primeng/scroller';
import type { CSSProperties } from 'primeng/types/shared';
import type {
    ListBoxPassThrough,
    ListboxChangeEvent,
    ListboxCheckIconTemplateContext,
    ListboxCheckmarkTemplateContext,
    ListboxClickEvent,
    ListboxDoubleClickEvent,
    ListboxFilterEvent,
    ListboxFilterOptions,
    ListboxFilterTemplateContext,
    ListboxFooterTemplateContext,
    ListboxGroupTemplateContext,
    ListboxHeaderTemplateContext,
    ListboxItemTemplateContext,
    ListboxLoaderTemplateContext,
    ListboxSelectAllChangeEvent
} from 'primeng/types/listbox';
import { toSignal } from '@angular/core/rxjs-interop';
import { ListBoxStyle } from './style/listboxstyle';

const LISTBOX_INSTANCE = new InjectionToken<Listbox>('LISTBOX_INSTANCE');

export const LISTBOX_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Listbox),
    multi: true
};
/**
 * ListBox is used to select one or more values from a list of items.
 * @group Components
 */
@Component({
    selector: 'p-listbox, p-list-box',
    standalone: true,
    imports: [NgTemplateOutlet, Ripple, Scroller, InputIcon, SearchIcon, Checkbox, CheckIcon, IconField, InputText, BlankIcon, FormsModule, SharedModule, DragDropModule, BindModule],
    template: `
        <span
            #firstHiddenFocusableElement
            role="presentation"
            class="p-hidden-accessible p-hidden-focusable"
            [tabindex]="hiddenFocusableTabindex()"
            (focus)="onFirstHiddenFocus($event)"
            [attr.data-p-hidden-focusable]="true"
            [pBind]="ptm('hiddenFirstFocusableElement')"
        >
        </span>
        @if (hasHeader()) {
            <div [class]="cx('header')" [pBind]="ptm('header')">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate(); context: headerTemplateContext()"></ng-container>
            </div>
        }
        @if (hasCheckboxOrFilter()) {
            <div [class]="cx('header')" [pBind]="ptm('header')">
                @if (showCheckboxToggleAll()) {
                    <p-checkbox
                        #headerchkbox
                        (onChange)="onToggleAll($event)"
                        [class]="cx('optionCheckIcon')"
                        [ngModel]="allSelected()"
                        [disabled]="$disabled()"
                        [tabindex]="-1"
                        [variant]="checkboxVariant()"
                        [binary]="true"
                        [attr.aria-label]="toggleAllAriaLabel()"
                        [pt]="ptm('pcCheckbox')"
                        [unstyled]="unstyled()"
                    >
                        @if (checkIconTemplate()) {
                            <ng-template #icon>
                                <ng-container *ngTemplateOutlet="checkIconTemplate(); context: allSelectedContext()"></ng-container>
                            </ng-template>
                        }
                    </p-checkbox>
                }
                @if (filterTemplate()) {
                    <ng-container *ngTemplateOutlet="filterTemplate(); context: getFilterTemplateContext()"></ng-container>
                } @else {
                    @if (filter()) {
                        <p-iconfield [pt]="ptm('pcFilterContainer')" hostName="listbox" [unstyled]="unstyled()">
                            <input
                                #filterInput
                                pInputText
                                type="text"
                                [class]="cx('pcFilter')"
                                role="searchbox"
                                [value]="filterInputValue()"
                                [attr.disabled]="disabledAttr()"
                                [attr.aria-owns]="listId()"
                                [attr.aria-activedescendant]="focusedOptionId()"
                                [attr.placeholder]="filterPlaceHolder()"
                                [attr.aria-label]="ariaFilterLabel()"
                                [attr.tabindex]="filterTabindex()"
                                (input)="onFilterChange($event)"
                                (keydown)="onFilterKeyDown($event)"
                                (blur)="onFilterBlur($event)"
                                [pt]="ptm('pcFilter')"
                                [unstyled]="unstyled()"
                                hostName="listbox"
                            />
                            <p-inputicon [pt]="ptm('pcFilterIconContainer')" [unstyled]="unstyled()">
                                @if (showDefaultFilterIcon()) {
                                    <svg data-p-icon="search" [attr.aria-hidden]="true" [pBind]="ptm('filterIcon')" />
                                } @else {
                                    <span [attr.aria-hidden]="true">
                                        <ng-container *ngTemplateOutlet="filterIconTemplate()"></ng-container>
                                    </span>
                                }
                            </p-inputicon>
                        </p-iconfield>
                    }
                    <span role="status" [pBind]="ptm('hiddenFilterResult')" [attr.aria-live]="'polite'" class="p-hidden-accessible" [attr.data-p-hidden-accessible]="true">
                        {{ filterResultMessageText() }}
                    </span>
                }
            </div>
        }
        <div
            #container
            [class]="cn(cx('listContainer'), listStyleClass())"
            [style]="listContainerStyle()"
            cdkDropList
            [cdkDropListData]="cdkDropData()"
            (cdkDropListDropped)="drop($event)"
            (cdkDropListEntered)="onDragEntered()"
            (cdkDropListExited)="onDragExited()"
            [pBind]="ptm('listContainer')"
        >
            @if (showFilteredEmptyMessage()) {
                <div [class]="cx('emptyMessage')" [pBind]="ptm('emptyMessage')">
                    @if (showDefaultFilterEmptyMessage()) {
                        {{ emptyFilterMessageText() }}
                    } @else {
                        <ng-container *ngTemplateOutlet="emptyOrFilterTemplate()"></ng-container>
                    }
                </div>
            } @else if (showEmptyMessage()) {
                <div [class]="cx('emptyMessage')" [pBind]="ptm('emptyMessage')">
                    @if (!emptyTemplate()) {
                        {{ emptyMessage() }}
                    } @else {
                        <ng-container *ngTemplateOutlet="emptyTemplate()"></ng-container>
                    }
                </div>
            } @else {
                @if (virtualScroll()) {
                    <p-scroller
                        [pt]="ptm('virtualScroller')"
                        hostName="listbox"
                        #scroller
                        [items]="visibleOptions()"
                        [style]="scrollerStyle()"
                        [itemSize]="virtualScrollItemSize()"
                        [autoSize]="true"
                        [lazy]="lazy()"
                        [options]="virtualScrollOptions()"
                        (onLazyLoad)="onLazyLoad.emit($event)"
                        [tabindex]="scrollerTabIndex"
                    >
                        <ng-template #content let-items let-scrollerOptions="options">
                            <ng-container *ngTemplateOutlet="buildInItems; context: getBuildInItemsContext(items, scrollerOptions)"></ng-container>
                        </ng-template>
                        @if (loaderTemplate()) {
                            <ng-template #loader let-scrollerOptions="options">
                                <ng-container *ngTemplateOutlet="loaderTemplate(); context: getLoaderTemplateContext(scrollerOptions)"></ng-container>
                            </ng-template>
                        }
                    </p-scroller>
                } @else {
                    <ng-container *ngTemplateOutlet="buildInItems; context: buildInItemsContext()"></ng-container>
                }

                <ng-template #buildInItems let-items let-scrollerOptions="options">
                    <ul
                        #list
                        [id]="listId()"
                        [class]="cn(cx('list'), scrollerOptions.contentStyleClass)"
                        role="listbox"
                        [tabindex]="-1"
                        [attr.aria-multiselectable]="true"
                        [style]="scrollerOptions.contentStyle"
                        [attr.aria-activedescendant]="ariaActiveDescendant()"
                        [attr.aria-label]="ariaLabel()"
                        [attr.aria-disabled]="$disabled()"
                        (focus)="onListFocus($event)"
                        (blur)="onListBlur($event)"
                        (keydown)="onListKeyDown($event)"
                        [pBind]="ptm('list')"
                    >
                        @for (option of items; track getOptionValue(option); let i = $index) {
                            @if (isOptionGroup(option)) {
                                <li
                                    [attr.id]="getOptionId(i, scrollerOptions)"
                                    [class]="cx('optionGroup')"
                                    [pBind]="getPTOptions(option.optionGroup, scrollerOptions, i, 'optionGroup')"
                                    [style.height.px]="scrollerOptions.itemSize"
                                    role="option"
                                    cdkDrag
                                    [cdkDragData]="option"
                                    [cdkDragDisabled]="dragdropDisabled()"
                                    (cdkDragStarted)="isDragging.set(true)"
                                    (cdkDragEnded)="isDragging.set(false)"
                                >
                                    @if (showDefaultGroupLabel()) {
                                        <span>{{ getOptionGroupLabel(option.optionGroup) }}</span>
                                    }
                                    <ng-container *ngTemplateOutlet="groupTemplate(); context: getGroupTemplateContext(option.optionGroup)"></ng-container>
                                </li>
                            } @else {
                                <li
                                    pRipple
                                    [class]="cx('option', { option, i, scrollerOptions })"
                                    role="option"
                                    [attr.id]="getOptionId(i, scrollerOptions)"
                                    [style.height.px]="scrollerOptions.itemSize"
                                    [attr.aria-label]="getOptionLabel(option)"
                                    [attr.aria-selected]="isSelected(option)"
                                    [attr.aria-disabled]="isOptionDisabled(option)"
                                    [attr.aria-setsize]="ariaSetSize()"
                                    [attr.ariaPosInset]="getAriaPosInset(getOptionIndex(i, scrollerOptions))"
                                    [attr.data-p-selected]="isSelected(option)"
                                    [attr.data-p-focused]="isOptionFocused(i, scrollerOptions)"
                                    [attr.data-p-disabled]="isOptionDisabled(option)"
                                    [pBind]="getPTOptions(option, scrollerOptions, i, 'option')"
                                    (click)="onOptionSelect($event, option, getOptionIndex(i, scrollerOptions))"
                                    (dblclick)="onOptionDoubleClick($event, option)"
                                    (mousedown)="onOptionMouseDown($event, getOptionIndex(i, scrollerOptions))"
                                    (mouseenter)="onOptionMouseEnter($event, getOptionIndex(i, scrollerOptions))"
                                    (touchend)="onOptionTouchEnd()"
                                    cdkDrag
                                    [cdkDragData]="option"
                                    [cdkDragDisabled]="dragdropDisabled()"
                                    (cdkDragStarted)="isDragging.set(true)"
                                    (cdkDragEnded)="isDragging.set(false)"
                                >
                                    @if (showOptionCheckbox()) {
                                        <p-checkbox
                                            [class]="cx('optionCheckIcon')"
                                            [ngModel]="isSelected(option)"
                                            [readonly]="true"
                                            [disabled]="getOptionCheckboxDisabled(option)"
                                            [tabindex]="-1"
                                            [variant]="checkboxVariant()"
                                            [binary]="true"
                                            [pt]="ptm('pcCheckbox')"
                                            hostName="listbox"
                                            [unstyled]="unstyled()"
                                        >
                                            @if (checkIconTemplate()) {
                                                <ng-template #icon>
                                                    <ng-container *ngTemplateOutlet="checkIconTemplate(); context: getCheckIconContext(option)"></ng-container>
                                                </ng-template>
                                            }
                                        </p-checkbox>
                                    }
                                    @if (checkmark()) {
                                        @if (showDefaultCheckmark()) {
                                            @if (!isSelected(option)) {
                                                <svg data-p-icon="blank" [class]="cx('optionBlankIcon')" [pBind]="ptm('optionBlankIcon')" />
                                            } @else {
                                                <svg data-p-icon="check" [class]="cx('optionCheckIcon')" [pBind]="ptm('optionCheckIcon')" />
                                            }
                                        }
                                        <ng-container *ngTemplateOutlet="checkmarkTemplate(); context: getCheckmarkContext(option)"></ng-container>
                                    }
                                    @if (showDefaultItemLabel()) {
                                        <span>{{ getOptionLabel(option) }}</span>
                                    }
                                    <ng-container *ngTemplateOutlet="itemTemplate(); context: getItemTemplateContext(option, i, scrollerOptions)"></ng-container>
                                </li>
                            }
                        }
                    </ul>
                </ng-template>
            }
        </div>
        @if (hasFooter()) {
            <div>
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate(); context: footerTemplateContext()"></ng-container>
            </div>
        }
        @if (isEmpty()) {
            <span role="status" aria-live="polite" class="p-hidden-accessible" [pBind]="ptm('hiddenEmptyMessage')">
                {{ emptyMessage() }}
            </span>
        }
        <span role="status" aria-live="polite" class="p-hidden-accessible" [pBind]="ptm('hiddenSelectedMessage')">
            {{ selectedMessageText() }}
        </span>
        <span
            #lastHiddenFocusableElement
            role="presentation"
            class="p-hidden-accessible p-hidden-focusable"
            [tabindex]="hiddenFocusableTabindex()"
            (focus)="onLastHiddenFocus($event)"
            [attr.data-p-hidden-focusable]="true"
            [pBind]="ptm('hiddenLastFocusableEl')"
        >
        </span>
    `,
    providers: [
        LISTBOX_VALUE_ACCESSOR,
        ListBoxStyle,
        {
            provide: CDK_DRAG_CONFIG,
            useValue: {
                zIndex: 1200
            }
        },
        { provide: LISTBOX_INSTANCE, useExisting: Listbox },
        { provide: PARENT_INSTANCE, useExisting: Listbox }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.id]': '$id()',
        '[class]': "cx('root')",
        '[attr.data-p]': 'containerDataP'
    },
    hostDirectives: [Bind]
})
export class Listbox extends BaseEditableHolder<ListBoxPassThrough> {
    componentName = 'Listbox';

    hostName = input<string>('');

    bindDirectiveInstance = inject(Bind, { self: true });

    $pcListbox: Listbox | undefined = inject(LISTBOX_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    filterService = inject(FilterService);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

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
    autoOptionFocus = input(true, { transform: booleanAttribute });
    /**
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    ariaLabel = input<string>();
    /**
     * When enabled, the focused option is selected.
     * @group Props
     */
    selectOnFocus = input(undefined, { transform: booleanAttribute });
    /**
     * Locale to use in searching. The default locale is the host environment's current locale.
     * @group Props
     */
    searchLocale = input(undefined, { transform: booleanAttribute });
    /**
     * When enabled, the hovered option will be focused.
     * @group Props
     */
    focusOnHover = input(true, { transform: booleanAttribute });
    /**
     * Text to display when filtering.
     * @group Props
     */
    filterMessage = input<string>();
    /**
     * Fields used when filtering the options, defaults to optionLabel.
     * @group Props
     */
    filterFields = input<any[]>();
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
     * Height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.
     * @group Props
     */
    scrollHeight = input<string>('14rem');
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = input(0, { transform: numberAttribute });
    /**
     * When specified, allows selecting multiple values.
     * @group Props
     */
    multiple = input(undefined, { transform: booleanAttribute });
    /**
     * Inline style of the list element.
     * @group Props
     */
    listStyle = input<CSSProperties>();
    /**
     * Style class of the list element.
     * @group Props
     */
    listStyleClass = input<string>();
    /**
     * When present, it specifies that the element value cannot be changed.
     * @group Props
     */
    readonly = input(undefined, { transform: booleanAttribute });
    /**
     * When specified, allows selecting items with checkboxes.
     * @group Props
     */
    checkbox = input(false, { transform: booleanAttribute });
    /**
     * When specified, displays a filter input at header.
     * @group Props
     */
    filter = input(false, { transform: booleanAttribute });
    /**
     * When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.
     * @group Props
     */
    filterBy = input<string>();
    /**
     * Defines how the items are filtered.
     * @group Props
     */
    filterMatchMode = input<FilterMatchModeType>('contains');
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    filterLocale = input<string>();
    /**
     * Defines how multiple items can be selected, when true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.
     * @group Props
     */
    metaKeySelection = input(false, { transform: booleanAttribute });
    /**
     * A property to uniquely identify a value in options.
     * @group Props
     */
    dataKey = input<string>();
    /**
     * Whether header checkbox is shown in multiple mode.
     * @group Props
     */
    showToggleAll = input(true, { transform: booleanAttribute });
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
     * Name of the disabled field of an option or function to determine disabled state.
     * @group Props
     */
    optionDisabled = input<string | ((item: any) => boolean)>();
    /**
     * Defines a string that labels the filter input.
     * @group Props
     */
    ariaFilterLabel = input<string>();
    /**
     * Defines placeholder of the filter input.
     * @group Props
     */
    filterPlaceHolder = input<string>();
    /**
     * Text to display when filtering does not return any results.
     * @group Props
     */
    emptyFilterMessage = input<string>();
    /**
     * Text to display when there is no data. Defaults to global value in i18n translation configuration.
     * @group Props
     */
    emptyMessage = input<string>();
    /**
     * Whether to display options as grouped when nested options are provided.
     * @group Props
     */
    group = input(undefined, { transform: booleanAttribute });
    /**
     * An array of selectitems to display as the available options.
     * @group Props
     */
    options = input<any[]>();
    /**
     * When specified, filter displays with this value.
     * @group Props
     */
    filterValue = input<string>();
    /**
     * Whether all data is selected.
     * @group Props
     */
    selectAll = input<boolean>();
    /**
     * Whether to displays rows with alternating colors.
     * @group Props
     * @defaultValue false
     */
    striped = input(false, { transform: booleanAttribute });
    /**
     * Whether the selected option will be add highlight class.
     * @group Props
     * @defaultValue true
     */
    highlightOnSelect = input(true, { transform: booleanAttribute });
    /**
     * Whether the selected option will be shown with a check mark.
     * @group Props
     * @defaultValue false
     */
    checkmark = input(false, { transform: booleanAttribute });
    /**
     * Whether to enable dragdrop based reordering.
     * @group Props
     */
    dragdrop = input(false, { transform: booleanAttribute });
    /**
     * Array to use for CDK drop list data binding. When not provided, uses options array.
     * @group Props
     */
    dropListData = input<any[]>();
    /**
     * Spans 100% width of the container when enabled.
     * @defaultValue undefined
     * @group Props
     */
    fluid = input(undefined, { transform: booleanAttribute });
    /**
     * Callback to invoke on value change.
     * @param {ListboxChangeEvent} event - Custom change event.
     * @group Emits
     */
    onChange = output<ListboxChangeEvent>();
    /**
     * Callback to invoke when option is clicked.
     * @param {ListboxClickEvent} event - Custom click event.
     * @group Emits
     */
    onClick = output<ListboxClickEvent>();
    /**
     * Callback to invoke when option is double clicked.
     * @param {ListboxDoubleClickEvent} event - Custom double click event.
     * @group Emits
     */
    onDblClick = output<ListboxDoubleClickEvent>();
    /**
     * Callback to invoke when data is filtered.
     * @param {ListboxFilterEvent} event - Custom filter event.
     * @group Emits
     */
    onFilter = output<ListboxFilterEvent>();
    /**
     * Callback to invoke when component receives focus.
     * @param {FocusEvent} event - Focus event.
     * @group Emits
     */
    onFocus = output<FocusEvent>();
    /**
     * Callback to invoke when component loses focus.
     * @param {FocusEvent} event - Blur event.
     * @group Emits
     */
    onBlur = output<FocusEvent>();
    /**
     * Callback to invoke when all data is selected.
     * @param {ListboxSelectAllChangeEvent} event - Custom select event.
     * @group Emits
     */
    onSelectAllChange = output<ListboxSelectAllChangeEvent>();
    /**
     * Emits on lazy load.
     * @param {ScrollerLazyLoadEvent} event - Scroller lazy load event.
     * @group Emits
     */
    onLazyLoad = output<ScrollerLazyLoadEvent>();
    /**
     * Emits on item is dropped.
     * @param {CdkDragDrop<string[]>} event - Scroller lazy load event.
     * @group Emits
     */
    onDrop = output<CdkDragDrop<string[]>>();

    headerCheckboxViewChild = viewChild<ElementRef>('headerchkbox');

    filterViewChild = viewChild<ElementRef>('filterInput');

    lastHiddenFocusableElement = viewChild<ElementRef>('lastHiddenFocusableElement');

    firstHiddenFocusableElement = viewChild<ElementRef>('firstHiddenFocusableElement');

    scroller = viewChild<Scroller>('scroller');

    listViewChild = viewChild<ElementRef>('list');

    containerViewChild = viewChild<ElementRef>('container');

    headerFacet = contentChild(Header);

    footerFacet = contentChild(Footer);

    /**
     * Custom item template.
     * @param {ListboxItemTemplateContext} context - item context.
     * @see {@link ListboxItemTemplateContext}
     * @group Templates
     */
    itemTemplate = contentChild<TemplateRef<ListboxItemTemplateContext>>('item', { descendants: false });

    /**
     * Custom group template.
     * @param {ListboxGroupTemplateContext} context - group context.
     * @see {@link ListboxGroupTemplateContext}
     * @group Templates
     */
    groupTemplate = contentChild<TemplateRef<ListboxGroupTemplateContext>>('group', { descendants: false });

    /**
     * Custom header template.
     * @param {ListboxHeaderTemplateContext} context - header context.
     * @see {@link ListboxHeaderTemplateContext}
     * @group Templates
     */
    headerTemplate = contentChild<TemplateRef<ListboxHeaderTemplateContext>>('header', { descendants: false });

    /**
     * Custom filter template.
     * @param {ListboxFilterTemplateContext} context - filter context.
     * @see {@link ListboxFilterTemplateContext}
     * @group Templates
     */
    filterTemplate = contentChild<TemplateRef<ListboxFilterTemplateContext>>('filter', { descendants: false });

    /**
     * Custom footer template.
     * @param {ListboxFooterTemplateContext} context - footer context.
     * @see {@link ListboxFooterTemplateContext}
     * @group Templates
     */
    footerTemplate = contentChild<TemplateRef<ListboxFooterTemplateContext>>('footer', { descendants: false });

    /**
     * Custom empty filter message template.
     * @group Templates
     */
    emptyFilterTemplate = contentChild<TemplateRef<void>>('emptyfilter', { descendants: false });

    /**
     * Custom empty message template.
     * @group Templates
     */
    emptyTemplate = contentChild<TemplateRef<void>>('empty', { descendants: false });

    /**
     * Custom filter icon template.
     * @group Templates
     */
    filterIconTemplate = contentChild<TemplateRef<void>>('filtericon', { descendants: false });

    /**
     * Custom check icon template.
     * @param {ListboxCheckIconTemplateContext} context - check icon context.
     * @see {@link ListboxCheckIconTemplateContext}
     * @group Templates
     */
    checkIconTemplate = contentChild<TemplateRef<ListboxCheckIconTemplateContext>>('checkicon', { descendants: false });

    /**
     * Custom checkmark icon template.
     * @param {ListboxCheckmarkTemplateContext} context - checkmark context.
     * @see {@link ListboxCheckmarkTemplateContext}
     * @group Templates
     */
    checkmarkTemplate = contentChild<TemplateRef<ListboxCheckmarkTemplateContext>>('checkmark', { descendants: false });

    /**
     * Custom loader template.
     * @param {ListboxLoaderTemplateContext} context - loader context.
     * @see {@link ListboxLoaderTemplateContext}
     * @group Templates
     */
    loaderTemplate = contentChild<TemplateRef<ListboxLoaderTemplateContext>>('loader', { descendants: false });

    public _filterValue = signal<string | null | undefined>(null);

    public _filteredOptions: any[] | undefined | null;

    filterOptions: ListboxFilterOptions | undefined;

    public filtered: boolean | undefined | null;

    public value: any | undefined | null;

    public optionTouched: boolean | undefined | null;

    public focus: boolean | undefined | null;

    public headerCheckboxFocus: boolean | undefined | null;

    private translation = toSignal(this.config.translationObserver, { initialValue: this.config.translation });

    focused: boolean | undefined;

    scrollerTabIndex: string = '0';

    _componentStyle = inject(ListBoxStyle);

    _options = signal<any>(null);

    startRangeIndex = signal<number>(-1);

    focusedOptionIndex = signal<number>(-1);

    isDragging = signal<boolean>(false);

    searchValue: string | undefined;

    searchTimeout: any;

    private _internalId = uuid('pn_id_');

    $id = computed(() => this.id() || this._internalId);

    $tabindex = computed(() => this.tabindex() ?? 0);

    /**
     * Computed property for hidden focusable element tabindex
     */
    hiddenFocusableTabindex = computed(() => (!this.$disabled() ? this.$tabindex() : -1));

    /**
     * Computed property for header section visibility
     */
    hasHeader = computed(() => !!this.headerFacet() || !!this.headerTemplate());

    /**
     * Computed property for footer section visibility
     */
    hasFooter = computed(() => !!this.footerFacet() || !!this.footerTemplate());

    /**
     * Computed property for checkbox/filter header visibility
     */
    hasCheckboxOrFilter = computed(() => (this.checkbox() && this.multiple() && this.showToggleAll()) || this.filter());

    /**
     * Computed property for showing checkbox toggle all
     */
    showCheckboxToggleAll = computed(() => this.checkbox() && this.multiple() && this.showToggleAll());

    /**
     * Computed property for showing option checkbox
     */
    showOptionCheckbox = computed(() => this.checkbox() && this.multiple());

    /**
     * Computed property for showing filtered empty message
     */
    showFilteredEmptyMessage = computed(() => this.hasFilter() && this.isEmpty());

    /**
     * Computed property for showing empty message
     */
    showEmptyMessage = computed(() => !this.hasFilter() && this.isEmpty());

    /**
     * Computed property for aria-activedescendant
     */
    ariaActiveDescendant = computed(() => (this.focused ? this.focusedOptionId() : undefined));

    /**
     * Computed property for header template context
     */
    headerTemplateContext = computed(() => ({ $implicit: this.modelValue(), options: this.visibleOptions() }));

    /**
     * Computed property for footer template context
     */
    footerTemplateContext = computed(() => ({ $implicit: this.modelValue(), options: this.visibleOptions() }));

    /**
     * Computed property for filter input value
     */
    filterInputValue = computed(() => this._filterValue() || '');

    /**
     * Computed property for disabled attribute
     */
    disabledAttr = computed(() => (this.$disabled() ? '' : undefined));

    /**
     * Computed property for list id
     */
    listId = computed(() => `${this.$id()}_list`);

    /**
     * Computed property for scroller style
     */
    scrollerStyle = computed(() => ({ height: this.scrollHeight() }));

    /**
     * Computed property for showing default filter empty message
     */
    showDefaultFilterEmptyMessage = computed(() => !this.emptyFilterTemplate() && !this.emptyTemplate());

    /**
     * Computed property for empty or filter template
     */
    emptyOrFilterTemplate = computed(() => this.emptyFilterTemplate() || this.emptyTemplate());

    /**
     * Computed property for build in items context
     */
    buildInItemsContext = computed(() => ({ $implicit: this.visibleOptions(), options: {} }));

    /**
     * Computed property for dragdrop disabled
     */
    dragdropDisabled = computed(() => !this.dragdrop());

    /**
     * Computed property for check icon context
     */
    allSelectedContext = computed(() => ({ $implicit: this.allSelected() }));

    /**
     * Computed property for showing default checkmark
     */
    showDefaultCheckmark = computed(() => !this.checkmarkTemplate());

    /**
     * Computed property for showing default item label
     */
    showDefaultItemLabel = computed(() => !this.itemTemplate());

    /**
     * Computed property for showing default group label
     */
    showDefaultGroupLabel = computed(() => !this.groupTemplate());

    /**
     * Computed property for showing filter icon
     */
    showDefaultFilterIcon = computed(() => !this.filterIconTemplate());

    /**
     * Computed property for stable CDK drop list data reference
     */
    cdkDropData = computed(() => this.dropListData() || this._options());

    checkboxVariant = computed(() => (this.config.inputVariant() === 'filled' ? 'filled' : 'outlined'));

    listContainerStyle = computed(() => {
        const listStyle = this.listStyle();
        const maxHeight = this.virtualScroll() ? 'auto' : this.scrollHeight() || 'auto';
        return { ...listStyle, 'max-height': maxHeight };
    });

    focusedOptionId = computed(() => (this.focusedOptionIndex() !== -1 ? `${this.$id()}_${this.focusedOptionIndex()}` : null));

    filterTabindex = computed(() => (!this.$disabled() && !this.focused ? this.$tabindex() : -1));

    filterResultMessageText = computed(() => {
        return isNotEmpty(this.visibleOptions()) ? this.filterMessageText().replaceAll('{0}', String(this.visibleOptions().length)) : this.emptyFilterMessageText();
    });

    filterMessageText = computed(() => {
        const t = this.translation();
        return this.filterMessage() || t?.searchMessage || '';
    });

    searchMessageText = computed(() => {
        const t = this.translation();
        return this.searchMessage() || t?.searchMessage || '';
    });

    emptyFilterMessageText = computed(() => {
        const t = this.translation();
        return this.emptyFilterMessage() || t?.emptySearchMessage || t?.emptyFilterMessage || '';
    });

    selectionMessageText = computed(() => {
        const t = this.translation();
        return this.selectionMessage() || t?.selectionMessage || '';
    });

    emptySelectionMessageText = computed(() => {
        const t = this.translation();
        return this.emptySelectionMessage() || t?.emptySelectionMessage || '';
    });

    selectedMessageText = computed(() => {
        return this.hasSelectedOption() ? this.selectionMessageText().replaceAll('{0}', this.multiple() ? String(this.modelValue().length) : '1') : this.emptySelectionMessageText();
    });

    ariaSetSize = computed(() => this.visibleOptions().filter((option) => !this.isOptionGroup(option)).length);

    virtualScrollerDisabled = computed(() => !this.virtualScroll());

    searchFields = computed(() => this.filterBy()?.split(',') || this.filterFields() || [this.optionLabel()]);

    toggleAllAriaLabel = computed(() => {
        const t = this.translation();
        return t?.aria ? t.aria[this.allSelected() ? 'selectAll' : 'unselectAll'] : undefined;
    });

    @HostListener('focusout', ['$event'])
    onHostFocusOut(event: FocusEvent) {
        this.onFocusout(event);
    }

    visibleOptions = computed(() => {
        const options = this.group() ? this.flatOptions(this._options()) : this._options() || [];
        return this._filterValue() ? this.filterService.filter(options, this.searchFields(), this._filterValue(), this.filterMatchMode(), this.filterLocale()) : options;
    });

    constructor() {
        super();

        // Sync options input to internal signal
        effect(() => {
            const opts = this.options();
            if (opts !== undefined) {
                this._options.set(opts);
            }
        });

        // Sync filterValue input to internal signal
        effect(() => {
            const fv = this.filterValue();
            if (fv !== undefined) {
                this._filterValue.set(fv);
            }
        });
    }

    onInit() {
        this.autoUpdateModel();

        if (this.filterBy()) {
            this.filterOptions = {
                filter: (value) => this.onFilterChange(value),
                reset: () => this.resetFilter()
            };
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
        if (this.selectOnFocus() && this.autoOptionFocus() && !this.hasSelectedOption() && !this.multiple()) {
            const focusedOptionIndex = this.findFirstFocusedOptionIndex();
            this.focusedOptionIndex.set(focusedOptionIndex);
            this.onOptionSelect(null, this.visibleOptions()[this.focusedOptionIndex()]);
        }
    }
    /**
     * Updates the model value.
     * @group Method
     */
    public updateModel(value, event?) {
        this.value = value;
        this.writeModelValue(value);
        this.onModelChange(value);

        this.onChange.emit({ originalEvent: event, value: this.value });
    }

    removeOption(option) {
        return this.modelValue().filter((val) => !equals(val, this.getOptionValue(option), this.equalityKey() || ''));
    }

    onOptionSelect(event, option, index = -1) {
        if (this.$disabled() || this.isOptionDisabled(option) || this.readonly()) {
            return;
        }

        event && this.onClick.emit({ originalEvent: event, option, value: this.value });
        this.multiple() ? this.onOptionSelectMultiple(event, option) : this.onOptionSelectSingle(event, option);
        this.optionTouched = false;
        index !== -1 && this.focusedOptionIndex.set(index);
    }

    onOptionSelectMultiple(event, option) {
        let selected = this.isSelected(option);
        let value: any[] = [];
        let metaSelection = this.optionTouched ? false : this.metaKeySelection();

        if (metaSelection) {
            let metaKey = event.metaKey || event.ctrlKey;

            if (selected) {
                value = metaKey ? this.removeOption(option) : [this.getOptionValue(option)];
            } else {
                value = metaKey ? this.modelValue() || [] : [];
                value = [...(value || []), this.getOptionValue(option)];
            }
        } else {
            value = selected ? this.removeOption(option) : [...(this.modelValue() || []), this.getOptionValue(option)];
        }

        this.updateModel(value, event);
    }

    onOptionSelectSingle(event, option) {
        let selected = this.isSelected(option);
        let valueChanged = false;
        let value = null;
        let metaSelection = this.optionTouched ? false : this.metaKeySelection();

        if (metaSelection) {
            let metaKey = event.metaKey || event.ctrlKey;

            if (selected) {
                if (metaKey) {
                    value = null;
                    valueChanged = true;
                }
            } else {
                value = this.getOptionValue(option);
                valueChanged = true;
            }
        } else {
            value = selected ? null : this.getOptionValue(option);
            valueChanged = true;
        }

        if (valueChanged) {
            this.updateModel(value, event);
        }
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

    onToggleAll(event) {
        if (this.$disabled() || this.readonly()) {
            return;
        }
        focus(this.headerCheckboxViewChild()?.nativeElement);

        if (this.selectAll() !== null && this.selectAll() !== undefined) {
            this.onSelectAllChange.emit({
                originalEvent: event,
                checked: !this.allSelected()
            });
        } else {
            const value = this.allSelected()
                ? []
                : this.visibleOptions()
                      .filter((option) => this.isValidOption(option))
                      .map((option) => this.getOptionValue(option));

            this.updateModel(value, event);
            this.onChange.emit({ originalEvent: event, value: this.value });
        }
    }

    allSelected() {
        const selectAllValue = this.selectAll();
        return selectAllValue !== null && selectAllValue !== undefined
            ? selectAllValue
            : isNotEmpty(this.visibleOptions()) && this.visibleOptions().every((option) => this.isOptionGroup(option) || this.isOptionDisabled(option) || this.isSelected(option));
    }

    onOptionTouchEnd() {
        if (this.$disabled()) {
            return;
        }

        this.optionTouched = true;
    }

    onOptionMouseDown(event: MouseEvent, index: number) {
        this.changeFocusedOptionIndex(event, index);
    }

    onOptionMouseEnter(event: MouseEvent, index: number) {
        if (this.focusOnHover() && this.focused) {
            this.changeFocusedOptionIndex(event, index);
        }
    }

    onOptionDoubleClick(event: MouseEvent, option: any) {
        if (this.$disabled() || this.isOptionDisabled(option) || this.readonly()) {
            return;
        }

        this.onDblClick.emit({
            originalEvent: event,
            option: option,
            value: this.value
        });
    }

    onFirstHiddenFocus(event: FocusEvent) {
        focus(this.listViewChild()?.nativeElement);
        const firstFocusableEl = getFirstFocusableElement(this.el?.nativeElement, ':not([data-p-hidden-focusable="true"])');
        const lastEl = this.lastHiddenFocusableElement();
        const firstEl = this.firstHiddenFocusableElement();
        lastEl?.nativeElement && (lastEl.nativeElement.tabIndex = isEmpty(firstFocusableEl) ? -1 : undefined);
        firstEl?.nativeElement && (firstEl.nativeElement.tabIndex = -1);
    }

    onLastHiddenFocus(event: FocusEvent) {
        const relatedTarget = event.relatedTarget;
        const lastEl = this.lastHiddenFocusableElement();
        const firstEl = this.firstHiddenFocusableElement();

        if (relatedTarget === this.listViewChild()?.nativeElement) {
            const firstFocusableEl = <any>getFirstFocusableElement(this.el?.nativeElement, ':not([data-p-hidden-focusable="true"])');

            focus(firstFocusableEl);
            firstEl?.nativeElement && (firstEl.nativeElement.tabIndex = undefined);
        } else {
            focus(firstEl?.nativeElement);
        }
        lastEl?.nativeElement && (lastEl.nativeElement.tabIndex = -1);
    }

    onFocusout(event: FocusEvent) {
        const lastEl = this.lastHiddenFocusableElement();
        const firstEl = this.firstHiddenFocusableElement();
        if (!this.el.nativeElement.contains(event.relatedTarget) && lastEl && firstEl) {
            firstEl.nativeElement.tabIndex = lastEl.nativeElement.tabIndex = undefined;
            this.scrollerTabIndex = '0';
        }
    }

    onListFocus(event: FocusEvent) {
        this.focused = true;
        const focusedOptionIndex = this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : this.autoOptionFocus() ? this.findFirstFocusedOptionIndex() : this.findSelectedOptionIndex();
        this.focusedOptionIndex.set(focusedOptionIndex);
        this.scrollInView(focusedOptionIndex);
        this.onFocus.emit(event);

        this.scrollerTabIndex = '-1';
    }

    onListBlur(event: FocusEvent) {
        this.focused = false;
        this.focusedOptionIndex.set(-1);
        this.startRangeIndex.set(-1);
        this.searchValue = '';
        this.onBlur.emit(event);
    }

    onHeaderCheckboxKeyDown(event) {
        if (this.$disabled()) {
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
            case 'Tab':
                this.onHeaderCheckboxTabKeyDown(event);
                break;
            default:
                break;
        }
    }

    onHeaderCheckboxTabKeyDown(event) {
        focus(this.listViewChild()?.nativeElement);
        event.preventDefault();
    }

    onFilterChange(event: Event) {
        let value: string = (event.target as HTMLInputElement).value?.trim();
        this._filterValue.set(value);
        this.focusedOptionIndex.set(-1);
        this.startRangeIndex.set(-1);
        this.onFilter.emit({ originalEvent: event, filter: this._filterValue() });

        !this.virtualScrollerDisabled() && this.scroller()?.scrollToIndex(0);
    }

    onFilterBlur(event: FocusEvent) {
        this.focusedOptionIndex.set(-1);
        this.startRangeIndex.set(-1);
    }

    onListKeyDown(event: KeyboardEvent) {
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
            case 'NumpadEnter':
                this.onSpaceKey(event);
                break;

            case 'Tab':
                //NOOP
                break;

            case 'ShiftLeft':
            case 'ShiftRight':
                this.onShiftKey();
                break;

            default:
                if (this.multiple() && event.code === 'KeyA' && metaKey) {
                    const value = this.visibleOptions()
                        .filter((option) => this.isValidOption(option))
                        .map((option) => this.getOptionValue(option));

                    this.updateModel(value, event);

                    event.preventDefault();
                    break;
                }

                if (!metaKey && isPrintableCharacter(event.key)) {
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
                this.onArrowUpKey(event);
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

            case 'ShiftLeft':
            case 'ShiftRight':
                this.onShiftKey();
                break;

            default:
                break;
        }
    }

    onArrowDownKey(event: KeyboardEvent) {
        const optionIndex = this.focusedOptionIndex() !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex()) : this.findFirstFocusedOptionIndex();

        if (this.multiple() && event.shiftKey) {
            this.onOptionSelectRange(event, this.startRangeIndex(), optionIndex);
        }

        this.changeFocusedOptionIndex(event, optionIndex);
        event.preventDefault();
    }

    onArrowUpKey(event: KeyboardEvent) {
        const optionIndex = this.focusedOptionIndex() !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex()) : this.findLastFocusedOptionIndex();

        if (this.multiple() && event.shiftKey) {
            this.onOptionSelectRange(event, optionIndex, this.startRangeIndex());
        }

        this.changeFocusedOptionIndex(event, optionIndex);
        event.preventDefault();
    }

    onArrowLeftKey(event: KeyboardEvent, pressedInInputText = false) {
        pressedInInputText && this.focusedOptionIndex.set(-1);
    }

    onHomeKey(event: KeyboardEvent, pressedInInputText: boolean = false) {
        if (pressedInInputText) {
            (event.currentTarget as HTMLInputElement).setSelectionRange(0, 0);
            this.focusedOptionIndex.set(-1);
        } else {
            let metaKey = event.metaKey || event.ctrlKey;
            let optionIndex = this.findFirstOptionIndex();

            if (this.multiple() && event.shiftKey && metaKey) {
                this.onOptionSelectRange(event, optionIndex, this.startRangeIndex());
            }

            this.changeFocusedOptionIndex(event, optionIndex);
        }

        event.preventDefault();
    }

    onEndKey(event: KeyboardEvent, pressedInInputText: boolean = false) {
        if (pressedInInputText) {
            const target = event.currentTarget as HTMLInputElement;
            const len = target.value.length;

            target.setSelectionRange(len, len);
            this.focusedOptionIndex.set(-1);
        } else {
            let metaKey = event.metaKey || event.ctrlKey;
            let optionIndex = this.findLastOptionIndex();

            if (this.multiple() && event.shiftKey && metaKey) {
                this.onOptionSelectRange(event, this.startRangeIndex(), optionIndex);
            }

            this.changeFocusedOptionIndex(event, optionIndex);
        }

        event.preventDefault();
    }

    onPageDownKey(event: KeyboardEvent) {
        this.scrollInView(0);
        event.preventDefault();
    }

    onPageUpKey(event: KeyboardEvent) {
        this.scrollInView(this.visibleOptions().length - 1);
        event.preventDefault();
    }

    onEnterKey(event) {
        if (this.focusedOptionIndex() !== -1) {
            if (this.multiple() && event.shiftKey) this.onOptionSelectRange(event, this.focusedOptionIndex());
            else this.onOptionSelect(event, this.visibleOptions()[this.focusedOptionIndex()]);
        }

        event.preventDefault();
    }

    onSpaceKey(event: KeyboardEvent) {
        this.onEnterKey(event);
    }

    onShiftKey() {
        const focusedOptionIndex = this.focusedOptionIndex();
        this.startRangeIndex.set(focusedOptionIndex);
    }

    getOptionGroupChildren(optionGroup) {
        return this.optionGroupChildren() ? resolveFieldData(optionGroup, this.optionGroupChildren()) : optionGroup.items;
    }

    getOptionGroupLabel(optionGroup: any) {
        return this.optionGroupLabel() ? resolveFieldData(optionGroup, this.optionGroupLabel()) : optionGroup && optionGroup.label !== undefined ? optionGroup.label : optionGroup;
    }

    getOptionLabel(option) {
        return this.optionLabel() ? resolveFieldData(option, this.optionLabel()) : option.label != undefined ? option.label : option;
    }

    getOptionIndex(index, scrollerOptions) {
        return this.virtualScrollerDisabled() ? index : scrollerOptions && scrollerOptions.getItemOptions(index)['index'];
    }

    getOptionValue(option: any) {
        return this.optionValue() ? resolveFieldData(option, this.optionValue()) : !this.optionLabel() && option && option.value !== undefined ? option.value : option;
    }

    getAriaPosInset(index: number) {
        return (
            (this.optionGroupLabel()
                ? index -
                  this.visibleOptions()
                      .slice(0, index)
                      .filter((option) => this.isOptionGroup(option)).length
                : index) + 1
        );
    }

    getPTOptions(option: any, itemOptions: any, index: number, key: string) {
        return this.ptm(key, {
            context: {
                selected: this.isSelected(option),
                focused: this.focusedOptionIndex() === this.getOptionIndex(index, itemOptions),
                disabled: this.isOptionDisabled(option)
            }
        });
    }

    getOptionId(index: number, scrollerOptions: any) {
        return `${this.$id()}_${this.getOptionIndex(index, scrollerOptions)}`;
    }

    getOptionCheckboxDisabled(option: any) {
        return this.$disabled() || this.isOptionDisabled(option);
    }

    getCheckIconContext(option: any) {
        return { $implicit: this.isSelected(option) };
    }

    getCheckmarkContext(option: any) {
        return { implicit: this.isSelected(option) };
    }

    getGroupTemplateContext(optionGroup: any) {
        return { $implicit: optionGroup };
    }

    getItemTemplateContext(option: any, index: number, scrollerOptions: any) {
        return {
            $implicit: option,
            index: this.getOptionIndex(index, scrollerOptions),
            selected: this.isSelected(option),
            disabled: this.isOptionDisabled(option)
        };
    }

    getFilterTemplateContext() {
        return { options: this.filterOptions };
    }

    getBuildInItemsContext(items: any[], scrollerOptions: any) {
        return { $implicit: items, options: scrollerOptions };
    }

    getLoaderTemplateContext(scrollerOptions: any) {
        return { options: scrollerOptions };
    }

    isOptionFocused(index: number, scrollerOptions: any) {
        return this.focusedOptionIndex() === this.getOptionIndex(index, scrollerOptions);
    }

    hasSelectedOption() {
        return isNotEmpty(this.modelValue());
    }

    isOptionGroup(option) {
        return this.optionGroupLabel() && option.optionGroup && option.group;
    }

    changeFocusedOptionIndex(event, index) {
        if (this.focusedOptionIndex() !== index) {
            this.focusedOptionIndex.set(index);
            this.scrollInView();

            if (this.selectOnFocus() && !this.multiple()) {
                this.onOptionSelect(event, this.visibleOptions()[index]);
            }
        }
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

    isOptionMatched(option) {
        return this.isValidOption(option) && this.getOptionLabel(option)?.toLocaleLowerCase(this.filterLocale()).startsWith(this.searchValue?.toLocaleLowerCase(this.filterLocale()));
    }

    scrollInView(index = -1) {
        const id = index !== -1 ? `${this.$id()}_${index}` : this.focusedOptionId();
        const element = findSingle(this.listViewChild()?.nativeElement, `li[id="${id}"]`);

        if (element) {
            element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        } else if (!this.virtualScrollerDisabled()) {
            this.virtualScroll() && this.scroller()?.scrollToIndex(index !== -1 ? index : this.focusedOptionIndex());
        }
    }

    findFirstOptionIndex() {
        return this.visibleOptions().findIndex((option) => this.isValidOption(option));
    }

    findLastOptionIndex() {
        return findLastIndex(this.visibleOptions(), (option) => this.isValidOption(option));
    }

    findFirstFocusedOptionIndex() {
        const selectedIndex = this.findFirstSelectedOptionIndex();

        return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
    }

    findLastFocusedOptionIndex() {
        const selectedIndex = this.findLastSelectedOptionIndex();

        return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
    }

    findLastSelectedOptionIndex() {
        return this.hasSelectedOption() ? findLastIndex(this.visibleOptions(), (option) => this.isValidSelectedOption(option)) : -1;
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

    findNextSelectedOptionIndex(index) {
        const matchedOptionIndex =
            this.hasSelectedOption() && index < this.visibleOptions().length - 1
                ? this.visibleOptions()
                      .slice(index + 1)
                      .findIndex((option) => this.isValidSelectedOption(option))
                : -1;

        return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : -1;
    }

    findPrevSelectedOptionIndex(index) {
        const matchedOptionIndex = this.hasSelectedOption() && index > 0 ? findLastIndex(this.visibleOptions().slice(0, index), (option) => this.isValidSelectedOption(option)) : -1;

        return matchedOptionIndex > -1 ? matchedOptionIndex : -1;
    }

    findFirstSelectedOptionIndex() {
        return this.hasSelectedOption() ? this.visibleOptions().findIndex((option) => this.isValidSelectedOption(option)) : -1;
    }

    findPrevOptionIndex(index) {
        const matchedOptionIndex = index > 0 ? findLastIndex(this.visibleOptions().slice(0, index), (option) => this.isValidOption(option)) : -1;

        return matchedOptionIndex > -1 ? matchedOptionIndex : index;
    }

    findSelectedOptionIndex() {
        if (this.$filled()) {
            if (this.multiple()) {
                for (let index = this.modelValue().length - 1; index >= 0; index--) {
                    const value = this.modelValue()[index];
                    const matchedOptionIndex = this.visibleOptions().findIndex((option) => this.isValidSelectedOption(option) && this.isEquals(value, this.getOptionValue(option)));

                    if (matchedOptionIndex > -1) return matchedOptionIndex;
                }
            } else {
                return this.visibleOptions().findIndex((option) => this.isValidSelectedOption(option));
            }
        }

        return -1;
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

    equalityKey() {
        return this.optionValue() ? null : this.dataKey();
    }

    isValidSelectedOption(option) {
        return this.isValidOption(option) && this.isSelected(option);
    }

    isOptionDisabled(option: any) {
        const optionDisabledValue = this.optionDisabled();
        if (isFunction(optionDisabledValue)) {
            return optionDisabledValue(option);
        }
        return optionDisabledValue ? resolveFieldData(option, optionDisabledValue) : false;
    }

    isEquals(value1, value2) {
        return equals(value1, value2, this.equalityKey() || '');
    }

    isSelected(option) {
        const optionValue = this.getOptionValue(option);

        if (this.multiple()) return (this.modelValue() || []).some((value) => this.isEquals(value, optionValue));
        else return this.isEquals(this.modelValue(), optionValue);
    }

    isValidOption(option) {
        return option && !(this.isOptionDisabled(option) || this.isOptionGroup(option));
    }

    isEmpty() {
        return !this._options()?.length || !this.visibleOptions()?.length;
    }

    hasFilter() {
        return this._filterValue() && (this._filterValue()?.trim().length || 0) > 0;
    }

    resetFilter() {
        const filterEl = this.filterViewChild();
        if (filterEl && filterEl.nativeElement) {
            filterEl.nativeElement.value = '';
        }

        this._filterValue.set(null);
    }

    onDragEntered() {
        this.isDragging.set(true);
        this.el.nativeElement.setAttribute('p-listbox-dragging', 'true');
    }

    onDragExited() {
        this.isDragging.set(false);
        this.el.nativeElement.setAttribute('p-listbox-dragging', 'false');
    }

    drop(event: CdkDragDrop<string[]>) {
        this.isDragging.set(false);
        if (event) {
            // If dragdrop is enabled and same container (reordering), automatically handle reordering
            if (this.dragdrop() && event.previousContainer === event.container) {
                const currentOptions = [...this._options()];

                if (this._filterValue()) {
                    const visible = this.visibleOptions();
                    const fromItem = visible[event.previousIndex];
                    const toItem = visible[event.currentIndex];
                    const realFrom = currentOptions.indexOf(fromItem);
                    const realTo = currentOptions.indexOf(toItem);
                    if (realFrom !== -1 && realTo !== -1) {
                        moveItemInArray(currentOptions, realFrom, realTo);
                    }
                } else {
                    moveItemInArray(currentOptions, event.previousIndex, event.currentIndex);
                }

                this._options.set(currentOptions);
                this.changeFocusedOptionIndex(event, event.currentIndex);

                // Update model value if needed for selection preservation
                if (this.modelValue()) {
                    this.writeModelValue(this.modelValue());
                    this.onModelChange(this.modelValue());
                }
            }

            // Always emit the event for custom handling
            this.onDrop.emit(event);
        }
    }

    get containerDataP() {
        return this.cn({
            invalid: this.invalid(),
            disabled: this.$disabled()
        });
    }

    /**
     * @override
     *
     * @see {@link BaseEditableHolder.writeControlValue}
     * Writes the value to the control.
     */
    writeControlValue(value: any, setModelValue: (value: any) => void): void {
        this.value = value;
        setModelValue(this.value);
    }
}

@NgModule({
    imports: [Listbox, SharedModule],
    exports: [Listbox, SharedModule]
})
export class ListboxModule {}
