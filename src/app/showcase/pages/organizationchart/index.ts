import { Component } from '@angular/core';
import { TemplateDoc } from '@doc/organizationchart/templatedoc';
import { BasicDoc } from '@doc/organizationchart/basicdoc';
import { ImportDoc } from '@doc/organizationchart/importdoc';
import { SelectionDoc } from '@doc/organizationchart/selectiondoc';
import { ColoredDoc } from '@doc/organizationchart/colored.doc';
import { AccessibilityDoc } from '@doc/organizationchart/accessibilitydoc';
import { OrganizationChartDocModule } from '@doc/organizationchart/organizationchartdoc.module';

@Component({
    template: ` <app-doc
        docTitle="Angular Organization Chart Component"
        header="OrganizationChart"
        description="OrganizationChart visualizes hierarchical organization data."
        [docs]="docs"
        [apiDocs]="['OrganizationChart']"
    ></app-doc>`,
    standalone: true,
    imports: [OrganizationChartDocModule],
    styleUrl: './organizationchartdemo.scss',
})
export class OrganizationChartDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc,
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc,
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc,
        },
        {
            id: 'selection',
            label: 'Selection',
            component: SelectionDoc,
        },
        {
            id: 'colored',
            label: 'Colored',
            component: ColoredDoc,
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc,
        },
    ];
}
