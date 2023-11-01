import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgModule, Output, ViewChild, ViewEncapsulation, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputSwitchOnChangeEvent } from './inputswitch.interface';

export const INPUTSWITCH_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputSwitch),
    multi: true
};
/**
 * InputSwitch is used to select a boolean value.
 * @group Components
 */
@Component({
    selector: 'p-inputSwitch',
    template: `
        <div
            [ngClass]="{ 'p-inputswitch p-component': true, 'p-inputswitch-checked': checked(), 'p-disabled': disabled, 'p-focus': focused }"
            [ngStyle]="style"
            [class]="styleClass"
            (click)="onClick($event)"
            [attr.data-pc-name]="'inputswitch'"
            [attr.data-pc-section]="'root'"
        >
            <div class="p-hidden-accessible" [attr.data-pc-section]="'hiddenInputWrapper'" [attr.data-p-hidden-accessible]="true">
                <input
                    #input
                    [attr.id]="inputId"
                    type="checkbox"
                    role="switch"
                    [checked]="checked()"
                    [disabled]="disabled"
                    [attr.aria-checked]="checked()"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    [attr.aria-label]="ariaLabel"
                    [attr.name]="name"
                    [attr.tabindex]="tabindex"
                    (focus)="onFocus()"
                    (blur)="onBlur()"
                    [attr.data-pc-section]="'hiddenInput'"
                />
            </div>
            <span class="p-inputswitch-slider" [attr.data-pc-section]="'slider'"></span>
        </div>
    `,
    providers: [INPUTSWITCH_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./inputswitch.css'],
    host: {
        class: 'p-element'
    }
})
export class InputSwitch {
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    @Input() tabindex: number | undefined;
    /**
     * Identifier of the input element.
     * @group Props
     */
    @Input() inputId: string | undefined;
    /**
     * Name of the input element.
     * @group Props
     */
    @Input() name: string | undefined;
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    @Input() disabled: boolean | undefined;
    /**
     * When present, it specifies that the component cannot be edited.
     * @group Props
     */
    @Input() readonly: boolean | undefined;
    /**
     * Value in checked state.
     * @group Props
     */
    @Input() trueValue: any = true;
    /**
     * Value in unchecked state.
     * @group Props
     */
    @Input() falseValue: any = false;
    /**
     * Used to define a string that autocomplete attribute the current element.
     * @group Props
     */
    @Input() ariaLabel: string | undefined;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    @Input() ariaLabelledBy: string | undefined;
    /**
     * Callback to invoke when the on value change.
     * @param {InputSwitchOnChangeEvent} event - Custom change event.
     * @group Emits
     */
    @Output() onChange: EventEmitter<InputSwitchOnChangeEvent> = new EventEmitter<InputSwitchOnChangeEvent>();

    @ViewChild('input') input!: ElementRef;

    modelValue: any = false;

    focused: boolean = false;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    constructor(private cd: ChangeDetectorRef) {}

    onClick(event: Event) {
        if (!this.disabled && !this.readonly) {
            this.modelValue = this.checked() ? this.falseValue : this.trueValue;

            this.onModelChange(this.modelValue);
            this.onChange.emit({
                originalEvent: event,
                checked: this.modelValue
            });

            event.preventDefault();
            this.input.nativeElement.focus();
        }
    }

    onFocus() {
        this.focused = true;
    }

    onBlur() {
        this.focused = false;
        this.onModelTouched();
    }

    writeValue(value: any): void {
        this.modelValue = value;
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

    checked() {
        return this.modelValue === this.trueValue;
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [InputSwitch],
    declarations: [InputSwitch]
})
export class InputSwitchModule {}
