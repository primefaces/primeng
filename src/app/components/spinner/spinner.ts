import {NgModule,Component,ElementRef,OnInit,Input,Output,EventEmitter,forwardRef,ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputTextModule} from '../inputtext/inputtext';
import {DomHandler} from '../dom/domhandler';
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
            <input #inputfield [attr.type]="type" [attr.id]="inputId" [value]="valueAsString" [attr.name]="name"
            [attr.size]="size" [attr.maxlength]="maxlength" [attr.tabindex]="tabindex" [attr.placeholder]="placeholder" [disabled]="disabled" [attr.readonly]="readonly" [attr.required]="required"
            (keydown)="onInputKeydown($event)" (keyup)="onInputKeyup($event)" (keypress)="onInputKeyPress($event)" (blur)="onInputBlur($event)" (change)="handleChange($event)" (focus)="onInputFocus($event)"
            [ngStyle]="inputStyle" [class]="inputStyleClass" [ngClass]="'ui-spinner-input ui-inputtext ui-widget ui-state-default ui-corner-all'">
            <button type="button" [ngClass]="{'ui-spinner-button ui-spinner-up ui-corner-tr ui-button ui-widget ui-state-default':true,'ui-state-disabled':disabled}" [disabled]="disabled" [attr.readonly]="readonly"
                (mouseleave)="onUpButtonMouseleave($event)" (mousedown)="onUpButtonMousedown($event)" (mouseup)="onUpButtonMouseup($event)">
                <span class="ui-spinner-button-icon fa fa-caret-up ui-clickable"></span>
            </button>
            <button type="button" [ngClass]="{'ui-spinner-button ui-spinner-down ui-corner-br ui-button ui-widget ui-state-default':true,'ui-state-disabled':disabled}" [disabled]="disabled" [attr.readonly]="readonly"
                (mouseleave)="onDownButtonMouseleave($event)" (mousedown)="onDownButtonMousedown($event)" (mouseup)="onDownButtonMouseup($event)">
                <span class="ui-spinner-button-icon fa fa-caret-down ui-clickable"></span>
            </button>
        </span>
    `,
    host: {
        '[class.ui-inputwrapper-filled]': 'filled',
        '[class.ui-inputwrapper-focus]': 'focus'
    },
    providers: [DomHandler,SPINNER_VALUE_ACCESSOR]
})
export class Spinner implements OnInit,ControlValueAccessor {
    
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
    
    @Input() decimalSeparator: string = '.';
    
    @Input() thousandSeparator: string = ',';

    @Input() tabindex: number;
    
    @Input() formatInput: boolean = true;
    
    @Input() type: string = 'text';
    
    @Input() required: boolean;

    @Input() name: string;

    @Input() inputStyle: string;

    @Input() inputStyleClass: string;
    
    value: number;
    
    valueAsString: string = '';
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};
    
    keyPattern: RegExp = /[0-9\+\-]/;
    
    public precision: number;
    
    public timer: any;
    
    public focus: boolean;
    
    public filled: boolean;
    
    public negativeSeparator = '-';
    
    @ViewChild('inputfield') inputfieldViewChild: ElementRef;
    
    constructor(public el: ElementRef, public domHandler: DomHandler) {}
    
    ngOnInit() {
        if(Math.floor(this.step) === 0) {
            this.precision = this.step.toString().split(/[,]|[.]/)[1].length;
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
        let currentValue = this.value||0;
        let newValue: number = null;
        
        if(this.precision)
            this.value = parseFloat(this.toFixed(currentValue + step, this.precision));
        else
            this.value = currentValue + step;
    
        if(this.maxlength !== undefined && this.value.toString().length > this.maxlength) {
            this.value = currentValue;
        }
    
        if(this.min !== undefined && this.value < this.min) {
            this.value = this.min;
        }

        if(this.max !== undefined && this.value > this.max) {
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
        if(!this.disabled) {
            this.inputfieldViewChild.nativeElement.focus();
            this.repeat(event, null, 1);
            this.updateFilledState();
            event.preventDefault();
        }
    }
    
    onUpButtonMouseup(event: Event) {
        if(!this.disabled) {
            this.clearTimer();
        }
    }
    
    onUpButtonMouseleave(event: Event) {
        if(!this.disabled) {
            this.clearTimer();
        }
    }
    
    onDownButtonMousedown(event: Event) {
        if(!this.disabled) {
            this.inputfieldViewChild.nativeElement.focus();
            this.repeat(event, null, -1);
            this.updateFilledState();
            event.preventDefault();
        }
    }
    
    onDownButtonMouseup(event: Event) {
        if(!this.disabled) {
            this.clearTimer();
        }
    }
    
    onDownButtonMouseleave(event: Event) {
        if(!this.disabled) {
            this.clearTimer();
        }
    }
    
    onInputKeydown(event: KeyboardEvent) {
        if(event.which == 38) {
            this.spin(event, 1);
            event.preventDefault();
        }
        else if(event.which == 40) {
            this.spin(event, -1);
            event.preventDefault();
        }
    }
    
    onInputKeyPress(event: KeyboardEvent) {
        let inputChar = String.fromCharCode(event.charCode);
        if(!this.keyPattern.test(inputChar) && inputChar != this.decimalSeparator && event.keyCode != 9 && event.keyCode != 8 && event.keyCode != 37 && event.keyCode != 39 && event.keyCode != 46) {
            event.preventDefault();
        }
    }

    onInputKeyup(event: KeyboardEvent) {
        let inputValue = (<HTMLInputElement> event.target).value;
        if (event.key !== this.decimalSeparator && event.key !== this.thousandSeparator && event.key !== this.negativeSeparator) {
            this.value = this.parseValue(inputValue);
            this.formatValue();
        }
    
        this.onModelChange(this.value);
        this.updateFilledState();
    }
    
    onInputBlur(event) {
        this.focus = false;
        this.restrictValue();
        this.onModelTouched();
        this.onBlur.emit(event);
    }
    
    onInputFocus(event) {
        this.focus = true;
        this.onFocus.emit(event);
    }
    
    parseValue(val: string): number {
        let value: number;
        
        if(this.formatInput) {
            val = val.split(this.thousandSeparator).join('');
        }
        
        if(val.trim() === '') {
            value = null;
        }
        else {
            if(this.precision) {
                value = parseFloat(val.replace(',','.'));
            }
            else {
                value = parseInt(val);
            }
            
            if(isNaN(value)) {
                value = null;
            }
        }
        
        return value;
    }

    restrictValue() {
        let restricted: boolean;

        if(this.max !== undefined && this.value > this.max) {
            this.value = this.max;
            restricted = true;
        }
        
        if(this.min !== undefined && this.value < this.min) {
            this.value = this.min;
            restricted = true;
        }

        if(restricted) {
            this.onModelChange(this.value);
            this.formatValue();
        }
    }
    
    formatValue(): void {
        if(this.value !== null && this.value !== undefined) {
            let textValue = String(this.value).replace('.', this.decimalSeparator);
            
            if(this.formatInput) {
                let parts = textValue.split(this.decimalSeparator);
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandSeparator);
                textValue = parts.join(this.decimalSeparator);
            }
            
            this.valueAsString = textValue;
        }
        else {
            this.valueAsString = '';
        }
        
        this.inputfieldViewChild.nativeElement.value = this.valueAsString;
    }
    
    handleChange(event: Event) {
        this.onChange.emit(event);
    }
    
    clearTimer() {
        if(this.timer) {
            clearInterval(this.timer);
        }
    }
    
    writeValue(value: any) : void {
        this.value = value;
        this.formatValue();
        this.updateFilledState();
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
