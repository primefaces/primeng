import { NgTemplateOutlet } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    ElementRef,
    forwardRef,
    HostListener,
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
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { PARENT_INSTANCE } from 'primeng/basecomponent';
import { BaseEditableHolder } from 'primeng/baseeditableholder';
import { Bind, BindModule } from 'primeng/bind';
import type { InputSize } from 'primeng/types/shared';
import type { ToggleSwitchChangeEvent, ToggleSwitchHandleTemplateContext, ToggleSwitchPassThrough } from 'primeng/types/toggleswitch';
import { ToggleSwitchStyle } from './style/toggleswitchstyle';

const TOGGLESWITCH_INSTANCE = new InjectionToken<ToggleSwitch>('TOGGLESWITCH_INSTANCE');

export const TOGGLESWITCH_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleSwitch),
    multi: true
};
/**
 * ToggleSwitch is used to select a boolean value.
 * @group Components
 */
@Component({
    selector: 'p-toggleswitch, p-toggle-switch',
    standalone: true,
    imports: [NgTemplateOutlet, AutoFocus, SharedModule, BindModule],
    template: `
        <input
            #input
            [attr.id]="inputId()"
            type="checkbox"
            role="switch"
            [class]="cx('input')"
            [checked]="$checked()"
            [attr.required]="attrRequired()"
            [attr.disabled]="attrDisabled()"
            [attr.aria-checked]="$checked()"
            [attr.aria-labelledby]="ariaLabelledBy()"
            [attr.aria-label]="ariaLabel()"
            [attr.name]="name()"
            [attr.tabindex]="tabindex()"
            (focus)="onFocus()"
            (blur)="onBlur()"
            [pAutoFocus]="autofocus()"
            [pBind]="ptm('input')"
        />
        <div [class]="cx('slider')" [pBind]="ptm('slider')" [attr.data-p]="dataP()">
            <div [class]="cx('handle')" [pBind]="ptm('handle')" [attr.data-p]="dataP()">
                @if (handleTemplate()) {
                    <ng-container *ngTemplateOutlet="handleTemplate(); context: getHandleContext()" />
                }
            </div>
        </div>
    `,
    providers: [TOGGLESWITCH_VALUE_ACCESSOR, ToggleSwitchStyle, { provide: TOGGLESWITCH_INSTANCE, useExisting: ToggleSwitch }, { provide: PARENT_INSTANCE, useExisting: ToggleSwitch }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "cx('root')",
        '[style]': "sx('root')",
        '[attr.data-p-checked]': '$checked()',
        '[attr.data-p-disabled]': '$disabled()',
        '[attr.data-p]': 'dataP()'
    },
    hostDirectives: [Bind]
})
export class ToggleSwitch extends BaseEditableHolder<ToggleSwitchPassThrough> {
    componentName = 'ToggleSwitch';

    $pcToggleSwitch: ToggleSwitch | undefined = inject(TOGGLESWITCH_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    _componentStyle = inject(ToggleSwitchStyle);

    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = input(undefined, { transform: numberAttribute });
    /**
     * Identifier of the input element.
     * @group Props
     */
    inputId = input<string>();
    /**
     * When present, it specifies that the component cannot be edited.
     * @group Props
     */
    readonly = input(false, { transform: booleanAttribute });
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
     * Used to define a string that autocomplete attribute the current element.
     * @group Props
     */
    ariaLabel = input<string>();
    /**
     * Specifies the size of the component.
     * @defaultValue undefined
     * @group Props
     */
    size = input<InputSize>();
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy = input<string>();
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus = input(false, { transform: booleanAttribute });
    /**
     * Callback to invoke when the on value change.
     * @param {ToggleSwitchChangeEvent} event - Custom change event.
     * @group Emits
     */
    onChange = output<ToggleSwitchChangeEvent>();
    /**
     * Custom handle template.
     * @param {ToggleSwitchHandleTemplateContext} context - handle context.
     * @see {@link ToggleSwitchHandleTemplateContext}
     * @group Templates
     */
    handleTemplate = contentChild<TemplateRef<ToggleSwitchHandleTemplateContext>>('handle', { descendants: false });

    inputEl = viewChild.required<ElementRef>('input');

    focused = signal(false);

    $checked = computed(() => this.modelValue() === this.trueValue());

    attrRequired = computed(() => (this.required() ? '' : undefined));

    attrDisabled = computed(() => (this.$disabled() ? '' : undefined));

    dataP = computed(() =>
        this.cn({
            checked: this.$checked(),
            disabled: this.$disabled(),
            invalid: this.invalid()
        })
    );

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    @HostListener('click', ['$event'])
    onHostClick(event: MouseEvent) {
        this.onClick(event);
    }

    onClick(event: Event) {
        if (!this.$disabled() && !this.readonly()) {
            this.writeModelValue(this.$checked() ? this.falseValue() : this.trueValue());

            this.onModelChange(this.modelValue());
            this.onChange.emit({
                originalEvent: event,
                checked: this.modelValue()
            });

            this.inputEl().nativeElement.focus();
        }
    }

    onFocus() {
        this.focused.set(true);
    }

    onBlur() {
        this.focused.set(false);
        this.onModelTouched();
    }

    getHandleContext() {
        return { checked: this.$checked() };
    }

    /**
     * @override
     *
     * @see {@link BaseEditableHolder.writeControlValue}
     * Writes the value to the control.
     */
    writeControlValue(value: any, setModelValue: (value: any) => void) {
        setModelValue(value);
    }
}

@NgModule({
    imports: [ToggleSwitch, SharedModule],
    exports: [ToggleSwitch, SharedModule]
})
export class ToggleSwitchModule {}
