/// <reference path="../../typedefinition/primeui.d.ts" />

import {Component,ElementRef,OnInit,OnDestroy,OnChanges,Input,Output,SimpleChange,EventEmitter} from 'angular2/core';
import {Message} from '../api/message';

@Component({
    selector: 'p-growl',
    template: `<div></div>`
})
export class Growl {

    @Input() sticky: boolean;

    @Input() life: number;

    @Input() value: Message[];

    initialized: boolean;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngOnInit() {
        jQuery(this.el.nativeElement.children[0]).puigrowl({
            sticky: this.sticky,
            life: this.life,
            appendTo: null,
            messages: this.value
        });
        this.initialized = true;
    }

    ngOnChanges(changes: {[key: string]: SimpleChange}) {
        if (this.initialized) {
            for (var key in changes) {
                jQuery(this.el.nativeElement.children[0]).puigrowl('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement.children[0]).puigrowl('destroy');
        this.initialized = false;
    }

}