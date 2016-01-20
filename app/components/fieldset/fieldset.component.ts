/// <reference path="../../../typedefinition/primeui.d.ts" />

import {Component, ElementRef, OnInit, OnDestroy, OnChanges, Input, Output, SimpleChange, EventEmitter} from 'angular2/core';

@Component({
    selector: 'p-fieldset',
    template: `
        <fieldset>
            <ng-content></ng-content>
        </fieldset>
    `,
})
export class FieldsetComponent implements OnInit, OnDestroy, OnChanges {

    @Input() toggleable: boolean;

    @Input() toggleDuration: any;

    @Input() collapsed: boolean;

    @Output() onBeforeToggle: EventEmitter<any> = new EventEmitter();

    @Output() onAfterToggle: EventEmitter<any> = new EventEmitter();

    initialized: boolean;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngOnInit() {
        jQuery(this.el.nativeElement.children[0]).puifieldset({
            toggleable: this.toggleable,
            toggleDuration: this.toggleDuration,
            collapsed: this.collapsed,
            beforeToggle: this.onBeforeToggle ? (event: Event) => { this.onBeforeToggle.next(event); } : null,
            afterToggle: this.onAfterToggle ? (event: Event) => { this.onAfterToggle.next(event); } : null
        });
        this.initialized = true;
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (this.initialized) {
            for (var key in changes) {
                jQuery(this.el.nativeElement.children[0]).puifieldset('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement.children[0]).puifieldset('destroy');
        this.initialized = false;
    }
}