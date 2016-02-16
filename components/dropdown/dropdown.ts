/// <reference path="../../typedefinition/primeui.d.ts" />

import {Component,ElementRef,AfterViewInit,OnDestroy,OnChanges,Input,Output,SimpleChange,EventEmitter} from 'angular2/core';
import {SelectItem} from '../api/selectitem';
import DropdownEventParams = PrimeUI.DropdownEventParams;

@Component({
    selector: 'p-dropdown',
    template: `
        <div class="ui-dropdown ui-widget ui-state-default ui-corner-all ui-helper-clearfix">
            <div class="ui-helper-hidden-accessible">
                <select>
                    <option *ngFor="#option of options" [value]="option.value">{{option.label}}</option>
                </select>
            </div>
            <div class="ui-helper-hidden-accessible">
                <input type="text">
            </div>
            <label class="ui-dropdown-label ui-inputtext ui-corner-all"></label>
            <div class="ui-dropdown-trigger ui-state-default ui-corner-right">
                <span class="fa fa-fw fa-caret-down"></span>
            </div>
            <div class="ui-dropdown-panel ui-widget-content ui-corner-all ui-helper-hidden ui-shadow">
                <div *ngIf="filter" class="ui-dropdown-filter-container">
                    <input type="text" autocomplete="off" class="ui-dropdown-filter ui-inputtext ui-widget ui-state-default ui-corner-all">
                    <span class="fa fa-search"></span>
                </div>
                <div class="ui-dropdown-items-wrapper">
                    <ul *ngIf="!customContent" class="ui-dropdown-items ui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset">
                        <li *ngFor="#option of options" [attr.data-label]="option.label" class="ui-dropdown-item ui-dropdown-list-item ui-corner-all">{{option.label}}</li>
                    </ul>
                    <ng-content *ngIf="customContent"></ng-content>
                </div>
            </div>
        </div>
    `
})
export class Dropdown {

    @Input() options: SelectItem[];

    @Input() value: any;

    @Output() valueChange: EventEmitter<any> = new EventEmitter();

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Input() scrollHeight: number;

    @Input() customContent: boolean;

    @Input() filter: boolean;

    @Input() filterMatchMode: string;

    @Input() style: string;

    @Input() styleClass: string;

    initialized: boolean;

    selectElement: JQuery;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngAfterViewInit() {
        this.selectElement = jQuery(this.el.nativeElement).find(' > .ui-dropdown > div > select');
        this.selectElement.puidropdown({
            enhanced: true,
            value: this.value,
            filter: this.filter,
            filterMatchMode: this.filterMatchMode,
            style: this.style,
            styleClass: this.styleClass,
            change: (event: Event, ui: DropdownEventParams) => {
                var selectedValue = this.options[ui.index].value;
                this.onChange.emit({originalEvent:event, value: selectedValue});
                this.valueChange.emit(selectedValue);
            }
        });
        this.initialized = true;
    }

    ngOnChanges(changes: { [key: string]: SimpleChange}) {
        if (this.initialized) {
            for (var key in changes) {
                this.selectElement.puidropdown('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        this.selectElement.puidropdown('destroy');
        this.initialized = false;
        this.selectElement = null;
    }

}