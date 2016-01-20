/// <reference path="../../../typedefinition/primeui.d.ts" />

import {Directive, ElementRef, OnInit, OnDestroy, OnChanges, HostBinding, Input, SimpleChange} from 'angular2/core';

@Directive({
    selector: '[pButton]'
})
export class ButtonDirective implements OnInit, OnDestroy, OnChanges {

    @Input() icon: string;

    @Input() iconPos: string;

    @Input() disabled: boolean;

    initialized: boolean;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngOnInit() {
        jQuery(this.el.nativeElement).puibutton({
            icon: this.icon,
            iconPos: this.iconPos
        });
        this.initialized = true;
    }

    ngOnChanges(changes: {[key: string]: SimpleChange}) {
        if (this.initialized) {
            for (var key in changes) {
                jQuery(this.el.nativeElement).puibutton('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement).puibutton('destroy');
        this.initialized = false;
    }
}