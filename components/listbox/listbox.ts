/// <reference path="../../typedefinition/primeui.d.ts" />

import {Component,ElementRef,AfterViewInit,OnDestroy,OnChanges,Input,Output,SimpleChange,EventEmitter} from 'angular2/core';
import {SelectItem} from '../api/selectitem';

@Component({
    selector: 'p-listbox',
    template: `
        <div class="pui-listbox pui-inputtext ui-widget ui-widget-content ui-corner-all">
            <div class="ui-helper-hidden-accessible">
                <select>
                    <option *ngFor="#option of options;" [value]="option.value">{{option.label}}</option>
                </select>
            </div>
            <ul class="pui-listbox-list" *ngIf="!customContent">
                <li *ngFor="#option of options" class="pui-listbox-item ui-corner-all">
                    {{option.label}}
                </li>

            </ul>
            <ng-content *ngIf="customContent"></ng-content>
        </div>
    `
})
export class Listbox {

    initialized: boolean;

    @Input() options: SelectItem[];

    @Input() value: any;

    @Input() multiple: boolean;

    @Input() scrollHeight: number;

    @Input() customContent: boolean;

    @Input() style: string;

    @Input() styleClass: string;

    @Output() valueChange: EventEmitter<any> = new EventEmitter();

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngAfterViewInit() {
        jQuery(this.el.nativeElement.children[0].children[0].children[0]).puilistbox({
            value: this.value,
            scrollHeight: this.scrollHeight,
            multiple: this.multiple,
            enhanced: true,
            style: this.style,
            styleClass: this.styleClass,
            change: (event: Event, ui: PrimeUI.ListboxEventParams) => {
                this.onChange.next({originalEvent: event, value: ui.value});
                if(this.multiple) {
                    var values:any = [];
                    for(var i = 0; i < ui.index.length;i++) {
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

    ngOnChanges(changes: { [key: string]: SimpleChange}) {
        if (this.initialized) {
            for (var key in changes) {
                jQuery(this.el.nativeElement.children[0].children[0].children[0]).puilistbox('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement.children[0].children[0].children[0]).puilistbox('destroy');
        this.initialized = false;
    }

}