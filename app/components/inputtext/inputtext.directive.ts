/// <reference path="../../../typedefinition/primeui.d.ts" />

import {Directive, ElementRef, OnInit, OnDestroy, HostBinding} from 'angular2/core';

@Directive({
    selector: '[pInputText]'
})
export class InputTextDirective implements OnInit, OnDestroy {

    @HostBinding('class.ui-state-disabled')
    private get isDisabled() {return this.el.nativeElement.disabled;}

    constructor(private el: ElementRef) {}

    ngOnInit() {
        jQuery(this.el.nativeElement).puiinputtext();
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement).puiinputtext('destroy');
    }
}