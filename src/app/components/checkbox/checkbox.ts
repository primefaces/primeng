import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, Input, NgModule, Output, QueryList, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ObjectUtils } from 'primeng/utils';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { CheckIcon } from 'primeng/icons/check';
import { Nullable } from 'primeng/ts-helpers';
import { CheckboxChangeEvent } from './checkbox.interface';

export const CHECKBOX_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Checkbox),
    multi: true
};

@Component({
    selector: 'p-checkbox',
    template: `
        <div [ngStyle]="style" [ngClass]="{ 'p-checkbox p-component': true, 'p-checkbox-checked': checked(), 'p-checkbox-disabled': disabled, 'p-checkbox-focused': focused }" [class]="styleClass">
            <div class="p-hidden-accessible">
                <input
                    #cb
                    type="checkbox"
                    [attr.id]="inputId"
                    [attr.name]="name"
                    [readonly]="readonly"
                    [value]="value"
                    [checked]="checked()"
                    (focus)="onFocus()"
                    (blur)="onBlur()"
                    (change)="handleChange($event)"
                    [disabled]="disabled"
                    [attr.tabindex]="tabindex"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    [attr.aria-label]="ariaLabel"
                    [attr.aria-checked]="checked()"
                    [attr.required]="required"
                />
            </div>
            <div class="p-checkbox-box" (click)="onClick($event, cb, true)" [ngClass]="{ 'p-highlight': checked(), 'p-disabled': disabled, 'p-focus': focused }">
                <ng-container *ngIf="checked()">
                    <ng-container *ngIf="!checkboxIconTemplate">
                        <span *ngIf="checkboxIcon" class="p-checkbox-icon" [ngClass]="checkboxIcon"></span>
                        <CheckIcon *ngIf="!checkboxIcon" [styleClass]="'p-checkbox-icon'" />
                    </ng-container>
                    <span *ngIf="checkboxIconTemplate" class="p-checkbox-icon">
                        <ng-template *ngTemplateOutlet="checkboxIconTemplate"></ng-template>
                    </span>
                </ng-container>
            </div>
        </div>
        <label
            (click)="onClick($event, cb, true)"
            [class]="labelStyleClass"
            [ngClass]="{ 'p-checkbox-label': true, 'p-checkbox-label-active': checked(), 'p-disabled': disabled, 'p-checkbox-label-focus': focused }"
            *ngIf="label"
            [attr.for]="inputId"
            >{{ label }}</label
        >
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
    @Input() value: string | object | boolean | undefined | null;
    /**
     * Name of the checkbox group.
     * @group Props
     */
    @Input() name: string | undefined;
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    @Input() disabled: boolean | undefined;
    /**
     * Allows to select a boolean value instead of multiple values.
     * @group Props
     */
    @Input() binary: boolean | undefined;
    /**
     * Label of the checkbox.
     * @group Props
     */
    @Input() label: string | undefined;
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
    @Input() tabindex: number | undefined;
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
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Style class of the label.
     * @group Props
     */
    @Input() labelStyleClass: string | undefined;
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
    @Input() readonly: boolean | undefined;
    /**
     * When present, it specifies that checkbox must be checked before submitting the form.
     * @group Props
     */
    @Input() required: boolean | undefined;
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
     * Callback to invoke on value change.
     * @param {CheckboxChangeEvent} event - Custom value change event.
     * @group Emits
     */
    @Output() onChange: EventEmitter<CheckboxChangeEvent> = new EventEmitter();

    @ViewChild('cb') inputViewChild: Nullable<ElementRef>;

    @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<PrimeTemplate>>;

    checkboxIconTemplate!: TemplateRef<any>;

    model: any;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    focused: boolean = false;

    constructor(public cd: ChangeDetectorRef) {}

    ngAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'icon':
                    this.checkboxIconTemplate = item.template;
                    break;
            }
        });
    }

    onClick(event: Event, checkbox: HTMLElement, focus: boolean) {
        event.preventDefault();

        if (this.disabled || this.readonly) {
            return;
        }

        this.updateModel(event);

        if (focus) {
            checkbox.focus();
        }
    }

    updateModel(event: Event) {
        let newModelValue;

        if (!this.binary) {
            if (this.checked()) newModelValue = this.model.filter((val: object) => !ObjectUtils.equals(val, this.value));
            else newModelValue = this.model ? [...this.model, this.value] : [this.value];

            this.onModelChange(newModelValue);
            this.model = newModelValue;

            if (this.formControl) {
                this.formControl.setValue(newModelValue);
            }
        } else {
            newModelValue = this.checked() ? this.falseValue : this.trueValue;
            this.model = newModelValue;
            this.onModelChange(newModelValue);
        }

        this.onChange.emit({ checked: newModelValue, originalEvent: event });
    }

    handleChange(event: Event) {
        if (!this.readonly) {
            this.updateModel(event);
        }
    }

    onFocus() {
        this.focused = true;
    }

    onBlur() {
        this.focused = false;
        this.onModelTouched();
    }

    focus() {
        this.inputViewChild?.nativeElement.focus();
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
        this.disabled = val;
        this.cd.markForCheck();
    }

    checked() {
        return this.binary ? this.model === this.trueValue : ObjectUtils.contains(this.value, this.model);
    }
}

@NgModule({
    imports: [CommonModule, CheckIcon],
    exports: [Checkbox, SharedModule],
    declarations: [Checkbox]
})
export class CheckboxModule {}
