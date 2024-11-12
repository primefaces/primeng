import { CommonModule } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    ContentChild,
    effect,
    ElementRef,
    EventEmitter,
    forwardRef,
    inject,
    Input,
    NgModule,
    numberAttribute,
    OnInit,
    Output,
    signal,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { calculateScrollbarWidth, equals, findLastIndex, findSingle, focus, getHiddenElementOuterWidth, getOffset, getOuterWidth, getViewport, isEmpty, isNotEmpty, isPrintableCharacter, resolveFieldData, uuid } from '@primeuix/utils';
import { OverlayOptions, OverlayService, SharedModule, TranslationKeys } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { BaseComponent } from 'primeng/basecomponent';
import { AngleRightIcon, ChevronDownIcon, TimesIcon } from 'primeng/icons';
import { Overlay } from 'primeng/overlay';
import { Ripple } from 'primeng/ripple';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import { CascadeSelectBeforeHideEvent, CascadeSelectBeforeShowEvent, CascadeSelectChangeEvent, CascadeSelectHideEvent, CascadeSelectShowEvent } from './cascadeselect.interface';
import { CascadeSelectStyle } from './style/cascadeselectstyle';

export const CASCADESELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CascadeSelect),
    multi: true
};

@Component({
    selector: 'p-cascadeSelectSub, p-cascadeselect-sub',
    standalone: true,
    imports: [CommonModule, Overlay, Ripple, AutoFocus, AngleRightIcon, SharedModule],
    template: `
        <ul class="p-cascadeselect-list" [attr.role]="role" aria-orientation="horizontal" [attr.data-pc-section]="level === 0 ? 'list' : 'sublist'" [attr.aria-label]="listLabel">
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
                    <div class="p-cascadeselect-option-content" (click)="onOptionClick($event, processedOption)" [attr.tabindex]="0" pRipple [attr.data-pc-section]="'content'">
                        <ng-container *ngIf="optionTemplate; else defaultOptionTemplate">
                            <ng-container *ngTemplateOutlet="optionTemplate; context: { $implicit: processedOption?.option }"></ng-container>
                        </ng-container>
                        <ng-template #defaultOptionTemplate>
                            <span class="p-cascadeselect-option-text" [attr.data-pc-section]="'text'">{{ getOptionLabelToRender(processedOption) }}</span>
                        </ng-template>
                        <span class="p-cascadeselect-group-icon" *ngIf="isOptionGroup(processedOption)" [attr.data-pc-section]="'groupIcon'">
                            <AngleRightIcon *ngIf="!groupIconTemplate" />
                            <ng-template *ngTemplateOutlet="groupIconTemplate"></ng-template>
                        </span>
                    </div>
                    <p-cascadeselect-sub
                        *ngIf="isOptionGroup(processedOption) && isOptionActive(processedOption)"
                        [role]="'group'"
                        class="p-cascadeselect-overlay p-cascadeselect-option-list"
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
                    </p-cascadeselect-sub>
                </li>
            </ng-template>
        </ul>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CascadeSelectSub extends BaseComponent implements OnInit {
    @Input() role: string | undefined;

    @Input() selectId: string | undefined;

    @Input() activeOptionPath: any[];

    @Input() optionDisabled: any[];

    @Input() focusedOptionId: string | undefined;

    @Input() options: any[] | string[] | string | undefined | null;

    @Input() optionGroupChildren: string[] | string | undefined | null;

    @Input() optionTemplate: Nullable<TemplateRef<any>>;

    @Input() groupIconTemplate: Nullable<TemplateRef<any>>;

    @Input({ transform: numberAttribute }) level: number = 0;

    @Input() optionLabel: string | undefined;

    @Input() optionValue: string | undefined;

    @Input() optionGroupLabel: string | undefined;

    @Input({ transform: booleanAttribute }) dirty: boolean | undefined;

    @Input({ transform: booleanAttribute }) root: boolean | undefined;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    get listLabel(): string {
        return this.config.getTranslation(TranslationKeys.ARIA)['listLabel'];
    }

    ngOnInit() {
        super.ngOnInit();
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
        return this.optionLabel ? resolveFieldData(processedOption.option, this.optionLabel) : processedOption.option;
    }

    getOptionValue(processedOption) {
        return this.optionValue ? resolveFieldData(processedOption.option, this.optionValue) : processedOption.option;
    }

    getOptionLabelToRender(processedOption) {
        return this.isOptionGroup(processedOption) ? this.getOptionGroupLabel(processedOption) : this.getOptionLabel(processedOption);
    }

    isOptionDisabled(processedOption) {
        return this.optionDisabled ? resolveFieldData(processedOption.option, this.optionDisabled) : false;
    }

    getOptionGroupLabel(processedOption) {
        return this.optionGroupLabel ? resolveFieldData(processedOption.option, this.optionGroupLabel) : null;
    }

    getOptionGroupChildren(processedOption) {
        return processedOption.children;
    }

    isOptionGroup(processedOption) {
        return isNotEmpty(processedOption.children);
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
            'p-cascadeselect-option': true,
            'p-cascadeselect-option-group': this.isOptionGroup(option),
            'p-cascadeselect-option-active': this.isOptionActive(option),
            'p-cascadeselect-option-selected': this.isOptionSelected(option),
            'p-focus': this.isOptionFocused(option),
            'p-disabled': this.isOptionDisabled(option)
        };
    }

    position() {
        const parentItem = this.el.nativeElement.parentElement;
        const containerOffset = <any>getOffset(parentItem);
        const viewport = <any>getViewport();
        const sublistWidth = this.el.nativeElement.children[0].offsetParent ? this.el.nativeElement.children[0].offsetWidth : getHiddenElementOuterWidth(this.el.nativeElement.children[0]);
        const itemOuterWidth = <any>getOuterWidth(parentItem.children[0]);
        if (parseInt(containerOffset.left, 10) + itemOuterWidth + sublistWidth > viewport.width - calculateScrollbarWidth()) {
            this.el.nativeElement.children[0].style.left = '-200%';
        }
    }
}
/**
 * CascadeSelect is a form component to select a value from a nested structure of options.
 * @group Components
 */
@Component({
    selector: 'p-cascadeSelect, p-cascadeselect, p-cascade-select',
    standalone: true,
    imports: [CommonModule, Overlay, Ripple, AutoFocus, CascadeSelectSub, ChevronDownIcon, AngleRightIcon, TimesIcon, SharedModule],
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
                [attr.aria-expanded]="overlayVisible ?? false"
                [attr.aria-controls]="overlayVisible ? id + '_tree' : null"
                [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
                (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)"
                (keydown)="onInputKeyDown($event)"
                [pAutoFocus]="autofocus"
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
            <TimesIcon *ngIf="!clearIconTemplate" class="p-cascadeselect-clear-icon" (click)="clear($event)" [attr.data-pc-section]="'clearicon'" [attr.aria-hidden]="true" />
            <span *ngIf="clearIconTemplate" class="p-cascadeselect-clear-icon" (click)="clear($event)" [attr.data-pc-section]="'clearicon'" [attr.aria-hidden]="true">
                <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
            </span>
        </ng-container>

        <div class="p-cascadeselect-dropdown" role="button" aria-haspopup="listbox" [attr.aria-expanded]="overlayVisible ?? false" [attr.data-pc-section]="'dropdownIcon'" [attr.aria-hidden]="true">
            <ng-container *ngIf="loading; else elseBlock">
                <ng-container *ngIf="loadingIconTemplate">
                    <ng-container *ngTemplateOutlet="loadingIconTemplate"></ng-container>
                </ng-container>
                <ng-container *ngIf="!loadingIconTemplate">
                    <span *ngIf="loadingIcon" [ngClass]="'p-cascadeselect-loading-icon pi-spin ' + loadingIcon" aria-hidden="true"></span>
                    <span *ngIf="!loadingIcon" [class]="'p-cascadeselect-loading-icon pi pi-spinner pi-spin'" aria-hidden="true"></span>
                </ng-container>
            </ng-container>
            <ng-template #elseBlock>
                <ChevronDownIcon *ngIf="!triggerIconTemplate" [styleClass]="'p-cascadeselect-dropdown-icon'" />
                <span *ngIf="triggerIconTemplate" class="p-cascadeselect-dropdown-icon">
                    <ng-template *ngTemplateOutlet="triggerIconTemplate"></ng-template>
                </span>
            </ng-template>
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
            <ng-template #content>
                <div #panel [ngClass]="{ 'p-cascadeselect-overlay p-component': true, 'p-cascadeselect-mobile-active': queryMatches() }" [class]="panelStyleClass" [ngStyle]="panelStyle" [attr.data-pc-section]="'panel'">
                    <ng-template *ngTemplateOutlet="headerTemplate"></ng-template>
                    <div class="p-cascadeselect-list-container" [attr.data-pc-section]="'wrapper'">
                        <p-cascadeselect-sub
                            [options]="processedOptions"
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
                            [root]="true"
                            (onChange)="onOptionChange($event)"
                            [dirty]="dirty"
                            [role]="'tree'"
                        >
                        </p-cascadeselect-sub>
                    </div>
                    <span role="status" aria-live="polite" class="p-hidden-accessible">
                        {{ selectedMessageText }}
                    </span>
                    <ng-template *ngTemplateOutlet="footerTemplate"></ng-template>
                </div>
            </ng-template>
        </p-overlay>
    </div>`,
    providers: [CASCADESELECT_VALUE_ACCESSOR, CascadeSelectStyle],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CascadeSelect extends BaseComponent implements OnInit {
    /**
     * Unique identifier of the component
     * @group Props
     */
    @Input() id: string | undefined;
    /**
     * Determines if the option will be selected on focus.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) selectOnFocus: boolean = false;
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
     * Text to display when filtering does not return any results. Defaults to value from PrimeNG locale configuration.
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
    @Input({ transform: booleanAttribute }) autoOptionFocus: boolean = true;
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
    @Input() optionGroupLabel: string | undefined;
    /**
     * Property name or getter function to retrieve the items of a group.
     * @group Props
     */
    @Input() optionGroupChildren: string | undefined;
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
     * Defines the size of the component.
     * @group Props
     */
    @Input() size: 'large' | 'small';
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    @Input({ transform: numberAttribute }) tabindex: number | undefined = 0;
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
    @Input({ transform: booleanAttribute }) disabled: boolean | undefined;
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showClear: boolean = false;
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
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autofocus: boolean | undefined;
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
        console.log('The showTransitionOptions property is deprecated since v14.2.0, use overlayOptions property instead.');
    }
    /**
     * Specifies the input variant of the component.
     * @group Props
     */
    @Input() variant: 'filled' | 'outlined' = 'outlined';
    /**
     * Whether the dropdown is in loading state.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) loading: boolean | undefined = false;
    /**
     * Icon to display in loading state.
     * @group Props
     */
    @Input() loadingIcon: string | undefined;
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
        console.log('The hideTransitionOptions property is deprecated since v14.2.0, use overlayOptions property instead.');
    }
    /**
     * Spans 100% width of the container when enabled.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) fluid: boolean = false;
    /**
     * The breakpoint to define the maximum width boundary.
     * @group Props
     */
    @Input() breakpoint: string = '960px';
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
    /**
     * Content template for displaying the selected value.
     * @group Templates
     */
    @ContentChild('value') valueTemplate: Nullable<TemplateRef<any>>;

    /**
     * Content template for customizing the option display.
     * @group Templates
     */
    @ContentChild('option') optionTemplate: Nullable<TemplateRef<any>>;

    /**
     * Content template for customizing the header.
     * @group Templates
     */
    @ContentChild('header') headerTemplate: Nullable<TemplateRef<any>>;

    /**
     * Content template for customizing the footer.
     * @group Templates
     */
    @ContentChild('footer') footerTemplate: Nullable<TemplateRef<any>>;

    /**
     * Content template for customizing the trigger icon.
     * @group Templates
     */
    @ContentChild('triggericon') triggerIconTemplate: Nullable<TemplateRef<any>>;

    /**
     * Content template for customizing the loading icon.
     * @group Templates
     */
    @ContentChild('loadingicon') loadingIconTemplate: Nullable<TemplateRef<any>>;

    /**
     * Content template for customizing the group icon.
     * @group Templates
     */
    @ContentChild('optiongroupicon') groupIconTemplate: Nullable<TemplateRef<any>>;

    /**
     * Content template for customizing the clear icon.
     * @group Templates
     */
    @ContentChild('clearicon') clearIconTemplate: Nullable<TemplateRef<any>>;

    _showTransitionOptions: string = '';

    _hideTransitionOptions: string = '';

    selectionPath: any = null;

    focused: boolean = false;

    overlayVisible: boolean = false;

    dirty: boolean = true;

    searchValue: string | undefined;

    searchTimeout: any;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    focusedOptionInfo = signal<any>({ index: -1, level: 0, parentKey: '' });

    activeOptionPath = signal<any>([]);

    modelValue = signal<any>(null);

    processedOptions: string[] | string | undefined = [];

    _componentStyle = inject(CascadeSelectStyle);

    get containerClass() {
        return {
            'p-cascadeselect p-component p-inputwrapper': true,
            'p-cascadeselect-clearable': this.showClear && !this.disabled,
            'p-disabled': this.disabled,
            'p-focus': this.focused,
            'p-inputwrapper-filled': this.modelValue(),
            'p-variant-filled': this.variant === 'filled' || this.config.inputStyle() === 'filled',
            'p-inputwrapper-focus': this.focused || this.overlayVisible,
            'p-cascadeselect-open': this.overlayVisible,
            'p-cascadeselect-fluid': this.hasFluid,
            'p-cascadeselect-sm p-inputfield-sm': this.size === 'small',
            'p-cascadeselect-lg p-inputfield-lg': this.size === 'large'
        };
    }

    get labelClass() {
        return {
            'p-cascadeselect-label': true,
            'p-placeholder': this.label() === this.placeholder,
            'p-cascadeselect-label-empty': !this.value && (this.label() === 'p-emptylabel' || this.label().length === 0)
        };
    }

    get hasFluid() {
        const nativeElement = this.el.nativeElement;
        const fluidComponent = nativeElement.closest('p-fluid');
        return this.fluid || !!fluidComponent;
    }

    get focusedOptionId() {
        return this.focusedOptionInfo().index !== -1 ? `${this.id}${isNotEmpty(this.focusedOptionInfo().parentKey) ? '_' + this.focusedOptionInfo().parentKey : ''}_${this.focusedOptionInfo().index}` : null;
    }

    get filled(): boolean {
        if (typeof this.modelValue() === 'string') return !!this.modelValue();

        return this.modelValue() || this.modelValue() != null || this.modelValue() != undefined;
    }

    get searchResultMessageText() {
        return isNotEmpty(this.visibleOptions()) ? this.searchMessageText.replaceAll('{0}', this.visibleOptions().length) : this.emptySearchMessageText;
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

        return processedOption ? processedOption.children : this.processedOptions;
    });

    label = computed(() => {
        const label = this.placeholder || 'p-emptylabel';

        if (this.hasSelectedOption()) {
            const activeOptionPath = this.findOptionPathByValue(this.modelValue(), null);
            const processedOption = isNotEmpty(activeOptionPath) ? activeOptionPath[activeOptionPath.length - 1] : null;

            return processedOption ? this.getOptionLabel(processedOption.option) : label;
        }
        return label;
    });

    get _label() {
        const label = this.placeholder || 'p-emptylabel';

        if (this.hasSelectedOption()) {
            const activeOptionPath = this.findOptionPathByValue(this.modelValue(), null);
            const processedOption = isNotEmpty(activeOptionPath) ? activeOptionPath[activeOptionPath.length - 1] : null;

            return processedOption ? this.getOptionLabel(processedOption.option) : label;
        }
        return label;
    }

    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
        if (changes.options) {
            this.processedOptions = this.createProcessedOptions(changes.options.currentValue || []);
            this.updateModel(null);
        }
    }

    hasSelectedOption() {
        return isNotEmpty(this.modelValue());
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
        if (this.disabled || this.loading) {
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
        if (isNotEmpty(this.modelValue()) && this.showClear) {
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
            this.onOptionChange({
                originalEvent: null,
                processedOption: this.visibleOptions()[this.focusedOptionInfo().index],
                isHide: false
            });

            !this.overlayVisible && this.focusedOptionInfo.set({ index: -1, level: 0, parentKey: '' });
        }
    }

    scrollInView(index = -1) {
        const id = index !== -1 ? `${this.id}_${index}` : this.focusedOptionId;
        const element = findSingle(this.panelViewChild?.nativeElement, `li[id="${id}"]`);

        if (element) {
            element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'start' });
        }
    }

    changeFocusedOptionIndex(event, index) {
        if (this.focusedOptionInfo().index !== index) {
            const focusedOptionInfo = this.focusedOptionInfo();
            this.focusedOptionInfo.set({ ...focusedOptionInfo, index });
            this.scrollInView();
        }

        if (this.selectOnFocus) {
            this.onOptionChange({ originalEvent: event, processedOption: this.visibleOptions()[index], isHide: false });
        }
    }
    matchMediaListener: VoidListener;

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
        if (this.disabled || this.loading) {
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
        return this.optionDisabled ? resolveFieldData(option, this.optionDisabled) : false;
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
        processedOptions = processedOptions || (level === 0 && this.processedOptions);

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

            isFocus && focus(this.focusInputViewChild.nativeElement);
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

        if (this.hasSelectedOption() && isNotEmpty(this.activeOptionPath())) {
            const processedOption = this.activeOptionPath()[this.activeOptionPath().length - 1];

            focusedOptionInfo = {
                index: this.autoOptionFocus ? processedOption.index : -1,
                level: processedOption.level,
                parentKey: processedOption.parentKey
            };
        } else {
            focusedOptionInfo = { index: this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1, level: 0, parentKey: '' };
        }

        this.focusedOptionInfo.set(focusedOptionInfo);

        isFocus && focus(this.focusInputViewChild.nativeElement);
    }

    clear(event?: MouseEvent) {
        if (isNotEmpty(this.modelValue()) && this.showClear) {
            this.updateModel(null);
            this.focusedOptionInfo.set({ index: -1, level: 0, parentKey: '' });
            this.activeOptionPath.set([]);
            this.onClear.emit();
        }

        event && event.stopPropagation();
    }

    getOptionLabel(option) {
        return this.optionLabel ? resolveFieldData(option, this.optionLabel) : option;
    }

    getOptionValue(option) {
        return this.optionValue ? resolveFieldData(option, this.optionValue) : option;
    }

    getOptionGroupLabel(optionGroup) {
        return this.optionGroupLabel ? resolveFieldData(optionGroup, this.optionGroupLabel) : null;
    }

    getOptionGroupChildren(optionGroup, level) {
        return resolveFieldData(optionGroup, this.optionGroupChildren[level]);
    }

    isOptionGroup(option, level) {
        return Object.prototype.hasOwnProperty.call(option, this.optionGroupChildren[level]);
    }

    isProccessedOptionGroup(processedOption) {
        return isNotEmpty(processedOption.children);
    }

    getProccessedOptionLabel(processedOption) {
        const grouped = this.isProccessedOptionGroup(processedOption);

        return grouped ? this.getOptionGroupLabel(processedOption.option) : this.getOptionLabel(processedOption.option);
    }

    constructor(public overlayService: OverlayService) {
        super();
        effect(() => {
            const activeOptionPath = this.activeOptionPath();
            if (isNotEmpty(activeOptionPath)) {
                this.overlayViewChild.alignOverlay();
            }
        });
    }
    query: any;
    queryMatches = signal<boolean>(false);
    mobileActive = signal<boolean>(false);

    onOptionChange(event) {
        const { originalEvent, value, isFocus, isHide } = event;
        if (isEmpty(value)) return;

        const { index, level, parentKey, children, key } = value;

        const grouped = isNotEmpty(children);
        const selected = this.isSelected(value);
        if (selected) {
            const activeOptionPath = this.activeOptionPath().filter((p) => key !== p.key && key.startsWith(p.key));
            this.activeOptionPath.set([...activeOptionPath]);
            this.focusedOptionInfo.set({ index, level, parentKey });
        } else {
            const activeOptionPath = this.activeOptionPath().filter((p) => p.parentKey !== parentKey);

            activeOptionPath.push(value);

            this.focusedOptionInfo.set({ index, level, parentKey });
            this.activeOptionPath.set(activeOptionPath);

            grouped ? this.onOptionGroupSelect({ originalEvent, value, isFocus: false }) : this.onOptionSelect({ originalEvent, value, isFocus });
        }

        // const activeOptionPath = this.activeOptionPath().filter((p) => p.parentKey !== parentKey);
        //
        // activeOptionPath.push(value);
        //
        // this.focusedOptionInfo.set({ index, level, parentKey });
        // this.activeOptionPath.set(activeOptionPath);

        // grouped
        //     ? this.onOptionGroupSelect({ originalEvent, value, isFocus: false })
        //     : this.onOptionSelect({ originalEvent, value, isFocus });
        isFocus && focus(this.focusInputViewChild.nativeElement);
    }

    ngOnInit() {
        super.ngOnInit();
        this.id = this.id || uuid('pn_id_');
        this.autoUpdateModel();
        this.bindMatchMediaListener();
    }

    bindMatchMediaListener() {
        if (!this.matchMediaListener) {
            const window: Window = this.document.defaultView;
            if (window && window.matchMedia) {
                const query = window.matchMedia(`(max-width: ${this.breakpoint})`);
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
            this.query.removeEventListener('change', this.matchMediaListener);
            this.matchMediaListener = null;
        }
    }

    onOverlayAnimationDone(event: any) {
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

    ngOnDestroy() {
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
