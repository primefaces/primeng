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
                <input #rb type="radio" [attr.name]="name" [attr.value]="value" [checked]="checked" (change)="onChange($event)"
                    (focus)="onFocus($event)" (blur)="onBlur($event)">
            </div>
            <div (click)="handleClick(rb)" (mouseenter)="hover=true" (mouseleave)="hover=false"
                [ngClass]="{'ui-radiobutton-box ui-widget ui-state-default':true,
                'ui-state-hover':hover&&!disabled,'ui-state-active':rb.checked,'ui-state-disabled':disabled,'ui-state-focus':focused}">
                <span class="ui-radiobutton-icon" [ngClass]="{'fa fa-fw fa-circle':rb.checked}"></span>
            </div>
        </div>
        <label class="ui-radiobutton-label" (click)="select(rb)" *ngIf="label">{{label}}</label>
    `,
    providers: [RADIO_VALUE_ACCESSOR]
})
export class RadioButton implements ControlValueAccessor {

    @Input() value: any;

    @Input() name: string;

    @Input() disabled: boolean;
    
    @Input() label: string;

    @Output() onClick: EventEmitter<any> = new EventEmitter();
        
    public onModelChange: Function = () => {};
    
    public onModelTouched: Function = () => {};
    
    public checked: boolean;
    
    public hover: boolean;
    
    public focused: boolean;

    handleClick(rb: HTMLInputElement) {
        if(!this.disabled) {
            this.onClick.emit(null);
            this.select(rb);
        }
    }
    
    select(rb: HTMLInputElement) {
        if(!this.disabled) {
            rb.checked = true;
            this.onModelChange(this.value);
        }
    }
            
    writeValue(model: any) : void {
        this.checked = (model == this.value);
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
    
    onChange(event,rb: HTMLInputElement) {
        this.select(rb);
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [RadioButton],
    declarations: [RadioButton]
})
export class RadioButtonModule { }