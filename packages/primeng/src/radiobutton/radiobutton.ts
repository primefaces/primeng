import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    forwardRef,
    inject,
    Injectable,
    InjectionToken,
    Injector,
    input,
    NgModule,
    numberAttribute,
    output,
    Provider,
    signal,
    viewChild,
    ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { PARENT_INSTANCE } from 'primeng/basecomponent';
import { BaseEditableHolder } from 'primeng/baseeditableholder';
import { Bind, BindModule } from 'primeng/bind';
import { Nullable } from 'primeng/ts-helpers';
import type { RadioButtonClickEvent, RadioButtonPassThrough } from 'primeng/types/radiobutton';
import type { InputSize, InputVariant } from 'primeng/types/shared';
import { RadioButtonStyle } from './style/radiobuttonstyle';

const RADIOBUTTON_INSTANCE = new InjectionToken<RadioButton>('RADIOBUTTON_INSTANCE');

export const RADIO_VALUE_ACCESSOR: Provider = {
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
                c[1].writeValue(accessor.value());
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
    selector: 'p-radiobutton, p-radio-button',
    standalone: true,
    imports: [AutoFocus, SharedModule, BindModule],
    template: `
        <input
            #input
            [attr.id]="inputId()"
            type="radio"
            [class]="cx('input')"
            [attr.name]="name()"
            [attr.required]="attrRequired()"
            [attr.disabled]="attrDisabled()"
            [checked]="checked()"
            [attr.value]="modelValue()"
            [attr.aria-labelledby]="ariaLabelledBy()"
            [attr.aria-label]="ariaLabel()"
            [attr.aria-checked]="checked()"
            [attr.tabindex]="tabindex()"
            (focus)="onInputFocus($event)"
            (blur)="onInputBlur($event)"
            (change)="onChange($event)"
            [pAutoFocus]="autofocus()"
            [pBind]="ptm('input')"
        />
        <div [class]="cx('box')" [pBind]="ptm('box')">
            <div [class]="cx('icon')" [pBind]="ptm('icon')"></div>
        </div>
    `,
    providers: [RADIO_VALUE_ACCESSOR, RadioButtonStyle, { provide: RADIOBUTTON_INSTANCE, useExisting: RadioButton }, { provide: PARENT_INSTANCE, useExisting: RadioButton }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "cx('root')",
        '[attr.data-p-disabled]': '$disabled()',
        '[attr.data-p-checked]': 'checked()',
        '[attr.data-p]': 'dataP()'
    },
    hostDirectives: [Bind]
})
export class RadioButton extends BaseEditableHolder<RadioButtonPassThrough> {
    componentName = 'RadioButton';

    $pcRadioButton: RadioButton | undefined = inject(RADIOBUTTON_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    /**
     * Value of the radiobutton.
     * @group Props
     */
    value = input<any>();
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = input<number>();
    /**
     * Identifier of the focus input to match a label defined for the component.
     * @group Props
     */
    inputId = input<string>();
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy = input<string>();
    /**
     * Used to define a string that labels the input element.
     * @group Props
     */
    ariaLabel = input<string>();
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus = input(false, { transform: booleanAttribute });
    /**
     * Allows to select a boolean value.
     * @group Props
     */
    binary = input(false, { transform: booleanAttribute });
    /**
     * Specifies the input variant of the component.
     * @defaultValue undefined
     * @group Props
     */
    variant = input<InputVariant>();
    /**
     * Specifies the size of the component.
     * @defaultValue undefined
     * @group Props
     */
    size = input<InputSize>();
    /**
     * Callback to invoke on radio button click.
     * @param {RadioButtonClickEvent} event - Custom click event.
     * @group Emits
     */
    onClick = output<RadioButtonClickEvent>();
    /**
     * Callback to invoke when the receives focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onFocus = output<Event>();
    /**
     * Callback to invoke when the loses focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onBlur = output<Event>();

    inputViewChild = viewChild.required<ElementRef>('input');

    $variant = computed(() => this.variant() || this.config.inputVariant());

    attrRequired = computed(() => (this.required() ? '' : undefined));

    attrDisabled = computed(() => (this.$disabled() ? '' : undefined));

    dataP = computed(() =>
        this.cn({
            invalid: this.invalid(),
            checked: this.checked(),
            disabled: this.$disabled(),
            filled: this.$variant() === 'filled',
            [this.size() as string]: this.size()
        })
    );

    checked = signal<Nullable<boolean>>(null);

    public focused: Nullable<boolean>;

    control: Nullable<NgControl>;

    _componentStyle = inject(RadioButtonStyle);

    injector = inject(Injector);

    registry = inject(RadioControlRegistry);

    onInit() {
        this.control = this.injector.get(NgControl);
        this.registry.add(this.control, this);
    }

    onChange(event) {
        if (!this.$disabled()) {
            this.select(event);
        }
    }

    select(event: Event) {
        if (!this.$disabled()) {
            this.checked.set(true);
            this.writeModelValue(this.checked());
            this.onModelChange(this.value());
            this.registry.select(this);
            this.onClick.emit({ originalEvent: event, value: this.value() });
        }
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
        this.inputViewChild().nativeElement.focus();
    }

    /**
     * @override
     *
     * @see {@link BaseEditableHolder.writeControlValue}
     * Writes the value to the control.
     */
    writeControlValue(value: any, setModelValue: (value: any) => void) {
        this.checked.set(!this.binary() ? value == this.value() : !!value);
        setModelValue(this.checked());
    }

    onDestroy() {
        this.registry.remove(this);
    }
}

@NgModule({
    imports: [RadioButton, SharedModule],
    exports: [RadioButton, SharedModule]
})
export class RadioButtonModule {}
