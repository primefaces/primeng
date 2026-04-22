import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/popover/accessibility-doc';
import { BasicDoc } from '@/doc/popover/basic-doc';
import { DataTableDoc } from '@/doc/popover/datatable-doc';
import { ImportDoc } from '@/doc/popover/import-doc';
import { PTComponent } from '@/doc/popover/pt/PTComponent';
import { SelectDataDoc } from '@/doc/popover/selectdata-doc';
import { TargetDoc } from '@/doc/popover/target-doc';
import { TemplateDoc } from '@/doc/popover/template-doc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc
        docTitle="Angular Popover Component"
        header="Popover"
        description="Popover is a container component that can overlay other components on page."
        [docs]="docs"
        [apiDocs]="['Popover']"
        [ptDocs]="ptComponent"
        componentName="Popover"
    ></app-doc>`,
    imports: [AppDoc],
    standalone: true
})
export class PopoverDemo {
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
            id: 'selectdata',
            label: 'Select Data',
            component: SelectDataDoc
        },
        {
            id: 'datatable',
            label: 'DataTable',
            component: DataTableDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'target',
            label: 'Target',
            component: TargetDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
