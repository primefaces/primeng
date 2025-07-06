import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    inject,
    input,
    Input,
    NgModule,
    numberAttribute,
    Output,
    QueryList,
    signal,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { contains, equals } from '@primeuix/utils';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { BaseEditableHolder } from 'primeng/baseeditableholder';
import { CheckIcon, MinusIcon } from 'primeng/icons';
import { Nullable } from 'primeng/ts-helpers';
import { CheckboxChangeEvent } from './checkbox.interface';
import { CheckboxStyle } from './style/checkboxstyle';

export const CHECKBOX_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Checkbox),
    multi: true
};
/**
 * Checkbox is an extension to standard checkbox element with theming.
 * @group Components
 */
@Component({
    selector: 'p-checkbox, p-checkBox, p-check-box',
    standalone: true,
    imports: [CommonModule, CheckIcon, MinusIcon, SharedModule],
    template: `
        <input
            #input
            [attr.id]="inputId"
            type="checkbox"
            [attr.value]="value"
            [attr.name]="name()"
            [checked]="checked"
            [attr.tabindex]="tabindex"
            [attr.required]="required() ? '' : undefined"
            [attr.readonly]="readonly ? '' : undefined"
            [attr.disabled]="disabled() ? '' : undefined"
            [attr.aria-labelledby]="ariaLabelledBy"
            [attr.aria-label]="ariaLabel"
            [style]="inputStyle"
            [class]="cn(cx('input'), inputClass)"
            (focus)="onInputFocus($event)"
            (blur)="onInputBlur($event)"
            (change)="handleChange($event)"
        />
        <div [class]="cx('box')">
            <ng-container *ngIf="!checkboxIconTemplate && !_checkboxIconTemplate">
                <ng-container *ngIf="checked">
                    <span *ngIf="checkboxIcon" [class]="cx('icon')" [ngClass]="checkboxIcon" [attr.data-pc-section]="'icon'"></span>
                    <svg data-p-icon="check" *ngIf="!checkboxIcon" [class]="cx('icon')" [attr.data-pc-section]="'icon'" />
                </ng-container>
                <svg data-p-icon="minus" *ngIf="_indeterminate()" [class]="cx('icon')" [attr.data-pc-section]="'icon'" />
            </ng-container>
            <ng-template *ngTemplateOutlet="checkboxIconTemplate || _checkboxIconTemplate; context: { checked: checked, class: cx('icon') }"></ng-template>
        </div>
    `,
    providers: [CHECKBOX_VALUE_ACCESSOR, CheckboxStyle],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "cn(cx('root'), styleClass)",
        '[attr.data-p-highlight]': 'checked',
        '[attr.data-p-checked]': 'checked',
        '[attr.data-p-disabled]': 'disabled()'
    }
})
export class Checkbox extends BaseEditableHolder implements AfterContentInit, ControlValueAccessor {
    /**
     * Value of the checkbox.
     * @group Props
     */
    @Input() value: any;
    /**
     * Allows to select a boolean value instead of multiple values.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) binary: boolean | undefined;
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
     * Inline style of the input element.
     * @group Props
     */
    @Input() inputStyle: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the component.
     * @deprecated since v20.0.0, use `class` instead.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Style class of the input element.
     * @group Props
     */
    @Input() inputClass: string | undefined;
    /**
     * When present, it specifies input state as indeterminate.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) indeterminate: boolean = false;
    /**
     * Form control value.
     * @group Props
     */
    @Input() formControl: FormControl | undefined;
    /**
     * Icon class of the checkbox icon.
     * @group Props
     */
    @Input() checkboxIcon: string | undefined;
    /**
     * When present, it specifies that the component cannot be edited.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) readonly: boolean | undefined;
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autofocus: boolean | undefined;
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
     * Callback to invoke on value change.
     * @param {CheckboxChangeEvent} event - Custom value change event.
     * @group Emits
     */
    @Output() onChange: EventEmitter<CheckboxChangeEvent> = new EventEmitter();
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

    @ViewChild('input') inputViewChild: Nullable<ElementRef>;

    get checked() {
        return this._indeterminate() ? false : this.binary ? this.modelValue() === this.trueValue : contains(this.value, this.modelValue());
    }

    _indeterminate = signal<any>(undefined);
    /**
     * The template of the checkbox icon.
     * @group Templates
     */
    @ContentChild('checkboxicon', { descendants: false }) checkboxIconTemplate: TemplateRef<any>;

    @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<PrimeTemplate>>;

    _checkboxIconTemplate: TemplateRef<any> | undefined;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    focused: boolean = false;

    _componentStyle = inject(CheckboxStyle);

    $variant = computed(() => this.variant() || this.config.inputStyle() || this.config.inputVariant());

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'icon':
                    this._checkboxIconTemplate = item.template;
                    break;
                case 'checkboxicon':
                    this._checkboxIconTemplate = item.template;
                    break;
            }
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
        if (changes.indeterminate) {
            this._indeterminate.set(changes.indeterminate.currentValue);
        }
    }

    updateModel(event) {
        let newModelValue;

        /*
         * When `formControlName` or `formControl` is used - `writeValue` is not called after control changes.
         * Otherwise it is causing multiple references to the actual value: there is one array reference inside the component and another one in the control value.
         * `selfControl` is the source of truth of references, it is made to avoid reference loss.
         * */
        const selfControl = this.injector.get<NgControl | null>(NgControl, null, { optional: true, self: true });

        const currentModelValue = selfControl && !this.formControl ? selfControl.value : this.modelValue();

        if (!this.binary) {
            if (this.checked || this._indeterminate()) newModelValue = currentModelValue.filter((val) => !equals(val, this.value));
            else newModelValue = currentModelValue ? [...currentModelValue, this.value] : [this.value];

            this.onModelChange(newModelValue);
            this.writeModelValue(newModelValue);

            if (this.formControl) {
                this.formControl.setValue(newModelValue);
            }
        } else {
            newModelValue = this._indeterminate() ? this.trueValue : this.checked ? this.falseValue : this.trueValue;
            this.writeModelValue(newModelValue);
            this.onModelChange(newModelValue);
        }

        if (this._indeterminate()) {
            this._indeterminate.set(false);
        }

        this.onChange.emit({ checked: newModelValue, originalEvent: event });
    }

    handleChange(event) {
        if (!this.readonly) {
            this.updateModel(event);
        }
    }

    onInputFocus(event) {
        this.focused = true;
        this.onFocus.emit(event);
    }

    onInputBlur(event) {
        this.focused = false;
        this.onBlur.emit(event);
        this.onModelTouched();
    }

    focus() {
        this.inputViewChild.nativeElement.focus();
    }

    writeValue(model: any): void {
        this.writeModelValue(model);
        this.cd.markForCheck();
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
}

@NgModule({
    imports: [Checkbox, SharedModule],
    exports: [Checkbox, SharedModule]
})
export class CheckboxModule {}
