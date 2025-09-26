import { AppDoc } from '@/components/doc/app.doc';
import { BasicDoc } from '@/doc/pclass/basicdoc';
import { ImportDoc } from '@/doc/pclass/importdoc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular Class Directive" header="pClass" description="pClass provides extended class binding functionality that is not possible with the native Angular directives." [docs]="docs" [apiDocs]="['PClass']"></app-doc>`,
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
