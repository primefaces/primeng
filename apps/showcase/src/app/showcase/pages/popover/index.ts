import { Component } from '@angular/core';
import { BasicDoc } from '@doc/popover/basicdoc';
import { ImportDoc } from '@doc/popover/importdoc';
import { DataTableDoc } from '@doc/popover/datatabledoc';
import { AccessibilityDoc } from '@doc/popover/accessibilitydoc';
import { CommonModule } from '@angular/common';
import { PopoverDocModule } from '@doc/popover/popoverdoc.module';
import { SelectDataDoc } from '@doc/popover/selectdatadoc';

@Component({
    template: `<app-doc docTitle="Angular Popover Component" header="Popover" description="Popover is a container component that can overlay other components on page." [docs]="docs" [apiDocs]="['Popover']" themeDocs="popover"></app-doc>`,
    imports: [CommonModule, PopoverDocModule],
    standalone: true
})
export class PopoverDemo {
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
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
