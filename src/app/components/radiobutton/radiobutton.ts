import {NgModule,Component,Input,Output,ElementRef,EventEmitter,forwardRef,ViewChild,ChangeDetectorRef} from '@angular/core';
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
        <div [ngStyle]="style" [ngClass]="'ui-radiobutton ui-widget'" [class]="styleClass">
            <div class="ui-helper-hidden-accessible">
                <input #rb type="radio" [attr.id]="inputId" [attr.name]="name" [attr.value]="value" [attr.tabindex]="tabindex" 
                    [checked]="checked" (change)="onInputChange($event)" (focus)="onInputFocus($event)" (blur)="onInputBlur($event)"
                    [disabled]="disabled">
            </div>
            <div (click)="onFakeInputClick($event)"
                [ngClass]="{'ui-radiobutton-box ui-widget ui-state-default':true,
                'ui-state-active':rb.checked,'ui-state-disabled':disabled,'ui-state-focus':focused}">
                <span class="ui-radiobutton-icon ui-clickable" [ngClass]="{'fa fa-circle':rb.checked}"></span>
            </div>
        </div>
        <label (click)="onLabelClick($event)" [class]="labelStyleClass"
            [ngClass]="{'ui-radiobutton-label':true, 'ui-label-active':rb.checked, 'ui-label-disabled':disabled, 'ui-label-focus':focused}"
            *ngIf="label" [attr.for]="inputId">{{label}}</label>
    `,
    providers: [RADIO_VALUE_ACCESSOR]
})
export class RadioButton implements ControlValueAccessor {

    @Input() value: any;

    @Input() name: string;

    @Input() disabled: boolean;
    
    @Input() label: string;

    @Input() tabindex: number;

    @Input() inputId: string;
    
    @Input() style: any;

    @Input() styleClass: string;

    @Input() labelStyleClass: string;

    @Output() onClick: EventEmitter<any> = new EventEmitter();
    
    @ViewChild('rb') inputViewChild: ElementRef;
            
    public onModelChange: Function = () => {};
    
    public onModelTouched: Function = () => {};
    
    public checked: boolean;
        
    public focused: boolean;

    constructor(private cd: ChangeDetectorRef) {}
    
    onFakeInputClick(event) {
        this.select(event);
    }
    
    select(event) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        this.onClick.emit(null);
        this.inputViewChild.nativeElement.checked = true;
        this.checked = true;
        this.onModelChange(this.value);
    }
            
    writeValue(value: any) : void {
        this.checked = (value == this.value);

        if(this.inputViewChild.nativeElement) {
            this.inputViewChild.nativeElement.checked = this.checked;
        }
        
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
    
    onInputFocus(event) {
        this.focused = true;
    }

    onInputBlur(event) {
        this.focused = false;
        this.onModelTouched();
    }
    
    onInputChange(event) {
        this.select(event);
    }

    onLabelClick(event) {
        this.select(event);
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [RadioButton],
    declarations: [RadioButton]
})
export class RadioButtonModule { }