/// <reference path="../../typedefinition/primeui.d.ts" />

import {Component, ElementRef, AfterViewInit, OnDestroy, OnChanges, Input, Output, SimpleChange, EventEmitter} from 'angular2/core';
import {SelectItem} from '../api/selectitem';

@Component({
    selector: 'p-selectbutton',
    template: `
        <div class="pui-selectbutton pui-buttonset ui-widget ui-corner-all pui-buttonset-3">
            <div *ngFor="#choice of choices;" class="pui-button ui-widget ui-state-default pui-button-text-only" [attr.data-value]="choice.value">
                <span class="pui-button-text ui-c">{{choice.label}}</span>
            </div>
        </div>
    `
})
export class Selectbutton {

    initialized: boolean;

    @Input() choices: SelectItem[];

    @Input() formfield: string;

    @Input() unselectable: boolean;

    @Input() tabindex: number;

    @Input() multiple: boolean;

    @Input() style: string;

    @Input() styleClass: string;

    @Input() value: any;

    @Output() valueChange: EventEmitter<any> = new EventEmitter();

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngAfterViewInit() {
        jQuery(this.el.nativeElement.children[0]).puiselectbutton({
            value: this.value,
            unselectable: this.unselectable,
            tabindex : this.tabindex,
            formfield: this.formfield,
            multiple: this.multiple,
            enhanced: true,
            style: this.style,
            styleClass: this.styleClass,
            change: (event: Event, ui: PrimeUI.SelectbuttonEventParams) => {
                this.onChange.next({ originalEvent: event, value: ui.value });
                if (this.multiple) {
                    var values: any = [];
                    for (var i = 0; i < ui.index.length; i++) {
                        values.push(this.choices[ui.index[i]].value);
                        this.valueChange.next(values);
                    }
                    
                }
                else {
                    this.valueChange.next(this.choices[ui.index].value);
                }
            }
        });
        this.initialized = true;
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (this.initialized) {
            for (var key in changes) {
                jQuery(this.el.nativeElement.children[0]).puiselectbutton('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement.children[0]).puiselectbutton('destroy');
        this.initialized = false;
    }

}