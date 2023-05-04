import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, Input, NgModule, Output, QueryList, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ObjectUtils } from 'primeng/utils';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { CheckIcon } from 'primeng/icons/check';

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
    @Input() value: any;

    @Input() name: string;

    @Input() disabled: boolean;

    @Input() binary: boolean;

    @Input() label: string;

    @Input() ariaLabelledBy: string;

    @Input() ariaLabel: string;

    @Input() tabindex: number;

    @Input() inputId: string;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() labelStyleClass: string;

    @Input() formControl: FormControl;

    @Input() checkboxIcon: string;

    @Input() readonly: boolean;

    @Input() required: boolean;

    @Input() trueValue: any = true;

    @Input() falseValue: any = false;

    @ViewChild('cb') inputViewChild: ElementRef;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    checkboxIconTemplate: TemplateRef<any>;

    model: any;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    focused: boolean = false;

    constructor(public cd: ChangeDetectorRef) {}

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'icon':
                    this.checkboxIconTemplate = item.template;
                    break;
            }
        });
    }

    onClick(event, checkbox, focus: boolean) {
        event.preventDefault();

        if (this.disabled || this.readonly) {
            return;
        }

        this.updateModel(event);

        if (focus) {
            checkbox.focus();
        }
    }

    updateModel(event) {
        let newModelValue;

        if (!this.binary) {
            if (this.checked()) newModelValue = this.model.filter((val) => !ObjectUtils.equals(val, this.value));
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

    handleChange(event) {
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
