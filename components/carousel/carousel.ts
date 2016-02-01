/// <reference path="../../typedefinition/primeui.d.ts" />

import {Component,ElementRef,AfterContentInit,OnDestroy,OnChanges,Input,Output,SimpleChange,EventEmitter} from 'angular2/core';

@Component({
    selector: 'p-carousel',
    template: `
        <div>
            <ng-content></ng-content>
        </div>
    `
})
export class Carousel {

    initialized: boolean;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngAfterContentInit() {
        jQuery(this.el.nativeElement.children[0].children[0]).puicarousel({

        });
        this.initialized = true;
    }

    ngOnChanges(changes: {[key: string]: SimpleChange}) {
        if (this.initialized) {
            for (var key in changes) {
                jQuery(this.el.nativeElement.children[0].children[0]).puicarousel('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement.children[0].children[0]).puicarousel('destroy');
        this.initialized = false;
    }

}