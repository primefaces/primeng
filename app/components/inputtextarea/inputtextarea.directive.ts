/// <reference path="../../../typedefinition/primeui.d.ts" />

import {Directive, ElementRef, OnInit, OnDestroy, OnChanges, HostBinding, Input, SimpleChange} from 'angular2/core';

@Directive({
    selector: '[pInputTextarea]'
})
export class InputTextareaDirective implements OnInit, OnDestroy, OnChanges {

    @Input() autoResize: boolean;

    @Input() autoComplete: boolean;

    @Input() maxlength: number;

    @Input() counter: number;

    @Input() counterTemplate: string;

    @Input() minQueryLength: number;

    @Input() queryDelay: number;

    @Input() completeSource: Function;

    initialized: boolean;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngOnInit() {
        jQuery(this.el.nativeElement).puiinputtextarea({
            autoResize: this.autoResize,
            autoComplete: this.autoComplete,
            maxlength: this.maxlength,
            counter: this.counter,
            counterTemplate: this.counterTemplate,
            minQueryLength: this.minQueryLength,
            queryDelay: this.queryDelay,
            completeSource: this.completeSource
        });
        this.initialized = true;
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (this.initialized) {
            for (var key in changes) {
                jQuery(this.el.nativeElement).puiinputtextarea('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement).puiinputtextarea('destroy');
        this.initialized = false;
    }
}