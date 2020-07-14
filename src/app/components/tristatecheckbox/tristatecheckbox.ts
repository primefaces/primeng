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
        <div [ngStyle]="style" [ngClass]="{'ui-chkbox ui-tristatechkbox ui-widget': true,'ui-chkbox-readonly': readonly}" [class]="styleClass">
            <div class="ui-helper-hidden-accessible">
                <input #input type="text" [attr.id]="inputId" [name]="name" [attr.tabindex]="tabindex" [readonly]="readonly" [disabled]="disabled" (keyup)="onKeyup($event)" (keydown)="onKeydown($event)" (focus)="onFocus()" (blur)="onBlur()" [attr.aria-labelledby]="ariaLabelledBy">
            </div>
            <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default" (click)="onClick($event,input)"  role="checkbox" [attr.aria-checked]="value === true"
                [ngClass]="{'ui-state-active':value!=null,'ui-state-disabled':disabled,'ui-state-focus':focus}">
                <span class="ui-chkbox-icon pi ui-clickable" [ngClass]="{'pi-check':value==true,'pi-times':value==false}"></span>
            </div>
        </div>
        <label class="ui-chkbox-label" (click)="onClick($event,input)"
               [ngClass]="{'ui-label-active':value!=null, 'ui-label-disabled':disabled, 'ui-label-focus':focus}"
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

    focus: boolean;

    value: any;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    onClick(event: Event, input: HTMLInputElement) {
        if (!this.disabled && !this.readonly) {
            this.toggle(event);
            this.focus = true;
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
