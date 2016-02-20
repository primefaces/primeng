import {Directive, ElementRef, OnInit, OnDestroy, OnChanges, HostBinding, Input, SimpleChange} from 'angular2/core';

@Directive({
    selector: '[pInputTextarea]'
})
export class InputTextarea implements OnInit, OnDestroy, OnChanges {

    @Input() autoResize: boolean;

    @Input() disabled: boolean;

    initialized: boolean;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngOnInit() {
        jQuery(this.el.nativeElement).puiinputtextarea({
            autoResize: this.autoResize
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