import { AccessibilityDoc } from '@/doc/breadcrumb/accessibility-doc';
import { BasicDoc } from '@/doc/breadcrumb/basic-doc';
import { UsageDoc } from '@/doc/breadcrumb/usage-doc';
import { RouterDoc } from '@/doc/breadcrumb/router-doc';
import { TemplateDoc } from '@/doc/breadcrumb/template-doc';
import { PTComponent } from '@/doc/breadcrumb/pt/PTComponent';
import { AppDoc } from '@/components/doc/app.doc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc
            docTitle="Angular Breadcrumb Component"
            header="Breadcrumb"
            description="Breadcrumb provides contextual information about page hierarchy."
            [docs]="docs"
            [heroDoc]="heroDoc"
            [apiDocs]="['Breadcrumb', 'MenuItem']"
            [ptDocs]="ptComponent"
            themeDocs="Breadcrumb"
        ></app-doc>
    `
})
export class BreadcrumbDemo {
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
                { id: 'template', label: 'Template', component: TemplateDoc },
                { id: 'router', label: 'Router', component: RouterDoc }
            ]
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
