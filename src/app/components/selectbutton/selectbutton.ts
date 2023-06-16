import { NgModule, Component, Input, Output, EventEmitter, forwardRef, ChangeDetectorRef, ContentChild, TemplateRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectUtils } from 'primeng/utils';
import { RippleModule } from 'primeng/ripple';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
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
        <div [ngClass]="'p-selectbutton p-buttonset p-component'" [ngStyle]="style" [class]="styleClass" role="group">
            <div
                *ngFor="let option of options; let i = index"
                #btn
                class="p-button p-component"
                [class]="option.styleClass"
                role="button"
                [attr.aria-pressed]="isSelected(option)"
                [ngClass]="{ 'p-highlight': isSelected(option), 'p-disabled': disabled || isOptionDisabled(option), 'p-button-icon-only': option.icon && !getOptionLabel(option) }"
                (click)="onItemClick($event, option, i)"
                (keydown.enter)="onItemClick($event, option, i)"
                [attr.title]="option.title"
                [attr.aria-label]="option.label"
                (blur)="onBlur()"
                [attr.tabindex]="disabled ? null : tabindex"
                [attr.aria-labelledby]="this.getOptionLabel(option)"
                pRipple
            >
                <ng-container *ngIf="!itemTemplate; else customcontent">
                    <span [ngClass]="'p-button-icon p-button-icon-left'" [class]="option.icon" *ngIf="option.icon"></span>
                    <span class="p-button-label">{{ getOptionLabel(option) }}</span>
                </ng-container>
                <ng-template #customcontent>
                    <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: option, index: i }"></ng-container>
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
     * Index of the element in tabbing order.
     * @group Props
     */
    @Input() tabindex: number = 0;
    /**
     * When specified, allows selecting multiple values.
     * @group Props
     */
    @Input() multiple: boolean | undefined;
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
    @Input() disabled: boolean | undefined;
    /**
     * A property to uniquely identify a value in options.
     * @group Props
     */
    @Input() dataKey: string | undefined;
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

    @ContentChild(TemplateRef) itemTemplate!: TemplateRef<any>;

    value: any;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

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

    onItemClick(event: Event, option: any, index: number) {
        if (this.disabled || this.isOptionDisabled(option)) {
            return;
        }

        if (this.multiple) {
            if (this.isSelected(option)) this.removeOption(option);
            else this.value = [...(this.value || []), this.getOptionValue(option)];

            this.onModelChange(this.value);

            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        } else {
            let value = this.getOptionValue(option);

            if (this.value !== value) {
                this.value = this.getOptionValue(option);
                this.onModelChange(this.value);

                this.onChange.emit({
                    originalEvent: event,
                    value: this.value
                });
            }
        }

        this.onOptionClick.emit({
            originalEvent: event,
            option: option,
            index: index
        });
    }

    onBlur() {
        this.onModelTouched();
    }

    removeOption(option: any): void {
        this.value = this.value.filter((val: any) => !ObjectUtils.equals(val, this.getOptionValue(option), this.dataKey));
    }

    isSelected(option: any) {
        let selected = false;
        let optionValue = this.getOptionValue(option);

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
            selected = ObjectUtils.equals(this.getOptionValue(option), this.value, this.dataKey);
        }

        return selected;
    }
}

@NgModule({
    imports: [CommonModule, RippleModule],
    exports: [SelectButton],
    declarations: [SelectButton]
})
export class SelectButtonModule {}
