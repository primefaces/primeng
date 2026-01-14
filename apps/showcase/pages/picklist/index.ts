import { AccessibilityDoc } from '@/doc/picklist/accessibility-doc';
import { BasicDoc } from '@/doc/picklist/basic-doc';
import { FilterDoc } from '@/doc/picklist/filter-doc';
import { ImportDoc } from '@/doc/picklist/import-doc';
import { PTComponent } from '@/doc/picklist/pt/PTComponent';
import { TemplateDoc } from '@/doc/picklist/template-doc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc docTitle="Angular PickList Component" header="PickList" description="PickList is used to reorder items between different lists." [docs]="docs" [apiDocs]="['PickList']" [ptDocs]="ptComponent" themeDocs="picklist"></app-doc>`,
    standalone: true,
    imports: [AppDoc],
    styleUrl: './picklistdemo.scss'
})
export class PickListDemo {
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
            id: 'filter',
            label: 'Filter',
            component: FilterDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];

    ptComponent = PTComponent;
}
