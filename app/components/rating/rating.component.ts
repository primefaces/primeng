/// <reference path="../../../typedefinition/primeui.d.ts" />

import {Component, ElementRef, OnInit, OnDestroy, OnChanges, SimpleChange, Input, Output, EventEmitter} from 'angular2/core';

@Component({
    selector: 'p-rating',
    template: '<input type="hidden" />'
})
export class RatingComponent implements OnInit, OnDestroy, OnChanges {

    @Input() value: number;

    @Input() disabled: boolean;

    @Input() readonly: boolean;

    @Input() stars: number;

    @Input() cancel: boolean = true;

    @Output() valueChange: EventEmitter<any> = new EventEmitter();

    @Output() onRate: EventEmitter<any> = new EventEmitter();

    @Output() onCancel: EventEmitter<any> = new EventEmitter();

    initialized: boolean;

    stopNgOnChangesPropagation: boolean;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngOnInit() {
        jQuery(this.el.nativeElement.children[0]).puirating({
            value: this.value,
            stars: this.stars,
            cancel: this.cancel,
            disabled: this.disabled,
            readonly: this.readonly,
            rate: (event: Event, value: number) => {
                this.stopNgOnChangesPropagation = true;
                this.valueChange.next(value); 

                if (this.onRate) {
                    this.onRate.next({ originalEvent: event, value: value });
                }
            },
            oncancel: this.onCancel ? (event: Event) => { this.onCancel.next(event); } : null
        });
        this.initialized = true;
    }

    ngOnChanges(changes: {[key: string]: SimpleChange}) {
        if (this.stopNgOnChangesPropagation) {
            this.stopNgOnChangesPropagation = false;
            return;
        }

        if (this.initialized) {
            for (var key in changes) {
                jQuery(this.el.nativeElement.children[0].children[0]).puirating('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement.children[0].children[0]).puirating('destroy');
        this.initialized = false;
    }
}