import {NgModule,Component,ElementRef,AfterViewInit,Input,Output,EventEmitter,forwardRef,ViewChild, ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const SPINNER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Spinner),
    multi: true
};

@Component({
    selector: 'p-spinner',
    template: `
        <span class="ui-spinner ui-widget ui-corner-all">
            <input #inputfield type="text" [attr.id]="inputId" [value]="formattedValue||null" [attr.name]="name" [attr.aria-valumin]="min" [attr.aria-valuemax]="max" [attr.aria-valuenow]="value" [attr.aria-labelledby]="ariaLabelledBy"
            [attr.size]="size" [attr.maxlength]="maxlength" [attr.tabindex]="tabindex" [attr.placeholder]="placeholder" [disabled]="disabled" [readonly]="readonly" [attr.required]="required"
            (keydown)="onInputKeydown($event)" (blur)="onInputBlur($event)" (input)="onInput($event)" (change)="onInputChange($event)" (focus)="onInputFocus($event)"
            [ngStyle]="inputStyle" [class]="inputStyleClass" [ngClass]="'ui-spinner-input ui-inputtext ui-widget ui-state-default ui-corner-all'">
            <button type="button" [ngClass]="{'ui-spinner-button ui-spinner-up ui-corner-tr ui-button ui-widget ui-state-default':true,'ui-state-disabled':disabled}" [disabled]="disabled||readonly" [attr.tabindex]="tabindex" [attr.readonly]="readonly"
                (mouseleave)="onUpButtonMouseleave($event)" (mousedown)="onUpButtonMousedown($event)" (mouseup)="onUpButtonMouseup($event)">
                <span class="ui-spinner-button-icon pi pi-caret-up ui-clickable"></span>
            </button>
            <button type="button" [ngClass]="{'ui-spinner-button ui-spinner-down ui-corner-br ui-button ui-widget ui-state-default':true,'ui-state-disabled':disabled}" [disabled]="disabled||readonly" [attr.tabindex]="tabindex" [attr.readonly]="readonly"
                (mouseleave)="onDownButtonMouseleave($event)" (mousedown)="onDownButtonMousedown($event)" (mouseup)="onDownButtonMouseup($event)">
                <span class="ui-spinner-button-icon pi pi-caret-down ui-clickable"></span>
            </button>
        </span>
    `,
    host: {
        '[class.ui-inputwrapper-filled]': 'filled',
        '[class.ui-inputwrapper-focus]': 'focus'
    },
    providers: [SPINNER_VALUE_ACCESSOR]
})
export class Spinner implements AfterViewInit,ControlValueAccessor {
    
    @Output() onChange: EventEmitter<any> = new EventEmitter();
    
    @Output() onFocus: EventEmitter<any> = new EventEmitter();

    @Output() onBlur: EventEmitter<any> = new EventEmitter();

    @Input() step: number = 1;

    @Input() min: number;

    @Input() max: number;
    
    @Input() maxlength: number;
    
    @Input() size: number;

    @Input() placeholder: string;

    @Input() inputId: string;

    @Input() disabled: boolean;
    
    @Input() readonly: boolean;

    @Input() tabindex: number;
            
    @Input() required: boolean;

    @Input() name: string;

    @Input() ariaLabelledBy: string;

    @Input() inputStyle: any;

    @Input() inputStyleClass: string;

    @Input() formatInput: boolean;

    @Input() decimalSeparator: string;

    @Input() thousandSeparator: string;
    
    value: any;

    formattedValue: string;
        
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};
    
    keyPattern: RegExp = /[0-9\+\-]/;
    
    public precision: number;
    
    public timer: any;
    
    public focus: boolean;
    
    public filled: boolean;
    
    public negativeSeparator = '-';

    localeDecimalSeparator: string;

    localeThousandSeparator: string;

    thousandRegExp: RegExp;
    
    @ViewChild('inputfield', { static: true }) inputfieldViewChild: ElementRef;
    
    constructor(public el: ElementRef, public cd: ChangeDetectorRef) {}

    ngAfterViewInit() {
        if (this.value && this.value.toString().indexOf('.') > 0) {
            this.precision = this.value.toString().split(/[.]/)[1].length;
        }
        else if (this.step % 1 !== 0) {
            // If step is not an integer then extract the length of the decimal part
            this.precision = this.step.toString().split(/[,]|[.]/)[1].length;
        }

        if (this.formatInput) {
            this.localeDecimalSeparator = (1.1).toLocaleString().substring(1, 2);
            this.localeThousandSeparator = (1000).toLocaleString().substring(1, 2);
            this.thousandRegExp = new RegExp(`[${this.thousandSeparator || this.localeThousandSeparator}]`, 'gim');

            if (this.decimalSeparator && this.thousandSeparator && this.decimalSeparator === this.thousandSeparator) {
                console.warn("thousandSeparator and decimalSeparator cannot have the same value.");
            }
        }
    }

    repeat(event: Event, interval: number, dir: number) {
        let i = interval||500;

        this.clearTimer();
        this.timer = setTimeout(() => {
            this.repeat(event, 40, dir);
        }, i);

        this.spin(event, dir);
    }
    
    spin(event: Event, dir: number) {
        let step = this.step * dir;
        let currentValue: number;

        if (this.value)
            currentValue = (typeof this.value === 'string') ? this.parseValue(this.value) : this.value;
        else
            currentValue = 0;
        
        if (this.precision)
            this.value = parseFloat(this.toFixed(currentValue + step, this.precision));
        else
            this.value = currentValue + step;
    
        if (this.maxlength !== undefined && this.value.toString().length > this.maxlength) {
            this.value = currentValue;
        }
    
        if (this.min !== undefined && this.value < this.min) {
            this.value = this.min;
        }

        if (this.max !== undefined && this.value > this.max) {
            this.value = this.max;
        }
       
        this.formatValue();
        this.onModelChange(this.value);
        this.onChange.emit(event);
    }
    
    toFixed(value: number, precision: number) {
        let power = Math.pow(10, precision||0);
        return String(Math.round(value * power) / power);
    }
    
    onUpButtonMousedown(event: Event) {
        if (!this.disabled) {
            this.inputfieldViewChild.nativeElement.focus();
            this.repeat(event, null, 1);
            this.updateFilledState();
            event.preventDefault();
        }
    }
    
    onUpButtonMouseup(event: Event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    }
    
    onUpButtonMouseleave(event: Event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    }
    
    onDownButtonMousedown(event: Event) {
        if (!this.disabled) {
            this.inputfieldViewChild.nativeElement.focus();
            this.repeat(event, null, -1);
            this.updateFilledState();
            event.preventDefault();
        }
    }
    
    onDownButtonMouseup(event: Event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    }
    
    onDownButtonMouseleave(event: Event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    }
    
    onInputKeydown(event: KeyboardEvent) {
        if (event.which == 38) {
            this.spin(event, 1);
            event.preventDefault();
        }
        else if (event.which == 40) {
            this.spin(event, -1);
            event.preventDefault();
        }
    }

    onInputChange(event: Event) {
        this.onChange.emit(event);
    }

    onInput(event: KeyboardEvent) {
        this.value = this.parseValue((<HTMLInputElement> event.target).value);
        this.onModelChange(this.value);
        this.updateFilledState();
    }
        
    onInputBlur(event) {
        this.focus = false;
        this.formatValue();
        this.onModelTouched();
        this.onBlur.emit(event);
    }
    
    onInputFocus(event) {
        this.focus = true;
        this.onFocus.emit(event);
    }
    
    parseValue(val: string): number {
        let value: number;
                
        if (val.trim() === '') {
            value = null;
        }
        else {
            if (this.formatInput) {
                val = val.replace(this.thousandRegExp, '');
            }

            if (this.precision) {
                val = this.formatInput ? val.replace(this.decimalSeparator || this.localeDecimalSeparator, '.') : val.replace(',', '.');
                value = parseFloat(val);
            }
            else {
                value = parseInt(val, 10);
            }
            
            if (!isNaN(value)) {
                if (this.max !== null && value > this.max) {
                    value = this.max;
                }

                if (this.min !== null && value < this.min) {
                    value = this.min;
                }
            }
            else {
                value = null;
            }
        }
        
        return value;
    }

    formatValue() {
        let value = this.value;

        if (value != null) {
            if (this.formatInput) {
                value = value.toLocaleString(undefined, {maximumFractionDigits: 20});
    
                if (this.decimalSeparator && this.thousandSeparator) {
                    value = value.split(this.localeDecimalSeparator);
    
                    if (this.precision && value[1]) {
                        value[1] = (this.decimalSeparator || this.localeDecimalSeparator) + value[1];
                    }
    
                    if (this.thousandSeparator && value[0].length > 3) {
                        value[0] = value[0].replace(new RegExp(`[${this.localeThousandSeparator}]`, 'gim'), this.thousandSeparator);
                    }
    
                    value = value.join('');
                }
            }
    
            this.formattedValue = value.toString();
        }
        else {
            this.formattedValue = null;
        }

        if (this.inputfieldViewChild && this.inputfieldViewChild.nativeElement) {
            this.inputfieldViewChild.nativeElement.value = this.formattedValue;
        }
    }
            
    clearTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
    
    writeValue(value: any) : void {
        this.value = value;
        this.formatValue();
        this.updateFilledState();
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
    }
    
    updateFilledState() {
        this.filled = (this.value !== undefined && this.value != null);
    }
}


@NgModule({
    imports: [CommonModule,InputTextModule],
    exports: [Spinner],
    declarations: [Spinner]
})
export class SpinnerModule { }
