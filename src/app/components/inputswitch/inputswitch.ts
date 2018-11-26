import {NgModule,Component,Input,forwardRef,EventEmitter,Output,ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NG_VALUE_ACCESSOR,ControlValueAccessor} from '@angular/forms';
import {DomHandler} from '../dom/domhandler';

export const INPUTSWITCH_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputSwitch),
  multi: true
};

@Component({
    selector: 'p-inputSwitch',
    template: `
        <div [ngClass]="{'ui-inputswitch ui-widget': true, 'ui-inputswitch-checked': checked, 'ui-state-disabled': disabled, 'ui-inputswitch-readonly': readonly, 'ui-inputswitch-focus': focused}" 
            [ngStyle]="style" [class]="styleClass" (click)="onClick($event, cb)" role="checkbox" [attr.aria-checked]="checked">
            <div class="ui-helper-hidden-accessible">
                <input #cb type="checkbox" [attr.id]="inputId" [attr.name]="name" [attr.tabindex]="tabindex" [checked]="checked" (change)="onInputChange($event)"
                        (focus)="onFocus($event)" (blur)="onBlur($event)" [disabled]="disabled" />
            </div>
            <span class="ui-inputswitch-slider"></span>
        </div>
    `,
    providers: [INPUTSWITCH_VALUE_ACCESSOR,DomHandler]
})
export class InputSwitch implements ControlValueAccessor {

    @Input() style: any;

    @Input() styleClass: string;

    @Input() tabindex: number;

    @Input() inputId: string;

    @Input() name: string;

    @Input() disabled: boolean;

    @Input() readonly: boolean;
    
    @Output() onChange: EventEmitter<any> = new EventEmitter();

    checked: boolean = false;

    focused: boolean = false;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    constructor(private cd: ChangeDetectorRef) {}

    onClick(event: Event, cb: HTMLInputElement) {
        if (!this.disabled && !this.readonly) {  
            this.toggle(event);
            cb.focus();
        }
    }

    onInputChange(event: Event) {
        if (!this.readonly) {
            const inputChecked = (<HTMLInputElement> event.target).checked;
            this.updateModel(event, inputChecked);
        }
    }

    toggle(event: Event) {
        this.updateModel(event, !this.checked);
    }

    updateModel(event: Event, value: boolean) {
        this.checked = value;
        this.onModelChange(this.checked);
        this.onChange.emit({
            originalEvent: event,
            checked: this.checked
        });
    }

    onFocus(event: Event) {
        this.focused = true;
    }

    onBlur(event: Event) {
        this.focused = false;
        this.onModelTouched();
    }

    writeValue(checked: any) : void {
        this.checked = checked;
        this.cd.markForCheck();
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
    exports: [InputSwitch],
    declarations: [InputSwitch]
})
export class InputSwitchModule { }
