/// <reference path="../../typedefinition/primeui.d.ts" />

import {Component,ElementRef,AfterContentInit,OnDestroy,OnChanges,Input,Output,SimpleChange,EventEmitter} from 'angular2/core';

@Component({
    selector: 'p-carousel',
    template: `
        <ng-content></ng-content>
    `
})
export class Carousel {

    @Input() numVisible: number;

    @Input() firstVisible: number;

    @Input() headerText: string;

    @Input() effectDuration: any;

    @Input() circular: boolean;

    @Input() breakpoint: number;

    @Input() responsive: boolean;

    @Input() autoplayInterval: number;

    @Input() easing: string;

    @Input() pageLinks: number;

    @Input() style: string;

    @Input() styleClass: string;

    initialized: boolean;

    carouselElement: any;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngAfterContentInit() {
        this.carouselElement = jQuery(this.el.nativeElement.children[0]);
        this.carouselElement.puicarousel({
            numVisible: this.numVisible,
            firstVisible: this.firstVisible,
            headerText: this.headerText,
            effectDuration: this.effectDuration,
            circular: this.circular,
            breakpoint: this.breakpoint,
            responsive: this.responsive,
            autoplayInterval: this.autoplayInterval,
            easing: this.easing,
            pageLinks: this.pageLinks,
            style: this.style,
            styleClass: this.styleClass
        });
        this.initialized = true;
    }

    ngOnChanges(changes: {[key: string]: SimpleChange}) {
        if (this.initialized) {
            for (var key in changes) {
                this.carouselElement.puicarousel('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        this.carouselElement.puicarousel('destroy');
        this.initialized = false;
        this.carouselElement = null;
    }

}