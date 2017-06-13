import {NgModule,Component,ElementRef,OnInit,Input,Output,EventEmitter,forwardRef} from '@angular/core';
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
            <input #in type="text" [attr.id]="inputId" class="ui-spinner-input" [value]="valueAsString" class="ui-inputtext ui-widget ui-state-default ui-corner-all"
            [attr.size]="size" [attr.maxlength]="maxlength" [attr.tabindex]="tabindex" [attr.placeholder]="placeholder" [disabled]="disabled" [readonly]="readonly"
            (keydown)="onInputKeydown($event)" (keyup)="onInput($event,in.value)" (keypress)="onInputKeyPress($event)" (blur)="onInputBlur($event)" (change)="handleChange($event)" (focus)="onFocus()">
            <button type="button" [ngClass]="{'ui-spinner-button ui-spinner-up ui-corner-tr ui-button ui-widget ui-state-default':true,'ui-state-disabled':disabled}" [disabled]="disabled"
                (mouseleave)="onUpButtonMouseleave($event)" (mousedown)="onUpButtonMousedown($event,in)" (mouseup)="onUpButtonMouseup($event)">
                <span class="fa fa-caret-up"></span>
            </button>
            <button type="button" [ngClass]="{'ui-spinner-button ui-spinner-down ui-corner-br ui-button ui-widget ui-state-default':true,'ui-state-disabled':disabled}" [disabled]="disabled"
                (mouseleave)="onDownButtonMouseleave($event)" (mousedown)="onDownButtonMousedown($event,in)" (mouseup)="onDownButtonMouseup($event)">
                <span class="fa fa-caret-down"></span>
            </button>
        </span>
    `,
    host: {
        '[class.ui-inputwrapper-filled]': 'filled',
        '[class.ui-inputwrapper-focus]': 'focus'
    },
    providers: [DomHandler,SPINNER_VALUE_ACCESSOR],
})
export class Spinner implements OnInit,ControlValueAccessor {
        
    @Output() onChange: EventEmitter<any> = new EventEmitter();

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
            
    value: number;
    
    valueAsString: string = '';
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};
        
    keyPattern: RegExp = /[0-9\+\-]/;
        
    public precision: number;
    
    public timer: any;
        
    public focus: boolean;
    
    public filled: boolean;
    
    constructor(public el: ElementRef, public domHandler: DomHandler) {}
    
    ngOnInit() {
        if(Math.floor(this.step) === 0) {
            this.precision = this.step.toString().split(/[,]|[.]/)[1].length;
        }
    }
    
    repeat(interval: number, dir: number) {
        let i = interval||500;

        this.clearTimer();
        this.timer = setTimeout(() => {
            this.repeat(40, dir);
        }, i);

        this.spin(dir);
    }
    
    spin(dir: number) {
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
        this.onChange.emit();
    }
    
    toFixed(value: number, precision: number) {
        let power = Math.pow(10, precision||0);
        return String(Math.round(value * power) / power);
    }
    
    onUpButtonMousedown(event: Event,input: HTMLInputElement) {
        if(!this.disabled) {
            input.focus();
            this.repeat(null, 1);
            this.updateFilledState();
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
    
    onDownButtonMousedown(event: Event, input: HTMLInputElement) {
        if(!this.disabled) {
            input.focus();
            this.repeat(null, -1);
            this.updateFilledState();
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
            this.spin(1);
            event.preventDefault();
        }
        else if(event.which == 40) {
            this.spin(-1);
            event.preventDefault();
        }
    }
    
    onInputKeyPress(event: KeyboardEvent) {
        let inputChar = String.fromCharCode(event.charCode);
        if(!this.keyPattern.test(inputChar) && inputChar != this.decimalSeparator && event.keyCode != 9 && event.keyCode != 8 && event.keyCode != 37 && event.keyCode != 39 && event.keyCode != 46) {
            event.preventDefault();
        }    
    }

    onInput(event: Event, inputValue: string) {
        this.value = this.parseValue(inputValue);
        this.formatValue();       
        this.onModelChange(this.value);
        this.updateFilledState();
    }
    
    onInputBlur(event) {
        this.focus = false;
        this.onModelTouched();
        this.onBlur.emit(event);
    }
    
    onFocus() {
        this.focus = true;
    }
    
    parseValue(val: string): number {
        let value: number;
        
        if(this.formatInput) {
            val = val.split(this.thousandSeparator).join('');
        }
        
        if(val.trim() === '') {
            value= this.min !== undefined ? this.min : null;
        }
        else {        
            if(this.precision) {
                value = parseFloat(val.replace(',','.'));
            }
            else {
                value = parseInt(val);
            }
                            
            if(!isNaN(value)) {
                if(this.max !== undefined && value > this.max) {
                    value = this.max;
                }
                
                if(this.min !== undefined && value < this.min) {
                    value = this.min;
                }
            }
            else {
                value = null;
            }
        }
        
        return value;
    }
    
    formatValue(): void {
        if(this.value !== null && this.value !== undefined) {
            let textValue = String(this.value).replace('.', this.decimalSeparator);
            
            if(this.formatInput) {
                textValue = textValue.replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandSeparator);
            }
            this.valueAsString = textValue;
        }
        else {
            this.valueAsString = '';
        }
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
