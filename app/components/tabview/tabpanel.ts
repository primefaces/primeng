/// <reference path="../../../typedefinition/primeui.d.ts" />

import {Component,Input} from 'angular2/core';
import {TabView} from './tabview';

@Component({
    selector: 'p-tabPanel',
    template: `
        <div>
            <ng-content></ng-content>
        </div>
    `,
})
export class TabPanel {

    @Input() header: string;

    @Input() closable: boolean;

    initialized: boolean;

    constructor(tabview: TabView) {
        tabview.addTab(this);
    }
}