import {NgModule,Component,ElementRef,Input,Output,OnDestroy,EventEmitter,forwardRef,Renderer2} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const COLORPICKER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ColorPicker),
  multi: true
};

@Component({
    selector: 'p-colorPicker',
    template: `
        <div [ngClass]="'ui-colorpicker ui-widget'" [ngStyle]="style" [class]="styleClass">
            
        </div>
    `,
    providers: [DomHandler,COLORPICKER_VALUE_ACCESSOR]
})
export class ColorPicker implements ControlValueAccessor, OnDestroy{

    @Input() style: any;

    @Input() styleClass: string;
    
    value: any;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};
            
    disabled: boolean;
                
    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2) {}
    
    writeValue(value: any) : void {
        this.value = value;
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
    
    ngOnDestroy() {
        
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [ColorPicker],
    declarations: [ColorPicker]
})
export class ColorPickerModule { }