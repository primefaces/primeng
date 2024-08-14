import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    NgModule,
    Output,
    ViewChild,
    ViewEncapsulation,
    booleanAttribute,
    forwardRef,
    inject,
    numberAttribute,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutoFocusModule } from 'primeng/autofocus';
import { ToggleSwitchChangeEvent } from './toggleswitch.interface';
import { ToggleSwitchStyle } from './style/toggleswitchstyle';
import { BaseComponent } from 'primeng/basecomponent';

export const TOGGLESWITCH_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleSwitch),
    multi: true,
};
/**
 * InputSwitch is used to select a boolean value.
 * @group Components
 */
@Component({
    selector: 'p-toggleSwitch',
    template: `
        <div
            [ngClass]="cx('root')"
            [ngStyle]="sx('root')"
            [ngStyle]="style"
            [class]="styleClass"
            (click)="onClick($event)"
            [attr.data-pc-name]="'inputswitch'"
            [attr.data-pc-section]="'root'"
        >
            <div
                class="p-hidden-accessible"
                [attr.data-pc-section]="'hiddenInputWrapper'"
                [attr.data-p-hidden-accessible]="true"
            >
                <input
                    #input
                    [attr.id]="inputId"
                    type="checkbox"
                    role="switch"
                    [ngClass]="cx('input')"
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
                    pAutoFocus
                    [autofocus]="autofocus"
                />
            </div>
            <span [ngClass]="cx('slider')" [attr.data-pc-section]="'slider'"></span>
        </div>
    `,
    providers: [TOGGLESWITCH_VALUE_ACCESSOR, ToggleSwitchStyle],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class ToggleSwitch extends BaseComponent {
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
    @Input({ transform: numberAttribute }) tabindex: number | undefined;
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
    @Input({ transform: booleanAttribute }) disabled: boolean | undefined;
    /**
     * When present, it specifies that the component cannot be edited.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) readonly: boolean | undefined;
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
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autofocus: boolean | undefined;
    /**
     * Callback to invoke when the on value change.
     * @param {ToggleSwitchChangeEvent} event - Custom change event.
     * @group Emits
     */
    @Output() onChange: EventEmitter<ToggleSwitchChangeEvent> = new EventEmitter<ToggleSwitchChangeEvent>();

    @ViewChild('input') input!: ElementRef;

    modelValue: any = false;

    focused: boolean = false;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    _componentStyle = inject(ToggleSwitchStyle);

    onClick(event: Event) {
        if (!this.disabled && !this.readonly) {
            this.modelValue = this.checked() ? this.falseValue : this.trueValue;

            this.onModelChange(this.modelValue);
            this.onChange.emit({
                originalEvent: event,
                checked: this.modelValue,
            });

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
    imports: [CommonModule, AutoFocusModule],
    exports: [ToggleSwitch],
    declarations: [ToggleSwitch],
})
export class ToggleSwitchModule {}
