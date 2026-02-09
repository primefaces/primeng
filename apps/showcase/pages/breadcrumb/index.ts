import { AccessibilityDoc } from '@/doc/breadcrumb/accessibility-doc';
import { BasicDoc } from '@/doc/breadcrumb/basic-doc';
import { ImportDoc } from '@/doc/breadcrumb/import-doc';
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
            [apiDocs]="['Breadcrumb', 'MenuItem']"
            [ptDocs]="ptComponent"
            themeDocs="Breadcrumb"
        ></app-doc>
    `
})
export class BreadcrumbDemo {
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
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'router',
            label: 'Router',
            component: RouterDoc
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
