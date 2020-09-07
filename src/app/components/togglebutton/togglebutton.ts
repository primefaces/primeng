import {NgModule,Component,Input,Output,EventEmitter,forwardRef,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RippleModule} from 'primeng/ripple';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const TOGGLEBUTTON_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ToggleButton),
  multi: true
};

@Component({
    selector: 'p-toggleButton',
    template: `
        <div [ngClass]="{'p-button p-togglebutton p-component': true, 'p-button-icon-only': (onIcon && offIcon && !hasOnLabel && !hasOffLabel),'p-highlight': checked,'p-disabled':disabled}" 
                        [ngStyle]="style" [class]="styleClass" (click)="toggle($event)" (keydown.enter)="toggle($event)"
                        [attr.tabindex]="disabled ? null : '0'" role="checkbox" [attr.aria-checked]="checked" pRipple>
            <span *ngIf="onIcon||offIcon" [class]="checked ? this.onIcon : this.offIcon" 
                [ngClass]="{'p-button-icon': true, 'p-button-icon-left': (iconPos === 'left'), 'p-button-icon-right': (iconPos === 'right')}"></span>
            <span class="p-button-label">{{checked ? hasOnLabel ? onLabel : '' : hasOffLabel ? offLabel : ''}}</span>
        </div>
    `,
    providers: [TOGGLEBUTTON_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['../button/button.css']
})
export class ToggleButton implements ControlValueAccessor {

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
           
    checked: boolean = false;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};
    
    constructor(public cd: ChangeDetectorRef) { }
    
    toggle(event: Event) {
        if (!this.disabled) {
            this.checked = !this.checked;
            this.onModelChange(this.checked);
            this.onModelTouched();
            this.onChange.emit({
                originalEvent: event,
                checked: this.checked
            });

            this.cd.markForCheck();
        }
    }
    
    onBlur() {
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
        this.cd.markForCheck();
    }
    
    get hasOnLabel():boolean {
        return this.onLabel && this.onLabel.length > 0;
    }
    
    get hasOffLabel():boolean {
        return this.onLabel && this.onLabel.length > 0;
    }
}

@NgModule({
    imports: [CommonModule,RippleModule],
    exports: [ToggleButton],
    declarations: [ToggleButton]
})
export class ToggleButtonModule { }
