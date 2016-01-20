/// <reference path="../../../typedefinition/primeui.d.ts" />

import {Directive, ElementRef, OnInit, OnDestroy, OnChanges, HostBinding, Input, SimpleChange} from 'angular2/core';

@Directive({
    selector: '[pPassword]'
})
export class PasswordDirective implements OnInit, OnDestroy, OnChanges {

    @Input() promptLabel: string;

    @Input() weakLabel: string;

    @Input() goodLabel: string;

    @Input() strongLabel: string;

    @Input() inline: boolean;

    initialized: boolean;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngOnInit() {
        jQuery(this.el.nativeElement).puipassword({
            promptLabel: this.promptLabel,
            weakLabel: this.weakLabel,
            goodLabel: this.goodLabel,
            strongLabel: this.strongLabel,
            inline: this.inline
        });
        this.initialized = true;
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (this.initialized) {
            for (var key in changes) {
                jQuery(this.el.nativeElement).puipassword('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement).puipassword('destroy');
        this.initialized = false;
    }
}