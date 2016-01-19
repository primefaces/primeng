/// <reference path="../../../typedefinition/primeui.d.ts" />

import {Component, ElementRef, OnInit, OnDestroy, OnChanges, Input, SimpleChange} from 'angular2/core';

@Component({
    selector: 'p-panel',
    template: `
        <div>
            <ng-content></ng-content>
        </div>
    `,
})
export class PanelComponent implements OnInit, OnDestroy, OnChanges {

    @Input('toggleable') toggleable: boolean;

    @Input('header') header: boolean;

    initialized: boolean;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }
    
    ngOnInit() {
        jQuery(this.el.nativeElement.children[0]).puipanel({
            toggleable: this.toggleable,
            title: this.header
        });
        this.initialized = true;
    }

    ngOnChanges(changes: {[key: string]: SimpleChange}) {
        if (this.initialized) {
            for (var key in changes) {
                jQuery(this.el.nativeElement.children[0]).puipanel('option', key, changes[key].currentValue);
            }
        }   
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement.children[0]).puipanel('destroy');
        this.initialized = false;
    }

}