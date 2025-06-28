import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostListener,
    inject,
    input,
    Input,
    NgModule,
    numberAttribute,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { BaseEditableHolder } from 'primeng/baseeditableholder';
import { ToggleSwitchStyle } from './style/toggleswitchstyle';
import { ToggleSwitchChangeEvent } from './toggleswitch.interface';

/**
 * Context interface for the handle template.
 * @property {boolean} checked - A flag indicating whether the input is checked.
 * @group Interface
 */
export interface ToggleSwitchHandleTemplateContext {
    checked: boolean;
}

export const TOGGLESWITCH_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleSwitch),
    multi: true
};
/**
 * ToggleSwitch is used to select a boolean value.
 * @group Components
 */
@Component({
    selector: 'p-toggleswitch, p-toggleSwitch, p-toggle-switch',
    standalone: true,
    imports: [CommonModule, AutoFocus, SharedModule],
    template: `
        <input
            #input
            [attr.id]="inputId"
            type="checkbox"
            role="switch"
            [class]="cx('input')"
            [checked]="checked()"
            [attr.required]="required() ? '' : undefined"
            [attr.disabled]="disabled() ? '' : undefined"
            [attr.aria-checked]="checked()"
            [attr.aria-labelledby]="ariaLabelledBy"
            [attr.aria-label]="ariaLabel"
            [attr.name]="name()"
            [attr.tabindex]="tabindex"
            (focus)="onFocus()"
            (blur)="onBlur()"
            [attr.data-pc-section]="'hiddenInput'"
            [pAutoFocus]="autofocus"
        />
        <div [class]="cx('slider')" [attr.data-pc-section]="'slider'">
            <div [class]="cx('handle')">
                @if (handleTemplate || _handleTemplate) {
                    <ng-container *ngTemplateOutlet="handleTemplate || _handleTemplate; context: { checked: checked() }" />
                }
            </div>
        </div>
    `,
    providers: [TOGGLESWITCH_VALUE_ACCESSOR, ToggleSwitchStyle],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "cn(cx('root'), styleClass)",
        '[style]': "sx('root')",
        '[attr.data-pc-name]': "'toggleswitch'",
        '[attr.data-pc-section]': "'root'"
    }
})
export class ToggleSwitch extends BaseEditableHolder implements AfterContentInit {
    /**
     * Style class of the component.
     * @deprecated since v20.0.0, use `class` instead.
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
     * Specifies the size of the component.
     * @defaultValue undefined
     * @group Props
     */
    size = input<'large' | 'small' | undefined>();
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
    /**
     * Callback to invoke when the on value change.
     * @type {TemplateRef<ToggleSwitchHandleTemplateContext>} context - Context of the template
     * @example
     * ```html
     * <ng-template #handle let-checked="checked"> </ng-template>
     * ```
     * @see {@link ToggleSwitchHandleTemplateContext}
     * @group Templates
     */
    @ContentChild('handle', { descendants: false }) handleTemplate: TemplateRef<any> | undefined;

    _handleTemplate: TemplateRef<any> | undefined;

    focused: boolean = false;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    _componentStyle = inject(ToggleSwitchStyle);

    @ContentChildren(PrimeTemplate) templates!: QueryList<PrimeTemplate>;

    @HostListener('click', ['$event'])
    onHostClick(event: MouseEvent) {
        this.onClick(event);
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'handle':
                    this._handleTemplate = item.template;
                    break;
                default:
                    this._handleTemplate = item.template;
                    break;
            }
        });
    }

    onClick(event: Event) {
        if (!this.disabled() && !this.readonly) {
            this.writeModelValue(this.checked() ? this.falseValue : this.trueValue);

            this.onModelChange(this.modelValue());
            this.onChange.emit({
                originalEvent: event,
                checked: this.modelValue()
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
        this.writeModelValue(value);
        this.cd.markForCheck();
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    checked() {
        return this.modelValue() === this.trueValue;
    }
}

@NgModule({
    imports: [ToggleSwitch, SharedModule],
    exports: [ToggleSwitch, SharedModule]
})
export class ToggleSwitchModule {}
