/// <reference path="../../../typedefinition/primeui.d.ts" />

import {Directive, ElementRef, OnInit, OnDestroy, OnChanges, SimpleChange, Input} from 'angular2/core';

@Directive({
    selector: '[pInputText]'
})
export class InputTextDirective implements OnInit, OnDestroy, OnChanges {

    @Input() disabled: boolean;

    initialized: boolean;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngOnInit() {
        jQuery(this.el.nativeElement).puiinputtext();
        this.initialized = true;
    }

    ngOnChanges(changes: {[key: string]: SimpleChange}) {
        if (this.initialized) {
            for (var key in changes) {
                jQuery(this.el.nativeElement).puiinputtext('option', key, changes[key].currentValue);
            }
        }   
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement).puiinputtext('destroy');
        this.initialized = false;
    }
}