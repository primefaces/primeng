import {Component, ElementRef, AfterViewInit, OnDestroy, OnChanges, Input, SimpleChange, Output, EventEmitter} from 'angular2/core';

@Component({
    selector: 'p-galleria',
    template: `
        <div>
            <ng-content></ng-content>
        </div>
    `
})
export class Galleria implements AfterViewInit, OnDestroy, OnChanges {

    @Input() panelWidth: number;

    @Input() panelHeight: number;

    @Input() frameWidth: number;

    @Input() activeIndex: number;

    @Input() showFilmstrip: boolean = true;

    @Input() autoPlay: boolean = true;

    @Input() transitionInterval: number;

    @Input() effect: string;

    @Input() effectDuration: any;

    @Input() showCaption: boolean = true;

    @Input() customContent: boolean;

    initialized: boolean;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }
    
    ngAfterViewInit() {
        jQuery(this.el.nativeElement.children[0]).puigalleria({
            panelWidth: this.panelWidth,
            panelHeight: this.panelHeight,
            frameWidth: this.frameWidth,
            activeIndex: this.activeIndex,
            showFilmstrip: this.showFilmstrip,
            autoPlay: this.autoPlay,
            transitionInterval: this.transitionInterval,
            effect: this.effect,
            effectSpeed: this.effectDuration,
            showCaption: this.showCaption,
            customContent: this.customContent
        });
        this.initialized = true;
    }

    ngOnChanges(changes: { [key: string]: SimpleChange}) {
        if (this.initialized) {
            for (var key in changes) {
                jQuery(this.el.nativeElement.children[0]).puigalleria('option', key, changes[key].currentValue);
            }
        }   
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement.children[0]).puigalleria('destroy');
        this.initialized = false;
    }

}