import { NgClass, NgStyle } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OutputEmitterRef,
    forwardRef,
    inject,
    input,
    model,
    signal,
    computed,
    NgModule,
    numberAttribute,
    output,
    viewChild,
    ViewEncapsulation,
    WritableSignal,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutoFocus } from 'primeng/autofocus';
import { ToggleSwitchChangeEvent } from './toggleswitch.interface';
import { ToggleSwitchStyle } from './style/toggleswitchstyle';
import { BaseComponent } from 'primeng/basecomponent';

export const TOGGLESWITCH_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleSwitch),
    multi: true,
};
/**
 * ToggleSwitch is used to select a boolean value.
 * @group Components
 */
@Component({
    selector: 'p-toggleswitch, p-toggleSwitch',
    standalone: true,
    imports: [NgClass, NgStyle, AutoFocus],
    template: `
        <div
            [ngClass]="cx('root')"
            [style]="sx('root')"
            [ngStyle]="style()"
            [class]="styleClass()"
            (click)="onClick($event)"
            [attr.data-pc-name]="'toggleswitch'"
            [attr.data-pc-section]="'root'"
        >
            <input
                #input
                [attr.id]="inputId()"
                type="checkbox"
                role="switch"
                [ngClass]="cx('input')"
                [checked]="checked()"
                [disabled]="disabled()"
                [attr.aria-checked]="checked()"
                [attr.aria-labelledby]="ariaLabelledBy()"
                [attr.aria-label]="ariaLabel()"
                [attr.name]="name()"
                [attr.tabindex]="tabindex()"
                (focus)="onFocus()"
                (blur)="onBlur()"
                [attr.data-pc-section]="'hiddenInput'"
                pAutoFocus
                [autofocus]="autofocus()"
            />
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
    style = input<{ [klass: string]: any } | null>();
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass = input<string>();
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = input<number, any>(undefined, { transform: numberAttribute });
    /**
     * Identifier of the input element.
     * @group Props
     */
    inputId = input<string>();
    /**
     * Name of the input element.
     * @group Props
     */
    name = input<string>();
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    disabled = model<boolean>();
    /**
     * When present, it specifies that the component cannot be edited.
     * @group Props
     */
    readonly = input<boolean, any>(undefined, { transform: booleanAttribute });
    /**
     * Value in checked state.
     * @group Props
     */
    trueValue = input<boolean, any>(true, { transform: booleanAttribute });
    /**
     * Value in unchecked state.
     * @group Props
     */
    falseValue = input<boolean, any>(false, { transform: booleanAttribute });
    /**
     * Used to define a string that autocomplete attribute the current element.
     * @group Props
     */
    ariaLabel = input<string>();
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy = input<string>();
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus = input<boolean, any>(undefined, { transform: booleanAttribute });
    /**
     * Callback to invoke when the on value change.
     * @param {ToggleSwitchChangeEvent} event - Custom change event.
     * @group Emits
     */
    onChange: OutputEmitterRef<ToggleSwitchChangeEvent> = output<ToggleSwitchChangeEvent>();

    input = viewChild.required<ElementRef>('input');

    modelValue: WritableSignal<boolean> = signal<boolean>(false);

    focused: WritableSignal<boolean> = signal<boolean>(false);

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    _componentStyle = inject(ToggleSwitchStyle);

    onClick(event: Event) {
        if (!this.disabled() && !this.readonly()) {
            this.modelValue.set(this.checked() ? this.falseValue() : this.trueValue());
            this.onModelChange(this.modelValue());
            this.onChange.emit({ originalEvent: event, checked: this.modelValue() });
            this.input().nativeElement.focus();
        }
    }

    onFocus() {
        this.focused.set(true);
    }

    onBlur() {
        this.focused.set(false);
        this.onModelTouched();
    }

    writeValue(value: any): void {
        this.modelValue.set(value);
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    setDisabledState(val: boolean): void {
        this.disabled.set(val);
    }

    checked = computed<boolean>(() => this.modelValue() === this.trueValue());
}

@NgModule({
    imports: [ToggleSwitch],
    exports: [ToggleSwitch],
})
export class ToggleSwitchModule {}
