import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/organizationchart/accessibility-doc';
import { BasicDoc } from '@/doc/organizationchart/basic-doc';
import { CollapsibleDoc } from '@/doc/organizationchart/collapsible-doc';
import { ColoredDoc } from '@/doc/organizationchart/colored-doc';
import { DefaultDoc } from '@/doc/organizationchart/default-doc';
import { PartialDoc } from '@/doc/organizationchart/partial-doc';
import { PTComponent } from '@/doc/organizationchart/pt/PTComponent';
import { SelectionDoc } from '@/doc/organizationchart/selection-doc';
import { TemplateDoc } from '@/doc/organizationchart/template-doc';
import { UsageDoc } from '@/doc/organizationchart/usage-doc';
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
        [heroDoc]="heroDoc"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc],
    styleUrl: './organizationchartdemo.scss'
})
export class OrganizationChartDemo {
    heroDoc = BasicDoc;
    ptComponent = PTComponent;
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
                },
                {
                    id: 'collapsible',
                    label: 'Collapsible',
                    component: CollapsibleDoc
                },
                {
                    id: 'selectable',
                    label: 'Selectable',
                    component: SelectionDoc
                },
                {
                    id: 'partial',
                    label: 'Partial Collapsible & Selectable',
                    component: PartialDoc
                },
                {
                    id: 'default',
                    label: 'Default Collapsed & Selected',
                    component: DefaultDoc
                },
                {
                    id: 'colored',
                    label: 'Colored',
                    component: ColoredDoc
                },
                {
                    id: 'template',
                    label: 'Template',
                    component: TemplateDoc
                }
            ]
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
