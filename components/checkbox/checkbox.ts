import {NgModule,Component,Input,Output,EventEmitter,forwardRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const CHECKBOX_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Checkbox),
  multi: true
};

@Component({
    selector: 'p-checkbox',
    template: `
        <div class="ui-chkbox ui-widget">
            <div class="ui-helper-hidden-accessible">
                <input #cb type="checkbox" name="{{name}}" value="{{value}}" [checked]="checked" (focus)="onFocus($event)" (blur)="onBlur($event)"
                [ngClass]="{'ui-state-focus':focused}" (keydown.space)="onClick($event,cb,false)">
            </div>
            <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default" (click)="onClick($event,cb,true)"
                        (mouseover)="hover=true" (mouseout)="hover=false" 
                        [ngClass]="{'ui-state-hover':hover&&!disabled,'ui-state-active':checked,'ui-state-disabled':disabled,'ui-state-focus':focused}">
                <span class="ui-chkbox-icon ui-c" [ngClass]="{'fa fa-fw fa-check':checked}"></span>
            </div>
        </div>
        <label class="ui-chkbox-label" (click)="onClick($event,cb,true)" *ngIf="label">{{label}}</label>
    `,
    providers: [CHECKBOX_VALUE_ACCESSOR]
})
export class Checkbox implements ControlValueAccessor {

    @Input() value: any;

    @Input() name: string;

    @Input() disabled: boolean;
    
    @Input() binary: string;
    
    @Input() label: string;
    
    @Output() onChange: EventEmitter<any> = new EventEmitter();
    
    model: any;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};
    
    hover: boolean;
    
    focused: boolean = false;
    
    checked: boolean = false;

    onClick(event,checkbox,focus:boolean) {
        event.preventDefault();
        
        if(this.disabled) {
            return;
        }
        
        this.checked = !this.checked;

        if(!this.binary) {
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
        
        if(focus) {
            checkbox.focus();
        }
    }

    isChecked(): boolean {
        if(!this.binary)
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
    
    onFocus(event) {
        this.focused = true;
    }

    onBlur(event) {
        this.focused = false;
        this.onModelTouched();
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
    
    setDisabledState(val: boolean): void {
        this.disabled = val;
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Checkbox],
    declarations: [Checkbox]
})
export class CheckboxModule { }