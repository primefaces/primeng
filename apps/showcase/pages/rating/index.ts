import { AccessibilityDoc } from '@/doc/rating/accessibility-doc';
import { BasicDoc } from '@/doc/rating/basic-doc';
import { DisabledDoc } from '@/doc/rating/disabled-doc';
import { ImportDoc } from '@/doc/rating/import-doc';
import { NumberOfStarsDoc } from '@/doc/rating/numberofstars-doc';
import { ReactiveFormsDoc } from '@/doc/rating/reactiveforms-doc';
import { ReadOnlyDoc } from '@/doc/rating/readonly-doc';
import { TemplateDoc } from '@/doc/rating/template-doc';
import { TemplateDrivenFormsDoc } from '@/doc/rating/templatedrivenforms-doc';
import { PTComponent } from '@/doc/rating/pt/PTComponent';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc docTitle="Angular Rating Component" header="Rating" description="Rating component is a star based selection input." [docs]="docs" [apiDocs]="['Rating']" [ptDocs]="ptComponent" themeDocs="rating"></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class RatingDemo {
    ptComponent = PTComponent;

    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc
        },
        {
            id: 'numberofstars',
            label: 'Number of Stars',
            component: NumberOfStarsDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'readonly',
            label: 'Readonly',
            component: ReadOnlyDoc
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc
        },
        {
            id: 'forms',
            label: 'Forms',
            children: [
                { id: 'templatedriven', label: 'Template Driven', component: TemplateDrivenFormsDoc },
                { id: 'reactive', label: 'Reactive Forms', component: ReactiveFormsDoc }
            ]
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
