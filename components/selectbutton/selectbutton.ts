/// <reference path="../../typedefinition/primeui.d.ts" />

import {Component, ElementRef, AfterViewInit, OnDestroy, OnChanges, Input, Output, SimpleChange, EventEmitter} from 'angular2/core';
import {SelectItem} from '../api/selectitem';

@Component({
    selector: 'p-selectButton',
    template: `
        <div class="ui-selectbutton ui-buttonset ui-widget ui-corner-all">
            <div *ngFor="#option of options;" class="ui-button ui-widget ui-state-default ui-button-text-only" [attr.data-value]="option.value">
                <span class="ui-button-text ui-c">{{option.label}}</span>
            </div>
        </div>
    `
})
export class SelectButton {

    initialized: boolean;

    @Input() options: SelectItem[];

    @Input() tabindex: number;

    @Input() multiple: boolean;

    @Input() value: any;

    @Output() valueChange: EventEmitter<any> = new EventEmitter();

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    stopNgOnChangesPropagation: boolean;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngAfterViewInit() {
        jQuery(this.el.nativeElement.children[0]).puiselectbutton({
            value: this.value,
            tabindex : this.tabindex,
            multiple: this.multiple,
            enhanced: true,
            change: (event: Event, ui: PrimeUI.SelectButtonEventParams) => {
                this.stopNgOnChangesPropagation = true;
                this.onChange.next({ originalEvent: event, value: ui.value });
                if (this.multiple) {
                    var values: any = [];
                    for (var i = 0; i < ui.index.length; i++) {
                        values.push(this.options[ui.index[i]].value);
                    }
                    this.valueChange.next(values);
                }
                else {
                    this.valueChange.next(this.options[ui.index].value);
                }
            }
        });
        this.initialized = true;
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (this.initialized) {
            for (var key in changes) {
                if (key == 'value' && this.stopNgOnChangesPropagation) {
                    this.stopNgOnChangesPropagation = false;
                    continue;
                }

                jQuery(this.el.nativeElement.children[0]).puiselectbutton('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement.children[0]).puiselectbutton('destroy');
        this.initialized = false;
    }

}