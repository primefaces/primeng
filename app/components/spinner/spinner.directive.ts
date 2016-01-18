/// <reference path="../../../typedefinition/primeui.d.ts" />

import {Directive, ElementRef, OnInit, OnDestroy, HostBinding,Input} from 'angular2/core';

@Directive({
    selector: '[pSpinner]'
})
export class SpinnerDirective implements OnInit, OnDestroy {

    @HostBinding('class.ui-state-disabled')
    private get isDisabled() {return this.el.nativeElement.disabled;}

    @Input('step') step;

    @Input('min') min;

    @Input('max') max;

    @Input('prefix') prefix;

    @Input('suffix') suffix;

    constructor(private el: ElementRef) {}

    ngOnInit() {
        jQuery(this.el.nativeElement).puispinner({
            step: this.step,
            min: this.min,
            max: this.max,
            prefix: this.prefix,
            suffix: this.suffix
        });
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement).puispinner('destroy');
    }
}