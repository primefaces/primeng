import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, ContentChild, EventEmitter, forwardRef, inject, Input, NgModule, numberAttribute, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { equals, resolveFieldData } from '@primeuix/utils';
import { SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { Ripple } from 'primeng/ripple';
import { ToggleButton } from 'primeng/togglebutton';
import { SelectButtonChangeEvent, SelectButtonOptionClickEvent } from './selectbutton.interface';
import { SelectButtonStyle } from './style/selectbuttonstyle';

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
    selector: 'p-selectButton, p-selectbutton, p-select-button',
    standalone: true,
    imports: [Ripple, ToggleButton, FormsModule, CommonModule, SharedModule],
    template: `
        @for (option of options; track option; let i = $index) {
            <p-toggleButton
                [autofocus]="autofocus"
                [styleClass]="styleClass"
                [ngModel]="isSelected(option)"
                [onLabel]="this.getOptionLabel(option)"
                [offLabel]="this.getOptionLabel(option)"
                [disabled]="disabled || isOptionDisabled(option)"
                (onChange)="onOptionSelect($event, option, i)"
                [allowEmpty]="allowEmpty"
                [size]="size"
            >
                @if (itemTemplate) {
                    <ng-template #content>
                        <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: option, index: i }"></ng-container>
                    </ng-template>
                }
            </p-toggleButton>
        }
    `,
    providers: [SELECTBUTTON_VALUE_ACCESSOR, SelectButtonStyle],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.p-selectbutton]': 'true',
        '[class.p-component]': 'true',
        '[style]': 'style',
        '[attr.role]': 'group',
        '[attr.aria-labelledby]': 'ariaLabelledBy',
        '[attr.data-pc-section]': "'root'",
        '[attr.data-pc-name]': "'selectbutton'"
    }
})
export class SelectButton extends BaseComponent implements ControlValueAccessor {
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
     * Defines the size of the component.
     * @group Props
     */
    @Input() size: 'large' | 'small';
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
    /**
     * Template of an item in the list.
     * @group Templates
     */
    @ContentChild('item') itemTemplate: TemplateRef<any>;

    get equalityKey() {
        return this.optionValue ? null : this.dataKey;
    }

    value: any;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    focusedIndex: number = 0;

    _componentStyle = inject(SelectButtonStyle);

    getOptionLabel(option: any) {
        return this.optionLabel ? resolveFieldData(option, this.optionLabel) : option.label != undefined ? option.label : option;
    }

    getOptionValue(option: any) {
        return this.optionValue ? resolveFieldData(option, this.optionValue) : this.optionLabel || option.value === undefined ? option : option.value;
    }

    isOptionDisabled(option: any) {
        return this.optionDisabled ? resolveFieldData(option, this.optionDisabled) : option.disabled !== undefined ? option.disabled : false;
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
            if (selected) newValue = this.value.filter((val) => !equals(val, optionValue, this.equalityKey));
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

    changeTabIndexes(event, direction) {
        let firstTabableChild, index;

        for (let i = 0; i <= this.el.nativeElement.children.length - 1; i++) {
            if (this.el.nativeElement.children[i].getAttribute('tabindex') === '0') firstTabableChild = { elem: this.el.nativeElement.children[i], index: i };
        }

        if (direction === 'prev') {
            if (firstTabableChild.index === 0) index = this.el.nativeElement.children.length - 1;
            else index = firstTabableChild.index - 1;
        } else {
            if (firstTabableChild.index === this.el.nativeElement.children.length - 1) index = 0;
            else index = firstTabableChild.index + 1;
        }

        this.focusedIndex = index;
        this.el.nativeElement.children[index].focus();
    }

    onFocus(event: Event, index: number) {
        this.focusedIndex = index;
    }

    onBlur() {
        this.onModelTouched();
    }

    removeOption(option: any): void {
        this.value = this.value.filter((val: any) => !equals(val, this.getOptionValue(option), this.dataKey));
    }

    isSelected(option: any) {
        let selected = false;
        const optionValue = this.getOptionValue(option);

        if (this.multiple) {
            if (this.value && Array.isArray(this.value)) {
                for (let val of this.value) {
                    if (equals(val, optionValue, this.dataKey)) {
                        selected = true;
                        break;
                    }
                }
            }
        } else {
            selected = equals(this.getOptionValue(option), this.value, this.equalityKey);
        }

        return selected;
    }
}

@NgModule({
    imports: [SelectButton, SharedModule],
    exports: [SelectButton, SharedModule]
})
export class SelectButtonModule {}
