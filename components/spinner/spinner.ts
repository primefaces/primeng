import {NgModule,Component,ElementRef,AfterViewInit,Input,Output,EventEmitter,forwardRef} from '@angular/core';
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
            <input #in pInputText type="text" class="ui-spinner-input"
            [attr.size]="size" [attr.maxlength]="maxlength" [attr.readonly]="readonly" [attr.disabled]="disabled"
            (keydown)="onInputKeydown($event,in)" (input)="onInput($event)" (blur)="onBlur(in)" (change)="handleChange($event)">
            <a class="ui-spinner-button ui-spinner-up ui-corner-tr ui-button ui-widget ui-state-default ui-button-text-only"
                [ngClass]="{'ui-state-hover':hoverUp,'ui-state-active':activeUp,'ui-state-disabled':disabled}"
                (mouseenter)="onUpButtonMouseenter($event)" (mouseleave)="onUpButtonMouseleave($event)" (mousedown)="onUpButtonMousedown($event,in)" (mouseup)="onUpButtonMouseup($event)">
                <span class="ui-button-text">
                    <span class="fa fa-fw fa-caret-up"></span>
                </span>
            </a>
            <a class="ui-spinner-button ui-spinner-down ui-corner-br ui-button ui-widget ui-state-default ui-button-text-only"
                [ngClass]="{'ui-state-hover':hoverDown,'ui-state-active':activeDown,'ui-state-disabled':disabled}"
                (mouseenter)="onDownButtonMouseenter($event)" (mouseleave)="onDownButtonMouseleave($event)" (mousedown)="onDownButtonMousedown($event,in)" (mouseup)="onDownButtonMouseup($event)">
                <span class="ui-button-text">
                    <span class="fa fa-fw fa-caret-down"></span>
                </span>
            </a>
        </span>
    `,
    providers: [DomHandler,SPINNER_VALUE_ACCESSOR]
})
export class Spinner implements AfterViewInit,ControlValueAccessor {
        
    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Input() step: number = 1;

    @Input() min: number;

    @Input() max: number;
    
    @Input() maxlength: number;
    
    @Input() size: number;

    @Input() disabled: boolean;
    
    value: number;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};
        
    protected hoverUp: boolean;
    
    protected activeUp: boolean;
    
    protected hoverDown: boolean;
    
    protected activeDown: boolean;

    protected precision: number;
    
    protected timer: any;
    
    protected inputtext: any;
    
    constructor(protected el: ElementRef, protected domHandler: DomHandler) {}
    
    ngAfterViewInit() {
        if(Math.floor(this.step) === 0) {
            this.precision = this.step.toString().split(/[,]|[.]/)[1].length;
        }
        
        this.inputtext = this.domHandler.findSingle(this.el.nativeElement, 'input');
        if((this.value !== null && this.value !== undefined)) {
            this.inputtext.value = this.value;
        }
    }
    
    repeat(interval, dir, input) {
        let i = interval||500;

        this.clearTimer();
        this.timer = setTimeout(() => {
            this.repeat(40, dir, input);
        }, i);

        this.spin(dir, input);
    }
    
    spin(dir: number,inputElement) {
        let step = this.step * dir;
        let currentValue = this.value||0;
        let newValue = null;
        
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
        
        inputElement.value = this.value;
        this.onModelChange(this.value);
    }
    
    toFixed(value: number, precision: number) {
        let power = Math.pow(10, precision||0);
        return String(Math.round(value * power) / power);
    }
    
    onUpButtonMousedown(event,input) {
        if(!this.disabled) {
            input.focus();
            this.activeUp = true;
            this.repeat(null, 1, input);
            
            event.preventDefault();
        }
    }
    
    onUpButtonMouseup(event) {
        if(!this.disabled) {
            this.activeUp = false;
            this.clearTimer();
        }        
    }
    
    onUpButtonMouseenter(event) {
        if(!this.disabled) {
            this.hoverUp = true;
        }
    }
    
    onUpButtonMouseleave(event) {
        if(!this.disabled) {
            this.hoverUp = false;
            this.activeUp = false;
            this.clearTimer();
        }
    }
    
    onDownButtonMousedown(event,input) {
        if(!this.disabled) {
            input.focus();
            this.activeDown = true;
            this.repeat(null, -1, input);
            
            event.preventDefault();
        }
    }
    
    onDownButtonMouseup(event) {
        if(!this.disabled) {
            this.activeDown = false;
            this.clearTimer();
        }
    }
    
    onDownButtonMouseenter(event) {
        if(!this.disabled) {
            this.hoverDown = true;
        }
    }
    
    onDownButtonMouseleave(event) {
        if(!this.disabled) {
            this.hoverDown = false;
            this.activeDown = false;
            this.clearTimer();
        }
    }
    
    onInputKeydown(event,inputElement) {  
        if(event.which == 38) {
            this.spin(1,inputElement);
            event.preventDefault();
        }
        else if(event.which == 40) {
            this.spin(-1,inputElement);
            event.preventDefault();
        }    
    }
    
    onInput(event) {
        this.value = this.parseValue(event.target.value);        
        this.onModelChange(this.value);
    }
    
    onBlur(inputElement) {
        if(this.value !== undefined && this.value !== null) {
            inputElement.value = this.value;
        }
        this.onModelTouched();
    }
    
    parseValue(val: string): number {
        let value: number;
        if(val.trim() === '') {
            value= this.min !== undefined ? this.min : null;
        }
        else {        
            if(this.precision)
                value = parseFloat(val);
            else
                value = parseInt(val);
                            
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
    
    handleChange(event) {
        this.onChange.emit(event);
    }
        
    clearTimer() {
        if(this.timer) {
            clearInterval(this.timer);
        }
    }
    
    writeValue(value: any) : void {
        this.value = value;
        
        if(this.inputtext && (this.value !== null && this.value !== undefined)) {
            this.inputtext.value = this.value;
        }
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
}


@NgModule({
    imports: [CommonModule,InputTextModule],
    exports: [Spinner],
    declarations: [Spinner]
})
export class SpinnerModule { }
