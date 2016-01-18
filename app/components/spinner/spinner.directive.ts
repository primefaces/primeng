/// <reference path="../../../typedefinition/primeui.d.ts" />

import {Directive, ElementRef, OnInit, OnDestroy, HostBinding,Input,OnChanges,SimpleChange} from 'angular2/core';

@Directive({
    selector: '[pSpinner]'
})
export class SpinnerDirective implements OnInit, OnDestroy, OnChanges {

    @Input('step') step;

    @Input('min') min;

    @Input('max') max;

    @Input('prefix') prefix;

    @Input('suffix') suffix;

    @Input('disabled') disabled;

    initialized = false;

    constructor(private el: ElementRef) {}

    ngOnInit() {
        jQuery(this.el.nativeElement).puispinner({
            step: this.step,
            min: this.min,
            max: this.max,
            prefix: this.prefix,
            suffix: this.suffix
        });

        this.initialized = true;
    }

    ngOnChanges(changes: {[key: string]: SimpleChange}) {
        if (this.initialized) {
            for (var key in changes) {
               jQuery(this.el.nativeElement).puispinner('option', key, changes[key].currentValue);
            }
        }   
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement).puispinner('destroy');

        this.initialized = false;
    }
    
}