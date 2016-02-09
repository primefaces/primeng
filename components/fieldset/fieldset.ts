/// <reference path="../../typedefinition/primeui.d.ts" />

import {Component, ElementRef, AfterViewInit, OnDestroy, OnChanges, Input, Output, SimpleChange, EventEmitter} from 'angular2/core';

@Component({
    selector: 'p-fieldset',
    template: `
        <fieldset class="ui-fieldset ui-widget ui-widget-content ui-corner-all" [ngClass]="{'ui-fieldset-toggleable': toggleable}">
            <legend class="ui-fieldset-legend ui-corner-all ui-state-default"><span class="ui-fieldset-toggler fa fa-w" *ngIf="toggleable"></span>{{legend}}</legend>
            <div class="ui-fieldset-content">
                <ng-content></ng-content>
            </div>
        </fieldset>
    `,
})
export class Fieldset implements AfterViewInit, OnDestroy, OnChanges {

    @Input() legend: string;

    @Input() toggleable: boolean;

    @Input() toggleDuration: any;

    @Input() collapsed: boolean;

    @Output() onBeforeToggle: EventEmitter<any> = new EventEmitter();

    @Output() onAfterToggle: EventEmitter<any> = new EventEmitter();

    initialized: boolean;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngAfterViewInit() {
        jQuery(this.el.nativeElement.children[0]).puifieldset({
            toggleable: this.toggleable,
            toggleDuration: this.toggleDuration,
            collapsed: this.collapsed,
            beforeToggle: this.onBeforeToggle ? (event: Event, collapsed: boolean) => { 
                this.onBeforeToggle.next({'originalEvent': event, 'collapsed': collapsed}); 
            } : null,
            afterToggle: this.onAfterToggle ? (event: Event, collapsed: boolean) => {
                this.onAfterToggle.next({'originalEvent': event, 'collapsed': collapsed} ); 
            } : null,
            enhanced: true
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