import { AppDoc } from '@/components/doc/app.doc';
import { ExamplesDoc } from '@/doc/bind/examplesdoc';
import { ImportDoc } from '@/doc/bind/importdoc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular Bind Directive" header="Bind" description="Bind directive provides extended property binding functionality that is not possible with the native Angular directives." [docs]="docs"></app-doc>`,
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
