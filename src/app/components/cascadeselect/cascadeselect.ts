import { AnimationEvent } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    computed,
    ContentChildren,
    effect,
    ElementRef,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    NgModule,
    OnInit,
    Output,
    QueryList,
    signal,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayOptions, OverlayService, PrimeNGConfig, PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { AngleRightIcon } from 'primeng/icons/angleright';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { TimesIcon } from 'primeng/icons/times';
import { Overlay, OverlayModule } from 'primeng/overlay';
import { RippleModule } from 'primeng/ripple';
import { Nullable } from 'primeng/ts-helpers';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';
import { CascadeSelectBeforeHideEvent, CascadeSelectBeforeShowEvent, CascadeSelectChangeEvent, CascadeSelectHideEvent, CascadeSelectShowEvent } from './cascadeselect.interface';

export const CASCADESELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CascadeSelect),
    multi: true
};

@Component({
    selector: 'p-cascadeSelectSub',
    template: `
        <ul class="p-cascadeselect-panel p-cascadeselect-items" [ngClass]="{ 'p-cascadeselect-panel-root': root }" [attr.role]="role" aria-orientation="horizontal" [attr.data-pc-section]="level === 0 ? 'list' : 'sublist'">
            <ng-template ngFor let-processedOption [ngForOf]="options" let-i="index">
                <li
                    [ngClass]="getItemClass(processedOption)"
                    role="treeitem"
                    [attr.aria-level]="level + 1"
                    [attr.aria-setsize]="options.length"
                    [attr.data-pc-section]="'item'"
                    [id]="getOptionId(processedOption)"
                    [attr.aria-label]="getOptionLabelToRender(processedOption)"
                    [attr.aria-selected]="isOptionGroup(processedOption) ? undefined : isOptionSelected(processedOption)"
                    [attr.aria-posinset]="i + 1"
                >
                    <div class="p-cascadeselect-item-content" (click)="onOptionClick($event, processedOption)" [attr.tabindex]="0" pRipple [attr.data-pc-section]="'content'">
                        <ng-container *ngIf="optionTemplate; else defaultOptionTemplate">
                            <ng-container *ngTemplateOutlet="optionTemplate; context: { $implicit: processedOption.option }"></ng-container>
                        </ng-container>
                        <ng-template #defaultOptionTemplate>
                            <span class="p-cascadeselect-item-text" [attr.data-pc-section]="'text'">{{ getOptionLabelToRender(processedOption) }}</span>
                        </ng-template>
                        <span class="p-cascadeselect-group-icon" *ngIf="isOptionGroup(processedOption)" [attr.data-pc-section]="'groupIcon'">
                            <AngleRightIcon *ngIf="!groupIconTemplate" />
                            <ng-template *ngTemplateOutlet="groupIconTemplate"></ng-template>
                        </span>
                    </div>
                    <p-cascadeSelectSub
                        *ngIf="isOptionGroup(processedOption) && isOptionActive(processedOption)"
                        [role]="'group'"
                        class="p-cascadeselect-sublist"
                        [selectId]="selectId"
                        [focusedOptionId]="focusedOptionId"
                        [activeOptionPath]="activeOptionPath"
                        [options]="getOptionGroupChildren(processedOption)"
                        [optionLabel]="optionLabel"
                        [optionValue]="optionValue"
                        [level]="level + 1"
                        (onChange)="onOptionChange($event)"
                        [optionGroupLabel]="optionGroupLabel"
                        [optionGroupChildren]="optionGroupChildren"
                        [dirty]="dirty"
                        [optionTemplate]="optionTemplate"
                    >
                    </p-cascadeSelectSub>
                </li>
            </ng-template>
        </ul>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CascadeSelectSub implements OnInit {
    @Input() role: string | undefined;

    @Input() selectId: string | undefined;

    @Input() activeOptionPath: any[];

    @Input() optionDisabled: any[];

    @Input() focusedOptionId: string | undefined;

    @Input() options: string[] | string | undefined | null;

    @Input() optionGroupChildren: string[] | string | undefined | null;

    @Input() optionTemplate: Nullable<TemplateRef<any>>;

    @Input() groupIconTemplate: Nullable<TemplateRef<any>>;

    @Input() level: number = 0;

    @Input() optionLabel: string | undefined;

    @Input() optionValue: string | undefined;

    @Input() optionGroupLabel: string | undefined;

    @Input() dirty: boolean | undefined;

    @Input() root: boolean | undefined;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    constructor(private el: ElementRef) {}

    ngOnInit() {
        if (!this.root) {
            this.position();
        }
    }

    onOptionClick(event, option: any) {
        this.onChange.emit({
            originalEvent: event,
            value: option,
            isFocus: true
        });
    }

    onOptionChange(event) {
        this.onChange.emit(event);
    }

    getOptionId(processedOption) {
        return `${this.selectId}_${processedOption.key}`;
    }

    getOptionLabel(processedOption) {
        return this.optionLabel ? ObjectUtils.resolveFieldData(processedOption.option, this.optionLabel) : processedOption.option;
    }

    getOptionValue(processedOption) {
        return this.optionValue ? ObjectUtils.resolveFieldData(processedOption.option, this.optionValue) : processedOption.option;
    }

    getOptionLabelToRender(processedOption) {
        return this.isOptionGroup(processedOption) ? this.getOptionGroupLabel(processedOption) : this.getOptionLabel(processedOption);
    }

    isOptionDisabled(processedOption) {
        return this.optionDisabled ? ObjectUtils.resolveFieldData(processedOption.option, this.optionDisabled) : false;
    }

    getOptionGroupLabel(processedOption) {
        return this.optionGroupLabel ? ObjectUtils.resolveFieldData(processedOption.option, this.optionGroupLabel) : null;
    }

    getOptionGroupChildren(processedOption) {
        return processedOption.children;
    }

    isOptionGroup(processedOption) {
        return ObjectUtils.isNotEmpty(processedOption.children);
    }

    isOptionSelected(processedOption) {
        return !this.isOptionGroup(processedOption) && this.isOptionActive(processedOption);
    }

    isOptionActive(processedOption) {
        return this.activeOptionPath.some((path) => path.key === processedOption.key);
    }

    isOptionFocused(processedOption) {
        return this.focusedOptionId === this.getOptionId(processedOption);
    }

    getItemClass(option: string | string[]) {
        return {
            'p-cascadeselect-item': true,
            'p-cascadeselect-item-group': this.isOptionGroup(option),
            'p-cascadeselect-item-active p-highlight': this.isOptionActive(option),
            'p-focus': this.isOptionFocused(option),
            'p-disabled': this.isOptionDisabled(option)
        };
    }

    position() {
        const parentItem = this.el.nativeElement.parentElement;
        const containerOffset = DomHandler.getOffset(parentItem);
        const viewport = DomHandler.getViewport();
        const sublistWidth = this.el.nativeElement.children[0].offsetParent ? this.el.nativeElement.children[0].offsetWidth : DomHandler.getHiddenElementOuterWidth(this.el.nativeElement.children[0]);
        const itemOuterWidth = DomHandler.getOuterWidth(parentItem.children[0]);

        if (parseInt(containerOffset.left, 10) + itemOuterWidth + sublistWidth > viewport.width - DomHandler.calculateScrollbarWidth()) {
            this.el.nativeElement.children[0].style.left = '-200%';
        }
    }
}
/**
 * CascadeSelect is a form component to select a value from a nested structure of options.
 * @group Components
 */
@Component({
    selector: 'p-cascadeSelect',
    template: ` <div #container [ngClass]="containerClass" [class]="styleClass" [ngStyle]="style" (click)="onContainerClick($event)" [attr.data-pc-name]="'cascadeselect'" [attr.data-pc-section]="'root'">
        <div class="p-hidden-accessible" [attr.data-pc-section]="'hiddenInputWrapper'">
            <input
                #focusInput
                readonly
                type="text"
                role="combobox"
                [disabled]="disabled"
                [placeholder]="placeholder"
                [tabindex]="!disabled ? tabindex : -1"
                [attr.id]="inputId"
                [attr.aria-label]="ariaLabel"
                [attr.aria-labelledby]="ariaLabelledBy"
                aria-haspopup="tree"
                [attr.aria-expanded]="overlayVisible"
                [attr.aria-controls]="id + '_tree'"
                [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
                (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)"
                (keydown)="onInputKeyDown($event)"
            />
        </div>
        <span [ngClass]="labelClass" [attr.data-pc-section]="'label'">
            <ng-container *ngIf="valueTemplate; else defaultValueTemplate">
                <ng-container *ngTemplateOutlet="valueTemplate; context: { $implicit: value, placeholder: placeholder }"></ng-container>
            </ng-container>
            <ng-template #defaultValueTemplate>
                {{ label() }}
            </ng-template>
        </span>

        <ng-container *ngIf="filled && !disabled && showClear">
            <TimesIcon *ngIf="!clearIconTemplate" [styleClass]="'p-cascadeselect-clear-icon'" (click)="clear($event)" [attr.data-pc-section]="'clearicon'" [attr.aria-hidden]="true" />
            <span *ngIf="clearIconTemplate" class="p-cascadeselect-clear-icon" (click)="clear($event)" [attr.data-pc-section]="'clearicon'" [attr.aria-hidden]="true">
                <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
            </span>
        </ng-container>

        <div class="p-cascadeselect-trigger" role="button" aria-haspopup="listbox" [attr.aria-expanded]="overlayVisible" [attr.data-pc-section]="'dropdownIcon'" [attr.aria-hidden]="true">
            <ChevronDownIcon *ngIf="!triggerIconTemplate" [styleClass]="'p-cascadeselect-trigger-icon'" />
            <span *ngIf="triggerIconTemplate" class="p-cascadeselect-trigger-icon">
                <ng-template *ngTemplateOutlet="triggerIconTemplate"></ng-template>
            </span>
        </div>
        <span role="status" aria-live="polite" class="p-hidden-accessible">
            {{ searchResultMessageText }}
        </span>
        <p-overlay
            #overlay
            [(visible)]="overlayVisible"
            [options]="overlayOptions"
            [target]="'@parent'"
            [appendTo]="appendTo"
            [showTransitionOptions]="showTransitionOptions"
            [hideTransitionOptions]="hideTransitionOptions"
            (onAnimationDone)="onOverlayAnimationDone($event)"
            (onBeforeShow)="onBeforeShow.emit($event)"
            (onShow)="show($event)"
            (onBeforeHide)="onBeforeHide.emit($event)"
            (onHide)="hide($event)"
        >
            <ng-template pTemplate="content">
                <div #panel class="p-cascadeselect-panel p-component" [class]="panelStyleClass" [ngStyle]="panelStyle" [attr.data-pc-section]="'panel'">
                    <div class="p-cascadeselect-items-wrapper" [attr.data-pc-section]="'wrapper'">
                        <p-cascadeSelectSub
                            class="p-cascadeselect-items"
                            [options]="processedOptions()"
                            [selectId]="id"
                            [focusedOptionId]="focused ? focusedOptionId : undefined"
                            [activeOptionPath]="activeOptionPath()"
                            [optionLabel]="optionLabel"
                            [optionValue]="optionValue"
                            [level]="0"
                            [optionTemplate]="optionTemplate"
                            [groupIconTemplate]="groupIconTemplate"
                            [optionGroupLabel]="optionGroupLabel"
                            [optionGroupChildren]="optionGroupChildren"
                            [optionDisabled]="optionDisabled"
                            [optionValue]="optionValue"
                            [optionLabel]="optionLabel"
                            [root]="true"
                            (onChange)="onOptionChange($event)"
                            [dirty]="dirty"
                            [role]="'tree'"
                        >
                        </p-cascadeSelectSub>
                    </div>
                    <span role="status" aria-live="polite" class="p-hidden-accessible">
                        {{ selectedMessageText }}
                    </span>
                </div>
            </ng-template>
        </p-overlay>
    </div>`,
    host: {
        class: 'p-element p-inputwrapper',
        '[class.p-inputwrapper-filled]': 'filled',
        '[class.p-inputwrapper-focus]': 'focused || overlayVisible',
        '[class.p-cascadeselect-clearable]': 'showClear && !disabled'
    },
    providers: [CASCADESELECT_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./cascadeselect.css']
})
export class CascadeSelect implements OnInit, AfterContentInit {
    /**
     * Unique identifier of the component
     * @group Props
     */
    @Input() id: string | undefined;
    /**
     * Determines if the option will be selected on focus.
     * @group Props
     */
    @Input() selectOnFocus: boolean = false;
    /**
     * Text to display when the search is active. Defaults to global value in i18n translation configuration.
     * @group Props
     * @defaultValue '{0} results are available'
     */
    @Input() searchMessage: string | undefined;
    /**
     * Text to display when there is no data. Defaults to global value in i18n translation configuration.
     * @group Props
     */
    @Input() emptyMessage: string | undefined;
    /**
     * Text to be displayed in hidden accessible field when options are selected. Defaults to global value in i18n translation configuration.
     * @group Props
     * @defaultValue '{0} items selected'
     */
    @Input() selectionMessage: string | undefined;
    /**
     * Text to display when filtering does not return any results. Defaults to value from PrimeVue locale configuration.
     * @group Props
     * @defaultValue 'No available options'
     */
    @Input() emptySearchMessage: string | undefined;
    /**
     * Text to display when filtering does not return any results. Defaults to global value in i18n translation configuration.
     * @group Props
     * @defaultValue 'No selected item'
     */
    @Input() emptySelectionMessage: string | undefined;
    /**
     * Locale to use in searching. The default locale is the host environment's current locale.
     * @group Props
     */
    @Input() searchLocale: string | undefined;
    /**
     * Name of the disabled field of an option.
     * @group Props
     */
    @Input() optionDisabled: any;
    /**
     * Whether to focus on the first visible or selected element when the overlay panel is shown.
     * @group Props
     */
    @Input() autoOptionFocus: boolean = true;
    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * An array of selectitems to display as the available options.
     * @group Props
     */
    @Input() options: string[] | string | undefined;
    /**
     * Property name or getter function to use as the label of an option.
     * @group Props
     */
    @Input() optionLabel: string | undefined;
    /**
     * Property name or getter function to use as the value of an option, defaults to the option itself when not defined.
     * @group Props
     */
    @Input() optionValue: string | undefined;
    /**
     * Property name or getter function to use as the label of an option group.
     * @group Props
     */
    @Input() optionGroupLabel: string | string[] | undefined;
    /**
     * Property name or getter function to retrieve the items of a group.
     * @group Props
     */
    @Input() optionGroupChildren: string | string[] | undefined;
    /**
     * Default text to display when no option is selected.
     * @group Props
     */
    @Input() placeholder: string | undefined;
    /**
     * Selected value of the component.
     * @group Props
     */
    @Input() value: string | undefined | null;
    /**
     * A property to uniquely identify an option.
     * @group Props
     */
    @Input() dataKey: string | undefined;
    /**
     * Identifier of the underlying input element.
     * @group Props
     */
    @Input() inputId: string | undefined;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    @Input() tabindex: number | undefined = 0;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    @Input() ariaLabelledBy: string | undefined;
    /**
     * Label of the input for accessibility.
     * @group Props
     */
    @Input() inputLabel: string | undefined;
    /**
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    @Input() ariaLabel: string | undefined;
    /**
     * Id of the element or "body" for document where the overlay should be appended to.
     * @group Props
     */
    @Input() appendTo: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any;
    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    @Input() disabled: boolean | undefined;
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @group Props
     */
    @Input() showClear: boolean = false;
    /**
     * Style class of the overlay panel.
     * @group Props
     */
    @Input() panelStyleClass: string | undefined;
    /**
     * Inline style of the overlay panel.
     * @group Props
     */
    @Input() panelStyle: { [klass: string]: any } | null | undefined;
    /**
     * Whether to use overlay API feature. The properties of overlay API can be used like an object in it.
     * @group Props
     */
    @Input() overlayOptions: OverlayOptions | undefined;
    /**
     * Transition options of the show animation.
     * @group Props
     * @deprecated deprecated since v14.2.0, use overlayOptions property instead.
     */
    @Input() get showTransitionOptions(): string {
        return this._showTransitionOptions;
    }
    set showTransitionOptions(val: string) {
        this._showTransitionOptions = val;
        console.warn('The showTransitionOptions property is deprecated since v14.2.0, use overlayOptions property instead.');
    }
    /**
     * Transition options of the hide animation.
     * @group Props
     * @deprecated deprecated since v14.2.0, use overlayOptions property instead.
     */
    @Input() get hideTransitionOptions(): string {
        return this._hideTransitionOptions;
    }
    set hideTransitionOptions(val: string) {
        this._hideTransitionOptions = val;
        console.warn('The hideTransitionOptions property is deprecated since v14.2.0, use overlayOptions property instead.');
    }
    /**
     * Callback to invoke on value change.
     * @param {CascadeSelectChangeEvent} event - Custom change event.
     * @group Emits
     */
    @Output() onChange: EventEmitter<CascadeSelectChangeEvent> = new EventEmitter<CascadeSelectChangeEvent>();
    /**
     * Callback to invoke when a group changes.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onGroupChange: EventEmitter<Event> = new EventEmitter<Event>();
    /**
     * Callback to invoke when the overlay is shown.
     * @param {CascadeSelectShowEvent} event - Custom overlay show event.
     * @group Emits
     */
    @Output() onShow: EventEmitter<CascadeSelectShowEvent> = new EventEmitter<CascadeSelectShowEvent>();
    /**
     * Callback to invoke when the overlay is hidden.
     * @param {CascadeSelectHideEvent} event - Custom overlay hide event.
     * @group Emits
     */
    @Output() onHide: EventEmitter<CascadeSelectHideEvent> = new EventEmitter<CascadeSelectHideEvent>();
    /**
     * Callback to invoke when the clear token is clicked.
     * @group Emits
     */
    @Output() onClear: EventEmitter<any> = new EventEmitter();
    /**
     * Callback to invoke before overlay is shown.
     * @param {CascadeSelectBeforeShowEvent} event - Custom overlay show event.
     * @group Emits
     */
    @Output() onBeforeShow: EventEmitter<CascadeSelectBeforeShowEvent> = new EventEmitter<CascadeSelectBeforeShowEvent>();
    /**
     * Callback to invoke before overlay is hidden.
     * @param {CascadeSelectBeforeHideEvent} event - Custom overlay hide event.
     * @group Emits
     */
    @Output() onBeforeHide: EventEmitter<CascadeSelectBeforeHideEvent> = new EventEmitter<CascadeSelectBeforeHideEvent>();
    /**
     * Callback to invoke when input receives focus.
     * @param {FocusEvent} event - Focus event.
     * @group Emits
     */
    @Output() onFocus: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    /**
     * Callback to invoke when input loses focus.
     * @param {FocusEvent} event - Focus event.
     * @group Emits
     */
    @Output() onBlur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    @ViewChild('focusInput') focusInputViewChild: Nullable<ElementRef>;

    @ViewChild('container') containerViewChild: Nullable<ElementRef>;

    @ViewChild('panel') panelViewChild: Nullable<ElementRef>;

    @ViewChild('overlay') overlayViewChild: Nullable<Overlay>;

    @ContentChildren(PrimeTemplate) templates!: QueryList<PrimeTemplate>;

    _showTransitionOptions: string = '';

    _hideTransitionOptions: string = '';

    selectionPath: any = null;

    focused: boolean = false;

    overlayVisible: boolean = false;

    dirty: boolean = true;

    searchValue: string | undefined;

    searchTimeout: any;

    valueTemplate: Nullable<TemplateRef<any>>;

    optionTemplate: Nullable<TemplateRef<any>>;

    triggerIconTemplate: Nullable<TemplateRef<any>>;

    groupIconTemplate: Nullable<TemplateRef<any>>;

    clearIconTemplate: Nullable<TemplateRef<any>>;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    focusedOptionInfo = signal<any>({ index: -1, level: 0, parentKey: '' });

    activeOptionPath = signal<any>([]);

    modelValue = signal<any>(null);

    get containerClass() {
        return {
            'p-cascadeselect p-component p-inputwrapper': true,
            'p-disabled': this.disabled,
            'p-focus': this.focused,
            'p-inputwrapper-filled': this.modelValue(),
            'p-inputwrapper-focus': this.focused || this.overlayVisible,
            'p-overlay-open': this.overlayVisible
        };
    }

    get labelClass() {
        return {
            'p-cascadeselect-label': true,
            'p-inputtext': true,
            'p-placeholder': this.label() === this.placeholder,
            'p-cascadeselect-label-empty': !this.value && (this.label() === 'p-emptylabel' || this.label().length === 0)
        };
    }

    get focusedOptionId() {
        return this.focusedOptionInfo().index !== -1 ? `${this.id}${ObjectUtils.isNotEmpty(this.focusedOptionInfo().parentKey) ? '_' + this.focusedOptionInfo().parentKey : ''}_${this.focusedOptionInfo().index}` : null;
    }

    get filled(): boolean {
        if (typeof this.modelValue() === 'string') return !!this.modelValue();

        return this.modelValue() || this.modelValue() != null || this.modelValue() != undefined;
    }

    get searchResultMessageText() {
        return ObjectUtils.isNotEmpty(this.visibleOptions()) ? this.searchMessageText.replaceAll('{0}', this.visibleOptions().length) : this.emptySearchMessageText;
    }

    get searchMessageText() {
        return this.searchMessage || this.config.translation.searchMessage || '';
    }

    get emptySearchMessageText() {
        return this.emptySearchMessage || this.config.translation.emptySearchMessage || '';
    }

    get emptyMessageText() {
        return this.emptyMessage || this.config.translation.emptyMessage || '';
    }

    get selectionMessageText() {
        return this.selectionMessage || this.config.translation.selectionMessage || '';
    }

    get emptySelectionMessageText() {
        return this.emptySelectionMessage || this.config.translation.emptySelectionMessage || '';
    }

    get selectedMessageText() {
        return this.hasSelectedOption ? this.selectionMessageText.replaceAll('{0}', '1') : this.emptySelectionMessageText;
    }

    visibleOptions = computed(() => {
        const processedOption = this.activeOptionPath().find((p) => p.key === this.focusedOptionInfo().parentKey);

        return processedOption ? processedOption.children : this.processedOptions();
    });

    processedOptions = computed(() => {
        return this.createProcessedOptions(this.options || []);
    });

    label = computed(() => {
        const label = this.placeholder || 'p-emptylabel';

        if (this.hasSelectedOption()) {
            const activeOptionPath = this.findOptionPathByValue(this.modelValue(), null);
            const processedOption = ObjectUtils.isNotEmpty(activeOptionPath) ? activeOptionPath[activeOptionPath.length - 1] : null;

            return processedOption ? this.getOptionLabel(processedOption.option) : label;
        }
        return label;
    });

    get _label() {
        const label = this.placeholder || 'p-emptylabel';

        if (this.hasSelectedOption()) {
            const activeOptionPath = this.findOptionPathByValue(this.modelValue(), null);
            const processedOption = ObjectUtils.isNotEmpty(activeOptionPath) ? activeOptionPath[activeOptionPath.length - 1] : null;

            return processedOption ? this.getOptionLabel(processedOption.option) : label;
        }
        return label;
    }

    hasSelectedOption() {
        return ObjectUtils.isNotEmpty(this.modelValue());
    }

    createProcessedOptions(options, level = 0, parent = {}, parentKey = '') {
        const processedOptions = [];

        options &&
            options.forEach((option, index) => {
                const key = (parentKey !== '' ? parentKey + '_' : '') + index;
                const newOption = {
                    option,
                    index,
                    level,
                    key,
                    parent,
                    parentKey
                };

                newOption['children'] = this.createProcessedOptions(this.getOptionGroupChildren(option, level), level + 1, newOption, key);
                processedOptions.push(newOption);
            });

        return processedOptions;
    }

    onInputFocus(event: FocusEvent) {
        if (this.disabled) {
            // For screenreaders
            return;
        }

        this.focused = true;
        this.onFocus.emit(event);
    }

    onInputBlur(event: FocusEvent) {
        this.focused = false;
        this.focusedOptionInfo.set({ indeX: -1, level: 0, parentKey: '' });
        this.searchValue = '';
        this.onModelTouched();
        this.onBlur.emit(event);
    }

    onInputKeyDown(event: KeyboardEvent) {
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
                if (!metaKey && ObjectUtils.isPrintableCharacter(event.key)) {
                    !this.overlayVisible && this.show();
                    this.searchOptions(event, event.key);
                }

                break;
        }
    }

    onArrowDownKey(event) {
        const optionIndex = this.focusedOptionInfo().index !== -1 ? this.findNextOptionIndex(this.focusedOptionInfo().index) : this.findFirstFocusedOptionIndex();

        this.changeFocusedOptionIndex(event, optionIndex);

        !this.overlayVisible && this.show();
        event.preventDefault();
    }

    onArrowUpKey(event) {
        if (event.altKey) {
            if (this.focusedOptionInfo().index !== -1) {
                const processedOption = this.visibleOptions[this.focusedOptionInfo().index];
                const grouped = this.isProccessedOptionGroup(processedOption);

                !grouped && this.onOptionChange({ originalEvent: event, value: processedOption });
            }

            this.overlayVisible && this.hide();
            event.preventDefault();
        } else {
            const optionIndex = this.focusedOptionInfo().index !== -1 ? this.findPrevOptionIndex(this.focusedOptionInfo().index) : this.findLastFocusedOptionIndex();

            this.changeFocusedOptionIndex(event, optionIndex);

            !this.overlayVisible && this.show();
            event.preventDefault();
        }
    }

    onArrowLeftKey(event) {
        if (this.overlayVisible) {
            const processedOption = this.visibleOptions()[this.focusedOptionInfo().index];
            const parentOption = this.activeOptionPath().find((p) => p.key === processedOption.parentKey);
            const matched = this.focusedOptionInfo().parentKey === '' || (parentOption && parentOption.key === this.focusedOptionInfo().parentKey);
            const root = ObjectUtils.isEmpty(processedOption.parent);

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

    onArrowRightKey(event) {
        if (this.overlayVisible) {
            const processedOption = this.visibleOptions()[this.focusedOptionInfo().index];
            const grouped = this.isProccessedOptionGroup(processedOption);

            if (grouped) {
                const matched = this.activeOptionPath().some((p) => processedOption.key === p.key);

                if (matched) {
                    this.focusedOptionInfo.set({ index: -1, parentKey: processedOption.key });
                    this.searchValue = '';
                    this.onArrowDownKey(event);
                } else {
                    this.onOptionChange({ originalEvent: event, value: processedOption });
                }
            }

            event.preventDefault();
        }
    }

    onHomeKey(event) {
        this.changeFocusedOptionIndex(event, this.findFirstOptionIndex());

        !this.overlayVisible && this.show();
        event.preventDefault();
    }

    onEndKey(event) {
        this.changeFocusedOptionIndex(event, this.findLastOptionIndex());

        !this.overlayVisible && this.show();
        event.preventDefault();
    }

    onEnterKey(event) {
        if (!this.overlayVisible) {
            this.onArrowDownKey(event);
        } else {
            if (this.focusedOptionInfo().index !== -1) {
                const processedOption = this.visibleOptions()[this.focusedOptionInfo().index];
                const grouped = this.isProccessedOptionGroup(processedOption);

                this.onOptionChange({ originalEvent: event, value: processedOption });
                !grouped && this.hide();
            }
        }

        event.preventDefault();
    }

    onSpaceKey(event) {
        this.onEnterKey(event);
    }

    onEscapeKey(event) {
        this.overlayVisible && this.hide(true);
        event.preventDefault();
    }

    onTabKey(event) {
        if (this.focusedOptionInfo().index !== -1) {
            const processedOption = this.visibleOptions()[this.focusedOptionInfo().index];
            const grouped = this.isProccessedOptionGroup(processedOption);

            !grouped && this.onOptionChange({ originalEvent: event, value: processedOption });
        }

        this.overlayVisible && this.hide();
    }

    onBackspaceKey(event) {
        if (ObjectUtils.isNotEmpty(this.modelValue()) && this.showClear) {
            this.clear();
        }

        event.stopPropagation();
    }

    equalityKey() {
        return this.optionValue ? null : this.dataKey;
    }

    updateModel(value, event?) {
        this.value = value;
        this.onModelChange(value);
        this.modelValue.set(value);

        this.onChange.emit({
            originalEvent: event,
            value: value
        });
    }

    autoUpdateModel() {
        if (this.selectOnFocus && this.autoOptionFocus && !this.hasSelectedOption()) {
            this.focusedOptionInfo().index = this.findFirstFocusedOptionIndex();
            this.onOptionChange({ originalEvent: null, processedOption: this.visibleOptions()[this.focusedOptionInfo().index], isHide: false });

            !this.overlayVisible && this.focusedOptionInfo.set({ index: -1, level: 0, parentKey: '' });
        }
    }

    scrollInView(index = -1) {
        const id = index !== -1 ? `${this.id}_${index}` : this.focusedOptionId;
        const element = DomHandler.findSingle(this.panelViewChild?.nativeElement, `li[id="${id}"]`);

        if (element) {
            element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'start' });
        }
    }

    changeFocusedOptionIndex(event, index) {
        if (this.focusedOptionInfo().index !== index) {
            const focusedOptionInfo = this.focusedOptionInfo();
            this.focusedOptionInfo.set({...focusedOptionInfo, index})
            this.scrollInView();
        }

        if (this.selectOnFocus) {
            this.onOptionChange({ originalEvent: event, processedOption: this.visibleOptions()[index], isHide: false });
        }
    }

    onOptionChange(event) {
        const { originalEvent, value, isFocus, isHide } = event;
        if (ObjectUtils.isEmpty(value)) return;

        const { index, level, parentKey, children } = value;
        const grouped = ObjectUtils.isNotEmpty(children);

        const activeOptionPath = this.activeOptionPath().filter((p) => p.parentKey !== parentKey);

        activeOptionPath.push(value);

        this.focusedOptionInfo.set({ index, level, parentKey });
        this.activeOptionPath.set(activeOptionPath);

        grouped ? this.onOptionGroupSelect({ originalEvent, value, isFocus: false }) : this.onOptionSelect({ originalEvent, value, isFocus });
        isFocus && DomHandler.focus(this.focusInputViewChild.nativeElement);
    }

    onOptionSelect(event) {
        const { originalEvent, value, isFocus } = event;
        const newValue = this.getOptionValue(value.option);

        const activeOptionPath = this.activeOptionPath();
        activeOptionPath.forEach((p) => (p.selected = true));

        this.activeOptionPath.set(activeOptionPath);
        this.updateModel(newValue, originalEvent);
        isFocus && this.hide(true);
    }

    onOptionGroupSelect(event) {
        this.dirty = true;
        this.onGroupChange.emit(event);
    }

    onContainerClick(event: MouseEvent) {
        if (this.disabled) {
            return;
        }

        if (!this.overlayViewChild?.el?.nativeElement?.contains(event.target)) {
            if (this.overlayVisible) {
                this.hide();
            } else {
                this.show();
            }

            this.focusInputViewChild?.nativeElement.focus();
        }
    }

    isOptionMatched(processedOption) {
        return this.isValidOption(processedOption) && this.getProccessedOptionLabel(processedOption).toLocaleLowerCase(this.searchLocale).startsWith(this.searchValue.toLocaleLowerCase(this.searchLocale));
    }

    isOptionDisabled(option) {
        return this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : false;
    }

    isValidOption(processedOption) {
        return !!processedOption && !this.isOptionDisabled(processedOption.option);
    }

    isValidSelectedOption(processedOption) {
        return this.isValidOption(processedOption) && this.isSelected(processedOption);
    }

    isSelected(processedOption) {
        return this.activeOptionPath().some((p) => p.key === processedOption.key);
    }

    findOptionPathByValue(value, processedOptions?, level = 0) {
        processedOptions = processedOptions || (level === 0 && this.processedOptions());

        if (!processedOptions) return null;
        if (ObjectUtils.isEmpty(value)) return [];

        for (let i = 0; i < processedOptions.length; i++) {
            const processedOption = processedOptions[i];

            if (ObjectUtils.equals(value, this.getOptionValue(processedOption.option), this.equalityKey())) {
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
        return ObjectUtils.findLastIndex(this.visibleOptions(), (processedOption) => this.isValidOption(processedOption));
    }

    findNextOptionIndex(index) {
        const matchedOptionIndex =
            index < this.visibleOptions().length - 1
                ? this.visibleOptions()
                      .slice(index + 1)
                      .findIndex((processedOption) => this.isValidOption(processedOption))
                : -1;

        return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
    }

    findPrevOptionIndex(index) {
        const matchedOptionIndex = index > 0 ? ObjectUtils.findLastIndex(this.visibleOptions().slice(0, index), (processedOption) => this.isValidOption(processedOption)) : -1;

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

    searchOptions(event, char) {
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
            this.searchTimeout = null;
        }, 500);

        return matched;
    }

    hide(event?, isFocus = false) {
        const _hide = () => {
            this.overlayVisible = false;
            this.activeOptionPath.set([]);
            this.focusedOptionInfo.set({ index: -1, level: 0, parentKey: '' });

            isFocus && DomHandler.focus(this.focusInputViewChild.nativeElement);
            this.onHide.emit(event);
        };

        setTimeout(() => {
            _hide();
        }, 0); // For ScreenReaders
    }

    show(event?, isFocus = false) {
        this.onShow.emit(event);
        this.overlayVisible = true;
        const activeOptionPath = this.hasSelectedOption() ? this.findOptionPathByValue(this.modelValue()) : this.activeOptionPath();
        this.activeOptionPath.set(activeOptionPath);

        let focusedOptionInfo;

        if (this.hasSelectedOption() && ObjectUtils.isNotEmpty(this.activeOptionPath())) {
            const processedOption = this.activeOptionPath()[this.activeOptionPath().length - 1];

            focusedOptionInfo = { index: this.autoOptionFocus ? processedOption.index : -1, level: processedOption.level, parentKey: processedOption.parentKey };
        } else {
            focusedOptionInfo = { index: this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1, level: 0, parentKey: '' };
        }

        this.focusedOptionInfo.set(focusedOptionInfo);

        isFocus && DomHandler.focus(this.focusInputViewChild.nativeElement);
    }

    clear(event?: MouseEvent) {
        if (ObjectUtils.isNotEmpty(this.modelValue()) && this.showClear) {
            this.updateModel(null);
            this.focusedOptionInfo.set({ index: -1, level: 0, parentKey: '' });
            this.activeOptionPath.set([]);
            this.onClear.emit();
        }

        event && event.stopPropagation();
    }

    getOptionLabel(option) {
        return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : option;
    }

    getOptionValue(option) {
        return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : option;
    }

    getOptionGroupLabel(optionGroup) {
        return this.optionGroupLabel ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel) : null;
    }

    getOptionGroupChildren(optionGroup, level) {
        return ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren[level]);
    }

    isOptionGroup(option, level) {
        return Object.prototype.hasOwnProperty.call(option, this.optionGroupChildren[level]);
    }

    isProccessedOptionGroup(processedOption) {
        return ObjectUtils.isNotEmpty(processedOption.children);
    }

    getProccessedOptionLabel(processedOption) {
        const grouped = this.isProccessedOptionGroup(processedOption);

        return grouped ? this.getOptionGroupLabel(processedOption.option) : this.getOptionLabel(processedOption.option);
    }

    constructor(private el: ElementRef, private cd: ChangeDetectorRef, private config: PrimeNGConfig, public overlayService: OverlayService) {
        effect(() => {
            const activeOptionPath = this.activeOptionPath();
            if (ObjectUtils.isNotEmpty(activeOptionPath)) {
                this.overlayViewChild.alignOverlay();
            }
        });
    }

    ngOnInit() {
        this.id = this.id || UniqueComponentId();
        this.autoUpdateModel();
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'value':
                    this.valueTemplate = item.template;
                    break;

                case 'option':
                    this.optionTemplate = item.template;
                    break;

                case 'triggericon':
                    this.triggerIconTemplate = item.template;
                    break;

                case 'clearicon':
                    this.clearIconTemplate = item.template;
                    break;

                case 'optiongroupicon':
                    this.groupIconTemplate = item.template;
                    break;
            }
        });
    }

    onOverlayAnimationDone(event: AnimationEvent) {
        switch (event.toState) {
            case 'void':
                this.dirty = false;
                break;
        }
    }

    writeValue(value: any): void {
        this.value = value;
        this.updateModel(value);
        this.cd.markForCheck();
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
}

@NgModule({
    imports: [CommonModule, OverlayModule, SharedModule, RippleModule, ChevronDownIcon, AngleRightIcon, TimesIcon],
    exports: [CascadeSelect, OverlayModule, CascadeSelectSub, SharedModule],
    declarations: [CascadeSelect, CascadeSelectSub]
})
export class CascadeSelectModule {}
