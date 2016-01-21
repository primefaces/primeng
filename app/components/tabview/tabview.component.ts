/// <reference path="../../../typedefinition/primeui.d.ts" />

import {Component, ElementRef, OnInit, OnDestroy, OnChanges, AfterViewInit, Input, Output, SimpleChange, EventEmitter} from 'angular2/core';
import {TabPanelComponent} from './tabpanel.component';

@Component({
    selector: 'p-tabView',
    template: `
        <div>
            <ul>
                <li *ngFor="#tab of tabPanels">
                    <a href="#">{{tab.header}}</a>
                </li>
            </ul>
            <div>
                <ng-content></ng-content>
            </div>
        </div>
    `,
})
export class TabViewComponent implements OnDestroy, OnChanges, AfterViewInit {

    @Input() activeIndex: number;

    @Input() orientation: string;

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
        var $this = this;
        jQuery($this.el.nativeElement.children[0]).puitabview({
            activeIndex: $this.activeIndex,
            orientation: $this.orientation
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