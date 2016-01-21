/// <reference path="../../../typedefinition/primeui.d.ts" />

import {Component, ElementRef, OnInit, OnDestroy, HostBinding, Input, Output, OnChanges, SimpleChange, EventEmitter} from 'angular2/core';

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

    @Input() draggable: boolean = true;

    @Input() resizable: boolean = true;

    @Input() location: string;

    @Input() minWidth: number;

    @Input() minHeight: number;

    @Input() width: any;

    @Input() height: any;

    @Input() visible: boolean;

    @Input() modal: boolean;

    @Input() showEffect: string;

    @Input() hideEffect: string;

    @Input() effectSpeed: any;

    @Input() closeOnEscape: boolean = true;

    @Input() rtl: boolean;

    @Input() closable: boolean = true;

    @Input() minimizable: boolean;

    @Input() maximizable: boolean;

    @Input() responsive: boolean;

    @Output() onBeforeShow: EventEmitter<any> = new EventEmitter();

    @Output() onAfterShow: EventEmitter<any> = new EventEmitter();

    @Output() onBeforeHide: EventEmitter<any> = new EventEmitter();

    @Output() onAfterHide: EventEmitter<any> = new EventEmitter();

    @Output() onMinimize: EventEmitter<any> = new EventEmitter();

    @Output() onMaximize: EventEmitter<any> = new EventEmitter();

    @Output() visibleChange:EventEmitter<any> = new EventEmitter();

    initialized: boolean;

    stopNgOnChangesPropagation: boolean;

    constructor(private el: ElementRef) {
        this.initialized = false;
    } 

    ngOnInit() {
        jQuery(this.el.nativeElement.children[0]).puidialog({
            title: this.header,
            draggable: this.draggable,
            resizable: this.resizable,
            location: this.location,
            minWidth: this.minWidth,
            minHeight: this.minHeight,
            width: this.width,
            height: this.height,
            visible: this.visible,
            modal: this.modal,
            showEffect: this.showEffect,
            hideEffect: this.hideEffect,
            effectSpeed: this.effectSpeed,
            closeOnEscape: this.closeOnEscape,
            rtl: this.rtl,
            closable: this.closable,
            minimizable: this.minimizable,
            maximizable: this.maximizable,
            responsive: this.responsive,
            beforeShow: this.onBeforeShow ? (event: Event) => { this.onBeforeShow.next(event); } : null,
            afterShow: this.onAfterShow ? (event: Event) => { this.onAfterShow.next(event); } : null,
            beforeHide: this.onBeforeHide ? (event: Event) => { this.onBeforeHide.next(event); } : null,
            afterHide: this.onAfterHide ? (event: Event) => { 
                this.stopNgOnChangesPropagation = true;
                this.visibleChange.next(false);
                this.onAfterHide.next(event); 
            } : null,
            minimize: this.onMinimize ? (event: Event) => { this.onMinimize.next(event); } : null,
            maximize: this.onMaximize ? (event: Event) => { this.onMaximize.next(event); } : null
        });
        this.initialized = true;
    }

    ngOnChanges(changes: { [key: string]: SimpleChange}) {
        if (this.stopNgOnChangesPropagation) {
            this.stopNgOnChangesPropagation = false;
            return;
        }

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