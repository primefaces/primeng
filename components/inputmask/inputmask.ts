import {Component,ElementRef,AfterViewInit,OnDestroy,HostBinding,HostListener,Input,forwardRef,Provider} from '@angular/core';
import {DomHandler} from '../dom/domhandler';
import {InputText} from '../inputtext/inputtext';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

const INPUTMASK_VALUE_ACCESSOR: Provider = new Provider(NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => InputMask),
    multi: true
});

@Component({
    selector: 'p-inputMask',
    template: `<input pInputText type="text" [value]="value||''" (blur)="onBlur($event)" [ngStyle]="style" [ngClass]="styleClass" [placeholder]="placeholder">`,
    providers: [INPUTMASK_VALUE_ACCESSOR],
    directives: [InputText]
})
export class InputMask implements AfterViewInit,OnDestroy,ControlValueAccessor {

    @Input() mask: string;
    
    @Input() style: string;
    
    @Input() styleClass: string;
    
    @Input() placeholder: string;
    
    @Input() slotChar: string;
    
    @Input() alias: string;
    
    @Input() options: any;
    
    value: any;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};
            
    constructor(private el: ElementRef) {}
        
    ngAfterViewInit() {
        let cfg = {
            mask: this.mask,
            alias: this.alias,
            placeholder: this.slotChar,
            onKeyDown: (event, buffer, caretPos, opts) => {
                this.onModelChange(jQuery(this.el.nativeElement.children[0])['inputmask']('unmaskedvalue'));
            }
        };
        
        if(this.options) {
            for(let prop in this.options) {
                if(this.options.hasOwnProperty(prop)) {
                    cfg[prop] = this.options[prop];
                }
            }
        }
        
        if(this.alias === 'regex')
            jQuery(this.el.nativeElement.children[0])['inputmask']('Regex', cfg);
        else
            jQuery(this.el.nativeElement.children[0])['inputmask'](cfg);
    }
    
    writeValue(value: any) : void {
        this.value = value;
    }
    
    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
    
    onBlur() {
        this.onModelTouched();
    }
                
    ngOnDestroy() {
        
    }
}