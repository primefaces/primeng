import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Injectable,
    Injector,
    Input,
    NgModule,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    booleanAttribute,
    forwardRef,
    inject,
    numberAttribute,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { Nullable } from 'primeng/ts-helpers';
import { AutoFocusModule } from 'primeng/autofocus';
import { BaseComponent } from 'primeng/basecomponent';
import { RadioButtonStyle } from './style/radiobuttonstyle';
import { RadioButtonClickEvent } from './radiobutton.interface';
import { PrimeNGConfig } from 'primeng/api';

export const RADIO_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioButton),
    multi: true,
};

@Injectable({
    providedIn: 'root',
})
export class RadioControlRegistry {
    private accessors: any[] = [];

    add(control: NgControl, accessor: RadioButton) {
        this.accessors.push([control, accessor]);
    }

    remove(accessor: RadioButton) {
        this.accessors = this.accessors.filter((c) => {
            return c[1] !== accessor;
        });
    }

    select(accessor: RadioButton) {
        this.accessors.forEach((c) => {
            if (this.isSameGroup(c, accessor) && c[1] !== accessor) {
                c[1].writeValue(accessor.value);
            }
        });
    }

    private isSameGroup(controlPair: [NgControl, RadioButton], accessor: RadioButton): boolean {
        if (!controlPair[0].control) {
            return false;
        }

        return (
            controlPair[0].control.root === (accessor as any).control.control.root &&
            controlPair[1].name === accessor.name
        );
    }
}
/**
 * RadioButton is an extension to standard radio button element with theming.
 * @group Components
 */
@Component({
    selector: 'p-radioButton',
    template: `
        <div
            [ngStyle]="style"
            [ngClass]="{
                'p-radiobutton p-component': true,
                'p-radiobutton-checked': checked,
                'p-disabled': disabled,
                'p-variant-filled': variant === 'filled' || config.inputStyle() === 'filled'
            }"
            [class]="styleClass"
            [attr.data-pc-name]="'radiobutton'"
            [attr.data-pc-section]="'root'"
        >
            <input
                #input
                [attr.id]="inputId"
                type="radio"
                class="p-radiobutton-input"
                [attr.name]="name"
                [checked]="checked"
                [disabled]="disabled"
                [value]="value"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.aria-label]="ariaLabel"
                [attr.tabindex]="tabindex"
                [attr.aria-checked]="checked"
                (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)"
                (change)="onChange($event)"
                pAutoFocus
                [autofocus]="autofocus"
            />
            <div class="p-radiobutton-box" [attr.data-pc-section]="'input'">
                <div class="p-radiobutton-icon" [attr.data-pc-section]="'icon'"></div>
            </div>
        </div>
    `,
    providers: [RADIO_VALUE_ACCESSOR, RadioButtonStyle],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButton extends BaseComponent implements ControlValueAccessor, OnInit, OnDestroy {
    /**
     * Value of the radiobutton.
     * @group Props
     */
    @Input() value: any;
    /**
     * The name of the form control.
     * @group Props
     */
    @Input() formControlName: string | undefined;
    /**
     * Name of the radiobutton group.
     * @group Props
     */
    @Input() name: string | undefined;
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) disabled: boolean | undefined;
    /**
     * Specifies the input variant of the component.
     * @group Props
     */
    @Input() variant: 'filled' | 'outlined' = 'outlined';
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    @Input({ transform: numberAttribute }) tabindex: number | undefined;
    /**
     * Identifier of the focus input to match a label defined for the component.
     * @group Props
     */
    @Input() inputId: string | undefined;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    @Input() ariaLabelledBy: string | undefined;
    /**
     * Used to define a string that labels the input element.
     * @group Props
     */
    @Input() ariaLabel: string | undefined;
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
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autofocus: boolean | undefined;
    /**
     * Allows to select a boolean value.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) binary: boolean | undefined;
    /**
     * Callback to invoke on radio button click.
     * @param {RadioButtonClickEvent} event - Custom click event.
     * @group Emits
     */
    @Output() onClick: EventEmitter<RadioButtonClickEvent> = new EventEmitter<RadioButtonClickEvent>();
    /**
     * Callback to invoke when the receives focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onFocus: EventEmitter<Event> = new EventEmitter<Event>();
    /**
     * Callback to invoke when the loses focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onBlur: EventEmitter<Event> = new EventEmitter<Event>();

    @ViewChild('input') inputViewChild!: ElementRef;

    public onModelChange: Function = () => {};

    public onModelTouched: Function = () => {};

    public checked: Nullable<boolean>;

    public focused: Nullable<boolean>;

    control: Nullable<NgControl>;

    _componentStyle = inject(RadioButtonStyle);

    injector = inject(Injector);

    registry = inject(RadioControlRegistry);

    ngOnInit() {
        super.ngOnInit();
        this.control = this.injector.get(NgControl);
        this.checkName();
        this.registry.add(this.control, this);
    }

    onChange(event) {
        if (!this.disabled) {
            this.select(event);
        }
    }

    select(event: Event) {
        if (!this.disabled) {
            this.checked = true;
            this.onModelChange(this.value);
            this.registry.select(this);
            this.onClick.emit({ originalEvent: event, value: this.value });
        }
    }

    writeValue(value: any): void {
        if (!this.binary) {
            this.checked = value == this.value;
        } else {
            this.checked = !!value;
        }

        if (this.inputViewChild && this.inputViewChild.nativeElement) {
            this.inputViewChild.nativeElement.checked = this.checked;
        }

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

    onInputFocus(event: Event) {
        this.focused = true;
        this.onFocus.emit(event);
    }

    onInputBlur(event: Event) {
        this.focused = false;
        this.onModelTouched();
        this.onBlur.emit(event);
    }

    /**
     * Applies focus to input field.
     * @group Method
     */
    public focus() {
        this.inputViewChild.nativeElement.focus();
    }

    ngOnDestroy() {
        this.registry.remove(this);
        super.ngOnDestroy();
    }

    private checkName() {
        if (this.name && this.formControlName && this.name !== this.formControlName) {
            this.throwNameError();
        }
        if (!this.name && this.formControlName) {
            this.name = this.formControlName;
        }
    }

    private throwNameError() {
        throw new Error(`
          If you define both a name and a formControlName attribute on your radio button, their values
          must match. Ex: <p-radioButton formControlName="food" name="food"></p-radioButton>
        `);
    }
}

@NgModule({
    imports: [CommonModule, AutoFocusModule],
    exports: [RadioButton],
    declarations: [RadioButton],
})
export class RadioButtonModule {}
