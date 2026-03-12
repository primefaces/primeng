import { BasicDoc } from '@/doc/inputcolor/basic-doc';
import { AppDoc } from '@/components/doc/app.doc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular InputColor Component" header="InputColor" description="InputColor is a composable color picker component." [docs]="docs" [heroDoc]="heroDoc" [apiDocs]="['InputColor']" themeDocs="inputcolor"></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class InputColorDemo {
    heroDoc = BasicDoc;

    docs = [
        {
            id: 'examples',
            label: 'Examples',
            children: [
                {
                    id: 'basic',
                    label: 'Basic',
                    component: BasicDoc
                }
            ]
        }
    ];
}
