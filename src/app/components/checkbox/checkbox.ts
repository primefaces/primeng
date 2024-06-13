import { CommonModule } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    Injector,
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
import { PrimeTemplate, SharedModule, PrimeNGConfig } from 'primeng/api';
import { AutoFocusModule } from 'primeng/autofocus';
import { CheckIcon } from 'primeng/icons/check';
import { Nullable } from 'primeng/ts-helpers';
import { ObjectUtils } from 'primeng/utils';
import { CheckboxChangeEvent } from './checkbox.interface';
import { MinusIcon } from 'primeng/icons/minus';

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
    selector: 'p-checkbox',
    template: `
        <div [style]="style" [class]="styleClass" [ngClass]="containerClass" [attr.data-p-highlight]="checked" [attr.data-p-checked]="checked" [attr.data-p-disabled]="disabled">
            <input
                #input
                [attr.id]="inputId"
                type="checkbox"
                [value]="value"
                [attr.name]="name"
                [checked]="checked"
                [attr.tabindex]="tabindex"
                [disabled]="disabled"
                [readonly]="readonly"
                [attr.required]="required"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.aria-label]="ariaLabel"
                [style]="inputStyle"
                [class]="inputClass"
                [ngClass]="{ 'p-checkbox-input': true }"
                (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)"
                (change)="handleChange($event)"
            />
            <div class="p-checkbox-box">
                <ng-container *ngIf="!checkboxIconTemplate">
                    <ng-container *ngIf="checked">
                        <span *ngIf="checkboxIcon" class="p-checkbox-icon" [ngClass]="checkboxIcon" [attr.data-pc-section]="'icon'"></span>
                        <CheckIcon *ngIf="!checkboxIcon" [styleClass]="'p-checkbox-icon'" [attr.data-pc-section]="'icon'" />
                    </ng-container>
                    <MinusIcon *ngIf="_indeterminate()" [styleClass]="'p-checkbox-icon'" [attr.data-pc-section]="'icon'" />
                </ng-container>
                <ng-template *ngTemplateOutlet="checkboxIconTemplate; context: { checked: checked, class: 'p-checkbox-icon' }"></ng-template>
            </div>
        </div>
    `,
    providers: [CHECKBOX_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./checkbox.css'],
    host: {
        class: 'p-element'
    }
})
export class Checkbox implements ControlValueAccessor {
    /**
     * Value of the checkbox.
     * @group Props
     */
    @Input() value: any;
    /**
     * Name of the checkbox group.
     * @group Props
     */
    @Input() name: string | undefined;
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) disabled: boolean | undefined;
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
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Inline style of the input element.
     * @group Props
     */
    @Input() inputStyle: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the component.
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
     * When present, it specifies that checkbox must be checked before submitting the form.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) required: boolean | undefined;
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
     * @group Props
     */
    @Input() variant: 'filled' | 'outlined' = 'outlined';
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

    @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<PrimeTemplate>>;

    get checked() {
        return this._indeterminate() ? false : this.binary ? this.model === this.trueValue : ObjectUtils.contains(this.value, this.model);
    }

    get containerClass() {
        return {
            'p-checkbox p-component': true,
            'p-checkbox-checked p-highlight': this.checked,
            'p-disabled': this.disabled,
            'p-variant-filled': this.variant === 'filled' || this.config.inputStyle() === 'filled'
        };
    }

    _indeterminate = signal<any>(undefined);

    checkboxIconTemplate: TemplateRef<any>;

    model: any;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    focused: boolean = false;

    constructor(
        public cd: ChangeDetectorRef,
        private readonly injector: Injector,
        public config: PrimeNGConfig
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.indeterminate) {
            this._indeterminate.set(changes.indeterminate.currentValue);
        }
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'icon':
                    this.checkboxIconTemplate = item.template;
                    break;
            }
        });
    }

    updateModel(event) {
        let newModelValue;

        /*
         * When `formControlName` or `formControl` is used - `writeValue` is not called after control changes.
         * Otherwise it is causing multiple references to the actual value: there is one array reference inside the component and another one in the control value.
         * `selfControl` is the source of truth of references, it is made to avoid reference loss.
         * */
        const selfControl = this.injector.get<NgControl | null>(NgControl, null, { optional: true, self: true });

        const currentModelValue = selfControl && !this.formControl ? selfControl.value : this.model;

        if (!this.binary) {
            if (this.checked || this._indeterminate()) newModelValue = currentModelValue.filter((val) => !ObjectUtils.equals(val, this.value));
            else newModelValue = currentModelValue ? [...currentModelValue, this.value] : [this.value];

            this.onModelChange(newModelValue);
            this.model = newModelValue;

            if (this.formControl) {
                this.formControl.setValue(newModelValue);
            }
        } else {
            newModelValue = this._indeterminate() ? this.trueValue : this.checked ? this.falseValue : this.trueValue;
            this.model = newModelValue;
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
        this.model = model;
        this.cd.markForCheck();
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    setDisabledState(val: boolean): void {
        setTimeout(() => {
            this.disabled = val;
            this.cd.markForCheck();
        });
    }
}

@NgModule({
    imports: [CommonModule, AutoFocusModule, CheckIcon, MinusIcon],
    exports: [Checkbox, SharedModule],
    declarations: [Checkbox]
})
export class CheckboxModule {}
