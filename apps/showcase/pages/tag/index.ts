import { AccessibilityDoc } from '@/doc/tag/accessibility-doc';
import { BasicDoc } from '@/doc/tag/basic-doc';
import { IconDoc } from '@/doc/tag/icon-doc';
import { UsageDoc } from '@/doc/tag/usage-doc';
import { PillDoc } from '@/doc/tag/pill-doc';
import { PTComponent } from '@/doc/tag/pt/PTComponent';
import { SeverityDoc } from '@/doc/tag/severity-doc';
import { TemplateDoc } from '@/doc/tag/template-doc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: ` <app-doc docTitle="Angular Tag Component" header="Tag" description="Tag component is used to categorize content." [docs]="docs" [heroDoc]="heroDoc" [apiDocs]="['Tag']" [ptDocs]="ptComponent" themeDocs="tag"></app-doc> `,
    standalone: true,
    imports: [AppDoc]
})
export class TagDemo {
    ptComponent = PTComponent;
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
                { id: 'basic', label: 'Basic', component: BasicDoc },
                { id: 'severity', label: 'Severity', component: SeverityDoc },
                { id: 'pill', label: 'Pill', component: PillDoc },
                { id: 'icon', label: 'Icon', component: IconDoc },
                { id: 'template', label: 'Template', component: TemplateDoc }
            ]
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
