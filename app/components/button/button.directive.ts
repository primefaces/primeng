/// <reference path="../../../typedefinition/primeui.d.ts" />

import {Directive, ElementRef, OnInit, OnDestroy, HostBinding, Input} from 'angular2/core';

@Directive({
    selector: '[pButton]'
})
export class ButtonDirective implements OnInit, OnDestroy {

    @HostBinding('class.ui-state-disabled')
    private get isDisabled() {return this.el.nativeElement.disabled;}

    @Input('icon') icon;

    @Input('iconPos') iconPos;

    constructor(private el: ElementRef) {}

    ngOnInit() {
        jQuery(this.el.nativeElement).puibutton({
            icon: this.icon,
            iconPos: this.iconPos
        });
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement).puibutton('destroy');
    }
}