import {NgModule,Component,Input,Output,EventEmitter,forwardRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {ObjectUtils} from '../utils/ObjectUtils';

export const SELECTBUTTON_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectButton),
  multi: true
};

@Component({
    selector: 'p-selectButton',
    template: `
        <div [ngClass]="'ui-selectbutton ui-buttonset ui-widget ui-corner-all ui-buttonset-' + options.length" [ngStyle]="style" [class]="styleClass">
            <div *ngFor="let option of options;" class="ui-button ui-widget ui-state-default ui-button-text-only"
                [ngClass]="{'ui-state-active':isSelected(option), 'ui-state-disabled':disabled}" (click)="onItemClick($event,option)">
                <span class="ui-button-text ui-c">{{getLabel(option)}}</span>
            </div>
        </div>
    `,
    providers: [SELECTBUTTON_VALUE_ACCESSOR, ObjectUtils]
})
export class SelectButton implements ControlValueAccessor {

    @Input() options: Object[];

    @Input() tabindex: number;

    @Input() multiple: boolean;
    
    @Input() style: any;
        
    @Input() styleClass: string;

    @Input() disabled: boolean;

    @Input() labelKey = 'label';

    @Input() valueKey = 'value';

    @Output() onChange: EventEmitter<any> = new EventEmitter();
    
    value: any;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};

    constructor(private objectUtils: ObjectUtils) {}

    getLabel(item: Object) {
        return this.objectUtils.resolveProperty(item, this.labelKey);
    }

    getValue(item: Object) {
        return this.objectUtils.resolveProperty(item, this.valueKey);
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
    
    onItemClick(event, option: Object) {
        if(this.disabled) {
            return;
        }
        
        if(this.multiple) {
            let itemIndex = this.findItemIndex(option);
            if(itemIndex != -1)
                this.value = this.value.filter((val,i) => i!=itemIndex);
            else
                this.value = [...this.value||[], this.getValue(option)];
        }
        else {
            this.value = this.getValue(option);
        }
        
        this.onModelChange(this.value);
        
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    }
    
    isSelected(option: Object) {
        if(this.multiple)
            return this.findItemIndex(option) != -1;
        else
            return this.getValue(option) == this.value;
    }
    
    findItemIndex(option: Object) {
        let index = -1;
        if(this.value) {
            for(let i = 0; i < this.value.length; i++) {
                if(this.value[i] == this.getValue(option)) {
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
