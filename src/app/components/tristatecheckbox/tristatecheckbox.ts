import {NgModule,Component,Input,Output,EventEmitter,forwardRef,ChangeDetectorRef,ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
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
        <div [ngStyle]="style" [ngClass]="{'p-checkbox p-component': true,'p-checkbox-disabled': disabled, 'p-checkbox-focused': focused}" [class]="styleClass">
            <div class="p-hidden-accessible">
                <input #input type="text" [attr.id]="inputId" [name]="name" [attr.tabindex]="tabindex" [readonly]="readonly" [disabled]="disabled" (keyup)="onKeyup($event)" (keydown)="onKeydown($event)" (focus)="onFocus()" (blur)="onBlur()" [attr.aria-labelledby]="ariaLabelledBy" inputmode="none">
            </div>
            <div class="p-checkbox-box" (click)="onClick($event,input)"  role="checkbox" [attr.aria-checked]="value === true"
                [ngClass]="{'p-highlight':value!=null,'p-disabled':disabled,'p-focus':focused}">
                <span class="p-checkbox-icon pi" [ngClass]="{'pi-check':value==true,'pi-times':value==false}"></span>
            </div>
        </div>
        <label class="p-checkbox-label" (click)="onClick($event,input)"
               [ngClass]="{'p-checkbox-label-active':value!=null, 'p-disabled':disabled, 'p-checkbox-label-focus':focused}"
               *ngIf="label" [attr.for]="inputId">{{label}}</label>
    `,
    providers: [TRISTATECHECKBOX_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TriStateCheckbox implements ControlValueAccessor  {

    constructor(private cd: ChangeDetectorRef) {}

    @Input() disabled: boolean;

    @Input() name: string;

    @Input() ariaLabelledBy: string;

    @Input() tabindex: number;

    @Input() inputId: string;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() label: string;

    @Input() readonly: boolean;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    focused: boolean;

    value: any;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    onClick(event: Event, input: HTMLInputElement) {
        if (!this.disabled && !this.readonly) {
            this.toggle(event);
            this.focused = true;
            input.focus();
        }
    }

    onKeydown(event: KeyboardEvent) {
        if (event.keyCode == 32) {
            event.preventDefault();
        }
    }

    onKeyup(event: KeyboardEvent) {
        if (event.keyCode == 32 && !this.readonly) {
            this.toggle(event);
            event.preventDefault();
        }
    }

    toggle(event: Event) {
        if (this.value == null || this.value == undefined)
            this.value = true;
        else if (this.value == true)
            this.value = false;
        else if (this.value == false)
            this.value = null;

        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        })
    }

    onFocus() {
        this.focused = true;
    }

    onBlur() {
        this.focused = false;
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
        this.cd.markForCheck();
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [TriStateCheckbox],
    declarations: [TriStateCheckbox]
})
export class TriStateCheckboxModule { }
