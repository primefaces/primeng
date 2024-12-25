import { AccessibilityDoc } from '@/doc/picklist/accessibilitydoc';
import { BasicDoc } from '@/doc/picklist/basicdoc';
import { FilterDoc } from '@/doc/picklist/filterdoc';
import { ImportDoc } from '@/doc/picklist/importdoc';
import { PicklistDocModule } from '@/doc/picklist/picklistdoc.module';
import { TemplateDoc } from '@/doc/picklist/templatedoc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular PickList Component" header="PickList" description="PickList is used to reorder items between different lists." [docs]="docs" [apiDocs]="['PickList']" themeDocs="picklist"></app-doc>`,
    standalone: true,
    imports: [PicklistDocModule],
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
}
