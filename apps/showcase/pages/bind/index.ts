import { AppDoc } from '@/components/doc/app.doc';
import { ExamplesDoc } from '@/doc/bind/examples-doc';
import { UsageDoc } from '@/doc/bind/usage-doc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular Bind Directive" header="Bind" description="The Bind directive dynamically applies DOM element attributes using properties defined in an object." [docs]="docs" [heroDoc]="heroDoc"></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class Bind {
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
                    id: 'bind-examples',
                    label: 'Examples',
                    component: ExamplesDoc
                }
            ]
        }
    ];
}
