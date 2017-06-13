import {NgModule,Component,Input,Output,EventEmitter,forwardRef,ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const TRISTATECHECKBOX_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TriStateCheckbox),
  multi: true
};

@Component({
    selector: 'p-triStateCheckbox',
    template: `
        <div [ngStyle]="style" [ngClass]="'ui-chkbox ui-tristatechkbox ui-widget'" [class]="styleClass">
            <div class="ui-helper-hidden-accessible">
                <input #input type="text" [attr.id]="inputId" [name]="name" [attr.tabindex]="tabindex" readonly [disabled]="disabled" (keyup)="onKeyup($event)" (keydown)="onKeydown($event)" (focus)="onFocus()" (blur)="onBlur()">
            </div>
            <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default" (click)="onClick($event,input)"
                [ngClass]="{'ui-state-active':value!=null,'ui-state-disabled':disabled,'ui-state-focus':focus}">
                <span class="ui-chkbox-icon fa ui-c" [ngClass]="{'fa-check':value==true,'fa-close':value==false}"></span>
            </div>
        </div>
    `,
    providers: [TRISTATECHECKBOX_VALUE_ACCESSOR]
})
export class TriStateCheckbox implements ControlValueAccessor  {
    
    constructor(private cd: ChangeDetectorRef) {}

    @Input() disabled: boolean;
    
    @Input() name: string;

    @Input() tabindex: number;

    @Input() inputId: string;

    @Input() style: any;

    @Input() styleClass: string;
    
    @Output() onChange: EventEmitter<any> = new EventEmitter();
        
    focus: boolean;

    value: any;

    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};
    
    onClick(event: Event, input: HTMLInputElement) {
        if(!this.disabled) {
            this.toggle(event);
            this.focus = true;
            input.focus();
        }
    }
    
    onKeydown(event: KeyboardEvent) {
        if(event.keyCode == 32) {
            event.preventDefault();
        }
    }
    
    onKeyup(event: KeyboardEvent) {
        if(event.keyCode == 32) {
            this.toggle(event);
            event.preventDefault();
        }
    }
    
    toggle(event: Event) {
        if(this.value == null || this.value == undefined)
            this.value = true;
        else if(this.value == true)
            this.value = false;
        else if(this.value == false)
            this.value = null;
            
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        })
    }
    
    onFocus() {
        this.focus = true;
    }
    
    onBlur() {
        this.focus = false;
        this.onModelTouched();
    }
    
    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    writeValue(value: any) : void {
        this.value = value;
        this.cd.markForCheck();
    }
    
    setDisabledState(disabled: boolean): void {
        this.disabled = disabled;
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [TriStateCheckbox],
    declarations: [TriStateCheckbox]
})
export class TriStateCheckboxModule { }
