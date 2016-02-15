/// <reference path="../../typedefinition/primeui.d.ts" />

import {Component, ElementRef, AfterViewInit, OnDestroy, OnChanges, Input, SimpleChange, Output, EventEmitter} from 'angular2/core';

@Component({
    selector: 'p-lightbox',
    template: `
        <div>
            <ng-content></ng-content>
        </div>
    `
})
export class Lightbox implements AfterViewInit, OnDestroy, OnChanges {

    initialized: boolean;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngAfterViewInit() {
        jQuery(this.el.nativeElement.children[0]).puilightbox();
        this.initialized = true;
    }

    ngOnChanges(changes: { [key: string]: SimpleChange}) {
        if (this.initialized) {
            for (var key in changes) {
                jQuery(this.el.nativeElement.children[0]).puilightbox('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement.children[0]).puilightbox('destroy');
        this.initialized = false;
    }

}