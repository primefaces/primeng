/// <reference path="../../../typedefinition/primeui.d.ts" />

import {Directive, ElementRef, Renderer, Input, HostListener, HostBinding} from 'angular2/core';

@Directive({
    selector: '[pInputText]'
})
export class InputTextDirective {

    constructor(private el: ElementRef, private renderer: Renderer) {
        jQuery(this.el.nativeElement).puiinputtext();
    }
}