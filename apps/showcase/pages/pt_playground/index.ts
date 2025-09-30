// TODO: this doc will be removed later
import { AppDoc } from '@/components/doc/app.doc';
import { PTPlayground } from '@/doc/pt-playground/pt-playground';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular PT Playground" header="PT Playground" [docs]="docs"></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class PT_Playground {
    docs = [
        {
            id: 'pt-playground',
            label: 'PT Playground',
            component: PTPlayground
        }
    ];
}
