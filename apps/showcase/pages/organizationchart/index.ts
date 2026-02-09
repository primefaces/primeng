import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/organizationchart/accessibility-doc';
import { BasicDoc } from '@/doc/organizationchart/basic-doc';
import { ColoredDoc } from '@/doc/organizationchart/colored.-doc';
import { ImportDoc } from '@/doc/organizationchart/import-doc';
import { PTComponent } from '@/doc/organizationchart/pt/PTComponent';
import { SelectionDoc } from '@/doc/organizationchart/selection-doc';
import { TemplateDoc } from '@/doc/organizationchart/template-doc';
import { Component } from '@angular/core';

@Component({
    template: ` <app-doc
        docTitle="Angular Organization Chart Component"
        header="OrganizationChart"
        description="OrganizationChart visualizes hierarchical organization data."
        [docs]="docs"
        [apiDocs]="['OrganizationChart']"
        componentName="OrganizationChart"
        [ptDocs]="ptComponent"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc],
    styleUrl: './organizationchartdemo.scss'
})
export class OrganizationChartDemo {
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
            id: 'selection',
            label: 'Selection',
            component: SelectionDoc
        },
        {
            id: 'colored',
            label: 'Colored',
            component: ColoredDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
