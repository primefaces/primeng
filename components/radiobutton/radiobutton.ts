import {NgModule,Component,Input,Output,EventEmitter,forwardRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const RADIO_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioButton),
  multi: true
};

@Component({
    selector: 'p-radioButton',
    template: `
        <div class="ui-radiobutton ui-widget">
            <div class="ui-helper-hidden-accessible">
                <input type="radio" [attr.name]="name" [attr.value]="value" [checked]="checked" (change)="onChange($event,value)"
                    (focus)="onFocus($event)" (blur)="onBlur($event)">
            </div>
            <div (click)="handleClick()" (mouseenter)="hover=true" (mouseleave)="hover=false"
                [ngClass]="{'ui-radiobutton-box ui-widget ui-state-default':true,
                'ui-state-hover':hover&&!disabled,'ui-state-active':checked,'ui-state-disabled':disabled,'ui-state-focus':focused}">
                <span class="ui-radiobutton-icon" [ngClass]="{'fa fa-fw fa-circle':checked}"></span>
            </div>
        </div>
        <label class="ui-radiobutton-label" (click)="select()" *ngIf="label">{{label}}</label>
    `,
    providers: [RADIO_VALUE_ACCESSOR]
})
export class RadioButton implements ControlValueAccessor {

    @Input() value: any;

    @Input() name: string;

    @Input() disabled: boolean;
    
    @Input() label: string;

    @Output() onClick: EventEmitter<any> = new EventEmitter();
    
    protected model: any;
    
    protected onModelChange: Function = () => {};
    
    protected onModelTouched: Function = () => {};
    
    protected checked: boolean;
    
    protected hover: boolean;
    
    protected focused: boolean;

    handleClick() {
        if(!this.disabled) {
            this.onClick.emit(null);
            this.select();
        }
    }
    
    select() {
        if(!this.disabled) {
            this.checked = true;
            this.onModelChange(this.value);
        }
    }
            
    writeValue(model: any) : void {
        this.model = model;
        this.checked = (this.model == this.value);
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
    
    onFocus(event) {
        this.focused = true;
    }

    onBlur(event) {
        this.focused = false;
        this.onModelTouched();
    }
    
    onChange(event) {
        this.select();
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [RadioButton],
    declarations: [RadioButton]
})
export class RadioButtonModule { }