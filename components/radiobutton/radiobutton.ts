import {Component,Input,Output,EventEmitter,forwardRef,Provider} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

const RADIO_VALUE_ACCESSOR: Provider = new Provider(NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => RadioButton),
    multi: true
});

@Component({
    selector: 'p-radioButton',
    template: `
        <div class="ui-radiobutton ui-widget">
            <div class="ui-helper-hidden-accessible">
                <input type="radio" [attr.name]="name" [attr.value]="value" [checked]="checked" (blur)="onModelTouched()">
            </div>
            <div class="ui-radiobutton-box ui-widget ui-radiobutton-relative ui-state-default" (click)="onclick()"
                        (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()" [ngClass]="{'ui-state-hover':hover&&!disabled,'ui-state-active':checked,'ui-state-disabled':disabled}">
                <span class="ui-radiobutton-icon" [ngClass]="{'fa fa-fw fa-circle':checked}"></span>
            </div>
        </div>
    `,
    providers: [RADIO_VALUE_ACCESSOR]
})
export class RadioButton implements ControlValueAccessor {

    @Input() value: any;

    @Input() name: string;

    @Input() disabled: boolean;

    @Output() click: EventEmitter<any> = new EventEmitter();
    
    model: any;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};
    
    checked: boolean;
    
    private hover: boolean;

    onclick() {
        if(!this.disabled) {
            this.click.emit(null);
            this.checked = true;
            this.onModelChange(this.value);
        }
    }
    
    onMouseEnter() {
        this.hover = true;
    }
    
    onMouseLeave() {
        this.hover = false;
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
}