import { AnimationEvent } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    NgModule,
    OnInit,
    Output,
    QueryList,
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
import { ObjectUtils } from 'primeng/utils';
import { CascadeSelectBeforeHideEvent, CascadeSelectBeforeShowEvent, CascadeSelectHideEvent, CascadeSelectShowEvent } from './cascadeselect.interface';

export const CASCADESELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CascadeSelect),
    multi: true
};

@Component({
    selector: 'p-cascadeSelectSub',
    template: `
        <ul class="p-cascadeselect-panel p-cascadeselect-items" [ngClass]="{ 'p-cascadeselect-panel-root': root }" role="listbox" aria-orientation="horizontal" [attr.data-pc-section]="level === 0 ? 'list' : 'sublist'">
            <ng-template ngFor let-option [ngForOf]="options" let-i="index">
                <li [ngClass]="getItemClass(option)" role="treeitem" [attr.aria-level]="level + 1" [attr.aria-setsize]="options.length" [attr.data-pc-section]="'item'">
                    <div class="p-cascadeselect-item-content" (click)="onOptionClick($event, option)" [attr.tabindex]="0" (keydown)="onKeyDown($event, option, i)" pRipple [attr.data-pc-section]="'content'">
                        <ng-container *ngIf="optionTemplate; else defaultOptionTemplate">
                            <ng-container *ngTemplateOutlet="optionTemplate; context: { $implicit: option }"></ng-container>
                        </ng-container>
                        <ng-template #defaultOptionTemplate>
                            <span class="p-cascadeselect-item-text" [attr.data-pc-section]="'text'">{{ getOptionLabelToRender(option) }}</span>
                        </ng-template>
                        <span class="p-cascadeselect-group-icon" *ngIf="isOptionGroup(option)" [attr.data-pc-section]="'groupIcon'">
                            <AngleRightIcon *ngIf="!groupIconTemplate" />
                            <ng-template *ngTemplateOutlet="groupIconTemplate"></ng-template>
                        </span>
                    </div>
                    <p-cascadeSelectSub
                        *ngIf="isOptionGroup(option) && isOptionActive(option)"
                        role="group"
                        class="p-cascadeselect-sublist"
                        [selectionPath]="selectionPath"
                        [options]="getOptionGroupChildren(option)"
                        [optionLabel]="optionLabel"
                        [optionValue]="optionValue"
                        [level]="level + 1"
                        (onSelect)="onOptionSelect($event)"
                        (onOptionGroupSelect)="onOptionGroupSelect()"
                        [optionGroupLabel]="optionGroupLabel"
                        [optionGroupChildren]="optionGroupChildren"
                        [parentActive]="isOptionActive(option)"
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
    @Input() selectionPath: string[] | string | undefined | null;

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

    @Output() onSelect: EventEmitter<any> = new EventEmitter();

    @Output() onGroupSelect: EventEmitter<any> = new EventEmitter();

    @Input() get parentActive(): boolean {
        return this._parentActive;
    }
    set parentActive(val) {
        if (!val) {
            this.activeOption = null;
        }

        this._parentActive = val;
    }

    activeOption: any = null;

    _parentActive: boolean = false;

    cascadeSelect: CascadeSelect;

    constructor(@Inject(forwardRef(() => CascadeSelect)) cascadeSelect: CascadeSelect, private el: ElementRef) {
        this.cascadeSelect = cascadeSelect as CascadeSelect;
    }

    ngOnInit() {
        if (this.selectionPath && this.options && !this.dirty) {
            for (let option of this.options) {
                if (this.selectionPath.includes(option)) {
                    this.activeOption = option;
                    break;
                }
            }
        }

        if (!this.root) {
            this.position();
        }
    }

    onOptionClick(event: Event, option: string | string[]) {
        if (this.isOptionGroup(option)) {
            this.activeOption = this.activeOption === option ? null : option;

            this.onGroupSelect.emit({
                originalEvent: event,
                value: option
            });
        } else {
            this.onSelect.emit({
                originalEvent: event,
                value: this.getOptionValue(option)
            });
        }
    }

    onOptionSelect(event: Event) {
        this.onSelect.emit(event);
    }

    onOptionGroupSelect(event: Event) {
        this.onGroupSelect.emit(event);
    }

    getOptionLabel(option: string | string[]) {
        return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : option;
    }

    getOptionValue(option: string | string[]) {
        return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : option;
    }

    getOptionGroupLabel(optionGroup: string | string[]) {
        return this.optionGroupLabel ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel) : null;
    }

    getOptionGroupChildren(optionGroup: string | string[]) {
        return ObjectUtils.resolveFieldData(optionGroup, (this.optionGroupChildren as any)[this.level]);
    }

    isOptionGroup(option: string | string[]) {
        return Object.prototype.hasOwnProperty.call(option, (this.optionGroupChildren as any)[this.level]);
    }

    getOptionLabelToRender(option: string | string[]) {
        return this.isOptionGroup(option) ? this.getOptionGroupLabel(option) : this.getOptionLabel(option);
    }

    getItemClass(option: string | string[]) {
        return {
            'p-cascadeselect-item': true,
            'p-cascadeselect-item-group': this.isOptionGroup(option),
            'p-cascadeselect-item-active p-highlight': this.isOptionActive(option)
        };
    }

    isOptionActive(option: string | string[]) {
        return this.activeOption === option;
    }

    onKeyDown(event: any, option: string | string[], index: number) {
        let listItem = event.currentTarget.parentElement;

        switch (event.key) {
            case 'Down':
            case 'ArrowDown':
                var nextItem = this.el.nativeElement.children[0].children[index + 1];
                if (nextItem) {
                    nextItem.children[0].focus();
                }

                event.preventDefault();
                break;

            case 'Up':
            case 'ArrowUp':
                var prevItem = this.el.nativeElement.children[0].children[index - 1];
                if (prevItem) {
                    prevItem.children[0].focus();
                }

                event.preventDefault();
                break;

            case 'Right':
            case 'ArrowRight':
                if (this.isOptionGroup(option)) {
                    if (this.isOptionActive(option)) {
                        listItem.children[1].children[0].children[0].children[0].focus();
                    } else {
                        this.activeOption = option;
                    }
                }

                event.preventDefault();
                break;

            case 'Left':
            case 'ArrowLeft':
                this.activeOption = null;

                var parentList = listItem.parentElement.parentElement.parentElement;
                if (parentList) {
                    parentList.children[0].focus();
                }

                event.preventDefault();
                break;

            case ' ':
            case 'Enter':
                this.onOptionClick(event, option);

                event.preventDefault();
                break;

            case 'Tab':
            case 'Escape':
                this.cascadeSelect.hide();

                event.preventDefault();
                break;
        }
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
    template: `
        <div #container [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style" (click)="onContainerClick($event)" [attr.data-pc-name]="'cascadeselect'" [attr.data-pc-section]="'root'">
            <div class="p-hidden-accessible" [attr.data-pc-section]="'hiddenInputWrapper'">
                <input
                    #focusInput
                    [attr.id]="inputId"
                    type="text"
                    readonly
                    [disabled]="disabled"
                    (focus)="onFocus()"
                    (blur)="onBlur()"
                    role="combobox"
                    (keydown)="onKeyDown($event)"
                    [attr.tabindex]="!disabled ? tabindex : -1"
                    aria-haspopup="listbox"
                    [attr.aria-expanded]="overlayVisible"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    [attr.label]="inputLabel"
                    [attr.aria-label]="ariaLabel"
                    [attr.data-pc-section]="'input'"
                />
            </div>
            <span [ngClass]="labelClass()" [attr.data-pc-section]="'label'">
                <ng-container *ngIf="valueTemplate; else defaultValueTemplate">
                    <ng-container *ngTemplateOutlet="valueTemplate; context: { $implicit: value, placeholder: placeholder }"></ng-container>
                </ng-container>
                <ng-template #defaultValueTemplate>
                    {{ label() }}
                </ng-template>
            </span>

            <ng-container *ngIf="filled && !disabled && showClear">
                <TimesIcon *ngIf="!clearIconTemplate" [styleClass]="'p-cascadeselect-clear-icon'" (click)="clear($event)" [attr.data-pc-section]="'clearIcon'" />
                <span *ngIf="clearIconTemplate" class="p-cascadeselect-clear-icon" (click)="clear($event)" [attr.data-pc-section]="'clearIcon'">
                    <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                </span>
            </ng-container>

            <div class="p-cascadeselect-trigger" role="button" aria-haspopup="listbox" [attr.aria-expanded]="overlayVisible" [attr.data-pc-section]="'dropdownIcon'">
                <ChevronDownIcon *ngIf="!triggerIconTemplate" [styleClass]="'p-cascadeselect-trigger-icon'" />
                <span *ngIf="triggerIconTemplate" class="p-cascadeselect-trigger-icon">
                    <ng-template *ngTemplateOutlet="triggerIconTemplate"></ng-template>
                </span>
            </div>
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
                (onShow)="onShow.emit($event)"
                (onBeforeHide)="onBeforeHide.emit($event)"
                (onHide)="onHide.emit($event)"
                [attr.data-pc-section]="'transition'"
            >
                <ng-template pTemplate="content">
                    <div #panel class="p-cascadeselect-panel p-component" [class]="panelStyleClass" [ngStyle]="panelStyle" [attr.data-pc-section]="'panel'">
                        <div class="p-cascadeselect-items-wrapper" [attr.data-pc-section]="'wrapper'">
                            <p-cascadeSelectSub
                                [options]="options"
                                role="tree"
                                [attr.aria-orientation]="'horizontal'"
                                [selectionPath]="selectionPath"
                                class="p-cascadeselect-items"
                                [optionLabel]="optionLabel"
                                [optionValue]="optionValue"
                                [level]="0"
                                [optionTemplate]="optionTemplate"
                                [groupIconTemplate]="groupIconTemplate"
                                [optionGroupLabel]="optionGroupLabel"
                                [optionGroupChildren]="optionGroupChildren"
                                (onSelect)="onOptionSelect($event)"
                                (onGroupSelect)="onOptionGroupSelect($event)"
                                [dirty]="dirty"
                                [root]="true"
                            >
                            </p-cascadeSelectSub>
                        </div>
                    </div>
                </ng-template>
            </p-overlay>
        </div>
    `,
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
    @Input() tabindex: string | undefined;
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
     * Callback to invoke on value change.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onChange: EventEmitter<Event> = new EventEmitter<Event>();
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
    @ViewChild('focusInput') focusInputEl: Nullable<ElementRef>;

    @ViewChild('container') containerEl: Nullable<ElementRef>;

    @ViewChild('panel') panelEl: Nullable<ElementRef>;

    @ViewChild('overlay') overlayViewChild: Nullable<Overlay>;

    @ContentChildren(PrimeTemplate) templates!: QueryList<PrimeTemplate>;

    _showTransitionOptions: string = '';

    _hideTransitionOptions: string = '';

    selectionPath: any = null;

    focused: boolean = false;

    filled: boolean = false;

    overlayVisible: boolean = false;

    dirty: boolean = false;

    valueTemplate: Nullable<TemplateRef<any>>;

    optionTemplate: Nullable<TemplateRef<any>>;

    triggerIconTemplate: Nullable<TemplateRef<any>>;

    groupIconTemplate: Nullable<TemplateRef<any>>;

    clearIconTemplate: Nullable<TemplateRef<any>>;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    constructor(private el: ElementRef, private cd: ChangeDetectorRef, private config: PrimeNGConfig, public overlayService: OverlayService) {}

    ngOnInit() {
        this.updateSelectionPath();
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

    onOptionSelect(event: any) {
        this.value = event.value;
        this.updateSelectionPath();
        this.onModelChange(this.value);
        this.onChange.emit(event);
        this.hide();
        this.focusInputEl?.nativeElement.focus();
    }

    onOptionGroupSelect(event: Event) {
        this.dirty = true;
        this.onGroupChange.emit(event);
    }

    getOptionLabel(option: string | object) {
        return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : option;
    }

    getOptionValue(option: string | object) {
        return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : option;
    }

    getOptionGroupChildren(optionGroup: string | object, level: number) {
        return ObjectUtils.resolveFieldData(optionGroup, (this.optionGroupChildren as string)[level]);
    }

    isOptionGroup(option: string | object, level: number) {
        return Object.prototype.hasOwnProperty.call(option, (this.optionGroupChildren as string)[level]);
    }

    updateSelectionPath() {
        let path;
        if (this.value != null && this.options) {
            for (let option of this.options) {
                path = this.findModelOptionInGroup(option, 0);
                if (path) {
                    break;
                }
            }
        }

        this.selectionPath = path;
        this.updateFilledState();
    }

    updateFilledState() {
        this.filled = !(this.selectionPath == null || this.selectionPath.length == 0);
    }

    findModelOptionInGroup(option: string | object, level: number): Nullable<object[] | any> {
        if (this.isOptionGroup(option, level)) {
            let selectedOption;
            for (let childOption of this.getOptionGroupChildren(option, level)) {
                selectedOption = this.findModelOptionInGroup(childOption, level + 1);
                if (selectedOption) {
                    selectedOption.unshift(option);
                    return selectedOption;
                }
            }
        } else if (ObjectUtils.equals(this.value, this.getOptionValue(option), this.dataKey)) {
            return [option];
        }

        return null;
    }

    show() {
        this.overlayVisible = true;
    }

    hide() {
        this.overlayVisible = false;
        this.cd.markForCheck();
    }

    clear(event: Event) {
        this.value = null;
        this.selectionPath = null;
        this.updateFilledState();
        this.onClear.emit();
        this.onModelChange(this.value);
        event.stopPropagation();
        this.cd.markForCheck();
    }

    onContainerClick(event: Event) {
        if (this.disabled) {
            return;
        }

        if (!this.overlayViewChild?.el?.nativeElement?.contains(event.target)) {
            if (this.overlayVisible) {
                this.hide();
            } else {
                this.show();
            }

            this.focusInputEl?.nativeElement.focus();
        }
    }

    onFocus() {
        this.focused = true;
    }

    onBlur() {
        this.focused = false;
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
        this.updateSelectionPath();
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

    label() {
        if (this.selectionPath) {
            return this.getOptionLabel(this.selectionPath[this.selectionPath.length - 1]);
        }

        return this.placeholder || 'p-emptylabel';
    }

    onKeyDown(event: any) {
        if (this.disabled) {
            event.preventDefault();

            return;
        }

        switch (event.code) {
            case 'Down':
            case 'ArrowDown':
                if (this.overlayVisible) {
                    DomHandler.findSingle(this.panelEl?.nativeElement, '.p-cascadeselect-item').children[0].focus();
                } else if (event.altKey && this.options && this.options.length) {
                    this.show();
                }
                event.preventDefault();
                break;

            case 'Space':
            case 'Enter':
                if (!this.overlayVisible) this.show();
                else this.hide();

                event.preventDefault();
                break;

            case 'Tab':
            case 'Escape':
                if (this.overlayVisible) {
                    this.hide();
                    event.preventDefault();
                }
                break;
        }
    }

    containerClass() {
        return {
            'p-cascadeselect p-component p-inputwrapper': true,
            'p-disabled': this.disabled,
            'p-focus': this.focused
        };
    }

    labelClass() {
        return {
            'p-cascadeselect-label': true,
            'p-inputtext': true,
            'p-placeholder': this.label() === this.placeholder,
            'p-cascadeselect-label-empty': !this.value && (this.label() === 'p-emptylabel' || this.label().length === 0)
        };
    }
}

@NgModule({
    imports: [CommonModule, OverlayModule, SharedModule, RippleModule, ChevronDownIcon, AngleRightIcon, TimesIcon],
    exports: [CascadeSelect, OverlayModule, CascadeSelectSub, SharedModule],
    declarations: [CascadeSelect, CascadeSelectSub]
})
export class CascadeSelectModule {}
