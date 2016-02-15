/// <reference path="../../typedefinition/jqueryui.d.ts" />

import {Component, ElementRef, AfterViewInit, OnDestroy, OnChanges, Input, Output, SimpleChange, EventEmitter} from 'angular2/core';
import SliderUIParams = JQueryUI.SliderUIParams;

@Component({
    selector: 'p-slider',
    template: `
        <div [attr.style]="style" [attr.class]="styleClass"></div>
    `
})
export class Slider implements AfterViewInit, OnDestroy, OnChanges {

    @Input() animate: boolean;

    @Input() disabled: boolean;

    @Input() min: number;

    @Input() max: number;

    @Input() orientation: string;

    @Input() value: number;

    @Input() values: number[];

    @Input() step: number;

    @Input() range: boolean;

    @Input() style: string;

    @Input() styleClass: string;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Output() valueChange: EventEmitter<any> = new EventEmitter();

    @Output() valuesChange: EventEmitter<any> = new EventEmitter();

    initialized: boolean;

    stopNgOnChangesPropagation: boolean;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngAfterViewInit() {
        jQuery(this.el.nativeElement.children[0]).slider({
            animate: this.animate,
            disabled: this.disabled,
            max: this.max,
            min: this.min,
            orientation: this.orientation,
            range: this.range,
            step: this.step,
            value: this.value,
            values: this.values,
            slide: (event: Event, ui: SliderUIParams) => {
                this.stopNgOnChangesPropagation = true;

                if(this.range) {
                    this.onChange.emit(ui.values);
                    this.valuesChange.emit(ui.values);
                }
                else {
                    this.onChange.emit(ui.value);
                    this.valueChange.emit(ui.value);
                }
            }
        });
        this.initialized = true;
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (this.initialized) {
            for (var key in changes) {
                if ((key === 'value'||key === 'values') && this.stopNgOnChangesPropagation) {
                    this.stopNgOnChangesPropagation = false;
                    continue;
                }

                jQuery(this.el.nativeElement.children[0]).slider('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement.children[0]).slider('destroy');
        this.initialized = false;
    }
}