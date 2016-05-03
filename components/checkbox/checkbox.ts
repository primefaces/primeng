import {Component,Input,Output,EventEmitter,forwardRef,Provider} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/common';

const CHECKBOX_VALUE_ACCESSOR: Provider = new Provider(NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => Checkbox),
    multi: true
});

@Component({
    selector: 'p-checkbox',
    template: `
        <div class="ui-chkbox ui-widget">
            <div class="ui-helper-hidden-accessible">
                <input #cb type="checkbox" name="{{name}}" value="{{value}}" [checked]="checked" (blur)="onModelTouched()">
            </div>
            <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default" (click)="onClick()"
                        (mouseover)="hover=true" (mouseout)="hover=false" 
                        [ngClass]="{'ui-state-hover':hover&&!disabled,'ui-state-active':checked,'ui-state-disabled':disabled}">
                <span class="ui-chkbox-icon ui-c" [ngClass]="{'fa fa-fw fa-check':checked}"></span>
            </div>
        </div>
    `,
    providers: [CHECKBOX_VALUE_ACCESSOR]
})
export class Checkbox implements ControlValueAccessor {

    @Input() value: any;

    @Input() name: string;

    @Input() disabled: boolean;
    
    @Output() onChange: EventEmitter<any> = new EventEmitter();
    
    model: any;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};
    
    hover: boolean;
    
    checked: boolean = false;

    onClick() {
        if(this.disabled) {
            return;
        }
        
        this.checked = !this.checked;

        if(this.name) {
            if(this.checked)
                this.addValue(this.value);
            else
                this.removeValue(this.value);

            this.onModelChange(this.model);
        }
        else {
            this.onModelChange(this.checked);
        }
        
        this.onChange.emit(this.checked);
    }

    isChecked(): boolean {
        if(this.name)
            return this.findValueIndex(this.value) !== -1;
        else
            return this.model;
    }

    removeValue(value) {
        var index = this.findValueIndex(value);
        if(index >= 0) {
            this.model.splice(index, 1);
        }
    }

    addValue(value) {
        this.model.push(value);
    }

    findValueIndex(value) {
        var index: number = -1;
        if(this.model) {
            for (var i = 0; i < this.model.length; i++) {
                if(this.model[i] == value) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }
    
    writeValue(model: any) : void {
        this.model = model;
        this.checked = this.isChecked();
    }
    
    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
}