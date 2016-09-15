import {NgModule,Component,Input,Output,EventEmitter,forwardRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectItem} from '../common/api';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const SELECTBUTTON_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectButton),
  multi: true
};

@Component({
    selector: 'p-selectButton',
    template: `
        <div [ngClass]="'ui-selectbutton ui-buttonset ui-widget ui-corner-all ui-buttonset-' + options.length" (mouseleave)="hoveredItem=null" [ngStyle]="style" [class]="styleClass">
            <div *ngFor="let option of options;" class="ui-button ui-widget ui-state-default ui-button-text-only"
                [ngClass]="{'ui-state-hover': (hoveredItem==option)&&!disabled,'ui-state-active':isSelected(option), 'ui-state-disabled':disabled}"
                (mouseenter)="hoveredItem=option" (click)="onItemClick($event,option)">
                <span class="ui-button-text ui-c">{{option.label}}</span>
            </div>
        </div>
    `,
    providers: [SELECTBUTTON_VALUE_ACCESSOR]
})
export class SelectButton implements ControlValueAccessor {

    @Input() options: SelectItem[];

    @Input() tabindex: number;

    @Input() multiple: boolean;
    
    @Input() style: any;
        
    @Input() styleClass: string;

    @Input() disabled: boolean;

    @Output() onChange: EventEmitter<any> = new EventEmitter();
    
    value: any;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};

    protected hoveredItem: any;
    
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
    
    onItemClick(event, option: SelectItem) {
        if(this.disabled) {
            return;
        }
        
        if(this.multiple) {
            let itemIndex = this.findItemIndex(option);
            if(itemIndex != -1)
                this.value.splice(itemIndex, 1);
            else
                this.value.push(option.value);
        }
        else {
            this.value = option.value;
        }
        
        this.onModelChange(this.value);
        
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    }
    
    isSelected(option: SelectItem) {
        if(this.multiple)
            return this.findItemIndex(option) != -1;
        else
            return option.value == this.value;
    }
    
    findItemIndex(option: SelectItem) {
        let index = -1;
        if(this.value) {
            for(let i = 0; i < this.value.length; i++) {
                if(this.value[i] == option.value) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [SelectButton],
    declarations: [SelectButton]
})
export class SelectButtonModule { }