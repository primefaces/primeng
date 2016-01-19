/// <reference path="../../../typedefinition/primeui.d.ts" />

import {Component, ElementRef, OnInit, OnDestroy, OnChanges, Input, SimpleChange, Output, EventEmitter} from 'angular2/core';

@Component({
    selector: 'p-panel',
    template: `
        <div>
            <ng-content></ng-content>
        </div>
    `
})
export class PanelComponent implements OnInit, OnDestroy, OnChanges {

    @Input() toggleable: boolean;

    @Input() toggleDuration: any;

    @Input() header: string;

    @Input() closable: boolean;

    @Input() closeDuration: any;

    @Input() collapsed: boolean;

    @Output() onBeforeCollapse: EventEmitter<any> = new EventEmitter();

    @Output() onAfterCollapse: EventEmitter<any> = new EventEmitter();

    @Output() onBeforeExpand: EventEmitter<any> = new EventEmitter();

    @Output() onAfterExpand: EventEmitter<any> = new EventEmitter();

    @Output() onBeforeClose: EventEmitter<any> = new EventEmitter();

    @Output() onAfterClose: EventEmitter<any> = new EventEmitter();

    initialized: boolean;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }
    
    ngOnInit() {
        jQuery(this.el.nativeElement.children[0]).puipanel({
            title: this.header,
            toggleable: this.toggleable,
            toggleDuration: this.toggleDuration,
            toggleOrientation: this.toggleOrientation,
            collapsed: this.collapsed,
            closable: this.closable,
            closeDuration: this.closeDuration,
            beforeCollapse: this.onBeforeCollapse ? (event: Event) => { this.onBeforeCollapse.next(event); } : null,
            afterCollapse: this.onAfterCollapse ? (event: Event) => { this.onAfterCollapse.next(event); } : null,
            beforeExpand: this.onBeforeExpand ? (event: Event) => { this.onBeforeExpand.next(event); } : null,
            afterExpand: this.onAfterExpand ? (event: Event) => { this.onAfterExpand.next(event); } : null,
            beforeClose: this.onBeforeClose ? (event: Event) => { this.onBeforeClose.next(event); } : null,
            afterClose: this.onAfterClose ? (event: Event) => { this.onAfterClose.next(event); } : null
        });
        this.initialized = true;
    }

    ngOnChanges(changes: { [key: string]: SimpleChange}) {
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