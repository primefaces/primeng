import {Component, ElementRef, AfterContentInit, OnDestroy, OnChanges, Input, Output, SimpleChange, EventEmitter} from 'angular2/core';

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
                <input type="checkbox" />
            </div>
        </div>
    `
})
export class InputSwitch implements AfterContentInit, OnDestroy, OnChanges {

    @Input() onLabel: string = 'On';

    @Input() offLabel: string = 'Off';

    @Input() checked: boolean;
    
    @Input() style: string;
        
    @Input() styleClass: string;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Output() checkedChange: EventEmitter<any> = new EventEmitter();

    initialized: boolean;

    stopNgOnChangesPropagation: boolean;

    inputSwitchElement: any;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngAfterContentInit() {
        setTimeout(() => {
            this.inputSwitchElement = jQuery(this.el.nativeElement.children[0]).find('> .ui-helper-hidden-accessible > input');
            this.inputSwitchElement.puiswitch({
                checked: this.checked,
                enhanced: true,
                change: (event: Event, ui: PrimeUI.InputSwitchEventParams) => {
                    this.stopNgOnChangesPropagation = true;
                    this.checkedChange.emit(ui.checked);
                    if (this.onChange) {
                        this.onChange.emit({originalEvent: event, checked: ui.checked});
                    }
                }
            });
            this.initialized = true;
        }, 10);
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (this.initialized) {
            for (var key in changes) {
                if (key == 'checked' && this.stopNgOnChangesPropagation) {
                    this.stopNgOnChangesPropagation = false;
                    continue;
                }

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