import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, forwardRef, HostListener, inject, InjectionToken, input, NgModule, numberAttribute, output, Provider, signal, TemplateRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { PARENT_INSTANCE } from 'primeng/basecomponent';
import { BaseEditableHolder } from 'primeng/baseeditableholder';
import { Bind, BindModule } from 'primeng/bind';
import { Ripple } from 'primeng/ripple';
import type { InputSize } from 'primeng/types/shared';
import type { ToggleButtonChangeEvent, ToggleButtonContentTemplateContext, ToggleButtonIconPos, ToggleButtonIconTemplateContext, ToggleButtonPassThrough } from 'primeng/types/togglebutton';
import { ToggleButtonStyle } from './style/togglebuttonstyle';

const TOGGLEBUTTON_INSTANCE = new InjectionToken<ToggleButton>('TOGGLEBUTTON_INSTANCE');

export const TOGGLEBUTTON_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleButton),
    multi: true
};
/**
 * ToggleButton is used to select a boolean value using a button.
 * @group Components
 */
@Component({
    selector: 'p-togglebutton, p-toggle-button',
    standalone: true,
    imports: [NgTemplateOutlet, SharedModule, BindModule],
    hostDirectives: [{ directive: Ripple }, Bind],
    host: {
        '[class]': "cx('root')",
        '[attr.aria-labelledby]': 'ariaLabelledBy()',
        '[attr.aria-label]': 'ariaLabel()',
        '[attr.aria-pressed]': 'ariaPressed()',
        '[attr.role]': '"button"',
        '[attr.tabindex]': '$tabindex()',
        '[attr.data-pc-name]': "'togglebutton'",
        '[attr.data-p-checked]': 'active()',
        '[attr.data-p-disabled]': '$disabled()',
        '[attr.data-p]': 'dataP()'
    },
    template: `<span [class]="cx('content')" [pBind]="ptm('content')" [attr.data-p]="dataP()">
        <ng-container *ngTemplateOutlet="contentTemplate(); context: getTemplateContext()"></ng-container>
        @if (!contentTemplate()) {
            @if (!iconTemplate()) {
                @if (onIcon() || offIcon()) {
                    <span [class]="iconClass()" [pBind]="ptm('icon')"></span>
                }
            } @else {
                <ng-container *ngTemplateOutlet="iconTemplate(); context: getTemplateContext()"></ng-container>
            }
            <span [class]="cx('label')" [pBind]="ptm('label')">{{ labelText() }}</span>
        }
    </span>`,
    providers: [TOGGLEBUTTON_VALUE_ACCESSOR, ToggleButtonStyle, { provide: TOGGLEBUTTON_INSTANCE, useExisting: ToggleButton }, { provide: PARENT_INSTANCE, useExisting: ToggleButton }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleButton extends BaseEditableHolder<ToggleButtonPassThrough> {
    componentName = 'ToggleButton';

    $pcToggleButton: ToggleButton | undefined = inject(TOGGLEBUTTON_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    _componentStyle = inject(ToggleButtonStyle);

    /**
     * Label for the on state.
     * @group Props
     */
    onLabel = input('Yes');
    /**
     * Label for the off state.
     * @group Props
     */
    offLabel = input('No');
    /**
     * Icon for the on state.
     * @group Props
     */
    onIcon = input<string>();
    /**
     * Icon for the off state.
     * @group Props
     */
    offIcon = input<string>();
    /**
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    ariaLabel = input<string>();
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy = input<string>();
    /**
     * Identifier of the focus input to match a label defined for the component.
     * @group Props
     */
    inputId = input<string>();
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = input<number, any>(0, { transform: numberAttribute });
    /**
     * Position of the icon.
     * @group Props
     */
    iconPos = input<ToggleButtonIconPos>('left');
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus = input(false, { transform: booleanAttribute });
    /**
     * Defines the size of the component.
     * @group Props
     */
    size = input<InputSize>();
    /**
     * Whether selection can not be cleared.
     * @group Props
     */
    allowEmpty = input<boolean>();
    /**
     * Spans 100% width of the container when enabled.
     * @defaultValue undefined
     * @group Props
     */
    fluid = input(undefined, { transform: booleanAttribute });
    /**
     * Callback to invoke on value change.
     * @param {ToggleButtonChangeEvent} event - Custom change event.
     * @group Emits
     */
    onChange = output<ToggleButtonChangeEvent>();
    /**
     * Custom icon template.
     * @param {ToggleButtonIconTemplateContext} context - icon context.
     * @see {@link ToggleButtonIconTemplateContext}
     * @group Templates
     */
    iconTemplate = contentChild<TemplateRef<ToggleButtonIconTemplateContext>>('icon', { descendants: false });
    /**
     * Custom content template.
     * @param {ToggleButtonContentTemplateContext} context - content context.
     * @see {@link ToggleButtonContentTemplateContext}
     * @group Templates
     */
    contentTemplate = contentChild<TemplateRef<ToggleButtonContentTemplateContext>>('content', { descendants: false });

    checked = signal(false);

    hasOnLabel = computed(() => !!(this.onLabel() && this.onLabel().length > 0));

    hasOffLabel = computed(() => !!(this.offLabel() && this.offLabel().length > 0));

    active = computed(() => this.checked() === true);

    dataP = computed(() =>
        this.cn({
            checked: this.active(),
            invalid: this.invalid(),
            [this.size() as string]: this.size()
        })
    );

    $tabindex = computed(() => (this.tabindex() !== undefined ? this.tabindex() : !this.$disabled() ? 0 : -1));

    iconClass = computed(() => this.cn(this.cx('icon'), this.checked() ? this.onIcon() : this.offIcon(), this.iconPos() === 'left' ? this.cx('iconLeft') : this.cx('iconRight')));

    labelText = computed(() => (this.checked() ? (this.hasOnLabel() ? this.onLabel() : ' ') : this.hasOffLabel() ? this.offLabel() : ' '));

    ariaPressed = computed(() => (this.checked() ? 'true' : 'false'));

    getTemplateContext() {
        return { $implicit: this.checked() };
    }

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        switch (event.code) {
            case 'Enter':
                this.toggle(event);
                event.preventDefault();
                break;
            case 'Space':
                this.toggle(event);
                event.preventDefault();
                break;
        }
    }

    @HostListener('click', ['$event'])
    toggle(event: Event) {
        if (!this.$disabled() && !(this.allowEmpty() === false && this.checked())) {
            this.checked.set(!this.checked());
            this.writeModelValue(this.checked());
            this.onModelChange(this.checked());
            this.onModelTouched();
            this.onChange.emit({
                originalEvent: event,
                checked: this.checked()
            });
        }
    }

    onInit() {
        if (this.checked() === null || this.checked() === undefined) {
            this.checked.set(false);
        }
    }

    onBlur() {
        this.onModelTouched();
    }

    /**
     * @override
     *
     * @see {@link BaseEditableHolder.writeControlValue}
     * Writes the value to the control.
     */
    writeControlValue(value: any, setModelValue: (value: any) => void) {
        this.checked.set(value);
        setModelValue(value);
    }
}

@NgModule({
    imports: [ToggleButton, SharedModule],
    exports: [ToggleButton, SharedModule]
})
export class ToggleButtonModule {}
