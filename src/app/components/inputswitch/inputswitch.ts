import {NgModule,Component,Input,forwardRef,EventEmitter,Output,ChangeDetectorRef,ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NG_VALUE_ACCESSOR,ControlValueAccessor} from '@angular/forms';

export const INPUTSWITCH_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputSwitch),
  multi: true
};

@Component({
    selector: 'p-inputSwitch',
    template: `
        <div [ngClass]="{'p-inputswitch p-component': true, 'p-inputswitch-checked': checked(), 'p-disabled': disabled, 'p-focus': focused}"
            [ngStyle]="style" [class]="styleClass" (click)="onClick($event, cb)">
            <div class="p-hidden-accessible">
                <input #cb type="checkbox" [attr.id]="inputId" [attr.name]="name" [attr.tabindex]="tabindex" [checked]="checked()" (change)="onInputChange($event)"
                    (focus)="onFocus($event)" (blur)="onBlur($event)" [disabled]="disabled" role="switch" [attr.aria-checked]="checked()" [attr.aria-labelledby]="ariaLabelledBy"/>
            </div>
            <span class="p-inputswitch-slider"></span>
        </div>
    `,
    providers: [INPUTSWITCH_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./inputswitch.css'],
    host: {
        'class': 'p-element'
    }
})
export class InputSwitch implements ControlValueAccessor {

    @Input() style: any;

    @Input() styleClass: string;

    @Input() tabindex: number;

    @Input() inputId: string;

    @Input() name: string;

    @Input() disabled: boolean;

    @Input() readonly: boolean;

    @Input() trueValue: any = true;

    @Input() falseValue: any = false;

    @Input() ariaLabelledBy: string;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    modelValue: any = false;

    focused: boolean = false;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    constructor(private cd: ChangeDetectorRef) {}

    onClick(event: Event, cb: HTMLInputElement) {
        if (!this.disabled && !this.readonly) {
            event.preventDefault();
            this.toggle(event);
            cb.focus();
        }
    }

    onInputChange(event: Event) {
        if (!this.readonly) {
            const inputChecked = (<HTMLInputElement> event.target).checked;
            this.updateModel(event, inputChecked);
        }
    }

    toggle(event: Event) {
        this.updateModel(event, !this.checked());
    }

    updateModel(event: Event, value: boolean) {
        this.modelValue = value ? this.trueValue : this.falseValue;
        this.onModelChange(this.modelValue);
        this.onChange.emit({
            originalEvent: event,
            checked: this.modelValue
        });
    }

    onFocus(event: Event) {
        this.focused = true;
    }

    onBlur(event: Event) {
        this.focused = false;
        this.onModelTouched();
    }

    writeValue(value: any) : void {
        this.modelValue = value;
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
        return this.modelValue === this.trueValue;
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [InputSwitch],
    declarations: [InputSwitch]
})
export class InputSwitchModule { }
