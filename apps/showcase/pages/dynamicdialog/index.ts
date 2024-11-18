import { CloseDoc } from '@/doc/dynamicdialog/closedoc';
import { CustomizationDoc } from '@/doc/dynamicdialog/customizationdoc';
import { DynamicDialogDocModule } from '@/doc/dynamicdialog/dynamicdialogdoc.module';
import { ExampleDoc } from '@/doc/dynamicdialog/exampledoc';
import { ImportDoc } from '@/doc/dynamicdialog/importdoc';
import { OpenDoc } from '@/doc/dynamicdialog/opendoc';
import { PassingDataDoc } from '@/doc/dynamicdialog/passingdatadoc';
import { UsageDoc } from '@/doc/dynamicdialog/usagedoc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [DynamicDialogDocModule],
    template: `
        <app-doc
            docTitle="Angular Dynamic Dialog Component"
            header="Dynamic Dialog"
            description="Dialogs can be created dynamically with any component as the content using a DialogService."
            [docs]="docs"
            [apiDocs]="['DynamicDialog-Ref', 'DynamicDialog-Config', 'DialogService']"
            themeDocs="dynamicdialog"
        ></app-doc>
    `
})
export class DynamicDialogDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'usage',
            label: 'Usage',
            component: UsageDoc
        },
        {
            id: 'open',
            label: 'Opening a Dialog',
            component: OpenDoc
        },
        {
            id: 'customization',
            label: 'Customization',
            component: CustomizationDoc
        },
        {
            id: 'passingdata',
            label: 'Passing Data',
            component: PassingDataDoc
        },
        {
            id: 'close',
            label: 'Closing a Dialog',
            component: CloseDoc
        },
        {
            id: 'example',
            label: 'Example',
            component: ExampleDoc
        }
    ];
}
