/// <reference path="../../../typedefinition/primeui.d.ts" />

import {Directive, ElementRef, OnInit, OnDestroy, HostBinding, Input, OnChanges, SimpleChange} from 'angular2/core';

@Directive({
    selector: '[pSpinner]'
})
export class SpinnerDirective implements OnInit, OnDestroy, OnChanges {

    @Input() step: number;

    @Input() min: number;

    @Input() max: number;

    @Input() prefix: string;

    @Input() suffix: string;

    @Input() disabled: boolean;

    initialized: boolean;

    constructor(private el: ElementRef) {
        this.initialized = false;
    } 

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