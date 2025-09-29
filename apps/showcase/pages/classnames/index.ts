import { AppDoc } from '@/components/doc/app.doc';
import { ExamplesDoc } from '@/doc/classnames/examplesdoc';
import { ImportDoc } from '@/doc/classnames/importdoc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc
        docTitle="Angular ClassNames Directive"
        header="ClassNames"
        description="ClassNames provides extended class binding functionality that is not possible with the native Angular directives."
        [docs]="docs"
        [apiDocs]="['ClassNames']"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class ClassNamesDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'examples',
            label: 'Examples',
            component: ExamplesDoc
        }
    ];
}
