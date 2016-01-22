/// <reference path="../../../typedefinition/primeui.d.ts" />

import {Directive, ElementRef, OnInit, OnDestroy, OnChanges, SimpleChange, Input, Output, EventEmitter} from 'angular2/core';

@Directive({
    selector: '[pRadioButton]'
})
export class RadioButtonDirective implements OnInit, OnDestroy, OnChanges {

    @Input() disabled: boolean;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Output() valueChange: EventEmitter<any> = new EventEmitter();

    initialized: boolean;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngOnInit() {
        jQuery(this.el.nativeElement).puiradiobutton({
            change: (event: Event, value: any) => {
                this.valueChange.next(value);

                if (this.onChange) {
                    this.onChange.next({ originalEvent: event, value: value });
                }
            }
        });
        this.initialized = true;
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (this.initialized) {
            for (var key in changes) {
                jQuery(this.el.nativeElement).puiradiobutton('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement).puiradiobutton('destroy');
        this.initialized = false;
    }
}