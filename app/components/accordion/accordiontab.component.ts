/// <reference path="../../../typedefinition/primeui.d.ts" />

import {Component,Input} from 'angular2/core';
import {AccordionComponent} from './accordion.component';

@Component({
    selector: 'p-accordionTab',
    template: `
        <h3>{{header}}</h3>
        <div>
            <ng-content></ng-content>
        </div>
    `,
})
export class AccordionTabComponent {

    @Input() header: string;

    @Input() closable: boolean;

    initialized: boolean;

    constructor(tabview: AccordionComponent) {
        tabview.addTab(this);
    }
}