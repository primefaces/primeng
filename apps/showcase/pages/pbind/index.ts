// TODO: this doc will be removed later
import { AppDoc } from '@/components/doc/app.doc';
import { BasicDoc } from '@/doc/pbind/basicdoc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular RadioButton Component" header="pBind" [docs]="docs"></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class PBind {
    docs = [
        {
            id: 'p-bind',
            label: 'pBind',
            component: BasicDoc
        }
    ];
}
