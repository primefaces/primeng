import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, ElementRef, EventEmitter, forwardRef, inject, Injectable, Injector, input, Input, NgModule, numberAttribute, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { BaseEditableHolder } from 'primeng/baseeditableholder';
import { Nullable } from 'primeng/ts-helpers';
import { RadioButtonClickEvent } from './radiobutton.interface';
import { RadioButtonStyle } from './style/radiobuttonstyle';

export const RADIO_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioButton),
    multi: true
};

@Injectable({
    providedIn: 'root'
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

        return controlPair[0].control.root === (accessor as any).control.control.root && controlPair[1].name() === accessor.name();
    }
}
/**
 * RadioButton is an extension to standard radio button element with theming.
 * @group Components
 */
@Component({
    selector: 'p-radioButton, p-radiobutton, p-radio-button',
    standalone: true,
    imports: [CommonModule, AutoFocus, SharedModule],
    template: `
        <input
            #input
            [attr.id]="inputId"
            type="radio"
            [class]="cx('input')"
            [attr.name]="name()"
            [attr.required]="required() ? '' : undefined"
            [attr.disabled]="disabled() ? '' : undefined"
            [checked]="checked"
            [attr.value]="modelValue()"
            [attr.aria-labelledby]="ariaLabelledBy"
            [attr.aria-label]="ariaLabel"
            [attr.tabindex]="tabindex"
            [attr.aria-checked]="checked"
            (focus)="onInputFocus($event)"
            (blur)="onInputBlur($event)"
            (change)="onChange($event)"
            [pAutoFocus]="autofocus"
        />
        <div [class]="cx('box')" [attr.data-pc-section]="'input'">
            <div [class]="cx('icon')" [attr.data-pc-section]="'icon'"></div>
        </div>
    `,
    providers: [RADIO_VALUE_ACCESSOR, RadioButtonStyle],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.data-pc-name]': "'radiobutton'",
        '[attr.data-pc-section]': "'root'",
        '[class]': "cx('root')"
    }
})
export class RadioButton extends BaseEditableHolder implements ControlValueAccessor, OnInit, OnDestroy {
    /**
     * Value of the radiobutton.
     * @group Props
     */
    @Input() value: any;
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
     * Style class of the component.
     * @deprecated since v20.0.0, use `class` instead.
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
     * Specifies the input variant of the component.
     * @defaultValue undefined
     * @group Props
     */
    variant = input<'filled' | 'outlined' | undefined>();
    /**
     * Specifies the size of the component.
     * @defaultValue undefined
     * @group Props
     */
    size = input<'large' | 'small' | undefined>();
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

    $variant = computed(() => this.variant() || this.config.inputStyle() || this.config.inputVariant());

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
        this.registry.add(this.control, this);
    }

    onChange(event) {
        if (!this.disabled()) {
            this.select(event);
        }
    }

    select(event: Event) {
        if (!this.disabled()) {
            this.checked = true;
            this.writeModelValue(this.checked);
            this.onModelChange(this.value);
            this.registry.select(this);
            this.onClick.emit({ originalEvent: event, value: this.value });
        }
    }

    writeValue(value: any): void {
        this.checked = !this.binary ? value == this.value : !!value;
        this.writeModelValue(this.checked);
        this.cd.markForCheck();
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
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
}

@NgModule({
    imports: [RadioButton, SharedModule],
    exports: [RadioButton, SharedModule]
})
export class RadioButtonModule {}
