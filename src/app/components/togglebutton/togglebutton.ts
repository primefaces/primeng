import {NgModule,Component,Input,Output,EventEmitter,forwardRef,AfterViewInit,ViewChild,ElementRef,ChangeDetectionStrategy} from '@angular/core';
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
        <div [ngClass]="{'ui-button ui-togglebutton ui-widget ui-state-default ui-corner-all': true, 'ui-button-text-only': (!onIcon && !offIcon), 
                'ui-button-text-icon-left': (onIcon && offIcon && hasOnLabel && hasOffLabel && iconPos === 'left'), 
                'ui-button-text-icon-right': (onIcon && offIcon && hasOnLabel && hasOffLabel && iconPos === 'right'),'ui-button-icon-only': (onIcon && offIcon && !hasOnLabel && !hasOffLabel),
                'ui-state-active': checked,'ui-state-focus':focus,'ui-state-disabled':disabled}" [ngStyle]="style" [class]="styleClass" 
                (click)="toggle($event)" (keydown.enter)="toggle($event)">
            <div class="ui-helper-hidden-accessible">
                <input #checkbox type="checkbox" [attr.id]="inputId" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()" [attr.tabindex]="tabindex"
                    role="button" [attr.aria-pressed]="checked" [attr.aria-labelledby]="ariaLabelledBy">
            </div>
            <span *ngIf="onIcon||offIcon" class="ui-button-icon-left" [class]="checked ? this.onIcon : this.offIcon" [ngClass]="{'ui-button-icon-left': (iconPos === 'left'), 
            'ui-button-icon-right': (iconPos === 'right')}"></span>
            <span class="ui-button-text ui-unselectable-text">{{checked ? hasOnLabel ? onLabel : 'ui-btn' : hasOffLabel ? offLabel : 'ui-btn'}}</span>
        </div>
    `,
    providers: [TOGGLEBUTTON_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.Default
})
export class ToggleButton implements ControlValueAccessor,AfterViewInit {

    @Input() onLabel: string = 'Yes';

    @Input() offLabel: string = 'No';

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
