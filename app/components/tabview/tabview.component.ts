/// <reference path="../../../typedefinition/primeui.d.ts" />

import {Component, ElementRef, OnInit, OnDestroy, OnChanges, AfterViewInit, Input, Output, SimpleChange, EventEmitter} from 'angular2/core';
import {TabPanelComponent} from './tabpanel.component';

@Component({
    selector: 'p-tabView',
    template: `
        <div>
            <ul>
                <li *ngFor="#tab of tabPanels">
                    <a href="#">{{tab.header}}</a><span *ngIf="tab.closable"class="fa fa-close"></span>
                </li>
            </ul>
            <div>
                <ng-content></ng-content>
            </div>
        </div>
    `,
})
export class TabViewComponent implements OnDestroy, OnChanges, AfterViewInit {

    @Input() activeIndex: number = 0;

    @Input() orientation: string;

    @Input() effect: string;

    @Input() effectDuration: any = 'fast';

    initialized: boolean;

    tabPanels: TabPanelComponent[];

    constructor(private el: ElementRef) {
        this.tabPanels = [];
        this.initialized = false;
    }

    addTab(tab: TabPanelComponent) {
        this.tabPanels.push(tab);
    }

    ngAfterViewInit() {
        jQuery(this.el.nativeElement.children[0]).puitabview({
            activeIndex: this.activeIndex,
            orientation: this.orientation,
            effect: this.effect ? {name: this.effect, duration:this.effectDuration} : null
        });
        this.initialized = true;
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (this.initialized) {
            for (var key in changes) {
                jQuery(this.el.nativeElement.children[0]).puitabview('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement.children[0]).puitabview('destroy');
        this.initialized = false;
    }
}