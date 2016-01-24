/// <reference path="../../../typedefinition/primeui.d.ts" />

import {Component, ElementRef, AfterViewInit, OnDestroy, HostBinding, Input, Output, OnChanges, SimpleChange, EventEmitter} from 'angular2/core';

@Component({
    selector: 'p-dialog',
    template: `
        <div class="pui-dialog ui-widget ui-widget-content ui-helper-hidden ui-corner-all pui-shadow" [ngClass]="{'pui-dialog-rtl':rtl}">
            <div class="pui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top">
                <span class="pui-dialog-title">{{header}}</span>
                <a class="pui-dialog-titlebar-icon pui-dialog-titlebar-close ui-corner-all" href="#" role="button" *ngIf="closable">
                    <span class="pui-icon fa fa-fw fa-close"></span>
                </a>
                <a class="pui-dialog-titlebar-icon pui-dialog-titlebar-maximize ui-corner-all" href="#" role="button" *ngIf="maximizable">
                    <span class="pui-icon fa fa-fw fa-sort"></span>
                </a>
                <a class="pui-dialog-titlebar-icon pui-dialog-titlebar-minimize ui-corner-all" href="#" role="button" *ngIf="minimizable">
                    <span class="pui-icon fa fa-fw fa-minus"></span>
                </a>
            </div>
            <div class="pui-dialog-content ui-widget-content">
                <ng-content></ng-content>
            </div>
        </div>
    `
})
export class DialogComponent implements AfterViewInit, OnDestroy, OnChanges {

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

    ngAfterViewInit() {
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
            maximize: this.onMaximize ? (event: Event) => { this.onMaximize.next(event); } : null,
            enhanced: true
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