/// <reference path="../../../typedefinition/primeui.d.ts" />

import {Component,Input} from 'angular2/core';
import {Accordion} from './accordion';

@Component({
    selector: 'p-accordionTab',
    template: `
        <h3>{{header}}</h3>
        <div>
            <ng-content></ng-content>
        </div>
    `,
})
export class AccordionTab {

    @Input() header: string;

    initialized: boolean;

    constructor(tabview: Accordion) {
        tabview.addTab(this);
    }
}