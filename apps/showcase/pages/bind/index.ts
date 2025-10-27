import { AppDoc } from '@/components/doc/app.doc';
import { ExamplesDoc } from '@/doc/bind/examplesdoc';
import { ImportDoc } from '@/doc/bind/importdoc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular Bind Directive" header="Bind" description="The Bind directive dynamically applies DOM element attributes using properties defined in an object." [docs]="docs"></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class Bind {
    docs = [
        {
            id: 'bind-import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'bind-examples',
            label: 'Examples',
            component: ExamplesDoc
        }
    ];
}
