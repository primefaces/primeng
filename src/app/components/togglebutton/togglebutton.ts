import {NgModule,Component,Input,Output,EventEmitter,forwardRef,AfterViewInit,ViewChild,ElementRef,ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const TOGGLEBUTTON_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ToggleButton),
  multi: true
};

@Component({
    selector: 'p-toggleButton',
    template: `
        <div [ngClass]="{'p-button p-togglebutton p-component': true, 'ui-button-text-only': (!onIcon && !offIcon),
                        'p-button-icon-only': (onIcon && offIcon && !hasOnLabel && !hasOffLabel),'p-highlight': checked, 'p-disabled':disabled}" 
                        [ngStyle]="style" [class]="styleClass" (click)="toggle($event)" (keydown.enter)="toggle($event)">
            <div class="p-hidden-accessible">
                <input #checkbox type="checkbox" [attr.id]="inputId" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()" [attr.tabindex]="tabindex"
                    role="button" [attr.aria-pressed]="checked" [attr.aria-labelledby]="ariaLabelledBy">
            </div>
            <span *ngIf="onIcon||offIcon" class="p-button-icon" [class]="checked ? this.onIcon : this.offIcon" [ngClass]="{'p-button-icon-left': (iconPos === 'left'), 
            'p-button-icon-right': (iconPos === 'right')}"></span>
            <span class="p-button-label p-unselectable-text">{{checked ? hasOnLabel ? onLabel : '' : hasOffLabel ? offLabel : ''}}</span>
        </div>
    `,
    providers: [TOGGLEBUTTON_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['../button/button.css']
})
export class ToggleButton implements ControlValueAccessor,AfterViewInit {

    @Input() onLabel: string;

    @Input() offLabel: string;

    @Input() onIcon: string;

    @Input() offIcon: string;

    @Input() ariaLabelledBy: string;

    @Input() disabled: boolean;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() inputId: string;

    @Input() tabindex: number;

    @Input() iconPos: string = 'left';

    @Output() onChange: EventEmitter<any> = new EventEmitter();
    
    @ViewChild('checkbox') checkboxViewChild: ElementRef;
    
    checkbox: HTMLInputElement;
    
    checked: boolean = false;

    focus: boolean = false;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};
    
    ngAfterViewInit() {
        if (this.checkboxViewChild){
            this.checkbox = <HTMLInputElement> this.checkboxViewChild.nativeElement;
        }
    }

    constructor(private cd: ChangeDetectorRef) { }
    
    toggle(event: Event) {
        if (!this.disabled) {
            this.checked = !this.checked;
            this.onModelChange(this.checked);
            this.onModelTouched();
            this.onChange.emit({
                originalEvent: event,
                checked: this.checked
            });
            if (this.checkbox) {
                this.checkbox.focus();
            }

            this.cd.markForCheck();
        }
    }

    onFocus() {
        this.focus = true;
    }
    
    onBlur() {
        this.focus = false;
        this.onModelTouched();
    }
    
    writeValue(value: any) : void {
        this.checked = value;
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
    
    get hasOnLabel():boolean {
        return this.onLabel && this.onLabel.length > 0;
    }
    
    get hasOffLabel():boolean {
        return this.onLabel && this.onLabel.length > 0;
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [ToggleButton],
    declarations: [ToggleButton]
})
export class ToggleButtonModule { }
