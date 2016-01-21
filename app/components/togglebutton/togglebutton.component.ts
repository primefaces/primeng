/// <reference path="../../../typedefinition/primeui.d.ts" />

import {Component, ElementRef, OnInit, OnDestroy, OnChanges, Input, Output, SimpleChange, EventEmitter} from 'angular2/core';

@Component({
    selector: 'p-togglebutton',
    template:'<input type="checkbox" />'
})
export class TogglebuttonComponent implements OnInit, OnDestroy, OnChanges {

    @Input() onLabel: string;

    @Input() offLabel: string;

    @Input() onIcon: string;

    @Input() offIcon: string;

    @Input() checked: boolean;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Output() checkedChange: EventEmitter<any> = new EventEmitter();

    initialized: boolean;

    stopNgOnChangesPropagation: boolean;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngOnInit() {
        jQuery(this.el.nativeElement.children[0]).puitogglebutton({
            onLabel: this.onLabel,
            offLabel: this.offLabel,
            onIcon: this.onIcon,
            offIcon: this.offIcon,
            checked: this.checked,
            change: (event: Event, checked: boolean) => {
                this.stopNgOnChangesPropagation = true;
                this.checkedChange.next(checked);
                console.log(checked);
                if (this.onChange) {
                    this.onChange.next({ originalEvent: event, checked: checked });
                }
            }
        });
        this.initialized = true;
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (this.stopNgOnChangesPropagation) {
            this.stopNgOnChangesPropagation = false;
            return;
        }

        if (this.initialized) {
            for (var key in changes) {
                jQuery(this.el.nativeElement.children[0]).puitogglebutton('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement.children[0]).puitogglebutton('destroy');
        this.initialized = false;
    }
}