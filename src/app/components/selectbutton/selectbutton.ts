import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, NgModule, Output, TemplateRef, ViewChild, ViewEncapsulation, booleanAttribute, forwardRef, numberAttribute } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { Nullable } from 'primeng/ts-helpers';
import { ObjectUtils } from 'primeng/utils';
import { AutoFocusModule } from 'primeng/autofocus';
import { SelectButtonChangeEvent, SelectButtonOptionClickEvent } from './selectbutton.interface';

export const SELECTBUTTON_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectButton),
    multi: true
};
/**
 * SelectButton is used to choose single or multiple items from a list using buttons.
 * @group Components
 */
@Component({
    selector: 'p-selectButton',
    template: `
        <div #container [ngClass]="'p-selectbutton p-buttonset p-component'" [ngStyle]="style" [class]="styleClass" role="group" [attr.aria-labelledby]="ariaLabelledBy" [attr.data-pc-name]="'selectbutton'" [attr.data-pc-section]="'root'">
            <div
                *ngFor="let option of options; let i = index"
                pRipple
                [attr.tabindex]="i === focusedIndex ? '0' : '-1'"
                [attr.aria-label]="option.label"
                [role]="multiple ? 'checkbox' : 'radio'"
                [attr.aria-checked]="isSelected(option)"
                [attr.aria-disabled]="optionDisabled"
                class="p-button p-component"
                [class]="option.styleClass"
                [ngClass]="{ 'p-highlight': isSelected(option), 'p-disabled': disabled || isOptionDisabled(option), 'p-button-icon-only': option.icon && !getOptionLabel(option) }"
                (click)="onOptionSelect($event, option, i)"
                (keydown)="onKeyDown($event, option, i)"
                [attr.title]="option.title"
                (focus)="onFocus($event, i)"
                (blur)="onBlur()"
                [attr.aria-labelledby]="this.getOptionLabel(option)"
                [attr.data-pc-section]="'button'"
                pAutoFocus
                [autofocus]="autofocus"
            >
                <ng-container *ngIf="!itemTemplate; else customcontent">
                    <span [ngClass]="'p-button-icon p-button-icon-left'" [class]="option.icon" *ngIf="option.icon" [attr.data-pc-section]="'icon'"></span>
                    <span class="p-button-label" [attr.data-pc-section]="'label'">{{ getOptionLabel(option) }}</span>
                </ng-container>
                <ng-template #customcontent>
                    <ng-container *ngTemplateOutlet="selectButtonTemplate; context: { $implicit: option, index: i }"></ng-container>
                </ng-template>
            </div>
        </div>
    `,
    providers: [SELECTBUTTON_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['../button/button.css'],
    host: {
        class: 'p-element'
    }
})
export class SelectButton implements ControlValueAccessor {
    /**
     * An array of selectitems to display as the available options.
     * @group Props
     */
    @Input() options: any[] | undefined;
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
     * Whether selection can be cleared.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) unselectable: boolean = false;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    @Input({ transform: numberAttribute }) tabindex: number = 0;
    /**
     * When specified, allows selecting multiple values.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) multiple: boolean | undefined;
    /**
     * Whether selection can not be cleared.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) allowEmpty: boolean = true;
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: any;
    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    @Input() ariaLabelledBy: string | undefined;
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) disabled: boolean | undefined;
    /**
     * A property to uniquely identify a value in options.
     * @group Props
     */
    @Input() dataKey: string | undefined;
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autofocus: boolean | undefined;
    /**
     * Callback to invoke on input click.
     * @param {SelectButtonOptionClickEvent} event - Custom click event.
     * @group Emits
     */
    @Output() onOptionClick: EventEmitter<SelectButtonOptionClickEvent> = new EventEmitter<SelectButtonOptionClickEvent>();
    /**
     * Callback to invoke on selection change.
     * @param {SelectButtonChangeEvent} event - Custom change event.
     * @group Emits
     */
    @Output() onChange: EventEmitter<SelectButtonChangeEvent> = new EventEmitter<SelectButtonChangeEvent>();

    @ViewChild('container') container: Nullable<ElementRef>;

    @ContentChild(PrimeTemplate) itemTemplate!: PrimeTemplate;

    public get selectButtonTemplate(): TemplateRef<any> {
        return this.itemTemplate?.template;
    }

    get equalityKey() {
        return this.optionValue ? null : this.dataKey;
    }

    value: any;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    focusedIndex: number = 0;

    constructor(public cd: ChangeDetectorRef) {}

    getOptionLabel(option: any) {
        return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : option.label != undefined ? option.label : option;
    }

    getOptionValue(option: any) {
        return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : this.optionLabel || option.value === undefined ? option : option.value;
    }

    isOptionDisabled(option: any) {
        return this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : option.disabled !== undefined ? option.disabled : false;
    }

    writeValue(value: any): void {
        this.value = value;
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

    onOptionSelect(event, option, index) {
        if (this.disabled || this.isOptionDisabled(option)) {
            return;
        }

        let selected = this.isSelected(option);

        if (selected && this.unselectable) {
            return;
        }

        let optionValue = this.getOptionValue(option);
        let newValue;

        if (this.multiple) {
            if (selected) newValue = this.value.filter((val) => !ObjectUtils.equals(val, optionValue, this.equalityKey));
            else newValue = this.value ? [...this.value, optionValue] : [optionValue];
        } else {
            if (selected && !this.allowEmpty) {
                return;
            }
            newValue = selected ? null : optionValue;
        }

        this.focusedIndex = index;
        this.value = newValue;
        this.onModelChange(this.value);

        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });

        this.onOptionClick.emit({
            originalEvent: event,
            option: option,
            index: index
        });
    }

    onKeyDown(event, option, index) {
        switch (event.code) {
            case 'Space': {
                this.onOptionSelect(event, option, index);
                event.preventDefault();
                break;
            }

            case 'ArrowDown':

            case 'ArrowRight': {
                this.changeTabIndexes(event, 'next');
                event.preventDefault();
                break;
            }

            case 'ArrowUp':

            case 'ArrowLeft': {
                this.changeTabIndexes(event, 'prev');
                event.preventDefault();
                break;
            }

            default:
                //no op
                break;
        }
    }

    changeTabIndexes(event, direction) {
        let firstTabableChild, index;

        for (let i = 0; i <= this.container.nativeElement.children.length - 1; i++) {
            if (this.container.nativeElement.children[i].getAttribute('tabindex') === '0') firstTabableChild = { elem: this.container.nativeElement.children[i], index: i };
        }

        if (direction === 'prev') {
            if (firstTabableChild.index === 0) index = this.container.nativeElement.children.length - 1;
            else index = firstTabableChild.index - 1;
        } else {
            if (firstTabableChild.index === this.container.nativeElement.children.length - 1) index = 0;
            else index = firstTabableChild.index + 1;
        }

        this.focusedIndex = index;
        this.container.nativeElement.children[index].focus();
    }

    onFocus(event: Event, index: number) {
        this.focusedIndex = index;
    }

    onBlur() {
        this.onModelTouched();
    }

    removeOption(option: any): void {
        this.value = this.value.filter((val: any) => !ObjectUtils.equals(val, this.getOptionValue(option), this.dataKey));
    }

    isSelected(option: any) {
        let selected = false;
        const optionValue = this.getOptionValue(option);

        if (this.multiple) {
            if (this.value && Array.isArray(this.value)) {
                for (let val of this.value) {
                    if (ObjectUtils.equals(val, optionValue, this.dataKey)) {
                        selected = true;
                        break;
                    }
                }
            }
        } else {
            selected = ObjectUtils.equals(this.getOptionValue(option), this.value, this.equalityKey);
        }

        return selected;
    }
}

@NgModule({
    imports: [CommonModule, RippleModule, SharedModule, AutoFocusModule],
    exports: [SelectButton, SharedModule],
    declarations: [SelectButton]
})
export class SelectButtonModule {}
