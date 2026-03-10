import { AppDoc } from '@/components/doc/app.doc';
import { ExamplesDoc } from '@/doc/classnames/examples-doc';
import { UsageDoc } from '@/doc/classnames/usage-doc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc
        docTitle="Angular ClassNames Directive"
        header="ClassNames"
        description="ClassNames provides extended class binding functionality that is not possible with the native Angular directives."
        [docs]="docs"
        [heroDoc]="heroDoc"
        [apiDocs]="['ClassNames']"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class ClassNamesDemo {
    heroDoc = ExamplesDoc;

    docs = [
        {
            id: 'usage',
            label: 'Usage',
            component: UsageDoc
        },
        {
            id: 'examples',
            label: 'Examples',
            children: [
                {
                    id: 'examples',
                    label: 'Examples',
                    component: ExamplesDoc
                }
            ]
        }
    ];
}
