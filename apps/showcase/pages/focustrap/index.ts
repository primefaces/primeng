import { BasicDoc } from '@/doc/focustrap/basicdoc';
import { ImportDoc } from '@/doc/focustrap/importdoc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: ` <app-doc docTitle="Angular Focus Trap Component" header="Focus Trap" description="Focus Trap keeps focus within a certain DOM element while tabbing." [docs]="docs" [apiDocs]="['FocusTrap']"></app-doc> `,
    standalone: true,
    imports: [AppDoc]
})
export class FocusTrapDemo {
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
