import { AppDoc } from '@/components/doc/app.doc';
import { BasicDoc } from '@/doc/pclass/basicdoc';
import { ImportDoc } from '@/doc/pclass/importdoc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular pClass Directive" header="pClass" description="The pClass directive provides extended class binding functionality." [docs]="docs" [apiDocs]="['PClass']"></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class PClassDemo {
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
        }
    ];
}
