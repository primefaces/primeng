import { Component } from '@angular/core';
import { ImportDoc } from '@doc/iftalabel/importdoc';
import { BasicDoc } from '@doc/iftalabel/basicdoc';
import { IftaLabelDocModule } from '@doc/iftalabel/iftalabeldoc.module';

@Component({
    standalone: true,
    imports: [IftaLabelDocModule],
    template: `
        <app-doc
            docTitle="Angular Ifta Label Component"
            header="IftaLabel"
            description="IftaLabel is used to create infield top aligned labels."
            [docs]="docs"
            themeDocs="iftalabel"
        ></app-doc>
    `,
})
export class IftaLabelDemo {
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

    ];
}
