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
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MotionOptions } from '@primeuix/motion';
import { equals, findLastIndex, findSingle, focus, isEmpty, isNotEmpty, isPrintableCharacter, resolveFieldData, uuid } from '@primeuix/utils';
import { OverlayOptions, OverlayService, SharedModule, TranslationKeys } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { PARENT_INSTANCE } from 'primeng/basecomponent';
import { BaseEditableHolder } from 'primeng/baseeditableholder';
import { Bind } from 'primeng/bind';
import { Fluid } from 'primeng/fluid';
import { ChevronDownIcon, TimesIcon } from 'primeng/icons';
import { Overlay } from 'primeng/overlay';
import type { AppendTo, CSSProperties, InputSize, InputVariant } from 'primeng/types/shared';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import type {
    CascadeSelectBeforeHideEvent,
    CascadeSelectBeforeShowEvent,
    CascadeSelectChangeEvent,
    CascadeSelectFocusedOptionInfo,
    CascadeSelectOptionChangeEvent,
    CascadeSelectOptionClickEvent,
    CascadeSelectOptionMouseEvent,
    CascadeSelectOptionTemplateContext,
    CascadeSelectPassThrough,
    CascadeSelectProcessedOption,
    CascadeSelectShowEvent,
    CascadeSelectValueTemplateContext
} from 'primeng/types/cascadeselect';
import { CascadeSelectSub } from './cascadeselect-sub';
import { CASCADESELECT_INSTANCE } from './cascadeselect-token';
import { CascadeSelectStyle } from './style/cascadeselectstyle';

export const CASCADESELECT_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CascadeSelect),
    multi: true
};

/**
 * CascadeSelect is a form component to select a value from a nested structure of options.
 * @group Components
 */
@Component({
    selector: 'p-cascadeselect, p-cascade-select',
    standalone: true,
    imports: [NgTemplateOutlet, Overlay, AutoFocus, CascadeSelectSub, ChevronDownIcon, TimesIcon, SharedModule, Bind],
    template: `
        <div class="p-hidden-accessible" [pBind]="ptm('hiddenInputWrapper')">
            <input
                #focusInput
                readonly
                type="text"
                role="combobox"
                [attr.name]="name()"
                [attr.required]="requiredAttr()"
                [attr.disabled]="disabledAttr()"
                [attr.placeholder]="placeholder()"
                [attr.tabindex]="$tabindex()"
                [attr.id]="inputId()"
                [attr.aria-label]="ariaLabel()"
                [attr.aria-labelledby]="ariaLabelledBy()"
                [attr.aria-haspopup]="'tree'"
                [attr.aria-expanded]="ariaExpanded()"
                [attr.aria-controls]="ariaControls()"
                [attr.aria-activedescendant]="ariaActiveDescendant()"
                (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)"
                (keydown)="onInputKeyDown($event)"
                [pAutoFocus]="autofocus()"
                [pBind]="ptm('hiddenInput')"
            />
        </div>
        <span [class]="cx('label')" [pBind]="ptm('label')">
            @if (valueTemplate()) {
                <ng-container *ngTemplateOutlet="valueTemplate(); context: valueTemplateContext()"></ng-container>
            } @else {
                {{ label() }}
            }
        </span>

        @if (showClearIcon()) {
            @if (!clearIconTemplate()) {
                <svg data-p-icon="times" [class]="cx('clearIcon')" (click)="clear($event)" [pBind]="ptm('clearIcon')" [attr.aria-hidden]="true" />
            } @else {
                <span [class]="cx('clearIcon')" (click)="clear($event)" [pBind]="ptm('clearIcon')" [attr.aria-hidden]="true">
                    <ng-container *ngTemplateOutlet="clearIconTemplate()"></ng-container>
                </span>
            }
        }

        <div [class]="cx('dropdown')" role="button" aria-haspopup="listbox" [attr.aria-expanded]="ariaExpanded()" [pBind]="ptm('dropdown')" [attr.aria-hidden]="true">
            @if (loading()) {
                @if (loadingIconTemplate()) {
                    <ng-container *ngTemplateOutlet="loadingIconTemplate()"></ng-container>
                } @else {
                    <span [class]="loadingIconClass()" aria-hidden="true" [pBind]="ptm('loadingIcon')"></span>
                }
            } @else {
                @if (!triggerIconTemplate()) {
                    <svg data-p-icon="chevron-down" [class]="cx('dropdownIcon')" [pBind]="ptm('dropdownIcon')" />
                } @else {
                    <span [class]="cx('dropdownIcon')" [pBind]="ptm('dropdownIcon')">
                        <ng-container *ngTemplateOutlet="triggerIconTemplate()"></ng-container>
                    </span>
                }
            }
        </div>
        <span role="status" aria-live="polite" class="p-hidden-accessible" [pBind]="ptm('hiddenSearchResult')">
            {{ searchResultMessageText }}
        </span>
        <p-overlay
            #overlay
            [hostAttrSelector]="$attrSelector"
            [(visible)]="overlayVisible"
            [options]="overlayOptions()"
            [target]="'@parent'"
            [appendTo]="$appendTo()"
            [unstyled]="unstyled()"
            [pt]="ptm('pcOverlay')"
            [motionOptions]="motionOptions()"
            (onAfterLeave)="onOverlayAfterLeave()"
            (onBeforeShow)="onBeforeShow.emit($event)"
            (onShow)="show($event)"
            (onBeforeHide)="onBeforeHide.emit($event)"
            (onHide)="hide($event)"
        >
            <ng-template #content>
                <div #panel [class]="cn(cx('overlay'), panelStyleClass())" [style]="panelStyle()" [pBind]="ptm('overlay')">
                    @if (headerTemplate()) {
                        <ng-container *ngTemplateOutlet="headerTemplate()"></ng-container>
                    }
                    <div [class]="cx('listContainer')" [pBind]="ptm('listContainer')">
                        <ul
                            pCascadeSelectSub
                            [class]="cx('list')"
                            [options]="processedOptions"
                            [selectId]="$id()"
                            [focusedOptionId]="focusedOptionIdValue()"
                            [activeOptionPath]="activeOptionPath()"
                            [optionLabel]="optionLabel()"
                            [optionValue]="optionValue()"
                            [level]="0"
                            [optionTemplate]="optionTemplate()"
                            [groupicon]="groupIconTemplate()"
                            [optionGroupLabel]="optionGroupLabel()"
                            [optionGroupChildren]="optionGroupChildren()"
                            [optionDisabled]="optionDisabled()"
                            [root]="true"
                            (onChange)="onOptionClick($event)"
                            (onFocusChange)="onOptionMouseMove($event)"
                            (onFocusEnterChange)="onOptionMouseEnter($event)"
                            [dirty]="dirty()"
                            [attr.role]="'tree'"
                            [attr.aria-orientation]="'horizontal'"
                            [pBind]="ptm('list')"
                            [attr.aria-label]="listLabel"
                            [pt]="pt"
                            [unstyled]="unstyled()"
                        ></ul>
                    </div>
                    <span role="status" aria-live="polite" class="p-hidden-accessible" [pBind]="ptm('selectedMessageText')">
                        {{ selectedMessageText }}
                    </span>
                    @if (footerTemplate()) {
                        <ng-container *ngTemplateOutlet="footerTemplate()"></ng-container>
                    }
                </div>
            </ng-template>
        </p-overlay>
    `,
    providers: [CASCADESELECT_VALUE_ACCESSOR, CascadeSelectStyle, { provide: PARENT_INSTANCE, useExisting: CascadeSelect }, { provide: CASCADESELECT_INSTANCE, useExisting: CascadeSelect }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "cx('root')",
        '[style]': "sx('root')"
    },
    hostDirectives: [Bind]
})
export class CascadeSelect extends BaseEditableHolder<CascadeSelectPassThrough> {
    componentName = 'CascadeSelect';

    $pcCascadeSelect: CascadeSelect | undefined = inject(CASCADESELECT_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    private _internalId = uuid('pn_id_');

    /**
     * Unique identifier of the component
     * @group Props
     */
    id = input<string>();

    $id = computed(() => this.id() || this._internalId);
    /**
     * Text to display when the search is active. Defaults to global value in i18n translation configuration.
     * @group Props
     * @defaultValue '{0} results are available'
     */
    searchMessage = input<string>();
    /**
     * Text to display when there is no data. Defaults to global value in i18n translation configuration.
     * @group Props
     */
    emptyMessage = input<string>();
    /**
     * Text to be displayed in hidden accessible field when options are selected. Defaults to global value in i18n translation configuration.
     * @group Props
     * @defaultValue '{0} items selected'
     */
    selectionMessage = input<string>();
    /**
     * Text to display when filtering does not return any results. Defaults to value from PrimeNG locale configuration.
     * @group Props
     * @defaultValue 'No available options'
     */
    emptySearchMessage = input<string>();
    /**
     * Text to display when filtering does not return any results. Defaults to global value in i18n translation configuration.
     * @group Props
     * @defaultValue 'No selected item'
     */
    emptySelectionMessage = input<string>();
    /**
     * Locale to use in searching. The default locale is the host environment's current locale.
     * @group Props
     */
    searchLocale = input<string>();
    /**
     * Name of the disabled field of an option.
     * @group Props
     */
    optionDisabled = input<string>();
    /**
     * Fields used when filtering the options, defaults to optionLabel.
     * @group Props
     */
    focusOnHover = input(true, { transform: booleanAttribute });
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
     * An array of selectitems to display as the available options.
     * @group Props
     */
    options = input<string[] | string>();
    /**
     * Property name or getter function to use as the label of an option.
     * @group Props
     */
    optionLabel = input<string>();
    /**
     * Property name or getter function to use as the value of an option, defaults to the option itself when not defined.
     * @group Props
     */
    optionValue = input<string>();
    /**
     * Property name or getter function to use as the label of an option group.
     * @group Props
     */
    optionGroupLabel = input<string>();
    /**
     * Property name or getter function to retrieve the items of a group.
     * @group Props
     */
    optionGroupChildren = input<string[] | string | null>();
    /**
     * Default text to display when no option is selected.
     * @group Props
     */
    placeholder = input<string>();
    /**
     * Selected value of the component.
     * @group Props
     */
    value = signal<unknown>(undefined);
    /**
     * A property to uniquely identify an option.
     * @group Props
     */
    dataKey = input<string>();
    /**
     * Identifier of the underlying input element.
     * @group Props
     */
    inputId = input<string>();
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = input(0, { transform: numberAttribute });
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy = input<string>();
    /**
     * Label of the input for accessibility.
     * @group Props
     */
    inputLabel = input<string>();
    /**
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    ariaLabel = input<string>();
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @group Props
     */
    showClear = input(false, { transform: booleanAttribute });
    /**
     * Style class of the overlay panel.
     * @group Props
     */
    panelStyleClass = input<string>();
    /**
     * Inline style of the overlay panel.
     * @group Props
     */
    panelStyle = input<CSSProperties>();
    /**
     * Whether to use overlay API feature. The properties of overlay API can be used like an object in it.
     * @group Props
     */
    overlayOptions = input<OverlayOptions>();
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus = input(false, { transform: booleanAttribute });
    /**
     * Whether the dropdown is in loading state.
     * @group Props
     */
    loading = input(false, { transform: booleanAttribute });
    /**
     * Icon to display in loading state.
     * @group Props
     */
    loadingIcon = input<string>();
    /**
     * The breakpoint to define the maximum width boundary.
     * @group Props
     */
    breakpoint = input('960px');
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
     * Callback to invoke on value change.
     * @param {CascadeSelectChangeEvent} event - Custom change event.
     * @group Emits
     */
    onChange = output<CascadeSelectChangeEvent>();
    /**
     * Callback to invoke when a group changes.
     * @group Emits
     */
    onGroupChange = output<{ originalEvent: Event; value?: unknown; isFocus?: boolean }>();
    /**
     * Callback to invoke when the overlay is shown.
     * @param {CascadeSelectShowEvent} event - Custom overlay show event.
     * @group Emits
     */
    onShow = output<CascadeSelectShowEvent | undefined>();
    /**
     * Callback to invoke when the overlay is hidden.
     * @group Emits
     */
    onHide = output<any>();
    /**
     * Callback to invoke when the clear token is clicked.
     * @group Emits
     */
    onClear = output<MouseEvent | undefined>();
    /**
     * Callback to invoke before overlay is shown.
     * @param {CascadeSelectBeforeShowEvent} event - Custom overlay show event.
     * @group Emits
     */
    onBeforeShow = output<CascadeSelectBeforeShowEvent>();
    /**
     * Callback to invoke before overlay is hidden.
     * @param {CascadeSelectBeforeHideEvent} event - Custom overlay hide event.
     * @group Emits
     */
    onBeforeHide = output<CascadeSelectBeforeHideEvent>();
    /**
     * Callback to invoke when input receives focus.
     * @param {FocusEvent} event - Focus event.
     * @group Emits
     */
    onFocus = output<FocusEvent>();
    /**
     * Callback to invoke when input loses focus.
     * @param {FocusEvent} event - Focus event.
     * @group Emits
     */
    onBlur = output<FocusEvent>();

    focusInputViewChild = viewChild<ElementRef>('focusInput');

    panelViewChild = viewChild<ElementRef>('panel');

    overlayViewChild = viewChild<Overlay>('overlay');

    /**
     * Custom value template.
     * @group Templates
     */
    valueTemplate = contentChild<TemplateRef<CascadeSelectValueTemplateContext>>('value', { descendants: false });

    /**
     * Custom option template.
     * @group Templates
     */
    optionTemplate = contentChild<TemplateRef<CascadeSelectOptionTemplateContext>>('option', { descendants: false });

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
     * Custom trigger icon template.
     * @group Templates
     */
    triggerIconTemplate = contentChild<TemplateRef<void>>('triggericon', { descendants: false });

    /**
     * Custom loading icon template.
     * @group Templates
     */
    loadingIconTemplate = contentChild<TemplateRef<void>>('loadingicon', { descendants: false });

    /**
     * Custom option group icon template.
     * @group Templates
     */
    groupIconTemplate = contentChild<TemplateRef<void>>('optiongroupicon', { descendants: false });

    /**
     * Custom clear icon template.
     * @group Templates
     */
    clearIconTemplate = contentChild<TemplateRef<void>>('clearicon', { descendants: false });

    selectionPath: CascadeSelectProcessedOption[] | null = null;

    focused = signal(false);

    overlayVisible = signal(false);

    clicked = signal(false);

    dirty = signal(false);

    searchValue: string | undefined;

    searchTimeout: ReturnType<typeof setTimeout> | undefined;

    focusedOptionInfo = signal<CascadeSelectFocusedOptionInfo>({ index: -1, level: 0, parentKey: '' });

    activeOptionPath = signal<CascadeSelectProcessedOption[]>([]);

    processedOptions: CascadeSelectProcessedOption[] = [];

    _componentStyle = inject(CascadeSelectStyle);

    initialized = signal(false);

    $variant = computed(() => this.variant() || this.config.inputVariant());

    $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo());

    valueTemplateContext = computed(() => ({ $implicit: this.value(), placeholder: this.placeholder() }));

    $tabindex = computed(() => (!this.$disabled() ? this.tabindex() : -1));

    requiredAttr = computed(() => (this.required() ? '' : undefined));

    disabledAttr = computed(() => (this.$disabled() ? '' : undefined));

    ariaExpanded = computed(() => this.overlayVisible() ?? false);

    ariaControls = computed(() => (this.overlayVisible() ? this.$id() + '_tree' : null));

    ariaActiveDescendant = computed(() => (this.focused() ? this.focusedOptionId : undefined));

    showClearIcon = computed(() => this.$filled() && !this.$disabled() && this.showClear());

    focusedOptionIdValue = computed(() => (this.focused() ? this.focusedOptionId : undefined));

    loadingIconClass = computed(() => {
        const icon = this.loadingIcon();
        if (icon) {
            return this.cn(this.cx('loadingIcon'), icon + 'pi-spin');
        }
        return this.cn(this.cx('loadingIcon'), icon + ' pi pi-spinner pi-spin');
    });

    pcFluid: Fluid | null = inject(Fluid, { optional: true, host: true, skipSelf: true });

    get hasFluid() {
        return this.fluid() ?? !!this.pcFluid;
    }

    @HostListener('mousedown', ['$event'])
    onHostClick(event: MouseEvent) {
        this.onContainerClick(event);
    }

    get listLabel(): string {
        return this.translate(TranslationKeys.ARIA, 'listLabel');
    }

    get focusedOptionId() {
        return this.focusedOptionInfo().index !== -1 ? `${this.$id()}${isNotEmpty(this.focusedOptionInfo().parentKey) ? '_' + this.focusedOptionInfo().parentKey : ''}_${this.focusedOptionInfo().index}` : null;
    }

    get searchResultMessageText() {
        return isNotEmpty(this.visibleOptions()) ? this.searchMessageText.replaceAll('{0}', String(this.visibleOptions().length)) : this.emptySearchMessageText;
    }

    get searchMessageText() {
        return this.searchMessage() || this.config.translation.searchMessage || '';
    }

    get emptySearchMessageText() {
        return this.emptySearchMessage() || this.config.translation.emptySearchMessage || '';
    }

    get emptyMessageText() {
        return this.emptyMessage() || this.config.translation.emptyMessage || '';
    }

    get selectionMessageText() {
        return this.selectionMessage() || this.config.translation.selectionMessage || '';
    }

    get emptySelectionMessageText() {
        return this.emptySelectionMessage() || this.config.translation.emptySelectionMessage || '';
    }

    get selectedMessageText() {
        return this.hasSelectedOption() ? this.selectionMessageText.replaceAll('{0}', '1') : this.emptySelectionMessageText;
    }

    visibleOptions = computed(() => {
        const processedOption = this.activeOptionPath().find((p) => p.key === this.focusedOptionInfo().parentKey);

        return processedOption ? (processedOption.children ?? []) : this.processedOptions;
    });

    label = computed(() => {
        const label = this.placeholder() || 'p-emptylabel';

        if (this.hasSelectedOption()) {
            const activeOptionPath = this.findOptionPathByValue(this.modelValue(), null);
            const processedOption = isNotEmpty(activeOptionPath) ? activeOptionPath[activeOptionPath.length - 1] : null;

            return processedOption ? this.getOptionLabel(processedOption.option) : label;
        }
        return label;
    });

    hasSelectedOption() {
        return isNotEmpty(this.modelValue());
    }

    createProcessedOptions(options: unknown[] | undefined, level = 0, parent: CascadeSelectProcessedOption | Record<string, unknown> = {}, parentKey = ''): CascadeSelectProcessedOption[] {
        const processedOptions: CascadeSelectProcessedOption[] = [];

        options &&
            options.forEach((option, index) => {
                const key = (parentKey !== '' ? parentKey + '_' : '') + index;
                const newOption: CascadeSelectProcessedOption = {
                    option,
                    index,
                    level,
                    key,
                    parent,
                    parentKey
                };

                newOption.children = this.createProcessedOptions(this.getOptionGroupChildren(option, level), level + 1, newOption, key);
                processedOptions.push(newOption);
            });

        return processedOptions;
    }

    onInputFocus(event: FocusEvent) {
        if (this.$disabled()) {
            // For screenreaders
            return;
        }

        this.focused.set(true);
        this.onFocus.emit(event);
    }

    onInputBlur(event: FocusEvent) {
        this.focused.set(false);
        this.focusedOptionInfo.set({ index: -1, level: 0, parentKey: '' });
        this.searchValue = '';
        this.onModelTouched();
        this.onBlur.emit(event);
    }

    onInputKeyDown(event: KeyboardEvent) {
        if (this.$disabled() || this.loading()) {
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

            case 'Space':
                this.onSpaceKey(event);
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

            case 'PageDown':
            case 'PageUp':
            case 'ShiftLeft':
            case 'ShiftRight':
                //NOOP
                break;

            default:
                if (!metaKey && isPrintableCharacter(event.key)) {
                    !this.overlayVisible() && this.show();
                    this.searchOptions(event, event.key);
                }

                break;
        }

        this.clicked.set(false);
    }

    onArrowDownKey(event: KeyboardEvent) {
        if (!this.overlayVisible()) {
            this.show();
        } else {
            const optionIndex = this.focusedOptionInfo().index !== -1 ? this.findNextOptionIndex(this.focusedOptionInfo().index) : this.clicked() ? this.findFirstOptionIndex() : this.findFirstFocusedOptionIndex();

            this.changeFocusedOptionIndex(event, optionIndex, true);
        }

        event.preventDefault();
    }

    onArrowUpKey(event: KeyboardEvent) {
        if (event.altKey) {
            if (this.focusedOptionInfo().index !== -1) {
                const processedOption = this.visibleOptions()[this.focusedOptionInfo().index];
                const grouped = this.isProccessedOptionGroup(processedOption);

                !grouped && this.onOptionChange({ originalEvent: event, processedOption });
            }

            this.overlayVisible() && this.hide();
            event.preventDefault();
        } else {
            const optionIndex = this.focusedOptionInfo().index !== -1 ? this.findPrevOptionIndex(this.focusedOptionInfo().index) : this.clicked() ? this.findLastOptionIndex() : this.findLastFocusedOptionIndex();

            this.changeFocusedOptionIndex(event, optionIndex, true);

            !this.overlayVisible() && this.show();
            event.preventDefault();
        }
    }

    onArrowLeftKey(event: KeyboardEvent) {
        if (this.overlayVisible()) {
            const processedOption = this.visibleOptions()[this.focusedOptionInfo().index];
            const parentOption = this.activeOptionPath().find((p) => p.key === processedOption.parentKey);
            const matched = this.focusedOptionInfo().parentKey === '' || (parentOption && parentOption.key === this.focusedOptionInfo().parentKey);
            const root = isEmpty(processedOption.parent);

            if (matched) {
                const activeOptionPath = this.activeOptionPath().filter((p) => p.parentKey !== this.focusedOptionInfo().parentKey);
                this.activeOptionPath.set(activeOptionPath);
            }

            if (!root) {
                this.focusedOptionInfo.set({ index: -1, parentKey: parentOption ? parentOption.parentKey : '' });
                this.searchValue = '';
                this.onArrowDownKey(event);
            }

            event.preventDefault();
        }
    }

    onArrowRightKey(event: KeyboardEvent) {
        if (this.overlayVisible()) {
            const processedOption = this.visibleOptions()[this.focusedOptionInfo().index];
            const grouped = this.isProccessedOptionGroup(processedOption);

            if (grouped) {
                const matched = this.activeOptionPath().some((p) => processedOption.key === p.key);

                if (matched) {
                    this.focusedOptionInfo.set({ index: -1, parentKey: processedOption.key });
                    this.searchValue = '';
                    this.onArrowDownKey(event);
                } else {
                    this.onOptionChange({ originalEvent: event, processedOption });
                }
            }

            event.preventDefault();
        }
    }

    onHomeKey(event: KeyboardEvent) {
        this.changeFocusedOptionIndex(event, this.findFirstOptionIndex());

        !this.overlayVisible() && this.show();
        event.preventDefault();
    }

    onEndKey(event: KeyboardEvent) {
        this.changeFocusedOptionIndex(event, this.findLastOptionIndex());

        !this.overlayVisible() && this.show();
        event.preventDefault();
    }

    onEnterKey(event: KeyboardEvent) {
        if (!this.overlayVisible()) {
            this.focusedOptionInfo.set({ ...this.focusedOptionInfo(), index: -1 }); // reset
            this.onArrowDownKey(event);
        } else {
            if (this.focusedOptionInfo().index !== -1) {
                const processedOption = this.visibleOptions()[this.focusedOptionInfo().index];
                const grouped = this.isProccessedOptionGroup(processedOption);

                this.onOptionClick({ originalEvent: event, processedOption });
                !grouped && this.hide();
            }
        }

        event.preventDefault();
    }

    onSpaceKey(event: KeyboardEvent) {
        this.onEnterKey(event);
    }

    onEscapeKey(event: KeyboardEvent) {
        this.overlayVisible() && this.hide(event, true);
        event.preventDefault();
    }

    onTabKey(event: KeyboardEvent) {
        if (this.focusedOptionInfo().index !== -1) {
            const processedOption = this.visibleOptions()[this.focusedOptionInfo().index];
            const grouped = this.isProccessedOptionGroup(processedOption);

            !grouped && this.onOptionChange({ originalEvent: event, processedOption });
        }

        this.overlayVisible() && this.hide();
    }

    onBackspaceKey(event: KeyboardEvent) {
        if (isNotEmpty(this.modelValue()) && this.showClear()) {
            this.clear();
        }

        event.stopPropagation();
    }

    equalityKey() {
        return this.optionValue() ? undefined : this.dataKey();
    }

    updateModel(value: unknown, event?: Event) {
        this.value.set(value);
        this.onModelChange(value);
        this.writeModelValue(value);

        if (this.initialized()) {
            this.onChange.emit({
                originalEvent: event,
                value: value
            });
        }
    }

    autoUpdateModel() {
        if (this.selectOnFocus() && this.autoOptionFocus() && !this.hasSelectedOption()) {
            this.focusedOptionInfo().index = this.findFirstFocusedOptionIndex();
            this.onOptionChange({
                originalEvent: null,
                processedOption: this.visibleOptions()[this.focusedOptionInfo().index],
                isHide: false
            });

            !this.overlayVisible() && this.focusedOptionInfo.set({ index: -1, level: 0, parentKey: '' });
        }
    }

    scrollInView(index = -1) {
        const id = index !== -1 ? `${this.$id()}_${index}` : this.focusedOptionId;
        const element = findSingle(this.panelViewChild()?.nativeElement, `li[id="${id}"]`);

        if (element) {
            element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'start' });
        }
    }

    changeFocusedOptionIndex(event: Event, index: number, preventSelection?: boolean) {
        const focusedOptionInfo = this.focusedOptionInfo();

        if (focusedOptionInfo.index !== index) {
            this.focusedOptionInfo.set({ ...focusedOptionInfo, index });
            this.scrollInView();

            if (this.focusOnHover()) {
                this.onOptionClick({ originalEvent: event, processedOption: this.visibleOptions()[index], isHide: false, preventSelection });
            }

            if (this.selectOnFocus()) {
                this.onOptionChange({ originalEvent: event, processedOption: this.visibleOptions()[index], isHide: false });
            }
        }
    }
    matchMediaListener: VoidListener;

    onOptionSelect(event: { originalEvent: Event; value?: unknown; isHide?: boolean }) {
        const { originalEvent, value, isHide } = event;
        const newValue = this.getOptionValue(value);

        const activeOptionPath = this.activeOptionPath();
        activeOptionPath.forEach((p) => (p.selected = true));

        this.activeOptionPath.set(activeOptionPath);
        this.updateModel(newValue, originalEvent);
        isHide && this.hide(event, true);
    }

    onOptionGroupSelect(event: { originalEvent: Event; value?: unknown; isFocus?: boolean }) {
        this.dirty.set(true);
        this.onGroupChange.emit(event);
    }

    onContainerClick(event: MouseEvent) {
        if (this.$disabled() || this.loading()) {
            return;
        }

        if (!this.overlayViewChild()?.el?.nativeElement?.contains(event.target)) {
            if (this.overlayVisible()) {
                this.hide();
            } else {
                this.show();
            }

            this.focusInputViewChild()?.nativeElement.focus();
        }

        this.clicked.set(true);
    }

    isOptionMatched(processedOption: CascadeSelectProcessedOption) {
        return this.isValidOption(processedOption) && this.getProccessedOptionLabel(processedOption).toLocaleLowerCase(this.searchLocale()).startsWith(this.searchValue?.toLocaleLowerCase(this.searchLocale()));
    }

    isOptionDisabled(option: unknown) {
        const optionDisabled = this.optionDisabled();
        return optionDisabled ? resolveFieldData(option, optionDisabled) : false;
    }

    isValidOption(processedOption: CascadeSelectProcessedOption) {
        return !!processedOption && !this.isOptionDisabled(processedOption.option);
    }

    isValidSelectedOption(processedOption: CascadeSelectProcessedOption) {
        return this.isValidOption(processedOption) && this.isSelected(processedOption);
    }

    isSelected(processedOption: CascadeSelectProcessedOption) {
        return this.activeOptionPath().some((p) => p.key === processedOption.key);
    }

    findOptionPathByValue(value: unknown, processedOptions?: CascadeSelectProcessedOption[] | null, level = 0) {
        processedOptions = processedOptions || (level === 0 ? this.processedOptions : null);

        if (!processedOptions) return null;
        if (isEmpty(value)) return [];

        for (let i = 0; i < processedOptions.length; i++) {
            const processedOption = processedOptions[i];

            if (equals(value, this.getOptionValue(processedOption.option), this.equalityKey())) {
                return [processedOption];
            }

            const matchedOptions = this.findOptionPathByValue(value, processedOption.children, level + 1);

            if (matchedOptions) {
                matchedOptions.unshift(processedOption);

                return matchedOptions;
            }
        }
    }

    findFirstOptionIndex() {
        return this.visibleOptions().findIndex((processedOption) => this.isValidOption(processedOption));
    }

    findLastOptionIndex() {
        return findLastIndex(this.visibleOptions(), (processedOption) => this.isValidOption(processedOption));
    }

    findNextOptionIndex(index: number) {
        const matchedOptionIndex =
            index < this.visibleOptions().length - 1
                ? this.visibleOptions()
                      .slice(index + 1)
                      .findIndex((processedOption) => this.isValidOption(processedOption))
                : -1;

        return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
    }

    findPrevOptionIndex(index: number) {
        const matchedOptionIndex = index > 0 ? findLastIndex(this.visibleOptions().slice(0, index), (processedOption) => this.isValidOption(processedOption)) : -1;

        return matchedOptionIndex > -1 ? matchedOptionIndex : index;
    }

    findSelectedOptionIndex() {
        return this.visibleOptions().findIndex((processedOption) => this.isValidSelectedOption(processedOption));
    }

    findFirstFocusedOptionIndex() {
        const selectedIndex = this.findSelectedOptionIndex();

        return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
    }

    findLastFocusedOptionIndex() {
        const selectedIndex = this.findSelectedOptionIndex();

        return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
    }

    searchOptions(event: KeyboardEvent, char: string) {
        this.searchValue = (this.searchValue || '') + char;

        let optionIndex = -1;
        let matched = false;
        const focusedOptionInfo = this.focusedOptionInfo();

        if (focusedOptionInfo.index !== -1) {
            optionIndex = this.visibleOptions()
                .slice(focusedOptionInfo.index)
                .findIndex((processedOption) => this.isOptionMatched(processedOption));
            optionIndex =
                optionIndex === -1
                    ? this.visibleOptions()
                          .slice(0, focusedOptionInfo.index)
                          .findIndex((processedOption) => this.isOptionMatched(processedOption))
                    : optionIndex + focusedOptionInfo.index;
        } else {
            optionIndex = this.visibleOptions().findIndex((processedOption) => this.isOptionMatched(processedOption));
        }

        if (optionIndex !== -1) {
            matched = true;
        }

        if (optionIndex === -1 && focusedOptionInfo.index === -1) {
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
            this.searchTimeout = undefined;
        }, 500);

        return matched;
    }

    hide(event?, isFocus = false) {
        setTimeout(() => {
            this.overlayVisible.set(false);
            this.clicked.set(false);
            this.activeOptionPath.set([]);
            this.focusedOptionInfo.set({ index: -1, level: 0, parentKey: '' });

            isFocus && focus(this.focusInputViewChild()?.nativeElement);
            this.onHide.emit(event);
        }, 0); // For ScreenReaders
    }

    show(event?: CascadeSelectShowEvent, isFocus = false) {
        this.onShow.emit(event);
        this.overlayVisible.set(true);
        const activeOptionPath = this.hasSelectedOption() ? this.findOptionPathByValue(this.modelValue()) : this.activeOptionPath();
        this.activeOptionPath.set(activeOptionPath);
        let focusedOptionInfo: CascadeSelectFocusedOptionInfo;

        if (this.hasSelectedOption() && isNotEmpty(this.activeOptionPath())) {
            const processedOption = this.activeOptionPath()[this.activeOptionPath().length - 1];

            focusedOptionInfo = {
                index: processedOption.index,
                level: processedOption.level,
                parentKey: processedOption.parentKey
            };
        } else {
            focusedOptionInfo = { index: this.autoOptionFocus() ? this.findFirstFocusedOptionIndex() : this.findSelectedOptionIndex(), level: 0, parentKey: '' };
        }

        this.focusedOptionInfo.set(focusedOptionInfo);

        isFocus && focus(this.focusInputViewChild()?.nativeElement);
    }

    clear(event?: MouseEvent) {
        if (isNotEmpty(this.modelValue()) && this.showClear()) {
            this.updateModel(null);
            this.focusedOptionInfo.set({ index: -1, level: 0, parentKey: '' });
            this.activeOptionPath.set([]);
            this.onClear.emit(event);
        }

        event && event.stopPropagation();
    }

    getOptionLabel(option: unknown) {
        const optionLabel = this.optionLabel();
        return optionLabel ? resolveFieldData(option, optionLabel) : option;
    }

    getOptionValue(option: unknown) {
        const optionValue = this.optionValue();
        return optionValue ? resolveFieldData(option, optionValue) : option;
    }

    getOptionGroupLabel(optionGroup: unknown) {
        const optionGroupLabel = this.optionGroupLabel();
        return optionGroupLabel ? resolveFieldData(optionGroup, optionGroupLabel) : null;
    }

    getOptionGroupChildren(optionGroup: unknown, level: number) {
        const optionGroupChildren = this.optionGroupChildren();
        return resolveFieldData(optionGroup, optionGroupChildren?.[level]);
    }

    isOptionGroup(option: unknown, level: number) {
        const optionGroupChildren = this.optionGroupChildren();
        return Object.prototype.hasOwnProperty.call(option, optionGroupChildren?.[level]);
    }

    isProccessedOptionGroup(processedOption: CascadeSelectProcessedOption) {
        return isNotEmpty(processedOption?.children);
    }

    getProccessedOptionLabel(processedOption: CascadeSelectProcessedOption) {
        const grouped = this.isProccessedOptionGroup(processedOption);

        return grouped ? this.getOptionGroupLabel(processedOption.option) : this.getOptionLabel(processedOption.option);
    }

    overlayService = inject(OverlayService);

    constructor() {
        super();
        effect(() => {
            const activeOptionPath = this.activeOptionPath();
            if (isNotEmpty(activeOptionPath)) {
                this.overlayViewChild()?.alignOverlay();
            }
        });

        effect(() => {
            const options = this.options();
            const optionsArray = Array.isArray(options) ? options : [];
            this.processedOptions = this.createProcessedOptions(optionsArray);
            if (untracked(() => this.modelValue()) != null) {
                this.updateModel(null);
            }
        });
    }
    query: MediaQueryList | undefined;
    queryMatches = signal<boolean>(false);
    mobileActive = signal<boolean>(false);

    onOptionChange(event: CascadeSelectOptionChangeEvent) {
        const { processedOption, type } = event;

        if (isEmpty(processedOption)) return;

        const { index, key, level, parentKey, children } = processedOption;
        const grouped = isNotEmpty(children);
        const activeOptionPath = this.activeOptionPath().filter((p) => p.parentKey !== parentKey && p.parentKey !== key);

        this.focusedOptionInfo.set({ index, level, parentKey });

        if (type == 'hover' && this.queryMatches()) {
            return;
        }

        if (grouped) {
            activeOptionPath.push(processedOption);
        }

        this.activeOptionPath.set([...activeOptionPath]);
    }

    onOptionClick(event: CascadeSelectOptionClickEvent) {
        const { originalEvent, processedOption, isFocus, isHide, preventSelection } = event;
        const { index, key, level, parentKey } = processedOption;
        const grouped = this.isProccessedOptionGroup(processedOption);
        const selected = this.isSelected(processedOption);

        if (selected) {
            const activeOptionPath = this.activeOptionPath().filter((p) => key !== p.key && key.startsWith(p.key));
            this.activeOptionPath.set([...activeOptionPath]);
            this.focusedOptionInfo.set({ index, level, parentKey });
        } else {
            if (grouped) {
                this.onOptionChange({ processedOption, type: event.type });
                this.onOptionGroupSelect({ originalEvent, value: processedOption.option, isFocus: false });
            } else {
                const activeOptionPath = this.activeOptionPath().filter((p) => p.parentKey !== parentKey);

                activeOptionPath.push(processedOption);

                this.focusedOptionInfo.set({ index, level, parentKey });

                if (!preventSelection || processedOption?.children?.length !== 0) {
                    this.activeOptionPath.set([...activeOptionPath]);
                    this.onOptionSelect({ originalEvent, value: processedOption.option, isHide: isFocus });
                }
            }
        }

        isFocus && focus(this.focusInputViewChild()?.nativeElement);
    }

    onOptionMouseEnter(event: CascadeSelectOptionMouseEvent) {
        if (this.focusOnHover()) {
            if (this.dirty() || (!this.dirty() && isNotEmpty(this.modelValue()))) {
                this.onOptionChange({ ...event, type: 'hover' });
            } else if (!this.dirty() && event.processedOption.level === 0) {
                this.onOptionClick({ ...event, type: 'hover' });
            }
        }
    }

    onOptionMouseMove(event: CascadeSelectOptionMouseEvent) {
        if (this.focused() && this.focusOnHover()) {
            this.changeFocusedOptionIndex(event.originalEvent, event.processedOption.index);
        }
    }

    onInit() {
        this.autoUpdateModel();
        this.bindMatchMediaListener();
    }

    onAfterViewInit() {
        this.initialized.set(true);
    }

    bindMatchMediaListener() {
        if (!this.matchMediaListener) {
            const window: Window | null = this.document.defaultView;
            if (window && window.matchMedia) {
                const query = window.matchMedia(`(max-width: ${this.breakpoint()})`);
                this.query = query;
                this.queryMatches.set(query?.matches);

                this.matchMediaListener = () => {
                    this.queryMatches.set(query?.matches);
                    this.mobileActive.set(false);
                };

                this.query.addEventListener('change', this.matchMediaListener);
            }
        }
    }

    unbindMatchMediaListener() {
        if (this.matchMediaListener) {
            this.query?.removeEventListener('change', this.matchMediaListener);
            this.matchMediaListener = null;
        }
    }

    onOverlayAfterLeave() {
        this.dirty.set(false);
    }

    /**
     * @override
     *
     * @see {@link BaseEditableHolder.writeControlValue}
     * Writes the value to the control.
     */
    writeControlValue(value: any, setModelValue: (value: any) => void): void {
        this.value.set(value);
        setModelValue(value);
    }

    onDestroy() {
        if (this.matchMediaListener) {
            this.unbindMatchMediaListener();
        }
    }
}

@NgModule({
    imports: [CascadeSelect, SharedModule],
    exports: [CascadeSelect, SharedModule]
})
export class CascadeSelectModule {}
