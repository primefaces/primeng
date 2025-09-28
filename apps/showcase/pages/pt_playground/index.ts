import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';
import { PTPlayground } from '@/doc/pt-playground/pt-playground';

@Component({
    template: `<app-doc docTitle="Angular RadioButton Component" header="PT Playground" [docs]="docs"></app-doc>`,
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
