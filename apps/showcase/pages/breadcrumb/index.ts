import { AccessibilityDoc } from '@/doc/breadcrumb/accessibilitydoc';
import { BasicDoc } from '@/doc/breadcrumb/basicdoc';
import { BreadcrumbDocModule } from '@/doc/breadcrumb/breadcrumbdoc.module';
import { ImportDoc } from '@/doc/breadcrumb/importdoc';
import { RouterDoc } from '@/doc/breadcrumb/routerdoc';
import { TemplateDoc } from '@/doc/breadcrumb/templatedoc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [BreadcrumbDocModule],
    template: `
        <app-doc docTitle="Angular Breadcrumb Component" header="Breadcrumb" description="Breadcrumb provides contextual information about page hierarchy." [docs]="docs" [apiDocs]="['Breadcrumb', 'MenuItem']" themeDocs="Breadcrumb"></app-doc>
    `
})
export class BreadcrumbDemo {
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
