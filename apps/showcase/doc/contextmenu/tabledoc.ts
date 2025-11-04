import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'context-menu-table-demo',
    standalone: true,
    imports: [RouterModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                Table has built-in support for ContextMenu, see the
                <a [routerLink]="['/table']" fragment="context-menu">ContextMenu</a> demo for an example.
            </p>
        </app-docsectiontext>
    `
})
export class TableDoc {}
