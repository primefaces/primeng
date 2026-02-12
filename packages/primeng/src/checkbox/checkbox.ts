import { NgTemplateOutlet } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    effect,
    ElementRef,
    forwardRef,
    inject,
    InjectionToken,
    input,
    NgModule,
    numberAttribute,
    output,
    Provider,
    signal,
    TemplateRef,
    viewChild,
    ViewEncapsulation
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { contains, equals } from '@primeuix/utils';
import { SharedModule } from 'primeng/api';
import { PARENT_INSTANCE } from 'primeng/basecomponent';
import { BaseEditableHolder } from 'primeng/baseeditableholder';
import { Bind, BindModule } from 'primeng/bind';
import { CheckIcon } from 'primeng/icons/check';
import { MinusIcon } from 'primeng/icons/minus';
import { Nullable } from 'primeng/ts-helpers';
import type { CSSProperties, InputSize, InputVariant } from 'primeng/types/shared';
import { CheckboxChangeEvent, CheckboxIconTemplateContext, CheckboxPassThrough } from 'primeng/types/checkbox';
import { CheckboxStyle } from './style/checkboxstyle';

const CHECKBOX_INSTANCE = new InjectionToken<Checkbox>('CHECKBOX_INSTANCE');

export const CHECKBOX_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Checkbox),
    multi: true
};
/**
 * Checkbox is an extension to standard checkbox element with theming.
 * @group Components
 */
@Component({
    selector: 'p-checkbox, p-check-box',
    standalone: true,
    imports: [NgTemplateOutlet, SharedModule, CheckIcon, MinusIcon, BindModule],
    template: `
        <input
            #input
            [attr.id]="inputId()"
            type="checkbox"
            [attr.value]="value()"
            [attr.name]="name()"
            [checked]="checked()"
            [attr.tabindex]="tabindex()"
            [attr.required]="requiredAttr()"
            [attr.readonly]="readonlyAttr()"
            [attr.disabled]="disabledAttr()"
            [attr.aria-labelledby]="ariaLabelledBy()"
            [attr.aria-label]="ariaLabel()"
            [style]="inputStyle()"
            [class]="cn(cx('input'), inputClass())"
            [pBind]="ptm('input')"
            (focus)="onInputFocus($event)"
            (blur)="onInputBlur($event)"
            (change)="handleChange($event)"
        />
        <div [class]="cx('box')" [pBind]="ptm('box')" [attr.data-p]="dataP()">
            @if (!iconTemplate()) {
                @if (checked()) {
                    @if (checkboxIcon()) {
                        <span [class]="cn(cx('icon'), checkboxIcon())" [pBind]="ptm('icon')" [attr.data-p]="dataP()"></span>
                    } @else {
                        <svg data-p-icon="check" [class]="cx('icon')" [pBind]="ptm('icon')" [attr.data-p]="dataP()" />
                    }
                }
                @if (_indeterminate()) {
                    <svg data-p-icon="minus" [class]="cx('icon')" [pBind]="ptm('icon')" [attr.data-p]="dataP()" />
                }
            } @else {
                <ng-container *ngTemplateOutlet="iconTemplate(); context: iconTemplateContext()"></ng-container>
            }
        </div>
    `,
    providers: [CHECKBOX_VALUE_ACCESSOR, CheckboxStyle, { provide: CHECKBOX_INSTANCE, useExisting: Checkbox }, { provide: PARENT_INSTANCE, useExisting: Checkbox }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "cx('root')",
        '[attr.data-p-highlight]': 'checked()',
        '[attr.data-p-checked]': 'checked()',
        '[attr.data-p-disabled]': '$disabled()',
        '[attr.data-p]': 'dataP()'
    },
    hostDirectives: [Bind]
})
export class Checkbox extends BaseEditableHolder<CheckboxPassThrough> {
    componentName = 'Checkbox';

    /**
     * Value of the checkbox.
     * @group Props
     */
    value = input<any>();
    /**
     * Allows to select a boolean value instead of multiple values.
     * @group Props
     */
    binary = input(false, { transform: booleanAttribute });
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
     * Inline style of the input element.
     * @group Props
     */
    inputStyle = input<CSSProperties>();
    /**
     * Style class of the input element.
     * @group Props
     */
    inputClass = input<string>();
    /**
     * When present, it specifies input state as indeterminate.
     * @group Props
     */
    indeterminate = input(false, { transform: booleanAttribute });
    /**
     * Form control value.
     * @group Props
     */
    formControl = input<FormControl>();
    /**
     * Icon class of the checkbox icon.
     * @group Props
     */
    checkboxIcon = input<string>();
    /**
     * When present, it specifies that the component cannot be edited.
     * @group Props
     */
    readonly = input(false, { transform: booleanAttribute });
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus = input(false, { transform: booleanAttribute });
    /**
     * Value in checked state.
     * @group Props
     */
    trueValue = input<any>(true);
    /**
     * Value in unchecked state.
     * @group Props
     */
    falseValue = input<any>(false);
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
     * Callback to invoke on value change.
     * @param {CheckboxChangeEvent} event - Custom value change event.
     * @group Emits
     */
    onChange = output<CheckboxChangeEvent>();
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

    inputViewChild = viewChild<ElementRef>('input');

    /**
     * Custom checkbox icon template.
     * @group Templates
     */
    iconTemplate = contentChild<TemplateRef<CheckboxIconTemplateContext>>('icon', { descendants: false });

    _indeterminate = signal<boolean>(false);

    focused = signal(false);

    _componentStyle = inject(CheckboxStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    $pcCheckbox: Checkbox | undefined = inject(CHECKBOX_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    $variant = computed(() => this.variant() || this.config.inputStyle() || this.config.inputVariant());

    requiredAttr = computed(() => (this.required() ? '' : undefined));

    readonlyAttr = computed(() => (this.readonly() ? '' : undefined));

    disabledAttr = computed(() => (this.$disabled() ? '' : undefined));

    checked = computed(() => {
        if (this._indeterminate()) return false;
        return this.binary() ? this.modelValue() === this.trueValue() : contains(this.value(), this.modelValue());
    });

    iconTemplateContext = computed(() => ({
        checked: this.checked(),
        class: this.cx('icon'),
        dataP: this.dataP()
    }));

    dataP = computed(() => {
        return this.cn({
            invalid: this.invalid(),
            checked: this.checked(),
            disabled: this.$disabled(),
            filled: this.$variant() === 'filled',
            [this.size() as string]: this.size()
        });
    });

    constructor() {
        super();
        effect(() => {
            const indeterminate = this.indeterminate();
            this._indeterminate.set(indeterminate);
        });
    }

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    updateModel(event: Event) {
        let newModelValue: any;

        /*
         * When `formControlName` or `formControl` is used - `writeValue` is not called after control changes.
         * Otherwise it is causing multiple references to the actual value: there is one array reference inside the component and another one in the control value.
         * `selfControl` is the source of truth of references, it is made to avoid reference loss.
         * */
        const selfControl = this.injector.get<NgControl | null>(NgControl, null, { optional: true, self: true });

        const currentModelValue = selfControl && !this.formControl() ? selfControl.value : this.modelValue();

        if (!this.binary()) {
            if (this.checked() || this._indeterminate()) newModelValue = currentModelValue.filter((val: unknown) => !equals(val, this.value()));
            else newModelValue = currentModelValue ? [...currentModelValue, this.value()] : [this.value()];

            this.onModelChange(newModelValue);
            this.writeModelValue(newModelValue);

            const formControl = this.formControl();
            if (formControl) {
                formControl.setValue(newModelValue);
            }
        } else {
            newModelValue = this._indeterminate() ? this.trueValue() : this.checked() ? this.falseValue() : this.trueValue();
            this.writeModelValue(newModelValue);
            this.onModelChange(newModelValue);
        }

        if (this._indeterminate()) {
            this._indeterminate.set(false);
        }

        this.onChange.emit({ checked: newModelValue, originalEvent: event });
    }

    handleChange(event: Event) {
        if (!this.readonly()) {
            this.updateModel(event);
        }
    }

    onInputFocus(event: FocusEvent) {
        this.focused.set(true);
        this.onFocus.emit(event);
    }

    onInputBlur(event: FocusEvent) {
        this.focused.set(false);
        this.onBlur.emit(event);
        this.onModelTouched();
    }

    focus() {
        this.inputViewChild()?.nativeElement.focus();
    }

    /**
     * @override
     *
     * @see {@link BaseEditableHolder.writeControlValue}
     * Writes the value to the control.
     */
    writeControlValue(value: any, setModelValue: (value: any) => void): void {
        setModelValue(value);
    }
}

@NgModule({
    imports: [Checkbox, SharedModule],
    exports: [Checkbox, SharedModule]
})
export class CheckboxModule {}
