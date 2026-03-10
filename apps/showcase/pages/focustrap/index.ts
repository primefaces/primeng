import { AppDoc } from '@/components/doc/app.doc';
import { BasicDoc } from '@/doc/focustrap/basic-doc';
import { UsageDoc } from '@/doc/focustrap/usage-doc';
import { Component } from '@angular/core';

@Component({
    template: ` <app-doc docTitle="Angular Focus Trap Component" header="Focus Trap" description="Focus Trap keeps focus within a certain DOM element while tabbing." [docs]="docs" [apiDocs]="['FocusTrap']" [heroDoc]="heroDoc"></app-doc> `,
    standalone: true,
    imports: [AppDoc]
})
export class FocusTrapDemo {
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
