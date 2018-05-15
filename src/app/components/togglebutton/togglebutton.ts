import {NgModule,Component,Input,Output,EventEmitter,forwardRef,AfterViewInit,ViewChild,ElementRef} from '@angular/core';
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
        <div [ngClass]="{'ui-button ui-togglebutton ui-widget ui-state-default ui-corner-all': true, 'ui-button-text-only': (!onIcon&&!offIcon), 
                'ui-button-text-icon-left': (onIcon&&offIcon&&hasOnLabel&&hasOffLabel), 'ui-button-icon-only': (onIcon&&offIcon&&!hasOnLabel&&!hasOffLabel),
                'ui-state-active': checked,'ui-state-focus':focus,'ui-state-disabled':disabled}" [ngStyle]="style" [class]="styleClass" 
                (click)="toggle($event)">
            <div class="ui-helper-hidden-accessible">
                <input #checkbox type="checkbox" [attr.id]="inputId" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()" [attr.tabindex]="tabindex">
            </div>
            <span *ngIf="onIcon||offIcon" [class]="getIconClass()"></span>
            <span class="ui-button-text ui-unselectable-text">{{checked ? hasOnLabel ? onLabel : 'ui-btn' : hasOffLabel ? offLabel : 'ui-btn'}}</span>
        </div>
    `,
    providers: [TOGGLEBUTTON_VALUE_ACCESSOR]
})
export class ToggleButton implements ControlValueAccessor,AfterViewInit {

    @Input() onLabel: string = 'Yes';

    @Input() offLabel: string = 'No';

    @Input() onIcon: string;

    @Input() offIcon: string;

    @Input() disabled: boolean;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() inputId: string;

    @Input() tabindex: number;

    @Output() onChange: EventEmitter<any> = new EventEmitter();
    
    @ViewChild('checkbox') checkboxViewChild: ElementRef;
    
    checkbox: HTMLInputElement;
    
    checked: boolean = false;

    focus: boolean = false;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};
    
    ngAfterViewInit() {
        this.checkbox = <HTMLInputElement> this.checkboxViewChild.nativeElement;
    }

    getIconClass() {
        let baseClass = 'ui-button-icon-left ui-togglebutton-icon fa fa-fw';
        return baseClass + ' ' + (this.checked ? this.onIcon : this.offIcon);
    }
    
    toggle(event: Event) {
        if(!this.disabled) {
            this.checked = !this.checked;
            this.onModelChange(this.checked);
            this.onModelTouched();
            this.onChange.emit({
                originalEvent: event,
                checked: this.checked
            });
            this.checkbox.focus();
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
