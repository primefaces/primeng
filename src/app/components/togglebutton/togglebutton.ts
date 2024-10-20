import { CommonModule } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    contentChildren,
    OutputEmitterRef,
    forwardRef,
    computed,
    inject,
    input,
    model,
    signal,
    NgModule,
    numberAttribute,
    output,
    Signal,
    TemplateRef,
    WritableSignal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Ripple } from 'primeng/ripple';
import { ToggleButtonChangeEvent } from './togglebutton.interface';
import { Nullable } from 'primeng/ts-helpers';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { BaseComponent } from 'primeng/basecomponent';
import { ToggleButtonStyle } from './style/togglebuttonstyle';

export const TOGGLEBUTTON_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleButton),
    multi: true,
};
/**
 * ToggleButton is used to select a boolean value using a button.
 * @group Components
 */
@Component({
    selector: 'p-toggleButton, p-togglebutton',
    template: `
        <button
            pRipple
            type="button"
            [ngClass]="cx('root')"
            [class]="styleClass()"
            [tabindex]="tabindex()"
            [disabled]="disabled()"
            (click)="toggle($event)"
            (keydown)="onKeyDown($event)"
            [attr.aria-label]="ariaLabel()"
            [attr.aria-labelledby]="ariaLabelledBy()"
            [attr.aria-pressed]="checked()"
            [attr.data-p-checked]="active()"
            [attr.data-p-disabled]="disabled()"
        >
            <span [ngClass]="cx('content')">
                <ng-container *ngTemplateOutlet="contentTemplate(); context: { $implicit: checked() }"></ng-container>
                @if (!contentTemplate()) {
                    @if (!iconTemplate()) {
                        @if (onIcon() || offIcon()) {
                            <span
                                [class]="checked() ? onIcon() : offIcon()"
                                [ngClass]="{
                                    'p-togglebutton-icon': true,
                                    'p-togglebutton-icon-left': iconPos() === 'left',
                                    'p-togglebutton-icon-right': iconPos() === 'right',
                                }"
                                [attr.data-pc-section]="'icon'"
                            ></span>
                        }
                    } @else {
                        <ng-container *ngTemplateOutlet="iconTemplate(); context: { $implicit: checked() }"></ng-container>
                    }
                    @if (onLabel() || offLabel()) {
                        <span [ngClass]="cx('label')" [attr.data-pc-section]="'label'">
                            {{ checked() ? (hasOnLabel() ? onLabel() : '') : hasOffLabel() ? offLabel() : '' }}
                        </span>
                    }
                }
            </span>
        </button>
    `,
    host: { '[class]': 'styleClass()' },
    standalone: true,
    imports: [Ripple, AutoFocus, SharedModule, CommonModule],
    providers: [TOGGLEBUTTON_VALUE_ACCESSOR, ToggleButtonStyle],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleButton extends BaseComponent implements ControlValueAccessor {
    /**
     * Label for the on state.
     * @group Props
     */
    onLabel = input<string>('Yes');
    /**
     * Label for the off state.
     * @group Props
     */
    offLabel = input<string>('No');
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
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    disabled = model<boolean>();
    /**
     * Inline style of the element.
     * @group Props
     */
    style = input<{ [klass: string]: any } | null>();
    /**
     * Style class of the element.
     * @group Props
     */
    styleClass = input<string>();
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
    iconPos = input<'left' | 'right'>('left');
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus = input<boolean, any>(undefined, { transform: booleanAttribute });
    /**
     * Whether selection can not be cleared.
     * @group Props
     */
    allowEmpty = input<boolean, any>(undefined, { transform: booleanAttribute });
    /**
     * Callback to invoke on value change.
     * @param {ToggleButtonChangeEvent} event - Custom change event.
     * @group Emits
     */
    onChange: OutputEmitterRef<ToggleButtonChangeEvent> = output<ToggleButtonChangeEvent>();

    templates: Signal<readonly PrimeTemplate[]> = contentChildren(PrimeTemplate);

    iconTemplate = computed<Nullable<TemplateRef<any>>>(() => this.mappedTemplates()['icon']);

    contentTemplate = computed<Nullable<TemplateRef<any>>>(() => this.mappedTemplates()['content']);

    checked: WritableSignal<boolean> = signal<boolean>(false);

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    _componentStyle = inject(ToggleButtonStyle);

    private mappedTemplates = computed<{ [key: string]: TemplateRef<any> }>(() => {
        return (this.templates() || []).reduce((prev, item) => {
            prev[item.getType()] = item.template;
            return prev;
        }, {});
    });

    toggle(event: Event) {
        if (!this.disabled() && !(this.allowEmpty() === false && this.checked())) {
            this.checked.set(!this.checked());
            this.onModelChange(this.checked());
            this.onModelTouched();
            this.onChange.emit({ originalEvent: event, checked: this.checked() });
        }
    }

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

    onBlur() {
        this.onModelTouched();
    }

    writeValue(value: any): void {
        this.checked.set(value);
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

    hasOnLabel = computed<boolean>(() => this.onLabel() && this.onLabel().length > 0);

    hasOffLabel = computed<boolean>(() => this.offLabel() && this.offLabel().length > 0);

    active = computed<boolean>(() => this.checked() === true);
}

@NgModule({
    imports: [ToggleButton],
    exports: [ToggleButton, SharedModule],
})
export class ToggleButtonModule {}
