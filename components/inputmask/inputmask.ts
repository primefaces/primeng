import {NgModule,Component,ElementRef,AfterViewInit,OnDestroy,HostBinding,HostListener,Input,forwardRef,Output,EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {InputTextModule} from '../inputtext/inputtext';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const INPUTMASK_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputMask),
  multi: true
};

@Component({
    selector: 'p-inputMask',
    template: `<input pInputText type="text" [value]="value||''" (blur)="onBlur($event)" [ngStyle]="style" [ngClass]="styleClass" [placeholder]="placeholder"
        [attr.size]="size" [attr.maxlength]="maxlength" [attr.tabindex]="tabindex" [disabled]="disabled" [readonly]="readonly">`,
    providers: [INPUTMASK_VALUE_ACCESSOR]
})
export class InputMask implements AfterViewInit,OnDestroy,ControlValueAccessor {

    @Input() mask: string;
    
    @Input() style: string;
    
    @Input() styleClass: string;
    
    @Input() placeholder: string;
    
    @Input() slotChar: string;
    
    @Input() alias: string;
    
    @Input() options: any;
    
    @Input() unmask: boolean;
        
    @Input() clearMaskOnLostFocus: boolean = true;
    
    @Input() clearIncomplete: boolean = true;
    
    @Input() size: number;
    
    @Input() maxlength: number;
    
    @Input() tabindex: string;
    
    @Input() disabled: boolean;
    
    @Input() readonly: boolean;
    
    @Output() onComplete: EventEmitter<any> = new EventEmitter();
    
    @Output() onInComplete: EventEmitter<any> = new EventEmitter();
    
    value: any;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};
            
    constructor(protected el: ElementRef) {}
        
    ngAfterViewInit() {
        let cfg = {
            mask: this.mask,
            alias: this.alias,
            placeholder: this.slotChar,
            clearIncomplete: this.clearIncomplete,
            clearMaskOnLostFocus: this.clearMaskOnLostFocus,
			onKeyDown: (event, buffer, caretPos, opts) => {
				let val = this.unmask ? this.getUnmasekd() : event.target.value;
				this.onModelChange(val);
			},
			onBeforeWrite: (event, buffer, caretPos, opts) => {
				if(event.target != null){
					let val = this.unmask ? this.getUnmasekd() : event.target.value;
					this.onModelChange(val);
				}
            },
            oncomplete: (event) => {
                this.onComplete.emit(event);
            },
            onincomplete: (event) => {
                this.onInComplete.emit(event);
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
    getUnmasekd():string {
        let unmaskedVal = jQuery(this.el.nativeElement.children[0])['inputmask']('unmaskedvalue');
        let decimalRegex = /currency|decimal/g;
        if (decimalRegex.test(this.alias) && unmaskedVal && this.options && this.options.radixPoint) {
            unmaskedVal = Number(unmaskedVal.replace(this.options.radixPoint, '.'))
        }

        return unmaskedVal || "";
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
    
    setDisabledState(val: boolean): void {
        this.disabled = val;
    }
    
    onBlur() {
        this.onModelTouched();
    }
                
    ngOnDestroy() {
        jQuery(this.el.nativeElement.children[0])['inputmask']('remove');
    }
}

@NgModule({
    imports: [CommonModule,InputTextModule],
    exports: [InputMask],
    declarations: [InputMask]
})
export class InputMaskModule { }