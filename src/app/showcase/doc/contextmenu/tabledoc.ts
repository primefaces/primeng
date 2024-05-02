import { Component } from '@angular/core';

@Component({
    selector: 'context-menu-table-demo',
    template: `
        <app-docsectiontext>
            <p>Table has built-in support for ContextMenu, see the <a [routerLink]="['/table']" fragment="context-menu">ContextMenu</a> demo for an example.</p>
        </app-docsectiontext>
    `
})
export class TableDoc {}
