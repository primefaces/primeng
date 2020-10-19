import {NgModule,Component,Input,Output,ElementRef,EventEmitter,forwardRef,ViewChild,ChangeDetectorRef,ChangeDetectionStrategy, Injectable, Injector, OnInit, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl} from '@angular/forms';

export const RADIO_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioButton),
    multi: true
};

@Injectable({
    providedIn: 'root',
})
export class RadioControlRegistry {
    private accessors: any[] = [];

    add(control: NgControl, accessor: RadioButton) {
        this.accessors.push([control, accessor]);
    }

    remove(accessor: RadioButton) {
        this.accessors = this.accessors.filter((c) => {
            return c[1] !== accessor;
        })
    }

    select(accessor: RadioButton) {
        this.accessors.forEach((c) => {
            if (this.isSameGroup(c, accessor) && c[1] !== accessor) {
                c[1].writeValue(accessor.value);
            }
        });
    }

    private isSameGroup(controlPair: [NgControl, RadioButton], accessor: RadioButton): boolean {
        if (!controlPair[0].control) {
            return false;
        }

        return controlPair[0].control.root === accessor.control.control.root && controlPair[1].name === accessor.name;
    }
}

@Component({
    selector: 'p-radioButton',
    template: `
        <div [ngStyle]="style" [ngClass]="{'p-radiobutton p-component':true,'p-radiobutton-checked': checked, 'p-radiobutton-disabled': disabled, 'p-radiobutton-focused': focused}" [class]="styleClass">
            <div class="p-hidden-accessible">
                <input #rb type="radio" [attr.id]="inputId" [attr.name]="name" [attr.value]="value" [attr.tabindex]="tabindex" [attr.aria-labelledby]="ariaLabelledBy"
                    [checked]="checked" (change)="onChange($event)" (focus)="onInputFocus($event)" (blur)="onInputBlur($event)" [disabled]="disabled">
            </div>
            <div (click)="handleClick($event, rb, true)" role="radio" [attr.aria-checked]="checked"
                [ngClass]="{'p-radiobutton-box':true,
                'p-highlight': checked, 'p-disabled': disabled, 'p-focus': focused}">
                <span class="p-radiobutton-icon"></span>
            </div>
        </div>
        <label (click)="select($event)" [class]="labelStyleClass"
            [ngClass]="{'p-radiobutton-label':true, 'p-radiobutton-label-active':rb.checked, 'p-disabled':disabled, 'p-radiobutton-label-focus':focused}"
            *ngIf="label" [attr.for]="inputId">{{label}}</label>
    `,
    providers: [RADIO_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioButton implements ControlValueAccessor, OnInit, OnDestroy {

    @Input() value: any;

    @Input() formControlName: string;

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

    @ViewChild('rb') inputViewChild: ElementRef;

    public onModelChange: Function = () => {};

    public onModelTouched: Function = () => {};

    public checked: boolean;

    public focused: boolean;

    control: NgControl;

    constructor(public cd: ChangeDetectorRef, private injector: Injector, private registry: RadioControlRegistry) {}

    ngOnInit() {
        if (this.formControlName) {
            this.control = this.injector.get(NgControl);
            this.checkName();
            this.registry.add(this.control, this);
        }
    }
    
    handleClick(event, radioButton, focus) {
        event.preventDefault();

        if (this.disabled) {
            return;
        }

        this.select(event);

        if (focus) {
            radioButton.focus();
        }
    }
    
    select(event) {
        if (!this.disabled) {
            this.inputViewChild.nativeElement.checked = true;
            this.checked = true;
            this.onModelChange(this.value);
            
            if (this.formControlName) {
                this.registry.select(this);
            }

            this.onClick.emit(event);
        }
    }

    writeValue(value: any) : void {
        this.checked = (value == this.value);

        if (this.inputViewChild && this.inputViewChild.nativeElement) {
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
        this.cd.markForCheck();
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

    focus() {
        this.inputViewChild.nativeElement.focus();
    }

    ngOnDestroy() {
        if (this.formControlName) {
            this.registry.remove(this);
        }
    }

    private checkName() {
        if (this.name && this.formControlName && this.name !== this.formControlName) {
            this.throwNameError();
        }
        if (!this.name && this.formControlName) {
            this.name = this.formControlName;
        }
    }

    private throwNameError() {
        throw new Error(`
          If you define both a name and a formControlName attribute on your radio button, their values
          must match. Ex: <p-radioButton formControlName="food" name="food"></p-radioButton>
        `);
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [RadioButton],
    declarations: [RadioButton]
})
export class RadioButtonModule { }