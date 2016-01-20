/// <reference path="../../../typedefinition/primeui.d.ts" />

import {Component, ElementRef, OnInit, OnDestroy, HostBinding, Input, OnChanges, SimpleChange} from 'angular2/core';

@Component({
    selector: 'p-dialog',
    template: `
        <div>
            <ng-content></ng-content>
        </div>
    `
})
export class DialogComponent implements OnInit, OnDestroy, OnChanges {

    @Input() header: string;

    initialized: boolean;

    constructor(private el: ElementRef) {
        this.initialized = false;
    } 

    ngOnInit() {
        jQuery(this.el.nativeElement.children[0]).puidialog({
            title: this.header,
            visible: true
        });
        this.initialized = true;
    }

    ngOnChanges(changes: {[key: string]: SimpleChange}) {
        if (this.initialized) {
            for (var key in changes) {
                jQuery(this.el.nativeElement.children[0]).puidialog('option', key, changes[key].currentValue);
            }
        }   
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement.children[0]).puidialog('destroy');
        this.initialized = false;
    }

}