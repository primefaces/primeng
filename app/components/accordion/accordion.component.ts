/// <reference path="../../../typedefinition/primeui.d.ts" />

import {Component, ElementRef, OnInit, OnDestroy, OnChanges, AfterViewInit, Input, Output, SimpleChange, EventEmitter} from 'angular2/core';
import {AccordionTabComponent} from './accordiontab.component';

@Component({
    selector: 'p-accordion',
    template: `
        <div>
            <ng-content></ng-content>
        </div>
    `,
})
export class AccordionComponent implements OnDestroy, OnChanges, AfterViewInit {

    @Input() activeIndex: number = 0;

    @Input() multiple: boolean;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Output() activeIndexChange: EventEmitter<any> = new EventEmitter();

    initialized: boolean;

    tabPanels: AccordionTabComponent[];

    stopNgOnChangesPropagation: boolean;

    constructor(private el: ElementRef) {
        this.tabPanels = [];
        this.initialized = false;
    }

    addTab(tab: AccordionTabComponent) {
        this.tabPanels.push(tab);
    }

    ngAfterViewInit() {
        jQuery(this.el.nativeElement.children[0]).puiaccordion({    
            activeIndex: this.activeIndex,
            multiple: this.multiple,
            change: (event: Event, ui: any) => {
                this.stopNgOnChangesPropagation = true;
                this.activeIndexChange.next(ui.index);
                this.onChange.next({originalEvent: event, ui: ui});
            }
        });
        this.initialized = true;
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (this.stopNgOnChangesPropagation) {
            this.stopNgOnChangesPropagation = false;
            return;
        }

        if (this.initialized) {
            for (var key in changes) {
                jQuery(this.el.nativeElement.children[0]).puiaccordion('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement.children[0]).puiaccordion('destroy');
        this.initialized = false;
    }
}