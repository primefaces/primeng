import {Component,ElementRef,AfterViewInit,OnDestroy,OnChanges,Input,Output,SimpleChange,EventEmitter,forwardRef,Provider} from 'angular2/core';
import {NG_VALUE_ACCESSOR,ControlValueAccessor} from 'angular2/common';
import {CONST_EXPR} from 'angular2/src/facade/lang';

const INPUTSWITCH_VALUE_ACCESSOR: Provider = CONST_EXPR(
    new Provider(NG_VALUE_ACCESSOR, {
        useExisting: forwardRef(() => InputSwitch),
        multi: true
    })
);

@Component({
    selector: 'p-inputSwitch',
    template: `
        <div [ngClass]="'ui-inputswitch ui-widget ui-widget-content ui-corner-all'" [attr.style]="style" [attr.class]="styleClass">
            <div class="ui-inputswitch-off">
                <span>{{offLabel}}</span>
            </div>
            <div class="ui-inputswitch-on">
                <span>{{onLabel}}</span>
            </div>
            <div class="ui-inputswitch-handle ui-state-default"></div>
            <div class="ui-helper-hidden-accessible">
                <input type="checkbox" (blur)="onModelTouched()"/>
            </div>
        </div>
    `,
    providers: [INPUTSWITCH_VALUE_ACCESSOR]
})
export class InputSwitch implements AfterViewInit, OnDestroy, OnChanges {

    @Input() onLabel: string = 'On';

    @Input() offLabel: string = 'Off';
    
    @Input() style: string;
        
    @Input() styleClass: string;

    @Output() onChange: EventEmitter<any> = new EventEmitter();
    
    value: boolean;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};

    initialized: boolean;

    inputSwitchElement: any;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngAfterViewInit() {
        this.inputSwitchElement = jQuery(this.el.nativeElement.children[0]).find('> .ui-helper-hidden-accessible > input');
        this.inputSwitchElement.puiswitch({
            checked: this.value,
            enhanced: true,
            change: (event: Event, ui: any) => {
                this.value = ui.checked;
                this.onModelChange(this.value);
                if (this.onChange) {
                    this.onChange.emit({originalEvent: event, checked: this.value});
                }
            }
        });
        this.initialized = true;
    }
    
    writeValue(value: any) : void {
        this.value = value;
        
        if(this.initialized) {
            this.inputSwitchElement.puiswitch('option', 'checked', this.value);
        }
    }
    
    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (this.initialized) {
            for (var key in changes) {
                this.inputSwitchElement.puiswitch('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        this.inputSwitchElement.puiswitch('destroy');
        this.initialized = false;
        this.inputSwitchElement = null;
    }
}