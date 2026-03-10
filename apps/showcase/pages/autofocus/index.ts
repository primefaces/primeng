import { BasicDoc } from '@/doc/autofocus/basic-doc';
import { UsageDoc } from '@/doc/autofocus/usage-doc';
import { AppDoc } from '@/components/doc/app.doc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular AutoFocus Directive" header="AutoFocus" description="AutoFocus manages focus on focusable element on load." [docs]="docs" [heroDoc]="heroDoc" [apiDocs]="['AutoFocus']"></app-doc>`
})
export class AutoFocusDemo {
    heroDoc = BasicDoc;

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
                    id: 'basic',
                    label: 'Basic',
                    component: BasicDoc
                }
            ]
        }
    ];
}
