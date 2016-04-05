import {Component,Input,Output,EventEmitter,forwardRef,Provider} from 'angular2/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from 'angular2/common';
import {CONST_EXPR} from 'angular2/src/facade/lang';

const TOGGLEBUTTON_VALUE_ACCESSOR: Provider = CONST_EXPR(
    new Provider(NG_VALUE_ACCESSOR, {
        useExisting: forwardRef(() => ToggleButton),
        multi: true
    })
);

@Component({
    selector: 'p-toggleButton',
    template: `
        <div [ngClass]="{'ui-button ui-togglebutton ui-widget ui-state-default ui-corner-all': true, 'ui-button-text-only': (!onIcon&&!offIcon), 'ui-button-text-icon-left': (onIcon&&offIcon),
                'ui-state-active': checked, 'ui-state-hover': hover&&!disabled, 'ui-state-disabled': disabled}" [attr.style]="style" [attr.class]="styleClass" 
                (click)="toggle($event)" (mouseenter)="hover=true" (mouseleave)="hover=false">
            <span *ngIf="onIcon||offIcon" [attr.class]="getIconClass()"></span>
            <span class="ui-button-text ui-unselectable-text">{{checked ? onLabel : offLabel}}</span>
        </div>
    `,
    providers: [TOGGLEBUTTON_VALUE_ACCESSOR]
})
export class ToggleButton implements ControlValueAccessor {

    @Input() onLabel: string = 'Yes';

    @Input() offLabel: string = 'No';

    @Input() onIcon: string;

    @Input() offIcon: string;

    @Input() disabled: boolean;

    @Input() style: string;

    @Input() styleClass: string;

    @Output() onChange: EventEmitter<any> = new EventEmitter();
    
    checked: boolean = false;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};
    
    private hover: boolean;

    getIconClass() {
        let baseClass = 'ui-button-icon-left fa fa-fw';
        return baseClass + ' ' + (this.checked ? this.onIcon : this.offIcon);
    }
    
    toggle(event) {
        if(!this.disabled) {
            this.checked = !this.checked;
            this.onModelChange(this.checked);
            this.onModelTouched();
            this.onChange.emit({
                originalEvent: event,
                checked: this.checked
            })
        }
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
}