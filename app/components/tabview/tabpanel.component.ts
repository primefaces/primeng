/// <reference path="../../../typedefinition/primeui.d.ts" />

import {Component,Input} from 'angular2/core';
import {TabViewComponent} from './tabview.component';

@Component({
    selector: 'p-tabPanel',
    template: `
        <div>
            <ng-content></ng-content>
        </div>
    `,
})
export class TabPanelComponent {

    @Input() header: string;

    @Input() closable: boolean;

    initialized: boolean;

    constructor(tabview: TabViewComponent) {
        tabview.addTab(this);
    }
}