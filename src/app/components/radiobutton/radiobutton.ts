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
                <input #rb type="radio" [attr.id]="inputId" [attr.name]="name" [attr.value]="value" [attr.tabindex]="tabindex" [attr.aria-labelledby]="ariaLabelledBy"
                    [checked]="checked" (change)="onChange($event)" (focus)="onInputFocus($event)" (blur)="onInputBlur($event)" [disabled]="disabled">
            </div>
            <div (click)="handleClick($event, rb, true)" role="radio" [attr.aria-checked]="checked"
                [ngClass]="{'ui-radiobutton-box ui-widget ui-state-default':true,
                'ui-state-active':rb.checked,'ui-state-disabled':disabled,'ui-state-focus':focused}">
                <span class="ui-radiobutton-icon ui-clickable" [ngClass]="{'pi pi-circle-on':rb.checked}"></span>
            </div>
        </div>
        <label (click)="select($event)" [class]="labelStyleClass"
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

    @Input() ariaLabelledBy: string;
    
    @Input() style: any;

    @Input() styleClass: string;

    @Input() labelStyleClass: string;

    @Output() onClick: EventEmitter<any> = new EventEmitter();

    @Output() onFocus: EventEmitter<any> = new EventEmitter();

    @Output() onBlur: EventEmitter<any> = new EventEmitter();
    
    @ViewChild('rb', { static: true }) inputViewChild: ElementRef;
            
    public onModelChange: Function = () => {};
    
    public onModelTouched: Function = () => {};
    
    public checked: boolean;
        
    public focused: boolean;

    constructor(private cd: ChangeDetectorRef) {}
    
    handleClick(event, radioButton, focus) {
        event.preventDefault();

        if(this.disabled) {
            return;
        }

        this.select(event);

        if(focus) {
            radioButton.focus();
        }
    }
    
    select(event) {
        if (!this.disabled) {
            this.inputViewChild.nativeElement.checked = true;
            this.checked = true;
            this.onModelChange(this.value);
            this.onClick.emit(event);
        }
    }
            
    writeValue(value: any) : void {
        this.checked = (value == this.value);

        if(this.inputViewChild && this.inputViewChild.nativeElement) {
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
        this.onFocus.emit(event);
    }

    onInputBlur(event) {
        this.focused = false;
        this.onModelTouched();
        this.onBlur.emit(event);
    }
    
    onChange(event) {
        this.select(event);
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [RadioButton],
    declarations: [RadioButton]
})
export class RadioButtonModule { }