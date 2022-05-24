import {NgModule,Component,Input,Output,EventEmitter,forwardRef,ChangeDetectorRef,ViewChild,ElementRef,ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl} from '@angular/forms';
import { ObjectUtils } from 'primeng/utils';

export const CHECKBOX_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Checkbox),
  multi: true
};

@Component({
    selector: 'p-checkbox',
    template: `
        <div [ngStyle]="style" [ngClass]="{'p-checkbox p-component': true, 'p-checkbox-checked': checked(), 'p-checkbox-disabled': disabled, 'p-checkbox-focused': focused}" [class]="styleClass">
            <div class="p-hidden-accessible">
                <input #cb type="checkbox" [attr.id]="inputId" [attr.name]="name" [readonly]="readonly" [value]="value" [checked]="checked()" (focus)="onFocus()" (blur)="onBlur()"
                (change)="handleChange($event)" [disabled]="disabled" [attr.tabindex]="tabindex" [attr.aria-labelledby]="ariaLabelledBy" [attr.aria-label]="ariaLabel" [attr.aria-checked]="checked()" [attr.required]="required">
            </div>
            <div class="p-checkbox-box" (click)="onClick($event,cb,true)"
                        [ngClass]="{'p-highlight': checked(), 'p-disabled': disabled, 'p-focus': focused}">
                <span class="p-checkbox-icon" [ngClass]="checked() ? checkboxIcon : null"></span>
            </div>
        </div>
        <label (click)="onClick($event,cb,true)" [class]="labelStyleClass"
                [ngClass]="{'p-checkbox-label': true, 'p-checkbox-label-active':checked(), 'p-disabled':disabled, 'p-checkbox-label-focus':focused}"
                *ngIf="label" [attr.for]="inputId">{{label}}</label>
    `,
    providers: [CHECKBOX_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./checkbox.css'],
    host: {
        'class': 'p-element'
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

    @Input() checkboxIcon: string = 'pi pi-check';

    @Input() readonly: boolean;

    @Input() required: boolean;

    @Input() trueValue: any = true;

    @Input() falseValue: any = false;

    @ViewChild('cb') inputViewChild: ElementRef;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    model: any;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    focused: boolean = false;

    constructor(private cd: ChangeDetectorRef) {}

    onClick(event,checkbox,focus:boolean) {
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
            if (this.checked())
                newModelValue = this.model.filter(val => !ObjectUtils.equals(val, this.value));
            else
                newModelValue = this.model ? [...this.model, this.value] : [this.value];

            this.onModelChange(newModelValue);
            this.model = newModelValue;

            if (this.formControl) {
                this.formControl.setValue(newModelValue);
            }
        }
        else {
            newModelValue = this.checked() ? this.falseValue : this.trueValue;
            this.model = newModelValue;
            this.onModelChange(newModelValue);
        }

        this.onChange.emit({checked:newModelValue, originalEvent: event});
    }

    handleChange(event) {
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

    writeValue(model: any) : void {
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
    imports: [CommonModule],
    exports: [Checkbox],
    declarations: [Checkbox]
})
export class CheckboxModule { }
